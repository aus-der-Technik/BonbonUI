<script lang="ts">
  import { Page, SideNav, SegmentedControl, Card, Button } from '../../index';

  let view = $state('all');
  const folders = [
    {
      items: [
        { label: 'Inbox', href: '#inbox', icon: 'inbox' as const, count: 3, active: true },
        { label: 'Sent', href: '#sent', icon: 'send' as const },
        { label: 'Archive', href: '#archive', icon: 'bookmark' as const },
      ],
    },
  ];
  const messages = [
    { id: 1, from: 'ada@example.com', subject: 'Launch notes' },
    { id: 2, from: 'grace@example.com', subject: 'Yearly plan prices' },
    { id: 3, from: 'linus@example.com', subject: 'Demo recording' },
  ];
</script>

<Page
  title="Inbox"
  subtitle="3 unread"
  width="full"
  sidebarWidth="11rem"
  asideWidth="13rem"
  footer="Synced a minute ago"
>
  {#snippet actions()}<Button icon="search" label="Search" iconOnly />{/snippet}
  {#snippet nav()}
    <SegmentedControl
      label="Show"
      bind:value={view}
      options={[
        { value: 'all', label: 'All' },
        { value: 'unread', label: 'Unread' },
      ]}
    />
  {/snippet}
  {#snippet sidebar()}<SideNav groups={folders} />{/snippet}
  {#snippet aside()}<p class="aside">Ada is writing the launch notes.</p>{/snippet}
  {#snippet floating()}
    <Button variant="primary" shape="pill" icon="edit" label="Compose" />
  {/snippet}

  {#each messages as m (m.id)}
    <Card padding="md" gap="xs">
      <strong>{m.subject}</strong>
      <span class="from">{m.from}</span>
    </Card>
  {/each}
</Page>

<style>
  .aside,
  .from {
    margin: 0;
    color: var(--text-3);
    font-size: var(--fs-sm);
  }
</style>
