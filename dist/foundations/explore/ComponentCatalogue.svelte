<script lang="ts">
  /**
   * Storybook-only: every exported component on one page, grouped by level, each with a small
   * live preview, its one line, its tags and a link to its story. A floating bar holds the
   * search and the level; the tags below it narrow further (an entry must carry every chosen
   * tag), and a tag on a card toggles the same filter right where it is read.
   */
  import DocPage from '../DocPage.svelte';
  import Layer from '../../patterns/layout/Layer.svelte';
  import Badge from '../../patterns/atoms/Badge.svelte';
  import Button from '../../patterns/atoms/Button.svelte';
  import Icon from '../../patterns/atoms/Icon.svelte';
  import SearchField from '../../patterns/molecules/SearchField.svelte';
  import SegmentedControl from '../../patterns/molecules/SegmentedControl.svelte';
  import ToggleChip from '../../patterns/molecules/ToggleChip.svelte';
  import EmptyState from '../../patterns/molecules/EmptyState.svelte';
  import Preview from './Preview.svelte';
  import { storyHref } from '../study/links';
  import { explorePager } from './explore';
  import {
    catalogue,
    filterCatalogue,
    levelBlurbs,
    levels,
    tagBlurbs,
    tags,
    type CatalogueTag,
    type Level,
  } from './catalogue';

  let query = $state('');
  let level = $state<Level | 'All'>('All');
  let chosen = $state<CatalogueTag[]>([]);

  const shown = $derived(filterCatalogue(catalogue, query, level, chosen));
  const byLevel = $derived(
    Object.fromEntries(levels.map((l) => [l, shown.filter((e) => e.level === l)])) as Record<
      Level,
      typeof shown
    >,
  );
  // How many entries each tag would leave, given the search and the level.
  const tagCounts = $derived(
    Object.fromEntries(
      tags.map((t) => [
        t,
        filterCatalogue(catalogue, query, level, chosen.includes(t) ? chosen : [...chosen, t])
          .length,
      ]),
    ) as Record<CatalogueTag, number>,
  );
  const filtering = $derived(query.trim() !== '' || level !== 'All' || chosen.length > 0);

  const levelOptions = [
    { value: 'All' as const, label: 'All' },
    ...levels.map((l) => ({ value: l, label: l })),
  ];

  function toggle(tag: CatalogueTag, on = !chosen.includes(tag)) {
    chosen = on ? [...chosen.filter((t) => t !== tag), tag] : chosen.filter((t) => t !== tag);
  }

  function clear() {
    query = '';
    level = 'All';
    chosen = [];
  }
</script>

<DocPage
  eyebrow="Explore"
  title="Component catalogue"
  lead="Every component the package exports, on one page and alive: search by name or by what it does, narrow by level and by tag, and open any card for its stories."
  pager={explorePager('Component catalogue')}
