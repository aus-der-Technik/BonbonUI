<script lang="ts">
  /** Example page: an analytics dashboard over user feedback, with mock data (Storybook only). */
  import Page from '../patterns/templates/Page.svelte';
  import Grid from '../patterns/layout/Grid.svelte';
  import Section from '../patterns/layout/Section.svelte';
  import Stack from '../patterns/layout/Stack.svelte';
  import Button from '../patterns/atoms/Button.svelte';
  import Card from '../patterns/atoms/Card.svelte';
  import Checkbox from '../patterns/atoms/Checkbox.svelte';
  import LoadingBar from '../patterns/atoms/LoadingBar.svelte';
  import ConfirmButton from '../patterns/molecules/ConfirmButton.svelte';
  import DetailList, { type DetailItem } from '../patterns/molecules/DetailList.svelte';
  import Field from '../patterns/molecules/Field.svelte';
  import FilterBar from '../patterns/molecules/FilterBar.svelte';
  import KpiTile from '../patterns/molecules/KpiTile.svelte';
  import MultiSelect, { type MultiGroup } from '../patterns/molecules/MultiSelect.svelte';
  import Pager from '../patterns/molecules/Pager.svelte';
  import RatingDisplay from '../patterns/molecules/RatingDisplay.svelte';
  import RefreshButton from '../patterns/molecules/RefreshButton.svelte';
  import SegmentedControl from '../patterns/molecules/SegmentedControl.svelte';
  import ChartCard from '../patterns/organisms/ChartCard.svelte';
  import DataTable, { type Column, type SortOrder } from '../patterns/organisms/DataTable.svelte';
  import DivergingBarChart from '../patterns/organisms/DivergingBarChart.svelte';
  import FeedbackDialog from '../patterns/organisms/FeedbackDialog.svelte';
  import HorizontalBarChart from '../patterns/organisms/HorizontalBarChart.svelte';
  import LineChart from '../patterns/organisms/LineChart.svelte';
  import {
    dateTimeFormat,
    decimalFormat,
    numberFormat,
    percentFormat,
    starLabel,
  } from '../utils/format';
  import {
    dailyStats,
    feedbackItems,
    starDistribution,
    toAverage,
    toDiverging,
    type FeedbackItem,
  } from './mock';

  const PAGE_SIZE = 25;
  const RANGES = [7, 30, 90, 365] as const;

  let days = $state<number>(30);
  let sources = $state<string[]>([]);
  let ratings = $state<string[]>([]);
  let commentsOnly = $state(false);
  let sort = $state('receivedAt');
  let order = $state<SortOrder>('desc');
  let offset = $state(0);
  let loading = $state(false);
  let creating = $state(false);
  let items = $state(feedbackItems());

  const daily = $derived(dailyStats(days, days));
  const thumbsUp = $derived(daily.reduce((s, d) => s + d.thumbsUp, 0));
  const thumbsDown = $derived(daily.reduce((s, d) => s + d.thumbsDown, 0));
  const starCount = $derived(daily.reduce((s, d) => s + d.stars, 0));
  const starSum = $derived(daily.reduce((s, d) => s + d.starsSum, 0));
  const rangeLabel = $derived(days === 365 ? 'last year' : `last ${days} days`);

  const sourceGroups: MultiGroup[] = [
    { options: ['chat-assistant', 'mobile-app', 'website'].map((s) => ({ value: s, label: s })) },
  ];
  const ratingGroups: MultiGroup[] = [
    {
      label: 'Thumbs',
      options: [
        { value: 'up', label: 'Thumbs up' },
        { value: 'down', label: 'Thumbs down' },
      ],
    },
    {
      label: 'Stars',
      options: [5, 4, 3, 2, 1].map((n) => ({ value: String(n), label: starLabel(n), stars: n })),
    },
  ];

  const columns: Column[] = [
    { key: 'receivedAt', label: 'Received', sortable: true, nowrap: true },
    { key: 'rating', label: 'Rating', sortable: true, nowrap: true },
    { key: 'source', label: 'Source', hideOnMobile: true, nowrap: true },
    { key: 'comment', label: 'Comment' },
  ];

  const ratingKey = (i: FeedbackItem) =>
    i.ratingValue === 'up' ? 6 : i.ratingValue === 'down' ? 0 : Number(i.ratingValue);
  const filtered = $derived(
    items
      .filter((i) => !sources.length || sources.includes(i.sourceSystem))
      .filter((i) => !ratings.length || ratings.includes(i.ratingValue))
      .filter((i) => !commentsOnly || !!i.comment)
      .sort((a, b) => {
        const d =
          sort === 'rating'
            ? ratingKey(a) - ratingKey(b)
            : a.receivedAt.localeCompare(b.receivedAt);
        return order === 'asc' ? d : -d;
      }),
  );
  const page = $derived(filtered.slice(offset, offset + PAGE_SIZE));

  function refresh() {
    loading = true;
    setTimeout(() => (loading = false), 700);
  }

  function onsort(key: string) {
    order = sort === key && order === 'desc' ? 'asc' : 'desc';
    sort = key;
    offset = 0;
  }

  function details(item: FeedbackItem): DetailItem[] {
    return [
      ...(item.comment ? [{ label: 'Comment', value: item.comment }] : []),
      ...(item.query ? [{ label: 'Query', value: item.query }] : []),
      ...(item.pageUrl ? [{ label: 'Page', value: item.pageUrl, mono: true }] : []),
      { label: 'Submission', value: item.id, mono: true },
    ];
  }
