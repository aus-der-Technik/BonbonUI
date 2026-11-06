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
