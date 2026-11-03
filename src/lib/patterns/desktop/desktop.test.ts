import { flushSync } from 'svelte';
import { click, html, input, key, render, tick } from '../../test/render';
import AppJar from './AppJar.svelte';
import CommandPalette from './CommandPalette.svelte';
import ContextMenu from './ContextMenu.svelte';
import DesktopFixture from './DesktopFixture.test.svelte';
import Dock from './Dock.svelte';
import Inspector from './Inspector.svelte';
import InspectorRow from './InspectorRow.svelte';
import InspectorSection from './InspectorSection.svelte';
import MenuBar from './MenuBar.svelte';
import NotificationBanner from './NotificationBanner.svelte';
import NotificationCenter from './NotificationCenter.svelte';
import QuickSettings from './QuickSettings.svelte';
import SourceList from './SourceList.svelte';
import StatusBar from './StatusBar.svelte';
import Toolbar from './Toolbar.svelte';
import TreeView from './TreeView.svelte';
import Widget from './Widget.svelte';
import Window from './Window.svelte';
import windowSource from './Window.svelte?raw';
import { WindowManager, isSeparator, rove } from './shared.svelte';

const q = <T extends Element = HTMLElement>(root: ParentNode, selector: string) =>
  root.querySelector<T & HTMLElement>(selector);
const qa = (root: ParentNode, selector: string) => [
  ...root.querySelectorAll<HTMLElement>(selector),
];
const byLabel = (root: ParentNode, label: string) =>
  q<HTMLButtonElement>(root, `[aria-label="${label}"]`);
const pointer = (target: Element, type: string, init: PointerEventInit = {}) => {
  target.dispatchEvent(new PointerEvent(type, { bubbles: true, button: 0, ...init }));
  flushSync();
};

describe('WindowManager and rove', () => {
  it('orders, focuses and removes windows', () => {
    const m = new WindowManager();
    m.register('a');
    m.register('b');
    expect(m.focused).toBe('b');
    expect(m.z('a')).toBe(1);
    m.focus('a');
    expect(m.order).toEqual(['b', 'a']);
    m.unregister('a');
    expect(m.focused).toBe('b');
    expect(m.z('a')).toBe(0);
    // The tray anchors windows to their app icons.
    expect(m.anchor('b')).toBeUndefined();
    const tray = document.createElement('nav');
    tray.innerHTML = '<button data-app="b"></button>';
    m.tray = tray;
    expect(m.anchor('b')).toBeDefined();
    expect(m.anchor('nope')).toBeUndefined();
  });

  it('moves focus by arrows, Home and End, wrapping', () => {
    const host = document.createElement('div');
    host.innerHTML = '<button>1</button><button>2</button><button>3</button>';
    document.body.append(host);
    const items = qa(host, 'button');
    items[0]?.focus();
    const ev = (k: string) => new KeyboardEvent('keydown', { key: k, cancelable: true });
    expect(rove(ev('ArrowUp'), items, 'vertical')).toBe(true);
    expect(document.activeElement).toBe(items[2]);
    rove(ev('ArrowRight'), items, 'horizontal');
    expect(document.activeElement).toBe(items[0]);
    rove(ev('End'), items);
    expect(document.activeElement).toBe(items[2]);
    rove(ev('Home'), items);
    expect(document.activeElement).toBe(items[0]);
    expect(rove(ev('ArrowUp'), items, 'horizontal')).toBe(false);
    host.remove();
  });
});

