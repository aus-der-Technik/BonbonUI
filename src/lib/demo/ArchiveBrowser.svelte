<script lang="ts">
  /** Example page: browse a versioned document archive — collections, documents, versions — mock data (Storybook only). */
  import Page from '../patterns/templates/Page.svelte';
  import Grid from '../patterns/layout/Grid.svelte';
  import Row from '../patterns/layout/Row.svelte';
  import Section from '../patterns/layout/Section.svelte';
  import Badge from '../patterns/atoms/Badge.svelte';
  import Button from '../patterns/atoms/Button.svelte';
  import Select from '../patterns/atoms/Select.svelte';
  import Breadcrumbs, { type Crumb } from '../patterns/molecules/Breadcrumbs.svelte';
  import CopyButton from '../patterns/molecules/CopyButton.svelte';
  import DetailList from '../patterns/molecules/DetailList.svelte';
  import Field from '../patterns/molecules/Field.svelte';
  import FilterBar from '../patterns/molecules/FilterBar.svelte';
  import Pager from '../patterns/molecules/Pager.svelte';
  import SearchField from '../patterns/molecules/SearchField.svelte';
  import VersionRail from '../patterns/molecules/VersionRail.svelte';
  import DataTable, { type Column, type SortOrder } from '../patterns/organisms/DataTable.svelte';
  import { dateTimeFormat, numberFormat } from '../utils/format';
  import { formatBytes } from '../utils/upload';
  import {
    archiveCollections,
    archivedDocuments,
    type ArchiveCollection,
    type ArchivedDocument,
    type ArchivedVersion,
  } from './mock-ops';

  interface Props {
    /** Which level the page opens on (the first collection and document are picked). */
    start?: 'collections' | 'documents' | 'detail';
  }

  let { start = 'collections' }: Props = $props();

  const PAGE_SIZE = 10;
  const DAY = 86_400_000;
  const NOW = Date.UTC(2026, 9, 19, 14, 0);

  // svelte-ignore state_referenced_locally
  let collectionId = $state<string | null>(start === 'collections' ? null : 'reports');
  // svelte-ignore state_referenced_locally
  let docId = $state<string | null>(start === 'detail' ? 'reports-100' : null);
  let version = $state('');
  let query = $state('');
  let format = $state('');
  let versions = $state('');
  let archived = $state('');
  let sort = $state('archived');
  let order = $state<SortOrder>('desc');
  let offset = $state(0);

  const collection = $derived(archiveCollections.find((c) => c.id === collectionId));
  const docs = $derived(collectionId ? archivedDocuments(collectionId) : []);
  const doc = $derived(docs.find((d) => d.id === docId));
  const latest = (d: ArchivedDocument) => d.versions[d.versions.length - 1] as ArchivedVersion;
  const current = $derived(
    doc ? (doc.versions.find((v) => `v${v.version}` === version) ?? latest(doc)) : undefined,
  );

  const formats = $derived([...new Set(docs.map((d) => d.format))]);
  const needle = $derived(query.trim().toLowerCase());
  const filtered = $derived(
    docs
      .filter((d) => !needle || d.title.toLowerCase().includes(needle) || d.id.includes(needle))
      .filter((d) => !format || d.format === format)
      .filter(
        (d) =>
          !versions || (versions === 'single' ? d.versions.length === 1 : d.versions.length > 1),
      )
      .filter((d) => !archived || NOW - Date.parse(latest(d).archivedAt) <= Number(archived) * DAY)
      .sort((a, b) => {
        const delta =
          sort === 'size'
            ? latest(a).bytes - latest(b).bytes
            : sort === 'versions'
              ? a.versions.length - b.versions.length
              : latest(a).archivedAt.localeCompare(latest(b).archivedAt);
        return order === 'asc' ? delta : -delta;
      }),
  );
  const page = $derived(filtered.slice(offset, offset + PAGE_SIZE));

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
    { key: 'format', label: 'Format', nowrap: true },
    { key: 'latest', label: 'Latest', nowrap: true },
    { key: 'versions', label: 'Versions', align: 'end', sortable: true, hideOnMobile: true },
    { key: 'size', label: 'Size', align: 'end', sortable: true, nowrap: true, hideOnMobile: true },
    { key: 'archived', label: 'Archived', sortable: true, nowrap: true, hideOnMobile: true },
  ];
  const historyColumns: Column[] = [
    { key: 'version', label: 'Version', nowrap: true },
    { key: 'archived', label: 'Archived', nowrap: true },
    { key: 'size', label: 'Size', align: 'end', nowrap: true, hideOnMobile: true },
    { key: 'note', label: 'Change', hideOnMobile: true },
    { key: 'download', label: '', align: 'end' },
  ];

  const shortSum = (checksum: string) => `${checksum.slice(0, 13)}…${checksum.slice(-4)}`;
  const when = (iso: string) => dateTimeFormat.format(new Date(iso));
  const downloadHref = (d: ArchivedDocument, v: ArchivedVersion) =>
    `https://example.com/archive/${d.id}/v${v.version}.${d.format}`;

  function openCollection(c: ArchiveCollection) {
    collectionId = c.id;
    docId = null;
    query = format = versions = archived = '';
    offset = 0;
  }

  function openDocument(d: ArchivedDocument) {
    docId = d.id;
    version = `v${latest(d).version}`;
  }

  // Breadcrumbs only take hrefs; catch their link clicks here to switch views without a router.
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

  const resetPage = () => (offset = 0);
