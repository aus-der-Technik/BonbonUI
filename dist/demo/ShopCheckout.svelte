<script lang="ts">
  /**
   * Example page: the checkout of a small shop — CheckoutSteps on top (cart → shipping →
   * payment → done), the step's form on the left and the order summary beside it. Errors appear
   * under the field they are about, and the first one gets the focus (Storybook only; ShopFlow
   * passes in the cart from the storefront).
   */
  import { tick } from 'svelte';
  import type { HTMLInputAttributes } from 'svelte/elements';
  import Button from '../patterns/atoms/Button.svelte';
  import Icon from '../patterns/atoms/Icon.svelte';
  import Input from '../patterns/atoms/Input.svelte';
  import CartLine from '../patterns/molecules/CartLine.svelte';
  import CheckoutSteps from '../patterns/molecules/CheckoutSteps.svelte';
  import EmptyState from '../patterns/molecules/EmptyState.svelte';
  import Field from '../patterns/molecules/Field.svelte';
  import RadioGroup from '../patterns/molecules/RadioGroup.svelte';
  import CartSummary from '../patterns/organisms/CartSummary.svelte';
  import NavBar from '../patterns/organisms/NavBar.svelte';
  import Grid from '../patterns/layout/Grid.svelte';
  import Row from '../patterns/layout/Row.svelte';
  import Section from '../patterns/layout/Section.svelte';
  import Spacer from '../patterns/layout/Spacer.svelte';
  import Stack from '../patterns/layout/Stack.svelte';
  import Page from '../patterns/templates/Page.svelte';
  import { celebrate } from '../utils/delight';
  import {
    EXPRESS,
    FREE_SHIPPING_FROM,
    SHIPPING,
    applyCode,
    later,
    money,
    type CartItem,
  } from './mock-shop';

  interface Props {
    /** The cart from the storefront; quantities can still change on the first step. */
    lines: CartItem[];
    code?: string | undefined;
    rate?: number;
    /** Back to the storefront (brand, "Back to shop", "Keep shopping"). */
    onshop: () => void;
    /** The order went through: the storefront's cart can be emptied. */
    onplaced?: (() => void) | undefined;
  }

  let {
    lines = $bindable(),
    code = $bindable(),
    rate = $bindable(0),
    onshop,
    onplaced,
  }: Props = $props();

  let step = $state(0);
  let email = $state('ada@example.com');
  let name = $state('Ada Lovelace');
  let street = $state('');
  let zip = $state('');
  let city = $state('');
  let delivery = $state('standard');
  let payment = $state('card');
  let cardNumber = $state('');
  let expiry = $state('');
  let tried = $state(false);
  let placing = $state(false);
  let form = $state<HTMLElement>();
  /** What was ordered, kept for the confirmation after the cart is emptied. */
  let order = $state<{ items: number; total: number; lines: CartItem[] } | null>(null);

  const count = $derived(lines.reduce((n, l) => n + l.quantity, 0));
  const subtotal = $derived(lines.reduce((sum, l) => sum + l.price * l.quantity, 0));
  const discount = $derived(rate ? Math.round(subtotal * rate * 100) / 100 : undefined);
  const shipping = $derived(
    delivery === 'express' ? EXPRESS : subtotal >= FREE_SHIPPING_FROM ? 0 : SHIPPING,
  );
  const total = $derived(subtotal + shipping - (discount ?? 0));

  const errors = $derived.by(() => {
    if (!tried) return {} as Record<string, string>;
    const out: Record<string, string> = {};
    if (step === 1) {
      if (!/^\S+@\S+\.\S+$/.test(email.trim()))
        out.email = 'Enter an e-mail address like name@example.com.';
      if (!name.trim()) out.name = 'Who should we address the parcel to?';
      if (!street.trim()) out.street = 'Enter a street and house number.';
      if (!zip.trim()) out.zip = 'Enter a postcode.';
      if (!city.trim()) out.city = 'Enter a town or city.';
    }
    if (step === 2 && payment === 'card') {
      if (cardNumber.replace(/\s/g, '').length !== 16)
        out.cardNumber = 'A card number has 16 digits — check the front of your card.';
      if (!/^(0[1-9]|1[0-2])\s*\/\s*\d{2}$/.test(expiry.trim()))
        out.expiry = 'Use month / year, like 08 / 28.';
    }
    return out;
  });

  async function next() {
    tried = true;
    if (Object.keys(errors).length) {
      // The answer appears at the question: focus the first field that needs attention.
      await tick();
      form?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
      return;
    }
    tried = false;
    if (step === 2) {
      placing = true;
      await later(900);
      placing = false;
      order = { items: count, total, lines: lines.map((l) => ({ ...l })) };
      onplaced?.();
    }
    go(step + 1);
  }

  async function go(to: number) {
    step = Math.max(0, Math.min(3, to));
    tried = false;
    await tick();
    window.scrollTo?.({ top: 0, behavior: 'smooth' });
  }

  const deliveryOptions = $derived([
    {
      value: 'standard',
      label: shipping === 0 && delivery === 'standard' ? 'Standard — free' : 'Standard',
      description:
        subtotal >= FREE_SHIPPING_FROM
          ? '3–5 working days · free over ' + money(FREE_SHIPPING_FROM)
          : `3–5 working days · ${money(SHIPPING)}`,
    },
    { value: 'express', label: `Express — ${money(EXPRESS)}`, description: 'Next working day' },
  ]);
