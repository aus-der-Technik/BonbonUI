import { isGlass, nestedPanel, surfaceKind } from './surfaces';

function dom(html: string) {
  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  return (selector: string) => host.querySelector(selector)!;
}

describe('surfaces', () => {
  it('finds a panel inside a panel, and only that', () => {
    const $ = dom(`
      <div data-layer="panel" id="outer">
        <div class="card" data-reflect="panel" id="inner"></div>
        <div class="card card--selected" data-reflect="panel" id="chosen"></div>
      </div>
      <div data-layer="panel" id="alone"></div>
      <div data-layer="front"><div data-layer="panel" id="on-glass"></div></div>`);
    expect(nestedPanel($('#inner'))).toBe(true);
    expect(nestedPanel($('#outer'))).toBe(false);
    expect(nestedPanel($('#alone'))).toBe(false);
    // A selected tile keeps its look and its light; a panel on glass is not on a panel.
    expect(nestedPanel($('#chosen'))).toBe(false);
    expect(nestedPanel($('#on-glass'))).toBe(false);
  });

  it('treats panels over a photo as glass', () => {
    const $ = dom(`
      <div data-surface="photo"><div data-layer="panel" id="photo"></div></div>
      <div data-layer="panel" id="plain"></div>`);
    expect(isGlass($('#photo'))).toBe(true);
    expect(surfaceKind($('#photo'))).toBe('glass');
    expect(surfaceKind($('#plain'))).toBe('panel');
  });
});
