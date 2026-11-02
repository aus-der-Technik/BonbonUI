// Mock data for the collaboration components and pages: a fictional product team, its board,
// a shared document with comment threads, a calendar and notifications. Fixed dates keep
// stories and screenshots stable.
import type { Participant } from '../patterns/molecules/AvatarStack.svelte';
import type { CalendarEvent } from '../patterns/molecules/Calendar.svelte';
import type { TaskItem } from '../patterns/molecules/TaskList.svelte';
import type { ThreadComment } from '../patterns/organisms/CommentThread.svelte';
import type { KanbanCard, KanbanColumn } from '../patterns/organisms/KanbanBoard.svelte';
import type { NotificationItem } from '../patterns/organisms/NotificationList.svelte';
import type { ActivityEntry } from '../patterns/organisms/ActivityLog.svelte';
import type { NavGroup } from '../patterns/organisms/SideNav.svelte';

/** "Now" for every collaboration demo: Tuesday, 3 November 2026, 10:30 local time. */
export const NOW = new Date(2026, 10, 3, 10, 30);

const at = (day: number, hour = 9, minute = 0, month = 10) =>
  new Date(2026, month, day, hour, minute);
const ago = (minutes: number) => new Date(NOW.getTime() - minutes * 60_000);

export const team: Participant[] = [
  { id: 'mara', name: 'Mara Lindqvist', presence: 'online' },
  { id: 'jonas', name: 'Jonas Weber', presence: 'online' },
  { id: 'priya', name: 'Priya Raman', presence: 'away' },
  { id: 'leo', name: 'Leo Okafor', presence: 'busy' },
  { id: 'sofia', name: 'Sofia Marin', presence: 'online' },
  { id: 'tom', name: 'Tom Becker', presence: 'offline' },
  { id: 'yuki', name: 'Yuki Tanaka', presence: 'away' },
  { id: 'nina', name: 'Nina Hall', presence: 'offline' },
];

const person = (id: string): Participant => team.find((p) => p.id === id) ?? team[0]!;

export const me: Participant = { id: 'me', name: 'alex.morgan@example.com', presence: 'online' };

export const boardColumns: KanbanColumn[] = [
  { id: 'backlog', title: 'Backlog', color: 'gray' },
  { id: 'todo', title: 'To do', color: 'blue' },
  { id: 'doing', title: 'In progress', color: 'orange', limit: 3 },
  { id: 'review', title: 'Review', color: 'purple', limit: 2 },
  { id: 'done', title: 'Done', color: 'green' },
];

export function boardCards(): KanbanCard[] {
  return [
    {
      id: 'c1',
      column: 'backlog',
      title: 'Collect feedback from the beta group',
      description: 'Short survey plus three interviews; summarise the top five themes.',
      tags: [{ label: 'Research', color: 'teal' }],
      assignees: [person('priya')],
      comments: 2,
    },
    {
      id: 'c2',
      column: 'backlog',
      title: 'Dark mode for the e-mail templates',
      tags: [{ label: 'Design', color: 'pink' }],
      priority: 'low',
    },
    {
      id: 'c3',
      column: 'backlog',
      title: 'Evaluate a second payment provider',
      tags: [{ label: 'Backend', color: 'indigo' }],
      assignees: [person('leo')],
    },
    {
      id: 'c4',
      column: 'todo',
      title: 'Onboarding checklist for new workspaces',
      description: 'Five steps, each one ticks itself off when done.',
      tags: [
        { label: 'Product', color: 'blue' },
        { label: 'Design', color: 'pink' },
      ],
      priority: 'high',
      assignees: [person('mara'), person('sofia')],
      due: at(6),
      tasks: { done: 1, total: 5 },
      color: 'blue',
    },
    {
      id: 'c5',
      column: 'todo',
      title: 'Rate limits for the public API',
      tags: [{ label: 'Backend', color: 'indigo' }],
      priority: 'medium',
      assignees: [person('jonas')],
      due: at(12),
    },
    {
      id: 'c6',
      column: 'doing',
      title: 'Shared boards: invite by link',
      description: 'Links expire after seven days; owners can revoke them at any time.',
      tags: [{ label: 'Product', color: 'blue' }],
      priority: 'urgent',
      assignees: [person('jonas'), person('mara'), person('yuki')],
      due: at(2),
      comments: 7,
      tasks: { done: 3, total: 4 },
      color: 'orange',
    },
    {
      id: 'c7',
      column: 'doing',
      title: 'Calendar sync for due dates',
      tags: [{ label: 'Integrations', color: 'mint' }],
      priority: 'medium',
      assignees: [person('leo')],
      due: at(3),
      comments: 1,
    },
    {
      id: 'c8',
      column: 'review',
      title: 'New pricing page copy',
      tags: [
        { label: 'Marketing', color: 'yellow' },
        { label: 'Copy', color: 'brown' },
      ],
      assignees: [person('sofia')],
      comments: 4,
      tasks: { done: 2, total: 2 },
    },
    {
      id: 'c9',
      column: 'done',
      title: 'Migrate file storage to the new bucket',
      tags: [{ label: 'Backend', color: 'indigo' }],
      assignees: [person('tom')],
      tasks: { done: 6, total: 6 },
    },
    {
      id: 'c10',
      column: 'done',
      title: 'Keyboard shortcuts cheat sheet',
      tags: [{ label: 'Docs', color: 'cyan' }],
      assignees: [person('nina'), person('priya')],
    },
  ];
}

