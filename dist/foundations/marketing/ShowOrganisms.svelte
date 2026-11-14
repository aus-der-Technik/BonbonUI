<script module lang="ts">
  import type { Meta } from './looks';

  export const names = [
    'ActivityLog',
    'AppHeader',
    'CallToAction',
    'CartSummary',
    'ChartCard',
    'CommentThread',
    'ConfirmDialog',
    'DataTable',
    'DetailPanel',
    'Dialog',
    'DivergingBarChart',
    'Drawer',
    'EditableGrid',
    'Faq',
    'FeatureGrid',
    'FeedbackDialog',
  ] as const;

  export const meta: Record<string, Meta> = {
    ActivityLog: { zoom: 1.55, note: 'Who did what, and when' },
    AppHeader: { zoom: 1.35, note: 'The title pill and its actions' },
    CallToAction: { zoom: 1.4, note: 'One clear next step' },
    CartSummary: { zoom: 1.2, note: 'Totals that explain themselves' },
    ChartCard: { zoom: 1.3, note: 'A chart with its headline figure' },
    CommentThread: { zoom: 1.4, note: 'A discussion on one passage' },
    ConfirmDialog: { zoom: 1.45, note: 'A pause before what cannot be undone' },
    DataTable: { zoom: 1.25, note: 'Pick rows, act on them together' },
    DetailPanel: { zoom: 1.25, note: 'The record, beside the list' },
    Dialog: { zoom: 1.45, note: 'Glass that floats over the page' },
    DivergingBarChart: { zoom: 1.3, note: 'For and against, day by day' },
    Drawer: { zoom: 1.25, note: 'Slides in from the edge' },
    EditableGrid: { zoom: 1.2, note: 'Edit a cell where it sits' },
    Faq: { zoom: 1.45, note: 'Questions, answered in place' },
    FeatureGrid: { zoom: 1.3, note: 'What it does, at a glance' },
    FeedbackDialog: { zoom: 1.3, note: 'Thumbs, stars and a word' },
  };
  export const skip: Record<string, string> = {};

  export interface Member {
    id: string;
    name: string;
    email: string;
    role: string;
    status: 'Active' | 'Invited';
  }

  /** Shown in place: these open as a plain (non-modal) dialog so the scene's scale applies. */
  const inPlace = ['Dialog', 'ConfirmDialog', 'FeedbackDialog', 'Drawer'];
</script>

