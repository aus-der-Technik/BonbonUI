<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Row from '../layout/Row.svelte';
  import Stack from '../layout/Stack.svelte';
  import Button from './Button.svelte';
  import { iconNames } from './icons';

  const { Story } = defineMeta({
    title: 'Atoms/Button',
    component: Button,
    tags: ['autodocs'],
    args: { label: 'Save changes', variant: 'primary', size: 'md', shape: 'pill' },
    argTypes: {
      variant: {
        control: 'select',
        options: [
          'primary',
          'secondary',
          'tinted',
          'plain',
          'glass',
          'ghost',
          'success',
          'danger',
          'danger-solid',
        ],
      },
      size: { control: 'inline-radio', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
      shape: { control: 'inline-radio', options: ['rounded', 'pill'] },
      icon: { control: 'select', options: [undefined, ...iconNames] },
      trailingIcon: { control: 'select', options: [undefined, ...iconNames] },
    },
  });
</script>

<script lang="ts">
  let saving = $state(false);

  function save() {
    saving = true;
    setTimeout(() => (saving = false), 1500);
  }
</script>

<!-- Every prop in the controls panel. Switch the tint in the toolbar: the accent variants follow it.
Press and hold a button: it squishes like a gummy and springs back on release (the "jelly press"),
so a click feels physical without moving the layout. Hover the primary button: one sweep of
sugar-glass light runs across it, once per hover — a small reward on the main action only. -->
<Story name="Playground" />

<!-- One emphasis level per job. A screen has one `primary` action; `tinted` is a strong second;
`secondary` the quiet default; `plain` reads as a text action. Colour is a reward, so only the
primary, success and danger buttons are filled — everything else stays calm glass. -->
<Story name="Variants" asChild>
  <Stack gap="md">
    <Row>
      <Button variant="primary" icon="check" label="Save" />
      <Button variant="tinted" icon="plus" label="Add item" />
      <Button variant="secondary" label="Cancel" />
      <Button variant="plain" label="Show more" trailingIcon="chevron-down" />
    </Row>
    <Row>
      <Button variant="glass" icon="sparkles" label="Glass" />
      <Button variant="ghost" label="Ghost" />
      <Button variant="success" icon="plus" label="Add row" />
      <Button variant="danger" icon="trash" label="Delete" />
      <Button variant="danger-solid" label="Delete permanently" />
    </Row>
  </Stack>
</Story>

<!-- Heights follow the density setting in the toolbar. -->
<Story name="Sizes" asChild>
  <Row>
    <Button size="xs" label="Extra small" />
    <Button size="sm" label="Small" />
    <Button size="md" label="Medium" />
    <Button size="lg" label="Large" />
    <Button size="xl" label="Extra large" />
  </Row>
</Story>

<!-- Why pills by default: the whole library speaks one shape grammar — **pill = you can act on
it**, rounded rectangle = it holds things (cards, inputs), circle = identity or state (avatars,
status dots). A button that is a pill reads as pressable before anyone hovers it. `rounded` stays
for the few places where a button has to sit flush in a grid: a table cell, a button attached to
an input. -->
<Story name="Shapes" asChild>
  <Row>
    <Button variant="primary" icon="check" label="Pill (default)" />
    <Button variant="secondary" label="Pill" />
    <Button variant="secondary" shape="rounded" label="Rounded" />
    <Button variant="secondary" shape="rounded" size="sm" icon="edit" label="Edit" iconOnly />
  </Row>
</Story>

<!-- Header and floating actions on the front layer use the glass variants. `collapse` turns them
into round icon buttons below 640px. -->
<Story name="Header pills" asChild>
  <Row>
    <Button variant="glass" size="lg" icon="message-plus" label="New message" collapse />
    <Button variant="primary" size="lg" icon="reload" label="Reload" collapse />
    <Button variant="ghost" size="lg" icon="bell" label="Notifications" iconOnly />
  </Row>
</Story>

<!-- A pair floating over a sheet: quiet cancel, strong confirm. -->
<Story name="Floating actions" asChild>
  <Row>
    <Button variant="ghost" size="xl" label="Cancel" />
    <Button variant="primary" size="xl" icon="send" label="Send" />
  </Row>
</Story>

<!-- `iconOnly` keeps the label as the accessible name. A pill with equal sides is a circle. -->
<Story name="Icon only" asChild>
  <Row>
    <Button icon="edit" label="Edit" iconOnly />
    <Button variant="tinted" icon="share" label="Share" iconOnly />
    <Button variant="plain" icon="more" label="More actions" iconOnly />
    <Button variant="danger" icon="trash" label="Delete" iconOnly />
    <Button variant="primary" size="lg" icon="plus" label="Create" iconOnly />
  </Row>
</Story>

<!-- While `busy` the button ignores clicks, so a slow request cannot be sent twice. Refresh
icons spin; others make way for a spinner. Click "Save". -->
<Story name="Busy" asChild>
  <Row>
    <Button
      variant="primary"
      icon="check"
      label="Save"
      busyLabel="Saving…"
      busy={saving}
      onclick={save}
    />
    <Button icon="refresh" label="Refreshing" busy />
    <Button variant="tinted" label="Uploading" busy />
  </Row>
</Story>

<!-- `block` fills the width — for sign-in forms and phone sheets. -->
<Story name="Full width" asChild>
  <Stack gap="sm" style="max-width: 22rem">
    <Button variant="primary" size="lg" block label="Sign in" />
    <Button variant="secondary" size="lg" block icon="key" label="Use a passkey" />
  </Stack>
</Story>

<Story name="Disabled" asChild>
  <Row>
    <Button variant="primary" label="Send" disabled />
    <Button label="Previous" disabled />
    <Button href="https://example.com" icon="external" label="Open" disabled />
  </Row>
</Story>

<!-- With `href` it is a real link that looks like a button. -->
<Story
  name="As link"
  args={{ href: '#', label: 'Read the guide', variant: 'tinted', trailingIcon: 'arrow-right' }}
/>
