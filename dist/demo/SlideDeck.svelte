<script lang="ts">
  /**
   * Example page: a slide deck editor (Storybook only, mock data). Every control sits where its
   * effect happens: the tools for an object float on the object, a new slide is added in the gap
   * where it will appear, the layout picker opens from the slide's own thumbnail and the speaker
   * notes sit under their slide. Only deck-wide things (title, undo, look, share, present) live
   * in the top bar. Motion explains cause and effect: objects grow where they are placed,
   * thumbnails glide to their new place, guides appear while dragging and "Present" grows the
   * slide from where it sits into full screen and shrinks it back on exit.
   */
  import { tick } from 'svelte';
  import { flip } from 'svelte/animate';
  import { cubicOut } from 'svelte/easing';
  import { SvelteSet } from 'svelte/reactivity';
  import AppIcon from '../patterns/atoms/AppIcon.svelte';
  import Button from '../patterns/atoms/Button.svelte';
  import Icon from '../patterns/atoms/Icon.svelte';
  import IconButton from '../patterns/atoms/IconButton.svelte';
  import type { IconName } from '../patterns/atoms/icons';
  import Kbd from '../patterns/atoms/Kbd.svelte';
  import Tooltip from '../patterns/atoms/Tooltip.svelte';
  import Layer from '../patterns/layout/Layer.svelte';
  import CopyButton from '../patterns/molecules/CopyButton.svelte';
  import EmptyState from '../patterns/molecules/EmptyState.svelte';
  import Popover from '../patterns/molecules/Popover.svelte';
  import HorizontalBarChart from '../patterns/organisms/HorizontalBarChart.svelte';
  import LineChart from '../patterns/organisms/LineChart.svelte';
  import Page from '../patterns/templates/Page.svelte';
  import { celebrate } from '../utils/delight';
  import DesignNotes, { type DesignNote } from './DesignNotes.svelte';
  import {
    SLIDE_H,
    SLIDE_W,
    deck,
    deckThemes,
    layoutObjects,
    layouts,
    slideFills,
    uid,
    type DeckTheme,
    type LayoutId,
    type ObjectKind,
    type Slide,
    type SlideFill,
    type SlideObject,
  } from './mock-slides';

  // ── State ─────────────────────────────────────────────────────────────────────────────────
  const initial = deck();
  let slides = $state<Slide[]>(initial);
  let deckTitle = $state('Q3 team update');
  let theme = $state<DeckTheme>('paper');
  let currentId = $state(initial[0]?.id ?? '');
  // The title of the first slide starts selected, so its tools are on show from the start.
  let selectedId = $state<string | null>(initial[0]?.objects[3]?.id ?? null);
  let editingId = $state<string | null>(null);
  let tool = $state<ObjectKind | null>(null);
  let ghost = $state<{ x: number; y: number } | null>(null);
  let guides = $state<{ x: number[]; y: number[] }>({ x: [], y: [] });
  let gesture = $state<'move' | 'resize' | null>(null);
  let colorsOpen = $state(false);
  let enterDir = $state(0);
  const fresh = new SvelteSet<string>();

  let vw = $state(1280);
  let vh = $state(800);
  let stageW = $state(0);
  let stageH = $state(0);
  let notesH = $state(0);
  let toolsH = $state(0);
  let barW = $state(0);
  let barH = $state(0);
  let frameEl = $state<HTMLElement>();
  let listEl = $state<HTMLElement>();

  const narrow = $derived(vw < 900);
  const thumbW = $derived(narrow ? 120 : 176);
  // Room the slide leaves above itself (for an object's tools) and below (the insert bar).
  const ROOM_TOP = 44;
  const ROOM_BOTTOM = 8;
  const k = $derived.by(() => {
    if (!stageW) return 0;
    const byWidth = (stageW - (narrow ? 0 : 32)) / SLIDE_W;
    if (narrow) return byWidth;
    return Math.max(
      0.2,
      Math.min(byWidth, (stageH - notesH - ROOM_TOP - ROOM_BOTTOM) / SLIDE_H, 1.3),
    );
  });
  const frameW = $derived(SLIDE_W * k);
  const frameH = $derived(SLIDE_H * k);

  const index = $derived(
    Math.max(
      0,
      slides.findIndex((s) => s.id === currentId),
    ),
  );
  const current = $derived<Slide | undefined>(slides[index]);
  const selected = $derived(current?.objects.find((o) => o.id === selectedId));
  const paperTheme = $derived(theme === 'night' ? 'dark' : 'light');

  // ── Motion: durations come from the --motion-* tokens; reduced motion turns them off ──────
  const reduced =
    typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
  function motion(token: '--motion-quick' | '--motion-base' | '--motion-slow'): number {
    if (reduced || typeof document === 'undefined') return 0;
    const raw = getComputedStyle(document.documentElement).getPropertyValue(token).trim();
    const n = parseFloat(raw);
    return Number.isFinite(n) ? (raw.endsWith('ms') ? n : n * 1000) : 0;
  }

  /** A new thumbnail grows open in its gap, so the eye sees where it landed. */
  function grow(node: HTMLElement, { axis }: { axis: 'x' | 'y' }) {
    const size = axis === 'y' ? node.offsetHeight : node.offsetWidth;
    const prop = axis === 'y' ? 'height' : 'width';
    return {
      duration: motion('--motion-slow'),
      easing: cubicOut,
      css: (t: number) =>
        `${prop}: ${t * size}px; opacity: ${t}; transform: scale(${0.7 + 0.3 * t}); overflow: clip;`,
    };
  }

  // ── History (undo / redo) and the saved state ─────────────────────────────────────────────
  type Snap = string;
  let past = $state<Snap[]>([]);
  let future = $state<Snap[]>([]);
  let saving = $state(false);
  let saveTimer: ReturnType<typeof setTimeout> | undefined;
  let removed = $state<{ index: number } | null>(null);
  let removedTimer: ReturnType<typeof setTimeout> | undefined;

  const snap = (): Snap =>
    JSON.stringify({
      slides: $state.snapshot(slides),
      title: deckTitle,
      theme,
      current: currentId,
    });

  function touched() {
    saving = true;
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => (saving = false), 900);
  }

  function record(before: Snap) {
    if (before === snap()) return;
    past = [...past.slice(-99), before];
    future = [];
    removed = null;
    touched();
  }

  function change(fn: () => void) {
    const before = snap();
    fn();
    record(before);
  }

  function restore(s: Snap) {
    const data = JSON.parse(s) as {
      slides: Slide[];
      title: string;
      theme: DeckTheme;
      current: string;
    };
    // Undo jumps to the slide the change was made on: you see what came back.
    if (data.current !== currentId) enterDir = 0;
    slides = data.slides;
    deckTitle = data.title;
    theme = data.theme;
    currentId = data.current;
    editingId = null;
    if (!slides.some((sl) => sl.objects.some((o) => o.id === selectedId))) selectedId = null;
    touched();
  }

  function undo() {
    const s = past.at(-1);
    if (!s) return;
    future = [...future, snap()];
    past = past.slice(0, -1);
    removed = null;
    restore(s);
  }

  function redo() {
    const s = future.at(-1);
    if (!s) return;
    past = [...past, snap()];
    future = future.slice(0, -1);
    restore(s);
  }

  // ── Slides ────────────────────────────────────────────────────────────────────────────────
  const clampIndex = (i: number) => Math.max(0, Math.min(slides.length - 1, i));
  /** The slide's heading: the topmost large text, else the largest text. */
  const headingOf = (s: Slide) => {
    const texts = s.objects.filter((o) => o.kind === 'text' && o.text);
    const large = texts.filter((o) => (o.size ?? 0) >= 32).sort((a, b) => a.y - b.y)[0];
    return large ?? [...texts].sort((a, b) => (b.size ?? 0) - (a.size ?? 0))[0];
  };
  const slideName = (s: Slide) => headingOf(s)?.text?.split('\n')[0] ?? 'Blank slide';

  function go(i: number, focusThumb = false) {
    const s = slides[clampIndex(i)];
    if (!s) return;
    if (s.id !== currentId) {
      enterDir = i > index ? 1 : -1;
      currentId = s.id;
      selectedId = null;
      editingId = null;
      colorsOpen = false;
    }
    if (focusThumb) tick().then(() => thumbButton(s.id)?.focus());
  }

  const thumbButton = (id: string) =>
    listEl?.querySelector<HTMLElement>(`[data-slide="${id}"] .thumb`) ?? null;

  function insertAt(i: number, layout: LayoutId = 'title-text') {
    const s: Slide = { id: uid('s'), layout, notes: '', objects: layoutObjects(layout) };
    change(() => {
      slides.splice(i, 0, s);
      enterDir = i > index ? 1 : -1;
      currentId = s.id;
      selectedId = null;
      editingId = null;
    });
    s.objects.forEach((o) => fresh.add(o.id));
  }

  function duplicateSlide(id: string) {
    const i = slides.findIndex((s) => s.id === id);
    const src = slides[i];
    if (!src) return;
    const copy: Slide = {
      ...$state.snapshot(src),
      id: uid('s'),
      objects: $state.snapshot(src.objects).map((o) => ({ ...o, id: uid() })),
    };
    change(() => {
      slides.splice(i + 1, 0, copy);
      enterDir = 1;
      currentId = copy.id;
      selectedId = null;
    });
  }

  function removeSlide(id: string) {
    const i = slides.findIndex((s) => s.id === id);
    if (i < 0) return;
    change(() => {
      slides.splice(i, 1);
      if (currentId === id) currentId = slides[Math.min(i, slides.length - 1)]?.id ?? '';
      selectedId = null;
      editingId = null;
    });
    // The undo offer appears in the gap the slide left behind — right where you looked.
    removed = { index: i };
    clearTimeout(removedTimer);
    removedTimer = setTimeout(() => (removed = null), 6000);
    tick().then(() => {
      const next = slides[Math.min(i, slides.length - 1)];
      if (next) thumbButton(next.id)?.focus();
    });
  }

  function moveSlide(from: number, to: number) {
    if (to < 0 || to >= slides.length || from === to) return;
    change(() => {
      const [s] = slides.splice(from, 1);
      if (s) slides.splice(to, 0, s);
    });
  }

  function applyLayout(id: string, layout: LayoutId) {
    const s = slides.find((sl) => sl.id === id);
    if (!s) return;
    const head = headingOf(s)?.text;
    const objects = layoutObjects(layout, layout === 'big-number' ? undefined : head);
    change(() => {
      s.layout = layout;
      s.objects = objects;
      if (currentId !== id) {
        enterDir = slides.indexOf(s) > index ? 1 : -1;
        currentId = id;
      }
      selectedId = null;
    });
    objects.forEach((o) => fresh.add(o.id));
  }

  // ── Objects ───────────────────────────────────────────────────────────────────────────────
  const FILL_NAMES: Record<SlideFill, string> = {
    ink: 'Ink',
    accent: 'Tint',
    soft: 'Soft tint',
    blue: 'Blue',
    pink: 'Pink',
    orange: 'Orange',
    green: 'Green',
    purple: 'Purple',
  };

  /** Slide content colours: the system palette, resolved inside the slide's own theme. */
  function fillOf(fill: SlideFill, text = false): string {
    if (fill === 'ink') return 'var(--text)';
    if (fill === 'accent') return text ? 'var(--accent-ink)' : 'var(--accent)';
    if (fill === 'soft') return 'var(--accent-soft)';
    return `var(--color-${fill})`;
  }

  const ALIGNS = [
    ['left', 'align-left'],
    ['center', 'align-center'],
    ['right', 'align-right'],
  ] as const;

  const lineHeight = (size = 22) => (size >= 36 ? 1.12 : 1.42);

  const TOOLS: { kind: ObjectKind; label: string; icon: IconName; noun: string }[] = [
    { kind: 'text', label: 'Text', icon: 'type', noun: 'the text' },
    { kind: 'rect', label: 'Box', icon: 'square', noun: 'the box' },
    { kind: 'ellipse', label: 'Circle', icon: 'circle', noun: 'the circle' },
    { kind: 'image', label: 'Picture', icon: 'image', noun: 'the picture' },
    { kind: 'chart', label: 'Chart', icon: 'chart', noun: 'the chart' },
  ];

  const DEFAULTS: Record<ObjectKind, Omit<SlideObject, 'id' | 'x' | 'y'>> = {
    text: { kind: 'text', w: 360, h: 44, fill: 'ink', text: 'Your words here', size: 28 },
    rect: { kind: 'rect', w: 240, h: 150, fill: 'accent', radius: 18 },
    ellipse: { kind: 'ellipse', w: 160, h: 160, fill: 'pink' },
    image: { kind: 'image', w: 320, h: 210, fill: 'green', caption: 'Your picture' },
    chart: {
      kind: 'chart',
      chart: 'bar',
      w: 400,
      h: 230,
      fill: 'accent',
      caption: 'Your numbers',
      data: [
        { label: 'North', value: 32 },
        { label: 'South', value: 24 },
        { label: 'East', value: 18 },
        { label: 'West', value: 12 },
      ],
    },
  };

  function describe(o: SlideObject): string {
    if (o.kind === 'text') return `Text: ${o.text?.slice(0, 48) || 'empty'}`;
    if (o.kind === 'rect') return `Box, ${FILL_NAMES[o.fill]}`;
    if (o.kind === 'ellipse') return `Circle, ${FILL_NAMES[o.fill]}`;
    if (o.kind === 'image') return `Picture: ${o.caption ?? 'placeholder'}`;
    return `Chart: ${o.caption ?? 'numbers'}`;
  }

  const objectEl = (id: string) =>
    frameEl?.querySelector<HTMLElement>(`[data-obj="${id}"]`) ?? null;

  function select(id: string | null, focus = false) {
    if (id !== selectedId) colorsOpen = false;
    selectedId = id;
    if (id && focus) tick().then(() => objectEl(id)?.focus({ preventScroll: true }));
  }

  function addObject(kind: ObjectKind, at?: { x: number; y: number }) {
    const s = current;
    if (!s) return;
    const d = DEFAULTS[kind];
    const cx = at?.x ?? SLIDE_W / 2;
    const cy = at?.y ?? SLIDE_H / 2;
    const o: SlideObject = {
      ...structuredClone(d),
      id: uid(),
      x: Math.round(Math.max(0, Math.min(SLIDE_W - d.w, cx - d.w / 2))),
      y: Math.round(Math.max(0, Math.min(SLIDE_H - d.h, cy - d.h / 2))),
    };
    change(() => s.objects.push(o));
    fresh.add(o.id);
    tool = null;
    ghost = null;
    if (kind === 'text') startEdit(o.id);
    else select(o.id, true);
  }

  function patch(fn: (o: SlideObject) => void) {
    const o = selected;
    if (o) change(() => fn(o));
  }

  function removeObject(id: string) {
    const s = current;
    if (!s) return;
    change(() => {
      s.objects = s.objects.filter((o) => o.id !== id);
    });
    selectedId = null;
    editingId = null;
    frameEl?.querySelector<HTMLElement>('.sheet')?.focus({ preventScroll: true });
  }

  function duplicateObject(id: string) {
    const s = current;
    const o = s?.objects.find((x) => x.id === id);
    if (!s || !o) return;
    const copy: SlideObject = { ...$state.snapshot(o), id: uid(), x: o.x + 24, y: o.y + 24 };
    change(() => s.objects.push(copy));
    fresh.add(copy.id);
    select(copy.id, true);
  }

  function restack(id: string, delta: 1 | -1) {
    const s = current;
    if (!s) return;
    const i = s.objects.findIndex((o) => o.id === id);
    const j = i + delta;
    if (i < 0 || j < 0 || j >= s.objects.length) return;
    change(() => {
      const [o] = s.objects.splice(i, 1);
      if (o) s.objects.splice(j, 0, o);
    });
    select(id, true);
  }

  // ── Editing text in place ─────────────────────────────────────────────────────────────────
  let editBefore: Snap = '';

  function startEdit(id: string) {
    const o = current?.objects.find((x) => x.id === id);
    if (o?.kind !== 'text') return;
    editBefore = snap();
    selectedId = id;
    editingId = id;
  }

  /** Mounts the in-place editor: same box, same type, the words selected and ready. */
  function editor(node: HTMLElement, o: SlideObject) {
    node.textContent = o.text ?? '';
    node.focus({ preventScroll: true });
    const range = document.createRange();
    range.selectNodeContents(node);
    const sel = getSelection();
    sel?.removeAllRanges();
    sel?.addRange(range);
  }

  function commitEdit(node: HTMLElement, o: SlideObject, refocus = false) {
    // Chrome also blurs an editor it removes; only the one being edited may commit.
    if (editingId !== o.id) return;
    o.text = node.innerText.replace(/\n$/, '');
    o.h = Math.max(o.h, Math.ceil(node.scrollHeight));
    editingId = null;
    record(editBefore);
    if (refocus) tick().then(() => objectEl(o.id)?.focus({ preventScroll: true }));
  }

  function editorKey(event: KeyboardEvent, o: SlideObject) {
    if (event.key === 'Escape' || (event.key === 'Enter' && (event.metaKey || event.ctrlKey))) {
      event.preventDefault();
      event.stopPropagation();
      commitEdit(event.currentTarget as HTMLElement, o, true);
    }
  }

  // ── Pointer gestures on the slide: move and resize, with snapping guides ─────────────────
  type Box = { x: number; y: number; w: number; h: number };
  let drag: {
    id: string;
    mode: 'move' | 'resize';
    dir: string;
    sx: number;
    sy: number;
    start: Box;
    before: Snap;
    moved: boolean;
  } | null = null;

  function toSlide(event: PointerEvent | MouseEvent) {
    const r = frameEl?.getBoundingClientRect();
    if (!r || !k) return { x: SLIDE_W / 2, y: SLIDE_H / 2 };
    return { x: (event.clientX - r.left) / k, y: (event.clientY - r.top) / k };
  }

  function lines(id: string) {
    const others = current?.objects.filter((o) => o.id !== id) ?? [];
    return {
      xs: [0, SLIDE_W / 2, SLIDE_W, ...others.flatMap((o) => [o.x, o.x + o.w / 2, o.x + o.w])],
      ys: [0, SLIDE_H / 2, SLIDE_H, ...others.flatMap((o) => [o.y, o.y + o.h / 2, o.y + o.h])],
    };
  }

  /** The smallest shift that lines one of `edges` up with one of `targets`, within `tol`. */
  function nearest(edges: number[], targets: number[], tol: number) {
    let best: number | null = null;
    for (const e of edges)
      for (const t of targets)
        if (Math.abs(t - e) <= tol && (best === null || Math.abs(t - e) < Math.abs(best)))
          best = t - e;
    return best;
  }

  const matches = (edges: number[], targets: number[]) => [
    ...new Set(targets.filter((t) => edges.some((e) => Math.abs(t - e) < 0.5))),
  ];

  function beginGesture(event: PointerEvent, o: SlideObject, mode: 'move' | 'resize', dir = '') {
    drag = {
      id: o.id,
      mode,
      dir,
      sx: event.clientX,
      sy: event.clientY,
      start: { x: o.x, y: o.y, w: o.w, h: o.h },
      before: snap(),
      moved: false,
    };
  }

  function objectDown(event: PointerEvent, o: SlideObject) {
    if (event.button !== 0 || editingId === o.id || tool) return;
    event.stopPropagation();
    event.preventDefault();
    select(o.id);
    (event.currentTarget as HTMLElement).focus({ preventScroll: true });
    beginGesture(event, o, 'move');
  }

  function handleDown(event: PointerEvent, o: SlideObject, dir: string) {
    if (event.button !== 0) return;
    event.stopPropagation();
    event.preventDefault();
    beginGesture(event, o, 'resize', dir);
  }

  function gestureMove(event: PointerEvent) {
    if (!drag) return;
    const o = current?.objects.find((x) => x.id === drag?.id);
    if (!o || !k) return;
    if (!drag.moved && Math.hypot(event.clientX - drag.sx, event.clientY - drag.sy) < 3) return;
    drag.moved = true;
    gesture = drag.mode;
    const dx = (event.clientX - drag.sx) / k;
    const dy = (event.clientY - drag.sy) / k;
    const tol = 7 / k;
    const { xs, ys } = lines(o.id);
    const s = drag.start;
    // Alt turns snapping off for fine placement.
    const free = event.altKey;

    if (drag.mode === 'move') {
      let x = s.x + dx;
      let y = s.y + dy;
      if (!free) {
        x += nearest([x, x + s.w / 2, x + s.w], xs, tol) ?? 0;
        y += nearest([y, y + s.h / 2, y + s.h], ys, tol) ?? 0;
      }
      o.x = Math.round(x);
      o.y = Math.round(y);
    } else {
      const d = drag.dir;
      let left = s.x;
      let top = s.y;
      let right = s.x + s.w;
      let bottom = s.y + s.h;
      if (d.includes('w')) left = s.x + dx;
      if (d.includes('e')) right = s.x + s.w + dx;
      if (d.includes('n')) top = s.y + dy;
      if (d.includes('s')) bottom = s.y + s.h + dy;
      if (!free) {
        if (d.includes('w')) left += nearest([left], xs, tol) ?? 0;
        if (d.includes('e')) right += nearest([right], xs, tol) ?? 0;
        if (d.includes('n')) top += nearest([top], ys, tol) ?? 0;
        if (d.includes('s')) bottom += nearest([bottom], ys, tol) ?? 0;
      }
      const MIN = 16;
      if (right - left < MIN) {
        if (d.includes('w')) left = right - MIN;
        else right = left + MIN;
      }
      if (bottom - top < MIN) {
        if (d.includes('n')) top = bottom - MIN;
        else bottom = top + MIN;
      }
      // Shift on a corner keeps the proportions.
      if (event.shiftKey && d.length === 2) {
        const ratio = s.w / s.h;
        const h = (right - left) / ratio;
        if (d.includes('n')) top = bottom - h;
        else bottom = top + h;
      }
      o.x = Math.round(left);
      o.y = Math.round(top);
      o.w = Math.round(right - left);
      o.h = Math.round(bottom - top);
    }
    guides = free
      ? { x: [], y: [] }
      : {
          x: matches([o.x, o.x + o.w / 2, o.x + o.w], xs),
          y: matches([o.y, o.y + o.h / 2, o.y + o.h], ys),
        };
  }

  function gestureEnd() {
    if (!drag) return;
    if (drag.moved) record(drag.before);
    drag = null;
    gesture = null;
    guides = { x: [], y: [] };
  }

  function objectKey(event: KeyboardEvent, o: SlideObject) {
    // Keys typed into the in-place editor bubble through the object: they are words, not commands.
    if (event.target !== event.currentTarget) return;
    const step = event.shiftKey ? 10 : 1;
    const arrows: Record<string, [number, number]> = {
      ArrowLeft: [-step, 0],
      ArrowRight: [step, 0],
      ArrowUp: [0, -step],
      ArrowDown: [0, step],
    };
    const move = arrows[event.key];
    const mod = event.metaKey || event.ctrlKey;
    if (move) {
      event.preventDefault();
      select(o.id);
      // Alt + arrows resizes from the keyboard; plain arrows nudge.
      change(() => {
        if (event.altKey) {
          o.w = Math.max(16, o.w + move[0] * (event.shiftKey ? 1 : 10));
          o.h = Math.max(16, o.h + move[1] * (event.shiftKey ? 1 : 10));
        } else {
          o.x += move[0];
          o.y += move[1];
        }
      });
    } else if (event.key === 'Delete' || event.key === 'Backspace') {
      event.preventDefault();
      removeObject(o.id);
    } else if (event.key === 'Enter' && o.kind === 'text') {
      event.preventDefault();
      startEdit(o.id);
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      select(o.id);
    } else if (event.key === 'Escape' && selectedId) {
      event.preventDefault();
      event.stopPropagation();
      select(null);
    } else if (mod && event.key.toLowerCase() === 'd') {
      event.preventDefault();
      duplicateObject(o.id);
    } else if (event.key === ']' || event.key === '[') {
      event.preventDefault();
      restack(o.id, event.key === ']' ? 1 : -1);
    }
  }

  function sheetDown(event: PointerEvent) {
    if (event.button !== 0) return;
    if (tool) {
      event.preventDefault();
      addObject(tool, toSlide(event));
      return;
    }
    select(null);
  }

  function sheetHover(event: PointerEvent) {
    if (!tool) return;
    ghost = toSlide(event);
  }

  function pickTool(event: MouseEvent, kind: ObjectKind) {
    // From the keyboard there is no pointer to aim with: place it in the middle right away.
    if (event.detail === 0) addObject(kind);
    else {
      tool = tool === kind ? null : kind;
      ghost = null;
      select(null);
    }
  }

  // The tools for the selected object: above it, or below when there is no room above.
  const bar = $derived.by(() => {
    if (!selected || !k) return null;
    const half = barW / 2;
    const cx = (selected.x + selected.w / 2) * k;
    const left = barW > frameW ? frameW / 2 : Math.max(half - 8, Math.min(frameW - half + 8, cx));
    const top = selected.y * k;
    const bottom = (selected.y + selected.h) * k;
    if (top - barH - 12 >= -ROOM_TOP + 8) return { left, top: top - barH - 12, place: 'above' };
    if (bottom + barH + 12 <= frameH) return { left, top: bottom + 12, place: 'below' };
    return { left, top: Math.max(top, 0) + 12, place: 'inside' };
  });

  // ── Thumbnail rail: select, reorder by dragging in place, keyboard ────────────────────────
  let dragSlide = $state<{ id: string; offset: number } | null>(null);
  let slideGrab: {
    id: string;
    start: number;
    grab: number;
    before: Snap;
    started: boolean;
  } | null = null;
  let swallowClick = false;

  const along = (event: PointerEvent) => {
    const r = listEl?.getBoundingClientRect();
    if (!r || !listEl) return 0;
    return narrow
      ? event.clientX - r.left + listEl.scrollLeft
      : event.clientY - r.top + listEl.scrollTop;
  };
  const startOf = (el: HTMLElement) => (narrow ? el.offsetLeft : el.offsetTop);
  const sizeOf = (el: HTMLElement) => (narrow ? el.offsetWidth : el.offsetHeight);

  function thumbDown(event: PointerEvent, s: Slide) {
    if (event.button !== 0) return;
    const li = (event.currentTarget as HTMLElement).closest('li');
    if (!li) return;
    const p = along(event);
    slideGrab = { id: s.id, start: p, grab: p - startOf(li), before: snap(), started: false };
  }

  function thumbMove(event: PointerEvent) {
    const g = slideGrab;
    if (!g || !listEl) return;
    const p = along(event);
    if (!g.started) {
      if (Math.abs(p - g.start) < 6) return;
      g.started = true;
      dragSlide = { id: g.id, offset: 0 };
    }
    const items = [...listEl.querySelectorAll<HTMLElement>('li[data-slide]')];
    const me = items.find((li) => li.dataset['slide'] === g.id);
    if (!me) return;
    const centre = p - g.grab + sizeOf(me) / 2;
    let target = 0;
    for (const li of items) if (li !== me && startOf(li) + sizeOf(li) / 2 < centre) target += 1;
    const from = slides.findIndex((s) => s.id === g.id);
    if (target !== from) {
      const [s] = slides.splice(from, 1);
      if (s) slides.splice(target, 0, s);
    }
    const follow = () => dragSlide && (dragSlide.offset = p - g.grab - startOf(me));
    follow();
    tick().then(follow);
  }

  function thumbUp() {
    const g = slideGrab;
    slideGrab = null;
    if (!g?.started) return;
    swallowClick = true;
    dragSlide = null;
    record(g.before);
  }

  function thumbClick(s: Slide) {
    if (swallowClick) {
      swallowClick = false;
      return;
    }
    go(slides.indexOf(s));
  }

  function thumbKey(event: KeyboardEvent, i: number) {
    const back = event.key === 'ArrowUp' || event.key === 'ArrowLeft';
    const ahead = event.key === 'ArrowDown' || event.key === 'ArrowRight';
    if (back || ahead) {
      event.preventDefault();
      const to = i + (back ? -1 : 1);
      if (event.altKey) {
        moveSlide(i, to);
        const s = slides[clampIndex(to)];
        if (s) tick().then(() => thumbButton(s.id)?.focus());
      } else go(to, true);
    } else if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault();
      go(event.key === 'Home' ? 0 : slides.length - 1, true);
    } else if (event.key === 'Delete' || event.key === 'Backspace') {
      event.preventDefault();
      const s = slides[i];
      if (s) removeSlide(s.id);
    }
  }

  function pointerMove(event: PointerEvent) {
    gestureMove(event);
    thumbMove(event);
  }

  function pointerUp() {
    gestureEnd();
    thumbUp();
  }

  // ── Present: the slide grows from where it sits into full screen, and back ────────────────
  let show = $state<{
    at: number;
    dir: number;
    moved: boolean;
    leaving: boolean;
    fx: number;
    fy: number;
    fs: number;
  } | null>(null);
  let idle = $state(false);
  let idleTimer: ReturnType<typeof setTimeout> | undefined;
  let returnFocus: HTMLElement | null = null;

  const showK = $derived(Math.min(vw / SLIDE_W, vh / SLIDE_H));
  const showBox = $derived({
    w: SLIDE_W * showK,
    h: SLIDE_H * showK,
    x: (vw - SLIDE_W * showK) / 2,
    y: (vh - SLIDE_H * showK) / 2,
  });

  function flipFrom(el: Element | null | undefined) {
    const r = el?.getBoundingClientRect();
    if (!r?.width) return { fx: 0, fy: 0, fs: 0.92 };
    return { fx: r.left - showBox.x, fy: r.top - showBox.y, fs: r.width / showBox.w };
  }

  function wake() {
    idle = false;
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => (idle = true), 2600);
  }

  function present(at = index, origin?: Element | null) {
    if (!slides.length) return;
    editingId = null;
    tool = null;
    returnFocus = document.activeElement as HTMLElement | null;
    show = { at, dir: 1, moved: false, leaving: false, ...flipFrom(origin ?? frameEl) };
    wake();
  }

  async function leave() {
    if (!show || show.leaving) return;
    // From the end card, the last slide is what shrinks back into the editor.
    if (show.at >= slides.length) Object.assign(show, { at: slides.length - 1, moved: false });
    const s = slides[show.at];
    if (s && s.id !== currentId) {
      enterDir = 0;
      currentId = s.id;
      selectedId = null;
    }
    await tick();
    if (!show) return;
    Object.assign(show, flipFrom(frameEl), { leaving: true });
    setTimeout(
      () => {
        show = null;
        returnFocus?.focus({ preventScroll: true });
      },
      motion('--motion-slow') + 30,
    );
  }

  function step(delta: number) {
    if (!show || show.leaving) return;
    const at = Math.max(0, Math.min(slides.length, show.at + delta));
    if (at === show.at) return;
    show.dir = delta > 0 ? 1 : -1;
    show.at = at;
    show.moved = true;
  }

  function showKey(event: KeyboardEvent) {
    const onButton = (event.target as HTMLElement).closest('button');
    const key = event.key;
    if (key === 'Escape') {
      event.preventDefault();
      leave();
    } else if (
      ['ArrowRight', 'ArrowDown', 'PageDown', 'n'].includes(key) ||
      (key === ' ' && !onButton)
    ) {
      event.preventDefault();
      step(1);
    } else if (['ArrowLeft', 'ArrowUp', 'PageUp', 'p', 'Backspace'].includes(key)) {
      event.preventDefault();
      step(-1);
    } else if (key === 'Home' || key === 'End') {
      event.preventDefault();
      step(key === 'Home' ? -99 : slides.length - 1 - (show?.at ?? 0));
    }
  }

  function focusIn(node: HTMLElement) {
    node.focus({ preventScroll: true });
  }

  /** The end of the talk is the end of a task: a small burst of sprinkles, once. */
  function cheer(node: HTMLElement) {
    const t = setTimeout(() => celebrate(node, 16), motion('--motion-base'));
    return { destroy: () => clearTimeout(t) };
  }

  // ── Global keys ───────────────────────────────────────────────────────────────────────────
  const typing = (t: EventTarget | null) =>
    t instanceof HTMLElement &&
    (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName));

  function windowKey(event: KeyboardEvent) {
    if (show) return showKey(event);
    const mod = event.metaKey || event.ctrlKey;
    const key = event.key.toLowerCase();
    if (typing(event.target)) return;
    if (mod && key === 'z') {
      event.preventDefault();
      if (event.shiftKey) redo();
      else undo();
    } else if (mod && key === 'y') {
      event.preventDefault();
      redo();
    } else if (mod && key === 'enter') {
      event.preventDefault();
      present();
    } else if (key === 'escape' && tool) {
      tool = null;
      ghost = null;
    } else if (key === 'pagedown' || key === 'pageup') {
      event.preventDefault();
      go(index + (key === 'pagedown' ? 1 : -1));
    }
  }

  // ── Notes and deck title edits are recorded once, when you leave the field ────────────────
  let fieldBefore: Snap = '';

  // Small mini-maps of the layouts for the picker: [x, y, w, h, kind] in percent of the slide.
  const SKETCH: Record<LayoutId, [number, number, number, number, string][]> = {
    title: [
      [8, 36, 60, 12, 'head'],
      [8, 54, 40, 6, 'line'],
    ],
    'title-text': [
      [8, 10, 50, 10, 'head'],
      [8, 30, 80, 5, 'line'],
      [8, 40, 72, 5, 'line'],
      [8, 50, 76, 5, 'line'],
    ],
    'two-column': [
      [8, 10, 50, 10, 'head'],
      [8, 30, 38, 5, 'line'],
      [8, 40, 34, 5, 'line'],
      [54, 30, 38, 5, 'line'],
      [54, 40, 32, 5, 'line'],
    ],
    'big-number': [
      [8, 26, 40, 24, 'num'],
      [8, 58, 54, 6, 'line'],
    ],
    'image-text': [
      [0, 0, 46, 100, 'pic'],
      [54, 24, 38, 10, 'head'],
      [54, 44, 36, 5, 'line'],
      [54, 54, 30, 5, 'line'],
    ],
    blank: [],
  };

  const notes: DesignNote[] = [
    {
      principle: 'locality',
      title: 'The tools sit on the object',
      body: 'Select anything on the slide and its colour, size, alignment and order float right above it. Your eyes never leave what you are changing.',
      target: '[data-note="object-bar"]',
    },
    {
      principle: 'locality',
      title: 'A new slide appears where you click +',
      body: 'Point between two thumbnails and a + shows the exact spot. Layouts open from the slide’s own thumbnail, and a removed slide offers its undo in the gap it left.',
      target: '[data-note="insert-gap"]',
    },
    {
      principle: 'locality',
      title: 'Notes live under their slide',
      body: 'Speaker notes are tucked under the slide they belong to, not in a far-away panel — so it is always clear which slide they are for.',
      target: '[data-note="notes"]',
    },
    {
      principle: 'cues',
      title: 'Present grows out of the slide',
      body: 'Presenting zooms the slide from where it sits to full screen and shrinks it back on Esc. New objects grow where you place them, and dragged thumbnails glide to their new place.',
      target: '[data-note="present"]',
    },
    {
      principle: 'cues',
      title: 'Guides show what lines up',
      body: 'While you drag or resize, lines appear for the slide’s centre, its edges and the other objects. The snap is felt and seen at the same moment.',
      target: '[data-note="canvas"]',
    },
    {
      principle: 'function',
      title: 'Only deck-wide things sit at the top',
      body: 'Title, undo, the look of the deck, sharing and presenting change the whole deck, so they share one slim front-layer bar. Everything else is local.',
      target: '[data-note="deck-bar"]',
    },
    {
      principle: 'friendly',
      title: 'Warm words where nothing is at stake',
      body: 'The save state, empty notes and placement hints talk like a helpful colleague. Nothing here is an error, so nothing sounds like one.',
      target: '[data-note="save-state"]',
    },
  ];
