/**
 * The change of a figure against a previous period, shared by Stat and KpiTile so both read
 * a delta the same way: direction from the sign, tone from which direction is good news.
 */
export type DeltaDirection = 'up' | 'down' | 'flat';
export type GoodWhen = 'up' | 'down' | 'none';
export type DeltaTone = 'good' | 'bad' | 'neutral';
/** Direction of a numeric change, or of a printed one ("+12 %", "−3"). */
export declare function deltaDirection(delta: number | string | null | undefined): DeltaDirection;
export declare function deltaTone(direction: DeltaDirection, goodWhen: GoodWhen): DeltaTone;
/** A relative change in percent, signed: "+12 %", "−3.5 %". */
export declare function formatDelta(delta: number, locale?: string): string;
