// Behaviour shared by the overlays (Dialog, Drawer, DetailPanel, the app jar, the palette):
// one focus trap, one backdrop-click rule.

const TABBABLE = [
  'a[href]',
  'area[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'summary',
  'iframe',
  'audio[controls]',
  'video[controls]',
  '[contenteditable]:not([contenteditable="false"])',
  '[tabindex]',
].join(',');

/** The elements Tab reaches inside `root`, in document order. */
export function tabbables(root: Element): HTMLElement[] {
  return [...root.querySelectorAll<HTMLElement>(TABBABLE)].filter((el) => {
    // An explicit tabindex decides; otherwise the selector already matched a native stop
    // (engines disagree on `tabIndex` for summary and contenteditable).
    const index = el.getAttribute('tabindex');
    if (index !== null && !(Number(index) >= 0)) return false;
    return !el.closest('[inert], [hidden], [aria-hidden="true"]');
  });
}

/** Keeps Tab / Shift+Tab inside `root`: wraps from the last tabbable to the first and back. */
export function trapTab(event: KeyboardEvent, root: HTMLElement): void {
  if (event.key !== 'Tab') return;
  const items = tabbables(root);
  const first = items[0];
  const last = items.at(-1);
  if (!first || !last) {
    event.preventDefault();
    root.focus();
    return;
  }
  const active = document.activeElement;
  const inside = active instanceof Node && root.contains(active);
  if (event.shiftKey && (active === first || active === root || !inside)) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && (active === last || !inside)) {
    event.preventDefault();
    first.focus();
  }
}

/** Whether a keyboard event comes from inside another modal than `own` — e.g. a Dialog opened
 *  from a panel, even one rendered inside the panel's markup — so `own` must leave it alone. */
export function fromOtherModal(event: Event, own: Element | undefined): boolean {
  const target = event.target;
  if (!(target instanceof Element)) return false;
  const modal = target.closest('dialog[open], [aria-modal="true"]');
  return !!modal && modal !== own;
}

function outside(node: HTMLElement, event: MouseEvent): boolean {
  if (event.target !== node) return false;
  const box = node.getBoundingClientRect();
  // No layout (tests, a display: contents host): the dialog itself was hit, that is the backdrop.
  if (!box.width && !box.height) return true;
  const { clientX: x, clientY: y } = event;
  return x < box.left || x > box.right || y < box.top || y > box.bottom;
}

/**
 * Svelte action for a native `<dialog>`: calls `handler` for a click on its backdrop. Both the
 * press and the release must land there, so a text selection or a drag that starts inside and
 * ends beside the dialog never closes it.
 *
 *   <dialog use:backdropClick={() => onclose()}>
 */
export function backdropClick(node: HTMLElement, handler: (() => void) | undefined) {
  let current = handler;
  let pressed = false;
  const down = (event: PointerEvent) => {
    pressed = outside(node, event);
  };
  const click = (event: MouseEvent) => {
    const hit = pressed && outside(node, event);
    pressed = false;
    if (hit) current?.();
  };
  node.addEventListener('pointerdown', down);
  node.addEventListener('click', click);
  return {
    update(next: (() => void) | undefined) {
      current = next;
    },
    destroy() {
      node.removeEventListener('pointerdown', down);
      node.removeEventListener('click', click);
    },
  };
}
