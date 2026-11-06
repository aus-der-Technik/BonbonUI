/**
 * Mock data for the data examples (Pages/Data): three in-memory tables and a very small query
 * language that reads like SQL — enough to filter, group, sort and limit, not a database.
 *
 *   SELECT region, sum(total) AS revenue FROM orders WHERE status = 'paid'
 *   GROUP BY region ORDER BY revenue DESC LIMIT 10
 */

export type Value = string | number;
export type Row = Record<string, Value>;
/** `key` is an identifier: a number, but never summed, charted or printed with separators. */
export type ColumnType = 'text' | 'number' | 'date' | 'key';

export interface Table {
  name: string;
  description: string;
  columns: { name: string; type: ColumnType }[];
  rows: Row[];
}

/** A small seeded random generator, so the tables are the same on every load. */
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = seeded(482);
const pick = <T>(list: readonly T[], weights?: readonly number[]): T => {
  if (!weights) return list[Math.floor(rand() * list.length)]!;
  let r = rand() * weights.reduce((a, b) => a + b, 0);
  for (let i = 0; i < list.length; i++) {
    r -= weights[i]!;
    if (r <= 0) return list[i]!;
  }
  return list.at(-1)!;
};

const REGIONS = ['North', 'South', 'East', 'West', 'Central'] as const;
const CHANNELS = ['web', 'app', 'store'] as const;
const PLANS = ['free', 'plus', 'team'] as const;

const products: Row[] = [
  { sku: 'MUG-01', name: 'Stoneware mug', category: 'kitchen', price: 14, stock: 120 },
  { sku: 'MUG-02', name: 'Travel mug', category: 'kitchen', price: 22, stock: 64 },
  { sku: 'TEA-01', name: 'Loose tea, 100 g', category: 'pantry', price: 9, stock: 310 },
  { sku: 'TEA-02', name: 'Tea sampler', category: 'pantry', price: 26, stock: 18 },
  { sku: 'LMP-01', name: 'Desk lamp', category: 'home', price: 58, stock: 12 },
  { sku: 'BLK-01', name: 'Wool blanket', category: 'home', price: 89, stock: 7 },
  { sku: 'NTB-01', name: 'Dot-grid notebook', category: 'paper', price: 12, stock: 240 },
  { sku: 'PEN-01', name: 'Brass pen', category: 'paper', price: 34, stock: 15 },
  { sku: 'BAG-01', name: 'Canvas tote', category: 'bags', price: 19, stock: 96 },
  { sku: 'BAG-02', name: 'Weekend bag', category: 'bags', price: 129, stock: 4 },
];

const FIRST = ['Robin', 'Alex', 'Kim', 'Sam', 'Jo', 'Noor', 'Ari', 'Lee', 'Mika', 'Tess'];
const customers: Row[] = Array.from({ length: 60 }, (_, i) => {
  const first = FIRST[i % FIRST.length]!;
  const n = Math.floor(i / FIRST.length) + 1;
  const month = 1 + Math.floor(rand() * 10);
  return {
    id: 1000 + i,
    name: `${first} Example ${n}`,
    email: `${first.toLowerCase()}${n}@example.com`,
    region: pick(REGIONS, [3, 2, 2, 3, 1]),
    plan: pick(PLANS, [5, 3, 1]),
    joined: `2026-${String(month).padStart(2, '0')}-${String(1 + Math.floor(rand() * 28)).padStart(2, '0')}`,
  };
});

