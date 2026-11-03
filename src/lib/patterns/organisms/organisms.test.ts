import { flushSync } from 'svelte';
import { click, html, key, render, tick } from '../../test/render';
import AppHeader from './AppHeader.svelte';
import ChartCard from './ChartCard.svelte';
import DataTable from './DataTable.svelte';
import Dialog from './Dialog.svelte';
import Drawer from './Drawer.svelte';
import DivergingBarChart from './DivergingBarChart.svelte';
import FeedbackDialog from './FeedbackDialog.svelte';
import FloatingActions from './FloatingActions.svelte';
import HorizontalBarChart from './HorizontalBarChart.svelte';
import LineChart from './LineChart.svelte';
import Sheet from './Sheet.svelte';
import Toaster from './Toaster.svelte';
import ActivityLog from './ActivityLog.svelte';
import ResultPanel from './ResultPanel.svelte';
import AdminLayout from '../templates/AdminLayout.svelte';
import AuthLayout from '../templates/AuthLayout.svelte';
import SplitLayout from '../templates/SplitLayout.svelte';
import DashboardGrid from '../templates/DashboardGrid.svelte';
import ErrorPage from '../templates/ErrorPage.svelte';
import KanbanBoard from './KanbanBoard.svelte';
import SideNav from './SideNav.svelte';
import StatusCard from './StatusCard.svelte';

const byText = (host: HTMLElement, text: string) =>
  [...host.querySelectorAll('button')].find((b) => b.textContent?.trim() === text);

describe('DataTable', () => {
  const columns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'n', label: 'N', align: 'end' as const, hideOnMobile: true, nowrap: true },
  ];
  const rows = [
    { id: 'a', name: 'Alpha', n: 1 },
    { id: 'b', name: 'Beta', n: null },
  ];

  it('renders values, sort state and reports sorting', () => {
    const onsort = vi.fn();
    const host = render(DataTable, {
      columns,
      rows,
      rowKey: (r: unknown) => (r as { id: string }).id,
      sort: 'name',
      order: 'asc',
      onsort,
    });
    expect(host.querySelector('th')?.getAttribute('aria-sort')).toBe('ascending');
    expect(host.querySelectorAll('tbody tr')).toHaveLength(2);
    expect(host.querySelectorAll('tbody td')[3]?.textContent?.trim()).toBe('');
    click(host.querySelector('th button'));
    expect(onsort).toHaveBeenCalledWith('name');
  });

  it('expands rows with a detail snippet by click and keyboard', () => {
    const host = render(DataTable, {
      columns,
      rows,
      rowKey: (r: unknown) => (r as { id: string }).id,
      order: 'desc',
      sort: 'name',
      detail: html('<div class="detail-probe">more</div>'),
    });
    const row = host.querySelector('tbody tr') as HTMLElement;
    click(row);
    expect(row.getAttribute('aria-expanded')).toBe('true');
    expect(host.querySelector('.detail-probe')).not.toBeNull();
    key(row, 'Enter');
    expect(host.querySelector('.detail-probe')).toBeNull();
    key(row, ' ');
    expect(host.querySelector('.detail-probe')).not.toBeNull();
    key(row, 'a');
    expect(host.querySelector('th')?.getAttribute('aria-sort')).toBe('descending');
  });

  it('says when there are no rows', () => {
    const host = render(DataTable, {
      columns,
      rows: [],
      rowKey: () => '',
      emptyText: 'Nothing here',
    });
    expect(host.querySelector('.empty')?.textContent?.trim()).toBe('Nothing here');
  });
});

describe('Dialog', () => {
  it('opens as a modal and reports close', () => {
    const onclose = vi.fn();
    const host = render(Dialog, {
      open: true,
      title: 'Discard?',
      intro: 'Sure?',
      onclose,
      children: html('<p>body</p>'),
      actions: html('<button>OK</button>'),
    });
    const dialog = host.querySelector('dialog')!;
    expect(dialog.hasAttribute('open')).toBe(true);
    expect(host.querySelector('h2')?.textContent).toBe('Discard?');
    dialog.dispatchEvent(new Event('close'));
    expect(onclose).toHaveBeenCalledOnce();
  });
});

