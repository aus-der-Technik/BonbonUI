<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Grid from '../layout/Grid.svelte';
  import Layer from '../layout/Layer.svelte';
  import Row from '../layout/Row.svelte';
  import AppIcon from './AppIcon.svelte';
  import type { IconName } from './icons';
  import { iconNames } from './icons';
  import { paletteColors, type PaletteColor } from './palette';

  const { Story } = defineMeta({
    title: 'Atoms/AppIcon',
    component: AppIcon,
    tags: ['autodocs'],
    args: { label: 'Mail', icon: 'mail', color: 'blue', size: 'lg', badge: 3 },
    argTypes: {
      color: { control: 'select', options: [...paletteColors, 'accent', 'glass'] },
      size: { control: 'inline-radio', options: ['sm', 'md', 'lg', 'xl'] },
      icon: { control: 'select', options: iconNames },
    },
  });

  const apps: { label: string; icon: IconName; color: PaletteColor; badge?: number }[] = [
    { label: 'Mail', icon: 'mail', color: 'blue', badge: 12 },
    { label: 'Calendar', icon: 'calendar', color: 'orange' },
    { label: 'Photos', icon: 'image', color: 'pink' },
    { label: 'Music', icon: 'music', color: 'purple' },
    { label: 'Messages', icon: 'chat', color: 'mint', badge: 3 },
    { label: 'Files', icon: 'folder', color: 'cyan' },
    { label: 'Notes', icon: 'file-text', color: 'yellow' },
    { label: 'Store', icon: 'bag', color: 'indigo' },
    { label: 'Settings', icon: 'settings', color: 'gray' },
    { label: 'Weather', icon: 'weather', color: 'teal' },
    { label: 'Books', icon: 'book', color: 'brown' },
    { label: 'Tasks', icon: 'check-square', color: 'green' },
  ];
</script>

<script lang="ts">
  let open = $state('Mail');
</script>

<!-- The bonbon icon is our own shape, not a phone icon: a rounder corner (30% of the size, and it
follows the Application's `radius` setting), a soft glow on the top half because the light in
this library always comes from above, and a thin sugar-glass rim that is bright at the top edge.
Hover lifts it; pressing squishes it like a gummy. -->
<Story name="Playground" />

<!-- A home screen: icons with captions in a responsive grid. -->
<Story name="Home screen" asChild>
  <Grid min="5.5rem" gap="lg">
    {#each apps as app (app.label)}
      <AppIcon {...app} size="lg" caption onclick={() => {}} />
    {/each}
  </Grid>
</Story>

<!-- A dock on the front layer (sticky at the bottom). `running` marks open apps with a short tint
bar — a bar rather than a dot, so "open" is readable at a glance; the active one gets the tint
rim and glow every selected thing wears. Click an icon. -->
<Story name="Dock" asChild>
  <Layer
    level="front"
    edge="bottom"
    direction="horizontal"
    shape="card"
    gap="sm"
    style="width: max-content; margin-inline: auto"
  >
    {#each apps.slice(0, 7) as app (app.label)}
      <AppIcon
        {...app}
        running={app.label === open || app.label === 'Calendar'}
        active={app.label === open}
        onclick={() => (open = app.label)}
      />
    {/each}
  </Layer>
</Story>

<!-- `accent` follows the tint; `glass` is frosted with an accent glyph. -->
<Story name="Accent and glass" asChild>
  <Row gap="md">
    <AppIcon label="Dashboard" icon="chart" color="accent" size="lg" />
    <AppIcon label="Search" icon="search" color="glass" size="lg" />
    <AppIcon label="Spaces" color="purple" size="lg" />
  </Row>
</Story>

<Story name="Sizes" asChild>
  <Row gap="md">
    <AppIcon label="Mail" icon="mail" size="sm" badge={2} />
    <AppIcon label="Mail" icon="mail" size="md" badge={2} />
    <AppIcon label="Mail" icon="mail" size="lg" badge={24} />
    <AppIcon label="Mail" icon="mail" size="xl" badge={240} />
  </Row>
</Story>
