import { joinParts } from './joined';

/** happy-dom draws nothing: an element "is drawn" unless it or a parent is marked `data-hidden`. */
const drawn = (el: Element) => !el.closest('[data-hidden]');

describe('Joined parts', () => {
  let resized: (() => void)[] = [];
  const realRects = HTMLElement.prototype.getClientRects;
  const realObserver = globalThis.ResizeObserver;

  beforeEach(() => {
    resized = [];
    HTMLElement.prototype.getClientRects = function (this: HTMLElement) {
      return (drawn(this) ? [{}] : []) as unknown as DOMRectList;
    };
    globalThis.ResizeObserver = class {
      constructor(private callback: () => void) {}
      observe() {
        resized.push(this.callback);
      }
      unobserve() {}
      disconnect() {}
    } as unknown as typeof ResizeObserver;
  });
  afterEach(() => {
    HTMLElement.prototype.getClientRects = realRects;
    globalThis.ResizeObserver = realObserver;
    document.body.innerHTML = '';
  });

  const group = () => {
    const node = document.createElement('div');
    node.innerHTML =
      '<label class="search"><input /></label><span><button class="btn btn--tinted">New</button></span>';
    document.body.append(node);
    return node;
  };
  const marks = (node: HTMLElement) =>
    [...node.querySelectorAll<HTMLElement>('[data-joined]')].map((el) => el.dataset.joined);
  const settle = () => new Promise((resolve) => setTimeout(resolve, 0));

  it('marks the ends, steps wrappers aside, and keeps a filled part a pill', () => {
    const node = group();
    const stop = joinParts(node);
    expect(marks(node)).toEqual(['first', 'last']);
    expect(node.querySelector('span')?.hasAttribute('data-joined-wrap')).toBe(true);
    expect(node.querySelector('.btn')?.hasAttribute('data-joined-fill')).toBe(true);
    stop();
  });

  it('keeps its marks while the whole group is hidden, and counts again when it is shown', async () => {
    const node = group();
    const stop = joinParts(node);
    node.dataset.hidden = '';
    node.append(document.createElement('i')); // something changes inside while hidden
    await settle();
    expect(marks(node)).toEqual(['first', 'last']);

    // A part goes while hidden; shown again, the group counts what is there.
    node.querySelector('span')?.remove();
    await settle();
    delete node.dataset.hidden;
    for (const callback of resized) callback();
    expect(marks(node)).toEqual(['only']);
    stop();
  });

  it('a group born hidden is marked once it is drawn', () => {
    const node = group();
    node.dataset.hidden = '';
    const stop = joinParts(node);
    expect(marks(node)).toEqual([]);
    delete node.dataset.hidden;
    for (const callback of resized) callback();
    expect(marks(node)).toEqual(['first', 'last']);
    stop();
  });

  it('a part hidden on its own leaves the others to close the group', async () => {
    const node = group();
    const stop = joinParts(node);
    (node.querySelector('span') as HTMLElement).dataset.hidden = '';
    node.append(document.createElement('i'));
    await settle();
    expect(marks(node)).toEqual(['only']);
    stop();
  });
});
