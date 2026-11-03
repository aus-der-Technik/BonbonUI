<script lang="ts">
  /**
   * Storybook-only: the science underneath — Gestalt grouping, Fitts's, Hick's and Jakob's laws,
   * and the Swiss grid and type scale — each with a small experiment.
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
  import Slider from '../../patterns/atoms/Slider.svelte';
  import Switch from '../../patterns/atoms/Switch.svelte';
  import Kbd from '../../patterns/atoms/Kbd.svelte';

  // Gestalt: proximity.
  let gap = $state(28);

  // Fitts: alternate between the start pad and the target; time each reach.
  type Trial = 'small-far' | 'big-near';
  let trial = $state<Trial>('small-far');
  let reaches = $state<number[]>([]);
  let armed = $state<number | null>(null);
  const ROUNDS = 5;
  const target = $derived(
    trial === 'small-far' ? { size: 18, distance: 420 } : { size: 56, distance: 120 },
  );
  const id = $derived(Math.log2(target.distance / target.size + 1));
  const average = $derived(
    reaches.length ? Math.round(reaches.reduce((s, r) => s + r, 0) / reaches.length) : 0,
  );
  function arm() {
    if (reaches.length >= ROUNDS) reaches = [];
    armed = performance.now();
  }
  function hit() {
    if (armed === null) return;
    reaches = [...reaches, performance.now() - armed];
    armed = null;
  }
  function switchTrial(t: Trial) {
    trial = t;
    reaches = [];
    armed = null;
  }

  // Hick: find a word in a flat list vs a grouped one.
  const groups: [string, string[]][] = [
    ['Edit', ['Undo', 'Redo', 'Cut', 'Copy', 'Paste', 'Duplicate']],
    ['View', ['Zoom in', 'Zoom out', 'Full screen', 'Sidebar', 'Ruler', 'Grid']],
    ['Insert', ['Image', 'Table', 'Chart', 'Link', 'Comment', 'Page break']],
    ['Format', ['Bold', 'Italic', 'Heading', 'Quote', 'List', 'Align']],
  ];
  const flat = groups
    .flatMap(([, items]) => items)
    .map((item, i) => ({ item, k: (i * 7) % 24 }))
    .sort((x, y) => x.k - y.k)
    .map((x) => x.item);
  const words = ['Duplicate', 'Ruler', 'Page break', 'Quote', 'Redo', 'Chart'];
  let wanted = $state<string | null>(null);
  let started = 0;
  let times = $state<{ flat: number[]; grouped: number[] }>({ flat: [], grouped: [] });
  let round = 0;
  function startHunt() {
    wanted = words[round++ % words.length]!;
    started = performance.now();
  }
  function pick(item: string, kind: 'flat' | 'grouped') {
    if (item !== wanted) return;
    times[kind] = [...times[kind], performance.now() - started];
    wanted = null;
  }
  const mean = (xs: number[]) =>
    xs.length ? `${Math.round(xs.reduce((s, x) => s + x, 0) / xs.length)} ms` : '—';

  // Swiss grid.
  let showGrid = $state(false);
  const scale = [
    '--fs-display',
    '--fs-3xl',
    '--fs-2xl',
    '--fs-xl',
    '--fs-lg',
    '--fs-base',
    '--fs-sm',
    '--fs-xs',
  ];
</script>

<StudyPage
  slug="perception-and-laws"
  title="Perception and laws"
  lead="Underneath taste there is measurement. Psychologists have studied for a century how people see groups, how long it takes to hit a target and to make a choice. These findings are the reasons behind many small rules in the system."
>
  <Section
    eyebrow="Gestalt"
    title="We see groups before we see things"
    description="The Gestalt psychologists in Berlin (Wertheimer, Koffka, Köhler) found a handful of rules the eye follows without asking. Interfaces use them to say “these belong together” without drawing a single line."
  >
    <Layer level="panel" gap="md">
      <Row gap="md" wrap>
        <div class="slider">
          <Slider
            label="Space between the groups"
            min={4}
            max={48}
            bind:value={gap}
            format={(v) => `${v} px`}
          />
        </div>
        <Spacer />
        <span class="muted">{gap < 12 ? 'Twelve dots — one row.' : 'Three groups of four.'}</span>
      </Row>
      <div class="dots" style:--group-gap="{gap}px">
        {#each [0, 1, 2] as g (g)}
          <span class="group"
            >{#each [0, 1, 2, 3] as d (d)}<i></i>{/each}</span
          >
        {/each}
      </div>
    </Layer>
    <Grid min="13rem" columns={3}>
      {#each [['Proximity', 'Close things belong together.', 'Spacing tokens: tight inside a group, wider between groups.'], ['Similarity', 'Alike things belong together.', 'Every pill acts, every circle is someone; one look per meaning.'], ['Common region', 'Things inside one area belong together.', 'Panels (layers) group content instead of lines and boxes.'], ['Figure and ground', 'We separate a shape from its background.', 'Glass panels float over a tinted ground; depth separates.'], ['Continuity', 'The eye follows lines and edges.', 'Shared left edges and a grid let the eye run down a page.'], ['Common fate', 'Things that move together belong together.', 'A selection moves, highlights and is dragged as one.']] as [law, idea, here] (law)}
        <Layer level="ground" gap="xs">
          <strong>{law}</strong>
          <p>{idea}</p>
          <p class="here">{here}</p>
        </Layer>
      {/each}
    </Grid>
  </Section>

  <Section
    eyebrow="Fitts’s law, 1954"
    title="Big and close is fast"
    description="Paul Fitts measured how long people take to hit a target. The time grows with the distance and shrinks with the size, roughly as log₂(distance ÷ width + 1) — the “index of difficulty”. Press the start pad, then the target, five times; then switch."
  >
    <Layer level="panel" gap="md">
      <Row gap="sm" wrap>
        <Button
          size="sm"
          variant={trial === 'small-far' ? 'tinted' : 'plain'}
          label="Small and far"
          onclick={() => switchTrial('small-far')}
        />
        <Button
          size="sm"
          variant={trial === 'big-near' ? 'tinted' : 'plain'}
          label="Big and near"
          onclick={() => switchTrial('big-near')}
        />
        <Spacer />
        <span class="muted"
          >Difficulty {id.toFixed(1)} bits · {reaches.length}/{ROUNDS} reaches{#if reaches.length}
            · average <strong>{average} ms</strong>{/if}</span
        >
      </Row>
      <div class="arena">
        <button type="button" class="pad" class:armed={armed !== null} onclick={arm}
          >{armed !== null ? 'Now hit →' : 'Start'}</button
        >
        <button
          type="button"
          class="target"
          aria-label="Target"
          style:left="{24 + 72 + target.distance - target.size / 2}px"
          style:width="{target.size}px"
          style:height="{target.size}px"
          onclick={hit}
        ></button>
      </div>
    </Layer>
    <InSystem>
      <ul>
        <li>
          Every target is at least 32 px (44 px on touch); small icons get an invisible hit area
          that reaches 32 px.
        </li>
        <li>
          The primary action sits next to the work, not across the screen — locality and Fitts
          agree.
        </li>
        <li>
          Screen edges are infinitely deep: bars that touch the edge are easy to hit, so the
          desktop’s shelf and tray hug the edges.
        </li>
      </ul>
    </InSystem>
  </Section>

  <Section
    eyebrow="Hick’s law, 1952"
    title="More choices, slower decisions — unless they are grouped"
    description="William Hick found that choosing takes longer the more options there are, growing with the logarithm of their number. In real menus what matters most is whether people can skip: grouped, labelled options let the eye jump to the right family first."
  >
    <Layer level="panel" gap="md">
      <Row gap="sm" wrap>
        <Button
          size="sm"
          variant="primary"
          shape="pill"
          icon="play"
          label={wanted ? `Find “${wanted}”` : 'Give me a word'}
          onclick={startHunt}
          disabled={!!wanted}
        />
        <Spacer />
        <span class="muted"
          >Flat list: <strong>{mean(times.flat)}</strong> · Grouped:
          <strong>{mean(times.grouped)}</strong></span
        >
      </Row>
      <Grid min="16rem" columns={2}>
        <div class="menu" aria-label="Flat menu">
          {#each flat as item (item)}
            <button type="button" onclick={() => pick(item, 'flat')}>{item}</button>
          {/each}
        </div>
        <div class="menu grouped" aria-label="Grouped menu">
          {#each groups as [name, items] (name)}
            <span class="family">{name}</span>
            {#each items as item (item)}
              <button type="button" onclick={() => pick(item, 'grouped')}>{item}</button>
            {/each}
          {/each}
        </div>
      </Grid>
    </Layer>
    <p>
      Do it a few times in each list. Most people are clearly faster in the grouped one, although it
      has the same 24 items. That is why menus here are short, grouped and labelled — and why a
      search field (<Kbd>⌘</Kbd>
      <Kbd>K</Kbd>) takes over when the list gets long. A note on a popular myth: George Miller’s
      “seven, plus or minus two” is about short-term memory, not menu length. Nobody has to remember
      a menu; they read it.
    </p>
  </Section>

  <Section
    eyebrow="Jakob’s law, 2000"
    title="People expect what they already know"
    description="Jakob Nielsen observed that users spend most of their time on other sites, so they expect yours to work the same way. Familiarity is a gift you can spend only once — on something that is genuinely better."
  >
    <Quote
      text="Users spend most of their time on other sites."
      author="Jakob Nielsen"
      source="Jakob’s Law of Internet User Experience"
    />
    <Grid min="16rem" columns={2}>
      <Layer level="panel" gap="xs">
        <strong>Kept familiar</strong>
        <ul>
          <li>The logo goes home; the cart lives at the top end of a shop.</li>
          <li>Search has a magnifier; <Kbd>⌘</Kbd> <Kbd>K</Kbd> opens the command palette.</li>
          <li>Links are underlined in text; Escape closes; Tab moves forward.</li>
          <li>Windows can be dragged by their title and closed with an ×.</li>
        </ul>
      </Layer>
      <Layer level="panel" gap="xs">
        <strong>New on purpose</strong>
        <ul>
          <li>
            The desktop has its own look — no copied traffic lights, no magnifying dock that moves
            targets while you aim.
          </li>
          <li>Feedback appears at the control, not in a corner toast.</li>
          <li>Status badges are not pills, so pills mean one thing: press me.</li>
        </ul>
      </Layer>
    </Grid>
  </Section>

  <Section
    eyebrow="Swiss style"
    title="A grid and a type scale do the ordering"
    description="The Swiss designers of the 1950s — Josef Müller-Brockmann, Armin Hofmann, Emil Ruder — arranged text and images on strict grids with one sans-serif family in a few sizes. The result reads as calm and objective, and it lets content of any kind share a page."
  >
    <Grid min="16rem" columns={2}>
      <Layer level="panel" gap="xs">
        <strong>The type scale</strong>
        {#each scale as token (token)}
          <span class="specimen" style:font-size="var({token})"
            >Aa <span class="tok">{token}</span></span
          >
        {/each}
      </Layer>
      <Layer level="panel" gap="sm">
        <Row gap="sm"
          ><strong>The grid</strong><Spacer /><Switch
            size="sm"
            label="Show columns"
            bind:checked={showGrid}
          /></Row
        >
        <div class="sample" class:show={showGrid}>
          <div class="cols" aria-hidden="true">
            {#each Array(6) as _, i (i)}<i></i>{/each}
          </div>
          <span class="s-eyebrow">Report</span>
          <span class="s-title">Spring numbers</span>
          <span class="s-body"
            >Text runs at 60–70 characters per line, the measure typographers have recommended for a
            century.</span
          >
          <span class="s-a"></span><span class="s-b"></span><span class="s-c"></span>
        </div>
      </Layer>
    </Grid>
    <Quote
      text="The grid system is an aid, not a guarantee."
      author="Josef Müller-Brockmann"
      source="Grid Systems in Graphic Design, 1981"
    />
    <InSystem>
      <ul>
        <li>
          One family, eight sizes, four weights. Headings tight, body generous (line height
          1.5–1.65).
        </li>
        <li>
          Text is left-aligned with a ragged right edge; paragraphs stop at about 68 characters.
        </li>
        <li>Figures in tables and prices are tabular, so columns of numbers line up.</li>
        <li>Seven spacing steps; a page uses the same gutters everywhere.</li>
      </ul>
    </InSystem>
  </Section>
</StudyPage>

<style>
  .muted {
    color: var(--text-3);
    font-size: var(--fs-sm);
  }
  .slider {
    width: min(320px, 100%);
  }
  .dots {
    display: flex;
    gap: var(--group-gap);
    justify-content: center;
    padding: var(--space-4) 0;
  }
  .group {
    display: flex;
    gap: 8px;
  }
  .group i {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: var(--text-2);
  }
  .here {
    font-size: var(--fs-sm);
    color: var(--accent-ink);
  }
  .arena {
    position: relative;
    height: 120px;
    border-radius: var(--radius-lg);
    background: var(--fill-muted);
    overflow: hidden;
  }
  .pad {
    position: absolute;
    left: 24px;
    top: 50%;
    width: 72px;
    height: 40px;
    transform: translateY(-50%);
    border: 0;
    border-radius: var(--radius-pill);
    background: var(--glass-strong);
    box-shadow: var(--layer-panel-shadow);
    color: var(--text);
    font: inherit;
    font-size: var(--fs-sm);
    cursor: pointer;
  }
  .pad.armed {
    background: var(--accent-soft);
    color: var(--accent-ink);
  }
  .target {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    border: 0;
    border-radius: 50%;
    background: var(--accent);
    cursor: pointer;
    transition:
      width var(--motion-base) var(--ease-out),
      height var(--motion-base) var(--ease-out),
      left var(--motion-base) var(--ease-out);
  }
  .pad:focus-visible,
  .target:focus-visible,
  .menu button:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
  }
  .menu {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2px var(--space-2);
    align-content: start;
    padding: var(--space-2);
    border-radius: var(--radius-lg);
    background: var(--fill-muted);
  }
  .menu button {
    padding: var(--space-1) var(--space-2);
    border: 0;
    border-radius: var(--radius-sm);
    background: none;
    color: var(--text);
    font: inherit;
    font-size: var(--fs-sm);
    text-align: left;
    cursor: pointer;
  }
  .menu button:hover {
    background: var(--fill-hover, var(--fill-muted));
  }
  .family {
    grid-column: 1 / -1;
    margin-top: var(--space-2);
    font-size: var(--fs-2xs);
    font-weight: var(--fw-semibold);
    letter-spacing: var(--tracking-caps);
    text-transform: uppercase;
    color: var(--text-3);
  }
  .family:first-child {
    margin-top: 0;
  }
  .specimen {
    display: flex;
    align-items: baseline;
    gap: var(--space-3);
    line-height: 1.2;
    font-weight: var(--fw-semibold);
  }
  .specimen .tok {
    font-family: var(--font-mono);
    font-size: var(--fs-xs);
    font-weight: var(--fw-regular);
    color: var(--text-3);
  }
  .sample {
    position: relative;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: var(--space-2) var(--space-3);
    padding: var(--space-3);
    border-radius: var(--radius-lg);
    background: var(--fill-muted);
  }
  .cols {
    position: absolute;
    inset: var(--space-3);
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: var(--space-3);
    opacity: 0;
    transition: opacity var(--motion-base) var(--ease-out);
    pointer-events: none;
  }
  .cols i {
    background: var(--accent-soft);
    border-radius: var(--radius-xs);
  }
  .show .cols {
    opacity: 1;
  }
  .sample > span {
    position: relative;
  }
  .s-eyebrow {
    grid-column: 1 / -1;
    font-size: var(--fs-2xs);
    letter-spacing: var(--tracking-caps);
    text-transform: uppercase;
    color: var(--accent-ink);
  }
  .s-title {
    grid-column: 1 / 5;
    font-size: var(--fs-xl);
    font-weight: var(--fw-bold);
  }
  .s-body {
    grid-column: 1 / 5;
    font-size: var(--fs-xs);
    color: var(--text-2);
  }
  .s-a,
  .s-b,
  .s-c {
    height: 48px;
    border-radius: var(--radius-sm);
    background: var(--glass-strong);
  }
  .s-a {
    grid-column: 1 / 3;
  }
  .s-b {
    grid-column: 3 / 5;
  }
  .s-c {
    grid-column: 5 / 7;
    grid-row: 2 / 4;
    height: auto;
  }
</style>
