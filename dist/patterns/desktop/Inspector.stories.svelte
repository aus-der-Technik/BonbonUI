<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Inspector from './Inspector.svelte';
  import InspectorRow from './InspectorRow.svelte';
  import InspectorSection from './InspectorSection.svelte';
  import AppIcon from '../atoms/AppIcon.svelte';
  import Button from '../atoms/Button.svelte';
  import Input from '../atoms/Input.svelte';
  import Switch from '../atoms/Switch.svelte';
  import Tag from '../atoms/Tag.svelte';
  import Row from '../layout/Row.svelte';

  const { Story } = defineMeta({
    title: 'Organisms/Desktop & OS/Inspector',
    component: Inspector,
    tags: ['autodocs'],
  });
</script>

<script lang="ts">
  let name = $state('Quarterly report.pdf');
  let locked = $state(false);
</script>

<!-- Properties of the selected file: a header with a preview, then sections of label + control
     rows that line up (and stack when the panel is narrow).

     Why right-aligned labels? Label and value meet at one shared edge, so the eye zig-zags
     less and every control starts at the same line — auto layout aligning edges for you. The
     panel itself stays flat inside a window: glass only where something floats. -->
<Story name="Inspector" asChild>
  <div style="max-width:20rem">
    <Inspector title={name} subtitle="PDF document · 2.4 MB" surface>
      {#snippet preview()}<AppIcon label="PDF" icon="file-text" color="red" size="lg" />{/snippet}
      {#snippet actions()}<Button icon="share" label="Share" size="sm" /><Button
          icon="download"
          label="Download"
          size="sm"
        />{/snippet}
      <InspectorSection title="General">
        <InspectorRow label="Name" for="insp-name"
          ><Input id="insp-name" bind:value={name} size="sm" /></InspectorRow
        >
        <InspectorRow label="Kind" value="PDF document" />
        <InspectorRow label="Created" value="12 Oct 2026, 09:41" />
        <InspectorRow label="Tags">
          <Row gap="xs"><Tag label="Work" color="blue" /><Tag label="Urgent" color="red" /></Row>
        </InspectorRow>
      </InspectorSection>
      <InspectorSection title="Sharing & permissions" collapsible>
        <InspectorRow label="Locked" hint="Nobody can change it."
          ><Switch bind:checked={locked} aria-label="Locked" /></InspectorRow
        >
        <InspectorRow label="Owner" value="ana@example.com" />
      </InspectorSection>
    </Inspector>
  </div>
</Story>
