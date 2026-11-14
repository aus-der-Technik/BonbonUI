import{n as e}from"./rolldown-runtime-sJBDdmOt.js";var t,n,r,i,a,o;function s(){return(s=e((()=>{t=`npm install @bonbon-ui/core
npm install leaflet   # only if you use MapView

# From a private registry? Point the scope at it in .npmrc:
# @bonbon-ui:registry=https://registry.example.com/`,n=`<!-- src/routes/+layout.svelte -->
<script lang="ts">
  import '@bonbon-ui/core/styles.css'; // tokens + reset, once per app
  import { Application } from '@bonbon-ui/core';

  let { children } = $props();
<\/script>

<Application tint="#5a9854">
  {@render children()}
</Application>`,r=`<Application tint="#007aff">
  <Page title="Team" subtitle="who is in">
    <Section
      title="Members"
      description="Everyone who can sign in."
    >
      <Grid min="7rem">
        <Card>Ada</Card>
        <Card selected>Grace</Card>
        <Card>Linus</Card>
      </Grid>
    </Section>
  </Page>
</Application>`,i=(e,t,n,r)=>{let i=[`tint="${e}"`];return t!==`auto`&&i.push(`theme="${t}"`),n!==`soft`&&i.push(`radius="${n}"`),r!=="default"&&i.push(`density="${r}"`),`<Application ${i.join(` `)}>
  …your pages…
</Application>`},a=`<!-- Before: wrappers for every bit of spacing -->
<div class="card">
  <div style="display:flex; justify-content:space-between; margin-bottom:12px">
    <h2>Members</h2>
    <div style="display:flex; gap:8px"><button>Invite</button></div>
  </div>
  <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:16px">
    …
  </div>
</div>`,o=`<Stack gap="lg">…</Stack>                          <!-- vertical, 1.5rem apart -->
<Row gap="sm">…<Spacer />…</Row>                    <!-- a toolbar: left · right -->
<Row collapse="md" equal>…</Row>                    <!-- side by side, stacked < 720px -->
<Grid min="16rem">…</Grid>                          <!-- as many 16rem+ columns as fit -->
<Grid columns={3}>…</Grid>                          <!-- at most 3 -->
<Grid columns="2fr 1fr" collapse="lg">…</Grid>      <!-- fixed template, 1 column < 960px -->`})))()}export{o as a,n as i,t as n,i as o,a as r,r as s,s as t};