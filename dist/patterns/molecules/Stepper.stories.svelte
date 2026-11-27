<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Stepper from './Stepper.svelte';
  import Button from '../atoms/Button.svelte';
  import Layer from '../layout/Layer.svelte';
  import Row from '../layout/Row.svelte';

  const checkout = [
    { label: 'Cart', description: '3 items' },
    { label: 'Address', description: 'Where it goes' },
    { label: 'Payment', description: 'Card or invoice' },
    { label: 'Done' },
  ];

  const { Story } = defineMeta({
    title: 'Molecules/Stepper',
    component: Stepper,
    tags: ['autodocs'],
    args: { steps: checkout, current: 1, orientation: 'horizontal' },
    argTypes: {
      orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'] },
      current: { control: { type: 'range', min: 0, max: 4 } },
    },
  });
</script>

<script lang="ts">
  let current = $state(2);
</script>

<!-- A checkout: done steps carry a check, the current one glows. Narrow it and it folds into a
column. -->
<Story name="Horizontal" />

<!-- Onboarding on a panel, vertical; finished steps are buttons to jump back. -->
<Story name="Vertical and clickable" asChild>
  <Layer level="panel" style="max-width:24rem">
    <Stepper
      orientation="vertical"
      {current}
      onselect={(index) => (current = index)}
      steps={[
        { label: 'Create the workspace', description: 'Name and address' },
        { label: 'Invite your team', description: '4 of 6 accepted' },
        { label: 'Create the first board' },
        { label: 'Connect the calendar' },
      ]}
    />
    <Row justify="end">
      <Button size="sm" label="Back" disabled={current === 0} onclick={() => (current -= 1)} />
      <Button
        size="sm"
        variant="primary"
        label="Next"
        disabled={current === 4}
        onclick={() => (current += 1)}
      />
    </Row>
  </Layer>
</Story>

<!-- A failed import step turns red. -->
<Story
  name="With an error"
  args={{
    current: 2,
    steps: [
      { label: 'Upload' },
      { label: 'Map columns' },
      { label: 'Validate', status: 'error', description: '12 rows need a date' },
      { label: 'Import' },
    ],
  }}
/>
