<script lang="ts">
  /**
   * The one header every Admin console section starts with: title, a one-line subtitle and the
   * controls whose effect is the whole section (e.g. the overview's time range). Storybook only.
   */
  import type { Snippet } from 'svelte';
  import Section from '../patterns/layout/Section.svelte';
  import { SECTIONS, type AdminSection } from './admin';

  interface Props {
    section: AdminSection;
    /** Overrides the section's title (the overview greets instead). */
    title?: string | undefined;
    /** Overrides the section's subtitle. */
    description?: string | undefined;
    eyebrow?: string | undefined;
    actions?: Snippet | undefined;
  }

  let { section, title, description, eyebrow, actions }: Props = $props();
</script>

<Section
  size="lead"
  eyebrow={eyebrow ?? SECTIONS[section].group}
  title={title ?? SECTIONS[section].title}
  description={description ?? SECTIONS[section].subtitle}
  {actions}
  data-note="section-head"
/>
