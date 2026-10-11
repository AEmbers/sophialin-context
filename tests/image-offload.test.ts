import test from "node:test";
import assert from "node:assert/strict";

process.env.SOPHIALIN_PERSIST = "0";

import { defaultConfig, recordImageShrink, type Config } from "acp-kernel";
import type { BiliMessage } from "acp-kernel/wire";
import { parseCompressSettings } from "../src/config.ts";
import { applyCompressSettings, mergeCompress } from "../src/compress-settings.ts";
import { executeImageFull, storeEffectiveImageCompression } from "../src/image-compress.ts";
import {
    DEFAULT_IMAGE_OFFLOAD,
    DSH_OFFLOAD_PREFIX,
    applyImageOffloadPass,
    imageOffloadCount,
    imageOffloads,
    isDshOffloadPlaceholder,
    isImageOffloaded,
    offloadPlaceholder,
    resolveImageOffloadSettings,
    restoreImageOffload,
    storeEffectiveImageOffload,
    type ImageOffloadSettings,
} from "../src/image-offload.ts";
import { getSession, type Session } from "../src/session.ts";

// ---------------------------------------------------------------------------
// helpers
// ---------------------------------------------------------------------------

/** A base64 payload whose DECODED length is `bytes` rounded up to a multiple
 *  of 3 (the pass measures decoded bytes: Math.ceil(len * 3 / 4), which is
 *  exact only when the payload length is a multiple of 3). */
function imgB64(bytes: number): string {
    return Buffer.alloc(Math.ceil(bytes / 3) * 3, 7).toString("base64");
}

interface AnthropicImgSource { type: string; media_type: string; data: string }
interface AnthropicImgBlock { type: string; source: AnthropicImgSource; text?: string }

function antMsg(id: string, bytes: number): BiliMessage {
    return {
        id,
        role: "user",
        contentType: "text",
        text: "",
        rawAnthropicBlock: {
            type: "image",
            source: { type: "base64", media_type: "image/png", data: imgB64(bytes) },
        },
    } as unknown as BiliMessage;
}

function antBlock(m: BiliMessage): AnthropicImgBlock {
    return m.rawAnthropicBlock as AnthropicImgBlock;
}

function cfgFor(extra: Record<string, unknown> = {}): Config {
    return applyCompressSettings(defaultConfig(200_000), 200_000, { imageCompression: { enabled: true, ...extra } });
}

/** Session with BOTH ref maps seeded (the ref lookup in the pass reads byRaw;
 *  image_full validates against byRef) and image compression armed, so the
 *  placeholder may advertise the image_full recovery path. */
function armedSession(refs: Record<string, string>): Session {
    const s = getSession(`off-${Math.random().toString(36).slice(2)}`);
    storeEffectiveImageCompression(s, { enabled: true });
    for (const [raw, ref] of Object.entries(refs)) {
        s.state.messageRefs.byRaw[raw] = ref;
        s.state.messageRefs.byRef[ref] = raw;
    }
    return s;
}

const ROOMY: ImageOffloadSettings = { enabled: true, maxBytes: 1_000_000_000, maxImages: 10_000 };

/** `applyImageFull` refuses a ref that never carried a downscaled image, so an
 *  image_full integration test has to seed the shrink ledger the kernel reads. */
function seedShrink(s: Session, ref: string, rawId: string): void {
    s.state = recordImageShrink(s.state, {
        ref,
        rawMessageId: rawId,
        mediaType: "image/png",
        format: "webp",
        originalBytes: 40_000,
        shrunkBytes: 900,
        tokensBefore: 4_000,
        tokensAfter: 300,
        createdAt: Date.now(),
    });
}

// ---------------------------------------------------------------------------
// settings parsing / merging
// ---------------------------------------------------------------------------

