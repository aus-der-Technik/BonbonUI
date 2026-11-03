// A tiny reactive toast queue for <Toaster>. Kept outside the component so any module of the
// app (a save handler, a socket listener) can push without prop drilling.
//
// What a toast is for: news from the background (a sync finished, a teammate shared a file),
// and the outcome of an action whose own control has gone (a deleted row, a closed dialog) —
// then offer the way back with an `action` ("Undo"). Feedback for a control that is still on
// screen belongs at that control, not in a corner.

export type ToastTone = 'ok' | 'warn' | 'error';

/** A button on the toast, e.g. "Undo"; the toast closes after it ran. */
export interface ToastAction {
  label: string;
  onaction: () => void;
}

export interface ToastItem {
  id: number;
  tone: ToastTone;
  message: string;
  action?: ToastAction | undefined;
}

export interface ToastOptions {
  /** ms until it goes; 0 keeps it until dismissed. Errors always stay. */
  duration?: number | undefined;
  action?: ToastAction | undefined;
}

interface Timer {
  handle: ReturnType<typeof setTimeout> | undefined;
  remaining: number;
  started: number;
}

export class ToastQueue {
  items = $state<ToastItem[]>([]);
  #next = 1;
  #paused = false;
  // Timer handles only; nothing renders from them.
  // eslint-disable-next-line svelte/prefer-svelte-reactivity
  #timers = new Map<number, Timer>();

  constructor(private readonly duration = 4000) {}

  /**
   * Shows a toast; it disappears after `duration` ms (0 keeps it until dismissed). An `error`
   * never goes on its own: the reader must get to it. The countdown pauses while the pointer or
   * focus is on the stack (`pause` / `resume`, which Toaster calls).
   */
  push(
    message: string,
    tone: ToastTone = 'ok',
    options: number | ToastOptions = this.duration,
  ): number {
    const { duration = this.duration, action } =
      typeof options === 'number' ? { duration: options, action: undefined } : options;
    const id = this.#next++;
    this.items = [...this.items, { id, tone, message, ...(action ? { action } : {}) }];
    if (duration > 0 && tone !== 'error') {
      const timer: Timer = { handle: undefined, remaining: duration, started: 0 };
      this.#timers.set(id, timer);
      if (!this.#paused) this.#start(id, timer);
    }
    return id;
  }

  #start(id: number, timer: Timer): void {
    timer.started = Date.now();
    timer.handle = setTimeout(() => this.dismiss(id), timer.remaining);
  }

  /** Stops every countdown (pointer or focus on the stack). */
  pause(): void {
    if (this.#paused) return;
    this.#paused = true;
    const now = Date.now();
    for (const timer of this.#timers.values()) {
      if (timer.handle === undefined) continue;
      clearTimeout(timer.handle);
      timer.handle = undefined;
      timer.remaining = Math.max(0, timer.remaining - (now - timer.started));
    }
  }

  /** Continues the countdowns where they stopped. */
  resume(): void {
    if (!this.#paused) return;
    this.#paused = false;
    for (const [id, timer] of this.#timers) if (timer.handle === undefined) this.#start(id, timer);
  }

  /** Runs a toast's action, then closes it. */
  act(id: number): void {
    const item = this.items.find((t) => t.id === id);
    item?.action?.onaction();
    this.dismiss(id);
  }

  dismiss(id: number): void {
    clearTimeout(this.#timers.get(id)?.handle);
    this.#timers.delete(id);
    this.items = this.items.filter((item) => item.id !== id);
  }

  clear(): void {
    for (const timer of this.#timers.values()) clearTimeout(timer.handle);
    this.#timers.clear();
    this.items = [];
  }
}
