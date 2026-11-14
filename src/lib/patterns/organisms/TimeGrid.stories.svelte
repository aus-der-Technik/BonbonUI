<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import TimeGrid from './TimeGrid.svelte';
  import type { CalendarEvent } from '../molecules/Calendar.svelte';
  import Text from '../atoms/Text.svelte';
  import Stack from '../layout/Stack.svelte';
  import { NOW } from '../../demo/mock-collab';
  import { addDays, startOfDay } from '../../utils/collab';

  // The week of NOW (a Tuesday), from Monday.
  const monday = addDays(startOfDay(NOW), -((NOW.getDay() + 6) % 7));
  const week = Array.from({ length: 7 }, (_, i) => addDays(monday, i));
  const at = (day: number, hour = 0, minute = 0) =>
    new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + day, hour, minute);

  const events: CalendarEvent[] = [
    { id: 'w1', title: 'Sprint planning', start: at(0, 9, 30), end: at(0, 11), color: 'blue' },
    { id: 'w2', title: 'Lunch with Mara', start: at(0, 12, 30), end: at(0, 13, 30), color: 'mint' },
    { id: 'w3', title: 'Stand-up', start: at(1, 9), end: at(1, 9, 15), color: 'indigo' },
    { id: 'w4', title: 'Design review', start: at(1, 10), end: at(1, 11, 30), color: 'pink' },
    { id: 'w5', title: 'Pricing page copy', start: at(1, 10, 30), end: at(1, 12), color: 'orange' },
    { id: 'w6', title: 'Interview', start: at(1, 11), end: at(1, 12), color: 'teal' },
    { id: 'w7', title: 'Stand-up', start: at(2, 9), end: at(2, 9, 15), color: 'indigo' },
    { id: 'w8', title: 'Beta kickoff', start: at(2, 14), end: at(2, 15, 30), color: 'orange' },
    { id: 'w9', title: '1:1 Jonas', start: at(3, 15, 30), end: at(3, 16), color: 'teal' },
    { id: 'w10', title: 'Customer call', start: at(3, 13), color: 'yellow' },
    { id: 'w11', title: 'Release 4.2', start: at(4, 10), end: at(4, 10, 30), color: 'green' },
    { id: 'w12', title: 'Retro', start: at(4, 16), end: at(4, 17), color: 'purple' },
    { id: 'w13', title: 'Early train', start: at(4, 6), end: at(4, 7, 30), color: 'gray' },
    { id: 'w14', title: 'Team offsite', start: at(3), end: at(4), allDay: true, color: 'purple' },
    { id: 'w15', title: 'Hack week', start: at(-2), end: at(1), allDay: true, color: 'red' },
    { id: 'w16', title: 'Mara out of office', start: at(5), end: at(8), allDay: true },
    { id: 'w17', title: 'Late deploy', start: at(2, 22), end: at(2, 23, 30), color: 'green' },
  ];

  const { Story } = defineMeta({
    title: 'Organisms/TimeGrid',
    component: TimeGrid,
    tags: ['autodocs'],
    args: { events, now: NOW, startHour: 7, endHour: 19, hourHeight: 48, locale: 'en' },
  });
</script>

<script lang="ts">
  let said = $state('Click an event, an empty spot or a day.');
  const time = new Intl.DateTimeFormat('en', {
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
</script>

<!-- The week view: seven columns, the hours from 7 to 19 in view (scroll for the night),
     all-day and multi-day events as bars on top — the hack week began before this Monday, so its
     start is cut straight. Overlapping meetings on Tuesday share the column side by side; the
     15-minute stand-ups stay readable on one line. The accent line is the time now.

     A click on an empty spot hands the app that time, on the half hour, to create an event right
     there — the place you point at is the place it will appear. -->
<Story name="Week">
  {#snippet template(args)}
    <Stack gap="sm">
      <TimeGrid
        {...args}
        days={week}
        onevent={(event) => (said = `Opened “${event.title}”`)}
        onslot={(date) => (said = `New event at ${time.format(date)}`)}
        onday={(date) => (said = `Day view for ${date.toDateString()}`)}
      />
      <Text tone="muted" size="sm" aria-live="polite">{said}</Text>
    </Stack>
  {/snippet}
</Story>

<!-- One day: the same grid with a single column, the events get the full width. -->
<Story name="Day">
  {#snippet template(args)}
    <TimeGrid {...args} days={[startOfDay(NOW)]} hourHeight={56} />
  {/snippet}
</Story>