test("parseCompressSettings validates imageOffload", () => {
    const ok = parseCompressSettings({
        imageOffload: { enabled: true, maxBytes: 1024, maxImages: 5, byteQuantum: 512, countQuantum: 2 },
    });
    assert.ok(ok);
    assert.deepEqual(ok.imageOffload, { enabled: true, maxBytes: 1024, maxImages: 5, byteQuantum: 512, countQuantum: 2 });
    // enabled must be a real boolean (a truthy string is NOT accepted).
    assert.equal(parseCompressSettings({ imageOffload: { enabled: "yes" } }), undefined);
    assert.equal(parseCompressSettings({ imageOffload: { maxBytes: "1024" } }), undefined);
    assert.equal(parseCompressSettings({ imageOffload: { maxBytes: Number.NaN } }), undefined);
    // Budgets must be strictly positive — 0 would mean "offload everything",
    // which is never what a config typo meant.
    assert.equal(parseCompressSettings({ imageOffload: { maxBytes: 0 } }), undefined);
    assert.equal(parseCompressSettings({ imageOffload: { maxImages: -1 } }), undefined);
    assert.equal(parseCompressSettings({ imageOffload: [] }), undefined);
    // Absent key parses fine and yields no imageOffload block.
    assert.equal(parseCompressSettings({}).imageOffload, undefined);
});

test("mergeCompress merges imageOffload sub-field-wise across levels", () => {
    const out = mergeCompress(
        { imageOffload: { enabled: true, maxBytes: 4096 } },
        undefined,
        { imageOffload: { maxImages: 3 } },
    );
    assert.deepEqual(out.imageOffload, { enabled: true, maxBytes: 4096, maxImages: 3 });
});

test("resolveImageOffloadSettings: off unless explicitly enabled, defaults mirror the DeepSeek route", () => {
    assert.deepEqual(resolveImageOffloadSettings(undefined), DEFAULT_IMAGE_OFFLOAD);
    assert.equal(resolveImageOffloadSettings(undefined).enabled, false);
    assert.equal(resolveImageOffloadSettings({ enabled: false, maxBytes: 1 }).enabled, false);
    // DEFAULTS: 20 MiB inline / 600 occurrences, 10 MiB + 20-count removal
    // quanta — deliberately identical to dsh-llm-deepseek so both layers agree
    // on when a request is over budget.
    assert.deepEqual(DEFAULT_IMAGE_OFFLOAD, {
        enabled: false,
        maxBytes: 20 * 1024 * 1024,
        maxImages: 600,
        byteQuantum: 10 * 1024 * 1024,
        countQuantum: 20,
    });
    assert.equal(resolveImageOffloadSettings({ enabled: true, maxImages: 3 }).maxImages, 3);
    assert.equal(resolveImageOffloadSettings({ enabled: true, maxImages: 3 }).maxBytes, 20 * 1024 * 1024);
});

// ---------------------------------------------------------------------------
// placeholder vocabulary (DSH compatibility contract)
// ---------------------------------------------------------------------------

test("placeholder text keeps DSH's vocabulary and adds the image_full handle", () => {
    const text = offloadPlaceholder("m00042", true);
    assert.ok(text.startsWith("[image omitted to fit request image limits;"));
    assert.ok(text.includes("m00042."));
    assert.ok(text.includes("No local normalized image path is available; ask the user to attach it again if needed."));
    assert.ok(text.includes('call image_full with ref "m00042"'));
    assert.ok(text.endsWith("]"));
    // Without a live restore channel the recovery sentence must NOT be promised.
    const plain = offloadPlaceholder("m00042", false);
    assert.ok(!plain.includes("image_full"));
    assert.ok(plain.includes("No local normalized image path is available"));
    // Recognition works for BOTH layers: ours, and DSH's own (which never
    // carries our recovery sentence).
    assert.equal(isDshOffloadPlaceholder(text), true);
    assert.equal(isDshOffloadPlaceholder(plain), true);
    assert.equal(isDshOffloadPlaceholder(`[${DSH_OFFLOAD_PREFIX} m1. ]`), true);
    assert.equal(isDshOffloadPlaceholder("just a normal user message"), false);
});

// ---------------------------------------------------------------------------
// the pass
// ---------------------------------------------------------------------------

