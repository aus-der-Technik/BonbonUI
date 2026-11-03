// Mock data for the desktop & OS stories and example pages (Storybook only).
import type { CommandGroup } from '../patterns/desktop/CommandPalette.svelte';
import type { ControlToggle } from '../patterns/desktop/QuickSettings.svelte';
import type { OsNotification } from '../patterns/desktop/NotificationCenter.svelte';
import type {
  AppEntry,
  DesktopIcon,
  DockEntry,
  MenuBarMenu,
} from '../patterns/desktop/shared.svelte';
import type { SourceSection } from '../patterns/desktop/SourceList.svelte';
import type { TreeNode } from '../patterns/desktop/TreeView.svelte';

/** Candy wallpapers built from tokens, so they follow the tint and the theme. */
export const wallpapers = [
  {
    id: 'candy',
    name: 'Candy',
    value:
      'radial-gradient(60% 70% at 12% 18%, color-mix(in oklab, var(--tint) 80%, white) 0%, transparent 62%), ' +
      'radial-gradient(55% 65% at 88% 22%, color-mix(in oklab, var(--color-pink) 70%, var(--bg-base)) 0%, transparent 60%), ' +
      'radial-gradient(70% 60% at 62% 100%, color-mix(in oklab, var(--color-indigo) 70%, var(--bg-base)) 0%, transparent 66%), ' +
      'linear-gradient(160deg, color-mix(in oklab, var(--tint) 45%, var(--bg-base)), color-mix(in oklab, var(--tint) 70%, var(--bg-base)))',
  },
  {
    id: 'sunset',
    name: 'Sunset',
    value:
      'radial-gradient(70% 60% at 20% 10%, color-mix(in oklab, var(--color-yellow) 75%, var(--bg-base)) 0%, transparent 60%), ' +
      'radial-gradient(60% 70% at 85% 40%, color-mix(in oklab, var(--color-pink) 75%, var(--bg-base)) 0%, transparent 62%), ' +
      'linear-gradient(170deg, color-mix(in oklab, var(--color-orange) 70%, var(--bg-base)), color-mix(in oklab, var(--color-purple) 75%, var(--bg-base)))',
  },
  {
    id: 'ocean',
    name: 'Ocean',
    value:
      'radial-gradient(60% 60% at 80% 15%, color-mix(in oklab, var(--color-mint) 70%, var(--bg-base)) 0%, transparent 60%), ' +
      'radial-gradient(70% 70% at 10% 90%, color-mix(in oklab, var(--color-indigo) 70%, var(--bg-base)) 0%, transparent 62%), ' +
      'linear-gradient(200deg, color-mix(in oklab, var(--color-cyan) 70%, var(--bg-base)), color-mix(in oklab, var(--color-blue) 80%, var(--bg-base)))',
  },
  {
    id: 'aurora',
    name: 'Aurora',
    value:
      'radial-gradient(50% 80% at 30% 0%, color-mix(in oklab, var(--color-green) 65%, var(--bg-base)) 0%, transparent 62%), ' +
      'radial-gradient(60% 70% at 75% 25%, color-mix(in oklab, var(--color-purple) 65%, var(--bg-base)) 0%, transparent 60%), ' +
      'linear-gradient(180deg, color-mix(in oklab, var(--color-teal) 35%, var(--bg-base)), color-mix(in oklab, var(--color-indigo) 55%, var(--bg-base)))',
  },
] as const;

export type AppId = 'files' | 'notes' | 'mail' | 'music' | 'calendar' | 'photos' | 'settings';

const EVERYDAY = 'Everyday';
const CREATE = 'Make & play';
const WORK = 'Work';
const SYSTEM = 'System';

