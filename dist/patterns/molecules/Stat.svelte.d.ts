/**
   * Stat molecule — a headline figure on the ground layer: a label, a big tabular value, an
   * optional change against a named period (arrow, sign and a tone that knows whether up is
   * good) and an optional sparkline whose latest point is marked in the accent. No card around
   * it — put several in a Grid, or inside a panel.
   *
   * When `value` changes the figure glows briefly, so an update is noticed. KpiTile takes the
   * same delta props, so the two are interchangeable (Stat on the ground, KpiTile on a card).
   *
   *   <Stat label="Open tasks">128</Stat>
   *   <Stat label="Open tasks" value={128} delta={-12} deltaLabel="vs last week" goodWhen="down" />
   */
import type { Snippet } from 'svelte';
import type { IconName } from '../atoms/icons';
import { type GoodWhen } from './delta';
interface Props {
    label: string;
    /** Leave it out to pass the value as children. */
    value?: string | number | undefined;
    /** Small text after the value, e.g. "%", "h", "€". */
    unit?: string | undefined;
    /** Relative change in percent; its sign picks the arrow. */
    delta?: number | undefined;
    /** Overrides the printed change, e.g. "+3 new". */
    deltaText?: string | undefined;
    /** The period it is compared against, e.g. "vs last week". */
    deltaLabel?: string | undefined;
    /** Which direction is good news (colours the change). */
    goodWhen?: GoodWhen;
    /** Recent values, oldest first, for the sparkline. */
    trend?: number[] | undefined;
    icon?: IconName | undefined;
    size?: 'sm' | 'md' | 'lg';
    align?: 'start' | 'center';
    locale?: string;
    /** Accessible description of the sparkline. */
    trendLabel?: string;
    /** The value, written as content: `<Stat label="Open">128</Stat>`. */
    children?: Snippet | undefined;
}
declare const Stat: import("svelte").Component<Props, {}, "">;
type Stat = ReturnType<typeof Stat>;
export default Stat;
