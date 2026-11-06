import type { IconName } from '../atoms/icons';
export interface Segment<V extends string | number = string> {
    value: V;
    label: string;
    /** Shown before the label. */
    icon?: IconName | undefined;
}
declare function $$render<V extends string | number>(): {
    props: {
        options: Segment<V>[];
        value: V;
        /** Accessible name of the group (or use `labelledby`). */
        label?: string | undefined;
        labelledby?: string | undefined;
        /** `sm` is a compact pill (e.g. a language switch). */
        size?: "sm" | "md";
        /** `glass` (default) is a frosted thumb, `accent` a filled one. */
        variant?: "glass" | "accent";
        /** Fills the width of its container, segments equally wide. */
        full?: boolean;
        /** Lets many options wrap onto several lines instead of overflowing. */
        wrap?: boolean;
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
declare const SegmentedControl: $$IsomorphicComponent;
type SegmentedControl<V extends string | number> = InstanceType<typeof SegmentedControl<V>>;
export default SegmentedControl;
