export type { ControlToggle, NowPlaying } from './QuickSettings.svelte';
/**
   * @deprecated Renamed to `QuickSettings`; this alias only keeps older imports compiling.
   */
import { type QuickSettingsProps } from './QuickSettings.svelte';
declare const ControlCenter: import("svelte").Component<QuickSettingsProps, {}, "volume" | "open" | "brightness">;
type ControlCenter = ReturnType<typeof ControlCenter>;
export default ControlCenter;
