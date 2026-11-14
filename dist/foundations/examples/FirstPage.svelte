<script lang="ts">
  import { Page, Section, Grid, KpiTile, Button } from '../../index';
</script>

<Page title="Orders" subtitle="today">
  {#snippet actions()}
    <Button variant="primary" shape="pill" icon="plus" label="New order" />
  {/snippet}

  <Section title="At a glance">
    <Grid min="10rem">
      <KpiTile label="Open">24</KpiTile>
      <KpiTile label="Shipped">118</KpiTile>
      <KpiTile label="Returns">3</KpiTile>
    </Grid>
  </Section>
</Page>
