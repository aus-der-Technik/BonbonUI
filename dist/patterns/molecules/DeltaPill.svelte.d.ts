import type { DeltaDirection, DeltaTone } from './delta';
interface Props {
    text: string;
    direction: DeltaDirection;
    tone: DeltaTone;
    /** Shows a dash for an unchanged figure; KpiTile leaves the pill bare instead. */
    flatIcon?: boolean;
}
declare const DeltaPill: import("svelte").Component<Props, {}, "">;
type DeltaPill = ReturnType<typeof DeltaPill>;
export default DeltaPill;
