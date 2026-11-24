<script lang="ts">
  /**
   * The Mail app of the Desktop OS example: one floating window with a toolbar and search, a
   * source list of mailboxes, the message list, a reading pane (which turns into the composer
   * for a new message or a reply), an inspector and a status bar. Its layout follows the
   * window, not the screen: narrow the window and the inspector steps out, narrower still and
   * the list and the reader take turns (Storybook only, mock data).
   *
   * Deleting or archiving never asks first and never loses anything: the message's row stays
   * where it was as "Moved to Trash · Undo" until you move on.
   */
  import { tick } from 'svelte';
  import Avatar from '../patterns/atoms/Avatar.svelte';
  import Badge from '../patterns/atoms/Badge.svelte';
  import Button from '../patterns/atoms/Button.svelte';
  import Heading from '../patterns/atoms/Heading.svelte';
  import Icon from '../patterns/atoms/Icon.svelte';
  import Input from '../patterns/atoms/Input.svelte';
  import Tag from '../patterns/atoms/Tag.svelte';
  import Text from '../patterns/atoms/Text.svelte';
  import Textarea from '../patterns/atoms/Textarea.svelte';
  import { flashChanged } from '../patterns/atoms/changed';
  import Row from '../patterns/layout/Row.svelte';
  import Stack from '../patterns/layout/Stack.svelte';
  import EmptyState from '../patterns/molecules/EmptyState.svelte';
  import ContextMenu from '../patterns/desktop/ContextMenu.svelte';
  import Inspector from '../patterns/desktop/Inspector.svelte';
  import InspectorRow from '../patterns/desktop/InspectorRow.svelte';
  import InspectorSection from '../patterns/desktop/InspectorSection.svelte';
  import SourceList from '../patterns/desktop/SourceList.svelte';
  import StatusBar from '../patterns/desktop/StatusBar.svelte';
  import Toolbar from '../patterns/desktop/Toolbar.svelte';
  import Window from '../patterns/desktop/Window.svelte';
  import type { ContextMenuItem } from '../patterns/desktop/shared.svelte';
  import { mailboxes, type Mail } from './mock-desktop';

  interface Props {
    /** All messages; the page owns them so mail can arrive in the background. */
    mails: Mail[];
    selected?: string | undefined;
    x?: number;
    y?: number;
    width?: number | undefined;
    height?: number | undefined;
    minimized?: boolean | undefined;
    maximized?: boolean | undefined;
    onclose?: (() => void) | undefined;
    /** Saves an attachment to Downloads; resolves when it is there. */
    onsave?: ((name: string, size: string) => Promise<void> | void) | undefined;
    /** Shows a saved attachment in Files, opening out of `from`. */
    onreveal?: ((name: string, from: Element) => void) | undefined;
  }

  let {
    mails = $bindable(),
    selected = $bindable(),
    x = $bindable(0),
    y = $bindable(0),
    width = $bindable(),
    height = $bindable(),
    minimized = $bindable(false),
    maximized = $bindable(false),
    onclose,
    onsave,
    onreveal,
  }: Props = $props();

  type Message = Mail;
  const count = (n: number, word: string) => `${n} ${word}${n === 1 ? '' : 's'}`;
  let box = $state('inbox');
  let search = $state('');
  let inspector = $state(true);
  let reading = $state(false);
  let list = $state<HTMLElement>();

  const LABEL_COLORS: Record<string, string> = { work: 'blue', family: 'pink', travel: 'teal' };

  // ── Soft delete: the row stays in place as a tombstone with Undo ──
  let tomb = $state<{ id: string; was: string; to: string } | undefined>();
  const MOVED: Record<string, { text: string; icon: 'trash' | 'bookmark' }> = {
    trash: { text: 'Moved to Trash', icon: 'trash' },
    archive: { text: 'Archived', icon: 'bookmark' },
  };

  const inBox = (m: Message) =>
    box === 'flagged'
      ? m.flagged && m.mailbox !== 'trash'
      : box === 'attachments'
        ? m.attachments.length > 0 && m.mailbox !== 'trash'
        : box === 'today'
          ? m.date === 'Today' && m.mailbox !== 'trash'
          : m.mailbox === box || (m.labels.includes(box) && m.mailbox !== 'trash');

  const shown = $derived(
    mails.filter(
      (m) =>
        (inBox(m) || m.id === tomb?.id) &&
        `${m.from} ${m.subject} ${m.preview}`.toLowerCase().includes(search.trim().toLowerCase()),
    ),
  );
  const live = $derived(shown.filter((m) => m.id !== tomb?.id));
  const mail = $derived(mails.find((m) => m.id === selected && m.id !== tomb?.id));
  const unread = $derived(mails.filter((m) => m.mailbox === 'inbox' && m.unread).length);
  const sections = $derived(
    mailboxes.map((s) => ({
      ...s,
      items: s.items.map((i) =>
        i.id === 'inbox'
          ? { ...i, count: unread || undefined }
          : i.id === 'flagged'
            ? { ...i, count: mails.filter((m) => m.flagged && m.mailbox !== 'trash').length }
            : i.id === 'drafts'
              ? { ...i, count: mails.filter((m) => m.mailbox === 'drafts').length || undefined }
              : i,
      ),
    })),
  );
  const boxLabel = $derived(
    mailboxes.flatMap((s) => s.items).find((i) => i.id === box)?.label ?? 'Mail',
  );

  /** A row in the list (to glow it, or to focus it). */
  const rowOf = (id: string) => list?.querySelector<HTMLElement>(`[data-mail="${CSS.escape(id)}"]`);

  function open(id: string) {
    selected = id;
    reading = true;
    draft = undefined;
    update(id, { unread: false });
  }
  function update(id: string | undefined, patch: Partial<Message>) {
    mails = mails.map((m) => (m.id === id ? { ...m, ...patch } : m));
  }
  function move(id: string | undefined, mailbox: string) {
    const m = mails.find((x) => x.id === id);
    if (!m || m.mailbox === mailbox) return;
    const at = live.findIndex((x) => x.id === id);
    const rest = live.filter((x) => x.id !== id);
    update(id, { mailbox });
    tomb = { id: m.id, was: m.mailbox, to: mailbox };
    // Carry on with the next message, where the eye already is.
    const next = rest[Math.min(Math.max(at, 0), rest.length - 1)];
    selected = next?.id;
    if (next?.unread) update(next.id, { unread: false });
    reading = false;
  }
  async function undo() {
    if (!tomb) return;
    const { id, was } = tomb;
    update(id, { mailbox: was });
    tomb = undefined;
    selected = id;
    await tick();
    const row = rowOf(id);
    row?.focus();
    if (row) flashChanged(row);
  }
  // Leaving the mailbox (or searching) settles the move: the tombstone goes.
  $effect(() => {
    void box;
    void search;
    tomb = undefined;
  });

  function onListKeydown(event: KeyboardEvent) {
    if (event.key === 'Delete' || event.key === 'Backspace') {
      event.preventDefault();
      move(selected, 'trash');
      return;
    }
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
    event.preventDefault();
    const at = live.findIndex((m) => m.id === selected);
    const next =
      live[Math.max(0, Math.min(live.length - 1, at + (event.key === 'ArrowDown' ? 1 : -1)))];
    if (!next) return;
    open(next.id);
    reading = false;
    rowOf(next.id)?.focus();
  }

  function rowMenu(event: MouseEvent | KeyboardEvent): ContextMenuItem[] {
    const id = (event.target as HTMLElement).closest<HTMLElement>('[data-mail]')?.dataset['mail'];
    const m = mails.find((x) => x.id === id);
    if (!m || m.id === tomb?.id) return [];
    selected = m.id;
    return [
      { label: 'Reply', icon: 'arrow-left', shortcut: '⌘R', onselect: () => reply(m) },
      { label: 'Forward', icon: 'arrow-right', shortcut: '⇧⌘F', onselect: () => forward(m) },
      { separator: true },
      {
        label: m.unread ? 'Mark as read' : 'Mark as unread',
        icon: 'eye',
        onselect: () => update(m.id, { unread: !m.unread }),
      },
      {
        label: m.flagged ? 'Remove flag' : 'Flag',
        icon: 'flag',
        onselect: () => update(m.id, { flagged: !m.flagged }),
      },
      { label: 'Archive', icon: 'bookmark', onselect: () => move(m.id, 'archive') },
      { separator: true },
      {
        label: 'Delete',
        icon: 'trash',
        danger: true,
        shortcut: '⌫',
        onselect: () => move(m.id, 'trash'),
      },
    ];
  }

  // ── Writing: the reading pane becomes the composer, so a reply sits where the message was ──
  let draft = $state<{ to: string; subject: string; body: string; replyTo?: string }>();
  let sending = $state(false);
  /** One line under the message you answered: the answer appears at the question. */
  let sent = $state<{ at: string | undefined; text: string }>();

  function compose(to = '', subject = '', body = '', replyTo?: string) {
    draft = { to, subject, body, ...(replyTo ? { replyTo } : {}) };
    reading = true;
    sent = undefined;
  }
  const reply = (m: Message) =>
    compose(m.email, m.subject.startsWith('Re:') ? m.subject : `Re: ${m.subject}`, '', m.id);
  const forward = (m: Message) =>
    compose('', `Fwd: ${m.subject}`, `\n\n— Forwarded from ${m.from} —\n${m.body}`, m.id);

  async function send() {
    if (!draft) return;
    sending = true;
    await new Promise((r) => setTimeout(r, 700));
    const d = draft;
    mails = [
      ...mails,
      {
        id: `s${Date.now()}`,
        from: 'You',
        email: d.to,
        subject: d.subject || '(No subject)',
        preview: d.body.slice(0, 80),
        body: d.body,
        date: 'Today',
        time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
        unread: false,
        flagged: false,
        mailbox: 'sent',
        labels: [],
        attachments: [],
      },
    ];
    sending = false;
    draft = undefined;
    sent = {
      at: d.replyTo,
      text: d.replyTo ? `Sent to ${d.to || 'them'}. It is in Sent.` : `Sent to ${d.to}.`,
    };
    if (d.replyTo) selected = d.replyTo;
  }

  // ── Attachments: the button itself says "saving…", then where the file went ──
  let saved = $state<Record<string, 'busy' | 'done'>>({});
  async function save(name: string, size: string, button: Element) {
    if (saved[name] === 'done') return onreveal?.(name, button);
    saved[name] = 'busy';
    await onsave?.(name, size);
    saved[name] = 'done';
  }
