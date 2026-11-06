// Errors at the control that caused them, empty states, row links and chart data for assistive tech.
import { flushSync } from 'svelte';
import { click, key, render, tick } from '../../test/render';
import CartSummary from './CartSummary.svelte';
import CommentThread from './CommentThread.svelte';
import DataTable from './DataTable.svelte';
import DivergingBarChart from './DivergingBarChart.svelte';
import HorizontalBarChart from './HorizontalBarChart.svelte';
import KanbanBoard, { type KanbanCard } from './KanbanBoard.svelte';
import LineChart from './LineChart.svelte';
import NotificationList from './NotificationList.svelte';
import ResultPanel from './ResultPanel.svelte';

const settle = async () => {
  await tick();
  await tick();
  flushSync();
};
const text = (el: Element | null | undefined) => el?.textContent?.replace(/\s+/g, ' ').trim();
const buttonByText = (host: ParentNode, label: string) =>
  [...host.querySelectorAll<HTMLButtonElement>('button')].find(
    (b) => b.textContent?.trim() === label,
  );

describe('errors show where they happened', () => {
  it('CartSummary shows a failed checkout under its button and keeps it retryable', async () => {
    let fail = true;
    const oncheckout = vi.fn(() => (fail ? Promise.reject(new Error('down')) : Promise.resolve()));
    const host = render(CartSummary, {
      subtotal: 10,
      oncheckout,
      checkoutErrorMessage: 'Payment failed',
    });
    const button = buttonByText(host, 'Checkout')!;
    click(button);
    await settle();
    const alert = button.nextElementSibling;
    expect(alert?.classList.contains('alert')).toBe(true);
    expect(text(alert?.querySelector('[role="alert"]'))).toBe('Payment failed');
    fail = false;
    click(button);
    await settle();
    expect(host.querySelector('.alert')).toBeNull();
    expect(oncheckout).toHaveBeenCalledTimes(2);
  });

  it('CartSummary tells an invalid code from a failed check', async () => {
    let outcome: 'invalid' | 'false' | 'network' = 'network';
    const ondiscount = vi.fn(async () => {
      if (outcome === 'network') throw new TypeError('Failed to fetch');
      if (outcome === 'invalid') throw Object.assign(new Error('nope'), { code: 'invalid' });
      return false;
    });
    const host = render(CartSummary, { subtotal: 10, ondiscount });
    const field = host.querySelector<HTMLInputElement>('.code-input')!;
    const submit = async () => {
      field.value = 'X';
      field.dispatchEvent(new Event('input', { bubbles: true }));
      flushSync();
      host
        .querySelector('.code-form')!
        .dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
      await settle();
      return text(host.querySelector('.code-error'));
    };
    expect(await submit()).toBe('Could not check the code. Try again.');
    outcome = 'invalid';
    expect(await submit()).toBe('This code is not valid.');
    outcome = 'false';
    expect(await submit()).toBe('This code is not valid.');
    expect(field.value).toBe('X');
  });

  it('CommentThread keeps the draft and shows the error under the reply box', async () => {
    const onreply = vi.fn(() => Promise.reject(new Error('offline')));
    const host = render(CommentThread, {
      comments: [{ id: '1', author: 'Ada', time: new Date(), text: 'Hi' }],
      onreply,
      replyErrorMessage: 'Not sent',
    });
    const box = host.querySelector('textarea')!;
    box.value = 'Sounds good';
    box.dispatchEvent(new Event('input', { bubbles: true }));
    flushSync();
    key(box, 'Enter');
    await settle();
    expect(onreply).toHaveBeenCalledWith('Sounds good');
    expect(box.value).toBe('Sounds good');
    expect(text(host.querySelector('.alert [role="alert"]'))).toBe('Not sent');
    click(host.querySelector('.alert .dismiss'));
    expect(host.querySelector('.alert')).toBeNull();
  });

  it('CommentThread prefills the reply box from its draft prop', () => {
    const host = render(CommentThread, {
      comments: [{ id: '1', author: 'Ada', time: new Date(), text: 'Hi' }],
      onreply: vi.fn(),
      draft: 'Half a thought',
    });
    expect(host.querySelector('textarea')!.value).toBe('Half a thought');
  });

  it('ResultPanel reports its error with the Alert molecule', () => {
    const host = render(ResultPanel, { status: 'error', error: 'Closed' });
    expect(host.querySelector('.alert [role="alert"]')).not.toBeNull();
    expect(text(host.querySelector('[role="alert"]'))).toBe('Closed');
  });
});

