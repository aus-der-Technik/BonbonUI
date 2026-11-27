export interface VersionItem {
    value: string;
    label: string;
    /** Marks e.g. the latest version with a dot. */
    marked?: boolean;
    title?: string;
    href?: string;
}
interface Props {
    items: VersionItem[];
    value?: string | undefined;
    label?: string;
    markLabel?: string;
    onchange?: ((value: string) => void) | undefined;
}
declare const VersionRail: import("svelte").Component<Props, {}, "value">;
type VersionRail = ReturnType<typeof VersionRail>;
export default VersionRail;
