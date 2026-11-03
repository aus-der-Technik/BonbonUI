import { flushSync } from 'svelte';
import { click, html, input, key, render, tick } from '../../test/render';
import Alert from './Alert.svelte';
import Autocomplete from './Autocomplete.svelte';
import ChartTooltip from './ChartTooltip.svelte';
import ChoiceCard from './ChoiceCard.svelte';
import CodeInput from './CodeInput.svelte';
import Composer from './Composer.svelte';
import ConfirmButton from './ConfirmButton.svelte';
import DetailHeader from './DetailHeader.svelte';
import DetailList from './DetailList.svelte';
import DetailSection from './DetailSection.svelte';
import Disclosure from './Disclosure.svelte';
import DropdownMenu from './DropdownMenu.svelte';
import EmptyState from './EmptyState.svelte';
import Field from './Field.svelte';
import FileDropzone from './FileDropzone.svelte';
import FilterBar from './FilterBar.svelte';
import GlassPill from './GlassPill.svelte';
import IdentityCell from './IdentityCell.svelte';
import KpiTile from './KpiTile.svelte';
import Legend from './Legend.svelte';
import MultiSelect from './MultiSelect.svelte';
import Pager from './Pager.svelte';
import Picker from './Picker.svelte';
import RatingDisplay from './RatingDisplay.svelte';
import RefreshButton from './RefreshButton.svelte';
import SearchField from './SearchField.svelte';
import SegmentedControl from './SegmentedControl.svelte';
import SignInCard from './SignInCard.svelte';
import StarInput from './StarInput.svelte';
import StructTree, { complete, setIn, structFields } from './StructTree.svelte';
import Tabs from './Tabs.svelte';
import TagInput from './TagInput.svelte';
import TagList from './TagList.svelte';
import ThumbsInput from './ThumbsInput.svelte';
import TitlePill from './TitlePill.svelte';
import Toast from './Toast.svelte';
import ToggleChip from './ToggleChip.svelte';
import UserMenu from './UserMenu.svelte';

const buttons = (host: HTMLElement) => [...host.querySelectorAll('button')];
const byText = (host: HTMLElement, text: string) =>
  buttons(host).find((b) => b.textContent?.trim() === text);

describe('SegmentedControl', () => {
  it('presses one segment and reports changes only', () => {
    const onchange = vi.fn();
    const host = render(SegmentedControl, {
      label: 'Range',
      value: 30,
      options: [
        { value: 7, label: '7 days' },
        { value: 30, label: '30 days' },
      ],
      onchange,
    });
    expect(byText(host, '30 days')?.getAttribute('aria-pressed')).toBe('true');
    click(byText(host, '30 days'));
    expect(onchange).not.toHaveBeenCalled();
    click(byText(host, '7 days'));
    expect(onchange).toHaveBeenCalledWith(7);
    expect(byText(host, '7 days')?.getAttribute('aria-pressed')).toBe('true');
  });
});

describe('ToggleChip', () => {
  it('toggles aria-pressed and shows its count', () => {
    const onchange = vi.fn();
    const host = render(ToggleChip, {
      label: 'Places',
      color: 'red',
      count: 3,
      pressed: true,
      onchange,
    });
    const chip = host.querySelector('button');
    expect(chip?.querySelector('b')?.textContent).toBe('3');
    click(chip);
    expect(onchange).toHaveBeenCalledWith(false);
    expect(chip?.getAttribute('aria-pressed')).toBe('false');
  });
});

describe('MultiSelect', () => {
  const groups = [
    {
      label: 'Thumbs',
      options: [
        { value: 'up', label: 'Thumbs up' },
        { value: 'down', label: 'Thumbs down' },
      ],
    },
    { label: 'Stars', options: [{ value: '5', label: '5 stars', stars: 5 }] },
  ];

  it('summarises the selection', () => {
    expect(
      render(MultiSelect, {
        label: 'Rating',
        allLabel: 'All',
        groups,
        value: [],
        onchange: () => {},
      }).textContent,
    ).toContain('All');
    expect(
      render(MultiSelect, { label: 'Rating', groups, value: ['up'], onchange: () => {} })
        .textContent,
    ).toContain('Thumbs up');
    expect(
      render(MultiSelect, {
        label: 'Rating',
        unit: 'ratings',
        groups,
        value: ['up', '5'],
        onchange: () => {},
      }).textContent,
    ).toContain('2 ratings');
  });

  it('toggles options and groups in option order, clears, closes on Escape', async () => {
    const onchange = vi.fn();
    const host = render(MultiSelect, { label: 'Rating', groups, value: ['5'], onchange });
    click(host.querySelector('button'));
    await tick();
    const boxes = [...host.querySelectorAll<HTMLInputElement>('input[type="checkbox"]')];
    expect(boxes).toHaveLength(3);
    boxes[0]!.checked = true;
    boxes[0]!.dispatchEvent(new Event('change', { bubbles: true }));
    expect(onchange).toHaveBeenLastCalledWith(['up', '5']);

    click(byText(host, 'Thumbs'));
    expect(onchange).toHaveBeenLastCalledWith(['up', 'down', '5']);

    click(byText(host, 'Clear'));
    expect(onchange).toHaveBeenLastCalledWith([]);

    key(host.querySelector('.multi')!, 'Escape');
    expect(host.querySelector('[role="group"]')).toBeNull();
  });

  it('closes on an outside pointer and says when there is nothing', () => {
    const host = render(MultiSelect, {
      label: 'Source',
      groups: [{ options: [] }],
      value: [],
      onchange: () => {},
    });
    click(host.querySelector('button'));
    expect(host.textContent).toContain('Nothing to pick from yet.');
    document.body.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
    flushSync();
    expect(host.textContent).not.toContain('Nothing to pick from yet.');
  });
});

