<script lang="ts">
  /**
   * Storybook-only: the design language — ten rules, each with its reason and a live example,
   * grouped in pairs — plus the desktop concept.
   */
  import DocPage from './DocPage.svelte';
  import { introPager } from './intro';
  import IntroDemo from './IntroDemo.svelte';
  import IntroList, { type IntroItem } from './IntroList.svelte';
  import IntroRule from './IntroRule.svelte';
  import Section from '../patterns/layout/Section.svelte';
  import Layer from '../patterns/layout/Layer.svelte';
  import Row from '../patterns/layout/Row.svelte';
  import Spacer from '../patterns/layout/Spacer.svelte';
  import Button from '../patterns/atoms/Button.svelte';
  import Card from '../patterns/atoms/Card.svelte';
  import Avatar from '../patterns/atoms/Avatar.svelte';
  import Badge from '../patterns/atoms/Badge.svelte';
  import StatusDot from '../patterns/atoms/StatusDot.svelte';
  import SegmentedControl from '../patterns/molecules/SegmentedControl.svelte';
  import { celebrate, greeting, waitingLine } from '../utils/delight';

  let popOpen = $state(false);
  let email = $state('');
  let nope = $state(false);
  let done = $state(false);
  let view = $state<'day' | 'week' | 'month'>('week');
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
      'Oops! Something went wrong!',
      "Couldn't save: the server didn't answer. Try again.",
    ],
  ];

  const people = [
    { name: 'Ada Example', role: 'Editor' },
    { name: 'Grace Example', role: 'Owner' },
    { name: 'Linus Example', role: 'Viewer' },
  ];

  const desktop: IntroItem[] = [
    {
      term: 'Plain window controls',
      text: 'Minimise, zoom and, set apart by a hairline, close: readable glyph buttons at the end of the title bar, each with a 32px target and a tooltip. Close turns red only when you point at it.',
    },
    {
      term: 'The candy tray',
      text: 'The dock is a glass tray. Icons lift and show their name when you point; opening squishes once. No magnifying wave: it would move your target while you aim.',
    },
    {
      term: 'The top shelf',
      text: 'A slim floating shelf instead of a full-width bar: app menus on the left, status and a day pill on the right that greets you and tells the time.',
    },
    {
      term: 'The candy jar',
      text: 'All apps in one jar, search first. Icons pop in one after another, so the grid feels poured, not dumped.',
    },
  ];
</script>

<DocPage
  eyebrow="Design language"
  title="Candy, disciplined."
  pager={introPager('Design language')}
  lead="Ten rules behind the look. They take Dieter Rams’ discipline, as little design as possible, and add one permission: a little delight."
