<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import AppHeader from './AppHeader.svelte';
  import Sheet from './Sheet.svelte';
  import Badge from '../atoms/Badge.svelte';
  import Button from '../atoms/Button.svelte';
  import Kbd from '../atoms/Kbd.svelte';
  import Select from '../atoms/Select.svelte';
  import EmptyState from '../molecules/EmptyState.svelte';
  import GlassPill from '../molecules/GlassPill.svelte';
  import Picker from '../molecules/Picker.svelte';
  import RefreshButton from '../molecules/RefreshButton.svelte';
  import SearchField from '../molecules/SearchField.svelte';
  import SegmentedControl from '../molecules/SegmentedControl.svelte';
  import ToggleChip from '../molecules/ToggleChip.svelte';
  import UserMenu from '../molecules/UserMenu.svelte';
  import Stack from '../layout/Stack.svelte';

  const { Story } = defineMeta({
    title: 'Organisms/AppHeader & Sheet',
    component: AppHeader,
    tags: ['autodocs'],
    args: { title: 'Locations', subtitle: 'find places' },
    parameters: { layout: 'fullscreen' },
  });
</script>

<script lang="ts">
  let dataset = $state<string | null>('products');
</script>

<!-- The title pill alone. Without `href` a click scrolls back to the top. Hover it: a one-shot
     sugar-glass sheen sweeps across, as on the website NavBar. -->
<Story name="Title only" />

<!-- A dashboard: a frosted secondary action and the primary refresh, both pills. Labels collapse
     to icons on phones (`collapse`). -->
<Story name="Dashboard actions" asChild>
  <AppHeader title="Feedback" subtitle="what people tell us">
    {#snippet actions()}
      <Button
        variant="glass"
        shape="pill"
        size="lg"
        icon="message-plus"
        label="Give feedback"
        collapse
      />
      <RefreshButton live />
    {/snippet}
  </AppHeader>
</Story>

<!-- `fillActions`: the actions take the room beside the title — a list switch and a search
     pill that stretches to the right edge. -->
<Story name="Filling actions with glass pills" asChild>
  <AppHeader title="Directory" fillActions>
    {#snippet actions()}
      <GlassPill label="List">
        <SegmentedControl
          size="sm"
          label="List"
          options={[
            { value: 'people', label: 'People' },
            { value: 'teams', label: 'Teams' },
          ]}
          value="people"
        />
      </GlassPill>
      <GlassPill as="search" label="Find people" grow maxWidth="60rem">
        <Stack grow>
          <SearchField label="Search" placeholder="Search names…" />
        </Stack>
        <Select
          aria-label="Group"
          options={[
            { value: '', label: 'Everyone' },
            { value: 'team', label: 'My team' },
          ]}
          value=""
        />
      </GlassPill>
    {/snippet}
  </AppHeader>
</Story>

<!-- An editor: the title pill links home (`href` + `hint`), a data-set picker, the user menu and
     a primary reload. -->
<Story name="Editor actions" asChild>
  <Stack style="min-height:20rem">
    <AppHeader title="Data editor" subtitle="edit tables" href="#" hint="All data sets">
      {#snippet actions()}
        <Picker
          options={[
            { value: 'products', title: 'Products', meta: 'shop.products · 248 rows' },
            { value: 'orders', title: 'Orders', meta: 'shop.orders · 3,112 rows' },
          ]}
          bind:value={dataset}
          label="Data set"
          heading="Data sets"
        />
        <UserMenu email="jane.doe@example.com" onsignout={() => {}} />
        <Button variant="primary" shape="pill" size="lg" icon="reload" label="Reload" collapse />
      {/snippet}
    </AppHeader>
  </Stack>
</Story>

<!-- Sheet: a full-height working card. Tools sit in its head, a loading bar under it, the body
     fills the rest and the footer carries counts and key hints. -->
<Story name="Sheet" asChild>
  <Stack padding="lg" style="height:24rem">
    <Sheet
      title="Products"
      about="Every product in the catalogue with price, stock and supplier."
      loading
    >
      {#snippet tools()}
        <Badge tone="live" label="Editable" />
        <ToggleChip size="sm" icon="wrap" label="Wrap" />
        <SearchField label="Filter the loaded rows" placeholder="Filter loaded rows" />
      {/snippet}
      <EmptyState icon="table" title="Loading products" message="The grid appears here." />
      {#snippet footer()}
        <span>248 rows</span>
        <span>Click a cell to edit · <Kbd>Enter</Kbd> saves · <Kbd>Esc</Kbd> cancels</span>
      {/snippet}
    </Sheet>
  </Stack>
</Story>
