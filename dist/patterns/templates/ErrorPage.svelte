<script lang="ts">
  /**
   * ErrorPage template — a whole page for 404s, 403s and 500s: big status code, reason, an
   * optional description and illustration, then "Go back" (history) and an optional home link.
   * The code is set huge in a candy gradient of the tint; the illustration floats gently.
   * Without a `title` the common codes get a short default (404: "This page took a coffee
   * break."); every other text is plain and says what to do.
   *
   *   <ErrorPage code={404} homeHref="/" />
   */
  import type { Snippet } from 'svelte';
  import Button from '../atoms/Button.svelte';

  interface Props {
    code: number | string;
    /** Defaults to a short line for the code (see `defaultTitles`). */
    title?: string | undefined;
    /** Overrides the default titles per code. */
    titles?: Record<string, string> | undefined;
    description?: string | undefined;
    /** An image URL; or pass the `illustration` snippet. */
    image?: string | undefined;
    imageAlt?: string;
    backLabel?: string;
    homeHref?: string | undefined;
    homeLabel?: string;
    onback?: (() => void) | undefined;
    illustration?: Snippet | undefined;
    children?: Snippet | undefined;
  }

  let {
    code,
    title,
    titles,
    description,
    image,
    imageAlt = '',
    backLabel = 'Go back',
    homeHref,
    homeLabel = 'Home',
    onback,
    illustration,
    children,
  }: Props = $props();

  const defaultTitles: Record<string, string> = {
    '400': 'That request did not look right.',
    '401': 'Please sign in to see this page.',
    '403': 'You do not have access to this page.',
    '404': 'This page took a coffee break.',
    '500': 'Something broke on our side.',
    '503': 'We are down for a moment. Try again soon.',
  };
  const heading = $derived(
    title ??
      titles?.[String(code)] ??
      defaultTitles[String(code)] ??
      'Something went wrong. Try again.',
  );

  function back() {
    if (onback) onback();
    else history.back();
  }
</script>

<main class="error-page">
  <div class="text">
    <p class="code">{code}</p>
    <h1>{heading}</h1>
    {#if description}<p class="description">{description}</p>{/if}
    {@render children?.()}
    <div class="actions">
      <Button
        variant="primary"
        shape="pill"
        size="lg"
        icon="arrow-left"
        label={backLabel}
        onclick={back}
      />
      {#if homeHref}<Button
          variant="glass"
          shape="pill"
          size="lg"
          href={homeHref}
          icon="home"
          label={homeLabel}
        />{/if}
    </div>
  </div>
  {#if illustration}
    <div class="art">{@render illustration()}</div>
  {:else if image}
    <div class="art"><img src={image} alt={imageAlt} /></div>
  {/if}
</main>

<style>
  .error-page {
    /* The Application's height: the viewport, or its frame when contained. */
    min-height: var(--app-height, 100dvh);
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    align-items: center;
    gap: var(--space-8);
    max-width: 72rem;
    margin: 0 auto;
    padding: var(--space-8) var(--content-gutter);
  }
  .code {
    font-size: clamp(4.5rem, 14vw, 9rem);
    font-weight: 800;
    line-height: 0.95;
    letter-spacing: -0.05em;
    font-variant-numeric: tabular-nums;
    color: var(--accent-ink);
  }
  @supports (background-clip: text) or (-webkit-background-clip: text) {
    .code {
      background: linear-gradient(135deg, var(--accent) 10%, var(--tint-2) 55%, var(--tint-3));
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      /* the glyphs' descenders and the tight leading would clip the gradient */
      padding-bottom: 0.05em;
    }
  }
  h1 {
    margin-top: var(--space-3);
    font-size: clamp(1.5rem, 3vw, 2.25rem);
    font-weight: var(--fw-bold);
    letter-spacing: -0.02em;
    line-height: 1.2;
    text-wrap: balance;
  }
  .description {
    margin-top: var(--space-3);
    max-width: 44ch;
    color: var(--text-2);
    font-size: var(--fs-lg);
    line-height: 1.5;
  }
  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
    margin-top: var(--space-8);
  }
  .art {
    display: grid;
    place-items: center;
    /* Slow, small, endless: an idle moment, not an attention grab. */
    animation: bb-float 5s var(--ease-in-out) infinite;
  }
  @media (prefers-reduced-motion: reduce) {
    .art {
      animation: none;
    }
  }
  .art img {
    max-width: 100%;
    max-height: 60vh;
    height: auto;
  }
  @media (max-width: 800px) {
    .error-page {
      grid-template-columns: minmax(0, 1fr);
      align-content: center;
      text-align: center;
    }
    .description {
      margin-inline: auto;
    }
    .actions {
      justify-content: center;
    }
    .art {
      order: -1;
    }
    .art img {
      max-height: 30vh;
    }
  }
</style>
