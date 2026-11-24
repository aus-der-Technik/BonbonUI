<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Row from '../layout/Row.svelte';
  import Stack from '../layout/Stack.svelte';
  import Card from './Card.svelte';
  import Skeleton from './Skeleton.svelte';

  const { Story } = defineMeta({
    title: 'Atoms/Skeleton',
    component: Skeleton,
    tags: ['autodocs'],
    args: { shape: 'text', lines: 3 },
    argTypes: { shape: { control: 'inline-radio', options: ['text', 'rect', 'circle'] } },
  });
</script>

<!-- Calm on purpose: one soft band of light glides across the placeholder, eased at both ends,
instead of a flashing pulse. With reduced motion it stands still. -->
<Story name="Playground" />

<!-- A placeholder in the shape of the real content keeps the layout from jumping. -->
<Story name="Loading card" asChild>
  <Card gap="md" style="max-width: 26rem">
    <Row gap="sm">
      <Skeleton shape="circle" width="40px" />
      <Stack gap="xs" grow><Skeleton width="45%" /><Skeleton width="25%" /></Stack>
    </Row>
    <Skeleton lines={3} />
    <Skeleton shape="rect" height="8rem" />
  </Card>
</Story>
