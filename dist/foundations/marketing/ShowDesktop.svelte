<script module lang="ts">
  import type { Meta } from './looks';
  import photo from '../../demo/assets/smart-home-backdrop.jpg';

  export const meta: Record<string, Meta> = {
    AppJar: { zoom: 1.2, note: 'Every app in one glass jar', theme: 'light', tint: '#af52de' },
    CommandPalette: { zoom: 1.45, note: 'Type a command, press Enter', theme: 'dark' },
    ContextMenu: { zoom: 1.6, note: 'Right where you clicked', theme: 'light' },
    Desktop: { zoom: 1.13, note: 'A whole screen, in one tint', theme: 'light', tint: '#007aff' },
    Dock: { zoom: 1.45, note: 'The candy tray', photo, theme: 'light', tint: '#5a9854' },
    Inspector: { zoom: 1.45, note: 'Everything about the selection', theme: 'light' },
    InspectorRow: { zoom: 1.75, note: 'A label, a value, a control', theme: 'dark' },
    InspectorSection: { zoom: 1.65, note: 'Grouped, and folded away', theme: 'light' },
    MenuBar: { zoom: 1.2, note: 'The shelf at the top', theme: 'light', tint: '#5856d6' },
    NotificationBanner: { zoom: 1.6, note: 'News that floats by', photo, theme: 'light' },
    NotificationCenter: { zoom: 1.4, note: 'Banners, newest on top', theme: 'dark' },
    QuickSettings: { zoom: 1.4, note: 'Candy means on', theme: 'dark', tint: '#ff2d55' },
    SourceList: { zoom: 1.7, note: 'The places of an app', theme: 'light' },
    StatusBar: { zoom: 2, note: 'The quiet line at the bottom', theme: 'light' },
    Toolbar: { zoom: 1.5, note: 'Tools that fold when room runs out', theme: 'light' },
    TreeView: { zoom: 1.7, note: 'Folders that open in place', theme: 'dark' },
    Widget: {
      zoom: 1.35,
      note: 'Glanceable, at home on the desktop',
      theme: 'light',
      tint: '#e0683f',
    },
    Window: { zoom: 1.25, note: 'Glyphs, not coloured dots', theme: 'dark', tint: '#00a89d' },
  };
  export const skip: Record<string, string> = {
    ControlCenter: 'Deprecated alias of QuickSettings.',
    Launchpad: 'Deprecated alias of AppJar.',
  };
</script>

