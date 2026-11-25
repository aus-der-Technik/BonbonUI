import { flushSync } from 'svelte';
import { click, html, render, tick } from '../../test/render';
import { ToastQueue } from '../../utils/toasts.svelte';
import ConfirmDialog from './ConfirmDialog.svelte';
import Dialog from './Dialog.svelte';
import DialogFixture from './DialogFixture.test.svelte';
import Drawer from './Drawer.svelte';
import FeedbackDialog from './FeedbackDialog.svelte';
import Toaster from './Toaster.svelte';
const byText = (host, text) => [...host.querySelectorAll('button')].find((b) => b.textContent?.trim() === text);
const fire = (target, event) => {
    target?.dispatchEvent(event);
    flushSync();
};
const down = (target) => fire(target, new PointerEvent('pointerdown', { bubbles: true }));
const cancel = (dialog) => {
    const event = new Event('cancel', { cancelable: true });
    fire(dialog, event);
    return event;
};
const submit = (form) => fire(form, new Event('submit', { bubbles: true, cancelable: true }));
afterEach(() => vi.useRealTimers());
describe('Dialog: one overlay contract', () => {
    const base = { open: true, title: 'Rename', children: html('<p>body</p>') };
    it('closes from the close button, Escape and the backdrop, once per request', () => {
        vi.useFakeTimers();
        const onclose = vi.fn();
        const host = render(Dialog, { ...base, onclose });
        const dialog = host.querySelector('dialog');
        const close = host.querySelector('button[aria-label="Close"]');
        expect(close.className).toContain('btn--ghost');
        click(close);
        click(close);
        expect(onclose).toHaveBeenCalledTimes(1);
        // The browser fires cancel, then close, for one Escape: still one report.
        vi.advanceTimersByTime(1);
        expect(cancel(dialog).defaultPrevented).toBe(true);
        fire(dialog, new Event('close'));
        expect(onclose).toHaveBeenCalledTimes(2);
        vi.advanceTimersByTime(1);
        down(dialog);
        click(dialog);
        expect(onclose).toHaveBeenCalledTimes(3);
    });
    it('ignores a drag that ends on the backdrop, and the backdrop when asked to', () => {
        const onclose = vi.fn();
        const host = render(Dialog, { ...base, onclose });
        const dialog = host.querySelector('dialog');
        down(host.querySelector('.body p'));
        click(dialog);
        expect(onclose).not.toHaveBeenCalled();
        const still = render(Dialog, { ...base, onclose, closeOnBackdrop: false, closeButton: false });
        down(still.querySelector('dialog'));
        click(still.querySelector('dialog'));
        expect(onclose).not.toHaveBeenCalled();
        expect(still.querySelector('button[aria-label="Close"]')).toBeNull();
    });
    it('cannot be dismissed while not dismissible, and comes back if the browser closes it', () => {
        const onclose = vi.fn();
        const host = render(Dialog, { ...base, onclose, dismissible: false, closeLabel: 'Schließen' });
        const dialog = host.querySelector('dialog');
        expect(cancel(dialog).defaultPrevented).toBe(true);
        const close = host.querySelector('button[aria-label="Schließen"]');
        expect(close.disabled).toBe(true);
        down(dialog);
        click(dialog);
        dialog.removeAttribute('open');
        fire(dialog, new Event('close'));
        expect(onclose).not.toHaveBeenCalled();
        expect(dialog.open).toBe(true);
    });
    it('grows out of its origin and stays centred without one', () => {
        const host = render(Dialog, {
            ...base,
            onclose: () => { },
            origin: new DOMRect(100, 50, 40, 20),
        });
        const dialog = host.querySelector('dialog');
        expect(dialog.classList.contains('grow')).toBe(true);
        // No layout in happy-dom: the dialog sits at 0,0, so the origin is the trigger's centre.
        expect(dialog.style.transformOrigin).toBe('120px 60px');
        const centred = render(Dialog, { ...base, onclose: () => { } }).querySelector('dialog');
        expect(centred.classList.contains('grow')).toBe(false);
        expect(centred.style.transformOrigin).toBe('');
    });
    it('keeps its content while it shrinks back, then closes', () => {
        vi.useFakeTimers();
        const host = render(DialogFixture, { origin: new DOMRect(10, 10, 20, 20) });
        const dialog = host.querySelector('dialog');
        click(host.querySelector('.toggle'));
        expect(host.querySelector('.probe')).not.toBeNull();
        vi.advanceTimersByTime(500);
        flushSync();
        expect(dialog.hasAttribute('open')).toBe(false);
        expect(host.querySelector('.probe')).toBeNull();
        // Reopening starts fresh and visible.
        click(host.querySelector('.toggle'));
        expect(dialog.hasAttribute('open')).toBe(true);
        expect(host.querySelector('.probe')).not.toBeNull();
    });
});
describe('ConfirmDialog', () => {
    it('holds the dialog open and the button busy while confirming', async () => {
        let finish = () => { };
        const onconfirm = () => new Promise((resolve) => (finish = resolve));
        const onclose = vi.fn();
        const host = render(ConfirmDialog, {
            open: true,
            title: 'Delete?',
            confirmLabel: 'Delete',
            busyLabel: 'Deleting…',
            onconfirm,
            onclose,
        });
        click(byText(host, 'Delete'));
        const busy = host.querySelector('button[aria-busy="true"]');
        expect(busy?.textContent).toContain('Deleting…');
        const dialog = host.querySelector('dialog');
        expect(cancel(dialog).defaultPrevented).toBe(true);
        click(host.querySelector('button[aria-label="Close"]'));
        expect(onclose).not.toHaveBeenCalled();
        finish();
        await tick();
        flushSync();
        expect(onclose).toHaveBeenCalledOnce();
    });
    it('forwards its origin to the dialog', () => {
        const host = render(ConfirmDialog, {
            open: true,
            title: 'Delete?',
            origin: new DOMRect(0, 0, 10, 10),
            onconfirm: () => { },
            onclose: () => { },
        });
        expect(host.querySelector('dialog')?.classList.contains('grow')).toBe(true);
    });
});
describe('FeedbackDialog', () => {
    it('puts its buttons in the dialog row, busy while sending, and forwards the input labels', async () => {
        let finish = () => { };
        const onsubmit = () => new Promise((resolve) => (finish = resolve));
        const host = render(FeedbackDialog, {
            open: true,
            onclose: () => { },
            onsubmit,
            upLabel: 'Gut',
            downLabel: 'Schlecht',
            sendingLabel: 'Sende…',
        });
        expect(host.querySelector('.actions button[type="submit"]')?.getAttribute('form')).toBe(host.querySelector('form')?.id);
        expect(byText(host, 'Gut')).toBeDefined();
        expect(byText(host, 'Schlecht')).toBeDefined();
        click(byText(host, 'Gut'));
        submit(host.querySelector('form'));
        expect(host.querySelector('button[aria-busy="true"]')?.textContent).toContain('Sende…');
        finish();
        await tick();
    });
    it('offers Done when the thank-you stays', async () => {
        const onclose = vi.fn();
        const host = render(FeedbackDialog, {
            open: true,
            onclose,
            onsubmit: () => { },
            closeAfter: 0,
            doneLabel: 'Fertig',
        });
        click(host.querySelectorAll('[role="radio"]')[0]);
        submit(host.querySelector('form'));
        await tick();
        flushSync();
        click(byText(host, 'Fertig'));
        expect(onclose).toHaveBeenCalledOnce();
    });
    it('does not let the thank-you timer of the last opening close the next one', async () => {
        const onclose = vi.fn();
        const host = render(DialogFixture, { onclose });
        click(host.querySelector('.toggle-feedback'));
        click(host.querySelectorAll('[role="radio"]')[0]);
        submit(host.querySelectorAll('form')[0] ?? null);
        await tick();
        flushSync();
        expect(host.textContent).toContain('Thank you!');
        vi.useFakeTimers();
        // Closed by hand and opened again before the thank-you would have closed it.
        click(host.querySelector('.toggle-feedback'));
        click(host.querySelector('.toggle-feedback'));
        vi.advanceTimersByTime(2000);
        flushSync();
        expect(onclose).not.toHaveBeenCalled();
        expect(host.querySelectorAll('dialog')[1]?.hasAttribute('open')).toBe(true);
    });
});
describe('Drawer', () => {
    it('closes from a backdrop click but not from a drag out of the panel', () => {
        const onclose = vi.fn();
        const props = { open: true, title: 'Filters', onclose, children: html('<p>f</p>') };
        const host = render(Drawer, props);
        const dialog = host.querySelector('dialog');
        expect(host.querySelector('button[aria-label="Close"]')?.className).toContain('btn--ghost');
        down(host.querySelector('.body'));
        click(dialog);
        expect(onclose).not.toHaveBeenCalled();
        down(dialog);
        click(dialog);
        expect(onclose).toHaveBeenCalledOnce();
        const fixed = render(Drawer, { ...props, closeOnBackdrop: false });
        down(fixed.querySelector('dialog'));
        click(fixed.querySelector('dialog'));
        expect(onclose).toHaveBeenCalledOnce();
    });
});
describe('Toaster', () => {
    it('pauses the countdown under the pointer and on focus, and resumes after', () => {
        vi.useFakeTimers();
        const queue = new ToastQueue(1000);
        const host = render(Toaster, { queue });
        queue.push('Saved');
        flushSync();
        const stack = host.querySelector('.toasts');
        vi.advanceTimersByTime(600);
        fire(stack, new PointerEvent('pointerenter'));
        vi.advanceTimersByTime(5000);
        expect(queue.items).toHaveLength(1);
        fire(stack, new PointerEvent('pointerleave'));
        vi.advanceTimersByTime(399);
        expect(queue.items).toHaveLength(1);
        vi.advanceTimersByTime(1);
        expect(queue.items).toHaveLength(0);
        queue.push('Synced');
        flushSync();
        fire(host.querySelector('.toast button'), new FocusEvent('focusin', { bubbles: true }));
        vi.advanceTimersByTime(5000);
        expect(queue.items).toHaveLength(1);
        fire(host.querySelector('.toast button'), new FocusEvent('focusout', { bubbles: true }));
        vi.advanceTimersByTime(1000);
        expect(queue.items).toHaveLength(0);
    });
    it('keeps errors and runs a toast action such as Undo', () => {
        vi.useFakeTimers();
        const queue = new ToastQueue(1000);
        const onaction = vi.fn();
        const host = render(Toaster, { queue });
        queue.push('Could not save', 'error');
        queue.push('Row deleted', 'ok', { action: { label: 'Undo', onaction } });
        flushSync();
        vi.advanceTimersByTime(500);
        click(byText(host, 'Undo'));
        expect(onaction).toHaveBeenCalledOnce();
        vi.advanceTimersByTime(10_000);
        expect(queue.items.map((t) => t.message)).toEqual(['Could not save']);
    });
    it('reports pause, resume and actions without a queue', () => {
        const onpause = vi.fn();
        const onresume = vi.fn();
        const onaction = vi.fn();
        const ownAction = vi.fn();
        const host = render(Toaster, {
            toasts: [
                { id: 7, tone: 'ok', message: 'Moved', action: { label: 'Undo', onaction: ownAction } },
            ],
            onpause,
            onresume,
            onaction,
        });
        const stack = host.querySelector('.toasts');
        fire(stack, new PointerEvent('pointerenter'));
        fire(stack, new PointerEvent('pointerleave'));
        expect(onpause).toHaveBeenCalledOnce();
        expect(onresume).toHaveBeenCalledOnce();
        click(byText(host, 'Undo'));
        expect(onaction).toHaveBeenCalledWith(7);
        expect(ownAction).not.toHaveBeenCalled();
        const ondismiss = vi.fn();
        const plain = render(Toaster, {
            toasts: [
                { id: 8, tone: 'ok', message: 'Moved', action: { label: 'Undo', onaction: ownAction } },
            ],
            ondismiss,
        });
        click(byText(plain, 'Undo'));
        expect(ownAction).toHaveBeenCalledOnce();
        expect(ondismiss).toHaveBeenCalledWith(8);
    });
});
