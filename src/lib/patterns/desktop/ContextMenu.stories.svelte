<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ContextMenu from './ContextMenu.svelte';
  import Card from '../atoms/Card.svelte';
  import Text from '../atoms/Text.svelte';

  const { Story } = defineMeta({
    title: 'Organisms/Desktop & OS/ContextMenu',
    component: ContextMenu,
    tags: ['autodocs'],
  });
</script>

<!-- Right-click the card (or focus it and press Shift+F10). Arrows move, Enter picks, Escape
     closes.

     Why does it pop from its corner? Menus grow out of the point you clicked, so the eye never
     has to find them. Why a soft tinted highlight instead of a solid blue bar? A solid bar
     flickers across the menu as the pointer moves; the selected-layer tint is calm enough to
     follow the pointer and still unmistakable. Destructive items stay red text and only get a
     red tint when highlighted — the warning is there before you commit, not shouted. -->
<Story name="ContextMenu" asChild>
  <ContextMenu
    items={[
      { label: 'Open', shortcut: '⌘O' },
      { label: 'Get info', icon: 'info', shortcut: '⌘I' },
      { label: 'Duplicate', icon: 'copy', shortcut: '⌘D' },
      { separator: true },
      { label: 'Show preview', checked: true },
      { separator: true },
      { label: 'Move to trash', icon: 'trash', danger: true, shortcut: '⌘⌫' },
    ]}
  >
    <Card title="Quarterly report.pdf" tabindex={0}>
      <Text tone="muted">Right-click me.</Text>
    </Card>
  </ContextMenu>
</Story>
