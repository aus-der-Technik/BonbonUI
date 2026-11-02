<script lang="ts" module>
  /** A customer or partner logo: an image (`src`, SVG works best) or just the name as a wordmark. */
  export interface Logo {
    name: string;
    src?: string | undefined;
    href?: string | undefined;
  }
</script>

<script lang="ts">
  /**
   * LogoCloud molecule — the quiet row of customer logos under a hero ("Trusted by teams at…").
   * Logos are muted to one grey so a mix of brands still looks calm, and regain their colour on
   * hover. Without `src` a logo is set as a wordmark from its name.
   *
   *   <LogoCloud title="Trusted by teams at" logos={[{ name: 'Larkspur' }, { name: 'Umbra' }]} />
   */
  import type { Snippet } from 'svelte';

  interface Props {
    logos?: Logo[];
    title?: string | undefined;
    /** Logo height. */
    height?: string;
    /** Keep the brand colours instead of muting them. */
    colored?: boolean;
    align?: 'center' | 'start';
    /** Own logos (inline SVGs…) after the listed ones. */
    children?: Snippet | undefined;
  }

  let {
    logos = [],
    title,
    height = '1.75rem',
    colored = false,
    align = 'center',
    children,
  }: Props = $props();

  const id = $props.id();
</script>

<section
  class="cloud cloud--{align}"
  class:colored
  style:--logo-h={height}
  aria-labelledby={title ? `${id}-title` : undefined}
>
  {#if title}<p class="title" id="{id}-title">{title}</p>{/if}
  <ul class="logos">
    {#each logos as logo (logo.name)}
      <li>
        <svelte:element
          this={logo.href ? 'a' : 'span'}
          href={logo.href}
          class="logo"
          title={logo.name}
        >
          {#if logo.src}
            <img src={logo.src} alt={logo.name} loading="lazy" decoding="async" />
          {:else}
            <span class="wordmark">{logo.name}</span>
          {/if}
        </svelte:element>
      </li>
    {/each}
    {#if children}<li class="own">{@render children()}</li>{/if}
  </ul>
</section>

<style>
  .cloud {
    display: grid;
    gap: var(--space-5);
    min-width: 0;
  }
  .title {
    font-size: var(--fs-sm);
    font-weight: var(--fw-semibold);
    color: var(--text-3);
  }
  .cloud--center {
    justify-items: center;
    text-align: center;
  }
  .logos {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-6) clamp(var(--space-6), 4vw, var(--space-12));
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .cloud--center .logos {
    justify-content: center;
  }
  li {
    display: flex;
    align-items: center;
  }
  .own {
    gap: inherit;
  }
  .logo,
  .own :global(svg) {
    display: flex;
    align-items: center;
    height: var(--logo-h);
    color: var(--text-2);
    text-decoration: none;
    opacity: 0.62;
    transition:
      opacity var(--motion-quick) var(--ease-out),
      filter var(--motion-quick) var(--ease-out);
  }
  .logo img {
    height: 100%;
    width: auto;
    max-width: 9rem;
    object-fit: contain;
    filter: grayscale(1) contrast(0.9);
  }
  .wordmark {
    font-size: calc(var(--logo-h) * 0.72);
    font-weight: var(--fw-bold);
    letter-spacing: -0.035em;
    white-space: nowrap;
  }
  .logo:hover,
  .own :global(svg:hover) {
    opacity: 1;
  }
  .logo:hover img,
  .colored .logo img {
    filter: none;
  }
  .colored .logo {
    opacity: 1;
  }
  a.logo:focus-visible {
    outline: var(--focus-ring);
    outline-offset: 2px;
    border-radius: var(--radius-sm);
    opacity: 1;
  }
</style>
