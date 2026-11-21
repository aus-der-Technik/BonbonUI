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
describe('ToastQueue pausing, errors and actions', () => {
    beforeEach(() => vi.useFakeTimers());
    afterEach(() => vi.useRealTimers());
    it('pauses every countdown and resumes with the time that was left', () => {
        const queue = new ToastQueue(1000);
        queue.push('a');
        vi.advanceTimersByTime(700);
        queue.pause();
        queue.pause();
        queue.push('b');
        vi.advanceTimersByTime(5000);
        expect(queue.items.map((t) => t.message)).toEqual(['a', 'b']);
        queue.resume();
        queue.resume();
        vi.advanceTimersByTime(300);
        expect(queue.items.map((t) => t.message)).toEqual(['b']);
        vi.advanceTimersByTime(700);
        expect(queue.items).toEqual([]);
    });
    it('never lets an error go on its own', () => {
        const queue = new ToastQueue(1000);
        queue.push('failed', 'error', 500);
        vi.advanceTimersByTime(60_000);
        expect(queue.items).toHaveLength(1);
    });
    it('carries an action that runs once and closes the toast', () => {
        const queue = new ToastQueue(1000);
        const onaction = vi.fn();
        const id = queue.push('Row deleted', 'ok', { action: { label: 'Undo', onaction } });
        expect(queue.items[0]?.action?.label).toBe('Undo');
        queue.push('kept', 'warn', { duration: 0 });
        queue.act(id);
        queue.act(id);
        expect(onaction).toHaveBeenCalledOnce();
        vi.advanceTimersByTime(5000);
        expect(queue.items.map((t) => t.message)).toEqual(['kept']);
    });
});
