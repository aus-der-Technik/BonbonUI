<script lang="ts">
  /**
   * Storybook-only: the frame of one study chapter — the handbook page (DocPage) with the
   * chapter's place in the study as its label and the previous / next chapter at the end, so
   * the study reads cover to cover.
   */
  import type { Snippet } from 'svelte';
  import DocPage from '../DocPage.svelte';
  import { chapters, type ChapterSlug } from './links';
  import { bookPager } from '../book';

  interface Props {
    slug: ChapterSlug;
    title: string;
    lead?: string | undefined;
    children: Snippet;
  }

  let { slug, title, lead, children }: Props = $props();

  const index = $derived(chapters.findIndex((c) => c.slug === slug));
  const eyebrow = $derived(
    index === 0 ? 'Design study' : `Design study · ${index} of ${chapters.length - 1}`,
  );
  const pager = $derived(bookPager(`design-study-${slug}--${slug}`));
</script>

<DocPage {eyebrow} {title} {lead} {pager}>
  {@render children()}
</DocPage>
