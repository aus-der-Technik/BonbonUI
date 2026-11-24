<script lang="ts">
  /**
   * NotificationBanner — an operating-system style notification: the app's candy icon, its
   * name and the time, a bold title and a line of text, optional action buttons. A click on
   * the banner opens it; the close button (on hover and focus) dismisses it. Stack several in
   * a NotificationCenter.
   *
   *   <NotificationBanner app="Mail" icon="mail" color="var(--color-blue)" time="now"
   *     title="Ana Example" body="Lunch on Friday?" onopen={openMail} onclose={dismiss} />
   */
  import Icon from '../atoms/Icon.svelte';
  import type { IconName } from '../atoms/icons';
  import AppIcon from '../atoms/AppIcon.svelte';
  import type { AppColor } from './shared.svelte';

  interface Props {
    /** The sending app's name. */
    app: string;
    icon?: IconName | undefined;
    /** A palette name, `accent`, or any CSS colour. */
    color?: AppColor | undefined;
    /** App icon picture instead of the glyph. */
    src?: string | undefined;
    title: string;
    body?: string | undefined;
    /** "now", "5m ago", "09:41". */
    time?: string | undefined;
    actions?: { label: string; onclick: () => void }[];
    onopen?: (() => void) | undefined;
    onclose?: (() => void) | undefined;
    closeLabel?: string;
  }

  let {
    app,
    icon = 'bell',
    color = 'accent',
    src,
    title,
    body,
    time,
    actions = [],
    onopen,
    onclose,
    closeLabel = 'Dismiss',
  }: Props = $props();

  const id = $props.id();
</script>

<article
  class="banner"
  aria-labelledby="{id}-title"
  aria-describedby={body ? `${id}-body` : undefined}
>
  {#if onopen}
    <!-- The whole card opens the notification; the button is the keyboard way in. -->
    <button type="button" class="open" aria-labelledby="{id}-title" onclick={onopen}></button>
  {/if}
  <span class="icon"><AppIcon label={app} {icon} {color} {src} size={38} /></span>
  <div class="text">
    <div class="meta">
      <span class="app">{app}</span>
      {#if time}<span class="time">{time}</span>{/if}
    </div>
    <h3 id="{id}-title">{title}</h3>
    {#if body}<p id="{id}-body">{body}</p>{/if}
    {#if actions.length}
      <div class="actions">
        {#each actions as a (a.label)}
          <button type="button" class="action" onclick={a.onclick}>{a.label}</button>
        {/each}
      </div>
    {/if}
  </div>
  {#if onclose}
    <button type="button" class="close" aria-label={closeLabel} onclick={onclose}>
      <Icon name="close" size={11} />
    </button>
  {/if}
</article>

<style>
  .banner {
    position: relative;
    display: flex;
    align-items: flex-start;
    gap: var(--space-3);
    width: 22rem;
    max-width: 100%;
    padding: var(--space-3) var(--space-4) var(--space-3) var(--space-3);
    border-radius: var(--radius-card);
    border: 0.75px solid var(--layer-front-border);
    background: var(--layer-front-bg);
    box-shadow: var(--shadow-pop);
    backdrop-filter: var(--layer-front-blur);
    -webkit-backdrop-filter: var(--layer-front-blur);
    color: var(--text);
    transition:
      transform var(--motion-base) var(--ease-out),
      box-shadow var(--motion-base) var(--ease-out);
  }
  .banner:has(.open:hover) {
    transform: var(--hover-lift);
  }
  .banner:has(.open:active) {
    transform: scale(0.99);
  }
  .open {
    position: absolute;
    inset: 0;
    z-index: 0;
    padding: 0;
    border: 0;
    border-radius: inherit;
    background: none;
    cursor: pointer;
  }
  .open:focus-visible {
    outline: var(--focus-ring);
    outline-offset: 2px;
  }
  .text {
    position: relative;
    z-index: 1;
    flex: 1;
    min-width: 0;
    pointer-events: none;
  }
  .meta {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: var(--space-2);
    color: var(--text-3);
    font-size: var(--fs-2xs);
    font-weight: var(--fw-semibold);
    letter-spacing: var(--tracking-caps);
    text-transform: uppercase;
  }
  .time {
    letter-spacing: 0;
    text-transform: none;
    font-variant-numeric: tabular-nums;
  }
  h3 {
    margin: 2px 0 0;
    overflow: hidden;
    font-size: var(--fs-md);
    font-weight: var(--fw-bold);
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  p {
    display: -webkit-box;
    margin: 1px 0 0;
    overflow: hidden;
    color: var(--text-2);
    font-size: var(--fs-sm);
    line-clamp: 2;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .actions {
    display: flex;
    gap: var(--space-2);
    margin-top: var(--space-2);
    pointer-events: auto;
  }
  .action {
    flex: 1;
    height: var(--control-sm);
    padding: 0 var(--space-3);
    border: 0;
    border-radius: var(--radius-pill);
    background: var(--fill-muted);
    color: var(--text);
    font: inherit;
    font-size: var(--fs-sm);
    font-weight: var(--fw-semibold);
    cursor: pointer;
  }
  .action {
    transition: transform var(--motion-quick) var(--ease-jelly);
  }
  .action:hover {
    background: var(--fill-off);
  }
  .action:active {
    transform: var(--press-squish);
  }
  .action:focus-visible {
    outline: var(--focus-ring);
  }
  .icon {
    position: relative;
    z-index: 1;
    pointer-events: none;
  }
  /* Dismiss sits on the top-right corner, over the time, only while you point at the card. */
  .close {
    position: absolute;
    top: -6px;
    right: -6px;
    z-index: 2;
    display: grid;
    place-items: center;
    width: 22px;
    height: 22px;
    padding: 0;
    border: 0.75px solid var(--pill-border);
    border-radius: 50%;
    background: var(--tooltip-bg);
    box-shadow: var(--shadow-frosted);
    color: var(--text-2);
    cursor: pointer;
    opacity: 0;
    transform: scale(0.6);
    transition:
      opacity var(--motion-quick) var(--ease-out),
      transform var(--motion-base) var(--ease-spring);
  }
  .banner:hover .close,
  .close:focus-visible {
    opacity: 1;
    transform: none;
  }
  .close:hover {
    color: var(--text);
  }
  .close:focus-visible {
    outline: var(--focus-ring);
  }
  @media (pointer: coarse) {
    .close {
      opacity: 1;
      transform: none;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .banner,
    .close,
    .action {
      transition: none;
    }
  }
  @media (prefers-reduced-transparency: reduce) {
    .banner {
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
      background: var(--glass-strong);
    }
  }
</style>
