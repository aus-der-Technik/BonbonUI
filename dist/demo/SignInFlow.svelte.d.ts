interface Props {
    start?: 'login' | 'activate' | 'logout';
    /** The welcome has been seen: back into the app. */
    onsignedin?: (() => void) | undefined;
}
declare const SignInFlow: import("svelte").Component<Props, {}, "">;
type SignInFlow = ReturnType<typeof SignInFlow>;
export default SignInFlow;
