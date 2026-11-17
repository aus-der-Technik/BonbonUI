// The phone and touch pieces: bottom sheets, joined controls, the row's "⋯", the bottom bar,
// panels side by side and the full-screen dialog.
import { flushSync } from 'svelte';
import { click, html, key, render } from '../test/render';
import SheetGrip from './atoms/SheetGrip.svelte';
import Joined from './molecules/Joined.svelte';
import MoreButton from './molecules/MoreButton.svelte';
import Popover from './molecules/Popover.svelte';
import BottomBar from './organisms/BottomBar.svelte';
import Dialog from './organisms/Dialog.svelte';
import PanelStackFixture from './organisms/PanelStackFixture.test.svelte';
import { fitsBeside, placement } from './organisms/panels.svelte';

beforeAll(() => {
  vi.stubGlobal('matchMedia', (query: string) => ({
    matches: query.includes('reduce'),
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  }));
});
afterAll(() => vi.unstubAllGlobals());

describe('SheetGrip', () => {
  it('marks its panel as a sheet of the asked size and closes on a tap', () => {
    const close = vi.fn();
    const host = render(SheetGrip, { close, size: 'half', label: 'Close the places' });
    const grip = host.querySelector('[data-sheet-grip]');
    expect(grip?.getAttribute('data-sheet-grip')).toBe('half');
    const bar = host.querySelector('[role="button"]')!;
    expect(bar.getAttribute('aria-label')).toBe('Close the places');
    expect(bar.hasAttribute('tabindex')).toBe(false);
    click(bar);
    expect(close).toHaveBeenCalledOnce();
  });

  it('comes first in a Popover asked for a sheet', () => {
    render(Popover, {
      label: 'Apps',
      open: true,
      sheet: 'full',
      title: 'All apps',
      children: html('<p>x</p>'),
    });
    const panel = document.querySelector('[popover]')!;
    expect(panel.firstElementChild?.getAttribute('data-sheet-grip')).toBe('full');
  });

  it('is not there without `sheet`', () => {
    render(Popover, { label: 'Apps', open: true, children: html('<p>x</p>') });
    expect(document.querySelector('[data-sheet-grip]')).toBeNull();
  });
});

describe('Joined', () => {
  it('marks its parts first to last, at any depth, and a filled one as a pill of its own', async () => {
    const host = render(Joined, {
      label: 'Find or start',
      children: html(
        '<div><label class="search"><input /></label><span><button class="btn btn--secondary">A</button></span><button class="btn btn--primary">New</button></div>',
      ),
    });
    const group = host.querySelector('[role="group"]')!;
    expect(group.getAttribute('aria-label')).toBe('Find or start');
    // happy-dom has no layout: every part counts as visible.
    const parts = [...host.querySelectorAll('[data-joined]')].map((el) =>
      el.getAttribute('data-joined'),
    );
    expect(parts).toEqual(['first', 'mid', 'last']);
    expect(host.querySelector('.btn--primary')!.hasAttribute('data-joined-fill')).toBe(true);
    expect(host.querySelector('.btn--secondary')!.hasAttribute('data-joined-fill')).toBe(false);
    expect(host.querySelector('span')!.hasAttribute('data-joined-wrap')).toBe(true);
  });
});

describe('MoreButton', () => {
  it('is a named button that opens a panel', () => {
    const onclick = vi.fn();
    const host = render(MoreButton, { label: 'Change Ada', onclick, show: 'always' });
    const button = host.querySelector('button')!;
    expect(button.getAttribute('aria-label')).toBe('Change Ada');
    expect(button.getAttribute('aria-haspopup')).toBe('dialog');
    expect(button.classList.contains('show-always')).toBe(true);
    click(button);
    expect(onclick).toHaveBeenCalledOnce();
  });
});

