export interface Column {
    key: string;
    label: string;
    sortable?: boolean;
    align?: 'start' | 'end';
    /** Hides the column on narrow screens (below 700px). */
    hideOnMobile?: boolean;
    /** Keeps the cell on one line. */
    nowrap?: boolean;
}
export type SortOrder = 'asc' | 'desc';
/** What the selection bar's snippets receive. */
export interface TableSelection<T> {
    /** Keys of every selected row, including rows not on screen (other pages). */
    keys: string[];
    /** The selected rows among the rows on screen. */
    rows: T[];
    count: number;
    clear: () => void;
}
/**
   * DataTable organism — a report table on a glass card (e.g. "All feedback").
   * Sortable headers announce `aria-sort`; with a `detail` snippet each row toggles open on
   * click / Enter / Space (selecting text does not toggle). Cells render `cell(row, column)`
   * when given, else `row[column.key]`. Sorting and paging stay with the app: the table only
   * reports `onsort(key)`; put a `Pager` under it.
   *
   * Rows can also lead somewhere: `rowHref` puts a real link in the first cell, stretched over
   * the whole row (middle-click and "open in new tab" work, routers see an ordinary link);
   * `onrowclick` is for rows that act instead of navigate. With both, a plain click calls
   * `onrowclick` (e.g. a client-side router) while modified clicks keep the browser's link
   * behaviour. Clicks on buttons, links and inputs inside a cell never trigger the row. With
   * `rowHref`, keep other links out of the first column (a link cannot hold a link).
   * `singleOpen` keeps at most one detail open; `ontoggle`
   * reports opening, e.g. to load a detail lazily. `hideHeader` for plain lists. Hovered and
   * selected rows light up in the tint with rounded ends, like a list on a tablet.
   *
   * `current` lifts the one row on screen (e.g. the version shown) onto the selected layer
   * (it was called `selected` before row selection existed).
   * `selectable` adds a checkbox column for picking many rows: `selected` (bindable) holds their
   * keys — across pages, the header box selects or clears the rows on screen (dash when some
   * are picked), Shift+click picks a range, and Space toggles the focused row. A row without an
   * action of its own also toggles on click. `selectionActions` puts a bar right above the table
   * — "n selected", your actions, Clear — so bulk tools sit where the selection is;
   * `selectionDetail` adds a full-width line under it (e.g. a running bulk job).
   * `highlight` glows a row once whenever it changes to that row's key (a row just added or
   * updated), also when the row only appears later; `rowClass` adds your own classes per row
   * (style them with `:global`).
   *
   *   <DataTable {columns} rows={page} rowKey={(r) => r.id} {sort} {order} {onsort} />
   *   <DataTable … selectable bind:selected>
   *     {#snippet selectionActions({ keys })}<Button label="Export" onclick={() => run(keys)} />{/snippet}
   *   </DataTable>
   */
import type { Snippet } from 'svelte';
import type { IconName } from '../atoms/icons';
declare function $$render<T>(): {
    props: {
        columns: Column[];
        rows: T[];
        rowKey: (row: T) => string;
        sort?: string | undefined;
        order?: SortOrder;
        onsort?: ((key: string) => void) | undefined;
        cell?: Snippet<[T, Column]> | undefined;
        detail?: Snippet<[T]> | undefined;
        /** The rows are narrowed by a search or filters: the empty state says so. */
        filtered?: boolean;
        emptyTitle?: string | undefined;
        /** Default: "Nothing here yet.", or `emptyFilteredMessage` when `filtered`. */
        emptyMessage?: string | undefined;
        emptyFilteredMessage?: string;
        emptyIcon?: IconName | undefined;
        /** @deprecated Use `emptyMessage`. */
        emptyText?: string | undefined;
        /** Accessible name, e.g. the id of the card heading. */
        labelledby?: string | undefined;
        rowHref?: ((row: T) => string | undefined) | undefined;
        onrowclick?: ((row: T) => void) | undefined;
        /** Key of the one row on screen (e.g. the version shown): lifted onto the selected layer. */
        current?: string | undefined;
        singleOpen?: boolean;
        hideHeader?: boolean;
        ontoggle?: ((row: T, open: boolean) => void) | undefined;
        /** Adds a checkbox column for picking rows. */
        selectable?: boolean;
        /**
         * Keys of the picked rows (bindable); kept across pages and sorting. A single string is the
         * 1.x meaning — the one row on screen — kept for existing apps.
         * @deprecated as a string: use `current`.
         */
        selected?: string[] | string;
        onselectionchange?: ((keys: string[]) => void) | undefined;
        /** Actions in the bar right above the table while rows are picked. */
        selectionActions?: Snippet<[TableSelection<T>]> | undefined;
        /** A full-width line under the bar's actions, e.g. the progress of a bulk job. */
        selectionDetail?: Snippet<[TableSelection<T>]> | undefined;
        /** `always` keeps the bar (with `selectionHint`) while nothing is picked. */
        selectionBar?: "auto" | "always";
        selectionHint?: string;
        selectAllLabel?: string;
        selectRowLabel?: ((row: T) => string) | undefined;
        selectedLabel?: (count: number) => string;
        clearSelectionLabel?: string;
        /** Your own classes per row; style them with `:global(...)`. */
        rowClass?: ((row: T) => string | undefined) | undefined;
        /** Glows that row once each time this changes to its key, and scrolls it into view. */
        highlight?: string | undefined;
        /** A full-width first row in the body, e.g. a draft row for "New …": create sits on the
         *  collection it adds to. It shows even while the table is empty. */
        leading?: Snippet | undefined;
    };
    exports: {};
    bindings: "selected";
    slots: {};
    events: {};
};
declare class __sveltets_Render<T> {
    props(): ReturnType<typeof $$render<T>>['props'];
    events(): ReturnType<typeof $$render<T>>['events'];
    slots(): ReturnType<typeof $$render<T>>['slots'];
    bindings(): "selected";
    exports(): {};
}
interface $$IsomorphicComponent {
    new <T>(options: import('svelte').ComponentConstructorOptions<ReturnType<__sveltets_Render<T>['props']>>): import('svelte').SvelteComponent<ReturnType<__sveltets_Render<T>['props']>, ReturnType<__sveltets_Render<T>['events']>, ReturnType<__sveltets_Render<T>['slots']>> & {
        $$bindings?: ReturnType<__sveltets_Render<T>['bindings']>;
    } & ReturnType<__sveltets_Render<T>['exports']>;
    <T>(internal: unknown, props: ReturnType<__sveltets_Render<T>['props']> & {}): ReturnType<__sveltets_Render<T>['exports']>;
    z_$$bindings?: ReturnType<__sveltets_Render<any>['bindings']>;
}
declare const DataTable: $$IsomorphicComponent;
type DataTable<T> = InstanceType<typeof DataTable<T>>;
export default DataTable;
