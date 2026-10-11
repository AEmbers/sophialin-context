// Image OFFLOAD at the forward boundary — the proxy-side backstop for DSH's
// own compaction-image-offload plugin.
//
// Why this has to live in the proxy (field finding, 2026-10-11):
// `@deepseek-ai/dsh-compaction-image-offload` acts ONLY on an
// `IMAGE_OFFLOAD_REQUIRED` failure that carries a positive `offloadImages`
// count, and that failure is raised by DSH's *own* adapter (dsh-llm-deepseek
// / dsh-llm-pi-ai) from a route byte budget. On a proxied session the
// over-budget request never comes back in that shape: either this proxy
// converts it into its own `502 preflight_compress_failed`, or the upstream
// rejects it with a plain `400 prompt_too_long`. Neither carries
// `offloadImages`, so DSH's offload never fires and images only accumulate —
// one measured session reached 573 unique images / ~856 MiB of attachments
// while its offload counter sat at a stale 180.
//
// This proxy is the last component that sees both the real request and the
// real upstream rejection, so the removal is executed here.
//
// COMPATIBILITY CONTRACT: the placeholder text is byte-identical to DSH's
// `offloadedImageText` (dsh-llm/lib/types/content.js:73) for its first
// sentence and its no-access tail, so a model that has learned one vocabulary
// reads both layers the same way, and `isDshOffloadPlaceholder` recognizes a
// placeholder whichever layer produced it. sophialin appends one extra sentence
// naming the `image_full` recovery ref, because unlike DSH it keeps the
// original bytes cached for the life of the session.
//
// Determinism is load-bearing (same invariant as image-compress): the
// occurrence set is rebuilt from durable session state on every request and
// the oldest-first selection is byte-quantized, so repeated requests with the
// same history offload exactly the same occurrences and the provider prefix
// cache survives.

import { isImageFullRestored } from "acp-kernel";
import type { BiliMessage } from "acp-kernel/wire";
import { imageCompressionEnabled, imageSlots, type ImageSlot } from "./image-compress.js";
import { log as loggerLog } from "./logger.js";
import type { Session } from "./session.js";

type LogFn = (level: "info" | "warn" | "error", msg: string) => void;

/** First sentence of DSH's `offloadedImageText` — the recognition key. Kept as
 *  a bare string so a placeholder survives any round-tripping that re-wraps
 *  the surrounding brackets. */
export const DSH_OFFLOAD_PREFIX = "image omitted to fit request image limits;";

/** DSH's no-access tail, verbatim. */
const NO_ACCESS_TAIL = "No local normalized image path is available; ask the user to attach it again if needed.";

/** Byte/count budgets and removal quanta. Defaults mirror the DeepSeek route
 *  in dsh-llm-deepseek (`DEFAULT_MAX_INLINE_REQUEST_IMAGE_BYTES`,
 *  `maxImagesPerRequest`, `inlineImageOffloadByteQuantum`,
 *  `imageOffloadCountQuantum`) so the proxy and DSH agree on when a request is
 *  over budget. */
export interface ImageOffloadSettings {
    /** Off unless explicitly enabled at some level. Disabled ⇒ byte-identical
     *  pass-through, exactly like imageCompression. */
    enabled?: boolean;
    /** Total INLINE image bytes (decoded, not base64 length) a request may
     *  carry before the oldest occurrences are offloaded. Default 20 MiB. */
    maxBytes?: number;
    /** Total image occurrences a request may carry. Default 600. */
    maxImages?: number;
    /** Byte removal step: always drop enough occurrences to clear a whole
     *  quantum past the excess. Default 10 MiB. */
    byteQuantum?: number;
    /** Count removal step. Default 20. */
    countQuantum?: number;
}

export interface ResolvedImageOffloadSettings {
    enabled: boolean;
    maxBytes: number;
    maxImages: number;
    byteQuantum: number;
    countQuantum: number;
}

export const DEFAULT_IMAGE_OFFLOAD: ResolvedImageOffloadSettings = {
    enabled: false,
    maxBytes: 20 * 1024 * 1024,
    maxImages: 600,
    byteQuantum: 10 * 1024 * 1024,
    countQuantum: 20,
};

/** One offloaded occurrence, recorded on the session for idempotency, for the
 *  `image_full` refusal path, and for the usage suffix. */
export interface ImageOffloadRecord {
    ref: string;
    rawMessageId: string;
    mediaType: string;
    /** Decoded byte length of the payload that was removed. */
    bytes: number;
    /** Image occurrences this one ref contributed (a message may carry more
     *  than one image; dropping a ref drops all of them at once). */
    occurrences: number;
    createdAt: number;
}

