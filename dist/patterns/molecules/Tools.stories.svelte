<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import CheckboxGroup from './CheckboxGroup.svelte';
  import CodeInput from './CodeInput.svelte';
  import Composer from './Composer.svelte';
  import CopyButton from './CopyButton.svelte';
  import Disclosure from './Disclosure.svelte';
  import Field from './Field.svelte';
  import FileDropzone from './FileDropzone.svelte';
  import JobStatus from './JobStatus.svelte';
  import Markdown from './Markdown.svelte';
  import SegmentedControl from './SegmentedControl.svelte';
  import Tabs from './Tabs.svelte';
  import VersionRail from './VersionRail.svelte';
  import Button from '../atoms/Button.svelte';
  import Card from '../atoms/Card.svelte';
  import Input from '../atoms/Input.svelte';
  import StatusText from '../atoms/StatusText.svelte';
  import Stack from '../layout/Stack.svelte';
  import { ANSWER } from '../../demo/mock';

  const { Story } = defineMeta({
    title: 'Molecules/Tools, input & output',
    component: Composer,
    tags: ['autodocs'],
    parameters: { layout: 'padded' },
  });

  const UNSAFE =
    '**Bold**, a [link](https://example.com) and an unsafe <img src=x onerror="alert(1)"> image — the handler is removed.\n\n> Quotes take the accent.\n\n| City | Stores |\n| --- | --- |\n| Riverside | 42 |\n| Lakeside | 31 |';

  const toolOptions = [
    { value: 'search_products', label: 'search_products', description: 'Full-text product search' },
    { value: 'get_product', label: 'get_product', description: 'One product by id' },
    { value: 'geocode', label: 'geocode', description: 'Place name to coordinates' },
    { value: 'nearby', label: 'nearby', description: 'Stores within a radius' },
    { value: 'orders', label: 'orders', description: 'Order history lookups' },
    { value: 'admin_only', label: 'admin_only', description: 'Not available here', disabled: true },
  ];
</script>

<script lang="ts">
  let question = $state('');
  let asked = $state('');
  let tools = $state(['search_products', 'get_product']);
  let code = $state('');
  let file = $state<File | null>(null);
  let version = $state('v3');
  let lang = $state('en');
  let streamed = $state('');
  let streaming = $state(false);
  let toolsOpen = $state(true);

  function stream() {
    streamed = '';
    streaming = true;
    const words = ANSWER.split(/(?<=\s)/);
    let i = 0;
    const timer = setInterval(() => {
      streamed += words.slice(i, i + 3).join('');
      i += 3;
      if (i >= words.length) {
        clearInterval(timer);
        streaming = false;
      }
    }, 40);
  }
</script>

<!-- A prompt box: the field and its send button share one glass box that glows while focused.
     Enter sends, Shift+Enter breaks the line; it grows with the text. -->
