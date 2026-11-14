import type { ContextMenuItem, DesktopIcon, DesktopPoint, WindowManager } from './shared.svelte';
interface Props {
    icons?: DesktopIcon[];
    onopen?: (icon: DesktopIcon) => void;
    contextmenu?: ContextMenuItem[] | ((at: DesktopPoint) => ContextMenuItem[]) | undefined;
    onclose?: () => void;
    /** Starts with this icon's name in a field. */
    renaming?: string | undefined;
    onrename?: ((id: string, name: string) => void) | undefined;
    /** Receives the manager from `bind:manager`. */
    onmanager?: (manager: WindowManager) => void;
}
declare const DesktopFixture: import("svelte").Component<Props, {}, "">;
type DesktopFixture = ReturnType<typeof DesktopFixture>;
export default DesktopFixture;
