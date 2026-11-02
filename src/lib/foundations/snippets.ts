// Copy-paste code for the Introduction chapter. Kept in a .ts file because a literal closing
// script tag inside a .svelte script block would end that block.

export const install = `# .npmrc — the package lives in the GitLab npm registry
@bonbon-ui:registry=https://git.ausdertechnik.de/api/v4/packages/npm/
//git.ausdertechnik.de/api/v4/packages/npm/:_authToken=\${NPM_TOKEN}

npm install @bonbon-ui/core
npm install leaflet   # only if you use MapView`;

export const rootLayout = `<!-- src/routes/+layout.svelte -->
<script lang="ts">
  import '@bonbon-ui/core/styles.css'; // tokens + reset, once per app
  import { Application } from '@bonbon-ui/core';

  let { children } = $props();
</script>

<Application tint="#5a9854">
  {@render children()}
</Application>`;

export const firstPage = `<!-- src/routes/+page.svelte -->
<script lang="ts">
  import { Page, Section, Grid, KpiTile, Button } from '@bonbon-ui/core';
</script>

<Page title="Orders" subtitle="today">
  {#snippet actions()}
    <Button variant="primary" shape="pill" icon="plus" label="New order" />
  {/snippet}

  <Section title="At a glance">
    <Grid min="12rem">
      <KpiTile label="Open" value="24" />
      <KpiTile label="Shipped" value="118" />
      <KpiTile label="Returns" value="3" />
    </Grid>
  </Section>
</Page>`;

export const welcomeExample = `<Application tint="#007aff">
  <Page title="Team" subtitle="who is in">
    <Section title="Members" description="Everyone who can sign in.">
      <Grid min="16rem">
        <Card>Ada</Card>
        <Card selected>Grace</Card>
        <Card>Linus</Card>
      </Grid>
    </Section>
  </Page>
</Application>`;

export const layersCode = `<!-- 1 ground: no wrapper at all — text and figures sit on the backdrop -->
<Section title="Revenue" description="Last 30 days" />

<!-- 2 panel: frosted glass -->
<Layer level="panel">…a table, a form…</Layer>

<!-- 3 selected: the chosen thing, tinted -->
<Layer level="selected">…the current plan…</Layer>

<!-- 4 front: liquid glass, always sticky -->
<Layer level="front" direction="horizontal">…filters…</Layer>
<Layer level="front" edge="bottom" direction="horizontal">…bulk actions…</Layer>`;

export const tintCode = (tint: string, theme: string, radius: string, density: string): string => {
  const attrs = [`tint="${tint}"`];
  if (theme !== 'auto') attrs.push(`theme="${theme}"`);
  if (radius !== 'soft') attrs.push(`radius="${radius}"`);
  if (density !== 'default') attrs.push(`density="${density}"`);
  return `<Application ${attrs.join(' ')}>
  …your pages…
</Application>`;
};

export const tokenCode = `/* In your own components: never a literal colour — always a token. */
.my-chip {
  background: var(--accent-soft);   /* selected / tinted background   */
  color: var(--accent-ink);         /* accent as readable text        */
  border: 1px solid var(--accent-border);
}
.my-chip:hover   { background: var(--accent-faint); }
.my-chip.danger  { color: var(--danger); background: var(--tint-danger); }
.my-chip:focus-visible { outline: var(--focus-ring); }`;

export const nestedBefore = `<!-- Before: wrappers for every bit of spacing -->
<div class="card">
  <div style="display:flex; justify-content:space-between; margin-bottom:12px">
    <h2>Members</h2>
    <div style="display:flex; gap:8px"><button>Invite</button></div>
  </div>
  <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:16px">
    …
  </div>
</div>`;

export const nestedAfter = `<!-- After: the containers lay themselves out -->
<Section title="Members" level="panel" layout="grid" min="14rem">
  {#snippet actions()}<Button label="Invite" />{/snippet}
  …
</Section>`;

export const stackCode = `<Stack gap="lg">…</Stack>                          <!-- vertical, 1.5rem apart -->
<Row gap="sm">…<Spacer />…</Row>                    <!-- a toolbar: left · right -->
<Row collapse="md" equal>…</Row>                    <!-- side by side, stacked < 720px -->
<Grid min="16rem">…</Grid>                          <!-- as many 16rem+ columns as fit -->
<Grid columns={3}>…</Grid>                          <!-- at most 3 -->
<Grid columns="2fr 1fr" collapse="lg">…</Grid>      <!-- fixed template, 1 column < 960px -->`;

export const pageAnatomy = `<Page
  title="Inbox"            subtitle="3 unread"          (or a header snippet)
  width="wide"             gap="lg"                     fill={false}
>
  {#snippet actions()}…header buttons…{/snippet}
  {#snippet nav()}…tabs / segmented control (sticky)…{/snippet}
  {#snippet sidebar()}<SideNav groups={nav} />{/snippet}
  {#snippet aside()}…details, activity…{/snippet}
  {#snippet floating()}<Button variant="primary" shape="pill" label="Compose" />{/snippet}
  {#snippet footer()}…{/snippet}

  …content: every child is stacked with the same gap and the same edges…
</Page>`;

export const spaceScale = `none 0 · xs 4px · sm 8px · md 16px · lg 24px · xl 32px · 2xl 48px`;

// ── Recipes: one starter per kind of app ──────────────────────────────────────────────────

