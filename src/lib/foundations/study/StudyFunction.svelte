<script lang="ts">
  /**
   * Storybook-only: principle 1 — function first, beautiful because of it. Form follows function,
   * the aesthetic–usability effect (and its trap), one primary action per view, every state
   * designed, content before chrome.
   */
  import StudyPage from './StudyPage.svelte';
  import Quote from './Quote.svelte';
  import InSystem from './InSystem.svelte';
  import Section from '../../patterns/layout/Section.svelte';
  import Layer from '../../patterns/layout/Layer.svelte';
  import Grid from '../../patterns/layout/Grid.svelte';
  import Row from '../../patterns/layout/Row.svelte';
  import Stack from '../../patterns/layout/Stack.svelte';
  import Spacer from '../../patterns/layout/Spacer.svelte';
  import Button from '../../patterns/atoms/Button.svelte';
  import Badge from '../../patterns/atoms/Badge.svelte';
  import Avatar from '../../patterns/atoms/Avatar.svelte';
  import Skeleton from '../../patterns/atoms/Skeleton.svelte';
  import EmptyState from '../../patterns/molecules/EmptyState.svelte';
  import Alert from '../../patterns/molecules/Alert.svelte';
  import SegmentedControl from '../../patterns/molecules/SegmentedControl.svelte';

  type StateName = 'loading' | 'empty' | 'error' | 'content';
  let shown = $state<StateName>('content');
  let loud = $state(true);

  const people = [
    { name: 'Ada Example', role: 'Owner' },
    { name: 'Grace Example', role: 'Editor' },
    { name: 'Linus Example', role: 'Viewer' },
  ];
</script>

<StudyPage
  slug="function-first"
  title="Function first — and beautiful because of it"
  lead="Principle 1. An interface is not a poster. It is beautiful when it is pleasant and effortless to use; the looks are what that ease feels like. Decoration that does not help is noise, however pretty."
>
  <Section
    eyebrow="The idea in plain words"
    title="Beauty as a by-product of care"
    description="A good kitchen knife is beautiful partly because its balance, edge and grip are right. Remove a function and the beauty starts to feel fake. Interfaces work the same way: order, rhythm and calm come from deciding what matters, then letting everything else step back."
  >
    <Quote
      text="Form ever follows function."
      author="Louis H. Sullivan"
      source="The Tall Office Building Artistically Considered, 1896"
    />
    <p>
      The Bauhaus turned Sullivan’s sentence into a school: an object’s shape should come from what
      it does and how it is made. Dieter Rams added the discipline — good design is useful,
      understandable, unobtrusive, honest — and the restraint: as little design as possible.
    </p>
    <Grid min="18rem" columns={2}>
      <Layer level="panel" gap="xs">
        <strong>The aesthetic–usability effect</strong>
        <p>
          Kurosu and Kashimura (1995) found that people rate attractive interfaces as easier to use,
          even when they are not. Norman later put it bluntly: attractive things work better,
          because a relaxed person copes better with small problems.
        </p>
      </Layer>
      <Layer level="panel" gap="xs">
        <strong>…and its trap</strong>
        <p>
          The same effect hides problems in testing: people forgive a pretty screen and blame
          themselves. That is why this system never accepts beauty as a substitute — every rule has
          to be justified by what it does for the person using it.
        </p>
      </Layer>
    </Grid>
  </Section>

  <Section
    eyebrow="Rule"
    title="One primary action per view"
    description="Hierarchy is a promise: the most important thing looks most important. If four buttons shout, the eye has to read all four labels to find the one that matters. Flip the switch and compare."
  >
    <Layer level="panel" gap="md">
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
          <Button variant="danger" label="Remove all" />
          <Button variant="primary" label="Invite" />
        {:else}
          <Button variant="ghost" label="Export list" />
          <Button variant="ghost" label="Copy link" />
          <Spacer />
          <Button variant="primary" shape="pill" label="Invite" />
        {/if}
      </Row>
    </Layer>
    <InSystem>
      <ul>
        <li>One <code>variant="primary"</code> per view; everything else is secondary or ghost.</li>
        <li>
          Destructive actions are never the most prominent thing; they use <code>--danger</code>,
          never the accent, and they confirm in place.
        </li>
        <li>
          The primary action sits at the end of reading — bottom right of a form or card, right end
          of a bar.
        </li>
      </ul>
    </InSystem>
  </Section>

  <Section
    eyebrow="Rule"
    title="Every state is designed"
    description="A list is not one screen, it is four: loading, empty, failed and full. The empty and failed screens are where people need the most help — and where careless products show a blank or a stack trace."
  >
    <Layer level="panel" gap="md">
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
            tone="error"
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
    </Layer>
    <p>
      Notice what stays still: the panel, its size and the place of the action. Skeletons have the
      shape of what is coming, so nothing jumps when it arrives; the error keeps your work and
      offers the next step right where the list would be.
    </p>
  </Section>

  <Section
    eyebrow="A case from this system"
    title="When the effect fights the function, function wins"
    description="BonbonUI’s front bars can be made of thick glass that bends what passes underneath — a lovely effect over pictures and colour. Over running text, in a document editor, the bent letters fringed into rainbows and the title on the bar became hard to read."
  >
    <Grid min="16rem" columns={2}>
      <Layer level="panel" gap="xs">
        <strong>Where the lens stays</strong>
        <p>
          Navigation over a landing page, the desktop’s shelf and tray, title pills over a
          dashboard: the content underneath is colourful and calm, and the bend tells you the bar
          floats.
        </p>
      </Layer>
      <Layer level="panel" gap="xs">
        <strong>Where it steps back</strong>
        <p>
          The document editor’s bars use plain frosted glass: people read and write under them for
          hours, legibility is the function, so the effect gives way. The slide editor keeps the
          lens, because its bar floats over the calm backdrop, not over text. The component offers <code
            >lens=&#123;false&#125;</code
          > for exactly this decision.
        </p>
      </Layer>
    </Grid>
  </Section>

  <Section
    eyebrow="Rule"
    title="Content first, chrome steps back"
    description="Apple’s guidelines call it deference: the interface helps people understand the content without competing with it. In this system ~90 % of a screen is neutral glass and text; colour is spent on the 10 % that is chosen, primary, or reports a status."
  >
    <Grid min="8rem" columns={4}>
      {#each [['1', 'tint for the whole app'], ['4', 'depth layers'], ['3', 'shapes with meanings'], ['7', 'spacing steps']] as [n, what] (what)}
        <Layer level="ground" align="center" gap="none">
          <span class="big">{n}</span><span class="muted">{what}</span>
        </Layer>
      {/each}
    </Grid>
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
  .big {
    font-size: var(--fs-display);
    font-weight: var(--fw-bold);
    line-height: 1;
    color: var(--accent-ink);
  }
</style>
