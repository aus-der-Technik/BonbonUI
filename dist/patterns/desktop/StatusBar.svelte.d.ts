import type { IconName } from '../atoms/icons';
export interface StatusSegment {
    id?: string | undefined;
    label: string;
    icon?: IconName | undefined;
    /** Colour of the dot / icon: `ok` green, `warn` amber, `danger` red, `accent` the tint. */
    tone?: 'neutral' | 'accent' | 'ok' | 'warn' | 'danger' | undefined;
    /** A status dot in front. */
    dot?: boolean | undefined;
    /** Longer text on hover. */
    title?: string | undefined;
    /** Makes the segment a button (e.g. "Ln 12, Col 4" opens "Go to line"). */
    onclick?: (() => void) | undefined;
}
/**
   * StatusBar — the thin bar at the bottom of a desktop app window: segments of status text
   * ("24 items", "Synced", "Ln 12, Col 4") on the left and right, with optional icons, dots and
   * click actions. Put it in a Window's `footer`; in page flow it sticks to the bottom.
   *
   *   <StatusBar items={[{ label: '24 items' }, { label: 'Synced', dot: true, tone: 'ok' }]}
   *              trailing={[{ label: 'UTF-8' }]} />
   */
import type { Snippet } from 'svelte';
interface Props {
    items?: StatusSegment[];
    trailing?: StatusSegment[];
    /** Accessible name. */
    label?: string;
    /** Free content between the two groups (e.g. a progress bar). */
    children?: Snippet | undefined;
}
declare const StatusBar: import("svelte").Component<Props, {}, "">;
type StatusBar = ReturnType<typeof StatusBar>;
export default StatusBar;