describe('Desktop', () => {
  const icons = [
    { id: 'r', label: 'Report', icon: 'file' as const, meta: '2 MB' },
    { id: 'p', label: 'Photos', icon: 'image' as const, color: 'pink' },
  ];

  it('stacks windows and brings the clicked one to the front', () => {
    const host = render(DesktopFixture, {});
    const [a, b] = qa(host, 'section.window');
    expect(b?.classList.contains('focused')).toBe(true);
    expect(a?.classList.contains('focused')).toBe(false);
    expect(Number(b?.style.zIndex)).toBeGreaterThan(Number(a?.style.zIndex));
    pointer(a!, 'pointerdown');
    expect(a?.classList.contains('focused')).toBe(true);
    expect(b?.classList.contains('focused')).toBe(false);
    // Focus moving in by keyboard does the same.
    b?.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
    flushSync();
    expect(b?.classList.contains('focused')).toBe(true);
  });

  it('minimises to hidden, restores to the front, and reports close', () => {
    const onclose = vi.fn();
    const host = render(DesktopFixture, { onclose });
    const [a, b] = qa(host, 'section.window');
    click(byLabel(b!, 'Minimize'));
    expect(b?.hidden).toBe(true);
    expect(a?.classList.contains('focused')).toBe(true);
    // A picture of the window flies into the tray; the real one is hidden at once.
    const ghost = q(host, '.window.ghost');
    expect(ghost?.getAttribute('aria-hidden')).toBe('true');
    expect(ghost?.tagName).toBe('DIV');
    click(q(host, '.restore'));
    expect(b?.hidden).toBe(false);
    expect(b?.classList.contains('focused')).toBe(true);
    click(byLabel(a!, 'Close'));
    expect(onclose).toHaveBeenCalled();
  });

  it('selects and opens desktop icons by pointer and keyboard', () => {
    const onopen = vi.fn();
    const host = render(DesktopFixture, { icons, onopen });
    const options = qa(host, '[role="option"]');
    expect(options[0]?.getAttribute('aria-label')).toBe('Report, 2 MB');
    expect(options[0]?.tabIndex).toBe(0);
    click(options[1]);
    expect(options[1]?.getAttribute('aria-selected')).toBe('true');
    options[1]?.dispatchEvent(new MouseEvent('dblclick', { bubbles: true }));
    expect(onopen).toHaveBeenCalledWith(expect.objectContaining({ id: 'p' }));
    options[1]?.focus();
    key(options[1]!, 'ArrowLeft');
    expect(options[0]?.getAttribute('aria-selected')).toBe('true');
    key(options[0]!, ' ');
    key(options[0]!, 'Enter');
    expect(onopen).toHaveBeenLastCalledWith(expect.objectContaining({ id: 'r' }));
    // A click on the bare wallpaper clears the selection.
    pointer(q(host, '.area')!, 'pointerdown');
    expect(options[0]?.getAttribute('aria-selected')).toBe('false');
  });

  it('opens the wallpaper menu, but not over a window', async () => {
    const onselect = vi.fn();
    const host = render(DesktopFixture, {
      contextmenu: [{ label: 'New folder', onselect }, { separator: true }, { label: 'Info' }],
    });
    q(host, 'section.window')?.dispatchEvent(
      new MouseEvent('contextmenu', { bubbles: true, cancelable: true }),
    );
    await tick();
    expect(document.querySelector('[role="menu"]')).toBeNull();
    q(host, '.area')?.dispatchEvent(
      new MouseEvent('contextmenu', { bubbles: true, cancelable: true, clientX: 40, clientY: 50 }),
    );
    await tick();
    flushSync();
    const menu = document.querySelector('[role="menu"]');
    expect(menu?.querySelectorAll('[role="menuitem"]')).toHaveLength(2);
    click(menu?.querySelector('[role="menuitem"]'));
    expect(onselect).toHaveBeenCalled();
    expect(document.querySelector('[role="menu"]')).toBeNull();
  });

  it('places icons at x/y and keeps the rest in the grid', () => {
    const host = render(DesktopFixture, {
      icons: [...icons, { id: 'n', label: 'New', icon: 'folder' as const, x: 30, y: 40 }],
    });
    const [report, , placed] = qa(host, '[role="option"]');
    expect(report?.classList.contains('placed')).toBe(false);
    expect(report?.style.getPropertyValue('--icon-x')).toBe('');
    expect(placed?.classList.contains('placed')).toBe(true);
    expect(placed?.style.getPropertyValue('--icon-x')).toBe('30px');
    expect(placed?.style.getPropertyValue('--icon-y')).toBe('40px');
  });

  it('hands the wallpaper menu the spot under the pointer', async () => {
    const at = vi.fn();
    const onselect = vi.fn();
    const host = render(DesktopFixture, {
      contextmenu: (p) => {
        at(p);
        return [{ label: 'New folder', onselect: () => onselect(p) }];
      },
    });
    const area = q(host, '.area')!;
    Object.defineProperty(area, 'clientWidth', { value: 1000 });
    Object.defineProperty(area, 'clientHeight', { value: 600 });
    const rem = parseFloat(getComputedStyle(area).fontSize) || 16;
    area.dispatchEvent(
      new MouseEvent('contextmenu', {
        bubbles: true,
        cancelable: true,
        clientX: 300,
        clientY: 200,
      }),
    );
    await tick();
    flushSync();
    // The tile's centre lands on the pointer: half a cell to the left, half a tile up.
    const spot = { x: Math.round(300 - 3.25 * rem), y: 200 - 36 };
    expect(at).toHaveBeenCalledWith(spot);
    click(document.querySelector('.bb-context-menu [role="menuitem"]'));
    expect(onselect).toHaveBeenCalledWith(spot);
    // Never off the desktop's edge.
    area.dispatchEvent(
      new MouseEvent('contextmenu', { bubbles: true, cancelable: true, clientX: 5, clientY: 9999 }),
    );
    await tick();
    expect(at).toHaveBeenLastCalledWith({ x: 0, y: Math.round(600 - 8.25 * rem) });
  });

  it('renames an icon in place: Enter commits, Escape cancels, blur commits', async () => {
    const onrename = vi.fn();
    const host = render(DesktopFixture, { icons, renaming: 'r', onrename });
    let field = q<HTMLInputElement>(host, 'input.rename')!;
    expect(field.getAttribute('aria-label')).toBe('Name');
    expect(field.value).toBe('Report');
    await tick();
    expect(document.activeElement).toBe(field);
    // Keys typed in the field stay in it (Enter does not open the icon).
    field.value = '  Annual report ';
    key(field, 'Enter');
    await tick();
    expect(onrename).toHaveBeenCalledWith('r', 'Annual report');
    expect(q(host, 'input.rename')).toBeNull();
    expect(q(host, '.renaming')?.textContent).toBe('');
    // Focus goes back to the icon.
    expect(document.activeElement?.getAttribute('data-id')).toBe('r');

    // F2 starts renaming the focused icon; Escape keeps the old name.
    const option = q(host, '[data-id="p"]')!;
    option.focus();
    key(option, 'F2');
    field = q<HTMLInputElement>(host, 'input.rename')!;
    expect(q(host, '.renaming')?.textContent).toBe('p');
    field.value = 'Nope';
    key(field, 'Escape');
    await tick();
    expect(onrename).toHaveBeenCalledTimes(1);
    expect(q(host, 'input.rename')).toBeNull();

    // Leaving the field keeps what was typed; an unchanged or empty name is no rename.
    key(option, 'F2');
    field = q<HTMLInputElement>(host, 'input.rename')!;
    field.value = 'Pictures';
    field.dispatchEvent(new FocusEvent('blur'));
    await tick();
    expect(onrename).toHaveBeenLastCalledWith('p', 'Pictures');
    key(option, 'F2');
    field = q<HTMLInputElement>(host, 'input.rename')!;
    field.value = '   ';
    key(field, 'Enter');
    await tick();
    expect(onrename).toHaveBeenCalledTimes(2);
  });

  it('hands its window manager to the page with bind:manager', async () => {
    let manager: WindowManager | undefined;
    render(DesktopFixture, { onmanager: (m) => (manager = m) });
    await tick();
    expect(manager).toBeInstanceOf(WindowManager);
    expect(manager?.focused).toBe('b');
    manager?.focus('a');
    flushSync();
    expect(manager?.order).toEqual(['b', 'a']);
  });
});

