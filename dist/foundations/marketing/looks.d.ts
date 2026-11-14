/** The presets, then a few refined ones the presets do not reach. */
export declare const tints: readonly string[];
export type Theme = 'light' | 'dark';
export interface Look {
    tint: string;
    theme: Theme;
}
/** A varied but steady look per catalogue entry: neighbours never share a tint. */
export declare function lookFor(name: string): Look;
export interface Query {
    mk: string | null;
    tint: string | null;
    theme: Theme | null;
}
export declare function readQuery(): Query;
/** Per-square options a studio can set for one component. */
export interface Meta {
    /** Scale of the arrangement (default 1.6). */
    zoom?: number;
    /** A few words under the name. */
    note?: string;
    theme?: Theme;
    tint?: string;
    /** `top-left` sits in the corner at the frame's margin instead of centred. */
    place?: 'centre' | 'top-left';
    /** Stage it on a photo. */
    photo?: string;
    /** Hold a press on this selector while capturing (shows the squeeze or a pressed state). */
    hold?: string;
    /** With `hold`: slide the held press onto this selector before capturing. */
    slide?: string;
}
/** What a studio lists for the render script (`?mk=__list`). */
export interface ListEntry {
    name: string;
    file: string;
    hold?: string | undefined;
    slide?: string | undefined;
}
export declare const kebab: (s: string) => string;
export declare const levelFile: Record<string, string>;