describe('Autocomplete', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  const suggestions = [
    { label: 'Frankfurt am Main', meta: 'Place', color: 'red' },
    { label: 'Frankfurt Airport' },
  ];

  it('queries debounced from minChars on', () => {
    const onquery = vi.fn();
    const host = render(Autocomplete, { label: 'Search', onquery, onsearch: () => {} });
    const field = host.querySelector('input')!;
    input(field, 'f');
    vi.advanceTimersByTime(200);
    expect(onquery).not.toHaveBeenCalled();
    input(field, 'fra');
    vi.advanceTimersByTime(200);
    expect(onquery).toHaveBeenCalledWith('fra');
  });

  it('navigates suggestions with the keyboard and picks one', () => {
    const onsearch = vi.fn();
    const host = render(Autocomplete, { label: 'Search', value: 'fra', suggestions, onsearch });
    const field = host.querySelector('input')!;
    field.dispatchEvent(new FocusEvent('focus'));
    flushSync();
    expect(host.querySelectorAll('[role="option"]')).toHaveLength(2);
    key(field, 'ArrowDown');
    key(field, 'ArrowDown');
    key(field, 'ArrowUp');
    expect(field.getAttribute('aria-activedescendant')).toMatch(/opt-0$/);
    key(field, 'Enter');
    expect(onsearch).toHaveBeenCalledWith('Frankfurt am Main', suggestions[0]);
  });

  it('submits free text, picks by pointer and closes on Escape', () => {
    const onsearch = vi.fn();
    const host = render(Autocomplete, { label: 'Search', value: 'fra', suggestions, onsearch });
    const field = host.querySelector('input')!;
    field.dispatchEvent(new FocusEvent('focus'));
    flushSync();
    key(field, 'Escape');
    expect(host.querySelector('[role="listbox"]')).toBeNull();
    key(field, 'Enter');
    expect(onsearch).toHaveBeenLastCalledWith('fra', null);

    key(field, 'ArrowUp');
    host
      .querySelectorAll('[role="option"]')[1]!
      .dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    flushSync();
    expect(onsearch).toHaveBeenLastCalledWith('Frankfurt Airport', suggestions[1]);

    field.dispatchEvent(new FocusEvent('blur'));
    vi.advanceTimersByTime(200);
    click(byText(host, 'Search'));
    expect(onsearch).toHaveBeenCalledTimes(3);
  });
});

describe('Picker', () => {
  const options = [
    { value: 'a', title: 'Venues', meta: '8 rows' },
    { value: 'b', title: 'Awards', marks: [{ label: 'draft', tone: 'draft' as const }] },
  ];

  it('opens, moves with arrows and picks with Enter', async () => {
    const onchange = vi.fn();
    const host = render(Picker, {
      options,
      value: 'a',
      label: 'Data product',
      heading: 'Products',
      onchange,
    });
    const trigger = host.querySelector('button')!;
    expect(trigger.textContent).toContain('Venues');
    click(trigger);
    await tick();
    const list = host.querySelector('[role="listbox"]')!;
    expect(host.textContent).toContain('Products');
    key(list, 'ArrowDown');
    key(list, 'End');
    key(list, 'Home');
    key(list, 'ArrowUp');
    key(list, 'Enter');
    expect(onchange).toHaveBeenCalledWith('b');
    expect(host.querySelector('[role="listbox"]')).toBeNull();
  });

  it('ignores re-picking the current option and closes on Escape', async () => {
    const onchange = vi.fn();
    const host = render(Picker, { options, value: 'a', label: 'Data product', onchange });
    click(host.querySelector('button'));
    await tick();
    click(host.querySelector('[role="option"]'));
    expect(onchange).not.toHaveBeenCalled();
    click(host.querySelector('button'));
    await tick();
    key(host.querySelector('[role="listbox"]')!, 'Escape');
    expect(host.querySelector('[role="listbox"]')).toBeNull();
    expect(
      render(Picker, { options, value: null, label: 'x', placeholder: 'Choose' }).textContent,
    ).toContain('Choose');
  });
});

describe('UserMenu', () => {
  it('opens a menu with the address and signs out', async () => {
    const onsignout = vi.fn();
    const host = render(UserMenu, { email: 'jane.doe@example.com', onsignout });
    click(host.querySelector('button'));
    await tick();
    expect(host.querySelector('[role="menu"]')?.textContent).toContain('jane.doe@example.com');
    key(host.querySelector('.dropdown')!, 'ArrowDown');
    key(host.querySelector('.dropdown')!, 'ArrowUp');
    click(host.querySelector('[role="menuitem"]'));
    expect(onsignout).toHaveBeenCalledOnce();
    expect(host.querySelector('[role="menu"]')).toBeNull();

    click(host.querySelector('button'));
    key(host.querySelector('.dropdown')!, 'Escape');
    expect(host.querySelector('[role="menu"]')).toBeNull();
  });
});

