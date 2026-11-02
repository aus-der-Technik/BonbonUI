<script lang="ts">
  /**
   * Example page: the checkout of a small shop — CheckoutSteps at the top, address and delivery
   * on the left, payment next, and the order summary beside it (Storybook only).
   */
  import Button from '../patterns/atoms/Button.svelte';
  import Icon from '../patterns/atoms/Icon.svelte';
  import Input from '../patterns/atoms/Input.svelte';
  import CartLine from '../patterns/molecules/CartLine.svelte';
  import CheckoutSteps from '../patterns/molecules/CheckoutSteps.svelte';
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
  import { cartItems, later } from './mock-shop';

  let step = $state(1);
  let email = $state('ada@example.com');
  let name = $state('Ada Lovelace');
  let street = $state('');
  let zip = $state('');
  let city = $state('');
  let delivery = $state('standard');
  let payment = $state('card');
  let tried = $state(false);
  let placing = $state(false);

  const lines = cartItems();
  const subtotal = lines.reduce((sum, l) => sum + l.price * l.quantity, 0);
  const shipping = $derived(delivery === 'express' ? 9.9 : 0);
  const missing = $derived(!street.trim() || !zip.trim() || !city.trim());

  async function next() {
    if (step === 1 && missing) {
      tried = true;
      return;
    }
    if (step === 2) {
      placing = true;
      await later(900);
      placing = false;
    }
    step = Math.min(3, step + 1);
  }
</script>

<Page width="medium" gap="lg">
  {#snippet header()}
    <NavBar brand="Larkspur Market" brandHref="#shop">
      {#snippet logo()}
        <span class="mark"><Icon name="bag" size={17} /></span>
      {/snippet}
      {#snippet actions()}
        <Row gap="xs">
          <Icon name="lock" size={15} />
          <span class="secure">Secure checkout</span>
        </Row>
      {/snippet}
    </NavBar>
  {/snippet}

  <CheckoutSteps current={step} onstep={(i) => (step = i)} />

  {#if step < 3}
    <Grid columns="minmax(0, 1fr) 22rem" collapse="lg" gap="lg" align="start">
      <Stack gap="lg">
        {#if step === 0}
          <Section title="Your cart" level="panel">
            {#each lines as line (line.id)}
              <CartLine
                title={line.title}
                meta={line.meta}
                price={line.price}
                image={line.image}
                quantity={line.quantity}
              />
            {/each}
          </Section>
        {:else if step === 1}
          <Section title="Contact & address" level="panel">
            <Grid min="14rem" gap="md">
              <Field label="Email">
                {#snippet children({ id })}
                  <Input {id} type="email" autocomplete="email" bind:value={email} />
                {/snippet}
              </Field>
              <Field label="Full name">
                {#snippet children({ id })}
                  <Input {id} autocomplete="name" bind:value={name} />
                {/snippet}
              </Field>
            </Grid>
            <Field
              label="Street and number"
              required
              error={tried && !street.trim() ? 'Enter a street.' : undefined}
            >
              {#snippet children({ id, errorId, invalid })}
                <Input
                  {id}
                  autocomplete="street-address"
                  bind:value={street}
                  {invalid}
                  aria-describedby={invalid ? errorId : undefined}
                />
              {/snippet}
            </Field>
            <Grid columns="10rem minmax(0, 1fr)" collapse="sm" gap="md">
              <Field
                label="Postcode"
                required
                error={tried && !zip.trim() ? 'Required.' : undefined}
              >
                {#snippet children({ id, errorId, invalid })}
                  <Input
                    {id}
                    autocomplete="postal-code"
                    bind:value={zip}
                    {invalid}
                    aria-describedby={invalid ? errorId : undefined}
                  />
                {/snippet}
              </Field>
              <Field label="City" required error={tried && !city.trim() ? 'Required.' : undefined}>
                {#snippet children({ id, errorId, invalid })}
                  <Input
                    {id}
                    autocomplete="address-level2"
                    bind:value={city}
                    {invalid}
                    aria-describedby={invalid ? errorId : undefined}
                  />
                {/snippet}
              </Field>
            </Grid>
          </Section>
          <Section title="Delivery" level="panel">
            <RadioGroup
              label="Delivery speed"
              bind:value={delivery}
              options={[
                { value: 'standard', label: 'Standard — free', description: '3–5 working days' },
                { value: 'express', label: 'Express — 9,90 €', description: 'Next working day' },
              ]}
            />
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
          </Section>
        {/if}
        <Row>
          {#if step > 0}
            <Button
              variant="ghost"
              shape="pill"
              icon="arrow-left"
              label={step === 1 ? 'Back to cart' : 'Back'}
              onclick={() => (step = step - 1)}
            />
          {/if}
          <Spacer />
          <Button
            variant="primary"
            shape="pill"
            size="lg"
            label={['Continue to shipping', 'Continue to payment', 'Place order'][step] ?? ''}
            busy={placing}
            busyLabel="Placing order…"
            onclick={next}
          />
        </Row>
      </Stack>

      <CartSummary {subtotal} {shipping} tax={(subtotal + shipping) * 0.19}>
        {#each lines as line (line.id)}
          <CartLine
            title={line.title}
            meta={line.meta}
            price={line.price}
            image={line.image}
            quantity={line.quantity}
          />
        {/each}
      </CartSummary>
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
          Order #10482 is confirmed — nice choice. A receipt is on its way to {email}.
        </p>
        <Button variant="primary" shape="pill" size="lg" label="Keep shopping" href="#shop" />
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
    border-radius: 9px;
    color: var(--on-accent);
    background: var(--grad-primary);
    box-shadow: var(--shadow-primary);
  }
  .secure {
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
    color: var(--text-2);
    padding-right: var(--space-3);
  }
  .done {
    display: grid;
    place-items: center;
    width: 4rem;
    height: 4rem;
    border-radius: var(--radius-pill);
    color: #fff;
    background: var(--grad-success);
    box-shadow: var(--shadow-success);
  }
  .thanks {
    font-size: var(--fs-display);
    font-weight: var(--fw-bold);
    letter-spacing: -0.025em;
  }
  .muted {
    color: var(--text-2);
    text-align: center;
  }
</style>