export function checklist(): TaskItem[] {
  return [
    { id: 't1', label: 'Write the announcement post', done: true, assignee: 'Sofia Marin' },
    { id: 't2', label: 'Record a 60-second demo video', done: true, assignee: 'Mara Lindqvist' },
    { id: 't3', label: 'Update the help centre articles', done: false, due: 'Thu' },
    { id: 't4', label: 'Brief the support team', done: false, assignee: 'Jonas Weber', due: 'Fri' },
    { id: 't5', label: 'Switch the feature flag on for everyone', done: false, due: '12 Nov' },
  ];
}

export const threadComments: ThreadComment[] = [
  {
    id: 'm1',
    author: 'Mara Lindqvist',
    role: 'Owner',
    time: ago(180),
    text: 'Should we promise a date here? Last quarter we slipped twice, so I would rather say “early next year”.',
    reactions: [
      { emoji: '👍', count: 3, people: ['Jonas Weber', 'Priya Raman', 'Leo Okafor'] },
      { emoji: '🤔', count: 1, mine: true },
    ],
  },
  {
    id: 'm2',
    author: 'Jonas Weber',
    time: ago(95),
    text: 'Agreed. The invite flow is the only open risk, and that lands next week.',
  },
  {
    id: 'm3',
    author: 'Priya Raman',
    time: ago(12),
    text: 'Fine by me — I will reword the paragraph after lunch.',
    reactions: [{ emoji: '🎉', count: 2, people: ['Mara Lindqvist', 'Jonas Weber'] }],
    edited: true,
  },
];

export const secondThread: ThreadComment[] = [
  {
    id: 'n1',
    author: 'Leo Okafor',
    time: ago(60 * 26),
    text: 'Can we link the API changelog from here?',
  },
  {
    id: 'n2',
    author: 'Sofia Marin',
    time: ago(60 * 20),
    text: 'Done, it is the second link in the list.',
  },
];

export interface DocBlock {
  id: string;
  kind: 'heading' | 'paragraph' | 'quote';
  text: string;
  /** Id of the comment thread anchored to this block. */
  thread?: string;
}

export const docBlocks: DocBlock[] = [
  { id: 'b1', kind: 'heading', text: 'Shared boards — launch plan' },
  {
    id: 'b2',
    kind: 'paragraph',
    text: 'Shared boards let a whole team plan in one place. Anyone with an invite link can join, move cards and comment; owners decide who may edit.',
  },
  {
    id: 'b3',
    kind: 'paragraph',
    text: 'We will open shared boards to every workspace early next year, after a four-week beta with twenty teams.',
    thread: 'launch',
  },
  { id: 'b4', kind: 'heading', text: 'What we measure' },
  {
    id: 'b5',
    kind: 'paragraph',
    text: 'Weekly active boards, invites accepted within a day, and the share of cards that reach “Done”. The beta is a success when half of the invited people come back in the second week.',
  },
  {
    id: 'b6',
    kind: 'quote',
    text: 'The best plan is the one the whole team can see.',
  },
  {
    id: 'b7',
    kind: 'paragraph',
    text: 'Questions go into the comments next to the paragraph they are about. Resolve a thread once it is answered, so the open ones stay easy to find.',
    thread: 'links',
  },
];

