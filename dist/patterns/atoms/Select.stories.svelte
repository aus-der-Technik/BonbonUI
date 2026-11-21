<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Row from '../layout/Row.svelte';
  import Select from './Select.svelte';

  const { Story } = defineMeta({
    title: 'Atoms/Select',
    component: Select,
    tags: ['autodocs'],
    args: {
      'aria-label': 'Environment',
      value: 'prod',
      size: 'md',
      options: [
        { value: 'prod', label: 'Production' },
        { value: 'stage', label: 'Staging' },
        { value: 'dev', label: 'Development' },
        { value: 'old', label: 'Legacy (retired)', disabled: true },
      ],
    },
    argTypes: { size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] } },
  });

  const sort = [
    { value: 'new', label: 'Newest first' },
    { value: 'old', label: 'Oldest first' },
    { value: 'az', label: 'Name A–Z' },
  ];
</script>

<Story name="Playground" />

<Story name="Sizes" asChild>
  <Row>
    <Select size="sm" aria-label="Sort" value="new" options={sort} />
    <Select aria-label="Sort" value="old" options={sort} />
    <Select size="lg" aria-label="Sort" value="az" options={sort} />
  </Row>
</Story>
