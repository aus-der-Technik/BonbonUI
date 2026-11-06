/**
 * Mock data for the game hub example (Pages/Gaming). The universe — the Lanternfall Isles — its
 * games, characters and players are all invented.
 */
import type { IconName } from '../patterns/atoms/icons';
import type { PaletteColor } from '../patterns/atoms/palette';

/** Key art is an SVG drawn from palette tokens: a sky, a motif and a highlight colour. */
export interface GameArt {
  sky: PaletteColor;
  ground: PaletteColor;
  spot: PaletteColor;
  motif: 'peaks' | 'orbs' | 'waves' | 'grid' | 'orchard' | 'rings';
}

export interface Achievement {
  id: string;
  title: string;
  detail: string;
  icon: IconName;
  progress: number;
  goal: number;
  /** Coins it pays out when claimed. */
  reward: number;
  claimed: boolean;
}

export interface Game {
  id: string;
  title: string;
  genre: string;
  tagline: string;
  art: GameArt;
  installed: boolean;
  sizeGb: number;
  hours: number;
  lastPlayed: string;
  achievements: Achievement[];
}

export type FriendStatus = 'online' | 'playing' | 'away' | 'offline';

export interface Friend {
  id: string;
  name: string;
  status: FriendStatus;
  /** What they are doing, shown under the name. */
  activity: string;
  level: number;
  /** How they answer an invite (the example is deterministic). */
  answer: 'accept' | 'decline';
  /** The line shown at the friend when they say no. */
  declineLine?: string;
}

export const player = { name: 'Rowan Example', level: 24, coins: 1240 };

export const PARTY_SIZE = 4;

const a = (
  id: string,
  title: string,
  detail: string,
  icon: IconName,
  progress: number,
  goal: number,
  reward: number,
  claimed = false,
): Achievement => ({ id, title, detail, icon, progress, goal, reward, claimed });

export const games: Game[] = [
  {
    id: 'tidecaller',
    title: 'Tidecaller Saga',
    genre: 'Co-op adventure',
    tagline: 'Raise the drowned lighthouses and sail the archipelago with up to three friends.',
    art: { sky: 'indigo', ground: 'teal', spot: 'yellow', motif: 'waves' },
    installed: true,
    sizeGb: 38.2,
    hours: 41,
    lastPlayed: 'Yesterday',
    achievements: [
      a('t1', 'First Light', 'Relight a lighthouse', 'sparkles', 1, 1, 50),
      a('t2', 'Fair Winds', 'Sail 100 sea miles with a full crew', 'compass', 74, 100, 80),
      a('t3', 'Keeper of Five', 'Relight five lighthouses', 'flame', 3, 5, 120),
      a('t4', 'Kind Captain', 'Revive crewmates 25 times', 'heart', 25, 25, 60, true),
    ],
  },
  {
    id: 'pebblewick',
    title: 'Pebblewick Racers',
    genre: 'Party racing',
    tagline: 'Soapbox karts, hill villages and shortcuts nobody admits to.',
    art: { sky: 'orange', ground: 'green', spot: 'pink', motif: 'peaks' },
    installed: true,
    sizeGb: 12.6,
    hours: 18,
    lastPlayed: '3 days ago',
    achievements: [
      a('p1', 'Downhill Hero', 'Win a race without braking', 'trophy', 1, 1, 70),
      a('p2', 'Shortcut Scholar', 'Find 12 hidden shortcuts', 'map', 9, 12, 90),
      a('p3', 'Photo Finish', 'Win by less than a tenth', 'clock', 2, 3, 60),
    ],
  },
  {
    id: 'moss-engine',
    title: 'Moss Engine',
    genre: 'Puzzle builder',
    tagline: 'Grow machines out of moss, water and patience.',
    art: { sky: 'mint', ground: 'green', spot: 'yellow', motif: 'rings' },
    installed: true,
    sizeGb: 4.8,
    hours: 7,
    lastPlayed: 'Last week',
    achievements: [
      a('m1', 'Green Thumb', 'Finish the first garden', 'leaf', 1, 1, 30, true),
      a('m2', 'Clockwork Bloom', 'Build a machine that runs for a day', 'settings', 0, 1, 100),
      a('m3', 'Tiny Engineer', 'Solve 40 puzzles', 'target', 22, 40, 80),
    ],
  },
  {
    id: 'starfold',
    title: 'Starfold Tactics',
    genre: 'Strategy',
    tagline: 'Fold the night sky into maps and outwit the comet tide.',
    art: { sky: 'purple', ground: 'indigo', spot: 'pink', motif: 'orbs' },
    installed: false,
    sizeGb: 21.4,
    hours: 0,
    lastPlayed: 'Never',
    achievements: [
      a('s1', 'First Fold', 'Win your first skirmish', 'star', 0, 1, 50),
      a('s2', 'Comet Watcher', 'Survive ten comet tides', 'sparkles', 0, 10, 90),
    ],
  },
  {
    id: 'glimmer',
    title: 'Glimmer Hollow',
    genre: 'Exploration',
    tagline: 'Map the glowing caves below the isles, one lantern at a time.',
    art: { sky: 'blue', ground: 'purple', spot: 'mint', motif: 'grid' },
    installed: true,
    sizeGb: 16.1,
    hours: 23,
    lastPlayed: 'Today',
    achievements: [
      a('g1', 'Deep Breath', 'Reach the third cavern', 'mountain', 1, 1, 40, true),
      a('g2', 'Cartographer', 'Map every cave of the Hollow', 'map', 31, 48, 110),
      a('g3', 'Lantern Bearer', 'Carry a lantern for 2 hours', 'flame', 96, 120, 60),
    ],
  },
  {
    id: 'orchard',
    title: 'Orchard of Gears',
    genre: 'Cozy sim',
    tagline: 'Tend clockwork trees and trade fruit with the harbour.',
    art: { sky: 'yellow', ground: 'orange', spot: 'red', motif: 'orchard' },
    installed: false,
    sizeGb: 6.3,
    hours: 0,
    lastPlayed: 'Never',
    achievements: [
      a('o1', 'First Harvest', 'Pick a full basket', 'gift', 0, 1, 30),
      a('o2', 'Harbour Trader', 'Sell 200 pieces of fruit', 'coins', 0, 200, 80),
    ],
  },
];

export const friends: Friend[] = [
  {
    id: 'ada',
    name: 'Ada Example',
    status: 'online',
    activity: 'Online',
    level: 31,
    answer: 'accept',
  },
  {
    id: 'kai',
    name: 'Kai Example',
    status: 'playing',
    activity: 'Playing Pebblewick Racers',
    level: 19,
    answer: 'decline',
    declineLine: 'Finishing a race — try again in a few minutes.',
  },
  {
    id: 'noor',
    name: 'Noor Example',
    status: 'online',
    activity: 'In the hub',
    level: 42,
    answer: 'accept',
  },
  {
    id: 'leo',
    name: 'Leo Example',
    status: 'away',
    activity: 'Away for 12 min',
    level: 8,
    answer: 'accept',
  },
  {
    id: 'mina',
    name: 'Mina Example',
    status: 'playing',
    activity: 'Playing Glimmer Hollow',
    level: 27,
    answer: 'decline',
    declineLine: 'Deep in a cave right now. Next one!',
  },
  {
    id: 'theo',
    name: 'Theo Example',
    status: 'offline',
    activity: 'Last seen 2 days ago',
    level: 15,
    answer: 'accept',
  },
  {
    id: 'ivy',
    name: 'Ivy Example',
    status: 'offline',
    activity: 'Last seen last week',
    level: 36,
    answer: 'accept',
  },
];
