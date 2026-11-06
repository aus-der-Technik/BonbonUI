<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Avatar from '../atoms/Avatar.svelte';
  import Icon from '../atoms/Icon.svelte';
  import NavRail from './NavRail.svelte';

  const items = [
    { id: 'overview', label: 'Overview', icon: 'home' as const },
    { id: 'schedule', label: 'Schedule', icon: 'calendar' as const },
    { id: 'sensors', label: 'Sensors', icon: 'activity' as const },
    { id: 'settings', label: 'Settings', icon: 'settings' as const },
  ];

  const { Story } = defineMeta({
    title: 'Organisms/NavRail',
    component: NavRail,
    tags: ['autodocs'],
    args: { items, current: 'overview', orientation: 'vertical' },
    argTypes: {
      orientation: { control: 'inline-radio', options: ['vertical', 'horizontal'] },
    },
  });
</script>

<!-- Round buttons on a column of glass; the current one carries the accent. Hover or focus a
button: its name opens beside it. Narrow the canvas below 900px and the rail lies down. -->
<Story name="Playground">
  {#snippet template(args)}
    <div style="height: 30rem; display: flex">
      <NavRail {...args} items={args.items ?? items}>
        {#snippet top()}
          <span
            style="display:grid;place-items:center;width:40px;height:40px;border-radius:50%;background:var(--soft-bg);box-shadow:var(--soft-shadow);color:var(--accent-ink)"
            ><Icon name="leaf" size={20} /></span
          >
        {/snippet}
        {#snippet bottom()}<Avatar name="Robin Example" size={40} />{/snippet}
      </NavRail>
    </div>
  {/snippet}
</Story>

<!-- Horizontal: the same rail as a bar, tooltips below. -->
<Story name="Horizontal" args={{ orientation: 'horizontal' }}>
  {#snippet template(args)}
    <NavRail {...args} items={args.items ?? items}>
      {#snippet bottom()}<Avatar name="Robin Example" size={36} />{/snippet}
    </NavRail>
  {/snippet}
</Story>
