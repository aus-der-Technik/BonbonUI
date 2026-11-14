import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Cn as t,Dt as n,Et as r,Mt as i,N as a,Ot as o,Qt as s,Rt as c,St as l,Ut as u,Wt as d,bt as f,en as ee,fn as p,jn as m,l as h,m as g,pn as _,qt as v,wn as y}from"./iframe-D4jyjLko.js";import{a as b,i as x,n as te,r as ne,t as re}from"./create-runtime-stories-2Z8qmkK0.js";import{n as ie,t as ae}from"./Button-05yF-FzT.js";import{n as oe,t as S}from"./KpiTile-Dd-0U-IN.js";import{n as C,t as w}from"./Section-BlhtZB0s.js";import{n as T,t as se}from"./Page-D4tjT4BN.js";import{n as ce,t as le}from"./Grid-DomK7W-r.js";import{n as ue,t as E}from"./CodeBlock-CYZDslA6.js";import{d as D,n as de,t as fe,u as pe}from"./DocPage-DUxo1qmf.js";import{n as me,t as he}from"./IntroList-B-NtgEk3.js";import{i as ge,n as _e,t as ve}from"./snippets-LStJ6uGk.js";import{n as ye,t as O}from"./LiveExample-kL2RpJLP.js";function k(e){se(e,{title:`Orders`,subtitle:`today`,actions:e=>{ae(e,{variant:`primary`,shape:`pill`,icon:`plus`,label:`New order`})},children:(e,n)=>{w(e,{title:`At a glance`,children:(e,n)=>{le(e,{min:`10rem`,children:(e,n)=>{var i=A(),a=d(i);S(a,{label:`Open`,children:(e,n)=>{t();var i=r(`24`);f(e,i)},$$slots:{default:!0}});var o=v(a,2);S(o,{label:`Shipped`,children:(e,n)=>{t();var i=r(`118`);f(e,i)},$$slots:{default:!0}});var s=v(o,2);S(s,{label:`Returns`,children:(e,n)=>{t();var i=r(`3`);f(e,i)},$$slots:{default:!0}}),f(e,i)},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{actions:!0,default:!0}})}var A;function j(){return(j=e((()=>{m(),b(),h(),T(),C(),ce(),oe(),ie(),A=l(`<!> <!> <!>`,1),k.__docgen={data:[],name:`FirstPage.svelte`}})))()}var M;function N(){return(N=e((()=>{M=`<script lang="ts">
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
`})))()}function P(e){let n=ee(!1);var r=F(),l=d(r);t(2),c(()=>a(l,`aria-pressed`,i(n))),o(`click`,l,()=>s(n,!i(n))),f(e,r)}var F;function I(){return(I=e((()=>{m(),h(),F=l(`<button type="button" class="my-chip svelte-1yn5rlg">Design</button> <button type="button" class="my-chip danger svelte-1yn5rlg">Overdue</button>`,1),n([`click`]),P.__docgen={data:[],name:`MyChip.svelte`}})))()}var L;function R(){return(R=e((()=>{L=`<script lang="ts">
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
`})))()}function z(e,n){_(n,!1);let r=[{term:`Layers`,text:`Which surface to use for what, and why front elements are always sticky.`,href:D(`introduction-layers--layers`)},{term:`Colour & tint`,text:`Try any tint live and copy the code.`,href:D(`introduction-colour-tint--colour-tint`)},{term:`Layout`,text:"`Stack`, `Row`, `Grid` and `Section` in five minutes.",href:D(`introduction-layout--layout`)},{term:`Recipes`,text:`Starters for dashboards, websites, shops, team tools, devices and desktop apps.`,href:D(`introduction-recipes--recipes`)}];g(),fe(e,{title:`Getting started`,lead:`Install the package, wrap your app in an Application, write a page. Every block below is complete: copy it as it is.`,children:(e,n)=>{var i=G(),a=d(i);w(a,{title:`Install`,children:(e,t)=>{var n=B(),r=v(d(n),2);E(r,{label:`Terminal`,get code(){return _e}}),f(e,n)},$$slots:{default:!0}});var o=v(a,2);w(o,{title:`Wrap the app`,children:(e,n)=>{var r=V(),i=v(d(r),2);E(i,{label:`src/routes/+layout.svelte`,get code(){return ge}});var a=v(i,2),o=v(u(a),5);o.textContent=`flow={false}`;var s=v(o,2);s.textContent=`light={false}`,t(),y(a),f(e,r)},$$slots:{default:!0}});var s=v(o,2);w(s,{title:`Write a page`,children:(e,t)=>{var n=H(),r=v(d(n),2);O(r,{get source(){return M},label:`src/routes/+page.svelte`,height:`17rem`,caption:`The file below, running.`,children:(e,t)=>{k(e,{})},$$slots:{default:!0}}),f(e,n)},$$slots:{default:!0}});var c=v(s,2);w(c,{title:`Your own components`,children:(e,t)=>{var n=W(),r=v(d(n),2);O(r,{get source(){return L},label:`MyChip.svelte`,kind:`stage`,caption:`The chip from the code. Press it; switch the tint in the toolbar.`,children:(e,t)=>{var n=U();P(u(n),{}),y(n),f(e,n)},$$slots:{default:!0}}),f(e,n)},$$slots:{default:!0}});var l=v(c,2);w(l,{title:`Where next`,children:(e,t)=>{he(e,{get items(){return r}})},$$slots:{default:!0}}),f(e,i)},$$slots:{default:!0}}),p()}var B,V,H,U,W,G;function K(){return(K=e((()=>{m(),b(),h(),de(),me(),ye(),C(),ue(),j(),N(),I(),R(),ve(),pe(),B=l(`<p>One package, one peer: <code>svelte ^5.20</code>. <code>leaflet</code> is optional and only
      needed for <code>MapView</code>, which comes from <code>@bonbon-ui/core/map</code>.</p> <!>`,1),V=l(`<p>Import the styles once and put one <code>Application</code> around everything. It owns the theme
      (tint, light or dark, radius, density), and it makes the page answer presses and catch light.</p> <!> <p>Prefer your own reset? Import <code>@bonbon-ui/core/tokens.css</code> instead of <code>styles.css</code>. For a page that must stay still, <code></code> and <code></code> turn the motion and the light off.</p>`,1),H=l(`<p>A <code>Page</code> frames the screen: the floating header, the content edges and the gaps between
      blocks. You only name the parts.</p> <!>`,1),U=l(`<div class="chips svelte-ay8a65"><!></div>`),W=l(`<p>Style them with tokens, never literal colours, and they follow the tint, the theme and the
      density like the library's own.</p> <!>`,1),G=l(`<!> <!> <!> <!> <!>`,1),z.__docgen={data:[],name:`GettingStarted.svelte`}})))()}function q(e,t){_(t,!1),g(),Y(e,{name:`Getting started`,parameters:{__svelteCsf:{rawCode:`<GettingStarted {...args} />`}}}),p()}var J,Y,X,Z,Q;function $(){return($=e((()=>{m(),b(),x(),K(),h(),te(),J={title:`Introduction/Getting started`,component:z,tags:[`!autodocs`],parameters:{layout:`fullscreen`,controls:{disable:!0}}},{Story:Y}=ne(J),q.__docgen={data:[],name:`GettingStarted.stories.svelte`},X=re(q,J),Z=[`GettingStarted`],Q={...X.GettingStarted,tags:[`svelte-csf-v5`]}})))()}$();export{Q as GettingStarted,Z as __namedExportsOrder,J as default};