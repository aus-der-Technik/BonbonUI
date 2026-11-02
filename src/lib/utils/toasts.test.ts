import { ToastQueue } from './toasts.svelte';

describe('ToastQueue', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('pushes, expires and dismisses toasts', () => {
    const queue = new ToastQueue(1000);
    const a = queue.push('saved');
    queue.push('careful', 'warn', 0);
    expect(queue.items.map((t) => t.tone)).toEqual(['ok', 'warn']);

    vi.advanceTimersByTime(1000);
    expect(queue.items.map((t) => t.message)).toEqual(['careful']);

    queue.dismiss(a); // already gone: a no-op
    queue.clear();
    expect(queue.items).toEqual([]);
  });
});
