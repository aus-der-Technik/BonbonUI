type Filter = 'all' | 'open' | 'overdue' | 'paid' | 'draft';
interface Props {
    /** Which invoices the table shows. */
    filter?: Filter;
    /** Opens with the new-invoice row open. */
    creating?: boolean;
    /** Every invoice is paid: nothing is outstanding. */
    settled?: boolean;
}
declare const Invoicing: import("svelte").Component<Props, {}, "">;
type Invoicing = ReturnType<typeof Invoicing>;
export default Invoicing;
