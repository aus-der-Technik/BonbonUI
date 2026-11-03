import { flushSync } from 'svelte';
import { html, key, render, tick } from '../../test/render';
import AppJar from './AppJar.svelte';
import ContextMenu from './ContextMenu.svelte';
import ControlCenter from './ControlCenter.svelte';
import Launchpad from './Launchpad.svelte';
import NotificationCenter from './NotificationCenter.svelte';
import QuickSettings from './QuickSettings.svelte';
import Window from './Window.svelte';
import { WindowManager } from './shared.svelte';

const q = <T extends Element = HTMLElement>(root: ParentNode, selector: string) =>
  root.querySelector<T & HTMLElement>(selector);
const pointer = (target: Element, type: string, init: PointerEventInit = {}) => {
  target.dispatchEvent(new PointerEvent(type, { bubbles: true, button: 0, ...init }));
  flushSync();
};
const apps = [
  { id: 'notes', label: 'Notes', icon: 'edit' as const },
  { id: 'mail', label: 'Mail', icon: 'mail' as const },
];

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});

describe('WindowManager.openFrom', () => {
  it('lets a window grow from its opener once, then from its Dock icon', () => {
    const manager = new WindowManager();
    const tray = document.createElement('div');
    tray.innerHTML = '<span data-app="notes"></span>';
    manager.tray = tray;
    const dockIcon = new DOMRect(1, 2, 3, 4);
    vi.spyOn(tray.firstElementChild!, 'getBoundingClientRect').mockReturnValue(dockIcon);

    const tile = new DOMRect(10, 20, 30, 40);
    manager.openFrom(tile, 'notes');
    expect(manager.origin('notes')).toBe(tile);
    expect(manager.origin('notes')).toBe(dockIcon);

    // Without an id: the next window to open takes it.
    const row = document.createElement('div');
    const rowRect = new DOMRect(5, 5, 5, 5);
    vi.spyOn(row, 'getBoundingClientRect').mockReturnValue(rowRect);
    manager.openFrom(row);
    expect(manager.origin('other')).toBe(rowRect);
    expect(manager.origin('other')).toBeUndefined();
  });

  it('forgets an opener that no window used within a second', () => {
    vi.useFakeTimers();
    const manager = new WindowManager();
    manager.openFrom(new DOMRect(1, 1, 1, 1), 'notes');
    manager.openFrom(new DOMRect(2, 2, 2, 2));
    vi.advanceTimersByTime(1500);
    expect(manager.origin('notes')).toBeUndefined();
  });
});

describe('Window', () => {
  it('stops resizing when the pointer is cancelled', () => {
    const host = render(Window, { title: 'Notes', x: 0, y: 0, width: 400, height: 300 });
    const win = q(host, 'section.window')!;
    const grip = q(host, '.grip')!;
    pointer(grip, 'pointerdown', { clientX: 0, clientY: 0 });
    pointer(grip, 'pointercancel');
    pointer(grip, 'pointermove', { clientX: 80, clientY: 80 });
    expect(win.style.getPropertyValue('--win-w')).toBe('400px');
  });
});

describe('AppJar', () => {
  it('keeps Tab inside the jar', async () => {
    const host = render(AppJar, { open: true, apps });
    await tick();
    const buttons = [...host.querySelectorAll<HTMLElement>('.grid button')];
    const last = buttons.at(-1)!;
    last.focus();
    key(last, 'Tab');
    expect(document.activeElement).toBe(q(host, 'input'));
    key(document.activeElement!, 'Tab', { shiftKey: true });
    expect(document.activeElement).toBe(last);
  });

  it('rises out of its anchor', () => {
    const host = render(AppJar, { open: true, apps, anchor: new DOMRect(20, 600, 40, 40) });
    // No layout: the jar sits at 0,0, so the origin is the anchor's centre.
    expect(q(host, '.jar')?.style.transformOrigin).toBe('40px 620px');
    const plain = render(AppJar, { open: true, apps });
    expect(q(plain, '.jar')?.style.transformOrigin).toBe('');
  });

  it('is still there under its old name', () => {
    const onselect = vi.fn();
    const host = render(Launchpad, { open: true, apps, onselect, label: 'Apps' });
    expect(q(host, 'h2')?.textContent).toBe('Apps');
    q(host, '.grid button')?.click();
    flushSync();
    expect(onselect).toHaveBeenCalledWith(apps[0]);
  });
});

