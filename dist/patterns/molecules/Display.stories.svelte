<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ChartTooltip from './ChartTooltip.svelte';
  import ChoiceCard from './ChoiceCard.svelte';
  import DetailList from './DetailList.svelte';
  import KpiTile from './KpiTile.svelte';
  import Legend from './Legend.svelte';
  import RatingDisplay from './RatingDisplay.svelte';
  import ToggleChip from './ToggleChip.svelte';
  import Badge from '../atoms/Badge.svelte';
  import Card from '../atoms/Card.svelte';
  import Grid from '../layout/Grid.svelte';
  import Row from '../layout/Row.svelte';

  const plans = [
    { value: 'solo', title: 'Solo', icon: 'user', about: 'One seat, all the basics.' },
    { value: 'team', title: 'Team', icon: 'users', about: 'Up to 20 seats, shared spaces.' },
    { value: 'company', title: 'Company', icon: 'globe', about: 'Unlimited seats and SSO.' },
  ] as const;

  const { Story } = defineMeta({
    title: 'Molecules/Display',
    component: KpiTile,
    tags: ['autodocs'],
    args: {
      label: 'Orders',
      value: '1,284',
      delta: '+12 %',
      detail: 'vs. last week',
      icon: 'cart',
    },
  });
</script>

<script lang="ts">
  let visible = $state({ open: true, packed: true, shipped: false, returned: true });
  let wrap = $state(false);
  let plan = $state('team');
</script>

<!-- A summary number on glass: label and icon, the big tabular value, a trend pill and a detail
     line. A "+" delta is green, a "−" one red. -->
<Story name="KpiTile" />

<!-- A row of tiles in a Grid: as many columns as fit at 13rem, one on a phone. `invert` makes a
     falling figure good (errors, wait times). -->
<Story name="KPI row" asChild>
  <Grid min="13rem">
    <KpiTile label="Revenue" value="€48.2k" delta="+8.4 %" detail="this month" icon="credit-card" />
    <KpiTile label="Orders" value="1,284" delta="+12 %" detail="vs. last week" icon="cart" />
    <KpiTile
      label="Returns"
      value="37"
      delta="−5"
      invert
      detail="fewer than last week"
      icon="truck"
    />
    <KpiTile
      label="Avg. reply time"
      value="2h 10m"
      delta="+18 %"
      invert
      detail="slower"
      icon="clock"
    />
  </Grid>
</Story>

<!-- A proportional meter under the value, e.g. a share of positive votes. -->
<Story name="KpiTile with meter" asChild>
  <Grid min="16rem" columns={2}>
    <KpiTile
      label="Positive votes"
      value="78 %"
      detail="412 up · 116 down"
      icon="thumbs-up"
      meter={[
        { value: 412, color: 'var(--up)' },
        { value: 116, color: 'var(--down)' },
      ]}
    />
    <KpiTile
      label="Storage"
      value="64 GB"
      detail="of 100 GB"
      icon="database"
      meter={[
        { value: 38, color: 'var(--color-blue)' },
        { value: 18, color: 'var(--color-purple)' },
        { value: 8, color: 'var(--color-orange)' },
        { value: 36, color: 'var(--fill-muted)' },
      ]}
    />
  </Grid>
</Story>

<!-- `value={null}` is the "–" placeholder for "not loaded" or "no data". -->
<Story name="KpiTile empty" args={{ value: null, delta: undefined, detail: 'No orders yet' }} />

<!-- A legend that filters: one chip per category with its count; off chips dim. -->
<Story name="ToggleChip legend" asChild>
  <Row gap="sm">
    <ToggleChip label="Open" color="var(--color-blue)" count={12} bind:pressed={visible.open} />
    <ToggleChip
      label="Packed"
      color="var(--color-orange)"
      count={3}
      bind:pressed={visible.packed}
    />
    <ToggleChip
      label="Shipped"
      color="var(--color-green)"
      count={48}
      bind:pressed={visible.shipped}
    />
    <ToggleChip
      label="Returned"
      color="var(--color-pink)"
      count={2}
      bind:pressed={visible.returned}
    />
  </Row>
</Story>

<!-- A compact toolbar toggle: accent-tinted while on. -->
<Story name="ToggleChip small" asChild>
  <Row gap="sm">
    <ToggleChip size="sm" icon="wrap" label="Wrap lines" bind:pressed={wrap} />
    <ToggleChip size="sm" icon="filter" label="Only mine" pressed />
  </Row>
