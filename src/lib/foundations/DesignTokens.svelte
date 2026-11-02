<script lang="ts">
  /**
   * Storybook-only gallery of the design tokens, read at runtime from the computed styles of
   * `:root`, so it can never drift from tokens.css (and follows the theme toolbar).
   */
  import { onMount } from 'svelte';
  import DocPage from './DocPage.svelte';

  const groups: {
    title: string;
    kind: 'color' | 'surface' | 'radius' | 'font' | 'shadow';
    names: string[];
  }[] = [
    {
      title: 'Tint & accent (computed from --tint)',
      kind: 'color',
      names: [
        '--tint',
        '--accent',
        '--accent-strong',
        '--accent-ink',
        '--accent-soft',
        '--accent-faint',
        '--accent-border',
        '--on-accent',
        '--tint-2',
        '--tint-3',
      ],
    },
    {
      title: 'Tint scale',
      kind: 'color',
      names: [
        '--tint-50',
        '--tint-100',
        '--tint-200',
        '--tint-300',
        '--tint-400',
        '--tint-500',
        '--tint-600',
        '--tint-700',
        '--tint-800',
        '--tint-900',
      ],
    },
    {
      title: 'Status (fixed hues)',
      kind: 'color',
      names: ['--danger', '--danger-strong', '--ok', '--ok-dark', '--warn', '--draft', '--info'],
    },
    {
      title: 'Candy palette',
      kind: 'color',
      names: [
        '--color-red',
        '--color-orange',
        '--color-yellow',
        '--color-green',
        '--color-mint',
        '--color-teal',
        '--color-cyan',
        '--color-blue',
        '--color-indigo',
        '--color-purple',
        '--color-pink',
        '--color-brown',
        '--color-gray',
      ],
    },
    { title: 'Text', kind: 'color', names: ['--text', '--text-2', '--text-3'] },
    {
      title: 'Chart roles',
      kind: 'color',
      names: [
        '--up',
        '--down',
        '--line',
        '--star-1',
        '--star-2',
        '--star-3',
        '--star-4',
        '--star-5',
        '--star-on',
      ],
    },
    {
      title: 'Categorical series',
      kind: 'color',
      names: ['--series-1', '--series-2', '--series-3', '--series-4'],
    },
    {
      title: 'Fills & tints',
      kind: 'color',
      names: [
        '--fill-hover',
        '--fill-subtle',
        '--fill-muted',
        '--tint-accent',
        '--tint-danger',
        '--tint-ok',
        '--tint-warn',
        '--tint-info',
      ],
    },
    {
      title: 'Surfaces',
      kind: 'surface',
      names: [
        '--glass',
        '--glass-strong',
        '--pill-tint',
        '--tooltip-bg',
        '--input-bg',
        '--head-bg',
        '--editor-bg',
        '--layer-panel-bg',
        '--layer-selected-bg',
        '--layer-front-bg',
        '--grad-primary',
        '--grad-success',
        '--grad-danger',
        '--avatar-grad',
      ],
    },
    {
      title: 'Shadows',
      kind: 'shadow',
      names: [
        '--glass-shadow',
        '--shadow-frosted',
        '--shadow-pop',
        '--shadow-header-pill',
        '--layer-selected-shadow',
        '--shadow-primary',
        '--shadow-success',
      ],
    },
    {
      title: 'Radii',
      kind: 'radius',
      names: [
        '--radius-xs',
        '--radius-sm',
        '--radius-md',
        '--radius-lg',
        '--radius-xl',
        '--radius-card',
        '--radius-pop',
        '--radius-dialog',
        '--radius-pill',
      ],
    },
    {
      title: 'Type scale',
      kind: 'font',
      names: [
        '--fs-2xs',
        '--fs-xs',
        '--fs-sm',
        '--fs-md',
        '--fs-base',
        '--fs-lg',
        '--fs-xl',
        '--fs-2xl',
        '--fs-3xl',
        '--fs-display',
        '--fs-kpi',
      ],
    },
  ];

  let values = $state<Record<string, string>>({});

  function read() {
    const style = getComputedStyle(document.documentElement);
    values = Object.fromEntries(
      groups.flatMap((g) => g.names).map((name) => [name, style.getPropertyValue(name).trim()]),
    );
  }

  onMount(() => {
    read();
    // The toolbar flips <html data-theme> and sets --tint inline; the OS can flip the scheme.
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme', 'style'],
    });
    const media = matchMedia('(prefers-color-scheme: dark)');
    media.addEventListener('change', read);
    return () => {
      observer.disconnect();
      media.removeEventListener('change', read);
    };
  });
</script>

<DocPage
  title="Design tokens"
  lead="Every value the components use, read live from tokens.css — switch the theme or the tint in the toolbar and watch them change. Use these names in your own components."
>
  <div class="tokens">
    {#each groups as group (group.title)}
      <section>
        <h2>{group.title}</h2>
        <div class="grid grid--{group.kind}">
          {#each group.names as name (name)}
            <figure>
              {#if group.kind === 'color'}
                <div class="swatch" style:background="var({name})"></div>
              {:else if group.kind === 'surface'}
                <div class="swatch surface" style:background="var({name})"></div>
              {:else if group.kind === 'shadow'}
                <div class="swatch shadow" style:box-shadow="var({name})"></div>
              {:else if group.kind === 'radius'}
                <div class="swatch radius" style:border-radius="var({name})"></div>
              {:else}
                <div class="type" style:font-size="var({name})">Feedback received</div>
              {/if}
              <figcaption><code>{name}</code><span>{values[name]}</span></figcaption>
            </figure>
          {/each}
        </div>
      </section>
    {/each}
  </div>
</DocPage>

<style>
  .tokens {
    display: grid;
    gap: var(--space-8);
    color: var(--text);
    font-family: var(--font-sans);
  }
  h2 {
    font-size: var(--fs-2xl);
    font-weight: var(--fw-semibold);
    margin-bottom: var(--space-3);
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: var(--space-4);
  }
  .grid--font {
    grid-template-columns: 1fr;
  }
  .grid--shadow {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: var(--space-8);
  }
  figure {
    display: grid;
    gap: var(--space-2);
    margin: 0;
  }
  .grid--font figure {
    grid-template-columns: 12rem 1fr;
    align-items: baseline;
  }
  .grid--font figcaption {
    order: -1;
  }
  .swatch {
    height: 64px;
    border-radius: var(--radius-lg);
    border: 1px solid var(--border-strong);
  }
  .surface {
    backdrop-filter: var(--blur-glass);
  }
  .shadow {
    background: var(--glass-strong);
    border: 0;
  }
  .radius {
    height: 56px;
    background: var(--accent-soft);
    border: 2px solid var(--accent);
  }
  figcaption {
    display: grid;
    font-size: var(--fs-xs);
    color: var(--text-3);
  }
  figcaption span {
    overflow-wrap: anywhere;
  }
  code {
    font-family: var(--font-mono);
    color: var(--text);
  }
</style>
