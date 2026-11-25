<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import DesignLanguage from './DesignLanguage.svelte';

  const { Story } = defineMeta({
    title: 'Introduction/Design language',
    component: DesignLanguage,
    tags: ['!autodocs'],
    parameters: { layout: 'fullscreen', controls: { disable: true } },
  });
</script>

<Story name="Design language" />