</Story>

<!-- Colour keys for a chart. -->
<Story name="Legend" asChild>
  <Legend
    items={[
      { label: 'Online', color: 'var(--color-blue)' },
      { label: 'In store', color: 'var(--color-green)' },
      { label: 'Phone', color: 'var(--color-orange)' },
    ]}
  />
</Story>

<!-- A rating as shown in lists. -->
<Story name="RatingDisplay" asChild>
  <Row gap="lg">
    <RatingDisplay type="thumbs" value="up" />
    <RatingDisplay type="thumbs" value="down" />
    <RatingDisplay type="stars" value={4} />
  </Row>
</Story>

<!-- Caps labels over their values, e.g. a row's detail. -->
<Story name="DetailList stacked" asChild>
  <Card surface="subtle" padding="md">
    <DetailList
      items={[
        { label: 'Note', value: 'Customer asked for gift wrapping and a handwritten card.' },
        { label: 'Delivery', value: 'Express, 1–2 working days' },
        { label: 'Tracking page', value: 'https://shop.example.com/track/48213', mono: true },
        { label: 'Order id', value: '3f1c9a2e-8a1d-4f7b-9d3e-2b6c1e0a9f44', mono: true },
      ]}
    />
  </Card>
</Story>

<!-- `columns` flows the pairs into up to that many columns as room allows. -->
<Story name="DetailList in columns" asChild>
  <Card title="Customer">
    <DetailList
      columns={3}
      items={[
        { label: 'Name', value: 'Jane Doe' },
        { label: 'E-mail', value: 'jane.doe@example.com' },
        { label: 'Member since', value: 'March 2024' },
        { label: 'Orders', value: '23' },
        { label: 'Lifetime value', value: '€1,940' },
        { label: 'Segment', value: 'Regular' },
      ]}
    />
  </Card>
</Story>

<!-- Label and value side by side, as in a map popup. -->
<Story name="DetailList grid" asChild>
  <Card padding="sm">
    <DetailList
      layout="grid"
      items={[
        { label: 'Lat / Lon', value: '51.3397, 12.3731' },
        { label: 'Region', value: 'North district' },
        { label: 'Population', value: '612,400' },
      ]}
    />
  </Card>
</Story>

<!-- Chooser tiles in a Grid. They lift on hover; the selected one becomes tinted glass. -->
<Story name="ChoiceCard" asChild>
  <Grid min="18rem">
    <ChoiceCard
      icon="database"
      title="Products"
      meta="catalog.products · 14 columns"
      about="Every product with prices, stock per store and the photos shown in the shop."
    >
      {#snippet badges()}<Badge tone="live" label="Editable" />{/snippet}
    </ChoiceCard>
    <ChoiceCard
      icon="calendar"
      title="Campaigns 2026"
      meta="catalog.campaigns · 6 columns"
      about="Planned sales and their dates."
    >
      {#snippet badges()}<Badge tone="draft" label="Draft" />{/snippet}
    </ChoiceCard>
    <ChoiceCard icon="users" title="Customers" meta="catalog.customers · 9 columns">
      {#snippet badges()}<Badge tone="locked" label="Read-only" />{/snippet}
    </ChoiceCard>
  </Grid>
</Story>

<!-- A one-of-n choice built from tiles: `selected` marks the chosen one (`aria-pressed`). -->
<Story name="ChoiceCard as plan picker" asChild>
  <Grid min="14rem" columns={3}>
    {#each plans as option (option.value)}
      <ChoiceCard
        icon={option.icon}
        title={option.title}
        about={option.about}
        selected={plan === option.value}
        onclick={() => (plan = option.value)}
      />
    {/each}
  </Grid>
</Story>

<!-- The card next to the pointer over a chart. -->
<Story name="ChartTooltip" parameters={{ docs: { story: { height: '9rem' } } }} asChild>
  <ChartTooltip
    tooltip={{
      x: 20,
      y: 20,
      title: 'Mon, 13 Oct 2026',
      rows: [
        { label: 'Online', value: '214', color: 'var(--color-blue)' },
        { label: 'In store', value: '88', color: 'var(--color-green)' },
        { label: 'Online share', value: '71 %' },
      ],
    }}
  />
</Story>
