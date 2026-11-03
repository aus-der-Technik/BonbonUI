// Components added for the service UIs: input and output tools, job states, auth and error pages.
import { flushSync } from 'svelte';

// happy-dom's DOM makes DOMPurify drop harmless tags (and keep harmful ones); the hardening pass
// in utils/markdown is what keeps output safe here, and utils/services.test.ts covers both.
vi.mock('dompurify', () => ({ default: { isSupported: false, sanitize: (html: string) => html } }));
import { click, html, input, key, render, tick } from '../test/render';
import Badge from './atoms/Badge.svelte';
import Button from './atoms/Button.svelte';
import Card from './atoms/Card.svelte';
import Link from './atoms/Link.svelte';
import LoadingOverlay from './atoms/LoadingOverlay.svelte';
import Slider from './atoms/Slider.svelte';
import Stars from './atoms/Stars.svelte';
import StatusText from './atoms/StatusText.svelte';
import Tag from './atoms/Tag.svelte';
import Textarea from './atoms/Textarea.svelte';
import CheckboxGroup from './molecules/CheckboxGroup.svelte';
import CodeInput from './molecules/CodeInput.svelte';
import Composer from './molecules/Composer.svelte';
import CopyButton from './molecules/CopyButton.svelte';
import Disclosure from './molecules/Disclosure.svelte';
import EmptyState from './molecules/EmptyState.svelte';
import Field from './molecules/Field.svelte';
import FileDropzone from './molecules/FileDropzone.svelte';
import JobStatus from './molecules/JobStatus.svelte';
import Markdown from './molecules/Markdown.svelte';
import SegmentedControl from './molecules/SegmentedControl.svelte';
import SignInCard from './molecules/SignInCard.svelte';
import Tabs from './molecules/Tabs.svelte';
import VersionRail from './molecules/VersionRail.svelte';
import DataTable from './organisms/DataTable.svelte';
import ResourceList from './organisms/ResourceList.svelte';
import ResultPanel from './organisms/ResultPanel.svelte';
import SplitPane from './organisms/SplitPane.svelte';
import StatusCard from './organisms/StatusCard.svelte';
import AuthLayout from './templates/AuthLayout.svelte';
import ErrorPage from './templates/ErrorPage.svelte';
import SplitLayout from './templates/SplitLayout.svelte';

const byText = (host: HTMLElement, text: string) =>
  [...host.querySelectorAll('button')].find((b) => b.textContent?.trim() === text);
const settle = async () => {
  await tick();
  await tick();
  flushSync();
};

