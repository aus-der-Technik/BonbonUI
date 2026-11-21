<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Layer from '../layout/Layer.svelte';
  import Row from '../layout/Row.svelte';
  import Stack from '../layout/Stack.svelte';
  import ToolGroup from '../molecules/ToolGroup.svelte';
  import IconButton from './IconButton.svelte';
  import Text from './Text.svelte';

  const { Story } = defineMeta({
    title: 'Atoms/IconButton',
    component: IconButton,
    tags: ['autodocs'],
    args: { icon: 'bold', label: 'Bold', shortcut: ['Mod', 'B'] },
    argTypes: {
      size: { control: 'inline-radio', options: ['sm', 'md'] },
      shape: { control: 'inline-radio', options: ['rounded', 'pill'] },
      tone: { control: 'inline-radio', options: ['neutral', 'accent', 'danger'] },
      pressed: { control: 'select', options: [undefined, false, true] },
    },
  });
</script>

<script lang="ts">
  let marks = $state({ bold: true, italic: false, underline: false, strike: false });
  let block = $state<'p' | 'h1' | 'h2' | 'list' | 'quote'>('h2');
  let align = $state<'left' | 'center' | 'right'>('left');
</script>

<!-- Point at it: the hint shows the name and its shortcut, written the platform's way. -->
<Story name="Playground" />

<!-- A format bar that floats over text. The bar is the glass; its tools are flat and only fill on
hover, so there is no glass inside glass. Toggles that are on take the selected layer's tint.
The ToolGroup makes the bar one Tab stop — the arrow keys walk the tools. Pills inside the pill
bar keep the corners concentric. -->
<Story name="Format bar" asChild>
  <Stack gap="lg" padding="2xl">
    <Layer level="front" direction="horizontal" padding="xs" gap="xs" wrap={false} lens={false}>
      <ToolGroup label="Format the selection">
        <IconButton
          icon="bold"
          label="Bold"
          shape="pill"
          shortcut={['Mod', 'B']}
          pressed={marks.bold}
          onclick={() => (marks.bold = !marks.bold)}
        />
        <IconButton
          icon="italic"
          label="Italic"
          shape="pill"
          shortcut={['Mod', 'I']}
          pressed={marks.italic}
          onclick={() => (marks.italic = !marks.italic)}
        />
        <IconButton
          icon="underline"
          label="Underline"
          shape="pill"
          shortcut={['Mod', 'U']}
          pressed={marks.underline}
          onclick={() => (marks.underline = !marks.underline)}
        />
        <IconButton
          icon="strikethrough"
          label="Strikethrough"
          shape="pill"
          shortcut={['Mod', 'Shift', 'X']}
          pressed={marks.strike}
          onclick={() => (marks.strike = !marks.strike)}
        />
      </ToolGroup>
      <span
        aria-hidden="true"
        style="width:1px;height:18px;margin:0 var(--space-1);background:var(--border-strong)"
      ></span>
      <ToolGroup label="Turn into">
        {#each [['heading-1', 'h1', 'Title'], ['heading-2', 'h2', 'Heading'], ['list', 'list', 'Bulleted list'], ['quote', 'quote', 'Quote']] as const as [icon, kind, label] (kind)}
          <IconButton
            {icon}
            {label}
            shape="pill"
            pressed={block === kind}
            onclick={() => (block = block === kind ? 'p' : kind)}
          />
        {/each}
      </ToolGroup>
      <span
        aria-hidden="true"
        style="width:1px;height:18px;margin:0 var(--space-1);background:var(--border-strong)"
      ></span>
      <IconButton icon="link" label="Link" shape="pill" shortcut={['Mod', 'K']} />
      <IconButton
        icon="message-plus"
        label="Comment"
        tone="accent"
        shape="pill"
        shortcut={['Mod', 'Alt', 'M']}
      />
    </Layer>
  </Stack>
</Story>

<!-- Two sizes: `md` is 32px, `sm` looks 26px and keeps a 32px hit area. Rounded (a tool you
hold) by default. `accent` marks the tool the bar is about, `danger` a destructive one. A
disabled tool dims; `aria-disabled` dims it but keeps it focusable. -->
<Story name="Sizes, tones and states" asChild>
  <Stack padding="2xl">
    <Layer level="panel" padding="md" gap="md">
      <Row gap="xs">
        <IconButton icon="undo" label="Undo" tooltip="Undo typing" shortcut={['Mod', 'Z']} />
        <IconButton icon="redo" label="Redo" disabled />
        <IconButton icon="copy" label="Duplicate" />
        <IconButton icon="message-plus" label="Comment" tone="accent" />
        <IconButton icon="trash" label="Delete" tone="danger" shortcut={['Backspace']} />
        <IconButton
          icon="align-left"
          label="Align left"
          pressed={align === 'left'}
          onclick={() => (align = 'left')}
        />
        <IconButton
          icon="align-center"
          label="Align centre"
          pressed={align === 'center'}
          onclick={() => (align = 'center')}
        />
        <IconButton
          icon="align-right"
          label="Align right"
          pressed={align === 'right'}
          onclick={() => (align = 'right')}
        />
      </Row>
      <Row gap="xs">
        <IconButton size="sm" icon="minus" label="Smaller text" />
        <IconButton size="sm" icon="plus" label="Larger text" />
        <IconButton size="sm" icon="bold" label="Bold" pressed />
        <IconButton size="sm" icon="trash" label="Delete" tone="danger" />
        <IconButton size="sm" icon="lock" label="Locked" aria-disabled="true" />
      </Row>
    </Layer>
  </Stack>
</Story>

<!-- Some tools need a word: `showLabel` puts the label beside the icon (the tooltip then only
appears when it adds a shortcut). `children` replaces the icon — a zoom level, a colour. -->
<Story name="Labelled tools" asChild>
  <Stack gap="md">
    <Layer level="panel" direction="horizontal" padding="xs" gap="xs" wrap={false}>
      <IconButton icon="type" label="Text" showLabel pressed />
      <IconButton icon="square" label="Shape" showLabel pressed={false} />
      <IconButton icon="chart" label="Chart" showLabel pressed={false} />
      <IconButton icon="share" label="Share" showLabel shortcut={['Mod', 'Shift', 'S']} />
    </Layer>
    <Row gap="xs">
      <IconButton icon="minus" label="Zoom out" />
      <IconButton label="Zoom 100%, reset to 100%" tooltip="Back to 100%">
        <Text size="xs" weight="semibold" as="span">100%</Text>
      </IconButton>
      <IconButton icon="plus" label="Zoom in" />
    </Row>
  </Stack>
</Story>
