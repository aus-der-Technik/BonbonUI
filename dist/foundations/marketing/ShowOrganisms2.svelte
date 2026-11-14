<script module lang="ts">
  import type { Meta } from './looks';

  /** The second half of the organisms (alphabetically) and every template. */
  export const names = [
    'FloatingActions',
    'FormSection',
    'GlimmerPanel',
    'Hero',
    'HorizontalBarChart',
    'KanbanBoard',
    'LineChart',
    'MapView',
    'NavBar',
    'NavRail',
    'NotificationList',
    'PricingTable',
    'ProductGallery',
    'ProductGrid',
    'ResourceList',
    'ResultPanel',
    'Sheet',
    'SideNav',
    'SiteFooter',
    'SplitPane',
    'StatusCard',
    'Toaster',
    'AdminLayout',
    'Application',
    'AuthLayout',
    'Backdrop',
    'DashboardGrid',
    'ErrorPage',
    'Page',
    'SplitLayout',
  ] as const;

  export const meta: Record<string, Meta> = {
    FloatingActions: { zoom: 1.35, note: 'A bulk-action bar on glass' },
    FormSection: { zoom: 1.3, note: 'Settings in calm sections' },
    GlimmerPanel: {
      zoom: 1.5,
      note: 'Light turns round it while it is written',
      tint: '#8e5bb5',
      theme: 'dark',
    },
    Hero: { zoom: 1.2, note: 'The first screen of a website' },
    HorizontalBarChart: { zoom: 1.4, note: 'Shares at a glance' },
    KanbanBoard: { zoom: 1.12, note: 'Cards that move with you' },
    LineChart: { zoom: 1.4, note: 'A day of energy, hour by hour' },
    MapView: { zoom: 1, note: 'Places on a real map' },
    NavBar: { zoom: 1.12, note: 'A website header on one glass pill' },
    NavRail: { zoom: 2.3, note: 'Lying down, along the bottom' },
    NotificationList: { zoom: 1.35, note: 'What happened while you were away' },
    PricingTable: { zoom: 1.12, note: 'Plans, monthly or yearly' },
    ProductGallery: { zoom: 1.5, note: 'Every side of a product' },
    ProductGrid: { zoom: 1.2, note: 'A shelf of products' },
    ResourceList: { zoom: 1.55, note: 'Things you run, and how they are' },
    ResultPanel: { zoom: 1.6, note: 'An answer, ready to copy' },
    Sheet: { zoom: 1.15, note: 'A working card for a whole table' },
    SideNav: { zoom: 1.75, note: 'The chosen place, lifted' },
    SiteFooter: { zoom: 1.04, note: 'The bottom of a website', theme: 'light' },
    SplitPane: { zoom: 1.25, note: 'Two sides, one swap' },
    StatusCard: { zoom: 1.75, note: 'Done, and on its way' },
    Toaster: { zoom: 1.3, note: 'News from the background, with Undo' },
    AdminLayout: { zoom: 1.08, note: 'The frame of an admin tool' },
    Application: { zoom: 1.3, note: 'One tint, and everything follows' },
    AuthLayout: { zoom: 1.12, note: 'The sign-in screen' },
    Backdrop: { zoom: 1.3, note: 'The ground every app stands on' },
    DashboardGrid: { zoom: 1.12, note: 'Figures first, then the trends' },
    ErrorPage: { zoom: 1.12, note: 'A friendly way back' },
    Page: { zoom: 1.08, note: 'The frame of one screen' },
    SplitLayout: { zoom: 1.3, note: 'The question beside its results' },
  };
</script>

