export interface GridColumn {
    name: string;
    /** SQL-ish type, shown under the name; decides the editor (number, checkbox, tags, text). */
    type: string;
    locked?: boolean;
}
export type CellValue = string | number | boolean | null | Record<string, unknown> | unknown[];
export type GridRow = Record<string, CellValue>;
export type CellKind = 'text' | 'number' | 'bool' | 'list' | 'struct';
export declare function cellKind(type: string): CellKind;
/** Turns editor text into the value to store: numbers parse, empty numbers become NULL. */
export declare function parseCell(kind: CellKind, text: string): CellValue;
/** The `step` of a number editor: 1 for integers, the scale of a `decimal(p,s)`, else any. */
export declare function stepFor(type: string): string;
/**
 * A list cell's items as strings, for its tags. NULL is no tags; a string holding a JSON array
 * is parsed, any other string is one item; non-string items are shown as JSON.
 */
export declare function listItems(value: CellValue | undefined): string[];
/** How a value reads in a cell, and how it starts in an editor. */
export declare function cellText(value: CellValue | undefined): string;
import type { IconName } from '../atoms/icons';
interface Props {
    columns: GridColumn[];
    rows: GridRow[];
    editable?: boolean;
    /** Long values break onto several lines instead of being cut off. */
    wrap?: boolean;
    /** A new row being entered at the bottom; `null` hides the draft row. */
    draft?: GridRow | null;
    /** Shows the "+ New row" row after the last row. Default: when `ondraftsubmit` is set. */
    addRow?: boolean | undefined;
    addRowLabel?: string;
    saveRowLabel?: string;
    cancelRowLabel?: string;
    /** Row number cell of the draft row. */
    draftRowLabel?: string;
    /** Accessible name of a draft cell. */
    draftCellLabel?: (column: string) => string;
    /** Accessible name of a cell's editor. */
    cellLabel?: (column: string, row: string | number) => string;
    /** Accessible name of the row-number column. */
    rowHeaderLabel?: string;
    /** Added to the type of a locked column. */
    readOnlyLabel?: string;
    /** Tooltip of a column resize handle. */
    resizeHint?: string;
    resizeLabel?: (column: string) => string;
    emptyTitle?: string | undefined;
    emptyMessage?: string | undefined;
    emptyIcon?: IconName | undefined;
    /** @deprecated Use `emptyMessage`. */
    emptyText?: string | undefined;
    nullLabel?: string;
    label?: string | undefined;
    /** What Enter does after saving: move to the cell below, or stay. */
    enterMoves?: 'down' | 'stay';
    /** Commit numbers as the typed text, never through a JavaScript double. */
    numbersAsText?: boolean;
    /** Whether an emptied cell means NULL rather than an empty string. Default: numbers only. */
    nullWhenEmpty?: ((column: GridColumn) => boolean) | undefined;
    /** Tags a list cell shows before "+n" when not wrapping. */
    listMax?: number;
    /** Row number shown in the margin, e.g. the position before filtering. */
    rowLabel?: ((row: GridRow, index: number) => string | number) | undefined;
    /** A row to flash green and scroll to, e.g. one just added. */
    highlight?: number | null | undefined;
    resizable?: boolean;
    /** Column widths in px by column name (bindable); empty means natural widths. */
    widths?: Record<string, number>;
    minColumnWidth?: number;
    /** Milliseconds before an armed delete disarms itself. */
    disarmAfter?: number;
    /** The scrolling element, e.g. to keep the position across a reload (bindable). */
    viewport?: HTMLDivElement | undefined;
    /** Accessible name of a row's delete control. */
    deleteLabel?: (row: string | number) => string;
    /** Text of the armed delete control. */
    confirmDeleteLabel?: string;
    /** Placeholder of a list cell's tag editor. */
    addTagLabel?: string;
    /** Placeholder of a locked column in the draft row. */
    lockedLabel?: string;
    /** Persist one cell; reject to mark the cell failed and keep the old value. */
    oncommit?: ((rowIndex: number, column: string, value: CellValue) => Promise<void> | void) | undefined;
    ondelete?: ((rowIndex: number) => Promise<void> | void) | undefined;
    ondraftsubmit?: (() => void) | undefined;
    ondraftcancel?: (() => void) | undefined;
    /** A click on a cell that cannot be edited, e.g. to explain why. */
    onlockedclick?: ((column: GridColumn, rowIndex: number) => void) | undefined;
    /** Why a cell cannot be edited, shown in a bubble at that cell when it is clicked. */
    lockedHint?: string | ((column: GridColumn, row: GridRow, rowIndex: number) => string | undefined) | undefined;
    /** The reason shown at the cell when `oncommit` rejects; nothing returned = ring only. */
    errorMessage?: ((error: unknown, column: GridColumn, rowIndex: number) => string | undefined) | undefined;
    /** Milliseconds a locked hint stays; a save error stays twice as long. */
    hintDuration?: number;
    /** A number editor held something that is not a number; nothing was saved. */
    oninvalid?: ((column: GridColumn, rowIndex: number) => void) | undefined;
    /** Scrolled near the last row (or the rows do not fill the view): load more. */
    onnearend?: (() => void) | undefined;
    onresize?: ((widths: Record<string, number>) => void) | undefined;
}
declare const EditableGrid: import("svelte").Component<Props, {}, "draft" | "widths" | "viewport">;
type EditableGrid = ReturnType<typeof EditableGrid>;
export default EditableGrid;
