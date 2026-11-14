<script lang="ts">
  /**
   * Storybook-only: principle 4 — cues that make cause and effect visible. Michotte's launching
   * experiment, the changed-value cue, liquid selection, presses by layer, light from what is
   * on, depth as hierarchy, and motion with a source and a destination.
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
  import Spacer from '../../patterns/layout/Spacer.svelte';
  import Button from '../../patterns/atoms/Button.svelte';
  import Slider from '../../patterns/atoms/Slider.svelte';
  import Switch from '../../patterns/atoms/Switch.svelte';
  import SegmentedControl from '../../patterns/molecules/SegmentedControl.svelte';
  import NavRail from '../../patterns/organisms/NavRail.svelte';
  import type { IconName } from '../../patterns/atoms/icons';
  import { flashChanged } from '../../patterns/atoms/changed';
  import { storyHref } from './links';
  import { formatMoney } from './money';

  // Michotte's launching effect. The delay is the experiment's variable, so it is a raw number
  // on purpose; everything else uses the motion tokens.
  let delay = $state(0);
  let a = $state<HTMLElement | undefined>();
  let b = $state<HTMLElement | undefined>();
  let playing = $state(false);
  async function launch() {
    if (!a || !b || playing) return;
    playing = true;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const travel = reduce ? 0 : 1;
    const move = (el: HTMLElement) =>
      el.animate([{ transform: 'translateX(0)' }, { transform: `translateX(${160 * travel}px)` }], {
        duration: 500,
        easing: 'linear',
        fill: 'forwards',
      });
    const hit = move(a);
    await hit.finished;
    await new Promise((r) => setTimeout(r, delay));
    const go = move(b);
    await go.finished;
    await new Promise((r) => setTimeout(r, 700));
    hit.cancel();
    go.cancel();
    playing = false;
  }
  const verdict = $derived(
    delay < 80
      ? 'Most people see A push B.'
      : delay < 200
        ? 'The push starts to feel “sticky”.'
        : 'Now B seems to leave on its own.',
  );

  // The changed-value cue, the library's own (`flashChanged`), switchable for comparison.
  let cue = $state(true);
  let qty = $state(2);
  const price = 24;
  let subtotal = $state<HTMLElement | undefined>();
  let total = $state<HTMLElement | undefined>();
  function bump(by: number) {
    const next = Math.max(1, Math.min(9, qty + by));
    if (next === qty) return;
    qty = next;
    if (!cue) return;
    for (const el of [subtotal, total]) if (el) flashChanged(el);
  }

  // Liquid selection: one choice, shown twice — a mark that jumps and a mark that flows.
  const ranges = [
    { value: 'day', label: 'Day' },
    { value: 'week', label: 'Week' },
    { value: 'month', label: 'Month' },
    { value: 'year', label: 'Year' },
  ];
  let range = $state('week');

  // Presses by layer.
  let railAt = $state('home');
  const railItems = [
    { id: 'home', label: 'Overview', icon: 'home' as const },
    { id: 'calendar', label: 'Schedule', icon: 'calendar' as const },
    { id: 'settings', label: 'Settings', icon: 'settings' as const },
  ];

  // Light from what is on.
  let lamps = $state<{ label: string; icon: IconName; on: boolean }[]>([
    { label: 'Hall light', icon: 'sun', on: true },
    { label: 'Heating', icon: 'flame', on: false },
    { label: 'Music', icon: 'music', on: false },
  ]);

  let spread = $state(false);
  const layers = [
    { name: 'Front', what: 'Bars and floating actions: glass, always on top, always reachable.' },
    { name: 'Selected', what: 'What you chose right now: lifted, tinted, outlined.' },
    { name: 'Panel', what: 'A solid tile for a table, a form, a result.' },
    { name: 'Ground', what: 'The page itself and its tinted backdrop.' },
  ];
</script>

<StudyPage
  slug="cause-and-effect"
  title="Show cause and effect"
  lead="Principle 4. Motion, depth and light answer what every action asks: where did that come from, where did it go, did it work?"
>
  <Section
    eyebrow="The idea"
    title="Timing is meaning"
    description="In 1946 Albert Michotte showed that people see one square push another only when the second moves the instant they touch."
    gap="lg"
  >
    <StudyDemo caption="Play it, then add a pause at the moment of contact and play again.">
      <div class="track" aria-hidden="true">
        <span class="ball a" bind:this={a}>A</span>
        <span class="ball b" bind:this={b}>B</span>
      </div>
      <Row gap="md" wrap align="end">
        <div class="slider">
          <Slider
            label="Pause at contact"
            min={0}
            max={600}
            step={20}
            bind:value={delay}
            format={(v) => `${v} ms`}
          />
        </div>
        <Button
          variant="primary"
          shape="pill"
          icon="play"
          label="Play"
          busy={playing}
          onclick={launch}
        />
        <Spacer />
        <strong class="verdict" aria-live="polite">{verdict}</strong>
      </Row>
    </StudyDemo>
    <p>
      Nothing pushes anything on a screen, yet a short pause is enough to break the cause. The
      lesson for interfaces: an answer that follows an action <em
        >immediately and at the same place</em
      > is seen as caused by it. Delay it, or show it elsewhere, and people wonder whether their click
      did anything at all.
    </p>
    <Quote
      text="Motion provides meaning."
      author="Material Design"
      source="motion principles, 2014"
    />
  </Section>

  <Section
    eyebrow="Rule"
    title="Light up what changed"
    description="When one action changes several numbers, a brief glow on each changed value — and only those — draws the line from cause to effects."
    gap="lg"
  >
    <StudyDemo caption="Change the quantity, then turn the cue off and compare." gap="sm">
      <Row gap="sm">
        <strong>Order</strong>
        <Spacer />
        <Switch size="sm" label="Highlight changes" bind:checked={cue} />
      </Row>
      <div class="order">
        <span>Glass mug</span>
        <span class="qty">
          <Button size="sm" iconOnly icon="minus" label="One less" onclick={() => bump(-1)} />
          <output>{qty}</output>
          <Button size="sm" iconOnly icon="plus" label="One more" onclick={() => bump(1)} />
        </span>
        <span class="num" bind:this={subtotal}>{formatMoney(qty * price)}</span>
        <span class="muted">Shipping</span><span></span><span class="num">{formatMoney(4.9)}</span>
        <strong>Total</strong><span></span>
        <strong class="num" bind:this={total}>{formatMoney(qty * price + 4.9)}</strong>
      </div>
    </StudyDemo>
    <p>
      Shipping did not change, so it does not glow: the cue is honest. It never plays on the first
      render or under reduced motion. In the spreadsheet example the same idea runs through
      formulas: edit a cell, and the cells that depend on it pulse once.
    </p>
    <InSystem>
      <ul>
        <li>
          <code>use:changeCue=&#123;value&#125;</code> on anything that shows a value;
          <code>flashChanged(node)</code> for a one-off.
        </li>
        <li>Stat, KpiTile, Price, ProgressBar and tag counts glow by themselves.</li>
      </ul>
    </InSystem>
  </Section>

  <Section
    eyebrow="Rule"
    title="Selection flows like thick water"
    description="The mark under the current tab, segment or rail item travels to the next one, so the eye follows a single thing from old to new."
    gap="lg"
  >
    <StudyDemo caption="Pick a range in either row: both show the same choice.">
      <div class="liquid">
        <span class="l-label">Jumps</span>
        <div class="instant" role="group" aria-label="Range, instant">
          {#each ranges as r (r.value)}
            <button type="button" aria-pressed={range === r.value} onclick={() => (range = r.value)}
              >{r.label}</button
            >
          {/each}
        </div>
        <span class="l-label">Flows</span>
        <SegmentedControl label="Range, liquid" options={ranges} bind:value={range} />
      </div>
    </StudyDemo>
    <p>
      In the top row the mark disappears in one place and appears in another; you compare two
      pictures to see what changed. Below, it moves like a drop of syrup: the leading edge runs
      ahead, the trailing edge lets go late, the drop thins while it stretches — a liquid keeps its
      volume — and the track bulges a little as it passes. Gestalt calls this common fate: what
      moves together is one thing.
    </p>
    <StudyList min="14rem">
      <StudyItem term="Springs, not curves">
        A move that is interrupted carries its speed into the next, so quick changes of mind never
        stutter.
      </StudyItem>
      <StudyItem term="Small things only">
        Springs are for things up to 48 px; the drop is one. Panels and sheets glide.
      </StudyItem>
      <StudyItem term="Calm when asked">
        Under reduced motion the mark jumps and nothing wobbles; the choice is still clear.
      </StudyItem>
    </StudyList>
  </Section>

  <Section
    eyebrow="Rule"
    title="A press moves what it touches"
    description="Every press gets a little give, and what gives depends on the layer you pressed on."
    gap="lg"
  >
    <p>
      The four layers are not only drawn, they behave like what they are. Each layer is a body of
      thick water and what lies on it floats: the dip starts under your finger, travels outwards,
      loses energy with every pixel and settles with a bob or two. A big key moves more water than a
      small one. A drag sways what is around it. A press is felt only on its own layer. Press each
      of the three below and watch what moves.
    </p>
    <div class="presses">
      <div class="press">
        <div class="p-text">
          <span class="p-term">On the ground</span>
          <span
            >What lies on the ground dips: the nearest most, the far side barely. Panels stay.</span
          >
        </div>
        <div class="p-live"><Button variant="soft" icon="sun" label="Press the ground" /></div>
      </div>
      <div class="press">
        <div class="p-text">
          <span class="p-term">On a panel</span>
          <span>What lies on the panels dips, nearest first. The tiles and the ground stay.</span>
        </div>
        <div class="p-live tiles">
          <Layer level="panel" padding="md"><span class="muted">Beside</span></Layer>
          <Layer level="panel" padding="md" align="start">
            <Button variant="soft" size="sm" label="Press" />
          </Layer>
          <Layer level="panel" padding="md"><span class="muted">Beside</span></Layer>
        </div>
      </div>
      <div class="press">
        <div class="p-text">
          <span class="p-term">On glass</span>
          <span>Glass floats above and never touches the page: only the glass squeezes.</span>
        </div>
        <div class="p-live">
          <NavRail
            items={railItems}
            bind:current={railAt}
            orientation="horizontal"
            label="Glass demo"
          />
        </div>
      </div>
    </div>
    <p>
      The press answers where it happened and in proportion to it — a few pixels, never a jolt. It
      makes the depth model something you feel: each layer is its own water, and glass floats free
      of all of them. More in <a href={storyHref('introduction-layers--layers')} target="_top"
        >Introduction › Layers</a
      >.
    </p>
  </Section>

  <Section
    eyebrow="Rule"
    title="Light comes from what is on"
    description="The primary action, the current place and every switch that is on give light, and it falls on the surfaces around them."
    gap="lg"
  >
    <StudyDemo caption="Turn the keys on and off; watch the panel around each one.">
      <div class="lamps">
        {#each lamps as l (l.label)}
          <div class="lamp">
            <Button
              variant="soft"
              size="lg"
              iconOnly
              icon={l.icon}
              label={l.label}
              aria-pressed={l.on}
              onclick={() => (l.on = !l.on)}
            />
            <span class="muted">{l.label} · {l.on ? 'on' : 'off'}</span>
          </div>
        {/each}
      </div>
    </StudyDemo>
    <p>
      Light is a cause you can see from across the room: something is on, so the space around it is
      brighter. A panel takes a little of it, a pane of glass scatters it wider, the ground only
      shows the emitter’s own halo. Success and danger shine in their own colours, never in the
      tint.
    </p>
    <p>
      The other light comes from above. People read shading on the assumption that light falls from
      overhead (Ramachandran, 1988), so every surface has a highlight on its top edge and a shadow
      below, and a raised thing reads as raised. More in
      <a href={storyHref('introduction-light--light')} target="_top">Introduction › Light</a>.
    </p>
  </Section>

  <Section
    eyebrow="Rule"
    title="Depth says what matters now"
    description="There are exactly four layers; higher is closer to you and more important at this moment."
    gap="lg"
  >
    <div class="stack-wrap">
      <button
        type="button"
        class="stack"
        class:spread
        aria-pressed={spread}
        onclick={() => (spread = !spread)}
      >
        {#each layers as l, i (l.name)}
          <span class="plane plane-{i}"><strong>{l.name}</strong><span>{l.what}</span></span>
        {/each}
      </button>
      <span class="muted"
        >{spread ? 'Press to put them back together' : 'Press to pull the layers apart'}</span
      >
    </div>
    <InSystem>
      <ul>
        <li>Glass only for what floats — the front layer and overlays. Panels are solid tiles.</li>
        <li>Shadow grows with the layer; the selected layer adds a tint rim and a close glow.</li>
        <li>
          Overlays (menus, dialogs, toasts) are not layers: they are moments, and they leave again.
        </li>
      </ul>
    </InSystem>
  </Section>

  <Section
    eyebrow="Rule"
    title="Motion has a source and a destination"
    description="Everything that appears comes from somewhere you can point at; everything that leaves goes somewhere you can find again."
    gap="lg"
  >
    <StudyList min="15rem">
      <StudyItem term="Grow from the trigger">
        Menus, popovers, pickers and the design notes pill open out of the control you pressed, and
        shrink back into it.
      </StudyItem>
      <StudyItem term="Go home">
        A minimised window flies into its dock icon; a deleted file drops into the trash. You know
        where to find it again.
      </StudyItem>
      <StudyItem term="Small things spring, big things glide">
        Springs only up to 48 px — a checkbox, a selection mark. A bouncing sheet makes people
        seasick.
      </StudyItem>
      <StudyItem term="Four durations">
        Quick 120 ms for a press, base 220 ms for a toggle, slow 360 ms for a panel, lazy 640 ms for
        a celebration.
      </StudyItem>
      <StudyItem term="Gradients point">
        A fade at a scroll edge says “more this way”; a progress fill grows in reading direction.
      </StudyItem>
      <StudyItem term="Reduced motion keeps the meaning">
        Travel becomes a quick fade, ripples and wobbles stop; the link between cause and effect
        stays.
      </StudyItem>
    </StudyList>
  </Section>
</StudyPage>

<style>
  .muted {
    color: var(--text-3);
    font-size: var(--fs-sm);
  }
  .track {
    position: relative;
    height: 64px;
    border-radius: var(--radius-lg);
    background: var(--fill-muted);
  }
  .ball {
    position: absolute;
    top: 12px;
    display: grid;
    place-items: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    font-weight: var(--fw-bold);
    color: var(--on-accent);
  }
  .a {
    left: 16px;
    background: var(--accent);
  }
  .b {
    left: 216px;
    background: var(--text-2);
    color: var(--bg);
  }
  .slider {
    width: min(280px, 100%);
  }
  .verdict {
    font-size: var(--fs-sm);
  }
  .order {
    display: grid;
    grid-template-columns: 1fr auto 7rem;
    align-items: center;
    gap: var(--space-2) var(--space-4);
  }
  .qty {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
  }
  .qty output {
    min-width: 1.5ch;
    text-align: center;
    font-variant-numeric: tabular-nums;
  }
  .num {
    justify-self: end;
    padding: 2px var(--space-2);
    border-radius: var(--radius-xs);
    font-variant-numeric: tabular-nums;
  }
  .liquid {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: var(--space-4) var(--space-5);
  }
  .liquid > :global(*:nth-child(4)) {
    justify-self: start;
  }
  .l-label {
    font-size: var(--fs-2xs);
    font-weight: var(--fw-semibold);
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--text-3);
  }
  /* A plain track whose mark simply jumps: the comparison for the liquid control below it. */
  .instant {
    display: inline-flex;
    justify-self: start;
    gap: 2px;
    padding: 3px;
    border-radius: var(--radius-pill);
    background: var(--fill-muted);
  }
  .instant button {
    min-height: var(--control-md);
    padding: 0 var(--space-4);
    border: 0;
    border-radius: var(--radius-pill);
    background: none;
    color: var(--text-2);
    font: inherit;
    font-size: var(--fs-md);
    cursor: pointer;
  }
  .instant button[aria-pressed='true'] {
    background: var(--glass-strong);
    box-shadow: var(--layer-panel-shadow);
    color: var(--text);
    font-weight: var(--fw-semibold);
  }
  .instant button:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
  }
  .lamps {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-4);
    padding: var(--space-4) 0;
  }
  .lamp {
    display: grid;
    justify-items: center;
    gap: var(--space-3);
  }
  .presses {
    display: grid;
  }
  .press {
    display: grid;
    grid-template-columns: minmax(0, 15rem) 1fr;
    align-items: center;
    gap: var(--space-4) var(--space-8);
    padding: var(--space-5) 0;
    border-top: 1px solid var(--border-strong);
  }
  .press:last-child {
    border-bottom: 1px solid var(--border-strong);
  }
  .p-text {
    display: grid;
    gap: var(--space-1);
    font-size: var(--fs-md);
    line-height: 1.5;
    color: var(--text-2);
  }
  .p-term {
    font-weight: var(--fw-semibold);
    color: var(--text);
  }
  .p-live {
    min-width: 0;
  }
  .tiles {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: var(--space-3);
  }
  @media (max-width: 640px) {
    .press {
      grid-template-columns: 1fr;
    }
  }
  .stack-wrap {
    display: grid;
    justify-items: center;
    gap: var(--space-3);
    padding: var(--space-6) 0;
  }
  .stack {
    position: relative;
    width: min(420px, 90%);
    height: 220px;
    border: 0;
    padding: 0;
    background: none;
    perspective: 900px;
    cursor: pointer;
    border-radius: var(--radius-card);
  }
  .stack:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
  }
  .plane {
    position: absolute;
    inset: 30px 20px;
    display: grid;
    align-content: center;
    gap: var(--space-1);
    padding: var(--space-3) var(--space-4);
    border-radius: var(--radius-card);
    text-align: left;
    color: var(--text);
    transform: rotateX(52deg) rotateZ(-28deg) translateZ(calc(var(--i) * 6px));
    transition: transform var(--motion-slow) var(--ease-out);
  }
  .plane span {
    font-size: var(--fs-xs);
    color: var(--text-2);
    opacity: 0;
    transition: opacity var(--motion-base) var(--ease-out);
  }
  .spread .plane span {
    opacity: 1;
  }
  /* Stacked, only the top plane is named; pulled apart, each one is. */
  .plane:not(.plane-0) strong {
    opacity: 0;
    transition: opacity var(--motion-base) var(--ease-out);
  }
  .spread .plane strong {
    opacity: 1;
  }
  .spread .plane {
    transform: rotateX(52deg) rotateZ(-28deg) translateZ(calc(var(--i) * 64px - 96px));
  }
  .plane-3 {
    --i: 0;
    background: var(--layer-ground-bg);
    box-shadow: inset 0 0 0 1px var(--border-strong);
  }
  .plane-2 {
    --i: 1;
    background: var(--layer-panel-bg);
    box-shadow: var(--layer-panel-shadow);
  }
  .plane-1 {
    --i: 2;
    background: var(--layer-selected-bg);
    box-shadow: var(--layer-selected-shadow);
  }
  .plane-0 {
    --i: 3;
    background: var(--layer-front-bg);
    box-shadow: var(--layer-front-shadow);
  }
  @media (prefers-reduced-motion: reduce) {
    .plane,
    .plane span {
      transition: none;
    }
  }
</style>
