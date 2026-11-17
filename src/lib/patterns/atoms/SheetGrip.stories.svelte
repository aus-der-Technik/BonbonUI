<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import SheetGrip from './SheetGrip.svelte';
  import Popover from '../molecules/Popover.svelte';
  import Button from './Button.svelte';
  import Icon from './Icon.svelte';
  import Switch from './Switch.svelte';
  import Text from './Text.svelte';
  import Stack from '../layout/Stack.svelte';

  // Shown at phone width: on a wider screen the grip renders nothing and the panel floats at its
  // trigger, as it always did. Switch the viewport in the toolbar to see both.
  const { Story } = defineMeta({
    title: 'Atoms/SheetGrip',
    component: SheetGrip,
    tags: ['autodocs'],
    globals: { viewport: { value: 'mobile2', isRotated: false } },
    parameters: {
      docs: {
        description: {
          component:
            'Put it first in a floating panel and on a phone that panel is a bottom sheet: full width, rounded top, clear of the home indicator, above the keyboard, the page dimmed. Pull the grip down (or flick) to close it. Popover and ContextPanel add it themselves with `sheet`.',
        },
      },
    },
  });
</script>

<script lang="ts">
  const places = [
    { icon: 'folder', name: 'Move to…' },
    { icon: 'share', name: 'Share' },
    { icon: 'copy', name: 'Duplicate' },
    { icon: 'download', name: 'Download' },
    { icon: 'trash', name: 'Delete' },
  ] as const;
  let notify = $state(true);
  let sound = $state(false);
</script>

<!-- `sheet` on a Popover: as tall as its content. Pull the grip down to close it. -->
<Story name="On a popover" asChild>
  <Stack gap="md" padding="lg">
    <Text tone="muted">Tap “Actions”: on a phone the panel rises from the bottom edge.</Text>
    <Popover label="Actions" icon="more" sheet padding="sm">
      {#snippet children(close)}
        <ul class="menu">
          {#each places as place (place.name)}
            <li>
              <button type="button" onclick={close}>
                <Icon name={place.icon} size={18} />{place.name}
              </button>
            </li>
          {/each}
        </ul>
      {/snippet}
    </Popover>
  </Stack>
</Story>

<!-- `sheet="half"`: at most about half the screen and nothing dimmed — the thing it is about
     (a place on a map, a row in a table) stays in sight above it. -->
<Story name="Half" asChild>
  <Stack gap="md" padding="lg">
    <Text tone="muted">The page stays bright and in reach above a half sheet.</Text>
    <Popover label="Settings" icon="settings" sheet="half" title="Notifications">
      {#snippet children(close)}
        <Stack gap="md">
          <Switch label="Notify me" bind:checked={notify} />
          <Switch label="Play a sound" bind:checked={sound} />
          {#each Array.from({ length: 8 }, (_, i) => i + 1) as n (n)}
            <Text>Channel {n}</Text>
          {/each}
          <Button variant="primary" label="Done" onclick={close} />
        </Stack>
      {/snippet}
    </Popover>
  </Stack>
</Story>

<!-- `sheet="full"`: the whole screen, for something you read for a while (a notification
     centre). The grip still pulls it down. -->
<Story name="Full screen" asChild>
  <Stack gap="md" padding="lg">
    <Popover label="Notifications" icon="bell" sheet="full" title="Notifications">
      {#snippet children(close)}
        <Stack gap="md">
          {#each ['Ada commented on “Budget”', 'Ben shared “Offsite” with you', 'Your export is ready'] as line (line)}
            <Text>{line}</Text>
          {/each}
          <Button label="Mark all read" variant="secondary" onclick={close} />
        </Stack>
      {/snippet}
    </Popover>
  </Stack>
</Story>

<style>
  .menu {
    display: grid;
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .menu button {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    width: 100%;
    min-height: 44px;
    padding: 0 var(--space-3);
    border: 0;
    border-radius: var(--radius-md);
    background: none;
    color: var(--text);
    font: inherit;
    text-align: start;
    cursor: pointer;
  }
  .menu button:hover {
    background: var(--accent-faint);
  }
</style>
