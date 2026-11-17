import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Bt as t,Ct as n,Dt as r,En as i,Gt as a,Kt as o,N as s,Nn as c,Ot as l,Pt as u,Tn as d,Yt as f,en as p,hn as m,kt as ee,l as h,m as g,mn as _,nn as te,xt as v}from"./iframe-CRBWUEFv.js";import{a as y,i as b,n as ne,r as re,t as ie}from"./create-runtime-stories-DtoOt73Q.js";import{n as ae,t as oe}from"./Button-CVctU_KR.js";import{n as se,t as x}from"./KpiTile-wctMb6He.js";import{n as S,t as C}from"./Section-Byz1upsT.js";import{n as ce,t as w}from"./Page-C00D5PkX.js";import{n as le,t as ue}from"./Grid-DlBYjD7t.js";import{n as de,t as T}from"./CodeBlock-DhUAaEQU.js";import{d as E,n as fe,t as pe,u as me}from"./DocPage-BliD11lV.js";import{n as he,t as ge}from"./IntroList-kWWotFJS.js";import{a as _e,d as D,i as ve}from"./snippets-BgbzBoSt.js";import{n as ye,t as O}from"./LiveExample-CsON182q.js";function k(e){w(e,{title:`Orders`,subtitle:`today`,actions:e=>{oe(e,{variant:`primary`,shape:`pill`,icon:`plus`,label:`New order`})},children:(e,t)=>{C(e,{title:`At a glance`,children:(e,t)=>{ue(e,{min:`10rem`,children:(e,t)=>{var n=A(),i=o(n);x(i,{label:`Open`,children:(e,t)=>{d();var n=r(`24`);v(e,n)},$$slots:{default:!0}});var a=f(i,2);x(a,{label:`Shipped`,children:(e,t)=>{d();var n=r(`118`);v(e,n)},$$slots:{default:!0}});var s=f(a,2);x(s,{label:`Returns`,children:(e,t)=>{d();var n=r(`3`);v(e,n)},$$slots:{default:!0}}),v(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{actions:!0,default:!0}})}var A;function j(){return(j=e((()=>{c(),y(),h(),ce(),S(),le(),se(),ae(),A=n(`<!> <!> <!>`,1),k.__docgen={data:[],name:`FirstPage.svelte`}})))()}var M;function N(){return(N=e((()=>{M=`<script lang="ts">
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
`})))()}function P(e){let n=te(!1);var r=F(),i=o(r);d(2),t(()=>s(i,`aria-pressed`,u(n))),ee(`click`,i,()=>p(n,!u(n))),v(e,r)}var F;function I(){return(I=e((()=>{c(),h(),F=n(`<button type="button" class="my-chip svelte-1yn5rlg">Design</button> <button type="button" class="my-chip danger svelte-1yn5rlg">Overdue</button>`,1),l([`click`]),P.__docgen={data:[],name:`MyChip.svelte`}})))()}var L;function R(){return(R=e((()=>{L=`<script lang="ts">
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
`})))()}function z(e,t){m(t,!1);let n=[{term:`Layers`,text:`Which surface to use for what, and why front elements are always sticky.`,href:E(`introduction-layers--layers`)},{term:`Colour & tint`,text:`Try any tint live and copy the code.`,href:E(`introduction-colour-tint--colour-tint`)},{term:`Layout`,text:"`Stack`, `Row`, `Grid` and `Section` in five minutes.",href:E(`introduction-layout--layout`)},{term:`Recipes`,text:`Starters for dashboards, websites, shops, team tools, devices and desktop apps.`,href:E(`introduction-recipes--recipes`)}];g(),pe(e,{title:`Getting started`,lead:`Install the package, wrap your app in an Application, write a page. Every block below is complete: copy it as it is.`,children:(e,t)=>{var r=G(),s=o(r);C(s,{title:`Install`,children:(e,t)=>{var n=B(),r=f(o(n),2);T(r,{label:`Terminal`,get code(){return _e}}),v(e,n)},$$slots:{default:!0}});var c=f(s,2);C(c,{title:`Wrap the app`,children:(e,t)=>{var n=V(),r=f(o(n),2);T(r,{label:`src/routes/+layout.svelte`,get code(){return D}});var s=f(r,2),c=f(a(s),5);c.textContent=`flow={false}`;var l=f(c,2);l.textContent=`light={false}`,d(),i(s),v(e,n)},$$slots:{default:!0}});var l=f(c,2);C(l,{title:`Write a page`,children:(e,t)=>{var n=H(),r=f(o(n),2);O(r,{get source(){return M},label:`src/routes/+page.svelte`,height:`17rem`,caption:`The file below, running.`,children:(e,t)=>{k(e,{})},$$slots:{default:!0}}),v(e,n)},$$slots:{default:!0}});var u=f(l,2);C(u,{title:`Your own components`,children:(e,t)=>{var n=W(),r=f(o(n),2);O(r,{get source(){return L},label:`MyChip.svelte`,kind:`stage`,caption:`The chip from the code. Press it; switch the tint in the toolbar.`,children:(e,t)=>{var n=U();P(a(n),{}),i(n),v(e,n)},$$slots:{default:!0}}),v(e,n)},$$slots:{default:!0}});var p=f(u,2);C(p,{title:`Where next`,children:(e,t)=>{ge(e,{get items(){return n}})},$$slots:{default:!0}}),v(e,r)},$$slots:{default:!0}}),_()}var B,V,H,U,W,G;function K(){return(K=e((()=>{c(),y(),h(),fe(),he(),ye(),S(),de(),j(),N(),I(),R(),ve(),me(),B=n(`<p>One package, one peer: <code>svelte ^5.20</code>. <code>leaflet</code> is optional and only
      needed for <code>MapView</code>, which comes from <code>@bonbon-ui/core/map</code>.</p> <!>`,1),V=n(`<p>Import the styles once and put one <code>Application</code> around everything. It owns the theme
      (tint, light or dark, radius, density), and it makes the page answer presses and catch light.</p> <!> <p>Prefer your own reset? Import <code>@bonbon-ui/core/tokens.css</code> instead of <code>styles.css</code>. For a page that must stay still, <code></code> and <code></code> turn the motion and the light off.</p>`,1),H=n(`<p>A <code>Page</code> frames the screen: the floating header, the content edges and the gaps between
      blocks. You only name the parts.</p> <!>`,1),U=n(`<div class="chips svelte-ay8a65"><!></div>`),W=n(`<p>Style them with tokens, never literal colours, and they follow the tint, the theme and the
      density like the library's own.</p> <!>`,1),G=n(`<!> <!> <!> <!> <!>`,1),z.__docgen={data:[],name:`GettingStarted.svelte`}})))()}function q(e,t){m(t,!1),g(),Y(e,{name:`Getting started`,parameters:{__svelteCsf:{rawCode:`<GettingStarted {...args} />`}}}),_()}var J,Y,X,Z,Q;function $(){return($=e((()=>{c(),y(),b(),K(),h(),ne(),J={title:`Introduction/Getting started`,component:z,tags:[`!autodocs`],parameters:{layout:`fullscreen`,controls:{disable:!0}}},{Story:Y}=re(J),q.__docgen={data:[],name:`GettingStarted.stories.svelte`},X=ie(q,J),Z=[`GettingStarted`],Q={...X.GettingStarted,tags:[`svelte-csf-v5`]}})))()}$();export{Q as GettingStarted,Z as __namedExportsOrder,J as default};