import { html, key, render, tick } from '../../test/render';
import DetailPanel from './DetailPanel.svelte';

// Reduced motion, as some users ask for: the panel only fades, quickly.
beforeAll(() => {
  vi.stubGlobal('matchMedia', (query: string) => ({
    matches: query.includes('reduce'),
    media: query,
  }));
});
afterAll(() => vi.unstubAllGlobals());

const base = { labelledby: 'title', children: html('<h2 id="title">Jane</h2>') };

describe('DetailPanel', () => {
  it('is a labelled modal with the content and footer of the item', async () => {
    const host = render(DetailPanel, {
      ...base,
      itemKey: 1,
      onclose: () => {},
      footer: html('<span>Updated</span>'),
    });
    const panel = host.querySelector('[role="dialog"]');
    expect(panel?.getAttribute('aria-labelledby')).toBe('title');
    expect(panel?.getAttribute('aria-modal')).toBe('true');
    expect(host.querySelector('h2')?.textContent).toBe('Jane');
    expect(host.querySelector('footer')?.textContent).toBe('Updated');
    expect(host.querySelector('.backdrop')).not.toBeNull();
    await tick();
    expect(document.activeElement).toBe(panel);
  });

  it('closes with Escape, the button and the backdrop, and steps with the arrow keys', () => {
    const onclose = vi.fn();
    const onbackdrop = vi.fn();
    const onprevious = vi.fn();
    const onnext = vi.fn();
    const host = render(DetailPanel, {
      ...base,
      itemKey: 1,
      onclose,
      onbackdrop,
      onprevious,
      onnext,
    });
    key(document.body, 'ArrowLeft');
    key(document.body, 'ArrowRight');
    key(document.body, 'Escape');
    expect(onprevious).toHaveBeenCalledOnce();
    expect(onnext).toHaveBeenCalledOnce();
    expect(onclose).toHaveBeenCalledOnce();
    const backdrop = host.querySelector('.backdrop') as HTMLElement;
    backdrop.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
    backdrop.click();
    expect(onbackdrop).toHaveBeenCalledOnce();
    (host.querySelector('button[aria-label="Close"]') as HTMLElement).click();
    expect(onclose).toHaveBeenCalledTimes(2);
  });

  it('does not step while typing and disables missing steps', () => {
    const onnext = vi.fn();
    const host = render(DetailPanel, {
      labelledby: 'title',
      itemKey: 1,
      onclose: () => {},
      onnext,
      nextLabel: 'Next person',
      children: html('<input />'),
    });
    key(host.querySelector('input')!, 'ArrowRight');
    expect(onnext).not.toHaveBeenCalled();
    expect(host.querySelector('button[aria-label="Previous"]')?.hasAttribute('disabled')).toBe(
      true,
    );
    expect(host.querySelector('button[aria-label="Next person"]')).not.toBeNull();
  });

  it('leaves the keys to the panel in front and keeps the backdrop behind', () => {
    const onclose = vi.fn();
    const host = render(DetailPanel, { ...base, itemKey: 1, layer: 'behind', onclose });
    key(document.body, 'Escape');
    expect(onclose).not.toHaveBeenCalled();
    expect(host.querySelector('.panel.behind')).not.toBeNull();
    expect(host.querySelector('.backdrop')).not.toBeNull();
    const front = render(DetailPanel, { ...base, itemKey: 2, layer: 'front', onclose });
    expect(front.querySelector('.backdrop')).toBeNull();
  });

  it('shows a skeleton while the first load runs, the error when it fails, and dims a refresh', () => {
    const loading = render(DetailPanel, { ...base, itemKey: null, onclose: () => {} });
    expect(loading.querySelector('.loading')).not.toBeNull();
    expect(loading.querySelector('h2')).toBeNull();
    const failed = render(DetailPanel, { ...base, itemKey: 1, error: 'Gone', onclose: () => {} });
    expect(failed.querySelector('[role="alert"]')?.textContent).toBe('Gone');
    const stale = render(DetailPanel, { ...base, itemKey: 1, loading: true, onclose: () => {} });
    expect(stale.querySelector('.content.stale')).not.toBeNull();
    expect(stale.querySelector('[role="dialog"]')?.getAttribute('aria-busy')).toBe('true');
  });

  it('keeps Tab inside the panel', () => {
    const host = render(DetailPanel, {
      labelledby: 'title',
      itemKey: 1,
      onclose: () => {},
      onprevious: () => {},
      children: html('<a href="/x">last</a>'),
    });
    const focusable = [...host.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')];
    const first = focusable[0]!;
    const last = focusable.at(-1)!;
    last.focus();
    key(last, 'Tab');
    expect(document.activeElement).toBe(first);
    key(first, 'Tab', { shiftKey: true });
    expect(document.activeElement).toBe(last);
  });

  it('leaves keys pressed inside a dialog opened from the panel to that dialog', () => {
    const onclose = vi.fn();
    const onnext = vi.fn();
    const host = render(DetailPanel, {
      ...base,
      itemKey: 1,
      onclose,
      onnext,
      children: html('<div><dialog open><button class="inner">ok</button></dialog></div>'),
    });
    const inner = host.querySelector('.inner')!;
    key(inner, 'Escape');
    key(inner, 'ArrowRight');
    expect(onclose).not.toHaveBeenCalled();
    expect(onnext).not.toHaveBeenCalled();
    // A modal elsewhere on the page (e.g. a ConfirmDialog in the top layer) as well.
    const other = document.createElement('div');
    other.setAttribute('aria-modal', 'true');
    other.innerHTML = '<input />';
    document.body.append(other);
    key(other.querySelector('input')!, 'Escape');
    expect(onclose).not.toHaveBeenCalled();
    other.remove();
    key(document.body, 'Escape');
    expect(onclose).toHaveBeenCalledOnce();
  });

  it('traps Tab across every kind of control and ignores a drag onto the backdrop', () => {
    const onclose = vi.fn();
    const host = render(DetailPanel, {
      ...base,
      itemKey: 1,
      onclose,
      children: html('<div><input class="first-field" /><textarea class="last"></textarea></div>'),
    });
    const last = host.querySelector<HTMLElement>('.last')!;
    last.focus();
    key(last, 'Tab');
    // The first stop is the panel's own Previous / Next / Close row.
    expect(document.activeElement).toBe(host.querySelector('header button:not([disabled])'));
    key(document.activeElement!, 'Tab', { shiftKey: true });
    expect(document.activeElement).toBe(last);
    host.querySelector('.panel')!.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
    (host.querySelector('.backdrop') as HTMLElement).click();
    expect(onclose).not.toHaveBeenCalled();
    const fixed = render(DetailPanel, { ...base, itemKey: 1, onclose, closeOnBackdrop: false });
    const backdrop = fixed.querySelector('.backdrop') as HTMLElement;
    backdrop.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
    backdrop.click();
    expect(onclose).not.toHaveBeenCalled();
  });

  it('shows its error as an Alert', () => {
    const host = render(DetailPanel, { ...base, itemKey: 1, error: 'Gone', onclose: () => {} });
    expect(host.querySelector('.error .alert--danger')).not.toBeNull();
  });
});
