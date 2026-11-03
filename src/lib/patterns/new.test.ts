// The base components added in the second round: atoms, molecules and organisms.
import { flushSync } from 'svelte';
import { click, html, key, render, tick } from '../test/render';
import Divider from './atoms/Divider.svelte';
import Link from './atoms/Link.svelte';
import ProgressBar from './atoms/ProgressBar.svelte';
import Radio from './atoms/Radio.svelte';
import Skeleton from './atoms/Skeleton.svelte';
import Spinner from './atoms/Spinner.svelte';
import Switch from './atoms/Switch.svelte';
import Tag from './atoms/Tag.svelte';
import Tooltip from './atoms/Tooltip.svelte';
import Breadcrumbs from './molecules/Breadcrumbs.svelte';
import CodeBlock from './molecules/CodeBlock.svelte';
import CopyButton from './molecules/CopyButton.svelte';
import Disclosure from './molecules/Disclosure.svelte';
import DropdownMenu from './molecules/DropdownMenu.svelte';
import EmptyState from './molecules/EmptyState.svelte';
import Field from './molecules/Field.svelte';
import RadioGroup from './molecules/RadioGroup.svelte';
import Tabs from './molecules/Tabs.svelte';
import ActivityLog from './organisms/ActivityLog.svelte';
import ConfirmDialog from './organisms/ConfirmDialog.svelte';
import Drawer from './organisms/Drawer.svelte';
import FormSection from './organisms/FormSection.svelte';
import SideNav from './organisms/SideNav.svelte';
import AdminLayout from './templates/AdminLayout.svelte';

const byText = (host: HTMLElement, text: string) =>
  [...host.querySelectorAll('button')].find((b) => b.textContent?.trim() === text);
const settle = async () => {
  await tick();
  await tick();
  flushSync();
};

describe('new atoms', () => {
  it('Switch toggles aria-checked, also from its label, but not when disabled', () => {
    const onchange = vi.fn();
    const host = render(Switch, {
      label: 'Mentions',
      description: 'When someone mentions you',
      onchange,
    });
    const sw = host.querySelector('[role="switch"]')!;
    expect(sw.getAttribute('aria-checked')).toBe('false');
    expect(sw.getAttribute('aria-describedby')).toMatch(/-desc$/);
    click(sw);
    expect(onchange).toHaveBeenLastCalledWith(true);
    click(host.querySelector('.label'));
    expect(onchange).toHaveBeenLastCalledWith(false);

    const off = render(Switch, { 'aria-label': 'Wrap', disabled: true, onchange });
    expect(off.querySelector('[role="switch"]')?.getAttribute('aria-label')).toBe('Wrap');
    click(off.querySelector('[role="switch"]'));
    expect(onchange).toHaveBeenCalledTimes(2);
  });

  it('Radio, Spinner, ProgressBar, Divider render their roles', () => {
    expect(
      render(Radio, { value: 'a', label: 'A', description: 'd' }).querySelector(
        'input[type="radio"]',
      ),
    ).not.toBeNull();
    expect(render(Spinner, {}).querySelector('[role="status"]')?.getAttribute('aria-label')).toBe(
      'Loading',
    );
    const bar = render(ProgressBar, { value: 150, label: 'Quota', showValue: true, tone: 'warn' });
    expect(bar.querySelector('[role="progressbar"]')?.getAttribute('aria-valuenow')).toBe('150');
    expect(bar.querySelector('.fill')?.getAttribute('style')).toContain('100%');
    expect(
      render(ProgressBar, { value: 1, max: 0, label: 'x' })
        .querySelector('.fill')
        ?.getAttribute('style'),
    ).toContain('0%');
    expect(render(Divider, {}).querySelector('hr')).not.toBeNull();
    expect(render(Divider, { label: 'or' }).textContent).toContain('or');
    expect(
      render(Divider, { orientation: 'vertical' }).querySelector('[aria-orientation="vertical"]'),
    ).not.toBeNull();
  });

  it('Skeleton draws lines, blocks and circles', () => {
    expect(render(Skeleton, { lines: 3 }).querySelectorAll('.text')).toHaveLength(3);
    expect(
      render(Skeleton, { shape: 'circle', width: '40px' })
        .querySelector('.circle')
        ?.getAttribute('style'),
    ).toContain('height: 40px');
    expect(
      render(Skeleton, { shape: 'rect' }).querySelector('.rect')?.getAttribute('style'),
    ).toContain('4rem');
  });

  it('Link marks external links', () => {
    const ext = render(Link, {
      href: 'https://example.com',
      external: true,
      children: html('Docs'),
    });
    const a = ext.querySelector('a')!;
    expect(a.target).toBe('_blank');
    expect(a.rel).toBe('noopener noreferrer');
    expect(a.textContent).toContain('(opens in a new tab)');
    expect(
      render(Link, { href: '/x', muted: true, children: html('x') }).querySelector('a')?.target,
    ).toBe('');
  });

  it('Tag removes itself only with onremove', () => {
    const onremove = vi.fn();
    const host = render(Tag, { label: 'Leipzig', color: 'red', onremove });
    click(host.querySelector('button[aria-label="Remove Leipzig"]'));
    expect(onremove).toHaveBeenCalledOnce();
    expect(render(Tag, { label: 'x' }).querySelector('button')).toBeNull();
  });

  it('Tooltip shows on hover and focus, hides on leave and Escape', () => {
    const host = render(Tooltip, {
      text: 'Reload',
      placement: 'bottom',
      children: html('<button>r</button>'),
    });
    const wrap = host.querySelector('.wrap')!;
    const tip = host.querySelector('[role="tooltip"]')!;
    expect(host.querySelector('button')?.getAttribute('aria-describedby')).toBe(tip.id);
    wrap.dispatchEvent(new PointerEvent('pointerenter'));
    flushSync();
    expect(tip.classList.contains('open')).toBe(true);
    key(wrap, 'Escape');
    expect(tip.classList.contains('open')).toBe(false);
    wrap.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
    flushSync();
    expect(tip.classList.contains('open')).toBe(true);
    wrap.dispatchEvent(new FocusEvent('focusout', { bubbles: true }));
    wrap.dispatchEvent(new PointerEvent('pointerleave'));
    flushSync();
    expect(tip.classList.contains('open')).toBe(false);
  });
});