export const recipeDashboard = `<script lang="ts">
  import { Page, Section, Grid, Stat, ChartCard, LineChart, DataTable, SideNav } from '@bonbon-ui/core';
  let { kpis, trend, orders, nav } = $props();
</script>

<Page title="Shop admin" subtitle="today">
  {#snippet sidebar()}<SideNav groups={nav} />{/snippet}

  <Grid min="12rem">
    {#each kpis as k (k.label)}<Stat {...k} />{/each}
  </Grid>

  <Grid columns="2fr 1fr" collapse="lg">
    <ChartCard title="Revenue"><LineChart data={trend} /></ChartCard>
    <ChartCard title="Top products">…</ChartCard>
  </Grid>

  <Section title="Latest orders" level="panel">
    <DataTable columns={[{ key: 'id', label: 'Order' }, { key: 'total', label: 'Total' }]}
      rows={orders} rowKey={(o) => o.id} />
  </Section>
</Page>`;

export const recipeWebsite = `<script lang="ts">
  import { Page, NavBar, Hero, FeatureGrid, PricingTable, CallToAction, SiteFooter, Button }
    from '@bonbon-ui/core';
  let { features, plans, footer } = $props();
</script>

<Page width="wide" gap="2xl">
  {#snippet header()}
    <NavBar brand="Larkspur" links={[{ label: 'Features', href: '#features' }, { label: 'Pricing', href: '#pricing' }]}>
      {#snippet actions()}<Button variant="primary" shape="pill" label="Sign up" />{/snippet}
    </NavBar>
  {/snippet}

  <Hero eyebrow="New" title="Ship ideas faster" highlight="faster" text="One tool for the whole team.">
    {#snippet actions()}<Button variant="primary" size="xl" shape="pill" label="Start free" />{/snippet}
  </Hero>
  <FeatureGrid eyebrow="Features" title="Everything in one place" {features} />
  <PricingTable title="Simple pricing" {plans} />
  <CallToAction title="Ready when you are" />

  {#snippet footer()}<SiteFooter columns={footer} />{/snippet}
</Page>`;

export const recipeShop = `<script lang="ts">
  import { Page, NavBar, Section, ProductGrid, CartSummary, CartLine, Drawer, Button }
    from '@bonbon-ui/core';
  let { products, lines } = $props();
  let cartOpen = $state(false);
</script>

<Page width="wide">
  {#snippet header()}
    <NavBar brand="Larkspur Studio" links={[{ label: 'New in', href: '/new', active: true }]}>
      {#snippet actions()}<Button icon="bag" label="Cart" onclick={() => (cartOpen = true)} />{/snippet}
    </NavBar>
  {/snippet}

  <Section title="New in" description="Fresh from the studio">
    <ProductGrid {products} onadd={(p) => lines.push({ id: p.id })} />
  </Section>
</Page>

<Drawer open={cartOpen} title="Your cart" onclose={() => (cartOpen = false)}>
  <CartSummary subtotal={118} shipping={4.9}>
    {#each lines as line (line.id)}<CartLine {...line} />{/each}
  </CartSummary>
</Drawer>`;

export const recipeCollab = `<script lang="ts">
  import { Page, KanbanBoard, AvatarStack, Button } from '@bonbon-ui/core';
  let { columns, cards, people } = $props();
</script>

<Page title="Launch" subtitle="team board" fill>
  {#snippet actions()}
    <AvatarStack {people} />
    <Button variant="primary" shape="pill" icon="plus" label="Add card" />
  {/snippet}

  <KanbanBoard {columns} bind:cards onmove={(id, to, index) => save(id, to, index)} />
</Page>`;

export const recipeDesktop = `<script lang="ts">
  import { Application, Desktop, MenuBar, Dock, Window } from '@bonbon-ui/core';
  let notesOpen = $state(true);
</script>

<Application tint="#5856d6">
  <Desktop>
    {#snippet menubar()}
      <MenuBar logo="sparkles" menus={[{ label: 'Notes', items: [] }]} status={[{ icon: 'wifi', label: 'Wi-Fi' }]} />
    {/snippet}
    {#snippet dock()}
      <Dock items={[{ id: 'notes', label: 'Notes', icon: 'pencil', color: 'yellow', running: notesOpen }]}
        onselect={() => (notesOpen = true)} />
    {/snippet}

    {#if notesOpen}
      <Window title="Notes" width={560} height={400} onclose={() => (notesOpen = false)}>
        …
      </Window>
    {/if}
  </Desktop>
</Application>`;

export const recipeDesktopApp = `<script lang="ts">
  import { Page, Toolbar, SourceList, StatusBar, Inspector } from '@bonbon-ui/core';
  let mailbox = $state('inbox');
</script>

<Page fill>
  {#snippet header()}
    <Toolbar title="Inbox" items={[{ icon: 'pencil', label: 'Compose' }, { spacer: true }, { icon: 'trash', label: 'Delete' }]} />
  {/snippet}
  {#snippet sidebar()}
    <SourceList bind:value={mailbox} sections={[{ title: 'Mailboxes', items: [{ id: 'inbox', label: 'Inbox', icon: 'inbox', count: 12 }] }]} />
  {/snippet}
  {#snippet aside()}<Inspector>…</Inspector>{/snippet}
  {#snippet footer()}<StatusBar items={[{ label: '24 messages' }, { label: 'Synced', dot: true, tone: 'ok' }]} />{/snippet}

  <div>…message list…</div>
</Page>`;
