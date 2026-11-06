/**
   * @deprecated Renamed to `AppJar`; this alias only keeps older imports compiling.
   */
import { type AppJarProps } from './AppJar.svelte';
declare const Launchpad: import("svelte").Component<AppJarProps, {}, "open" | "query">;
type Launchpad = ReturnType<typeof Launchpad>;
export default Launchpad;