describe('Window', () => {
  it('renders a static preview with toolbar, sidebar and footer', () => {
    const host = render(Window, {
      title: 'Files',
      subtitle: '12 items',
      icon: 'folder',
      static: true,
      toolbar: html('<button class="tb">t</button>'),
      sidebar: html('<nav class="sb">s</nav>'),
      footer: html('<div class="ft">f</div>'),
      children: html('<p class="content">c</p>'),
    });
    const win = q(host, 'section.window')!;
    expect(win.getAttribute('aria-label')).toBe('Files');
    expect(win.classList.contains('floating')).toBe(false);
    expect(q(host, 'h2')?.textContent).toBe('Files');
    // With a sidebar the app icon sits on top of it; a lone preview has no rim.
    expect(q(host, '.sidebar-top .app-icon')).not.toBeNull();
    expect(win.classList.contains('rim')).toBe(false);
    expect(q(host, '[role="group"]')?.getAttribute('aria-label')).toBe('Files window controls');
    expect(q(host, '.title-text p')?.textContent).toBe('12 items');
    for (const sel of ['.tb', '.sb', '.ft', '.content']) expect(q(host, sel)).not.toBeNull();
    // Without handlers the controls of a static window do nothing.
    expect(byLabel(host, 'Close')?.disabled).toBe(true);
    expect(byLabel(host, 'Zoom')?.disabled).toBe(true);
    expect(q(host, '.grip')).toBeNull();
  });

  it('shows its controls as named glyph buttons, close last and set apart', () => {
    const onclose = vi.fn();
    const host = render(Window, {
      title: 'Notes',
      onclose,
      closeLabel: 'Close window',
      minimizeLabel: 'Hide',
      zoomLabel: 'Fill screen',
      controlsLabel: 'Controls of {title}',
    });
    const group = q(host, '[role="group"]')!;
    expect(group.getAttribute('aria-label')).toBe('Controls of Notes');
    const buttons = qa(group, 'button');
    expect(buttons.map((b) => b.getAttribute('aria-label'))).toEqual([
      'Hide',
      'Fill screen',
      'Close window',
    ]);
    // A glyph in every button at rest — no colour code to learn.
    for (const b of buttons) expect(b.querySelector('svg')).not.toBeNull();
    // Each names its action in a tooltip linked to the button.
    const tips = qa(group, '[role="tooltip"]');
    expect(tips.map((t) => t.textContent?.trim())).toEqual(['Hide', 'Fill screen', 'Close window']);
    expect(buttons[2]?.getAttribute('aria-describedby')).toBe(tips[2]?.id);
    // A hairline keeps close one step apart from zoom.
    expect(q(group, '.rule')?.getAttribute('aria-hidden')).toBe('true');
    expect(buttons[1]?.getAttribute('aria-pressed')).toBe('false');
    click(buttons[2]);
    expect(onclose).toHaveBeenCalled();
  });

  it('gives every control a hit area of at least 32px and danger only to close', () => {
    const rule = (selector: string) =>
      windowSource.match(
        new RegExp(`\\n  ${selector.replace(/[.*]/g, '\\$&')} \\{([^}]*)\\}`),
      )?.[1] ?? '';
    const ctl = rule('.ctl');
    expect(ctl).toMatch(/min-width: 32px/);
    expect(ctl).toMatch(/min-height: 32px/);
    expect(windowSource).toMatch(/--btn: var\(--control-sm\)/);
    // At rest the controls are neutral; only close, pointed at or focused, turns to danger.
    expect(ctl).not.toMatch(/--danger|--tint/);
    const dangerRules = [...windowSource.matchAll(/([^{}]+)\{[^}]*var\(--danger\)[^}]*\}/g)].map(
      (m) => m[1]!.trim(),
    );
    expect(dangerRules).toHaveLength(1);
    expect(dangerRules[0]).toMatch(/^\.close:hover:not\(:disabled\),\s*\.close:focus-visible/);
  });

  it('names the app on the sidebar and shows focus as a rim or a step back', () => {
    const front = render(Window, {
      title: 'Documents',
      app: 'Files',
      icon: 'folder',
      color: 'blue',
      static: true,
      focused: true,
      sidebar: html('<nav>s</nav>'),
    });
    expect(q(front, '.app-name')?.textContent).toBe('Files');
    expect(q(front, 'section.window')?.classList.contains('rim')).toBe(true);
    const behind = render(Window, { title: 'Notes', icon: 'edit', static: true, focused: false });
    const win = q(behind, 'section.window')!;
    expect(win.classList.contains('dimmed')).toBe(true);
    expect(q(behind, '.title .app-icon')).not.toBeNull();
  });

  it('zooms by button and double click on the title bar', () => {
    const onzoom = vi.fn();
    const host = render(Window, { title: 'Notes', onzoom, children: html('<p>x</p>') });
    const win = q(host, 'section.window')!;
    click(byLabel(host, 'Zoom'));
    expect(win.classList.contains('maximized')).toBe(true);
    expect(onzoom).toHaveBeenCalledWith(true);
    q(host, '.titlebar')?.dispatchEvent(new MouseEvent('dblclick', { bubbles: true }));
    flushSync();
    expect(win.classList.contains('maximized')).toBe(false);
  });

  it('drags by the title bar and resizes from the grip', () => {
    const host = render(Window, { title: 'Notes', x: 10, y: 10, width: 400, height: 300 });
    const win = q(host, 'section.window')!;
    const bar = q(host, '.titlebar')!;
    pointer(bar, 'pointerdown', { clientX: 20, clientY: 20 });
    pointer(bar, 'pointermove', { clientX: 70, clientY: 50 });
    pointer(bar, 'pointerup');
    expect(win.style.getPropertyValue('--win-x')).toBe('60px');
    expect(win.style.getPropertyValue('--win-y')).toBe('40px');
    // Never dragged off the top-left edge.
    pointer(bar, 'pointerdown', { clientX: 70, clientY: 50 });
    pointer(bar, 'pointermove', { clientX: -500, clientY: -500 });
    expect(win.style.getPropertyValue('--win-x')).toBe('0px');
    expect(win.style.getPropertyValue('--win-y')).toBe('0px');

    const grip = q(host, '.grip')!;
    pointer(grip, 'pointerdown', { clientX: 0, clientY: 0 });
    pointer(grip, 'pointermove', { clientX: 40, clientY: -400 });
    pointer(grip, 'pointerup');
    expect(win.style.getPropertyValue('--win-w')).toBe('440px');
    expect(win.style.getPropertyValue('--win-h')).toBe('180px');
    key(grip, 'ArrowRight');
    expect(win.style.getPropertyValue('--win-w')).toBe('456px');
    key(grip, 'ArrowDown', { shiftKey: true });
    expect(win.style.getPropertyValue('--win-y')).toBe('16px');
    key(grip, 'a');
  });

  it('ignores drags that start on a control', () => {
    const host = render(Window, {
      title: 'Notes',
      x: 5,
      toolbar: html('<button class="tb">t</button>'),
    });
    const tb = q(host, '.tb')!;
    pointer(tb, 'pointerdown', { clientX: 0 });
    pointer(q(host, '.titlebar')!, 'pointermove', { clientX: 100 });
    expect(q(host, 'section.window')?.style.getPropertyValue('--win-x')).toBe('5px');
  });
});

