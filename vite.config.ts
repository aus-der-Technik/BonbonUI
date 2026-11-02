import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// One config drives Storybook's Vite builder and the Vitest run. The library itself is
// packaged by `svelte-package` (see package.json), not bundled by Vite.
export default defineConfig({
  plugins: [svelte()],

  // Under Vitest, resolve `svelte`'s browser (client) entry so `mount()` and the client
  // runtime are used instead of the SSR build.
  ...(process.env.VITEST ? { resolve: { conditions: ['browser'] } } : {}),

  test: {
    environment: 'happy-dom',
    // Tests live next to the code they test (`src/**/*.test.ts`).
    include: ['src/**/*.test.ts'],
    globals: true,
    coverage: {
      provider: 'v8',
      include: ['src/lib/**/*.{ts,svelte}'],
      // Stories, the Storybook-only foundations and demo pages, and the test helpers are
      // scaffolding, not shipped runtime code. MapView needs a real Leaflet canvas and a
      // tile server, so it is exercised in Storybook rather than in happy-dom.
      exclude: [
        'src/**/*.test.ts',
        'src/**/*.test.svelte',
        'src/**/*.stories.*',
        'src/lib/foundations/**',
        'src/lib/demo/**',
        'src/lib/test/**',
        'src/lib/patterns/organisms/MapView.svelte',
        'src/lib/map.ts',
        'src/**/*.d.ts',
      ],
      // Coding standard: 80% coverage for new/modified code (all four metrics).
      thresholds: {
        lines: 80,
        functions: 80,
        statements: 80,
        branches: 80,
      },
    },
  },
});
