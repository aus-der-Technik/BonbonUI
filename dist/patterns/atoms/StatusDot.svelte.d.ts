/**
   * StatusDot atom — a small glowing dot for presence and health: online / away / offline,
   * service up / degraded / down. `pulse` adds a soft breathing ring for live states. With
   * `label` the text sits next to it; without one, pass `aria-label` when the dot alone carries
   * the meaning.
   *
   *   <StatusDot tone="ok" pulse label="Operational" />
   *   <StatusDot tone="warn" aria-label="Away" />
   */
import { type PaletteColor } from './palette';
type Tone = 'ok' | 'warn' | 'danger' | 'info' | 'neutral' | 'accent' | PaletteColor;
interface Props {
    tone?: Tone;
    /** Any CSS colour; overrides `tone`. */
    color?: string | undefined;
    pulse?: boolean;
    label?: string | undefined;
    size?: 'sm' | 'md' | 'lg';
    'aria-label'?: string | undefined;
}
declare const StatusDot: import("svelte").Component<Props, {}, "">;
type StatusDot = ReturnType<typeof StatusDot>;
export default StatusDot;
