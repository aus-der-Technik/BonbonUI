import {
  canPoint,
  cellKey,
  colIndex,
  colName,
  dependents,
  errorInfo,
  evaluateFormula,
  evaluateSheet,
  fillSeries,
  firstCall,
  formatCompact,
  formatNumber,
  formulaContext,
  formulaRefs,
  insertColumn,
  insertRow,
  isError,
  moveRows,
  parseKey,
  parseLiteral,
  precedents,
  shiftFormula,
  sortOrder,
  tokenize,
  type Value,
} from './sheet';

const sheet = (inputs: Record<string, string>) => evaluateSheet(inputs);

describe('addresses', () => {
  it('converts between column letters and indexes', () => {
    expect(colName(0)).toBe('A');
    expect(colName(25)).toBe('Z');
    expect(colName(26)).toBe('AA');
    expect(colIndex('A')).toBe(0);
    expect(colIndex('aa')).toBe(26);
    expect(cellKey(1, 2)).toBe('B3');
  });

  it('parses keys, including absolute ones', () => {
    expect(parseKey('B3')).toEqual({ col: 1, row: 2 });
    expect(parseKey('$C$10')).toEqual({ col: 2, row: 9 });
    expect(parseKey('B0')).toBeNull();
    expect(parseKey('hello')).toBeNull();
  });
});

describe('literals', () => {
  it('reads numbers people type', () => {
    expect(parseLiteral('42')).toBe(42);
    expect(parseLiteral('1,200.5')).toBe(1200.5);
    expect(parseLiteral('-€40')).toBe(-40);
    expect(parseLiteral('12%')).toBeCloseTo(0.12);
    expect(parseLiteral('.5')).toBe(0.5);
  });

  it('keeps text and empties', () => {
    expect(parseLiteral('Q1')).toBe('Q1');
    expect(parseLiteral('  ')).toBeNull();
    expect(parseLiteral(undefined)).toBeNull();
  });

  it('formats numbers', () => {
    expect(formatNumber(1234.567)).toBe('1,234.57');
    expect(formatNumber(1234, 'currency')).toBe('€1,234');
    expect(formatNumber(0.125, 'percent')).toBe('12.5%');
    expect(formatCompact(12400)).toBe('12.4K');
    expect(formatCompact(12400, 'currency')).toBe('€12.4K');
    expect(formatCompact(0.34, 'percent')).toBe('34%');
  });
});

describe('evaluateFormula', () => {
  const read = (col: number, row: number): Value =>
    ({ A1: 2, A2: 3, A3: 'text', A4: null, B1: 10 })[cellKey(col, row)] ?? null;

  it('does arithmetic with precedence and parentheses', () => {
    expect(evaluateFormula('1+2*3', read)).toBe(7);
    expect(evaluateFormula('(1+2)*3', read)).toBe(9);
    expect(evaluateFormula('-A1+B1/2', read)).toBe(3);
    expect(evaluateFormula('50%*B1', read)).toBe(5);
  });

  it('reads cells and treats empty ones as zero', () => {
    expect(evaluateFormula('A1*A2', read)).toBe(6);
    expect(evaluateFormula('A4+1', read)).toBe(1);
    expect(evaluateFormula('a1', read)).toBe(2);
  });

  it('aggregates ranges and lists', () => {
    expect(evaluateFormula('SUM(A1:A4)', read)).toBe(5);
    expect(evaluateFormula('sum(A1, B1, 1)', read)).toBe(13);
    expect(evaluateFormula('AVERAGE(A1:A3)', read)).toBe(2.5);
    expect(evaluateFormula('MIN(A1:B1)', read)).toBe(2);
    expect(evaluateFormula('MAX(A1:B1)', read)).toBe(10);
    expect(evaluateFormula('COUNT(A1:A4)', read)).toBe(2);
    expect(evaluateFormula('MIN(A3:A4)', read)).toBe(0);
    expect(evaluateFormula('MAX(A3)', read)).toEqual({ error: 'value', detail: 'An argument' });
    expect(evaluateFormula('AVERAGE(A3:A4)', read)).toEqual({ error: 'div0' });
  });

  it('returns friendly error values', () => {
    expect(evaluateFormula('B1/(A1-2)', read)).toEqual({ error: 'div0' });
    expect(evaluateFormula('B1/A4', read)).toEqual({ error: 'div0', detail: 'A4' });
    expect(evaluateFormula('A3*2', read)).toEqual({ error: 'value', detail: 'A3' });
    expect(evaluateFormula('SUMM(A1:A2)', read)).toEqual({ error: 'name', detail: 'SUMM|SUM' });
    expect(evaluateFormula('NOPE(1)', read)).toEqual({ error: 'name', detail: 'NOPE' });
    expect(evaluateFormula('1+', read)).toEqual({ error: 'syntax' });
    expect(evaluateFormula('SUM(1', read)).toEqual({ error: 'syntax' });
    expect(evaluateFormula('1 2', read)).toEqual({ error: 'syntax' });
    expect(evaluateFormula('1 & 2', read)).toEqual({ error: 'syntax' });
    expect(evaluateFormula('#REF!+1', read)).toEqual({ error: 'ref' });
    expect(evaluateFormula('A1:A2', read)).toMatchObject({ error: 'value' });
    expect(evaluateFormula('A1:A2+1', read)).toMatchObject({ error: 'value' });
    expect(evaluateFormula('SUM()', read)).toBe(0);
  });

  it('passes text through a plain reference', () => {
    expect(evaluateFormula('A3', read)).toBe('text');
  });
});

