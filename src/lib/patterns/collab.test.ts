import { flushSync } from 'svelte';
import { click, input, key, render, tick } from '../test/render';
import AvatarStack from './molecules/AvatarStack.svelte';
import Banner from './molecules/Banner.svelte';
import Calendar from './molecules/Calendar.svelte';
import Carousel from './molecules/Carousel.svelte';
import Comment from './molecules/Comment.svelte';
import DatePicker from './molecules/DatePicker.svelte';
import Popover from './molecules/Popover.svelte';
import Reactions from './molecules/Reactions.svelte';
import Stat from './molecules/Stat.svelte';
import Stepper from './molecules/Stepper.svelte';
import TaskList from './molecules/TaskList.svelte';
import CommentThread from './organisms/CommentThread.svelte';
import KanbanBoard, { type KanbanCard } from './organisms/KanbanBoard.svelte';
import NotificationList from './organisms/NotificationList.svelte';
import { html } from '../test/render';
import { addMonths, candy, dayKey, relativeTime, sameDay, startOfDay } from '../utils/collab';

const NOW = new Date(2026, 10, 3, 10, 30);
const buttons = (host: HTMLElement) => [...host.querySelectorAll('button')];
const byText = (host: ParentNode, text: string) =>
  [...host.querySelectorAll('button')].find((b) => b.textContent?.trim() === text);
const byLabel = (host: ParentNode, label: string) =>
  host.querySelector<HTMLElement>(`[aria-label="${label}"]`);

describe('collab utils', () => {
  it('maps candy names to tokens and passes other colours through', () => {
    expect(candy('blue')).toBe('var(--color-blue)');
    expect(candy('#123456')).toBe('#123456');
    expect(candy(undefined)).toBe('var(--accent)');
    expect(candy(undefined, 'red')).toBe('red');
  });

  it('formats relative times', () => {
    expect(relativeTime(NOW, NOW)).toBe('now');
    expect(relativeTime(new Date(NOW.getTime() - 5 * 60_000), NOW)).toBe('5 minutes ago');
    expect(relativeTime(new Date(NOW.getTime() - 3 * 3600_000), NOW)).toBe('3 hours ago');
    expect(relativeTime(new Date(NOW.getTime() - 26 * 3600_000), NOW)).toBe('yesterday');
    expect(relativeTime(new Date(2026, 9, 1), NOW)).toMatch(/Oct/);
    expect(relativeTime(new Date(2024, 0, 5), NOW)).toMatch(/2024/);
    expect(relativeTime('2026-11-03T10:30:20', NOW)).toBe('now');
  });

  it('does date arithmetic on local days', () => {
    expect(dayKey(new Date(2026, 0, 5, 23, 59))).toBe('2026-01-05');
    expect(sameDay(new Date(2026, 0, 5, 1), new Date(2026, 0, 5, 22))).toBe(true);
    expect(dayKey(addMonths(new Date(2026, 0, 31), 1))).toBe('2026-02-28');
    expect(startOfDay(NOW).getHours()).toBe(0);
  });
});

describe('AvatarStack', () => {
  const people = ['Ada One', 'Ben Two', 'Cy Three', 'Di Four', 'Ed Five', 'Flo Six'].map(
    (name, i) => ({ name, presence: i === 0 ? ('online' as const) : undefined }),
  );

  it('shows up to max avatars and an overflow chip', () => {
    const host = render(AvatarStack, { people, max: 3 });
    expect(host.querySelectorAll('li')).toHaveLength(4);
    expect(host.textContent).toContain('+3');
    expect(host.querySelector('.dot--online')).not.toBeNull();
    expect(host.textContent).toContain('Ada One · online');
  });

  it('never cuts a single avatar into "+1"', () => {
    const host = render(AvatarStack, { people: people.slice(0, 4), max: 3 });
    expect(host.textContent).not.toContain('+1');
    expect(host.querySelectorAll('li')).toHaveLength(4);
  });

  it('makes avatars buttons with onselect', () => {
    const onselect = vi.fn();
    const host = render(AvatarStack, { people: people.slice(0, 2), onselect });
    click(buttons(host)[1]);
    expect(onselect).toHaveBeenCalledWith(people[1]);
  });
});

