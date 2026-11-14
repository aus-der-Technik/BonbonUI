<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import IconButton from '../atoms/IconButton.svelte';
  import Layer from '../layout/Layer.svelte';
  import Row from '../layout/Row.svelte';
  import ToolGroup from './ToolGroup.svelte';

  const { Story } = defineMeta({
    title: 'Molecules/ToolGroup',
    component: ToolGroup,
    tags: ['autodocs'],
  });
</script>

<script lang="ts">
  let tool = $state('select');
</script>

<!-- One Tab stop for a whole row of tools: Tab lands on the last used (or the pressed) tool, the
arrow keys move between tools, Home and End jump to the ends, disabled tools are skipped. -->
<Story name="Tool bar" asChild>
  <Layer level="panel" direction="horizontal" padding="xs" gap="xs" wrap={false}>
    <ToolGroup label="History">
      <IconButton icon="undo" label="Undo" shortcut={['Mod', 'Z']} />
      <IconButton icon="redo" label="Redo" shortcut={['Mod', 'Shift', 'Z']} disabled />
    </ToolGroup>
    <ToolGroup label="Align">
      <IconButton icon="align-left" label="Align left" pressed />
      <IconButton icon="align-center" label="Align centre" pressed={false} />
      <IconButton icon="align-right" label="Align right" pressed={false} />
    </ToolGroup>
  </Layer>
</Story>

<!-- A vertical palette at the side of a canvas: the up and down arrows walk it. -->
<Story name="Vertical palette" asChild>
  <Row padding="2xl">
    <Layer level="panel" padding="xs" wrap={false}>
      <ToolGroup label="Tools" orientation="vertical">
        {#each [['select', 'compass', 'Select'], ['text', 'type', 'Text'], ['shape', 'square', 'Shape'], ['image', 'image', 'Image']] as const as [id, icon, label] (id)}
          <IconButton
            {icon}
            {label}
            tooltipPlacement="top"
            pressed={tool === id}
            onclick={() => (tool = id)}
          />
        {/each}
      </ToolGroup>
    </Layer>
  </Row>
</Story>
