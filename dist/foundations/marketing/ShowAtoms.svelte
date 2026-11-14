<script module lang="ts">
  import type { Meta } from './looks';
  import photo from '../../demo/assets/smart-home-backdrop.jpg';

  export const meta: Record<string, Meta> = {
    AppIcon: { zoom: 2.1, note: 'Candy tiles for every app' },
    Avatar: { zoom: 2.2, note: 'Initials on a candy disc' },
    Badge: { zoom: 2.3, note: 'A state in one word' },
    BrandBar: { zoom: 2.2, note: 'The accent before a title' },
    Button: { zoom: 1.9, note: 'Every button behind one API', tint: '#5856d6' },
    Card: { zoom: 1.65, note: 'Hold, float, or stand out' },
    Checkbox: { zoom: 2, note: 'Yes, no, and some' },
    Divider: { zoom: 2, note: 'A quiet line, with a word' },
    DotMatrix: { zoom: 1.6, note: 'Figures in lit dots', theme: 'dark', tint: '#ff9500' },
    GlassLens: { zoom: 1.9, note: 'Glass with a body', photo, theme: 'light' },
    Heading: { zoom: 1.9, note: 'Eyebrow, title, subtitle' },
    Icon: { zoom: 2.2, note: 'One stroke, one grid' },
    IconButton: { zoom: 3, note: 'Tools that stay pressed' },
    Image: { zoom: 1.6, note: 'Pictures with a calm fallback' },
    Input: { zoom: 1.9, note: 'A field you can trust' },
    Kbd: { zoom: 2.6, note: 'Key caps lit from above' },
    Link: { zoom: 2.2, note: 'Words that lead somewhere' },
    LoadingBar: { zoom: 1.9, note: 'Working, without a spinner', theme: 'light' },
    LoadingOverlay: { zoom: 1.8, note: 'Busy, but still readable' },
    Price: { zoom: 2, note: 'Amounts in their own currency' },
    ProgressBar: { zoom: 1.8, note: 'How far along' },
    Radio: { zoom: 1.9, note: 'One of a few' },
    Select: { zoom: 1.9, note: 'A choice from a list' },
    Skeleton: { zoom: 1.8, note: 'The shape of what is coming' },
    Slider: { zoom: 1.8, note: 'Drag to set' },
    Spinner: { zoom: 2.2, note: 'A moment, please' },
    Stars: { zoom: 3.2, note: 'A rating at a glance' },
    StatusDot: { zoom: 2, note: 'Up, slow or down' },
    StatusText: { zoom: 2.6, note: 'How it went, in a line' },
    Swatch: { zoom: 2.1, note: 'A dot that names a series', theme: 'light', tint: '#af52de' },
    Switch: { zoom: 1.8, note: 'On and off, at a touch' },
    Tag: { zoom: 2.1, note: 'Labels and key-value chips' },
    Text: { zoom: 2, note: 'The type scale' },
    Textarea: { zoom: 1.8, note: 'Room to write, with a count' },
    Tooltip: { zoom: 2.5, note: 'A hint, with its shortcut' },
    Grid: { zoom: 1.65, note: 'Columns that fit the room' },
    Layer: { zoom: 1.75, note: 'Ground, panel, selected, front' },
    Row: { zoom: 1.8, note: 'Side by side, aligned' },
    Section: { zoom: 1.95, note: 'A titled group with its actions' },
    Stack: { zoom: 1.8, note: 'One direction, one gap' },
  };
  export const skip: Record<string, string> = {
    VisuallyHidden: 'Invisible by design: text for screen readers only.',
    Spacer: 'A pure layout helper: an empty, flexible gap.',
  };
</script>

