/**
   * Window — a desktop app window. The title sits on the left with the app's small candy icon;
   * the window controls sit at the end of the title bar: minimise, zoom and — set apart by a
   * hairline — close, as plain glyph buttons that are readable at rest, 32px targets with a
   * tooltip naming the action. They stay neutral; close shows the danger colour only while it
   * is itself pointed at or focused. Optional toolbar in the title bar, a full-height sidebar
   * and a footer (status bar). In a narrow window the toolbar takes a row of its own.
   *
   * Inside a Desktop it floats: drag it by the title bar, resize it from the corner,
   * double-click the title bar to zoom. The front window wears the selected layer's tint rim;
   * the others flatten. Windows grow out of whatever opened them — a desktop icon, the app jar,
   * a palette row (`WindowManager.openFrom`) — else out of their app's icon in the Dock, and
   * shrink back into the Dock when minimised. On phone widths every window becomes a sheet. With `static` it is a
   * framed app preview in the page flow.
   *
   *   <Window title="Notes" icon="edit" color="yellow" bind:x bind:y onclose={() => (open = false)}>
   *     …
   *   </Window>
   *
   * Keyboard: the resize grip takes arrow keys (Shift + arrows moves the window).
   */
import { type Snippet } from 'svelte';
import type { IconName } from '../atoms/icons';
import { type Space } from '../layout/space';
import { type AppColor } from './shared.svelte';
interface Props {
    title: string;
    /** Grey line under the title. */
    subtitle?: string | undefined;
    /** Glyph of the small app icon before the title. */
    icon?: IconName | undefined;
    /** Colour of that icon: a palette name, `accent` or any CSS colour (default: accent). */
    color?: AppColor | undefined;
    /** The app's name, shown on top of the sidebar (the title then names the place). */
    app?: string | undefined;
    /** Identity in the desktop's stacking order and the Dock icon it grows from. */
    id?: string | undefined;
    x?: number;
    y?: number;
    /** Width / height in px (floating default 640 × 420; static: full width, auto height). */
    width?: number | undefined;
    height?: number | undefined;
    minWidth?: number;
    minHeight?: number;
    /** Outside a Desktop: whether it looks focused (inside one, the desktop decides). */
    focused?: boolean | undefined;
    maximized?: boolean | undefined;
    minimized?: boolean | undefined;
    /** A framed preview in the page flow instead of a floating window. */
    static?: boolean;
    resizable?: boolean;
    draggable?: boolean;
    /** Inner padding of the content. */
    padding?: Space;
    /** In the title bar, after the title (buttons, a segmented control, a search). */
    toolbar?: Snippet | undefined;
    /** A full-height column on the left, under the app's name. */
    sidebar?: Snippet | undefined;
    sidebarWidth?: string;
    /** Under the content, e.g. a StatusBar. */
    footer?: Snippet | undefined;
    onclose?: (() => void) | undefined;
    onminimize?: (() => void) | undefined;
    onzoom?: ((maximized: boolean) => void) | undefined;
    onfocus?: (() => void) | undefined;
    closeLabel?: string;
    minimizeLabel?: string;
    zoomLabel?: string;
    resizeLabel?: string;
    /** Name of the window controls group; `{title}` is replaced. */
    controlsLabel?: string;
    class?: string;
    children?: Snippet | undefined;
}
declare const Window: import("svelte").Component<Props, {}, "height" | "width" | "x" | "y" | "maximized" | "minimized">;
type Window = ReturnType<typeof Window>;
export default Window;
