<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Row from '../layout/Row.svelte';
  import Stack from '../layout/Stack.svelte';
  import Button from './Button.svelte';
  import Divider from './Divider.svelte';
  import Text from './Text.svelte';

  const { Story } = defineMeta({
    title: 'Atoms/Divider',
    component: Divider,
    tags: ['autodocs'],
    args: { orientation: 'horizontal', spacing: 'md' },
    argTypes: { spacing: { control: 'inline-radio', options: ['none', 'sm', 'md'] } },
  });
</script>

<!-- A labelled divider between two ways of signing in. In a Stack, `spacing="none"` leaves the
spacing to the stack's gap. -->
<Story name="Labelled" asChild>
  <Stack gap="sm" style="max-width: 22rem">
    <Button variant="primary" block label="Continue with e-mail" />
    <Divider label="or" spacing="none" />
    <Button block icon="key" label="Use a passkey" />
  </Stack>
</Story>

<!-- A vertical hairline between items of a row. -->
<Story name="Vertical" asChild>
  <Row gap="md">
    <Text tone="muted">12 items</Text>
    <Divider orientation="vertical" />
    <Text tone="muted">3 selected</Text>
    <Divider orientation="vertical" />
    <Text tone="muted">Updated 2 min ago</Text>
  </Row>
</Story>
