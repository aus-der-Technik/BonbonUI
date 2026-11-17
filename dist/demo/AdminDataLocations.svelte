<script lang="ts">
  /**
   * Admin console · Data · Locations (Storybook only): look up places, airports, stations and
   * postal codes from four lookups at once and see them on a map. If one lookup times out, the
   * others still answer, and the failure is named next to the search with a retry.
   */
  import { onMount } from 'svelte';
  import Layer from '../patterns/layout/Layer.svelte';
  import Row from '../patterns/layout/Row.svelte';
  import Spacer from '../patterns/layout/Spacer.svelte';
  import Button from '../patterns/atoms/Button.svelte';
  import LoadingBar from '../patterns/atoms/LoadingBar.svelte';
  import Alert from '../patterns/molecules/Alert.svelte';
  import Autocomplete, { type Suggestion } from '../patterns/molecules/Autocomplete.svelte';
  import ToggleChip from '../patterns/molecules/ToggleChip.svelte';
  import MapView from '../patterns/organisms/MapView.svelte';
  import { ENDPOINTS, ENDPOINT_HEX, frankfurtHits, type Endpoint, type Hit } from './mock';

  interface Props {
    /** The landmarks lookup times out (also: search for anything containing "timeout"). */
    failing?: boolean;
  }

  let { failing = false }: Props = $props();

  const SUGGESTIONS: Suggestion[] = [
    { label: 'Frankfurt am Main', meta: 'Place · Hesse', color: ENDPOINT_HEX.places },
    { label: 'Frankfurt (Main) Hbf', meta: 'Main station · Hesse', color: ENDPOINT_HEX.landmarks },
    { label: 'Frankfurt Airport', meta: 'Airport · FRA · Hesse', color: ENDPOINT_HEX.landmarks },
    { label: '60311', meta: 'Postal code · Frankfurt am Main', color: ENDPOINT_HEX.plz },
    {
      label: 'Frankfurt timeout test',
      meta: 'Shows a lookup that times out',
      color: 'var(--text-3)',
    },
  ];

  let term = $state('');
  let suggestions = $state<Suggestion[]>([]);
  let hits = $state<Hit[]>([]);
  let searched = $state('');
  let loading = $state(false);
  let failed = $state<Endpoint | null>(null);
  let visible = $state<Record<Endpoint, boolean>>({
    places: true,
    landmarks: true,
    plz: true,
    geo: true,
  });

  const counts = $derived(
    Object.fromEntries(
      ENDPOINTS.map(({ id }) => [id, hits.filter((h) => h.endpoint === id).length]),
    ) as Record<Endpoint, number>,
  );
  const shown = $derived(hits.filter((h) => visible[h.endpoint]));
  const failedLabel = $derived(ENDPOINTS.find((e) => e.id === failed)?.label.toLowerCase());

  function query(value: string) {
    const needle = value.toLowerCase();
    suggestions = SUGGESTIONS.filter((s) => s.label.toLowerCase().includes(needle));
  }

  /** Asks all four lookups; `retry` asks the failed one again, which then answers. */
  function search(value: string, retry = false) {
    loading = true;
    setTimeout(() => {
      const breaks = !retry && (failing || /timeout/i.test(value));
      hits = frankfurtHits().filter((h) => !breaks || h.endpoint !== 'landmarks');
      failed = breaks ? 'landmarks' : null;
      searched = value;
      loading = false;
    }, 500);
  }

  // A failing lookup only shows after a search: run one so the story opens on it.
  onMount(() => {
    if (!failing) return;
    term = 'Frankfurt am Main';
    search(term);
  });
</script>

<Layer level="panel" gap="sm" class="location-search" data-note="lookup">
  <Autocomplete
    bind:value={term}
    {suggestions}
    {loading}
    label="Search a place, airport, station or postal code"
    placeholder="Place, airport, station or postal code — e.g. Frankfurt, FRA, 60311"
    onquery={query}
    onsearch={(value) => search(value)}
  />
  <Row gap="sm">
    {#each ENDPOINTS as endpoint (endpoint.id)}
      <ToggleChip
        label={endpoint.label}
        color={endpoint.color}
        count={failed === endpoint.id ? '–' : counts[endpoint.id]}
        title={endpoint.id === 'geo' ? 'Postal codes within 15 km of the best match' : undefined}
        bind:pressed={visible[endpoint.id]}
      />
    {/each}
    <Spacer />
    <span class="status" aria-live="polite">
      {#if loading}
        Searching…
      {:else if searched}
        {hits.length} results for “{searched}”
      {:else}
        Type to search; pick a suggestion or press Enter
      {/if}
    </span>
  </Row>
  {#if failed && !loading}
    <Alert
      tone="warn"
      message="The {failedLabel} lookup timed out after 3 s — the other results are shown."
    >
      {#snippet actions()}
        <Button size="sm" icon="refresh" label="Retry" onclick={() => search(searched, true)} />
      {/snippet}
    </Alert>
  {/if}
  <LoadingBar active={loading} />
</Layer>

<Layer level="panel" padding="none" class="location-map" aria-label="Map">
  <MapView markers={shown} />
</Layer>

<style>
  /* The suggestion list must overlap the map below. */
  :global(.location-search) {
    position: relative;
    z-index: var(--z-raised);
  }
  .status {
    color: var(--text-3);
    font-size: var(--fs-sm);
  }
  /* Clip (not hidden) to the rounded corners; the shell's page scrolls, so give it room. */
  :global(.location-map) {
    overflow: clip;
    min-height: 28rem;
    height: calc(var(--app-height, 100dvh) - 22rem);
    max-height: 44rem;
  }
</style>
