<script lang="ts">
  /**
   * Example page: a team calendar, mock data (Storybook only). A KPI row on the ground layer, the
   * month grid with candy event pills, and the chosen day's agenda in the aside (under the
   * calendar on smaller screens). Events are added on the day they belong to: from the "+" that
   * the Calendar's `day` snippet puts in the day under the pointer (or the chosen day), or from
   * "Add to this day" in the agenda — never from a header button that guesses the day. TeamWorkspace passes the shared
   * navigation and header actions.
   */
  import type { Snippet } from 'svelte';
  import { tick } from 'svelte';
  import Button from '../patterns/atoms/Button.svelte';
  import Icon from '../patterns/atoms/Icon.svelte';
  import Input from '../patterns/atoms/Input.svelte';
  import Text from '../patterns/atoms/Text.svelte';
  import { changeCue, flashChanged } from '../patterns/atoms/changed';
  import Grid from '../patterns/layout/Grid.svelte';
  import Row from '../patterns/layout/Row.svelte';
  import Section from '../patterns/layout/Section.svelte';
  import Stack from '../patterns/layout/Stack.svelte';
  import AvatarStack from '../patterns/molecules/AvatarStack.svelte';
  import Calendar, {
    type CalendarDay,
    type CalendarEvent,
  } from '../patterns/molecules/Calendar.svelte';
  import EmptyState from '../patterns/molecules/EmptyState.svelte';
  import Field from '../patterns/molecules/Field.svelte';
  import Popover from '../patterns/molecules/Popover.svelte';
  import Stat from '../patterns/molecules/Stat.svelte';
  import Page from '../patterns/templates/Page.svelte';
  import { CANDY_COLORS, addDays, candy, dayKey, startOfDay, toDate } from '../utils/collab';
  import DesignNotes, { type DesignNote } from './DesignNotes.svelte';
  import { NOW, calendarEvents, team } from './mock-collab';

  interface Props {
    /** The shared workspace navigation (left column on wide screens). */
    sidebar?: Snippet | undefined;
    /** Shared header actions: inbox, menu. */
    actions?: Snippet | undefined;
    width?: number;
  }

  let { sidebar, actions, width = 1440 }: Props = $props();

  let events = $state<CalendarEvent[]>([...calendarEvents]);
  let day = $state<Date | undefined>(NOW);
  let month = $state<Date | undefined>();
  let draftTitle = $state('');
  let draftTime = $state('10:00');
  let fresh = $state<string | null>(null);
  let serial = 0;

  let calEl = $state<HTMLElement>();

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
  const long = new Intl.DateTimeFormat('en', { weekday: 'long', day: 'numeric', month: 'long' });
  const short = new Intl.DateTimeFormat('en', { weekday: 'short', day: 'numeric', month: 'short' });
  const time = new Intl.DateTimeFormat('en', { hour: '2-digit', minute: '2-digit' });
  const dayTitle = $derived(day ? long.format(day) : 'No day selected');

  function cellOf(date: Date) {
    return calEl
      ?.querySelector(`[data-day="${dayKey(date)}"]`)
      ?.closest<HTMLElement>('[role="gridcell"]');
  }

  async function create(on: Date, close: () => void) {
    const title = draftTitle.trim();
    if (!title) return;
    const [h = 10, min = 0] = draftTime.split(':').map(Number);
    serial += 1;
    const event: CalendarEvent = {
      id: `new-${serial}`,
      title,
      start: new Date(on.getFullYear(), on.getMonth(), on.getDate(), h, min),
      color: CANDY_COLORS[(events.length + 3) % CANDY_COLORS.length],
    };
    events = [...events, event];
    day = startOfDay(on);
    fresh = event.id;
    draftTitle = '';
    close();
    await tick();
    // The day it landed on glows once, so you see where it went.
    const cell = cellOf(on);
    if (cell) flashChanged(cell);
  }

  const notes: DesignNote[] = [
    {
      principle: 'locality',
      title: 'Add an event on the day it belongs to',
      body: 'Point at a day and a “+” appears in its corner; the form grows out of it with that day already filled in. No header button that guesses “today”.',
      target: '[data-note="calendar"]',
    },
    {
      principle: 'locality',
      title: '“Add to this day” in the agenda',
      body: 'The agenda of the chosen day has its own add button, so the day you are reading is the day you add to — on a phone too, where there is no hover.',
      target: '[data-note="agenda"]',
    },
    {
      principle: 'cues',
      title: 'New events show where they landed',
      body: 'The day cell lights up once and the new entry rises into the agenda; the weekly count beside glows when it changes.',
      target: '[data-note="stats"]',
    },
    {
      principle: 'function',
      title: 'Candy colours are categories here',
      body: 'Each event keeps its hue from the month grid to the agenda, while every surface stays neutral — colour carries meaning, not decoration.',
      target: '[data-note="agenda"]',
    },
    {
      principle: 'friendly',
      title: 'An empty day is good news',
      body: '“Nothing planned — a good day for focus work.” An empty state that reassures and still offers the next step.',
      target: '[data-note="agenda"]',
    },
    {
      principle: 'cues',
      title: 'One workspace, two views',
      body: 'Board and Calendar share the navigation, presence and inbox. Switching swaps the view in place with a short rise, so it reads as the same place seen differently.',
      target: '[data-note="workspace-nav"]',
    },
  ];
