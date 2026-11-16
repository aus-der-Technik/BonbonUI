<script lang="ts">
  /**
   * Spacer — pushes what follows to the far end of a Row or Stack (`flex: 1`). In a toolbar:
   * title · Spacer · actions. With `size` it is a fixed gap instead.
   */
  import { space, type Space } from './space';

  interface Props {
    size?: Space | undefined;
  }

  let { size }: Props = $props();
</script>

<div class="spacer" class:fixed={size} style:--size={space(size)} aria-hidden="true"></div>

<style>
  .spacer {
    flex: 1 1 auto;
    min-width: 0;
    min-height: 0;
  }
  .fixed {
    flex: 0 0 var(--size);
  }
</style>
