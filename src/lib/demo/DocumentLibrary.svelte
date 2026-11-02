<script lang="ts">
  /** Example page: browse documents, judge summaries, upload files, mock data (Storybook only). */
  import Page from '../patterns/templates/Page.svelte';
  import Row from '../patterns/layout/Row.svelte';
  import Section from '../patterns/layout/Section.svelte';
  import Stack from '../patterns/layout/Stack.svelte';
  import Badge from '../patterns/atoms/Badge.svelte';
  import Button from '../patterns/atoms/Button.svelte';
  import Card from '../patterns/atoms/Card.svelte';
  import Link from '../patterns/atoms/Link.svelte';
  import Stars from '../patterns/atoms/Stars.svelte';
  import StatusText from '../patterns/atoms/StatusText.svelte';
  import Tag from '../patterns/atoms/Tag.svelte';
  import CopyButton from '../patterns/molecules/CopyButton.svelte';
  import DetailList from '../patterns/molecules/DetailList.svelte';
  import FileDropzone from '../patterns/molecules/FileDropzone.svelte';
  import JobStatus, { type JobState } from '../patterns/molecules/JobStatus.svelte';
  import Markdown from '../patterns/molecules/Markdown.svelte';
  import Pager from '../patterns/molecules/Pager.svelte';
  import SearchField from '../patterns/molecules/SearchField.svelte';
  import Tabs from '../patterns/molecules/Tabs.svelte';
  import VersionRail from '../patterns/molecules/VersionRail.svelte';
  import DataTable, { type Column } from '../patterns/organisms/DataTable.svelte';
  import Dialog from '../patterns/organisms/Dialog.svelte';
  import { formatBytes } from '../utils/upload';
  import { documents, type DocumentRow } from './mock';

  let tab = $state('active');
  let keyword = $state('');
  let notice = $state<{ tone: 'ok' | 'error'; text: string } | null>(null);
  let job = $state<{ status: JobState; done: number; total: number }>({
    status: 'idle',
    done: 0,
    total: 0,
  });
  let uploading = $state(false);
  let file = $state<File | null>(null);
  let progress = $state<number | null>(null);
  let version = $state('v4');
  let offset = $state(0);
  const all = documents();

  const rows = $derived(
    all.filter(
      (d) =>
        !keyword ||
        d.keywords.includes(keyword) ||
        d.title.toLowerCase().includes(keyword.toLowerCase()),
    ),
  );
  const columns: Column[] = [
    { key: 'title', label: 'Document' },
    { key: 'access', label: 'Access', nowrap: true, hideOnMobile: true },
    { key: 'rating', label: 'Summary', nowrap: true },
    { key: 'size', label: 'Size', align: 'end', hideOnMobile: true },
  ];

  function judge() {
    job = { status: 'queued', done: 0, total: rows.length };
    setTimeout(() => {
      job = { ...job, status: 'running' };
      const timer = setInterval(() => {
        job = { ...job, done: Math.min(job.total, job.done + 2) };
        if (job.done >= job.total) {
          clearInterval(timer);
          job = { ...job, status: 'done' };
        }
      }, 300);
    }, 600);
  }

  function upload() {
    progress = 0;
    const timer = setInterval(() => {
      progress = Math.min(1, (progress ?? 0) + 0.08);
      if (progress >= 1) {
        clearInterval(timer);
        setTimeout(() => {
          notice = { tone: 'ok', text: `${file?.name} staged for the next ingestion run` };
          progress = null;
          file = null;
          uploading = false;
        }, 400);
      }
    }, 120);
  }

  const accessTone = { public: 'ok', members: 'warn', unknown: 'danger' } as const;
</script>

