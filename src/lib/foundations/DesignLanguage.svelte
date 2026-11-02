<script lang="ts">
  /**
   * Storybook-only: the design language — ten rules, each with the reason and a live
   * do/don't example — plus the motion vocabulary, the voice and the desktop concept.
   */
  import DocPage from './DocPage.svelte';
  import Section from '../patterns/layout/Section.svelte';
  import Layer from '../patterns/layout/Layer.svelte';
  import Grid from '../patterns/layout/Grid.svelte';
  import Row from '../patterns/layout/Row.svelte';
  import Spacer from '../patterns/layout/Spacer.svelte';
  import Button from '../patterns/atoms/Button.svelte';
  import Avatar from '../patterns/atoms/Avatar.svelte';
  import Badge from '../patterns/atoms/Badge.svelte';
  import Icon from '../patterns/atoms/Icon.svelte';
  import { celebrate, greeting, waitingLine } from '../utils/delight';

  let popOpen = $state(false);
  let email = $state('');
  let nope = $state(false);
  let done = $state(false);
  let now = $state(new Date());
  const hello = $derived(greeting(now));

  $effect(() => {
    const t = setInterval(() => (now = new Date()), 3000);
    return () => clearInterval(t);
  });

  function check(event: SubmitEvent) {
    event.preventDefault();
    if (!email.includes('@')) {
      nope = false;
      requestAnimationFrame(() => (nope = true));
    }
  }

  function finish(event: MouseEvent) {
    done = !done;
    if (done) celebrate(event.currentTarget as Element);
  }

  const durations = [
    { name: '--motion-quick', ms: 120, use: 'press, hover colour' },
    { name: '--motion-base', ms: 220, use: 'toggles, popovers, indicators' },
    { name: '--motion-slow', ms: 360, use: 'panels, sheets, page enter' },
    { name: '--motion-lazy', ms: 640, use: 'celebrations, gentle floats' },
  ];
  let playing = $state(false);

  const voice = [
    ['Empty inbox', 'No items found.', 'Inbox zero. Treat yourself.'],
    ['Saved', 'Operation completed successfully.', 'Saved. Nice.'],
    ['Waiting', 'Please wait…', 'Polishing pixels…'],
    ['Not found', 'Error 404', 'This page took a coffee break.'],
    [
      'Server error',
      'Oops! Something went wrong 🙈',
      "Couldn't save — the server didn't answer. Try again.",
    ],
  ];
</script>

<DocPage
  eyebrow="Design language"
  title="Candy, disciplined."
  lead="BonbonUI follows ten rules. They borrow Dieter Rams' discipline — as little design as possible — and add one permission: a little delight is allowed. Each rule below comes with the reason and a live example. Press, hover and tab through them."
