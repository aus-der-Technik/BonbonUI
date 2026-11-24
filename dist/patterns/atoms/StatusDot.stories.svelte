<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Row from '../layout/Row.svelte';
  import Stack from '../layout/Stack.svelte';
  import Avatar from './Avatar.svelte';
  import Card from './Card.svelte';
  import StatusDot from './StatusDot.svelte';
  import Text from './Text.svelte';
  import { paletteColors } from './palette';

  const { Story } = defineMeta({
    title: 'Atoms/StatusDot',
    component: StatusDot,
    tags: ['autodocs'],
    args: { tone: 'ok', label: 'Operational', pulse: true, size: 'md' },
    argTypes: {
      tone: {
        control: 'select',
        options: ['ok', 'warn', 'danger', 'info', 'neutral', 'accent', ...paletteColors],
      },
      size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    },
  });

  const services = [
    { name: 'API', tone: 'ok', label: 'Operational' },
    { name: 'Search', tone: 'warn', label: 'Degraded' },
    { name: 'Uploads', tone: 'danger', label: 'Outage' },
    { name: 'Billing', tone: 'neutral', label: 'Maintenance' },
  ] as const;
</script>

<!-- A lit bead with a quiet halo, not a neon glow: status should be noticed, not shout. A circle,
because in the shape grammar circles mean state or identity. -->
<Story name="Playground" />

<!-- A status page row per service; `pulse` only on the states that need attention. -->
<Story name="Service health" asChild>
  <Card gap="sm" style="max-width: 24rem">
    {#each services as s (s.name)}
      <Row justify="between">
        <Text weight="medium">{s.name}</Text>
        <StatusDot tone={s.tone} label={s.label} pulse={s.tone === 'danger'} />
      </Row>
    {/each}
  </Card>
</Story>

<!-- Presence next to people. Without a label, `aria-label` says what the dot means. -->
<Story name="Presence" asChild>
  <Stack gap="sm">
    <Row gap="sm"
      ><Avatar name="Jane Doe" color="auto" /><Text>Jane Doe</Text><StatusDot
        tone="ok"
        aria-label="Online"
      /></Row
    >
    <Row gap="sm"
      ><Avatar name="Sam Rivera" color="auto" /><Text>Sam Rivera</Text><StatusDot
        tone="warn"
        aria-label="Away"
      /></Row
    >
    <Row gap="sm"
      ><Avatar name="Robin Park" color="auto" /><Text>Robin Park</Text><StatusDot
        aria-label="Offline"
      /></Row
    >
  </Stack>
</Story>