describe('Popover', () => {
  it('opens on click, closes on Escape and outside clicks', async () => {
    const onopenchange = vi.fn();
    const host = render(Popover, {
      label: 'Filters',
      title: 'Filter cards',
      onopenchange,
      children: html('<div><button>Apply</button></div>'),
    });
    const trigger = byText(host, 'Filters')!;
    click(trigger);
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
    const panel = document.querySelector('[role="dialog"]')!;
    expect(panel.textContent).toContain('Filter cards');
    await tick();

    key(document.body, 'Escape');
    expect(document.querySelector('[role="dialog"]')).toBeNull();
    expect(onopenchange).toHaveBeenLastCalledWith(false);

    click(trigger);
    document.body.dispatchEvent(new Event('pointerdown', { bubbles: true }));
    flushSync();
    expect(document.querySelector('[role="dialog"]')).toBeNull();
  });

  it('keeps the panel open on clicks inside', () => {
    const host = render(Popover, {
      label: 'More',
      open: true,
      children: html('<p class="inside">Hi</p>'),
    });
    const inside = document.querySelector('.inside')!;
    inside.dispatchEvent(new Event('pointerdown', { bubbles: true }));
    flushSync();
    expect(document.querySelector('[role="dialog"]')).not.toBeNull();
    click(byText(host, 'More'));
    expect(document.querySelector('[role="dialog"]')).toBeNull();
  });
});

describe('Reactions', () => {
  it('toggles your own reaction and updates the count', () => {
    const ontoggle = vi.fn();
    const host = render(Reactions, {
      reactions: [
        { emoji: '👍', count: 2, people: ['A', 'B'] },
        { emoji: '🎉', count: 1, mine: true },
      ],
      ontoggle,
    });
    const [thumbs, party] = buttons(host);
    expect(thumbs!.getAttribute('aria-pressed')).toBe('false');
    click(thumbs);
    expect(ontoggle).toHaveBeenCalledWith('👍', true);
    expect(buttons(host)[0]!.textContent).toContain('3');
    click(party);
    expect(ontoggle).toHaveBeenCalledWith('🎉', false);
    // a reaction at zero disappears
    expect(host.textContent).not.toContain('🎉');
  });

  it('adds a new reaction from the picker', () => {
    const ontoggle = vi.fn();
    const host = render(Reactions, { reactions: [], choices: ['🚀', '👀'], ontoggle });
    click(byLabel(host, 'Add reaction'));
    click(byLabel(document, '🚀'));
    expect(ontoggle).toHaveBeenCalledWith('🚀', true);
    expect(host.querySelector('[aria-pressed="true"]')?.textContent).toContain('🚀');
  });

  it('is read-only on request', () => {
    const host = render(Reactions, { reactions: [{ emoji: '👍', count: 1 }], readonly: true });
    expect(byLabel(host, 'Add reaction')).toBeNull();
    expect(buttons(host)[0]!.disabled).toBe(true);
  });
});

describe('Comment', () => {
  it('renders author, role, relative time and plain text', () => {
    const onreply = vi.fn();
    const host = render(Comment, {
      author: 'Mara Lindqvist',
      role: 'Owner',
      time: new Date(NOW.getTime() - 120_000),
      text: '<b>not bold</b>',
      now: NOW,
      edited: true,
      onreply,
    });
    expect(host.textContent).toContain('Owner');
    expect(host.textContent).toContain('2 minutes ago');
    expect(host.textContent).toContain('edited');
    expect(host.querySelector('b')).toBeNull();
    click(byText(host, 'Reply'));
    expect(onreply).toHaveBeenCalled();
  });
});

