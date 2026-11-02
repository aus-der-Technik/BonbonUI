<script lang="ts">
  /** Example page: start, stop and open hosted workspaces with polling, mock data (Storybook only). */
  import { onMount } from 'svelte';
  import Page from '../patterns/templates/Page.svelte';
  import Section from '../patterns/layout/Section.svelte';
  import Stack from '../patterns/layout/Stack.svelte';
  import Button from '../patterns/atoms/Button.svelte';
  import Input from '../patterns/atoms/Input.svelte';
  import StatusText from '../patterns/atoms/StatusText.svelte';
  import Alert from '../patterns/molecules/Alert.svelte';
  import ConfirmButton from '../patterns/molecules/ConfirmButton.svelte';
  import Field from '../patterns/molecules/Field.svelte';
  import RadioGroup from '../patterns/molecules/RadioGroup.svelte';
  import SegmentedControl from '../patterns/molecules/SegmentedControl.svelte';
  import Tabs from '../patterns/molecules/Tabs.svelte';
  import UserMenu from '../patterns/molecules/UserMenu.svelte';
  import Dialog from '../patterns/organisms/Dialog.svelte';
  import ResourceList, { type ResourceStatus } from '../patterns/organisms/ResourceList.svelte';
  import { every } from '../utils/poll';
  import { workspaces, type Workspace } from './mock';

  let tab = $state('workspaces');
  let items = $state<Workspace[]>(workspaces());
  let checked = $state(new Date());
  let creating = $state(false);
  let name = $state('');
  let size = $state('1Gi');
  let access = $state('rwo');
  let error = $state('');

  const STATUS: Record<Workspace['status'], ResourceStatus> = {
    running: { label: 'Running', tone: 'live' },
    stopped: { label: 'Stopped', tone: 'locked' },
    starting: { label: 'Starting', tone: 'draft', busy: true },
  };

  onMount(() =>
    every(() => {
      // A starting workspace is up by the next poll.
      items = items.map((w) => (w.status === 'starting' ? { ...w, status: 'running' } : w));
      checked = new Date();
    }, 4000),
  );

  function toggle(w: Workspace) {
    items = items.map((i) =>
      i.id === w.id ? { ...i, status: w.status === 'running' ? 'stopped' : 'starting' } : i,
    );
  }

  function create() {
    if (!name.trim()) return;
    items = [
      {
        id: `w${Date.now()}`,
        name: name.trim(),
        volume: `new · ${size}`,
        created: '19.10.2026',
        status: 'starting',
      },
      ...items,
    ];
    creating = false;
    name = '';
  }
</script>

<Page
  title="Workspaces"
  subtitle="hosted editors"
  width="medium"
  gap="md"
  footer="Example Corp · internal"
>
  {#snippet actions()}<UserMenu email="jane.doe@example.com" onsignout={() => {}} />{/snippet}

  <Section
    level="panel"
    title="Your workspaces"
    description="Start, stop and open the editors you host."
  >
    {#snippet actions()}
      <Button variant="primary" icon="plus" label="New" onclick={() => (creating = true)} />
    {/snippet}
    <Tabs
      label="Resources"
      bind:value={tab}
      tabs={[
        { value: 'workspaces', label: 'Workspaces', count: items.length },
        { value: 'volumes', label: 'Volumes', count: 2 },
      ]}
    >
      {#snippet panel()}
        <Stack gap="sm">
          {#if error}<Alert message={error} />{/if}
          <ResourceList
            {items}
            key={(w) => w.id}
            title={(w) => w.name}
            meta={(w) => `${w.volume} · created ${w.created}`}
            status={(w) => STATUS[w.status]}
            emptyText="No workspaces yet. Press New to spin one up."
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
                label={w.status === 'running' ? 'Stop' : 'Start'}
                iconOnly
                busy={w.status === 'starting'}
                onclick={() => toggle(w)}
              />
              <ConfirmButton
                size="sm"
                label="Delete"
                confirmLabel="Delete"
                onconfirm={() => (items = items.filter((i) => i.id !== w.id))}
              />
            {/snippet}
          </ResourceList>
          <StatusText
            message="Checked {checked.toLocaleTimeString('de-DE')} · refreshes every 4 s"
          />
        </Stack>
      {/snippet}
    </Tabs>
  </Section>
</Page>

<Dialog open={creating} title="New workspace" onclose={() => (creating = false)}>
  <Stack>
    <Field label="Name" required>
      {#snippet children({ id })}<Input
          {id}
          bind:value={name}
          placeholder="report-builder"
        />{/snippet}
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
  {#snippet actions()}
    <Button label="Cancel" onclick={() => (creating = false)} />
    <Button variant="primary" label="Create" disabled={!name.trim()} onclick={create} />
  {/snippet}
</Dialog>
