<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Stat from './Stat.svelte';
  import Grid from '../layout/Grid.svelte';
  import Layer from '../layout/Layer.svelte';

  const { Story } = defineMeta({
    title: 'Molecules/Stat',
    component: Stat,
    tags: ['autodocs'],
    args: {
      label: 'Cards done',
      value: 128,
      delta: 12.5,
      deltaLabel: 'vs last week',
      trend: [64, 70, 68, 81, 77, 92, 101, 96, 110, 118, 114, 128],
    },
    argTypes: {
      size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
      goodWhen: { control: 'inline-radio', options: ['up', 'down', 'none'] },
    },
  });
</script>

<Story name="Playground" />

<!-- A KPI row on the ground layer: no cards, just figures in a Grid. Overdue cards going down is
good news, so it is green. -->
<Story name="KPI row" asChild>
  <Grid min="12rem" gap="lg">
    <Stat
      label="Cards done"
      value={128}
      delta={12.5}
      deltaLabel="vs last week"
      icon="check-circle"
      trend={[64, 70, 68, 81, 77, 92, 101, 96, 110, 118, 114, 128]}
    />
    <Stat
      label="Overdue"
      value={7}
      delta={-30}
      goodWhen="down"
      deltaLabel="vs last week"
      icon="clock"
      trend={[12, 11, 13, 10, 9, 10, 8, 7]}
    />
    <Stat
      label="Cycle time"
      value="3.4"
      unit="days"
      delta={4}
      goodWhen="down"
      deltaLabel="vs last month"
      icon="activity"
    />
    <Stat
      label="Active members"
      value={42}
      deltaText="+3 new"
      deltaLabel="this week"
      icon="users"
    />
  </Grid>
</Story>

<!-- Big and centred inside a panel. -->
<Story name="Hero figure" asChild>
  <Layer level="panel" padding="lg" style="max-width:22rem">
    <Stat
      size="lg"
      align="center"
      label="Boards shared"
      value={1284}
      delta={18}
      deltaLabel="this quarter"
    />
  </Layer>
</Story>
