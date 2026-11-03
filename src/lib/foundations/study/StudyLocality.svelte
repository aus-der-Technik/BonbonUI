<script lang="ts">
  /**
   * Storybook-only: principle 3, locality of action — the idea, its roots (mapping, direct
   * manipulation, proximity, change blindness, Fitts), the six rules it becomes, the eye-path
   * experiment, and the honest exceptions.
   */
  import StudyPage from './StudyPage.svelte';
  import Quote from './Quote.svelte';
  import InSystem from './InSystem.svelte';
  import EyePathDemo from './EyePathDemo.svelte';
  import Section from '../../patterns/layout/Section.svelte';
  import Layer from '../../patterns/layout/Layer.svelte';
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
      text: 'Row actions sit in the row, column actions in the column header, card actions on the card. A selection gets its tools at the selection.',
      example: 'DataTable row menus · Spreadsheet column headers · slide object bar',
    },
    {
      title: 'The answer appears at the question',
      text: 'A button shows its own busy and success state; a field shows its own error underneath; “Copied” appears on the copy button.',
      example: 'Button busy → done · Field validation · CopyButton',
    },
    {
      title: 'Things open out of what opened them',
      text: 'Menus, popovers and pickers grow from their trigger. Sheets and drawers slide in from the edge their content belongs to.',
      example: 'DropdownMenu · Popover · DatePicker · Drawer from the row’s side',
    },
    {
      title: 'Insert where it will land',
      text: 'A “+” between two items inserts between them. A new window grows out of its dock icon, and a minimised one goes back there.',
      example: 'Slide rail insert · document block “+” · Dock',
    },
    {
      title: 'Confirm in the same spot',
      text: 'A risky action asks for its second press where the first one was. A modal dialog is reserved for decisions that really must stop everything.',
      example: 'ConfirmButton · ConfirmDialog only for irreversible, far-reaching actions',
    },
    {
      title: 'Global effects get global places',
      text: 'What changes the whole document — title, share, undo, theme — lives in the top bar, because the whole document is where its effect happens. Events nobody triggered (a sync, a message) have no place, so they use the notification area.',
      example: 'Toolbar · MenuBar · Toaster for background events only',
    },
  ];
</script>

<StudyPage
  slug="act-where-you-look"
  title="Act where you look"
  lead="Principle 3. Every control sits exactly where its effect happens. You press a button on a card, and the card changes — never something in the opposite corner of the screen."
