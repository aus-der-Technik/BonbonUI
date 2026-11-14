<script lang="ts">
  /**
   * Swatch atom — the colour dot/square of legends, chips and suggestion rows. `color` is a
   * palette name (`'blue'`, `'pink'`, …) or any CSS colour.
   *
   *   <Swatch color="purple" />
   */
  import { colorValue } from './palette';

  interface Props {
    color: string;
    shape?: 'dot' | 'square';
    size?: number;
  }

  let { color, shape = 'dot', size = 10 }: Props = $props();
</script>

<i
  class="swatch swatch--{shape}"
  style:background={colorValue(color)}
  style:width="{size}px"
  style:height="{size}px"
  aria-hidden="true"
></i>

<style>
  .swatch {
    display: inline-block;
    flex-shrink: 0;
    box-shadow: inset 0 0 0 0.5px rgba(12, 12, 22, 0.12);
  }
  .swatch--dot {
    border-radius: 50%;
  }
  .swatch--square {
    border-radius: 3px;
  }
</style>
