<script lang="ts">
  /**
   * AuthLayout template — the frame of sign-in, sign-out, activation and error pages: a
   * full-screen background (a photo or gradient via `background`, else the Application's tinted
   * backdrop), a sticky liquid-glass top bar with logo and an optional clock, the content
   * centred, footer links at the bottom. With `card` the content sits on a liquid-glass card
   * that eases in and gives a polite head-shake when `shake` turns true (a wrong password).
   * `greeting` adds a friendly time-of-day line to the top bar ("Good morning"; the wink of
   * the moment shows on hover) — pass `true` or your own text.
   *
   *   <AuthLayout title="Sign in" clock links={[{ label: 'Privacy', href: '/privacy' }]}>
   *     <SignInCard … />
   *   </AuthLayout>
   */
  import type { Snippet } from 'svelte';
  import BrandBar from '../atoms/BrandBar.svelte';
  import { greeting as greet } from '../../utils/delight';

  interface FooterLink {
    label: string;
    href: string;
  }

  interface Props {
    /** Text beside the brand bar in the top bar (ignored with a `logo`). */
    title?: string | undefined;
    /** Any CSS background-image value, e.g. `url(/bg.jpg)` or an `image-set(…)`. */
    background?: string | undefined;
    clock?: boolean;
    /** A friendly greeting in the top bar: `true` for the time of day, or your own text. */
    greeting?: boolean | string | undefined;
    /** Locale of the clock; default: the browser's. */
    locale?: string | undefined;
    card?: boolean;
    shake?: boolean;
    cardWidth?: string;
    links?: FooterLink[];
    /** Accessible name of the footer link list. */
    linksLabel?: string;
    logo?: Snippet | undefined;
    children: Snippet;
  }

  let {
    title,
    background,
    clock = false,
    greeting = false,
    locale,
    card = true,
    shake = false,
    cardWidth = '24rem',
    links = [],
    linksLabel = 'Legal',
    logo,
    children,
  }: Props = $props();

  const timeFormat = $derived(
    new Intl.DateTimeFormat(locale, { hour: '2-digit', minute: '2-digit' }),
  );
  let now = $state(new Date());
  const hello = $derived(
    typeof greeting === 'string'
      ? { text: greeting, wink: undefined }
      : greeting
        ? greet(now)
        : undefined,
  );

  $effect(() => {
    if (!clock && greeting !== true) return;
    const timer = setInterval(() => (now = new Date()), 10_000);
    return () => clearInterval(timer);
  });
</script>

