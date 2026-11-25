<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import StatusBar from './StatusBar.svelte';

  const { Story } = defineMeta({
    title: 'Organisms/Desktop & OS/StatusBar',
    component: StatusBar,
    tags: ['autodocs'],
    args: {
      items: [{ label: '24 items' }, { label: '3 selected', tone: 'accent', dot: true }],
      trailing: [
        { label: 'Synced', tone: 'ok', dot: true },
        { label: 'Ln 12, Col 4', onclick: () => {}, title: 'Go to line' },
        { label: 'UTF-8' },
      ],
    },
  });
</script>

<!-- Status segments at the bottom of a window; segments with `onclick` are buttons.

     Why so quiet? The status bar is for glancing, not reading: small grey text, a coloured dot
     only where a state needs it (synced, error), and words that sound like a person — "Saved.
     Nice." rather than "Document saved successfully". -->
<Story name="Playground" />