<script lang="ts">
  /** Local only (not in git): one square per atom and layout helper. */
  import { onMount } from 'svelte';
  import Studio from './Studio.svelte';
  import PreviewAtoms from '../explore/PreviewAtoms.svelte';
  import AppIcon from '../../patterns/atoms/AppIcon.svelte';
  import Avatar from '../../patterns/atoms/Avatar.svelte';
  import Badge from '../../patterns/atoms/Badge.svelte';
  import BrandBar from '../../patterns/atoms/BrandBar.svelte';
  import Button from '../../patterns/atoms/Button.svelte';
  import Card from '../../patterns/atoms/Card.svelte';
  import Checkbox from '../../patterns/atoms/Checkbox.svelte';
  import Divider from '../../patterns/atoms/Divider.svelte';
  import DotMatrix from '../../patterns/atoms/DotMatrix.svelte';
  import Heading from '../../patterns/atoms/Heading.svelte';
  import Icon from '../../patterns/atoms/Icon.svelte';
  import IconButton from '../../patterns/atoms/IconButton.svelte';
  import Image from '../../patterns/atoms/Image.svelte';
  import Input from '../../patterns/atoms/Input.svelte';
  import Kbd from '../../patterns/atoms/Kbd.svelte';
  import Link from '../../patterns/atoms/Link.svelte';
  import LoadingBar from '../../patterns/atoms/LoadingBar.svelte';
  import LoadingOverlay from '../../patterns/atoms/LoadingOverlay.svelte';
  import Price from '../../patterns/atoms/Price.svelte';
  import ProgressBar from '../../patterns/atoms/ProgressBar.svelte';
  import Radio from '../../patterns/atoms/Radio.svelte';
  import Select from '../../patterns/atoms/Select.svelte';
  import Skeleton from '../../patterns/atoms/Skeleton.svelte';
  import Slider from '../../patterns/atoms/Slider.svelte';
  import Spinner from '../../patterns/atoms/Spinner.svelte';
  import Stars from '../../patterns/atoms/Stars.svelte';
  import StatusDot from '../../patterns/atoms/StatusDot.svelte';
  import StatusText from '../../patterns/atoms/StatusText.svelte';
  import Swatch from '../../patterns/atoms/Swatch.svelte';
  import Switch from '../../patterns/atoms/Switch.svelte';
  import Tag from '../../patterns/atoms/Tag.svelte';
  import Text from '../../patterns/atoms/Text.svelte';
  import Textarea from '../../patterns/atoms/Textarea.svelte';
  import Tooltip from '../../patterns/atoms/Tooltip.svelte';
  import Grid from '../../patterns/layout/Grid.svelte';
  import Layer from '../../patterns/layout/Layer.svelte';
  import Row from '../../patterns/layout/Row.svelte';
  import Section from '../../patterns/layout/Section.svelte';
  import Stack from '../../patterns/layout/Stack.svelte';
  import type { IconName } from '../../patterns/atoms/icons';

  const shows = {
    AppIcon: appIcon,
    Avatar: avatar,
    Badge: badge,
    BrandBar: brandBar,
    Button: button,
    Card: card,
    Checkbox: checkbox,
    Divider: divider,
    DotMatrix: dotMatrix,
    GlassLens: glassLens,
    Heading: heading,
    Icon: icon,
    IconButton: iconButton,
    Image: image,
    Input: input,
    Kbd: kbd,
    Link: link,
    LoadingBar: loadingBar,
    LoadingOverlay: loadingOverlay,
    Price: price,
    ProgressBar: progressBar,
    Radio: radio,
    Select: select,
    Skeleton: skeleton,
    Slider: slider,
    Spinner: spinner,
    Stars: stars,
    StatusDot: statusDot,
    StatusText: statusText,
    Swatch: swatch,
    Switch: switchShow,
    Tag: tag,
    Text: text,
    Textarea: textarea,
    Tooltip: tooltip,
    Grid: grid,
    Layer: layer,
    Row: row,
    Section: section,
    Stack: stack,
  };

  const noop = () => {};
  let plan = $state('yearly');
  let volume = $state(64);
  let warmth = $state(35);

  // A tooltip opens on hover; the capture has no hover, so open the one marked for it.
  onMount(() => {
    const t = setTimeout(() => {
      document
        .querySelector('[data-open-tip] .wrap')
        ?.dispatchEvent(new PointerEvent('pointerenter'));
    }, 300);
    return () => clearTimeout(t);
  });

  const icons: IconName[] = [
    'home',
    'calendar',
    'chat',
    'heart',
    'bell',
    'camera',
    'music',
    'map',
    'sun',
    'leaf',
    'star',
    'compass',
  ];
</script>

