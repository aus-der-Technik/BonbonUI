<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Grid from '../layout/Grid.svelte';
  import Row from '../layout/Row.svelte';
  import Badge from './Badge.svelte';
  import Button from './Button.svelte';
  import Card from './Card.svelte';
  import Heading from './Heading.svelte';
  import Price from './Price.svelte';
  import Text from './Text.svelte';

  const { Story } = defineMeta({
    title: 'Atoms/Card',
    component: Card,
    tags: ['autodocs'],
    args: { surface: 'glass', padding: 'md', gap: 'sm' },
    argTypes: {
      surface: { control: 'inline-radio', options: ['glass', 'frosted', 'subtle'] },
      padding: { control: 'inline-radio', options: ['none', 'sm', 'md', 'lg'] },
      gap: { control: 'select', options: [undefined, 'none', 'xs', 'sm', 'md', 'lg'] },
    },
  });
</script>

<script lang="ts">
  let plan = $state('team');
  const plans = [
    { id: 'solo', name: 'Solo', price: 0, note: 'For trying things out' },
    { id: 'team', name: 'Team', price: 12, note: 'Up to 20 seats' },
    { id: 'org', name: 'Organisation', price: 29, note: 'SSO and audit log' },
  ];
</script>

<Story name="Playground">
  {#snippet template(args)}
    <Card {...args}>
      <Heading level={3} size="lg">Weekly report</Heading>
      <Text tone="muted">1.284 new sign-ups · 12 % more than last week</Text>
    </Card>
  {/snippet}
</Story>

<!-- The three surfaces. `glass` is the panel layer; `frosted` the denser liquid glass; `subtle` a
flat box inside another card. -->
<Story name="Surfaces" asChild>
  <Grid min="14rem">
    <Card gap="xs">
      <Heading level={3} size="base">Glass</Heading>
      <Text size="sm" tone="muted">The content card every section sits on.</Text>
    </Card>
    <Card surface="frosted" gap="xs">
      <Heading level={3} size="base">Frosted</Heading>
      <Text size="sm" tone="muted">Sign-in card, chooser tiles, dialogs.</Text>
    </Card>
    <Card surface="subtle" gap="xs">
      <Heading level={3} size="base">Subtle</Heading>
      <Text size="sm" tone="muted">A quiet box inside a card.</Text>
    </Card>
  </Grid>
</Story>

<!-- A header row without wrappers: caps title, muted count, actions on the right. -->
<Story name="Header and actions" asChild>
  <Card title="Open orders" count="1.284" gap="sm">
    {#snippet actions()}
      <Button size="sm" icon="filter" label="Filter" />
      <Button size="sm" variant="tinted" icon="plus" label="New" />
    {/snippet}
    <Text tone="muted">Orders that are paid but not yet shipped.</Text>
  </Card>
</Story>

<!-- Clickable cards with `onclick` lift a little on hover and work with Enter and Space. Cards are
big, so they ease and press with only a hint (99%) — a gummy squish at this size would look like
a wobble. `selected` marks the chosen one with tinted glass. Click a plan. -->
<Story name="Selectable cards" asChild>
  <Grid min="12rem">
    {#each plans as p (p.id)}
      <Card gap="sm" selected={plan === p.id} onclick={() => (plan = p.id)}>
        <Row justify="between">
          <Heading level={3} size="lg">{p.name}</Heading>
          {#if plan === p.id}<Badge tone="accent" icon="check" label="Selected" />{/if}
        </Row>
        <Price amount={p.price} unit="/ month" freeLabel="Free" size="lg" />
        <Text size="sm" tone="muted">{p.note}</Text>
      </Card>
    {/each}
  </Grid>
</Story>

<!-- With `href` the whole card is a link. -->
<Story name="Link card" asChild>
  <Grid min="14rem">
    <Card href="#" gap="xs">
      <Heading level={3} size="base">Getting started</Heading>
      <Text size="sm" tone="muted">Set up your workspace in five minutes.</Text>
    </Card>
    <Card href="#" gap="xs">
      <Heading level={3} size="base">Invite your team</Heading>
      <Text size="sm" tone="muted">Share projects and work together.</Text>
    </Card>
  </Grid>
</Story>

<!-- `accent` draws a tint stripe on the left edge, e.g. for a pinned note. -->
<Story name="Accent stripe" asChild>
  <Card accent padding="lg" gap="xs">
    <Heading level={3} size="base">Pinned</Heading>
    <Text tone="muted">Maintenance window on Sunday, 02:00–04:00.</Text>
  </Card>
</Story>
