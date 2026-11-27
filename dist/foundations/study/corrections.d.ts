/**
 * Storybook-only: the corrections the study made to the system — what was wrong, which
 * principle it broke, and what changed. Grouped the way the Corrections chapter shows them.
 */
import type { Principle } from '../../demo/DesignNotes.svelte';
export interface Correction {
    /** What was wrong, in plain words. */
    was: string;
    /** What it is now. */
    now: string;
    breaks: Principle[];
    /** Where to see it (component or page). */
    where: string;
}
export declare const corrections: {
    title: string;
    intro: string;
    items: Correction[];
}[];
