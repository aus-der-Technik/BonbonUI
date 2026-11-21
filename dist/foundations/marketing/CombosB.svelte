<script lang="ts">
  /**
   * Local only (not in git): editorial squares 13–24. Each entry is a serif headline, a
   * sentence or two and a live group of components. `?mk=13` shows one; `?mk=__list` lists them.
   */
  import type { Snippet } from 'svelte';
  import Editorial from './Editorial.svelte';
  import { readQuery, type ListEntry } from './looks';
  import Avatar from '../../patterns/atoms/Avatar.svelte';
  import Badge from '../../patterns/atoms/Badge.svelte';
  import Button from '../../patterns/atoms/Button.svelte';
  import Card from '../../patterns/atoms/Card.svelte';
  import DotMatrix from '../../patterns/atoms/DotMatrix.svelte';
  import Icon from '../../patterns/atoms/Icon.svelte';
  import IconButton from '../../patterns/atoms/IconButton.svelte';
  import Slider from '../../patterns/atoms/Slider.svelte';
  import Text from '../../patterns/atoms/Text.svelte';
  import Stack from '../../patterns/layout/Stack.svelte';
  import ArcGauge from '../../patterns/molecules/ArcGauge.svelte';
  import CartLine from '../../patterns/molecules/CartLine.svelte';
  import DropdownMenu from '../../patterns/molecules/DropdownMenu.svelte';
  import IdentityCell from '../../patterns/molecules/IdentityCell.svelte';
  import ProductCard from '../../patterns/molecules/ProductCard.svelte';
  import SignInCard from '../../patterns/molecules/SignInCard.svelte';
  import TaskList from '../../patterns/molecules/TaskList.svelte';
  import ToggleChip from '../../patterns/molecules/ToggleChip.svelte';
  import CartSummary from '../../patterns/organisms/CartSummary.svelte';
  import ChartCard from '../../patterns/organisms/ChartCard.svelte';
  import HorizontalBarChart from '../../patterns/organisms/HorizontalBarChart.svelte';
  import LineChart from '../../patterns/organisms/LineChart.svelte';
  import Desktop from '../../patterns/desktop/Desktop.svelte';
  import Dock from '../../patterns/desktop/Dock.svelte';
  import MenuBar from '../../patterns/desktop/MenuBar.svelte';
  import Window from '../../patterns/desktop/Window.svelte';
  import { boxWithin, pillPath } from '../../utils/liquid';
  import Layer from '../../patterns/layout/Layer.svelte';
  import Row from '../../patterns/layout/Row.svelte';
  import StatusText from '../../patterns/atoms/StatusText.svelte';
  import GlimmerPanel from '../../patterns/organisms/GlimmerPanel.svelte';
  import DesktopApp from '../../demo/DesktopApp.svelte';
  import SeaTrafficChart from '../../demo/SeaTrafficChart.svelte';
  import { ships as seaShips } from '../../demo/mock-sea';
  import { navGroups } from '../../demo/mock';
  import NavRail from '../../patterns/organisms/NavRail.svelte';
  import SideNav from '../../patterns/organisms/SideNav.svelte';
  import { appMenus, dock as dockItems, mails as seedMails } from '../../demo/mock-desktop';
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
    slide?: string;
    show: Snippet;
  }

  const combos: Combo[] = [
    {
      id: '13',
      slug: 'sign-in-card',
      tint: '#6f8f5e',
      theme: 'light',
      photo,
      title: 'A door, not a wall',
      text: 'One card and one button. It says why you are asked, and nothing else.',
      caption: 'SignInCard',
      zoom: 1.3,
      show: signIn,
    },
    {
      id: '14',
      slug: 'music-transport',
      tint: '#af52de',
      theme: 'dark',
      title: 'Playback, in dots',
      text: 'The time is set in lit dots and the keys sit under your thumb. Only what is on wears the tint.',
      caption: 'DotMatrix · Slider · Button',
      layout: 'bottom',
      zoom: 1.65,
      show: music,
    },
    {
      id: '15',
      slug: 'arc-gauge-current',
      tint: '#e0683f',
      theme: 'light',
      title: 'Two numbers, one arc',
      text: 'The lit ticks show what you set. The glow shows where the room is now, and closes the gap as it warms.',
      caption: 'ArcGauge',
      zoom: 1.2,
      show: gauges,
    },
    {
      id: '16',
      slug: 'dot-matrix-figures',
      tint: '#00a89d',
      theme: 'dark',
      title: 'Figures in lit dots',
      text: 'For what you read from across the room: a clock, a temperature, a count down.',
      caption: 'DotMatrix · Card',
      layout: 'left',
      zoom: 1.45,
      show: dots,
    },
    {
      id: '17',
      slug: 'charts',
      tint: '#5856d6',
      theme: 'light',
      title: 'Charts that keep quiet',
      text: 'One accent line, a soft grid and the figure that matters. Each series switches at its own chip.',
      caption: 'ChartCard · LineChart · HorizontalBarChart',
      zoom: 1.3,
      show: charts,
    },
    {
      id: '18',
      slug: 'dock-and-windows',
      tint: '#007aff',
      theme: 'light',
      title: 'A desk of your own',
      text: 'Windows grow out of the tray and shrink back into it, so you always know where they went.',
      caption: 'Desktop · Window · Dock · MenuBar',
      zoom: 1.2,
      show: desk,
    },
    {
      id: '19',
      slug: 'product-and-cart',
      tint: '#c2417a',
      theme: 'light',
      title: 'From card to cart',
      text: 'Add it where you see it. The cart counts along and says how close free shipping is.',
      caption: 'ProductCard · CartLine · CartSummary',
      zoom: 1.15,
      show: shop,
    },
    {
      id: '20',
      slug: 'squeeze-settings',
      tint: '#8e5bb5',
      theme: 'dark',
      title: 'The squeeze',
      text: 'Press a glass bar and it gives like a rubber band, swelling out right under the finger.',
      caption: 'pillPath · squeeze',
      zoom: 1.5,
      show: squeezes,
    },
    {
      id: '21',
      slug: 'create-on-the-collection',
      tint: '#5a9854',
      theme: 'light',
      title: 'Create sits on what it adds to',
      text: 'Invite lives on the list of members, not in a menu far away. The new row appears where you looked.',
      caption: 'Card · IdentityCell · Button',
      zoom: 1.4,
      show: members,
    },
    {
      id: '22',
      slug: 'delight-at-the-end',
      tint: '#ff9500',
      theme: 'light',
      title: 'A small cheer at the end',
      text: 'Tick the last task and a few sprinkles fly. Delight is for finishing, never for errors.',
      caption: 'TaskList',
      layout: 'bottom',
      zoom: 1.6,
      show: cheer,
    },
    {
      id: '23',
      slug: 'pill-rounded-circle',
      tint: '#9c7a4e',
      theme: 'light',
      title: 'Pill, rounded, circle',
      text: 'A pill acts, a rounded card holds, a circle is someone. The shape says it before the label does.',
      caption: 'Button · Card · Avatar',
      zoom: 1.4,
      show: shapes,
    },
    {
      id: '24',
      slug: 'popups-grow-from-their-trigger',
      tint: '#0f7c9c',
      theme: 'dark',
      title: 'Menus grow from their trigger',
      text: 'The menu opens out of the button you pressed, right where your eyes already are.',
      caption: 'DropdownMenu',
      zoom: 1,
      show: menu,
    },
    {
      id: '25',
      slug: 'mail-desk',
      tint: '#0f7c9c',
      theme: 'light',
      title: 'A desk of your own',
      text: 'Mailboxes, the list and the message side by side in one window. Windows grow out of the tray and shrink back into it.',
      caption: 'Desktop · Window · SourceList · Dock · MenuBar',
      zoom: 1,
      show: mailDesk,
    },
    {
      id: '26',
      slug: 'rail-frames',
      tint: '#5856d6',
      theme: 'light',
      title: 'Frame it, or not',
      text: 'The glass rail wears a soft white frame inside its edge. Make it wider, finer, or leave only the hairline.',
      caption: 'NavRail · frame · frameWidth',
      zoom: 1.3,
      show: railFrames,
    },
    {
      id: '27',
      slug: 'sidenav-selection',
      tint: '#e0592a',
      theme: 'light',
      title: 'Three ways to say “here”',
      text: 'A frame, the tint alone, or a slim bar beside it. Whichever you pick, it flows to the next page.',
      caption: 'SideNav · selection',
      zoom: 1.35,
      show: sideNavSelection,
    },
    {
      id: '28',
      slug: 'sea-chart',
      tint: '#0f7c9c',
      theme: 'light',
      title: 'A chart of the sea',
      text: 'Drawn, not tiled: coast, lanes, wind and the ships that move along them, in the same quiet ink as every chart.',
      caption: 'Sea traffic',
      zoom: 1,
      show: seaChart,
    },
    {
      id: '29',
      slug: 'menu-light-photo',
      tint: '#9c7a4e',
      theme: 'light',
      title: 'Frost over a picture',
      text: 'Over a photo the menu is milky frost: the picture stays a soft colour behind the words.',
      caption: 'DropdownMenu · light',
      zoom: 1,
      show: popPhoto,
    },
    {
      id: '30',
      slug: 'menu-dark-photo',
      tint: '#9c7a4e',
      theme: 'dark',
      title: 'Smoked glass at night',
      text: 'The same menu in the dark theme: smoked glass, one light edge on top, the picture still there.',
      caption: 'DropdownMenu · dark',
      zoom: 1,
      show: popPhoto,
    },
    {
      id: '31',
      slug: 'menu-light-text',
      tint: '#007aff',
      theme: 'light',
      title: 'More frost over busy text',
      text: 'Over dense text, raise the blur. The lines behind dissolve and the menu reads cleanly.',
      caption: '--blur-pill: blur(32px)',
      zoom: 1,
      show: popText,
    },
    {
      id: '32',
      slug: 'menu-dark-chart',
      tint: '#00a89d',
      theme: 'dark',
      title: 'Clearer glass over a chart',
      text: 'Lower the blur and the chart shows through, so you keep your place while you choose.',
      caption: '--blur-pill · --glass-strong',
      zoom: 1,
      show: popChart,
    },
    {
      id: '33',
      slug: 'a-glow-while-it-writes',
      tint: '#5856d6',
      theme: 'dark',
      title: 'A glow while it writes',
      text: 'While the answer is written, light turns slowly round its panel. When it is done, the glow lets go.',
      caption: 'GlimmerPanel',
      zoom: 1.45,
      show: glimmer,
    },
    {
      id: '34',
      slug: 'slide-then-let-go',
      tint: '#e0683f',
      theme: 'light',
      title: 'Slide, then let go',
      text: 'Hold an item and the squeeze follows your finger along the rail. Let go over another one and it is picked.',
      caption: 'NavRail · squeeze',
      zoom: 1.3,
      hold: '.slide__one--held li:nth-child(1) .rail__item',
      slide: '.slide__one--held li:nth-child(4) .rail__item',
      show: slideRails,
    },
    {
      id: '35',
      slug: 'never-a-panel-on-a-panel',
      tint: '#0f7c9c',
      theme: 'light',
      title: 'Never a panel on a panel',
      text: 'Two tiles stacked are two rims and two shadows saying nothing. Put a panel in a panel and it becomes a quiet well by itself.',
      caption: 'Layer · panel',
      zoom: 1.25,
      show: wells,
    },
  ];

  const q = readQuery();
  const list: ListEntry[] = combos.map((c) => ({
    name: c.id,
    file: `${c.id}-${c.slug}`,
    hold: c.hold,
    slide: c.slide,
  }));
  const combo = combos.find((c) => c.id === q.mk) ?? combos[0]!;

  const noop = () => {};

  // 33 — caught mid-sentence
  const writing =
    'Yes: the Riverside Hall takes 300 people and is step-free. It is four minutes from the ' +
    'station, and the terrace opens onto';

  // 34 — the press slid from the first item to the fourth: a trail beside the held rail
  const railItems = [
    { id: 'home', label: 'Overview', icon: 'home' as const },
    { id: 'calendar', label: 'Schedule', icon: 'calendar' as const },
    { id: 'mail', label: 'Messages', icon: 'mail' as const },
    { id: 'activity', label: 'Sensors', icon: 'activity' as const },
    { id: 'settings', label: 'Settings', icon: 'settings' as const },
  ];
  let held = $state<HTMLElement>();
  let trail = $state<{ top: number; height: number } | null>(null);
  $effect(() => {
    const el = held;
    if (!el) return;
    const id = requestAnimationFrame(() => {
      const items = el.querySelectorAll<HTMLElement>('.rail__item');
      const from = items[0];
      const to = items[3];
      if (!from || !to) return;
      const a = boxWithin(from, el);
      const b = boxWithin(to, el);
      trail = { top: a.y + a.h / 2, height: b.y + b.h / 2 - (a.y + a.h / 2) };
    });
    return () => cancelAnimationFrame(id);
  });

  // 14 — playback
  let position = $state(79);
  const clock = (s: number) =>
    `${Math.floor(s / 60)}:${String(Math.round(s) % 60).padStart(2, '0')}`;

  // 15 — two gauges: warming up, cooling down
  let warm = $state(22);
  let cool = $state(19.5);

  // 17 — charts
  let web = $state(true);
  let app = $state(true);
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const visits = [42, 51, 47, 63, 58, 71, 76].map((value, i) => ({ label: days[i]!, value }));

  // 18 — the desk
  const morning = new Date(2026, 10, 6, 9, 30);
  let mailList = $state(seedMails.map((m) => ({ ...m })));
  let mailOpen = $state<string | undefined>('m1');

  // 19 — cart
  let cups = $state(2);

  // 22 — all ticked, with the sprinkles caught mid-flight
  let tasks = $state([
    { id: '1', label: 'Draft the menu', done: true },
    { id: '2', label: 'Order the flowers', done: true },
    { id: '3', label: 'Send the invitations', done: true },
  ]);
  const sprinkleColours = ['--color-pink', '--color-yellow', '--color-mint', '--color-blue'];
  const sprinkles = Array.from({ length: 14 }, (_, i) => {
    // Thrown from the card's corner, outwards: up, left along the top and down the right side.
    const angle = ((-160 + (230 * i) / 13 + (i % 3) * 6) * Math.PI) / 180;
    const dist = 30 + ((i * 17) % 34);
    return {
      dx: Math.cos(angle) * dist,
      dy: Math.sin(angle) * dist,
      rot: (i * 47) % 360,
      long: i % 3 === 0,
      colour: sprinkleColours[i % sprinkleColours.length]!,
    };
  });

  // 24 — the menu lives in the top layer, where the group's scale does not reach; so this
  // square grows the root font instead (everything is in rem) and keeps its own text at the
  // usual size. Then the menu opens once it is on screen, the way a press would.
  // Menus open in the top layer, where the frame's zoom does not reach: these cards scale the
  // root font instead.
  const POPUPS = ['24', '29', '30', '31', '32'];
  if (POPUPS.includes(combo.id) && typeof document !== 'undefined') {
    document.documentElement.classList.add('mk-big');
  }
  let menuHost = $state<HTMLElement>();
  $effect(() => {
    if (!POPUPS.includes(combo.id) || !menuHost) return;
    const t = setTimeout(
      () => menuHost?.querySelector<HTMLElement>('[aria-haspopup="menu"]')?.click(),
      500,
    );
    return () => clearTimeout(t);
  });

  // 20 — squeeze settings, each frozen at the bottom of a press on the third tool.
  const ROOM = 8;
  const PRESSED = 2;
  const settings = [
    { name: 'At rest', values: 'no press', amount: 0, bulge: 0, reach: 34 },
    { name: 'Gentle', values: '3 % · 4 px swell · the default', amount: 0.03, bulge: 4, reach: 34 },
    { name: 'Medium', values: '6 % · 6 px swell', amount: 0.06, bulge: 6, reach: 34 },
    { name: 'Strong', values: '9.5 % · 7.5 px swell', amount: 0.095, bulge: 7.5, reach: 34 },
    { name: 'Wide', values: '6 % · 6 px · 70 px reach', amount: 0.06, bulge: 6, reach: 70 },
  ];
  const bars = $state<HTMLElement[]>([]);
  let shapesOf = $state<{ w: number; h: number; at: number; d: string }[]>([]);
  $effect(() => {
    if (combo.id !== '20' || bars.length < settings.length) return;
    // Layout offsets, not client rects: the group is scaled for the square.
    const measure = () => {
      shapesOf = settings.map((s, i) => {
        const bar = bars[i]!;
        const tool = bar.querySelectorAll<HTMLElement>('button')[PRESSED];
        const tools = tool?.parentElement?.closest<HTMLElement>('.sq-tools');
        const at = tool ? (tools?.offsetLeft ?? 0) + tool.offsetLeft + tool.offsetWidth / 2 : 0;
        const w = bar.offsetWidth;
        const h = bar.offsetHeight;
        const d = pillPath(w, h, {
          inset: ROOM,
          at,
          bulge: s.bulge,
          reach: s.reach,
          vertical: false,
        });
        return { w, h, at, d };
      });
    };
    measure();
    const t = setTimeout(measure, 300);
    return () => clearTimeout(t);
  });
