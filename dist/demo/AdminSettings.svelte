<script lang="ts">
  /**
   * Admin console · Settings (Storybook only). What you pick applies at once and says "Saved"
   * beside the field; only what you type (name, description) has a Save button, right under it.
   * Tokens and hosted workspaces are created on their own list and answer in their own row.
   */
  import { onDestroy, onMount } from 'svelte';
  import Grid from '../patterns/layout/Grid.svelte';
  import Row from '../patterns/layout/Row.svelte';
  import Section from '../patterns/layout/Section.svelte';
  import Spacer from '../patterns/layout/Spacer.svelte';
  import Stack from '../patterns/layout/Stack.svelte';
  import Badge from '../patterns/atoms/Badge.svelte';
  import Button from '../patterns/atoms/Button.svelte';
  import Input from '../patterns/atoms/Input.svelte';
  import Link from '../patterns/atoms/Link.svelte';
  import ProgressBar from '../patterns/atoms/ProgressBar.svelte';
  import Select from '../patterns/atoms/Select.svelte';
  import StatusText from '../patterns/atoms/StatusText.svelte';
  import Switch from '../patterns/atoms/Switch.svelte';
  import Textarea from '../patterns/atoms/Textarea.svelte';
  import Alert from '../patterns/molecules/Alert.svelte';
  import ConfirmButton from '../patterns/molecules/ConfirmButton.svelte';
  import CopyButton from '../patterns/molecules/CopyButton.svelte';
  import Disclosure from '../patterns/molecules/Disclosure.svelte';
  import Field from '../patterns/molecules/Field.svelte';
  import RadioGroup from '../patterns/molecules/RadioGroup.svelte';
  import SegmentedControl from '../patterns/molecules/SegmentedControl.svelte';
  import Tabs from '../patterns/molecules/Tabs.svelte';
  import ConfirmDialog from '../patterns/organisms/ConfirmDialog.svelte';
  import DataTable, { type Column } from '../patterns/organisms/DataTable.svelte';
  import Dialog from '../patterns/organisms/Dialog.svelte';
  import FormSection from '../patterns/organisms/FormSection.svelte';
  import ResourceList, { type ResourceStatus } from '../patterns/organisms/ResourceList.svelte';
  import { celebrate } from '../utils/delight';
  import { dateFormat, dateTimeFormat, numberFormat } from '../utils/format';
  import { every } from '../utils/poll';
  import AdminHead from './AdminHead.svelte';
  import { clockFormat, later, type SectionProps } from './admin';
  import { workspaces, type Workspace } from './mock';

  type Tab = 'general' | 'notifications' | 'api' | 'workspaces' | 'advanced';

  interface Props extends SectionProps {
    tab?: Tab;
    /** The workspace's name; saving a new one changes it for the whole console. */
    workspace?: string;
  }

  let { tab = 'general', workspace = $bindable('Research Workspace') }: Props = $props();

  interface Token {
    id: string;
    name: string;
    scope: 'read' | 'read, write';
    created: string;
    lastUsed: string | null;
    /** Shown once, in the new token's own row. */
    secret?: string;
    revoked?: boolean;
  }

  type Hosted = Workspace & { failed?: string };

  let current = $derived<Tab>(tab);

  // ---- general: typed values wait for Save; picked values apply at once
  let name = $state(workspace);
  let description = $state('Dashboards and data for the research team.');
  let savedDescription = $state('Dashboards and data for the research team.');
  let saving = $state<'idle' | 'busy' | 'done'>('idle');
  let timezone = $state('Europe/Berlin');
  let language = $state('en');
  let theme = $state<'system' | 'light' | 'dark'>('system');
  let weekStart = $state<'monday' | 'sunday'>('monday');
  let notify = $state({ digest: true, mentions: true, failures: true, product: false });
  let digest = $state<'daily' | 'weekly'>('daily');
  let retention = $state(180);
  let savedRetention = $state(180);
  // Per-field "Saving… / Saved" marks for the settings that apply as you change them.
  let marks = $state<Record<string, 'saving' | 'saved'>>({});
  const markTimers: Record<string, ReturnType<typeof setTimeout>> = {};

  const nameError = $derived(name.trim() ? undefined : 'The workspace needs a name');
  const dirty = $derived(name.trim() !== workspace || description !== savedDescription);
  const retentionError = $derived(
    Number.isInteger(retention) && retention >= 7 && retention <= 3650
      ? undefined
      : 'Between 7 and 3,650 days',
  );

  function liveSave(key: string) {
    clearTimeout(markTimers[key]);
    marks = { ...marks, [key]: 'saving' };
    markTimers[key] = setTimeout(() => {
      marks = { ...marks, [key]: 'saved' };
      markTimers[key] = setTimeout(() => {
        const { [key]: _, ...rest } = marks;
        marks = rest;
      }, 2200);
    }, 450);
  }

  async function save(event: MouseEvent) {
    if (nameError || !dirty) return;
    const origin = event.currentTarget as Element;
    saving = 'busy';
    await later(600);
    workspace = name.trim();
    savedDescription = description;
    saving = 'done';
    celebrate(origin);
    setTimeout(() => (saving = 'idle'), 2200);
  }

  // The appearance setting drives the real theme, so the page shows what it changes.
  $effect(() => {
    if (theme === 'system') delete document.documentElement.dataset['theme'];
    else document.documentElement.dataset['theme'] = theme;
  });
  onDestroy(() => {
    delete document.documentElement.dataset['theme'];
    Object.values(markTimers).forEach(clearTimeout);
  });

  // ---- API tokens
  let tokens = $state<Token[]>([
    {
      id: 'tok_1',
      name: 'CI pipeline',
      scope: 'read',
      created: '2026-08-02T10:12:00Z',
      lastUsed: '2026-10-19T06:40:00Z',
    },
    {
      id: 'tok_2',
      name: 'Reporting export',
      scope: 'read, write',
      created: '2026-09-14T15:30:00Z',
      lastUsed: null,
    },
  ]);
  let tokenName = $state('');
  let tokenScope = $state<Token['scope']>('read');
  let creatingToken = $state(false);
  let freshToken = $state<string | null>(null);
  const tokenColumns: Column[] = [
    { key: 'name', label: 'Name' },
    { key: 'scope', label: 'Scope', nowrap: true },
    { key: 'lastUsed', label: 'Last used', nowrap: true, hideOnMobile: true },
    { key: 'actions', label: '', align: 'end' },
  ];
  const liveTokens = $derived(tokens.filter((t) => !t.revoked).length);

  async function createToken(event: SubmitEvent) {
    event.preventDefault();
    creatingToken = true;
    await later(500);
    const id = `tok_${Date.now().toString(16)}`;
    const secret = `live_${Math.random().toString(16).slice(2, 14)}${Math.random().toString(16).slice(2, 14)}`;
    tokens = [
      {
        id,
        name: tokenName.trim() || `Token ${tokens.length + 1}`,
        scope: tokenScope,
        created: new Date().toISOString(),
        lastUsed: null,
        secret,
      },
      ...tokens.map(({ secret: _, ...t }) => t),
    ];
    freshToken = id;
    tokenName = '';
    creatingToken = false;
  }

  function revoke(token: Token) {
    // The row stays, marked revoked, with an Undo in it; it leaves the list a little later.
    tokens = tokens.map((t) => (t.id === token.id ? { ...t, revoked: true } : t));
    setTimeout(() => {
      if (tokens.find((t) => t.id === token.id)?.revoked)
        tokens = tokens.filter((t) => t.id !== token.id);
    }, 6000);
  }

  // ---- hosted workspaces
  let hosted = $state<Hosted[]>(workspaces());
  let resource = $state<'workspaces' | 'volumes'>('workspaces');
  let checked = $state(new Date());
  let creatingWorkspace = $state(false);
  let workspaceOrigin = $state<Element | undefined>();
  let hostedName = $state('');
  let hostedTouched = $state(false);
  let size = $state('1Gi');
  let access = $state('rwo');
  let freshHosted = $state<string | null>(null);
  // import-scripts fails to start once: its node is full.
  let flaky = true;

  const STATUS: Record<Workspace['status'], ResourceStatus> = {
    running: { label: 'Running', tone: 'live' },
    stopped: { label: 'Stopped', tone: 'locked' },
    starting: { label: 'Starting', tone: 'draft', busy: true },
  };
  const hostedError = $derived(
    !hostedTouched
      ? undefined
      : !/^[a-z0-9-]{3,}$/.test(hostedName.trim())
        ? 'Lower-case letters, digits and dashes, at least 3'
        : hosted.some((w) => w.name === hostedName.trim())
          ? 'A workspace with this name exists'
          : undefined,
  );
  const volumes = $derived(
    [...new Set(hosted.map((w) => w.volume))].map((volume) => ({
      volume,
      usedBy: hosted.filter((w) => w.volume === volume).map((w) => w.name),
    })),
  );

  onMount(() =>
    every(() => {
      // A starting workspace is up by the next poll — unless its node is full.
      hosted = hosted.map((w) => {
        if (w.status !== 'starting') return w;
        if (w.name === 'import-scripts' && flaky) {
          flaky = false;
          return {
            ...w,
            status: 'stopped',
            failed: 'Could not start: the node is out of memory. Try again in a minute.',
          };
        }
        return { ...w, status: 'running' };
      });
      checked = new Date();
    }, 4000),
  );

  function toggle(w: Hosted) {
    hosted = hosted.map((i) => {
      if (i.id !== w.id) return i;
      const { failed: _, ...rest } = i;
      return { ...rest, status: w.status === 'running' ? 'stopped' : 'starting' };
    });
  }

  function startCreate(event: MouseEvent) {
    workspaceOrigin = event.currentTarget as Element;
    creatingWorkspace = true;
  }

  function createHosted(event: SubmitEvent) {
    event.preventDefault();
    hostedTouched = true;
    if (hostedError || !hostedName.trim()) return;
    const id = `w${Date.now()}`;
    hosted = [
      {
        id,
        name: hostedName.trim(),
        volume: `${hostedName.trim()}-data · ${size}`,
        created: dateFormat.format(new Date()),
        status: 'starting',
      },
      ...hosted,
    ];
    resource = 'workspaces';
    freshHosted = id;
    creatingWorkspace = false;
    hostedName = '';
    hostedTouched = false;
  }

  // ---- danger zone
  let deleting = $state(false);
  let deleteOrigin = $state<Element | undefined>();
