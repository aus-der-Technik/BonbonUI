import type { Preview } from '@storybook/svelte';

// Tokens + page base (body background and the tint blobs the glass surfaces refract), so every
// story renders on the same backdrop as a real app.
import '../src/lib/styles/index.css';
import './docs.css';
import { TINTS } from '../src/lib/foundations/tints';

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
    wiggle: {
      description: 'How much a press moves the page (Application wiggle)',
      toolbar: {
        title: 'Wiggle',
        icon: 'transfer',
        items: [
          { value: '0', title: 'Still' },
          { value: '0.03', title: 'Whisper (default)' },
          { value: '0.3', title: 'Gentle' },
          { value: '0.8', title: 'Playful' },
          { value: '1', title: 'Wild' },
        ],
        dynamicTitle: true,
      },
    },
    shine: {
      description: 'How much light what is on gives (Application shine)',
      toolbar: {
        title: 'Shine',
        icon: 'lightning',
        items: [
          { value: '0', title: 'No light' },
          { value: '0.2', title: 'Dim' },
          { value: '0.6', title: 'Bright (default)' },
          { value: '0.8', title: 'Brighter' },
          { value: '1', title: 'Full' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'auto',
    tint: 'default',
    radius: '1',
    density: '1',
    wiggle: '0.03',
    shine: '0.6',
  },
  decorators: [
    // The tokens read `<html data-theme>` and `--tint`; an <Application tint> inside a story
    // still overrides the toolbar for its own subtree.
    (story, context) => {
      const root = document.documentElement;
      const { theme, tint, radius, density, wiggle, shine } = context.globals as Record<
        string,
        string
      >;
      if (theme === 'light' || theme === 'dark') root.dataset['theme'] = theme;
      else delete root.dataset['theme'];
      if (tint && tint !== 'default') root.style.setProperty('--tint', tint);
      else root.style.removeProperty('--tint');
      root.style.setProperty('--radius-scale', radius ?? '1');
      root.style.setProperty('--density', density ?? '1');
      root.style.setProperty('--wiggle', wiggle ?? '0.03');
      root.style.setProperty('--shine', shine ?? '0.6');
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
            'Light',
            'Colour & tint',
            'Layout',
            'Recipes',
            'Design tokens',
            'Conventions',
          ],
          'Explore',
          ['Component catalogue', 'Motion & light lab', 'Token playground'],
          'Design study',
          [
            'Overview',
            'Function first',
            'Friendly, always',
            'Act where you look',
            'Cause and effect',
            'Perception and laws',
            'Element by element',
            'Corrections',
            'The examples',
          ],
          'Pages',
          [
            'Website',
            'Shop',
            'Business',
            'Enterprise',
            'Admin',
            'Collaboration',
            'Productivity',
            'Programming',
            'Data',
            'Private',
            'Fun',
            'Gaming',
            'Maritime',
            'Devices',
            'Desktop',
          ],
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
