# 改名执行记录 — billion-context → sophialin-context

- 时间: 2026-10-11T02:44:24.946Z
- 仓库根: `D:\dsh\sophialin-context`
- 模式: **APPLY（已落盘，每文件旁有 .bak-2026-10-11T02-44-24-161Z 备份）**
- 扫描入范围文件: 569（全仓 701，排除 .git / node_modules / dist / LICENSE / CHANGELOG.md）
- 命中文件: **406**，替换点: **8133**

## 替换规则（顺序敏感）

| # | 旧 → 新 |
|---|---|
| 1 | `https:\/\/raw\.githubusercontent\.com\/ranxianglei\/billion-context\/master\/` → `https://raw.githubusercontent.com/AEmbers/sophialin-context/main/` |
| 2 | `https:\/\/github\.com\/ranxianglei\/billion-context\/blob\/master\/` → `https://github.com/AEmbers/sophialin-context/blob/main/` |
| 3 | `ranxianglei\/billion-context(?!-pi)` → `AEmbers/sophialin-context` |
| 4 | `␣BILLION_CONTEXT` → `SOPHIALIN_CONTEXT` |
| 5 | `␣BillionContext` → `SophialinContext` |
| 6 | `␣billionContext` → `sophialinContext` |
| 7 | `billion-context(?!-pi)` → `sophialin-context` |
| 8 | `__bili␣` → `__sophialin` |
| 9 | `␣BILI(?!ZSTD1␣|ENC1␣)` → `SOPHIALIN` |
| 10 | `␣bili-native␣` → `sophialin-native` |
| 11 | `␣bili-proxy␣` → `sophialin-proxy` |
| 12 | `␣bili\.log␣` → `sophialin.log` |
| 13 | `␣Bili(?=[A-Z])` → `Sophialin` |
| 14 | `␣bili(?=[A-Z])` → `sophialin` |
| 15 | `␣bili␣` → `sophialin` |

## 按替换目标统计

| 新值 | 命中数 |
|---|---|
| `sophialin` | 4376 |
| `SOPHIALIN` | 1860 |
| `sophialin-context` | 741 |
| `SOPHIALIN_CONTEXT` | 509 |
| `__sophialin` | 485 |
| `sophialin.log` | 72 |
| `sophialin-native` | 40 |
| `AEmbers/sophialin-context` | 25 |
| `sophialinContext` | 10 |
| `sophialin-proxy` | 8 |
| `Sophialin` | 4 |
| `https://github.com/AEmbers/sophialin-context/blob/main/` | 2 |
| `https://raw.githubusercontent.com/AEmbers/sophialin-context/main/` | 1 |

## 刻意不改（出处 / 上游归属 / 历史）

- `LICENSE`（MIT 版权声明，必须原样保留）
- `CHANGELOG.md`（历史流水，记录的是过去发布）
- 命中保护片段、原样放回的（只冻结这一段，同行其余部分照常改名）：
  - `https:\/\/github\.com\/ranxianglei\/billion-context\/(?:issues|pull|discussions)\/\d+`
  - `ranxianglei\/billion-context\/(?:issues|pull|discussions)\/\d+`
  - `ranxianglei\/billion-context-pi`
  - `billion-context-pi`
  - `billion-context-omp`
  - `billion-context-advisories`
  - `\bBiliMessage\b`
  - `rework of billion-context`
  - `based on billion-context`
  - `upstream\s+billion-context`
  - `Copyright[^\n]{0,80}billion-context`
- `dist/**`（构建产物，改名后由 `npm run build` 重新生成）

## 命中文件明细（按命中数降序）

