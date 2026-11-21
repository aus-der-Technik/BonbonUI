<script lang="ts">
  /**
   * Example page: an internal IT service desk as a filling app shell. A front-layer toolbar is
   * the header (queue switch, search, who is signed in); under it the queue sits on the ground,
   * sorted by time left on its service level, and the open ticket is the one panel — its SLA
   * timer in dot-matrix digits, the conversation, and the reply box. Picking up a ticket is
   * done in its row or in the ticket, and the ticket answers there. Storybook only.
   */
  import { tick } from 'svelte';
  import { flip } from 'svelte/animate';
  import Avatar from '../patterns/atoms/Avatar.svelte';
  import Badge from '../patterns/atoms/Badge.svelte';
  import Button from '../patterns/atoms/Button.svelte';
  import DotMatrix from '../patterns/atoms/DotMatrix.svelte';
  import Icon from '../patterns/atoms/Icon.svelte';
  import Select from '../patterns/atoms/Select.svelte';
  import StatusDot from '../patterns/atoms/StatusDot.svelte';
  import { changeCue } from '../patterns/atoms/changed';
  import Composer from '../patterns/molecules/Composer.svelte';
  import DropdownMenu, { type MenuEntry } from '../patterns/molecules/DropdownMenu.svelte';
  import EmptyState from '../patterns/molecules/EmptyState.svelte';
  import SearchField from '../patterns/molecules/SearchField.svelte';
  import SegmentedControl from '../patterns/molecules/SegmentedControl.svelte';
  import Toaster from '../patterns/organisms/Toaster.svelte';
  import Layer from '../patterns/layout/Layer.svelte';
  import Spacer from '../patterns/layout/Spacer.svelte';
  import Page from '../patterns/templates/Page.svelte';
  import { celebrate, greeting } from '../utils/delight';
  import { glide, motion } from '../utils/motion';
  import { ToastQueue } from '../utils/toasts.svelte';
  import DesignNotes, { type DesignNote } from './DesignNotes.svelte';
  import {
    ME,
    agents,
    categories,
    followUps,
    priorities,
    sla,
    statuses,
    tickets as allTickets,
    type MessageKind,
    type Priority,
    type Ticket,
    type TicketStatus,
  } from './mock-enterprise';

  type Queue = 'mine' | 'unassigned' | 'all';

  interface Props {
    /** The queue to open. */
    queue?: Queue;
    /** A ticket to open, e.g. `IT-4831`; the first of the queue when left out. */
    ticket?: string | undefined;
    /** Nothing is waiting to be picked up. */
    empty?: boolean;
  }

  let { queue: startQueue = 'unassigned', ticket: startTicket, empty = false }: Props = $props();

  interface Message {
    id: string;
    kind: MessageKind;
    author: string;
    at: number;
    text: string;
  }
  interface Live {
    id: string;
    title: string;
    requester: Ticket['requester'];
    category: Ticket['category'];
    priority: Priority;
    status: TicketStatus;
    assignee: string | null;
    created: number;
    responded: number | null;
    messages: Message[];
  }

  const opened = Date.now();
  const MIN = 60_000;
  let tickets = $state<Live[]>(
    allTickets.map((t, i) => {
      const quiet = empty && !t.assignee;
      return {
        ...t,
        assignee: quiet ? (agents[1 + (i % 3)]?.name ?? null) : t.assignee,
        status: quiet ? 'open' : t.status,
        created: opened - t.created * MIN,
        responded: quiet
          ? opened - (t.created - 5) * MIN
          : t.responded === null
            ? null
            : opened - t.responded * MIN,
        messages: t.messages.map((m) => ({ ...m, at: opened - m.ago * MIN })),
      };
    }),
  );
  // svelte-ignore state_referenced_locally
  let queue = $state<Queue>(startQueue);
  let query = $state('');
  let now = $state(opened);
  // svelte-ignore state_referenced_locally
  let selectedId = $state<string | null>(startTicket ?? null);
  // svelte-ignore state_referenced_locally
  let showDetail = $state(!!startTicket);
  let mode = $state<'reply' | 'note'>('reply');
  let draft = $state('');
  /** Tickets picked up from the Unassigned queue stay in it (as yours) until the queue changes. */
  let picked = $state<string[]>([]);
  let deskWidth = $state(1200);
  let thread = $state<HTMLElement | undefined>();
  // Bookkeeping only; nothing renders from these.
  // eslint-disable-next-line svelte/prefer-svelte-reactivity
  const followed = new Set<string>();
  // eslint-disable-next-line svelte/prefer-svelte-reactivity
  const timers = new Set<ReturnType<typeof setTimeout>>();
  const toasts = new ToastQueue(6000);
  const flipMs = motion('slow', 'in-out').reduced ? 0 : motion('slow', 'in-out').duration;

  $effect(() => {
    const clock = setInterval(() => (now = Date.now()), 1000);
    return () => {
      clearInterval(clock);
      timers.forEach(clearTimeout);
      toasts.clear();
    };
  });

  const narrow = $derived(deskWidth < 860);
  const first = (name: string) => name.split(' ')[0] ?? name;

  function milestone(t: Live): { kind: 'respond' | 'resolve'; due: number; target: number } | null {
    if (t.status === 'resolved') return null;
    const level = sla[t.priority];
    if (t.responded === null)
      return { kind: 'respond', due: t.created + level.respond * MIN, target: level.respond };
    return { kind: 'resolve', due: t.created + level.resolve * MIN, target: level.resolve };
  }
  const left = (t: Live) => {
    const m = milestone(t);
    return m ? m.due - now : Number.POSITIVE_INFINITY;
  };

  function span(minutes: number) {
    const m = Math.max(0, Math.round(minutes));
    if (m < 60) return `${m} min`;
    const h = Math.floor(m / 60);
    if (h < 24) return m % 60 ? `${h} h ${m % 60} min` : `${h} h`;
    const d = Math.floor(h / 24);
    return h % 24 ? `${d} d ${h % 24} h` : `${d} d`;
  }
  function clock(ms: number) {
    const s = Math.floor(Math.abs(ms) / 1000);
    const hh = Math.floor(s / 3600);
    const mm = String(Math.floor((s % 3600) / 60)).padStart(2, '0');
    const ss = String(s % 60).padStart(2, '0');
    return `${ms < 0 ? '-' : ''}${String(hh).padStart(2, '0')}:${mm}:${ss}`;
  }
  function tone(t: Live): 'late' | 'soon' | 'fine' | 'done' {
    const m = milestone(t);
    if (!m) return 'done';
    const rest = m.due - now;
    if (rest < 0) return 'late';
    return rest < Math.min(60 * MIN, m.target * MIN * 0.5) ? 'soon' : 'fine';
  }
  function rowSla(t: Live) {
    const m = milestone(t);
    if (!m) return 'Resolved';
    const rest = (m.due - now) / MIN;
    if (rest < 0) return `${span(-rest)} over`;
    return `${m.kind === 'respond' ? 'Answer in' : 'Fix in'} ${span(rest)}`;
  }
  const time = (at: number) =>
    new Date(at).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  function when(at: number) {
    const day = new Date(at).toDateString() === new Date(now).toDateString();
    return day
      ? time(at)
      : `${new Date(at).toLocaleDateString('en-GB', { weekday: 'short' })} ${time(at)}`;
  }

  const counts = $derived({
    mine: tickets.filter((t) => t.assignee === ME && t.status !== 'resolved').length,
    unassigned: tickets.filter((t) => !t.assignee).length,
    all: tickets.filter((t) => t.status !== 'resolved').length,
  });

  const shown = $derived(
    tickets
      .filter((t) =>
        queue === 'mine'
          ? t.assignee === ME
          : queue === 'unassigned'
            ? !t.assignee || picked.includes(t.id)
            : true,
      )
      .filter((t) => {
        const q = query.trim().toLowerCase();
        return (
          !q ||
          t.title.toLowerCase().includes(q) ||
          t.id.toLowerCase().includes(q) ||
          t.requester.name.toLowerCase().includes(q) ||
          t.requester.team.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => left(a) - left(b)),
  );

  const selected = $derived(tickets.find((t) => t.id === selectedId));

  // On a wide desk a ticket is always open. Pin the top one by id, so it stays open when a
  // reply or a new priority re-sorts the queue under it.
  $effect(() => {
    if (!narrow && !selected && shown[0]) selectedId = shown[0].id;
  });
  const ms = $derived(selected ? milestone(selected) : null);
  const answeredIn = $derived(
    selected?.responded != null ? (selected.responded - selected.created) / MIN : null,
  );

  function setQueue(next: Queue) {
    queue = next;
    picked = [];
    if (!narrow && !shown.some((t) => t.id === selectedId)) selectedId = shown[0]?.id ?? null;
  }

  function open(t: Live) {
    selectedId = t.id;
    showDetail = true;
    mode = 'reply';
  }

  function log(t: Live, kind: MessageKind, author: string, text: string) {
    t.messages.push({
      id: `live-${t.messages.length}-${Date.now()}`,
      kind,
      author,
      at: Date.now(),
      text,
    });
  }

  function assign(t: Live, to: string) {
    if (t.assignee === to) return;
    t.assignee = to;
    if (t.status === 'new') t.status = 'open';
    if (queue === 'unassigned' && !picked.includes(t.id)) picked.push(t.id);
    log(t, 'event', ME, to === ME ? 'You picked this up' : `You assigned this to ${to}`);
  }

  async function send(text: string) {
    const t = selected;
    if (!t) return;
    if (mode === 'note') {
      log(t, 'note', ME, text);
    } else {
      log(t, 'reply', ME, text);
      if (t.responded === null) t.responded = Date.now();
      t.status = 'waiting';
      if (!t.assignee) assign(t, ME);
      queueFollowUp(t);
    }
    draft = '';
  }

  // The requester answers a little later: news from the background, so a toast when that ticket
  // is not the one on screen.
  function queueFollowUp(t: Live) {
    const answer = followUps[t.id];
    if (!answer || followed.has(t.id)) return;
    followed.add(t.id);
    const timer = setTimeout(() => {
      timers.delete(timer);
      log(t, 'requester', t.requester.name, answer);
      if (t.status === 'waiting') t.status = 'open';
      if (selected?.id !== t.id)
        toasts.push(`${t.requester.name} replied on ${t.id}`, 'ok', {
          action: { label: 'Open', onaction: () => open(t) },
        });
    }, 7000);
    timers.add(timer);
  }

  function resolve(t: Live, origin: HTMLElement) {
    t.status = 'resolved';
    log(t, 'event', ME, 'You resolved this');
    // The end of a real task: a small burst where it was finished.
    celebrate(origin);
  }

  function reopen(t: Live) {
    t.status = 'open';
    log(t, 'event', ME, 'You reopened this');
  }

  function assignMenu(t: Live): MenuEntry[] {
    return [
      { heading: 'Assign to' },
      ...agents.map((a) => ({
        label: `${a.name}${a.name === ME ? ' (you)' : ''} · ${a.away ? 'away' : `${a.load} open`}`,
        icon: a.name === t.assignee ? ('check' as const) : ('user' as const),
        disabled: a.name === t.assignee,
        onselect: () => assign(t, a.name),
      })),
    ];
  }

  $effect(() => {
    void selected?.messages.length;
    void selected?.id;
    tick().then(() => {
      if (thread) thread.scrollTop = thread.scrollHeight;
    });
  });

  const hello = greeting(new Date(), first(ME));

  const notes: DesignNote[] = [
    {
      principle: 'function',
      title: 'The queue is sorted by time left',
      body: 'Not by number or age: what breaches its service level first is on top, with its time left in words. Priority changes move a ticket to its new place in the queue.',
      target: '[data-note="queue"]',
    },
    {
      principle: 'cues',
      title: 'The SLA timer ticks at the ticket',
      body: 'Dot-matrix digits that keep their width while they count down; amber when little time is left, red and negative once it is over. The first answer stops it and the reply time glows in its place.',
      target: '[data-note="sla"]',
    },
    {
      principle: 'locality',
      title: 'Pick up in the row; the ticket answers there',
      body: 'The round key in an unassigned row takes the ticket: your face replaces the key and glows, the row stays put until you change the queue. The open ticket waits for the same action with one shimmering button.',
      target: '[data-note="pick"]',
    },
    {
      principle: 'locality',
      title: 'Reply where the conversation is',
      body: 'The reply box is under the last message. An internal note is tinted and says that only agents see it — and that it does not count as an answer.',
      target: '[data-note="reply"]',
    },
    {
      principle: 'friendly',
      title: 'Background news as a toast, the end with sprinkles',
      body: 'A requester answering a ticket you are not looking at arrives as a toast with “Open”. Resolving is the end of the job: a small burst, once.',
      target: '[data-note="ticket"]',
    },
  ];
</script>

{#snippet header()}
  <div class="toolbar">
    <Layer level="front" direction="horizontal" gap="sm" wrap={false}>
      <span class="brand">
        <span class="brand__mark" aria-hidden="true"><Icon name="headphones" size={18} /></span>
        <strong class="brand__name">Service desk</strong>
      </span>
      <SegmentedControl
        size="sm"
        label="Queue"
        value={queue}
        onchange={setQueue}
        options={[
          { value: 'mine', label: narrow ? `Mine ${counts.mine}` : `Mine · ${counts.mine}` },
          {
            value: 'unassigned',
            label: narrow ? `New ${counts.unassigned}` : `Unassigned · ${counts.unassigned}`,
          },
          { value: 'all', label: narrow ? `All ${counts.all}` : `All · ${counts.all}` },
        ]}
      />
      {#if !narrow}
        <span class="search">
          <SearchField
            label="Search tickets"
            placeholder="Search tickets"
            shape="pill"
            size="sm"
            bind:value={query}
          />
        </span>
      {/if}
      <Spacer />
      <span class="me" title="{ME} · available">
        <Avatar name={ME} size={30} />
        <span class="me__dot"><StatusDot tone="ok" size="sm" aria-label="Available" /></span>
      </span>
    </Layer>
  </div>
{/snippet}

{#snippet row(t: Live)}
  {@const p = priorities[t.priority]}
  {@const pickedUp = picked.includes(t.id)}
  <div class="row" class:current={selected?.id === t.id} class:resolved={t.status === 'resolved'}>
    <span class="prio prio--{t.priority}" title="{p.label} priority"></span>
    <button
      type="button"
      class="row__open"
      aria-current={selected?.id === t.id ? 'true' : undefined}
      onclick={() => open(t)}
    >
      <span class="row__title">{t.title}</span>
      <span class="row__who">
        <Icon name={categories[t.category].icon} size={13} />
        {t.id} · {t.requester.name}, {t.requester.team}
      </span>
      <span class="row__sla row__sla--{tone(t)}">
        <Icon name={tone(t) === 'done' ? 'check-circle' : 'clock'} size={13} />{rowSla(t)}
      </span>
    </button>
    <span class="row__owner" use:changeCue={t.assignee}>
      {#if t.assignee}
        <span title={t.assignee}><Avatar name={t.assignee} size={28} color="auto" /></span>
        {#if pickedUp}<span class="yours" in:glide={{ x: 6, speed: 'quick' }}>Yours</span>{/if}
      {:else}
        <span data-note={t.id === shown.find((s) => !s.assignee)?.id ? 'pick' : undefined}>
          <Button
            variant="soft"
            size="sm"
            icon="user-plus"
            iconOnly
            label="Pick up {t.id}"
            onclick={() => assign(t, ME)}
          />
        </span>
      {/if}
    </span>
  </div>
{/snippet}

{#snippet message(m: Message, t: Live)}
  {#if m.kind === 'event'}
    <li class="event" in:glide={{ y: 6, speed: 'quick' }}>
      <Icon name={m.text.includes('resolved') ? 'check-circle' : 'user'} size={13} />
      {m.text} · {when(m.at)}
    </li>
  {:else}
    <li class="msg msg--{m.kind}" in:glide={{ y: 8 }}>
      <Avatar name={m.author} size={30} color={m.kind === 'requester' ? 'auto' : 'accent'} />
      <div class="msg__body">
        <span class="msg__head">
          <strong>{m.author === ME ? 'You' : m.author}</strong>
          {#if m.kind === 'note'}<span class="msg__tag"
              ><Icon name="lock" size={11} />Internal note</span
            >{:else if m.kind === 'requester'}<span class="muted">{t.requester.team}</span>{/if}
          <span class="muted">{when(m.at)}</span>
        </span>
        <p>{m.text}</p>
      </div>
    </li>
  {/if}
{/snippet}

<Page fill gap="md" {header}>
  <div class="desk" class:narrow bind:clientWidth={deskWidth}>
    {#if !narrow || !showDetail || !selected}
      <section class="queue" data-note="queue" aria-labelledby="queue-title">
        <div class="queue__head">
          <h1 id="queue-title">
            {queue === 'mine'
              ? 'Your tickets'
              : queue === 'unassigned'
                ? 'Unassigned'
                : 'All tickets'}
          </h1>
          <span class="muted">sorted by time left</span>
        </div>
        {#if narrow}
          <SearchField
            label="Search tickets"
            placeholder="Search tickets"
            size="sm"
            bind:value={query}
          />
        {/if}
        {#if shown.length}
          <ul class="rows">
            {#each shown as t (t.id)}
              <li animate:flip={{ duration: flipMs }}>{@render row(t)}</li>
            {/each}
          </ul>
        {:else if query.trim()}
          <EmptyState compact icon="search" message="No ticket matches “{query.trim()}”." />
        {:else}
          <EmptyState
            icon="check-circle"
            title="{hello.text}. Nothing waiting."
            message="Every ticket has someone on it. {hello.wink}"
            actionLabel="Show all tickets"
            onaction={() => setQueue('all')}
          />
        {/if}
      </section>
    {/if}

    {#if selected && (!narrow || showDetail)}
      {@const t = selected}
      {@const p = priorities[t.priority]}
      {#key t.id}
        <div class="ticket" data-note="ticket" in:glide={{ x: narrow ? 16 : 0, y: narrow ? 0 : 6 }}>
          <Layer
            level="panel"
            padding="none"
            gap="none"
            as="article"
            aria-labelledby="ticket-title"
          >
            <header class="ticket__head">
              {#if narrow}
                <Button
                  variant="soft"
                  size="sm"
                  icon="arrow-left"
                  label="Queue"
                  onclick={() => (showDetail = false)}
                />
              {/if}
              <div class="ticket__line">
                <span class="muted">
                  <Icon name={categories[t.category].icon} size={14} />
                  {t.id} · {categories[t.category].label}
                </span>
                <span use:changeCue={t.status}>
                  <Badge tone={statuses[t.status].tone} label={statuses[t.status].label} />
                </span>
              </div>
              <h2 id="ticket-title">{t.title}</h2>
              <div class="ticket__facts">
                <span class="person">
                  <Avatar name={t.requester.name} size={32} color="auto" />
                  <span>
                    <strong>{t.requester.name}</strong>
                    <span class="muted">{t.requester.team} · {t.requester.email}</span>
                  </span>
                </span>

                <label class="prop">
                  <span class="prop__label">Priority</span>
                  <Select
                    size="sm"
                    class="prio-select"
                    value={String(t.priority)}
                    options={([1, 2, 3, 4] as const).map((n) => ({
                      value: String(n),
                      label: `P${n} · ${priorities[n].label}`,
                    }))}
                    onchange={(event) =>
                      (t.priority = Number(event.currentTarget.value) as Priority)}
                  />
                </label>

                <div class="prop">
                  <span class="prop__label">Assignee</span>
                  <span class="assignee" use:changeCue={t.assignee}>
                    {#if t.assignee}
                      <Avatar name={t.assignee} size={24} color="auto" />
                      <span>{t.assignee === ME ? 'You' : first(t.assignee)}</span>
                    {:else}
                      <span class="muted">Nobody yet</span>
                    {/if}
                    <DropdownMenu
                      label="Assign {t.id} to someone"
                      icon="chevron-down"
                      variant="soft"
                      shape="pill"
                      items={assignMenu(t)}
                    />
                  </span>
                </div>
              </div>
            </header>

            <div class="sla sla--{tone(t)}" data-note="sla">
              {#if ms}
                <span class="sla__label" use:changeCue={ms.kind}>
                  {ms.kind === 'respond' ? 'First answer due' : 'Fix due'}
                  <span class="muted">· target {span(ms.target)} for {p.label.toLowerCase()}</span>
                </span>
                <span class="sla__clock" role="timer" aria-live="off">
                  <DotMatrix
                    value={clock(ms.due - now)}
                    label={ms.due - now < 0
                      ? `${span((now - ms.due) / MIN)} over the target`
                      : `${span((ms.due - now) / MIN)} left`}
                    size="lg"
                  />
                </span>
              {:else}
                <span class="sla__label">Resolved</span>
              {/if}
              {#if answeredIn !== null}
                <span class="sla__met" use:changeCue={answeredIn !== null}>
                  <Icon name="check" size={13} />Answered in {span(answeredIn)}
                </span>
              {/if}
            </div>

            <ol class="thread" bind:this={thread} aria-label="Conversation">
              {#each t.messages as m (m.id)}
                {@render message(m, t)}
              {/each}
            </ol>

            <footer class="ticket__foot" data-note="reply">
              {#if t.status === 'resolved'}
                <div class="closed">
                  <span
                    ><Icon name="check-circle" size={16} />Resolved — the requester was told.</span
                  >
                  <Button
                    variant="soft"
                    size="sm"
                    icon="undo"
                    label="Reopen"
                    onclick={() => reopen(t)}
                  />
                </div>
              {:else if !t.assignee}
                <div class="claim">
                  <Button
                    variant="primary"
                    icon="user-plus"
                    label="Pick up this ticket"
                    shimmer
                    onclick={() => assign(t, ME)}
                  />
                  <span class="muted"
                    >Nobody is on it yet. Picking it up tells {first(t.requester.name)}.</span
                  >
                </div>
              {:else}
                <div class="compose">
                  <div class="compose__bar">
                    <SegmentedControl
                      size="sm"
                      label="Write"
                      bind:value={mode}
                      options={[
                        { value: 'reply', label: `Reply to ${first(t.requester.name)}` },
                        { value: 'note', label: 'Internal note' },
                      ]}
                    />
                    <Spacer />
                    <Button
                      variant="soft"
                      size="sm"
                      icon="check-circle"
                      label="Resolve"
                      onclick={(event) => resolve(t, event.currentTarget as HTMLElement)}
                    />
                  </div>
                  <div class="compose__box" class:note={mode === 'note'}>
                    <Composer
                      label={mode === 'note' ? 'Internal note' : `Reply to ${t.requester.name}`}
                      placeholder={mode === 'note'
                        ? 'Only agents see this. It does not count as an answer.'
                        : `Write to ${first(t.requester.name)}…`}
                      buttonLabel={mode === 'note' ? 'Add note' : 'Send'}
                      icon={mode === 'note' ? 'lock' : 'send'}
                      submitOn="mod-enter"
                      minRows={2}
                      maxRows={6}
                      bind:value={draft}
                      onsubmit={send}
                    />
                  </div>
                </div>
              {/if}
            </footer>
          </Layer>
        </div>
      {/key}
    {:else if !narrow}
      <EmptyState icon="inbox" title="No ticket open" message="Pick one from the queue." />
    {/if}
  </div>
</Page>

<Toaster queue={toasts} />
<DesignNotes title="Service desk" {notes} corner="bottom-left" />

<style>
  .muted {
    color: var(--text-2);
    font-size: var(--fs-sm);
  }

  /* Header: one front-layer toolbar, the only glass on the page. */
  .toolbar {
    padding: var(--sticky-gap) var(--gutter) 0;
  }
  .brand {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    padding-right: var(--space-2);
  }
  .brand__mark {
    display: grid;
    place-items: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: var(--accent);
    color: var(--on-accent);
  }
  .brand__name {
    font-weight: var(--fw-semibold);
    white-space: nowrap;
  }
  .search {
    width: min(16rem, 24vw);
  }
  .me {
    position: relative;
    display: inline-flex;
  }
  .me__dot {
    position: absolute;
    right: -2px;
    bottom: -2px;
    display: inline-flex;
    padding: 2px;
    border-radius: 50%;
    background: var(--bg);
  }

  .desk {
    display: grid;
    grid-template-columns: minmax(20rem, 27rem) minmax(0, 1fr);
    gap: var(--space-6);
    min-height: 0;
  }
  .desk.narrow {
    grid-template-columns: minmax(0, 1fr);
  }

  /* The queue: on the ground, rows split by hairlines; the open one on the selected layer. */
  .queue {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    min-height: 0;
    overflow: auto;
    overscroll-behavior: contain;
    padding: 2px var(--space-1) var(--space-4);
    margin: -2px calc(var(--space-1) * -1) 0;
  }
  .queue__head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: var(--space-3);
    padding-inline: var(--space-3);
  }
  .queue__head h1 {
    font-size: var(--fs-xl);
    font-weight: var(--fw-semibold);
  }
  .rows {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .rows > li + li .row {
    border-top-color: var(--border);
  }
  .row {
    position: relative;
    display: grid;
    grid-template-columns: 4px minmax(0, 1fr) auto;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-3) var(--space-3) var(--space-3) var(--space-2);
    border: 1px solid transparent;
    border-radius: var(--radius-md);
    transition: background-color var(--motion-quick) var(--ease-out);
  }
  .row:hover {
    background: var(--fill-hover);
  }
  .row.current {
    background: var(--layer-selected-bg);
    border-color: var(--layer-selected-border);
    box-shadow: var(--layer-selected-shadow);
  }
  .row.resolved .row__title {
    color: var(--text-2);
  }
  .prio {
    align-self: stretch;
    border-radius: var(--radius-pill);
    background: var(--fill-muted);
  }
  .prio--1 {
    background: var(--danger);
  }
  .prio--2 {
    background: var(--warn);
  }
  .prio--3 {
    background: color-mix(in srgb, var(--info) 55%, transparent);
  }
  .row__open {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
    padding: 0;
    border: 0;
    background: none;
    color: inherit;
    font: inherit;
    text-align: left;
    cursor: pointer;
  }
  .row__open::after {
    /* The whole row opens the ticket; the pick-up key sits above this. */
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
  }
  .row__open:focus-visible {
    outline: none;
  }
  .row__open:focus-visible::after {
    box-shadow: var(--focus-ring);
  }
  .row__title {
    font-weight: var(--fw-medium);
    line-height: var(--leading-tight);
  }
  .row__who,
  .row__sla {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    min-width: 0;
    color: var(--text-2);
    font-size: var(--fs-xs);
  }
  .row__who {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .row__sla {
    margin-top: 2px;
    font-weight: var(--fw-medium);
    font-variant-numeric: tabular-nums;
  }
  .row__sla--soon {
    color: var(--draft);
  }
  .row__sla--late {
    color: var(--danger);
  }
  .row__sla--done {
    color: var(--text-3);
  }
  .row__owner {
    position: relative;
    z-index: 1;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    padding: 2px;
    border-radius: var(--radius-pill);
  }
  .row__owner > span {
    display: inline-flex;
  }
  .yours {
    color: var(--accent-ink);
    font-size: var(--fs-2xs);
    font-weight: var(--fw-semibold);
  }

  /* The open ticket: the one panel. Head, timer and reply box stay; the thread scrolls. */
  .ticket {
    display: flex;
    min-height: 0;
  }
  .ticket > :global(.layer) {
    flex: 1;
    min-height: 0;
    display: flex;
    flex-direction: column;
    overflow: clip;
  }
  .ticket__head {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    padding: var(--space-5) var(--space-6) var(--space-4);
    border-bottom: 1px solid var(--border);
  }
  .ticket__head > :global(.btn) {
    align-self: flex-start;
    margin-bottom: var(--space-1);
  }
  .ticket__line {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-3);
  }
  .ticket__line .muted {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
  }
  .ticket__line > span:last-child {
    display: inline-flex;
    border-radius: var(--radius-sm);
  }
  .ticket__head h2 {
    font-size: var(--fs-2xl);
    font-weight: var(--fw-semibold);
    line-height: var(--leading-tight);
    letter-spacing: var(--tracking-tight);
  }
  .ticket__facts {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    gap: var(--space-3) var(--space-6);
    margin-top: var(--space-2);
  }
  .person {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    margin-right: auto;
    min-width: 0;
  }
  .person > span:last-child {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }
  .prop {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
  }
  .prop__label {
    color: var(--text-3);
    font-size: var(--fs-2xs);
    font-weight: var(--fw-semibold);
    text-transform: uppercase;
    letter-spacing: var(--tracking-caps);
  }
  .prop :global(.prio-select) {
    min-width: 0;
  }
  .assignee {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    min-height: var(--control-sm);
    padding: 0 0 0 2px;
    border-radius: var(--radius-pill);
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
  }

  .sla {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: center;
    gap: var(--space-1) var(--space-4);
    padding: var(--space-3) var(--space-6);
    border-bottom: 1px solid var(--border);
  }
  .sla__label {
    width: fit-content;
    padding: 1px 4px;
    margin-left: -4px;
    border-radius: var(--radius-xs);
    font-size: var(--fs-sm);
    font-weight: var(--fw-semibold);
  }
  .sla__label .muted {
    font-weight: var(--fw-regular);
  }
  .sla__clock {
    grid-row: span 2;
    color: var(--text);
    transition: color var(--motion-base) var(--ease-out);
  }
  .sla--soon .sla__clock {
    color: var(--draft);
  }
  .sla--late .sla__clock {
    color: var(--danger);
  }
  .sla__met {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    width: fit-content;
    padding: 1px 4px;
    margin-left: -4px;
    border-radius: var(--radius-xs);
    /* Green pulled towards the text colour: darker on light, lighter on dark. */
    color: color-mix(in srgb, var(--ok) 78%, var(--text));
    font-size: var(--fs-xs);
    font-weight: var(--fw-medium);
  }

  .thread {
    flex: 1 1 auto;
    min-height: 6rem;
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    margin: 0;
    padding: var(--space-5) var(--space-6);
    overflow: auto;
    overscroll-behavior: contain;
    list-style: none;
  }
  .msg {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: var(--space-3);
    max-width: 44rem;
  }
  .msg__body {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
  }
  .msg__head {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: var(--space-2);
    font-size: var(--fs-sm);
  }
  .msg p {
    padding: var(--space-3) var(--space-4);
    border-radius: var(--radius-md);
    background: var(--fill-subtle);
    line-height: var(--leading-body);
  }
  .msg--reply p {
    background: var(--accent-faint);
  }
  .msg--note p {
    background: var(--tint-warn);
  }
  .msg__tag {
    display: inline-flex;
    align-items: center;
    gap: 3px;
    color: var(--draft);
    font-size: var(--fs-xs);
    font-weight: var(--fw-semibold);
  }
  .event {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-1);
    color: var(--text-3);
    font-size: var(--fs-xs);
  }

  .ticket__foot {
    padding: var(--space-4) var(--space-6) var(--space-5);
    border-top: 1px solid var(--border);
  }
  .compose {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }
  .compose__bar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-2);
  }
  .compose__box.note :global(textarea) {
    background: var(--tint-warn);
  }
  .claim {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-3) var(--space-4);
  }
  /* The design-notes pill sits bottom-left on a narrow desk; keep the button clear of it. */
  .desk.narrow .claim {
    flex-direction: row-reverse;
    justify-content: space-between;
  }
  .closed {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-3);
  }
  .closed > span {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    color: color-mix(in srgb, var(--ok) 78%, var(--text));
    font-weight: var(--fw-medium);
  }

  @media (max-width: 520px) {
    .brand__name {
      display: none;
    }
    .ticket__head,
    .sla,
    .thread,
    .ticket__foot {
      padding-inline: var(--space-4);
    }
  }
</style>
