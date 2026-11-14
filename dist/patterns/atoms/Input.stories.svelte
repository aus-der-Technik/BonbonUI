<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Stack from '../layout/Stack.svelte';
  import Input from './Input.svelte';

  const { Story } = defineMeta({
    title: 'Atoms/Input',
    component: Input,
    tags: ['autodocs'],
    args: { placeholder: 'name@example.com', type: 'email', size: 'md' },
    argTypes: { size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] } },
  });
</script>

<Story name="Playground" />

<!-- For a labelled field with hint and error text, wrap it in a FormField. -->
<Story name="Sizes" asChild>
  <Stack gap="sm" style="max-width: 24rem">
    <Input size="sm" placeholder="Small" aria-label="Small" />
    <Input placeholder="Medium" aria-label="Medium" />
    <Input size="lg" placeholder="Large" aria-label="Large" />
  </Stack>
</Story>

<!-- `invalid` paints the rim red, sets `aria-invalid` and gives one small, polite head-shake when
the value turns invalid — a "nope" you notice, never for system errors. Pair it with a message
(FormField) so colour is not the only signal. -->
<Story name="Invalid" args={{ invalid: true, value: 'not-an-email', 'aria-label': 'E-mail' }} />

<Story
  name="Disabled"
  args={{ disabled: true, value: 'jane.doe@example.com', 'aria-label': 'E-mail' }}
/>
