<script lang="ts">
  /**
   * Storybook-only: the small live previews of the catalogue's molecules, one snippet per
   * component, rendered with the real components and tiny props. Overlays and big pieces are
   * left to the fallback glyph.
   */
  import type { Snippet } from 'svelte';
  import Text from '../../patterns/atoms/Text.svelte';
  import Row from '../../patterns/layout/Row.svelte';
  import Stack from '../../patterns/layout/Stack.svelte';
  import ArcGauge from '../../patterns/molecules/ArcGauge.svelte';
  import Alert from '../../patterns/molecules/Alert.svelte';
  import Breadcrumbs from '../../patterns/molecules/Breadcrumbs.svelte';
  import ChoiceCard from '../../patterns/molecules/ChoiceCard.svelte';
  import CodeBlock from '../../patterns/molecules/CodeBlock.svelte';
  import CodeInput from '../../patterns/molecules/CodeInput.svelte';
  import ConfirmButton from '../../patterns/molecules/ConfirmButton.svelte';
  import CopyButton from '../../patterns/molecules/CopyButton.svelte';
  import DetailList from '../../patterns/molecules/DetailList.svelte';
  import DetailSection from '../../patterns/molecules/DetailSection.svelte';
  import Disclosure from '../../patterns/molecules/Disclosure.svelte';
  import EmptyState from '../../patterns/molecules/EmptyState.svelte';
  import Field from '../../patterns/molecules/Field.svelte';
  import Input from '../../patterns/atoms/Input.svelte';
  import GlassPill from '../../patterns/molecules/GlassPill.svelte';
  import IdentityCell from '../../patterns/molecules/IdentityCell.svelte';
  import JobStatus from '../../patterns/molecules/JobStatus.svelte';
  import KpiTile from '../../patterns/molecules/KpiTile.svelte';
  import Legend from '../../patterns/molecules/Legend.svelte';
  import Markdown from '../../patterns/molecules/Markdown.svelte';
  import Pager from '../../patterns/molecules/Pager.svelte';
  import RadioGroup from '../../patterns/molecules/RadioGroup.svelte';
  import RatingDisplay from '../../patterns/molecules/RatingDisplay.svelte';
  import RefreshButton from '../../patterns/molecules/RefreshButton.svelte';
  import SearchField from '../../patterns/molecules/SearchField.svelte';
  import SegmentedControl from '../../patterns/molecules/SegmentedControl.svelte';
  import StarInput from '../../patterns/molecules/StarInput.svelte';
  import Tabs from '../../patterns/molecules/Tabs.svelte';
  import TagInput from '../../patterns/molecules/TagInput.svelte';
  import TagList from '../../patterns/molecules/TagList.svelte';
  import ThumbsInput from '../../patterns/molecules/ThumbsInput.svelte';
  import TitlePill from '../../patterns/molecules/TitlePill.svelte';
  import Toast from '../../patterns/molecules/Toast.svelte';
  import ToggleChip from '../../patterns/molecules/ToggleChip.svelte';
  import VersionRail from '../../patterns/molecules/VersionRail.svelte';
  import AvatarStack from '../../patterns/molecules/AvatarStack.svelte';
  import ToolGroup from '../../patterns/molecules/ToolGroup.svelte';
  import IconButton from '../../patterns/atoms/IconButton.svelte';
  import Reactions from '../../patterns/molecules/Reactions.svelte';
  import Comment from '../../patterns/molecules/Comment.svelte';
  import TaskList from '../../patterns/molecules/TaskList.svelte';
  import Calendar from '../../patterns/molecules/Calendar.svelte';
  import Stepper from '../../patterns/molecules/Stepper.svelte';
  import Banner from '../../patterns/molecules/Banner.svelte';
  import Stat from '../../patterns/molecules/Stat.svelte';
  import CheckoutSteps from '../../patterns/molecules/CheckoutSteps.svelte';
  import FeatureCard from '../../patterns/molecules/FeatureCard.svelte';
  import PricingCard from '../../patterns/molecules/PricingCard.svelte';
  import QuantityStepper from '../../patterns/molecules/QuantityStepper.svelte';
  import Testimonial from '../../patterns/molecules/Testimonial.svelte';
  import VariantPicker from '../../patterns/molecules/VariantPicker.svelte';
  import CheckboxGroup from '../../patterns/molecules/CheckboxGroup.svelte';

  let { name, fallback }: { name: string; fallback: Snippet } = $props();

  const noop = () => {};
  let gauge = $state(21.5);
  let range = $state('7');
  let tab = $state('overview');
  let version = $state('v3');
  let stars = $state(4);
  let quantity = $state(2);
  let size = $state('m');
  let plan = $state('team');
  let tags = $state(['design', 'review']);
  // A fixed day keeps the preview the same on every visit.
  const day = new Date(2026, 4, 14);
  const minutesAgo = new Date(day.getTime() - 12 * 60_000);

  // Top-level snippets are hoisted, so the script can name them.
  const previews: Record<string, Snippet> = {
    ArcGauge: arcGauge,
    Alert: alert,
    Breadcrumbs: breadcrumbs,
    CheckboxGroup: checkboxGroup,
    ChoiceCard: choiceCard,
    CodeBlock: codeBlock,
    CodeInput: codeInput,
    ConfirmButton: confirmButton,
    CopyButton: copyButton,
    DetailList: detailList,
    DetailSection: detailSection,
    Disclosure: disclosure,
    EmptyState: emptyState,
    Field: field,
    GlassPill: glassPill,
    IdentityCell: identityCell,
    JobStatus: jobStatus,
    KpiTile: kpiTile,
    Legend: legend,
    Markdown: markdown,
    Pager: pager,
    RadioGroup: radioGroup,
    RatingDisplay: ratingDisplay,
    RefreshButton: refreshButton,
    SearchField: searchField,
    SegmentedControl: segmentedControl,
    StarInput: starInput,
    Tabs: tabs,
    TagInput: tagInput,
    TagList: tagList,
    ThumbsInput: thumbsInput,
    TitlePill: titlePill,
    Toast: toast,
    ToggleChip: toggleChip,
    VersionRail: versionRail,
    AvatarStack: avatarStack,
    ToolGroup: toolGroup,
    Reactions: reactions,
    Comment: comment,
    TaskList: taskList,
    Calendar: calendar,
    Stepper: stepper,
    Banner: banner,
    Stat: stat,
    CheckoutSteps: checkoutSteps,
    FeatureCard: featureCard,
    PricingCard: pricingCard,
    QuantityStepper: quantityStepper,
    Testimonial: testimonial,
    VariantPicker: variantPicker,
  };