export const apps: (AppEntry & { id: AppId | string })[] = [
  { id: 'files', label: 'Files', icon: 'folder', color: 'blue', category: EVERYDAY },
  { id: 'notes', label: 'Notes', icon: 'edit', color: 'yellow', category: EVERYDAY },
  { id: 'mail', label: 'Mail', icon: 'mail', color: 'cyan', badge: 4, category: EVERYDAY },
  { id: 'music', label: 'Music', icon: 'music', color: 'pink', category: CREATE },
  { id: 'calendar', label: 'Calendar', icon: 'calendar', color: 'red', category: EVERYDAY },
  { id: 'photos', label: 'Photos', icon: 'image', color: 'orange', category: CREATE },
  { id: 'chat', label: 'Messages', icon: 'chat', color: 'green', badge: 2, category: EVERYDAY },
  { id: 'maps', label: 'Maps', icon: 'map', color: 'teal', category: EVERYDAY },
  { id: 'terminal', label: 'Terminal', icon: 'terminal', color: 'gray', category: WORK },
  { id: 'code', label: 'Code', icon: 'code', color: 'indigo', category: WORK },
  { id: 'store', label: 'Store', icon: 'bag', color: 'purple', category: CREATE },
  { id: 'camera', label: 'Camera', icon: 'camera', color: 'brown', category: CREATE },
  { id: 'boards', label: 'Boards', icon: 'kanban', color: 'mint', category: WORK },
  { id: 'stats', label: 'Stats', icon: 'activity', color: 'red', category: WORK },
  { id: 'podcasts', label: 'Podcasts', icon: 'mic', color: 'purple', category: CREATE },
  { id: 'settings', label: 'Settings', icon: 'settings', color: 'gray', category: SYSTEM },
  { id: 'preview', label: 'Preview', icon: 'eye', color: 'indigo', category: SYSTEM },
];

const app = (id: string) => apps.find((a) => a.id === id) as AppEntry;

export const dockOrder: string[] = [
  'files',
  'notes',
  'mail',
  'music',
  'calendar',
  'photos',
  'settings',
];

/**
 * The tray: the favourites, then running apps that are not favourites (so a minimised window
 * always has a way home), a separator and the trash (the candy jar comes from `Dock.onjar`).
 * `badges` overrides the apps' badges (live unread counts); `trashFull` paints the trash.
 */
export function dock(
  running: string[],
  active?: string,
  options: { badges?: Record<string, number | undefined>; trashFull?: boolean } = {},
): DockEntry[] {
  const entry = (id: string) => ({
    ...app(id),
    ...(options.badges && id in options.badges ? { badge: options.badges[id] } : {}),
    running: running.includes(id),
    active: id === active,
  });
  const guests = running.filter((id) => !dockOrder.includes(id) && apps.some((a) => a.id === id));
  return [
    ...dockOrder.map(entry),
    ...(guests.length ? [{ separator: true } as const, ...guests.map(entry)] : []),
    { separator: true },
    {
      id: 'trash',
      label: 'Trash',
      icon: 'trash',
      color: options.trashFull ? 'gray' : 'glass',
    },
  ];
}

/** A short to-do list for the "little wins" widget. */
export const todos = [
  { id: 't1', label: 'Reply to Ana about Friday', done: true },
  { id: 't2', label: 'Water the office plant', done: false },
  { id: 't3', label: 'Ship the offsite agenda', done: false },
  { id: 't4', label: 'Take a real lunch break', done: false },
];

/** Today's calendar, for the Today widget. */
export const agenda = [
  { id: 'e1', title: 'Design review', time: '10:00', place: 'Lighthouse room' },
  { id: 'e2', title: 'Lunch, away from the desk', time: '12:30', place: 'By the lake' },
  { id: 'e3', title: 'Roadmap jam', time: '15:00', place: 'Bring snacks' },
];

export const desktopIcons: DesktopIcon[] = [
  { id: 'report', label: 'Quarterly report.pdf', icon: 'file-text', color: 'red', meta: '2.4 MB' },
  { id: 'holiday', label: 'Holiday photos', icon: 'folder', color: 'blue', meta: '86 items' },
  { id: 'plan', label: 'Launch plan', icon: 'kanban', color: 'mint' },
  { id: 'shot', label: 'Screenshot 09.41', icon: 'image', color: 'orange', meta: 'PNG' },
];

