<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import DatePicker from './DatePicker.svelte';
  import Field from './Field.svelte';
  import Grid from '../layout/Grid.svelte';
  import { NOW } from '../../demo/mock-collab';

  const { Story } = defineMeta({
    title: 'Molecules/DatePicker',
    component: DatePicker,
    tags: ['autodocs'],
    args: { label: 'Due date', today: NOW },
  });
</script>

<script lang="ts">
  let due = $state<Date | undefined>(new Date(2026, 10, 12));
  let start = $state<Date | undefined>();
</script>

<Story name="Playground" />

<!-- In a form: the Field's label points at the picker through `id`. -->
<Story name="In a form" asChild>
  <Grid columns={2} min="12rem" style="max-width:32rem">
    <Field label="Start">
      {#snippet children({ id })}<DatePicker {id} bind:value={start} today={NOW} />{/snippet}
    </Field>
    <Field label="Due">
      {#snippet children({ id })}
        <DatePicker {id} bind:value={due} today={NOW} min={start} />
      {/snippet}
    </Field>
  </Grid>
</Story>

<Story name="Disabled" args={{ value: NOW, disabled: true }} />
