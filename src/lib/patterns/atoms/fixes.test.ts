import { flushSync } from 'svelte';
import { click, html, key, render, tick } from '../../test/render';
import { noticeRole, toneOf } from '../tone';
import ConfirmButton from '../molecules/ConfirmButton.svelte';
import CopyButton from '../molecules/CopyButton.svelte';
import RefreshButton from '../molecules/RefreshButton.svelte';
import SearchField from '../molecules/SearchField.svelte';
import Button from './Button.svelte';
import Card from './Card.svelte';
import Tooltip from './Tooltip.svelte';
import { changeCue } from './changed';

const byText = (host: HTMLElement, text: string) =>
  [...host.querySelectorAll('button')].find((b) => b.textContent?.trim() === text);

describe('tone vocabulary', () => {
  it('maps the deprecated aliases and picks the role', () => {
    expect(toneOf('error')).toBe('danger');
    expect(toneOf('brand')).toBe('accent');
    expect(toneOf('warn')).toBe('warn');
    expect(noticeRole('error')).toBe('alert');
    expect(noticeRole('danger')).toBe('alert');
    expect(noticeRole('warn')).toBe('status');
  });
});

describe('changeCue', () => {
  it('glows on a change, not on the first value or a repeat', () => {
    const node = document.createElement('span');
    const cue = changeCue(node, 1);
    expect(node.style.animation).toBe('');
    cue.update(1);
    expect(node.style.animation).toBe('');
    cue.update(2);
    expect(node.style.animation).toContain('bb-changed');
  });
});

describe('Tooltip', () => {
  it('describes the focusable trigger, not its wrapper', () => {
    const host = render(Tooltip, { text: 'Hint', children: html('<button>b</button>') });
    const tip = host.querySelector('[role="tooltip"]') as HTMLElement;
    expect(host.querySelector('button')?.getAttribute('aria-describedby')).toBe(tip.id);
    expect(host.querySelector('.wrap')?.hasAttribute('aria-describedby')).toBe(false);
  });

  it('keeps an existing description', () => {
    const host = render(Tooltip, {
      text: 'Hint',
      children: html('<button aria-describedby="other">b</button>'),
    });
    const tip = host.querySelector('[role="tooltip"]') as HTMLElement;
    expect(host.querySelector('button')?.getAttribute('aria-describedby')).toBe(`other ${tip.id}`);
  });
});

describe('Button', () => {
  it('aria-disabled swallows clicks but keeps focus', () => {
    const onclick = vi.fn();
    const host = render(Button, { label: 'Next', 'aria-disabled': 'true', onclick });
    const button = host.querySelector('button') as HTMLButtonElement;
    button.focus();
    click(button);
    expect(onclick).not.toHaveBeenCalled();
    expect(button.disabled).toBe(false);
    expect(document.activeElement).toBe(button);
    expect(button.className).toContain('btn--soft-disabled');
  });

  it('gives xs buttons a hit area and renders a leading snippet', () => {
    const host = render(Button, { label: 'x', size: 'xs', leading: html('<i class="lead"></i>') });
    expect(host.querySelector('.btn__hit')).not.toBeNull();
    expect(host.querySelector('.lead')).not.toBeNull();
  });
});

describe('Card', () => {
  it('stretches a real button over a titled clickable card', () => {
    const onclick = vi.fn();
    const host = render(Card, {
      title: 'Team',
      headingLevel: 3,
      selected: true,
      onclick,
      actions: html('<button class="act">Edit</button>'),
      children: html('<p>x</p>'),
    });
    const card = host.querySelector('.card') as HTMLElement;
    expect(card.getAttribute('role')).toBeNull();
    const hit = host.querySelector('h3 > button.card-hit') as HTMLButtonElement;
    expect(hit.textContent).toBe('Team');
    expect(hit.getAttribute('aria-pressed')).toBe('true');
    click(hit);
    expect(onclick).toHaveBeenCalledOnce();
    click(host.querySelector('.act'));
    expect(onclick).toHaveBeenCalledOnce();
  });

  it('puts the link on the title when an href card has actions', () => {
    const host = render(Card, {
      title: 'Order',
      href: '/orders/1',
      actions: html('<button>Edit</button>'),
    });
    expect(host.querySelector('a.card')).toBeNull();
    expect(host.querySelector('h2 > a.card-hit')?.getAttribute('href')).toBe('/orders/1');
  });
});

