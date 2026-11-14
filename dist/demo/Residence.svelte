<script lang="ts">
  /**
   * Example page: the landing page of one house that is for sale — a single, very expensive
   * thing, so the page gets out of its way. Nearly everything lies on the ground: large serif
   * type, quiet facts, hairlines and the architect's drawings in place of photos. There is one
   * piece of glass, the round drop at the top right; it floats, so it is the only thing that
   * stays while the page scrolls, and it pours down into the page's sections when pointed at.
   * Storybook only.
   */
  import { tick } from 'svelte';
  import Button from '../patterns/atoms/Button.svelte';
  import Input from '../patterns/atoms/Input.svelte';
  import { changeCue } from '../patterns/atoms/changed';
  import { reducedMotion } from '../utils/liquid';
  import DesignNotes, { type DesignNote } from './DesignNotes.svelte';
  import ResidenceDrawing from './ResidenceDrawing.svelte';
  import ResidenceMenu from './ResidenceMenu.svelte';
  import {
    drawings,
    facts,
    house,
    measure,
    residence,
    sections,
    site,
    viewing,
    type Units,
  } from './mock-residence';

  interface Props {
    /** The glass drop's menu, poured out or closed. */
    menu?: 'closed' | 'open';
    units?: Units;
    /** The viewing request: not asked yet, the form open in place, or sent. */
    request?: 'idle' | 'form' | 'sent';
  }

  let { menu = 'closed', units: startUnits = 'metric', request = 'idle' }: Props = $props();

  // svelte-ignore state_referenced_locally
  let open = $state(menu === 'open');
  // svelte-ignore state_referenced_locally
  let units = $state<Units>(startUnits);
  // svelte-ignore state_referenced_locally
  let step = $state(request);
  let name = $state('');
  let email = $state('');
  let emailInvalid = $state(false);
  let emailField = $state<HTMLInputElement | undefined>();
  let invite = $state<HTMLButtonElement | undefined>();
  let form = $state<HTMLFormElement | undefined>();

  const length = $derived(units === 'metric' ? '42.0 m' : '137′ 10″');
  const ceiling = $derived.by(() => {
    const m = measure(
      facts.find((f) => f.id === 'ceiling')!,
      units,
    );
    return m.unit ? `${m.value} ${m.unit}` : m.value;
  });

  function go(id: string) {
    const target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block: 'start' });
    // Keyboard users continue from the section they asked for.
    target.focus({ preventScroll: true });
  }

  function navigate(event: MouseEvent, id: string) {
    event.preventDefault();
    go(id);
  }

  async function openForm() {
    step = 'form';
    await tick();
    // The form takes the invitation's place; focus goes where the eye goes.
    form?.querySelector('input')?.focus();
  }

  function send(event: SubmitEvent) {
    event.preventDefault();
    emailInvalid = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (emailInvalid) return emailField?.focus();
    step = 'sent';
  }

  async function cancel() {
    step = 'idle';
    await tick();
    invite?.focus();
  }

  const notes: DesignNote[] = [
    {
      principle: 'function',
      title: 'One piece of glass, because one thing floats',
      body: 'Glass is for what floats, and what floats stays put while the page moves. Only the round drop at the top right does, so it is the only glass; the bar, the facts and the footer lie on the ground.',
      target: '[data-note="drop"]',
    },
    {
      principle: 'locality',
      title: 'The menu pours out of the drop you pointed at',
      body: 'Point at the drop and it runs down into the page’s sections; leave and it drains back. Nothing opens somewhere else on the screen, and the top never moves, so the eye stays where it was.',
      target: '[data-note="drop"]',
    },
    {
      principle: 'cues',
      title: 'Units change where you read them',
      body: 'Switch between square metres and square feet and every converted figure glows once, in place — the drawings’ dimensions follow along.',
      target: '[data-note="facts"]',
    },
    {
      principle: 'friendly',
      title: 'Drawings instead of photos',
      body: 'The house is shown the way its architect would: elevation, plan, section and site in fine lines. Calm, honest about scale, and quiet enough to let the large type speak.',
      target: '[data-note="drawings"]',
    },
    {
      principle: 'locality',
      title: 'The viewing is arranged where it is asked for',
      body: 'The only call to action is a quiet link. Pressing it turns that spot into a short form, and the thank-you appears in the same place.',
      target: '[data-note="viewing"]',
    },
  ];
