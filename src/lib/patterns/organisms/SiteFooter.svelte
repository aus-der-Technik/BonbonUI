<script lang="ts" module>
  import type { IconName } from '../atoms/icons';

  export interface FooterLink {
    label: string;
    href: string;
  }
  export interface FooterColumn {
    title: string;
    links: FooterLink[];
  }
  export interface SocialLink {
    /** Accessible name, e.g. "Mastodon". */
    label: string;
    href: string;
    icon: IconName;
  }
</script>

<script lang="ts">
  /**
   * SiteFooter organism — the bottom of a website: brand and tagline, columns of links, social
   * icons, and a fine-print row (copyright, legal links). Columns reflow from a row on desktop
   * to two-up on phones. Put it in a Page's `footer` snippet.
   *
   *   <SiteFooter brand="Larkspur" tagline="Tools for small teams." columns={columns}
   *     finePrint="© 2026 Larkspur Studio" />
   */
  import type { Snippet } from 'svelte';
  import Icon from '../atoms/Icon.svelte';

  interface Props {
    brand?: string | undefined;
    logo?: Snippet | undefined;
    brandHref?: string;
    tagline?: string | undefined;
    columns?: FooterColumn[];
    social?: SocialLink[];
    /** Copyright line. */
    finePrint?: string | undefined;
    /** Imprint, privacy, terms… next to the fine print. */
    legal?: FooterLink[];
    /** `panel` is a glass card; `ground` sits directly on the backdrop. */
    level?: 'panel' | 'ground';
    /** Under the tagline: a newsletter form, app store badges. */
    children?: Snippet | undefined;
    label?: string;
    legalLabel?: string;
  }

  let {
    brand,
    logo,
    brandHref = '/',
    tagline,
    columns = [],
    social = [],
    finePrint,
    legal = [],
    level = 'panel',
    children,
    label = 'Footer',
    legalLabel = 'Legal',
  }: Props = $props();

  const id = $props.id();
</script>

<footer class="footer footer--{level}">
  <div class="top">
    {#if brand || logo || tagline || children || social.length}
      <div class="about">
        {#if brand || logo}
          <a class="brand" href={brandHref}>
            {#if logo}{@render logo()}{/if}
            {#if brand}<span class="wordmark">{brand}</span>{/if}
          </a>
        {/if}
        {#if tagline}<p class="tagline">{tagline}</p>{/if}
        {#if children}<div class="extra">{@render children()}</div>{/if}
        {#if social.length}
          <ul class="social">
            {#each social as link (`${link.label}|${link.href}`)}
              <li>
                <a href={link.href} aria-label={link.label} title={link.label}>
                  <Icon name={link.icon} size={18} />
                </a>
              </li>
            {/each}
          </ul>
        {/if}
      </div>
    {/if}
    {#if columns.length}
      <nav class="columns" aria-label={label}>
        {#each columns as column, c (column.title)}
          <div class="column">
            <h2 class="heading" id="{id}-c{c}">{column.title}</h2>
            <ul aria-labelledby="{id}-c{c}">
              {#each column.links as link (link.href + link.label)}
                <li><a href={link.href}>{link.label}</a></li>
              {/each}
            </ul>
          </div>
        {/each}
      </nav>
    {/if}
  </div>

  {#if finePrint || legal.length}
    <div class="bottom">
      {#if finePrint}<p class="fine">{finePrint}</p>{/if}
      {#if legal.length}
        <nav aria-label={legalLabel}>
          <ul class="legal">
            {#each legal as link (link.href + link.label)}
              <li><a href={link.href}>{link.label}</a></li>
            {/each}
          </ul>
        </nav>
      {/if}
    </div>
  {/if}
</footer>

<style>
  .footer {
    container-type: inline-size;
    display: grid;
    gap: var(--space-8);
    min-width: 0;
    color: var(--text-2);
    font-size: var(--fs-md);
  }
  .footer--panel {
    padding: var(--space-8) clamp(var(--space-5), 4vw, var(--space-12)) var(--space-6);
    border-radius: var(--radius-dialog);
    background: var(--layer-panel-bg);
    border: 1px solid var(--layer-panel-border);
    box-shadow: var(--layer-panel-shadow);
    backdrop-filter: var(--layer-panel-blur);
    -webkit-backdrop-filter: var(--layer-panel-blur);
  }
  .top {
    display: grid;
    grid-template-columns: minmax(14rem, 1fr) 2fr;
    gap: var(--space-8) var(--space-12);
  }
  .top:not(:has(.about)),
  .top:not(:has(.columns)) {
    grid-template-columns: minmax(0, 1fr);
  }
  .about {
    display: grid;
    align-content: start;
    gap: var(--space-4);
    max-width: 22rem;
  }
  .brand {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    justify-self: start;
    color: var(--text);
    text-decoration: none;
    border-radius: var(--radius-sm);
  }
  .wordmark {
    font-size: var(--fs-xl);
    font-weight: var(--fw-bold);
    letter-spacing: -0.025em;
  }
  .tagline {
    line-height: 1.55;
  }
  .columns {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(9rem, 1fr));
    gap: var(--space-8) var(--space-6);
  }
  .column {
    display: grid;
    align-content: start;
    gap: var(--space-3);
  }
  .heading {
    font-size: var(--fs-sm);
    font-weight: var(--fw-semibold);
    color: var(--text);
  }
  ul {
    display: grid;
    gap: var(--space-2);
    margin: 0;
    padding: 0;
    list-style: none;
  }
  a {
    color: inherit;
    text-decoration: none;
    transition: color var(--motion-quick) var(--ease-out);
  }
  a:hover {
    color: var(--accent-ink);
  }
  a:focus-visible {
    outline: var(--focus-ring);
    outline-offset: 2px;
    border-radius: var(--radius-xs);
  }
  .social {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
  }
  .social a {
    display: grid;
    place-items: center;
    width: var(--control-md);
    height: var(--control-md);
    border-radius: var(--radius-pill);
    color: var(--text-2);
    background: var(--fill-subtle);
    transition:
      background var(--motion-quick) var(--ease-out),
      color var(--motion-quick) var(--ease-out),
      transform var(--motion-quick) var(--ease-jelly);
  }
  /* Pills brighten instead of lifting; they squish when pressed. */
  .social a:hover {
    color: var(--accent-ink);
    background: var(--accent-soft);
  }
  .social a:active {
    transform: var(--press-squish);
  }
  .social a:focus-visible {
    border-radius: var(--radius-pill);
    box-shadow: var(--focus-halo);
  }
  .bottom {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-3) var(--space-6);
    padding-top: var(--space-5);
    border-top: 1px solid var(--border-strong);
    font-size: var(--fs-sm);
    color: var(--text-3);
  }
  .legal {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2) var(--space-5);
  }

  @container (max-width: 720px) {
    .top {
      grid-template-columns: minmax(0, 1fr);
    }
    .columns {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .social a {
      transition: none;
    }
    .social a:hover {
      transform: none;
    }
  }
  @media (prefers-reduced-transparency: reduce) {
    .footer--panel {
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
      background: var(--glass-strong);
    }
  }
</style>