</script>

{#snippet mark()}
  <span class="mark"><Icon name="bag" size={17} /></span>
{/snippet}

{#snippet field(
  key: string,
  label: string,
  value: string,
  set: (v: string) => void,
  attrs: {
    autocomplete?: HTMLInputAttributes['autocomplete'];
    type?: string;
    inputmode?: 'numeric';
    placeholder?: string;
  },
)}
  <Field {label} required error={errors[key]}>
    {#snippet children({ id, errorId, invalid })}
      <Input
        {id}
        {value}
        type={attrs.type ?? 'text'}
        autocomplete={attrs.autocomplete}
        inputmode={attrs.inputmode}
        placeholder={attrs.placeholder}
        {invalid}
        aria-describedby={invalid ? errorId : undefined}
        oninput={(event: Event) => set((event.currentTarget as HTMLInputElement).value)}
      />
    {/snippet}
  </Field>
{/snippet}

<Page width="medium" gap="lg">
  {#snippet header()}
    <NavBar
      brand="Example Goods"
      brandHref="#all"
      logo={mark}
      links={[]}
      onnavigate={(_link, event) => event.preventDefault()}
    >
      {#snippet actions()}
        <span class="secure"><Icon name="lock" size={15} />Secure checkout</span>
        <Button
          variant="ghost"
          shape="pill"
          icon="arrow-left"
          label="Back to shop"
          collapse
          onclick={onshop}
        />
      {/snippet}
    </NavBar>
  {/snippet}

  <div data-note="steps">
    <CheckoutSteps current={step === 3 ? 4 : step} onstep={(i) => (step < 3 ? go(i) : undefined)} />
  </div>

  {#if step < 3}
    <Grid columns="minmax(0, 1fr) 22rem" collapse="lg" gap="lg" align="start">
      <form
        class="form"
        bind:this={form}
        novalidate
        onsubmit={(event) => {
          event.preventDefault();
          void next();
        }}
        data-note="form"
      >
        <Stack gap="lg">
          {#if step === 0}
            <Section
              title="Your cart"
              description="Change quantities here — the total updates as you go."
              level="panel"
            >
              {#if lines.length}
                {#each lines as line, i (line.id + line.meta)}
                  <CartLine
                    title={line.title}
                    meta={line.meta}
                    price={line.price}
                    image={line.image}
                    locale="en"
                    bind:quantity={line.quantity}
                    onquantity={() => {}}
                    onremove={() => lines.splice(i, 1)}
                  />
                {/each}
              {:else}
                <EmptyState
                  icon="cart"
                  compact
                  title="Your cart is empty"
                  message="Pick something in the shop first — it will wait for you here."
                >
                  {#snippet action()}
                    <Button variant="primary" shape="pill" label="Back to shop" onclick={onshop} />
                  {/snippet}
                </EmptyState>
              {/if}
            </Section>
          {:else if step === 1}
            <Section title="Contact & address" level="panel">
              <Grid min="14rem" gap="md">
                {@render field('email', 'E-mail', email, (v) => (email = v), {
                  type: 'email',
                  autocomplete: 'email',
                })}
                {@render field('name', 'Full name', name, (v) => (name = v), {
                  autocomplete: 'name',
                })}
              </Grid>
              {@render field('street', 'Street and number', street, (v) => (street = v), {
                autocomplete: 'street-address',
              })}
              <Grid columns="10rem minmax(0, 1fr)" collapse="sm" gap="md">
                {@render field('zip', 'Postcode', zip, (v) => (zip = v), {
                  autocomplete: 'postal-code',
                })}
                {@render field('city', 'City', city, (v) => (city = v), {
                  autocomplete: 'address-level2',
                })}
              </Grid>
            </Section>
            <Section title="Delivery" level="panel">
              <RadioGroup label="Delivery speed" bind:value={delivery} options={deliveryOptions} />
            </Section>
          {:else}
            <Section title="Payment" level="panel">
              <RadioGroup
                label="Payment method"
                bind:value={payment}
                options={[
                  { value: 'card', label: 'Credit or debit card' },
                  { value: 'invoice', label: 'Invoice', description: 'Pay within 14 days' },
                  { value: 'transfer', label: 'Bank transfer' },
                ]}
              />
              {#if payment === 'card'}
                <div class="card-fields">
                  <Grid columns="minmax(0, 1fr) 8rem" collapse="sm" gap="md">
                    {@render field(
                      'cardNumber',
                      'Card number',
                      cardNumber,
                      (v) => (cardNumber = v),
                      {
                        autocomplete: 'cc-number',
                        inputmode: 'numeric',
                        placeholder: '1234 5678 9012 3456',
                      },
                    )}
                    {@render field('expiry', 'Expires', expiry, (v) => (expiry = v), {
                      autocomplete: 'cc-exp',
                      placeholder: 'MM / YY',
                    })}
                  </Grid>
                </div>
              {/if}
            </Section>
          {/if}
          <Row wrap>
            {#if step > 0}
              <Button
                variant="ghost"
                shape="pill"
                icon="arrow-left"
                label={step === 1 ? 'Back to cart' : 'Back to shipping'}
                onclick={() => go(step - 1)}
              />
            {/if}
            <Spacer />
            <Button
              type="submit"
              variant="primary"
              shape="pill"
              size="lg"
              icon={step === 2 ? 'lock' : 'arrow-right'}
              label={step === 2
                ? `Pay ${money(total)}`
                : step === 0
                  ? 'Continue to shipping'
                  : 'Continue to payment'}
              busy={placing}
              busyLabel="Placing your order…"
              disabled={!lines.length}
            />
          </Row>
        </Stack>
      </form>

      <div class="summary" data-note="summary">
        <CartSummary
          locale="en"
          {subtotal}
          {shipping}
          {discount}
          discountCode={code}
          taxIncluded
          ondiscount={async (value) => {
            rate = await applyCode(value);
            code = value.toUpperCase();
          }}
          onremovediscount={() => {
            rate = 0;
            code = undefined;
          }}
          note="Prices include VAT · 30-day returns"
        >
          {#if step > 0}
            {#each lines as line (line.id + line.meta)}
              <CartLine
                title={line.title}
                meta={line.meta}
                price={line.price}
                image={line.image}
                quantity={line.quantity}
                locale="en"
              />
            {/each}
          {/if}
        </CartSummary>
      </div>
    </Grid>
  {:else}
    <Section level="selected" align="center">
      <Stack gap="md" align="center">
        <!-- The end of the task: one burst of sprinkles from the check mark. -->
        <span class="done" {@attach (node) => void celebrate(node)}>
          <Icon name="check" size={32} />
        </span>
        <h1 class="thanks">Thank you, {name.split(' ')[0]}!</h1>
        <p class="muted">
          Order #10482 is confirmed — {order?.items ?? 0}
          {order?.items === 1 ? 'item' : 'items'}, {money(order?.total ?? 0)}. A receipt is on its
          way to {email}.
        </p>
        {#if order?.lines.length}
          <ul class="parcel" aria-label="In your parcel">
            {#each order.lines as line, i (line.id + line.meta)}
              <li style:--i={i}>
                <img src={line.image} alt={line.title} />
                {#if line.quantity > 1}<span class="qty">{line.quantity}</span>{/if}
              </li>
            {/each}
          </ul>
        {/if}
        <p class="muted small">
          <Icon name="truck" size={16} />
          {delivery === 'express' ? 'Arrives tomorrow.' : 'Arrives in 3–5 working days.'}
        </p>
        <Button variant="primary" shape="pill" size="lg" label="Keep shopping" onclick={onshop} />
      </Stack>
    </Section>
  {/if}
</Page>

<style>
  .mark {
    display: grid;
    place-items: center;
    width: 30px;
    height: 30px;
    border-radius: var(--radius-md);
    color: var(--on-accent);
    background: var(--grad-primary);
    box-shadow: var(--shadow-primary);
  }
  .secure {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    padding-inline: var(--space-2);
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
    color: var(--text-2);
    white-space: nowrap;
  }
  .form {
    min-width: 0;
  }
  .card-fields {
    animation: bb-rise var(--motion-base) var(--ease-out);
  }
  .summary {
    position: sticky;
    top: calc(var(--control-xl) + var(--space-8));
  }
  .done {
    display: grid;
    place-items: center;
    width: 4rem;
    height: 4rem;
    border-radius: var(--radius-pill);
    color: var(--on-ok);
    background: var(--grad-success);
    box-shadow: var(--shadow-success);
  }
  .thanks {
    font-size: var(--fs-display);
    font-weight: var(--fw-bold);
    letter-spacing: var(--tracking-tight);
    text-align: center;
  }
  .muted {
    max-width: 34rem;
    color: var(--text-2);
    text-align: center;
  }
  /* What is in the parcel, dealt out one by one. */
  .parcel {
    display: flex;
    gap: var(--space-2);
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .parcel li {
    position: relative;
    animation: bb-rise var(--motion-slow) var(--ease-out) backwards;
    animation-delay: calc(var(--i) * 90ms + 200ms);
  }
  .parcel img {
    display: block;
    width: 3.5rem;
    height: 3.5rem;
    object-fit: cover;
    border-radius: var(--radius-lg);
    box-shadow: var(--layer-panel-shadow);
  }
  .qty {
    position: absolute;
    top: calc(var(--space-1) * -1);
    right: calc(var(--space-1) * -1);
    min-width: 1.25rem;
    height: 1.25rem;
    padding: 0 var(--space-1);
    border-radius: var(--radius-pill);
    background: var(--grad-primary);
    color: var(--on-accent);
    font-size: var(--fs-2xs);
    font-weight: var(--fw-bold);
    line-height: 1.25rem;
    text-align: center;
  }
  .small {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    font-size: var(--fs-sm);
  }
  @media (max-width: 720px) {
    .secure {
      display: none;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .card-fields,
    .parcel li {
      animation: none;
    }
  }
</style>
