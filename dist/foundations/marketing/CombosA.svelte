<script lang="ts">
  /**
   * Local only (not in git): editorial squares 01–12. Each entry is a serif headline, a
   * sentence or two and a live group of components. `?mk=01` shows one; `?mk=__list` lists them.
   */
  import type { Snippet } from 'svelte';
  import Editorial from './Editorial.svelte';
  import { readQuery, type ListEntry } from './looks';
  import Layer from '../../patterns/layout/Layer.svelte';
  import Stack from '../../patterns/layout/Stack.svelte';
  import Row from '../../patterns/layout/Row.svelte';
  import Button from '../../patterns/atoms/Button.svelte';
  import IconButton from '../../patterns/atoms/IconButton.svelte';
  import Input from '../../patterns/atoms/Input.svelte';
  import StatusText from '../../patterns/atoms/StatusText.svelte';
  import Switch from '../../patterns/atoms/Switch.svelte';
  import Slider from '../../patterns/atoms/Slider.svelte';
  import KpiTile from '../../patterns/molecules/KpiTile.svelte';
  import SegmentedControl from '../../patterns/molecules/SegmentedControl.svelte';
  import Tabs from '../../patterns/molecules/Tabs.svelte';
  import GlassPill from '../../patterns/molecules/GlassPill.svelte';
  import Field from '../../patterns/molecules/Field.svelte';
  import Toast from '../../patterns/molecules/Toast.svelte';
  import IdentityCell from '../../patterns/molecules/IdentityCell.svelte';
  import Calendar from '../../patterns/molecules/Calendar.svelte';
  import PricingCard from '../../patterns/molecules/PricingCard.svelte';
  import NavRail from '../../patterns/organisms/NavRail.svelte';
  import KanbanBoard from '../../patterns/organisms/KanbanBoard.svelte';
  import CommentThread from '../../patterns/organisms/CommentThread.svelte';
  import photo from '../../demo/assets/smart-home-backdrop.jpg';

  interface Combo {
    id: string;
    slug: string;
    tint: string;
    theme: 'light' | 'dark';
    photo?: string;
    eyebrow?: string;
    title: string;
    text: string;
    caption: string;
    layout?: 'top' | 'bottom' | 'left';
    zoom?: number;
    hold?: string;
    show: Snippet;
  }

  const combos: Combo[] = [
    {
      id: '01',
      slug: 'figures-on-the-ground',
      tint: '#007aff',
      theme: 'light',
      title: 'Figures on the ground',
      text: 'The numbers that matter sit right on the page. No box around them, nothing to open.',
      caption: 'KpiTile',
      zoom: 1.55,
      show: kpis,
    },
    {
      id: '02',
      slug: 'the-liquid-drop',
      tint: '#5856d6',
      theme: 'light',
      title: 'The liquid drop',
      text: 'What you choose rides on a drop of glass. It glides to the next choice instead of jumping.',
      caption: 'NavRail · SegmentedControl · Tabs',
      zoom: 1.6,
      show: drop,
    },
    {
      id: '03',
      slug: 'presses-by-layer',
      tint: '#00a89d',
      theme: 'light',
      title: 'Every press stays on its layer',
      text: 'Press on the ground and the pieces around it bob, like things afloat in thick water. On a panel only what lies on it moves; on glass, nothing below does.',
      caption: 'Layer · Button · GlassPill',
      zoom: 1.4,
      show: presses,
    },
    {
      id: '04',
      slug: 'light-from-what-is-on',
      tint: '#ff9500',
      theme: 'dark',
      title: 'Light comes from what is on',
      text: 'A switch that is on, the place you are: they glow, and the surface around them catches it.',
      caption: 'Switch · NavRail · Button',
      zoom: 1.4,
      show: light,
    },
    {
      id: '05',
      slug: 'soft-touch-keys',
      tint: '#c2417a',
      theme: 'light',
      title: 'Soft-touch keys',
      text: 'Round keys you want to press. The ones that are on keep a little colour.',
      caption: 'Button · Slider',
      layout: 'left',
      zoom: 1.35,
      show: keys,
    },
    {
      id: '06',
      slug: 'glass-only-where-it-floats',
      tint: '#9c7a4e',
      theme: 'light',
      title: 'Glass only where it floats',
      text: 'The bar floats over the picture, so it is glass. The panel rests on the page, so it stays solid.',
      caption: 'Layer · Button · Switch',
      zoom: 1.25,
      show: glass,
    },
    {
      id: '07',
      slug: 'a-form-that-answers',
      tint: '#5a9854',
      theme: 'light',
      title: 'A form that answers at the field',
      text: 'Each field says what it needs right under itself, the moment it knows.',
      caption: 'Field · Input · StatusText',
      layout: 'left',
      zoom: 1.2,
      show: form,
    },
    {
      id: '08',
      slug: 'toasts-with-undo',
      tint: '#af52de',
      theme: 'dark',
      title: 'Toasts with Undo',
      text: 'No “are you sure?”. The row leaves at once, and one toast offers to bring it back.',
      caption: 'Toast · IdentityCell · Layer',
      zoom: 1.45,
      show: toasts,
    },
    {
      id: '09',
      slug: 'a-calendar',
      tint: '#e0683f',
      theme: 'light',
      title: 'A month at a glance',
      text: 'Every event sits on its day, and today wears the tint. One calm grid.',
      caption: 'Calendar',
      zoom: 1.0,
      show: calendar,
    },
    {
      id: '10',
      slug: 'a-kanban-card',
      tint: '#0f7c9c',
      theme: 'dark',
      title: 'Work you can hold',
      text: 'Cards carry who, when and how far along. Drag one over and the board makes room.',
      caption: 'KanbanBoard',
      zoom: 1.4,
      show: kanban,
    },
    {
      id: '11',
      slug: 'a-chat-thread',
      tint: '#ff2d55',
      theme: 'light',
      title: 'A conversation in place',
      text: 'The thread sits next to the passage it is about. Reply, react, resolve — right there.',
      caption: 'CommentThread · Reactions · Composer',
      layout: 'bottom',
      zoom: 1.35,
      show: thread,
    },
    {
      id: '12',
      slug: 'pricing-cards',
      tint: '#8e5bb5',
      theme: 'dark',
      title: 'Plans, side by side',
      text: 'Three honest prices. The one most people pick is lifted, not shouted.',
      caption: 'PricingCard',
      zoom: 1.1,
      show: pricing,
    },
  ];

  const q = readQuery();
  const list: ListEntry[] = combos.map((c) => ({
    name: c.id,
    file: `${c.id}-${c.slug}`,
    hold: c.hold,
  }));
  const combo = combos.find((c) => c.id === q.mk) ?? combos[0]!;

  // 03 — the pieces of each row, and which one the finger presses
  const pieceIcons = ['sun', 'moon', 'wind', 'droplet', 'bolt'];
  const PRESSED_KEY = 2;

  // A fixed day keeps every capture the same.
  const day = new Date(2026, 4, 14, 10, 0);
  const at = (d: number, h = 9, m = 0) => new Date(2026, 4, d, h, m);
  const ago = (min: number) => new Date(day.getTime() - min * 60_000);

  let rail = $state('home');
  let range = $state('week');
  let view = $state('list');
  let tab = $state('activity');
  let lamps = $state(true);
  let heat = $state(false);
  let music = $state(true);
  let place = $state('living');
  let volume = $state(64);
  let email = $state('ada@example');
  let handle = $state('ada.lovelace');
  let name = $state('Ada Example');
  let lights = $state(true);
  let blinds = $state(false);
