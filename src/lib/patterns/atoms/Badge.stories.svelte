<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Row from '../layout/Row.svelte';
  import Stack from '../layout/Stack.svelte';
  import Badge from './Badge.svelte';
  import { paletteColors } from './palette';

  const { Story } = defineMeta({
    title: 'Atoms/Badge',
    component: Badge,
    tags: ['autodocs'],
    args: { label: 'Online', tone: 'live', size: 'md', variant: 'soft' },
    argTypes: {
      tone: {
        control: 'select',
        options: [
          'neutral',
          'live',
          'ok',
          'locked',
          'draft',
          'warn',
          'danger',
          'info',
          'accent',
          ...paletteColors,
        ],
      },
      variant: { control: 'inline-radio', options: ['soft', 'solid'] },
      size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
      shape: { control: 'inline-radio', options: ['rounded', 'pill'] },
    },
  });
</script>

<!-- Calm candy: soft badges are a light tint with readable ink; solid ones get the same lit top
edge as buttons and a short shadow, but no glow — badges inform, they do not ask for clicks. -->
<Story name="Playground" />

<!-- Status tones: fixed hues, independent of the tint, so "Failed" is always red. -->
<Story name="Status tones" asChild>
  <Row>
    <Badge tone="live" label="Editable" />
    <Badge tone="ok" icon="check" label="Paid" />
    <Badge tone="locked" icon="lock" label="Read-only" />
    <Badge tone="draft" label="Draft" />
    <Badge tone="danger" label="Failed" />
    <Badge tone="info" label="Beta" />
    <Badge tone="accent" label="New" />
  </Row>
</Story>

<!-- The candy palette for categories. `soft` by default, `solid` for more weight. Yellow and
orange get a darker ink than the other hues, because their usual mix is too pale for small
text. -->
<Story name="Palette" asChild>
  <Stack gap="sm">
    <Row>
      {#each paletteColors as color (color)}<Badge tone={color} label={color} />{/each}
    </Row>
    <Row>
      {#each paletteColors as color (color)}<Badge
          tone={color}
          variant="solid"
          label={color}
        />{/each}
    </Row>
  </Stack>
</Story>

<!-- `sm` is the inline meta tag next to a label; `lg` a headline badge. -->
<Story name="Sizes" asChild>
  <Row>
    <Badge size="sm" label="v1.4.2" />
    <Badge tone="accent" variant="solid" label="Pro" />
    <Badge tone="accent" variant="solid" size="lg" icon="sparkles" label="Featured" />
  </Row>
</Story>

<!-- A badge states something, so it is a rounded tag; pills are for things you press. `shape="pill"`
opts back in where a pill is wanted anyway. -->
<Story name="Shape" asChild>
  <Row>
    <Badge tone="ok" label="Rounded (default)" />
    <Badge tone="ok" shape="pill" label="Pill" />
  </Row>
</Story>