<script lang="ts">
  /** Local only (not in git): one square per desktop component. */
  import { tick } from 'svelte';
  import Studio from './Studio.svelte';
  import { readQuery } from './looks';
  import PreviewLarge from '../explore/PreviewLarge.svelte';
  import AppJar from '../../patterns/desktop/AppJar.svelte';
  import CommandPalette, { type CommandGroup } from '../../patterns/desktop/CommandPalette.svelte';
  import ContextMenu from '../../patterns/desktop/ContextMenu.svelte';
  import Desktop from '../../patterns/desktop/Desktop.svelte';
  import Dock from '../../patterns/desktop/Dock.svelte';
  import Inspector from '../../patterns/desktop/Inspector.svelte';
  import InspectorRow from '../../patterns/desktop/InspectorRow.svelte';
  import InspectorSection from '../../patterns/desktop/InspectorSection.svelte';
  import MenuBar from '../../patterns/desktop/MenuBar.svelte';
  import NotificationBanner from '../../patterns/desktop/NotificationBanner.svelte';
  import NotificationCenter, {
    type OsNotification,
  } from '../../patterns/desktop/NotificationCenter.svelte';
  import QuickSettings from '../../patterns/desktop/QuickSettings.svelte';
  import SourceList from '../../patterns/desktop/SourceList.svelte';
  import StatusBar from '../../patterns/desktop/StatusBar.svelte';
  import Toolbar from '../../patterns/desktop/Toolbar.svelte';
  import TreeView from '../../patterns/desktop/TreeView.svelte';
  import Widget from '../../patterns/desktop/Widget.svelte';
  import Window from '../../patterns/desktop/Window.svelte';
  import AppIcon from '../../patterns/atoms/AppIcon.svelte';
  import type { IconName } from '../../patterns/atoms/icons';
  import Button from '../../patterns/atoms/Button.svelte';
  import Input from '../../patterns/atoms/Input.svelte';
  import ProgressBar from '../../patterns/atoms/ProgressBar.svelte';
  import Select from '../../patterns/atoms/Select.svelte';
  import Slider from '../../patterns/atoms/Slider.svelte';
  import Switch from '../../patterns/atoms/Switch.svelte';
  import Tag from '../../patterns/atoms/Tag.svelte';
  import Text from '../../patterns/atoms/Text.svelte';
  import Layer from '../../patterns/layout/Layer.svelte';
  import Row from '../../patterns/layout/Row.svelte';
  import Stack from '../../patterns/layout/Stack.svelte';
  import {
    agenda,
    apps,
    appMenus,
    controlToggles,
    desktopIcons,
    dock as dockItems,
    fileTree,
    places,
    wallpapers,
  } from '../../demo/mock-desktop';

  const q = readQuery();
  const noop = () => {};
  // A fixed morning keeps the clock and the greeting the same on every capture.
  const morning = new Date(2026, 10, 6, 9, 41);

  const status = [
    { icon: 'wifi' as const, label: 'Wi-Fi' },
    { icon: 'battery' as const, label: 'Battery', text: '82%' },
  ];

  const commands: CommandGroup[] = [
    {
      label: 'Apps',
      items: [
        { id: 'files', label: 'Open Files', icon: 'folder', shortcut: ['⌘', '1'] },
        { id: 'notes', label: 'Open Notes', icon: 'edit' },
        { id: 'mail', label: 'Open Mail', icon: 'mail' },
      ],
    },
    {
      label: 'Appearance',
      items: [
        { id: 'dark', label: 'Dark mode', icon: 'moon' },
        { id: 'tint', label: 'Tint: Pink', icon: 'palette', description: 'the whole desktop' },
      ],
    },
    {
      label: 'System',
      items: [{ id: 'settings', label: 'System settings', icon: 'settings', shortcut: ['⌘', ','] }],
    },
  ];

  const notifications: OsNotification[] = [
    {
      id: 'message',
      app: 'Messages',
      icon: 'chat',
      color: 'green',
      title: 'Ana Example',
      body: 'Lunch at the lake on Friday?',
      time: 'now',
    },
    {
      id: 'meeting',
      app: 'Calendar',
      icon: 'calendar',
      color: 'red',
      title: 'Design review in 10 minutes',
      body: 'Lighthouse room',
      time: '09:50',
    },
    {
      id: 'download',
      app: 'Files',
      icon: 'download',
      color: 'blue',
      title: 'Design kit.zip is ready',
      body: '48 MB, in Downloads',
      time: '09:32',
    },
  ];

  const tiles: { label: string; icon: IconName; color: string }[] = [
    { label: 'Quarterly report.pdf', icon: 'file-text', color: 'red' },
    { label: 'Launch plan', icon: 'kanban', color: 'mint' },
    { label: 'Holiday photos', icon: 'folder', color: 'blue' },
    { label: 'Screenshot 09.41', icon: 'image', color: 'orange' },
    { label: 'Budget 2027', icon: 'table', color: 'green' },
    { label: 'Notes', icon: 'edit', color: 'yellow' },
  ];

  let toggles = $state(controlToggles.map((t) => ({ ...t })));
  let brightness = $state(72);
  let volume = $state(48);
  let locked = $state(true);
  let fileName = $state('Quarterly report.pdf');
  let sync = $state(true);
  let opacity = $state(80);
  let search = $state('');
  let palette = $state(false);
  let jar = $state(true);
  let host = $state<HTMLElement>();

  // Overlays are shown open, the way they look a moment after they were called up.
  $effect(() => {
    const root = host;
    if (!root) return;
    const timer = setTimeout(() => {
      void openOverlay(root);
    }, 250);
    return () => clearTimeout(timer);
  });

  async function openOverlay(root: HTMLElement) {
    if (q.mk === 'MenuBar') {
      root.querySelectorAll<HTMLButtonElement>('.trigger')[2]?.click();
    } else if (q.mk === 'CommandPalette') {
      // Opened without the modal top layer, so it scales with the square like everything else.
      root.querySelector<HTMLDialogElement>('dialog')?.show();
      palette = true;
      await tick();
      (document.activeElement as HTMLElement | null)?.blur();
    } else if (q.mk === 'ContextMenu') {
      const card = root.querySelector<HTMLElement>('.file');
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.dispatchEvent(
        new MouseEvent('contextmenu', {
          bubbles: true,
          cancelable: true,
          clientX: r.right - 6,
          clientY: r.top + r.height * 0.3,
        }),
      );
      await tick();
      // The menu lives in its own popover at the end of <body>: scale it like the square.
      const menu = document.querySelector<HTMLElement>('.bb-context-menu');
      if (menu) {
        menu.style.transformOrigin = '0 0';
        menu.style.transform = `scale(${meta['ContextMenu']?.zoom ?? 1.6})`;
      }
      (document.activeElement as HTMLElement | null)?.blur();
    }
  }

  const shows = {
    AppJar: appJar,
    CommandPalette: commandPalette,
    ContextMenu: contextMenu,
    Desktop: desktop,
    Dock: dock,
    Inspector: inspector,
    InspectorRow: inspectorRow,
    InspectorSection: inspectorSection,
    MenuBar: menuBar,
    NotificationBanner: notificationBanner,
    NotificationCenter: notificationCenter,
    QuickSettings: quickSettings,
    SourceList: sourceList,
    StatusBar: statusBar,
    Toolbar: toolbar,
    TreeView: treeView,
    Widget: widget,
    Window: windowP,
  };
