/** Storybook-only mock workbook for the Spreadsheet example: a small candy shop's year. */
import { cellKey, type Inputs, type NumberFormat } from './sheet-formula';

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
  sort: { col: number; dir: 'asc' | 'desc' } | null;
  filters: Record<number, ColumnFilter>;
  chart: ChartRange | null;
}

let nextRow = 0;
export const newRowId = (): string => `r${++nextRow}`;

function sheet(
  id: string,
  name: string,
  size: { rows: number; cols: number },
  widths: number[],
  colFormats: NumberFormat[],
  grid: (string | number)[][],
  options: { body?: [number, number]; bold?: number[] } = {},
): SheetModel {
  const inputs: Inputs = {};
  const styles: Record<string, CellStyle> = {};
  grid.forEach((line, row) =>
    line.forEach((value, col) => {
      if (value !== '') inputs[cellKey(col, row)] = String(value);
    }),
  );
  for (const row of options.bold ?? []) {
    for (let col = 0; col < size.cols; col++) styles[cellKey(col, row)] = { bold: true };
  }
  return {
    id,
    name,
    ...size,
    widths: Array.from({ length: size.cols }, (_, c) => widths[c] ?? 104),
    colFormats: Array.from({ length: size.cols }, (_, c) => colFormats[c] ?? 'auto'),
    inputs,
    styles,
    body: options.body ?? null,
    rowIds: Array.from({ length: size.rows }, newRowId),
    sort: null,
    filters: {},
    chart: null,
  };
}

const products: [string, number, number, number, number][] = [
  ['Chocolate bars', 18400, 17200, 16100, 24800],
  ['Fruit gums', 12650, 13900, 14300, 16950],
  ['Gift boxes', 8900, 7600, 9100, 21400],
  ['Caramel fudge', 7100, 6900, 7400, 9800],
  ['Lollipops', 6400, 7350, 8200, 7900],
  ['Marshmallows', 5200, 4800, 6100, 7300],
  ['Toffee', 4300, 4100, 3900, 6200],
  ['Licorice', 3900, 4200, 4450, 4700],
  ['Sour drops', 0, 2800, 5600, 7900],
  ['Candy jars', 2500, 2700, 3100, 5400],
];

/** Quarterly sales: totals per product and quarter, growth Q1 → Q4. Sour drops launched in Q2. */
function sales(): SheetModel {
  const rows = products.map(([name, ...q], i) => {
    const r = i + 2;
    return [name, ...q, `=SUM(B${r}:E${r})`, `=(E${r}-B${r})/B${r}`];
  });
  const model = sheet(
    'sales',
    'Sales 2026',
    { rows: 22, cols: 9 },
    [148, 100, 100, 100, 100, 112, 92],
    ['auto', 'currency', 'currency', 'currency', 'currency', 'currency', 'percent'],
    [
      ['Product', 'Q1', 'Q2', 'Q3', 'Q4', 'Year', 'Growth'],
      ...rows,
      [
        'Total',
        '=SUM(B2:B11)',
        '=SUM(C2:C11)',
        '=SUM(D2:D11)',
        '=SUM(E2:E11)',
        '=SUM(F2:F11)',
        '=(E12-B12)/B12',
      ],
      [
        'Average',
        '=AVERAGE(B2:B11)',
        '=AVERAGE(C2:C11)',
        '=AVERAGE(D2:D11)',
        '=AVERAGE(E2:E11)',
        '=AVERAGE(F2:F11)',
      ],
      [],
      ['Best product', '=MAX(F2:F11)'],
      ['Products on sale', '=COUNT(F2:F11)'],
    ],
    { body: [1, 10], bold: [0, 11] },
  );
  model.styles['B16'] = { format: 'number' };
  return model;
}

const budget: [string, string, number, number, string][] = [
  ['Ingredients', 'Ada', 52000, 48650, 'Bulk cocoa deal in March'],
  ['Wages', 'Grace', 61000, 61000, 'Two seasonal helpers'],
  ['Rent', 'Grace', 18000, 18000, ''],
  ['Packaging', 'Linus', 9500, 11240, 'Gift-box season ran long'],
  ['Marketing', 'Ada', 8000, 6120, ''],
  ['Shipping', 'Linus', 7200, 7940, 'New courier from May'],
  ['Utilities', 'Grace', 5400, 5010, ''],
  ['Equipment', 'Linus', 6000, 3800, 'Second tempering machine'],
  ['Software', 'Ada', 1800, 1740, ''],
  ['Training', 'Grace', 1500, 600, 'Workshop moved to next year'],
];

/** Planned vs. actual spend per category, with what is left and how much is used. */
function costs(): SheetModel {
  const rows = budget.map(([cat, owner, plan, actual, note], i) => {
    const r = i + 2;
    return [cat, owner, plan, actual, `=C${r}-D${r}`, `=D${r}/C${r}`, note];
  });
  return sheet(
    'budget',
    'Budget',
    { rows: 20, cols: 8 },
    [128, 84, 100, 100, 100, 84, 220],
    ['auto', 'auto', 'currency', 'currency', 'currency', 'percent'],
    [
      ['Category', 'Owner', 'Planned', 'Actual', 'Left', 'Used', 'Note'],
      ...rows,
      ['Total', '', '=SUM(C2:C11)', '=SUM(D2:D11)', '=C12-D12', '=D12/C12'],
    ],
    { body: [1, 10], bold: [0, 11] },
  );
}

/** A fresh, empty sheet. */
export function blankSheet(n: number): SheetModel {
  return sheet(`sheet-${n}-${newRowId()}`, `Sheet ${n}`, { rows: 20, cols: 8 }, [], [], []);
}

/** The whole workbook, fresh. */
export function mockWorkbook(): SheetModel[] {
  return [sales(), costs(), { ...blankSheet(3), name: 'Ideas' }];
}

export const sheetPeople = [
  { name: 'Ada Example', presence: 'online' as const },
  { name: 'Grace Example', presence: 'away' as const },
  { name: 'Linus Example' },
];
