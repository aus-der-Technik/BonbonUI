// Mock data for the document editor example: a short volunteer handbook, its comment threads
// and the people writing it. Block HTML is what the browser serialises back (normalised), so
// the editor can compare it with the live DOM without needless resets.
import type { Participant } from '../patterns/molecules/AvatarStack.svelte';
import type { ThreadComment } from '../patterns/organisms/CommentThread.svelte';
import { NOW } from './mock-collab';

export type BlockKind = 'p' | 'h1' | 'h2' | 'quote' | 'ul' | 'ol';

export interface DocBlock {
  id: string;
  kind: BlockKind;
  /** Inline HTML: b, i, u, strike, a and mark[data-c] (a comment anchor). */
  html: string;
}

export interface DocThread {
  id: string;
  /** The block the passage lives in (the fallback anchor if the mark is edited away). */
  block: string;
  quote: string;
  comments: ThreadComment[];
  resolved: boolean;
  /** A new thread whose first comment is still being written. */
  draft?: boolean;
}

export { NOW };

const ago = (minutes: number) => new Date(NOW.getTime() - minutes * 60_000);

export const docAuthor = 'Alex Morgan';

export const docPeople: Participant[] = [
  { id: 'alex', name: 'Alex Morgan', presence: 'online' },
  { id: 'mara', name: 'Mara Lindqvist', presence: 'online' },
  { id: 'jonas', name: 'Jonas Weber', presence: 'away' },
  { id: 'priya', name: 'Priya Raman', presence: 'offline' },
];

export const docTitle = 'Spring handbook';

export function docBlocks(): DocBlock[] {
  return [
    { id: 'b1', kind: 'h1', html: 'Spring handbook for garden volunteers' },
    {
      id: 'b2',
      kind: 'p',
      html: 'Welcome to the plot! This handbook gathers <mark data-c="t1">everything you need for your first spring</mark>: what to bring, how the beds are shared, and who to ask when the tomatoes misbehave. Read it once, keep it close, and add what you learn along the way.',
    },
    { id: 'b3', kind: 'h2', html: 'Before your first visit' },
    {
      id: 'b4',
      kind: 'p',
      html: 'Mornings are the calmest time. The gate opens at seven, the shed key hangs in the blue box, and <b>the kettle is always yours to use</b>. Sign in on the board by the shed, so nobody waters the same bed twice.',
    },
    { id: 'b5', kind: 'ul', html: 'Gloves that fit, and a spare pair to lend' },
    { id: 'b6', kind: 'ul', html: 'A water bottle, a hat and <i>patience for slugs</i>' },
    { id: 'b7', kind: 'ul', html: 'Your plot number — it is on the welcome card' },
    { id: 'b8', kind: 'h2', html: 'How the beds are shared' },
    {
      id: 'b9',
      kind: 'ol',
      html: 'Each household tends one bed and helps with one shared task a month.',
    },
    {
      id: 'b10',
      kind: 'ol',
      html: 'Harvest from shared beds goes on the <mark data-c="t2">swap table by the gate</mark> first.',
    },
    { id: 'b11', kind: 'ol', html: 'Anything left after Sunday is free for neighbours to take.' },
    {
      id: 'b12',
      kind: 'quote',
      html: 'A garden is a conversation, not a contract. Ask before you prune, and say thank you when you can.',
    },
    { id: 'b13', kind: 'h2', html: 'Watering rota' },
    {
      id: 'b14',
      kind: 'p',
      html: 'We water in pairs from April. The rota lives on the board and in the group inbox at <a href="mailto:garden@example.com">garden@example.com</a>. If you cannot make your slot, <mark data-c="t3" data-resolved="">swap with anyone on the list</mark> and let the coordinator know.',
    },
    {
      id: 'b15',
      kind: 'p',
      html: 'That is all for now. Welcome aboard — we are glad you are here.',
    },
  ];
}

export function docThreads(): DocThread[] {
  return [
    {
      id: 't1',
      block: 'b2',
      quote: 'everything you need for your first spring',
      resolved: false,
      comments: [
        {
          id: 't1-1',
          author: 'Mara Lindqvist',
          time: ago(42),
          text: 'Could we say “first season”? A few people join us in autumn.',
        },
        {
          id: 't1-2',
          author: 'Jonas Weber',
          time: ago(18),
          text: 'Good catch — “first season” covers both.',
        },
      ],
    },
    {
      id: 't2',
      block: 'b10',
      quote: 'swap table by the gate',
      resolved: false,
      comments: [
        {
          id: 't2-1',
          author: 'Priya Raman',
          time: ago(95),
          text: 'Worth adding that the table is cleared every Monday morning?',
        },
      ],
    },
    {
      id: 't3',
      block: 'b14',
      quote: 'swap with anyone on the list',
      resolved: true,
      comments: [
        {
          id: 't3-1',
          author: 'Jonas Weber',
          time: ago(60 * 26),
          text: 'Who coordinates the rota this year?',
        },
        {
          id: 't3-2',
          author: 'Mara Lindqvist',
          time: ago(60 * 25),
          text: 'Sofia does — her name is on the board now.',
        },
      ],
    },
  ];
}
