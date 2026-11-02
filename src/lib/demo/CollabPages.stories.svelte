<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Application from '../patterns/templates/Application.svelte';
  import DocsCollab from './DocsCollab.svelte';
  import TeamBoard from './TeamBoard.svelte';
  import TeamCalendar from './TeamCalendar.svelte';

  // Full example pages of a collaborative tool. Each is a single file in src/lib/demo, built only
  // from library components, meant to be copied as a starting point.
  const { Story } = defineMeta({
    title: 'Pages/Collaboration',
    tags: ['!autodocs'],
    parameters: { layout: 'fullscreen' },
  });
</script>

<!--
A kanban project board in a filling Page: the KanbanBoard takes all the room, each column scrolls
on its own. Header: a notifications Popover with NotificationList and "New card". The sticky nav
row is one front-layer pill that never wraps (SegmentedControl, a pill SearchField that shrinks,
and one AvatarStack that shows who's here and filters by person). Card labels stay neutral so
colour means something: priority, overdue dates, the column dots. The SideNav sidebar and an
aside with Stats, a TaskList and the ActivityLog appear on wide screens; a menu Drawer replaces
them on tablets and phones. Cards open in a Drawer with a DatePicker, TaskList and CommentThread.
-->
<Story name="Project board" asChild>
  <Application tint="#5b5bd6"><TeamBoard /></Application>
</Story>

<!--
A shared document: the text on one panel Layer (no cards inside it) with colleagues' cursors;
discussed passages get a soft highlighter stroke and a marker that selects their CommentThread
in the aside (resolve folds a thread). A vertical Stepper for the launch stages, presence in the
header and a Share Popover with a CopyButton.
-->
<Story name="Shared document" asChild>
  <Application tint="#e8590c"><DocsCollab /></Application>
</Story>

<!--
A team calendar: a ground-layer row of Stats, the month Calendar with candy event pills (dots on
phones) and the chosen day's agenda in the aside. Here candy colours are categories — each event
keeps its hue from the grid to the agenda — while every surface stays neutral. "New event" is a
Popover form with a DatePicker.
-->
<Story name="Team calendar" asChild>
  <Application tint="#0a84ff"><TeamCalendar /></Application>
</Story>
