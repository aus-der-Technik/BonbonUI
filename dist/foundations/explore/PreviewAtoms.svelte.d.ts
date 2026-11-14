/**
   * Storybook-only: the small live previews of the catalogue's atoms and layout helpers, one
   * snippet per component, rendered with the real components and tiny props.
   */
import type { Snippet } from 'svelte';
type $$ComponentProps = {
    name: string;
    fallback: Snippet;
};
declare const PreviewAtoms: import("svelte").Component<$$ComponentProps, {}, "">;
type PreviewAtoms = ReturnType<typeof PreviewAtoms>;
export default PreviewAtoms;
