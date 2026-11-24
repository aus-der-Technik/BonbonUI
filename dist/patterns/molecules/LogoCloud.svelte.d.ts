/** A customer or partner logo: an image (`src`, SVG works best) or just the name as a wordmark. */
export interface Logo {
    name: string;
    src?: string | undefined;
    href?: string | undefined;
}
/**
   * LogoCloud molecule — the quiet row of customer logos under a hero ("Trusted by teams at…").
   * Logos are muted to one grey so a mix of brands still looks calm, and regain their colour on
   * hover. Without `src` a logo is set as a wordmark from its name.
   *
   *   <LogoCloud title="Trusted by teams at" logos={[{ name: 'Example Planner' }, { name: 'Example Labs' }]} />
   */
import type { Snippet } from 'svelte';
interface Props {
    logos?: Logo[];
    title?: string | undefined;
    /** Logo height. */
    height?: string;
    /** Keep the brand colours instead of muting them. */
    colored?: boolean;
    align?: 'center' | 'start';
    /** Own logos (inline SVGs…) after the listed ones. */
    children?: Snippet | undefined;
}
declare const LogoCloud: import("svelte").Component<Props, {}, "">;
type LogoCloud = ReturnType<typeof LogoCloud>;
export default LogoCloud;
