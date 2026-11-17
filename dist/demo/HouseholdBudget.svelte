<script lang="ts">
  /**
   * Example page: a household's month, payday to payday. The one figure the page is read for —
   * what is left until payday — sits on the ground in dot-matrix digits; spending by category,
   * the shared balance and the bills still to come sit beside it on the ground too. One panel
   * holds the spending list, and a new expense is added at its top, where it will land. Settling
   * up between the two happens at the balance, with Undo right there. A personal tracker only —
   * it records, it does not advise. Storybook only.
   */
  import Avatar from '../patterns/atoms/Avatar.svelte';
  import Button from '../patterns/atoms/Button.svelte';
  import Checkbox from '../patterns/atoms/Checkbox.svelte';
  import DotMatrix from '../patterns/atoms/DotMatrix.svelte';
  import Icon from '../patterns/atoms/Icon.svelte';
  import Input from '../patterns/atoms/Input.svelte';
  import ProgressBar from '../patterns/atoms/ProgressBar.svelte';
  import Select from '../patterns/atoms/Select.svelte';
  import { changeCue, flashChanged } from '../patterns/atoms/changed';
  import EmptyState from '../patterns/molecules/EmptyState.svelte';
  import Field from '../patterns/molecules/Field.svelte';
  import KpiTile from '../patterns/molecules/KpiTile.svelte';
  import SegmentedControl from '../patterns/molecules/SegmentedControl.svelte';
  import Layer from '../patterns/layout/Layer.svelte';
  import Page from '../patterns/templates/Page.svelte';
  import { tick } from 'svelte';
  import DesignNotes, { type DesignNote } from './DesignNotes.svelte';
  import {
    bills as allBills,
    budgetPeriod,
    categories,
    expenses as allExpenses,
    income,
    people,
    type CategoryId,
    type Expense,
    type PersonId,
  } from './mock-private';

  interface Props {
    /** Opens with the new-expense row already open at the top of the list. */
    adding?: boolean;
    /** Opens with the two already square (the balance settled). */
    settled?: boolean;
  }

  let { adding: startAdding = false, settled = false }: Props = $props();

  interface Settlement {
    id: string;
    from: PersonId;
    to: PersonId;
    amount: number;
  }

  const euro = new Intl.NumberFormat('en', { style: 'currency', currency: 'EUR' });
  const plain = new Intl.NumberFormat('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const MONTHS = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const day = (iso: string) => {
    const [, m, d] = iso.split('-').map(Number);
    return `${d} ${MONTHS[(m ?? 1) - 1]}`;
  };
  const dayCount = (from: string, to: string) =>
    Math.round((Date.parse(to) - Date.parse(from)) / 86_400_000);
  const round = (n: number) => Math.round(n * 100) / 100;
  const other = (who: PersonId): PersonId => (who === 'robin' ? 'sam' : 'robin');

  let expenses = $state<Expense[]>(allExpenses.map((e) => ({ ...e })));
  let bills = $state(allBills.map((b) => ({ ...b })));
  let settlements = $state<Settlement[]>([]);
  let filter = $state<CategoryId | null>(null);
  // svelte-ignore state_referenced_locally
  let adding = $state(startAdding);
  let justSettled = $state<Settlement | null>(null);

  // The new-expense row.
  let draftLabel = $state('');
  let draftAmount = $state<number | null>(null);
  let draftCategory = $state<string>('groceries');
  let draftPaidBy = $state<PersonId>('robin');
  let draftShared = $state(true);
  let tried = $state(false);
  let list = $state<HTMLElement | undefined>();

  const totalIn = income.reduce((sum, i) => sum + i.amount, 0);
  const spent = $derived(round(expenses.reduce((sum, e) => sum + e.amount, 0)));
  const billsPaid = $derived(bills.filter((b) => b.paid).reduce((sum, b) => sum + b.amount, 0));
  const beforePayday = (iso: string) => iso < budgetPeriod.payday;
  const billsDue = $derived(
    bills.filter((b) => !b.paid && beforePayday(b.due)).reduce((sum, b) => sum + b.amount, 0),
  );
  const left = $derived(round(totalIn - spent - billsPaid - billsDue));
  const daysLeft = dayCount(budgetPeriod.today, budgetPeriod.payday);
  const perDay = $derived(left / daysLeft);

  const byCategory = $derived(
    categories.map((c) => {
      const used = round(
        expenses.filter((e) => e.category === c.id).reduce((s, e) => s + e.amount, 0),
      );
      return { ...c, used, rest: round(c.budget - used) };
    }),
  );

  /** What Sam owes Robin (negative: Robin owes Sam), unrounded — halves of odd cents add up,
   *  so settling uses this and only the display rounds. */
  const owedToRobin = $derived.by(() => {
    let n = 0;
    for (const e of expenses) {
      if (!e.shared) continue;
      n += e.paidBy === 'robin' ? e.amount / 2 : -e.amount / 2;
    }
    for (const s of settlements) n += s.from === 'sam' ? -s.amount : s.amount;
    return Math.abs(n) < 0.005 ? 0 : n;
  });
  const debtor = $derived<PersonId>(owedToRobin >= 0 ? 'sam' : 'robin');
  const owedRaw = $derived(Math.abs(owedToRobin));
  const owed = $derived(round(owedRaw));
  const sharedCount = $derived(expenses.filter((e) => e.shared).length);

  const shown = $derived(filter ? expenses.filter((e) => e.category === filter) : expenses);
  const filterLabel = $derived(categories.find((c) => c.id === filter)?.label);
  const upcoming = $derived(bills.filter((b) => b.due >= budgetPeriod.today));
  const earlier = $derived(bills.filter((b) => b.due < budgetPeriod.today));

  // svelte-ignore state_referenced_locally
  if (settled) settlements = [{ id: 'start', from: debtor, to: other(debtor), amount: owedRaw }];

  const amountError = $derived(
    tried && !(typeof draftAmount === 'number' && draftAmount > 0)
      ? 'How much was it? A number above zero.'
      : undefined,
  );
  const labelError = $derived(
    tried && !draftLabel.trim() ? 'A few words, so you both know what it was.' : undefined,
  );

  function resetDraft() {
    draftLabel = '';
    draftAmount = null;
    draftCategory = filter ?? 'groceries';
    draftPaidBy = 'robin';
    draftShared = true;
    tried = false;
  }

  function openDraft() {
    resetDraft();
    adding = true;
  }

  async function save(event: SubmitEvent) {
    event.preventDefault();
    tried = true;
    if (labelError || amountError || typeof draftAmount !== 'number') return;
    const entry: Expense = {
      id: `n${Date.now()}`,
      date: budgetPeriod.today,
      label: draftLabel.trim(),
      category: draftCategory as CategoryId,
      amount: round(draftAmount),
      paidBy: draftPaidBy,
      shared: draftShared,
    };
    expenses = [entry, ...expenses];
    if (filter && filter !== entry.category) filter = null;
    adding = false;
    resetDraft();
    // The new row glows where it landed: the top of the list it was added to.
    await tick();
    const row = list?.querySelector<HTMLElement>(`[data-id="${entry.id}"]`);
    if (row) flashChanged(row);
  }

  function settle() {
    if (owedRaw === 0) return;
    const s: Settlement = {
      id: `s${Date.now()}`,
      from: debtor,
      to: other(debtor),
      amount: owedRaw,
    };
    settlements = [...settlements, s];
    justSettled = s;
  }

  function undoSettle() {
    if (!justSettled) return;
    const id = justSettled.id;
    settlements = settlements.filter((s) => s.id !== id);
    justSettled = null;
  }

  function toggleCategory(id: CategoryId) {
    filter = filter === id ? null : id;
  }

  const notes: DesignNote[] = [
    {
      principle: 'function',
      title: 'The one number, big and on the ground',
      body: 'What is left until payday — after the bills still due — is what this page is opened for. It is a dot-matrix readout with the days to go and a daily figure under it; no card around it.',
      target: '[data-note="left"]',
    },
    {
      principle: 'locality',
      title: 'A new expense starts where it will land',
      body: 'The list is newest first, so “Add expense” is its first row. The form opens in that row, and the saved expense takes its place and glows once.',
      target: '[data-note="add"]',
    },
    {
      principle: 'cues',
      title: 'Every figure that moves glows',
      body: 'Save a grocery run and the remaining amount, the money out and the groceries bar all glow once — cause and effect, without a toast.',
      target: '[data-note="categories"]',
    },
    {
      principle: 'friendly',
      title: 'Settling up is undoable, right at the balance',
      body: 'It says who owes whom in plain words. “Settle up” turns it into “All square”, and the Undo sits in that same sentence instead of a corner toast.',
      target: '[data-note="settle"]',
    },
    {
      principle: 'locality',
      title: 'Each bill is ticked off on its own line',
      body: 'A round soft key per bill: pressed, it stays tinted and the line says paid. Paying one early that falls after payday lowers what is left, and that figure tells you.',
      target: '[data-note="bills"]',
    },
  ];
