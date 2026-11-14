<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Card from './Card.svelte';
  import LoadingBar from './LoadingBar.svelte';
  import Text from './Text.svelte';

  const { Story } = defineMeta({
    title: 'Atoms/LoadingBar',
    component: LoadingBar,
    tags: ['autodocs'],
    args: { active: true },
  });
</script>

<!-- A short candy pill (tint to its sister hue) glides along a faint tint track and eases at
both ends, so it reads as something travelling rather than an endless stripe. With reduced
motion it becomes a still, half-strength bar. -->
<Story name="Playground" />

<!-- Under a card header while its rows reload. -->
<Story name="In a card" asChild>
  <Card padding="none" style="max-width: 28rem; overflow: hidden">
    <LoadingBar />
    <Card surface="subtle" padding="md"><Text tone="muted">Reloading 240 rows…</Text></Card>
  </Card>
</Story>
