export type JobState = 'idle' | 'queued' | 'running' | 'done' | 'cached' | 'failed' | 'cancelled';
interface Props {
    status: JobState;
    /** What it is doing right now, e.g. "extracting". */
    step?: string | undefined;
    done?: number | undefined;
    total?: number | undefined;
    /** Extra counts on the right, e.g. "3 failed". */
    detail?: string | undefined;
    labels?: Partial<Record<JobState, string>>;
    /** The progress text, e.g. "17 of 40". */
    progressLabel?: (done: number, total: number) => string;
}
declare const JobStatus: import("svelte").Component<Props, {}, "">;
type JobStatus = ReturnType<typeof JobStatus>;
export default JobStatus;
