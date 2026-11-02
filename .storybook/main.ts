import type { StorybookConfig } from '@storybook/svelte-vite';

const config: StorybookConfig = {
  // Stories are co-located with the atomic-design components under src/lib; `.mdx` picks up
  // hand-written docs pages (the introduction under "0 - Foundation").
  //
  // NOTE for docs authors: MDX here is CommonMark + JSX — **no GFM**. Markdown pipe tables
  // render as running text; write them as HTML `<table>`.
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|svelte)'],
  addons: ['@storybook/addon-svelte-csf', '@storybook/addon-docs', '@storybook/addon-a11y'],
  framework: {
    name: '@storybook/svelte-vite',
    options: {},
  },
};

export default config;
