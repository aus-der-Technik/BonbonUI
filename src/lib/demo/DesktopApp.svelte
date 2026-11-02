<script lang="ts">
  /**
   * Example page: a desktop-style mail app in one window — toolbar with search, a source-list
   * sidebar of mailboxes, the message list, a reading pane, an inspector and a status bar.
   * On narrow screens the list and the reader take turns (Storybook only, mock data).
   */
  import Avatar from '../patterns/atoms/Avatar.svelte';
  import Badge from '../patterns/atoms/Badge.svelte';
  import Button from '../patterns/atoms/Button.svelte';
  import Heading from '../patterns/atoms/Heading.svelte';
  import Icon from '../patterns/atoms/Icon.svelte';
  import Tag from '../patterns/atoms/Tag.svelte';
  import Text from '../patterns/atoms/Text.svelte';
  import Row from '../patterns/layout/Row.svelte';
  import Stack from '../patterns/layout/Stack.svelte';
  import EmptyState from '../patterns/molecules/EmptyState.svelte';
  import Application from '../patterns/templates/Application.svelte';
  import ContextMenu from '../patterns/desktop/ContextMenu.svelte';
  import Inspector from '../patterns/desktop/Inspector.svelte';
  import InspectorRow from '../patterns/desktop/InspectorRow.svelte';
  import InspectorSection from '../patterns/desktop/InspectorSection.svelte';
  import SourceList from '../patterns/desktop/SourceList.svelte';
  import StatusBar from '../patterns/desktop/StatusBar.svelte';
  import Toolbar from '../patterns/desktop/Toolbar.svelte';
  import Window from '../patterns/desktop/Window.svelte';
  import type { ContextMenuItem } from '../patterns/desktop/shared.svelte';
  import { mailboxes, mails } from './mock-desktop';

  let box = $state('inbox');
  let list = $state(mails.map((m) => ({ ...m })));
  let selected = $state<string | undefined>('m1');
  let search = $state('');
  let inspector = $state(true);
  let reading = $state(false);

  const LABEL_COLORS: Record<string, string> = { work: 'blue', family: 'pink', travel: 'teal' };

  const inBox = (m: (typeof list)[number]) =>
    box === 'flagged'
      ? m.flagged
      : box === 'attachments'
        ? m.attachments.length > 0
        : box === 'today'
          ? m.date === 'Today'
          : m.mailbox === box || m.labels.includes(box);

  const shown = $derived(
    list.filter(
      (m) =>
        inBox(m) &&
        `${m.from} ${m.subject} ${m.preview}`.toLowerCase().includes(search.trim().toLowerCase()),
    ),
  );
  const mail = $derived(list.find((m) => m.id === selected));
  const unread = $derived(list.filter((m) => m.mailbox === 'inbox' && m.unread).length);
  const sections = $derived(
    mailboxes.map((s) => ({
      ...s,
      items: s.items.map((i) => (i.id === 'inbox' ? { ...i, count: unread || undefined } : i)),
    })),
  );
  const boxLabel = $derived(
    mailboxes.flatMap((s) => s.items).find((i) => i.id === box)?.label ?? 'Mail',
  );

  function open(id: string) {
    selected = id;
    reading = true;
    list = list.map((m) => (m.id === id ? { ...m, unread: false } : m));
  }
  function update(id: string | undefined, patch: Partial<(typeof list)[number]>) {
    list = list.map((m) => (m.id === id ? { ...m, ...patch } : m));
  }
  function move(id: string | undefined, mailbox: string) {
    update(id, { mailbox });
    const next = shown.find((m) => m.id !== id);
    selected = next?.id;
    reading = false;
  }

  function onListKeydown(event: KeyboardEvent) {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
    event.preventDefault();
    const at = shown.findIndex((m) => m.id === selected);
    const next =
      shown[Math.max(0, Math.min(shown.length - 1, at + (event.key === 'ArrowDown' ? 1 : -1)))];
    if (!next) return;
    open(next.id);
    reading = false;
    document.getElementById(`mail-${next.id}`)?.focus();
  }

  function rowMenu(event: MouseEvent | KeyboardEvent): ContextMenuItem[] {
    const id = (event.target as HTMLElement).closest<HTMLElement>('[data-mail]')?.dataset['mail'];
    const m = list.find((x) => x.id === id);
    if (!m) return [];
    selected = m.id;
    return [
      { label: 'Reply', icon: 'arrow-left', shortcut: '⌘R' },
      { label: 'Forward', icon: 'arrow-right', shortcut: '⇧⌘F' },
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
      { label: 'Delete', icon: 'trash', danger: true, onselect: () => move(m.id, 'trash') },
    ];
  }
