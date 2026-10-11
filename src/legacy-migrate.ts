/** One-time adoption of a pre-rename install.
 *
 *  The billion-context → sophialin-context rename moved every XDG directory, so
 *  an existing install is indistinguishable from a fresh one: the proxy seeds a
 *  template config (silently dropping the user's providers), mints a brand-new
 *  MITM CA (breaking every client that trusts the old one) and starts with zero
 *  persisted sessions (so `decompress` can no longer reach old ranges).
 *
 *  Policy — COPY, never move:
 *    - a downgrade keeps working, and the legacy tree stays as the rollback;
 *    - the legacy tree is left byte-identical, so nothing here is destructive.
 *
 *  Idempotence — an artifact whose destination already has content is skipped,
 *  so a partially migrated tree converges on the next run, and a run that dies
 *  halfway loses nothing. Within the big directories (sessions, ca) the check
 *  is per file, which is what makes a 1 GB session store resumable.
 *
 *  Deliberately NOT adopted:
 *    - `instances/`, `proxy-origin`, `proxy-starting` — liveness markers for
 *      processes that are gone; stale copies would make a dead proxy look live;
 *    - `port-zone.json` — the old proxy may still be holding that zone, so
 *      claiming it from a copy creates a conflict; it is re-derived on demand;
 *    - `bili.log*` and the cache dir — logs are history, and the cache is
 *      regenerable; copying a stale `.update-check` throttle is worse than
 *      refetching it.
 *
 *  Best-effort by construction: every step swallows its own errors and reports
 *  through the returned report, because a migration that fails must never stop
 *  the proxy from starting.
 */
import fs from "node:fs";
import path from "node:path";
import {
    configFile as defaultConfigFile,
    dataDir as defaultDataDir,
    legacyConfigFile,
    legacyDataDir,
    legacyStateDir,
    stateDir as defaultStateDir,
} from "./paths.js";
import { log as loggerLog } from "./logger.js";

/** Escape hatch for a user who wants the migration to leave the tree alone
 *  (e.g. to reconcile by hand). `1`/`true` disables it. */
export const NO_MIGRATION_ENV = "SOPHIALIN_NO_LEGACY_MIGRATION";

/** State files that carry functional state worth keeping. The log and the
 *  liveness markers sitting in the same directory are intentionally excluded. */
const STATE_FILES = ["prefix-affinity.json", "plugin-conversations.json"];

/** Directories under the data root adopted wholesale (per file). */
const DATA_SUBDIRS = ["sessions", "ca"];

export interface LegacyMigrationOptions {
    env?: NodeJS.ProcessEnv;
    /** Destination config file. Default: `configFile()`. */
    configTarget?: string;
    /** Destination data root. Default: `dataDir()`. */
    dataTarget?: string;
    /** Destination state root. Default: `stateDir()`. */
    stateTarget?: string;
    /** Legacy config file. Default: `legacyConfigFile()`. */
    legacyConfig?: string;
    /** Legacy data root. Default: `legacyDataDir()`. */
    legacyData?: string;
    /** Legacy state root. Default: `legacyStateDir()`. */
    legacyState?: string;
    /** Record what would happen without writing anything. */
    dryRun?: boolean;
    /** Whether the legacy config file may be adopted. Defaults to auto: yes
     *  unless SOPHIALIN_CONFIG_FILE names a file explicitly. Pass `false` when
     *  the caller knows the user pointed at their own config (`--config`),
     *  which may not be in the environment yet. */
    adoptConfig?: boolean;
}

export interface LegacyMigrationReport {
    skipped: boolean;
    /** Why `skipped` is set, for logging/tests. */
    reason?: "disabled" | "no-legacy";
    configAdopted: boolean;
    filesCopied: number;
    bytesCopied: number;
    /** Source → destination pairs that failed, with their error message. */
    failures: { from: string; to: string; error: string }[];
}

function emptyReport(): LegacyMigrationReport {
    return { skipped: false, configAdopted: false, filesCopied: 0, bytesCopied: 0, failures: [] };
}

function isTruthy(v: string | undefined): boolean {
    const t = (v ?? "").trim().toLowerCase();
    return t === "1" || t === "true";
}

function isDirectory(p: string): boolean {
    try {
        return fs.statSync(p).isDirectory();
    } catch {
        return false;
    }
}

