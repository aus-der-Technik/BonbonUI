/**
 * Mirror — a live, inert copy of what lies behind a glass surface.
 *
 * Chromium displaces the real backdrop: an SVG filter on a layer that carries a
 * `backdrop-filter` bends what is behind it. WebKit and Gecko apply SVG filters only to an
 * element's own painting, never to its backdrop. So for them the lens paints the page itself —
 * a copy of `<body>`, pixel-aligned under the surface — and runs the same filter over that.
 *
 * Keeping it cheap and correct:
 *   - Only boxes near the lens are copied in full; far-away boxes become empty stand-ins of the
 *     same size (`content-visibility: hidden` + `contain-intrinsic-size`), so layout matches.
 *     Scrolling further than the margin rebuilds.
 *   - Scrolling only moves the copy; attribute and text changes are patched in place; structural
 *     changes rebuild (throttled). Form values, scroll offsets, sticky offsets and running CSS
 *     animations are carried over.
 *   - The copy lives in a shadow root, so it is invisible to the page's own queries: a toolbar
 *     looking up its buttons, `getElementById`, label lookups and radio groups all stay with the
 *     originals. The page's stylesheets are shared into every shadow root as one constructed
 *     sheet. The copy is `inert` and `aria-hidden`, and leaves out every lens (no mirrors of
 *     mirrors) and the surface itself (hidden, so it does not show up behind itself).
 */

/** Marks a lens box; mirrors skip it, and mutations inside it are ignored. */
export const LENS_ATTR = 'data-bb-lens';
/** On the copy of the surface: hidden but still taking its room. */
export const HIDE_ATTR = 'data-bb-mirror-hide';
/** On copies of sticky elements: positioned by the mirror instead. */
export const STICKY_ATTR = 'data-bb-mirror-sticky';

const SKIP_TAGS = new Set(['SCRIPT', 'TEMPLATE', 'NOSCRIPT', 'STYLE', 'LINK', 'META']);
const MEDIA_TAGS = new Set(['IFRAME', 'VIDEO', 'AUDIO', 'OBJECT', 'EMBED']);
const MEDIA_STRIPPED = ['src', 'srcdoc', 'data', 'autoplay'];
/** Only boxes that size containment applies to can stand in for their content. */
const UNCULLABLE =
  /^(inline|contents|none|table-(row|row-group|header-group|footer-group|column|column-group)|ruby)/;
/** The mirror's own markers, styled inside every shadow root. */
const OWN_RULES =
  `[${HIDE_ATTR}]{visibility:hidden!important}` +
  `[${STICKY_ATTR}]{position:relative!important;inset:auto!important}` +
  // A layer of its own anywhere in the copy makes Safari drop the lens filter: no will-change,
  // no backdrop filters, nothing animating (animated values are frozen in, see #freeze).
  // Scrollers are handled per element (#layerless).
  `*,*::before,*::after{will-change:auto!important;backdrop-filter:none!important;` +
  `-webkit-backdrop-filter:none!important;animation:none!important;transition:none!important}`;
/** Scroll containers: Safari gives each its own layer, which the filter cannot cover. */
const SCROLLS = /^(auto|scroll|overlay)$/;

const BACKGROUND = [
  'background-color',
  'background-image',
  'background-size',
  'background-position',
  'background-repeat',
  'background-origin',
  'background-clip',
];

const MIN_REBUILD_MS = 150;
const SETTLE_MS = 450;

type Pair = [Element, HTMLElement];

export class Mirror {
  /** Holds the shadow root; GlassLens puts it inside the filtered layer. */
  readonly host: HTMLSpanElement;
  /** The copy's viewport, inside the shadow root. */
  readonly stage: HTMLDivElement;
  readonly #shadow: ShadowRoot;
  readonly #lens: HTMLElement;
  readonly #surface: Element;
  #clones = new WeakMap<Node, Node>();
  #stubs = new WeakSet<Node>();
  #fixes = new WeakMap<Element, () => void>();
  #sticky: { pair: Pair; x: number; y: number }[] = [];
  /** Copies standing in for animated originals, with the properties the animation moves. */
  #frozen: { pair: Pair; props: string[] }[] = [];
  #thaw: ReturnType<typeof setInterval> | undefined;
  #body: HTMLElement | null = null;
  #roi = { left: 0, top: 0, right: 0, bottom: 0 };
  #margin = 600;
  #scrolled = 0;
  #frame = 0;
  #timer: ReturnType<typeof setTimeout> | undefined;
  #settle: ReturnType<typeof setTimeout> | undefined;
  #last = 0;

