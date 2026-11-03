<script lang="ts">
  /**
   * Example page: a spreadsheet (Storybook only). Every control sits where its effect shows —
   * formulas are edited in their cell, sort and filter live in the column header, the sum rides
   * on the selection, the fill handle and the format bar hang on its corner, "+" appears on the
   * edge it inserts at, a chart opens next to the cells it shows. A recalculation flashes the
   * changed cell and pulses its dependents, nearest first.
   */
  import { tick } from 'svelte';
  import { flip } from 'svelte/animate';
  import { cubicOut } from 'svelte/easing';
  import Page from '../patterns/templates/Page.svelte';
  import Layer from '../patterns/layout/Layer.svelte';
  import Button from '../patterns/atoms/Button.svelte';
  import Checkbox from '../patterns/atoms/Checkbox.svelte';
  import Icon from '../patterns/atoms/Icon.svelte';
  import IconButton from '../patterns/atoms/IconButton.svelte';
  import Kbd from '../patterns/atoms/Kbd.svelte';
  import type { IconName } from '../patterns/atoms/icons';
  import AvatarStack from '../patterns/molecules/AvatarStack.svelte';
  import ChartTooltip, { type TooltipState } from '../patterns/molecules/ChartTooltip.svelte';
  import CopyButton from '../patterns/molecules/CopyButton.svelte';
  import Popover from '../patterns/molecules/Popover.svelte';
  import ChartCard from '../patterns/organisms/ChartCard.svelte';
  import LineChart, { type LinePoint } from '../patterns/organisms/LineChart.svelte';
  import { hBarPath, niceMax } from '../utils/chart';
  import DesignNotes, { type DesignNote } from './DesignNotes.svelte';
  import {
    blankSheet,
    mockWorkbook,
    newRowId,
    sheetPeople,
    type CellAlign,
    type ColumnFilter,
    type SheetModel,
  } from './mock-sheet';
  import {
    canPoint,
    cellKey,
    colName,
    dependents,
    errorInfo,
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
    moveKeys,
    moveRows,
    parseKey,
    shiftFormula,
    sortOrder,
    tokenize,
    type FormulaRef,
    type FunctionInfo,
    type NumberFormat,
    type Value,
  } from './sheet-formula';

  interface Props {
    /** Name of the workbook in the top bar. */
    title?: string;
    savedLabel?: string;
    savingLabel?: string;
  }

  let {
    title = 'Candy shop 2026',
    savedLabel = 'All changes saved',
    savingLabel = 'Saving…',
  }: Props = $props();

  // Grid geometry in px: overlays are placed from these numbers, so cells use them too.
  const ROW_H = 30;
  const HEAD_H = 28;
  const GUTTER = 46;
  const CHART_W = 380;
  // Reference colours while a formula is shown: candy palette, distinct from the accent.
  const REF_COLORS = [
    'var(--color-blue)',
    'var(--color-purple)',
    'var(--color-orange)',
    'var(--color-pink)',
    'var(--color-teal)',
    'var(--color-indigo)',
  ];

  const uid = $props.id();
  const reduceMotion =
    typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;

  interface Sel {
    ar: number;
    ac: number;
    fr: number;
    fc: number;
  }
  interface Box {
    r1: number;
    c1: number;
    r2: number;
    c2: number;
  }
  interface Edit {
    row: number;
    col: number;
    text: string;
    /** Started by typing over the cell: arrows then commit, as in any sheet. */
    typed: boolean;
    /** The span of a reference inserted by pointing, replaced while you keep pointing. */
    point: [number, number] | null;
  }
  interface Snap {
    book: SheetModel[];
    active: number;
    sel: Sel;
  }
  interface Pulse {
    id: number;
    key: string;
    kind: 'cause' | 'effect';
    delay: number;
  }

  let book = $state<SheetModel[]>(mockWorkbook());
  let active = $state(0);
  // Starts on one product's quarters, so the sum chip and the format bar are there to discover.
  let sel = $state<Sel>({ ar: 3, ac: 1, fr: 3, fc: 4 });
  let edit = $state<Edit | null>(null);
  let caret = $state(0);
  let hintIndex = $state(0);
  let drag = $state<'select' | 'fill' | 'point' | null>(null);
  let fillTo = $state<{ row: number; col: number } | null>(null);
  let pointFrom: { row: number; col: number } | null = null;
  let past = $state.raw<Snap[]>([]);
  let future = $state.raw<Snap[]>([]);
  let saving = $state(false);
  let pulses = $state<Pulse[]>([]);
  let gridFocused = $state(false);
  // A single cell picked with the pointer gets the format bar; keyboard travel does not, so the
  // bar never covers the cell you just typed into.
  let pointed = $state(false);
  let scroller = $state<HTMLDivElement>();
  let canvas = $state<HTMLDivElement>();
  let editor = $state<HTMLInputElement>();
  let saveTimer: ReturnType<typeof setTimeout> | undefined;
  let pulseId = 0;

  const sheet = $derived(book[active] as SheetModel);
  const values = $derived(evaluateSheet(sheet.inputs));
  const cols = $derived(Array.from({ length: sheet.cols }, (_, c) => c));
  const colX = $derived(
    sheet.widths.reduce<number[]>((xs, w, c) => [...xs, (xs[c] ?? GUTTER) + w], [GUTTER]),
  );
  const canvasW = $derived(colX[sheet.cols] ?? GUTTER);

  // ── Values and formats ───────────────────────────────────────────────────────────────

  const valueAt = (row: number, col: number): Value => values[cellKey(col, row)] ?? null;
  const styleAt = (row: number, col: number) => sheet.styles[cellKey(col, row)] ?? {};
  const formatAt = (row: number, col: number): NumberFormat =>
    styleAt(row, col).format ?? sheet.colFormats[col] ?? 'auto';

  function show(row: number, col: number): string {
    const v = valueAt(row, col);
    if (v === null) return '';
    if (typeof v === 'number') return formatNumber(v, formatAt(row, col));
    if (isError(v)) return errorInfo(v).label;
    return v;
  }

  /** What a filter compares: the text as shown, "(blank)" for empty cells. */
  const filterText = (row: number, col: number) => show(row, col) || '(blank)';

  /** The column's name from the header row above the body ("Q1"), else its letter. */
  function fieldName(col: number): string {
    const head = sheet.body ? valueAt(sheet.body[0] - 1, col) : null;
    return typeof head === 'string' && head ? head : `column ${colName(col)}`;
  }

  function rowLabel(row: number): string {
    const v = valueAt(row, 0);
    return typeof v === 'string' && v ? v : `Row ${row + 1}`;
  }

  // ── Filters and visible rows ─────────────────────────────────────────────────────────

  function passes(f: ColumnFilter, row: number, col: number): boolean {
    if (f.hidden?.includes(filterText(row, col))) return false;
    const v = valueAt(row, col);
    if (typeof f.min === 'number' && !(typeof v === 'number' && v >= f.min)) return false;
    if (typeof f.max === 'number' && !(typeof v === 'number' && v <= f.max)) return false;
    return true;
  }

  const visRows = $derived.by(() => {
    const body = sheet.body;
    const filters = Object.entries(sheet.filters);
    return Array.from({ length: sheet.rows }, (_, r) => r).filter(
      (r) => !body || r < body[0] || r > body[1] || filters.every(([c, f]) => passes(f, r, +c)),
    );
  });
  const dispIdx = $derived(
    Object.fromEntries(visRows.map((r, i) => [r, i])) as Record<number, number>,
  );
  const hiddenCount = $derived(sheet.rows - visRows.length);
  const canvasH = $derived(HEAD_H + visRows.length * ROW_H);

  /** Pixel box of a cell range, or null when all its rows are filtered away. */
  function rectOf(b: Box) {
    const shown = visRows.filter((r) => r >= b.r1 && r <= b.r2);
    const first = shown[0];
    const last = shown.at(-1);
    if (first === undefined || last === undefined) return null;
    const top = HEAD_H + (dispIdx[first] ?? 0) * ROW_H;
    const bottom = HEAD_H + ((dispIdx[last] ?? 0) + 1) * ROW_H;
    const left = colX[b.c1] ?? GUTTER;
    const right = colX[b.c2 + 1] ?? canvasW;
    return { top, left, width: right - left, height: bottom - top, right, bottom };
  }

  const cellBox = (row: number, col: number): Box => ({ r1: row, c1: col, r2: row, c2: col });
  const refBox = (r: FormulaRef): Box => ({
    r1: r.from.row,
    c1: r.from.col,
    r2: r.to.row,
    c2: r.to.col,
  });

  // ── Selection ────────────────────────────────────────────────────────────────────────

  const box = $derived<Box>({
    r1: Math.min(sel.ar, sel.fr),
    r2: Math.max(sel.ar, sel.fr),
    c1: Math.min(sel.ac, sel.fc),
    c2: Math.max(sel.ac, sel.fc),
  });
  const selRect = $derived(rectOf(box));
  const activeRect = $derived(rectOf(cellBox(sel.ar, sel.ac)));
  const single = $derived(box.r1 === box.r2 && box.c1 === box.c2);
  const activeKey = $derived(cellKey(sel.ac, sel.ar));
  const activeInput = $derived(sheet.inputs[activeKey] ?? '');
  const activeValue = $derived(values[activeKey] ?? null);
  const inBox = (row: number, col: number) =>
    row >= box.r1 && row <= box.r2 && col >= box.c1 && col <= box.c2;

  const stats = $derived.by(() => {
    if (single) return null;
    const nums: number[] = [];
    for (const r of visRows) {
      if (r < box.r1 || r > box.r2) continue;
      for (let c = box.c1; c <= box.c2; c++) {
        const v = valueAt(r, c);
        if (typeof v === 'number') nums.push(v);
      }
    }
    if (!nums.length) return null;
    const sum = nums.reduce((a, b) => a + b, 0);
    const first = visRows.find((r) => r >= box.r1 && typeof valueAt(r, box.c1) === 'number');
    const format = formatAt(first ?? box.r1, box.c1);
    return { sum, avg: sum / nums.length, count: nums.length, format };
  });

  const peekRefs = $derived(
    single && !edit && activeInput.startsWith('=') ? formulaRefs(activeInput) : [],
  );
  const activeError = $derived(single && !edit && isError(activeValue) ? activeValue : null);
  const showBar = $derived(
    !edit && !drag && !!selRect && (!single || (pointed && activeInput !== '')),
  );
  let barW = $state(0);
  let chipW = $state(0);
  let noteH = $state(0);
  /**
   * The format bar floats above the selection; without room there (the top rows) it hangs below,
   * sharing one line with the sum chip, or under the formula / error note of a single cell.
   */
  const place = $derived.by(() => {
    if (!selRect) return null;
    const below = selRect.bottom + 8;
    const above = selRect.top - 44 >= HEAD_H + 2;
    const leftNote = !stats && (peekRefs.length > 0 || !!activeError);
    const bar = above
      ? { top: selRect.top - 42, left: selRect.left }
      : { top: below + (leftNote ? noteH + 6 : 0), left: selRect.left };
    let chip = Math.max(GUTTER + 4, selRect.right - chipW);
    if (!above && showBar && stats && bar.left + barW + 6 > chip) chip = bar.left + barW + 6;
    return {
      bar,
      // Hints open away from the selection, so they never cover the cells being formatted.
      tipAt: (above ? 'top' : 'bottom') as 'top' | 'bottom',
      chip: { top: below, left: chip },
      note: { top: below, left: selRect.left },
    };
  });

  function colorsFor(refs: FormulaRef[]): string[] {
    const seen: string[] = [];
    return refs.map((r) => {
      let i = seen.indexOf(r.text);
      if (i < 0) i = seen.push(r.text) - 1;
      return REF_COLORS[i % REF_COLORS.length] as string;
    });
  }

  /** A formula split into plain text and coloured references. */
  function segments(text: string) {
    const refs = formulaRefs(text);
    const colors = colorsFor(refs);
    const out: { text: string; color?: string | undefined }[] = [];
    let at = 0;
    refs.forEach((r, i) => {
      if (r.start > at) out.push({ text: text.slice(at, r.start) });
      out.push({ text: text.slice(r.start, r.end), color: colors[i] });
      at = r.end;
    });
    if (at < text.length) out.push({ text: text.slice(at) });
    return out;
  }

  // ── History, saving, the recalc cue ──────────────────────────────────────────────────

  const snap = (): Snap => ({
    book: $state.snapshot(book) as SheetModel[],
    active,
    sel: { ...sel },
  });

  function markSaved() {
    saving = true;
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => (saving = false), 700);
  }

  /** Records an undo step, applies the change and shows what it caused. */
  function change(mutate: () => void, causes: string[] = []) {
    const before = values;
    past = [...past.slice(-60), snap()];
    future = [];
    mutate();
    markSaved();
    if (causes.length) cue(causes, before);
  }

  /** The changed cells flash; cells that read them pulse once, nearest first. */
  function cue(causes: string[], before: Record<string, Value>) {
    const after = values;
    const differs = (k: string) =>
      JSON.stringify(before[k] ?? null) !== JSON.stringify(after[k] ?? null);
    const effects = dependents(sheet.inputs, causes).filter((d) => differs(d.key));
    const batch: Pulse[] = [
      ...causes.map((key) => ({ id: ++pulseId, key, kind: 'cause' as const, delay: 0 })),
      ...effects.map((d) => ({
        id: ++pulseId,
        key: d.key,
        kind: 'effect' as const,
        delay: reduceMotion ? 0 : 140 + d.depth * 160,
      })),
    ];
    pulses = batch;
    const last = pulseId;
    setTimeout(() => {
      if (pulseId === last) pulses = [];
    }, 2000);
  }

  function restore(to: Snap, from: Snap) {
    const before = values;
    const oldInputs = from.book[from.active]?.inputs ?? {};
    book = structuredClone(to.book);
    active = to.active;
    sel = { ...to.sel };
    markSaved();
    if (from.active !== to.active) return;
    const keys = new Set([...Object.keys(oldInputs), ...Object.keys(sheet.inputs)]);
    const changed = [...keys].filter((k) => oldInputs[k] !== sheet.inputs[k]);
    if (changed.length) cue(changed, before);
    reveal(sel.fr, sel.fc);
  }

  function undo() {
    const prev = past.at(-1);
    if (!prev || edit) return;
    const now = snap();
    past = past.slice(0, -1);
    future = [...future, now];
    restore(prev, now);
  }

  function redo() {
    const next = future.at(-1);
    if (!next || edit) return;
    const now = snap();
    future = future.slice(0, -1);
    past = [...past, now];
    restore(next, now);
  }

  // ── Moving around ────────────────────────────────────────────────────────────────────

  function stepRow(row: number, d: number): number {
    const i = dispIdx[row] ?? visRows.findIndex((r) => r >= row);
    const j = Math.max(0, Math.min(visRows.length - 1, i + d));
    return visRows[j] ?? row;
  }

  function reveal(row: number, col: number) {
    const r = rectOf(cellBox(row, col));
    if (!r || !scroller) return;
    const s = scroller;
    if (r.top - HEAD_H < s.scrollTop) s.scrollTop = r.top - HEAD_H;
    else if (r.bottom > s.scrollTop + s.clientHeight) s.scrollTop = r.bottom - s.clientHeight + 8;
    if (r.left - GUTTER < s.scrollLeft) s.scrollLeft = r.left - GUTTER;
    else if (r.right > s.scrollLeft + s.clientWidth) s.scrollLeft = r.right - s.clientWidth + 8;
  }

  function moveTo(row: number, col: number, extend = false) {
    const c = Math.max(0, Math.min(sheet.cols - 1, col));
    pointed = false;
    sel = extend ? { ...sel, fr: row, fc: c } : { ar: row, ac: c, fr: row, fc: c };
    reveal(row, c);
  }

  function move(dr: number, dc: number, extend = false) {
    const from = extend ? { r: sel.fr, c: sel.fc } : { r: sel.ar, c: sel.ac };
    moveTo(dr ? stepRow(from.r, dr) : from.r, from.c + dc, extend);
  }

  function selectColumn(col: number, extend: boolean) {
    const last = sheet.rows - 1;
    sel = extend ? { ar: 0, ac: sel.ac, fr: last, fc: col } : { ar: 0, ac: col, fr: last, fc: col };
    canvas?.focus({ preventScroll: true });
  }

  function selectRow(row: number, extend: boolean) {
    const last = sheet.cols - 1;
    sel = extend ? { ar: sel.ar, ac: 0, fr: row, fc: last } : { ar: row, ac: 0, fr: row, fc: last };
    canvas?.focus({ preventScroll: true });
  }

  function cellAt(x: number, y: number): { row: number; col: number } | null {
    if (!canvas) return null;
    const b = canvas.getBoundingClientRect();
    const px = x - b.left;
    const py = y - b.top;
    let col = 0;
    while (col < sheet.cols - 1 && (colX[col + 1] ?? Infinity) <= px) col++;
    const i = Math.max(0, Math.min(visRows.length - 1, Math.floor((py - HEAD_H) / ROW_H)));
    const row = visRows[i];
    return row === undefined ? null : { row, col };
  }

  // ── Editing in the cell ──────────────────────────────────────────────────────────────

  async function startEdit(row: number, col: number, text?: string) {
    reveal(row, col);
    edit = {
      row,
      col,
      text: text ?? sheet.inputs[cellKey(col, row)] ?? '',
      typed: text !== undefined,
      point: null,
    };
    hintIndex = 0;
    await tick();
    const end = edit?.text.length ?? 0;
    editor?.focus();
    editor?.setSelectionRange(end, end);
    caret = end;
  }

  /** Upper-cases names and references and closes brackets left open — a small kindness. */
  function tidy(text: string): string {
    const trimmed = text.trim();
    if (!trimmed.startsWith('=')) return trimmed;
    const body = tokenize(trimmed.slice(1))
      .map((t) =>
        t.type === 'ref' || t.type === 'range' || t.type === 'name' ? t.text.toUpperCase() : t.text,
      )
      .join('');
    const open = [...body].reduce((n, ch) => n + (ch === '(' ? 1 : ch === ')' ? -1 : 0), 0);
    return `=${body}${')'.repeat(Math.max(0, open))}`;
  }

  function setInput(key: string, text: string) {
    if (text === '') delete sheet.inputs[key];
    else sheet.inputs[key] = text;
  }

  function commitEdit(step?: [number, number]) {
    if (!edit) return;
    const { row, col, text } = edit;
    edit = null;
    const key = cellKey(col, row);
    const next = tidy(text);
    if (next !== (sheet.inputs[key] ?? '')) change(() => setInput(key, next), [key]);
    if (step) move(step[0], step[1]);
    canvas?.focus({ preventScroll: true });
  }

  function cancelEdit() {
    edit = null;
    canvas?.focus({ preventScroll: true });
  }

  const ctx = $derived(edit ? formulaContext(edit.text, caret) : { matches: [] as FunctionInfo[] });
  // Outside any call the hint still explains the formula's main function.
  const call = $derived(ctx.call ?? (edit ? firstCall(edit.text) : undefined));
  const editRefs = $derived(edit ? formulaRefs(edit.text) : []);
  const editRect = $derived(edit ? rectOf(cellBox(edit.row, edit.col)) : null);

  function readCaret() {
    caret = editor?.selectionStart ?? caret;
  }

  function onEditInput(event: Event & { currentTarget: HTMLInputElement }) {
    if (!edit) return;
    edit.text = event.currentTarget.value;
    edit.point = null;
    hintIndex = 0;
    readCaret();
  }

  async function accept(fn: FunctionInfo) {
    if (!edit || !ctx.word) return;
    const { start } = ctx.word;
    const insert = `${fn.name}(`;
    edit.text = edit.text.slice(0, start) + insert + edit.text.slice(caret);
    caret = start + insert.length;
    await tick();
    editor?.focus();
    editor?.setSelectionRange(caret, caret);
  }

  const ARROWS: Record<string, [number, number]> = {
    ArrowUp: [-1, 0],
    ArrowDown: [1, 0],
    ArrowLeft: [0, -1],
    ArrowRight: [0, 1],
  };

  function onEditKey(event: KeyboardEvent) {
    if (!edit || event.isComposing) return;
    const list = ctx.word ? ctx.matches : [];
    if (list.length) {
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        hintIndex = (hintIndex + (event.key === 'ArrowDown' ? 1 : -1) + list.length) % list.length;
        return;
      }
      if (event.key === 'Tab' || event.key === 'Enter') {
        event.preventDefault();
        const fn = list[hintIndex];
        if (fn) accept(fn);
        return;
      }
    }
    const arrow = ARROWS[event.key];
    if (event.key === 'Enter') {
      event.preventDefault();
      commitEdit([event.shiftKey ? -1 : 1, 0]);
    } else if (event.key === 'Tab') {
      event.preventDefault();
      commitEdit([0, event.shiftKey ? -1 : 1]);
    } else if (event.key === 'Escape') {
      event.preventDefault();
      cancelEdit();
    } else if (arrow && edit.typed && !edit.text.startsWith('=')) {
      event.preventDefault();
      commitEdit(arrow);
    }
  }

  function onEditBlur() {
    // Chrome also blurs an input it removes; by then the edit is already committed.
    if (edit && drag !== 'point') commitEdit();
  }

  /** Clicking cells while a formula waits for an operand writes their address into it. */
  async function point(a: { row: number; col: number }, b: { row: number; col: number }) {
    if (!edit) return;
    const tl = cellKey(Math.min(a.col, b.col), Math.min(a.row, b.row));
    const br = cellKey(Math.max(a.col, b.col), Math.max(a.row, b.row));
    const ref = tl === br ? tl : `${tl}:${br}`;
    const [s, e] = edit.point ?? [caret, caret];
    edit.text = edit.text.slice(0, s) + ref + edit.text.slice(e);
    edit.point = [s, s + ref.length];
    caret = s + ref.length;
    await tick();
    editor?.setSelectionRange(caret, caret);
  }

  // ── Pointer: select, point, fill ─────────────────────────────────────────────────────

  function onGridPointerDown(event: PointerEvent) {
    if (event.button !== 0) return;
    const target = event.target as HTMLElement;
    if (target.closest('[data-overlay], [data-head]')) return;
    const hit = cellAt(event.clientX, event.clientY);
    if (!hit) return;
    if (edit) {
      if (edit.text.startsWith('=') && (edit.point || canPoint(edit.text, caret))) {
        event.preventDefault();
        pointFrom = hit;
        drag = 'point';
        point(hit, hit);
        return;
      }
      commitEdit();
    }
    event.preventDefault();
    pointed = true;
    if (event.shiftKey) sel = { ...sel, fr: hit.row, fc: hit.col };
    else sel = { ar: hit.row, ac: hit.col, fr: hit.row, fc: hit.col };
    // On touch a drag scrolls the sheet; ranges come from shift, headers and the keyboard.
    if (event.pointerType === 'mouse') drag = 'select';
    canvas?.focus({ preventScroll: true });
  }

  function onFillDown(event: PointerEvent) {
    event.preventDefault();
    event.stopPropagation();
    drag = 'fill';
    fillTo = null;
  }

  function onWindowMove(event: PointerEvent) {
    if (!drag) return;
    const hit = cellAt(event.clientX, event.clientY);
    if (!hit) return;
    if (drag === 'select') sel = { ...sel, fr: hit.row, fc: hit.col };
    else if (drag === 'point' && pointFrom) point(pointFrom, hit);
    else if (drag === 'fill') fillTo = hit;
  }

  function onWindowUp() {
    if (drag === 'fill' && fillBox) applyFill(fillBox);
    if (drag === 'point') editor?.focus();
    drag = null;
    fillTo = null;
    pointFrom = null;
  }

  const fillBox = $derived.by(() => {
    if (!fillTo) return null;
    const down = fillTo.row - box.r2;
    const right = fillTo.col - box.c2;
    if (down > 0 && down >= right)
      return { ...box, r1: box.r2 + 1, r2: fillTo.row, dir: 'down' as const };
    if (right > 0) return { ...box, c1: box.c2 + 1, c2: fillTo.col, dir: 'right' as const };
    return null;
  });

  function applyFill(f: Box & { dir: 'down' | 'right' }) {
    const keys: string[] = [];
    change(() => {
      if (f.dir === 'down') {
        for (let c = box.c1; c <= box.c2; c++) {
          const src = Array.from({ length: box.r2 - box.r1 + 1 }, (_, i) => box.r1 + i);
          const out = fillSeries(
            src.map((r) => sheet.inputs[cellKey(c, r)] ?? ''),
            f.r2 - f.r1 + 1,
            0,
            1,
          );
          out.forEach((text, i) => {
            const key = cellKey(c, f.r1 + i);
            setInput(key, text);
            copyStyle(cellKey(c, src[i % src.length] ?? box.r1), key);
            keys.push(key);
          });
        }
      } else {
        for (let r = box.r1; r <= box.r2; r++) {
          const src = Array.from({ length: box.c2 - box.c1 + 1 }, (_, i) => box.c1 + i);
          const out = fillSeries(
            src.map((c) => sheet.inputs[cellKey(c, r)] ?? ''),
            f.c2 - f.c1 + 1,
            1,
            0,
          );
          out.forEach((text, i) => {
            const key = cellKey(f.c1 + i, r);
            setInput(key, text);
            copyStyle(cellKey(src[i % src.length] ?? box.c1, r), key);
            keys.push(key);
          });
        }
      }
    }, keys);
    sel = { ar: box.r1, ac: box.c1, fr: Math.max(box.r2, f.r2), fc: Math.max(box.c2, f.c2) };
  }

  function copyStyle(from: string, to: string) {
    const s = sheet.styles[from];
    if (s) sheet.styles[to] = { ...s };
    else delete sheet.styles[to];
  }

  // ── Keyboard on the grid ─────────────────────────────────────────────────────────────

  function onGridKey(event: KeyboardEvent) {
    if (edit || event.target !== canvas) return;
    const mod = event.metaKey || event.ctrlKey;
    const key = event.key;
    if (mod) {
      const k = key.toLowerCase();
      if (k === 'z') {
        if (event.shiftKey) redo();
        else undo();
      } else if (k === 'y') redo();
      else if (k === 'a') sel = { ar: 0, ac: 0, fr: sheet.rows - 1, fc: sheet.cols - 1 };
      else if (k === 'b') toggleBold();
      else return;
      event.preventDefault();
      return;
    }
    const arrow = ARROWS[key];
    if (arrow) {
      event.preventDefault();
      move(arrow[0], arrow[1], event.shiftKey);
    } else if (key === 'Tab') {
      const edge = event.shiftKey ? sel.ac === 0 : sel.ac === sheet.cols - 1;
      if (edge) return; // let focus leave the grid at its edge
      event.preventDefault();
      move(0, event.shiftKey ? -1 : 1);
    } else if (key === 'Enter' || key === 'F2') {
      event.preventDefault();
      startEdit(sel.ar, sel.ac);
    } else if (key === 'Escape') {
      sel = { ...sel, fr: sel.ar, fc: sel.ac };
    } else if (key === 'Delete' || key === 'Backspace') {
      event.preventDefault();
      clearSelection();
    } else if (key === 'Home') {
      event.preventDefault();
      moveTo(sel.ar, 0, event.shiftKey);
    } else if (key === 'End') {
      event.preventDefault();
      moveTo(sel.ar, sheet.cols - 1, event.shiftKey);
    } else if (key === ' ' && event.shiftKey) {
      event.preventDefault();
      selectRow(sel.ar, false);
    } else if (key.length === 1 && !event.altKey) {
      event.preventDefault();
      startEdit(sel.ar, sel.ac, key);
    }
  }

  function clearSelection() {
    const keys = Object.keys(sheet.inputs).filter((k) => {
      const at = parseKey(k);
      return !!at && inBox(at.row, at.col);
    });
    if (keys.length) change(() => keys.forEach((k) => delete sheet.inputs[k]), keys);
  }

  // ── Format bar ───────────────────────────────────────────────────────────────────────

  function eachSelected(fn: (key: string, row: number, col: number) => void) {
    for (let r = box.r1; r <= box.r2; r++)
      for (let c = box.c1; c <= box.c2; c++) fn(cellKey(c, r), r, c);
  }

  /** Back to the grid after a click elsewhere, so typing goes into the selected cell. */
  const backToGrid = () => canvas?.focus({ preventScroll: true });

  function setStyle(patch: { format?: NumberFormat; bold?: boolean; align?: CellAlign }) {
    change(() => eachSelected((key) => (sheet.styles[key] = { ...sheet.styles[key], ...patch })));
    backToGrid();
  }

  const allBold = $derived.by(() => {
    for (let r = box.r1; r <= box.r2; r++)
      for (let c = box.c1; c <= box.c2; c++) if (!styleAt(r, c).bold) return false;
    return true;
  });

  function toggleBold() {
    setStyle({ bold: !allBold });
  }

  const isNumber = (row: number, col: number) => typeof valueAt(row, col) === 'number';
  const activeAlign = $derived(
    styleAt(sel.ar, sel.ac).align ?? (isNumber(sel.ar, sel.ac) ? 'right' : 'left'),
  );

  const FORMATS: { value: NumberFormat; text: string; label: string }[] = [
    { value: 'number', text: '123', label: 'Plain number' },
    { value: 'currency', text: '€', label: 'Currency' },
    { value: 'percent', text: '%', label: 'Percent' },
  ];
  const ALIGNS: { value: CellAlign; icon: IconName; label: string }[] = [
    { value: 'left', icon: 'align-left', label: 'Align left' },
    { value: 'center', icon: 'align-center', label: 'Align centre' },
    { value: 'right', icon: 'align-right', label: 'Align right' },
  ];

  // ── Chart from the selection ─────────────────────────────────────────────────────────

  const canChart = $derived(!!stats && stats.count >= 2);

  function makeChart() {
    change(() => (sheet.chart = { ...box }));
    // The chart is what you look at now; the source keeps a dashed outline.
    sel = { ...sel, fr: sel.ar, fc: sel.ac };
    pointed = false;
    backToGrid();
  }

  const chart = $derived.by(() => {
    const ch = sheet.chart;
    if (!ch) return null;
    const source = `${cellKey(ch.c1, ch.r1)}:${cellKey(ch.c2, ch.r2)}`;
    if (ch.r1 === ch.r2) {
      const points: LinePoint[] = [];
      for (let c = ch.c1; c <= ch.c2; c++) {
        const v = valueAt(ch.r1, c);
        if (typeof v === 'number' || points.length) {
          points.push({ label: fieldName(c), value: typeof v === 'number' ? v : null });
        }
      }
      const nums = points.flatMap((p) => (p.value == null ? [] : [p.value]));
      const max = niceMax(Math.max(...nums, 0));
      const min = Math.min(0, ...nums);
      return {
        kind: 'line' as const,
        title: rowLabel(ch.r1),
        source,
        format: formatAt(ch.r1, ch.c2),
        points,
        min,
        max,
        total: nums.reduce((a, b) => a + b, 0),
      };
    }
    let col = ch.c1;
    for (let c = ch.c1; c <= ch.c2; c++) {
      if (visRows.some((r) => r >= ch.r1 && r <= ch.r2 && isNumber(r, c))) {
        col = c;
        break;
      }
    }
    const bars = visRows
      .filter((r) => r >= ch.r1 && r <= ch.r2 && isNumber(r, col))
      .map((r) => ({ row: r, label: rowLabel(r), value: valueAt(r, col) as number }));
    return {
      kind: 'bars' as const,
      column: fieldName(col),
      title: `${fieldName(col)} by ${sheet.body ? fieldName(0).toLowerCase() : 'row'}`,
      source,
      format: formatAt(bars[0]?.row ?? ch.r1, col),
      bars,
      max: Math.max(...bars.map((b) => b.value), 0),
      total: bars.reduce((a, b) => a + b.value, 0),
    };
  });

  const chartPlace = $derived.by(() => {
    const ch = sheet.chart;
    const r = ch ? rectOf(ch) : null;
    if (!r) return null;
    const room = Math.max(canvasW, scroller?.clientWidth ?? 0);
    if (r.right + 16 + CHART_W <= room) return { left: r.right + 16, top: r.top };
    if (r.left - 16 - CHART_W >= GUTTER) return { left: r.left - 16 - CHART_W, top: r.top };
    return { left: Math.max(GUTTER + 8, r.left), top: r.bottom + 16 };
  });

  let barsWidth = $state(0);
  let barTip = $state<TooltipState | null>(null);
  let barHover = $state<number | null>(null);
  const BAR_LABEL_W = 96;
  const BAR_ROW = 22;

  // ── Sort, filter, insert ─────────────────────────────────────────────────────────────

  function sortBy(col: number) {
    const body = sheet.body;
    if (!body) return;
    const dir = sheet.sort?.col === col && sheet.sort.dir === 'asc' ? 'desc' : 'asc';
    const rows = Array.from({ length: body[1] - body[0] + 1 }, (_, i) => body[0] + i);
    const order = sortOrder(
      rows.map((r) => valueAt(r, col)),
      dir,
    );
    const rowMap: Record<number, number> = {};
    order.forEach((src, i) => (rowMap[rows[src] as number] = rows[i] as number));
    change(() => {
      const ids = [...sheet.rowIds];
      for (const [from, to] of Object.entries(rowMap)) ids[to] = sheet.rowIds[+from] as string;
      sheet.inputs = moveRows(sheet.inputs, rowMap);
      sheet.styles = moveKeys(sheet.styles, (a) => ({ ...a, row: rowMap[a.row] ?? a.row }));
      sheet.rowIds = ids;
      sheet.sort = { col, dir };
    });
    sel = { ar: body[0], ac: col, fr: body[1], fc: col };
  }

  function sortLabel(col: number): string {
    const on = sheet.sort?.col === col ? sheet.sort.dir : null;
    const name = fieldName(col);
    if (on === 'asc') return `Sorted by ${name}, smallest first. Sort largest first`;
    if (on === 'desc') return `Sorted by ${name}, largest first. Sort smallest first`;
    return `Sort by ${name}`;
  }

  /** Sort and filter only appear on columns that hold part of the list. */
  function hasData(col: number): boolean {
    const body = sheet.body;
    if (!body) return false;
    for (let r = body[0]; r <= body[1]; r++) if (valueAt(r, col) !== null) return true;
    return false;
  }

  function columnKind(col: number): 'number' | 'text' {
    const body = sheet.body;
    if (!body) return 'text';
    let nums = 0;
    let texts = 0;
    for (let r = body[0]; r <= body[1]; r++) {
      const v = valueAt(r, col);
      if (typeof v === 'number') nums++;
      else if (typeof v === 'string') texts++;
    }
    return nums > texts ? 'number' : 'text';
  }

  function distinct(col: number): { text: string; count: number }[] {
    const body = sheet.body;
    if (!body) return [];
    const counts: Record<string, number> = {};
    for (let r = body[0]; r <= body[1]; r++) {
      const t = filterText(r, col);
      counts[t] = (counts[t] ?? 0) + 1;
    }
    return Object.entries(counts)
      .map(([text, count]) => ({ text, count }))
      .sort((a, b) => a.text.localeCompare(b.text));
  }

  function setFilter(col: number, patch: ColumnFilter) {
    const next = { ...sheet.filters[col], ...patch };
    const empty = !next.hidden?.length && next.min == null && next.max == null;
    if (empty) delete sheet.filters[col];
    else sheet.filters[col] = next;
    markSaved();
  }

  function toggleValue(col: number, text: string, on: boolean) {
    const hidden = sheet.filters[col]?.hidden ?? [];
    setFilter(col, { hidden: on ? hidden.filter((t) => t !== text) : [...hidden, text] });
  }

  function numberInput(event: Event & { currentTarget: HTMLInputElement }): number | null {
    // A number input hands back a number (or NaN when empty), never the typed string.
    const n = event.currentTarget.valueAsNumber;
    return Number.isFinite(n) ? n : null;
  }

  const bodyCount = $derived(sheet.body ? sheet.body[1] - sheet.body[0] + 1 : 0);

  function addRow(at: number) {
    change(
      () => {
        const above = at - 1;
        sheet.inputs = insertRow(sheet.inputs, at);
        sheet.styles = moveKeys(sheet.styles, (a) => (a.row >= at ? { ...a, row: a.row + 1 } : a));
        sheet.rowIds = [...sheet.rowIds.slice(0, at), newRowId(), ...sheet.rowIds.slice(at)];
        sheet.rows += 1;
        const body = sheet.body;
        if (body && at <= body[0]) sheet.body = [body[0] + 1, body[1] + 1];
        else if (body && at <= body[1] + 1) {
          sheet.body = [body[0], body[1] + 1];
          // A new row in a list gets the list's formulas, so its totals work straight away.
          for (const c of cols) {
            const f = sheet.inputs[cellKey(c, above)];
            if (f?.startsWith('=')) sheet.inputs[cellKey(c, at)] = shiftFormula(f, 0, 1);
          }
        }
        if (sheet.chart && sheet.chart.r2 >= at) {
          const ch = sheet.chart;
          sheet.chart = { ...ch, r1: ch.r1 >= at ? ch.r1 + 1 : ch.r1, r2: ch.r2 + 1 };
        }
      },
      cols.map((c) => cellKey(c, at)),
    );
    moveTo(at, 0);
    backToGrid();
  }

  function addColumn(at: number) {
    change(() => {
      sheet.inputs = insertColumn(sheet.inputs, at);
      sheet.styles = moveKeys(sheet.styles, (a) => (a.col >= at ? { ...a, col: a.col + 1 } : a));
      sheet.widths = [...sheet.widths.slice(0, at), 100, ...sheet.widths.slice(at)];
      sheet.colFormats = [
        ...sheet.colFormats.slice(0, at),
        sheet.colFormats[at - 1] ?? 'auto',
        ...sheet.colFormats.slice(at),
      ];
      sheet.cols += 1;
      const filters: Record<number, ColumnFilter> = {};
      for (const [c, f] of Object.entries(sheet.filters)) filters[+c >= at ? +c + 1 : +c] = f;
      sheet.filters = filters;
      if (sheet.sort && sheet.sort.col >= at)
        sheet.sort = { ...sheet.sort, col: sheet.sort.col + 1 };
      if (sheet.chart && sheet.chart.c2 >= at) {
        const ch = sheet.chart;
        sheet.chart = { ...ch, c1: ch.c1 >= at ? ch.c1 + 1 : ch.c1, c2: ch.c2 + 1 };
      }
    });
    moveTo(sel.ar, at);
    backToGrid();
  }

  // ── Sheets ───────────────────────────────────────────────────────────────────────────

  async function openSheet(i: number) {
    if (edit) commitEdit();
    active = i;
    sel = { ar: 0, ac: 0, fr: 0, fc: 0 };
    pointed = false;
    pulses = [];
    await tick();
    scroller?.scrollTo({ top: 0, left: 0 });
  }

  function addSheet() {
    change(() => book.push(blankSheet(book.length + 1)));
    openSheet(book.length - 1);
    canvas?.focus();
  }

  function onTabKey(event: KeyboardEvent, i: number) {
    const d = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
    if (!d) return;
    event.preventDefault();
    const next = (i + d + book.length) % book.length;
    openSheet(next);
    tick().then(() => document.getElementById(`${uid}-tab-${next}`)?.focus());
  }

  const isEmpty = $derived(Object.keys(sheet.inputs).length === 0);
  const firstError = $derived(Object.keys(values).find((k) => isError(values[k])));

  const notes: DesignNote[] = [
    {
      principle: 'locality',
      title: 'Sort and filter live in the column they change',
      body: 'Point at a column letter: the arrows sort it, the funnel filters it, and the menu opens right under that column. Nothing to hunt for in a toolbar far away.',
      target: '[data-note="column-tools"]',
    },
    {
      principle: 'locality',
      title: 'The sum rides on the selection',
      body: 'Drag over numbers and their sum, average and count hang off the corner of what you selected — your eyes are already there.',
      target: '[data-note="stats"]',
    },
    {
      principle: 'locality',
      title: 'Format where the numbers are',
      body: 'Currency, percent, bold, alignment and "chart this" float just above the selection, and the chart opens beside the cells it shows.',
      target: '[data-note="format-bar"]',
    },
    {
      principle: 'function',
      title: 'Formulas open in their own cell',
      body: 'Double-click a year total: the cell grows into an editor, each range outlines itself in the grid in the colour it has in the formula, and the function explains itself underneath.',
      target: '[data-note="formula-cell"]',
    },
    {
      principle: 'cues',
      title: 'Cause flashes, effects pulse',
      body: 'Change a quarter: that cell flashes, then its year total and the column totals pulse once, nearest first — you see what your edit touched.',
      target: '[data-note="totals"]',
    },
    {
      principle: 'friendly',
      title: 'Errors say what to do',
      body: 'Sour drops started in Q2, so its growth divides by zero. The cell says so in two words; select it for one plain sentence on how to fix it — no cryptic codes.',
      target: '[data-note="error-cell"]',
    },
    {
      principle: 'cues',
      title: 'Tabs sit on the sheet they switch',
      body: 'The grid is one panel with its tabs on its own edge. Only things that float — the top bar, the format bar, the chips — are glass.',
      target: '[data-note="tabs"]',
    },
  ];