describe('ConfirmButton', () => {
  it('arms first, then confirms; cancel disarms', async () => {
    const onconfirm = vi.fn();
    const host = render(ConfirmButton, { onconfirm });
    click(byText(host, 'Delete'));
    expect(onconfirm).not.toHaveBeenCalled();
    click(byText(host, 'Cancel'));
    expect(byText(host, 'Delete')).toBeDefined();
    click(byText(host, 'Delete'));
    click(byText(host, 'Delete permanently'));
    await tick();
    flushSync();
    expect(onconfirm).toHaveBeenCalledOnce();
    expect(byText(host, 'Delete')).toBeDefined();
  });

  it('shows the rejection message', async () => {
    const host = render(ConfirmButton, {
      onconfirm: () => Promise.reject(new Error('403 Forbidden')),
    });
    click(byText(host, 'Delete'));
    click(byText(host, 'Delete permanently'));
    await tick();
    flushSync();
    expect(host.querySelector('[role="alert"]')?.textContent).toBe('403 Forbidden');
  });
});

describe('Pager', () => {
  it('shows the range and pages within bounds', () => {
    const onpage = vi.fn();
    const host = render(Pager, { offset: 25, limit: 25, total: 60, onpage });
    expect(host.textContent).toContain('26–50');
    expect(host.textContent).toContain('60');
    click(byText(host, 'Previous'));
    click(byText(host, 'Next'));
    expect(onpage.mock.calls).toEqual([[0], [50]]);

    const last = render(Pager, { offset: 50, limit: 25, total: 60, onpage: () => {} });
    expect(byText(last, 'Next')?.getAttribute('aria-disabled')).toBe('true');
    expect(
      render(Pager, { offset: 0, limit: 25, total: 0, onpage: () => {} }).textContent,
    ).not.toContain('of');
  });
});

describe('rating inputs', () => {
  it('ThumbsInput and StarInput report the pick', () => {
    const thumbs = vi.fn();
    const t = render(ThumbsInput, { onchange: thumbs });
    click(t.querySelectorAll('[role="radio"]')[1]);
    expect(thumbs).toHaveBeenCalledWith('down');
    expect(t.querySelectorAll('[role="radio"]')[1]?.getAttribute('aria-checked')).toBe('true');

    const stars = vi.fn();
    const s = render(StarInput, { onchange: stars });
    click(s.querySelectorAll('button')[3]);
    expect(stars).toHaveBeenCalledWith(4);
    expect(s.querySelectorAll('button.on')).toHaveLength(4);
  });

  it('RatingDisplay shows thumbs or stars', () => {
    expect(render(RatingDisplay, { type: 'thumbs', value: 'up' }).textContent).toContain('Up');
    expect(
      render(RatingDisplay, { type: 'thumbs', value: 'down' }).querySelector('.down'),
    ).not.toBeNull();
    expect(
      render(RatingDisplay, { type: 'stars', value: '3' }).querySelector(
        '[aria-label="3 of 5 stars"]',
      ),
    ).not.toBeNull();
  });
});