</script>

{#snippet eventForm(on: Date, close: () => void)}
  <form
    onsubmit={(event) => {
      event.preventDefault();
      void create(on, close);
    }}
  >
    <Stack gap="md">
      <Field label="Title">
        {#snippet children({ id })}
          <Input {id} bind:value={draftTitle} placeholder="Design review" data-autofocus />
        {/snippet}
      </Field>
      <Field label="Starts at">
        {#snippet children({ id })}
          <Input {id} type="time" bind:value={draftTime} />
        {/snippet}
      </Field>
      <Row justify="end">
        <Button label="Cancel" shape="pill" onclick={close} />
        <Button
          type="submit"
          variant="primary"
          shape="pill"
          label="Add event"
          disabled={!draftTitle.trim()}
        />
      </Row>
    </Stack>
  </form>
{/snippet}

<!-- The "+" in a day cell: the Calendar shows it in the hovered, focused or chosen day. -->
{#snippet addToDay({ date, allowed, focused }: CalendarDay)}
  {#if allowed}
    <Popover title="New event · {short.format(date)}" width="19rem" placement="bottom-end">
      {#snippet trigger(props)}
        <button
          type="button"
          class="add-day"
          {...props}
          tabindex={focused ? 0 : -1}
          aria-label="Add to {long.format(date)}"
          title="Add to this day"
        >
          <Icon name="plus" size={14} />
        </button>
      {/snippet}
      {#snippet children(close)}{@render eventForm(date, close)}{/snippet}
    </Popover>
  {/if}
{/snippet}

{#snippet agendaPanel()}
  <div data-note="agenda" class="agenda-wrap">
    <Section title={dayTitle} heading={3} level="panel" gap="sm">
      {#snippet actions()}
        {#if day}
          {@const at = day}
          <Popover
            label="Add to this day"
            icon="plus"
            variant="glass"
            size="sm"
            placement="bottom-end"
            width="19rem"
            title="New event · {short.format(at)}"
          >
            {#snippet children(close)}{@render eventForm(at, close)}{/snippet}
          </Popover>
        {/if}
      {/snippet}
      {#if agenda.length}
        <ul class="agenda">
          {#each agenda as event (event.id)}
            <li style:--c={candy(event.color)} class:fresh={fresh === event.id}>
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
  </div>
{/snippet}

<Page
  title="Calendar"
  subtitle="who meets when"
  gap="lg"
  {sidebar}
  aside={agendaPanel}
  asideWidth="20rem"
  {actions}
>
  <div data-note="stats">
    <Grid min="8.5rem" gap="lg">
      <span class="cue" use:changeCue={thisWeek}>
        <Stat
          label="Events this week"
          value={thisWeek}
          delta={20}
          deltaLabel="vs last week"
          icon="calendar"
        />
      </span>
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
  </div>

  <div class="cal" bind:this={calEl} data-note="calendar">
    <Calendar
      {events}
      today={NOW}
      bind:value={day}
      bind:month
      day={addToDay}
      dayReveal="hover"
      onevent={(event) => (day = startOfDay(toDate(event.start)))}
    />
  </div>

  <Text size="sm" tone="subtle">
    {#if width < 640}
      Tap a day for its agenda below — add to it right there.
    {:else}
      Point at a day to add to it · arrow keys move between days, Page Up / Down between months.
    {/if}
  </Text>
</Page>

<DesignNotes title="Team workspace" {notes} corner="bottom-left" />

<style>
  .agenda-wrap {
    display: grid;
    gap: var(--space-4);
  }
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
  /* A new event rises into its place, wearing its colour as a ring for a moment. */
  .agenda li.fresh {
    animation: arrive var(--motion-lazy) var(--ease-out);
  }
  @keyframes arrive {
    from {
      transform: translateY(8px) scale(0.98);
      box-shadow: 0 0 0 3px color-mix(in srgb, var(--c) 60%, transparent);
    }
    to {
      box-shadow: 0 0 0 3px transparent;
    }
  }
  .bar {
    flex-shrink: 0;
    width: 4px;
    border-radius: var(--radius-pill);
    background: var(--c);
  }
  .cue {
    display: block;
    border-radius: var(--radius-lg);
  }
  .add-day {
    display: grid;
    place-items: center;
    width: 24px;
    height: 24px;
    padding: 0;
    border: 0;
    border-radius: var(--radius-pill);
    background: var(--grad-primary);
    color: var(--on-accent);
    box-shadow: var(--shadow-primary);
    cursor: pointer;
    animation: bb-pop var(--motion-quick) var(--ease-spring);
  }
  .add-day:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
  }
  @media (prefers-reduced-motion: reduce) {
    .agenda li.fresh,
    .add-day {
      animation: none;
    }
  }
</style>
