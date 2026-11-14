<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import FeatureCard from './FeatureCard.svelte';
  import LogoCloud from './LogoCloud.svelte';
  import NewsletterSignup from './NewsletterSignup.svelte';
  import PricingCard from './PricingCard.svelte';
  import Testimonial from './Testimonial.svelte';
  import Grid from '../layout/Grid.svelte';
  import Stack from '../layout/Stack.svelte';
  import { later, logos, testimonials } from '../../demo/mock-shop';

  const { Story } = defineMeta({
    title: 'Molecules/Website building blocks',
    component: FeatureCard,
    tags: ['autodocs'],
    parameters: { layout: 'padded' },
    args: {
      icon: 'bolt',
      color: 'orange',
      title: 'Instant sync',
      text: 'Every change lands on every device in milliseconds.',
      iconStyle: 'tinted',
      level: 'panel',
      layout: 'vertical',
    },
    argTypes: {
      iconStyle: { control: 'inline-radio', options: ['tinted', 'solid'] },
      level: { control: 'inline-radio', options: ['panel', 'ground'] },
      layout: { control: 'inline-radio', options: ['vertical', 'horizontal'] },
      color: {
        control: 'select',
        options: ['accent', 'blue', 'orange', 'green', 'purple', 'pink', 'teal', 'red'],
      },
    },
  });
</script>

<Story name="FeatureCard" />

<!-- Tinted squircles (default) next to glossy solid ones; any palette colour or `accent`. -->
<Story name="FeatureCard styles" asChild>
  <Grid min="15rem">
    <FeatureCard icon="lock" color="blue" title="Private by default" text="Encrypted end to end." />
    <FeatureCard icon="sparkles" color="purple" title="Smart suggestions" text="Drafts for you." />
    <FeatureCard
      icon="users"
      color="pink"
      iconStyle="solid"
      title="Made for teams"
      text="Spaces, mentions, roles."
    />
    <FeatureCard
      icon="chart"
      color="accent"
      iconStyle="solid"
      title="Insights"
      text="Know why a number moved."
      href="#insights"
    />
  </Grid>
</Story>

<!-- Straight on the backdrop, icon beside the text: for dense feature lists. -->
<Story name="FeatureCard on the ground" asChild>
  <Grid min="18rem" gap="lg">
    <FeatureCard
      level="ground"
      layout="horizontal"
      icon="bolt"
      color="orange"
      title="Fast"
      text="Opens in under a second, even with thousands of items."
    />
    <FeatureCard
      level="ground"
      layout="horizontal"
      icon="globe"
      color="teal"
      title="Everywhere"
      text="Web, desktop and phone — your work follows you."
    />
  </Grid>
</Story>

<!-- A free, a highlighted (selected layer) and a custom-priced plan. -->
<Story name="PricingCard" asChild>
  <Grid min="16rem" columns={3}>
    <PricingCard
      name="Starter"
      price={0}
      description="For trying things out."
      features={['One workspace', '3 projects', { label: 'Team roles', included: false }]}
      ctaLabel="Start for free"
      onselect={() => later()}
    />
    <PricingCard
      name="Team"
      price={12}
      compareAt={15}
      period="/ month"
      note="billed yearly"
      description="For small teams shipping together."
      features={['Unlimited projects', 'Team roles and guests', 'Priority support']}
      highlighted
      badge="Most popular"
      ctaLabel="Start free trial"
      onselect={() => later()}
    />
    <PricingCard
      name="Enterprise"
      price="Custom"
      description="Volume pricing, SSO and a success manager."
      features={['Everything in Team', 'Single sign-on', 'Audit log']}
      ctaLabel="Contact sales"
      ctaHref="#contact"
    />
  </Grid>
</Story>

<!-- Quotes in a grid, and the single large featured quote. -->
<Story name="Testimonial" asChild>
  <Stack gap="xl">
    <Grid min="18rem">
      {#each testimonials as t (t.name)}
        <Testimonial
          quote={t.quote}
          name={t.name}
          role={t.role}
          avatar={t.avatar}
          rating={t.rating}
        />
      {/each}
    </Grid>
    <Testimonial
      size="lg"
      level="ground"
      quote="The calmest tool we have ever rolled out. People just started using it."
      name="Lena Vogt"
      role="COO, Example Labs"
    />
  </Stack>
</Story>

<!-- Wordmarks from names, muted to one grey; images work the same with `src`. -->
<Story name="LogoCloud" asChild>
  <LogoCloud title="Trusted by teams at" {logos} />
</Story>

<!-- Try any address: success throws a small burst of sprinkles (the end of a task is where delight
     lives). An invalid address shakes its head politely; "fail@example.com" shows the plain error. -->
<Story name="NewsletterSignup" asChild>
  <Grid min="18rem" gap="xl">
    <NewsletterSignup
      title="Product updates"
      text="One short e-mail a month. No spam, unsubscribe any time."
      onsubscribe={async (email) => {
        await later();
        if (email.startsWith('fail')) throw new Error('rejected');
      }}
    />
    <NewsletterSignup
      layout="stacked"
      title="Join the beta"
      buttonLabel="Request access"
      onsubscribe={() => later()}
    />
  </Grid>
</Story>
