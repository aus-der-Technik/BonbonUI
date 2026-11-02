<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Breadcrumbs from './Breadcrumbs.svelte';
  import DetailHeader from './DetailHeader.svelte';
  import DetailList from './DetailList.svelte';
  import DetailSection from './DetailSection.svelte';
  import Disclosure from './Disclosure.svelte';
  import DropdownMenu from './DropdownMenu.svelte';
  import Tabs from './Tabs.svelte';
  import Badge from '../atoms/Badge.svelte';
  import Button from '../atoms/Button.svelte';
  import Card from '../atoms/Card.svelte';
  import StatusText from '../atoms/StatusText.svelte';
  import Row from '../layout/Row.svelte';
  import Stack from '../layout/Stack.svelte';

  const { Story } = defineMeta({
    title: 'Molecules/Tabs, menus & navigation',
    component: Tabs,
    tags: ['autodocs'],
    parameters: { layout: 'padded' },
  });
</script>

<script lang="ts">
  let tab = $state('profile');
  let view = $state('overview');
  let last = $state('');
</script>

<!-- One accent bar glides from tab to tab (it answers "where did I go?"). Arrow keys, Home and End
     move; counts sit in small pills. -->
<Story name="Tabs" asChild>
  <Card>
    <Tabs
      label="Customer"
      bind:value={tab}
      tabs={[
        { value: 'profile', label: 'Profile', icon: 'user' },
        { value: 'orders', label: 'Orders', icon: 'bag', count: 12 },
        { value: 'messages', label: 'Messages', icon: 'chat', count: 2 },
        { value: 'billing', label: 'Billing', icon: 'credit-card', disabled: true },
      ]}
    >
      {#snippet panel(value)}<StatusText message="Panel: {value}" />{/snippet}
    </Tabs>
  </Card>
</Story>

<!-- `variant="pill"`: a recessed track with the active tab on a glass pill, plus an action at
     the end of the bar. -->
<Story name="Tabs as pills" asChild>
  <Tabs
    label="Report"
    variant="pill"
    bind:value={view}
    tabs={[
      { value: 'overview', label: 'Overview' },
      { value: 'sales', label: 'Sales' },
      { value: 'traffic', label: 'Traffic' },
    ]}
  >
    {#snippet actions()}<Button size="sm" icon="download" label="Export" />{/snippet}
    {#snippet panel(value)}<StatusText message="Showing {value}" />{/snippet}
  </Tabs>
</Story>

<!-- Where this page sits; the last item is the current page. -->
<Story name="Breadcrumbs" asChild>
  <Breadcrumbs
    items={[
      { label: 'Settings', href: '#' },
      { label: 'Members', href: '#' },
      { label: 'Jane Doe' },
    ]}
  />
</Story>

<!-- Actions behind one button, on a frosted glass menu that grows out of the trigger's corner.
     Entries take icons and shortcut hints; `{ heading }` groups them, `danger` ones are red.
     Pointing at an entry is a quiet grey; the accent marks the keyboard focus. When the menu
     would leave the screen on its `align` side, it opens to the other side. -->
<Story name="DropdownMenu" parameters={{ docs: { story: { height: '22rem' } } }} asChild>
  <Row gap="xl" align="start">
    <DropdownMenu
      items={[
        { heading: 'Order' },
        { label: 'Edit', icon: 'edit', shortcut: '⌘E', onselect: () => (last = 'Edit') },
        { label: 'Duplicate', icon: 'copy', shortcut: '⌘D', onselect: () => (last = 'Duplicate') },
        { label: 'Export', icon: 'download', disabled: true, onselect: () => {} },
        { separator: true },
        { label: 'Cancel order', icon: 'trash', danger: true, onselect: () => (last = 'Cancel') },
      ]}
    />
    <DropdownMenu
      label="Export"
      icon="download"
      iconOnly={false}
      size="md"
      shape="pill"
      variant="glass"
      align="start"
      items={[
        { label: 'CSV', icon: 'table', onselect: () => (last = 'CSV') },
        { label: 'JSON', icon: 'code', onselect: () => (last = 'JSON') },
      ]}
    />
    {#if last}<StatusText message="Picked: {last}" />{/if}
  </Row>
</Story>

<!-- Folding sections; several in a row make an accordion. -->
<Story name="Disclosure" asChild>
  <Card>
    <Disclosure title="Shipping" icon="truck" meta="3 settings">
      <StatusText message="Carriers, packaging and pick-up times." />
    </Disclosure>
    <Disclosure title="Payments" icon="credit-card" meta="2 methods">
      <StatusText message="Card and invoice." />
    </Disclosure>
    <Disclosure title="Danger zone" tone="danger" open>
      <Row justify="between">
        <StatusText message="Delete this store and all its data." />
        <Button variant="danger" label="Delete store" />
      </Row>
    </Disclosure>
  </Card>
</Story>

<!-- The top of a record's detail with its titled sections below. -->
<Story name="Record detail" asChild>
  <Card padding="lg">
    <Stack gap="lg">
      <DetailHeader
        titleId="customer-title"
        title="Jane Doe"
        subtitle="Regular customer since 2024"
      >
        {#snippet badge()}<Badge tone="live" label="Active" />{/snippet}
        {#snippet meta()}jane.doe@example.com{/snippet}
        {#snippet actions()}<Button size="sm" icon="edit" label="Edit" />{/snippet}
      </DetailHeader>
      <DetailSection title="Contact">
        {#snippet actions()}<Button size="xs" variant="ghost" label="Copy" />{/snippet}
        <DetailList
          columns={2}
          items={[
            { label: 'Phone', value: '+1 555 0100' },
            { label: 'City', value: 'Riverside' },
          ]}
        />
      </DetailSection>
    </Stack>
  </Card>
</Story>
