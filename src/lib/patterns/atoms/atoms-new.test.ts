import { flushSync } from 'svelte';
import { click, html, input, key, render } from '../../test/render';
import AppIcon from './AppIcon.svelte';
import Avatar from './Avatar.svelte';
import Badge from './Badge.svelte';
import BrandBar from './BrandBar.svelte';
import Button from './Button.svelte';
import Card from './Card.svelte';
import Checkbox from './Checkbox.svelte';
import Divider from './Divider.svelte';
import Heading from './Heading.svelte';
import Link from './Link.svelte';
import LoadingOverlay from './LoadingOverlay.svelte';
import Radio from './Radio.svelte';
import Skeleton from './Skeleton.svelte';
import Slider from './Slider.svelte';
import StatusText from './StatusText.svelte';
import Tooltip from './Tooltip.svelte';
import Image from './Image.svelte';
import Price from './Price.svelte';
import ProgressBar from './ProgressBar.svelte';
import StatusDot from './StatusDot.svelte';
import Swatch from './Swatch.svelte';
import Switch from './Switch.svelte';
import Tag from './Tag.svelte';
import Text from './Text.svelte';
import { colorValue, isPaletteColor, paletteColors, paletteFor } from './palette';

describe('palette', () => {
  it('resolves names to tokens and passes other colours through', () => {
    expect(paletteColors).toContain('pink');
    expect(isPaletteColor('blue')).toBe(true);
    expect(isPaletteColor('#fff')).toBe(false);
    expect(colorValue('blue')).toBe('var(--color-blue)');
    expect(colorValue('#123456')).toBe('#123456');
    expect(colorValue(undefined)).toBeUndefined();
    expect(colorValue('')).toBeUndefined();
  });

  it('picks a stable, vivid colour per key', () => {
    expect(paletteFor('jane@example.com')).toBe(paletteFor('jane@example.com'));
    for (const name of ['a', 'b', 'Max Mustermann', 'kris', 'zz']) {
      expect(['gray', 'brown']).not.toContain(paletteFor(name));
    }
  });
});

describe('Button variants', () => {
  it('renders the new tinted and plain variants with a trailing icon', () => {
    const host = render(Button, {
      label: 'Next',
      variant: 'tinted',
      trailingIcon: 'chevron-right',
      block: true,
    });
    const button = host.querySelector('button');
    expect(button?.className).toContain('btn--tinted');
    expect(button?.className).toContain('btn--block');
    expect(button?.querySelector('.btn__trailing')).not.toBeNull();
    expect(
      render(Button, { label: 'More', variant: 'plain' }).querySelector('.btn--plain'),
    ).not.toBeNull();
  });

  it('swallows clicks while busy and on disabled links', () => {
    const onclick = vi.fn();
    const busy = render(Button, { label: 'Save', busy: true, busyLabel: 'Saving…', onclick });
    click(busy.querySelector('button'));
    expect(onclick).not.toHaveBeenCalled();
    expect(busy.textContent).toContain('Saving…');

    const link = render(Button, { label: 'Open', href: '/x', disabled: true, onclick });
    const a = link.querySelector('a');
    expect(a?.getAttribute('href')).toBeNull();
    expect(a?.getAttribute('aria-disabled')).toBe('true');
    click(a);
    expect(onclick).not.toHaveBeenCalled();
  });

  it('keeps refresh icons spinning instead of a spinner', () => {
    const host = render(Button, { label: 'Reload', icon: 'reload', busy: true });
    expect(host.querySelector('.spinner')).toBeNull();
    expect(host.querySelector('svg')).not.toBeNull();
  });

  it('opens external links safely', () => {
    const host = render(Button, { label: 'Docs', href: 'https://example.com', target: '_blank' });
    expect(host.querySelector('a')?.getAttribute('rel')).toBe('noopener noreferrer');
  });
});

