<script lang="ts">
  /**
   * Storybook-only: principle 2 — friendly, always. Norman's three levels of emotional design,
   * curved shapes, a voice that stays plain when it matters, forgiveness over warnings, and the
   * proof that "professional" and "friendly" are not opposites.
   */
  import StudyPage from './StudyPage.svelte';
  import Quote from './Quote.svelte';
  import InSystem from './InSystem.svelte';
  import Section from '../../patterns/layout/Section.svelte';
  import Layer from '../../patterns/layout/Layer.svelte';
  import Grid from '../../patterns/layout/Grid.svelte';
  import Row from '../../patterns/layout/Row.svelte';
  import Spacer from '../../patterns/layout/Spacer.svelte';
  import Button from '../../patterns/atoms/Button.svelte';
  import Badge from '../../patterns/atoms/Badge.svelte';
  import Icon from '../../patterns/atoms/Icon.svelte';
  import SegmentedControl from '../../patterns/molecules/SegmentedControl.svelte';

  let mood = $state<'professional' | 'casual'>('professional');
  const copy = $derived(
    mood === 'professional'
      ? {
          title: 'Quarterly invoices',
          empty: 'No invoices for this quarter yet.',
          hint: 'New invoices appear here as soon as they are issued.',
          action: 'Create invoice',
          saved: 'Saved',
        }
      : {
          title: 'Party budget',
          empty: 'Nothing spent yet — the cake is still a dream.',
          hint: 'Add the first expense and we’ll keep the tally.',
          action: 'Add expense',
          saved: 'Saved. Nice.',
        },
  );

  // Forgiveness: delete with undo instead of "Are you sure?"
  let items = $state(['Venue deposit', 'Balloons', 'Playlist']);
  let lastRemoved = $state<{ item: string; at: number } | null>(null);
  function remove(i: number) {
    lastRemoved = { item: items[i]!, at: i };
    items = items.filter((_, j) => j !== i);
  }
  function undo() {
    if (!lastRemoved) return;
    const next = [...items];
    next.splice(lastRemoved.at, 0, lastRemoved.item);
    items = next;
    lastRemoved = null;
  }

  const errors = [
    {
      cold: 'Error 422: Unprocessable entity.',
      warm: 'That date is in the past. Pick today or later.',
      why: 'Says what is wrong in the user’s words and what to do — no codes.',
    },
    {
      cold: 'Invalid input!',
      warm: 'An e-mail address needs an @ — like name@example.com.',
      why: 'Shows the shape of a right answer instead of blaming.',
    },
    {
      cold: 'Oops! Something went wrong 🙈',
      warm: 'Couldn’t save — the server didn’t answer. Your text is kept; try again.',
      why: 'No jokes when something failed. Reassure, then offer the next step.',
    },
  ];
</script>