describe('FeedbackDialog', () => {
  it('needs a rating, sends the draft and thanks', async () => {
    const onsubmit = vi.fn();
    const host = render(FeedbackDialog, { open: true, onclose: () => {}, onsubmit, closeAfter: 0 });
    const send = () => byText(host, 'Send feedback')!;
    expect(send().disabled).toBe(true);
    click(host.querySelectorAll('[role="radio"]')[0]);
    expect(send().disabled).toBe(false);
    host
      .querySelector('form')!
      .dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    await tick();
    flushSync();
    expect(onsubmit).toHaveBeenCalledWith({ type: 'thumbs', value: 'up' }, '');
    expect(host.textContent).toContain('Thank you!');
  });

  it('sends stars and shows a failure', async () => {
    const onsubmit = vi.fn(() => Promise.reject(new Error('429 Too Many Requests')));
    const onclose = vi.fn();
    const host = render(FeedbackDialog, { open: true, onclose, onsubmit });
    click(byText(host, 'Stars'));
    click(host.querySelectorAll('[role="radio"]')[2]);
    host
      .querySelector('form')!
      .dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    await tick();
    flushSync();
    expect(onsubmit).toHaveBeenCalledWith({ type: 'stars', value: 3 }, '');
    expect(host.querySelector('[role="alert"]')?.textContent).toContain('429');
    click(byText(host, 'Cancel'));
    expect(onclose).toHaveBeenCalled();
  });
});