  constructor(lens: HTMLElement, surface: Element) {
    this.#lens = lens;
    this.#surface = surface;
    this.host = document.createElement('span');
    this.host.setAttribute('aria-hidden', 'true');
    this.host.inert = true;
    this.host.style.cssText = 'position:absolute;left:0;top:0;pointer-events:none;';
    this.#shadow = this.host.attachShadow({ mode: 'open' });
    this.stage = document.createElement('div');
    this.stage.style.cssText = 'position:absolute;left:0;top:0;transform-origin:0 0;';
    this.#shadow.append(this.stage);
    this.restyle();
    register(this);
    this.build();
  }

  destroy(): void {
    unregister(this);
    cancelAnimationFrame(this.#frame);
    clearTimeout(this.#timer);
    clearTimeout(this.#settle);
    clearInterval(this.#thaw);
    this.host.remove();
    this.#body = null;
  }

  /** Gives the shadow root the page's current styles. */
  restyle(): void {
    const styles = pageStyles();
    if (styles.sheets) this.#shadow.adoptedStyleSheets = styles.sheets;
    for (const el of [...this.#shadow.children]) if (el !== this.stage) el.remove();
    this.#shadow.prepend(...styles.nodes.map((n) => n.cloneNode(true)));
  }

  /** Copies the page again (throttled unless `now`). */
  rebuild(now = false): void {
    if (now) return this.build();
    if (this.#timer) return;
    const wait = Math.max(0, MIN_REBUILD_MS - (performance.now() - this.#last));
    this.#timer = setTimeout(() => {
      this.#timer = undefined;
      this.build();
    }, wait);
  }

  build(): void {
    clearTimeout(this.#timer);
    this.#timer = undefined;
    this.#last = performance.now();
    this.#scrolled = 0;
    this.#clones = new WeakMap();
    this.#stubs = new WeakSet();
    this.#fixes = new WeakMap();
    this.#sticky = [];

    const lens = this.#lens.getBoundingClientRect();
    this.#margin = Math.max(window.innerHeight || 0, 600);
    const m = this.#margin;
    this.#roi = {
      left: lens.left - m,
      top: lens.top - m,
      right: lens.right + m,
      bottom: lens.bottom + m,
    };

    // Everything is read from the live page before anything is written: one layout, not many.
    const scrolled: Pair[] = [];
    const selects: [HTMLSelectElement, HTMLSelectElement][] = [];
    const body = this.#copy(document.body, scrolled, selects) as HTMLElement | null;
    if (!body) return;
    this.#body = body;
    const canvas = this.#canvas();
    const fixBody = () => {
      const r = document.body.getBoundingClientRect();
      body.style.position = 'absolute';
      body.style.margin = '0';
      body.style.left = `${r.left}px`;
      body.style.top = `${r.top}px`;
      body.style.width = `${r.width}px`;
      body.style.minHeight = `${r.height}px`;
      // Its background is the canvas's (below); painted here it would cover the body's own
      // negative-z children (the tint blobs), which sit between canvas and body.
      if (canvas.fromBody) body.style.background = 'transparent';
    };
    this.#fix(body, fixBody);
    this.stage.replaceChildren(canvas.el, body);

    for (const [orig, copy] of selects) copy.selectedIndex = orig.selectedIndex;
    for (const [orig, copy] of scrolled) {
      copy.scrollTop = orig.scrollTop;
      copy.scrollLeft = orig.scrollLeft;
    }
    this.#freeze();
    this.sync();
  }

  /** Re-aligns the copy with the page (next frame). */
  schedule(): void {
    if (this.#frame) return;
    this.#frame = requestAnimationFrame(() => {
      this.#frame = 0;
      this.sync();
    });
  }

  sync(): void {
    if (!this.#body) return;
    const lens = this.#lens.getBoundingClientRect();
    // The stage sits at the lens and is shifted back, so its origin is the viewport's: the copy
    // is laid out in viewport coordinates, and `position: fixed` inside it lands where it should
    // (a transform makes the stage their containing block).
    const root = document.documentElement;
    this.stage.style.width = `${root.clientWidth || window.innerWidth}px`;
    this.stage.style.height = `${root.clientHeight || window.innerHeight}px`;
    this.stage.style.transform = `translate(${-lens.left}px, ${-lens.top}px)`;
    this.#fixes.get(this.#body)?.();
    this.#placeCanvas?.();

    // Sticky copies do not stick (there is nothing to scroll): move them where the originals are.
    for (const entry of this.#sticky) {
      const [orig, copy] = entry.pair;
      const want = orig.getBoundingClientRect();
      const have = copy.getBoundingClientRect();
      entry.x += want.left - have.left;
      entry.y += want.top - have.top;
      copy.style.translate = `${entry.x}px ${entry.y}px`;
    }
  }

  /** A scroll somewhere in the page. */
  scrolled(target: EventTarget | null, distance: number): void {
    const copy = target instanceof Element ? this.#clones.get(target) : undefined;
    if (copy instanceof Element && target instanceof Element) {
      copy.scrollTop = target.scrollTop;
      copy.scrollLeft = target.scrollLeft;
    }
    this.#scrolled += distance;
    // New content is about to come into view that was only copied as a stand-in.
    if (this.#scrolled > this.#margin / 2) {
      this.#scrolled = 0;
      this.rebuild();
    }
    this.schedule();
  }

  /** A form control changed its value (no mutation reports that). */
  input(target: EventTarget | null): void {
    const copy = target instanceof Element ? this.#clones.get(target) : undefined;
    if (target instanceof HTMLInputElement && copy instanceof HTMLInputElement) {
      copy.value = target.value;
      copy.checked = target.checked;
    } else if (target instanceof HTMLTextAreaElement && copy instanceof HTMLTextAreaElement) {
      copy.value = target.value;
    } else if (target instanceof HTMLSelectElement && copy instanceof HTMLSelectElement) {
      copy.selectedIndex = target.selectedIndex;
    }
  }

  mutated(records: MutationRecord[]): void {
    let rebuild = false;
    let settle = false;
    for (const record of records) {
      const copy = this.#clones.get(record.target);
      if (record.type === 'childList' || !copy || this.#stubs.has(copy)) {
        rebuild = true;
      } else if (record.type === 'characterData') {
        (copy as CharacterData).data = (record.target as CharacterData).data;
      } else if (record.attributeName) {
        const name = record.attributeName;
        if (
          name === 'autofocus' ||
          (MEDIA_TAGS.has(copy.nodeName) && MEDIA_STRIPPED.includes(name))
        )
          continue;
        const value = (record.target as Element).getAttribute(name);
        if (value === null) (copy as Element).removeAttribute(name);
        else (copy as Element).setAttribute(name, value);
        this.#fixes.get(copy as Element)?.();
        // A class or style change may resize boxes that are only stand-ins here.
        settle = true;
      }
    }
    if (rebuild) this.rebuild();
    else if (settle) {
      clearTimeout(this.#settle);
      this.#settle = setTimeout(() => this.rebuild(), SETTLE_MS);
    }
    this.schedule();
  }

  #copy(
    orig: Element,
    scrolled: Pair[],
    selects: [HTMLSelectElement, HTMLSelectElement][],
  ): Element | null {
    if (SKIP_TAGS.has(orig.tagName) || orig.hasAttribute(LENS_ATTR)) return null;
    // Top-layer things (modal dialogs, open popovers) are not behind anything.
    try {
      if (orig.matches(':modal, :popover-open')) return null;
    } catch {
      // Older engines know neither pseudo-class.
    }

    const copy = orig.cloneNode(false) as Element;
    this.#clones.set(orig, copy);
    const html = orig instanceof HTMLElement;
    let style: CSSStyleDeclaration | undefined;
    const computed = () => (style ??= getComputedStyle(orig));

    copy.removeAttribute('autofocus');
    if (orig === this.#surface) copy.setAttribute(HIDE_ATTR, '');

    if (MEDIA_TAGS.has(orig.tagName)) {
      for (const name of MEDIA_STRIPPED) copy.removeAttribute(name);
      if (html) {
        copy.setAttribute('width', String(orig.offsetWidth));
        copy.setAttribute('height', String(orig.offsetHeight));
      }
      return copy;
    }
    if (orig instanceof HTMLImageElement) copy.setAttribute('loading', 'eager');
    if (orig instanceof HTMLCanvasElement && copy instanceof HTMLCanvasElement) {
      try {
        copy.getContext('2d')?.drawImage(orig, 0, 0);
      } catch {
        // A tainted or lost canvas stays blank in the copy.
      }
    }
    if (orig instanceof HTMLSelectElement) selects.push([orig, copy as HTMLSelectElement]);

    if (html) {
      const r = orig.getBoundingClientRect();
      const roi = this.#roi;
      const far =
        r.bottom < roi.top || r.top > roi.bottom || r.right < roi.left || r.left > roi.right;
      if (far && orig.firstChild) {
        const cs = computed();
        if (cs.display === 'none') return copy;
        if (!UNCULLABLE.test(cs.display)) return this.#stub(orig, copy as HTMLElement, cs);
      }
      this.#layerless(orig, copy as HTMLElement, computed());
      if (computed().position === 'sticky') {
        copy.setAttribute(STICKY_ATTR, '');
        const entry = { pair: [orig, copy as HTMLElement] as Pair, x: 0, y: 0 };
        this.#sticky.push(entry);
        this.#fix(copy as HTMLElement, (el) => {
          el.style.translate = `${entry.x}px ${entry.y}px`;
        });
      }
      if (orig.scrollTop || orig.scrollLeft) scrolled.push([orig, copy as HTMLElement]);
    }

    for (const child of orig.childNodes) {
      if (child.nodeType === Node.TEXT_NODE) {
        const text = child.cloneNode(false);
        this.#clones.set(child, text);
        copy.appendChild(text);
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        const sub = this.#copy(child as Element, scrolled, selects);
        if (sub) copy.appendChild(sub);
      }
    }
    return copy;
  }

  /**
   * The canvas: the root's background (or the body's, which propagates to it), under everything
   * else — including the body's negative-z children — and sized like the root box it fills.
   */
  #canvas(): { el: HTMLDivElement; fromBody: boolean } {
    const el = document.createElement('div');
    const root = document.documentElement;
    const rootStyle = getComputedStyle(root);
    const fromBody =
      rootStyle.backgroundImage === 'none' &&
      /^(transparent|rgba\(0, 0, 0, 0\))$/.test(rootStyle.backgroundColor);
    const source = fromBody ? getComputedStyle(document.body) : rootStyle;
    for (const p of BACKGROUND) el.style.setProperty(p, source.getPropertyValue(p));
    const fixed = source.getPropertyValue('background-attachment').includes('fixed');
    el.style.position = 'absolute';
    el.style.zIndex = '-2147483647';
    const place = () => {
      const r = root.getBoundingClientRect();
      const vw = root.clientWidth || window.innerWidth;
      const vh = root.clientHeight || window.innerHeight;
      el.style.left = `${fixed ? 0 : r.left}px`;
      el.style.top = `${fixed ? 0 : r.top}px`;
      el.style.width = `${fixed ? vw : Math.max(r.width, vw)}px`;
      el.style.height = `${fixed ? vh : Math.max(r.height, root.scrollHeight, vh)}px`;
    };
    place();
    this.#placeCanvas = place;
    return { el, fromBody };
  }

  #placeCanvas: (() => void) | undefined;

  /** An empty box of the original's size, standing in for content far from the lens. */
  /**
   * Safari composites scroll containers (and anything with `will-change`) into layers of their
   * own, and an element with such a layer inside silently loses an SVG `url()` filter — the
   * lens would show the copy unbent. So the copy has no scrollers: they become
   * `overflow: hidden`, which can still be scrolled from script, so offsets keep following.
   * A classic scrollbar's room is kept with `scrollbar-gutter`.
   */
  #layerless(orig: HTMLElement, copy: HTMLElement, cs: CSSStyleDeclaration): void {
    const values = [cs.overflowX, cs.overflowY, ...(cs.overflow ?? '').split(' ')];
    if (!values.some((v) => SCROLLS.test(v))) return;
    const px = (p: string) => parseFloat(cs.getPropertyValue(p)) || 0;
    const bar =
      orig.offsetWidth - orig.clientWidth - px('border-left-width') - px('border-right-width');
    this.#fix(copy, (el) => {
      el.style.setProperty('overflow', 'hidden', 'important');
      if (bar > 0) el.style.setProperty('scrollbar-gutter', 'stable', 'important');
    });
  }

  #stub(orig: HTMLElement, copy: HTMLElement, cs: CSSStyleDeclaration): HTMLElement {
    const px = (p: string) => parseFloat(cs.getPropertyValue(p)) || 0;
    const width =
      orig.offsetWidth -
      px('padding-left') -
      px('padding-right') -
      px('border-left-width') -
      px('border-right-width');
    const height =
      orig.offsetHeight -
      px('padding-top') -
      px('padding-bottom') -
      px('border-top-width') -
      px('border-bottom-width');
    this.#stubs.add(copy);
    this.#layerless(orig, copy, cs);
    this.#fix(copy, (el) => {
      el.style.setProperty('content-visibility', 'hidden');
      el.style.setProperty(
        'contain-intrinsic-size',
        `${Math.max(0, width)}px ${Math.max(0, height)}px`,
      );
    });
    return copy;
  }

  /** Inline styles the mirror owns on a copy; re-applied whenever a patch replaces `style`. */
  #fix(copy: HTMLElement, apply: (el: HTMLElement) => void): void {
    const before = this.#fixes.get(copy);
    const fix = () => {
      before?.();
      apply(copy);
    };
    this.#fixes.set(copy, fix);
    fix();
  }

  /**
   * Nothing may animate in the copy (Safari would give it a layer and drop the lens filter), so
   * each animated element's copy holds the animated properties' current values instead. Endless
   * animations (the drifting backdrop) are re-read about once a second.
   */
  #freeze(): void {
    clearInterval(this.#thaw);
    this.#frozen = [];
    if (typeof document.getAnimations !== 'function') return;
    let endless = false;
    for (const animation of document.getAnimations()) {
      const effect = animation.effect as KeyframeEffect | null;
      if (!effect?.target || effect.pseudoElement) continue;
      const target = effect.target;
      const copy = this.#clones.get(target);
      if (!(copy instanceof HTMLElement) || !(target instanceof HTMLElement)) continue;
      const props = new Set<string>();
      for (const frame of effect.getKeyframes?.() ?? []) {
        for (const key of Object.keys(frame)) {
          if (!['offset', 'easing', 'composite', 'computedOffset'].includes(key)) {
            props.add(key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`));
          }
        }
      }
      if (!props.size) continue;
      const entry = { pair: [target, copy] as Pair, props: [...props] };
      this.#frozen.push(entry);
      this.#fix(copy, () => this.#snapshot(entry));
      if (effect.getTiming?.().iterations === Infinity && animation.playState === 'running') {
        endless = true;
      }
    }
    if (endless) {
      this.#thaw = setInterval(() => {
        for (const entry of this.#frozen) this.#snapshot(entry);
      }, 1000);
    }
  }

  #snapshot({ pair: [orig, copy], props }: { pair: Pair; props: string[] }): void {
    const cs = getComputedStyle(orig);
    for (const p of props) copy.style.setProperty(p, cs.getPropertyValue(p), 'important');
  }
}

/*
 * The page's styles for the shadow roots, built once and shared: every readable stylesheet
 * flattened into one constructed sheet (plus the mirror's own rules). Sheets that cannot be read
 * (cross-origin) and engines without constructed sheets get copies of the style nodes instead.
 */
let styles: { sheets: CSSStyleSheet[] | null; nodes: Node[] } | null = null;

function flatten(sheet: CSSStyleSheet): string {
  let text = '';
  for (const rule of sheet.cssRules) {
    if (typeof CSSImportRule !== 'undefined' && rule instanceof CSSImportRule) {
      try {
        const inner = rule.styleSheet ? flatten(rule.styleSheet) : '';
        const media = rule.media?.mediaText;
        text += media && media !== 'all' ? `@media ${media}{${inner}}` : inner;
      } catch {
        // An unreadable import stays out.
      }
    } else {
      text += `${rule.cssText}\n`;
    }
  }
  return text;
}

function pageStyles(): { sheets: CSSStyleSheet[] | null; nodes: Node[] } {
  if (styles) return styles;
  const constructed =
    typeof CSSStyleSheet !== 'undefined' &&
    'replaceSync' in CSSStyleSheet.prototype &&
    'adoptedStyleSheets' in ShadowRoot.prototype;
  const nodes: Node[] = [];
  let text = OWN_RULES;
  for (const sheet of document.styleSheets) {
    if (sheet.disabled || (sheet.ownerNode instanceof Element && insideLens(sheet.ownerNode)))
      continue;
    try {
      if (!constructed) throw new Error('no constructed sheets');
      const media = sheet.media?.mediaText;
      const inner = flatten(sheet);
      text += media && media !== 'all' ? `@media ${media}{${inner}}` : inner;
    } catch {
      if (sheet.ownerNode) nodes.push(sheet.ownerNode);
    }
  }
  let sheets: CSSStyleSheet[] | null = null;
  if (constructed) {
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(text);
    sheets = [sheet];
  } else {
    const own = document.createElement('style');
    own.textContent = OWN_RULES;
    nodes.push(own);
  }
  styles = { sheets, nodes };
  return styles;
}

const isStyleNode = (node: Node) =>
  node.nodeName === 'STYLE' || node.nodeName === 'LINK' || node.parentNode?.nodeName === 'STYLE';

/** Styles were added, removed or edited (lazy components, hot reload): refresh every copy. */
function stylesChanged(records: MutationRecord[]): boolean {
  return records.some(
    (r) =>
      isStyleNode(r.target) ||
      [...r.addedNodes].some(isStyleNode) ||
      [...r.removedNodes].some(isStyleNode),
  );
}

/*
 * One observer and one set of listeners for every mirror on the page: each lens would otherwise
 * receive and filter every mutation and scroll on its own.
 */
const mirrors = new Set<Mirror>();
let observer: MutationObserver | undefined;
const offsets = new WeakMap<object, [number, number]>();

function scrollDistance(target: EventTarget | null): number {
  const el = target instanceof Element ? target : document.scrollingElement;
  if (!el) return 0;
  const now: [number, number] = [el.scrollLeft, el.scrollTop];
  const before = offsets.get(el) ?? now;
  offsets.set(el, now);
  return Math.abs(now[0] - before[0]) + Math.abs(now[1] - before[1]);
}

function onScroll(event: Event) {
  const target = event.target === document ? null : event.target;
  const distance = scrollDistance(target);
  for (const mirror of mirrors) mirror.scrolled(target, distance);
}
function onInput(event: Event) {
  for (const mirror of mirrors) mirror.input(event.target);
}
function onResize() {
  for (const mirror of mirrors) mirror.rebuild();
}
function onLoad(event: Event) {
  // An image arriving can change layout without a mutation.
  if (event.target instanceof HTMLImageElement) onResize();
}

function insideLens(node: Node): boolean {
  const el = node instanceof Element ? node : node.parentElement;
  return !!el?.closest(`[${LENS_ATTR}]`);
}

function register(mirror: Mirror) {
  mirrors.add(mirror);
  if (observer) return;
  observer = new MutationObserver((records) => {
    const outside = records.filter((r) => !insideLens(r.target));
    if (!outside.length) return;
    if (stylesChanged(outside)) {
      styles = null;
      for (const m of mirrors) m.restyle();
    }
    const content = outside.filter((r) => document.body.contains(r.target));
    if (content.length) for (const m of mirrors) m.mutated(content);
  });
  const all = { subtree: true, childList: true, attributes: true, characterData: true };
  observer.observe(document.body, all);
  observer.observe(document.head, { subtree: true, childList: true, characterData: true });
  document.addEventListener('scroll', onScroll, { capture: true, passive: true });
  document.addEventListener('input', onInput, true);
  document.addEventListener('change', onInput, true);
  document.addEventListener('load', onLoad, true);
  window.addEventListener('resize', onResize);
}

function unregister(mirror: Mirror) {
  mirrors.delete(mirror);
  if (mirrors.size || !observer) return;
  observer.disconnect();
  observer = undefined;
  styles = null;
  document.removeEventListener('scroll', onScroll, { capture: true });
  document.removeEventListener('input', onInput, true);
  document.removeEventListener('change', onInput, true);
  document.removeEventListener('load', onLoad, true);
  window.removeEventListener('resize', onResize);
}
