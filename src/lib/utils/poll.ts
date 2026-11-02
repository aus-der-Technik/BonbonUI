// Polling a background job until it settles.

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
export function poll<T>(check: () => Promise<T>, options: PollOptions<T>): Promise<T> {
  const { interval, until, timeout = 0, onupdate, signal } = options;
  const started = Date.now();
  return new Promise((resolve, reject) => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const abort = () => {
      clearTimeout(timer);
      reject(new DOMException('Polling stopped', 'AbortError'));
    };
    if (signal?.aborted) return abort();
    signal?.addEventListener('abort', abort, { once: true });
    const tick = async () => {
      try {
        const result = await check();
        if (signal?.aborted) return;
        onupdate?.(result);
        if (until(result)) {
          signal?.removeEventListener('abort', abort);
          resolve(result);
        } else if (timeout && Date.now() - started + interval > timeout) {
          reject(new Error('Polling timed out'));
        } else {
          timer = setTimeout(tick, interval);
        }
      } catch (cause) {
        reject(cause);
      }
    };
    void tick();
  });
}

/**
 * Runs `task` every `interval` ms until the returned stop function is called, e.g. to refresh a
 * list. Skips runs while the tab is hidden and runs once when it becomes visible again.
 */
export function every(task: () => void, interval: number): () => void {
  let missed = false;
  const run = () => {
    if (document.hidden) missed = true;
    else task();
  };
  const timer = setInterval(run, interval);
  const onVisible = () => {
    if (!document.hidden && missed) {
      missed = false;
      task();
    }
  };
  document.addEventListener('visibilitychange', onVisible);
  return () => {
    clearInterval(timer);
    document.removeEventListener('visibilitychange', onVisible);
  };
}