describe('MenuBar', () => {
  const menus = () => [
    {
      label: 'Notes',
      items: [
        { label: 'About', onselect: vi.fn() },
        { separator: true as const },
        { label: 'Quit', shortcut: '⌘Q', onselect: vi.fn() },
      ],
    },
    {
      label: 'View',
      items: [
        { label: 'Sidebar', checked: true },
        { label: 'Locked', disabled: true },
      ],
    },
  ];

  it('opens menus by click, switches on hover and picks items', async () => {
    const m = menus();
    const host = render(MenuBar, { menus: m, now: new Date(2026, 9, 1, 9, 41), name: 'Alex' });
    expect(q(host, '[role="menubar"]')).not.toBeNull();
    expect(q(host, 'time')?.textContent).toContain('9:41');
    // The day pill greets and keeps a wink for when you point at it.
    expect(q(host, '.hello')?.textContent).toBe('Good morning, Alex');
    expect(q(host, '.wink')?.textContent).toBeTruthy();
    const [notes, view] = qa(host, '.trigger');
    expect(notes?.classList.contains('app')).toBe(true);
    click(notes);
    await tick();
    expect(notes?.getAttribute('aria-expanded')).toBe('true');
    expect(document.activeElement?.textContent).toContain('About');
    view?.dispatchEvent(new PointerEvent('pointerenter'));
    await tick();
    flushSync();
    expect(view?.getAttribute('aria-expanded')).toBe('true');
    expect(q(host, '[role="menuitemcheckbox"]')?.getAttribute('aria-checked')).toBe('true');
    expect(q(host, '[aria-disabled="true"]')).not.toBeNull();
    click(view);
    expect(view?.getAttribute('aria-expanded')).toBe('false');
    click(notes);
    await tick();
    click(qa(host, '[role="menuitem"]').find((b) => b.textContent?.includes('Quit')));
    expect((m[0]!.items[2] as { onselect: () => void }).onselect).toHaveBeenCalled();
    expect(q(host, '[role="menu"]')).toBeNull();
  });

  it('works by keyboard', async () => {
    const host = render(MenuBar, { menus: menus(), clock: false, logo: 'sparkles' });
    const [logo, notes, view] = qa(host, '.trigger');
    expect(logo?.getAttribute('aria-label')).toBe('System');
    expect(q(host, 'time')).toBeNull();
    logo?.focus();
    key(logo!, 'ArrowRight');
    expect(document.activeElement).toBe(notes);
    key(notes!, 'ArrowLeft');
    expect(document.activeElement).toBe(logo);
    key(notes!, 'ArrowDown');
    await tick();
    const menu = q(host, '[role="menu"]')!;
    expect(document.activeElement?.textContent).toContain('About');
    key(document.activeElement!, 'ArrowDown');
    expect(document.activeElement?.textContent).toContain('Quit');
    key(document.activeElement!, 'ArrowRight');
    await tick();
    expect(view?.getAttribute('aria-expanded')).toBe('true');
    key(q(host, '[role="menu"]')!, 'Escape');
    expect(q(host, '[role="menu"]')).toBeNull();
    expect(document.activeElement).toBe(view);
    expect(menu.isConnected).toBe(false);
    key(view!, 'ArrowUp');
    await tick();
    expect(document.activeElement?.textContent).toContain('Sidebar');
    key(document.activeElement!, 'Tab');
    expect(q(host, '[role="menu"]')).toBeNull();
    key(view!, 'Enter');
    await tick();
    document.body.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
    flushSync();
    expect(q(host, '[role="menu"]')).toBeNull();
  });

  it('shows status items, as buttons when they act', () => {
    let seen: EventTarget | null = null;
    const onclick = vi.fn((e: MouseEvent) => (seen = e.currentTarget));
    const host = render(MenuBar, {
      clock: false,
      floating: true,
      status: [
        { icon: 'wifi', label: 'Wi-Fi' },
        { icon: 'battery', label: 'Battery', text: '82%' },
        { id: 'quick', icon: 'settings', label: 'Control Center', onclick, active: true },
      ],
      trailing: html('<span class="extra">x</span>'),
    });
    expect(q(host, '.menubar')?.classList.contains('floating')).toBe(true);
    expect(q(render(MenuBar, { floating: false }), '.menubar.floating')).toBeNull();
    expect(q(host, '.extra')).not.toBeNull();
    expect(host.textContent).toContain('82%');
    const cc = byLabel(host, 'Control Center')!;
    expect(cc.getAttribute('aria-pressed')).toBe('true');
    expect(cc.dataset['status']).toBe('quick');
    click(cc);
    // The item is handed over, so a panel can pop out of it.
    expect(seen).toBe(cc);
  });

  it('shows the bonbon system menu, the app pill and a clickable day pill', () => {
    const onday = vi.fn();
    const host = render(MenuBar, {
      logoMenu: [{ label: 'About' }],
      appIcon: 'edit',
      appColor: 'yellow',
      menus: [{ label: 'Notes', items: [] }],
      greet: false,
      greeting: () => ({ text: 'Moin', wink: 'Na?' }),
      onday,
    });
    const [system, app] = qa(host, '.trigger');
    expect(system?.getAttribute('aria-label')).toBe('System');
    expect(q(system!, '.bonbon')).not.toBeNull();
    expect(app?.classList.contains('app')).toBe(true);
    expect(q(app!, '.app-icon')).not.toBeNull();
    expect(q(host, '.hello')).toBeNull();
    click(q(host, 'button.day'));
    expect(onday).toHaveBeenCalled();
    const own = render(MenuBar, { greeting: () => ({ text: 'Moin', wink: 'Na?' }) });
    expect(q(own, '.hello')?.textContent).toBe('Moin');
    expect(q(own, '.wink')?.textContent).toBe('Na?');
  });

  it('ticks the clock', () => {
    vi.useFakeTimers();
    const host = render(MenuBar, { formatClock: (d) => String(d.getTime() > 0) });
    expect(q(host, '.clock-long')?.textContent?.trim()).toBe('true');
    vi.advanceTimersByTime(16_000);
    vi.useRealTimers();
  });
});

describe('Dock', () => {
  const items = [
    { id: 'mail', label: 'Mail', icon: 'mail' as const, color: 'blue', badge: 3, running: true },
    { separator: true as const },
    { id: 'notes', label: 'Notes', icon: 'edit' as const },
  ];

  it('names icons with badge and running state and reports a pick', () => {
    const onselect = vi.fn();
    const host = render(Dock, { items, onselect });
    const buttons = qa(host, 'button.item');
    expect(buttons[0]?.getAttribute('aria-label')).toBe('Mail, 3, running');
    expect(buttons[1]?.getAttribute('aria-label')).toBe('Notes');
    expect(q(host, '[role="separator"]')).not.toBeNull();
    expect(q(host, '.run.on')).not.toBeNull();
    expect(q(host, '.run.active')).toBeNull();
    click(buttons[1]);
    expect(onselect).toHaveBeenCalledWith(expect.objectContaining({ id: 'notes' }));
    expect(buttons[1]?.tabIndex).toBe(0);
    // One jelly squish per click, cleared when it ends.
    const lift = q(buttons[1]!, '.lift')!;
    expect(lift.classList.contains('squish')).toBe(true);
    lift.dispatchEvent(new Event('animationend', { bubbles: true }));
    flushSync();
    expect(lift.classList.contains('squish')).toBe(false);
  });

  it('moves between icons with arrows', () => {
    const host = render(Dock, { items });
    const buttons = qa(host, 'button.item');
    buttons[0]?.focus();
    key(buttons[0]!, 'ArrowRight');
    expect(document.activeElement).toBe(buttons[1]);
    expect(buttons[1]?.tabIndex).toBe(0);
  });

  it('opens the candy jar and marks the front app', () => {
    const onjar = vi.fn();
    const host = render(Dock, {
      items: [{ id: 'mail', label: 'Mail', running: true, active: true }, ...items.slice(1)],
      onjar,
      jarOpen: true,
      jarLabel: 'Everything',
      icon: html('<span class="custom">i</span>'),
    });
    expect(q(host, '.custom')).not.toBeNull();
    const [jar, mail] = qa(host, 'button.item');
    expect(jar?.getAttribute('aria-label')).toBe('Everything');
    expect(jar?.getAttribute('aria-expanded')).toBe('true');
    expect(jar?.tabIndex).toBe(0);
    expect(mail?.getAttribute('aria-current')).toBe('true');
    expect(q(host, '.run.active')).not.toBeNull();
    click(jar);
    expect(onjar).toHaveBeenCalled();
    jar?.focus();
    key(jar!, 'ArrowRight');
    expect(document.activeElement).toBe(mail);
  });
});

