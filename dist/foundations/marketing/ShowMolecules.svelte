<script module lang="ts">
  import type { Meta } from './looks';
  import photo from '../../demo/assets/smart-home-backdrop.jpg';

  /** The first half of the molecules (Alert … KpiTile); ShowMolecules2 has the rest. */
  export const names = [
    'Alert',
    'ArcGauge',
    'Autocomplete',
    'AvatarStack',
    'Banner',
    'Breadcrumbs',
    'Calendar',
    'Carousel',
    'CartLine',
    'ChartTooltip',
    'CheckboxGroup',
    'CheckoutSteps',
    'ChoiceCard',
    'CodeBlock',
    'CodeInput',
    'Comment',
    'Composer',
    'ConfirmButton',
    'CopyButton',
    'DatePicker',
    'DetailHeader',
    'DetailList',
    'DetailSection',
    'Disclosure',
    'DropdownMenu',
    'EmptyState',
    'FeatureCard',
    'Field',
    'FileDropzone',
    'FilterBar',
    'GlassPill',
    'IdentityCell',
    'JobStatus',
    'KpiTile',
  ] as const;

  export const meta: Record<string, Meta> = {
    Alert: { zoom: 1.6, note: 'Feedback where it happened' },
    ArcGauge: {
      zoom: 1.5,
      note: 'The glow is the room, the ticks the setting',
      theme: 'dark',
      tint: '#ff9500',
    },
    Autocomplete: { zoom: 1.6, note: 'Suggestions as you type' },
    AvatarStack: { zoom: 2.2, note: 'Who is here right now' },
    Banner: { zoom: 1.55, note: 'News for the whole page' },
    Breadcrumbs: { zoom: 2.2, note: 'The way back, one step at a time' },
    Calendar: { zoom: 1.12, note: 'A month at a glance' },
    Carousel: { zoom: 1.45, note: 'Swipe, arrows or dots' },
    CartLine: { zoom: 1.6, note: 'One line of the basket' },
    ChartTooltip: { zoom: 1.5, note: 'The figures under the pointer' },
    CheckboxGroup: { zoom: 1.9, note: 'Several of many' },
    CheckoutSteps: { zoom: 1.35, note: 'Where you are in the checkout' },
    ChoiceCard: { zoom: 1.45, note: 'One choice, said in full' },
    CodeBlock: { zoom: 1.9, note: 'Code you can copy', theme: 'dark' },
    CodeInput: { zoom: 2.1, note: 'One box per character' },
    Comment: { zoom: 1.6, note: 'A thought, with its reactions' },
    Composer: { zoom: 1.6, note: 'Write, then send' },
    ConfirmButton: { zoom: 2.1, note: 'Asks once, right where you pressed' },
    CopyButton: { zoom: 2, note: 'Copy in one press' },
    DatePicker: { zoom: 1.5, note: 'The calendar grows from the field' },
    DetailHeader: { zoom: 1.6, note: 'Who or what you are looking at' },
    DetailList: { zoom: 1.7, note: 'Labels and their values' },
    DetailSection: { zoom: 1.6, note: 'A titled part of a detail page' },
    Disclosure: { zoom: 1.7, note: 'More, only when asked' },
    DropdownMenu: { zoom: 1.6, note: 'Actions behind one button' },
    EmptyState: { zoom: 1.9, note: 'Nothing here yet, and what to do' },
    FeatureCard: { zoom: 1.3, note: 'What it does, in a line' },
    Field: { zoom: 1.65, note: 'Label, hint and error in one place' },
    FileDropzone: { zoom: 1.7, note: 'Drop it, watch it go up' },
    FilterBar: { zoom: 1.45, note: 'Narrow the list in place' },
    GlassPill: { zoom: 2.5, note: 'Glass, because it floats', photo, theme: 'light' },
    IdentityCell: { zoom: 1.9, note: 'A face, a name, a line' },
    JobStatus: { zoom: 1.75, note: 'How a background job is doing' },
    KpiTile: { zoom: 1.45, note: 'Figures with their meaning' },
  };
  export const skip: Record<string, string> = {};
</script>

