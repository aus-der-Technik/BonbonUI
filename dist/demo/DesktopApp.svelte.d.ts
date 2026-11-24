import { type Mail } from './mock-desktop';
interface Props {
    /** All messages; the page owns them so mail can arrive in the background. */
    mails: Mail[];
    selected?: string | undefined;
    x?: number;
    y?: number;
    width?: number | undefined;
    height?: number | undefined;
    minimized?: boolean | undefined;
    maximized?: boolean | undefined;
    onclose?: (() => void) | undefined;
    /** Saves an attachment to Downloads; resolves when it is there. */
    onsave?: ((name: string, size: string) => Promise<void> | void) | undefined;
    /** Shows a saved attachment in Files, opening out of `from`. */
    onreveal?: ((name: string, from: Element) => void) | undefined;
}
declare const DesktopApp: import("svelte").Component<Props, {}, "height" | "width" | "selected" | "x" | "y" | "maximized" | "minimized" | "mails">;
type DesktopApp = ReturnType<typeof DesktopApp>;
export default DesktopApp;
