<script lang="ts">
  /**
   * Storybook-only: principle 3, locality of action — the idea, its roots (mapping, direct
   * manipulation, change blindness, proximity), the eye-path experiment, the six rules it
   * becomes, controls that answer for themselves, and the honest exceptions.
   */
  import StudyPage from './StudyPage.svelte';
  import Quote from './Quote.svelte';
  import InSystem from './InSystem.svelte';
  import EyePathDemo from './EyePathDemo.svelte';
  import StudyDemo from './StudyDemo.svelte';
  import StudyList from './StudyList.svelte';
  import StudyItem from './StudyItem.svelte';
  import Section from '../../patterns/layout/Section.svelte';
  import Grid from '../../patterns/layout/Grid.svelte';
  import Row from '../../patterns/layout/Row.svelte';
  import Badge from '../../patterns/atoms/Badge.svelte';
  import CopyButton from '../../patterns/molecules/CopyButton.svelte';
  import ConfirmButton from '../../patterns/molecules/ConfirmButton.svelte';
  import Button from '../../patterns/atoms/Button.svelte';

  let saved = $state<'idle' | 'busy' | 'done'>('idle');
  function save() {
    saved = 'busy';
    setTimeout(() => (saved = 'done'), 900);
    setTimeout(() => (saved = 'idle'), 2600);
  }
  let removed = $state(false);

  const rules: { title: string; text: string; example: string }[] = [
    {
      title: 'Controls live on the object',
      text: 'Row actions sit in the row, column actions in the column header, card actions on the card; a selection gets its tools at the selection.',
      example: 'DataTable rows · spreadsheet headers · the slide object bar',
    },
    {
      title: 'The answer appears at the question',
      text: 'A button shows its own busy and done state, a field its own error, a copy button its own “Copied”.',
      example: 'Button · Field · CopyButton',
    },
    {
      title: 'Things open out of what opened them',
      text: 'Menus, popovers and pickers grow from their trigger; drawers slide in from the edge their content belongs to.',
      example: 'DropdownMenu · Popover · DatePicker · Drawer',
    },
    {
      title: 'Create sits on the collection',
      text: 'A “+” between two items inserts between them; “New row” sits at the end of the grid it adds to.',
      example: 'Slide rail · document blocks · EditableGrid · Calendar days',
    },
    {
      title: 'Confirm in the same spot',
      text: 'A risky action asks for its second press where the first one was. A modal is for decisions that must stop everything.',
      example: 'ConfirmButton · ConfirmDialog for irreversible actions only',
    },
    {
      title: 'Global effects get global places',
      text: 'Title, share, undo and theme change the whole document, so they live in the bar that frames it. Events nobody triggered use the notification area.',
      example: 'Toolbar · MenuBar · Toaster for background events',
    },
  ];
</script>

<StudyPage
  slug="act-where-you-look"
  title="Act where you look"
  lead="Principle 3. Every control sits where its effect happens: press a button on a card, and the card changes."