describe('display molecules', () => {
  it('KpiTile shows a placeholder and a meter', () => {
    const empty = render(KpiTile, { label: 'Average', value: null });
    expect(empty.textContent).toContain('–');
    const host = render(KpiTile, {
      label: 'Share',
      value: '80 %',
      meter: [
        { value: 4, color: 'blue' },
        { value: 1, color: 'red' },
      ],
    });
    expect(host.querySelectorAll('.meter span')).toHaveLength(2);
    expect(
      render(KpiTile, { label: 'x', value: 1, children: html('<em>d</em>') }).querySelector('em'),
    ).not.toBeNull();
  });

  it('Alert, Toast, EmptyState pick roles from their tone', () => {
    expect(render(Alert, { message: 'boom' }).querySelector('[role="alert"]')).not.toBeNull();
    expect(
      render(Alert, { tone: 'ok', variant: 'card', children: html('ok') }).querySelector(
        '[role="status"]',
      ),
    ).not.toBeNull();
    const ondismiss = vi.fn();
    const toast = render(Toast, { tone: 'error', message: 'x', ondismiss });
    click(toast.querySelector('button'));
    expect(ondismiss).toHaveBeenCalledOnce();
    expect(render(Toast, { children: html('<b>n</b>') }).querySelector('button')).toBeNull();
    expect(render(EmptyState, { message: 'Nothing' }).textContent?.trim()).toBe('Nothing');
    expect(render(EmptyState, { children: html('<i>n</i>') }).querySelector('i')).not.toBeNull();
  });

  it('DetailList, Legend, ChartTooltip render their items', () => {
    const list = render(DetailList, {
      layout: 'grid',
      items: [{ label: 'Id', value: '42', mono: true }],
    });
    expect(list.querySelector('dd.mono')?.textContent).toBe('42');
    expect(render(Legend, { items: [{ label: 'Up', color: 'blue' }] }).textContent).toContain('Up');
    expect(render(ChartTooltip, { tooltip: null }).querySelector('.tooltip')).toBeNull();
    const tip = render(ChartTooltip, {
      tooltip: {
        x: 5000,
        y: 5000,
        title: 'Mon',
        rows: [{ label: 'Up', value: '3', color: 'blue' }],
      },
    });
    expect(tip.querySelector('.head')?.textContent).toBe('Mon');
  });

  it('TitlePill is a link, a button or plain', () => {
    expect(
      render(TitlePill, { title: 'Locations', subtitle: 'find places', href: '/' }).querySelector(
        'a',
      )?.textContent,
    ).toContain('Locations — find places');
    const onclick = vi.fn();
    click(render(TitlePill, { title: 'x', onclick }).querySelector('button'));
    expect(onclick).toHaveBeenCalledOnce();
    expect(render(TitlePill, { title: 'x' }).querySelector('div.pill')).not.toBeNull();
  });

  it('ChoiceCard is a button or a link with badges', () => {
    const onclick = vi.fn();
    const host = render(ChoiceCard, {
      title: 'Venues',
      meta: 'm',
      about: 'a',
      onclick,
      badges: html('<span class="b">Live</span>'),
    });
    click(host.querySelector('button'));
    expect(onclick).toHaveBeenCalledOnce();
    expect(host.querySelector('.b')).not.toBeNull();
    expect(render(ChoiceCard, { title: 'x', href: '/x' }).querySelector('a')).not.toBeNull();
  });

  it('RefreshButton switches to live', () => {
    const live = render(RefreshButton, { live: true, loading: true });
    expect(live.querySelector('button.btn--ghost')?.getAttribute('aria-busy')).toBe('true');
    expect(live.querySelector('.fast .dot--pulse')).not.toBeNull();
    expect(live.querySelector('button')?.getAttribute('aria-label')).toBe(
      'Auto refreshing — refresh now',
    );
    expect(live.textContent).toContain('Auto refreshing');
    expect(render(RefreshButton, {}).querySelector('button')?.getAttribute('aria-label')).toBe(
      'Refresh',
    );
  });

  it('Field, SearchField, FilterBar, SignInCard wire up', () => {
    const field = render(Field, { label: 'Env', hint: 'h', children: html('<select></select>') });
    expect(field.querySelector('label')?.getAttribute('for')).toMatch(/-control$/);
    expect(
      render(Field, { label: 'Group', group: true, children: html('<div></div>') }).querySelector(
        'span.label',
      ),
    ).not.toBeNull();
    expect(
      render(SearchField, { label: 'Filter', size: 'lg' }).querySelector('input[type="search"]'),
    ).not.toBeNull();
    expect(
      render(FilterBar, { children: html('<i>f</i>') }).querySelector('[role="group"]'),
    ).not.toBeNull();
    const onsignin = vi.fn();
    const signin = render(SignInCard, { text: 'Please', onsignin });
    click(signin.querySelector('button'));
    expect(onsignin).toHaveBeenCalledOnce();
    expect(
      render(SignInCard, { onsignin, children: html('<p class="c">x</p>') }).querySelector('.c'),
    ).not.toBeNull();
  });
});

describe('record molecules', () => {
  it('Alert strong tints the whole card', () => {
    const host = render(Alert, { variant: 'card', strong: true, message: 'down' });
    expect(host.querySelector('.alert')?.className).toContain('alert--strong');
  });

  it('GlassPill renders a labelled search landmark that grows and wraps', () => {
    const host = render(GlassPill, {
      as: 'search',
      label: 'Find people',
      grow: true,
      wrap: true,
      maxWidth: '40rem',
      children: html('<input />'),
    });
    const pill = host.querySelector('search');
    expect(pill?.getAttribute('aria-label')).toBe('Find people');
    expect(pill?.className).toContain('grow');
    expect(pill?.className).toContain('wrap');
    expect((pill as HTMLElement).style.maxWidth).toBe('40rem');
  });

  it('IdentityCell shows initials of initialsOf, the badge and the subtitle', () => {
    const host = render(IdentityCell, {
      name: 'Dr. Jane Doe',
      initialsOf: 'Jane Doe',
      subtitle: 'Project manager',
      clamp: true,
      badge: html('<b>Team</b>'),
    });
    expect(host.querySelector('.avatar')?.textContent).toBe('JD');
    expect(host.querySelector('.name')?.textContent).toContain('Dr. Jane Doe');
    expect(host.querySelector('b')?.textContent).toBe('Team');
    expect(host.querySelector('.subtitle.clamp')?.textContent).toBe('Project manager');
  });

  it('TagList shows the first tags, counts the rest and reports clicks', () => {
    const onclick = vi.fn();
    const host = render(TagList, {
      labels: ['a', 'b', 'c', 'd'],
      max: 2,
      active: (label: string) => label === 'b',
      onclick,
    });
    const tags = buttons(host);
    expect(tags.map((tag) => tag.textContent?.trim())).toEqual(['a', 'b']);
    expect(tags[1]?.className).toContain('tag--accent');
    expect(host.querySelector('.more')?.textContent).toBe('+2');
    click(tags[0]);
    expect(onclick).toHaveBeenCalledWith('a');
  });

  it('TagList without max or onclick shows plain tags', () => {
    const host = render(TagList, { labels: ['a', 'b'] });
    expect(buttons(host)).toHaveLength(0);
    expect(host.querySelector('.more')).toBeNull();
  });

  it('DetailHeader names its heading and renders badge and meta', () => {
    const host = render(DetailHeader, {
      title: 'Example Hall',
      titleId: 'hall',
      shape: 'square',
      subtitle: 'Venue',
      badge: html('<i>3 people</i>'),
      meta: html('<a href="/">example.com</a>'),
    });
    expect(host.querySelector('h2#hall')?.textContent).toBe('Example Hall');
    expect(host.querySelector('.picture.square')).not.toBeNull();
    expect(host.querySelector('i')?.textContent).toBe('3 people');
    expect(host.querySelector('.meta a')?.textContent).toBe('example.com');
  });

  it('DetailSection labels its section by its heading', () => {
    const host = render(DetailSection, { title: 'Topics', children: html('<p>x</p>') });
    const section = host.querySelector('section');
    const heading = host.querySelector('h3');
    expect(heading?.textContent).toBe('Topics');
    expect(section?.getAttribute('aria-labelledby')).toBe(heading?.id);
  });
});

