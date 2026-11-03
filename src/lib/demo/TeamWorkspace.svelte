<script lang="ts">
  /**
   * Example: a team workspace — the board and the calendar of one product team under a shared
   * navigation, presence and inbox. The navigation switches the view in place; on narrow
   * screens it moves into a drawer that slides in from the menu button's side (Storybook only).
   */
  import Avatar from '../patterns/atoms/Avatar.svelte';
  import Button from '../patterns/atoms/Button.svelte';
  import Popover from '../patterns/molecules/Popover.svelte';
  import Drawer from '../patterns/organisms/Drawer.svelte';
  import NotificationList from '../patterns/organisms/NotificationList.svelte';
  import SideNav from '../patterns/organisms/SideNav.svelte';
  import Section from '../patterns/layout/Section.svelte';
  import TeamBoard from './TeamBoard.svelte';
  import TeamCalendar from './TeamCalendar.svelte';
  import { NOW, collabNav, notifications, team } from './mock-collab';

  type View = 'board' | 'calendar';

  interface Props {
    /** The view to open (deep link). */
    view?: View;
  }

  let { view: initial = 'board' }: Props = $props();

  // svelte-ignore state_referenced_locally
  let view = $state<View>(initial);
  let width = $state(1440);
  let navOpen = $state(false);
  let inbox = $state(notifications());

  const wide = $derived(width > 900);
  const unread = $derived(inbox.filter((n) => n.unread).length);
  const nav = $derived(
    collabNav.map((group) => ({
      ...group,
      items: group.items.map((item) => ({ ...item, active: item.href === `#${view}` })),
    })),
  );
  const here = team.filter((p) => p.presence === 'online' || p.presence === 'away');
  const where: Record<string, string> = {
    mara: 'on the board',
    jonas: 'on the board',
    sofia: 'in the calendar',
    priya: 'away',
    yuki: 'away',
  };

  function go(item: { href: string }, event: MouseEvent) {
    event.preventDefault();
    view = item.href === '#calendar' ? 'calendar' : 'board';
    navOpen = false;
  }
</script>

<svelte:window bind:innerWidth={width} />

{#snippet navigation()}
  <div class="nav" data-note="workspace-nav">
    <SideNav groups={nav} label="Workspace" onnavigate={go} />
    <Section title="Here now" heading={3} level="panel" gap="sm">
      <ul class="here">
        {#each here as person (person.id)}
          <li class:away={person.presence === 'away'}>
            <span class="face">
              <Avatar name={person.name} size={28} />
              <span class="dot dot--{person.presence}" aria-hidden="true"></span>
            </span>
            <span class="who">
              <strong>{person.name.split(' ')[0]}</strong>
              <span>{where[person.id ?? ''] ?? 'online'}</span>
            </span>
          </li>
        {/each}
      </ul>
    </Section>
  </div>
{/snippet}

{#snippet shared()}
  <Popover
    label={unread ? `Notifications, ${unread} unread` : 'Notifications'}
    icon="bell"
    iconOnly
    variant="glass"
    size="lg"
    placement="bottom-end"
    width="22rem"
    padding="sm"
  >
    <NotificationList bind:items={inbox} now={NOW} onopen={() => {}} />
  </Popover>
  {#if !wide}
    <Button
      variant="glass"
      shape="pill"
      size="lg"
      icon="menu"
      label="Workspace menu"
      iconOnly
      onclick={() => (navOpen = true)}
    />
  {/if}
{/snippet}

{#key view}
  <div class="view">
    {#if view === 'board'}
      <TeamBoard sidebar={wide ? navigation : undefined} actions={shared} {width} />
    {:else}
      <TeamCalendar sidebar={wide ? navigation : undefined} actions={shared} {width} />
    {/if}
  </div>
{/key}

<!-- The menu button sits at the right end of the header, so the drawer comes from there. -->
<Drawer open={navOpen} title="Workspace" side="end" width="20rem" onclose={() => (navOpen = false)}>
  {@render navigation()}
</Drawer>

<style>
  .nav {
    display: grid;
    gap: var(--space-4);
  }
  .here {
    display: grid;
    gap: var(--space-3);
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .here li {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    min-width: 0;
  }
  .away {
    opacity: 0.7;
  }
  .face {
    position: relative;
    display: inline-flex;
    flex: none;
  }
  .dot {
    position: absolute;
    right: -1px;
    bottom: -1px;
    width: 10px;
    height: 10px;
    border-radius: var(--radius-pill);
    box-shadow: 0 0 0 2px var(--layer-panel-bg);
    background: var(--ok);
  }
  .dot--away {
    background: var(--warn);
  }
  .who {
    display: grid;
    min-width: 0;
    font-size: var(--fs-xs);
    color: var(--text-3);
  }
  .who strong {
    font-size: var(--fs-sm);
    font-weight: var(--fw-semibold);
    color: var(--text);
  }
  /* Switching views cross-fades in place, so it reads as the same workspace. */
  .view {
    animation: bb-rise var(--motion-base) var(--ease-out);
  }
  @media (prefers-reduced-motion: reduce) {
    .view {
      animation: none;
    }
  }
</style>