describe('AppJar', () => {
  it('groups apps by category and searches across them', async () => {
    const host = render(AppJar, {
      open: true,
      apps: [
        { id: 'a', label: 'Mail', category: 'Everyday' },
        { id: 'b', label: 'Code', category: 'Work' },
        { id: 'c', label: 'Odd one' },
      ],
      otherLabel: 'Leftovers',
    });
    await tick();
    expect(qa(host, 'h3').map((h) => h.textContent)).toEqual(['Everyday', 'Work', 'Leftovers']);
    input(q<HTMLInputElement>(host, 'input')!, 'work');
    expect(qa(host, 'h3').map((h) => h.textContent)).toEqual(['Results']);
    expect(qa(host, '.grid button')).toHaveLength(1);
  });

  const apps = [
    { id: 'mail', label: 'Mail', icon: 'mail' as const },
    { id: 'maps', label: 'Maps', icon: 'map' as const, badge: 1 },
    { id: 'notes', label: 'Notes', icon: 'edit' as const },
  ];

  it('filters, opens the first match on Enter and closes', async () => {
    const onselect = vi.fn();
    const onclose = vi.fn();
    const host = render(AppJar, { open: true, apps, onselect, onclose });
    await tick();
    const search = q<HTMLInputElement>(host, 'input')!;
    expect(document.activeElement).toBe(search);
    expect(qa(host, '.grid button')).toHaveLength(3);
    input(search, 'ma');
    expect(qa(host, '.grid button')).toHaveLength(2);
    key(search, 'Enter');
    expect(onselect).toHaveBeenCalledWith(expect.objectContaining({ id: 'mail' }));
    expect(onclose).toHaveBeenCalled();
    expect(q(host, '[role="dialog"]')).toBeNull();
  });

  it('navigates the grid with arrows and closes on Escape or a background click', async () => {
    const onclose = vi.fn();
    const host = render(AppJar, { open: true, apps, onclose });
    await tick();
    const search = q<HTMLInputElement>(host, 'input')!;
    key(search, 'ArrowDown');
    const buttons = qa(host, '.grid button');
    expect(document.activeElement).toBe(buttons[0]);
    key(buttons[0]!, 'ArrowRight');
    expect(document.activeElement).toBe(buttons[1]);
    key(buttons[1]!, 'End');
    expect(document.activeElement).toBe(buttons[2]);
    // No layout in happy-dom: every icon is on one row, so Up leaves for the search field.
    key(buttons[2]!, 'ArrowUp');
    expect(document.activeElement).toBe(search);
    key(search, 'x');
    key(search, 'Escape');
    expect(onclose).toHaveBeenCalledTimes(1);
  });

  it('shows the empty text and closes on a background click', async () => {
    const host = render(AppJar, { open: true, apps, query: 'zzz', emptyText: 'Nothing' });
    await tick();
    expect(q(host, '.empty')?.textContent).toBe('Nothing');
    pointer(q(host, '.jar')!, 'pointerdown');
    click(q(host, '[role="dialog"]'));
    expect(q(host, '[role="dialog"]')).not.toBeNull();
    pointer(q(host, '[role="dialog"]')!, 'pointerdown');
    click(q(host, '[role="dialog"]'));
    expect(q(host, '[role="dialog"]')).toBeNull();
  });
});

describe('QuickSettings', () => {
  const toggles = [
    { id: 'wifi', label: 'Wi-Fi', icon: 'wifi' as const, on: true, detail: 'Home' },
    { id: 'bt', label: 'Bluetooth', icon: 'bluetooth' as const, on: false },
  ];

  it('toggles tiles, moves sliders and drives the player', () => {
    const ontoggle = vi.fn();
    const onplaypause = vi.fn();
    const onnext = vi.fn();
    const onprevious = vi.fn();
    const host = render(QuickSettings, {
      toggles,
      ontoggle,
      brightness: 40,
      volume: 70,
      nowPlaying: { title: 'Sunrise', artist: 'Example Band', playing: true },
      onplaypause,
      onnext,
      onprevious,
      children: html('<div class="extra">x</div>'),
    });
    const [wifi, bt] = qa(host, '.toggle');
    expect(wifi?.getAttribute('aria-pressed')).toBe('true');
    expect(wifi?.textContent).toContain('Home');
    click(bt);
    expect(ontoggle).toHaveBeenCalledWith('bt', true);
    const [brightness] = qa(host, 'input[type="range"]');
    input(brightness, '80');
    expect(q(host, '.slider')?.style.getPropertyValue('--fill')).toBe('80%');
    click(byLabel(host, 'Pause'));
    click(byLabel(host, 'Next track'));
    click(byLabel(host, 'Previous track'));
    expect(onplaypause).toHaveBeenCalled();
    expect(onnext).toHaveBeenCalled();
    expect(onprevious).toHaveBeenCalled();
    expect(q(host, '.extra')).not.toBeNull();
    // Inline panels do not close.
    key(q(host, '.cc')!, 'Escape');
    expect(q(host, '.cc')).not.toBeNull();
  });

  it('closes a floating panel on Escape and on an outside click', () => {
    const onclose = vi.fn();
    const host = render(QuickSettings, { toggles, floating: true, onclose, volume: 10 });
    expect(q(host, '[role="dialog"]')).not.toBeNull();
    key(q(host, '.cc')!, 'Escape');
    expect(onclose).toHaveBeenCalledTimes(1);
    expect(q(host, '.cc')).toBeNull();

    const other = render(QuickSettings, { toggles, floating: true, onclose });
    document.body.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
    flushSync();
    expect(q(other, '.cc')).toBeNull();
    expect(onclose).toHaveBeenCalledTimes(2);
  });
});

describe('Widget', () => {
  it('is a titled region by default, a button with onclick and a link with href', () => {
    const plain = render(Widget, {
      title: 'Weather',
      icon: 'sun',
      meta: 'now',
      color: 'blue',
      filled: true,
      children: html('<b>21°</b>'),
    });
    const section = q(plain, 'section')!;
    expect(section.getAttribute('aria-label')).toBe('Weather');
    expect(section.classList.contains('filled')).toBe(true);
    expect(section.style.getPropertyValue('--widget-color')).toBe('var(--color-blue)');
    expect(plain.textContent).toContain('now');

    const onclick = vi.fn();
    const button = render(Widget, { size: 'medium', title: 'Music', label: 'Open music', onclick });
    const b = q(button, 'button')!;
    expect(b.getAttribute('aria-label')).toBe('Open music');
    click(b);
    expect(onclick).toHaveBeenCalled();

    const link = render(Widget, { size: 'large', href: '#x', image: 'a.jpg' });
    const a = q(link, 'a')!;
    expect(a.getAttribute('href')).toBe('#x');
    expect(a.style.backgroundImage).toContain('a.jpg');
    expect(q(render(Widget, {}), '[role="group"]')).not.toBeNull();
    const figure = render(Widget, { title: 'Today', figure: 21, caption: 'Sunday' });
    expect(q(figure, '.figure')?.textContent).toBe('21');
    expect(q(figure, '.caption')?.textContent).toBe('Sunday');
  });
});

