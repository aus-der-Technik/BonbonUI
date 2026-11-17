interface Props {
    onopen: (event: MouseEvent | KeyboardEvent) => string | null | undefined;
    onclose?: () => void;
    disabled?: boolean;
}
declare const ContextPanelFixture: import("svelte").Component<Props, {}, "">;
type ContextPanelFixture = ReturnType<typeof ContextPanelFixture>;
export default ContextPanelFixture;
