<script lang="ts">
  /**
   * Storybook-only: the small live previews of the catalogue's organisms, templates and desktop
   * pieces. Only what is cheap and meaningful when small is shown live; overlays (dialogs,
   * drawers, menus), whole frames and data-heavy organisms are left to the fallback glyph, so a
   * scroll through the catalogue never mounts a dozen big components at once.
   */
  import type { Snippet } from 'svelte';
  import NavRail from '../../patterns/organisms/NavRail.svelte';
  import SideNav from '../../patterns/organisms/SideNav.svelte';
  import LineChart from '../../patterns/organisms/LineChart.svelte';
  import HorizontalBarChart from '../../patterns/organisms/HorizontalBarChart.svelte';
  import DivergingBarChart from '../../patterns/organisms/DivergingBarChart.svelte';
  import ActivityLog from '../../patterns/organisms/ActivityLog.svelte';
  import CallToAction from '../../patterns/organisms/CallToAction.svelte';
  import Faq from '../../patterns/organisms/Faq.svelte';
  import ResourceList from '../../patterns/organisms/ResourceList.svelte';
  import Button from '../../patterns/atoms/Button.svelte';
  import Widget from '../../patterns/desktop/Widget.svelte';
  import NotificationBanner from '../../patterns/desktop/NotificationBanner.svelte';
  import StatusBar from '../../patterns/desktop/StatusBar.svelte';
  import SourceList from '../../patterns/desktop/SourceList.svelte';
  import TreeView from '../../patterns/desktop/TreeView.svelte';
  import Dock from '../../patterns/desktop/Dock.svelte';
  import InspectorRow from '../../patterns/desktop/InspectorRow.svelte';

  let { name, fallback }: { name: string; fallback: Snippet } = $props();

  let rail = $state('home');
  let mailbox = $state('inbox');
  let file = $state('readme');
  const day = new Date(2026, 4, 14, 9, 30);
  const week = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const series = [12, 18, 15, 22, 19, 26, 24].map((value, i) => ({ label: week[i]!, value }));

  // Top-level snippets are hoisted, so the script can name them.
  const previews: Record<string, Snippet> = {
    NavRail: navRail,
    SideNav: sideNav,
    LineChart: lineChart,
    HorizontalBarChart: horizontalBarChart,
    DivergingBarChart: divergingBarChart,
    ActivityLog: activityLog,
    CallToAction: callToAction,
    Faq: faq,
    ResourceList: resourceList,
    Widget: widget,
    NotificationBanner: notificationBanner,
    StatusBar: statusBar,
    SourceList: sourceList,
    TreeView: treeView,
    Dock: dock,
    InspectorRow: inspectorRow,
  };
</script>

