type View = 'board' | 'calendar';
interface Props {
    /** The view to open (deep link). */
    view?: View;
}
declare const TeamWorkspace: import("svelte").Component<Props, {}, "">;
type TeamWorkspace = ReturnType<typeof TeamWorkspace>;
export default TeamWorkspace;
