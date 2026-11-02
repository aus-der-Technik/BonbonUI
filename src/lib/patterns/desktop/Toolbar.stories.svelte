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
    { icon: 'edit' as const, label: 'New message' },
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