<div class="auth" class:photo={!!background} style:--photo={background}>
  <header class="top">
    <span class="brand">
      {#if logo}{@render logo()}{:else}<BrandBar height={22} />{#if title}<span class="title"
            >{title}</span
          >{/if}{/if}
    </span>
    {#if hello || clock}
      <span class="end">
        {#if hello}<span class="greeting"
            >{hello.text}{#if hello.wink}<span class="wink"> · {hello.wink}</span>{/if}</span
          >{/if}
        {#if clock}<time class="clock" datetime={now.toISOString()}>{timeFormat.format(now)}</time
          >{/if}
      </span>
    {/if}
  </header>

  <main class="center">
    {#if card}
      <div class="card" class:shake style:--card-width={cardWidth}>{@render children()}</div>
    {:else}
      {@render children()}
    {/if}
  </main>

  {#if links.length}
    <footer class="foot">
      <nav class="links" aria-label={linksLabel}>
        {#each links as link (link.label)}<a href={link.href}>{link.label}</a>{/each}
      </nav>
    </footer>
  {/if}
</div>

<style>
  .auth {
    position: relative;
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
    color: var(--text);
  }
  .photo {
    background:
      var(--photo) center / cover no-repeat,
      var(--bg);
  }
  /* Front layer: sticky (design rule). */
  .top {
    position: sticky;
    top: var(--sticky-gap);
    z-index: var(--z-header);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-4);
    min-height: var(--control-xl);
    margin: var(--sticky-gap) var(--gutter) 0;
    padding: var(--space-2) var(--space-5);
    border-radius: var(--radius-pill);
    background: var(--layer-front-bg);
    backdrop-filter: var(--layer-front-blur);
    -webkit-backdrop-filter: var(--layer-front-blur);
    border: 0.75px solid var(--layer-front-border);
    box-shadow: var(--layer-front-shadow);
  }
  .brand {
    display: inline-flex;
    align-items: center;
    gap: var(--space-3);
    min-width: 0;
  }
  .title {
    font-size: var(--fs-2xl);
    font-weight: var(--fw-bold);
    letter-spacing: var(--tracking-tight);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .end {
    display: inline-flex;
    align-items: center;
    gap: var(--space-3);
    min-width: 0;
  }
  .greeting {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: var(--fs-md);
    font-weight: var(--fw-medium);
    color: var(--text-2);
  }
  /* The wink reveals itself when someone lingers on the greeting. */
  .wink {
    display: inline-block;
    max-width: 0;
    overflow: hidden;
    vertical-align: bottom;
    opacity: 0;
    color: var(--text-3);
    transition:
      max-width var(--motion-slow) var(--ease-out),
      opacity var(--motion-base) var(--ease-out);
  }
  .greeting:hover .wink {
    max-width: 24rem;
    opacity: 1;
  }
  .greeting + .clock::before {
    content: '';
    display: inline-block;
    width: 4px;
    height: 4px;
    margin: 0 var(--space-3) 0 0;
    border-radius: 50%;
    background: var(--text-3);
    vertical-align: middle;
  }
  .clock {
    font-size: var(--fs-lg);
    font-weight: var(--fw-semibold);
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }
  @media (max-width: 520px) {
    .greeting,
    .greeting + .clock::before {
      display: none;
    }
  }
  .center {
    flex: 1;
    display: grid;
    place-items: center;
    padding: var(--space-8) var(--space-4);
  }
  .card {
    width: min(var(--card-width), 100%);
    padding: var(--space-8) var(--space-6);
    border-radius: var(--radius-dialog);
    background: var(--layer-front-bg), var(--glass);
    backdrop-filter: var(--layer-front-blur);
    -webkit-backdrop-filter: var(--layer-front-blur);
    border: 0.75px solid var(--layer-front-border);
    box-shadow: var(--shadow-dialog);
    animation: card-in var(--motion-slow) var(--ease-out);
  }
  .card.shake {
    animation: bb-nope var(--motion-slow) var(--ease-out);
  }
  .foot {
    display: flex;
    justify-content: center;
    padding: 0 var(--space-4) var(--space-6);
  }
  .links {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--space-1) var(--space-2);
  }
  .links a {
    padding: var(--space-1) var(--space-3);
    border-radius: var(--radius-pill);
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
    color: var(--text-2);
    text-decoration: none;
    transition:
      background-color var(--motion-quick) var(--ease-out),
      color var(--motion-quick) var(--ease-out);
  }
  .links a:hover {
    color: var(--accent-ink);
    background: var(--accent-faint);
  }
  .links a:focus-visible {
    outline: var(--focus-ring);
    outline-offset: 2px;
  }
  /* Over a photo the links sit on a frosted pill, readable on any picture in both themes. */
  .photo .links {
    padding: var(--space-1);
    border-radius: var(--radius-pill);
    background: var(--glass);
    backdrop-filter: var(--blur-glass);
    -webkit-backdrop-filter: var(--blur-glass);
    border: 1px solid var(--border);
    box-shadow: var(--glass-shadow);
  }
  .photo .links a {
    color: var(--text);
  }
  @keyframes card-in {
    from {
      opacity: 0;
      transform: translateY(16px) scale(0.97);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .card,
    .card.shake {
      animation: none;
    }
    .wink {
      transition: none;
    }
  }
  @media (prefers-reduced-transparency: reduce) {
    .top,
    .card,
    .photo .links {
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
      background: var(--glass-strong);
    }
  }
</style>
