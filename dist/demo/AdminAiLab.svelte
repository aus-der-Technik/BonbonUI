<script lang="ts">
  /**
   * Admin console › AI lab (Storybook only): the prompt playground, the classifier bench and the
   * translator as tabs. Every tab stays alive once opened, so an answer keeps streaming while
   * you probe the classifier.
   */
  import Tabs from '../patterns/molecules/Tabs.svelte';
  import AdminAiClassifier from './AdminAiClassifier.svelte';
  import AdminAiPlayground from './AdminAiPlayground.svelte';
  import AdminAiTranslator from './AdminAiTranslator.svelte';
  import AdminHead from './AdminHead.svelte';
  import type { SectionProps } from './admin';

  type Tab = 'playground' | 'classifier' | 'translator';

  interface Props extends SectionProps {
    /** The open tab. */
    tab?: Tab;
    /** The playground asks its first example on load. */
    autoask?: boolean;
    /** The playground's stream breaks off half-way. */
    failing?: boolean;
    /** The classifier's probe matrix has run once. */
    probed?: boolean;
  }

  let { tab = 'playground', autoask = false, failing = false, probed = false }: Props = $props();

  let current = $derived<string>(tab);
  let opened = $state<string[]>([]);
  $effect(() => {
    if (!opened.includes(current)) opened = [...opened, current];
  });
</script>

<AdminHead section="ai" />

<Tabs
  label="AI lab"
  bind:value={current}
  tabs={[
    { value: 'playground', label: 'Playground', icon: 'chat' },
    { value: 'classifier', label: 'Classifier', icon: 'tag' },
    { value: 'translator', label: 'Translator', icon: 'globe' },
  ]}
>
  {#snippet panel(value)}
    {#each opened as key (key)}
      <div class="tab" hidden={key !== value}>
        {#if key === 'playground'}
          <AdminAiPlayground {autoask} {failing} />
        {:else if key === 'classifier'}
          <AdminAiClassifier {probed} />
        {:else}
          <AdminAiTranslator />
        {/if}
      </div>
    {/each}
  {/snippet}
</Tabs>

<style>
  .tab {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    padding-top: var(--space-4);
    min-width: 0;
  }
  .tab[hidden] {
    display: none;
  }
</style>