describe('CommentThread', () => {
  const comments = [
    { id: '1', author: 'A B', time: NOW, text: 'First' },
    { id: '2', author: 'C D', time: NOW, text: 'Second', reactions: [{ emoji: '👍', count: 1 }] },
  ];

  it('sends a reply and clears the box', async () => {
    const onreply = vi.fn(() => Promise.resolve());
    const host = render(CommentThread, { comments, quote: 'Launch', onreply, now: NOW });
    expect(host.querySelector('blockquote')?.textContent).toBe('Launch');
    const box = host.querySelector('textarea')!;
    input(box, 'Sounds good');
    click(byText(host, 'Reply'));
    expect(onreply).toHaveBeenCalledWith('Sounds good');
    await tick();
    flushSync();
    expect(host.querySelector('textarea')!.value).toBe('');
  });

  it('resolves, folds and reopens', () => {
    const onresolve = vi.fn();
    const host = render(CommentThread, { comments, onresolve, onreply: () => {} });
    click(byText(host, 'Resolve'));
    expect(onresolve).toHaveBeenCalledWith(true);
    expect(host.textContent).toContain('2 comments');
    expect(host.querySelector('textarea')).toBeNull();
    click(host.querySelector('.folded'));
    click(byText(host, 'Reopen'));
    expect(onresolve).toHaveBeenLastCalledWith(false);
  });

  it('forwards reactions with the comment id', () => {
    const onreact = vi.fn();
    const host = render(CommentThread, { comments, onreact });
    click(host.querySelector('[aria-pressed]'));
    expect(onreact).toHaveBeenCalledWith('2', '👍', true);
  });
});

describe('TaskList', () => {
  const items = () => [
    { id: 'a', label: 'One', done: true },
    { id: 'b', label: 'Two', done: false, assignee: 'X Y', due: 'Fri' },
  ];

  it('shows progress and toggles items', () => {
    const ontoggle = vi.fn();
    const host = render(TaskList, { items: items(), title: 'Checklist', ontoggle });
    expect(host.textContent).toContain('1 of 2 done');
    const boxes = host.querySelectorAll<HTMLInputElement>('input[type="checkbox"]');
    boxes[1]!.click();
    flushSync();
    expect(ontoggle).toHaveBeenCalledWith(expect.objectContaining({ id: 'b', done: true }));
    expect(host.textContent).toContain('2 of 2 done');
    expect(host.querySelector('.bar.complete')).not.toBeNull();
    expect(host.querySelector('.cheer')?.textContent).toBe("All done — that's a sweet day.");
  });

  it('adds and removes items', () => {
    const onadd = vi.fn();
    const onremove = vi.fn();
    const host = render(TaskList, { items: items(), onadd, onremove });
    const field = host.querySelector<HTMLInputElement>('input[type="text"]')!;
    input(field, '  Three ');
    host
      .querySelector('form')!
      .dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    flushSync();
    expect(onadd).toHaveBeenCalledWith(expect.objectContaining({ label: 'Three', done: false }));
    expect(host.querySelectorAll('li')).toHaveLength(3);
    click(byLabel(host, 'Remove One'));
    expect(onremove).toHaveBeenCalledWith(expect.objectContaining({ id: 'a' }));
    expect(host.querySelectorAll('li')).toHaveLength(2);
  });

  it('sinks done items and shows an empty text', () => {
    const host = render(TaskList, { items: items(), sinkDone: true, editable: false });
    expect(host.querySelector('li')?.textContent).toContain('Two');
    expect(host.querySelector('form')).toBeNull();
    const empty = render(TaskList, { items: [] });
    expect(empty.textContent).toContain('Nothing on the list. Enjoy the calm.');
  });
});

