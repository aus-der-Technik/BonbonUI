import type { Snippet } from 'svelte';
import type { IconName } from '../atoms/icons';
/** A round on/off tile (Wi-Fi, Bluetooth, Focus, …). */
export interface ControlToggle {
    id: string;
    label: string;
    icon: IconName;
    on: boolean;
    /** Grey line under the label when on ("Home network"). */
    detail?: string | undefined;
}
export interface NowPlaying {
    title: string;
    artist?: string | undefined;
    /** Cover image URL; without it a tinted note glyph shows. */
    artwork?: string | undefined;
    playing: boolean;
}
/** Props of QuickSettings (exported for the deprecated alias). */
export interface QuickSettingsProps {
    toggles?: ControlToggle[];
    ontoggle?: ((id: string, on: boolean) => void) | undefined;
    /** 0–100; `undefined` hides the slider. */
    brightness?: number | undefined;
    volume?: number | undefined;
    nowPlaying?: NowPlaying | undefined;
    onplaypause?: (() => void) | undefined;
    onnext?: (() => void) | undefined;
    onprevious?: (() => void) | undefined;
    /** A panel with open/close behaviour, popping out of `anchor` (else the top right corner). */
    floating?: boolean;
    /** The control that toggles the floating panel: it opens from there, and a click on it is
     *  not an outside click. */
    anchor?: Element | undefined;
    open?: boolean;
    onclose?: (() => void) | undefined;
    label?: string;
    brightnessLabel?: string;
    volumeLabel?: string;
    playLabel?: string;
    pauseLabel?: string;
    nextLabel?: string;
    previousLabel?: string;
    /** Extra tiles under the built-in ones. */
    children?: Snippet | undefined;
}
declare const QuickSettings: import("svelte").Component<QuickSettingsProps, {}, "volume" | "open" | "brightness">;
type QuickSettings = ReturnType<typeof QuickSettings>;
export default QuickSettings;