describe('ContextMenu', () => {
  it('opens at the pointer, picks, and builds items per target', async () => {
    const onselect = vi.fn();
    const onclose = vi.fn();
    const host = render(ContextMenu, {
      onopen: () => [{ label: 'Rename', icon: 'edit', shortcut: '⏎', onselect }],
      onclose,
      children: html('<p class="target">row</p>'),
    });
    q(host, '.target')?.dispatchEvent(
      new MouseEvent('contextmenu', { bubbles: true, cancelable: true, clientX: 30, clientY: 40 }),
    );
    await tick();
    flushSync();
    const layer = document.querySelector<HTMLElement>('.bb-context-menu')!;
    expect(layer.style.left).toBe('30px');
    expect(document.activeElement?.textContent).toContain('Rename');
    click(document.querySelector('[role="menuitem"]'));
    expect(onselect).toHaveBeenCalled();
    expect(onclose).toHaveBeenCalled();
  });

  it('opens from the keyboard and closes on Escape or outside clicks', async () => {
    const host = render(ContextMenu, {
      items: [{ label: 'Copy' }, { label: 'Delete', danger: true }],
      children: html('<button class="target">row</button>'),
    });
    const target = q(host, '.target')!;
    target.focus();
    key(target, 'F10', { shiftKey: true });
    await tick();
    flushSync();
    const items = qa(document, '[role="menuitem"]');
    expect(items).toHaveLength(2);
    expect(items[1]?.classList.contains('danger')).toBe(true);
    key(items[0]!, 'ArrowDown');
    expect(document.activeElement).toBe(items[1]);
    key(items[1]!, 'Escape');
    expect(document.querySelector('[role="menu"]')).toBeNull();
    expect(document.activeElement).toBe(target);

    key(target, 'ContextMenu');
    await tick();
    document.body.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
    flushSync();
    expect(document.querySelector('[role="menu"]')).toBeNull();
    key(target, 'x');
    expect(document.querySelector('[role="menu"]')).toBeNull();
  });

  it('stays closed when disabled or empty', async () => {
    const host = render(ContextMenu, {
      items: [{ label: 'Copy' }],
      disabled: true,
      children: html('<p class="target">row</p>'),
    });
    q(host, '.target')?.dispatchEvent(new MouseEvent('contextmenu', { bubbles: true }));
    await tick();
    expect(document.querySelector('[role="menu"]')).toBeNull();
    const empty = render(ContextMenu, { children: html('<p class="target">row</p>') });
    const event = new MouseEvent('contextmenu', { bubbles: true, cancelable: true });
    q(empty, '.target')?.dispatchEvent(event);
    await tick();
    expect(event.defaultPrevented).toBe(false);
  });
});

describe('CommandPalette', () => {
  const groups = () => [
    {
      label: 'Files',
      items: [
        { id: 'new', label: 'New file', icon: 'plus' as const, shortcut: ['⌘', 'N'] },
        { id: 'open', label: 'Open…', description: 'Browse files', keywords: ['finder'] },
      ],
    },
    { label: 'View', items: [{ id: 'dark', label: 'Dark mode', onselect: vi.fn() }] },
  ];

  it('filters, moves the active option and runs it', async () => {
    const onselect = vi.fn();
    const g = groups();
    const host = render(CommandPalette, { open: true, groups: g, onselect });
    await tick();
    const field = q<HTMLInputElement>(host, '[role="combobox"]')!;
    expect(q(host, 'dialog')?.hasAttribute('open')).toBe(true);
    expect(qa(host, '[role="option"]')).toHaveLength(3);
    expect(qa(host, 'kbd').map((k) => k.textContent)).toContain('⌘');
    key(field, 'ArrowUp');
    expect(field.getAttribute('aria-activedescendant')).toMatch(/opt-2$/);
    key(field, 'ArrowDown');
    expect(field.getAttribute('aria-activedescendant')).toMatch(/opt-0$/);
    input(field, 'finder');
    expect(qa(host, '[role="option"]')).toHaveLength(1);
    key(field, 'Enter');
    expect(onselect).toHaveBeenCalledWith(expect.objectContaining({ id: 'open' }));
    expect(q(host, '[role="combobox"]')).toBeNull();
  });

  it('runs a clicked option and shows the empty text', async () => {
    const g = groups();
    const host = render(CommandPalette, { open: true, groups: g, emptyText: 'Nothing' });
    await tick();
    click(qa(host, '[role="option"]')[2]);
    expect((g[1]!.items[0] as { onselect: () => void }).onselect).toHaveBeenCalled();

    const other = render(CommandPalette, { open: true, groups: g, query: 'zzz' });
    await tick();
    expect(other.textContent).toContain('Nothing here');
    const field = q<HTMLInputElement>(other, '[role="combobox"]')!;
    key(field, 'ArrowDown');
    key(field, 'Enter');
    key(field, 'Escape');
    expect(q(other, '[role="combobox"]')).toBeNull();
  });

  it('toggles with ⌘K / Ctrl+K unless the hotkey is off', async () => {
    const onclose = vi.fn();
    const host = render(CommandPalette, { groups: groups(), onclose });
    expect(q(host, '[role="combobox"]')).toBeNull();
    key(document.body, 'k', { ctrlKey: true });
    await tick();
    expect(q(host, '[role="combobox"]')).not.toBeNull();
    key(document.body, 'K', { metaKey: true });
    expect(q(host, '[role="combobox"]')).toBeNull();
    expect(onclose).toHaveBeenCalled();
    key(document.body, 'j', { metaKey: true });
    expect(q(host, '[role="combobox"]')).toBeNull();

    const off = render(CommandPalette, { groups: groups(), hotkey: false });
    key(document.body, 'k', { ctrlKey: true });
    expect(q(off, '[role="combobox"]')).toBeNull();
  });

  it('closes on cancel and a backdrop click', async () => {
    const host = render(CommandPalette, { open: true, groups: groups() });
    await tick();
    const dialog = q<HTMLDialogElement>(host, 'dialog')!;
    dialog.dispatchEvent(new Event('cancel', { cancelable: true }));
    flushSync();
    expect(q(host, '[role="combobox"]')).toBeNull();
    const other = render(CommandPalette, { open: true, groups: groups() });
    await tick();
    // Released on the backdrop after a press inside: a drag, not a click beside it.
    pointer(q(other, 'input')!, 'pointerdown');
    click(q(other, 'dialog'));
    expect(q(other, '[role="combobox"]')).not.toBeNull();
    pointer(q(other, 'dialog')!, 'pointerdown');
    click(q(other, 'dialog'));
    expect(q(other, '[role="combobox"]')).toBeNull();
  });
});