const EFFECTIVE_IMAGE_OFFLOAD_KEY = "effectiveImageOffload";

export function resolveImageOffloadSettings(settings: ImageOffloadSettings | undefined): ResolvedImageOffloadSettings {
    if (!settings || settings.enabled !== true) return DEFAULT_IMAGE_OFFLOAD;
    return {
        enabled: true,
        maxBytes: settings.maxBytes ?? DEFAULT_IMAGE_OFFLOAD.maxBytes,
        maxImages: settings.maxImages ?? DEFAULT_IMAGE_OFFLOAD.maxImages,
        byteQuantum: settings.byteQuantum ?? DEFAULT_IMAGE_OFFLOAD.byteQuantum,
        countQuantum: settings.countQuantum ?? DEFAULT_IMAGE_OFFLOAD.countQuantum,
    };
}

/** Stamp the last-resolved offload policy onto the session (per-request;
 *  mirrors storeEffectiveImageCompression). */
export function storeEffectiveImageOffload(session: Session, settings: ImageOffloadSettings | undefined): void {
    session.metadata[EFFECTIVE_IMAGE_OFFLOAD_KEY] = settings ?? null;
}

export function effectiveImageOffload(session: Session | undefined): ImageOffloadSettings | undefined {
    const meta = session?.metadata[EFFECTIVE_IMAGE_OFFLOAD_KEY];
    if (meta && typeof meta === "object" && typeof (meta as ImageOffloadSettings).enabled === "boolean") {
        return meta as ImageOffloadSettings;
    }
    return undefined;
}

export function imageOffloadEnabled(session: Session | undefined): boolean {
    return resolveImageOffloadSettings(effectiveImageOffload(session)).enabled === true;
}

/** True for a placeholder emitted by either layer. */
export function isDshOffloadPlaceholder(text: string): boolean {
    return typeof text === "string" && text.includes(DSH_OFFLOAD_PREFIX);
}

/** DSH-compatible placeholder for one removed occurrence. `ref` is sophialin's own
 *  message ref (mNNNNN), which doubles as the `image_full` handle. */
export function offloadPlaceholder(ref: string, restorable: boolean): string {
    const identity = `${DSH_OFFLOAD_PREFIX} ${ref}. ${NO_ACCESS_TAIL}`;
    const recovery = restorable
        ? ` The original bytes are still cached for this session: call image_full with ref "${ref}" to restore them.`
        : "";
    return `[${identity}${recovery}]`;
}

/** Occurrences already offloaded for this session. */
export function imageOffloads(session: Session | undefined): ImageOffloadRecord[] {
    return session?.imageOffloads ?? [];
}

export function isImageOffloaded(session: Session | undefined, ref: string): boolean {
    return imageOffloads(session).some((r) => r.ref === ref);
}

/** Image OCCURRENCES removed so far (a ref may have carried several). */
export function imageOffloadCount(session: Session | undefined): number {
    return imageOffloads(session).reduce((sum, r) => sum + (r.occurrences ?? 1), 0);
}

/** Drop the offload record for a ref restored via `image_full`. The standing
 *  state that actually re-emits the bytes is `isImageFullRestored` (the pass
 *  skips restored refs), so this is bookkeeping: without it the count and the
 *  usage suffix would keep claiming an occurrence that is back on the wire. */
export function restoreImageOffload(session: Session | undefined, ref: string): boolean {
    const records = session?.imageOffloads;
    if (!records) return false;
    const kept = records.filter((r) => r.ref !== ref);
    if (kept.length === records.length) return false;
    session!.imageOffloads = kept;
    // Counters are derived — keep them in step with the retired record.
    session!.stats.imageOffloadedCount = imageOffloadCount(session);
    session!.stats.imageBytesOffloaded = kept.reduce((sum, r) => sum + r.bytes, 0);
    return true;
}

interface Occurrence {
    message: BiliMessage;
    ref: string;
    slot: ImageSlot;
    bytes: number;
}

/** Decoded byte length of a base64 payload (matches image-compress's
 *  `Math.ceil(b64.length * 3 / 4)` convention so the two layers agree on
 *  what a payload weighs). */
function decodedBytes(b64: string): number {
    return Math.ceil(b64.length * 3 / 4);
}

/** How many of the oldest occurrences must go, in whole quanta past the
 *  excess. Mirrors dsh-llm's `offloadedImagePrefixCount` so both layers pick
 *  the same prefix. */
