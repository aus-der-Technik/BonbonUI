<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Section from './Section.svelte';
  import Button from '../atoms/Button.svelte';
  import Demo from '../../foundations/DemoBox.svelte';

  const { Story } = defineMeta({
    title: 'Layout/Section',
    component: Section,
    tags: ['autodocs'],
    args: {
      title: 'Members',
      description: 'Everyone who can sign in to this workspace.',
    },
  });
</script>

<!-- Title, description and actions in one consistent heading; children stacked below. -->
<Story name="Default">
  {#snippet template(args)}
    <Section {...args}>
      {#snippet actions()}<Button size="sm" icon="user-plus" label="Invite" />{/snippet}
      <Demo label="Content" tall />
    </Section>
  {/snippet}
</Story>

<!-- `layout="grid"` lays the children out in responsive columns. -->
<Story name="Grid layout" asChild>
  <Section title="Plans" eyebrow="Pricing" layout="grid" min="12rem">
    <Demo label="Free" tall /><Demo label="Team" tall /><Demo label="Business" tall />
  </Section>
</Story>

<!-- `level="panel"` turns the whole section into a glass card. -->
<Story name="As a panel" asChild>
  <Section title="Danger zone" description="These actions cannot be undone." level="panel">
    <Button variant="danger" icon="trash" label="Delete workspace" />
  </Section>
</Story>

<!-- `size="hero"` and `align="center"` for the opening of a website or a welcome screen. -->
<Story name="Hero" asChild>
  <Section
    size="hero"
    align="center"
    eyebrow="New"
    title="Build calm interfaces, fast"
    description="One tint, four layers and auto layout — the rest follows."
    layout="row"
  >
    <Button variant="primary" size="lg" shape="pill" label="Get started" />
    <Button size="lg" shape="pill" label="Read the docs" />
  </Section>
</Story>