describe('service atoms', () => {
  it('Slider shows its value and reports changes', () => {
    const onchange = vi.fn();
    const host = render(Slider, {
      label: 'Temperature',
      value: 0.5,
      min: 0,
      max: 2,
      step: 0.1,
      hint: 'h',
      format: (v: number) => v.toFixed(2),
      onchange,
    });
    expect(host.querySelector('output')?.textContent).toBe('0.50');
    const range = host.querySelector('input')!;
    input(range, '1.2');
    expect(onchange).toHaveBeenCalledWith(1.2);
    expect(host.querySelector('output')?.textContent).toBe('1.20');
    expect(
      render(Slider, { label: 'x', min: 5, max: 5, disabled: true }).querySelector('.disabled'),
    ).not.toBeNull();
  });

  it('StatusText picks role and spinner from tone and busy', () => {
    expect(
      render(StatusText, { message: 'Done', tone: 'ok' })
        .querySelector('[role="status"]')
        ?.textContent?.trim(),
    ).toBe('Done');
    expect(
      render(StatusText, { message: 'Boom', tone: 'error' }).querySelector('[role="alert"]'),
    ).not.toBeNull();
    expect(
      render(StatusText, { busy: true, children: html('<b>x</b>') }).querySelector('.spinner'),
    ).not.toBeNull();
  });

  it('LoadingOverlay renders only while active', () => {
    expect(render(LoadingOverlay, { active: false }).querySelector('.overlay')).toBeNull();
    expect(
      render(LoadingOverlay, { label: 'Translating…', blocking: true }).querySelector(
        '.overlay.blocking',
      )?.textContent,
    ).toContain('Translating');
  });

  it('Tag as key/value, link, action and with count', () => {
    expect(render(Tag, { name: 'Type', label: 'venue' }).querySelector('.key')?.textContent).toBe(
      'Type',
    );
    const link = render(Tag, {
      label: 'Source',
      href: 'https://example.com',
      external: true,
    }).querySelector('a')!;
    expect(link.target).toBe('_blank');
    expect(link.title).toBe('https://example.com');
    const onclick = vi.fn();
    const action = render(Tag, { label: 'kw', onclick, count: 3, mono: true, tone: 'danger' });
    click(action.querySelector('button'));
    expect(onclick).toHaveBeenCalledOnce();
    expect(action.querySelector('.count')?.textContent).toBe('×3');
  });

  it('Button guards busy clicks, shows busyLabel and disables links', () => {
    const onclick = vi.fn();
    const busy = render(Button, { label: 'Save', busyLabel: 'Saving…', busy: true, onclick });
    expect(busy.textContent).toContain('Saving…');
    expect(busy.querySelector('.spinner')).not.toBeNull();
    click(busy.querySelector('button'));
    expect(onclick).not.toHaveBeenCalled();
    const link = render(Button, {
      label: 'Open',
      href: '/x',
      disabled: true,
      size: 'xs',
      target: '_blank',
    }).querySelector('a')!;
    expect(link.hasAttribute('href')).toBe(false);
    expect(link.getAttribute('aria-disabled')).toBe('true');
    const live = render(Button, { label: 'Open', href: '/x', target: '_blank' }).querySelector(
      'a',
    )!;
    expect(live.rel).toBe('noopener noreferrer');
  });

  it('Badge, Stars, Link, Card, Textarea extensions', () => {
    expect(
      render(Badge, { tone: 'brand', size: 'lg', label: 'venue' }).querySelector(
        '.badge--accent.badge--solid.badge--lg',
      ),
    ).not.toBeNull();
    const stars = render(Stars, { value: 4.5, showValue: true });
    expect(stars.querySelector('.value')?.textContent).toBe('4.5/5');
    expect(stars.querySelector('[role="img"]')?.getAttribute('aria-label')).toBe('4.5 of 5 stars');
    expect(
      render(Stars, { value: 4.5, showValue: true, locale: 'de-DE' }).querySelector('.value')
        ?.textContent,
    ).toBe('4,5/5');
    expect(render(Stars, { value: 3, showValue: true }).querySelector('.value')?.textContent).toBe(
      '3/5',
    );
    expect(
      render(Link, { href: null, children: html('Original') }).querySelector('.missing'),
    ).not.toBeNull();
    const card = render(Card, {
      title: 'Docs',
      count: 12,
      accent: true,
      actions: html('<button>f</button>'),
      children: html('<p></p>'),
    });
    expect(card.querySelector('.card-title')?.textContent).toBe('Docs');
    expect(card.querySelector('.card--accent')).not.toBeNull();
    const area = render(Textarea, {
      value: 'x'.repeat(12),
      counter: true,
      limit: 10,
      mono: true,
      autogrow: true,
      variant: 'plain',
    });
    expect(area.querySelector('.counter.over')).not.toBeNull();
    expect(area.querySelector('textarea')?.getAttribute('aria-invalid')).toBe('true');
  });
});