<script lang="ts">
  /** Local only (not in git): one square per organism, ActivityLog to FeedbackDialog. */
  import type { Snippet } from 'svelte';
  import Studio from './Studio.svelte';
  import PreviewLarge from '../explore/PreviewLarge.svelte';
  import { lookFor, readQuery } from './looks';
  import Application from '../../patterns/templates/Application.svelte';
  import Grid from '../../patterns/layout/Grid.svelte';
  import Stack from '../../patterns/layout/Stack.svelte';
  import Section from '../../patterns/layout/Section.svelte';
  import Badge from '../../patterns/atoms/Badge.svelte';
  import Button from '../../patterns/atoms/Button.svelte';
  import Card from '../../patterns/atoms/Card.svelte';
  import Heading from '../../patterns/atoms/Heading.svelte';
  import Image from '../../patterns/atoms/Image.svelte';
  import Text from '../../patterns/atoms/Text.svelte';
  import CartLine from '../../patterns/molecules/CartLine.svelte';
  import ConfirmButton from '../../patterns/molecules/ConfirmButton.svelte';
  import DetailHeader from '../../patterns/molecules/DetailHeader.svelte';
  import DetailList from '../../patterns/molecules/DetailList.svelte';
  import IdentityCell from '../../patterns/molecules/IdentityCell.svelte';
  import KpiTile from '../../patterns/molecules/KpiTile.svelte';
  import SegmentedControl from '../../patterns/molecules/SegmentedControl.svelte';
  import ActivityLog from '../../patterns/organisms/ActivityLog.svelte';
  import Page from '../../patterns/templates/Page.svelte';
  import CallToAction from '../../patterns/organisms/CallToAction.svelte';
  import CartSummary from '../../patterns/organisms/CartSummary.svelte';
  import ChartCard from '../../patterns/organisms/ChartCard.svelte';
  import CommentThread from '../../patterns/organisms/CommentThread.svelte';
  import ConfirmDialog from '../../patterns/organisms/ConfirmDialog.svelte';
  import DataTable, { type Column } from '../../patterns/organisms/DataTable.svelte';
  import DetailPanel from '../../patterns/organisms/DetailPanel.svelte';
  import Dialog from '../../patterns/organisms/Dialog.svelte';
  import DivergingBarChart from '../../patterns/organisms/DivergingBarChart.svelte';
  import Drawer from '../../patterns/organisms/Drawer.svelte';
  import EditableGrid from '../../patterns/organisms/EditableGrid.svelte';
  import Faq from '../../patterns/organisms/Faq.svelte';
  import FeatureGrid from '../../patterns/organisms/FeatureGrid.svelte';
  import FeedbackDialog from '../../patterns/organisms/FeedbackDialog.svelte';
  import LineChart from '../../patterns/organisms/LineChart.svelte';
  import { boardActivity, NOW, threadComments } from '../../demo/mock-collab';
  import { faqs, features, photo } from '../../demo/mock-shop';
  import { dailyStats, toDiverging, venueColumns, venueRows } from '../../demo/mock';

  const q = readQuery();
  const current = q.mk && q.mk !== '__list' ? q.mk : names[0];
  const look = {
    tint: q.tint ?? meta[current]?.tint ?? lookFor(current).tint,
    theme: q.theme ?? meta[current]?.theme ?? lookFor(current).theme,
  };

  // A modal <dialog> lives in the top layer, where the scene's scale does not reach. Without
  // showModal the components fall back to the open attribute: the same dialog, in place.
  if (inPlace.includes(current) && typeof HTMLDialogElement !== 'undefined') {
    Object.defineProperty(HTMLDialogElement.prototype, 'showModal', {
      value: undefined,
      configurable: true,
    });
  }

  const noop = () => {};

  const shows: Record<string, Snippet> = {
    ActivityLog: activityLog,
    AppHeader: appHeader,
    CallToAction: callToAction,
    CartSummary: cartSummary,
    ChartCard: chartCard,
    CommentThread: commentThread,
    ConfirmDialog: confirmDialog,
    DataTable: dataTable,
    DetailPanel: detailPanel,
    Dialog: dialog,
    DivergingBarChart: divergingBarChart,
    Drawer: drawer,
    EditableGrid: editableGrid,
    Faq: faq,
    FeatureGrid: featureGrid,
    FeedbackDialog: feedbackDialog,
  };

  // ── Data ──────────────────────────────────────────────────────────────────────────────
  const activity = [
    ...boardActivity.slice(0, 3),
    {
      id: 'a9',
      actor: 'Priya Raman',
      action: 'archived',
      target: 'Old onboarding checklist',
      at: new Date(NOW.getTime() - 60 * 60_000 * 8),
      tone: 'danger' as const,
    },
  ];

  // Picsum by seed: these two seeds happen to show kitchen things.
  const cart = [
    {
      id: 'mugs',
      title: 'Enamel mug set',
      meta: 'Cream · set of 4',
      price: 36,
      quantity: 1,
      image: photo('cotton', 200, 200),
    },
    {
      id: 'skillet',
      title: 'Cast-iron skillet',
      meta: '26 cm',
      price: 59,
      quantity: 1,
      image: photo('dune', 200, 200),
    },
  ];

  const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const visits = [32, 41, 38, 47, 52, 45, 58, 61, 55, 66, 72, 68, 79, 84].map((value, i) => ({
    label: `${weekdays[i % 7]}`,
    value,
  }));
  let range = $state('14');

  const votes = toDiverging(dailyStats(14));

  const members: Member[] = [
    {
      id: 'u1',
      name: 'Mara Lindqvist',
      email: 'mara@example.com',
      role: 'Owner',
      status: 'Active',
    },
    { id: 'u2', name: 'Jonas Weber', email: 'jonas@example.com', role: 'Admin', status: 'Active' },
    { id: 'u3', name: 'Priya Raman', email: 'priya@example.com', role: 'Editor', status: 'Active' },
    { id: 'u4', name: 'Leo Okafor', email: 'leo@example.com', role: 'Viewer', status: 'Invited' },
    { id: 'u5', name: 'Sofia Marin', email: 'sofia@example.com', role: 'Editor', status: 'Active' },
  ];
  const memberColumns: Column[] = [
    { key: 'name', label: 'Member' },
    { key: 'role', label: 'Role' },
    { key: 'status', label: 'Status', align: 'end' },
  ];
  let picked = $state<string[]>(['u2', 'u3']);

  const gridColumns = ['name', 'city', 'capacity', 'rating', 'barrier_free'].flatMap(
    (n) => venueColumns.find((c) => c.name === n) ?? [],
  );
  const gridRows = venueRows().slice(0, 6);

  const orders = [
    {
      id: '#10421',
      who: 'Ada Example',
      what: '2 items · €95.00',
      tone: 'live' as const,
      s: 'Paid',
    },
    { id: '#10422', who: 'Ben Sample', what: '1 item · €59.00', tone: 'draft' as const, s: 'Open' },
    { id: '#10423', who: 'Cleo Test', what: '4 items · €212.40', tone: 'live' as const, s: 'Paid' },
    { id: '#10424', who: 'Dan Demo', what: '3 items · €48.90', tone: 'draft' as const, s: 'Open' },
  ];