{#snippet navRail()}
  <div class="zoom">
    <NavRail
      orientation="horizontal"
      label="Preview"
      bind:current={rail}
      items={[
        { id: 'home', label: 'Overview', icon: 'home' },
        { id: 'calendar', label: 'Schedule', icon: 'calendar' },
        { id: 'settings', label: 'Settings', icon: 'settings' },
      ]}
    />
  </div>
{/snippet}
{#snippet sideNav()}
  <div class="w zoom">
    <SideNav
      label="Preview"
      orientation="vertical"
      groups={[
        {
          items: [
            { label: 'Orders', href: '#preview', icon: 'cart', active: true },
            { label: 'Customers', href: '#preview', icon: 'users', count: 12 },
          ],
        },
      ]}
    />
  </div>
{/snippet}
{#snippet lineChart()}
  <div class="chart">
    <LineChart
      data={series}
      min={0}
      max={30}
      ticks={[0, 15, 30]}
      height={110}
      area
      label="Visits"
    />
  </div>
{/snippet}
{#snippet horizontalBarChart()}
  <div class="chart">
    <HorizontalBarChart
      height={96}
      label="Channels"
      data={[
        { label: 'Web', value: 42 },
        { label: 'Mail', value: 27 },
        { label: 'App', value: 14 },
      ]}
    />
  </div>
{/snippet}
{#snippet divergingBarChart()}
  <div class="chart">
    <DivergingBarChart
      height={96}
      label="Votes"
      data={series.map((p, i) => ({ label: p.label, up: p.value, down: (i * 5) % 11 }))}
    />
  </div>
{/snippet}
{#snippet activityLog()}
  <div class="w zoom-sm">
    <ActivityLog
      showAvatars={false}
      entries={[
        { id: '1', actor: 'Ada Example', action: 'published', target: 'Q3 report', at: day },
        { id: '2', actor: 'Ben Sample', action: 'commented on', target: 'Roadmap', at: day },
      ]}
    />
  </div>
{/snippet}
{#snippet callToAction()}
  <div class="cta zoom-xs">
    <CallToAction title="Start today" text="Free for small teams.">
      {#snippet actions()}<Button variant="primary" label="Sign up" />{/snippet}
    </CallToAction>
  </div>
{/snippet}
{#snippet faq()}
  <div class="w zoom-sm">
    <Faq
      items={[
        { question: 'Can I cancel any time?', answer: 'Yes.' },
        { question: 'Is there a free plan?', answer: 'Yes.' },
      ]}
    />
  </div>
{/snippet}
{#snippet resourceList()}
  <div class="w zoom-sm">
    <ResourceList
      label="Instances"
      items={[
        { id: 'web-1', status: { label: 'Running', tone: 'live' as const } },
        { id: 'db-1', status: { label: 'Stopped', tone: 'neutral' as const } },
      ]}
      key={(i) => i.id}
      title={(i) => i.id}
      status={(i) => i.status}
    />
  </div>
{/snippet}
{#snippet widget()}
  <div class="zoom-sm">
    <Widget size="small" title="Weather" icon="weather" figure="21°" caption="Sunny" />
  </div>
{/snippet}
{#snippet notificationBanner()}
  <div class="w zoom-sm">
    <NotificationBanner
      app="Mail"
      icon="mail"
      color="blue"
      title="Ada Example"
      body="The draft is ready."
      time="now"
    />
  </div>
{/snippet}
{#snippet statusBar()}
  <div class="w">
    <StatusBar
      items={[{ label: '24 items' }]}
      trailing={[{ label: 'Synced', dot: true, tone: 'ok' }]}
    />
  </div>
{/snippet}
{#snippet sourceList()}
  <div class="w zoom-sm">
    <SourceList
      bind:value={mailbox}
      sections={[
        {
          title: 'Mail',
          items: [
            { id: 'inbox', label: 'Inbox', icon: 'inbox', count: 3 },
            { id: 'sent', label: 'Sent', icon: 'send' },
          ],
        },
      ]}
    />
  </div>
{/snippet}
{#snippet treeView()}
  <div class="w zoom-sm">
    <TreeView
      label="Files"
      bind:value={file}
      expanded={['src']}
      nodes={[
        {
          id: 'src',
          label: 'src',
          icon: 'folder',
          children: [{ id: 'app', label: 'app.ts', icon: 'file-text' }],
        },
        { id: 'readme', label: 'README.md', icon: 'file-text' },
      ]}
    />
  </div>
{/snippet}
{#snippet dock()}
  <div class="zoom-sm">
    <Dock
      size={44}
      items={[
        { id: 'mail', label: 'Mail', icon: 'mail', color: 'blue', running: true },
        { id: 'notes', label: 'Notes', icon: 'pencil', color: 'orange' },
        { id: 'music', label: 'Music', icon: 'music', color: 'pink' },
      ]}
    />
  </div>
{/snippet}
{#snippet inspectorRow()}
  <div class="w"><InspectorRow label="Opacity" value="80 %" /></div>
{/snippet}

{@render (previews[name] ?? fallback)()}

<style>
  .w {
    width: min(16rem, 100%);
  }
  .chart {
    width: min(15rem, 100%);
  }
  .zoom {
    zoom: 0.85;
  }
  .zoom-sm {
    zoom: 0.7;
  }
  .zoom-xs {
    zoom: 0.5;
  }
  .cta {
    width: 28rem;
  }
</style>
