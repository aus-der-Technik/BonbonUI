<script lang="ts">
  /**
   * AI lab › Translator (Storybook only): two panes, the source language detected unless you
   * pick one, translated a moment after you stop typing. Swap, copy and the busy overlay all sit
   * on the pane they act on.
   */
  import Row from '../patterns/layout/Row.svelte';
  import Spacer from '../patterns/layout/Spacer.svelte';
  import Button from '../patterns/atoms/Button.svelte';
  import LoadingOverlay from '../patterns/atoms/LoadingOverlay.svelte';
  import Select from '../patterns/atoms/Select.svelte';
  import StatusText from '../patterns/atoms/StatusText.svelte';
  import Textarea from '../patterns/atoms/Textarea.svelte';
  import CopyButton from '../patterns/molecules/CopyButton.svelte';
  import SplitPane from '../patterns/organisms/SplitPane.svelte';
  import { numberFormat } from '../utils/format';
  import {
    TRANSLATOR_LANGUAGES,
    TRANSLATOR_SAMPLES,
    detectLanguage,
    translate as translateText,
    type TranslatorLanguage,
  } from './mock-ai';

  const LIMIT = 5000;
  const NAME = Object.fromEntries(TRANSLATOR_LANGUAGES.map((l) => [l.value, l.label])) as Record<
    TranslatorLanguage,
    string
  >;

  let source = $state(TRANSLATOR_SAMPLES.en);
  let from = $state<TranslatorLanguage | ''>('');
  let to = $state<TranslatorLanguage>('de');
  let result = $state('');
  let busy = $state(false);
  let timer: ReturnType<typeof setTimeout> | undefined;

  const tooLong = $derived(source.length > LIMIT);
  const detected = $derived(detectLanguage(source));
  const sourceLanguage = $derived(from || detected);

  function translate() {
    clearTimeout(timer);
    if (!source.trim() || tooLong) return;
    busy = true;
    timer = setTimeout(() => {
      result = translateText(source, to);
      busy = false;
    }, 700);
  }

  // Translate as you type, after a short pause.
  $effect(() => {
    void source;
    void to;
    clearTimeout(timer);
    timer = setTimeout(translate, 700);
    return () => clearTimeout(timer);
  });

  function swap() {
    const next = sourceLanguage;
    from = to;
    to = next;
    source = result;
  }
</script>

<SplitPane
  label="Translator"
  onswap={swap}
  swapDisabled={!result || busy || sourceLanguage === to}
  swapLabel="Swap languages"
  minHeight="20rem"
>
  {#snippet startHeader()}
    <Select
      aria-label="Source language"
      bind:value={from}
      options={[{ value: '', label: 'Detect language' }, ...TRANSLATOR_LANGUAGES]}
    />
    <Spacer />
    <StatusText message={from ? 'picked' : `detected · ${NAME[detected]}`} />
  {/snippet}
  {#snippet endHeader()}
    <Select aria-label="Target language" bind:value={to} options={TRANSLATOR_LANGUAGES} />
    <Spacer />
    {#if result}<CopyButton value={result} iconOnly label="Copy translation" />{/if}
  {/snippet}
  {#snippet start()}
    <Textarea
      variant="plain"
      bind:value={source}
      counter
      limit={LIMIT}
      aria-label="Text to translate"
      placeholder="Type or paste text"
      onkeydown={(e) => (e.metaKey || e.ctrlKey) && e.key === 'Enter' && translate()}
    />
  {/snippet}
  {#snippet end()}
    <div class="output" aria-live="polite">
      {#if tooLong}
        <p class="error">
          The text is longer than {numberFormat.format(LIMIT)} characters. Shorten it to translate.
        </p>
      {:else if result}<p>{result}</p>
      {:else}<p class="placeholder">The translation appears here.</p>{/if}
    </div>
    <LoadingOverlay active={busy} label="Translating…" />
  {/snippet}
</SplitPane>
<Row>
  <StatusText message="Translates a moment after you stop typing · ⌘ Enter translates now" />
  <Spacer />
  <Button
    variant="primary"
    label="Translate"
    busyLabel="Translating…"
    {busy}
    disabled={tooLong || !source.trim()}
    onclick={translate}
  />
</Row>

<style>
  .output {
    padding: var(--space-4);
    font-size: var(--fs-lg);
    white-space: pre-wrap;
  }
  .placeholder {
    color: var(--text-3);
    font-style: italic;
  }
  .error {
    color: var(--danger-strong);
  }
</style>
