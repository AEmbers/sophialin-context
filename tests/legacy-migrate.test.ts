/** Pre-rename install adoption (legacy-migrate.ts).
 *
 *  Every case here points the migration at a temp tree through the explicit
 *  option fields, never through HOME — a test that resolved the real XDG paths
 *  would copy the developer's 1 GB session store.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { adoptLegacyEnv, migrateLegacyInstall, NO_MIGRATION_ENV } from "../src/legacy-migrate.js";

function tmp(prefix: string): string {
    return fs.mkdtempSync(path.join(os.tmpdir(), `sophialin-${prefix}-`));
}

function write(file: string, content: string): void {
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, content, "utf8");
}

/** A legacy install with one artifact in each adopted bucket, plus the
 *  artifacts that must be ignored. */
function legacyInstall(): { root: string; opts: ReturnType<typeof optsFor> } {
    const root = tmp("legacy");
    const home = tmp("home");
    write(path.join(root, "config", "billion-context.json"), '{ "providers": { "https://api.x/v1": {} } }');
    write(path.join(root, "data", "sessions", "a.json"), "session-a");
    write(path.join(root, "data", "sessions", "nested", "b.json"), "session-b");
    write(path.join(root, "data", "ca", "ca.pem"), "CA-PEM");
    write(path.join(root, "data", "ca", "ca.key"), "CA-KEY");
    write(path.join(root, "state", "prefix-affinity.json"), '{"chains":1}');
    write(path.join(root, "state", "plugin-conversations.json"), '{"conv":1}');
    // Must NOT be adopted:
    write(path.join(root, "state", "port-zone.json"), '{"zone":1}');
    write(path.join(root, "state", "proxy-origin"), "http://127.0.0.1:8787");
    write(path.join(root, "state", "instances", "dead.json"), "{}");
    write(path.join(root, "state", "bili.log"), "old log");
    return { root, opts: optsFor(root, home) };
}

function optsFor(root: string, home: string) {
    return {
        env: {} as NodeJS.ProcessEnv,
        configTarget: path.join(home, "config", "sophialin-context.json"),
        dataTarget: path.join(home, "data"),
        stateTarget: path.join(home, "state"),
        legacyConfig: path.join(root, "config", "billion-context.json"),
        legacyData: path.join(root, "data"),
        legacyState: path.join(root, "state"),
    };
}

test("adoptLegacyEnv: BILI_* and BILLION_CONTEXT_* are mapped onto their SOPHIALIN spellings", () => {
    const env: NodeJS.ProcessEnv = {
        BILI_ENCRYPTION_KEY: "k",
        BILI_UPSTREAM_TIMEOUT_MS: "5000",
        BILLION_CONTEXT_ATTACH: "1",
        PATH: "/usr/bin",
        SOPHIALIN_UNRELATED: "x",
    };
    const adopted = adoptLegacyEnv(env);
    assert.equal(env.SOPHIALIN_ENCRYPTION_KEY, "k");
    assert.equal(env.SOPHIALIN_UPSTREAM_TIMEOUT_MS, "5000");
    assert.equal(env.SOPHIALIN_CONTEXT_ATTACH, "1");
    assert.equal(env.SOPHIALIN_UNRELATED, "x");
    assert.equal(env.PATH, "/usr/bin");
    assert.deepEqual(adopted.sort(), [
        "BILI_ENCRYPTION_KEY→SOPHIALIN_ENCRYPTION_KEY",
        "BILI_UPSTREAM_TIMEOUT_MS→SOPHIALIN_UPSTREAM_TIMEOUT_MS",
        "BILLION_CONTEXT_ATTACH→SOPHIALIN_CONTEXT_ATTACH",
    ]);
});

test("adoptLegacyEnv: an explicitly set SOPHIALIN_* always wins over the old name", () => {
    const env: NodeJS.ProcessEnv = { BILI_ENCRYPTION_KEY: "old", SOPHIALIN_ENCRYPTION_KEY: "new" };
    const adopted = adoptLegacyEnv(env);
    assert.equal(env.SOPHIALIN_ENCRYPTION_KEY, "new");
    assert.deepEqual(adopted, []);
});

test("adoptLegacyEnv: an explicit empty value is preserved, not skipped", () => {
    // `BILI_UPSTREAM_PROXY=""` is a deliberate "no proxy", distinct from unset.
    const env: NodeJS.ProcessEnv = { BILI_UPSTREAM_PROXY: "" };
    adoptLegacyEnv(env);
    assert.equal(env.SOPHIALIN_UPSTREAM_PROXY, "");
    assert.ok(Object.prototype.hasOwnProperty.call(env, "SOPHIALIN_UPSTREAM_PROXY"));
});

