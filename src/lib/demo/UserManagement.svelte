<script lang="ts">
  /** Example page: user management with a side navigation, mock data (Storybook only). */
  import { onMount } from 'svelte';
  import Page from '../patterns/templates/Page.svelte';
  import Row from '../patterns/layout/Row.svelte';
  import Section from '../patterns/layout/Section.svelte';
  import Stack from '../patterns/layout/Stack.svelte';
  import Badge from '../patterns/atoms/Badge.svelte';
  import Button from '../patterns/atoms/Button.svelte';
  import Input from '../patterns/atoms/Input.svelte';
  import Skeleton from '../patterns/atoms/Skeleton.svelte';
  import Tag from '../patterns/atoms/Tag.svelte';
  import Breadcrumbs from '../patterns/molecules/Breadcrumbs.svelte';
  import CopyButton from '../patterns/molecules/CopyButton.svelte';
  import DetailList from '../patterns/molecules/DetailList.svelte';
  import DropdownMenu from '../patterns/molecules/DropdownMenu.svelte';
  import EmptyState from '../patterns/molecules/EmptyState.svelte';
  import Field from '../patterns/molecules/Field.svelte';
  import IdentityCell from '../patterns/molecules/IdentityCell.svelte';
  import MultiSelect from '../patterns/molecules/MultiSelect.svelte';
  import Pager from '../patterns/molecules/Pager.svelte';
  import RadioGroup from '../patterns/molecules/RadioGroup.svelte';
  import SearchField from '../patterns/molecules/SearchField.svelte';
  import SegmentedControl from '../patterns/molecules/SegmentedControl.svelte';
  import Tabs from '../patterns/molecules/Tabs.svelte';
  import UserMenu from '../patterns/molecules/UserMenu.svelte';
  import ActivityLog from '../patterns/organisms/ActivityLog.svelte';
  import ConfirmDialog from '../patterns/organisms/ConfirmDialog.svelte';
  import DataTable, { type Column } from '../patterns/organisms/DataTable.svelte';
  import Dialog from '../patterns/organisms/Dialog.svelte';
  import Drawer from '../patterns/organisms/Drawer.svelte';
  import SideNav from '../patterns/organisms/SideNav.svelte';
  import Toaster from '../patterns/organisms/Toaster.svelte';
  import { dateTimeFormat } from '../utils/format';
  import { ToastQueue } from '../utils/toasts.svelte';
  import { activity, navGroups, users, type Role, type User } from './mock';

  interface Props {
    /** Starts with an empty workspace to show the first-run state. */
    empty?: boolean;
  }

  let { empty = false }: Props = $props();

  const PAGE_SIZE = 10;
  const ROLE_LABEL: Record<Role, string> = { admin: 'Admin', editor: 'Editor', viewer: 'Viewer' };
  const ROLE_OPTIONS = [
    {
      value: 'admin' as Role,
      label: 'Admin',
      description: 'Everything, including users and settings',
    },
    { value: 'editor' as Role, label: 'Editor', description: 'Edit data and dashboards' },
    { value: 'viewer' as Role, label: 'Viewer', description: 'Read only' },
  ];

  // svelte-ignore state_referenced_locally
  let all = $state<User[]>(empty ? [] : users());
  let loading = $state(true);
  let query = $state('');
  let status = $state<'all' | User['status']>('all');
  let roles = $state<string[]>([]);
  let offset = $state(0);
  let selected = $state<User | null>(null);
  let tab = $state('profile');
  let draftRole = $state<Role>('viewer');
  let deactivating = $state<User | null>(null);
  let inviting = $state(false);
  let inviteEmail = $state('');
  let inviteRole = $state<Role>('viewer');
  let inviteTouched = $state(false);
  const toasts = new ToastQueue();

  onMount(() => {
    const timer = setTimeout(() => (loading = false), 900);
    return () => clearTimeout(timer);
  });

  const columns: Column[] = [
    { key: 'name', label: 'Name' },
    { key: 'role', label: 'Role', nowrap: true, hideOnMobile: true },
    { key: 'team', label: 'Team', hideOnMobile: true },
    { key: 'status', label: 'Status', nowrap: true },
    { key: 'lastSeen', label: 'Last seen', hideOnMobile: true, nowrap: true },
    { key: 'actions', label: '', align: 'end' },
  ];

  const needle = $derived(query.trim().toLowerCase());
  const filtered = $derived(
    all.filter(
      (u) =>
        (status === 'all' || u.status === status) &&
        (!roles.length || roles.includes(u.role)) &&
        (!needle || u.name.toLowerCase().includes(needle) || u.email.includes(needle)),
    ),
  );
  const page = $derived(filtered.slice(offset, offset + PAGE_SIZE));
  const inviteError = $derived(
    !inviteTouched
      ? undefined
      : !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(inviteEmail)
        ? 'Enter a valid e-mail address'
        : all.some((u) => u.email === inviteEmail.trim().toLowerCase())
          ? 'This person is already in the workspace'
          : undefined,
  );

  function open(user: User, start = 'profile') {
    selected = user;
    draftRole = user.role;
    tab = start;
  }

  function update(id: string, change: Partial<User>) {
    all = all.map((u) => (u.id === id ? { ...u, ...change } : u));
    if (selected?.id === id) selected = { ...selected, ...change };
  }

  function saveRole() {
    if (!selected) return;
    update(selected.id, { role: draftRole });
    toasts.push(`${selected.name} is now ${ROLE_LABEL[draftRole].toLowerCase()}`);
    selected = null;
  }

  function invite(event: SubmitEvent) {
    event.preventDefault();
    inviteTouched = true;
    if (inviteError) return;
    const email = inviteEmail.trim().toLowerCase();
    const name = email.split('@')[0]?.replace(/[._]/g, ' ') ?? email;
    all = [
      {
        id: `usr_${Date.now().toString(16)}`,
        name,
        email,
        role: inviteRole,
        status: 'invited',
        team: 'Research',
        lastSeen: null,
      },
      ...all,
    ];
    toasts.push(`Invitation sent to ${email}`);
    inviting = false;
    inviteEmail = '';
    inviteTouched = false;
  }

  const statusTone = { active: 'live', invited: 'info', deactivated: 'locked' } as const;
