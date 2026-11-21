interface Props {
    /** Closes the panel (a pull down far enough, or a tap on the grip). */
    close: () => void;
    /** `sheet` as tall as its content, `half` at most ~58 % and undimmed, `full` the whole screen. */
    size?: 'sheet' | 'half' | 'full';
    /** The grip's accessible name. */
    label?: string;
}
declare const SheetGrip: import("svelte").Component<Props, {}, "">;
type SheetGrip = ReturnType<typeof SheetGrip>;
export default SheetGrip;
