interface Props {
    /** The stream breaks off half-way, as when the model times out. */
    failing?: boolean;
    /** Asks the first example question on load. */
    autoask?: boolean;
}
declare const AdminAiPlayground: import("svelte").Component<Props, {}, "">;
type AdminAiPlayground = ReturnType<typeof AdminAiPlayground>;
export default AdminAiPlayground;
