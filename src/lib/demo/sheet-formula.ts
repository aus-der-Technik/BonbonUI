/**
 * Storybook-only: a small spreadsheet engine for the Spreadsheet example — addresses, a formula
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

export const isError = (value: unknown): value is SheetError =>
  typeof value === 'object' && value !== null && 'error' in value;

/** 0 → A, 25 → Z, 26 → AA. */
export function colName(col: number): string {
  let name = '';
  for (let n = col + 1; n > 0; n = Math.floor((n - 1) / 26)) {
    name = String.fromCharCode(65 + ((n - 1) % 26)) + name;
  }
  return name;
}

/** A → 0, AA → 26. */
export function colIndex(name: string): number {
  let n = 0;
  for (const ch of name.toUpperCase()) n = n * 26 + (ch.charCodeAt(0) - 64);
  return n - 1;
}

/** Zero-based column and row → "B3". */
export const cellKey = (col: number, row: number): string => `${colName(col)}${row + 1}`;

export function parseKey(key: string): Address | null {
  const m = /^\$?([A-Z]{1,2})\$?(\d+)$/i.exec(key.trim());
  if (!m || !m[1] || !m[2] || Number(m[2]) < 1) return null;
  return { col: colIndex(m[1]), row: Number(m[2]) - 1 };
}

// ── Literals and formatting ─────────────────────────────────────────────────────────────

/** What a typed, non-formula input means: a number ("1,200", "12%", "€40"), text, or empty. */
export function parseLiteral(input: string | undefined): Value {
  const text = (input ?? '').trim();
  if (!text) return null;
  const m = /^([-+]?)[€$]?\s*(\d[\d,]*(?:\.\d+)?|\.\d+)\s*(%?)$/.exec(text);
  if (m?.[2]) {
    const n = Number(m[2].replace(/,/g, '')) * (m[1] === '-' ? -1 : 1);
    return m[3] ? n / 100 : n;
  }
  return text;
}

export type NumberFormat = 'auto' | 'number' | 'currency' | 'percent';

const formats = {
  number: new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }),
  currency: new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }),
  percent: new Intl.NumberFormat('en-US', { style: 'percent', maximumFractionDigits: 1 }),
  compact: new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }),
  compactCurrency: new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
    notation: 'compact',
    maximumFractionDigits: 1,
  }),
};

/** Formats a number for a cell; `auto` keeps up to two decimals without grouping noise. */
export function formatNumber(value: number, format: NumberFormat = 'auto'): string {
  if (format === 'auto') return formats.number.format(value);
  return formats[format].format(value);
}

/** Short form for chart labels: €12.4K, 12.4K, 34%. */
export function formatCompact(value: number, format: NumberFormat = 'auto'): string {
  if (format === 'percent') return formats.percent.format(value);
  return format === 'currency'
    ? formats.compactCurrency.format(value)
    : formats.compact.format(value);
}

// ── Errors in plain words ───────────────────────────────────────────────────────────────

/** A short cell label and a one-sentence "what happened, what to do". */
export function errorInfo(err: SheetError): { label: string; message: string } {
  switch (err.error) {
    case 'cycle':
      return {
        label: 'Loop',
        message: `This formula ends up using its own result (${err.detail ?? 'a loop'}). Point it at a cell outside the loop.`,
      };
    case 'div0':
      return {
        label: 'Div by 0',
        message: `This divides by ${err.detail ? `${err.detail}, which is` : 'something that is'} zero or empty. Fill in that cell or divide by another one.`,
      };
    case 'ref':
      return {
        label: 'No cell',
        message:
          'A cell this formula used is gone — its row or column was removed or pushed off the sheet. Point it at an existing cell.',
      };
    case 'name':
      return {
        label: 'Unknown',
        message: err.detail
          ? `There is no function called ${err.detail.split('|')[0]}.${err.detail.includes('|') ? ` Did you mean ${err.detail.split('|')[1]}?` : ''}`
          : 'This formula uses a name the sheet does not know.',
      };
    case 'syntax':
      return {
        label: 'Incomplete',
        message:
          'This formula is not finished. Check for a missing bracket, number or cell after an operator.',
      };
    case 'value':
      return {
        label: 'Not a number',
        message: `${err.detail ?? 'A cell'} holds text, so it cannot be calculated with. Use a cell with a number.`,
      };
  }
}

