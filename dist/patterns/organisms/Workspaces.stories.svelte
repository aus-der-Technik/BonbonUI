<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ResourceList from './ResourceList.svelte';
  import ResultPanel from './ResultPanel.svelte';
  import SplitPane from './SplitPane.svelte';
  import StatusCard from './StatusCard.svelte';
  import Avatar from '../atoms/Avatar.svelte';
  import Button from '../atoms/Button.svelte';
  import Card from '../atoms/Card.svelte';
  import Select from '../atoms/Select.svelte';
  import StatusText from '../atoms/StatusText.svelte';
  import Textarea from '../atoms/Textarea.svelte';
  import Markdown from '../molecules/Markdown.svelte';
  import ConfirmButton from '../molecules/ConfirmButton.svelte';
  import Grid from '../layout/Grid.svelte';
  import Stack from '../layout/Stack.svelte';
  import { ANSWER, workspaces, type Workspace } from '../../demo/mock';

  const { Story } = defineMeta({
    title: 'Organisms/Panels, lists & status cards',
    component: ResultPanel,
    tags: ['autodocs'],
    parameters: { layout: 'padded' },
  });

  const langs = [
    { value: 'de', label: 'German' },
    { value: 'en', label: 'English' },
    { value: 'fr', label: 'French' },
  ];
  const statusOf = {
    running: { label: 'Running', tone: 'live' as const },
    stopped: { label: 'Stopped', tone: 'locked' as const },
    starting: { label: 'Starting', tone: 'draft' as const, busy: true },
  };
</script>

<script lang="ts">
  let source = $state('Wir suchen ein Tagungshotel in Leipzig für 300 Personen.');
  let from = $state('de');
  let to = $state('en');
  let items = $state<Workspace[]>(workspaces());
</script>

<!-- The four states of a tool's output: `empty` (a placeholder), `loading` (an overlay over the
     previous result), `ready` (with a copy button and a status) and `error`. -->
<Story name="ResultPanel states" asChild>
  <Grid min="18rem">
    <ResultPanel status="empty" title="Answer" placeholder="Ask a question to see the answer." />
    <ResultPanel status="loading" title="Answer" loadingLabel="Thinking…">
      <Markdown source={ANSWER.slice(0, 160)} />
    </ResultPanel>
    <ResultPanel status="ready" title="Answer" copyValue={ANSWER}>
      {#snippet headerEnd()}<StatusText tone="ok" message="Done" />{/snippet}
      <Markdown source={ANSWER.slice(0, 260)} size="sm" />
    </ResultPanel>
    <ResultPanel
      status="error"
      title="Answer"
      error="Connection closed before the answer finished."
    />
  </Grid>
</Story>

<!-- Two panes on one card — a text and its translation. The glass bead between the headers swaps
     them (it turns on hover). Stacks on phones. -->
<Story name="SplitPane" asChild>
  <SplitPane label="Translator" onswap={() => ([from, to] = [to, from])}>
    {#snippet startHeader()}
      <Select aria-label="Source language" bind:value={from} options={langs} />
      <StatusText message="detected · German" />
    {/snippet}
    {#snippet endHeader()}
      <Select aria-label="Target language" bind:value={to} options={langs} />
    {/snippet}
    {#snippet start()}
      <Textarea variant="plain" bind:value={source} counter limit={500} aria-label="Text" />
    {/snippet}
    {#snippet end()}
      <Stack padding="md">
        <p>We are looking for a conference hotel in Leipzig for 300 people.</p>
      </Stack>
    {/snippet}
  </SplitPane>
</Story>

<!-- Things you run or own, one row each: a leading slot, title and meta, a status badge (with a
     spinner while starting) and per-row actions. -->
<Story name="ResourceList" asChild>
  <Card title="Workspaces" count={items.length}>
    <ResourceList
      {items}
      key={(w) => w.id}
      title={(w) => w.name}
      meta={(w) => `${w.volume} · created ${w.created}`}
      status={(w) => statusOf[w.status]}
      label="Workspaces"
    >
      {#snippet leading(w)}<Avatar name={w.name} size={32} />{/snippet}
      {#snippet actions(w)}
        <Button
          size="sm"
          icon="external"
          label="Open"
          iconOnly
          href="https://example.com"
          disabled={w.status !== 'running'}
        />
        <Button
          size="sm"
          icon={w.status === 'running' ? 'pause' : 'play'}
          label={w.status === 'running' ? 'Stop' : 'Start'}
          iconOnly
          busy={w.status === 'starting'}
        />
        <ConfirmButton
          size="sm"
          label="Delete"
          confirmLabel="Delete"
          onconfirm={() => (items = items.filter((i) => i.id !== w.id))}
        />
      {/snippet}
    </ResourceList>
  </Card>
</Story>

<!-- A moment between pages, e.g. back from a sign-in provider. -->
<Story name="StatusCard working" asChild>
  <StatusCard status="working" title="Signing you in" message="Checking your session…" />
</Story>

<!-- Success: the badge pops, the tick draws itself in and a few sprinkles fly, once. Errors
     arrive with a plain fade. -->
<Story name="StatusCard success" asChild>
  <StatusCard
    status="success"
    title="Device activated"
    message="You can close this window and return to your device."
  />
</Story>

<!-- An error that sends people on: counts down `redirectIn` seconds, with a link to go at once. -->
<Story name="StatusCard error with redirect" asChild>
  <StatusCard
    status="error"
    title="Sign-in failed"
    message="The sign-in link has expired."
    redirectTo="#login"
    redirectIn={5}
    continueLabel="Sign in again"
    onredirect={() => {}}
  />
</Story>
