<script lang="ts">
  /**
   * Admin console · Users (Storybook only). Invite sits on the list it adds to and the invitee
   * lands at the top with a glow; role changes, deactivation and reactivation show on the row
   * itself. Only a removed person — gone from the list — gets a toast, with Undo.
   */
  import { onMount } from 'svelte';
  import Row from '../patterns/layout/Row.svelte';
  import Section from '../patterns/layout/Section.svelte';
  import Stack from '../patterns/layout/Stack.svelte';
  import Badge from '../patterns/atoms/Badge.svelte';
  import Button from '../patterns/atoms/Button.svelte';
  import Input from '../patterns/atoms/Input.svelte';
  import Skeleton from '../patterns/atoms/Skeleton.svelte';
  import Tag from '../patterns/atoms/Tag.svelte';
  import { changeCue } from '../patterns/atoms/changed';
  import ConfirmButton from '../patterns/molecules/ConfirmButton.svelte';
  import CopyButton from '../patterns/molecules/CopyButton.svelte';
  import DetailList from '../patterns/molecules/DetailList.svelte';
  import DropdownMenu, { type MenuEntry } from '../patterns/molecules/DropdownMenu.svelte';
  import EmptyState from '../patterns/molecules/EmptyState.svelte';
  import Field from '../patterns/molecules/Field.svelte';
  import IdentityCell from '../patterns/molecules/IdentityCell.svelte';
  import MultiSelect from '../patterns/molecules/MultiSelect.svelte';
  import Pager from '../patterns/molecules/Pager.svelte';
  import RadioGroup from '../patterns/molecules/RadioGroup.svelte';
  import SearchField from '../patterns/molecules/SearchField.svelte';
  import SegmentedControl from '../patterns/molecules/SegmentedControl.svelte';
  import Tabs from '../patterns/molecules/Tabs.svelte';
  import ActivityLog from '../patterns/organisms/ActivityLog.svelte';
  import DataTable, { type Column } from '../patterns/organisms/DataTable.svelte';
  import Dialog from '../patterns/organisms/Dialog.svelte';
  import Drawer from '../patterns/organisms/Drawer.svelte';
  import { dateTimeFormat } from '../utils/format';
  import AdminHead from './AdminHead.svelte';
  import { later, type SectionProps } from './admin';
  import { activity, users, type Role, type User } from './mock';

  interface Props extends SectionProps {
    /** Starts with nobody in the workspace yet (the first-run state). */
    empty?: boolean;
  }

  let { empty = false, notify }: Props = $props();

  const PAGE_SIZE = 10;
  const ME = 'jane.doe@example.com';
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
  // Admin is a privilege, not a warning: the accent marks it, the other roles stay neutral.
  const ROLE_TONE = { admin: 'accent', editor: 'neutral', viewer: 'neutral' } as const;
  const STATUS_TONE = { active: 'live', invited: 'info', deactivated: 'locked' } as const;
  const STATUS_LABEL = { active: 'Active', invited: 'Invited', deactivated: 'Deactivated' };

  // svelte-ignore state_referenced_locally
  let all = $state<User[]>(empty ? [] : users());
  let loading = $state(true);
  let query = $state('');
  let status = $state<'all' | User['status']>('all');
  let roles = $state<string[]>([]);
  let offset = $state(0);
  let selectedId = $state<string | null>(null);
  let tab = $state('profile');
  let draftRole = $state<Role>('viewer');
  let roleSaved = $state<'idle' | 'busy' | 'done'>('idle');
  let inviting = $state(false);
  let inviteOrigin = $state<Element | undefined>();
  let inviteEmail = $state('');
  let inviteRole = $state<Role>('viewer');
  let inviteTouched = $state(false);
  let sending = $state(false);
  // The row that just changed: it glows once.
  let glow = $state<string | null>(null);
  let glowTimer: ReturnType<typeof setTimeout> | undefined;

  onMount(() => {
    const timer = setTimeout(() => (loading = false), 900);
    return () => {
      clearTimeout(timer);
      clearTimeout(glowTimer);
    };
  });

  const columns: Column[] = [
    { key: 'name', label: 'Name' },
    { key: 'role', label: 'Role', nowrap: true, hideOnMobile: true },
    { key: 'team', label: 'Team', hideOnMobile: true },
    { key: 'status', label: 'Status', nowrap: true },
    { key: 'lastSeen', label: 'Last seen', hideOnMobile: true, nowrap: true },
    { key: 'actions', label: '', align: 'end' },
  ];

  const selected = $derived(all.find((u) => u.id === selectedId) ?? null);
  const needle = $derived(query.trim().toLowerCase());
  const narrowed = $derived(status !== 'all' || roles.length > 0 || !!needle);
  const filtered = $derived(
    all.filter(
      (u) =>
        (status === 'all' || u.status === status) &&
        (!roles.length || roles.includes(u.role)) &&
        (!needle || u.name.toLowerCase().includes(needle) || u.email.includes(needle)),
    ),
  );
  const page = $derived(filtered.slice(offset, offset + PAGE_SIZE));
  const counts = $derived({
    active: all.filter((u) => u.status === 'active').length,
    invited: all.filter((u) => u.status === 'invited').length,
  });
  const inviteError = $derived(
    !inviteTouched
      ? undefined
      : !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(inviteEmail.trim())
        ? 'Enter a valid e-mail address'
        : all.some((u) => u.email === inviteEmail.trim().toLowerCase())
          ? 'This person is already in the workspace'
          : undefined,
  );

  function flash(id: string) {
    clearTimeout(glowTimer);
    glow = id;
    glowTimer = setTimeout(() => (glow = null), 900);
  }

  function open(user: User, start = 'profile') {
    selectedId = user.id;
    draftRole = user.role;
    roleSaved = 'idle';
    tab = start;
  }

  function update(id: string, change: Partial<User>) {
    all = all.map((u) => (u.id === id ? { ...u, ...change } : u));
    flash(id);
  }

  async function saveRole() {
    if (!selected) return;
    roleSaved = 'busy';
    await later(500);
    update(selected.id, { role: draftRole });
    // The drawer stays open: the badge in it and the row behind it show the new role.
    roleSaved = 'done';
    setTimeout(() => (roleSaved = 'idle'), 1600);
  }

  function clearFilters() {
    query = '';
    status = 'all';
    roles = [];
    offset = 0;
  }

  function startInvite(event: MouseEvent) {
    inviteOrigin = event.currentTarget as Element;
    inviting = true;
  }

  async function invite(event: SubmitEvent) {
    event.preventDefault();
    inviteTouched = true;
    if (inviteError) return;
    sending = true;
    await later(600);
    const email = inviteEmail.trim().toLowerCase();
    const name = (email.split('@')[0] ?? email)
      .split(/[._-]+/)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');
    const id = `usr_${Date.now().toString(16)}`;
    all = [
      { id, name, email, role: inviteRole, status: 'invited', team: 'Research', lastSeen: null },
      ...all,
    ];
    // The new person must be visible where they land: at the top of an unfiltered first page.
    if (narrowed) clearFilters();
    offset = 0;
    sending = false;
    inviting = false;
    inviteEmail = '';
    inviteTouched = false;
    flash(id);
  }

  function remove(user: User) {
    const index = all.findIndex((u) => u.id === user.id);
    all = all.filter((u) => u.id !== user.id);
    if (selectedId === user.id) selectedId = null;
    // The row is gone, so the only place left to answer is the toast — with the way back.
    notify?.(
      user.status === 'invited'
        ? `Invitation for ${user.email} withdrawn`
        : `${user.name} removed from the workspace`,
      {
        tone: 'warn',
        action: {
          label: 'Undo',
          onaction: () => {
            all = [...all.slice(0, index), user, ...all.slice(index)];
            flash(user.id);
          },
        },
      },
    );
  }

  function menu(user: User): MenuEntry[] {
    const isMe = user.email === ME;
    return [
      { label: 'View details', icon: 'user', onselect: () => open(user) },
      { label: 'Change role', icon: 'edit', onselect: () => open(user, 'access') },
      { label: 'Activity', icon: 'activity', onselect: () => open(user, 'activity') },
      { separator: true },
      user.status === 'invited'
        ? {
            label: 'Resend invitation',
            icon: 'mail',
            onselect: () => update(user.id, { lastSeen: null }),
          }
        : user.status === 'deactivated'
          ? {
              label: 'Reactivate',
              icon: 'refresh',
              onselect: () => update(user.id, { status: 'active' }),
            }
          : {
              label: 'Deactivate',
              icon: 'lock',
              disabled: isMe,
              onselect: () => update(user.id, { status: 'deactivated' }),
            },
      {
        label: user.status === 'invited' ? 'Withdraw invitation' : 'Remove from workspace',
        icon: 'trash',
        danger: true,
        disabled: isMe,
        onselect: () => remove(user),
      },
    ];
  }
