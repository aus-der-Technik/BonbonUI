<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Row from '../layout/Row.svelte';
  import Stack from '../layout/Stack.svelte';
  import Checkbox from './Checkbox.svelte';

  const { Story } = defineMeta({
    title: 'Atoms/Checkbox',
    component: Checkbox,
    tags: ['autodocs'],
    args: { label: 'Only with comments', checked: true, tone: 'accent' },
    argTypes: { tone: { control: 'inline-radio', options: ['accent', 'ok', 'danger'] } },
  });
</script>

<script lang="ts">
  let items = $state([
    { id: 'a', label: 'Invoices', checked: true },
    { id: 'b', label: 'Receipts', checked: false },
    { id: 'c', label: 'Contracts', checked: true },
  ]);
  const all = $derived(items.every((i) => i.checked));
  const some = $derived(!all && items.some((i) => i.checked));
</script>

<!-- Click it: the tick is drawn in like a pen stroke and the box settles with a tiny spring, so
the moment of "done" is felt, not just seen. Unchecking only fades — there is nothing to
celebrate. Pressing squishes the box like every other control you can act on. -->
<Story name="Playground" />

<!-- A grey description under the label explains the consequence. -->
<Story name="With description" asChild>
  <Stack gap="sm">
    <Checkbox
      label="Send a copy to me"
      description="You get the same e-mail as the recipient."
      checked
    />
    <Checkbox label="Archive after sending" description="Moves the thread out of the inbox." />
  </Stack>
</Story>

<!-- A "select all" box is indeterminate while only some are checked. -->
<Story name="Select all" asChild>
  <Stack gap="xs">
    <Checkbox
      label="All documents"
      checked={all}
      indeterminate={some}
      onchange={(e) => {
        const on = e.currentTarget.checked;
        items = items.map((i) => ({ ...i, checked: on }));
      }}
    />
    <Stack gap="xs" padding="none" style="padding-left: 1.6rem">
      {#each items as item (item.id)}
        <Checkbox label={item.label} bind:checked={item.checked} />
      {/each}
    </Stack>
  </Stack>
</Story>

<!-- `ok` for rows that are ready, `danger` for rows marked for deletion. Without a label it is a
bare box — give it an `aria-label`. -->
<Story name="Tones and states" asChild>
  <Row gap="lg">
    <Checkbox label="Accent" checked />
    <Checkbox label="Ready" tone="ok" checked />
    <Checkbox label="Delete" tone="danger" checked />
    <Checkbox label="Disabled" disabled />
    <Checkbox aria-label="Select row" checked />
  </Row>
</Story>
