<script lang="ts">
  /**
   * AdminLayout template — the classic admin frame, now a preset of Page: the floating header
   * on top, content in the gutter-aligned body, a small grey footer line. `fill` makes a
   * viewport-high shell whose last child (a Sheet, a map) takes the room below the header; a
   * `sidebar` (e.g. SideNav) sits left and moves on top below 900px. New code can use Page
   * directly — it takes the same props plus `nav`, `aside`, `floating` and `width`.
   */
  import type { Snippet } from 'svelte';
  import Page from './Page.svelte';

  interface Props {
    title: string;
    subtitle?: string | undefined;
    href?: string | undefined;
    /** A plain click on the title pill. */
    onhome?: ((event: MouseEvent) => void) | undefined;
    fill?: boolean;
    /** Keeps the `fill` shell on phones too (see Page). */
    fillOnPhone?: boolean;
    footer?: string | Snippet | undefined;
    actions?: Snippet | undefined;
    /** The header's actions fill the width beside the title pill (see AppHeader). */
    fillActions?: boolean;
    sidebar?: Snippet | undefined;
    /** Passed through to Page: a sticky row under the header, a right column, floating actions. */
    nav?: Snippet | undefined;
    aside?: Snippet | undefined;
    floating?: Snippet | undefined;
    width?: 'narrow' | 'medium' | 'wide' | 'full';
    children: Snippet;
  }

  let {
    title,
    subtitle,
    href,
    onhome,
    fill = false,
    fillOnPhone = false,
    footer,
    actions,
    fillActions = false,
    sidebar,
    nav,
    aside,
    floating,
    width = 'full',
    children,
  }: Props = $props();
</script>

<Page
  {title}
  {subtitle}
  {href}
  {onhome}
  {fill}
  {fillOnPhone}
  {footer}
  {actions}
  {fillActions}
  {sidebar}
  {nav}
  {aside}
  {floating}
  {width}
  gap="md"
  {children}
/>
