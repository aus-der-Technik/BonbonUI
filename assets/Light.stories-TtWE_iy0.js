import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Cn as t,Dt as n,Mt as r,N as i,Ot as a,Qt as o,Rt as s,St as c,Ut as l,Wt as u,bt as d,en as f,fn as p,jn as m,l as h,m as g,on as ee,pn as _,qt as v,wn as y}from"./iframe-CWg4yaha.js";import{a as b,i as x,n as S,r as C,t as w}from"./create-runtime-stories-DQq0d2lF.js";import{n as te,t as ne}from"./Application-DVTIfP80.js";import{n as re,t as T}from"./Button-D4mD58qs.js";import{n as ie,t as E}from"./Section-Cw7ZSgtY.js";import{n as ae,t as D}from"./Layer-8vKxnpCl.js";import{n as oe,t as se}from"./NavRail-DqiHPF48.js";import{n as ce,t as O}from"./Switch-CMUcJM1E.js";import{n as le,t as ue}from"./ArcGauge-DTDnk6C7.js";import{n as de,t as fe}from"./smart-home-backdrop-NEkr-GQq.js";import{n as pe,t as me}from"./DocPage-xO6ji0S6.js";import{n as he,t as k}from"./IntroDemo-COj2xjEa.js";import{n as ge,t as A}from"./IntroList-DfmIkIIx.js";import{n as _e,t as ve}from"./IntroRules-oJKbEfV8.js";import{n as ye,t as be}from"./LiveExample-B-tt8VcP.js";function j(e){let n=f(!0);var c=M(),u=v(l(c),2);t(2),y(c),s(()=>{i(u,`aria-pressed`,r(n)),i(u,`data-emit`,r(n)?``:void 0)}),a(`click`,u,()=>o(n,!r(n))),d(e,c)}var M;function N(){return(N=e((()=>{m(),h(),M=c(`<div class="tile svelte-b92l6g" data-reflect="panel"><span class="svelte-b92l6g">Study</span> <button type="button" class="lamp svelte-b92l6g">Lamp</button> <span class="status svelte-b92l6g" data-emit="ok">Online</span></div>`),n([`click`]),j.__docgen={data:[],name:`OwnSurfaces.svelte`}})))()}var P;function F(){return(F=e((()=>{P=`<script lang="ts">
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
`})))()}function I(e){let n=f(!0),i=f(!0),a=f(!0),s=f(`home`),c=f(22.5),p=[{id:`home`,label:`Overview`,icon:`home`},{id:`calendar`,label:`Schedule`,icon:`calendar`},{id:`activity`,label:`Sensors`,icon:`activity`},{id:`settings`,label:`Settings`,icon:`settings`}],m=[{term:`The one main action`,text:`A primary button: Save, Start, Publish.`},{term:`The current place`,text:"The current item of a `NavRail`, `NavBar` or `SideNav`."},{term:`Things that are on`,text:"A pressed `soft` key, a `Switch` that is on."},{term:`A reached value`,text:"The lit arc of an `ArcGauge`."},{term:`Status`,text:"A `success` button shines green and a `danger-solid` one red, never in the tint."}],h=[{term:`Ground`,text:`Nothing to light. The emitter’s own soft halo falls on it.`},{term:`Panel`,text:`A little light pools around an emitter on it, and the edge facing an emitter nearby brightens.`},{term:`Glass`,text:`The front layer, and panels over a photo. Light scatters inside the pane, wider and stronger.`}];me(e,{title:`Light`,lead:`Light comes from what is on or chosen, and falls on what is near it. Every Application lights its pages; there is nothing to set.`,children:(e,f)=>{var g=q(),_=u(g);E(_,{title:`Emitters and reflectors`,children:(e,t)=>{var n=L(),r=v(u(n),2),i=l(r),a=v(l(i),2);A(a,{get items(){return m},layout:`stacked`}),y(i);var o=v(i,2),s=v(l(o),2);A(s,{get items(){return h},layout:`stacked`}),y(o),y(r),d(e,n)},$$slots:{default:!0}});var b=v(_,2);E(b,{title:`Three layers, three kinds of light`,children:(e,a)=>{var c=z(),f=v(u(c),2),m=l(f),h=l(m);k(h,{children:(e,t)=>{{let t=ee(()=>r(n)?`primary`:`secondary`);T(e,{get variant(){return r(t)},icon:`play`,label:`Start`})}},$$slots:{default:!0}});var g=v(h,6);O(g,{label:`Emitter on`,get checked(){return r(n)},set checked(e){o(n,e,!0)}}),y(m);var _=v(m,2),b=l(_);k(b,{align:`stretch`,children:(e,t)=>{D(e,{level:`panel`,padding:`lg`,gap:`sm`,direction:`horizontal`,align:`center`,children:(e,t)=>{var n=R(),a=v(u(n),2);T(a,{variant:`soft`,icon:`moon`,label:`Night mode`,iconOnly:!0,get"aria-pressed"(){return r(i)},onclick:()=>o(i,!r(i))}),d(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}});var x=v(b,6);O(x,{label:`Emitter on`,get checked(){return r(i)},set checked(e){o(i,e,!0)}}),y(_);var S=v(_,2),C=l(S);k(C,{children:(e,t)=>{se(e,{get items(){return p},orientation:`horizontal`,label:`Demo`,get current(){return r(s)},set current(e){o(s,e,!0)}})},$$slots:{default:!0}}),t(4),y(S),y(f),d(e,c)},$$slots:{default:!0}});var x=v(b,2);E(x,{title:`From beside`,children:(e,t)=>{var n=U(),i=v(u(n),2);k(i,{align:`stretch`,children:(e,t)=>{var n=H(),i=l(n);D(i,{level:`panel`,padding:`lg`,class:`side`,children:(e,t)=>{var n=B();d(e,n)},$$slots:{default:!0}});var s=v(i,2);{let e=ee(()=>r(a)?`primary`:`secondary`);T(s,{get variant(){return r(e)},label:`Publish`,onclick:()=>o(a,!r(a))})}var c=v(s,2);D(c,{level:`panel`,padding:`lg`,class:`side`,children:(e,t)=>{var n=V();d(e,n)},$$slots:{default:!0}}),y(n),d(e,n)},$$slots:{default:!0}}),d(e,n)},$$slots:{default:!0}});var S=v(x,2);E(S,{title:`Over a photo`,children:(e,t)=>{var n=G(),i=v(u(n),2);k(i,{kind:`window`,height:`26rem`,children:(e,t)=>{ne(e,{contained:!0,get image(){return de},children:(e,t)=>{var n=W(),i=l(n);D(i,{level:`panel`,padding:`lg`,class:`photo-card`,children:(e,t)=>{ue(e,{label:`Living room`,min:16,max:28,step:.5,unit:`°C`,get value(){return r(c)},set value(e){o(c,e,!0)}})},$$slots:{default:!0}}),y(n),d(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}}),d(e,n)},$$slots:{default:!0}});var C=v(S,2);E(C,{title:`How it works`,children:(e,n)=>{var r=K(),i=v(u(r),2),a=v(l(i),9);a.textContent=`light={false}`,t(),y(i);var o=v(i,2);be(o,{get source(){return P},label:`Study.svelte`,kind:`stage`,caption:`Your own tile and lamp, lit like the library's. Press the lamp and watch the tile.`,children:(e,t)=>{j(e,{})},$$slots:{default:!0}}),d(e,r)},$$slots:{default:!0}});var w=v(C,2);E(w,{title:`Rules`,children:(e,t)=>{ve(e,{dos:[`Let light mean “on” or “chosen”, and only that.`,`Keep one strong emitter per group: the main action or the current place.`,'Give status its own light: `data-emit="ok"` or `"danger"`.'],donts:[`Light disabled things, or things that merely look nice.`,`Rely on light alone: the state is also in the words and for assistive tech.`,`Paint a glow by hand beside an emitter. The light does that for you.`]})},$$slots:{default:!0}}),d(e,g)},$$slots:{default:!0}})}var L,R,z,B,V,H,U,W,G,K,q;function J(){return(J=e((()=>{m(),h(),pe(),he(),ge(),_e(),ie(),ae(),te(),re(),ce(),le(),oe(),fe(),ye(),N(),F(),L=c(`<p>Emitters give light; the surfaces around them catch it, each in its own way.</p> <div class="two svelte-786i60"><div><h3 class="svelte-786i60">Emitters</h3> <!></div> <div><h3 class="svelte-786i60">Reflectors</h3> <!></div></div>`,1),R=c(`<div class="grow svelte-786i60"><strong>Night mode</strong> <span class="muted svelte-786i60">Dims the lights after ten.</span></div> <!>`,1),z=c(`<p>The same light looks different depending on where it lands. Turn each emitter on and off.</p> <div class="cases svelte-786i60"><div class="case svelte-786i60"><!> <h3>On the ground</h3> <p>Only the emitter’s own halo: a soft pool of tint beneath it.</p> <!></div> <div class="case svelte-786i60"><!> <h3>On a panel</h3> <p>A little light pools in the tile around the key, and stays inside it.</p> <!></div> <div class="case svelte-786i60"><!> <h3>In glass</h3> <p>The current item lights the pane from within, and the light follows it to the next.</p></div></div>`,1),B=c(`<strong>Draft</strong>`),V=c(`<strong>Live</strong>`),H=c(`<div class="between svelte-786i60"><!> <!> <!></div>`),U=c(`<p>Light reaches the surfaces next to an emitter, on the side that faces it. Press Publish and
      watch the inner edges of both tiles.</p> <!>`,1),W=c(`<div class="photo svelte-786i60"><!></div>`),G=c(`<p>Over a picture, panels are glass, so the gauge’s lit arc glows into the frosted pane around
      it. Drag the arc.</p> <!>`,1),K=c(`<p>Library parts mark themselves with <code>data-emit</code>. The <code>Application</code> measures where they are and writes the light each nearby surface catches into its <code>--light</code>, which panels and glass paint under their own background. When something
      moves, such as a selection flowing to its place, a press or a scroll, the light moves with it.
      At rest nothing runs.</p> <p>Your own parts join in the same way: an emitter carries <code>data-emit</code>, a surface
      carries <code>data-reflect</code> and paints <code>--light</code> under its background. Light is on in
      every <code>Application</code>; <code></code> turns it off for a page that must
      stay still.</p> <!>`,1),q=c(`<!> <!> <!> <!> <!> <!>`,1),I.__docgen={data:[],name:`Light.svelte`}})))()}function Y(e,t){_(t,!1),g(),Z(e,{name:`Light`,parameters:{__svelteCsf:{rawCode:`<Light {...args} />`}}}),p()}var X,Z,Q,xe,Se;function $(){return($=e((()=>{m(),b(),x(),J(),h(),S(),X={title:`Introduction/Light`,component:I,tags:[`!autodocs`],parameters:{layout:`fullscreen`,controls:{disable:!0}}},{Story:Z}=C(X),Y.__docgen={data:[],name:`Light.stories.svelte`},Q=w(Y,X),xe=[`Light`],Se={...Q.Light,tags:[`svelte-csf-v5`]}})))()}$();export{Se as Light,xe as __namedExportsOrder,X as default};