describe('BottomBar', () => {
  const items = [
    { id: 'home', label: 'Home', icon: 'home' as const, href: '#home' },
    { id: 'mail', label: 'Mail', icon: 'mail' as const, href: '#mail', color: 'blue', badge: 3 },
    { id: 'files', label: 'Files', icon: 'folder' as const, href: '#files', color: 'brown' },
  ];

  it('shows its places with their badges and marks the current one', () => {
    const host = render(BottomBar, { items, current: 'files', label: 'Places' });
    const nav = host.querySelector('nav')!;
    expect(nav.getAttribute('aria-label')).toBe('Places');
    const links = [...nav.querySelectorAll('a')];
    expect(links.map((a) => a.getAttribute('aria-label'))).toEqual([
      'Home',
      'Mail, 3 new',
      'Files',
    ]);
    expect(links[2]!.getAttribute('aria-current')).toBe('page');
    expect(nav.querySelector('.badge')?.textContent).toBe('3');
  });

  it('caps a badge at 99+ and puts a dot on "More" for news in a place it does not show', () => {
    const more = [
      ...items,
      { id: 'chat', label: 'Chat', icon: 'chat' as const, href: '#chat', badge: 120 },
    ];
    const host = render(BottomBar, {
      items: items.slice(0, 2),
      more,
      moreLabel: 'Apps',
      moreDotLabel: 'News',
    });
    expect(host.querySelector('.dot')?.getAttribute('aria-label')).toBe('News');
    click([...host.querySelectorAll('button')].find((b) => b.textContent?.includes('Apps')));
    const sheet = document.querySelector('[popover]')!;
    expect(sheet.firstElementChild?.hasAttribute('data-sheet-grip')).toBe(true);
    expect([...sheet.querySelectorAll('.tile-name')].map((t) => t.textContent)).toEqual([
      'Home',
      'Mail',
      'Files',
      'Chat',
    ]);
    expect([...sheet.querySelectorAll('.badge')].map((b) => b.textContent)).toEqual(['3', '99+']);
  });

  it('has no "More" without places for it', () => {
    const host = render(BottomBar, { items });
    expect(host.querySelector('.dot, [aria-haspopup]')).toBeNull();
  });
});

describe('Dialog on a phone', () => {
  it('takes the whole screen with phone="full"', () => {
    const host = render(Dialog, {
      open: true,
      title: 'New connection',
      phone: 'full',
      onclose: () => {},
      children: html('<p>form</p>'),
    });
    expect(host.querySelector('dialog')!.classList.contains('full')).toBe(true);
  });
  it('is a bottom sheet by default', () => {
    const host = render(Dialog, {
      open: true,
      title: 'Rename',
      onclose: () => {},
      children: html('<p>x</p>'),
    });
    expect(host.querySelector('dialog')!.classList.contains('full')).toBe(false);
  });
});

describe('panels beside each other', () => {
  it('fit beside each other only where both and the gaps fit, never on a phone', () => {
    expect(fitsBeside([320, 320], 1440, false)).toBe(true);
    expect(fitsBeside([480, 480], 900, false)).toBe(false);
    expect(fitsBeside([320, 320], 1440, true)).toBe(false);
    expect(fitsBeside([320], 1440, false)).toBe(true);
  });

  it('move the one below aside when wide, hide it when narrow', () => {
    expect(placement(1, 1, [320, 300], true)).toEqual({ x: 0, shown: true, front: true });
    expect(placement(0, 1, [320, 300], true)).toEqual({ x: -312, shown: true, front: false });
    expect(placement(0, 2, [320, 300, 280], true).shown).toBe(false);
    expect(placement(0, 1, [320, 300], false)).toEqual({ x: -90, shown: false, front: false });
  });

  it('open in one dialog; Escape closes the one in front, the scrim all of them', async () => {
    const onall = vi.fn();
    const host = render(PanelStackFixture, { onall });
    const dialog = host.querySelector('dialog')!;
    expect(dialog.querySelectorAll('[data-panel-depth]')).toHaveLength(1);
    click(dialog.querySelector('.pick'));
    flushSync();
    expect(dialog.querySelectorAll('[data-panel-depth]')).toHaveLength(2);
    expect(dialog.querySelector('.who')?.textContent).toBe('Ada');

    key(dialog.querySelector('.who')!, 'Escape');
    flushSync();
    // The person's panel slides out, the group's stays.
    await vi.waitFor(() => expect(dialog.querySelector('[data-panel-depth="1"]')).toBeNull());
    expect(dialog.querySelector('[data-panel-depth="0"]')).not.toBeNull();
    expect(onall).not.toHaveBeenCalled();

    dialog.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
    dialog.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(onall).toHaveBeenCalledOnce();
  });
});
