import type { IconName } from '../atoms/icons';
import type { AccentColor } from '../molecules/web';
export interface Feature {
    title: string;
    text?: string | undefined;
    icon?: IconName | undefined;
    /** A candy hue, `accent` or any CSS colour. Default: the candy palette in turn. */
    color?: AccentColor | undefined;
    href?: string | undefined;
}
/**
   * FeatureGrid organism — a website's "what you get" band: an optional section heading over
   * a responsive grid of FeatureCards. Icons use the tint by default — calm first, candy second:
   * one hue reads as one product. `colorful` cycles the candy palette for playful bands; a
   * feature can still name its own colour.
   *
   *   <FeatureGrid eyebrow="Features" title="Everything in one place" features={features} />
   */
import type { Snippet } from 'svelte';
import type { Space } from '../layout/space';
interface Props {
    features?: Feature[];
    title?: string | undefined;
    eyebrow?: string | undefined;
    description?: string | undefined;
    align?: 'start' | 'center';
    /** `hero` sets the heading large, as a website band; `default` is the app section size. */
    size?: 'default' | 'hero';
    /** Minimum card width; as many columns as fit. */
    min?: string;
    /** Maximum number of columns. */
    columns?: number | undefined;
    gap?: Space;
    /** `ground` (default) lays the features straight on the backdrop; `panel` puts each on a card. */
    level?: 'panel' | 'ground';
    iconStyle?: 'tinted' | 'solid';
    /** `horizontal` puts each icon beside its text. */
    layout?: 'vertical' | 'horizontal';
    /** Cycle the candy palette through the icons instead of using the tint for all. */
    colorful?: boolean;
    /** Own cards after the listed ones. */
    children?: Snippet | undefined;
}
declare const FeatureGrid: import("svelte").Component<Props, {}, "">;
type FeatureGrid = ReturnType<typeof FeatureGrid>;
export default FeatureGrid;