</script>

{#snippet cell(user: User, column: Column)}
  {#if column.key === 'name'}
    <IdentityCell name={user.name} subtitle={user.email} size={30} />
  {:else if column.key === 'role'}
    <Badge size="sm" tone={ROLE_TONE[user.role]} label={ROLE_LABEL[user.role]} />
  {:else if column.key === 'status'}
    <Badge tone={STATUS_TONE[user.status]} label={STATUS_LABEL[user.status]} />
  {:else if column.key === 'lastSeen'}
    <span class="muted">
      {user.lastSeen
        ? dateTimeFormat.format(new Date(user.lastSeen))
        : user.status === 'invited'
          ? 'Invitation sent'
          : '—'}
    </span>
  {:else if column.key === 'actions'}
    <DropdownMenu label="Actions for {user.name}" items={menu(user)} />
  {:else}
    {user.team}
  {/if}
{/snippet}

<AdminHead section="users" />

<Section
  level="panel"
  title="Members"
  description={all.length
    ? `${all.length} people · ${counts.active} active · ${counts.invited} invited`
    : 'Nobody here yet.'}
>
  {#snippet actions()}
    <span data-note="invite">
      <Button
        variant="primary"
        shape="pill"
        icon="user-plus"
        label="Invite"
        onclick={startInvite}
      />
    </span>
  {/snippet}

  {#if !loading && !all.length}
    <EmptyState
      icon="users"
      title="No one here yet"
      message="It’s quiet in here. Invite your team to share dashboards and edit data together."
    >
      {#snippet action()}
        <Button
          variant="primary"
          shape="pill"
          icon="user-plus"
          label="Invite the first person"
          onclick={startInvite}
        />
      {/snippet}
    </EmptyState>
  {:else}
    <Row gap="sm" align="end" data-note="users-filters">
      <SearchField
        class="user-search"
        label="Search people"
        placeholder="Name or e-mail"
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
        <Button size="xs" variant="plain" label="Clear filters" onclick={clearFilters} />
      </Row>
    {/if}

    {#if loading}
      <Stack padding="sm" aria-busy="true" aria-label="Loading people">
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
      <div data-note="users-table">
        <DataTable
          {columns}
          rows={page}
          rowKey={(u) => u.id}
          {cell}
          highlight={glow ?? undefined}
          filtered={narrowed}
          emptyFilteredMessage="Nobody matches these filters — try loosening one."
          onrowclick={(u) => open(u)}
        />
      </div>
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

<Drawer
  open={!!selected}
  title={selected?.name ?? ''}
  subtitle={selected?.email}
  onclose={() => (selectedId = null)}
>
  {#if selected}
    <Stack gap="md">
      <Row gap="xs">
        <span class="badge-cue" use:changeCue={selected.role}>
          <Badge tone={ROLE_TONE[selected.role]} label={ROLE_LABEL[selected.role]} />
        </span>
        <span class="badge-cue" use:changeCue={selected.status}>
          <Badge tone={STATUS_TONE[selected.status]} label={STATUS_LABEL[selected.status]} />
        </span>
      </Row>
      <Tabs
        label="Details of {selected.name}"
        bind:value={tab}
        tabs={[
          { value: 'profile', label: 'Profile' },
          { value: 'access', label: 'Access' },
          { value: 'activity', label: 'Activity', count: 5 },
        ]}
      >
        {#snippet panel(value)}
          {#if value === 'profile' && selected}
            <Stack gap="md">
              <DetailList
                items={[
                  { label: 'Team', value: selected.team },
                  { label: 'Role', value: ROLE_LABEL[selected.role] },
                  {
                    label: 'Last seen',
                    value: selected.lastSeen
                      ? dateTimeFormat.format(new Date(selected.lastSeen))
                      : 'Never',
                  },
                ]}
              />
              <Row gap="sm">
                <span class="id-label">User ID</span>
                <code>{selected.id}</code>
                <CopyButton value={selected.id} iconOnly size="sm" />
              </Row>
            </Stack>
          {:else if value === 'access' && selected}
            <Stack gap="md">
              <RadioGroup label="Role" options={ROLE_OPTIONS} bind:value={draftRole} />
              {#if selected.email !== ME}
                <div class="danger">
                  {#if selected.status === 'deactivated'}
                    <p>Deactivated people cannot sign in. Their data stays.</p>
                    <Button
                      icon="refresh"
                      label="Reactivate"
                      onclick={() => selected && update(selected.id, { status: 'active' })}
                    />
                  {:else}
                    <p>Signs {selected.name} out everywhere. You can reactivate them later.</p>
                    <ConfirmButton
                      size="sm"
                      icon="lock"
                      label="Deactivate"
                      confirmLabel="Deactivate now"
                      onconfirm={async () => {
                        await later(500);
                        if (selected) update(selected.id, { status: 'deactivated' });
                      }}
                    />
                  {/if}
                </div>
              {/if}
            </Stack>
          {:else}
            <ActivityLog entries={activity()} />
          {/if}
        {/snippet}
      </Tabs>
    </Stack>
  {/if}
  {#snippet footer()}
    <Button label="Close" onclick={() => (selectedId = null)} />
    {#if tab === 'access'}
      <Button
        variant={roleSaved === 'done' ? 'success' : 'primary'}
        icon={roleSaved === 'done' ? 'check' : undefined}
        label={roleSaved === 'done' ? 'Saved' : 'Save role'}
        busy={roleSaved === 'busy'}
        busyLabel="Saving…"
        disabled={roleSaved === 'idle' && draftRole === selected?.role}
        onclick={saveRole}
      />
    {/if}
  {/snippet}
</Drawer>

<Dialog
  open={inviting}
  origin={inviteOrigin}
  title="Invite someone"
  intro="They get an e-mail with a sign-in link and show up in the list right away."
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
    <Button
      type="submit"
      form="invite-form"
      variant="primary"
      icon="send"
      label="Send invitation"
      busy={sending}
      busyLabel="Sending…"
    />
  {/snippet}
</Dialog>

<style>
  :global(.user-search) {
    flex: 1 1 16rem;
  }
  .muted {
    color: var(--text-3);
    font-size: var(--fs-sm);
  }
  .badge-cue {
    display: inline-flex;
    border-radius: var(--radius-sm);
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
  .danger {
    display: grid;
    gap: var(--space-2);
    justify-items: start;
    padding-top: var(--space-4);
    border-top: 1px solid var(--line);
    color: var(--text-2);
    font-size: var(--fs-sm);
  }
</style>
