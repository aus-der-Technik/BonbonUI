<script lang="ts">
  /**
   * Example page: a household's week of meals. The week is a grid of soft keys on the ground;
   * an empty slot picks a recipe from a menu that grows out of it. The open recipe is the one
   * panel: its servings stepper scales every amount live, and a step that waits starts a
   * dot-matrix cooking timer inside that step. The shopping list is built from the plan and
   * ticked off in place. A custom glass bar on top switches weeks and counts what is left to
   * buy; a second glass pill appears only while a timer runs out of sight. Storybook only.
   */
  import { tick } from 'svelte';
  import Button from '../patterns/atoms/Button.svelte';
  import Checkbox from '../patterns/atoms/Checkbox.svelte';
  import DotMatrix from '../patterns/atoms/DotMatrix.svelte';
  import Icon from '../patterns/atoms/Icon.svelte';
  import Input from '../patterns/atoms/Input.svelte';
  import { changeCue, flashChanged } from '../patterns/atoms/changed';
  import DropdownMenu from '../patterns/molecules/DropdownMenu.svelte';
  import EmptyState from '../patterns/molecules/EmptyState.svelte';
  import QuantityStepper from '../patterns/molecules/QuantityStepper.svelte';
  import Layer from '../patterns/layout/Layer.svelte';
  import Page from '../patterns/templates/Page.svelte';
  import { celebrate } from '../utils/delight';
  import DesignNotes, { type DesignNote } from './DesignNotes.svelte';
  import {
    aisles,
    days,
    mealToday,
    meals,
    pantryStaples,
    recipes,
    weekPlan,
    type Aisle,
    type DayId,
    type MealId,
    type PlannedMeal,
    type Unit,
    type WeekPlan,
  } from './mock-private';

  interface Props {
    /** Opens with a cooking timer running in tonight's recipe. */
    cooking?: boolean;
    /** Opens on next week, with nothing planned yet. */
    emptyWeek?: boolean;
  }

  let { cooking = false, emptyWeek = false }: Props = $props();

  type WeekId = 'this' | 'next';
  interface Slot {
    day: DayId;
    meal: MealId;
  }
  interface Timer extends Slot {
    week: WeekId;
    step: number;
    total: number;
    left: number;
    running: boolean;
  }

  const emptyPlan = (): WeekPlan =>
    Object.fromEntries(
      days.map((d) => [d.id, { breakfast: null, lunch: null, dinner: null }]),
    ) as WeekPlan;

  let plans = $state<Record<WeekId, WeekPlan>>({
    this: structuredClone(weekPlan),
    next: emptyPlan(),
  });
  // svelte-ignore state_referenced_locally
  let week = $state<WeekId>(emptyWeek ? 'next' : 'this');
  // svelte-ignore state_referenced_locally
  let selected = $state<Slot | null>(emptyWeek ? null : { day: mealToday, meal: 'dinner' });
  let ticked = $state<Record<string, boolean>>({});
  let extras = $state<{ name: string }[]>([]);
  let extra = $state('');
  let removed = $state<{ slot: Slot; week: WeekId; planned: PlannedMeal } | null>(null);
  // svelte-ignore state_referenced_locally
  let timer = $state<Timer | null>(
    cooking
      ? {
          week: 'this',
          day: mealToday,
          meal: 'dinner',
          step: 0,
          total: 12 * 60,
          left: 7 * 60 + 48,
          running: true,
        }
      : null,
  );
  let listHead = $state<HTMLElement | undefined>();
  let weekEl = $state<HTMLElement | undefined>();

  for (const r of recipes)
    for (const i of r.ingredients)
      if (pantryStaples.includes(i.name)) ticked[`${i.name}|${i.unit}`] = true;

  const plan = $derived(plans[week]);
  const planned = $derived(selected ? plan[selected.day][selected.meal] : null);
  const recipe = $derived(planned ? recipes.find((r) => r.id === planned.recipe) : undefined);
  const dayOf = (id: DayId) => days.find((d) => d.id === id)!;
  const mealOf = (id: MealId) => meals.find((m) => m.id === id)!;
  const weekLabel = $derived(week === 'this' ? '9 – 15 Nov' : '16 – 22 Nov');
  const isSel = (s: Slot) => selected?.day === s.day && selected?.meal === s.meal;

  /* ── Amounts ── */
  const HALF = '½';
  function halves(n: number): string {
    const r = Math.max(0.5, Math.round(n * 2) / 2);
    const whole = Math.floor(r);
    return `${whole || ''}${r % 1 ? HALF : ''}`;
  }
  /** `buy`: pieces are bought whole — nobody sells half a lemon. */
  function amount(qty: number, unit: Unit, buy = false): string {
    if (unit === 'pc') return buy ? String(Math.ceil(qty - 0.01)) : halves(qty);
    if (unit === 'tbsp' || unit === 'tsp') return `${halves(qty)} ${unit}`;
    const r = qty >= 50 ? Math.round(qty / 10) * 10 : Math.max(5, Math.round(qty / 5) * 5);
    if (r >= 1000)
      return `${(r / 1000).toLocaleString('en', { maximumFractionDigits: 2 })} ${unit === 'g' ? 'kg' : 'l'}`;
    return `${r} ${unit}`;
  }

  /* ── Shopping list, built from the plan ── */
  interface Item {
    key: string;
    name: string;
    amount: string;
    from: string[];
  }
  const shopping = $derived.by(() => {
    const sums: Record<
      string,
      { name: string; unit: Unit; aisle: Aisle; qty: number; from: string[] }
    > = {};
    for (const d of days) {
      for (const m of meals) {
        const p = plan[d.id][m.id];
        const r = p && recipes.find((x) => x.id === p.recipe);
        if (!p || !r) continue;
        for (const ing of r.ingredients) {
          const key = `${ing.name}|${ing.unit}`;
          const entry = (sums[key] ??= { ...ing, qty: 0, from: [] });
          entry.qty += (ing.qty * p.servings) / r.serves;
          if (!entry.from.includes(r.name)) entry.from.push(r.name);
        }
      }
    }
    const groups: { aisle: string; items: Item[] }[] = aisles.map((aisle) => ({
      aisle,
      items: Object.entries(sums)
        .filter(([, e]) => e.aisle === aisle)
        .map(([key, e]) => ({
          key,
          name: e.name,
          amount: amount(e.qty, e.unit, true),
          from: e.from,
        }))
        .sort((a, b) => a.name.localeCompare(b.name)),
    }));
    groups.push({
      aisle: 'Also',
      items: extras.map((x) => ({ key: `${x.name}|extra`, name: x.name, amount: '', from: [] })),
    });
    return groups.filter((g) => g.items.length);
  });
  const allItems = $derived(shopping.flatMap((g) => g.items));
  const toBuy = $derived(allItems.filter((i) => !ticked[i.key]).length);
  const inBasket = $derived(allItems.length - toBuy);

  async function toggleItem(key: string, on: boolean) {
    ticked[key] = on;
    // The end of the shopping trip earns a few sprinkles — once, at the list it finished.
    if (on && toBuy === 0 && allItems.length) {
      await tick();
      if (listHead) celebrate(listHead);
    }
  }

  function addExtra(event: SubmitEvent) {
    event.preventDefault();
    const name = extra.trim();
    if (!name) return;
    const found = allItems.find((i) => i.name.toLowerCase() === name.toLowerCase());
    if (found) {
      // Already on the list: point at it instead of adding it twice.
      const row = listHead?.parentElement?.querySelector<HTMLElement>(
        `[data-key="${CSS.escape(found.key)}"]`,
      );
      if (row) flashChanged(row);
      extra = '';
      return;
    }
    extras = [...extras, { name }];
    extra = '';
  }

  /* ── Planning ── */
  async function assign(slot: Slot, recipeId: string) {
    plan[slot.day][slot.meal] = { recipe: recipeId, servings: 2 };
    selected = { ...slot };
    removed = null;
    await tick();
    const cell = weekEl?.querySelector<HTMLElement>(`[data-slot="${slot.day}-${slot.meal}"]`);
    if (cell) flashChanged(cell);
  }

  function takeOff() {
    if (!selected || !planned) return;
    removed = { slot: { ...selected }, week, planned: { ...planned } };
    if (timer && timer.week === week && isSel(timer)) timer = null;
    plan[selected.day][selected.meal] = null;
  }

  function undoTakeOff() {
    if (!removed) return;
    plans[removed.week][removed.slot.day][removed.slot.meal] = removed.planned;
    removed = null;
  }

  function setServings(n: number) {
    if (planned) planned.servings = n;
  }

  function switchWeek(next: WeekId) {
    week = next;
    removed = null;
    selected = next === 'this' ? { day: mealToday, meal: 'dinner' } : null;
  }

  /* ── Cooking timer ── */
  const clock = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
  const timerHere = (step: number) =>
    !!timer && timer.week === week && !!selected && isSel(timer) && timer.step === step;
  const timerAway = $derived(!!timer && !(timer.week === week && selected && isSel(timer)));
  const timerRecipe = $derived.by(() => {
    if (!timer) return undefined;
    const p = plans[timer.week][timer.day][timer.meal];
    return p ? recipes.find((r) => r.id === p.recipe) : undefined;
  });

  function startTimer(step: number, minutes: number) {
    if (!selected) return;
    timer = { week, ...selected, step, total: minutes * 60, left: minutes * 60, running: true };
  }

  function openTimer() {
    if (!timer) return;
    week = timer.week;
    selected = { day: timer.day, meal: timer.meal };
  }

  $effect(() => {
    if (!timer?.running) return;
    const t = setInterval(() => {
      if (!timer) return;
      timer.left = Math.max(0, timer.left - 1);
      if (timer.left === 0) timer.running = false;
    }, 1000);
    return () => clearInterval(t);
  });

  const notes: DesignNote[] = [
    {
      principle: 'locality',
      title: 'An empty slot plans itself',
      body: 'The “+” in a free slot opens a menu of recipes that grows out of that slot. The pick lands right there and glows once.',
      target: '[data-note="week"]',
    },
    {
      principle: 'cues',
      title: 'Servings scale every amount, and you see it',
      body: 'Change the servings and each amount in the recipe glows as it changes — and so do the matching lines of the shopping list.',
      target: '[data-note="servings"]',
    },
    {
      principle: 'function',
      title: 'The timer starts in the step that needs it',
      body: 'A step that waits has its own timer key. Its dot-matrix countdown reads from across the kitchen and keeps its width while it ticks; pause and “+1 min” sit right beside it.',
      target: '[data-note="steps"]',
    },
    {
      principle: 'locality',
      title: 'Tick off the list where it is',
      body: 'The shopping list is built from the plan and grouped by aisle. Ticking an item crosses it out in place; adding something else happens at the end of the list it joins.',
      target: '[data-note="shopping"]',
    },
    {
      principle: 'friendly',
      title: 'Glass only for what floats',
      body: 'The week bar is the only glass at rest. A second glass pill appears only while a timer runs for a recipe you are not looking at, so it is never lost.',
      target: '[data-note="bar"]',
    },
  ];
