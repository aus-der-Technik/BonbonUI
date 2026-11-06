<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { storyTint } from './tint';
  import Application from '../patterns/templates/Application.svelte';
  import TeamWorkspace from './TeamWorkspace.svelte';

  // A full example of a collaborative tool, built only from library components and meant to be
  // copied as a starting point.
  const { Story } = defineMeta({
    title: 'Pages/Collaboration',
    component: TeamWorkspace,
    tags: ['!autodocs'],
    parameters: { layout: 'fullscreen' },
    argTypes: {
      view: {
        // An explicit enum so a deep link (`&args=view:calendar`) survives the URL check.
        type: { name: 'enum', value: ['board', 'calendar'] },
        control: 'inline-radio',
        options: ['board', 'calendar'],
        description: 'The view to open (deep link).',
      },
    },
  });
</script>

<!--
A product team's workspace: one shared navigation (with who is here now) and inbox over two
views that switch in place. The board: a filling KanbanBoard where each column scrolls on its
own and "Add card" sits at the foot of every column; a sticky filter row (all / mine / due soon,
search, the faces of who is here). Cards open in a Drawer with who else is looking at them and
their discussion, quoted from the card. The calendar: a KPI row, the month grid and the chosen
day's agenda; events are added on their day — from the "+" in the day under the pointer or
"Add to this day" in the agenda — and the day glows where they land. `view` deep-links a view.
-->
<Story name="Team workspace" args={{ view: 'board' }}>
  {#snippet template(args, context)}
    <Application tint={storyTint(context, '#5b5bd6')}>
      {#key args.view}
        <TeamWorkspace view={args.view ?? 'board'} />
      {/key}
    </Application>
  {/snippet}
</Story>
