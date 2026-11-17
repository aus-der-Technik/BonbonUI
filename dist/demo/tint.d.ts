/**
 * A page's own tint, unless the Storybook toolbar picked one: an Application's `tint` would
 * otherwise override the toolbar, and the page could not be re-tinted like every other story.
 */
export declare function storyTint(context: {
    globals?: Record<string, unknown>;
} | undefined, own: string): string | undefined;
