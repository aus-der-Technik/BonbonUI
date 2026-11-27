interface Props {
    /** Each rule is plain text; `backticked` parts are set as code. */
    dos: readonly string[];
    donts: readonly string[];
    doLabel?: string;
    dontLabel?: string;
}
declare const IntroRules: import("svelte").Component<Props, {}, "">;
type IntroRules = ReturnType<typeof IntroRules>;
export default IntroRules;
