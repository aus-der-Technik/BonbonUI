<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import TaskList from './TaskList.svelte';
  import Layer from '../layout/Layer.svelte';
  import { checklist } from '../../demo/mock-collab';

  const { Story } = defineMeta({
    title: 'Molecules/TaskList',
    component: TaskList,
    tags: ['autodocs'],
    args: { title: 'Launch checklist', items: checklist() },
  });
</script>

<script lang="ts">
  let items = $state(checklist());
</script>

<Story name="Playground" />

<!-- On a panel: tick items off, type and press Enter to add one, hover to remove. Tick the last open
     item: a few sprinkles fly from its box and "All done — that's a sweet day." appears — once,
     at the end of the task. -->
<Story name="On a panel" asChild>
  <Layer level="panel" style="max-width:26rem">
    <TaskList title="Launch checklist" bind:items sinkDone />
  </Layer>
</Story>

<!-- Read-only, without the progress bar. -->
<Story name="Read-only" args={{ editable: false, progress: false, title: undefined }} />

<Story name="Empty" args={{ items: [], title: 'Today' }} />
