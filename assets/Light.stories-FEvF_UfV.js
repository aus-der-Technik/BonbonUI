import{n as e}from"./rolldown-runtime-Dxh6kD9_.js";import{$t as t,Ct as n,Ft as r,Gt as i,Ht as a,Mn as o,N as s,Ot as c,Pt as l,Rt as u,Sn as d,cn as f,hn as ee,jn as p,kt as m,l as h,m as g,on as _,xn as v,xt as y,zt as b}from"./iframe-WlNMZtZ0.js";import{a as x,i as S,n as C,r as w,t as te}from"./create-runtime-stories-CbHiKinS.js";import{n as ne,t as re}from"./Application-gndBgxdC.js";import{n as ie,t as T}from"./Button-DHLILcYm.js";import{n as ae,t as E}from"./Section-D4Qa1FIu.js";import{n as oe,t as D}from"./Layer-BYjA9ykx.js";import{n as se,t as ce}from"./NavRail-4ZdFKnd6.js";import{n as le,t as O}from"./Switch-BzNNOsRq.js";import{n as ue,t as de}from"./ArcGauge-IyiLFPBD.js";import{n as fe,t as pe}from"./smart-home-backdrop-DvxE839P.js";import{n as me,t as he}from"./DocPage-BkY0UtgC.js";import{n as ge,t as k}from"./IntroDemo-D5OQ1Vy4.js";import{n as _e,t as A}from"./IntroList-CzEFfEAH.js";import{n as ve,t as ye}from"./IntroRules-BFEDwU3T.js";import{n as be,t as xe}from"./LiveExample-BW_h6poA.js";function j(e){let n=f(!0);var r=M(),c=a(u(r),2);p(2),o(r),t(()=>{s(c,`aria-pressed`,i(n)),s(c,`data-emit`,i(n)?``:void 0)}),m(`click`,c,()=>_(n,!i(n))),y(e,r)}var M;function N(){return(N=e((()=>{r(),l(),h(),M=n(`<div class="tile svelte-b92l6g" data-reflect="panel"><span class="svelte-b92l6g">Study</span> <button type="button" class="lamp svelte-b92l6g">Lamp</button> <span class="status svelte-b92l6g" data-emit="ok">Online</span></div>`),c([`click`]),j.__docgen={data:[],name:`OwnSurfaces.svelte`}})))()}var P;function F(){return(F=e((()=>{P=`<script lang="ts">
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
`})))()}function I(e){let t=f(!0),n=f(!0),r=f(!0),s=f(`home`),c=f(22.5),l=[{id:`home`,label:`Overview`,icon:`home`},{id:`calendar`,label:`Schedule`,icon:`calendar`},{id:`activity`,label:`Sensors`,icon:`activity`},{id:`settings`,label:`Settings`,icon:`settings`}],d=[{term:`The one main action`,text:`A primary button: Save, Start, Publish.`},{term:`The current place`,text:"The current item of a `NavRail`, `NavBar` or `SideNav`."},{term:`Things that are on`,text:"A pressed `soft` key, a `Switch` that is on."},{term:`A reached value`,text:"The lit arc of an `ArcGauge`."},{term:`Status`,text:"A `success` button shines green and a `danger-solid` one red, never in the tint."}],m=[{term:`Ground`,text:`Nothing to light. The emitter’s own soft halo falls on it.`},{term:`Panel`,text:`A little light pools around an emitter on it, and the edge facing an emitter nearby brightens.`},{term:`Glass`,text:`The front layer, and panels over a photo. Light scatters inside the pane, wider and stronger.`}];he(e,{title:`Light`,lead:`Light comes from what is on or chosen, and falls on what is near it. Every Application lights its pages; there is nothing to set.`,children:(e,f)=>{var h=q(),g=b(h);E(g,{title:`Emitters and reflectors`,children:(e,t)=>{var n=L(),r=a(b(n),2),i=u(r),s=a(u(i),2);A(s,{get items(){return d},layout:`stacked`}),o(i);var c=a(i,2),l=a(u(c),2);A(l,{get items(){return m},layout:`stacked`}),o(c),o(r),y(e,n)},$$slots:{default:!0}});var v=a(g,2);E(v,{title:`Three layers, three kinds of light`,children:(e,r)=>{var c=z(),d=a(b(c),2),f=u(d),m=u(f);k(m,{children:(e,n)=>{{let n=ee(()=>i(t)?`primary`:`secondary`);T(e,{get variant(){return i(n)},icon:`play`,label:`Start`})}},$$slots:{default:!0}});var h=a(m,6);O(h,{label:`Emitter on`,get checked(){return i(t)},set checked(e){_(t,e,!0)}}),o(f);var g=a(f,2),v=u(g);k(v,{align:`stretch`,children:(e,t)=>{D(e,{level:`panel`,padding:`lg`,gap:`sm`,direction:`horizontal`,align:`center`,children:(e,t)=>{var r=R(),o=a(b(r),2);T(o,{variant:`soft`,icon:`moon`,label:`Night mode`,iconOnly:!0,get"aria-pressed"(){return i(n)},onclick:()=>_(n,!i(n))}),y(e,r)},$$slots:{default:!0}})},$$slots:{default:!0}});var x=a(v,6);O(x,{label:`Emitter on`,get checked(){return i(n)},set checked(e){_(n,e,!0)}}),o(g);var S=a(g,2),C=u(S);k(C,{children:(e,t)=>{ce(e,{get items(){return l},orientation:`horizontal`,label:`Demo`,get current(){return i(s)},set current(e){_(s,e,!0)}})},$$slots:{default:!0}}),p(4),o(S),o(d),y(e,c)},$$slots:{default:!0}});var x=a(v,2);E(x,{title:`From beside`,children:(e,t)=>{var n=U(),s=a(b(n),2);k(s,{align:`stretch`,children:(e,t)=>{var n=H(),s=u(n);D(s,{level:`panel`,padding:`lg`,class:`side`,children:(e,t)=>{var n=B();y(e,n)},$$slots:{default:!0}});var c=a(s,2);{let e=ee(()=>i(r)?`primary`:`secondary`);T(c,{get variant(){return i(e)},label:`Publish`,onclick:()=>_(r,!i(r))})}var l=a(c,2);D(l,{level:`panel`,padding:`lg`,class:`side`,children:(e,t)=>{var n=V();y(e,n)},$$slots:{default:!0}}),o(n),y(e,n)},$$slots:{default:!0}}),y(e,n)},$$slots:{default:!0}});var S=a(x,2);E(S,{title:`Over a photo`,children:(e,t)=>{var n=G(),r=a(b(n),2);k(r,{kind:`window`,height:`26rem`,children:(e,t)=>{re(e,{contained:!0,get image(){return fe},children:(e,t)=>{var n=W(),r=u(n);D(r,{level:`panel`,padding:`lg`,class:`photo-card`,children:(e,t)=>{de(e,{label:`Living room`,min:16,max:28,step:.5,unit:`°C`,get value(){return i(c)},set value(e){_(c,e,!0)}})},$$slots:{default:!0}}),o(n),y(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}}),y(e,n)},$$slots:{default:!0}});var C=a(S,2);E(C,{title:`How it works`,children:(e,t)=>{var n=K(),r=a(b(n),2),i=a(u(r),9);i.textContent=`light={false}`,p(),o(r);var s=a(r,4);xe(s,{get source(){return P},label:`Study.svelte`,kind:`stage`,caption:`Your own tile and lamp, lit like the library's. Press the lamp and watch the tile.`,children:(e,t)=>{j(e,{})},$$slots:{default:!0}}),y(e,n)},$$slots:{default:!0}});var w=a(C,2);E(w,{title:`Rules`,children:(e,t)=>{ye(e,{dos:[`Let light mean “on” or “chosen”, and only that.`,`Keep one strong emitter per group: the main action or the current place.`,'Give status its own light: `data-emit="ok"` or `"danger"`.'],donts:[`Light disabled things, or things that merely look nice.`,`Rely on light alone: the state is also in the words and for assistive tech.`,`Paint a glow by hand beside an emitter. The light does that for you.`]})},$$slots:{default:!0}}),y(e,h)},$$slots:{default:!0}})}var L,R,z,B,V,H,U,W,G,K,q;function J(){return(J=e((()=>{r(),l(),h(),me(),ge(),_e(),ve(),ae(),oe(),ne(),ie(),le(),ue(),se(),pe(),be(),N(),F(),L=n(`<p>Emitters give light; the surfaces around them catch it, each in its own way.</p> <div class="two svelte-786i60"><div><h3 class="svelte-786i60">Emitters</h3> <!></div> <div><h3 class="svelte-786i60">Reflectors</h3> <!></div></div>`,1),R=n(`<div class="grow svelte-786i60"><strong>Night mode</strong> <span class="muted svelte-786i60">Dims the lights after ten.</span></div> <!>`,1),z=n(`<p>The same light looks different depending on where it lands. Turn each emitter on and off.</p> <div class="cases svelte-786i60"><div class="case svelte-786i60"><!> <h3>On the ground</h3> <p>Only the emitter’s own halo: a soft pool of tint beneath it.</p> <!></div> <div class="case svelte-786i60"><!> <h3>On a panel</h3> <p>A little light pools in the tile around the key, and stays inside it.</p> <!></div> <div class="case svelte-786i60"><!> <h3>In glass</h3> <p>The current item lights the pane from within, and the light follows it to the next.</p></div></div>`,1),B=n(`<strong>Draft</strong>`),V=n(`<strong>Live</strong>`),H=n(`<div class="between svelte-786i60"><!> <!> <!></div>`),U=n(`<p>Light reaches the surfaces next to an emitter, on the side that faces it. Press Publish and
      watch the inner edges of both tiles.</p> <!>`,1),W=n(`<div class="photo svelte-786i60"><!></div>`),G=n(`<p>Over a picture, panels are glass, so the gauge’s lit arc glows into the frosted pane around
      it. Drag the arc.</p> <!>`,1),K=n(`<p>Library parts mark themselves with <code>data-emit</code>. The <code>Application</code> measures where they are and writes the light each nearby surface catches into its <code>--light</code>, which panels and glass paint under their own background. When something
      moves, such as a selection flowing to its place, a press or a scroll, the light moves with it.
      At rest nothing runs.</p> <p>Your own parts join in the same way: an emitter carries <code>data-emit</code>, a surface
      carries <code>data-reflect</code> and paints <code>--light</code> under its background. Light is on in
      every <code>Application</code>; <code></code> turns it off for a page that must
      stay still.</p> <p>How much light there is, is one value from 0 to 1: <code>shine</code> on the <code>Application</code> (the <code>--shine</code> token). It scales the light on the surfaces
      and the glows together, so 0.2 shines and glows less than 0.8. The default is 0.6. Try it with <strong>Shine</strong> in the toolbar above.</p> <!>`,1),q=n(`<!> <!> <!> <!> <!> <!>`,1),I.__docgen={data:[],name:`Light.svelte`}})))()}function Y(e,t){d(t,!1),g(),Z(e,{name:`Light`,parameters:{__svelteCsf:{rawCode:`<Light {...args} />`}}}),v()}var X,Z,Q,Se,Ce;function $(){return($=e((()=>{r(),l(),x(),S(),J(),h(),C(),X={title:`Introduction/Light`,component:I,tags:[`!autodocs`],parameters:{layout:`fullscreen`,controls:{disable:!0}}},{Story:Z}=w(X),Y.__docgen={data:[],name:`Light.stories.svelte`},Q=te(Y,X),Se=[`Light`],Ce={...Q.Light,tags:[`svelte-csf-v5`]}})))()}$();export{Ce as Light,Se as __namedExportsOrder,X as default};