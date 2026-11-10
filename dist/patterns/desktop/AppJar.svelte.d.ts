import type { AppEntry } from './shared.svelte';
/** Props of AppJar (exported for the deprecated alias). */
export interface AppJarProps {
    open?: boolean;
    apps: AppEntry[];
    query?: string;
    onselect?: ((app: AppEntry) => void) | undefined;
    onclose?: (() => void) | undefined;
    /** The button that opened it: the jar rises out of it (default: the tray's jar button). */
    anchor?: Element | DOMRect | undefined;
    /** Icon size in px. */
    size?: number;
    /** Heading of the jar and its accessible name. */
    label?: string;
    searchLabel?: string;
    placeholder?: string;
    emptyText?: string;
    /** Heading for apps without a `category` (when others have one). */
    otherLabel?: string;
    /** Heading of the search results. */
    resultsLabel?: string;
}
declare const AppJar: import("svelte").Component<AppJarProps, {}, "open" | "query">;
type AppJar = ReturnType<typeof AppJar>;
export default AppJar;
