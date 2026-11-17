<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import type { Component, ComponentProps } from 'svelte';
  import ContextPanel from './ContextPanel.svelte';
  import Button from '../atoms/Button.svelte';
  import Icon from '../atoms/Icon.svelte';
  import Input from '../atoms/Input.svelte';
  import Text from '../atoms/Text.svelte';
  import Field from '../molecules/Field.svelte';
  import CommentThread, { type ThreadComment } from '../organisms/CommentThread.svelte';
  import Stack from '../layout/Stack.svelte';
  import Row from '../layout/Row.svelte';
  import { NOW, secondThread, threadComments } from '../../demo/mock-collab';

  const { Story } = defineMeta({
    title: 'Organisms/Desktop & OS/ContextPanel',
    // A generic component with methods: its type is narrowed to the props for the docs table.
    component: ContextPanel as Component<ComponentProps<typeof ContextPanel<unknown>>>,
    tags: ['autodocs'],
  });

  interface Doc {
    id: string;
    name: string;
    kind: string;
    comments: ThreadComment[];
  }
</script>

<script lang="ts">
  let docs = $state<Doc[]>([
    { id: 'd1', name: 'Quarterly report', kind: 'Document', comments: [...threadComments] },
    { id: 'd2', name: 'Launch budget', kind: 'Spreadsheet', comments: [...secondThread] },
    { id: 'd3', name: 'Team offsite photos', kind: 'Pictures', comments: [] },
  ]);
  let contextPanel = $state<ContextPanel<Doc>>();

  /** The row under the pointer, or nothing: the browser's own menu shows on the heading. */
  function rowAt(event: MouseEvent | KeyboardEvent): Doc | undefined {
    const id = (event.target as Element).closest<HTMLElement>('[data-doc]')?.dataset['doc'];
    return docs.find((doc) => doc.id === id);
  }

  function rename(event: SubmitEvent, doc: Doc, close: () => void) {
    event.preventDefault();
    const name = String(new FormData(event.currentTarget as HTMLFormElement).get('name') ?? '');
    if (name.trim()) doc.name = name.trim();
    close();
  }

  async function reply(doc: Doc, text: string) {
    await new Promise((resolve) => setTimeout(resolve, 400));
    doc.comments = [
      ...doc.comments,
      { id: crypto.randomUUID(), author: 'alex.morgan@example.com', time: new Date(), text },
    ];
  }
</script>

<!-- Right-click a row (or focus its comment key and press Shift+F10): the panel opens at the pointer with a
     rename field and the row's comments. The speech-bubble key on a row opens the same panel
     under itself (`openFor`). A right-click on the heading returns nothing from `onopen`, so the
     browser's own menu shows there.

     Why a panel instead of a menu with "Rename…" and "Comments…"? The edit happens where you
     pointed — no dialog in the middle of the screen, no hunt for the row afterwards. Replies,
     reactions and the reply box's growth keep it inside the window; Escape or a click outside
     puts it away and focus goes back to where it was. -->
<Story name="Rename and comment" asChild>
  <ContextPanel bind:this={contextPanel} label="Document" width="340px" onopen={rowAt}>
    {#snippet panel(doc, close)}
      <Stack gap="md">
        <Stack as="form" gap="sm" onsubmit={(event: SubmitEvent) => rename(event, doc, close)}>
          <Field label="Name">
            {#snippet children({ id })}
              <Input {id} name="name" value={doc.name} data-autofocus />
            {/snippet}
          </Field>
          <Row justify="end" gap="sm">
            <Button size="sm" variant="ghost" label="Cancel" onclick={close} />
            <Button size="sm" variant="primary" type="submit" label="Rename" />
          </Row>
        </Stack>
        <CommentThread
          comments={doc.comments}
          now={NOW}
          startPlaceholder="Start a thread about this document"
          onreply={(text) => reply(doc, text)}
        />
      </Stack>
    {/snippet}

    <Stack gap="sm">
      <Text tone="muted">Your documents — right-click one.</Text>
      {#each docs as doc (doc.id)}
        <div class="row" data-doc={doc.id}>
          <Icon name="file-text" />
          <span class="name">{doc.name}</span>
          <Text tone="muted" size="sm">{doc.kind}</Text>
          <Button
            size="sm"
            variant="ghost"
            icon="chat"
            iconOnly
            label="Comments on {doc.name} ({doc.comments.length})"
            onclick={(event: MouseEvent) =>
              contextPanel?.openFor(event.currentTarget as HTMLElement, doc)}
          />
        </div>
      {/each}
    </Stack>
  </ContextPanel>
</Story>

<style>
  .row {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-2) var(--space-3);
    border-radius: var(--radius-md);
    background: var(--layer-panel-bg);
    border: 1px solid var(--layer-panel-border);
    cursor: context-menu;
  }
  .name {
    flex: 1;
    min-width: 0;
    font-weight: var(--fw-semibold);
  }
</style>
