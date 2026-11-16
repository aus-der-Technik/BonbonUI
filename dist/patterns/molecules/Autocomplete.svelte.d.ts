export interface Suggestion {
    label: string;
    /** Right-aligned grey detail, e.g. "Airport · 3 terminals". */
    meta?: string | undefined;
    /** Colour dot in front of the label. */
    color?: string | undefined;
}
declare function $$render<S extends Suggestion>(): {
    props: {
        value?: string;
        suggestions?: S[];
        label: string;
        placeholder?: string | undefined;
        buttonLabel?: string;
        loading?: boolean;
        minChars?: number;
        debounce?: number;
        onquery?: ((term: string) => void) | undefined;
        /** A suggestion was picked (`chosen`) or free text submitted (`chosen` is null). */
        onsearch: (term: string, chosen: S | null) => void;
    };
    exports: {};
    bindings: "value";
    slots: {};
    events: {};
};
declare class __sveltets_Render<S extends Suggestion> {
    props(): ReturnType<typeof $$render<S>>['props'];
    events(): ReturnType<typeof $$render<S>>['events'];
    slots(): ReturnType<typeof $$render<S>>['slots'];
    bindings(): "value";
    exports(): {};
}
interface $$IsomorphicComponent {
    new <S extends Suggestion>(options: import('svelte').ComponentConstructorOptions<ReturnType<__sveltets_Render<S>['props']>>): import('svelte').SvelteComponent<ReturnType<__sveltets_Render<S>['props']>, ReturnType<__sveltets_Render<S>['events']>, ReturnType<__sveltets_Render<S>['slots']>> & {
        $$bindings?: ReturnType<__sveltets_Render<S>['bindings']>;
    } & ReturnType<__sveltets_Render<S>['exports']>;
    <S extends Suggestion>(internal: unknown, props: ReturnType<__sveltets_Render<S>['props']> & {}): ReturnType<__sveltets_Render<S>['exports']>;
    z_$$bindings?: ReturnType<__sveltets_Render<any>['bindings']>;
}
declare const Autocomplete: $$IsomorphicComponent;
type Autocomplete<S extends Suggestion> = InstanceType<typeof Autocomplete<S>>;
export default Autocomplete;
