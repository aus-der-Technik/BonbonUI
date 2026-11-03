<script lang="ts" module>
  import type { IconName } from '../atoms/icons';
  import type { AppColor } from './shared.svelte';

  export interface OsNotification {
    id: string;
    app: string;
    icon?: IconName | undefined;
    color?: AppColor | undefined;
    src?: string | undefined;
    title: string;
    body?: string | undefined;
    time?: string | undefined;
    actions?: { label: string; onclick: () => void }[] | undefined;
  }
</script>

<script lang="ts">
  /**
   * NotificationCenter — where NotificationBanners appear: a stack in the top right corner
   * that slides new ones in, announces them politely to screen readers and, with `duration`,
   * dismisses them on its own (paused while the pointer or keyboard focus is on the stack, so
   * nobody loses a banner they are reading or tabbing to). Inside a Desktop
   * it sits in the desktop's corner, elsewhere in the viewport's.
   *
   *   <NotificationCenter {notifications} duration={6000}
   *     onclose={(id) => (notifications = notifications.filter((n) => n.id !== id))} />
   */
  import { flip } from 'svelte/animate';
  import NotificationBanner from './NotificationBanner.svelte';
  import { getDesktop } from './shared.svelte';
  import { glide, motion } from '../../utils/motion';

  interface Props {
    notifications: OsNotification[];
    onopen?: ((notification: OsNotification) => void) | undefined;
    onclose?: ((id: string) => void) | undefined;
    /** Auto-dismiss after this many ms; 0 keeps them. */
    duration?: number;
    /** At most this many show; older ones wait. */
    max?: number;
    label?: string;
    closeLabel?: string;
  }

  let {
    notifications,
    onopen,
    onclose,
    duration = 0,
    max = 4,
    label = 'Notifications',
    closeLabel = 'Dismiss',
  }: Props = $props();

  const inDesktop = !!getDesktop();
  const flipMotion = motion('base');
  const shown = $derived(notifications.slice(0, max));
  let hovered = $state(false);
  let focused = $state(false);
  const paused = $derived(hovered || focused);
  // Timer handles are bookkeeping, not state the markup reads.
  // eslint-disable-next-line svelte/prefer-svelte-reactivity
  const timers = new Map<string, ReturnType<typeof setTimeout>>();

  $effect(() => {
    if (!duration || paused) {
      for (const t of timers.values()) clearTimeout(t);
      timers.clear();
      return;
    }
    const ids = new Set(shown.map((n) => n.id));
    for (const [id, t] of timers) {
      if (!ids.has(id)) {
        clearTimeout(t);
        timers.delete(id);
      }
    }
    for (const id of ids) {
      if (!timers.has(id))
        timers.set(
          id,
          setTimeout(() => {
            timers.delete(id);
            onclose?.(id);
          }, duration),
        );
    }
  });

  $effect(() => () => {
    for (const t of timers.values()) clearTimeout(t);
  });
</script>

<section
  class="center"
  class:in-desktop={inDesktop}
  aria-label={label}
  aria-live="polite"
  onpointerenter={() => (hovered = true)}
  onpointerleave={() => (hovered = false)}
  onfocusin={() => (focused = true)}
  onfocusout={(e) => {
    const next = e.relatedTarget;
    if (!(next instanceof Node && e.currentTarget.contains(next))) focused = false;
  }}
>
  {#each shown as n (n.id)}
    <div
      class="slot"
      animate:flip={{
        duration: flipMotion.reduced ? 0 : flipMotion.duration,
        easing: flipMotion.ease,
      }}
      transition:glide={{ x: 40 }}
    >
      <NotificationBanner
        app={n.app}
        icon={n.icon}
        color={n.color}
        src={n.src}
        title={n.title}
        body={n.body}
        time={n.time}
        actions={n.actions ?? []}
        {closeLabel}
        onopen={onopen ? () => onopen(n) : undefined}
        onclose={onclose ? () => onclose(n.id) : undefined}
      />
    </div>
  {/each}
</section>

<style>
  .center {
    position: fixed;
    top: calc(var(--page-top, 0px) + var(--space-3));
    right: var(--space-3);
    z-index: var(--z-toast);
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: var(--space-2);
    max-width: calc(100% - 2 * var(--space-3));
    pointer-events: none;
  }
  .in-desktop {
    position: absolute;
  }
  .slot {
    max-width: 100%;
    pointer-events: auto;
  }
  @media (max-width: 520px) {
    .center {
      left: var(--space-3);
      align-items: stretch;
    }
    .slot :global(.banner) {
      width: 100%;
    }
  }
</style>
