import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{$t as t,Cn as n,Ct as r,Ft as i,Gt as a,Ht as o,N as s,Nn as c,Ot as l,Pn as u,Pt as d,Rt as f,_n as p,cn as m,kt as h,l as g,m as _,on as v,wn as y,xt as b,zt as x}from"./iframe-D3QpTFc1.js";import{a as S,i as C,n as w,r as T,t as ee}from"./create-runtime-stories-bgfxAijx.js";import{n as te,t as ne}from"./Application-BDnq78kk.js";import{n as re,t as E}from"./Button-DO5WmEfH.js";import{n as ie,t as D}from"./Section-DwdRemnZ.js";import{n as ae,t as O}from"./Layer-CRpvsKt9.js";import{n as oe,t as se}from"./NavRail-C-UgQWif.js";import{n as ce,t as k}from"./Switch-BtV4cohu.js";import{n as le,t as ue}from"./ArcGauge-DGwutN_x.js";import{n as de,t as fe}from"./smart-home-backdrop-NEkr-GQq.js";import{n as pe,t as me}from"./DocPage-CsFk7mP2.js";import{n as he,t as A}from"./IntroDemo-CW9_mzG4.js";import{n as ge,t as j}from"./IntroList-Bx8yY4i7.js";import{n as _e,t as ve}from"./IntroRules-wrxGE-03.js";import{n as ye,t as be}from"./LiveExample-D3In7IGv.js";function xe(e){let n=m(!0);var r=M(),i=o(f(r),2);c(2),u(r),t(()=>{s(i,`aria-pressed`,a(n)),s(i,`data-emit`,a(n)?``:void 0)}),h(`click`,i,()=>v(n,!a(n))),b(e,r)}var M;function N(){return(N=e((()=>{i(),d(),g(),M=r(`<div class="tile svelte-b92l6g" data-reflect="panel"><span class="svelte-b92l6g">Study</span> <button type="button" class="lamp svelte-b92l6g">Lamp</button> <span class="status svelte-b92l6g" data-emit="ok">Online</span></div>`),l([`click`]),xe.__docgen={data:[],name:`OwnSurfaces.svelte`}})))()}var P;function F(){return(F=e((()=>{P=`<script lang="ts">
  let on = $state(true);
<\/script>

<!-- A reflector: your own surface opts in, and paints the light it catches. -->
<div class="tile" data-reflect="panel">
  <span>Study</span>
  <!-- An emitter: full light in the tint while it is on ("soft" for a gentle glow). -->
  <button
    type="button"
    class="lamp"
    aria-pressed={on}
    data-emit={on ? '' : undefined}
    onclick={() => (on = !on)}
  >
    Lamp
  </button>
  <!-- Status light: "ok" or "danger", never in the tint. -->
  <span class="status" data-emit="ok">Online</span>
</div>

<style>
  .tile {
    display: flex;
    align-items: center;
    gap: var(--space-4);
    padding: var(--space-5);
    border-radius: var(--radius-card);
    /* --light is written by the Application for each lit surface */
    background: var(--light, none), var(--layer-panel-bg);
  }
  .tile span:first-child {
    flex: 1;
    font-weight: var(--fw-semibold);
  }
  .lamp {
    min-width: 4rem;
    padding: var(--space-2) var(--space-4);
    border: 0;
    border-radius: var(--radius-pill);
    background: var(--fill-subtle);
    color: var(--text);
    font: inherit;
    font-weight: var(--fw-semibold);
    cursor: pointer;
  }
  .lamp[aria-pressed='true'] {
    background: var(--accent);
    color: var(--on-accent);
  }
  .lamp:focus-visible {
    outline: var(--focus-ring);
  }
  .status {
    padding: var(--space-1) var(--space-3);
    border-radius: var(--radius-pill);
    background: var(--tint-ok);
    color: var(--ok);
    font-size: var(--fs-sm);
    font-weight: var(--fw-semibold);
  }
</style>
`})))()}function I(e){let t=m(!0),n=m(!0),r=m(!0),i=m(`home`),s=m(22.5),l=[{id:`home`,label:`Overview`,icon:`home`},{id:`calendar`,label:`Schedule`,icon:`calendar`},{id:`activity`,label:`Sensors`,icon:`activity`},{id:`settings`,label:`Settings`,icon:`settings`}],d=[{term:`The one main action`,text:`A primary button: Save, Start, Publish.`},{term:`The current place`,text:"The current item of a `NavRail`, `NavBar` or `SideNav`."},{term:`Things that are on`,text:"A pressed `soft` key, a `Switch` that is on."},{term:`A reached value`,text:"The lit arc of an `ArcGauge`."},{term:`Status`,text:"A `success` button shines green and a `danger-solid` one red, never in the tint."}],h=[{term:`Ground`,text:`Nothing to light. The emitter’s own soft halo falls on it.`},{term:`Panel`,text:`A little light pools around an emitter on it, and the edge facing an emitter nearby brightens.`},{term:`Glass`,text:`The front layer, and panels over a photo. Light scatters inside the pane, wider and stronger.`}];me(e,{title:`Light`,lead:`Light comes from what is on or chosen, and falls on what is near it. Every Application lights its pages; there is nothing to set.`,children:(e,m)=>{var g=q(),_=x(g);D(_,{title:`Emitters and reflectors`,children:(e,t)=>{var n=L(),r=o(x(n),2),i=f(r),a=o(f(i),2);j(a,{get items(){return d},layout:`stacked`}),u(i);var s=o(i,2),c=o(f(s),2);j(c,{get items(){return h},layout:`stacked`}),u(s),u(r),b(e,n)},$$slots:{default:!0}});var y=o(_,2);D(y,{title:`Three layers, three kinds of light`,children:(e,r)=>{var s=z(),d=o(x(s),2),m=f(d),h=f(m);A(h,{children:(e,n)=>{{let n=p(()=>a(t)?`primary`:`secondary`);E(e,{get variant(){return a(n)},icon:`play`,label:`Start`})}},$$slots:{default:!0}});var g=o(h,6);k(g,{label:`Emitter on`,get checked(){return a(t)},set checked(e){v(t,e,!0)}}),u(m);var _=o(m,2),y=f(_);A(y,{align:`stretch`,children:(e,t)=>{O(e,{level:`panel`,padding:`lg`,gap:`sm`,direction:`horizontal`,align:`center`,children:(e,t)=>{var r=R(),i=o(x(r),2);E(i,{variant:`soft`,icon:`moon`,label:`Night mode`,iconOnly:!0,get"aria-pressed"(){return a(n)},onclick:()=>v(n,!a(n))}),b(e,r)},$$slots:{default:!0}})},$$slots:{default:!0}});var S=o(y,6);k(S,{label:`Emitter on`,get checked(){return a(n)},set checked(e){v(n,e,!0)}}),u(_);var C=o(_,2),w=f(C);A(w,{children:(e,t)=>{se(e,{get items(){return l},orientation:`horizontal`,label:`Demo`,get current(){return a(i)},set current(e){v(i,e,!0)}})},$$slots:{default:!0}}),c(4),u(C),u(d),b(e,s)},$$slots:{default:!0}});var S=o(y,2);D(S,{title:`From beside`,children:(e,t)=>{var n=U(),i=o(x(n),2);A(i,{align:`stretch`,children:(e,t)=>{var n=H(),i=f(n);O(i,{level:`panel`,padding:`lg`,class:`side`,children:(e,t)=>{var n=B();b(e,n)},$$slots:{default:!0}});var s=o(i,2);{let e=p(()=>a(r)?`primary`:`secondary`);E(s,{get variant(){return a(e)},label:`Publish`,onclick:()=>v(r,!a(r))})}var c=o(s,2);O(c,{level:`panel`,padding:`lg`,class:`side`,children:(e,t)=>{var n=V();b(e,n)},$$slots:{default:!0}}),u(n),b(e,n)},$$slots:{default:!0}}),b(e,n)},$$slots:{default:!0}});var C=o(S,2);D(C,{title:`Over a photo`,children:(e,t)=>{var n=G(),r=o(x(n),2);A(r,{kind:`window`,height:`26rem`,children:(e,t)=>{ne(e,{contained:!0,get image(){return de},children:(e,t)=>{var n=W(),r=f(n);O(r,{level:`panel`,padding:`lg`,class:`photo-card`,children:(e,t)=>{ue(e,{label:`Living room`,min:16,max:28,step:.5,unit:`°C`,get value(){return a(s)},set value(e){v(s,e,!0)}})},$$slots:{default:!0}}),u(n),b(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}}),b(e,n)},$$slots:{default:!0}});var w=o(C,2);D(w,{title:`How it works`,children:(e,t)=>{var n=K(),r=o(x(n),2),i=o(f(r),9);i.textContent=`light={false}`,c(),u(r);var a=o(r,4);be(a,{get source(){return P},label:`Study.svelte`,kind:`stage`,caption:`Your own tile and lamp, lit like the library's. Press the lamp and watch the tile.`,children:(e,t)=>{xe(e,{})},$$slots:{default:!0}}),b(e,n)},$$slots:{default:!0}});var T=o(w,2);D(T,{title:`Rules`,children:(e,t)=>{ve(e,{dos:[`Let light mean “on” or “chosen”, and only that.`,`Keep one strong emitter per group: the main action or the current place.`,'Give status its own light: `data-emit="ok"` or `"danger"`.'],donts:[`Light disabled things, or things that merely look nice.`,`Rely on light alone: the state is also in the words and for assistive tech.`,`Paint a glow by hand beside an emitter. The light does that for you.`]})},$$slots:{default:!0}}),b(e,g)},$$slots:{default:!0}})}var L,R,z,B,V,H,U,W,G,K,q;function J(){return(J=e((()=>{i(),d(),g(),pe(),he(),ge(),_e(),ie(),ae(),te(),re(),ce(),le(),oe(),fe(),ye(),N(),F(),L=r(`<p>Emitters give light; the surfaces around them catch it, each in its own way.</p> <div class="two svelte-786i60"><div><h3 class="svelte-786i60">Emitters</h3> <!></div> <div><h3 class="svelte-786i60">Reflectors</h3> <!></div></div>`,1),R=r(`<div class="grow svelte-786i60"><strong>Night mode</strong> <span class="muted svelte-786i60">Dims the lights after ten.</span></div> <!>`,1),z=r(`<p>The same light looks different depending on where it lands. Turn each emitter on and off.</p> <div class="cases svelte-786i60"><div class="case svelte-786i60"><!> <h3>On the ground</h3> <p>Only the emitter’s own halo: a soft pool of tint beneath it.</p> <!></div> <div class="case svelte-786i60"><!> <h3>On a panel</h3> <p>A little light pools in the tile around the key, and stays inside it.</p> <!></div> <div class="case svelte-786i60"><!> <h3>In glass</h3> <p>The current item lights the pane from within, and the light follows it to the next.</p></div></div>`,1),B=r(`<strong>Draft</strong>`),V=r(`<strong>Live</strong>`),H=r(`<div class="between svelte-786i60"><!> <!> <!></div>`),U=r(`<p>Light reaches the surfaces next to an emitter, on the side that faces it. Press Publish and
      watch the inner edges of both tiles.</p> <!>`,1),W=r(`<div class="photo svelte-786i60"><!></div>`),G=r(`<p>Over a picture, panels are glass, so the gauge’s lit arc glows into the frosted pane around
      it. Drag the arc.</p> <!>`,1),K=r(`<p>Library parts mark themselves with <code>data-emit</code>. The <code>Application</code> measures where they are and writes the light each nearby surface catches into its <code>--light</code>, which panels and glass paint under their own background. When something
      moves, such as a selection flowing to its place, a press or a scroll, the light moves with it.
      At rest nothing runs.</p> <p>Your own parts join in the same way: an emitter carries <code>data-emit</code>, a surface
      carries <code>data-reflect</code> and paints <code>--light</code> under its background. Light is on in
      every <code>Application</code>; <code></code> turns it off for a page that must
      stay still.</p> <p>How much light there is, is one value from 0 to 1: <code>shine</code> on the <code>Application</code> (the <code>--shine</code> token). It scales the light on the surfaces
      and the glows together, so 0.2 shines and glows less than 0.8. The default is 0.6. Try it with <strong>Shine</strong> in the toolbar above.</p> <!>`,1),q=r(`<!> <!> <!> <!> <!> <!>`,1),I.__docgen={data:[],name:`Light.svelte`}})))()}function Y(e,t){y(t,!1),_(),Z(e,{name:`Light`,parameters:{__svelteCsf:{rawCode:`<Light {...args} />`}}}),n()}var X,Z,Q,$,Se;function Ce(){return(Ce=e((()=>{i(),d(),S(),C(),J(),g(),w(),X={title:`Introduction/Light`,component:I,tags:[`!autodocs`],parameters:{layout:`fullscreen`,controls:{disable:!0}}},{Story:Z}=T(X),Y.__docgen={data:[],name:`Light.stories.svelte`},Q=ee(Y,X),$=[`Light`],Se={...Q.Light,tags:[`svelte-csf-v5`]}})))()}Ce();export{Se as Light,$ as __namedExportsOrder,X as default};