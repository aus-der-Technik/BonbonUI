import type { Preview } from '@storybook/svelte';

// Tokens + page base (body background and the tint blobs the glass surfaces refract), so every
// story renders on the same backdrop as a real app.
import '../src/lib/styles/index.css';
import './docs.css';

const TINTS = [
  { value: 'default', title: 'Green (default)', right: '#5a9854' },
  { value: '#00a89d', title: 'Mint', right: '#00a89d' },
  { value: '#007aff', title: 'Blue', right: '#007aff' },
  { value: '#5856d6', title: 'Indigo', right: '#5856d6' },
  { value: '#af52de', title: 'Purple', right: '#af52de' },
  { value: '#ff2d55', title: 'Pink', right: '#ff2d55' },
  { value: '#e3000f', title: 'Red', right: '#e3000f' },
  { value: '#ff9500', title: 'Orange', right: '#ff9500' },
  { value: '#5b6170', title: 'Graphite', right: '#5b6170' },
];

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Colour scheme',
      toolbar: {
        title: 'Theme',
        icon: 'mirror',
        items: [
          { value: 'auto', title: 'Follow OS' },
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
    tint: {
      description: 'Tint colour — every accent and the backdrop are computed from it',
      toolbar: { title: 'Tint', icon: 'paintbrush', items: TINTS, dynamicTitle: true },
    },
    radius: {
      description: 'Corner radius scale',
      toolbar: {
        title: 'Radius',
        icon: 'circlehollow',
        items: [
          { value: '0.3', title: 'Square' },
          { value: '1', title: 'Soft (default)' },
          { value: '1.45', title: 'Round' },
        ],
        dynamicTitle: true,
      },
    },
    density: {
      description: 'Control density',
      toolbar: {
        title: 'Density',
        icon: 'component',
        items: [
          { value: '0.86', title: 'Compact' },
          { value: '1', title: 'Default' },
          { value: '1.14', title: 'Comfortable' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: 'auto', tint: 'default', radius: '1', density: '1' },
  decorators: [
    // The tokens read `<html data-theme>` and `--tint`; an <Application tint> inside a story
    // still overrides the toolbar for its own subtree.
    (story, context) => {
      const root = document.documentElement;
      const { theme, tint, radius, density } = context.globals as Record<string, string>;
      if (theme === 'light' || theme === 'dark') root.dataset['theme'] = theme;
      else delete root.dataset['theme'];
      if (tint && tint !== 'default') root.style.setProperty('--tint', tint);
      else root.style.removeProperty('--tint');
      root.style.setProperty('--radius-scale', radius ?? '1');
      root.style.setProperty('--density', density ?? '1');
      return story();
    },
  ],
  parameters: {
    controls: {
      matchers: { color: /(background|color|tint)$/i, date: /Date$/i },
    },
    a11y: { test: 'todo' },
    options: {
      storySort: {
        order: [
          'Introduction',
          [
            'Welcome',
            'Design language',
            'Getting started',
            'Layers',
            'Colour & tint',
            'Layout',
            'Recipes',
            'Design tokens',
            'Conventions',
          ],
          'Pages',
          'Templates',
          ['Application', 'Page', '*'],
          'Layout',
          'Organisms',
          'Molecules',
          'Atoms',
        ],
      },
    },
  },
};

export default preview;
