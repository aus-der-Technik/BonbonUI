<script lang="ts">
  /**
   * Storybook-only: what the study found wrong in the system and what changed — a design audit
   * written so that non-designers can follow each decision.
   */
  import StudyPage from './StudyPage.svelte';
  import Quote from './Quote.svelte';
  import Section from '../../patterns/layout/Section.svelte';
  import Grid from '../../patterns/layout/Grid.svelte';
  import Layer from '../../patterns/layout/Layer.svelte';
  import { PRINCIPLES } from '../../demo/DesignNotes.svelte';
  import { corrections } from './corrections';

  const total = corrections.reduce((n, g) => n + g.items.length, 0);
  const byPrinciple = (Object.keys(PRINCIPLES) as (keyof typeof PRINCIPLES)[]).map((p) => ({
    p,
    count: corrections.flatMap((g) => g.items).filter((c) => c.breaks.includes(p)).length,
  }));
</script>

<StudyPage
  slug="corrections"
  title="Corrections"
  lead="A design study is only honest if it turns its principles on its own work. Every component and example page was audited against the four principles and the house rules. This is what was wrong, and what changed."
>
  <Section
    eyebrow="In numbers"
    title="{total} corrections, grouped by what went wrong"
    description="Each correction names the principle it violated. Most problems broke more than one — a silent failure is unfriendly and also leaves the answer nowhere."
  >
    <Grid min="10rem" columns={4}>
      {#each byPrinciple as { p, count } (p)}
        <Layer level="panel" gap="none" align="start">
          <span class="big">{count}</span>
          <span class="label">{PRINCIPLES[p].n} · {PRINCIPLES[p].label}</span>
        </Layer>
      {/each}
    </Grid>
  </Section>

  {#each corrections as group (group.title)}
    <Section eyebrow="Correction" title={group.title} description={group.intro}>
      <div class="list">
        {#each group.items as c (c.was)}
          <article class="row">
            <div class="was">
              <span class="k">Was</span>
              <p>{c.was}</p>
            </div>
            <div class="now">
              <span class="k">Now</span>
              <p>{c.now}</p>
            </div>
            <footer>
              {#each c.breaks as b (b)}<span class="tag"
                  >{PRINCIPLES[b].n} · {PRINCIPLES[b].label}</span
                >{/each}
              <span class="where">{c.where}</span>
            </footer>
          </article>
        {/each}
      </div>
    </Section>
  {/each}

  <Section eyebrow="Afterword" title="Rules that do not hold in practice are wishes">
    <p>
      Several of these problems contradicted rules the system had already written down: “feedback
      where it happened”, “targets of at least 32 px”, “colour never the only signal”. The rules
      were right; nothing checked them. That is why every example now carries design notes that
      point at the parts of the page they talk about — so anyone, designer or not, can hold the
      screen to its own promises.
    </p>
    <Quote
      text="Good design is thorough down to the last detail."
      author="Dieter Rams"
      source="eighth of his ten principles"
    />
  </Section>
</StudyPage>

<style>
  .big {
    font-size: var(--fs-display);
    font-weight: var(--fw-bold);
    line-height: 1;
    color: var(--accent-ink);
    font-variant-numeric: tabular-nums;
  }
  .label {
    font-size: var(--fs-sm);
    color: var(--text-2);
  }
  .list {
    display: grid;
    gap: var(--space-3);
  }
  .row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-2) var(--space-5);
    padding: var(--space-4) var(--space-5);
    border-radius: var(--radius-card);
    background: var(--layer-panel-bg);
    border: 0.75px solid var(--layer-panel-border);
    box-shadow: var(--layer-panel-shadow);
    backdrop-filter: var(--layer-panel-blur);
    -webkit-backdrop-filter: var(--layer-panel-blur);
  }
  .k {
    display: block;
    margin-bottom: var(--space-1);
    font-size: var(--fs-2xs);
    font-weight: var(--fw-semibold);
    letter-spacing: var(--tracking-caps);
    text-transform: uppercase;
  }
  .was .k {
    color: var(--text-3);
  }
  .was p {
    color: var(--text-2);
    font-size: var(--fs-sm);
  }
  .now .k {
    color: var(--accent-ink);
  }
  .now p {
    color: var(--text);
    font-size: var(--fs-sm);
  }
  footer {
    grid-column: 1 / -1;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-1) var(--space-2);
    padding-top: var(--space-2);
    border-top: 1px solid var(--border-strong);
  }
  .tag {
    padding: 2px var(--space-2);
    border-radius: var(--radius-xs);
    background: var(--fill-muted);
    font-size: var(--fs-2xs);
    font-weight: var(--fw-semibold);
    color: var(--text-2);
  }
  .where {
    margin-left: auto;
    font-size: var(--fs-xs);
    color: var(--text-3);
  }
  @media (max-width: 720px) {
    .row {
      grid-template-columns: 1fr;
    }
    .where {
      margin-left: 0;
    }
  }
</style>
