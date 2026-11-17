<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Application from '../patterns/templates/Application.svelte';
  import DocumentEditor from './DocumentEditor.svelte';

  // A full example page of a productivity tool, built only from library components and meant to
  // be copied as a starting point.
  const { Story } = defineMeta({
    title: 'Pages/Productivity/Document editor',
    tags: ['!autodocs'],
    parameters: { layout: 'fullscreen' },
  });
</script>

<!--
A document editor where every control sits where its effect happens. Select a few words: the
format bar grows out of the selection (bold, italic, underline, strikethrough, heading, list,
quote, link, comment — each hint shows its shortcut) and the word count and reading time appear
right under it. Point at a paragraph for its handle in the left margin: drag it, or click it to
turn the block into something else, move, duplicate or delete it. Hover the gap between two
blocks and a "+" opens a new line exactly there; an empty line offers its block types in place,
and "# ", "- ", "1. " and "> " work as you type. Comments sit level with their passage in the
right margin — point at one and a line ties it to its words; add one from the format bar,
resolve the last open one for a small burst. Undo says what it will undo, and the block it
touches glows for a moment. "Saved" sits at the title, the zoom under the page, and the glass bar
on top only holds what changes the whole document (title, undo, page setup, sharing).

Principles on show: function first (one model, one history, no chrome that isn't needed),
friendliness (warm hints in empty lines and margins), locality (tools at the selection, handles
at the block, notes at the passage) and cues (things grow from their cause, moved blocks glide,
changes glow). On a phone the comment margin folds into the page: tap a highlighted passage and
its thread opens right below it.
-->
<Story name="Document editor" asChild>
  <Application><DocumentEditor /></Application>
</Story>
