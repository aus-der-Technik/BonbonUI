<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import CallToAction from './CallToAction.svelte';
  import Faq from './Faq.svelte';
  import FeatureGrid from './FeatureGrid.svelte';
  import Hero from './Hero.svelte';
  import NavBar from './NavBar.svelte';
  import PricingTable from './PricingTable.svelte';
  import SiteFooter from './SiteFooter.svelte';
  import Button from '../atoms/Button.svelte';
  import NewsletterSignup from '../molecules/NewsletterSignup.svelte';
  import Stack from '../layout/Stack.svelte';
  import Application from '../templates/Application.svelte';
  import {
    faqs,
    features,
    footerColumns,
    later,
    legalLinks,
    photo,
    plans,
    siteLinks,
    socialLinks,
  } from '../../demo/mock-shop';

  const { Story } = defineMeta({
    title: 'Organisms/Website sections',
    component: Hero,
    tags: ['autodocs'],
    parameters: { layout: 'padded' },
    args: {
      eyebrow: 'New · Version 2 is here',
      title: 'Plan, write and ship — together',
      highlight: 'together',
      text: 'One calm place for your team’s projects, docs and decisions. Fast on every device.',
      mediaPosition: 'end',
      backdrop: false,
      size: 'lg',
    },
    argTypes: {
      mediaPosition: { control: 'inline-radio', options: ['end', 'start', 'below'] },
      align: { control: 'inline-radio', options: [undefined, 'start', 'center'] },
      size: { control: 'inline-radio', options: ['md', 'lg'] },
    },
  });
</script>

{#snippet logo()}
  <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
    <rect width="28" height="28" rx="8" fill="var(--accent)" />
    <path d="M8 19V9l6 7 6-7v10" fill="none" stroke="var(--on-accent)" stroke-width="2.4" />
  </svg>
{/snippet}

{#snippet heroActions()}
  <Button variant="primary" shape="pill" size="xl" label="Start for free" icon="arrow-right" />
  <Button variant="glass" shape="pill" size="xl" label="Watch the tour" icon="play" />
{/snippet}

<!-- Text and image side by side; the image moves under the text below 820px. On load the copy
     rises in line by line and the image settles after it; a linked eyebrow catches a sugar-glass
     sheen on hover. -->
<Story name="Hero">
  {#snippet template(args)}
    <Hero {...args} image={photo('hero-desk', 1200, 900)} actions={heroActions}>
      Free for individuals · No card needed
    </Hero>
  {/snippet}
</Story>

<!-- Centred, without media, on its own drifting tint mesh (`backdrop`). -->
<Story name="Hero with backdrop" asChild>
  <Hero
    backdrop
    eyebrow="Spring launch"
    eyebrowHref="#launch"
    title="Everything your team needs, nothing it doesn’t"
    highlight="nothing it doesn’t"
    text="Projects, docs and chat in one place, with the noise taken out."
    actions={heroActions}
  />
</Story>

<!-- Links fold into a menu button + sheet when the bar is narrower than 720px (resize). The bar
     is front-layer liquid glass and catches a one-shot sheen when the pointer arrives. -->
<Story name="NavBar" asChild>
  <Stack gap="xl">
    <NavBar brand="Larkspur" {logo} links={siteLinks}>
      {#snippet actions()}
        <Button variant="ghost" shape="pill" label="Sign in" collapse icon="sign-in" />
        <Button variant="primary" shape="pill" label="Get started" />
      {/snippet}
      {#snippet menu()}
        <Button variant="secondary" shape="pill" size="lg" label="Sign in" />
      {/snippet}
    </NavBar>
    <div style="max-width:24rem">
      <NavBar brand="Larkspur" {logo} links={siteLinks}>
        {#snippet actions()}
          <Button variant="primary" shape="pill" label="Get started" />
        {/snippet}
      </NavBar>
    </div>
  </Stack>
</Story>

<!-- Features cycle through the candy palette unless one names its colour. -->
<Story name="FeatureGrid" asChild>
  <FeatureGrid
    eyebrow="Features"
    title="Everything in one place"
    description="Built for the way small teams actually work."
    {features}
  />
</Story>

<Story name="FeatureGrid solid icons on the ground" asChild>
  <FeatureGrid features={features.slice(0, 4)} level="ground" iconStyle="solid" columns={4} />
</Story>

<!-- Monthly / yearly switch; the badge shows the best saving across the plans. It stays muted
     while monthly is chosen and lights up in the tint, with a small pop, once yearly is. -->
<Story name="PricingTable" asChild>
  <PricingTable
    eyebrow="Pricing"
    title="Simple, fair pricing"
    description="Start free. Upgrade when your team grows."
    {plans}
    onselect={() => later()}
  />
</Story>

<!-- One answer open at a time; `multiple` lets several stay open. Arrow keys move. -->
<Story name="Faq" asChild>
  <Faq title="Questions & answers" items={faqs} open={[0]} />
</Story>

<!-- Tinted (default), solid and panel tones. -->
<Story name="CallToAction" asChild>
  <Stack gap="xl">
    <CallToAction
      title="Ready when you are"
      text="Start free in under a minute. Invite your team when it clicks."
      actions={heroActions}
    />
    <CallToAction
      tone="solid"
      align="start"
      eyebrow="Teams of 10+"
      title="Talk to us about a pilot"
      text="We set it up with you and migrate your data for free."
    >
      {#snippet actions()}
        <Button variant="glass" shape="pill" size="xl" label="Book a call" icon="calendar" />
      {/snippet}
    </CallToAction>
    <CallToAction tone="panel" title="Stay in the loop" heading={3}>
      <NewsletterSignup align="center" onsubscribe={() => later()} />
    </CallToAction>
  </Stack>
</Story>

<Story name="SiteFooter" asChild>
  <SiteFooter
    brand="Larkspur"
    {logo}
    tagline="Calm software for small teams, made with care in Europe."
    columns={footerColumns}
    social={socialLinks}
    legal={legalLinks}
    finePrint="© 2026 Larkspur Studio"
  />
</Story>

<!-- The same sections in a dark, rounder, pink-tinted Application. -->
<Story name="Themed" asChild parameters={{ layout: 'fullscreen' }}>
  <Application tint="#ff2d55" theme="dark" radius="round" contained>
    <Stack gap="xl" padding="lg">
      <Hero
        size="md"
        eyebrow="Beta"
        title="Ideas worth sharing"
        highlight="sharing"
        text="A tint, a theme and a radius re-style every section."
        actions={heroActions}
      />
      <FeatureGrid features={features.slice(0, 3)} />
      <CallToAction tone="solid" title="Try it today">
        {#snippet actions()}
          <Button variant="glass" shape="pill" size="xl" label="Start now" />
        {/snippet}
      </CallToAction>
    </Stack>
  </Application>
</Story>
