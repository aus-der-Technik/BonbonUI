<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Dialog from './Dialog.svelte';
  import FeedbackDialog from './FeedbackDialog.svelte';
  import Toaster from './Toaster.svelte';
  import FloatingActions from './FloatingActions.svelte';
  import Button from '../atoms/Button.svelte';
  import Card from '../atoms/Card.svelte';
  import Badge from '../atoms/Badge.svelte';
  import Row from '../layout/Row.svelte';
  import Stack from '../layout/Stack.svelte';
  import Spacer from '../layout/Spacer.svelte';
  import { ToastQueue } from '../../utils/toasts.svelte';

  const { Story } = defineMeta({
    title: 'Organisms/Dialogs & overlays',
    component: Dialog,
    tags: ['autodocs'],
    parameters: { layout: 'padded' },
  });

  const orders = Array.from({ length: 14 }, (_, i) => ({
    id: `#${10421 + i}`,
    customer: ['Ada Example', 'Grace Example', 'Linus Example', 'Alan Example'][i % 4]!,
    total: `€${(39 + i * 17.5).toFixed(2)}`,
  }));
</script>

<script lang="ts">
  let dialogOpen = $state(false);
  let feedbackOpen = $state(false);
  let failingOpen = $state(false);
  let selected = $state(3);
  let dialogTrigger = $state<HTMLElement>();
  let feedbackTrigger = $state<HTMLElement>();
  let removed = $state(0);
  const toasts = new ToastQueue();
  const topToasts = new ToastQueue();
  let n = 0;
</script>

<!-- A modal of liquid glass over a dimmed, blurred page (big surfaces never overshoot); a bottom
     sheet on phones. Given the button that opened it as `origin`, it grows out of that button
     and shrinks back into it, so you see what caused it. Escape, the close button and a click
     on the backdrop close it, like every overlay. Put the safe action left, the destructive one
     right. -->
<Story name="Dialog" asChild>
  <span bind:this={dialogTrigger} style="display:inline-block">
    <Button label="Switch data set" onclick={() => (dialogOpen = true)} />
  </span>
  <Dialog
    open={dialogOpen}
    origin={dialogTrigger}
    title="Discard changes?"
    intro="Three cells have not been saved yet."
    onclose={() => (dialogOpen = false)}
  >
    <p>They will be lost if you switch to another data set now.</p>
    {#snippet actions()}
      <Button label="Keep editing" onclick={() => (dialogOpen = false)} />
      <Button variant="danger-solid" label="Discard" onclick={() => (dialogOpen = false)} />
    {/snippet}
  </Dialog>
</Story>

<!-- Thumbs or stars plus a comment. Sends after 700 ms; the thank-you tick draws itself in with a
     few sprinkles, then the dialog closes itself. -->
<Story name="FeedbackDialog" asChild>
  <span bind:this={feedbackTrigger} style="display:inline-block">
    <Button
      variant="glass"
      shape="pill"
      size="lg"
      icon="message-plus"
      label="Give feedback"
      onclick={() => (feedbackOpen = true)}
    />
  </span>
  <FeedbackDialog
    open={feedbackOpen}
    origin={feedbackTrigger}
    title="How was this page?"
    onclose={() => (feedbackOpen = false)}
    onsubmit={() => new Promise((resolve) => setTimeout(resolve, 700))}
  />
</Story>

<!-- A rejected `onsubmit` shows its message inside the dialog and keeps the draft for a retry. -->
<Story name="FeedbackDialog failing" asChild>
  <Button label="Give feedback" onclick={() => (failingOpen = true)} />
  <FeedbackDialog
    open={failingOpen}
    onclose={() => (failingOpen = false)}
    onsubmit={() => Promise.reject(new Error('Too many requests — try again in a minute.'))}
  />
</Story>

<!-- A corner is far from where you act, so toasts carry two kinds of news: what happened in the
     background (a sync, a teammate), and the outcome of an action whose control is gone — then
     with a way back ("Undo"). Feedback for a button still on screen belongs at that button.
     Toasts float bottom-right by default, slide in from their edge and glide aside as others
     leave; the countdown pauses while the pointer or focus is on them, and errors stay until
     dismissed. -->
<Story name="Toaster" asChild>
  <Row>
    <Button
      variant="danger"
      icon="trash"
      label="Delete order #{10421 + removed}"
      onclick={() => {
        const order = 10421 + removed++;
        toasts.push(`Order #${order} deleted`, 'ok', {
          action: { label: 'Undo', onaction: () => removed-- },
        });
      }}
    />
    <Button
      label="Background sync"
      onclick={() => toasts.push(`Reloaded: ${++n} orders changed meanwhile`, 'warn')}
    />
    <Button
      variant="danger"
      label="Error"
      onclick={() => toasts.push('Could not save: someone else edited this order', 'error')}
    />
  </Row>
  <Toaster queue={toasts} />
</Story>

<!-- `placement="top-center"`: for apps whose bottom edge is busy (a dock, a composer). -->
<Story name="Toaster at the top" asChild>
  <Button label="Copy link" icon="link" onclick={() => topToasts.push('Link copied')} />
  <Toaster queue={topToasts} placement="top-center" />
</Story>

<!-- A front-layer element, so it is sticky, not fixed: it rides along the bottom of the viewport
     while the list scrolls and settles after the last card. Scroll the canvas to see it. -->
<Story name="FloatingActions" asChild>
  <Stack gap="sm">
    {#each orders as order (order.id)}
      <Card padding="sm">
        <Row>
          <strong>{order.id}</strong>
          <span>{order.customer}</span>
          <Spacer />
          <span>{order.total}</span>
        </Row>
      </Card>
    {/each}
    <FloatingActions label="Order actions">
      <Button variant="glass" shape="pill" size="xl" icon="download" label="Export" />
      <Button variant="success" shape="pill" size="xl" icon="plus" label="New order" />
    </FloatingActions>
  </Stack>
</Story>

<!-- `bar` puts the actions on one liquid-glass pill — a bulk-action bar for a selection, here
     centred with `align="center"`. -->
<Story name="FloatingActions as a bulk-action bar" asChild>
  <Stack gap="sm">
    {#each orders.slice(0, 10) as order, i (order.id)}
      <Card padding="sm">
        <Row>
          <strong>{order.id}</strong>
          <span>{order.customer}</span>
          <Spacer />
          {#if i < selected}<Badge tone="accent" size="sm" label="Selected" />{/if}
        </Row>
      </Card>
    {/each}
    {#if selected}
      <FloatingActions bar align="center" label="Selection">
        <Badge tone="accent" size="lg" label="{selected} selected" />
        <Button variant="ghost" shape="pill" label="Clear" onclick={() => (selected = 0)} />
        <Button variant="secondary" shape="pill" icon="download" label="Export" />
        <Button variant="danger" shape="pill" icon="trash" label="Delete" />
      </FloatingActions>
    {:else}
      <Row justify="center">
        <Button label="Select three" onclick={() => (selected = 3)} />
      </Row>
    {/if}
  </Stack>
</Story>
