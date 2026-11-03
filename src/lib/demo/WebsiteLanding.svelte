<script lang="ts">
  /**
   * Example page: the landing website of a team app, built only from library parts — NavBar
   * (thick glass), Hero, LogoCloud, FeatureGrid, PricingTable, testimonials, Faq, CallToAction
   * and SiteFooter on one wide Page. The calls to action answer where they were pressed: the
   * sign-up opens in place of the button, a plan's button says what happened (Storybook only).
   */
  import { tick } from 'svelte';
  import Avatar from '../patterns/atoms/Avatar.svelte';
  import Button from '../patterns/atoms/Button.svelte';
  import Icon from '../patterns/atoms/Icon.svelte';
  import Image from '../patterns/atoms/Image.svelte';
  import Stars from '../patterns/atoms/Stars.svelte';
  import { flashChanged } from '../patterns/atoms/changed';
  import LogoCloud from '../patterns/molecules/LogoCloud.svelte';
  import NewsletterSignup from '../patterns/molecules/NewsletterSignup.svelte';
  import Popover from '../patterns/molecules/Popover.svelte';
  import Testimonial from '../patterns/molecules/Testimonial.svelte';
  import CallToAction from '../patterns/organisms/CallToAction.svelte';
  import Faq from '../patterns/organisms/Faq.svelte';
  import FeatureGrid from '../patterns/organisms/FeatureGrid.svelte';
  import Hero from '../patterns/organisms/Hero.svelte';
  import NavBar from '../patterns/organisms/NavBar.svelte';
  import PricingTable from '../patterns/organisms/PricingTable.svelte';
  import SiteFooter from '../patterns/organisms/SiteFooter.svelte';
  import Layer from '../patterns/layout/Layer.svelte';
  import Row from '../patterns/layout/Row.svelte';
  import Section from '../patterns/layout/Section.svelte';
  import Page from '../patterns/templates/Page.svelte';
  import DesignNotes, { type DesignNote } from './DesignNotes.svelte';
  import {
    faqs,
    features,
    footerColumns,
    later,
    legalLinks,
    logos,
    photo,
    plans as allPlans,
    siteLinks,
    socialLinks,
    testimonials,
  } from './mock-shop';

  const uid = $props.id();
  let links = $state(siteLinks);
  let plans = $state(allPlans.map((p) => ({ ...p })));
  /** Which call-to-action has turned into its sign-up form. */
  let signingUp = $state<Record<'hero' | 'cta', boolean>>({ hero: false, cta: false });
  let root = $state<HTMLElement>();
  let width = $state(1440);

  const sections = siteLinks.map((l) => l.href.slice(1));

  // Scroll-spy: the nav link of the section in view is the active one, so the bar always says
  // where you are.
  $effect(() => {
    if (!root || typeof IntersectionObserver === 'undefined') return;
    const seen: Record<string, number> = {};
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) seen[e.target.id] = e.isIntersecting ? e.intersectionRatio : 0;
        let best = '';
        let ratio = 0;
        for (const id of sections) {
          const r = seen[id] ?? 0;
          if (r > ratio) [best, ratio] = [id, r];
        }
        if (best) activate(`#${best}`);
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1], rootMargin: '-80px 0px -35% 0px' },
    );
    for (const id of sections) {
      const el = root.querySelector(`#${id}`);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  });

  /** Marks one link active; a new array only when it really changes (the bar reacts to it). */
  function activate(href: string) {
    if (links.find((l) => l.active)?.href === href) return;
    links = links.map((l) => ({ ...l, active: l.href === href }));
  }

  function navigate(href: string, event: MouseEvent) {
    event.preventDefault();
    const el = root?.querySelector<HTMLElement>(href);
    if (!el) return;
    activate(href);
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  async function startSignup(where: 'hero' | 'cta') {
    signingUp[where] = true;
    await tick();
    root?.querySelector<HTMLInputElement>(`[data-signup="${where}"] input`)?.focus();
  }

  async function tour() {
    const el = root?.querySelector<HTMLElement>('#features');
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    const grid = el?.querySelector<HTMLElement>('[data-note="features"]');
    if (grid) setTimeout(() => flashChanged(grid), 500);
  }

  const notes: DesignNote[] = [
    {
      principle: 'locality',
      title: 'Sign-up opens where you pressed',
      body: '“Start for free” turns into the e-mail field in its own place, and the confirmation appears there too. No modal, no new page, no hunting for what happened.',
      target: '[data-note="hero-actions"]',
    },
    {
      principle: 'cues',
      title: 'Thick glass shows what is underneath',
      body: 'The navigation bar bends and magnifies the page as it slides under it, so you can feel there is more above and below — depth as orientation.',
      target: '[data-note="nav"]',
    },
    {
      principle: 'cues',
      title: 'The bar always says where you are',
      body: 'As you scroll, the link of the section in view lights up; a click glides you there instead of jumping, so you keep your bearings.',
      target: '[data-note="nav"]',
    },
    {
      principle: 'function',
      title: 'One primary action per section',
      body: 'Each block has exactly one strong button. The eye always knows the next step, and the page stays calm despite the colour.',
      target: '[data-note="pricing"]',
    },
    {
      principle: 'locality',
      title: 'A plan answers on its own card',
      body: 'Choose a plan and its button reports the result — busy, then “Trial started”. The highlighted plan sits on the selected layer, lifted above its neighbours.',
      target: '[data-note="pricing"]',
    },
    {
      principle: 'friendly',
      title: 'Warm words where nothing is at stake',
      body: '“Ready when you are”, “No card needed”: the copy reassures before it asks. The forms use plain words and say exactly what went wrong, under the field.',
      target: '[data-note="cta"]',
    },
  ];
</script>

<svelte:window bind:innerWidth={width} />

{#snippet logo()}
  <svg width="30" height="30" viewBox="0 0 30 30" aria-hidden="true" class="logo">
    <defs>
      <linearGradient id="{uid}-logo" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" style:stop-color="var(--tint-400)" />
        <stop offset="1" style:stop-color="var(--tint-700)" />
      </linearGradient>
    </defs>
    <rect width="30" height="30" rx="9" fill="url(#{uid}-logo)" />
    <path d="M9 20V10l6 7 6-7v10" />
  </svg>
{/snippet}

{#snippet primary(where: 'hero' | 'cta')}
  <div class="actions" data-signup={where}>
    {#if signingUp[where]}
      <div class="signup">
        <NewsletterSignup
          layout="inline"
          label="Work e-mail"
          placeholder="you@example.com"
          buttonLabel="Create account"
          busyLabel="Creating…"
          successMessage="You’re in — check your inbox for the sign-in link."
          invalidMessage="That doesn’t look like an e-mail address yet."
          onsubscribe={() => later(900)}
        />
      </div>
    {:else}
      <Button
        variant="primary"
        shape="pill"
        size="xl"
        label="Start for free"
        icon="arrow-right"
        onclick={() => startSignup(where)}
      />
      {#if where === 'hero'}
        <Button
          variant="glass"
          shape="pill"
          size="xl"
          label="Take the tour"
          icon="play"
          onclick={tour}
        />
      {/if}
    {/if}
  </div>
{/snippet}

{#snippet heroActions()}
  <div data-note="hero-actions">{@render primary('hero')}</div>
{/snippet}

{#snippet ctaActions()}
  {@render primary('cta')}
{/snippet}

<!-- The product shot: a photo with two glass notes floating over its corners. -->
{#snippet shot()}
  <div class="shot">
    <Image
      src={photo('workspace-desk', 1200, 900)}
      alt="A team at work"
      ratio="4/3"
      radius="card"
    />
    <Layer level="panel" direction="horizontal" gap="sm" padding="sm" class="note note--top">
      <span class="note-icon"><Icon name="sparkles" size={18} /></span>
      <span class="note-text"><strong>Weekly report ready</strong>Drafted for you · 2 min ago</span>
    </Layer>
    <Layer level="panel" direction="horizontal" gap="sm" padding="sm" class="note note--bottom">
      <span class="faces">
        {#each testimonials as t (t.name)}<Avatar name={t.name} src={t.avatar} size={28} />{/each}
      </span>
      <span class="note-text"><Stars value={4.9} showValue />2,000+ teams</span>
    </Layer>
  </div>
{/snippet}

<div bind:this={root} class="site">
  <Page width="wide" gap="2xl">
    {#snippet header()}
      <div data-note="nav">
        <NavBar
          brand="Example Planner"
          {logo}
          {links}
          brandHref="#top"
          onnavigate={(link, event) => navigate(link.href, event)}
        >
          {#snippet actions()}
            {#if width >= 640}
              <Popover
                label="Sign in"
                icon="sign-in"
                variant="ghost"
                placement="bottom-end"
                width="20rem"
                title="Welcome back"
              >
                <NewsletterSignup
                  layout="stacked"
                  text="We’ll e-mail you a link — no password to remember."
                  label="E-mail"
                  placeholder="you@example.com"
                  buttonLabel="Send sign-in link"
                  busyLabel="Sending…"
                  successMessage="Link sent. It works for the next 15 minutes."
                  onsubscribe={() => later(800)}
                />
              </Popover>
            {/if}
            <Popover
              label="Get started"
              variant="primary"
              placement="bottom-end"
              width="20rem"
              title="Start for free"
            >
              <NewsletterSignup
                layout="stacked"
                text="One e-mail and you’re in. No card needed."
                label="Work e-mail"
                placeholder="you@example.com"
                buttonLabel="Create account"
                busyLabel="Creating…"
                successMessage="You’re in — check your inbox for the sign-in link."
                onsubscribe={() => later(900)}
              />
            </Popover>
          {/snippet}
          {#snippet menu()}
            {#if width < 640}
              <NewsletterSignup
                layout="stacked"
                title="Welcome back"
                text="We’ll e-mail you a sign-in link — no password to remember."
                label="E-mail"
                placeholder="you@example.com"
                buttonLabel="Send sign-in link"
                busyLabel="Sending…"
                successMessage="Link sent. It works for the next 15 minutes."
                onsubscribe={() => later(800)}
              />
            {/if}
          {/snippet}
        </NavBar>
      </div>
    {/snippet}

    <div id="top" class="anchor">
      <Hero
        eyebrow="New · Smart suggestions are here"
        eyebrowHref="#features"
        title="Plan, write and ship — together"
        highlight="together"
        text="One calm place for your team’s projects, docs and decisions. Fast on every device, private by default."
        actions={heroActions}
        media={shot}
      >
        Free for individuals · No card needed · Cancel any time
      </Hero>
    </div>

    <LogoCloud title="Trusted by teams at" {logos} />

    <div id="features" class="anchor">
      <div data-note="features" class="glow">
        <FeatureGrid
          eyebrow="Features"
          title="Everything your team needs"
          description="Built for the way small teams actually work — and nothing that gets in the way."
          {features}
        />
      </div>
    </div>

    <div id="pricing" class="anchor" data-note="pricing">
      <PricingTable
        eyebrow="Pricing"
        title="Simple, fair pricing"
        description="Start free. Upgrade when your team grows. Yearly billing saves up to 20%."
        {plans}
        locale="en"
        onselect={async (plan) => {
          await later();
          plans = plans.map((p) =>
            p.id === plan.id
              ? { ...p, ctaLabel: p.monthly ? 'Trial started — check your inbox' : 'You’re in!' }
              : p,
          );
        }}
      />
    </div>

    <div id="customers" class="anchor">
      <Section
        eyebrow="Customers"
        title="Loved by busy teams"
        size="hero"
        align="center"
        layout="grid"
        min="18rem"
        columns={3}
      >
        {#each testimonials as t (t.name)}
          <Testimonial
            quote={t.quote}
            name={t.name}
            role={t.role}
            avatar={t.avatar}
            rating={t.rating}
          />
        {/each}
      </Section>
    </div>

    <div id="faq" class="anchor">
      <Faq eyebrow="FAQ" title="Questions & answers" items={faqs} open={[0]} />
    </div>

    <div data-note="cta">
      <CallToAction
        title="Ready when you are"
        text="Start free in under a minute. Invite your team when it clicks."
        actions={ctaActions}
      >
        <Row justify="center" gap="xs">
          <Icon name="check-circle" size={16} />
          <span class="small">No card needed · Data stays in the EU</span>
        </Row>
      </CallToAction>
    </div>

    {#snippet footer()}
      <SiteFooter
        brand="Example Planner"
        {logo}
        brandHref="#top"
        tagline="Calm software for small teams, made with care in Europe."
        columns={footerColumns}
        social={socialLinks}
        legal={legalLinks}
        finePrint="© 2026 Example Planner · hello@example.com"
      >
        <NewsletterSignup
          layout="stacked"
          text="Product news, once a month."
          onsubscribe={() => later()}
        />
      </SiteFooter>
    {/snippet}
  </Page>
</div>

<DesignNotes title="Landing page" {notes} corner="bottom-left" />

<style>
  .logo path {
    fill: none;
    stroke: var(--on-accent);
    stroke-width: 2.5;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
  .anchor {
    scroll-margin-top: calc(var(--control-xl) + var(--space-8));
  }
  .glow {
    border-radius: var(--radius-card);
  }
  .actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: inherit;
    gap: var(--space-3);
  }
  /* The form grows out of the button it replaces. */
  .signup {
    width: min(30rem, 100%);
    transform-origin: left center;
    animation: bb-pop var(--motion-base) var(--ease-out);
  }
  .shot {
    position: relative;
    padding: var(--space-6) 0;
  }
  .shot > :global(.image) {
    box-shadow: var(--shadow-dialog);
  }
  .shot :global(.note) {
    position: absolute;
    max-width: 17rem;
    box-shadow: var(--shadow-pop);
    background: var(--glass-strong);
  }
  .shot :global(.note--top) {
    top: 0;
    left: calc(var(--space-6) * -1);
  }
  .shot :global(.note--bottom) {
    right: calc(var(--space-4) * -1);
    bottom: 0;
  }
  .note-icon {
    display: grid;
    place-items: center;
    flex: none;
    width: 2.25rem;
    height: 2.25rem;
    border-radius: var(--radius-md);
    color: var(--on-accent);
    background: var(--grad-primary);
    box-shadow: var(--shadow-primary);
  }
  .note-text {
    display: grid;
    gap: 0.1rem;
    font-size: var(--fs-xs);
    color: var(--text-3);
  }
  .note-text strong {
    font-size: var(--fs-sm);
    color: var(--text);
  }
  .faces {
    display: flex;
  }
  .faces > :global(* + *) {
    margin-left: calc(var(--space-2) * -1);
  }
  .faces > :global(*) {
    border-radius: var(--radius-pill);
    box-shadow: 0 0 0 2px var(--glass-strong);
  }
  .small {
    font-size: var(--fs-sm);
    color: var(--text-2);
  }
  @media (max-width: 720px) {
    .shot :global(.note--top) {
      left: var(--space-2);
    }
    .shot :global(.note--bottom) {
      right: var(--space-2);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .signup {
      animation: none;
    }
  }
</style>
