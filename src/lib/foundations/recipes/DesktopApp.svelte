<script lang="ts">
  import {
    Page,
    Toolbar,
    SourceList,
    StatusBar,
    Inspector,
    DataTable,
    type SourceSection,
  } from '../../index';

  const sections: SourceSection[] = [
    {
      title: 'Mailboxes',
      items: [
        { id: 'inbox', label: 'Inbox', icon: 'inbox', count: 3 },
        { id: 'sent', label: 'Sent', icon: 'send' },
        { id: 'trash', label: 'Trash', icon: 'trash' },
      ],
    },
  ];
  const messages = [
    { id: 'm1', from: 'ada@example.com', subject: 'Launch notes', at: '09:12' },
    { id: 'm2', from: 'grace@example.com', subject: 'Yearly plan prices', at: '08:40' },
    { id: 'm3', from: 'linus@example.com', subject: 'Demo recording', at: 'Mon' },
  ];
  let mailbox = $state('inbox');
  let search = $state('');
  let open = $state('m1');
  const shown = $derived(
    messages.filter((m) => m.subject.toLowerCase().includes(search.trim().toLowerCase())),
  );
  const message = $derived(messages.find((m) => m.id === open));
</script>

<Page width="full" fill sidebarWidth="11rem" asideWidth="15rem">
  {#snippet header()}
    <Toolbar
      variant="bar"
      title="Inbox"
      bind:search
      searchPlaceholder="Search mail"
      items={[
        { icon: 'edit', label: 'New message', primary: true, showLabel: true },
        { separator: true },
        { icon: 'trash', label: 'Delete' },
        { spacer: true },
      ]}
    />
  {/snippet}
  {#snippet sidebar()}<SourceList {sections} bind:value={mailbox} />{/snippet}
  {#snippet aside()}
    <Inspector title={message?.subject} subtitle={message?.from}>
      <p>Received {message?.at}.</p>
    </Inspector>
  {/snippet}
  {#snippet footer()}
    <StatusBar
      items={[{ label: `${shown.length} messages` }, { label: 'Synced', dot: true, tone: 'ok' }]}
    />
  {/snippet}

  <DataTable
    columns={[
      { key: 'subject', label: 'Subject' },
      { key: 'at', label: 'Received', align: 'end' },
    ]}
    rows={shown}
    rowKey={(m) => m.id}
    current={open}
    onrowclick={(m) => (open = m.id)}
  />
</Page>
