<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Comment from './Comment.svelte';
  import Reactions from './Reactions.svelte';
  import Stack from '../layout/Stack.svelte';
  import { NOW, threadComments } from '../../demo/mock-collab';

  const first = threadComments[0]!;

  const { Story } = defineMeta({
    title: 'Molecules/Comment & Reactions',
    component: Comment,
    tags: ['autodocs'],
    args: {
      author: first.author,
      role: first.role,
      time: first.time,
      text: first.text,
      now: NOW,
      reactions: first.reactions,
    },
  });
</script>

<script lang="ts">
  let reactions = $state([
    { emoji: '👍', count: 4, people: ['Mara Lindqvist', 'Jonas Weber'] },
    { emoji: '🎉', count: 2, mine: true },
    { emoji: '👀', count: 1 },
  ]);
</script>

<Story name="Comment" />

<!-- A short reply: small size, edited, a "Reply" link. -->
<Story
  name="Reply"
  args={{
    author: 'Priya Raman',
    text: 'Fine by me — I will reword the paragraph after lunch.',
    time: new Date(NOW.getTime() - 12 * 60_000),
    size: 'sm',
    edited: true,
    role: undefined,
    reactions: [],
    onreply: () => {},
  }}
/>

<!-- A new message since your last visit. -->
<Story name="Highlighted" args={{ highlight: true, reactions: undefined }} />

<!-- Reactions alone: click to toggle yours, the smiley adds a new one. -->
<Story name="Reactions" asChild>
  <Stack gap="sm">
    <Reactions bind:reactions />
    <Reactions {reactions} readonly size="sm" />
  </Stack>
</Story>
