<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Application from '../patterns/templates/Application.svelte';
  import Spreadsheet from './Spreadsheet.svelte';

  const { Story } = defineMeta({
    title: 'Pages/Productivity/Spreadsheet',
    tags: ['!autodocs'],
    parameters: { layout: 'fullscreen' },
  });
</script>

<!--
A candy shop's year in a spreadsheet, where every control sits where its effect shows.

Try: drag over the Q1 numbers — their sum, average and count hang off the selection's corner and
a format bar floats above it (currency, percent, bold, alignment, "Chart"). Double-click a Year
total: the cell grows into an editor, each range outlines itself in the grid in its formula
colour, and the function explains itself underneath; while a formula waits for an operand, click
or drag over cells to write their address. Change a quarter and press Enter: the cell flashes,
then its Year, Growth and the column totals pulse once, nearest first. Point at a column letter
to sort it or filter it right there; point at a row number or column letter for the "+" on the
edge where a new row or column goes. Drag the dot on the selection's corner to fill. Select the
Sour drops growth to read why it cannot be calculated. Arrows, Tab, Enter, F2, Escape, Delete,
⌘Z / ⇧⌘Z work as in any sheet; sheet tabs sit on the grid's own edge, and "Ideas" is a blank
sheet that says hello.

Principles: function first (a real formula engine, loops and errors explained), friendliness
(warm words only where nothing is at stake), locality of action (no formula bar, no far toolbar
— the top bar holds only what acts on the whole workbook: undo, redo, share), and cues for cause
and effect (flash → pulse, tinted ranges, lit headers, four layers).
-->
<Story name="Spreadsheet" asChild>
  <Application><Spreadsheet /></Application>
</Story>
