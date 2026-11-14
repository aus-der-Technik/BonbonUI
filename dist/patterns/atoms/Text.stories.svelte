<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Grid from '../layout/Grid.svelte';
  import Stack from '../layout/Stack.svelte';
  import Card from './Card.svelte';
  import Text from './Text.svelte';

  const { Story } = defineMeta({
    title: 'Atoms/Text',
    component: Text,
    tags: ['autodocs'],
    args: {
      text: 'The quick brown fox jumps over the lazy dog.',
      size: 'base',
      tone: 'default',
      as: 'p',
    },
    argTypes: {
      size: {
        control: 'select',
        options: ['xs', 'sm', 'md', 'base', 'lg', 'xl', '2xl', '3xl', 'display'],
      },
      tone: {
        control: 'select',
        options: [
          'default',
          'muted',
          'subtle',
          'accent',
          'danger',
          'ok',
          'warn',
          'info',
          'inherit',
        ],
      },
      weight: { control: 'select', options: [undefined, 'regular', 'medium', 'semibold', 'bold'] },
    },
  });

  const sizes = ['xs', 'sm', 'md', 'base', 'lg', 'xl', '2xl', '3xl', 'display'] as const;
</script>

<!-- Good typography is the default: 1.5 line height, no lone last word (`text-wrap: pretty`),
tighter tracking as sizes grow, and paragraphs (`as="p"`) stop at about 70 characters per line
because longer lines are tiring to read. `measure={false}` lets a paragraph run full width. -->
<Story name="Playground" />

<!-- The whole scale. Pick by role, not by pixel: `base` for body copy, `sm` for secondary lines,
`xs` for meta. -->
<Story name="Scale" asChild>
  <Stack gap="sm">
    {#each sizes as size (size)}<Text {size} truncate
        >{size} — Every page uses the same type scale</Text
      >{/each}
  </Stack>
</Story>

<!-- Role colours: `muted` for secondary text, `subtle` for meta, status tones for results. -->
<Story name="Tones" asChild>
  <Stack gap="xs">
    <Text>Default — the main text</Text>
    <Text tone="muted">Muted — a description under a title</Text>
    <Text tone="subtle" size="sm">Subtle — last edited 3 minutes ago</Text>
    <Text tone="accent" weight="semibold">Accent — follows the tint</Text>
    <Text tone="ok">Ok — payment received</Text>
    <Text tone="warn">Warn — the trial ends in 3 days</Text>
    <Text tone="danger">Danger — the upload failed</Text>
  </Stack>
</Story>

<!-- `numeric` uses tabular figures, so amounts in a column line up. -->
<Story name="Numbers" asChild>
  <Card gap="xs" style="max-width: 16rem">
    <Text caps tone="subtle">Revenue</Text>
    <Text size="3xl" weight="bold" numeric>48.210 €</Text>
    <Text size="sm" tone="ok" numeric>+12,4 % vs. last month</Text>
  </Card>
</Story>

<!-- `truncate` cuts to one line; `truncate={2}` to two. -->
<Story name="Truncation" asChild>
  <Grid columns={2} min="12rem">
    <Card gap="xs">
      <Text weight="semibold" truncate
        >A very long document title that does not fit into the card</Text
      >
      <Text size="sm" tone="muted" truncate={2}>
        The description is clamped to two lines with an ellipsis, so every card in the grid keeps
        the same height no matter how much text it holds.
      </Text>
    </Card>
  </Grid>
</Story>
