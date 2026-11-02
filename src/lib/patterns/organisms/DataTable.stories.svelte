<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import DataTable, { type Column, type SortOrder } from './DataTable.svelte';
  import Badge from '../atoms/Badge.svelte';
  import Card from '../atoms/Card.svelte';
  import ConfirmButton from '../molecules/ConfirmButton.svelte';
  import DetailList from '../molecules/DetailList.svelte';
  import IdentityCell from '../molecules/IdentityCell.svelte';
  import Pager from '../molecules/Pager.svelte';
  import RatingDisplay from '../molecules/RatingDisplay.svelte';
  import Section from '../layout/Section.svelte';
  import Stack from '../layout/Stack.svelte';
  import { feedbackItems, type FeedbackItem } from '../../demo/mock';
  import { dateTimeFormat } from '../../utils/format';

  const columns: Column[] = [
    { key: 'receivedAt', label: 'Received', sortable: true, nowrap: true },
    { key: 'rating', label: 'Rating', sortable: true, nowrap: true },
    { key: 'source', label: 'Source', hideOnMobile: true, nowrap: true },
    { key: 'comment', label: 'Comment' },
  ];

  interface Member {
    id: string;
    name: string;
    email: string;
    role: string;
    status: 'Active' | 'Invited';
  }
  const members: Member[] = [
    { id: 'u1', name: 'Ada Example', email: 'ada@example.com', role: 'Owner', status: 'Active' },
    {
      id: 'u2',
      name: 'Grace Example',
      email: 'grace@example.com',
      role: 'Admin',
      status: 'Active',
    },
    {
      id: 'u3',
      name: 'Linus Example',
      email: 'linus@example.com',
      role: 'Editor',
      status: 'Active',
    },
    {
      id: 'u4',
      name: 'Alan Example',
      email: 'alan@example.com',
      role: 'Viewer',
      status: 'Invited',
    },
  ];
  const memberColumns: Column[] = [
    { key: 'name', label: 'Member' },
    { key: 'role', label: 'Role', hideOnMobile: true },
    { key: 'status', label: 'Status', align: 'end' },
  ];

  const { Story } = defineMeta({
    title: 'Organisms/DataTable',
    component: DataTable,
    tags: ['autodocs'],
    parameters: { layout: 'padded' },
  });
</script>

<script lang="ts">
  let all = $state(feedbackItems(60));
  let sort = $state('receivedAt');
  let order = $state<SortOrder>('desc');
  let offset = $state(0);
  let current = $state('u2');
  const limit = 10;

  const rank = (item: FeedbackItem) =>
    Number(item.ratingValue === 'up' ? 6 : item.ratingValue === 'down' ? 0 : item.ratingValue);
  const sorted = $derived(
    [...all].sort((a, b) => {
      const ka = sort === 'rating' ? rank(a) : a.receivedAt;
      const kb = sort === 'rating' ? rank(b) : b.receivedAt;
      return (ka < kb ? -1 : ka > kb ? 1 : 0) * (order === 'asc' ? 1 : -1);
    }),
  );
  const page = $derived(sorted.slice(offset, offset + limit));

  function onsort(key: string) {
    order = sort === key && order === 'desc' ? 'asc' : 'desc';
    sort = key;
    offset = 0;
  }
</script>

{#snippet cell(item: FeedbackItem, column: Column)}
  {#if column.key === 'receivedAt'}
    <span class="muted">{dateTimeFormat.format(new Date(item.receivedAt))}</span>
  {:else if column.key === 'rating'}
    <RatingDisplay type={item.ratingType} value={item.ratingValue} />
  {:else if column.key === 'source'}
    <Stack gap="none">
      <span>{item.sourceSystem}</span>
      <small class="muted">{item.sourceVersion} · {item.sourceEnvironment}</small>
    </Stack>
  {:else if item.comment}
    {item.comment}
  {:else}
    <span class="muted">No comment</span>
  {/if}
{/snippet}

{#snippet detail(item: FeedbackItem)}
  <Card surface="subtle" padding="sm">
    <Stack gap="sm" align="start">
      <DetailList
        items={[
          ...(item.comment ? [{ label: 'Comment', value: item.comment }] : []),
          ...(item.query ? [{ label: 'Query', value: item.query }] : []),
          ...(item.pageUrl ? [{ label: 'Page', value: item.pageUrl, mono: true }] : []),
          { label: 'Submission', value: item.id, mono: true },
        ]}
      />
      <ConfirmButton onconfirm={() => (all = all.filter((i) => i.id !== item.id))} />
    </Stack>
  </Card>
{/snippet}

{#snippet memberCell(m: Member, column: Column)}
  {#if column.key === 'name'}
    <IdentityCell name={m.name} subtitle={m.email} size={32} />
  {:else if column.key === 'status'}
    <Badge tone={m.status === 'Active' ? 'live' : 'draft'} size="sm" label={m.status} />
  {:else}
    {m.role}
  {/if}
{/snippet}

<!-- A report: sortable headers (the active one wears a tinted chevron), rows that open a detail on
     click / Enter / Space, and a Pager under it. Hover a row to see it light up. -->
<Story name="Feedback list" asChild>
  <Card padding="lg">
    <Section title="All feedback" description="{all.length} matching · all time">
      <DataTable
        {columns}
        rows={page}
        rowKey={(i) => i.id}
        {sort}
        {order}
        {onsort}
        {cell}
        {detail}
      />
      <Pager
        {offset}
        {limit}
        total={all.length}
        count={page.length}
        onpage={(next) => (offset = next)}
      />
    </Section>
  </Card>
</Story>

<!-- `onrowclick` makes every row a target; `selected` lifts one row onto the selected layer (the
     record on screen): tinted glass with a tint rim, the same look as a selected card or nav item.
     Hovering paints the faint accent. Click a member. -->
<Story name="Selected row" asChild>
  <Card padding="lg">
    <Section title="Members" description="Click a row to show that member">
      <DataTable
        columns={memberColumns}
        rows={members}
        rowKey={(m) => m.id}
        cell={memberCell}
        selected={current}
        onrowclick={(m) => (current = m.id)}
      />
    </Section>
  </Card>
</Story>

<!-- No rows: the table says so in `emptyText` (default "Nothing here — try fewer filters."). -->
<Story name="Empty" asChild>
  <Card padding="lg">
    <DataTable
      columns={[
        { key: 'name', label: 'Name' },
        { key: 'value', label: 'Value', align: 'end' },
      ]}
      rows={[]}
      rowKey={() => ''}
      emptyText="No settings have been changed yet."
    />
  </Card>
</Story>

<style>
  .muted {
    color: var(--text-3);
    font-variant-numeric: tabular-nums;
  }
</style>
