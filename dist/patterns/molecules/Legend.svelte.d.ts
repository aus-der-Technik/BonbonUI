export interface LegendItem {
    label: string;
    color: string;
}
interface Props {
    items: LegendItem[];
    shape?: 'dot' | 'square';
}
declare const Legend: import("svelte").Component<Props, {}, "">;
type Legend = ReturnType<typeof Legend>;
export default Legend;
