<script lang="ts" module>
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
</script>

<script lang="ts">
  /**
   * FeatureGrid organism — a website's "what you get" band: an optional section heading over
   * a responsive grid of FeatureCards. Icons use the tint by default — calm first, candy second:
   * one hue reads as one product. `colorful` cycles the candy palette for playful bands; a
   * feature can still name its own colour.
   *
   *   <FeatureGrid eyebrow="Features" title="Everything in one place" features={features} />
   */
  import type { Snippet } from 'svelte';
  import FeatureCard from '../molecules/FeatureCard.svelte';
  import Grid from '../layout/Grid.svelte';
  import Section from '../layout/Section.svelte';
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
    /** `panel` cards on glass; `ground` lays the features straight on the backdrop. */
    level?: 'panel' | 'ground';
    iconStyle?: 'tinted' | 'solid';
    /** `horizontal` puts each icon beside its text. */
    layout?: 'vertical' | 'horizontal';
    /** Cycle the candy palette through the icons instead of using the tint for all. */
    colorful?: boolean;
    /** Own cards after the listed ones. */
    children?: Snippet | undefined;
  }

  let {
    features = [],
    colorful = false,
    title,
    eyebrow,
    description,
    align = 'center',
    size = 'hero',
    min = '16rem',
    columns = 3,
    gap = 'md',
    level = 'panel',
    iconStyle = 'tinted',
    layout = 'vertical',
    children,
  }: Props = $props();

  const CYCLE: AccentColor[] = ['blue', 'orange', 'green', 'purple', 'pink', 'teal'];
</script>

{#snippet grid()}
  <Grid {min} {columns} {gap}>
    {#each features as feature, i (feature.title)}
      <FeatureCard
        title={feature.title}
        text={feature.text}
        icon={feature.icon}
        color={feature.color ?? (colorful ? CYCLE[i % CYCLE.length] : 'accent')}
        href={feature.href}
        heading={title ? 3 : 2}
        {level}
        {iconStyle}
        {layout}
      />
    {/each}
    {@render children?.()}
  </Grid>
{/snippet}

{#if title || eyebrow || description}
  <Section {title} {eyebrow} {description} {align} {size} gap="lg">
    {@render grid()}
  </Section>
{:else}
  {@render grid()}
{/if}