</script>

{#snippet kpis()}
  <div class="kpis">
    <KpiTile label="Orders" value="1,284" delta="+12 %" detail="vs last week" icon="cart" />
    <KpiTile label="Revenue" value="€38.5k" delta="+8 %" detail="this month" icon="trending-up" />
    <KpiTile
      label="Returns"
      value="2.1 %"
      delta={-0.4}
      goodWhen="down"
      deltaLabel="vs last month"
      icon="undo"
    />
    <KpiTile
      label="Stock"
      value="86 %"
      detail="of shelves filled"
      icon="package"
      meter={[
        { value: 62, color: 'var(--accent)' },
        { value: 24, color: 'var(--accent-soft)' },
      ]}
    />
  </div>
{/snippet}

{#snippet drop()}
  <div class="drop">
    <div class="drop__rail">
      <NavRail
        label="Sections"
        bind:current={rail}
        items={[
          { id: 'home', label: 'Overview', icon: 'home' },
          { id: 'calendar', label: 'Schedule', icon: 'calendar' },
          { id: 'activity', label: 'Activity', icon: 'activity' },
          { id: 'settings', label: 'Settings', icon: 'settings' },
        ]}
      />
    </div>
    <Stack gap="xl">
      <SegmentedControl
        label="Range"
        bind:value={range}
        options={[
          { value: 'day', label: 'Day' },
          { value: 'week', label: 'Week' },
          { value: 'month', label: 'Month' },
        ]}
      />
      <SegmentedControl
        label="View"
        variant="accent"
        bind:value={view}
        options={[
          { value: 'list', label: 'List', icon: 'list' },
          { value: 'board', label: 'Board', icon: 'grid' },
        ]}
      />
      <Tabs
        label="Sections"
        variant="pill"
        bind:value={tab}
        tabs={[
          { value: 'notes', label: 'Notes' },
          { value: 'activity', label: 'Activity', count: 3 },
          { value: 'files', label: 'Files' },
        ]}
      />
    </Stack>
  </div>
{/snippet}

<!-- Frozen mid-press (one pointer can only press one thing): each piece is drawn where the wave
     has carried it, with a dashed ghost where it rests, the way the squeeze card freezes its bars. -->
{#snippet piece(icon: string, i: number)}
  {@const d = Math.abs(i - PRESSED_KEY)}
  {@const bob = d === 0 ? 0 : d === 1 ? 11 : d === 2 ? 4.5 : 0}
  <span class="piece">
    {#if bob}<span class="piece__ghost" aria-hidden="true"></span>{/if}
    <span
      class="piece__body"
      style:transform={d === 0
        ? 'var(--press-squish)'
        : `translateY(${bob}px) rotate(${(i < PRESSED_KEY ? -1 : 1) * bob * 0.5}deg)`}
    >
      <Button variant="soft" size="lg" icon={icon as 'sun'} label={icon} iconOnly />
    </span>
    {#if d === 0}<span class="finger" aria-hidden="true"></span>{/if}
  </span>
{/snippet}

{#snippet presses()}
  <div class="presses">
    <div class="presses__label">
      <span class="tag">Ground</span>
      <span class="muted">the pieces around it bob</span>
    </div>
    <div class="presses__row">
      {#each pieceIcons as icon, i (icon)}{@render piece(icon, i)}{/each}
    </div>

    <div class="presses__label">
      <span class="tag">Panel</span>
      <span class="muted">pieces bob, the tile stays</span>
    </div>
    <Layer level="panel" direction="horizontal" padding="md" gap="md" class="presses__panel">
      {#each pieceIcons as icon, i (icon)}{@render piece(icon, i)}{/each}
    </Layer>

    <div class="presses__label">
      <span class="tag">Glass</span>
      <span class="muted">nothing below moves</span>
    </div>
    <div class="presses__glass">
      <GlassPill label="Glass tools">
        {#each ['bold', 'italic', 'link', 'quote', 'list'] as icon, i (icon)}
          <span class="piece">
            <span
              class="piece__body"
              style:transform={i === PRESSED_KEY ? 'var(--press-squish)' : undefined}
            >
              <IconButton icon={icon as 'bold'} label={icon} hint={false} />
            </span>
            {#if i === PRESSED_KEY}<span class="finger" aria-hidden="true"></span>{/if}
          </span>
        {/each}
      </GlassPill>
    </div>
  </div>
{/snippet}

{#snippet light()}
  <div class="light">
    <NavRail
      orientation="horizontal"
      label="Rooms"
      bind:current={place}
      items={[
        { id: 'living', label: 'Living room', icon: 'home' },
        { id: 'kitchen', label: 'Kitchen', icon: 'utensils' },
        { id: 'study', label: 'Study', icon: 'book' },
        { id: 'garden', label: 'Garden', icon: 'sun' },
      ]}
    />
    <Layer level="panel" padding="lg" gap="lg" class="light__panel">
      <Switch label="Lamps" description="Three lamps, warm white" bind:checked={lamps} />
      <Switch label="Floor heating" description="Off until 6 am" bind:checked={heat} />
      <Switch label="Music" description="Quiet, in two rooms" bind:checked={music} />
      <Row gap="sm" justify="end">
        <Button variant="ghost" label="Later" />
        <Button variant="primary" icon="moon" label="Evening" />
      </Row>
    </Layer>
  </div>
{/snippet}

{#snippet keys()}
  <div class="keys">
    <div class="keys__grid">
      {#each [['wind', true], ['sun', false], ['droplet', true], ['moon', false], ['thermometer', false], ['bolt', true]] as [icon, on] (icon)}
        <Button
          variant="soft"
          size="xl"
          icon={icon as 'sun'}
          label={String(icon)}
          iconOnly
          aria-pressed={on as boolean}
        />
      {/each}
    </div>
    <div class="keys__slider">
      <Slider label="Volume" bind:value={volume} />
    </div>
  </div>
{/snippet}

{#snippet glass()}
  <div class="glass">
    <div class="glass__pic">
      <img src={photo} alt="A house in a meadow" />
      <div class="glass__bar">
        <Layer level="front" direction="horizontal" gap="sm">
          <Button variant="ghost" icon="home" label="Home" />
          <Button variant="ghost" icon="calendar" label="Viewings" />
          <Button variant="glass" icon="sparkles" label="Arrange a visit" />
        </Layer>
      </div>
    </div>
    <Layer level="panel" padding="lg" direction="horizontal" gap="xl" class="glass__panel">
      <Switch label="Lights in the hall" description="Three lamps, 70 %" bind:checked={lights} />
      <Switch label="Blinds" description="Down at sunset" bind:checked={blinds} />
    </Layer>
  </div>
{/snippet}

{#snippet form()}
  <Layer level="panel" padding="lg" gap="lg" class="form">
    <Field label="Name">
      {#snippet children({ id })}<Input {id} bind:value={name} />{/snippet}
    </Field>
    <Field label="E-mail" required error="Add the part after the dot, like .com">
      {#snippet children({ id, errorId, invalid })}
        <Input {id} bind:value={email} {invalid} aria-describedby={errorId} />
      {/snippet}
    </Field>
    <Field label="Handle" hint="Shown next to your comments">
      {#snippet children({ id })}
        <Stack gap="xs">
          <Input {id} bind:value={handle} />
          <StatusText tone="ok" message="That one is free." />
        </Stack>
      {/snippet}
    </Field>
    <Row justify="end"><Button variant="primary" label="Create account" /></Row>
  </Layer>
{/snippet}

{#snippet toasts()}
  <div class="toasts">
    <Layer level="panel" padding="md" gap="md" class="toasts__list">
      <IdentityCell name="Ada Example" subtitle="ada@example.com" />
      <IdentityCell name="Cleo Test" subtitle="cleo@example.com" />
      <IdentityCell name="Dan Demo" subtitle="dan@example.com" />
    </Layer>
    <div class="toasts__toast">
      <Toast tone="neutral" icon="trash" title="Ben Sample removed" ondismiss={() => {}}>
        {#snippet actions()}<Button size="sm" variant="soft" icon="undo" label="Undo" />{/snippet}
      </Toast>
    </div>
  </div>
{/snippet}

{#snippet calendar()}
  <div class="calendar">
    <Calendar
      value={at(14)}
      today={day}
      weekStart={1}
      locale="en-GB"
      maxEvents={2}
      events={[
        { id: '1', title: 'Review', start: at(5, 10), color: 'blue' },
        { id: '2', title: 'Lunch', start: at(7, 12), color: 'orange' },
        { id: '3', title: 'Offsite', start: at(11), end: at(13), allDay: true, color: 'green' },
        { id: '4', title: 'Launch', start: at(14, 9), color: 'pink' },
        { id: '5', title: 'Retro', start: at(14, 16), color: 'purple' },
        { id: '6', title: 'Dentist', start: at(19, 8), color: 'teal' },
        { id: '7', title: 'Planning', start: at(21, 10), color: 'blue' },
        { id: '8', title: 'Holiday', start: at(26), end: at(29), allDay: true, color: 'yellow' },
      ]}
    />
  </div>
{/snippet}

{#snippet kanban()}
  <div class="kanban">
    <KanbanBoard
      label="Launch"
      columnWidth="17rem"
      now={day}
      locale="en-GB"
      selected="c2"
      columns={[
        { id: 'doing', title: 'In progress', color: 'blue', limit: 3 },
        { id: 'review', title: 'In review', color: 'purple' },
      ]}
      cards={[
        {
          id: 'c1',
          column: 'doing',
          title: 'Write the launch note',
          tags: [{ label: 'copy', color: 'orange' }],
          assignees: [{ name: 'Ada Example' }],
          due: at(16),
          tasks: { done: 2, total: 5 },
        },
        {
          id: 'c2',
          column: 'doing',
          title: 'New onboarding screens',
          description: 'Three steps, one idea per screen.',
          tags: [
            { label: 'design', color: 'pink' },
            { label: 'web', color: 'blue' },
          ],
          assignees: [{ name: 'Cleo Test' }, { name: 'Ben Sample' }],
          due: at(15),
          priority: 'high',
          comments: 4,
          tasks: { done: 4, total: 6 },
        },
        {
          id: 'c3',
          column: 'review',
          title: 'Price page copy',
          tags: [{ label: 'copy', color: 'orange' }],
          assignees: [{ name: 'Dan Demo' }],
          comments: 2,
          tasks: { done: 3, total: 3 },
        },
      ]}
    />
  </div>
{/snippet}

{#snippet thread()}
  <div class="thread">
    <CommentThread
      now={day}
      locale="en-GB"
      quote="Every press is answered where it lands."
      canReply
      onreply={() => {}}
      comments={[
        {
          id: '1',
          author: 'Ada Example',
          time: ago(48),
          text: 'Can we say this a little softer?',
          role: 'Owner',
        },
        {
          id: '2',
          author: 'Ben Sample',
          time: ago(21),
          text: 'I like it as it is — short and true.',
          reactions: [
            { emoji: '👍', count: 3, mine: true },
            { emoji: '✨', count: 1 },
          ],
        },
        {
          id: '3',
          author: 'Ada Example',
          time: ago(6),
          text: 'Fair. Let’s keep it, then.',
          role: 'Owner',
        },
      ]}
    />
  </div>
{/snippet}

{#snippet pricing()}
  <div class="pricing">
    <PricingCard
      name="Solo"
      price={0}
      period="month"
      currency="EUR"
      description="For one person and a few projects."
      features={['3 projects', 'Shared links', { label: 'Version history', included: false }]}
      ctaLabel="Start free"
    />
    <PricingCard
      name="Team"
      price={12}
      period="month"
      currency="EUR"
      badge="Most popular"
      highlighted
      description="For a team that works in one place."
      features={['Unlimited projects', 'Shared links', 'Version history']}
      ctaLabel="Choose Team"
    />
    <PricingCard
      name="Studio"
      price={29}
      period="month"
      currency="EUR"
      description="For many teams and their guests."
      features={['Everything in Team', 'Guest access', 'Priority help']}
      ctaLabel="Choose Studio"
    />
  </div>
{/snippet}

{#if q.mk === '__list'}
  <pre id="mk-list">{JSON.stringify(list)}</pre>
{:else}
  {#key combo.id}
    <Editorial
      tint={combo.tint}
      theme={combo.theme}
      photo={combo.photo}
      eyebrow={combo.eyebrow}
      title={combo.title}
      text={combo.text}
      caption={combo.caption}
      layout={combo.layout}
      zoom={combo.zoom}
    >
      {@render combo.show()}
    </Editorial>
  {/key}
{/if}

<style>
  .kpis {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-8) var(--space-10);
    width: 34rem;
  }
  .drop {
    --app-height: 19rem;
    display: flex;
    align-items: center;
    gap: var(--space-10);
  }
  .drop__rail {
    display: flex;
    height: 19rem;
  }
  .presses {
    display: grid;
    grid-template-columns: 12rem auto;
    align-items: center;
    column-gap: var(--space-6);
    row-gap: var(--space-8);
  }
  .presses__label {
    display: grid;
    gap: var(--space-1);
  }
  .presses__row,
  .presses__glass {
    display: flex;
    gap: var(--space-4);
  }
  .presses :global(.presses__panel) {
    justify-self: start;
  }
  .presses__glass :global(.layer) {
    gap: var(--space-2);
  }
  .piece {
    position: relative;
    display: inline-grid;
  }
  .piece__body {
    display: inline-grid;
  }
  /* Where a piece rests, while the wave has carried it. */
  .piece__ghost {
    position: absolute;
    inset: 0;
    border: 1.5px dashed color-mix(in srgb, var(--text-3) 70%, transparent);
    border-radius: 50%;
  }
  /* The finger on the pressed piece (the same mark as on the slide card). */
  .finger {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 34px;
    height: 34px;
    margin: -17px 0 0 -17px;
    border: 2.5px solid var(--accent);
    border-radius: 50%;
    box-shadow: 0 0 0 6px var(--accent-soft);
    pointer-events: none;
  }
  .tag {
    font-size: var(--fs-xs);
    font-weight: var(--fw-semibold);
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--text-3);
  }
  .muted {
    color: var(--text-2);
    font-size: var(--fs-sm);
  }
  .light {
    display: grid;
    justify-items: center;
    gap: var(--space-6);
  }
  .light :global(.light__panel) {
    width: 26rem;
  }
  .keys {
    display: grid;
    justify-items: center;
    gap: var(--space-8);
  }
  .keys__grid {
    display: grid;
    grid-template-columns: repeat(3, auto);
    gap: var(--space-5);
  }
  .keys__slider {
    width: 100%;
  }
  .glass {
    display: grid;
    justify-items: center;
    gap: var(--space-6);
  }
  .glass__pic {
    position: relative;
    width: 32rem;
    height: 17rem;
    border-radius: var(--radius-card);
    overflow: clip;
    box-shadow: var(--layer-panel-shadow);
  }
  .glass__pic img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 60% 70%;
  }
  .glass__bar {
    position: absolute;
    left: 0;
    right: 0;
    bottom: var(--space-4);
    display: flex;
    justify-content: center;
  }
  .glass :global(.glass__panel) {
    width: 32rem;
  }
  :global(.form) {
    width: 22rem;
  }
  .toasts {
    display: grid;
    justify-items: center;
    gap: var(--space-5);
  }
  .toasts :global(.toasts__list) {
    width: 24rem;
  }
  .toasts__toast {
    width: 24rem;
  }
  .calendar {
    width: 50rem;
  }
  .kanban {
    width: 36rem;
  }
  .thread {
    width: 28rem;
  }
  .pricing {
    display: grid;
    grid-template-columns: repeat(3, 15.5rem);
    gap: var(--space-4);
    align-items: center;
  }
</style>
