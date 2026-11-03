<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Row from '../layout/Row.svelte';
  import Button from './Button.svelte';
  import Tooltip from './Tooltip.svelte';

  const { Story } = defineMeta({
    title: 'Atoms/Tooltip',
    component: Tooltip,
    tags: ['autodocs'],
  });
</script>

<!-- Hover or focus a button. The bubble grows out of the edge that touches its trigger (pop from
origin), so the eye follows it from where it came from; it fades out quickly without a bounce.
Use tooltips for short hints only — never for anything the user has to click. -->
<Story name="Icon buttons" asChild>
  <Row style="padding-top: 3rem">
    <Tooltip text="Reload the rows"><Button icon="reload" label="Reload" iconOnly /></Tooltip>
    <Tooltip text="Copy link"><Button icon="link" label="Copy link" iconOnly /></Tooltip>
    <Tooltip text="Shown below the trigger" placement="bottom"><Button label="Below" /></Tooltip>
  </Row>
</Story>

<!-- `keys` puts the shortcut after the hint as key caps, written the platform's way: `Mod` is ⌘
     on Apple and Ctrl elsewhere, `Shift` and `Alt` follow suit. -->
<Story name="With a shortcut" asChild>
  <Row style="padding-top: 3rem">
    <Tooltip text="Bold" keys={['Mod', 'B']}>
      <Button icon="bold" label="Bold" iconOnly />
    </Tooltip>
    <Tooltip text="Redo" keys={['Mod', 'Shift', 'Z']}>
      <Button icon="redo" label="Redo" iconOnly />
    </Tooltip>
    <Tooltip text="Move up" keys={['Alt', 'Shift', 'ArrowUp']} placement="bottom">
      <Button icon="arrow-up" label="Move up" iconOnly />
    </Tooltip>
  </Row>
</Story>

<!-- `content` for a little more than text; `align` lines the bubble up with the trigger's start
     or end edge, so a hint at the edge of a bar opens towards the room it has. -->
<Story name="Rich content and edges" asChild>
  <Row justify="between" style="padding-top: 4rem">
    <Tooltip align="start" text="Lines up with the start edge">
      <Button icon="sidebar" label="Sidebar" iconOnly />
    </Tooltip>
    <Tooltip>
      {#snippet content()}<span>Saved <b>2 min</b> ago</span>{/snippet}
      <Button icon="check-circle" label="Saved" iconOnly />
    </Tooltip>
    <Tooltip align="end" text="Lines up with the end edge" keys={['Mod', ',']}>
      <Button icon="settings" label="Settings" iconOnly />
    </Tooltip>
  </Row>
</Story>
