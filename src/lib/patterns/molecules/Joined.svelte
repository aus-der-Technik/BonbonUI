<script lang="ts">
  /**
   * Joined molecule — controls that belong together, joined into one: a field and its button (search + "+",
   * search + filter) or a few related actions (‹ Today ›). One capsule, hairlines between the
   * parts, one focus halo when its field has focus; the parts lose their own borders and
   * shadows. A filled part (`primary`, `tinted`: the action the group is about) stays a whole
   * pill of its own, inset in the capsule like a SegmentedControl's thumb — its gloss and glow end
   * in its own round ends, never cut off at a hairline. A press gives the whole group a little.
   *
   * It finds its parts at any depth — Buttons, SearchFields, selects and anything marked
   * `data-part` (a Popover's trigger, an import button in a span) — and marks the ends
   * (`data-joined` = first | mid | last | only), so parts may come and go with rights and state.
   * Give the parts the same `size` as the group (`md` 36 px in a toolbar, `sm` 32 px in a row or
   * a pane's head). A field marked `grow` (class) takes the room left.
   *
   *   <Joined label="Find or start a conversation">
   *     <SearchField label="Search conversations" bind:value={query} />
   *     <Button iconOnly icon="message-plus" label="New message" onclick={onnew} />
   *   </Joined>
   */
  import type { Snippet } from 'svelte';
  import { joinParts as parts } from './joined';

  interface Props {
    /** Accessible name of the group. */
    label: string;
    /** Height of the capsule: `md` 36 px (toolbars, the default), `sm` 32 px (rows, a pane's head). */
    size?: 'sm' | 'md' | undefined;
    /** `pill` in toolbars (the default), `rounded` in forms and dense panes. */
    shape?: 'pill' | 'rounded' | undefined;
    /** Takes the width of its container (the field grows). */
    full?: boolean | undefined;
    /** Extra classes on the group. */
    class?: string;
    /** The parts: fields, buttons, selects or anything marked `data-part`. */
    children: Snippet;
  }

  let {
    label,
    size = 'md',
    shape = 'pill',
    full = false,
    class: extra = '',
    children,
  }: Props = $props();
</script>

<div
  class="joined joined--{size} joined--{shape} {extra}"
  class:full
  role="group"
  aria-label={label}
  {@attach parts}
>
  {@render children()}
</div>

