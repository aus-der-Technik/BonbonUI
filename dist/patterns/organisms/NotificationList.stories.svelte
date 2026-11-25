<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import NotificationList from './NotificationList.svelte';
  import Popover from '../molecules/Popover.svelte';
  import Layer from '../layout/Layer.svelte';
  import { NOW, notifications } from '../../demo/mock-collab';

  const { Story } = defineMeta({
    title: 'Organisms/NotificationList',
    component: NotificationList,
    tags: ['autodocs'],
    args: { items: notifications(), now: NOW },
  });
</script>

<script lang="ts">
  let items = $state(notifications());
  const unread = $derived(items.filter((i) => i.unread).length);
</script>

<!-- Mentions show the person, other events a candy icon tile; unread items are tinted with a
dot. -->
<Story name="On a panel" asChild>
  <Layer level="panel" padding="sm" style="max-width:24rem">
    <NotificationList bind:items now={NOW} onopen={() => {}} />
  </Layer>
</Story>

<!-- Behind a bell in a popover. -->
<Story name="In a popover" asChild>
  <Popover
    label={unread ? `Notifications (${unread} unread)` : 'Notifications'}
    icon="bell"
    variant="glass"
    iconOnly
    width="22rem"
    padding="sm"
  >
    <NotificationList bind:items now={NOW} onopen={() => {}} />
  </Popover>
</Story>

<Story name="Empty" args={{ items: [] }} />
