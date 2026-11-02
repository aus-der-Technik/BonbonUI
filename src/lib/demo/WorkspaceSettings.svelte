<script lang="ts">
  /** Example page: workspace settings with tabs and form sections, mock data (Storybook only). */
  import Page from '../patterns/templates/Page.svelte';
  import Grid from '../patterns/layout/Grid.svelte';
  import Section from '../patterns/layout/Section.svelte';
  import Stack from '../patterns/layout/Stack.svelte';
  import Button from '../patterns/atoms/Button.svelte';
  import Input from '../patterns/atoms/Input.svelte';
  import Link from '../patterns/atoms/Link.svelte';
  import ProgressBar from '../patterns/atoms/ProgressBar.svelte';
  import Select from '../patterns/atoms/Select.svelte';
  import Switch from '../patterns/atoms/Switch.svelte';
  import Textarea from '../patterns/atoms/Textarea.svelte';
  import Tooltip from '../patterns/atoms/Tooltip.svelte';
  import Alert from '../patterns/molecules/Alert.svelte';
  import Breadcrumbs from '../patterns/molecules/Breadcrumbs.svelte';
  import CodeBlock from '../patterns/molecules/CodeBlock.svelte';
  import ConfirmButton from '../patterns/molecules/ConfirmButton.svelte';
  import Disclosure from '../patterns/molecules/Disclosure.svelte';
  import Field from '../patterns/molecules/Field.svelte';
  import RadioGroup from '../patterns/molecules/RadioGroup.svelte';
  import Tabs from '../patterns/molecules/Tabs.svelte';
  import UserMenu from '../patterns/molecules/UserMenu.svelte';
  import ConfirmDialog from '../patterns/organisms/ConfirmDialog.svelte';
  import DataTable, { type Column } from '../patterns/organisms/DataTable.svelte';
  import FormSection from '../patterns/organisms/FormSection.svelte';
  import SideNav from '../patterns/organisms/SideNav.svelte';
  import Toaster from '../patterns/organisms/Toaster.svelte';
  import { dateTimeFormat } from '../utils/format';
  import { celebrate } from '../utils/delight';
  import { ToastQueue } from '../utils/toasts.svelte';
  import { navGroups } from './mock';

  interface Token {
    id: string;
    name: string;
    scope: string;
    created: string;
    lastUsed: string | null;
  }

  let tab = $state('general');
  let name = $state('Research Workspace');
  let description = $state('Dashboards and data for the research team.');
  let timezone = $state('Europe/Berlin');
  let language = $state('en');
  let theme = $state<'system' | 'light' | 'dark'>('system');
  let weekStart = $state<'monday' | 'sunday'>('monday');
  let notify = $state({ digest: true, mentions: true, failures: true, product: false });
  let digest = $state<'daily' | 'weekly'>('daily');
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
  let fresh = $state<string | null>(null);
  let deleting = $state(false);
  let saving = $state(false);
  const toasts = new ToastQueue();

  const nameError = $derived(name.trim() ? undefined : 'The workspace needs a name');
  const tokenColumns: Column[] = [
    { key: 'name', label: 'Name' },
    { key: 'scope', label: 'Scope', nowrap: true },
    { key: 'lastUsed', label: 'Last used', nowrap: true, hideOnMobile: true },
    { key: 'actions', label: '', align: 'end' },
  ];

  // The appearance setting drives the real theme, so the page shows what it changes.
  $effect(() => {
    if (theme === 'system') delete document.documentElement.dataset['theme'];
    else document.documentElement.dataset['theme'] = theme;
  });

  function save(event: MouseEvent) {
    if (nameError) return;
    const origin = event.currentTarget as Element;
    saving = true;
    setTimeout(() => {
      saving = false;
      toasts.push('Saved. Nice.');
      celebrate(origin);
    }, 600);
  }

  function createToken() {
    const id = `tok_${tokens.length + 1}`;
    fresh = `live_${Math.random().toString(16).slice(2).padEnd(14, '0')}${Math.random().toString(16).slice(2, 18)}`;
    tokens = [
      ...tokens,
      {
        id,
        name: `Token ${tokens.length + 1}`,
        scope: 'read',
        created: new Date().toISOString(),
        lastUsed: null,
      },
    ];
  }
</script>