describe('charts', () => {
  // happy-dom has no layout: give the chart containers a width.
  beforeAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'clientWidth', {
      configurable: true,
      get: () => 600,
    });
  });
  afterAll(() => {
    delete (HTMLElement.prototype as unknown as Record<string, unknown>)['clientWidth'];
  });

  const move = (el: Element | null, x = 300) => {
    el?.dispatchEvent(new PointerEvent('pointermove', { clientX: x, clientY: 40, bubbles: true }));
    flushSync();
  };
  const leave = (el: Element | null) => {
    el?.dispatchEvent(new PointerEvent('pointerleave', { bubbles: true }));
    flushSync();
  };

  it('DivergingBarChart draws up and down bars with a tooltip', () => {
    const data = [
      { label: '01.10.', up: 5, down: 2 },
      { label: '02.10.', up: 0, down: 0 },
      { label: '03.10.', up: 3, down: 1, title: 'Fr., 3. Okt.' },
    ];
    const host = render(DivergingBarChart, { data });
    expect(host.querySelectorAll('path').length).toBe(4);
    const hit = host.querySelector('rect[role="presentation"]');
    move(hit, 500);
    expect(document.querySelector('.tooltip')?.textContent).toContain('Fr., 3. Okt.');
    leave(hit);
    expect(document.querySelector('.tooltip')).toBeNull();
    expect(render(DivergingBarChart, { data: [], emptyText: 'Empty' }).textContent).toContain(
      'Empty',
    );
  });

  it('LineChart skips gaps and snaps the crosshair', () => {
    const data = [
      { label: 'a', value: 4 },
      { label: 'b', value: null },
      { label: 'c', value: 3.5, count: 2 },
    ];
    const host = render(LineChart, { data, min: 1, max: 5 });
    expect(host.querySelectorAll('circle')).toHaveLength(2);
    const hit = host.querySelector('rect[role="presentation"]');
    move(hit, 550);
    expect(document.querySelector('.tooltip')?.textContent).toContain('Count');
    leave(hit);
    expect(
      render(LineChart, { data: [{ label: 'x', value: null }] }).querySelector('.empty'),
    ).not.toBeNull();
  });

  it('HorizontalBarChart shows counts and shares', () => {
    const data = [
      { label: '5★', value: 3, color: 'blue' },
      { label: '1★', value: 1 },
      { label: '0', value: 0 },
    ];
    const host = render(HorizontalBarChart, { data });
    expect(host.querySelectorAll('path')).toHaveLength(2);
    const hit = host.querySelector('rect[role="presentation"]');
    move(hit);
    expect(document.querySelector('.tooltip')?.textContent).toContain('75');
    leave(hit);
    expect(render(HorizontalBarChart, { data: [] }).querySelector('.empty')).not.toBeNull();
  });

  it('charts take token colours, an area and dim the rows they are not on', () => {
    const line = render(LineChart, {
      data: [
        { label: 'a', value: 2 },
        { label: 'b', value: 3 },
      ],
      min: 0,
      max: 4,
      color: 'var(--accent)',
    });
    expect(line.querySelector('path.area')?.getAttribute('d')).toMatch(/Z$/);
    expect(line.querySelector('linearGradient stop')?.getAttribute('stop-color')).toBe(
      'var(--accent)',
    );
    expect(line.querySelector('circle')?.getAttribute('fill')).toBe('var(--accent)');
    expect(
      render(LineChart, { data: [{ label: 'a', value: 1 }], area: false }).querySelector(
        'path.area',
      ),
    ).toBeNull();

    const bars = render(HorizontalBarChart, {
      data: [
        { label: 'A', value: 3 },
        { label: 'B', value: 1, color: 'var(--color-pink)' },
      ],
      color: 'var(--color-blue)',
    });
    const paths = bars.querySelectorAll('path');
    expect(paths[0]?.getAttribute('fill')).toBe('var(--color-blue)');
    expect(paths[1]?.getAttribute('fill')).toBe('var(--color-pink)');
    move(bars.querySelectorAll('rect[role="presentation"]')[0]!);
    expect(paths[1]?.classList.contains('dim')).toBe(true);
    expect(paths[0]?.classList.contains('dim')).toBe(false);
    leave(bars.querySelectorAll('rect[role="presentation"]')[0]!);
    expect(bars.querySelector('.dim')).toBeNull();

    const diverging = render(DivergingBarChart, {
      data: [
        { label: '1', up: 2, down: 1 },
        { label: '2', up: 1, down: 0 },
      ],
      upColor: 'var(--accent)',
      downColor: 'var(--danger)',
    });
    const fills = [...diverging.querySelectorAll('path')].map((p) => p.getAttribute('fill'));
    expect(fills).toEqual(['var(--accent)', 'var(--danger)', 'var(--accent)']);
    move(diverging.querySelector('rect[role="presentation"]'), 500);
    expect(diverging.querySelectorAll('path.dim')).toHaveLength(2);
  });

  it('ChartCard frames a chart with a legend', () => {
    const host = render(ChartCard, {
      title: 'T',
      sub: 's',
      wide: true,
      legend: [{ label: 'Up', color: 'blue' }],
      children: html('<svg></svg>'),
    });
    expect(host.querySelector('.chart-card.wide')).not.toBeNull();
    expect(host.textContent).toContain('Up');
  });
});

