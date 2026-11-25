import type { IconName } from '../atoms/icons';
interface Props {
    value?: string;
    label: string;
    placeholder?: string | undefined;
    buttonLabel?: string;
    busyLabel?: string;
    icon?: IconName;
    busy?: boolean;
    disabled?: boolean;
    submitOn?: 'enter' | 'mod-enter';
    minRows?: number;
    maxRows?: number;
    /** Below this many trimmed characters the button stays disabled. */
    minLength?: number;
    maxlength?: number | undefined;
    hint?: boolean;
    /** Hint text after the send keys. */
    sendHint?: string;
    /** Hint text after Shift+Enter (`submitOn="enter"` only). */
    newlineHint?: string;
    /** Key caps of the hint; `mod` defaults to ⌘ on Apple devices, "Ctrl" elsewhere. */
    keyLabels?: Partial<Record<'mod' | 'enter' | 'shift', string>>;
    layout?: 'stacked' | 'inline';
    /** Look of the send button: `soft` for a reply box on a screen whose primary is elsewhere. */
    sendVariant?: 'primary' | 'soft' | 'tinted';
    onsubmit: (value: string) => void;
}
declare const Composer: import("svelte").Component<Props, {}, "value">;
type Composer = ReturnType<typeof Composer>;
export default Composer;
