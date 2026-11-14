<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import NotificationBanner from './NotificationBanner.svelte';
  import NotificationCenter, { type OsNotification } from './NotificationCenter.svelte';
  import Button from '../atoms/Button.svelte';
  import Stack from '../layout/Stack.svelte';
  import { laterNotifications } from '../../demo/mock-desktop';

  const { Story } = defineMeta({
    title: 'Organisms/Desktop & OS/Notifications',
    component: NotificationBanner,
    tags: ['autodocs'],
  });
</script>

<script lang="ts">
  let list = $state<OsNotification[]>([]);
  let n = 0;
  function send() {
    const next = laterNotifications[n++ % laterNotifications.length]!;
    list = [{ ...next, id: `${next.id}-${n}` }, ...list];
  }
</script>

<!-- An operating-system banner: app icon, name and time, title, text and actions. Hover for the
     dismiss button (top right, where the time is — it pops in with a small spring).

     Why front-layer glass and the app's candy icon? A banner floats over your work for a few
     seconds; glass keeps what is underneath readable through it, and the icon says who is
     talking before you read a word. Copy stays human: a wink is fine in a hello, never in an
     error. -->
<Story name="Banner" asChild>
  <Stack gap="md">
    <NotificationBanner
      app="Messages"
      icon="chat"
      color="green"
      time="now"
      title="Ana Example"
      body="Lunch at the lake on Friday?"
      onopen={() => {}}
      onclose={() => {}}
      actions={[
        { label: 'Reply', onclick: () => {} },
        { label: 'Mark as read', onclick: () => {} },
      ]}
    />
    <NotificationBanner
      app="Calendar"
      icon="calendar"
      color="red"
      time="09:50"
      title="Design review in 10 minutes"
      body="Room “Lighthouse”"
    />
  </Stack>
</Story>

<!-- NotificationCenter slides banners in at the top right and dismisses them after 5 s
     (paused while hovered — reading is never a race). Banners stack, newest on top, and the
     rest glide up when one leaves, so you always see where it went. -->
<Story name="Notification center" asChild>
  <div style="min-height:20rem">
    <Button variant="primary" icon="bell" label="Send a notification" onclick={send} />
    <NotificationCenter
      notifications={list}
      duration={5000}
      onclose={(id) => (list = list.filter((x) => x.id !== id))}
    />
  </div>
</Story>
