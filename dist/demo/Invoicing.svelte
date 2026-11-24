<script lang="ts">
  /**
   * Example page: a small studio's invoices and cash flow. The figures (outstanding, overdue,
   * paid, days to pay), the cash-flow chart and who owes what all sit on the ground beside a
   * SideNav; the invoice table is the one panel. "New invoice" opens a draft row at the top of
   * that table, "Mark paid" turns the row green where it is and leaves Undo in the same cell,
   * and an overdue invoice is reminded from its own row. Storybook only.
   */
  import { tick } from 'svelte';
  import Badge from '../patterns/atoms/Badge.svelte';
  import Button from '../patterns/atoms/Button.svelte';
  import DotMatrix from '../patterns/atoms/DotMatrix.svelte';
  import Icon from '../patterns/atoms/Icon.svelte';
  import Input from '../patterns/atoms/Input.svelte';
  import Select from '../patterns/atoms/Select.svelte';
  import { changeCue } from '../patterns/atoms/changed';
  import EmptyState from '../patterns/molecules/EmptyState.svelte';
  import Field from '../patterns/molecules/Field.svelte';
  import KpiTile from '../patterns/molecules/KpiTile.svelte';
  import SearchField from '../patterns/molecules/SearchField.svelte';
  import SegmentedControl from '../patterns/molecules/SegmentedControl.svelte';
  import ChartCard from '../patterns/organisms/ChartCard.svelte';
  import DataTable, { type Column } from '../patterns/organisms/DataTable.svelte';
  import DivergingBarChart from '../patterns/organisms/DivergingBarChart.svelte';
  import SideNav from '../patterns/organisms/SideNav.svelte';
  import Section from '../patterns/layout/Section.svelte';
  import Page from '../patterns/templates/Page.svelte';
  import { greeting } from '../utils/delight';
  import { glide } from '../utils/motion';
  import DesignNotes, { type DesignNote } from './DesignNotes.svelte';
  import {
    TODAY,
    addDays,
    clients,
    day,
    daysBetween,
    digits,
    invoiceNav,
    invoiceSections,
    invoices as allInvoices,
    money,
    outgoings,
    studio,
    total,
    type Invoice,
  } from './mock-business';

  type Filter = 'all' | 'open' | 'overdue' | 'paid' | 'draft';

  interface Props {
    /** Which invoices the table shows. */
    filter?: Filter;
    /** Opens with the new-invoice row open. */
    creating?: boolean;
    /** Every invoice is paid: nothing is outstanding. */
    settled?: boolean;
  }

  let { filter: startFilter = 'open', creating = false, settled = false }: Props = $props();

  let invoices = $state<Invoice[]>(
    allInvoices.map((inv) => ({
      ...inv,
      lines: inv.lines.map((l) => ({ ...l })),
      ...(settled && inv.status !== 'paid'
        ? {
            status: 'paid' as const,
            issued: inv.issued || addDays(TODAY, -20),
            due: inv.due || addDays(TODAY, 10),
            paidOn: TODAY,
          }
        : {}),
    })),
  );
  // svelte-ignore state_referenced_locally
  let filter = $state<Filter>(startFilter);
  let section = $state('#invoices');
  let query = $state('');
  // svelte-ignore state_referenced_locally
  let drafting = $state(creating);
  let draft = $state({ client: '', project: '', amount: '', terms: 30 as 14 | 30 });
  let draftError = $state('');
  let draftForm = $state<HTMLFormElement | undefined>();
  let glow = $state<string | undefined>();
  /** Rows just paid, sent or added stay in view until the filter changes; paid and sent ones
   *  keep what they were before, for Undo. */
  let lingering = $state<Record<string, Invoice | null>>({});
  let reminding = $state<string | null>(null);
  // Timer handles only; nothing renders from them.
  // eslint-disable-next-line svelte/prefer-svelte-reactivity
  const timers = new Set<ReturnType<typeof setTimeout>>();

  $effect(() => () => timers.forEach(clearTimeout));

  const isOverdue = (inv: Invoice) => inv.status === 'sent' && inv.due < TODAY;
  const sum = (list: Invoice[]) => list.reduce((s, inv) => s + total(inv), 0);

  const open = $derived(invoices.filter((inv) => inv.status === 'sent'));
  const overdue = $derived(open.filter(isOverdue));
  const drafts = $derived(invoices.filter((inv) => inv.status === 'draft'));
  const paid = $derived(invoices.filter((inv) => inv.status === 'paid'));
  const paidThisMonth = $derived(paid.filter((inv) => (inv.paidOn ?? '') >= '2026-11-01'));
  const outstanding = $derived(sum(open));
  const daysToPay = $derived(
    paid.length
      ? Math.round(
          paid.reduce((s, inv) => s + daysBetween(inv.issued, inv.paidOn ?? TODAY), 0) /
            paid.length,
        )
      : 0,
  );
  const oldest = $derived(
    overdue.reduce((most, inv) => Math.max(most, daysBetween(inv.due, TODAY)), 0),
  );

  const matches: Record<Filter, (inv: Invoice) => boolean> = {
    all: () => true,
    open: (inv) => inv.status === 'sent',
    overdue: isOverdue,
    paid: (inv) => inv.status === 'paid',
    draft: (inv) => inv.status === 'draft',
  };

  const rows = $derived(
    invoices
      .filter((inv) => matches[filter](inv) || inv.id in lingering)
      .filter((inv) => {
        const q = query.trim().toLowerCase();
        return (
          !q ||
          inv.client.toLowerCase().includes(q) ||
          inv.project.toLowerCase().includes(q) ||
          inv.number.includes(q)
        );
      })
      .sort((a, b) => (b.issued || '9999').localeCompare(a.issued || '9999')),
  );

  // Eight weeks from this Monday: money expected in (open invoices by due date; overdue ones
  // count as this week) against money planned to go out.
  const WEEK0 = '2026-11-02';
  const weeks = $derived(
    outgoings.map((w, i) => {
      const due = open.filter(
        (inv) => Math.max(0, Math.floor(daysBetween(WEEK0, inv.due) / 7)) === i,
      );
      return {
        label: day(w.week),
        title: `Week of ${day(w.week)}`,
        up: sum(due),
        down: w.items.reduce((s, item) => s + item.amount, 0),
      };
    }),
  );
  const net = $derived(weeks.reduce((s, w) => s + w.up - w.down, 0));

  const owing = $derived(
    clients
      .map((c) => {
        const theirs = open.filter((inv) => inv.client === c.name);
        return { name: c.name, amount: sum(theirs), late: theirs.some(isOverdue) };
      })
      .filter((c) => c.amount > 0)
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5),
  );
  const owingMax = $derived(Math.max(1, ...owing.map((c) => c.amount)));

  // A narrow panel folds the number into the client cell and the status under the due date,
  // and the row actions become round keys, so nothing scrolls out of reach.
  let tableWidth = $state(1000);
  const compact = $derived(tableWidth < 880);
  const columns: Column[] = $derived(
    compact
      ? [
          { key: 'client', label: 'Client' },
          { key: 'due', label: 'Due', nowrap: true },
          { key: 'amount', label: 'Amount', align: 'end', nowrap: true },
          { key: 'actions', label: 'Actions', align: 'end', nowrap: true },
        ]
      : [
          { key: 'number', label: 'Invoice', nowrap: true },
          { key: 'client', label: 'Client' },
          { key: 'issued', label: 'Issued', nowrap: true },
          { key: 'due', label: 'Due', nowrap: true },
          { key: 'amount', label: 'Amount', align: 'end', nowrap: true },
          { key: 'status', label: 'Status', nowrap: true },
          { key: 'actions', label: 'Actions', align: 'end', nowrap: true },
        ],
  );

  const nav = $derived(
    invoiceNav({ open: open.length, overdue: overdue.length }).map((group) => ({
      ...group,
      items: group.items.map((item) => ({ ...item, active: item.href === section })),
    })),
  );

  async function shine(id: string) {
    glow = undefined;
    await tick();
    glow = id;
  }

  function setFilter(next: Filter) {
    filter = next;
    lingering = {};
  }

  function markPaid(inv: Invoice) {
    lingering[inv.id] = { ...inv };
    inv.status = 'paid';
    inv.paidOn = TODAY;
    void shine(inv.id);
  }

  function undo(inv: Invoice) {
    const before = lingering[inv.id];
    if (!before) return;
    inv.status = before.status;
    inv.paidOn = before.paidOn;
    inv.issued = before.issued;
    inv.due = before.due;
    delete lingering[inv.id];
    void shine(inv.id);
  }

  function send(inv: Invoice) {
    lingering[inv.id] = { ...inv };
    inv.status = 'sent';
    inv.issued = TODAY;
    inv.due = addDays(TODAY, 30);
    void shine(inv.id);
  }

  function remind(inv: Invoice) {
    reminding = inv.id;
    const timer = setTimeout(() => {
      timers.delete(timer);
      inv.reminded = TODAY;
      reminding = null;
    }, 900);
    timers.add(timer);
  }

  async function startDraft() {
    drafting = true;
    draftError = '';
    await tick();
    draftForm?.querySelector('select')?.focus();
  }

  function createInvoice(andSend: boolean) {
    const amount = Number(String(draft.amount).replace(/[^\d.]/g, ''));
    if (!draft.client) return (draftError = 'Pick who the invoice is for.');
    if (!amount) return (draftError = 'Enter the amount in euros.');
    const n = 42 + invoices.length - allInvoices.length;
    const inv: Invoice = {
      id: `inv-${n}`,
      number: `2026-${String(n).padStart(3, '0')}`,
      client: draft.client,
      email: clients.find((c) => c.name === draft.client)?.email ?? '',
      project: draft.project.trim() || 'Services',
      lines: [{ text: draft.project.trim() || 'Services', amount }],
      issued: andSend ? TODAY : '',
      due: andSend ? addDays(TODAY, draft.terms) : '',
      status: andSend ? 'sent' : 'draft',
    };
    invoices.unshift(inv);
    if (!matches[filter](inv)) lingering[inv.id] = null;
    draft = { client: '', project: '', amount: '', terms: 30 };
    drafting = false;
    void shine(inv.id);
  }

  function dueText(inv: Invoice) {
    if (inv.status === 'draft') return '—';
    if (inv.status === 'paid') return day(inv.due);
    const left = daysBetween(TODAY, inv.due);
    if (left < 0) return `${-left} ${-left === 1 ? 'day' : 'days'} late`;
    if (left === 0) return 'Today';
    return `in ${left} ${left === 1 ? 'day' : 'days'}`;
  }

  const hello = greeting(new Date(), studio.owner.split(' ')[0]);

  const notes: DesignNote[] = [
    {
      principle: 'function',
      title: 'What is owed, read in one look',
      body: 'Outstanding is the figure a studio lives by, so it is big and in dot-matrix digits; overdue, paid and days-to-pay sit beside it on the ground, set apart by hairlines, not cards.',
      target: '[data-note="summary"]',
    },
    {
      principle: 'locality',
      title: '“New invoice” opens at the top of the list',
      body: 'The draft row appears where the invoice will live, in the one panel. Saved, it stays there and glows — no dialog, no jump.',
      target: '[data-note="invoices"]',
    },
    {
      principle: 'locality',
      title: 'Mark paid, and Undo, in the same cell',
      body: 'The row turns green where it is and keeps its place until you change the filter; Undo replaces the button you just pressed, so the way back is where your pointer already is.',
      target: '[data-note="row-actions"]',
    },
    {
      principle: 'cues',
      title: 'One payment, every figure follows',
      body: 'Marking an invoice paid lowers Outstanding, raises Paid this month, shortens a bar in the cash-flow chart and the client’s line — each figure glows once as it changes.',
      target: '[data-note="cash"]',
    },
    {
      principle: 'friendly',
      title: 'Late is said in days, and chased from the row',
      body: '“6 days late” instead of a date to work out. Remind sends from the overdue row and answers there: “Reminded today”.',
      target: '[data-note="owing"]',
    },
  ];