</script>

{#snippet arcGauge()}
  <div class="zoom-sm">
    <ArcGauge label="Living room" bind:value={gauge} min={16} max={28} step={0.5} unit="°C" />
  </div>
{/snippet}
{#snippet alert()}
  <div class="w"><Alert tone="ok" message="Your changes are live." /></div>
{/snippet}
{#snippet breadcrumbs()}
  <Breadcrumbs
    items={[
      { label: 'Projects', href: '#preview' },
      { label: 'Atlas', href: '#preview' },
      { label: 'Settings' },
    ]}
  />
{/snippet}
{#snippet checkboxGroup()}
  <div class="zoom">
    <CheckboxGroup
      label="Channels"
      columns={2}
      value={['web', 'mail']}
      options={[
        { value: 'web', label: 'Web' },
        { value: 'mail', label: 'Mail' },
        { value: 'app', label: 'App' },
        { value: 'chat', label: 'Chat' },
      ]}
    />
  </div>
{/snippet}
{#snippet choiceCard()}
  <div class="w">
    <ChoiceCard title="Team" icon="users" meta="Up to 20 seats" selected onclick={noop} />
  </div>
{/snippet}
{#snippet codeBlock()}
  <div class="w"><CodeBlock code={'{ "status": "ok" }'} copyable={false} /></div>
{/snippet}
{#snippet codeInput()}
  <div class="zoom"><CodeInput label="Device code" length={6} groupAfter={3} value="ABC" /></div>
{/snippet}
{#snippet confirmButton()}<ConfirmButton label="Delete" onconfirm={noop} />{/snippet}
{#snippet copyButton()}<CopyButton value="sk-example" label="Copy key" />{/snippet}
{#snippet detailList()}
  <div class="w">
    <DetailList
      items={[
        { label: 'Owner', value: 'Ada Example' },
        { label: 'Region', value: 'eu-central' },
      ]}
    />
  </div>
{/snippet}
{#snippet detailSection()}
  <div class="w">
    <DetailSection title="Contact"><Text size="sm" text="ada@example.com" /></DetailSection>
  </div>
{/snippet}
{#snippet disclosure()}
  <div class="w">
    <Disclosure title="Advanced options"><Text size="sm" text="Hidden until opened." /></Disclosure>
  </div>
{/snippet}
{#snippet emptyState()}
  <div class="zoom">
    <EmptyState compact icon="inbox" title="No messages" message="All caught up." />
  </div>
{/snippet}
{#snippet field()}
  <div class="w">
    <Field label="Email" hint="We never share it.">
      {#snippet children({ id })}<Input {id} value="ada@example.com" />{/snippet}
    </Field>
  </div>
{/snippet}
{#snippet glassPill()}
  <GlassPill label="Views">
    <Text size="sm" text="List" /><Text size="sm" tone="muted" text="Board" />
  </GlassPill>
{/snippet}
{#snippet identityCell()}<IdentityCell name="Ada Example" subtitle="ada@example.com" />{/snippet}
{#snippet jobStatus()}
  <div class="w"><JobStatus status="running" step="crawling" done={12} total={40} /></div>
{/snippet}
{#snippet kpiTile()}
  <div class="w"><KpiTile label="Orders" value={1284} delta="+12 %" trend="up" /></div>
{/snippet}
{#snippet legend()}
  <Legend
    items={[
      { label: 'Up', color: 'var(--up)' },
      { label: 'Down', color: 'var(--down)' },
    ]}
  />
{/snippet}
{#snippet markdown()}
  <div class="w"><Markdown size="sm" source="**Bold** and `code`, in prose." /></div>
{/snippet}
{#snippet pager()}
  <div class="zoom"><Pager offset={25} limit={25} total={1234} onpage={noop} /></div>
{/snippet}
{#snippet radioGroup()}
  <RadioGroup
    label="Billing"
    bind:value={plan}
    options={[
      { value: 'solo', label: 'Solo' },
      { value: 'team', label: 'Team' },
    ]}
  />
{/snippet}
{#snippet ratingDisplay()}
  <Stack gap="xs">
    <RatingDisplay type="thumbs" value="up" />
    <RatingDisplay type="stars" value={4} />
  </Stack>
{/snippet}
{#snippet refreshButton()}<RefreshButton />{/snippet}
{#snippet searchField()}<div class="w"><SearchField label="Search" value="" /></div>{/snippet}
{#snippet segmentedControl()}
  <SegmentedControl
    label="Range"
    bind:value={range}
    options={[
      { value: '7', label: '7 days' },
      { value: '30', label: '30 days' },
      { value: '90', label: '90 days' },
    ]}
  />
{/snippet}
{#snippet starInput()}<StarInput label="Rating" bind:value={stars} />{/snippet}
{#snippet tabs()}
  <div class="zoom">
    <Tabs
      label="Sections"
      bind:value={tab}
      tabs={[
        { value: 'overview', label: 'Overview' },
        { value: 'activity', label: 'Activity' },
        { value: 'settings', label: 'Settings' },
      ]}
    />
  </div>
{/snippet}
{#snippet tagInput()}<div class="w"><TagInput label="Labels" bind:value={tags} /></div>{/snippet}
{#snippet tagList()}<TagList
    labels={['design', 'review', 'q3', 'urgent', 'web']}
    max={3}
  />{/snippet}
{#snippet thumbsInput()}<div class="zoom">
    <ThumbsInput label="Helpful?" value="up" />
  </div>{/snippet}
{#snippet titlePill()}<TitlePill title="Orders" subtitle="what ships today" />{/snippet}
{#snippet toast()}
  <div class="zoom"><Toast tone="ok" title="Saved" message="Draft updated." /></div>
{/snippet}
{#snippet toggleChip()}
  <Row gap="xs">
    <ToggleChip pressed label="Revenue" color="var(--series-1)" />
    <ToggleChip label="Costs" color="var(--series-2)" />
  </Row>
{/snippet}
{#snippet versionRail()}
  <VersionRail
    bind:value={version}
    items={[
      { value: 'v1', label: 'v1' },
      { value: 'v2', label: 'v2', marked: true },
      { value: 'v3', label: 'v3' },
    ]}
  />
{/snippet}
{#snippet avatarStack()}
  <AvatarStack
    presence
    people={[
      { name: 'Ada Example', presence: 'online' },
      { name: 'Ben Sample', presence: 'away' },
      { name: 'Cleo Test' },
      { name: 'Dan Demo' },
      { name: 'Eve Mock' },
    ]}
    max={4}
  />
{/snippet}
{#snippet toolGroup()}
  <ToolGroup label="Format">
    <IconButton icon="align-left" label="Left" pressed />
    <IconButton icon="align-center" label="Centre" />
    <IconButton icon="align-right" label="Right" />
  </ToolGroup>
{/snippet}
{#snippet reactions()}
  <Reactions
    readonly
    reactions={[
      { emoji: '🎉', count: 4, mine: true },
      { emoji: '👀', count: 2 },
    ]}
  />
{/snippet}
{#snippet comment()}
  <div class="w zoom">
    <Comment author="Ada Example" time={minutesAgo} now={day} text="Looks good to me." size="sm" />
  </div>
{/snippet}
{#snippet taskList()}
  <div class="w zoom">
    <TaskList
      progress
      editable={false}
      items={[
        { id: '1', label: 'Draft the brief', done: true },
        { id: '2', label: 'Review', done: false },
      ]}
    />
  </div>
{/snippet}
{#snippet calendar()}
  <div class="zoom-sm"><Calendar size="sm" value={day} today={day} /></div>
{/snippet}
{#snippet stepper()}
  <div class="wide zoom-xs">
    <Stepper current={1} steps={[{ label: 'Upload' }, { label: 'Map' }, { label: 'Import' }]} />
  </div>
{/snippet}
{#snippet banner()}
  <div class="w zoom"><Banner tone="info" message="Maintenance on Sunday, 2–4 am." /></div>
{/snippet}
{#snippet stat()}
  <Stat
    label="Visitors"
    value="12.4k"
    delta={8}
    deltaText="+8 %"
    trend={[4, 6, 5, 8, 7, 9, 11]}
    size="sm"
  />
{/snippet}
{#snippet checkoutSteps()}<div class="wide zoom-xs"><CheckoutSteps current={1} /></div>{/snippet}
{#snippet featureCard()}
  <div class="w zoom">
    <FeatureCard
      title="Fast sync"
      text="Changes land everywhere at once."
      icon="bolt"
      level="ground"
    />
  </div>
{/snippet}
{#snippet pricingCard()}
  <div class="zoom-xs">
    <PricingCard
      name="Team"
      price={12}
      period="month"
      currency="EUR"
      features={[{ label: '20 seats' }]}
    />
  </div>
{/snippet}
{#snippet quantityStepper()}<QuantityStepper bind:value={quantity} label="Quantity" />{/snippet}
{#snippet testimonial()}
  <div class="w zoom">
    <Testimonial
      quote="It just gets out of the way."
      name="Ada Example"
      role="Designer"
      level="ground"
    />
  </div>
{/snippet}
{#snippet variantPicker()}
  <VariantPicker
    label="Size"
    kind="pill"
    bind:value={size}
    options={[
      { value: 's', label: 'S' },
      { value: 'm', label: 'M' },
      { value: 'l', label: 'L' },
      { value: 'xl', label: 'XL', disabled: true },
    ]}
  />
{/snippet}

{@render (previews[name] ?? fallback)()}

<style>
  .w {
    width: min(15rem, 100%);
  }
  /* Bigger molecules are shown a little smaller, so they fit the tile. */
  .zoom {
    zoom: 0.85;
  }
  .zoom-sm {
    zoom: 0.62;
  }
  .zoom-xs {
    zoom: 0.48;
  }
  /* Steppers lie down only from 34rem of room on (a container query). */
  .wide {
    width: 36rem;
  }
</style>
