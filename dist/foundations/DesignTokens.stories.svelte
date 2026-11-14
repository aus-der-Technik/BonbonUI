<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import DesignTokens from './DesignTokens.svelte';

  // Foundation page: a live view of src/lib/styles/tokens.css, read from the computed styles,
  // so it follows the theme toolbar and can never drift.
  const { Story } = defineMeta({
    title: 'Introduction/Design tokens',
    component: DesignTokens,
    tags: ['!autodocs'],
    parameters: { layout: 'fullscreen', controls: { disable: true } },
  });
</script>

<Story name="Design tokens" />
