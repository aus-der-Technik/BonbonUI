<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import BottomBar, { type BottomBarItem } from './BottomBar.svelte';
  import SearchField from '../molecules/SearchField.svelte';
  import StatusDot from '../atoms/StatusDot.svelte';
  import Text from '../atoms/Text.svelte';
  import Stack from '../layout/Stack.svelte';

  const { Story } = defineMeta({
    title: 'Organisms/BottomBar',
    component: BottomBar,
    tags: ['autodocs'],
    globals: { viewport: { value: 'mobile2', isRotated: false } },
    parameters: { layout: 'fullscreen' },
  });

  const every: BottomBarItem[] = [
    { id: 'mail', label: 'Mail', icon: 'mail', color: 'blue', badge: 4 },
    { id: 'notes', label: 'Notes', icon: 'file-text', color: 'yellow' },
    { id: 'photos', label: 'Photos', icon: 'image', color: 'pink' },
    { id: 'files', label: 'Files', icon: 'folder', color: 'brown' },
    { id: 'calendar', label: 'Calendar', icon: 'calendar', color: 'red', badge: 1 },
    { id: 'chat', label: 'Chat', icon: 'chat', color: 'green', badge: 12 },
    { id: 'tasks', label: 'Tasks', icon: 'check-square', color: 'purple' },
    { id: 'maps', label: 'Maps', icon: 'map', color: 'indigo' },
  ];
</script>

<script lang="ts">
  let here = $state('notes');
  let query = $state('');
  const go = (id: string) => () => (here = id);
  const all = $derived(every.map((item) => ({ ...item, onclick: go(item.id) })));
  /** Home and Search stay first; then the places used last. */
  const bar = $derived<BottomBarItem[]>([
    { id: 'home', label: 'Home', icon: 'home', onclick: go('home') },
    { id: 'search', label: 'Search', icon: 'search', onclick: go('search') },
    ...all.filter((item) => ['mail', 'notes', 'files'].includes(item.id)),
  ]);
</script>

<!-- A phone's navigation: two fixed places, three of the person's own, and "More" — a sheet of
     every place with a search on top and a status line at the foot. The dot on "More" says
     something waits in a place the bar does not show (Calendar, Chat). The bar sticks to the
     bottom of the screen and steps aside while someone types. -->
<Story name="Phone" asChild>
  <div class="screen">
    <Stack gap="sm" padding="lg">
      <Text size="xl" weight="bold">{every.find((i) => i.id === here)?.label ?? 'Home'}</Text>
      <Text tone="muted">Tap the places; open “More” for every one of them.</Text>
      {#each Array.from({ length: 14 }, (_, i) => i + 1) as n (n)}
        <Text>Line {n} of the page, so the bar has something to float over.</Text>
      {/each}
    </Stack>
    <BottomBar items={bar} more={all} current={here} label="Places" moreLabel="Apps">
      {#snippet sheetTop()}
        <SearchField label="Go to a place" bind:value={query} />
      {/snippet}
      {#snippet sheetFooter()}
        <p class="status"><StatusDot tone="ok" label="Online · v1.6.0" /></p>
      {/snippet}
    </BottomBar>
  </div>
</Story>

<!-- Plain glyphs (no colour) and shown at every width with `phoneOnly={false}`. -->
<Story name="Plain glyphs" asChild>
  <div class="screen short">
    <BottomBar
      phoneOnly={false}
      current="inbox"
      items={[
        { id: 'inbox', label: 'Inbox', icon: 'inbox', badge: 2 },
        { id: 'starred', label: 'Starred', icon: 'star' },
        { id: 'sent', label: 'Sent', icon: 'send' },
        { id: 'settings', label: 'Settings', icon: 'settings' },
      ]}
    />
  </div>
</Story>

<style>
  .screen {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 100dvh;
  }
  .screen.short {
    min-height: 0;
    justify-content: flex-end;
  }
  .status {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);
    margin: 0;
    font-family: var(--font-mono);
    font-size: var(--fs-xs);
    color: var(--text-3);
  }
</style>