>
  <Section title="Colour and shape">
    <p>Colour is spent like sugar, and shape tells you what a thing does before you read it.</p>
    <IntroRule
      n={1}
      title="Calm first, candy second"
      text="About 90 % of a screen is neutral ground and text, about 10 % colour. Colour marks the main action, the current selection, status and success. When everything is colourful, nothing stands out."
    >
      <div class="pair">
        <IntroDemo
          align="stretch"
          caption="One selection, one main action: the eye knows where to land."
        >
          {#each people as p, i (p.name)}
            {#if i === 1}
              <Layer level="selected" padding="sm" direction="horizontal" gap="sm" align="center">
                <Avatar name={p.name} size={28} /><strong>{p.name}</strong><Spacer /><span
                  class="muted">{p.role}</span
                >
              </Layer>
            {:else}
              <Row gap="sm" class="person">
                <Avatar name={p.name} size={28} /><strong>{p.name}</strong><Spacer /><span
                  class="muted">{p.role}</span
                >
              </Row>
            {/if}
          {/each}
          <Row><Spacer /><Button variant="primary" label="Invite" /></Row>
        </IntroDemo>
        <IntroDemo align="stretch" caption="Three loud colours and no selection: nowhere to land.">
          {#each people as p, i (p.name)}
            <div class="loud" style:--c="var(--color-{['pink', 'yellow', 'blue'][i]})">
              <strong>{p.name}</strong>
            </div>
          {/each}
        </IntroDemo>
      </div>
    </IntroRule>
    <IntroRule
      n={2}
      title="Shape says what it does"
      text="A pill is something you act on. A rounded rectangle holds things. A circle is someone, or the state of something. Once learned, people read the interface before the words."
    >
      <div class="shapes">
        <IntroDemo caption="Pill: act. Buttons, chips, toggles, tags.">
          <Button variant="primary" label="Save" /><span class="chip">Design</span>
        </IntroDemo>
        <IntroDemo caption="Rounded: hold. Cards, panels, windows, icons.">
          <span class="shape-card"></span>
        </IntroDemo>
        <IntroDemo caption="Circle: identity. Avatars, presence, status.">
          <Avatar name="Ada Example" size={36} /><StatusDot tone="ok" label="Online" />
        </IntroDemo>
      </div>
    </IntroRule>
  </Section>

  <Section title="Light and glass">
    <p>One lamp lights every surface, and glass appears only where something floats.</p>
    <IntroRule
      n={3}
      title="One light, from above"
      text="Every surface is lit by the same imagined lamp: a thin highlight on the top edge, a soft shadow below. Things that are on or chosen add a little light of their own, in the tint."
    >
      <IntroDemo caption="A shadow above would put the lamp under the table.">
        <div class="lit good">Lit from above</div>
        <div class="lit bad">Lit from below</div>
      </IntroDemo>
    </IntroRule>
    <IntroRule
      n={4}
      title="Glass only where it floats"
      text="Glass is gentle frost for what floats, and what floats is sticky: the front layer, overlays, panels over a photo. Panels are solid tiles, used sparingly; most groups sit on the ground. Off a front layer, a `glass` button becomes a soft-touch key."
    >
      <div class="pair">
        <IntroDemo
          align="stretch"
          caption="A glass bar floats over the ground; the group below needs no box."
        >
          <Layer level="front" direction="horizontal" gap="sm">
            <Button size="sm" variant="ghost" label="All" aria-pressed="true" />
            <Button size="sm" variant="ghost" label="Mine" />
          </Layer>
          <div class="ground-group">
            <strong>This week</strong>
            <span class="muted">Three releases, one review.</span>
          </div>
        </IntroDemo>
        <IntroDemo align="stretch" caption="Glass in glass in glass turns to fog.">
          <Card surface="frosted" padding="sm">
            <Card surface="frosted" padding="sm">
              <Card surface="frosted" padding="sm"><span class="fog">Fog</span></Card>
            </Card>
          </Card>
        </IntroDemo>
      </div>
    </IntroRule>
  </Section>

  <Section title="Type and motion">
    <p>Soft shapes with sharp type; movement that explains rather than decorates.</p>
    <IntroRule
      n={5}
      title="Soft but crisp"
      text="Generous corners and hairlines keep things friendly; sharp type keeps them serious. Headings are tight, labels semibold, figures tabular, so columns of numbers line up."
    >
      <IntroDemo>
        <div class="figures">
          <span class="muted">Tabular</span>
          <span class="num tab">€ 1,111.10</span>
          <span class="num tab">€ 8,808.88</span>
        </div>
        <div class="figures">
          <span class="muted">Proportional</span>
          <span class="num">€ 1,111.10</span>
          <span class="num">€ 8,808.88</span>
        </div>
      </IntroDemo>
    </IntroRule>
    <IntroRule
      n={6}
      title="Motion with intent"
      text="Every animation answers a question: where did it come from, where did it go, did it work? Things move like thick water. A selection flows to its new place, stretches, thins and lands with a soft wobble. A press gives by layer, and the layers never move each other: what lies on the ground or on the panels sinks and bobs like something floating, the neighbours less and the far side barely, and a drag sways it along; glass squeezes alone. Big things never travel or bounce, and with reduced motion, movement becomes a quick fade."
    >
      <div class="demos demos--two">
        <IntroDemo caption="Pick another view: the mark flows there.">
          <SegmentedControl
            label="View"
            bind:value={view}
            options={[
              { value: 'day', label: 'Day' },
              { value: 'week', label: 'Week' },
              { value: 'month', label: 'Month' },
            ]}
          />
        </IntroDemo>
        <IntroDemo caption="Press and hold: it squishes like a gummy. Hover: light sweeps once.">
          <Button variant="primary" label="Press me" />
        </IntroDemo>
        <IntroDemo caption="Menus grow out of what opened them.">
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
        </IntroDemo>
        <IntroDemo caption="Join without an @: a small head-shake, never for a system error.">
          <form class="nope-form" class:nope onsubmit={check} onanimationend={() => (nope = false)}>
            <input bind:value={email} placeholder="you@example.com" aria-label="Email" />
            <Button type="submit" label="Join" />
          </form>
        </IntroDemo>
      </div>
      <div class="durations">
        <Row>
          <strong>Four durations</strong><Spacer /><Button
            size="sm"
            variant="soft"
            icon="play"
            label="Play"
            onclick={() => {
              playing = false;
              requestAnimationFrame(() => (playing = true));
            }}
          />
        </Row>
        {#each durations as d (d.name)}
          <div class="dur-row">
            <code class="dur">{d.name}</code>
            <div class="track">
              <span class="runner" class:go={playing} style:--ms="{d.ms}ms"></span>
            </div>
            <span class="muted">{d.ms} ms · {d.use}</span>
          </div>
        {/each}
      </div>
    </IntroRule>
  </Section>

  <Section title="Delight and words">
    <p>Joy shows up in the gaps, and every word is part of the interface.</p>
    <IntroRule
      n={7}
      title="Delight lives in the gaps"
      text="Joy appears at the end of a task, in empty states and idle moments: never in the way of work, never in an error, never twice for one action. That keeps it charming for adults."
    >
      <div class="demos">
        <IntroDemo caption="Finish a task: a small burst says well done, once.">
          <Button
            variant={done ? 'success' : 'primary'}
            icon={done ? 'check' : undefined}
            label={done ? 'Done' : 'Mark as done'}
            onclick={finish}
          />
        </IntroDemo>
        <IntroDemo caption="A greeting that knows the time.">
          <div class="greet-box">
            <span class="greet">{hello.text}</span>
            <span class="muted">{hello.wink}</span>
          </div>
        </IntroDemo>
        <IntroDemo caption="Long waits rotate their words, so the screen never looks frozen.">
          <span class="greet small">{waitingLine(now.getTime())}</span>
        </IntroDemo>
      </div>
    </IntroRule>
    <IntroRule
      n={8}
      title="Words are interface"
      text="Short, warm, human. A wink is allowed where nothing is at stake: empty, success, idle. Errors stay plain: what happened, what to do. Every text is a prop, so teams can choose their own voice."
    >
      <table class="voice">
        <thead><tr><th>Moment</th><th>Not like this</th><th>Like this</th></tr></thead>
        <tbody>
          {#each voice as [moment, bad, good] (moment)}
            <tr><td>{moment}</td><td class="bad-text">{bad}</td><td>{good}</td></tr>
          {/each}
        </tbody>
      </table>
    </IntroRule>
  </Section>

  <Section title="Access and restraint">
    <p>
      Nobody falls in love with something they cannot use, or with something that says too much.
    </p>
    <IntroRule
      n={9}
      title="Accessible is lovable"
      text="Text contrast of at least 4.5:1, a visible focus ring on everything interactive, targets of 32px or more (44px for touch), colour never the only signal, reduced motion and transparency respected."
    >
      <IntroDemo
        caption="Press Tab to walk the buttons. A failure says it with an icon and a word, not only red."
      >
        <Button label="One" /><Button label="Two" /><Button variant="primary" label="Three" />
        <Badge tone="danger" icon="alert" label="Failed" />
      </IntroDemo>
    </IntroRule>
    <IntroRule
      n={10}
      title="As little design as possible"
      text="The whole system is a short list. If something seems to need a new value, it usually needs an existing token."
    >
      <div class="counts">
        {#each [['1', 'tint'], ['4', 'layers'], ['3', 'shapes'], ['7', 'spacing steps'], ['4', 'durations'], ['10', 'rules']] as [n, what] (what)}
          <div class="count"><span class="big">{n}</span><span class="muted">{what}</span></div>
        {/each}
      </div>
    </IntroRule>
  </Section>

  <Section title="The desktop concept">
    <p>
      Desktop components keep the habits people rely on, such as windows, a launcher and a menu, but
      get a look of their own. See them together in
      <strong>Pages / Desktop / Desktop OS</strong>.
    </p>
    <IntroList items={desktop} />
  </Section>
</DocPage>

<style>
  .muted {
    color: var(--text-3);
    font-size: var(--fs-sm);
  }
  .pair,
  .shapes,
  .demos {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr));
    gap: var(--space-4);
  }
  .shapes,
  .demos {
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 13rem), 1fr));
  }
  .demos--two {
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 18rem), 1fr));
  }
  .pair :global(.frame),
  .shapes :global(.frame),
  .demos :global(.frame) {
    min-height: 8rem;
    gap: var(--space-3);
  }
  .pair :global(.person) {
    padding: 0 var(--space-2);
  }
  .loud {
    padding: var(--space-3);
    border-radius: var(--radius-sm);
    background: var(--c);
    color: var(--ink-surface);
    box-shadow: var(--panel-shadow);
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
    background: var(--layer-panel-bg);
    border: 1px solid var(--layer-panel-border);
    box-shadow: var(--layer-panel-shadow);
  }
  .lit {
    display: grid;
    place-items: center;
    width: 11rem;
    height: 6rem;
    border-radius: var(--radius-card);
    background: var(--layer-panel-bg);
    font-weight: var(--fw-semibold);
  }
  .lit.good {
    box-shadow:
      inset 0 1px 0 var(--pill-light),
      0 12px 28px -8px color-mix(in srgb, var(--text) 22%, transparent);
  }
  .lit.bad {
    box-shadow:
      inset 0 -1px 0 var(--pill-light),
      0 -12px 28px -8px color-mix(in srgb, var(--text) 22%, transparent);
  }
  .ground-group {
    display: grid;
    gap: var(--space-1);
    padding: 0 var(--space-2);
  }
  .fog {
    display: block;
    text-align: center;
    color: var(--text-3);
  }
  .figures {
    display: grid;
    gap: var(--space-1);
    padding: 0 var(--space-6);
  }
  .num {
    font-size: var(--fs-2xl);
    font-weight: var(--fw-semibold);
    font-variant-numeric: proportional-nums;
  }
  .num.tab {
    font-variant-numeric: tabular-nums;
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
    gap: var(--space-2);
    width: 100%;
  }
  .nope-form.nope {
    animation: bb-nope 360ms var(--ease-out);
  }
  .nope-form input {
    flex: 1 1 6rem;
    height: var(--control-md);
    min-width: 0;
    padding: 0 var(--space-3);
    border: 1px solid var(--border-strong);
    border-radius: var(--radius-md);
    background: var(--input-bg);
    color: var(--text);
  }
  .nope input {
    border-color: var(--danger);
  }
  .durations {
    display: grid;
    gap: var(--space-3);
    margin-top: var(--space-6);
  }
  .dur-row {
    display: grid;
    grid-template-columns: 9rem minmax(6rem, 1fr) 15rem;
    gap: var(--space-4);
    align-items: center;
  }
  .dur {
    font-family: var(--font-mono);
    font-size: var(--fs-xs);
  }
  .track {
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
  .greet-box {
    display: grid;
    justify-items: center;
    gap: var(--space-1);
    text-align: center;
  }
  .greet {
    font-family: var(--font-serif);
    font-size: var(--fs-3xl);
    letter-spacing: -0.01em;
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
    padding: var(--space-3) var(--space-4) var(--space-3) 0;
    text-align: left;
    border-bottom: 1px solid var(--border);
  }
  .voice th {
    color: var(--text-3);
    font-weight: var(--fw-semibold);
    font-size: var(--fs-2xs);
    text-transform: uppercase;
    letter-spacing: 0.18em;
    border-bottom-color: var(--border-strong);
  }
  .bad-text {
    color: var(--text-3);
    text-decoration: line-through;
    text-decoration-color: color-mix(in srgb, var(--danger) 60%, transparent);
  }
  .counts {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(6.5rem, 1fr));
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
  }
  .count {
    display: grid;
    justify-items: start;
    padding: var(--space-4) 0;
  }
  .big {
    font-family: var(--font-serif);
    font-size: var(--fs-display);
    line-height: 1.1;
    color: var(--accent-ink);
    font-variant-numeric: tabular-nums;
  }
  @media (max-width: 760px) {
    .dur-row {
      grid-template-columns: 8rem minmax(0, 1fr);
    }
    .dur-row .muted {
      grid-column: 1 / -1;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .runner.go,
    .pop,
    .nope-form.nope {
      animation: none;
    }
  }
</style>
