<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ActivityLog from './ActivityLog.svelte';
  import ConfirmDialog from './ConfirmDialog.svelte';
  import Drawer from './Drawer.svelte';
  import FormSection from './FormSection.svelte';
  import SideNav from './SideNav.svelte';
  import Button from '../atoms/Button.svelte';
  import Card from '../atoms/Card.svelte';
  import Input from '../atoms/Input.svelte';
  import Switch from '../atoms/Switch.svelte';
  import Field from '../molecules/Field.svelte';
  import DetailList from '../molecules/DetailList.svelte';
  import Grid from '../layout/Grid.svelte';
  import Row from '../layout/Row.svelte';
  import Stack from '../layout/Stack.svelte';
  import { activity, navGroups } from '../../demo/mock';

  const { Story } = defineMeta({
    title: 'Organisms/Navigation, drawers & forms',
    component: SideNav,
    tags: ['autodocs'],
    parameters: { layout: 'padded' },
  });
</script>

<script lang="ts">
  let page = $state('users');
  let drawer = $state(false);
  let leftDrawer = $state(false);
  let confirm = $state(false);
  let failing = $state(false);
</script>

<!-- The section navigation. The current page sits on the selected layer: tinted glass, tint text
     and a pill marker. Click an item: the selected pill slides over to it instead of blinking.
     Below 900px the list turns into a horizontal strip. -->
<Story name="SideNav" asChild>
  <Stack style="max-width:16rem">
    <SideNav
      groups={navGroups(page)}
      onnavigate={(item, event) => {
        event.preventDefault();
        page = item.href.slice(1);
      }}
    />
  </Stack>
</Story>

<!-- A drawer glides in from the end edge on liquid glass, a little off the viewport edges. The
     footer holds its actions. -->
<Story name="Drawer" asChild>
  <Row>
    <Button label="Open Jane Doe" onclick={() => (drawer = true)} />
    <Button label="Open filters" icon="filter" onclick={() => (leftDrawer = true)} />
  </Row>
  <Drawer
    open={drawer}
    title="Jane Doe"
    subtitle="jane.doe@example.com"
    onclose={() => (drawer = false)}
  >
    <DetailList
      items={[
        { label: 'Role', value: 'Editor' },
        { label: 'Last sign-in', value: '19.10.2026, 09:12' },
        { label: 'User ID', value: 'usr_2b6c1e0a9f44', mono: true },
      ]}
    />
    {#snippet footer()}
      <Button label="Close" onclick={() => (drawer = false)} />
      <Button variant="primary" label="Save" onclick={() => (drawer = false)} />
    {/snippet}
  </Drawer>
  <!-- `side="start"` for filters or a navigation on the leading edge. -->
  <Drawer
    open={leftDrawer}
    side="start"
    width="22rem"
    title="Filters"
    onclose={() => (leftDrawer = false)}
  >
    <Stack gap="md">
      <Switch label="Only active members" checked />
      <Switch label="Include invitations" />
      <Switch label="Show deactivated" />
    </Stack>
    {#snippet footer()}
      <Button variant="primary" label="Apply" onclick={() => (leftDrawer = false)} />
    {/snippet}
  </Drawer>
</Story>

<!-- "Are you sure?" with a busy confirm button. The first resolves after 700 ms; the second fails
     and keeps the dialog open with the error inside. -->
<Story name="ConfirmDialog" asChild>
  <Row>
    <Button variant="danger" label="Deactivate user" onclick={() => (confirm = true)} />
    <Button variant="danger" label="Delete 12 records (fails)" onclick={() => (failing = true)} />
  </Row>
  <ConfirmDialog
    open={confirm}
    title="Deactivate Jane Doe?"
    message="She will be signed out everywhere and can no longer sign in. You can reactivate her later."
    confirmLabel="Deactivate"
    busyLabel="Deactivating…"
    onconfirm={() => new Promise((resolve) => setTimeout(resolve, 700))}
    onclose={() => (confirm = false)}
  />
  <ConfirmDialog
    open={failing}
    title="Delete 12 records?"
    message="This cannot be undone."
    confirmLabel="Delete"
    onconfirm={() => Promise.reject(new Error('You need the admin role to delete records.'))}
    onclose={() => (failing = false)}
  />
</Story>

<!-- An audit trail: avatars with a coloured badge per kind of change, or plain candy dots with
     `showAvatars={false}`. -->
<Story name="ActivityLog" asChild>
  <Grid min="22rem">
    <Card title="Recent activity"><ActivityLog entries={activity()} /></Card>
    <Card title="Without avatars"><ActivityLog entries={activity()} showAvatars={false} /></Card>
  </Grid>
</Story>

<!-- A settings form: each FormSection puts its title and explanation left and the fields right
     (stacked on phones); a section can carry its own save. -->
<Story name="FormSection" asChild>
  <Card padding="lg">
    <FormSection title="Profile" description="Shown to everyone in your workspace.">
      <Field label="Display name">
        {#snippet children({ id })}<Input {id} value="Jane Doe" />{/snippet}
      </Field>
      <Field label="E-mail" hint="We send sign-in links here.">
        {#snippet children({ id })}<Input
            {id}
            type="email"
            value="jane.doe@example.com"
          />{/snippet}
      </Field>
    </FormSection>
    <FormSection title="Notifications" description="How we tell you about new activity.">
      <Switch label="E-mail summary" description="Once a day" checked />
      <Switch label="Browser notifications" />
      {#snippet footer()}<Button variant="primary" label="Save changes" />{/snippet}
    </FormSection>
  </Card>
</Story>
