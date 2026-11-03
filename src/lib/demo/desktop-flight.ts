// The Desktop OS example's "it went there" motion (Storybook only): a picture of a thing flies
// along an arc into where it now belongs — a file into the trash — and the target gives one
// squish as it lands. The real item has already left its list, so the page stays honest about
// its state; the flying copy is inert and removes itself.
import { motion } from '../utils/motion';

const centre = (r: DOMRect) => ({ x: r.left + r.width / 2, y: r.top + r.height / 2 });

/** Plays `frames` on `el`, resolving when done (or at once where WAAPI is missing). */
function play(el: Element, frames: Keyframe[], options: KeyframeAnimationOptions): Promise<void> {
  if (typeof el.animate !== 'function') return Promise.resolve();
  try {
    const anim = el.animate(frames, { fill: 'both', ...options });
    return anim.finished.then(
      () => undefined,
      () => undefined,
    );
  } catch {
    return Promise.resolve();
  }
}

/** One jelly squish on `target` (≤ 48px things may spring). */
export function squish(target: Element | null | undefined): void {
  if (!target) return;
  const m = motion('base', 'jelly', target);
  if (m.reduced) return;
  void play(
    target,
    [{ transform: 'none' }, { transform: 'scale(1.16, 0.84)' }, { transform: 'none' }],
    { duration: m.duration * 1.6, easing: m.easing, fill: 'none' },
  );
}

/**
 * Flies an inert copy of `source` into `target` (an arc: up and over, shrinking on the way)
 * and squishes the target when it lands. Without a target the copy shrinks away where it was;
 * under reduced motion it only fades.
 */
export async function flyInto(
  source: Element | null | undefined,
  target: Element | null | undefined,
): Promise<void> {
  if (!source?.isConnected) return squish(target);
  // Inside the page's theme root, so the copy keeps its tint, theme and shape.
  const host = source.closest('[data-theme], [data-tint]') ?? document.body;
  const from = source.getBoundingClientRect();
  const slow = motion('slow', 'in-out', source);

  const carrier = document.createElement('div');
  const copy = source.cloneNode(true) as HTMLElement;
  carrier.setAttribute('aria-hidden', 'true');
  carrier.inert = true;
  Object.assign(carrier.style, {
    position: 'fixed',
    left: `${from.left}px`,
    top: `${from.top}px`,
    width: `${from.width}px`,
    height: `${from.height}px`,
    zIndex: 'var(--z-toast)',
    pointerEvents: 'none',
  });
  Object.assign(copy.style, { margin: '0', width: '100%', height: '100%' });
  carrier.append(copy);
  host.append(carrier);

  try {
    if (slow.reduced || !target?.isConnected) {
      await play(
        copy,
        slow.reduced
          ? [{ opacity: 1 }, { opacity: 0 }]
          : [
              { opacity: 1, transform: 'none' },
              { opacity: 0, transform: 'scale(0.6)' },
            ],
        { duration: slow.duration, easing: slow.easing },
      );
      return;
    }
    const a = centre(from);
    const to = target.getBoundingClientRect();
    const b = centre(to);
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const end = Math.min(0.5, (to.width * 0.6) / Math.max(1, from.width));
    // A small hop up and over (a tenth of the way, 32–80px) above the higher of the two ends.
    const hop = Math.max(32, Math.min(80, Math.hypot(dx, dy) * 0.1));
    const peak = Math.min(0, dy) - hop;
    const duration = slow.duration * 1.7;
    const rise = motion('slow', 'out', source).easing;
    await Promise.all([
      // Across at a steady pace…
      play(carrier, [{ transform: 'none' }, { transform: `translateX(${dx}px)` }], {
        duration,
        easing: slow.easing,
      }),
      // …while it rises, then falls into the target, shrinking to the target's size.
      play(
        copy,
        [
          { transform: 'none', opacity: 1, easing: rise },
          {
            transform: `translateY(${peak}px) scale(0.85)`,
            opacity: 1,
            offset: 0.4,
            easing: slow.easing,
          },
          { transform: `translateY(${dy}px) scale(${end})`, opacity: 0.35 },
        ],
        { duration, easing: 'linear' },
      ),
    ]);
    squish(target);
  } finally {
    carrier.remove();
  }
}