describe('ConfirmButton', () => {
  afterEach(() => vi.useRealTimers());

  it('disarms after a while, on an outside click and on cancel (clearing the error)', async () => {
    vi.useFakeTimers();
    const host = render(ConfirmButton, { onconfirm: () => {}, disarmAfter: 1000 });
    click(byText(host, 'Delete'));
    expect(byText(host, 'Delete permanently')).toBeDefined();
    vi.advanceTimersByTime(1100);
    flushSync();
    expect(byText(host, 'Delete permanently')).toBeUndefined();

    click(byText(host, 'Delete'));
    document.body.dispatchEvent(new Event('pointerdown', { bubbles: true }));
    flushSync();
    expect(byText(host, 'Delete permanently')).toBeUndefined();
  });

  it('keeps focus on the action, shows busy, clears the error on cancel', async () => {
    let reject: (reason: Error) => void = () => {};
    const host = render(ConfirmButton, {
      onconfirm: () => new Promise((_, no) => (reject = no)),
    });
    click(byText(host, 'Delete'));
    const action = byText(host, 'Delete permanently') as HTMLButtonElement;
    action.focus();
    click(action);
    expect(action.disabled).toBe(false);
    expect(action.getAttribute('aria-busy')).toBe('true');
    expect(action.textContent).toContain('Deleting…');
    reject(new Error('403'));
    await tick();
    flushSync();
    expect(host.querySelector('[role="alert"]')?.textContent).toBe('403');
    click(byText(host, 'Cancel'));
    expect(host.querySelector('[role="alert"]')).toBeNull();
    expect(document.activeElement).toBe(byText(host, 'Delete'));
  });

  it('disarms on Escape', () => {
    const host = render(ConfirmButton, { onconfirm: () => {} });
    click(byText(host, 'Delete'));
    key(byText(host, 'Delete permanently') as HTMLElement, 'Escape');
    expect(byText(host, 'Cancel')).toBeUndefined();
  });
});

describe('CopyButton', () => {
  it('shows the outcome next to inline text, including a failure', async () => {
    const writeText = vi
      .fn()
      .mockRejectedValueOnce(new Error('denied'))
      .mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true });
    const host = render(CopyButton, { value: 'id-1', children: html('<code>id-1</code>') });
    click(host.querySelector('button.inline'));
    await tick();
    flushSync();
    expect(host.querySelector('.note--failed')?.textContent).toContain('Copy failed');
    click(host.querySelector('button.inline'));
    await tick();
    flushSync();
    expect(host.querySelector('.note--copied')?.textContent).toContain('Copied');
    expect(host.querySelector('[aria-live="polite"]')?.textContent).toBe('Copied');
  });

  it('turns the button red when copying fails', async () => {
    const writeText = vi.fn().mockRejectedValue(new Error('denied'));
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true });
    const host = render(CopyButton, { value: 'x' });
    click(host.querySelector('button'));
    await tick();
    flushSync();
    expect(host.querySelector('button')?.className).toContain('btn--danger');
    expect(host.querySelector('button')?.textContent).toContain('Copy failed');
  });
});

describe('RefreshButton and SearchField', () => {
  it('RefreshButton is a Button with a live label prop', () => {
    const host = render(RefreshButton, {
      live: true,
      liveActionLabel: (state, action) => `${state}; ${action}`,
    });
    expect(host.querySelector('button')?.getAttribute('aria-label')).toBe(
      'Auto refreshing; Refresh',
    );
    expect(host.querySelector('button')?.className).toContain('btn--collapse');
  });

  it('SearchField defaults to md', () => {
    const host = render(SearchField, { label: 'Find' });
    expect(host.querySelector('.search--md')).not.toBeNull();
  });
});
