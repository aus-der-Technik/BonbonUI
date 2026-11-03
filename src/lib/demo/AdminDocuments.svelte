<script lang="ts">
  /**
   * Admin console · Documents (Storybook only): collections → their documents → one document
   * with its versions and history. The documents table carries the AI judge's rating of each
   * summary (rated in a polled background run), takes uploads as highlighted "staged" rows, and
   * exports a selection as one ZIP right above the selection.
   */
  import { onDestroy, onMount, untrack } from 'svelte';
  import Grid from '../patterns/layout/Grid.svelte';
  import Row from '../patterns/layout/Row.svelte';
  import Section from '../patterns/layout/Section.svelte';
  import Spacer from '../patterns/layout/Spacer.svelte';
  import Stack from '../patterns/layout/Stack.svelte';
  import Badge from '../patterns/atoms/Badge.svelte';
  import Button from '../patterns/atoms/Button.svelte';
  import Card from '../patterns/atoms/Card.svelte';
  import Input from '../patterns/atoms/Input.svelte';
  import Link from '../patterns/atoms/Link.svelte';
  import LoadingBar from '../patterns/atoms/LoadingBar.svelte';
  import ProgressBar from '../patterns/atoms/ProgressBar.svelte';
  import Select from '../patterns/atoms/Select.svelte';
  import Stars from '../patterns/atoms/Stars.svelte';
  import StatusText from '../patterns/atoms/StatusText.svelte';
  import Tag from '../patterns/atoms/Tag.svelte';
  import Tooltip from '../patterns/atoms/Tooltip.svelte';
  import { changeCue } from '../patterns/atoms/changed';
  import Breadcrumbs, { type Crumb } from '../patterns/molecules/Breadcrumbs.svelte';
  import CopyButton from '../patterns/molecules/CopyButton.svelte';
  import DetailList from '../patterns/molecules/DetailList.svelte';
  import Disclosure from '../patterns/molecules/Disclosure.svelte';
  import Field from '../patterns/molecules/Field.svelte';
  import FileDropzone from '../patterns/molecules/FileDropzone.svelte';
  import FilterBar from '../patterns/molecules/FilterBar.svelte';
  import JobStatus from '../patterns/molecules/JobStatus.svelte';
  import Markdown from '../patterns/molecules/Markdown.svelte';
  import Pager from '../patterns/molecules/Pager.svelte';
  import SearchField from '../patterns/molecules/SearchField.svelte';
  import SegmentedControl from '../patterns/molecules/SegmentedControl.svelte';
  import VersionRail from '../patterns/molecules/VersionRail.svelte';
  import DataTable, { type Column, type SortOrder } from '../patterns/organisms/DataTable.svelte';
  import Dialog from '../patterns/organisms/Dialog.svelte';
  import HorizontalBarChart from '../patterns/organisms/HorizontalBarChart.svelte';
  import { celebrate } from '../utils/delight';
  import { dateTimeFormat, decimalFormat, numberFormat } from '../utils/format';
  import { every } from '../utils/poll';
  import AdminDocumentsExport from './AdminDocumentsExport.svelte';
  import AdminHead from './AdminHead.svelte';
  import { bytes, clockFormat, type SectionProps } from './admin';
  import {
    CRITERIA,
    archiveCollections,
    archivedDocuments,
    overallScore,
    ratingFails,
    scoreDocument,
    stagedDocument,
    type ArchiveCollection,
    type ArchivedVersion,
    type CriterionKey,
    type LibraryDocument,
    type RatingStatus,
  } from './mock-ops';

  interface Props extends SectionProps {
    /** Which level the browser opens on (the first collection and document are picked). */
    view?: 'collections' | 'documents' | 'detail';
    /** A "Rate all" run starts as soon as the section opens. */
    ratingRun?: boolean;
    /** Some documents are selected and their export is in this state. */
    exportState?: 'none' | 'processing' | 'completed' | 'failed' | 'expired';
  }

  let {
    active = true,
    notify,
    onnavigate,
    view = 'collections',
    ratingRun = false,
    exportState = 'none',
  }: Props = $props();

  const PAGE_SIZE = 10;
  const POLL_MS = 2000;
  const DAY = 86_400_000;
  const NOW = Date.UTC(2026, 9, 19, 14, 0);

  // A run or an export needs a collection to happen in: those args open "Reports".
  let collectionId = $derived<string | null>(
    view !== 'collections' || ratingRun || exportState !== 'none' ? 'reports' : null,
  );
  let docId = $derived<string | null>(view === 'detail' ? 'reports-100' : null);
  // The version shown, per document: each one remembers its own.
  let versionOf = $state<Record<string, string>>({});

  let query = $state('');
  let keyword = $state('');
  let format = $state('');
  let versions = $state('');
  let archived = $state('');
  let status = $state<'all' | RatingStatus>('all');
  let sort = $state('archived');
  let order = $state<SortOrder>('desc');
  let offset = $state(0);
  let loading = $state(false);
  let selectedIds = $state<string[]>([]);
  let archiveName = $state('');
  let exporting = $state(false);
  let exportShowing = $state(false);
  let exporter = $state<ReturnType<typeof AdminDocumentsExport>>();
  let fresh = $state<string | null>(null);
  let uploading = $state(false);
  let uploadOrigin = $state<Element | undefined>();
  let file = $state<File | null>(null);
  let progress = $state<number | null>(null);
  let uploads = 0;

  // ------------------------------------------------------------ the "server"
  // The documents and the rating worker live here; the page only sees them through sync().
  const server: Record<string, LibraryDocument[]> = {};
  const serverDocs = (id: string) => (server[id] ??= archivedDocuments(id));
  const run = { number: 0, total: 0, done: 0 };
  let worker: ReturnType<typeof setInterval> | undefined;
  let stopPolling: (() => void) | undefined;

  let docs = $state<LibraryDocument[]>([]);
  let progressOf = $state({ total: 0, done: 0 });
  let checked = $state<Date | null>(null);
  // Which button started the run that is going: only that one is busy.
  let runBy = $state<'all' | 'rerate' | null>(null);
  let runPanel = $state<HTMLElement | undefined>();

  const collection = $derived(archiveCollections.find((c) => c.id === collectionId));
  const doc = $derived(docs.find((d) => d.id === docId));
  const latest = (d: LibraryDocument) => d.versions[d.versions.length - 1] as ArchivedVersion;
  const current = $derived(
    doc
      ? (doc.versions.find((v) => `v${v.version}` === versionOf[doc.id]) ?? latest(doc))
      : undefined,
  );

  const count = (s: RatingStatus) => docs.filter((d) => d.rating === s && !d.staged).length;
  const counts = $derived({
    rated: count('rated'),
    unrated: count('unrated'),
    queued: count('queued'),
    failed: count('failed'),
    skipped: count('skipped'),
  });
  const running = $derived(counts.queued > 0);
  const scored = $derived(docs.filter((d) => d.rating === 'rated' && d.scores));
  const scoreOf = (d: LibraryDocument) => (d.scores ? overallScore(d.scores) : 0);
  const average = $derived(
    scored.length ? scored.reduce((sum, d) => sum + scoreOf(d), 0) / scored.length : 0,
  );
  const criterionAverage = (key: CriterionKey) =>
    scored.length ? scored.reduce((sum, d) => sum + (d.scores?.[key] ?? 0), 0) / scored.length : 0;
  const histogram = $derived(
    [5, 4, 3, 2, 1].map((stars) => ({
      label: `${stars}★`,
      title: `${stars} ${stars === 1 ? 'star' : 'stars'}`,
      value: scored.filter((d) => scoreOf(d) === stars).length,
      color: `var(--star-${stars})`,
    })),
  );

  const formats = $derived([...new Set(docs.map((d) => d.format))]);
  const needle = $derived(query.trim().toLowerCase());
  const ratingKey = (d: LibraryDocument) =>
    d.rating === 'rated' ? scoreOf(d) : d.rating === 'failed' ? -1 : -2;
  const filtered = $derived(
    docs
      .filter(
        (d) =>
          !needle ||
          d.title.toLowerCase().includes(needle) ||
          d.id.includes(needle) ||
          d.urn.includes(needle),
      )
      .filter((d) => !keyword || d.keywords.includes(keyword))
      .filter((d) => !format || d.format === format)
      .filter(
        (d) =>
          !versions || (versions === 'single' ? d.versions.length === 1 : d.versions.length > 1),
      )
      .filter((d) => !archived || NOW - Date.parse(latest(d).archivedAt) <= Number(archived) * DAY)
      .filter((d) => status === 'all' || d.rating === status)
      .sort((a, b) => {
        // Staged uploads stay on top until the next ingestion run.
        if (a.staged !== b.staged) return a.staged ? -1 : 1;
        const delta =
          sort === 'size'
            ? latest(a).bytes - latest(b).bytes
            : sort === 'versions'
              ? a.versions.length - b.versions.length
              : sort === 'rating'
                ? ratingKey(a) - ratingKey(b)
                : latest(a).archivedAt.localeCompare(latest(b).archivedAt);
        return order === 'asc' ? delta : -delta;
      }),
  );
  const page = $derived(filtered.slice(offset, offset + PAGE_SIZE));
  const narrowed = $derived(
    !!(needle || keyword || format || versions || archived || status !== 'all'),
  );
  const selected = $derived(docs.filter((d) => selectedIds.includes(d.id)));

  const crumbs = $derived<Crumb[]>([
    { label: 'Collections', href: '#collections' },
    ...(collection ? [{ label: collection.name, href: '#documents' }] : []),
    ...(doc ? [{ label: doc.title }] : []),
  ]);

  const collectionColumns: Column[] = [
    { key: 'name', label: 'Collection' },
    { key: 'documents', label: 'Documents', align: 'end', nowrap: true },
    { key: 'size', label: 'Size', align: 'end', nowrap: true, hideOnMobile: true },
    { key: 'updated', label: 'Updated', nowrap: true, hideOnMobile: true },
  ];
  const documentColumns: Column[] = [
    { key: 'title', label: 'Document' },
    { key: 'access', label: 'Access', nowrap: true, hideOnMobile: true },
    { key: 'rating', label: 'Summary rating', sortable: true },
    { key: 'versions', label: 'Versions', sortable: true, nowrap: true, hideOnMobile: true },
    { key: 'size', label: 'Size', align: 'end', sortable: true, nowrap: true, hideOnMobile: true },
    { key: 'archived', label: 'Archived', sortable: true, nowrap: true, hideOnMobile: true },
  ];
  const historyColumns: Column[] = [
    { key: 'version', label: 'Version', nowrap: true },
    { key: 'archived', label: 'Archived', nowrap: true },
    { key: 'size', label: 'Size', align: 'end', nowrap: true, hideOnMobile: true },
    { key: 'note', label: 'Change', hideOnMobile: true },
    { key: 'download', label: 'Download', align: 'end' },
  ];

  const when = (iso: string) => dateTimeFormat.format(new Date(iso));
  const shortSum = (checksum: string) =>
    checksum.length > 20 ? `${checksum.slice(0, 13)}…${checksum.slice(-4)}` : checksum;
  const downloadHref = (d: LibraryDocument, v: ArchivedVersion) =>
    `https://example.com/archive/${d.id}/v${v.version}.${d.format}`;
  const scoreLine = (d: LibraryDocument) =>
    d.scores ? CRITERIA.map((c) => `${c.label} ${d.scores?.[c.key]}/5`).join(' · ') : '';

  function sync() {
    const wasRunning = running;
    docs = collectionId ? serverDocs(collectionId).map((d) => ({ ...d })) : [];
    progressOf = { total: run.total, done: run.done };
    checked = new Date();
    if (wasRunning && !running) {
      const failed = counts.failed;
      if (runBy && !failed && runPanel) celebrate(runPanel);
      if (!active)
        notify?.(`Rating finished: ${counts.rated} rated${failed ? ` · ${failed} failed` : ''}`, {
          ...(failed ? { tone: 'warn' as const } : {}),
          action: { label: 'Open', onaction: () => onnavigate?.('documents') },
        });
      runBy = null;
    }
  }

  // A new collection (or the story's args) loads its documents.
  $effect(() => {
    void collectionId;
    untrack(sync);
  });

  function work() {
    const next = Object.values(server)
      .flat()
      .find((d) => d.rating === 'queued');
    if (!next) {
      clearInterval(worker);
      worker = undefined;
      return;
    }
    if (ratingFails(next.id, run.number)) {
      next.rating = 'failed';
      next.reason = 'Judge timed out after 60 s';
    } else {
      next.rating = 'rated';
      next.scores = scoreDocument(next.id, run.number);
      delete next.reason;
    }
    run.done += 1;
  }

  /** Queues documents on the "server", then polls until the queue is empty. */
  function enqueue(ids: string[]) {
    if (!ids.length || !collectionId) return;
    if (!worker) {
      run.total = 0;
      run.done = 0;
    }
    run.number += 1;
    for (const d of serverDocs(collectionId)) {
      if (ids.includes(d.id) && d.rating !== 'queued') {
        d.rating = 'queued';
        run.total += 1;
      }
    }
    worker ??= setInterval(work, 260);
    sync();
    stopPolling ??= every(() => {
      sync();
      if (!worker) {
        stopPolling?.();
        stopPolling = undefined;
      }
    }, POLL_MS);
  }

  const idsWhere = (test: (d: LibraryDocument) => boolean) =>
    docs.filter((d) => !d.staged && test(d)).map((d) => d.id);

  function rateAll() {
    runBy = 'all';
    enqueue(idsWhere((d) => d.rating === 'unrated' || d.rating === 'failed'));
  }

  function rerateAll() {
    runBy = 'rerate';
    enqueue(idsWhere((d) => d.rating !== 'skipped'));
  }

  function refresh() {
    loading = true;
    setTimeout(() => {
      sync();
      loading = false;
    }, 700);
  }

  function openCollection(c: ArchiveCollection) {
    collectionId = c.id;
    docId = null;
    query = keyword = format = versions = archived = '';
    status = 'all';
    selectedIds = [];
    offset = 0;
  }

  function openDocument(d: LibraryDocument) {
    docId = d.id;
    document.getElementById('documents-top')?.scrollIntoView({ block: 'start' });
  }

  // Breadcrumbs only take hrefs; catch their clicks here to switch views without a router.
  function crumb(event: MouseEvent) {
    const href = (event.target as Element | null)?.closest('a')?.getAttribute('href');
    if (!href) return;
    event.preventDefault();
    docId = null;
    if (href === '#collections') collectionId = null;
  }

  function onsort(key: string) {
    order = sort === key && order === 'desc' ? 'asc' : 'desc';
    sort = key;
    offset = 0;
  }

  function filterBy(k: string) {
    keyword = k;
    offset = 0;
  }

  function upload() {
    progress = 0;
    const timer = setInterval(() => {
      progress = Math.min(1, (progress ?? 0) + 0.1);
      if (progress < 1 || !file || !collectionId) return;
      clearInterval(timer);
      const staged = stagedDocument(collectionId, file, ++uploads);
      serverDocs(collectionId).unshift(staged);
      // The new row must be visible: whatever hides it in this table steps aside.
      query = keyword = format = versions = archived = '';
      status = 'all';
      offset = 0;
      sync();
      fresh = staged.id;
      setTimeout(() => {
        uploading = false;
        progress = null;
        file = null;
      }, 250);
    }, 100);
  }

  /** A staged upload can be taken back; the row is gone, so the undo lives in a toast. */
  function unstage(d: LibraryDocument) {
    if (!collectionId) return;
    const list = serverDocs(collectionId);
    const at = list.findIndex((x) => x.id === d.id);
    if (at < 0) return;
    const [removed] = list.splice(at, 1);
    selectedIds = selectedIds.filter((id) => id !== d.id);
    sync();
    notify?.(`Removed “${d.title}” from the upload queue`, {
      action: {
        label: 'Undo',
        onaction: () => {
          if (removed) list.splice(at, 0, removed);
          sync();
          fresh = null;
          requestAnimationFrame(() => (fresh = d.id));
        },
      },
    });
  }

  onMount(() => {
    if (ratingRun) rateAll();
    if (exportState !== 'none') {
      archiveName = 'q3-reports';
      selectedIds = filtered.slice(0, 6).map((d) => d.id);
    }
  });

  onDestroy(() => {
    clearInterval(worker);
    stopPolling?.();
  });
