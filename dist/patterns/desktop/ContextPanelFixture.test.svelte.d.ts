interface Props {
    onopen: (event: MouseEvent | KeyboardEvent) => string | null | undefined;
    onclose?: () => void;
    disabled?: boolean;
    /** Called by "Use", after the panel closed, with its target. */
    onuse?: (target: string) => void;
}
declare const ContextPanelFixture: import("svelte").Component<Props, {}, "">;
type ContextPanelFixture = ReturnType<typeof ContextPanelFixture>;
export default ContextPanelFixture;
