import { flushSync } from 'svelte';
import { backdropClick, fromOtherModal, tabbables, trapTab } from './overlay';
const build = (markup) => {
    const root = document.createElement('div');
    root.tabIndex = -1;
    root.innerHTML = markup;
    document.body.append(root);
    return root;
};
afterEach(() => document.body.replaceChildren());
describe('tabbables', () => {
    it('finds every control Tab reaches and skips the rest', () => {
        const root = build(`
      <a href="#a">a</a><a>no href</a>
      <button>b</button><button disabled>off</button>
      <input class="i" /><input type="hidden" /><input disabled />
      <select class="s"></select><textarea class="t"></textarea>
      <details><summary>more</summary></details>
      <div contenteditable="true" class="ce"></div>
      <span tabindex="0" class="ti"></span><span tabindex="-1"></span>
      <div hidden><button>hidden</button></div>
      <div inert><button>inert</button></div>
    `);
        const found = tabbables(root).map((el) => el.className || el.textContent?.trim());
        expect(found).toEqual(['a', 'b', 'i', 's', 't', 'more', 'ce', 'ti']);
    });
});
describe('trapTab', () => {
    const tab = (root, shiftKey = false) => {
        const event = new KeyboardEvent('keydown', { key: 'Tab', shiftKey, cancelable: true });
        trapTab(event, root);
        return event;
    };
    it('wraps from the last control to the first and back, and pulls focus inside', () => {
        const root = build('<input class="first" /><button class="last">b</button>');
        const first = root.querySelector('.first');
        const last = root.querySelector('.last');
        last.focus();
        expect(tab(root).defaultPrevented).toBe(true);
        expect(document.activeElement).toBe(first);
        tab(root, true);
        expect(document.activeElement).toBe(last);
        // In between, Tab is the browser's.
        first.focus();
        expect(tab(root).defaultPrevented).toBe(false);
        document.body.focus();
        document.activeElement?.blur();
        tab(root);
        expect(document.activeElement).toBe(first);
        // Other keys pass.
        const other = new KeyboardEvent('keydown', { key: 'a', cancelable: true });
        trapTab(other, root);
        expect(other.defaultPrevented).toBe(false);
    });
    it('keeps focus on a root without controls', () => {
        const root = build('<p>only text</p>');
        expect(tab(root).defaultPrevented).toBe(true);
        expect(document.activeElement).toBe(root);
    });
});
describe('fromOtherModal', () => {
    it('tells keys from a nested dialog apart from the panel’s own', () => {
        const root = build('<div class="panel" aria-modal="true"><input class="own" /><dialog open><input class="nested" /></dialog></div><div aria-modal="true"><input class="other" /></div>');
        const panel = root.querySelector('.panel');
        const from = (el) => {
            const event = new KeyboardEvent('keydown', { key: 'Escape' });
            Object.defineProperty(event, 'target', { value: el });
            return fromOtherModal(event, panel);
        };
        expect(from(root.querySelector('.own'))).toBe(false);
        expect(from(root.querySelector('.other'))).toBe(true);
        expect(from(root.querySelector('.nested'))).toBe(true);
        expect(from(document.body)).toBe(false);
        expect(from(window)).toBe(false);
    });
});
describe('backdropClick', () => {
    it('needs both the press and the release on the backdrop', () => {
        const root = build('<p class="inner">x</p>');
        const handler = vi.fn();
        const action = backdropClick(root, handler);
        const press = (el) => el.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
        press(root.querySelector('.inner'));
        root.click();
        expect(handler).not.toHaveBeenCalled();
        press(root);
        root.click();
        expect(handler).toHaveBeenCalledOnce();
        // A click alone (no press) is not enough either.
        root.click();
        expect(handler).toHaveBeenCalledOnce();
        // With layout, a hit on the dialog's own padding is inside, not the backdrop.
        const rect = vi
            .spyOn(root, 'getBoundingClientRect')
            .mockReturnValue(new DOMRect(0, 0, 100, 100));
        root.dispatchEvent(new PointerEvent('pointerdown', { clientX: 50, clientY: 50 }));
        root.dispatchEvent(new MouseEvent('click', { clientX: 50, clientY: 50 }));
        expect(handler).toHaveBeenCalledOnce();
        root.dispatchEvent(new PointerEvent('pointerdown', { clientX: 150, clientY: 50 }));
        root.dispatchEvent(new MouseEvent('click', { clientX: 150, clientY: 50 }));
        expect(handler).toHaveBeenCalledTimes(2);
        rect.mockRestore();
        const next = vi.fn();
        action.update(next);
        press(root);
        root.click();
        expect(next).toHaveBeenCalledOnce();
        action.destroy();
        press(root);
        root.click();
        expect(next).toHaveBeenCalledOnce();
        flushSync();
    });
});