describe('evaluateSheet', () => {
  it('computes chains of formulas', () => {
    const v = sheet({ A1: '2', A2: '=A1*3', A3: '=SUM(A1:A2)', B1: 'Total' });
    expect(v['A2']).toBe(6);
    expect(v['A3']).toBe(8);
    expect(v['B1']).toBe('Total');
  });

  it('names reference loops and lets the error travel to readers', () => {
    const v = sheet({ A1: '=B1', B1: '=A1+1', C1: '=B1*2', D1: '=D1' });
    expect(v['A1']).toEqual({ error: 'cycle', detail: 'A1 → B1 → A1' });
    expect(v['B1']).toMatchObject({ error: 'cycle' });
    expect(v['C1']).toMatchObject({ error: 'cycle' });
    expect(v['D1']).toEqual({ error: 'cycle', detail: 'D1 → D1' });
  });

  it('finds precedents and dependents with their distance', () => {
    const inputs = { A1: '1', A2: '=A1*2', A3: '=A2+1', B1: '=SUM(A1:A3)', C9: 'x' };
    expect(precedents('=A1+SUM(B1:B2)')).toEqual(['A1', 'B1', 'B2']);
    expect(precedents('42')).toEqual([]);
    expect(dependents(inputs, ['A1'])).toEqual([
      { key: 'A2', depth: 1 },
      { key: 'B1', depth: 1 },
      { key: 'A3', depth: 2 },
    ]);
  });
});

describe('errorInfo', () => {
  it('explains every error in plain words', () => {
    for (const error of ['cycle', 'div0', 'ref', 'name', 'syntax', 'value'] as const) {
      const info = errorInfo({ error });
      expect(info.label.length).toBeGreaterThan(0);
      expect(info.message).toMatch(/\.$/);
    }
    expect(errorInfo({ error: 'name', detail: 'SUMM|SUM' }).message).toContain('Did you mean SUM?');
    expect(errorInfo({ error: 'name', detail: 'NOPE' }).message).not.toContain('Did you mean');
    expect(errorInfo({ error: 'div0', detail: 'B9' }).message).toContain('B9, which is');
    expect(errorInfo({ error: 'cycle', detail: 'A1 → A1' }).message).toContain('A1 → A1');
    expect(isError({ error: 'ref' })).toBe(true);
    expect(isError(3)).toBe(false);
  });
});