<style>
  .joined {
    --_h: var(--control-md);
    --_r: var(--radius-pill);
    position: relative;
    display: inline-flex;
    align-items: stretch;
    flex: none;
    min-width: 0;
    height: var(--_h);
    box-sizing: border-box;
    border: 1px solid var(--input-border);
    border-radius: var(--radius-pill);
    background: var(--input-bg);
    box-shadow: var(--glass-inset);
    isolation: isolate;
    transition:
      border-color var(--motion-quick) var(--ease-out),
      box-shadow var(--motion-quick) var(--ease-out),
      scale var(--motion-quick) var(--ease-jelly);
  }
  .joined--sm {
    --_h: var(--control-sm);
  }
  .joined--rounded {
    --_r: var(--radius-md);
    border-radius: var(--radius-md);
  }
  .full {
    display: flex;
    width: 100%;
  }
  .joined:hover:not(:focus-within) {
    border-color: var(--accent-border);
  }
  /* Its field has focus: the whole group lights, like a lone field would. */
  .joined:has(:global(input:focus), :global(select:focus)) {
    border-color: var(--accent);
    box-shadow: var(--focus-halo), var(--glass-inset);
  }
  /* A press gives the group, not one part of it. */
  .joined:has(:global(.btn[data-joined]:active:not(:disabled))) {
    scale: 0.985;
  }

  /* Wrappers between the group and a part step aside. */
  .joined :global([data-joined-wrap]) {
    display: contents;
  }
  .joined :global([data-joined]) {
    flex: none;
    margin: 0;
  }
  /* Hairlines between the parts. */
  .joined
    :global(
      :is([data-joined='mid'], [data-joined='last']):not(
        [data-joined-fill],
        [data-joined-after-fill]
      )
    ) {
    border-inline-start: 1px solid var(--border-strong) !important;
  }

  /* The field: the group draws its border, halo and corners. */
  .joined :global(.search[data-joined]),
  .joined :global([data-joined].grow) {
    flex: 1 1 auto;
    min-width: 0;
  }
  .joined :global(.search[data-joined] input),
  .joined :global(select[data-joined]) {
    height: 100%;
    border: 0;
    border-radius: 0;
    background-color: transparent;
    box-shadow: none;
  }
  .joined :global(select[data-joined]) {
    min-width: 0;
    padding-inline-end: 2rem;
  }
  .joined :global(select[data-joined]:focus-visible) {
    box-shadow: none;
  }
  .joined :global(.search[data-joined] input:focus) {
    box-shadow: none;
  }

  /* The buttons: flat parts of the capsule, squared to it, the ends following its corners. */
  .joined :global(.btn[data-joined]:not([data-joined-fill])) {
    height: 100%;
    border-top: 0;
    border-bottom: 0;
    border-inline-end: 0;
    border-radius: 0;
    box-shadow: none;
  }
  .joined :global(.btn:is([data-joined='first'], [data-joined='only']):not([data-joined-fill])) {
    border-inline-start: 0;
    border-start-start-radius: var(--_r);
    border-end-start-radius: var(--_r);
  }
  .joined :global(.btn[data-joined-after-fill]:not([data-joined-fill])) {
    border-inline-start: 0;
  }
  .joined :global(.btn:is([data-joined='last'], [data-joined='only']):not([data-joined-fill])) {
    border-start-end-radius: var(--_r);
    border-end-end-radius: var(--_r);
  }
  /* A filled part (primary, tinted) keeps its fill — that is the action the group is about — as
     a whole pill inset in the capsule, 3 px from its outer edge like a SegmentedControl's thumb,
     so the two line up side by side. Its gradient, gloss and sheen end in its own round ends. */
  .joined :global(.btn[data-joined-fill]) {
    align-self: stretch;
    height: auto;
    margin: 2px;
    border-radius: calc(var(--_r) - 3px);
    box-shadow:
      0 2px 6px -1px color-mix(in srgb, var(--tint) 32%, transparent),
      inset 0 1px 0 rgb(255 255 255 / calc(0.4 * var(--on-accent-highlight, 1)));
  }
  .joined :global(.btn.btn--tinted[data-joined-fill]) {
    box-shadow: inset 0 1px 0 color-mix(in srgb, white 30%, transparent);
  }
  .joined :global(.btn[data-joined]:active:not(:disabled)) {
    transform: none;
  }
  .joined
    :global(
      .btn[data-joined]:is(.btn--secondary, .btn--soft, .btn--ghost, .btn--glass, .btn--plain)
    ) {
    background: transparent;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }
  .joined
    :global(
      .btn[data-joined]:is(
          .btn--secondary,
          .btn--soft,
          .btn--ghost,
          .btn--glass,
          .btn--plain
        ):hover:not(:disabled)
    ) {
    background: var(--accent-faint);
    color: var(--accent-ink);
  }
  .joined
    :global(
      .btn[data-joined]:is(
          .btn--secondary,
          .btn--soft,
          .btn--ghost,
          .btn--glass,
          .btn--plain
        ):active:not(:disabled)
    ),
  .joined :global(.btn[data-joined][aria-pressed='true']),
  .joined :global(.btn[data-joined][aria-expanded='true']) {
    background: color-mix(in oklch, var(--accent) 14%, transparent);
    color: var(--accent-ink);
  }
  /* An icon-only part is a little wider than tall, so a round end does not crowd it (and so is
     a collapsed one on a phone, below). */
  .joined :global(.btn.btn--icon-only[data-joined]:not([data-joined-fill])) {
    aspect-ratio: auto;
    width: calc(var(--_h) + 6px);
  }
  .joined
    :global(
      .btn.btn--icon-only:is([data-joined='last'], [data-joined='first']):not([data-joined-fill])
    ) {
    width: calc(var(--_h) + 10px);
  }
  .joined :global(.btn.btn--icon-only[data-joined='last']:not([data-joined-fill])) {
    padding-inline-end: 4px;
  }
  .joined :global(.btn.btn--icon-only[data-joined='first']:not([data-joined-fill])) {
    padding-inline-start: 4px;
  }
  /* A filled icon: a short pill, a little wider than tall. */
  .joined :global(.btn.btn--icon-only[data-joined-fill]) {
    aspect-ratio: auto;
    width: calc(var(--_h) + 2px);
  }
  @media (max-width: 720px) {
    .joined :global(.btn.btn--collapse[data-joined]:not([data-joined-fill])) {
      aspect-ratio: auto;
      width: calc(var(--_h) + 6px);
    }
    .joined
      :global(
        .btn.btn--collapse:is([data-joined='last'], [data-joined='first']):not([data-joined-fill])
      ) {
      width: calc(var(--_h) + 10px);
    }
    .joined :global(.btn.btn--collapse[data-joined='last']:not([data-joined-fill])) {
      padding-inline-end: 4px;
    }
    .joined :global(.btn.btn--collapse[data-joined-fill]) {
      aspect-ratio: auto;
      width: calc(var(--_h) + 2px);
    }
  }
  /* The ring of a focused part stays inside the capsule. */
  .joined :global(.btn[data-joined]:focus-visible) {
    outline-offset: -3px;
  }
  .joined :global(.btn[data-joined]:focus-visible::before) {
    display: none;
  }

  @media (prefers-reduced-motion: reduce) {
    .joined {
      transition: none;
    }
    .joined:has(:global(.btn[data-joined]:active:not(:disabled))) {
      scale: none;
    }
  }
</style>
