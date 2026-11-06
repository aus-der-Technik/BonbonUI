import type { IconName } from '../atoms/icons';
import { type GoodWhen } from './delta';
interface Props {
    label: string;
    value: string | number;
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
}
declare const Stat: import("svelte").Component<Props, {}, "">;
type Stat = ReturnType<typeof Stat>;
export default Stat;
