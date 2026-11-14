/** The four core principles of the design study, in the order the study explains them. */
export declare const PRINCIPLES: {
    readonly function: {
        readonly n: 1;
        readonly label: "Function first, beautiful because of it";
    };
    readonly friendly: {
        readonly n: 2;
        readonly label: "Friendly, always";
    };
    readonly locality: {
        readonly n: 3;
        readonly label: "Act where you look";
    };
    readonly cues: {
        readonly n: 4;
        readonly label: "Cues show cause and effect";
    };
};
export type Principle = keyof typeof PRINCIPLES;
export interface DesignNote {
    principle: Principle;
    /** One line: what the reader should notice. */
    title: string;
    /** Why it is built that way, in plain words. */
    body: string;
    /** A CSS selector for the part of the page the note talks about; it lights up on hover. */
    target?: string;
}
interface Props {
    /** What the example is, e.g. "Spreadsheet". */
    title: string;
    notes: DesignNote[];
    /** Where the pill sits; pick the corner the page leaves free. */
    corner?: 'bottom-left' | 'bottom-right' | 'top-right';
    /** Starts opened (handy for screenshots and the study's index). */
    open?: boolean;
}
declare const DesignNotes: import("svelte").Component<Props, {}, "open">;
type DesignNotes = ReturnType<typeof DesignNotes>;
export default DesignNotes;
