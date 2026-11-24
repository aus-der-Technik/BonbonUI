<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Application from './Application.svelte';
  import Page from './Page.svelte';
  import Section from '../layout/Section.svelte';
  import Layer from '../layout/Layer.svelte';
  import Grid from '../layout/Grid.svelte';
  import Row from '../layout/Row.svelte';
  import Stack from '../layout/Stack.svelte';
  import Spacer from '../layout/Spacer.svelte';
  import Button from '../atoms/Button.svelte';
  import Card from '../atoms/Card.svelte';
  import Avatar from '../atoms/Avatar.svelte';
  import KpiTile from '../molecules/KpiTile.svelte';
  import SegmentedControl from '../molecules/SegmentedControl.svelte';
  import SearchField from '../molecules/SearchField.svelte';
  import UserMenu from '../molecules/UserMenu.svelte';
  import SideNav, { type NavGroup } from '../organisms/SideNav.svelte';
  import ActivityLog from '../organisms/ActivityLog.svelte';

  const { Story } = defineMeta({
    title: 'Templates/Page',
    component: Page,
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen' },
  });

  const groups: NavGroup[] = [
    {
      items: [
        { label: 'Overview', href: '#', icon: 'home', active: true },
        { label: 'Projects', href: '#', icon: 'folder', count: 12 },
        { label: 'People', href: '#', icon: 'users' },
      ],
    },
    {
      label: 'Workspace',
      items: [
        { label: 'Billing', href: '#', icon: 'credit-card' },
        { label: 'Settings', href: '#', icon: 'settings' },
      ],
    },
  ];
  const activity = [
    {
      id: '1',
      actor: 'Ada Example',
      action: 'created the project',
      target: 'Atlas',
      at: '2026-10-19T09:12:00Z',
    },
    {
      id: '2',
      actor: 'Grace Example',
      action: 'invited 3 people to',
      target: 'Atlas',
      at: '2026-10-19T08:02:00Z',
    },
    {
      id: '3',
      actor: 'Linus Example',
      action: 'changed the plan to',
      target: 'Team',
      at: '2026-10-18T16:40:00Z',
    },
  ];
</script>

<script lang="ts">
  let view = $state('grid');
</script>

{#snippet cards(n: number)}
  <Grid min="15rem">
    {#each Array.from({ length: n }, (_, i) => i + 1) as i (i)}
      <Card title="Project {i}" interactive selected={i === 2}>
        <Stack gap="xs">
          <span style:color="var(--text-2)">Updated {i} days ago</span>
          <Row gap="xs"
            ><Avatar name="Ada Example" size={24} /><Avatar name="Linus Example" size={24} /></Row
          >
        </Stack>
      </Card>
    {/each}
  </Grid>
{/snippet}

<!-- The standard page: a floating header (title pill + actions) and content that stacks with one gap. -->
<Story name="Standard" asChild>
  <Application>
    <Page title="Projects" subtitle="all teams">
      {#snippet actions()}
        <SearchField label="Search projects" placeholder="Search" />
        <Button variant="primary" shape="pill" icon="plus" label="New project" collapse />
      {/snippet}
      <Section title="This week">
        <Grid min="12rem">
          <KpiTile label="Active" value="12" />
          <KpiTile label="Due" value="4" />
          <KpiTile label="Done" value="31" />
        </Grid>
      </Section>
      <Section title="All projects">{@render cards(9)}</Section>
    </Page>
  </Application>
</Story>

<!-- Sidebar and aside: both stick below the header; the aside drops under the content below 1100px, the sidebar moves on top below 900px. -->
<Story name="Sidebar and aside" asChild>
  <Application>
    <Page title="Workspace" subtitle="overview">
      {#snippet actions()}<UserMenu email="ada@example.com" onsignout={() => {}} />{/snippet}
      {#snippet sidebar()}<SideNav {groups} />{/snippet}
      {#snippet aside()}
        <Section title="Activity" level="panel"><ActivityLog entries={activity} /></Section>
      {/snippet}
      <Section title="Projects">{@render cards(8)}</Section>
    </Page>
  </Application>
</Story>

<!-- A sticky second row under the header for tabs, a segmented control or a toolbar. -->
<Story name="Navigation row" asChild>
  <Application>
    <Page title="Library" subtitle="documents">
      {#snippet nav()}
        <Layer level="front" direction="horizontal" gap="sm">
          <SegmentedControl
            label="View"
            size="sm"
            bind:value={view}
            options={[
              { value: 'grid', label: 'Grid' },
              { value: 'list', label: 'List' },
            ]}
          />
          <Spacer />
          <Button size="sm" variant="ghost" shape="pill" icon="filter" label="Filter" />
        </Layer>
      {/snippet}
      {@render cards(12)}
    </Page>
  </Application>
</Story>

<!-- Floating actions: front-layer buttons that stick bottom-right while the content scrolls. -->
<Story name="Floating actions" asChild>
  <Application>
    <Page title="Inbox" subtitle="3 unread" width="medium">
      {#snippet floating()}
        <Button variant="primary" shape="pill" size="lg" icon="pencil" label="Compose" />
      {/snippet}
      {@render cards(10)}
    </Page>
  </Application>
</Story>

<!-- Fill: a viewport-high shell; the last child takes all the room (a sheet, a map, a board). -->
<Story name="Fill" asChild>
  <Application>
    <Page title="Canvas" subtitle="fill mode" fill>
      <Layer level="panel" align="center" justify="center">
        <span style:color="var(--text-3)">This panel fills the rest of the viewport.</span>
      </Layer>
    </Page>
  </Application>
</Story>

<!-- Your own header (still the sticky front layer): here a website bar. Narrow width for reading. -->
<Story name="Custom header, narrow" asChild>
  <Application tint="#5856d6">
    <Page width="narrow">
      {#snippet header()}
        <div style:padding="var(--sticky-gap) var(--gutter) 0">
          <Layer level="front" direction="horizontal" gap="md">
            <strong>Field notes</strong>
            <Spacer />
            <Button size="sm" variant="plain" label="Archive" />
            <Button size="sm" variant="primary" shape="pill" label="Subscribe" />
          </Layer>
        </div>
      {/snippet}
      <Section
        size="hero"
        eyebrow="Essay"
        title="Why every edge should line up"
        description="Pages read calmly when the left edge of each block continues the one above it. Auto layout makes that the default rather than the exception."
      />
      {#each [1, 2, 3, 4] as n (n)}
        <p style:color="var(--text-2)" style:line-height="1.7">
          Paragraph {n}. A narrow page keeps lines around 70 characters, the comfortable length for
          reading. The header sticks while you scroll; the content keeps one gap between every
          block, so you never set a margin.
        </p>
      {/each}
    </Page>
  </Application>
</Story>

<!-- A page can set its own backdrop: a colour, an image or the tint mesh. -->
<Story name="Own backdrop" asChild>
  <Application>
    <Page
      title="Release"
      subtitle="launch day"
      image="linear-gradient(160deg, #0f2a44, #53204a 55%, #c2410c)"
      gradient
    >
      <Section
        size="hero"
        title="Version 2 is here"
        description="Own backdrop: an image (here a gradient) with the tint mesh softly blended over it."
      />
    </Page>
  </Application>
</Story>