<Story name="Composer" asChild>
  <Stack gap="sm">
    <Composer
      bind:value={question}
      label="Question"
      placeholder="Ask about products, stores or orders…"
      buttonLabel="Ask"
      icon="send"
      onsubmit={(v) => (asked = v)}
    />
    {#if asked}<StatusText message="Sent: {asked}" />{/if}
  </Stack>
</Story>

<!-- One line with the button beside it; Cmd/Ctrl+Enter sends, so Enter can break lines. -->
<Story name="Composer inline, Cmd+Enter" asChild>
  <Composer
    label="Query"
    layout="inline"
    submitOn="mod-enter"
    minRows={1}
    minLength={3}
    buttonLabel="Categorise"
    onsubmit={() => {}}
  />
</Story>

<!-- A streamed answer: keep passing the growing `source`; a caret blinks while `streaming`. -->
<Story name="Markdown streaming" asChild>
  <Card title="Answer">
    {#snippet actions()}<Button
        size="sm"
        icon="play"
        label="Stream answer"
        onclick={stream}
      />{/snippet}
    <Markdown source={streamed} {streaming} placeholder="The answer appears here." />
  </Card>
</Story>

<!-- Markdown is sanitized: the image's handler is gone. -->
<Story name="Markdown sanitized" asChild>
  <Card>
    <Markdown source={UNSAFE} />
  </Card>
</Story>

<!-- Where a background job stands: queued, running (with steps and progress), done, failed. -->
<Story name="JobStatus" asChild>
  <Card>
    <Stack gap="lg">
      <JobStatus status="queued" />
      <JobStatus status="running" step="importing · 12 files" />
      <JobStatus status="running" step="resizing images" done={17} total={40} />
      <JobStatus status="done" done={40} total={40} detail="38 updated · 2 skipped" />
      <JobStatus status="failed" step="timeout after 30 min" done={22} total={40} />
      <JobStatus status="cached" />
    </Stack>
  </Card>
</Story>

<!-- A checkbox grid inside a Disclosure, with a reset action in its heading. -->
<Story name="CheckboxGroup" asChild>
  <Card>
    <Disclosure title="Tools" icon="settings" meta="{tools.length} enabled" bind:open={toolsOpen}>
      {#snippet actions()}<Button
          size="xs"
          label="Reset"
          onclick={() => (tools = ['search_products'])}
        />{/snippet}
      <CheckboxGroup label="Allowed tools" options={toolOptions} bind:value={tools} mono />
    </Disclosure>
  </Card>
</Story>

<!-- Type, paste "ABCD1234" into any box, Backspace goes back. Filled boxes tint in the accent. -->
<Story name="CodeInput" asChild>
  <Stack gap="md">
    <CodeInput label="Device code" length={8} groupAfter={4} bind:value={code} />
    <StatusText message="Value: {code || '—'}" />
    <CodeInput label="One-time code" numeric length={6} />
    <CodeInput label="Wrong code" numeric length={6} value="123456" invalid />
  </Stack>
</Story>

<!-- Drop a file or click to choose; drag one over to see the accent glow. Below: an upload in
     progress. -->
<Story name="FileDropzone" asChild>
  <Stack gap="md">
    <FileDropzone
      bind:file
      accept=".pdf,.md,.txt,.docx,.html"
      maxBytes={50 * 1024 * 1024}
      hint="PDF, Markdown, text, Word or HTML · up to 50 MB"
    />
    <FileDropzone file={new File(['x'.repeat(2048)], 'quarterly-report.pdf')} progress={0.64} />
  </Stack>
</Story>

<!-- Jump between versions; the current one is the tinted "selected" layer (a selection, not an
     action, so no solid fill), the latest carries a dot. -->
<Story name="VersionRail" asChild>
  <VersionRail
    bind:value={version}
    items={['v1', 'v2', 'v3', 'v4', 'v5', 'v6'].map((v, i) => ({
      value: v,
      label: v,
      marked: i === 5,
      title: `Version ${i + 1}`,
    }))}
  />
</Story>

<!-- Tabs as links (route navigation) with a "+ New" action at the end. -->
<Story name="Route tabs with action" asChild>
  <Card>
    <Tabs
      label="Sections"
      value="active"
      tabs={[
        { value: 'active', label: 'Active', href: '#active', count: 1284 },
        { value: 'downloads', label: 'Downloads', href: '#downloads' },
        { value: 'archive', label: 'Archive', href: '#archive' },
      ]}
    >
      {#snippet actions()}<Button size="sm" variant="primary" icon="plus" label="New" />{/snippet}
    </Tabs>
  </Card>
</Story>

<!-- A compact pill switch, and many options wrapping onto several lines. -->
<Story name="Small segmented & wrap" asChild>
  <Stack gap="md" align="start">
    <SegmentedControl
      size="sm"
      label="Language"
      options={[
        { value: 'de', label: 'DE' },
        { value: 'en', label: 'EN' },
      ]}
      bind:value={lang}
    />
    <SegmentedControl
      wrap
      label="Capacity"
      value="1Gi"
      options={['256Mi', '512Mi', '1Gi', '2Gi', '5Gi', '10Gi', '20Gi', '50Gi'].map((v) => ({
        value: v,
        label: v,
      }))}
    />
  </Stack>
</Story>

<!-- A hint with inline code, and a value that copies itself when clicked. -->
<Story name="Field hint with code, inline copy" asChild>
  <Stack gap="md">
    <Field label="User prompt">
      {#snippet hint()}Use <code>{'{{content}}'}</code> where the page text goes.{/snippet}
      {#snippet children({ id })}<Input {id} value={'Summarise {{content}}'} />{/snippet}
    </Field>
    <span>
      Document id:
      <CopyButton value="urn:doc:example-4711">urn:doc:example-4711</CopyButton>
    </span>
  </Stack>
</Story>
