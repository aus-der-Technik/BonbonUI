# BonbonUI

A **Svelte 5 + TypeScript** design system for dashboards, tools, websites, shops and
desktop-style apps: calm ground, one tint colour, glass only where something floats, and an
interface that answers every touch.

**Storybook:** <https://aus-der-technik.github.io/BonbonUI/>, or locally with `npm run storybook`.
Start with **Introduction › Welcome**.

<p align="center">
  <a href="https://aus-der-technik.github.io/BonbonUI/?path=/story/pages-devices--smart-home"><img src="src/lib/foundations/assets/welcome-smart-home.jpg" alt="A smart-home dashboard built with BonbonUI: smoked glass panels over a house, a temperature arc and device controls."></a>
</p>

## A look inside

Real screens from the example pages; each opens its story in Storybook.

<table>
  <tr>
    <td width="50%"><a href="https://aus-der-technik.github.io/BonbonUI/?path=/story/pages-website--residence"><img src="src/lib/foundations/assets/welcome-residence.jpg" alt="Residence: A quiet landing page with one glass drop for a menu."></a><br><b>Residence</b> · A quiet landing page with one glass drop for a menu.</td>
    <td width="50%"><a href="https://aus-der-technik.github.io/BonbonUI/?path=/story/pages-devices--climate-control"><img src="src/lib/foundations/assets/welcome-climate.jpg" alt="Climate control: Readings on the ground, soft keys, a rail."></a><br><b>Climate control</b> · Readings on the ground, soft keys, a rail.</td>
  </tr>
  <tr>
    <td width="50%"><a href="https://aus-der-technik.github.io/BonbonUI/?path=/story/pages-admin--admin-console"><img src="src/lib/foundations/assets/welcome-admin.jpg" alt="Admin console: Figures and charts on the ground, tables on panels."></a><br><b>Admin console</b> · Figures and charts on the ground, tables on panels.</td>
    <td width="50%"><a href="https://aus-der-technik.github.io/BonbonUI/?path=/story/pages-fun--music-player"><img src="src/lib/foundations/assets/welcome-music.jpg" alt="Music player: A dot-matrix clock, round keys and a queue you trim in place."></a><br><b>Music player</b> · A dot-matrix clock, round keys and a queue you trim in place.</td>
  </tr>
  <tr>
    <td width="50%"><a href="https://aus-der-technik.github.io/BonbonUI/?path=/story/pages-maritime--sea-traffic"><img src="src/lib/foundations/assets/welcome-sea.jpg" alt="Sea traffic: A drawn sea chart with weather and ships that move."></a><br><b>Sea traffic</b> · A drawn sea chart with weather and ships that move.</td>
    <td width="50%"><a href="https://aus-der-technik.github.io/BonbonUI/?path=/story/pages-programming--code-review"><img src="src/lib/foundations/assets/welcome-review.jpg" alt="Code review: A diff with comments at the line, in the dark theme."></a><br><b>Code review</b> · A diff with comments at the line, in the dark theme.</td>
  </tr>
</table>

## In detail

The ideas in small groups: how a selection flows, how a press gives, where light and glass go,
and how feedback stays where you act.

<table>
  <tr>
    <td width="33%"><img src="docs/cards/the-liquid-drop.jpg" alt="The liquid drop: the selection glides like thick water"></td>
    <td width="33%"><img src="docs/cards/squeeze-settings.jpg" alt="The squeeze: a pressed glass bar swells under the finger"></td>
    <td width="33%"><img src="docs/cards/presses-by-layer.jpg" alt="Presses by layer: ground ripples, panels sink, glass gives"></td>
  </tr>
  <tr>
    <td width="33%"><img src="docs/cards/light-from-what-is-on.jpg" alt="Light comes from what is on"></td>
    <td width="33%"><img src="docs/cards/soft-touch-keys.jpg" alt="Soft-touch keys"></td>
    <td width="33%"><img src="docs/cards/glass-only-where-it-floats.jpg" alt="Glass only where it floats"></td>
  </tr>
  <tr>
    <td width="33%"><img src="docs/cards/arc-gauge-current.jpg" alt="Two numbers, one arc: the setting and where the room is now"></td>
    <td width="33%"><img src="docs/cards/music-transport.jpg" alt="Playback in dot-matrix figures"></td>
    <td width="33%"><img src="docs/cards/pill-rounded-circle.jpg" alt="Pill acts, rounded holds, circle is someone"></td>
  </tr>
  <tr>
    <td width="33%"><img src="docs/cards/figures-on-the-ground.jpg" alt="Figures on the ground, no box around them"></td>
    <td width="33%"><img src="docs/cards/dot-matrix-figures.jpg" alt="Figures in lit dots"></td>
    <td width="33%"><img src="docs/cards/charts.jpg" alt="Charts that keep quiet"></td>
  </tr>
  <tr>
    <td width="33%"><img src="docs/cards/a-form-that-answers.jpg" alt="A form that answers at the field"></td>
    <td width="33%"><img src="docs/cards/toasts-with-undo.jpg" alt="Toasts with Undo instead of "are you sure?""></td>
    <td width="33%"><img src="docs/cards/popups-grow-from-their-trigger.jpg" alt="Menus grow from their trigger"></td>
  </tr>
  <tr>
    <td width="33%"><img src="docs/cards/create-on-the-collection.jpg" alt="Create sits on what it adds to"></td>
    <td width="33%"><img src="docs/cards/a-chat-thread.jpg" alt="A conversation in place"></td>
    <td width="33%"><img src="docs/cards/delight-at-the-end.jpg" alt="A small cheer at the end"></td>
  </tr>
  <tr>
    <td width="33%"><img src="docs/cards/a-calendar.jpg" alt="A month at a glance"></td>
    <td width="33%"><img src="docs/cards/a-kanban-card.jpg" alt="Work you can hold: a kanban board"></td>
    <td width="33%"><img src="docs/cards/dock-and-windows.jpg" alt="A desk of your own: windows, dock and menu bar"></td>
  </tr>
  <tr>
    <td width="33%"><img src="docs/cards/product-and-cart.jpg" alt="From card to cart"></td>
    <td width="33%"><img src="docs/cards/pricing-cards.jpg" alt="Plans, side by side"></td>
    <td width="33%"><img src="docs/cards/sign-in-card.jpg" alt="A door, not a wall: a sign-in card"></td>
  </tr>
</table>

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
