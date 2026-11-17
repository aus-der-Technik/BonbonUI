/**
   * StatusCard organism — a centred card for a moment between pages: signing in after an SSO
   * return, signing out, a device activated, a failed callback. `working` spins, `success` shows
   * a large check, `error` an alert. With `redirectTo` it counts down `redirectIn` seconds, then
   * calls `onredirect` (or navigates there); a link lets people continue at once. The card is
   * liquid glass; the success check springs in.
   *
   *   <StatusCard status="working" title="Signing you in" message="Checking your session…" />
   */
import { type Snippet } from 'svelte';
interface Props {
    status: 'working' | 'success' | 'error';
    title: string;
    message?: string | undefined;
    redirectTo?: string | undefined;
    redirectIn?: number;
    continueLabel?: string;
    redirectingLabel?: (seconds: number) => string;
    onredirect?: ((href: string) => void) | undefined;
    children?: Snippet | undefined;
}
declare const StatusCard: import("svelte").Component<Props, {}, "">;
type StatusCard = ReturnType<typeof StatusCard>;
export default StatusCard;
