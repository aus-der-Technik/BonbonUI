<script lang="ts">
  /** Example page: a two-pane translator, mock data (Storybook only). */
  import Page from '../patterns/templates/Page.svelte';
  import Row from '../patterns/layout/Row.svelte';
  import Spacer from '../patterns/layout/Spacer.svelte';
  import Button from '../patterns/atoms/Button.svelte';
  import LoadingOverlay from '../patterns/atoms/LoadingOverlay.svelte';
  import Select from '../patterns/atoms/Select.svelte';
  import StatusText from '../patterns/atoms/StatusText.svelte';
  import Textarea from '../patterns/atoms/Textarea.svelte';
  import CopyButton from '../patterns/molecules/CopyButton.svelte';
  import SplitPane from '../patterns/organisms/SplitPane.svelte';

  const LIMIT = 5000;
  const LANGS = [
    { value: 'de', label: 'German' },
    { value: 'en', label: 'English' },
    { value: 'fr', label: 'French' },
    { value: 'it', label: 'Italian' },
  ];
  const SAMPLE: Record<string, string> = {
    en: 'We are looking for a conference hotel in Leipzig for 300 people, ideally close to the main station.',
    fr: 'Nous cherchons un hôtel de congrès à Leipzig pour 300 personnes, idéalement près de la gare centrale.',
    it: 'Cerchiamo un hotel congressuale a Lipsia per 300 persone, idealmente vicino alla stazione centrale.',
    de: 'Wir suchen ein Tagungshotel in Leipzig für 300 Personen, idealerweise nahe dem Hauptbahnhof.',
  };

  let source = $state(SAMPLE['de'] ?? '');
  let from = $state('');
  let to = $state('en');
  let result = $state('');
  let busy = $state(false);
  let timer: ReturnType<typeof setTimeout> | undefined;

  const tooLong = $derived(source.length > LIMIT);

  function translate() {
    clearTimeout(timer);
    if (!source.trim() || tooLong) return;
    busy = true;
    timer = setTimeout(() => {
      result = SAMPLE[to] ?? source;
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
    if (!from) return;
    [from, to] = [to, from];
    source = result;
  }
</script>

<Page
  title="Translator"
  subtitle="text in any language"
  width="wide"
  gap="md"
  footer="Example Corp · internal"
>
  <SplitPane
    label="Translator"
    onswap={swap}
    swapDisabled={!from || busy}
    swapLabel="Swap languages"
    minHeight="20rem"
  >
    {#snippet startHeader()}
      <Select
        aria-label="Source language"
        bind:value={from}
        options={[{ value: '', label: 'Detect language' }, ...LANGS]}
      />
      <Spacer />
      <StatusText message={from ? 'manual' : 'detected · de'} />
    {/snippet}
    {#snippet endHeader()}
      <Select aria-label="Target language" bind:value={to} options={LANGS} />
      <Spacer />
      {#if result}<CopyButton value={result} iconOnly />{/if}
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
        {#if tooLong}<p class="error">
            The text is longer than {LIMIT.toLocaleString('de-DE')} characters.
          </p>
        {:else if result}<p>{result}</p>
        {:else}<p class="placeholder">The translation appears here.</p>{/if}
      </div>
      <LoadingOverlay active={busy} label="Translating…" />
    {/snippet}
  </SplitPane>
  <Row justify="end">
    <Button
      variant="primary"
      label="Translate"
      busyLabel="Translating…"
      {busy}
      disabled={tooLong}
      onclick={translate}
    />
  </Row>
</Page>

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
    color: var(--danger);
  }
</style>
