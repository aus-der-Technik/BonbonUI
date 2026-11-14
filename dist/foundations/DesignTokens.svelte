<script lang="ts">
  /**
   * Storybook-only gallery of the design tokens, read at runtime from the computed styles of
   * `:root`, so it can never drift from tokens.css (and follows the theme toolbar).
   */
  import { onMount } from 'svelte';
  import DocPage from './DocPage.svelte';
  import IntroRich from './IntroRich.svelte';

  type Kind = 'color' | 'surface' | 'radius' | 'font' | 'shadow' | 'space' | 'value';
  interface Group {
    title: string;
    kind: Kind;
    names: string[];
  }

  const chapters: { title: string; text: string; groups: Group[] }[] = [
    {
      title: 'Colour',
      text: 'The accent family and the tint scale are computed from `--tint`; status, palette and text colours are fixed.',
      groups: [
        {
          title: 'Tint & accent',
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
          names: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((n) => `--tint-${n}`),
        },
        {
          title: 'Status',
          kind: 'color',
          names: [
            '--danger',
            '--danger-strong',
            '--ok',
            '--ok-dark',
            '--warn',
            '--draft',
            '--info',
          ],
        },
        {
          title: 'Candy palette',
          kind: 'color',
          names: [
            'red',
            'orange',
            'yellow',
            'green',
            'mint',
            'teal',
            'cyan',
            'blue',
            'indigo',
            'purple',
            'pink',
            'brown',
            'gray',
          ].map((c) => `--color-${c}`),
        },
        { title: 'Text', kind: 'color', names: ['--text', '--text-2', '--text-3'] },
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
            '--border',
            '--border-strong',
          ],
        },
      ],
    },
    {
      title: 'Charts',
      text: 'Roles for values that rise and fall, ratings, and series that need telling apart.',
      groups: [
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
      ],
    },
    {
      title: 'Layers and surfaces',
      text: 'The four layers, the glass panels turn into over a photo, the ink tile, and the fills of inputs, tooltips and gradients.',
      groups: [
        {
          title: 'Layers',
          kind: 'surface',
          names: [
            '--layer-panel-bg',
            '--layer-selected-bg',
            '--layer-front-bg',
            '--photo-glass',
            '--ink-surface',
          ],
        },
        {
          title: 'Other surfaces',
          kind: 'surface',
          names: [
            '--glass',
            '--glass-strong',
            '--pill-tint',
            '--tooltip-bg',
            '--input-bg',
            '--head-bg',
            '--editor-bg',
          ],
        },
        {
          title: 'Gradients',
          kind: 'surface',
          names: ['--grad-primary', '--grad-success', '--grad-danger', '--avatar-grad'],
        },
        {
          title: 'Shadows',
          kind: 'shadow',
          names: [
            '--layer-panel-shadow',
            '--layer-selected-shadow',
            '--layer-front-shadow',
            '--shadow-pop',
            '--shadow-primary',
            '--shadow-success',
          ],
        },
      ],
    },
    {
      title: 'Shape and type',
      text: 'Radii scale with the Radius setting; the type scale is the only set of font sizes.',
      groups: [
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
      ],
    },
    {
      title: 'Space and motion',
      text: 'The spacing steps behind every `gap` and `padding` (drawn four times as long), and the durations and curves behind every movement.',
      groups: [
        {
          title: 'Space',
          kind: 'space',
          names: [1, 2, 3, 4, 5, 6, 8, 10, 12].map((n) => `--space-${n}`),
        },
        {
          title: 'Motion',
          kind: 'value',
          names: [
            '--motion-quick',
            '--motion-base',
            '--motion-slow',
            '--motion-lazy',
            '--ease-out',
            '--ease-in-out',
            '--ease-spring',
            '--ease-jelly',
            '--press-squish',
          ],
        },
      ],
    },
  ];
  const groups = chapters.flatMap((c) => c.groups);

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
  lead="Every value the components use, read live from tokens.css. Switch the theme or tint in the toolbar and watch them change."
>
  {#each chapters as chapter (chapter.title)}
    <section class="chapter">
      <h2>{chapter.title}</h2>
      <p><IntroRich text={chapter.text} /></p>
      {#each chapter.groups as group (group.title)}
        <div class="group">
          <div class="group-title">{group.title}</div>
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
                {:else if group.kind === 'space'}
                  <div class="space"><span style:width="calc(var({name}) * 4)"></span></div>
                {:else if group.kind === 'font'}
                  <div class="type" style:font-size="var({name})">Feedback received</div>
                {/if}
                <figcaption><span class="name">{name}</span><span>{values[name]}</span></figcaption>
              </figure>
            {/each}
          </div>
        </div>
      {/each}
    </section>
  {/each}
</DocPage>

<style>
  .chapter {
    display: grid;
    gap: var(--space-4);
  }
  .group {
    display: grid;
    gap: var(--space-3);
    margin-top: var(--space-4);
  }
  .group-title {
    font-size: var(--fs-2xs);
    font-weight: var(--fw-semibold);
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--text-3);
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(9rem, 1fr));
    gap: var(--space-5) var(--space-4);
  }
  .grid--font,
  .grid--space,
  .grid--value {
    grid-template-columns: minmax(0, 1fr);
    gap: 0;
  }
  .grid--shadow {
    grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
    gap: var(--space-8) var(--space-6);
  }
  figure {
    display: grid;
    align-content: start;
    gap: var(--space-2);
    margin: 0;
    min-width: 0;
  }
  .grid--font figure,
  .grid--space figure,
  .grid--value figure {
    grid-template-columns: 13rem minmax(0, 1fr);
    align-items: center;
    gap: var(--space-4);
    padding: var(--space-2) 0;
    border-top: 1px solid var(--border);
  }
  .grid--font figcaption,
  .grid--space figcaption {
    order: -1;
  }
  .grid--value figcaption {
    grid-column: 1 / -1;
    grid-template-columns: 13rem minmax(0, 1fr);
    gap: var(--space-4);
  }
  .swatch {
    height: 56px;
    border-radius: var(--radius-lg);
    border: 1px solid var(--border);
  }
  .surface {
    backdrop-filter: var(--blur-glass);
  }
  .shadow {
    background: var(--layer-panel-bg);
    border: 0;
  }
  .radius {
    background: var(--accent-soft);
    border: 1.5px solid var(--accent);
  }
  .space span {
    display: block;
    height: 12px;
    border-radius: var(--radius-pill);
    background: var(--accent);
  }
  .type {
    color: var(--text);
    line-height: 1.2;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  figcaption {
    display: grid;
    gap: 2px;
    font-size: var(--fs-xs);
    color: var(--text-3);
  }
  figcaption span {
    overflow-wrap: anywhere;
  }
  /* Computed values can be long expressions: two lines are enough to recognise one. */
  figcaption span:not(.name) {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    overflow: hidden;
  }
  .name {
    font-family: var(--font-mono);
    color: var(--text);
  }
  @media (max-width: 640px) {
    .grid--font figure,
    .grid--space figure,
    .grid--value figure,
    .grid--value figcaption {
      grid-template-columns: minmax(0, 1fr);
      gap: var(--space-1);
    }
  }
</style>
