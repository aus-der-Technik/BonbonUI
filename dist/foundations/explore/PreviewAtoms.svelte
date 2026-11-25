<script lang="ts">
  /**
   * Storybook-only: the small live previews of the catalogue's atoms and layout helpers, one
   * snippet per component, rendered with the real components and tiny props.
   */
  import type { Snippet } from 'svelte';
  import Avatar from '../../patterns/atoms/Avatar.svelte';
  import Badge from '../../patterns/atoms/Badge.svelte';
  import BrandBar from '../../patterns/atoms/BrandBar.svelte';
  import Button from '../../patterns/atoms/Button.svelte';
  import DotMatrix from '../../patterns/atoms/DotMatrix.svelte';
  import Card from '../../patterns/atoms/Card.svelte';
  import Checkbox from '../../patterns/atoms/Checkbox.svelte';
  import Divider from '../../patterns/atoms/Divider.svelte';
  import Icon from '../../patterns/atoms/Icon.svelte';
  import IconButton from '../../patterns/atoms/IconButton.svelte';
  import Input from '../../patterns/atoms/Input.svelte';
  import Kbd from '../../patterns/atoms/Kbd.svelte';
  import Link from '../../patterns/atoms/Link.svelte';
  import LoadingBar from '../../patterns/atoms/LoadingBar.svelte';
  import LoadingOverlay from '../../patterns/atoms/LoadingOverlay.svelte';
  import ProgressBar from '../../patterns/atoms/ProgressBar.svelte';
  import Radio from '../../patterns/atoms/Radio.svelte';
  import Select from '../../patterns/atoms/Select.svelte';
  import Skeleton from '../../patterns/atoms/Skeleton.svelte';
  import Slider from '../../patterns/atoms/Slider.svelte';
  import Spinner from '../../patterns/atoms/Spinner.svelte';
  import Stars from '../../patterns/atoms/Stars.svelte';
  import StatusText from '../../patterns/atoms/StatusText.svelte';
  import Swatch from '../../patterns/atoms/Swatch.svelte';
  import Switch from '../../patterns/atoms/Switch.svelte';
  import Tag from '../../patterns/atoms/Tag.svelte';
  import Textarea from '../../patterns/atoms/Textarea.svelte';
  import AppIcon from '../../patterns/atoms/AppIcon.svelte';
  import Heading from '../../patterns/atoms/Heading.svelte';
  import Image from '../../patterns/atoms/Image.svelte';
  import Price from '../../patterns/atoms/Price.svelte';
  import StatusDot from '../../patterns/atoms/StatusDot.svelte';
  import Text from '../../patterns/atoms/Text.svelte';
  import Stack from '../../patterns/layout/Stack.svelte';
  import Row from '../../patterns/layout/Row.svelte';
  import Grid from '../../patterns/layout/Grid.svelte';
  import Spacer from '../../patterns/layout/Spacer.svelte';
  import Section from '../../patterns/layout/Section.svelte';

  let { name, fallback }: { name: string; fallback: Snippet } = $props();

  let radio = $state('a');

  // Top-level snippets are hoisted, so the script can name them.
  const previews: Record<string, Snippet> = {
    Avatar: avatar,
    Badge: badge,
    BrandBar: brandBar,
    Button: button,
    DotMatrix: dotMatrix,
    Card: card,
    Checkbox: checkbox,
    Divider: divider,
    Icon: icon,
    IconButton: iconButton,
    Input: input,
    Kbd: kbd,
    Link: link,
    LoadingBar: loadingBar,
    LoadingOverlay: loadingOverlay,
    ProgressBar: progressBar,
    Radio: radioP,
    Select: select,
    Skeleton: skeleton,
    Slider: slider,
    Spinner: spinner,
    Stars: stars,
    StatusText: statusText,
    Swatch: swatch,
    Switch: switchP,
    Tag: tag,
    Textarea: textarea,
    AppIcon: appIcon,
    Heading: heading,
    Image: image,
    Price: price,
    StatusDot: statusDot,
    Text: text,
    Stack: stack,
    Row: row,
    Grid: grid,
    Spacer: spacer,
    Section: section,
  };
