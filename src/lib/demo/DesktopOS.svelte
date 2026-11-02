<script lang="ts">
  /**
   * Example page: a complete, original candy desktop — the tint mesh as wallpaper, the top
   * shelf with a day pill that greets you, widgets (a greeting, today, the weather, little
   * wins, now playing), floating windows (Files, Notes, Settings, Music) with the candy
   * capsule, the candy tray with its jar of all apps, a control panel, notifications and a ⌘K
   * command palette. Settings re-tints, re-themes and reshapes the whole desktop live. Tick off
   * every little win for a sprinkle of joy. On a phone the desktop becomes a home screen and
   * windows open as sheets above the tray (Storybook only, mock data).
   */
  import { onMount } from 'svelte';
  import AppIcon from '../patterns/atoms/AppIcon.svelte';
  import Badge from '../patterns/atoms/Badge.svelte';
  import Button from '../patterns/atoms/Button.svelte';
  import Checkbox from '../patterns/atoms/Checkbox.svelte';
  import Heading from '../patterns/atoms/Heading.svelte';
  import Input from '../patterns/atoms/Input.svelte';
  import ProgressBar from '../patterns/atoms/ProgressBar.svelte';
  import Slider from '../patterns/atoms/Slider.svelte';
  import Switch from '../patterns/atoms/Switch.svelte';
  import Text from '../patterns/atoms/Text.svelte';
  import Textarea from '../patterns/atoms/Textarea.svelte';
  import Grid from '../patterns/layout/Grid.svelte';
  import Row from '../patterns/layout/Row.svelte';
  import Stack from '../patterns/layout/Stack.svelte';
  import SegmentedControl from '../patterns/molecules/SegmentedControl.svelte';
  import Application, { tintPresets } from '../patterns/templates/Application.svelte';
  import CommandPalette from '../patterns/desktop/CommandPalette.svelte';
  import ContextMenu from '../patterns/desktop/ContextMenu.svelte';
  import ControlCenter from '../patterns/desktop/ControlCenter.svelte';
  import Desktop from '../patterns/desktop/Desktop.svelte';
  import Dock from '../patterns/desktop/Dock.svelte';
  import Inspector from '../patterns/desktop/Inspector.svelte';
  import InspectorRow from '../patterns/desktop/InspectorRow.svelte';
  import InspectorSection from '../patterns/desktop/InspectorSection.svelte';
  import Launchpad from '../patterns/desktop/Launchpad.svelte';
  import MenuBar from '../patterns/desktop/MenuBar.svelte';
  import NotificationCenter, {
    type OsNotification,
  } from '../patterns/desktop/NotificationCenter.svelte';
  import SourceList from '../patterns/desktop/SourceList.svelte';
  import StatusBar from '../patterns/desktop/StatusBar.svelte';
  import Toolbar from '../patterns/desktop/Toolbar.svelte';
  import TreeView from '../patterns/desktop/TreeView.svelte';
  import Widget from '../patterns/desktop/Widget.svelte';
  import Window from '../patterns/desktop/Window.svelte';
  import type { ContextMenuItem, DesktopIcon } from '../patterns/desktop/shared.svelte';
  import { celebrate, greeting } from '../utils/delight';
  import {
    agenda,
    apps,
    appMenus,
    commandGroups,
    controlToggles,
    desktopIcons,
    dock as dockItems,
    files as allFiles,
    laterNotifications,
    notes as seedNotes,
    places,
    seedNotifications,
    todos as seedTodos,
    tracks,
    wallpapers,
  } from './mock-desktop';

  const NAME = 'Alex';

  // ── The theme, owned by this page so Settings can change it live ──
  let tint = $state('#5a9854');
  let theme = $state<'auto' | 'light' | 'dark'>('auto');
  let radius = $state<'square' | 'soft' | 'round'>('soft');
  let density = $state<'compact' | 'default' | 'comfortable'>('default');
  /** `mesh` is the drifting tint mesh; the others are painted gradients. */
  let wallpaper = $state('mesh');
  const wallpaperValue = $derived(wallpapers.find((w) => w.id === wallpaper)?.value);

  // ── Windows ──
  interface Geometry {
    x: number;
    y: number;
    width: number;
    height: number;
  }
  const DEFAULTS: Record<string, Geometry> = {
    files: { x: 380, y: 8, width: 780, height: 410 },
    notes: { x: 440, y: 96, width: 560, height: 380 },
    settings: { x: 650, y: 132, width: 600, height: 460 },
    music: { x: 820, y: 24, width: 320, height: 470 },
  };
  let open = $state<Record<string, boolean>>({ files: true, settings: true });
  // Every app has an entry: `bind:` must not see undefined (the props have fallbacks).
  const allOff = () => Object.fromEntries(apps.map((a) => [a.id, false]));
  let minimized = $state<Record<string, boolean>>(allOff());
  let maximized = $state<Record<string, boolean>>(allOff());
  let geometry = $state<Record<string, Geometry>>(structuredClone(DEFAULTS));
  let focused = $state<string | undefined>('settings');
  const openIds = $derived(Object.keys(open).filter((id) => open[id]));
  const appOf = (id: string | undefined) => apps.find((a) => a.id === id);

  function launch(id: string) {
    if (id === 'launchpad' || id === 'jar') {
      jar = true;
      return;
    }
    if (id === 'trash') {
      notify({
        app: 'Files',
        icon: 'trash',
        color: 'gray',
        title: 'The trash is empty. Spotless.',
      });
      return;
    }
    if (!appOf(id)) return;
    geometry[id] ??= {
      x: 180 + openIds.length * 36,
      y: 40 + openIds.length * 28,
      width: 420,
      height: 320,
    };
    open[id] = true;
    minimized[id] = false;
    focused = id;
  }

  function close(id: string | undefined) {
    if (!id) return;
    open[id] = false;
    maximized[id] = false;
  }

  // ── Overlays ──
  let jar = $state(false);
  let control = $state(false);
  let palette = $state(false);
  let banners = $state(true);
  let notifications = $state<OsNotification[]>([...seedNotifications]);
  let toggles = $state(controlToggles.map((t) => ({ ...t })));
  let brightness = $state(100);
  let volume = $state(60);

  function notify(n: Omit<OsNotification, 'id'>) {
    if (!banners) return;
    notifications = [{ id: `n${Date.now()}`, time: 'now', ...n }, ...notifications];
  }

  // ── Music ──
  let track = $state(0);
  let playing = $state(true);
  let position = $state(42);
  const current = $derived(tracks[track] ?? tracks[0]!);
  const mmss = (s: number) =>
    `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
  const skip = (by: number) => {
    track = (track + by + tracks.length) % tracks.length;
    position = 0;
  };

  // ── Tray ──
  let traySize = $state(50);
  /** A phone's tray holds the five favourites; the jar has the rest. */
  let phone = $state(false);
  const trayItems = $derived.by(() => {
    const all = dockItems(openIds, focused);
    return phone ? all.filter((e) => 'id' in e && e.id !== 'trash').slice(0, 5) : all;
  });

  // ── Clock, and making the windows fit the screen we got ──
  let now = $state(new Date());
  const hello = $derived(greeting(now, NAME));
  onMount(() => {
    const narrow = matchMedia('(max-width: 520px)');
    const fit = () => (phone = narrow.matches);
    fit();
    narrow.addEventListener('change', fit);
    const w = window.innerWidth;
    const h = window.innerHeight - 64;
    // A phone opens on its home screen; windows wait in the tray.
    if (w <= 720) open = {};
    else
      for (const g of Object.values(geometry)) {
        g.width = Math.min(g.width, w - 48);
        g.height = Math.min(g.height, h - 120);
        g.x = Math.max(0, Math.min(g.x, w - g.width - 40));
        g.y = Math.max(0, Math.min(g.y, h - g.height - 110));
      }
    const clock = setInterval(() => {
      now = new Date();
      if (playing) position = position + 1 >= current.length ? (skip(1), 0) : position + 1;
    }, 1000);
    // A couple of notifications drift in, as on a real machine.
    const timers = laterNotifications.map((n, i) =>
      setTimeout(() => notify({ ...n, time: 'now' }), 4000 + i * 7000),
    );
    return () => {
      narrow.removeEventListener('change', fit);
      clearInterval(clock);
      timers.forEach(clearTimeout);
    };
  });

  // ── Little wins ──
  let wins = $state(seedTodos.map((t) => ({ ...t })));
  let winsCard = $state<HTMLElement>();
  const winsDone = $derived(wins.filter((t) => t.done).length);
  const allWon = $derived(winsDone === wins.length);
  function tick(id: string, done: boolean, from: HTMLElement) {
    wins = wins.map((t) => (t.id === id ? { ...t, done } : t));
    if (!done) return;
    // One celebration per action: the last win gets the big one instead of the small one.
    if (wins.every((t) => t.done)) celebrate(winsCard ?? from, 18);
    else celebrate(from, 8);
  }

  // ── Files ──
  let place = $state('documents');
  let fileView = $state<'grid' | 'list'>('grid');
  let fileSearch = $state('');
  let selectedFile = $state<string | undefined>();
  let fileList = $state(allFiles.map((f) => ({ ...f })));
  const placeLabel = $derived(
    places.flatMap((s) => s.items).find((i) => i.id === place)?.label ?? 'Files',
  );
  const shownFiles = $derived(
    fileList.filter(
      (f) =>
        (place === 'desktop' ? false : f.folder === place) &&
        f.name.toLowerCase().includes(fileSearch.trim().toLowerCase()),
    ),
  );

  function fileMenu(event: MouseEvent | KeyboardEvent): ContextMenuItem[] | undefined {
    const id = (event.target as HTMLElement).closest<HTMLElement>('[data-file]')?.dataset['file'];
    const file = fileList.find((f) => f.id === id);
    if (!file) return [{ label: 'New folder', icon: 'folder', onselect: newFolder }];
    selectedFile = file.id;
    return [
      {
        label: 'Open',
        onselect: () =>
          notify({ app: 'Files', icon: 'folder', color: 'blue', title: `Opening ${file.name}` }),
      },
      { label: 'Get info', icon: 'info', shortcut: '⌘I' },
      { label: 'Duplicate', icon: 'copy', shortcut: '⌘D', onselect: () => duplicate(file.id) },
      { separator: true },
      {
        label: 'Move to trash',
        icon: 'trash',
        danger: true,
        shortcut: '⌘⌫',
        onselect: () => trash(file.id),
      },
    ];
  }

  function newFolder() {
    fileList = [
      {
        id: `f${Date.now()}`,
        name: 'Untitled folder',
        kind: 'Folder',
        size: '0 items',
        modified: 'Now',
        icon: 'folder',
        color: 'blue',
        folder: place,
      },
      ...fileList,
    ];
  }
  function duplicate(id: string) {
    const f = fileList.find((x) => x.id === id);
    if (f)
      fileList = [...fileList, { ...f, id: `${f.id}-copy${Date.now()}`, name: `${f.name} copy` }];
  }
  function trash(id: string) {
    const f = fileList.find((x) => x.id === id);
    fileList = fileList.filter((x) => x.id !== id);
    if (f)
      notify({
        app: 'Files',
        icon: 'trash',
        color: 'gray',
        title: `“${f.name}” is in the trash`,
        body: 'Changed your mind? It waits there for 30 days.',
      });
  }

  // ── Notes ──
  let noteList = $state(seedNotes.map((n) => ({ ...n })));
  let noteId = $state('n1');
  const note = $derived(noteList.find((n) => n.id === noteId));
  function addNote() {
    const id = `n${Date.now()}`;
    noteList = [{ id, title: 'New note', body: '', updated: 'Now' }, ...noteList];
    noteId = id;
  }
  function deleteNote() {
    noteList = noteList.filter((n) => n.id !== noteId);
    noteId = noteList[0]?.id ?? '';
  }
  function edited() {
    if (note) note.updated = 'Now';
  }

  // ── Settings ──
  let pane = $state('appearance');
  const panes = [
    {
      items: [
        { id: 'appearance', label: 'Appearance', icon: 'palette' as const, color: 'purple' },
        { id: 'wallpaper', label: 'Wallpaper', icon: 'image' as const, color: 'cyan' },
        { id: 'tray', label: 'Tray', icon: 'layout' as const, color: 'blue' },
        { id: 'notifications', label: 'Notifications', icon: 'bell' as const, color: 'red' },
        { id: 'about', label: 'About', icon: 'info' as const, color: 'gray' },
      ],
    },
  ];
  const paneLabel = $derived(panes[0]?.items.find((p) => p.id === pane)?.label ?? 'Settings');

  // ── Desktop surface ──
  let selectedIcon = $state<string | undefined>();
  function openIcon(icon: DesktopIcon) {
    if (icon.id === 'holiday') place = 'pictures';
    if (icon.id === 'report') place = 'documents';
    if (icon.id === 'holiday' || icon.id === 'report') launch('files');
    else
      notify({
        app: 'Files',
        icon: icon.icon ?? 'file',
        color: icon.color,
        title: `Opened “${icon.label}”`,
      });
  }

  const frontApp = $derived(appOf(focused));
  const front = $derived(frontApp?.label ?? 'Desktop');
  const menus = $derived(
    appMenus(front, {
      close: () => close(focused),
      minimize: () => focused && (minimized[focused] = true),
      zoom: () => focused && (maximized[focused] = !maximized[focused]),
      settings: () => launch('settings'),
      about: () =>
        notify({
          app: front,
          icon: frontApp?.icon ?? 'info',
          color: frontApp?.color,
          title: front,
          body: 'Hand-made from the desktop patterns. No pixels were harmed.',
        }),
      new: () => (focused === 'notes' ? addNote() : launch('files')),
      open: () => launch('files'),
    }),
  );
  const wifi = $derived(toggles.find((t) => t.id === 'wifi')?.on ?? false);
  const darkNow = $derived(
    theme === 'dark' ||
      (theme === 'auto' &&
        typeof matchMedia === 'function' &&
        matchMedia('(prefers-color-scheme: dark)').matches),
  );
</script>

<Application {tint} {theme} {radius} {density} gradient={false}>
  <Desktop
    wallpaper={wallpaperValue}
    icons={desktopIcons}
    bind:selected={selectedIcon}
    bind:focused
    onopen={openIcon}
    contextmenu={[
      {
        label: 'New folder',
        icon: 'folder',
        onselect: () =>
          notify({
            app: 'Files',
            icon: 'folder',
            color: 'blue',
            title: 'New folder on the desktop',
            body: 'It looks great empty.',
          }),
      },
      {
        label: 'Change wallpaper…',
        icon: 'image',
        onselect: () => ((pane = 'wallpaper'), launch('settings')),
      },
      { separator: true },
      { label: 'All apps', icon: 'grid', onselect: () => (jar = true) },
      {
        label: 'Command palette',
        icon: 'command',
        shortcut: '⌘K',
        onselect: () => (palette = true),
      },
    ]}
  >
    {#snippet menubar()}
      <MenuBar
        logoLabel="System menu"
        logoMenu={[
          {
            label: 'About this desktop',
            icon: 'info',
            onselect: () => ((pane = 'about'), launch('settings')),
          },
          { label: 'Settings…', icon: 'settings', onselect: () => launch('settings') },
          { label: 'All apps', icon: 'grid', onselect: () => (jar = true) },
          { separator: true },
          {
            label: 'Dark mode',
            icon: 'moon',
            checked: darkNow,
            onselect: () => (theme = darkNow ? 'light' : 'dark'),
          },
        ]}
        appIcon={frontApp?.icon ?? 'monitor'}
        appColor={frontApp?.color ?? 'accent'}
        {menus}
        {now}
        name={NAME}
        status={[
          { icon: 'search', label: 'Search', onclick: () => (palette = true) },
          { icon: 'wifi', label: wifi ? 'Wi-Fi: Home network' : 'Wi-Fi: off' },
          { icon: 'battery', label: 'Battery', text: '82%' },
          {
            icon: 'layout',
            label: 'Control panel',
            onclick: () => (control = !control),
            active: control,
          },
        ]}
      />
    {/snippet}

    {#snippet widgets()}
      <div class="widget-grid">
        <Widget size="medium" class="hello">
          <span class="candies" aria-hidden="true"><i></i><i></i><i></i></span>
          <Text size="xs" weight="bold" tone="subtle" caps>
            {now.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
          </Text>
          <Heading level={2} size="2xl">{hello.text}</Heading>
          <Text size="sm" tone="muted">{hello.wink}</Text>
          <Text size="sm" tone="muted" class="hello-plan">
            {agenda.length} meetings · {wins.length - winsDone === 0
              ? 'every little win won'
              : `${wins.length - winsDone} little ${wins.length - winsDone === 1 ? 'win' : 'wins'} to go`}
          </Text>
        </Widget>
        <Widget
          title="Today"
          icon="calendar"
          color="red"
          figure={now.getDate()}
          caption={now.toLocaleDateString('en-GB', { weekday: 'long' })}
        >
          <Text size="xs" tone="muted" truncate>
            {agenda[0]?.time} · {agenda[0]?.title}
          </Text>
        </Widget>
        <Widget
          title="Weather"
          icon="sun"
          color="orange"
          figure="21°"
          caption="Sunny. Sunglasses advised."
        />
        <div class="wins" bind:this={winsCard}>
          <Widget
            size="medium"
            title="Little wins"
            icon="check-square"
            color="mint"
            meta="{winsDone} of {wins.length}"
          >
            {#if allWon}
              <div class="all-done">
                <Text weight="bold" size="lg">All done — that's a sweet day.</Text>
                <Text size="sm" tone="muted">Go outside. The desktop will wait.</Text>
                <Row>
                  <Button
                    size="sm"
                    shape="pill"
                    icon="reload"
                    label="Start over"
                    onclick={() => (wins = seedTodos.map((t) => ({ ...t, done: false })))}
                  />
                </Row>
              </div>
            {:else}
              <!-- Ticked wins leave the list: what is left is what matters. -->
              <ul class="todo">
                {#each wins.filter((t) => !t.done) as t (t.id)}
                  <li>
                    <Checkbox
                      label={t.label}
                      checked={t.done}
                      onchange={(e) => tick(t.id, e.currentTarget.checked, e.currentTarget)}
                    />
                  </li>
                {/each}
              </ul>
            {/if}
          </Widget>
        </div>
        <Widget size="medium" title="Now playing" icon="music" color="pink">
          <Row gap="md" wrap={false}>
            <span
              class="art"
              style:--a={current.colors[0]}
              style:--b={current.colors[1]}
              aria-hidden="true"
            ></span>
            <Stack gap="none" align="stretch" grow>
              <Text weight="bold" truncate>{current.title}</Text>
              <Text size="sm" tone="muted" truncate>{current.artist}</Text>
            </Stack>
            <Button
              variant="primary"
              shape="pill"
              icon={playing ? 'pause' : 'play'}
              label={playing ? 'Pause' : 'Play'}
              iconOnly
              onclick={() => (playing = !playing)}
            />
          </Row>
          <span class="push"></span>
          <ProgressBar label="Position" value={position} max={current.length} size="sm" />
        </Widget>
      </div>
    {/snippet}

    {#snippet dock()}
      <Dock
        items={trayItems}
        size={traySize}
        onselect={(a) => launch(a.id)}
        onjar={() => (jar = !jar)}
        jarOpen={jar}
      />
    {/snippet}

    <!-- ── Files ── -->
    {#if open['files'] && geometry['files']}
      <Window
        id="files"
        app="Files"
        icon="folder"
        color="blue"
        title={placeLabel}
        subtitle="{shownFiles.length} items"
        bind:x={geometry['files'].x}
        bind:y={geometry['files'].y}
        bind:width={geometry['files'].width}
        bind:height={geometry['files'].height}
        bind:minimized={minimized['files']}
        bind:maximized={maximized['files']}
        padding="none"
        onclose={() => close('files')}
      >
        {#snippet sidebar()}
          <SourceList sections={places} bind:value={place} label="Places" />
        {/snippet}
        {#snippet toolbar()}
          <Toolbar
            variant="plain"
            bind:search={fileSearch}
            searchPlaceholder="Search files"
            items={[
              { icon: 'chevron-left', label: 'Back' },
              { icon: 'chevron-right', label: 'Forward', disabled: true },
              { spacer: true },
              {
                icon: 'grid',
                label: 'Icons',
                active: fileView === 'grid',
                onclick: () => (fileView = 'grid'),
              },
              {
                icon: 'list',
                label: 'List',
                active: fileView === 'list',
                onclick: () => (fileView = 'list'),
              },
              { separator: true },
              { icon: 'plus', label: 'New folder', onclick: newFolder },
            ]}
          />
        {/snippet}
        <ContextMenu onopen={fileMenu} label="File actions">
          <div
            class="files"
            role="presentation"
            onclick={(e) => e.target === e.currentTarget && (selectedFile = undefined)}
          >
            {#if !shownFiles.length}
              <Stack align="center" justify="center" padding="2xl" gap="sm">
                <AppIcon label="Empty folder" icon="folder" color="glass" size="lg" />
                <Text tone="muted">
                  {fileSearch
                    ? 'Nothing here — try fewer words.'
                    : 'This folder is empty. Very zen.'}
                </Text>
              </Stack>
            {:else if fileView === 'grid'}
              <Grid min="6.5rem" gap="md" padding="lg">
                {#each shownFiles as f (f.id)}
                  <div class="file" data-file={f.id}>
                    <AppIcon
                      label={f.name}
                      icon={f.icon}
                      color={f.color}
                      size="lg"
                      caption
                      active={selectedFile === f.id}
                      onclick={() => (selectedFile = f.id)}
                    />
                  </div>
                {/each}
              </Grid>
            {:else}
              <div class="list">
                <TreeView
                  label="Files"
                  nodes={shownFiles.map((f) => ({
                    id: f.id,
                    label: f.name,
                    icon: f.icon,
                    color: f.color,
                    meta: `${f.kind} · ${f.size}`,
                  }))}
                  bind:value={selectedFile}
                />
              </div>
            {/if}
          </div>
        </ContextMenu>
        {#snippet footer()}
          <StatusBar
            items={[
              { label: `${shownFiles.length} items` },
              ...(selectedFile
                ? [{ label: '1 selected', tone: 'accent' as const, dot: true }]
                : []),
            ]}
            trailing={[{ label: '212 GB free — room for ideas', icon: 'database' }]}
          />
        {/snippet}
      </Window>
    {/if}

    <!-- ── Notes ── -->
    {#if open['notes'] && geometry['notes']}
      <Window
        id="notes"
        app="Notes"
        icon="edit"
        color="yellow"
        title={note?.title || 'Notes'}
        subtitle={note ? `Edited ${note.updated.toLowerCase()}` : undefined}
        bind:x={geometry['notes'].x}
        bind:y={geometry['notes'].y}
        bind:width={geometry['notes'].width}
        bind:height={geometry['notes'].height}
        bind:minimized={minimized['notes']}
        bind:maximized={maximized['notes']}
        sidebarWidth="12rem"
        onclose={() => close('notes')}
      >
        {#snippet sidebar()}
          <SourceList
            label="Notes"
            bind:value={noteId}
            sections={[
              {
                title: 'All notes',
                items: noteList.map((n) => ({
                  id: n.id,
                  label: n.title || 'Untitled',
                  icon: 'file-text' as const,
                  color: 'yellow',
                  count: n.updated,
                })),
              },
            ]}
          />
        {/snippet}
        {#snippet toolbar()}
          <Toolbar
            variant="plain"
            items={[
              { spacer: true },
              { icon: 'plus', label: 'New note', onclick: addNote },
              { icon: 'trash', label: 'Delete note', disabled: !note, onclick: deleteNote },
              { icon: 'share', label: 'Share' },
            ]}
          />
        {/snippet}
        {#if note}
          <Stack gap="sm">
            <Input
              bind:value={note.title}
              aria-label="Title"
              placeholder="Title"
              oninput={edited}
            />
            <Textarea
              bind:value={note.body}
              aria-label="Note"
              variant="plain"
              rows={10}
              autogrow
              oninput={edited}
            />
          </Stack>
        {:else}
          <Stack align="center" padding="2xl">
            <Text tone="muted">A blank page. The best kind.</Text>
            <Button variant="primary" icon="plus" label="New note" onclick={addNote} />
          </Stack>
        {/if}
        {#snippet footer()}
          <StatusBar
            items={[{ label: `${note?.body.split(/\s+/).filter(Boolean).length ?? 0} words` }]}
            trailing={[{ label: 'Saved. Nice.', dot: true, tone: 'ok' }]}
          />
        {/snippet}
      </Window>
    {/if}

    <!-- ── Music ── -->
    {#if open['music'] && geometry['music']}
      <Window
        id="music"
        icon="music"
        color="pink"
        title="Music"
        subtitle={playing ? 'Playing' : 'Paused'}
        bind:x={geometry['music'].x}
        bind:y={geometry['music'].y}
        bind:width={geometry['music'].width}
        bind:height={geometry['music'].height}
        bind:minimized={minimized['music']}
        bind:maximized={maximized['music']}
        padding="lg"
        onclose={() => close('music')}
      >
        <Stack gap="md" align="stretch">
          <span
            class="cover"
            style:--a={current.colors[0]}
            style:--b={current.colors[1]}
            aria-hidden="true"
          >
            <span class="cover-glow"></span>
          </span>
          <Stack gap="none" align="stretch">
            <Heading level={3} size="xl">{current.title}</Heading>
            <Text tone="muted">{current.artist} · {current.album}</Text>
          </Stack>
          <Slider label="Position" bind:value={position} max={current.length} format={mmss} />
          <Row justify="center" gap="md">
            <Button
              icon="chevron-left"
              label="Previous"
              iconOnly
              shape="pill"
              onclick={() => skip(-1)}
            />
            <Button
              variant="primary"
              size="lg"
              shape="pill"
              icon={playing ? 'pause' : 'play'}
              label={playing ? 'Pause' : 'Play'}
              iconOnly
              onclick={() => (playing = !playing)}
            />
            <Button
              icon="chevron-right"
              label="Next"
              iconOnly
              shape="pill"
              onclick={() => skip(1)}
            />
          </Row>
        </Stack>
      </Window>
    {/if}

    <!-- ── Settings ── -->
    {#if open['settings'] && geometry['settings']}
      <Window
        id="settings"
        app="Settings"
        icon="settings"
        color="gray"
        title={paneLabel}
        bind:x={geometry['settings'].x}
        bind:y={geometry['settings'].y}
        bind:width={geometry['settings'].width}
        bind:height={geometry['settings'].height}
        bind:minimized={minimized['settings']}
        bind:maximized={maximized['settings']}
        sidebarWidth="12.5rem"
        padding="sm"
        onclose={() => close('settings')}
      >
        {#snippet sidebar()}
          <SourceList sections={panes} bind:value={pane} label="Settings" />
        {/snippet}

        {#if pane === 'appearance'}
          <Inspector label="Appearance">
            <InspectorSection title="Colour">
              <InspectorRow label="Tint" hint="Every accent, glow and the wallpaper follow it.">
                <div class="tints" role="radiogroup" aria-label="Tint">
                  {#each tintPresets as t (t.value)}
                    <button
                      type="button"
                      class="tint"
                      role="radio"
                      aria-checked={tint === t.value}
                      aria-label={t.name}
                      title={t.name}
                      style:--swatch={t.value}
                      onclick={() => (tint = t.value)}
                    ></button>
                  {/each}
                  <label class="tint custom" title="Custom colour">
                    <input type="color" bind:value={tint} aria-label="Custom tint" />
                  </label>
                </div>
              </InspectorRow>
              <InspectorRow label="Theme">
                <SegmentedControl
                  label="Theme"
                  bind:value={theme}
                  options={[
                    { value: 'auto', label: 'Auto' },
                    { value: 'light', label: 'Light' },
                    { value: 'dark', label: 'Dark' },
                  ]}
                />
              </InspectorRow>
            </InspectorSection>
            <InspectorSection title="Shape">
              <InspectorRow label="Corners">
                <SegmentedControl
                  label="Corners"
                  bind:value={radius}
                  options={[
                    { value: 'square', label: 'Square' },
                    { value: 'soft', label: 'Soft' },
                    { value: 'round', label: 'Round' },
                  ]}
                />
              </InspectorRow>
              <InspectorRow label="Density">
                <SegmentedControl
                  label="Density"
                  bind:value={density}
                  options={[
                    { value: 'compact', label: 'Compact' },
                    { value: 'default', label: 'Default' },
                    { value: 'comfortable', label: 'Roomy' },
                  ]}
                />
              </InspectorRow>
            </InspectorSection>
            <InspectorSection title="Preview">
              <InspectorRow label="Controls">
                <Row gap="sm">
                  <Button variant="primary" label="Primary" />
                  <Button label="Secondary" />
                  <Badge tone="live" label="Live" />
                </Row>
              </InspectorRow>
            </InspectorSection>
          </Inspector>
        {:else if pane === 'wallpaper'}
          <Inspector label="Wallpaper">
            <InspectorSection title="Wallpaper">
              <div class="wallpapers" role="radiogroup" aria-label="Wallpaper">
                <button
                  type="button"
                  class="wallpaper"
                  role="radio"
                  aria-checked={wallpaper === 'mesh'}
                  onclick={() => (wallpaper = 'mesh')}
                >
                  <span class="thumb mesh"></span>
                  <Text size="sm" weight="medium">Tint mesh</Text>
                </button>
                {#each wallpapers as w (w.id)}
                  <button
                    type="button"
                    class="wallpaper"
                    role="radio"
                    aria-checked={wallpaper === w.id}
                    onclick={() => (wallpaper = w.id)}
                  >
                    <span class="thumb" style:background-image={w.value}></span>
                    <Text size="sm" weight="medium">{w.name}</Text>
                  </button>
                {/each}
              </div>
            </InspectorSection>
          </Inspector>
        {:else if pane === 'tray'}
          <Inspector label="Tray">
            <InspectorSection title="Tray">
              <InspectorRow label="Icon size">
                <Slider
                  label="Icon size"
                  bind:value={traySize}
                  min={40}
                  max={64}
                  format={(v) => `${v}px`}
                />
              </InspectorRow>
              <InspectorRow
                label="Why no zoom?"
                value="Icons that grow under the pointer move the thing you are aiming at. Ours lift and say their name instead."
              />
            </InspectorSection>
          </Inspector>
        {:else if pane === 'notifications'}
          <Inspector label="Notifications">
            <InspectorSection title="Banners">
              <InspectorRow label="Show banners">
                <Switch bind:checked={banners} label="Apps may show banners" />
              </InspectorRow>
              <InspectorRow label="Try it">
                <Button
                  icon="bell"
                  label="Send a test banner"
                  onclick={() =>
                    notify({
                      app: 'Settings',
                      icon: 'bell',
                      color: 'red',
                      title: 'Testing, testing…',
                      body: 'This is a banner. It leaves on its own in a few seconds — no hard feelings.',
                    })}
                />
              </InspectorRow>
            </InspectorSection>
          </Inspector>
        {:else}
          <Inspector title="This desktop" subtitle="Built from the desktop patterns">
            {#snippet preview()}<AppIcon
                label="This desktop"
                icon="monitor"
                color="accent"
                size="xl"
              />{/snippet}
            <InspectorSection title="Overview">
              <InspectorRow label="Display" value="Built-in, 2560 × 1600" />
              <InspectorRow label="Memory" value="16 GB — plenty for ideas" />
              <InspectorRow label="Sprinkles" value="Unlimited" />
              <InspectorRow label="Tint" value={tint} />
            </InspectorSection>
          </Inspector>
        {/if}
      </Window>
    {/if}

    <!-- ── Apps without a demo window ── -->
    {#each openIds.filter((id) => !(id in DEFAULTS)) as id (id)}
      {@const a = appOf(id)}
      {#if a && geometry[id]}
        <Window
          {id}
          title={a.label}
          icon={a.icon}
          color={a.color}
          bind:x={geometry[id].x}
          bind:y={geometry[id].y}
          bind:width={geometry[id].width}
          bind:height={geometry[id].height}
          bind:minimized={minimized[id]}
          bind:maximized={maximized[id]}
          onclose={() => close(id)}
        >
          <Stack align="center" justify="center" gap="sm" padding="lg">
            <span class="float"
              ><AppIcon label={a.label} icon={a.icon} color={a.color ?? 'accent'} size="xl" /></span
            >
            <Heading level={3} size="xl">{a.label} is still in the oven</Heading>
            <Text tone="muted" align="center">
              It is only an icon in this demo — try Files, Notes, Music or Settings.
            </Text>
            <Button label="Close" shape="pill" onclick={() => close(id)} />
          </Stack>
        </Window>
      {/if}
    {/each}

    <ControlCenter
      floating
      label="Control panel"
      bind:open={control}
      {toggles}
      ontoggle={(id, on) => (toggles = toggles.map((t) => (t.id === id ? { ...t, on } : t)))}
      bind:brightness
      bind:volume
      nowPlaying={{ title: current.title, artist: current.artist, playing }}
      onplaypause={() => (playing = !playing)}
      onnext={() => skip(1)}
      onprevious={() => skip(-1)}
    >
      <div class="tile-row">
        <Button
          icon={darkNow ? 'sun' : 'moon'}
          label={darkNow ? 'Light mode' : 'Dark mode'}
          onclick={() => (theme = darkNow ? 'light' : 'dark')}
        />
        <Button
          icon="settings"
          label="Settings"
          onclick={() => ((control = false), launch('settings'))}
        />
      </div>
    </ControlCenter>

    <Launchpad bind:open={jar} {apps} onselect={(a) => launch(a.id)} />

    <!-- Banners step aside while the control panel occupies their corner. -->
    <NotificationCenter
      notifications={control ? [] : notifications}
      duration={7000}
      onopen={(n) => {
        notifications = notifications.filter((x) => x.id !== n.id);
        if (n.app === 'Settings') launch('settings');
      }}
      onclose={(id) => (notifications = notifications.filter((n) => n.id !== id))}
    />
  </Desktop>

  <CommandPalette
    bind:open={palette}
    groups={commandGroups({ open: launch, theme: (t) => (theme = t), tint: (v) => (tint = v) })}
  />

  <!-- Brightness dims the whole screen, like the real thing. -->
  <div class="dim" style:opacity={(100 - brightness) / 140} aria-hidden="true"></div>
</Application>

<style>
  /* Two columns of square units; medium widgets span both. */
  .widget-grid {
    --widget-unit: 9.75rem;
    display: grid;
    grid-template-columns: repeat(2, var(--widget-unit));
    grid-auto-rows: auto;
    gap: var(--space-4);
  }
  .widget-grid > :global(.widget--medium),
  .wins {
    grid-column: span 2;
  }
  .widget-grid :global(.hello .content) {
    justify-content: flex-end;
    gap: var(--space-1);
  }
  .widget-grid :global(.hello h2) {
    letter-spacing: -0.02em;
  }
  .widget-grid :global(.hello-plan) {
    margin-top: var(--space-1);
  }
  /* Three candies float in the corner of the greeting — the only decoration on the desk. */
  .candies {
    position: absolute;
    top: var(--space-4);
    right: var(--space-4);
    display: flex;
    gap: 5px;
  }
  .candies i {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background:
      radial-gradient(circle at 35% 30%, rgba(255, 255, 255, 0.7), transparent 45%), var(--c);
    box-shadow: 0 2px 6px color-mix(in srgb, var(--c) 45%, transparent);
    animation: bb-float 4.2s var(--ease-in-out) infinite;
  }
  .candies i:nth-child(1) {
    --c: var(--tint-2);
  }
  .candies i:nth-child(2) {
    --c: var(--tint);
    animation-delay: -1.4s;
  }
  .candies i:nth-child(3) {
    --c: var(--tint-3);
    animation-delay: -2.8s;
  }
  .wins {
    display: flex;
  }
  .wins > :global(.widget) {
    flex: 1;
  }
  .todo {
    display: flex;
    flex-direction: column;
    gap: 2px;
    margin: 0;
    padding: 0;
    list-style: none;
    font-size: var(--fs-sm);
  }
  .todo li {
    animation: bb-rise var(--motion-base) var(--ease-out);
  }
  .all-done {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    animation: bb-rise var(--motion-slow) var(--ease-out);
  }
  .push {
    flex: 1;
  }
  .art,
  .cover {
    display: block;
    flex-shrink: 0;
    border-radius: var(--radius-md);
    background:
      radial-gradient(80% 80% at 20% 15%, rgba(255, 255, 255, 0.45), transparent 60%),
      linear-gradient(140deg, var(--a), var(--b));
    box-shadow: 0 10px 24px color-mix(in srgb, var(--b) 35%, transparent);
  }
  .art {
    width: 48px;
    height: 48px;
  }
  .cover {
    position: relative;
    aspect-ratio: 1;
    border-radius: var(--radius-card);
    overflow: hidden;
  }
  .cover-glow {
    position: absolute;
    inset: 22%;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.5), transparent 70%);
    filter: blur(8px);
  }
  .float {
    animation: bb-float 3.6s var(--ease-in-out) infinite;
  }
  .files {
    min-height: 100%;
  }
  .file {
    display: flex;
    justify-content: center;
  }
  .list {
    padding: var(--space-3);
  }
  .tints {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
  }
  .tint {
    position: relative;
    width: 26px;
    height: 26px;
    padding: 0;
    border: 0;
    border-radius: 50%;
    background: var(--swatch);
    box-shadow:
      inset 0 0 0 1px rgba(0, 0, 0, 0.12),
      inset 0 1px 0 rgba(255, 255, 255, 0.5);
    cursor: pointer;
    transition: transform var(--motion-base) var(--ease-spring);
  }
  .tint:hover {
    transform: scale(1.12);
  }
  .tint:active {
    transform: var(--press-squish);
  }
  .tint[aria-checked='true'] {
    box-shadow:
      0 0 0 2px var(--glass-strong),
      0 0 0 4px var(--swatch);
  }
  .tint:focus-visible,
  .custom:focus-within {
    outline: var(--focus-ring);
    outline-offset: 4px;
  }
  .custom {
    overflow: hidden;
    background: conic-gradient(
      var(--color-red),
      var(--color-yellow),
      var(--color-green),
      var(--color-cyan),
      var(--color-blue),
      var(--color-purple),
      var(--color-red)
    );
  }
  .custom input {
    opacity: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
  .wallpapers {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(7.5rem, 1fr));
    gap: var(--space-3);
    padding: 0 var(--space-3);
  }
  .wallpaper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-1);
    padding: 0;
    border: 0;
    background: none;
    color: inherit;
    font: inherit;
    cursor: pointer;
  }
  .thumb {
    width: 100%;
    aspect-ratio: 16 / 10;
    border-radius: var(--radius-lg);
    box-shadow: var(--glass-shadow);
    transition: transform var(--motion-base) var(--ease-out);
  }
  .thumb.mesh {
    background:
      radial-gradient(60% 70% at 20% 25%, var(--tint) 0%, transparent 70%),
      radial-gradient(60% 70% at 80% 30%, var(--tint-2) 0%, transparent 70%),
      radial-gradient(70% 60% at 50% 100%, var(--tint-3) 0%, transparent 70%), var(--bg);
    filter: saturate(0.8);
  }
  .wallpaper:hover .thumb {
    transform: var(--hover-lift);
  }
  .wallpaper[aria-checked='true'] .thumb {
    box-shadow:
      0 0 0 2px var(--glass-strong),
      0 0 0 4px var(--accent);
  }
  .wallpaper:focus-visible {
    outline: none;
  }
  .wallpaper:focus-visible .thumb {
    outline: var(--focus-ring);
    outline-offset: 5px;
  }
  .tile-row {
    display: flex;
    gap: var(--space-2);
  }
  .tile-row > :global(*) {
    flex: 1;
  }
  .dim {
    position: fixed;
    inset: 0;
    z-index: 1000;
    background: #000;
    pointer-events: none;
  }
  /* A phone: the widgets fill the home screen two by two. */
  @media (max-width: 720px) {
    .widget-grid {
      --widget-unit: calc((100cqi - var(--space-4)) / 2);
      container-type: inline-size;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      width: 100%;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .candies i,
    .float,
    .todo li,
    .all-done {
      animation: none;
    }
  }
</style>