export interface FileEntry {
  id: string;
  name: string;
  kind: string;
  size: string;
  modified: string;
  icon: AppEntry['icon'];
  color: string;
  /** The place it lives in: `desktop`, `documents`, …, `trash`, or the id of a folder. */
  folder: string;
  /** In the trash: where it came from (Put back returns it there). */
  was?: string | undefined;
  /** On the desktop: dropped at this spot (px inside the desktop) instead of the icon grid. */
  at?: { x: number; y: number } | undefined;
  /** A folder that shows another place's content when opened. */
  opens?: string | undefined;
}

export const files: FileEntry[] = [
  {
    id: 'report',
    name: 'Report Q3.pdf',
    kind: 'PDF document',
    size: '2.4 MB',
    modified: 'Today 08:30',
    icon: 'file-text',
    color: 'red',
    folder: 'desktop',
  },
  {
    id: 'holiday',
    name: 'Holidays',
    kind: 'Folder',
    size: '3 items',
    modified: 'Sat',
    icon: 'folder',
    color: 'blue',
    folder: 'desktop',
    opens: 'pictures',
  },
  {
    id: 'plan',
    name: 'Launch plan',
    kind: 'Board',
    size: '1.2 MB',
    modified: 'Yesterday',
    icon: 'kanban',
    color: 'mint',
    folder: 'desktop',
  },
  {
    id: 'shot',
    name: 'Screenshot 09.41',
    kind: 'PNG image',
    size: '840 KB',
    modified: 'Today 09:41',
    icon: 'image',
    color: 'orange',
    folder: 'desktop',
  },
  {
    id: 'f1',
    name: 'Brand guide',
    kind: 'Folder',
    size: '14 items',
    modified: 'Today 09:12',
    icon: 'folder',
    color: 'blue',
    folder: 'documents',
  },
  {
    id: 'f2',
    name: 'Budget 2027.xlsx',
    kind: 'Spreadsheet',
    size: '312 KB',
    modified: 'Yesterday',
    icon: 'table',
    color: 'green',
    folder: 'documents',
  },
  {
    id: 'f3',
    name: 'Talk draft.pdf',
    kind: 'PDF document',
    size: '4.1 MB',
    modified: 'Mon 14:30',
    icon: 'file-text',
    color: 'red',
    folder: 'documents',
  },
  {
    id: 'f4',
    name: 'Team offsite',
    kind: 'Folder',
    size: '32 items',
    modified: '12 Oct',
    icon: 'folder',
    color: 'blue',
    folder: 'documents',
  },
  {
    id: 'f5',
    name: 'Logo.svg',
    kind: 'Vector image',
    size: '18 KB',
    modified: '10 Oct',
    icon: 'palette',
    color: 'purple',
    folder: 'documents',
  },
  {
    id: 'f6',
    name: 'Interview.m4a',
    kind: 'Audio',
    size: '22 MB',
    modified: '8 Oct',
    icon: 'mic',
    color: 'pink',
    folder: 'documents',
  },
  {
    id: 'f7',
    name: 'Notes.md',
    kind: 'Markdown',
    size: '6 KB',
    modified: '2 Oct',
    icon: 'file',
    color: 'gray',
    folder: 'documents',
  },
  {
    id: 'f8',
    name: 'Roadmap.board',
    kind: 'Board',
    size: '1 MB',
    modified: '28 Sep',
    icon: 'kanban',
    color: 'mint',
    folder: 'documents',
  },
  {
    id: 'd1',
    name: 'installer.zip',
    kind: 'Archive',
    size: '210 MB',
    modified: 'Today 08:02',
    icon: 'download',
    color: 'gray',
    folder: 'downloads',
  },
  {
    id: 'd2',
    name: 'invoice-0042.pdf',
    kind: 'PDF document',
    size: '88 KB',
    modified: 'Yesterday',
    icon: 'file-text',
    color: 'red',
    folder: 'downloads',
  },
  {
    id: 'p1',
    name: 'Beach.jpg',
    kind: 'JPEG image',
    size: '3.2 MB',
    modified: 'Sat',
    icon: 'image',
    color: 'orange',
    folder: 'pictures',
  },
  {
    id: 'p2',
    name: 'Mountains.jpg',
    kind: 'JPEG image',
    size: '2.8 MB',
    modified: 'Sat',
    icon: 'image',
    color: 'teal',
    folder: 'pictures',
  },
  {
    id: 'p3',
    name: 'Portrait.heic',
    kind: 'HEIC image',
    size: '1.9 MB',
    modified: 'Fri',
    icon: 'camera',
    color: 'brown',
    folder: 'pictures',
  },
];