// ── Functions ───────────────────────────────────────────────────────────────────────────

export interface FunctionInfo {
  name: string;
  args: string[];
  about: string;
}

export const FUNCTIONS: FunctionInfo[] = [
  { name: 'SUM', args: ['range', '…'], about: 'Adds up every number in the cells you give it.' },
  {
    name: 'AVERAGE',
    args: ['range', '…'],
    about: 'The mean of the numbers — empty cells and text are skipped.',
  },
  { name: 'MIN', args: ['range', '…'], about: 'The smallest number.' },
  { name: 'MAX', args: ['range', '…'], about: 'The largest number.' },
  { name: 'COUNT', args: ['range', '…'], about: 'How many cells hold a number.' },
];

const byName = Object.fromEntries(FUNCTIONS.map((f) => [f.name, f]));

function closestFunction(name: string): string | undefined {
  let best: string | undefined;
  let bestScore = Infinity;
  for (const f of FUNCTIONS) {
    const score = distance(name, f.name);
    if (score < bestScore) [best, bestScore] = [f.name, score];
  }
  return bestScore <= 2 ? best : undefined;
}

function distance(a: string, b: string): number {
  const row = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let prev = row[0] ?? 0;
    row[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const cur = row[j] ?? 0;
      row[j] = Math.min(cur + 1, (row[j - 1] ?? 0) + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1));
      prev = cur;
    }
  }
  return row[b.length] ?? 0;
}

// ── Tokenizer ───────────────────────────────────────────────────────────────────────────

export type TokenType = 'num' | 'ref' | 'range' | 'name' | 'op' | '(' | ')' | ',' | 'bad' | 'space';

export interface Token {
  type: TokenType;
  text: string;
  /** Offset in the source string. */
  start: number;
}