>
  <Section
    eyebrow="The idea"
    title="Your eyes are already there"
    description="When you click something you are looking at it, so that is where the answer belongs."
    gap="lg"
  >
    <p>
      If the result appears elsewhere, you have to notice that something changed, find where, and
      connect it back to what you did — three chances to miss it. Think of a stove: knobs arranged
      like the burners are turned without thinking; knobs in a row send you to the little diagram
      every time.
    </p>
    <StudyList min="17rem">
      <StudyItem term="Mapping" meta="Don Norman">
        The relationship between controls and their effects. A natural mapping uses space itself:
        the control is placed on, or arranged like, what it controls.
      </StudyItem>
      <StudyItem term="Direct manipulation" meta="Ben Shneiderman, 1983">
        Act on the visible object itself, with immediate, reversible results — drag the file instead
        of typing its name.
      </StudyItem>
      <StudyItem term="Change blindness" meta="Rensink, O’Regan, Clark, 1997">
        People routinely miss large changes outside the spot they attend to. A toast in a far corner
        is exactly such a change.
      </StudyItem>
      <StudyItem term="Proximity" meta="Gestalt psychology">
        Close things belong together. A button next to a card reads as that card’s; the same button
        in a toolbar reads as everyone’s.
      </StudyItem>
    </StudyList>
    <Quote
      text="Two of the most important characteristics of good design are discoverability and understanding."
      author="Don Norman"
      source="The Design of Everyday Things, 2013"
    />
  </Section>

  <Section
    eyebrow="Try it"
    title="The eye-path experiment"
    description="Rename “Spring campaign” twice, and compare how far your eyes had to travel."
    gap="lg"
  >
    <Grid min="18rem" columns={2}>
      <div class="experiment">
        <Row gap="xs"
          ><Badge tone="danger" label="Far" /><span class="muted">toolbar · dialog · toast</span
          ></Row
        >
        <EyePathDemo mode="far" />
      </div>
      <div class="experiment">
        <Row gap="xs"
          ><Badge tone="ok" label="Near" /><span class="muted">all on the card</span></Row
        >
        <EyePathDemo mode="near" />
      </div>
    </Grid>
    <p>
      Solid dots are where you acted, rings where the answer appeared. The far version is perfectly
      tidy; it is wrong because your attention jumps four times for a one-word change, and the proof
      appears where you are not looking. Even in this small panel the far route is nearly twice as
      long; on a full screen the gap grows with every pixel of width.
    </p>
  </Section>

  <Section
    eyebrow="The rules"
    title="Six rules locality turns into"
    description="Every component and every example page is checked against these."
    gap="lg"
  >
    <ol class="rules">
      {#each rules as r, i (r.title)}
        <li>
          <span class="n">{i + 1}</span>
          <div class="r-body">
            <span class="r-title">{r.title}</span>
            <span class="r-text">{r.text}</span>
            <span class="where">{r.example}</span>
          </div>
        </li>
      {/each}
    </ol>
  </Section>

  <Section
    eyebrow="Feedback at the source"
    title="Three controls that answer for themselves"
    description="None of them needs a message somewhere else, because the control itself changes."
    gap="lg"
  >
    <StudyDemo caption="Press each one, and keep your eyes where you pressed.">
      <div class="sources">
        <div class="source">
          <span class="s-title">Save</span>
          <span class="muted">Busy, then done, then back — in the button.</span>
          <Button
            variant={saved === 'done' ? 'success' : 'primary'}
            shape="pill"
            icon={saved === 'done' ? 'check' : undefined}
            busy={saved === 'busy'}
            busyLabel="Saving…"
            label={saved === 'done' ? 'Saved' : 'Save draft'}
            onclick={save}
          />
        </div>
        <div class="source">
          <span class="s-title">Copy</span>
          <span class="muted">“Copied” appears where you pressed.</span>
          <CopyButton value="https://example.com/invite/7Q2" label="Copy invite link" />
        </div>
        <div class="source">
          <span class="s-title">Delete</span>
          <span class="muted">The second press confirms, in the same spot.</span>
          {#if removed}
            <Badge tone="neutral" icon="trash" label="Removed" />
          {:else}
            <ConfirmButton label="Delete draft" onconfirm={() => (removed = true)} />
          {/if}
        </div>
      </div>
    </StudyDemo>
    <p>
      Pressing also moves the page a little, and mostly near the press: the things beside it dip
      with it, the far ones barely, because the wave loses energy with every pixel. Even the give of
      the surface happens where you look.
    </p>
  </Section>

  <Section
    eyebrow="Honest exceptions"
    title="When the effect really is elsewhere"
    description="Locality is about telling the truth about where things happen, and three cases follow the same logic."
    gap="lg"
  >
    <StudyList min="14rem">
      <StudyItem term="The effect is the whole thing">
        Undo, share, the title and the theme affect the entire document, so they live in the bar
        that frames it. The top bar is local to the whole.
      </StudyItem>
      <StudyItem term="Nobody pressed anything">
        A message arrived, an export finished. There is no place where you acted, so the
        notification area is the honest place — and it links to where the thing lives.
      </StudyItem>
      <StudyItem term="Everything has to stop">
        Deleting a workspace, signing out with unsaved work: a dialog interrupts on purpose, names
        the thing it is about and grows from the control that opened it.
      </StudyItem>
    </StudyList>
    <InSystem>
      <ul>
        <li>
          Toasts are for background events and for actions whose own control has gone (a deleted row
          cannot show “deleted”) — and then they offer <em>Undo</em>.
        </li>
        <li>Popovers, menus and pickers set their animation origin to their trigger.</li>
        <li>
          Every example page carries “Design notes”: point at a note and the part of the page it is
          about lights up.
        </li>
      </ul>
    </InSystem>
  </Section>
</StudyPage>

<style>
  .muted {
    color: var(--text-3);
    font-size: var(--fs-sm);
  }
  .experiment {
    display: grid;
    gap: var(--space-2);
  }
  .rules {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 19rem), 1fr));
    gap: 0 var(--space-8);
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .rules li {
    display: grid;
    grid-template-columns: 2.25rem 1fr;
    gap: var(--space-3);
    padding: var(--space-4) 0 var(--space-5);
    border-top: 1px solid var(--border-strong);
  }
  .n {
    font-family: var(--font-serif);
    font-size: var(--fs-3xl);
    line-height: 1.1;
    color: var(--accent-ink);
  }
  .r-body {
    display: grid;
    gap: var(--space-1);
  }
  .r-title {
    font-size: var(--fs-lg);
    font-weight: var(--fw-semibold);
  }
  .r-text {
    font-size: var(--fs-md);
    line-height: var(--leading-body);
    color: var(--text-2);
  }
  .where {
    font-size: var(--fs-xs);
    color: var(--accent-ink);
  }
  .sources {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 12rem), 1fr));
  }
  .source {
    display: grid;
    align-content: start;
    justify-items: start;
    gap: var(--space-2);
    padding: var(--space-2) var(--space-5);
    border-left: 1px solid var(--border-strong);
  }
  .source:first-child {
    padding-left: 0;
    border-left: 0;
  }
  .s-title {
    font-weight: var(--fw-semibold);
  }
  @media (max-width: 640px) {
    .source {
      padding: var(--space-4) 0;
      border-left: 0;
      border-top: 1px solid var(--border-strong);
    }
    .source:first-child {
      padding-top: 0;
      border-top: 0;
    }
  }
</style>
