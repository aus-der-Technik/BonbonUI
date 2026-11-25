<script lang="ts">
  import {
    Page,
    NavBar,
    Hero,
    FeatureGrid,
    PricingTable,
    CallToAction,
    SiteFooter,
    Button,
  } from '../../index';

  const features = [
    { icon: 'bolt' as const, title: 'Instant sync', text: 'Every change on every device.' },
    { icon: 'users' as const, title: 'Made for teams', text: 'Shared spaces and mentions.' },
    { icon: 'lock' as const, title: 'Private by default', text: 'Encrypted, end to end.' },
  ];
  const plans = [
    { id: 'starter', name: 'Starter', monthly: 0, features: ['One workspace', '3 projects'] },
    {
      id: 'team',
      name: 'Team',
      monthly: 15,
      yearly: 12,
      features: ['Unlimited projects', 'Team roles'],
      highlighted: true,
      badge: 'Most popular',
    },
  ];
  const sitemap = [
    { title: 'Product', links: [{ label: 'Pricing', href: '#pricing' }] },
    { title: 'Company', links: [{ label: 'Contact', href: 'mailto:hello@example.com' }] },
  ];
</script>

<Page width="wide" gap="2xl">
  {#snippet header()}
    <NavBar
      brand="Example Planner"
      links={[
        { label: 'Features', href: '#features' },
        { label: 'Pricing', href: '#pricing' },
      ]}
    >
      {#snippet actions()}<Button variant="primary" shape="pill" label="Sign up" />{/snippet}
    </NavBar>
  {/snippet}

  <Hero
    eyebrow="New"
    title="Ship ideas faster"
    highlight="faster"
    text="One tool for the whole team."
  >
    {#snippet actions()}
      <Button variant="primary" size="xl" shape="pill" label="Start free" />
    {/snippet}
  </Hero>
  <FeatureGrid eyebrow="Features" title="Everything in one place" {features} />
  <PricingTable title="Simple pricing" {plans} />
  <CallToAction title="Ready when you are" />

  {#snippet footer()}<SiteFooter brand="Example Planner" columns={sitemap} />{/snippet}
</Page>
