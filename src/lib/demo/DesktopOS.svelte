<script lang="ts">
  /**
   * Example page: a complete, original candy desktop — the tint mesh as wallpaper, the top
   * shelf with a day pill that greets you, widgets (a greeting, today, the weather, little
   * wins, now playing), floating windows (Files, Mail, Notes, Calendar, Preview, Settings,
   * Music) with their glyph controls, the candy tray with its jar of all apps, quick settings,
   * banners for what happens in the background and a ⌘K command palette.
   *
   * Every answer appears where you acted: a window grows out of what opened it and goes home to
   * its tray icon, a trashed file flies into the trash, a new folder appears where you
   * right-clicked, ready to be named, a deleted message or note leaves its place with Undo in
   * it. Banners are only for what nobody clicked: mail arriving, a download finishing, a
   * meeting coming up. On a phone the desktop becomes a home screen and windows open as sheets
   * above the tray (Storybook only, mock data).
   */
  import { onMount, tick } from 'svelte';
  import AppIcon from '../patterns/atoms/AppIcon.svelte';
  import Badge from '../patterns/atoms/Badge.svelte';
  import Button from '../patterns/atoms/Button.svelte';
  import Checkbox from '../patterns/atoms/Checkbox.svelte';
  import Heading from '../patterns/atoms/Heading.svelte';
  import Icon from '../patterns/atoms/Icon.svelte';
  import Input from '../patterns/atoms/Input.svelte';
  import ProgressBar from '../patterns/atoms/ProgressBar.svelte';
  import Slider from '../patterns/atoms/Slider.svelte';
  import Switch from '../patterns/atoms/Switch.svelte';
  import Text from '../patterns/atoms/Text.svelte';
  import Textarea from '../patterns/atoms/Textarea.svelte';
  import { changeCue, flashChanged } from '../patterns/atoms/changed';
  import { colorValue } from '../patterns/atoms/palette';
  import Grid from '../patterns/layout/Grid.svelte';
  import Row from '../patterns/layout/Row.svelte';
  import Stack from '../patterns/layout/Stack.svelte';
  import ConfirmButton from '../patterns/molecules/ConfirmButton.svelte';
  import EmptyState from '../patterns/molecules/EmptyState.svelte';
  import SegmentedControl from '../patterns/molecules/SegmentedControl.svelte';
  import Application, { tintPresets } from '../patterns/templates/Application.svelte';
  import AppJar from '../patterns/desktop/AppJar.svelte';
  import CommandPalette from '../patterns/desktop/CommandPalette.svelte';
  import ContextMenu from '../patterns/desktop/ContextMenu.svelte';
  import Desktop from '../patterns/desktop/Desktop.svelte';
  import Dock from '../patterns/desktop/Dock.svelte';
  import Inspector from '../patterns/desktop/Inspector.svelte';
  import InspectorRow from '../patterns/desktop/InspectorRow.svelte';
  import InspectorSection from '../patterns/desktop/InspectorSection.svelte';
  import MenuBar from '../patterns/desktop/MenuBar.svelte';
  import NotificationCenter, {
    type OsNotification,
  } from '../patterns/desktop/NotificationCenter.svelte';
  import QuickSettings from '../patterns/desktop/QuickSettings.svelte';
  import SourceList from '../patterns/desktop/SourceList.svelte';
  import StatusBar from '../patterns/desktop/StatusBar.svelte';
  import Toolbar from '../patterns/desktop/Toolbar.svelte';
  import TreeView from '../patterns/desktop/TreeView.svelte';
  import Widget from '../patterns/desktop/Widget.svelte';
  import Window from '../patterns/desktop/Window.svelte';
  import type {
    ContextMenuItem,
    DesktopIcon,
    DesktopPoint,
    WindowManager,
  } from '../patterns/desktop/shared.svelte';
  import { celebrate, greeting } from '../utils/delight';
  import DesignNotes, { type DesignNote } from './DesignNotes.svelte';
  import DesktopApp from './DesktopApp.svelte';
  import { flyInto } from './desktop-flight';
  import {
    agenda,
    apps,
    appMenus,
    backgroundDownload,
    backgroundMail,
    commandGroups,
    controlToggles,
    dock as dockItems,
    files as allFiles,
    laterNotifications,
    mails as seedMails,
    notes as seedNotes,
    places,
    todos as seedTodos,
    tracks,
    wallpapers,
    type FileEntry,
    type Note,
  } from './mock-desktop';

  const NAME = 'Alex';
  /** Accessible name of the desktop's icon list (the design notes point at it). */
  const ICONS = 'On the desktop';

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
  /** The apps with a real window; the others are still in the oven. */
  const DEFAULTS: Record<string, Geometry> = {
    files: { x: 372, y: 8, width: 680, height: 400 },
    mail: { x: 412, y: 64, width: 900, height: 580 },
    notes: { x: 470, y: 64, width: 560, height: 380 },
    calendar: { x: 400, y: 40, width: 380, height: 420 },
    preview: { x: 540, y: 36, width: 520, height: 460 },
    settings: { x: 560, y: 120, width: 600, height: 460 },
    music: { x: 860, y: 24, width: 320, height: 470 },
  };
  let open = $state<Record<string, boolean>>({ files: true, mail: true });
  // Every app has an entry: `bind:` must not see undefined (the props have fallbacks).
  const allOff = () => Object.fromEntries(apps.map((a) => [a.id, false]));
  let minimized = $state<Record<string, boolean>>(allOff());
  let maximized = $state<Record<string, boolean>>(allOff());
  let geometry = $state<Record<string, Geometry>>(structuredClone(DEFAULTS));
  let focused = $state<string | undefined>('mail');
  const openIds = $derived(Object.keys(open).filter((id) => open[id]));
  const appOf = (id: string | undefined) => apps.find((a) => a.id === id);

  /** The desktop's window manager (`bind:manager`): lets a window grow out of anything. */
  let wm = $state<WindowManager>();
  /** An app's icon in the tray (the part that lifts), to fly into or open from. */
  const trayIcon = (id: string) =>
    wm?.tray?.querySelector<HTMLElement>(`[data-app="${CSS.escape(id)}"] .lift`) ?? undefined;

  /** Opens (or brings forward) an app; a window that was not showing grows out of `from`. */
  function launch(id: string, from?: Element | DOMRect | null) {
    if (id === 'launchpad' || id === 'jar') {
      jarAnchor = from ?? undefined;
      jar = true;
      return;
    }
    if (id === 'trash') {
      go('trash');
      launch('files', from ?? trayIcon('trash'));
      return;
    }
    if (!appOf(id)) return;
    if (from && !(open[id] && !minimized[id])) wm?.openFrom(from, id);
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
  let jarAnchor = $state<Element | DOMRect>();
  let quick = $state(false);
  let quickAnchor = $state<Element>();
  let palette = $state(false);
  let banners = $state(true);
  let notifications = $state<OsNotification[]>([]);
  let toggles = $state(controlToggles.map((t) => ({ ...t })));
  let brightness = $state(100);
  let volume = $state(60);
  const focusMode = $derived(toggles.find((t) => t.id === 'focus')?.on ?? false);
  /** What a banner does when it is clicked, by notification id. */
  const onBanner: Record<string, () => void> = {};

  /** Banners are for what happens in the background — nobody clicked, so there is no place to
   *  answer at. Everything you do yourself answers where you did it. */
  function notify(n: OsNotification, open?: () => void) {
    if (open) onBanner[n.id] = open;
    if (!banners || focusMode) return;
    notifications = [n, ...notifications.filter((x) => x.id !== n.id)];
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

  // ── Mail (the page owns the messages, so mail can arrive while the window is closed) ──
  let mails = $state(seedMails.map((m) => ({ ...m })));
  let mailSelected = $state<string | undefined>('m1');
  const unread = $derived(mails.filter((m) => m.mailbox === 'inbox' && m.unread).length);
  const jarApps = $derived(
    apps.map((a) => (a.id === 'mail' ? { ...a, badge: unread || undefined } : a)),
  );

  // ── Files: the desktop is a folder too, and the trash is a place you can open ──
  let fileList = $state<FileEntry[]>(allFiles.map((f) => ({ ...f })));
  let place = $state('documents');
  let back = $state<string[]>([]);
  let ahead = $state<string[]>([]);
  let fileView = $state<'grid' | 'list'>('grid');
  let fileSearch = $state('');
  let selectedFile = $state<string | undefined>();
  /** The file whose name is being typed in the Files grid… */
  let renaming = $state<string | undefined>();
  /** …and on the desktop (apart: a desktop file shows in Files → Desktop too). */
  let deskRenaming = $state<string | undefined>();
  /** The last thing that can be undone from Edit → Undo. */
  let undoable = $state<{ kind: 'file' | 'note'; label: string; run: () => void }>();

  const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? '' : 's'}`;
  const COUNTED = ['desktop', 'documents', 'downloads', 'pictures', 'trash'];
  const inPlace = (id: string) => fileList.filter((f) => f.folder === id).length;
  const placeSections = $derived(
    places.map((s) => ({
      ...s,
      items: s.items.map((i) =>
        COUNTED.includes(i.id) ? { ...i, count: inPlace(i.id) || undefined } : i,
      ),
    })),
  );
  const placeLabel = $derived(
    places.flatMap((s) => s.items).find((i) => i.id === place)?.label ??
      fileList.find((f) => f.id === place)?.name ??
      'Files',
  );
  const shownFiles = $derived(
    fileList.filter(
      (f) => f.folder === place && f.name.toLowerCase().includes(fileSearch.trim().toLowerCase()),
    ),
  );
  const trashCount = $derived(inPlace('trash'));
  /** The desktop's files; the ones made on the wallpaper keep the spot they were made at. */
  const deskIcons = $derived<DesktopIcon[]>(
    fileList
      .filter((f) => f.folder === 'desktop')
      .map((f) => ({
        id: f.id,
        label: f.name,
        icon: f.icon,
        color: f.color,
        meta: f.size,
        x: f.at?.x,
        y: f.at?.y,
      })),
  );

  function go(to: string) {
    if (to === place) return;
    back = [...back, place];
    ahead = [];
    place = to;
    selectedFile = undefined;
  }
  function step(dir: -1 | 1) {
    const from = dir < 0 ? back : ahead;
    const to = dir < 0 ? from.at(-1) : from[0];
    if (!to) return;
    if (dir < 0) {
      back = back.slice(0, -1);
      ahead = [place, ...ahead];
    } else {
      ahead = ahead.slice(1);
      back = [...back, place];
    }
    place = to;
    selectedFile = undefined;
  }

  /** Every element on screen that shows file `id`: its tile (or name) in Files, on the desktop. */
  function shownAs(id: string, part: 'tile' | 'name' = 'tile'): HTMLElement[] {
    const q = CSS.escape(id);
    const [inFiles, onDesk] = part === 'tile' ? ['.file-tile', '.tile'] : ['.file-name', '.name'];
    const selector = [
      `[data-file="${q}"] ${inFiles}`,
      `[role="listbox"][aria-label="${ICONS}"] [data-id="${q}"] ${onDesk}`,
    ].join(', ');
    return [...document.querySelectorAll<HTMLElement>(selector)].filter(
      (el) => el.getClientRects().length,
    );
  }

  /** Opens a file where it belongs: folders in Files, the rest in Preview — out of `from`. */
  function openFile(f: FileEntry, from?: Element | null) {
    if (f.kind === 'Folder') {
      go(f.opens ?? f.id);
      launch('files', from);
    } else if (f.kind === 'Audio') launch('music', from);
    else {
      previewId = f.id;
      launch('preview', from);
    }
  }

  /** Shows a file in Files, selected and glowing once. */
  async function reveal(id: string, from?: Element | null) {
    const f = fileList.find((x) => x.id === id);
    if (!f) return;
    fileSearch = '';
    go(f.folder);
    launch('files', from);
    selectedFile = id;
    await tick();
    shownAs(id).forEach(flashChanged);
  }

  /** "Untitled folder", "Untitled folder 2", … — never a name the folder already has. */
  function uniqueName(base: string, folder: string, ext = '') {
    const taken = new Set(fileList.filter((f) => f.folder === folder).map((f) => f.name));
    let name = base;
    for (let n = 2; taken.has(name + ext); n++) name = `${base} ${n}`;
    return name + ext;
  }

  function folderEntry(folder: string, at?: DesktopPoint): FileEntry {
    return {
      id: `f${Date.now()}`,
      name: uniqueName('Untitled folder', folder),
      kind: 'Folder',
      size: 'Empty',
      modified: 'Now',
      icon: 'folder',
      color: 'blue',
      folder,
      at,
    };
  }

  /** A new folder in the open Files place: first in the grid, its name ready to type. */
  function newFolder() {
    const f = folderEntry(place);
    fileList = [f, ...fileList];
    fileView = 'grid';
    fileSearch = '';
    selectedFile = f.id;
    renaming = f.id;
  }

  // ── The wallpaper: things land where you right-clicked ──
  let point: { x: number; y: number } | undefined;
  let selectedIcon = $state<string | undefined>();

  /** Where the last right click was, as a tiny rect to grow things out of. */
  const pointRect = () => (point ? new DOMRect(point.x - 2, point.y - 2, 4, 4) : undefined);

  /** A new folder right under the pointer (the Desktop says where), its name ready to type. */
  function newDesktopFolder(at: DesktopPoint) {
    const f = folderEntry('desktop', at);
    fileList = [...fileList, f];
    selectedIcon = f.id;
    deskRenaming = f.id;
  }

  function renameFile(id: string, name: string) {
    fileList = fileList.map((x) => (x.id === id ? { ...x, name } : x));
  }

  /** Types a new name in a Files tile: Enter or leaving keeps it, Escape the old one. (The
   *  desktop's own icons rename themselves: Desktop's `renaming`.) */
  function renamer(node: HTMLInputElement, id: string) {
    const f = fileList.find((x) => x.id === id);
    node.value = f?.name ?? '';
    void tick().then(() => {
      node.focus();
      const dot = node.value.lastIndexOf('.');
      node.setSelectionRange(0, dot > 0 ? dot : node.value.length);
    });
    let settled = false;
    const finish = async (keep: boolean) => {
      if (settled) return;
      settled = true;
      const name = node.value.trim();
      const changed = keep && !!name && name !== f?.name;
      if (changed) renameFile(id, name);
      const hadFocus = document.activeElement === node;
      renaming = undefined;
      await tick();
      // Focus goes back to the item (unless it moved on by itself); the new name glows once.
      if (hadFocus)
        document.querySelector<HTMLElement>(`[data-file="${CSS.escape(id)}"] .file-hit`)?.focus();
      if (changed) shownAs(id, 'name').forEach(flashChanged);
    };
    const onkeydown = (e: KeyboardEvent) => {
      e.stopPropagation();
      if (e.key === 'Enter') void finish(true);
      else if (e.key === 'Escape') void finish(false);
    };
    const onblur = () => void finish(true);
    node.addEventListener('keydown', onkeydown);
    node.addEventListener('blur', onblur);
    return {
      destroy() {
        node.removeEventListener('keydown', onkeydown);
        node.removeEventListener('blur', onblur);
      },
    };
  }

  function duplicate(id: string) {
    const f = fileList.find((x) => x.id === id);
    if (!f) return;
    const dot = f.name.lastIndexOf('.');
    const base = dot > 0 ? f.name.slice(0, dot) : f.name;
    const ext = dot > 0 ? f.name.slice(dot) : '';
    const copy = {
      ...f,
      id: `${f.id}-copy${Date.now()}`,
      name: uniqueName(`${base} copy`, f.folder, ext),
      at: f.at ? { x: f.at.x + 24, y: f.at.y + 24 } : undefined,
    };
    const at = fileList.indexOf(f);
    fileList = [...fileList.slice(0, at + 1), copy, ...fileList.slice(at + 1)];
    selectedFile = copy.id;
  }

  /** Into the trash: a copy of its icon flies there, the trash squishes as it lands. */
  function trash(id: string, from?: Element | null) {
    const f = fileList.find((x) => x.id === id);
    if (!f || f.folder === 'trash') return;
    void flyInto(from ?? shownAs(id)[0], trayIcon('trash'));
    fileList = fileList.map((x) => (x.id === id ? { ...x, folder: 'trash', was: x.folder } : x));
    if (selectedFile === id) selectedFile = undefined;
    undoable = { kind: 'file', label: 'Move to trash', run: () => putBack(id) };
  }
  async function putBack(id: string) {
    fileList = fileList.map((x) =>
      x.id === id ? { ...x, folder: x.was ?? 'documents', was: undefined } : x,
    );
    if (undoable?.kind === 'file') undoable = undefined;
    await tick();
    shownAs(id).forEach(flashChanged);
  }

  function itemMenu(f: FileEntry, tile: Element | null, rename?: () => void): ContextMenuItem[] {
    if (f.folder === 'trash')
      return [
        { label: 'Put back', icon: 'undo', onselect: () => putBack(f.id) },
        { separator: true },
        {
          label: 'Delete immediately',
          icon: 'trash',
          danger: true,
          onselect: () => (fileList = fileList.filter((x) => x.id !== f.id)),
        },
      ];
    return [
      { label: 'Open', icon: 'external', shortcut: '↵', onselect: () => openFile(f, tile) },
      ...(rename ? [{ label: 'Rename', icon: 'pencil' as const, onselect: rename }] : []),
      { label: 'Duplicate', icon: 'copy', shortcut: '⌘D', onselect: () => duplicate(f.id) },
      { separator: true },
      {
        label: 'Move to trash',
        icon: 'trash',
        danger: true,
        shortcut: '⌘⌫',
        onselect: () => trash(f.id, tile),
      },
    ];
  }

  /** Right click inside Files: the clicked file's menu, else the folder's own. */
  function fileMenu(event: MouseEvent | KeyboardEvent): ContextMenuItem[] | undefined {
    const el = (event.target as HTMLElement).closest<HTMLElement>('[data-file], .list [data-id]');
    const id = el?.dataset['file'] ?? el?.dataset['id'];
    const f = fileList.find((x) => x.id === id);
    if (!f) {
      if (place === 'trash') return [];
      return [{ label: 'New folder', icon: 'folder', onselect: newFolder }];
    }
    selectedFile = f.id;
    return itemMenu(
      f,
      el?.querySelector('.file-tile') ?? el ?? null,
      fileView === 'grid' ? () => (renaming = f.id) : undefined,
    );
  }

  /** Right click on a desktop icon (the wallpaper's own menu is the Desktop's). */
  function desktopMenu(event: MouseEvent | KeyboardEvent): ContextMenuItem[] {
    if (event instanceof MouseEvent) point = { x: event.clientX, y: event.clientY };
    if (event.defaultPrevented) return [];
    const el = (event.target as HTMLElement).closest<HTMLElement>('[data-id]');
    const onDesk = el?.parentElement?.getAttribute('aria-label') === ICONS;
    const f = fileList.find((x) => onDesk && x.id === el?.dataset['id'] && x.folder === 'desktop');
    if (!f || !el) return [];
    selectedIcon = f.id;
    return itemMenu(f, el.querySelector('.tile') ?? el, () => (deskRenaming = f.id));
  }

  function onFileKeydown(event: KeyboardEvent, f: FileEntry) {
    const tile = (event.currentTarget as Element).querySelector('.file-tile, .tile');
    if (event.key === 'Enter') openFile(f, tile);
    else if (event.key === 'F2') renaming = f.id;
    else if ((event.key === 'Backspace' && event.metaKey) || event.key === 'Delete')
      trash(f.id, tile);
    else return;
    event.preventDefault();
  }

  // ── Preview ──
  let previewId = $state<string | undefined>();
  const previewing = $derived(fileList.find((f) => f.id === previewId));
  let previewBody = $state<HTMLElement>();
  const LANES = [
    { title: 'To do', cards: [0, 1, 2] },
    { title: 'Doing', cards: [0, 1] },
    { title: 'Done', cards: [0, 1, 2, 3] },
  ];
  const previewKind = (f: FileEntry) =>
    /image/i.test(f.kind)
      ? 'image'
      : /pdf|markdown/i.test(f.kind)
        ? 'page'
        : f.kind === 'Board'
          ? 'board'
          : 'other';

  // ── Notes: deleting leaves the note's place with Undo in it ──
  let noteList = $state(seedNotes.map((n) => ({ ...n })));
  let noteId = $state('n1');
  let noteGone = $state<{ note: Note; index: number }>();
  let noteEditor = $state<HTMLElement>();
  const note = $derived(noteList.find((n) => n.id === noteId));
  function addNote() {
    const id = `n${Date.now()}`;
    noteList = [{ id, title: 'New note', body: '', updated: 'Now' }, ...noteList];
    noteId = id;
  }
  function deleteNote() {
    const index = noteList.findIndex((n) => n.id === noteId);
    const gone = noteList[index];
    if (!gone) return;
    noteGone = { note: gone, index };
    noteList = noteList.filter((n) => n.id !== gone.id);
    noteId = '';
    undoable = { kind: 'note', label: 'Delete note', run: restoreNote };
  }
  async function restoreNote() {
    if (!noteGone) return;
    const { note: back, index } = noteGone;
    noteList = [...noteList.slice(0, index), back, ...noteList.slice(index)];
    noteGone = undefined;
    noteId = back.id;
    if (undoable?.kind === 'note') undoable = undefined;
    await tick();
    if (noteEditor) flashChanged(noteEditor);
  }
  // Picking another note settles the delete.
  $effect(() => {
    if (!noteId) return;
    noteGone = undefined;
    if (undoable?.kind === 'note') undoable = undefined;
  });
  function edited() {
    if (note) note.updated = 'Now';
  }

  // ── Tray ──
  let traySize = $state(50);
  /** A phone's tray holds the five favourites; the jar has the rest. */
  let phone = $state(false);
  const trayItems = $derived.by(() => {
    const all = dockItems(openIds, focused, {
      badges: { mail: unread || undefined },
      trashFull: trashCount > 0,
    });
    return phone ? all.filter((e) => 'id' in e && e.id !== 'trash').slice(0, 5) : all;
  });

  // ── Clock, the background, and making the windows fit the screen we got ──
  let now = $state(new Date());
  const hello = $derived(greeting(now, NAME));
  const hhmm = () => new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
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
    // What happens while you work — the only things that raise a banner.
    const timers = [
      setTimeout(() => {
        mails = [{ ...backgroundMail, time: hhmm() }, ...mails];
        const icon = trayIcon('mail');
        if (icon) flashChanged(icon);
        notify(
          {
            id: 'mail-m0',
            app: 'Mail',
            icon: 'mail',
            color: 'cyan',
            title: backgroundMail.from,
            body: backgroundMail.subject,
            time: 'now',
          },
          () => {
            mailSelected = backgroundMail.id;
            launch('mail');
          },
        );
      }, 5000),
      setTimeout(() => {
        fileList = [...fileList, { ...backgroundDownload, modified: hhmm() }];
        notify(
          {
            id: 'download-d3',
            app: 'Files',
            icon: 'download',
            color: 'blue',
            title: `${backgroundDownload.name} is ready`,
            body: `Downloaded to Downloads · ${backgroundDownload.size}`,
            time: 'now',
            actions: [{ label: 'Show in Files', onclick: () => reveal(backgroundDownload.id) }],
          },
          () => reveal(backgroundDownload.id),
        );
      }, 15000),
      setTimeout(
        () => notify({ ...laterNotifications[0]!, time: 'now' }, () => launch('calendar')),
        26000,
      ),
    ];
    return () => {
      narrow.removeEventListener('change', fit);
      clearInterval(clock);
      timers.forEach(clearTimeout);
    };
  });

  /** Mail saved an attachment: it lands in Downloads (the button itself said so). */
  async function saveAttachment(name: string, size: string) {
    await new Promise((r) => setTimeout(r, 900));
    const ext = name.split('.').pop()?.toLowerCase();
    const image = ext === 'jpg' || ext === 'png';
    fileList = [
      ...fileList,
      {
        id: `a${Date.now()}`,
        name,
        kind: image ? 'JPEG image' : 'PDF document',
        size,
        modified: hhmm(),
        icon: image ? 'image' : 'file-text',
        color: image ? 'orange' : 'red',
        folder: 'downloads',
      },
    ];
  }

  // ── Little wins ──
  let wins = $state(seedTodos.map((t) => ({ ...t })));
  let winsCard = $state<HTMLElement>();
  const winsDone = $derived(wins.filter((t) => t.done).length);
  const allWon = $derived(winsDone === wins.length);
  function win(id: string, done: boolean, from: HTMLElement) {
    wins = wins.map((t) => (t.id === id ? { ...t, done } : t));
    if (!done) return;
    // One celebration per action: the last win gets the big one instead of the small one.
    if (wins.every((t) => t.done)) celebrate(winsCard ?? from, 18);
    else celebrate(from, 8);
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

  const frontApp = $derived(appOf(focused));
  const front = $derived(frontApp?.label ?? 'Desktop');
  const menus = $derived(
    appMenus(
      front,
      {
        close: () => close(focused),
        minimize: () => focused && (minimized[focused] = true),
        zoom: () => focused && (maximized[focused] = !maximized[focused]),
        settings: () => launch('settings'),
        about: () => ((pane = 'about'), launch('settings')),
        new: () =>
          focused === 'notes' ? addNote() : focused === 'files' ? newFolder() : launch('notes'),
        open: () => launch('files'),
        undo: () => undoable?.run(),
      },
      undoable?.label,
    ),
  );
  const wifi = $derived(toggles.find((t) => t.id === 'wifi')?.on ?? false);
  const darkNow = $derived(
    theme === 'dark' ||
      (theme === 'auto' &&
        typeof matchMedia === 'function' &&
        matchMedia('(prefers-color-scheme: dark)').matches),
  );

  const designNotes: DesignNote[] = [
    {
      principle: 'cues',
      title: 'Windows grow out of what opened them',
      body: 'Double-click a desktop icon, a tile in the jar or a palette row and the window grows out of exactly that spot. Minimise it and it shrinks back into its tray icon — you always see where it went.',
      target: `[role="listbox"][aria-label="${ICONS}"]`,
    },
    {
      principle: 'cues',
      title: 'Trashed files fly into the trash',
      body: 'Move a file to the trash and its icon arcs into the trash in the tray, which squishes as it lands. No message needed: you watched it go, and the trash can give it back (Put back).',
      target: '[data-app="trash"]',
    },
    {
      principle: 'locality',
      title: 'Quick settings open from their status item',
      body: 'The panel pops out right under the button that opened it, and the same button closes it. Brightness dims the whole screen, the theme tile repaints it — the effect is the answer.',
      target: '[data-status="quick"]',
    },
    {
      principle: 'locality',
      title: 'Undo sits where the thing was',
      body: 'Delete a message and its row stays put as "Moved to Trash · Undo"; delete a note and the page says so with Undo on it. No confirmation first, no toast far away — nothing is lost, and the way back is where you look.',
      target: '[data-note="mail-list"]',
    },
    {
      principle: 'locality',
      title: 'A new folder lands where you right-clicked',
      body: 'Right-click the wallpaper and choose New folder: it appears under the pointer with its name selected, so you just type (Enter keeps it, Escape the old one; F2 renames any icon). Change wallpaper and All apps open out of that same spot.',
      target: `[role="listbox"][aria-label="${ICONS}"]`,
    },
    {
      principle: 'friendly',
      title: 'The day pill greets you',
      body: 'The shelf says good morning (or good night) next to the time, and has a small wink if you point at it. Click it and today’s calendar grows out of the pill.',
      target: '.menubar .day',
    },
    {
      principle: 'function',
      title: 'The tray never moves what you aim at',
      body: 'Icons do not magnify under the pointer, so the target stays where your hand is going. The one you point at lifts and says its name; running apps carry a tint bar.',
      target: 'nav[aria-label="Tray"]',
    },
    {
      principle: 'locality',
      title: 'Banners only for what nobody clicked',
      body: 'Mail arriving, a download finishing, a meeting coming up: these happen in the background, so they get a banner (and Mail’s count glows). What you do yourself never answers from a corner.',
      target: '[data-app="mail"]',
    },
  ];
</script>

<Application {tint} {theme} {radius} {density} gradient={false}>
  <ContextMenu onopen={desktopMenu} label="Desktop item actions">
    <Desktop
      wallpaper={wallpaperValue}
      icons={deskIcons}
      iconsLabel={ICONS}
      bind:selected={selectedIcon}
      bind:focused
      bind:manager={wm}
      bind:renaming={deskRenaming}
      onrename={renameFile}
      renameLabel="Folder name"
      onopen={(icon) => {
        const f = fileList.find((x) => x.id === icon.id);
        if (f) openFile(f);
      }}
      contextmenu={(at) => [
        { label: 'New folder', icon: 'folder', onselect: () => newDesktopFolder(at) },
        {
          label: 'Change wallpaper…',
          icon: 'image',
          onselect: () => ((pane = 'wallpaper'), launch('settings', pointRect())),
        },
        { separator: true },
        { label: 'All apps', icon: 'grid', onselect: () => launch('jar', pointRect()) },
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
            { label: 'All apps', icon: 'grid', onselect: () => launch('jar') },
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
          onday={(e) => launch('calendar', e.currentTarget as Element)}
          status={[
            { id: 'search', icon: 'search', label: 'Search', onclick: () => (palette = true) },
            { id: 'wifi', icon: 'wifi', label: wifi ? 'Wi-Fi: Home network' : 'Wi-Fi: off' },
            { id: 'battery', icon: 'battery', label: 'Battery', text: '82%' },
            {
              id: 'quick',
              icon: 'layout',
              label: 'Quick settings',
              active: quick,
              onclick: (e) => {
                quickAnchor = e.currentTarget as Element;
                quick = !quick;
              },
            },
          ]}
        />
      {/snippet}

      {#snippet widgets()}
        <div class="widget-grid">
          <Widget size="medium" class="hello">
            <span class="candies" aria-hidden="true"><i></i><i></i><i></i></span>
            <Text size="xs" weight="bold" tone="subtle" caps>
              {now.toLocaleDateString('en-GB', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
              })}
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
                        onchange={(e) => win(t.id, e.currentTarget.checked, e.currentTarget)}
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
          label="Tray"
          items={trayItems}
          size={traySize}
          onselect={(a) => launch(a.id)}
          onjar={() => {
            jarAnchor = undefined;
            jar = !jar;
          }}
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
          subtitle={plural(shownFiles.length, 'item')}
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
            <SourceList
              sections={placeSections}
              value={place}
              onselect={(i) => go(i.id)}
              label="Places"
            />
          {/snippet}
          {#snippet toolbar()}
            <Toolbar
              variant="plain"
              bind:search={fileSearch}
              searchPlaceholder="Search files"
              items={[
                {
                  icon: 'chevron-left',
                  label: 'Back',
                  disabled: !back.length,
                  onclick: () => step(-1),
                },
                {
                  icon: 'chevron-right',
                  label: 'Forward',
                  disabled: !ahead.length,
                  onclick: () => step(1),
                },
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
                {
                  icon: 'plus',
                  label: 'New folder',
                  primary: true,
                  disabled: place === 'trash',
                  onclick: newFolder,
                },
              ]}
            />
          {/snippet}
          <ContextMenu onopen={fileMenu} label="File actions">
            <div
              class="files"
              role="presentation"
              onclick={(e) => e.target === e.currentTarget && (selectedFile = undefined)}
            >
              {#if place === 'trash' && shownFiles.length}
                <div class="trash-bar">
                  <Text size="sm" tone="muted">
                    Right-click to put something back. Nothing leaves until you empty it.
                  </Text>
                  <ConfirmButton
                    label="Empty trash"
                    confirmLabel="Delete {shownFiles.length} for good"
                    size="sm"
                    shape="pill"
                    icon="trash"
                    onconfirm={() => (fileList = fileList.filter((f) => f.folder !== 'trash'))}
                  />
                </div>
              {/if}
              {#if !shownFiles.length}
                <Stack align="center" justify="center" padding="2xl" gap="sm">
                  <AppIcon
                    label={place === 'trash' ? 'Empty trash' : 'Empty folder'}
                    icon={place === 'trash' ? 'trash' : 'folder'}
                    color="glass"
                    size="lg"
                  />
                  <Text tone="muted">
                    {fileSearch
                      ? 'Nothing here — try fewer words.'
                      : place === 'trash'
                        ? 'The trash is empty. Spotless.'
                        : 'This folder is empty. Very zen.'}
                  </Text>
                </Stack>
              {:else if fileView === 'grid'}
                <Grid min="6.5rem" gap="md" padding="lg">
                  {#each shownFiles as f (f.id)}
                    <div class="file" data-file={f.id} class:selected={selectedFile === f.id}>
                      <button
                        type="button"
                        class="file-hit"
                        aria-label="{f.name}, {f.kind}"
                        aria-pressed={selectedFile === f.id}
                        onclick={() => (selectedFile = f.id)}
                        ondblclick={(e) => openFile(f, e.currentTarget.querySelector('.file-tile'))}
                        onkeydown={(e) => onFileKeydown(e, f)}
                      >
                        <span class="file-tile">
                          <AppIcon label={f.name} icon={f.icon} color={f.color} size="lg" />
                        </span>
                        {#if renaming !== f.id}<span class="file-name">{f.name}</span>{/if}
                      </button>
                      {#if renaming === f.id}
                        <input class="rename" aria-label="Name" use:renamer={f.id} />
                      {/if}
                    </div>
                  {/each}
                </Grid>
              {:else}
                <div
                  class="list"
                  role="presentation"
                  ondblclick={(e) => {
                    const row = (e.target as HTMLElement).closest<HTMLElement>('[data-id]');
                    const f = fileList.find((x) => x.id === row?.dataset['id']);
                    if (f) openFile(f, row);
                  }}
                >
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
                { label: plural(shownFiles.length, 'item') },
                ...(selectedFile
                  ? [{ label: '1 selected', tone: 'accent' as const, dot: true }]
                  : []),
              ]}
              trailing={[{ label: '212 GB free — room for ideas', icon: 'database' }]}
            />
          {/snippet}
        </Window>
      {/if}

      <!-- ── Mail ── -->
      {#if open['mail'] && geometry['mail']}
        <DesktopApp
          bind:mails
          bind:selected={mailSelected}
          bind:x={geometry['mail'].x}
          bind:y={geometry['mail'].y}
          bind:width={geometry['mail'].width}
          bind:height={geometry['mail'].height}
          bind:minimized={minimized['mail']}
          bind:maximized={maximized['mail']}
          onclose={() => close('mail')}
          onsave={saveAttachment}
          onreveal={(name, from) => {
            const f = fileList.filter((x) => x.name === name && x.folder === 'downloads').at(-1);
            if (f) void reveal(f.id, from);
          }}
        />
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
                { icon: 'plus', label: 'New note', primary: true, onclick: addNote },
                { icon: 'trash', label: 'Delete note', disabled: !note, onclick: deleteNote },
              ]}
            />
          {/snippet}
          {#if note}
            <div class="note-editor" bind:this={noteEditor}>
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
            </div>
          {:else if noteGone}
            <div class="gone" role="status">
              <span class="gone-icon"><Icon name="trash" size={18} /></span>
              <Text weight="semibold">“{noteGone.note.title || 'Untitled'}” is deleted.</Text>
              <Text size="sm" tone="muted">Changed your mind? It can come straight back.</Text>
              <Button icon="undo" label="Undo" shape="pill" onclick={restoreNote} />
            </div>
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

      <!-- ── Calendar: today, out of the day pill ── -->
      {#if open['calendar'] && geometry['calendar']}
        <Window
          id="calendar"
          app="Calendar"
          icon="calendar"
          color="red"
          title={now.toLocaleDateString('en-GB', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
          })}
          subtitle="{agenda.length} events"
          bind:x={geometry['calendar'].x}
          bind:y={geometry['calendar'].y}
          bind:width={geometry['calendar'].width}
          bind:height={geometry['calendar'].height}
          bind:minimized={minimized['calendar']}
          bind:maximized={maximized['calendar']}
          padding="lg"
          onclose={() => close('calendar')}
        >
          <ol class="agenda">
            {#each agenda as e (e.id)}
              <li>
                <span class="agenda-time">{e.time}</span>
                <span class="agenda-what">
                  <strong>{e.title}</strong>
                  <small>{e.place}</small>
                </span>
              </li>
            {/each}
          </ol>
          <Text size="sm" tone="muted" align="center"
            >That's all for today. Leave room for lunch.</Text
          >
        </Window>
      {/if}

      <!-- ── Preview: files open where they are, in place ── -->
      {#if open['preview'] && geometry['preview']}
        <Window
          id="preview"
          app="Preview"
          icon={previewing?.icon ?? 'eye'}
          color={previewing?.color ?? 'indigo'}
          title={previewing?.name ?? 'Preview'}
          subtitle={previewing ? `${previewing.kind} · ${previewing.size}` : undefined}
          bind:x={geometry['preview'].x}
          bind:y={geometry['preview'].y}
          bind:width={geometry['preview'].width}
          bind:height={geometry['preview'].height}
          bind:minimized={minimized['preview']}
          bind:maximized={maximized['preview']}
          padding="none"
          onclose={() => close('preview')}
        >
          {#snippet toolbar()}
            <Toolbar
              variant="plain"
              items={[
                { spacer: true },
                {
                  icon: 'folder',
                  label: 'Show in Files',
                  disabled: !previewing,
                  onclick: () => previewing && reveal(previewing.id),
                },
                {
                  icon: 'trash',
                  label: 'Move to trash',
                  disabled: !previewing || previewing.folder === 'trash',
                  onclick: () => previewing && trash(previewing.id, previewBody),
                },
              ]}
            />
          {/snippet}
          <div class="preview" bind:this={previewBody}>
            {#if !previewing}
              <EmptyState
                icon="eye"
                title="Nothing open"
                message="Double-click a file on the desktop or in Files."
              />
            {:else if previewing.folder === 'trash'}
              <div class="gone" role="status">
                <span class="gone-icon"><Icon name="trash" size={18} /></span>
                <Text weight="semibold">“{previewing.name}” is in the trash.</Text>
                <Button
                  icon="undo"
                  label="Put back"
                  shape="pill"
                  onclick={() => previewing && putBack(previewing.id)}
                />
              </div>
            {:else if previewKind(previewing) === 'image'}
              <span class="photo" style:--c={colorValue(previewing.color)} aria-hidden="true">
                <span class="sun"></span><span class="hill"></span><span class="hill two"></span>
              </span>
            {:else if previewKind(previewing) === 'page'}
              <article class="page" style:--c={colorValue(previewing.color)}>
                <Heading level={3} size="xl">{previewing.name.replace(/\.\w+$/, '')}</Heading>
                {#each [92, 100, 84, 96, 60, 0, 100, 88, 94, 40] as w, i (i)}
                  <span class="line" style:width="{w}%"></span>
                {/each}
              </article>
            {:else if previewKind(previewing) === 'board'}
              <div class="board">
                {#each LANES as lane (lane.title)}
                  <section class="lane">
                    <Text size="xs" weight="bold" tone="subtle" caps>{lane.title}</Text>
                    {#each lane.cards as i (i)}
                      <span class="card" style:--w="{60 + ((i * 17) % 35)}%"></span>
                    {/each}
                  </section>
                {/each}
              </div>
            {:else}
              <Stack align="center" justify="center" gap="sm" padding="2xl">
                <AppIcon
                  label={previewing.name}
                  icon={previewing.icon}
                  color={previewing.color}
                  size="xl"
                />
                <Text weight="semibold">{previewing.name}</Text>
                <Text size="sm" tone="muted">{previewing.kind} · {previewing.size}</Text>
              </Stack>
            {/if}
          </div>
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
                <InspectorRow
                  label="Show banners"
                  hint="Only for what happens in the background: new mail, finished downloads, reminders."
                >
                  <Switch bind:checked={banners} label="Apps may show banners" />
                </InspectorRow>
                <InspectorRow label="Try it">
                  <Button
                    icon="bell"
                    label="Send a test banner"
                    onclick={() =>
                      notify({
                        id: `test${Date.now()}`,
                        app: 'Settings',
                        icon: 'bell',
                        color: 'red',
                        title: 'Testing, testing…',
                        body: 'This is a banner. It leaves on its own in a few seconds — no hard feelings.',
                        time: 'now',
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
                <InspectorRow label="Tint">
                  <span class="tint-value" use:changeCue={tint}>{tint}</span>
                </InspectorRow>
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
                ><AppIcon
                  label={a.label}
                  icon={a.icon}
                  color={a.color ?? 'accent'}
                  size="xl"
                /></span
              >
              <Heading level={3} size="xl">{a.label} is still in the oven</Heading>
              <Text tone="muted" align="center">
                It is only an icon in this example — try Files, Mail, Notes, Music or Settings.
              </Text>
              <Button label="Close" shape="pill" onclick={() => close(id)} />
            </Stack>
          </Window>
        {/if}
      {/each}

      <QuickSettings
        floating
        anchor={quickAnchor}
        bind:open={quick}
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
            onclick={(e) => {
              quick = false;
              launch('settings', e.currentTarget);
            }}
          />
        </div>
      </QuickSettings>

      <AppJar bind:open={jar} anchor={jarAnchor} apps={jarApps} onselect={(a) => launch(a.id)} />

      <!-- Banners step aside while quick settings occupy their corner. -->
      <NotificationCenter
        notifications={quick ? [] : notifications}
        duration={7000}
        onopen={(n) => {
          notifications = notifications.filter((x) => x.id !== n.id);
          onBanner[n.id]?.();
        }}
        onclose={(id) => (notifications = notifications.filter((n) => n.id !== id))}
      />
    </Desktop>
  </ContextMenu>

  <CommandPalette
    bind:open={palette}
    groups={commandGroups({ open: launch, theme: (t) => (theme = t), tint: (v) => (tint = v) })}
  />

  <!-- Brightness dims the whole screen, like the real thing. -->
  <div class="dim" style:opacity={(100 - brightness) / 140} aria-hidden="true"></div>

  <div class="notes-spot">
    <DesignNotes title="Desktop OS" notes={designNotes} corner="bottom-left" />
  </div>
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
  /* A little pile of sweets, not a row: three dots in a line would read as window controls. */
  .candies {
    position: absolute;
    top: var(--space-4);
    right: var(--space-4);
    width: 44px;
    height: 30px;
  }
  .candies i {
    position: absolute;
    width: var(--d);
    height: var(--d);
    border-radius: 50%;
    background: radial-gradient(circle at 35% 30%, var(--pill-edge), transparent 45%), var(--c);
    box-shadow: 0 2px 6px color-mix(in srgb, var(--c) 45%, transparent);
    animation: bb-float 4.2s var(--ease-in-out) infinite;
  }
  .candies i:nth-child(1) {
    --c: var(--tint-2);
    --d: 13px;
    left: 0;
    bottom: 0;
  }
  .candies i:nth-child(2) {
    --c: var(--tint);
    --d: 17px;
    left: 11px;
    top: 0;
    animation-delay: -1.4s;
  }
  .candies i:nth-child(3) {
    --c: var(--tint-3);
    --d: 11px;
    right: 0;
    bottom: 3px;
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
      radial-gradient(80% 80% at 20% 15%, var(--pill-rim), transparent 60%),
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
    overflow: clip;
  }
  .cover-glow {
    position: absolute;
    inset: 22%;
    border-radius: 50%;
    background: radial-gradient(circle, var(--pill-bloom), transparent 70%);
    filter: blur(8px);
  }
  .float {
    animation: bb-float 3.6s var(--ease-in-out) infinite;
  }

  .file-name {
    max-width: 100%;
    padding: 1px 7px;
    border-radius: var(--radius-pill);
    font-size: var(--fs-xs);
    font-weight: var(--fw-semibold);
    line-height: 1.3;
    overflow-wrap: anywhere;
  }
  .rename {
    width: 100%;
    min-width: 0;
    padding: 1px 6px;
    border: 0;
    border-radius: var(--radius-sm);
    background: var(--input-bg);
    box-shadow:
      0 0 0 1px var(--accent-border),
      var(--focus-ring);
    color: var(--text);
    font: inherit;
    font-size: var(--fs-xs);
    font-weight: var(--fw-semibold);
    text-align: center;
    outline: none;
  }

  /* ── Files ── */
  .files {
    min-height: 100%;
  }
  .file {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }
  .file-hit {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    width: 100%;
    padding: var(--space-1);
    border: 0;
    border-radius: var(--radius-lg);
    background: none;
    color: var(--text);
    font: inherit;
    cursor: default;
  }
  .file-tile {
    display: block;
    padding: 4px;
    border: 1px solid transparent;
    border-radius: var(--radius-lg);
    transition: transform var(--motion-base) var(--ease-spring);
  }
  .file-hit:hover .file-tile {
    transform: translateY(-2px);
  }
  .file-hit:active .file-tile {
    transform: var(--press-squish);
  }
  .selected .file-tile {
    border-color: var(--layer-selected-border);
    background: var(--layer-selected-bg);
  }
  .selected .file-name {
    background: var(--accent);
    color: var(--on-accent);
  }
  .file-hit:focus-visible {
    outline: none;
  }
  .file-hit:focus-visible .file-tile {
    outline: var(--focus-ring);
    outline-offset: 1px;
  }
  .list {
    padding: var(--space-3);
  }
  .trash-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-3);
    margin: var(--space-3) var(--space-4) 0;
    padding: var(--space-2) var(--space-2) var(--space-2) var(--space-4);
    border-radius: var(--radius-pill);
    background: var(--fill-subtle);
  }

  /* ── A deleted thing's place: what happened, and the way back ── */
  .gone {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);
    min-height: 100%;
    padding: var(--space-8) var(--space-4);
    border: 1px dashed var(--input-border);
    border-radius: var(--radius-lg);
    text-align: center;
    animation: bb-rise var(--motion-base) var(--ease-out);
  }
  .gone-icon {
    display: grid;
    place-items: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: var(--fill-muted);
    color: var(--text-2);
  }
  .note-editor {
    border-radius: var(--radius-lg);
  }

  /* ── Calendar ── */
  .agenda {
    display: grid;
    gap: var(--space-2);
    margin: 0 0 var(--space-4);
    padding: 0;
    list-style: none;
  }
  .agenda li {
    display: flex;
    gap: var(--space-3);
    padding: var(--space-3);
    border-radius: var(--radius-lg);
    background: var(--fill-subtle);
    box-shadow: inset 3px 0 0 var(--color-red);
  }
  .agenda-time {
    min-width: 3.2rem;
    color: var(--text-2);
    font-weight: var(--fw-semibold);
    font-variant-numeric: tabular-nums;
  }
  .agenda-what {
    display: grid;
  }
  .agenda-what small {
    color: var(--text-3);
    font-size: var(--fs-sm);
  }

  /* ── Preview ── */
  .preview {
    display: grid;
    place-items: center;
    min-height: 100%;
    padding: var(--space-5);
  }
  .photo {
    position: relative;
    width: 100%;
    max-width: 30rem;
    aspect-ratio: 4 / 3;
    overflow: clip;
    border-radius: var(--radius-lg);
    background: linear-gradient(
      180deg,
      color-mix(in oklab, var(--c) 35%, var(--bg-base)),
      color-mix(in oklab, var(--c) 70%, var(--bg-base))
    );
    box-shadow: var(--glass-shadow);
  }
  .sun {
    position: absolute;
    top: 16%;
    right: 18%;
    width: 18%;
    aspect-ratio: 1;
    border-radius: 50%;
    background: color-mix(in oklab, var(--color-yellow) 85%, var(--bg-base));
    box-shadow: 0 0 40px color-mix(in srgb, var(--color-yellow) 60%, transparent);
  }
  .hill {
    position: absolute;
    left: -10%;
    bottom: -35%;
    width: 80%;
    aspect-ratio: 1;
    border-radius: 50%;
    background: color-mix(in oklab, var(--c) 80%, var(--tint-900));
  }
  .hill.two {
    left: 35%;
    bottom: -45%;
    width: 90%;
    background: color-mix(in oklab, var(--c) 60%, var(--tint-900));
  }
  .page {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: min(100%, 24rem);
    aspect-ratio: 1 / 1.3;
    padding: var(--space-6);
    border-radius: var(--radius-sm);
    background: var(--editor-bg);
    box-shadow:
      var(--glass-shadow),
      inset 0 4px 0 var(--c);
  }
  .page :global(h3) {
    margin-bottom: var(--space-2);
  }
  .line {
    height: 7px;
    border-radius: var(--radius-pill);
    background: var(--fill-muted);
  }
  .board {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: var(--space-3);
    width: 100%;
    align-self: start;
  }
  .lane {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    padding: var(--space-3);
    border-radius: var(--radius-lg);
    background: var(--fill-subtle);
  }
  .card {
    height: 2.75rem;
    border-radius: var(--radius-md);
    background:
      linear-gradient(var(--fill-muted), var(--fill-muted)) var(--space-3) 0.9rem / var(--w) 6px
        no-repeat,
      var(--glass-strong);
    box-shadow: var(--glass-shadow);
  }

  /* ── Settings ── */
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
      inset 0 0 0 1px var(--border-strong),
      inset 0 1px 0 var(--pill-rim);
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
    overflow: clip;
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
  .tint-value {
    padding: 0 var(--space-1);
    border-radius: var(--radius-xs);
    font-family: var(--font-mono);
    font-size: var(--fs-sm);
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
    background: var(--tint-900);
    pointer-events: none;
  }
  /* The notes pill sits in the corner the desktop leaves free; on a phone, above the tray. */
  .notes-spot {
    display: contents;
  }
  /* A phone: the widgets fill the home screen two by two. */
  @media (max-width: 720px) {
    .widget-grid {
      --widget-unit: calc((100cqi - var(--space-4)) / 2);
      container-type: inline-size;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      width: 100%;
    }
    .notes-spot :global(.notes) {
      bottom: calc(var(--space-12) * 2);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .candies i,
    .float,
    .todo li,
    .all-done,
    .gone {
      animation: none;
    }
    .file-tile {
      transition: none;
    }
  }
</style>