function fileSize(p: string): number {
    try {
        return fs.statSync(p).size;
    } catch {
        return 0;
    }
}

/** Whether a config file is machine-generated placeholder rather than user
 *  content.
 *
 *  `ensureConfigTemplate()` seeds the template on first run, so a renamed build
 *  that started once before this migration existed leaves behind a config that
 *  is non-empty but carries nothing (`{ "providers": { } }`). Size alone cannot
 *  tell that apart from a real config, and treating it as real would silently
 *  drop the user's providers.
 *
 *  Anything else is left alone, including content we cannot parse: a malformed
 *  file is still an edit someone made, and quietly replacing it with the old
 *  config would destroy that edit. The rule is "adopt only what the machine
 *  wrote with no content". */
function isTemplateOnlyConfig(file: string): boolean {
    let raw: string;
    try {
        raw = fs.readFileSync(file, "utf8");
    } catch {
        return false;
    }
    let parsed: unknown;
    try {
        parsed = JSON.parse(raw);
    } catch {
        return false;
    }
    if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) return false;
    const obj = parsed as Record<string, unknown>;
    const keys = Object.keys(obj);
    if (keys.some((k) => k !== "providers")) return false;
    const providers = obj.providers;
    if (providers === undefined || providers === null) return true;
    if (typeof providers !== "object" || Array.isArray(providers)) return false;
    return Object.keys(providers as Record<string, unknown>).length === 0;
}

/** Adopt the legacy config file when the destination has no usable config.
 *
 *  "No usable config" covers an absent file, a zero-length file and the
 *  no-content template above. A destination file with real content is the
 *  user's current intent and is never overwritten. */
function adoptConfig(dest: string, legacy: string, dryRun: boolean, report: LegacyMigrationReport): void {
    if (!fs.existsSync(legacy) || fileSize(legacy) === 0) return;
    if (fileSize(dest) > 0 && !isTemplateOnlyConfig(dest)) return;
    if (dryRun) {
        report.configAdopted = true;
        report.bytesCopied += fileSize(legacy);
        return;
    }
    try {
        fs.mkdirSync(path.dirname(dest), { recursive: true });
        fs.copyFileSync(legacy, dest);
        report.configAdopted = true;
        report.bytesCopied += fileSize(dest);
    } catch (error) {
        report.failures.push({ from: legacy, to: dest, error: String((error as Error).message ?? error) });
    }
}

/** Copy one file forward unless the destination already exists.
 *
 *  NEVER overwrites: the destination is the live tree, and a stale copy landing
 *  on top of a session the running proxy just wrote would be data loss. */
function copyMissing(from: string, to: string, dryRun: boolean, report: LegacyMigrationReport): void {
    if (fs.existsSync(to)) return;
    let size = 0;
    try {
        size = fs.statSync(from).size;
    } catch {
        return;
    }
    if (dryRun) {
        report.filesCopied += 1;
        report.bytesCopied += size;
        return;
    }
    try {
        fs.mkdirSync(path.dirname(to), { recursive: true });
        fs.copyFileSync(from, to);
        report.filesCopied += 1;
        report.bytesCopied += size;
    } catch (error) {
        report.failures.push({ from, to, error: String((error as Error).message ?? error) });
    }
}

function adoptTree(fromDir: string, toDir: string, dryRun: boolean, report: LegacyMigrationReport): void {
    if (!isDirectory(fromDir)) return;
    let entries: fs.Dirent[];
    try {
        entries = fs.readdirSync(fromDir, { withFileTypes: true });
    } catch (error) {
        report.failures.push({ from: fromDir, to: toDir, error: String((error as Error).message ?? error) });
        return;
    }
    for (const entry of entries) {
        const from = path.join(fromDir, entry.name);
        const to = path.join(toDir, entry.name);
        if (entry.isDirectory()) adoptTree(from, to, dryRun, report);
        else if (entry.isFile()) copyMissing(from, to, dryRun, report);
    }
}