>
  <!-- 1 -->
  <Section
    eyebrow="Rule 1"
    title="Calm first, candy second"
    description="About 90 % of a screen is neutral glass and text, about 10 % is colour. Colour is a reward: it marks the primary action, the current selection, status and success. When everything is colourful, nothing stands out — so we spend colour like sugar."
  >
    <Grid min="18rem">
      <Layer level="panel" gap="sm">
        <Row><Badge tone="ok" label="Do" /></Row>
        <Row gap="sm"
          ><Avatar name="Ada Example" size={28} /><strong>Ada Example</strong><Spacer /><span
            class="muted">Editor</span
          ></Row
        >
        <Layer level="selected" padding="sm" direction="horizontal" gap="sm">
          <Avatar name="Grace Example" size={28} /><strong>Grace Example</strong><Spacer /><span
            class="muted">Owner</span
          >
        </Layer>
        <Row gap="sm"
          ><Avatar name="Linus Example" size={28} /><strong>Linus Example</strong><Spacer /><span
            class="muted">Viewer</span
          ></Row
        >
        <Row><Spacer /><Button variant="primary" shape="pill" label="Invite" /></Row>
      </Layer>
      <Layer level="panel" gap="sm" class="dont-loud">
        <Row><Badge tone="danger" label="Don't" /></Row>
        {#each ['Ada', 'Grace', 'Linus'] as n, i (n)}
          <div class="loud" style:--c="var(--color-{['pink', 'yellow', 'blue'][i]})">
            <strong>{n} Example</strong>
          </div>
        {/each}
        <p class="muted">Three colours, no selection — the eye has nowhere to land.</p>
      </Layer>
    </Grid>
  </Section>

  <!-- 2 -->
  <Section
    eyebrow="Rule 2"
    title="Shape says what it does"
    description="Three shapes, three meanings. A pill is something you act on. A rounded rectangle holds things. A circle is someone or something's state. Once learned, people read the interface before they read the words."
  >
    <Grid min="12rem">
      <Layer level="panel" align="center" gap="sm">
        <Row gap="xs"
          ><Button variant="primary" shape="pill" label="Save" /><span class="chip">Design</span
          ></Row
        >
        <strong>Pill — act</strong><span class="muted">buttons, chips, toggles, tags</span>
      </Layer>
      <Layer level="panel" align="center" gap="sm">
        <div class="shape-card"></div>
        <strong>Rounded — hold</strong><span class="muted">cards, panels, windows, icons</span>
      </Layer>
      <Layer level="panel" align="center" gap="sm">
        <Row gap="xs"><Avatar name="Ada Example" size={36} /><span class="dot"></span></Row>
        <strong>Circle — identity</strong><span class="muted">avatars, presence, status</span>
      </Layer>
    </Grid>
  </Section>

  <!-- 3 -->
  <Section
    eyebrow="Rule 3"
    title="One light, from above"
    description="Every surface is lit by the same imagined lamp: a thin highlight on the top edge, a soft shadow below. It is why glass reads as glass, and why nothing looks pasted on. A shadow on top would put the lamp under the table."
  >
    <Row gap="lg" justify="center">
      <div class="lit good">Lit from above</div>
      <div class="lit bad">Lit from below</div>
    </Row>
  </Section>

  <!-- 4 -->
  <Section
    eyebrow="Rule 4"
    title="Honest glass"
    description="Glass only where something floats over something: panels over the backdrop, the front layer over content, overlays over the page. Inside a panel we use flat fills. Glass in glass in glass turns to fog."
  >
    <Grid min="18rem">
      <Layer level="panel" gap="sm">
        <Row><Badge tone="ok" label="Do" /></Row>
        <div class="flat">Flat fill inside a panel</div>
        <div class="flat">Another group</div>
      </Layer>
      <Layer level="panel" gap="sm">
        <Row><Badge tone="danger" label="Don't" /></Row>
        <Layer level="panel" padding="sm"><Layer level="panel" padding="sm">Fog</Layer></Layer>
      </Layer>
    </Grid>
  </Section>

  <!-- 5 -->
  <Section
    eyebrow="Rule 5"
    title="Soft but crisp"
    description="Generous corners and hairline borders keep things friendly; sharp typography keeps them serious. Headings are tight, labels semibold, and figures tabular — so columns of numbers line up like they should in a business tool."
  >
    <Grid min="16rem">
      <Layer level="panel" gap="xs">
        <span class="muted">Tabular figures</span>
        <span class="num tab">€ 1,111.10</span><span class="num tab">€ 8,808.88</span>
      </Layer>
      <Layer level="panel" gap="xs">
        <span class="muted">Proportional figures</span>
        <span class="num">€ 1,111.10</span><span class="num">€ 8,808.88</span>
      </Layer>
    </Grid>
  </Section>

  <!-- 6 -->
  <Section
    eyebrow="Rule 6"
    title="Motion with intent"
    description="Every animation answers a question: where did it come from, where did it go, did it work? Small things may spring; big things only ease, because a bouncing dialog makes people seasick. With reduced motion, movement becomes a quick fade — the meaning stays."
  >
    <Grid min="15rem">
      <Layer level="panel" gap="sm" align="start">
        <strong>Jelly press</strong>
        <p class="muted">
          Press and hold. Buttons squish like a gummy, then spring back — the hand feels the click.
        </p>
        <button type="button" class="demo-jelly">Press me</button>
      </Layer>
      <Layer level="panel" gap="sm" align="start">
        <strong>Sugar-glass sheen</strong>
        <p class="muted">
          Hover. Light sweeps once across the glass — it says "this is touchable".
        </p>
        <button type="button" class="demo-sheen">Hover me</button>
      </Layer>
      <Layer level="panel" gap="sm" align="start">
        <strong>Pop from the origin</strong>
        <p class="muted">Menus grow out of what opened them, so the eye never loses the thread.</p>
        <div class="pop-wrap">
          <Button label={popOpen ? 'Close' : 'Open menu'} onclick={() => (popOpen = !popOpen)} />
          {#if popOpen}
            <div class="pop" role="menu">
              <span role="menuitem">Rename</span><span role="menuitem">Duplicate</span><span
                role="menuitem">Share</span
              >
            </div>
          {/if}
        </div>
      </Layer>
      <Layer level="panel" gap="sm" align="start">
        <strong>A polite "nope"</strong>
        <p class="muted">
          Submit without an @. A small head-shake for wrong input — never for a system error.
        </p>
        <form class="nope-form" class:nope onsubmit={check} onanimationend={() => (nope = false)}>
          <input bind:value={email} placeholder="you@example.com" aria-label="Email" />
          <Button type="submit" label="Join" />
        </form>
      </Layer>
    </Grid>
    <Layer level="panel" gap="sm">
      <Row>
        <strong>Four durations</strong><Spacer /><Button
          size="sm"
          icon="play"
          label="Play"
          onclick={() => {
            playing = false;
            requestAnimationFrame(() => (playing = true));
          }}
        />
      </Row>
      {#each durations as d (d.name)}
        <Row gap="md">
          <code class="dur">{d.name}</code>
          <div class="track">
            <span class="runner" class:go={playing} style:--ms="{d.ms}ms"></span>
          </div>
          <span class="muted dur-use">{d.ms} ms · {d.use}</span>
        </Row>
      {/each}
    </Layer>
  </Section>

  <!-- 7 -->
  <Section
    eyebrow="Rule 7"
    title="Delight lives in the gaps"
    description="Joy appears at the end of a task, in empty states and in idle moments — never in the way of work, never inside errors, never twice for one action. That is what keeps it charming for adults instead of tiring."
  >
    <Grid min="16rem">
      <Layer level="panel" gap="sm" align="start">
        <strong>Sprinkles on success</strong>
        <p class="muted">Finish a task. A small burst says "well done" — once.</p>
        <Button
          variant={done ? 'success' : 'primary'}
          shape="pill"
          icon={done ? 'check' : undefined}
          label={done ? 'Done' : 'Mark as done'}
          onclick={finish}
        />
      </Layer>
      <Layer level="panel" gap="xs" align="start">
        <strong>A greeting that knows the time</strong>
        <span class="greet">{hello.text}</span>
        <span class="muted">{hello.wink}</span>
      </Layer>
      <Layer level="panel" gap="xs" align="start">
        <strong>Waiting, alive</strong>
        <span class="greet small">{waitingLine(now.getTime())}</span>
        <span class="muted">Long waits rotate their words, so the screen never looks frozen.</span>
      </Layer>
    </Grid>
  </Section>

  <!-- 8 -->
  <Section
    eyebrow="Rule 8"
    title="Words are interface"
    description="Short, warm, human. A wink is allowed where nothing is at stake — empty, success, idle. Errors stay plain: what happened, what to do. Every text is still a prop, so teams can choose their own voice."
  >
    <Layer level="panel" padding="none">
      <table class="voice">
        <thead><tr><th>Moment</th><th>Not like this</th><th>Like this</th></tr></thead>
        <tbody>
          {#each voice as [moment, bad, good] (moment)}
            <tr><td>{moment}</td><td class="bad-text">{bad}</td><td>{good}</td></tr>
          {/each}
        </tbody>
      </table>
    </Layer>
  </Section>

  <!-- 9 -->
  <Section
    eyebrow="Rule 9"
    title="Accessible is lovable"
    description="Nobody falls in love with something they cannot use. Text contrast ≥ 4.5:1, a visible focus ring on everything interactive, targets ≥ 32 px (44 px for touch), colour never the only signal, reduced motion and transparency respected."
  >
    <Layer level="panel" direction="horizontal" gap="sm">
      <span class="muted">Press Tab:</span>
      <Button label="One" /><Button label="Two" /><Button variant="primary" label="Three" />
      <Badge tone="danger" icon="alert" label="Failed" />
      <span class="muted">— icon + word, not just red</span>
    </Layer>
  </Section>

  <!-- 10 -->
  <Section
    eyebrow="Rule 10"
    title="As little design as possible"
    description="The whole system is a short list. If something needs a new value, it usually needs an existing token instead."
    layout="grid"
    min="9rem"
  >
    {#each [['1', 'tint'], ['4', 'layers'], ['3', 'shapes'], ['7', 'spacing steps'], ['4', 'durations'], ['10', 'rules']] as [n, what] (what)}
      <Layer level="ground" align="center" gap="none">
        <span class="big">{n}</span><span class="muted">{what}</span>
      </Layer>
    {/each}
  </Section>

  <Section
    eyebrow="The desktop concept"
    title="Bonbon OS — familiar where it helps, new where it delights"
    description="Desktop components keep the habits people rely on (windows, a launcher, a menu) but get their own look, so apps built with BonbonUI feel like themselves rather than a copy."
  >
    <Grid min="16rem">
      {#each [{ icon: 'window', t: 'The candy capsule', d: 'Window controls live in one small capsule: three candy dots at rest that unwrap into minimise, zoom and close on hover. Calm when you read, clear when you reach for it — and close only turns red when you mean it.' }, { icon: 'grid', t: 'The candy tray', d: 'The dock is a glass tray. Icons lift and show their name when you point; opening squishes once. No magnifying wave — it moves your target while you aim.' }, { icon: 'sun', t: 'The top shelf', d: 'A slim floating shelf instead of a full-width bar: app menus on the left, status and a day pill on the right that greets you and tells the time.' }, { icon: 'sparkles', t: 'The candy jar', d: 'All apps in one jar: search first, icons pop in one after another so the grid feels poured, not dumped.' }] as c (c.t)}
        <Layer level="panel" gap="xs">
          <span class="badge"><Icon name={c.icon as 'window'} size={18} /></span>
          <strong>{c.t}</strong>
          <p class="muted">{c.d}</p>
        </Layer>
      {/each}
    </Grid>
    <p>See it all together in <strong>Pages / Desktop / Desktop OS</strong>.</p>
  </Section>
</DocPage>

<style>
  .muted {
    color: var(--text-3);
    font-size: var(--fs-sm);
  }
  .loud {
    padding: var(--space-3);
    border-radius: var(--radius-sm);
    background: var(--c);
    color: #fff;
    box-shadow: 0 4px 0 rgba(0, 0, 0, 0.25);
  }
  .chip {
    padding: var(--space-1) var(--space-3);
    border-radius: var(--radius-pill);
    background: var(--accent-soft);
    color: var(--accent-ink);
    font-size: var(--fs-sm);
    font-weight: var(--fw-semibold);
  }
  .shape-card {
    width: 88px;
    height: 56px;
    border-radius: var(--radius-lg);
    background: var(--fill-muted);
    box-shadow: inset 0 1px 0 var(--pill-light);
  }
  .dot {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: var(--ok);
    box-shadow: 0 0 0 3px var(--tint-ok);
  }
  .lit {
    display: grid;
    place-items: center;
    width: 180px;
    height: 100px;
    border-radius: var(--radius-card);
    background: var(--glass-strong);
    font-weight: var(--fw-semibold);
  }
  .lit.good {
    box-shadow:
      inset 0 1px 0 var(--pill-light),
      0 12px 28px rgba(12, 12, 22, 0.16);
  }
  .lit.bad {
    box-shadow:
      inset 0 -1px 0 var(--pill-light),
      0 -12px 28px rgba(12, 12, 22, 0.16);
  }
  .flat {
    padding: var(--space-3);
    border-radius: var(--radius-md);
    background: var(--fill-subtle);
  }
  .num {
    font-size: var(--fs-2xl);
    font-weight: var(--fw-semibold);
    font-variant-numeric: proportional-nums;
  }
  .num.tab {
    font-variant-numeric: tabular-nums;
  }
  .demo-jelly,
  .demo-sheen {
    position: relative;
    overflow: hidden;
    height: var(--control-md);
    padding: 0 var(--space-5);
    border: 0;
    border-radius: var(--radius-pill);
    background: var(--grad-primary);
    color: var(--on-accent);
    font-weight: var(--fw-semibold);
    box-shadow: var(--shadow-primary);
    cursor: pointer;
    transition: transform var(--motion-quick) var(--ease-jelly);
  }
  .demo-jelly:active {
    transform: var(--press-squish);
  }
  .demo-sheen::after {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--sheen);
    background-size: 250% 100%;
    background-position: 150% 0;
    pointer-events: none;
  }
  .demo-sheen:hover::after {
    animation: bb-sheen var(--motion-slow) var(--ease-out);
  }
  .pop-wrap {
    position: relative;
  }
  .pop {
    position: absolute;
    top: calc(100% + 6px);
    left: 0;
    z-index: 2;
    display: grid;
    min-width: 10rem;
    padding: var(--space-1);
    border-radius: var(--radius-lg);
    background: var(--layer-front-bg), var(--glass-strong);
    border: 0.75px solid var(--layer-front-border);
    box-shadow: var(--shadow-pop);
    backdrop-filter: var(--blur-pill);
    transform-origin: top left;
    animation: bb-pop var(--motion-base) var(--ease-spring);
  }
  .pop span {
    padding: var(--space-2) var(--space-3);
    border-radius: var(--radius-sm);
    font-size: var(--fs-sm);
  }
  .pop span:hover {
    background: var(--accent-soft);
  }
  .nope-form {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
    width: 100%;
  }
  .nope-form.nope {
    animation: bb-nope 360ms var(--ease-out);
  }
  .nope-form input {
    flex: 1 1 8rem;
    height: var(--control-md);
    min-width: 0;
    padding: 0 var(--space-3);
    border: 1px solid var(--border-strong);
    border-radius: var(--radius-md);
    background: var(--input-bg);
  }
  .nope input {
    border-color: var(--danger);
  }
  .dur {
    width: 9rem;
    font-family: var(--font-mono);
    font-size: var(--fs-xs);
  }
  .dur-use {
    width: 15rem;
  }
  .track {
    flex: 1;
    min-width: 6rem;
    height: 10px;
    border-radius: var(--radius-pill);
    background: var(--fill-subtle);
  }
  .runner {
    display: block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--accent);
  }
  .runner.go {
    animation: run var(--ms) var(--ease-out) forwards;
  }
  @keyframes run {
    to {
      transform: translateX(calc(100% * 20));
    }
  }
  .greet {
    font-size: var(--fs-3xl);
    font-weight: var(--fw-bold);
    letter-spacing: -0.02em;
  }
  .greet.small {
    font-size: var(--fs-xl);
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
    border-bottom: 1px solid var(--border-strong);
  }
  .voice th {
    color: var(--text-3);
    font-weight: var(--fw-semibold);
    font-size: var(--fs-xs);
    text-transform: uppercase;
    letter-spacing: var(--tracking-caps);
  }
  .voice tr:last-child td {
    border-bottom: 0;
  }
  .bad-text {
    color: var(--text-3);
    text-decoration: line-through;
    text-decoration-color: color-mix(in srgb, var(--danger) 60%, transparent);
  }
  .big {
    font-size: var(--fs-display);
    font-weight: var(--fw-bold);
    color: var(--accent-ink);
    font-variant-numeric: tabular-nums;
    line-height: 1.1;
  }
  .badge {
    display: inline-grid;
    place-items: center;
    width: 36px;
    height: 36px;
    border-radius: var(--radius-lg);
    background: linear-gradient(160deg, var(--accent), var(--accent-strong));
    color: var(--on-accent);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.45);
  }
  @media (prefers-reduced-motion: reduce) {
    .runner.go,
    .pop,
    .nope-form.nope {
      animation: none;
    }
  }
</style>