/** Orders grow through the year, with a bump in the summer sale. */
const orders: Row[] = [];
for (let m = 1; m <= 10; m++) {
  const count = 36 + m * 5 + (m === 7 ? 30 : 0);
  for (let k = 0; k < count; k++) {
    const product = pick(products, [6, 3, 8, 2, 2, 1, 6, 2, 4, 1]);
    const quantity = pick([1, 1, 1, 2, 2, 3, 4]);
    const day = 1 + Math.floor(rand() * 28);
    const customer = pick(customers);
    orders.push({
      id: 50000 + orders.length,
      day: `2026-${String(m).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
      month: `2026-${String(m).padStart(2, '0')}`,
      customer: customer.id!,
      region: customer.region!,
      channel: pick(CHANNELS, [5, 3, 2]),
      sku: product.sku!,
      quantity,
      total:
        Math.round((product.price as number) * quantity * (rand() < 0.2 ? 0.9 : 1) * 100) / 100,
      status: pick(['paid', 'paid', 'paid', 'paid', 'paid', 'refunded', 'open'] as const),
    });
  }
}
orders.sort((a, b) => String(a.day).localeCompare(String(b.day)));

export const tables: Table[] = [
  {
    name: 'orders',
    description: 'One row per order, January to October',
    columns: [
      { name: 'id', type: 'key' },
      { name: 'day', type: 'date' },
      { name: 'month', type: 'text' },
      { name: 'customer', type: 'key' },
      { name: 'region', type: 'text' },
      { name: 'channel', type: 'text' },
      { name: 'sku', type: 'text' },
      { name: 'quantity', type: 'number' },
      { name: 'total', type: 'number' },
      { name: 'status', type: 'text' },
    ],
    rows: orders,
  },
  {
    name: 'customers',
    description: 'Everyone with an account',
    columns: [
      { name: 'id', type: 'key' },
      { name: 'name', type: 'text' },
      { name: 'email', type: 'text' },
      { name: 'region', type: 'text' },
      { name: 'plan', type: 'text' },
      { name: 'joined', type: 'date' },
    ],
    rows: customers,
  },
  {
    name: 'products',
    description: 'The catalogue, with stock on hand',
    columns: [
      { name: 'sku', type: 'text' },
      { name: 'name', type: 'text' },
      { name: 'category', type: 'text' },
      { name: 'price', type: 'number' },
      { name: 'stock', type: 'number' },
    ],
    rows: products,
  },
];

export interface SavedQuery {
  id: string;
  name: string;
  sql: string;
}

export const savedQueries: SavedQuery[] = [
  {
    id: 'by-region',
    name: 'Revenue by region',
    sql: `SELECT region, sum(total) AS revenue, count(*) AS orders
FROM orders
WHERE status = 'paid'
GROUP BY region
ORDER BY revenue DESC`,
  },
  {
    id: 'by-month',
    name: 'Orders per month',
    sql: `SELECT month, count(*) AS orders, avg(total) AS average
FROM orders
GROUP BY month
ORDER BY month`,
  },
  {
    id: 'refunds',
    name: 'Large refunds',
    sql: `SELECT id, day, region, sku, total
FROM orders
WHERE status = 'refunded' AND total > 50
ORDER BY total DESC
LIMIT 25`,
  },
  {
    id: 'low-stock',
    name: 'Low stock',
    sql: `SELECT sku, name, stock
FROM products
WHERE stock < 20
ORDER BY stock`,
  },
];

/** Story states that are not saved queries: a typo and a filter that matches nothing. */
export const statePresets: Record<'broken' | 'empty', string> = {
  broken: `SELECT region, sum(totl) AS revenue
FROM orders
GROUP BY region`,
  empty: `SELECT id, day, total
FROM orders
WHERE region = 'Antarctica'`,
};

// ── The query language ──────────────────────────────────────────────────────────────────

export interface QueryResult {
  columns: { name: string; type: ColumnType }[];
  rows: Row[];
  /** Rows read from the table before filtering. */
  scanned: number;
  ms: number;
}

export class QueryError extends Error {
  /** 1-based line of the problem in the query text. */
  line: number;
  /** A corrected query, when the problem is a likely typo. */
  fix?: string | undefined;
  constructor(message: string, line: number, fix?: string) {
    super(message);
    this.line = line;
    this.fix = fix;
  }
}

type Agg = 'count' | 'sum' | 'avg' | 'min' | 'max';
interface Item {
  agg?: Agg;
  /** `*` for count(*). */
  column: string;
  alias: string;
}
interface Condition {
  column: string;
  op: '=' | '!=' | '<' | '<=' | '>' | '>=' | 'like';
  value: Value;
}

function distance(a: string, b: string): number {
  const d = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let prev = d[0]!;
    d[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const tmp = d[j]!;
      d[j] = Math.min(d[j]! + 1, d[j - 1]! + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1));
      prev = tmp;
    }
  }
  return d[b.length]!;
}

const closest = (word: string, options: string[]) =>
  options
    .map((o) => ({ o, d: distance(word.toLowerCase(), o.toLowerCase()) }))
    .filter((x) => x.d <= 2)
    .sort((a, b) => a.d - b.d)[0]?.o;

const lineOf = (sql: string, needle: string) => {
  const at = sql.search(new RegExp(`\\b${needle.replace(/[^\w]/g, '\\$&')}\\b`, 'i'));
  return at < 0 ? 1 : sql.slice(0, at).split('\n').length;
};

const swapWord = (sql: string, from: string, to: string) =>
  sql.replace(new RegExp(`\\b${from}\\b`), to);

export function runQuery(sql: string, from: Table[] = tables): QueryResult {
  const started = performance.now();
  const text = sql.replace(/--.*$/gm, '').trim().replace(/;$/, '');
  if (!text) throw new QueryError('Write a query first, starting with SELECT.', 1);
  const m =
    /^select\s+([\s\S]+?)\s+from\s+(\w+)(?:\s+where\s+([\s\S]+?))?(?:\s+group\s+by\s+(\w+))?(?:\s+order\s+by\s+(\w+)(?:\s+(asc|desc))?)?(?:\s+limit\s+(\d+))?$/i.exec(
      text,
    );
  if (!m) {
    if (!/^select\b/i.test(text)) throw new QueryError('A query starts with SELECT.', 1);
    if (!/\bfrom\b/i.test(text)) throw new QueryError('Say which table to read: FROM orders.', 1);
    throw new QueryError(
      'This reads oddly. The order is SELECT … FROM … WHERE … GROUP BY … ORDER BY … LIMIT.',
      1,
    );
  }
  const [, list, tableName, where, groupBy, orderBy, dir, limit] = m;

  const table = from.find((t) => t.name === tableName!.toLowerCase());
  if (!table) {
    const near = closest(
      tableName!,
      from.map((t) => t.name),
    );
    throw new QueryError(
      `There is no table “${tableName}”.${near ? ` Did you mean “${near}”?` : ` Tables: ${from.map((t) => t.name).join(', ')}.`}`,
      lineOf(sql, tableName!),
      near ? swapWord(sql, tableName!, near) : undefined,
    );
  }
  const names = table.columns.map((c) => c.name);
  const column = (name: string) => {
    const found = names.find((n) => n === name.toLowerCase());
    if (found) return found;
    const near = closest(name, names);
    throw new QueryError(
      `${table.name} has no column “${name}”.${near ? ` Did you mean “${near}”?` : ''}`,
      lineOf(sql, name),
      near ? swapWord(sql, name, near) : undefined,
    );
  };
  const typeOf = (name: string) => table.columns.find((c) => c.name === name)?.type ?? 'text';

  // SELECT list
  const items: Item[] = [];
  const star = list!.trim() === '*';
  if (!star) {
    for (const raw of list!.split(',')) {
      const part = raw.trim();
      const am = /^(?:(count|sum|avg|min|max)\s*\(\s*(\*|\w+)\s*\)|(\w+))(?:\s+as\s+(\w+))?$/i.exec(
        part,
      );
      if (!am)
        throw new QueryError(
          `“${part}” is not a column or a sum, count, avg, min or max.`,
          lineOf(sql, part.split(/\W/)[0] ?? ''),
        );
      const agg = am[1]?.toLowerCase() as Agg | undefined;
      const col = am[2] ?? am[3]!;
      if (col === '*' && agg !== 'count') throw new QueryError('Only count can take *.', 1);
      const name = col === '*' ? '*' : column(col);
      const alias = am[4] ?? (agg ? `${agg}_${name === '*' ? 'all' : name}` : name);
      items.push(agg ? { agg, column: name, alias } : { column: name, alias });
      if (agg && agg !== 'count' && typeOf(name) !== 'number')
        throw new QueryError(
          typeOf(name) === 'key'
            ? `${name} is an identifier, not an amount — try count(${name}).`
            : `${agg} needs numbers, and ${name} holds ${typeOf(name)}.`,
          lineOf(sql, col),
        );
    }
  }

  // WHERE
  const conditions: Condition[] = [];
  if (where) {
    for (const raw of where.split(/\s+and\s+/i)) {
      const cm = /^(\w+)\s*(=|!=|<>|<=|>=|<|>|like)\s*('(?:[^']*)'|-?\d+(?:\.\d+)?)$/i.exec(
        raw.trim(),
      );
      if (!cm)
        throw new QueryError(
          `Could not read the condition “${raw.trim()}”. Try region = 'North' or total > 50.`,
          lineOf(sql, raw.trim().split(/\W/)[0] ?? 'where'),
        );
      const op = cm[2]!.toLowerCase() === '<>' ? '!=' : (cm[2]!.toLowerCase() as Condition['op']);
      const v = cm[3]!;
      conditions.push({
        column: column(cm[1]!),
        op,
        value: v.startsWith("'") ? v.slice(1, -1) : Number(v),
      });
    }
  }
  const test = (row: Row, c: Condition) => {
    const a = row[c.column]!;
    const b = c.value;
    switch (c.op) {
      case '=':
        return a === b;
      case '!=':
        return a !== b;
      case '<':
        return a < b;
      case '<=':
        return a <= b;
      case '>':
        return a > b;
      case '>=':
        return a >= b;
      case 'like': {
        const re = new RegExp(
          `^${String(b)
            .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
            .replace(/%/g, '.*')}$`,
          'i',
        );
        return re.test(String(a));
      }
    }
  };
  const kept = table.rows.filter((row) => conditions.every((c) => test(row, c)));

  // GROUP BY / aggregates
  const group = groupBy ? column(groupBy) : undefined;
  const aggregated = items.some((i) => i.agg);
  let rows: Row[];
  let columns: QueryResult['columns'];
  if (star) {
    if (group) throw new QueryError('Name the columns to group: SELECT region, count(*) …', 1);
    rows = kept.map((r) => ({ ...r }));
    columns = table.columns;
  } else if (aggregated || group) {
    for (const i of items)
      if (!i.agg && i.column !== group)
        throw new QueryError(
          group
            ? `${i.column} is neither grouped nor summed. Group by it, or wrap it in count, sum, avg, min or max.`
            : `Add GROUP BY ${i.column}, so each ${i.column} gets its own row.`,
          lineOf(sql, i.column),
        );
    const buckets = new Map<Value, Row[]>();
    for (const row of kept) {
      const key = group ? row[group]! : '';
      buckets.set(key, [...(buckets.get(key) ?? []), row]);
    }
    if (!group && !buckets.size) buckets.set('', []);
    rows = [...buckets.values()].map((bucket) => {
      const out: Row = {};
      for (const i of items) {
        if (!i.agg) out[i.alias] = bucket[0]![i.column]!;
        else if (i.agg === 'count') out[i.alias] = bucket.length;
        else {
          const nums = bucket.map((r) => Number(r[i.column]));
          const sum = nums.reduce((a, b) => a + b, 0);
          const v =
            i.agg === 'sum'
              ? sum
              : i.agg === 'avg'
                ? nums.length
                  ? sum / nums.length
                  : 0
                : i.agg === 'min'
                  ? Math.min(...nums)
                  : Math.max(...nums);
          out[i.alias] = Math.round(v * 100) / 100;
        }
      }
      return out;
    });
    columns = items.map((i) => ({
      name: i.alias,
      type: i.agg === 'count' ? 'number' : i.agg ? 'number' : typeOf(i.column),
    }));
  } else {
    rows = kept.map((r) => Object.fromEntries(items.map((i) => [i.alias, r[i.column]!])));
    columns = items.map((i) => ({ name: i.alias, type: typeOf(i.column) }));
  }

  // ORDER BY / LIMIT
  if (orderBy) {
    const key = columns.find((c) => c.name === orderBy.toLowerCase())?.name;
    if (!key) {
      const near = closest(
        orderBy,
        columns.map((c) => c.name),
      );
      throw new QueryError(
        `The result has no column “${orderBy}” to order by.${near ? ` Did you mean “${near}”?` : ''}`,
        lineOf(sql, orderBy),
        near ? swapWord(sql, orderBy, near) : undefined,
      );
    }
    const sign = dir?.toLowerCase() === 'desc' ? -1 : 1;
    rows.sort((a, b) => (a[key]! < b[key]! ? -sign : a[key]! > b[key]! ? sign : 0));
  }
  if (limit) rows = rows.slice(0, Number(limit));

  return { columns, rows, scanned: table.rows.length, ms: performance.now() - started };
}