describe('Card', () => {
  it('marks selected and interactive cards', () => {
    const host = render(Card, { selected: true, interactive: true, children: html('<p>x</p>') });
    const card = host.querySelector('.card');
    expect(card?.className).toContain('card--selected');
    expect(card?.className).toContain('card--interactive');
    expect(card?.getAttribute('role')).toBeNull();
  });

  it('becomes a keyboard-operable button with onclick', () => {
    const onclick = vi.fn();
    const host = render(Card, { onclick, selected: true, children: html('<p>Team</p>') });
    const card = host.querySelector('.card') as HTMLElement;
    expect(card.getAttribute('role')).toBe('button');
    expect(card.getAttribute('tabindex')).toBe('0');
    expect(card.getAttribute('aria-pressed')).toBe('true');
    click(card);
    key(card, 'Enter');
    key(card, ' ');
    key(card, 'a');
    expect(onclick).toHaveBeenCalledTimes(3);
  });

  it('becomes a link with href and stacks with gap', () => {
    const host = render(Card, {
      href: '/orders/1',
      gap: 'sm',
      title: 'Order',
      count: 3,
      children: html('<p>x</p>'),
    });
    const link = host.querySelector('a.card');
    expect(link?.getAttribute('href')).toBe('/orders/1');
    expect(link?.className).toContain('card--stack');
    expect(link?.getAttribute('style')).toContain('--card-gap');
    expect(host.querySelector('.card-count')?.textContent).toBe('3');
  });

  it('draws the accent stripe', () => {
    expect(render(Card, { accent: true }).querySelector('.card--accent')).not.toBeNull();
  });
});

describe('Badge and Tag tones', () => {
  it('colours a badge from the palette, solid or soft', () => {
    const host = render(Badge, { tone: 'purple', variant: 'solid', label: 'Pro', icon: 'star' });
    const badge = host.querySelector('.badge') as HTMLElement;
    expect(badge.className).toContain('badge--custom');
    expect(badge.className).toContain('badge--solid');
    expect(badge.getAttribute('style')).toContain('var(--color-purple)');
    expect(badge.querySelector('svg')).not.toBeNull();

    const custom = render(Badge, { color: '#123456', label: 'x' }).querySelector('.badge');
    expect(custom?.getAttribute('style')).toContain('#123456');
    expect(
      render(Badge, { tone: 'brand', label: 'b' }).querySelector('.badge--solid'),
    ).not.toBeNull();
    expect(render(Badge, { tone: 'ok', label: 'b' }).querySelector('.badge--custom')).toBeNull();
  });

  it('tints a tag from the palette and resolves its colour dot', () => {
    const host = render(Tag, { label: 'design', tone: 'pink', color: 'blue' });
    const tag = host.querySelector('.tag') as HTMLElement;
    expect(tag.className).toContain('tag--palette');
    expect(tag.getAttribute('style')).toContain('var(--color-pink)');
    expect(host.querySelector('.swatch')?.getAttribute('style')).toContain('var(--color-blue)');
    expect(render(Tag, { label: 'x', tone: 'accent' }).querySelector('.tag--palette')).toBeNull();
  });

  it('removes a tag', () => {
    const onremove = vi.fn();
    const host = render(Tag, { label: 'Leipzig', onremove });
    const remove = host.querySelector('.remove');
    expect(remove?.getAttribute('aria-label')).toBe('Remove Leipzig');
    click(remove);
    expect(onremove).toHaveBeenCalledOnce();
  });
});