describe('frame organisms and templates', () => {
  it('AppHeader scrolls to top without href', () => {
    const scroll = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    const host = render(AppHeader, {
      title: 'Locations',
      actions: html('<button class="act">x</button>'),
    });
    click(host.querySelector('button.pill'));
    expect(scroll).toHaveBeenCalled();
    expect(host.querySelector('.act')).not.toBeNull();
    expect(render(AppHeader, { title: 'S', href: '/ui' }).querySelector('a.pill')).not.toBeNull();
  });

  it('AppHeader lets the actions fill the row with fillActions', () => {
    const host = render(AppHeader, { title: 'T', fillActions: true, actions: html('<i>a</i>') });
    expect(host.querySelector('.inner')?.className).toContain('fill');
    expect(
      render(AdminLayout, {
        title: 'T',
        fillActions: true,
        children: html('<p>c</p>'),
      }).querySelector('.inner.fill'),
    ).not.toBeNull();
  });

  it('Sheet shows tools, loading, error and footer', () => {
    const host = render(Sheet, {
      title: 'Venues',
      about: 'All venues',
      loading: true,
      error: 'boom',
      tools: html('<i class="tool">t</i>'),
      footer: html('<span class="foot-probe">8 rows</span>'),
      children: html('<div>grid</div>'),
    });
    expect(host.querySelector('h1')?.textContent).toBe('Venues');
    expect(host.querySelector('[role="progressbar"]')).not.toBeNull();
    expect(host.querySelector('[role="alert"]')?.textContent).toBe('boom');
    expect(host.querySelector('.foot-probe')).not.toBeNull();
  });

  it('Toaster lists toasts and dismisses', () => {
    const ondismiss = vi.fn();
    const host = render(Toaster, {
      toasts: [{ id: 1, tone: 'ok' as const, message: 'Saved' }],
      ondismiss,
    });
    click(host.querySelector('button'));
    expect(ondismiss).toHaveBeenCalledWith(1);
    expect(
      render(Toaster, { toasts: [{ id: 2, tone: 'warn' as const, message: 'x' }] }).querySelector(
        'button',
      ),
    ).toBeNull();
  });

  it('AdminLayout, DashboardGrid and FloatingActions render their slots', () => {
    const host = render(AdminLayout, {
      title: 'Feedback',
      footer: 'internal',
      fill: true,
      children: html('<p class="c">c</p>'),
    });
    expect(host.querySelector('main .c')).not.toBeNull();
    expect(host.querySelector('footer')?.textContent).toBe('internal');
    expect(
      render(AdminLayout, {
        title: 'x',
        footer: html('<b>f</b>'),
        children: html('<p></p>'),
      }).querySelector('footer b'),
    ).not.toBeNull();
    expect(
      render(DashboardGrid, {
        variant: 'charts',
        label: 'Trends',
        children: html('<div></div>'),
      }).querySelector('.grid--charts'),
    ).not.toBeNull();
  });
});

describe('FloatingActions', () => {
  it('is a sticky front layer at the end of the content, offset from the bottom', () => {
    const host = render(FloatingActions, { children: html('<button>Add</button>') });
    const fab = host.querySelector<HTMLElement>('.fab')!;
    expect(fab.querySelector('button')).not.toBeNull();
    expect(fab.dataset['layer']).toBe('front');
    expect(fab.classList.contains('fab--end')).toBe(true);
    expect(fab.style.getPropertyValue('--fab-offset')).toBe('var(--sticky-gap)');
    // No inline `bottom` / `position`: stickiness lives in the stylesheet, not in a fixed offset.
    expect(fab.style.getPropertyValue('bottom')).toBe('');
    expect(fab.getAttribute('role')).toBeNull();
  });

  it('takes an offset, an alignment, the bar look and a group label', () => {
    const fab = render(FloatingActions, {
      offset: '4rem',
      align: 'center',
      bar: true,
      label: 'Row actions',
      children: html('<button>Delete</button>'),
    }).querySelector<HTMLElement>('.fab')!;
    expect(fab.style.getPropertyValue('--fab-offset')).toBe('4rem');
    expect(fab.className).toContain('fab--center');
    expect(fab.className).toContain('fab--bar');
    expect(fab.getAttribute('role')).toBe('group');
    expect(fab.getAttribute('aria-label')).toBe('Row actions');
  });
});

