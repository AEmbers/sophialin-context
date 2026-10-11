import { homedir } from "node:os";
import path from "node:path";

/** XDG base-directory paths for sophialin-context.
 *
 *  Follows the XDG Base Directory Specification so the proxy lands in the
 *  conventional Linux/macOS locations instead of a bespoke ~/.sophialin/:
 *
 *    config (user-edited, dotfile-managed):
 *      $XDG_CONFIG_HOME/sophialin-context/sophialin-context.json
 *      default: ~/.config/sophialin-context/sophialin-context.json
 *
 *    data (persisted session state, grows over time):
 *      $XDG_DATA_HOME/sophialin-context/sessions/
 *      default: ~/.local/share/sophialin-context/sessions/
 *
 *  Env overrides (highest priority) are kept so test runners and container
 *  setups can relocate everything without touching the config file. */

function xdg(envVar: string, fallback: string): string {
    const v = process.env[envVar];
    if (v && v.length > 0) return path.resolve(v);
    return path.join(homedir(), fallback);
}

/** Root config dir: user-editable configuration lives here. */
export function configDir(): string {
    return path.join(xdg("XDG_CONFIG_HOME", ".config"), "sophialin-context");
}

/** Pre-rename product directory name. This was released, so it is NOT a
 *  cosmetic string: every install that predates the rename has its config,
 *  sessions, MITM CA and state under this name, and the new build would look
 *  like a first run without it. Kept here as the single source for the
 *  migration in legacy-migrate.ts. */
export const LEGACY_DIR_NAME = "billion-context";

/** Pre-rename config file name (the rename rule rewrote the whole
 *  `billion-context.json` literal, so the file is not renamed on disk). */
export const LEGACY_CONFIG_NAME = "billion-context.json";

function legacyRoot(envVar: string, fallback: string): string {
    return path.join(xdg(envVar, fallback), LEGACY_DIR_NAME);
}

/** Pre-rename config dir. */
export function legacyConfigDir(): string {
    return legacyRoot("XDG_CONFIG_HOME", ".config");
}

/** Pre-rename config file path. */
export function legacyConfigFile(): string {
    return path.join(legacyConfigDir(), LEGACY_CONFIG_NAME);
}

/** Pre-rename data dir (persisted sessions, MITM CA). */
export function legacyDataDir(): string {
    return legacyRoot("XDG_DATA_HOME", ".local/share");
}

/** Pre-rename state dir (log, prefix affinity, plugin conversations). */
export function legacyStateDir(): string {
    return legacyRoot("XDG_STATE_HOME", ".local/state");
}

/** Main config file path. */
export function configFile(): string {
    const env = process.env.SOPHIALIN_CONFIG_FILE;
    if (env && env.length > 0) return path.resolve(env);
    return path.join(configDir(), "sophialin-context.json");
}

/** Root data dir: persistent session state lives here. */
export function dataDir(): string {
    return path.join(xdg("XDG_DATA_HOME", ".local/share"), "sophialin-context");
}

/** Sessions dir: one JSON file per session. */
export function sessionsDir(): string {
    const env = process.env.SOPHIALIN_SESSIONS_DIR;
    if (env && env.length > 0) return path.resolve(env);
    return path.join(dataDir(), "sessions");
}

/** Root cache dir: transient/ephemeral data (update-check throttle, etc.). */
export function cacheDir(): string {
    return path.join(xdg("XDG_CACHE_HOME", ".cache"), "sophialin-context");
}

/** Root state dir: log files and other per-host state. */
export function stateDir(): string {
    return path.join(xdg("XDG_STATE_HOME", ".local/state"), "sophialin-context");
}

/** Default log file path. */
export function defaultLogFile(): string {
    return path.join(stateDir(), "sophialin.log");
}

/** Origin of the most recently started proxy (best-effort discovery file for
 *  host-spawned MCP shells that have no env passthrough: opencode/claude/codex). */
export function proxyOriginFile(): string {
    return path.join(stateDir(), "proxy-origin");
}

/** Body-dump dir (ACP_DUMP_BODY / SOPHIALIN_DUMP_4XX): ACP_DUMP_DIR override first,
 *  else the XDG state dir so dumps co-locate with sophialin.log on every platform. */
export function dumpsDir(): string {
    const env = process.env.ACP_DUMP_DIR;
    if (env && env.length > 0) return env;
    return path.join(stateDir(), "dumps");
}

/** CA dir: root CA + dynamically-signed host certificates for MITM mode.
 *  Lives under the data dir (the private key is sensitive but regenerable).
 *  Created lazily by ca.ts on first MITM use. */
export function caDir(): string {
    return path.join(dataDir(), "ca");
}
