<script lang="ts">
  /**
   * Storybook-only: principle 1 — function first, beautiful because of it. Form follows function,
   * the aesthetic–usability effect and its trap, ground first, one primary action per view,
   * every state designed, glass only where something floats, content before chrome.
   */
  import StudyPage from './StudyPage.svelte';
  import Quote from './Quote.svelte';
  import InSystem from './InSystem.svelte';
  import StudyDemo from './StudyDemo.svelte';
  import StudyList from './StudyList.svelte';
  import StudyItem from './StudyItem.svelte';
  import Section from '../../patterns/layout/Section.svelte';
  import Layer from '../../patterns/layout/Layer.svelte';
  import Row from '../../patterns/layout/Row.svelte';
  import Stack from '../../patterns/layout/Stack.svelte';
  import Spacer from '../../patterns/layout/Spacer.svelte';
  import Button from '../../patterns/atoms/Button.svelte';
  import Badge from '../../patterns/atoms/Badge.svelte';
  import Avatar from '../../patterns/atoms/Avatar.svelte';
  import Skeleton from '../../patterns/atoms/Skeleton.svelte';
  import Switch from '../../patterns/atoms/Switch.svelte';
  import EmptyState from '../../patterns/molecules/EmptyState.svelte';
  import Alert from '../../patterns/molecules/Alert.svelte';
  import SegmentedControl from '../../patterns/molecules/SegmentedControl.svelte';

  type StateName = 'loading' | 'empty' | 'error' | 'content';
  let shown = $state<StateName>('content');
  let loud = $state(true);
  let boxed = $state(true);

  const people = [
    { name: 'Ada Example', role: 'Owner' },
    { name: 'Grace Example', role: 'Editor' },
    { name: 'Linus Example', role: 'Viewer' },
  ];

  const figures = [
    { label: 'Visitors', value: '1,284' },
    { label: 'Sign-ups', value: '86' },
    { label: 'Refunds', value: '2' },
  ];
  const latest = [
    { who: 'Ada Example', what: 'signed up', when: '2 min ago' },
    { who: 'Grace Example', what: 'upgraded to Team', when: '1 h ago' },
    { who: 'Linus Example', what: 'asked for a refund', when: 'Yesterday' },
  ];
</script>

<StudyPage
  slug="function-first"
  title="Function first — and beautiful because of it"
  lead="Principle 1. An interface is beautiful when it is effortless to use; the looks are what that ease feels like."
