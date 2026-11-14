<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Row from './Row.svelte';
  import Spacer from './Spacer.svelte';
  import Button from '../atoms/Button.svelte';
  import Demo from '../../foundations/DemoBox.svelte';

  const { Story } = defineMeta({
    title: 'Layout/Row',
    component: Row,
    tags: ['autodocs'],
  });
</script>

<!-- A toolbar: left things, a Spacer, right things — vertically centred, wrapping when narrow. -->
<Story name="Toolbar" asChild>
  <Row>
    <Button size="sm" icon="chevron-left" label="Back" />
    <strong>Quarterly report</strong>
    <Spacer />
    <Button size="sm" icon="share" label="Share" />
    <Button size="sm" variant="primary" icon="download" label="Export" />
  </Row>
</Story>

<!-- Wraps by default; `justify="center"` centres the lines. -->
<Story name="Wrapping chips" asChild>
  <Row justify="center">
    {#each ['Design', 'Engineering', 'Marketing', 'Sales', 'Support', 'Finance', 'Legal', 'People'] as t (t)}
      <Demo label={t} />
    {/each}
  </Row>
</Story>
