<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Alert from './Alert.svelte';
  import EmptyState from './EmptyState.svelte';
  import Toast from './Toast.svelte';
  import Button from '../atoms/Button.svelte';
  import Card from '../atoms/Card.svelte';
  import Stack from '../layout/Stack.svelte';

  const { Story } = defineMeta({
    title: 'Molecules/Alert & Toast',
    component: Alert,
    tags: ['autodocs'],
    args: { message: 'Orders could not be loaded: 503 Service Unavailable', tone: 'error' },
    argTypes: {
      tone: { control: 'inline-radio', options: ['error', 'warn', 'ok', 'info'] },
      variant: { control: 'inline-radio', options: ['inline', 'card'] },
    },
  });
</script>

<script lang="ts">
  let dismissed = $state(false);
</script>

<!-- The tinted box inside a form or dialog. Errors are announced assertively, the rest
     politely. -->
<Story name="Alert inline" />

<!-- All four tones. Each brings its own icon; `title` adds a bold first line. -->
<Story name="Alert tones" asChild>
  <Stack gap="sm">
    <Alert tone="error" title="Saving failed" message="Someone else changed this row meanwhile." />
    <Alert tone="warn" message="This price list is a draft and not visible in the shop yet." />
    <Alert tone="ok" message="All changes are saved." />
    <Alert tone="info" message="New orders appear automatically." />
  </Stack>
</Story>

<!-- On its own glass card between sections, with a retry action and a close button. -->
<Story name="Alert card with actions" asChild>
  {#if !dismissed}
    <Alert
      variant="card"
      tone="warn"
      title="Stock sync is behind"
      message="The last import from the warehouse ran 3 hours ago."
      ondismiss={() => (dismissed = true)}
    >
      {#snippet actions()}<Button size="sm" icon="refresh" label="Sync now" />{/snippet}
    </Alert>
  {:else}
    <Button label="Show again" onclick={() => (dismissed = false)} />
  {/if}
</Story>

<!-- `strong` tints the whole card, for a failure that blocks the page. -->
<Story
  name="Alert card, strong"
  args={{
    variant: 'card',
    strong: true,
    title: 'The service cannot be reached',
    message: 'We keep retrying in the background.',
  }}
/>

<!-- Short-lived notices on liquid glass. Toaster stacks and times them; here they stand alone. -->
<Story name="Toasts" asChild>
  <Stack gap="sm" align="end">
    <Toast title="Saved. Nice." message="Your changes are live." ondismiss={() => {}} />
    <Toast tone="info"><b>Jane</b> joined the workspace.</Toast>
    <Toast tone="warn" message="Reloaded: 3 rows changed meanwhile" ondismiss={() => {}} />
    <Toast tone="error" title="Could not save" message="409 Conflict" ondismiss={() => {}}>
      {#snippet actions()}<Button size="sm" variant="ghost" label="Retry" />{/snippet}
    </Toast>
  </Stack>
</Story>

<!-- The quiet line when a list or search finds nothing. Empty states may wink; errors never do. -->
<Story name="EmptyState" asChild>
  <EmptyState message="Nothing here — try fewer filters." />
</Story>

<!-- A friendly first-run panel: the icon breathes slowly in a soft tinted circle (an idle moment,
     so a little life is welcome; it holds still with reduced motion), short copy and one primary
     action — no snippet needed. -->
<Story name="EmptyState first run" asChild>
  <Card>
    <EmptyState
      icon="inbox"
      title="No messages yet. Enjoy the quiet."
      message="When customers write to you, their messages land here."
      actionLabel="Write the first one"
      actionIcon="plus"
      onaction={() => {}}
    />
  </Card>
</Story>

<!-- `compact` is a single quiet line for inside cards. -->
<Story name="EmptyState compact" asChild>
  <Card title="Attachments">
    <EmptyState compact icon="file" message="Nothing attached." />
  </Card>
</Story>
