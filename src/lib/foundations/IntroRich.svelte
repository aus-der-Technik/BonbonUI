<script lang="ts">
  /** Storybook-only: one line of doc text in which `backticked` parts are set as code. */
  interface Props {
    text: string;
  }
  let { text }: Props = $props();

  const parts = $derived(text.split('`'));
</script>

{#each parts as part, i (i)}{#if i % 2}<code>{part}</code>{:else}{part}{/if}{/each}