describe('service molecules', () => {
  it('Markdown renders sanitized HTML, a placeholder or plain text', async () => {
    const host = render(Markdown, { source: '# Hi\n\n<img src=x onerror="alert(1)">' });
    expect(host.querySelector('h1')?.textContent).toBe('Hi');
    expect(host.innerHTML).not.toContain('onerror');
    expect(render(Markdown, { source: '', placeholder: 'Nothing yet' }).textContent).toContain(
      'Nothing yet',
    );
    expect(
      render(Markdown, { source: '**x**', plain: true }).querySelector('pre')?.textContent,
    ).toBe('**x**');
    const streaming = render(Markdown, { source: 'Hello **there**', streaming: true, size: 'sm' });
    await new Promise((resolve) => requestAnimationFrame(() => resolve(null)));
    flushSync();
    expect(streaming.querySelector('.streaming strong')?.textContent).toBe('there');
  });

  it('JobStatus shows state, step, detail and progress', () => {
    const running = render(JobStatus, {
      status: 'running',
      step: 'extracting',
      done: 3,
      total: 10,
      detail: '1 failed',
    });
    expect(running.querySelector('.spinner')).not.toBeNull();
    expect(running.querySelector('[role="progressbar"]')?.getAttribute('aria-valuenow')).toBe('3');
    expect(running.textContent).toContain('1 failed');
    const done = render(JobStatus, { status: 'done', labels: { done: 'Fertig' } });
    expect(done.textContent).toContain('Fertig');
    expect(done.querySelector('[role="progressbar"]')).toBeNull();
    expect(
      render(JobStatus, { status: 'failed', done: 1, total: 2 }).querySelector('.fill--warn'),
    ).not.toBeNull();
    expect(render(JobStatus, { status: 'idle' }).textContent).toContain('Not started');
  });

  it('Composer sends on Enter or Cmd+Enter, never when empty or busy', () => {
    const onsubmit = vi.fn();
    const host = render(Composer, { label: 'Question', value: '  hi  ', onsubmit });
    const field = host.querySelector('textarea')!;
    key(field, 'Enter', { shiftKey: true });
    expect(onsubmit).not.toHaveBeenCalled();
    key(field, 'Enter');
    expect(onsubmit).toHaveBeenLastCalledWith('hi');
    key(field, 'x');
    click(byText(host, 'Send'));
    expect(onsubmit).toHaveBeenCalledTimes(2);

    const mod = render(Composer, {
      label: 'Q',
      value: 'abc',
      submitOn: 'mod-enter',
      layout: 'inline',
      minLength: 3,
      onsubmit,
    });
    const area = mod.querySelector('textarea')!;
    key(area, 'Enter');
    expect(onsubmit).toHaveBeenCalledTimes(2);
    key(area, 'Enter', { ctrlKey: true });
    expect(onsubmit).toHaveBeenCalledTimes(3);
    expect(mod.textContent).toContain('Enter to send');

    const busy = render(Composer, { label: 'Q', value: 'abc', busy: true, hint: false, onsubmit });
    key(busy.querySelector('textarea')!, 'Enter');
    expect(onsubmit).toHaveBeenCalledTimes(3);
  });

  it('CheckboxGroup selects all, clears and toggles in option order', () => {
    const onchange = vi.fn();
    const options = [
      { value: 'a', label: 'A', description: 'first' },
      { value: 'b', label: 'B' },
      { value: 'c', label: 'C', disabled: true },
    ];
    const host = render(CheckboxGroup, {
      label: 'Tools',
      options,
      value: ['b'],
      onchange,
      mono: true,
    });
    expect(host.textContent).toContain('1 of 3 selected');
    click(byText(host, 'Select all'));
    expect(onchange).toHaveBeenLastCalledWith(['a', 'b']);
    click(byText(host, 'Clear'));
    expect(onchange).toHaveBeenLastCalledWith([]);
    const box = host.querySelectorAll<HTMLInputElement>('input')[1]!;
    box.checked = true;
    box.dispatchEvent(new Event('change', { bubbles: true }));
    flushSync();
    expect(onchange).toHaveBeenLastCalledWith(['b']);
    box.checked = false;
    box.dispatchEvent(new Event('change', { bubbles: true }));
    flushSync();
    expect(onchange).toHaveBeenLastCalledWith([]);
  });

  it('CodeInput types, pastes, deletes, navigates and completes', () => {
    const oncomplete = vi.fn();
    const host = render(CodeInput, {
      label: 'Code',
      length: 4,
      groupAfter: 2,
      name: 'code',
      oncomplete,
      autofocus: true,
    });
    const boxes = () => [...host.querySelectorAll<HTMLInputElement>('input.box')];
    expect(host.querySelector('.dash')).not.toBeNull();
    input(boxes()[0], 'a');
    expect(boxes()[0]!.value).toBe('A');
    input(boxes()[1], '!');
    expect(boxes()[1]!.value).toBe('');
    const paste = new Event('paste', { bubbles: true, cancelable: true }) as ClipboardEvent;
    Object.defineProperty(paste, 'clipboardData', { value: { getData: () => 'wx-yz' } });
    boxes()[0]!.dispatchEvent(paste);
    flushSync();
    expect(oncomplete).toHaveBeenCalledWith('WXYZ');
    expect(host.querySelector<HTMLInputElement>('input[type="hidden"]')?.value).toBe('WXYZ');
    key(boxes()[3]!, 'Backspace');
    key(boxes()[3]!, 'Backspace');
    key(boxes()[2]!, 'ArrowLeft');
    key(boxes()[1]!, 'ArrowRight');
    boxes()[0]!.dispatchEvent(new FocusEvent('focus'));
    expect(host.querySelector<HTMLInputElement>('input[type="hidden"]')?.value).toBe('WX');

    const numeric = render(CodeInput, { label: 'OTP', numeric: true, length: 2, invalid: true });
    const first = numeric.querySelector<HTMLInputElement>('input.box')!;
    input(first, 'a');
    expect(first.value).toBe('');
    input(first, '7');
    expect(first.value).toBe('7');
  });

  it('FileDropzone accepts, rejects, removes and shows progress', () => {
    const onselect = vi.fn();
    const host = render(FileDropzone, {
      accept: '.pdf,text/*',
      maxBytes: 10,
      onselect,
      hint: 'PDF only',
    });
    const picker = host.querySelector<HTMLInputElement>('input[type="file"]')!;
    const choose = (file: File) => {
      Object.defineProperty(picker, 'files', { configurable: true, value: [file] });
      picker.dispatchEvent(new Event('change', { bubbles: true }));
      flushSync();
    };
    choose(new File(['x'], 'a.exe'));
    expect(host.querySelector('[role="alert"]')?.textContent).toContain('Unsupported');
    choose(new File(['x'.repeat(20)], 'big.pdf'));
    expect(host.querySelector('[role="alert"]')?.textContent).toContain('too large');
    choose(new File(['x'], 'notes.txt', { type: 'text/plain' }));
    expect(onselect).toHaveBeenCalledOnce();
    expect(host.querySelector('.name')?.textContent).toBe('notes.txt');
    click(host.querySelector('.remove'));
    expect(onselect).toHaveBeenLastCalledWith(null);

    const zone = host.querySelector('.zone')!;
    zone.dispatchEvent(new Event('dragenter', { bubbles: true, cancelable: true }));
    flushSync();
    expect(zone.classList.contains('over')).toBe(true);
    zone.dispatchEvent(new Event('dragover', { bubbles: true, cancelable: true }));
    zone.dispatchEvent(new Event('dragleave', { bubbles: true }));
    flushSync();
    expect(zone.classList.contains('over')).toBe(false);
    const drop = new Event('drop', { bubbles: true, cancelable: true }) as DragEvent;
    Object.defineProperty(drop, 'dataTransfer', {
      value: { files: [new File(['y'], 'drop.pdf')] },
    });
    zone.dispatchEvent(drop);
    flushSync();
    expect(host.querySelector('.name')?.textContent).toBe('drop.pdf');

    const up = render(FileDropzone, { file: new File(['x'], 'up.pdf'), progress: 0.5 });
    expect(up.querySelector('[role="progressbar"]')?.getAttribute('aria-valuenow')).toBe('50');
    expect(
      render(FileDropzone, { error: 'Server said no' }).querySelector('[role="alert"]')
        ?.textContent,
    ).toBe('Server said no');
  });

  it('VersionRail marks the current version and reports picks', () => {
    const onchange = vi.fn();
    const host = render(VersionRail, {
      value: 'v2',
      items: [
        { value: 'v1', label: 'v1' },
        { value: 'v2', label: 'v2', marked: true },
      ],
      onchange,
    });
    expect(host.querySelector('[aria-pressed="true"]')?.textContent).toContain('v2');
    expect(host.querySelector('.dot')).not.toBeNull();
    click(host.querySelector('button'));
    expect(onchange).toHaveBeenCalledWith('v1');
    const links = render(VersionRail, {
      value: 'a',
      items: [
        { value: 'a', label: 'a', href: '#a', marked: true },
        { value: 'b', label: 'b', href: '#b' },
      ],
    });
    expect(links.querySelector('[aria-current="page"]')?.textContent).toContain('a');
    click(links.querySelectorAll('a')[1]);
  });

  it('extended molecules: route tabs, disclosure actions, field hint snippet, segmented sizes, compact empty, inline copy, sign-in error', async () => {
    const tabs = render(Tabs, {
      label: 'S',
      value: 'a',
      tabs: [
        { value: 'a', label: 'A', href: '#a' },
        { value: 'b', label: 'B', href: '#b', disabled: true },
      ],
      actions: html('<button class="act">+</button>'),
    });
    expect(tabs.querySelector('a[aria-current="page"]')?.textContent?.trim()).toBe('A');
    expect(tabs.querySelector('a[aria-disabled="true"]')?.hasAttribute('href')).toBe(false);
    expect(tabs.querySelector('.actions .act')).not.toBeNull();
    click(tabs.querySelectorAll('a')[1]);

    const disclosure = render(Disclosure, {
      title: 'Tools',
      open: true,
      actions: html('<button class="sel">All</button>'),
      children: html('<p></p>'),
    });
    expect(disclosure.querySelector('.actions .sel')).not.toBeNull();
    expect(
      render(Field, {
        label: 'P',
        hint: html('<span>Use <code>x</code></span>'),
        children: html('<input />'),
      }).querySelector('.hint code'),
    ).not.toBeNull();
    expect(
      render(SegmentedControl, {
        size: 'sm',
        wrap: true,
        label: 'L',
        value: 'de',
        options: [{ value: 'de', label: 'DE' }],
      }).querySelector('.segmented--sm.wrap'),
    ).not.toBeNull();
    expect(
      render(EmptyState, { message: 'None', compact: true }).querySelector('.compact'),
    ).not.toBeNull();

    const writeText = vi.fn(() => Promise.resolve());
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText } });
    const oncopy = vi.fn();
    const copy = render(CopyButton, { value: 'urn:1', oncopy, children: html('urn:1') });
    click(copy.querySelector('button.inline'));
    await settle();
    expect(oncopy).toHaveBeenCalledWith(true);
    expect(copy.querySelector('.inline.copied')).not.toBeNull();

    const signin = render(SignInCard, {
      error: 'Session expired',
      busy: true,
      onsignin: () => {},
      logo: html('<img alt="logo" />'),
    });
    expect(signin.querySelector('.shake')).not.toBeNull();
    expect(signin.querySelector('img[alt="logo"]')).not.toBeNull();
    expect(signin.textContent).toContain('Redirecting…');
  });
});