{#snippet cell(doc: DocumentRow, column: Column)}
  {#if column.key === 'title'}
    <Stack gap="xs" align="start">
      <span class="title">{doc.title}</span>
      <span class="urn">
        <CopyButton
          value={doc.urn}
          oncopy={(ok) =>
            (notice = ok
              ? { tone: 'ok', text: 'Copied URN to the clipboard' }
              : { tone: 'error', text: 'Could not copy' })}>{doc.urn}</CopyButton
        >
      </span>
      {#if doc.keywords.length}
        <Row gap="xs">
          {#each doc.keywords as k (k)}
            <Tag
              label={k}
              onclick={() => {
                keyword = k;
                offset = 0;
              }}
            />
          {/each}
        </Row>
      {/if}
    </Stack>
  {:else if column.key === 'access'}
    <Tag label={doc.access} tone={accessTone[doc.access]} />
  {:else if column.key === 'rating'}
    {#if doc.rating != null}
      <Stars value={doc.rating} showValue />
    {:else}
      <Row gap="xs" wrap={false}>
        <span class="muted">Not judged</span>
        <Button size="xs" label="Judge" />
      </Row>
    {/if}
  {:else}
    <span class="muted">{formatBytes(doc.bytes)}</span>
  {/if}
{/snippet}

{#snippet detail(doc: DocumentRow)}
  <Card surface="subtle" padding="sm">
    <Stack gap="sm">
      <Row gap="md">
        <Link href="#">Source</Link>
        <Link href="#">Markdown</Link>
        <Link href={doc.hasOriginal ? '#' : null}>Original</Link>
        <Link href="#">Metadata</Link>
      </Row>
      <Markdown size="sm" source={doc.summary} />
      <Row gap="sm">
        <span class="muted">Versions</span>
        <VersionRail
          bind:value={version}
          items={['v1', 'v2', 'v3', 'v4'].map((v, i) => ({ value: v, label: v, marked: i === 3 }))}
        />
      </Row>
    </Stack>
  </Card>
{/snippet}

<Page
  title="Documents"
  subtitle="active document browser"
  gap="md"
  footer="Example Corp · internal"
>
  {#snippet actions()}
    <Button
      variant="primary"
      shape="pill"
      icon="upload"
      label="Upload"
      onclick={() => (uploading = true)}
    />
  {/snippet}

  <Tabs
    label="Sections"
    bind:value={tab}
    tabs={[
      { value: 'active', label: 'Active', href: '#active', count: all.length },
      { value: 'downloads', label: 'Downloads', href: '#downloads' },
      { value: 'uploads', label: 'Uploads', href: '#uploads' },
      { value: 'archive', label: 'Archive', href: '#archive' },
    ]}
  />

  <Section
    level="panel"
    title="Active documents"
    description="{rows.length} documents · open a row for its summary and versions"
  >
    {#snippet actions()}
      <SearchField label="Keyword" placeholder="Keyword or title" bind:value={keyword} />
      <Button
        icon="chart"
        label="Judge summaries"
        disabled={job.status === 'running' || job.status === 'queued'}
        onclick={judge}
      />
    {/snippet}
    {#if job.status !== 'idle'}
      <JobStatus
        status={job.status}
        step={job.status === 'running' ? 'rating summaries' : undefined}
        done={job.done}
        total={job.total}
      />
    {/if}
    {#if notice}<StatusText tone={notice.tone} message={notice.text} />{/if}
    {#if keyword}
      <Row><Tag label="Keyword: {keyword}" onremove={() => (keyword = '')} /></Row>
    {/if}
    <DataTable
      {columns}
      rows={rows.slice(offset, offset + 8)}
      rowKey={(d) => d.urn}
      {cell}
      {detail}
      singleOpen
      emptyText="No documents match — try fewer words."
    />
    <Pager {offset} limit={8} total={rows.length} onpage={(next) => (offset = next)} />
  </Section>

  <Section level="panel" title="Details" description="Version v4 of 4">
    <DetailList
      layout="grid"
      items={[
        { label: 'MIME', value: 'application/pdf' },
        { label: 'Checksum', value: 'sha256:9f2c…a81e', mono: true },
        { label: 'Ingested', value: '19.10.2026, 06:12' },
      ]}
    />
    <Row gap="xs">
      <Badge size="sm" label="pdf" />
      <Badge size="sm" label="markdown" />
      <Badge size="sm" tone="danger" label="E_TIMEOUT" />
    </Row>
  </Section>
</Page>

<Dialog
  open={uploading}
  title="Upload a file"
  intro="It is ingested with the next run."
  width="34rem"
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
      label="Upload"
      busyLabel="Uploading…"
      busy={progress != null}
      disabled={!file}
      onclick={upload}
    />
  {/snippet}
</Dialog>

<style>
  .title {
    font-weight: var(--fw-semibold);
  }
  .urn {
    font-family: var(--font-mono);
    font-size: var(--fs-xs);
    color: var(--text-3);
  }
  .muted {
    color: var(--text-3);
    font-size: var(--fs-sm);
  }
</style>
