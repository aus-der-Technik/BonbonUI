# BonbonUI

A **Svelte 5 + TypeScript** design system for dashboards, tools, websites, shops and
desktop-style apps: calm ground, one tint colour, glass only where something floats, and an
interface that answers every touch.

**Storybook:** <https://aus-der-technik.github.io/BonbonUI/>, or locally with `npm run storybook`.
Start with **Introduction › Welcome**.

## Install

BonbonUI installs from a release tag; each tag carries the built package, so nothing is built
on install.

```bash
npm install git+ssh://git@github.com/aus-der-Technik/BonbonUI.git#v1.0.1
npm install leaflet   # only for MapView (@bonbon-ui/core/map)
```

Peer dependency: `svelte ^5.20`.

## Quick start

```svelte
<!-- +layout.svelte -->
<script lang="ts">
  import '@bonbon-ui/core/styles.css';
  import { Application } from '@bonbon-ui/core';
  let { children } = $props();
</script>

<Application tint="#5a9854">{@render children()}</Application>
```

```svelte
<!-- +page.svelte -->
<script lang="ts">
  import { Page, Section, Grid, KpiTile, Button } from '@bonbon-ui/core';
</script>

<Page title="Orders" subtitle="today">
  {#snippet actions()}<Button variant="primary" icon="plus" label="New order" />{/snippet}
  <Section title="At a glance">
    <Grid min="12rem">
      <KpiTile label="Open" value={24} />
      <KpiTile label="Shipped" value={118} />
    </Grid>
  </Section>
</Page>
```

## Ideas

- **One tint.** `Application tint` colours every accent, selection, focus ring and the backdrop.
  Status colours stay fixed. `theme`, `radius` and `density` complete the theme.
- **Ground first.** Most content sits on the ground; panels are solid tiles for tables, forms
  and results. Glass is only for what floats, and what floats is sticky.
- **Auto layout.** `Page`, `Section`, `Stack`, `Row` and `Grid` space and align their children:
  no margins, no wrapper divs.
- **It answers back.** Selections flow like thick water, a press gives a little where it lands,
  and what is on casts light on its surroundings. `Application` does it for every page.
- **Props in, callbacks out.** Components fetch, store and route nothing; async callbacks may
  return a promise.

## What's inside

176 components from atoms to templates, desktop-style windows and docks, charts, a motion and
light engine, and 23 complete example pages. Browse them all in **Explore › Component
catalogue**.

## Develop

Node ≥ 24.

| Command                   | What it does                                      |
| ------------------------- | ------------------------------------------------- |
| `npm run storybook`       | Storybook on :6006                                |
| `npm run check`           | lint, format, typecheck and tests (with coverage) |
| `npm run build`           | typecheck, `svelte-package` to `dist/`, publint   |
| `npm run build-storybook` | static Storybook to `storybook-static/`           |

## Releases

`main` holds the sources. A release is a commit on top of `main` that adds the built `dist/` and
drops the install-time scripts; only its tag (`vX.Y.Z`) points at it.

## License

Unlicensed; all rights reserved.