</script>

{#snippet ratingCell(d: LibraryDocument)}
  <span class="rating" use:changeCue={`${d.rating}:${d.scores ? scoreLine(d) : ''}`}>
    {#if d.staged}
      <span class="muted">After ingestion</span>
    {:else if d.rating === 'rated' && d.scores}
      <Tooltip text={scoreLine(d)}>
        <Stars value={scoreOf(d)} showValue locale="en" />
      </Tooltip>
      <Button size="xs" variant="ghost" label="Re-rate" onclick={() => enqueue([d.id])} />
    {:else if d.rating === 'queued'}
      <StatusText busy message="Queued…" />
    {:else if d.rating === 'failed'}
      <Tooltip text={d.reason ?? 'The judge did not answer'}>
        <Tag tone="danger" label="Failed" />
      </Tooltip>
      <Button size="xs" icon="refresh" label="Retry" onclick={() => enqueue([d.id])} />
    {:else if d.rating === 'skipped'}
      <Tooltip text={d.reason ?? 'Not suitable for rating'}>
        <span class="muted">Skipped</span>
      </Tooltip>
    {:else}
      <span class="muted">Not rated</span>
      <Button size="xs" label="Rate" onclick={() => enqueue([d.id])} />
    {/if}
  </span>
{/snippet}

{#snippet accessTag(d: LibraryDocument)}
  <!-- 90/10: access is neutral; only the exception (cannot leave the archive) gets a tone. -->
  <Tag
    label={d.access}
    tone={d.access === 'restricted' ? 'warn' : 'neutral'}
    title={d.access === 'restricted' ? 'Stays in the archive: not exported' : undefined}
  />
{/snippet}

{#snippet exportActions()}
  <Input
    size="sm"
    bind:value={archiveName}
    placeholder="Archive name (optional)"
    aria-label="Archive name"
    autocomplete="off"
    class="archive-name"
  />
  <Button
    size="sm"
    variant="primary"
    icon="download"
    label="Export selected"
    busyLabel="Exporting…"
    busy={exporting}
    onclick={() => exporter?.begin()}
  />
{/snippet}

{#snippet exportJob()}
  <AdminDocumentsExport
    bind:this={exporter}
    bind:working={exporting}
    onshowing={(on) => (exportShowing = on)}
    {selected}
    name={archiveName}
    start={exportState}
    {active}
    {notify}
    {onnavigate}
  />
{/snippet}

{#snippet collectionCell(c: ArchiveCollection, column: Column)}
  {#if column.key === 'name'}
    <span class="title">{c.name}</span>
    <span class="muted">{c.description}</span>
  {:else if column.key === 'documents'}
    <span class="figure">{numberFormat.format(c.documents)}</span>
  {:else if column.key === 'size'}
    <span class="muted">{bytes(c.bytes)}</span>
  {:else}
    <span class="muted">{when(c.updatedAt)}</span>
  {/if}
{/snippet}

{#snippet documentCell(d: LibraryDocument, column: Column)}
  {@const last = latest(d)}
  {#if column.key === 'title'}
    <span class="doc">
      <Row gap="xs" wrap={false}>
        <button type="button" class="open" onclick={() => openDocument(d)}>{d.title}</button>
        {#if d.staged}<Badge size="sm" tone="draft" label="Staged" />{/if}
      </Row>
      <span class="urn">
        <CopyButton size="xs" value={d.urn} label="Copy URN {d.urn}">{d.urn}</CopyButton>
      </span>
      {#if d.keywords.length}
        <Row gap="xs">
          {#each d.keywords as k (k)}
            <Tag label={k} title="Show only “{k}”" onclick={() => filterBy(k)} />
          {/each}
        </Row>
      {/if}
    </span>
  {:else if column.key === 'access'}
    {@render accessTag(d)}
  {:else if column.key === 'rating'}
    {@render ratingCell(d)}
  {:else if column.key === 'versions'}
    <span class="figure">v{last.version}</span>
    <span class="muted"> · {d.versions.length}</span>
  {:else if column.key === 'size'}
    <span class="muted">{bytes(last.bytes)}</span>
  {:else}
    <span class="muted">{when(last.archivedAt)}</span>
  {/if}
{/snippet}

{#snippet criteria(d: LibraryDocument)}
  {#if d.scores && d.rating === 'rated'}
    <Grid min="10rem" gap="md">
      {#each CRITERIA as criterion (criterion.key)}
        {@const score = d.scores[criterion.key]}
        <Stack gap="xs">
          <Row gap="sm" wrap={false}>
            <span class="criterion">{criterion.label}</span>
            <Spacer />
            <span class="figure-sm">{score}/5</span>
          </Row>
          <ProgressBar
            value={score}
            max={5}
            label="{criterion.label}: {score} of 5"
            tone={score <= 2 ? 'warn' : 'accent'}
          />
        </Stack>
      {/each}
    </Grid>
  {:else}
    <StatusText
      tone={d.rating === 'failed' ? 'error' : 'muted'}
      message={d.reason ?? 'No scores yet — rate the summary to see them per criterion.'}
    />
  {/if}
{/snippet}

{#snippet links(d: LibraryDocument)}
  <Row gap="md">
    <Link href="https://{d.source}/{d.id}" external>Source</Link>
    <Link href="https://example.com/archive/{d.id}.md" external>Markdown</Link>
    <Link href={d.hasOriginal ? downloadHref(d, latest(d)) : null} missingLabel="no original"
      >Original</Link
    >
    <Link href="https://example.com/archive/{d.id}/meta.json" external>Metadata</Link>
  </Row>
{/snippet}

{#snippet documentDetail(d: LibraryDocument)}
  <Card surface="subtle" padding="sm">
    <Stack gap="md">
      {@render criteria(d)}
      <Markdown size="sm" source={d.summary} />
      <Row gap="sm">
        {@render links(d)}
        <Spacer />
        {#if d.staged}
          <Button
            size="sm"
            variant="ghost"
            icon="trash"
            label="Remove"
            onclick={() => unstage(d)}
          />
        {/if}
        <Button
          size="sm"
          icon="arrow-right"
          label="Versions & history"
          onclick={() => openDocument(d)}
        />
      </Row>
    </Stack>
  </Card>
{/snippet}

{#snippet historyCell(v: ArchivedVersion, column: Column)}
  {#if column.key === 'version'}
    <Row gap="xs" wrap={false}>
      <span class="figure">v{v.version}</span>
      {#if doc && v === latest(doc)}<Badge size="sm" tone="live" label="Latest" />{/if}
    </Row>
  {:else if column.key === 'archived'}
    <span class="muted">{when(v.archivedAt)}</span>
  {:else if column.key === 'size'}
    <span class="muted">{bytes(v.bytes)}</span>
  {:else if column.key === 'note'}
    {v.note}
  {:else if doc}
    <Button
      size="sm"
      variant="ghost"
      icon="download"
      iconOnly
      label="Download v{v.version}"
      href={downloadHref(doc, v)}
    />
  {/if}
{/snippet}

<div class="documents" id="documents-top">
  <AdminHead section="documents" />

  {#if collection}
    <Row onclick={crumb}>
      <Breadcrumbs items={crumbs} />
    </Row>
  {/if}

  {#if doc && collection && current}
    {@const last = latest(doc)}
    <Section
      level="panel"
      title={doc.title}
      description="{collection.name} · {doc.id} · {doc.versions.length} {doc.versions.length === 1
        ? 'version'
        : 'versions'}"
    >
      {#snippet actions()}
        {#if current !== last}
          <Button icon="download" label="Download latest" href={downloadHref(doc, last)} />
        {/if}
        <Button
          variant="primary"
          icon="download"
          label="Download v{current.version}"
          href={downloadHref(doc, current)}
        />
      {/snippet}
      <VersionRail
        label="Versions"
        markLabel="latest"
        value="v{current.version}"
        onchange={(next) => (versionOf = { ...versionOf, [doc.id]: next })}
        items={doc.versions.map((v) => ({
          value: `v${v.version}`,
          label: `v${v.version}`,
          marked: v === last,
          title: when(v.archivedAt),
        }))}
      />
    </Section>

    <Grid columns="minmax(0, 2fr) minmax(0, 3fr)" collapse="lg" align="start">
      <Stack gap="lg">
        <Section level="panel" heading={3} title="Metadata">
          {#snippet actions()}
            {#if !doc.staged}
              <CopyButton size="sm" value={current.checksum} label="Copy checksum" />
            {/if}
          {/snippet}
          <DetailList
            items={[
              {
                label: 'Version',
                value: `v${current.version}${current === last ? ' (latest)' : ''}`,
              },
              { label: 'Checksum', value: shortSum(current.checksum), mono: true },
              { label: 'Size', value: bytes(current.bytes) },
              { label: 'Content type', value: current.contentType, mono: true },
              { label: 'Archived at', value: when(current.archivedAt) },
              { label: 'URN', value: doc.urn, mono: true },
            ]}
          />
          <Row gap="sm">{@render accessTag(doc)}<Badge size="sm" label={doc.format} /></Row>
        </Section>
        <Section level="panel" heading={3} title="Summary">
          {#snippet actions()}
            <span class="cell">{@render ratingCell(doc)}</span>
          {/snippet}
          {@render criteria(doc)}
          <Markdown size="sm" source={doc.summary} />
          {@render links(doc)}
        </Section>
      </Stack>
      <Section
        level="panel"
        heading={3}
        title="History"
        description="Newest first · pick a row to view that version"
      >
        <DataTable
          columns={historyColumns}
          rows={[...doc.versions].reverse()}
          rowKey={(v) => `v${v.version}`}
          cell={historyCell}
          current="v{current.version}"
          onrowclick={(v) => (versionOf = { ...versionOf, [doc.id]: `v${v.version}` })}
        />
      </Section>
    </Grid>
  {:else if collection}
    <Section
      level="panel"
      title={collection.name}
      description="{collection.description} · {numberFormat.format(
        filtered.length,
      )} of {numberFormat.format(docs.length)} documents"
    >
      {#snippet actions()}
        <Button
          variant="secondary"
          icon="refresh"
          label="Refresh"
          busy={loading}
          busyLabel="Refreshing…"
          onclick={refresh}
        />
        <Button
          variant="primary"
          icon="upload"
          label="Upload"
          onclick={(event) => {
            uploadOrigin = event.currentTarget;
            uploading = true;
          }}
        />
      {/snippet}
      <LoadingBar active={loading} label="Refreshing documents" />

      <div class="run" bind:this={runPanel} data-note="rating-run">
        <Row gap="sm" align="center">
          <div class="run-status">
            <JobStatus
              status={running ? 'running' : progressOf.total ? 'done' : 'idle'}
              step={running
                ? 'the judge reads each summary'
                : checked
                  ? `checked ${clockFormat.format(checked)}`
                  : undefined}
              done={running ? progressOf.done : undefined}
              total={running ? progressOf.total : undefined}
              detail="{counts.rated} rated · {counts.unrated} not rated · {counts.failed} failed · {counts.skipped} skipped"
              labels={{ idle: 'Summaries', running: 'Rating', done: 'Rated' }}
            />
          </div>
          <Button
            size="sm"
            variant="primary"
            icon="sparkles"
            label="Rate all"
            busyLabel="Rating…"
            busy={running && runBy === 'all'}
            disabled={(running && runBy !== 'all') || (!counts.unrated && !counts.failed)}
            onclick={rateAll}
          />
          <Button
            size="sm"
            icon="refresh"
            label="Re-rate all"
            busyLabel="Re-rating…"
            busy={running && runBy === 'rerate'}
            disabled={running && runBy !== 'rerate'}
            onclick={rerateAll}
          />
        </Row>
        <Disclosure
          title="Scores"
          meta={scored.length
            ? `average ${decimalFormat.format(average)} ★ over ${scored.length} summaries`
            : 'nothing rated yet'}
        >
          <Grid columns="minmax(0, 1fr) minmax(0, 1fr)" collapse="md" gap="lg">
            <HorizontalBarChart
              data={histogram}
              countLabel="Summaries"
              label="Summaries by stars"
            />
            <Stack gap="sm">
              {#each CRITERIA as criterion (criterion.key)}
                {@const value = criterionAverage(criterion.key)}
                <Stack gap="xs">
                  <Row gap="sm" wrap={false}>
                    <span class="criterion" title={criterion.description}>{criterion.label}</span>
                    <Spacer />
                    <span class="figure-sm"
                      >{scored.length ? decimalFormat.format(value) : '–'}</span
                    >
                  </Row>
                  <ProgressBar
                    {value}
                    max={5}
                    size="sm"
                    label="{criterion.label}: average {decimalFormat.format(value)}"
                  />
                </Stack>
              {/each}
            </Stack>
          </Grid>
        </Disclosure>
      </div>

      <FilterBar label="Filter documents">
        <SearchField
          label="Search documents"
          placeholder="Title, ID or URN"
          bind:value={query}
          oninput={() => (offset = 0)}
        />
        <Field label="Format">
          {#snippet children({ id })}
            <Select
              {id}
              bind:value={format}
              onchange={() => (offset = 0)}
              options={[
                { value: '', label: 'All formats' },
                ...formats.map((f) => ({ value: f, label: f.toUpperCase() })),
              ]}
            />
          {/snippet}
        </Field>
        <Field label="Versions">
          {#snippet children({ id })}
            <Select
              {id}
              bind:value={versions}
              onchange={() => (offset = 0)}
              options={[
                { value: '', label: 'Any' },
                { value: 'single', label: 'Only one' },
                { value: 'several', label: 'Several' },
              ]}
            />
          {/snippet}
        </Field>
        <Field label="Archived">
          {#snippet children({ id })}
            <Select
              {id}
              bind:value={archived}
              onchange={() => (offset = 0)}
              options={[
                { value: '', label: 'Any time' },
                { value: '7', label: 'Last 7 days' },
                { value: '30', label: 'Last 30 days' },
              ]}
            />
          {/snippet}
        </Field>
        <Field label="Summary" group>
          {#snippet children({ labelId })}
            <SegmentedControl
              labelledby={labelId}
              size="sm"
              wrap
              value={status}
              onchange={(next) => {
                status = next;
                offset = 0;
              }}
              options={[
                { value: 'all', label: 'All' },
                { value: 'rated', label: 'Rated' },
                { value: 'unrated', label: 'Not rated' },
                { value: 'failed', label: 'Failed' },
                { value: 'skipped', label: 'Skipped' },
              ]}
            />
          {/snippet}
        </Field>
      </FilterBar>
      {#if keyword}
        <Row gap="xs">
          <Tag label="Keyword: {keyword}" onremove={() => (keyword = '')} />
        </Row>
      {/if}

      <div class="table" data-note="documents-table">
        <DataTable
          columns={documentColumns}
          rows={page}
          rowKey={(d) => d.id}
          cell={documentCell}
          detail={documentDetail}
          selectable
          bind:selected={selectedIds}
          selectRowLabel={(d) => `Select ${d.title}`}
          selectionBar={exportShowing ? 'always' : 'auto'}
          selectionHint="Tick documents to export them as one ZIP."
          selectionActions={exportActions}
          selectionDetail={exportJob}
          highlight={fresh ?? undefined}
          singleOpen
          {sort}
          {order}
          {onsort}
          filtered={narrowed}
          emptyMessage={narrowed
            ? 'No documents match these filters — loosen one to see more.'
            : 'This collection is empty. Upload a file to start it.'}
        />
      </div>
      <Pager
        {offset}
        limit={PAGE_SIZE}
        total={filtered.length}
        count={page.length}
        onpage={(next) => (offset = next)}
      />
    </Section>
  {:else}
    <Section
      level="panel"
      title="Collections"
      description="{archiveCollections.length} collections · every upload is kept as a version"
    >
      {#snippet actions()}
        <Button
          variant="secondary"
          icon="refresh"
          label="Refresh"
          busy={loading}
          busyLabel="Refreshing…"
          onclick={refresh}
        />
      {/snippet}
      <LoadingBar active={loading} label="Refreshing collections" />
      <DataTable
        columns={collectionColumns}
        rows={archiveCollections}
        rowKey={(c) => c.id}
        cell={collectionCell}
        onrowclick={openCollection}
      />
    </Section>
  {/if}
</div>

<Dialog
  open={uploading}
  title="Upload to {collection?.name ?? 'the archive'}"
  intro="It joins the table as a staged row and is ingested with the next run."
  width="34rem"
  origin={uploadOrigin}
  dismissible={progress == null}
  onclose={() => (uploading = false)}
>
  <FileDropzone
    bind:file
    accept=".pdf,.html,.htm,.txt,.md,.markdown,.docx"
    maxBytes={100 * 1024 * 1024}
    hint="PDF, HTML, text, Markdown or Word · up to 100 MB"
    {progress}
  />
  {#snippet actions()}
    <Button label="Cancel" disabled={progress != null} onclick={() => (uploading = false)} />
    <Button
      variant="primary"
      icon="upload"
      label="Upload"
      busyLabel="Uploading…"
      busy={progress != null}
      disabled={!file}
      onclick={upload}
    />
  {/snippet}
</Dialog>

<style>
  .documents {
    display: flex;
    flex-direction: column;
    gap: var(--space-5);
    min-width: 0;
    scroll-margin-top: calc(var(--page-top, 0px) + var(--space-4));
  }
  .title {
    display: block;
    font-weight: var(--fw-semibold);
  }
  .documents :global(.archive-name) {
    width: 13rem;
    max-width: 100%;
  }
  .doc {
    display: grid;
    gap: var(--space-1);
    justify-items: start;
  }
  .open {
    padding: 0;
    border: 0;
    background: none;
    font: inherit;
    font-weight: var(--fw-semibold);
    color: var(--text);
    text-align: start;
    cursor: pointer;
  }
  .open:hover {
    color: var(--accent-ink);
    text-decoration: underline;
    text-underline-offset: 0.2em;
  }
  .open:focus-visible {
    outline: var(--focus-ring, 2px solid var(--accent));
    outline-offset: 2px;
    border-radius: var(--radius-xs);
  }
  .urn {
    font-family: var(--font-mono);
    font-size: var(--fs-xs);
    color: var(--text-3);
  }
  .rating {
    display: inline-flex;
    flex-wrap: wrap;
    align-items: center;
    row-gap: var(--space-1);
    gap: var(--space-2);
    border-radius: var(--radius-sm);
  }
  .cell {
    display: inline-flex;
  }
  .muted {
    color: var(--text-3);
    font-size: var(--fs-sm);
  }
  .figure {
    font-weight: var(--fw-semibold);
    font-variant-numeric: tabular-nums;
  }
  .criterion {
    font-size: var(--fs-sm);
    font-weight: var(--fw-semibold);
  }
  .figure-sm {
    font-size: var(--fs-sm);
    font-weight: var(--fw-semibold);
    font-variant-numeric: tabular-nums;
    color: var(--text-2);
  }
  .run {
    display: grid;
    gap: var(--space-2);
    padding: var(--space-3);
    border-radius: var(--radius-md);
    border: 1px solid var(--border-strong);
  }
  .run-status {
    flex: 1 1 18rem;
    min-width: 0;
  }
  .table {
    min-width: 0;
  }
  /* On a phone the table keeps document and rating; the URN waits in the detail view. */
  @media (max-width: 700px) {
    .urn {
      display: none;
    }
  }
</style>
