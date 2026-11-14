<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Toolbar from './Toolbar.svelte';

  const { Story } = defineMeta({
    title: 'Organisms/Desktop & OS/Toolbar',
    component: Toolbar,
    tags: ['autodocs'],
    args: { title: 'Inbox', subtitle: '4 unread', variant: 'floating' },
    argTypes: { variant: { control: 'inline-radio', options: ['floating', 'bar', 'plain'] } },
  });

  const items = [
    { icon: 'edit' as const, label: 'New message', primary: true },
    { separator: true as const },
    { icon: 'bookmark' as const, label: 'Archive' },
    { icon: 'trash' as const, label: 'Delete' },
    { icon: 'flag' as const, label: 'Flag', active: true },
    { spacer: true as const },
    { icon: 'sidebar' as const, label: 'Inspector', showLabel: true },
  ];
</script>

<script lang="ts">
  let search = $state('');
</script>

<!-- Groups of icon buttons with separators, a spacer and a search. `floating` is a sticky
     liquid-glass pill, `bar` a full-width sticky bar, `plain` sits in a Window's title bar.

     Why pills? In this system a pill means "you can press it", so every tool is one; a toggled
     tool (Flag) sits on the selected layer instead of turning solid. Press one: it squishes
     like a gummy and springs back — a tiny physical "yes" without any extra pixels. -->
<Story name="Playground">
  {#snippet template(args)}
    <Toolbar {...args} {items} bind:search />
  {/snippet}
</Story>

<!-- Out of room — a narrow window, a phone — the buttons fold into **More** from the end. The
     main action (`primary`) and the search stay where they were; More names itself, shows how
     many tools it holds and opens them as a menu right under it.

     Why not let the toolbar scroll? A scrolling toolbar hides tools with no hint that they exist,
     and a bare count says nothing about what it counts. A labelled More says "there is more here",
     keeps every tool one click away, and never moves the ones you use most. -->
<Story name="Out of room" asChild>
  <div style="width:20rem;max-width:100%">
    <Toolbar title="Inbox" variant="floating" {items} bind:search />
  </div>
</Story>
