<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Stack from '../layout/Stack.svelte';
  import Card from './Card.svelte';
  import Switch from './Switch.svelte';

  const { Story } = defineMeta({
    title: 'Atoms/Switch',
    component: Switch,
    tags: ['autodocs'],
    args: {
      label: 'E-mail notifications',
      description: 'A daily summary of new activity.',
      checked: true,
      size: 'md',
      tone: 'accent',
    },
    argTypes: {
      size: { control: 'inline-radio', options: ['sm', 'md'] },
      tone: { control: 'inline-radio', options: ['accent', 'ok'] },
    },
  });
</script>

<!-- The knob is the only part that springs: it is small, so a little overshoot feels lively
without making the row wobble (big things in this library never overshoot). Press and hold —
the knob stretches towards where it is going, like a gummy. The knob stays white in both themes,
lit from above, so it reads as a physical part. -->
<Story name="Playground" />

<!-- A settings panel: switches apply immediately, so there is no Save button. -->
<Story name="Settings panel" asChild>
  <Card title="Notifications" gap="md" style="max-width: 26rem">
    <Switch label="Push notifications" description="On this device only." checked />
    <Switch label="Weekly digest" description="Every Monday at 8:00." />
    <Switch label="Live updates" tone="ok" checked />
    <Switch label="SMS alerts" description="Needs a verified number." disabled />
  </Card>
</Story>

<!-- `sm` for dense lists and toolbars; without a label pass `aria-label`. -->
<Story name="Sizes" asChild>
  <Stack gap="sm">
    <Switch size="sm" label="Compact" checked />
    <Switch label="Default" checked />
    <Switch aria-label="Wi-Fi" checked />
  </Stack>
</Story>