describe('references', () => {
  it('lists the references of a formula with their offsets', () => {
    const refs = formulaRefs('=SUM(B2:C3)+a1');
    expect(refs.map((r) => r.text)).toEqual(['B2:C3', 'A1']);
    expect(refs[0]).toMatchObject({
      start: 5,
      end: 10,
      from: { col: 1, row: 1 },
      to: { col: 2, row: 2 },
    });
    expect(formulaRefs('B2')).toEqual([]);
  });

  it('tokenizes everything it is given', () => {
    expect(tokenize('SUM(B2:B3) + 1').map((t) => t.type)).toEqual([
      'name',
      '(',
      'range',
      ')',
      'space',
      'op',
      'space',
      'num',
    ]);
  });

  it('shifts relative references and keeps absolute ones', () => {
    expect(shiftFormula('=B2*$C$1+SUM(D2:D3)', 1, 2)).toBe('=C4*$C$1+SUM(E4:E5)');
    expect(shiftFormula('=A1', 0, -1)).toBe('=#REF!');
    expect(shiftFormula('=SUM(A1:A2)', -1, 0)).toBe('=SUM(#REF!)');
    expect(shiftFormula('plain', 1, 1)).toBe('plain');
  });

  it('inserts rows and grows ranges that end right above', () => {
    const out = insertRow({ A1: 'x', B3: '=SUM(B1:B2)', B4: '=B3', C5: '=B1' }, 2);
    expect(out).toEqual({ A1: 'x', B4: '=SUM(B1:B3)', B5: '=B4', C6: '=B1' });
    expect(insertRow({ A5: '=SUM(A2:A3)' }, 1)).toEqual({ A6: '=SUM(A3:A4)' });
  });

  it('inserts columns the same way', () => {
    const out = insertColumn({ A1: '1', B1: '2', C1: '=SUM(A1:B1)', D1: '=C1' }, 2);
    expect(out).toEqual({ A1: '1', B1: '2', D1: '=SUM(A1:C1)', E1: '=D1' });
  });

  it('moves rows with their single references, keeping ranges', () => {
    const out = moveRows(
      { A1: '5', B1: '=A1*2', C1: '=SUM(A1:B1)', A2: '7', B2: '=A2*2', A3: '=SUM(A1:A2)' },
      { 0: 1, 1: 0 },
    );
    expect(out).toEqual({
      A2: '5',
      B2: '=A2*2',
      C2: '=SUM(A2:B2)',
      A1: '7',
      B1: '=A1*2',
      A3: '=SUM(A1:A2)',
    });
  });
});

describe('sortOrder', () => {
  const values: Value[] = [3, 'b', null, 1, 'A', { error: 'div0' }, 2];

  it('sorts numbers, then text, then blanks and errors', () => {
    expect(sortOrder(values, 'asc')).toEqual([3, 6, 0, 4, 1, 2, 5]);
    expect(sortOrder(values, 'desc')).toEqual([0, 6, 3, 1, 4, 2, 5]);
  });

  it('is stable for equal values', () => {
    expect(sortOrder([1, 1, 1], 'desc')).toEqual([0, 1, 2]);
  });
});

describe('fillSeries', () => {
  it('continues a numeric step', () => {
    expect(fillSeries(['1', '2'], 3, 0, 1)).toEqual(['3', '4', '5']);
    expect(fillSeries(['10', '7.5'], 2, 0, 1)).toEqual(['5', '2.5']);
  });

  it('shifts formulas by their distance and repeats text', () => {
    expect(fillSeries(['=A1*2'], 2, 0, 1)).toEqual(['=A2*2', '=A3*2']);
    expect(fillSeries(['=A1', 'x'], 3, 1, 0)).toEqual(['=C1', 'x', '=E1']);
    expect(fillSeries(['5'], 2, 0, 1)).toEqual(['5', '5']);
  });
});

describe('typing help', () => {
  it('suggests functions for the word being typed', () => {
    const ctx = formulaContext('=SU', 3);
    expect(ctx.matches.map((f) => f.name)).toEqual(['SUM']);
    expect(ctx.word).toEqual({ text: 'SU', start: 1 });
    expect(formulaContext('=1+m', 4).matches.map((f) => f.name)).toEqual(['MIN', 'MAX']);
    expect(formulaContext('hello', 5).matches).toEqual([]);
  });

  it('knows which argument of which call the caret is in', () => {
    const ctx = formulaContext('=SUM(B2, MAX(C1:C2), ', 21);
    expect(ctx.call?.fn.name).toBe('SUM');
    expect(ctx.call?.arg).toBe(2);
    expect(formulaContext('=MAX(C1:C2', 10).call?.fn.name).toBe('MAX');
    expect(formulaContext('=(1+2', 5).call).toBeUndefined();
    expect(formulaContext('=1+2', 4)).toEqual({ matches: [] });
  });

  it('finds the first function of a formula for the hint', () => {
    expect(firstCall('=B2+sum(B1:B3)')).toMatchObject({ fn: { name: 'SUM' }, arg: -1 });
    expect(firstCall('=B2+1')).toBeUndefined();
    expect(firstCall('SUM(1)')).toBeUndefined();
  });

  it('allows pointing at cells after an operator', () => {
    expect(canPoint('=', 1)).toBe(true);
    expect(canPoint('=SUM(', 5)).toBe(true);
    expect(canPoint('=B2+ ', 5)).toBe(true);
    expect(canPoint('=B2', 3)).toBe(false);
    expect(canPoint('B2+', 3)).toBe(false);
  });
});
