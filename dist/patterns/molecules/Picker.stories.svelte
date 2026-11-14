<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Picker, { type PickerOption } from './Picker.svelte';
  import UserMenu from './UserMenu.svelte';
  import Row from '../layout/Row.svelte';

  const datasets: PickerOption[] = [
    { value: 'products', title: 'Products', meta: 'catalog.products · 1,284 rows' },
    { value: 'campaigns', title: 'Campaigns', meta: 'catalog.campaigns · 312 rows' },
    {
      value: 'customers',
      title: 'Customers',
      meta: 'catalog.customers · 96 rows',
      marks: [{ label: 'read-only' }],
    },
    {
      value: 'bundles',
      title: 'Bundles 2026',
      meta: 'catalog.bundles · 0 rows',
      marks: [{ label: 'draft', tone: 'draft' }],
    },
  ];

  const { Story } = defineMeta({
    title: 'Molecules/Picker & UserMenu',
    component: Picker,
    tags: ['autodocs'],
    parameters: { layout: 'padded', docs: { story: { height: '24rem' } } },
  });
</script>

<script lang="ts">
  let dataset = $state<string | null>('products');
</script>

<!-- A header switcher between data sets: a frosted pill that drops a glass listbox. Options carry
     a meta line and marks; the chosen one is tinted with a tick. -->
<Story name="Picker" asChild>
  <Picker options={datasets} bind:value={dataset} label="Data set" heading="Data sets" />
</Story>

<!-- Nothing chosen yet. -->
<Story name="Picker placeholder" asChild>
  <Picker
    options={datasets}
    value={null}
    label="Data set"
    placeholder="Choose a data set"
    placeholderMeta="4 available"
  />
</Story>

<!-- The account chip at the right end of a header. -->
<Story name="UserMenu" asChild>
  <Row justify="end">
    <UserMenu email="jane.doe@example.com" name="Jane Doe" onsignout={() => {}} />
  </Row>
</Story>