describe('controls', () => {
  it('Checkbox maps the old red tone to accent and shows a description', () => {
    const host = render(Checkbox, { label: 'Archive', description: 'Keeps a copy', tone: 'red' });
    expect(host.querySelector('.box--accent')).not.toBeNull();
    expect(host.querySelector('.desc')?.textContent).toBe('Keeps a copy');
    const box = render(Checkbox, { 'aria-label': 'Select row', class: 'row-check' });
    expect(box.querySelector('.box.row-check input[type="checkbox"]')).not.toBeNull();
  });

  it('Checkbox binds checked through the native input', () => {
    const host = render(Checkbox, { label: 'x' });
    const input = host.querySelector('input') as HTMLInputElement;
    click(input);
    expect(input.checked).toBe(true);
  });

  it('Switch toggles and reports', () => {
    const onchange = vi.fn();
    const host = render(Switch, { label: 'Wi-Fi', size: 'sm', tone: 'ok', onchange });
    const sw = host.querySelector('[role="switch"]') as HTMLElement;
    expect(host.querySelector('.row--sm.row--ok')).not.toBeNull();
    click(sw);
    expect(sw.getAttribute('aria-checked')).toBe('true');
    click(host.querySelector('.label'));
    expect(onchange).toHaveBeenLastCalledWith(false);
  });

  it('ProgressBar clamps, maps brand to accent and takes a value label', () => {
    const host = render(ProgressBar, {
      value: 3,
      max: 7,
      label: 'Steps',
      showValue: true,
      tone: 'brand',
      valueLabel: '3 of 7',
    });
    expect(host.querySelector('.fill--accent')).not.toBeNull();
    expect(host.querySelector('.value')?.textContent).toBe('3 of 7');
    expect(host.querySelector('[role="progressbar"]')?.getAttribute('aria-valuetext')).toBe(
      '3 of 7',
    );
    const empty = render(ProgressBar, { value: -5, label: 'x', tone: 'danger', size: 'lg' });
    expect(empty.querySelector('.fill--empty.fill--danger')).not.toBeNull();
  });
});

describe('small atoms, new options', () => {
  it('Avatar picks a palette colour', () => {
    const auto = render(Avatar, { name: 'Max Mustermann', color: 'auto' });
    expect(auto.querySelector('.avatar--colored')?.getAttribute('style')).toContain('--color-');
    const fixed = render(Avatar, { name: 'Max', color: 'pink' });
    expect(fixed.querySelector('.avatar')?.getAttribute('style')).toContain('var(--color-pink)');
    expect(render(Avatar, { name: 'Max' }).querySelector('.avatar--colored')).toBeNull();
  });

  it('BrandBar, Swatch and Divider', () => {
    expect(
      render(BrandBar, { color: 'teal' }).querySelector('.bar')?.getAttribute('style'),
    ).toContain('var(--color-teal)');
    expect(
      render(Swatch, { color: 'mint' }).querySelector('.swatch')?.getAttribute('style'),
    ).toContain('var(--color-mint)');
    expect(render(Divider, { spacing: 'none' }).querySelector('hr.spacing--none')).not.toBeNull();
    expect(render(Divider, { label: 'or' }).querySelector('[role="separator"]')?.textContent).toBe(
      'or',
    );
    expect(
      render(Divider, { orientation: 'vertical' }).querySelector('[aria-orientation="vertical"]'),
    ).not.toBeNull();
  });
});

describe('Text', () => {
  it('renders the scale, tone and options on the chosen element', () => {
    const host = render(Text, {
      as: 'p',
      size: 'lg',
      tone: 'muted',
      weight: 'semibold',
      numeric: true,
      mono: true,
      caps: true,
      align: 'center',
      text: 'Hello',
    });
    const p = host.querySelector('p') as HTMLElement;
    expect(p.className).toContain('text--lg');
    expect(p.className).toContain('text--muted');
    expect(p.className).toContain('text--numeric');
    expect(p.className).toContain('text--mono');
    expect(p.className).toContain('text--caps');
    expect(p.style.fontWeight).toBe('var(--fw-semibold)');
    expect(p.style.textAlign).toBe('center');
    expect(p.textContent?.trim()).toBe('Hello');
  });

  it('truncates to one line or clamps several', () => {
    expect(
      render(Text, { truncate: true, text: 'x' }).querySelector('span.text--truncate'),
    ).not.toBeNull();
    const clamp = render(Text, { truncate: 3, children: html('<b>long</b>') });
    const el = clamp.querySelector('.text--clamp') as HTMLElement;
    expect(el.getAttribute('style')).toContain('--text-lines: 3');
    expect(el.querySelector('b')?.textContent).toBe('long');
  });

  it('defaults to a base span', () => {
    expect(render(Text, {}).querySelector('span.text--base.text--default')).not.toBeNull();
  });
});

