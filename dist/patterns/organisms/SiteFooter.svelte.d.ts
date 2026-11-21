import type { IconName } from '../atoms/icons';
export interface FooterLink {
    label: string;
    href: string;
}
export interface FooterColumn {
    title: string;
    links: FooterLink[];
}
export interface SocialLink {
    /** Accessible name, e.g. "Mastodon". */
    label: string;
    href: string;
    icon: IconName;
}
/**
   * SiteFooter organism — the bottom of a website: brand and tagline, columns of links, social
   * icons, and a fine-print row (copyright, legal links). Columns reflow from a row on desktop
   * to two-up on phones. Put it in a Page's `footer` snippet.
   *
   *   <SiteFooter brand="Example Planner" tagline="Tools for small teams." columns={columns}
   *     finePrint="© 2026 Example Studio" />
   */
import type { Snippet } from 'svelte';
interface Props {
    brand?: string | undefined;
    logo?: Snippet | undefined;
    brandHref?: string;
    tagline?: string | undefined;
    columns?: FooterColumn[];
    social?: SocialLink[];
    /** Copyright line. */
    finePrint?: string | undefined;
    /** Imprint, privacy, terms… next to the fine print. */
    legal?: FooterLink[];
    /** `ground` (default) sits directly on the backdrop; `panel` is a card. */
    level?: 'panel' | 'ground';
    /** Under the tagline: a newsletter form, app store badges. */
    children?: Snippet | undefined;
    label?: string;
    legalLabel?: string;
}
declare const SiteFooter: import("svelte").Component<Props, {}, "">;
type SiteFooter = ReturnType<typeof SiteFooter>;
export default SiteFooter;