| 文件 | 命中 | 样例行 |
|---|---|---|
| `tests\launcher.test.ts` | 430 | L134: process.env.XDG_STATE_HOME = fs.mkdtempSync(path.join(os.tmpdir(), "bili-launcher-state-"));<br>L135: // A host harness that launches bili (omp, codex, claude) exports its client binary,<br>L137: // runLaunch launches, because BILI_CLIENT_BIN outranks `client: "pi"` |
| `CONFIGURATION.md` | 358 | L1: # billion-context Configuration Reference<br>L5: `billion-context` is an HTTP proxy that injects [ACP](https://github.com/ranxianglei/acp-kernel) (Active Context Pruning) context compression into LLM API strea<br>L13: \| **Config file (Linux)** \| `~/.config/billion-context/billion-context.json` \| XDG Base Directory — the canonical, user-editable config \| |
| `CONFIGURATION.zh-CN.md` | 337 | L1: # billion-context 配置参考<br>L5: `billion-context` 是一个 HTTP 代理，用于将 [ACP](https://github.com/ranxianglei/acp-kernel)（Active Context Pruning，主动上下文剪枝）的上下文压缩注入到 LLM API 流中。下文所有选项都位于同一个 JSON 配置文件中（也<br>L13: \| **配置文件（Linux）** \| `~/.config/billion-context/billion-context.json` \| XDG 基础目录规范 —— 标准、用户可编辑的配置 \| |
| `src\launcher.ts` | 321 | L2: * `bili <client>` launcher — brings up the proxy on an independent port and<br>L7: *   - HTTP upstreams → `/bili/` baseURL rewrite (cert MITM can't intercept<br>L9: *     claude `ANTHROPIC_BASE_URL` env, pi via `registerProvider` in the bili |
| `tests\plugin-agent.test.ts` | 260 | L15: import biliPlugin, { createBiliPlugin } from "../src/agent/pi.ts";<br>L35: test("proxyBaseFromUrl detects /bili/ prefix and returns origin", () => {<br>L36: assert.equal(proxyBaseFromUrl("http://127.0.0.1:8787/bili/https://api.example.com/v1"), "http://127.0.0.1:8787"); |
| `src\server.ts` | 220 | L67: import { ABSORB_TOOL_NAME, COMPRESS_TOOL, BILI_ACP_TOOLS_ANTHROPIC, BILI_ACP_TOOLS_ANTHROPIC_NO_RANGE, BILI_ACP_TOOLS_GOOGLE, BILI_ACP_TOOLS_GOOGLE_NO_RANGE, BI<br>L117: import { BILI_PASSTHROUGH_HEADER, BILI_PLUGIN_BYPASS_HEADER, hardenOpenaiAssistantContent, isLoopbackAddress, inspectContextOverflow, reserveOutputHeadroom, res<br>L120: import { BILI_TUNNEL_HEADER, checkTunnelDestination, classifyIp, localMachineIps, normalizeIpLiteral, parseIpLiteral, tunnelAllowlistFromEnv } from "./tunnel-gu |
| `README.zh-CN.md` | 216 | L1: # billion-context<br>L5: <p align="center"><strong>上下文压缩插件</strong> — <em>billion-context is all you need。</em></p><br>L10: <a href="https://www.npmjs.com/package/billion-context"><img src="https://img.shields.io/npm/v/billion-context.svg?style=flat-square" alt="npm"></a> |
| `src\plugin-install.ts` | 216 | L1: // `bili plugin install\|remove\|list <agent>`: deploys the thin agent plugin<br>L3: // native config, pointing at THIS billion-context install's absolute path —<br>L9: //   codex    ~/.codex/config.toml        [mcp_servers.bili] |
| `README.md` | 213 | L1: # billion-context<br>L5: <p align="center"><strong>Context-compression plugin</strong> — <em>billion-context is all you need.</em></p><br>L10: <a href="https://www.npmjs.com/package/billion-context"><img src="https://img.shields.io/npm/v/billion-context.svg?style=flat-square" alt="npm"></a> |
| `tests\dsh-native.test.ts` | 165 | L14: process.env.BILI_ATTACH_EVIDENCE_GRACE_MS = "30";<br>L21: assert.deepEqual(planNativeDsh({ BILLION_CONTEXT_PLUGIN: "0" }), { mode: "off" });<br>L22: assert.deepEqual(planNativeDsh({ BILI_NATIVE_DSH: "0" }), { mode: "off" }); |
| `src\cli.ts` | 163 | L3: * `bili` — billion-context proxy CLI.<br>L3: * `bili` — sophialin-context proxy CLI.<br>L6: *   bili                          start the proxy (default command) |
| `tests\claude-native.test.ts` | 157 | L44: const HOOK_COMMAND = "/opt/bili/dist/claude-native-bootstrap.js";<br>L47: return `http://127.0.0.1:${port}/bili/https://api.anthropic.com`;<br>L69: test("applyClaudeManagedBlock: rewrites an older bili URL to the current port", () => { |
| `CLIENTS.zh-CN.md` | 139 | L3: [README 快速上手](README.zh-CN.md#快速上手)里一行带不过来的客户端细节都在这里:各模式(启动器 / `/bili/` URL 前缀 / 原生插件)如何把流量接进代理、往哪儿写了什么、已知局限有哪些。只想知道「该敲哪条命令」的话,从 [README](README.zh-CN.md) 开始 ——<br>L12: - **启动器:** `bili dsh` 经 `--patch` overlay(`~/.dsh-bili/.bili-acp.patch.yml`)注入完整原生插件 —— 每个 profile 启动即注册 bili 工具，模型请求盖 `x-bili-plugin` + dsh 会话 id(plugin 模式)，`/<br>L13: - **Profile 安装(免启动器)——统一泳道(#966):** `bili plugin install dsh` 对每个已存在的 profile 执行 `dsh plugin --profile <name> add billion-context` —— pnpm 把包装进各 profile 自己的 `no |
| `CLIENTS.md` | 138 | L4: [README Quickstart](README.md#quickstart): how each mode (launcher / `/bili/`<br>L16: - **Launcher:** `bili dsh` injects the full native plugin through a<br>L17: `--patch` overlay (`~/.dsh-bili/.bili-acp.patch.yml`) — every profile |
| `tests\opencode-v2.test.ts` | 114 | L8: import biliOpencodePlugin from "../src/agent/opencode.ts";<br>L22: if (url === "/__bili/plugin/tool" && req.method === "POST") {<br>L33: res.end(JSON.stringify({ ok: true, result: `Web UI: http://127.0.0.1:9/__bili/#/session/${data.conversationId}\n\n${body}` })); |
| `src\config.ts` | 99 | L55: *  client-sent roles and bili's own injected prompt alike (#552). Wins<br>L66: *  through bili at all. Store-rewriting native lanes (zcode today) skip<br>L77: *  the global `imageBilling`; env BILI_IMAGE_BILLING wins over both. */ |
| `tests\native-intercept.test.ts` | 92 | L18: assert.equal(isModelApiUrl("http://127.0.0.1:36485/__bili/plugin/manifest"), false);<br>L19: assert.equal(isModelApiUrl("http://127.0.0.1:36485/bili/http://127.0.0.1:8199/v1/messages"), false);<br>L20: assert.equal(isModelApiUrl("https://registry.npmjs.org/billion-context"), false); |
| `tests\plugin-install-opencode.test.ts` | 83 | L17: const NPM_ROOT = "/usr/local/lib/node_modules/billion-context";<br>L24: const shimDir = path.join(base, "opencode", "plugins", "billion-context");<br>L29: assert.equal(isNpmInstallForm("/usr/lib/node_modules/billion-context"), true); |
| `src\web\page.ts` | 81 | L19: return `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>billion-context<<br>L20: <header class="topbar"><div class="brand"><span class="logo">∞</span>billion-context<span class="ver">v${version}</span></div><nav class="nav"><a href="#/overvi<br>L20: <header class="topbar"><div class="brand"><span class="logo">∞</span>billion-context<span class="ver">v${version}</span></div><nav class="nav"><a href="#/overvi |
| `tests\opencode-native.test.ts` | 81 | L13: process.env.BILI_ATTACH_EVIDENCE_GRACE_MS = "30";<br>L28: test("shouldBootstrapNativeOpencode: true in a bare host with no bili env", () => {<br>L33: assert.equal(shouldBootstrapNativeOpencode({ BILLION_CONTEXT_PLUGIN: "0" }), false); |
| `src\agent\opencode-native.ts` | 76 | L9: //      `<proxy>/bili/<full-upstream-url>` and stamps nothing else — header<br>L13: //   3. set BILLION_CONTEXT_PROXY after bootstrap so tool execute() and the<br>L20: // is replaced with a new Request to `<proxy>/bili/<url>` carrying the same |
| `tests\web-routing.test.ts` | 73 | L29: const root = path.join(tmpdir(), `bili-web-routing-${process.pid}-${Date.now()}`);<br>L30: const biliConfig = path.join(root, "billion-context.json");<br>L30: const biliConfig = path.join(root, "sophialin-context.json"); |
| `src\agent\dsh-native.ts` | 67 | L3: // installed via `bili plugin install dsh` (cordis.patch.yml entry) or<br>L4: // injected by the `bili dsh` launcher through the same --patch overlay that<br>L6: //   1. plan: attach (BILLION_CONTEXT_ATTACH ?? BILLION_CONTEXT_PROXY — the |
| `src\agent\native-intercept.ts` | 65 | L2: // silently routes model-API requests through a bili proxy that the extension<br>L12: import { BILI_PASSTHROUGH_HEADER } from "../util.js";<br>L24: *  BILLION_CONTEXT_PROXY env) so event-time ownership checks disarm with |
| `src\agent\pi.ts` | 64 | L64: return process.env.BILLION_CONTEXT_PLUGIN_AGENT === "omp" ? "omp" : "pi";<br>L137: // the real Anthropic. pi is untouched (it stamps x-bili-plugin-conversation in<br>L152: // (a /bili/-wrapped URL, the BILLION_CONTEXT_PROXY origin, the MITM |
| `tests\wire-contract.test.ts` | 64 | L3: //   - tests/issue1299-anthropic-top-level.test.ts (#1301, bili served-surface layer)<br>L6: //   B. bili surfaces — everything bili itself builds/serves (BILI_* tools, synthesized<br>L6: //   B. bili surfaces — everything bili itself builds/serves (SOPHIALIN_* tools, synthesized |
| `tests\runtime-info.test.ts` | 61 | L46: const headers = { "x-bili-plugin": "dsh", "x-bili-plugin-max-output": "32768" };<br>L48: assert.equal(pluginReportedMaxOutput({ "x-bili-plugin-max-output": "32768" }), undefined);<br>L49: assert.equal(pluginReportedMaxOutput({ "x-bili-plugin": "dsh", "x-bili-plugin-max-output": "nope" }), undefined); |
| `TECHNICAL-NOTES.md` | 60 | L11: rewrites model traffic to `<proxy>/bili/<upstream-url>`, registers<br>L16: guess. Opt-out envs: `BILI_NATIVE_PI=0`, `BILI_NATIVE_OMP=0`, `BILI_NATIVE_OPENCODE=0`, `BILI_NATIVE_DSH=0`, `BILI_NATIVE_KIMI=0`, `BILI_NATIVE_HERMES=0`, `BILI<br>L26: \| Manually started `bili start` daemon (user zone, #1660) \| ✅ by default \| **user-zone** instance (no lane, no launch token): deliberately maintained by the use |
| `TECHNICAL-NOTES.zh-CN.md` | 60 | L7: 插件加载时**自拉起自己的代理**(已有健康实例则直接复用 —— 父进程 pid 看门狗在客户端退出时收掉它),把模型流量改写到 `<proxy>/bili/<上游URL>`,把 `compress` / `decompress` / `acp_status` 注册为客户端原生工具(plugin 模式),并把 `/ac<br>L7: 插件加载时**自拉起自己的代理**(已有健康实例则直接复用 —— 父进程 pid 看门狗在客户端退出时收掉它),把模型流量改写到 `<proxy>/bili/<上游URL>`,把 `compress` / `decompress` / `acp_status` 注册为客户端原生工具(plugin 模式),并把 `/ac<br>L17: \| 手工 `bili start` 常驻守护进程(用户主权区,#1660) \| ✅ 默认附着 \| **用户主权区**实例(无 lane、无 launch token):用户刻意维护 —— 其寿命与版本由你自己负责;仅当 `BILI_NATIVE_ATTACH_EXTERNAL=0/false` 显式关门时才拒绝 \| |
| `src\plugin.ts` | 55 | L9: import { ABSORB_TOOL_NAME, BILI_ACP_TOOLS_ANTHROPIC, BILI_ACP_TOOLS_ANTHROPIC_NO_RANGE, BILI_ACP_TOOLS_OPENAI, BILI_ACP_TOOLS_OPENAI_NO_RANGE, BILI_ACP_TOOLS_RE<br>L45: //   1. GETs /__bili/plugin/manifest and registers the served tool schemas<br>L48: //   2. sends x-bili-plugin: <agent> + x-bili-plugin-conversation: <id> on |
| `tests\hermes-native.test.ts` | 55 | L2: // Two halves: (1) the TS installer lane (`bili plugin install\|remove\|update hermes`)<br>L4: // runtime logic driven through subprocess python3 against a stub bili proxy.<br>L20: return fs.mkdtempSync(path.join(os.tmpdir(), `bili-hermes-${label}-`)); |
| `tests\kimi-native.test.ts` | 52 | L88: assert.deepEqual(planNativeKimi({ BILLION_CONTEXT_PLUGIN: "0" }), { mode: "off" });<br>L89: assert.deepEqual(planNativeKimi({ BILI_NATIVE_KIMI: "0" }), { mode: "off" });<br>L90: assert.deepEqual(planNativeKimi({ BILI_PROVIDER_REWRITES: "1" }), { mode: "off" }); |
| `src\compress-tool.ts` | 51 | L107: // sees is the kernel constant, verbatim. The BILI_ copies stay as the<br>L111: export const BILI_SEARCH_CONTEXT_TOOL = {<br>L117: export const BILI_SEARCH_CONTEXT_TOOL_OPENAI = { |
| `src\agent\opencode-v2.ts` | 50 | L35: //   x-bili-plugin-context-window never got stamped and the proxy silently<br>L51: import { BILI_COMPRESS_OPENAI_TOOLS, ABSORB_TOOL_OPENAI } from "../compress-tool.js";<br>L135: const pluginDisabled = (): boolean => process.env.BILLION_CONTEXT_PLUGIN === "0"; |
| `src\web\i18n.ts` | 50 | L13: "logs.sub": "bili.log 实时尾部 · 按会话 ID 或关键字过滤，支持上下文展开与时间窗",<br>L75: "sys.stale": "磁盘已有新版本 v{disk} —— 重启 bili 生效（当前运行 v{running}）",<br>L82: "conflict.desc": "：发现与 bili 并存的第三方压缩插件或客户端自动压缩痕迹。两个压缩器作用于同一会话会双压缩、破坏消息引用，可能导致上下文错乱——请只保留一个压缩器，详情见会话的 acp_status。", |
| `AGENTS.md` | 49 | L1: # billion-context Development Specification<br>L7: **billion-context** is an npm package (`bili` CLI) — a context-compression proxy for AI agents. It sits between an agent client and an upstream LLM provider, in<br>L7: **sophialin-context** is an npm package (`bili` CLI) — a context-compression proxy for AI agents. It sits between an agent client and an upstream LLM provider,  |
| `tests\upstream-proxy-routing.test.ts` | 49 | L35: test("/bili/ resolves upstream host and full path from embedded URL", () => {<br>L37: assert.deepEqual(resolveUpstream(opts, "/bili/https://relay.example/openai/v1/responses?foo=a%2Fb"), {<br>L43: assert.deepEqual(resolveUpstream(opts, "/bili/https://relay.example/openai/v1/future/unknown?x=1"), { |
| `tests\issue1086-chain-self-exemption.test.ts` | 48 | L19: // #1086: the v0.1.133 chain-detection content fallback judged bili's OWN<br>L21: // in the tools array) as evidence of an upstream bili instance, so a<br>L30: //      only x-bili-hop remains decisive verbatim passthrough. |
| `tests\session-gc.test.ts` | 48 | L190: { BILI_SESSION_GC: undefined, BILI_SESSION_GC_MAX_AGE_DAYS: undefined, BILI_SESSION_GC_MAX_TOKENS: undefined, BILI_SESSION_GC_INTERVAL_MS: undefined },<br>L195: await withEnv({ BILI_SESSION_GC: on }, async () => {<br>L200: await withEnv({ BILI_SESSION_GC: off }, async () => { |
| `tests\launcher-plugin-mode.test.ts` | 45 | L17: // (claude/codex spawned by `bili claude` / `bili codex`) bind into plugin mode<br>L18: // via POST /__bili/plugin/register. Two binding strategies, both covered:<br>L100: modelUrl: () => `http://127.0.0.1:${proxyPort}/bili/http://127.0.0.1:${upstreamPort}/v1/messages`, |
| `tests\plugin-protocol.test.ts` | 45 | L167: const resp = await fetch(`http://127.0.0.1:${h.proxyPort}/bili/http://127.0.0.1:${h.upstreamPort}/v1/messages`, {<br>L171: "x-bili-plugin": "pi-plugin/0.0.1",<br>L172: "x-bili-plugin-conversation": conversationId, |
| `tests\zcode-native.test.ts` | 41 | L64: assert.deepEqual(planNativeZcode({ BILLION_CONTEXT_PLUGIN: "0" }), { mode: "off" });<br>L65: assert.deepEqual(planNativeZcode({ BILI_NATIVE_ZCODE: "0" }), { mode: "off" });<br>L66: assert.deepEqual(planNativeZcode({ BILI_PROVIDER_REWRITES: "" }), { mode: "off" }); |
| `tests\tunnel-guard.test.ts` | 40 | L16: /** #409: the /bili/<absolute-url> tunnel must not reach the proxy's own<br>L207: assert.deepEqual(tunnelAllowlistFromEnv({ BILI_TUNNEL_ALLOWED_HOSTS: "127.0.0.1:8199, LANRELAY.EXAMPLE , ,10.0.0.5" }), ["127.0.0.1:8199", "lanrelay.example", "<br>L209: assert.deepEqual(tunnelAllowlistFromEnv({ BILI_TUNNEL_ALLOWED_HOSTS: "  " }), []); |
| `tests\web-sessions.test.ts` | 39 | L23: process.env.BILI_PERSIST_ZSTD = "0";<br>L66: // it in the raw file (plain JSON under BILI_PERSIST_ZSTD=0) for deterministic order.<br>L85: const dir = mkdtempSync(path.join(tmpdir(), "bili-web-sess-")); |
| `tests\admin-origin.test.ts` | 38 | L15: /** #115: DNS rebinding defense on /__bili/ management endpoints. An attacker<br>L31: { host: "127.0.0.1", port, path: "/__bili/config", headers },<br>L46: const root = path.join(tmpdir(), `bili-admin-origin-${process.pid}-${Date.now()}`); |
| `tests\issue1206-thirdparty-scan.test.ts` | 37 | L53: assert.equal(conflictScanEnabled({ BILI_CONFLICT_SCAN: "1" }), true);<br>L54: assert.equal(conflictScanEnabled({ BILI_CONFLICT_SCAN: "0" }), false);<br>L55: assert.equal(conflictScanEnabled({ BILI_CONFLICT_SCAN: "false" }), false); |
| `tests\e2e\e2e-native-dsh.test.ts` | 36 | L1: // E2E: REAL `dsh` (native profile lane, headless one-shot) through bili's<br>L4: // whole native chain — proxy bootstrap, fetch interception, x-bili-plugin<br>L25: //   fixture traffic direct; every hop staying stamped proves bili's fetch |
| `tests\admin-probe.test.ts` | 35 | L17: *  bili instances must return real health state instead of being tunneled and<br>L24: assert.equal(selfAdminProbePath(`http://127.0.0.1:${P}/__bili/health`, P), "/__bili/health");<br>L25: assert.equal(selfAdminProbePath(`http://127.0.0.1:${P}/__bili/config?x=1`, P), "/__bili/config?x=1", "query preserved"); |
| `tests\native-intercept-selfheal.test.ts` | 35 | L35: test("#1158 self-heal: third-party reset to a frozen bare fetch re-chains and keeps routing through bili", async () => {<br>L42: assert.deepEqual(bareSink, ["http://127.0.0.1:40001/bili/http://127.0.0.1:8199/v1/messages"]);<br>L57: await fetch()("https://registry.npmjs.org/billion-context"); |
| `tests\dsh-acp.test.ts` | 34 | L72: { BILLION_CONTEXT_PROXY: "http://127.0.0.1:8787", BILLION_CONTEXT_PLUGIN: undefined },<br>L74: "http://127.0.0.1:8787/__bili/plugin/status": {<br>L76: body: { ok: true, panel: "ACP Context Analysis\nbillion-context@9.9.9" }, |
| `tests\search-context-cross-session.test.ts` | 34 | L9: import { BILI_ACP_READONLY_TOOLS_RESPONSES, BILI_ACP_TOOLS_ANTHROPIC, BILI_ACP_TOOLS_OPENAI, BILI_ACP_TOOLS_RESPONSES } from "../src/compress-tool.ts";<br>L63: test("#841 schema: BILI arrays no longer add conversation_id to search_context (#1685); #1179 range args stay on decompress; compress is a description-only delt<br>L65: [BILI_ACP_TOOLS_ANTHROPIC, ACP_TOOLS_ANTHROPIC, "flat"], |
| `src\agent\shared.ts` | 33 | L22: /** Detect the proxy from a provider baseUrl's `/bili/` zero-config prefix.<br>L23: *  The real prefix embeds the full upstream URL (`/bili/https://…`), so the<br>L24: *  check requires `bili` as the first path segment followed by an http(s) |
| `tests\instance-governance.test.ts` | 33 | L30: const dir = fs.mkdtempSync(path.join(os.tmpdir(), "bili-inst-state-"));<br>L123: fs.mkdirSync(path.join(st.dir, "billion-context"), { recursive: true });<br>L140: const prevEnv = process.env.BILI_MCP_PROXY; |
| `tests\fix-806-request-watchdog.test.ts` | 32 | L30: const root = path.join(tmpdir(), `bili-fix806-${process.pid}-${Date.now()}`);<br>L31: const biliConfig = path.join(root, "billion-context.json");<br>L31: const biliConfig = path.join(root, "sophialin-context.json"); |
| `PLUGIN.md` | 30 | L1: # billion-context Cooperative Plugin Protocol<br>L3: > Status: protocol v1, experimental. Implemented by the proxy (`src/plugin.ts`), exercised by `tests/plugin-protocol.test.ts`. Issue: dog/billion-context#1 ("内外<br>L26: ### 1. `GET /__bili/plugin/manifest` |
| `src\zcode\native.ts` | 29 | L31: 'zcode v3.14+ client signing (#1621) rejects the http://127.0.0.1 /bili/ origin at model creation ("Client signing handshake requires HTTPS.") — skipping native<br>L38: // Kill-switches > attach (BILLION_CONTEXT_ATTACH ?? BILLION_CONTEXT_PROXY) ><br>L39: // spawn. A preset BILLION_CONTEXT_PROXY is the launcher (or a user attach): |
| `src\kimi\toml-edit.ts` | 28 | L7: export const KIMI_PROVIDER = "bili";<br>L8: export const KIMI_ALIAS = "bili-kimi";<br>L9: export const KIMI_MANAGED_BEGIN = "# bili begin (managed by billion-context — `bili plugin install kimi`)"; |
| `tests\advisory.test.ts` | 28 | L42: JSON.stringify({ name: "billion-context", version: "1.2.3", type: "module", main: "dist/index.js", bin: { bili: "./dist/index.js" } }),<br>L42: JSON.stringify({ name: "sophialin-context", version: "1.2.3", type: "module", main: "dist/index.js", bin: { bili: "./dist/index.js" } }),<br>L66: return JSON.stringify({ name: "billion-context", version, type: "module", main: "dist/index.js", bin: { bili: "./dist/index.js" } }); |
| `tests\issue1452-socket-hardening.test.ts` | 28 | L31: const root = path.join(tmpdir(), `bili-issue1452-${process.pid}-${Date.now()}`);<br>L32: const biliConfig = path.join(root, "billion-context.json");<br>L32: const biliConfig = path.join(root, "sophialin-context.json"); |
| `tests\opencode-native-v1.test.ts` | 28 | L88: assert.equal(openai.baseURL, `${origin}/bili/https://api.openai.com/v1`);<br>L89: assert.equal(local.baseURL, `${origin}/bili/http://127.0.0.1:8199/v1`);<br>L96: provider: { wrapped: { options: { baseURL: `${origin}/bili/https://api.openai.com/v1` } } }, |
| `tests\wire-contract-inventory.ts` | 28 | L14: BILI_ACP_READONLY_TOOLS_RESPONSES,<br>L15: BILI_ACP_TOOLS_ANTHROPIC,<br>L16: BILI_ACP_TOOLS_GOOGLE, |
| `scripts\windows-codex-mcp-check.ps1` | 26 | L5: Question answered: does `codex` accept the `<CODEX_HOME>-bili` overlay that<br>L6: `bili codex` produces, and register the `bili` MCP server from it?<br>L9: `bili codex mcp list` starts the bili proxy, points CODEX_HOME at the generated |
| `src\agent\native-bootstrap.ts` | 26 | L17: *  switch or the per-host opt-out key is set, or when a `bili` launch already<br>L18: *  owns a proxy (MITM transparent sets BILLION_CONTEXT_PROXY; /bili/ rewrite<br>L18: *  owns a proxy (MITM transparent sets SOPHIALIN_CONTEXT_PROXY; /bili/ rewrite |
| `tests\passthrough-visibility.test.ts` | 26 | L20: const root = path.join(tmpdir(), `bili-passthrough-state-${process.pid}-${Date.now()}`);<br>L21: const biliConfig = path.join(root, "billion-context.json");<br>L21: const biliConfig = path.join(root, "sophialin-context.json"); |
| `tests\ccr-plugin.test.ts` | 25 | L22: process.env.BILI_PERSIST = "0";<br>L174: const url = `http://127.0.0.1:${rig.proxyPort}/bili/http://127.0.0.1:${rig.upstreamPort}/v1/chat/completions`;<br>L177: headers: { "content-type": "application/json", "x-bili-plugin": "test-agent", "x-acp-session": convId }, |
| `src\mcp.ts` | 24 | L1: // MCP stdio thin shell for launcher mode (#162): a single "bili" MCP server<br>L2: // the hosts load via --mcp-config / -c mcp_servers.bili. It fetches the<br>L5: // POST /__bili/plugin/tool. Claude Code passes its session id via the MCP |
| `src\web\client.ts` | 24 | L8: const saved = localStorage.getItem("bili-language");<br>L46: await json("/__bili/config", { method: "PUT", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) });<br>L182: const d = await json("/__bili/overview"); |
| `tests\compress-observability.test.ts` | 24 | L159: const prev = process.env.BILI_MAX_SHRINK_PER_COMPRESS;<br>L160: process.env.BILI_MAX_SHRINK_PER_COMPRESS = "0.05";<br>L168: if (prev === undefined) delete process.env.BILI_MAX_SHRINK_PER_COMPRESS; |
| `tests\e2e\e2e-native-opencode.test.ts` | 24 | L1: // E2E: REAL `opencode` (native plugin lane) through bili's native extension<br>L4: // native chain — proxy bootstrap, URL interception, x-bili-plugin stamping,<br>L14: //   1. traffic is intercepted + plugin-mode claimed (x-bili-plugin: opencode + ses_ id) |
| `tests\e2e\e2e-native-pi.test.ts` | 24 | L1: // E2E: REAL `pi` (native package lane) through bili's native extension (#1239).<br>L4: // interception, x-bili-plugin stamping, ACP tool registration, plugin-tool<br>L10: //   1. traffic is intercepted + plugin-mode claimed (x-bili-plugin: pi) |
| `tests\update-dsh-self-refresh.test.ts` | 24 | L1: // #1196: a billion-context copy installed through dsh's plugin market has no<br>L2: // global bili driving refreshDshProfileBundles — the process running FROM the<br>L18: const root = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), "bili-dsh-selfrefresh-"))); |
| `src\update.ts` | 23 | L3: * billion-context and installs it by downloading the tarball and extracting<br>L13: *  - An exclusive lock file prevents multiple bili processes from updating<br>L38: // BILI_UPDATE_REGISTRY overrides the registry base URL (full URL, e.g. a |
| `tests\doctor.test.ts` | 23 | L1: // #1235: `bili doctor` — read-only audit of every install lane and registered<br>L69: packageName: "billion-context",<br>L70: global: { installDir: "/x/node_modules/billion-context", form: "npm", diskVersion: "0.1.143", runningVersion: "0.1.143", registryVersion: "0.1.143", updateTag:  |
| `tests\dsh-refresh.test.ts` | 23 | L23: assert.deepEqual(planDshSpawn("dsh", ["plugin", "--profile", "x", "add", "billion-context"], {}, "linux"), { command: "dsh", args: ["plugin", "--profile", "x", <br>L43: test("resolveDshBinary: BILI_DSH_BIN override wins even when the path does not exist", () => {<br>L44: assert.equal(resolveDshBinary({ BILI_DSH_BIN: "C:\\odd\\dsh.exe" }, "win32", () => false), "C:\\odd\\dsh.exe"); |
| `tests\e2e\README.md` | 23 | L1: # E2E: real codex client through bili against a real upstream<br>L4: upstream** through the bili proxy, and asserts the full context-management<br>L38: \| `E2E_UPSTREAM_URL` \| `http://127.0.0.1:8199/v1` \| Responses-compatible upstream (no `/bili/` prefix) \| |
| `tests\issue1569-window-stamp-and-anchor.test.ts` | 23 | L99: request: { url: `${globalThis.__miniOrigin}/bili/http://upstream.example/v1`, headers: { set: (k: string, v: string) => { store[k] = v; } } },<br>L115: await withEnv1569({ BILLION_CONTEXT_PROXY: undefined, BILLION_CONTEXT_PLUGIN: undefined }, async () => {<br>L122: assert.equal(r1["x-bili-plugin"], "opencode"); |
| `tests\persist-zstd.test.ts` | 23 | L47: const dir = mkdtempSync(join(tmpdir(), "bili-zstd-"));<br>L53: delete process.env.BILI_ENCRYPTION_KEY;<br>L54: delete process.env.BILI_PERSIST_ZSTD; |
| `tests\issue760-percall-conversation.test.ts` | 22 | L99: modelUrl: () => `http://127.0.0.1:${proxyPort}/bili/http://127.0.0.1:${upstreamPort}/v1/messages`,<br>L117: const res = await fetch(rig.proxyUrl("/__bili/plugin/tool"), {<br>L126: const res = await fetch(rig.proxyUrl(`/__bili/plugin/status?conversationId=${encodeURIComponent(conversationId)}`)); |
| `tests\omp-native.test.ts` | 22 | L13: // evaluation so any in-process bili extension backs off in THIS process.<br>L15: assert.equal(process.env.BILLION_CONTEXT_NATIVE, "omp");<br>L18: test("shouldBootstrapNativeOmp: true in a bare host with no bili env", () => { |
| `tests\persist-encryption.test.ts` | 22 | L40: const dir = mkdtempSync(join(tmpdir(), "bili-encrypt-"));<br>L46: delete process.env.BILI_ENCRYPTION_KEY;<br>L47: delete process.env.BILI_PERSIST_ZSTD; |
| `src\agent\omp-native.ts` | 21 | L3: // `bili plugin install omp`) gets full plugin-mode compression with NO<br>L9: //      are rewritten to `<proxy>/bili/<full-upstream-url>` (verified<br>L11: //   3. set BILLION_CONTEXT_PROXY so the shared plugin (pi.ts) detects the |
| `src\claude-native-bootstrap.ts` | 21 | L2: // ~/.claude/settings.json by `bili plugin install claude`. Claude Code has no<br>L7: //      (resolveClaudeNativePort: BILI_CLAUDE_NATIVE_PORT > config<br>L8: //      claude.nativePort > 48787) with a /bili/-wrapped upstream — full |
| `tests\decompress-empty-range.test.ts` | 21 | L11: process.env.BILI_PERSIST = "0";<br>L17: import { parseCompressInput, BILI_ACP_TOOLS_ANTHROPIC, BILI_ACP_TOOLS_ANTHROPIC_NO_RANGE, BILI_ACP_TOOLS_OPENAI, BILI_ACP_TOOLS_OPENAI_NO_RANGE, BILI_ACP_TOOLS_<br>L133: [BILI_ACP_TOOLS_ANTHROPIC, BILI_ACP_TOOLS_ANTHROPIC_NO_RANGE], |
| `tests\fix-1012-inherited-aux-egress.test.ts` | 21 | L19: process.env.XDG_STATE_HOME = fs.mkdtempSync(path.join(os.tmpdir(), "bili-1012-state-"));<br>L40: const home = fs.mkdtempSync(path.join(os.tmpdir(), "bili-1012-home-"));<br>L54: test("captureInheritedProxyEnv: forwards user proxy vars under BILI_INHERITED_* (upper wins, blanks skipped)", () => { |
| `src\persist.ts` | 20 | L38: *  - Disable with BILI_PERSIST=0 for ephemeral/test runs.<br>L40: *    is optionally zstd-compressed when BILI_PERSIST_ZSTD=1/true (default<br>L43: *    BILI_ENCRYPTION_KEY (hex/base64, exactly 32 bytes) is set (#708, |
| `tests\fix-1292-windows-claude-settings.test.ts` | 20 | L25: process.env.XDG_STATE_HOME = fs.mkdtempSync(path.join(os.tmpdir(), "bili-1292-state-"));<br>L28: "BILI_CLIENT_BIN",<br>L29: "BILLION_CONTEXT_PROXY", |
| `tests\issue1333-derived-inheritance.test.ts` | 20 | L377: // pi plugin shape (x-bili-plugin + x-bili-plugin-conversation stamped by<br>L401: const url = `http://127.0.0.1:${proxyPort}/bili/http://127.0.0.1:${relayPort}/v1/chat/completions`;<br>L421: const reg = await fetch(`http://127.0.0.1:${proxyPort}/__bili/plugin/register`, { |
| `src\agent\opencode-legacy.ts` | 19 | L4: // its own ref space + block store) to `bili plugin install opencode` still<br>L6: // `<dcp-message-id>` tags and their refs live in acp's store — bili's kernel<br>L8: // through opencode-acp, new sessions go through bili. |
| `src\agent\pi-native.ts` | 19 | L3: // manager or `bili plugin install pi`) gets full plugin-mode compression<br>L9: //      are rewritten to `<proxy>/bili/<full-upstream-url>`;<br>L10: //   3. set BILLION_CONTEXT_PROXY so the shared plugin (pi.ts) detects the |
| `src\dsh-channel.ts` | 19 | L3: // `bili plugin install\|remove dsh` drives dsh's own pnpm forwarder<br>L18: export const DSH_PACKAGE = "billion-context";<br>L44: export const DSH_PATCH_BEGIN = "# bili begin (managed by billion-context — `bili plugin install dsh`)"; |
| `tests\side-request-isolation.test.ts` | 19 | L125: // Born-dead session: the first request bili ever sees is already starved.<br>L337: const url = `http://127.0.0.1:${rig.proxyPort}/bili/http://127.0.0.1:${rig.upstreamPort}/v1/chat/completions`;<br>L341: "x-bili-plugin": "opencode", |
| `tests\update-host-guard.test.ts` | 19 | L25: const dshBundle = path.join(base, ".dsh", "profiles", "default", "node_modules", ".pnpm", "billion-context@0.1.121", "node_modules", "billion-context");<br>L28: const pnpmGlobal = path.join(base, "pnpm", "global", "5", ".pnpm", "billion-context@0.1.121", "node_modules", "billion-context");<br>L39: const piDir = path.join(base, "pi-root", "node_modules", "billion-context"); |
| `src\kimi\native.ts` | 18 | L25: // Kill-switches > attach (BILLION_CONTEXT_ATTACH ?? BILLION_CONTEXT_PROXY) ><br>L26: // spawn. A preset BILLION_CONTEXT_PROXY is the `bili kimi` launcher (or a user<br>L26: // spawn. A preset SOPHIALIN_CONTEXT_PROXY is the `bili kimi` launcher (or a user |
| `src\paths.ts` | 18 | L4: /** XDG base-directory paths for billion-context.<br>L7: *  conventional Linux/macOS locations instead of a bespoke ~/.bili/:<br>L10: *      $XDG_CONFIG_HOME/billion-context/billion-context.json |
| `tests\main-path-transport-retry.test.ts` | 18 | L8: process.env.BILI_REPLAY_RETRY_MAX = "3";<br>L9: process.env.BILI_REPLAY_RETRY_BASE_MS = "0";<br>L21: // (BILI_REPLAY_RETRY_MAX / BILI_REPLAY_RETRY_BASE_MS), HTTP verdicts stay |
| `tests\responses-instructions-drift.test.ts` | 18 | L31: assert.equal(instructionsFingerprintApplies({ "x-bili-plugin": "host", "x-bili-plugin-conversation": "c-1", "x-claude-code-session-id": "uuid-1" }), false);<br>L50: const base = { "x-bili-plugin": "opencode", "x-bili-plugin-conversation": "c-1", "x-bili-plugin-instructions-mutable": "1" };<br>L52: assert.equal(instructionsFingerprintApplies({ ...base, "x-bili-plugin-instructions-mutable": undefined }), false); |
| `src\agent\opencode.ts` | 17 | L1: // Thin opencode plugin for the billion-context proxy (`bili opencode`).<br>L1: // Thin opencode plugin for the sophialin-context proxy (`bili opencode`).<br>L3: // Activates ONLY when BILLION_CONTEXT_PROXY is set (the launcher sets it); |
| `tests\chain-checkpoint-step2.test.ts` | 17 | L38: processor: "bili-a",<br>L46: assert.deepEqual(parseChainCheckpoint(tag()), { v: 1, processor: "bili-a", issuedAt: T0, requestId: "req-1", digest: GOOD_DIGEST });<br>L47: assert.ok(parseChainCheckpoint(`${L}bili-chain digest="${GOOD_DIGEST}" request-id="r" issued-at="${T0}" processor="p" v="1"/${R}`), "attr order is irrelevant"); |
| `tests\chain-checkpoint-step3.test.ts` | 17 | L25: *  shape dies inside bili's OWN pipeline via coreToGoogle's alternation<br>L36: const FIELDS = { v: 1, processor: "bili-a", issuedAt: T0, requestId: "req-1" };<br>L82: const t2 = tag({ processor: "bili-b", requestId: "req-2" }); |
| `tests\issue927-opencode-install.test.ts` | 17 | L40: const home = fs.mkdtempSync(path.join(os.tmpdir(), "bili-oc927-"));<br>L52: BILI_CLIENT_BIN: undefined,<br>L53: BILI_MCP_PROXY: "http://127.0.0.1:8787", |
| `tests\pi-native.test.ts` | 17 | L12: // async bootstrap writes BILLION_CONTEXT_PROXY) for its action-time back-off.<br>L14: assert.equal(process.env.BILLION_CONTEXT_NATIVE, "pi");<br>L17: test("shouldBootstrapNative: true in a bare host with no bili env", () => { |
| `src\upstream-proxy.ts` | 16 | L24: biliPort?: number;<br>L26: globalSource?: "bili-env" \| "web-manual" \| "config" \| "auto" \| "direct";<br>L96: export function parseHttpProxy(proxy?: string, biliPort?: number): ParsedHttpProxy \| undefined { |
| `tests\bili-artifact-strip.test.ts` | 16 | L18: const FIELDS = { v: 1 as const, processor: "bili-a", issuedAt: T0, requestId: "req-1" };<br>L23: const REORDERED = `${L}bili-chain digest="${GOOD_DIGEST}" request-id="req-1" issued-at="${T0}" processor="bili-a" v="1"/${R}`;<br>L24: const NO_DIGEST = `${L}bili-chain v="1" processor="bili-a" issued-at="${T0}" request-id="req-1"/${R}`; |
| `tests\issue1683-chain-egress-off.test.ts` | 16 | L6: import { startServer, BILI_HOP_HEADER } from "../src/server.ts";<br>L13: /** #1683 (+ follow-up): the `<bili-chain …/>` checkpoint carrier is model-visible<br>L17: *  egress stamping behind the `chainEgressStamp` opt-in (env BILI_CHAIN_STAMP) |
| `tests\upstream-fail.test.ts` | 16 | L130: test("fetchWithRetry: BILI_REPLAY_RETRY_MAX=1 keeps legacy fail-fast for network failures (#1263)", async () => {<br>L132: const prev = process.env.BILI_REPLAY_RETRY_MAX;<br>L133: process.env.BILI_REPLAY_RETRY_MAX = "1"; |
| `tests\codex-compact-e2e.test.ts` | 15 | L16: // compaction requests. When BILI_CODEX_COMPACT=intercept, the client is codex,<br>L18: // block to hand off), bili forges a success response and never contacts<br>L109: if (opts.mode === undefined) delete process.env.BILI_CODEX_COMPACT; |
| `tests\launcher-gemini-family.test.ts` | 15 | L32: test("discoverRoutes: gemini default → GOOGLE_GEMINI_BASE_URL /bili/ rewrite of generativelanguage", () => {<br>L40: const wrapped = `${ORIGIN}/bili/https://generativelanguage.googleapis.com`;<br>L55: test("discoverRoutes: iflow default → IFLOW_BASE_URL /bili/ rewrite of apis.iflow.cn/v1", () => { |
| `tests\loop-core.test.ts` | 15 | L339: process.env.BILI_REPLAY_RETRY_BASE_MS = "1";<br>L358: delete process.env.BILI_REPLAY_RETRY_BASE_MS;<br>L364: process.env.BILI_REPLAY_RETRY_BASE_MS = "1"; |
| `tests\port-zone.test.ts` | 15 | L21: const dir = mkdtempSync(path.join(tmpdir(), "bili-port-zone-"));<br>L76: test("lanePreferredPort: sticky record beats the base; base honors BILI_ZONE_PORT", () => {<br>L79: assert.equal(lanePreferredPort("zcode", { BILI_ZONE_PORT: "20000" }), 20000, "env override of the base"); |
| `src\agent\dsh-acp.ts` | 14 | L2: // Injected by the `bili dsh` launcher through a `--patch` overlay that<br>L10: export const name = "bili-acp";<br>L29: text: "bili: no proxy detected — launch dsh through `bili dsh` so /acp can read context status.", |
| `src\agent\dsh-native-client.ts` | 14 | L30: const NS = "bili";<br>L33: "nav": "bili设置",<br>L34: "title": "billion-context 压缩代理", |
| `src\agent\opencode-acp-command.ts` | 14 | L3: // the identical command: the launcher-gated plugin (BILLION_CONTEXT_PROXY set<br>L4: // by `bili opencode`) and the native V1 entry (src/agent/opencode-native.ts,<br>L57: console.error("[bili-opencode] /acp render failed: session.prompt unavailable"); |
| `src\tunnel-guard.ts` | 14 | L5: * Tunnel admission for the `/bili/<absolute-url>` zero-config branch (#409).<br>L8: * hosts, loopback-only blind tunnels). The /bili/ absolute-URL side had none:<br>L9: * it would happily forward to the proxy's OWN /__bili/ management plane (the |
| `src\zcode\json-edit.ts` | 14 | L21: export const ZCODE_PLUGIN_HEADER = "x-bili-plugin";<br>L54: const WRAPPED_URL_RE = /^https?:\/\/[^/]+\/bili\/(https?:\/\/.+)$/;<br>L104: *  handshake path from origin alone, dropping any /bili/ prefix — so a |
| `tests\anthropic-cache-control.test.ts` | 14 | L11: // #1637: bili's Anthropic lane never emitted cache_control breakpoints, so<br>L12: // Anthropic-style upstreams (explicit caching) never cached anything bili<br>L106: return fetch(`http://127.0.0.1:${rig.proxyPort}/bili/http://127.0.0.1:${port}/v1/messages`, { |
| `tests\codex-install-block-end.test.ts` | 14 | L9: // #1064: codexInstall ended the [mcp_servers.bili] block at indexOf("\n["),<br>L16: "[mcp_servers.bili]",<br>L28: const home = mkdtempSync(join(tmpdir(), "bili-codex-home-")); |
| `tests\dsh-settings-ui.test.ts` | 14 | L34: if ((req.url ?? "").startsWith("/__bili/plugin/manifest")) {<br>L67: const home = fs.mkdtempSync(path.join(os.tmpdir(), "bili-dsh-ui-"));<br>L69: await withEnv({ DSH_HOME: home, BILLION_CONTEXT_PROXY: proxy.origin }, async () => { |
| `tests\error-dump.test.ts` | 14 | L12: const savedGate = process.env.BILI_DUMP_4XX;<br>L13: const savedCap = process.env.BILI_DUMP_4XX_MAX_BYTES;<br>L17: if (savedGate === undefined) delete process.env.BILI_DUMP_4XX; |
| `tests\host-usage-postfold.test.ts` | 14 | L22: process.env.BILI_PERSIST_ZSTD = "0";<br>L88: const dir = mkdtempSync(join(tmpdir(), `bili-host-usage-${name}-`));<br>L407: const url = `http://127.0.0.1:${proxyPort}/bili/http://127.0.0.1:${relayPort}/v1/chat/completions`; |
| `tests\issue1284-misrouted-messages.test.ts` | 14 | L42: const root = path.join(tmpdir(), `bili-issue1284-${process.pid}-${Date.now()}`);<br>L43: const biliConfig = path.join(root, "billion-context.json");<br>L43: const biliConfig = path.join(root, "sophialin-context.json"); |
| `tests\stream-keepalive.test.ts` | 14 | L17: // ~303s while leg 2 survived. beginStreamKeepalive emits `: bili-keepalive`<br>L20: const KEEPALIVE_LINE = ": bili-keepalive";<br>L113: process.env.BILI_STREAM_KEEPALIVE_MS = "300"; |
| `src\server\context-window.ts` | 13 | L4: // #300: bili→bili chain marker. When a bili instance forwards a request it has<br>L5: // processed upstream, it stamps this header with its own instance id. A bili<br>L6: // instance that RECEIVES a request already carrying it knows an upstream bili |
| `tests\persist-tail.test.ts` | 13 | L14: process.env.BILI_PERSIST_ZSTD = "0";<br>L18: // messages are dropped until the view fits BILI_PERSIST_TAIL_TOKENS. The raw<br>L50: const proto = readdirSync(dir).find((d) => d !== ".bili-migration-286.done"); |
| `tests\proxy-noinject-tag-strip.test.ts` | 13 | L137: const resp = await fetch(`http://127.0.0.1:${h.proxyPort}/bili/http://127.0.0.1:${h.upstreamPort}/v1/messages`, {<br>L166: const resp = await fetch(`http://127.0.0.1:${h.proxyPort}/bili/http://127.0.0.1:${h.upstreamPort}/v1/messages`, {<br>L183: const resp = await fetch(`http://127.0.0.1:${h.proxyPort}/bili/http://127.0.0.1:${h.upstreamPort}/v1/chat/completions`, { |
| `tests\watchdog-health.test.ts` | 13 | L12: /** #1322: /__bili/health must expose the session-lifecycle watchdog state so<br>L15: *  of them). This file covers the ARMED side: BILI_PARENT_PID is captured when<br>L19: const root = path.join(tmpdir(), `bili-watchdog-armed-${process.pid}-${Date.now()}`); |
| `tests\zero-config-routing.test.ts` | 13 | L23: test("zero-config /bili/ route: strips prefix, uses embedded URL verbatim", () => {<br>L24: const r = resolveUpstream(BASE_OPTS, "/bili/https://open.bigmodel.cn/api/anthropic/v1/messages");<br>L30: test("zero-config /bili/ route: works with trailing path segments", () => { |
| `src\client-config.ts` | 12 | L95: *  the other stock model gateways so `bili omp` / `bili opencode` cert-MITM<br>L170: *  wraps IT via /bili/ instead of the stock Google endpoint. */<br>L206: *  rustls (webpki roots), so bili's CA is untrusted and cert-MITM cannot reach |
| `src\server\chain-artifacts.ts` | 12 | L1: // #1086: content fallback for bili→bili chain detection. When a middlebox<br>L2: // strips bili's x-bili-hop header, the only remaining signal that an upstream<br>L3: // bili instance already compressed the payload is the ACP artifacts inside |
| `tests\e2e\e2e-codex.test.ts` | 12 | L14: const UPSTREAM_KEY = process.env.E2E_UPSTREAM_KEY ?? "bili-local-test";<br>L25: const CODEX_CWD = fs.mkdtempSync(path.join(os.tmpdir(), "billion-context-e2e-"));<br>L59: return { BILI_LAUNCHER_MODEL_WINDOWS: JSON.stringify({ [MODEL]: contextWindow }) }; |
| `tests\e2e\e2e-subagent-sessions.test.ts` | 12 | L51: const sibling = path.join(path.dirname(REPO_ROOT), "billion-context-e2e-native-oc");<br>L156: key.startsWith("BILI") \|\|<br>L157: key.startsWith("BILLION_CONTEXT") \|\| |
| `tests\issue1002-opencode-foreign-entries.test.ts` | 12 | L1: // #1002: `bili plugin install/remove opencode` must be lossless on foreign<br>L4: // re-runs never rewrite the file; the .bili-bak backup reflects the state<br>L32: const home = fs.mkdtempSync(path.join(os.tmpdir(), "bili-oc1002-")); |
| `tests\watchdog-health-daemon.test.ts` | 12 | L13: *  BILI_PARENT_PID is a daemon — its health must say `armed:false` and it must<br>L15: *  because src/server.ts captures BILI_PARENT_PID at module load. */<br>L17: const root = path.join(tmpdir(), `bili-watchdog-daemon-${process.pid}-${Date.now()}`); |
| `tests\zcode-json-edit.test.ts` | 12 | L28: // pre-#1622 whitelist behavior (still available via BILI_ZCODE_ROUTE=plans).<br>L102: assert.equal(parsed.provider["builtin:bigmodel-coding-plan"].options.baseURL, `${ORIGIN_A}/bili/${UPSTREAM}`);<br>L115: assert.equal(parsed.provider["builtin:bigmodel-coding-plan"].options.baseURL, `${ORIGIN_B}/bili/${UPSTREAM}`); |
| `src\chain-checkpoint.ts` | 11 | L6: // bili pipeline; downstream bili instances recognize it and forward silently<br>L13: // bili trusts. Step 3 (#1421) changed only WHERE the carrier sits (the<br>L17: // ONLY in a bili-owned trailing control slot — the trailing run of user-role |
| `src\fetch-util.ts` | 11 | L52: *  BILI_UPSTREAM_TIMEOUT_MS (milliseconds). Read on each call so tests can<br>L58: *  (BILI_STREAM_STALL_MS) was retired in #1706/#1714 — local-model<br>L63: const raw = Number(process.env.BILI_UPSTREAM_TIMEOUT_MS); |
| `src\thirdparty-scan.ts` | 11 | L5: // the client's view silently scrambles. The installer swaps out bili's own<br>L8: // bili — nothing detects that today. This module scans the client's plugin<br>L10: //   1. known conflicting entries (bili's siblings, when not absorbed by design); |
| `tests\e2e-bili-chain.test.ts` | 11 | L7: import { startServer, BILI_HOP_HEADER } from "../src/server.ts";<br>L13: /** #300: chained bili instances (A forward → B) must not double-process.<br>L14: *  A stamps x-bili-hop on processed forwards; B, seeing a foreign marker, |
| `tests\hook-command.test.ts` | 11 | L10: // The SessionStart hook is the one place bili hands a client a SHELL STRING<br>L17: const JS = "C:\\Users\\u\\AppData\\Local\\Temp\\bili\\claude-native-bootstrap.js";<br>L22: "D:/Dev/node/node.exe C:/Users/u/AppData/Local/Temp/bili/claude-native-bootstrap.js", |
| `tests\issue767-pixel-billing.test.ts` | 11 | L30: // ("pixels" \| "bytes", env BILI_IMAGE_BILLING overrides both) charges by a<br>L185: process.env.BILI_IMAGE_TOKEN_CAP = "500";<br>L190: delete process.env.BILI_IMAGE_TOKEN_CAP; |
| `tests\log-mask.test.ts` | 11 | L33: /** #255 Part B: logs (bili.log + launcher tmp log) must carry no sensitive<br>L70: maskUrlsInText("/bili/http://relay.internal:8443/v1/messages"),<br>L71: "/bili/http://<private-host>:8443/v1/messages", |
| `tests\opencode-launcher.test.ts` | 11 | L7: // The launcher plugin reads BILLION_CONTEXT_PROXY AT IMPORT TIME (the<br>L8: // `bili opencode` launcher sets it). Arm it before the dynamic import so this<br>L17: if ((req.url ?? "") === "/__bili/health") { |
| `tests\preflight-fail-fast.test.ts` | 11 | L9: process.env.BILI_REPLAY_RETRY_MAX = "1";<br>L129: const r = await fetch(`http://127.0.0.1:${proxyPort}/bili/http://127.0.0.1:${upstreamPort}/v1/messages`, {<br>L188: const r1 = await fetch(`http://127.0.0.1:${proxyPort}/bili/http://127.0.0.1:${upstreamPort}/v1/messages`, { |
| `tests\preflight-hold.test.ts` | 11 | L9: process.env.BILI_REPLAY_RETRY_MAX = "1";<br>L12: process.env.BILI_PREFLIGHT_HOLD_MS = "300";<br>L23: // hold grace (BILI_PREFLIGHT_HOLD_MS, default 30s) the proxy must commit the |
| `src\mitm.ts` | 10 | L35: log(`mitm ${maskHostForLog(host)}:${port} client REJECTED the MITM certificate — it does not trust bili's root CA. Install it in the client's/system trust store<br>L69: log?.(`mitm ${maskHostForLog(host)} BLIND TUNNEL WARNING: this host is not in the MITM whitelist, so bili relays its TLS traffic opaquely and CANNOT see or comp<br>L69: log?.(`mitm ${maskHostForLog(host)} BLIND TUNNEL WARNING: this host is not in the MITM whitelist, so bili relays its TLS traffic opaquely and CANNOT see or comp |
| `tests\cli-parseargs.test.ts` | 10 | L5: // #346: the gost-style `-F <url>` (forward) flag sets bili's upstream proxy.<br>L6: // bili flags must precede the client name; everything after the client name is<br>L9: test("parseArgs: -F before the client sets BILI_UPSTREAM_PROXY (#346)", () => { |
| `tests\codex-compact.test.ts` | 10 | L24: const prev = process.env.BILI_CODEX_COMPACT;<br>L26: delete process.env.BILI_CODEX_COMPACT;<br>L28: process.env.BILI_CODEX_COMPACT = "pass"; |
| `tests\compat-roles.test.ts` | 10 | L109: *  the bare conversation — bili's own injected system prompt would otherwise<br>L117: const root = path.join(tmpdir(), `bili-compat-roles-${process.pid}-${Date.now()}`);<br>L118: const biliConfig = path.join(root, "billion-context.json"); |
| `tests\e2e\e2e-codex-fake.test.ts` | 10 | L19: const CWD_ROOT = path.join(os.tmpdir(), "billion-context-e2e");<br>L79: return { BILI_LAUNCHER_MODEL_WINDOWS: JSON.stringify({ [MODEL]: contextWindow }) };<br>L126: `base_url = "http://127.0.0.1:${ctx.port}/bili/http://127.0.0.1:${ctx.fakePort}/v1"`, |
| `tests\e2e-plugin-tool-routing.test.ts` | 10 | L19: // BILI_MCP_PROXY + BILI_CONVERSATION_ID) is covered by spawning the REAL<br>L82: const conv = req.headers["x-bili-plugin-conversation"];<br>L150: chatUrl: `http://127.0.0.1:${proxyPort}/bili/http://127.0.0.1:${relayPort}/v1/chat/completions`, |
| `tests\e2e-relay-5xx-selfheal.test.ts` | 10 | L10: process.env.BILI_REPLAY_RETRY_MAX = "1";<br>L27: // Fixture shape (deterministic — no real model involved): bili's configured<br>L31: // the relay fits bili's view but not the relay's). The conversation's wire |
| `tests\fix-806-malformed-body.test.ts` | 10 | L41: const root = path.join(tmpdir(), `bili-fix806mb-${process.pid}-${Date.now()}`);<br>L42: const biliConfig = path.join(root, "billion-context.json");<br>L42: const biliConfig = path.join(root, "sophialin-context.json"); |
| `tests\golden\wire-contract\manifest-default.json` | 10 | L4: "proxy": "billion-context",<br>L603: "agent": "x-bili-plugin",<br>L604: "conversation": "x-bili-plugin-conversation", |
| `tests\golden\wire-contract\manifest-optin.json` | 10 | L4: "proxy": "billion-context",<br>L791: "agent": "x-bili-plugin",<br>L792: "conversation": "x-bili-plugin-conversation", |
| `tests\mitm.test.ts` | 10 | L23: _discoveryTmpHome = fs.mkdtempSync(path.join(os.tmpdir(), "bili-mitm-disc-"));<br>L46: // ~/.local/share/billion-context/ca. caDir() = dataDir()/ca =<br>L47: // XDG_DATA_HOME/billion-context/ca. |
| `tests\update-channel.test.ts` | 10 | L25: assert.equal(registryUrlFor("billion-context", "dev"), "https://registry.npmjs.org/billion-context/dev");<br>L26: assert.equal(registryUrlFor("billion-context", "stable"), "https://registry.npmjs.org/billion-context/stable");<br>L49: assert.equal(registryUrlFor("billion-context", "pr-592"), "https://registry.npmjs.org/billion-context/pr-592"); |
| `tests\wire-contract-fakes.ts` | 10 | L5: // known validation of the real upstream it imitates — so a request bili<br>L34: "bili #762 (chat wire) and #1479 (responses wire) production 400s (code 11155 'the reasoning content from the previous turn must be passed back in thinking mode<br>L47: "bili #1299 production 400 (api.anthropic.com: 'input_schema does not support oneOf, allOf, or anyOf at the top level'); fixed acp-kernel #404/#405 v0.0.89; pol |
| `tests\wire-exit-matrix.test.ts` | 10 | L8: process.env.BILI_REPLAY_RETRY_MAX = "1";<br>L9: process.env.BILI_PREFLIGHT_HOLD_MS = "300";<br>L201: const url = `http://127.0.0.1:${proxyPort}/bili/http://127.0.0.1:${up.port}/v1/chat/completions`; |
| `src\instance.ts` | 9 | L27: *  belongs to (BILI_LAUNCHER_LANE). Absent for manual `bili start`<br>L27: *  belongs to (SOPHIALIN_LAUNCHER_LANE). Absent for manual `bili start`<br>L134: *  base (BILI_ZONE_PORT override). Explicit user overrides |
| `src\session-id.ts` | 9 | L46: // x-bili-plugin-conversation first: a cooperative plugin's explicit<br>L51: // header x-bili-plugin is present: the protocol always sends both<br>L68: const pluginMarker = typeof headers["x-bili-plugin"] === "string"; |
| `src\upstream-fail.ts` | 9 | L3: *  Field diagnosis of long-session failures (omp → bili → external proxy →<br>L16: /** Downstream client disconnected (external abort fired). Nothing bili<br>L47: *  fired. Without it, an AbortError is attributed to bili's own idle |
| `src\zcode\mcp-entry.ts` | 9 | L2: // bili). Bootstraps a bili proxy, routes the provider store through it,<br>L9: // go through the shared bili.log tee because zcode does not capture this<br>L59: // BILI_ZCODE_PORT is strict; otherwise port 0 lets the |
| `tests\acp-cache-diff.test.ts` | 9 | L16: // #1266: `bili acp-cache diff <dump-dir>` — synthetic dump pairs covering the<br>L148: fs.writeFileSync(path.join(dir, "bili.log"), [<br>L154: assert.equal(report.logSource, path.join(dir, "bili.log")); |
| `tests\discover.test.ts` | 9 | L82: const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "bili-zcode-"));<br>L102: const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "bili-zcode-"));<br>L170: const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "bili-zcenv-")); |
| `tests\fix-920-bypass-drop.test.ts` | 9 | L1: // #920: proxy-side changes — (a) x-bili-plugin-bypass raw passthrough,<br>L2: // (b) proxy-mode tool injection DROPS client tools whose names bili owns.<br>L78: test("#920: x-bili-plugin-bypass forwards the body byte-identical, no injection", async () => { |
| `tests\issue1542-chain-embedded-strip.test.ts` | 9 | L23: const STAMP_A = `<bili-chain v="1" processor="leaked-instance" issued-at="${OLD_TS}" request-id="r-old-a" digest="${DIGEST_A}"/>`;<br>L24: const STAMP_B = `<bili-chain v="1" processor="leaked-instance" issued-at="${OLD_TS + 1000}" request-id="r-old-b" digest="${DIGEST_B}"/>`;<br>L61: { role: "user", content: "see <bili-chain v=\"1\" processor=x/> above" }, |
| `tests\marker-echo.test.ts` | 9 | L13: import { BILI_ACP_TOOLS_ANTHROPIC, BILI_COMPRESS_TOOL, COMPRESS_TOOL_NAME, buildCompressSystemPrompt, withContinuationAnchor, withMarkerIntegrityNote, withSumma<br>L313: assert.ok(BILI_COMPRESS_TOOL.description.startsWith(COMPRESS_TOOL.description), "kernel description preserved verbatim");<br>L314: assert.ok(BILI_COMPRESS_TOOL.description.includes("the trigger rubric")); |
| `tests\omp-native-identity.test.ts` | 9 | L8: // intercept installed AND a live proxy claimed (BILLION_CONTEXT_PROXY —<br>L18: const INTERCEPT_FLAG = Symbol.for("billion-context.native-fetch-intercept");<br>L22: const prev = process.env.BILLION_CONTEXT_PROXY; |
| `advisories\README.md` | 8 | L3: Machine-readable critical-defect advisories for [billion-context](https://github.com/ranxianglei/billion-context) (bili). bili's advisory watcher polls this pac<br>L3: Machine-readable critical-defect advisories for [billion-context](https://github.com/AEmbers/sophialin-context) (bili). bili's advisory watcher polls this packa<br>L3: Machine-readable critical-defect advisories for [sophialin-context](https://github.com/AEmbers/sophialin-context) (bili). bili's advisory watcher polls this pac |
| `package.json` | 8 | L2: "name": "billion-context",<br>L4: "description": "A context-compression plugin — small context windows (a 100K context is enough), 5x fewer tokens, month-long single sessions (billions of tokens<br>L15: "bili": "./dist/index.js", |
| `src\cache-ledger.ts` | 8 | L23: // upstream KV was dropped during downtime even though bili's message refs were preserved.<br>L568: export interface BiliCacheReport extends CacheReport {<br>L578: export function buildSessionCacheReport(session: Session): BiliCacheReport { |
| `src\web\sessions-data.ts` | 8 | L10: *  live always wins per id. Disk files decode via the same store as bili<br>L118: /** bili build that last persisted this session file (absent on pre-stamp files). */<br>L119: biliVersion?: string; |
| `tests\anthropic-pck-verbatim.test.ts` | 8 | L166: const out = await post(pport, `/bili/http://127.0.0.1:${uport}/v1/messages`, anthropicBody(sid, 100, "tiny"), { "x-acp-session": sid });<br>L183: const dir = mkdtempSync(path.join(tmpdir(), "bili-pck-chain-"));<br>L199: const out = await post(pport, `/bili/http://127.0.0.1:${uport}/v1/messages`, anthropicBody(sid, 1024, `keep ${tag}`), { "x-acp-session": sid }); |
| `tests\e2e\e2e-registry.test.ts` | 8 | L108: fs.writeFileSync(file, `${JSON.stringify({ plugins: ["billion-context"], compaction: { auto: false } }, null, 2)}\n`);<br>L155: const res = runBili(installDir, ["update"], { ...envBase, BILI_UPDATE_REGISTRY: reg.url });<br>L156: assert.equal(res.code, 0, `bili update failed:\n${res.stderr}`); |
| `tests\e2e-stable-system-anchor.test.ts` | 8 | L8: // messages) must pass through with ZERO bili-side injection — and that<br>L131: const chatUrl = `http://127.0.0.1:${proxyPort}/bili/http://127.0.0.1:${upstreamPort}/v1/chat/completions`;<br>L132: const respUrl = `http://127.0.0.1:${proxyPort}/bili/http://127.0.0.1:${upstreamPort}/v1/responses`; |
| `tests\fix-1117-passthrough.test.ts` | 8 | L1: // #1117: proxy-side passthrough — x-bili-passthrough marks an unattributed<br>L31: captured.push({ url: req.url ?? "", body: Buffer.concat(chunks).toString("utf8"), passthroughHeader: req.headers["x-bili-passthrough"] as string \| undefined });<br>L78: test("#1117: x-bili-passthrough forwards the body byte-identical, no injection, marker stripped", async () => { |
| `tests\issue473-plugin-fake-completion.test.ts` | 8 | L16: // BILI_FAKE_COMPLETION_RETRIES) sat AFTER the plugin-mode early return, so<br>L23: const HINT_MARK = "[billion-context]";<br>L128: modelUrl: () => `http://127.0.0.1:${proxyPort}/bili/http://127.0.0.1:${upstreamPort}${path}`, |
| `tests\logger-rotation.test.ts` | 8 | L37: const dir = fs.mkdtempSync(path.join(os.tmpdir(), "bili-logger-"));<br>L38: const file = path.join(dir, "bili.log");<br>L53: assert.ok(fs.existsSync(file), "new bili.log must be recreated"); |
| `tests\update-proxy.test.ts` | 8 | L17: return { packageName: "billion-context", currentVersion: "1.2.3", autoUpdate: true };<br>L22: assert.equal(egressDispatcher(opts, "https://registry.npmjs.org/billion-context/latest"), undefined);<br>L34: assert.equal(egressDispatcher(opts, "https://registry.npmjs.org/billion-context/latest"), proxyDispatcher(proxyUrl)); |
| `tests\wire-schema-portable.test.ts` | 8 | L5: BILI_ACP_TOOLS_ANTHROPIC,<br>L6: BILI_ACP_TOOLS_OPENAI,<br>L7: BILI_ACP_TOOLS_RESPONSES, |
| `src\acp-status.ts` | 7 | L51: host: `billion-context ${VERSION}`,<br>L151: extra.push(`UNDECRYPTED TRAFFIC (instance-level): ${blind.total} CONNECT tunnel(s) to host(s) outside the MITM whitelist were blind-relayed since instance start<br>L151: extra.push(`UNDECRYPTED TRAFFIC (instance-level): ${blind.total} CONNECT tunnel(s) to host(s) outside the MITM whitelist were blind-relayed since instance start |
| `src\doctor.ts` | 7 | L1: // `bili doctor` (#1235): one read-only command that audits every install lane<br>L119: if (g.verdict === "frozen") g.reason = "source checkout — rebuild manually (npm run build); bili refuses to auto-update a working tree (#580)";<br>L120: else if (g.verdict === "stale") g.reason = managed !== undefined ? `newer on registry ${tag}: update through ${managed.owner}'s updater` : `newer on registry ${ |
| `src\session-gc.ts` | 7 | L12: * BILI_SESSION_GC is set to 1/true/on. Session files are user data<br>L20: *      BILI_SESSION_GC_MAX_AGE_DAYS (default 7d). The threshold must stay far<br>L29: *            rawInputTokens <= BILI_SESSION_GC_MAX_TOKENS (default 1M); |
| `tests\affinity-persist.test.ts` | 7 | L53: const file = path.join(tmp, "billion-context", "prefix-affinity.json");<br>L69: const file = path.join(tmp, "billion-context", "prefix-affinity.json");<br>L86: const file = path.join(tmp, "billion-context", "prefix-affinity.json"); |
| `tests\cache-friendly-plugin.test.ts` | 7 | L26: //       /__bili/plugin/tool fold):<br>L76: const CHAIN_PREFIX = LT + "bili-chain v=";<br>L79: const RETRNOTE_PREFIX = "[billion-context] Earlier acp_retrieve"; |
| `tests\codex-window-align.test.ts` | 7 | L16: // window at codex's perception (min(bili, codex)), so ACP compresses before<br>L74: return `http://127.0.0.1:${rig.proxyPort}/bili/http://127.0.0.1:${rig.upstreamPort}/v1/messages`;<br>L81: "x-bili-plugin": "test-agent", |
| `tests\decode-fail-passthrough.test.ts` | 7 | L22: // #619: an undecodable content-encoding body must not 400 in bili - relay the<br>L23: // original bytes verbatim so the upstream, not bili, handles the failure.<br>L63: const base = `http://127.0.0.1:${proxyPort}/bili/http://127.0.0.1:${upstreamPort}`; |
| `tests\dump-mask.test.ts` | 7 | L97: const resp = await fetch(`http://127.0.0.1:${proxyPort}/bili/http://127.0.0.1:${upstreamPort}/v1/chat/completions`, {<br>L113: const tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), "bili-dump-off-"));<br>L121: const dumpFiles = listFiles(path.join(tmpRoot, "billion-context")).filter((f) => DUMP_FILE_RE.test(f)); |
| `tests\e2e\fake-upstream-chat.mjs` | 7 | L2: // (#1239): drives a REAL host client (`pi`, `opencode`) through bili's native<br>L114: // A chain-checkpoint carrier (<bili-chain ... /> #1421 step 3) rides as a<br>L194: const convKey = req.headers["x-bili-plugin-conversation"] ?? "anon"; |
| `tests\e2e-plugin-grow-compress.test.ts` | 7 | L11: //   3. the host executes it through the MCP shim → POST /__bili/plugin/tool<br>L239: test("plugin-lane grow-and-compress: MCP host loop folds via /__bili/plugin/tool and keeps upstream bounded", async () => {<br>L278: const url = `http://127.0.0.1:${proxyPort}/bili/http://127.0.0.1:${bridge.port}/v1/responses`; |
| `tests\issue-393-registry-window.test.ts` | 7 | L25: //      zero-config /bili/ mode, so plain --upstream mode always fell to the<br>L128: test("#393: --upstream mode (no /bili/ prefix) still runs the models.dev lookup", async () => {<br>L132: // No /bili/ prefix and no MITM -> route=undefined -> host=undefined. |
| `tests\issue532-panel-system-tokens.test.ts` | 7 | L181: const resp = await fetch(`http://127.0.0.1:${h.proxyPort}/__bili/plugin/status?conversationId=${conversationId}`);<br>L195: const resp = await fetch(`http://127.0.0.1:${h.proxyPort}/bili/http://127.0.0.1:${h.upstreamPort}/v1/messages`, {<br>L199: "x-bili-plugin": "pi-plugin/0.0.1", |
| `tests\named-provider-bind.test.ts` | 7 | L18: const dir = mkdtempSync(path.join(tmpdir(), "bili-named-bind-"));<br>L19: const p = path.join(dir, "billion-context.json");<br>L21: const prev = process.env.BILI_CONFIG_FILE; |
| `tests\preflight-codex-headroom.test.ts` | 7 | L58: const previousMode = process.env.BILI_CODEX_COMPACT;<br>L60: process.env.BILI_CODEX_COMPACT = mode;<br>L77: const url = `http://127.0.0.1:${proxyAddress.port}/bili/${origin}/v1/responses`; |
| `tests\preflight-compress.test.ts` | 7 | L128: const r1 = await fetch(`http://127.0.0.1:${proxyPort}/bili/http://127.0.0.1:${upstreamPort}/v1/messages`, {<br>L142: const r2 = await fetch(`http://127.0.0.1:${proxyPort}/bili/http://127.0.0.1:${upstreamPort}/v1/messages`, {<br>L238: const r1 = await fetch(`http://127.0.0.1:${proxyPort}/bili/http://127.0.0.1:${upstreamPort}/v1/messages`, { |
| `tests\reasoning-echo-400.test.ts` | 7 | L17: // reasoning_content must (a) be persisted when BILI_DUMP_4XX=1, (b) learn<br>L86: return fetch(`http://127.0.0.1:${proxyPort}/bili/http://127.0.0.1:${upstreamPort}/v1/chat/completions`, {<br>L95: const dumpDir = fs.mkdtempSync(path.join(os.tmpdir(), "bili-re400-dump-")); |
| `tests\responses-plugin-dev-position.test.ts` | 7 | L6: // and bili re-injects the merged block at input[0] — so every notification<br>L25: //   T2 fold interaction: after a /__bili/plugin/tool fold the notification<br>L131: const base = `http://127.0.0.1:${proxyPort}/bili/http://127.0.0.1:${upstreamPort}/v1/responses`; |
| `tests\wire-exit-gap-cells.test.ts` | 7 | L9: process.env.BILI_REPLAY_RETRY_MAX = "1";<br>L12: process.env.BILI_PREFLIGHT_HOLD_MS = "300";<br>L228: `http://127.0.0.1:${proxy.address().port}/bili/http://127.0.0.1:${up.port}/v1/chat/completions`, |
| `src\advisory.ts` | 6 | L12: * web UI banner, and /__bili/status field.<br>L16: * mechanism. Trust domain: the document comes from the same registry bili<br>L90: *  configured registry as the updater (BILI_UPDATE_REGISTRY aware via |
| `src\encrypt.ts` | 6 | L14: * The key comes ONLY from the BILI_ENCRYPTION_KEY environment variable: a key<br>L19: * when opted in (BILI_PERSIST_ZSTD=1/true); the default stays plain JSON for<br>L21: * on-disk format — the store decodes transparently and `bili export` renders |
| `src\log-mask.ts` | 6 | L3: * out of bili.log / launcher logs.<br>L47: // opt out (env BILI_LOG_MASK_HOSTS=0 / config maskHosts:false); real hosts<br>L48: // stay visible on the loopback-only /__bili/stats endpoint regardless. |
| `tests\blind-tunnel-stats.test.ts` | 6 | L16: /** #897: /__bili/health and /__bili/stats must expose the blind-tunnel counter<br>L30: const tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), "bili-blind-stats-"));<br>L65: const emptyHealth = (await (await fetch(`http://127.0.0.1:${port}/__bili/health`)).json()) as { blindTunnels: BlindTunnels }; |
| `tests\e2e-export-handoff.test.ts` | 6 | L16: // E2E for `bili export` (#151): drives the REAL proxy (startServer) against a<br>L21: // exportSession (the code `bili export` runs) renders the model-written summary<br>L37: test("e2e export: real proxy compresses via real tool call, block persists, bili export renders it", async () => { |
| `tests\e2e-google-compress.test.ts` | 6 | L289: const url = `http://127.0.0.1:${proxyPort}/bili/http://127.0.0.1:${upstreamPort}/v1beta/models/gemini-test:streamGenerateContent?alt=sse`;<br>L329: const url = `http://127.0.0.1:${proxyPort}/bili/http://127.0.0.1:${upstreamPort}/v1beta/models/gemini-test:streamGenerateContent?alt=sse`;<br>L359: const url = `http://127.0.0.1:${proxyPort}/bili/http://127.0.0.1:${upstreamPort}/v1beta/models/gemini-test:streamGenerateContent?alt=sse`; |
| `tests\fix-decompress-tofile.test.ts` | 6 | L18: process.env.BILI_PERSIST = "0";<br>L50: const scratch = fs.mkdtempSync(path.join(os.tmpdir(), "bili-tofile-"));<br>L71: const scratch = fs.mkdtempSync(path.join(os.tmpdir(), "bili-tofile-")); |
| `tests\headroom-output-fallback.test.ts` | 6 | L12: process.env.BILI_LAUNCHER_MODEL_MAX_OUTPUTS = JSON.stringify({<br>L110: const url = `http://127.0.0.1:${proxyPort}/bili/http://127.0.0.1:${upstreamPort}/v1/chat/completions`;<br>L180: // BILI_LAUNCHER_MODEL_MAX_OUTPUTS carries 80k for this model (set before |
| `tests\issue833-panel-effective-config.test.ts` | 6 | L14: // #833: the /__bili/plugin/status Nudge line (and the plugin tool API) rendered<br>L88: const resp = await fetch(`http://127.0.0.1:${h.proxyPort}/bili/http://127.0.0.1:${h.upstreamPort}/v1/messages`, {<br>L92: "x-bili-plugin": "pi-plugin/0.0.1", |
| `tests\plugin-update.test.ts` | 6 | L1: // #991 single-writer: `bili plugin update` reports each lane through its own<br>L21: const OPTS = { packageName: "billion-context" };<br>L26: for (const line of lines) assert.match(line, /global bili install/); |
| `tests\redirect-passthrough.test.ts` | 6 | L14: // POST into a 405 at the redirect target. bili must pass the 3xx through to<br>L98: path: `/bili/http://${redirectorHost}${path}`,<br>L146: assert.equal(targetSeen.hit, false, "bili must NOT follow the redirect — the target must never be contacted"); |
| `tests\rules-wire.test.ts` | 6 | L99: await post(`http://127.0.0.1:${pport}/bili/http://127.0.0.1:${up.port}/v1/messages`,<br>L129: await post(`http://127.0.0.1:${pport}/bili/http://127.0.0.1:${up.port}/v1/messages`,<br>L150: await post(`http://127.0.0.1:${pport}/bili/http://127.0.0.1:${up.port}/v1/messages`, |
| `tests\update-tarball.test.ts` | 6 | L31: name: "billion-context",<br>L35: bin: { bili: "./dist/index.js" },<br>L71: name: "billion-context", |
| `tests\upstream-alerts.test.ts` | 6 | L22: // bounded eviction / kind gating), the /__bili/overview payload (real request<br>L26: process.env.BILI_PERSIST_ZSTD = "0";<br>L194: return fetch(`http://127.0.0.1:${proxyPort}/bili/http://127.0.0.1:${upstreamPort}/v1/chat/completions`, { |
| `tests\web-logs-view.test.ts` | 6 | L4: // endpoint /__bili/logs exposes the discrete / context / time-window views<br>L40: test("e2e: session requests are log-tagged; /__bili/logs serves ctx + win views", async () => {<br>L52: const dir = fs.mkdtempSync(path.join(os.tmpdir(), "bili-weblogs-")); |
| `dsh.bundle.patch.yml` | 5 | L1: # billion-context dsh bundle layer (#949).<br>L2: # Mounted automatically when the profile's package.json lists billion-context<br>L3: # in dsh.profile.bundles (`dsh plugin --profile <name> add billion-context`); |
| `src\kimi\native-mcp.ts` | 5 | L1: // kimi native MCP entry (#963): spawned per-session by the billion-context<br>L2: // plugin. Bootstraps a bili proxy, routes config.toml through it, verifies<br>L47: process.env.BILI_MCP_PROXY = handle.origin; |
| `src\logger.ts` | 5 | L3: * ~/.local/state/billion-context/bili.log) and stderr (so a foreground `bili`<br>L3: * ~/.local/state/sophialin-context/bili.log) and stderr (so a foreground `bili`<br>L3: * ~/.local/state/sophialin-context/sophialin.log) and stderr (so a foreground `bili` |
| `src\loop\cache-control.ts` | 5 | L5: * `cache_control` breakpoints or nothing upstream caches. bili used to emit<br>L6: * none, so Anthropic-style upstreams never cached anything bili sent, and<br>L30: * BILI_NO_CACHE_CONTROL=1 disables everything. |
| `src\util.ts` | 5 | L8: export const BILI_PLUGIN_BYPASS_HEADER = "x-bili-plugin-bypass";<br>L8: export const SOPHIALIN_PLUGIN_BYPASS_HEADER = "x-bili-plugin-bypass";<br>L13: // plugin riding the host's LLM bridge) whose URL is already /bili/-routed by |
| `src\web\api.ts` | 5 | L102: biliPort: number = 8787,<br>L139: try { validateHttpProxy(route.proxy, biliPort); } catch (error) { return sendError(res, 400, `invalid provider proxy for ${url}: ${String(error)}`); }<br>L144: try { validateHttpProxy(typeof next.upstreamProxy === "string" ? next.upstreamProxy.trim() \|\| undefined : undefined, biliPort); } catch (error) { return sendErr |
| `tests\abort-rewind-cache-seam.test.ts` | 5 | L8: // refusal. This test adjudicates the bili side locally:<br>L69: !!it && it.type === "message" && typeof (it.content as string) === "string" && (it.content as string).includes("bili-chain");<br>L165: const url = `http://127.0.0.1:${proxyPort}/bili/http://127.0.0.1:${upstreamPort}/v1/responses`; |
| `tests\codex-models.test.ts` | 5 | L16: // 272K unknown-model fallback) and auto-compacts at 90% of it. bili must cap<br>L65: // in-table: bili 400K (built-in table) → clamped to codex's 272K<br>L67: // not-in-table: bili 1M → clamped to the 272K fallback |
| `tests\e2e\fake-upstream.mjs` | 5 | L2: // REAL `codex` through bili so compression ACTUALLY happens in-process, no model/network.<br>L5: //   bili's summarization call parses via extractSummaryText -> json.output[].content[].text.<br>L6: // A summarization request is recognised by bili's exact TASK text in `instructions`; its |
| `tests\fix-488-multimodal.test.ts` | 5 | L60: test("image-tokens: BILI_IMAGE_TOKEN_CAP clamps each image's cost", () => {<br>L61: process.env.BILI_IMAGE_TOKEN_CAP = "500";<br>L70: delete process.env.BILI_IMAGE_TOKEN_CAP; |
| `tests\fix-decompress-reaper.test.ts` | 5 | L44: const scratch = fs.mkdtempSync(path.join(os.tmpdir(), "bili-reap-"));<br>L46: const prevCap = process.env.BILI_DECOMPRESS_TMP_CAP;<br>L48: process.env.BILI_DECOMPRESS_TMP_CAP = "3"; |
| `tests\index-entry-guard.test.ts` | 5 | L47: const box = fs.mkdtempSync(path.join(os.tmpdir(), "bili-entry-guard-"));<br>L54: assert.doesNotMatch(r.stdout + r.stderr, /bili:\|unknown command\|EADDRINUSE/);<br>L63: const box = fs.mkdtempSync(path.join(os.tmpdir(), "bili-entry-guard-")); |
| `tests\issue1204-rules-google-plugin.test.ts` | 5 | L79: const url = `http://127.0.0.1:${h.proxyPort}/bili/http://127.0.0.1:${h.upstreamPort}/v1beta/models/gemini-test:streamGenerateContent?alt=sse`;<br>L84: "x-bili-plugin": "omp",<br>L85: "x-bili-plugin-conversation": conversationId, |
| `tests\issue1493-arm-outbound-payload.test.ts` | 5 | L10: process.env.BILI_REPLAY_RETRY_MAX = "1";<br>L161: const url = `http://127.0.0.1:${port}/bili/http://127.0.0.1:${upstreamPort}/v1/messages`;<br>L166: assert.equal(r1.status, 502, "network failure surfaces as bili's 502"); |
| `tests\kernel-tier-defaults.test.ts` | 5 | L7: // acp-kernel#379 / billion-context#1249: block COUNT is not a need signal.<br>L10: // the need signal. These assertions pin that contract into bili's suite so a<br>L11: // future kernel bump that silently reverts the defaults (or a bili-side |
| `tests\plugin-bypass.test.ts` | 5 | L1: // #920 legacy lane: requests marked x-bili-plugin-bypass are forwarded<br>L83: const resp = await fetch(`http://127.0.0.1:${h!.proxyPort}/bili/http://127.0.0.1:${h!.upstreamPort}/v1/chat/completions`, {<br>L85: headers: { "content-type": "application/json", "x-bili-plugin-bypass": "1" }, |
| `tests\proxy-persist.test.ts` | 5 | L15: process.env.BILI_PERSIST_ZSTD = "0";<br>L47: const dir = mkdtempSync(join(tmpdir(), "bili-persist-"));<br>L188: const dir = mkdtempSync(join(tmpdir(), "bili-disabled-")); |
| `tests\route-passthrough.test.ts` | 5 | L37: assert.equal(findRoute(routes, "https://zcode.z.ai/api/v1/zcode-plan/anthropic/v1/messages"), undefined, "https:// (API-key /bili/) traffic must NOT match a mit<br>L105: path: `/bili/http://${upstreamHost}/v1/messages`,<br>L125: test("route passthrough: body forwarded verbatim (bili's prompt_cache_key stripped, #1403), response piped verbatim, kernel bypassed", async () => { |
| `UNIFIED_LOOP_SPEC.md` | 5 | L4: The generic billion-context proxy's three `compress-loop-*.ts` files have an **injection-persistence** bug: the philosophy prompt (injected as a conversation me<br>L15: **Alignment goal**: the proxy's loop must apply the SAME per-turn hygiene bili-pi gets for free (transient philosophy + hideConsumed), but per ROUND of the loop<br>L77: Round logic (per bili-pi hygiene): |
| `package-lock.json` | 4 | L2: "name": "billion-context",<br>L8: "name": "billion-context",<br>L15: "bili": "dist/index.js", |
| `src\error-dump.ts` | 4 | L10: // leak to disk (#276) — enable with BILI_DUMP_4XX=1.<br>L27: *  when BILI_DUMP_4XX=1. Returns the file path, or null when disabled/skipped/failed. */<br>L29: if (process.env.BILI_DUMP_4XX !== "1") return null; |
| `src\export.ts` | 4 | L77: lines.push(`# billion-context session handoff`);<br>L118: // snapshot keeps only the newest BILI_PERSIST_TAIL_TOKENS tail — a summary whose<br>L169: return ["Persisted sessions:", "", ...rows.map((r) => `  ${r}`), "", "Usage: bili export <session-id\|label> [--output handoff.md] [--full]"].join("\n"); |
| `src\fake-completion.ts` | 4 | L13: "[billion-context] Your last reply described a tool call as plain text instead of invoking it, so no tool actually ran. " +<br>L24: // opt-in: set BILI_FAKE_COMPLETION_RETRIES=2 to enable. 0 = pre-#371 passthrough.<br>L26: const n = Number.parseInt(process.env.BILI_FAKE_COMPLETION_RETRIES ?? "0", 10); |
| `src\loop\tag-echo-filter.ts` | 4 | L188: // call bili emits a visibility marker ("\n📦 [ACP] Compressed m00120–m0300 →<br>L291: // ─── #1634: bili-owned internal artifacts echoed by the model ───────────────<br>L375: // bili-artifact stripper would act on? Literal and \u003c-escaped chain opens |
| `src\restart.ts` | 4 | L2: * Opt-in self-restart (#811): when a newer billion-context is already on disk<br>L23: * the replacement stays collectable — #414) and inherits BILI_PARENT_PID /<br>L24: * BILI_LAUNCH_TOKEN (the launcher liveness watcher keeps working). |
| `tests\absorb-plugin.test.ts` | 4 | L14: process.env.BILI_PERSIST = "0";<br>L182: if (pluginMode) headers["x-bili-plugin"] = "test-agent";<br>L183: const res = await fetch(`http://127.0.0.1:${rig.proxyPort}/bili/http://127.0.0.1:${rig.upstreamPort}/v1/chat/completions`, { |
| `tests\ca-combined.test.ts` | 4 | L15: _tmpHome = fs.mkdtempSync(path.join(os.tmpdir(), "bili-ca-combined-"));<br>L57: const userBundle = fs.mkdtempSync(path.join(os.tmpdir(), "bili-user-ca-"));<br>L77: assert.ok(p.endsWith(path.join("billion-context", "ca", "combined-ca.pem"))); |
| `tests\ccr-v2.test.ts` | 4 | L34: process.env.BILI_PERSIST = "0";<br>L341: const url = `http://127.0.0.1:${proxyPort}/bili/http://127.0.0.1:${upstreamPort}/v1/messages`;<br>L386: const url = `http://127.0.0.1:${proxyPort}/bili/http://127.0.0.1:${upstreamPort}/v1/messages`; |
| `tests\cli-export.test.ts` | 4 | L28: test("bili export lists sessions and renders a handoff doc with summaries and originals", async () => {<br>L29: const dir = mkdtempSync(path.join(tmpdir(), "bili-export-"));<br>L56: assert.match(md, /# billion-context session handoff/); |
| `tests\dumps-dir.test.ts` | 4 | L45: assert.equal(dumpsDir(), path.join(path.resolve("/custom/state"), "billion-context", "dumps"));<br>L46: assert.equal(dumpsDir(), path.join(stateDir(), "dumps"), "co-located with bili.log state dir");<br>L52: test("dumpsDir: default is under ~/.local/state/billion-context/dumps (no raw $HOME, no /tmp)", () => { |
| `tests\e2e-responses-chat-relay.test.ts` | 4 | L214: const url = `http://127.0.0.1:${h.proxyPort}/bili/http://127.0.0.1:${h.bridgePort}/v1/responses`;<br>L241: test("e2e chat relay: responses text streams through bili with incremental deltas (native protocol)", async () => {<br>L259: `bili-injected compress tool not converted to nested chat format: ${JSON.stringify(chatRelayReq.tools)}`, |
| `tests\fix-401-storage.test.ts` | 4 | L15: process.env.BILI_PERSIST_ZSTD = "0";<br>L45: const dir = mkdtempSync(join(tmpdir(), "bili-401-"));<br>L104: writeFileSync(join(dir, ".bili-migration-286.done"), String(Date.now()), "utf8"); |
| `tests\issue1307-side-snapshot.test.ts` | 4 | L24: process.env.BILI_PERSIST = "0";<br>L126: const url = `http://127.0.0.1:${rig.proxyPort}/bili/http://127.0.0.1:${rig.upstreamPort}/v1/chat/completions`;<br>L127: const headers: Record<string, string> = { "content-type": "application/json", "x-bili-plugin": "test-agent", "x-acp-session": CONV }; |
| `tests\issue1320-thinking-mass.test.ts` | 4 | L277: const resp = await fetch(`http://127.0.0.1:${h.proxyPort}/__bili/plugin/status?conversationId=${conversationId}`);<br>L292: const resp = await fetch(`http://127.0.0.1:${h.proxyPort}/bili/http://127.0.0.1:${h.upstreamPort}/v1/messages`, {<br>L296: "x-bili-plugin": "pi-plugin/0.0.1", |
| `tests\logger-epipe.test.ts` | 4 | L86: const dir = fs.mkdtempSync(path.join(os.tmpdir(), "bili-epipe-"));<br>L87: const logFile = path.join(dir, "bili.log");<br>L93: `configureLogger(process.env.BILI_EPIPE_LOG_FILE!);`, |
| `tests\preflight-empty-summary.test.ts` | 4 | L8: process.env.BILI_REPLAY_RETRY_MAX = "1";<br>L10: process.env.BILI_REPLAY_RETRY_BASE_MS = "0";<br>L12: process.env.BILI_PREFLIGHT_DEAD_END_COOLDOWN_MS = "400"; |
| `tests\preflight-transient-empty-retry.test.ts` | 4 | L7: process.env.BILI_REPLAY_RETRY_MAX = "1";<br>L9: process.env.BILI_REPLAY_RETRY_BASE_MS = "0";<br>L10: process.env.BILI_PREFLIGHT_DEAD_END_COOLDOWN_MS = "400"; |
| `tests\preflight-transport-recovery.test.ts` | 4 | L13: process.env.BILI_REPLAY_RETRY_MAX = "3";<br>L14: process.env.BILI_REPLAY_RETRY_BASE_MS = "0";<br>L23: process.env.BILI_REPLAY_RETRY_BASE_MS = "0"; |
| `tests\prompt-pack-tool-prompts.test.ts` | 4 | L85: proxyUrl: `http://127.0.0.1:${proxyPort}/bili/http://127.0.0.1:${upstreamPort}`,<br>L179: const dir = mkdtempSync(path.join(tmpdir(), "bili-pack-e2e-"));<br>L182: mkdirSync(path.join(dir, ".billion-context", "packs"), { recursive: true }); |
| `tests\store.test.ts` | 4 | L26: process.env.BILI_PERSIST = "0";<br>L27: const PERSIST_TMP = mkdtempSync(path.join(tmpdir(), "bili-ccr-persist-"));<br>L232: const dir = mkdtempSync(path.join(tmpdir(), "bili-ccr-flushall-")); |
| `tsup.config.ts` | 4 | L29: // with BILI_SOURCEMAP=1 when you actually need to debug the bundle:<br>L30: //   BILI_SOURCEMAP=1 npm run build<br>L31: sourcemap: process.env.BILI_SOURCEMAP === "1", |
| `advisories\package.json` | 3 | L4: "description": "Critical-defect advisories for billion-context (#1481). Machine-readable blocklist consumed by the bili advisory watcher; published by CI from t<br>L4: "description": "Critical-defect advisories for sophialin-context (#1481). Machine-readable blocklist consumed by the bili advisory watcher; published by CI from<br>L10: "billionContextAdvisories": { |
| `hermes-plugin\plugin.yaml` | 3 | L1: name: billion-context<br>L3: description: "billion-context ACP context compression for Hermes: native compress/decompress/acp_status tools, self-spawning proxy on an ephemeral port, plugin-<br>L3: description: "sophialin-context ACP context compression for Hermes: native compress/decompress/acp_status tools, self-spawning proxy on an ephemeral port, plugi |
| `src\acp-cache-diff.ts` | 3 | L449: if (category === "pure-append" && !usageAvailable) notes.push("no [acp-usage] data — verify hit rate via bili.log");<br>L494: const candidates = opts.logFile ? [path.resolve(opts.logFile)] : [path.join(rootResolved, "bili.log"), defaultLogFile()];<br>L599: lines.push(`bili acp-cache diff — ${r.dir}`); |
| `src\codex-compact.ts` | 3 | L6: export const CODEX_COMPACT_SENTINEL = "bili:acp:";<br>L15: const v = process.env.BILI_CODEX_COMPACT?.trim().toLowerCase();<br>L85: export const CODEX_FORGED_HANDOFF_HEADER = "[bili] context summary after compaction:"; |
| `src\compress-settings.ts` | 3 | L192: *  kernel's resolver chain [project `./.billion-context/packs` > user<br>L205: projectDir: dirs?.projectDir ?? path.join(process.cwd(), ".billion-context", "packs"),<br>L349: // retrieveInlineTokens, GHSA jc6g v2) carry through without a bili-side |
| `src\decompress-shared.ts` | 3 | L25: *  BILI_DECOMPRESS_TMP_CAP (default 50) and beforeExit cleans all. */<br>L30: const raw = process.env.BILI_DECOMPRESS_TMP_CAP;<br>L610: ? `\n\n[Read-only search of historical session ${foreignSessionId}. Block ids are per-session namespaces — decompress acts on the current session only. For bulk |
| `src\index.ts` | 3 | L3: // Both `bili` and `bili-proxy` bin aliases point here, and `node dist/index.js`<br>L3: // Both `bili` and `sophialin-proxy` bin aliases point here, and `node dist/index.js`<br>L34: console.error("bili: failed to start:", err); |
| `src\loop\core.ts` | 3 | L72: `[billion-context] Your previous response was cut off mid-transmission by a network failure before the stream could complete. The client already received the re<br>L180: // #1766: keys on the upstream terminal frame that bili does not model<br>L1042: // #762: persist the exact re-requested body on 4xx (env-gated: BILI_DUMP_4XX=1). |
| `src\server\headers.ts` | 3 | L26: // #1117: bili-internal passthrough marker (native fetch patch → proxy);<br>L28: "x-bili-passthrough",<br>L39: // bytes bili forwards — decoded/rebuilt bodies have it dropped at decode time |
| `src\stream.ts` | 3 | L208: // bili.log must carry only the length — never the head/tail excerpts. The<br>L405: // only: plugin-mode agents own their folds, so bili never sees those<br>L479: // for its length-only form — summary excerpts must not reach bili.log. |
| `tests\anthropic-pck-identity.test.ts` | 3 | L85: messagesUrl: () => `http://127.0.0.1:${proxyPort}/bili/http://127.0.0.1:${upstreamPort}/v1/messages`,<br>L103: const res = await fetch(rig.proxyUrl("/__bili/plugin/register"), {<br>L112: const res = await fetch(rig.proxyUrl(`/__bili/plugin/status?conversationId=${encodeURIComponent(conversationId)}`)); |
| `tests\auto-restart.test.ts` | 3 | L40: JSON.stringify({ name: "billion-context", version, type: "module", main: "dist/index.js", bin: { bili: "./dist/index.js" } }),<br>L40: JSON.stringify({ name: "sophialin-context", version, type: "module", main: "dist/index.js", bin: { bili: "./dist/index.js" } }),<br>L284: const markerDir = path.join(process.env.XDG_CACHE_HOME ?? "", "billion-context"); |
| `tests\claude-bridge-e2e.test.ts` | 3 | L14: // #1339 track: claude-bridge (Claude Code behind the bili proxy) end-to-end<br>L25: //      .test.ts on the same /bili/http lane; after a fold the kernel's<br>L114: return `http://127.0.0.1:${rig.proxyPort}/bili/http://127.0.0.1:${rig.upstreamPort}/v1/messages`; |
| `tests\compress-prompt-pack.test.ts` | 3 | L47: const dir = mkdtempSync(path.join(tmpdir(), "bili-pack-"));<br>L62: const dir = mkdtempSync(path.join(tmpdir(), "bili-pack2-"));<br>L91: const dir = mkdtempSync(path.join(tmpdir(), "bili-pack-meta-")); |
| `tests\configured-window-outranks-registry.test.ts` | 3 | L83: return `http://127.0.0.1:${rig.proxyPort}/bili/http://127.0.0.1:${rig.upstreamPort}/v1/messages`;<br>L99: "x-bili-plugin": "test-agent",<br>L118: "x-bili-plugin": "test-agent", |
| `tests\e2e\registry-fixture.ts` | 3 | L117: const regRes = await fetch(`${url}/-/user/org.couchdb.user:bili-test`, {<br>L120: body: JSON.stringify({ name: "bili-test", password: "bili-test-local-only" }), |
| `tests\e2e-anthropic.test.ts` | 3 | L214: const resp = await fetch(`http://127.0.0.1:${h.proxyPort}/bili/http://127.0.0.1:${h.upstreamPort}/v1/messages`, {<br>L328: const resp = await fetch(`http://127.0.0.1:${h.proxyPort}/bili/http://127.0.0.1:${h.upstreamPort}/v1/messages`, {<br>L376: const resp = await fetch(`http://127.0.0.1:${h.proxyPort}/bili/http://127.0.0.1:${h.upstreamPort}/v1/messages`, { |
| `tests\e2e-overflow-selfheal.test.ts` | 3 | L145: const url = `http://127.0.0.1:${proxyPort}/bili/http://127.0.0.1:${upstreamPort}/v1/messages`;<br>L226: const url = `http://127.0.0.1:${proxyPort}/bili/http://127.0.0.1:${upstreamPort}/v1/messages`;<br>L298: const url = `http://127.0.0.1:${proxyPort}/bili/http://127.0.0.1:${upstreamPort}/v1/messages`; |
| `tests\fix-1001-history-rewrite.test.ts` | 3 | L19: // after a model switch. bili saw the rewritten history with no announcement channel:<br>L178: const url = `http://127.0.0.1:${proxyPort}/bili/http://127.0.0.1:${upstreamPort}/chat/completions`;<br>L238: // the pinned kernel actually carries the fix through the bili funnel. |
| `tests\fix-551-upstream-timeout.test.ts` | 3 | L22: const TIMEOUT_ENV = "BILI_UPSTREAM_TIMEOUT_MS";<br>L29: test("upstreamTimeoutMs honors BILI_UPSTREAM_TIMEOUT_MS and falls back to the 12-minute default", () => {<br>L46: // 300s (headersTimeout/bodyTimeout defaults) regardless of bili's own |
| `tests\issue1192-disabled-tools.test.ts` | 3 | L48: assert.match(String(r.json.result), /acp_rule is not enabled on this bili proxy \(compress\.rules\.enabled is not true\)/);<br>L56: assert.match(String(r.json.result), /acp_rule is not enabled on this bili proxy \(compress\.rules\.enabled is not true\)/);<br>L63: assert.match(String(r.json.result), /absorb is not enabled on this bili proxy \(compress\.absorb\.enabled is not true\)/); |
| `tests\issue1195-overflow-refold.test.ts` | 3 | L151: const url = `http://127.0.0.1:${proxyPort}/bili/http://127.0.0.1:${upstream.port}/v1/messages`;<br>L192: const url = `http://127.0.0.1:${proxyPort}/bili/http://127.0.0.1:${upstream.port}/v1/messages`;<br>L232: const url = `http://127.0.0.1:${proxyPort}/bili/http://127.0.0.1:${upstream.port}/v1/messages`; |
| `tests\issue404-restore-timestamps.test.ts` | 3 | L75: const dir = mkdtempSync(join(tmpdir(), "bili-404-boot-"));<br>L125: const dir = mkdtempSync(join(tmpdir(), "bili-404-rt-"));<br>L144: const dir = mkdtempSync(join(tmpdir(), "bili-404-miss-")); |
| `tests\issue857-image-baseline.test.ts` | 3 | L140: const url = `http://127.0.0.1:${port}/bili/http://127.0.0.1:${uport}/v1/responses`;<br>L183: const url = `http://127.0.0.1:${port}/bili/http://127.0.0.1:${uport}/v1/responses`;<br>L214: const url = `http://127.0.0.1:${port}/bili/http://127.0.0.1:${uport}/v1/responses`; |
| `tests\openai-pck-identity.test.ts` | 3 | L81: chatUrl: () => `http://127.0.0.1:${proxyPort}/bili/http://127.0.0.1:${upstreamPort}/v1/chat/completions`,<br>L107: const res = await fetch(rig.proxyUrl("/__bili/plugin/register"), {<br>L116: const res = await fetch(rig.proxyUrl(`/__bili/plugin/status?conversationId=${encodeURIComponent(conversationId)}`)); |
| `tests\preflight-max-output-tokens.test.ts` | 3 | L9: process.env.BILI_REPLAY_RETRY_MAX = "1";<br>L160: return await fetch(`http://127.0.0.1:${proxyPort}/bili/http://127.0.0.1:${upstreamPort}/responses`, {<br>L518: const r = await fetch(`http://127.0.0.1:${proxyPort}/bili/http://127.0.0.1:${upstreamPort}/v1/messages`, { |
| `tests\preflight-multi-range.test.ts` | 3 | L121: const r = await fetch(`http://127.0.0.1:${proxyPort}/bili/http://127.0.0.1:${upstreamPort}/v1/messages`, {<br>L155: const r = await fetch(`http://127.0.0.1:${proxyPort}/bili/http://127.0.0.1:${upstreamPort}/v1/messages`, {<br>L192: const r = await fetch(`http://127.0.0.1:${proxyPort}/bili/http://127.0.0.1:${upstreamPort}/v1/messages`, { |
| `tests\preflight-stream-summary.test.ts` | 3 | L9: process.env.BILI_REPLAY_RETRY_MAX = "1";<br>L115: return await fetch(`http://127.0.0.1:${proxyPort}/bili/http://127.0.0.1:${upstreamPort}/responses`, {<br>L269: const r = await fetch(`http://127.0.0.1:${proxyPort}/bili/http://127.0.0.1:${upstreamPort}/v1/messages`, { |
| `tests\price-profile-stamp.test.ts` | 3 | L77: fetch(`http://127.0.0.1:${port}/bili/http://127.0.0.1:${upstream.port}/v1/messages`, {<br>L135: fetch(`http://127.0.0.1:${port}/bili/http://127.0.0.1:${upstream.port}/v1/messages`, {<br>L172: const rc = await fetch(`http://127.0.0.1:${cfgPort}/bili/http://127.0.0.1:${upstream.port}/v1/messages`, { |
| `tests\search-plan-aware.test.ts` | 3 | L29: process.env.BILI_PERSIST = "0";<br>L333: const url = `http://127.0.0.1:${proxyPort}/bili/http://127.0.0.1:${upstreamPort}/v1/messages`;<br>L363: const url = `http://127.0.0.1:${proxyPort}/bili/http://127.0.0.1:${upstreamPort}/v1/messages`; |
| `tests\ws-upgrade.test.ts` | 3 | L24: *  `bili codex` path). */<br>L109: test("ws upgrade: answered with 426 + close on an MITM-decrypted TLS connection (bili codex path)", async () => {<br>L112: const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "bili-ws-")); |
| `MESSAGE-IDENTITY.md` | 2 | L3: Design record for how billion-context identifies an individual message across<br>L139: round-trip in the fleet, and bili's handling shows the pattern: it is treated |
| `MESSAGE-IDENTITY.zh-CN.md` | 2 | L3: 设计记录:billion-context 如何跨轮识别单条消息,以及为什么身份由消息**内容**派生、而不是在入口打一个由宿主持久化的 id。成文于 #1496 复核之后;与 `SESSION-IDENTITY.zh-CN.md`(会话粒度的同题文档)成对。实现锚点:`acp-kernel/src/wire/messa<br>L72: DeepSeek 类网关要求客户端传回网关自己发出的 reasoning("the reasoning content from the previous turn must be passed back in thinking mode")。这是全舰队唯一被强制的内容往返,而 bili 的处理方式展示了模式:当**可 |
| `scripts\update-codex-models-snapshot.mjs` | 2 | L5: (codex-rs/models-manager/models.json) — only the fields bili consumes for<br>L8: upstream file is ~424KB of tool/modality metadata bili never reads; the slim |
| `src\ca.ts` | 2 | L10: const ROOT_CN = "billion-context MITM Root CA";<br>L95: { name: "organizationName", value: "billion-context" }, |
| `src\conflict-watch.ts` | 2 | L48: lines.push(`COMPRESSION CONFLICTS — ${events.length} event(s) in this session. Two compressors on one conversation (bili + a third-party compression plugin or c<br>L52: if (events.length > 10) lines.push(`  … ${events.length - 10} earlier event(s); full list: GET /__bili/stats → conflicts`); |
| `src\discover.ts` | 2 | L13: const idx = url.indexOf("/bili/");<br>L14: return idx >= 0 ? url.slice(idx + "/bili/".length) : url; |
| `src\image-tokens.ts` | 2 | L61: const v = Number(process.env.BILI_IMAGE_TOKEN_CAP ?? "");<br>L283: // prepared.body is bili's own compact JSON.stringify, but client raw buffers |
| `src\loop\adapter-openai.ts` | 2 | L230: loggerLog("warn", `[bili-artifact] stripped model-emitted internal artifact: ${snippet.slice(0, 80).replace(/\n/g, " ")}`);<br>L546: // default now rides the top-level `error` frame bili's own parser already |
| `src\loop\adapter-responses.ts` | 2 | L32: * (they 400 every request otherwise). Only the msg-proxy-* namespace bili<br>L346: loggerLog("warn", `[bili-artifact] stripped model-emitted internal artifact: ${snippet.slice(0, 80).replace(/\n/g, " ")}`); |
| `src\output-steering.ts` | 2 | L41: * Default OFF. Config: billion-context.json `outputSteering` block (global, with<br>L97: // functionResponse parts), so only bili can map them onto the kernel's |
| `src\server\observability.ts` | 2 | L7: // with ACP_DUMP_BODY=1 so `bili <client>` users don't leak conversation bodies<br>L46: // #1290: instance-level view of the map above — surfaced at /__bili/stats |
| `src\server\side-request.ts` | 2 | L17: // (x-bili-plugin-agent) and a known side-request agent is a side req by<br>L102: // into bili with an already-oversized history never seeds anything at all. |
| `src\session.ts` | 2 | L379: let MAX_SESSIONS = Math.max(1, Number.parseInt(process.env.BILI_MAX_SESSIONS ?? "256", 10) \|\| 256);<br>L517: // auto-update restart: memory is gone, disk state survives). A bili instance |
| `src\store.ts` | 2 | L236: const raw = process.env.BILI_CCR_RETRIEVAL_TTL_MS;<br>L345: return `[billion-context] Earlier acp_retrieve result(s) were NOT delivered, so their acks are stale and you do NOT have that content: ${lines}. Re-issue acp_re |
| `src\tool-ring.ts` | 2 | L11: * POST /__bili/plugin/tool routed to the right session. The proxy is the only<br>L12: * path model output takes, so it WITNESSES every complete bili tool call as it |
| `src\upstream-alerts.ts` | 2 | L12: *  /__bili/overview poll; nothing else consumes this table. */<br>L28: *  - client-abort: the downstream client went away — not a bili-side problem; |
| `src\zcode\bootstrap-hook.ts` | 2 | L4: // it) so sessions started while `bili start` is running get compression<br>L41: // #1622: pass the resolved policy — routeZcodeConfig's default ignores BILI_ZCODE_ROUTE / providers direct. |
| `tests\acp-status.test.ts` | 2 | L152: assert.ok(out.includes("/__bili/stats → blindTunnels"), "points at the stats endpoint");<br>L167: assert.ok(line!.startsWith("ACTIVE SURFACE: pack=lean \| host=billion-context "), `host identity rendered (got: ${line})`); |
| `tests\anthropic-beta-window.test.ts` | 2 | L110: return `http://127.0.0.1:${rig.proxyPort}/bili/http://127.0.0.1:${rig.upstreamPort}/v1/messages`;<br>L185: "x-bili-plugin": "test-agent", |
| `tests\cache-friendly-proxy.test.ts` | 2 | L47: const CHAIN_MARKER = "bili-chain";<br>L413: const base = `http://127.0.0.1:${proxyPort}/bili/http://127.0.0.1:${upstreamPort}`; |
| `tests\dump-observability.test.ts` | 2 | L74: // expose the per-path counts so /__bili/stats and the /acp report can surface them.<br>L75: test("getUnrecognizedPathStats: exposes per-path counts for /__bili/stats (#1290)", () => { |
| `tests\e2e-session-identity.test.ts` | 2 | L146: const resp = await fetch(`http://127.0.0.1:${h.proxyPort}/__bili/stats`);<br>L159: return fetch(`http://127.0.0.1:${h.proxyPort}/bili/http://127.0.0.1:${up.port}${path}`, { |
| `tests\export-block-summaries.test.ts` | 2 | L7: // Regression #845: bili export on a session with a persisted folded snapshot<br>L8: // must include every active block's summary even when BILI_PERSIST_TAIL_TOKENS |
| `tests\fake-completion.test.ts` | 2 | L9: process.env.BILI_FAKE_COMPLETION_RETRIES = "2";<br>L197: const resp = await fetch(`http://127.0.0.1:${h.proxyPort}/bili/http://127.0.0.1:${h.upstreamPort}/v1/messages`, { |
| `tests\fallback-window-floor.test.ts` | 2 | L72: const url = `http://127.0.0.1:${proxyPort}/bili/http://127.0.0.1:${upstreamPort}/v1/chat/completions`;<br>L170: const url = `http://127.0.0.1:${proxyPort}/bili/http://127.0.0.1:${upstreamPort}/v1/chat/completions`; |
| `tests\fix-437-idle-timeout.test.ts` | 2 | L121: res.writeHead(201, { "content-type": "application/json", "x-bili-test": "abc123" });<br>L131: assert.equal(result.response.headers.get("x-bili-test"), "abc123"); |
| `tests\fix-679-windows-launch.test.ts` | 2 | L184: const root = fs.mkdtempSync(path.join(os.tmpdir(), "bili-679-"));<br>L202: const root = fs.mkdtempSync(path.join(os.tmpdir(), "bili-679-")); |
| `tests\fork-ccr-adoption.test.ts` | 2 | L39: process.env.BILI_PERSIST = "0";<br>L284: const dir = mkdtempSync(path.join(tmpdir(), "bili-fork-ccr-")); |
| `tests\fork-nudge-trigger.test.ts` | 2 | L149: const resp = await fetch(`http://127.0.0.1:${proxyPort}/bili/http://127.0.0.1:${upstreamPort}/v1/messages`, {<br>L274: const resp = await fetch(`http://127.0.0.1:${proxyPort}/bili/http://127.0.0.1:${upstreamPort}/v1/messages`, { |
| `tests\grok-session-identity.test.ts` | 2 | L82: messagesUrl: () => `http://127.0.0.1:${proxyPort}/bili/http://127.0.0.1:${upstreamPort}/v1/messages`,<br>L99: const res = await fetch(rig.proxyUrl(`/__bili/plugin/status?conversationId=${encodeURIComponent(conversationId)}`)); |
| `tests\image-compress.test.ts` | 2 | L8: process.env.BILI_PERSIST = "0";<br>L366: const P = mkdtempSync(path.join(tmpdir(), "bili-img-persist-")); |
| `tests\issue1547-nonstream-cache-ledger.test.ts` | 2 | L76: const url = `http://127.0.0.1:${proxyPort}/bili/http://127.0.0.1:${upstreamPort}/v1/chat/completions`;<br>L112: const rep = await fetch(`http://127.0.0.1:${proxyPort}/__bili/cache-report?session=${sessionId}`); |
| `tests\issue411-abort-usage.test.ts` | 2 | L104: modelUrl: () => `http://127.0.0.1:${proxyPort}/bili/http://127.0.0.1:${upstreamPort}/v1/messages`,<br>L113: const res = await fetch(rig.proxyUrl("/__bili/plugin/register"), { |
| `tests\issue903-request-cost-log.test.ts` | 2 | L14: // #903: long sessions keep resending the full harness history to bili even<br>L88: const url = `http://127.0.0.1:${proxyPort}/bili/http://127.0.0.1:${upstreamPort}/v1/chat/completions`; |
| `tests\logger-rotate.test.ts` | 2 | L12: const dir = fs.mkdtempSync(path.join(os.tmpdir(), "bili-logrot-"));<br>L13: const p = path.join(dir, "bili.log"); |
| `tests\logger-session-tag.test.ts` | 2 | L10: const dir = fs.mkdtempSync(path.join(os.tmpdir(), "bili-sesstag-"));<br>L11: return path.join(dir, "bili.log"); |
| `tests\loop-compress.test.ts` | 2 | L444: process.env.BILI_REPLAY_RETRY_BASE_MS = "1";<br>L474: delete process.env.BILI_REPLAY_RETRY_BASE_MS; |
| `tests\loop-responses-orphan.test.ts` | 2 | L93: process.env.BILI_REPLAY_RETRY_MAX = "1";<br>L105: delete process.env.BILI_REPLAY_RETRY_MAX; |
| `tests\loop-strict-echo-responses.test.ts` | 2 | L95: return fetch(`http://127.0.0.1:${proxyPort}/bili/http://127.0.0.1:${upstreamPort}/v1/responses`, {<br>L145: const stateDir = fs.mkdtempSync(path.join(os.tmpdir(), "bili-reloop-resp-")); |
| `tests\loop-strict-echo.test.ts` | 2 | L89: return fetch(`http://127.0.0.1:${proxyPort}/bili/http://127.0.0.1:${upstreamPort}/v1/chat/completions`, {<br>L108: const stateDir = fs.mkdtempSync(path.join(os.tmpdir(), "bili-reloop-")); |
| `tests\loop-truncation.test.ts` | 2 | L159: process.env.BILI_REPLAY_RETRY_MAX = "1";<br>L177: delete process.env.BILI_REPLAY_RETRY_MAX; |
| `tests\model-windows.test.ts` | 2 | L75: const home = fs.mkdtempSync(path.join(os.tmpdir(), "bili-piw-"));<br>L97: const home = fs.mkdtempSync(path.join(os.tmpdir(), "bili-ocw-")); |
| `tests\opencode-acp-command.test.ts` | 2 | L19: if (req.url === "/__bili/plugin/tool" && req.method === "POST") {<br>L106: assert.match(prompts[0].text, /no bili proxy detected/); |
| `tests\plugin-nudge-injection.test.ts` | 2 | L92: const url = `http://127.0.0.1:${proxyPort}/bili/http://127.0.0.1:${upstreamPort}/v1/chat/completions`;<br>L130: const len = await forwardedTurn2Length("nudge-plugin", { "x-bili-plugin": "omp" }); |
| `tests\port-zone-live.test.ts` | 2 | L101: const home = fs.mkdtempSync(path.join(os.tmpdir(), "bili-zone-live-"));<br>L133: const p = path.join(root, `bili-zone-live-v2-${process.pid}-${++v2Seq}.js`); |
| `tests\preflight-fork-estimate.test.ts` | 2 | L166: const r = await fetch(`http://127.0.0.1:${proxyPort}/bili/http://127.0.0.1:${upstreamPort}/v1/messages`, {<br>L259: const r = await fetch(`http://127.0.0.1:${proxyPort}/bili/http://127.0.0.1:${upstreamPort}/v1/messages`, { |
| `tests\preflight-round-budget.test.ts` | 2 | L114: const resp = await fetch(`http://127.0.0.1:${proxyPort}/bili/http://127.0.0.1:${upstreamPort}/chat/completions`, {<br>L158: const resp = await fetch(`http://127.0.0.1:${proxyPort}/bili/http://127.0.0.1:${upstreamPort}/chat/completions`, { |
| `tests\responses-fold-cache-seam.test.ts` | 2 | L71: !!it && it.type === "message" && typeof (it.content as string) === "string" && (it.content as string).includes("bili-chain");<br>L153: const url = `http://127.0.0.1:${proxyPort}/bili/http://127.0.0.1:${upstreamPort}/v1/responses`; |
| `tests\responses-tool-images.test.ts` | 2 | L147: await run(`http://127.0.0.1:${proxyPort}/bili/http://127.0.0.1:${upstreamPort}/v1/responses`, forwarded, summaries);<br>L172: headers: { "content-type": "application/json", ...(plugin ? { "x-bili-plugin": "test-agent" } : {}) }, |
| `tests\resume-ref-inheritance.test.ts` | 2 | L214: const url = `http://127.0.0.1:${proxyPort}/bili/http://127.0.0.1:${relayPort}/v1/chat/completions`;<br>L326: const url = `http://127.0.0.1:${proxyPort}/bili/http://127.0.0.1:${relayPort}/v1/chat/completions`; |
| `tests\store-marker-gate.test.ts` | 2 | L46: _setStoreForTest(new SessionStore({ dir: path.join(os.tmpdir(), `bili-store-gate-${marker ? "marker" : "native"}-${Math.random().toString(36).slice(2)}`), debou<br>L81: const resp = await fetch(`http://127.0.0.1:${h.proxyPort}/bili/${h.upstreamUrl}/v1/responses`, { |
| `tests\strict-echo-model-criterion.test.ts` | 2 | L84: return fetch(`http://127.0.0.1:${proxyPort}/bili/http://127.0.0.1:${upstreamPort}/v1/chat/completions`, {<br>L103: const stateDir = fs.mkdtempSync(path.join(os.tmpdir(), "bili-semc-")); |
| `tests\strip-images-compact.test.ts` | 2 | L22: // #618 review nit: with stripImages enabled and NO bili compaction item in the<br>L62: const base = `http://127.0.0.1:${proxyPort}/bili/http://127.0.0.1:${upstreamPort}`; |
| `tests\subagent-namespace.test.ts` | 2 | L123: const url = `http://127.0.0.1:${proxyPort}/bili/http://127.0.0.1:${upstreamPort}/v1/responses`;<br>L184: const stats = await (await fetch(`http://127.0.0.1:${proxyPort}/__bili/stats`)).json(); |
| `tests\tool-ring.test.ts` | 2 | L40: assert.equal(normalizeToolName("mcp__bili-compress"), "bili-compress", "non-standard single-underscore pkg form does not fully strip");<br>L40: assert.equal(normalizeToolName("mcp__sophialin-compress"), "bili-compress", "non-standard single-underscore pkg form does not fully strip"); |
| `tests\upstream-error-log.test.ts` | 2 | L13: *  bili.log carried zero trace, because non-2xx upstream responses were<br>L60: return fetch(`http://127.0.0.1:${proxyPort}/bili/http://127.0.0.1:${upstreamPort}/v1/chat/completions`, { |
| `tests\vscode-copilot.test.ts` | 2 | L101: const url = `http://127.0.0.1:${proxyPort}/bili/http://127.0.0.1:${upstreamPort}/v1/chat/completions`;<br>L195: const url = `http://127.0.0.1:${proxyPort}/bili/http://127.0.0.1:${upstreamPort}/v1/chat/completions`; |
| `tests\watcher-registration.test.ts` | 2 | L15: if (req.method === "POST" && req.url === "/__bili/watcher") {<br>L51: // A daemon proxy (no BILI_PARENT_PID) refuses — that is the #1322 case. |
| `tools\analyze-dumps.mjs` | 2 | L9: // Default dump dir: ~/.local/state/billion-context/dumps<br>L22: const dir = args[0] \|\| join(homedir(), ".local", "state", "billion-context", "dumps"); |
| `AUTO-MERGE-GUARDRAILS.md` | 1 | L4: > **方法**：拉取三个仓库（billion-context / billion-context-pi / acp-kernel）**全部 issue + PR + 评论**（共 1543 项、1072 个 PR、3645 条评论），叠加本仓 `devlog/` 31 条迭代记录、`AGENTS.md` 完整 git |
| `SESSION-IDENTITY.md` | 1 | L3: Design record for how billion-context decides which session an **anonymous** |
| `SESSION-IDENTITY.zh-CN.md` | 1 | L3: 设计记录:billion-context 如何判定一个**匿名**请求(无 `session_id` 头或 body |
| `src\codex-models.ts` | 1 | L74: *  so bili must never budget a codex client above it (#321 PR-E1). */ |
| `src\compat-roles.ts` | 1 | L43: *  client-sent items, bili's injected compress prompt, instructions hoisting, |
| `src\degenerate-retry.ts` | 1 | L20: "[billion-context] Your previous response ended with no visible text and no tool call. Continue now: take your next concrete action."; |
| `src\fork-adoption.ts` | 1 | L270: log("info", `[fork-adoption] fork of ${parentId}: parent has ${plan.adoptedActive} adoptable block(s) covering ~${plan.adoptedTokens} tokens; forkAdoption disab |
| `src\kimi\bootstrap-hook.ts` | 1 | L4: // sessions started while `bili start` is running get compression without |
| `src\loop\adapter-anthropic.ts` | 1 | L289: loggerLog("warn", `[bili-artifact] stripped model-emitted internal artifact: ${snippet.slice(0, 80).replace(/\n/g, " ")}`); |
| `src\loop\adapter-google.ts` | 1 | L300: loggerLog("warn", `[bili-artifact] stripped model-emitted internal artifact: ${snippet.slice(0, 80).replace(/\n/g, " ")}`); |
| `src\persist-eperm.ts` | 1 | L14: * kernel, because it is Windows/billion-context specific. |
| `src\reasoning-drop.ts` | 1 | L4: *  tool calls at request time — the billion-context twin of |
| `src\server\budget.ts` | 1 | L30: *  fold space: the outbound system prompt (client text plus bili-injected parts) |
| `src\version.ts` | 1 | L20: export const PACKAGE_NAME = readPkgField("name", "billion-context"); |
| `src\web\logs-query.ts` | 1 | L2: * Pure selection engine behind GET /__bili/logs (web log view). |
| `tests\absorb.test.ts` | 1 | L247: const dir = mkdtempSync(path.join(tmpdir(), "bili-absorb-")); |
| `tests\acp-panel.test.ts` | 1 | L12: version: "billion-context@0.1.64", |
| `tests\cache-seam-fuzz.test.ts` | 1 | L197: const url = `http://127.0.0.1:${proxyPort}/bili/http://127.0.0.1:${upstreamPort}/v1/chat/completions`; |
| `tests\cache-seam-probes.test.ts` | 1 | L159: const url = `http://127.0.0.1:${proxyPort}/bili/http://127.0.0.1:${upstreamPort}/v1/chat/completions`; |
| `tests\claude-subagent-split.test.ts` | 1 | L95: const url = `http://127.0.0.1:${proxyPort}/bili/http://127.0.0.1:${upstreamPort}/v1/messages`; |
| `tests\codex-official.test.ts` | 1 | L67: const base = `http://127.0.0.1:${proxyPort}/bili/http://127.0.0.1:${upstreamPort}`; |
| `tests\codex-turn-isolation.test.ts` | 1 | L94: const url = `http://127.0.0.1:${proxyPort}/bili/http://127.0.0.1:${upstreamPort}/v1/responses`; |
| `tests\compaction-trigger-finality.test.ts` | 1 | L84: const url = `http://127.0.0.1:${proxyPort}/bili/http://127.0.0.1:${upstreamPort}/v1/responses`; |
| `tests\e2e-compress-prompts.test.ts` | 1 | L73: const url = `http://127.0.0.1:${proxyPort}/bili/http://127.0.0.1:${upstreamPort}/v1/chat/completions`; |
| `tests\e2e-grow-compress.test.ts` | 1 | L161: const url = `http://127.0.0.1:${proxyPort}/bili/http://127.0.0.1:${bridge.port}/v1/responses`; |
| `tests\e2e-mid-system.test.ts` | 1 | L161: const url = `http://127.0.0.1:${proxyPort}/bili/http://127.0.0.1:${upstreamPort}/v1/chat/completions`; |
| `tests\e2e-proxy-smoke.test.ts` | 1 | L143: const url = `http://127.0.0.1:${proxyPort}/bili/http://127.0.0.1:${upstreamPort}/v1/chat/completions`; |
| `tests\e2e-tag-echo.test.ts` | 1 | L85: const resp = await fetch(`http://127.0.0.1:${h.proxyPort}/bili/http://127.0.0.1:${h.upstreamPort}/v1/messages`, { |
| `tests\fix-1075-side-request.test.ts` | 1 | L163: const url = `http://127.0.0.1:${proxyPort}/bili/http://127.0.0.1:${upstreamPort}/chat/completions`; |
| `tests\fix-781-summary-images.test.ts` | 1 | L194: return { proxy, url: `http://127.0.0.1:${proxyPort}/bili/http://127.0.0.1:${upstreamPort}${path}` }; |
| `tests\fix-config-session.test.ts` | 1 | L151: const dir = mkdtempSync(join(tmpdir(), "bili-sesscap-")); |
| `tests\fold-round2-shape.test.ts` | 1 | L101: const url = `http://127.0.0.1:${port}/bili/http://127.0.0.1:${upPort}/v1/chat/completions`; |
| `tests\fork-adoption.test.ts` | 1 | L190: const url = `http://127.0.0.1:${proxyPort}/bili/http://127.0.0.1:${relayPort}/v1/chat/completions`; |
| `tests\hop-by-hop.test.ts` | 1 | L73: path: `/bili/http://127.0.0.1:${upstreamPort}/v1/models`, |
| `tests\issue1158-no-model-request-warning.test.ts` | 1 | L4: // registered bili tools. The 404 for such a conversation must be actionable — |
| `tests\issue1321-tier-window-cap.test.ts` | 1 | L118: return `http://127.0.0.1:${rig.proxyPort}/bili/http://127.0.0.1:${rig.upstreamPort}/v1/messages`; |
| `tests\issue1492-stale-estimate-view.test.ts` | 1 | L143: const url = `http://127.0.0.1:${proxy.address().port}/bili/http://127.0.0.1:${upstreamPort}/v1/messages`; |
| `tests\issue1595-nudge-reanchor.test.ts` | 1 | L254: await fn(`http://127.0.0.1:${proxy.address().port}/bili/http://127.0.0.1:${upstreamPort}/v1/messages`, logs); |
| `tests\issue453-backstop.test.ts` | 1 | L133: const url = `http://127.0.0.1:${pPort}/bili/http://127.0.0.1:${upPort}/v1/chat/completions`; |
| `tests\issue496-forward-once-learn.test.ts` | 1 | L102: const url = `http://127.0.0.1:${proxyPort}/bili/http://127.0.0.1:${upstreamPort}/v1/messages`; |
| `tests\launcher-max-outputs.test.ts` | 1 | L12: process.env.BILI_LAUNCHER_MODEL_MAX_OUTPUTS = JSON.stringify({ |
| `tests\loop-adapters.test.ts` | 1 | L198: // After a compress re-request, the stream handed to a downstream bili is |
| `tests\native-compact-terminal.test.ts` | 1 | L105: const base = `http://127.0.0.1:${proxyPort}/bili/http://127.0.0.1:${upstreamPort}/v1`; |
| `tests\persist-active-pack.test.ts` | 1 | L27: const dir = mkdtempSync(join(tmpdir(), "bili-activepack-")); |
| `tests\persist-eperm.test.ts` | 1 | L5: const DIR = "/home/u/.local/share/billion-context/sessions"; |
| `tests\persist-rollback-guard.test.ts` | 1 | L30: const dir = mkdtempSync(join(tmpdir(), "bili-rollback-")); |
| `tests\persist-stats-roundtrip.test.ts` | 1 | L31: const dir = mkdtempSync(join(tmpdir(), "bili-pq-")); |
| `tests\preflight-compress-responses.test.ts` | 1 | L114: const url = `http://127.0.0.1:${proxyPort}/bili/http://127.0.0.1:${upstreamPort}/v1/responses`; |
| `tests\preflight-google-summary.test.ts` | 1 | L100: const resp = await fetch(`http://127.0.0.1:${proxyPort}/bili/http://127.0.0.1:${upstreamPort}/v1beta/models/gemini-test:${path}`, { |
| `tests\reasoning-echo.test.ts` | 1 | L123: it("#1327 anthropic wire: counts only blocks bili actually lost, not pre-existing gaps", () => { |
| `tests\refold-wiring.test.ts` | 1 | L10: * #403 refold wiring (bili proxy lane): a successful FULL-BLOCK decompress |
| `tests\responses-proxy-id-replay.test.ts` | 1 | L68: assert.deepEqual(input, expected, "ids bili does not own reach the upstream byte-identical"); |
| `tests\responses-seam-probes.test.ts` | 1 | L155: const url = `http://127.0.0.1:${proxyPort}/bili/http://127.0.0.1:${upstreamPort}/v1/responses`; |
| `tests\routing.test.ts` | 1 | L110: // The key is the /bili/<this> string. A request matches when its embedded |
| `tests\rules.test.ts` | 1 | L230: const dir = mkdtempSync(path.join(tmpdir(), "bili-rules-")); |
| `tests\session-lock-concurrency.test.ts` | 1 | L81: const url = `http://127.0.0.1:${proxyPort}/bili/http://127.0.0.1:${upstreamPort}/v1/messages`; |
| `tests\silent-backend-nudge.test.ts` | 1 | L192: const resp = await fetch(`http://127.0.0.1:${proxyPort}/bili/http://127.0.0.1:${upstreamPort}/v1/messages`, { |
| `tests\system-anchor.test.ts` | 1 | L174: test("interop: a third-party client doing its own in-history updates gets zero bili injection", () => { |
| `tests\tight-fold-summaries.test.ts` | 1 | L206: const base = `http://127.0.0.1:${proxyPort}/bili/http://127.0.0.1:${upstreamPort}`; |
| `tests\tool-witness-pipes.test.ts` | 1 | L2: // complete bili tool call as it streams out. These tests pin the recording |
| `tests\update-restart-reminder.test.ts` | 1 | L39: assert.match(entries[0].msg, /running v0\.1\.112 but v0\.1\.114 is installed — restart bili to activate/); |
| `tests\web-i18n.test.ts` | 1 | L159: assert.match(WEB_CLIENT, /bili-language/); |
| `tests\wire-contract-golden.test.ts` | 1 | L1: // Golden schema snapshots (#1304 item 2). Every tool schema bili or the pinned |

---

## 附录 A · 改名后的回归审计（2026-10-11 补记）

改名的**文本层**校验（`sophialin-verify.mjs`：入范围文件 574、漏网点 0、243 个冻结片段逐字保留）通过，**但不足以证明改名无回归**。用 `git worktree add D:\dsh\pristine HEAD` 建基线树对照跑测试后，抓到两个「文本层看不见」的回归：

### A1. 长度耦合的魔法数字（严重）

`src/server.ts:229`

```ts
if (reqUrl.startsWith("/sophialin/")) {
    let rest = reqUrl.slice(6);        // ← 6 是旧前缀 "/bili/" 的长度
```

`"/sophialin/".length === 11`。旧前缀 `/bili/` 恰好 6 字符，所以这个硬编码偏移在改名后静默失效：`rest` 变成 `"lin/http://…"`，不满足 `startsWith("http")`，零配置隧道解析整段跳过，请求掉回兜底路径，拼出非法上游 URL（`http://<host>/sophialin/http://<host>/v1/messages`）。**所有走 `/sophialin/<embedded-url>` 的请求全部失效**——表现为大量测试 502 / 超时。

已修：`reqUrl.slice("/sophialin/".length)`。同族位置 `src/discover.ts:14`、`src/launcher.ts:299` 本来就写字面量长度，不受影响；`src/plugin-install.ts:1044` 的 `slice(4)` 是 `"npm:"` 的长度，无关。

**教训**：改名规则必须覆盖「与前缀长度耦合的裸数字」。文本 diff 看不见它。

### A2. `\x3c` 转义粘连导致的词边界漏网（中等）

`src/chain-checkpoint.ts:65`

```ts
export const TAG_OPEN = "\x3cbili-chain ";   // ← 漏网
```

同文件 L57 的 `CHAIN_TAG = "sophialin-chain"` 已改，于是**发射用的开标签**与**识别用的标签**不一致，链式检查点载体既发不出去也剥不掉。测试 `tests/bili-artifact-strip.test.ts` 2 例、`tests/anthropic-cache-control.test.ts` 1 例因此失败。

漏网机制：改名规则按词边界（`\bbili\b`）匹配，而 `"\x3c` 是**字面字符** `\ x 3 c`，`c` 是词字符，`bili` 前面没有词边界 ⇒ 不匹配。`"<bili-chain "` 这种真 `<` 写法就没有这个问题。

已修三处：`src/chain-checkpoint.ts:65`、`src/loop/tag-echo-filter.ts:293`（注释）、`tests/anthropic-cache-control.test.ts:269`（测试内正则）。

**教训**：改名规则不能只用词边界；**转义序列（`\x3c` / `\u003c`）与前缀粘连**会制造词边界假象。扫残余时必须按**裸子串**（如直接搜 `bili-chain`）复核，而不是按词。

### A3. 与本次改名无关、但会污染测试结果的既有环境问题

- **`matchesNoProxy` 的 `<local>` 不覆盖回环 IP**：`src/upstream-proxy.ts:182` 对 `token === "<local>"` 仅判 `!host.includes(".")`，而 `127.0.0.1` 含点 ⇒ Windows 系统代理的 `<local>` 豁免**不覆盖 127.0.0.1**。后果：手写 `ProxyOptions`（不带 `proxy`/`proxyFallback`）的测试会被系统代理（Clash，`127.0.0.1:10808`）劫持，表现为 502 / ECONNRESET。生产路径不受影响，因为 `src/config.ts:1001-1015` 会显式给出 `proxy: ""` + `explicitDirect: true` 短路到直连（`src/upstream-proxy.ts:277`）。
- **`tests/fix-config-session.test.ts` 的 `resolveProxyDecision: default mode, no env set -> still direct`** 在 **pristine HEAD 上同样失败**（`actual: 'windows-system'`），属既有环境性失败，不是本次回归。

### A4. 结论

| 项 | 判据 | 状态 |
|---|---|---|
| A1 前缀切片 | 同脚本两树对照：pristine 200 / renamed 502；修复后 renamed 200 | 已修 |
| A2 链标签 | `tests/bili-artifact-strip.test.ts` 从 2 失败 → 全绿 | 已修 |
| A3 系统代理 | pristine 与 renamed 表现一致 | 环境问题，未改 |
| `pnpm run typecheck` | `tsc --noEmit --project tsconfig.build.json` | exit=0 |

---

## 附录 B · 第二轮回归审计（2026-10-11 补记）

A1/A2 修完后全量跑仍是 **3496 用例 / 21 失败**。用 `D:\dsh\pristine` 基线树对这**同一批 12 个文件**再对照：**pristine 198 用例 / 188 通过 / 10 失败；renamed 21 失败 ⇒ 11 个是改名回归**，另 10 个两树都失败（A3 那类环境问题）。逐个定位后，回归共 **5 个根因类别**，全部已修。

### B1. `TEXT_EXT` 缺 `py` —— 整个 `hermes-plugin/__init__.py` 被跳过（6 个失败）

`sophialin-rename.mjs:37`

```js
const TEXT_EXT = /\.(ts|js|mjs|cjs|json|yml|yaml|md|txt|toml|sh|ps1)$/;   // ← 没有 py
```

`hermes-plugin/__init__.py` 因此**整份不改名**（同目录 `plugin.yaml` 因扩展名在集合内而被改）。后果：Python 插件的 env 名、状态目录、路由、旁车文件名全是旧值，而测试驱动（已改名）用新值，两边对不上 ⇒ 插件判定「没有可用旁车」直接 inert，`tools_registered` 恒为 `[]`。`tests/hermes-native.test.ts` 6 例失败。

已修：`TEXT_EXT` 加 `py`；另补规则 `[/billion_context/g, "sophialin_context"]`（首轮只有连字符形态，logger 名下划线形态漏网），`hermes-plugin/__init__.py:39` 手工改为 `logging.getLogger("sophialin_context.hermes")`。该轮 `--apply`：入范围 582 文件 / 命中 2 / 替换点 71。

**教训**：`TEXT_EXT` 这类白名单漏一个扩展名，损失的是**整份文件**而不是几行；复查时要用「受跟踪文件 − 入范围文件」反查缺口，而不是只看命中数。

### B2. `\u003c` 拼法的转义粘连（1 个失败，A2 同族）

`tests/fix-1760-cjk-single-line-visible-turn.test.ts:100`

```ts
assert.equal(isOrphanMarkupText("\u003cbili-cha"), true, "truncated internal-artifact open");
```

A2 修的是 `\x3c`，这里是 `\u003c`：同样 4 个字面字符后接词字符，`bili` 前无词边界。改名的同时把 `TAG_OPEN` 改成了 `<sophialin-chain `，于是这个「截断的内部产物开头」不再被识别。

已修：`"\u003csophialin-cha"`。同族扫残余时另抓出两处（未影响测试但影响 e2e 假上游的链载体识别）：

- `tests/e2e/fake-upstream.mjs:39` — `/^\s*\x3cbili-chain\s[\s\S]*\/\x3e\s*$/`
- `tests/e2e/fake-upstream-chat.mjs:120` — 同一正则

### B3. 词首大写 `Bili`（8 处散文/UI 文案，无测试覆盖）

首轮规则只有 `\bbili\b`（小写）与 `\bBili(?=[A-Z])`（后接大写），于是 `Bili-generated` / `Bili-owned` / `Bili's` / `Bili launcher` 这类**词首大写、后接小写或标点**的写法全漏。补规则 `[/\bBili\b/g, "Sophialin"]`（词边界保证 `createBiliPlugin` / `isBiliPiEntry` / `stripBiliArtifacts` 这类**中置驼峰内部标识符不动** —— 属有意保留）。命中 8 文件 8 点，其中一处是**用户可见 UI 文案**：

- `src/web/i18n.ts:508` — `"con.method_launcher": "Method 2 · Bili launcher (no install — …)"`

其余：`src/loop/adapter-responses.ts:31`、`src/output-steering.ts:46`、`src/server.ts:451`、`tests/compaction-trigger-finality.test.ts:16`、`tests/native-intercept.test.ts:222`、`tests/responses-proxy-id-replay.test.ts:81`、`tests/wire-schema-portable.test.ts:17`。

### B4. 被机械改名的**冻结包名**（严重，1 个失败但真机升级会坏）

`src/plugin-install.ts:180-197`

```ts
// 改名前
|| /^npm:billion-context(-pi)?(@|$)/.test(entry)
// 改名后（错）——billion-context 是已发布的 npm 包名，不是产品名
|| /^npm:sophialin-context(-pi)?(@|$)/.test(entry)
```

PROTECT 冻结的是**字面量** `billion-context-pi`；而这里正则里写的是片段 `billion-context(-pi)?`，裸子串 `billion-context` 匹配不上冻结段，于是被 `billion-context` → `sophialin-context` 规则改掉。后果：升级机器上 pi 的 `settings.json` 里仍留着 `npm:billion-context` / `npm:billion-context-pi` / `node_modules/billion-context` 这些**已发布标识符**，`sophialin plugin install pi` 不再认它们 ⇒ 旧条目静默留活，**两个插件同时压缩**。`tests/plugin-agent.test.ts:1525` 断言「被替换的条目必须点名输出」正是这条契约。

已修：抽出冻结片段常量并让两代名字都可识别（`isLegacyBcpEntry` 的 `billion-context-pi` 因是完整字面量而被 PROTECT 正确保住，可作对照）：

```ts
const PI_PKG = "sophialin-context|billion-context";
const PI_RE = {
    npm: new RegExp(`^npm:(?:${PI_PKG})(-pi)?(@|$)`),
    nodeModules: new RegExp(`(^|[/\\\\])node_modules[/\\\\](?:${PI_PKG})(-pi)?([/\\\\]|$)`),
    bare: new RegExp(`(^|[/\\\\])(?:${PI_PKG})(-pi)?$`),
    npmSelf: new RegExp(`^npm:(?:${PI_PKG})(@|$)`),
    nodeModulesSelf: new RegExp(`(^|[/\\\\])node_modules[/\\\\](?:${PI_PKG})([/\\\\]|$)`),
    bareSelf: new RegExp(`(^|[/\\\\])(?:${PI_PKG})$`),
};
```

**教训**：改名前必须先把「**已发布标识符**」清单从「**产品名**」里分出来。落在正则/模板字符串里被拆成片段的包名，冻结字面量兜不住 —— 判据是「这个字符串是否出现在用户磁盘上的既有文件里」。

### B5. golden 快照文件名 + 依赖里硬编码的手册标题（2+1 个失败）

- `tests/golden/wire-contract/bili.json`（59193 B）未随改名重命名，而 `tests/wire-contract-inventory.ts:137` 早已写 `name: "sophialin.json"` ⇒ `wire-contract-golden` 2 例失败（`no orphaned snapshot files` + `ENOENT sophialin.json`）。文件内容里**没有**旧名字符串，纯文件名失配。已 `git mv` 为 `sophialin.json`。
- 导出手册首行 `# billion-context session handoff` **不在本仓库**：`src/export.ts:50` 的 v1 路径调用外部依赖 `acp-kernel@0.0.99` 的 `renderHandoff`，而该硬编码在 `node_modules/acp-kernel/dist/index.js:7018`（`dist/handoff.d.ts` 的 `HandoffInput` **没有产品名字段**，无从覆盖）。已修：`src/export.ts:57-64` 新增 `rebrandHandoff()`，按**形状** `/^# [^\n]* session handoff/` 匹配后重冠名，不把依赖的私有字面量抄进本仓库。

### B6. 第二轮结论

| 项 | 判据 | 状态 |
|---|---|---|
| B1 `.py` 漏改名 | `tests/hermes-native.test.ts` 6 失败 → **19/19 全绿** | 已修 |
| B2 `\u003c` 粘连 | `tests/fix-1760-…test.ts` 1 失败 → **6/6 全绿**；另修 2 处 e2e 假上游正则 | 已修 |
| B3 词首大写 `Bili` | 补规则 `--apply` 命中 8 文件 8 点（含用户可见 i18n） | 已修 |
| B4 冻结包名 | `tests/plugin-agent.test.ts` 1 失败 → **62/62 全绿** | 已修 |
| B5 golden + 手册标题 | `wire-contract-golden` 5/5、`e2e-export-handoff` 不再失败 | 已修 |
| `pnpm run typecheck` | `tsc --noEmit --project tsconfig.build.json` | exit=0 |
| `pnpm run build` | 15 入口全部产出，`dist-import-annotations: OK` | 成功 |
| 全量 `tests/*.test.ts` | **3496 用例 / 3472 通过 / 9 失败**（修前 21） | 剩余 9 个全部落在 pristine 基线本就失败的 10 个环境项内 |

**判定：改名回归 11 → 0。** `dist/` 已按改名后的源码重建（该目录受版本控制）；重建后 `dist/index.js` 里剩余的 `billion-context` 只有三类合法来源：B4 新加的 legacy 识别字面量、上游 issue 引用（如 `billion-context#1188`）、以及被 `rebrandHandoff()` 在运行时覆盖掉的 acp-kernel 内部字符串。

**未纳入本轮、留给 ⑤「配置与状态目录迁移」的既有制品迁移**（不是回归，是改名必然带来的旧制品清理）：`~/.config|.local/state|.local/share/billion-context` 等旧目录、`plugins/billion-context` 的 opencode/hermes 包装目录、dsh profile 里 `billion-context` 这个 bundle 名（`src/launcher.ts:2171 DSH_BARE_ENTRY`、`src/dsh-channel.ts:18 DSH_PACKAGE`）。
