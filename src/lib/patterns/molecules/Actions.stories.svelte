<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ConfirmButton from './ConfirmButton.svelte';
  import Field from './Field.svelte';
  import FilterBar from './FilterBar.svelte';
  import GlassPill from './GlassPill.svelte';
  import MultiSelect from './MultiSelect.svelte';
  import Pager from './Pager.svelte';
  import RefreshButton from './RefreshButton.svelte';
  import SearchField from './SearchField.svelte';
  import SegmentedControl from './SegmentedControl.svelte';
  import SignInCard from './SignInCard.svelte';
  import TitlePill from './TitlePill.svelte';
  import UserMenu from './UserMenu.svelte';
  import Button from '../atoms/Button.svelte';
  import Checkbox from '../atoms/Checkbox.svelte';
  import Row from '../layout/Row.svelte';

  const { Story } = defineMeta({
    title: 'Molecules/Header & actions',
    component: TitlePill,
    tags: ['autodocs'],
    args: { title: 'Inventory', subtitle: 'stock across all stores' },
  });

  const statuses = ['Open', 'Packed', 'Shipped', 'Returned'].map((s) => ({
    value: s.toLowerCase(),
    label: s,
  }));
</script>

<script lang="ts">
  let offset = $state(25);
  let days = $state(30);
  let status = $state<string[]>([]);
</script>

<!-- The liquid glass pill that opens an app's header: a glowing accent bar, the app's name and,
     after a dash, what it does. Give it `href` to make it the way home. -->
<Story name="TitlePill" />

<!-- `logo` replaces the accent bar with your own mark. -->
<Story name="TitlePill with logo" asChild>
  <TitlePill title="Studio" subtitle="plan, write and publish" href="#">
    {#snippet logo()}<Button
        variant="primary"
        shape="pill"
        size="sm"
        icon="sparkles"
        iconOnly
        label="Studio"
      />{/snippet}
  </TitlePill>
</Story>

<!-- A whole header row: title pill, a glass toolbar that takes the free room, the refresh pill and
     the account chip. No wrapper styles — Row lines them up, the growing GlassPill pushes the
     rest right. -->
<Story name="Header row" parameters={{ docs: { story: { height: '16rem' } } }} asChild>
  <Row gap="md" wrap={false}>
    <TitlePill title="Orders" href="#" />
    <GlassPill as="search" label="Find orders" grow gap="sm">
      <SearchField label="Search orders" placeholder="Order no., customer…" shape="pill" />
    </GlassPill>
    <RefreshButton />
    <UserMenu email="jane.doe@example.com" name="Jane Doe" onsignout={() => {}} />
  </Row>
</Story>

<!-- Idle, refreshing, and live (a connection pushes updates, so it turns green and pulses). -->
<Story name="RefreshButton" asChild>
  <Row gap="sm">
    <RefreshButton />
    <RefreshButton loading />
    <RefreshButton live />
  </Row>
</Story>

<!-- Two-step delete: quiet and neutral at rest (a list of rows with red "Delete"s reads loud), the
     first click arms it into a solid danger button next to "Cancel", with one
     gummy wobble so the "are you sure?" is felt. Escape disarms. Deleting never throws
     sprinkles — removing things is not a party. This one resolves after 800 ms. -->
<Story name="ConfirmButton" asChild>
  <Row>
    <ConfirmButton
      icon="trash"
      onconfirm={() => new Promise((resolve) => setTimeout(resolve, 800))}
    />
    <ConfirmButton
      shape="pill"
      label="Remove member"
      confirmLabel="Remove for good"
      busyLabel="Removing…"
      onconfirm={() => new Promise((resolve) => setTimeout(resolve, 800))}
    />
  </Row>
</Story>

<!-- A rejected promise shows its message beside the buttons. -->
<Story name="ConfirmButton failing" asChild>
  <ConfirmButton onconfirm={() => Promise.reject(new Error('403 Forbidden'))} />
</Story>

<!-- Offset paging with a tabular "26–50 of 1,234". -->
<Story name="Pager" asChild>
  <Pager {offset} limit={25} total={1234} onpage={(next) => (offset = next)} />
</Story>

<!-- A dashboard's filters in one glass card: controls align on their bottom edge, `actions` sit
     at the far end. -->
<Story name="FilterBar" parameters={{ docs: { story: { height: '18rem' } } }} asChild>
  <FilterBar>
    <Field label="Time range" group>
      {#snippet children({ labelId })}
        <SegmentedControl
          labelledby={labelId}
          options={[
            { value: 7, label: '7 days' },
            { value: 30, label: '30 days' },
            { value: 90, label: '90 days' },
          ]}
          bind:value={days}
        />
      {/snippet}
    </Field>
    <MultiSelect
      label="Status"
      allLabel="Any status"
      unit="statuses"
      groups={[{ options: statuses }]}
      value={status}
      onchange={(v) => (status = v)}
    />
    <Checkbox label="With notes only" />
    {#snippet actions()}
      <Button
        variant="ghost"
        label="Reset"
        onclick={() => {
          days = 30;
          status = [];
        }}
      />
    {/snippet}
  </FilterBar>
</Story>

<!-- Shown in place of content until the user signs in. -->
<Story name="SignInCard" asChild>
  <SignInCard
    title="Sign in to edit the catalogue"
    text="Every change is recorded under your name, so the editor needs to know who you are."
    onsignin={() => {}}
  />
</Story>

<!-- Centred, with an error: the card shakes once. -->
<Story name="SignInCard centred with error" asChild>
  <SignInCard
    align="center"
    title="Welcome back"
    text="Use your work account to continue."
    error="Your session expired. Please sign in again."
    onsignin={() => {}}
  />
</Story>
