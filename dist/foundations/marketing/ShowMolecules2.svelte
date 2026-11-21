<script module lang="ts">
  import type { Meta } from './looks';
  import photo from '../../demo/assets/smart-home-backdrop.jpg';

  /** Molecules Legend … VersionRail (the first half lives in ShowMolecules). */
  export const names = [
    'Legend',
    'LogoCloud',
    'Markdown',
    'MultiSelect',
    'NewsletterSignup',
    'Pager',
    'Picker',
    'Popover',
    'PricingCard',
    'ProductCard',
    'QuantityStepper',
    'RadioGroup',
    'RatingDisplay',
    'Reactions',
    'RefreshButton',
    'SearchField',
    'SegmentedControl',
    'SignInCard',
    'StarInput',
    'Stat',
    'Stepper',
    'StructTree',
    'Tabs',
    'TagInput',
    'TagList',
    'TaskList',
    'Testimonial',
    'ThumbsInput',
    'TitlePill',
    'Toast',
    'ToggleChip',
    'ToolGroup',
    'UserMenu',
    'VariantPicker',
    'VersionRail',
  ] as const;

  export const meta: Record<string, Meta> = {
    Legend: { zoom: 2, note: 'Names the colours of a chart' },
    LogoCloud: { zoom: 1.55, note: 'Quiet logos, one grey' },
    Markdown: { zoom: 1.65, note: 'Prose, safely rendered' },
    MultiSelect: { zoom: 1.75, note: 'Many choices, one field' },
    NewsletterSignup: { zoom: 1.55, note: 'Answers in place' },
    Pager: { zoom: 1.6, note: 'Pages through long lists' },
    Picker: { zoom: 1.7, note: 'Grows from its trigger' },
    Popover: { zoom: 1.8, note: 'Grows from its trigger' },
    PricingCard: { zoom: 1.3, note: 'The chosen plan glows' },
    ProductCard: { zoom: 1.35, note: 'Add to cart, in place' },
    QuantityStepper: { zoom: 2.6, note: 'Minus, count, plus' },
    RadioGroup: { zoom: 1.6, note: 'One of a few' },
    RatingDisplay: { zoom: 3, note: 'Stars or thumbs, read-only' },
    Reactions: { zoom: 2, note: 'A small word back' },
    RefreshButton: { zoom: 2.1, note: 'Pressed, or live by itself' },
    SearchField: { zoom: 1.6, note: 'Find as you type' },
    SegmentedControl: { zoom: 1.8, note: 'Liquid selection' },
    SignInCard: { zoom: 1.45, note: 'One button in' },
    StarInput: { zoom: 3, note: 'Tap a star' },
    Stat: { zoom: 1.7, note: 'A figure and its trend' },
    Stepper: { zoom: 1.5, note: 'Where you are, what is next' },
    StructTree: { zoom: 1.5, note: 'Nested data, unfolded' },
    Tabs: { zoom: 1.7, note: 'Line or pill' },
    TagInput: { zoom: 1.6, note: 'Type, then Enter' },
    TagList: { zoom: 2.5, note: 'A few, then “more”' },
    TaskList: { zoom: 1.5, note: 'Done sinks to the end' },
    Testimonial: { zoom: 1.4, note: 'In their own words' },
    ThumbsInput: { zoom: 2.3, note: 'Wide tiles, one vote' },
    TitlePill: { zoom: 1.6, note: 'Glass that floats', photo, tint: '#9c7a4e', place: 'top-left' },
    Toast: { zoom: 1.55, note: 'Background news, with Undo' },
    ToggleChip: { zoom: 1.9, note: 'Series on and off' },
    ToolGroup: { zoom: 2.3, note: 'Tools that belong together' },
    UserMenu: { zoom: 2, note: 'Who is signed in' },
    VariantPicker: { zoom: 2, tint: '#c2417a', note: 'Colour and size' },
    VersionRail: { zoom: 2.6, note: 'Every version, one rail' },
  };
  export const skip: Record<string, string> = {};
</script>

