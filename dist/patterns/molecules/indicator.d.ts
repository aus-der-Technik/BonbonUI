export interface IndicatorOptions {
    /** Finds the current item inside the container. */
    selector: string;
    /** Anything that changes when the selection does (usually the value). */
    key?: unknown;
    /** How far the surface bulges while the indicator moves (0 = it stays still). */
    bulge?: number;
    /** The surface that bulges, found with `closest()` from the container (default: the
     *  container itself), e.g. the whole glass bar around a list of links. */
    hostSelector?: string | undefined;
}
export declare function indicator(node: HTMLElement, options: IndicatorOptions): {
    update(next: IndicatorOptions): void;
    destroy(): void;
};
