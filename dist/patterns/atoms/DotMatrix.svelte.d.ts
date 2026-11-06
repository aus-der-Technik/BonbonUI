declare const ROWS = 7;
export interface Dot {
    x: number;
    y: number;
    on: boolean;
}
/** Lays a string out as dots; characters without a glyph are skipped. */
export declare function layoutDots(text: string): {
    dots: Dot[];
    width: number;
};
export declare const dotMatrixChars: string[];
export { ROWS as dotMatrixRows };
interface Props {
    value: string | number;
    /** What assistive tech reads, when the figure alone is unclear ("24.5 degrees"). */
    label?: string | undefined;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'inherit';
    /** Also draws the unlit dots, faintly. */
    unlit?: boolean;
    class?: string;
}
declare const DotMatrix: import("svelte").Component<Props, {}, "">;
type DotMatrix = ReturnType<typeof DotMatrix>;
export default DotMatrix;