>
  <Section
    eyebrow="The idea"
    title="Beauty as a by-product of care"
    description="A good kitchen knife is beautiful partly because its balance, edge and grip are right."
    gap="lg"
  >
    <p>
      Interfaces work the same way. Order, rhythm and calm come from deciding what matters and
      letting everything else step back. The Bauhaus made a school of Sullivan’s sentence; Dieter
      Rams added the restraint — good design is useful, honest, unobtrusive, and as little design as
      possible.
    </p>
    <Quote
      text="Form ever follows function."
      author="Louis H. Sullivan"
      source="The Tall Office Building Artistically Considered, 1896"
    />
    <StudyList min="18rem">
      <StudyItem term="The aesthetic–usability effect" meta="Kurosu and Kashimura, 1995">
        People rate attractive interfaces as easier to use, even when they are not. Norman’s
        reading: a relaxed person copes better with small problems.
      </StudyItem>
      <StudyItem term="…and its trap" meta="Why beauty is never enough">
        The same effect hides problems in testing: people forgive a pretty screen and blame
        themselves. So every rule here has to say what it does for the person using it.
      </StudyItem>
    </StudyList>
  </Section>

  <Section
    eyebrow="Rule"
    title="Ground first, few boxes"
    description="Most groups need a heading and some air, not a box around them."
    gap="lg"
  >
    <p>
      A screen of cards is a screen of borders: every box is one more edge the eye has to read. On
      the ground, space and a fine rule do the grouping (Gestalt’s proximity), and the few panels
      that remain — a table, a form, a result — mean something again.
    </p>
    <figure class="frame">
      <Row gap="sm">
        <strong>This week</strong>
        <Spacer />
        <Switch size="sm" label="Box every group" bind:checked={boxed} />
      </Row>
      <div class="figures" class:boxed>
        {#each figures as f (f.label)}
          <Layer level={boxed ? 'panel' : 'ground'} gap="none" padding={boxed ? 'md' : 'none'}>
            <span class="f-label">{f.label}</span>
            <span class="f-value">{f.value}</span>
          </Layer>
        {/each}
      </div>
      <Layer level={boxed ? 'panel' : 'ground'} gap="none" padding={boxed ? 'md' : 'none'}>
        <span class="f-label">Latest</span>
        <ul class="latest" class:boxed>
          {#each latest as l (l.who)}
            <li>
              <Avatar name={l.who} size={24} /><span><strong>{l.who}</strong> {l.what}</span><Spacer
              /><span class="muted">{l.when}</span>
            </li>
          {/each}
        </ul>
      </Layer>
      <figcaption>
        {boxed
          ? 'Four boxes, sixteen edges, and the figures still compete with their frames.'
          : 'The same content on the ground: the figures lead, and hairlines keep the order.'}
      </figcaption>
    </figure>
    <InSystem>
      <ul>
        <li>Headings, figures, charts, navigation and lists sit on the ground.</li>
        <li>
          Panels are solid tiles for tables, forms and results — and never nested: inside a panel
          use flat fills.
        </li>
      </ul>
    </InSystem>
  </Section>

  <Section
    eyebrow="Rule"
    title="One primary action per view"
    description="The most important thing must look most important, or the eye has to read every label to find it."
    gap="lg"
  >
    <StudyDemo caption="Flip between the loud and the calm version of the same card.">
      <Row gap="sm">
        <strong>Invite people</strong>
        <Spacer />
        <Button
          size="sm"
          label={loud ? 'Show the calm version' : 'Show the loud version'}
          onclick={() => (loud = !loud)}
        />
      </Row>
      {#each people as p (p.name)}
        <Row gap="sm">
          <Avatar name={p.name} size={28} /><span>{p.name}</span><Spacer /><span class="muted"
            >{p.role}</span
          >
        </Row>
      {/each}
      <Row gap="sm" justify="end" wrap>
        {#if loud}
          <Button variant="primary" label="Export list" />
          <Button variant="primary" label="Copy link" />
          <Button variant="danger-solid" label="Remove all" />
          <Button variant="primary" label="Invite" />
        {:else}
          <Button variant="ghost" label="Export list" />
          <Button variant="ghost" label="Copy link" />
          <Spacer />
          <Button variant="primary" shape="pill" label="Invite" />
        {/if}
      </Row>
    </StudyDemo>
    <p>
      Notice the light, too: every filled button is an emitter and casts its tint on the panel. Four
      of them light the card from four places; one lights the way to the next step.
    </p>
    <InSystem>
      <ul>
        <li>One <code>variant="primary"</code> per view; everything else is secondary or ghost.</li>
        <li>
          Destructive actions are never the loudest thing; they use <code>--danger</code>, never the
          accent, and confirm in place.
        </li>
        <li>
          The primary action sits at the end of reading: bottom right of a card, right of a bar.
        </li>
      </ul>
    </InSystem>
  </Section>

  <Section
    eyebrow="Rule"
    title="Every state is designed"
    description="A list is four screens, not one: loading, empty, failed and full."
    gap="lg"
  >
    <StudyDemo caption="Switch between the states and watch what stays still.">
      <SegmentedControl
        label="State"
        size="sm"
        bind:value={shown}
        options={[
          { value: 'loading', label: 'Loading' },
          { value: 'empty', label: 'Empty' },
          { value: 'error', label: 'Failed' },
          { value: 'content', label: 'Full' },
        ]}
      />
      <div class="state">
        {#if shown === 'loading'}
          <Stack gap="sm">
            {#each [0, 1, 2] as i (i)}
              <Row gap="sm"
                ><Skeleton shape="circle" width="28px" height="28px" /><Skeleton width="40%" /></Row
              >
            {/each}
          </Stack>
        {:else if shown === 'empty'}
          <EmptyState
            compact
            icon="users"
            title="It’s quiet in here"
            message="Invite the first person and this becomes a team."
            actionLabel="Invite"
            actionIcon="user-plus"
          />
        {:else if shown === 'error'}
          <Alert
            tone="danger"
            title="Couldn’t load the team"
            message="The server didn’t answer. Your changes are safe — try again in a moment."
          >
            {#snippet actions()}<Button
                size="sm"
                icon="reload"
                label="Try again"
                onclick={() => (shown = 'loading')}
              />{/snippet}
          </Alert>
        {:else}
          <Stack gap="sm">
            {#each people as p (p.name)}
              <Row gap="sm"
                ><Avatar name={p.name} size={28} /><span>{p.name}</span><Spacer /><Badge
                  tone="neutral"
                  label={p.role}
                /></Row
              >
            {/each}
          </Stack>
        {/if}
      </div>
    </StudyDemo>
    <p>
      The panel, its size and the place of the action never move. Skeletons have the shape of what
      is coming, so nothing jumps when it arrives; the error keeps your work and offers the next
      step where the list would be. Empty and failed are where people need the most help.
    </p>
  </Section>

  <Section
    eyebrow="A case from this system"
    title="Glass only where something floats"
    description="When an effect fights the function, the function wins."
    gap="lg"
  >
    <p>
      The front bars used to be thick glass that magnified and bent whatever passed underneath. Over
      pictures it was lovely; over running text the letters fringed into rainbows and the bar’s own
      title became hard to read. Glass is now gentle: a little blur, saturation near one, one crisp
      edge of light — the same in every browser.
    </p>
    <StudyList min="14rem">
      <StudyItem term="Glass floats" meta="Front layer, overlays">
        Bars, docks, menus and dialogs. Their frost says “I am above the page” and keeps what is
        underneath readable.
      </StudyItem>
      <StudyItem term="Panels lie" meta="Solid tiles">
        A panel rests on the page, so it is solid — no blur, no glass in glass. Over a photo, panels
        become smoked glass so words stay legible.
      </StudyItem>
      <StudyItem term="Refraction is a choice" meta="Opt-in">
        A bar over a calm picture may bend light: <code
          >lens=&#123;&#123; refraction: true &#125;&#125;</code
        >. Over text, never.
      </StudyItem>
    </StudyList>
  </Section>

  <Section
    eyebrow="Rule"
    title="Content first, chrome steps back"
    description="About ninety per cent of a screen is neutral; colour is spent on what is chosen, primary, or reports a status."
    gap="lg"
  >
    <p>
      Platform guidelines call it deference: the interface helps people understand the content
      without competing with it. A small vocabulary keeps the chrome quiet.
    </p>
    <dl class="numbers">
      {#each [['1', 'tint for the whole app'], ['4', 'depth layers'], ['3', 'shapes with meanings'], ['4', 'motion durations']] as [n, what] (what)}
        <div>
          <dt>{n}</dt>
          <dd>{what}</dd>
        </div>
      {/each}
    </dl>
    <Quote text="The details are not the details. They make the design." author="Charles Eames" />
  </Section>
</StudyPage>

<style>
  .muted {
    color: var(--text-3);
    font-size: var(--fs-sm);
  }
  .state {
    min-height: 168px;
    display: grid;
    align-content: center;
  }
  /* A frame, not a surface: the demo has to show the ground, so it cannot sit on a panel. */
  .frame {
    display: grid;
    gap: var(--space-5);
    margin: 0;
    padding: var(--space-5) var(--space-6) var(--space-4);
    border: 1px dashed var(--border-strong);
    border-radius: var(--radius-card);
  }
  .frame figcaption {
    font-size: var(--fs-sm);
    color: var(--text-3);
  }
  .figures {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0;
    transition: gap var(--motion-base) var(--ease-out);
  }
  .figures.boxed {
    gap: var(--space-3);
  }
  .figures:not(.boxed) > :global(* + *) {
    padding-left: var(--space-5);
    border-left: 1px solid var(--border-strong);
  }
  .f-label {
    font-size: var(--fs-xs);
    color: var(--text-3);
  }
  .f-value {
    font-size: var(--fs-kpi);
    font-weight: var(--fw-semibold);
    line-height: 1.15;
    font-variant-numeric: tabular-nums;
  }
  .latest {
    display: grid;
    margin: var(--space-2) 0 0;
    padding: 0;
    list-style: none;
  }
  .latest li {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-2) 0;
    font-size: var(--fs-sm);
    border-top: 1px solid var(--border-strong);
  }
  .latest.boxed li {
    border-top-color: transparent;
  }
  .numbers {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
    margin: 0;
  }
  .numbers div {
    display: grid;
    gap: var(--space-1);
    padding: var(--space-2) var(--space-5);
    border-left: 1px solid var(--border-strong);
  }
  .numbers dt {
    font-family: var(--font-serif);
    font-size: 3.2rem;
    line-height: 1;
    color: var(--accent-ink);
  }
  .numbers dd {
    margin: 0;
    font-size: var(--fs-sm);
    color: var(--text-2);
  }
  @media (max-width: 560px) {
    .figures {
      grid-template-columns: 1fr;
    }
    .figures:not(.boxed) > :global(* + *) {
      padding: var(--space-3) 0 0;
      border-left: 0;
      border-top: 1px solid var(--border-strong);
    }
  }
</style>
