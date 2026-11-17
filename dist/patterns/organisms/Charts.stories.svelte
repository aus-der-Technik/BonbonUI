<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ChartCard from './ChartCard.svelte';
  import ColumnChart from './ColumnChart.svelte';
  import DonutChart from './DonutChart.svelte';
  import DivergingBarChart from './DivergingBarChart.svelte';
  import HorizontalBarChart from './HorizontalBarChart.svelte';
  import LineChart from './LineChart.svelte';
  import DashboardGrid from '../templates/DashboardGrid.svelte';
  import Grid from '../layout/Grid.svelte';
  import SegmentedControl from '../molecules/SegmentedControl.svelte';
  import { dailyStats, starDistribution, toAverage, toDiverging } from '../../demo/mock';
  import { decimalFormat } from '../../utils/format';

  const daily = dailyStats(30);

  const { Story } = defineMeta({
    title: 'Organisms/Charts',
    component: ChartCard,
    tags: ['autodocs'],
    parameters: { layout: 'padded' },
  });

  const visits = Array.from({ length: 30 }, (_, i) => ({
    label: `${i + 1}.`,
    title: `Day ${i + 1}`,
    value: Math.round(820 + Math.sin(i / 3) * 180 + i * 14),
  }));
  const channels = [
    { label: 'Search', value: 412, color: 'var(--color-blue)' },
    { label: 'Direct', value: 268, color: 'var(--color-purple)' },
    { label: 'Social', value: 191, color: 'var(--color-pink)' },
    { label: 'E-mail', value: 104, color: 'var(--color-orange)' },
    { label: 'Ads', value: 66, color: 'var(--color-teal)' },
  ];
  const chapters = [
    'Arrival',
    'The long winter',
    'Letters',
    'A house by the harbour',
    'Storm',
    'Return',
    'Epilogue',
  ].map((label, i) => ({
    label,
    title: `Chapter ${i + 1}: ${label}`,
    value: [3200, 5400, 2100, 6100, 4300, 3900, 1200][i] ?? 0,
  }));
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const profit = months.map((label, i) => ({
    label,
    value: Math.round(Math.sin(i / 1.8) * 14_000 + 4_000),
  }));
  const storage = [
    { label: 'Pictures', value: 18.4 },
    { label: 'Documents', value: 6.2 },
    { label: 'Spreadsheets', value: 3.1 },
    { label: 'Videos', value: 9.8 },
    { label: 'Other', value: 1.6 },
  ];
  const gb = (v: number) => `${decimalFormat.format(v)} GB`;
  const euro = new Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'EUR',
    notation: 'compact',
  });
</script>

<script lang="ts">
  let range = $state('30d');
</script>

<!-- A dashboard trend row: 2 : 1.4 : 1, folding to two and then one column. The wide card spans
     the row once the grid folds. Axes and gridlines stay quiet; only the data carries colour, and
     it arrives once: bars grow out of their baseline, a line draws itself. -->
<Story name="Dashboard row" asChild>
  <DashboardGrid variant="charts" label="Trends">
    <ChartCard
      title="Votes per day"
      sub="Helpful above the line, not helpful below"
      wide
      legend={[
        { label: 'Helpful', color: 'var(--up)' },
        { label: 'Not helpful', color: 'var(--down)' },
      ]}
    >
      <DivergingBarChart data={toDiverging(daily)} upLabel="Helpful" downLabel="Not helpful" />
    </ChartCard>
    <ChartCard title="Average rating per day" sub="Days without ratings are skipped">
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
    <ChartCard title="Rating distribution" sub="Selected time range">
      <HorizontalBarChart data={starDistribution()} countLabel="Ratings" />
    </ChartCard>
  </DashboardGrid>
</Story>

<!-- A headline `value` and `actions` in the head: here a range switch. The line follows the tint
     with `color="var(--accent)"` — change the Tint in the toolbar. -->
<Story name="Headline figure and actions" asChild>
  <ChartCard title="Visits" sub="Unique visitors per day" value="27,940">
    {#snippet actions()}
      <SegmentedControl
        size="sm"
        label="Range"
        options={[
          { value: '7d', label: '7 days' },
          { value: '30d', label: '30 days' },
          { value: '90d', label: '90 days' },
        ]}
        bind:value={range}
      />
    {/snippet}
    <LineChart
      data={visits}
      min={0}
      max={1600}
      ticks={[0, 400, 800, 1200, 1600]}
      color="var(--accent)"
      valueLabel="Visitors"
      height={240}
    />
  </ChartCard>
</Story>

<!-- Candy colours: each row of a bar chart can take a palette colour, and a line any token. -->
<Story name="Candy palette" asChild>
  <Grid min="20rem">
    <ChartCard title="Traffic by channel" sub="Last 30 days">
      <HorizontalBarChart data={channels} countLabel="Visits" />
    </ChartCard>
    <ChartCard title="Conversion rate" sub="Share of visits with an order">
      <LineChart
        data={visits.map((d, i) => ({ ...d, value: 2 + Math.cos(i / 4) * 0.8 }))}
        min={0}
        max={4}
        tickFormat={(v) => `${v} %`}
        valueFormat={(v) => `${decimalFormat.format(v)} %`}
        valueLabel="Rate"
        color="var(--color-purple)"
      />
    </ChartCard>
  </Grid>
</Story>

<!-- ColumnChart, the upright sibling of HorizontalBarChart, and DonutChart for shares of a whole.
     Long chapter names shorten with an ellipsis before any is left out (the tooltip has the full
     title); the donut shows the total in its hole and lifts the slice under the pointer. -->
<Story name="Columns and shares" asChild>
  <Grid min="20rem">
    <ChartCard title="Words per chapter" sub="Draft 3">
      <ColumnChart data={chapters} valueLabel="Words" color="var(--accent)" />
    </ChartCard>
    <ChartCard title="Storage" sub="By kind of file">
      <DonutChart data={storage} valueFormat={gb} valueLabel="Size" centerLabel="Used" />
    </ChartCard>
  </Grid>
</Story>

<!-- Negative values hang below the zero line, here in `--down`; the share drops out of the
     tooltip once a value is negative. -->
<Story name="ColumnChart, profit and loss" asChild>
  <ChartCard title="Profit per month" sub="This year">
    <ColumnChart
      data={profit}
      valueLabel="Profit"
      negativeColor="var(--down)"
      valueFormat={(v) => euro.format(v)}
      height={240}
    />
  </ChartCard>
</Story>

<!-- 90 slots: bars get thinner, every few days carry a label. -->
<Story name="DivergingBarChart, 90 days" asChild>
  <ChartCard title="Votes per day" sub="Last 90 days">
    <DivergingBarChart data={toDiverging(dailyStats(90, 21))} height={260} />
  </ChartCard>
</Story>

<!-- No data in the range: every chart says so in its own words (`emptyText`). -->
<Story name="Empty" asChild>
  <DashboardGrid variant="charts">
    <ChartCard title="Votes per day">
      <DivergingBarChart data={[]} emptyText="No votes in this range" />
    </ChartCard>
    <ChartCard title="Average rating">
      <LineChart data={[]} emptyText="No ratings in this range" />
    </ChartCard>
    <ChartCard title="Distribution">
      <HorizontalBarChart data={[]} emptyText="No ratings in this range" />
    </ChartCard>
    <ChartCard title="Words per chapter">
      <ColumnChart data={[]} emptyMessage="No chapters yet" />
    </ChartCard>
    <ChartCard title="Storage">
      <DonutChart data={[]} emptyMessage="Nothing stored yet" />
    </ChartCard>
  </DashboardGrid>
</Story>
