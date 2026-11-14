interface Props {
    value?: 'up' | 'down' | null;
    label?: string;
    upLabel?: string;
    downLabel?: string;
    onchange?: ((value: 'up' | 'down') => void) | undefined;
}
declare const ThumbsInput: import("svelte").Component<Props, {}, "value">;
type ThumbsInput = ReturnType<typeof ThumbsInput>;
export default ThumbsInput;
