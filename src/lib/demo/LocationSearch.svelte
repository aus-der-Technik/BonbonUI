<script lang="ts">
  /** Example page: a location search with a map, with mock data (Storybook only). */
  import Page from '../patterns/templates/Page.svelte';
  import Layer from '../patterns/layout/Layer.svelte';
  import Row from '../patterns/layout/Row.svelte';
  import Spacer from '../patterns/layout/Spacer.svelte';
  import LoadingBar from '../patterns/atoms/LoadingBar.svelte';
  import Alert from '../patterns/molecules/Alert.svelte';
  import Autocomplete, { type Suggestion } from '../patterns/molecules/Autocomplete.svelte';
  import ToggleChip from '../patterns/molecules/ToggleChip.svelte';
  import MapView from '../patterns/organisms/MapView.svelte';
  import { ENDPOINTS, frankfurtHits, type Endpoint, type Hit } from './mock';

  interface Props {
    /** Shows one lookup failing, as when a backend times out. */
    failing?: boolean;
  }

  let { failing = false }: Props = $props();

  const SUGGESTIONS: Suggestion[] = [
    { label: 'Frankfurt am Main', meta: 'Place · Hessen', color: 'var(--series-1)' },
    { label: 'Frankfurt (Main) Hbf', meta: 'Main station · Hessen', color: 'var(--series-2)' },
    { label: 'Frankfurt Airport', meta: 'Airport · FRA · Hessen', color: 'var(--series-2)' },
    { label: '60311', meta: 'Postal code · Frankfurt am Main', color: 'var(--series-3)' },
  ];

  let term = $state('');
  let suggestions = $state<Suggestion[]>([]);
  let hits = $state<Hit[]>([]);
  let searched = $state('');
  let loading = $state(false);
  let errors = $state<string[]>([]);
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

  function query(value: string) {
    const needle = value.toLowerCase();
    suggestions = SUGGESTIONS.filter((s) => s.label.toLowerCase().includes(needle));
  }

  function search(value: string) {
    loading = true;
    errors = [];
    setTimeout(() => {
      hits = frankfurtHits().filter((h) => !failing || h.endpoint !== 'landmarks');
      errors = failing ? ['landmarks: request timed out after 3 s'] : [];
      searched = value;
      loading = false;
    }, 500);
  }
</script>

<Page title="Locations" subtitle="find places" fill gap="md" footer="Example Corp · internal">
  <Layer level="panel" gap="sm" class="location-search">
    <Autocomplete
      bind:value={term}
      {suggestions}
      {loading}
      label="Search a place, airport, station or postal code"
      placeholder="Place, airport, station or postal code — e.g. Frankfurt, MUC, 60311"
      onquery={query}
      onsearch={search}
    />
    <Row gap="sm">
      {#each ENDPOINTS as endpoint (endpoint.id)}
        <ToggleChip
          label={endpoint.label}
          color={endpoint.color}
          count={counts[endpoint.id]}
          title={endpoint.id === 'geo' ? 'Postal codes within 15 km of the best match' : undefined}
          bind:pressed={visible[endpoint.id]}
        />
      {/each}
      <Spacer />
      <span class="status">
        {#if loading}
          Searching…
        {:else if searched}
          {hits.length} results for “{searched}”
        {:else}
          Type to search; pick a suggestion or press Enter
        {/if}
      </span>
    </Row>
    <LoadingBar active={loading} />
  </Layer>

  {#each errors as error (error)}<Alert variant="card" message={error} />{/each}

  <Layer level="panel" padding="none" class="location-map" aria-label="Map">
    <MapView markers={shown} />
  </Layer>
</Page>

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
  :global(.location-map) {
    overflow: hidden;
    min-height: 26rem;
  }
</style>