describe('overhaul additions', () => {
  it('Toaster takes a placement and an offset', () => {
    const stack = render(Toaster, {
      toasts: [{ id: 1, tone: 'ok' as const, message: 'Copied' }],
      placement: 'top-center',
      offset: '5rem',
    }).querySelector<HTMLElement>('.toasts')!;
    expect(stack.className).toContain('toasts--top-center');
    expect(stack.style.getPropertyValue('--toast-offset')).toBe('5rem');
    expect(stack.textContent).toContain('Copied');
    expect(render(Toaster, { toasts: [] }).querySelector('.toasts')?.className).toContain(
      'toasts--bottom-end',
    );
  });

  it('Drawer slides in from either side', () => {
    const props = { open: true, title: 'Filters', onclose: () => {}, children: html('<p>f</p>') };
    expect(render(Drawer, props).querySelector('dialog')?.className).toContain('drawer--end');
    expect(
      render(Drawer, { ...props, side: 'start' }).querySelector('dialog')?.className,
    ).toContain('drawer--start');
  });

  it('ChartCard shows a headline value and actions', () => {
    const host = render(ChartCard, {
      title: 'Visits',
      value: '27,940',
      actions: html('<button class="range">30 days</button>'),
      children: html('<svg></svg>'),
    });
    expect(host.querySelector('.value')?.textContent).toBe('27,940');
    expect(host.querySelector('.end .range')).not.toBeNull();
    expect(host.querySelector('.plot svg')).not.toBeNull();
  });

  it('DataTable marks the sorted column and points its chevron', () => {
    const host = render(DataTable, {
      columns: [
        { key: 'a', label: 'A', sortable: true },
        { key: 'b', label: 'B', sortable: true },
      ],
      rows: [{ a: 1, b: 2 }],
      rowKey: () => 'r',
      sort: 'b',
      order: 'asc',
      onsort: () => {},
    });
    const buttons = host.querySelectorAll('th button');
    expect(buttons[0]?.classList.contains('active')).toBe(false);
    expect(buttons[1]?.classList.contains('active')).toBe(true);
    expect(buttons[1]?.querySelector('.arrow svg')).not.toBeNull();
  });

  it('FeedbackDialog texts can be overridden', () => {
    const host = render(FeedbackDialog, {
      open: true,
      onclose: () => {},
      onsubmit: () => {},
      ratingLabel: 'Bewertung',
      sendLabel: 'Senden',
      cancelLabel: 'Abbrechen',
      commentLabel: 'Kommentar',
      optionalLabel: 'freiwillig',
      thumbsLabel: 'Daumen',
      starsLabel: 'Sterne',
    });
    expect(host.querySelector('legend')?.textContent).toBe('Bewertung');
    expect(byText(host, 'Senden')).toBeDefined();
    expect(byText(host, 'Abbrechen')).toBeDefined();
    expect(byText(host, 'Sterne')).toBeDefined();
    expect(host.querySelector('.caption')?.textContent).toContain('freiwillig');
  });

  it('ResultPanel, ActivityLog and the frames take their new props', () => {
    expect(
      render(ResultPanel, { status: 'error', error: '', errorFallback: 'Fehler' }).querySelector(
        '[role="alert"]',
      )?.textContent,
    ).toBe('Fehler');
    expect(
      render(ActivityLog, {
        entries: [{ id: '1', actor: 'Ada', action: 'noted', at: new Date(), tone: 'info' }],
      }).querySelector('.entry--info'),
    ).not.toBeNull();

    const split = render(SplitLayout, {
      reverse: true,
      gap: 'lg',
      aside: html('<p class="a"></p>'),
      children: html('<p class="m"></p>'),
    }).querySelector<HTMLElement>('.split')!;
    expect(split.classList.contains('reverse')).toBe(true);
    expect(split.style.getPropertyValue('--split-gap')).toBe('var(--space-6)');
    expect(split.querySelector('aside.sticky .a')).not.toBeNull();

    const auth = render(AuthLayout, {
      title: 'Sign in',
      clock: true,
      locale: 'en-GB',
      links: [{ label: 'Privacy', href: '#p' }],
      linksLabel: 'Legal notes',
      children: html('<form></form>'),
    });
    expect(auth.querySelector('nav')?.getAttribute('aria-label')).toBe('Legal notes');
    expect(auth.querySelector('.title')?.textContent).toBe('Sign in');
    expect(auth.querySelector('time.clock')?.textContent).toMatch(/^\d\d:\d\d$/);
  });

  it('DashboardGrid takes a minimum tile width', () => {
    const grid = render(DashboardGrid, {
      min: '15rem',
      children: html('<div></div>'),
    }).querySelector<HTMLElement>('.grid--kpis')!;
    expect(grid.style.getPropertyValue('--tile-min')).toBe('15rem');
  });
});

