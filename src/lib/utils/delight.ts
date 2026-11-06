import { prefersReducedMotion } from './motion';
/**
 * Delight — small, optional moments of joy. Rule of thumb: delight shows up at the *end* of a
 * task (done, saved, sent) or where nothing else happens (empty states, idle), never in the way
 * of work and never in error messages. Everything here is a no-op for reduced motion.
 */

const PALETTE = [
  '--color-pink',
  '--color-yellow',
  '--color-mint',
  '--color-blue',
  '--color-purple',
];

export interface Greeting {
  /** "Good morning" … */
  text: string;
  /** A short, optional wink for the current moment, e.g. "Almost weekend." */
  wink: string;
}

/** A time-of-day greeting with a small wink; `name` is appended when given. */
export function greeting(date: Date = new Date(), name?: string): Greeting {
  const h = date.getHours();
  const base =
    h < 5
      ? 'Still up'
      : h < 12
        ? 'Good morning'
        : h < 17
          ? 'Good afternoon'
          : h < 22
            ? 'Good evening'
            : 'Good night';
  const day = date.getDay();
  const wink =
    h < 5
      ? 'The quietest hour is a fine hour.'
      : day === 1 && h < 12
        ? 'Fresh week, fresh coffee.'
        : day === 5 && h >= 12
          ? 'Almost weekend.'
          : day === 0 || day === 6
            ? 'Weekend mode, gently.'
            : h >= 12 && h < 14
              ? 'Lunch is a feature, not a bug.'
              : h >= 17
                ? 'Wrap it up nicely.'
                : 'Have a good one.';
  return { text: name ? `${base}, ${name}` : base, wink };
}

const reducedMotion = prefersReducedMotion;

/**
 * A tiny burst of candy sprinkles from the centre of `origin` — for a completed task, a saved
 * form, a sent message. Fixed-positioned in <body> so no container clips it; removes itself.
 * Returns the number of sprinkles thrown (0 with reduced motion or without a DOM).
 */
export function celebrate(origin: Element, count = 10): number {
  if (typeof document === 'undefined' || reducedMotion()) return 0;
  const box = origin.getBoundingClientRect();
  const x = box.left + box.width / 2;
  const y = box.top + box.height / 2;
  for (let i = 0; i < count; i++) {
    const dot = document.createElement('span');
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
    const dist = 26 + Math.random() * 30;
    const long = i % 3 === 0;
    Object.assign(dot.style, {
      position: 'fixed',
      left: `${x}px`,
      top: `${y}px`,
      width: long ? '9px' : '6px',
      height: long ? '3px' : '6px',
      borderRadius: '999px',
      background: `var(${PALETTE[i % PALETTE.length]})`,
      pointerEvents: 'none',
      zIndex: '9999',
      animation: 'bb-sprinkle 640ms cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
    });
    dot.style.setProperty('--dx', `${Math.cos(angle) * dist}px`);
    dot.style.setProperty('--dy', `${Math.sin(angle) * dist - 10}px`);
    dot.style.setProperty('--rot', `${Math.round(Math.random() * 360)}deg`);
    dot.setAttribute('aria-hidden', 'true');
    dot.addEventListener('animationend', () => dot.remove(), { once: true });
    // Fallback cleanup where animations never end (tests, background tabs).
    setTimeout(() => dot.remove(), 1200);
    document.body.append(dot);
  }
  return count;
}

/**
 * Svelte action: throws sprinkles whenever `when` turns truthy.
 *
 *   <button use:sprinkles={saved}>Save</button>
 */
export function sprinkles(node: Element, when: unknown) {
  let last = !!when;
  return {
    update(next: unknown) {
      if (next && !last) celebrate(node);
      last = !!next;
    },
  };
}

/** Friendly words for waiting, rotating so long waits feel alive. */
export const waitingLines: readonly string[] = [
  'Polishing pixels…',
  'Unwrapping the data…',
  'Almost there…',
  'Counting sprinkles…',
];

/** Picks a waiting line that changes every `seconds` (deterministic per time slot). */
export function waitingLine(now: number = Date.now(), seconds = 3): string {
  return waitingLines[Math.floor(now / 1000 / seconds) % waitingLines.length]!;
}