</script>

<Window
  id="mail"
  app="Mail"
  icon="mail"
  color="cyan"
  title={draft ? draft.subject || 'New message' : boxLabel}
  subtitle={`${count(live.length, 'message')}${box === 'inbox' && unread ? `, ${unread} unread` : ''}`}
  bind:x
  bind:y
  bind:width
  bind:height
  bind:minimized
  bind:maximized
  padding="none"
  sidebarWidth="12rem"
  minWidth={420}
  {onclose}
>
  {#snippet sidebar()}
    <SourceList
      {sections}
      bind:value={box}
      label="Mailboxes"
      onselect={() => ((reading = false), (draft = undefined))}
    />
  {/snippet}

  {#snippet toolbar()}
    <Toolbar
      variant="plain"
      bind:search
      searchPlaceholder="Search mail"
      items={[
        { icon: 'edit', label: 'New message', primary: true, onclick: () => compose() },
        { separator: true },
        {
          icon: 'bookmark',
          label: 'Archive',
          disabled: !mail || mail.mailbox === 'archive',
          onclick: () => move(selected, 'archive'),
        },
        {
          icon: 'trash',
          label: 'Delete',
          disabled: !mail || mail.mailbox === 'trash',
          onclick: () => move(selected, 'trash'),
        },
        {
          icon: 'flag',
          label: mail?.flagged ? 'Remove flag' : 'Flag',
          disabled: !mail,
          active: mail?.flagged ?? false,
          onclick: () => update(selected, { flagged: !mail?.flagged }),
        },
        { spacer: true },
        {
          icon: 'sidebar',
          label: inspector ? 'Hide inspector' : 'Show inspector',
          active: inspector,
          onclick: () => (inspector = !inspector),
        },
      ]}
    />
  {/snippet}

  <div class="shell">
    <div class="panes" class:reading class:with-inspector={inspector && !!mail && !draft}>
      <ContextMenu onopen={rowMenu} label="Message actions">
        <ul class="messages" aria-label="Messages" bind:this={list} data-note="mail-list">
          {#each shown as m (m.id)}
            {#if m.id === tomb?.id}
              {@const moved = MOVED[tomb.to] ?? MOVED['trash']!}
              <li class="tomb">
                <Icon name={moved.icon} size={14} />
                <span class="tomb-text">
                  <strong>{moved.text}</strong>
                  <span>{m.subject}</span>
                </span>
                <Button size="xs" shape="pill" icon="undo" label="Undo" onclick={undo} />
              </li>
            {:else}
              <li>
                <button
                  type="button"
                  class="message"
                  class:unread={m.unread}
                  data-mail={m.id}
                  aria-current={selected === m.id ? 'true' : undefined}
                  tabindex={selected === m.id || (!mail && m === live[0]) ? 0 : -1}
                  onclick={() => open(m.id)}
                  onkeydown={onListKeydown}
                >
                  <span class="dot" aria-label={m.unread ? 'Unread' : undefined}></span>
                  <Stack gap="none" align="stretch" grow>
                    <Row gap="sm" wrap={false}>
                      <Text weight={m.unread ? 'bold' : 'semibold'} truncate>{m.from}</Text>
                      {#if m.flagged}<Icon name="flag" size={12} label="Flagged" />{/if}
                      <Text size="xs" tone="subtle" numeric class="when"
                        >{m.date === 'Today' ? m.time : m.date}</Text
                      >
                    </Row>
                    <Text size="sm" weight="medium" truncate>{m.subject}</Text>
                    <Text size="sm" tone="muted" truncate={2}>{m.preview}</Text>
                  </Stack>
                </button>
              </li>
            {/if}
          {:else}
            <li class="none">
              <EmptyState
                icon="inbox"
                title={search ? 'No matches' : 'All clear'}
                message={search ? 'Try fewer words.' : 'Nothing waiting here. Enjoy the quiet.'}
              />
            </li>
          {/each}
        </ul>
      </ContextMenu>

      <article class="reader" aria-label={draft ? 'New message' : 'Message'}>
        {#if draft}
          <form
            class="compose"
            onsubmit={(e) => {
              e.preventDefault();
              void send();
            }}
          >
            <Row class="back" gap="sm">
              <Button
                icon="chevron-left"
                label={boxLabel}
                size="sm"
                onclick={() => ((draft = undefined), (reading = false))}
              />
            </Row>
            <Input bind:value={draft.to} aria-label="To" placeholder="To" type="email" required />
            <Input bind:value={draft.subject} aria-label="Subject" placeholder="Subject" />
            <Textarea
              bind:value={draft.body}
              aria-label="Message"
              placeholder="Write something nice…"
              rows={8}
              autogrow
            />
            <Row gap="sm">
              <Button
                type="submit"
                variant="primary"
                icon="send"
                label="Send"
                busy={sending}
                busyLabel="Sending…"
              />
              <Button label="Discard" onclick={() => (draft = undefined)} />
            </Row>
          </form>
        {:else if mail}
          <Stack gap="lg" padding="lg">
            <Row class="back" gap="sm">
              <Button
                icon="chevron-left"
                label={boxLabel}
                size="sm"
                onclick={() => (reading = false)}
              />
            </Row>
            <Heading level={2} size="2xl">{mail.subject}</Heading>
            <Row gap="md" wrap={false}>
              <Avatar name={mail.from} size={40} />
              <Stack gap="none" align="stretch" grow>
                <Text weight="semibold">{mail.from}</Text>
                <Text size="sm" tone="muted" truncate>{mail.email}</Text>
              </Stack>
              <Text size="sm" tone="subtle" numeric class="stamp">{mail.date}, {mail.time}</Text>
            </Row>
            {#if mail.labels.length}
              <Row gap="xs">
                {#each mail.labels as l (l)}<Tag label={l} color={LABEL_COLORS[l]} />{/each}
              </Row>
            {/if}
            <Text as="p" class="body">{mail.body}</Text>
            {#if mail.attachments.length}
              <Row gap="sm">
                {#each mail.attachments as a (a.name)}
                  <Button
                    icon={saved[a.name] === 'done' ? 'folder' : 'download'}
                    label={saved[a.name] === 'done'
                      ? `${a.name} · Show in Downloads`
                      : `${a.name} · ${a.size}`}
                    size="sm"
                    busy={saved[a.name] === 'busy'}
                    busyLabel="Saving {a.name}…"
                    onclick={(e) => save(a.name, a.size, e.currentTarget)}
                  />
                {/each}
              </Row>
            {/if}
            {#if mail.mailbox !== 'sent'}
              <Row gap="sm">
                <Button
                  variant="primary"
                  icon="arrow-left"
                  label="Reply"
                  onclick={() => reply(mail)}
                />
                <Button icon="arrow-right" label="Forward" onclick={() => forward(mail)} />
              </Row>
            {/if}
            {#if sent && sent.at === mail.id}
              <p class="sent" role="status">
                <Icon name="check-circle" size={16} />
                {sent.text}
              </p>
            {/if}
          </Stack>
        {:else}
          <EmptyState
            icon="mail"
            title={sent ? sent.text : 'No message selected'}
            message="Pick a message on the left."
          />
        {/if}
      </article>

      {#if inspector && mail && !draft}
        <div class="inspector">
          <Inspector title={mail.from} subtitle={mail.email}>
            {#snippet preview()}<Avatar name={mail.from} size={64} />{/snippet}
            {#snippet actions()}
              <Button icon="mail" label="Write" size="sm" onclick={() => compose(mail.email)} />
            {/snippet}
            <InspectorSection title="Message">
              <InspectorRow label="Received" value="{mail.date}, {mail.time}" />
              <InspectorRow label="Mailbox" value={mail.mailbox} />
              <InspectorRow label="Status">
                <Row gap="xs">
                  <Badge
                    tone={mail.unread ? 'info' : 'neutral'}
                    label={mail.unread ? 'Unread' : 'Read'}
                    size="sm"
                  />
                  {#if mail.flagged}<Badge tone="draft" label="Flagged" size="sm" />{/if}
                </Row>
              </InspectorRow>
            </InspectorSection>
            <InspectorSection title="Attachments" collapsible>
              {#each mail.attachments as a (a.name)}
                <InspectorRow label={a.size} value={a.name} />
              {:else}
                <InspectorRow label="None" value="—" />
              {/each}
            </InspectorSection>
          </Inspector>
        </div>
      {/if}
    </div>
  </div>

  {#snippet footer()}
    <StatusBar
      items={[
        { label: count(live.length, 'message') },
        { label: `${unread} unread`, icon: 'inbox' },
      ]}
      trailing={[{ label: 'Synced just now', dot: true, tone: 'ok' }]}
    />
  {/snippet}
</Window>

<style>
  /* The layout answers to the window's width, not the screen's: windows resize. */
  .shell {
    height: 100%;
    container-type: inline-size;
  }
  .panes {
    display: grid;
    grid-template-columns: minmax(15rem, 20rem) minmax(0, 1fr);
    height: 100%;
    min-height: 0;
  }
  .panes.with-inspector {
    grid-template-columns: minmax(15rem, 20rem) minmax(0, 1fr) 15rem;
  }
  .messages {
    margin: 0;
    padding: var(--space-2);
    overflow-y: auto;
    list-style: none;
    border-right: 1px solid var(--border-strong);
  }
  .message {
    display: flex;
    gap: var(--space-2);
    width: 100%;
    padding: var(--space-3) var(--space-3) var(--space-3) var(--space-2);
    border: 1px solid transparent;
    border-radius: var(--radius-lg);
    background: none;
    color: inherit;
    font: inherit;
    text-align: left;
    cursor: pointer;
  }
  .message:hover:not([aria-current]) {
    background: var(--fill-hover);
  }
  .message[aria-current='true'] {
    background: var(--layer-selected-bg);
    border-color: var(--layer-selected-border);
    box-shadow: var(--layer-selected-shadow);
  }
  .message:focus-visible {
    outline: var(--focus-ring);
    outline-offset: -1px;
  }
  .message :global(.when) {
    margin-left: auto;
  }
  .message :global(.icon) {
    color: var(--color-orange);
  }
  .dot {
    flex-shrink: 0;
    width: 8px;
    height: 8px;
    margin-top: 6px;
    border-radius: 50%;
  }
  .unread .dot {
    background: var(--accent);
    box-shadow: 0 0 0 3px var(--accent-soft);
  }
  /* The message's place, kept: what happened to it and the way back. */
  .tomb {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    min-height: 3.5rem;
    margin: 2px 0;
    padding: var(--space-2) var(--space-2) var(--space-2) var(--space-3);
    border: 1px dashed var(--input-border);
    border-radius: var(--radius-lg);
    color: var(--text-2);
    font-size: var(--fs-sm);
    animation: bb-rise var(--motion-base) var(--ease-out);
  }
  .tomb-text {
    display: grid;
    flex: 1;
    min-width: 0;
  }
  .tomb-text span {
    overflow: hidden;
    color: var(--text-3);
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .none {
    padding: var(--space-8) 0;
  }
  .reader {
    min-width: 0;
    overflow-y: auto;
  }
  .reader :global(.body) {
    margin: 0;
    white-space: pre-wrap;
    line-height: 1.6;
  }
  .reader :global(.back) {
    display: none;
  }
  .reader :global(.stamp) {
    flex-shrink: 0;
    white-space: nowrap;
  }
  .compose {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    padding: var(--space-5);
    animation: bb-rise var(--motion-base) var(--ease-out);
  }
  .sent {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    margin: 0;
    color: var(--text-2);
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
    animation: bb-rise var(--motion-base) var(--ease-out);
  }
  .sent :global(.icon) {
    color: var(--ok);
  }
  .inspector {
    overflow-y: auto;
    border-left: 1px solid var(--border-strong);
    background: var(--fill-subtle);
  }
  @container (max-width: 52rem) {
    .panes.with-inspector {
      grid-template-columns: minmax(15rem, 20rem) minmax(0, 1fr);
    }
    .inspector {
      display: none;
    }
  }
  @container (max-width: 34rem) {
    .panes,
    .panes.with-inspector {
      grid-template-columns: minmax(0, 1fr);
    }
    .messages {
      border-right: 0;
    }
    .reading .messages,
    .panes:not(.reading) .reader {
      display: none;
    }
    .reader :global(.back) {
      display: flex;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .tomb,
    .compose,
    .sent {
      animation: none;
    }
  }
</style>
