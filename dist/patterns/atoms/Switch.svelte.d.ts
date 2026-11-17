/**
 * Switch atom — an on/off toggle for settings that apply at once (`role="switch"`), in the
 * candy style: accent track, white knob that springs across and stretches while pressed.
 * For a choice that is submitted with a form, use a Checkbox.
 *
 *   <Switch label="Notifications" description="A daily summary." bind:checked={notify} />
 */
interface Props {
    checked?: boolean;
    label?: string | undefined;
    /** Grey line under the label. */
    description?: string | undefined;
    disabled?: boolean;
    size?: 'sm' | 'md';
    /** `ok` paints the track green, e.g. for "live" toggles. */
    tone?: 'accent' | 'ok';
    /** Accessible name when there is no visible `label`. */
    'aria-label'?: string | undefined;
    onchange?: ((checked: boolean) => void) | undefined;
}
declare const Switch: import("svelte").Component<Props, {}, "checked">;
type Switch = ReturnType<typeof Switch>;
export default Switch;
