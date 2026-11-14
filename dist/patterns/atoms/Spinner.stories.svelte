<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Row from '../layout/Row.svelte';
  import Spinner from './Spinner.svelte';

  const { Story } = defineMeta({
    title: 'Atoms/Spinner',
    component: Spinner,
    tags: ['autodocs'],
    args: { size: 20, label: 'Loading' },
  });
</script>

<!-- A candy comet rather than a stiff ring: the arc fades into its tail and gently speeds up and
slows down each turn, which feels alive instead of mechanical. With reduced motion it turns
slowly and evenly. Inside a Button it takes the button's text colour. -->
<Story name="Playground" />

<Story name="Sizes" asChild>
  <Row gap="md">
    <Spinner size={14} /><Spinner /><Spinner size={32} /><Spinner size={48} />
  </Row>
</Story>