describe('Calendar', () => {
  const events = [
    { id: 'e1', title: 'Planning', start: new Date(2026, 10, 3, 9, 30), color: 'blue' },
    {
      id: 'e2',
      title: 'Offsite',
      start: new Date(2026, 10, 9),
      end: new Date(2026, 10, 10),
      allDay: true,
    },
    { id: 'e3', title: 'A', start: new Date(2026, 10, 3, 11) },
    { id: 'e4', title: 'B', start: new Date(2026, 10, 3, 12) },
    { id: 'e5', title: 'C', start: new Date(2026, 10, 3, 13) },
  ];
  const day = (host: HTMLElement, key: string) =>
    host.querySelector<HTMLButtonElement>(`[data-day="${key}"]`)!;

  it('renders the month with today, events and overflow', () => {
    const host = render(Calendar, { today: NOW, events });
    expect(host.querySelector('h3')?.textContent).toBe('November 2026');
    expect(day(host, '2026-11-03').getAttribute('aria-current')).toBe('date');
    expect(day(host, '2026-11-03').tabIndex).toBe(0);
    expect(host.textContent).toContain('Planning');
    expect(host.textContent).toContain('+1 more');
    // multi-day events show on each day
    expect(host.querySelectorAll('.pill[title="Offsite"]')).toHaveLength(2);
    // weeks start on Monday: 26 Oct 2026 is the first cell
    expect(host.querySelector('[data-day]')?.getAttribute('data-day')).toBe('2026-10-26');
  });

  it('selects a day and reports events', () => {
    const onselect = vi.fn();
    const onevent = vi.fn();
    const host = render(Calendar, { today: NOW, events, onselect, onevent });
    click(day(host, '2026-11-05'));
    expect(onselect.mock.calls[0]![0].getDate()).toBe(5);
    expect(
      day(host, '2026-11-05').closest('[role="gridcell"]')?.getAttribute('aria-selected'),
    ).toBe('true');
    click(host.querySelector('.pill'));
    expect(onevent).toHaveBeenCalledWith(events[0]);
  });

  it('moves between months with buttons and keys', async () => {
    const onmonthchange = vi.fn();
    const host = render(Calendar, { today: NOW, onmonthchange, size: 'sm' });
    click(byLabel(host, 'Next month'));
    expect(host.querySelector('h3')?.textContent).toBe('December 2026');
    click(byLabel(host, 'Previous month'));
    click(byLabel(host, 'Previous month'));
    expect(host.querySelector('h3')?.textContent).toBe('October 2026');
    expect(onmonthchange).toHaveBeenCalledTimes(3);

    const host2 = render(Calendar, { today: NOW });
    key(day(host2, '2026-11-03'), 'ArrowRight');
    await tick();
    expect(day(host2, '2026-11-04').tabIndex).toBe(0);
    key(day(host2, '2026-11-04'), 'ArrowDown');
    await tick();
    expect(day(host2, '2026-11-11').tabIndex).toBe(0);
    key(day(host2, '2026-11-11'), 'Home');
    await tick();
    expect(day(host2, '2026-11-09').tabIndex).toBe(0);
    key(day(host2, '2026-11-09'), 'PageDown');
    await tick();
    expect(host2.querySelector('h3')?.textContent).toBe('December 2026');
    click(byText(host2, 'Today'));
    expect(host2.querySelector('h3')?.textContent).toBe('November 2026');
  });

  it('disables days outside min and max', () => {
    const host = render(Calendar, {
      today: NOW,
      min: new Date(2026, 10, 2),
      max: new Date(2026, 10, 20),
      weekStart: 0,
    });
    expect(day(host, '2026-11-01').disabled).toBe(true);
    expect(day(host, '2026-11-21').disabled).toBe(true);
    expect(day(host, '2026-11-02').disabled).toBe(false);
  });
});

describe('DatePicker', () => {
  it('opens a calendar, picks a date and clears it', async () => {
    const onchange = vi.fn();
    const host = render(DatePicker, { label: 'Due date', today: NOW, onchange });
    const field = host.querySelector<HTMLButtonElement>('.field')!;
    expect(field.textContent).toContain('Pick a date');
    click(field);
    const cell = document.querySelector<HTMLButtonElement>('[data-day="2026-11-12"]')!;
    click(cell);
    expect(onchange.mock.calls[0]![0].getDate()).toBe(12);
    expect(document.querySelector('[role="dialog"]')).toBeNull();
    expect(field.textContent).toContain('Nov 12, 2026');
    expect(field.getAttribute('aria-label')).toBe('Due date: Nov 12, 2026');
    click(byLabel(host, 'Clear date'));
    expect(onchange).toHaveBeenLastCalledWith(undefined);
    expect(field.textContent).toContain('Pick a date');
  });
});

