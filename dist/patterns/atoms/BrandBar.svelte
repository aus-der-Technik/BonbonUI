<script lang="ts">
  /**
   * BrandBar atom — the short accent bar in front of an app or section title. It follows the
   * tint, or takes a palette name / CSS colour via `color`.
   *
   *   <Row gap="sm"><BrandBar /><Heading level={1}>Orders</Heading></Row>
   */
  import { colorValue } from './palette';

  interface Props {
    height?: number;
    /** Palette name or CSS colour; default the accent. */
    color?: string | undefined;
  }

  let { height = 26, color }: Props = $props();
</script>

<span class="bar" style:height="{height}px" style:--bar-c={colorValue(color)} aria-hidden="true"
></span>

<style>
  .bar {
    --_c: var(--bar-c, var(--accent));
    display: block;
    width: 5px;
    flex-shrink: 0;
    border-radius: var(--radius-pill);
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.35), rgba(255, 255, 255, 0) 60%),
      linear-gradient(180deg, var(--_c), color-mix(in oklab, var(--_c) 76%, black));
    box-shadow: 0 2px 8px color-mix(in srgb, var(--_c) 40%, transparent);
  }
</style>