describe('KanbanBoard moves that fail', () => {
  const columns = [
    { id: 'todo', title: 'To do' },
    { id: 'done', title: 'Done' },
  ];
  const cards = (): KanbanCard[] => [
    { id: 'a', column: 'todo', title: 'Alpha' },
    { id: 'b', column: 'todo', title: 'Beta' },
  ];
  const titles = (host: HTMLElement, column: number) =>
    [...host.querySelectorAll('.column')[column]!.querySelectorAll('.open')].map((b) =>
      b.textContent?.trim(),
    );

  it('puts the card back and says so on the card', async () => {
    const onmove = vi.fn(() => Promise.reject(new Error('conflict')));
    const host = render(KanbanBoard, { columns, cards: cards(), onmove, sprinkle: false });
    const alpha = host.querySelector<HTMLElement>('[data-open="a"]')!;
    key(alpha, 'ArrowRight', { altKey: true });
    expect(titles(host, 1)).toEqual(['Alpha']);
    await settle();
    expect(titles(host, 0)).toEqual(['Alpha', 'Beta']);
    expect(titles(host, 1)).toEqual([]);
    const card = host.querySelector('[data-card="a"]')!;
    expect(card.classList.contains('failed')).toBe(true);
    expect(text(card.querySelector('[role="alert"]'))).toContain('back where it was');
    click(card.querySelector('.alert .dismiss'));
    expect(host.querySelector('.card.failed')).toBeNull();
  });

  it('keeps a move whose save resolves, and takes an empty-state message', async () => {
    const host = render(KanbanBoard, {
      columns,
      cards: cards(),
      onmove: () => Promise.resolve(),
      emptyMessage: 'Nothing done yet',
      sprinkle: false,
    });
    expect(text(host.querySelectorAll('.column')[1]!.querySelector('.empty'))).toBe(
      'Nothing done yet',
    );
    key(host.querySelector<HTMLElement>('[data-open="b"]')!, 'ArrowUp', { altKey: true });
    await settle();
    expect(titles(host, 0)).toEqual(['Beta', 'Alpha']);
    expect(host.querySelector('.card.failed')).toBeNull();
  });
});

describe('DataTable', () => {
  const rows = [
    { id: 'a', n: 1, x: 'one' },
    { id: 'b', n: 2, x: 'two' },
  ];
  const columns = [
    { key: 'n', label: 'N' },
    { key: 'x', label: 'X' },
  ];
  const rowKey = (r: unknown) => (r as { id: string }).id;

  it('links rows with a real anchor in the first cell, not a link role on the row', () => {
    const host = render(DataTable, { columns, rows, rowKey, rowHref: (r) => `/item/${rowKey(r)}` });
    const tr = host.querySelector('tbody tr')!;
    expect(tr.hasAttribute('role')).toBe(false);
    expect(tr.hasAttribute('tabindex')).toBe(false);
    const links = host.querySelectorAll('a.row-link');
    expect(links).toHaveLength(2);
    expect(links[0]!.getAttribute('href')).toBe('/item/a');
    expect(links[0]!.closest('td')).toBe(tr.querySelector('td'));
    expect(text(links[0])).toBe('1');
  });

  it('hands a plain link click to onrowclick but leaves modified clicks to the browser', () => {
    const onrowclick = vi.fn();
    const host = render(DataTable, { columns, rows, rowKey, rowHref: () => '#x', onrowclick });
    const link = host.querySelector<HTMLAnchorElement>('a.row-link')!;
    const plain = new MouseEvent('click', { bubbles: true, cancelable: true, button: 0 });
    link.dispatchEvent(plain);
    expect(plain.defaultPrevented).toBe(true);
    expect(onrowclick).toHaveBeenCalledWith(rows[0]);
    const newTab = new MouseEvent('click', { bubbles: true, cancelable: true, metaKey: true });
    link.dispatchEvent(newTab);
    expect(newTab.defaultPrevented).toBe(false);
    expect(onrowclick).toHaveBeenCalledOnce();
  });

  it('uses EmptyState and only mentions filters when filtered', () => {
    const plain = render(DataTable, { columns, rows: [], rowKey });
    expect(plain.querySelector('td.empty .empty')).not.toBeNull();
    expect(text(plain.querySelector('td.empty'))).toBe('Nothing here yet.');
    const filtered = render(DataTable, { columns, rows: [], rowKey, filtered: true });
    expect(text(filtered.querySelector('td.empty'))).toContain('filters');
    const custom = render(DataTable, {
      columns,
      rows: [],
      rowKey,
      emptyTitle: 'No orders',
      emptyText: 'Old prop still works',
    });
    expect(text(custom.querySelector('td.empty h3'))).toBe('No orders');
    expect(text(custom.querySelector('td.empty p'))).toBe('Old prop still works');
  });
});

