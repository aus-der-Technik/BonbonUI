import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Bt as t,Ct as n,En as r,Gt as i,Jt as a,Kt as o,Nn as s,Pt as c,St as l,V as u,Yt as d,_t as f,en as p,hn as m,jn as h,l as g,mn as _,nn as v,p as y,rt as b,xt as x,z as S}from"./iframe-CRBWUEFv.js";import{i as C,n as w,r as T,t as E}from"./create-runtime-stories-DtoOt73Q.js";import{n as D,t as O}from"./Button-CVctU_KR.js";import{a as k,i as A,n as j,r as M,t as N}from"./GlassLens-CtB00VoQ.js";import{n as P,t as F}from"./NavBar-nLnO-Ezt.js";function I(e,n){m(n,!0);let s=v(!1);var l=W(),g=o(l);z(g,{name:`Playground`,template:(e,n=h)=>{var o=H(),l=i(o),m=i(l);let g,_;var v=i(m);N(v,y(n,{get active(){return c(s)},set active(e){p(s,e,!0)}}));var b=d(v,2),C=a(b,!0);r(m),r(l);var w=d(l,2);L(w),r(o),t(e=>{g=u(m,1,`slab svelte-r5a9jp`,null,g,{lensed:c(s)}),_=S(m,``,_,{"--slab-frost":e}),f(C,c(s)?`Thick glass`:`Frosted glass`)},[()=>A({blur:n().blur,saturate:n().saturate})]),x(e,o)},$$slots:{template:!0},parameters:{docs:{description:{story:"Thick glass over stripes and text — scroll the stage. `magnify` enlarges the middle, `rim`\n    is the width of the zone where contours bend and `rimBend` how far, `chroma` splits the\n    colours at the edge. `blur` is the frosted fallback (`refraction: false`), `saturate`\n    applies to both. Chrome bends the real backdrop; Safari and Firefox bend a live copy of the\n    page, so the glass looks the same everywhere."}},__svelteCsf:{rawCode:`<div class="stage">
  <div class="slab-row">
    <div
      class="slab"
      class:lensed={drawn}
      style:--slab-frost={frostFilter({ blur: args.blur, saturate: args.saturate })}
    >
      <GlassLens {...args} bind:active={drawn} />
      <span>{drawn ? 'Thick glass' : 'Frosted glass'}</span>
    </div>
  </div>
  {@render scenery()}
</div>`}}});var b=d(g,2);z(b,{name:`On a NavBar`,template:(e,t=h)=>{var n=U(),a=i(n);F(a,{brand:`Example Planner`,links:[{label:`Product`,href:`#product`,active:!0},{label:`Pricing`,href:`#pricing`},{label:`Docs`,href:`#docs`}],get lens(){return t()},actions:e=>{O(e,{variant:`primary`,shape:`pill`,label:`Sign up`})},$$slots:{actions:!0}});var o=d(a,2);L(o),r(n),x(e,n)},$$slots:{template:!0},parameters:{docs:{description:{story:"The website NavBar with the same controls (`lens` on NavBar, TitlePill, GlassPill, MenuBar,\n    Toolbar, Dock and front Layers). Scroll: the text magnifies as it passes under the bar."}},__svelteCsf:{rawCode:`<div class="stage stage--page">
  <NavBar
    brand="Example Planner"
    links={[
      { label: 'Product', href: '#product', active: true },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Docs', href: '#docs' },
    ]}
    lens={args}
  >
    {#snippet actions()}<Button variant="primary" shape="pill" label="Sign up" />{/snippet}
  </NavBar>
  {@render scenery()}
</div>`}}}),x(e,l),_()}var L,R,z,B,V,H,U,W,G,K,q,J;function Y(){return(Y=e((()=>{s(),C(),j(),D(),P(),k(),g(),w(),L=e=>{var n=l(),r=o(n);b(r,16,()=>B,e=>e,(e,n)=>{var r=V();let i;t(()=>i=u(r,1,`svelte-r5a9jp`,null,i,{big:n%3==0})),x(e,r)}),x(e,n)},R={title:`Atoms/GlassLens`,component:N,tags:[`autodocs`],parameters:{layout:`fullscreen`},args:{refraction:`auto`,...M},argTypes:{refraction:{control:`inline-radio`,options:[`auto`,!0,!1]},magnify:{control:{type:`range`,min:1,max:2,step:.02}},rim:{control:{type:`range`,min:2,max:60,step:1}},rimBend:{control:{type:`range`,min:0,max:60,step:1}},chroma:{control:{type:`range`,min:0,max:.2,step:.005}},blur:{control:{type:`range`,min:0,max:40,step:1}},saturate:{control:{type:`range`,min:100,max:300,step:10}},active:{control:!1}}},{Story:z}=T(R),B=Array.from({length:14},(e,t)=>t),V=n(`<p>Contours tip away at the rim, the middle reads larger — glass with a body.</p>`),H=n(`<div class="stage svelte-r5a9jp"><div class="slab-row svelte-r5a9jp"><div><!> <span> </span></div></div> <!></div>`),U=n(`<div class="stage stage--page svelte-r5a9jp"><!> <!></div>`),W=n(`<!> <!>`,1),I.__docgen={data:[],name:`GlassLens.stories.svelte`},G=E(I,R),K=[`Playground`,`OnANavBar`],q={...G.Playground,tags:[`svelte-csf-v5`]},J={...G.OnANavBar,tags:[`svelte-csf-v5`]}})))()}Y();export{J as OnANavBar,q as Playground,K as __namedExportsOrder,R as default};