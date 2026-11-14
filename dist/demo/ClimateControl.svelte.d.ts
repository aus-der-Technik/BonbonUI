interface Props {
    /** The zone to open. */
    zone?: string;
    /** Opens with a misting cycle already running. */
    misting?: boolean;
}
declare const ClimateControl: import("svelte").Component<Props, {}, "">;
type ClimateControl = ReturnType<typeof ClimateControl>;
export default ClimateControl;
