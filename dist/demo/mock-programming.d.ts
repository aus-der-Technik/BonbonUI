/** Mock data for the programming examples (Pages/Programming): deployments and code review. */
import type { IconName } from '../patterns/atoms/icons';
export type StageId = 'build' | 'test' | 'deploy';
export type RunStatus = 'queued' | 'running' | 'passed' | 'failed' | 'cancelled';
export interface Step {
    name: string;
    /** How long the step takes, in seconds of the simulation. */
    seconds: number;
    log: string[];
    /** The step fails when it reaches its end (a broken test). */
    fails?: boolean;
}
export interface Stage {
    id: StageId;
    label: string;
    steps: Step[];
}
export interface Run {
    id: string;
    branch: string;
    sha: string;
    message: string;
    author: string;
    /** "3 min ago", "yesterday" — finished runs only. */
    when: string;
    status: RunStatus;
    /** Seconds the run has been going (or took). */
    at: number;
    stages: Stage[];
    /** The version the deploy stage ships to staging (main only). */
    ships?: string;
}
export interface Environment {
    id: 'staging' | 'production';
    name: string;
    url: string;
    version: string;
    sha: string;
    /** Earlier versions, newest first: a rollback returns to the first. */
    before: {
        version: string;
        sha: string;
    }[];
    deployedBy: string;
    deployedAt: string;
    instances: number;
    health: 'ok' | 'warn';
}
export interface Environment {
    id: 'staging' | 'production';
    name: string;
    url: string;
    version: string;
    sha: string;
    /** Earlier versions, newest first: a rollback returns to the first. */
    before: {
        version: string;
        sha: string;
    }[];
    deployedBy: string;
    deployedAt: string;
    instances: number;
    health: 'ok' | 'warn';
}
export declare const runs: Run[];
export declare const branches: string[];
/** Stages of a pipeline started by hand from the "Run pipeline" popover. */
export declare function stagesFor(branch: string): Stage[];
export declare const runTotal: (stages: Stage[]) => number;
export declare const environments: Environment[];
/** Log lines of a production rollout, one per simulated second. */
export declare const rolloutLog: (version: string, instances: number) => string[];
export type LineKind = 'ctx' | 'add' | 'del';
export interface DiffLine {
    kind: LineKind;
    text: string;
    old?: number | undefined;
    new?: number | undefined;
    /** Where a comment on this line is anchored, e.g. "src/cart/saved.ts:R17". */
    key: string;
}
export interface Hunk {
    header: string;
    lines: DiffLine[];
}
export interface ChangedFile {
    path: string;
    status: 'added' | 'modified' | 'removed';
    hunks: Hunk[];
    added: number;
    removed: number;
}
/**
 * Reads a unified diff ("@@ -a,b +c,d @@ …" followed by " ", "+" and "-" lines) into hunks
 * with old and new line numbers, so the mock can be written the way diffs are printed.
 */
export declare function parseDiff(path: string, text: string): Hunk[];
export declare const changeRequest: {
    number: number;
    title: string;
    branch: string;
    base: string;
    author: string;
    opened: string;
    description: string;
};
export declare const files: ChangedFile[];
export interface ReviewComment {
    id: string;
    author: string;
    role?: string | undefined;
    text: string;
    /** Minutes before `REVIEW_NOW`. */
    ago: number;
}
export interface ReviewThread {
    id: string;
    /** The `DiffLine.key` it hangs under. */
    at: string;
    resolved: boolean;
    comments: ReviewComment[];
}
/** A fixed "now" keeps "5 minutes ago" stable in stories and screenshots. */
export declare const REVIEW_NOW: Date;
export declare const minutesAgo: (m: number) => Date;
export declare const threads: ReviewThread[];
export interface Check {
    id: string;
    name: string;
    icon: IconName;
    /** Seconds it takes; a running check counts up to it. */
    seconds: number;
    /** Seconds already done when the page opens. */
    at: number;
    fails?: boolean;
    failure?: string;
}
export declare const checks: Check[];
export interface Reviewer {
    name: string;
    verdict: 'approved' | 'changes' | 'pending' | 'commented';
    /** The person using the page. */
    you?: boolean;
}
export declare const reviewers: Reviewer[];
