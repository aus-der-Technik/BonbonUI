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
export declare const player: {
    name: string;
    level: number;
    coins: number;
};
export declare const PARTY_SIZE = 4;
export declare const games: Game[];
export declare const friends: Friend[];
