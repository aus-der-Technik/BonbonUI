export interface DetailItem {
    label: string;
    value: string;
    /** Monospace, for ids, URLs and metadata. */
    mono?: boolean;
}
/**
 * DetailList molecule — label/value pairs. `stacked` puts the caps label above its value
 * (a table row's detail); `grid` sets them side by side (a map popup). `columns` flows stacked
 * pairs into up to that many columns, one on a phone.
 *
 *   <DetailList columns={2} items={[{ label: 'City', value: 'Leipzig' }, …]} />
 */
interface Props {
    items: DetailItem[];
    layout?: 'stacked' | 'grid';
    /** Stacked layout only: at most this many columns, as room allows. */
    columns?: number | undefined;
}
declare const DetailList: import("svelte").Component<Props, {}, "">;
type DetailList = ReturnType<typeof DetailList>;
export default DetailList;