export const places: SourceSection[] = [
  {
    title: 'Favourites',
    items: [
      { id: 'desktop', label: 'Desktop', icon: 'monitor' },
      { id: 'documents', label: 'Documents', icon: 'file-text', count: 8 },
      { id: 'downloads', label: 'Downloads', icon: 'download', count: 2 },
      { id: 'pictures', label: 'Pictures', icon: 'image', count: 3 },
      { id: 'trash', label: 'Trash', icon: 'trash' },
    ],
  },
  {
    title: 'Locations',
    collapsible: true,
    items: [
      { id: 'cloud', label: 'Cloud drive', icon: 'globe' },
      { id: 'disk', label: 'System disk', icon: 'database' },
    ],
  },
  {
    title: 'Tags',
    collapsible: true,
    items: [
      { id: 'tag-red', label: 'Urgent', icon: 'tag', color: 'red' },
      { id: 'tag-green', label: 'Personal', icon: 'tag', color: 'green' },
      { id: 'tag-blue', label: 'Work', icon: 'tag', color: 'blue' },
    ],
  },
];

export const fileTree: TreeNode[] = [
  {
    id: 'src',
    label: 'src',
    children: [
      {
        id: 'lib',
        label: 'lib',
        children: [
          { id: 'button', label: 'Button.svelte', icon: 'code', color: 'orange', meta: '4 KB' },
          { id: 'window', label: 'Window.svelte', icon: 'code', color: 'orange', meta: '9 KB' },
          { id: 'tokens', label: 'tokens.css', icon: 'palette', color: 'purple', meta: '12 KB' },
        ],
      },
      { id: 'app', label: 'App.svelte', icon: 'code', color: 'orange', meta: '2 KB' },
      { id: 'main', label: 'main.ts', icon: 'code', color: 'blue', meta: '1 KB' },
    ],
  },
  {
    id: 'docs',
    label: 'docs',
    children: [
      { id: 'intro', label: 'Introduction.md', icon: 'file-text', meta: '3 KB' },
      { id: 'guide', label: 'Guide.md', icon: 'file-text', meta: '8 KB' },
    ],
  },
  { id: 'pkg', label: 'package.json', icon: 'file', meta: '2 KB' },
  { id: 'readme', label: 'README.md', icon: 'file-text', meta: '5 KB' },
];

export interface Note {
  id: string;
  title: string;
  body: string;
  updated: string;
}

export const notes: Note[] = [
  {
    id: 'n1',
    title: 'Groceries',
    updated: '09:12',
    body: 'Oat milk\nBlueberries\nSourdough\nCoffee beans (the light roast)\nLimes',
  },
  {
    id: 'n2',
    title: 'Offsite ideas',
    updated: 'Yesterday',
    body: 'Morning: quick wins retro\nLunch by the lake\nAfternoon: roadmap jam in small groups\nEvening: board games',
  },
  {
    id: 'n3',
    title: 'Book list',
    updated: 'Mon',
    body: 'A novel about lighthouses\nThe one on typography\nSomething light for the train',
  },
];

export interface Track {
  title: string;
  artist: string;
  album: string;
  length: number;
  colors: [string, string];
}

