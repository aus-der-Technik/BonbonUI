interface Props {
    live?: boolean;
    loading?: boolean;
    /** `primary` for the page header; `secondary` or `ghost` inside a panel or card. */
    variant?: 'primary' | 'secondary' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    label?: string;
    liveLabel?: string;
    liveHint?: string;
    /** Accessible name in live mode, from the live label and the action label. */
    liveActionLabel?: (liveLabel: string, label: string) => string;
    onclick?: (() => void) | undefined;
}
declare const RefreshButton: import("svelte").Component<Props, {}, "">;
type RefreshButton = ReturnType<typeof RefreshButton>;
export default RefreshButton;