describe('KanbanBoard', () => {
  const columns = [
    { id: 'todo', title: 'To do' },
    { id: 'doing', title: 'Doing', limit: 1 },
    { id: 'done', title: 'Done' },
  ];
  const cards = (): KanbanCard[] => [
    {
      id: 'a',
      column: 'todo',
      title: 'Alpha',
      priority: 'urgent',
      tags: ['Design', { label: 'Web', color: 'blue' }],
      due: new Date(2026, 10, 1),
      tasks: { done: 2, total: 2 },
      comments: 3,
      assignees: [{ name: 'X Y' }],
      color: 'pink',
    },
    { id: 'b', column: 'todo', title: 'Beta', due: NOW },
    { id: 'c', column: 'doing', title: 'Gamma', description: 'Text' },
  ];
  const order = (host: HTMLElement, column: number) =>
    [...host.querySelectorAll('.column')[column]!.querySelectorAll('.open')].map((b) =>
      b.textContent?.trim(),
    );
  const open = (host: HTMLElement, id: string) =>
    host.querySelector<HTMLButtonElement>(`[data-open="${id}"]`)!;

  it('renders columns, counts, limits and card meta', () => {
    const host = render(KanbanBoard, { columns, cards: cards(), now: NOW });
    expect(order(host, 0)).toEqual(['Alpha', 'Beta']);
    expect(host.querySelector('.column-count.full')?.textContent).toContain('1/1');
    expect(host.textContent).toContain('Urgent');
    expect(host.querySelector('.due--overdue')).not.toBeNull();
    expect(host.querySelector('.due--today')).not.toBeNull();
    expect(host.querySelector('.meta-item.complete')).not.toBeNull();
    expect(host.textContent).toContain('Drop cards here');
  });

  it('moves cards with Alt + arrows and announces it', async () => {
    const onmove = vi.fn();
    const host = render(KanbanBoard, { columns, cards: cards(), onmove });
    key(open(host, 'a'), 'ArrowDown', { altKey: true });
    expect(onmove).toHaveBeenLastCalledWith('a', 'todo', 1);
    expect(order(host, 0)).toEqual(['Beta', 'Alpha']);
    key(open(host, 'a'), 'ArrowRight', { altKey: true });
    expect(onmove).toHaveBeenLastCalledWith('a', 'doing', 1);
    expect(order(host, 1)).toEqual(['Gamma', 'Alpha']);
    expect(host.querySelector('.column-count.over')).not.toBeNull();
    expect(host.textContent).toContain('Moved “Alpha” to Doing, position 2 of 2.');
    key(open(host, 'a'), 'ArrowUp', { altKey: true });
    expect(order(host, 1)).toEqual(['Alpha', 'Gamma']);
    key(open(host, 'a'), 'ArrowLeft', { altKey: true });
    expect(order(host, 0)).toEqual(['Alpha', 'Beta']);
    // nothing left of the first column
    onmove.mockClear();
    key(open(host, 'a'), 'ArrowLeft', { altKey: true });
    expect(onmove).not.toHaveBeenCalled();
    await tick();
  });

  it('walks the board with plain arrows', async () => {
    const host = render(KanbanBoard, { columns, cards: cards() });
    open(host, 'a').focus();
    key(open(host, 'a'), 'ArrowDown');
    await tick();
    expect(document.activeElement).toBe(open(host, 'b'));
    key(open(host, 'b'), 'ArrowRight');
    await tick();
    expect(document.activeElement).toBe(open(host, 'c'));
    key(open(host, 'c'), 'ArrowUp');
    key(open(host, 'c'), 'Enter');
  });

  it('moves cards with the menu', () => {
    const onmove = vi.fn();
    const host = render(KanbanBoard, { columns, cards: cards(), onmove });
    click(byLabel(host, 'Move to… Beta'));
    click(byText(document, 'Done'));
    expect(onmove).toHaveBeenCalledWith('b', 'done', 0);
    expect(order(host, 2)).toEqual(['Beta']);
    click(byLabel(host, 'Move to… Alpha'));
    expect(byText(document, 'Move up')!.disabled).toBe(true);
    click(byText(document, 'Move down'));
    expect(onmove).toHaveBeenCalledTimes(1);
    click(byLabel(host, 'Move to… Gamma'));
    click(byText(document, 'Move up'));
  });

  it('moves cards by drag and drop', () => {
    const onmove = vi.fn();
    const host = render(KanbanBoard, { columns, cards: cards(), onmove });
    const card = host.querySelector('[data-card="a"]')!;
    const target = host.querySelectorAll('.cards')[2]!;
    const drag = (type: string, el: Element) => {
      const event = new Event(type, { bubbles: true, cancelable: true }) as DragEvent;
      Object.defineProperty(event, 'clientY', { value: 500 });
      el.dispatchEvent(event);
      flushSync();
    };
    drag('dragstart', card);
    expect(card.classList.contains('dragging')).toBe(true);
    drag('dragover', target);
    expect(host.querySelector('.slot')).not.toBeNull();
    drag('drop', target);
    expect(onmove).toHaveBeenCalledWith('a', 'done', 0);
    expect(order(host, 2)).toEqual(['Alpha']);
    drag('dragend', host.querySelector('[data-card="a"]')!);
    expect(host.querySelector('.slot')).toBeNull();
  });

  it('opens and adds cards', () => {
    const onopen = vi.fn();
    const onadd = vi.fn();
    const host = render(KanbanBoard, { columns, cards: cards(), onopen, onadd, selected: 'c' });
    click(open(host, 'c'));
    expect(onopen).toHaveBeenCalledWith(expect.objectContaining({ id: 'c' }));
    expect(host.querySelector('.card.selected')).not.toBeNull();
    click(host.querySelector('.add'));
    expect(onadd).toHaveBeenCalledWith('todo');
    click(byLabel(host, 'Add card: Done'));
    expect(onadd).toHaveBeenLastCalledWith('done');
  });
});