{#snippet appIcon()}
  <div class="apps">
    <AppIcon label="Mail" icon="mail" color="blue" size="lg" caption badge={3} />
    <AppIcon label="Notes" icon="pencil" color="orange" size="lg" caption running />
    <AppIcon label="Music" icon="music" color="pink" size="lg" caption running />
    <AppIcon label="Photos" icon="image" color="yellow" size="lg" caption />
    <AppIcon label="Maps" icon="map" color="green" size="lg" caption />
    <AppIcon label="Weather" icon="weather" color="cyan" size="lg" caption />
    <AppIcon label="Calendar" icon="calendar" color="red" size="lg" caption badge={1} />
    <AppIcon label="Studio" icon="sparkles" color="accent" size="lg" caption />
  </div>
{/snippet}

{#snippet avatar()}
  <Stack gap="lg" align="center">
    <Row gap="md">
      <Avatar name="Ada Example" size={64} />
      <Avatar name="Ben Sample" size={64} color="blue" />
      <Avatar name="Cleo Test" size={64} color="orange" />
      <Avatar name="Dan Demo" size={64} color="purple" />
      <Avatar name="Eve Mock" size={64} color="mint" />
    </Row>
    <Row gap="md">
      <Avatar name="Finn Trial" size={40} color="pink" />
      <Avatar name="Gia Draft" size={40} color="yellow" />
      <Avatar name="Team North" size={40} shape="square" color="indigo" />
      <Avatar name="Hal Probe" size={40} color="accent" />
    </Row>
  </Stack>
{/snippet}

{#snippet badge()}
  <div class="badges">
    <Badge tone="live" label="Live" size="lg" />
    <Badge tone="draft" label="Draft" size="lg" />
    <Badge tone="locked" label="Locked" size="lg" />
    <Badge tone="ok" label="Paid" icon="check" size="lg" />
    <Badge tone="warn" label="Overdue" dot size="lg" />
    <Badge tone="danger" label="Failed" size="lg" />
    <Badge tone="accent" variant="solid" label="New" size="lg" shape="pill" />
    <Badge tone="info" label="Beta" size="lg" shape="pill" />
  </div>
{/snippet}

{#snippet brandBar()}
  <Stack gap="lg">
    <Row gap="sm"><BrandBar height={30} /><Heading level={1} text="Orders" /></Row>
    <Row gap="sm"><BrandBar height={20} /><Heading level={3} text="Shipping today" /></Row>
    <Row gap="sm"
      ><BrandBar height={16} color="var(--color-orange)" /><Heading
        level={4}
        tone="muted"
        text="Waiting for stock"
      /></Row
    >
  </Stack>
{/snippet}

{#snippet button()}
  <div class="column">
    <Button variant="primary" size="xl" icon="play" label="Start the day" shimmer />
    <div class="row">
      <Button variant="soft" size="lg" icon="edit" label="Draft" />
      <Button variant="tinted" size="lg" icon="user-plus" label="Invite" />
    </div>
  </div>
{/snippet}

{#snippet card()}
  <div class="pair">
    <Card title="Revenue" count="May" headingLevel={3} gap="sm">
      <Text size="2xl" weight="semibold" numeric text="€38,540" />
      <Text size="sm" tone="muted" text="Eight percent above April." />
    </Card>
    <Card surface="ink" padding="lg" gap="sm">
      <Text size="sm" tone="muted" text="Solar today" />
      <span class="ink-figure"><DotMatrix value="12.4" size="lg" label="12.4" /></span>
      <Text size="sm" tone="muted" text="kWh, more than you used" />
    </Card>
  </div>
{/snippet}

{#snippet checkbox()}
  <Layer level="panel" padding="lg" gap="md" class="mka-w22">
    <Checkbox checked label="Email me" description="When someone mentions me" />
    <Checkbox indeterminate label="Weekly digest" description="Two of four topics" />
    <Checkbox label="Product news" description="A few times a year" />
  </Layer>
{/snippet}

{#snippet divider()}
  <Layer level="panel" padding="lg" gap="md" class="mka-w20">
    <Button variant="primary" size="lg" icon="mail" label="Continue with email" block />
    <Divider label="or" />
    <Button variant="secondary" size="lg" icon="key" label="Use a passkey" block />
  </Layer>
{/snippet}

{#snippet dotMatrix()}
  <Stack gap="md" align="center">
    <span class="dm-accent"><DotMatrix value="07:45" size="xl" label="07:45" /></span>
    <Row gap="xl">
      <span class="dm-soft"><DotMatrix value="21.5°" size="md" label="21.5 degrees" /></span>
      <span class="dm-soft"><DotMatrix value="64%" size="md" label="64 percent" /></span>
    </Row>
  </Stack>
{/snippet}

{#snippet glassLens()}
  <Layer
    level="front"
    direction="horizontal"
    gap="sm"
    padding="md"
    lens={{ refraction: true, magnify: 1.32, rim: 30, rimBend: 38, chroma: 0.06 }}
  >
    <Button variant="ghost" icon="home" label="Home" />
    <Button variant="ghost" icon="sun" label="Light" />
    <Button variant="glass" icon="thermometer" label="22.5 °C" />
  </Layer>
{/snippet}

{#snippet heading()}
  <div class="mka-w26">
    <Heading
      level={1}
      eyebrow="Workspace"
      text="Quarterly review"
      subtitle="Twelve weeks, three goals and one calm team."
    />
  </div>
{/snippet}

{#snippet icon()}
  <div class="icons">
    {#each icons as name, i (name)}
      <span class="icon" class:icon--on={i === 3}><Icon {name} size={28} /></span>
    {/each}
  </div>
{/snippet}

{#snippet iconButton()}
  <Stack gap="sm" align="center">
    <Row gap="xs">
      <IconButton icon="bold" label="Bold" pressed />
      <IconButton icon="italic" label="Italic" />
      <IconButton icon="underline" label="Underline" pressed />
      <IconButton icon="strikethrough" label="Strike" />
    </Row>
    <Row gap="xs">
      <IconButton icon="align-left" label="Left" pressed />
      <IconButton icon="align-center" label="Centre" />
      <IconButton icon="align-right" label="Right" />
      <IconButton icon="trash" label="Delete" tone="danger" />
    </Row>
  </Stack>
{/snippet}

{#snippet image()}
  <div class="images">
    <Image src={photo} alt="A low house of glass among trees" ratio="4/3" width="22rem">
      {#snippet overlay()}
        <span class="img-cap"
          ><strong>A low house by the lake</strong><span>Four rooms, 180 m²</span></span
        >
      {/snippet}
    </Image>
    <Image alt="No picture yet" ratio="1" width="9rem" placeholderIcon="camera" />
  </div>
{/snippet}

{#snippet input()}
  <Stack gap="md" class="mka-w22">
    <Input size="lg" value="ada@example.com" aria-label="Email" />
    <Input size="lg" placeholder="Your name" aria-label="Name" />
    <Input size="lg" value="ada@example" invalid aria-label="Backup email" />
  </Stack>
{/snippet}

{#snippet kbd()}
  <Stack gap="md">
    <Row gap="sm"
      ><span class="keys"><Kbd>⌘</Kbd><Kbd>K</Kbd></span><Text
        size="sm"
        tone="muted"
        text="opens search"
      /></Row
    >
    <Row gap="sm"
      ><span class="keys"><Kbd>⇧</Kbd><Kbd>⌘</Kbd><Kbd>P</Kbd></span><Text
        size="sm"
        tone="muted"
        text="runs a command"
      /></Row
    >
    <Row gap="sm"
      ><span class="keys"><Kbd>Enter</Kbd></span><Text
        size="sm"
        tone="muted"
        text="saves the row"
      /></Row
    >
  </Stack>
{/snippet}

{#snippet link()}
  <Stack gap="sm" class="mka-w18">
    <Text size="md">Read the <Link href="#notes">release notes</Link> before you update.</Text>
    <Text size="md"
      >Questions? See the <Link href="https://example.com/help" external>help centre</Link>.</Text
    >
    <Text size="sm" tone="muted"><Link href="#archive" muted>Older releases</Link></Text>
  </Stack>
{/snippet}

{#snippet loadingBar()}
  <Layer level="panel" padding="lg" gap="md" class="mka-w22">
    <Row gap="sm" align="center">
      <div class="grow"><Text weight="semibold" size="lg" text="Orders" /></div>
      <Button variant="secondary" size="sm" icon="refresh" label="Refresh" busy />
    </Row>
    <LoadingBar active label="Refreshing orders" />
    <Stack gap="xs">
      <Text size="2xl" weight="semibold" numeric text="1,284" />
      <Text size="sm" tone="muted" text="Fetching the latest from the warehouse…" />
    </Stack>
  </Layer>
{/snippet}

{#snippet loadingOverlay()}
  <Layer level="panel" padding="lg" gap="sm" class="mka-w22 mka-rel">
    <Text size="xs" caps tone="muted" weight="semibold" text="Greeting" />
    <Text size="xl" weight="semibold" text="Guten Morgen, Ada" />
    <Text size="sm" tone="muted" text="Schön, dass du wieder da bist." />
    <LoadingOverlay active label="Translating…" />
  </Layer>
{/snippet}

{#snippet price()}
  <Stack gap="lg" align="center">
    <Price amount={49} compareAt={69} currency="EUR" size="xl" />
    <Row gap="xl">
      <Price amount={12} currency="EUR" unit="month" size="lg" />
      <Price amount={0} currency="EUR" freeLabel="Free" size="lg" />
    </Row>
  </Stack>
{/snippet}

{#snippet progressBar()}
  <Layer level="panel" padding="lg" gap="lg" class="mka-w22">
    <ProgressBar value={64} label="Upload" showValue />
    <ProgressBar value={82} label="Storage" valueLabel="41 of 50 GB" showValue />
    <ProgressBar value={30} label="Onboarding" showValue size="sm" />
  </Layer>
{/snippet}

{#snippet radio()}
  <Layer level="panel" padding="lg" gap="md" class="mka-w20">
    <Radio bind:group={plan} value="monthly" label="Monthly" description="€12 a month" />
    <Radio bind:group={plan} value="yearly" label="Yearly" description="€120, two months free" />
    <Radio bind:group={plan} value="lifetime" label="Lifetime" description="Pay once" />
  </Layer>
{/snippet}

{#snippet select()}
  <Stack gap="md" class="mka-w20">
    <Select
      size="lg"
      value="30"
      aria-label="Range"
      options={[
        { value: '7', label: 'Last 7 days' },
        { value: '30', label: 'Last 30 days' },
      ]}
    />
    <Select
      size="lg"
      value="eu"
      aria-label="Region"
      options={[
        { value: 'eu', label: 'Europe (Frankfurt)' },
        { value: 'us', label: 'United States' },
      ]}
    />
  </Stack>
{/snippet}

{#snippet skeleton()}
  <Layer level="panel" padding="lg" gap="md" class="mka-w22">
    <Row gap="md" align="center">
      <Skeleton shape="circle" width="3rem" height="3rem" />
      <div class="grow"><Skeleton lines={2} /></div>
    </Row>
    <Skeleton shape="rect" height="7rem" />
    <Skeleton lines={3} />
  </Layer>
{/snippet}

{#snippet slider()}
  <Layer level="panel" padding="lg" gap="lg" class="mka-w22">
    <Slider label="Volume" bind:value={volume} showValue />
    <Slider
      label="Warmth"
      bind:value={warmth}
      showValue
      format={(v) => `${2700 + Math.round(v * 38)} K`}
    />
  </Layer>
{/snippet}

{#snippet spinner()}
  <Stack gap="md" align="center">
    <Spinner size={56} label="Loading" />
    <Text size="sm" tone="muted" text="Setting up your workspace" />
  </Stack>
{/snippet}

{#snippet stars()}
  <Stack gap="sm" align="center">
    <Stars value={4.5} showValue />
    <Stars value={4} />
    <Stars value={3} />
  </Stack>
{/snippet}

{#snippet statusDot()}
  <Layer level="panel" padding="lg" gap="md" class="mka-w18">
    <Row gap="sm"><StatusDot tone="ok" pulse size="lg" /><Text text="Checkout" /></Row>
    <Row gap="sm"><StatusDot tone="ok" size="lg" /><Text text="Search" /></Row>
    <Row gap="sm"><StatusDot tone="warn" size="lg" /><Text text="Image service" /></Row>
    <Row gap="sm"><StatusDot tone="danger" size="lg" /><Text text="Exports" /></Row>
  </Layer>
{/snippet}

{#snippet statusText()}
  <Stack gap="sm">
    <StatusText message="Streaming the answer…" busy />
    <StatusText message="Saved a moment ago." tone="ok" />
    <StatusText message="Two rows need a look." tone="warn" />
    <StatusText message="Could not reach the server." tone="error" />
  </Stack>
{/snippet}

{#snippet swatch()}
  <div class="swatches">
    {#each [['var(--series-1)', 'Web'], ['var(--series-2)', 'Mail'], ['var(--series-3)', 'App'], ['var(--series-4)', 'Shop'], ['var(--color-pink)', 'Social'], ['var(--color-yellow)', 'Ads']] as [color, label] (label)}
      <Row gap="sm"><Swatch color={color ?? ''} size={18} /><Text text={label} /></Row>
    {/each}
    <Row gap="sm"
      ><Swatch color="var(--color-mint)" size={18} shape="square" /><Text text="Target" /></Row
    >
    <Row gap="sm"
      ><Swatch color="var(--text-3)" size={18} shape="square" /><Text text="Last year" /></Row
    >
  </div>
{/snippet}

{#snippet switchShow()}
  <Layer level="panel" padding="lg" gap="lg" class="mka-w22">
    <Switch checked label="Wi-Fi" description="Home network" />
    <Switch checked tone="ok" label="Backups" description="Every night at 2 am" />
    <Switch label="Night shift" description="Warmer after sunset" />
  </Layer>
{/snippet}

{#snippet tag()}
  <div class="tags">
    <Tag label="design" />
    <Tag label="review" count={4} />
    <Tag name="env" label="prod" mono />
    <Tag name="region" label="eu-central" mono />
    <Tag label="shipped" tone="ok" />
    <Tag label="blocked" tone="danger" />
    <Tag label="ideas" tone="purple" />
    <Tag label="q3" tone="orange" onremove={noop} />
  </div>
{/snippet}

{#snippet text()}
  <Stack gap="xs" class="mka-w26">
    <Text size="xs" caps weight="semibold" tone="accent" text="Type scale" />
    <Text size="display" weight="bold" text="Display" />
    <Text size="2xl" weight="semibold" text="A calm headline" />
    <Text size="lg" text="Body copy that reads well." />
    <Text size="sm" tone="muted" text="Notes, hints and dates, a step quieter." />
    <Text size="sm" mono tone="muted" text="mono · 1,284.00" />
  </Stack>
{/snippet}

{#snippet textarea()}
  <div class="mka-w24">
    <Textarea
      value="Thanks for the quick fix. The new layout reads much calmer; one small thing on the pricing page below."
      rows={4}
      counter
      limit={280}
      aria-label="Reply"
    />
  </div>
{/snippet}

{#snippet tooltip()}
  <div class="tip-stage">
    <Row gap="xs">
      <IconButton icon="italic" label="Italic" />
      <span data-open-tip
        ><Tooltip text="Bold" keys={['Mod', 'B']} describe={false}
          ><IconButton icon="bold" label="Bold" pressed /></Tooltip
        ></span
      >
      <IconButton icon="underline" label="Underline" />
    </Row>
  </div>
{/snippet}

{#snippet grid()}
  <div class="mka-w30">
    <Grid columns={3} min="8rem" gap="md">
      {#each [['Kitchen', '21.5°', 'thermometer'], ['Hall', '19.0°', 'thermometer'], ['Study', '22.0°', 'thermometer'], ['Lights', '3 on', 'sun'], ['Doors', 'Locked', 'lock'], ['Air', 'Good', 'wind']] as [room, value, ic] (room)}
        <Layer level="panel" padding="md" gap="xs">
          <span class="tile-icon"><Icon name={ic as IconName} size={22} /></span>
          <Text tone="muted" text={room} />
          <Text size="xl" weight="semibold" text={value} />
        </Layer>
      {/each}
    </Grid>
  </div>
{/snippet}

{#snippet layer()}
  <div class="layers">
    <Stack gap="xs">
      <Text size="xs" caps weight="semibold" tone="muted" text="Ground" />
      <Text size="xl" weight="semibold" text="Good morning, Ada" />
    </Stack>
    <Layer level="panel" padding="md" gap="xs">
      <Text size="xs" caps weight="semibold" tone="muted" text="Panel" />
      <Text text="Three orders wait for packing." />
    </Layer>
    <Layer level="selected" padding="md" gap="xs">
      <Text size="xs" caps weight="semibold" tone="accent" text="Selected" />
      <Text text="Team plan, the one you chose." />
    </Layer>
    <Layer level="front" direction="horizontal" gap="xs">
      <Button variant="ghost" icon="filter" label="Filter" />
      <Button variant="ghost" icon="share" label="Share" />
      <Button variant="glass" icon="plus" label="New order" />
    </Layer>
  </div>
{/snippet}

{#snippet row()}
  <Layer level="panel" padding="lg" gap="md" class="mka-w24">
    {#each [['Ada Example', 'Design', 'live', 'Online'], ['Ben Sample', 'Engineering', 'draft', 'Away'], ['Cleo Test', 'Support', 'locked', 'Off']] as [person, team, tone, status] (person)}
      <Row gap="md" align="center">
        <Avatar name={person ?? ''} size={36} />
        <div class="grow">
          <Stack gap="none">
            <Text weight="semibold" text={person} />
            <Text size="sm" tone="muted" text={team} />
          </Stack>
        </div>
        <Badge tone={tone as 'live'} label={status} />
      </Row>
    {/each}
  </Layer>
{/snippet}

{#snippet section()}
  <div class="mka-w26">
    <Section level="panel" title="Members" description="Who can see this workspace." heading={3}>
      {#snippet actions()}<Button size="sm" icon="user-plus" label="Invite" />{/snippet}
      <Row gap="sm">
        <Avatar name="Ada Example" size={36} />
        <Avatar name="Ben Sample" size={36} color="blue" />
        <Avatar name="Cleo Test" size={36} color="orange" />
        <Avatar name="Dan Demo" size={36} color="purple" />
        <Text size="sm" tone="muted" text="and 8 more" />
      </Row>
    </Section>
  </div>
{/snippet}

{#snippet stack()}
  <Layer level="panel" padding="lg" class="mka-w20">
    <Stack gap="md">
      <Heading level={3} text="Stay in the loop" subtitle="One short letter a month." />
      <Input size="lg" placeholder="you@example.com" aria-label="Email" />
      <Button variant="primary" size="lg" label="Subscribe" block />
    </Stack>
  </Layer>
{/snippet}

{#snippet glyph()}<span></span>{/snippet}
{#snippet preview(name: string)}<PreviewAtoms {name} fallback={glyph} />{/snippet}

<Studio levels={['Atoms', 'Layout']} {shows} {meta} {skip} {preview} />

<style>
  .column {
    display: grid;
    justify-items: center;
    gap: var(--space-6);
  }
  .row {
    display: flex;
    align-items: center;
    gap: var(--space-4);
  }
  .apps {
    display: grid;
    grid-template-columns: repeat(4, auto);
    gap: var(--space-5) var(--space-6);
  }
  .badges {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--space-2);
    width: 17rem;
  }
  .pair {
    display: grid;
    grid-template-columns: 14rem 14rem;
    gap: var(--space-5);
    align-items: stretch;
  }
  .ink-figure,
  .dm-accent {
    color: var(--accent);
  }
  .dm-soft {
    color: var(--text-2);
  }
  .icons {
    display: grid;
    grid-template-columns: repeat(4, auto);
    gap: var(--space-5) var(--space-7, 2rem);
  }
  .icon {
    display: grid;
    place-items: center;
    width: 3.25rem;
    height: 3.25rem;
    border-radius: 50%;
    color: var(--text-2);
  }
  .icon--on {
    background: var(--accent-soft);
    color: var(--accent-ink);
  }
  .images {
    display: flex;
    align-items: flex-end;
    gap: var(--space-5);
  }
  .img-cap {
    display: grid;
    gap: 2px;
    font-size: var(--fs-sm);
  }
  .img-cap span {
    opacity: 0.8;
  }
  .keys {
    display: inline-flex;
    gap: 4px;
    font-size: 1.6rem;
  }
  .keys :global(kbd) {
    font-size: 0.9rem;
  }
  .swatches {
    display: grid;
    grid-template-columns: repeat(2, 9rem);
    gap: var(--space-3) var(--space-6);
  }
  .tags {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--space-2);
    width: 20rem;
  }
  .tip-stage {
    padding-top: 3rem;
  }
  .tile-icon {
    color: var(--accent-ink);
  }
  .layers {
    display: grid;
    gap: var(--space-4);
    width: 24rem;
  }
  .grow {
    flex: 1;
    min-width: 0;
  }
  :global(.mka-w18) {
    width: 18rem;
  }
  :global(.mka-w20) {
    width: 20rem;
  }
  :global(.mka-w22) {
    width: 22rem;
  }
  .mka-w24,
  :global(.mka-w24) {
    width: 24rem;
  }
  .mka-w26,
  :global(.mka-w26) {
    width: 26rem;
  }
  .mka-w30 {
    width: 30rem;
  }
  :global(.mka-clip) {
    overflow: clip;
  }
  :global(.mka-rel) {
    position: relative;
    overflow: clip;
  }
</style>