</script>

<svelte:window onpointermove={onWindowMove} onpointerup={onWindowUp} onpointercancel={onWindowUp} />

{#snippet formula(text: string)}
  {#each segments(text) as seg, i (i)}{#if seg.color}<span class="ref" style:color={seg.color}
        >{seg.text}</span
      >{:else}{seg.text}{/if}{/each}
{/snippet}

{#snippet outline(b: Box, color: string, dashed: boolean)}
  {@const r = rectOf(b)}
  {#if r}
    <span
      class="ref-box"
      class:dashed
      style:--ref={color}
      style:top="{r.top}px"
      style:left="{r.left}px"
      style:width="{r.width}px"
      style:height="{r.height}px"
    ></span>
  {/if}
{/snippet}

<Page {title} subtitle={saving ? savingLabel : savedLabel} fill gap="md">
  {#snippet actions()}
    <Button
      variant="glass"
      icon="undo"
      label="Undo"
      title="Undo (⌘Z)"
      iconOnly
      disabled={!past.length}
      onclick={undo}
    />
    <Button
      variant="glass"
      icon="redo"
      label="Redo"
      title="Redo (⇧⌘Z)"
      iconOnly
      disabled={!future.length}
      onclick={redo}
    />
    <span class="people"><AvatarStack people={sheetPeople} size={30} presence /></span>
    <Popover title="Share this workbook" placement="bottom-end" width="19rem">
      {#snippet trigger(props)}
        <Button {...props} variant="primary" icon="share" label="Share" collapse />
      {/snippet}
      <p class="share-text">
        Anyone at example.com with the link can view. They see your changes as you make them.
      </p>
      <CopyButton value="https://sheets.example.com/candy-shop-2026" label="Copy link" />
    </Popover>
  {/snippet}

  <Layer level="panel" padding="none" gap="none" class="sheet-book" data-note="book">
    <div
      class="scroller"
      bind:this={scroller}
      role="tabpanel"
      id="{uid}-panel"
      aria-labelledby="{uid}-tab-{active}"
    >
      <div
        class="canvas"
        class:focused={gridFocused}
        bind:this={canvas}
        role="grid"
        tabindex="0"
        aria-label={sheet.name}
        aria-multiselectable="true"
        aria-rowcount={sheet.rows + 1}
        aria-colcount={sheet.cols + 1}
        aria-activedescendant={edit ? undefined : `${uid}-${activeKey}`}
        style:width="{canvasW}px"
        style:height="{canvasH}px"
        onpointerdown={onGridPointerDown}
        ondblclick={(event) => {
          const target = event.target as HTMLElement;
          if (target.closest('[data-overlay], [data-head]')) return;
          const hit = cellAt(event.clientX, event.clientY);
          if (hit) startEdit(hit.row, hit.col);
        }}
        onkeydown={onGridKey}
        onfocus={() => (gridFocused = true)}
        onblur={() => (gridFocused = false)}
      >
        <div class="row head-row" role="row" aria-rowindex={1} data-head>
          <div class="corner" role="columnheader" aria-colindex={1}>
            <button
              type="button"
              class="hit"
              tabindex="-1"
              aria-label="Select the whole sheet"
              onclick={() => (sel = { ar: 0, ac: 0, fr: sheet.rows - 1, fc: sheet.cols - 1 })}
            ></button>
          </div>
          {#each cols as c (c)}
            {@const on = c >= box.c1 && c <= box.c2}
            {@const sorted = sheet.sort?.col === c ? sheet.sort.dir : null}
            {@const filtered = !!sheet.filters[c]}
            <div
              class="chead"
              class:on
              class:current={c === sel.ac}
              role="columnheader"
              aria-colindex={c + 2}
              aria-sort={sorted === 'asc'
                ? 'ascending'
                : sorted === 'desc'
                  ? 'descending'
                  : undefined}
              style:width="{sheet.widths[c]}px"
              data-note={c === 1 ? 'column-tools' : undefined}
            >
              <button
                type="button"
                class="hit"
                tabindex="-1"
                aria-label="Select column {colName(c)}"
                onclick={(event) => selectColumn(c, event.shiftKey)}>{colName(c)}</button
              >
              {#if hasData(c)}
                <span class="tools">
                  <button
                    type="button"
                    class="tool"
                    class:lit={!!sorted}
                    aria-label={sortLabel(c)}
                    title={sortLabel(c)}
                    onclick={() => sortBy(c)}
                  >
                    <Icon name={sorted === 'desc' ? 'arrow-down' : 'arrow-up'} size={13} />
                  </button>
                  <Popover title="Filter {fieldName(c)}" placement="bottom-end" width="16rem">
                    {#snippet trigger(props)}
                      <button
                        type="button"
                        class="tool"
                        class:lit={filtered}
                        {...props}
                        aria-label="Filter by {fieldName(c)}{filtered ? ' (on)' : ''}"
                        title="Filter by {fieldName(c)}"
                      >
                        <Icon name="filter" size={13} />
                      </button>
                    {/snippet}
                    {#snippet children(close)}
                      {@const f = sheet.filters[c] ?? {}}
                      <div class="filter">
                        {#if columnKind(c) === 'number'}
                          <label class="num-field">
                            <span>At least</span>
                            <input
                              type="number"
                              value={f.min ?? ''}
                              placeholder="any"
                              oninput={(event) => setFilter(c, { min: numberInput(event) })}
                            />
                          </label>
                          <label class="num-field">
                            <span>At most</span>
                            <input
                              type="number"
                              value={f.max ?? ''}
                              placeholder="any"
                              oninput={(event) => setFilter(c, { max: numberInput(event) })}
                            />
                          </label>
                        {:else}
                          <div class="values">
                            {#each distinct(c) as d (d.text)}
                              <Checkbox
                                label="{d.text}{d.count > 1 ? ` (${d.count})` : ''}"
                                checked={!f.hidden?.includes(d.text)}
                                onchange={(event) =>
                                  toggleValue(
                                    c,
                                    d.text,
                                    (event.currentTarget as HTMLInputElement).checked,
                                  )}
                              />
                            {/each}
                          </div>
                        {/if}
                        <p class="filter-note">
                          {#if hiddenCount}
                            Showing {bodyCount - hiddenCount} of {bodyCount} rows. Totals still count
                            them all.
                          {:else}
                            All {bodyCount} rows are showing.
                          {/if}
                        </p>
                        <div class="filter-actions">
                          <Button
                            size="sm"
                            variant="plain"
                            label="Clear"
                            disabled={!filtered}
                            onclick={() => {
                              delete sheet.filters[c];
                              markSaved();
                            }}
                          />
                          <Button size="sm" variant="tinted" label="Done" onclick={close} />
                        </div>
                      </div>
                    {/snippet}
                  </Popover>
                </span>
              {/if}
              <button
                type="button"
                class="insert insert--col"
                tabindex="-1"
                aria-label="Insert a column after {colName(c)}"
                title="Insert a column here"
                onclick={() => addColumn(c + 1)}><Icon name="plus" size={11} /></button
              >
            </div>
          {/each}
          <div class="filler" aria-hidden="true"></div>
        </div>

        {#each visRows as r, i (sheet.rowIds[r])}
          {@const gap = i > 0 && visRows[i - 1] !== r - 1}
          <div
            class="row"
            class:after-body={!!sheet.body && r === sheet.body[1] + 1}
            role="row"
            aria-rowindex={r + 2}
            data-note={sheet.body && r === sheet.body[1] + 1 ? 'totals' : undefined}
            animate:flip={{ duration: reduceMotion ? 0 : 360, easing: cubicOut }}
          >
            <div
              class="rhead"
              class:on={r >= box.r1 && r <= box.r2}
              class:gap
              role="rowheader"
              aria-colindex={1}
              data-head
            >
              <button
                type="button"
                class="hit"
                tabindex="-1"
                aria-label="Select row {r + 1}"
                onclick={(event) => selectRow(r, event.shiftKey)}>{r + 1}</button
              >
              <button
                type="button"
                class="insert insert--row"
                tabindex="-1"
                aria-label="Insert a row below {r + 1}"
                title="Insert a row here"
                onclick={() => addRow(r + 1)}><Icon name="plus" size={11} /></button
              >
            </div>
            {#each cols as c (c)}
              {@const key = cellKey(c, r)}
              {@const v = values[key] ?? null}
              {@const st = sheet.styles[key]}
              <div
                class="cell"
                class:num={typeof v === 'number'}
                class:neg={typeof v === 'number' && v < 0}
                class:bold={st?.bold}
                class:err={isError(v)}
                style:width="{sheet.widths[c]}px"
                style:text-align={st?.align}
                style:justify-content={st?.align === 'center'
                  ? 'center'
                  : st?.align === 'right' || (!st?.align && typeof v === 'number')
                    ? 'flex-end'
                    : undefined}
                role="gridcell"
                id="{uid}-{key}"
                aria-colindex={c + 2}
                aria-selected={inBox(r, c)}
                title={isError(v) ? errorInfo(v).message : undefined}
                data-note={key === 'F2' && active === 0
                  ? 'formula-cell'
                  : key === firstError
                    ? 'error-cell'
                    : undefined}
              >
                {#if isError(v)}
                  <span class="err-pill"><Icon name="alert" size={11} />{errorInfo(v).label}</span>
                {:else}
                  <span class="text">{show(r, c)}</span>
                {/if}
              </div>
            {/each}
            <div class="filler" aria-hidden="true"></div>
          </div>
        {/each}

        <!-- Overlays: everything below is placed from the grid geometry. -->
        {#each pulses as p (p.id)}
          {@const at = parseKey(p.key)}
          {@const r = at ? rectOf(cellBox(at.row, at.col)) : null}
          {#if r}
            <span
              class="pulse pulse--{p.kind}"
              style:top="{r.top}px"
              style:left="{r.left}px"
              style:width="{r.width}px"
              style:height="{r.height}px"
              style:animation-delay="{p.delay}ms"
              aria-hidden="true"
            ></span>
          {/if}
        {/each}

        {#if sheet.chart}
          {@render outline(sheet.chart, 'var(--accent)', true)}
        {/if}

        {#if edit}
          {@const colors = colorsFor(editRefs)}
          {#each editRefs as ref, i (i)}
            {@render outline(refBox(ref), colors[i] ?? 'var(--accent)', false)}
          {/each}
        {:else}
          {@const colors = colorsFor(peekRefs)}
          {#each peekRefs as ref, i (i)}
            {@render outline(refBox(ref), colors[i] ?? 'var(--accent)', true)}
          {/each}
        {/if}

        {#if selRect && !edit}
          <span
            class="sel"
            class:multi={!single}
            style:top="{selRect.top}px"
            style:left="{selRect.left}px"
            style:width="{selRect.width}px"
            style:height="{selRect.height}px"
            aria-hidden="true"
          ></span>
          {#if activeRect && !single}
            <span
              class="active-cell"
              style:top="{activeRect.top}px"
              style:left="{activeRect.left}px"
              style:width="{activeRect.width}px"
              style:height="{activeRect.height}px"
              aria-hidden="true"
            ></span>
          {/if}
          {#if fillBox}
            {@const fr = rectOf(fillBox)}
            {#if fr}
              <span
                class="fill-preview"
                style:top="{fr.top}px"
                style:left="{fr.left}px"
                style:width="{fr.width}px"
                style:height="{fr.height}px"
                aria-hidden="true"
              ></span>
            {/if}
          {/if}
          <span
            class="handle"
            role="presentation"
            title="Drag to fill"
            data-overlay
            style:top="{selRect.bottom}px"
            style:left="{selRect.right}px"
            onpointerdown={onFillDown}
          ></span>

          {#if !drag}
            {#if stats && place}
              <output
                class="chip stats"
                data-overlay
                data-note="stats"
                bind:offsetWidth={chipW}
                style:top="{place.chip.top}px"
                style:left="{place.chip.left}px"
              >
                <span class="stat"
                  ><Icon name="sigma" size={13} /><strong
                    >{formatNumber(stats.sum, stats.format)}</strong
                  ></span
                >
                <span class="stat"
                  >avg <strong>{formatNumber(stats.avg, stats.format)}</strong></span
                >
                <span class="stat"
                  ><strong>{stats.count}</strong> {stats.count === 1 ? 'number' : 'numbers'}</span
                >
              </output>
            {:else if activeError && place}
              <div
                class="chip why"
                role="note"
                data-overlay
                bind:offsetHeight={noteH}
                style:top="{place.note.top}px"
                style:left="{place.note.left}px"
              >
                <Icon name="alert" size={14} />
                <span>{errorInfo(activeError).message}</span>
              </div>
            {:else if peekRefs.length && place}
              <button
                type="button"
                class="chip peek"
                data-overlay
                bind:offsetHeight={noteH}
                style:top="{place.note.top}px"
                style:left="{place.note.left}px"
                title="Edit formula (Enter)"
                onclick={() => startEdit(sel.ar, sel.ac)}
              >
                <code>{@render formula(activeInput)}</code>
                <Icon name="pencil" size={12} />
              </button>
            {/if}
          {/if}
        {/if}

        {#if showBar && place}
          <div
            class="format-bar"
            role="toolbar"
            aria-label="Format the selection"
            data-overlay
            data-note="format-bar"
            bind:offsetWidth={barW}
            style:top="{place.bar.top}px"
            style:left="{place.bar.left}px"
          >
            {#each FORMATS as f, i (f.value)}
              <IconButton
                tooltipPlacement={place.tipAt}
                label={f.label}
                shape="pill"
                class="fb-text"
                tooltipAlign={i === 0 ? 'start' : 'center'}
                pressed={formatAt(sel.ar, sel.ac) === f.value}
                onclick={() => setStyle({ format: f.value })}>{f.text}</IconButton
              >
            {/each}
            <span class="sep" aria-hidden="true"></span>
            <IconButton
              tooltipPlacement={place.tipAt}
              icon="bold"
              label="Bold"
              shape="pill"
              shortcut={['Mod', 'B']}
              pressed={allBold}
              onclick={toggleBold}
            />
            {#each ALIGNS as a (a.value)}
              <IconButton
                tooltipPlacement={place.tipAt}
                icon={a.icon}
                label={a.label}
                shape="pill"
                pressed={activeAlign === a.value}
                onclick={() => setStyle({ align: a.value })}
              />
            {/each}
            <span class="sep" aria-hidden="true"></span>
            <IconButton
              tooltipPlacement={place.tipAt}
              icon="chart"
              label="Chart"
              tooltip={canChart
                ? 'Chart these numbers'
                : 'Select two or more numbers to chart them'}
              tooltipAlign="end"
              shape="pill"
              showLabel
              aria-disabled={!canChart}
              onclick={makeChart}
            />
          </div>
        {/if}

        {#if edit && editRect}
          <div
            class="editor"
            data-overlay
            style:top="{editRect.top}px"
            style:left="{editRect.left}px"
            style:min-width="{editRect.width}px"
          >
            <span class="mirror" class:bold={sheet.styles[cellKey(edit.col, edit.row)]?.bold}
              >{@render formula(edit.text)}&nbsp;</span
            >
            <input
              bind:this={editor}
              value={edit.text}
              aria-label="Edit {cellKey(edit.col, edit.row)}"
              autocomplete="off"
              spellcheck="false"
              oninput={onEditInput}
              onkeydown={onEditKey}
              onkeyup={readCaret}
              onclick={readCaret}
              onblur={onEditBlur}
            />
          </div>
          {#if (ctx.word && ctx.matches.length) || call}
            <div
              class="hint"
              data-overlay
              style:top="{editRect.bottom + 6}px"
              style:left="{editRect.left}px"
            >
              {#if ctx.word && ctx.matches.length}
                <ul class="suggest" role="listbox" aria-label="Functions">
                  {#each ctx.matches as fn, i (fn.name)}
                    <li
                      role="option"
                      aria-selected={i === hintIndex}
                      class:on={i === hintIndex}
                      onpointerdown={(event) => {
                        event.preventDefault();
                        accept(fn);
                      }}
                    >
                      <code>{fn.name}</code><span>{fn.about}</span>
                    </li>
                  {/each}
                </ul>
                <span class="hint-keys"
                  ><Kbd>Tab</Kbd> to use · <Kbd>↑</Kbd><Kbd>↓</Kbd> to choose</span
                >
              {:else if call}
                <code class="sig"
                  >{call.fn.name}({#each call.fn.args as a, i (i)}{i ? ', ' : ''}<span
                      class:arg-on={i === Math.min(call.arg, call.fn.args.length - 1)}>{a}</span
                    >{/each})</code
                >
                <span class="about">{call.fn.about}</span>
                <span class="hint-keys">Click or drag over cells to add them.</span>
              {/if}
            </div>
          {/if}
        {/if}

        {#if chart && chartPlace}
          <div
            class="chart-float"
            data-overlay
            style:top="{chartPlace.top}px"
            style:left="{chartPlace.left}px"
            style:width="{CHART_W}px"
          >
            <ChartCard
              title={chart.title}
              sub="From {chart.source} · follows your edits"
              value={formatNumber(chart.total, chart.format)}
            >
              {#snippet actions()}
                <Button
                  variant="plain"
                  size="xs"
                  icon="close"
                  label="Close chart"
                  iconOnly
                  onclick={() => change(() => (sheet.chart = null))}
                />
              {/snippet}
              {#if chart.kind === 'line'}
                <LineChart
                  data={chart.points}
                  min={chart.min}
                  max={chart.max}
                  ticks={[chart.min, chart.max / 2, chart.max]}
                  tickFormat={(v) => formatCompact(v, chart.format)}
                  valueFormat={(v) => formatNumber(v, chart.format)}
                  valueLabel={chart.title}
                  color="var(--accent)"
                  height={150}
                />
              {:else}
                {@const h = chart.bars.length * BAR_ROW + 4}
                <div class="bars" bind:clientWidth={barsWidth} style:height="{h}px">
                  {#if barsWidth}
                    <svg
                      viewBox="0 0 {barsWidth} {h}"
                      role="img"
                      aria-label="{chart.title}: {chart.bars
                        .map((b) => `${b.label} ${formatNumber(b.value, chart.format)}`)
                        .join(', ')}"
                    >
                      {#each chart.bars as b, i (b.row)}
                        {@const plot = barsWidth - BAR_LABEL_W - 56}
                        {@const w = chart.max ? (Math.max(0, b.value) / chart.max) * plot : 0}
                        {@const y = 2 + i * BAR_ROW}
                        <text class="bar-label" x={BAR_LABEL_W - 8} y={y + 14} text-anchor="end"
                          >{b.label}</text
                        >
                        <path
                          class="bar"
                          class:dim={barHover !== null && barHover !== b.row}
                          d={hBarPath(BAR_LABEL_W, y + 4, w, 12)}
                        />
                        <text class="bar-value" x={BAR_LABEL_W + w + 6} y={y + 14}
                          >{formatCompact(b.value, chart.format)}</text
                        >
                        <rect
                          x="0"
                          {y}
                          width={barsWidth}
                          height={BAR_ROW}
                          fill="transparent"
                          role="presentation"
                          onpointermove={(event) => {
                            barHover = b.row;
                            barTip = {
                              x: event.clientX,
                              y: event.clientY,
                              title: b.label,
                              rows: [
                                { label: chart.column, value: formatNumber(b.value, chart.format) },
                              ],
                            };
                          }}
                          onpointerleave={() => {
                            barHover = null;
                            barTip = null;
                          }}
                        />
                      {/each}
                    </svg>
                  {/if}
                </div>
              {/if}
            </ChartCard>
          </div>
        {/if}

        {#if isEmpty && !edit}
          <div class="empty" aria-hidden="true">
            <Icon name="sparkles" size={22} />
            <strong>A fresh sheet. Lovely.</strong>
            <span>Type anything to begin — start with <code>=</code> for a formula.</span>
          </div>
        {/if}
      </div>
    </div>

    <div class="tabs" data-note="tabs">
      <div class="tablist" role="tablist" aria-label="Sheets">
        {#each book as s, i (s.id)}
          <button
            type="button"
            class="tab"
            class:on={i === active}
            role="tab"
            id="{uid}-tab-{i}"
            aria-selected={i === active}
            aria-controls="{uid}-panel"
            tabindex={i === active ? 0 : -1}
            onclick={() => openSheet(i)}
            onkeydown={(event) => onTabKey(event, i)}>{s.name}</button
          >
        {/each}
      </div>
      <Button
        variant="plain"
        size="sm"
        icon="plus"
        label="Add a sheet"
        iconOnly
        onclick={addSheet}
      />
      <span class="tab-hint">
        {#if hiddenCount}
          <span class="filtered"
            ><Icon name="filter" size={12} /> {hiddenCount} rows hidden by a filter</span
          >
        {:else}
          Type to edit · <Kbd>F2</Kbd> opens a cell · <code>=</code> starts a formula
        {/if}
      </span>
    </div>
  </Layer>
</Page>

<ChartTooltip tooltip={barTip} />
<DesignNotes title="Spreadsheet" {notes} corner="bottom-right" />

<style>
  /* The panel clips the grid to its rounded corners (clip, not hidden: stickies keep working). */
  :global(.sheet-book) {
    overflow: clip;
    min-height: 0;
  }
  .people {
    display: inline-flex;
  }
  .share-text {
    margin: 0 0 var(--space-3);
    color: var(--text-2);
    font-size: var(--fs-sm);
    line-height: 1.5;
  }

  /* A calm flat fill inside the panel, so the backdrop's colour never reads as a selection. */
  .scroller {
    position: relative;
    background: color-mix(in srgb, var(--editor-bg) 80%, transparent);
    flex: 1 1 auto;
    min-height: 0;
    overflow: auto;
    overscroll-behavior: contain;
  }
  .canvas {
    position: relative;
    min-width: 100%;
    box-sizing: content-box;
    padding-bottom: var(--space-12);
    outline: none;
    font-size: var(--fs-md);
    font-variant-numeric: tabular-nums;
    user-select: none;
    -webkit-user-select: none;
  }

  /* ── Rows and cells ── */
  .row {
    display: flex;
    height: 30px;
    min-width: 100%;
  }
  .cell,
  .chead,
  .rhead,
  .corner {
    position: relative;
    flex: none;
    box-sizing: border-box;
    border-right: 1px solid var(--grid);
    border-bottom: 1px solid var(--grid);
  }
  .filler {
    flex: 1 1 auto;
    border-bottom: 1px solid var(--grid);
  }
  .cell {
    display: flex;
    align-items: center;
    padding: 0 var(--space-2);
    overflow: hidden;
    color: var(--text);
    white-space: nowrap;
  }
  .cell .text {
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .cell.bold {
    font-weight: var(--fw-semibold);
  }
  /* Below zero is status (over budget, shrinking), so it may take colour. */
  .cell.neg {
    color: var(--danger);
  }
  .row.after-body {
    background: var(--fill-subtle);
  }
  .row.after-body .cell {
    border-top: 1px solid var(--border-strong);
  }
  .err-pill {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    padding: 1px var(--space-2);
    border-radius: var(--radius-pill);
    background: var(--tint-danger);
    color: var(--danger);
    font-size: var(--fs-xs);
    font-weight: var(--fw-semibold);
  }

  /* ── Headers: sticky, opaque, highlighted where the selection is ── */
  /* Opaque, so cells scrolling underneath never show through the headers. */
  .head-row,
  .corner,
  .rhead {
    background: linear-gradient(var(--head-bg), var(--head-bg)), var(--editor-bg);
  }
  .head-row {
    position: sticky;
    top: 0;
    z-index: 4;
    height: 28px;
  }
  .corner,
  .rhead {
    position: sticky;
    left: 0;
    width: 46px;
  }
  .corner {
    z-index: 2;
  }
  .rhead {
    z-index: 3;
  }
  .rhead:hover,
  .rhead:focus-within {
    z-index: 4;
  }
  .chead:hover,
  .chead:focus-within {
    z-index: 1;
  }
  .hit {
    display: grid;
    place-items: center;
    width: 100%;
    height: 100%;
    padding: 0;
    border: 0;
    background: none;
    color: var(--text-3);
    font: inherit;
    font-size: var(--fs-xs);
    font-weight: var(--fw-semibold);
    cursor: pointer;
  }
  .chead.on {
    background: var(--accent-faint);
  }
  .rhead.on {
    background:
      linear-gradient(var(--accent-faint), var(--accent-faint)),
      linear-gradient(var(--head-bg), var(--head-bg)), var(--editor-bg);
  }
  .chead.on .hit,
  .rhead.on .hit {
    color: var(--accent-ink);
  }
  .chead.on::after,
  .rhead.on::after {
    content: '';
    position: absolute;
    background: var(--accent);
    pointer-events: none;
  }
  .chead.on::after {
    left: 0;
    right: 0;
    bottom: -1px;
    height: 2px;
  }
  .rhead.on::after {
    top: 0;
    bottom: 0;
    right: -1px;
    width: 2px;
  }
  /* Rows hidden by a filter leave a visible seam above the next row number. */
  .rhead.gap {
    box-shadow: inset 0 2px 0 var(--accent-border);
  }

  .tools {
    position: absolute;
    top: 50%;
    right: var(--space-1);
    display: flex;
    gap: 1px;
    transform: translateY(-50%);
    opacity: 0;
    transition: opacity var(--motion-quick) var(--ease-out);
  }
  .chead:hover .tools,
  .chead:focus-within .tools,
  .chead.current .tools,
  .tools:has(.lit) {
    opacity: 1;
  }
  .tool {
    display: grid;
    place-items: center;
    width: 22px;
    height: 22px;
    padding: 0;
    border: 0;
    border-radius: var(--radius-pill);
    background: none;
    color: var(--text-3);
    cursor: pointer;
    transition:
      background var(--motion-quick) var(--ease-out),
      color var(--motion-quick) var(--ease-out);
  }
  .tool:hover {
    background: var(--fill-hover);
    color: var(--text);
  }
  .tool.lit {
    background: var(--accent-soft);
    color: var(--accent-ink);
  }

  /* "+" sits on the edge where the new row or column will appear. */
  .insert {
    position: absolute;
    z-index: 1;
    display: grid;
    place-items: center;
    width: 18px;
    height: 18px;
    padding: 0;
    border: 1px solid var(--accent-border);
    border-radius: 50%;
    background: var(--editor-bg);
    color: var(--accent-ink);
    box-shadow: var(--shadow-pop);
    cursor: pointer;
    opacity: 0;
    transform: scale(0.6);
    transition:
      opacity var(--motion-quick) var(--ease-out),
      transform var(--motion-base) var(--ease-spring);
  }
  .insert--col {
    top: 50%;
    right: -9px;
    margin-top: -9px;
  }
  .insert--row {
    bottom: -9px;
    left: 50%;
    margin-left: -9px;
  }
  .chead:hover .insert,
  .rhead:hover .insert,
  .insert:focus-visible {
    opacity: 1;
    transform: none;
  }
  .insert:hover {
    background: var(--accent);
    color: var(--on-accent);
  }

  .hit:focus-visible,
  .tool:focus-visible,
  .insert:focus-visible,
  .peek:focus-visible,
  .tab:focus-visible {
    outline: var(--focus-ring);
    outline-offset: 1px;
  }

  /* ── Overlays ── */
  .sel,
  .active-cell,
  .ref-box,
  .pulse,
  .fill-preview {
    position: absolute;
    box-sizing: border-box;
    pointer-events: none;
  }
  .sel {
    z-index: 2;
    border: 2px solid var(--accent);
    border-radius: var(--radius-xs);
    transition:
      top var(--motion-quick) var(--ease-out),
      left var(--motion-quick) var(--ease-out),
      width var(--motion-quick) var(--ease-out),
      height var(--motion-quick) var(--ease-out);
  }
  .sel.multi {
    background: var(--accent-soft);
  }
  .canvas.focused .sel {
    box-shadow: var(--focus-halo);
  }
  /* Inside a range, a thin inner ring marks the cell your typing goes to. */
  .active-cell {
    z-index: 2;
    box-shadow: inset 0 0 0 1.5px var(--accent);
    border-radius: var(--radius-xs);
  }
  .ref-box {
    z-index: 2;
    border: 2px solid var(--ref);
    border-radius: var(--radius-xs);
    background: color-mix(in srgb, var(--ref) 8%, transparent);
  }
  .ref-box.dashed {
    border-style: dashed;
    border-width: 1.5px;
    background: none;
  }
  .fill-preview {
    z-index: 2;
    border: 1.5px dashed var(--accent);
    border-radius: var(--radius-xs);
  }
  .handle {
    position: absolute;
    z-index: 3;
    width: 10px;
    height: 10px;
    margin: -6px 0 0 -6px;
    border: 2px solid var(--editor-bg);
    border-radius: 50%;
    background: var(--accent);
    cursor: crosshair;
    touch-action: none;
    transition: transform var(--motion-quick) var(--ease-spring);
  }
  .handle:hover {
    transform: scale(1.35);
  }

  /* Cause and effect: the edited cell glows, the cells that read it pulse once after it. */
  .pulse {
    z-index: 1;
    border-radius: var(--radius-xs);
  }
  .pulse--cause {
    animation: bb-changed var(--motion-lazy) var(--ease-out) both;
  }
  .pulse--effect {
    animation: effect var(--motion-lazy) var(--ease-out) both;
  }
  @keyframes effect {
    0% {
      opacity: 0;
      box-shadow: inset 0 0 0 2px var(--accent);
      background: var(--accent-soft);
      transform: scale(0.92);
    }
    20% {
      opacity: 1;
      transform: scale(1.04);
    }
    50% {
      opacity: 1;
      transform: none;
    }
    100% {
      opacity: 0;
      box-shadow: inset 0 0 0 2px var(--accent);
      background: var(--accent-soft);
      transform: none;
    }
  }

  /* Everything that floats over the grid is glass; the grid itself is the panel. */
  .chip,
  .format-bar,
  .hint {
    position: absolute;
    z-index: 6;
    background: var(--layer-front-bg), var(--glass-strong);
    border: 0.75px solid var(--layer-front-border);
    box-shadow: var(--shadow-pop);
    backdrop-filter: var(--blur-pill);
    -webkit-backdrop-filter: var(--blur-pill);
    user-select: text;
    -webkit-user-select: text;
  }
  .chip {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-1) var(--space-3);
    border-radius: var(--radius-pill);
    font-size: var(--fs-xs);
    color: var(--text-2);
    white-space: nowrap;
    animation: bb-pop var(--motion-base) var(--ease-spring);
  }
  .stats {
    transform-origin: top right;
  }
  .stat {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
  }
  .stat + .stat::before {
    content: '';
    width: 3px;
    height: 3px;
    margin-right: var(--space-1);
    border-radius: 50%;
    background: var(--fill-off);
  }
  .stat strong {
    color: var(--text);
    font-weight: var(--fw-semibold);
  }
  .why {
    max-width: 22rem;
    white-space: normal;
    align-items: flex-start;
    padding: var(--space-2) var(--space-3);
    border-radius: var(--radius-lg);
    color: var(--text);
    line-height: 1.45;
  }
  .why :global(svg) {
    flex: none;
    margin-top: 2px;
    color: var(--danger);
  }
  .peek {
    font: inherit;
    font-size: var(--fs-xs);
    cursor: pointer;
  }
  .peek code,
  .sig,
  .suggest code {
    font-family: var(--font-mono);
    color: var(--text);
  }
  .ref {
    font-weight: var(--fw-semibold);
  }

  .format-bar {
    display: flex;
    align-items: center;
    gap: 2px;
    padding: 3px;
    border-radius: var(--radius-pill);
    white-space: nowrap;
    transform-origin: bottom left;
    animation: bb-pop var(--motion-base) var(--ease-spring);
  }
  /* The number formats are written, not drawn: give "123" room to breathe. */
  .format-bar :global(.fb-text) {
    padding: 0 var(--space-2);
  }
  .sep {
    width: 1px;
    height: 18px;
    margin: 0 var(--space-1);
    background: var(--border-strong);
  }

  /* The cell grows into the editor: same spot, same font, a lifted solid surface. */
  .editor {
    position: absolute;
    z-index: 7;
    display: inline-grid;
    height: 30px;
    box-sizing: border-box;
    border-radius: var(--radius-xs);
    background: var(--editor-bg);
    box-shadow:
      0 0 0 2px var(--accent),
      var(--shadow-pop);
    transform-origin: top left;
    animation: grow var(--motion-quick) var(--ease-out);
  }
  @keyframes grow {
    from {
      transform: scale(0.97);
    }
  }
  .mirror,
  .editor input {
    grid-area: 1 / 1;
    box-sizing: border-box;
    height: 100%;
    margin: 0;
    padding: 0 var(--space-2);
    font: inherit;
    font-size: var(--fs-md);
    letter-spacing: normal;
    line-height: 30px;
    white-space: pre;
  }
  .mirror {
    color: var(--text);
    pointer-events: none;
  }
  .mirror.bold {
    font-weight: var(--fw-semibold);
  }
  .editor input {
    width: 100%;
    min-width: 0;
    border: 0;
    outline: none;
    background: transparent;
    color: transparent;
    caret-color: var(--accent);
    font-weight: inherit;
  }
  .editor input::selection {
    background: var(--accent-soft);
  }

  .hint {
    display: grid;
    gap: var(--space-1);
    max-width: 22rem;
    padding: var(--space-2);
    border-radius: var(--radius-lg);
    font-size: var(--fs-xs);
    color: var(--text-2);
    transform-origin: top left;
    animation: bb-drop var(--motion-base) var(--ease-out);
  }
  .suggest {
    display: grid;
    gap: 1px;
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .suggest li {
    display: grid;
    grid-template-columns: 5.5rem 1fr;
    gap: var(--space-2);
    padding: var(--space-1) var(--space-2);
    border-radius: var(--radius-sm);
    cursor: pointer;
  }
  .suggest li.on {
    background: var(--accent-soft);
  }
  .suggest li.on code {
    color: var(--accent-ink);
  }
  .sig {
    padding: 0 var(--space-1);
    font-size: var(--fs-sm);
  }
  .arg-on {
    color: var(--accent-ink);
    font-weight: var(--fw-bold);
    text-decoration: underline;
    text-underline-offset: 3px;
  }
  .about {
    padding: 0 var(--space-1);
    color: var(--text);
  }
  .hint-keys {
    padding: 0 var(--space-1);
    color: var(--text-3);
  }

  .chart-float {
    position: absolute;
    z-index: 5;
    border-radius: var(--radius-card);
    box-shadow: var(--shadow-pop);
    user-select: text;
    -webkit-user-select: text;
    animation: bb-rise var(--motion-slow) var(--ease-out);
  }
  .chart-float :global(.chart-card) {
    background: var(--layer-front-bg), var(--glass-strong);
  }
  .bars {
    position: relative;
    width: 100%;
  }
  .bars svg {
    display: block;
    width: 100%;
    height: 100%;
    overflow: visible;
  }
  .bar-label,
  .bar-value {
    font-size: var(--fs-2xs);
    fill: var(--text-3);
  }
  .bar-label {
    fill: var(--text-2);
  }
  .bar {
    fill: var(--accent);
    transform-box: fill-box;
    transform-origin: left center;
    transition: opacity var(--motion-quick) var(--ease-out);
    animation: bar-grow var(--motion-slow) var(--ease-out) both;
  }
  .bar.dim {
    opacity: 0.4;
  }
  @keyframes bar-grow {
    from {
      transform: scaleX(0);
    }
  }

  .empty {
    position: absolute;
    top: calc(var(--space-12) * 2);
    left: 0;
    right: 0;
    display: grid;
    justify-items: center;
    gap: var(--space-1);
    padding: var(--space-6) var(--space-4);
    color: var(--text-3);
    text-align: center;
    pointer-events: none;
    animation: bb-rise var(--motion-slow) var(--ease-out);
  }
  .empty :global(svg) {
    color: var(--accent);
  }
  .empty strong {
    color: var(--text);
    font-size: var(--fs-lg);
  }
  .empty code,
  .tab-hint code {
    font-family: var(--font-mono);
    color: var(--accent-ink);
  }

  /* ── Sheet tabs on the panel's bottom edge ── */
  .tabs {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-2) var(--space-3);
    border-top: 1px solid var(--border-strong);
    background: var(--fill-subtle);
  }
  .tablist {
    display: flex;
    gap: var(--space-1);
    min-width: 0;
    overflow-x: auto;
  }
  .tab {
    flex: none;
    height: var(--control-sm);
    padding: 0 var(--space-4);
    border: 0;
    border-radius: var(--radius-pill);
    background: none;
    color: var(--text-2);
    font: inherit;
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
    cursor: pointer;
    transition: background var(--motion-quick) var(--ease-out);
  }
  .tab:hover {
    background: var(--fill-hover);
  }
  .tab.on {
    background: var(--accent-soft);
    color: var(--accent-ink);
    font-weight: var(--fw-semibold);
  }
  .tab-hint {
    margin-left: var(--space-3);
    color: var(--text-3);
    font-size: var(--fs-xs);
    white-space: nowrap;
  }
  .filtered {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    color: var(--accent-ink);
  }

  /* ── Filter popover ── */
  .filter {
    display: grid;
    gap: var(--space-3);
  }
  .values {
    display: grid;
    gap: var(--space-2);
    max-height: 14rem;
    overflow: auto;
  }
  .num-field {
    display: grid;
    gap: var(--space-1);
    font-size: var(--fs-sm);
    color: var(--text-2);
  }
  .num-field input {
    height: var(--control-sm);
    padding: 0 var(--space-3);
    border: 1px solid var(--input-border);
    border-radius: var(--radius-md);
    background: var(--input-bg);
    color: var(--text);
    font: inherit;
    font-variant-numeric: tabular-nums;
  }
  .num-field input:focus-visible {
    outline: var(--focus-ring);
    outline-offset: 1px;
  }
  .filter-note {
    margin: 0;
    color: var(--text-3);
    font-size: var(--fs-xs);
    line-height: 1.45;
  }
  .filter-actions {
    display: flex;
    justify-content: flex-end;
    gap: var(--space-2);
  }

  @media (max-width: 720px) {
    .tab-hint {
      display: none;
    }
  }
  /* On a phone the page scrolls; the grid keeps its own scroll box so its headers still stick
     and the sheet tabs stay in reach below it. */
  @media (max-width: 520px) {
    .scroller {
      flex-basis: 0;
      max-height: 76dvh;
    }
  }
  @media (max-width: 640px) {
    .people {
      display: none;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .sel,
    .handle,
    .insert,
    .tools {
      transition: none;
    }
    .chip,
    .format-bar,
    .editor,
    .hint,
    .chart-float,
    .empty,
    .bar {
      animation: none;
    }
    /* The meaning stays: cause and effect still fade, they just do not move. */
    .pulse--effect {
      animation: fade var(--motion-slow) linear both;
    }
    @keyframes fade {
      from {
        opacity: 1;
        background: var(--accent-faint);
        box-shadow: inset 0 0 0 2px var(--accent);
      }
      to {
        opacity: 0;
      }
    }
  }
</style>
