import type { AnchorPlacement } from './anchor';
export type PopoverPlacement = AnchorPlacement;
/** Spread these on your own trigger element (the `trigger` snippet's argument). */
export interface PopoverTriggerProps {
    'aria-expanded': boolean;
    /** Only while the panel is rendered, so it never points at a missing id. */
    'aria-controls': string | undefined;
    'aria-haspopup': 'dialog';
    onclick: (event: MouseEvent) => void;
}
/**
   * Popover molecule — a floating liquid-glass panel anchored to its trigger: filters, a date
   * picker, a reaction picker, a short form. A click on the trigger toggles it; Escape, a click
   * outside or `close()` from inside shuts it and returns focus to the trigger. It renders in the
   * top layer (popover API) where supported, so scrolling containers never clip it, and flips
   * above the trigger when there is no room below. `placement="right-start"` (or `left…`) opens
   * it beside the trigger — from a vertical rail or a sidebar — and flips to the other side when
   * the room runs out; `center` lays it over the trigger. Focus moves to the first control
   * inside, or to an element marked `data-autofocus`.
   *
   *   <Popover label="Filters" icon="filter">…form…</Popover>
   *   <Popover title="Share">{#snippet trigger(props)}<button {...props}>Share</button>{/snippet}…</Popover>
   */
import type { Snippet } from 'svelte';
import type { IconName } from '../atoms/icons';
interface Props {
    open?: boolean;
    /** Text of the default trigger button and accessible name of the panel. */
    label?: string;
    icon?: IconName | undefined;
    /** Default trigger shows only its icon. */
    iconOnly?: boolean;
    variant?: 'primary' | 'secondary' | 'glass' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    /** A heading inside the panel. */
    title?: string | undefined;
    placement?: PopoverPlacement;
    /** Panel width (any CSS length); content decides when unset. */
    width?: string | undefined;
    /** Inner padding of the panel. */
    padding?: 'none' | 'sm' | 'md';
    /** Moves focus into the panel when it opens. */
    autofocus?: boolean;
    /** Your own trigger instead of the button; spread the props onto it. */
    trigger?: Snippet<[PopoverTriggerProps]> | undefined;
    onopenchange?: ((open: boolean) => void) | undefined;
    /** The content; receives a `close` function. */
    children: Snippet<[() => void]>;
}
declare const Popover: import("svelte").Component<Props, {
    close: () => void;
}, "open">;
type Popover = ReturnType<typeof Popover>;
export default Popover;
