<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Application from '../patterns/templates/Application.svelte';
  import SlideDeck from './SlideDeck.svelte';

  // A full example application in one file in src/lib/demo, built from library components and
  // meant to be copied as a starting point.
  const { Story } = defineMeta({
    title: 'Pages/Productivity/Slide deck',
    tags: ['!autodocs'],
    parameters: { layout: 'fullscreen' },
  });
</script>

<!--
A slide deck editor with a six-slide quarterly team update. Things to try:
- Click an object: handles and a small tool bar appear on the object itself (colour, text size,
  alignment, order, duplicate, delete). Drag it and pink guides appear for the slide's centre,
  edges and the other objects; drag a handle to resize (Shift keeps proportions, Alt turns
  snapping off). Double-click any text to edit it in place; Esc finishes.
- Pick Text, Box, Circle, Picture or Chart on the bar under the slide, then click on the slide:
  the object grows from that spot. From the keyboard it lands in the middle.
- Point between two thumbnails for a +: the new slide appears exactly there. Drag a thumbnail
  to reorder (the others glide aside), or use Alt + arrow keys. The layout picker, "Present from
  here", duplicate and delete open from the slide's own thumbnail; a removed slide offers Undo
  in the gap it left.
- Speaker notes sit right under their slide. Undo / redo (⌘Z / ⇧⌘Z), the deck's look, Share and
  Present are deck-wide, so they live in the top bar. Present grows the slide from its place to
  full screen; arrows or Space move on, Esc shrinks it back.
- Keyboard: Tab to an object, arrows nudge (Shift = 10), Alt + arrows resize, Delete removes,
  Enter edits text, [ and ] change the order, PageUp / PageDown switch slides.

It demonstrates the four principles: function first (every gesture has a keyboard path and an
undo), friendliness (warm copy for saving, empty notes and hints), locality of action (tools on
the object, + in the gap, layouts on the thumbnail, notes under the slide) and visual cues
(guides, objects growing from where they land, gliding thumbnails, the zoom into Present).
-->
<Story name="Slide deck" asChild>
  <Application><SlideDeck /></Application>
</Story>