</script>

{#snippet cell(user: User, column: Column)}
  {#if column.key === 'name'}
    <IdentityCell name={user.name} subtitle={user.email} size={30} />
  {:else if column.key === 'role'}
    <Badge
      size="sm"
      tone={user.role === 'admin' ? 'danger' : 'neutral'}
      label={ROLE_LABEL[user.role]}
    />
  {:else if column.key === 'status'}
    <Badge
      tone={statusTone[user.status]}
      label={user.status[0]?.toUpperCase() + user.status.slice(1)}
    />
  {:else if column.key === 'lastSeen'}
    <span class="muted">{user.lastSeen ? dateTimeFormat.format(new Date(user.lastSeen)) : '—'}</span
    >
  {:else if column.key === 'actions'}
    <DropdownMenu
      label="Actions for {user.name}"
      items={[
        { label: 'View details', icon: 'user', onselect: () => open(user) },
        { label: 'Change role', icon: 'edit', onselect: () => open(user, 'access') },
        { label: 'Activity', icon: 'calendar', onselect: () => open(user, 'activity') },
        { separator: true },
        user.status === 'deactivated'
          ? {
              label: 'Reactivate',
              icon: 'refresh',
              onselect: () => update(user.id, { status: 'active' }),
            }
          : {
              label: 'Deactivate',
              icon: 'lock',
              danger: true,
              onselect: () => (deactivating = user),
            },
      ]}
    />
  {:else}
    {user.team}
  {/if}
{/snippet}

<Page title="Admin" subtitle="users & access" gap="md" footer="Example Corp · internal">
  {#snippet actions()}
    <UserMenu email="jane.doe@example.com" name="Jane Doe" onsignout={() => {}} />
  {/snippet}
  {#snippet sidebar()}
    <SideNav groups={navGroups('users')} onnavigate={(_, event) => event.preventDefault()} />
  {/snippet}

  <Breadcrumbs items={[{ label: 'Administration', href: '#' }, { label: 'Users' }]} />

  <Section
    level="panel"
    title="Users"
    description="Who can sign in to this workspace and what they may change."
  >
    {#snippet actions()}
      <Button variant="primary" icon="plus" label="Invite user" onclick={() => (inviting = true)} />
    {/snippet}
    {#if !loading && !all.length}
      <EmptyState
        icon="users"
        title="No users yet"
        message="It’s quiet in here. Invite your team to share dashboards and edit data."
      >
        {#snippet action()}
          <Button
            variant="primary"
            icon="plus"
            label="Invite users"
            onclick={() => (inviting = true)}
          />
        {/snippet}
      </EmptyState>
    {:else}
      <Row gap="sm" align="end">
        <SearchField
          class="user-search"
          label="Search users"
          placeholder="Search name or e-mail"
          bind:value={query}
          oninput={() => (offset = 0)}
        />
        <SegmentedControl
          label="Status"
          options={[
            { value: 'all', label: 'All' },
            { value: 'active', label: 'Active' },
            { value: 'invited', label: 'Invited' },
            { value: 'deactivated', label: 'Deactivated' },
          ]}
          bind:value={status}
          onchange={() => (offset = 0)}
        />
        <MultiSelect
          label="Role"
          allLabel="All roles"
          unit="roles"
          groups={[{ options: ROLE_OPTIONS.map((r) => ({ value: r.value, label: r.label })) }]}
          value={roles}
          onchange={(v) => {
            roles = v;
            offset = 0;
          }}
        />
      </Row>
      {#if roles.length || needle}
        <Row gap="xs">
          {#if needle}<Tag label="“{query.trim()}”" onremove={() => (query = '')} />{/if}
          {#each roles as role (role)}
            <Tag
              label={ROLE_LABEL[role as Role]}
              onremove={() => (roles = roles.filter((r) => r !== role))}
            />
          {/each}
        </Row>
      {/if}

      {#if loading}
        <Stack padding="sm" aria-busy="true">
          {#each [1, 2, 3, 4, 5] as n (n)}
            <Row gap="md" wrap={false}>
              <Skeleton shape="circle" width="30px" />
              <Stack grow><Skeleton lines={2} width="14rem" /></Stack>
              <Skeleton width="4rem" />
              <Skeleton width="5rem" />
            </Row>
          {/each}
        </Stack>
      {:else}
        <DataTable
          {columns}
          rows={page}
          rowKey={(u) => u.id}
          {cell}
          emptyText="Nobody matches these filters — try loosening one."
        />
        <Pager
          {offset}
          limit={PAGE_SIZE}
          total={filtered.length}
          count={page.length}
          onpage={(next) => (offset = next)}
        />
      {/if}
    {/if}
  </Section>
</Page>

<Drawer
  open={!!selected}
  title={selected?.name ?? ''}
  subtitle={selected?.email}
  onclose={() => (selected = null)}
>
  {#if selected}
    <Tabs
      label="User details"
      bind:value={tab}
      tabs={[
        { value: 'profile', label: 'Profile' },
        { value: 'access', label: 'Access' },
        { value: 'activity', label: 'Activity', count: 5 },
      ]}
    >
      {#snippet panel(value)}
        {#if value === 'profile' && selected}
          <DetailList
            items={[
              { label: 'Team', value: selected.team },
              { label: 'Status', value: selected.status },
              {
                label: 'Last seen',
                value: selected.lastSeen
                  ? dateTimeFormat.format(new Date(selected.lastSeen))
                  : 'Never',
              },
            ]}
          />
          <Row gap="sm" class="id-row">
            <span class="id-label">User ID</span>
            <code>{selected.id}</code>
            <CopyButton value={selected.id} iconOnly />
          </Row>
        {:else if value === 'access'}
          <RadioGroup label="Role" options={ROLE_OPTIONS} bind:value={draftRole} />
        {:else}
          <ActivityLog entries={activity()} />
        {/if}
      {/snippet}
    </Tabs>
  {/if}
  {#snippet footer()}
    <Button label="Close" onclick={() => (selected = null)} />
    {#if tab === 'access'}
      <Button
        variant="primary"
        label="Save role"
        disabled={draftRole === selected?.role}
        onclick={saveRole}
      />
    {/if}
  {/snippet}
</Drawer>

<Dialog
  open={inviting}
  title="Invite a user"
  intro="They get an e-mail with a sign-in link."
  onclose={() => (inviting = false)}
>
  <!-- A plain form: Stack cannot take form attributes like novalidate. -->
  <form id="invite-form" onsubmit={invite} novalidate>
    <Stack>
      <Field label="E-mail" required error={inviteError}>
        {#snippet children({ id, errorId, invalid })}
          <Input
            {id}
            type="email"
            bind:value={inviteEmail}
            {invalid}
            aria-describedby={invalid ? errorId : undefined}
            placeholder="name@example.com"
            onblur={() => (inviteTouched = true)}
          />
        {/snippet}
      </Field>
      <RadioGroup label="Role" options={ROLE_OPTIONS} bind:value={inviteRole} />
    </Stack>
  </form>
  {#snippet actions()}
    <Button label="Cancel" onclick={() => (inviting = false)} />
    <Button type="submit" form="invite-form" variant="primary" label="Send invitation" />
  {/snippet}
</Dialog>

<ConfirmDialog
  open={!!deactivating}
  title="Deactivate {deactivating?.name}?"
  message="They are signed out everywhere and can no longer sign in. You can reactivate them later."
  confirmLabel="Deactivate"
  busyLabel="Deactivating…"
  onconfirm={() =>
    new Promise<void>((resolve) =>
      setTimeout(() => {
        if (deactivating) {
          update(deactivating.id, { status: 'deactivated' });
          toasts.push(`${deactivating.name} deactivated`, 'warn');
        }
        resolve();
      }, 600),
    )}
  onclose={() => (deactivating = null)}
/>

<Toaster toasts={toasts.items} ondismiss={(id) => toasts.dismiss(id)} />

<style>
  :global(.user-search) {
    flex: 1 1 16rem;
  }
  .muted {
    color: var(--text-3);
    font-size: var(--fs-sm);
  }
  :global(.id-row) {
    margin-top: var(--space-4);
  }
  .id-label {
    font-size: var(--fs-xs);
    color: var(--text-3);
    text-transform: uppercase;
    letter-spacing: var(--tracking-caps);
    font-weight: var(--fw-semibold);
  }
  code {
    font-family: var(--font-mono);
    font-size: var(--fs-xs);
  }
</style>