function prefixCount(excessCount: number, excessBytes: number, lengths: number[], cfg: ResolvedImageOffloadSettings): number {
    if (excessCount === 0 && excessBytes === 0) return 0;
    const removeCount = excessCount === 0 ? 0 : Math.ceil(excessCount / cfg.countQuantum) * cfg.countQuantum;
    const removeBytes = excessBytes === 0 ? 0 : Math.ceil(excessBytes / cfg.byteQuantum) * cfg.byteQuantum;
    let count = 0;
    let removedBytes = 0;
    for (const bytes of lengths) {
        const byteTargetMet = removeBytes === 0 || removedBytes >= removeBytes;
        if (count >= removeCount && byteTargetMet) break;
        removedBytes += bytes;
        count += 1;
    }
    return count;
}

/** Arrival-time OFFLOAD pass over the prepared message list. Walks image
 *  occurrences oldest-first, and once the request's inline image budget is
 *  exceeded, demotes the leading occurrences to DSH-compatible placeholder
 *  text by mutating their raw carriers in place. Idempotent and deterministic:
 *  re-running on the same history selects the same occurrences, so the wire
 *  bytes stay stable. Never throws (per-occurrence catch → pass-through). */
export function applyImageOffloadPass(
    session: Session,
    messages: BiliMessage[],
    opts: { settings: ImageOffloadSettings | undefined; log?: LogFn },
): number {
    const cfg = resolveImageOffloadSettings(opts.settings);
    if (!cfg.enabled) return 0;
    const log: LogFn = opts.log ?? ((level, msg) => loggerLog(level, msg));

    const occ: Occurrence[] = [];
    for (const m of messages) {
        if (typeof m.id !== "string") continue;
        const ref = session.state.messageRefs.byRaw[m.id];
        if (!ref) continue;
        // An explicit image_full restore outranks the budget: the user asked for
        // these bytes back, never fight it (same rule as applyImageCompressionPass).
        if (isImageFullRestored(session.state, ref)) continue;
        for (const slot of imageSlots(m)) {
            occ.push({ message: m, ref, slot, bytes: decodedBytes(slot.b64) });
        }
    }
    if (occ.length === 0) return 0;

    const records = session.imageOffloads ?? [];
    const recorded = new Set(records.map((r) => r.ref));
    const total = occ.reduce((sum, o) => sum + o.bytes, 0);
    const excessCount = Math.max(0, occ.length - cfg.maxImages);
    const excessBytes = Math.max(0, total - cfg.maxBytes);
    const n = prefixCount(excessCount, excessBytes, occ.map((o) => o.bytes), cfg);

    // A ref can own several occurrences (a message may carry more than one
    // image) and a ref is all-or-nothing — dropping half of a message's images
    // would leave the record and the wire disagreeing — so the prefix is first
    // resolved to a SET OF REFS, and every occurrence of a selected ref goes.
    const selected = new Set<string>(recorded);
    for (let i = 0; i < n && i < occ.length; i += 1) selected.add(occ[i].ref);

    // Every selected ref is RE-APPLIED, not just the newly added ones:
    // `messages` is rebuilt from the durable history on each request and the
    // raw carriers arrive carrying the original bytes again, so the placeholder
    // has to be re-emitted every pass. The offload SET only ever grows (a ref
    // leaves it only via image_full), which keeps the wire text a stable prefix
    // of the previous request's wire text — the prefix-cache invariant.
    const restorable = imageCompressionEnabled(session);
    const fresh = new Map<string, ImageOffloadRecord>();
    for (const o of occ) {
        if (!selected.has(o.ref)) continue;
        try {
            o.slot.offload(offloadPlaceholder(o.ref, restorable));
        } catch (err) {
            log("warn", `[${session.id}] image offload failed for ${o.ref}: ${String(err)} — passing through`);
            continue;
        }
        if (recorded.has(o.ref)) continue;
        const prev = fresh.get(o.ref);
        if (prev) {
            prev.bytes += o.bytes;
            prev.occurrences += 1;
            continue;
        }
        fresh.set(o.ref, {
            ref: o.ref,
            rawMessageId: o.message.id as string,
            mediaType: o.slot.mediaType,
            bytes: o.bytes,
            occurrences: 1,
            createdAt: Date.now(),
        });
    }
    for (const rec of fresh.values()) {
        if (!session.imageOffloads) session.imageOffloads = [];
        session.imageOffloads.push(rec);
        log("info", `[acp-image-offload] ${rec.ref}: dropped ${rec.bytes}B image (${n} oldest of ${occ.length} occurrences, total ${total}B > ${cfg.maxBytes}B)`);
    }
    // DERIVED, never incremented: the pass re-runs on every request, so an
    // accumulator would multiply-count. Deriving also makes the counters
    // restart-safe and lets image_full decrement them for free.
    session.stats.imageOffloadedCount = imageOffloadCount(session);
    session.stats.imageBytesOffloaded = imageOffloads(session).reduce((sum, r) => sum + r.bytes, 0);
    return fresh.size;
}
