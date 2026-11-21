/**
   * FeatureCard molecule — one selling point of a website: an icon in a candy squircle, a title
   * and a line or two of text. Straight on the ground layer by default, or on a panel.
   * With `href` the whole card is a link and lifts on hover.
   *
   *   <FeatureCard icon="bolt" color="orange" title="Instant sync" text="Changes land in ms." />
   */
import type { Snippet } from 'svelte';
import type { IconName } from '../atoms/icons';
import { type AccentColor } from './web';
interface Props {
    title: string;
    text?: string | undefined;
    icon?: IconName | undefined;
    /** A candy hue (`blue`, `pink`…), `accent`, or any CSS colour. */
    color?: AccentColor | undefined;
    /** `tinted` — soft colour square, coloured glyph; `solid` — a glossy app-icon square. */
    iconStyle?: 'tinted' | 'solid';
    /** `ground` (default) sits directly on the backdrop; `panel` is a card. */
    level?: 'panel' | 'ground';
    /** `horizontal` puts the icon beside the text (dense lists). */
    layout?: 'vertical' | 'horizontal';
    href?: string | undefined;
    /** Heading level of the title (default 3). */
    heading?: 2 | 3 | 4;
    /** Extra content under the text: a link, a tag list. */
    children?: Snippet | undefined;
}
declare const FeatureCard: import("svelte").Component<Props, {}, "">;
type FeatureCard = ReturnType<typeof FeatureCard>;
export default FeatureCard;
