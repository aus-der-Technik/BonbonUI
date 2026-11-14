type Queue = 'mine' | 'unassigned' | 'all';
interface Props {
    /** The queue to open. */
    queue?: Queue;
    /** A ticket to open, e.g. `IT-4831`; the first of the queue when left out. */
    ticket?: string | undefined;
    /** Nothing is waiting to be picked up. */
    empty?: boolean;
}
declare const ServiceDesk: import("svelte").Component<Props, {}, "">;
type ServiceDesk = ReturnType<typeof ServiceDesk>;
export default ServiceDesk;