describe('Heading', () => {
  it('maps the level to a default size', () => {
    expect(
      render(Heading, { level: 1, text: 'Dashboard' }).querySelector('h1.heading--display'),
    ).not.toBeNull();
    expect(render(Heading, { text: 'x' }).querySelector('h2.heading--3xl')).not.toBeNull();
    expect(
      render(Heading, { level: 6, text: 'x' }).querySelector('h6.heading--base'),
    ).not.toBeNull();
  });

  it('decouples size from level and groups eyebrow and subtitle', () => {
    const host = render(Heading, {
      level: 3,
      size: 'lg',
      tone: 'accent',
      eyebrow: 'Overview',
      subtitle: 'This week',
      align: 'center',
      children: html('<span>Sales</span>'),
    });
    const group = host.querySelector('hgroup') as HTMLElement;
    expect(group.style.textAlign).toBe('center');
    expect(group.querySelector('.eyebrow')?.textContent).toBe('Overview');
    expect(group.querySelector('h3.heading--lg.heading--accent')?.textContent?.trim()).toBe(
      'Sales',
    );
    expect(group.querySelector('.subtitle')?.textContent).toBe('This week');
  });

  it('applies weight and truncation without a group', () => {
    const h = render(Heading, {
      level: 4,
      weight: 'medium',
      truncate: true,
      text: 'x',
    }).querySelector('h4') as HTMLElement;
    expect(h.className).toContain('heading--truncate');
    expect(h.style.fontWeight).toBe('var(--fw-medium)');
  });
});

describe('Image', () => {
  it('shimmers while loading and fades in when loaded', () => {
    const onload = vi.fn();
    const host = render(Image, {
      src: 'https://example.com/a.jpg',
      alt: 'A chair',
      ratio: '16/9',
      onload,
    });
    const box = host.querySelector('.image') as HTMLElement;
    expect(box.className).toContain('image--loading');
    expect(box.style.aspectRatio.replace(/\s/g, '')).toBe('16/9');
    const img = host.querySelector('img') as HTMLImageElement;
    expect(img.getAttribute('loading')).toBe('lazy');
    expect(img.alt).toBe('A chair');
    img.dispatchEvent(new Event('load'));
    flushSync();
    expect(box.className).toContain('image--ready');
    expect(onload).toHaveBeenCalledOnce();
  });

  it('tries the fallback once, then shows the placeholder', () => {
    const onerror = vi.fn();
    const host = render(Image, {
      src: 'https://example.com/missing.jpg',
      fallback: 'https://example.com/fallback.jpg',
      alt: 'Product',
      lazy: false,
      ratio: 1,
      onerror,
    });
    host.querySelector('img')?.dispatchEvent(new Event('error'));
    flushSync();
    const img = host.querySelector('img');
    expect(img?.getAttribute('src')).toBe('https://example.com/fallback.jpg');
    expect(img?.getAttribute('loading')).toBe('eager');
    img?.dispatchEvent(new Event('error'));
    flushSync();
    expect(host.querySelector('img')).toBeNull();
    expect(host.querySelector('.placeholder')).not.toBeNull();
    expect(host.querySelector('[role="img"]')?.getAttribute('aria-label')).toBe('Product');
    expect(onerror).toHaveBeenCalledOnce();
  });

  it('shows the placeholder without a source and renders an overlay', () => {
    const host = render(Image, { src: null, alt: '', overlay: html('<b>49 €</b>') });
    expect(host.querySelector('.placeholder')).not.toBeNull();
    expect(host.querySelector('[role="img"]')).toBeNull();
    expect(host.querySelector('.overlay b')?.textContent).toBe('49 €');
  });
});

describe('StatusDot', () => {
  it('shows a label next to the dot', () => {
    const host = render(StatusDot, { tone: 'ok', pulse: true, label: 'Operational' });
    expect(host.querySelector('.dot--pulse')).not.toBeNull();
    expect(host.querySelector('.label')?.textContent).toBe('Operational');
    expect(host.querySelector('.status')?.getAttribute('style')).toContain('var(--ok)');
    expect(host.querySelector('[role="img"]')).toBeNull();
  });

  it('is an image with aria-label when alone, and takes palette or CSS colours', () => {
    const host = render(StatusDot, { tone: 'indigo', 'aria-label': 'Away', size: 'lg' });
    const status = host.querySelector('.status') as HTMLElement;
    expect(status.getAttribute('role')).toBe('img');
    expect(status.getAttribute('aria-label')).toBe('Away');
    expect(status.getAttribute('style')).toContain('var(--color-indigo)');
    const custom = render(StatusDot, { color: 'hotpink' }).querySelector('.status');
    expect(custom?.getAttribute('style')).toContain('hotpink');
  });
});

