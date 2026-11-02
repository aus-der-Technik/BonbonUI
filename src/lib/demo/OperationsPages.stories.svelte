<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Application from '../patterns/templates/Application.svelte';
  import ArchiveBrowser from './ArchiveBrowser.svelte';
  import AssistantPage from './AssistantPage.svelte';
  import BundleExport from './BundleExport.svelte';
  import ClassifierBench from './ClassifierBench.svelte';
  import CrawlJobRunner from './CrawlJobRunner.svelte';
  import DocumentLibrary from './DocumentLibrary.svelte';
  import OpsOverview from './OpsOverview.svelte';
  import PromptPlayground from './PromptPlayground.svelte';
  import QualityRating from './QualityRating.svelte';
  import TranslatorPage from './TranslatorPage.svelte';
  import WorkspaceConsole from './WorkspaceConsole.svelte';

  // Full example pages of internal tooling: job runners, AI test benches, archives. Each is a
  // single file in src/lib/demo, built only from library components, meant to be copied.
  const { Story } = defineMeta({
    title: 'Pages/Operations',
    tags: ['!autodocs'],
    parameters: { layout: 'fullscreen' },
  });
</script>

<!--
The home dashboard of an operations suite. It opens on the ground layer with a time-of-day
`greeting()` (today's date above, a small wink after the status line) and the range
SegmentedControl, then KpiTiles in a `Grid` (4 across, 2 on a phone), a 3 : 2 chart row
(DivergingBarChart, LineChart) and a jobs DataTable whose status column is a live JobStatus
(polled every 2 s with `utils/poll`), with retry and log actions in the expandable row. The Page
`aside` holds service health (ResourceList) and an ActivityLog. Colour is kept for state: the
success meter, chart series and status badges; every surface around them is neutral glass, so a
failed job is the first thing you see.
-->
<Story name="Overview" asChild>
  <Application><OpsOverview /></Application>
</Story>

<!--
An AI judge rates a list of documents: a run panel with "Rate all" / "Re-rate" and a live
summary polled every 2 s with `utils/poll` `every` ("12 rated · 3 skipped · 1 failed of 40"),
a paged DataTable whose rating cell is Skipped / Not rated / Queued… / Failed + Retry / Stars +
Re-rate with per-criterion scores in a Tooltip and the opened row. The Page `aside` holds the
Overall panel (average Stars, 1–5 HorizontalBarChart, counts per state) and the criteria list.
A run that ends without failures throws a few `celebrate()` sprinkles from the button that
started it — once, at the end of the task. On phones the table keeps only document and rating.
-->
<Story name="Quality rating" asChild>
  <Application><QualityRating /></Application>
</Story>

<!-- A "Rate all" run in progress from the start. -->
<Story name="Quality rating — running" asChild>
  <Application><QualityRating start="running" /></Application>
</Story>

<!--
A crawl-and-extract job runner: a two-column `Grid` with a form (start URL, link-depth Slider,
system prompt, monospace prompt template that must contain `{{content}}`) above a JobStatus
card that moves queued → crawling → extracting → completed. While it runs, Cancel sits next to
the busy Start button — where your hand already is. On the right, on the ground layer, a paged
grid of result panels per crawled page (the mono URL is the link, Markdown chunks "Chunk 1 of
3") under a "37 pages · cached" count. Press Start: a finished crawl ends in sprinkles.
-->
<Story name="Crawl & extract" asChild>
  <Application><CrawlJobRunner /></Application>
</Story>

<!-- The job running from the start: crawling, then extracting with a progress bar. -->
<Story name="Crawl & extract — running" asChild>
  <Application><CrawlJobRunner autostart /></Application>
</Story>

<!-- The start URL fails and the job retries: "attempt 2 of 5 · next run …". -->
<Story name="Crawl & extract — retrying" asChild>
  <Application><CrawlJobRunner scenario="retry" autostart /></Application>
</Story>

<!-- All attempts used up: the failed state with an Alert. -->
<Story name="Crawl & extract — failed" asChild>
  <Application><CrawlJobRunner scenario="failed" autostart /></Application>
</Story>

<!-- The same crawl ran recently: results come from the cache at once. -->
<Story name="Crawl & extract — cached" asChild>
  <Application><CrawlJobRunner scenario="cached" autostart /></Application>
</Story>

<!--
A test bench for an input classifier: a Textarea with min/max length validation in a Field, a
DE/EN SegmentedControl in the header; the result shows the class and language Badges, key=value
facet Tags grouped by source (Model / NER / Both), a status line "matches task × location" and
the raw JSON in a copyable CodeBlock. A Disclosure holds the 5 × 8 probe matrix that fires canned
inputs.
-->
<Story name="Classifier bench" asChild>
  <Application><ClassifierBench /></Application>
</Story>

<!-- The probe matrix after a full run, with a mismatch: "expected question × time" (warn). -->
<Story name="Classifier bench — probed" asChild>
  <Application><ClassifierBench probed /></Application>
</Story>

<!--
A prompt playground: Composer with presets, a "Sampling" Disclosure with Sliders (temperature,
top-p, top-k, max tokens) summarised in its meta line, an allowed-tools CheckboxGroup in mono
("6 of 9 tools"); a ResultPanel streaming Markdown token by token with a character count, a
judge verdict Alert (OK / FAIL with reason), source link Tags and tool-usage Tags with call counts
and failures. Header: a "Clear cache" ConfirmButton. Turning the knobs changes the verdict.
-->
<Story name="Prompt playground" asChild>
  <Application><PromptPlayground /></Application>
</Story>

<!-- The first preset asked on load: streaming, then the verdict and the tool usage. -->
<Story name="Prompt playground — answered" asChild>
  <Application><PromptPlayground autoask /></Application>
</Story>

<!-- The stream breaks off: the error state of the ResultPanel. -->
<Story name="Prompt playground — timed out" asChild>
  <Application><PromptPlayground autoask failing /></Application>
</Story>

<!--
Packs a list of document IDs into one ZIP through a polled background job: a `Stack` form with
an optional archive name and a mono Textarea of IDs (unique count, validation), a job panel with
a metric `Grid` (Status Badge, Requested, Included, Failed, Filename, Size, Expires — two columns
on a phone), Refresh and a Download ZIP Button that waits for completion, and a DataTable of
per-item errors with code Tags. Start an export: when the job completes, sprinkles fly once from
the Start button.
-->
<Story name="Bundle export" asChild>
  <Application><BundleExport /></Application>
</Story>

<!-- The job is being packed: pending → processing → completed while you watch. -->
<Story name="Bundle export — processing" asChild>
  <Application><BundleExport start="processing" /></Application>
</Story>

<!-- Finished with three failed items: download enabled, the error table filled. -->
<Story name="Bundle export — completed" asChild>
  <Application><BundleExport start="completed" /></Application>
</Story>

<!-- The download link ran out: an Alert and a disabled download. -->
<Story name="Bundle export — expired" asChild>
  <Application><BundleExport start="expired" /></Application>
</Story>

<!--
A versioned archive: Breadcrumbs from collections to documents to one document; a collections
DataTable, a documents DataTable with FilterBar (search, Format, Versions, Archived) and sorting,
and a detail view with VersionRail pills (latest marked), a metadata DetailList with a copy
button for the checksum, a history table that follows the chosen version, and download Buttons.
-->
<Story name="Archive browser" asChild>
  <Application><ArchiveBrowser /></Application>
</Story>

<!-- The documents of one collection with the filters. -->
<Story name="Archive browser — documents" asChild>
  <Application><ArchiveBrowser start="documents" /></Application>
</Story>

<!-- One document with its versions, metadata and history. -->
<Story name="Archive browser — document" asChild>
  <Application><ArchiveBrowser start="detail" /></Application>
</Story>

<!--
Ask a question, get a streamed answer: a two-column `Grid` (controls stick while the answer
scrolls) with Composer, preset Buttons, Disclosures holding Sliders and a mono CheckboxGroup;
ResultPanel with streaming Markdown, a grounding Alert and source / tool Tags. Header:
DE/EN SegmentedControl and a "Clear cache" ConfirmDialog.
-->
<Story name="Assistant" asChild>
  <Application><AssistantPage /></Application>
</Story>

<!--
A document browser: Tabs for the sections and the page-wide Upload action in the header (Dialog
with FileDropzone and progress), a panel `Section` with SearchField, a "Judge summaries"
JobStatus run, a DataTable with CopyButton URNs, keyword Tags, Stars, and an expandable row with
Links, Markdown and a VersionRail.
-->
<Story name="Documents" asChild>
  <Application><DocumentLibrary /></Application>
</Story>

<!--
A two-pane translator: SplitPane with Select headers, a `Spacer` before the status and copy
button, a plain Textarea with counter, LoadingOverlay while translating, swap button, and the
submit Button right-aligned in a `Row`.
-->
<Story name="Translator" asChild>
  <Application><TranslatorPage /></Application>
</Story>

<!--
Hosted workspaces with polling on a medium-width Page: one panel `Section` with "New" in its
actions and Tabs inside, a ResourceList with status badges, open / start-stop / ConfirmButton
delete actions, a StatusText of the last check, and a Dialog with Field, SegmentedControl and
RadioGroup to create one.
-->
<Story name="Workspaces" asChild>
  <Application><WorkspaceConsole /></Application>
</Story>
