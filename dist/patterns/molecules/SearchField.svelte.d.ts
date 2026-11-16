/**
   * SearchField molecule — a search input with the magnifier inside. Heights follow the control
   * scale like Input and Button: `lg` (44px) is a page's main search, `md` (36px, default) a
   * toolbar filter like "Filter loaded rows", `sm` (32px) a dense one. Focus lights the border and a
   * soft halo in the accent; `shape="pill"` rounds it fully for headers and glass toolbars.
   *
   *   <SearchField label="Search orders" placeholder="Order no., customer…" bind:value={term} />
   */
import type { HTMLInputAttributes } from 'svelte/elements';
interface Props extends Omit<HTMLInputAttributes, 'size' | 'value' | 'class'> {
    value?: string;
    /** Accessible name (visually hidden). */
    label: string;
    size?: 'sm' | 'md' | 'lg';
    shape?: 'rounded' | 'pill';
    class?: string;
    element?: HTMLInputElement | undefined;
}
declare const SearchField: import("svelte").Component<Props, {}, "value" | "element">;
type SearchField = ReturnType<typeof SearchField>;
export default SearchField;
