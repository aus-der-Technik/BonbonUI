<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Autocomplete, { type Suggestion } from './Autocomplete.svelte';
  import StatusText from '../atoms/StatusText.svelte';
  import Stack from '../layout/Stack.svelte';

  const places: Suggestion[] = [
    { label: 'Riverside', meta: 'Town · North district', color: 'var(--color-blue)' },
    {
      label: 'Riverside Central',
      meta: 'Main station · North district',
      color: 'var(--color-teal)',
    },
    { label: 'Riverside Airport', meta: 'Airport · 2 terminals', color: 'var(--color-purple)' },
    { label: 'Riverside Harbour', meta: 'Ferry port · East coast', color: 'var(--color-cyan)' },
    { label: '40210', meta: 'Postal code · Riverside', color: 'var(--color-orange)' },
  ];

  const { Story } = defineMeta({
    title: 'Molecules/Autocomplete',
    component: Autocomplete,
    tags: ['autodocs'],
    parameters: { layout: 'padded' },
  });
</script>

<script lang="ts">
  let term = $state('');
  let suggestions = $state<Suggestion[]>([]);
  let last = $state('');

  function query(value: string) {
    const needle = value.toLowerCase();
    suggestions = places.filter(
      (p) => p.label.toLowerCase().includes(needle) || p.meta?.toLowerCase().includes(needle),
    );
  }
</script>

<!-- The app does the lookup: `onquery` fires (debounced) as the user types, and whatever comes
     back as `suggestions` is shown. Type "riv" or "402"; arrows move, Enter picks, Escape
     closes. -->
<Story name="Place search" parameters={{ docs: { story: { height: '24rem' } } }} asChild>
  <Stack gap="md">
    <Autocomplete
      bind:value={term}
      {suggestions}
      label="Search a town, station or postal code"
      placeholder="Town, station or postal code — e.g. Riverside, 40210"
      onquery={query}
      onsearch={(value, chosen) => (last = `${value}${chosen ? ' (picked)' : ' (free text)'}`)}
    />
    {#if last}<StatusText message="Searched: {last}" />{/if}
  </Stack>
</Story>

<!-- While the app looks something up, the button spins and swallows clicks. -->
<Story name="Loading" asChild>
  <Autocomplete value="Riverside" label="Search" loading onsearch={() => {}} />
</Story>