export function notifications(): NotificationItem[] {
  return [
    {
      id: 'x1',
      title: 'Jonas Weber mentioned you',
      body: '“@alex can you check the invite copy before Thursday?”',
      time: ago(4),
      actor: 'Jonas Weber',
      unread: true,
    },
    {
      id: 'x2',
      title: 'Card moved to Review',
      body: 'New pricing page copy',
      time: ago(38),
      icon: 'kanban',
      color: 'purple',
      unread: true,
    },
    {
      id: 'x3',
      title: 'Due tomorrow',
      body: 'Calendar sync for due dates',
      time: ago(120),
      icon: 'clock',
      color: 'orange',
      unread: true,
    },
    {
      id: 'x4',
      title: 'Priya Raman resolved a thread',
      body: 'Shared boards — launch plan',
      time: ago(60 * 22),
      icon: 'check-circle',
      color: 'green',
    },
    {
      id: 'x5',
      title: 'Weekly summary is ready',
      body: '14 cards done, 3 overdue',
      time: ago(60 * 24 * 3),
      icon: 'chart',
      color: 'blue',
    },
  ];
}

export const calendarEvents: CalendarEvent[] = [
  { id: 'e1', title: 'Sprint planning', start: at(2, 9, 30), color: 'blue' },
  { id: 'e2', title: 'Design review', start: at(3, 14), color: 'pink' },
  { id: 'e3', title: 'Beta kickoff', start: at(4, 11), color: 'orange' },
  { id: 'e4', title: '1:1 Mara', start: at(4, 15, 30), color: 'teal' },
  { id: 'e5', title: 'Team offsite', start: at(9), end: at(11), allDay: true, color: 'purple' },
  { id: 'e6', title: 'Release 4.2', start: at(12, 10), color: 'green' },
  { id: 'e7', title: 'Retro', start: at(13, 16), color: 'indigo' },
  { id: 'e8', title: 'Sprint planning', start: at(16, 9, 30), color: 'blue' },
  { id: 'e9', title: 'Customer call', start: at(17, 13), color: 'yellow' },
  { id: 'e10', title: 'Hack day', start: at(20), allDay: true, color: 'red' },
  { id: 'e11', title: 'Design review', start: at(17, 14), color: 'pink' },
  { id: 'e12', title: 'Board meeting', start: at(17, 17), color: 'gray' },
  { id: 'e13', title: 'Release 4.3', start: at(26, 10), color: 'green' },
  { id: 'e14', title: 'Retro', start: at(27, 16), color: 'indigo' },
];

export const boardActivity: ActivityEntry[] = [
  {
    id: 'a1',
    actor: 'Jonas Weber',
    action: 'moved',
    target: 'Shared boards: invite by link',
    detail: 'To do → In progress',
    at: ago(25),
    tone: 'ok',
  },
  {
    id: 'a2',
    actor: 'Sofia Marin',
    action: 'asked for a review of',
    target: 'New pricing page copy',
    at: ago(70),
  },
  {
    id: 'a3',
    actor: 'Tom Becker',
    action: 'completed',
    target: 'Migrate file storage to the new bucket',
    at: ago(60 * 5),
    tone: 'ok',
  },
  {
    id: 'a4',
    actor: 'Leo Okafor',
    action: 'changed the due date of',
    target: 'Calendar sync for due dates',
    at: ago(60 * 26),
    tone: 'warn',
  },
];

export const collabNav: NavGroup[] = [
  {
    items: [
      { label: 'Home', href: '#', icon: 'home' },
      { label: 'Inbox', href: '#', icon: 'inbox', count: 3 },
      { label: 'My tasks', href: '#', icon: 'check-square', count: 7 },
    ],
  },
  {
    label: 'Projects',
    items: [
      { label: 'Shared boards', href: '#', icon: 'kanban', active: true },
      { label: 'Mobile app', href: '#', icon: 'tablet' },
      { label: 'Website', href: '#', icon: 'globe' },
    ],
  },
  {
    label: 'Team',
    items: [
      { label: 'Docs', href: '#', icon: 'file-text' },
      { label: 'Calendar', href: '#', icon: 'calendar' },
      { label: 'Members', href: '#', icon: 'users' },
    ],
  },
];

export const docsNav: NavGroup[] = [
  {
    label: 'Docs',
    items: [
      { label: 'Launch plan', href: '#', icon: 'file-text', active: true },
      { label: 'Meeting notes', href: '#', icon: 'file-text', count: 12 },
      { label: 'Roadmap', href: '#', icon: 'flag' },
      { label: 'Team handbook', href: '#', icon: 'bookmark' },
    ],
  },
  {
    label: 'Shared with me',
    items: [
      { label: 'Research notes', href: '#', icon: 'folder' },
      { label: 'Brand guide', href: '#', icon: 'palette' },
    ],
  },
];
