import { flushSync } from 'svelte';
import { click, html, render } from '../../test/render';
import NavRail from '../organisms/NavRail.svelte';
import Button from './Button.svelte';
import DotMatrix, { dotMatrixChars, dotMatrixRows, layoutDots } from './DotMatrix.svelte';
import Tooltip from './Tooltip.svelte';

describe('DotMatrix', () => {
  it('lays digits out on one fixed width with a gap between glyphs', () => {
    const one = layoutDots('1');
    const eleven = layoutDots('11');
    expect(one.width).toBe(5);
    expect(eleven.width).toBe(11);
    expect(layoutDots('8').width).toBe(layoutDots('1').width);
    expect(one.dots).toHaveLength(5 * dotMatrixRows);
    expect(dotMatrixChars).toEqual(expect.arrayContaining(['0', '9', ':', '.', '°', '%']));
  });

  it('skips characters it has no glyph for', () => {
    expect(layoutDots('a1b').width).toBe(5);
    expect(layoutDots('').width).toBe(0);
  });

  it('draws lit dots only, unless unlit is on, and keeps the text for assistive tech', () => {
    const host = render(DotMatrix, { value: '1', size: 'lg' });
    const svg = host.querySelector('svg');
    expect(svg?.getAttribute('aria-hidden')).toBe('true');
    expect(host.querySelector('.dots--lg')).not.toBeNull();
    // "1" has 10 lit dots out of 35
    expect(host.querySelectorAll('circle')).toHaveLength(10);
    expect(host.querySelector('.sr-only')?.textContent).toBe('1');

    const all = render(DotMatrix, { value: 7, unlit: true, label: 'seven' });
    expect(all.querySelectorAll('circle')).toHaveLength(35);
    expect(all.querySelectorAll('circle.off').length).toBeGreaterThan(0);
    expect(all.querySelector('.sr-only')?.textContent).toBe('seven');
  });

  it('keeps a viewBox for an empty value', () => {
    const host = render(DotMatrix, { value: '' });
    expect(host.querySelector('svg')?.getAttribute('viewBox')).toBe('0 0 1 7');
  });
});

describe('Button soft and shimmer', () => {
  it('renders the soft variant as a toggle', () => {
    const host = render(Button, {
      label: 'Vents',
      icon: 'wind',
      variant: 'soft',
      iconOnly: true,
      'aria-pressed': true,
    });
    const button = host.querySelector('button');
    expect(button?.className).toContain('btn--soft');
    expect(button?.getAttribute('aria-pressed')).toBe('true');
    expect(host.querySelector('.shimmer')).toBeNull();
  });

  it('wraps a shimmering button and stills the light while busy', () => {
    const onclick = vi.fn();
    const host = render(Button, { label: 'Mist now', shimmer: true, block: true, onclick });
    const wrap = host.querySelector('.shimmer');
    expect(wrap?.className).toContain('shimmer--pill');
    expect(wrap?.className).toContain('shimmer--block');
    expect(wrap?.className).not.toContain('shimmer--still');
    click(wrap?.querySelector('button'));
    expect(onclick).toHaveBeenCalledTimes(1);

    const busy = render(Button, { label: 'Save', shimmer: true, busy: true, shape: 'rounded' });
    expect(busy.querySelector('.shimmer')?.className).toContain('shimmer--still');
    expect(busy.querySelector('.shimmer')?.className).toContain('shimmer--rounded');
  });
});

describe('Tooltip beside its trigger', () => {
  it('takes the right and left placements', () => {
    const right = render(Tooltip, {
      text: 'Overview',
      placement: 'right',
      children: html('<button>o</button>'),
    });
    expect(right.querySelector('.tip--right')).not.toBeNull();
    const left = render(Tooltip, {
      text: 'Back',
      placement: 'left',
      children: html('<button>b</button>'),
    });
    expect(left.querySelector('.tip--left')).not.toBeNull();
  });
});

describe('NavRail', () => {
  const items = [
    { id: 'overview', label: 'Overview', icon: 'home' as const },
    { id: 'docs', label: 'Docs', icon: 'book' as const, href: '#docs' },
  ];

  it('marks the current item and selects another one', () => {
    const onselect = vi.fn();
    const host = render(NavRail, { items, current: 'overview', onselect, label: 'Device' });
    const nav = host.querySelector('nav');
    expect(nav?.getAttribute('aria-label')).toBe('Device');
    expect(nav?.className).toContain('rail--vertical');
    const [first, second] = host.querySelectorAll<HTMLElement>('.rail__item');
    expect(first?.getAttribute('aria-current')).toBe('page');
    expect(first?.tagName).toBe('BUTTON');
    expect(second?.tagName).toBe('A');
    expect(host.querySelector('.tip--right')).not.toBeNull();

    click(second);
    flushSync();
    expect(onselect).toHaveBeenCalledWith('docs');
    expect(second?.getAttribute('aria-current')).toBe('page');
    expect(first?.hasAttribute('aria-current')).toBe(false);
  });

  it('lies down horizontally with its tooltips below, and renders its ends', () => {
    const host = render(NavRail, {
      items,
      orientation: 'horizontal',
      top: html('<span class="logo">L</span>'),
      bottom: html('<span class="me">M</span>'),
    });
    expect(host.querySelector('nav')?.className).toContain('rail--horizontal');
    expect(host.querySelector('.tip--bottom')).not.toBeNull();
    expect(host.querySelector('.rail__end .logo')).not.toBeNull();
    expect(host.querySelector('.rail__end--bottom .me')).not.toBeNull();
    click(host.querySelector('.rail__item'));
    flushSync();
    expect(host.querySelector('.rail__item')?.getAttribute('aria-current')).toBe('page');
  });
});
