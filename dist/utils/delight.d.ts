export interface Greeting {
    /** "Good morning" … */
    text: string;
    /** A short, optional wink for the current moment, e.g. "Almost weekend." */
    wink: string;
}
/** A time-of-day greeting with a small wink; `name` is appended when given. */
export declare function greeting(date?: Date, name?: string): Greeting;
/**
 * A tiny burst of candy sprinkles from the centre of `origin` — for a completed task, a saved
 * form, a sent message. Fixed-positioned in <body> so no container clips it; removes itself.
 * Returns the number of sprinkles thrown (0 with reduced motion or without a DOM).
 */
export declare function celebrate(origin: Element, count?: number): number;
/**
 * Svelte action: throws sprinkles whenever `when` turns truthy.
 *
 *   <button use:sprinkles={saved}>Save</button>
 */
export declare function sprinkles(node: Element, when: unknown): {
    update(next: unknown): void;
};
/** Friendly words for waiting, rotating so long waits feel alive. */
export declare const waitingLines: readonly string[];
/** Picks a waiting line that changes every `seconds` (deterministic per time slot). */
export declare function waitingLine(now?: number, seconds?: number): string;