describe('new molecules', () => {
  it('RadioGroup checks the value and reports a pick', () => {
    const onchange = vi.fn();
    const host = render(RadioGroup, {
      label: 'Role',
      value: 'b',
      orientation: 'horizontal',
      options: [
        { value: 'a', label: 'A' },
        { value: 'b', label: 'B', description: 'bee' },
      ],
      onchange,
    });
    const radios = host.querySelectorAll<HTMLInputElement>('input[type="radio"]');
    expect(radios[1]!.checked).toBe(true);
    radios[0]!.checked = true;
    radios[0]!.dispatchEvent(new Event('change', { bubbles: true }));
    flushSync();
    expect(onchange).toHaveBeenCalledWith('a');
    expect(host.querySelector('legend')?.textContent).toBe('Role');
  });

  it('Tabs select by click and arrow keys, skipping disabled tabs', () => {
    const onchange = vi.fn();
    const host = render(Tabs, {
      label: 'User',
      tabs: [
        { value: 'a', label: 'A' },
        { value: 'b', label: 'B', count: 3 },
        { value: 'c', label: 'C', disabled: true },
      ],
      onchange,
      panel: html('<p class="panel-probe">p</p>'),
    });
    const list = host.querySelector('[role="tablist"]')!;
    expect(host.querySelector('[aria-selected="true"]')?.textContent?.trim()).toBe('A');
    expect(host.querySelector('.panel-probe')).not.toBeNull();
    click(host.querySelectorAll('[role="tab"]')[1]);
    expect(onchange).toHaveBeenLastCalledWith('b');
    key(list, 'ArrowRight');
    expect(onchange).toHaveBeenLastCalledWith('a');
    key(list, 'End');
    expect(onchange).toHaveBeenLastCalledWith('b');
    key(list, 'Home');
    key(list, 'ArrowLeft');
    key(list, 'x');
    expect(host.querySelector('[aria-selected="true"]')?.getAttribute('tabindex')).toBe('0');
  });

  it('Breadcrumbs link all but the current page', () => {
    const host = render(Breadcrumbs, {
      items: [{ label: 'Admin', href: '/' }, { label: 'Users', href: '/u' }, { label: 'Jane' }],
    });
    expect(host.querySelectorAll('a')).toHaveLength(2);
    expect(host.querySelector('[aria-current="page"]')?.textContent).toBe('Jane');
  });

  it('DropdownMenu opens, navigates, picks and closes', async () => {
    const edit = vi.fn();
    const host = render(DropdownMenu, {
      items: [
        { label: 'Edit', icon: 'edit', onselect: edit },
        { separator: true },
        { label: 'Off', disabled: true, onselect: () => {} },
        { label: 'Delete', danger: true, onselect: () => {} },
      ],
    });
    const trigger = host.querySelector('button')!;
    click(trigger);
    await tick();
    const root = host.querySelector('.dropdown')!;
    expect(host.querySelectorAll('[role="menuitem"]')).toHaveLength(3);
    expect(host.querySelector('[role="separator"]')).not.toBeNull();
    key(root, 'ArrowDown');
    key(root, 'ArrowUp');
    key(root, 'End');
    key(root, 'Home');
    key(root, 'Tab');
    click(byText(host, 'Edit'));
    expect(edit).toHaveBeenCalledOnce();
    expect(host.querySelector('[role="menu"]')).toBeNull();

    click(trigger);
    key(root, 'Escape');
    expect(host.querySelector('[role="menu"]')).toBeNull();
    click(trigger);
    document.body.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
    flushSync();
    expect(host.querySelector('[role="menu"]')).toBeNull();
  });

  it('Disclosure folds open', () => {
    const host = render(Disclosure, {
      title: 'Danger zone',
      meta: '1',
      tone: 'danger',
      children: html('<p class="in">x</p>'),
    });
    expect(host.querySelector('.in')).toBeNull();
    click(host.querySelector('button'));
    expect(host.querySelector('button')?.getAttribute('aria-expanded')).toBe('true');
    expect(host.querySelector('.in')).not.toBeNull();
  });

  it('CopyButton copies and confirms, or reports a failure', async () => {
    const writeText = vi.fn(() => Promise.resolve());
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText } });
    const host = render(CopyButton, { value: 'abc' });
    click(host.querySelector('button'));
    await settle();
    expect(writeText).toHaveBeenCalledWith('abc');
    expect(host.textContent).toContain('Copied');

    writeText.mockImplementationOnce(() => Promise.reject(new Error('denied')));
    click(host.querySelector('button'));
    await settle();
    expect(host.textContent).toContain('Copy failed');
  });

  it('CodeBlock masks secrets until revealed', () => {
    const host = render(CodeBlock, {
      code: 'sk_secret',
      label: 'Token',
      secret: true,
      wrap: true,
    });
    expect(host.querySelector('code')?.textContent).not.toContain('sk_secret');
    click(byText(host, 'Reveal'));
    expect(host.querySelector('code')?.textContent).toBe('sk_secret');
    expect(
      render(CodeBlock, { code: 'x', copyable: false }).querySelector('figcaption'),
    ).toBeNull();
  });

  it('Field shows an error instead of the hint and marks required', () => {
    const host = render(Field, {
      label: 'E-mail',
      hint: 'h',
      error: 'Bad',
      required: true,
      children: html('<input />'),
    });
    expect(host.querySelector('[role="alert"]')?.textContent).toBe('Bad');
    expect(host.querySelector('.hint')).toBeNull();
    expect(host.querySelector('.req')).not.toBeNull();
    expect(
      render(Field, {
        label: 'G',
        group: true,
        required: true,
        children: html('<div></div>'),
      }).querySelector('span.label .req'),
    ).not.toBeNull();
  });

  it('EmptyState becomes a first-run panel', () => {
    const host = render(EmptyState, {
      icon: 'users',
      title: 'No users',
      message: 'Invite',
      action: html('<button>Go</button>'),
    });
    expect(host.querySelector('h3')?.textContent).toBe('No users');
    expect(host.querySelector('.action button')).not.toBeNull();
  });
});