>
  <Section
    eyebrow="The idea in plain words"
    title="Your eyes are already there"
    description="When you click something you are looking at it. If the result appears somewhere else, you have to notice that something changed, find where, and connect it back to what you did. Each of those steps costs a moment, and each is a chance to miss it entirely."
  >
    <p>
      Think of a kitchen stove. If the four knobs are arranged like the four burners, you turn the
      right one without thinking. If they sit in a row, you read the little diagram every single
      time — and still sometimes heat the wrong pan. Screens are the same: the closer the control is
      to the thing it changes, the less the mind has to translate.
    </p>
    <Grid min="18rem" columns={2}>
      <Layer level="panel" gap="xs">
        <strong>Mapping — Don Norman</strong>
        <p>
          Norman calls the relationship between controls and their effects <em>mapping</em>, and
          names the stove as its classic failure. A natural mapping uses space itself: the control
          is arranged like, or placed on, what it controls.
        </p>
      </Layer>
      <Layer level="panel" gap="xs">
        <strong>Direct manipulation — Ben Shneiderman</strong>
        <p>
          In 1983 Shneiderman described interfaces where you act on a visible object itself, with
          immediate, reversible results — dragging the file instead of typing its name. It is the
          reason graphical interfaces felt learnable at all.
        </p>
      </Layer>
      <Layer level="panel" gap="xs">
        <strong>Change blindness — Rensink, O’Regan, Clark</strong>
        <p>
          Experiments in 1997 showed that people routinely miss large changes in a scene when they
          happen outside the spot they attend to. A toast in a far corner is exactly such a change.
        </p>
      </Layer>
      <Layer level="panel" gap="xs">
        <strong>Proximity — Gestalt psychology</strong>
        <p>
          Things that are close are seen as belonging together. A button next to a card reads as
          that card’s button; the same button in a toolbar reads as everyone’s.
        </p>
      </Layer>
    </Grid>
    <Quote
      text="Two of the most important characteristics of good design are discoverability and understanding."
      author="Don Norman"
      source="The Design of Everyday Things, 2013"
    />
  </Section>

  <Section
    eyebrow="Try it"
    title="The eye-path experiment"
    description="Do the same task twice: rename “Spring campaign”. Each click and each answer is numbered, and the dashed line is the way your eyes had to travel. Compare the totals."
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
      The far version is not wrong because it is ugly — it is perfectly tidy. It is wrong because it
      makes your attention jump four times for a one-word change, and because the only proof that it
      worked appears where you are not looking. Even in this small panel the far route is close to
      twice as long and has two more stops; on a full screen, where the toolbar and the toast sit in
      opposite corners, the gap grows with every pixel of width. The near route ends on the very
      card you renamed. (Solid dots are where you acted, rings are where the answer appeared.)
    </p>
  </Section>

  <Section
    eyebrow="The rules"
    title="Six rules locality turns into"
    description="Every component and every example page is checked against these. Each rule names where you can see it."
  >
    <ol class="rules">
      {#each rules as r, i (r.title)}
        <li>
          <span class="n">{i + 1}</span>
          <div>
            <strong>{r.title}</strong>
            <p>{r.text}</p>
            <span class="where">{r.example}</span>
          </div>
        </li>
      {/each}
    </ol>
  </Section>

  <Section
    eyebrow="Feedback at the source"
    title="Three controls that answer for themselves"
    description="Press each one. None of them needs a message somewhere else, because the control itself changes."
  >
    <Grid min="14rem">
      <Layer level="panel" gap="sm" align="start">
        <strong>Save</strong>
        <p class="muted">Busy, then done, then back — in the button.</p>
        <Button
          variant={saved === 'done' ? 'success' : 'primary'}
          shape="pill"
          icon={saved === 'done' ? 'check' : undefined}
          busy={saved === 'busy'}
          busyLabel="Saving…"
          label={saved === 'done' ? 'Saved' : 'Save draft'}
          onclick={save}
        />
      </Layer>
      <Layer level="panel" gap="sm" align="start">
        <strong>Copy</strong>
        <p class="muted">“Copied” appears where you pressed.</p>
        <CopyButton value="https://example.com/invite/7Q2" label="Copy invite link" />
      </Layer>
      <Layer level="panel" gap="sm" align="start">
        <strong>Delete</strong>
        <p class="muted">The second press confirms, in the same spot.</p>
        {#if removed}
          <Badge tone="neutral" icon="trash" label="Removed" />
        {:else}
          <ConfirmButton label="Delete draft" onconfirm={() => (removed = true)} />
        {/if}
      </Layer>
    </Grid>
  </Section>

  <Section
    eyebrow="Honest exceptions"
    title="When the effect really is elsewhere"
    description="Locality is about telling the truth about where things happen. Three situations look like exceptions but follow the same logic."
  >
    <Grid min="16rem">
      <Layer level="panel" gap="xs">
        <strong>The effect is the whole thing</strong>
        <p>
          Undo, share, the document title, the theme: their effect is the entire document or app, so
          they live in the bar that frames it all. The top bar is “local” to the whole.
        </p>
      </Layer>
      <Layer level="panel" gap="xs">
        <strong>Nobody pressed anything</strong>
        <p>
          A message arrived, an export finished in the background. There is no place where the user
          acted, so the notification area is the honest place — and it links to where the thing
          lives.
        </p>
      </Layer>
      <Layer level="panel" gap="xs">
        <strong>Everything has to stop</strong>
        <p>
          Deleting a workspace, signing out with unsaved work: a modal dialog interrupts on purpose.
          Even then it names the thing it is about and appears above it, not elsewhere.
        </p>
      </Layer>
    </Grid>
    <InSystem>
      <ul>
        <li>
          Toasts are for background events and for actions whose own control has disappeared (a
          deleted row cannot show “deleted”) — and then they offer an <em>Undo</em>.
        </li>
        <li>Popovers, menus and pickers set their animation origin to their trigger.</li>
        <li>
          Every example page carries “Design notes”: open them and point at a note to see which part
          of the page it is about.
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
    grid-template-columns: repeat(auto-fill, minmax(19rem, 1fr));
    gap: var(--space-5) var(--space-6);
    padding: 0;
    list-style: none;
    counter-reset: none;
  }
  .rules li {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: var(--space-3);
  }
  .n {
    display: grid;
    place-items: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: var(--accent-soft);
    color: var(--accent-ink);
    font-weight: var(--fw-bold);
  }
  .rules p {
    margin-top: var(--space-1);
    font-size: var(--fs-sm);
  }
  .where {
    display: inline-block;
    margin-top: var(--space-1);
    font-size: var(--fs-xs);
    color: var(--accent-ink);
  }
</style>