{#snippet tokenCell(token: Token, column: Column)}
  {#if column.key === 'name'}
    <span class="token-name">{token.name}</span>
    <span class="muted">created {dateTimeFormat.format(new Date(token.created))}</span>
  {:else if column.key === 'scope'}
    {token.scope}
  {:else if column.key === 'lastUsed'}
    <span class="muted"
      >{token.lastUsed ? dateTimeFormat.format(new Date(token.lastUsed)) : 'Never'}</span
    >
  {:else}
    <ConfirmButton
      size="sm"
      label="Revoke"
      confirmLabel="Revoke now"
      busyLabel="Revoking…"
      onconfirm={() => (tokens = tokens.filter((t) => t.id !== token.id))}
    />
  {/if}
{/snippet}

<Page title="Admin" subtitle="workspace settings" gap="md" footer="Example Corp · internal">
  {#snippet actions()}
    <UserMenu email="jane.doe@example.com" name="Jane Doe" onsignout={() => {}} />
  {/snippet}
  {#snippet sidebar()}
    <SideNav groups={navGroups('settings')} onnavigate={(_, event) => event.preventDefault()} />
  {/snippet}

  <Breadcrumbs items={[{ label: 'Administration', href: '#' }, { label: 'Settings' }]} />

  <Section level="panel" title="Settings" description="Applies to everyone in {name}.">
    <Tabs
      label="Settings"
      bind:value={tab}
      tabs={[
        { value: 'general', label: 'General' },
        { value: 'notifications', label: 'Notifications' },
        { value: 'api', label: 'API access', count: tokens.length },
        { value: 'advanced', label: 'Advanced' },
      ]}
    >
      {#snippet panel(value)}
        {#if value === 'general'}
          <FormSection
            title="Workspace"
            description="Name and description are shown to everyone in the workspace."
          >
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
            <Field label="Description" hint="Up to 280 characters">
              {#snippet children({ id })}
                <Textarea {id} bind:value={description} maxlength={280} counter rows={3} />
              {/snippet}
            </Field>
          </FormSection>
          <FormSection
            title="Region"
            description="Dates and times in dashboards and exports use these."
          >
            <Grid columns={2} min="12rem">
              <Field label="Time zone">
                {#snippet children({ id })}
                  <Select
                    {id}
                    bind:value={timezone}
                    options={[
                      { value: 'Europe/Berlin', label: 'Europe/Berlin' },
                      { value: 'Europe/London', label: 'Europe/London' },
                      { value: 'UTC', label: 'UTC' },
                    ]}
                  />
                {/snippet}
              </Field>
              <Field label="Language">
                {#snippet children({ id })}
                  <Select
                    {id}
                    bind:value={language}
                    options={[
                      { value: 'en', label: 'English' },
                      { value: 'de', label: 'Deutsch' },
                    ]}
                  />
                {/snippet}
              </Field>
            </Grid>
            <RadioGroup
              label="Week starts on"
              orientation="horizontal"
              bind:value={weekStart}
              options={[
                { value: 'monday', label: 'Monday' },
                { value: 'sunday', label: 'Sunday' },
              ]}
            />
          </FormSection>
          <FormSection title="Appearance" description="Applies to this browser only.">
            <RadioGroup
              label="Theme"
              bind:value={theme}
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
            {#snippet footer()}
              <Button
                variant="primary"
                label="Save changes"
                busy={saving}
                busyLabel="Saving…"
                disabled={!!nameError}
                onclick={save}
              />
            {/snippet}
          </FormSection>
        {:else if value === 'notifications'}
          <FormSection title="E-mail" description="Sent to jane.doe@example.com.">
            <Switch
              label="Summary e-mail"
              description="New feedback and changed data at a glance"
              bind:checked={notify.digest}
            />
            {#if notify.digest}
              <div class="indent">
                <RadioGroup
                  label="How often"
                  orientation="horizontal"
                  bind:value={digest}
                  options={[
                    { value: 'daily', label: 'Daily' },
                    { value: 'weekly', label: 'Weekly' },
                  ]}
                />
              </div>
            {/if}
            <Switch
              label="Mentions"
              description="When someone mentions you in a comment"
              bind:checked={notify.mentions}
            />
            <Switch
              label="Failed imports"
              description="When a scheduled import stops with an error"
              bind:checked={notify.failures}
            />
            <Switch
              label="Product news"
              description="A few times a year"
              bind:checked={notify.product}
            />
            {#snippet footer()}
              <Button
                variant="primary"
                label="Save changes"
                onclick={() => toasts.push('Notifications saved.')}
              />
            {/snippet}
          </FormSection>
        {:else if value === 'api'}
          <FormSection title="Usage" description="Requests this month across all tokens.">
            <ProgressBar
              value={8240}
              max={10000}
              label="8.240 of 10.000 requests"
              showValue
              tone="warn"
            />
            <p class="muted">
              The quota resets on 1 November. Read the <Link
                href="https://example.com/docs"
                external>API documentation</Link
              >.
            </p>
          </FormSection>
          <FormSection
            title="Tokens"
            description="Tokens act with your permissions. Revoke the ones you no longer use."
          >
            {#if fresh}
              <Alert tone="ok">Copy the new token now — it is shown only once.</Alert>
              <CodeBlock label="New token" code={fresh} secret />
            {/if}
            <DataTable
              columns={tokenColumns}
              rows={tokens}
              rowKey={(t) => t.id}
              cell={tokenCell}
              emptyText="No tokens yet — the API is all quiet."
            />
            {#snippet footer()}
              <Tooltip text="Read-only by default; change the scope afterwards">
                <Button icon="key" label="Create token" onclick={createToken} />
              </Tooltip>
            {/snippet}
          </FormSection>
        {:else}
          <Alert tone="info">These settings affect everyone in the workspace.</Alert>
          <Disclosure title="Data retention" meta="Comments kept 180 days">
            <Field label="Delete comments after (days)">
              {#snippet children({ id })}<Input
                  {id}
                  type="number"
                  value={180}
                  size="sm"
                />{/snippet}
            </Field>
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
                onclick={() => (deleting = true)}
              />
            </Stack>
          </Disclosure>
        {/if}
      {/snippet}
    </Tabs>
  </Section>
</Page>

<ConfirmDialog
  open={deleting}
  title="Delete “{name}”?"
  message="All dashboards, data sets and users of this workspace are deleted for good."
  confirmLabel="Delete workspace"
  busyLabel="Deleting…"
  onconfirm={() => Promise.reject(new Error('Only the workspace owner can delete it.'))}
  onclose={() => (deleting = false)}
/>

<Toaster toasts={toasts.items} ondismiss={(id) => toasts.dismiss(id)} />

<style>
  .indent {
    padding-left: calc(38px + var(--space-3));
  }
  .muted {
    color: var(--text-3);
    font-size: var(--fs-sm);
  }
  .token-name {
    display: block;
    font-weight: var(--fw-semibold);
  }
  :global(.settings-danger) {
    color: var(--text-2);
    font-size: var(--fs-md);
  }
</style>
