interface Props {
    group?: string | null;
    person?: string | null;
    onall?: () => void;
}
declare const PanelStackFixture: import("svelte").Component<Props, {}, "group" | "person">;
type PanelStackFixture = ReturnType<typeof PanelStackFixture>;
export default PanelStackFixture;