</script>

{#snippet mark(key: string)}
  {#if marks[key]}
    <span class="mark">
      <StatusText
        tone={marks[key] === 'saved' ? 'ok' : 'neutral'}
        busy={marks[key] === 'saving'}
        message={marks[key] === 'saved' ? 'Saved' : 'Saving…'}
      />
    </span>
  {/if}
{/snippet}

{#snippet tokenCell(token: Token, column: Column)}
  {#if column.key === 'name'}
    <span class="token-name" class:revoked={token.revoked}>{token.name}</span>
    <span class="muted">created {dateTimeFormat.format(new Date(token.created))}</span>
    {#if token.secret}
      <div class="secret">
        <div class="secret-row">
          <code title={token.secret}>{token.secret}</code>
          <CopyButton size="sm" iconOnly value={token.secret} label="Copy token" />
        </div>
        <span class="muted">Shown once — copy it now.</span>
      </div>
    {/if}
  {:else if column.key === 'scope'}
    <span class:revoked={token.revoked}>{token.scope}</span>
  {:else if column.key === 'lastUsed'}
    <span class="muted"
      >{token.lastUsed ? dateTimeFormat.format(new Date(token.lastUsed)) : 'Never'}</span
    >
  {:else if token.revoked}
    <Row gap="xs" wrap={false}>
      <Badge size="sm" tone="locked" label="Revoked" />
      <Button
        size="sm"
        variant="plain"
        icon="undo"
        label="Undo"
        onclick={() =>
          (tokens = tokens.map((t) => (t.id === token.id ? { ...t, revoked: false } : t)))}
      />
    </Row>
  {:else}
    <ConfirmButton
      size="sm"
      label="Revoke"
      confirmLabel="Revoke now"
      busyLabel="Revoking…"
      onconfirm={async () => {
        await later(400);
        revoke(token);
      }}
    />
  {/if}
{/snippet}

<AdminHead section="settings" />

<Section level="panel" data-note="settings-panel">
  <Tabs
    label="Settings"
    bind:value={current}
    tabs={[
      { value: 'general', label: 'General' },
      { value: 'notifications', label: 'Notifications' },
      { value: 'api', label: 'API access', count: liveTokens },
      { value: 'workspaces', label: 'Workspaces', count: hosted.length },
      { value: 'advanced', label: 'Advanced' },
    ]}
  >
    {#snippet panel(value)}
      {#if value === 'general'}
        <FormSection
          title="Workspace"
          description="Shown to everyone in the workspace and in the console’s title."
        >
          <div data-note="workspace-name">
            <Field label="Name" required error={nameError}>
              {#snippet children({ id, errorId, invalid })}
                <Input
                  {id}
                  bind:value={name}
                  {invalid}
                  aria-describedby={invalid ? errorId : undefined}
                />
              {/snippet}
            </Field>
          </div>
          <Field label="Description" hint="Up to 280 characters">
            {#snippet children({ id })}
              <Textarea {id} bind:value={description} maxlength={280} counter rows={3} />
            {/snippet}
          </Field>
          {#snippet footer()}
            {#if dirty && saving === 'idle'}
              <Button
                variant="plain"
                label="Discard"
                onclick={() => {
                  name = workspace;
                  description = savedDescription;
                }}
              />
            {/if}
            <Button
              data-note="workspace-save"
              variant={saving === 'done' ? 'success' : 'primary'}
              icon={saving === 'done' ? 'check' : undefined}
              label={saving === 'done' ? 'Saved. Nice.' : 'Save name & description'}
              busy={saving === 'busy'}
              busyLabel="Saving…"
              disabled={saving === 'idle' && (!dirty || !!nameError)}
              onclick={save}
            />
          {/snippet}
        </FormSection>
        <FormSection
          title="Region"
          description="Dates and times in dashboards and exports use these. Changes apply at once."
        >
          <Grid columns={2} min="12rem">
            <Field label="Time zone" hint={marks['timezone'] ? savedHint : undefined}>
              {#snippet children({ id })}
                <Select
                  {id}
                  bind:value={timezone}
                  onchange={() => liveSave('timezone')}
                  options={[
                    { value: 'Europe/Berlin', label: 'Europe/Berlin' },
                    { value: 'Europe/London', label: 'Europe/London' },
                    { value: 'America/New_York', label: 'America/New_York' },
                    { value: 'UTC', label: 'UTC' },
                  ]}
                />
              {/snippet}
            </Field>
            <Field label="Language" hint={marks['language'] ? languageHint : undefined}>
              {#snippet children({ id })}
                <Select
                  {id}
                  bind:value={language}
                  onchange={() => liveSave('language')}
                  options={[
                    { value: 'en', label: 'English' },
                    { value: 'de', label: 'German' },
                    { value: 'fr', label: 'French' },
                  ]}
                />
              {/snippet}
            </Field>
          </Grid>
          <Row gap="md" align="end">
            <RadioGroup
              label="Week starts on"
              orientation="horizontal"
              bind:value={weekStart}
              onchange={() => liveSave('week')}
              options={[
                { value: 'monday', label: 'Monday' },
                { value: 'sunday', label: 'Sunday' },
              ]}
            />
            {@render mark('week')}
          </Row>
        </FormSection>
        <FormSection title="Appearance" description="Applies to this browser only, right away.">
          <Row gap="md" align="end">
            <RadioGroup
              label="Theme"
              bind:value={theme}
              onchange={() => liveSave('theme')}
              options={[
                {
                  value: 'system',
                  label: 'Follow the system',
                  description: 'Light or dark with your OS',
                },
                { value: 'light', label: 'Light' },
                { value: 'dark', label: 'Dark' },
              ]}
            />
            {@render mark('theme')}
          </Row>
        </FormSection>
      {:else if value === 'notifications'}
        <FormSection
          title="E-mail"
          description="Sent to jane.doe@example.com. Each switch saves as you flip it."
        >
          <Row gap="md" wrap={false}>
            <Switch
              label="Summary e-mail"
              description="New feedback and changed data at a glance"
              bind:checked={notify.digest}
              onchange={() => liveSave('digest')}
            />
            <Spacer />
            {@render mark('digest')}
          </Row>
          {#if notify.digest}
            <div class="indent">
              <Row gap="md">
                <RadioGroup
                  label="How often"
                  orientation="horizontal"
                  bind:value={digest}
                  onchange={() => liveSave('often')}
                  options={[
                    { value: 'daily', label: 'Daily' },
                    { value: 'weekly', label: 'Weekly' },
                  ]}
                />
                {@render mark('often')}
              </Row>
            </div>
          {/if}
          <Row gap="md" wrap={false}>
            <Switch
              label="Mentions"
              description="When someone mentions you in a comment"
              bind:checked={notify.mentions}
              onchange={() => liveSave('mentions')}
            />
            <Spacer />
            {@render mark('mentions')}
          </Row>
          <Row gap="md" wrap={false}>
            <Switch
              label="Failed jobs"
              description="When a crawl, rating run or export stops with an error"
              bind:checked={notify.failures}
              onchange={() => liveSave('failures')}
            />
            <Spacer />
            {@render mark('failures')}
          </Row>
          <Row gap="md" wrap={false}>
            <Switch
              label="Product news"
              description="A few times a year"
              bind:checked={notify.product}
              onchange={() => liveSave('product')}
            />
            <Spacer />
            {@render mark('product')}
          </Row>
        </FormSection>
      {:else if value === 'api'}
        <FormSection title="Usage" description="Requests this month across all tokens.">
          <ProgressBar
            value={8240}
            max={10000}
            label="{numberFormat.format(8240)} of {numberFormat.format(10000)} requests"
            showValue
            tone="warn"
          />
          <p class="muted">
            The quota resets on the first of the month. Read the <Link
              href="https://example.com/docs"
              external>API documentation</Link
            >.
          </p>
        </FormSection>
        <FormSection
          title="Tokens"
          description="Tokens act with your permissions. Revoke the ones you no longer use."
        >
          <form class="create" onsubmit={createToken}>
            <Field label="New token">
              {#snippet children({ id })}
                <Input {id} bind:value={tokenName} placeholder="e.g. Nightly import" />
              {/snippet}
            </Field>
            <Field label="Scope" group>
              {#snippet children({ labelId })}
                <SegmentedControl
                  labelledby={labelId}
                  bind:value={tokenScope}
                  options={[
                    { value: 'read', label: 'Read' },
                    { value: 'read, write', label: 'Read & write' },
                  ]}
                />
              {/snippet}
            </Field>
            <Button
              type="submit"
              variant="primary"
              icon="key"
              label="Create token"
              busy={creatingToken}
              busyLabel="Creating…"
            />
          </form>
          <DataTable
            columns={tokenColumns}
            rows={tokens}
            rowKey={(t) => t.id}
            cell={tokenCell}
            highlight={freshToken ?? undefined}
            emptyMessage="No tokens yet — the API is all quiet."
          />
        </FormSection>
      {:else if value === 'workspaces'}
        <Stack gap="md">
          <Row gap="sm">
            <SegmentedControl
              size="sm"
              label="Show"
              bind:value={resource}
              options={[
                { value: 'workspaces', label: `Workspaces · ${hosted.length}` },
                { value: 'volumes', label: `Volumes · ${volumes.length}` },
              ]}
            />
            <Spacer />
            <Button
              variant="primary"
              shape="pill"
              icon="plus"
              label="New workspace"
              onclick={startCreate}
            />
          </Row>
          {#if resource === 'workspaces'}
            <ResourceList
              items={hosted}
              key={(w) => w.id}
              title={(w) => w.name}
              meta={(w) => w.failed ?? `${w.volume} · created ${w.created}`}
              status={(w) =>
                w.failed ? { label: 'Failed to start', tone: 'danger' } : STATUS[w.status]}
              label="Hosted workspaces"
              highlight={freshHosted ?? undefined}
              emptyText="No workspaces yet. Press “New workspace” to spin one up."
            >
              {#snippet actions(w)}
                <Button
                  size="sm"
                  icon="external"
                  label="Open {w.name}"
                  iconOnly
                  href="https://example.com"
                  disabled={w.status !== 'running'}
                  target="_blank"
                />
                <Button
                  size="sm"
                  icon={w.status === 'running' ? 'pause' : 'play'}
                  label={w.failed ? 'Try again' : w.status === 'running' ? 'Stop' : 'Start'}
                  iconOnly={!w.failed}
                  busy={w.status === 'starting'}
                  onclick={() => toggle(w)}
                />
                <ConfirmButton
                  size="sm"
                  label="Delete"
                  confirmLabel="Delete now"
                  onconfirm={async () => {
                    await later(400);
                    hosted = hosted.filter((i) => i.id !== w.id);
                  }}
                />
              {/snippet}
            </ResourceList>
          {:else}
            <ResourceList
              items={volumes}
              key={(v) => v.volume}
              title={(v) => v.volume}
              meta={(v) => `Used by ${v.usedBy.join(', ')}`}
              status={(v) =>
                v.usedBy.length > 1
                  ? { label: 'Shared', tone: 'info' }
                  : { label: 'Attached', tone: 'neutral' }}
              label="Volumes"
            />
          {/if}
          <StatusText message="Checked {clockFormat.format(checked)} · refreshes every 4 s" />
        </Stack>
      {:else}
        <Stack gap="md">
          <Alert tone="info">These settings affect everyone in the workspace.</Alert>
          <Disclosure
            title="Data retention"
            meta="Comments kept {numberFormat.format(savedRetention)} days"
          >
            <Row gap="sm" align="end">
              <Field label="Delete comments after (days)" error={retentionError}>
                {#snippet children({ id, errorId, invalid })}
                  <Input
                    {id}
                    type="number"
                    bind:value={retention}
                    min={7}
                    max={3650}
                    {invalid}
                    aria-describedby={invalid ? errorId : undefined}
                  />
                {/snippet}
              </Field>
              <Button
                label="Apply"
                disabled={retention === savedRetention || !!retentionError}
                onclick={() => {
                  savedRetention = retention;
                  liveSave('retention');
                }}
              />
              {@render mark('retention')}
            </Row>
          </Disclosure>
          <Disclosure title="Danger zone" tone="danger">
            <Stack gap="sm" align="start" class="settings-danger">
              <p>
                Deleting the workspace removes all dashboards, data sets and users. This cannot be
                undone.
              </p>
              <Button
                variant="danger-solid"
                icon="trash"
                label="Delete workspace"
                onclick={(event) => {
                  deleteOrigin = event.currentTarget;
                  deleting = true;
                }}
              />
            </Stack>
          </Disclosure>
        </Stack>
      {/if}
    {/snippet}
  </Tabs>
</Section>

{#snippet savedHint()}{@render mark('timezone')}{/snippet}
{#snippet languageHint()}{@render mark('language')}{/snippet}

<Dialog
  open={creatingWorkspace}
  origin={workspaceOrigin}
  title="New workspace"
  intro="It starts right away and shows up at the top of the list."
  onclose={() => (creatingWorkspace = false)}
>
  <form id="hosted-form" onsubmit={createHosted} novalidate>
    <Stack>
      <Field label="Name" required error={hostedError}>
        {#snippet children({ id, errorId, invalid })}
          <Input
            {id}
            bind:value={hostedName}
            {invalid}
            aria-describedby={invalid ? errorId : undefined}
            placeholder="report-builder"
            onblur={() => (hostedTouched = true)}
          />
        {/snippet}
      </Field>
      <Field label="Volume size" group>
        {#snippet children({ labelId })}
          <SegmentedControl
            labelledby={labelId}
            wrap
            bind:value={size}
            options={['512Mi', '1Gi', '2Gi', '5Gi'].map((v) => ({ value: v, label: v }))}
          />
        {/snippet}
      </Field>
      <RadioGroup
        label="Access"
        bind:value={access}
        options={[
          { value: 'rwo', label: 'One workspace', description: 'ReadWriteOnce' },
          { value: 'rwx', label: 'Shared', description: 'ReadWriteMany' },
        ]}
      />
    </Stack>
  </form>
  {#snippet actions()}
    <Button label="Cancel" onclick={() => (creatingWorkspace = false)} />
    <Button type="submit" form="hosted-form" variant="primary" icon="plus" label="Create" />
  {/snippet}
</Dialog>

<ConfirmDialog
  open={deleting}
  origin={deleteOrigin}
  title="Delete “{workspace}”?"
  message="All dashboards, data sets and users of this workspace are deleted for good."
  confirmLabel="Delete workspace"
  busyLabel="Deleting…"
  onconfirm={() => Promise.reject(new Error('Only the workspace owner can delete it.'))}
  onclose={() => (deleting = false)}
/>

<style>
  .indent {
    padding-left: calc(var(--control-sm) + var(--space-4));
  }
  .muted {
    display: block;
    color: var(--text-3);
    font-size: var(--fs-sm);
  }
  .token-name {
    display: block;
    font-weight: var(--fw-semibold);
  }
  .revoked {
    color: var(--text-3);
    text-decoration: line-through;
  }
  .secret {
    display: grid;
    gap: var(--space-1);
    max-width: 22rem;
    margin-top: var(--space-2);
    padding: var(--space-2) var(--space-3);
    border-radius: var(--radius-md);
    background: var(--accent-faint);
  }
  .secret-row {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    min-width: 0;
  }
  .secret code {
    min-width: 0;
    overflow: hidden;
    font-family: var(--font-mono);
    font-size: var(--fs-xs);
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .create {
    display: flex;
    flex-wrap: wrap;
    align-items: end;
    gap: var(--space-3);
  }
  .mark {
    display: inline-flex;
    animation: bb-rise var(--motion-base) var(--ease-out);
  }
  :global(.settings-danger) {
    color: var(--text-2);
    font-size: var(--fs-md);
  }
  @media (prefers-reduced-motion: reduce) {
    .mark {
      animation: none;
    }
  }
</style>
