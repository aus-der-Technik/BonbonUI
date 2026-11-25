<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import MarketingStudio from './MarketingStudio.svelte';

  const { Story } = defineMeta({
    title: 'Marketing/Studio',
    component: MarketingStudio,
    tags: ['!autodocs'],
    parameters: { layout: 'fullscreen' },
  });
</script>

<Story name="Buttons" args={{ scene: 'buttons' }} />
<Story name="Soft Keys" args={{ scene: 'soft-keys' }} />
<Story name="Rail" args={{ scene: 'rail' }} />
<Story name="Gauge" args={{ scene: 'gauge' }} />
<Story name="Gauge Photo" args={{ scene: 'gauge-photo' }} />
<Story name="Dot Matrix" args={{ scene: 'dot-matrix' }} />
<Story name="Switches" args={{ scene: 'switches' }} />
<Story name="Segmented" args={{ scene: 'segmented' }} />
<Story name="Kpis" args={{ scene: 'kpis' }} />
<Story name="Chart" args={{ scene: 'chart' }} />
<Story name="Player" args={{ scene: 'player' }} />
<Story name="Glass Bar" args={{ scene: 'glass-bar' }} />