<script lang="ts">
  /** Local only (not in git): one square per molecule, Alert … KpiTile. */
  import Studio from './Studio.svelte';
  import PreviewMolecules from '../explore/PreviewMolecules.svelte';
  import Button from '../../patterns/atoms/Button.svelte';
  import Icon from '../../patterns/atoms/Icon.svelte';
  import IconButton from '../../patterns/atoms/IconButton.svelte';
  import Input from '../../patterns/atoms/Input.svelte';
  import Badge from '../../patterns/atoms/Badge.svelte';
  import Text from '../../patterns/atoms/Text.svelte';
  import Textarea from '../../patterns/atoms/Textarea.svelte';
  import Divider from '../../patterns/atoms/Divider.svelte';
  import Heading from '../../patterns/atoms/Heading.svelte';
  import Layer from '../../patterns/layout/Layer.svelte';
  import Stack from '../../patterns/layout/Stack.svelte';
  import Grid from '../../patterns/layout/Grid.svelte';
  import Alert from '../../patterns/molecules/Alert.svelte';
  import ArcGauge from '../../patterns/molecules/ArcGauge.svelte';
  import Autocomplete from '../../patterns/molecules/Autocomplete.svelte';
  import AvatarStack from '../../patterns/molecules/AvatarStack.svelte';
  import Banner from '../../patterns/molecules/Banner.svelte';
  import Breadcrumbs from '../../patterns/molecules/Breadcrumbs.svelte';
  import Calendar from '../../patterns/molecules/Calendar.svelte';
  import Carousel from '../../patterns/molecules/Carousel.svelte';
  import CartLine from '../../patterns/molecules/CartLine.svelte';
  import ChartTooltip from '../../patterns/molecules/ChartTooltip.svelte';
  import CheckboxGroup from '../../patterns/molecules/CheckboxGroup.svelte';
  import CheckoutSteps from '../../patterns/molecules/CheckoutSteps.svelte';
  import ChoiceCard from '../../patterns/molecules/ChoiceCard.svelte';
  import CodeBlock from '../../patterns/molecules/CodeBlock.svelte';
  import CodeInput from '../../patterns/molecules/CodeInput.svelte';
  import Comment from '../../patterns/molecules/Comment.svelte';
  import Composer from '../../patterns/molecules/Composer.svelte';
  import ConfirmButton from '../../patterns/molecules/ConfirmButton.svelte';
  import CopyButton from '../../patterns/molecules/CopyButton.svelte';
  import DatePicker from '../../patterns/molecules/DatePicker.svelte';
  import DetailHeader from '../../patterns/molecules/DetailHeader.svelte';
  import DetailList from '../../patterns/molecules/DetailList.svelte';
  import DetailSection from '../../patterns/molecules/DetailSection.svelte';
  import Disclosure from '../../patterns/molecules/Disclosure.svelte';
  import DropdownMenu from '../../patterns/molecules/DropdownMenu.svelte';
  import EmptyState from '../../patterns/molecules/EmptyState.svelte';
  import FeatureCard from '../../patterns/molecules/FeatureCard.svelte';
  import Field from '../../patterns/molecules/Field.svelte';
  import FileDropzone from '../../patterns/molecules/FileDropzone.svelte';
  import FilterBar from '../../patterns/molecules/FilterBar.svelte';
  import GlassPill from '../../patterns/molecules/GlassPill.svelte';
  import IdentityCell from '../../patterns/molecules/IdentityCell.svelte';
  import JobStatus from '../../patterns/molecules/JobStatus.svelte';
  import KpiTile from '../../patterns/molecules/KpiTile.svelte';
  import SearchField from '../../patterns/molecules/SearchField.svelte';
  import SegmentedControl from '../../patterns/molecules/SegmentedControl.svelte';
  import LineChart from '../../patterns/organisms/LineChart.svelte';

  const noop = () => {};
  // Fixed days keep every render the same.
  const day = new Date(2026, 4, 14, 10, 0);
  const ago = (minutes: number) => new Date(day.getTime() - minutes * 60_000);
  const on = (d: number, h = 9) => new Date(2026, 4, d, h, 0);

  /** Runs once the square has settled: opens a menu, arms a button, focuses a field. */
  function after(node: HTMLElement, run: (node: HTMLElement) => void) {
    const timer = setTimeout(() => run(node), 500);
    return { destroy: () => clearTimeout(timer) };
  }
  const press = (selector: string) => (node: HTMLElement) =>
    node.querySelector<HTMLElement>(selector)?.click();

  let gaugeA = $state(22);

  let query = $state('lin');
  let suggestions = $state<{ label: string; meta?: string }[]>([]);
  function openSuggestions(node: HTMLElement) {
    node.querySelector('input')?.focus();
    suggestions = [
      { label: 'Linen shirt', meta: 'Shirts' },
      { label: 'Linen trousers', meta: 'Trousers' },
      { label: 'Linen bed set', meta: 'Home' },
      { label: 'Linen tea towel', meta: 'Kitchen' },
    ];
  }

  const week = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const visits = [42, 51, 47, 63, 58, 71, 66].map((value, i) => ({ label: week[i]!, value }));

  let tooltipAt = $state<{ x: number; y: number } | null>(null);
  function placeTooltip(node: HTMLElement) {
    // Next to Thursday's point: the chart is drawn at the square's scale, the tooltip too.
    const dot = node.getBoundingClientRect();
    tooltipAt = { x: (dot.left + dot.width * 0.56) / 1.5, y: (dot.top + dot.height * 0.18) / 1.5 };
  }

  let channels = $state(['web', 'mail', 'app']);
  let plan = $state('team');
  let range = $state('30');
  let otp = $state('418');
  let note = $state('Moved the launch to Thursday, so the copy has one more day.');

  const upload = (() => {
    try {
      return new File([new Uint8Array(2_400_000)], 'spring-lookbook.pdf', {
        type: 'application/pdf',
      });
    } catch {
      return null;
    }
  })();

  const shows = {
    Alert: alert,
    ArcGauge: arcGauge,
    Autocomplete: autocomplete,
    AvatarStack: avatarStack,
    Banner: banner,
    Breadcrumbs: breadcrumbs,
    Calendar: calendar,
    Carousel: carousel,
    CartLine: cartLine,
    ChartTooltip: chartTooltip,
    CheckboxGroup: checkboxGroup,
    CheckoutSteps: checkoutSteps,
    ChoiceCard: choiceCard,
    CodeBlock: codeBlock,
    CodeInput: codeInput,
    Comment: comment,
    Composer: composer,
    ConfirmButton: confirmButton,
    CopyButton: copyButton,
    DatePicker: datePicker,
    DetailHeader: detailHeader,
    DetailList: detailList,
    DetailSection: detailSection,
    Disclosure: disclosure,
    DropdownMenu: dropdownMenu,
    EmptyState: emptyState,
    FeatureCard: featureCard,
    Field: field,
    FileDropzone: fileDropzone,
    FilterBar: filterBar,
    GlassPill: glassPill,
    IdentityCell: identityCell,
    JobStatus: jobStatus,
    KpiTile: kpiTile,
  };
