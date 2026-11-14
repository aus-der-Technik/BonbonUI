/**
   * Storybook-only: the small live previews of the catalogue's organisms, templates and desktop
   * pieces. Only what is cheap and meaningful when small is shown live; overlays (dialogs,
   * drawers, menus), whole frames and data-heavy organisms are left to the fallback glyph, so a
   * scroll through the catalogue never mounts a dozen big components at once.
   */
import type { Snippet } from 'svelte';
type $$ComponentProps = {
    name: string;
    fallback: Snippet;
};
declare const PreviewLarge: import("svelte").Component<$$ComponentProps, {}, "">;
type PreviewLarge = ReturnType<typeof PreviewLarge>;
export default PreviewLarge;
