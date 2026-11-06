/**
 * Mirror — a live, inert copy of what lies behind a glass surface.
 *
 * Chromium displaces the real backdrop: an SVG filter on a layer that carries a
 * `backdrop-filter` bends what is behind it. WebKit and Gecko apply SVG filters only to an
 * element's own painting, never to its backdrop. So for them the lens paints the page itself —
 * a copy of `<body>`, pixel-aligned under the surface — and runs the same filter over that.
 *
 * Keeping it cheap and correct:
 *   - Two layers. The still one holds what does not move while the page scrolls — the canvas
 *     and fixed backgrounds below the content (the blurred tint mesh). The moving one holds the
 *     content and gets a compositing layer of its own (GlassLens), so scrolling repaints only
 *     the content: re-running a 70px blur over the mesh in software on every frame is what made
 *     the lens slow in Safari.
 *   - Only boxes near the lens are copied in full; far-away boxes become empty stand-ins of the
 *     same size (`content-visibility: hidden` + `contain-intrinsic-size`), so layout matches.
 *     A stand-in that comes near, or whose original changes size, is filled in on its own.
 *   - Wide blurs are left out of the copy. A blur of 24px or more only softens what is soft
 *     already (a tint mesh, a glow), the lens scatters the picture anyway — and WebKit re-runs
 *     such a blur in software over the whole element on every repaint of the copy. It was what
 *     made scrolling under the glass drop to a few frames a second in Safari.
 *   - Scrolling only moves the copy; attribute, text and child-list changes are patched in place.
 *     Only a resize copies the page again. Form values, scroll offsets, sticky offsets and
 *     running CSS animations are carried over.
 *   - The copy lives in shadow roots, so it is invisible to the page's own queries: a toolbar
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
/** On the still layer's stand-ins for the ancestors of a lifted background: no box of their own. */
export const SHELL_ATTR = 'data-bb-mirror-shell';
const NO_BEFORE = 'data-bb-mirror-no-before';
/** On a lifted background that is too far from the lens to show in it. */
const AWAY_ATTR = 'data-bb-mirror-away';
/** How close to the lens a background must come to be drawn (covers the widest blur's spread). */
const REACH = 240;
/** How long after the last scroll moving backgrounds catch up with the page. */
const ANCHOR_SETTLE_MS = 160;
const NO_AFTER = 'data-bb-mirror-no-after';
/** On copies whose ::before / ::after lose a wide blur (see `softened`). */
const SOFT_BEFORE = 'data-bb-mirror-soft-before';
const SOFT_AFTER = 'data-bb-mirror-soft-after';
/** From this radius on a blur is left out of the copy (see the header). */
const WIDE_BLUR_PX = 24;

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
  `[${SHELL_ATTR}]{display:contents!important}` +
  `[${AWAY_ATTR}]{display:none!important}` +
  `[${SHELL_ATTR}]::before,[${SHELL_ATTR}]::after,[${NO_BEFORE}]::before,[${NO_AFTER}]::after` +
  `{display:none!important}` +
  `[${SOFT_BEFORE}]::before,[${SOFT_AFTER}]::after{filter:none!important}` +
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
/** How many 1 s animation ticks the still layer skips (see #freeze). */
const STILL_THAW_TICKS = 10;

type Pair = [Element, HTMLElement];
type Collected = { scrolled: Pair[]; selects: [HTMLSelectElement, HTMLSelectElement][] };
/** A copy whose children were left out (far away or hidden), with the size it was taken at. */
type Hollow = { orig: HTMLElement; width: number; height: number };
/** Everything `sync` reads from the live page, read in one go before anything is written. */
type View = {
  lens: DOMRect;
  width: number;
  height: number;
  body: DOMRect;
  root: DOMRect;
  tall: number;
};

const unset = (value: string) => !value || value === 'none';
const clear = (color: string) => !color || /^(transparent|rgba\(0, 0, 0, 0\))$/.test(color);

/** Sets an inline style only when it changes: an unchanged write still invalidates in WebKit. */
/** A `filter` without its wide blurs, or null when it has none to lose. */
export function softened(filter: string): string | null {
  if (!filter || filter === 'none') return null;
  let wide = false;
  const rest = filter
    .replace(/blur\(\s*([\d.]+)px\s*\)/g, (all, px: string) => {
      if (Number.parseFloat(px) < WIDE_BLUR_PX) return all;
      wide = true;
      return '';
    })
    .replace(/\s+/g, ' ')
    .trim();
  return wide ? rest || 'none' : null;
}