describe('service organisms and templates', () => {
  it('DataTable rows as links, row clicks, selection, single open and hidden header', () => {
    const rows = [
      { id: 'a', n: 1 },
      { id: 'b', n: 2 },
    ];
    const columns = [{ key: 'n', label: 'N' }];
    const onrowclick = vi.fn();
    const clickable = render(DataTable, {
      columns,
      rows,
      rowKey: (r: unknown) => (r as { id: string }).id,
      onrowclick,
      current: 'b',
      hideHeader: true,
      cell: html('<button class="in">x</button>'),
    });
    expect(clickable.querySelector('thead.sr-only')).not.toBeNull();
    expect(clickable.querySelector('tr.current')?.getAttribute('aria-current')).toBe('true');
    click(clickable.querySelector('tbody tr'));
    expect(onrowclick).toHaveBeenCalledOnce();
    click(clickable.querySelector('button.in'));
    expect(onrowclick).toHaveBeenCalledOnce();
    key(clickable.querySelector('tbody tr')!, 'Enter');
    expect(onrowclick).toHaveBeenCalledTimes(2);

    const linked = render(DataTable, {
      columns,
      rows,
      rowKey: (r: unknown) => (r as { id: string }).id,
      rowHref: (r: unknown) => `#${(r as { id: string }).id}`,
    });
    expect(linked.querySelector('tbody tr')?.hasAttribute('role')).toBe(false);
    expect(linked.querySelector('tbody tr a.row-link')?.getAttribute('href')).toBe('#a');

    const ontoggle = vi.fn();
    const single = render(DataTable, {
      columns,
      rows,
      rowKey: (r: unknown) => (r as { id: string }).id,
      singleOpen: true,
      ontoggle,
      detail: html('<p class="d">d</p>'),
    });
    const trs = () => single.querySelectorAll('tbody tr.row');
    click(trs()[0]);
    click(trs()[1]);
    expect(single.querySelectorAll('.d')).toHaveLength(1);
    expect(ontoggle).toHaveBeenLastCalledWith(rows[1], true);
    click(trs()[1]);
    expect(ontoggle).toHaveBeenLastCalledWith(rows[1], false);
  });

  it('ResultPanel switches between its states', () => {
    expect(
      render(ResultPanel, { status: 'empty', title: 'Answer', placeholder: 'Ask' }).textContent,
    ).toContain('Ask');
    expect(
      render(ResultPanel, { status: 'error', error: 'Closed' }).querySelector('[role="alert"]')
        ?.textContent,
    ).toBe('Closed');
    const loading = render(ResultPanel, {
      status: 'loading',
      loadingLabel: 'Thinking…',
      children: html('<p class="old">old</p>'),
    });
    expect(loading.querySelector('.old')).not.toBeNull();
    expect(loading.querySelector('.overlay')?.textContent).toContain('Thinking…');
    const ready = render(ResultPanel, {
      status: 'ready',
      copyValue: 'x',
      headerEnd: html('<span class="st">ok</span>'),
      children: html('<p>r</p>'),
    });
    expect(ready.querySelector('.st')).not.toBeNull();
    expect(ready.querySelector('button[aria-label="Copy"]')).not.toBeNull();
    expect(render(ResultPanel, { status: 'error' }).textContent).toContain('Something went wrong.');
  });

  it('SplitPane renders both panes and swaps', () => {
    const onswap = vi.fn();
    const host = render(SplitPane, {
      label: 'T',
      start: html('<p class="s">s</p>'),
      end: html('<p class="e">e</p>'),
      startHeader: html('<b>from</b>'),
      endHeader: html('<b>to</b>'),
      onswap,
    });
    click(host.querySelector('.swap'));
    expect(onswap).toHaveBeenCalledOnce();
    expect(host.querySelectorAll('.head')).toHaveLength(2);
    expect(
      render(SplitPane, { start: html('a'), end: html('b') }).querySelector('.swap'),
    ).toBeNull();
  });

  it('ResourceList shows status, meta and actions, or says it is empty', () => {
    const items = [
      { id: '1', name: 'a', s: true },
      { id: '2', name: 'b', s: false },
    ];
    const host = render(ResourceList, {
      items,
      key: (i: unknown) => (i as { id: string }).id,
      title: (i: unknown) => (i as { name: string }).name,
      meta: (i: unknown) => `meta ${(i as { name: string }).name}`,
      status: (i: unknown) =>
        (i as { s: boolean }).s
          ? { label: 'Starting', tone: 'draft' as const, busy: true }
          : undefined,
      leading: html('<i class="lead"></i>'),
      actions: html('<button class="act">x</button>'),
    });
    expect(host.querySelectorAll('li')).toHaveLength(2);
    expect(host.querySelector('.spinner')).not.toBeNull();
    expect(host.querySelectorAll('.act')).toHaveLength(2);
    expect(
      render(ResourceList, { items: [], key: () => '', title: () => '', emptyText: 'None yet' })
        .textContent,
    ).toContain('None yet');
  });

  it('StatusCard counts down and redirects', () => {
    vi.useFakeTimers();
    const onredirect = vi.fn();
    const host = render(StatusCard, {
      status: 'error',
      title: 'Failed',
      message: 'Expired',
      redirectTo: '#login',
      redirectIn: 2,
      onredirect,
    });
    expect(host.querySelector('[role="alert"]')).not.toBeNull();
    expect(host.textContent).toContain('Redirecting in 2 s');
    vi.advanceTimersByTime(2000);
    flushSync();
    expect(onredirect).toHaveBeenCalledWith('#login');
    vi.useRealTimers();
    expect(
      render(StatusCard, { status: 'success', title: 'Done' }).querySelector('.tick'),
    ).not.toBeNull();
    expect(
      render(StatusCard, {
        status: 'working',
        title: 'Wait',
        children: html('<p class="c"></p>'),
      }).querySelector('.c'),
    ).not.toBeNull();
  });

  it('AuthLayout, ErrorPage and SplitLayout render their parts', () => {
    vi.useFakeTimers();
    const auth = render(AuthLayout, {
      title: 'Login',
      clock: true,
      shake: true,
      background: 'url(x.jpg)',
      links: [{ label: 'Imprint', href: '#i' }],
      children: html('<form class="f"></form>'),
    });
    expect(auth.querySelector('.card.shake .f')).not.toBeNull();
    expect(auth.querySelector('time.clock')).not.toBeNull();
    expect(auth.querySelector('.photo')).not.toBeNull();
    vi.advanceTimersByTime(10_000);
    vi.useRealTimers();
    expect(
      render(AuthLayout, {
        card: false,
        logo: html('<img alt="l" />'),
        children: html('<p class="free"></p>'),
      }).querySelector('.card'),
    ).toBeNull();

    const onback = vi.fn();
    const error = render(ErrorPage, {
      code: 404,
      title: 'Not found',
      description: 'Gone',
      homeHref: '/',
      image: '/egg.png',
      onback,
    });
    click(byText(error, 'Go back'));
    expect(onback).toHaveBeenCalledOnce();
    expect(error.querySelector('img')?.getAttribute('src')).toBe('/egg.png');
    const back = vi.spyOn(history, 'back').mockImplementation(() => {});
    click(
      byText(
        render(ErrorPage, {
          code: 500,
          title: 'x',
          illustration: html('<svg class="art-probe"></svg>'),
        }),
        'Go back',
      ),
    );
    expect(back).toHaveBeenCalled();

    const split = render(SplitLayout, {
      aside: html('<p class="a"></p>'),
      children: html('<p class="m"></p>'),
      sticky: false,
    });
    expect(split.querySelector('aside .a')).not.toBeNull();
    expect(split.querySelector('aside.sticky')).toBeNull();
  });
});
