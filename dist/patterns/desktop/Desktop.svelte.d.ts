/**
   * Desktop — a whole screen: a wallpaper (by default the drifting tint mesh), the top shelf
   * (MenuBar), desktop icons, widgets, floating windows and the candy tray (Dock) at the
   * bottom. It manages the windows inside it — the one clicked last comes to the front with a
   * tint rim, the others step back — so a page only says which windows are open. A window grows
   * out of what opened it: the desktop icon double-clicked, the tile in the AppJar, the
   * CommandPalette row; otherwise out of its tray icon. Minimised, it shrinks into the tray. A
   * right click on the wallpaper opens `contextmenu`; given as a function it gets the point
   * where an icon dropped there would sit, so a new item lands under the pointer.
   *
   * Icons line up along the right edge, or sit where their `x`/`y` put them. Set `renaming` to
   * an icon's id (or press F2 on it) and its name becomes a field: Enter or leaving it keeps
   * the new name (`onrename`), Escape keeps the old one; the new name glows once.
   *
   *   <Desktop wallpaper="/beach.jpg" icons={files} onopen={openFile} bind:manager
   *     bind:renaming onrename={(id, name) => …}
   *     contextmenu={(at) => [{ label: 'New folder', onselect: () => add({ ...at }) }]}>
   *     {#snippet menubar()}<MenuBar … />{/snippet}
   *     {#snippet dock()}<Dock … />{/snippet}
   *     <Window title="Notes">…</Window>
   *   </Desktop>
   *
   * `bind:manager` hands the page the WindowManager, e.g. to let a window grow out of
   * something of its own (`manager.openFrom(button, 'notes')`).
   *
   * On phones the icons and widgets become a scrolling home screen and windows open as sheets.
   */
import { type Snippet } from 'svelte';
import { WindowManager, type ContextMenuItem, type DesktopIcon, type DesktopPoint } from './shared.svelte';
interface Props {
    /** Wallpaper image URL (or any CSS image / gradient). */
    wallpaper?: string | undefined;
    /** Base colour or CSS background under the wallpaper. */
    background?: string | undefined;
    /** The drifting tint mesh. */
    gradient?: boolean;
    animate?: boolean;
    /** Files and apps on the desktop surface. */
    icons?: DesktopIcon[];
    /** The selected desktop icon. */
    selected?: string | undefined;
    /** Id of the front window; set it to bring a window to the front. */
    focused?: string | undefined;
    /** Double click or Enter on a desktop icon. */
    onopen?: ((icon: DesktopIcon) => void) | undefined;
    /** Id of the icon whose name is being typed; bind it. */
    renaming?: string | undefined;
    /** A rename was committed with a new, non-empty name. */
    onrename?: ((id: string, name: string) => void) | undefined;
    /** Accessible name of the rename field. */
    renameLabel?: string;
    /**
     * Right-click menu of the wallpaper. As a function it gets `at`: the `x`/`y` that puts an
     * icon's tile right under the pointer.
     */
    contextmenu?: ContextMenuItem[] | ((at: DesktopPoint) => ContextMenuItem[]) | undefined;
    /** The desktop's window manager (read it with `bind:manager`, or pass your own). */
    manager?: WindowManager | undefined;
    /** Fills its parent instead of the viewport (previews). */
    contained?: boolean;
    /** Accessible name of the icon list. */
    iconsLabel?: string;
    menubar?: Snippet | undefined;
    dock?: Snippet | undefined;
    /** A column of Widgets on the left. */
    widgets?: Snippet | undefined;
    /** Windows and overlays. */
    children?: Snippet | undefined;
}
declare const Desktop: import("svelte").Component<Props, {}, "selected" | "focused" | "renaming" | "manager">;
type Desktop = ReturnType<typeof Desktop>;
export default Desktop;