<script lang="ts">
  /**
   * Local only (not in git): one square per organism (FloatingActions…Toaster) and template.
   */
  import Studio from './Studio.svelte';
  import PreviewLarge from '../explore/PreviewLarge.svelte';
  import Application from '../../patterns/templates/Application.svelte';
  import AdminLayout from '../../patterns/templates/AdminLayout.svelte';
  import AuthLayout from '../../patterns/templates/AuthLayout.svelte';
  import Backdrop from '../../patterns/templates/Backdrop.svelte';
  import DashboardGrid from '../../patterns/templates/DashboardGrid.svelte';
  import ErrorPage from '../../patterns/templates/ErrorPage.svelte';
  import Page from '../../patterns/templates/Page.svelte';
  import SplitLayout from '../../patterns/templates/SplitLayout.svelte';
  import Stack from '../../patterns/layout/Stack.svelte';
  import Row from '../../patterns/layout/Row.svelte';
  import Grid from '../../patterns/layout/Grid.svelte';
  import Layer from '../../patterns/layout/Layer.svelte';
  import Spacer from '../../patterns/layout/Spacer.svelte';
  import Avatar from '../../patterns/atoms/Avatar.svelte';
  import Badge from '../../patterns/atoms/Badge.svelte';
  import Button from '../../patterns/atoms/Button.svelte';
  import Card from '../../patterns/atoms/Card.svelte';
  import Checkbox from '../../patterns/atoms/Checkbox.svelte';
  import Icon from '../../patterns/atoms/Icon.svelte';
  import Input from '../../patterns/atoms/Input.svelte';
  import Select from '../../patterns/atoms/Select.svelte';
  import Switch from '../../patterns/atoms/Switch.svelte';
  import Text from '../../patterns/atoms/Text.svelte';
  import Textarea from '../../patterns/atoms/Textarea.svelte';
  import Field from '../../patterns/molecules/Field.svelte';
  import KpiTile from '../../patterns/molecules/KpiTile.svelte';
  import Markdown from '../../patterns/molecules/Markdown.svelte';
  import SegmentedControl from '../../patterns/molecules/SegmentedControl.svelte';
  import StatusText from '../../patterns/atoms/StatusText.svelte';
  import Tabs from '../../patterns/molecules/Tabs.svelte';
  import ChartCard from '../../patterns/organisms/ChartCard.svelte';
  import EditableGrid from '../../patterns/organisms/EditableGrid.svelte';
  import FloatingActions from '../../patterns/organisms/FloatingActions.svelte';
  import FormSection from '../../patterns/organisms/FormSection.svelte';
  import GlimmerPanel from '../../patterns/organisms/GlimmerPanel.svelte';
  import MapView, { type MapMarker } from '../../patterns/organisms/MapView.svelte';
  import Legend from '../../patterns/molecules/Legend.svelte';
  import Hero from '../../patterns/organisms/Hero.svelte';
  import HorizontalBarChart from '../../patterns/organisms/HorizontalBarChart.svelte';
  import KanbanBoard from '../../patterns/organisms/KanbanBoard.svelte';
  import LineChart from '../../patterns/organisms/LineChart.svelte';
  import NavBar from '../../patterns/organisms/NavBar.svelte';
  import NavRail from '../../patterns/organisms/NavRail.svelte';
  import NotificationList from '../../patterns/organisms/NotificationList.svelte';
  import PricingTable from '../../patterns/organisms/PricingTable.svelte';
  import ProductGallery from '../../patterns/organisms/ProductGallery.svelte';
  import ProductGrid from '../../patterns/organisms/ProductGrid.svelte';
  import ResourceList from '../../patterns/organisms/ResourceList.svelte';
  import ResultPanel from '../../patterns/organisms/ResultPanel.svelte';
  import Sheet from '../../patterns/organisms/Sheet.svelte';
  import SideNav from '../../patterns/organisms/SideNav.svelte';
  import SiteFooter from '../../patterns/organisms/SiteFooter.svelte';
  import SplitPane from '../../patterns/organisms/SplitPane.svelte';
  import StatusCard from '../../patterns/organisms/StatusCard.svelte';
  import Toaster from '../../patterns/organisms/Toaster.svelte';
  import type { ResourceStatus } from '../../patterns/organisms/ResourceList.svelte';
  import type { Product } from '../../patterns/organisms/ProductGrid.svelte';
  import type { GalleryImage } from '../../patterns/organisms/ProductGallery.svelte';
  import type { ToastItem } from '../../utils/toasts.svelte';
  import { boardColumns, boardCards, NOW, notifications } from '../../demo/mock-collab';
  import { energyToday } from '../../demo/mock-home';
  import { navGroups, venueColumns, venueRows } from '../../demo/mock';
  import { footerColumns, legalLinks, plans, siteLinks, socialLinks } from '../../demo/mock-shop';
  import photoBackdrop from '../../demo/assets/smart-home-backdrop.jpg';

  const noop = () => {};

  // ── Product stills: soft studio pictures drawn as SVG, so the shop squares show products
  // (mock pictures only; the components never see a literal colour).
  type Still = 'mug' | 'tote' | 'vase' | 'throw';
  function still(kind: Still, bg: string, body: string, shade: string, turn = 0): string {
    const objects: Record<Still, string> = {
      mug: `<rect x="300" y="330" width="300" height="330" rx="44" fill="url(#b)"/>
        <path d="M600 410 q110 0 110 110 t-110 110" fill="none" stroke="${shade}" stroke-width="38" stroke-linecap="round"/>
        <ellipse cx="450" cy="335" rx="150" ry="26" fill="${shade}" opacity=".55"/>`,
      tote: `<path d="M370 380 q0 -150 130 -150 q130 0 130 150" fill="none" stroke="${shade}" stroke-width="22"/>
        <path d="M270 380 h460 l-40 330 h-380 z" fill="url(#b)"/>
        <rect x="430" y="470" width="140" height="90" rx="14" fill="${shade}" opacity=".35"/>`,
      vase: `<path d="M450 230 q-40 0 -40 40 q0 60 -100 170 q-80 90 -30 200 q30 60 170 60 q140 0 170 -60 q50 -110 -30 -200 q-100 -110 -100 -170 q0 -40 -40 -40 z" fill="url(#b)"/>
        <ellipse cx="450" cy="240" rx="42" ry="12" fill="${shade}" opacity=".6"/>`,
      throw: `<rect x="250" y="560" width="400" height="110" rx="40" fill="${shade}"/>
        <rect x="270" y="460" width="380" height="110" rx="40" fill="url(#b)"/>
        <rect x="250" y="360" width="400" height="110" rx="40" fill="${shade}" opacity=".85"/>
        <path d="M290 415 h320 M310 515 h300 M290 615 h320" stroke="#fff" stroke-opacity=".35" stroke-width="6" stroke-dasharray="2 18" stroke-linecap="round"/>`,
    };
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 900">
      <defs>
        <radialGradient id="g" cx="50%" cy="35%" r="75%"><stop offset="0" stop-color="#fff" stop-opacity=".75"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
        <linearGradient id="b" x1="0" x2="1"><stop offset="0" stop-color="${body}"/><stop offset=".7" stop-color="${body}"/><stop offset="1" stop-color="${shade}"/></linearGradient>
      </defs>
      <rect width="900" height="900" fill="${bg}"/><rect width="900" height="900" fill="url(#g)"/>
      <ellipse cx="450" cy="720" rx="260" ry="34" fill="#000" opacity=".12"/>
      <g transform="rotate(${turn} 450 500)">${objects[kind]}</g>
    </svg>`;
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  }

  const shelf: Product[] = [
    {
      id: 'mug',
      title: 'Stoneware mug',
      subtitle: 'Example Studio',
      price: 18,
      rating: 4.8,
      reviews: 212,
      colors: ['#d9cbb3', '#9bb59a', '#2f3640'],
      image: still('mug', '#efe6d8', '#d9cbb3', '#b9a98d'),
      imageAlt: 'A sand-coloured stoneware mug',
    },
    {
      id: 'tote',
      title: 'Canvas tote',
      subtitle: 'Example Studio',
      price: 34,
      compareAt: 42,
      rating: 4.6,
      reviews: 98,
      colors: ['#9bb59a', '#e3d5bd'],
      image: still('tote', '#e4ece2', '#a9c1a7', '#86a284'),
      imageAlt: 'A sage canvas tote bag',
      badge: 'Sale',
    },
    {
      id: 'vase',
      title: 'Ceramic vase',
      subtitle: 'Example Studio',
      price: 46,
      rating: 4.9,
      reviews: 64,
      colors: ['#8fb3d9', '#e3d5bd', '#7b4b6a'],
      image: still('vase', '#e3ebf4', '#9dbbdc', '#7c9cc0'),
      imageAlt: 'A pale blue ceramic vase',
      badge: 'New',
    },
  ];

  const galleryShots: GalleryImage[] = [
    { src: still('mug', '#efe6d8', '#d9cbb3', '#b9a98d'), alt: 'Sand, from the side' },
    { src: still('mug', '#e4ece2', '#a9c1a7', '#86a284', -8), alt: 'Sage, turned' },
    { src: still('mug', '#e3ebf4', '#9dbbdc', '#7c9cc0'), alt: 'Sky, from the side' },
    { src: still('mug', '#ebe4ee', '#a98aa0', '#7b4b6a', 6), alt: 'Plum, turned' },
  ];

  // ── Data ─────────────────────────────────────────────────────────────────────────────
  const orders = [
    { id: 'A-2041', who: 'Ada Example', what: '2 × Linen shirt', sum: '€118.00', on: true },
    { id: 'A-2042', who: 'Ben Sample', what: 'Wool throw, sand', sum: '€89.00', on: true },
    { id: 'A-2043', who: 'Cleo Test', what: 'Canvas tote', sum: '€34.00', on: false },
    { id: 'A-2044', who: 'Dan Demo', what: '3 × Stoneware mug', sum: '€54.00', on: true },
  ];

  const channels = [
    { label: 'Search', value: 4210 },
    { label: 'Direct', value: 2870 },
    { label: 'Newsletter', value: 1640 },
    { label: 'Social', value: 1180 },
    { label: 'Referrals', value: 760 },
  ];

  const hours = energyToday.slice(0, 15).map((value, i) => ({
    label: `${String(i).padStart(2, '0')}:00`,
    value,
  }));

  const sheetColumns = venueColumns.filter((c) =>
    ['name', 'city', 'capacity', 'barrier_free', 'rating'].includes(c.name),
  );

  const kanbanColumns = boardColumns.filter((c) => ['todo', 'doing', 'review'].includes(c.id));
  const kanbanCards = boardCards().filter((c) => ['todo', 'doing', 'review'].includes(c.column));

  const services: { id: string; name: string; detail: string; status: ResourceStatus }[] = [
    {
      id: 'web',
      name: 'Website',
      detail: '3 instances · eu-central',
      status: { label: 'Running', tone: 'live' },
    },
    {
      id: 'api',
      name: 'Public API',
      detail: '12 ms median · 99.98 % this month',
      status: { label: 'Running', tone: 'live' },
    },
    {
      id: 'search',
      name: 'Search index',
      detail: 'Rebuilding 2.1 M documents',
      status: { label: 'Starting', tone: 'info', busy: true },
    },
    {
      id: 'mail',
      name: 'Mail relay',
      detail: 'Paused for maintenance',
      status: { label: 'Paused', tone: 'draft' },
    },
  ];

  const answer = `**Three venues** fit 300 people on a weekday in spring:

- **The old printworks**, 4 min from the station, daylight in every hall.
- **The garden pavilion**, quiet and green, with its own kitchen.
- **The harbour hall**, the largest stage, step-free throughout.`;

  let navRail = $state('energy');
  let range = $state('today');
  let tab = $state('open');
  let from = $state('de');
  let to = $state('en');
  let gallery = $state(1);

  const toasts: ToastItem[] = [
    { id: 1, tone: 'ok', message: 'Sync finished. 128 photos are on every device.' },
    {
      id: 2,
      tone: 'ok',
      message: 'Invoice 2041 deleted.',
      action: { label: 'Undo', onaction: noop },
    },
    { id: 3, tone: 'warn', message: 'Storage is 90 % full. Old backups go first.' },
  ];

  const kpis = [
    { label: 'Orders', value: '1,284', delta: '+12 %', detail: 'vs last week', icon: 'cart' },
    { label: 'Revenue', value: '€38.5k', delta: '+8 %', detail: 'this month', icon: 'chart' },
    { label: 'Visitors', value: '24.1k', delta: '+3 %', detail: 'last 30 days', icon: 'users' },
  ] as const;

  const revenue = Array.from({ length: 30 }, (_, i) => ({
    label: `${i + 1}`,
    value: Math.round((4 + Math.sin(i / 4) * 1.2 + i * 0.06) * 10) / 10,
  }));

  const appTints = ['#5a9854', '#5856d6', '#ff9500'];

  // Caught mid-sentence: the answer is still being written.
  const writing =
    'Three halls fit 300 people and are step-free. The Riverside Hall is the closest, four ' +
    'minutes from the station; the Old Mill has the larger';

  // Leaflet paints with literal colours: hex values, not CSS variables.
  const places: MapMarker[] = [
    {
      lat: 53.5436,
      lon: 9.9914,
      title: 'Harbour office',
      subtitle: 'Headquarters',
      color: '#007aff',
    },
    { lat: 53.5531, lon: 9.993, title: 'City office', subtitle: 'Sales', color: '#007aff' },
    { lat: 53.5627, lon: 9.9628, title: 'North studio', subtitle: 'Design', color: '#af52de' },
    { lat: 53.5528, lon: 9.9482, title: 'West studio', subtitle: 'Video', color: '#af52de' },
    { lat: 53.5375, lon: 9.9705, title: 'Dock warehouse', subtitle: 'Shipping', color: '#ff9500' },
  ];

  const shows = {
    FloatingActions: floatingActions,
    FormSection: formSection,
    GlimmerPanel: glimmerPanel,
    Hero: hero,
    HorizontalBarChart: horizontalBarChart,
    KanbanBoard: kanbanBoard,
    LineChart: lineChart,
    MapView: mapView,
    NavBar: navBar,
    NavRail: navRailS,
    NotificationList: notificationList,
    PricingTable: pricingTable,
    ProductGallery: productGallery,
    ProductGrid: productGrid,
    ResourceList: resourceList,
    ResultPanel: resultPanel,
    Sheet: sheet,
    SideNav: sideNav,
    SiteFooter: siteFooter,
    SplitPane: splitPane,
    StatusCard: statusCard,
    Toaster: toaster,
    AdminLayout: adminLayout,
    Application: application,
    AuthLayout: authLayout,
    Backdrop: backdrop,
    DashboardGrid: dashboardGrid,
    ErrorPage: errorPage,
    Page: page,
    SplitLayout: splitLayout,
  };
</script>

<!-- ── Organisms ───────────────────────────────────────────────────────────────────── -->

{#snippet floatingActions()}
  <div class="w30 stage">
    <Stack gap="sm">
      {#each orders as order (order.id)}
        <Layer
          level={order.on ? 'selected' : 'panel'}
          padding="sm"
          direction="horizontal"
          gap="md"
          align="center"
        >
          <Checkbox checked={order.on} label={order.id} />
          <Stack gap="none">
            <Text weight="semibold" text={order.who} />
            <Text size="sm" tone="muted" text={order.what} />
          </Stack>
          <Spacer />
          <Text weight="semibold" text={order.sum} />
        </Layer>
      {/each}
    </Stack>
    <FloatingActions bar align="center" label="Selection" offset="0">
      <Badge tone="accent" size="lg" label="3 selected" />
      <Button variant="ghost" shape="pill" label="Clear" />
      <Button variant="secondary" shape="pill" icon="download" label="Export" />
      <Button variant="danger" shape="pill" icon="trash" label="Delete" />
    </FloatingActions>
  </div>
{/snippet}

{#snippet formSection()}
  <div class="w36">
    <Card>
      <FormSection title="Profile" description="Shown to everyone in your workspace.">
        <Field label="Display name">
          {#snippet children({ id })}<Input {id} value="Ada Example" />{/snippet}
        </Field>
        <Field label="E-mail" hint="We send sign-in links here.">
          {#snippet children({ id })}<Input {id} type="email" value="ada@example.com" />{/snippet}
        </Field>
      </FormSection>
      <FormSection title="Notifications" description="How we tell you about new activity.">
        <Switch label="E-mail summary" description="Once a day, at eight" checked />
        <Switch label="Browser notifications" />
        {#snippet footer()}<Button variant="primary" label="Save changes" />{/snippet}
      </FormSection>
    </Card>
  </div>
{/snippet}

{#snippet heroActions()}
  <Button variant="primary" size="lg" shape="pill" label="Start for free" shimmer />
  <Button variant="soft" size="lg" shape="pill" icon="play" label="Watch the tour" />
{/snippet}
{#snippet hero()}
  <div class="w44">
    <Hero
      eyebrow="New · Smart suggestions"
      title="Plan, write and ship together"
      highlight="together"
      text="One calm place for your team’s projects, docs and decisions. Fast on every device, private by default."
      actions={heroActions}
      backdrop
      heading={2}
    >
      Free for individuals · No card needed
    </Hero>
  </div>
{/snippet}

{#snippet horizontalBarChart()}
  <div class="w32">
    <ChartCard title="Where visitors come from" sub="Last 30 days" value="10,660">
      <HorizontalBarChart data={channels} height={230} countLabel="Visits" color="var(--accent)" />
    </ChartCard>
  </div>
{/snippet}

{#snippet kanbanBoard()}
  <div class="w48">
    <KanbanBoard
      columns={kanbanColumns}
      cards={kanbanCards}
      selected="c6"
      columnWidth="15rem"
      now={NOW}
      label="Sprint board"
    />
  </div>
{/snippet}

{#snippet lineChart()}
  <div class="w32">
    <ChartCard title="Energy today" sub="Every hour until now" value="11.9 kWh">
      {#snippet actions()}
        <SegmentedControl
          label="Range"
          size="sm"
          bind:value={range}
          options={[
            { value: 'today', label: 'Today' },
            { value: 'week', label: 'Week' },
          ]}
        />
      {/snippet}
      <LineChart
        data={hours}
        min={0}
        max={1.6}
        ticks={[0, 0.5, 1, 1.5]}
        height={220}
        area
        color="var(--accent)"
        valueLabel="kWh"
      />
    </ChartCard>
  </div>
{/snippet}

{#snippet navActions()}
  <Button variant="ghost" shape="pill" label="Sign in" />
  <Button variant="primary" shape="pill" label="Get started" />
{/snippet}
{#snippet navBar()}
  <div class="w50">
    <Stack gap="xl">
      <NavBar brand="Example Planner" links={siteLinks.slice(0, 4)} actions={navActions} />
      <div class="nav-copy">
        <Text size="sm" tone="muted" text="Product" />
        <h2 class="display">A calm place for busy teams</h2>
        <p class="lead">Projects, docs and decisions in one place. Fast on every device.</p>
      </div>
    </Stack>
  </div>
{/snippet}

{#snippet navRailS()}
  <NavRail
    orientation="horizontal"
    label="Home"
    bind:current={navRail}
    items={[
      { id: 'home', label: 'Home', icon: 'home' },
      { id: 'rooms', label: 'Rooms', icon: 'layout' },
      { id: 'energy', label: 'Energy', icon: 'bolt' },
      { id: 'security', label: 'Security', icon: 'shield' },
    ]}
  />
{/snippet}

{#snippet notificationList()}
  <div class="w30">
    <Layer level="panel" padding="md">
      <NotificationList items={notifications()} title="Notifications" now={NOW} />
    </Layer>
  </div>
{/snippet}

{#snippet pricingTable()}
  <div class="w52">
    <PricingTable {plans} currency="EUR" billing="yearly" min="15rem" />
  </div>
{/snippet}

{#snippet productGallery()}
  <div class="w26">
    <ProductGallery images={galleryShots} bind:index={gallery} aspect="1" label="Stoneware mug" />
  </div>
{/snippet}

{#snippet productGrid()}
  <div class="w44">
    <ProductGrid
      products={shelf}
      columns={3}
      min="12rem"
      currency="EUR"
      aspect="1"
      wishlist={['vase']}
      onadd={noop}
      onwishlist={noop}
    />
  </div>
{/snippet}

{#snippet serviceActions()}
  <Button variant="ghost" size="sm" icon="more" label="More" iconOnly />
{/snippet}
{#snippet resourceList()}
  <div class="w34">
    <ResourceList
      items={services}
      key={(s) => s.id}
      title={(s) => s.name}
      meta={(s) => s.detail}
      status={(s) => s.status}
      actions={serviceActions}
      label="Services"
    />
  </div>
{/snippet}

{#snippet glimmerPanel()}
  <div class="w34">
    <GlimmerPanel working aria-label="Answer">
      <Row justify="between" align="center">
        <span class="glim-eyebrow"><Icon name="sparkles" size={14} /> Answer</span>
        <StatusText busy message="Writing…" />
      </Row>
      <p class="glim-text">{writing}<span class="glim-caret"></span></p>
    </GlimmerPanel>
  </div>
{/snippet}

{#snippet mapView()}
  <div style="width: 52rem">
    <Card title="Locations" padding="sm">
      <Stack gap="sm" style="height: 36rem">
        <Legend
          items={[
            { label: 'Office', color: '#007aff' },
            { label: 'Studio', color: '#af52de' },
            { label: 'Warehouse', color: '#ff9500' },
          ]}
        />
        <Stack grow><MapView markers={places} label="Our locations" /></Stack>
      </Stack>
    </Card>
  </div>
{/snippet}

{#snippet done()}<StatusText tone="ok" message="Done" />{/snippet}
{#snippet resultPanel()}
  <div class="w34">
    <ResultPanel status="ready" title="Venues for 300 people" copyValue={answer} headerEnd={done}>
      <Markdown source={answer} size="sm" />
    </ResultPanel>
  </div>
{/snippet}

{#snippet sheetTools()}<Badge tone="live" label="Editable" />{/snippet}
{#snippet sheetFooter()}
  <Text size="sm" tone="muted" text="8 venues · Enter edits a cell, Esc leaves it" />
{/snippet}
{#snippet sheet()}
  <div class="w46 sheet">
    <Sheet
      title="Venues"
      about="Edit the list in place. Every change saves itself."
      tools={sheetTools}
      footer={sheetFooter}
    >
      <EditableGrid columns={sheetColumns} rows={venueRows()} oncommit={noop} label="Venues" />
    </Sheet>
  </div>
{/snippet}

{#snippet sideNav()}
  <div class="w18">
    <SideNav groups={navGroups('insights')} orientation="vertical" level="panel" label="Sections" />
  </div>
{/snippet}

{#snippet siteFooter()}
  <div class="w56">
    <SiteFooter
      brand="Example Planner"
      tagline="One calm place for your team’s projects, docs and decisions."
      columns={footerColumns}
      social={socialLinks}
      legal={legalLinks}
      finePrint="© 2026 Example Ltd."
      level="panel"
    />
  </div>
{/snippet}

{#snippet startHeader()}
  <Select
    aria-label="From"
    bind:value={from}
    options={[
      { value: 'de', label: 'German' },
      { value: 'fr', label: 'French' },
    ]}
  />
  <StatusText message="detected" />
{/snippet}
{#snippet endHeader()}
  <!-- The target language at the far edge: the two selects frame the swap between them. -->
  <Spacer />
  <Select
    aria-label="To"
    bind:value={to}
    options={[
      { value: 'en', label: 'English' },
      { value: 'es', label: 'Spanish' },
    ]}
  />
{/snippet}
{#snippet startPane()}
  <Textarea
    variant="plain"
    value="Guten Morgen! Der Saal ist ab neun Uhr frei, der Kaffee steht schon bereit."
    rows={5}
    counter
    limit={500}
    aria-label="Text"
  />
{/snippet}
{#snippet endPane()}
  <div class="pane-out">
    <Text
      size="lg"
      text="Good morning! The hall is free from nine, and the coffee is already waiting."
    />
  </div>
{/snippet}
{#snippet splitPane()}
  <div class="w42">
    <SplitPane
      label="Translator"
      onswap={noop}
      {startHeader}
      {endHeader}
      start={startPane}
      end={endPane}
      minHeight="11rem"
    />
  </div>
{/snippet}

{#snippet statusCard()}
  <div class="w24">
    <StatusCard
      status="success"
      title="Welcome back, Ada"
      message="Everything is where you left it. Taking you to your dashboard."
    />
  </div>
{/snippet}

{#snippet toaster()}
  <div class="screen screen--toast">
    <div class="behind">
      <Stack gap="md">
        <Text size="lg" weight="semibold" text="Invoices" />
        {#each ['Invoice 2038 · paid', 'Invoice 2039 · paid', 'Invoice 2040 · sent'] as line (line)}
          <Layer level="panel" padding="sm"><Text text={line} /></Layer>
        {/each}
      </Stack>
    </div>
    <Toaster {toasts} placement="bottom-end" offset="20px" />
  </div>
{/snippet}

<!-- ── Templates ───────────────────────────────────────────────────────────────────── -->

{#snippet refresh()}<Button variant="soft" shape="pill" icon="refresh" label="Refresh" />{/snippet}
{#snippet adminLayout()}
  <div class="screen screen--lg">
    <Application contained>
      <AdminLayout title="Insights" subtitle="last 30 days" actions={refresh}>
        {#snippet sidebar()}<SideNav
            groups={navGroups('insights')}
            orientation="vertical"
          />{/snippet}
        <DashboardGrid label="Key figures" min="9rem">
          <KpiTile label="Orders" value="1,234" delta="+12 %" detail="30 days" />
          <KpiTile label="Revenue" value="€48.2k" delta="+4 %" detail="after refunds" />
          <KpiTile label="Rating" value="4.6" detail="280 reviews" />
        </DashboardGrid>
        <ChartCard title="Revenue per day" sub="in thousand euros">
          <LineChart
            data={revenue}
            min={0}
            max={8}
            ticks={[0, 4, 8]}
            height={150}
            area
            color="var(--accent)"
          />
        </ChartCard>
      </AdminLayout>
    </Application>
  </div>
{/snippet}

{#snippet application()}
  <div class="apps">
    {#each appTints as tint, i (tint)}
      <div class="screen screen--app">
        <Application contained {tint} theme={i === 1 ? 'dark' : 'light'}>
          <div class="app-body">
            <Stack gap="md">
              <Text size="lg" weight="semibold" text={['Orders', 'Music', 'Garden'][i] ?? ''} />
              <SegmentedControl
                label="View"
                size="sm"
                value="a"
                options={[
                  { value: 'a', label: 'Day' },
                  { value: 'b', label: 'Week' },
                ]}
              />
              <Switch checked label="Notify me" />
              <KpiTile label="Today" value={['128', '3 h 12', '18 °C'][i] ?? ''} delta="+6 %" />
              <Button variant="primary" shape="pill" icon="plus" label="New" />
            </Stack>
          </div>
        </Application>
      </div>
    {/each}
  </div>
{/snippet}

{#snippet authLayout()}
  <div class="screen screen--lg screen--tall">
    <Application contained>
      <AuthLayout title="Sign in" background="url({photoBackdrop})" cardWidth="340px">
        <Stack gap="md">
          <Field label="E-mail">
            {#snippet children({ id })}<Input {id} type="email" value="ada@example.com" />{/snippet}
          </Field>
          <Field label="Password">
            {#snippet children({ id })}<Input
                {id}
                type="password"
                value="correct horse"
              />{/snippet}
          </Field>
          <Button variant="primary" block label="Sign in" />
        </Stack>
      </AuthLayout>
    </Application>
  </div>
{/snippet}

{#snippet backdrop()}
  <div class="drop" data-tint="" data-theme="light" style:--tint="#ff2d55">
    <Backdrop position="contained" />
    <div class="drop-body">
      <Stack gap="xs">
        <Text size="sm" tone="muted" text="Ground" />
        <span class="drop-title">Good morning, Ada</span>
      </Stack>
      <!-- Straight on the ground: the screen is the surface, never a panel on a panel. -->
      <div class="drop-card">
        <KpiTile label="Steps today" value="8,412" delta="+14 %" detail="vs yesterday" />
      </div>
      <span class="drop-label">tint mesh · light from above</span>
    </div>
  </div>
{/snippet}

{#snippet dashboardGrid()}
  <div class="w48">
    <Stack gap="lg">
      <DashboardGrid label="Key figures" min="10rem">
        {#each kpis as k (k.label)}
          <KpiTile
            label={k.label}
            value={k.value}
            delta={k.delta}
            detail={k.detail}
            icon={k.icon}
          />
        {/each}
      </DashboardGrid>
      <DashboardGrid variant="charts" label="Trends">
        <ChartCard title="Revenue per day" sub="in thousand euros">
          <LineChart
            data={revenue}
            min={0}
            max={8}
            ticks={[0, 4, 8]}
            height={140}
            area
            color="var(--accent)"
          />
        </ChartCard>
        <ChartCard title="Channels" sub="last 30 days">
          <HorizontalBarChart data={channels.slice(0, 4)} height={140} />
        </ChartCard>
      </DashboardGrid>
    </Stack>
  </div>
{/snippet}

{#snippet lost()}
  <div class="lost"><Icon name="compass" size={88} /></div>
{/snippet}
{#snippet errorPage()}
  <div class="screen screen--lg">
    <Application contained>
      <ErrorPage
        code={404}
        description="This page moved or never existed. The rest of the site is right where you left it."
        homeHref="#home"
        onback={noop}
        illustration={lost}
      />
    </Application>
  </div>
{/snippet}

{#snippet newOrder()}
  <Button variant="primary" shape="pill" icon="plus" label="New order" />
{/snippet}
{#snippet pageNav()}
  <Tabs
    label="Orders"
    bind:value={tab}
    tabs={[
      { value: 'open', label: 'Open', count: 24 },
      { value: 'shipped', label: 'Shipped' },
      { value: 'returns', label: 'Returns' },
    ]}
  />
{/snippet}
{#snippet page()}
  <div class="screen screen--lg">
    <Application contained>
      <Page title="Orders" subtitle="what ships today" actions={newOrder} nav={pageNav} gap="md">
        <Grid min="9rem" gap="md">
          <KpiTile label="Open" value={24} delta="+3" trend="up" />
          <KpiTile label="Shipped" value={118} delta="+12 %" trend="up" />
          <KpiTile label="Returns" value={3} delta="−1" trend="down" goodWhen="down" />
        </Grid>
        <Layer level="panel" padding="sm" gap="xs">
          {#each orders.slice(0, 3) as order (order.id)}
            <Row gap="md" align="center">
              <Avatar name={order.who} size={30} />
              <Stack gap="none">
                <Text weight="semibold" text={order.who} />
                <Text size="sm" tone="muted" text={order.what} />
              </Stack>
              <Spacer />
              <Badge tone="live" label="Ready" />
            </Row>
          {/each}
        </Layer>
      </Page>
    </Application>
  </div>
{/snippet}

{#snippet splitLayout()}
  <div class="w40">
    <SplitLayout asideWidth="15rem">
      {#snippet aside()}
        <Card title="Question">
          <Stack gap="md">
            <Textarea
              value="Venues in the city for 300 people, step-free, near the station."
              rows={4}
              aria-label="Question"
            />
            <Button variant="primary" icon="sparkles" label="Ask" />
          </Stack>
        </Card>
      {/snippet}
      <ResultPanel status="ready" title="Answer" headerEnd={done}>
        <Markdown source={answer} size="sm" />
      </ResultPanel>
    </SplitLayout>
  </div>
{/snippet}

{#snippet preview(name: string)}<PreviewLarge {name} fallback={empty} />{/snippet}
{#snippet empty()}<span></span>{/snippet}

<Studio levels={['Organisms', 'Templates']} {names} {shows} {meta} {preview} />

<style>
  .w18 {
    width: 18rem;
  }
  .w24 {
    width: 24rem;
  }
  .w26 {
    width: 26rem;
  }
  .w30 {
    width: 30rem;
  }
  .w32 {
    width: 32rem;
  }
  .glim-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    font-size: var(--fs-xs);
    font-weight: var(--fw-semibold);
    letter-spacing: var(--tracking-caps);
    text-transform: uppercase;
    color: var(--accent-ink);
  }
  .glim-text {
    margin: 0;
    line-height: 1.55;
  }
  .glim-caret {
    display: inline-block;
    width: 2px;
    height: 1.05em;
    margin-inline-start: 3px;
    vertical-align: text-bottom;
    background: var(--accent);
  }
  .w34 {
    width: 34rem;
  }
  .w36 {
    width: 36rem;
  }
  .w40 {
    width: 40rem;
  }
  .w42 {
    width: 42rem;
  }
  .w44 {
    width: 44rem;
  }
  .w46 {
    width: 46rem;
  }
  .w48 {
    width: 48rem;
  }
  .w50 {
    width: 50rem;
  }
  .w56 {
    width: 56rem;
  }
  .w52 {
    width: 52rem;
  }
  .stage {
    display: grid;
    gap: var(--space-6);
  }
  .display {
    margin: 0;
    font-size: 2.6rem;
    line-height: 1.1;
    letter-spacing: -0.02em;
    color: var(--text);
  }
  .lead {
    margin: 0;
    max-width: 30rem;
    font-size: var(--fs-lg);
    color: var(--text-2);
  }
  .nav-copy {
    display: grid;
    gap: var(--space-2);
    padding-inline: var(--space-6);
  }
  .sheet {
    height: 28rem;
    display: grid;
  }
  .pane-out {
    padding: var(--space-4);
  }
  /* A small screen: its own scroll box, and fixed children (toasts) stay inside it. */
  .screen {
    position: relative;
    overflow: clip;
    border-radius: var(--radius-card);
    border: 1px solid var(--border-strong);
    box-shadow: var(--shadow-dialog);
    transform: translateZ(0);
  }
  .screen--lg {
    width: 52rem;
    height: 36rem;
  }
  .screen--tall {
    height: 40rem;
  }
  .screen--toast {
    width: 36rem;
    height: 28rem;
    background: var(--bg);
  }
  .behind {
    padding: var(--space-6);
    opacity: 0.8;
  }
  .apps {
    display: flex;
    gap: var(--space-5);
  }
  .screen--app {
    width: 14rem;
    height: 25rem;
  }
  .app-body {
    padding: var(--space-5);
  }
  .drop {
    position: relative;
    isolation: isolate;
    width: 40rem;
    height: 28rem;
    border-radius: var(--radius-card);
    overflow: clip;
    border: 1px solid var(--border);
    box-shadow: var(--shadow-dialog);
  }
  .drop-body {
    position: relative;
    display: grid;
    align-content: space-between;
    height: 100%;
    padding: var(--space-8);
  }
  .drop-title {
    font-size: 2rem;
    font-weight: var(--fw-bold);
    letter-spacing: -0.02em;
  }
  .drop-card {
    width: 16rem;
  }
  .drop-label {
    font-family: var(--font-mono);
    font-size: var(--fs-sm);
    color: var(--text-2);
  }
  /* AuthLayout fills the viewport; in a contained preview it fills the preview instead. */
  .screen :global(.auth),
  .screen :global(.error-page) {
    min-height: 100%;
  }
  .lost {
    display: grid;
    place-items: center;
    width: 13rem;
    aspect-ratio: 1;
    margin-inline: auto;
    border-radius: 50%;
    color: var(--accent-ink);
    background: radial-gradient(circle at 35% 30%, var(--accent-faint), var(--accent-soft));
    border: 1px solid var(--accent-border);
    box-shadow: var(--shadow-pop);
  }
</style>
