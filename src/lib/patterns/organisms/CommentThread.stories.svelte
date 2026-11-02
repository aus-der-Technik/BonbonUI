<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import CommentThread, { type ThreadComment } from './CommentThread.svelte';
  import Stack from '../layout/Stack.svelte';
  import { NOW, secondThread, threadComments } from '../../demo/mock-collab';

  const { Story } = defineMeta({
    title: 'Organisms/CommentThread',
    component: CommentThread,
    tags: ['autodocs'],
    args: {
      comments: threadComments,
      quote: 'We will open shared boards to every workspace early next year.',
      now: NOW,
    },
  });
</script>

<script lang="ts">
  let comments = $state<ThreadComment[]>([...threadComments]);
  let resolved = $state(false);

  async function reply(text: string) {
    await new Promise((resolve) => setTimeout(resolve, 600));
    comments = [
      ...comments,
      { id: crypto.randomUUID(), author: 'alex.morgan@example.com', time: new Date(), text },
    ];
  }
</script>

<!-- A discussion anchored to a passage: quote, comments with reactions, replies indented. -->
<Story name="Thread" />

<!-- Reply (the box is busy while the promise runs) and resolve; a resolved thread folds to one
line and opens again on click. -->
<Story name="Interactive" asChild>
  <div style="max-width:26rem">
    <CommentThread
      {comments}
      bind:resolved
      quote="We will open shared boards to every workspace early next year."
      onreply={reply}
      onresolve={() => {}}
      active={!resolved}
    />
  </div>
</Story>

<!-- A column of threads in a document margin: the active one sits on the selected layer. -->
<Story name="Margin" asChild>
  <Stack gap="sm" style="max-width:24rem">
    <CommentThread comments={threadComments.slice(0, 2)} now={NOW} active onreply={() => {}} />
    <CommentThread
      comments={secondThread}
      quote="Questions go into the comments"
      resolved
      now={NOW}
      onresolve={() => {}}
    />
  </Stack>
</Story>
