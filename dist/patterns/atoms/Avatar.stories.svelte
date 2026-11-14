<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Row from '../layout/Row.svelte';
  import Avatar from './Avatar.svelte';
  import { paletteColors } from './palette';

  const { Story } = defineMeta({
    title: 'Atoms/Avatar',
    component: Avatar,
    tags: ['autodocs'],
    args: { name: 'jane.doe@example.com', size: 40, color: 'accent' },
    argTypes: {
      color: { control: 'select', options: ['accent', 'auto', ...paletteColors] },
      shape: { control: 'inline-radio', options: ['round', 'square'] },
    },
  });

  // Inline pictures, so the stories need no network.
  const picture =
    'data:image/svg+xml,' +
    encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" fill="#c9d6e8"/><circle cx="24" cy="19" r="9" fill="#7d8fa8"/><ellipse cx="24" cy="44" rx="16" ry="12" fill="#7d8fa8"/></svg>',
    );
  const logo =
    'data:image/svg+xml,' +
    encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 40"><rect x="4" y="8" width="24" height="24" rx="6" fill="#5856d6"/><rect x="34" y="12" width="42" height="6" rx="3" fill="#333"/><rect x="34" y="23" width="30" height="5" rx="2.5" fill="#999"/></svg>',
    );
  const people = [
    'jane.doe@example.com',
    'Max Mustermann',
    'alex.kim@example.com',
    'Sam Rivera',
    'lee.chen@example.com',
    'Robin Park',
  ];
</script>

<Story name="Playground" />

<!-- `color="auto"` gives every person a stable candy colour, so a list is easy to scan. -->
<Story name="Team" asChild>
  <Row gap="xs">
    {#each people as person (person)}<Avatar name={person} color="auto" />{/each}
  </Row>
</Story>

<!-- A picture, a square logo, and a broken picture that falls back to the initials. -->
<Story name="Pictures" asChild>
  <Row>
    <Avatar name="Max Mustermann" size={48} src={picture} />
    <Avatar name="Example Hall" size={48} src={logo} shape="square" />
    <Avatar name="Max Mustermann" size={48} src="https://example.com/missing.jpg" />
  </Row>
</Story>

<Story name="Sizes" asChild>
  <Row>
    <Avatar name="Jane Doe" size={24} />
    <Avatar name="Jane Doe" size={34} />
    <Avatar name="Jane Doe" size={48} />
    <Avatar name="Jane Doe" size={72} />
  </Row>
</Story>
