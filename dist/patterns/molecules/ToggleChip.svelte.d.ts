/**
   * ToggleChip molecule — a pressable pill. `md` is a legend or filter chip (colour dot, label,
   * count); off, it keeps readable text but loses its fill — a dashed outline and a grey dot — so
   * "off" never looks like "disabled" (which dims the whole chip). `sm` is a toolbar toggle like
   * "Wrap" (icon; accent-tinted when on); it looks xs but has a --target-min hit area.
   *
   *   <ToggleChip label="Open" color="var(--color-green)" count={12} bind:pressed={showOpen} />
   */
import type { Snippet } from 'svelte';
import type { IconName } from '../atoms/icons';
interface Props {
    pressed?: boolean;
    label?: string | undefined;
    color?: string | undefined;
    count?: number | string | undefined;
    icon?: IconName | undefined;
    size?: 'sm' | 'md';
    title?: string | undefined;
    disabled?: boolean;
    onchange?: ((pressed: boolean) => void) | undefined;
    children?: Snippet | undefined;
}
declare const ToggleChip: import("svelte").Component<Props, {}, "pressed">;
type ToggleChip = ReturnType<typeof ToggleChip>;
export default ToggleChip;