describe('QuickSettings', () => {
  const toggles = [{ id: 'wifi', label: 'Wi-Fi', icon: 'wifi' as const, on: true }];

  function setup(props: Record<string, unknown> = {}) {
    const anchor = document.createElement('button');
    anchor.setAttribute('aria-pressed', 'true');
    document.body.append(anchor);
    vi.spyOn(anchor, 'getBoundingClientRect').mockReturnValue(new DOMRect(900, 10, 30, 20));
    anchor.focus();
    const onclose = vi.fn();
    const host = render(QuickSettings, { toggles, floating: true, anchor, onclose, ...props });
    return { anchor, onclose, host, panel: q(host, '.cc')! };
  }

  it('takes focus on open and gives it back to its anchor on Escape', async () => {
    const { anchor, panel, onclose } = setup();
    await tick();
    expect(document.activeElement).toBe(panel);
    key(panel, 'Escape');
    await tick();
    expect(onclose).toHaveBeenCalledOnce();
    expect(document.activeElement).toBe(anchor);
    anchor.remove();
  });

  it('leaves a press on its anchor to the anchor, but closes for any other toggle', async () => {
    const { anchor, host, onclose } = setup();
    await tick();
    pointer(anchor, 'pointerdown');
    expect(q(host, '.cc')).not.toBeNull();
    const elsewhere = document.createElement('button');
    elsewhere.setAttribute('aria-pressed', 'false');
    document.body.append(elsewhere);
    pointer(elsewhere, 'pointerdown');
    expect(q(host, '.cc')).toBeNull();
    expect(onclose).toHaveBeenCalledOnce();
    // An outside click leaves focus to the click, not back on the anchor.
    await tick();
    expect(document.activeElement).not.toBe(anchor);
    anchor.remove();
    elsewhere.remove();
  });

  it('opens from its anchor', () => {
    const { anchor, panel } = setup();
    // Right half of the viewport: it hangs to the left of the anchor, below it.
    expect(panel.style.top).toBe('38px');
    expect(panel.style.right).toBe('auto');
    expect(panel.style.transformOrigin).toMatch(/px -18px$/);
    anchor.remove();
  });

  it('keeps working under its old name, labelled without a product name', () => {
    const host = render(ControlCenter, { toggles });
    expect(q(host, '.cc')?.getAttribute('aria-label')).toBe('Quick settings');
  });
});

describe('ContextMenu', () => {
  it('grows from the corner at the pointer when it flips at an edge', async () => {
    vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(200);
    vi.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockReturnValue(100);
    const host = render(ContextMenu, {
      items: [{ label: 'Copy' }],
      children: html('<p class="target">row</p>'),
    });
    const at = (x: number, y: number) => {
      q(host, '.target')?.dispatchEvent(
        new MouseEvent('contextmenu', { bubbles: true, cancelable: true, clientX: x, clientY: y }),
      );
      flushSync();
      return document.querySelector<HTMLElement>('.bb-context-menu')!;
    };
    expect(at(30, 40).style.getPropertyValue('--menu-origin')).toBe('0px 0px');
    const flipped = at(window.innerWidth - 20, window.innerHeight - 10);
    expect(flipped.style.getPropertyValue('--menu-origin')).toBe('200px 98px');
    await tick();
    document.body.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
  });
});

describe('NotificationCenter', () => {
  it('pauses the countdown while focus is on a banner', () => {
    vi.useFakeTimers();
    const onclose = vi.fn();
    const host = render(NotificationCenter, {
      notifications: [{ id: 'a', app: 'Mail', title: 'Hi' }],
      duration: 1000,
      onclose,
    });
    const center = q(host, '.center')!;
    const inside = document.createElement('button');
    center.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
    flushSync();
    vi.advanceTimersByTime(3000);
    expect(onclose).not.toHaveBeenCalled();
    // Moving between banners keeps it paused; leaving the stack resumes it.
    center.dispatchEvent(new FocusEvent('focusout', { bubbles: true, relatedTarget: center }));
    flushSync();
    vi.advanceTimersByTime(3000);
    expect(onclose).not.toHaveBeenCalled();
    center.dispatchEvent(new FocusEvent('focusout', { bubbles: true, relatedTarget: inside }));
    flushSync();
    vi.advanceTimersByTime(1000);
    expect(onclose).toHaveBeenCalledWith('a');
  });
});