/** Is a box close enough to the lens to show in it (within the widest blur's spread)? */
function reaches(r: DOMRect, lens: DOMRect): boolean {
  return (
    r.right > lens.left - REACH &&
    r.left < lens.right + REACH &&
    r.bottom > lens.top - REACH &&
    r.top < lens.bottom + REACH
  );
}

function put(el: HTMLElement, property: string, value: string): void {
  if (el.style.getPropertyValue(property) !== value) el.style.setProperty(property, value);
}

function shadowHost(): [HTMLSpanElement, ShadowRoot, HTMLDivElement] {
  const host = document.createElement('span');
  host.setAttribute('aria-hidden', 'true');
  host.inert = true;
  host.style.cssText = 'position:absolute;left:0;top:0;pointer-events:none;';
  const shadow = host.attachShadow({ mode: 'open' });
  const stage = document.createElement('div');
  stage.style.cssText = 'position:absolute;left:0;top:0;transform-origin:0 0;';
  // Belt and braces: the host is already inert and aria-hidden; tools that look into shadow
  // roots (test runners, some extensions) meet the same answer on the copy itself.
  stage.setAttribute('aria-hidden', 'true');
  stage.inert = true;
  shadow.append(stage);
  return [host, shadow, stage];
}

export class Mirror {
  /** Holds the moving layer (the content); GlassLens puts it inside the filtered layer. */
  readonly host: HTMLSpanElement;
  /** Holds the still layer (canvas and fixed backgrounds), for a filtered layer below. */
  readonly stillHost: HTMLSpanElement;
  /** The content copy's viewport, inside the moving shadow root. */
  readonly stage: HTMLDivElement;
  /** The still copy's viewport. */
  readonly stillStage: HTMLDivElement;
  readonly #shadows: ShadowRoot[];
  readonly #lens: HTMLElement;
  readonly #surface: Element;
  #clones = new WeakMap<Node, Node>();
  #hollow = new Map<HTMLElement, Hollow>();
  #fixes = new WeakMap<Element, () => void>();
  #sticky: { pair: Pair; x: number; y: number }[] = [];
  /** Backgrounds found while copying, waiting to move to the still layer. */
  #lift: Pair[] = [];
  /** Backgrounds in the still layer, placed where their originals are. */
  #anchored: { pair: Pair; rect: DOMRect; place: () => void }[] = [];
  /** Still-layer stand-ins for the ancestors of lifted backgrounds (and the body). */
  #shells = new WeakMap<Element, HTMLElement>();
  /** Copies standing in for animated originals, with the properties the animation moves. */
  #frozen = new Map<HTMLElement, { pair: Pair; props: string[] }>();
  #thaw: ReturnType<typeof setInterval> | undefined;
  #body: HTMLElement | null = null;
  #view: View | null = null;
  #roi = { left: 0, top: 0, right: 0, bottom: 0 };
  #margin = 600;
  #scrolled = 0;
  #scrolledAt = 0;
  #frame = 0;
  #timer: ReturnType<typeof setTimeout> | undefined;
  #refreshTimer: ReturnType<typeof setTimeout> | undefined;
  #anchorTimer: ReturnType<typeof setTimeout> | undefined;
  #last = 0;

  constructor(lens: HTMLElement, surface: Element) {
    this.#lens = lens;
    this.#surface = surface;
    let still: ShadowRoot;
    let moving: ShadowRoot;
    [this.host, moving, this.stage] = shadowHost();
    [this.stillHost, still, this.stillStage] = shadowHost();
    this.#shadows = [still, moving];
    this.restyle();
    register(this);
    this.build();
  }

