/** The elements Tab reaches inside `root`, in document order. */
export declare function tabbables(root: Element): HTMLElement[];
/** Keeps Tab / Shift+Tab inside `root`: wraps from the last tabbable to the first and back. */
export declare function trapTab(event: KeyboardEvent, root: HTMLElement): void;
/** Whether a keyboard event comes from inside another modal than `own` — e.g. a Dialog opened
 *  from a panel, even one rendered inside the panel's markup — so `own` must leave it alone. */
export declare function fromOtherModal(event: Event, own: Element | undefined): boolean;
/**
 * Svelte action for a native `<dialog>`: calls `handler` for a click on its backdrop. Both the
 * press and the release must land there, so a text selection or a drag that starts inside and
 * ends beside the dialog never closes it.
 *
 *   <dialog use:backdropClick={() => onclose()}>
 */
export declare function backdropClick(node: HTMLElement, handler: (() => void) | undefined): {
    update(next: (() => void) | undefined): void;
    destroy(): void;
};
