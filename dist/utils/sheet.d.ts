/**
 * A small spreadsheet engine — addresses, a formula
 * evaluator (numbers, + - * /, parentheses, B3, B2:B9, SUM / AVERAGE / MIN / MAX / COUNT), sheet
 * evaluation with loop detection, dependents for the recalc cue, and the reference rewriting that
 * fill, sort and insert need. Errors are values with a plain explanation, never exceptions.
 */
export type ErrorKind = 'cycle' | 'div0' | 'ref' | 'name' | 'syntax' | 'value';
export interface SheetError {
    error: ErrorKind;
    /** Extra context for the explanation: the loop path, the misspelt name, the zero cell. */
    detail?: string | undefined;
}
/** A computed cell: a number, text, an error, or `null` for an empty cell. */
export type Value = number | string | SheetError | null;
export interface Address {
    col: number;
    row: number;
}
export declare const isError: (value: unknown) => value is SheetError;
/** 0 → A, 25 → Z, 26 → AA. */
export declare function colName(col: number): string;
/** A → 0, AA → 26. */
export declare function colIndex(name: string): number;
/** Zero-based column and row → "B3". */
export declare const cellKey: (col: number, row: number) => string;
export declare function parseKey(key: string): Address | null;
/** What a typed, non-formula input means: a number ("1,200", "12%", "€40"), text, or empty. */
export declare function parseLiteral(input: string | undefined): Value;
export type NumberFormat = 'auto' | 'number' | 'currency' | 'percent';
/** Formats a number for a cell; `auto` keeps up to two decimals without grouping noise. */
export declare function formatNumber(value: number, format?: NumberFormat): string;
/** Short form for chart labels: €12.4K, 12.4K, 34%. */
export declare function formatCompact(value: number, format?: NumberFormat): string;
/** A short cell label and a one-sentence "what happened, what to do". */
export declare function errorInfo(err: SheetError): {
    label: string;
    message: string;
};
export interface FunctionInfo {
    name: string;
    args: string[];
    about: string;
}
export declare const FUNCTIONS: FunctionInfo[];
export type TokenType = 'num' | 'ref' | 'range' | 'name' | 'op' | '(' | ')' | ',' | 'bad' | 'space';
export interface Token {
    type: TokenType;
    text: string;
    /** Offset in the source string. */
    start: number;
}
/** Splits a formula body (without "=") into tokens; unknown characters become `bad`. */
export declare function tokenize(src: string): Token[];
/** Reads one cell's computed value while a formula is evaluated. */
export type CellReader = (col: number, row: number) => Value;
/** Evaluates a formula body (without "=") against a cell reader. */
export declare function evaluateFormula(src: string, read: CellReader): Value;
/** Inputs as typed, keyed by address ("B3" → "=SUM(B2:B9)"). */
export type Inputs = Record<string, string>;
/** Computes every cell; cells in a reference loop get a `cycle` error naming the loop. */
export declare function evaluateSheet(inputs: Inputs): Record<string, Value>;
/** Every cell a formula reads, ranges expanded ("=B2+SUM(C1:C2)" → B2, C1, C2). */
export declare function precedents(input: string | undefined): string[];
/** Cells that (transitively) read any of `keys`, with how many steps away they are. */
export declare function dependents(inputs: Inputs, keys: string[]): {
    key: string;
    depth: number;
}[];
export interface FormulaRef {
    text: string;
    /** Offsets in the full input, "=" included. */
    start: number;
    end: number;
    from: Address;
    to: Address;
}
export declare function formulaRefs(input: string): FormulaRef[];
interface RefPart {
    col: number;
    row: number;
    absCol: boolean;
    absRow: boolean;
}
/**
 * Rewrites every reference of a formula. `single` maps a lone reference, `range` both ends of a
 * range at once; returning `null` turns the reference into #REF!.
 */
export declare function mapRefs(input: string, single: (p: RefPart) => RefPart | null, range?: (a: RefPart, b: RefPart) => [RefPart, RefPart] | null): string;
/** Moves the relative references of a formula, as copying or filling it does. */
export declare function shiftFormula(input: string, dCol: number, dRow: number): string;
/** Any keyed record (inputs, styles) moved by the same cell mapping. */
export declare function moveKeys<T>(record: Record<string, T>, move: (a: Address) => Address): Record<string, T>;
/**
 * Inserts an empty row at `at`. References below move down; a range that ends right above the
 * new row grows to include it, so a total keeps counting a row added at the end of its list.
 */
export declare function insertRow(inputs: Inputs, at: number): Inputs;
/** Inserts an empty column at `at`, the same way. */
export declare function insertColumn(inputs: Inputs, at: number): Inputs;
/**
 * Re-orders rows (`rowMap[old] = new`, rows not in the map stay). References into one row follow
 * it, so "=SUM(B4:E4)" moves with its row and a total pointing at one row still finds it; ranges
 * over several rows keep their extent, as a sort only shuffles inside them.
 */
export declare function moveRows(inputs: Inputs, rowMap: Record<number, number>): Inputs;
/** Sort order for a column: numbers ascending, then text A–Z, blanks and errors last. */
export declare function sortOrder(values: Value[], dir: 'asc' | 'desc'): number[];
/**
 * What dragging the fill handle produces: formulas shift by their distance, a run of two or more
 * numbers continues its step (1, 2 → 3, 4), anything else repeats.
 */
export declare function fillSeries(sources: string[], count: number, dCol: number, dRow: number): string[];
export interface FormulaContext {
    /** Function names matching the word being typed. */
    matches: FunctionInfo[];
    /** The word being typed and where it starts. */
    word?: {
        text: string;
        start: number;
    };
    /** The function call the caret is inside, and which argument. */
    call?: {
        fn: FunctionInfo;
        arg: number;
    };
}
/** What to suggest at the caret of a formula being typed. */
export declare function formulaContext(input: string, caret: number): FormulaContext;
/** The first known function of a formula, for a hint when the caret is outside every call. */
export declare function firstCall(input: string): {
    fn: FunctionInfo;
    arg: number;
} | undefined;
/** True where a click on a cell should insert its address into the formula being typed. */
export declare function canPoint(input: string, caret: number): boolean;
export {};
