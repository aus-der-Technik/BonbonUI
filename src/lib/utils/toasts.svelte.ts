// A tiny reactive toast queue for <Toaster>. Kept outside the component so any module of the
// app (a save handler, a socket listener) can push without prop drilling.

export type ToastTone = 'ok' | 'warn' | 'error';

export interface ToastItem {
  id: number;
  tone: ToastTone;
  message: string;
}

export class ToastQueue {
  items = $state<ToastItem[]>([]);
  #next = 1;
  // Timer handles only; nothing renders from them.
  // eslint-disable-next-line svelte/prefer-svelte-reactivity
  #timers = new Map<number, ReturnType<typeof setTimeout>>();

  constructor(private readonly duration = 4000) {}

  /** Shows a toast; it disappears after `duration` ms (0 keeps it until dismissed). */
  push(message: string, tone: ToastTone = 'ok', duration = this.duration): number {
    const id = this.#next++;
    this.items = [...this.items, { id, tone, message }];
    if (duration > 0)
      this.#timers.set(
        id,
        setTimeout(() => this.dismiss(id), duration),
      );
    return id;
  }

  dismiss(id: number): void {
    clearTimeout(this.#timers.get(id));
    this.#timers.delete(id);
    this.items = this.items.filter((item) => item.id !== id);
  }

  clear(): void {
    for (const timer of this.#timers.values()) clearTimeout(timer);
    this.#timers.clear();
    this.items = [];
  }
}
