/**
 * CodeInput molecule — a one-time or device code in separate boxes ("ABCD-EFGH"). Typing
 * moves on, Backspace moves back, arrows navigate, pasting fills every box. Letters are
 * upper-cased; `numeric` allows digits only and brings up the number pad. `oncomplete` fires
 * once every box is filled. A hidden `name` input carries the joined value for plain forms.
 *
 *   <CodeInput label="Verification code" numeric length={6} oncomplete={verify} />
 */
interface Props {
    length?: number;
    value?: string;
    label: string;
    numeric?: boolean;
    /** Box index after which a dash is drawn (e.g. 4 for "ABCD-EFGH"). */
    groupAfter?: number | undefined;
    name?: string | undefined;
    disabled?: boolean;
    invalid?: boolean;
    autofocus?: boolean;
    /** Accessible name of one box. */
    boxLabel?: (label: string, position: number, length: number) => string;
    oncomplete?: ((value: string) => void) | undefined;
}
declare const CodeInput: import("svelte").Component<Props, {}, "value">;
type CodeInput = ReturnType<typeof CodeInput>;
export default CodeInput;
