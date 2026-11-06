<script lang="ts">
  /**
   * Example page: a small team's sales pipeline for the quarter. The forecast, the stage
   * columns and their totals all sit on the ground; there is no panel at all — the open deal is
   * lifted onto the selected layer, the header is the only glass. A deal moves where it is (its
   * round "next stage" key, its menu, or by dragging) and travels to its new column; both stage
   * totals and the forecast glow when it lands. Storybook only.
   */
  import { tick } from 'svelte';
  import { flip } from 'svelte/animate';
  import { crossfade } from 'svelte/transition';
  import Avatar from '../patterns/atoms/Avatar.svelte';
  import Button from '../patterns/atoms/Button.svelte';
  import DotMatrix from '../patterns/atoms/DotMatrix.svelte';
  import Icon from '../patterns/atoms/Icon.svelte';
  import Input from '../patterns/atoms/Input.svelte';
  import Select from '../patterns/atoms/Select.svelte';
  import { changeCue } from '../patterns/atoms/changed';
  import DropdownMenu, { type MenuEntry } from '../patterns/molecules/DropdownMenu.svelte';
  import EmptyState from '../patterns/molecules/EmptyState.svelte';
  import Field from '../patterns/molecules/Field.svelte';
  import KpiTile from '../patterns/molecules/KpiTile.svelte';
  import SegmentedControl from '../patterns/molecules/SegmentedControl.svelte';
  import ChartCard from '../patterns/organisms/ChartCard.svelte';
  import HorizontalBarChart from '../patterns/organisms/HorizontalBarChart.svelte';
  import Toaster from '../patterns/organisms/Toaster.svelte';
  import Page from '../patterns/templates/Page.svelte';
  import { celebrate, greeting } from '../utils/delight';
  import { glide, motion } from '../utils/motion';
  import { ToastQueue } from '../utils/toasts.svelte';
  import DesignNotes, { type DesignNote } from './DesignNotes.svelte';
  import {
    ME,
    TODAY,
    addDays,
    day,
    daysBetween,
    deals as allDeals,
    digits,
    money,
    quarter,
    sellers,
    stages,
    type Deal,
    type StageId,
  } from './mock-business';

  interface Props {
    /** Whose deals to show. */
    view?: 'everyone' | 'mine';
    /** A deal to open on start, e.g. `d9`. */
    open?: string | undefined;
    /** Starts with an empty pipeline (a fresh quarter). */
    empty?: boolean;
  }

  let { view: startView = 'everyone', open: startOpen, empty = false }: Props = $props();

  // svelte-ignore state_referenced_locally
  let deals = $state<Deal[]>(empty ? [] : allDeals.map((d) => ({ ...d })));
  // svelte-ignore state_referenced_locally
  let view = $state(startView);
  // svelte-ignore state_referenced_locally
  let openId = $state<string | null>(startOpen ?? null);
  let dragId = $state<string | null>(null);
  let overStage = $state<StageId | null>(null);
  let justWon = $state<string | null>(null);
  let allSteps = $state(false);
  let adding = $state(false);
  let draft = $state({ title: '', client: '', value: '', owner: ME });
  let draftError = $state('');
  let firstField = $state<HTMLInputElement | undefined>();

  const toasts = new ToastQueue(6000);
  $effect(() => () => toasts.clear());

  const m = motion('slow', 'in-out');
  // A moved deal travels from its old column to its new one; under reduced motion it just
  // appears there.
  const [send, receive] = crossfade({
    duration: m.reduced ? 0 : m.duration,
    easing: m.ease,
    fallback: (node) => glide(node, { y: 8, scale: 0.98 }),
  });
  const flipMs = m.reduced ? 0 : m.duration;

  const shown = $derived(view === 'mine' ? deals.filter((d) => d.owner === ME) : deals);
  const inStage = (id: StageId) => shown.filter((d) => d.stage === id);
  const sum = (list: Deal[]) => list.reduce((s, d) => s + d.value, 0);
  const chanceOf = (id: StageId) => stages.find((s) => s.id === id)?.chance ?? 0;

  const won = $derived(sum(shown.filter((d) => d.stage === 'won')));
  const openDeals = $derived(shown.filter((d) => d.stage !== 'won'));
  const weighted = $derived(openDeals.reduce((s, d) => s + d.value * chanceOf(d.stage), 0));
  const forecast = $derived(Math.round(won + weighted));
  const share = $derived(Math.round((forecast / quarter.target) * 100));
  const daysLeft = daysBetween(TODAY, quarter.ends);
  const scale = $derived(Math.max(quarter.target, forecast) * 1.04);
  const closingSoon = $derived(
    openDeals
      .filter((d) => d.closes <= addDays(TODAY, 30))
      .sort((a, b) => a.closes.localeCompare(b.closes)),
  );

  const thisWeek = $derived(
    openDeals
      .filter((d) => d.next && d.nextDue <= addDays(TODAY, 7))
      .sort((a, b) => a.nextDue.localeCompare(b.nextDue)),
  );

  const byOwner = $derived(
    sellers
      .map((s) => {
        const own = deals.filter((d) => d.owner === s.name);
        const value = own.reduce((t, d) => t + d.value * chanceOf(d.stage), 0);
        return { label: s.name.split(' ')[0] ?? s.name, title: s.name, value: Math.round(value) };
      })
      .filter((row) => view === 'everyone' || row.title === ME),
  );

  const nextStage = (id: StageId) => stages[stages.findIndex((s) => s.id === id) + 1];
  const first = (name: string) => name.split(' ')[0] ?? name;

  function dueTone(due: string): 'late' | 'today' | 'soon' {
    if (due < TODAY) return 'late';
    if (due === TODAY) return 'today';
    return 'soon';
  }
  function dueText(due: string) {
    const tone = dueTone(due);
    if (tone === 'late') return `Overdue · ${day(due)}`;
    if (tone === 'today') return 'Today';
    if (due === addDays(TODAY, 1)) return 'Tomorrow';
    return day(due);
  }

  function moveDeal(id: string, to: StageId) {
    const at = deals.findIndex((d) => d.id === id);
    const deal = deals[at];
    if (!deal || deal.stage === to) return;
    deal.stage = to;
    // It lands on top of its new column, where the eye follows it.
    deals.splice(at, 1);
    deals.unshift(deal);
    if (to === 'won') {
      deal.closes = TODAY;
      deal.next = '';
      deal.nextDue = '';
      justWon = id;
    }
  }

  function markLost(id: string) {
    const at = deals.findIndex((d) => d.id === id);
    const deal = deals[at];
    if (!deal) return;
    deals.splice(at, 1);
    if (openId === id) openId = null;
    // The deal's own controls are gone with it, so the way back is offered in a toast.
    toasts.push(`“${deal.title}” marked as lost.`, 'ok', {
      action: {
        label: 'Undo',
        onaction: () => deals.splice(Math.min(at, deals.length), 0, deal),
      },
    });
  }

  function stepDone(id: string) {
    const deal = deals.find((d) => d.id === id);
    if (!deal) return;
    deal.next = '';
    deal.nextDue = '';
  }

  function setNext(deal: Deal, text: string) {
    deal.next = text.trim();
    if (deal.next && !deal.nextDue) deal.nextDue = addDays(TODAY, 3);
    if (!deal.next) deal.nextDue = '';
  }

  function menuFor(deal: Deal): MenuEntry[] {
    return [
      { heading: 'Move to' },
      ...stages.map((s) => ({
        label: s.label,
        icon: s.id === deal.stage ? ('check' as const) : ('arrow-right' as const),
        disabled: s.id === deal.stage,
        onselect: () => moveDeal(deal.id, s.id),
      })),
      { separator: true },
      { label: 'Mark as lost', icon: 'x-circle', danger: true, onselect: () => markLost(deal.id) },
    ];
  }

  function onDrop(event: DragEvent, to: StageId) {
    event.preventDefault();
    if (dragId) moveDeal(dragId, to);
    dragId = null;
    overStage = null;
  }

  async function startAdding() {
    adding = true;
    draftError = '';
    await tick();
    firstField?.focus();
  }

  async function addDeal(event: SubmitEvent) {
    event.preventDefault();
    const value = Number(String(draft.value).replace(/[^\d.]/g, ''));
    if (!draft.title.trim()) return (draftError = 'Give the deal a name.');
    if (!value) return (draftError = 'Enter the deal value in euros.');
    const id = `new-${Date.now()}`;
    deals.push({
      id,
      title: draft.title.trim(),
      client: draft.client.trim() || 'New contact',
      value,
      owner: draft.owner,
      stage: 'lead',
      next: 'Intro call',
      nextDue: addDays(TODAY, 2),
      closes: addDays(TODAY, 45),
    });
    // A lead for someone else would vanish from "Mine" the moment it is added.
    if (view === 'mine' && draft.owner !== ME) view = 'everyone';
    draft = { title: '', client: '', value: '', owner: ME };
    adding = false;
  }

  function landed(id: string, node: HTMLElement) {
    if (justWon !== id) return;
    justWon = null;
    celebrate(node);
  }

  const hello = greeting(new Date(), first(ME));

  const notes: DesignNote[] = [
    {
      principle: 'function',
      title: 'The forecast is the one figure in dots',
      body: 'Won plus every open deal weighted by its stage. It is what the team checks each morning, so it is big, on the ground and in dot-matrix digits; the bar under it shows how far the target is.',
      target: '[data-note="forecast"]',
    },
    {
      principle: 'locality',
      title: 'A deal moves from where it is',
      body: 'The round key on each deal moves it one stage on; its menu reaches every stage and “lost”. Dragging works too. Nothing has to be opened elsewhere first.',
      target: '[data-note="advance"]',
    },
    {
      principle: 'cues',
      title: 'It travels, then both totals and the forecast glow',
      body: 'The deal glides from its old column to the new one. The two stage totals it changed and the forecast light up once, so the effect of the move is seen where it happened.',
      target: '[data-note="board"]',
    },
    {
      principle: 'locality',
      title: '“Add deal” sits at the end of Lead',
      body: 'New deals always start as leads, so the form opens right there, at the end of that column — not in a dialog or a header button.',
      target: '[data-note="add"]',
    },
    {
      principle: 'friendly',
      title: 'Lost has Undo, won throws sprinkles',
      body: 'A lost deal leaves the board, so its way back is the toast’s Undo. A won deal is the end of real work: it lands with a small burst, once.',
      target: '[data-note="won"]',
    },
  ];