test("adoptLegacyEnv: one pass converts a legacy env wholesale", () => {
    const env: NodeJS.ProcessEnv = { BILI_A: "1", BILI_B: "2", BILI_C: "3" };
    assert.equal(adoptLegacyEnv(env).length, 3);
    assert.deepEqual([env.SOPHIALIN_A, env.SOPHIALIN_B, env.SOPHIALIN_C], ["1", "2", "3"]);
});

test("migrateLegacyInstall: a machine with no legacy install is a no-op", () => {
    const home = tmp("fresh");
    const report = migrateLegacyInstall(optsFor(path.join(home, "absent"), home));
    assert.equal(report.skipped, true);
    assert.equal(report.reason, "no-legacy");
    assert.equal(report.filesCopied, 0);
    assert.equal(report.configAdopted, false);
    assert.equal(fs.existsSync(path.join(home, "config", "sophialin-context.json")), false);
});

test("migrateLegacyInstall: opt-out env disables the whole migration", () => {
    const { opts } = legacyInstall();
    opts.env = { [NO_MIGRATION_ENV]: "1" };
    const report = migrateLegacyInstall(opts);
    assert.equal(report.skipped, true);
    assert.equal(report.reason, "disabled");
    assert.equal(fs.existsSync(opts.configTarget), false);
});

test("migrateLegacyInstall: the legacy config is adopted when the new one is missing", () => {
    const { opts } = legacyInstall();
    const report = migrateLegacyInstall(opts);
    assert.equal(report.configAdopted, true);
    assert.equal(fs.readFileSync(opts.configTarget, "utf8"), fs.readFileSync(opts.legacyConfig, "utf8"));
});

test("migrateLegacyInstall: a zero-length config counts as absent", () => {
    // The renamed build seeds a template on first run; a run that happened
    // before this migration existed leaves that empty file behind.
    const { opts } = legacyInstall();
    write(opts.configTarget, "");
    assert.equal(migrateLegacyInstall(opts).configAdopted, true);
    assert.match(fs.readFileSync(opts.configTarget, "utf8"), /providers/);
});

test("migrateLegacyInstall: the seeded no-content template counts as absent", () => {
    // A renamed build that started once before this migration existed leaves
    // exactly this behind — non-empty, but holding nothing.
    const { opts } = legacyInstall();
    write(opts.configTarget, '{\n  "providers": {\n  }\n}\n');
    assert.equal(migrateLegacyInstall(opts).configAdopted, true);
    assert.match(fs.readFileSync(opts.configTarget, "utf8"), /api\.x/);
});

test("migrateLegacyInstall: a config we cannot parse is somebody's edit and is left alone", () => {
    const { opts } = legacyInstall();
    write(opts.configTarget, '{ "providers": { "https://api.mine/v1": {} }, oops');
    const report = migrateLegacyInstall(opts);
    assert.equal(report.configAdopted, false);
    assert.match(fs.readFileSync(opts.configTarget, "utf8"), /api\.mine/);
});

test("migrateLegacyInstall: a config with real providers is the user's current intent and is never overwritten", () => {
    const { opts } = legacyInstall();
    write(opts.configTarget, '{ "providers": { "https://api.mine/v1": {} } }');
    const report = migrateLegacyInstall(opts);
    assert.equal(report.configAdopted, false);
    assert.match(fs.readFileSync(opts.configTarget, "utf8"), /api\.mine/);
});

test("migrateLegacyInstall: adoptConfig:false (an explicit --config) skips only the config", () => {
    const { opts } = legacyInstall();
    const report = migrateLegacyInstall({ ...opts, adoptConfig: false });
    assert.equal(report.configAdopted, false);
    assert.equal(fs.existsSync(opts.configTarget), false);
    // Directories are still adopted: the override names a config file, not a store.
    assert.equal(fs.existsSync(path.join(opts.dataTarget, "sessions", "a.json")), true);
});

test("migrateLegacyInstall: sessions and the CA tree are adopted recursively", () => {
    const { opts } = legacyInstall();
    migrateLegacyInstall(opts);
    assert.equal(fs.readFileSync(path.join(opts.dataTarget, "sessions", "a.json"), "utf8"), "session-a");
    assert.equal(fs.readFileSync(path.join(opts.dataTarget, "sessions", "nested", "b.json"), "utf8"), "session-b");
    // The CA must come across byte-identical: regenerating it silently breaks
    // every client that trusts the existing certificate.
    assert.equal(fs.readFileSync(path.join(opts.dataTarget, "ca", "ca.pem"), "utf8"), "CA-PEM");
    assert.equal(fs.readFileSync(path.join(opts.dataTarget, "ca", "ca.key"), "utf8"), "CA-KEY");
});

