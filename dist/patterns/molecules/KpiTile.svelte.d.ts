export interface MeterSegment {
    value: number;
    color: string;
}
/**
   * KpiTile molecule — a summary number, on the ground by default (a hairline on its leading
   * edge sets a row of them apart; `level="panel"` puts it on a card): label (with an optional icon in a tinted
   * squircle), the big tabular value, a trend pill ("+12 %") and a detail line, and an optional
   * proportional meter (e.g. "Thumbs up share"). A rising `delta` is green, a falling one red;
   * `goodWhen="down"` (or `invert`) swaps that for figures where less is better (errors, wait
   * times). It takes Stat's props too — a numeric `delta` in percent, `deltaText`, `deltaLabel`,
   * `goodWhen`, `unit`, `locale` — so a Stat can move onto a card without rewriting it. A changed
   * value glows briefly.
   *
   * The value is `value`, or the children when there is nothing else to say about it.
   *
   *   <KpiTile label="Open">24</KpiTile>
   *   <KpiTile label="Orders" value="1,284" delta="+12 %" detail="vs. last week" icon="cart" />
   *   <KpiTile label="Errors" value={12} delta={-8} deltaLabel="vs last week" goodWhen="down" />
   */
import type { Snippet } from 'svelte';
import type { IconName } from '../atoms/icons';
import { type GoodWhen } from './delta';
interface Props {
    /** `ground` (default) sits on the backdrop beside a hairline; `panel` is a card. */
    level?: 'ground' | 'panel';
    label: string;
    /** `null` renders the "–" placeholder (not loaded / no data). Leave it out to pass the
     *  value as children. */
    value?: string | number | null;
    /** The line under the value; a snippet for anything richer than text. */
    detail?: string | Snippet | undefined;
    meter?: MeterSegment[] | undefined;
    icon?: IconName | undefined;
    /** Change against a previous period: printed as given ("+12 %", "−3"), or a number read
     *  as a relative change in percent (like Stat). */
    delta?: string | number | undefined;
    /** Overrides the printed change of a numeric `delta`, e.g. "+3 new". */
    deltaText?: string | undefined;
    /** The period it is compared against, e.g. "vs last week"; shown when there is no `detail`. */
    deltaLabel?: string | undefined;
    /** Direction of `delta`; read from its sign when left out. */
    trend?: 'up' | 'down' | 'flat' | undefined;
    /** Which direction is good news (colours the change). Default `up`, or `down` with `invert`. */
    goodWhen?: GoodWhen | undefined;
    /** Falling is good (errors, latency): down turns green, up red. Same as `goodWhen="down"`. */
    invert?: boolean;
    /** Small text after a value, e.g. "%", "h". */
    unit?: string | undefined;
    /** Formats a numeric `value` and `delta`. */
    locale?: string;
    /** The value, written as content: `<KpiTile label="Open">24</KpiTile>`. */
    children?: Snippet | undefined;
}
declare const KpiTile: import("svelte").Component<Props, {}, "">;
type KpiTile = ReturnType<typeof KpiTile>;
export default KpiTile;
