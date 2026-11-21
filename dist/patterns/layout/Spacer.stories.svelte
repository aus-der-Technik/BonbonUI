<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Spacer from './Spacer.svelte';
  import Row from './Row.svelte';
  import Demo from '../../foundations/DemoBox.svelte';

  const { Story } = defineMeta({
    title: 'Layout/Spacer',
    component: Spacer,
    tags: ['autodocs'],
  });
</script>

<!-- Without a size the Spacer takes all free room, pushing what follows to the end. -->
<Story name="Push apart" asChild>
  <Row><Demo label="Title" /><Spacer /><Demo label="Action" /></Row>
</Story>

<!-- With a size it is a fixed gap from the spacing scale. -->
<Story name="Fixed gap" asChild>
  <Row gap="none"><Demo label="A" /><Spacer size="xl" /><Demo label="B" /></Row>
</Story>
