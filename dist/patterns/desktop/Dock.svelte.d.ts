/**
   * Dock — the **candy tray**: a floating glass tray of apps at the bottom of a desktop. Icons
   * stay put while you aim (no magnifying wave): the one under the pointer lifts a little and
   * shows its name in a pill above; a click plays one jelly squish. Running apps carry a short
   * tint bar, the front app a longer one. `onjar` adds the candy jar — a button for all apps —
   * at the start. A front layer: it sticks to the bottom. Left / Right move between icons (one
   * tab stop).
   *
   *   <Dock items={[{ id: 'mail', label: 'Mail', icon: 'mail', color: 'blue', running: true,
   *                   badge: 3 }, { separator: true }, …]}
   *         onselect={(app) => open(app.id)} onjar={() => (jar = true)} />
   */
import type { Snippet } from 'svelte';
import { type LensOptions } from '../../utils/lens';
import { type DockApp, type DockEntry } from './shared.svelte';
interface Props {
    items: DockEntry[];
    /** Icon size in px (smaller on phones). */
    size?: number;
    /** Accessible name. */
    label?: string;
    /** Spoken after the name of a running app. */
    runningLabel?: string;
    onselect?: ((app: DockApp) => void) | undefined;
    /** Shows the candy jar (all apps) at the start of the tray. */
    onjar?: (() => void) | undefined;
    jarLabel?: string;
    /** The jar's overlay is open. */
    jarOpen?: boolean;
    /** Renders each icon instead of the built-in candy icon. */
    icon?: Snippet<[DockApp]> | undefined;
    /** Extra content at the end (e.g. a clock). */
    trailing?: Snippet | undefined;
    /** Refraction of the tray (magnify, rim, rimBend, chroma, blur, saturate); `false` = frosted. */
    lens?: LensOptions | false | undefined;
}
declare const Dock: import("svelte").Component<Props, {}, "">;
type Dock = ReturnType<typeof Dock>;
export default Dock;
