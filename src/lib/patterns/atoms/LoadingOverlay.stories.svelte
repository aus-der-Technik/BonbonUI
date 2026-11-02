<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Card from './Card.svelte';
  import LoadingOverlay from './LoadingOverlay.svelte';
  import Text from './Text.svelte';

  const { Story } = defineMeta({
    title: 'Atoms/LoadingOverlay',
    component: LoadingOverlay,
    tags: ['autodocs'],
  });
</script>

<!-- The previous content stays visible underneath while the new one loads. The parent needs
`position: relative` (a Card has it once you set it). -->
<Story name="Over a card" asChild>
  <Card style="position: relative; min-height: 9rem; max-width: 28rem" gap="xs">
    <Text weight="semibold">Quarterly summary</Text>
    <Text tone="muted"
      >Revenue grew in every region, led by online orders and repeat customers.</Text
    >
    <LoadingOverlay label="Translating…" />
  </Card>
</Story>
