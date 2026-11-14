/**
   * SignInCard molecule — the frosted card shown in place of content until the user signs in.
   * A small lock disc says what this is about; `logo` replaces it (an app icon, a mark). `error`
   * shows above the button and nudges the card once — a gentle head-shake, not an alarm.
   * `align="center"` centres everything, for a full-page sign-in.
   *
   *   <SignInCard title="Sign in to continue" text="Use your work account." onsignin={signIn} />
   */
import type { Snippet } from 'svelte';
interface Props {
    title?: string;
    text?: string | undefined;
    buttonLabel?: string;
    busy?: boolean;
    busyLabel?: string;
    error?: string | undefined;
    logo?: Snippet | undefined;
    align?: 'start' | 'center';
    onsignin: () => void;
    children?: Snippet | undefined;
}
declare const SignInCard: import("svelte").Component<Props, {}, "">;
type SignInCard = ReturnType<typeof SignInCard>;
export default SignInCard;