test("disabled ⇒ byte-identical pass-through", () => {
    const s = armedSession({ r1: "m00001" });
    const msgs = [antMsg("r1", 900)];
    const before = antBlock(msgs[0]).source.data;
    assert.equal(applyImageOffloadPass(s, msgs, { settings: { enabled: false, maxBytes: 1 } }), 0);
    assert.equal(antBlock(msgs[0]).type, "image");
    assert.equal(antBlock(msgs[0]).source.data, before);
    // No settings at all behaves the same (the feature is opt-in).
    assert.equal(applyImageOffloadPass(s, msgs, { settings: undefined }), 0);
    assert.equal(antBlock(msgs[0]).type, "image");
    assert.equal(s.stats.imageOffloadedCount, undefined);
});

test("count budget: offloads the oldest prefix, quantized, and demotes the raw carrier", () => {
    const refs: Record<string, string> = {};
    for (let i = 1; i <= 5; i += 1) refs[`r${i}`] = `m0000${i}`;
    const s = armedSession(refs);
    const msgs = [1, 2, 3, 4, 5].map((i) => antMsg(`r${i}`, 900));

    // maxImages 2 over 5 occurrences ⇒ excess 3; countQuantum 1 ⇒ exactly 3.
    const added = applyImageOffloadPass(s, msgs, { settings: { ...ROOMY, maxImages: 2, countQuantum: 1, byteQuantum: 1_000_000_000 } });
    assert.equal(added, 3);
    assert.equal(imageOffloads(s).length, 3);
    assert.equal(imageOffloadCount(s), 3);
    assert.equal(s.stats.imageOffloadedCount, 3);
    assert.equal(s.stats.imageBytesOffloaded, 3 * 900);

    // Oldest three demoted to text; the two newest keep their image bytes.
    for (let i = 0; i < 3; i += 1) {
        const block = antBlock(msgs[i]);
        assert.equal(block.type, "text", `message ${i} should be a text block`);
        assert.ok(block.text!.includes(`m0000${i + 1}`));
        assert.equal(isDshOffloadPlaceholder(block.text!), true);
        assert.equal(msgs[i].text, block.text);
        assert.equal((block as unknown as { source?: unknown }).source, undefined);
    }
    for (let i = 3; i < 5; i += 1) {
        assert.equal(antBlock(msgs[i]).type, "image");
        assert.equal(antBlock(msgs[i]).source.type, "base64");
    }
    // Records name the OLDEST three refs, in order.
    assert.deepEqual(imageOffloads(s).map((r) => r.ref), ["m00001", "m00002", "m00003"]);
    for (const ref of ["m00001", "m00002", "m00003"]) assert.equal(isImageOffloaded(s, ref), true);
    assert.equal(isImageOffloaded(s, "m00005"), false);
});

test("byte budget: removal is quantized up past the excess", () => {
    const refs: Record<string, string> = {};
    for (let i = 1; i <= 5; i += 1) refs[`r${i}`] = `m0000${i}`;
    const s = armedSession(refs);
    const msgs = [1, 2, 3, 4, 5].map((i) => antMsg(`r${i}`, 900));

    // total 4500B, budget 2000B ⇒ excess 2500B; quantum 1000 ⇒ remove 3000B
    // ⇒ 4 occurrences of 900B (3600B) since 3 would only reach 2700B… which is
    // already ≥ 3000 minus one step, so 3 suffice: 2700 < 3000 ⇒ 4.
    const added = applyImageOffloadPass(s, msgs, {
        settings: { enabled: true, maxBytes: 2000, maxImages: 10_000, byteQuantum: 1000, countQuantum: 1_000_000 },
    });
    assert.equal(added, 4);
    assert.equal(imageOffloadCount(s), 4);
    assert.equal(antBlock(msgs[4]).type, "image");
    assert.equal(antBlock(msgs[3]).type, "text");
});