describe('Toolbar', () => {
  it('renders buttons, separators, spacer, title and search', () => {
    const onclick = vi.fn();
    const host = render(Toolbar, {
      title: 'Inbox',
      subtitle: '12 unread',
      search: '',
      variant: 'bar',
      items: [
        { icon: 'edit', label: 'Compose', onclick },
        { separator: true },
        { icon: 'trash', label: 'Delete', disabled: true },
        { icon: 'list', label: 'List', active: true, showLabel: true },
        { spacer: true },
      ],
      leading: html('<span class="lead">l</span>'),
      children: html('<span class="kids">k</span>'),
      trailing: html('<span class="trail">t</span>'),
    });
    const bar = q(host, '[role="toolbar"]')!;
    expect(bar.getAttribute('aria-label')).toBe('Inbox');
    expect(bar.classList.contains('toolbar--bar')).toBe(true);
    expect(q(host, '.spacer')).not.toBeNull();
    expect(q(host, '[role="separator"]')).not.toBeNull();
    expect(q(host, 'input[type="search"], input')).not.toBeNull();
    for (const s of ['.lead', '.kids', '.trail']) expect(q(host, s)).not.toBeNull();
    const tools = qa(host, '.tool');
    expect(tools[0]?.getAttribute('aria-label')).toBe('Compose');
    expect(tools[2]?.getAttribute('aria-pressed')).toBe('true');
    expect(tools[2]?.textContent).toContain('List');
    click(tools[0]);
    expect(onclick).toHaveBeenCalled();
  });

  it('roves between enabled buttons', () => {
    const host = render(Toolbar, {
      items: [
        { icon: 'edit', label: 'A' },
        { icon: 'trash', label: 'B', disabled: true },
        { icon: 'list', label: 'C' },
      ],
    });
    const tools = qa(host, '.tool');
    expect(q(host, 'input')).toBeNull();
    tools[0]?.focus();
    key(tools[0]!, 'ArrowRight');
    expect(document.activeElement).toBe(tools[2]);
    key(tools[2]!, 'ArrowRight');
    expect(document.activeElement).toBe(tools[0]);
    key(tools[0]!, 'ArrowLeft');
    expect(document.activeElement).toBe(tools[2]);
    expect(tools[2]?.tabIndex).toBe(0);
    key(tools[2]!, 'Enter');
    key(q(host, '[role="toolbar"]')!, 'ArrowLeft');
  });

  describe('folding into More', () => {
    let width = 1000;
    beforeEach(() => {
      // happy-dom has no layout: every visible tool is 50px wide, the toolbar `width`.
      Object.defineProperty(HTMLElement.prototype, 'scrollWidth', {
        configurable: true,
        get(this: HTMLElement) {
          if (!this.matches('[role="toolbar"]')) return 0;
          return qa(this, '.tool').filter((t) => !t.hidden).length * 50;
        },
      });
      Object.defineProperty(HTMLElement.prototype, 'clientWidth', {
        configurable: true,
        get(this: HTMLElement) {
          return this.matches('[role="toolbar"]') ? width : 0;
        },
      });
    });
    afterEach(() => {
      delete (HTMLElement.prototype as { scrollWidth?: number }).scrollWidth;
      delete (HTMLElement.prototype as { clientWidth?: number }).clientWidth;
    });
    const frame = () => new Promise((resolve) => setTimeout(resolve, 40));
    const entries = (onclick = vi.fn()) => [
      { icon: 'edit' as const, label: 'Compose', primary: true },
      { separator: true as const },
      { icon: 'bookmark' as const, label: 'Archive' },
      { icon: 'trash' as const, label: 'Delete', onclick },
      { icon: 'flag' as const, label: 'Flag', active: true },
    ];

    it('folds from the end into a labelled More with a count and a menu', async () => {
      width = 170;
      const onclick = vi.fn();
      const host = render(Toolbar, { items: entries(onclick), moreLabel: 'More tools' });
      await frame();
      flushSync();
      const shown = qa(host, '.tool').filter((t) => !t.hidden);
      expect(shown.map((t) => t.getAttribute('aria-label'))).toEqual([
        'Compose',
        'Archive',
        'More tools',
      ]);
      const more = q(host, '.more')!;
      expect(more.getAttribute('aria-haspopup')).toBe('menu');
      expect(more.getAttribute('aria-expanded')).toBe('false');
      expect(more.title).toBe('More tools');
      expect(q(more, '.count')?.textContent).toBe('2');
      click(more);
      expect(more.getAttribute('aria-expanded')).toBe('true');
      const menu = document.querySelector('[role="menu"]')!;
      expect(menu.getAttribute('aria-label')).toBe('More tools');
      const picks = [...menu.querySelectorAll<HTMLElement>('[role^="menuitem"]')];
      expect(picks.map((p) => p.textContent?.trim())).toEqual(['Delete', 'Flag']);
      // A toggled tool keeps its state as a check mark.
      expect(picks[1]?.getAttribute('aria-checked')).toBe('true');
      click(picks[0]);
      expect(onclick).toHaveBeenCalled();
      expect(document.querySelector('[role="menu"]')).toBeNull();
      expect(more.getAttribute('aria-expanded')).toBe('false');
    });

    it('keeps the primary tool, hides separators with nothing beside them', async () => {
      width = 60;
      const host = render(Toolbar, { items: entries() });
      await frame();
      flushSync();
      const shown = qa(host, '.tool').filter((t) => !t.hidden);
      expect(shown.map((t) => t.getAttribute('aria-label'))).toEqual(['Compose', 'More']);
      expect(q(host, '.count')?.textContent).toBe('3');
      expect(q(host, '[role="separator"]')).toBeNull();
      // Roving skips folded tools: More is the next stop.
      shown[0]?.focus();
      key(shown[0]!, 'ArrowRight');
      expect(document.activeElement).toBe(shown[1]);
    });

    it('shows everything when it fits, or when folding is off', async () => {
      width = 1000;
      const host = render(Toolbar, { items: entries() });
      await frame();
      expect(q(host, '.more')).toBeNull();
      expect(q(host, '[role="separator"]')).not.toBeNull();
      width = 60;
      const off = render(Toolbar, { items: entries(), collapse: false });
      await frame();
      expect(q(off, '.more')).toBeNull();
      expect(qa(off, '.tool').every((t) => !t.hidden)).toBe(true);
    });
  });
});

describe('SourceList', () => {
  const sections = [
    {
      title: 'Favourites',
      items: [
        { id: 'inbox', label: 'Inbox', icon: 'inbox' as const, count: 12 },
        { id: 'sent', label: 'Sent', icon: 'send' as const, color: 'green' },
        { id: 'old', label: 'Archive', disabled: true },
      ],
    },
    { title: 'Tags', collapsible: true, collapsed: true, items: [{ id: 'red', label: 'Red' }] },
    { items: [{ id: 'trash', label: 'Trash', count: '' }] },
  ];

  it('selects items, shows counts and folds sections', () => {
    const onselect = vi.fn();
    const host = render(SourceList, { sections, onselect, label: 'Mailboxes' });
    expect(q(host, 'nav')?.getAttribute('aria-label')).toBe('Mailboxes');
    expect(q(host, '.count')?.textContent).toBe('12');
    expect(qa(host, '.count')).toHaveLength(1);
    const items = qa(host, '.item');
    expect(items[0]?.tabIndex).toBe(0);
    click(items[1]);
    expect(items[1]?.getAttribute('aria-current')).toBe('true');
    expect(onselect).toHaveBeenCalledWith(expect.objectContaining({ id: 'sent' }));
    click(items[2]);
    expect(onselect).toHaveBeenCalledTimes(1);

    const heading = q(host, 'button.heading')!;
    expect(heading.getAttribute('aria-expanded')).toBe('false');
    expect(host.textContent).not.toContain('Red');
    click(heading);
    expect(heading.getAttribute('aria-expanded')).toBe('true');
    expect(host.textContent).toContain('Red');
  });

  it('moves with Up and Down', () => {
    const host = render(SourceList, { sections, value: 'sent' });
    const items = qa(host, '.item');
    expect(items[1]?.tabIndex).toBe(0);
    items[1]?.focus();
    key(items[1]!, 'ArrowDown');
    expect(document.activeElement).toBe(q(host, 'button.heading'));
    key(document.activeElement!, 'ArrowUp');
    expect(document.activeElement).toBe(items[1]);
  });
});

