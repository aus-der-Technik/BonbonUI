/**
 * A page's own tint, unless the Storybook toolbar picked one: an Application's `tint` would
 * otherwise override the toolbar, and the page could not be re-tinted like every other story.
 */
export function storyTint(context, own) {
    const picked = context?.globals?.['tint'];
    return !picked || picked === 'default' ? own : undefined;
}