/** Shim the pre-rename `BILI_*` / `BILLION_CONTEXT_*` environment names onto
 *  their `SOPHIALIN_*` equivalents.
 *
 *  A user's shell profile, a service unit or a client's wrapper script still
 *  exports the old names, and the security-relevant ones have no other channel:
 *  `BILI_ENCRYPTION_KEY` decrypts the persisted session store, so losing it
 *  would make every stored session unreadable.
 *
 *  Done as one pass over the environment rather than ~50 call-site fallbacks:
 *  the proxy reads `process.env` directly everywhere, so translating once at
 *  startup covers every reader (including readers added later) without each of
 *  them having to remember the old spelling. An explicitly set `SOPHIALIN_*`
 *  always wins. Returns the adopted names, for logging. */
export function adoptLegacyEnv(env: NodeJS.ProcessEnv = process.env): string[] {
    const adopted: string[] = [];
    for (const key of Object.keys(env)) {
        let next: string | undefined;
        if (key.startsWith("BILI_") || key === "BILI") next = `SOPHIALIN_${key.slice("BILI_".length)}`;
        else if (key.startsWith("BILLION_CONTEXT_")) next = `SOPHIALIN_CONTEXT_${key.slice("BILLION_CONTEXT_".length)}`;
        if (!next || next === key) continue;
        if (env[next] !== undefined) continue;
        const value = env[key];
        if (value === undefined) continue;
        env[next] = value;
        adopted.push(`${key}→${next}`);
    }
    return adopted;
}

/** Copy the legacy artifacts forward. See the module comment for policy.
 *
 *  Returns a report instead of throwing, so the caller can log a summary and
 *  move on. */
export function migrateLegacyInstall(opts: LegacyMigrationOptions = {}): LegacyMigrationReport {
    const report = emptyReport();
    const env = opts.env ?? process.env;
    if (isTruthy(env[NO_MIGRATION_ENV])) {
        report.skipped = true;
        report.reason = "disabled";
        return report;
    }

    const destConfig = opts.configTarget ?? defaultConfigFile();
    const destData = opts.dataTarget ?? defaultDataDir();
    const destState = opts.stateTarget ?? defaultStateDir();
    const srcConfig = opts.legacyConfig ?? legacyConfigFile();
    const srcData = opts.legacyData ?? legacyDataDir();
    const srcState = opts.legacyState ?? legacyStateDir();

    // A `--config`/SOPHIALIN_CONFIG_FILE override names a file explicitly; the
    // user is managing it and we must not drop another config next to it.
    const configIsOverridden =
        opts.adoptConfig !== undefined ? !opts.adoptConfig : (env.SOPHIALIN_CONFIG_FILE ?? "").trim().length > 0;

    const hasLegacy = fs.existsSync(srcConfig) || isDirectory(srcData) || isDirectory(srcState);
    if (!hasLegacy) {
        report.skipped = true;
        report.reason = "no-legacy";
        return report;
    }

    const dryRun = opts.dryRun === true;
    if (!configIsOverridden) adoptConfig(destConfig, srcConfig, dryRun, report);
    for (const sub of DATA_SUBDIRS) adoptTree(path.join(srcData, sub), path.join(destData, sub), dryRun, report);
    for (const file of STATE_FILES) copyMissing(path.join(srcState, file), path.join(destState, file), dryRun, report);

    return report;
}

/** Run the migration and log one line describing what happened.
 *
 *  Logged at info only when something was actually adopted: a machine with no
 *  legacy install (every fresh install) must stay silent. */
export function runLegacyMigration(opts: LegacyMigrationOptions = {}): LegacyMigrationReport {
    const env = opts.env ?? process.env;
    const adoptedEnv = adoptLegacyEnv(env);
    if (adoptedEnv.length > 0) {
        loggerLog("info", `[migrate] adopted ${adoptedEnv.length} pre-rename env var(s): ${adoptedEnv.join(", ")}`);
    }
    const report = migrateLegacyInstall(opts);
    if (report.configAdopted || report.filesCopied > 0) {
        const mb = (report.bytesCopied / (1024 * 1024)).toFixed(1);
        loggerLog(
            "info",
            `[migrate] adopted the pre-rename install: config=${report.configAdopted ? "yes" : "no"}, ` +
                `${report.filesCopied} file(s) / ${mb} MB copied. The old directories are left untouched and can be removed once you are satisfied.`,
        );
    }
    for (const f of report.failures) {
        loggerLog("warn", `[migrate] could not copy ${f.from} → ${f.to}: ${f.error}`);
    }
    return report;
}