describe('Price', () => {
  const text = (host: HTMLElement, selector: string) =>
    host.querySelector(selector)?.textContent?.replace(/\s/g, ' ');

  it('formats in German euros by default', () => {
    const host = render(Price, { amount: 1234.5 });
    expect(text(host, '.amount')).toBe('1.234,50 €');
    expect(host.querySelector('.compare')).toBeNull();
  });

  it('strikes through a higher compare-at price', () => {
    const host = render(Price, { amount: 39, compareAt: 49, size: 'lg', unit: '/ month' });
    expect(host.querySelector('.price--sale.price--lg')).not.toBeNull();
    expect(text(host, 's.compare')).toContain('49,00 €');
    expect(host.querySelector('s .sr-only')?.textContent).toBe('Regular price');
    expect(host.querySelector('.unit')?.textContent).toBe('/ month');
    expect(render(Price, { amount: 49, compareAt: 39 }).querySelector('.compare')).toBeNull();
  });

  it('takes locale, currency, fraction digits and a free label', () => {
    const host = render(Price, { amount: 12, currency: 'USD', locale: 'en-US', fractionDigits: 0 });
    expect(text(host, '.amount')).toBe('$12');
    expect(text(render(Price, { amount: 0, freeLabel: 'Free' }), '.amount')).toBe('Free');
  });
});

describe('AppIcon', () => {
  it('is a labelled image by default with a glyph and a capped badge', () => {
    const host = render(AppIcon, { label: 'Mail', icon: 'mail', color: 'blue', badge: 120 });
    const app = host.querySelector('.app') as HTMLElement;
    expect(app.tagName).toBe('SPAN');
    expect(app.getAttribute('role')).toBe('img');
    expect(app.getAttribute('aria-label')).toBe('Mail, 99+ new');
    expect(app.getAttribute('style')).toContain('48px');
    expect(host.querySelector('.tile')?.getAttribute('style')).toContain('var(--color-blue)');
    expect(host.querySelector('.badge')?.textContent).toBe('99+');
    expect(host.querySelector('svg')).not.toBeNull();
  });

  it('becomes a button with onclick and a link with href', () => {
    const onclick = vi.fn();
    const button = render(AppIcon, {
      label: 'Notes',
      color: 'accent',
      size: 'lg',
      running: true,
      caption: true,
      active: true,
      onclick,
    });
    const el = button.querySelector('button') as HTMLButtonElement;
    expect(el.type).toBe('button');
    expect(el.getAttribute('aria-pressed')).toBe('true');
    expect(button.querySelector('.tile--accent')).not.toBeNull();
    expect(button.querySelector('.running')).not.toBeNull();
    expect(button.querySelector('.caption')?.textContent).toBe('Notes');
    expect(button.querySelector('.initial')?.textContent).toBe('N');
    click(el);
    expect(onclick).toHaveBeenCalledOnce();

    const link = render(AppIcon, {
      label: 'Shop',
      href: '/shop',
      color: 'glass',
      size: 20,
      active: true,
    });
    const a = link.querySelector('a') as HTMLAnchorElement;
    expect(a.getAttribute('href')).toBe('/shop');
    expect(a.getAttribute('aria-current')).toBe('page');
    expect(a.getAttribute('style')).toContain('20px');
    expect(link.querySelector('.tile--glass')).not.toBeNull();
  });

  it('shows a picture and hides an empty badge', () => {
    const host = render(AppIcon, { label: 'Photos', src: 'https://example.com/p.png', badge: 0 });
    expect(host.querySelector('.tile--image img')?.getAttribute('src')).toBe(
      'https://example.com/p.png',
    );
    expect(host.querySelector('.badge')).toBeNull();
    expect(host.querySelector('.app')?.getAttribute('aria-label')).toBe('Photos');
  });
});

