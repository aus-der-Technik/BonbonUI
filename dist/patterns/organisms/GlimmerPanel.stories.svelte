<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Button from '../atoms/Button.svelte';
  import Icon from '../atoms/Icon.svelte';
  import Skeleton from '../atoms/Skeleton.svelte';
  import Stack from '../layout/Stack.svelte';
  import GlimmerPanel from './GlimmerPanel.svelte';

  const { Story } = defineMeta({
    title: 'Organisms/GlimmerPanel',
    component: GlimmerPanel,
    tags: ['autodocs'],
    args: { working: true, level: 'panel' },
    argTypes: {
      working: { control: 'boolean' },
      level: { control: 'inline-radio', options: ['panel', 'selected'] },
    },
  });

  const answer =
    'Open the calendar, choose Share and remove everyone you no longer want to see it. ' +
    'People who still need it get a fresh invitation, so old links stop working at once. ' +
    'Events stay as they are; only who can see them changes. If someone kept a copy, ask ' +
    'them to remove it: a copy no longer follows the shared calendar.';
</script>

<script lang="ts">
  type Status = 'reading' | 'writing' | 'done';
  let status = $state<Status>('done');
  let shown = $state(answer);
  let timer: ReturnType<typeof setTimeout> | undefined;

  // A stand-in for a streamed answer: a moment of reading, then the text word by word.
  function ask() {
    clearTimeout(timer);
    status = 'reading';
    shown = '';
    const words = answer.split(' ');
    let i = 0;
    const next = () => {
      status = 'writing';
      shown = words.slice(0, ++i).join(' ');
      timer = i < words.length ? setTimeout(next, 55) : undefined;
      if (!timer) status = 'done';
    };
    timer = setTimeout(next, 1400);
  }
</script>

{#snippet head(busy: boolean, onask?: () => void)}
  <header class="story-head">
    <span class="story-eyebrow"><Icon name="sparkles" size={14} /> Answer</span>
    {#if onask}
      <Button size="sm" variant="ghost" icon="refresh" label="Ask again" {busy} onclick={onask} />
    {/if}
  </header>
{/snippet}

<!-- The glimmer on its own: switch `working` off and it fades out while still turning. -->
<Story name="Playground">
  {#snippet template(args)}
    <div style="max-width: 36rem; padding: 1.5rem">
      <GlimmerPanel {...args} aria-label="Answer">
        {@render head(false)}
        <p>{answer}</p>
      </GlimmerPanel>
    </div>
  {/snippet}
</Story>

<!-- An assistant at work: Ask again, and the panel glimmers while the sources are read and the
     answer is written, then lets go. The control sits on the panel it refreshes. -->
<Story name="Writing an answer" asChild>
  <Stack padding="lg" style="max-width: 36rem">
    <GlimmerPanel working={status !== 'done'} aria-label="Answer">
      {@render head(status !== 'done', ask)}
      {#if status === 'reading'}
        <p class="story-wait">Reading the sources…</p>
        <Skeleton lines={3} />
      {:else}
        <p>
          {shown}{#if status === 'writing'}<span class="story-caret"></span>{/if}
        </p>
      {/if}
    </GlimmerPanel>
  </Stack>
</Story>

<!-- On the selected layer: the answer is the one thing on the page different in kind. -->
<Story name="Selected" args={{ level: 'selected' }}>
  {#snippet template(args)}
    <div style="max-width: 36rem; padding: 1.5rem">
      <GlimmerPanel {...args} aria-label="Answer">
        {@render head(false)}
        <p>{answer}</p>
      </GlimmerPanel>
    </div>
  {/snippet}
</Story>

<style>
  .story-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-3);
    min-height: var(--control-sm);
  }
  .story-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    font-size: var(--fs-xs);
    font-weight: var(--fw-semibold);
    letter-spacing: var(--tracking-caps);
    text-transform: uppercase;
    color: var(--accent-ink);
  }
  .story-wait {
    color: var(--text-3);
    font-size: var(--fs-sm);
  }
  .story-caret {
    display: inline-block;
    width: 2px;
    height: 1em;
    margin-inline-start: 2px;
    vertical-align: text-bottom;
    background: var(--accent);
    animation: story-blink 1s steps(2) infinite;
  }
  @keyframes story-blink {
    50% {
      opacity: 0;
    }
  }
</style>