</script>

{#snippet appJar()}
  <div class="screen screen--jar" bind:this={host}>
    <Desktop contained wallpaper={wallpapers[0].value}>
      {#snippet dock()}
        <Dock
          items={dockItems(['files', 'music'], 'music')}
          size={44}
          onjar={() => (jar = true)}
          jarOpen={jar}
        />
      {/snippet}
      <AppJar bind:open={jar} apps={apps.slice(0, 16)} size={52} />
    </Desktop>
  </div>
{/snippet}

{#snippet commandPalette()}
  <div class="palette-stage" bind:this={host}>
    <CommandPalette bind:open={palette} groups={commands} hotkey={false} />
  </div>
{/snippet}

{#snippet contextMenu()}
  <div class="context-stage" bind:this={host}>
    <ContextMenu
      label="File"
      items={[
        { label: 'Open', shortcut: '⌘O' },
        { label: 'Get info', icon: 'info', shortcut: '⌘I' },
        { label: 'Duplicate', icon: 'copy', shortcut: '⌘D' },
        { separator: true },
        { label: 'Show preview', checked: true },
        { separator: true },
        { label: 'Move to trash', icon: 'trash', danger: true, shortcut: '⌘⌫' },
      ]}
    >
      <div class="file">
        <AppIcon label="Quarterly report" icon="file-text" color="red" size="lg" />
        <span class="file-name">Quarterly report.pdf</span>
        <span class="file-meta">2.4 MB</span>
      </div>
    </ContextMenu>
  </div>
{/snippet}

{#snippet desktop()}
  <div class="screen screen--desktop">
    <Desktop
      contained
      wallpaper={wallpapers[2].value}
      icons={desktopIcons.slice(0, 3)}
      focused="notes"
    >
      {#snippet menubar()}
        <MenuBar
          appIcon="edit"
          appColor="yellow"
          menus={appMenus('Notes')}
          {status}
          now={morning}
          greet={false}
        />
      {/snippet}
      {#snippet widgets()}
        <Widget title="Weather" icon="sun" color="orange" figure="21°" caption="Sunny · H 24°" />
      {/snippet}
      {#snippet dock()}
        <Dock items={dockItems(['files', 'notes'], 'notes')} size={40} />
      {/snippet}
      <Window
        id="files"
        icon="folder"
        color="blue"
        title="Files"
        subtitle="8 items"
        x={206}
        y={24}
        width={330}
        height={250}
      >
        <Stack gap="sm">
          {#each ['Quarterly report.pdf', 'Launch plan', 'Holiday photos'] as file, i (file)}
            <Row gap="sm">
              <AppIcon
                label={file}
                icon={i === 0 ? 'file-text' : i === 1 ? 'kanban' : 'folder'}
                color={i === 0 ? 'red' : i === 1 ? 'mint' : 'blue'}
                size="sm"
              />
              <Text size="sm">{file}</Text>
            </Row>
          {/each}
        </Stack>
      </Window>
      <Window
        id="notes"
        icon="edit"
        color="yellow"
        title="Notes"
        x={300}
        y={150}
        width={320}
        height={230}
      >
        <Stack gap="sm">
          <Text weight="bold">Groceries</Text>
          <Text tone="muted">Oat milk · Blueberries · Sourdough</Text>
        </Stack>
      </Window>
    </Desktop>
  </div>
{/snippet}

{#snippet dock()}
  <div class="dock-stage">
    <Dock
      items={[
        ...dockItems(['files', 'mail', 'music'], 'music').filter(
          (e) => !('id' in e) || !['calendar', 'photos'].includes(e.id),
        ),
      ]}
      size={56}
      onjar={noop}
    />
  </div>
{/snippet}

{#snippet inspectorBody()}
  <InspectorSection title="General">
    <InspectorRow label="Name" for="mk-insp-name">
      <Input id="mk-insp-name" bind:value={fileName} size="sm" />
    </InspectorRow>
    <InspectorRow label="Kind" value="PDF document" />
    <InspectorRow label="Tags">
      <Row gap="xs"><Tag label="Work" color="blue" /><Tag label="Urgent" color="red" /></Row>
    </InspectorRow>
  </InspectorSection>
  <InspectorSection title="Sharing & permissions" collapsible>
    <InspectorRow label="Locked" hint="Nobody can change it.">
      <Switch bind:checked={locked} aria-label="Locked" />
    </InspectorRow>
    <InspectorRow label="Owner" value="ana@example.com" />
  </InspectorSection>
{/snippet}

{#snippet inspector()}
  <div class="w-inspector">
    <Inspector title={fileName} subtitle="PDF document · 2.4 MB" surface>
      {#snippet preview()}<AppIcon label="PDF" icon="file-text" color="red" size="lg" />{/snippet}
      {#snippet actions()}
        <Button icon="share" label="Share" size="sm" />
        <Button icon="download" label="Download" size="sm" />
      {/snippet}
      {@render inspectorBody()}
    </Inspector>
  </div>
{/snippet}

{#snippet inspectorRow()}
  <div class="w-rows">
    <Layer level="panel" padding="lg" gap="md">
      <InspectorRow label="Name" for="mk-row-name">
        <Input id="mk-row-name" bind:value={fileName} size="sm" />
      </InspectorRow>
      <InspectorRow label="Kind" value="PDF document" />
      <InspectorRow label="Opacity" hint="Behind the window title.">
        <Slider label="Opacity" hideLabel bind:value={opacity} />
      </InspectorRow>
      <InspectorRow label="Sync" hint="On every device.">
        <Switch bind:checked={sync} aria-label="Sync" />
      </InspectorRow>
    </Layer>
  </div>
{/snippet}

{#snippet inspectorSection()}
  <div class="w-rows">
    <Layer level="panel" padding="md" gap="sm">
      <InspectorSection title="Layout">
        <InspectorRow label="Columns" for="mk-sec-cols">
          <Select
            id="mk-sec-cols"
            size="sm"
            value="3"
            options={[
              { value: '2', label: 'Two' },
              { value: '3', label: 'Three' },
            ]}
          />
        </InspectorRow>
        <InspectorRow label="Sidebar">
          <Switch checked aria-label="Sidebar" />
        </InspectorRow>
      </InspectorSection>
      <InspectorSection title="Appearance" collapsible>
        <InspectorRow label="Theme" value="Follows the system" />
        <InspectorRow label="Tint" value="Teal" />
      </InspectorSection>
      <InspectorSection title="Advanced" collapsible open={false}>
        <InspectorRow label="Cache" value="212 MB" />
      </InspectorSection>
    </Layer>
  </div>
{/snippet}

{#snippet menuBar()}
  <div class="bar-stage" bind:this={host}>
    <MenuBar
      appIcon="edit"
      appColor="yellow"
      menus={appMenus('Notes', { undo: noop }, 'Typing')}
      {status}
      now={morning}
      name="Ana"
    />
  </div>
{/snippet}

{#snippet notificationBanner()}
  <div class="w-banner">
    <Stack gap="md">
      <NotificationBanner
        app="Messages"
        icon="chat"
        color="green"
        time="now"
        title="Ana Example"
        body="Lunch at the lake on Friday?"
        onopen={noop}
        actions={[
          { label: 'Reply', onclick: noop },
          { label: 'Mark as read', onclick: noop },
        ]}
      />
      <NotificationBanner
        app="Calendar"
        icon="calendar"
        color="red"
        time="09:50"
        title="Design review in 10 minutes"
        body="Lighthouse room"
      />
    </Stack>
  </div>
{/snippet}

{#snippet notificationCenter()}
  <div class="screen screen--notes">
    <Desktop contained wallpaper={wallpapers[3].value}>
      {#snippet dock()}<Dock items={dockItems(['mail'], 'mail')} size={40} />{/snippet}
      <Window
        id="mail"
        icon="mail"
        color="cyan"
        title="Mail"
        x={20}
        y={110}
        width={230}
        height={220}
      >
        <Stack gap="sm">
          <Text weight="semibold">Lunch at the lake?</Text>
          <Text size="sm" tone="muted">The weather looks perfect. 12:30 at the jetty?</Text>
        </Stack>
      </Window>
      <NotificationCenter {notifications} duration={0} onclose={noop} />
    </Desktop>
  </div>
{/snippet}

{#snippet quickSettings()}
  <div class="w-quick">
    <QuickSettings
      {toggles}
      ontoggle={(id, on) => (toggles = toggles.map((t) => (t.id === id ? { ...t, on } : t)))}
      bind:brightness
      bind:volume
      nowPlaying={{ title: 'Lamplight', artist: 'Example Quartet', playing: true }}
    />
  </div>
{/snippet}

{#snippet sourceList()}
  <div class="w-list">
    <Layer level="panel" padding="sm">
      <SourceList sections={places.slice(0, 2)} value="documents" label="Places" />
    </Layer>
  </div>
{/snippet}

{#snippet statusBar()}
  <div class="w-status">
    <Layer level="panel" padding="none" class="status-panel">
      <StatusBar
        items={[{ label: '24 items' }, { label: '3 selected', tone: 'accent', dot: true }]}
        trailing={[{ label: '212 GB available' }]}
      />
    </Layer>
    <Layer level="panel" padding="none" class="status-panel">
      <StatusBar
        items={[{ label: 'Syncing', icon: 'refresh', tone: 'accent' }]}
        trailing={[{ label: '18 of 40' }]}
      >
        <div class="status-progress"><ProgressBar value={45} label="Sync" /></div>
      </StatusBar>
    </Layer>
    <Layer level="panel" padding="none" class="status-panel">
      <StatusBar
        items={[{ label: 'Saved', icon: 'check', tone: 'ok' }, { label: '1,284 words' }]}
        trailing={[{ label: 'Line 12, column 4' }]}
      />
    </Layer>
  </div>
{/snippet}

{#snippet toolbar()}
  <div class="w-toolbar">
    <Stack gap="lg">
      <Toolbar
        title="Inbox"
        subtitle="4 unread"
        variant="floating"
        bind:search
        items={[
          { icon: 'edit', label: 'New message', primary: true },
          { separator: true },
          { icon: 'bookmark', label: 'Archive' },
          { icon: 'trash', label: 'Delete' },
          { icon: 'flag', label: 'Flag', active: true },
        ]}
      />
      <Toolbar
        title="Documents"
        variant="floating"
        items={[
          { icon: 'chevron-left', label: 'Back' },
          { spacer: true },
          { icon: 'grid', label: 'Icons', active: true },
          { icon: 'list', label: 'List' },
          { separator: true },
          { icon: 'share', label: 'Share', showLabel: true },
        ]}
      />
    </Stack>
  </div>
{/snippet}

{#snippet treeView()}
  <div class="w-list">
    <Layer level="panel" padding="sm">
      <TreeView nodes={fileTree} value="window" expanded={['src', 'lib']} label="Project files" />
    </Layer>
  </div>
{/snippet}

{#snippet widget()}
  <div class="widgets">
    <Widget title="Clock" icon="clock" color="indigo" figure="09:41" caption="Friday" />
    <Widget title="Weather" icon="sun" color="orange" filled figure="21°" caption="Sunny" />
    <div class="widgets-wide">
      <Widget size="medium" title="Today" icon="calendar" color="red" meta="2 left">
        <Stack gap="sm">
          {#each agenda.slice(0, 2) as event (event.id)}
            <Row gap="md">
              <span class="when">{event.time}</span>
              <Stack gap="none">
                <Text weight="semibold">{event.title}</Text>
                <Text size="sm" tone="muted">{event.place}</Text>
              </Stack>
            </Row>
          {/each}
        </Stack>
      </Widget>
    </div>
  </div>
{/snippet}

{#snippet windowP()}
  <div class="w-window">
    <Window
      app="Files"
      icon="folder"
      color="blue"
      title="Documents"
      subtitle="8 items"
      static
      focused
      height={380}
      padding="none"
      onclose={noop}
    >
      {#snippet sidebar()}
        <SourceList sections={places.slice(0, 1)} value="documents" label="Places" />
      {/snippet}
      {#snippet toolbar()}
        <Toolbar
          variant="plain"
          items={[
            { icon: 'grid', label: 'Icons', active: true },
            { icon: 'list', label: 'List' },
          ]}
        />
      {/snippet}
      <div class="files">
        {#each tiles as tile (tile.label)}
          <div class="tile">
            <AppIcon label={tile.label} icon={tile.icon} color={tile.color} size="md" />
            <span>{tile.label}</span>
          </div>
        {/each}
      </div>
      {#snippet footer()}
        <StatusBar items={[{ label: '8 items' }]} trailing={[{ label: '212 GB available' }]} />
      {/snippet}
    </Window>
  </div>
{/snippet}

{#snippet glyph()}<span></span>{/snippet}
{#snippet preview(name: string)}<PreviewLarge {name} fallback={glyph} />{/snippet}

<Studio levels={['Desktop']} {shows} {meta} {skip} {preview} />

<style>
  /* A small screen of its own: the desktop pieces live inside it. */
  .screen {
    width: 720px;
    height: 600px;
    border-radius: var(--radius-xl, 28px);
    overflow: clip;
    box-shadow: var(--shadow-lg, 0 24px 60px rgba(0, 0, 0, 0.18));
  }
  .screen--desktop {
    width: 740px;
    height: 620px;
  }
  .screen--notes {
    width: 640px;
    height: 500px;
  }
  .palette-stage {
    position: relative;
    width: 560px;
    height: 460px;
  }
  .palette-stage :global(dialog) {
    position: absolute;
    inset: 0;
    margin: auto;
  }
  .context-stage {
    width: 430px;
    height: 250px;
    display: grid;
    align-items: start;
    justify-items: start;
    padding: 20px 0 0 0;
  }
  .file {
    display: grid;
    justify-items: center;
    gap: var(--space-2);
    width: 10rem;
    padding: var(--space-4) var(--space-3);
    border-radius: var(--radius-card);
    background: var(--accent-faint);
    outline: 2px solid var(--accent-border);
  }
  .file-name {
    font-size: var(--fs-sm);
    font-weight: var(--fw-semibold);
    text-align: center;
  }
  .file-meta {
    font-size: var(--fs-xs);
    color: var(--text-3);
  }
  .dock-stage {
    padding-top: 3rem;
  }
  .w-inspector {
    width: 27rem;
  }
  .w-rows {
    width: 23rem;
  }
  .bar-stage {
    width: 720px;
    height: 300px;
    --app-height: 300px;
  }
  .w-banner {
    width: 22rem;
  }
  .w-quick {
    width: 22rem;
  }
  .w-list {
    width: 17rem;
  }
  .w-status {
    display: grid;
    gap: var(--space-4);
    width: 26rem;
  }
  .w-status :global(.status-panel) {
    overflow: clip;
  }
  .status-progress {
    width: 7rem;
  }
  .w-toolbar {
    width: 34rem;
  }
  .widgets {
    display: grid;
    grid-template-columns: auto auto;
    gap: var(--space-4);
    justify-content: center;
  }
  .when {
    min-width: 3rem;
    color: var(--accent-ink);
    font-weight: var(--fw-semibold);
    font-variant-numeric: tabular-nums;
  }
  .widgets-wide {
    grid-column: 1 / -1;
    display: grid;
  }
  .widgets-wide :global(> *) {
    width: 100%;
  }
  .w-window {
    width: 44rem;
  }
  .files {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-5);
    padding: var(--space-6);
  }
  .tile {
    display: grid;
    justify-items: center;
    gap: var(--space-2);
    font-size: var(--fs-sm);
    text-align: center;
  }
</style>