const REF = String.raw`\$?[A-Za-z]{1,2}\$?\d+`;
const PATTERNS: [TokenType, RegExp][] = [
  ['space', /^\s+/],
  ['range', new RegExp(`^${REF}:${REF}`)],
  ['ref', new RegExp(`^${REF}(?![A-Za-z0-9_(])`)],
  ['num', /^(\d+(\.\d*)?|\.\d+)%?/],
  ['name', /^[A-Za-z_][A-Za-z0-9_.]*/],
  ['bad', /^#REF!/],
  ['op', /^[-+*/]/],
  ['(', /^\(/],
  [')', /^\)/],
  [',', /^[,;]/],
];

/** Splits a formula body (without "=") into tokens; unknown characters become `bad`. */
export function tokenize(src: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  while (i < src.length) {
    const rest = src.slice(i);
    let matched = false;
    for (const [type, re] of PATTERNS) {
      const m = re.exec(rest);
      if (m) {
        tokens.push({ type, text: m[0], start: i });
        i += m[0].length;
        matched = true;
        break;
      }
    }
    if (!matched) {
      tokens.push({ type: 'bad', text: rest[0] ?? '', start: i });
      i += 1;
    }
  }
  return tokens;
}

// ── Parser + evaluator ──────────────────────────────────────────────────────────────────

type Node =
  | { t: 'num'; v: number }
  | { t: 'ref'; a: Address; text: string }
  | { t: 'range'; a: Address; b: Address }
  | { t: 'bad' }
  | { t: 'call'; name: string; args: Node[] }
  | { t: 'neg'; x: Node }
  | { t: 'bin'; op: string; l: Node; r: Node };

class SyntaxFault extends Error {}

function parse(src: string): Node {
  const tokens = tokenize(src).filter((t) => t.type !== 'space');
  let pos = 0;
  const peek = () => tokens[pos];
  const take = () => {
    const t = tokens[pos++];
    if (!t) throw new SyntaxFault();
    return t;
  };

  function expr(): Node {
    let left = term();
    while (peek()?.type === 'op' && (peek()?.text === '+' || peek()?.text === '-')) {
      const op = take().text;
      left = { t: 'bin', op, l: left, r: term() };
    }
    return left;
  }
  function term(): Node {
    let left = unary();
    while (peek()?.type === 'op' && (peek()?.text === '*' || peek()?.text === '/')) {
      const op = take().text;
      left = { t: 'bin', op, l: left, r: unary() };
    }
    return left;
  }
  function unary(): Node {
    const t = peek();
    if (t?.type === 'op' && (t.text === '-' || t.text === '+')) {
      take();
      const x = unary();
      return t.text === '-' ? { t: 'neg', x } : x;
    }
    return primary();
  }
  function primary(): Node {
    const t = take();
    switch (t.type) {
      case 'num':
        return {
          t: 'num',
          v: t.text.endsWith('%') ? Number(t.text.slice(0, -1)) / 100 : Number(t.text),
        };
      case 'ref':
        return { t: 'ref', a: parseKey(t.text) as Address, text: t.text.toUpperCase() };
      case 'range': {
        const [a, b] = t.text.split(':');
        return { t: 'range', a: parseKey(a ?? '') as Address, b: parseKey(b ?? '') as Address };
      }
      case 'bad':
        if (t.text === '#REF!') return { t: 'bad' };
        throw new SyntaxFault();
      case 'name': {
        if (peek()?.type !== '(') throw new SyntaxFault();
        take();
        const args: Node[] = [];
        if (peek()?.type !== ')') {
          args.push(expr());
          while (peek()?.type === ',') {
            take();
            args.push(expr());
          }
        }
        if (take().type !== ')') throw new SyntaxFault();
        return { t: 'call', name: t.text.toUpperCase(), args };
      }
      case '(': {
        const inner = expr();
        if (take().type !== ')') throw new SyntaxFault();
        return inner;
      }
      default:
        throw new SyntaxFault();
    }
  }

  const root = expr();
  if (pos < tokens.length) throw new SyntaxFault();
  return root;
}

/** Reads one cell's computed value while a formula is evaluated. */
export type CellReader = (col: number, row: number) => Value;

/** Evaluates a formula body (without "=") against a cell reader. */
export function evaluateFormula(src: string, read: CellReader): Value {
  let root: Node;
  try {
    root = parse(src);
  } catch {
    return { error: 'syntax' };
  }
  const result = evalNode(root, read);
  return Array.isArray(result) ? { error: 'value', detail: 'A range' } : result;
}

function evalNode(node: Node, read: CellReader): Value | Value[] {
  switch (node.t) {
    case 'num':
      return node.v;
    case 'bad':
      return { error: 'ref' };
    case 'ref': {
      const v = read(node.a.col, node.a.row);
      return v === null ? 0 : v;
    }
    case 'range': {
      const out: Value[] = [];
      const [c1, c2] = [Math.min(node.a.col, node.b.col), Math.max(node.a.col, node.b.col)];
      const [r1, r2] = [Math.min(node.a.row, node.b.row), Math.max(node.a.row, node.b.row)];
      for (let r = r1; r <= r2; r++) for (let c = c1; c <= c2; c++) out.push(read(c, r));
      return out;
    }
    case 'neg': {
      const x = scalar(node.x, read);
      return typeof x === 'number' ? -x : x;
    }
    case 'bin': {
      const l = scalar(node.l, read);
      if (typeof l !== 'number') return l;
      const r = scalar(node.r, read);
      if (typeof r !== 'number') return r;
      switch (node.op) {
        case '+':
          return l + r;
        case '-':
          return l - r;
        case '*':
          return l * r;
        default:
          return r === 0
            ? { error: 'div0', detail: node.r.t === 'ref' ? node.r.text : undefined }
            : l / r;
      }
    }
    case 'call': {
      const fn = byName[node.name];
      if (!fn) {
        const near = closestFunction(node.name);
        return { error: 'name', detail: near ? `${node.name}|${near}` : node.name };
      }
      const nums: number[] = [];
      for (const arg of node.args) {
        const v = evalNode(arg, read);
        for (const item of Array.isArray(v) ? v : [v]) {
          if (isError(item)) return item;
          // Inside a range text and blanks are skipped, as people expect from a total.
          if (typeof item === 'number') nums.push(item);
          else if (!Array.isArray(v) && typeof item === 'string')
            return { error: 'value', detail: 'An argument' };
        }
      }
      return aggregate(node.name, nums);
    }
  }
}

function scalar(node: Node, read: CellReader): number | SheetError {
  const v = evalNode(node, read);
  if (Array.isArray(v)) return { error: 'value', detail: 'A range outside a function' };
  if (isError(v)) return v;
  if (typeof v === 'string') {
    return { error: 'value', detail: node.t === 'ref' ? node.text : 'A value' };
  }
  return v ?? 0;
}

function aggregate(name: string, nums: number[]): Value {
  switch (name) {
    case 'SUM':
      return nums.reduce((a, b) => a + b, 0);
    case 'AVERAGE':
      return nums.length ? nums.reduce((a, b) => a + b, 0) / nums.length : { error: 'div0' };
    case 'MIN':
      return nums.length ? Math.min(...nums) : 0;
    case 'MAX':
      return nums.length ? Math.max(...nums) : 0;
    default:
      return nums.length;
  }
}

// ── Whole sheet ─────────────────────────────────────────────────────────────────────────

/** Inputs as typed, keyed by address ("B3" → "=SUM(B2:B9)"). */
export type Inputs = Record<string, string>;

/** Computes every cell; cells in a reference loop get a `cycle` error naming the loop. */
export function evaluateSheet(inputs: Inputs): Record<string, Value> {
  const out: Record<string, Value> = {};
  const state: Record<string, 1 | 2> = {};
  const stack: string[] = [];
  const loops: Record<string, string> = {};

  function valueOf(key: string): Value {
    if (state[key] === 2) return out[key] ?? null;
    if (state[key] === 1) {
      const from = stack.indexOf(key);
      const path = [...stack.slice(from), key].join(' → ');
      for (const k of stack.slice(from)) loops[k] ??= path;
      return { error: 'cycle', detail: path };
    }
    const input = inputs[key];
    let v: Value;
    if (input?.startsWith('=')) {
      state[key] = 1;
      stack.push(key);
      v = evaluateFormula(input.slice(1), (c, r) => valueOf(cellKey(c, r)));
      stack.pop();
      const loop = loops[key];
      if (loop) v = { error: 'cycle', detail: loop };
    } else {
      v = parseLiteral(input);
    }
    state[key] = 2;
    out[key] = v;
    return v;
  }

  for (const key of Object.keys(inputs)) valueOf(key);
  return out;
}

/** Every cell a formula reads, ranges expanded ("=B2+SUM(C1:C2)" → B2, C1, C2). */
export function precedents(input: string | undefined): string[] {
  if (!input?.startsWith('=')) return [];
  const keys: string[] = [];
  for (const ref of formulaRefs(input)) {
    for (let r = ref.from.row; r <= ref.to.row; r++)
      for (let c = ref.from.col; c <= ref.to.col; c++) keys.push(cellKey(c, r));
  }
  return keys;
}

/** Cells that (transitively) read any of `keys`, with how many steps away they are. */
export function dependents(inputs: Inputs, keys: string[]): { key: string; depth: number }[] {
  const readers: Record<string, string[]> = {};
  for (const [key, input] of Object.entries(inputs)) {
    for (const p of precedents(input)) (readers[p] ??= []).push(key);
  }
  const seen = new Set(keys);
  const found: { key: string; depth: number }[] = [];
  let frontier = keys;
  for (let depth = 1; frontier.length; depth++) {
    const next: string[] = [];
    for (const key of frontier) {
      for (const reader of readers[key] ?? []) {
        if (seen.has(reader)) continue;
        seen.add(reader);
        found.push({ key: reader, depth });
        next.push(reader);
      }
    }
    frontier = next;
  }
  return found;
}

// ── References inside a formula (for colour outlines) ───────────────────────────────────

export interface FormulaRef {
  text: string;
  /** Offsets in the full input, "=" included. */
  start: number;
  end: number;
  from: Address;
  to: Address;
}

export function formulaRefs(input: string): FormulaRef[] {
  if (!input.startsWith('=')) return [];
  const refs: FormulaRef[] = [];
  for (const t of tokenize(input.slice(1))) {
    if (t.type !== 'ref' && t.type !== 'range') continue;
    const [a, b = a] = t.text.split(':');
    const pa = parseKey(a ?? '');
    const pb = parseKey(b ?? '');
    if (!pa || !pb) continue;
    refs.push({
      text: t.text.toUpperCase(),
      start: t.start + 1,
      end: t.start + 1 + t.text.length,
      from: { col: Math.min(pa.col, pb.col), row: Math.min(pa.row, pb.row) },
      to: { col: Math.max(pa.col, pb.col), row: Math.max(pa.row, pb.row) },
    });
  }
  return refs;
}

// ── Rewriting references ────────────────────────────────────────────────────────────────

interface RefPart {
  col: number;
  row: number;
  absCol: boolean;
  absRow: boolean;
}

function readPart(text: string): RefPart {
  const m = /^(\$?)([A-Za-z]{1,2})(\$?)(\d+)$/.exec(text) as RegExpExecArray;
  return {
    absCol: m[1] === '$',
    col: colIndex(m[2] ?? 'A'),
    absRow: m[3] === '$',
    row: Number(m[4]) - 1,
  };
}

const writePart = (p: RefPart) =>
  `${p.absCol ? '$' : ''}${colName(p.col)}${p.absRow ? '$' : ''}${p.row + 1}`;

/**
 * Rewrites every reference of a formula. `single` maps a lone reference, `range` both ends of a
 * range at once; returning `null` turns the reference into #REF!.
 */
export function mapRefs(
  input: string,
  single: (p: RefPart) => RefPart | null,
  range: (a: RefPart, b: RefPart) => [RefPart, RefPart] | null = (a, b) => {
    const [x, y] = [single(a), single(b)];
    return x && y ? [x, y] : null;
  },
): string {
  if (!input.startsWith('=')) return input;
  return (
    '=' +
    tokenize(input.slice(1))
      .map((t) => {
        if (t.type === 'ref') {
          const p = single(readPart(t.text));
          return p ? writePart(p) : '#REF!';
        }
        if (t.type === 'range') {
          const [a, b] = t.text.split(':');
          const ends = range(readPart(a ?? ''), readPart(b ?? ''));
          return ends ? `${writePart(ends[0])}:${writePart(ends[1])}` : '#REF!';
        }
        return t.text;
      })
      .join('')
  );
}

/** Moves the relative references of a formula, as copying or filling it does. */
export function shiftFormula(input: string, dCol: number, dRow: number): string {
  return mapRefs(input, (p) => {
    const next = {
      ...p,
      col: p.absCol ? p.col : p.col + dCol,
      row: p.absRow ? p.row : p.row + dRow,
    };
    return next.col < 0 || next.row < 0 ? null : next;
  });
}

/** Moves cells (and every reference to them) to new rows or columns. */
function remap(
  inputs: Inputs,
  move: (a: Address) => Address,
  ref: (p: RefPart) => RefPart,
  range: (a: RefPart, b: RefPart) => [RefPart, RefPart],
): Inputs {
  const out: Inputs = {};
  for (const [key, input] of Object.entries(inputs)) {
    const at = parseKey(key);
    if (!at) continue;
    const to = move(at);
    out[cellKey(to.col, to.row)] = mapRefs(input, ref, range);
  }
  return out;
}

/** Any keyed record (inputs, styles) moved by the same cell mapping. */
export function moveKeys<T>(record: Record<string, T>, move: (a: Address) => Address) {
  const out: Record<string, T> = {};
  for (const [key, value] of Object.entries(record)) {
    const at = parseKey(key);
    if (at) {
      const to = move(at);
      out[cellKey(to.col, to.row)] = value;
    }
  }
  return out;
}

/**
 * Inserts an empty row at `at`. References below move down; a range that ends right above the
 * new row grows to include it, so a total keeps counting a row added at the end of its list.
 */
export function insertRow(inputs: Inputs, at: number): Inputs {
  const down = <T extends { row: number }>(p: T): T => (p.row >= at ? { ...p, row: p.row + 1 } : p);
  return remap(inputs, down, down, (a, b) => {
    const [top, bottom] = a.row <= b.row ? [a, b] : [b, a];
    const grow = bottom.row === at - 1 && top.row < at - 1;
    return [down(top), grow ? { ...bottom, row: bottom.row + 1 } : down(bottom)];
  });
}

/** Inserts an empty column at `at`, the same way. */
export function insertColumn(inputs: Inputs, at: number): Inputs {
  const right = <T extends { col: number }>(p: T): T =>
    p.col >= at ? { ...p, col: p.col + 1 } : p;
  return remap(inputs, right, right, (a, b) => {
    const [left, end] = a.col <= b.col ? [a, b] : [b, a];
    const grow = end.col === at - 1 && left.col < at - 1;
    return [right(left), grow ? { ...end, col: end.col + 1 } : right(end)];
  });
}

/**
 * Re-orders rows (`rowMap[old] = new`, rows not in the map stay). References into one row follow
 * it, so "=SUM(B4:E4)" moves with its row and a total pointing at one row still finds it; ranges
 * over several rows keep their extent, as a sort only shuffles inside them.
 */
export function moveRows(inputs: Inputs, rowMap: Record<number, number>): Inputs {
  const to = <T extends { row: number }>(p: T): T => ({ ...p, row: rowMap[p.row] ?? p.row });
  return remap(inputs, to, to, (a, b) => (a.row === b.row ? [to(a), to(b)] : [a, b]));
}

/** Sort order for a column: numbers ascending, then text A–Z, blanks and errors last. */
export function sortOrder(values: Value[], dir: 'asc' | 'desc'): number[] {
  const rank = (v: Value) => (typeof v === 'number' ? 0 : typeof v === 'string' ? 1 : 2);
  return values
    .map((v, i) => ({ v, i }))
    .sort((x, y) => {
      const rx = rank(x.v);
      const ry = rank(y.v);
      if (rx !== ry || rx === 2) return rx - ry || x.i - y.i;
      const cmp =
        rx === 0
          ? (x.v as number) - (y.v as number)
          : String(x.v).localeCompare(String(y.v), 'en', { sensitivity: 'base' });
      return (dir === 'asc' ? cmp : -cmp) || x.i - y.i;
    })
    .map((x) => x.i);
}

/**
 * What dragging the fill handle produces: formulas shift by their distance, a run of two or more
 * numbers continues its step (1, 2 → 3, 4), anything else repeats.
 */
export function fillSeries(sources: string[], count: number, dCol: number, dRow: number): string[] {
  const nums = sources.map((s) => (s.startsWith('=') ? null : parseLiteral(s)));
  const numeric = sources.length >= 2 && nums.every((n) => typeof n === 'number');
  const first = nums[0] as number;
  const step = numeric ? ((nums.at(-1) as number) - first) / (sources.length - 1) : 0;
  return Array.from({ length: count }, (_, i) => {
    const n = sources.length + i;
    if (numeric) return String(Math.round((first + step * n) * 1e9) / 1e9);
    const src = sources[n % sources.length] ?? '';
    const offset = n - (n % sources.length);
    return src.startsWith('=') ? shiftFormula(src, dCol * offset, dRow * offset) : src;
  });
}

// ── Typing help ─────────────────────────────────────────────────────────────────────────

export interface FormulaContext {
  /** Function names matching the word being typed. */
  matches: FunctionInfo[];
  /** The word being typed and where it starts. */
  word?: { text: string; start: number };
  /** The function call the caret is inside, and which argument. */
  call?: { fn: FunctionInfo; arg: number };
}

/** What to suggest at the caret of a formula being typed. */
export function formulaContext(input: string, caret: number): FormulaContext {
  if (!input.startsWith('=')) return { matches: [] };
  const before = input.slice(0, caret);
  const word = /(^|[=(+\-*/,\s])([A-Za-z]+)$/.exec(before);
  if (word?.[2] && !/\d/.test(input[caret] ?? '')) {
    const text = word[2].toUpperCase();
    const matches = FUNCTIONS.filter((f) => f.name.startsWith(text));
    if (matches.length) return { matches, word: { text, start: caret - text.length } };
  }
  let depth = 0;
  let arg = 0;
  for (let i = before.length - 1; i >= 0; i--) {
    const ch = before[i];
    if (ch === ')') depth++;
    else if ((ch === ',' || ch === ';') && depth === 0) arg++;
    else if (ch === '(') {
      if (depth === 0) {
        const name = /([A-Za-z]+)$/.exec(before.slice(0, i))?.[1]?.toUpperCase();
        const fn = name ? byName[name] : undefined;
        return fn ? { matches: [], call: { fn, arg } } : { matches: [] };
      }
      depth--;
    }
  }
  return { matches: [] };
}

/** The first known function of a formula, for a hint when the caret is outside every call. */
export function firstCall(input: string): { fn: FunctionInfo; arg: number } | undefined {
  if (!input.startsWith('=')) return undefined;
  const name = tokenize(input.slice(1)).find(
    (t) => t.type === 'name' && byName[t.text.toUpperCase()],
  );
  const fn = name ? byName[name.text.toUpperCase()] : undefined;
  return fn ? { fn, arg: -1 } : undefined;
}

/** True where a click on a cell should insert its address into the formula being typed. */
export function canPoint(input: string, caret: number): boolean {
  if (!input.startsWith('=')) return false;
  const before = input.slice(0, caret).trimEnd();
  return /[=(+\-*/,;:]$/.test(before);
}
