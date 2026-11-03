import { click, render } from '../../test/render';
import { noticeRole, toneOf } from '../tone';
import Alert from '../molecules/Alert.svelte';
import Banner from '../molecules/Banner.svelte';
import Disclosure from '../molecules/Disclosure.svelte';
import Toast from '../molecules/Toast.svelte';
import ToggleChip from '../molecules/ToggleChip.svelte';
import Badge from './Badge.svelte';
import Checkbox from './Checkbox.svelte';
import ProgressBar from './ProgressBar.svelte';
import ProgressFixture from './ProgressFixture.test.svelte';
import StatusText from './StatusText.svelte';
import Tag from './Tag.svelte';
import { html } from '../../test/render';

describe('tone vocabulary', () => {
  it('maps the deprecated aliases onto the unified tones', () => {
    expect(toneOf('error')).toBe('danger');
    expect(toneOf('brand')).toBe('accent');
    expect(toneOf('warn')).toBe('warn');
    expect(noticeRole('error')).toBe('alert');
    expect(noticeRole('warn')).toBe('status');
  });

  it('renders the error alias as danger in every notice', () => {
    expect(
      render(Alert, { tone: 'error', message: 'x' }).querySelector('.alert--danger'),
    ).not.toBeNull();
    expect(
      render(Toast, { tone: 'error', message: 'x' }).querySelector('.toast--danger'),
    ).not.toBeNull();
    const status = render(StatusText, { tone: 'error', message: 'x' }).querySelector('.status');
    expect(status?.className).toContain('status--danger');
    expect(status?.getAttribute('aria-live')).toBe('assertive');
    expect(
      render(StatusText, { tone: 'muted', message: 'x' }).querySelector('.status--neutral'),
    ).not.toBeNull();
    expect(
      render(ProgressBar, { value: 1, label: 'x', tone: 'brand' }).querySelector('.fill--accent'),
    ).not.toBeNull();
    const brand = render(Badge, { tone: 'brand', label: 'b' }).querySelector('.badge');
    expect(brand?.className).toContain('badge--accent');
    expect(brand?.className).toContain('badge--solid');
    expect(
      render(Checkbox, { tone: 'red', 'aria-label': 'x' }).querySelector('.box--accent'),
    ).not.toBeNull();
  });

  it('announces as an alert only for danger', () => {
    for (const tone of ['warn', 'ok', 'info', 'accent', 'neutral'] as const) {
      expect(render(Alert, { tone, message: 'x' }).querySelector('[role="alert"]')).toBeNull();
      expect(render(Toast, { tone, message: 'x' }).querySelector('[role="alert"]')).toBeNull();
      expect(
        render(Banner, { tone, message: 'x' }).querySelector('[role="status"]'),
      ).not.toBeNull();
    }
    expect(
      render(Alert, { tone: 'danger', message: 'x' }).querySelector('[role="alert"]'),
    ).not.toBeNull();
    expect(
      render(Toast, { tone: 'danger', message: 'x' }).querySelector('[role="alert"]'),
    ).not.toBeNull();
    expect(
      render(Banner, { tone: 'danger', message: 'x' }).querySelector('[role="alert"]'),
    ).not.toBeNull();
  });

  it('hides the icon with false everywhere and with null on Banner', () => {
    expect(render(Alert, { icon: false, message: 'x' }).querySelector('svg')).toBeNull();
    expect(render(Toast, { icon: false, message: 'x' }).querySelector('.icon-disc')).toBeNull();
    expect(
      render(Banner, { icon: false, message: 'x', dismissible: false }).querySelector('.icon'),
    ).toBeNull();
    expect(
      render(Banner, { icon: null, message: 'x', dismissible: false }).querySelector('.icon'),
    ).toBeNull();
  });

  it('shows the dismiss button of Alert and Toast only with ondismiss', () => {
    expect(render(Alert, { message: 'x' }).querySelector('.dismiss')).toBeNull();
    let closed = 0;
    const host = render(Toast, { message: 'x', ondismiss: () => closed++ });
    click(host.querySelector('.dismiss'));
    expect(closed).toBe(1);
  });
});

describe('Badge shape', () => {
  it('is a rounded tag unless asked for a pill', () => {
    expect(render(Badge, { label: 'x' }).querySelector('.badge--pill')).toBeNull();
    expect(
      render(Badge, { label: 'x', shape: 'pill' }).querySelector('.badge--pill'),
    ).not.toBeNull();
  });
});

describe('Checkbox oncheckedchange', () => {
  it('hands over the new state as a boolean and still calls onchange', () => {
    const states: boolean[] = [];
    let events = 0;
    const host = render(Checkbox, {
      label: 'Ready',
      oncheckedchange: (checked: boolean) => states.push(checked),
      onchange: () => events++,
    });
    const box = host.querySelector('input')!;
    click(box);
    click(box);
    expect(states).toEqual([true, false]);
    expect(events).toBe(2);
  });

  it('makes a bare checkbox its own label so its hit area toggles it', () => {
    const host = render(Checkbox, { 'aria-label': 'Select row' });
    const label = host.querySelector('label.box--bare');
    expect(label).not.toBeNull();
    expect(label?.querySelector('input')).not.toBeNull();
    // A labelled checkbox keeps the outer label and no nested one.
    expect(render(Checkbox, { label: 'x' }).querySelectorAll('label')).toHaveLength(1);
  });
});

describe('Disclosure aria-controls', () => {
  it('points only at a body that is rendered', () => {
    const host = render(Disclosure, { title: 'More', children: html('<p>inside</p>') });
    const button = host.querySelector('button')!;
    expect(button.hasAttribute('aria-controls')).toBe(false);
    click(button);
    const id = button.getAttribute('aria-controls');
    expect(id).toBeTruthy();
    expect(host.querySelector(`[id="${id}"]`)?.textContent).toBe('inside');
  });

  it('colours the title in any shared tone', () => {
    const host = render(Disclosure, { title: 'Zone', tone: 'warn', children: html('<p>x</p>') });
    expect(host.querySelector('.disclosure--warn')).not.toBeNull();
  });
});

describe('changed-value cue', () => {
  it('glows on ProgressBar value changes, not on the first render', () => {
    const host = render(ProgressFixture, {});
    const value = host.querySelector<HTMLElement>('.value')!;
    expect(value.style.animation).toBe('');
    click(host.querySelector('.bump'));
    expect(value.textContent).toMatch(/30/);
    expect(value.style.animation).toContain('bb-changed');
  });

  it('marks Tag and ToggleChip counts for the cue', () => {
    expect(render(Tag, { label: 'x', count: 3 }).querySelector('.count')?.textContent).toBe('×3');
    expect(render(ToggleChip, { label: 'x', count: 3 }).querySelector('b')?.textContent).toBe('3');
  });
});
