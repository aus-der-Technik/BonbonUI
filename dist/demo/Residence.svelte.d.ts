import { type Units } from './mock-residence';
interface Props {
    /** The glass drop's menu, poured out or closed. */
    menu?: 'closed' | 'open';
    units?: Units;
    /** The viewing request: not asked yet, the form open in place, or sent. */
    request?: 'idle' | 'form' | 'sent';
}
declare const Residence: import("svelte").Component<Props, {}, "">;
type Residence = ReturnType<typeof Residence>;
export default Residence;