export const tracks: Track[] = [
  {
    title: 'Sugar Rush',
    artist: 'The Gummy Bears',
    album: 'Candy Shop',
    length: 214,
    colors: ['var(--color-pink)', 'var(--color-purple)'],
  },
  {
    title: 'Liquid Glass',
    artist: 'Frost & Glow',
    album: 'Translucent',
    length: 187,
    colors: ['var(--color-cyan)', 'var(--color-indigo)'],
  },
  {
    title: 'Sunday Mint',
    artist: 'Mojito Club',
    album: 'Fresh',
    length: 242,
    colors: ['var(--color-mint)', 'var(--color-green)'],
  },
  {
    title: 'Orange Hour',
    artist: 'Citrus Park',
    album: 'Golden',
    length: 199,
    colors: ['var(--color-orange)', 'var(--color-red)'],
  },
];

export const controlToggles: ControlToggle[] = [
  { id: 'wifi', label: 'Wi-Fi', icon: 'wifi', on: true, detail: 'Home network' },
  { id: 'bluetooth', label: 'Bluetooth', icon: 'bluetooth', on: true, detail: 'Headphones' },
  { id: 'focus', label: 'Focus', icon: 'moon', on: false, detail: 'Do not disturb' },
  { id: 'share', label: 'Sharing', icon: 'share', on: false, detail: 'Contacts only' },
];

export const seedNotifications: OsNotification[] = [
  {
    id: 'welcome',
    app: 'Settings',
    icon: 'sparkles',
    color: 'accent',
    title: 'Make it yours',
    body: 'Pick a tint in Settings — the whole desktop changes outfit, live.',
    time: 'now',
  },
];

/**
 * What happens in the background of the Desktop OS while you work — the only things that may
 * raise a banner there: nobody clicked anything, so there is no place to answer at.
 */
export const backgroundMail: Mail = {
  id: 'm0',
  from: 'Ana Example',
  email: 'ana@example.com',
  subject: 'Lunch at the lake on Friday?',
  preview: 'The weather looks perfect. 12:30 at the jetty? I will bring the good bread…',
  body: 'Hi!\n\nThe weather looks perfect for Friday. 12:30 at the jetty? I will bring the good bread, you bring the lemonade.\n\nAna',
  date: 'Today',
  time: 'now',
  unread: true,
  flagged: false,
  mailbox: 'inbox',
  labels: ['family'],
  attachments: [],
};

/** A download that was already running when the desktop started; it finishes on its own. */
export const backgroundDownload: FileEntry = {
  id: 'd3',
  name: 'Design kit.zip',
  kind: 'Archive',
  size: '48 MB',
  modified: 'Now',
  icon: 'package',
  color: 'purple',
  folder: 'downloads',
};

export const laterNotifications: OsNotification[] = [
  {
    id: 'meeting',
    app: 'Calendar',
    icon: 'calendar',
    color: 'red',
    title: 'Design review in 10 minutes',
    body: 'Lighthouse room · bring your best ideas (and snacks)',
    time: '09:50',
  },
  {
    id: 'message',
    app: 'Messages',
    icon: 'chat',
    color: 'green',
    title: 'Ana Example',
    body: 'Lunch at the lake on Friday? 🌊',
    time: 'now',
  },
];