test("REGRESSION: a rebuilt message list re-emits every recorded placeholder", () => {
    // This is the failure mode the first draft had: `messages` is rebuilt from
    // the durable history on EVERY request, so the raw carriers arrive bearing
    // the original image bytes again. Skipping already-recorded refs would make
    // the placeholder vanish on request #2 and put every image back on the wire.
    const refs: Record<string, string> = {};
    for (let i = 1; i <= 4; i += 1) refs[`r${i}`] = `m0000${i}`;
    const s = armedSession(refs);
    const settings: ImageOffloadSettings = { ...ROOMY, maxImages: 1, countQuantum: 1, byteQuantum: 1_000_000_000 };

    const first = [1, 2, 3, 4].map((i) => antMsg(`r${i}`, 900));
    assert.equal(applyImageOffloadPass(s, first, { settings }), 3);
    assert.equal(imageOffloadCount(s), 3);

    // Second request: brand-new message objects carrying the ORIGINAL bytes.
    const second = [1, 2, 3, 4].map((i) => antMsg(`r${i}`, 900));
    const added = applyImageOffloadPass(s, second, { settings });
    assert.equal(added, 0, "no NEW refs, but the placeholders must still be applied");
    assert.equal(antBlock(second[0]).type, "text");
    assert.equal(antBlock(second[1]).type, "text");
    assert.equal(antBlock(second[2]).type, "text");
    assert.equal(antBlock(second[3]).type, "image");
    // Counters are DERIVED, so a re-run does not inflate them.
    assert.equal(imageOffloadCount(s), 3);
    assert.equal(s.stats.imageOffloadedCount, 3);
    assert.equal(s.stats.imageBytesOffloaded, 3 * 900);
    assert.equal(imageOffloads(s).length, 3);
});

test("determinism: the same history yields byte-identical wire text (prefix-cache invariant)", () => {
    const refs: Record<string, string> = {};
    for (let i = 1; i <= 4; i += 1) refs[`r${i}`] = `m0000${i}`;
    const s = armedSession(refs);
    const settings: ImageOffloadSettings = { ...ROOMY, maxImages: 1, countQuantum: 1, byteQuantum: 1_000_000_000 };
    const wire = (msgs: BiliMessage[]) => msgs.map((m) => JSON.stringify(m.rawAnthropicBlock)).join("|");

    const a = [1, 2, 3, 4].map((i) => antMsg(`r${i}`, 900));
    applyImageOffloadPass(s, a, { settings });
    const b = [1, 2, 3, 4].map((i) => antMsg(`r${i}`, 900));
    applyImageOffloadPass(s, b, { settings });
    assert.equal(wire(b), wire(a));

    // Growing the history may select MORE of the tail, but a placeholder that
    // was already emitted must stay byte-identical forever — that is the part
    // of the request the provider can still serve from cache.
    const c = [1, 2, 3, 4, 5].map((i) => antMsg(`r${i}`, 900));
    s.state.messageRefs.byRaw["r5"] = "m00005";
    s.state.messageRefs.byRef["m00005"] = "r5";
    applyImageOffloadPass(s, c, { settings });
    const head = (msgs: BiliMessage[]) => msgs.slice(0, 3).map((m) => JSON.stringify(m.rawAnthropicBlock)).join("|");
    assert.equal(head(c), head(a));
    assert.equal(imageOffloadCount(s), 4, "the wider history does offload one more occurrence");
});

test("never throws: a slot whose carrier cannot be rewritten is passed through", () => {
    const s = armedSession({ r1: "m00001" });
    const m = antMsg("r1", 900);
    // Frozen message ⇒ the in-place `rawAnthropicBlock = …` / `text = …` writes
    // throw under ESM strict mode; the pass must swallow it and move on.
    Object.freeze(m);
    const added = applyImageOffloadPass(s, [m], { settings: { enabled: true, maxBytes: 1, maxImages: 1, byteQuantum: 1, countQuantum: 1 } });
    assert.equal(added, 0);
    assert.equal(imageOffloads(s).length, 0);
});

