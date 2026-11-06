/**
   * Icon atom — one glyph from `icons.ts`, sized in px and coloured by `currentColor`.
   * Decorative by default (`aria-hidden`); pass `label` when the icon carries meaning alone.
   */
import { type IconName } from './icons';
interface Props {
    name: IconName;
    size?: number;
    /** Accessible name; without it the icon is hidden from assistive tech. */
    label?: string | undefined;
    class?: string;
}
declare const Icon: import("svelte").Component<Props, {}, "">;
type Icon = ReturnType<typeof Icon>;
export default Icon;