export function appMenus(
  name: string,
  actions: Record<string, () => void> = {},
  /** What Edit → Undo would undo ("Move to trash"); without it Undo is disabled. */
  undo?: string,
): MenuBarMenu[] {
  const run = (key: string) => actions[key];
  return [
    {
      label: name,
      items: [
        { label: `About ${name}`, onselect: run('about') },
        { separator: true },
        { label: 'Settings…', shortcut: '⌘,', onselect: run('settings') },
        { separator: true },
        { label: `Hide ${name}`, shortcut: '⌘H', onselect: run('minimize') },
        { label: `Quit ${name}`, shortcut: '⌘Q', onselect: run('close') },
      ],
    },
    {
      label: 'File',
      items: [
        { label: 'New window', icon: 'window', shortcut: '⌘N', onselect: run('new') },
        { label: 'Open…', icon: 'folder', shortcut: '⌘O', onselect: run('open') },
        { separator: true },
        { label: 'Close window', shortcut: '⌘W', onselect: run('close') },
      ],
    },
    {
      label: 'Edit',
      items: [
        {
          label: undo ? `Undo ${undo}` : 'Undo',
          icon: 'undo',
          shortcut: '⌘Z',
          disabled: !!actions['undo'] && !undo,
          onselect: run('undo'),
        },
        { label: 'Redo', shortcut: '⇧⌘Z', disabled: true },
        { separator: true },
        { label: 'Cut', shortcut: '⌘X' },
        { label: 'Copy', icon: 'copy', shortcut: '⌘C' },
        { label: 'Paste', shortcut: '⌘V' },
      ],
    },
    {
      label: 'View',
      items: [
        { label: 'Show sidebar', checked: true },
        { label: 'Show status bar', checked: true },
        { separator: true },
        { label: 'Enter full screen', icon: 'maximize', shortcut: '⌃⌘F', onselect: run('zoom') },
      ],
    },
    {
      label: 'Window',
      items: [
        { label: 'Minimize', shortcut: '⌘M', onselect: run('minimize') },
        { label: 'Zoom', onselect: run('zoom') },
      ],
    },
    { label: 'Help', items: [{ label: `${name} help`, icon: 'help' }] },
  ];
}

export function commandGroups(actions: {
  open: (id: string) => void;
  theme: (theme: 'auto' | 'light' | 'dark') => void;
  tint: (value: string) => void;
}): CommandGroup[] {
  return [
    {
      label: 'Apps',
      items: apps.slice(0, 8).map((a) => ({
        id: `open-${a.id}`,
        label: `Open ${a.label}`,
        icon: a.icon,
        onselect: () => actions.open(a.id),
      })),
    },
    {
      label: 'Appearance',
      items: [
        {
          id: 'light',
          label: 'Light mode',
          icon: 'sun',
          keywords: ['theme'],
          onselect: () => actions.theme('light'),
        },
        {
          id: 'dark',
          label: 'Dark mode',
          icon: 'moon',
          keywords: ['theme'],
          onselect: () => actions.theme('dark'),
        },
        {
          id: 'auto',
          label: 'Follow the system',
          icon: 'monitor',
          keywords: ['theme'],
          onselect: () => actions.theme('auto'),
        },
        {
          id: 'pink',
          label: 'Tint: Pink',
          icon: 'palette',
          keywords: ['colour', 'color'],
          onselect: () => actions.tint('#ff2d55'),
        },
        {
          id: 'blue',
          label: 'Tint: Blue',
          icon: 'palette',
          keywords: ['colour', 'color'],
          onselect: () => actions.tint('#007aff'),
        },
        {
          id: 'green',
          label: 'Tint: Green',
          icon: 'palette',
          keywords: ['colour', 'color'],
          onselect: () => actions.tint('#5a9854'),
        },
      ],
    },
    {
      label: 'System',
      items: [
        {
          id: 'settings',
          label: 'System settings',
          icon: 'settings',
          shortcut: ['⌘', ','],
          onselect: () => actions.open('settings'),
        },
        {
          id: 'launchpad',
          label: 'Show all apps',
          icon: 'grid',
          shortcut: ['F4'],
          onselect: () => actions.open('launchpad'),
        },
      ],
    },
  ];
}

// ── Mail app ──────────────────────────────────────────────────────────────────────────────

export const mailboxes: SourceSection[] = [
  {
    title: 'Mailboxes',
    items: [
      { id: 'inbox', label: 'Inbox', icon: 'inbox', count: 4 },
      { id: 'flagged', label: 'Flagged', icon: 'flag', color: 'orange', count: 2 },
      { id: 'drafts', label: 'Drafts', icon: 'file', count: 1 },
      { id: 'sent', label: 'Sent', icon: 'send' },
      { id: 'archive', label: 'Archive', icon: 'bookmark' },
      { id: 'trash', label: 'Trash', icon: 'trash' },
    ],
  },
  {
    title: 'Smart folders',
    collapsible: true,
    items: [
      { id: 'today', label: 'Today', icon: 'sun', color: 'yellow' },
      { id: 'attachments', label: 'With attachments', icon: 'link', color: 'purple' },
    ],
  },
  {
    title: 'Labels',
    collapsible: true,
    items: [
      { id: 'work', label: 'Work', icon: 'tag', color: 'blue' },
      { id: 'family', label: 'Family', icon: 'tag', color: 'pink' },
      { id: 'travel', label: 'Travel', icon: 'tag', color: 'teal' },
    ],
  },
];

