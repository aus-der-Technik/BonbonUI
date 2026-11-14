<script lang="ts">
  /**
   * Storybook-only: principle 2 — friendly, always. Norman's three levels of emotional design,
   * curved shapes, two moods with one warmth, plain errors, forgiveness over warnings, and
   * delight kept for the end of a task.
   */
  import StudyPage from './StudyPage.svelte';
  import Quote from './Quote.svelte';
  import InSystem from './InSystem.svelte';
  import StudyDemo from './StudyDemo.svelte';
  import StudyList from './StudyList.svelte';
  import StudyItem from './StudyItem.svelte';
  import Section from '../../patterns/layout/Section.svelte';
  import Row from '../../patterns/layout/Row.svelte';
  import Spacer from '../../patterns/layout/Spacer.svelte';
  import Button from '../../patterns/atoms/Button.svelte';
  import Badge from '../../patterns/atoms/Badge.svelte';
  import Icon from '../../patterns/atoms/Icon.svelte';
  import Checkbox from '../../patterns/atoms/Checkbox.svelte';
  import SegmentedControl from '../../patterns/molecules/SegmentedControl.svelte';
  import { celebrate, greeting } from '../../utils/delight';

  let mood = $state<'professional' | 'casual'>('professional');
  const copy = $derived(
    mood === 'professional'
      ? {
          title: 'Quarterly invoices',
          empty: 'No invoices for this quarter yet.',
          hint: 'New invoices appear here as soon as they are issued.',
          action: 'Create invoice',
        }
      : {
          title: 'Party budget',
          empty: 'Nothing spent yet — the cake is still a dream.',
          hint: 'Add the first expense and we’ll keep the tally.',
          action: 'Add expense',
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

  // Delight at the end: the last tick throws a few sprinkles from the list it finished.
  const hello = greeting();
  let tasks = $state([
    { label: 'Book the venue', done: true },
    { label: 'Order the cake', done: false },
    { label: 'Send the invitations', done: false },
  ]);
  let list = $state<HTMLElement | undefined>();
  const finished = $derived(tasks.every((t) => t.done));
  function tick(i: number, done: boolean) {
    tasks[i]!.done = done;
    if (done && tasks.every((t) => t.done) && list) celebrate(list, 14);
  }

  const errors = [
    {
      cold: 'Error 422: Unprocessable entity.',
      warm: 'That date is in the past. Pick today or later.',
      why: 'What is wrong, in the user’s words, and what to do. No codes.',
    },
    {
      cold: 'Invalid input!',
      warm: 'An e-mail address needs an @ — like name@example.com.',
      why: 'Shows the shape of a right answer instead of blaming.',
    },
    {
      cold: 'Oops! Something went wrong 🙈',
      warm: 'Couldn’t save — the server didn’t answer. Your text is kept; try again.',
      why: 'No jokes when something failed: reassure, then offer the next step.',
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
  lead="Principle 2. Whether it runs payroll or a party list, an interface speaks plainly, forgives mistakes and never makes anyone feel stupid."
>
  <Section
    eyebrow="The idea"
    title="People bring feelings to every screen"
    description="Don Norman describes three levels at which we respond to a designed thing; a friendly interface works on all three."
    gap="lg"
  >
    <StudyList min="13rem">
      <StudyItem term="The first glance" meta="Visceral">
        Soft light, rounded shapes, calm colour. Before reading a word you feel safe or tense.
      </StudyItem>
      <StudyItem term="The use" meta="Behavioural">
        Things respond at once, where you look, and every mistake can be undone. Ease is a feeling.
      </StudyItem>
      <StudyItem term="The memory" meta="Reflective">
        Did it make you feel capable? People remember being helped — and being blamed.
      </StudyItem>
    </StudyList>
    <Quote
      text="Attractive things work better."
      author="Don Norman"
      source="Emotional Design, 2004"
    />
  </Section>

  <Section
    eyebrow="Rule"
    title="Rounded, because people prefer it"
    description="In Bar and Neta’s study (2006), people liked objects with curved contours more than the same objects drawn sharp."
    gap="lg"
  >
    <div class="shapes" aria-hidden="true">
      <div class="shape sharp"><span>Sharp</span></div>
      <div class="shape soft"><span>Rounded</span></div>
      <div class="shape pill"><span>Pill</span></div>
    </div>
    <p>
      A follow-up brain-imaging study (2007) suggested sharp angles register faintly as a threat. So
      everything that holds or acts is rounded, and the type stays crisp, so the screen stays
      serious. Try the
      <strong>Radius</strong> control in the toolbar: every corner follows one scale, from Square to Round.
    </p>
  </Section>

  <Section
    eyebrow="Try it"
    title="Professional and casual are both friendly"
    description="Only the words change between the two moods; the warmth comes from clarity, space and forgiveness, which both keep."
    gap="lg"
  >
    <StudyDemo caption="Switch the mood: the layout, the help and the action stay.">
      <SegmentedControl
        label="Mood"
        size="sm"
        bind:value={mood}
        options={[
          { value: 'professional', label: 'Professional' },
          { value: 'casual', label: 'Casual' },
        ]}
      />
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
    </StudyDemo>
  </Section>

  <Section
    eyebrow="Rule"
    title="Errors stay plain"
    description="When something fails, friendliness means clarity: what happened, in the user’s words, and what to do next."
    gap="lg"
  >
    <table class="voice">
      <thead><tr><th>Not like this</th><th>Like this</th><th>Why</th></tr></thead>
      <tbody>
        {#each errors as e (e.cold)}
          <tr
            ><td class="cold">{e.cold}</td><td class="warm">{e.warm}</td><td class="why">{e.why}</td
            ></tr
          >
        {/each}
      </tbody>
    </table>
    <p>
      A wink is welcome where nothing is at stake — an empty list, a finished task. Never in an
      error.
    </p>
  </Section>

  <Section
    eyebrow="Rule"
    title="Forgive instead of warn"
    description="“Are you sure?” trains people to click Yes without reading; letting them undo is kinder and safer."
    gap="lg"
  >
    <StudyDemo caption="Delete an item: the undo appears in the list, where the item was." gap="xs">
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
    </StudyDemo>
    <InSystem>
      <ul>
        <li>
          Soft deletes offer <em>Undo</em> at the place of the deleted item; only irreversible, far-reaching
          actions ask first.
        </li>
        <li>Input is never thrown away on an error — fields keep what was typed.</li>
        <li>
          Accessibility is friendliness: contrast of at least 4.5:1, visible focus, targets of at
          least 32 px, motion and transparency that follow the user’s settings.
        </li>
      </ul>
    </InSystem>
    <Quote text="Don’t make me think." author="Steve Krug" source="book title, 2000" />
  </Section>

  <Section
    eyebrow="Rule"
    title="Delight comes last"
    description="A little joy belongs at the end of a task or in an empty, idle moment — never in the middle of work."
    gap="lg"
  >
    <StudyDemo caption="Tick off the last task." gap="sm">
      <div class="hello">
        <span class="greet">{hello.text}.</span>
        {#if hello.wink}<span class="muted">{hello.wink}</span>{/if}
      </div>
      <div class="tasks" bind:this={list}>
        {#each tasks as t, i (t.label)}
          <Checkbox label={t.label} checked={t.done} oncheckedchange={(c) => tick(i, c)} />
        {/each}
      </div>
      <span class="muted" aria-live="polite"
        >{finished
          ? 'All done — enjoy the party.'
          : `${tasks.filter((t) => !t.done).length} to go.`}</span
      >
    </StudyDemo>
    <p>
      A greeting that knows the time of day, a few sprinkles when the list is done: small, short and
      earned. With reduced motion the sprinkles stay away; the words still say well done.
    </p>
  </Section>
</StudyPage>

<style>
  .muted {
    color: var(--text-3);
    font-size: var(--fs-sm);
  }
  .shapes {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-6);
  }
  .shape {
    display: grid;
    place-items: end start;
    width: 176px;
    height: 84px;
    padding: var(--space-3) var(--space-4);
    border: 1px solid var(--border-strong);
    font-size: var(--fs-sm);
    color: var(--text-2);
  }
  .sharp {
    border-radius: 0;
  }
  .soft {
    border-radius: var(--radius-card);
  }
  .pill {
    border-radius: var(--radius-pill);
    padding-inline: var(--space-6);
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
    font-size: var(--fs-md);
    line-height: 1.5;
  }
  .voice th,
  .voice td {
    padding: var(--space-3) var(--space-4) var(--space-3) 0;
    text-align: left;
    vertical-align: top;
    border-top: 1px solid var(--border-strong);
  }
  .voice th {
    font-size: var(--fs-2xs);
    font-weight: var(--fw-semibold);
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--text-3);
    border-top: 0;
  }
  .cold {
    color: var(--text-3);
    text-decoration: line-through;
    text-decoration-color: var(--danger);
  }
  .warm {
    color: var(--text);
  }
  .why {
    color: var(--text-2);
    font-size: var(--fs-sm);
  }
  @media (max-width: 640px) {
    .voice thead {
      display: none;
    }
    .voice tr {
      display: grid;
      gap: var(--space-1);
      padding: var(--space-3) 0;
      border-top: 1px solid var(--border-strong);
    }
    .voice td {
      padding: 0;
      border: 0;
    }
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
  .hello {
    display: grid;
    gap: 2px;
  }
  .greet {
    font-family: var(--font-serif);
    font-size: var(--fs-3xl);
    line-height: 1.2;
  }
  .tasks {
    display: grid;
    gap: var(--space-2);
    width: fit-content;
  }
</style>