describe('new organisms', () => {
  it('Drawer opens, closes from the button and the backdrop', () => {
    const onclose = vi.fn();
    const host = render(Drawer, {
      open: true,
      title: 'Jane',
      subtitle: 'j@example.com',
      onclose,
      children: html('<p>b</p>'),
      footer: html('<button>Save</button>'),
    });
    const dialog = host.querySelector('dialog')!;
    expect(dialog.hasAttribute('open')).toBe(true);
    click(host.querySelector('button[aria-label="Close"]'));
    dialog.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
    dialog.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    host.querySelector('.body')!.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    dialog.dispatchEvent(new Event('close'));
    expect(onclose).toHaveBeenCalledTimes(3);
    expect(
      render(Drawer, { open: false, title: 't', onclose, children: html('') })
        .querySelector('dialog')
        ?.hasAttribute('open'),
    ).toBe(false);
  });

  it('ConfirmDialog closes on success and shows a failure', async () => {
    const onclose = vi.fn();
    const ok = render(ConfirmDialog, {
      open: true,
      title: 'Sure?',
      message: 'Really',
      tone: 'primary',
      onconfirm: () => {},
      onclose,
    });
    click(byText(ok, 'Confirm'));
    await settle();
    expect(onclose).toHaveBeenCalledOnce();

    const bad = render(ConfirmDialog, {
      open: true,
      title: 'Delete?',
      onconfirm: () => Promise.reject(new Error('403')),
      onclose,
    });
    click(byText(bad, 'Confirm'));
    await settle();
    expect(bad.querySelector('[role="alert"]')?.textContent).toBe('403');
    click(byText(bad, 'Cancel'));
    expect(onclose).toHaveBeenCalledTimes(2);
  });

  it('SideNav marks the current page and reports navigation', () => {
    const onnavigate = vi.fn((_item, event: MouseEvent) => event.preventDefault());
    const host = render(SideNav, {
      groups: [
        {
          label: 'Admin',
          items: [
            { label: 'Users', href: '#users', icon: 'users', count: 3, active: true },
            { label: 'Settings', href: '#s' },
          ],
        },
        { items: [{ label: 'Help', href: '#h' }] },
      ],
      onnavigate,
    });
    expect(host.querySelector('[aria-current="page"]')?.textContent).toContain('Users');
    click(host.querySelectorAll('a')[1]);
    expect(onnavigate).toHaveBeenCalledOnce();
  });

  it('ActivityLog lists entries or says there are none', () => {
    const host = render(ActivityLog, {
      entries: [
        {
          id: '1',
          actor: 'Jane',
          action: 'invited',
          target: 'Max',
          at: '2026-10-19T08:00:00Z',
          tone: 'ok',
          detail: 'as editor',
        },
        { id: '2', actor: 'Max', action: 'signed in', at: new Date('2026-10-19T09:00:00Z') },
      ],
      showAvatars: false,
    });
    expect(host.querySelectorAll('li')).toHaveLength(2);
    expect(host.querySelector('.entry--ok b')?.textContent).toBe('Max');
    expect(render(ActivityLog, { entries: [] }).textContent).toContain('No activity yet.');
  });

  it('FormSection and the sidebar layout render their slots', () => {
    const section = render(FormSection, {
      title: 'Profile',
      description: 'd',
      children: html('<input />'),
      footer: html('<button>Save</button>'),
    });
    expect(section.querySelector('h3')?.textContent).toBe('Profile');
    expect(section.querySelector('.footer button')).not.toBeNull();
    const layout = render(AdminLayout, {
      title: 'Admin',
      sidebar: html('<nav class="side"></nav>'),
      children: html('<p class="c"></p>'),
    });
    expect(layout.querySelector('.sidebar .side')).not.toBeNull();
    expect(layout.querySelector('main .c')).not.toBeNull();
  });
});
