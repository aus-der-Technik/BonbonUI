// Copy-paste code for the Introduction chapter. Kept in a .ts file because a literal closing
// script tag inside a .svelte script block would end that block. Samples that run on the page
// are real components instead (`recipes/`, `examples/`), shown with `?raw` by LiveExample.

export const install = `npm install @bonbon-ui/core
npm install leaflet   # only if you use MapView

# From a private registry? Point the scope at it in .npmrc:
# @bonbon-ui:registry=https://registry.example.com/`;

export const rootLayout = `<!-- src/routes/+layout.svelte -->
<script lang="ts">
  import '@bonbon-ui/core/styles.css'; // tokens + reset, once per app
  import { Application } from '@bonbon-ui/core';

  let { children } = $props();
</script>

<Application tint="#5a9854">
  {@render children()}
</Application>`;

export const welcomeExample = `<Application tint="#007aff">
  <Page title="Team" subtitle="who is in">
    <Section
      title="Members"
      description="Everyone who can sign in."
    >
      <Grid min="7rem">
        <Card>Ada</Card>
        <Card selected>Grace</Card>
        <Card>Linus</Card>
      </Grid>
    </Section>
  </Page>
</Application>`;

export const tintCode = (tint: string, theme: string, radius: string, density: string): string => {
  const attrs = [`tint="${tint}"`];
  if (theme !== 'auto') attrs.push(`theme="${theme}"`);
  if (radius !== 'soft') attrs.push(`radius="${radius}"`);
  if (density !== 'default') attrs.push(`density="${density}"`);
  return `<Application ${attrs.join(' ')}>
  …your pages…
</Application>`;
};

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

export const stackCode = `<Stack gap="lg">…</Stack>                          <!-- vertical, 1.5rem apart -->
<Row gap="sm">…<Spacer />…</Row>                    <!-- a toolbar: left · right -->
<Row collapse="md" equal>…</Row>                    <!-- side by side, stacked < 720px -->
<Grid min="16rem">…</Grid>                          <!-- as many 16rem+ columns as fit -->
<Grid columns={3}>…</Grid>                          <!-- at most 3 -->
<Grid columns="2fr 1fr" collapse="lg">…</Grid>      <!-- fixed template, 1 column < 960px -->`;

export const spaceScale = `none 0 · xs 4px · sm 8px · md 16px · lg 24px · xl 32px · 2xl 48px`;

// ── On phones ──────────────────────────────────────────────────────────────────────────────

export const phoneSetup = `<!-- src/routes/+layout.svelte -->
<script lang="ts">
  import '@bonbon-ui/core/styles.css'; // tokens, base and the touch rules
  import { Application, watchDevice } from '@bonbon-ui/core';
  import { onMount } from 'svelte';

  let { children } = $props();
  // --visible-height, --keyboard and data-typing on <html>; caps iOS' focus zoom.
  onMount(() => watchDevice());
</script>

<Application>{@render children()}</Application>`;

export const viewportMeta = `<!-- app.html: the page reaches under the notch and the home indicator;
     the components keep clear of them with env(safe-area-inset-*). -->
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />`;

export const sheetCode = `<!-- A Popover or a ContextPanel: a bottom sheet on phones -->
<Popover label="Actions" icon="more" sheet>…</Popover>
<Popover label="Place" sheet="half">…</Popover>      <!-- ≤ ~58 %, page not dimmed -->
<Popover label="Notifications" sheet="full">…</Popover>

<!-- Your own floating panel: the grip as its first child -->
<div popover="manual">
  <SheetGrip close={hide} />
  …
</div>`;

export const dialogPhoneCode = `<Dialog open={adding} title="Add a connection" phone="full" onclose={…}>
  …a long form…
  {#snippet actions()}
    <Button label="Cancel" onclick={…} />
    <Button variant="primary" label="Connect" onclick={…} />
  {/snippet}
</Dialog>`;

export const longpressCode = `<ContextPanel bind:this={panel} onopen={rowAt} label="Change" longpress sheet>
  {#snippet panel(row, close)}…{/snippet}
  {#each rows as row (row.id)}
    <li data-row={row.id}>
      {row.name}
      <MoreButton label="Change {row.name}" onclick={(e) => panel.openFor(e.currentTarget, row)} />
    </li>
  {/each}
</ContextPanel>`;

export const gesturesCode = `import { longpress, swipe, dragToClose, squeezeOnce } from '@bonbon-ui/core';

<li use:longpress={{ onpress: (x, y, target) => { squeezeOnce(target); open(x, y); } }}>…</li>
<article use:swipe={{ onswipe: (way) => (way === 'left' ? next() : previous()) }}
         style="touch-action: pan-y">…</article>

// A sheet of your own that a finger pulls down by its handle:
onMount(() => dragToClose(handle, () => sheet, close));`;

export const bottomBarCode = `<BottomBar
  items={[home, search, ...recentlyUsed]}
  more={everyPlace}
  current={here}
  moreLabel="Apps"
>
  {#snippet sheetTop(close)}<SearchField label="Go to…" />{/snippet}
</BottomBar>`;

export const panelStackCode = `<PanelStack onclose={() => ((group = null), (person = null))}>
  {#if group}
    <StackPanel title={group.name} onclose={() => (group = null)}>…people…</StackPanel>
  {/if}
  {#if person}
    <StackPanel depth={1} title={person.name} onclose={() => (person = null)}>…</StackPanel>
  {/if}
</PanelStack>`;

export const sideNavCode = `<div class="beside">
  <SideNav
    label="Places"
    sticky
    groups={[
      { label: 'Files', items: [
        { id: 'mine', label: 'My files', href: '/files', icon: 'folder', color: 'brown', active: at === 'mine' },
        { id: 'sent', label: 'Sent to me', href: '/files?sent', icon: 'inbox', color: 'brown',
          count: fresh, countLabel: \`\${fresh} new\`, active: at === 'sent' },
      ] },
    ]}
    onnavigate={(item, event) => { event.preventDefault(); goto(item.href); }}
  />
  <main>…</main>
</div>

<style>
  .beside { display: grid; grid-template-columns: 240px minmax(0, 1fr); gap: var(--space-6); }
  @media (max-width: 900px) { .beside { grid-template-columns: minmax(0, 1fr); } }
</style>`;

export const joinedCode = `<Joined label="Find or start a conversation">
  <SearchField label="Search conversations" bind:value={query} />
  <Button iconOnly icon="message-plus" label="New message" />
</Joined>`;

export const viewportCode = `import { Viewport, portal } from '@bonbon-ui/core';

const screen = new Viewport(); // screen.phone, .touch, .keyboard, .visible — reactive

<!-- A bar that rides on the keyboard, above every sticky header and bottom bar -->
<div use:portal class="keybar" style:bottom="{screen.keyboard}px">…</div>`;
