/**
   * Kbd atom — a tiny candy key cap for keyboard hints ("Enter saves"): lit on top, with a soft
   * lip underneath so it reads as a key you could press.
   *
   *   <Kbd>⌘</Kbd><Kbd>K</Kbd> opens the command palette
   */
import type { Snippet } from 'svelte';
type $$ComponentProps = {
    children: Snippet;
};
declare const Kbd: import("svelte").Component<$$ComponentProps, {}, "">;
type Kbd = ReturnType<typeof Kbd>;
export default Kbd;
