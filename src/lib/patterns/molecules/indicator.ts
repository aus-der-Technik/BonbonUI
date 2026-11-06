/**
 * Liquid indicator — a Svelte action for tab bars and segmented controls. It measures the
 * current item (the child matching `selector`) and writes its box as `--ind-x|y|w|h` on the
 * container, plus `data-indicator="ready"` once a box is known. The container draws the
 * indicator itself (usually a `::before`); a LiquidDrop (`utils/liquid.ts`) moves it from item
 * to item like thick water — it stretches towards the new item, thins, lands with a soft wobble
 * — and the container bulges along. Without layout (tests, hidden containers) nothing is
 * written and the items keep their own selected style as a fallback.
 *
 *   <div class="list" use:indicator={{ selector: '[aria-selected="true"]', key: value }}>
 */
import { LiquidDrop } from '../../utils/liquid';

export interface IndicatorOptions {
  /** Finds the current item inside the container. */
  selector: string;
  /** Anything that changes when the selection does (usually the value). */
  key?: unknown;
  /** How far the surface bulges while the indicator moves (0 = it stays still). */
  bulge?: number;
  /** The surface that bulges, found with `closest()` from the container (default: the
   *  container itself), e.g. the whole glass bar around a list of links. */
  hostSelector?: string | undefined;
}

export function indicator(node: HTMLElement, options: IndicatorOptions) {
  let current = options;
  const drop = new LiquidDrop({
    render: (box) => {
      node.style.setProperty('--ind-x', `${box.x}px`);
      node.style.setProperty('--ind-y', `${box.y}px`);
      node.style.setProperty('--ind-w', `${box.w}px`);
      node.style.setProperty('--ind-h', `${box.h}px`);
    },
    host: (options.hostSelector && node.closest<HTMLElement>(options.hostSelector)) || node,
    bulge: options.bulge ?? 0.025,
  });

  function measure(mode: 'move' | 'follow' = 'follow') {
    const item = node.querySelector<HTMLElement>(current.selector);
    if (!item || !item.offsetWidth) {
      delete node.dataset.indicator;
      return;
    }
    const box = {
      x: item.offsetLeft,
      y: item.offsetTop,
      w: item.offsetWidth,
      h: item.offsetHeight,
    };
    // The first placement lands without moving.
    drop.moveTo(box, node.dataset.indicator ? mode : 'instant');
    node.dataset.indicator = 'ready';
  }

  // A resize (font load, the current item turning semibold) follows without a splash.
  const observer =
    typeof ResizeObserver === 'function' ? new ResizeObserver(() => measure()) : undefined;
  observer?.observe(node);
  for (const child of node.children) observer?.observe(child);
  queueMicrotask(() => measure());

  return {
    update(next: IndicatorOptions) {
      const moved = next.key !== current.key;
      current = next;
      // After the DOM has the new selection.
      queueMicrotask(() => measure(moved ? 'move' : 'follow'));
    },
    destroy() {
      observer?.disconnect();
      drop.destroy();
    },
  };
}