</script>

{#snippet header()}
  <div class="bar" data-note="bar">
    <Layer level="front" direction="horizontal" gap="sm" wrap={false} padding="xs">
      <span class="logo" aria-hidden="true"><Icon name="utensils" size={18} /></span>
      <span class="bar__title">Meals</span>
      <span class="bar__week" role="group" aria-label="Week">
        <Button
          variant="ghost"
          size="sm"
          icon="chevron-left"
          label="This week"
          iconOnly
          disabled={week === 'this'}
          onclick={() => switchWeek('this')}
        />
        <span class="bar__range" aria-live="polite">
          <span class="bar__which">{week === 'this' ? 'This week' : 'Next week'}</span>
          {weekLabel}
        </span>
        <Button
          variant="ghost"
          size="sm"
          icon="chevron-right"
          label="Next week"
          iconOnly
          disabled={week === 'next'}
          onclick={() => switchWeek('next')}
        />
      </span>
      <span class="grow"></span>
      <Button
        variant="glass"
        size="sm"
        icon="cart"
        label={!allItems.length
          ? 'Nothing to buy'
          : toBuy
            ? `${toBuy} to buy`
            : 'All in the basket'}
        onclick={() => listHead?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
      />
    </Layer>
  </div>
{/snippet}

<Page {header} width="wide" gap="xl">
  <section class="week-sec" aria-labelledby="week-title">
    <div class="head">
      <h1 id="week-title">{week === 'this' ? 'What’s cooking this week' : 'Next week, so far'}</h1>
      <span class="muted">Pick a meal to open its recipe</span>
    </div>
    <div class="week" data-note="week" bind:this={weekEl}>
      <div class="labels" aria-hidden="true">
        <span></span>
        {#each meals as m (m.id)}<span>{m.label}</span>{/each}
      </div>
      {#each days as d (d.id)}
        {@const today = week === 'this' && d.id === mealToday}
        <div class="day" class:today role="group" aria-label={d.label}>
          <div class="day__head">
            <span class="day__name">{d.short}</span>
            <span class="day__date">{d.date + (week === 'next' ? 7 : 0)}</span>
            {#if today}<span class="day__today">Today</span>{/if}
          </div>
          {#each meals as m (m.id)}
            {@const p = plan[d.id][m.id]}
            {@const r = p ? recipes.find((x) => x.id === p.recipe) : undefined}
            {#if p && r}
              <button
                type="button"
                class="slot"
                data-slot="{d.id}-{m.id}"
                aria-pressed={isSel({ day: d.id, meal: m.id })}
                aria-label="{d.label} {m.label}: {r.name}"
                onclick={() => (selected = { day: d.id, meal: m.id })}
              >
                <span class="slot__meal">{m.label}</span>
                <span class="slot__name">{r.name}</span>
                <span class="slot__meta">
                  {#if timer && timer.week === week && timer.day === d.id && timer.meal === m.id}
                    <Icon name="clock" size={12} />{clock(timer.left)}
                  {:else}
                    {p.servings} · {r.minutes} min
                  {/if}
                </span>
              </button>
            {:else}
              <div class="slot slot--empty" data-slot="{d.id}-{m.id}">
                <span class="slot__meal">{m.label}</span>
                <DropdownMenu
                  label="Plan {d.label} {m.label.toLowerCase()}"
                  menuLabel="Recipes for {d.label} {m.label.toLowerCase()}"
                  align="start"
                  minWidth="15rem"
                  items={[
                    { heading: 'Recipes' },
                    ...recipes.map((x) => ({
                      label: x.name,
                      onselect: () => assign({ day: d.id, meal: m.id }, x.id),
                    })),
                  ]}
                >
                  {#snippet trigger(props)}
                    <button
                      type="button"
                      class="slot__add"
                      aria-label="Plan {d.label} {m.label.toLowerCase()}"
                      {...props}
                    >
                      <Icon name="plus" size={16} />
                    </button>
                  {/snippet}
                </DropdownMenu>
              </div>
            {/if}
          {/each}
        </div>
      {/each}
    </div>
  </section>

  <div class="work">
    <Layer level="panel" padding="lg" gap="lg" as="section" aria-labelledby="recipe-title">
      {#if selected && planned && recipe}
        <div class="recipe-head">
          <div>
            <span class="eyebrow">{dayOf(selected.day).label} · {mealOf(selected.meal).label}</span>
            <h2 id="recipe-title">{recipe.name}</h2>
            <span class="muted"><Icon name="clock" size={13} /> {recipe.minutes} min</span>
          </div>
          <div class="recipe-actions">
            <DropdownMenu
              label="Swap recipe"
              icon="swap"
              iconOnly={false}
              variant="soft"
              shape="pill"
              items={recipes
                .filter((x) => x.id !== recipe.id)
                .map((x) => ({
                  label: x.name,
                  onselect: () => selected && assign(selected, x.id),
                }))}
            />
            <Button variant="danger" size="sm" icon="trash" label="Take off" onclick={takeOff} />
          </div>
        </div>

        <div class="servings" data-note="servings">
          <span class="servings__label" id="servings-label">Servings</span>
          <QuantityStepper
            value={planned.servings}
            min={1}
            max={12}
            label="Servings"
            decreaseLabel="One serving less"
            increaseLabel="One serving more"
            onchange={setServings}
          />
          <span class="muted">Recipe is written for {recipe.serves}</span>
        </div>

        <div class="recipe-body">
          <div>
            <h3>Ingredients</h3>
            <ul class="ingredients">
              {#each recipe.ingredients as ing (ing.name)}
                {@const a = amount((ing.qty * planned.servings) / recipe.serves, ing.unit)}
                <li>
                  <span class="ing__qty" use:changeCue={a}>{a}</span>
                  <span>{ing.name}</span>
                </li>
              {/each}
            </ul>
          </div>
          <div data-note="steps">
            <h3>Method</h3>
            <ol class="steps">
              {#each recipe.steps as step, i (i)}
                <li class="step" class:step--live={timerHere(i)}>
                  <span class="step__n" aria-hidden="true">{i + 1}</span>
                  <div class="step__body">
                    <p>{step.text}</p>
                    {#if step.minutes}
                      {#if timerHere(i) && timer}
                        <div
                          class="timer"
                          class:done={timer.left === 0}
                          role="timer"
                          aria-live="off"
                        >
                          <DotMatrix
                            value={clock(timer.left)}
                            label="{Math.ceil(timer.left / 60)} minutes left"
                            size="lg"
                          />
                          <div class="timer__keys">
                            {#if timer.left > 0}
                              <Button
                                variant="soft"
                                size="lg"
                                icon={timer.running ? 'pause' : 'play'}
                                label={timer.running ? 'Pause timer' : 'Resume timer'}
                                iconOnly
                                onclick={() => timer && (timer.running = !timer.running)}
                              />
                              <Button
                                variant="soft"
                                size="lg"
                                label="+1 min"
                                onclick={() => timer && (timer.left += 60)}
                              />
                            {/if}
                            <Button
                              variant="soft"
                              size="lg"
                              icon="close"
                              label="Stop timer"
                              iconOnly
                              onclick={() => (timer = null)}
                            />
                          </div>
                          <span class="timer__note" role="status">
                            {timer.left === 0
                              ? 'Time’s up — on to the next step.'
                              : timer.running
                                ? `${step.minutes} min timer`
                                : 'Paused'}
                          </span>
                        </div>
                      {:else}
                        <Button
                          variant="soft"
                          size="sm"
                          icon="clock"
                          label="{step.minutes} min timer"
                          onclick={() => step.minutes && startTimer(i, step.minutes)}
                        />
                      {/if}
                    {/if}
                  </div>
                </li>
              {/each}
            </ol>
          </div>
        </div>
      {:else if removed && selected}
        <EmptyState
          compact
          icon="utensils"
          title="Taken off {dayOf(removed.slot.day).label} {mealOf(
            removed.slot.meal,
          ).label.toLowerCase()}"
          message="The shopping list has forgotten it too."
          actionLabel="Undo"
          actionIcon="undo"
          onaction={undoTakeOff}
        />
      {:else}
        <EmptyState
          icon="utensils"
          title={week === 'next' ? 'A blank week. What sounds good?' : 'Nothing picked yet'}
          message="Press the + in any slot to plan a meal; its recipe opens here."
        />
      {/if}
    </Layer>

    <section class="shopping" aria-labelledby="shop-title" data-note="shopping">
      <div class="head" bind:this={listHead}>
        <h2 id="shop-title">Shopping list</h2>
        {#if allItems.length}
          <span class="muted" use:changeCue={inBasket}>
            {inBasket} of {allItems.length} in the basket
          </span>
        {/if}
      </div>
      {#if allItems.length === 0}
        <EmptyState
          compact
          icon="cart"
          message="Nothing to buy yet — the list fills itself as you plan meals."
        />
      {:else if toBuy === 0}
        <p class="all-done" role="status">
          <Icon name="check-circle" size={18} /> Everything is in the basket. Happy cooking!
        </p>
      {/if}
      {#each shopping as g (g.aisle)}
        <div class="aisle">
          <h3>{g.aisle}</h3>
          <ul>
            {#each g.items as item (item.key)}
              <li
                class="item"
                class:got={ticked[item.key]}
                data-key={item.key}
                title={item.from.length ? `For ${item.from.join(', ')}` : undefined}
              >
                <Checkbox
                  checked={!!ticked[item.key]}
                  label={item.name}
                  oncheckedchange={(on) => toggleItem(item.key, on)}
                />
                {#if item.amount}
                  <span class="item__qty" use:changeCue={item.amount}>{item.amount}</span>
                {/if}
              </li>
            {/each}
          </ul>
        </div>
      {/each}
      <form class="extra" onsubmit={addExtra}>
        <Input
          bind:value={extra}
          placeholder="Something else? Coffee, soap…"
          aria-label="Add to the list"
        />
        <Button type="submit" variant="soft" icon="plus" label="Add" disabled={!extra.trim()} />
      </form>
    </section>
  </div>
</Page>

{#if timer && timerAway && timerRecipe}
  <div class="away">
    <Layer level="front" edge="bottom" direction="horizontal" gap="sm" wrap={false} padding="xs">
      <span class="away__icon" aria-hidden="true"><Icon name="clock" size={16} /></span>
      <span class="away__text">
        <span class="away__what">{timerRecipe.name}</span>
        <DotMatrix
          value={clock(timer.left)}
          label="{Math.ceil(timer.left / 60)} minutes left"
          size="sm"
        />
      </span>
      <Button variant="glass" size="sm" label="Open" onclick={openTimer} />
    </Layer>
  </div>
{/if}

<DesignNotes title="Meal planner" {notes} corner="bottom-left" />

<style>
  .bar {
    position: sticky;
    top: var(--sticky-gap);
    z-index: var(--z-header);
    padding: 0 var(--gutter);
    margin-top: var(--sticky-gap);
  }
  .logo {
    display: grid;
    place-items: center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: var(--accent);
    color: var(--on-accent);
    flex-shrink: 0;
  }
  .bar__title {
    font-weight: var(--fw-semibold);
    font-size: var(--fs-lg);
    padding-right: var(--space-2);
  }
  .bar__week {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
  }
  .bar__range {
    display: inline-flex;
    gap: var(--space-2);
    min-width: 9rem;
    justify-content: center;
    font-variant-numeric: tabular-nums;
    color: var(--text-2);
    font-size: var(--fs-sm);
  }
  .bar__which {
    color: var(--text);
    font-weight: var(--fw-medium);
  }
  .grow {
    flex: 1;
  }

  .head {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    justify-content: space-between;
    gap: var(--space-1) var(--space-4);
    margin-bottom: var(--space-4);
    border-radius: var(--radius-md);
  }
  h1 {
    font-size: var(--fs-display);
    font-weight: var(--fw-medium);
    line-height: var(--leading-tight);
  }
  h2 {
    font-size: var(--fs-xl);
    font-weight: var(--fw-semibold);
  }
  h3 {
    margin-bottom: var(--space-3);
    color: var(--text-2);
    font-size: var(--fs-sm);
    font-weight: var(--fw-semibold);
  }
  .muted {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    color: var(--text-2);
    font-size: var(--fs-sm);
    border-radius: var(--radius-sm);
  }
  ul,
  ol {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  /* The week: seven day columns of three slots, with the meal names once at the left. */
  .week {
    --slot-h: 5.25rem;
    display: grid;
    grid-template-columns: 5.5rem repeat(7, minmax(0, 1fr));
    gap: var(--space-3);
  }
  .labels {
    display: grid;
    grid-template-rows: 2.75rem repeat(3, var(--slot-h));
    gap: var(--space-2);
    color: var(--text-2);
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
  }
  .labels span {
    align-self: center;
  }
  .day {
    display: grid;
    grid-template-rows: 2.75rem repeat(3, var(--slot-h));
    gap: var(--space-2);
    min-width: 0;
  }
  .day__head {
    display: flex;
    align-items: baseline;
    gap: var(--space-2);
    padding: var(--space-2) var(--space-1) 0;
  }
  .day__name {
    font-weight: var(--fw-semibold);
  }
  .day__date {
    color: var(--text-2);
    font-variant-numeric: tabular-nums;
  }
  .day__today {
    margin-left: auto;
    color: var(--accent-ink);
    font-size: var(--fs-xs);
    font-weight: var(--fw-semibold);
  }
  .today .day__head {
    border-bottom: 2px solid var(--accent);
  }
  .slot {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: var(--space-1);
    min-width: 0;
    padding: var(--space-3);
    border: 0;
    border-radius: var(--radius-lg);
    background: var(--soft-bg);
    box-shadow: var(--soft-shadow);
    color: var(--text);
    font: inherit;
    text-align: left;
    cursor: pointer;
    transition:
      background var(--motion-quick) var(--ease-out),
      box-shadow var(--motion-quick) var(--ease-out),
      transform var(--motion-quick) var(--ease-out);
  }
  button.slot:hover {
    background: var(--soft-bg-hover);
  }
  button.slot:active {
    box-shadow: var(--soft-shadow-pressed);
    transform: translateY(1px);
  }
  .slot[aria-pressed='true'] {
    background: var(--accent-soft);
    box-shadow:
      inset 0 0 0 1.5px var(--accent-border),
      var(--soft-shadow);
  }
  .slot:focus-visible,
  .slot__add:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
  }
  .slot__meal {
    display: none;
    color: var(--text-3);
    font-size: var(--fs-2xs);
    font-weight: var(--fw-semibold);
    letter-spacing: var(--tracking-caps);
    text-transform: uppercase;
  }
  .slot__name {
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    font-size: var(--fs-sm);
    font-weight: var(--fw-semibold);
    line-height: 1.3;
  }
  .slot__meta {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    color: var(--text-2);
    font-size: var(--fs-xs);
    font-variant-numeric: tabular-nums;
  }
  .slot--empty {
    align-items: center;
    justify-content: center;
    background: none;
    box-shadow: inset 0 0 0 1px var(--border);
    cursor: default;
  }
  /* Quiet at rest — an empty week should not shout twenty-one buttons — a soft key on hover. */
  .slot__add {
    display: grid;
    place-items: center;
    width: 36px;
    height: 36px;
    border: 0;
    border-radius: 50%;
    background: transparent;
    color: var(--text-3);
    cursor: pointer;
    transition:
      background var(--motion-quick) var(--ease-out),
      box-shadow var(--motion-quick) var(--ease-out),
      color var(--motion-quick) var(--ease-out);
  }
  .slot--empty:hover .slot__add,
  .slot__add[aria-expanded='true'] {
    background: var(--soft-bg);
    box-shadow: var(--soft-shadow);
    color: var(--accent-ink);
  }

  /* Recipe and shopping list side by side. */
  .work {
    display: grid;
    grid-template-columns: minmax(0, 1.6fr) minmax(18rem, 1fr);
    gap: var(--space-10);
    align-items: start;
  }
  .recipe-head {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--space-4);
  }
  .recipe-head h2 {
    margin: var(--space-1) 0;
    font-size: var(--fs-2xl);
  }
  .eyebrow {
    color: var(--accent-ink);
    font-size: var(--fs-xs);
    font-weight: var(--fw-semibold);
    letter-spacing: var(--tracking-caps);
    text-transform: uppercase;
  }
  .recipe-actions {
    display: flex;
    align-items: center;
    gap: var(--space-2);
  }
  .servings {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-3) var(--space-4);
  }
  .servings__label {
    font-weight: var(--fw-semibold);
  }
  .recipe-body {
    display: grid;
    grid-template-columns: minmax(12rem, 1fr) minmax(0, 1.6fr);
    gap: var(--space-8);
  }
  .ingredients li {
    display: grid;
    grid-template-columns: 4.5rem minmax(0, 1fr);
    gap: var(--space-3);
    padding: var(--space-2) 0;
    border-top: 1px solid var(--border);
  }
  .ing__qty {
    justify-self: start;
    margin-inline: calc(-1 * var(--space-1));
    padding: 0 var(--space-1);
    border-radius: var(--radius-sm);
    font-weight: var(--fw-semibold);
    font-variant-numeric: tabular-nums;
  }
  .steps {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }
  .step {
    display: grid;
    grid-template-columns: 1.75rem minmax(0, 1fr);
    gap: var(--space-3);
  }
  .step__n {
    display: grid;
    place-items: center;
    width: 1.75rem;
    height: 1.75rem;
    border-radius: 50%;
    background: var(--fill-muted);
    color: var(--text-2);
    font-size: var(--fs-xs);
    font-weight: var(--fw-semibold);
  }
  .step--live .step__n {
    background: var(--accent);
    color: var(--on-accent);
  }
  .step__body {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-2);
    padding-top: 2px;
    line-height: 1.5;
  }
  .timer {
    display: grid;
    grid-template-columns: auto auto;
    align-items: center;
    gap: var(--space-2) var(--space-5);
    margin-top: var(--space-1);
    color: var(--accent-ink);
    animation: bb-rise var(--motion-base) var(--ease-out);
  }
  .timer.done {
    color: var(--ok);
  }
  .timer__keys {
    display: flex;
    align-items: center;
    gap: var(--space-2);
  }
  .timer__note {
    grid-column: 1 / -1;
    color: var(--text-2);
    font-size: var(--fs-sm);
  }
  .timer.done .timer__note {
    color: var(--ok);
    font-weight: var(--fw-semibold);
  }

  /* Shopping list on the ground. */
  .shopping {
    display: flex;
    flex-direction: column;
    gap: var(--space-5);
    scroll-margin-top: calc(var(--page-top, 0px) + var(--space-4));
  }
  .shopping .head {
    margin-bottom: 0;
  }
  .aisle h3 {
    margin-bottom: var(--space-1);
  }
  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-3);
    padding: 0 var(--space-2);
    margin-inline: calc(-1 * var(--space-2));
    border-radius: var(--radius-md);
  }
  .item :global(.check) {
    min-height: var(--control-sm);
  }
  .item__qty {
    flex-shrink: 0;
    padding: 0 var(--space-1);
    border-radius: var(--radius-sm);
    color: var(--text-2);
    font-size: var(--fs-sm);
    font-variant-numeric: tabular-nums;
  }
  .item :global(.label) {
    transition: color var(--motion-base) var(--ease-out);
  }
  .item.got :global(.label) {
    color: var(--text-3);
    text-decoration: line-through;
  }
  .item.got .item__qty {
    color: var(--text-3);
  }
  .all-done {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    color: var(--ok);
    font-weight: var(--fw-semibold);
  }
  .extra {
    display: flex;
    gap: var(--space-2);
  }
  .extra :global(.input),
  .extra > :global(:first-child) {
    flex: 1;
  }

  /* The away pill: only while a timer runs for a recipe that is not open. */
  .away {
    position: sticky;
    bottom: var(--sticky-gap);
    z-index: var(--z-front);
    display: flex;
    justify-content: center;
    margin-top: calc(-1 * var(--space-12));
    padding-bottom: var(--sticky-gap);
    pointer-events: none;
    animation: bb-rise var(--motion-base) var(--ease-out);
  }
  .away > :global(*) {
    pointer-events: auto;
  }
  .away__icon {
    display: grid;
    place-items: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: var(--accent);
    color: var(--on-accent);
  }
  .away__text {
    display: inline-flex;
    align-items: center;
    gap: var(--space-3);
    padding-inline: var(--space-1);
  }
  .away__what {
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
  }

  @media (max-width: 1100px) {
    .work {
      grid-template-columns: minmax(0, 1fr);
    }
  }
  @media (max-width: 900px) {
    .week {
      grid-template-columns: minmax(0, 1fr);
      gap: var(--space-4);
    }
    .labels {
      display: none;
    }
    .day {
      grid-template-columns: 4rem repeat(3, minmax(0, 1fr));
      grid-template-rows: none;
      align-items: stretch;
    }
    .day__head {
      flex-direction: column;
      gap: 0;
      padding: var(--space-2) 0 0;
    }
    .day__today {
      margin-left: 0;
    }
    .today .day__head {
      border-bottom: 0;
      border-left: 2px solid var(--accent);
      padding-left: var(--space-2);
    }
    .slot {
      min-height: var(--slot-h);
    }
    .slot__meal {
      display: block;
    }
    .slot--empty {
      flex-direction: column;
    }
    .recipe-body {
      grid-template-columns: minmax(0, 1fr);
    }
  }
  @media (max-width: 520px) {
    .day {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    .day__head {
      grid-column: 1 / -1;
      flex-direction: row;
      gap: var(--space-2);
    }
    .bar__title {
      display: none;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .timer,
    .away {
      animation: none;
    }
  }
</style>