</script>

{#snippet sidebar()}
  <SideNav
    groups={nav}
    label="Studio"
    onnavigate={(item, event) => {
      event.preventDefault();
      section = item.href;
    }}
  />
{/snippet}

{#snippet cell(inv: Invoice, column: Column)}
  {#if column.key === 'number'}
    <span class="num">{inv.number}</span>
  {:else if column.key === 'client'}
    <span class="client">
      <strong>{inv.client}</strong>
      <span class="muted">{compact ? `${inv.number} · ` : ''}{inv.project}</span>
    </span>
  {:else if column.key === 'issued'}
    <span class="muted">{inv.issued ? day(inv.issued) : 'Not sent'}</span>
  {:else if column.key === 'due'}
    <span class="due" class:late={isOverdue(inv)} use:changeCue={inv.due}>{dueText(inv)}</span>
    {#if compact}<span class="stacked">{@render status(inv)}</span>{/if}
  {:else if column.key === 'amount'}
    <span class="amount">{money(total(inv))}</span>
  {:else if column.key === 'status'}
    {@render status(inv)}
  {:else if column.key === 'actions'}
    <span class="actions" data-note={inv.id === 'inv-33' ? 'row-actions' : undefined}>
      {#if lingering[inv.id]}
        <Button
          variant="plain"
          size="sm"
          icon="undo"
          label="Undo"
          aria-label="Undo: {inv.number}"
          onclick={() => undo(inv)}
        />
      {:else if inv.status === 'draft'}
        <Button
          variant="soft"
          size="sm"
          icon="send"
          iconOnly={compact}
          label={compact ? `Send ${inv.number}` : 'Send'}
          onclick={() => send(inv)}
        />
      {:else if inv.status === 'sent'}
        {#if isOverdue(inv)}
          {#if inv.reminded === TODAY}
            <span class="reminded" in:glide={{ x: 6, speed: 'quick' }}
              ><Icon name="check" size={14} />Reminded today</span
            >
          {:else}
            <Button
              variant="soft"
              size="sm"
              icon="mail"
              iconOnly={compact}
              label={compact ? `Send a reminder for ${inv.number}` : 'Remind'}
              {...compact ? {} : { 'aria-label': `Send a reminder for ${inv.number}` }}
              busy={reminding === inv.id}
              busyLabel="Sending…"
              onclick={() => remind(inv)}
            />
          {/if}
        {/if}
        <Button
          variant="soft"
          size="sm"
          icon="check"
          iconOnly={compact}
          label={compact ? `Mark ${inv.number} paid` : 'Mark paid'}
          {...compact ? {} : { 'aria-label': `Mark ${inv.number} paid` }}
          onclick={() => markPaid(inv)}
        />
      {/if}
    </span>
  {/if}
{/snippet}

{#snippet status(inv: Invoice)}
  <span class="status" use:changeCue={inv.status}>
    {#if inv.status === 'paid'}
      <Badge tone="ok" icon="check" label="Paid {day(inv.paidOn ?? TODAY)}" />
    {:else if inv.status === 'draft'}
      <Badge label="Draft" />
    {:else if isOverdue(inv)}
      <Badge tone="danger" label="Overdue" />
    {:else}
      <Badge tone="info" label="Open" />
    {/if}
  </span>
{/snippet}

{#snippet detail(inv: Invoice)}
  <div class="detail">
    <table class="lines">
      <caption class="sr-only">Lines of invoice {inv.number}</caption>
      <tbody>
        {#each inv.lines as line, i (i)}
          <tr><td>{line.text}</td><td class="end">{money(line.amount)}</td></tr>
        {/each}
        <tr class="sum"><td>Total</td><td class="end">{money(total(inv))}</td></tr>
      </tbody>
    </table>
    <dl class="facts">
      <div>
        <dt>Billing contact</dt>
        <dd>{inv.email}</dd>
      </div>
      <div>
        <dt>Terms</dt>
        <dd>{inv.issued ? `${daysBetween(inv.issued, inv.due)} days` : '—'}</dd>
      </div>
      {#if inv.reminded}<div>
          <dt>Last reminder</dt>
          <dd>{day(inv.reminded)}</dd>
        </div>{/if}
    </dl>
  </div>
{/snippet}

<Page title="Invoices" subtitle={studio.name} {sidebar} sidebarWidth="13.5rem">
  {#if section !== '#invoices'}
    <EmptyState
      icon={invoiceSections[section]?.icon ?? 'home'}
      title="{invoiceSections[section]?.label} is not part of this example"
      message="The invoices show everything this page demonstrates."
      actionLabel="Back to invoices"
      onaction={() => (section = '#invoices')}
    />
  {:else}
    <section class="summary" data-note="summary" aria-label="Summary">
      <div class="hero">
        <span class="eyebrow">Outstanding</span>
        <span class="figure" use:changeCue={outstanding}>
          <span class="currency">€</span>
          <DotMatrix value={digits(outstanding)} label={money(outstanding)} size="xl" />
        </span>
        <span class="muted">
          {open.length}
          {open.length === 1 ? 'invoice' : 'invoices'} open{#if overdue.length}&nbsp;·&nbsp;<span
              class="late">{overdue.length} overdue</span
            >{/if}
        </span>
      </div>
      <KpiTile
        label="Overdue"
        value={money(sum(overdue))}
        detail={overdue.length
          ? `${overdue.length} invoices · oldest ${oldest} days`
          : 'None — lovely'}
      />
      <KpiTile
        label="Paid this month"
        value={money(sum(paidThisMonth))}
        detail="{paidThisMonth.length} invoices"
      />
      <KpiTile label="Days to pay" value={daysToPay} unit="days" detail="average, last 90 days" />
    </section>

    <div class="money">
      <div class="cash" data-note="cash">
        <ChartCard
          title="Cash flow, next 8 weeks"
          sub="Open invoices by due date against planned costs"
          value="{net >= 0 ? '+' : '−'}{money(Math.abs(net))} net"
          legend={[
            { label: 'Expected in', color: 'var(--accent)' },
            { label: 'Going out', color: 'var(--text-3)' },
          ]}
        >
          <DivergingBarChart
            data={weeks}
            height={200}
            upColor="var(--accent)"
            downColor="var(--text-3)"
            upLabel="Expected in"
            downLabel="Going out"
            shareLabel="In share"
            label="Cash flow per week"
            categoryLabel="Week"
          />
        </ChartCard>
      </div>

      <section class="owing" data-note="owing" aria-labelledby="owing-title">
        <h2 id="owing-title">Who owes the most</h2>
        {#if owing.length}
          <ul>
            {#each owing as c (c.name)}
              <li>
                <button type="button" class="owing__row" onclick={() => (query = c.name)}>
                  <span class="owing__name">
                    {c.name}
                    {#if c.late}<span class="late">· late</span>{/if}
                  </span>
                  <span class="owing__amount" use:changeCue={c.amount}>{money(c.amount)}</span>
                  <span class="owing__bar" style:--w="{(c.amount / owingMax) * 100}%"></span>
                </button>
              </li>
            {/each}
          </ul>
        {:else}
          <p class="muted">Nobody — every invoice is paid.</p>
        {/if}
      </section>
    </div>

    <div data-note="invoices" bind:clientWidth={tableWidth}>
      <Section
        level="panel"
        title="Invoices"
        description="{invoices.length} this year · {drafts.length} {drafts.length === 1
          ? 'draft'
          : 'drafts'}"
      >
        {#snippet actions()}
          {#if !drafting}
            <Button variant="primary" icon="plus" label="New invoice" onclick={startDraft} />
          {/if}
        {/snippet}

        <div class="tools">
          <SegmentedControl
            size="sm"
            label="Show"
            wrap
            value={filter}
            onchange={setFilter}
            options={[
              { value: 'open', label: `Open · ${open.length}` },
              { value: 'overdue', label: `Overdue · ${overdue.length}` },
              { value: 'draft', label: `Drafts · ${drafts.length}` },
              { value: 'paid', label: `Paid · ${paid.length}` },
              { value: 'all', label: 'All' },
            ]}
          />
          <SearchField
            label="Search invoices"
            placeholder="Client, project or number"
            size="sm"
            bind:value={query}
          />
        </div>

        {#if drafting}
          <form
            class="draft"
            bind:this={draftForm}
            in:glide={{ y: -8, speed: 'base' }}
            onsubmit={(event) => {
              event.preventDefault();
              createInvoice(true);
            }}
          >
            <Field label="Client" error={draftError && !draft.client ? draftError : undefined}>
              {#snippet children({ id, invalid })}
                <Select
                  {id}
                  size="sm"
                  aria-invalid={invalid || undefined}
                  bind:value={draft.client}
                  options={[
                    { value: '', label: 'Choose a client…' },
                    ...clients.map((c) => ({ value: c.name, label: c.name })),
                  ]}
                />
              {/snippet}
            </Field>
            <Field label="For">
              {#snippet children({ id })}
                <Input {id} size="sm" bind:value={draft.project} placeholder="e.g. Poster series" />
              {/snippet}
            </Field>
            <Field label="Amount (€)" error={draftError && draft.client ? draftError : undefined}>
              {#snippet children({ id, invalid })}
                <Input
                  {id}
                  size="sm"
                  {invalid}
                  inputmode="decimal"
                  bind:value={draft.amount}
                  placeholder="1,200"
                />
              {/snippet}
            </Field>
            <Field label="Payment terms" group>
              {#snippet children({ labelId })}
                <SegmentedControl
                  size="sm"
                  labelledby={labelId}
                  bind:value={draft.terms}
                  options={[
                    { value: 14, label: '14 days' },
                    { value: 30, label: '30 days' },
                  ]}
                />
              {/snippet}
            </Field>
            <div class="draft__actions">
              <Button
                type="submit"
                variant="primary"
                size="sm"
                icon="send"
                label="Create and send"
              />
              <Button
                variant="soft"
                size="sm"
                label="Save as draft"
                onclick={() => createInvoice(false)}
              />
              <Button variant="plain" size="sm" label="Cancel" onclick={() => (drafting = false)} />
            </div>
          </form>
        {/if}

        <DataTable
          {columns}
          {rows}
          rowKey={(inv) => inv.id}
          {cell}
          {detail}
          singleOpen
          highlight={glow}
          filtered={!!query.trim()}
          emptyIcon={filter === 'overdue' || filter === 'open' ? 'check-circle' : 'receipt'}
          emptyTitle={filter === 'open' || filter === 'overdue' ? `${hello.text}.` : undefined}
          emptyMessage={filter === 'overdue'
            ? 'Nothing is overdue. Every client paid on time.'
            : filter === 'open'
              ? `Nothing outstanding — every invoice is paid. ${hello.wink}`
              : filter === 'draft'
                ? 'No drafts. “New invoice” starts one.'
                : 'No invoices yet.'}
          emptyFilteredMessage="No invoice matches “{query.trim()}”."
        />
      </Section>
    </div>
  {/if}
</Page>

<DesignNotes title="Invoicing" {notes} corner="bottom-left" />

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
  .late {
    color: var(--danger);
  }

  .summary {
    display: grid;
    grid-template-columns: minmax(16rem, 1.4fr) repeat(3, minmax(0, 1fr));
    gap: var(--space-6);
    align-items: end;
  }
  .hero {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
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

  .money {
    display: grid;
    grid-template-columns: minmax(0, 2fr) minmax(16rem, 1fr);
    gap: var(--space-10);
    align-items: start;
  }
  .owing {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }
  .owing h2 {
    font-size: var(--fs-lg);
    font-weight: var(--fw-semibold);
  }
  .owing ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .owing__row {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: var(--space-1) var(--space-3);
    width: 100%;
    padding: var(--space-2) var(--space-2);
    margin-inline: calc(var(--space-2) * -1);
    width: calc(100% + 2 * var(--space-2));
    border: 0;
    border-top: 1px solid var(--border);
    border-radius: 0;
    background: none;
    color: inherit;
    font: inherit;
    text-align: left;
    cursor: pointer;
    transition: background-color var(--motion-quick) var(--ease-out);
  }
  .owing__row:hover {
    background: var(--fill-hover);
    border-radius: var(--radius-sm);
  }
  .owing__row:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
    border-radius: var(--radius-sm);
  }
  .owing__name {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: var(--fs-sm);
  }
  .owing__amount {
    padding: 0 4px;
    margin-right: -4px;
    border-radius: var(--radius-xs);
    font-size: var(--fs-sm);
    font-weight: var(--fw-semibold);
    font-variant-numeric: tabular-nums;
  }
  .owing__bar {
    grid-column: 1 / -1;
    height: 4px;
    border-radius: var(--radius-pill);
    background:
      linear-gradient(var(--accent), var(--accent)) 0 0 / var(--w) 100% no-repeat,
      var(--fill-muted);
    transition: background-size var(--motion-slow) var(--ease-in-out);
  }

  .tools {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-3);
  }
  .tools :global(.search) {
    width: min(18rem, 100%);
  }

  .draft {
    display: grid;
    grid-template-columns: minmax(10rem, 1.2fr) minmax(10rem, 1.4fr) minmax(7rem, 0.8fr) auto;
    gap: var(--space-3);
    align-items: end;
    padding: var(--space-4);
    border-radius: var(--radius-lg);
    background: var(--layer-selected-bg);
    border: 1px solid var(--layer-selected-border);
    transform-origin: top right;
  }
  .draft__actions {
    grid-column: 1 / -1;
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
  }

  .num {
    font-variant-numeric: tabular-nums;
    color: var(--text-2);
  }
  .client {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }
  .client strong {
    font-weight: var(--fw-medium);
  }
  .due,
  .status {
    display: inline-flex;
    padding: 1px 4px;
    margin: -1px -4px;
    border-radius: var(--radius-sm);
  }
  .due {
    font-variant-numeric: tabular-nums;
  }
  .due.late {
    color: var(--danger);
    font-weight: var(--fw-medium);
  }
  .stacked {
    display: flex;
    margin-top: var(--space-1);
  }
  .amount {
    font-weight: var(--fw-semibold);
    font-variant-numeric: tabular-nums;
  }
  .actions {
    display: inline-flex;
    justify-content: flex-end;
    gap: var(--space-2);
  }
  .reminded {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    /* Green pulled towards the text colour: darker on light, lighter on dark. */
    color: color-mix(in srgb, var(--ok) 78%, var(--text));
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
  }

  .detail {
    display: grid;
    grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
    gap: var(--space-6);
    padding: var(--space-2) 0 var(--space-3);
  }
  .lines {
    width: 100%;
    border-collapse: collapse;
    font-size: var(--fs-sm);
  }
  .lines td {
    padding: var(--space-1) 0;
    border-bottom: 1px solid var(--border);
  }
  .lines .end {
    text-align: right;
    font-variant-numeric: tabular-nums;
  }
  .lines .sum td {
    border-bottom: 0;
    font-weight: var(--fw-semibold);
  }
  .facts {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    margin: 0;
  }
  .facts dt {
    color: var(--text-3);
    font-size: var(--fs-xs);
  }
  .facts dd {
    margin: 0;
    font-size: var(--fs-sm);
  }

  @media (max-width: 1280px) {
    .summary {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    .hero {
      grid-column: 1 / -1;
    }
  }
  @media (max-width: 1100px) {
    .money {
      grid-template-columns: minmax(0, 1fr);
      gap: var(--space-8);
    }
    .draft {
      grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    }
  }
  @media (max-width: 640px) {
    .summary {
      grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    }
    .draft,
    .detail {
      grid-template-columns: minmax(0, 1fr);
    }
  }
</style>
