<script lang="ts">
  /**
   * Example page: a change request under review, as a full-height app shell. The files changed,
   * the checks and the reviewers sit on the ground in the sidebar; the unified diff is the one
   * panel. Conversations open right under the line they are about, and reply and resolve where
   * they are. Each file has its own "Viewed" switch. The review decision floats bottom-right on
   * glass; "Approve" shimmers once every file is viewed and the checks have passed.
   * Storybook only.
   */
  import { tick } from 'svelte';
  import Avatar from '../patterns/atoms/Avatar.svelte';
  import Badge from '../patterns/atoms/Badge.svelte';
  import Button from '../patterns/atoms/Button.svelte';
  import Checkbox from '../patterns/atoms/Checkbox.svelte';
  import DotMatrix from '../patterns/atoms/DotMatrix.svelte';
  import Icon from '../patterns/atoms/Icon.svelte';
  import Spinner from '../patterns/atoms/Spinner.svelte';
  import Textarea from '../patterns/atoms/Textarea.svelte';
  import { changeCue } from '../patterns/atoms/changed';
  import Comment from '../patterns/molecules/Comment.svelte';
  import Popover from '../patterns/molecules/Popover.svelte';
  import Layer from '../patterns/layout/Layer.svelte';
  import Page from '../patterns/templates/Page.svelte';
  import { celebrate } from '../utils/delight';
  import DesignNotes, { type DesignNote } from './DesignNotes.svelte';
  import {
    REVIEW_NOW,
    changeRequest as cr,
    checks as allChecks,
    files,
    minutesAgo,
    reviewers as allReviewers,
    threads as allThreads,
    type ChangedFile,
    type DiffLine,
    type Reviewer,
    type ReviewThread,
  } from './mock-programming';

  interface Props {
    /** How the checks on the change stand when the page opens. */
    checks?: 'running' | 'passed' | 'failed';
    /** Your review so far. */
    verdict?: 'pending' | 'approved' | 'changes';
  }

  let { checks: checkStart = 'running', verdict: startVerdict = 'pending' }: Props = $props();

  const ME = 'Sam Example';

  let checks = $state(
    allChecks.map((c) => {
      const check = { ...c, fails: false };
      if (c.id !== 'browser') return check;
      if (checkStart === 'passed') check.at = c.seconds;
      if (checkStart === 'failed') return { ...check, at: c.seconds, fails: true };
      return check;
    }),
  );
  let reviewers = $state<Reviewer[]>(
    allReviewers.map((r) => (r.you ? { ...r, verdict: startVerdict } : { ...r })),
  );
  type Thread = ReviewThread & { draft: string };
  let threads = $state<Thread[]>(allThreads.map((t) => ({ ...structuredClone(t), draft: '' })));
  let unfolded = $state<Record<string, boolean>>({});
  let viewed = $state<Record<string, boolean>>({ 'docs/cart.md': true });
  let opening = $state<string | null>(null);
  let newDraft = $state('');
  let changesNote = $state('');
  let myNote = $state('');
  let currentFile = $state(files[0]!.path);
  let scroller = $state<HTMLElement | undefined>();
  let approveButton = $state<HTMLElement | undefined>();
  let nextId = 1;

  const me = $derived(reviewers.find((r) => r.you)!);
  const running = $derived(checks.some((c) => c.at < c.seconds));
  const failed = $derived(checks.filter((c) => c.fails && c.at >= c.seconds));
  const passed = $derived(!running && failed.length === 0);
  const viewedCount = $derived(files.filter((f) => viewed[f.path]).length);
  const open = $derived(threads.filter((t) => !t.resolved).length);
  const ready = $derived(viewedCount === files.length && passed && me.verdict === 'pending');
  const added = files.reduce((s, f) => s + f.added, 0);
  const removed = files.reduce((s, f) => s + f.removed, 0);

  $effect(() => {
    if (!running) return;
    const timer = setInterval(() => {
      for (const c of checks) if (c.at < c.seconds) c.at += 1;
    }, 1000);
    return () => clearInterval(timer);
  });

  // ── Syntax colour: just enough to read the code, not a real highlighter ────────────────

  const KEYWORDS = new Set(
    'import from export const let function async await return if else throw new type interface try finally catch of in as typeof extends'.split(
      ' ',
    ),
  );
  const LITERALS = new Set(['true', 'false', 'null', 'undefined']);
  const TOKEN =
    /(\/\/.*$|\/\*.*?\*\/)|('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*`)|(\b\d[\d_.]*\b)|([A-Za-z_$][\w$]*)|(\s+|[^\w\s])/g;

  type Token = { t: string; k: 'com' | 'str' | 'num' | 'kw' | 'lit' | 'type' | 'fn' | '' };

  function tokens(text: string, path: string): Token[] {
    if (path.endsWith('.md')) return [{ t: text, k: '' }];
    const out: Token[] = [];
    for (const m of text.matchAll(TOKEN)) {
      const [all, com, str, num, word] = m;
      if (com) out.push({ t: all, k: 'com' });
      else if (str) out.push({ t: all, k: 'str' });
      else if (num) out.push({ t: all, k: 'num' });
      else if (word) {
        const next = text[(m.index ?? 0) + all.length];
        const k = KEYWORDS.has(word)
          ? 'kw'
          : LITERALS.has(word)
            ? 'lit'
            : /^[A-Z]/.test(word)
              ? 'type'
              : next === '('
                ? 'fn'
                : '';
        out.push({ t: all, k });
      } else out.push({ t: all, k: '' });
    }
    return out;
  }

  // ── Diff navigation ─────────────────────────────────────────────────────────────────────

  const fileId = (path: string) => `file-${path.replace(/[^\w]+/g, '-')}`;
  const split = (path: string) => {
    const i = path.lastIndexOf('/');
    return { dir: path.slice(0, i + 1), name: path.slice(i + 1) };
  };

  function jump(path: string) {
    currentFile = path;
    const el = document.getElementById(fileId(path));
    if (!scroller || !el) return;
    const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
    scroller.scrollTo({ top: el.offsetTop, behavior: still ? 'auto' : 'smooth' });
  }

  function onscroll() {
    if (!scroller) return;
    let at = files[0]!.path;
    for (const f of files) {
      const el = document.getElementById(fileId(f.path));
      if (el && el.offsetTop <= scroller.scrollTop + 24) at = f.path;
    }
    currentFile = at;
  }

  function setViewed(file: ChangedFile, on: boolean) {
    viewed[file.path] = on;
    // Folding a file you were reading keeps its header where it was, so you land on the next.
    const el = document.getElementById(fileId(file.path));
    if (on && scroller && el && el.offsetTop < scroller.scrollTop)
      scroller.scrollTop = el.offsetTop;
  }

  // ── Conversations ───────────────────────────────────────────────────────────────────────

  const threadsAt = (key: string) => threads.filter((t) => t.at === key);
  const countIn = (file: ChangedFile) =>
    threads.filter((t) => t.at.startsWith(`${file.path}:`) && !t.resolved).length;

  async function startThread(line: DiffLine) {
    opening = line.key;
    newDraft = '';
    await tick();
    const field = document.getElementById(`draft-${line.key}`);
    field?.focus({ preventScroll: true });
    field?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }

  function addThread() {
    if (!opening || !newDraft.trim()) return;
    const id = `n${nextId++}`;
    threads.push({
      id,
      at: opening,
      resolved: false,
      comments: [{ id: `${id}-1`, author: ME, text: newDraft.trim(), ago: 0 }],
      draft: '',
    });
    opening = null;
    newDraft = '';
  }

  function reply(thread: Thread) {
    const text = thread.draft.trim();
    if (!text) return;
    thread.comments.push({
      id: `${thread.id}-${thread.comments.length + 1}`,
      author: ME,
      text,
      ago: 0,
    });
    thread.draft = '';
  }

  function resolve(thread: Thread, on: boolean) {
    thread.resolved = on;
    unfolded[thread.id] = false;
  }

  const submitOnMod = (run: () => void) => (event: KeyboardEvent) => {
    if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      run();
    }
    if (event.key === 'Escape' && opening) opening = null;
  };

  // ── The decision ────────────────────────────────────────────────────────────────────────

  function approve() {
    me.verdict = 'approved';
    if (approveButton) celebrate(approveButton);
  }

  function requestChanges(close: () => void) {
    if (!changesNote.trim()) return;
    me.verdict = 'changes';
    myNote = changesNote.trim();
    changesNote = '';
    close();
  }

  function rerunCheck(id: string) {
    const c = checks.find((x) => x.id === id);
    if (!c) return;
    c.fails = false;
    c.at = 0;
  }

  const verdictText: Record<Reviewer['verdict'], string> = {
    approved: 'Approved',
    changes: 'Asked for changes',
    pending: 'Review pending',
    commented: 'Commented',
  };
  const status = $derived(
    me.verdict === 'approved'
      ? { tone: 'ok' as const, label: 'Approved' }
      : me.verdict === 'changes'
        ? { tone: 'warn' as const, label: 'Changes requested' }
        : { tone: 'accent' as const, label: 'Open' },
  );
  const clock = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  const notes: DesignNote[] = [
    {
      principle: 'function',
      title: 'The diff is the one panel',
      body: 'Old and new line numbers, a calm green and red wash, and just enough colour in the code to read it. Files, checks and people sit on the ground beside it.',
      target: '[data-note="diff"]',
    },
    {
      principle: 'locality',
      title: 'Comment on the line, answer in the thread',
      body: 'Point at a line and its “+” appears in the gutter; the conversation opens right under it. Reply and Resolve sit in the thread, and a resolved one folds to a single line where it was.',
      target: '[data-note="thread"]',
    },
    {
      principle: 'locality',
      title: '“Viewed” sits on the file it marks',
      body: 'Ticking it folds that file and counts it in the sidebar and the review bar, so progress is visible where you read and where you decide.',
      target: '[data-note="files"]',
    },
    {
      principle: 'cues',
      title: '“Approve” shimmers when the work is done',
      body: 'Once every file is viewed and the checks have passed, the one action the page is waiting for carries a slow ring of light. Approving throws a few sprinkles from the button.',
      target: '[data-note="review"]',
    },
    {
      principle: 'friendly',
      title: 'Checks say what failed, in words',
      body: 'A failed check shows the test and the reason under its name, with “Run again” right there; a running one counts up in dot-matrix digits.',
      target: '[data-note="checks"]',
    },
  ];
