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
