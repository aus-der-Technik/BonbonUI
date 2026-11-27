export interface PollOptions<T> {
    /** Milliseconds between checks. */
    interval: number;
    /** Stop when this returns true for the latest result. */
    until: (result: T) => boolean;
    /** Give up after this many milliseconds (rejects); 0 polls forever. */
    timeout?: number;
    /** Called with every result, including the final one. */
    onupdate?: (result: T) => void;
    /** Stops a poll early when the hidden page should not keep working (rejects with AbortError). */
    signal?: AbortSignal;
}
/**
 * Calls `check` every `interval` ms until `until(result)` holds, then resolves with that result.
 * A failing check rejects. The first check runs immediately.
 */
export declare function poll<T>(check: () => Promise<T>, options: PollOptions<T>): Promise<T>;
/**
 * Runs `task` every `interval` ms until the returned stop function is called, e.g. to refresh a
 * list. Skips runs while the tab is hidden and runs once when it becomes visible again.
 */
export declare function every(task: () => void, interval: number): () => void;
