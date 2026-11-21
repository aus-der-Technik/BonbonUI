interface Props {
    code: string;
    label?: string | undefined;
    copyable?: boolean;
    secret?: boolean;
    revealLabel?: string;
    hideLabel?: string;
    wrap?: boolean;
}
declare const CodeBlock: import("svelte").Component<Props, {}, "">;
type CodeBlock = ReturnType<typeof CodeBlock>;
export default CodeBlock;
