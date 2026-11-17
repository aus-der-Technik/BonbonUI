interface Props {
    origin?: DOMRect | undefined;
    onclose?: () => void;
    onsubmit?: () => void;
}
declare const DialogFixture: import("svelte").Component<Props, {}, "">;
type DialogFixture = ReturnType<typeof DialogFixture>;
export default DialogFixture;
