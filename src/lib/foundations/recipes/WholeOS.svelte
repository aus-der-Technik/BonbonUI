<script lang="ts">
  import { Desktop, MenuBar, Dock, Window } from '../../index';

  let notesOpen = $state(true);
  let note = $state('Pack the demo laptop.\nBook the room for Thursday.');
</script>

<!-- Themed by the Application around it, like every page. -->
<Desktop>
  {#snippet menubar()}
    <MenuBar
      logo="sparkles"
      menus={[
        {
          label: 'Notes',
          items: [{ label: 'New note', shortcut: '⌘N', onselect: () => (notesOpen = true) }],
        },
      ]}
      status={[{ icon: 'wifi', label: 'Wi-Fi' }]}
    />
  {/snippet}
  {#snippet dock()}
    <Dock
      items={[
        { id: 'notes', label: 'Notes', icon: 'pencil', color: 'yellow', running: notesOpen },
        { id: 'files', label: 'Files', icon: 'folder', color: 'blue' },
      ]}
      onselect={(app) => {
        if (app.id === 'notes') notesOpen = true;
      }}
    />
  {/snippet}

  {#if notesOpen}
    <Window
      title="Notes"
      icon="pencil"
      color="yellow"
      width={420}
      height={260}
      onclose={() => (notesOpen = false)}
    >
      <textarea class="note" aria-label="Note" bind:value={note}></textarea>
    </Window>
  {/if}
</Desktop>

<style>
  .note {
    width: 100%;
    height: 100%;
    border: 0;
    resize: none;
    background: none;
    color: var(--text);
    font: inherit;
    line-height: 1.6;
  }
</style>
