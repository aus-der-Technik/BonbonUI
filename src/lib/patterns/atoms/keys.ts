/**
 * Keyboard shortcuts written once, shown the way each platform writes them.
 *
 * Write shortcuts with the neutral names `Mod` (⌘ on Apple, Ctrl elsewhere), `Alt`, `Shift`,
 * `Ctrl` and plain keys: `['Mod', 'Shift', 'Z']`. `keyLabels` turns them into what the key caps
 * show; `ariaKeyShortcuts` into the `aria-keyshortcuts` value assistive tech expects. Keys that are
 * already symbols (`⌘`, `↑`) pass through.
 */

/** Whether the shortcuts should be written the Apple way (⌘ ⌥ ⇧). */
export function isApplePlatform(): boolean {
  if (typeof navigator === 'undefined') return false;
  const platform =
    (navigator as Navigator & { userAgentData?: { platform?: string } }).userAgentData?.platform ??
    navigator.platform ??
    navigator.userAgent;
  return /Mac|iPhone|iPad|iPod/i.test(platform || navigator.userAgent);
}

const APPLE: Record<string, string> = {
  Mod: '⌘',
  Meta: '⌘',
  Cmd: '⌘',
  Alt: '⌥',
  Option: '⌥',
  Shift: '⇧',
  Ctrl: '⌃',
  Control: '⌃',
  Enter: '↵',
  Backspace: '⌫',
  Delete: '⌫',
};

const OTHER: Record<string, string> = {
  Mod: 'Ctrl',
  Meta: 'Win',
  Cmd: 'Ctrl',
  Option: 'Alt',
  Control: 'Ctrl',
  Enter: '↵',
  Backspace: '⌫',
  Delete: 'Del',
};

const SHARED: Record<string, string> = {
  ArrowUp: '↑',
  ArrowDown: '↓',
  ArrowLeft: '←',
  ArrowRight: '→',
  Escape: 'Esc',
};

/** What the key caps show for `keys` on this (or the given) platform. */
export function keyLabels(keys: readonly string[], apple = isApplePlatform()): string[] {
  const table = apple ? APPLE : OTHER;
  return keys.map((key) => table[key] ?? SHARED[key] ?? key);
}

const ARIA: Record<string, string> = {
  '⌘': 'Meta',
  Cmd: 'Meta',
  Meta: 'Meta',
  '⌥': 'Alt',
  Option: 'Alt',
  Alt: 'Alt',
  '⇧': 'Shift',
  Shift: 'Shift',
  '⌃': 'Control',
  Ctrl: 'Control',
  Control: 'Control',
  '↵': 'Enter',
  '⌫': 'Backspace',
  Del: 'Delete',
  Esc: 'Escape',
  '↑': 'ArrowUp',
  '↓': 'ArrowDown',
  '←': 'ArrowLeft',
  '→': 'ArrowRight',
};

/** The `aria-keyshortcuts` value for `keys`, e.g. `['Mod', 'B']` → `Meta+B` on Apple. */
export function ariaKeyShortcuts(keys: readonly string[], apple = isApplePlatform()): string {
  return keys
    .map((key) =>
      key === 'Mod'
        ? apple
          ? 'Meta'
          : 'Control'
        : (ARIA[key] ?? (key.length === 1 ? key.toUpperCase() : key)),
    )
    .join('+');
}