describe('TagInput', () => {
  const field = (host: HTMLElement) => host.querySelector('input') as HTMLInputElement;
  const labels = (host: HTMLElement) =>
    [...host.querySelectorAll('.tag .label')].map((tag) => tag.textContent);

  it('adds on Enter and on a separator, skips duplicates and blanks', () => {
    const onchange = vi.fn();
    const host = render(TagInput, { label: 'Topics', value: ['a'], onchange });
    input(field(host), 'b');
    key(field(host), 'Enter');
    expect(labels(host)).toEqual(['a', 'b']);
    expect(onchange).toHaveBeenLastCalledWith(['a', 'b']);
    // A paste: everything before the last separator becomes tags, the rest stays typed.
    input(field(host), 'c, a,  , d');
    expect(labels(host)).toEqual(['a', 'b', 'c']);
    expect(field(host).value).toBe(' d');
  });

  it('removes with the × and with Backspace in the empty field', () => {
    const host = render(TagInput, { label: 'Topics', value: ['a', 'b', 'c'] });
    click(host.querySelector('[aria-label="Remove b"]'));
    expect(labels(host)).toEqual(['a', 'c']);
    key(field(host), 'Backspace');
    expect(labels(host)).toEqual(['a']);
    input(field(host), 'x');
    key(field(host), 'Backspace');
    expect(labels(host)).toEqual(['a']);
  });

  it('passes on the keys it does not use, adding pending text before Tab', () => {
    const onkeydown = vi.fn();
    const host = render(TagInput, { label: 'Topics', value: [], onkeydown });
    key(field(host), 'Enter');
    key(field(host), 'Escape');
    expect(onkeydown.mock.calls.map(([event]) => event.key)).toEqual(['Enter', 'Escape']);
    input(field(host), 'new');
    key(field(host), 'Enter');
    expect(onkeydown).toHaveBeenCalledTimes(2);
    input(field(host), 'last');
    key(field(host), 'Tab');
    expect(labels(host)).toEqual(['new', 'last']);
    expect(onkeydown).toHaveBeenCalledTimes(3);
  });

  it('reports a blur once focus leaves the field, keeping typed text', async () => {
    const onblur = vi.fn();
    const onchange = vi.fn();
    const host = render(TagInput, { label: 'Topics', value: [], onblur, onchange });
    field(host).focus();
    input(field(host), 'kept');
    field(host).blur();
    await tick();
    expect(onblur).toHaveBeenCalledOnce();
    expect(onchange).toHaveBeenLastCalledWith(['kept']);
  });

  it('keeps focus in the field when a × is pressed, so a host editor does not close', () => {
    const host = render(TagInput, { label: 'Topics', value: ['a'] });
    const press = (target: Element) => {
      const event = new MouseEvent('mousedown', { bubbles: true, cancelable: true });
      target.dispatchEvent(event);
      return event.defaultPrevented;
    };
    expect(press(host.querySelector('[aria-label="Remove a"]')!)).toBe(true);
    expect(press(field(host))).toBe(false);
  });

  it('cannot be changed when disabled', () => {
    const host = render(TagInput, { label: 'Topics', value: ['a'], disabled: true });
    expect(host.querySelector('.remove')).toBeNull();
    expect(field(host).disabled).toBe(true);
  });
});

