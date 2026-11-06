<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { storyTint } from './tint';
  import Application from '../patterns/templates/Application.svelte';
  import WebsiteLanding from './WebsiteLanding.svelte';
  import Residence from './Residence.svelte';
  import type { ComponentProps } from 'svelte';

  type ResidenceArgs = ComponentProps<typeof Residence>;
  // The meta's component is the landing page, so the Residence story types its own args.
  const residenceArgs: ResidenceArgs = { menu: 'closed', units: 'metric', request: 'idle' };
  const residenceArgTypes = {
    menu: {
      type: { name: 'enum', value: ['closed', 'open'] },
      control: 'inline-radio',
      options: ['closed', 'open'],
      description: 'The glass drop, closed or poured out into its menu.',
    },
    units: {
      type: { name: 'enum', value: ['metric', 'imperial'] },
      control: 'inline-radio',
      options: ['metric', 'imperial'],
      description: 'Square metres or square feet.',
    },
    request: {
      type: { name: 'enum', value: ['idle', 'form', 'sent'] },
      control: 'inline-radio',
      options: ['idle', 'form', 'sent'],
      description: 'The viewing request: not asked yet, the form in place, or sent.',
    },
  } as const;

  const { Story } = defineMeta({
    title: 'Pages/Website',
    component: WebsiteLanding,
    tags: ['!autodocs'],
    parameters: { layout: 'fullscreen' },
  });
</script>

<!--
A product landing page: a thick-glass NavBar whose links glide to their section and follow the
scroll, Hero with a product shot, LogoCloud, FeatureGrid, PricingTable, testimonials, Faq,
CallToAction and SiteFooter on one wide Page with a `2xl` gap. The calls to action answer where
they are pressed: "Start for free" becomes the sign-up field in its place, "Sign in" and "Get
started" open from their buttons, a plan's button reports the trial. Use the toolbar for the dark
theme, another tint or a rounder radius; resize to see it fold.
-->
<Story name="Landing page" asChild>
  <Application density="comfortable">
    <WebsiteLanding />
  </Application>
</Story>

<!--
The landing page of one architect-designed house for sale: almost nothing but calm space, large
serif type, quiet facts and the architect's line drawings (elevation, plan, section, site) in
place of photos, all on the ground under a slim bar and a slim footer. The only glass is a round
drop at the top right that stays while the page scrolls; point at it, focus it or tap it and it
pours down into the page's sections like slow syrup, and drains back when you leave. The units
switch converts the figures in place (they glow) and the drawings' dimensions follow; "Request a
date" turns into a short form where it was pressed.
-->
<Story name="Residence" args={residenceArgs as never} argTypes={residenceArgTypes as never}>
  {#snippet template(storyArgs, context)}
    {@const args = storyArgs as ResidenceArgs}
    <Application tint={storyTint(context, '#9c7a4e')} density="comfortable" gradient={false}>
      {#key `${args.menu}-${args.units}-${args.request}`}
        <Residence
          menu={args.menu ?? 'closed'}
          units={args.units ?? 'metric'}
          request={args.request ?? 'idle'}
        />
      {/key}
    </Application>
  {/snippet}
</Story>
