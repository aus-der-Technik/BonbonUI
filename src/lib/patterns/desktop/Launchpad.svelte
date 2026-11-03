<script lang="ts">
  /**
   * @deprecated Renamed to `AppJar`; this alias only keeps older imports compiling.
   */
  import AppJar, { type AppJarProps } from './AppJar.svelte';

  let { open = $bindable(false), query = $bindable(''), ...rest }: AppJarProps = $props();
</script>

<AppJar bind:open bind:query {...rest} />
