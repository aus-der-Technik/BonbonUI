import { addons } from 'storybook/manager-api';
import { create, type ThemeVars } from 'storybook/theming';

// The Storybook frame in BonbonUI's own look: the stone ground, solid panels, the default
// green tint, the system type and soft corners. It follows the OS between light and dark, like
// the pages do with "Follow OS". The manager cannot read the library's CSS variables, so the
// values below mirror tokens.css (ground, panel, text, accent) by hand.

const font = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const mono = 'ui-monospace, SFMono-Regular, Menlo, monospace';

/** The wrapped bonbon (MenuBar's mark) and the word mark, as the sidebar's brand. */
function brand(text: string, body: string, left: string, right: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="168" height="28" viewBox="0 0 168 28">
  <g transform="translate(0 6)">
    <path d="M7.5 8 1.2 2.6Q-.3 8 1.2 13.4Z" fill="${left}"/>
    <path d="M20.5 8l6.3-5.4q1.5 5.4 0 10.8Z" fill="${right}"/>
    <rect x="5.5" y="2.5" width="17" height="11" rx="5.5" fill="${body}"/>
    <path d="M9 5.5h6" stroke="#fff" stroke-opacity=".85" stroke-width="1.6" stroke-linecap="round"/>
  </g>
  <text x="36" y="19.5" font-family="${font.replace(/'/g, '')}" font-size="16" font-weight="650" letter-spacing="-0.2" fill="${text}">BonbonUI</text>
</svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

const shared: Partial<ThemeVars> = {
  brandTitle: 'BonbonUI',
  brandUrl: './',
  brandTarget: '_self',
  fontBase: font,
  fontCode: mono,
  appBorderRadius: 14,
  inputBorderRadius: 10,
};

const light = create({
  ...shared,
  base: 'light',
  brandImage: brand('#1a1a1a', '#5a9854', '#3fa39a', '#a7b860'),
  colorPrimary: '#5a9854',
  colorSecondary: '#5a9854',
  appBg: '#e9eae6',
  appContentBg: '#f3f4f1',
  appPreviewBg: '#e9e9e6',
  appBorderColor: 'rgba(20, 20, 30, 0.08)',
  textColor: '#1a1a1a',
  textMutedColor: '#636363',
  textInverseColor: '#ffffff',
  barBg: '#f3f4f1',
  barTextColor: '#555555',
  barSelectedColor: '#3f6e3b',
  barHoverColor: '#3f6e3b',
  buttonBg: '#ffffff',
  buttonBorder: 'rgba(20, 20, 30, 0.1)',
  booleanBg: '#e2e4df',
  booleanSelectedBg: '#ffffff',
  inputBg: '#ffffff',
  inputBorder: 'rgba(20, 20, 30, 0.16)',
  inputTextColor: '#1a1a1a',
});

const dark = create({
  ...shared,
  base: 'dark',
  brandImage: brand('#f2f2f0', '#5a9854', '#3fa39a', '#a7b860'),
  colorPrimary: '#6fae68',
  colorSecondary: '#6fae68',
  appBg: '#141616',
  appContentBg: '#1b1d1d',
  appPreviewBg: '#121313',
  appBorderColor: 'rgba(255, 255, 255, 0.08)',
  textColor: '#f2f2f0',
  textMutedColor: '#8f8e86',
  textInverseColor: '#141616',
  barBg: '#1b1d1d',
  barTextColor: '#c3c2b7',
  barSelectedColor: '#8fc489',
  barHoverColor: '#8fc489',
  buttonBg: '#232526',
  buttonBorder: 'rgba(255, 255, 255, 0.1)',
  booleanBg: '#232526',
  booleanSelectedBg: '#34373a',
  inputBg: '#232526',
  inputBorder: 'rgba(255, 255, 255, 0.16)',
  inputTextColor: '#f2f2f0',
});

const scheme = window.matchMedia?.('(prefers-color-scheme: dark)');
const pick = () => (scheme?.matches ? dark : light);

addons.setConfig({ theme: pick(), sidebar: { showRoots: true } });
// Switching the OS appearance re-themes the frame without a reload.
scheme?.addEventListener('change', () => addons.setConfig({ theme: pick() }));
