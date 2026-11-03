<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Application from '../patterns/templates/Application.svelte';
  import WebsiteLanding from './WebsiteLanding.svelte';

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