describe('StructTree', () => {
  const keys = (host: HTMLElement) =>
    [...host.querySelectorAll('.key')].map((key) => key.textContent?.trim());
  const leaf = (host: HTMLElement, index: number) =>
    host.querySelectorAll<HTMLButtonElement>('.leaf')[index]!;

  it('reads the fields of a STRUCT type, nested and quoted', () => {
    expect(structFields('struct')).toBeNull();
    expect(structFields('VARCHAR')).toBeNull();
    expect(
      structFields('STRUCT(de VARCHAR, "en gb" VARCHAR, geo STRUCT(lat DOUBLE, lng DOUBLE))'),
    ).toEqual([
      { name: 'de', type: 'VARCHAR', fields: undefined },
      { name: 'en gb', type: 'VARCHAR', fields: undefined },
      {
        name: 'geo',
        type: 'STRUCT(lat DOUBLE, lng DOUBLE)',
        fields: [
          { name: 'lat', type: 'DOUBLE', fields: undefined },
          { name: 'lng', type: 'DOUBLE', fields: undefined },
        ],
      },
    ]);
    expect(setIn({ a: 1, b: { c: 2 } }, ['b', 'c'], 3)).toEqual({ a: 1, b: { c: 3 } });
    expect(setIn(null, ['b', 'c'], 3)).toEqual({ b: { c: 3 } });
    const fields = structFields(
      'STRUCT(de VARCHAR, en VARCHAR, geo STRUCT(lat DOUBLE, lng DOUBLE))',
    );
    expect(complete({ de: 'x', geo: { lat: 1 } }, fields)).toEqual({
      de: 'x',
      en: null,
      geo: { lat: 1, lng: null },
    });
    expect(complete({ a: 1 }, null)).toEqual({ a: 1 });
  });

  it('edits one value in place and commits the whole record', () => {
    const onchange = vi.fn();
    const host = render(StructTree, {
      value: { de: 'Bühne', en: null },
      editable: true,
      onchange,
    });
    expect(keys(host)).toEqual(['de', 'en']);
    expect(leaf(host, 1).textContent?.trim()).toBe('—');
    click(leaf(host, 1));
    const editor = host.querySelector('input.editor') as HTMLInputElement;
    input(editor, 'Stage');
    key(editor, 'Enter');
    expect(onchange).toHaveBeenCalledWith({ de: 'Bühne', en: 'Stage' });

    click(leaf(host, 0));
    key(host.querySelector('input.editor')!, 'Escape');
    expect(host.querySelector('input.editor')).toBeNull();
    expect(onchange).toHaveBeenCalledOnce();
  });

  it('turns numbers back into numbers, empties into null, and toggles booleans', () => {
    const onchange = vi.fn();
    const host = render(StructTree, {
      value: { lat: 1.5, name: 'x', open: false },
      editable: true,
      onchange,
    });
    click(leaf(host, 0));
    input(host.querySelector('input.editor')!, '2,25');
    key(host.querySelector('input.editor')!, 'Enter');
    expect(onchange).toHaveBeenLastCalledWith({ lat: 2.25, name: 'x', open: false });
    click(leaf(host, 1));
    input(host.querySelector('input.editor')!, '');
    key(host.querySelector('input.editor')!, 'Enter');
    expect(onchange).toHaveBeenLastCalledWith({ lat: 1.5, name: null, open: false });
    click(host.querySelector('input[type="checkbox"]'));
    expect(onchange).toHaveBeenLastCalledWith({ lat: 1.5, name: 'x', open: true });
  });

  it("folds nested records past expandDepth, and shows the keys a NULL record's type names", () => {
    const host = render(StructTree, {
      value: null,
      fields: structFields('STRUCT(street VARCHAR, geo STRUCT(lat DOUBLE))'),
      editable: true,
    });
    expect(keys(host)).toEqual(['street', 'geo']);
    const toggle = host.querySelector('.toggle') as HTMLButtonElement;
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    click(toggle);
    expect(keys(host)).toEqual(['street', 'geo', 'lat']);
  });

  it('sends a NULL record out whole once one value is set', () => {
    const onchange = vi.fn();
    const host = render(StructTree, {
      value: null,
      fields: structFields('STRUCT(de VARCHAR, en VARCHAR, n DOUBLE)'),
      editable: true,
      onchange,
    });
    click(leaf(host, 2));
    input(host.querySelector('input.editor')!, '1.5');
    key(host.querySelector('input.editor')!, 'Enter');
    expect(onchange).toHaveBeenCalledWith({ de: null, en: null, n: 1.5 });
  });

  it('shows lists as tags and does nothing when not editable', () => {
    const onchange = vi.fn();
    const host = render(StructTree, { value: { phones: ['1', '2'] }, onchange });
    expect([...host.querySelectorAll('.tag .label')].map((t) => t.textContent)).toEqual(['1', '2']);
    expect(leaf(host, 0).disabled).toBe(true);
  });
});