</script>

<Page title="Household" subtitle="{budgetPeriod.label} · Robin & Sam" width="wide" gap="xl">
  <div class="top">
    <section class="left" data-note="left" aria-labelledby="left-title">
      <h2 id="left-title" class="eyebrow">Left until payday</h2>
      <p class="left__figure" class:low={left < 0} use:changeCue={left}>
        <span class="left__cur" aria-hidden="true">€</span><DotMatrix
          value={plain.format(left)}
          label={euro.format(left)}
          size="inherit"
        />
      </p>
      <p class="left__sub">
        {daysLeft} days to go · about
        <strong use:changeCue={Math.round(perDay)}>{euro.format(Math.max(0, perDay))}</strong> a day
      </p>
    </section>
    <div class="figures" aria-label="This period">
      <KpiTile
        label="Money in"
        value={euro.format(totalIn)}
        detail="Two salaries and one sale"
        icon="coins"
      />
      <KpiTile
        label="Money out"
        value={euro.format(spent + billsPaid)}
        detail="{expenses.length} expenses · {bills.filter((b) => b.paid).length} bills"
        icon="wallet"
      />
      <KpiTile
        label="Bills still due"
        value={euro.format(billsDue)}
        detail="Before payday on {day(budgetPeriod.payday)}"
        icon="receipt"
      />
    </div>
  </div>

  <div class="grid">
    <div class="main">
      <section aria-labelledby="cat-title" data-note="categories">
        <div class="head">
          <h2 id="cat-title">By category</h2>
          <span class="muted"
            >{filter ? 'Showing one category below' : 'Pick one to see its spending'}</span
          >
        </div>
        <ul class="cats">
          {#each byCategory as c (c.id)}
            <li>
              <button
                type="button"
                class="cat"
                aria-pressed={filter === c.id}
                onclick={() => toggleCategory(c.id)}
              >
                <span class="cat__name"><Icon name={c.icon} size={16} />{c.label}</span>
                <span class="cat__rest" class:over={c.rest < 0} use:changeCue={c.used}>
                  {c.rest < 0 ? `${euro.format(-c.rest)} over` : `${euro.format(c.rest)} left`}
                </span>
                <!-- The button's own text already says it; the bar is the picture of it. -->
                <span class="cat__bar" aria-hidden="true">
                  <ProgressBar
                    value={Math.min(c.used, c.budget)}
                    max={c.budget}
                    size="sm"
                    label="{c.label}: {euro.format(c.used)} of {euro.format(c.budget)}"
                    tone={c.used > c.budget
                      ? 'danger'
                      : c.used > c.budget * 0.8
                        ? 'warn'
                        : 'accent'}
                  />
                </span>
                <span class="cat__of">{euro.format(c.used)} of {euro.format(c.budget)}</span>
              </button>
            </li>
          {/each}
        </ul>
      </section>

      <Layer level="panel" padding="lg" gap="sm" as="section" aria-labelledby="spend-title">
        <div class="head head--flush">
          <h2 id="spend-title">
            Spending{#if filterLabel}<span class="muted filter-name">· {filterLabel}</span>{/if}
          </h2>
          {#if filter}
            <Button
              variant="plain"
              size="sm"
              icon="close"
              label="Show all"
              onclick={() => (filter = null)}
            />
          {/if}
        </div>

        <ul class="spend" bind:this={list}>
          <li class="add" data-note="add">
            {#if adding}
              <form class="draft" onsubmit={save} aria-label="New expense" novalidate>
                <div class="draft__row">
                  <Field label="What was it?" error={labelError}>
                    {#snippet children({ id, errorId, invalid })}
                      <Input
                        {id}
                        bind:value={draftLabel}
                        placeholder="e.g. Weekly shop"
                        {invalid}
                        aria-describedby={invalid ? errorId : undefined}
                        autofocus
                      />
                    {/snippet}
                  </Field>
                  <Field label="Amount, €" error={amountError}>
                    {#snippet children({ id, errorId, invalid })}
                      <Input
                        {id}
                        type="number"
                        inputmode="decimal"
                        min="0"
                        step="0.01"
                        bind:value={draftAmount}
                        placeholder="0.00"
                        {invalid}
                        aria-describedby={invalid ? errorId : undefined}
                      />
                    {/snippet}
                  </Field>
                  <Field label="Category">
                    {#snippet children({ id })}
                      <Select
                        {id}
                        bind:value={draftCategory}
                        options={categories.map((c) => ({ value: c.id, label: c.label }))}
                      />
                    {/snippet}
                  </Field>
                </div>
                <div class="draft__row draft__row--end">
                  <div class="paid-by">
                    <span class="muted" id="paid-by">Paid by</span>
                    <SegmentedControl
                      labelledby="paid-by"
                      size="sm"
                      bind:value={draftPaidBy}
                      options={[
                        { value: 'robin', label: people.robin.short },
                        { value: 'sam', label: people.sam.short },
                      ]}
                    />
                  </div>
                  <Checkbox bind:checked={draftShared} label="Split half and half" />
                  <span class="spacer"></span>
                  <Button variant="plain" label="Cancel" onclick={() => (adding = false)} />
                  <Button type="submit" variant="primary" icon="check" label="Save expense" />
                </div>
              </form>
            {:else}
              <button type="button" class="add__open" onclick={openDraft}>
                <span class="add__icon"><Icon name="plus" size={16} /></span>
                Add expense
                <span class="muted">· lands here, at the top</span>
              </button>
            {/if}
          </li>
          {#each shown as e (e.id)}
            {@const cat = categories.find((c) => c.id === e.category)}
            <li class="row" data-id={e.id}>
              <span class="row__date">{day(e.date)}</span>
              <span class="row__what">
                <span class="row__label">{e.label}</span>
                <span class="row__meta">
                  {#if cat}<Icon name={cat.icon} size={13} />{cat.label}{/if}
                  {#if e.shared}· split{/if}
                </span>
              </span>
              <span class="row__who" title="Paid by {people[e.paidBy].name}">
                <Avatar name={people[e.paidBy].name} size={24} color="auto" />
                <span class="row__who-name">{people[e.paidBy].short}</span>
              </span>
              <span class="row__amount">{euro.format(e.amount)}</span>
            </li>
          {:else}
            <li>
              <EmptyState
                compact
                icon="sparkles"
                message="Nothing spent on {filterLabel?.toLowerCase()} yet this month. Nicely done."
              />
            </li>
          {/each}
        </ul>
      </Layer>
    </div>

    <div class="side">
      <section class="shared" aria-labelledby="shared-title" data-note="settle">
        <div class="head">
          <h2 id="shared-title">Shared</h2>
          <span class="muted">{sharedCount} split expenses</span>
        </div>
        <div class="pair" aria-hidden="true">
          <Avatar name={people[debtor].name} size={40} color="auto" />
          <span class="pair__line" class:even={owed === 0}
            ><Icon name="arrow-right" size={16} /></span
          >
          <Avatar name={people[other(debtor)].name} size={40} color="auto" />
        </div>
        {#if owed > 0}
          <p class="owe" use:changeCue={owed}>
            <span>{people[debtor].short} owes {people[other(debtor)].short}</span>
            <strong class="owe__amount">{euro.format(owed)}</strong>
          </p>
          <p class="muted small">
            Half of everything marked split, minus what was already paid back.
          </p>
          <div>
            <Button
              variant="tinted"
              icon="check"
              label="Settle up {euro.format(owed)}"
              onclick={settle}
            />
          </div>
        {:else}
          <p class="owe owe--even" use:changeCue={owed}>
            <span>All square</span>
            <strong class="owe__amount">{euro.format(0)}</strong>
          </p>
          <div class="settled" role="status">
            {#if justSettled}
              <p class="muted small">
                {people[justSettled.from].short} paid {people[justSettled.to].short}
                {euro.format(justSettled.amount)}. Nobody owes anybody.
              </p>
              <div>
                <Button variant="soft" size="sm" icon="undo" label="Undo" onclick={undoSettle} />
              </div>
            {:else}
              <p class="muted small">Nobody owes anybody. Enjoy it.</p>
            {/if}
          </div>
        {/if}
      </section>

      <section aria-labelledby="bills-title" data-note="bills">
        <div class="head">
          <h2 id="bills-title">Coming up</h2>
          <span class="muted">Bills until the end of the month</span>
        </div>
        <ul class="bills">
          {#each upcoming as b (b.id)}
            <li class="bill" class:paid={b.paid}>
              <Button
                variant="soft"
                size="md"
                icon={b.paid ? 'check' : b.icon}
                label="{b.label} paid"
                iconOnly
                aria-pressed={b.paid}
                onclick={() => (b.paid = !b.paid)}
              />
              <span class="bill__what">
                <span class="bill__label">{b.label}</span>
                <span class="bill__due">
                  {#if b.paid}Paid{:else}Due {day(b.due)}{/if}
                  {#if !beforePayday(b.due)}· after payday{/if}
                </span>
              </span>
              <span class="bill__amount">{euro.format(b.amount)}</span>
            </li>
          {/each}
        </ul>
        <p class="muted small">
          Already paid this period: <strong class="paid-sum"
            >{euro.format(earlier.reduce((s, b) => s + b.amount, 0))}</strong
          >
          for {earlier.map((b) => b.label.toLowerCase()).join(', ')}.
        </p>
      </section>
    </div>
  </div>
</Page>

<DesignNotes title="Household budget" {notes} corner="bottom-right" />

<style>
  .top {
    display: grid;
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 1.4fr);
    gap: var(--space-8);
    align-items: end;
  }
  .eyebrow {
    color: var(--text-2);
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
  }
  .left__figure {
    display: inline-flex;
    align-items: baseline;
    gap: var(--space-2);
    width: fit-content;
    margin: var(--space-3) calc(-1 * var(--space-2)) var(--space-2);
    padding: var(--space-1) var(--space-2);
    border-radius: var(--radius-md);
    font-size: calc(var(--fs-display) * 1.5);
    color: var(--text);
  }
  .left__figure.low {
    color: var(--danger);
  }
  .left__cur {
    font-size: var(--fs-3xl);
    font-weight: var(--fw-medium);
    color: var(--text-2);
  }
  .left__sub {
    color: var(--text-2);
    font-size: var(--fs-md);
  }
  .left__sub strong {
    color: var(--text);
    font-weight: var(--fw-semibold);
    border-radius: var(--radius-sm);
  }
  .figures {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: var(--space-6);
  }

  .grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(18rem, 22rem);
    gap: var(--space-10);
    align-items: start;
  }
  .main,
  .side {
    display: flex;
    flex-direction: column;
    gap: var(--space-10);
    min-width: 0;
  }
  .head {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    justify-content: space-between;
    gap: var(--space-1) var(--space-4);
    margin-bottom: var(--space-4);
  }
  .head--flush {
    margin-bottom: 0;
  }
  h2 {
    font-size: var(--fs-xl);
    font-weight: var(--fw-semibold);
  }
  .muted {
    color: var(--text-2);
    font-size: var(--fs-sm);
    font-weight: var(--fw-regular);
  }
  .filter-name {
    margin-left: var(--space-2);
  }
  .small {
    font-size: var(--fs-sm);
    line-height: 1.5;
  }
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  /* Categories: rows on the ground; a pressed one filters the list right under it. */
  .cats {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
    gap: var(--space-2) var(--space-6);
  }
  .cat {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: var(--space-2) var(--space-3);
    padding: var(--space-3);
    margin-inline: calc(-1 * var(--space-3));
    width: calc(100% + 2 * var(--space-3));
    border: 0;
    border-radius: var(--radius-lg);
    background: transparent;
    color: var(--text);
    font: inherit;
    text-align: left;
    cursor: pointer;
    transition: background var(--motion-quick) var(--ease-out);
  }
  .cat:hover {
    background: var(--fill-hover);
  }
  .cat[aria-pressed='true'] {
    background: var(--accent-faint);
    box-shadow: inset 0 0 0 1px var(--accent-border);
  }
  .cat:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
  }
  .cat__bar {
    display: block;
    grid-column: 1 / -1;
  }
  .cat__name {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    font-weight: var(--fw-medium);
  }
  .cat__name :global(.icon) {
    color: var(--text-3);
  }
  .cat__rest {
    padding: 0 var(--space-1);
    border-radius: var(--radius-sm);
    color: var(--text-2);
    font-size: var(--fs-sm);
    font-variant-numeric: tabular-nums;
  }
  .cat__rest.over {
    color: var(--danger);
    font-weight: var(--fw-semibold);
  }
  .cat__of {
    grid-column: 1 / -1;
    color: var(--text-3);
    font-size: var(--fs-xs);
    font-variant-numeric: tabular-nums;
  }

  /* Spending list: hairlines between rows, the add row first. */
  .spend > li + li {
    border-top: 1px solid var(--border);
  }
  .add__open {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    width: 100%;
    padding: var(--space-3) 0;
    border: 0;
    background: none;
    color: var(--accent-ink);
    font: inherit;
    font-weight: var(--fw-semibold);
    text-align: left;
    cursor: pointer;
  }
  .add__open:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
    border-radius: var(--radius-md);
  }
  .add__icon {
    display: grid;
    place-items: center;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: var(--soft-bg);
    box-shadow: var(--soft-shadow);
  }
  .add__open:hover .add__icon {
    background: var(--soft-bg-hover);
  }
  .draft {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    margin-bottom: var(--space-3);
    padding: var(--space-4);
    border-radius: var(--radius-lg);
    background: var(--fill-subtle);
    transform-origin: top center;
    animation: bb-rise var(--motion-base) var(--ease-out);
  }
  .draft__row {
    display: grid;
    grid-template-columns: minmax(0, 2fr) minmax(0, 1fr) minmax(0, 1.2fr);
    gap: var(--space-3);
    align-items: start;
  }
  .draft__row--end {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-3) var(--space-5);
  }
  .paid-by {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
  }
  .spacer {
    flex: 1;
  }
  .row {
    display: grid;
    grid-template-columns: 4rem minmax(0, 1fr) auto 6.5rem;
    align-items: center;
    gap: var(--space-4);
    padding: var(--space-3) var(--space-2);
    margin-inline: calc(-1 * var(--space-2));
    border-radius: var(--radius-md);
  }
  .row__date {
    color: var(--text-2);
    font-size: var(--fs-sm);
    font-variant-numeric: tabular-nums;
  }
  .row__what {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }
  .row__label {
    font-weight: var(--fw-medium);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .row__meta {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    color: var(--text-3);
    font-size: var(--fs-xs);
  }
  .row__who {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    color: var(--text-2);
    font-size: var(--fs-sm);
  }
  .row__amount {
    text-align: right;
    font-weight: var(--fw-semibold);
    font-variant-numeric: tabular-nums;
  }

  /* Shared balance */
  .shared {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }
  .shared .head {
    margin-bottom: var(--space-1);
  }
  .pair {
    display: flex;
    align-items: center;
    gap: var(--space-3);
  }
  .pair__line {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 4rem;
    height: 2px;
    border-radius: 1px;
    background: var(--accent);
    color: var(--accent-ink);
    transition:
      background var(--motion-base) var(--ease-out),
      width var(--motion-slow) var(--ease-out);
  }
  .pair__line :global(.icon) {
    margin-right: -8px;
  }
  .pair__line.even {
    width: 2rem;
    background: var(--border-strong);
    color: transparent;
  }
  .owe {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    width: fit-content;
    margin-inline: calc(-1 * var(--space-2));
    padding: var(--space-1) var(--space-2);
    border-radius: var(--radius-md);
    font-size: var(--fs-md);
    color: var(--text-2);
  }
  .owe__amount {
    color: var(--text);
    font-size: var(--fs-3xl);
    font-weight: var(--fw-semibold);
    font-variant-numeric: tabular-nums;
    line-height: var(--leading-tight);
  }
  .owe--even .owe__amount {
    color: var(--ok);
  }

  .paid-sum {
    color: var(--text);
    font-weight: var(--fw-semibold);
  }

  .settled {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }

  /* Bills */
  .bills {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    margin-bottom: var(--space-4);
  }
  .bill {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) auto;
    align-items: center;
    gap: var(--space-3);
  }
  .bill__what {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }
  .bill__label {
    font-weight: var(--fw-medium);
  }
  .bill__due {
    color: var(--text-2);
    font-size: var(--fs-xs);
  }
  .bill__amount {
    font-variant-numeric: tabular-nums;
    font-weight: var(--fw-semibold);
  }
  .bill.paid .bill__label,
  .bill.paid .bill__amount {
    color: var(--text-3);
  }
  .bill.paid .bill__due {
    color: var(--ok);
    font-weight: var(--fw-medium);
  }

  @media (max-width: 1100px) {
    .top {
      grid-template-columns: minmax(0, 1fr);
      gap: var(--space-6);
    }
    .grid {
      grid-template-columns: minmax(0, 1fr);
    }
    .side {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
      gap: var(--space-8);
    }
  }
  @media (max-width: 720px) {
    .figures {
      grid-template-columns: minmax(0, 1fr);
      gap: var(--space-4);
    }
    .draft__row {
      grid-template-columns: minmax(0, 1fr);
    }
    .row {
      grid-template-columns: minmax(0, 1fr) auto;
      gap: var(--space-1) var(--space-3);
    }
    .row__date {
      grid-column: 1 / -1;
      font-size: var(--fs-xs);
    }
    .row__who {
      display: none;
    }
  }
  @media (max-width: 520px) {
    .left__figure {
      font-size: var(--fs-display);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .draft {
      animation: none;
    }
  }
</style>