</script>

{#snippet cell(item: FeedbackItem, column: Column)}
  {#if column.key === 'receivedAt'}
    <span class="when">{dateTimeFormat.format(new Date(item.receivedAt))}</span>
  {:else if column.key === 'rating'}
    <RatingDisplay type={item.ratingType} value={item.ratingValue} />
  {:else if column.key === 'source'}
    {item.sourceSystem}
    <div class="meta">{item.sourceVersion} · {item.sourceEnvironment}</div>
  {:else if item.comment}
    <span class="clip">{item.comment}</span>
  {:else}
    <span class="none">No comment</span>
  {/if}
{/snippet}

{#snippet detail(item: FeedbackItem)}
  <Card surface="subtle" padding="sm">
    <Stack gap="sm" align="start">
      <DetailList items={details(item)} />
      <ConfirmButton
        onconfirm={() =>
          new Promise<void>((resolve) =>
            setTimeout(() => {
              items = items.filter((i) => i.id !== item.id);
              resolve();
            }, 500),
          )}
      />
    </Stack>
  </Card>
{/snippet}

<Page title="Insights" subtitle="what users tell us" gap="md" footer="Example Corp · internal">
  {#snippet actions()}
    <Button
      variant="glass"
      shape="pill"
      size="lg"
      icon="message-plus"
      label="Create feedback"
      collapse
      onclick={() => (creating = true)}
    />
    <RefreshButton live {loading} onclick={refresh} />
  {/snippet}

  <FilterBar>
    <Field label="Time range" group>
      {#snippet children({ labelId })}
        <SegmentedControl
          labelledby={labelId}
          options={RANGES.map((d) => ({ value: d, label: d === 365 ? '1 year' : `${d} days` }))}
          bind:value={days}
        />
      {/snippet}
    </Field>
    <MultiSelect
      label="Source system"
      allLabel="All systems"
      unit="systems"
      groups={sourceGroups}
      value={sources}
      onchange={(v) => {
        sources = v;
        offset = 0;
      }}
    />
    <MultiSelect
      label="Rating"
      allLabel="All ratings"
      unit="ratings"
      groups={ratingGroups}
      value={ratings}
      onchange={(v) => {
        ratings = v;
        offset = 0;
      }}
    />
    <Checkbox label="With comment only" bind:checked={commentsOnly} onchange={() => (offset = 0)} />
  </FilterBar>

  <LoadingBar active={loading} />

  <Grid as="section" columns={3} min="12rem" aria-label="Summary">
    <KpiTile
      label="Feedback received"
      value={numberFormat.format(thumbsUp + thumbsDown + starCount)}
      detail={rangeLabel}
    />
    <KpiTile
      label="Thumbs up share"
      value={percentFormat.format(thumbsUp / (thumbsUp + thumbsDown || 1))}
      detail="{numberFormat.format(thumbsUp)} up · {numberFormat.format(thumbsDown)} down"
      meter={[
        { value: thumbsUp, color: 'var(--up)' },
        { value: thumbsDown, color: 'var(--down)' },
      ]}
    />
    <KpiTile
      label="Average stars"
      value={starCount ? `${decimalFormat.format(starSum / starCount)} ★` : null}
      detail="from {numberFormat.format(starCount)} star ratings"
    />
  </Grid>

  <Grid as="section" columns="2fr 1.4fr 1fr" collapse="lg" aria-label="Trends">
    <ChartCard
      title="Thumbs per day"
      sub="Up above the line, down below"
      legend={[
        { label: 'Up', color: 'var(--up)' },
        { label: 'Down', color: 'var(--down)' },
      ]}
    >
      <DivergingBarChart data={toDiverging(daily)} />
    </ChartCard>
    <ChartCard title="Average stars per day" sub="Days without star ratings are skipped">
      <LineChart
        data={toAverage(daily)}
        min={1}
        max={5}
        tickFormat={(v) => `${v}★`}
        valueFormat={(v) => `${decimalFormat.format(v)} ★`}
        valueLabel="Average"
        countLabel="Ratings"
      />
    </ChartCard>
    <ChartCard title="Star distribution" sub="Selected time range">
      <HorizontalBarChart data={starDistribution(days)} countLabel="Ratings" />
    </ChartCard>
  </Grid>

  <Section
    level="panel"
    title="All feedback"
    description="{numberFormat.format(filtered.length)} matching · all time"
  >
    <DataTable
      {columns}
      rows={page}
      rowKey={(i) => i.id}
      {sort}
      {order}
      {onsort}
      {cell}
      {detail}
      emptyText="No feedback matches these filters — loosen one to see more."
    />
    <Pager
      {offset}
      limit={PAGE_SIZE}
      total={filtered.length}
      count={page.length}
      onpage={(next) => (offset = next)}
    />
  </Section>
</Page>

<FeedbackDialog
  open={creating}
  onclose={() => (creating = false)}
  onsubmit={() => new Promise((resolve) => setTimeout(resolve, 700))}
/>

<style>
  .when {
    color: var(--text-2);
    font-variant-numeric: tabular-nums;
  }
  .meta {
    color: var(--text-3);
    font-size: var(--fs-sm);
  }
  .clip {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    max-width: 60ch;
  }
  .none {
    color: var(--text-3);
    font-style: italic;
  }
</style>