describe('convenience props', () => {
  it('Alert takes a title, its tone icon, actions and a close button', () => {
    const ondismiss = vi.fn();
    const host = render(Alert, {
      tone: 'warn',
      title: 'Draft',
      message: 'Not published',
      actions: html('<button class="retry">Retry</button>'),
      ondismiss,
    });
    expect(host.querySelector('[role="status"] .title')?.textContent).toBe('Draft');
    expect(host.querySelector('[role="status"]')?.textContent).toContain('Not published');
    expect(host.querySelector('.icon-wrap svg')).not.toBeNull();
    expect(host.querySelector('.actions .retry')).not.toBeNull();
    click(host.querySelector('button[aria-label="Dismiss"]'));
    expect(ondismiss).toHaveBeenCalledOnce();
    expect(render(Alert, { message: 'x', icon: false }).querySelector('.icon-wrap')).toBeNull();
    expect(render(Alert, { message: 'boom' }).querySelector('[role="alert"]')?.textContent).toBe(
      'boom',
    );
  });

  it('Toast shows a title, an info tone and its icon', () => {
    const host = render(Toast, { tone: 'info', title: 'Saved', message: 'All good' });
    expect(host.querySelector('.toast--info .icon-disc')).not.toBeNull();
    expect(host.querySelector('[role="status"] .title')?.textContent).toBe('Saved');
    expect(render(Toast, { message: 'x', icon: false }).querySelector('.icon-disc')).toBeNull();
  });

  it('EmptyState renders a primary action from actionLabel and onaction', () => {
    const onaction = vi.fn();
    const host = render(EmptyState, {
      icon: 'inbox',
      title: 'Nothing here',
      actionLabel: 'Create',
      onaction,
    });
    expect(host.querySelector('.icon-disc svg')).not.toBeNull();
    click(byText(host, 'Create'));
    expect(onaction).toHaveBeenCalledOnce();
    expect(render(EmptyState, { actionLabel: 'Create' }).querySelector('.action')).toBeNull();
  });

  it('KpiTile reads the trend from its delta and can invert it', () => {
    const up = render(KpiTile, { label: 'Orders', value: 12, delta: '+12 %', icon: 'cart' });
    expect(up.querySelector('.delta--good')?.textContent?.trim()).toBe('+12 %');
    expect(up.querySelector('.icon-tile svg')).not.toBeNull();
    const down = render(KpiTile, { label: 'x', value: 1, delta: '−3' });
    expect(down.querySelector('.delta--bad')).not.toBeNull();
    const inverted = render(KpiTile, { label: 'Errors', value: 3, delta: '-2', invert: true });
    expect(inverted.querySelector('.delta--good')?.getAttribute('data-trend')).toBe('down');
    const flat = render(KpiTile, { label: 'x', value: 1, delta: '0', trend: 'flat' });
    expect(flat.querySelector('.delta--neutral')).not.toBeNull();
  });

  it('Tabs render icons and the pill variant', () => {
    const host = render(Tabs, {
      label: 'View',
      variant: 'pill',
      tabs: [
        { value: 'a', label: 'A', icon: 'grid' },
        { value: 'b', label: 'B' },
      ],
    });
    expect(host.querySelector('.tabs--pill')).not.toBeNull();
    expect(host.querySelector('[aria-selected="true"] svg')).not.toBeNull();
    expect(host.querySelector('[aria-selected="true"]')?.textContent?.trim()).toBe('A');
  });

  it('SegmentedControl stretches, fills with the accent and shows icons', () => {
    const host = render(SegmentedControl, {
      label: 'View',
      value: 'grid',
      full: true,
      variant: 'accent',
      options: [
        { value: 'grid', label: 'Grid', icon: 'grid' },
        { value: 'list', label: 'List' },
      ],
    });
    expect(host.querySelector('.segmented--accent.full')).not.toBeNull();
    expect(host.querySelector('[aria-pressed="true"] svg')).not.toBeNull();
    const plain = render(SegmentedControl, { label: 'x', value: 1, options: [] });
    expect(plain.querySelector('.segmented--glass')).not.toBeNull();
  });

  it('ChoiceCard marks the selected tile and shows its icon', () => {
    const host = render(ChoiceCard, { title: 'Team', icon: 'users', selected: true });
    const button = host.querySelector('button');
    expect(button?.getAttribute('aria-pressed')).toBe('true');
    expect(button?.classList.contains('selected')).toBe(true);
    expect(host.querySelector('.icon-tile svg')).not.toBeNull();
    expect(
      render(ChoiceCard, { title: 'x', href: '/x', selected: true })
        .querySelector('a')
        ?.getAttribute('aria-current'),
    ).toBe('true');
    expect(render(ChoiceCard, { title: 'x' }).querySelector('button[aria-pressed]')).toBeNull();
  });

  it('DropdownMenu shows headings and shortcuts and skips headings when moving', async () => {
    const onselect = vi.fn();
    const host = render(DropdownMenu, {
      variant: 'glass',
      items: [
        { heading: 'File' },
        { label: 'Open', shortcut: '⌘O', onselect },
        { label: 'Save', onselect: () => {} },
      ],
    });
    click(host.querySelector('button'));
    await tick();
    expect(host.querySelector('.heading')?.textContent).toBe('File');
    expect(host.querySelector('kbd.shortcut')?.textContent).toBe('⌘O');
    expect(host.querySelectorAll('[role="menuitem"]')).toHaveLength(2);
    expect(document.activeElement?.textContent).toContain('Open');
    click(host.querySelector('[role="menuitem"]'));
    expect(onselect).toHaveBeenCalledOnce();
  });

  it('FilterBar, DetailSection, DetailHeader and Disclosure take actions and icons', () => {
    expect(
      render(FilterBar, {
        children: html('<i>f</i>'),
        actions: html('<button class="reset">Reset</button>'),
      }).querySelector('.actions .reset'),
    ).not.toBeNull();
    const section = render(DetailSection, {
      title: 'Contact',
      actions: html('<button class="edit">Edit</button>'),
      children: html('<p>x</p>'),
    });
    expect(section.querySelector('.head h3')?.textContent).toBe('Contact');
    expect(section.querySelector('.head .edit')).not.toBeNull();
    expect(
      render(DetailHeader, {
        title: 'X',
        titleId: 'x',
        actions: html('<button class="act">Edit</button>'),
      }).querySelector('.actions .act'),
    ).not.toBeNull();
    expect(
      render(Disclosure, { title: 'T', icon: 'truck', children: html('<p></p>') }).querySelector(
        'button svg + svg',
      ),
    ).not.toBeNull();
  });

  it('DetailList flows into columns, GlassPill spaces its children', () => {
    const list = render(DetailList, { columns: 3, items: [{ label: 'a', value: '1' }] });
    const dl = list.querySelector('dl') as HTMLElement;
    expect(dl.classList.contains('list--columns')).toBe(true);
    expect(dl.style.getPropertyValue('--columns')).toBe('3');
    expect(
      render(DetailList, { layout: 'grid', columns: 3, items: [] }).querySelector('.list--columns'),
    ).toBeNull();
    const pill = render(GlassPill, { gap: 'md', children: html('<i></i>') }).querySelector(
      '.glass',
    ) as HTMLElement;
    expect(pill.style.gap).toBe('var(--space-4)');
  });

  it('Pager, CodeInput, FileDropzone and StructTree take their own wording', () => {
    expect(
      render(Pager, { offset: 0, limit: 10, total: 20, label: 'Seiten', onpage: () => {} })
        .querySelector('nav')
        ?.getAttribute('aria-label'),
    ).toBe('Seiten');
    expect(
      render(CodeInput, {
        label: 'Code',
        length: 2,
        boxLabel: (name, at, of) => `${name} ${at}/${of}`,
      })
        .querySelector('input.box')
        ?.getAttribute('aria-label'),
    ).toBe('Code 1/2');

    const zone = render(FileDropzone, {
      accept: '.pdf',
      maxBytes: 1,
      typeErrorLabel: (allowed) => `Nur ${allowed}`,
      sizeErrorLabel: () => 'Zu groß',
      removeLabel: (name) => `${name} entfernen`,
    });
    const picker = zone.querySelector<HTMLInputElement>('input[type="file"]')!;
    const choose = (file: File) => {
      Object.defineProperty(picker, 'files', { configurable: true, value: [file] });
      picker.dispatchEvent(new Event('change', { bubbles: true }));
      flushSync();
    };
    choose(new File(['x'], 'a.exe'));
    expect(zone.querySelector('[role="alert"]')?.textContent).toBe('Nur .pdf');
    choose(new File(['xx'], 'a.pdf'));
    expect(zone.querySelector('[role="alert"]')?.textContent).toBe('Zu groß');

    const tree = render(StructTree, {
      value: { a: 'x' },
      editable: true,
      editLabel: (k) => `Ändern: ${k}`,
    });
    expect(tree.querySelector('.leaf')?.getAttribute('title')).toBe('Ändern: a');
  });

  it('Composer, SearchField, SignInCard, ConfirmButton and TitlePill options', () => {
    const composer = render(Composer, {
      label: 'Q',
      sendHint: 'zum Senden',
      newlineHint: 'für eine neue Zeile',
      onsubmit: () => {},
    });
    expect(composer.textContent).toContain('zum Senden');
    expect(composer.textContent).toContain('für eine neue Zeile');
    expect(
      render(SearchField, { label: 'S', shape: 'pill' }).querySelector('.search--pill'),
    ).not.toBeNull();
    const signin = render(SignInCard, { align: 'center', onsignin: () => {} });
    expect(signin.querySelector('.content--center')).not.toBeNull();
    expect(signin.textContent).toContain('Sign in with SSO');
    const confirm = render(ConfirmButton, { shape: 'pill', onconfirm: () => {} });
    expect(confirm.querySelector('button')?.className).toContain('btn--pill');
    const pill = render(TitlePill, { title: 'x', logo: html('<img alt="mark" />') });
    expect(pill.querySelector('img[alt="mark"]')).not.toBeNull();
    expect(pill.querySelector('.bar')).toBeNull();
    expect(render(TitlePill, { title: 'x' }).querySelector('.bar')).not.toBeNull();
  });
});