  destroy(): void {
    unregister(this);
    cancelAnimationFrame(this.#frame);
    clearTimeout(this.#timer);
    clearTimeout(this.#refreshTimer);
    clearTimeout(this.#anchorTimer);
    clearInterval(this.#thaw);
    this.host.remove();
    this.stillHost.remove();
    this.#body = null;
  }

  /** Gives the shadow roots the page's current styles. */
  restyle(): void {
    const styles = pageStyles();
    for (const shadow of this.#shadows) {
      if (styles.sheets) shadow.adoptedStyleSheets = styles.sheets;
      for (const el of [...shadow.children]) if (el.tagName !== 'DIV') el.remove();
      shadow.prepend(...styles.nodes.map((n) => n.cloneNode(true)));
    }
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

  /** Fills in stand-ins that came near or changed size (throttled). */
  refresh(): void {
    if (this.#refreshTimer || this.#timer) return;
    this.#refreshTimer = setTimeout(() => {
      this.#refreshTimer = undefined;
      this.#refresh();
    }, MIN_REBUILD_MS);
  }

  build(): void {
    clearTimeout(this.#timer);
    this.#timer = undefined;
    clearTimeout(this.#refreshTimer);
    this.#refreshTimer = undefined;
    this.#last = performance.now();
    this.#scrolled = 0;
    this.#clones = new WeakMap();
    this.#hollow = new Map();
    this.#fixes = new WeakMap();
    this.#shells = new WeakMap();
    this.#sticky = [];
    this.#lift = [];
    this.#anchored = [];
    this.#frozen = new Map();
    this.#measure();
    this.#aim();

    // Everything is read from the live page before anything is written: one layout, not many.
    const collected: Collected = { scrolled: [], selects: [] };
    const body = this.#copy(document.body, collected) as HTMLElement | null;
    if (!body) return;
    this.#body = body;
    const canvas = this.#canvas();
    const fixBody = () => {
      const r = this.#view!.body;
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

    // The body's fixed pseudo-elements (more tint blobs) belong to the still layer, everything
    // else of it to the moving one. Its stand-in there paints nothing of its own.
    const still = document.body.cloneNode(false) as HTMLElement;
    this.#shells.set(document.body, still);
    this.#fix(still, (el) => {
      el.style.cssText =
        'position:absolute!important;left:0;top:0;width:0!important;height:0!important;' +
        'min-height:0!important;margin:0!important;padding:0!important;border:0!important;' +
        'background:transparent!important;box-shadow:none!important;overflow:visible!important';
    });
    for (const [pseudo, attr, soft] of [
      ['::before', NO_BEFORE, SOFT_BEFORE],
      ['::after', NO_AFTER, SOFT_AFTER],
    ] as const) {
      const cs = getComputedStyle(document.body, pseudo);
      const fixed = cs.position === 'fixed' && !/^(none|normal)$/.test(cs.content);
      (fixed ? body : still).setAttribute(attr, '');
      // The body's blurred tint blobs: a wide blur, left out like any other (see the header).
      if (softened(cs.filter)) for (const el of [body, still]) el.setAttribute(soft, '');
    }

    this.stage.replaceChildren(body);
    this.stillStage.replaceChildren(canvas.el, still);
    this.#settle(collected);
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
    const view = this.#measure();
    const wants = this.#sticky.map((entry) => entry.pair[0].getBoundingClientRect());
    const anchors = this.#anchored.map((entry) => entry.pair[0].getBoundingClientRect());
    // The stages sit at the lens and are shifted back, so their origin is the viewport's: the
    // copy is laid out in viewport coordinates, and `position: fixed` inside it lands where it
    // should (a transform makes the stage their containing block).
    for (const stage of [this.stage, this.stillStage]) {
      put(stage, 'width', `${view.width}px`);
      put(stage, 'height', `${view.height}px`);
      put(stage, 'transform', `translate(${-view.lens.left}px, ${-view.lens.top}px)`);
    }
    this.#fixes.get(this.#body)?.();
    // Backgrounds usually stay put; one that moved (a scrolled container) is moved along.
    const scrolling = performance.now() - this.#scrolledAt < ANCHOR_SETTLE_MS;
    let settle = false;
    // A canvas with an image scrolls with the page. Moving it repaints the whole still layer
    // (the tint mesh with it), so like the backgrounds below it catches up once the scroll
    // settles; it is a soft, page-wide picture, a short lag under the glass does not show.
    if (this.#placeCanvas) {
      if (scrolling) settle = true;
      else this.#placeCanvas();
    }
    this.#anchored.forEach((entry, i) => {
      const r = anchors[i]!;
      // A background nowhere near the lens is left out: WebKit runs an element's whole filter
      // (a blurred mesh is huge) even when only a sliver of it, or nothing, shows in the lens.
      const near = reaches(r, view.lens);
      const copy = entry.pair[1];
      if (near !== !copy.hasAttribute(AWAY_ATTR)) {
        if (near) copy.removeAttribute(AWAY_ATTR);
        else copy.setAttribute(AWAY_ATTR, '');
      }
      const was = entry.rect;
      if (!near || (r.left === was.left && r.top === was.top && r.width === was.width)) return;
      // A background that scrolls with the page (a contained backdrop) would re-run its blur on
      // every frame. It is smooth enough that a short lag under the glass is invisible, so it
      // catches up once the scroll settles.
      if (scrolling) {
        settle = true;
        return;
      }
      entry.rect = r;
      entry.place();
    });
    if (settle && !this.#anchorTimer) {
      this.#anchorTimer = setTimeout(() => {
        this.#anchorTimer = undefined;
        this.sync();
      }, ANCHOR_SETTLE_MS);
    }
    if (!this.#sticky.length) return;

    // Sticky copies do not stick (there is nothing to scroll): move them where the originals
    // are. All copies are measured at once — one layout of the copy, not one per element.
    const haves = this.#sticky.map((entry) => entry.pair[1].getBoundingClientRect());
    this.#sticky.forEach((entry, i) => {
      entry.x += wants[i]!.left - haves[i]!.left;
      entry.y += wants[i]!.top - haves[i]!.top;
      put(entry.pair[1], 'translate', `${entry.x}px ${entry.y}px`);
    });
  }

  /** A scroll somewhere in the page. */
  scrolled(target: EventTarget | null, distance: number): void {
    const copy = target instanceof Element ? this.#clones.get(target) : undefined;
    if (copy instanceof Element && target instanceof Element) {
      copy.scrollTop = target.scrollTop;
      copy.scrollLeft = target.scrollLeft;
    }
    this.#scrolled += distance;
    this.#scrolledAt = performance.now();
    // New content is about to come into view that was only copied as a stand-in.
    if (this.#scrolled > this.#margin / 2) {
      this.#scrolled = 0;
      this.refresh();
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
    let refresh = false;
    const collected: Collected = { scrolled: [], selects: [] };
    for (const record of records) {
      const target = record.target;
      const copy = this.#clones.get(target);
      if (!copy) {
        // Not copied: inside a stand-in (whose size may have changed), or left out on purpose.
        if (this.#withinHollow(target)) refresh = true;
        continue;
      }
      const hollow = this.#hollow.has(copy as HTMLElement);
      if (record.type === 'childList') {
        if (!hollow) this.#patchChildren(record, copy as Element, collected);
        refresh = true;
      } else if (record.type === 'characterData') {
        (copy as CharacterData).data = (target as CharacterData).data;
      } else if (record.attributeName) {
        const name = record.attributeName;
        if (
          name === 'autofocus' ||
          (MEDIA_TAGS.has(copy.nodeName) && MEDIA_STRIPPED.includes(name))
        )
          continue;
        const value = (target as Element).getAttribute(name);
        for (const el of [copy as Element, this.#shells.get(target as Element)]) {
          if (!el) continue;
          if (value === null) el.removeAttribute(name);
          else el.setAttribute(name, value);
          this.#fixes.get(el)?.();
        }
        // A class or style change may resize boxes that are only stand-ins here.
        refresh = true;
      }
    }
    if (collected.scrolled.length || collected.selects.length || this.#lift.length) {
      this.#settle(collected);
    }
    if (refresh) this.refresh();
    this.schedule();
  }

  /** Mirrors a child-list change: copies of removed nodes go, added nodes are copied in place. */
  #patchChildren(record: MutationRecord, parent: Element, collected: Collected): void {
    for (const node of record.removedNodes) (this.#clones.get(node) as ChildNode)?.remove();
    for (const node of record.addedNodes) {
      // Moved on or gone again by now; a later record (or none) has it.
      if (node.parentNode !== record.target) continue;
      (this.#clones.get(node) as ChildNode | undefined)?.remove();
      let sub: Node | null = null;
      if (node.nodeType === Node.TEXT_NODE) {
        sub = node.cloneNode(false);
        this.#clones.set(node, sub);
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        sub = this.#copy(node as Element, collected);
      }
      if (!sub) continue;
      let next = node.nextSibling;
      let before: Node | null = null;
      while (next && !before) {
        const c = this.#clones.get(next);
        if (c?.parentNode === parent) before = c;
        next = next.nextSibling;
      }
      parent.insertBefore(sub, before);
    }
  }

  /** Is this uncopied node inside a stand-in (rather than left out on purpose)? */
  #withinHollow(node: Node): boolean {
    for (let n = node.parentNode; n; n = n.parentNode) {
      const copy = this.#clones.get(n);
      if (copy) return this.#hollow.has(copy as HTMLElement);
    }
    return false;
  }

  #refresh(): void {
    if (!this.#body) return;
    this.#measure();
    this.#aim();
    // Reads first: which stand-ins are due.
    const due: [HTMLElement, HTMLElement][] = [];
    for (const [copy, hollow] of this.#hollow) {
      const { orig } = hollow;
      if (!this.#holds(copy) || !orig.isConnected) {
        this.#hollow.delete(copy);
        continue;
      }
      const changed = orig.offsetWidth !== hollow.width || orig.offsetHeight !== hollow.height;
      if (changed || this.#near(orig.getBoundingClientRect())) due.push([copy, orig]);
    }
    // Then copies, built detached, then swapped in — no layout in between.
    const collected: Collected = { scrolled: [], selects: [] };
    const fresh = due.map(([copy, orig]) => {
      this.#hollow.delete(copy);
      return [copy, this.#copy(orig, collected)] as const;
    });
    for (const [copy, sub] of fresh) {
      if (sub) copy.replaceWith(sub);
      else copy.remove();
    }
    this.#settle(collected);
  }

  /** After copying: values that need the copy in the document, the still layer, animations. */
  #settle({ scrolled, selects }: Collected): void {
    for (const [orig, copy] of selects) copy.selectedIndex = orig.selectedIndex;
    for (const [orig, copy] of scrolled) {
      copy.scrollTop = orig.scrollTop;
      copy.scrollLeft = orig.scrollLeft;
    }
    for (const pair of this.#lift.splice(0)) this.#raise(pair);
    this.#sticky = this.#sticky.filter((entry) => this.#holds(entry.pair[1]));
    this.#anchored = this.#anchored.filter((entry) => this.#holds(entry.pair[1]));
    this.#freeze();
    this.sync();
  }

  /** Is this copy still part of either layer? (The hosts may not be in the document yet.) */
  #holds(copy: Node): boolean {
    return this.stage.contains(copy) || this.stillStage.contains(copy);
  }

  /** Measures what `sync` and the copy's placement need, all at once. */
  #measure(): View {
    const root = document.documentElement;
    this.#view = {
      lens: this.#lens.getBoundingClientRect(),
      width: root.clientWidth || window.innerWidth,
      height: root.clientHeight || window.innerHeight,
      body: document.body.getBoundingClientRect(),
      root: root.getBoundingClientRect(),
      tall: root.scrollHeight,
    };
    return this.#view;
  }

  /** The region copied in full: the lens plus a screen's height around it. */
  #aim(): void {
    const lens = this.#view!.lens;
    this.#margin = Math.max(window.innerHeight || 0, 600);
    const m = this.#margin;
    this.#roi = {
      left: lens.left - m,
      top: lens.top - m,
      right: lens.right + m,
      bottom: lens.bottom + m,
    };
  }

  #near(r: { left: number; top: number; right: number; bottom: number }): boolean {
    const roi = this.#roi;
    return !(r.bottom < roi.top || r.top > roi.bottom || r.right < roi.left || r.left > roi.right);
  }

