import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default {
  // Run TypeScript over <script> blocks (and any CSS preprocessing over <style>).
  // Nothing here compiles to a custom element: the consumers are Svelte apps, so components
  // ship as plain `.svelte` files with scoped styles.
  preprocess: vitePreprocess(),
};
