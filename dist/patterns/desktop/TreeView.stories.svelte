<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import TreeView from './TreeView.svelte';
  import { fileTree } from '../../demo/mock-desktop';

  const { Story } = defineMeta({
    title: 'Organisms/Desktop & OS/TreeView',
    component: TreeView,
    tags: ['autodocs'],
  });
</script>

<script lang="ts">
  let value = $state('window');
  let expanded = $state(['src', 'lib']);
</script>

<!-- A project tree. Up / Down move, Right opens or steps in, Left closes or steps out, Enter
     selects.

     Why not a solid coloured row for the selection? In a tree you scan icons and names; a solid
     slab of colour hides the file-type colours exactly where you are looking. The selected
     layer keeps them visible and matches the SourceList next to it. -->
<Story name="TreeView" asChild>
  <div style="max-width:20rem">
    <TreeView nodes={fileTree} bind:value bind:expanded label="Project files" />
  </div>
</Story>
