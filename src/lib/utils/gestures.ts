/**
 * Touch gestures for phones and tablets, all on pointer events. `longpress` and `swipe` answer a
 * finger only, so a mouse keeps its right-click and hover; `dragToClose` takes any pointer.
 *
 *   use:longpress={{ onpress }}       hold a finger ~half a second: `onpress(x, y, target)` (call
 *                                     `squeezeOnce` there, so the row answers before its panel).
 *                                     The click and the browser's own long-press menu that would
 *                                     follow are swallowed. Scrolling cancels it.
 *   use:swipe={{ onswipe }}           a quick horizontal fling: `onswipe('left' | 'right')`.
 *                                     Vertical scrolling stays the browser's.
 *   dragToClose(handle, sheet, close) a sheet that follows a finger pulled down from its grip and
 *                                     closes past a threshold (or a quick flick).
 *   squeezeOnce(element)              a short give where a finger held, before a panel appears.
 */
import { motion } from './motion';

/** How far (px) a held finger may wander before the long-press counts as a scroll. */
const SLOP = 10;

/** Text fields keep their own long-press (select, paste). */
export function isEditable(node: EventTarget | null): boolean {
  return (
    node instanceof Element &&
    !!node.closest('input, textarea, select, [contenteditable=""], [contenteditable="true"]')
  );
}

/** A short squeeze where the finger is, so a held row answers before its panel appears. */
export function squeezeOnce(element: Element | null) {
  if (!(element instanceof HTMLElement) || typeof element.animate !== 'function') return;
  const m = motion('base', 'jelly', element);
  if (!m.reduced)
    element.animate([{ scale: '1' }, { scale: '0.97' }, { scale: '1' }], {
      duration: m.duration + 80,
      easing: m.easing,
    });
  try {
    navigator.vibrate?.(8);
  } catch {
    /* not allowed here: the squeeze says it */
  }
}

/** Settings of the `longpress` action. */
export interface LongPressParams {
  /** The finger was held at (`x`, `y`) on `target`; return false when nothing opened (the click then goes through). */
  onpress: (x: number, y: number, target: Element) => boolean | void;
  /** How long to hold, in ms. */
  delay?: number;
  /** Leave long-presses in text fields to the browser (default true). */
  skipEditable?: boolean;
  /** False turns it off; on by default. */
  enabled?: boolean;
}

/** Swallows the click (and Android's contextmenu) that end a long-press. */
function swallowAfter() {
  const stop = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();
  };
  window.addEventListener('click', stop, { capture: true, once: true });
  window.addEventListener('contextmenu', stop, { capture: true, once: true });
  setTimeout(() => {
    window.removeEventListener('click', stop, { capture: true });
    window.removeEventListener('contextmenu', stop, { capture: true });
  }, 700);
}

/** Action: a finger held still for `delay` ms (480 by default) calls `onpress`; touch only. */
export function longpress(node: HTMLElement, params: LongPressParams) {
  let options = params;
  let timer: ReturnType<typeof setTimeout> | undefined;
  let start: { x: number; y: number; id: number } | null = null;

  const cancel = () => {
    clearTimeout(timer);
    timer = undefined;
    start = null;
  };

  function down(event: PointerEvent) {
    if (event.pointerType !== 'touch' || !event.isPrimary || options.enabled === false) return;
    if ((options.skipEditable ?? true) && isEditable(event.target)) return;
    // Nested areas: the innermost one answers.
    const claimed = event as PointerEvent & { longpressClaimed?: boolean };
    if (claimed.longpressClaimed) return;
    claimed.longpressClaimed = true;
    const target = event.target as Element;
    start = { x: event.clientX, y: event.clientY, id: event.pointerId };
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (!start) return;
      const { x, y } = start;
      cancel();
      if (options.onpress(x, y, target) === false) return;
      swallowAfter();
      window.getSelection()?.removeAllRanges();
    }, options.delay ?? 480);
  }

  function move(event: PointerEvent) {
    if (!start || event.pointerId !== start.id) return;
    if (Math.hypot(event.clientX - start.x, event.clientY - start.y) > SLOP) cancel();
  }

  // Android raises its own contextmenu around the same moment: one long-press, one panel.
  function contextmenu(event: MouseEvent) {
    if (!start) return;
    const { x, y } = start;
    const target = event.target as Element;
    cancel();
    event.preventDefault();
    event.stopPropagation();
    if (options.onpress(x, y, target) === false) return;
    swallowAfter();
  }

  node.addEventListener('pointerdown', down);
  node.addEventListener('pointermove', move);
  node.addEventListener('pointerup', cancel);
  node.addEventListener('pointercancel', cancel);
  node.addEventListener('contextmenu', contextmenu, true);
  return {
    update(next: LongPressParams) {
      options = next;
    },
    destroy() {
      cancel();
      node.removeEventListener('pointerdown', down);
      node.removeEventListener('pointermove', move);
      node.removeEventListener('pointerup', cancel);
      node.removeEventListener('pointercancel', cancel);
      node.removeEventListener('contextmenu', contextmenu, true);
    },
  };
}

