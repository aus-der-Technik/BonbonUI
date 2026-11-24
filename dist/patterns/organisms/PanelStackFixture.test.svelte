<script lang="ts">
  // Test fixture: a group, then a person in it (not shipped).
  import PanelStack from './PanelStack.svelte';
  import StackPanel from './StackPanel.svelte';

  interface Props {
    group?: string | null;
    person?: string | null;
    onall?: () => void;
  }
  let { group = $bindable('Design'), person = $bindable(null), onall = () => {} }: Props = $props();
</script>

<PanelStack
  label="People"
  onclose={() => {
    group = null;
    person = null;
    onall();
  }}
>
  {#if group}
    <StackPanel title={group} width="20rem" onclose={() => (group = null)}>
      <button type="button" class="pick" onclick={() => (person = 'Ada')}>Ada</button>
    </StackPanel>
  {/if}
  {#if person}
    <StackPanel depth={1} title={person} width="20rem" onclose={() => (person = null)}>
      <p class="who">{person}</p>
    </StackPanel>
  {/if}
</PanelStack>
