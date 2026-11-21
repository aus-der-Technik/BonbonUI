<script lang="ts">
  /**
   * Example page: a document editor (Storybook only, mock data). Every control sits where its
   * effect happens — formatting grows out of the selection, block handles and "+" live in the
   * left margin of the block they act on, comments sit level with their passage, the zoom sits
   * under the page and "Saved" sits at the title. The slim glass bar on top only holds what
   * changes the whole document. One contenteditable per block; the block list is the model and
   * every operation goes through one undo history.
   */
  import { onMount, tick } from 'svelte';
  import { flip } from 'svelte/animate';
  import { fade, slide } from 'svelte/transition';
  import Avatar from '../patterns/atoms/Avatar.svelte';
  import Badge from '../patterns/atoms/Badge.svelte';
  import Button from '../patterns/atoms/Button.svelte';
  import Icon from '../patterns/atoms/Icon.svelte';
  import IconButton from '../patterns/atoms/IconButton.svelte';
  import Kbd from '../patterns/atoms/Kbd.svelte';
  import Text from '../patterns/atoms/Text.svelte';
  import Tooltip from '../patterns/atoms/Tooltip.svelte';
  import type { IconName } from '../patterns/atoms/icons';
  import { isApplePlatform, keyLabels } from '../patterns/atoms/keys';
  import Layer from '../patterns/layout/Layer.svelte';
  import Row from '../patterns/layout/Row.svelte';
  import Spacer from '../patterns/layout/Spacer.svelte';
  import Stack from '../patterns/layout/Stack.svelte';
  import AvatarStack from '../patterns/molecules/AvatarStack.svelte';
  import CopyButton from '../patterns/molecules/CopyButton.svelte';
  import Popover from '../patterns/molecules/Popover.svelte';
  import SegmentedControl from '../patterns/molecules/SegmentedControl.svelte';
  import ToolGroup from '../patterns/molecules/ToolGroup.svelte';
  import CommentThread from '../patterns/organisms/CommentThread.svelte';
  import { celebrate } from '../utils/delight';
  import DesignNotes from './DesignNotes.svelte';
  import {
    NOW,
    docAuthor,
    docBlocks,
    docPeople,
    docThreads,
    docTitle,
    type BlockKind,
    type DocBlock,
    type DocThread,
  } from './mock-document';

  // ── Platform, motion ──────────────────────────────────────────────────────────────────────
  // Shortcuts are written once with neutral names; the library shows them the platform's way.
  const MAC = isApplePlatform();
  const MOVE_UP = keyLabels(['Alt', 'Shift', 'ArrowUp']);
  const MOVE_DOWN = keyLabels(['Alt', 'Shift', 'ArrowDown']);

  let reduced = false;
  let slow = $state(360);
  let base = $state(220);

  // ── Block kinds ───────────────────────────────────────────────────────────────────────────
  interface KindInfo {
    label: string;
    icon: IconName;
    tag: string;
    keys: string[];
    placeholder: string;
  }
  const KINDS: Record<BlockKind, KindInfo> = {
    p: {
      label: 'Text',
      icon: 'type',
      tag: 'p',
      keys: ['Mod', 'Alt', '0'],
      placeholder: 'Start writing, or pick a type below',
    },
    h1: {
      label: 'Title',
      icon: 'heading-1',
      tag: 'h1',
      keys: ['Mod', 'Alt', '1'],
      placeholder: 'Title',
    },
    h2: {
      label: 'Heading',
      icon: 'heading-2',
      tag: 'h2',
      keys: ['Mod', 'Alt', '2'],
      placeholder: 'Heading',
    },
    ul: {
      label: 'Bulleted list',
      icon: 'list',
      tag: 'p',
      keys: ['Mod', 'Shift', '8'],
      placeholder: 'List item',
    },
    ol: {
      label: 'Numbered list',
      icon: 'list-ordered',
      tag: 'p',
      keys: ['Mod', 'Shift', '7'],
      placeholder: 'Step',
    },
    quote: {
      label: 'Quote',
      icon: 'quote',
      tag: 'blockquote',
      keys: ['Mod', 'Shift', '9'],
      placeholder: 'Something worth quoting',
    },
  };
  const KIND_ORDER: BlockKind[] = ['p', 'h1', 'h2', 'ul', 'ol', 'quote'];
  const BAR_KINDS: BlockKind[] = ['h2', 'ul', 'quote'];

  type InlineCmd = 'bold' | 'italic' | 'underline' | 'strikeThrough';
  const INLINE: { cmd: InlineCmd; label: string; icon: IconName; keys: string[] }[] = [
    { cmd: 'bold', label: 'Bold', icon: 'bold', keys: ['Mod', 'B'] },
    { cmd: 'italic', label: 'Italic', icon: 'italic', keys: ['Mod', 'I'] },
    { cmd: 'underline', label: 'Underline', icon: 'underline', keys: ['Mod', 'U'] },
    {
      cmd: 'strikeThrough',
      label: 'Strikethrough',
      icon: 'strikethrough',
      keys: ['Mod', 'Shift', 'X'],
    },
  ];

  // Page setup moves around the reading tokens rather than away from them.
  const MEASURES = {
    narrow: 'calc(var(--measure) - 10ch)',
    medium: 'var(--measure)',
    wide: 'calc(var(--measure) + 10ch)',
  } as const;
  const LEADINGS = {
    snug: 'calc(var(--leading-body) - 0.1)',
    normal: 'var(--leading-body)',
    airy: 'calc(var(--leading-body) + 0.25)',
  } as const;
  const ZOOMS = [75, 90, 100, 110, 125, 150];
  /** Words per minute for the reading-time estimate. */
  const WPM = 220;
  /** Width of the comment margin and its gap to the paper, in px (20rem + 2rem). */
  const MARGIN = 320 + 32;

  // ── Document state ────────────────────────────────────────────────────────────────────────
  let title = $state(docTitle);
  let blocks = $state<DocBlock[]>(docBlocks());
  let threads = $state<DocThread[]>(docThreads());
  let measure = $state<keyof typeof MEASURES>('medium');
  let leading = $state<keyof typeof LEADINGS>('normal');
  let zoom = $state(100);

  // ── History: every change is one entry; typing is grouped by pauses ──────────────────────
  interface Snap {
    blocks: DocBlock[];
    threads: DocThread[];
  }
  interface Span {
    start: number;
    end: number;
  }
  interface Entry {
    state: Snap;
    label: string;
    block?: string | undefined;
    sel?: Span | undefined;
  }

  const snap = (): Snap => ({
    blocks: $state.snapshot(blocks),
    threads: $state.snapshot(threads).filter((t) => !t.draft),
  });
  let committed: Snap = snap();
  let committedKey = JSON.stringify(committed);
  let past = $state.raw<Entry[]>([]);
  let future = $state.raw<Entry[]>([]);
  let typing: { block: string } | null = null;
  let typingTimer: ReturnType<typeof setTimeout> | undefined;

  let save = $state<'saved' | 'saving'>('saved');
  let saveTimer: ReturnType<typeof setTimeout> | undefined;

  function saving() {
    save = 'saving';
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => (save = 'saved'), 900);
  }

  function commit(label: string, block?: string, sel?: Span | null) {
    clearTimeout(typingTimer);
    typing = null;
    const next = snap();
    const key = JSON.stringify(next);
    if (key === committedKey) return;
    past = [...past.slice(-99), { state: committed, label, block, sel: sel ?? undefined }];
    future = [];
    committed = next;
    committedKey = key;
    saving();
  }

  function typed(id: string) {
    saving();
    typing = { block: id };
    clearTimeout(typingTimer);
    typingTimer = setTimeout(flushTyping, 900);
  }

  function flushTyping() {
    if (typing) commit('typing', typing.block);
  }

  async function travel(from: Entry[], to: Entry[]): Promise<[Entry[], Entry[]]> {
    const entry = from.at(-1);
    if (!entry) return [from, to];
    const inEditor = !!paper?.contains(document.activeElement);
    const back: Entry = {
      state: committed,
      label: entry.label,
      block: entry.block,
      sel: entry.sel,
    };
    committed = entry.state;
    committedKey = JSON.stringify(entry.state);
    blocks = structuredClone(entry.state.blocks);
    threads = structuredClone(entry.state.threads);
    saving();
    await tick();
    if (entry.block) {
      flash(entry.block);
      if (inEditor && entry.sel) focusBlock(entry.block, entry.sel.start, entry.sel.end);
      else rowEl(entry.block)?.scrollIntoView({ block: 'nearest', behavior: smooth() });
    }
    return [from.slice(0, -1), [...to, back]];
  }

  async function undo() {
    flushTyping();
    dropDrafts();
    [past, future] = await travel(past, future);
  }

  async function redo() {
    flushTyping();
    dropDrafts();
    [future, past] = await travel(future, past);
  }

  // ── DOM helpers ───────────────────────────────────────────────────────────────────────────
  let paper = $state<HTMLElement>();
  let desk = $state<HTMLElement>();
  let root = $state<HTMLElement>();
  const textEl = (id: string) => paper?.querySelector<HTMLElement>(`[data-text="${id}"]`) ?? null;
  const rowEl = (id: string) => paper?.querySelector<HTMLElement>(`[data-row="${id}"]`) ?? null;
  const find = (id: string) => blocks.find((b) => b.id === id);
  const indexOf = (id: string) => blocks.findIndex((b) => b.id === id);
  const smooth = (): ScrollBehavior => (reduced ? 'auto' : 'smooth');
  let seq = 0;
  const newId = (prefix: string) => `${prefix}${Date.now().toString(36)}${(seq++).toString(36)}`;

  /** Sets the HTML only when the model differs from the DOM, so typing never resets the caret. */
  function editable(node: HTMLElement, html: string) {
    node.innerHTML = html;
    return {
      update(next: string) {
        if (node.innerHTML !== next) node.innerHTML = next;
      },
    };
  }

  /** What the DOM serialises to, minus the debris contenteditable leaves behind. */
  function clean(el: HTMLElement): string {
    if (!el.textContent) return '';
    return el.innerHTML.replace(/<(b|i|u|strike|s|a|mark)(\s[^>]*)?><\/\1>/g, '');
  }

  function sync(id: string) {
    const el = textEl(id);
    const block = find(id);
    if (el && block) block.html = clean(el);
  }

  const plain = (html: string) =>
    html
      .replace(/<[^>]*>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&[a-z]+;/g, '·');
  const countWords = (text: string) => (text.match(/[\p{L}\p{N}][\p{L}\p{N}'’-]*/gu) ?? []).length;

  /** A text offset inside `el` as a DOM position. */
  function point(el: HTMLElement, offset: number): [Node, number] {
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    let left = offset;
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      const length = (node as CharacterData).data.length;
      if (left <= length) return [node, left];
      left -= length;
    }
    return [el, el.childNodes.length];
  }

  function offsets(el: HTMLElement | null): Span | null {
    const sel = getSelection();
    if (!el || !sel?.rangeCount) return null;
    const range = sel.getRangeAt(0);
    if (!el.contains(range.startContainer)) return null;
    const before = document.createRange();
    before.selectNodeContents(el);
    before.setEnd(range.startContainer, range.startOffset);
    const start = before.toString().length;
    return { start, end: start + range.toString().length };
  }

  function select(el: HTMLElement, start: number, end = start) {
    const range = document.createRange();
    range.setStart(...point(el, start));
    range.setEnd(...point(el, end));
    const sel = getSelection();
    sel?.removeAllRanges();
    sel?.addRange(range);
  }

  async function focusBlock(id: string, start: number | 'end', end?: number) {
    await tick();
    const el = textEl(id);
    if (!el) return;
    el.focus({ preventScroll: true });
    const at = start === 'end' ? (el.textContent ?? '').length : start;
    select(el, at, end ?? at);
    el.scrollIntoView({ block: 'nearest', behavior: smooth() });
  }

  /** A soft glow on what just changed, so the eye finds the effect of an action. */
  async function flash(id: string) {
    await tick();
    const row = rowEl(id);
    if (!row) return;
    row.classList.remove('flash');
    void row.offsetWidth;
    row.classList.add('flash');
  }

  function blockOf(node: Node | null): string | null {
    const el = node instanceof Element ? node : node?.parentElement;
    const text = el?.closest<HTMLElement>('[data-text]');
    return text && paper?.contains(text) ? (text.dataset['text'] ?? null) : null;
  }

  function selectionBlock(): string | null {
    const sel = getSelection();
    if (!sel?.rangeCount) return null;
    const a = blockOf(sel.anchorNode);
    return a && a === blockOf(sel.focusNode) ? a : null;
  }

  // ── Block operations ─────────────────────────────────────────────────────────────────────
  async function turnInto(id: string, kind: BlockKind, toggle = false) {
    const block = find(id);
    if (!block) return;
    const sel = offsets(textEl(id));
    flushTyping();
    block.kind = toggle && block.kind === kind ? 'p' : kind;
    commit(KINDS[block.kind].label.toLowerCase(), id, sel);
    flash(id);
    if (sel) await focusBlock(id, sel.start, sel.end);
    refreshBar();
  }

  async function insertAfter(id: string | null, kind: BlockKind = 'p', html = '') {
    flushTyping();
    const block: DocBlock = { id: newId('b'), kind, html };
    blocks.splice(id ? indexOf(id) + 1 : 0, 0, block);
    commit('new block', block.id);
    flash(block.id);
    await focusBlock(block.id, 0);
    return block.id;
  }

  async function move(id: string, by: -1 | 1) {
    const from = indexOf(id);
    const to = from + by;
    const block = blocks[from];
    if (!block || to < 0 || to >= blocks.length) return;
    const sel = offsets(textEl(id));
    flushTyping();
    blocks.splice(from, 1);
    blocks.splice(to, 0, block);
    commit(by < 0 ? 'move up' : 'move down', id, sel);
    flash(id);
    if (sel) await focusBlock(id, sel.start, sel.end);
  }

  async function duplicate(id: string) {
    const block = find(id);
    if (!block) return;
    // A copy of a passage is not part of its discussion.
    await insertAfter(id, block.kind, block.html.replace(/<\/?mark[^>]*>/g, ''));
  }

  async function remove(id: string) {
    const at = indexOf(id);
    const wasFocused = !!textEl(id)?.contains(document.activeElement);
    flushTyping();
    blocks.splice(at, 1);
    if (!blocks.length) blocks.push({ id: newId('b'), kind: 'p', html: '' });
    const near = blocks[Math.max(0, at - 1)];
    commit('delete block', id);
    if (near && wasFocused) await focusBlock(near.id, 'end');
  }

  // ── Inline formatting ────────────────────────────────────────────────────────────────────
  let marks = $state({ bold: false, italic: false, underline: false, strikeThrough: false });

  function format(cmd: InlineCmd, label: string) {
    const id = selectionBlock();
    if (!id) return;
    const sel = offsets(textEl(id));
    flushTyping();
    document.execCommand(cmd);
    sync(id);
    commit(label.toLowerCase(), id, sel);
    refreshBar();
  }

  // Links are edited in the format bar itself, right above the words they will point from.
  let linking = $state(false);
  let linkUrl = $state('');
  let linkInput = $state<HTMLInputElement>();
  let linkRange: { id: string; range: Range } | null = null;

  async function openLink() {
    const id = selectionBlock();
    const sel = getSelection();
    if (!id || !sel?.rangeCount) return;
    const range = sel.getRangeAt(0);
    linkRange = { id, range: range.cloneRange() };
    const start = range.startContainer;
    const anchor = (start instanceof Element ? start : start.parentElement)?.closest('a');
    linkUrl = anchor?.getAttribute('href')?.replace(/^mailto:/, '') ?? '';
    linking = true;
    await tick();
    linkInput?.focus();
  }

  function restoreLinkRange(): string | null {
    if (!linkRange) return null;
    const el = textEl(linkRange.id);
    if (!el) return null;
    el.focus({ preventScroll: true });
    const sel = getSelection();
    sel?.removeAllRanges();
    sel?.addRange(linkRange.range);
    return linkRange.id;
  }

  function applyLink(event: SubmitEvent) {
    event.preventDefault();
    const id = restoreLinkRange();
    linking = false;
    if (!id) return;
    const sel = offsets(textEl(id));
    flushTyping();
    let url = linkUrl.trim();
    if (!url) document.execCommand('unlink');
    else {
      if (!/^[a-z][\w+.-]*:/i.test(url))
        url = url.includes('@') ? `mailto:${url}` : `https://${url}`;
      document.execCommand('createLink', false, url);
    }
    sync(id);
    commit(url ? 'link' : 'remove link', id, sel);
    linkRange = null;
    refreshBar();
  }

  function cancelLink() {
    restoreLinkRange();
    linking = false;
    linkRange = null;
    refreshBar();
  }

  // ── Comments ─────────────────────────────────────────────────────────────────────────────
  let active = $state<string | null>(null);
  let hovered = $state<string | null>(null);
  const openCount = $derived(threads.filter((t) => !t.resolved && !t.draft).length);
  const linked = $derived(hovered ?? active);

  async function addComment() {
    const id = selectionBlock();
    const sel = getSelection();
    if (!id || !sel?.rangeCount || sel.isCollapsed) return;
    flushTyping();
    const range = sel.getRangeAt(0);
    const quote = range.toString().trim();
    if (!quote) return;
    const tid = newId('t');
    const mark = document.createElement('mark');
    mark.dataset['c'] = tid;
    mark.append(range.extractContents());
    range.insertNode(mark);
    sync(id);
    sel.removeAllRanges();
    bar = null;
    threads.push({ id: tid, block: id, quote, comments: [], resolved: false, draft: true });
    active = tid;
    await tick();
    queueMeasure();
    await new Promise((resolve) => requestAnimationFrame(resolve));
    document.querySelector<HTMLElement>(`[data-thread="${tid}"] textarea`)?.focus();
  }

  /** A thread's mark and the block it is in now (text may have moved since). */
  function markOf(thread: DocThread): [HTMLElement, string] | null {
    const mark = paper?.querySelector<HTMLElement>(`mark[data-c="${thread.id}"]`);
    const block = mark ? blockOf(mark) : null;
    return mark && block ? [mark, block] : null;
  }

  function unwrap(thread: DocThread) {
    const found = markOf(thread);
    if (!found) return;
    const [mark, block] = found;
    const parent = mark.parentElement;
    mark.replaceWith(...mark.childNodes);
    parent?.normalize();
    sync(block);
  }

  function discard(thread: DocThread) {
    unwrap(thread);
    threads = threads.filter((t) => t.id !== thread.id);
    if (active === thread.id) active = null;
  }

  function dropDrafts() {
    for (const t of threads.filter((t) => t.draft)) discard(t);
  }

  function reply(thread: DocThread, text: string) {
    flushTyping();
    thread.comments.push({ id: newId('c'), author: docAuthor, time: NOW, text });
    const first = !!thread.draft;
    thread.draft = false;
    commit(first ? 'comment' : 'reply', thread.block);
  }

  function resolve(thread: DocThread, done: boolean, event?: Element | null) {
    flushTyping();
    thread.resolved = done;
    const found = markOf(thread);
    found?.[0].toggleAttribute('data-resolved', done);
    if (found) sync(found[1]);
    commit(done ? 'resolve comment' : 'reopen comment', found?.[1] ?? thread.block);
    if (done && active === thread.id) active = null;
    // The end of a task: the last open question answered earns a little burst.
    if (done && openCount === 0 && event) celebrate(event);
  }

  // ── Selection: the format bar and the selection stats ────────────────────────────────────
  interface Bar {
    key: number;
    block: string;
    x: number;
    top: number;
    bottom: number;
    endX: number;
    flip: boolean;
    words: number;
    chars: number;
  }
  let bar = $state<Bar | null>(null);
  let barKey = 0;
  let barW = $state(0);
  let barH = $state(0);
  let deskW = $state(0);
  let deskH = $state(0);

  function refreshBar() {
    if (linking || !desk) return;
    const sel = getSelection();
    const id = selectionBlock();
    if (!sel?.rangeCount || !id) {
      bar = null;
      return;
    }
    const range = sel.getRangeAt(0);
    if (sel.isCollapsed) {
      bar = null;
      // A caret inside a discussed passage brings its note forward; elsewhere it lets go.
      active = blockOfMark(sel.anchorNode);
      return;
    }
    const rects = [...range.getClientRects()].filter((r) => r.width > 0);
    const box = range.getBoundingClientRect();
    const first = rects[0] ?? box;
    const last = rects.at(-1) ?? box;
    const d = desk.getBoundingClientRect();
    const roof = (root?.querySelector('.docbar')?.getBoundingClientRect().bottom ?? 0) + 8;
    const text = sel.toString();
    bar = {
      key: bar ? bar.key : ++barKey,
      block: id,
      x: box.left + box.width / 2 - d.left,
      top: first.top - d.top,
      bottom: last.bottom - d.top,
      endX: last.right - d.left,
      flip: first.top - (barH || 44) - 12 < roof,
      words: countWords(text),
      chars: text.length,
    };
    marks = {
      bold: document.queryCommandState('bold'),
      italic: document.queryCommandState('italic'),
      underline: document.queryCommandState('underline'),
      strikeThrough: document.queryCommandState('strikeThrough'),
    };
  }

  function blockOfMark(node: Node | null): string | null {
    const el = node instanceof Element ? node : node?.parentElement;
    const mark = el?.closest<HTMLElement>('mark[data-c]');
    return mark && !mark.hasAttribute('data-resolved') ? (mark.dataset['c'] ?? null) : null;
  }

  const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
  const barTop = $derived(bar ? (bar.flip ? bar.bottom + 12 : bar.top - barH - 12) : 0);
  const barLeft = $derived(bar ? clamp(bar.x - barW / 2, 8, deskW - barW - 8) : 0);
  const blockKind = $derived(bar ? find(bar.block)?.kind : undefined);

  function readTime(words: number, short = false): string {
    const seconds = Math.round((words / WPM) * 60);
    if (seconds < 60) return short ? `${Math.max(1, seconds)} sec` : 'under a minute';
    return `${Math.round(seconds / 60)} min`;
  }

  // ── Comment margin layout: cards sit level with their passage ────────────────────────────
  interface Box {
    x: number;
    y: number;
    w: number;
    h: number;
  }
  let anchors = $state<Record<string, Box[]>>({});
  let tops = $state<Record<string, number>>({});
  let heights = $state<Record<string, number>>({});
  let geo = $state({ paperRight: 0, marginLeft: 0 });
  let wide = $state(true);
  let placed = $state(false);
  let canvasW = $state(0);
  let frame = 0;

  function queueMeasure() {
    if (!frame) frame = requestAnimationFrame(layout);
  }

  function layout() {
    frame = 0;
    if (!desk || !paper) return;
    const d = desk.getBoundingClientRect();
    const p = paper.getBoundingClientRect();
    // The margin stays while the paper can keep most of its width (max-width × zoom) beside
    // it; the paper gives up the rest and the lines reflow a little shorter.
    const natural = parseFloat(getComputedStyle(paper).maxWidth) * (zoom / 100);
    wide = canvasW >= natural * 0.85 + MARGIN + 16;

    const found: Record<string, Box[]> = {};
    for (const t of threads) {
      const el = paper.querySelector(`mark[data-c="${t.id}"]`) ?? textEl(t.block);
      if (!el) continue;
      found[t.id] = [...el.getClientRects()]
        .filter((r) => r.width > 0)
        .map((r) => ({ x: r.left - d.left, y: r.top - d.top, w: r.width, h: r.height }));
    }
    anchors = found;
    geo = { paperRight: p.right - d.left, marginLeft: p.right - d.left + 32 };

    // Stack the cards top-down; the active one sits exactly level with its passage and the
    // others make room above and below it.
    const GAP = 12;
    const order = threads
      .filter((t) => found[t.id]?.length)
      .map((t) => ({ id: t.id, want: (found[t.id]?.[0]?.y ?? 0) - 10, h: heights[t.id] ?? 120 }))
      .sort((a, b) => a.want - b.want);
    const next: Record<string, number> = {};
    const pivot = order.findIndex((o) => o.id === active);
    const floor = 44;
    if (pivot < 0) {
      let y = floor;
      for (const o of order) {
        y = Math.max(o.want, y);
        next[o.id] = y;
        y += o.h + GAP;
      }
    } else {
      const p0 = order[pivot]!;
      next[p0.id] = Math.max(floor, p0.want);
      let y = next[p0.id]! + p0.h + GAP;
      for (const o of order.slice(pivot + 1)) {
        y = Math.max(o.want, y);
        next[o.id] = y;
        y += o.h + GAP;
      }
      let bottom = next[p0.id]! - GAP;
      for (const o of order.slice(0, pivot).reverse()) {
        const top = Math.min(o.want, bottom - o.h);
        next[o.id] = top;
        bottom = top - GAP;
      }
    }
    tops = next;
    if (!placed) requestAnimationFrame(() => (placed = true));
  }

  $effect(() => {
    // Re-measure whenever the text, the threads or the page geometry change.
    void blocks.map((b) => b.kind + b.html).join();
    void threads.map((t) => `${t.id}${t.resolved}${t.comments.length}${t.draft}`).join();
    void [active, zoom, measure, leading, canvasW, JSON.stringify(heights)];
    queueMeasure();
  });

  const link = $derived.by(() => {
    if (!wide || !linked) return null;
    const box = anchors[linked]?.[0];
    const top = tops[linked];
    if (!box || top === undefined) return null;
    const sx = geo.paperRight - 20;
    const sy = box.y + box.h / 2;
    const ex = geo.marginLeft;
    const ey = top + 26;
    const mid = (sx + ex) / 2;
    return { sx, sy, ex, ey, d: `M ${sx} ${sy} C ${mid} ${sy}, ${mid} ${ey}, ${ex} ${ey}` };
  });

  // ── Drag and drop of blocks by their handle ──────────────────────────────────────────────
  let dragging = $state<string | null>(null);
  let drop = $state<{ id: string; after: boolean } | null>(null);
  const DRAG_TYPE = 'application/x-document-block';

  function dragStart(event: DragEvent, id: string) {
    dragging = id;
    bar = null;
    if (!event.dataTransfer) return;
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData(DRAG_TYPE, id);
    const row = rowEl(id);
    if (row) event.dataTransfer.setDragImage(row, 24, 16);
  }

  function dragOver(event: DragEvent, id: string) {
    if (!dragging) return;
    event.preventDefault();
    const box = (event.currentTarget as HTMLElement).getBoundingClientRect();
    drop = { id, after: event.clientY > box.top + box.height / 2 };
  }

  function dropBlock(event: DragEvent) {
    if (!dragging || !drop) return;
    event.preventDefault();
    const id = dragging;
    const from = indexOf(id);
    const block = blocks[from];
    if (block && drop.id !== id) {
      flushTyping();
      blocks.splice(from, 1);
      const at = indexOf(drop.id) + (drop.after ? 1 : 0);
      blocks.splice(at, 0, block);
      commit('move block', id);
      flash(id);
    }
    dragging = null;
    drop = null;
  }

  // ── Keyboard and input inside a block ────────────────────────────────────────────────────
  const INLINE_KEYS: Record<string, InlineCmd> = {
    KeyB: 'bold',
    KeyI: 'italic',
    KeyU: 'underline',
  };
  const KIND_KEYS: Record<string, BlockKind> = {
    'alt+Digit0': 'p',
    'alt+Digit1': 'h1',
    'alt+Digit2': 'h2',
    'shift+Digit8': 'ul',
    'shift+Digit7': 'ol',
    'shift+Digit9': 'quote',
  };

  async function onBlockKeydown(event: KeyboardEvent, id: string) {
    const el = event.currentTarget as HTMLElement;
    const mod = MAC ? event.metaKey : event.ctrlKey;
    const block = find(id);
    if (!block) return;

    if (mod && !event.altKey && !event.shiftKey) {
      const cmd = INLINE_KEYS[event.code];
      if (cmd) {
        event.preventDefault();
        format(cmd, cmd);
        return;
      }
      if (event.code === 'KeyK') {
        event.preventDefault();
        if (bar) openLink();
        return;
      }
    }
    if (mod && event.shiftKey && event.code === 'KeyX') {
      event.preventDefault();
      format('strikeThrough', 'strikethrough');
      return;
    }
    if (mod && event.altKey && event.code === 'KeyM') {
      event.preventDefault();
      addComment();
      return;
    }
    const kind = mod ? KIND_KEYS[`${event.altKey ? 'alt' : 'shift'}+${event.code}`] : undefined;
    if (kind && (event.altKey || event.shiftKey)) {
      event.preventDefault();
      turnInto(id, kind, true);
      return;
    }
    if (event.altKey && event.shiftKey && (event.key === 'ArrowUp' || event.key === 'ArrowDown')) {
      event.preventDefault();
      move(id, event.key === 'ArrowUp' ? -1 : 1);
      return;
    }
    if (event.key === 'Escape') {
      if (bar) getSelection()?.collapseToEnd();
      else active = null;
      return;
    }

    const sel = getSelection();
    if (!sel?.rangeCount) return;

    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      const range = sel.getRangeAt(0);
      range.deleteContents();
      const list = block.kind === 'ul' || block.kind === 'ol';
      // Enter on an empty list item leaves the list, as in every word processor.
      if (list && !el.textContent) {
        turnInto(id, 'p');
        return;
      }
      flushTyping();
      const tail = document.createRange();
      tail.setStart(range.startContainer, range.startOffset);
      tail.setEnd(el, el.childNodes.length);
      const holder = document.createElement('div');
      holder.append(tail.extractContents());
      block.html = clean(el);
      const next: DocBlock = {
        id: newId('b'),
        kind: list ? block.kind : 'p',
        html: holder.textContent ? holder.innerHTML : '',
      };
      blocks.splice(indexOf(id) + 1, 0, next);
      commit('new line', next.id);
      await focusBlock(next.id, 0);
      return;
    }

    const at = offsets(el);
    if (event.key === 'Backspace' && at && at.start === 0 && at.end === 0) {
      if (block.kind !== 'p') {
        event.preventDefault();
        turnInto(id, 'p');
        return;
      }
      const prev = blocks[indexOf(id) - 1];
      if (!prev) return;
      event.preventDefault();
      flushTyping();
      const join = plain(prev.html).length;
      prev.html = prev.html + block.html;
      blocks.splice(indexOf(id), 1);
      commit('join lines', prev.id);
      await focusBlock(prev.id, join);
      return;
    }

    if ((event.key === 'ArrowUp' || event.key === 'ArrowDown') && sel.isCollapsed && !mod) {
      const up = event.key === 'ArrowUp';
      const caret = [...sel.getRangeAt(0).getClientRects()][0];
      const box = el.getBoundingClientRect();
      const line = parseFloat(getComputedStyle(el).lineHeight) || 24;
      const edge =
        !caret || (up ? caret.top - box.top < line * 0.8 : box.bottom - caret.bottom < line * 0.8);
      const target = blocks[indexOf(id) + (up ? -1 : 1)];
      if (edge && target) {
        event.preventDefault();
        focusBlock(target.id, up ? 'end' : 0);
      }
    }
  }

  const SHORTHANDS: [RegExp, BlockKind][] = [
    [/^#\s/, 'h1'],
    [/^##\s/, 'h2'],
    [/^[-*]\s/, 'ul'],
    [/^1[.)]\s/, 'ol'],
    [/^>\s/, 'quote'],
  ];

  async function onBlockInput(event: Event, id: string) {
    const el = event.currentTarget as HTMLElement;
    const block = find(id);
    if (!block) return;
    // Markdown habits work: "# ", "- ", "1. " and "> " at the start turn the line into a block.
    if (block.kind === 'p') {
      const text = el.textContent ?? '';
      const hit = SHORTHANDS.find(([re]) => re.test(text));
      const first = el.firstChild;
      if (hit && first?.nodeType === Node.TEXT_NODE) {
        const length = (hit[0].exec(text)?.[0] ?? '').length;
        const lead = first as CharacterData;
        lead.deleteData(0, Math.min(length, lead.length));
        sync(id);
        flushTyping();
        block.kind = hit[1];
        commit(KINDS[hit[1]].label.toLowerCase(), id);
        flash(id);
        await focusBlock(id, 0);
        return;
      }
    }
    block.html = clean(el);
    typed(id);
  }

  function onBeforeInput(event: InputEvent) {
    if (event.inputType === 'historyUndo' || event.inputType === 'historyRedo') {
      event.preventDefault();
      if (event.inputType === 'historyUndo') undo();
      else redo();
    }
  }

  function onPaste(event: ClipboardEvent) {
    event.preventDefault();
    const text = event.clipboardData?.getData('text/plain') ?? '';
    document.execCommand('insertText', false, text.replace(/\s*\n+\s*/g, ' '));
  }

  function onBlockClick(event: MouseEvent) {
    const mark = (event.target as Element).closest<HTMLElement>('mark[data-c]');
    if (mark?.dataset['c']) active = mark.dataset['c'];
  }

  function onBlockPointer(event: PointerEvent, entering: boolean) {
    const mark = (event.target as Element).closest<HTMLElement>('mark[data-c]');
    if (!mark || mark.hasAttribute('data-resolved')) return;
    hovered = entering ? (mark.dataset['c'] ?? null) : null;
  }

  function onWindowKeydown(event: KeyboardEvent) {
    const mod = MAC ? event.metaKey : event.ctrlKey;
    if (!mod || (event.code !== 'KeyZ' && event.code !== 'KeyY')) return;
    const target = event.target as HTMLElement;
    // Fields outside the document keep their own undo.
    if (target.closest('input, textarea')) return;
    event.preventDefault();
    if (event.code === 'KeyY' || event.shiftKey) redo();
    else undo();
  }

  // ── Derived numbers ──────────────────────────────────────────────────────────────────────
  const words = $derived(blocks.reduce((n, b) => n + countWords(plain(b.html)), 0));
  const readLabel = $derived(
    readTime(words) === 'under a minute'
      ? 'under a minute to read'
      : `about ${readTime(words)} to read`,
  );
  const numbers = $derived.by(() => {
    const out: Record<string, number> = {};
    let n = 0;
    for (const b of blocks) {
      n = b.kind === 'ol' ? n + 1 : 0;
      if (n) out[b.id] = n;
    }
    return out;
  });
  let focused = $state<string | null>(null);

  // Mara is working in the "How the beds are shared" list: her presence sits beside it.
  const peer = { block: 'b9', name: 'Mara Lindqvist', color: 'pink' as const };

  const uid = $props.id();

  onMount(() => {
    reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const css = getComputedStyle(document.documentElement);
    slow = reduced ? 0 : parseFloat(css.getPropertyValue('--motion-slow')) || 360;
    base = reduced ? 0 : parseFloat(css.getPropertyValue('--motion-base')) || 220;
    document.execCommand('styleWithCSS', false, 'false');
    const onSelection = () => refreshBar();
    document.addEventListener('selectionchange', onSelection);
    const observer = new ResizeObserver(() => {
      queueMeasure();
      if (bar) refreshBar();
    });
    if (paper) observer.observe(paper);
    return () => {
      document.removeEventListener('selectionchange', onSelection);
      observer.disconnect();
      cancelAnimationFrame(frame);
      clearTimeout(typingTimer);
      clearTimeout(saveTimer);
    };
  });

  const undoLabel = $derived(past.length ? `Undo ${past.at(-1)?.label}` : 'Nothing to undo yet');
  const redoLabel = $derived(future.length ? `Redo ${future.at(-1)?.label}` : 'Nothing to redo');
</script>

<svelte:window
  onkeydown={onWindowKeydown}
  onresize={() => {
    queueMeasure();
    refreshBar();
  }}
/>

{#snippet glyph(kind: BlockKind, size = 16)}
  <Icon name={KINDS[kind].icon} {size} />
{/snippet}

{#snippet thread(t: DocThread)}
  <CommentThread
    comments={t.comments}
    quote={t.quote}
    resolved={t.resolved}
    active={active === t.id}
    now={NOW}
    label="Comments on “{t.quote}”"
    replyLabel={t.draft ? 'Comment' : 'Reply'}
    replyPlaceholder={t.draft ? 'Ask a question or leave a kind word…' : 'Reply…'}
    onreply={(text) => reply(t, text)}
    onresolve={t.draft
      ? undefined
      : (done) => resolve(t, done, document.querySelector(`[data-thread="${t.id}"]`))}
  />
  {#if t.draft}
    <div class="draft-actions">
      <Button size="xs" variant="secondary" label="Discard" onclick={() => discard(t)} />
    </div>
  {/if}
{/snippet}

<div class="editor" bind:this={root}>
  <!-- Document-wide things only: their effect IS the whole document. Both bars float over
       running text, where refraction would smear the words: frosted glass reads calmer. -->
  <Layer
    level="front"
    as="header"
    direction="horizontal"
    gap="xs"
    wrap={false}
    lens={false}
    class="docbar"
    data-note="docbar"
    aria-label="Document"
  >
    <span class="doc-icon" aria-hidden="true"><Icon name="file-text" size={18} /></span>
    <div class="title-group">
      <input
        class="title-input"
        bind:value={title}
        aria-label="Document title"
        size={Math.max(6, title.length)}
        oninput={saving}
        onkeydown={(e) => e.key === 'Enter' && (e.currentTarget as HTMLInputElement).blur()}
      />
      <Tooltip text="Every change is saved as you go" placement="bottom">
        <span class="saved" class:busy={save === 'saving'} data-note="saved" role="status">
          {#if save === 'saving'}
            <span class="pulse" aria-hidden="true"></span><span class="saved-text">Saving…</span>
          {:else}
            <Icon name="check-circle" size={14} /><span class="saved-text">Saved</span>
          {/if}
        </span>
      </Tooltip>
    </div>
    <Spacer />
    <ToolGroup label="History" data-note="history">
      <IconButton
        icon="undo"
        label="Undo"
        tooltip={undoLabel}
        tooltipPlacement="bottom"
        shape="pill"
        shortcut={['Mod', 'Z']}
        aria-disabled={!past.length}
        onclick={undo}
      />
      <IconButton
        icon="redo"
        label="Redo"
        tooltip={redoLabel}
        tooltipPlacement="bottom"
        shape="pill"
        shortcut={['Mod', 'Shift', 'Z']}
        aria-disabled={!future.length}
        onclick={redo}
      />
    </ToolGroup>
    <span class="sep" aria-hidden="true"></span>
    <Popover placement="bottom-end" width="19rem" title="Page setup">
      {#snippet trigger(props)}
        <IconButton
          {...props}
          icon="layout"
          label="Page setup"
          tooltip="Line length and spacing"
          tooltipPlacement="bottom"
          shape="pill"
        />
      {/snippet}
      <Stack gap="md">
        <Stack gap="xs">
          <Text size="sm" weight="semibold" id="{uid}-measure">Line length</Text>
          <SegmentedControl
            labelledby="{uid}-measure"
            size="sm"
            full
            bind:value={measure}
            options={[
              { value: 'narrow', label: 'Narrow' },
              { value: 'medium', label: 'Medium' },
              { value: 'wide', label: 'Wide' },
            ]}
          />
        </Stack>
        <Stack gap="xs">
          <Text size="sm" weight="semibold" id="{uid}-leading">Line spacing</Text>
          <SegmentedControl
            labelledby="{uid}-leading"
            size="sm"
            full
            bind:value={leading}
            options={[
              { value: 'snug', label: 'Snug' },
              { value: 'normal', label: 'Normal' },
              { value: 'airy', label: 'Airy' },
            ]}
          />
        </Stack>
        <Text size="xs" tone="subtle">Applies to the whole document — watch the page.</Text>
      </Stack>
    </Popover>
    <span class="people"><AvatarStack people={docPeople} size={28} max={3} label="Here now" /></span
    >
    <Popover placement="bottom-end" width="21rem" title="Share “{title}”">
      {#snippet trigger(props)}
        <Button {...props} variant="primary" icon="share" label="Share" collapse />
      {/snippet}
      <Stack gap="sm">
        <Text size="sm" tone="muted">Anyone with the link can read and comment.</Text>
        <Row gap="sm">
          <Text size="sm" mono truncate>https://docs.example.com/d/spring-handbook</Text>
          <Spacer />
          <CopyButton value="https://docs.example.com/d/spring-handbook" />
        </Row>
      </Stack>
    </Popover>
  </Layer>

  <main class="canvas" bind:clientWidth={canvasW}>
    <div class="desk" bind:this={desk} bind:clientWidth={deskW} bind:clientHeight={deskH}>
      <article
        class="paper"
        bind:this={paper}
        style:--doc-measure={MEASURES[measure]}
        style:--doc-leading={LEADINGS[leading]}
        style:zoom={zoom / 100}
        aria-label="Page"
      >
        {#each blocks as block, i (block.id)}
          {@const info = KINDS[block.kind]}
          {@const empty = !plain(block.html).trim()}
          <div
            class="row kind-{block.kind}"
            class:dragging={dragging === block.id}
            class:drop-before={drop?.id === block.id && !drop.after && dragging !== block.id}
            class:drop-after={drop?.id === block.id && drop.after && dragging !== block.id}
            class:has-peer={peer.block === block.id}
            data-row={block.id}
            data-note={block.id === 'b4' ? 'block' : undefined}
            role="group"
            aria-label="{info.label} block"
            animate:flip={{ duration: slow, easing: (t) => 1 - Math.pow(1 - t, 3) }}
            transition:slide={{ duration: slow }}
            ondragover={(e) => dragOver(e, block.id)}
            ondrop={dropBlock}
            onfocusin={() => (focused = block.id)}
            onfocusout={(e) => {
              const next = e.relatedTarget as Node | null;
              if (!next || !(e.currentTarget as HTMLElement).contains(next)) focused = null;
            }}
          >
            <div class="gutter">
              {#if peer.block === block.id}
                <span class="peer" title="{peer.name} is editing here">
                  <Avatar name={peer.name} size={22} color={peer.color} />
                </span>
              {/if}
              <Popover placement="bottom-start" width="17rem" padding="sm" label="Block options">
                {#snippet trigger(props)}
                  <Tooltip text="Drag to move · click for options" align="start">
                    <button
                      {...props}
                      type="button"
                      class="handle"
                      draggable="true"
                      aria-label="{info.label} block: options, or drag to move"
                      ondragstart={(e) => dragStart(e, block.id)}
                      ondragend={() => {
                        dragging = null;
                        drop = null;
                      }}
                    >
                      <Icon name="grip" size={16} />
                    </button>
                  </Tooltip>
                {/snippet}
                {#snippet children(close)}
                  <div class="menu">
                    <span class="menu-label">Turn into</span>
                    <div class="kinds" role="group" aria-label="Turn into">
                      {#each KIND_ORDER as kind (kind)}
                        <button
                          type="button"
                          class="kind"
                          aria-pressed={block.kind === kind}
                          onclick={() => {
                            close();
                            turnInto(block.id, kind);
                            focusBlock(block.id, 'end');
                          }}
                        >
                          {@render glyph(kind, 15)}<span>{KINDS[kind].label}</span>
                        </button>
                      {/each}
                    </div>
                    <span class="menu-sep" aria-hidden="true"></span>
                    <button
                      type="button"
                      class="item"
                      disabled={i === 0}
                      onclick={() => {
                        close();
                        move(block.id, -1);
                      }}
                    >
                      <Icon name="arrow-up" size={15} /><span>Move up</span>
                      <span class="keys"
                        >{#each MOVE_UP as k (k)}<Kbd>{k}</Kbd>{/each}</span
                      >
                    </button>
                    <button
                      type="button"
                      class="item"
                      disabled={i === blocks.length - 1}
                      onclick={() => {
                        close();
                        move(block.id, 1);
                      }}
                    >
                      <Icon name="arrow-down" size={15} /><span>Move down</span>
                      <span class="keys"
                        >{#each MOVE_DOWN as k (k)}<Kbd>{k}</Kbd>{/each}</span
                      >
                    </button>
                    <button
                      type="button"
                      class="item"
                      onclick={() => {
                        close();
                        duplicate(block.id);
                      }}
                    >
                      <Icon name="copy" size={15} /><span>Duplicate</span>
                    </button>
                    <button
                      type="button"
                      class="item"
                      onclick={() => {
                        close();
                        insertAfter(block.id);
                      }}
                    >
                      <Icon name="plus" size={15} /><span>Add a line below</span>
                      <span class="keys"><Kbd>↵</Kbd></span>
                    </button>
                    <span class="menu-sep" aria-hidden="true"></span>
                    <button
                      type="button"
                      class="item danger"
                      onclick={() => {
                        close();
                        remove(block.id);
                      }}
                    >
                      <Icon name="trash" size={15} /><span>Delete</span>
                    </button>
                  </div>
                {/snippet}
              </Popover>
            </div>

            <div class="body">
              {#if block.kind === 'ul'}
                <span class="marker" aria-hidden="true">•</span>
              {:else if block.kind === 'ol'}
                <span class="marker" aria-hidden="true">{numbers[block.id]}.</span>
              {/if}
              <svelte:element
                this={info.tag}
                class="text"
                role="textbox"
                aria-multiline="true"
                aria-label={info.label}
                contenteditable="true"
                tabindex="0"
                spellcheck="true"
                data-text={block.id}
                data-placeholder={info.placeholder}
                data-note={block.id === 'b2' ? 'text' : undefined}
                use:editable={block.html}
                onkeydown={(e: KeyboardEvent) => onBlockKeydown(e, block.id)}
                oninput={(e: Event) => onBlockInput(e, block.id)}
                onbeforeinput={onBeforeInput}
                onpaste={onPaste}
                onclick={onBlockClick}
                onpointerover={(e: PointerEvent) => onBlockPointer(e, true)}
                onpointerout={(e: PointerEvent) => onBlockPointer(e, false)}
              ></svelte:element>

              {#if empty && focused === block.id}
                <div
                  class="chips"
                  role="group"
                  aria-label="Turn this line into"
                  transition:fade={{ duration: base }}
                >
                  {#each KIND_ORDER.slice(1) as kind (kind)}
                    <button
                      type="button"
                      class="chip"
                      onmousedown={(e) => e.preventDefault()}
                      onclick={() => turnInto(block.id, kind)}
                    >
                      {@render glyph(kind, 14)}<span>{KINDS[kind].label}</span>
                    </button>
                  {/each}
                </div>
              {/if}

              {#if !wide}
                {#each threads.filter((t) => t.block === block.id && t.id === active) as t (t.id)}
                  <div
                    class="inline-thread"
                    data-thread={t.id}
                    transition:slide={{ duration: slow }}
                  >
                    {@render thread(t)}
                  </div>
                {/each}
              {/if}
            </div>

            <!-- Inserts exactly here: between this block and the next. -->
            <div class="insert">
              <button
                type="button"
                class="plus"
                tabindex="-1"
                aria-label="Add a line after this {info.label.toLowerCase()}"
                onclick={() => insertAfter(block.id)}
              >
                <Icon name="plus" size={14} />
              </button>
            </div>
          </div>
        {/each}
      </article>

      {#if wide}
        <aside class="margin" class:placed aria-label="Comments" data-note="margin">
          <div class="margin-head">
            <span class="eyebrow">Comments</span>
            {#if openCount}
              <Badge size="sm" label="{openCount} open" />
            {:else}
              <Badge size="sm" tone="ok" icon="check" label="All caught up" />
            {/if}
          </div>
          {#if !threads.some((t) => !t.resolved)}
            <p class="margin-hint">
              Select any words and press <Icon name="message-plus" size={13} /> to start a conversation
              right next to them.
            </p>
          {/if}
          {#each threads as t (t.id)}
            {#if tops[t.id] !== undefined}
              <div
                class="card"
                role="group"
                aria-label="Comments"
                class:on={linked === t.id}
                class:fresh={t.draft}
                data-thread={t.id}
                style:top="{tops[t.id]}px"
                bind:offsetHeight={heights[t.id]}
                onpointerenter={() => (hovered = t.id)}
                onpointerleave={() => (hovered = null)}
                onfocusin={() => (active = t.id)}
              >
                {@render thread(t)}
              </div>
            {/if}
          {/each}
        </aside>
        {#if link}
          {#key linked}
            <svg class="links" width={deskW} height={deskH} aria-hidden="true">
              <path d={link.d} pathLength="1" />
              <circle cx={link.sx} cy={link.sy} r="3.5" />
            </svg>
          {/key}
        {/if}
      {/if}

      {#if linked && anchors[linked]}
        {#each anchors[linked] as r, i (i)}
          <span
            class="ring"
            aria-hidden="true"
            style:left="{r.x - 2}px"
            style:top="{r.y}px"
            style:width="{r.w + 4}px"
            style:height="{r.h}px"
          ></span>
        {/each}
      {/if}

      {#if bar}
        {#key bar.key}
          <div
            class="fbar"
            class:below={bar.flip}
            role="toolbar"
            tabindex="-1"
            aria-label="Format the selection"
            data-note="format-bar"
            style:left="{barLeft}px"
            style:top="{barTop}px"
            bind:offsetWidth={barW}
            bind:offsetHeight={barH}
            onmousedown={(e) => {
              if (!(e.target as Element).closest('input')) e.preventDefault();
            }}
          >
            {#if linking}
              <form class="link-form" onsubmit={applyLink}>
                <Icon name="link" size={16} />
                <input
                  bind:this={linkInput}
                  bind:value={linkUrl}
                  placeholder="Paste a link or an e-mail address"
                  aria-label="Link address"
                  onkeydown={(e) => {
                    if (e.key === 'Escape') {
                      e.preventDefault();
                      cancelLink();
                    }
                  }}
                />
                <IconButton
                  type="submit"
                  shape="pill"
                  showLabel
                  label={linkUrl.trim() ? 'Apply' : 'Remove'}
                />
              </form>
            {:else}
              {@const tipAt = bar.flip ? 'bottom' : 'top'}
              {#each INLINE as f (f.cmd)}
                <IconButton
                  icon={f.icon}
                  label={f.label}
                  shape="pill"
                  shortcut={f.keys}
                  tooltipPlacement={tipAt}
                  pressed={marks[f.cmd]}
                  onclick={() => format(f.cmd, f.label)}
                />
              {/each}
              <span class="sep" aria-hidden="true"></span>
              {#each BAR_KINDS as kind (kind)}
                <IconButton
                  icon={KINDS[kind].icon}
                  label={KINDS[kind].label}
                  shape="pill"
                  shortcut={KINDS[kind].keys}
                  tooltipPlacement={tipAt}
                  pressed={blockKind === kind}
                  onclick={() => bar && turnInto(bar.block, kind, true)}
                />
              {/each}
              <span class="sep" aria-hidden="true"></span>
              <IconButton
                icon="link"
                label="Link"
                shape="pill"
                shortcut={['Mod', 'K']}
                tooltipPlacement={tipAt}
                onclick={openLink}
              />
              <IconButton
                icon="message-plus"
                label="Comment"
                tone="accent"
                shape="pill"
                shortcut={['Mod', 'Alt', 'M']}
                tooltipPlacement={tipAt}
                tooltipAlign="end"
                onclick={addComment}
              />
              <!-- The count rides in the bar that is already at the selection: a chip of its own
                   under the selection covered the very line being read. -->
              <span class="selstat" aria-live="polite">
                {#if bar.words > 1}
                  {bar.words} words · {readTime(bar.words, true)}
                {:else}
                  {bar.chars} {bar.chars === 1 ? 'character' : 'characters'}
                {/if}
              </span>
            {/if}
          </div>
        {/key}
      {/if}
    </div>
  </main>

  <Layer
    level="front"
    edge="bottom"
    direction="horizontal"
    gap="xs"
    wrap={false}
    lens={false}
    class="statusbar"
    data-note="status"
    aria-label="Page status and zoom"
  >
    <span class="stat">
      <b>{words.toLocaleString('en')}</b> words<span class="read">{` · ${readLabel}`}</span>
    </span>
    <span class="sep" aria-hidden="true"></span>
    <ToolGroup label="Zoom">
      <IconButton
        icon="minus"
        label="Zoom out"
        shape="pill"
        disabled={zoom <= ZOOMS[0]!}
        onclick={() => (zoom = [...ZOOMS].reverse().find((z) => z < zoom) ?? zoom)}
      />
      <IconButton
        label="Zoom {zoom}%, reset to 100%"
        tooltip="Back to 100%"
        shape="pill"
        class="zoom"
        onclick={() => (zoom = 100)}>{zoom}%</IconButton
      >
      <IconButton
        icon="plus"
        label="Zoom in"
        shape="pill"
        tooltipAlign="end"
        disabled={zoom >= ZOOMS.at(-1)!}
        onclick={() => (zoom = ZOOMS.find((z) => z > zoom) ?? zoom)}
      />
    </ToolGroup>
  </Layer>

  <DesignNotes
    title="Document editor"
    notes={[
      {
        principle: 'locality',
        title: 'Formatting comes to your words',
        body: 'Select a few words: the format bar grows out of the selection and the word count appears right under it. Your eyes never leave the sentence you are shaping.',
        target: '[data-note="text"]',
      },
      {
        principle: 'locality',
        title: 'Handles live beside their block',
        body: 'Point at a paragraph: its handle appears in the left margin (drag it, or click for “turn into”, move, delete) and a “+” waits in the gap where the new line will open.',
        target: '[data-note="block"]',
      },
      {
        principle: 'cues',
        title: 'Notes sit level with their passage',
        body: 'Each comment stays at the height of the words it is about. Point at one and a line ties it to its passage, which lights up — no hunting for “which sentence?”.',
        target: '[data-note="margin"]',
      },
      {
        principle: 'locality',
        title: '“Saved” lives at the title',
        body: 'Saving is about this document, so its state sits beside its name — not in a toast in a far corner that disappears before you look.',
        target: '[data-note="saved"]',
      },
      {
        principle: 'cues',
        title: 'Motion shows what changed',
        body: 'Undo says what it will undo; afterwards the touched block glows for a moment. New lines open in place, moved blocks glide, the format bar grows from where you selected.',
        target: '[data-note="history"]',
      },
      {
        principle: 'function',
        title: 'One slim bar for the whole document',
        body: 'Title, undo, page setup and sharing affect everything, so only they sit in the glass bar. The paper rests on the ground; glass appears only where something floats.',
        target: '[data-note="docbar"]',
      },
      {
        principle: 'friendly',
        title: 'Plain, warm words',
        body: '“About 2 min to read” instead of a raw count, empty lines that suggest what to type, a little burst when the last question is answered. Nothing is ever at stake in the copy.',
        target: '[data-note="status"]',
      },
    ]}
  />
</div>

<style>
  .editor {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    min-height: 100dvh;
    padding: var(--sticky-gap) var(--gutter) 0;
  }

  /* ── The document bar (front layer, sticks to the top) ── */
  .editor > :global(.docbar) {
    z-index: var(--z-header);
    align-self: center;
    width: min(100%, var(--width-wide));
    min-height: var(--control-lg);
  }
  .doc-icon {
    display: inline-grid;
    place-items: center;
    flex-shrink: 0;
    width: var(--control-sm);
    height: var(--control-sm);
    border-radius: var(--radius-sm);
    background: var(--accent-soft);
    color: var(--accent-ink);
  }
  .title-group {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    min-width: 0;
  }
  .title-input {
    field-sizing: content;
    min-width: 6ch;
    max-width: 30ch;
    padding: var(--space-1) var(--space-2);
    border: 0;
    border-radius: var(--radius-sm);
    background: transparent;
    color: var(--text);
    font: inherit;
    font-size: var(--fs-lg);
    font-weight: var(--fw-semibold);
    letter-spacing: var(--tracking-tight);
    text-overflow: ellipsis;
    transition: background-color var(--motion-quick) var(--ease-out);
  }
  .title-input:hover {
    background: var(--fill-hover);
  }
  .title-input:focus-visible {
    outline: var(--focus-ring);
    outline-offset: 1px;
    background: var(--input-bg);
  }
  .saved {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    color: var(--text-3);
    font-size: var(--fs-xs);
    font-weight: var(--fw-medium);
    white-space: nowrap;
  }
  .saved :global(svg) {
    color: var(--ok);
    animation: bb-pop var(--motion-base) var(--ease-spring);
  }
  .pulse {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--accent);
    animation: pulse var(--motion-lazy) var(--ease-in-out) infinite alternate;
  }
  @keyframes pulse {
    from {
      opacity: 0.35;
      transform: scale(0.7);
    }
  }
  .people {
    display: inline-flex;
    margin-inline: var(--space-1);
  }

  /* ── Focus on the editor's own controls (the tools bring theirs) ── */
  .handle:focus-visible,
  .plus:focus-visible,
  .chip:focus-visible,
  .kind:focus-visible,
  .item:focus-visible {
    outline: var(--focus-ring);
    outline-offset: 1px;
  }
  .sep {
    flex-shrink: 0;
    width: 1px;
    height: 18px;
    margin: 0 var(--space-1);
    background: var(--border-strong);
  }
  .keys {
    display: inline-flex;
    gap: 2px;
  }

  /* ── The canvas: paper on the ground, a comment margin beside it ── */
  .canvas {
    flex: 1;
    padding: var(--space-8) 0 var(--space-10);
  }
  .desk {
    position: relative;
    display: flex;
    justify-content: center;
    gap: var(--space-8);
  }
  .paper {
    --pad-x: calc(var(--space-12) + var(--space-6));
    position: relative;
    flex: 0 1 auto;
    box-sizing: border-box;
    width: 100%;
    max-width: calc(var(--doc-measure) + 2 * var(--pad-x));
    min-height: 70vh;
    margin: 0;
    padding: var(--space-12) var(--pad-x) calc(var(--space-12) * 2);
    border: 1px solid var(--border-strong);
    border-radius: var(--radius-lg);
    background: var(--editor-bg);
    /* One light from above: a lit top edge, a soft shadow on the ground below. */
    box-shadow:
      var(--glass-shadow),
      inset 0 1px 0 var(--pill-light);
    color: var(--text);
    /* Running text in the book face, at the reading measure and leading; headings stay sans. */
    font-family: var(--font-serif);
    font-size: var(--fs-xl);
    line-height: var(--doc-leading);
    caret-color: var(--accent);
    transition: max-width var(--motion-slow) var(--ease-in-out);
  }
  .margin {
    position: relative;
    flex: 0 0 20rem;
    min-width: 0;
  }
  .margin-head {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    height: var(--control-sm);
  }
  .eyebrow {
    font-size: var(--fs-xs);
    font-weight: var(--fw-semibold);
    letter-spacing: var(--tracking-caps);
    text-transform: uppercase;
    color: var(--text-3);
  }
  .margin-hint {
    margin: var(--space-2) 0 0;
    color: var(--text-3);
    font-size: var(--fs-sm);
    line-height: var(--leading-body);
  }
  .margin-hint :global(svg) {
    vertical-align: -2px;
  }
  .card {
    position: absolute;
    left: 0;
    right: 0;
    transition:
      transform var(--motion-base) var(--ease-out),
      opacity var(--motion-base) var(--ease-out);
  }
  .margin.placed .card {
    transition:
      top var(--motion-slow) var(--ease-out),
      transform var(--motion-base) var(--ease-out);
  }
  .card.on {
    transform: translateX(-4px);
  }
  /* A new note slides out of the passage it belongs to. */
  .card.fresh {
    animation: from-passage var(--motion-slow) var(--ease-out);
  }
  @keyframes from-passage {
    from {
      opacity: 0;
      transform: translateX(-24px) scale(0.97);
    }
  }
  .draft-actions {
    display: flex;
    justify-content: flex-end;
    padding-top: var(--space-2);
  }
  .links {
    position: absolute;
    inset: 0;
    z-index: 1;
    overflow: visible;
    pointer-events: none;
  }
  .links path {
    fill: none;
    stroke: var(--accent);
    stroke-width: 1.5;
    stroke-linecap: round;
    stroke-dasharray: 1;
    stroke-dashoffset: 1;
    animation: draw var(--motion-slow) var(--ease-out) forwards;
  }
  .links circle {
    fill: var(--accent);
    animation: bb-pop var(--motion-base) var(--ease-spring);
    transform-box: fill-box;
    transform-origin: center;
  }
  @keyframes draw {
    to {
      stroke-dashoffset: 0;
    }
  }
  .ring {
    position: absolute;
    z-index: 1;
    border-radius: var(--radius-xs);
    background: var(--accent-faint);
    box-shadow: 0 0 0 1.5px var(--accent-border);
    pointer-events: none;
    animation: ring-in var(--motion-base) var(--ease-out);
  }
  @keyframes ring-in {
    from {
      opacity: 0;
    }
  }

  /* ── Blocks ── */
  .row {
    position: relative;
    isolation: isolate;
    display: grid;
    grid-template-columns: var(--pad-x) minmax(0, 1fr);
    margin-left: calc(-1 * var(--pad-x));
    padding-block: 2px;
  }
  .row + .row {
    margin-top: 0.7em;
  }
  .row.kind-ul + .row.kind-ul,
  .row.kind-ol + .row.kind-ol {
    margin-top: 0.2em;
  }
  .row.kind-h2 {
    margin-top: 1.5em;
    font-size: var(--fs-3xl);
    line-height: var(--leading-tight);
  }
  .row.kind-h1 {
    font-size: var(--fs-display);
    line-height: var(--leading-tight);
  }
  .row.kind-h1 + .row {
    margin-top: 1em;
  }
  .row.kind-quote {
    margin-block: 1.4em;
    font-size: var(--fs-2xl);
  }
  .row.dragging {
    opacity: 0.4;
  }
  .row.drop-before::after,
  .row.drop-after::after {
    content: '';
    position: absolute;
    left: var(--pad-x);
    right: 0;
    height: 2px;
    border-radius: var(--radius-pill);
    background: var(--accent);
  }
  .row.drop-before::after {
    top: -0.35em;
  }
  .row.drop-after::after {
    bottom: -0.35em;
  }
  .editor :global([data-row].flash::before) {
    content: '';
    position: absolute;
    z-index: -1;
    inset: -2px calc(-1 * var(--space-3)) -2px calc(var(--pad-x) - var(--space-3));
    border-radius: var(--radius-sm);
    background: var(--accent-soft);
    animation: glow calc(var(--motion-lazy) * 2) var(--ease-out) forwards;
    pointer-events: none;
  }
  @keyframes glow {
    to {
      opacity: 0;
    }
  }

  .gutter {
    position: relative;
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
    padding-right: var(--space-3);
    /* Centre the handle on the first line, whatever its size. */
    padding-top: max(0px, calc((1lh - 26px) / 2));
    font-size: inherit;
  }
  .handle {
    display: grid;
    place-items: center;
    width: 20px;
    height: 26px;
    padding: 0;
    border: 0;
    border-radius: var(--radius-xs);
    background: none;
    color: var(--text-3);
    cursor: grab;
    opacity: 0;
    transition:
      opacity var(--motion-quick) var(--ease-out),
      background-color var(--motion-quick) var(--ease-out);
  }
  .handle:hover,
  .handle[aria-expanded='true'] {
    background: var(--fill-hover);
    color: var(--text);
  }
  .row:hover .handle,
  .row:focus-within .handle,
  .handle[aria-expanded='true'],
  .handle:focus-visible {
    opacity: 1;
  }
  .peer {
    position: absolute;
    right: calc(var(--space-3) + 24px);
    top: max(0px, calc((1lh - 22px) / 2));
    display: inline-flex;
    border-radius: 50%;
    box-shadow: 0 0 0 2px var(--editor-bg);
    transition: opacity var(--motion-quick) var(--ease-out);
  }
  .has-peer .body::before {
    content: '';
    position: absolute;
    left: calc(-1 * var(--space-2));
    top: 0.2em;
    bottom: 0.2em;
    width: 2px;
    border-radius: var(--radius-pill);
    background: var(--color-pink);
  }

  .body {
    position: relative;
    min-width: 0;
  }
  .kind-ul .body,
  .kind-ol .body {
    padding-left: 1.6em;
  }
  .marker {
    position: absolute;
    left: 0.2em;
    color: var(--text-3);
    font-variant-numeric: tabular-nums;
  }
  .text {
    margin: 0;
    font: inherit;
    color: inherit;
    outline: none;
    overflow-wrap: break-word;
    white-space: pre-wrap;
  }
  h1.text,
  h2.text {
    font-family: var(--font-sans);
  }
  h1.text {
    font-weight: var(--fw-bold);
    letter-spacing: -0.02em;
  }
  h2.text {
    font-weight: var(--fw-semibold);
    letter-spacing: var(--tracking-tight);
  }
  blockquote.text {
    padding-left: var(--space-5);
    border-left: 3px solid var(--fill-off);
    color: var(--text-2);
    font-style: italic;
  }
  p.text {
    color: var(--text);
  }
  .text:empty::before {
    content: attr(data-placeholder);
    color: var(--text-3);
    pointer-events: none;
    opacity: 0;
    transition: opacity var(--motion-base) var(--ease-out);
  }
  .text:focus:empty::before {
    opacity: 1;
  }
  .text :global(a) {
    color: var(--accent-ink);
    text-decoration: underline;
    text-decoration-color: var(--accent-border);
    text-underline-offset: 0.18em;
  }
  .text :global(mark[data-c]) {
    color: inherit;
    background: linear-gradient(
      transparent 56%,
      color-mix(in srgb, var(--color-yellow) 42%, transparent) 56%
    );
    -webkit-box-decoration-break: clone;
    box-decoration-break: clone;
    cursor: pointer;
  }
  .text :global(mark[data-resolved]) {
    background: none;
    cursor: text;
  }

  .chips {
    font-family: var(--font-sans);
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-1);
    margin-top: var(--space-2);
    font-size: var(--fs-sm);
    line-height: 1;
  }
  .chip {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    height: var(--control-xs);
    padding: 0 var(--space-3);
    border: 1px solid var(--border-strong);
    border-radius: var(--radius-pill);
    background: var(--fill-subtle);
    color: var(--text-2);
    font: inherit;
    font-weight: var(--fw-medium);
    cursor: pointer;
    transition:
      background-color var(--motion-quick) var(--ease-out),
      color var(--motion-quick) var(--ease-out);
  }
  .chip:hover {
    background: var(--accent-faint);
    color: var(--accent-ink);
  }
  .inline-thread {
    padding-top: var(--space-3);
    font-family: var(--font-sans);
    font-size: var(--fs-base);
    line-height: var(--leading-body);
  }

  /* The gap between two blocks: hover it and a line shows where the new one will open. */
  .insert {
    position: absolute;
    left: 0;
    right: 0;
    bottom: -0.55em;
    z-index: 2;
    height: 0.9em;
    min-height: 14px;
    opacity: 0;
    transition: opacity var(--motion-quick) var(--ease-out);
  }
  .insert::before {
    content: '';
    position: absolute;
    left: var(--pad-x);
    right: 0;
    top: 50%;
    height: 2px;
    margin-top: -1px;
    border-radius: var(--radius-pill);
    background: var(--accent-border);
    transform: scaleX(0.4);
    transform-origin: left center;
    transition: transform var(--motion-base) var(--ease-out);
  }
  .insert:hover,
  .insert:focus-within {
    opacity: 1;
  }
  .insert:hover::before {
    transform: none;
  }
  .plus {
    position: absolute;
    top: 50%;
    right: calc(100% - var(--pad-x) + var(--space-3) - 2px);
    display: grid;
    place-items: center;
    width: 24px;
    height: 24px;
    margin-top: -12px;
    padding: 0;
    border: 0.75px solid var(--accent-border);
    border-radius: 50%;
    background: var(--editor-bg);
    color: var(--accent-ink);
    cursor: pointer;
    box-shadow: var(--shadow-frosted);
    transition: transform var(--motion-base) var(--ease-spring);
  }
  .plus:hover {
    transform: scale(1.12);
  }
  .row.kind-h2 .insert {
    font-size: var(--fs-xl);
  }

  /* ── Block menu (in the handle's popover) ── */
  .menu {
    display: grid;
    gap: 2px;
  }
  .menu-label {
    padding: var(--space-1) var(--space-2);
    color: var(--text-3);
    font-size: var(--fs-2xs);
    font-weight: var(--fw-semibold);
    letter-spacing: var(--tracking-caps);
    text-transform: uppercase;
  }
  .kinds {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 2px;
  }
  .kind,
  .item {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    min-height: var(--control-sm);
    padding: 0 var(--space-2);
    border: 0;
    border-radius: var(--radius-sm);
    background: none;
    color: var(--text);
    font: inherit;
    font-size: var(--fs-sm);
    text-align: left;
    cursor: pointer;
    transition: background-color var(--motion-quick) var(--ease-out);
  }
  .kind :global(svg),
  .item :global(svg) {
    flex-shrink: 0;
    color: var(--text-3);
  }
  .kind:hover,
  .item:hover:not(:disabled) {
    background: var(--fill-hover);
  }
  .kind[aria-pressed='true'] {
    background: var(--accent-soft);
    color: var(--accent-ink);
  }
  .kind[aria-pressed='true'] :global(svg) {
    color: var(--accent-ink);
  }
  .item .keys {
    margin-left: auto;
  }
  .item:disabled {
    opacity: 0.4;
    cursor: default;
  }
  .item.danger,
  .item.danger :global(svg) {
    color: var(--danger);
  }
  .item.danger:hover {
    background: var(--tint-danger);
  }
  .menu-sep {
    height: 1px;
    margin: var(--space-1) var(--space-2);
    background: var(--border-strong);
  }

  /* ── The format bar: floats, so it is glass; it grows out of the selection ── */
  .fbar {
    position: absolute;
    z-index: var(--z-dropdown);
    display: flex;
    align-items: center;
    gap: 2px;
    padding: var(--space-1);
    border-radius: var(--radius-pill);
    border: 0.75px solid var(--layer-front-border);
    /* It always floats over text: the liquid-glass sheen on a near-opaque body keeps the
       icons legible even where the backdrop blur is unavailable. */
    background: var(--layer-front-bg), var(--tooltip-bg);
    backdrop-filter: var(--blur-pill);
    -webkit-backdrop-filter: var(--blur-pill);
    box-shadow: var(--shadow-pop);
    transform-origin: 50% 100%;
    animation: grow var(--motion-base) var(--ease-spring);
  }
  .fbar.below {
    transform-origin: 50% 0;
  }
  .fbar:focus {
    outline: none;
  }
  @keyframes grow {
    from {
      opacity: 0;
      transform: translateY(6px) scale(0.6);
    }
  }
  .fbar.below {
    animation-name: grow-down;
  }
  @keyframes grow-down {
    from {
      opacity: 0;
      transform: translateY(-6px) scale(0.6);
    }
  }
  .link-form {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    padding-left: var(--space-2);
    color: var(--text-3);
  }
  .link-form input {
    width: min(18rem, 60vw);
    height: var(--control-sm);
    padding: 0 var(--space-2);
    border: 1px solid var(--input-border);
    border-radius: var(--radius-pill);
    background: var(--input-bg);
    color: var(--text);
    font: inherit;
    font-size: var(--fs-sm);
  }
  .link-form input:focus-visible {
    outline: var(--focus-ring);
    outline-offset: 1px;
  }
  .selstat {
    padding: 0 var(--space-2) 0 var(--space-3);
    margin-left: var(--space-1);
    border-left: 1px solid var(--border-strong);
    color: var(--text-3);
    font-size: var(--fs-2xs);
    font-weight: var(--fw-semibold);
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
    pointer-events: none;
  }

  /* ── Status and zoom under the page (front layer, sticks to the bottom) ── */
  .editor > :global(.statusbar) {
    align-self: center;
    margin-bottom: var(--sticky-gap);
  }
  .stat {
    padding: 0 var(--space-2);
    color: var(--text-3);
    font-size: var(--fs-xs);
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }
  .stat b {
    color: var(--text-2);
    font-weight: var(--fw-semibold);
  }
  .editor :global(.zoom) {
    min-width: 3.5rem;
    font-size: var(--fs-xs);
    font-variant-numeric: tabular-nums;
  }

  /* ── Narrow screens: the bar sheds what it can, the page fills the width ── */
  @media (max-width: 720px) {
    .people {
      display: none;
    }
  }
  @media (max-width: 520px) {
    .editor {
      padding-inline: var(--space-2);
    }
    .doc-icon,
    .editor > :global(.docbar > .sep) {
      display: none;
    }
    .title-input {
      max-width: 100%;
      font-size: var(--fs-base);
    }
    .title-group {
      flex: 1 1 auto;
    }
    .saved-text {
      position: absolute;
      width: 1px;
      height: 1px;
      overflow: hidden;
      clip-path: inset(50%);
      white-space: nowrap;
    }
    .canvas {
      padding-top: var(--space-4);
    }
    .paper {
      --pad-x: var(--space-8);
      padding-top: var(--space-8);
      font-size: var(--fs-lg);
    }
    .row.kind-h1 {
      font-size: var(--fs-kpi);
    }
    .row.kind-h2 {
      font-size: var(--fs-2xl);
    }
    .gutter {
      padding-right: var(--space-2);
    }
    .peer {
      display: none;
    }
    .editor > :global(.statusbar) {
      align-self: flex-end;
    }
    /* Room for the zoom only; the selection still shows its own count. */
    .stat,
    .stat + .sep {
      display: none;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .fbar,
    .card.fresh,
    .links path,
    .links circle,
    .ring,
    .saved :global(svg),
    .pulse {
      animation-duration: 1ms;
    }
    .links path {
      stroke-dashoffset: 0;
    }
    .editor :global([data-row].flash::before) {
      animation-timing-function: linear;
    }
    .margin.placed .card,
    .paper,
    .plus {
      transition-duration: 1ms;
    }
  }
  @media (prefers-reduced-transparency: reduce) {
    .fbar {
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
      background: var(--glass-strong);
    }
  }
</style>