<script lang="ts">
  /** Local only (not in git): one square per molecule, Legend … VersionRail. */
  import Studio from './Studio.svelte';
  import PreviewMolecules from '../explore/PreviewMolecules.svelte';
  import Layer from '../../patterns/layout/Layer.svelte';
  import Stack from '../../patterns/layout/Stack.svelte';
  import Row from '../../patterns/layout/Row.svelte';
  import Button from '../../patterns/atoms/Button.svelte';
  import Icon from '../../patterns/atoms/Icon.svelte';
  import IconButton from '../../patterns/atoms/IconButton.svelte';
  import Switch from '../../patterns/atoms/Switch.svelte';
  import Text from '../../patterns/atoms/Text.svelte';
  import Legend from '../../patterns/molecules/Legend.svelte';
  import LogoCloud from '../../patterns/molecules/LogoCloud.svelte';
  import Markdown from '../../patterns/molecules/Markdown.svelte';
  import MultiSelect from '../../patterns/molecules/MultiSelect.svelte';
  import NewsletterSignup from '../../patterns/molecules/NewsletterSignup.svelte';
  import Pager from '../../patterns/molecules/Pager.svelte';
  import Picker from '../../patterns/molecules/Picker.svelte';
  import Popover from '../../patterns/molecules/Popover.svelte';
  import PricingCard from '../../patterns/molecules/PricingCard.svelte';
  import ProductCard from '../../patterns/molecules/ProductCard.svelte';
  import QuantityStepper from '../../patterns/molecules/QuantityStepper.svelte';
  import RadioGroup from '../../patterns/molecules/RadioGroup.svelte';
  import RatingDisplay from '../../patterns/molecules/RatingDisplay.svelte';
  import Reactions from '../../patterns/molecules/Reactions.svelte';
  import RefreshButton from '../../patterns/molecules/RefreshButton.svelte';
  import SearchField from '../../patterns/molecules/SearchField.svelte';
  import SegmentedControl from '../../patterns/molecules/SegmentedControl.svelte';
  import SignInCard from '../../patterns/molecules/SignInCard.svelte';
  import StarInput from '../../patterns/molecules/StarInput.svelte';
  import Stat from '../../patterns/molecules/Stat.svelte';
  import Stepper from '../../patterns/molecules/Stepper.svelte';
  import StructTree from '../../patterns/molecules/StructTree.svelte';
  import Tabs from '../../patterns/molecules/Tabs.svelte';
  import TagInput from '../../patterns/molecules/TagInput.svelte';
  import TagList from '../../patterns/molecules/TagList.svelte';
  import TaskList from '../../patterns/molecules/TaskList.svelte';
  import Testimonial from '../../patterns/molecules/Testimonial.svelte';
  import ThumbsInput from '../../patterns/molecules/ThumbsInput.svelte';
  import TitlePill from '../../patterns/molecules/TitlePill.svelte';
  import Toast from '../../patterns/molecules/Toast.svelte';
  import ToggleChip from '../../patterns/molecules/ToggleChip.svelte';
  import ToolGroup from '../../patterns/molecules/ToolGroup.svelte';
  import UserMenu from '../../patterns/molecules/UserMenu.svelte';
  import VariantPicker from '../../patterns/molecules/VariantPicker.svelte';
  import VersionRail from '../../patterns/molecules/VersionRail.svelte';

  const noop = () => {};
  const notes = [
    '### Release notes',
    'The calendar now **remembers your view**, and a dropped file lands where you let go.',
    '- Faster search across all notes\n- Keyboard: `⌘K` opens anything\n- Calmer colours in dark mode',
  ].join('\n\n');

  let multi = $state(['4', '5', 'verified']);
  let pick = $state<string | null>('weekly');
  let qty = $state(2);
  let delivery = $state('express');
  let search = $state('linen');
  let view = $state('board');
  let range = $state('week');
  let stars = $state(4);
  let tab = $state('activity');
  let pillTab = $state('all');
  let tags = $state(['design', 'review', 'spring']);
  let thumbs = $state<'up' | 'down' | null>('up');
  let colour = $state('sage');
  let size = $state('m');
  let version = $state('v5');
  let compact = $state(true);
  let showDone = $state(false);
  let board = $state('board');

  /** Opens an overlay once it is mounted, so it is captured open (it grows from its trigger). */
  function openFirst(node: HTMLElement, selector = 'button') {
    const t = setTimeout(() => node.querySelector<HTMLElement>(selector)?.click(), 500);
    return { destroy: () => clearTimeout(t) };
  }

  /*
   * Overlays live in the top layer, which the square's scale does not reach. The trigger is
   * scaled with the scene (and the panel is placed against its scaled box); the open panel is
   * then scaled by the same factor about its transform-origin, which the anchor puts on the
   * edge facing the trigger, so it still grows out of it.
   */
  const popZoom: Record<string, number> = {
    MultiSelect: 1.75,
    Picker: 1.7,
    Popover: 1.8,
    UserMenu: 2,
  };
  $effect(() => {
    const mk = new URLSearchParams(window.location.search).get('mk') ?? '';
    const z = popZoom[mk];
    if (!z) return;
    const html = document.documentElement;
    html.style.setProperty('--mk-pop', String(z));
    html.classList.add('mk-pop');
    return () => html.classList.remove('mk-pop');
  });

  const shows = {
    Legend: legend,
    LogoCloud: logoCloud,
    Markdown: markdown,
    MultiSelect: multiSelect,
    NewsletterSignup: newsletter,
    Pager: pager,
    Picker: picker,
    Popover: popover,
    PricingCard: pricingCard,
    ProductCard: productCard,
    QuantityStepper: quantityStepper,
    RadioGroup: radioGroup,
    RatingDisplay: ratingDisplay,
    Reactions: reactions,
    RefreshButton: refreshButton,
    SearchField: searchField,
    SegmentedControl: segmented,
    SignInCard: signIn,
    StarInput: starInput,
    Stat: stat,
    Stepper: stepper,
    StructTree: structTree,
    Tabs: tabsS,
    TagInput: tagInput,
    TagList: tagList,
    TaskList: taskList,
    Testimonial: testimonial,
    ThumbsInput: thumbsInput,
    TitlePill: titlePill,
    Toast: toast,
    ToggleChip: toggleChip,
    ToolGroup: toolGroup,
    UserMenu: userMenu,
    VariantPicker: variantPicker,
    VersionRail: versionRail,
  };

  const channels = [
    { label: 'Web', color: 'var(--series-1)', share: 42 },
    { label: 'Mail', color: 'var(--series-2)', share: 27 },
    { label: 'App', color: 'var(--series-3)', share: 19 },
    { label: 'Shop', color: 'var(--series-4)', share: 12 },
  ];