</script>

{#snippet actions()}
  <SegmentedControl
    size="sm"
    label="Whose deals"
    options={[
      { value: 'everyone', label: 'Team' },
      { value: 'mine', label: 'Mine' },
    ]}
    bind:value={view}
  />
{/snippet}

{#snippet dealItem(deal: Deal)}
  {@const isOpen = openId === deal.id}
  {@const ahead = nextStage(deal.stage)}
  <article
    class="deal"
    class:open={isOpen}
    class:dragging={dragId === deal.id}
    data-deal={deal.id}
    draggable="true"
    ondragstart={(event) => {
      dragId = deal.id;
      event.dataTransfer?.setData('text/plain', deal.id);
      if (event.dataTransfer) event.dataTransfer.effectAllowed = 'move';
    }}
    ondragend={() => {
      dragId = null;
      overStage = null;
    }}
  >
    <div class="deal__top">
      <button
        type="button"
        class="deal__open"
        aria-expanded={isOpen}
        onclick={() => (openId = isOpen ? null : deal.id)}
      >
        <span class="deal__title">{deal.title}</span>
        <span class="deal__client">{deal.client}</span>
      </button>
      <span class="deal__value" use:changeCue={deal.value}>{money(deal.value)}</span>
    </div>

    {#if deal.stage !== 'won'}
      <p class="next" class:next--none={!deal.next} use:changeCue={deal.next}>
        <Icon name="flag" size={13} />
        <span>{deal.next || 'No next step yet'}</span>
      </p>
    {/if}

    <div class="deal__meta">
      <span class="owner" title={deal.owner}>
        <Avatar name={deal.owner} size={22} color="auto" />
        <span class="sr-only">Owner: {deal.owner}</span>
      </span>
      {#if deal.stage === 'won'}
        <span class="when when--won"><Icon name="trophy" size={13} />Won {day(deal.closes)}</span>
      {:else if deal.next}
        <span class="when when--{dueTone(deal.nextDue)}">{dueText(deal.nextDue)}</span>
      {/if}
      {#if ahead}
        <span class="advance" data-note={deal.id === 'd9' ? 'advance' : undefined}>
          <Button
            variant="soft"
            size="xs"
            icon="chevron-right"
            iconOnly
            label="Move {deal.title} to {ahead.label}"
            onclick={() => moveDeal(deal.id, ahead.id)}
          />
        </span>
      {/if}
    </div>

    {#if isOpen}
      <div class="deal__more" in:glide={{ y: -4, speed: 'quick' }}>
        <dl class="facts">
          <div>
            <dt>Chance</dt>
            <dd>{Math.round(chanceOf(deal.stage) * 100)} %</dd>
          </div>
          <div>
            <dt>Weighted</dt>
            <dd use:changeCue={deal.stage}>{money(deal.value * chanceOf(deal.stage))}</dd>
          </div>
          <div>
            <dt>{deal.stage === 'won' ? 'Won on' : 'Closes'}</dt>
            <dd>{day(deal.closes)}</dd>
          </div>
        </dl>
        {#if deal.stage !== 'won'}
          <Field label="Next step">
            {#snippet children({ id })}
              <Input
                {id}
                size="sm"
                value={deal.next}
                placeholder="What happens next?"
                onchange={(event) => setNext(deal, event.currentTarget.value)}
              />
            {/snippet}
          </Field>
        {/if}
        <Field label="Owner">
          {#snippet children({ id })}
            <Select
              {id}
              size="sm"
              value={deal.owner}
              options={sellers.map((s) => ({ value: s.name, label: s.name }))}
              onchange={(event) => (deal.owner = event.currentTarget.value)}
            />
          {/snippet}
        </Field>
        <div class="deal__actions">
          {#if ahead}
            <Button
              variant="soft"
              size="sm"
              trailingIcon="arrow-right"
              label="Move to {ahead.label}"
              onclick={() => moveDeal(deal.id, ahead.id)}
            />
          {/if}
          <DropdownMenu label="More for {deal.title}" items={menuFor(deal)} variant="soft" />
        </div>
      </div>
    {/if}
  </article>
{/snippet}

<Page
  title="Pipeline"
  subtitle="{quarter.label} · {view === 'mine' ? 'your deals' : 'the whole team'}"
  {actions}
>
  {#if !deals.length && !adding}
    <EmptyState
      icon="target"
      title="{hello.text}. A fresh quarter."
      message="The pipeline is empty — every deal starts as a lead. {hello.wink}"
      actionLabel="Add the first deal"
      actionIcon="plus"
      onaction={startAdding}
    />
  {:else}
    <section class="forecast" aria-labelledby="forecast-title">
      <div class="hero" data-note="forecast">
        <h2 id="forecast-title" class="eyebrow">Forecast · {quarter.label}</h2>
        <span class="figure" use:changeCue={forecast}>
          <span class="currency">€</span>
          <DotMatrix value={digits(forecast)} label={money(forecast)} size="xl" />
        </span>
        <div
          class="meter"
          role="img"
          aria-label="{money(won)} won and {money(
            weighted,
          )} weighted in the pipeline, against a {money(quarter.target)} target"
        >
          <span class="meter__won" style:width="{(won / scale) * 100}%"></span>
          <span class="meter__open" style:width="{(weighted / scale) * 100}%"></span>
          <span class="meter__target" style:left="{(quarter.target / scale) * 100}%"></span>
        </div>
        <p class="hero__sub">
          <span class="key key--won"></span>Won
          <span class="key key--open"></span>Weighted pipeline
          <span class="hero__goal"
            >{share} % of the {money(quarter.target)} target · {daysLeft} days left</span
          >
        </p>
      </div>
      <div class="figures">
        <KpiTile
          label="Won"
          value={money(won)}
          detail="{shown.filter((d) => d.stage === 'won').length} deals"
        />
        <KpiTile
          label="Open pipeline"
          value={money(sum(openDeals))}
          detail="{openDeals.length} deals"
        />
        <KpiTile
          label="Closing in 30 days"
          value={closingSoon.length}
          detail={money(sum(closingSoon))}
        />
      </div>
    </section>

    <div class="board" data-note="board" role="region" aria-label="Deals by stage">
      {#each stages as stage (stage.id)}
        {@const list = inStage(stage.id)}
        {@const total = sum(list)}
        <section
          class="stage"
          class:over={overStage === stage.id && dragId !== null}
          aria-labelledby="stage-{stage.id}"
          data-note={stage.id === 'won' ? 'won' : undefined}
          ondragover={(event) => {
            if (!dragId) return;
            event.preventDefault();
            overStage = stage.id;
          }}
          ondragleave={(event) => {
            if (!(event.currentTarget as HTMLElement).contains(event.relatedTarget as Node))
              overStage = null;
          }}
          ondrop={(event) => onDrop(event, stage.id)}
        >
          <header class="stage__head">
            <div class="stage__name">
              <h2 id="stage-{stage.id}">{stage.label}</h2>
              <span class="count">{list.length}</span>
              {#if stage.id !== 'won'}<span class="chance">{Math.round(stage.chance * 100)} %</span
                >{/if}
            </div>
            <span class="stage__total" use:changeCue={total}>{money(total)}</span>
            <span class="stage__weighted">
              {stage.id === 'won'
                ? 'closed this quarter'
                : `≈ ${money(total * stage.chance)} weighted`}
            </span>
          </header>

          <ul class="deals" aria-label="{stage.label} deals">
            {#each list as deal (deal.id)}
              <li
                in:receive={{ key: deal.id }}
                out:send={{ key: deal.id }}
                animate:flip={{ duration: flipMs }}
                onintroend={(event) => landed(deal.id, event.currentTarget)}
              >
                {@render dealItem(deal)}
              </li>
            {/each}
            {#if !list.length}
              <li class="none">{stage.id === 'won' ? 'Nothing won yet' : 'No deals here'}</li>
            {/if}
          </ul>

          {#if stage.id === 'lead'}
            <div class="add" data-note="add">
              {#if adding}
                <form class="add__form" onsubmit={addDeal} in:glide={{ y: -6, speed: 'quick' }}>
                  <Field
                    label="Deal"
                    error={draftError && !draft.title.trim() ? draftError : undefined}
                  >
                    {#snippet children({ id, invalid })}
                      <Input
                        {id}
                        size="sm"
                        {invalid}
                        bind:element={firstField}
                        bind:value={draft.title}
                        placeholder="e.g. Website relaunch"
                      />
                    {/snippet}
                  </Field>
                  <Field label="For">
                    {#snippet children({ id })}
                      <Input {id} size="sm" bind:value={draft.client} placeholder="e.g. Bakery" />
                    {/snippet}
                  </Field>
                  <div class="add__row">
                    <Field
                      label="Value (€)"
                      error={draftError && draft.title.trim() ? draftError : undefined}
                    >
                      {#snippet children({ id, invalid })}
                        <Input
                          {id}
                          size="sm"
                          {invalid}
                          inputmode="numeric"
                          bind:value={draft.value}
                          placeholder="10,000"
                        />
                      {/snippet}
                    </Field>
                    <Field label="Owner">
                      {#snippet children({ id })}
                        <Select
                          {id}
                          size="sm"
                          bind:value={draft.owner}
                          options={sellers.map((s) => ({ value: s.name, label: first(s.name) }))}
                        />
                      {/snippet}
                    </Field>
                  </div>
                  <div class="add__actions">
                    <Button
                      type="submit"
                      variant="primary"
                      size="sm"
                      icon="plus"
                      label="Add lead"
                    />
                    <Button
                      variant="soft"
                      size="sm"
                      label="Cancel"
                      onclick={() => (adding = false)}
                    />
                  </div>
                </form>
              {:else}
                <Button
                  variant="soft"
                  size="sm"
                  icon="plus"
                  label="Add deal"
                  block
                  onclick={startAdding}
                />
              {/if}
            </div>
          {/if}
        </section>
      {/each}
    </div>

    <div class="below">
      <section class="week" aria-labelledby="week-title">
        <div class="week__head">
          <h2 id="week-title">Next steps</h2>
          <span class="muted">{thisWeek.length} due by {day(addDays(TODAY, 7))}</span>
        </div>
        {#if thisWeek.length}
          <ul class="steps">
            {#each allSteps ? thisWeek : thisWeek.slice(0, 5) as deal (deal.id)}
              <li
                class="step"
                animate:flip={{ duration: flipMs }}
                out:glide={{ x: 12, speed: 'quick' }}
              >
                <Button
                  variant="soft"
                  size="sm"
                  icon="check"
                  iconOnly
                  label="Done: {deal.next} ({deal.title})"
                  onclick={() => stepDone(deal.id)}
                />
                <span class="step__what">
                  <strong>{deal.next}</strong>
                  <span class="muted">{deal.title} · {deal.client}</span>
                </span>
                <span class="step__due when--{dueTone(deal.nextDue)}">{dueText(deal.nextDue)}</span>
                <Avatar name={deal.owner} size={26} color="auto" />
              </li>
            {/each}
          </ul>
          {#if thisWeek.length > 5}
            <Button
              variant="plain"
              size="sm"
              label={allSteps ? 'Show fewer' : `Show all ${thisWeek.length}`}
              trailingIcon={allSteps ? 'chevron-up' : 'chevron-down'}
              onclick={() => (allSteps = !allSteps)}
            />
          {/if}
        {:else}
          <EmptyState compact icon="check-circle" message="Nothing due this week. Nicely done." />
        {/if}
      </section>

      <ChartCard
        title="Forecast by owner"
        sub="Won plus weighted pipeline"
        value={money(byOwner.reduce((s, r) => s + r.value, 0))}
      >
        <HorizontalBarChart
          data={byOwner}
          height={byOwner.length * 44 + 8}
          color="var(--accent)"
          countLabel="Forecast"
          valueFormat={money}
          label="Forecast by owner"
          categoryLabel="Owner"
        />
      </ChartCard>
    </div>
  {/if}
</Page>

<Toaster queue={toasts} />
<DesignNotes title="Sales pipeline" {notes} corner="bottom-right" />

<style>
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }
  .muted {
    color: var(--text-2);
    font-size: var(--fs-sm);
  }

  /* Forecast: one big readout and three figures, all on the ground. */
  .forecast {
    display: grid;
    grid-template-columns: minmax(0, 1.25fr) minmax(0, 2fr);
    gap: var(--space-8);
    align-items: end;
  }
  .hero {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    min-width: 0;
  }
  .eyebrow {
    color: var(--text-2);
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
  }
  .figure {
    display: inline-flex;
    align-items: baseline;
    gap: var(--space-2);
    width: fit-content;
    padding: 4px 8px;
    margin: -4px -8px;
    border-radius: var(--radius-md);
  }
  .currency {
    color: var(--text-2);
    font-size: var(--fs-2xl);
    font-weight: var(--fw-medium);
  }
  .meter {
    position: relative;
    display: flex;
    height: 10px;
    border-radius: var(--radius-pill);
    background: var(--fill-muted);
  }
  .meter__won,
  .meter__open {
    height: 100%;
    transition: width var(--motion-slow) var(--ease-in-out);
  }
  .meter__won {
    border-radius: var(--radius-pill) 0 0 var(--radius-pill);
    background: var(--accent);
  }
  .meter__open {
    background: color-mix(in srgb, var(--accent) 38%, transparent);
    border-radius: 0 var(--radius-pill) var(--radius-pill) 0;
  }
  .meter__target {
    position: absolute;
    top: -4px;
    bottom: -4px;
    width: 2px;
    margin-left: -1px;
    border-radius: 1px;
    background: var(--text);
  }
  .hero__sub {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-1) var(--space-2);
    color: var(--text-2);
    font-size: var(--fs-sm);
  }
  .key {
    width: 10px;
    height: 10px;
    border-radius: 3px;
  }
  .key--won {
    background: var(--accent);
  }
  .key--open {
    margin-left: var(--space-2);
    background: color-mix(in srgb, var(--accent) 38%, transparent);
  }
  .hero__goal {
    margin-left: auto;
    color: var(--text);
    font-weight: var(--fw-medium);
  }
  .figures {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: var(--space-6);
  }

  /* The board: five columns on the ground, set apart by hairlines. */
  .board {
    display: grid;
    grid-template-columns: repeat(5, minmax(14rem, 1fr));
    gap: var(--space-4);
    overflow-x: auto;
    overscroll-behavior-x: contain;
    scroll-snap-type: x proximity;
    padding: var(--space-1);
    margin: calc(var(--space-1) * -1);
  }
  .stage {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    min-width: 0;
    padding: var(--space-1) 0 var(--space-3) var(--space-4);
    border-left: 1px solid var(--border-strong);
    border-radius: 0 var(--radius-card) var(--radius-card) 0;
    scroll-snap-align: start;
    transition: background-color var(--motion-base) var(--ease-out);
  }
  .stage.over {
    background: var(--accent-faint);
  }
  .stage__head {
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding-right: var(--space-2);
  }
  .stage__name {
    display: flex;
    align-items: center;
    gap: var(--space-2);
  }
  .stage__name h2 {
    font-size: var(--fs-md);
    font-weight: var(--fw-semibold);
  }
  .count {
    min-width: 1.5rem;
    padding: 0 0.4rem;
    border-radius: var(--radius-pill);
    background: var(--fill-muted);
    color: var(--text-2);
    font-size: var(--fs-xs);
    font-weight: var(--fw-semibold);
    line-height: 1.6;
    text-align: center;
  }
  .chance {
    margin-left: auto;
    color: var(--text-3);
    font-size: var(--fs-xs);
    font-variant-numeric: tabular-nums;
  }
  .stage__total {
    width: fit-content;
    margin: 2px -6px 0;
    padding: 0 6px;
    border-radius: var(--radius-sm);
    font-size: var(--fs-xl);
    font-weight: var(--fw-semibold);
    font-variant-numeric: tabular-nums;
    letter-spacing: var(--tracking-tight);
  }
  .stage__weighted {
    color: var(--text-3);
    font-size: var(--fs-xs);
  }

  .deals {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .none {
    padding: var(--space-3) 0;
    color: var(--text-3);
    font-size: var(--fs-sm);
  }

  /* A deal is a thing you hold: rounded, a quiet fill, no border or shadow. */
  .deal {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    padding: var(--space-3);
    border-radius: var(--radius-md);
    background: var(--fill-subtle);
    border: 1px solid transparent;
    cursor: grab;
    transition:
      background-color var(--motion-base) var(--ease-out),
      box-shadow var(--motion-base) var(--ease-out),
      opacity var(--motion-base) var(--ease-out);
  }
  .deal:hover {
    background: var(--fill-hover);
  }
  .deal.open {
    background: var(--layer-selected-bg);
    border-color: var(--layer-selected-border);
    box-shadow: var(--layer-selected-shadow);
    cursor: auto;
  }
  .deal.dragging {
    opacity: 0.45;
  }
  .deal__top {
    display: flex;
    align-items: flex-start;
    gap: var(--space-2);
  }
  .deal__open {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 1px;
    padding: 0;
    border: 0;
    background: none;
    color: inherit;
    font: inherit;
    text-align: left;
    cursor: pointer;
    border-radius: var(--radius-xs);
  }
  .deal__open:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
  }
  .deal__title {
    font-weight: var(--fw-semibold);
    line-height: var(--leading-tight);
  }
  .deal__client {
    color: var(--text-2);
    font-size: var(--fs-sm);
  }
  .deal__value {
    flex-shrink: 0;
    padding: 0 4px;
    margin-right: -4px;
    border-radius: var(--radius-xs);
    font-size: var(--fs-sm);
    font-weight: var(--fw-semibold);
    font-variant-numeric: tabular-nums;
  }
  .deal__meta {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    min-height: 24px;
  }
  .owner {
    display: inline-flex;
  }
  .next {
    display: flex;
    align-items: flex-start;
    gap: var(--space-1);
    width: fit-content;
    margin: 0 -4px;
    padding: 1px 4px;
    border-radius: var(--radius-xs);
    color: var(--text-2);
    font-size: var(--fs-xs);
    line-height: 1.4;
  }
  .next :global(.icon) {
    flex-shrink: 0;
    margin-top: 2px;
    color: var(--text-3);
  }
  .next--none {
    color: var(--draft);
    font-style: italic;
  }
  .when {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    color: var(--text-2);
    font-size: var(--fs-xs);
    font-variant-numeric: tabular-nums;
  }
  .when--late,
  .step__due.when--late {
    color: var(--danger);
    font-weight: var(--fw-medium);
  }
  .when--today,
  .step__due.when--today {
    color: var(--draft);
    font-weight: var(--fw-medium);
  }
  .when--won {
    /* Green pulled towards the text colour: darker on light, lighter on dark. */
    color: color-mix(in srgb, var(--ok) 78%, var(--text));
  }
  .advance {
    margin-left: auto;
  }

  .deal__more {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    padding-top: var(--space-2);
    border-top: 1px solid var(--border);
  }
  .facts {
    display: grid;
    grid-template-columns: repeat(3, auto);
    justify-content: space-between;
    gap: var(--space-2);
    margin: 0;
  }
  .facts dt {
    color: var(--text-3);
    font-size: var(--fs-2xs);
  }
  .facts dd {
    margin: 0 -4px;
    padding: 0 4px;
    border-radius: var(--radius-xs);
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
    font-variant-numeric: tabular-nums;
  }
  .deal__actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-2);
  }

  .add__form {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    padding: var(--space-3);
    border-radius: var(--radius-md);
    background: var(--layer-selected-bg);
    border: 1px solid var(--layer-selected-border);
  }
  .add__row {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: var(--space-2);
  }
  /* Select keeps a 9rem minimum; in this half-column it must shrink with the cell. */
  .add__row :global(.select) {
    min-width: 0;
    width: 100%;
  }
  .add__actions {
    display: flex;
    gap: var(--space-2);
  }

  /* Below the board: this week's steps and the forecast per person. */
  .below {
    display: grid;
    grid-template-columns: minmax(0, 3fr) minmax(0, 2fr);
    gap: var(--space-10);
    align-items: start;
    margin-top: var(--space-4);
  }
  .week {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }
  .week__head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: var(--space-3);
  }
  .week__head h2 {
    font-size: var(--fs-lg);
    font-weight: var(--fw-semibold);
  }
  .week > :global(.btn) {
    align-self: flex-start;
  }
  .steps {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .step {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) auto auto;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-2) 0;
    border-top: 1px solid var(--border);
  }
  .step__what {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }
  .step__what strong {
    font-weight: var(--fw-medium);
  }
  .step__what .muted {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .step__due {
    color: var(--text-2);
    font-size: var(--fs-sm);
    font-variant-numeric: tabular-nums;
  }

  @media (max-width: 1100px) {
    .forecast {
      grid-template-columns: minmax(0, 1fr);
      gap: var(--space-6);
    }
    .below {
      grid-template-columns: minmax(0, 1fr);
      gap: var(--space-8);
    }
  }
  @media (max-width: 640px) {
    .figures {
      grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    }
    .hero__goal {
      margin-left: 0;
      flex-basis: 100%;
    }
    .board {
      scroll-snap-type: x mandatory;
      grid-template-columns: repeat(5, minmax(15rem, 82vw));
    }
  }
</style>
