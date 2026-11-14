/**
   * Storybook-only: the small live previews of the catalogue's molecules, one snippet per
   * component, rendered with the real components and tiny props. Overlays and big pieces are
   * left to the fallback glyph.
   */
import type { Snippet } from 'svelte';
type $$ComponentProps = {
    name: string;
    fallback: Snippet;
};
declare const PreviewMolecules: import("svelte").Component<$$ComponentProps, {}, "">;
type PreviewMolecules = ReturnType<typeof PreviewMolecules>;
export default PreviewMolecules;