</script>

{#snippet collectionCell(c: ArchiveCollection, column: Column)}
  {#if column.key === 'name'}
    <span class="title">{c.name}</span>
    <span class="muted">{c.description}</span>
  {:else if column.key === 'documents'}
    <span class="figure">{numberFormat.format(c.documents)}</span>
  {:else if column.key === 'size'}
    <span class="muted">{formatBytes(c.bytes)}</span>
  {:else}
    <span class="muted">{when(c.updatedAt)}</span>
  {/if}
{/snippet}

{#snippet documentCell(d: ArchivedDocument, column: Column)}
  {@const last = latest(d)}
  {#if column.key === 'title'}
    <span class="title">{d.title}</span>
    <span class="id">{d.id}</span>
  {:else if column.key === 'format'}
    <Badge size="sm" label={d.format.toUpperCase()} />
  {:else if column.key === 'latest'}
    <span class="figure">v{last.version}</span>
  {:else if column.key === 'versions'}
    <span class="figure">{d.versions.length}</span>
  {:else if column.key === 'size'}
    <span class="muted">{formatBytes(last.bytes)}</span>
  {:else}
    <span class="muted">{when(last.archivedAt)}</span>
  {/if}
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
    <span class="muted">{formatBytes(v.bytes)}</span>
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

<Page title="Archive" subtitle="versioned documents" gap="md" footer="Example Corp · internal">
  <Row onclick={crumb}>
    <Breadcrumbs items={crumbs} />
  </Row>

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
        onchange={(next) => (version = next)}
        items={doc.versions.map((v) => ({
          value: `v${v.version}`,
          label: `v${v.version}`,
          marked: v === last,
          title: when(v.archivedAt),
        }))}
      />
    </Section>

    <Grid columns="minmax(0, 2fr) minmax(0, 3fr)" collapse="lg" align="start">
      <Section level="panel" title="Metadata">
        {#snippet actions()}
          <CopyButton size="sm" value={current.checksum} label="Copy checksum" />
        {/snippet}
        <DetailList
          items={[
            {
              label: 'Version',
              value: `v${current.version}${current === last ? ' (latest)' : ''}`,
            },
            { label: 'Checksum', value: shortSum(current.checksum), mono: true },
            { label: 'Size', value: formatBytes(current.bytes) },
            { label: 'Content type', value: current.contentType, mono: true },
            { label: 'Archived at', value: when(current.archivedAt) },
          ]}
        />
      </Section>
      <Section level="panel" title="History" description="Newest first · click a row to view it">
        <DataTable
          columns={historyColumns}
          rows={[...doc.versions].reverse()}
          rowKey={(v) => `v${v.version}`}
          cell={historyCell}
          selected="v{current.version}"
          onrowclick={(v) => (version = `v${v.version}`)}
        />
      </Section>
    </Grid>
  {:else if collection}
    <FilterBar label="Filter documents">
      <SearchField
        label="Search documents"
        placeholder="Title or ID"
        bind:value={query}
        oninput={resetPage}
      />
      <Field label="Format">
        {#snippet children({ id })}
          <Select
            {id}
            bind:value={format}
            onchange={resetPage}
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
            onchange={resetPage}
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
            onchange={resetPage}
            options={[
              { value: '', label: 'Any time' },
              { value: '7', label: 'Last 7 days' },
              { value: '30', label: 'Last 30 days' },
            ]}
          />
        {/snippet}
      </Field>
    </FilterBar>

    <Section
      level="panel"
      title={collection.name}
      description="{collection.description} · {numberFormat.format(
        filtered.length,
      )} of {numberFormat.format(docs.length)} documents"
    >
      <DataTable
        columns={documentColumns}
        rows={page}
        rowKey={(d) => d.id}
        cell={documentCell}
        {sort}
        {order}
        {onsort}
        onrowclick={openDocument}
        emptyText="No documents match these filters — loosen one to see more."
      />
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
      <DataTable
        columns={collectionColumns}
        rows={archiveCollections}
        rowKey={(c) => c.id}
        cell={collectionCell}
        onrowclick={openCollection}
      />
    </Section>
  {/if}
</Page>

<style>
  .title {
    display: block;
    font-weight: var(--fw-semibold);
  }
  .id {
    display: block;
    font-family: var(--font-mono);
    font-size: var(--fs-xs);
    color: var(--text-3);
  }
  .muted {
    color: var(--text-3);
    font-size: var(--fs-sm);
  }
  .figure {
    font-weight: var(--fw-semibold);
    font-variant-numeric: tabular-nums;
  }
</style>