test("migrateLegacyInstall: existing destination files are never overwritten", () => {
    const { opts } = legacyInstall();
    write(path.join(opts.dataTarget, "sessions", "a.json"), "live-session-a");
    migrateLegacyInstall(opts);
    assert.equal(fs.readFileSync(path.join(opts.dataTarget, "sessions", "a.json"), "utf8"), "live-session-a");
    // ...and the file that was missing still lands.
    assert.equal(fs.readFileSync(path.join(opts.dataTarget, "sessions", "nested", "b.json"), "utf8"), "session-b");
});

test("migrateLegacyInstall: functional state is adopted; liveness markers and logs are not", () => {
    const { opts } = legacyInstall();
    migrateLegacyInstall(opts);
    assert.equal(fs.existsSync(path.join(opts.stateTarget, "prefix-affinity.json")), true);
    assert.equal(fs.existsSync(path.join(opts.stateTarget, "plugin-conversations.json")), true);
    // Stale liveness/zone markers would make a dead proxy look live or make the
    // new proxy fight the old one for the same port zone.
    assert.equal(fs.existsSync(path.join(opts.stateTarget, "port-zone.json")), false);
    assert.equal(fs.existsSync(path.join(opts.stateTarget, "proxy-origin")), false);
    assert.equal(fs.existsSync(path.join(opts.stateTarget, "instances", "dead.json")), false);
    assert.equal(fs.existsSync(path.join(opts.stateTarget, "bili.log")), false);
});

test("migrateLegacyInstall: the legacy tree is left byte-identical (copy, never move)", () => {
    const { root, opts } = legacyInstall();
    const before = [
        path.join(root, "config", "billion-context.json"),
        path.join(root, "data", "sessions", "a.json"),
        path.join(root, "data", "ca", "ca.key"),
        path.join(root, "state", "prefix-affinity.json"),
    ].map((f) => fs.readFileSync(f, "utf8"));
    migrateLegacyInstall(opts);
    const after = [
        path.join(root, "config", "billion-context.json"),
        path.join(root, "data", "sessions", "a.json"),
        path.join(root, "data", "ca", "ca.key"),
        path.join(root, "state", "prefix-affinity.json"),
    ].map((f) => fs.readFileSync(f, "utf8"));
    assert.deepEqual(after, before);
});

test("migrateLegacyInstall: a second run copies nothing more (idempotent)", () => {
    const { opts } = legacyInstall();
    const first = migrateLegacyInstall(opts);
    assert.ok(first.filesCopied > 0);
    const second = migrateLegacyInstall(opts);
    assert.equal(second.filesCopied, 0);
    assert.equal(second.bytesCopied, 0);
    assert.equal(second.configAdopted, false);
});

test("migrateLegacyInstall: a half-migrated tree converges", () => {
    // Simulate an interrupted run: one session and one CA file made it across.
    const { opts } = legacyInstall();
    write(path.join(opts.dataTarget, "sessions", "a.json"), "session-a");
    write(path.join(opts.dataTarget, "ca", "ca.pem"), "CA-PEM");
    const report = migrateLegacyInstall(opts);
    assert.equal(report.filesCopied, 4); // b.json, ca.key, and the two state files
    assert.equal(fs.existsSync(path.join(opts.dataTarget, "ca", "ca.key")), true);
    assert.equal(migrateLegacyInstall(opts).filesCopied, 0);
});

test("migrateLegacyInstall: dryRun reports the work without writing anything", () => {
    const { opts } = legacyInstall();
    const report = migrateLegacyInstall({ ...opts, dryRun: true });
    assert.equal(report.configAdopted, true);
    assert.ok(report.filesCopied > 0);
    assert.ok(report.bytesCopied > 0);
    assert.equal(fs.existsSync(opts.configTarget), false);
    assert.equal(fs.existsSync(path.join(opts.dataTarget, "sessions", "a.json")), false);
});

test("migrateLegacyInstall: bytesCopied reflects the copied artefacts", () => {
    const { opts } = legacyInstall();
    const report = migrateLegacyInstall(opts);
    const sessions = fs.readFileSync(path.join(opts.dataTarget, "sessions", "a.json")).length;
    assert.ok(report.bytesCopied >= sessions);
    assert.ok(report.bytesCopied > 0);
});

test("migrateLegacyInstall: only a legacy data dir (no config, no state) still migrates", () => {
    const root = tmp("partial");
    const home = tmp("home2");
    write(path.join(root, "data", "sessions", "s.json"), "only-sessions");
    const report = migrateLegacyInstall({
        env: {},
        configTarget: path.join(home, "sophialin-context.json"),
        dataTarget: path.join(home, "data"),
        stateTarget: path.join(home, "state"),
        legacyConfig: path.join(root, "config", "billion-context.json"),
        legacyData: path.join(root, "data"),
        legacyState: path.join(root, "state"),
    });
    assert.equal(report.skipped, false);
    assert.equal(report.configAdopted, false);
    assert.equal(fs.readFileSync(path.join(home, "data", "sessions", "s.json"), "utf8"), "only-sessions");
});
