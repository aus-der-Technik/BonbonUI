<script lang="ts">
  /**
   * Example page: a team calendar, mock data (Storybook only). A KPI row on the ground layer, the
   * month grid with candy event pills, and the chosen day's agenda in the aside (under the
   * calendar on smaller screens). "New event" opens a popover form.
   */
  import Button from '../patterns/atoms/Button.svelte';
  import Input from '../patterns/atoms/Input.svelte';
  import Text from '../patterns/atoms/Text.svelte';
  import Grid from '../patterns/layout/Grid.svelte';
  import Row from '../patterns/layout/Row.svelte';
  import Section from '../patterns/layout/Section.svelte';
  import Stack from '../patterns/layout/Stack.svelte';
  import AvatarStack from '../patterns/molecules/AvatarStack.svelte';
  import Calendar, { type CalendarEvent } from '../patterns/molecules/Calendar.svelte';
  import DatePicker from '../patterns/molecules/DatePicker.svelte';
  import EmptyState from '../patterns/molecules/EmptyState.svelte';
  import Field from '../patterns/molecules/Field.svelte';
  import Popover from '../patterns/molecules/Popover.svelte';
  import Stat from '../patterns/molecules/Stat.svelte';
  import SideNav, { type NavGroup } from '../patterns/organisms/SideNav.svelte';
  import Page from '../patterns/templates/Page.svelte';
  import { CANDY_COLORS, addDays, candy, sameDay, startOfDay, toDate } from '../utils/collab';
  import { NOW, calendarEvents, collabNav, team } from './mock-collab';

  const nav: NavGroup[] = collabNav.map((group) => ({
    ...group,
    items: group.items.map((item) => ({ ...item, active: item.label === 'Calendar' })),
  }));

  let events = $state<CalendarEvent[]>([...calendarEvents]);
  let day = $state<Date | undefined>(NOW);
  let draftTitle = $state('');
  let draftDay = $state<Date | undefined>(NOW);

  const agenda = $derived.by(() => {
    if (!day) return [];
    const at = startOfDay(day);
    return events
      .filter((e) => {
        const start = startOfDay(toDate(e.start));
        const end = e.end ? startOfDay(toDate(e.end)) : start;
        return start <= at && at <= end;
      })
      .sort((a, b) => toDate(a.start).getTime() - toDate(b.start).getTime());
  });
  const thisWeek = $derived(
    events.filter((e) => {
      const d = toDate(e.start);
      return d >= startOfDay(NOW) && d < addDays(startOfDay(NOW), 7);
    }).length,
  );
  const dayTitle = $derived(
    day
      ? new Intl.DateTimeFormat('en', { weekday: 'long', day: 'numeric', month: 'long' }).format(
          day,
        )
      : 'No day selected',
  );
  const time = new Intl.DateTimeFormat('en', { hour: '2-digit', minute: '2-digit' });

  function create(close: () => void) {
    if (!draftTitle.trim() || !draftDay) return;
    events = [
      ...events,
      {
        id: `new-${events.length}`,
        title: draftTitle.trim(),
        start: new Date(draftDay.getFullYear(), draftDay.getMonth(), draftDay.getDate(), 10),
        color: CANDY_COLORS[events.length % CANDY_COLORS.length],
      },
    ];
    day = draftDay;
    draftTitle = '';
    close();
  }
</script>

{#snippet agendaPanel()}
  <Section title={dayTitle} heading={3} level="panel" gap="sm">
    {#if agenda.length}
      <ul class="agenda">
        {#each agenda as event (event.id)}
          <li style:--c={candy(event.color)}>
            <span class="bar" aria-hidden="true"></span>
            <Stack gap="none">
              <Text weight="semibold">{event.title}</Text>
              <Text size="sm" tone="subtle" numeric>
                {event.allDay ? 'All day' : time.format(toDate(event.start))}
              </Text>
            </Stack>
          </li>
        {/each}
      </ul>
    {:else}
      <EmptyState compact message="Nothing planned — a good day for focus work." />
    {/if}
  </Section>
  <Section title="Team" heading={3} level="panel">
    <AvatarStack people={team} max={6} label="Team members" />
    <Text size="sm" tone="muted">4 of 8 people are available today.</Text>
  </Section>
{/snippet}

<Page title="Calendar" subtitle="Product team" gap="lg" aside={agendaPanel} asideWidth="20rem">
  {#snippet sidebar()}
    <SideNav groups={nav} label="Workspace" onnavigate={(_, event) => event.preventDefault()} />
  {/snippet}
  {#snippet actions()}
    <Popover
      label="New event"
      icon="plus"
      variant="primary"
      size="lg"
      placement="bottom-end"
      width="19rem"
      title="New event"
    >
      {#snippet children(close)}
        <form
          onsubmit={(event) => {
            event.preventDefault();
            create(close);
          }}
        >
          <Stack gap="md">
            <Field label="Title">
              {#snippet children({ id })}
                <Input {id} bind:value={draftTitle} placeholder="Design review" />
              {/snippet}
            </Field>
            <Field label="Day">
              {#snippet children({ id })}
                <DatePicker {id} bind:value={draftDay} today={NOW} clearable={false} />
              {/snippet}
            </Field>
            <Row justify="end">
              <Button label="Cancel" onclick={close} />
              <Button type="submit" variant="primary" label="Add" disabled={!draftTitle.trim()} />
            </Row>
          </Stack>
        </form>
      {/snippet}
    </Popover>
  {/snippet}

  <Grid min="8.5rem" gap="lg">
    <Stat
      label="Events this week"
      value={thisWeek}
      delta={20}
      deltaLabel="vs last week"
      icon="calendar"
    />
    <Stat
      label="Focus time"
      value="18"
      unit="h"
      delta={-8}
      deltaLabel="vs last week"
      icon="clock"
    />
    <Stat label="Next release" value="Nov 12" icon="rocket" />
  </Grid>

  <Calendar
    {events}
    today={NOW}
    bind:value={day}
    onevent={(event) => (day = startOfDay(toDate(event.start)))}
  />

  {#if day && sameDay(day, NOW)}
    <Text size="sm" tone="subtle"
      >Tip: arrow keys move between days, Page Up / Down between months.</Text
    >
  {/if}
</Page>

<style>
  .agenda {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: var(--space-2);
  }
  .agenda li {
    display: flex;
    gap: var(--space-3);
    padding: var(--space-2) var(--space-3);
    border-radius: var(--radius-md);
    background: color-mix(in srgb, var(--c) 12%, transparent);
  }
  .bar {
    flex-shrink: 0;
    width: 4px;
    border-radius: var(--radius-pill);
    background: var(--c);
  }
</style>