</script>

{#snippet avatar()}
  <Row gap="sm">
    <Avatar name="Ada Example" />
    <Avatar name="Ben Sample" color="blue" />
    <Avatar name="Cleo Test" color="orange" size={28} />
  </Row>
{/snippet}
{#snippet badge()}
  <Row gap="xs" justify="center">
    <Badge tone="live" label="Editable" />
    <Badge tone="draft" label="Draft" />
    <Badge tone="danger" label="Failed" />
  </Row>
{/snippet}
{#snippet brandBar()}
  <Row gap="sm"><BrandBar /><Heading level={4} text="Orders" /></Row>
{/snippet}
{#snippet button()}
  <Row gap="sm" justify="center">
    <Button variant="primary" label="Save" />
    <Button variant="soft" icon="share" label="Share" />
  </Row>
{/snippet}
{#snippet dotMatrix()}<DotMatrix value="21.5°" size="md" label="Temperature" />{/snippet}
{#snippet card()}
  <Card title="Revenue" headingLevel={4} surface="subtle" padding="sm"
    ><Text size="sm" tone="muted" text="Last 30 days" /></Card
  >
{/snippet}
{#snippet checkbox()}
  <Stack gap="xs">
    <Checkbox checked label="Email me" />
    <Checkbox label="Weekly digest" />
  </Stack>
{/snippet}
{#snippet divider()}<div class="w"><Divider label="or" /></div>{/snippet}
{#snippet icon()}
  <Row gap="md">
    <Icon name="home" size={22} /><Icon name="calendar" size={22} /><Icon
      name="heart"
      size={22}
    /><Icon name="settings" size={22} />
  </Row>
{/snippet}
{#snippet iconButton()}
  <Row gap="xs">
    <IconButton icon="bold" label="Bold" />
    <IconButton icon="italic" label="Italic" pressed />
    <IconButton icon="underline" label="Underline" />
  </Row>
{/snippet}
{#snippet input()}<div class="w">
    <Input value="ada@example.com" aria-label="Email" />
  </div>{/snippet}
{#snippet kbd()}
  <Row gap="xs"><Kbd>⌘</Kbd><Kbd>K</Kbd><Text size="sm" tone="muted" text="opens search" /></Row>
{/snippet}
{#snippet link()}
  <Text size="sm">Read the <Link href="#preview">release notes</Link> first.</Text>
{/snippet}
{#snippet loadingBar()}<div class="w"><LoadingBar active label="Loading" /></div>{/snippet}
{#snippet loadingOverlay()}
  <div class="overlay-box">
    <Text size="sm" tone="muted" text="Guten Morgen" />
    <LoadingOverlay active label="Translating…" />
  </div>
{/snippet}
{#snippet progressBar()}
  <div class="w"><ProgressBar value={64} label="Upload" showValue /></div>
{/snippet}
{#snippet radioP()}
  <Stack gap="xs">
    <Radio bind:group={radio} value="a" label="Monthly" />
    <Radio bind:group={radio} value="b" label="Yearly" />
  </Stack>
{/snippet}
{#snippet select()}
  <div class="w">
    <Select
      value="7"
      aria-label="Range"
      options={[
        { value: '7', label: 'Last 7 days' },
        { value: '30', label: 'Last 30 days' },
      ]}
    />
  </div>
{/snippet}
{#snippet skeleton()}
  <Row gap="sm" align="start">
    <Skeleton shape="circle" width="2.5rem" height="2.5rem" />
    <div class="w-sm"><Skeleton lines={3} /></div>
  </Row>
{/snippet}
{#snippet slider()}<div class="w"><Slider label="Volume" value={60} /></div>{/snippet}
{#snippet spinner()}<Spinner size={28} />{/snippet}
{#snippet stars()}<Stars value={3.5} showValue />{/snippet}
{#snippet statusText()}
  <Stack gap="xs">
    <StatusText message="Streaming…" busy />
    <StatusText message="Saved." tone="ok" />
  </Stack>
{/snippet}
{#snippet swatch()}
  <Row gap="sm">
    <Swatch color="var(--series-1)" size={14} /><Swatch color="var(--series-2)" size={14} /><Swatch
      color="var(--series-3)"
      size={14}
    /><Swatch color="var(--series-4)" size={14} shape="square" />
  </Row>
{/snippet}
{#snippet switchP()}
  <Stack gap="xs">
    <Switch checked label="Wi-Fi" />
    <Switch label="Night mode" />
  </Stack>
{/snippet}
{#snippet tag()}
  <Row gap="xs" justify="center">
    <Tag label="design" />
    <Tag name="env" label="prod" />
    <Tag label="ok" tone="ok" />
  </Row>
{/snippet}
{#snippet textarea()}
  <div class="w">
    <Textarea value="A short note…" rows={2} counter limit={140} aria-label="Note" />
  </div>
{/snippet}
{#snippet appIcon()}
  <Row gap="sm">
    <AppIcon label="Mail" icon="mail" color="blue" size="md" />
    <AppIcon label="Notes" icon="pencil" color="orange" size="md" />
    <AppIcon label="Music" icon="music" color="pink" size="md" badge={3} />
  </Row>
{/snippet}
{#snippet heading()}
  <Heading level={3} eyebrow="Workspace" text="Quarterly review" />
{/snippet}
{#snippet image()}<Image alt="No picture yet" ratio="4/3" width="8rem" />{/snippet}
{#snippet price()}<Price amount={49} compareAt={69} currency="EUR" size="lg" />{/snippet}
{#snippet statusDot()}
  <Stack gap="xs">
    <Row gap="xs"><StatusDot tone="ok" pulse /><Text size="sm" text="Online" /></Row>
    <Row gap="xs"><StatusDot tone="warn" /><Text size="sm" text="Degraded" /></Row>
  </Stack>
{/snippet}
{#snippet text()}
  <Stack gap="xs">
    <Text size="lg" weight="semibold" text="Body copy" />
    <Text size="sm" tone="muted" text="From the type scale." />
  </Stack>
{/snippet}

{#snippet stack()}
  <Stack gap="xs"><span class="b"></span><span class="b"></span><span class="b"></span></Stack>
{/snippet}
{#snippet row()}
  <Row gap="xs"><span class="b"></span><span class="b"></span><span class="b"></span></Row>
{/snippet}
{#snippet grid()}
  <div class="w">
    <Grid columns={3} min="2.5rem" gap="xs"
      ><span class="b"></span><span class="b"></span><span class="b"></span><span class="b"
      ></span><span class="b"></span><span class="b"></span></Grid
    >
  </div>
{/snippet}
{#snippet spacer()}
  <div class="w">
    <Row gap="xs"><span class="b"></span><Spacer /><span class="b"></span></Row>
  </div>
{/snippet}
{#snippet section()}
  <div class="w">
    <Section title="Members" description="Who can see this workspace." heading={4} />
  </div>
{/snippet}

{@render (previews[name] ?? fallback)()}

<style>
  .w {
    width: min(14rem, 100%);
  }
  .w-sm {
    width: 7rem;
  }
  .overlay-box {
    position: relative;
    display: grid;
    place-items: center;
    width: 12rem;
    height: 4.5rem;
    border-radius: var(--radius-md);
    background: var(--fill-subtle);
  }
  .b {
    display: block;
    min-width: 2.25rem;
    height: 1.25rem;
    border-radius: var(--radius-xs);
    background: var(--accent-soft);
    border: 1px solid var(--accent-border);
  }
</style>
