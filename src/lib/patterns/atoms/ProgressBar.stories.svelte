<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Stack from '../layout/Stack.svelte';
  import ProgressBar from './ProgressBar.svelte';

  const { Story } = defineMeta({
    title: 'Atoms/ProgressBar',
    component: ProgressBar,
    tags: ['autodocs'],
    args: { value: 64, max: 100, label: 'Import', showValue: true, tone: 'accent', size: 'md' },
    argTypes: {
      tone: { control: 'inline-radio', options: ['accent', 'ok', 'warn', 'danger', 'info'] },
      size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    },
  });
</script>

<Story name="Playground" />

<!-- Pick the tone by meaning: warn when a quota runs low, danger when it is exceeded. -->
<Story name="Tones" asChild>
  <Stack gap="md" style="max-width: 26rem">
    <ProgressBar value={30} label="Storage used" showValue tone="ok" />
    <ProgressBar value={82} label="API quota" showValue tone="warn" />
    <ProgressBar value={100} label="Seats" showValue tone="danger" valueLabel="20 of 20" />
    <ProgressBar value={3} max={7} label="Steps done" showValue tone="info" valueLabel="3 of 7" />
  </Stack>
</Story>

<Story name="Sizes" asChild>
  <Stack gap="md" style="max-width: 26rem">
    <ProgressBar value={40} label="Small" size="sm" />
    <ProgressBar value={55} label="Medium" />
    <ProgressBar value={70} label="Large" size="lg" />
  </Stack>
</Story>
