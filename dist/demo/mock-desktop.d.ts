import type { CommandGroup } from '../patterns/desktop/CommandPalette.svelte';
import type { ControlToggle } from '../patterns/desktop/QuickSettings.svelte';
import type { OsNotification } from '../patterns/desktop/NotificationCenter.svelte';
import type { AppEntry, DesktopIcon, DockEntry, MenuBarMenu } from '../patterns/desktop/shared.svelte';
import type { SourceSection } from '../patterns/desktop/SourceList.svelte';
import type { TreeNode } from '../patterns/desktop/TreeView.svelte';
/** Candy wallpapers built from tokens, so they follow the tint and the theme. */
export declare const wallpapers: readonly [{
    readonly id: "candy";
    readonly name: "Candy";
    readonly value: string;
}, {
    readonly id: "sunset";
    readonly name: "Sunset";
    readonly value: string;
}, {
    readonly id: "ocean";
    readonly name: "Ocean";
    readonly value: string;
}, {
    readonly id: "aurora";
    readonly name: "Aurora";
    readonly value: string;
}];
export type AppId = 'files' | 'notes' | 'mail' | 'music' | 'calendar' | 'photos' | 'settings';
export declare const apps: (AppEntry & {
    id: AppId | string;
})[];
export declare const dockOrder: string[];
/**
 * The tray: the favourites, then running apps that are not favourites (so a minimised window
 * always has a way home), a separator and the trash (the candy jar comes from `Dock.onjar`).
 * `badges` overrides the apps' badges (live unread counts); `trashFull` paints the trash.
 */
export declare function dock(running: string[], active?: string, options?: {
    badges?: Record<string, number | undefined>;
    trashFull?: boolean;
}): DockEntry[];
/** A short to-do list for the "little wins" widget. */
export declare const todos: {
    id: string;
    label: string;
    done: boolean;
}[];
/** Today's calendar, for the Today widget. */
export declare const agenda: {
    id: string;
    title: string;
    time: string;
    place: string;
}[];
export declare const desktopIcons: DesktopIcon[];
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
    at?: {
        x: number;
        y: number;
    } | undefined;
    /** A folder that shows another place's content when opened. */
    opens?: string | undefined;
}
export declare const files: FileEntry[];
export declare const places: SourceSection[];
export declare const fileTree: TreeNode[];
export interface Note {
    id: string;
    title: string;
    body: string;
    updated: string;
}
export declare const notes: Note[];
export interface Track {
    title: string;
    artist: string;
    album: string;
    length: number;
    colors: [string, string];
}
export declare const tracks: Track[];
export declare const controlToggles: ControlToggle[];
export declare const seedNotifications: OsNotification[];
/**
 * What happens in the background of the Desktop OS while you work — the only things that may
 * raise a banner there: nobody clicked anything, so there is no place to answer at.
 */
export declare const backgroundMail: Mail;
/** A download that was already running when the desktop started; it finishes on its own. */
export declare const backgroundDownload: FileEntry;
export declare const laterNotifications: OsNotification[];
export declare function appMenus(name: string, actions?: Record<string, () => void>, 
/** What Edit → Undo would undo ("Move to trash"); without it Undo is disabled. */
undo?: string): MenuBarMenu[];
export declare function commandGroups(actions: {
    open: (id: string) => void;
    theme: (theme: 'auto' | 'light' | 'dark') => void;
    tint: (value: string) => void;
}): CommandGroup[];
export declare const mailboxes: SourceSection[];
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
    attachments: {
        name: string;
        size: string;
    }[];
}
export declare const mails: Mail[];
