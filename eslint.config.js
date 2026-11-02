import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import svelte from 'eslint-plugin-svelte';
import storybook from 'eslint-plugin-storybook';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

export default tseslint.config(
  {
    // `temp/` is a scratch area for plans and throwaway sibling projects; not lint scope.
    ignores: [
      'dist',
      'coverage',
      'node_modules',
      '.svelte-kit',
      '.vite',
      'storybook-static',
      'temp',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...svelte.configs['flat/recommended'],
  ...storybook.configs['flat/recommended'],
  prettier,
  ...svelte.configs['flat/prettier'],
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parserOptions: {
        // JS config files live outside the tsconfig project; let them use the inferred
        // default project instead of erroring.
        projectService: {
          allowDefaultProject: ['eslint.config.js', 'svelte.config.js'],
        },
        extraFileExtensions: ['.svelte'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      'no-console': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      // `_`-prefixed names are the established opt-out for args; the same applies to bindings
      // that only exist to drop a key while destructuring.
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', ignoreRestSiblings: true },
      ],
      // A library has no router: links are whatever `href` the consuming app passes in.
      'svelte/no-navigation-without-resolve': 'off',
    },
  },
  {
    // The library must never depend on its own Storybook scaffolding: `src/lib/demo/**` and
    // `src/lib/foundations/**` are excluded from the published package (package.json `files`),
    // so an import from a pattern would ship a broken reference.
    files: ['src/lib/patterns/**', 'src/lib/utils/**', 'src/lib/index.ts', 'src/lib/map.ts'],
    // Stories and tests are not published, so they may share the mocks and test helpers.
    ignores: ['**/*.stories.svelte', '**/*.test.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['**/demo/**', '**/foundations/**', '**/test/**'],
              message:
                'demo/, foundations/ and test/ are Storybook/test-only and not published — do not import them from the library.',
            },
          ],
        },
      ],
    },
  },
  {
    // Svelte components need the Svelte parser, with the TS parser for <script lang="ts">.
    files: ['**/*.svelte', '**/*.svelte.ts'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
        svelteConfig: (await import('./svelte.config.js')).default,
      },
    },
  },
);
