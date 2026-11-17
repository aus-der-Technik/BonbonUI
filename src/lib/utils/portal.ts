/**
 * `use:portal` moves a floating layer (a bar riding on the keyboard, a full-screen viewer) to
 * `<body>` — out of any stacking context, filter or `overflow` of the component that renders it,
 * so it sits above sticky headers and bottom bars. It takes the tint along (`--accent`,
 * `--accent-ink` and `--tint` as resolved where it was written), so it still looks like its app.
 * Svelte removes the node after its outro; the timer only cleans up if nothing did.
 */
export function portal(node: HTMLElement, target: HTMLElement | undefined = undefined) {
  const from = node.parentElement ? getComputedStyle(node.parentElement) : null;
  for (const name of ['--tint', '--accent', '--accent-ink']) {
    const value = from?.getPropertyValue(name).trim();
    if (value) node.style.setProperty(name, value);
  }
  (target ?? document.body).append(node);
  return {
    destroy() {
      setTimeout(() => node.remove(), 1000);
    },
  };
}
