<script lang="ts">
  /**
   * Storybook-only: principle 4 — cues that make cause and effect visible. Michotte's launching
   * experiment (timing creates causality), highlighting what changed, depth as hierarchy, light
   * and gradients as direction.
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
    const hit = a.animate(
      [{ transform: 'translateX(0)' }, { transform: `translateX(${160 * travel}px)` }],
      {
        duration: 500,
        easing: 'linear',
        fill: 'forwards',
      },
    );
    await hit.finished;
    await new Promise((r) => setTimeout(r, delay));
    const go = b.animate(
      [{ transform: 'translateX(0)' }, { transform: `translateX(${160 * travel}px)` }],
      {
        duration: 500,
        easing: 'linear',
        fill: 'forwards',
      },
    );
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
        : 'Now B seems to leave on its own — no cause.',
  );

  // Highlighting the change.
  let cue = $state(true);
  let qty = $state(2);
  const price = 24;
  let pulse = $state(0);
  function bump(by: number) {
    qty = Math.max(1, Math.min(9, qty + by));
    pulse++;
  }

  let spread = $state(false);
  const layers = [
    { name: 'Front', what: 'Bars and floating actions — always on top, always reachable.' },
    { name: 'Selected', what: 'What you chose right now — lifted, tinted, outlined.' },
    { name: 'Panel', what: 'Groups of content: a card, a table, a form.' },
    { name: 'Ground', what: 'The page itself and its tinted backdrop.' },
  ];
</script>

<StudyPage
  slug="cause-and-effect"
  title="Show cause and effect"
  lead="Principle 4. Motion, depth and gradients are not decoration: they answer the questions every action raises — where did that come from, where did it go, did it work, what is in front of what?"
>
  <Section
    eyebrow="The idea in plain words"
    title="Timing is meaning"
    description="In 1946 the Belgian psychologist Albert Michotte showed people two squares: one moves, touches the other, the other moves off. Everybody “saw” the first push the second — although nothing pushed anything. Add a short pause at the moment of contact, and the causality vanishes. Try it."
  >
    <Layer level="panel" gap="md">
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
    </Layer>
    <p>
      The lesson for interfaces: an answer that follows an action <em
        >immediately and at the same place</em
      > is perceived as caused by it. Delay it, or show it elsewhere, and people no longer connect the
      two — they wonder whether their click did anything at all.
    </p>
    <Quote
      text="Motion provides meaning."
      author="Google"
      source="Material Design, motion principles, 2014"
    />
  </Section>

  <Section
    eyebrow="Rule"
    title="Light up what changed"
    description="When one action changes several numbers, the eye needs to know which. A brief glow on every value that changed — and only on those — draws the line from cause to effects. Change the quantity, then turn the cue off and compare."
  >
    <Layer level="panel" gap="sm">
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
        {#key pulse}<span class="num" class:glow={cue && pulse > 0}>{formatMoney(qty * price)}</span
          >{/key}
        <span class="muted">Shipping</span><span></span><span class="num">{formatMoney(4.9)}</span>
        <strong>Total</strong><span></span>
        {#key pulse}<strong class="num" class:glow={cue && pulse > 0}
            >{formatMoney(qty * price + 4.9)}</strong
          >{/key}
      </div>
    </Layer>
    <p>
      Shipping did not change, so it does not glow: the cue is honest. In the spreadsheet example
      the same idea runs through formulas — edit a cell, and the cells that depend on it pulse once.
    </p>
  </Section>

  <Section
    eyebrow="Rule"
    title="Depth says what matters now"
    description="Apple’s guidelines name depth as one of three themes: layers and realistic motion convey hierarchy. BonbonUI has exactly four layers; higher is closer to you and more important at this moment. Pull them apart."
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
        <li>
          One lamp, above: every surface has a highlight on its top edge and a shadow below. Shadow
          size grows with the layer.
        </li>
        <li>Glass only where something floats over something; flat fills inside a panel.</li>
        <li>
          Overlays (menus, dialogs, toasts) are not layers — they are moments, and they leave again.
        </li>
      </ul>
    </InSystem>
  </Section>

  <Section
    eyebrow="Rule"
    title="Motion has a source and a destination"
    description="Everything that appears comes from somewhere you can point at; everything that leaves goes somewhere you can find again."
  >
    <Grid min="15rem" columns={3}>
      <Layer level="panel" gap="xs">
        <strong>Grow from the trigger</strong>
        <p>
          Menus, popovers, pickers and the design notes pill open out of the control you pressed,
          and shrink back into it.
        </p>
      </Layer>
      <Layer level="panel" gap="xs">
        <strong>Go home</strong>
        <p>
          A minimised window flies into its dock icon; a deleted file drops into the trash. You know
          where to find it again.
        </p>
      </Layer>
      <Layer level="panel" gap="xs">
        <strong>Small things spring, big things glide</strong>
        <p>
          Springs only for things up to 48 px — a checkbox, an icon. Panels and dialogs ease,
          because a bouncing sheet makes people seasick.
        </p>
      </Layer>
      <Layer level="panel" gap="xs">
        <strong>Four durations</strong>
        <p>
          Quick 120 ms (press), base 220 ms (toggle), slow 360 ms (panel), lazy 640 ms
          (celebration). Distance and size pick the duration.
        </p>
      </Layer>
      <Layer level="panel" gap="xs">
        <strong>Gradients point</strong>
        <p>
          A fade at a scroll edge says “there is more this way”; a progress fill grows in reading
          direction; light falls from above.
        </p>
      </Layer>
      <Layer level="panel" gap="xs">
        <strong>Reduced motion keeps the meaning</strong>
        <p>
          With reduced motion, travel becomes a quick fade. The cause–effect link stays; only the
          movement goes.
        </p>
      </Layer>
    </Grid>
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
  .glow {
    animation: glow var(--motion-lazy) var(--ease-out);
  }
  @keyframes glow {
    from {
      background: var(--accent-soft);
      box-shadow: 0 0 0 2px var(--accent-border);
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
    .glow,
    .plane,
    .plane span {
      animation: none;
      transition: none;
    }
  }
</style>
