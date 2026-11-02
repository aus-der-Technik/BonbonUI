<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Stack from './Stack.svelte';
  import Demo from '../../foundations/DemoBox.svelte';

  const { Story } = defineMeta({
    title: 'Layout/Stack',
    component: Stack,
    tags: ['autodocs'],
    argTypes: {
      direction: { control: 'inline-radio', options: ['vertical', 'horizontal'] },
      gap: { control: 'select', options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'] },
      align: { control: 'select', options: ['start', 'center', 'end', 'stretch', 'baseline'] },
      justify: {
        control: 'select',
        options: ['start', 'center', 'end', 'between', 'around', 'evenly'],
      },
      collapse: { control: 'select', options: [undefined, 'sm', 'md', 'lg'] },
    },
    args: { gap: 'md', direction: 'vertical' },
  });
</script>

<!-- Play with direction, gap, align and justify. -->
<Story name="Playground">
  {#snippet template(args)}
    <Stack {...args}><Demo label="One" /><Demo label="Two" /><Demo label="Three" /></Stack>
  {/snippet}
</Story>

<!-- A vertical stack: one gap between every child, no margins. -->
<Story name="Vertical" asChild>
  <Stack gap="lg"><Demo label="Header" /><Demo label="Body" tall /><Demo label="Footer" /></Stack>
</Story>

<!-- Horizontal with `equal`: children share the width; `collapse="md"` stacks them below 720px. -->
<Story name="Equal columns that collapse" asChild>
  <Stack direction="horizontal" gap="md" equal collapse="md">
    <Demo label="Plan A" tall /><Demo label="Plan B" tall /><Demo label="Plan C" tall />
  </Stack>
</Story>
