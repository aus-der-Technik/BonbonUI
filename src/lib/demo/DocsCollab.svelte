<script lang="ts">
  /**
   * Example page: a shared document with live presence and comment threads in the margin, mock
   * data (Storybook only). The document sits on a panel; passages with a discussion carry a
   * marker that selects their thread in the aside; colleagues' cursors show where they are.
   */
  import Badge from '../patterns/atoms/Badge.svelte';
  import Button from '../patterns/atoms/Button.svelte';
  import Heading from '../patterns/atoms/Heading.svelte';
  import Text from '../patterns/atoms/Text.svelte';
  import Layer from '../patterns/layout/Layer.svelte';
  import Row from '../patterns/layout/Row.svelte';
  import Section from '../patterns/layout/Section.svelte';
  import Spacer from '../patterns/layout/Spacer.svelte';
  import Stack from '../patterns/layout/Stack.svelte';
  import AvatarStack from '../patterns/molecules/AvatarStack.svelte';
  import Banner from '../patterns/molecules/Banner.svelte';
  import Breadcrumbs from '../patterns/molecules/Breadcrumbs.svelte';
  import CopyButton from '../patterns/molecules/CopyButton.svelte';
  import Popover from '../patterns/molecules/Popover.svelte';
  import Stepper from '../patterns/molecules/Stepper.svelte';
  import TaskList from '../patterns/molecules/TaskList.svelte';
  import CommentThread, { type ThreadComment } from '../patterns/organisms/CommentThread.svelte';
  import SideNav from '../patterns/organisms/SideNav.svelte';
  import Page from '../patterns/templates/Page.svelte';
  import { relativeTime } from '../utils/collab';
  import {
    NOW,
    checklist,
    docBlocks,
    docsNav,
    secondThread,
    team,
    threadComments,
  } from './mock-collab';

  const here = team.filter((p) => p.presence === 'online' || p.presence === 'away');
  // Where colleagues' cursors are, by block id.
  const cursors: Record<string, { name: string; color: string }> = {
    b2: { name: 'Mara', color: 'var(--color-pink)' },
    b5: { name: 'Priya', color: 'var(--color-teal)' },
  };

  let threads = $state<Record<string, { comments: ThreadComment[]; resolved: boolean }>>({
    launch: { comments: [...threadComments], resolved: false },
    links: { comments: [...secondThread], resolved: true },
  });
  let active = $state<string | null>('launch');
  let tasks = $state(checklist());
  const openCount = $derived(Object.values(threads).filter((t) => !t.resolved).length);

  function reply(key: string, text: string) {
    const thread = threads[key];
    if (!thread) return;
    thread.comments = [
      ...thread.comments,
      { id: `${key}-${thread.comments.length + 1}`, author: 'Alex Morgan', time: NOW, text },
    ];
  }
</script>

