# @bonbon-ui/core

**BonbonUI** — a Svelte 5 + TypeScript design system for dashboards, admin tools, websites, shops,
collaborative apps and desktop-style software. Candy liquid glass, one tint colour, four layers and
auto layout, in light and dark.

**Storybook:** <http://127.0.0.1:6006/> — start with **Introduction / Welcome** and
**Introduction / Design language** ("Candy, disciplined": ten rules, each with its reason and a live
example).

## Use it in an app


```bash
npm install @bonbon-ui/core
npm install leaflet # only if you use MapView
```

```svelte
<!-- src/routes/+layout.svelte -->
<script lang="ts">
  import '@bonbon-ui/core/styles.css'; // tokens + reset (or only tokens.css)
  import { Application } from '@bonbon-ui/core';
  let { children } = $props();
</script>

<Application tint="#5a9854">{@render children()}</Application>
```

```svelte
<!-- src/routes/+page.svelte -->
<script lang="ts">
  import { Page, Section, Grid, Stat, Button } from '@bonbon-ui/core';
</script>

<Page title="Orders" subtitle="today">
  {#snippet actions()}<Button
      variant="primary"
      shape="pill"
      icon="plus"
      label="New order"
    />{/snippet}
  <Section title="At a glance">
    <Grid min="12rem">
      <Stat label="Open" value={24} />
      <Stat label="Shipped" value={118} />
    </Grid>
  </Section>
</Page>
```

## The system in four ideas

- **One tint.** `<Application tint>` sets `--tint`; every accent, selection, focus ring, the tint
  scale (`--tint-50…900`) and the slowly drifting backdrop are computed from it in CSS. Status
  colours (`--danger`, `--ok`, `--warn`, `--info`) and the candy palette (`--color-*`) stay fixed.
  `theme`, `radius` and `density` complete the theme.
- **Four layers.** Ground (on the backdrop), panel (frosted glass), selected (tinted glass) and front
  (liquid glass, **always sticky**). `<Layer level>` is the primitive; components pick their layer.
- **Auto layout.** `Page` frames a screen (header, nav, sidebar, aside, floating actions, footer,
  `width`, `fill`); `Section`, `Stack`, `Row`, `Grid` and `Spacer` space and align their children
  on one spacing scale, so edges line up without margins or wrapper divs.
- **Props in, callbacks out.** No fetching, stores or routing; async callbacks may return a promise
  and the component shows busy / saved / failed by itself.

Migrating an older app: the legacy colour names (`--brand-red`, `--tint-red`, `--blob-red`, …) still
exist as aliases of the new tokens; set `tint="#e3000f"` to keep the old red.

## What's inside

| Level      | Highlights                                                                                                                                                                                                                      |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Templates  | Application, Page, Backdrop, AdminLayout, AuthLayout, ErrorPage, SplitLayout, DashboardGrid                                                                                                                                     |
| Layout     | Stack, Row, Grid, Spacer, Layer, Section                                                                                                                                                                                        |
| Organisms  | AppHeader, DataTable, EditableGrid, charts, Dialog, Drawer, Sheet, SideNav · NavBar, Hero, FeatureGrid, PricingTable, Faq, SiteFooter · ProductGrid, ProductGallery, CartSummary · KanbanBoard, CommentThread, NotificationList |
| Desktop/OS | Desktop, Window, MenuBar, Dock, Launchpad, ControlCenter, Widget, ContextMenu, CommandPalette, Toolbar, SourceList, TreeView, Inspector, StatusBar, NotificationBanner/Center                                                   |
| Molecules  | Tabs, SegmentedControl, Picker, MultiSelect, Autocomplete, Field, Alert, Toast, KpiTile, Stat, Calendar, DatePicker, Popover, Stepper, Carousel, Banner, AvatarStack, ProductCard, PricingCard, …                               |
| Atoms      | Button, Card, Badge, Tag, Input, Select, Switch, Checkbox, Radio, Slider, Text, Heading, Image, Price, AppIcon, StatusDot, Icon (100+ glyphs), …                                                                                |
| Pages      | Operations (overview, quality rating, crawl & extract, classifier bench, prompt playground, bundle export, archive), Admin, Website, Shop, Collaboration, Desktop OS and a mail app                                             |
| Utilities  | de-DE formats, chart scales, `ToastQueue`, `renderMarkdown` (sanitized), `uploadFile`, `downloadBlob`, `poll` / `every`, date helpers                                                                                           |

## Develop

Node ≥ 24.

| Command                   | Purpose                                                           |
| ------------------------- | ----------------------------------------------------------------- |
| `npm run storybook`       | Storybook on :6006 — the workbench                                |
| `npm test`                | Vitest + coverage (gate: 80% lines/functions/statements/branches) |
| `npm run build`           | typecheck + `svelte-package` → `dist/` + publint                  |
| `npm run build-storybook` | static Storybook → `storybook-static/`                            |
| `npm run check`           | lint + format + typecheck + tests — run before handing work over  |

