import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{$t as t,Cn as n,Ct as r,Dt as i,Ft as a,Gt as o,Ht as s,N as c,Nn as l,Ot as u,Pn as d,Pt as f,Rt as p,cn as ee,kt as m,l as h,m as g,on as te,wn as _,xt as v,zt as y}from"./iframe-D3QpTFc1.js";import{a as b,i as ne,n as re,r as ie,t as ae}from"./create-runtime-stories-bgfxAijx.js";import{n as oe,t as x}from"./Button-DO5WmEfH.js";import{n as S,t as C}from"./KpiTile-B3lfo08i.js";import{n as w,t as T}from"./Section-DwdRemnZ.js";import{n as se,t as ce}from"./Page-BnG-6qFd.js";import{n as le,t as ue}from"./Grid-CRR54iID.js";import{n as de,t as E}from"./CodeBlock-Bd3ie8NB.js";import{d as D,n as fe,t as pe,u as me}from"./DocPage-CsFk7mP2.js";import{n as he,t as ge}from"./IntroList-Bx8yY4i7.js";import{a as _e,d as ve,i as ye}from"./snippets-D7TKjQJC.js";import{n as be,t as O}from"./LiveExample-D3In7IGv.js";function k(e){ce(e,{title:`Orders`,subtitle:`today`,actions:e=>{x(e,{variant:`primary`,shape:`pill`,icon:`plus`,label:`New order`})},children:(e,t)=>{T(e,{title:`At a glance`,children:(e,t)=>{ue(e,{min:`10rem`,children:(e,t)=>{var n=A(),r=y(n);C(r,{label:`Open`,children:(e,t)=>{l();var n=i(`24`);v(e,n)},$$slots:{default:!0}});var a=s(r,2);C(a,{label:`Shipped`,children:(e,t)=>{l();var n=i(`118`);v(e,n)},$$slots:{default:!0}});var o=s(a,2);C(o,{label:`Returns`,children:(e,t)=>{l();var n=i(`3`);v(e,n)},$$slots:{default:!0}}),v(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{actions:!0,default:!0}})}var A;function j(){return(j=e((()=>{a(),f(),b(),h(),se(),w(),le(),S(),oe(),A=r(`<!> <!> <!>`,1),k.__docgen={data:[],name:`FirstPage.svelte`}})))()}var M;function N(){return(N=e((()=>{M=`<script lang="ts">
  import { Page, Section, Grid, KpiTile, Button } from '../../index';
<\/script>

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
`})))()}function P(e){let n=ee(!1);var r=F(),i=y(r);l(2),t(()=>c(i,`aria-pressed`,o(n))),m(`click`,i,()=>te(n,!o(n))),v(e,r)}var F;function I(){return(I=e((()=>{a(),f(),h(),F=r(`<button type="button" class="my-chip svelte-1yn5rlg">Design</button> <button type="button" class="my-chip danger svelte-1yn5rlg">Overdue</button>`,1),u([`click`]),P.__docgen={data:[],name:`MyChip.svelte`}})))()}var L;function R(){return(R=e((()=>{L=`<script lang="ts">
  let picked = $state(false);
<\/script>

<button type="button" class="my-chip" aria-pressed={picked} onclick={() => (picked = !picked)}>
  Design
</button>
<button type="button" class="my-chip danger">Overdue</button>

<style>
  /* In your own components: never a literal colour, always a token. */
  .my-chip {
    padding: var(--space-1) var(--space-3);
    border: 1px solid var(--accent-border);
    border-radius: var(--radius-pill);
    background: var(--accent-soft); /* tinted background */
    color: var(--accent-ink); /* accent as readable text */
    font: inherit;
    font-size: var(--fs-sm);
    font-weight: var(--fw-semibold);
    cursor: pointer;
    transition: background var(--motion-quick) var(--ease-out);
  }
  .my-chip:hover {
    background: var(--accent-faint);
  }
  .my-chip[aria-pressed='true'] {
    background: var(--accent);
    color: var(--on-accent);
  }
  .my-chip.danger {
    border-color: transparent;
    background: var(--tint-danger);
    color: var(--danger);
  }
  .my-chip:focus-visible {
    outline: var(--focus-ring);
  }
</style>
`})))()}function z(e,t){_(t,!1);let r=[{term:`Layers`,text:`Which surface to use for what, and why front elements are always sticky.`,href:D(`introduction-layers--layers`)},{term:`Colour & tint`,text:`Try any tint live and copy the code.`,href:D(`introduction-colour-tint--colour-tint`)},{term:`Layout`,text:"`Stack`, `Row`, `Grid` and `Section` in five minutes.",href:D(`introduction-layout--layout`)},{term:`Recipes`,text:`Starters for dashboards, websites, shops, team tools, devices and desktop apps.`,href:D(`introduction-recipes--recipes`)}];g(),pe(e,{title:`Getting started`,lead:`Install the package, wrap your app in an Application, write a page. Every block below is complete: copy it as it is.`,children:(e,t)=>{var n=G(),i=y(n);T(i,{title:`Install`,children:(e,t)=>{var n=B(),r=s(y(n),2);E(r,{label:`Terminal`,get code(){return _e}}),v(e,n)},$$slots:{default:!0}});var a=s(i,2);T(a,{title:`Wrap the app`,children:(e,t)=>{var n=V(),r=s(y(n),2);E(r,{label:`src/routes/+layout.svelte`,get code(){return ve}});var i=s(r,2),a=s(p(i),5);a.textContent=`flow={false}`;var o=s(a,2);o.textContent=`light={false}`,l(),d(i),v(e,n)},$$slots:{default:!0}});var o=s(a,2);T(o,{title:`Write a page`,children:(e,t)=>{var n=H(),r=s(y(n),2);O(r,{get source(){return M},label:`src/routes/+page.svelte`,height:`17rem`,caption:`The file below, running.`,children:(e,t)=>{k(e,{})},$$slots:{default:!0}}),v(e,n)},$$slots:{default:!0}});var c=s(o,2);T(c,{title:`Your own components`,children:(e,t)=>{var n=W(),r=s(y(n),2);O(r,{get source(){return L},label:`MyChip.svelte`,kind:`stage`,caption:`The chip from the code. Press it; switch the tint in the toolbar.`,children:(e,t)=>{var n=U();P(p(n),{}),d(n),v(e,n)},$$slots:{default:!0}}),v(e,n)},$$slots:{default:!0}});var u=s(c,2);T(u,{title:`Where next`,children:(e,t)=>{ge(e,{get items(){return r}})},$$slots:{default:!0}}),v(e,n)},$$slots:{default:!0}}),n()}var B,V,H,U,W,G;function K(){return(K=e((()=>{a(),f(),b(),h(),fe(),he(),be(),w(),de(),j(),N(),I(),R(),ye(),me(),B=r(`<p>One package, one peer: <code>svelte ^5.20</code>. <code>leaflet</code> is optional and only
      needed for <code>MapView</code>, which comes from <code>@bonbon-ui/core/map</code>.</p> <!>`,1),V=r(`<p>Import the styles once and put one <code>Application</code> around everything. It owns the theme
      (tint, light or dark, radius, density), and it makes the page answer presses and catch light.</p> <!> <p>Prefer your own reset? Import <code>@bonbon-ui/core/tokens.css</code> instead of <code>styles.css</code>. For a page that must stay still, <code></code> and <code></code> turn the motion and the light off.</p>`,1),H=r(`<p>A <code>Page</code> frames the screen: the floating header, the content edges and the gaps between
      blocks. You only name the parts.</p> <!>`,1),U=r(`<div class="chips svelte-ay8a65"><!></div>`),W=r(`<p>Style them with tokens, never literal colours, and they follow the tint, the theme and the
      density like the library's own.</p> <!>`,1),G=r(`<!> <!> <!> <!> <!>`,1),z.__docgen={data:[],name:`GettingStarted.svelte`}})))()}function q(e,t){_(t,!1),g(),Y(e,{name:`Getting started`,parameters:{__svelteCsf:{rawCode:`<GettingStarted {...args} />`}}}),n()}var J,Y,X,Z,Q;function $(){return($=e((()=>{a(),f(),b(),ne(),K(),h(),re(),J={title:`Introduction/Getting started`,component:z,tags:[`!autodocs`],parameters:{layout:`fullscreen`,controls:{disable:!0}}},{Story:Y}=ie(J),q.__docgen={data:[],name:`GettingStarted.stories.svelte`},X=ae(q,J),Z=[`GettingStarted`],Q={...X.GettingStarted,tags:[`svelte-csf-v5`]}})))()}$();export{Q as GettingStarted,Z as __namedExportsOrder,J as default};