describe('TreeView', () => {
  const nodes = [
    {
      id: 'src',
      label: 'src',
      children: [
        { id: 'app', label: 'App.svelte', meta: '2 KB', color: 'orange' },
        { id: 'lib', label: 'lib', children: [{ id: 'x', label: 'x.ts' }] },
      ],
    },
    { id: 'readme', label: 'README.md', icon: 'file-text' as const },
  ];

  it('expands, steps in and out, and selects by keyboard', () => {
    const onselect = vi.fn();
    const ontoggle = vi.fn();
    const host = render(TreeView, { nodes, label: 'Files', onselect, ontoggle });
    const tree = q(host, '[role="tree"]')!;
    expect(tree.getAttribute('aria-label')).toBe('Files');
    const src = q(host, '[data-id="src"]')!;
    expect(src.tabIndex).toBe(0);
    expect(src.getAttribute('aria-expanded')).toBe('false');
    src.focus();
    key(src, 'ArrowRight');
    expect(src.getAttribute('aria-expanded')).toBe('true');
    expect(ontoggle).toHaveBeenCalledWith(expect.objectContaining({ id: 'src' }), true);
    key(src, 'ArrowRight');
    const app = q(host, '[data-id="app"]')!;
    expect(document.activeElement).toBe(app);
    expect(app.getAttribute('aria-level')).toBe('2');
    key(app, 'ArrowDown');
    expect(document.activeElement).toBe(q(host, '[data-id="lib"]'));
    key(document.activeElement!, 'ArrowUp');
    key(app, 'Enter');
    expect(app.getAttribute('aria-selected')).toBe('true');
    expect(onselect).toHaveBeenCalledWith(expect.objectContaining({ id: 'app' }));
    key(app, 'ArrowLeft');
    expect(document.activeElement).toBe(src);
    key(src, 'End');
    expect(document.activeElement).toBe(q(host, '[data-id="readme"]'));
    key(document.activeElement!, 'Home');
    expect(document.activeElement).toBe(src);
    key(src, 'ArrowLeft');
    expect(src.getAttribute('aria-expanded')).toBe('false');
    key(src, 'x');
  });

  it('toggles with the arrow and selects with a click', () => {
    const host = render(TreeView, { nodes, label: 'Files', expanded: ['src'] });
    expect(q(host, '[data-id="app"]')).not.toBeNull();
    click(q(host, '[data-id="src"] .twisty'));
    expect(q(host, '[data-id="app"]')).toBeNull();
    q(host, '[data-id="src"] > .row')?.dispatchEvent(new MouseEvent('dblclick', { bubbles: true }));
    flushSync();
    expect(q(host, '[data-id="app"]')).not.toBeNull();
    click(q(host, '[data-id="readme"] > .row'));
    expect(q(host, '[data-id="readme"]')?.getAttribute('aria-selected')).toBe('true');
    // Leaf: Right does nothing; Left goes to the (missing) parent and stays.
    const readme = q(host, '[data-id="readme"]')!;
    readme.focus();
    key(readme, 'ArrowRight');
    key(readme, 'ArrowLeft');
    expect(document.activeElement).toBe(readme);
  });
});

describe('Inspector', () => {
  it('renders a header, sections and rows', () => {
    const host = render(Inspector, {
      title: 'report.pdf',
      subtitle: 'PDF · 2 MB',
      surface: true,
      preview: html('<img class="pv" alt="" />'),
      actions: html('<button class="act">Share</button>'),
      children: html('<div class="kids">rows</div>'),
    });
    expect(q(host, 'aside')?.getAttribute('aria-label')).toBe('report.pdf');
    expect(q(host, '.surface')).not.toBeNull();
    for (const s of ['.pv', '.act', '.kids']) expect(q(host, s)).not.toBeNull();
    expect(q(render(Inspector, {}), 'aside')?.getAttribute('aria-label')).toBe('Inspector');
  });

  it('folds a collapsible section', () => {
    const host = render(InspectorSection, {
      title: 'Sharing',
      collapsible: true,
      children: html('<p class="row">r</p>'),
    });
    const toggle = q(host, 'button')!;
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    click(toggle);
    expect(q(host, '.row')).toBeNull();
    const plain = render(InspectorSection, { title: 'General', children: html('<p>r</p>') });
    expect(q(plain, 'h3')?.textContent).toBe('General');
  });

  it('labels values and controls', () => {
    const text = render(InspectorRow, { label: 'Kind', value: 'PDF', hint: 'Detected' });
    expect(text.textContent).toContain('PDF');
    expect(text.textContent).toContain('Detected');
    const control = render(InspectorRow, {
      label: 'Name',
      for: 'name',
      children: html('<input id="name" />'),
    });
    expect(q(control, 'label')?.getAttribute('for')).toBe('name');
  });
});

describe('StatusBar', () => {
  it('renders segments, tones and clickable ones', () => {
    const onclick = vi.fn();
    const host = render(StatusBar, {
      items: [{ label: '24 items' }, { label: 'Synced', dot: true, tone: 'ok', icon: 'check' }],
      trailing: [{ id: 'pos', label: 'Ln 1, Col 1', onclick, title: 'Go to line' }],
      children: html('<span class="mid">m</span>'),
    });
    expect(q(host, '[role="status"]')).not.toBeNull();
    expect(q(host, '.seg--ok .dot')).not.toBeNull();
    expect(q(host, '.mid')).not.toBeNull();
    click(q(host, 'button.seg'));
    expect(onclick).toHaveBeenCalled();
  });
});

describe('Notifications', () => {
  it('opens, acts and dismisses a banner', () => {
    const onopen = vi.fn();
    const onclose = vi.fn();
    const act = vi.fn();
    const host = render(NotificationBanner, {
      app: 'Mail',
      icon: 'mail',
      color: 'blue',
      title: 'Ana Example',
      body: 'Lunch on Friday?',
      time: 'now',
      actions: [{ label: 'Reply', onclick: act }],
      onopen,
      onclose,
    });
    expect(q(host, 'h3')?.textContent).toBe('Ana Example');
    expect(host.textContent).toContain('now');
    click(q(host, '.open'));
    click(q(host, '.action'));
    click(byLabel(host, 'Dismiss'));
    expect(onopen).toHaveBeenCalled();
    expect(act).toHaveBeenCalled();
    expect(onclose).toHaveBeenCalled();
    const bare = render(NotificationBanner, { app: 'System', title: 'Update' });
    expect(q(bare, '.open')).toBeNull();
    expect(q(bare, '.close')).toBeNull();
  });

  it('stacks notifications, caps them and dismisses them after a while', () => {
    vi.useFakeTimers();
    const onclose = vi.fn();
    const onopen = vi.fn();
    const notifications = ['a', 'b', 'c'].map((id) => ({ id, app: 'Mail', title: `T${id}` }));
    const host = render(NotificationCenter, {
      notifications,
      max: 2,
      duration: 1000,
      onclose,
      onopen,
    });
    expect(qa(host, '.banner')).toHaveLength(2);
    click(q(host, '.open'));
    expect(onopen).toHaveBeenCalledWith(expect.objectContaining({ id: 'a' }));
    const center = q(host, '.center')!;
    center.dispatchEvent(new PointerEvent('pointerenter'));
    flushSync();
    vi.advanceTimersByTime(1500);
    expect(onclose).not.toHaveBeenCalled();
    center.dispatchEvent(new PointerEvent('pointerleave'));
    flushSync();
    vi.advanceTimersByTime(1000);
    expect(onclose).toHaveBeenCalledWith('a');
    expect(onclose).toHaveBeenCalledWith('b');
    vi.useRealTimers();
  });
});

describe('isSeparator', () => {
  it('tells separators from menu items', () => {
    expect(isSeparator({ separator: true })).toBe(true);
    expect(isSeparator({ label: 'Open' })).toBe(false);
  });
});
