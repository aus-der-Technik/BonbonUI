export interface ResourceStatus {
    label: string;
    tone: 'live' | 'locked' | 'draft' | 'danger' | 'info' | 'neutral';
    /** Transitional ("starting"): a spinner in the badge. */
    busy?: boolean;
}
/**
   * ResourceList organism — a light list of things you run or own (instances, volumes, jobs):
   * one row each with a leading slot, title and meta line, a status badge and per-row actions.
   * No header, no sorting — use DataTable for reports. Rows light up softly on hover.
   * `highlight` glows a row once each time it changes to that row's key (one just created).
   *
   *   <ResourceList items={servers} key={(s) => s.id} title={(s) => s.name}
   *     status={(s) => ({ label: 'Running', tone: 'live' })} />
   */
import type { Snippet } from 'svelte';
declare function $$render<T>(): {
    props: {
        items: T[];
        key: (item: T) => string;
        title: (item: T) => string;
        meta?: ((item: T) => string | undefined) | undefined;
        status?: ((item: T) => ResourceStatus | undefined) | undefined;
        leading?: Snippet<[T]> | undefined;
        actions?: Snippet<[T]> | undefined;
        emptyText?: string;
        label?: string | undefined;
        /** Glows that row once each time this changes to its key, and scrolls it into view. */
        highlight?: string | undefined;
    };
    exports: {};
    bindings: "";
    slots: {};
    events: {};
};
declare class __sveltets_Render<T> {
    props(): ReturnType<typeof $$render<T>>['props'];
    events(): ReturnType<typeof $$render<T>>['events'];
    slots(): ReturnType<typeof $$render<T>>['slots'];
    bindings(): "";
    exports(): {};
}
interface $$IsomorphicComponent {
    new <T>(options: import('svelte').ComponentConstructorOptions<ReturnType<__sveltets_Render<T>['props']>>): import('svelte').SvelteComponent<ReturnType<__sveltets_Render<T>['props']>, ReturnType<__sveltets_Render<T>['events']>, ReturnType<__sveltets_Render<T>['slots']>> & {
        $$bindings?: ReturnType<__sveltets_Render<T>['bindings']>;
    } & ReturnType<__sveltets_Render<T>['exports']>;
    <T>(internal: unknown, props: ReturnType<__sveltets_Render<T>['props']> & {}): ReturnType<__sveltets_Render<T>['exports']>;
    z_$$bindings?: ReturnType<__sveltets_Render<any>['bindings']>;
}
declare const ResourceList: $$IsomorphicComponent;
type ResourceList<T> = InstanceType<typeof ResourceList<T>>;
export default ResourceList;
