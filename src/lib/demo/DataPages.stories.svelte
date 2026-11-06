<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Application from '../patterns/templates/Application.svelte';
  import QueryExplorer from './QueryExplorer.svelte';

  const { Story } = defineMeta({
    title: 'Pages/Data',
    component: QueryExplorer,
    tags: ['!autodocs'],
    parameters: { layout: 'fullscreen' },
    argTypes: {
      preset: {
        control: 'select',
        options: ['by-region', 'by-month', 'refunds', 'low-stock', 'broken', 'empty'],
        description:
          'The query in the editor when the page opens (it runs once): a saved query, a typo, or a filter that matches nothing.',
      },
    },
  });
</script>

<!--
A data analyst's workbench. A NavRail on glass at the left; the tables and their columns on the
ground beside it (click a column to write its name at the cursor, the play key starts a query on
a table); saved queries as soft keys above the editor they load into. The editor and the result
table are the two panels; the chart of the result sits on the ground beside the table and picks
its own shape — a line when grouped by month, bars when grouped by a category, none (and why) for
a list of rows. The query language is a tiny SQL-like one over in-memory rows: SELECT with
count, sum, avg, min and max, WHERE with AND, GROUP BY, ORDER BY and LIMIT. Running answers at
the result's head — the row count and the time glow; "Run" shimmers while the query differs from
the one shown. A mistake is named on its line under the editor, with the likely fix one click
away. ⌘ Enter runs.
-->
<Story name="Query explorer" args={{ preset: 'by-region' }}>
  {#snippet template(args)}
    <Application>
      {#key args.preset}
        <QueryExplorer preset={args.preset ?? 'by-region'} />
      {/key}
    </Application>
  {/snippet}
</Story>
