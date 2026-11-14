<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Carousel from './Carousel.svelte';
  import Layer from '../layout/Layer.svelte';
  import Stack from '../layout/Stack.svelte';

  const { Story } = defineMeta({
    title: 'Molecules/Carousel',
    component: Carousel,
    tags: ['autodocs'],
  });

  const templates = [
    { title: 'Sprint board', text: 'Backlog, to do, doing, review, done.', color: 'blue' },
    { title: 'Content calendar', text: 'Plan posts by week and channel.', color: 'pink' },
    { title: 'Bug triage', text: 'New, confirmed, fixing, verified.', color: 'orange' },
    { title: 'Hiring pipeline', text: 'Applied, interview, offer, hired.', color: 'green' },
    { title: 'Event planning', text: 'Venue, speakers, catering, travel.', color: 'purple' },
    { title: 'Research repository', text: 'Interviews, notes and insights.', color: 'teal' },
  ];
</script>

<!-- Board templates, three at a time on wide screens (two on tablets, one on phones). Swipe,
use the glass arrows, the dots or the arrow keys. -->
<Story name="Several per view" asChild>
  <Carousel label="Board templates" perView={3}>
    {#each templates as item (item.title)}
      <Layer level="panel" gap="sm">
        <span
          style="width:2.5rem;height:2.5rem;border-radius:var(--radius-md);background:var(--color-{item.color})"
        ></span>
        <Stack gap="xs">
          <strong>{item.title}</strong>
          <span style="color:var(--text-2)">{item.text}</span>
        </Stack>
      </Layer>
    {/each}
  </Carousel>
</Story>

<!-- One wide slide with the next one peeking in. Slides stay calm glass with only a soft wash of
     their colour — big surfaces are never painted in full candy. -->
<Story name="Hero with peek" asChild>
  <Carousel label="What is new" peek loop>
    {#each templates.slice(0, 4) as item (item.title)}
      <Layer level="panel" padding="none">
        <div
          style="height:11rem;display:flex;flex-direction:column;justify-content:flex-end;gap:var(--space-2);padding:var(--space-6);border-radius:inherit;background:radial-gradient(120% 140% at 0% 0%,color-mix(in srgb,var(--color-{item.color}) 26%,transparent),transparent 65%)"
        >
          <span
            style="width:2.75rem;height:2.75rem;border-radius:var(--radius-md);background:var(--color-{item.color});box-shadow:inset 0 1px 0 rgba(255,255,255,.45)"
          ></span>
          <strong style="font-size:var(--fs-2xl);letter-spacing:var(--tracking-tight)"
            >{item.title}</strong
          >
          <span style="color:var(--text-2)">{item.text}</span>
        </div>
      </Layer>
    {/each}
  </Carousel>
</Story>