</script>

<!-- A small screen: its own backdrop, a page behind, a scrim, and what floats over it. -->
{#snippet screen(behind: Snippet, front: Snippet, scrim: boolean)}
  <div class="screen">
    <Application contained tint={look.tint} theme={look.theme} density="comfortable">
      <div class="page">{@render behind()}</div>
      {#if scrim}<div class="scrim"></div>{/if}
      {@render front()}
    </Application>
  </div>
{/snippet}

{#snippet orderList()}
  <Stack gap="md">
    <Heading level={3} eyebrow="Today" text="Orders" />
    <Card padding="sm">
      <Stack gap="none">
        {#each orders as o (o.id)}
          <div class="order">
            <IdentityCell name={o.who} subtitle="{o.id} · {o.what}" size={32} />
            <Badge tone={o.tone} size="sm" label={o.s} />
          </div>
        {/each}
      </Stack>
    </Card>
  </Stack>
{/snippet}

{#snippet kpiPage()}
  <Stack gap="lg">
    <Heading level={3} eyebrow="This week" text="Overview" />
    <Grid columns={3} min="8rem" gap="lg">
      <KpiTile label="Orders" value="1,284" delta="+12 %" detail="vs last week" />
      <KpiTile label="Revenue" value="€38.5k" delta="+8 %" detail="this month" />
      <KpiTile label="Rating" value="4.8" detail="312 reviews" />
    </Grid>
    <Card padding="md">
      <LineChart
        data={visits}
        min={20}
        max={90}
        ticks={[30, 60, 90]}
        height={150}
        area
        label="Visits"
      />
    </Card>
  </Stack>
{/snippet}

{#snippet shopPage()}
  <Stack gap="md">
    <Heading level={3} eyebrow="New in" text="Prints of quiet places" />
    <Grid columns={3} min="6rem" gap="md">
      {#each ['linen', 'stone', 'tea'] as seed (seed)}
        <Image src={photo(seed, 400, 500)} alt="" ratio="4/5" radius="card" lazy={false} />
      {/each}
    </Grid>
  </Stack>
{/snippet}

<!-- ── Arrangements ───────────────────────────────────────────────────────────────────── -->

{#snippet activityLog()}
  <div class="w30">
    <Card title="Activity" headingLevel={3} padding="lg">
      <ActivityLog entries={activity} />
    </Card>
  </div>
{/snippet}

{#snippet appHeader()}
  {#snippet behind()}
    <!-- Page draws the AppHeader, so the pill, the button and the figures share its edges. -->
    <Page title="Orders" subtitle="what ships today">
      {#snippet actions()}
        <Button variant="primary" shape="pill" size="lg" icon="plus" label="New order" />
      {/snippet}
      <Grid columns={3} gap="lg">
        <KpiTile label="To pack" value="38" delta="+6" detail="since 8 am" />
        <KpiTile label="Shipped" value="112" delta="+14 %" detail="vs yesterday" />
        <KpiTile label="Late" value="2" delta={-3} goodWhen="down" deltaLabel="vs yesterday" />
      </Grid>
    </Page>
  {/snippet}
  {#snippet none()}{/snippet}
  <div class="screen-size screen-size--short">{@render screen(behind, none, false)}</div>
{/snippet}

{#snippet callToAction()}
  <div class="w40">
    <CallToAction
      eyebrow="Start today"
      title="Ready when you are"
      text="Pick one tint. Every accent, focus ring and glow follows it, in light and in dark."
    >
      {#snippet actions()}
        <Button variant="primary" size="lg" label="Start free" />
        <Button variant="soft" size="lg" icon="play" label="Watch the tour" />
      {/snippet}
      <Text size="sm" tone="muted" text="Free for one person. No card needed." />
    </CallToAction>
  </div>
{/snippet}

{#snippet cartSummary()}
  <div class="w26">
    <CartSummary
      subtotal={95}
      shipping={4.9}
      discount={9.5}
      discountCode="SPRING10"
      freeShippingFrom={150}
      note="Secure payment · 30-day returns"
      oncheckout={noop}
      onremovediscount={noop}
    >
      {#each cart as item (item.id)}
        <CartLine
          title={item.title}
          meta={item.meta}
          price={item.price}
          quantity={item.quantity}
          image={item.image}
          onquantity={noop}
          onremove={noop}
        />
      {/each}
    </CartSummary>
  </div>
{/snippet}

{#snippet chartCard()}
  <div class="w40">
    <ChartCard
      level="panel"
      title="Visits"
      sub="Last 14 days"
      value="798"
      legend={[{ label: 'Visits', color: 'var(--accent)' }]}
    >
      {#snippet actions()}
        <SegmentedControl
          size="sm"
          label="Range"
          bind:value={range}
          options={[
            { value: '7', label: '7 d' },
            { value: '14', label: '14 d' },
            { value: '30', label: '30 d' },
          ]}
        />
      {/snippet}
      <LineChart
        data={visits}
        min={20}
        max={90}
        ticks={[30, 60, 90]}
        height={240}
        area
        color="var(--accent)"
        valueLabel="Visits"
        label="Visits per day"
      />
    </ChartCard>
  </div>
{/snippet}

{#snippet commentThread()}
  <div class="w28">
    <CommentThread
      quote="We ship the new onboarding early next year."
      comments={threadComments}
      now={NOW}
      active
      canReply
      onreply={noop}
      onresolve={noop}
    />
  </div>
{/snippet}

{#snippet confirmDialog()}
  {#snippet front()}
    <ConfirmDialog
      open
      title="Delete three orders?"
      message="They leave the list for everyone on the team. This cannot be undone."
      confirmLabel="Delete orders"
      onconfirm={noop}
      onclose={noop}
    />
  {/snippet}
  <div class="screen-size screen-size--narrow">{@render screen(orderList, front, true)}</div>
{/snippet}

{#snippet dataTable()}
  <div class="w42">
    <Card padding="lg">
      <Section title="Members" description="Pick members to act on them together">
        <DataTable
          columns={memberColumns}
          rows={members}
          rowKey={(m) => m.id}
          cell={memberCell}
          selectable
          bind:selected={picked}
          selectRowLabel={(m) => `Select ${m.name}`}
        >
          {#snippet selectionActions()}
            <Button size="sm" variant="primary" icon="send" label="Send reminder" />
            <ConfirmButton size="sm" icon="trash" label="Remove" onconfirm={noop} />
          {/snippet}
        </DataTable>
      </Section>
    </Card>
  </div>
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

{#snippet detailPanel()}
  {#snippet front()}
    <DetailPanel
      labelledby="mk-detail"
      itemKey="mara"
      onclose={noop}
      onprevious={noop}
      onnext={noop}
    >
      <Stack gap="lg">
        <DetailHeader titleId="mk-detail" title="Mara Lindqvist" subtitle="Owner · Design">
          {#snippet badge()}<Badge tone="live" size="sm" label="Online" />{/snippet}
          {#snippet actions()}<Button variant="soft" size="sm" icon="edit" label="Edit" />{/snippet}
        </DetailHeader>
        <DetailList
          items={[
            { label: 'Email', value: 'mara@example.com' },
            { label: 'Team', value: 'Design' },
            { label: 'Joined', value: 'March 2024' },
            { label: 'Member id', value: 'usr_8f2k1', mono: true },
          ]}
        />
      </Stack>
      {#snippet footer()}Updated 12 minutes ago{/snippet}
    </DetailPanel>
  {/snippet}
  {#snippet behind()}
    <Stack gap="md">
      <Heading level={3} eyebrow="Workspace" text="People" />
      <Card padding="sm">
        <Stack gap="none">
          {#each members as m (m.id)}
            <div class="order"><IdentityCell name={m.name} subtitle={m.email} size={32} /></div>
          {/each}
        </Stack>
      </Card>
    </Stack>
  {/snippet}
  <div class="screen-size screen-size--wide">{@render screen(behind, front, false)}</div>
{/snippet}

{#snippet dialog()}
  {#snippet front()}
    <Dialog
      open
      title="Discard changes?"
      intro="Three cells have not been saved yet."
      onclose={noop}
    >
      <Text text="They will be lost if you switch to another data set now." />
      {#snippet actions()}
        <Button label="Keep editing" />
        <Button variant="danger-solid" label="Discard" />
      {/snippet}
    </Dialog>
  {/snippet}
  <div class="screen-size screen-size--narrow">{@render screen(kpiPage, front, true)}</div>
{/snippet}

{#snippet divergingBarChart()}
  <div class="w40">
    <ChartCard
      level="panel"
      title="Votes per day"
      sub="Thumbs up and down, last 14 days"
      legend={[
        { label: 'Helpful', color: 'var(--up)' },
        { label: 'Not helpful', color: 'var(--down)' },
      ]}
    >
      <DivergingBarChart data={votes} height={260} label="Votes per day" />
    </ChartCard>
  </div>
{/snippet}

{#snippet drawer()}
  {#snippet front()}
    <Drawer open title="Your cart" subtitle="2 items · ready to ship" width="22rem" onclose={noop}>
      <Stack gap="md">
        {#each cart as item (item.id)}
          <CartLine
            title={item.title}
            meta={item.meta}
            price={item.price}
            quantity={item.quantity}
            image={item.image}
            onquantity={noop}
            onremove={noop}
          />
        {/each}
      </Stack>
      {#snippet footer()}
        <Button variant="primary" size="lg" block label="Checkout · €95.00" />
      {/snippet}
    </Drawer>
  {/snippet}
  <div class="screen-size screen-size--wide">{@render screen(shopPage, front, true)}</div>
{/snippet}

{#snippet editableGrid()}
  <div class="w46 grid-card">
    <Card title="Venues" headingLevel={3} padding="md">
      <EditableGrid
        columns={gridColumns}
        rows={gridRows}
        label="Venues"
        oncommit={noop}
        ondelete={noop}
        addRow
        ondraftsubmit={noop}
      />
    </Card>
  </div>
{/snippet}

{#snippet faq()}
  <div class="w38">
    <Faq
      eyebrow="FAQ"
      title="Questions, answered"
      items={faqs.slice(0, 4)}
      open={[1]}
      size="default"
      align="start"
    />
  </div>
{/snippet}

{#snippet featureGrid()}
  <div class="w44">
    <FeatureGrid
      eyebrow="Features"
      title="Everything in one place"
      features={features.slice(0, 4)}
      columns={2}
      min="14rem"
      size="default"
      align="start"
      level="panel"
      layout="horizontal"
      colorful
    />
  </div>
{/snippet}

{#snippet feedbackDialog()}
  {#snippet front()}
    <FeedbackDialog open title="How was this page?" onclose={noop} onsubmit={noop} />
  {/snippet}
  <div class="screen-size screen-size--tall">{@render screen(kpiPage, front, true)}</div>
{/snippet}

{#snippet glyph()}<span></span>{/snippet}
{#snippet preview(name: string)}<PreviewLarge {name} fallback={glyph} />{/snippet}

<Studio levels={['Organisms']} {names} {shows} {meta} {skip} {preview} />

<style>
  .w26 {
    width: 26rem;
  }
  .w28 {
    width: 28rem;
  }
  .w30 {
    width: 30rem;
  }
  .w38 {
    width: 38rem;
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
  /* The screens: a rounded window onto a page, with what floats over it. */
  .screen-size {
    width: 44rem;
    height: 30rem;
  }
  .screen-size--wide {
    width: 46rem;
  }
  .screen-size--narrow {
    width: 38rem;
    height: 27rem;
  }
  .screen-size--short {
    height: 17rem;
  }
  .screen-size--tall {
    height: 34rem;
  }
  .screen {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: var(--radius-dialog);
    overflow: clip;
    /* The containing block for fixed panels inside (DetailPanel). */
    transform: translateZ(0);
    box-shadow:
      0 24px 60px color-mix(in srgb, var(--text) 16%, transparent),
      0 0 0 0.75px var(--panel-border);
  }
  .page {
    padding: var(--space-6) var(--space-8);
  }
  .scrim {
    position: absolute;
    inset: 0;
    /* The overlay backdrop, a little lighter: the page stays readable as a page. */
    background: color-mix(in srgb, var(--backdrop) 70%, transparent);
    backdrop-filter: blur(5px);
  }
  /* The in-place dialogs sit centred over the screen, drawers on its end edge. */
  .screen :global(dialog[open]) {
    position: absolute;
    inset: 0;
    margin: auto;
  }
  .screen :global(dialog.drawer[open]) {
    inset: 0 0 0 auto;
    margin: var(--space-2);
    height: auto;
  }
  /* In a page the grid keeps room under it for floating actions; alone it needs none. */
  .grid-card :global(.grid.spaced) {
    margin-bottom: 0;
  }
  .order {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-4);
    padding: var(--space-2) var(--space-2);
  }
  .order + .order {
    border-top: 1px solid var(--border);
  }
</style>
