<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Popover from './Popover.svelte';
  import SegmentedControl from './SegmentedControl.svelte';
  import Button from '../atoms/Button.svelte';
  import Switch from '../atoms/Switch.svelte';
  import Row from '../layout/Row.svelte';
  import Stack from '../layout/Stack.svelte';

  const { Story } = defineMeta({
    title: 'Molecules/Popover',
    component: Popover,
    tags: ['autodocs'],
    argTypes: {
      placement: {
        control: 'select',
        options: ['bottom-start', 'bottom', 'bottom-end', 'top-start', 'top', 'top-end'],
      },
      variant: { control: 'select', options: ['primary', 'secondary', 'glass', 'ghost'] },
    },
  });
</script>

<script lang="ts">
  let view = $state('board');
  let compact = $state(false);
  let showDone = $state(true);
</script>

<!-- A filter panel behind a button; it grows out of its trigger (origin at the trigger's centre)
     so you see where it came from. Escape, a click outside or "Done" closes it. -->
<Story name="Filters" asChild>
  <Popover label="View options" icon="filter" title="View options" width="18rem">
    {#snippet children(close)}
      <Stack gap="md">
        <SegmentedControl
          label="Layout"
          options={[
            { value: 'board', label: 'Board' },
            { value: 'list', label: 'List' },
          ]}
          bind:value={view}
        />
        <Switch label="Compact cards" bind:checked={compact} />
        <Switch label="Show done" bind:checked={showDone} />
        <Row justify="end">
          <Button variant="primary" size="sm" label="Done" onclick={close} />
        </Row>
      </Stack>
    {/snippet}
  </Popover>
</Story>

<!-- An icon-only glass trigger that opens upwards and aligns to its right edge. -->
<Story name="Placement" asChild>
  <Row justify="end" padding="2xl">
    <Popover label="Share" icon="share" iconOnly variant="glass" placement="top-end" title="Share">
      <p style="margin:0;max-width:16rem;color:var(--text-2)">
        Anyone with the link can view this board. Invite people to let them edit.
      </p>
    </Popover>
  </Row>
</Story>

<!-- Your own trigger: spread the props the snippet receives onto it. -->
<Story name="Custom trigger" asChild>
  <Popover label="Status" padding="sm">
    {#snippet trigger(props)}
      <button
        type="button"
        {...props}
        style="font:inherit;font-weight:600;color:var(--text);padding:.35rem .8rem;border:.75px solid var(--pill-border);border-radius:var(--radius-pill);background:var(--pill-tint);box-shadow:var(--shadow-frosted);cursor:pointer"
      >
        <span style="color:var(--ok)">●</span> On track ▾
      </button>
    {/snippet}
    {#snippet children(close)}
      <Stack gap="xs">
        {#each ['On track', 'At risk', 'Off track'] as status (status)}
          <Button variant="ghost" size="sm" label={status} onclick={close} />
        {/each}
      </Stack>
    {/snippet}
  </Popover>
</Story>
