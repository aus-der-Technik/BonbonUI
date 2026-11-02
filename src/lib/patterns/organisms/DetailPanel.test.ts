import { html, key, render, tick } from '../../test/render';
import DetailPanel from './DetailPanel.svelte';

// happy-dom cannot run the panel's animations; reduced motion makes them instant, as for users who ask for it.
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
    (host.querySelector('.backdrop') as HTMLElement).click();
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
});
