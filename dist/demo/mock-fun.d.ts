/** Mock data for the listening-room example (Pages/Fun). Every artist and title is invented. */
import type { PaletteColor } from '../patterns/atoms/palette';
/** Album art is drawn with CSS gradients from palette tokens, no images. */
export interface AlbumArt {
    from: PaletteColor;
    to: PaletteColor;
    /** The colour of the motif laid over the background. */
    spot: PaletteColor;
    motif: 'sun' | 'rings' | 'stripes' | 'split' | 'dots';
}
export interface Track {
    id: string;
    title: string;
    artist: string;
    albumId: string;
    /** Length in seconds. */
    seconds: number;
}
export interface Album {
    id: string;
    title: string;
    artist: string;
    year: number;
    /** Lower is newer — the order of "Recently added". */
    added: number;
    art: AlbumArt;
    tracks: Track[];
}
export declare const albums: Album[];
export declare const albumById: (id: string) => Album;
/** Heights (0–1) and speeds of the visualiser's bars; fixed, so it looks the same every run. */
export declare const bars: {
    h: number;
    delay: number;
    speed: number;
}[];
