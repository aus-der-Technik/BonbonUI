<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Calendar, { type CalendarEvent } from './Calendar.svelte';
  import Button from '../atoms/Button.svelte';
  import Stack from '../layout/Stack.svelte';
  import { NOW, calendarEvents } from '../../demo/mock-collab';

  const { Story } = defineMeta({
    title: 'Molecules/Calendar',
    component: Calendar,
    tags: ['autodocs'],
    args: { events: calendarEvents, today: NOW, size: 'md', weekStart: 1 },
    argTypes: {
      size: { control: 'inline-radio', options: ['sm', 'md'] },
      weekStart: { control: 'inline-radio', options: [0, 1] },
    },
  });
</script>

<script lang="ts">
  let value = $state<Date | undefined>(NOW);
  let opened = $state<CalendarEvent | null>(null);
</script>

<!-- The month view of a team calendar: candy pills per event, "+n more" when a day is full.
Narrow it (or open it on a phone) and the pills turn into dots. -->
<Story name="Month" />

<!-- Picking days and opening events, with an action next to the month. -->
<Story name="Interactive" asChild>
  <Stack gap="sm">
    <Calendar events={calendarEvents} today={NOW} bind:value onevent={(event) => (opened = event)}>
      {#snippet actions()}
        <Button variant="primary" shape="pill" size="sm" icon="plus" label="New event" collapse />
      {/snippet}
    </Calendar>
    <p style="margin:0;color:var(--text-2)">
      {value ? value.toDateString() : 'No day picked'}{opened ? ` · opened “${opened.title}”` : ''}
    </p>
  </Stack>
</Story>

<!-- The compact picker DatePicker uses: dots instead of pills. -->
<Story name="Small" args={{ size: 'sm' }} />

<!-- Only the next two weeks can be picked; weeks start on Sunday. -->
<Story
  name="Min and max"
  args={{
    size: 'sm',
    weekStart: 0,
    min: NOW,
    max: new Date(NOW.getFullYear(), NOW.getMonth(), NOW.getDate() + 14),
  }}
/>
