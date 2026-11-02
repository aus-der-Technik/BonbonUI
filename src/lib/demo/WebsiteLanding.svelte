<script lang="ts">
  /**
   * Example page: the landing website of a fictional team app, built only from library parts —
   * NavBar, Hero, LogoCloud, FeatureGrid, PricingTable, testimonials, Faq, CallToAction and
   * SiteFooter on one wide Page (Storybook only).
   */
  import Avatar from '../patterns/atoms/Avatar.svelte';
  import Button from '../patterns/atoms/Button.svelte';
  import Icon from '../patterns/atoms/Icon.svelte';
  import Image from '../patterns/atoms/Image.svelte';
  import Stars from '../patterns/atoms/Stars.svelte';
  import LogoCloud from '../patterns/molecules/LogoCloud.svelte';
  import NewsletterSignup from '../patterns/molecules/NewsletterSignup.svelte';
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
  import {
    faqs,
    features,
    footerColumns,
    later,
    legalLinks,
    logos,
    photo,
    plans,
    siteLinks,
    socialLinks,
    testimonials,
  } from './mock-shop';

  let links = $state(siteLinks);

  function navigate(href: string, event: MouseEvent) {
    event.preventDefault();
    links = links.map((l) => ({ ...l, active: l.href === href }));
  }
</script>

{#snippet logo()}
  <svg width="30" height="30" viewBox="0 0 30 30" aria-hidden="true">
    <defs>
      <linearGradient id="wl-logo" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="var(--tint-400)" />
        <stop offset="1" stop-color="var(--tint-700)" />
      </linearGradient>
    </defs>
    <rect width="30" height="30" rx="9" fill="url(#wl-logo)" />
    <path
      d="M9 20V10l6 7 6-7v10"
      fill="none"
      stroke="#fff"
      stroke-width="2.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
{/snippet}

{#snippet primary()}
  <Button variant="primary" shape="pill" size="xl" label="Start for free" icon="arrow-right" />
  <Button variant="glass" shape="pill" size="xl" label="Watch the tour" icon="play" />
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

<Page width="wide" gap="2xl">
  {#snippet header()}
    <NavBar
      brand="Larkspur"
      {logo}
      {links}
      brandHref="#top"
      onnavigate={(link, event) => navigate(link.href, event)}
    >
      {#snippet actions()}
        <Button variant="ghost" shape="pill" label="Sign in" icon="sign-in" collapse />
        <Button variant="primary" shape="pill" label="Get started" />
      {/snippet}
    </NavBar>
  {/snippet}

  <Hero
    eyebrow="New · Smart suggestions are here"
    eyebrowHref="#features"
    title="Plan, write and ship — together"
    highlight="together"
    text="One calm place for your team’s projects, docs and decisions. Fast on every device, private by default."
    actions={primary}
    media={shot}
  >
    Free for individuals · No card needed · Cancel any time
  </Hero>

  <LogoCloud title="Trusted by teams at" {logos} />

  <FeatureGrid
    eyebrow="Features"
    title="Everything your team needs"
    description="Built for the way small teams actually work — and nothing that gets in the way."
    {features}
  />

  <PricingTable
    eyebrow="Pricing"
    title="Simple, fair pricing"
    description="Start free. Upgrade when your team grows. Yearly billing saves up to 20%."
    {plans}
    onselect={() => later()}
  />

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

  <Faq eyebrow="FAQ" title="Questions & answers" items={faqs} open={[0]} />

  <CallToAction
    title="Ready when you are"
    text="Start free in under a minute. Invite your team when it clicks."
    actions={primary}
  >
    <Row justify="center" gap="xs">
      <Icon name="check-circle" size={16} />
      <span class="small">No card needed · Data stays in the EU</span>
    </Row>
  </CallToAction>

  {#snippet footer()}
    <SiteFooter
      brand="Larkspur"
      {logo}
      brandHref="#top"
      tagline="Calm software for small teams, made with care in Europe."
      columns={footerColumns}
      social={socialLinks}
      legal={legalLinks}
      finePrint="© 2026 Larkspur Studio · hello@example.com"
    >
      <NewsletterSignup
        layout="stacked"
        text="Product news, once a month."
        onsubscribe={() => later()}
      />
    </SiteFooter>
  {/snippet}
</Page>

<style>
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
    color: #fff;
    background: linear-gradient(160deg, var(--color-purple), var(--color-indigo));
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
    margin-left: -0.5rem;
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
</style>