{#snippet undoRow(removed: { item: string })}
  <div class="undo" role="status">
    <span>“{removed.item}” removed</span><Spacer /><Button
      size="sm"
      icon="undo"
      label="Undo"
      onclick={undo}
    />
  </div>
{/snippet}

<StudyPage
  slug="friendly-always"
  title="Friendly, always"
  lead="Principle 2. Whether it runs payroll or a party list, an interface should feel approachable: it speaks plainly, forgives mistakes, and never makes anyone feel stupid. Friendly is not the same as cute."
>
  <Section
    eyebrow="The idea in plain words"
    title="People bring feelings to every screen"
    description="Don Norman describes three levels at which we respond to a designed thing. A friendly interface works on all three — and the deepest one, being treated well, matters most."
  >
    <Grid min="14rem" columns={3}>
      <Layer level="panel" gap="xs">
        <span class="level">Visceral</span>
        <strong>The first glance</strong>
        <p>
          Soft light, rounded shapes, calm colour. Before reading a word you feel safe or tense.
        </p>
      </Layer>
      <Layer level="panel" gap="xs">
        <span class="level">Behavioural</span>
        <strong>The use</strong>
        <p>
          Things respond at once, where you look, and every mistake can be undone. Ease is a
          feeling.
        </p>
      </Layer>
      <Layer level="panel" gap="xs">
        <span class="level">Reflective</span>
        <strong>The memory</strong>
        <p>Did it make you feel capable? People remember being helped — and being blamed.</p>
      </Layer>
    </Grid>
    <Quote
      text="Attractive things work better."
      author="Don Norman"
      source="Emotional Design, 2004"
    />
  </Section>

  <Section
    eyebrow="Rule"
    title="Rounded, because people prefer it"
    description="Bar and Neta (2006) showed people ordinary objects drawn with sharp or curved contours; the curved versions were liked more, and brain scans suggested sharp angles register faintly as a threat. BonbonUI rounds everything that holds or acts — and keeps type sharp, so the screen stays serious."
  >
    <Row gap="lg" justify="center" wrap>
      <div class="shape sharp">Sharp</div>
      <div class="shape soft">Soft</div>
      <div class="shape pill">Pill</div>
    </Row>
    <p>
      Use the <strong>Radius</strong> control in the toolbar above to switch the whole system between
      Square, Soft and Round. Every corner follows one scale, so a team can make it stricter or friendlier
      without breaking anything.
    </p>
  </Section>

  <Section
    eyebrow="Try it"
    title="Professional and casual are both friendly"
    description="The same component in two moods. Only the words change; the warmth comes from clarity, space and forgiveness — which both keep."
  >
    <Layer level="panel" gap="md">
      <Row gap="sm" wrap>
        <SegmentedControl
          label="Mood"
          size="sm"
          bind:value={mood}
          options={[
            { value: 'professional', label: 'Professional' },
            { value: 'casual', label: 'Casual' },
          ]}
        />
      </Row>
      <Row gap="sm"
        ><Icon name={mood === 'professional' ? 'file-text' : 'gift'} size={18} /><strong
          >{copy.title}</strong
        ><Spacer /><Badge tone="neutral" label="0 items" /></Row
      >
      <div class="empty">
        <strong>{copy.empty}</strong>
        <span>{copy.hint}</span>
        <Button variant="primary" shape="pill" icon="plus" label={copy.action} />
      </div>
    </Layer>
  </Section>

  <Section
    eyebrow="Rule"
    title="Errors stay plain"
    description="A wink is welcome where nothing is at stake — an empty list, a finished task. When something fails, friendliness means clarity: what happened, in the user’s words, and what to do next."
  >
    <Layer level="panel" padding="none">
      <table class="voice">
        <thead><tr><th>Not like this</th><th>Like this</th><th>Why</th></tr></thead>
        <tbody>
          {#each errors as e (e.cold)}
            <tr><td class="cold">{e.cold}</td><td>{e.warm}</td><td class="why">{e.why}</td></tr>
          {/each}
        </tbody>
      </table>
    </Layer>
  </Section>

  <Section
    eyebrow="Rule"
    title="Forgive instead of warn"
    description="“Are you sure?” trains people to click Yes without reading. Letting them undo is kinder and safer. Delete an item below — the undo appears in the list, where the item was."
  >
    <Layer level="panel" gap="xs">
      {#each items as item, i (item)}
        {#if lastRemoved && lastRemoved.at === i}{@render undoRow(lastRemoved)}{/if}
        <Row gap="sm">
          <span>{item}</span><Spacer /><Button
            size="sm"
            variant="plain"
            iconOnly
            icon="trash"
            label="Remove {item}"
            onclick={() => remove(i)}
          />
        </Row>
      {/each}
      {#if lastRemoved && lastRemoved.at >= items.length}{@render undoRow(lastRemoved)}{/if}
      {#if !items.length && !lastRemoved}<span class="muted">All clear.</span>{/if}
    </Layer>
    <InSystem>
      <ul>
        <li>
          Soft deletes offer <em>Undo</em> at the place of the deleted item; only irreversible, far-reaching
          actions ask first.
        </li>
        <li>Input is never thrown away on an error — fields keep what was typed.</li>
        <li>
          Delight (sprinkles, greetings) only at the end of a task or in empty and idle moments —
          never inside an error.
        </li>
        <li>
          Accessibility is friendliness: contrast of at least 4.5:1, visible focus, targets of at
          least 32 px, motion and transparency that follow the user’s settings.
        </li>
      </ul>
    </InSystem>
    <Quote text="Don’t make me think." author="Steve Krug" source="book title, 2000" />
  </Section>
</StudyPage>

<style>
  .muted {
    color: var(--text-3);
    font-size: var(--fs-sm);
  }
  .level {
    font-size: var(--fs-xs);
    font-weight: var(--fw-semibold);
    letter-spacing: var(--tracking-caps);
    text-transform: uppercase;
    color: var(--accent-ink);
  }
  .shape {
    display: grid;
    place-items: center;
    width: 140px;
    height: 88px;
    background: var(--glass-strong);
    box-shadow: var(--layer-panel-shadow);
    font-weight: var(--fw-semibold);
  }
  .sharp {
    border-radius: 0;
  }
  .soft {
    border-radius: var(--radius-card);
  }
  .pill {
    border-radius: var(--radius-pill);
  }
  .empty {
    display: grid;
    justify-items: center;
    gap: var(--space-2);
    padding: var(--space-8) var(--space-4);
    text-align: center;
    border-radius: var(--radius-lg);
    background: var(--fill-muted);
  }
  .empty span {
    font-size: var(--fs-sm);
    color: var(--text-2);
  }
  .voice {
    width: 100%;
    border-collapse: collapse;
    font-size: var(--fs-sm);
  }
  .voice th,
  .voice td {
    padding: var(--space-3) var(--space-4);
    text-align: left;
    vertical-align: top;
    border-bottom: 1px solid var(--border-strong);
  }
  .voice th {
    font-size: var(--fs-xs);
    color: var(--text-3);
    font-weight: var(--fw-semibold);
  }
  .voice tr:last-child td {
    border-bottom: 0;
  }
  .cold {
    color: var(--text-3);
    text-decoration: line-through;
    text-decoration-color: var(--danger);
  }
  .why {
    color: var(--text-2);
  }
  .undo {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-2) var(--space-3);
    border-radius: var(--radius-lg);
    background: var(--accent-faint);
    font-size: var(--fs-sm);
    animation: bb-rise var(--motion-base) var(--ease-out);
  }
</style>