</script>

{#snippet alert()}
  <div class="w30">
    <Stack gap="md">
      <Alert variant="card" tone="ok" title="Published" message="Your changes are live." />
      <Alert
        variant="card"
        tone="info"
        title="A new version is ready"
        message="Reload to get the latest features."
      >
        {#snippet actions()}<Button size="sm" variant="soft" label="Reload" />{/snippet}
      </Alert>
      <Alert variant="card" tone="warn" message="Two invoices are due this week." />
    </Stack>
  </div>
{/snippet}

{#snippet arcGauge()}
  <Layer level="panel" padding="lg" class="gauge-card">
    <ArcGauge
      label="Living room"
      current={20.6}
      bind:value={gaugeA}
      min={16}
      max={28}
      step={0.5}
      unit="°C"
      size="lg"
    />
  </Layer>
{/snippet}

{#snippet autocomplete()}
  <div class="w26 top pop" style:--pop="1.6" use:after={openSuggestions}>
    <Autocomplete
      label="Search the shop"
      placeholder="Search the shop"
      bind:value={query}
      {suggestions}
      onsearch={noop}
    />
  </div>
{/snippet}

{#snippet avatarStack()}
  <Stack gap="lg" align="center">
    <AvatarStack
      presence
      size={44}
      max={5}
      people={[
        { name: 'Ada Example', presence: 'online' },
        { name: 'Ben Sample', presence: 'online' },
        { name: 'Cleo Test', presence: 'away' },
        { name: 'Dan Demo' },
        { name: 'Eve Mock' },
        { name: 'Finn Trial' },
        { name: 'Gia Proof' },
      ]}
    />
    <Text size="sm" tone="muted" text="Seven people on this board" />
  </Stack>
{/snippet}

{#snippet banner()}
  <div class="w32">
    <Stack gap="md">
      <Banner tone="info" title="Maintenance" message="Sunday, 2–4 am. Saving may pause briefly.">
        {#snippet actions()}<Button size="sm" variant="soft" label="Details" />{/snippet}
      </Banner>
      <Banner tone="ok" message="The new reports are ready to try." dismissible />
      <Banner tone="warn" variant="solid" message="Your trial ends in three days." />
    </Stack>
  </div>
{/snippet}

{#snippet breadcrumbs()}
  <Stack gap="sm">
    <Breadcrumbs
      items={[
        { label: 'Projects', href: '#mk' },
        { label: 'Garden house', href: '#mk' },
        { label: 'Drawings', href: '#mk' },
        { label: 'Ground floor' },
      ]}
    />
    <Heading level={2} text="Ground floor" />
  </Stack>
{/snippet}

{#snippet calendar()}
  <div class="w48">
    <Layer level="panel" padding="md">
      <Calendar
        value={on(14)}
        today={on(14)}
        weekStart={1}
        maxEvents={2}
        events={[
          { id: '1', title: 'Design review', start: on(5, 10), color: 'blue' },
          { id: '2', title: 'Garden day', start: on(9), allDay: true, color: 'green' },
          { id: '3', title: 'Launch', start: on(14, 9), color: 'pink' },
          { id: '4', title: 'Team lunch', start: on(14, 12), color: 'orange' },
          { id: '5', title: 'Trip', start: on(20), end: on(22, 18), allDay: true, color: 'purple' },
          { id: '6', title: 'Retro', start: on(27, 15), color: 'teal' },
        ]}
      />
    </Layer>
  </div>
{/snippet}

{#snippet carousel()}
  <div class="w36">
    <Carousel label="Board templates" perView={2}>
      {#each [{ title: 'Sprint board', text: 'Backlog, doing, review, done.', color: 'blue' }, { title: 'Content calendar', text: 'Posts by week and channel.', color: 'pink' }, { title: 'Bug triage', text: 'New, confirmed, fixing, verified.', color: 'orange' }, { title: 'Hiring', text: 'Applied, interview, offer, hired.', color: 'green' }] as item (item.title)}
        <Layer level="panel" padding="none">
          <div class="slide" style:--c="var(--color-{item.color})">
            <span class="slide__dot"></span>
            <strong class="slide__title">{item.title}</strong>
            <span class="slide__text">{item.text}</span>
          </div>
        </Layer>
      {/each}
    </Carousel>
  </div>
{/snippet}

{#snippet cartLine()}
  <div class="w30">
    <Layer level="panel" padding="lg" gap="md">
      <CartLine
        title="Linen shirt"
        meta="Sage · M"
        price={59}
        quantity={1}
        currency="EUR"
        onquantity={noop}
        onremove={noop}
      />
      <Divider />
      <CartLine
        title="Canvas tote"
        meta="Natural"
        price={24}
        quantity={2}
        currency="EUR"
        onquantity={noop}
        onremove={noop}
      />
      <Divider />
      <CartLine
        title="Merino socks"
        meta="Oat · 39–42"
        price={14}
        quantity={3}
        currency="EUR"
        onquantity={noop}
        onremove={noop}
      />
    </Layer>
  </div>
{/snippet}

{#snippet chartTooltip()}
  <div class="w34 tip-scene">
    <Layer level="panel" padding="lg" gap="sm">
      <Text weight="semibold" text="Visits this week" />
      <div class="chart" use:after={placeTooltip}>
        <LineChart
          data={visits}
          min={30}
          max={80}
          ticks={[40, 60, 80]}
          height={220}
          area
          color="var(--accent)"
          valueLabel="Visits"
        />
      </div>
    </Layer>
    <ChartTooltip
      tooltip={tooltipAt
        ? {
            ...tooltipAt,
            title: 'Thursday',
            rows: [
              { label: 'Visits', value: '63', color: 'var(--accent)' },
              { label: 'New', value: '21', color: 'var(--series-2)' },
              { label: 'Returning', value: '42', color: 'var(--series-3)' },
            ],
          }
        : null}
    />
  </div>
{/snippet}

{#snippet checkboxGroup()}
  <CheckboxGroup
    label="Send updates to"
    columns={2}
    bind:value={channels}
    options={[
      { value: 'web', label: 'Website' },
      { value: 'mail', label: 'Mail' },
      { value: 'app', label: 'Phone app' },
      { value: 'chat', label: 'Team chat' },
      { value: 'sms', label: 'Text message' },
      { value: 'print', label: 'Print' },
    ]}
  />
{/snippet}

{#snippet checkoutSteps()}
  <div class="w42">
    <Layer level="panel" padding="lg" gap="lg">
      <CheckoutSteps current={1} />
      <Divider />
      <Stack gap="md">
        <Heading level={4} text="Where should it go?" />
        <Grid columns={2} min="10rem" gap="md">
          <Field label="Street">
            {#snippet children({ id })}<Input {id} value="Linden Way 12" />{/snippet}
          </Field>
          <Field label="City">
            {#snippet children({ id })}<Input {id} value="Leipzig" />{/snippet}
          </Field>
        </Grid>
      </Stack>
    </Layer>
  </div>
{/snippet}

{#snippet choiceCard()}
  <div class="w26">
    <Stack gap="sm">
      <ChoiceCard
        title="Solo"
        icon="user"
        meta="One seat"
        about="For your own projects."
        onclick={noop}
      />
      <ChoiceCard
        title="Team"
        icon="users"
        meta="Up to 20 seats"
        about="Shared boards and comments."
        selected={plan === 'team'}
        onclick={() => (plan = 'team')}
      />
      <ChoiceCard
        title="Company"
        icon="briefcase"
        meta="Unlimited"
        about="Single sign-on, audit log."
        onclick={noop}
      />
    </Stack>
  </div>
{/snippet}

{#snippet codeBlock()}
  <div class="w26">
    <CodeBlock
      label="Theme"
      code={`<Application tint="#ff9500" theme="dark">
  <Page title="Orders">
    <KpiTile label="Today" value="128" />
  </Page>
</Application>`}
    />
  </div>
{/snippet}

{#snippet codeInput()}
  <Stack gap="md" align="center">
    <CodeInput label="Sign-in code" length={6} groupAfter={3} numeric bind:value={otp} />
    <Text size="sm" tone="muted" text="We sent a code to ada@example.com" />
  </Stack>
{/snippet}

{#snippet comment()}
  <div class="w30">
    <Layer level="panel" padding="lg" gap="lg">
      <Comment
        author="Ada Example"
        role="Design"
        time={ago(42)}
        now={day}
        text="The new header reads so much calmer. Can we try it on the shop too?"
        reactions={[
          { emoji: '👍', count: 4, mine: true },
          { emoji: '✨', count: 2 },
        ]}
        onreply={noop}
        onreact={noop}
      />
      <Comment
        author="Ben Sample"
        time={ago(12)}
        now={day}
        text="On it. I'll share a draft this afternoon."
        onreply={noop}
        onreact={noop}
      />
    </Layer>
  </div>
{/snippet}

{#snippet composer()}
  <div class="w30">
    <Layer level="panel" padding="md">
      <Composer label="Reply" bind:value={note} placeholder="Write a reply…" onsubmit={noop} />
    </Layer>
  </div>
{/snippet}

{#snippet confirmButton()}
  <Stack gap="lg" align="center">
    <ConfirmButton label="Delete draft" icon="trash" onconfirm={noop} />
    <div use:after={press('button')}>
      <ConfirmButton label="Delete draft" icon="trash" disarmAfter={0} onconfirm={noop} />
    </div>
  </Stack>
{/snippet}

{#snippet copyButton()}
  <Layer level="panel" padding="md" direction="horizontal" gap="md" align="center">
    <code class="key">sk-live-4f9a…c21e</code>
    <CopyButton value="sk-live-4f9a2b7c21e" label="Copy key" />
  </Layer>
{/snippet}

{#snippet datePicker()}
  <div class="top pop" style:--pop="1.5" use:after={press('button.field')}>
    <Stack gap="xs">
      <Text size="sm" weight="semibold" text="Arrival" />
      <DatePicker value={on(14)} today={on(14)} weekStart={1} label="Arrival" />
    </Stack>
  </div>
{/snippet}

{#snippet detailHeader()}
  <div class="w34">
    <Layer level="panel" padding="lg">
      <DetailHeader title="Ada Example" titleId="mk-detail" subtitle="Lead designer · Berlin">
        {#snippet badge()}<Badge tone="live" label="Online" />{/snippet}
        {#snippet meta()}<Text
            size="sm"
            tone="muted"
            text="Joined March 2024 · 3 teams"
          />{/snippet}
        {#snippet actions()}
          <Button variant="soft" icon="mail" label="Message" />
          <Button variant="primary" label="Invite" />
        {/snippet}
      </DetailHeader>
    </Layer>
  </div>
{/snippet}

{#snippet detailList()}
  <div class="w28">
    <Layer level="panel" padding="lg">
      <DetailList
        columns={2}
        items={[
          { label: 'Owner', value: 'Ada Example' },
          { label: 'Status', value: 'In review' },
          { label: 'Region', value: 'eu-central' },
          { label: 'Created', value: '14 May 2026' },
          { label: 'Order', value: 'ORD-20418', mono: true },
          { label: 'Plan', value: 'Team, yearly' },
        ]}
      />
    </Layer>
  </div>
{/snippet}

{#snippet detailSection()}
  <div class="w30">
    <Layer level="panel" padding="lg" gap="lg">
      <DetailSection title="Contact">
        {#snippet actions()}<Button size="sm" variant="ghost" icon="edit" label="Edit" />{/snippet}
        <DetailList
          items={[
            { label: 'Email', value: 'ada@example.com' },
            { label: 'Phone', value: '+49 30 1234 5678' },
          ]}
          layout="grid"
        />
      </DetailSection>
      <DetailSection title="Billing">
        <DetailList
          items={[
            { label: 'Plan', value: 'Team, yearly' },
            { label: 'Next invoice', value: '1 June 2026' },
          ]}
          layout="grid"
        />
      </DetailSection>
    </Layer>
  </div>
{/snippet}

{#snippet disclosure()}
  <div class="w28">
    <Stack gap="sm">
      <Disclosure title="Shipping" icon="truck" meta="2–3 days" open>
        <Text
          size="sm"
          tone="muted"
          text="Free from 50 €. Parcels leave the same day before noon."
        />
      </Disclosure>
      <Disclosure title="Returns" icon="refresh" meta="30 days">
        <Text size="sm" text="Hidden until opened." />
      </Disclosure>
      <Disclosure title="Care" icon="droplet">
        <Text size="sm" text="Hidden until opened." />
      </Disclosure>
    </Stack>
  </div>
{/snippet}

{#snippet dropdownMenu()}
  <div class="w26 top pop pop--end" style:--pop="1.6" use:after={press('.file button')}>
    <Layer level="panel" padding="md" direction="horizontal" gap="md" align="center" class="file">
      <span class="file__icon"><Icon name="file-text" size={20} /></span>
      <Stack gap="none" grow>
        <Text weight="semibold" text="Spring lookbook.pdf" />
        <Text size="sm" tone="muted" text="2.4 MB · edited today" />
      </Stack>
      <DropdownMenu
        label="Actions"
        icon="more"
        iconOnly
        align="end"
        variant="ghost"
        minWidth="13rem"
        items={[
          { heading: 'Document' },
          { label: 'Rename', icon: 'edit', shortcut: '⌘R', onselect: noop },
          { label: 'Duplicate', icon: 'copy', shortcut: '⌘D', onselect: noop },
          { label: 'Share', icon: 'share', onselect: noop },
          { separator: true },
          { label: 'Delete', icon: 'trash', danger: true, onselect: noop },
        ]}
      />
    </Layer>
  </div>
{/snippet}

{#snippet emptyState()}
  <div class="w24">
    <EmptyState
      icon="inbox"
      title="Inbox zero"
      message="Nothing waiting for you. New messages land here."
      actionLabel="Write a message"
      actionIcon="edit"
      onaction={noop}
    />
  </div>
{/snippet}

{#snippet featureCard()}
  <div class="w46">
    <Grid columns={3} min="12rem" gap="md">
      <FeatureCard
        title="Fast sync"
        text="Changes land everywhere at once."
        icon="bolt"
        color="orange"
        level="panel"
      />
      <FeatureCard
        title="Private"
        text="Your data stays yours, encrypted."
        icon="lock"
        color="blue"
        level="panel"
      />
      <FeatureCard
        title="Together"
        text="Comment and decide in one place."
        icon="users"
        color="pink"
        level="panel"
      />
    </Grid>
  </div>
{/snippet}

{#snippet field()}
  <div class="w26">
    <Layer level="panel" padding="lg" gap="md">
      <Field label="Name" required>
        {#snippet children({ id })}<Input {id} value="Ada Example" />{/snippet}
      </Field>
      <Field label="Email" error="This address has a typo: example.con">
        {#snippet children({ id, invalid, errorId })}
          <Input {id} value="ada@example.con" {invalid} aria-describedby={errorId} />
        {/snippet}
      </Field>
      <Field label="About you" hint="A sentence or two is plenty.">
        {#snippet children({ id })}<Textarea {id} rows={2} value="" />{/snippet}
      </Field>
    </Layer>
  </div>
{/snippet}

{#snippet fileDropzone()}
  <div class="w26">
    <Stack gap="md">
      <FileDropzone label="Drop a picture here" hint="PNG or JPG, up to 10 MB" accept="image/*" />
      <FileDropzone file={upload} progress={0.64} />
    </Stack>
  </div>
{/snippet}

{#snippet filterBar()}
  <div class="w38">
    <FilterBar>
      <div class="w12"><SearchField label="Search orders" value="ORD-20" /></div>
      <SegmentedControl
        label="Range"
        bind:value={range}
        options={[
          { value: '7', label: '7 days' },
          { value: '30', label: '30 days' },
          { value: '90', label: '90 days' },
        ]}
      />
      {#snippet actions()}<Button variant="ghost" icon="close" label="Clear" />{/snippet}
    </FilterBar>
    <!-- The results lie on the ground under the bar: one panel is enough, never two touching. -->
    <div class="orders">
      {#each [['ORD-20418', 'Ada Example', '€128.00', 'Paid'], ['ORD-20412', 'Ben Sample', '€64.50', 'Paid'], ['ORD-20407', 'Cleo Test', '€212.00', 'Refunded']] as [id, who, sum, state] (id)}
        <div class="order">
          <code>{id}</code>
          <span>{who}</span>
          <span class="sum">{sum}</span>
          <Badge tone={state === 'Paid' ? 'live' : 'draft'} label={state} />
        </div>
      {/each}
    </div>
  </div>
{/snippet}

{#snippet glassPill()}
  <Stack gap="lg" align="center">
    <GlassPill label="Rooms">
      <IconButton icon="home" label="Home" pressed />
      <IconButton icon="sun" label="Light" />
      <IconButton icon="thermometer" label="Climate" />
      <IconButton icon="lock" label="Doors" />
    </GlassPill>
    <GlassPill label="Now">
      <Text size="sm" weight="semibold" text="21.5 °C" />
      <Text size="sm" tone="muted" text="Sunny, light wind" />
    </GlassPill>
  </Stack>
{/snippet}

{#snippet identityCell()}
  <Layer level="panel" padding="lg" gap="md">
    <IdentityCell name="Ada Example" subtitle="ada@example.com" size={40} />
    <IdentityCell name="Ben Sample" subtitle="Product · Lisbon" size={40} />
    <IdentityCell name="Cleo Test" subtitle="cleo@example.com" size={40} />
    <IdentityCell name="Example Studio" shape="square" subtitle="Customer since 2021" size={40} />
  </Layer>
{/snippet}

{#snippet jobStatus()}
  <div class="w24">
    <Layer level="panel" padding="lg" gap="md">
      <JobStatus status="running" step="Resizing pictures" done={28} total={40} />
      <JobStatus status="queued" detail="Starts after the import" />
      <JobStatus status="done" detail="412 rows in 9 s" />
      <JobStatus status="failed" detail="The file has no header row" />
    </Layer>
  </div>
{/snippet}

{#snippet kpiTile()}
  <div class="w34">
    <Grid columns={2} gap="md">
      <KpiTile
        level="panel"
        icon="cart"
        label="Orders"
        value="1,284"
        delta="+12 %"
        deltaLabel="vs last week"
      />
      <KpiTile
        level="panel"
        icon="users"
        label="Visitors"
        value="18.2k"
        delta="+5 %"
        deltaLabel="this month"
      />
      <KpiTile
        level="panel"
        icon="package"
        label="Stock"
        value="72 %"
        meter={[
          { value: 52, color: 'var(--accent)' },
          { value: 20, color: 'var(--warn)' },
        ]}
        detail="20 % runs low"
      />
      <KpiTile
        level="panel"
        icon="refresh"
        label="Returns"
        value="2.1 %"
        delta={-0.4}
        goodWhen="down"
        deltaLabel="vs last month"
      />
    </Grid>
  </div>
{/snippet}

{#snippet glyph()}<span></span>{/snippet}
{#snippet preview(name: string)}<PreviewMolecules {name} fallback={glyph} />{/snippet}

<Studio levels={['Molecules']} {names} {shows} {meta} {skip} {preview} />

<style>
  .w12 {
    width: 12rem;
  }
  .w48 {
    width: 48rem;
  }
  .w24 {
    width: 24rem;
  }
  .w26 {
    width: 26rem;
  }
  .w28 {
    width: 28rem;
  }
  .w30 {
    width: 30rem;
  }
  .w32 {
    width: 32rem;
  }
  .w34 {
    width: 34rem;
  }
  .w36 {
    width: 36rem;
  }
  .w38 {
    width: 38rem;
  }
  .w42 {
    width: 42rem;
  }
  .w46 {
    width: 46rem;
  }
  /* Popups open below their trigger: start high so the open panel has room. */
  .top {
    align-self: start;
  }
  /* Menus and popovers open in the top layer, outside the square's scale: they get it here,
     grown from their top-left corner so they stay on their trigger. */
  .pop :global([popover]) {
    scale: var(--pop);
    transform-origin: top left !important;
  }
  .pop--end :global([popover]) {
    transform-origin: top right !important;
  }
  .file__icon {
    display: grid;
    place-items: center;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: var(--radius-md);
    background: var(--accent-soft);
    color: var(--accent-ink);
  }
  /* The list takes the field's on-screen width, which already carries the scale. */
  .pop :global(ul[popover]) {
    width: calc(var(--anchor-width, 100%) / var(--pop));
  }
  .top {
    margin-top: -10rem;
  }
  :global(.gauge-card) {
    width: 26rem;
  }
  .tip-scene :global(.tooltip) {
    scale: 1.5;
    transform-origin: top left;
  }
  .slide {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: var(--space-2);
    height: 12rem;
    padding: var(--space-6);
    border-radius: inherit;
    background: radial-gradient(
      120% 140% at 0% 0%,
      color-mix(in srgb, var(--c) 26%, transparent),
      transparent 65%
    );
  }
  .slide__dot {
    width: 2.75rem;
    height: 2.75rem;
    border-radius: var(--radius-md);
    background: var(--c);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.45);
  }
  .slide__title {
    font-size: var(--fs-xl);
    letter-spacing: var(--tracking-tight);
  }
  .slide__text {
    color: var(--text-2);
  }
  .key {
    font-family: var(--font-mono);
    font-size: var(--fs-md);
    color: var(--text-2);
  }
  .chart {
    width: 100%;
  }
  .orders {
    display: grid;
    margin-top: var(--space-5);
    padding-inline: var(--space-4);
  }
  .order {
    display: grid;
    grid-template-columns: 7rem 1fr auto 6rem;
    align-items: center;
    gap: var(--space-4);
    padding: var(--space-3) 0;
    font-size: var(--fs-md);
  }
  .order + .order {
    border-top: 1px solid var(--border-strong);
  }
  .order code {
    font-family: var(--font-mono);
    color: var(--text-2);
  }
  .order .sum {
    font-variant-numeric: tabular-nums;
  }
  .order :global(.badge) {
    justify-self: end;
  }
</style>