export interface Mail {
  id: string;
  from: string;
  email: string;
  subject: string;
  preview: string;
  body: string;
  date: string;
  time: string;
  unread: boolean;
  flagged: boolean;
  mailbox: string;
  labels: string[];
  attachments: { name: string; size: string }[];
}

export const mails: Mail[] = [
  {
    id: 'm1',
    from: 'Ana Example',
    email: 'ana@example.com',
    subject: 'Offsite agenda — final version',
    preview: 'Here is the final agenda for next week. I moved the roadmap jam to the afternoon…',
    body: 'Hi team,\n\nhere is the final agenda for next week. I moved the roadmap jam to the afternoon so we have the morning for quick wins.\n\nPlease add your topics to the board by Wednesday. Lunch is at the lake if the weather plays along.\n\nSee you there,\nAna',
    date: 'Today',
    time: '09:41',
    unread: true,
    flagged: true,
    mailbox: 'inbox',
    labels: ['work'],
    attachments: [{ name: 'Agenda.pdf', size: '420 KB' }],
  },
  {
    id: 'm2',
    from: 'Ben Sample',
    email: 'ben@example.com',
    subject: 'Photos from the weekend',
    preview: 'I finally sorted the pictures. The one with the kite is my favourite…',
    body: 'Hey!\n\nI finally sorted the pictures. The one with the kite is my favourite. Shared album link is below.\n\nBen',
    date: 'Today',
    time: '08:15',
    unread: true,
    flagged: false,
    mailbox: 'inbox',
    labels: ['family'],
    attachments: [
      { name: 'Kite.jpg', size: '3.1 MB' },
      { name: 'Lake.jpg', size: '2.7 MB' },
    ],
  },
  {
    id: 'm3',
    from: 'Travel desk',
    email: 'travel@example.com',
    subject: 'Your booking is confirmed',
    preview: 'Thanks for booking. Your train leaves at 07:52 from platform 4…',
    body: 'Thanks for booking.\n\nYour train leaves at 07:52 from platform 4. Seat 42, carriage 7. Have a good trip!',
    date: 'Yesterday',
    time: '18:02',
    unread: true,
    flagged: false,
    mailbox: 'inbox',
    labels: ['travel'],
    attachments: [],
  },
  {
    id: 'm4',
    from: 'Chris Placeholder',
    email: 'chris@example.com',
    subject: 'Re: Budget review',
    preview: 'Looks good to me. One question on the hardware line — is that…',
    body: 'Looks good to me.\n\nOne question on the hardware line — is that the new laptops or the monitors as well?\n\nChris',
    date: 'Yesterday',
    time: '11:30',
    unread: false,
    flagged: true,
    mailbox: 'inbox',
    labels: ['work'],
    attachments: [],
  },
  {
    id: 'm5',
    from: 'Newsletter',
    email: 'news@example.com',
    subject: 'Ten tips for calmer mornings',
    preview: 'Start with a glass of water, then step outside for two minutes…',
    body: 'Start with a glass of water, then step outside for two minutes. The other eight tips are inside.',
    date: 'Mon',
    time: '07:00',
    unread: true,
    flagged: false,
    mailbox: 'inbox',
    labels: [],
    attachments: [],
  },
  {
    id: 'm6',
    from: 'Dana Demo',
    email: 'dana@example.com',
    subject: 'Draft: proposal for the new office',
    preview: 'Not ready yet — just saving where I am…',
    body: 'Not ready yet — just saving where I am.',
    date: 'Sun',
    time: '21:44',
    unread: false,
    flagged: false,
    mailbox: 'drafts',
    labels: ['work'],
    attachments: [],
  },
];