</script>

{#snippet legend()}
  <Layer level="panel" padding="lg" gap="md" class="mk2-w22">
    <Text size="sm" tone="muted" text="Visits by channel" />
    <div class="mk2-bar">
      {#each channels as c (c.label)}
        <span style:flex={c.share} style:background={c.color}></span>
      {/each}
    </div>
    <Legend items={channels} />
  </Layer>
{/snippet}

{#snippet logoCloud()}
  <div class="mk2-w36">
    <LogoCloud
      title="Trusted by calm teams at"
      height="2rem"
      logos={[
        { name: 'Example Corp' },
        { name: 'Example Labs' },
        { name: 'Example Health' },
        { name: 'Example Freight' },
        { name: 'Example Bank' },
        { name: 'Example Media' },
      ]}
    />
  </div>
{/snippet}

{#snippet markdown()}
  <Layer level="panel" padding="lg" class="mk2-w26">
    <Markdown source={notes} />
  </Layer>
{/snippet}

{#snippet multiSelect()}
  <div class="mk2-overlay" style:--room="13rem" use:openFirst>
    <MultiSelect
      label="Rating"
      value={multi}
      onchange={(v) => (multi = v)}
      groups={[
        {
          label: 'Stars',
          options: [
            { value: '5', label: 'Five stars', stars: 5 },
            { value: '4', label: 'Four stars', stars: 4 },
            { value: '3', label: 'Three stars', stars: 3 },
          ],
        },
        {
          label: 'Reviews',
          options: [
            { value: 'verified', label: 'Verified buyers' },
            { value: 'photos', label: 'With photos' },
          ],
        },
      ]}
    />
  </div>
{/snippet}

{#snippet newsletter()}
  <Layer level="panel" padding="xl" class="mk2-w26">
    <NewsletterSignup
      title="Letters, once a month"
      text="What we made, what we learned. Never more than one a month."
      layout="stacked"
      align="center"
      onsubscribe={noop}
    />
  </Layer>
{/snippet}

{#snippet pager()}
  <Layer level="panel" padding="md" gap="sm" class="mk2-w28">
    {#each ['Linen shirt', 'Merino crew', 'Canvas tote'] as item, i (item)}
      <div class="mk2-line">
        <span>{item}</span><span class="mk2-muted">#{1026 + i}</span>
      </div>
    {/each}
    <Pager offset={25} limit={25} total={1234} onpage={noop} />
  </Layer>
{/snippet}

{#snippet picker()}
  <div class="mk2-overlay" style:--room="12rem" use:openFirst>
    <Picker
      label="Report"
      heading="Send a report"
      value={pick}
      onchange={(v) => (pick = v)}
      options={[
        { value: 'daily', title: 'Every morning', meta: '7:00, weekdays' },
        { value: 'weekly', title: 'Every Monday', meta: 'A summary of the week' },
        {
          value: 'monthly',
          title: 'First of the month',
          meta: 'Totals and trends',
          marks: [{ label: 'New' }],
        },
        { value: 'never', title: 'Only when asked', marks: [{ label: 'Draft', tone: 'draft' }] },
      ]}
    />
  </div>
{/snippet}

{#snippet popover()}
  <div class="mk2-overlay" style:--room="8rem" use:openFirst>
    <Popover label="View options" icon="filter" title="View options" width="15rem">
      <Stack gap="md">
        <SegmentedControl
          label="Layout"
          bind:value={board}
          options={[
            { value: 'board', label: 'Board' },
            { value: 'list', label: 'List' },
          ]}
        />
        <Switch label="Compact cards" bind:checked={compact} />
        <Switch label="Show done" bind:checked={showDone} />
      </Stack>
    </Popover>
  </div>
{/snippet}

{#snippet pricingCard()}
  <div class="mk2-pair">
    <PricingCard
      name="Solo"
      price={0}
      period="month"
      currency="EUR"
      description="For one person and a few projects."
      features={['3 projects', 'All the basics', { label: 'Shared spaces', included: false }]}
      ctaLabel="Start free"
      onselect={noop}
    />
    <PricingCard
      name="Team"
      price={12}
      period="month"
      currency="EUR"
      highlighted
      badge="Most chosen"
      description="For teams that work side by side."
      features={['Unlimited projects', 'Shared spaces', 'Priority help']}
      ctaLabel="Choose Team"
      onselect={noop}
    />
  </div>
{/snippet}

{#snippet productArt(icon: 'leaf' | 'gift' | 'heart' | 'star', tone: string)}
  <div class="mk2-art" style:--art={tone}>
    <span class="mk2-art-in"><span class="mk2-disc"><Icon name={icon} size={56} /></span></span>
  </div>
{/snippet}

{#snippet productCard()}
  <div class="mk2-pair">
    <ProductCard
      title="Olive tree"
      subtitle="In a stoneware pot"
      price={24}
      currency="EUR"
      rating={4.7}
      reviews={128}
      colors={['var(--series-1)', 'var(--series-2)', 'var(--series-3)']}
      onadd={noop}
      onwishlist={noop}
      wishlisted
    >
      {#snippet media()}{@render productArt('leaf', 'var(--accent)')}{/snippet}
    </ProductCard>
    <ProductCard
      title="Gift box"
      subtitle="Wrapped by hand"
      price={39}
      compareAt={49}
      currency="EUR"
      badge="Sale"
      rating={4.9}
      reviews={64}
      onadd={noop}
      onwishlist={noop}
    >
      {#snippet media()}{@render productArt('gift', 'var(--series-3)')}{/snippet}
    </ProductCard>
  </div>
{/snippet}

{#snippet quantityStepper()}
  <Stack gap="lg" align="center">
    <QuantityStepper bind:value={qty} label="Quantity" size="lg" min={1} max={9} />
    <QuantityStepper value={1} label="Quantity" size="md" min={1} max={9} />
  </Stack>
{/snippet}

{#snippet radioGroup()}
  <Layer level="panel" padding="lg" class="mk2-w22">
    <RadioGroup
      label="Delivery"
      bind:value={delivery}
      options={[
        { value: 'standard', label: 'Standard', description: 'Three to five days, free' },
        { value: 'express', label: 'Express', description: 'Tomorrow, before noon' },
        { value: 'pickup', label: 'Pick up', description: 'From the shop, today' },
      ]}
    />
  </Layer>
{/snippet}

{#snippet ratingDisplay()}
  <Stack gap="lg" align="center">
    <RatingDisplay type="stars" value={4.5} />
    <Row gap="lg">
      <RatingDisplay type="thumbs" value="up" />
      <RatingDisplay type="thumbs" value="down" />
    </Row>
  </Stack>
{/snippet}

{#snippet reactions()}
  <Stack gap="sm" align="start">
    <Layer level="panel" padding="md" class="mk2-bubble">
      <Text text="The new onboarding is live. Thank you all!" />
    </Layer>
    <Reactions
      reactions={[
        { emoji: '🎉', count: 8, mine: true, people: ['Ada', 'Ben'] },
        { emoji: '💛', count: 5 },
        { emoji: '👏', count: 3 },
      ]}
      ontoggle={noop}
    />
  </Stack>
{/snippet}

{#snippet refreshButton()}
  <Stack gap="lg" align="center">
    <RefreshButton size="lg" />
    <RefreshButton size="lg" live />
  </Stack>
{/snippet}

{#snippet searchField()}
  <Layer level="panel" padding="md" gap="sm" class="mk2-w26">
    <SearchField label="Search the shop" size="lg" shape="pill" bind:value={search} />
    {#each [['Linen', ' shirt', 'Shirts'], ['Linen', ' trousers', 'Trousers'], ['Washed linen', ' bedding', 'Home']] as [hit, rest, where] (rest)}
      <div class="mk2-line mk2-hit">
        <span><b>{hit}</b>{rest}</span><span class="mk2-muted">{where}</span>
      </div>
    {/each}
  </Layer>
{/snippet}

{#snippet segmented()}
  <Stack gap="xl" align="center">
    <SegmentedControl
      label="View"
      bind:value={view}
      options={[
        { value: 'list', label: 'List', icon: 'list' },
        { value: 'board', label: 'Board', icon: 'layout' },
        { value: 'calendar', label: 'Calendar', icon: 'calendar' },
      ]}
    />
    <SegmentedControl
      label="Range"
      variant="accent"
      bind:value={range}
      options={[
        { value: 'day', label: 'Day' },
        { value: 'week', label: 'Week' },
        { value: 'month', label: 'Month' },
      ]}
    />
  </Stack>
{/snippet}

{#snippet signIn()}
  <div class="mk2-w22">
    <SignInCard
      title="Welcome back"
      text="Sign in with your work account to pick up where you left off."
      buttonLabel="Sign in"
      align="center"
      onsignin={noop}
    />
  </div>
{/snippet}

{#snippet starInput()}
  <StarInput label="Your rating" bind:value={stars} />
{/snippet}

{#snippet stat()}
  <div class="mk2-pair">
    <Layer level="panel" padding="lg">
      <Stat
        label="Visitors"
        value="12.4k"
        delta={8}
        deltaText="+8 %"
        trend={[4, 6, 5, 8, 7, 9, 11]}
        icon="users"
      />
    </Layer>
    <Layer level="panel" padding="lg">
      <Stat
        label="Response time"
        value="182"
        unit="ms"
        delta={-12}
        deltaText="−12 %"
        goodWhen="down"
        trend={[9, 8, 8, 7, 6, 6, 5]}
        icon="clock"
      />
    </Layer>
  </div>
{/snippet}

{#snippet stepper()}
  <Layer level="panel" padding="lg" class="mk2-w22">
    <Stepper
      orientation="vertical"
      current={2}
      steps={[
        { label: 'Upload', description: 'orders.csv, 1,284 rows' },
        { label: 'Match columns', description: 'Nine of nine found' },
        { label: 'Review', description: 'Three rows need a look' },
        { label: 'Import' },
      ]}
    />
  </Layer>
{/snippet}

{#snippet structTree()}
  <Layer level="panel" padding="lg" class="mk2-w24">
    <StructTree
      label="Order"
      expandDepth={2}
      value={{
        id: 'ord_1026',
        status: 'packed',
        total: 63.5,
        customer: { name: 'Ada Example', email: 'ada@example.com' },
        shipping: { method: 'express', eta: 'tomorrow' },
        gift: true,
      }}
    />
  </Layer>
{/snippet}

{#snippet tabsS()}
  <Stack gap="xl" class="mk2-w28">
    <Tabs
      label="Project"
      bind:value={tab}
      tabs={[
        { value: 'overview', label: 'Overview' },
        { value: 'activity', label: 'Activity', count: 4 },
        { value: 'files', label: 'Files' },
        { value: 'settings', label: 'Settings' },
      ]}
    />
    <Tabs
      label="Filter"
      variant="pill"
      bind:value={pillTab}
      tabs={[
        { value: 'all', label: 'All' },
        { value: 'open', label: 'Open', count: 12 },
        { value: 'done', label: 'Done' },
      ]}
    />
  </Stack>
{/snippet}

{#snippet tagInput()}
  <Layer level="panel" padding="lg" gap="sm" class="mk2-w26">
    <Text weight="semibold" text="Labels" />
    <TagInput label="Labels" bind:value={tags} placeholder="Add a label" />
    <Text size="sm" tone="muted" text="Press Enter or a comma to add one." />
  </Layer>
{/snippet}

{#snippet tagList()}
  <div class="mk2-w22">
    <TagList
      labels={['design', 'review', 'spring', 'web', 'urgent', 'q3', 'copy']}
      max={4}
      active={(l) => l === 'review'}
      onclick={noop}
    />
  </div>
{/snippet}

{#snippet taskList()}
  <Layer level="panel" padding="lg" class="mk2-w24">
    <TaskList
      title="Before launch"
      progress
      items={[
        { id: '1', label: 'Write the welcome mail', done: true },
        { id: '2', label: 'Check the pricing page', done: true },
        { id: '3', label: 'Record the short demo', done: false },
        { id: '4', label: 'Invite the first ten', done: false },
        { id: '5', label: 'Say thank you', done: false },
      ]}
    />
  </Layer>
{/snippet}

{#snippet testimonial()}
  <div class="mk2-w28">
    <Testimonial
      size="lg"
      rating={5}
      quote="It just gets out of the way. Our team stopped asking where things are."
      name="Ada Example"
      role="Head of operations"
    />
  </div>
{/snippet}

{#snippet thumbsInput()}
  <Stack gap="md" align="center" class="mk2-w18">
    <Text weight="semibold" text="Was this answer helpful?" />
    <div class="mk2-fill"><ThumbsInput label="Was this helpful?" bind:value={thumbs} /></div>
  </Stack>
{/snippet}

{#snippet titlePill()}
  <TitlePill title="Main hall" subtitle="21.2 °C · lights on" />
{/snippet}

{#snippet toast()}
  <Stack gap="sm" class="mk2-w22">
    <Toast tone="ok" title="Saved" message="Your changes are live." ondismiss={noop} />
    <Toast tone="info" message="Three files moved to the archive." ondismiss={noop}>
      {#snippet actions()}<Button size="sm" variant="ghost" label="Undo" />{/snippet}
    </Toast>
    <Toast tone="warn" message="Reloaded: two rows changed meanwhile." ondismiss={noop} />
  </Stack>
{/snippet}

{#snippet toggleChip()}
  <Row gap="sm" wrap justify="center" class="mk2-w22">
    <ToggleChip pressed label="Revenue" color="var(--series-1)" count="38k" />
    <ToggleChip pressed label="Orders" color="var(--series-2)" count={1284} />
    <ToggleChip label="Returns" color="var(--series-3)" count={27} />
    <ToggleChip label="Visits" color="var(--series-4)" />
  </Row>
{/snippet}

{#snippet toolGroup()}
  <Row gap="md">
    <ToolGroup label="Text">
      <IconButton icon="bold" label="Bold" pressed />
      <IconButton icon="italic" label="Italic" />
      <IconButton icon="underline" label="Underline" />
    </ToolGroup>
    <ToolGroup label="Align">
      <IconButton icon="align-left" label="Left" pressed />
      <IconButton icon="align-center" label="Centre" />
      <IconButton icon="align-right" label="Right" />
    </ToolGroup>
    <ToolGroup label="Insert">
      <IconButton icon="link" label="Link" />
      <IconButton icon="quote" label="Quote" />
      <IconButton icon="list" label="List" />
    </ToolGroup>
  </Row>
{/snippet}

{#snippet userMenu()}
  <div class="mk2-overlay" style:--room="6rem" use:openFirst>
    <UserMenu email="ada@example.com" name="Ada Example" onsignout={noop} />
  </div>
{/snippet}

{#snippet variantPicker()}
  <Stack gap="lg" class="mk2-w18">
    <VariantPicker
      label="Colour"
      showValue
      bind:value={colour}
      options={[
        { value: 'sage', label: 'Sage', color: '#8fa98a' },
        { value: 'sky', label: 'Sky', color: '#8ab4d8' },
        { value: 'apricot', label: 'Apricot', color: '#f0b48c' },
        { value: 'plum', label: 'Plum', color: '#8e5b8f', disabled: true },
      ]}
    />
    <VariantPicker
      label="Size"
      kind="pill"
      showValue
      bind:value={size}
      options={[
        { value: 's', label: 'S' },
        { value: 'm', label: 'M' },
        { value: 'l', label: 'L' },
        { value: 'xl', label: 'XL', disabled: true },
      ]}
    />
  </Stack>
{/snippet}

{#snippet versionRail()}
  <VersionRail
    bind:value={version}
    items={[
      { value: 'v1', label: 'v1' },
      { value: 'v2', label: 'v2' },
      { value: 'v3', label: 'v3', marked: true },
      { value: 'v4', label: 'v4' },
      { value: 'v5', label: 'v5' },
      { value: 'v6', label: 'v6' },
    ]}
  />
{/snippet}

{#snippet glyph()}<span></span>{/snippet}
{#snippet preview(name: string)}<PreviewMolecules {name} fallback={glyph} />{/snippet}

<Studio levels={['Molecules']} {names} {shows} {meta} {skip} {preview} />

<style>
  :global(html.mk-pop [popover]:popover-open) {
    scale: var(--mk-pop);
  }
  /* Chrome tiles a scaled panel's big soft shadow into visible squares: no entrance
     animation, and a smaller shadow. */
  :global(html.mk-pop [popover]) {
    animation: none !important;
    /* The same soft shadow at half size: the scale doubles it back. */
    box-shadow:
      0 12px 30px color-mix(in srgb, var(--text) 18%, transparent),
      0 3px 7px color-mix(in srgb, var(--text) 9%, transparent) !important;
  }
  /* Opened by a script, the panel shows a keyboard focus ring on its first item; a picture
     of it opened by a press would not. */
  :global(html.mk-pop [popover] :focus-visible) {
    outline: none !important;
  }
  /* The panel measures the (scaled) trigger; take that scale back out of its width. */
  :global(html.mk-pop [popover]) {
    --anchor-width: 12rem !important;
  }
  /* Over a photo the note under the name reads in full text colour. */
  :global(.square--photo .note) {
    color: var(--text);
  }
  .mk2-overlay {
    display: grid;
    place-items: center;
    /* The trigger sits high, so the panel has room to grow below it. */
    margin-bottom: var(--room);
  }
  :global(.mk2-w18) {
    width: 18rem;
  }
  :global(.mk2-w22) {
    width: 22rem;
  }
  :global(.mk2-w24) {
    width: 24rem;
  }
  :global(.mk2-w26) {
    width: 26rem;
  }
  :global(.mk2-w28) {
    width: 28rem;
  }
  .mk2-w36 {
    width: 36rem;
  }
  /* ThumbsInput's tiles share the width they are given (they have no side padding). */
  .mk2-fill {
    width: 100%;
  }
  .mk2-pair {
    display: grid;
    grid-template-columns: repeat(2, 16rem);
    gap: var(--space-5);
    align-items: start;
  }
  .mk2-bar {
    display: flex;
    gap: 3px;
    height: 1.25rem;
    border-radius: var(--radius-pill);
    overflow: clip;
  }
  .mk2-line {
    display: flex;
    justify-content: space-between;
    padding: var(--space-2) var(--space-1);
    border-bottom: 1px solid var(--border);
    font-size: var(--fs-sm);
  }
  .mk2-hit {
    padding-inline: var(--space-3);
    border-bottom: 0;
  }
  .mk2-hit b {
    font-weight: var(--fw-semibold);
    color: var(--accent-ink);
  }
  .mk2-muted {
    color: var(--text-3);
    font-variant-numeric: tabular-nums;
  }
  .mk2-art {
    position: relative;
    background: radial-gradient(
      circle at 50% 45%,
      color-mix(in srgb, var(--art) 22%, transparent),
      transparent 65%
    );
  }
  .mk2-art-in {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
  }
  .mk2-disc {
    display: grid;
    place-items: center;
    width: 7.5rem;
    height: 7.5rem;
    border-radius: 50%;
    color: color-mix(in srgb, var(--art) 85%, var(--text));
    background: color-mix(in srgb, var(--art) 18%, var(--layer-panel-bg));
    box-shadow: var(--panel-shadow);
  }
  :global(.mk2-bubble) {
    max-width: 20rem;
  }
</style>
