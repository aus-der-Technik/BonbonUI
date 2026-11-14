import type { IconName } from '../patterns/atoms/icons';
import type { NavGroup } from '../patterns/organisms/SideNav.svelte';
export type AdminSection = 'overview' | 'documents' | 'jobs' | 'ai' | 'data' | 'users' | 'settings';
export interface SectionMeta {
    title: string;
    /** One line under the title: what the section is for. */
    subtitle: string;
    icon: IconName;
    group: 'Workspace' | 'Administration';
}
export declare const SECTIONS: Record<AdminSection, SectionMeta>;
export declare const SECTION_KEYS: AdminSection[];
/**
 * The console's one toast stack, handed to every section. Only for what has no place on screen:
 * a background job that finished while you were elsewhere, or a thing that is gone (then with
 * an Undo action). Everything else answers at its control.
 */
export type Notify = (message: string, options?: {
    tone?: 'ok' | 'warn' | 'error';
    action?: {
        label: string;
        onaction: () => void;
    };
}) => void;
/** Props every section gets from the shell. */
export interface SectionProps {
    /** The section is on screen (sections stay alive in the background once visited). */
    active?: boolean;
    notify?: Notify | undefined;
    /** Go to another section, e.g. "Open in Jobs". */
    onnavigate?: ((section: AdminSection) => void) | undefined;
}
/** The side navigation; `counts` adds a small pill to an item (e.g. running jobs). */
export declare function adminNav(active: AdminSection, counts?: Partial<Record<AdminSection, number>>): NavGroup[];
/** File sizes in English ("2.4 MB"); utils/upload's formatBytes still prints German digits. */
export declare function bytes(value: number): string;
/** "14:02:31" for "Checked …" lines. */
export declare const clockFormat: Intl.DateTimeFormat;
/** Waits `ms`, then resolves — the mock "server" round trip. */
export declare const later: (ms?: number) => Promise<void>;
