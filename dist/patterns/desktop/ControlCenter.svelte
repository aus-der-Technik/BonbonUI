<script lang="ts" module>
  export type { ControlToggle, NowPlaying } from './QuickSettings.svelte';
</script>

<script lang="ts">
  /**
   * @deprecated Renamed to `QuickSettings`; this alias only keeps older imports compiling.
   */
  import QuickSettings, { type QuickSettingsProps } from './QuickSettings.svelte';

  let {
    open = $bindable(true),
    brightness = $bindable(),
    volume = $bindable(),
    ...rest
  }: QuickSettingsProps = $props();
</script>

<QuickSettings bind:open bind:brightness bind:volume {...rest} />