describe('empty states', () => {
  it('NotificationList uses EmptyState with title, message and icon', () => {
    const host = render(NotificationList, {
      items: [],
      emptyTitle: 'All caught up',
      emptyMessage: 'Nothing new.',
    });
    expect(text(host.querySelector('.empty h3'))).toBe('All caught up');
    expect(text(host.querySelector('.empty p'))).toBe('Nothing new.');
    expect(host.querySelector('.empty .icon-disc')).not.toBeNull();
    const legacy = render(NotificationList, { items: [], emptyText: 'Quiet' });
    expect(text(legacy.querySelector('.empty p'))).toBe('Quiet');
  });

  it('charts use EmptyState and keep the old emptyText', () => {
    expect(
      text(render(LineChart, { data: [], emptyMessage: 'No votes' }).querySelector('.empty p')),
    ).toBe('No votes');
    expect(
      text(render(HorizontalBarChart, { data: [], emptyText: 'Old' }).querySelector('.empty p')),
    ).toBe('Old');
    const titled = render(DivergingBarChart, { data: [], emptyTitle: 'Quiet week' });
    expect(text(titled.querySelector('.empty h3'))).toBe('Quiet week');
  });
});

describe('chart values for assistive tech', () => {
  beforeAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'clientWidth', {
      configurable: true,
      get: () => 600,
    });
  });
  afterAll(() => {
    delete (HTMLElement.prototype as unknown as Record<string, unknown>)['clientWidth'];
  });

  const table = (host: HTMLElement) => ({
    caption: text(host.querySelector('table caption')),
    head: [...host.querySelectorAll('table thead th')].map((th) => text(th)),
    rows: [...host.querySelectorAll('table tbody tr')].map((tr) =>
      [...tr.children].map((c) => text(c)),
    ),
    svgHidden: host.querySelector('svg')?.getAttribute('aria-hidden'),
  });

  it('LineChart', () => {
    const host = render(LineChart, {
      data: [
        { label: 'Mon', value: 4 },
        { label: 'Tue', value: null },
      ],
      label: 'Rating',
      valueLabel: 'Average',
      valueFormat: (v) => v.toFixed(1),
    });
    expect(table(host)).toEqual({
      caption: 'Rating',
      head: ['Period', 'Average'],
      rows: [
        ['Mon', '4.0'],
        ['Tue', 'No data'],
      ],
      svgHidden: 'true',
    });
  });

  it('DivergingBarChart', () => {
    const host = render(DivergingBarChart, {
      data: [{ label: 'Mon', up: 3, down: 1 }],
      label: 'Votes',
      categoryLabel: 'Day',
    });
    expect(table(host)).toEqual({
      caption: 'Votes',
      head: ['Day', 'Up', 'Down', 'Up share'],
      rows: [['Mon', '3', '1', expect.stringContaining('75')]],
      svgHidden: 'true',
    });
  });

  it('HorizontalBarChart', () => {
    const host = render(HorizontalBarChart, {
      data: [
        { label: '5★', value: 3 },
        { label: '1★', value: 1 },
      ],
    });
    const t = table(host);
    expect(t.caption).toBe('Count');
    expect(t.head).toEqual(['Category', 'Count', 'Share']);
    expect(t.rows[0]?.slice(0, 2)).toEqual(['5★', '3']);
    expect(t.svgHidden).toBe('true');
  });
});