test("messages without a ref, or whose ref is already image_full-restored, are skipped", () => {
    const s = armedSession({ r1: "m00001", r2: "m00002" });
    const cfg = cfgFor();
    // No ref mapping for r3.
    const noRef = antMsg("r3", 900);
    const restored = antMsg("r1", 900);
    seedShrink(s, "m00001", "r1");
    executeImageFull({ ref: "m00001" }, s, cfg);
    const live = antMsg("r2", 900);
    const added = applyImageOffloadPass(s, [noRef, restored, live], {
        settings: { enabled: true, maxBytes: 1, maxImages: 1, byteQuantum: 1, countQuantum: 1 },
    });
    // Only r2 was eligible at all.
    assert.equal(added, 1);
    assert.equal(antBlock(noRef).type, "image");
    assert.equal(antBlock(restored).type, "image", "an explicit restore outranks the budget");
    assert.equal(antBlock(live).type, "text");
});

test("image_full retires the offload record and restores the counters", () => {
    const refs: Record<string, string> = {};
    for (let i = 1; i <= 3; i += 1) refs[`r${i}`] = `m0000${i}`;
    const s = armedSession(refs);
    const settings: ImageOffloadSettings = { ...ROOMY, maxImages: 1, countQuantum: 1, byteQuantum: 1_000_000_000 };
    applyImageOffloadPass(s, [1, 2, 3].map((i) => antMsg(`r${i}`, 900)), { settings });
    assert.equal(imageOffloadCount(s), 2);

    seedShrink(s, "m00001", "r1");
    const out = executeImageFull({ ref: "m00001" }, s, cfgFor());
    assert.ok(!out.startsWith("[image_full FAILED"));
    assert.equal(isImageOffloaded(s, "m00001"), false);
    assert.deepEqual(imageOffloads(s).map((r) => r.ref), ["m00002"]);
    assert.equal(imageOffloadCount(s), 1);
    assert.equal(s.stats.imageOffloadedCount, 1);
    assert.equal(s.stats.imageBytesOffloaded, 900);

    // A ref that was never offloaded reports no change.
    assert.equal(restoreImageOffload(s, "m09999"), false);
    assert.equal(restoreImageOffload(undefined, "m00001"), false);
});

test("restorable=false (image compression off) omits the recovery promise", () => {
    const s = getSession(`off-plain-${Math.random().toString(36).slice(2)}`);
    s.state.messageRefs.byRaw["r1"] = "m00001";
    s.state.messageRefs.byRef["m00001"] = "r1";
    const msgs = [antMsg("r1", 900)];
    applyImageOffloadPass(s, msgs, { settings: { enabled: true, maxBytes: 1, maxImages: 1, byteQuantum: 1, countQuantum: 1 } });
    const text = antBlock(msgs[0]).text!;
    assert.equal(isDshOffloadPlaceholder(text), true);
    assert.ok(!text.includes("image_full"));
});

// ---------------------------------------------------------------------------
// all four protocol carriers
// ---------------------------------------------------------------------------