  #copy(orig: Element, collected: Collected): Element | null {
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
    if (orig instanceof HTMLSelectElement)
      collected.selects.push([orig, copy as HTMLSelectElement]);

    if (html) {
      const far = !this.#near(orig.getBoundingClientRect());
      if (far && orig.firstChild) {
        const cs = computed();
        if (cs.display === 'none') return this.#hollowed(orig, copy as HTMLElement);
        if (!UNCULLABLE.test(cs.display)) return this.#stub(orig, copy as HTMLElement, cs);
      }
      const cs = computed();
      this.#layerless(orig, copy as HTMLElement, cs);
      const soft = softened(cs.filter);
      if (soft) {
        this.#fix(copy as HTMLElement, (el) => {
          el.style.setProperty('filter', soft, 'important');
          el.style.setProperty('-webkit-filter', soft, 'important');
        });
      }
      if (cs.position === 'sticky') {
        copy.setAttribute(STICKY_ATTR, '');
        const entry = { pair: [orig, copy as HTMLElement] as Pair, x: 0, y: 0 };
        this.#sticky.push(entry);
        this.#fix(copy as HTMLElement, (el) => {
          el.style.translate = `${entry.x}px ${entry.y}px`;
        });
      } else if (
        (cs.position === 'fixed' || cs.position === 'absolute') &&
        Number.parseInt(cs.zIndex, 10) < 0 &&
        unset(cs.transform) &&
        this.#liftable(orig)
      ) {
        // A background below the content: it rarely moves, and it is often blurred.
        this.#lift.push([orig, copy as HTMLElement]);
      }
      if (orig.scrollTop || orig.scrollLeft) collected.scrolled.push([orig, copy as HTMLElement]);
    }

    for (const child of orig.childNodes) {
      if (child.nodeType === Node.TEXT_NODE) {
        const text = child.cloneNode(false);
        this.#clones.set(child, text);
        copy.appendChild(text);
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        const sub = this.#copy(child as Element, collected);
        if (sub) copy.appendChild(sub);
      }
    }
    return copy;
  }

  /**
   * Can a background leave the content layer for the still one, below everything? Not when an
   * ancestor paints a background of its own (the background sits on top of that), or clips it
   * (the stand-ins for the ancestors have no boxes, so nothing would clip it there).
   */
  #liftable(orig: HTMLElement): boolean {
    if (!orig.parentElement || orig.parentElement === document.documentElement) return false;
    const r = orig.getBoundingClientRect();
    for (
      let a: HTMLElement | null = orig.parentElement;
      a && a !== document.body;
      a = a.parentElement
    ) {
      const cs = getComputedStyle(a);
      if (!unset(cs.backgroundImage) || !clear(cs.backgroundColor)) return false;
      if (cs.overflow !== 'visible') {
        const c = a.getBoundingClientRect();
        if (r.left < c.left || r.top < c.top || r.right > c.right || r.bottom > c.bottom) {
          return false;
        }
      }
    }
    return true;
  }

  /**
   * Moves a background's copy to the still layer, under stand-ins for its ancestors
   * (`display: contents`, so selectors and inherited values still reach it), placed exactly
   * where the original is — its containing block is not there any more.
   */
  #raise([orig, copy]: Pair): void {
    // Dropped again before it got here.
    if (this.#clones.get(orig) !== copy || !this.#holds(copy)) return;
    const chain: Element[] = [];
    for (let a = orig.parentElement; a && a !== document.body; a = a.parentElement)
      chain.unshift(a);
    let parent = this.#shells.get(document.body);
    if (!parent) return;
    for (const ancestor of chain) {
      let shell = this.#shells.get(ancestor);
      if (!shell || !this.stillStage.contains(shell)) {
        shell = ancestor.cloneNode(false) as HTMLElement;
        shell.setAttribute(SHELL_ATTR, '');
        this.#shells.set(ancestor, shell);
        parent.append(shell);
      }
      parent = shell;
    }
    parent.append(copy);
    const entry = {
      pair: [orig, copy] as Pair,
      rect: orig.getBoundingClientRect(),
      place: () => {},
    };
    entry.place = () => {
      const { left, top, width, height } = entry.rect;
      for (const [p, v] of [
        ['position', 'absolute'],
        ['inset', 'auto'],
        ['margin', '0'],
        ['left', `${left}px`],
        ['top', `${top}px`],
        ['width', `${width}px`],
        ['height', `${height}px`],
      ]) {
        copy.style.setProperty(p!, v!, 'important');
      }
    };
    this.#fix(copy, entry.place);
    this.#anchored.push(entry);
  }

  /**
   * The canvas: the root's background (or the body's, which propagates to it), under everything
   * else — including the body's negative-z children — and sized like the root box it fills.
   * A plain colour just fills the still layer; an image has to scroll with the page.
   */
  #canvas(): { el: HTMLDivElement; fromBody: boolean } {
    const el = document.createElement('div');
    const root = document.documentElement;
    const rootStyle = getComputedStyle(root);
    const fromBody = unset(rootStyle.backgroundImage) && clear(rootStyle.backgroundColor);
    const source = fromBody ? getComputedStyle(document.body) : rootStyle;
    for (const p of BACKGROUND) el.style.setProperty(p, source.getPropertyValue(p));
    const fixed = source.getPropertyValue('background-attachment').includes('fixed');
    el.style.position = 'absolute';
    el.style.zIndex = '-2147483647';
    if (fixed || unset(source.getPropertyValue('background-image'))) {
      el.style.inset = '0';
      this.#placeCanvas = undefined;
    } else {
      this.#placeCanvas = () => {
        const { root: r, width: vw, height: vh, tall } = this.#view!;
        put(el, 'left', `${r.left}px`);
        put(el, 'top', `${r.top}px`);
        put(el, 'width', `${Math.max(r.width, vw)}px`);
        put(el, 'height', `${Math.max(r.height, tall, vh)}px`);
      };
      this.#placeCanvas();
    }
    return { el, fromBody };
  }

  #placeCanvas: (() => void) | undefined;

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

  /** A copy left without its children; filled in once it comes near or changes size. */
  #hollowed(orig: HTMLElement, copy: HTMLElement): HTMLElement {
    this.#hollow.set(copy, { orig, width: orig.offsetWidth, height: orig.offsetHeight });
    return copy;
  }

  /** An empty box of the original's size, standing in for content far from the lens. */
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
    this.#layerless(orig, copy, cs);
    this.#fix(copy, (el) => {
      el.style.setProperty('content-visibility', 'hidden');
      el.style.setProperty(
        'contain-intrinsic-size',
        `${Math.max(0, width)}px ${Math.max(0, height)}px`,
      );
    });
    return this.#hollowed(orig, copy);
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
   * animations are re-read about once a second (the drifting backdrop less often).
   */
  #freeze(): void {
    clearInterval(this.#thaw);
    this.#thaw = undefined;
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
      const known = this.#frozen.get(copy);
      if (known) {
        const more = [...props].filter((p) => !known.props.includes(p));
        if (more.length) {
          known.props.push(...more);
          this.#snapshot(known);
        }
      } else {
        const entry = { pair: [target, copy] as Pair, props: [...props] };
        this.#frozen.set(copy, entry);
        this.#fix(copy, () => this.#snapshot(entry));
      }
      if (effect.getTiming?.().iterations === Infinity && animation.playState === 'running') {
        endless = true;
      }
    }
    if (endless) {
      let tick = 0;
      this.#thaw = setInterval(() => {
        // Nobody sees a hidden tab; every snapshot repaints the copy.
        if (document.hidden) return;
        // The still layer's backgrounds drift slowly and repaint expensively (blurred, in
        // software): every 10 s is enough there, and never in the middle of a scroll.
        const still = ++tick >= STILL_THAW_TICKS && performance.now() - this.#scrolledAt > 300;
        if (still) tick = 0;
        const lens = this.#lens.getBoundingClientRect();
        for (const [copy, entry] of this.#frozen) {
          if (!this.#holds(copy)) {
            this.#frozen.delete(copy);
            continue;
          }
          const inStill = this.stillStage.contains(copy);
          if (inStill ? !still : !reaches(entry.pair[0].getBoundingClientRect(), lens)) continue;
          // Only what can show in the lens is worth the repaint; the rest catches up later.
          this.#snapshot(entry);
        }
      }, 1000);
    }
  }

  #snapshot({ pair: [orig, copy], props }: { pair: Pair; props: string[] }): void {
    const cs = getComputedStyle(orig);
    for (const p of props) {
      const value = cs.getPropertyValue(p);
      if (copy.style.getPropertyValue(p) !== value || !copy.style.getPropertyPriority(p)) {
        copy.style.setProperty(p, value, 'important');
      }
    }
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
  // An image arriving can resize boxes without a mutation.
  if (event.target instanceof HTMLImageElement) for (const mirror of mirrors) mirror.refresh();
}

function insideLens(node: Node): boolean {
  const el = node instanceof Element ? node : node.parentElement;
  return !!el?.closest(`[${LENS_ATTR}]`);
}

function register(mirror: Mirror) {
  mirrors.add(mirror);
  if (observer) return;
  observer = new MutationObserver((records) => {
    if (records.some((r) => r.target === document.documentElement)) {
      // A theme or tint switched on the root: the canvas took its colours from it.
      for (const m of mirrors) m.rebuild();
    }
    const outside = records.filter((r) => !insideLens(r.target));
    if (!outside.length) return;
    if (stylesChanged(outside)) {
      styles = null;
      for (const m of mirrors) {
        m.restyle();
        m.refresh();
      }
    }
    const content = outside.filter((r) => document.body.contains(r.target));
    if (content.length) for (const m of mirrors) m.mutated(content);
  });
  const all = { subtree: true, childList: true, attributes: true, characterData: true };
  observer.observe(document.body, all);
  observer.observe(document.head, { subtree: true, childList: true, characterData: true });
  observer.observe(document.documentElement, { attributes: true });
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
