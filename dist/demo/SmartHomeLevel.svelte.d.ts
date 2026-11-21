interface Props {
    /** Accessible name, e.g. "Ceiling lamp brightness". */
    label: string;
    value?: number;
    /** Lit and glowing (the device is on). */
    lit?: boolean;
    /** The light's colour; the tint's glow when not given. */
    colour?: string | undefined;
    segments?: number;
    step?: number;
    decreaseLabel?: string;
    increaseLabel?: string;
    onchange?: ((value: number) => void) | undefined;
}
declare const SmartHomeLevel: import("svelte").Component<Props, {}, "value">;
type SmartHomeLevel = ReturnType<typeof SmartHomeLevel>;
export default SmartHomeLevel;
