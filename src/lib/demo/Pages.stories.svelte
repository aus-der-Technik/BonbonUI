<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Application from '../patterns/templates/Application.svelte';
  import AnalyticsDashboard from './AnalyticsDashboard.svelte';
  import DataEditor from './DataEditor.svelte';
  import LocationSearch from './LocationSearch.svelte';
  import SignInFlow from './SignInFlow.svelte';
  import UserManagement from './UserManagement.svelte';
  import WorkspaceSettings from './WorkspaceSettings.svelte';

  // Full example pages of an admin suite. Each is a single file in src/lib/demo, built only from
  // library components, meant to be copied as a starting point.
  const { Story } = defineMeta({
    title: 'Pages/Admin',
    tags: ['!autodocs'],
    parameters: { layout: 'fullscreen' },
  });
</script>

<!--
An analytics dashboard over user feedback: a FilterBar with SegmentedControl, MultiSelect and
Checkbox, three KpiTiles in a `Grid columns={3}` (they share the row instead of leaving a hole),
a chart row (DivergingBarChart, LineChart, HorizontalBarChart in ChartCards) and a sortable,
paged DataTable with expandable rows in a panel `Section`. Header actions: a "Create feedback"
pill opening FeedbackDialog and a live RefreshButton.
-->
<Story name="Insights dashboard" asChild>
  <Application><AnalyticsDashboard /></Application>
</Story>

<!--
User management with a SideNav in the Page `sidebar`: Breadcrumbs, a panel `Section` with a
search / status / role toolbar, removable filter Tags, Skeleton rows while loading, a DataTable
with IdentityCell and per-row DropdownMenu, a Pager. Drawer with Tabs for details, a Dialog to
invite (Field validation) and a ConfirmDialog to deactivate; Toaster for feedback.
-->
<Story name="Users" asChild>
  <Application><UserManagement /></Application>
</Story>

<!--
The first-run state of the same page: an EmptyState with a call to action inside the panel. Empty
states are where the copy may smile ("It's quiet in here") — errors never do.
-->
<Story name="Users — empty" asChild>
  <Application><UserManagement empty /></Application>
</Story>

<!--
Workspace settings: Tabs inside a panel `Section`, each tab a stack of FormSections with Field,
Input, Textarea, Select, RadioGroup and Switch; a two-column `Grid` that folds on phones; an API
tab with ProgressBar, a secret CodeBlock and a token DataTable with ConfirmButtons; Disclosures
for advanced options and a danger zone with a ConfirmDialog. The theme option switches the real
theme. Saving shows a busy button, then "Saved. Nice." and a few sprinkles.
-->
<Story name="Settings" asChild>
  <Application><WorkspaceSettings /></Application>
</Story>

<!--
A spreadsheet-style editor in a `fill` Page: Sheet with EditableGrid (inline editing, locked
columns, draft row, resizable columns), a data-set Picker and UserMenu in the header, ToggleChip
and SearchField as sheet tools, and "Add row" in the Page `floating` slot. Toaster reports saves.
-->
<Story name="Data editor" asChild>
  <Application><DataEditor /></Application>
</Story>

<!-- The data-set chooser: ChoiceCards in an auto-filling `Grid` inside the Sheet. -->
<Story name="Data editor — choose a data set" asChild>
  <Application><DataEditor start="chooser" /></Application>
</Story>

<!-- Signed out: no sheet to show, so the SignInCard floats alone on the backdrop, centred. -->
<Story name="Data editor — signed out" asChild>
  <Application><DataEditor start="signed-out" /></Application>
</Story>

<!--
A location search in a `fill` Page: an Autocomplete with suggestions, ToggleChips per result type
with counts and a `Spacer`-aligned status line on a panel `Layer`, and a MapView that takes the
remaining height.
-->
<Story name="Locations" asChild>
  <Application><LocationSearch /></Application>
</Story>

<!-- One lookup fails: the results of the others show, the failure is a card Alert. -->
<Story name="Locations — partial failure" asChild>
  <Application><LocationSearch failing /></Application>
</Story>

<!--
Sign-in on AuthLayout: a time-of-day `greeting()` as the heading, Field, Input and a full-width
primary Button in a vertical `Stack` form. A wrong password shakes the card and shows a plain
Alert (the password is "demo"); the right one ends in a "Welcome back" StatusCard.
-->
<Story name="Sign in" asChild>
  <Application><SignInFlow /></Application>
</Story>

<!-- Connecting a device: a grouped CodeInput above the credentials. -->
<Story name="Sign in — connect a device" asChild>
  <Application><SignInFlow start="activate" /></Application>
</Story>

<!-- Signing out: a StatusCard with a redirect countdown, no card around it. -->
<Story name="Sign in — signing out" asChild>
  <Application><SignInFlow start="logout" /></Application>
</Story>