describe('design polish behaviours', () => {
  it('ConfirmButton disarms on Escape', () => {
    const host = render(ConfirmButton, { onconfirm: () => {} });
    click(byText(host, 'Delete'));
    expect(byText(host, 'Cancel')).toBeDefined();
    key(host.querySelector('.confirm')!, 'Escape');
    expect(byText(host, 'Cancel')).toBeUndefined();
  });

  it('slides one indicator once items have a layout', async () => {
    const width = vi
      .spyOn(HTMLElement.prototype, 'offsetWidth', 'get')
      .mockImplementation(function (this: HTMLElement) {
        return this.tagName === 'BUTTON' ? 60 : 300;
      });
    const host = render(SegmentedControl, {
      label: 'Range',
      value: 7,
      options: [
        { value: 7, label: '7 days' },
        { value: 30, label: '30 days' },
      ],
    });
    await tick();
    const track = host.querySelector<HTMLElement>('.segmented')!;
    expect(track.dataset.indicator).toBeDefined();
    expect(track.style.getPropertyValue('--ind-w')).toBe('60px');
    click(byText(host, '30 days'));
    await tick();
    expect(track.dataset.indicator).toBe('moving');
    width.mockRestore();
  });

  it('Tabs measure their indicator only with a layout', async () => {
    const host = render(Tabs, {
      label: 'Sections',
      tabs: [
        { value: 'a', label: 'A' },
        { value: 'b', label: 'B' },
      ],
    });
    await tick();
    expect(host.querySelector<HTMLElement>('.list')!.dataset.indicator).toBeUndefined();
  });

  it('DropdownMenu is placed at its trigger and kept inside the screen', async () => {
    const rect = vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
      left: -40,
      right: 160,
      top: 0,
      bottom: 100,
      width: 200,
      height: 100,
      x: -40,
      y: 0,
      toJSON: () => ({}),
    });
    const host = render(DropdownMenu, {
      label: 'More',
      items: [{ label: 'Export', onselect: () => {} }],
    });
    click(host.querySelector('button'));
    await tick();
    flushSync();
    const pop = host.querySelector<HTMLElement>('.pop')!;
    expect(pop.style.position).toBe('fixed');
    expect(parseFloat(pop.style.left)).toBeGreaterThanOrEqual(8);
    expect(pop.style.transformOrigin).toContain('top');
    rect.mockRestore();
  });
});