describe('NotificationList', () => {
  const items = () => [
    { id: '1', title: 'Mentioned', time: NOW, unread: true, actor: 'A B' },
    { id: '2', title: 'Moved', body: 'Card', time: NOW, unread: true, icon: 'kanban' as const },
    { id: '3', title: 'Old', time: new Date(2026, 9, 1), href: '#x' },
  ];

  it('marks items read on open and all at once', () => {
    const onopen = vi.fn();
    const onread = vi.fn();
    const host = render(NotificationList, { items: items(), now: NOW, onopen, onread });
    expect(host.textContent).toContain('2 unread');
    click(byText(host, 'Mark all as read')?.closest('button') ?? host.querySelector('.mark-all'));
    expect(onread).toHaveBeenCalledWith(['1', '2']);
    expect(host.querySelector('.dot')).toBeNull();
    expect(host.querySelector('.mark-all')).toBeNull();
    click(host.querySelector('a'));
    expect(onopen).toHaveBeenCalledWith(expect.objectContaining({ id: '3' }));
  });

  it('opening an unread item marks it', () => {
    const onread = vi.fn();
    const host = render(NotificationList, { items: items(), onread, onopen: () => {} });
    click(host.querySelectorAll('.item')[1]);
    expect(onread).toHaveBeenCalledWith(['2']);
    expect(host.textContent).toContain('1 unread');
  });

  it('shows an empty state', () => {
    const host = render(NotificationList, { items: [] });
    expect(host.textContent).toContain('You are all caught up.');
  });
});

