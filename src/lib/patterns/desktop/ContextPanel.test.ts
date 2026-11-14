import { flushSync } from 'svelte';
import { click, key, render, tick } from '../../test/render';
import ContextPanelFixture from './ContextPanelFixture.test.svelte';

const dialog = () => document.querySelector<HTMLElement>('[role="dialog"][aria-label="Edit"]');
const press = (target: Element | null) => {
  target?.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, button: 0 }));
  flushSync();
};
const rightClick = (target: Element | null, x = 30, y = 40) => {
  const event = new MouseEvent('contextmenu', {
    bubbles: true,
    cancelable: true,
    clientX: x,
    clientY: y,
  });
  target?.dispatchEvent(event);
  flushSync();
  return event;
};
const escape = (target: Element | null) =>
  key(target ?? document.body, 'Escape', { cancelable: true });

afterEach(() => {
  vi.restoreAllMocks();
});

describe('ContextPanel', () => {
  it('opens at the pointer with the target from onopen and focuses the first control', async () => {
    const onopen = vi.fn((event: MouseEvent | KeyboardEvent) =>
      (event.target as Element).closest('.row') ? 'row-a' : null,
    );
    const onclose = vi.fn();
    const host = render(ContextPanelFixture, { onopen, onclose });
    const row = host.querySelector('.row');
    const event = rightClick(row);
    expect(onopen).toHaveBeenCalledWith(event);
    expect(event.defaultPrevented).toBe(true);
    const panel = dialog()!;
    expect(panel.getAttribute('popover')).toBe('manual');
    expect(panel.querySelector('.target')?.textContent).toBe('row-a');
    expect(panel.style.left).toBe('30px');
    expect(panel.style.top).toBe('40px');
    expect(panel.style.width).toBe('300px');
    expect(panel.classList.contains('panel--pad-sm')).toBe(true);
    // Rendered in place, so it inherits the custom properties of where it was opened.
    expect(host.contains(panel)).toBe(true);
    await tick();
    expect(document.activeElement).toBe(panel.querySelector('.field'));

    escape(document.activeElement);
    expect(dialog()).toBeNull();
    expect(onclose).toHaveBeenCalledTimes(1);
  });

  it('stands aside when onopen returns nothing, and while disabled', () => {
    const onopen = vi.fn(() => null);
    const host = render(ContextPanelFixture, { onopen });
    const event = rightClick(host.querySelector('.heading'));
    expect(onopen).toHaveBeenCalled();
    expect(event.defaultPrevented).toBe(false);
    expect(dialog()).toBeNull();

    const always = vi.fn(() => 'x');
    const off = render(ContextPanelFixture, { onopen: always, disabled: true });
    const ignored = rightClick(off.querySelector('.row'));
    expect(always).not.toHaveBeenCalled();
    expect(ignored.defaultPrevented).toBe(false);
    key(off.querySelector('.row')!, 'ContextMenu');
    expect(dialog()).toBeNull();
  });

  it('closes on a press outside, not on one inside, and via close() with focus back', async () => {
    const onclose = vi.fn();
    const host = render(ContextPanelFixture, { onopen: () => 'a', onclose });
    rightClick(host.querySelector('.row'));
    press(dialog()!.querySelector('.target'));
    expect(dialog()).not.toBeNull();
    press(document.body);
    expect(dialog()).toBeNull();
    expect(onclose).toHaveBeenCalledTimes(1);

    const opener = host.querySelector<HTMLButtonElement>('.opener')!;
    opener.focus();
    click(opener);
    await tick();
    expect(dialog()?.querySelector('.target')?.textContent).toBe('from-button');
    click(dialog()!.querySelector('.done'));
    expect(dialog()).toBeNull();
    expect(document.activeElement).toBe(opener);
  });

  it('opens from the keyboard under the focused element', () => {
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue(
      new DOMRect(100, 200, 80, 20),
    );
    const onopen = vi.fn((_event: MouseEvent | KeyboardEvent) => 'kb');
    const host = render(ContextPanelFixture, { onopen });
    key(host.querySelector('.row')!, 'F10', { shiftKey: true });
    const panel = dialog()!;
    expect(panel.querySelector('.target')?.textContent).toBe('kb');
    expect(panel.style.left).toBe('100px');
    expect(panel.style.top).toBe('224px');
    expect(onopen.mock.calls[0]?.[0]).toBeInstanceOf(KeyboardEvent);
    // Other keys do nothing.
    escape(panel);
    key(host.querySelector('.row')!, 'F10');
    expect(dialog()).toBeNull();
  });

  it('openAt and openFor open it from a button, and a new opening replaces the old', () => {
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue(
      new DOMRect(10, 20, 60, 30),
    );
    const host = render(ContextPanelFixture, { onopen: () => 'menu' });
    click(host.querySelector('.opener'));
    let panel = dialog()!;
    expect(panel.style.left).toBe('40px');
    expect(panel.style.top).toBe('50px');
    click(host.querySelector('.opener-for'));
    panel = dialog()!;
    expect(document.querySelectorAll('[role="dialog"][aria-label="Edit"]')).toHaveLength(1);
    expect(panel.querySelector('.target')?.textContent).toBe('under');
    expect(panel.style.left).toBe('10px');
    expect(panel.style.top).toBe('54px');
  });

  it('flips to the left and above near the edges and grows from the pointer', () => {
    vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(200);
    vi.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockReturnValue(100);
    const host = render(ContextPanelFixture, { onopen: () => 'edge' });
    const x = window.innerWidth - 20;
    const y = window.innerHeight - 10;
    rightClick(host.querySelector('.row'), x, y);
    const panel = dialog()!;
    expect(panel.style.left).toBe(`${x - 200}px`);
    expect(panel.style.top).toBe(`${y - 100}px`);
    expect(panel.style.transformOrigin).toBe('200px 100px');
    press(document.body);

    // No room either way: it stays on the pointer's side, clamped into the viewport.
    vi.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockReturnValue(window.innerHeight);
    rightClick(host.querySelector('.row'), 30, 10);
    expect(dialog()!.style.top).toBe('8px');
  });

  it('stays open while popups opened from inside it are used', async () => {
    const onclose = vi.fn();
    const host = render(ContextPanelFixture, { onopen: () => 'nested', onclose });
    rightClick(host.querySelector('.row'));
    const panel = dialog()!;

    // A Popover inside: pressing in it and Escape there close the Popover only.
    click(panel.querySelector('.anchor button'));
    await tick();
    const inner = panel.querySelector('.in-popover')!;
    press(inner);
    expect(dialog()).not.toBeNull();
    escape(inner);
    expect(panel.querySelector('.in-popover')).toBeNull();
    expect(dialog()).not.toBeNull();

    // A ContextMenu inside (mounted at the end of body): its right-click does not reopen or
    // close the panel, a press on its item does not count as outside.
    const calls = onclose.mock.calls.length;
    rightClick(panel.querySelector('.menu-area'));
    await tick();
    const item = document.querySelector('.bb-context-menu [role="menuitem"]');
    expect(item).not.toBeNull();
    press(item);
    expect(dialog()).not.toBeNull();
    escape(item);
    expect(document.querySelector('.bb-context-menu')).toBeNull();
    expect(dialog()).not.toBeNull();

    // An armed delete: Escape disarms it, the panel stays.
    click([...panel.querySelectorAll('button')].find((b) => b.textContent?.trim() === 'Delete'));
    const armed = [...panel.querySelectorAll('button')].find(
      (b) => b.textContent?.trim() === 'Delete permanently',
    );
    expect(armed).toBeDefined();
    escape(armed!);
    expect(dialog()).not.toBeNull();

    // A chart tooltip and a select inside are part of it too.
    press(panel.querySelector('.tooltip'));
    press(panel.querySelector('.choice'));
    expect(dialog()).not.toBeNull();
    expect(onclose).toHaveBeenCalledTimes(calls);

    escape(panel.querySelector('.field'));
    expect(dialog()).toBeNull();
  });

  it('a dialog opened from it is not outside either', () => {
    const host = render(ContextPanelFixture, { onopen: () => 'modal' });
    rightClick(host.querySelector('.row'));
    const modal = document.createElement('dialog');
    modal.setAttribute('open', '');
    modal.innerHTML = '<button>ok</button>';
    document.body.append(modal);
    press(modal.querySelector('button'));
    escape(modal.querySelector('button'));
    expect(dialog()).not.toBeNull();
    modal.remove();
    press(document.body);
    expect(dialog()).toBeNull();
  });
});
