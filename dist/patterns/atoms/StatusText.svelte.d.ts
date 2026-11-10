/**
   * StatusText atom — one small live line next to a form or in a panel header: "Streaming…",
   * "Done.", "N characters" or an error. Announced politely (`danger` assertively, as an alert);
   * `busy` puts a spinner in front.
   *
   *   <StatusText tone="ok" message="Saved." />
   */
import type { Snippet } from 'svelte';
import { type Tone } from '../tone';
interface Props {
    message?: string | undefined;
    tone?: Tone
    /** @deprecated Use `neutral`. */
     | 'muted'
    /** @deprecated Use `danger`. */
     | 'error';
    busy?: boolean;
    children?: Snippet | undefined;
}
declare const StatusText: import("svelte").Component<Props, {}, "">;
type StatusText = ReturnType<typeof StatusText>;
export default StatusText;