/** Settings of the `swipe` action. */
export interface SwipeParams {
  /** The way the finger flung: `left` usually means "next". */
  onswipe: (direction: 'left' | 'right') => void;
  /** Minimum horizontal travel in px. */
  distance?: number;
  /** False turns it off; on by default. */
  enabled?: boolean;
}

/**
 * A horizontal fling: more sideways than up or down, far enough, quick enough. Give the node
 * `touch-action: pan-y` so the browser keeps vertical scrolling and leaves sideways to us.
 */
export function swipe(node: HTMLElement, params: SwipeParams) {
  let options = params;
  let start: { x: number; y: number; t: number; id: number } | null = null;

  function down(event: PointerEvent) {
    if (event.pointerType !== 'touch' || !event.isPrimary || options.enabled === false) return;
    start = { x: event.clientX, y: event.clientY, t: performance.now(), id: event.pointerId };
  }
  function up(event: PointerEvent) {
    if (!start || event.pointerId !== start.id) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    const quick = performance.now() - start.t < 700;
    start = null;
    if (quick && Math.abs(dx) >= (options.distance ?? 60) && Math.abs(dx) > Math.abs(dy) * 1.6) {
      options.onswipe(dx < 0 ? 'left' : 'right');
    }
  }
  const cancel = () => (start = null);

  node.addEventListener('pointerdown', down);
  node.addEventListener('pointerup', up);
  node.addEventListener('pointercancel', cancel);
  return {
    update(next: SwipeParams) {
      options = next;
    },
    destroy() {
      node.removeEventListener('pointerdown', down);
      node.removeEventListener('pointerup', up);
      node.removeEventListener('pointercancel', cancel);
    },
  };
}

/**
 * Pull a sheet down by its grip: it follows the finger (resisting upwards), and closes when let
 * go far enough down or with a flick; otherwise it springs back.
 *
 * @param sheet finds the sheet when the pull starts (the grip's panel may be swapped meanwhile).
 * @returns the cleanup.
 */
export function dragToClose(
  handle: HTMLElement,
  sheet: () => HTMLElement | null,
  close: () => void,
) {
  let start: { y: number; t: number; id: number } | null = null;
  let dy = 0;

  function down(event: PointerEvent) {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    const el = sheet();
    if (!el) return;
    start = { y: event.clientY, t: performance.now(), id: event.pointerId };
    dy = 0;
    handle.setPointerCapture?.(event.pointerId);
    el.style.transition = 'none';
  }
  function move(event: PointerEvent) {
    if (!start || event.pointerId !== start.id) return;
    const el = sheet();
    if (!el) return;
    const raw = event.clientY - start.y;
    dy = raw > 0 ? raw : raw / 4;
    el.style.translate = `0 ${dy}px`;
    event.preventDefault();
  }
  function up(event: PointerEvent) {
    if (!start || event.pointerId !== start.id) return;
    const el = sheet();
    const speed = dy / Math.max(1, performance.now() - start.t);
    start = null;
    if (!el) return;
    const m = motion('base', 'out', el);
    el.style.transition = m.reduced ? 'none' : `translate ${m.duration}ms ${m.easing}`;
    if (dy > Math.min(140, el.offsetHeight * 0.3) || (dy > 24 && speed > 0.6)) {
      el.style.translate = `0 ${el.offsetHeight + 40}px`;
      setTimeout(close, m.reduced ? 0 : m.duration);
    } else {
      el.style.translate = '0 0';
    }
  }

  handle.addEventListener('pointerdown', down);
  handle.addEventListener('pointermove', move);
  handle.addEventListener('pointerup', up);
  handle.addEventListener('pointercancel', up);
  return () => {
    handle.removeEventListener('pointerdown', down);
    handle.removeEventListener('pointermove', move);
    handle.removeEventListener('pointerup', up);
    handle.removeEventListener('pointercancel', up);
  };
}
