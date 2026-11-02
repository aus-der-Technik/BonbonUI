<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Application from '../patterns/templates/Application.svelte';
  import WebsiteLanding from './WebsiteLanding.svelte';

  const { Story } = defineMeta({
    title: 'Pages/Website',
    component: WebsiteLanding,
    parameters: { layout: 'fullscreen' },
  });
</script>

<!--
A product landing page: NavBar, Hero with a product shot, LogoCloud, FeatureGrid,
PricingTable, testimonials, Faq, CallToAction and SiteFooter on one wide Page with a `2xl` gap,
so every block gets the same breathing room. Resize to see it fold.
-->
<Story name="Landing page" asChild>
  <Application density="comfortable">
    <WebsiteLanding />
  </Application>
</Story>

<!-- The same page in another tint, dark and rounder: one prop each. -->
<Story name="Landing page, dark" asChild>
  <Application tint="#5856d6" theme="dark" radius="round" density="comfortable">
    <WebsiteLanding />
  </Application>
</Story>
