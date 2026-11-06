<script lang="ts">
  import {
    Page,
    Section,
    Grid,
    Stat,
    ChartCard,
    LineChart,
    HorizontalBarChart,
    DataTable,
    SideNav,
    Button,
  } from '../../index';

  const nav = [
    {
      items: [
        { label: 'Overview', href: '#overview', icon: 'home' as const, active: true },
        { label: 'Orders', href: '#orders', icon: 'bag' as const, count: 12 },
        { label: 'Customers', href: '#customers', icon: 'users' as const },
        { label: 'Settings', href: '#settings', icon: 'settings' as const },
      ],
    },
  ];
  const trend = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((label, i) => ({
    label,
    value: [1240, 1580, 1420, 1910, 2230, 2780, 2410][i] ?? 0,
  }));
  const top = [
    { label: 'Mugs', value: 182 },
    { label: 'Tea towels', value: 131 },
    { label: 'Notebooks', value: 96 },
  ];
  const orders = [
    { id: '#1043', customer: 'ada@example.com', total: '€ 64.00', status: 'Paid' },
    { id: '#1042', customer: 'grace@example.com', total: '€ 118.50', status: 'Shipped' },
    { id: '#1041', customer: 'linus@example.com', total: '€ 23.90', status: 'Paid' },
  ];
</script>

<Page title="Shop admin" subtitle="today" width="full" sidebarWidth="12rem">
  {#snippet actions()}
    <Button variant="primary" shape="pill" icon="download" label="Export" />
  {/snippet}
  {#snippet sidebar()}<SideNav groups={nav} />{/snippet}

  <Grid min="10rem">
    <Stat label="Revenue" value="€ 13,570" delta={12} icon="trending-up" />
    <Stat label="Orders" value="214" delta={4} icon="bag" />
    <Stat label="Returns" value="3" delta={-25} goodWhen="down" icon="refresh" />
  </Grid>

  <Grid columns="2fr 1fr" collapse="lg">
    <ChartCard title="Revenue" sub="this week">
      <LineChart
        data={trend}
        max={3000}
        ticks={[0, 1000, 2000, 3000]}
        tickFormat={(v) => (v ? `€ ${v / 1000}k` : '0')}
        height={180}
      />
    </ChartCard>
    <ChartCard title="Top products"><HorizontalBarChart data={top} /></ChartCard>
  </Grid>

  <Section title="Latest orders" level="panel">
    <DataTable
      columns={[
        { key: 'id', label: 'Order' },
        { key: 'customer', label: 'Customer', hideOnMobile: true },
        { key: 'status', label: 'Status' },
        { key: 'total', label: 'Total', align: 'end' },
      ]}
      rows={orders}
      rowKey={(o) => o.id}
    />
  </Section>
</Page>