test("every protocol carrier is demoted to a text block in place", () => {
    const s = armedSession({
        a1: "m00001", o1: "m00002", o2: "m00003", s1: "m00004", g1: "m00005",
    });
    const b64 = imgB64(900);
    const dataUrl = `data:image/png;base64,${b64}`;

    const anthropic = {
        id: "a1", role: "user", contentType: "text", text: "",
        rawAnthropicBlock: { type: "image", source: { type: "base64", media_type: "image/png", data: b64 } },
    } as unknown as BiliMessage;
    const openaiParts = {
        id: "o1", role: "user", contentType: "text", text: "",
        rawOpenaiContentParts: [{ type: "image_url", image_url: { url: dataUrl } }],
    } as unknown as BiliMessage;
    const openaiString = {
        id: "o2", role: "user", contentType: "text", text: "",
        rawOpenaiContent: dataUrl, imageBase64: b64, imageMediaType: "image/png",
    } as unknown as BiliMessage;
    const responses = {
        id: "s1", role: "user", contentType: "text", text: "",
        rawResponsesItem: { content: [{ type: "input_image", image_url: dataUrl }] },
    } as unknown as BiliMessage;
    const google = {
        id: "g1", role: "user", contentType: "text", text: "",
        rawGoogleParts: [{ inlineData: { data: b64, mimeType: "image/png" } }],
    } as unknown as BiliMessage;

    const msgs = [anthropic, openaiParts, openaiString, responses, google];
    // Budget admits none of them.
    const added = applyImageOffloadPass(s, msgs, {
        settings: { enabled: true, maxBytes: 1, maxImages: 0, byteQuantum: 1, countQuantum: 1 },
    });
    assert.equal(added, 5);

    const aBlock = anthropic.rawAnthropicBlock as Record<string, unknown>;
    assert.deepEqual(Object.keys(aBlock).sort(), ["text", "type"]);
    assert.equal(aBlock.type, "text");

    const oPart = (openaiParts.rawOpenaiContentParts as Record<string, unknown>[])[0];
    assert.equal(oPart.type, "text");
    assert.equal(oPart.image_url, undefined);
    assert.ok(typeof oPart.text === "string" && isDshOffloadPlaceholder(oPart.text as string));

    assert.equal(typeof openaiString.rawOpenaiContent, "object");
    assert.equal((openaiString.rawOpenaiContent as Record<string, unknown>).type, "text");
    assert.equal((openaiString as unknown as { imageBase64?: string }).imageBase64, undefined);
    assert.equal((openaiString as unknown as { imageMediaType?: string }).imageMediaType, undefined);

    const rPart = ((responses.rawResponsesItem as Record<string, unknown>).content as Record<string, unknown>[])[0];
    assert.equal(rPart.type, "input_text");
    assert.equal(rPart.image_url, undefined);

    const gPart = (google.rawGoogleParts as Record<string, unknown>[])[0];
    assert.equal(gPart.inlineData, undefined);
    assert.equal(typeof gPart.text, "string");
    assert.deepEqual(Object.keys(gPart), ["text"]);

    // The core `text` mirror is kept in step only for the carriers where the
    // image IS the message text (anthropic blocks, bare openai content); for
    // part-array protocols the placeholder lives on the part, never on the
    // message, so real text is not clobbered.
    assert.equal(isDshOffloadPlaceholder(anthropic.text as string), true);
    assert.equal(isDshOffloadPlaceholder(openaiString.text as string), true);
    assert.equal(openaiParts.text, "");
    assert.equal(responses.text, "");
    assert.equal(google.text, "");
});

test("a multi-image message is offloaded all-or-nothing and counted per occurrence", () => {
    const s = armedSession({ r1: "m00001" });
    const m = {
        id: "r1", role: "user", contentType: "text", text: "",
        rawOpenaiContentParts: [
            { type: "image_url", image_url: { url: `data:image/png;base64,${imgB64(600)}` } },
            { type: "image_url", image_url: { url: `data:image/png;base64,${imgB64(700)}` } },
        ],
    } as unknown as BiliMessage;
    // Budget of 1 count with 2 occurrences ⇒ the ref is selected; BOTH of its
    // images must go (half-offloading a message would desync record and wire).
    const added = applyImageOffloadPass(s, [m], {
        settings: { enabled: true, maxBytes: 1_000_000, maxImages: 1, byteQuantum: 1_000_000, countQuantum: 1 },
    });
    assert.equal(added, 1, "one ref, recorded once");
    assert.equal(imageOffloads(s).length, 1);
    assert.equal(imageOffloads(s)[0].occurrences, 2);
    assert.equal(imageOffloadCount(s), 2, "but two occurrences are gone");
    assert.equal(s.stats.imageBytesOffloaded, 600 + 702);
    for (const p of m.rawOpenaiContentParts as Record<string, unknown>[]) assert.equal(p.type, "text");
});

test("stored effective settings drive imageOffloadEnabled", () => {
    const s = getSession(`off-store-${Math.random().toString(36).slice(2)}`);
    storeEffectiveImageOffload(s, undefined);
    assert.equal(resolveImageOffloadSettings(undefined).enabled, false);
    storeEffectiveImageOffload(s, { enabled: true, maxBytes: 5 });
    assert.equal(resolveImageOffloadSettings(s.metadata.effectiveImageOffload as ImageOffloadSettings).maxBytes, 5);
});
