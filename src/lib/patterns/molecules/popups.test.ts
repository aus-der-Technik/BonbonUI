import { flushSync } from 'svelte';
import { click, html, render, tick } from '../../test/render';
import { computePosition } from './anchor';
import Autocomplete from './Autocomplete.svelte';
import DropdownMenu from './DropdownMenu.svelte';
import MultiSelect from './MultiSelect.svelte';
import Picker from './Picker.svelte';
import Popover from './Popover.svelte';
import UserMenu from './UserMenu.svelte';

const viewport = { width: 1000, height: 800 };
const box = (top: number, left = 100, width = 120, height = 36) => ({
  top,
  bottom: top + height,
  left,
  right: left + width,
  width,
  height,
});

/** Focus leaving `from` for `to` (null: focus went nowhere, e.g. a click on the page). */
function focusOut(from: Element, to: Element | null) {
  from.dispatchEvent(new FocusEvent('focusout', { bubbles: true, relatedTarget: to }));
  flushSync();
}

describe('computePosition', () => {
  const size = { width: 200, height: 300 };

  it('opens below the trigger with the origin on the facing edge', () => {
    const pos = computePosition(box(100), size, viewport);
    expect(pos).toMatchObject({ top: 144, left: 100, above: false, flipped: false });
    expect(pos.origin).toBe('60px top');
  });

  it('flips above when there is no room below', () => {
    const pos = computePosition(box(600), size, viewport);
    expect(pos.above).toBe(true);
    expect(pos.flipped).toBe(true);
    expect(pos.top).toBe(600 - 8 - 300);
    expect(pos.origin).toMatch(/bottom$/);
  });

  it('stays below when above has even less room, and caps the height to the room', () => {
    const pos = computePosition(box(150), { width: 200, height: 900 }, viewport);
    expect(pos.above).toBe(false);
    expect(pos.room).toBe(800 - 186 - 16);
  });

  it('flips a top placement down when the top is too tight', () => {
    const pos = computePosition(box(40), size, viewport, { placement: 'top' });
    expect(pos.above).toBe(false);
    expect(pos.flipped).toBe(true);
  });

  it('aligns to the end and clamps into the viewport', () => {
    expect(computePosition(box(100), size, viewport, { placement: 'bottom-end' }).left).toBe(20);
    expect(computePosition(box(100, -40), size, viewport).left).toBe(8);
    expect(computePosition(box(100, 950), size, viewport).left).toBe(1000 - 200 - 8);
  });
});

describe('menus close when focus leaves them', () => {
  it('DropdownMenu closes on Tab out but not when focus moves inside', async () => {
    const outside = document.createElement('button');
    document.body.append(outside);
    const host = render(DropdownMenu, {
      label: 'More',
      items: [
        { label: 'Rename', onselect: () => {} },
        { label: 'Delete', onselect: () => {} },
      ],
    });
    click(host.querySelector('button'));
    await tick();
    const [first, second] = host.querySelectorAll('[role="menuitem"]');
    focusOut(first!, second!);
    expect(host.querySelector('[role="menu"]')).not.toBeNull();
    focusOut(second!, null);
    expect(host.querySelector('[role="menu"]')).not.toBeNull();
    focusOut(second!, outside);
    expect(host.querySelector('[role="menu"]')).toBeNull();
    outside.remove();
  });

  it('DropdownMenu takes a header and extra entries, aria-controls only while open', async () => {
    const host = render(DropdownMenu, {
      items: [{ label: 'Rename', onselect: () => {} }],
      menuLabel: 'Row actions',
      header: html('<p class="who">Row 3</p>'),
      children: html('<a href="#x" role="menuitem">Open</a>'),
    });
    const trigger = host.querySelector<HTMLElement>('[aria-haspopup="menu"]')!;
    expect(trigger.getAttribute('aria-controls')).toBeNull();
    click(trigger);
    await tick();
    const menu = host.querySelector('[role="menu"]')!;
    expect(trigger.getAttribute('aria-controls')).toBe(menu.id);
    expect(menu.getAttribute('aria-label')).toBe('Row actions');
    expect(menu.querySelector('.who')?.textContent).toBe('Row 3');
    expect(document.activeElement?.textContent).toBe('Open');
  });

  it('UserMenu closes on Tab out', async () => {
    const outside = document.createElement('button');
    document.body.append(outside);
    const host = render(UserMenu, { email: 'jane.doe@example.com', onsignout: () => {} });
    click(host.querySelector('button'));
    await tick();
    const item = host.querySelector('[role="menuitem"]')!;
    expect(document.activeElement).toBe(item);
    focusOut(item, outside);
    expect(host.querySelector('[role="menu"]')).toBeNull();
    outside.remove();
  });

  it('MultiSelect and Picker close on Tab out', async () => {
    const outside = document.createElement('button');
    document.body.append(outside);
    const multi = render(MultiSelect, {
      label: 'Status',
      groups: [{ options: [{ value: 'a', label: 'A' }] }],
      value: [],
      onchange: () => {},
    });
    click(multi.querySelector('button'));
    await tick();
    focusOut(multi.querySelector('input')!, outside);
    expect(multi.querySelector('.pop')).toBeNull();

    const picker = render(Picker, { label: 'Set', options: [{ value: 'a', title: 'A' }] });
    click(picker.querySelector('button'));
    await tick();
    focusOut(picker.querySelector('[role="listbox"]')!, outside);
    expect(picker.querySelector('[role="listbox"]')).toBeNull();
    outside.remove();
  });

  it('Popover panels are positioned fixed at the trigger', async () => {
    const host = render(Popover, { label: 'Filters', children: html('<p>Body</p>') });
    click(host.querySelector('button'));
    await tick();
    const panel = document.querySelector<HTMLElement>('[role="dialog"]')!;
    expect(panel.style.position).toBe('fixed');
    expect(panel.style.transformOrigin).not.toBe('');
  });
});

describe('Autocomplete while loading', () => {
  it('keeps the pressed button focused and ignores presses', () => {
    const onsearch = vi.fn();
    const host = render(Autocomplete, {
      label: 'Search',
      value: 'Frankfurt',
      loading: true,
      onsearch,
    });
    const button = host.querySelector<HTMLButtonElement>('.row > button')!;
    button.focus();
    expect(button.disabled).toBe(false);
    click(button);
    expect(onsearch).not.toHaveBeenCalled();
    expect(document.activeElement).toBe(button);
  });

  it('marks the button aria-disabled while nothing is typed', () => {
    const onsearch = vi.fn();
    const host = render(Autocomplete, { label: 'Search', onsearch });
    const button = host.querySelector<HTMLButtonElement>('.row > button')!;
    expect(button.getAttribute('aria-disabled')).toBe('true');
    click(button);
    expect(onsearch).not.toHaveBeenCalled();
  });
});