describe('remaining atoms', () => {
  it('Tag renders as a link or a button', () => {
    const link = render(Tag, { label: 'Guide', href: 'https://example.com', external: true });
    const a = link.querySelector('a.tag') as HTMLAnchorElement;
    expect(a.target).toBe('_blank');
    expect(a.rel).toBe('noopener noreferrer');
    expect(a.title).toBe('https://example.com');
    const onclick = vi.fn();
    const chip = render(Tag, { label: 'design', tone: 'blue', count: 3, onclick });
    click(chip.querySelector('button.tag--palette'));
    expect(onclick).toHaveBeenCalledOnce();
    expect(chip.querySelector('.count')?.textContent).toBe('×3');
  });

  it('Link handles external and missing targets', () => {
    const ext = render(Link, {
      href: 'https://example.com',
      external: true,
      children: html('Docs'),
    });
    expect(ext.querySelector('a')?.getAttribute('rel')).toBe('noopener noreferrer');
    expect(ext.querySelector('.sr-only')?.textContent).toBe('(opens in a new tab)');
    const missing = render(Link, { href: null, children: html('Original') });
    expect(missing.querySelector('a')).toBeNull();
    expect(missing.querySelector('.missing .sr-only')?.textContent).toBe('(not available)');
  });

  it('Radio binds its group', () => {
    const host = render(Radio, {
      name: 'p',
      value: 'team',
      label: 'Team',
      description: 'Up to 20',
    });
    const radio = host.querySelector('input[type="radio"]') as HTMLInputElement;
    expect(host.querySelector('.desc')?.textContent).toBe('Up to 20');
    click(radio);
    expect(radio.checked).toBe(true);
  });

  it('Slider reports and formats its value', () => {
    const onchange = vi.fn();
    const host = render(Slider, {
      label: 'Volume',
      value: 10,
      hint: 'Loudness',
      format: (v: number) => `${v} %`,
      onchange,
    });
    expect(host.querySelector('output')?.textContent).toBe('10 %');
    expect(host.querySelector('.hint')?.textContent).toBe('Loudness');
    input(host.querySelector('input'), '40');
    expect(onchange).toHaveBeenCalledWith(40);
    expect(host.querySelector('output')?.textContent).toBe('40 %');
  });

  it('Tooltip opens on hover and focus and closes on Escape', () => {
    const host = render(Tooltip, {
      text: 'Hint',
      placement: 'bottom',
      children: html('<button>b</button>'),
    });
    const wrap = host.querySelector('.wrap') as HTMLElement;
    const tip = host.querySelector('[role="tooltip"]') as HTMLElement;
    expect(tip.className).toContain('tip--bottom');
    wrap.dispatchEvent(new Event('pointerenter'));
    flushSync();
    expect(tip.className).toContain('open');
    key(wrap, 'Escape');
    expect(tip.className).not.toContain('open');
    host.querySelector('button')?.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
    flushSync();
    expect(tip.className).toContain('open');
    host.querySelector('button')?.dispatchEvent(new FocusEvent('focusout', { bubbles: true }));
    flushSync();
    expect(tip.className).not.toContain('open');
  });

  it('Skeleton, StatusText and LoadingOverlay', () => {
    const lines = render(Skeleton, { lines: 3 });
    expect(lines.querySelectorAll('.bone')).toHaveLength(3);
    expect(
      render(Skeleton, { shape: 'circle', width: '40px' })
        .querySelector('.circle')
        ?.getAttribute('style'),
    ).toContain('height: 40px');
    const error = render(StatusText, { tone: 'error', message: 'Failed', busy: true });
    expect(error.querySelector('[role="alert"]')?.textContent).toContain('Failed');
    expect(error.querySelector('.spinner')).not.toBeNull();
    expect(
      render(StatusText, { children: html('<i>x</i>') }).querySelector('[role="status"] i'),
    ).not.toBeNull();
    expect(
      render(LoadingOverlay, { blocking: true }).querySelector('.overlay.blocking')?.textContent,
    ).toContain('Loading…');
    expect(render(LoadingOverlay, { active: false }).querySelector('.overlay')).toBeNull();
  });
});
