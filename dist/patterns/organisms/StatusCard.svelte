<script lang="ts">
  /**
   * StatusCard organism — a centred card for a moment between pages: signing in after an SSO
   * return, signing out, a device activated, a failed callback. `working` spins, `success` shows
   * a large check, `error` an alert. With `redirectTo` it counts down `redirectIn` seconds, then
   * calls `onredirect` (or navigates there); a link lets people continue at once. The card is
   * liquid glass; the success check springs in.
   *
   *   <StatusCard status="working" title="Signing you in" message="Checking your session…" />
   */
  import { onMount, type Snippet } from 'svelte';
  import BrandBar from '../atoms/BrandBar.svelte';
  import Icon from '../atoms/Icon.svelte';
  import Link from '../atoms/Link.svelte';
  import Spinner from '../atoms/Spinner.svelte';
  import { celebrate } from '../../utils/delight';

  interface Props {
    status: 'working' | 'success' | 'error';
    title: string;
    message?: string | undefined;
    redirectTo?: string | undefined;
    redirectIn?: number;
    continueLabel?: string;
    redirectingLabel?: (seconds: number) => string;
    onredirect?: ((href: string) => void) | undefined;
    children?: Snippet | undefined;
  }

  let {
    status,
    title,
    message,
    redirectTo,
    redirectIn = 3,
    continueLabel = 'Continue',
    redirectingLabel = (s) => `Redirecting in ${s} s…`,
    onredirect,
    children,
  }: Props = $props();

  // svelte-ignore state_referenced_locally
  let left = $state(redirectIn);

  onMount(() => {
    if (!redirectTo) return;
    const target = redirectTo;
    const timer = setInterval(() => {
      left = Math.max(0, left - 1);
      if (left === 0) {
        clearInterval(timer);
        if (onredirect) onredirect(target);
        else window.location.assign(target);
      }
    }, 1000);
    return () => clearInterval(timer);
  });
  // Joy at the end of the task: one small burst once the tick has landed.
  function cheer(node: HTMLElement) {
    const timer = setTimeout(() => celebrate(node), 260);
    return { destroy: () => clearTimeout(timer) };
  }
</script>

<div class="wrap">
  <div
    class="card card--{status}"
    role={status === 'error' ? 'alert' : 'status'}
    aria-live="polite"
  >
    {#if status === 'working'}
      <Spinner size={32} label="" />
    {:else if status === 'success'}
      <span class="tick" use:cheer
        ><svg class="check" viewBox="0 0 24 24" width="32" height="32" aria-hidden="true"
          ><path d="M5.5 12.5l4.2 4.2L18.5 7.8" pathLength="1" /></svg
        ></span
      >
    {:else}
      <span class="cross"><Icon name="alert" size={26} /></span>
    {/if}
    <div class="titles">
      <BrandBar height={18} />
      <h1>{title}</h1>
    </div>
    {#if message}<p class="message">{message}</p>{/if}
    {@render children?.()}
    {#if redirectTo}
      <p class="redirect">
        {redirectingLabel(left)}
        <Link href={redirectTo}>{continueLabel}</Link>
      </p>
    {/if}
  </div>
</div>

<style>
  .wrap {
    display: grid;
    place-items: center;
    min-height: min(32rem, 80vh);
    padding: var(--space-8) var(--space-4);
  }
  .card {
    display: grid;
    justify-items: center;
    gap: var(--space-3);
    width: min(26rem, 100%);
    padding: var(--space-8) var(--space-6);
    border-radius: var(--radius-dialog);
    text-align: center;
    background: var(--layer-front-bg), var(--glass-strong);
    backdrop-filter: var(--layer-front-blur);
    -webkit-backdrop-filter: var(--layer-front-blur);
    border: 0.75px solid var(--layer-front-border);
    box-shadow: var(--shadow-dialog);
  }
  .titles {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    margin-top: var(--space-1);
  }
  h1 {
    font-size: var(--fs-2xl);
    font-weight: var(--fw-bold);
    letter-spacing: var(--tracking-tight);
  }
  .message {
    color: var(--text-2);
    font-size: var(--fs-md);
    line-height: 1.5;
  }
  .card--error .message {
    color: var(--danger);
  }
  .tick,
  .cross {
    display: grid;
    place-items: center;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    color: white;
  }
  .tick {
    background: var(--grad-success);
    box-shadow: var(--shadow-success);
    animation: pop var(--motion-base) var(--ease-spring);
  }
  .check path {
    fill: none;
    stroke: currentColor;
    stroke-width: 2.6;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 1;
    /* The tick draws itself in once the badge has popped. */
    animation: draw var(--motion-slow) var(--ease-spring) var(--motion-quick) both;
  }
  @keyframes draw {
    from {
      stroke-dashoffset: 1;
    }
    to {
      stroke-dashoffset: 0;
    }
  }
  /* Errors arrive plainly: a quick fade, no bounce. */
  .cross {
    animation: appear var(--motion-base) var(--ease-out);
  }
  @keyframes appear {
    from {
      opacity: 0;
    }
  }
  .cross {
    background: var(--grad-danger);
    box-shadow: 0 8px 20px color-mix(in srgb, var(--danger) 30%, transparent);
  }
  .redirect {
    font-size: var(--fs-sm);
    color: var(--text-3);
    font-variant-numeric: tabular-nums;
  }
  @keyframes pop {
    from {
      transform: scale(0.5);
      opacity: 0;
    }
    to {
      transform: none;
      opacity: 1;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .tick,
    .cross,
    .check path {
      animation: none;
    }
  }
  @media (prefers-reduced-transparency: reduce) {
    .card {
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
      background: var(--layer-front-bg), var(--bg);
    }
  }
</style>