</script>

{#snippet header()}
  <div class="bar">
    <Layer level="front" direction="horizontal" gap="md" wrap={false} padding="sm">
      <span class="logo" aria-hidden="true"><Icon name="git-merge" size={18} /></span>
      <div class="title">
        <h1>{cr.title} <span class="num">#{cr.number}</span></h1>
        <p>
          <code>{cr.branch}</code>
          <Icon name="arrow-right" size={12} />
          <code>{cr.base}</code>
          <span class="dot">·</span>
          {cr.author}
        </p>
      </div>
      <span class="status" use:changeCue={status.label}>
        <Badge tone={status.tone} label={status.label} />
      </span>
      <span class="stat">
        <span class="plus">+{added}</span>
        <span class="minus">−{removed}</span>
      </span>
    </Layer>
  </div>
{/snippet}

{#snippet sidebar()}
  <div class="side">
    <section aria-labelledby="files-title" data-note="files">
      <header class="side__head">
        <h2 id="files-title">Files</h2>
        <span class="muted" use:changeCue={viewedCount}>{viewedCount} of {files.length} viewed</span
        >
      </header>
      <ul class="files">
        {#each files as f (f.path)}
          {@const p = split(f.path)}
          {@const talk = countIn(f)}
          <li>
            <button
              type="button"
              class="file"
              aria-current={currentFile === f.path ? 'true' : undefined}
              onclick={() => jump(f.path)}
            >
              <span class="file__icon" class:done={viewed[f.path]}>
                <Icon
                  name={viewed[f.path] ? 'check' : f.status === 'added' ? 'plus' : 'file-text'}
                  size={13}
                />
              </span>
              <span class="file__path">
                <span class="file__dir">{p.dir}</span><span class="file__name">{p.name}</span>
              </span>
              {#if talk}
                <span class="file__talk" aria-label="{talk} open conversations">
                  <Icon name="chat" size={12} />{talk}
                </span>
              {/if}
              <span class="file__count">
                <span class="plus">+{f.added}</span>
                {#if f.removed}<span class="minus">−{f.removed}</span>{/if}
              </span>
            </button>
          </li>
        {/each}
      </ul>
    </section>

    <section aria-labelledby="checks-title" data-note="checks">
      <header class="side__head">
        <h2 id="checks-title">Checks</h2>
        <span class="muted" use:changeCue={`${running}-${failed.length}`}>
          {running ? 'Running' : failed.length ? `${failed.length} failed` : 'All passed'}
        </span>
      </header>
      <ul class="checks">
        {#each checks as c (c.id)}
          {@const done = c.at >= c.seconds}
          {@const bad = done && c.fails}
          <li class="check" class:bad>
            <span class="check__mark" class:ok={done && !bad} class:fail={bad}>
              {#if !done}<Spinner size={14} />{:else}<Icon
                  name={bad ? 'close' : 'check'}
                  size={12}
                />{/if}
            </span>
            <span class="check__name">{c.name}</span>
            <span class="check__time" class:live={!done} use:changeCue={done}>
              {#if done}
                {clock(c.seconds)}
              {:else}
                <DotMatrix value={clock(c.at)} label="{c.at} seconds" size="sm" />
              {/if}
            </span>
            {#if bad}
              <p class="check__why">{c.failure}</p>
              <span class="check__again">
                <Button
                  variant="soft"
                  size="sm"
                  icon="refresh"
                  label="Run again"
                  onclick={() => rerunCheck(c.id)}
                />
              </span>
            {/if}
          </li>
        {/each}
      </ul>
    </section>

    <section aria-labelledby="people-title">
      <header class="side__head"><h2 id="people-title">Reviewers</h2></header>
      <ul class="people">
        {#each reviewers as r (r.name)}
          <li>
            <Avatar name={r.name} size={24} color="auto" />
            <span class="people__name">{r.name}{r.you ? ' (you)' : ''}</span>
            <span class="verdict verdict--{r.verdict}" use:changeCue={r.verdict}>
              {verdictText[r.verdict]}
            </span>
          </li>
        {/each}
      </ul>
    </section>
  </div>
{/snippet}

{#snippet floating()}
  <div data-note="review">
    <Layer
      level="front"
      direction="horizontal"
      gap="sm"
      padding="sm"
      as="section"
      aria-label="Your review"
    >
      <span class="summary" use:changeCue={`${viewedCount}-${open}`}>
        {viewedCount}/{files.length} viewed · {open} open
      </span>
      {#if me.verdict === 'pending'}
        <Popover placement="top-end" width="20rem" title="What should change?" autofocus>
          {#snippet trigger(props)}
            <Button
              variant="ghost"
              shape="pill"
              icon="edit"
              label="Request changes"
              collapse
              {...props}
            />
          {/snippet}
          {#snippet children(close)}
            <form
              class="note-form"
              onsubmit={(event) => {
                event.preventDefault();
                requestChanges(close);
              }}
            >
              <Textarea
                bind:value={changesNote}
                aria-label="What should change?"
                placeholder="Saved carts need an expiry before this ships."
                rows={3}
                autogrow
                onkeydown={submitOnMod(() => requestChanges(close))}
              />
              <Button
                type="submit"
                variant="soft"
                icon="send"
                label="Send to {cr.author.split(' ')[0]}"
                disabled={!changesNote.trim()}
                block
              />
            </form>
          {/snippet}
        </Popover>
        <span bind:this={approveButton} class="approve">
          <Button
            variant="primary"
            shape="pill"
            icon="check"
            label="Approve"
            shimmer={ready}
            onclick={approve}
          />
        </span>
      {:else}
        <span class="decided">
          <Icon name={me.verdict === 'approved' ? 'check-circle' : 'edit'} size={16} />
          {me.verdict === 'approved' ? 'You approved' : 'You asked for changes'}
        </span>
        <Button
          variant="ghost"
          shape="pill"
          label="Withdraw"
          onclick={() => {
            me.verdict = 'pending';
            myNote = '';
          }}
        />
      {/if}
    </Layer>
  </div>
{/snippet}

{#snippet code(line: DiffLine, path: string)}
  {#each tokens(line.text, path) as tok, i (i)}{#if tok.k}<span class="tk tk--{tok.k}">{tok.t}</span
      >{:else}{tok.t}{/if}{/each}
{/snippet}

{#snippet thread(t: Thread)}
  {@const folded = t.resolved && !unfolded[t.id]}
  <div class="thread" class:resolved={t.resolved} data-note={t.id === 't1' ? 'thread' : undefined}>
    {#if folded}
      <button
        type="button"
        class="thread__folded"
        aria-expanded="false"
        onclick={() => (unfolded[t.id] = true)}
      >
        <span class="tick"><Icon name="check" size={12} /></span>
        <b>Resolved</b>
        <span class="thread__quote">{t.comments[0]?.author}: “{t.comments[0]?.text}”</span>
        <span class="muted">{t.comments.length} comments</span>
        <Icon name="chevron-down" size={14} />
      </button>
    {:else}
      <div class="thread__comments">
        {#each t.comments as c (c.id)}
          <Comment
            author={c.author}
            role={c.role}
            text={c.text}
            time={c.ago ? minutesAgo(c.ago) : REVIEW_NOW}
            now={REVIEW_NOW}
            size="sm"
          />
        {/each}
      </div>
      <div class="thread__reply">
        <Textarea
          bind:value={t.draft}
          aria-label="Reply to {t.comments[0]?.author}"
          placeholder="Reply…"
          rows={1}
          autogrow
          maxRows={6}
          onkeydown={submitOnMod(() => reply(t))}
        />
        <div class="thread__actions">
          {#if t.resolved}
            <Button variant="soft" size="sm" label="Reopen" onclick={() => resolve(t, false)} />
            <Button
              variant="soft"
              size="sm"
              icon="chevron-up"
              label="Fold"
              onclick={() => (unfolded[t.id] = false)}
            />
          {:else}
            <Button
              variant="soft"
              size="sm"
              icon="check"
              label="Resolve"
              onclick={() => resolve(t, true)}
            />
          {/if}
          <Button
            variant="soft"
            size="sm"
            icon="send"
            label="Reply"
            disabled={!t.draft.trim()}
            onclick={() => reply(t)}
          />
        </div>
      </div>
    {/if}
  </div>
{/snippet}

<Page fill gap="md" {header} {sidebar} {floating} sidebarWidth="18rem" width="full">
  {#if myNote}
    <div class="lede lede--note">
      <Comment
        author={ME}
        text={myNote}
        time={REVIEW_NOW}
        now={REVIEW_NOW}
        size="sm"
        role="Asked for changes"
      />
    </div>
  {:else}
    <p class="lede">
      <Avatar name={cr.author} size={22} color="auto" />
      <span><b>{cr.author}</b> opened this {cr.opened}. {cr.description}</span>
    </p>
  {/if}

  <Layer
    level="panel"
    padding="none"
    gap="none"
    as="section"
    aria-label="Changes"
    class="diff-panel"
  >
    <div class="diff" bind:this={scroller} {onscroll} data-note="diff">
      {#each files as f (f.path)}
        {@const folded = viewed[f.path]}
        <section class="dfile" id={fileId(f.path)} aria-label={f.path}>
          <header class="dfile__head">
            <button
              type="button"
              class="dfile__fold"
              aria-expanded={!folded}
              aria-label="{folded ? 'Show' : 'Hide'} {f.path}"
              onclick={() => setViewed(f, !folded)}
            >
              <span class="chev" class:shut={folded}><Icon name="chevron-down" size={14} /></span>
            </button>
            <span class="dfile__path"
              ><span class="file__dir">{split(f.path).dir}</span>{split(f.path).name}</span
            >
            {#if f.status === 'added'}<Badge tone="ok" size="sm" label="New" />{/if}
            <span class="dfile__count">
              <span class="plus">+{f.added}</span>
              {#if f.removed}<span class="minus">−{f.removed}</span>{/if}
            </span>
            <span class="dfile__viewed">
              <Checkbox
                label="Viewed"
                checked={!!viewed[f.path]}
                oncheckedchange={(on) => setViewed(f, on)}
              />
            </span>
          </header>

          {#if !folded}
            <div class="lines">
              {#each f.hunks as h, hi (hi)}
                <div class="hunk" aria-hidden="true">
                  <span class="hunk__range">
                    @@ {h.lines[0]?.old ?? 0},{h.lines.filter((l) => l.kind !== 'add').length}
                    → {h.lines[0]?.new ?? 0},{h.lines.filter((l) => l.kind !== 'del').length} @@
                  </span>
                  <span class="hunk__ctx">{h.header}</span>
                </div>
                {#each h.lines as line (line.key + line.kind)}
                  <div class="line line--{line.kind}" class:has-draft={opening === line.key}>
                    <span class="ln" aria-hidden="true">{line.old ?? ''}</span>
                    <span class="ln" aria-hidden="true">{line.new ?? ''}</span>
                    <span class="gut">
                      <button
                        type="button"
                        class="add"
                        aria-label="Comment on line {line.new ?? line.old}"
                        onclick={() => startThread(line)}
                      >
                        <Icon name="plus" size={12} />
                      </button>
                      <span class="sign" aria-hidden="true"
                        >{line.kind === 'add' ? '+' : line.kind === 'del' ? '−' : ''}</span
                      >
                    </span>
                    <code class="src"
                      ><span class="sr"
                        >{line.kind === 'add'
                          ? 'Added: '
                          : line.kind === 'del'
                            ? 'Removed: '
                            : ''}</span
                      >{@render code(line, f.path)}</code
                    >
                  </div>
                  {#each threadsAt(line.key) as t (t.id)}
                    <div class="aside">{@render thread(t)}</div>
                  {/each}
                  {#if opening === line.key}
                    <div class="aside">
                      <div class="thread thread--new">
                        <Textarea
                          id="draft-{line.key}"
                          bind:value={newDraft}
                          aria-label="Comment on line {line.new ?? line.old}"
                          placeholder="Comment on line {line.new ?? line.old}…"
                          rows={2}
                          autogrow
                          maxRows={8}
                          onkeydown={submitOnMod(addThread)}
                        />
                        <div class="thread__actions">
                          <span class="muted hint">⌘ Enter to send · Esc to cancel</span>
                          <Button
                            variant="soft"
                            size="sm"
                            label="Cancel"
                            onclick={() => (opening = null)}
                          />
                          <Button
                            variant="soft"
                            size="sm"
                            icon="send"
                            label="Comment"
                            disabled={!newDraft.trim()}
                            onclick={addThread}
                          />
                        </div>
                      </div>
                    </div>
                  {/if}
                {/each}
              {/each}
            </div>
          {/if}
        </section>
      {/each}
      <p class="end">
        {viewedCount === files.length
          ? 'You have seen every file.'
          : `${files.length - viewedCount} files left to view.`}
      </p>
    </div>
  </Layer>
</Page>

<DesignNotes title="Code review" {notes} corner="bottom-left" />

<style>
  .muted {
    color: var(--text-2);
    font-size: var(--fs-sm);
  }
  .sr {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }
  .plus {
    color: var(--ok);
  }
  .minus {
    color: var(--danger);
  }

  /* Header: one front layer, the title of the change and its state. */
  .bar {
    position: sticky;
    top: var(--sticky-gap);
    z-index: var(--z-header);
    padding: 0 var(--gutter);
    margin-top: var(--sticky-gap);
  }
  .logo {
    display: grid;
    flex: none;
    place-items: center;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background: var(--soft-bg);
    box-shadow: var(--soft-shadow);
    color: var(--accent-ink);
  }
  .title {
    display: grid;
    flex: 1;
    min-width: 0;
  }
  .title h1 {
    overflow: hidden;
    font-size: var(--fs-lg);
    font-weight: var(--fw-semibold);
    line-height: var(--leading-tight);
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .num {
    color: var(--text-3);
    font-weight: var(--fw-regular);
  }
  .title p {
    display: flex;
    align-items: center;
    gap: var(--space-1);
    min-width: 0;
    overflow: hidden;
    color: var(--text-2);
    font-size: var(--fs-xs);
    white-space: nowrap;
  }
  .title code {
    font-family: var(--font-mono);
  }
  .status {
    flex: none;
    border-radius: var(--radius-sm);
  }
  .stat {
    display: inline-flex;
    flex: none;
    gap: var(--space-2);
    padding-right: var(--space-2);
    font-family: var(--font-mono);
    font-size: var(--fs-sm);
    font-weight: var(--fw-semibold);
  }

  /* Sidebar: on the ground. */
  .side {
    display: flex;
    flex-direction: column;
    gap: var(--space-6);
    padding-bottom: var(--space-4);
  }
  .side__head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: var(--space-2);
    margin-bottom: var(--space-2);
  }
  .side__head h2 {
    font-size: var(--fs-md);
    font-weight: var(--fw-semibold);
  }
  .side__head .muted {
    padding: 0 4px;
    border-radius: var(--radius-sm);
    font-size: var(--fs-xs);
  }
  .files,
  .checks,
  .people {
    display: grid;
    gap: 2px;
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .file {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    width: 100%;
    min-height: var(--control-md);
    padding: 0 var(--space-2);
    border: 0;
    border-radius: var(--radius-md);
    background: none;
    color: var(--text);
    font: inherit;
    font-size: var(--fs-sm);
    text-align: left;
    cursor: pointer;
    transition: background var(--motion-quick) var(--ease-out);
  }
  .file:hover {
    background: var(--fill-subtle);
  }
  .file[aria-current='true'] {
    background: var(--layer-selected-bg);
    box-shadow: inset 0 0 0 1px var(--layer-selected-border);
  }
  .file:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
  }
  .file__icon {
    display: grid;
    flex: none;
    place-items: center;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--fill-muted);
    color: var(--text-2);
  }
  .file__icon.done {
    background: var(--ok);
    color: var(--on-ok);
  }
  .file__path {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    direction: rtl;
    text-align: left;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .file__dir {
    color: var(--text-3);
  }
  .file__name {
    font-weight: var(--fw-medium);
  }
  .file__talk {
    display: inline-flex;
    align-items: center;
    gap: 3px;
    color: var(--accent-ink);
    font-size: var(--fs-xs);
    font-weight: var(--fw-semibold);
  }
  .file__count {
    display: inline-flex;
    gap: var(--space-1);
    font-family: var(--font-mono);
    font-size: var(--fs-xs);
  }
  .check {
    display: grid;
    grid-template-columns: 20px minmax(0, 1fr) auto;
    align-items: center;
    gap: var(--space-1) var(--space-2);
    min-height: var(--control-md);
    padding: var(--space-1) var(--space-2);
    border-radius: var(--radius-md);
  }
  .check.bad {
    background: color-mix(in srgb, var(--danger) 8%, transparent);
  }
  .check__mark {
    display: grid;
    place-items: center;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    color: var(--accent-ink);
  }
  .check__mark.ok {
    background: var(--ok);
    color: var(--on-ok);
  }
  .check__mark.fail {
    background: var(--danger);
    color: var(--on-danger);
  }
  .check__name {
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
  }
  .check__time {
    padding: 0 4px;
    border-radius: var(--radius-sm);
    color: var(--text-3);
    font-family: var(--font-mono);
    font-size: var(--fs-xs);
  }
  .check__time.live {
    color: var(--accent-ink);
  }
  .check__why {
    grid-column: 2 / -1;
    color: var(--danger);
    font-size: var(--fs-xs);
    line-height: var(--leading-body);
  }
  .check__again {
    grid-column: 2 / -1;
    padding-bottom: var(--space-1);
  }
  .people li {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    min-height: var(--control-md);
    padding: 0 var(--space-2);
    font-size: var(--fs-sm);
  }
  .people__name {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .verdict {
    padding: 0 4px;
    border-radius: var(--radius-sm);
    color: var(--text-3);
    font-size: var(--fs-xs);
  }
  .verdict--approved {
    color: var(--ok);
    font-weight: var(--fw-semibold);
  }
  .verdict--changes {
    color: var(--warn);
    font-weight: var(--fw-semibold);
  }

  /* Ground line above the diff. */
  .lede {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    max-width: 62rem;
    color: var(--text-2);
    font-size: var(--fs-sm);
    line-height: var(--leading-body);
  }
  .lede--note {
    animation: grow var(--motion-base) var(--ease-out);
  }
  .lede b {
    color: var(--text);
    font-weight: var(--fw-semibold);
  }

  /* The one panel: the diff, scrolling on its own under the sticky file headers. */
  :global(.diff-panel) {
    overflow: clip;
  }
  .diff {
    position: relative;
    height: 100%;
    overflow: auto;
    overscroll-behavior: contain;
    padding-bottom: 6rem;
    /* Room for the sticky file header above and the floating review bar below. */
    scroll-padding: 3.5rem 0 5.5rem;
  }
  .dfile + .dfile {
    border-top: 1px solid var(--border);
  }
  .dfile__head {
    position: sticky;
    top: 0;
    z-index: 2;
    display: flex;
    align-items: center;
    gap: var(--space-3);
    min-height: 3rem;
    padding: 0 var(--space-4) 0 var(--space-2);
    border-bottom: 1px solid var(--border);
    background: var(--layer-panel-bg);
  }
  .dfile__fold {
    display: grid;
    place-items: center;
    width: 28px;
    height: 28px;
    border: 0;
    border-radius: 50%;
    background: none;
    color: var(--text-2);
    cursor: pointer;
  }
  .dfile__fold:hover {
    background: var(--fill-subtle);
  }
  .dfile__fold:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
  }
  .chev {
    display: inline-flex;
    transition: transform var(--motion-base) var(--ease-out);
  }
  .chev.shut {
    transform: rotate(-90deg);
  }
  .dfile__path {
    min-width: 0;
    overflow: hidden;
    font-family: var(--font-mono);
    font-size: var(--fs-sm);
    font-weight: var(--fw-semibold);
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .dfile__path .file__dir {
    font-weight: var(--fw-regular);
  }
  .dfile__count {
    display: inline-flex;
    gap: var(--space-2);
    margin-left: auto;
    font-family: var(--font-mono);
    font-size: var(--fs-xs);
    font-weight: var(--fw-semibold);
  }
  .dfile__viewed {
    flex: none;
    font-size: var(--fs-sm);
  }

  .lines {
    font-family: var(--font-mono);
    font-size: 0.8125rem;
    line-height: 1.65;
  }
  .hunk {
    display: flex;
    gap: var(--space-3);
    padding: var(--space-1) var(--space-4) var(--space-1) calc(7.5rem);
    background: color-mix(in srgb, var(--accent) 7%, transparent);
    color: var(--text-3);
    font-size: var(--fs-xs);
  }
  .hunk__range {
    color: var(--accent-ink);
    white-space: nowrap;
  }
  .hunk__ctx {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .line {
    --wash: transparent;
    --rim: transparent;
    position: relative;
    display: grid;
    grid-template-columns: 3rem 3rem 1.5rem minmax(0, 1fr);
    background: var(--wash);
  }
  .line--add {
    --wash: color-mix(in srgb, var(--ok) 8%, transparent);
    --rim: color-mix(in srgb, var(--ok) 14%, transparent);
  }
  .line--del {
    --wash: color-mix(in srgb, var(--danger) 7%, transparent);
    --rim: color-mix(in srgb, var(--danger) 14%, transparent);
  }
  .line:hover,
  .line.has-draft {
    --wash: color-mix(in srgb, var(--accent) 10%, transparent);
  }
  .line--add:hover {
    --wash: color-mix(in srgb, var(--ok) 17%, transparent);
  }
  .line--del:hover {
    --wash: color-mix(in srgb, var(--danger) 14%, transparent);
  }
  .ln {
    padding-right: var(--space-2);
    background: var(--rim);
    color: var(--text-3);
    font-size: var(--fs-xs);
    line-height: 1.95;
    text-align: right;
    user-select: none;
  }
  .gut {
    position: relative;
    display: grid;
    place-items: center;
    background: var(--rim);
  }
  .sign {
    color: var(--text-3);
    user-select: none;
  }
  .line--add .sign {
    color: var(--ok);
  }
  .line--del .sign {
    color: var(--danger);
  }
  /* The "+" grows out of the gutter of the line you point at. */
  .add {
    position: absolute;
    inset: 50% auto auto 50%;
    z-index: 1;
    display: grid;
    place-items: center;
    width: 20px;
    height: 20px;
    padding: 0;
    border: 0;
    border-radius: 50%;
    background: var(--accent);
    color: var(--on-accent);
    box-shadow: var(--shadow-primary);
    cursor: pointer;
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.6);
    transition:
      opacity var(--motion-quick) var(--ease-out),
      transform var(--motion-base) var(--ease-spring);
  }
  .line:hover .add,
  .add:focus-visible {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
  .add:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
  }
  .src {
    padding: 0 var(--space-4) 0 var(--space-1);
    color: var(--text);
    font: inherit;
    white-space: pre-wrap;
    overflow-wrap: anywhere;
    tab-size: 2;
  }
  .tk--com {
    color: var(--text-3);
    font-style: italic;
  }
  .tk--str {
    color: color-mix(in srgb, var(--color-orange) 72%, var(--text));
  }
  .tk--num,
  .tk--lit {
    color: color-mix(in srgb, var(--color-blue) 75%, var(--text));
  }
  .tk--kw {
    color: color-mix(in srgb, var(--color-purple) 78%, var(--text));
    font-weight: var(--fw-medium);
  }
  .tk--type {
    color: color-mix(in srgb, var(--color-teal) 70%, var(--text));
  }
  .tk--fn {
    color: color-mix(in srgb, var(--color-indigo) 70%, var(--text));
  }

  /* Conversations hang under their line, indented past the gutters: part of the code. */
  .aside {
    padding: var(--space-2) var(--space-4) var(--space-3) 7.5rem;
    border-block: 1px solid var(--border);
    background: var(--fill-subtle);
    font-family: var(--font-sans);
  }
  .thread {
    display: grid;
    gap: var(--space-3);
    max-width: 44rem;
    animation: grow var(--motion-base) var(--ease-out);
    transform-origin: top left;
  }
  @keyframes grow {
    from {
      opacity: 0;
      transform: translateY(-4px);
    }
  }
  .thread__comments {
    display: grid;
    gap: var(--space-3);
  }
  .thread__reply {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: end;
    gap: var(--space-2);
  }
  /* Textarea keeps a 6rem floor whatever its rows; a reply starts as a single line. */
  .thread :global(textarea) {
    min-height: 2.5rem;
    padding-block: 0.45rem;
    font-size: var(--fs-sm);
  }
  .thread--new :global(textarea) {
    min-height: 4rem;
  }
  .thread__actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-end;
    gap: var(--space-2);
  }
  .hint {
    margin-right: auto;
    font-size: var(--fs-xs);
  }
  .thread__folded {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    width: 100%;
    min-height: var(--control-sm);
    padding: 0;
    border: 0;
    background: none;
    color: var(--text-2);
    font: inherit;
    font-size: var(--fs-sm);
    text-align: left;
    cursor: pointer;
  }
  .thread__folded b {
    color: var(--text);
    font-weight: var(--fw-semibold);
  }
  .thread__folded:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
    border-radius: var(--radius-sm);
  }
  .tick {
    display: grid;
    place-items: center;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: var(--ok);
    color: var(--on-ok);
  }
  .thread__quote {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .end {
    padding: var(--space-6) var(--space-4) 0;
    color: var(--text-3);
    font-size: var(--fs-sm);
    text-align: center;
  }

  /* The review bar. */
  .summary {
    padding: 0 var(--space-2);
    border-radius: var(--radius-sm);
    color: var(--text-2);
    font-size: var(--fs-sm);
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }
  .approve {
    display: inline-flex;
  }
  .decided {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    padding: 0 var(--space-2);
    font-size: var(--fs-sm);
    font-weight: var(--fw-semibold);
  }
  .note-form {
    display: grid;
    gap: var(--space-3);
  }

  @media (max-width: 760px) {
    .thread__reply {
      grid-template-columns: minmax(0, 1fr);
    }
    .line {
      grid-template-columns: 2.25rem 2.25rem 1.25rem minmax(0, 1fr);
    }
    .hunk,
    .aside {
      padding-left: var(--space-4);
    }
    .stat,
    .title p {
      display: none;
    }
    .lede {
      display: none;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .thread {
      animation: none;
    }
    .add {
      transition: none;
    }
  }
</style>
