<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Row from '../layout/Row.svelte';
  import Link from './Link.svelte';
  import Text from './Text.svelte';

  const { Story } = defineMeta({ title: 'Atoms/Link', component: Link, tags: ['autodocs'] });
</script>

<!-- Inline in body copy; `external` opens a new tab and says so to screen readers. -->
<Story name="In a sentence" asChild>
  <Text as="p" tone="muted">
    Read the <Link href="#">setup guide</Link> or check the
    <Link href="https://example.com" external>status page</Link>.
  </Text>
</Story>

<!-- Without an `href` a link is shown struck through, for targets that do not exist. -->
<Story name="Link list" asChild>
  <Row gap="md">
    <Link href="#">Source</Link>
    <Link href="#">Markdown</Link>
    <Link href={null}>Original</Link>
    <Link href="#" muted>Metadata</Link>
  </Row>
</Story>