describe('Stepper', () => {
  const steps = [
    { label: 'Cart' },
    { label: 'Address', description: 'Where to' },
    { label: 'Pay' },
  ];

  it('derives statuses from current', () => {
    const host = render(Stepper, { steps, current: 1 });
    const items = host.querySelectorAll('li');
    expect(items[0]!.className).toContain('step--complete');
    expect(items[1]!.getAttribute('aria-current')).toBe('step');
    expect(items[2]!.className).toContain('step--upcoming');
    expect(host.textContent).toContain('Step 2 of 3');
    expect(host.querySelector('button')).toBeNull();
  });

  it('lets finished steps be selected and shows errors', () => {
    const onselect = vi.fn();
    const host = render(Stepper, {
      steps: [...steps.slice(0, 2), { label: 'Pay', status: 'error' }],
      current: 2,
      orientation: 'vertical',
      onselect,
    });
    click(host.querySelector('button'));
    expect(onselect).toHaveBeenCalledWith(0);
    expect(host.querySelector('.step--error')).not.toBeNull();
  });
});

describe('Carousel', () => {
  it('pages through direct child slides', () => {
    const onchange = vi.fn();
    const host = render(Carousel, {
      label: 'Featured',
      onchange,
      children: html('<div>1</div>'),
    });
    const track = host.querySelector<HTMLElement>('.track')!;
    track.append(document.createElement('div'), document.createElement('div'));
    flushSync();
    return tick().then(() => {
      flushSync();
      expect(host.querySelectorAll('.dot')).toHaveLength(3);
      click(byLabel(host, 'Next slide'));
      expect(onchange).toHaveBeenLastCalledWith(1);
      click(byLabel(host, 'Go to slide 3 of 3'));
      expect(onchange).toHaveBeenLastCalledWith(2);
      expect(byLabel(host, 'Next slide')!.hasAttribute('disabled')).toBe(true);
      key(track, 'ArrowLeft');
      expect(onchange).toHaveBeenLastCalledWith(1);
      key(track, 'ArrowRight');
      expect(onchange).toHaveBeenLastCalledWith(2);
      track.dispatchEvent(new Event('scroll'));
      expect(track.children[0]!.getAttribute('aria-roledescription')).toBe('slide');
    });
  });
});

describe('Banner', () => {
  it('shows tone, title and dismisses', () => {
    const ondismiss = vi.fn();
    const host = render(Banner, {
      tone: 'warn',
      title: 'Maintenance',
      message: 'Tonight 22:00',
      ondismiss,
    });
    // Only danger is announced as an alert.
    expect(host.querySelector('[role="status"]')).not.toBeNull();
    expect(host.textContent).toContain('Maintenance');
    click(byLabel(host, 'Dismiss'));
    expect(ondismiss).toHaveBeenCalled();
    expect(host.textContent).not.toContain('Maintenance');
  });

  it('hides icon and close button on request', () => {
    const host = render(Banner, {
      message: 'Hi',
      icon: null,
      dismissible: false,
      variant: 'solid',
    });
    expect(host.querySelector('[role="status"]')).not.toBeNull();
    expect(host.querySelector('svg')).toBeNull();
    expect(host.querySelector('button')).toBeNull();
  });
});

describe('Stat', () => {
  it('formats value and a good delta with a sparkline', () => {
    const host = render(Stat, {
      label: 'Revenue',
      value: 12840,
      unit: '€',
      delta: 12.5,
      deltaLabel: 'vs last week',
      trend: [1, 3, 2, 5],
      icon: 'chart',
    });
    expect(host.textContent).toContain('12,840');
    expect(host.textContent).toContain('+12.5 %');
    expect(host.querySelector('.delta--good')).not.toBeNull();
    expect(host.querySelector('svg.spark')?.getAttribute('aria-label')).toBe('Trend: 1, 3, 2, 5');
    expect(host.querySelector('.end')).not.toBeNull();
  });

  it('colours a rise as bad when down is good, and handles flat', () => {
    const bad = render(Stat, { label: 'Open bugs', value: '42', delta: 4, goodWhen: 'down' });
    expect(bad.querySelector('.delta--bad')).not.toBeNull();
    const flat = render(Stat, { label: 'X', value: 1, delta: 0, trend: [2, 2] });
    expect(flat.querySelector('.delta--neutral')).not.toBeNull();
    const custom = render(Stat, { label: 'X', value: 1, deltaText: '+3 new', size: 'lg' });
    expect(custom.textContent).toContain('+3 new');
  });
});
