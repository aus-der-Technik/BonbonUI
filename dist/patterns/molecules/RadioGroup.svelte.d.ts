export interface RadioOption<V extends string | number = string> {
    value: V;
    label: string;
    description?: string;
    disabled?: boolean;
}
declare function $$render<V extends string | number>(): {
    props: {
        label: string;
        options: RadioOption<V>[];
        value?: V | undefined;
        orientation?: "vertical" | "horizontal";
        onchange?: ((value: V) => void) | undefined;
    };
    exports: {};
    bindings: "value";
    slots: {};
    events: {};
};
declare class __sveltets_Render<V extends string | number> {
    props(): ReturnType<typeof $$render<V>>['props'];
    events(): ReturnType<typeof $$render<V>>['events'];
    slots(): ReturnType<typeof $$render<V>>['slots'];
    bindings(): "value";
    exports(): {};
}
interface $$IsomorphicComponent {
    new <V extends string | number>(options: import('svelte').ComponentConstructorOptions<ReturnType<__sveltets_Render<V>['props']>>): import('svelte').SvelteComponent<ReturnType<__sveltets_Render<V>['props']>, ReturnType<__sveltets_Render<V>['events']>, ReturnType<__sveltets_Render<V>['slots']>> & {
        $$bindings?: ReturnType<__sveltets_Render<V>['bindings']>;
    } & ReturnType<__sveltets_Render<V>['exports']>;
    <V extends string | number>(internal: unknown, props: ReturnType<__sveltets_Render<V>['props']> & {}): ReturnType<__sveltets_Render<V>['exports']>;
    z_$$bindings?: ReturnType<__sveltets_Render<any>['bindings']>;
}
declare const RadioGroup: $$IsomorphicComponent;
type RadioGroup<V extends string | number> = InstanceType<typeof RadioGroup<V>>;
export default RadioGroup;
