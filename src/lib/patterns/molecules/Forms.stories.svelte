<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import CheckboxGroup from './CheckboxGroup.svelte';
  import CodeBlock from './CodeBlock.svelte';
  import CopyButton from './CopyButton.svelte';
  import Field from './Field.svelte';
  import RadioGroup from './RadioGroup.svelte';
  import Button from '../atoms/Button.svelte';
  import Card from '../atoms/Card.svelte';
  import Input from '../atoms/Input.svelte';
  import Grid from '../layout/Grid.svelte';
  import Row from '../layout/Row.svelte';
  import Stack from '../layout/Stack.svelte';

  const { Story } = defineMeta({
    title: 'Molecules/Forms & content',
    component: RadioGroup,
    tags: ['autodocs'],
    parameters: { layout: 'padded' },
  });
</script>

<script lang="ts">
  let digest = $state('daily');
  let email = $state('jane.doe@example');
  let name = $state('Jane Doe');
  let topics = $state(['orders', 'stock']);
  const invalid = $derived(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email));
</script>

<!-- One of n, stacked with descriptions. -->
<Story name="RadioGroup" asChild>
  <RadioGroup
    label="Summary e-mail"
    bind:value={digest}
    options={[
      { value: 'off', label: 'Off' },
      { value: 'daily', label: 'Daily', description: 'Every morning at 8:00' },
      { value: 'weekly', label: 'Weekly', description: 'Mondays' },
    ]}
  />
</Story>

<!-- The same in a wrapping row. -->
<Story name="RadioGroup horizontal" asChild>
  <RadioGroup
    label="Environment"
    orientation="horizontal"
    value="prod"
    options={[
      { value: 'prod', label: 'Production' },
      { value: 'stage', label: 'Staging' },
      { value: 'dev', label: 'Development' },
    ]}
  />
</Story>

<!-- A label over a control. The error replaces the hint and is wired to the input through
     `aria-describedby`. -->
<Story name="Field with validation" asChild>
  <Field
    label="E-mail"
    required
    hint="Used for sign-in"
    error={invalid ? 'Enter a valid e-mail address' : undefined}
  >
    {#snippet children({ id, errorId, invalid: bad })}
      <Input {id} bind:value={email} invalid={bad} aria-describedby={bad ? errorId : undefined} />
    {/snippet}
  </Field>
</Story>

<!-- A complete settings form: Fields in a Grid (two columns, one on a phone), a CheckboxGroup
     and the buttons in a Row — no hand-written layout CSS. -->
<Story name="Settings form" asChild>
  <Card title="Profile">
    <Stack gap="lg">
      <Grid columns={2} min="14rem">
        <Field label="Name" required>
          {#snippet children({ id })}<Input {id} bind:value={name} />{/snippet}
        </Field>
        <Field label="E-mail" hint="We never share it">
          {#snippet children({ id })}<Input
              {id}
              type="email"
              value="jane.doe@example.com"
            />{/snippet}
        </Field>
      </Grid>
      <CheckboxGroup
        label="Notify me about"
        bind:value={topics}
        options={[
          { value: 'orders', label: 'New orders' },
          { value: 'stock', label: 'Low stock' },
          { value: 'reviews', label: 'New reviews' },
          { value: 'newsletter', label: 'Product news' },
        ]}
      />
      <Row justify="end">
        <Button variant="ghost" label="Cancel" />
        <Button variant="primary" label="Save changes" />
      </Row>
    </Stack>
  </Card>
</Story>

<!-- Preformatted text with a caption and a copy button; `secret` masks it until revealed. -->
<Story name="CodeBlock" asChild>
  <Stack gap="md">
    <CodeBlock
      label="Request"
      code={`curl -H "Authorization: Bearer $TOKEN" \\
  https://api.example.com/v1/orders?status=open`}
    />
    <CodeBlock label="API token" code="tok_demo_8f3a91c2d4e5b6a7f8091a2b3c4d5e6f" secret />
  </Stack>
</Story>

<!-- An icon-only copy button next to a value, and a labelled one. A fresh copy ticks and throws a
     pinch of sprinkles; copying again within two seconds stays quiet. -->
<Story name="CopyButton" asChild>
  <Row gap="sm">
    <code>3f1c9a2e-8a1d-4f7b</code>
    <CopyButton value="3f1c9a2e-8a1d-4f7b" iconOnly />
    <CopyButton value="3f1c9a2e-8a1d-4f7b" label="Copy order id" />
  </Row>
</Story>

<!-- A floating "copy link" key: ghost glass in a front layer, a link icon, a tooltip that names the
     target and then says "Link copied". The value is read at the click, so it follows the page. -->
<Story name="CopyButton as a link key" asChild>
  <div data-layer="front" style="display: inline-flex; padding: var(--space-3);">
    <CopyButton
      value={() => window.location.href}
      variant="ghost"
      icon="link"
      iconOnly
      label="Copy link to this page"
      copiedLabel="Link copied"
      tooltipPlacement="bottom"
      sprinkles={false}
    />
  </div>
</Story>
