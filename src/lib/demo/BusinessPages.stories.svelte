<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Application from '../patterns/templates/Application.svelte';
  import Invoicing from './Invoicing.svelte';
  import SalesPipeline from './SalesPipeline.svelte';

  const { Story } = defineMeta({
    title: 'Pages/Business',
    tags: ['!autodocs'],
    parameters: { layout: 'fullscreen' },
    // Explicit enums so a deep link (`&args=view:mine`) survives Storybook's URL check.
    argTypes: {
      view: {
        type: { name: 'enum', value: ['everyone', 'mine'] },
        control: 'inline-radio',
        options: ['everyone', 'mine'],
        description: 'Sales pipeline: whose deals to show.',
      },
      open: {
        type: { name: 'enum', value: ['none', 'd5', 'd9', 'd10'] },
        control: 'select',
        options: ['none', 'd5', 'd9', 'd10'],
        description: 'Sales pipeline: a deal to open on start.',
      },
      empty: { control: 'boolean', description: 'Sales pipeline: a fresh, empty quarter.' },
      filter: {
        type: { name: 'enum', value: ['all', 'open', 'overdue', 'paid', 'draft'] },
        control: 'inline-radio',
        options: ['all', 'open', 'overdue', 'paid', 'draft'],
        description: 'Invoicing: which invoices the table shows.',
      },
      creating: {
        control: 'boolean',
        description: 'Invoicing: opens with the new-invoice row open.',
      },
      settled: {
        control: 'boolean',
        description: 'Invoicing: every invoice is paid, nothing is outstanding.',
      },
    },
  });
</script>

<!--
A small team's deal pipeline for the quarter, with no panel at all: the forecast in dot-matrix
digits with a bar towards the target, three figures beside it, and five stage columns on the
ground set apart by hairlines. A deal moves where it is — its round "next stage" key, its menu,
or by dragging — and travels to its new column; both stage totals and the forecast glow when it
lands, and a won deal throws a few sprinkles. "Add deal" opens at the end of Lead; a lost deal
leaves with Undo in a toast. Below: this week's next steps and the forecast per owner.
-->
<Story name="Sales pipeline" args={{ view: 'everyone', open: 'none', empty: false }}>
  {#snippet template(args)}
    <Application tint="#007aff">
      {#key `${args.view}-${args.open}-${args.empty}`}
        <SalesPipeline
          view={args.view === 'mine' ? 'mine' : 'everyone'}
          open={args.open && args.open !== 'none' ? String(args.open) : undefined}
          empty={args.empty === true}
        />
      {/key}
    </Application>
  {/snippet}
</Story>

<!--
A small studio's invoices and cash flow. What is outstanding, overdue and paid sits on the
ground, with the outstanding total in dot-matrix digits; the cash-flow chart shows the next
eight weeks of money expected in against what goes out. The invoice table is the one panel:
"New invoice" opens a draft row at its top, "Mark paid" turns the row green where it is and
offers Undo, and an overdue invoice is reminded from its own row.
-->
<Story name="Invoicing" args={{ filter: 'open', creating: false, settled: false }}>
  {#snippet template(args)}
    <Application tint="#af52de">
      {#key `${args.filter}-${args.creating}-${args.settled}`}
        <Invoicing
          filter={args.filter ?? 'open'}
          creating={args.creating === true}
          settled={args.settled === true}
        />
      {/key}
    </Application>
  {/snippet}
</Story>