</script>

<svelte:window
  bind:innerWidth={vw}
  bind:innerHeight={vh}
  onkeydown={windowKey}
  onpointermove={pointerMove}
  onpointerup={pointerUp}
  onpointercancel={pointerUp}
/>

<!-- ── Snippets ─────────────────────────────────────────────────────────────────────────── -->

{#snippet content(o: SlideObject, live = false)}
  {#if o.kind === 'text'}
    {#if live && editingId === o.id}
      <div
        class="text text--editing"
        contenteditable="plaintext-only"
        role="textbox"
        aria-multiline="true"
        aria-label="Edit text"
        tabindex="0"
        style:font-size="{o.size}px"
        style:font-weight={o.bold ? 'var(--fw-bold)' : 'var(--fw-regular)'}
        style:text-align={o.align ?? 'left'}
        style:color={fillOf(o.fill, true)}
        style:line-height={lineHeight(o.size)}
        class:muted={o.muted}
        use:editor={o}
        onblur={(event) => commitEdit(event.currentTarget, o)}
        onkeydown={(event) => editorKey(event, o)}
        onpointerdown={(event) => event.stopPropagation()}
      ></div>
    {:else}
      <div
        class="text"
        class:muted={o.muted}
        class:empty={!o.text}
        style:font-size="{o.size}px"
        style:font-weight={o.bold ? 'var(--fw-bold)' : 'var(--fw-regular)'}
        style:text-align={o.align ?? 'left'}
        style:color={fillOf(o.fill, true)}
        style:line-height={lineHeight(o.size)}
      >
        {o.text || 'Empty — double-click to write'}
      </div>
    {/if}
  {:else if o.kind === 'rect' || o.kind === 'ellipse'}
    <div
      class="shape"
      style:background={fillOf(o.fill)}
      style:border-radius={o.kind === 'ellipse' ? '50%' : `${o.radius ?? 0}px`}
    ></div>
  {:else if o.kind === 'image'}
    <div class="pic" style:--wash={fillOf(o.fill)}>
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <circle class="pic-sun" cx="300" cy="86" r="34" />
        <path class="pic-far" d="M0 220 L90 130 L160 190 L250 100 L400 210 L400 300 L0 300 Z" />
        <path class="pic-near" d="M0 260 L120 180 L210 240 L300 170 L400 250 L400 300 L0 300 Z" />
      </svg>
      {#if o.caption}<span class="pic-cap">{o.caption}</span>{/if}
    </div>
  {:else if o.kind === 'chart'}
    {@const Z = 1.5}
    {@const values = (o.data ?? []).map((d) => d.value)}
    {@const top = Math.ceil(Math.max(1, ...values) / 5) * 5}
    <div class="chart" style:--series={fillOf(o.fill)}>
      {#if o.caption}<span class="chart-cap">{o.caption}</span>{/if}
      <!-- Charts draw 11px labels; drawing them small and scaling up keeps them readable. -->
      <div
        class="chart-zoom"
        class:chart-zoom--bar={o.chart === 'bar'}
        style:width="{(o.w - (o.chart === 'bar' ? 60 : 0)) / Z}px"
        style:transform="scale({Z})"
      >
        {#if o.chart === 'line'}
          <LineChart
            data={o.data ?? []}
            min={0}
            max={top}
            ticks={[0, top / 2, top]}
            height={(o.h - 36) / Z}
            color={fillOf(o.fill)}
            label={o.caption}
          />
        {:else}
          <HorizontalBarChart
            data={o.data ?? []}
            height={(o.h - 36) / Z}
            color={fillOf(o.fill)}
            label={o.caption}
          />
        {/if}
      </div>
    </div>
  {/if}
{/snippet}

<!-- A slide drawn at `scale`: thumbnails, the presentation and the empty sheet share it. -->
{#snippet paper(s: Slide, scale: number)}
  <div
    class="paper paper--{theme}"
    data-theme={paperTheme}
    style:transform="scale({scale})"
    aria-hidden="true"
  >
    {#each s.objects as o (o.id)}
      <div
        class="obj obj--{o.kind}"
        style:left="{o.x}px"
        style:top="{o.y}px"
        style:width="{o.w}px"
        style:height="{o.h}px"
      >
        {@render content(o)}
      </div>
    {/each}
  </div>
{/snippet}

{#snippet gap(i: number)}
  <div class="gap">
    {#if removed?.index === i}
      <div class="undo-chip" role="status">
        <span>Slide removed.</span>
        <button type="button" onclick={undo}>Undo</button>
      </div>
    {:else}
      <button
        type="button"
        class="gap-btn"
        aria-label={i === 0 ? 'Add a slide at the start' : `Add a slide after slide ${i}`}
        data-note={i === 1 ? 'insert-gap' : undefined}
        onclick={() => insertAt(i)}
      >
        <span class="gap-line"></span>
        <span class="gap-plus"><Icon name="plus" size={12} /></span>
      </button>
    {/if}
  </div>
{/snippet}

{#snippet header()}
  <div class="deckbar" data-note="deck-bar">
    <Layer level="front" direction="horizontal" gap="sm" wrap={false} padding="xs">
      <AppIcon label="Slide deck" icon="presentation" color="accent" size={34} />
      <div class="title-block">
        <input
          class="deck-title"
          aria-label="Deck title"
          value={deckTitle}
          onfocus={() => (fieldBefore = snap())}
          oninput={(event) => (deckTitle = event.currentTarget.value)}
          onblur={() => record(fieldBefore)}
          onkeydown={(event) => event.key === 'Enter' && event.currentTarget.blur()}
        />
        <span class="save" class:saving data-note="save-state" role="status">
          {#if saving}
            <span class="save-dot"></span> Saving…
          {:else}
            <Icon name="check" size={12} /> All changes saved
          {/if}
        </span>
      </div>
      <span class="grow"></span>
      <div class="group">
        <IconButton
          icon="undo"
          label="Undo"
          shape="pill"
          shortcut={['Mod', 'Z']}
          tooltipPlacement="bottom"
          disabled={!past.length}
          onclick={undo}
        />
        <IconButton
          icon="redo"
          label="Redo"
          shape="pill"
          shortcut={['Mod', 'Shift', 'Z']}
          tooltipPlacement="bottom"
          disabled={!future.length}
          onclick={redo}
        />
      </div>
      <div class="looks" role="radiogroup" aria-label="Look of the whole deck">
        {#each deckThemes as t (t.id)}
          <Tooltip text="{t.label} look" placement="bottom">
            <button
              type="button"
              role="radio"
              aria-checked={theme === t.id}
              aria-label="{t.label} look"
              class="look look--{t.id}"
              data-theme={t.id === 'night' ? 'dark' : 'light'}
              onclick={() => theme !== t.id && change(() => (theme = t.id))}
            ></button>
          </Tooltip>
        {/each}
      </div>
      <Popover label="Share" placement="bottom-end" width="20rem" title="Share this deck">
        {#snippet trigger(props)}
          <IconButton
            {...props}
            icon="share"
            label="Share"
            shape="pill"
            showLabel={!narrow}
            tooltipPlacement="bottom"
            tooltipAlign="end"
          />
        {/snippet}
        <div class="share">
          <p>Anyone with the link can view. They will see it exactly like this, theme and all.</p>
          <div class="share-row">
            <code>example.com/d/q3-update</code>
            <CopyButton value="https://example.com/d/q3-update" label="Copy link" size="sm" />
          </div>
        </div>
      </Popover>
      <span class="present-btn" data-note="present">
        <Button
          variant="primary"
          icon="play"
          label="Present"
          collapse
          disabled={!slides.length}
          onclick={() => present()}
        />
      </span>
    </Layer>
  </div>
{/snippet}

<!-- ── Page ─────────────────────────────────────────────────────────────────────────────── -->

<Page fill gap="md" {header}>
  <div class="workspace" class:narrow>
    <section
      class="stage"
      aria-label="Slide editor"
      bind:clientWidth={stageW}
      bind:clientHeight={stageH}
    >
      {#if current}
        <div class="column" style:--frame-w="{frameW}px" style:--tools-h="{toolsH}px">
          <div
            class="frame"
            class:away={!!show}
            bind:this={frameEl}
            style:width="{frameW}px"
            style:height="{frameH}px"
            data-note="canvas"
          >
            <div
              class="sheet"
              class:placing={!!tool}
              role="group"
              tabindex="-1"
              aria-label="Slide {index + 1} of {slides.length}: {slideName(current)}"
              onpointerdown={sheetDown}
              onpointermove={sheetHover}
              onpointerleave={() => (ghost = null)}
            >
              {#key current.id}
                <div
                  class="paper paper--{theme} enter"
                  data-theme={paperTheme}
                  style:transform="scale({k})"
                  style:--enter-x={narrow ? `${enterDir * 32}px` : '0px'}
                  style:--enter-y={narrow ? '0px' : `${enterDir * 32}px`}
                >
                  {#each current.objects as o (o.id)}
                    <div
                      class="obj obj--{o.kind} live"
                      class:fresh={fresh.has(o.id)}
                      class:is-selected={o.id === selectedId}
                      class:dragging={o.id === selectedId && gesture === 'move'}
                      data-obj={o.id}
                      role="button"
                      tabindex="0"
                      aria-label={describe(o)}
                      aria-pressed={o.id === selectedId}
                      aria-roledescription="slide object"
                      style:left="{o.x}px"
                      style:top="{o.y}px"
                      style:width="{o.w}px"
                      style:height="{o.h}px"
                      onpointerdown={(event) => objectDown(event, o)}
                      ondblclick={() => startEdit(o.id)}
                      onkeydown={(event) => objectKey(event, o)}
                      onfocus={() => editingId !== o.id && select(o.id)}
                      onanimationend={() => fresh.delete(o.id)}
                    >
                      {@render content(o, true)}
                    </div>
                  {/each}
                </div>
              {/key}
            </div>

            <!-- Chrome drawn at screen size on top of the scaled slide: guides, selection, tools. -->
            <div class="overlay">
              {#each guides.x as gx (gx)}
                <span
                  class="guide guide--v"
                  class:guide--mid={gx === SLIDE_W / 2}
                  style:left="{Math.round(gx * k)}px"
                ></span>
              {/each}
              {#each guides.y as gy (gy)}
                <span
                  class="guide guide--h"
                  class:guide--mid={gy === SLIDE_H / 2}
                  style:top="{Math.round(gy * k)}px"
                ></span>
              {/each}

              {#if ghost && tool}
                {@const d = DEFAULTS[tool]}
                <span
                  class="ghost"
                  class:ghost--round={tool === 'ellipse'}
                  style:left="{(ghost.x - d.w / 2) * k}px"
                  style:top="{(ghost.y - d.h / 2) * k}px"
                  style:width="{d.w * k}px"
                  style:height="{d.h * k}px"
                ></span>
              {/if}

              {#if tool}
                {@const t = TOOLS.find((x) => x.kind === tool)}
                <div class="hint" role="status" data-theme={paperTheme}>
                  Click where {t?.noun} should go <span class="hint-sep">·</span>
                  <Kbd>Esc</Kbd> to cancel
                </div>
              {/if}

              {#if selected}
                <div
                  class="selection"
                  data-theme={paperTheme}
                  class:editing={editingId === selected.id}
                  style:left="{selected.x * k}px"
                  style:top="{selected.y * k}px"
                  style:width="{selected.w * k}px"
                  style:height="{selected.h * k}px"
                >
                  {#if editingId !== selected.id}
                    {#each ['nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w'] as dir (dir)}
                      <span
                        class="handle handle--{dir}"
                        aria-hidden="true"
                        onpointerdown={(event) => selected && handleDown(event, selected, dir)}
                      ></span>
                    {/each}
                  {/if}
                  {#if gesture}
                    <span class="readout">
                      {gesture === 'resize'
                        ? `${selected.w} × ${selected.h}`
                        : `${selected.x}, ${selected.y}`}
                    </span>
                  {/if}
                </div>

                {#if !gesture && bar}
                  {@const o = selected}
                  <!-- Hints open away from the object, so they never cover what you are editing. -->
                  {@const tipAt = bar.place === 'above' ? 'top' : 'bottom'}
                  {#key o.id}
                    <div
                      class="objbar objbar--{bar.place}"
                      data-theme={paperTheme}
                      role="toolbar"
                      tabindex="-1"
                      aria-label="Tools for this {o.kind === 'text' ? 'text' : 'object'}"
                      data-note="object-bar"
                      bind:offsetWidth={barW}
                      bind:offsetHeight={barH}
                      style:left="{bar.left}px"
                      style:top="{bar.top}px"
                      onpointerdown={(event) => event.stopPropagation()}
                    >
                      {#if colorsOpen}
                        <IconButton
                          icon="chevron-left"
                          label="Back to the tools"
                          size="sm"
                          shape="pill"
                          tooltipPlacement={tipAt}
                          onclick={() => (colorsOpen = false)}
                        />
                        <div class="swatches" role="radiogroup" aria-label="Colour">
                          {#each slideFills as f (f)}
                            <button
                              type="button"
                              role="radio"
                              class="swatch"
                              aria-checked={o.fill === f}
                              aria-label={FILL_NAMES[f]}
                              title={FILL_NAMES[f]}
                              data-theme={paperTheme}
                              style:--swatch={fillOf(f)}
                              onclick={() => patch((x) => (x.fill = f))}
                            ></button>
                          {/each}
                        </div>
                      {:else}
                        <IconButton
                          label="Colour: {FILL_NAMES[o.fill]}"
                          size="sm"
                          shape="pill"
                          tooltipPlacement={tipAt}
                          aria-expanded="false"
                          onclick={() => (colorsOpen = true)}
                        >
                          <span
                            class="swatch swatch--current"
                            data-theme={paperTheme}
                            style:--swatch={fillOf(o.fill)}
                          ></span>
                        </IconButton>
                        {#if o.kind === 'text'}
                          <span class="sep"></span>
                          <IconButton
                            icon="minus"
                            label="Smaller text"
                            size="sm"
                            shape="pill"
                            tooltipPlacement={tipAt}
                            onclick={() =>
                              patch((x) => (x.size = Math.max(10, (x.size ?? 22) - 2)))}
                          />
                          <span class="size" aria-label="Text size">{o.size ?? 22}</span>
                          <IconButton
                            icon="plus"
                            label="Larger text"
                            size="sm"
                            shape="pill"
                            tooltipPlacement={tipAt}
                            onclick={() =>
                              patch((x) => (x.size = Math.min(160, (x.size ?? 22) + 2)))}
                          />
                          <span class="sep"></span>
                          {#if narrow}
                            {@const a = o.align ?? 'left'}
                            {@const next =
                              a === 'left' ? 'center' : a === 'center' ? 'right' : 'left'}
                            <!-- One button that cycles, so the bar fits on a phone. -->
                            <IconButton
                              icon="align-{a}"
                              label="Aligned {a}; switch to {next}"
                              size="sm"
                              shape="pill"
                              tooltipPlacement={tipAt}
                              onclick={() => patch((x) => (x.align = next))}
                            />
                          {:else}
                            {#each ALIGNS as [a, icon] (a)}
                              <IconButton
                                {icon}
                                label="Align {a}"
                                size="sm"
                                shape="pill"
                                tooltipPlacement={tipAt}
                                pressed={(o.align ?? 'left') === a}
                                onclick={() => patch((x) => (x.align = a))}
                              />
                            {/each}
                          {/if}
                          <IconButton
                            icon="bold"
                            label="Bold"
                            size="sm"
                            shape="pill"
                            tooltipPlacement={tipAt}
                            pressed={!!o.bold}
                            onclick={() => patch((x) => (x.bold = !x.bold))}
                          />
                        {:else if o.kind === 'chart'}
                          <span class="sep"></span>
                          <IconButton
                            icon="chart"
                            label="Bar chart"
                            size="sm"
                            shape="pill"
                            tooltipPlacement={tipAt}
                            pressed={o.chart === 'bar'}
                            onclick={() => patch((x) => (x.chart = 'bar'))}
                          />
                          <IconButton
                            icon="activity"
                            label="Line chart"
                            size="sm"
                            shape="pill"
                            tooltipPlacement={tipAt}
                            pressed={o.chart === 'line'}
                            onclick={() => patch((x) => (x.chart = 'line'))}
                          />
                        {/if}
                        <span class="sep"></span>
                        <IconButton
                          icon="arrow-up"
                          label="Bring forward"
                          size="sm"
                          shape="pill"
                          shortcut={[']']}
                          tooltipPlacement={tipAt}
                          disabled={current.objects.at(-1)?.id === o.id}
                          onclick={() => restack(o.id, 1)}
                        />
                        <IconButton
                          icon="arrow-down"
                          label="Send backward"
                          size="sm"
                          shape="pill"
                          shortcut={['[']}
                          tooltipPlacement={tipAt}
                          disabled={current.objects[0]?.id === o.id}
                          onclick={() => restack(o.id, -1)}
                        />
                        <IconButton
                          icon="copy"
                          label="Duplicate"
                          size="sm"
                          shape="pill"
                          shortcut={['Mod', 'D']}
                          tooltipPlacement={tipAt}
                          onclick={() => duplicateObject(o.id)}
                        />
                        <IconButton
                          icon="trash"
                          label="Delete"
                          size="sm"
                          shape="pill"
                          tone="danger"
                          shortcut={['Backspace']}
                          tooltipPlacement={tipAt}
                          tooltipAlign="end"
                          onclick={() => removeObject(o.id)}
                        />
                      {/if}
                    </div>
                  {/key}
                {/if}
              {/if}
            </div>
          </div>

          <div class="tools" bind:offsetHeight={toolsH}>
            <Layer
              level="front"
              edge="bottom"
              direction="horizontal"
              gap="xs"
              padding="xs"
              wrap={false}
            >
              {#each TOOLS as t (t.kind)}
                <IconButton
                  icon={t.icon}
                  label={narrow ? `Add ${t.label.toLowerCase()}` : t.label}
                  tooltip="Add {t.label.toLowerCase()} — click, then click on the slide"
                  shape="pill"
                  showLabel={!narrow}
                  pressed={tool === t.kind}
                  onclick={(event) => pickTool(event, t.kind)}
                />
              {/each}
            </Layer>
          </div>

          <div class="notes" data-note="notes" bind:offsetHeight={notesH}>
            <label class="notes-label" for="slide-notes">
              <Icon name="file-text" size={14} /> Speaker notes
              <span class="notes-for">for slide {index + 1}</span>
            </label>
            <textarea
              id="slide-notes"
              value={current.notes}
              placeholder="Anything to remember for this slide? Only you will see it."
              onfocus={() => (fieldBefore = snap())}
              oninput={(event) => current && (current.notes = event.currentTarget.value)}
              onblur={() => record(fieldBefore)}></textarea>
          </div>
        </div>
      {:else}
        <div class="empty">
          <EmptyState
            icon="presentation"
            title="A blank stage. Lovely."
            message="Every good talk starts with one slide."
            actionLabel="Add the first slide"
            actionIcon="plus"
            onaction={() => insertAt(0, 'title')}
          />
        </div>
      {/if}
    </section>

    <nav class="rail" aria-label="Slides" style:--thumb-w="{thumbW}px">
      <div class="rail-head">
        <span>Slides</span>
        <span class="rail-count">{slides.length}</span>
      </div>
      <ol class="rail-list" bind:this={listEl} class:sorting={!!dragSlide}>
        {#each slides as s, i (s.id)}
          <li
            class="rail-item"
            class:lifted={dragSlide?.id === s.id}
            data-slide={s.id}
            style:translate={dragSlide?.id === s.id
              ? narrow
                ? `${dragSlide.offset}px 0`
                : `0 ${dragSlide.offset}px`
              : undefined}
            animate:flip={{
              duration: dragSlide?.id === s.id ? 0 : motion('--motion-base'),
              easing: cubicOut,
            }}
            in:grow={{ axis: narrow ? 'x' : 'y' }}
          >
            {@render gap(i)}
            <div class="thumb-wrap" class:current={s.id === currentId}>
              <span class="thumb-no" aria-hidden="true">{i + 1}</span>
              <button
                type="button"
                class="thumb"
                style:width="{thumbW}px"
                style:height="{(thumbW * 9) / 16}px"
                tabindex={s.id === currentId ? 0 : -1}
                aria-current={s.id === currentId ? 'true' : undefined}
                aria-label="Slide {i + 1}: {slideName(s)}"
                aria-keyshortcuts="Alt+ArrowUp Alt+ArrowDown Delete"
                onpointerdown={(event) => thumbDown(event, s)}
                onclick={() => thumbClick(s)}
                onkeydown={(event) => thumbKey(event, i)}
              >
                {@render paper(s, thumbW / SLIDE_W)}
              </button>
              <div class="thumb-menu-slot">
                <Popover
                  label="Layout and options for slide {i + 1}"
                  placement={narrow ? 'bottom-start' : 'right-start'}
                  width="17.5rem"
                  padding="sm"
                >
                  {#snippet trigger(props)}
                    <button
                      type="button"
                      class="thumb-menu"
                      aria-label="Layout and options for slide {i + 1}"
                      {...props}
                    >
                      <Icon name="layout" size={14} />
                    </button>
                  {/snippet}
                  {#snippet children(close)}
                    <div class="picker">
                      <span class="picker-title">Layout</span>
                      <div class="layouts">
                        {#each layouts as l (l.id)}
                          <button
                            type="button"
                            class="layout"
                            aria-pressed={s.layout === l.id}
                            onclick={() => {
                              applyLayout(s.id, l.id);
                              close();
                            }}
                          >
                            <span class="sketch">
                              {#each SKETCH[l.id] as [x, y, w, h, kind], n (n)}
                                <span
                                  class="sk sk--{kind}"
                                  style:left="{x}%"
                                  style:top="{y}%"
                                  style:width="{w}%"
                                  style:height="{h}%"
                                ></span>
                              {/each}
                            </span>
                            <span class="layout-name">{l.label}</span>
                          </button>
                        {/each}
                      </div>
                      <div class="picker-actions">
                        <IconButton
                          icon="play"
                          label="Present from here"
                          showLabel
                          class="picker-action"
                          onclick={() => {
                            close();
                            present(i, thumbButton(s.id));
                          }}
                        />
                        <IconButton
                          icon="copy"
                          label="Duplicate"
                          showLabel
                          class="picker-action"
                          onclick={() => {
                            close();
                            duplicateSlide(s.id);
                          }}
                        />
                        <IconButton
                          icon="trash"
                          label="Delete"
                          showLabel
                          tone="danger"
                          class="picker-action"
                          onclick={() => {
                            close();
                            removeSlide(s.id);
                          }}
                        />
                      </div>
                    </div>
                  {/snippet}
                </Popover>
              </div>
            </div>
          </li>
        {/each}
        <li class="rail-end">{@render gap(slides.length)}</li>
      </ol>
    </nav>
  </div>
</Page>

<!-- ── Presentation ─────────────────────────────────────────────────────────────────────── -->
{#if show}
  {@const s = slides[show.at]}
  <div
    class="show"
    class:leaving={show.leaving}
    class:idle
    data-theme="dark"
    role="dialog"
    aria-modal="true"
    aria-label="Presenting {deckTitle}"
    tabindex="-1"
    use:focusIn
    onpointermove={wake}
  >
    <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
    <div
      class="show-slide"
      style:left="{showBox.x}px"
      style:top="{showBox.y}px"
      style:width="{showBox.w}px"
      style:height="{showBox.h}px"
      style:--fx="{show.fx}px"
      style:--fy="{show.fy}px"
      style:--fs={show.fs}
      onclick={() => step(1)}
    >
      {#key show.at}
        <div class="step" class:stepped={show.moved} style:--dir={show.dir}>
          {#if s}
            {@render paper(s, showK)}
          {:else}
            <div class="end" use:cheer>
              <strong>That’s a wrap.</strong>
              <span>Nicely done. Press <Kbd>Esc</Kbd> to go back to your deck.</span>
            </div>
          {/if}
        </div>
      {/key}
    </div>
    <div class="show-progress" style:--p={Math.min(1, (show.at + 1) / slides.length)}></div>
    <div class="show-controls" role="toolbar" aria-label="Presentation">
      <IconButton
        icon="chevron-left"
        label="Previous slide"
        shape="pill"
        shortcut={['ArrowLeft']}
        disabled={show.at === 0}
        onclick={() => step(-1)}
      />
      <span class="show-count">
        {#if s}{show.at + 1} / {slides.length}{:else}The end{/if}
      </span>
      <IconButton
        icon="chevron-right"
        label="Next slide"
        shape="pill"
        shortcut={['ArrowRight']}
        disabled={show.at >= slides.length}
        onclick={() => step(1)}
      />
      <span class="sep"></span>
      <span class="show-hint"><Kbd>←</Kbd><Kbd>→</Kbd> to move</span>
      <!-- The key stays visible: nobody hovers for hints while presenting. -->
      <IconButton label="Exit" hint={false} shape="pill" class="show-exit" onclick={leave}>
        <Icon name="minimize" size={16} /> Exit <Kbd>Esc</Kbd>
      </IconButton>
    </div>
  </div>
{/if}

<DesignNotes title="Slide deck" {notes} corner="bottom-left" />

<style>
  /* ── Top bar (front layer, deck-wide only) ── */
  .deckbar {
    position: sticky;
    top: var(--sticky-gap);
    z-index: var(--z-header);
    padding: 0 var(--gutter);
    margin-top: var(--sticky-gap);
  }
  .title-block {
    display: grid;
    min-width: 0;
    flex: 0 1 18rem;
  }
  .deck-title {
    min-width: 0;
    padding: var(--space-1) var(--space-2);
    margin-left: calc(-1 * var(--space-1));
    border: 1px solid transparent;
    border-radius: var(--radius-sm);
    background: transparent;
    color: var(--text);
    font: inherit;
    font-size: var(--fs-lg);
    font-weight: var(--fw-semibold);
    letter-spacing: var(--tracking-tight);
    text-overflow: ellipsis;
    transition:
      background var(--motion-quick) var(--ease-out),
      border-color var(--motion-quick) var(--ease-out);
  }
  .deck-title:hover {
    background: var(--fill-subtle);
  }
  .deck-title:focus {
    outline: none;
    border-color: var(--accent-border);
    background: var(--input-bg);
    box-shadow: var(--focus-halo);
  }
  .save {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    padding-left: var(--space-1);
    color: var(--text-3);
    font-size: var(--fs-2xs);
    white-space: nowrap;
  }
  .save :global(svg) {
    color: var(--ok);
  }
  .save-dot {
    width: var(--space-2);
    height: var(--space-2);
    border-radius: var(--radius-pill);
    background: var(--warn);
    animation: bb-float var(--motion-lazy) var(--ease-in-out) infinite;
  }
  .grow {
    flex: 1;
  }
  .group {
    display: flex;
    gap: var(--space-1);
  }
  .looks {
    display: flex;
    align-items: center;
    gap: var(--space-1);
    padding: var(--space-1);
    border-radius: var(--radius-pill);
    background: var(--fill-subtle);
  }
  .look {
    width: var(--control-xs);
    height: var(--control-xs);
    padding: 0;
    border: 2px solid transparent;
    border-radius: var(--radius-pill);
    background-clip: padding-box;
    box-shadow: inset 0 0 0 1px var(--border-strong);
    cursor: pointer;
    transition:
      transform var(--motion-quick) var(--ease-spring),
      border-color var(--motion-quick) var(--ease-out);
  }
  .look:hover {
    transform: scale(1.08);
  }
  .look[aria-checked='true'] {
    border-color: var(--accent);
  }
  /* Each look button carries its own data-theme, so the paper colour is the slide's. */
  .look--paper,
  .look--night {
    background-color: var(--editor-bg);
  }
  .look--candy {
    background-image: radial-gradient(circle at 70% 25%, var(--tint-300), var(--tint-50) 70%);
  }
  .look:focus-visible {
    outline: var(--focus-ring);
    outline-offset: 2px;
  }
  .share {
    display: grid;
    gap: var(--space-3);
    font-size: var(--fs-sm);
    color: var(--text-2);
  }
  .share p {
    margin: 0;
  }
  .share-row {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    justify-content: space-between;
    padding: var(--space-1) var(--space-1) var(--space-1) var(--space-3);
    border-radius: var(--radius-pill);
    background: var(--fill-subtle);
  }
  .share-row code {
    font-family: var(--font-mono);
    font-size: var(--fs-xs);
    color: var(--text);
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .present-btn {
    display: inline-flex;
  }

  .thumb:focus-visible,
  .thumb-menu:focus-visible,
  .gap-btn:focus-visible,
  .layout:focus-visible,
  .swatch:focus-visible,
  .undo-chip button:focus-visible {
    outline: var(--focus-ring);
    outline-offset: 2px;
  }
  .sep {
    flex: none;
    width: 1px;
    height: var(--space-5);
    margin: 0 var(--space-1);
    background: var(--border-strong);
  }

  /* ── Workspace: rail + stage ── */
  .workspace {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: var(--space-5);
    min-height: 0;
  }
  .stage {
    grid-column: 2;
    grid-row: 1;
    position: relative;
    min-width: 0;
    min-height: 0;
    display: grid;
    place-items: center;
  }
  .column {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: var(--space-6);
  }

  /* The slide is paper on the ground: no glass, a soft shadow lit from above. */
  .frame {
    position: relative;
    z-index: 2;
    flex: none;
  }
  .sheet {
    position: absolute;
    inset: 0;
    overflow: clip;
    border-radius: var(--radius-md);
    box-shadow:
      0 0 0 1px var(--border-strong),
      var(--glass-shadow),
      0 30px 60px -30px color-mix(in srgb, var(--tint-900) 40%, transparent);
    outline: none;
  }
  .sheet.placing {
    cursor: crosshair;
  }
  .frame.away .sheet,
  .frame.away .overlay {
    visibility: hidden;
  }
  .paper {
    position: absolute;
    top: 0;
    left: 0;
    width: 960px;
    height: 540px;
    overflow: clip;
    transform-origin: 0 0;
    background: var(--editor-bg);
    color: var(--text);
    font-family: var(--font-sans);
    transition: background-color var(--motion-slow) var(--ease-out);
  }
  .paper--candy {
    background:
      radial-gradient(circle at 92% 6%, var(--tint-200), transparent 46%),
      radial-gradient(circle at 0% 100%, var(--tint-100), transparent 42%), var(--tint-50);
  }
  /* Switching slides: the new one arrives from the direction of the rail. */
  .enter {
    animation: enter var(--motion-base) var(--ease-out);
  }
  @keyframes enter {
    from {
      opacity: 0;
      translate: var(--enter-x) var(--enter-y);
    }
  }

  /* ── Objects ── */
  .obj {
    position: absolute;
  }
  .obj.live {
    cursor: grab;
    outline: none;
    border-radius: 2px;
  }
  .obj.live:hover:not(.is-selected) {
    box-shadow: 0 0 0 1.5px color-mix(in srgb, var(--accent) 55%, transparent);
  }
  .obj.dragging {
    cursor: grabbing;
  }
  .sheet.placing .obj.live {
    cursor: crosshair;
  }
  /* A new object grows from the spot where it was placed. */
  .obj.fresh {
    animation: bb-pop var(--motion-slow) var(--ease-out);
  }
  .text {
    width: 100%;
    min-height: 100%;
    white-space: pre-wrap;
    overflow-wrap: break-word;
    letter-spacing: var(--tracking-tight);
  }
  .text.muted {
    opacity: 0.7;
  }
  .text.empty {
    opacity: 0.35;
    font-style: italic;
  }
  .text--editing {
    outline: none;
    cursor: text;
    caret-color: var(--accent);
  }
  .text--editing::selection {
    background: var(--accent-soft);
  }
  .shape {
    width: 100%;
    height: 100%;
  }
  .pic {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: clip;
    background: linear-gradient(
      180deg,
      color-mix(in srgb, var(--wash) 30%, var(--editor-bg)),
      color-mix(in srgb, var(--wash) 55%, var(--editor-bg))
    );
  }
  .pic svg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }
  .pic-sun {
    fill: var(--color-yellow);
    opacity: 0.85;
  }
  .pic-far {
    fill: color-mix(in srgb, var(--wash) 70%, var(--editor-bg));
  }
  .pic-near {
    fill: var(--wash);
  }
  .pic-cap {
    position: absolute;
    left: 20px;
    bottom: 20px;
    padding: 6px 14px;
    border-radius: var(--radius-pill);
    background: color-mix(in srgb, var(--editor-bg) 82%, transparent);
    color: var(--text);
    font-size: 15px;
    font-weight: var(--fw-medium);
  }
  .chart {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    height: 100%;
  }
  .chart-cap {
    font-size: 16px;
    font-weight: var(--fw-semibold);
    color: var(--text-2);
  }
  .chart-zoom {
    transform-origin: 0 0;
    /* Hover tooltips assume an unscaled chart; on a slide the chart is a picture. */
    pointer-events: none;
  }
  .chart-zoom--bar {
    margin-left: 60px;
  }

  /* ── Overlay: guides, selection, the object's own tools ── */
  .overlay {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: var(--z-raised);
  }
  .overlay > * {
    pointer-events: auto;
  }
  .guide {
    position: absolute;
    pointer-events: none;
    background: var(--color-pink);
  }
  .guide--v {
    top: calc(-1 * var(--space-3));
    bottom: calc(-1 * var(--space-3));
    width: 1px;
  }
  .guide--h {
    left: calc(-1 * var(--space-3));
    right: calc(-1 * var(--space-3));
    height: 1px;
  }
  /* The slide's own centre lines carry a small dot where they cross the edge. */
  .guide--mid::before,
  .guide--mid::after {
    content: '';
    position: absolute;
    width: var(--space-2);
    height: var(--space-2);
    margin: calc(-1 * var(--space-1));
    border-radius: var(--radius-pill);
    background: var(--color-pink);
  }
  .guide--v.guide--mid::before {
    top: 0;
  }
  .guide--v.guide--mid::after {
    bottom: calc(-1 * var(--space-2));
  }
  .guide--h.guide--mid::before {
    left: 0;
  }
  .guide--h.guide--mid::after {
    right: calc(-1 * var(--space-2));
  }
  .guide--v.guide--mid::before,
  .guide--v.guide--mid::after {
    left: 0.5px;
  }
  .guide--h.guide--mid::before,
  .guide--h.guide--mid::after {
    top: 0.5px;
  }
  .ghost {
    position: absolute;
    pointer-events: none;
    border: 1.5px dashed var(--accent);
    border-radius: var(--radius-xs);
    background: var(--accent-faint);
  }
  .ghost--round {
    border-radius: 50%;
  }
  .hint {
    position: absolute;
    top: var(--space-3);
    left: 50%;
    translate: -50% 0;
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    padding: var(--space-1) var(--space-3);
    border-radius: var(--radius-pill);
    border: 0.75px solid var(--layer-front-border);
    background: var(--layer-front-bg);
    backdrop-filter: var(--blur-pill);
    -webkit-backdrop-filter: var(--blur-pill);
    box-shadow: var(--shadow-frosted);
    color: var(--text);
    font-size: var(--fs-xs);
    white-space: nowrap;
    pointer-events: none;
    animation: bb-drop var(--motion-base) var(--ease-out);
  }
  .hint-sep {
    color: var(--text-3);
  }
  .selection {
    position: absolute;
    pointer-events: none;
    box-shadow:
      0 0 0 1.5px var(--accent),
      0 0 0 5px var(--accent-faint);
    border-radius: 2px;
  }
  .selection.editing {
    box-shadow:
      0 0 0 1.5px var(--accent),
      0 0 0 6px var(--accent-soft);
  }
  .handle {
    position: absolute;
    width: var(--space-3);
    height: var(--space-3);
    margin: calc(-1 * var(--space-3) / 2);
    border-radius: var(--radius-pill);
    background: var(--editor-bg);
    box-shadow:
      0 0 0 1.5px var(--accent),
      var(--glass-shadow);
    pointer-events: auto;
    animation: bb-pop var(--motion-base) var(--ease-spring);
  }
  .handle::after {
    /* A finger-sized hit area around a small dot. */
    content: '';
    position: absolute;
    inset: calc(-1 * var(--space-2));
  }
  .handle--nw,
  .handle--n,
  .handle--ne {
    top: 0;
  }
  .handle--sw,
  .handle--s,
  .handle--se {
    top: 100%;
  }
  .handle--w,
  .handle--e {
    top: 50%;
  }
  .handle--nw,
  .handle--w,
  .handle--sw {
    left: 0;
  }
  .handle--ne,
  .handle--e,
  .handle--se {
    left: 100%;
  }
  .handle--n,
  .handle--s {
    left: 50%;
  }
  .handle--nw,
  .handle--se {
    cursor: nwse-resize;
  }
  .handle--ne,
  .handle--sw {
    cursor: nesw-resize;
  }
  .handle--n,
  .handle--s {
    cursor: ns-resize;
  }
  .handle--e,
  .handle--w {
    cursor: ew-resize;
  }
  .readout {
    position: absolute;
    top: calc(100% + var(--space-3));
    left: 50%;
    translate: -50% 0;
    padding: 2px var(--space-2);
    border-radius: var(--radius-pill);
    background: var(--accent);
    color: var(--on-accent);
    font-size: var(--fs-2xs);
    font-weight: var(--fw-semibold);
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }

  /* The object's tools: an overlay, so liquid glass; it pops out of the object it serves. */
  .objbar {
    position: absolute;
    display: flex;
    align-items: center;
    gap: 2px;
    padding: var(--space-1);
    translate: -50% 0;
    border-radius: var(--radius-pill);
    border: 0.75px solid var(--layer-front-border);
    background: var(--layer-front-bg);
    backdrop-filter: var(--blur-pill);
    -webkit-backdrop-filter: var(--blur-pill);
    box-shadow: var(--shadow-pop);
    color: var(--text);
    white-space: nowrap;
    transform-origin: 50% 100%;
    animation: bb-pop var(--motion-base) var(--ease-out);
  }
  .objbar--below,
  .objbar--inside {
    transform-origin: 50% 0;
  }
  .size {
    min-width: 2ch;
    text-align: center;
    font-size: var(--fs-sm);
    font-weight: var(--fw-semibold);
    font-variant-numeric: tabular-nums;
  }
  .swatches {
    display: flex;
    gap: var(--space-1);
    padding: 0 var(--space-1);
    animation: bb-pop var(--motion-base) var(--ease-out);
  }
  .swatch {
    width: var(--space-5);
    height: var(--space-5);
    padding: 0;
    border: 0;
    border-radius: var(--radius-pill);
    background: var(--swatch);
    box-shadow: inset 0 0 0 1px var(--border-strong);
    cursor: pointer;
    transition: transform var(--motion-quick) var(--ease-spring);
  }
  .swatch:hover {
    transform: scale(1.12);
  }
  .swatch[aria-checked='true'] {
    box-shadow:
      0 0 0 2px var(--editor-bg),
      0 0 0 3.5px var(--accent);
  }
  .swatch--current {
    display: block;
    width: var(--space-4);
    height: var(--space-4);
  }

  /* ── Insert tools: front layer floating just under the slide's lower edge ── */
  .tools {
    position: relative;
    z-index: 3;
    margin-top: var(--space-2);
  }

  /* ── Notes: tucked under their slide ── */
  .notes {
    position: relative;
    display: grid;
    gap: var(--space-1);
    /* Tucked under the slide like a card behind the paper; the tools float on its top edge. */
    --tuck: calc(var(--space-2) + var(--tools-h) + var(--radius-md));
    width: calc(var(--frame-w) - 2 * var(--space-5));
    margin-top: calc(-1 * var(--tuck));
    padding: calc(var(--tuck) + var(--space-2)) var(--space-4) var(--space-3);
    border-radius: 0 0 var(--radius-card) var(--radius-card);
    border: 1px solid var(--layer-panel-border);
    border-top: 0;
    background: var(--layer-panel-bg);
    box-shadow: var(--layer-panel-shadow);
    backdrop-filter: var(--layer-panel-blur);
    -webkit-backdrop-filter: var(--layer-panel-blur);
  }
  .notes-label {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    color: var(--text-2);
    font-size: var(--fs-xs);
    font-weight: var(--fw-semibold);
  }
  .notes-for {
    color: var(--text-3);
    font-weight: var(--fw-regular);
  }
  .notes textarea {
    height: calc(var(--fs-md) * 1.5 * 3);
    resize: none;
    padding: 0;
    border: 0;
    background: transparent;
    color: var(--text);
    font: inherit;
    font-size: var(--fs-md);
    line-height: 1.5;
  }
  .notes textarea::placeholder {
    color: var(--text-3);
  }
  .notes textarea:focus {
    outline: none;
  }
  .notes:focus-within {
    box-shadow:
      var(--layer-panel-shadow),
      0 0 0 2px var(--accent-border);
  }
  .empty {
    max-width: 26rem;
  }

  /* ── Rail (panel) ── */
  .rail {
    grid-column: 1;
    grid-row: 1;
    /* Keeps its width when the deck is empty: the thumbnail, its number and the padding. */
    min-width: calc(var(--thumb-w) + 1.4em + var(--space-2) + 2 * var(--space-3));
    display: flex;
    flex-direction: column;
    min-height: 0;
    border-radius: var(--radius-card);
    border: 1px solid var(--layer-panel-border);
    background: var(--layer-panel-bg);
    box-shadow: var(--layer-panel-shadow);
    backdrop-filter: var(--layer-panel-blur);
    -webkit-backdrop-filter: var(--layer-panel-blur);
  }
  .rail-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--space-3) var(--space-4) 0;
    font-size: var(--fs-xs);
    font-weight: var(--fw-semibold);
    letter-spacing: var(--tracking-caps);
    text-transform: uppercase;
    color: var(--text-3);
  }
  .rail-count {
    min-width: 1.6em;
    padding: 0 var(--space-1);
    border-radius: var(--radius-pill);
    background: var(--fill-muted);
    color: var(--text-2);
    text-align: center;
    letter-spacing: 0;
  }
  .rail-list {
    position: relative;
    flex: 1;
    min-height: 0;
    margin: 0;
    padding: var(--space-1) var(--space-3) var(--space-12);
    list-style: none;
    overflow: auto;
    overscroll-behavior: contain;
    user-select: none;
    -webkit-user-select: none;
  }
  .rail-item {
    position: relative;
    transition: translate var(--motion-base) var(--ease-out);
  }
  .rail-item.lifted {
    z-index: var(--z-raised);
    transition: none;
  }
  .thumb-wrap {
    position: relative;
    display: flex;
    align-items: flex-start;
    gap: var(--space-2);
  }
  .thumb-no {
    width: 1.4em;
    padding-top: var(--space-1);
    color: var(--text-3);
    font-size: var(--fs-2xs);
    font-weight: var(--fw-semibold);
    font-variant-numeric: tabular-nums;
    text-align: right;
  }
  .current .thumb-no {
    color: var(--accent-ink);
  }
  .thumb {
    position: relative;
    flex: none;
    padding: 0;
    overflow: clip;
    border: 0;
    border-radius: var(--radius-xs);
    background: transparent;
    box-shadow:
      0 0 0 1px var(--border-strong),
      var(--glass-shadow);
    cursor: pointer;
    touch-action: none;
    transition:
      box-shadow var(--motion-quick) var(--ease-out),
      transform var(--motion-base) var(--ease-out);
  }
  .thumb:hover {
    transform: var(--hover-lift);
  }
  .thumb .paper {
    pointer-events: none;
  }
  .current .thumb {
    box-shadow:
      0 0 0 2px var(--accent),
      0 6px 16px color-mix(in srgb, var(--tint) 28%, transparent);
  }
  .lifted .thumb {
    transform: scale(1.05) rotate(-1deg);
    box-shadow:
      0 0 0 2px var(--accent),
      var(--shadow-pop);
    cursor: grabbing;
  }
  .sorting {
    cursor: grabbing;
  }
  .thumb-menu-slot {
    position: absolute;
    top: var(--space-1);
    right: var(--space-1);
    opacity: 0;
    transition: opacity var(--motion-quick) var(--ease-out);
  }
  .thumb-wrap:hover .thumb-menu-slot,
  .thumb-wrap:focus-within .thumb-menu-slot,
  .current .thumb-menu-slot {
    opacity: 1;
  }
  .thumb-menu {
    display: grid;
    place-items: center;
    width: var(--control-xs);
    height: var(--control-xs);
    padding: 0;
    border: 0.75px solid var(--layer-front-border);
    border-radius: var(--radius-pill);
    background: var(--layer-front-bg);
    backdrop-filter: var(--blur-pill);
    -webkit-backdrop-filter: var(--blur-pill);
    box-shadow: var(--shadow-frosted);
    color: var(--text);
    cursor: pointer;
  }
  .thumb-menu:hover {
    box-shadow: var(--shadow-frosted-hover);
  }

  /* The gap between two thumbnails is where a new slide will appear. */
  .gap {
    position: relative;
    display: grid;
    place-items: center;
    min-height: var(--space-5);
    padding-left: calc(1.4em + var(--space-2));
  }
  .gap-btn {
    position: relative;
    display: grid;
    place-items: center;
    width: 100%;
    height: var(--space-5);
    padding: 0;
    border: 0;
    border-radius: var(--radius-pill);
    background: transparent;
    color: var(--accent-ink);
    cursor: pointer;
  }
  .gap-line {
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    height: 2px;
    margin-top: -1px;
    border-radius: var(--radius-pill);
    background: var(--accent);
    transform: scaleX(0);
    transition: transform var(--motion-base) var(--ease-out);
  }
  .gap-plus {
    position: relative;
    display: grid;
    place-items: center;
    width: var(--space-5);
    height: var(--space-5);
    border-radius: var(--radius-pill);
    background: var(--accent);
    color: var(--on-accent);
    box-shadow: var(--shadow-primary);
    opacity: 0;
    transform: scale(0.4);
    transition:
      opacity var(--motion-quick) var(--ease-out),
      transform var(--motion-base) var(--ease-spring);
  }
  .gap-btn:hover .gap-line,
  .gap-btn:focus-visible .gap-line {
    transform: scaleX(1);
  }
  .gap-btn:hover .gap-plus,
  .gap-btn:focus-visible .gap-plus {
    opacity: 1;
    transform: none;
  }
  .sorting .gap-btn {
    visibility: hidden;
  }
  .undo-chip {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    margin: var(--space-1) 0;
    padding: var(--space-1) var(--space-1) var(--space-1) var(--space-3);
    border-radius: var(--radius-pill);
    background: var(--fill-muted);
    color: var(--text-2);
    font-size: var(--fs-xs);
    white-space: nowrap;
    animation: bb-pop var(--motion-base) var(--ease-out);
  }
  .undo-chip button {
    padding: 2px var(--space-2);
    border: 0;
    border-radius: var(--radius-pill);
    background: var(--editor-bg);
    color: var(--accent-ink);
    font: inherit;
    font-weight: var(--fw-semibold);
    cursor: pointer;
  }

  /* ── Layout picker ── */
  .picker {
    display: grid;
    gap: var(--space-2);
  }
  .picker-title {
    padding: 0 var(--space-1);
    color: var(--text-3);
    font-size: var(--fs-2xs);
    font-weight: var(--fw-semibold);
    letter-spacing: var(--tracking-caps);
    text-transform: uppercase;
  }
  .layouts {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-2);
  }
  .layout {
    display: grid;
    gap: var(--space-1);
    padding: var(--space-1);
    border: 0;
    border-radius: var(--radius-sm);
    background: transparent;
    color: var(--text-2);
    font: inherit;
    font-size: var(--fs-2xs);
    cursor: pointer;
    transition: background var(--motion-quick) var(--ease-out);
  }
  .layout:hover {
    background: var(--fill-hover);
  }
  .layout[aria-pressed='true'] {
    background: var(--accent-soft);
    color: var(--accent-ink);
  }
  .sketch {
    position: relative;
    aspect-ratio: 16 / 9;
    overflow: clip;
    border-radius: var(--radius-xs);
    background: var(--editor-bg);
    box-shadow: 0 0 0 1px var(--border-strong);
  }
  .sk {
    position: absolute;
    border-radius: 1px;
  }
  .sk--head {
    background: var(--text-2);
  }
  .sk--line {
    background: var(--fill-off);
  }
  .sk--num {
    background: var(--accent);
  }
  .sk--pic {
    background: var(--tint-200);
    border-radius: 0;
  }
  .layout-name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .picker-actions {
    display: grid;
    padding-top: var(--space-2);
    border-top: 1px solid var(--border-strong);
  }
  .picker-actions :global(.picker-action) {
    justify-content: flex-start;
    width: 100%;
  }
  /* The exit key stays visible on the button: nobody hovers for hints while presenting. */
  .show-controls :global(.show-exit) {
    gap: var(--space-2);
    padding: 0 var(--space-2) 0 var(--space-3);
  }

  /* ── Presentation (an overlay above everything) ── */
  .show {
    position: fixed;
    inset: 0;
    z-index: calc(var(--z-toast) + 10);
    background: var(--bg-base);
    color: var(--text);
    outline: none;
    animation: fade-in var(--motion-slow) var(--ease-out);
  }
  .show.leaving {
    background: transparent;
    transition: background var(--motion-slow) var(--ease-in-out);
  }
  @keyframes fade-in {
    from {
      background: transparent;
    }
  }
  .show-slide {
    position: absolute;
    overflow: clip;
    transform-origin: 0 0;
    cursor: pointer;
    animation: present-in var(--motion-slow) var(--ease-in-out);
  }
  .leaving .show-slide {
    animation: present-out var(--motion-slow) var(--ease-in-out) forwards;
  }
  @keyframes present-in {
    from {
      transform: translate(var(--fx), var(--fy)) scale(var(--fs));
      border-radius: var(--radius-md);
    }
  }
  @keyframes present-out {
    to {
      transform: translate(var(--fx), var(--fy)) scale(var(--fs));
      border-radius: var(--radius-md);
    }
  }
  .step {
    position: absolute;
    inset: 0;
  }
  .step.stepped {
    animation: step-in var(--motion-base) var(--ease-out);
  }
  @keyframes step-in {
    from {
      opacity: 0;
      translate: calc(var(--dir) * var(--space-12)) 0;
    }
  }
  .end {
    position: absolute;
    inset: 0;
    display: grid;
    place-content: center;
    gap: var(--space-3);
    text-align: center;
    background: var(--bg-base);
  }
  .end strong {
    font-size: var(--fs-display);
    letter-spacing: var(--tracking-tight);
  }
  .end span {
    color: var(--text-2);
  }
  .show-progress {
    position: absolute;
    left: 0;
    bottom: 0;
    height: 3px;
    width: 100%;
    background: var(--accent);
    transform: scaleX(var(--p));
    transform-origin: 0 50%;
    transition: transform var(--motion-slow) var(--ease-out);
  }
  .show-controls {
    position: absolute;
    left: 50%;
    bottom: var(--space-6);
    translate: -50% 0;
    display: flex;
    align-items: center;
    gap: var(--space-1);
    padding: var(--space-1);
    border-radius: var(--radius-pill);
    border: 0.75px solid var(--layer-front-border);
    /* Dense: it may float over a white slide, and its labels must stay readable there. */
    background: var(--tooltip-bg);
    backdrop-filter: var(--blur-pill);
    -webkit-backdrop-filter: var(--blur-pill);
    box-shadow: var(--shadow-pop);
    transition:
      opacity var(--motion-slow) var(--ease-out),
      translate var(--motion-slow) var(--ease-out);
    animation: bb-rise var(--motion-slow) var(--ease-out);
  }
  .idle .show-controls,
  .leaving .show-controls {
    opacity: 0;
    translate: -50% var(--space-4);
  }
  .idle {
    cursor: none;
  }
  .show-count {
    min-width: 4.5em;
    text-align: center;
    font-size: var(--fs-sm);
    font-weight: var(--fw-semibold);
    font-variant-numeric: tabular-nums;
  }
  .show-hint {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    padding: 0 var(--space-2);
    color: var(--text-3);
    font-size: var(--fs-xs);
  }

  /* ── Narrow: the rail becomes a strip under the slide ── */
  .workspace.narrow {
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: auto auto;
    align-content: start;
    overflow: auto;
    gap: var(--space-4);
    margin-inline: calc(-1 * var(--space-2));
    padding-inline: var(--space-2);
  }
  .narrow .stage {
    grid-column: 1;
    grid-row: 1;
    place-items: start stretch;
  }
  .narrow .column {
    padding-top: var(--space-12);
  }
  .narrow .notes {
    width: calc(100% - 2 * var(--space-3));
  }
  .narrow .rail {
    grid-column: 1;
    grid-row: 2;
  }
  .narrow .rail-list {
    display: flex;
    align-items: flex-start;
    padding: var(--space-1) var(--space-3) var(--space-3);
    overflow-x: auto;
    overflow-y: hidden;
  }
  .narrow .rail-item,
  .narrow .rail-end {
    display: flex;
    flex: none;
  }
  .narrow .thumb-wrap {
    flex-direction: column;
    gap: var(--space-1);
  }
  .narrow .thumb-no {
    width: auto;
    padding: 0;
    text-align: left;
  }
  .narrow .gap {
    min-height: 0;
    min-width: var(--space-5);
    padding: calc(var(--fs-2xs) + var(--space-2)) 0 0;
    align-self: stretch;
  }
  .narrow .gap-btn {
    width: var(--space-5);
    height: 100%;
  }
  .narrow .gap-line {
    left: 50%;
    right: auto;
    top: 0;
    bottom: 0;
    width: 2px;
    height: auto;
    margin: 0 0 0 -1px;
    transform: scaleY(0);
  }
  .narrow .gap-btn:hover .gap-line,
  .narrow .gap-btn:focus-visible .gap-line {
    transform: scaleY(1);
  }
  .narrow .thumb-menu-slot {
    top: calc(var(--fs-2xs) + var(--space-2));
  }
  @media (max-width: 640px) {
    .show-hint {
      display: none;
    }
    .looks {
      display: none;
    }
    .save {
      font-size: var(--fs-2xs);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .enter,
    .obj.fresh,
    .objbar,
    .swatches,
    .handle,
    .hint,
    .undo-chip,
    .step.stepped,
    .show-controls,
    .save-dot {
      animation: none;
    }
    .show-slide,
    .leaving .show-slide {
      animation: fade-in var(--motion-quick) linear;
    }
    .rail-item,
    .thumb,
    .gap-line,
    .gap-plus,
    .paper {
      transition: none;
    }
  }
</style>
