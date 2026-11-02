import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'BonbonUI',
    colorPrimary: '#5a9854',
    colorSecondary: '#5a9854',
    appBorderRadius: 12,
    inputBorderRadius: 10,
  }),
  sidebar: { showRoots: true },
});
