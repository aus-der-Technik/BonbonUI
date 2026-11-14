interface Props {
    /** Name of the workbook in the top bar. */
    title?: string;
    savedLabel?: string;
    savingLabel?: string;
}
declare const Spreadsheet: import("svelte").Component<Props, {}, "">;
type Spreadsheet = ReturnType<typeof Spreadsheet>;
export default Spreadsheet;
