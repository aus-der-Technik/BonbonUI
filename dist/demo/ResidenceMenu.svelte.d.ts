import type { Section } from './mock-residence';
interface Props {
    sections: Section[];
    /** Open or closed; the story uses it for the open state. */
    open?: boolean;
    /** Accessible name of the drop. */
    label?: string;
    /** A section was chosen. */
    onnavigate?: ((id: string) => void) | undefined;
}
declare const ResidenceMenu: import("svelte").Component<Props, {}, "open">;
type ResidenceMenu = ReturnType<typeof ResidenceMenu>;
export default ResidenceMenu;