describe('design polish', () => {
  const sprinkles = () => document.querySelectorAll('body > span[aria-hidden="true"]').length;
  afterEach(() => {
    vi.useRealTimers();
    for (const dot of document.querySelectorAll('body > span[aria-hidden="true"]')) dot.remove();
  });

  it('ErrorPage brings a default title per code, overridable', () => {
    const page = (props: Record<string, unknown>) =>
      render(ErrorPage, { code: 404, onback: () => {}, ...props }).querySelector('h1')?.textContent;
    expect(page({})).toBe('This page took a coffee break.');
    expect(page({ code: 500 })).toBe('Something broke on our side.');
    expect(page({ code: 418 })).toBe('Something went wrong. Try again.');
    expect(page({ titles: { 404: 'Gone fishing' } })).toBe('Gone fishing');
    expect(page({ title: 'Not here' })).toBe('Not here');
  });

  it('AuthLayout greets on request, with a wink or own text', () => {
    const plain = render(AuthLayout, { children: html('<p>x</p>') });
    expect(plain.querySelector('.greeting')).toBeNull();
    const greeted = render(AuthLayout, { greeting: true, children: html('<p>x</p>') });
    expect(greeted.querySelector('.greeting')?.textContent).toMatch(/^(Good|Still)/);
    expect(greeted.querySelector('.wink')).not.toBeNull();
    const own = render(AuthLayout, {
      greeting: 'Hello there',
      clock: true,
      children: html('<p>x</p>'),
    });
    expect(own.querySelector('.greeting')?.textContent).toBe('Hello there');
    expect(own.querySelector('.clock')).not.toBeNull();
  });

  it('SideNav slides one selected pill to the active item', () => {
    const host = render(SideNav, {
      groups: [
        {
          items: [
            { label: 'One', href: '#1', active: true },
            { label: 'Two', href: '#2' },
          ],
        },
      ],
    });
    const active = host.querySelector('a[aria-current="page"]');
    expect(active?.textContent).toContain('One');
    // happy-dom has no layout, so the pill stays unmeasured and the link keeps its own look.
    expect(host.querySelector('.nav.has-pill')).toBeNull();
  });

  it('Toaster sprinkles for a success toast only when asked, never for others', () => {
    vi.useFakeTimers();
    const ok = [{ id: 1, tone: 'ok' as const, message: 'Saved' }];
    render(Toaster, { toasts: [{ id: 2, tone: 'error' as const, message: 'No' }] });
    vi.advanceTimersByTime(400);
    expect(sprinkles()).toBe(0);
    render(Toaster, { toasts: ok });
    vi.advanceTimersByTime(400);
    expect(sprinkles()).toBe(0);
    render(Toaster, { toasts: ok, sprinkle: true });
    vi.advanceTimersByTime(400);
    expect(sprinkles()).toBeGreaterThan(0);
  });

  it('StatusCard success draws its tick and sprinkles', () => {
    vi.useFakeTimers();
    const host = render(StatusCard, { status: 'success', title: 'Signed in' });
    expect(host.querySelector('.tick .check path')).not.toBeNull();
    vi.advanceTimersByTime(400);
    expect(sprinkles()).toBeGreaterThan(0);
  });

  it('KanbanBoard wobbles a landed card and celebrates the last column', async () => {
    const columns = [
      { id: 'todo', title: 'To do' },
      { id: 'done', title: 'Done' },
    ];
    const cards = [
      { id: 'a', column: 'todo', title: 'Alpha' },
      { id: 'b', column: 'todo', title: 'Beta' },
    ];
    const host = render(KanbanBoard, { columns, cards });
    const card = () => host.querySelector<HTMLButtonElement>('[data-open="a"]')!;
    key(card(), 'ArrowDown', { altKey: true });
    await tick();
    flushSync();
    expect(host.querySelector('[data-card="a"]')?.classList.contains('landed')).toBe(true);
    expect(sprinkles()).toBe(0);
    key(card(), 'ArrowRight', { altKey: true });
    await tick();
    flushSync();
    expect(sprinkles()).toBeGreaterThan(0);
    host
      .querySelector('[data-card="a"]')!
      .dispatchEvent(new Event('animationend', { bubbles: true }));
    flushSync();
    expect(host.querySelector('.landed')).toBeNull();
  });
});
