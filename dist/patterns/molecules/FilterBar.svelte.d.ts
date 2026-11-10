/**
   * FilterBar molecule — the glass card holding a dashboard's filters in one wrapping row, their
   * bottoms aligned. `actions` sit at the far end (e.g. "Reset"). It lifts itself above the cards
   * below so open dropdowns are not clipped.
   *
   *   <FilterBar><SearchField label="Search" /><MultiSelect … /></FilterBar>
   */
import type { Snippet } from 'svelte';
interface Props {
    label?: string;
    /** Buttons at the end of the row, e.g. "Reset" or "Export". */
    actions?: Snippet | undefined;
    children: Snippet;
}
declare const FilterBar: import("svelte").Component<Props, {}, "">;
type FilterBar = ReturnType<typeof FilterBar>;
export default FilterBar;
