<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import AdminLayout from './AdminLayout.svelte';
  import Application from './Application.svelte';
  import DashboardGrid from './DashboardGrid.svelte';
  import Badge from '../atoms/Badge.svelte';
  import Card from '../atoms/Card.svelte';
  import KpiTile from '../molecules/KpiTile.svelte';
  import RefreshButton from '../molecules/RefreshButton.svelte';
  import SearchField from '../molecules/SearchField.svelte';
  import ActivityLog from '../organisms/ActivityLog.svelte';
  import ChartCard from '../organisms/ChartCard.svelte';
  import DivergingBarChart from '../organisms/DivergingBarChart.svelte';
  import EditableGrid from '../organisms/EditableGrid.svelte';
  import LineChart from '../organisms/LineChart.svelte';
  import Sheet from '../organisms/Sheet.svelte';
  import SideNav from '../organisms/SideNav.svelte';
  import Grid from '../layout/Grid.svelte';
  import {
    activity,
    dailyStats,
    navGroups,
    toDiverging,
    venueColumns,
    venueRows,
  } from '../../demo/mock';

  const daily = dailyStats(30);
  const revenue = Array.from({ length: 30 }, (_, i) => ({
    label: `${i + 1}.`,
    value: 4 + Math.sin(i / 4) * 1.2 + i * 0.05,
  }));

  const { Story } = defineMeta({
    title: 'Templates/AdminLayout',
    component: AdminLayout,
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen' },
  });
</script>

<!-- A scrolling dashboard under the sticky floating header: KPI tiles, a chart row and a list.
     AdminLayout is a preset of Page — new code can use Page directly. -->
<Story name="Dashboard" asChild>
  <Application>
    <AdminLayout title="Insights" subtitle="last 30 days" footer="Internal tool · v2.4">
      {#snippet actions()}<RefreshButton />{/snippet}
      <DashboardGrid label="Key figures">
        <KpiTile label="Orders" value="1,234" delta="+12 %" detail="last 30 days" icon="cart" />
        <KpiTile label="Revenue" value="€48.2k" delta="+4 %" detail="after refunds" />
        <KpiTile label="Returns" value="2.1 %" delta="−0.4" invert detail="of all orders" />
        <KpiTile label="Average rating" value="4.6 ★" detail="from 280 reviews" />
      </DashboardGrid>
      <Grid columns="2fr 1fr" collapse="lg">
        <ChartCard title="Revenue per day" sub="in thousand euros" value="€48.2k">
          <LineChart data={revenue} min={0} max={8} ticks={[0, 2, 4, 6, 8]} color="var(--accent)" />
        </ChartCard>
        <ChartCard title="Reviews per day" sub="positive above, negative below">
          <DivergingBarChart data={toDiverging(daily)} />
        </ChartCard>
      </Grid>
      <Card title="Recent activity"><ActivityLog entries={activity()} /></Card>
    </AdminLayout>
  </Application>
</Story>

<!-- With a `sidebar`: the section navigation sits left and moves on top below 900px. -->
<Story name="With a sidebar" asChild>
  <Application>
    <AdminLayout title="Administration" subtitle="users and settings">
      {#snippet sidebar()}<SideNav groups={navGroups('users')} />{/snippet}
      {#snippet actions()}<SearchField label="Search users" placeholder="Search users…" />{/snippet}
      <Card title="Changes by administrators"><ActivityLog entries={activity()} /></Card>
    </AdminLayout>
  </Application>
</Story>

<!-- `fill`: a viewport-high shell whose last child (here a Sheet with an editable grid) takes all
     the room below the header. Only the grid scrolls. -->
<Story name="Fill" asChild>
  <Application>
    <AdminLayout title="Data editor" subtitle="edit tables" fill>
      <Sheet title="Venues" about="The sheet takes all the room below the header.">
        {#snippet tools()}<Badge tone="live" label="Editable" />{/snippet}
        <EditableGrid
          columns={venueColumns}
          rows={venueRows()}
          oncommit={() => {}}
          label="Venues"
        />
      </Sheet>
    </AdminLayout>
  </Application>
</Story>
