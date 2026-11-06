interface Props {
    type: 'thumbs' | 'stars';
    /** `'up' | 'down'` for thumbs, `1…5` (number or numeric string) for stars. */
    value: string | number;
    upLabel?: string;
    downLabel?: string;
}
declare const RatingDisplay: import("svelte").Component<Props, {}, "">;
type RatingDisplay = ReturnType<typeof RatingDisplay>;
export default RatingDisplay;
