export interface Crumb {
    label: string;
    href?: string | undefined;
    /** For in-app navigation without a URL: the crumb becomes a button that looks like a link. */
    onclick?: ((event: MouseEvent) => void) | undefined;
}
interface Props {
    items: Crumb[];
    label?: string;
    /** Called for crumbs without an `href` (except the current one); they render as buttons. */
    onnavigate?: ((item: Crumb, index: number) => void) | undefined;
}
declare const Breadcrumbs: import("svelte").Component<Props, {}, "">;
type Breadcrumbs = ReturnType<typeof Breadcrumbs>;
export default Breadcrumbs;
