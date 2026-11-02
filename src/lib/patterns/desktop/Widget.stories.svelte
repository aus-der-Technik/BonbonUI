<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Widget from './Widget.svelte';
  import Button from '../atoms/Button.svelte';
  import ProgressBar from '../atoms/ProgressBar.svelte';
  import Text from '../atoms/Text.svelte';
  import Row from '../layout/Row.svelte';
  import Stack from '../layout/Stack.svelte';

  const { Story } = defineMeta({
    title: 'Organisms/Desktop & OS/Widget',
    component: Widget,
    tags: ['autodocs'],
    args: {
      size: 'small',
      title: 'Weather',
      icon: 'sun',
      color: 'orange',
      figure: '21°',
      caption: 'Sunny · H 24° L 15°',
    },
    argTypes: {
      size: { control: 'inline-radio', options: ['small', 'medium', 'large'] },
    },
  });
</script>

<!-- One big figure (`figure`, `caption`), a quiet header.

     Why is only the number coloured? A desk full of fully painted tiles is a wall of colour
     where nothing stands out. Glass tiles with candy on the one figure that matters let your
     eye jump straight to "21°" — calm first, candy second. -->
<Story name="Playground">
  {#snippet template(args)}
    <Widget {...args} />
  {/snippet}
</Story>

<!-- The three sizes: `small` (a square), `medium` (two wide), `large` (two by two). They are
     square-ish on purpose: on a grid of equal units, widgets line up without effort. Keep
     `filled` for one hero tile at most. -->
<Story name="Sizes" asChild>
  <Row gap="md" align="start">
    <Widget title="Clock" icon="clock" color="indigo" figure="09:41" caption="Sunday" />
    <Widget size="medium" title="Storage" icon="database" color="blue" meta="512 GB">
      <Text size="2xl" weight="bold" numeric>212 GB free</Text>
      <ProgressBar label="Used" value={59} />
    </Widget>
    <Widget size="large" title="Reminders" icon="check-square" color="orange">
      <Stack gap="sm">
        <Text weight="semibold">Call the venue</Text>
        <Text weight="semibold">Book train tickets</Text>
        <Text weight="semibold">Water the plants</Text>
      </Stack>
      <Row><Button icon="plus" label="New reminder" size="sm" /></Row>
    </Widget>
  </Row>
</Story>

<!-- With `onclick` (or `href`) the whole card is one control: it lifts on hover and presses
     in by 1% — cards are big, so they move less than buttons. `filled` paints it in its
     colour, for the one tile that should lead. -->
<Story name="Interactive" asChild>
  <Widget title="Photos" icon="image" color="orange" filled onclick={() => {}} label="Open photos">
    <Text size="2xl" weight="bold" tone="inherit">86 new</Text>
  </Widget>
</Story>
