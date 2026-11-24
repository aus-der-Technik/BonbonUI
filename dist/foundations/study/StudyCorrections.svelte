<script lang="ts">
  /**
   * Storybook-only: what the study found wrong in the system and what changed — a design audit
   * written so that non-designers can follow each decision. The count of each principle is also
   * its filter: pick one, and only the corrections that broke it remain (the headings stay, so
   * "On this page" keeps working).
   */
  import StudyPage from './StudyPage.svelte';
  import Quote from './Quote.svelte';
  import Section from '../../patterns/layout/Section.svelte';
  import { PRINCIPLES, type Principle } from '../../demo/DesignNotes.svelte';
  import { corrections } from './corrections';

  const keys = Object.keys(PRINCIPLES) as Principle[];
  const all = corrections.flatMap((g) => g.items);
  const byPrinciple = keys.map((p) => ({
    p,
    count: all.filter((c) => c.breaks.includes(p)).length,
  }));

  let only = $state<Principle | null>(null);
  const visible = (breaks: Principle[]) => !only || breaks.includes(only);
  const shown = $derived(all.filter((c) => visible(c.breaks)).length);
  const sorted = (breaks: Principle[]) =>
    [...breaks].sort((a, b) => PRINCIPLES[a].n - PRINCIPLES[b].n);
</script>

<StudyPage
  slug="corrections"
  title="Corrections"
  lead="A study is only honest if it turns its principles on its own work. This is what was wrong, and what changed."
>
  <Section
    title="{all.length} corrections, by what they broke"
    description="Each correction names the principle it violated; most broke more than one."
    gap="lg"
  >
    <div class="counts" role="group" aria-label="Show corrections that broke">
      {#each byPrinciple as { p, count } (p)}
        <button
          type="button"
          class="count"
          aria-pressed={only === p}
          onclick={() => (only = only === p ? null : p)}
        >
          <span class="big">{count}</span>
          <span class="label">{PRINCIPLES[p].n} · {PRINCIPLES[p].label}</span>
        </button>
      {/each}
    </div>
    <div class="status" aria-live="polite">
      {#if only}
        Showing the {shown} that broke “{PRINCIPLES[only].label}”.
        <button type="button" class="clear" onclick={() => (only = null)}>Show all</button>
      {:else}
        Pick a principle to see only its corrections.
      {/if}
    </div>
  </Section>

  {#each corrections as group (group.title)}
    {@const items = group.items.filter((c) => visible(c.breaks))}
    <Section title={group.title} description={group.intro} gap="md">
      {#if items.length}
        <ol class="list" class:filtered={only}>
          {#each items as c (c.was)}
            <li class="row">
              <div class="was">
                <span class="k">Was</span>
                <span class="t">{c.was}</span>
              </div>
              <div class="now">
                <span class="k">Now</span>
                <span class="t">{c.now}</span>
              </div>
              <div class="foot">
                {#each sorted(c.breaks) as b (b)}<span class="tag" class:hit={b === only}
                    >{PRINCIPLES[b].n} · {PRINCIPLES[b].label}</span
                  >{/each}
                <span class="where">{c.where}</span>
              </div>
            </li>
          {/each}
        </ol>
      {:else}
        <span class="none">None of this kind in this group.</span>
      {/if}
    </Section>
  {/each}

  <Section
    title="Rules that do not hold in practice are wishes"
    description="Several of these problems contradicted rules the system had already written down."
    gap="lg"
  >
    <p>
      “Feedback where it happened”, “targets of at least 32 px”, “colour never the only signal”: the
      rules were right, but nothing checked them. That is why every example now carries design notes
      that point at the parts of the page they talk about — so anyone, designer or not, can hold the
      screen to its own promises.
    </p>
    <Quote
      text="Good design is thorough down to the last detail."
      author="Dieter Rams"
      source="the eighth of his ten principles"
    />
  </Section>
</StudyPage>

<style>
  .counts {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 9rem), 1fr));
    border-top: 1px solid var(--border-strong);
    border-bottom: 1px solid var(--border-strong);
  }
  .count {
    display: grid;
    align-content: start;
    gap: var(--space-2);
    padding: var(--space-4) var(--space-4) var(--space-5);
    border: 0;
    border-left: 1px solid var(--border-strong);
    background: none;
    color: var(--text);
    font: inherit;
    text-align: left;
    cursor: pointer;
    transition:
      background var(--motion-quick) var(--ease-out),
      box-shadow var(--motion-quick) var(--ease-out);
  }
  .count:first-child {
    border-left: 0;
  }
  .count:hover {
    background: var(--fill-subtle);
  }
  .count[aria-pressed='true'] {
    box-shadow: inset 0 -2px 0 var(--accent);
    background: var(--accent-faint);
  }
  .count:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
  }
  .big {
    font-family: var(--font-serif);
    font-size: 3.2rem;
    line-height: 1;
    color: var(--accent-ink);
    font-variant-numeric: lining-nums tabular-nums;
  }
  .label {
    font-size: var(--fs-sm);
    line-height: 1.4;
    color: var(--text-2);
  }
  .status {
    font-size: var(--fs-sm);
    color: var(--text-2);
  }
  .clear {
    margin-left: var(--space-1);
    padding: 0;
    border: 0;
    background: none;
    color: var(--accent-ink);
    font: inherit;
    text-decoration: underline;
    text-underline-offset: 3px;
    cursor: pointer;
  }
  .clear:focus-visible {
    outline: var(--focus-ring);
    border-radius: var(--radius-xs);
  }
  .list {
    display: grid;
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-2) var(--space-8);
    padding: var(--space-4) 0 var(--space-5);
    border-top: 1px solid var(--border-strong);
  }
  /* Picking a principle lifts what remains into place, so the filter visibly acted. */
  .filtered .row {
    animation: bb-rise var(--motion-base) var(--ease-out);
  }
  .was,
  .now {
    display: grid;
    align-content: start;
    gap: var(--space-1);
  }
  .k {
    font-size: var(--fs-2xs);
    font-weight: var(--fw-semibold);
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }
  .t {
    font-size: var(--fs-md);
    line-height: 1.55;
  }
  .was .k {
    color: var(--text-3);
  }
  .was .t {
    color: var(--text-2);
  }
  .now .k {
    color: var(--accent-ink);
  }
  .now .t {
    color: var(--text);
  }
  .foot {
    grid-column: 1 / -1;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-1) var(--space-2);
    padding-top: var(--space-1);
  }
  .tag {
    padding: 1px var(--space-2);
    border: 1px solid var(--border-strong);
    border-radius: var(--radius-xs);
    font-size: var(--fs-2xs);
    font-weight: var(--fw-semibold);
    color: var(--text-2);
  }
  .tag.hit {
    border-color: var(--accent-border);
    background: var(--accent-faint);
    color: var(--accent-ink);
  }
  .where {
    margin-left: auto;
    font-size: var(--fs-xs);
    color: var(--text-3);
    text-align: right;
  }
  .none {
    font-size: var(--fs-sm);
    color: var(--text-3);
  }
  @media (max-width: 720px) {
    .row {
      grid-template-columns: 1fr;
    }
    .where {
      margin-left: 0;
      text-align: left;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .filtered .row {
      animation: none;
    }
  }
</style>