</script>

<div class="residence">
  <header class="bar">
    <a class="wordmark" href="#residence-top" onclick={(e) => navigate(e, 'residence-top')}
      >{residence.name}</a
    >
    <nav aria-label="Sections">
      <ul>
        {#each sections as section (section.id)}
          <li>
            <a href="#{section.id}" onclick={(e) => navigate(e, section.id)}>{section.label}</a>
          </li>
        {/each}
      </ul>
    </nav>
  </header>

  <!-- Height zero, sticky, pulled up into the bar: the drop floats over the page from the top
       right down, and comes after the bar's links in the tab order. -->
  <div class="float">
    <div class="float__drop" data-note="drop">
      <ResidenceMenu {sections} bind:open onnavigate={go} label="Sections of the page" />
    </div>
  </div>

  <main>
    <section class="hero" id="residence-top" tabindex="-1" aria-labelledby="residence-name">
      <p class="eyebrow">{residence.eyebrow}</p>
      <h1 id="residence-name">{residence.name}</h1>
      <p class="lede">{residence.line}</p>
      <figure class="elevation">
        <ResidenceDrawing
          kind="elevation"
          {length}
          label="South elevation: a long, low house under one thin roof slab, a stone wall at the west end and glass along the rest, pines beside and behind it."
        />
        <figcaption>
          <span>{drawings.elevation.title}</span><span>{drawings.elevation.scale}</span>
        </figcaption>
      </figure>
    </section>

    <section class="house" id="residence-house" tabindex="-1" aria-labelledby="residence-house-h">
      <div class="house__text">
        <p class="eyebrow">The house</p>
        <h2 id="residence-house-h">{house.heading}</h2>
        {#each house.body as paragraph, i (i)}<p>{paragraph}</p>{/each}
      </div>
      <div class="facts" data-note="facts">
        <div class="facts__head">
          <span class="eyebrow">In figures</span>
          <div class="units" role="group" aria-label="Units">
            <button
              type="button"
              aria-pressed={units === 'metric'}
              onclick={() => (units = 'metric')}>m²</button
            >
            <span aria-hidden="true">/</span>
            <button
              type="button"
              aria-pressed={units === 'imperial'}
              onclick={() => (units = 'imperial')}>sq ft</button
            >
          </div>
        </div>
        <dl>
          {#each facts as fact (fact.id)}
            {@const m = measure(fact, units)}
            <div class="fact">
              <dt>{fact.label}</dt>
              <dd>
                <span class="fact__value" use:changeCue={m.value}
                  >{m.value}{#if m.unit}<small>{m.unit}</small>{/if}</span
                >
                {#if fact.note}<span class="fact__note">{fact.note}</span>{/if}
              </dd>
            </div>
          {/each}
          <div class="fact">
            <dt>Architect</dt>
            <dd><span class="fact__value fact__value--name">{residence.architect}</span></dd>
          </div>
          <div class="fact">
            <dt>Price</dt>
            <dd><span class="fact__value fact__value--name">{residence.price}</span></dd>
          </div>
        </dl>
      </div>
    </section>

    <section
      class="drawings"
      id="residence-drawings"
      tabindex="-1"
      aria-labelledby="residence-drawings-h"
      data-note="drawings"
    >
      <p class="eyebrow">Drawings</p>
      <h2 id="residence-drawings-h">{drawings.heading}</h2>
      <div class="drawings__grid">
        <figure class="plan">
          <ResidenceDrawing
            kind="plan"
            label="Ground-floor plan: a U of three wings around a courtyard of pines, open to the east. Living, kitchen and the main bedroom along the south glass, guest rooms and a study to the north, a terrace and a long pool on the lake side."
          />
          <figcaption>
            <span>{drawings.plan.title}</span><span>{drawings.plan.scale}</span>
          </figcaption>
        </figure>
        <figure class="section">
          <ResidenceDrawing
            kind="section"
            {ceiling}
            label="Section A–A from north to south: the north wing set into the slope, the courtyard with its pine, the living room under a roof that reaches past the glass. The summer sun stops at the terrace; the winter sun reaches the back wall."
          />
          <figcaption>
            <span>{drawings.section.title}</span><span>{drawings.section.scale}</span>
          </figcaption>
        </figure>
      </div>
    </section>

    <section class="site" id="residence-site" tabindex="-1" aria-labelledby="residence-site-h">
      <div class="site__text">
        <p class="eyebrow">The site</p>
        <h2 id="residence-site-h">{site.heading}</h2>
        <ul>
          {#each site.lines as line, i (i)}<li>{line}</li>{/each}
        </ul>
      </div>
      <figure class="site__plan">
        <ResidenceDrawing
          kind="site"
          label="Site plan: contour lines falling to the lake shore, a pine wood to the north-west, the house in the middle of the plot, a stone path down to a jetty."
        />
        <figcaption><span>{site.caption}</span></figcaption>
      </figure>
    </section>

    <section
      class="viewing"
      id="residence-viewing"
      tabindex="-1"
      aria-labelledby="residence-viewing-h"
      data-note="viewing"
    >
      <p class="eyebrow">By appointment</p>
      <h2 id="residence-viewing-h">{viewing.heading}</h2>
      <p class="viewing__body">{viewing.body}</p>
      <div class="viewing__action" aria-live="polite">
        {#if step === 'idle'}
          <button type="button" class="invite" bind:this={invite} onclick={openForm}>
            Request a date <span aria-hidden="true">→</span>
          </button>
        {:else if step === 'form'}
          <form class="request" bind:this={form} onsubmit={send} novalidate>
            <label>
              <span>Name</span>
              <Input bind:value={name} autocomplete="name" placeholder="Your name" />
            </label>
            <label>
              <span>Email</span>
              <Input
                type="email"
                bind:value={email}
                bind:element={emailField}
                autocomplete="email"
                placeholder="name@example.com"
                invalid={emailInvalid}
                required
              />
            </label>
            <div class="request__actions">
              <Button type="submit" variant="soft" label="Send request" />
              <Button variant="plain" label="Cancel" onclick={cancel} />
            </div>
            {#if emailInvalid}<p class="request__error">
                Please enter an email address we can write to.
              </p>{/if}
          </form>
        {:else}
          <p class="thanks" use:changeCue={step}>{viewing.thanks}</p>
        {/if}
      </div>
    </section>
  </main>

  <footer class="foot">
    <span class="wordmark wordmark--small">{residence.name}</span>
    <span>Offered privately by the owners</span>
    <a href="mailto:{residence.email}">{residence.email}</a>
    <span>© 2026</span>
  </footer>
</div>

<DesignNotes title="Residence" {notes} corner="bottom-left" />

<style>
  .residence {
    --edge: clamp(1.25rem, 5vw, 4.5rem);
    --hairline: 1px solid var(--border-strong);
    --bar: 68px;
    position: relative;
    min-height: 100dvh;
    color: var(--text);
  }

  /* The drop: sticky at the top right, centred on the bar while the page is at the top. */
  .float {
    --drop-top: calc((var(--bar) - 52px) / 2);
    position: sticky;
    top: var(--drop-top);
    z-index: var(--z-front);
    height: 0;
    margin-top: calc(var(--drop-top) - var(--bar));
  }
  .float__drop {
    position: absolute;
    top: 0;
    /* The drop's box keeps 10px either side for the bead; its circle sits on the edge. */
    right: calc(var(--edge) - 10px - 4px);
    pointer-events: none;
  }

  /* The tint appears like the brass on a fine drawing: in the small labels, a rule, a line. */
  .eyebrow {
    margin: 0;
    color: var(--accent-ink);
    font-size: var(--fs-2xs);
    font-weight: var(--fw-medium);
    letter-spacing: 0.24em;
    text-transform: uppercase;
  }

  /* ── The bar: on the ground, one hairline under it ───────────────────────── */
  .bar {
    display: flex;
    align-items: center;
    gap: var(--space-8);
    height: var(--bar);
    margin-inline: var(--edge);
    /* room for the drop at the right */
    padding-inline-end: calc(52px + var(--space-6));
    border-bottom: var(--hairline);
  }
  .wordmark {
    color: var(--text);
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
    letter-spacing: 0.34em;
    text-decoration: none;
    text-transform: uppercase;
  }
  .wordmark--small {
    font-size: var(--fs-2xs);
  }
  .bar nav {
    margin-inline-start: auto;
  }
  .bar ul {
    display: flex;
    gap: var(--space-8);
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .bar nav a,
  .foot a {
    color: var(--text-2);
    font-size: var(--fs-sm);
    text-decoration: none;
    transition: color var(--motion-quick) var(--ease-out);
  }
  .bar nav a:hover,
  .foot a:hover {
    color: var(--text);
  }
  .bar a:focus-visible,
  .foot a:focus-visible,
  .units button:focus-visible,
  .invite:focus-visible {
    outline: var(--focus-ring);
    outline-offset: 4px;
    border-radius: var(--radius-xs);
  }

  main {
    display: flex;
    flex-direction: column;
    padding-inline: var(--edge);
  }
  main > section {
    scroll-margin-top: var(--space-8);
    outline: none;
  }

  h1,
  h2 {
    margin: 0;
    font-family: var(--font-serif);
    font-weight: var(--fw-regular);
    letter-spacing: -0.015em;
    text-wrap: balance;
  }

  /* ── Hero ────────────────────────────────────────────────────────────────── */
  .hero {
    padding-block: clamp(3rem, 10vh, 7rem) clamp(3rem, 8vh, 6rem);
  }
  .hero .eyebrow::before {
    content: '';
    display: inline-block;
    width: 2.5rem;
    height: 1px;
    margin-inline-end: var(--space-3);
    vertical-align: middle;
    background: var(--accent);
  }
  .hero h1 {
    margin-block: var(--space-5) var(--space-6);
    font-size: clamp(4.5rem, 13vw, 11rem);
    line-height: 0.9;
    letter-spacing: -0.03em;
  }
  .lede {
    max-width: 34ch;
    margin: 0;
    color: var(--text-2);
    font-family: var(--font-serif);
    font-size: clamp(1.25rem, 2.1vw, 1.7rem);
    line-height: 1.4;
  }
  .elevation {
    margin: clamp(2.5rem, 7vh, 5rem) 0 0;
  }

  figure {
    margin: 0;
  }
  figcaption {
    display: flex;
    justify-content: space-between;
    gap: var(--space-4);
    margin-top: var(--space-4);
    padding-top: var(--space-3);
    border-top: var(--hairline);
    color: var(--text-3);
    font-size: var(--fs-2xs);
    letter-spacing: 0.2em;
    text-transform: uppercase;
  }

  /* ── The house ───────────────────────────────────────────────────────────── */
  .house,
  .site {
    display: grid;
    grid-template-columns: minmax(0, 5fr) minmax(0, 6fr);
    gap: clamp(2.5rem, 7vw, 8rem);
    padding-block: clamp(4rem, 12vh, 8rem);
    border-top: var(--hairline);
  }
  .house h2,
  .drawings h2,
  .site h2,
  .viewing h2 {
    margin-block: var(--space-4) var(--space-6);
    font-size: clamp(1.9rem, 3.4vw, 3rem);
    line-height: 1.12;
  }
  .house__text p:not(.eyebrow),
  .site li,
  .viewing__body {
    max-width: 56ch;
    margin: 0 0 var(--space-4);
    color: var(--text-2);
    font-size: var(--fs-lg);
    line-height: var(--leading-body);
  }

  .facts__head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    padding-bottom: var(--space-3);
    border-bottom: var(--hairline);
  }
  .units {
    display: flex;
    align-items: baseline;
    gap: var(--space-2);
    color: var(--text-3);
    font-size: var(--fs-sm);
  }
  .units button {
    padding: var(--space-1) var(--space-1);
    border: 0;
    background: none;
    color: var(--text-3);
    font: inherit;
    cursor: pointer;
    transition: color var(--motion-quick) var(--ease-out);
  }
  .units button:hover {
    color: var(--text);
  }
  .units button[aria-pressed='true'] {
    color: var(--text);
    text-decoration: underline;
    text-decoration-color: var(--accent);
    text-decoration-thickness: 1px;
    text-underline-offset: 5px;
  }
  dl {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    column-gap: clamp(1.5rem, 4vw, 4rem);
    margin: 0;
  }
  .fact {
    padding-block: var(--space-5) var(--space-6);
    border-bottom: var(--hairline);
  }
  dt {
    color: var(--text-3);
    font-size: var(--fs-2xs);
    letter-spacing: 0.2em;
    text-transform: uppercase;
  }
  dd {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    margin: var(--space-3) 0 0;
  }
  .fact__value {
    align-self: flex-start;
    margin-inline: -0.2em;
    padding-inline: 0.2em;
    border-radius: var(--radius-xs);
    font-family: var(--font-serif);
    font-size: clamp(2rem, 3.4vw, 2.9rem);
    font-variant-numeric: lining-nums;
    line-height: 1.05;
    letter-spacing: -0.01em;
  }
  .fact__value small {
    margin-inline-start: 0.3em;
    color: var(--text-3);
    font-family: var(--font-sans);
    font-size: var(--fs-sm);
    letter-spacing: 0.04em;
  }
  .fact__value--name {
    font-size: clamp(1.4rem, 2.2vw, 1.8rem);
    line-height: 1.3;
  }
  .fact__note {
    color: var(--text-3);
    font-size: var(--fs-sm);
  }

  /* ── Drawings ────────────────────────────────────────────────────────────── */
  .drawings {
    padding-block: clamp(4rem, 12vh, 8rem);
    border-top: var(--hairline);
  }
  .drawings h2 {
    max-width: 22ch;
  }
  .drawings__grid {
    display: grid;
    gap: clamp(4rem, 12vh, 8rem);
    margin-top: clamp(3rem, 8vh, 5rem);
  }
  .plan {
    width: min(100%, 64rem);
  }

  /* ── Site ────────────────────────────────────────────────────────────────── */
  .site__text ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .site li {
    padding-block: var(--space-3);
    margin: 0;
    border-bottom: var(--hairline);
  }
  .site li:first-child {
    border-top: var(--hairline);
  }

  /* ── Viewing ─────────────────────────────────────────────────────────────── */
  .viewing {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-block: clamp(5rem, 16vh, 10rem);
    border-top: var(--hairline);
    text-align: center;
  }
  .viewing h2 {
    font-size: clamp(2.4rem, 5vw, 4.25rem);
  }
  .viewing__action {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: var(--space-4);
  }
  .invite {
    display: inline-flex;
    gap: var(--space-3);
    align-items: baseline;
    padding: var(--space-2) 0;
    border: 0;
    border-bottom: 1px solid var(--text-3);
    background: none;
    color: var(--text);
    font-family: var(--font-serif);
    font-size: var(--fs-3xl);
    cursor: pointer;
    transition:
      border-color var(--motion-base) var(--ease-out),
      gap var(--motion-base) var(--ease-out);
  }
  .invite:hover {
    gap: var(--space-4);
    border-bottom-color: var(--accent);
  }
  .request {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--space-4);
    width: min(100%, 34rem);
    text-align: start;
  }
  .request label {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }
  .request label > span {
    color: var(--text-3);
    font-size: var(--fs-2xs);
    letter-spacing: 0.2em;
    text-transform: uppercase;
  }
  .request__actions {
    display: flex;
    grid-column: 1 / -1;
    gap: var(--space-2);
    justify-content: flex-start;
  }
  .request__error {
    grid-column: 1 / -1;
    margin: 0;
    color: var(--danger);
    font-size: var(--fs-sm);
  }
  .thanks {
    max-width: 40ch;
    margin: 0;
    padding: var(--space-2) var(--space-4);
    border-radius: var(--radius-md);
    color: var(--text);
    font-family: var(--font-serif);
    font-size: var(--fs-2xl);
  }

  /* ── Footer: as slim as the bar ──────────────────────────────────────────── */
  .foot {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-2) var(--space-8);
    margin-inline: var(--edge);
    padding-block: var(--space-5);
    border-top: var(--hairline);
    color: var(--text-3);
    font-size: var(--fs-xs);
  }
  .foot .wordmark {
    margin-inline-end: auto;
  }
  .foot a {
    font-size: var(--fs-xs);
  }

  @media (max-width: 960px) {
    .house,
    .site {
      grid-template-columns: minmax(0, 1fr);
    }
  }
  @media (max-width: 640px) {
    .bar nav {
      display: none;
    }
    .request {
      grid-template-columns: minmax(0, 1fr);
    }
  }
</style>
