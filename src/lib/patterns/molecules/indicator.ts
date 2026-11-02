/**
 * Sliding indicator — a Svelte action for tab bars and segmented controls. It measures the
 * current item (the child matching `selector`) and writes its box as `--ind-x|y|w|h` on the
 * container, plus `data-indicator="ready"` once a box is known. The container draws the
 * indicator itself (usually a `::before`), so it glides between items instead of blinking.
 * Without layout (tests, hidden containers) nothing is written and the items keep their own
 * selected style as a fallback.
 *
 *   <div class="list" use:indicator={{ selector: '[aria-selected="true"]', key: value }}>
 */
export interface IndicatorOptions {
  /** Finds the current item inside the container. */
  selector: string;
  /** Anything that changes when the selection does (usually the value). */
  key?: unknown;
}

export function indicator(node: HTMLElement, options: IndicatorOptions) {
  let current = options;
  let frame = 0;

  function measure() {
    const item = node.querySelector<HTMLElement>(current.selector);
    if (!item || !item.offsetWidth) {
      delete node.dataset.indicator;
      return;
    }
    node.style.setProperty('--ind-x', `${item.offsetLeft}px`);
    node.style.setProperty('--ind-y', `${item.offsetTop}px`);
    node.style.setProperty('--ind-w', `${item.offsetWidth}px`);
    node.style.setProperty('--ind-h', `${item.offsetHeight}px`);
    // First placement jumps; only later moves glide (see `[data-indicator='moving']`).
    if (node.dataset.indicator) node.dataset.indicator = 'moving';
    else {
      node.dataset.indicator = 'ready';
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (node.dataset.indicator === 'ready') node.dataset.indicator = 'moving';
      });
    }
  }

  const observer = typeof ResizeObserver === 'function' ? new ResizeObserver(measure) : undefined;
  observer?.observe(node);
  // Items change width too (the current one turns semibold).
  for (const child of node.children) observer?.observe(child);
  // Fonts and late layout can shift items after mount.
  queueMicrotask(measure);

  return {
    update(next: IndicatorOptions) {
      current = next;
      // After the DOM has the new selection.
      queueMicrotask(measure);
    },
    destroy() {
      observer?.disconnect();
      cancelAnimationFrame(frame);
    },
  };
}
