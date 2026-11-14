<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Stack from '../layout/Stack.svelte';
  import StatusText from './StatusText.svelte';

  const { Story } = defineMeta({
    title: 'Atoms/StatusText',
    component: StatusText,
    tags: ['autodocs'],
    args: { message: 'Saved.', tone: 'ok' },
    argTypes: { tone: { control: 'inline-radio', options: ['muted', 'ok', 'warn', 'error'] } },
  });
</script>

<Story name="Playground" />

<!-- One live line next to a form; errors are announced assertively. -->
<Story name="Tones" asChild>
  <Stack gap="xs">
    <StatusText busy message="Streaming…" />
    <StatusText message="1.284 characters" />
    <StatusText tone="ok" message="Done." />
    <StatusText tone="warn" message="Cache cleared, answers are fresh" />
    <StatusText tone="error" message="Connection closed before the answer finished" />
  </Stack>
</Story>
