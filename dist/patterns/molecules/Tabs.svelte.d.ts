import type { IconName } from '../atoms/icons';
export interface TabItem {
    value: string;
    label: string;
    icon?: IconName | undefined;
    count?: number | undefined;
    disabled?: boolean;
    /** Route tabs: a link instead of a panel switch (pass the current route as `value`). */
    href?: string | undefined;
}
/**
   * Tabs molecule — an ARIA tablist. `variant="line"` (default) draws an accent bar under the
   * active tab; `variant="pill"` puts the tabs in a recessed track with the active one on a glass
   * pill. Arrow keys, Home and End move between tabs (automatic activation); the `panel` snippet
   * renders the active one. Tabs with `href` are links (route navigation, `aria-current="page"`).
   * `actions` sits at the right end of the tab bar, e.g. a "+ New" button.
   *
   *   <Tabs label="Order" tabs={[{ value: 'items', label: 'Items' }, …]} bind:value>
   *     {#snippet panel(tab)}…{/snippet}
   *   </Tabs>
   */
import type { Snippet } from 'svelte';
interface Props {
    tabs: TabItem[];
    value?: string;
    label: string;
    variant?: 'line' | 'pill';
    onchange?: ((value: string) => void) | undefined;
    panel?: Snippet<[string]> | undefined;
    actions?: Snippet | undefined;
}
declare const Tabs: import("svelte").Component<Props, {}, "value">;
type Tabs = ReturnType<typeof Tabs>;
export default Tabs;
