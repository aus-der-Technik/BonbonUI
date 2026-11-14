/** Storybook-only mock workbook for the Spreadsheet example: a small candy shop's year. */
import { type Inputs, type NumberFormat } from '../utils/sheet';
export type CellAlign = 'left' | 'center' | 'right';
export interface CellStyle {
    format?: NumberFormat | undefined;
    bold?: boolean | undefined;
    align?: CellAlign | undefined;
}
/** A column filter: text values to hide, or a numeric window. */
export interface ColumnFilter {
    hidden?: string[];
    min?: number | null;
    max?: number | null;
}
export interface ChartRange {
    r1: number;
    c1: number;
    r2: number;
    c2: number;
}
export interface SheetModel {
    id: string;
    name: string;
    rows: number;
    cols: number;
    /** Column widths in px. */
    widths: number[];
    /** Default number format per column; a cell's own style wins. */
    colFormats: NumberFormat[];
    inputs: Inputs;
    styles: Record<string, CellStyle>;
    /** The rows a sort or filter acts on (0-based, inclusive): the header and totals stay put. */
    body: [number, number] | null;
    /** Stable ids so rows can slide to their new place when sorted. */
    rowIds: string[];
    sort: {
        col: number;
        dir: 'asc' | 'desc';
    } | null;
    filters: Record<number, ColumnFilter>;
    chart: ChartRange | null;
}
export declare const newRowId: () => string;
/** A fresh, empty sheet. */
export declare function blankSheet(n: number): SheetModel;
/** The whole workbook, fresh. */
export declare function mockWorkbook(): SheetModel[];
export declare const sheetPeople: ({
    name: string;
    presence: "online";
} | {
    name: string;
    presence: "away";
} | {
    name: string;
    presence?: never;
})[];