{#snippet margin()}
  <Section title="Comments" heading={3} gap="sm">
    {#snippet actions()}
      <Badge tone={openCount ? 'info' : 'neutral'} label="{openCount} open" />
    {/snippet}
    {#each Object.entries(threads) as [key, thread] (key)}
      {@const block = docBlocks.find((b) => b.thread === key)}
      <CommentThread
        comments={thread.comments}
        quote={block?.text}
        bind:resolved={thread.resolved}
        active={active === key}
        now={NOW}
        onresolve={() => (active = null)}
        onreply={(text) => reply(key, text)}
      />
    {/each}
  </Section>
  <Section title="Launch stages" heading={3} level="panel">
    <Stepper
      orientation="vertical"
      current={1}
      steps={[
        { label: 'Internal preview', description: 'Done in October' },
        { label: 'Beta with 20 teams', description: 'Four weeks, from 9 Nov' },
        { label: 'Open to everyone', description: 'Early next year' },
      ]}
    />
  </Section>
{/snippet}

<Page title="Docs" subtitle="Product team" width="wide" gap="md" aside={margin} asideWidth="22rem">
  {#snippet actions()}
    <AvatarStack people={here} max={3} label="Editing now" />
    <Popover
      label="Share"
      icon="share"
      variant="primary"
      size="lg"
      placement="bottom-end"
      width="20rem"
      title="Share this doc"
    >
      <Stack gap="sm">
        <Text tone="muted" size="sm">Anyone in the workspace with the link can comment.</Text>
        <Row gap="sm">
          <Text size="sm" mono truncate>https://docs.example.com/d/launch-plan</Text>
          <Spacer />
          <CopyButton value="https://docs.example.com/d/launch-plan" />
        </Row>
      </Stack>
    </Popover>
  {/snippet}
  {#snippet sidebar()}
    <SideNav groups={docsNav} label="Documents" onnavigate={(_, event) => event.preventDefault()} />
  {/snippet}

  <Breadcrumbs items={[{ label: 'Docs', href: '#' }, { label: 'Launch plan' }]} />

  <Banner
    tone="info"
    icon="users"
    message="Mara and Priya are editing. Changes appear as they type."
  />

  <Layer level="panel" as="article" padding="lg" gap="md">
    <Row gap="md">
      <AvatarStack people={team.slice(0, 3)} size={26} presence={false} label="Authors" />
      <Text size="sm" tone="subtle">
        Edited {relativeTime(new Date(NOW.getTime() - 12 * 60_000), NOW)} by Priya Raman
      </Text>
    </Row>
    {#each docBlocks as block (block.id)}
      {@const cursor = cursors[block.id]}
      {@const thread = block.thread ? threads[block.thread] : undefined}
      <div
        class="block"
        class:commented={thread && !thread.resolved}
        class:active={active === block.thread}
      >
        {#if block.kind === 'heading'}
          <Heading level={block.id === 'b1' ? 1 : 2} size={block.id === 'b1' ? '3xl' : 'xl'}>
            {block.text}
          </Heading>
        {:else if block.kind === 'quote'}
          <blockquote>{block.text}</blockquote>
        {:else}
          <p>
            <span class="text">{block.text}</span>{#if cursor}<span
                class="cursor"
                style:--c={cursor.color}><span class="cursor-name">{cursor.name}</span></span
              >{/if}
          </p>
        {/if}
        {#if block.thread && thread}
          <Button
            class="marker"
            size="xs"
            variant={active === block.thread ? 'primary' : 'ghost'}
            shape="pill"
            icon="chat"
            label={String(thread.comments.length)}
            aria-label="{thread.comments.length} comments on this passage"
            onclick={() => (active = active === block.thread ? null : (block.thread ?? null))}
          />
        {/if}
      </div>
    {/each}
  </Layer>

  <Section title="Follow-ups" description="Tasks that came out of the comments." level="panel">
    <TaskList bind:items={tasks} sinkDone />
  </Section>
</Page>

<style>
  .block {
    position: relative;
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: start;
    gap: var(--space-3);
    margin-inline: calc(var(--space-3) * -1);
    padding: var(--space-1) var(--space-3);
    border-radius: var(--radius-md);
    transition: background-color var(--motion-base) var(--ease-out);
  }
  .block > :global(:first-child) {
    grid-column: 1;
  }
  /* A highlighter stroke behind the lower half of each line of a discussed passage. */
  .commented .text {
    background: linear-gradient(
      transparent 58%,
      color-mix(in srgb, var(--color-yellow) 38%, transparent) 58%
    );
    -webkit-box-decoration-break: clone;
    box-decoration-break: clone;
  }
  .active {
    background: var(--accent-faint);
  }
  p {
    margin: 0;
    max-width: 68ch;
    font-size: var(--fs-base);
    line-height: 1.7;
    color: var(--text-2);
  }
  blockquote {
    margin: 0;
    padding-left: var(--space-4);
    border-left: 3px solid var(--accent);
    font-size: var(--fs-lg);
    font-style: italic;
    color: var(--text);
  }
  /* A colleague's caret with their name, in their colour. */
  .cursor {
    position: relative;
    display: inline-block;
    width: 2px;
    height: 1.25em;
    margin-left: 2px;
    vertical-align: text-bottom;
    background: var(--c);
    border-radius: 1px;
    animation: blink 1.2s steps(1) infinite;
  }
  .cursor-name {
    position: absolute;
    bottom: 100%;
    left: -1px;
    padding: 0 0.35rem;
    border-radius: var(--radius-sm) var(--radius-sm) var(--radius-sm) 0;
    background: var(--c);
    color: #fff;
    font-size: var(--fs-2xs);
    font-weight: var(--fw-semibold);
    font-style: normal;
    line-height: 1.5;
    white-space: nowrap;
  }
  @keyframes blink {
    50% {
      opacity: 0.35;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .cursor {
      animation: none;
    }
  }
</style>