</script>

{#snippet signIn()}
  <div class="signin">
    <SignInCard
      title="Welcome home"
      text="Sign in to see the house: the lights, the heating and who is at the door."
      buttonLabel="Sign in"
      onsignin={noop}
    />
  </div>
{/snippet}

{#snippet music()}
  <div class="player">
    <span class="player__time"
      ><DotMatrix value={clock(position)} label="1 minute 19" size="xl" /></span
    >
    <div class="player__bar">
      <Slider
        label="Position"
        hideLabel
        showValue={false}
        bind:value={position}
        min={0}
        max={214}
        format={clock}
      />
      <div class="player__ends"><span>{clock(position)}</span><span>3:34</span></div>
    </div>
    <div class="player__keys">
      <Button
        variant="soft"
        size="lg"
        icon="shuffle"
        label="Shuffle"
        iconOnly
        aria-pressed={true}
      />
      <Button variant="soft" size="xl" icon="skip-back" label="Previous" iconOnly />
      <Button variant="primary" size="xl" icon="pause" label="Pause" iconOnly />
      <Button variant="soft" size="xl" icon="skip-forward" label="Next" iconOnly />
      <Button variant="soft" size="lg" icon="repeat" label="Repeat" iconOnly />
    </div>
  </div>
{/snippet}

{#snippet gauges()}
  <div class="gauges">
    <ArcGauge
      label="Living room · warming"
      current={19.4}
      bind:value={warm}
      min={16}
      max={28}
      step={0.5}
      unit="°C"
    />
    <ArcGauge
      label="Bedroom · cooling"
      current={21.6}
      bind:value={cool}
      min={16}
      max={28}
      step={0.5}
      unit="°C"
    />
  </div>
{/snippet}

{#snippet dots()}
  <Card surface="ink" padding="lg">
    <div class="ink">
      {#each [['Kitchen', '21.5°', 'Warm enough'], ['Oven', '180°', 'Preheated'], ['Timer', '12:40', 'Bread is rising']] as [what, figure, note] (what)}
        <div class="ink-row">
          <span class="ink-label">{what}</span>
          <span class="ink-figure"
            ><DotMatrix value={figure!} label="{what} {figure}" size="lg" /></span
          >
          <span class="ink-note">{note}</span>
        </div>
      {/each}
    </div>
  </Card>
{/snippet}

{#snippet charts()}
  <div class="charts">
    <ChartCard title="Visits this week" sub="Every day a little more" value="408" level="panel">
      {#snippet actions()}
        <div class="chips">
          <ToggleChip bind:pressed={web} label="Web" color="var(--accent)" size="sm" />
          <ToggleChip bind:pressed={app} label="App" color="var(--series-2)" size="sm" />
        </div>
      {/snippet}
      <LineChart
        data={visits}
        min={30}
        max={80}
        ticks={[40, 60, 80]}
        height={200}
        area
        color="var(--accent)"
        valueLabel="Visits"
      />
    </ChartCard>
    <ChartCard title="Where they came from" level="panel">
      <HorizontalBarChart
        height={268}
        label="Channels"
        color="var(--accent)"
        data={[
          { label: 'Search', value: 168 },
          { label: 'Direct', value: 112 },
          { label: 'Newsletter', value: 74 },
          { label: 'Friends', value: 54 },
        ]}
      />
    </ChartCard>
  </div>
{/snippet}

{#snippet popMenu(title: string, meta: string)}
  <div class="pop-bar">
    <span class="doc__text">
      <span class="doc__title">{title}</span>
      <span class="doc__meta">{meta}</span>
    </span>
    <DropdownMenu
      label="Actions"
      iconOnly={false}
      icon="more"
      variant="soft"
      size="md"
      align="end"
      items={[
        { label: 'Rename', icon: 'edit', shortcut: 'F2', onselect: noop },
        { label: 'Duplicate', icon: 'copy', shortcut: '⌘D', onselect: noop },
        { label: 'Share', icon: 'share', onselect: noop },
        { separator: true },
        { label: 'Move to trash', icon: 'trash', danger: true, onselect: noop },
      ]}
    />
  </div>
{/snippet}

{#snippet popPhoto()}
  <div class="pop" bind:this={menuHost}>
    <img class="pop__photo" src={photo} alt="" />
    <div class="pop__top">{@render popMenu('Garden house', '4 photos · today')}</div>
  </div>
{/snippet}

{#snippet popText()}
  <div class="pop pop--text" style:--blur-pill="blur(32px) saturate(110%)" bind:this={menuHost}>
    <div class="pop__top">{@render popMenu('Meeting notes', 'Edited 5 minutes ago')}</div>
    <div class="pop__copy">
      {#each ['The hall is free from nine, and the coffee is already waiting. We start with the roadmap and keep the afternoon for quick wins.', 'Everyone adds their topics to the board by Wednesday. Lunch is at the lake if the weather plays along, otherwise in the small hall.', 'Bring your laptop, a charger and one question you have wanted to ask for a while. We close with a short round of thanks.'] as line (line)}
        <p>{line}</p>
      {/each}
    </div>
  </div>
{/snippet}

{#snippet popChart()}
  <div
    class="pop pop--chart"
    style:--blur-pill="blur(6px) saturate(100%)"
    style:--glass-strong="rgb(40 40 44 / 0.5)"
    bind:this={menuHost}
  >
    <div class="pop__top">{@render popMenu('Visits this month', '12,480 in total')}</div>
    <div class="pop__chart">
      <LineChart
        data={[18, 24, 21, 30, 28, 36, 33, 41, 39, 47, 44, 52].map((value, i) => ({
          label: String(i + 1),
          value,
        }))}
        min={0}
        max={60}
        height={300}
        area
        color="var(--accent)"
        valueLabel="Visits"
      />
    </div>
  </div>
{/snippet}

{#snippet railFrames()}
  <div class="rails">
    {#each [{ name: 'Frame', note: 'default · 8px', props: {} }, { name: 'Wide', note: 'frameWidth="0.9rem"', props: { frameWidth: '0.9rem' } }, { name: 'None', note: 'frame={false}', props: { frame: false } }] as r (r.name)}
      <div class="rails__one">
        <NavRail
          items={[
            { id: 'home', label: 'Overview', icon: 'home' },
            { id: 'calendar', label: 'Schedule', icon: 'calendar' },
            { id: 'activity', label: 'Sensors', icon: 'activity' },
            { id: 'settings', label: 'Settings', icon: 'settings' },
          ]}
          current="home"
          label="Rail, {r.name}"
          {...r.props}
        />
        <span class="rails__name">{r.name}</span>
        <code class="rails__note">{r.note}</code>
      </div>
    {/each}
  </div>
{/snippet}

{#snippet sideNavSelection()}
  <div class="navs">
    {#each ['frame', 'tint', 'bar'] as const as selection (selection)}
      <div class="navs__one">
        <SideNav
          {selection}
          label="Sections, {selection}"
          groups={navGroups('insights').slice(0, 1)}
          orientation="vertical"
        />
        <code class="rails__note">selection="{selection}"</code>
      </div>
    {/each}
  </div>
{/snippet}

{#snippet seaChart()}
  <div class="sea">
    <SeaTrafficChart
      ships={seaShips}
      hour={0}
      weather="fresh"
      layers={{ wind: true, waves: true, rain: false, ships: true, lanes: true }}
      running={false}
      label="Sea chart"
    />
  </div>
{/snippet}

{#snippet mailDesk()}
  <div class="desk desk--mail">
    <Desktop contained>
      {#snippet menubar()}
        <MenuBar
          appIcon="mail"
          appColor="cyan"
          menus={appMenus('Mail')}
          now={morning}
          status={[
            { icon: 'wifi', label: 'Wi-Fi' },
            { icon: 'battery', label: 'Battery', text: '82%' },
          ]}
        />
      {/snippet}
      {#snippet dock()}
        <Dock items={dockItems(['mail', 'notes'], 'mail', { badges: { mail: 4 } })} size={40} />
      {/snippet}
      <DesktopApp
        bind:mails={mailList}
        bind:selected={mailOpen}
        x={20}
        y={52}
        width={880}
        height={448}
      />
    </Desktop>
  </div>
{/snippet}

{#snippet desk()}
  <div class="desk">
    <Desktop contained>
      {#snippet menubar()}
        <MenuBar
          appIcon="edit"
          appColor="yellow"
          menus={appMenus('Notes')}
          now={morning}
          status={[
            { icon: 'wifi', label: 'Wi-Fi' },
            { icon: 'battery', label: 'Battery', text: '82%' },
          ]}
        />
      {/snippet}
      {#snippet dock()}
        <Dock items={dockItems(['files', 'notes'], 'notes')} size={42} />
      {/snippet}
      <Window
        id="files"
        icon="folder"
        color="blue"
        title="Files"
        x={28}
        y={70}
        width={380}
        height={230}
      >
        <Stack gap="sm">
          {#each [['folder', 'Recipes', '12 items'], ['image', 'Garden.jpg', '2.4 MB'], ['file-text', 'Packing list', 'Edited today']] as [icon, name, meta] (name)}
            <div class="file">
              <Icon name={icon as 'folder'} size={18} /><span>{name}</span><span class="file__meta"
                >{meta}</span
              >
            </div>
          {/each}
        </Stack>
      </Window>
      <Window
        id="notes"
        icon="edit"
        color="yellow"
        title="Notes"
        x={300}
        y={136}
        width={400}
        height={220}
      >
        <Stack gap="sm">
          <Text weight="bold">Saturday</Text>
          <Text tone="muted">Market at nine · Bread, figs, flowers · Call Grandma</Text>
        </Stack>
      </Window>
    </Desktop>
  </div>
{/snippet}

{#snippet cupArt()}
  <div class="cup" aria-hidden="true">
    <span class="cup__in"><Icon name="headphones" size={96} /></span>
  </div>
{/snippet}

{#snippet shop()}
  <div class="shop">
    <div class="shop__card">
      <ProductCard
        title="Soft over-ear headphones"
        subtitle="Example Audio"
        price={129}
        compareAt={159}
        rating={4.7}
        reviews={212}
        colors={['var(--color-pink)', 'var(--color-mint)', 'var(--color-blue)', 'var(--text)']}
        media={cupArt}
        onadd={noop}
        aspect="1"
      />
    </div>
    <div class="shop__cart">
      <CartSummary
        subtotal={129 * cups}
        shipping={0}
        freeShippingFrom={150}
        title="Your cart"
        oncheckout={noop}
      >
        <CartLine
          title="Headphones"
          meta="Pink"
          price={129}
          bind:quantity={cups}
          max={5}
          onremove={noop}
        />
      </CartSummary>
    </div>
  </div>
{/snippet}

{#snippet glimmer()}
  <div class="glim">
    <p class="glim__ask">Is there a step-free hall for 300 people near the station?</p>
    <GlimmerPanel working aria-label="Answer">
      <Row justify="between" align="center">
        <span class="glim__eyebrow"><Icon name="sparkles" size={14} /> Answer</span>
        <StatusText busy message="Writing…" />
      </Row>
      <p class="glim__text">{writing}<span class="glim__caret"></span></p>
    </GlimmerPanel>
  </div>
{/snippet}

{#snippet slideRails()}
  <div class="rails slide">
    <div class="rails__one slide__one--held" bind:this={held}>
      {#if trail}
        <span
          class="slide__trail"
          aria-hidden="true"
          style:top="{trail.top}px"
          style:height="{trail.height}px"
        ></span>
      {/if}
      <NavRail items={railItems} current="home" label="Rail, held" />
      <span class="rails__name">Hold and slide</span>
      <span class="rails__note">the squeeze follows</span>
    </div>
    <div class="rails__one">
      <NavRail items={railItems} current="activity" label="Rail, let go" />
      <span class="rails__name">Let go</span>
      <span class="rails__note">Sensors is picked</span>
    </div>
  </div>
{/snippet}

{#snippet delivery()}
  <span class="well__label">Delivery</span>
  <strong>Ada Example</strong>
  <span>12 Garden Lane, Riverside</span>
  <span class="well__muted">Tomorrow, 9–12</span>
{/snippet}

{#snippet wells()}
  <div class="wells">
    <div class="wells__one">
      <Layer level="panel" gap="md">
        <Row justify="between" align="center">
          <strong class="wells__title">Order 1042</strong>
          <span class="well__muted">3 items</span>
        </Row>
        <!-- Drawn by hand: the stacked tile the library never makes. -->
        <div class="wells__stacked">{@render delivery()}</div>
        <Button variant="primary" label="Place order" />
      </Layer>
      <span class="rails__name">Two tiles</span>
      <span class="rails__note">two rims, two shadows</span>
    </div>
    <div class="wells__one">
      <Layer level="panel" gap="md">
        <Row justify="between" align="center">
          <strong class="wells__title">Order 1042</strong>
          <span class="well__muted">3 items</span>
        </Row>
        <Layer level="panel" gap="xs">{@render delivery()}</Layer>
        <Button variant="primary" label="Place order" />
      </Layer>
      <span class="rails__name">One tile, one well</span>
      <span class="rails__note">a panel in a panel, by itself</span>
    </div>
  </div>
{/snippet}

{#snippet squeezes()}
  <div class="squeeze">
    {#each settings as s, i (s.name)}
      {@const shape = shapesOf[i]}
      <div class="sq-row">
        <div
          class="sq-bar"
          bind:this={bars[i]}
          style:transform={shape && s.amount
            ? `scale(${1 + s.amount * 0.25}, ${1 - s.amount})`
            : undefined}
          style:transform-origin={shape ? `${shape.at}px ${shape.h / 2}px` : undefined}
        >
          {#if shape}
            <svg class="sq-shadow" aria-hidden="true" width={shape.w} height={shape.h}>
              <defs>
                <filter id="sq-far-{i}" x="-20%" y="-50%" width="140%" height="200%">
                  <feGaussianBlur stdDeviation="7" />
                </filter>
                <filter id="sq-near-{i}" x="-10%" y="-20%" width="120%" height="140%">
                  <feGaussianBlur stdDeviation="1.5" />
                </filter>
              </defs>
              <path class="far" d={shape.d} filter="url(#sq-far-{i})" />
              <path class="near" d={shape.d} filter="url(#sq-near-{i})" />
            </svg>
          {/if}
          <span class="sq-glass" style:clip-path={shape ? `path('${shape.d}')` : undefined}></span>
          <div class="sq-tools">
            {#each [['bold', 'Bold'], ['italic', 'Italic'], ['underline', 'Underline'], ['link', 'Link'], ['quote', 'Quote'], ['list', 'List']] as [icon, label], k (icon)}
              <IconButton
                icon={icon as 'bold'}
                label={label!}
                hint={false}
                pressed={s.amount > 0 && k === PRESSED ? true : undefined}
              />
            {/each}
          </div>
          {#if shape}
            <svg class="sq-rim" aria-hidden="true" width={shape.w} height={shape.h}>
              <defs>
                <clipPath id="sq-in-{i}"><path d={shape.d} /></clipPath>
                <filter id="sq-soft-{i}" x="-10%" y="-20%" width="120%" height="140%">
                  <feGaussianBlur stdDeviation="2.5" />
                </filter>
                <linearGradient id="sq-rim-{i}" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" class="rim-top" />
                  <stop offset="0.5" class="rim-mid" />
                  <stop offset="1" class="rim-bottom" />
                </linearGradient>
              </defs>
              <g clip-path="url(#sq-in-{i})">
                <path class="glow-in" d={shape.d} filter="url(#sq-soft-{i})" />
              </g>
              <path class="edge" d={shape.d} stroke="url(#sq-rim-{i})" />
            </svg>
          {/if}
        </div>
        <div class="sq-label">
          <span class="sq-name">{s.name}</span>
          <span class="sq-values">{s.values}</span>
        </div>
      </div>
    {/each}
  </div>
{/snippet}

{#snippet members()}
  <div class="members">
    <Card title="Members" count={4} headingLevel={3} surface="subtle" padding="lg">
      {#snippet actions()}
        <Button variant="tinted" icon="user-plus" label="Invite" />
      {/snippet}
      <div class="people">
        {#each [['Ada Example', 'ada@example.com', 'Owner'], ['Ben Sample', 'ben@example.com', 'Editor'], ['Cleo Test', 'cleo@example.com', 'Editor'], ['Dan Demo', 'dan@example.com', 'New']] as [name, mail, role] (name)}
          <div class="person" class:person--new={role === 'New'}>
            <IdentityCell name={name!} subtitle={mail} />
            <Badge
              label={role}
              tone={role === 'New' ? 'live' : role === 'Owner' ? 'info' : 'neutral'}
            />
          </div>
        {/each}
      </div>
    </Card>
  </div>
{/snippet}

{#snippet cheer()}
  <div class="cheer">
    <Card surface="subtle" padding="lg">
      <TaskList title="Saturday dinner" bind:items={tasks} editable={false} />
    </Card>
    <span class="burst" aria-hidden="true">
      {#each sprinkles as p, i (i)}
        <span
          class="sprinkle"
          class:sprinkle--long={p.long}
          style:background="var({p.colour})"
          style:--dx="{p.dx}px"
          style:--dy="{p.dy}px"
          style:--rot="{p.rot}deg"
        ></span>
      {/each}
    </span>
  </div>
{/snippet}

{#snippet shapes()}
  <div class="shapes">
    <div class="shape">
      <div class="shape__thing">
        <Stack gap="md" align="center">
          <Button variant="primary" size="lg" icon="calendar" label="Book a table" />
          <Button variant="soft" icon="share" label="Share" />
        </Stack>
      </div>
      <span class="shape__name">Pill</span><span class="shape__what">acts</span>
    </div>
    <div class="shape">
      <div class="shape__thing">
        <Card surface="subtle" padding="md"
          ><div class="mk-hold">
            <span class="hold__eyebrow">Friday</span>
            <span class="hold__title">Table for two</span>
            <span class="hold__meta">19:30 · by the window</span>
          </div></Card
        >
      </div>
      <span class="shape__name">Rounded</span><span class="shape__what">holds</span>
    </div>
    <div class="shape">
      <div class="shape__thing">
        <div class="faces">
          <Avatar name="Ada Example" size={52} />
          <Avatar name="Ben Sample" color="orange" size={52} />
          <Avatar name="Cleo Test" color="blue" size={52} />
        </div>
      </div>
      <span class="shape__name">Circle</span><span class="shape__what">is someone</span>
    </div>
  </div>
{/snippet}

{#snippet menu()}
  <div class="menu" bind:this={menuHost}>
    <Card surface="subtle" padding="md" class="mk-doc">
      <div class="doc">
        <span class="doc__icon"><Icon name="file-text" size={22} /></span>
        <span class="doc__text">
          <span class="doc__title">Spring menu</span>
          <span class="doc__meta">Edited 5 minutes ago</span>
        </span>
        <DropdownMenu
          label="Actions"
          iconOnly={false}
          icon="more"
          variant="soft"
          size="md"
          align="end"
          items={[
            { label: 'Rename', icon: 'edit', shortcut: 'F2', onselect: noop },
            { label: 'Duplicate', icon: 'copy', shortcut: '⌘D', onselect: noop },
            { label: 'Share', icon: 'share', onselect: noop },
            { separator: true },
            { label: 'Move to trash', icon: 'trash', danger: true, onselect: noop },
          ]}
        />
      </div>
    </Card>
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
  /* 13 */
  .signin {
    width: 30rem;
  }
  .signin :global(.signin) {
    padding: 0;
  }

  /* 14 */
  .player {
    display: grid;
    justify-items: center;
    gap: var(--space-6);
  }
  .player__time {
    color: var(--accent-ink);
  }
  .player__bar {
    width: 22rem;
    display: grid;
    gap: var(--space-1);
  }
  .player__ends {
    display: flex;
    justify-content: space-between;
    color: var(--text-3);
    font-size: var(--fs-xs);
    font-variant-numeric: tabular-nums;
  }
  .player__keys {
    display: flex;
    align-items: center;
    gap: var(--space-4);
  }

  /* 15 */
  .gauges {
    display: flex;
    gap: 5rem;
  }
  .gauges > :global(*) {
    width: 19rem;
  }
  .gauges :global(.gauge .caption) {
    text-align: center;
  }

  /* 16 */
  .ink {
    display: grid;
    min-width: 20rem;
  }
  .ink-row + .ink-row {
    margin-top: var(--space-4);
    padding-top: var(--space-4);
    border-top: 1px solid color-mix(in srgb, var(--text) 10%, transparent);
  }
  .ink-row {
    display: grid;
    gap: var(--space-1);
  }
  .ink-label {
    color: var(--text-2);
    font-size: var(--fs-sm);
    font-weight: var(--fw-semibold);
  }
  .ink-figure {
    color: var(--accent);
  }
  .ink-note {
    color: var(--text-3);
    font-size: var(--fs-xs);
  }

  /* 17 */
  .charts {
    display: grid;
    grid-template-columns: 1.25fr 1fr;
    gap: var(--space-5);
    width: 42rem;
    align-items: stretch;
  }
  .chips {
    display: flex;
    gap: var(--space-2);
  }

  /* 18 */
  .desk {
    width: 740px;
    height: 512px;
    border-radius: var(--radius-card);
    overflow: clip;
    box-shadow: var(--shadow-lg, 0 20px 50px rgb(0 0 0 / 0.18));
  }
  .desk--mail {
    width: 920px;
    height: 640px;
  }
  .file {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: var(--space-3);
    color: var(--text);
  }
  .file :global(svg) {
    color: var(--accent);
  }
  .file__meta {
    color: var(--text-3);
    font-size: var(--fs-sm);
  }

  /* 19 */
  .shop {
    display: grid;
    grid-template-columns: 15rem 21rem;
    gap: var(--space-8);
    align-items: start;
  }
  .cup__in {
    display: grid;
    place-items: center;
    height: 100%;
  }
  .cup {
    background:
      radial-gradient(70% 60% at 50% 35%, var(--accent-soft), transparent 70%), var(--fill-subtle);
    color: var(--accent-ink);
  }

  /* 20 */
  .squeeze {
    display: grid;
    gap: var(--space-3);
  }
  .sq-row {
    display: grid;
    grid-template-columns: auto 13rem;
    align-items: center;
    gap: var(--space-6);
  }
  .sq-bar {
    position: relative;
    padding: calc(var(--space-2) + 8px) var(--space-3);
  }
  .sq-glass {
    position: absolute;
    inset: 0;
    z-index: 1;
    background: var(--light, none), var(--layer-front-bg);
    backdrop-filter: var(--layer-front-blur);
    -webkit-backdrop-filter: var(--layer-front-blur);
  }
  .sq-shadow,
  .sq-rim {
    position: absolute;
    left: 0;
    top: 0;
    overflow: visible;
    pointer-events: none;
  }
  .sq-shadow {
    z-index: 0;
  }
  .sq-shadow path {
    fill: var(--front-shadow);
  }
  .sq-shadow .far {
    transform: translateY(10px);
    opacity: 0.9;
  }
  .sq-shadow .near {
    transform: translateY(2px);
    opacity: 0.55;
  }
  .sq-tools {
    position: relative;
    z-index: 2;
    display: flex;
    gap: var(--space-1);
  }
  .sq-rim {
    z-index: 3;
  }
  .sq-rim path {
    fill: none;
  }
  .sq-rim .edge {
    stroke-width: 1;
  }
  .sq-rim .glow-in {
    stroke: var(--pill-rim);
    stroke-width: 16;
    opacity: 0.75;
  }
  .rim-top {
    stop-color: var(--pill-light);
  }
  .rim-mid {
    stop-color: var(--pill-light);
    stop-opacity: 0.25;
  }
  .rim-bottom {
    stop-color: var(--pill-rim);
    stop-opacity: 0.7;
  }
  .sq-label {
    display: grid;
    gap: 2px;
  }
  .sq-name {
    font-weight: var(--fw-semibold);
    color: var(--text);
  }
  .sq-values {
    color: var(--text-2);
    font-size: var(--fs-sm);
    font-variant-numeric: tabular-nums;
  }

  /* 21 */
  .members {
    width: 30rem;
  }
  .people {
    display: grid;
    gap: var(--space-2);
  }
  .person {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-3);
    padding: var(--space-2) var(--space-3);
    border-radius: var(--radius-md);
  }
  .person--new {
    background: var(--accent-faint);
    box-shadow: inset 0 0 0 1px var(--accent-border);
  }

  /* 22 */
  .cheer {
    position: relative;
    width: 24rem;
  }
  .burst {
    position: absolute;
    right: 0.6rem;
    top: 0.4rem;
    width: 0;
    height: 0;
  }
  .sprinkle {
    position: absolute;
    left: 0;
    top: 0;
    width: 7px;
    height: 7px;
    border-radius: 999px;
    /* Where the sprinkles thrown by the last tick are, a moment after it. */
    transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy))) rotate(var(--rot));
  }
  .sprinkle--long {
    width: 11px;
    height: 4px;
  }

  /* 23 */
  .shapes {
    display: grid;
    grid-template-columns: repeat(3, auto);
    gap: var(--space-8);
    align-items: end;
  }
  .shape {
    display: grid;
    justify-items: center;
    gap: var(--space-1);
  }
  .shape__thing {
    display: grid;
    place-items: center;
    height: 8rem;
    margin-bottom: var(--space-4);
  }
  .shape__name {
    font-family: var(--font-serif);
    font-size: var(--fs-lg);
    color: var(--text);
  }
  .shape__what {
    color: var(--text-3);
    font-size: var(--fs-sm);
  }
  .mk-hold {
    display: grid;
    gap: 2px;
    min-width: 11rem;
  }
  .hold__eyebrow {
    color: var(--accent-ink);
    font-size: var(--fs-xs);
    font-weight: var(--fw-semibold);
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
  .hold__title {
    font-weight: var(--fw-semibold);
    color: var(--text);
  }
  .hold__meta {
    color: var(--text-3);
    font-size: var(--fs-sm);
  }
  .faces {
    display: flex;
    gap: var(--space-2);
  }

  /* 24 */
  :global(html.mk-big) {
    font-size: 23px;
  }
  :global(html.mk-big .spread .copy) {
    max-width: 640px;
  }
  :global(html.mk-big .spread .title) {
    font-size: 54.4px;
  }
  :global(html.mk-big .spread .text) {
    max-width: 544px;
    font-size: 20.8px;
  }
  :global(html.mk-big .mark .word) {
    font-size: 21.6px;
  }
  :global(html.mk-big .mark .caption) {
    font-size: 12.8px;
  }
  /* 29–32: a stage of content, the menu dropping over it from the bar on top. */
  .pop {
    position: relative;
    width: 30rem;
    height: 21rem;
    margin-bottom: 4rem;
    border-radius: var(--radius-card);
    overflow: clip;
    background: var(--bg-base);
    box-shadow: var(--shadow-lg, 0 20px 50px rgb(0 0 0 / 0.18));
  }
  .pop__photo {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .pop__top {
    position: relative;
    padding: var(--space-3);
  }
  .pop-bar {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-2) var(--space-2) var(--space-2) var(--space-4);
    border-radius: var(--radius-pill);
    background: var(--pill-tint), var(--glass-strong);
    border: 0.75px solid var(--pill-border);
    backdrop-filter: var(--blur-pill);
    -webkit-backdrop-filter: var(--blur-pill);
  }
  .pop--text .pop-bar,
  .pop--chart .pop-bar {
    background: none;
    border-color: transparent;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    padding-inline: var(--space-2) 0;
  }
  .pop__copy {
    display: grid;
    gap: var(--space-3);
    padding: 0 var(--space-5);
    font-size: var(--fs-md);
    line-height: var(--leading-body);
    color: var(--text);
  }
  .pop__chart {
    padding: 0 var(--space-3);
  }
  .rails {
    --app-height: 27rem;
    display: flex;
    gap: var(--space-12);
  }
  .rails__one,
  .navs__one {
    display: grid;
    justify-items: center;
    gap: var(--space-2);
  }
  .rails__name {
    margin-top: var(--space-3);
    font-weight: var(--fw-semibold);
  }
  .rails__note {
    font-family: var(--font-mono);
    font-size: var(--fs-xs);
    color: var(--text-2);
  }
  .glim {
    display: grid;
    gap: var(--space-5);
    width: 31rem;
  }
  .glim__ask {
    justify-self: end;
    max-width: 24rem;
    margin: 0;
    padding: var(--space-3) var(--space-4);
    border-radius: var(--radius-lg) var(--radius-lg) var(--space-1) var(--radius-lg);
    background: var(--fill-muted);
    color: var(--text);
    line-height: 1.45;
  }
  .glim__eyebrow {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    font-size: var(--fs-xs);
    font-weight: var(--fw-semibold);
    letter-spacing: var(--tracking-caps);
    text-transform: uppercase;
    color: var(--accent-ink);
  }
  .glim__text {
    margin: 0;
    line-height: 1.55;
  }
  .glim__caret {
    display: inline-block;
    width: 2px;
    height: 1.05em;
    margin-inline-start: 3px;
    vertical-align: text-bottom;
    background: var(--accent);
  }
  .slide {
    gap: 7rem;
  }
  .slide :global(.tip) {
    display: none !important;
  }
  .slide__one--held {
    position: relative;
  }
  /* Where the finger went: a dotted trail beside the rail, from the pressed item to the one
     under the finger now. */
  .slide__trail {
    position: absolute;
    left: -2.25rem;
    width: 0;
    border-left: 2px dotted var(--accent);
  }
  .slide__trail::before,
  .slide__trail::after {
    content: '';
    position: absolute;
    left: -6px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }
  .slide__trail::before {
    top: -5px;
    border: 2px solid var(--accent);
    background: var(--layer-panel-bg);
  }
  .slide__trail::after {
    bottom: -5px;
    background: var(--accent);
    box-shadow: 0 0 0 6px var(--accent-soft);
  }
  .wells {
    display: grid;
    grid-template-columns: repeat(2, 19rem);
    gap: var(--space-8);
  }
  .wells__one {
    display: grid;
    justify-items: center;
    gap: var(--space-2);
  }
  .wells__one > :global(.layer) {
    justify-self: stretch;
  }
  .wells__title {
    font-size: var(--fs-md);
  }
  .wells__stacked {
    display: grid;
    gap: var(--space-1);
    padding: var(--space-4);
    border: 1px solid var(--layer-panel-border);
    border-radius: var(--radius-card);
    background: var(--layer-panel-bg);
    box-shadow: var(--layer-panel-shadow);
  }
  .well__label {
    font-size: var(--fs-xs);
    font-weight: var(--fw-semibold);
    letter-spacing: var(--tracking-caps);
    text-transform: uppercase;
    color: var(--text-3);
  }
  .well__muted {
    color: var(--text-3);
    font-size: var(--fs-sm);
  }
  .navs {
    display: grid;
    grid-template-columns: repeat(3, 13rem);
    gap: var(--space-6);
  }
  .navs__one {
    justify-items: stretch;
  }
  .navs__one .rails__note {
    justify-self: center;
  }
  .sea {
    width: 880px;
    border-radius: var(--radius-card);
    overflow: clip;
    box-shadow: var(--shadow-lg, 0 20px 50px rgb(0 0 0 / 0.18));
  }
  .menu {
    width: 30rem;
    margin-bottom: 12rem;
  }
  .doc {
    display: flex;
    align-items: center;
    gap: var(--space-3);
  }
  .doc__icon {
    display: grid;
    place-items: center;
    width: 2.75rem;
    height: 2.75rem;
    border-radius: var(--radius-md);
    background: var(--accent-soft);
    color: var(--accent-ink);
  }
  .doc__text {
    display: grid;
    flex: 1;
  }
  .doc__title {
    font-weight: var(--fw-semibold);
  }
  .doc__meta {
    color: var(--text-3);
    font-size: var(--fs-sm);
  }
</style>
