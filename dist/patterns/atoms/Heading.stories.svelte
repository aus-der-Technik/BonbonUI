<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Stack from '../layout/Stack.svelte';
  import Heading from './Heading.svelte';

  const { Story } = defineMeta({
    title: 'Atoms/Heading',
    component: Heading,
    tags: ['autodocs'],
    args: {
      level: 1,
      text: 'Dashboard',
      eyebrow: 'Overview',
      subtitle: 'Everything that happened this week',
    },
    argTypes: {
      level: { control: 'inline-radio', options: [1, 2, 3, 4, 5, 6] },
      size: {
        control: 'select',
        options: [undefined, 'xs', 'sm', 'md', 'base', 'lg', 'xl', '2xl', '3xl', 'display'],
      },
      align: { control: 'inline-radio', options: [undefined, 'start', 'center', 'end'] },
    },
  });
</script>

<Story name="Playground" />

<!-- Each level has a default size, so the outline and the look match without thinking. -->
<Story name="Levels" asChild>
  <Stack gap="md">
    <Heading level={1}>Level 1 · display</Heading>
    <Heading level={2}>Level 2 · 3xl</Heading>
    <Heading level={3}>Level 3 · 2xl</Heading>
    <Heading level={4}>Level 4 · xl</Heading>
    <Heading level={5}>Level 5 · lg</Heading>
    <Heading level={6}>Level 6 · base</Heading>
  </Stack>
</Story>

<!-- A hero: eyebrow, title and subtitle without any wrapper markup. -->
<Story name="Hero" asChild>
  <Heading
    level={1}
    align="center"
    eyebrow="New in version 2"
    subtitle="Build dashboards, shops and tools that look right from the first line."
  >
    Interfaces that feel like candy
  </Heading>
</Story>

<!-- `size` decouples the look from the outline: a small `<h2>` for a sidebar section. -->
<Story
  name="Small section heading"
  args={{
    level: 2,
    size: 'xs',
    text: 'Recent projects',
    eyebrow: undefined,
    subtitle: undefined,
    tone: 'subtle',
  }}
/>