</script>

<Application>
  <div class="frame">
    <Window
      static
      app="Mail"
      icon="mail"
      color="cyan"
      title={boxLabel}
      subtitle={`${shown.length} messages${box === 'inbox' && unread ? `, ${unread} unread` : ''}`}
      class="mail-window"
      padding="none"
      sidebarWidth="14rem"
      onclose={() => {}}
      onminimize={() => {}}
      onzoom={() => (inspector = !inspector)}
    >
      {#snippet sidebar()}
        <Stack gap="md">
          <SourceList
            {sections}
            bind:value={box}
            label="Mailboxes"
            onselect={() => (reading = false)}
          />
        </Stack>
      {/snippet}

      {#snippet toolbar()}
        <Toolbar
          variant="plain"
          bind:search
          searchPlaceholder="Search mail"
          items={[
            { icon: 'edit', label: 'New message' },
            { separator: true },
            {
              icon: 'bookmark',
              label: 'Archive',
              disabled: !mail,
              onclick: () => move(selected, 'archive'),
            },
            {
              icon: 'trash',
              label: 'Delete',
              disabled: !mail,
              onclick: () => move(selected, 'trash'),
            },
            {
              icon: 'flag',
              label: 'Flag',
              disabled: !mail,
              active: mail?.flagged ?? false,
              onclick: () => update(selected, { flagged: !mail?.flagged }),
            },
            { spacer: true },
            {
              icon: 'sidebar',
              label: 'Inspector',
              active: inspector,
              onclick: () => (inspector = !inspector),
            },
          ]}
        />
      {/snippet}

      <div class="panes" class:reading class:with-inspector={inspector}>
        <ContextMenu onopen={rowMenu} label="Message actions">
          <ul class="messages" aria-label="Messages">
            {#each shown as m (m.id)}
              <li>
                <button
                  type="button"
                  id="mail-{m.id}"
                  class="message"
                  class:unread={m.unread}
                  data-mail={m.id}
                  aria-current={selected === m.id ? 'true' : undefined}
                  tabindex={selected === m.id || (!selected && m === shown[0]) ? 0 : -1}
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
            {:else}
              <li class="none">
                <EmptyState icon="inbox" title={search ? 'No matches' : 'No messages'} />
              </li>
            {/each}
          </ul>
        </ContextMenu>

        <article class="reader" aria-label="Message">
          {#if mail}
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
                  <Text size="sm" tone="muted">{mail.email}</Text>
                </Stack>
                <Text size="sm" tone="subtle" numeric>{mail.date}, {mail.time}</Text>
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
                    <Button icon="download" label="{a.name} · {a.size}" size="sm" />
                  {/each}
                </Row>
              {/if}
              <Row gap="sm">
                <Button variant="primary" icon="arrow-left" label="Reply" />
                <Button icon="arrow-right" label="Forward" />
              </Row>
            </Stack>
          {:else}
            <EmptyState
              icon="mail"
              title="No message selected"
              message="Pick a message on the left."
            />
          {/if}
        </article>

        {#if inspector && mail}
          <div class="inspector">
            <Inspector title={mail.from} subtitle={mail.email}>
              {#snippet preview()}<Avatar name={mail.from} size={64} />{/snippet}
              {#snippet actions()}
                <Button icon="mail" label="Message" size="sm" />
                <Button icon="phone" label="Call" size="sm" />
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

      {#snippet footer()}
        <StatusBar
          items={[
            { label: `${shown.length} messages` },
            { label: `${unread} unread`, icon: 'inbox' },
          ]}
          trailing={[{ label: 'Synced just now', dot: true, tone: 'ok' }]}
        />
      {/snippet}
    </Window>
  </div>
</Application>

<style>
  .frame {
    height: 100dvh;
    padding: var(--space-4);
  }
  .frame :global(.window.mail-window) {
    height: 100%;
  }
  .panes {
    display: grid;
    grid-template-columns: minmax(16rem, 22rem) minmax(0, 1fr);
    height: 100%;
    min-height: 0;
  }
  .panes.with-inspector {
    grid-template-columns: minmax(16rem, 22rem) minmax(0, 1fr) 16rem;
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
  .inspector {
    overflow-y: auto;
    border-left: 1px solid var(--border-strong);
    background: var(--fill-subtle);
  }
  @media (max-width: 1100px) {
    .panes.with-inspector {
      grid-template-columns: minmax(16rem, 22rem) minmax(0, 1fr);
    }
    .inspector {
      display: none;
    }
  }
  @media (max-width: 720px) {
    .frame {
      padding: 0;
    }
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
</style>