>
  <Layer level="front" direction="horizontal" gap="sm" wrap class="catalogue-bar">
    <div class="search">
      <SearchField
        label="Search components"
        bind:value={query}
        size="sm"
        shape="pill"
        placeholder="Search {catalogue.length} components"
      />
    </div>
    <SegmentedControl label="Level" size="sm" wrap options={levelOptions} bind:value={level} />
  </Layer>

  <div class="filters">
    <div class="tags" role="group" aria-label="Filter by tag">
      {#each tags as t (t)}
        <ToggleChip
          size="sm"
          label={t}
          title={tagBlurbs[t]}
          count={tagCounts[t]}
          pressed={chosen.includes(t)}
          disabled={!tagCounts[t] && !chosen.includes(t)}
          onchange={(on) => toggle(t, on)}
        />
      {/each}
    </div>
    <div class="status">
      <span aria-live="polite">
        {#if filtering}
          {shown.length} of {catalogue.length} shown{chosen.length > 1 ? ' · every chosen tag' : ''}
        {:else}
          {catalogue.length} components · pick tags to narrow
        {/if}
      </span>
      {#if filtering}
        <Button
          size="xs"
          shape="pill"
          variant="ghost"
          icon="close"
          label="Clear filters"
          onclick={clear}
        />
      {/if}
    </div>
  </div>

  {#if !shown.length}
    <EmptyState
      icon="search"
      title="Nothing matches"
      message="Try fewer words, another level, or fewer tags."
      actionLabel="Clear filters"
      onaction={clear}
    />
  {/if}

  {#each levels as l (l)}
    {@const entries = byLevel[l]}
    <section class="level" class:empty={!entries.length}>
      <header class="level-head">
        <h2>{l}</h2>
        <p>
          {levelBlurbs[l]}
          <span class="n">{entries.length}{filtering ? ` shown` : ''}</span>
        </p>
      </header>
      {#if entries.length}
        <ul class="grid">
          {#each entries as entry (entry.name)}
            <li class="entry">
              <Preview {entry} />
              <div class="meta">
                <h3 class="name">
                  {#if entry.story}
                    <a class="link" href={storyHref(entry.story)} target="_top">{entry.name}</a>
                  {:else}
                    <span>{entry.name}</span>
                  {/if}
                  {#if entry.tags.includes('deprecated')}<Badge
                      tone="draft"
                      size="sm"
                      label="Old name"
                    />{/if}
                </h3>
                <p class="desc">{entry.description}</p>
                {#if entry.entry}
                  <p class="entry-note">
                    <Icon name="package" size={12} /> from
                    <code>@bonbon-ui/core/{entry.entry}</code>
                  </p>
                {/if}
                {#if !entry.story}<p class="entry-note">No story of its own yet.</p>{/if}
                <div class="card-tags">
                  {#each entry.tags as t (t)}
                    <button
                      type="button"
                      class="card-tag"
                      aria-pressed={chosen.includes(t)}
                      title={chosen.includes(t) ? `Stop filtering by ${t}` : `Show only ${t}`}
                      onclick={() => toggle(t)}>{t}</button
                    >
                  {/each}
                </div>
              </div>
            </li>
          {/each}
        </ul>
      {:else if shown.length}
        <p class="none">
          {level !== 'All' && level !== l
            ? `Hidden while ${level} is chosen.`
            : `No ${l.toLowerCase()} match.`}
        </p>
      {/if}
    </section>
  {/each}
</DocPage>

<style>
  /* ── The floating bar: search and level ───────────────────────────────────────────────── */
  :global(.catalogue-bar) {
    z-index: var(--z-front);
    align-items: center;
  }
  .search {
    flex: 1 1 14rem;
    min-width: 12rem;
  }

  /* ── Tags and the count, on the ground under the bar ──────────────────────────────────── */
  .filters {
    display: grid;
    gap: var(--space-3);
    margin-top: calc(var(--space-12) * -0.5);
  }
  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
  }
  .status {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-2);
    min-height: var(--control-xs);
    color: var(--text-3);
    font-size: var(--fs-sm);
    font-variant-numeric: tabular-nums;
  }

  /* ── A level: a heading on the ground, then the cards ─────────────────────────────────── */
  .level {
    display: grid;
    gap: var(--space-6);
  }
  .level.empty {
    gap: var(--space-2);
  }
  .level-head {
    display: grid;
    gap: var(--space-2);
  }
  .level .level-head p {
    color: var(--text-2);
  }
  .n {
    margin-left: var(--space-2);
    color: var(--text-3);
    font-size: var(--fs-sm);
    font-variant-numeric: tabular-nums;
  }
  .level .none {
    color: var(--text-3);
    font-size: var(--fs-sm);
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(14.5rem, 1fr));
    gap: var(--space-8) var(--space-5);
    margin: 0;
    padding: 0;
    list-style: none;
  }

  /* ── A card: the preview tile (a panel), the words on the ground ─────────────────────── */
  .entry {
    position: relative;
    display: grid;
    align-content: start;
    gap: var(--space-3);
  }
  .meta {
    display: grid;
    gap: var(--space-1);
  }
  .name {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    font-size: var(--fs-md);
    font-weight: var(--fw-semibold);
    letter-spacing: var(--tracking-tight);
  }
  /* The whole card is the link; the tags sit above it so they stay their own buttons.
     Rules start at .entry / .level to outrank DocPage's prose rules for links and text. */
  .entry .link {
    color: var(--text);
    text-decoration: none;
  }
  .link::after {
    content: '';
    position: absolute;
    inset: calc(var(--space-2) * -1);
    border-radius: calc(var(--radius-card) + var(--space-2));
  }
  .link:focus-visible {
    outline: none;
  }
  .link:focus-visible::after {
    outline: var(--focus-ring);
  }
  .entry:hover .link,
  .entry .link:focus-visible {
    color: var(--accent-ink);
  }
  .entry:hover :global(.explore-tile) {
    border-color: var(--accent-border);
  }
  .entry .desc {
    color: var(--text-2);
    font-size: var(--fs-sm);
    line-height: 1.45;
  }
  .entry .entry-note {
    display: flex;
    align-items: center;
    gap: var(--space-1);
    color: var(--text-3);
    font-size: var(--fs-xs);
  }
  .entry-note code {
    font-family: var(--font-mono);
  }
  .card-tags {
    position: relative;
    z-index: 1;
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-1) var(--space-3);
    margin-top: var(--space-1);
  }
  .card-tag {
    padding: 0;
    border: 0;
    background: none;
    color: var(--text-3);
    font: inherit;
    font-size: var(--fs-xs);
    cursor: pointer;
    transition: color var(--motion-quick) var(--ease-out);
  }
  .card-tag:hover {
    color: var(--text);
  }
  .card-tag[aria-pressed='true'] {
    color: var(--accent-ink);
    font-weight: var(--fw-semibold);
  }
  .card-tag:focus-visible {
    outline: var(--focus-ring);
    outline-offset: 2px;
    border-radius: var(--radius-xs);
  }
</style>
