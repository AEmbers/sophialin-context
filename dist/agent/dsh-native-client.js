window.__ModuleLoader__.load({ id: "sophialin-context", factory: (require) => {
var module = { exports: {} };
var exports = module.exports;

"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/agent/dsh-native-client.ts
var dsh_native_client_exports = {};
__export(dsh_native_client_exports, {
  apply: () => apply,
  inject: () => inject
});
module.exports = __toCommonJS(dsh_native_client_exports);
var import_react = require("react");
var inject = ["slots", "locale"];
var NS = "sophialin";
var zh = {
  "nav": "sophialin\u8BBE\u7F6E",
  "title": "sophialin-context \u538B\u7F29\u4EE3\u7406",
  "open": "\u6253\u5F00 Web UI",
  "hint": "\u67E5\u770B\u538B\u7F29\u72B6\u6001\u3001\u4F1A\u8BDD\u4E0E\u4E0A\u4E0B\u6587\u7A97\u53E3\u3002",
  "degraded": "\u5F53\u524D dsh \u8FDB\u7A0B\u672A\u7ED1\u5B9A sophialin \u4EE3\u7406\uFF08\u672A\u7ECF sophialin dsh \u542F\u52A8\uFF0C\u6216\u4EE3\u7406\u5C1A\u672A\u5C31\u7EEA\uFF09\u2014\u2014\u5148\u8FD0\u884C /acp\uFF0C\u6216\u6539\u7528 sophialin dsh \u542F\u52A8\u3002"
};
var en = {
  "nav": "sophialin",
  "title": "sophialin-context compression proxy",
  "open": "Open Web UI",
  "hint": "Inspect compression status, sessions and context windows.",
  "degraded": "This dsh process is not bound to a sophialin proxy (not launched via sophialin dsh, or the proxy is not up yet) \u2014 run /acp first, or launch through sophialin dsh."
};
function readOrigin() {
  const g = globalThis;
  const origin = g.__BILI__?.origin;
  return typeof origin === "string" && origin.length > 0 ? origin : void 0;
}
function openExternal(url) {
  const w = globalThis;
  if (typeof w.open === "function") w.open(url, "_blank", "noopener,noreferrer");
}
function apply(ctx) {
  const zhDict = zh;
  const enDict = en;
  ctx.effect(
    () => ctx.locale.register(NS, { zh: zhDict, en: enDict }),
    "sophialin: dictionaries"
  );
  const t = ctx.locale.bind(NS);
  const section = () => {
    const origin = readOrigin();
    return (0, import_react.createElement)(
      "div",
      { style: { display: "flex", flexDirection: "column", gap: 12, padding: "20px 8px" } },
      (0, import_react.createElement)("h3", { style: { margin: 0, fontSize: 16, fontWeight: 600 } }, t("title")),
      origin === void 0 ? (0, import_react.createElement)("p", { style: { margin: 0, opacity: 0.7, lineHeight: 1.6 } }, t("degraded")) : (0, import_react.createElement)(
        "button",
        {
          type: "button",
          onClick: () => openExternal(`${origin}/__sophialin/`),
          style: {
            alignSelf: "flex-start",
            cursor: "pointer",
            borderRadius: 8,
            border: "1px solid rgba(127,127,127,0.4)",
            background: "transparent",
            color: "inherit",
            fontFamily: "inherit",
            fontSize: 14,
            lineHeight: "22px",
            padding: "7px 16px"
          }
        },
        `${t("open")}\uFF08${origin}\uFF09`
      ),
      (0, import_react.createElement)("p", { style: { margin: 0, opacity: 0.7, fontSize: 13, lineHeight: 1.6 } }, t("hint"))
    );
  };
  ctx.slots.inject(
    "settings.section",
    () => ctx.slots.register({ name: "settings.section", id: "sophialin", order: 100, label: () => t("nav"), locale: NS }, section)
  );
}

return module.exports;
}});
