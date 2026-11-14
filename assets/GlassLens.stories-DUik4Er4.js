import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Kt as t,Mt as n,Qt as r,Rt as i,St as a,Ut as o,V as s,Wt as c,_t as l,bt as u,en as d,fn as f,jn as p,kn as m,l as h,p as g,pn as _,qt as v,rt as y,wn as b,xt as x,z as S}from"./iframe-D4jyjLko.js";import{i as C,n as w,r as T,t as E}from"./create-runtime-stories-2Z8qmkK0.js";import{n as D,t as O}from"./Button-05yF-FzT.js";import{a as k,i as A,n as j,r as M,t as N}from"./GlassLens-DzMASokz.js";import{n as P,t as F}from"./NavBar-DI4QuYIC.js";function I(e,a){_(a,!0);let p=d(!1);var h=W(),y=c(h);z(y,{name:`Playground`,template:(e,a=m)=>{var c=H(),d=o(c),f=o(d);let h,_;var y=o(f);N(y,g(a,{get active(){return n(p)},set active(e){r(p,e,!0)}}));var x=v(y,2),C=t(x,!0);b(f),b(d);var w=v(d,2);L(w),b(c),i(e=>{h=s(f,1,`slab svelte-r5a9jp`,null,h,{lensed:n(p)}),_=S(f,``,_,{"--slab-frost":e}),l(C,n(p)?`Thick glass`:`Frosted glass`)},[()=>A({blur:a().blur,saturate:a().saturate})]),u(e,c)},$$slots:{template:!0},parameters:{docs:{description:{story:"Thick glass over stripes and text — scroll the stage. `magnify` enlarges the middle, `rim`\n    is the width of the zone where contours bend and `rimBend` how far, `chroma` splits the\n    colours at the edge. `blur` is the frosted fallback (`refraction: false`), `saturate`\n    applies to both. Chrome bends the real backdrop; Safari and Firefox bend a live copy of the\n    page, so the glass looks the same everywhere."}},__svelteCsf:{rawCode:`<div class="stage">
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
</div>`}}});var x=v(y,2);z(x,{name:`On a NavBar`,template:(e,t=m)=>{var n=U(),r=o(n);F(r,{brand:`Example Planner`,links:[{label:`Product`,href:`#product`,active:!0},{label:`Pricing`,href:`#pricing`},{label:`Docs`,href:`#docs`}],get lens(){return t()},actions:e=>{O(e,{variant:`primary`,shape:`pill`,label:`Sign up`})},$$slots:{actions:!0}});var i=v(r,2);L(i),b(n),u(e,n)},$$slots:{template:!0},parameters:{docs:{description:{story:"The website NavBar with the same controls (`lens` on NavBar, TitlePill, GlassPill, MenuBar,\n    Toolbar, Dock and front Layers). Scroll: the text magnifies as it passes under the bar."}},__svelteCsf:{rawCode:`<div class="stage stage--page">
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
</div>`}}}),u(e,h),f()}var L,R,z,B,V,H,U,W,G,K,q,J;function Y(){return(Y=e((()=>{p(),C(),j(),D(),P(),k(),h(),w(),L=e=>{var t=x(),n=c(t);y(n,16,()=>B,e=>e,(e,t)=>{var n=V();let r;i(()=>r=s(n,1,`svelte-r5a9jp`,null,r,{big:t%3==0})),u(e,n)}),u(e,t)},R={title:`Atoms/GlassLens`,component:N,tags:[`autodocs`],parameters:{layout:`fullscreen`},args:{refraction:`auto`,...M},argTypes:{refraction:{control:`inline-radio`,options:[`auto`,!0,!1]},magnify:{control:{type:`range`,min:1,max:2,step:.02}},rim:{control:{type:`range`,min:2,max:60,step:1}},rimBend:{control:{type:`range`,min:0,max:60,step:1}},chroma:{control:{type:`range`,min:0,max:.2,step:.005}},blur:{control:{type:`range`,min:0,max:40,step:1}},saturate:{control:{type:`range`,min:100,max:300,step:10}},active:{control:!1}}},{Story:z}=T(R),B=Array.from({length:14},(e,t)=>t),V=a(`<p>Contours tip away at the rim, the middle reads larger — glass with a body.</p>`),H=a(`<div class="stage svelte-r5a9jp"><div class="slab-row svelte-r5a9jp"><div><!> <span> </span></div></div> <!></div>`),U=a(`<div class="stage stage--page svelte-r5a9jp"><!> <!></div>`),W=a(`<!> <!>`,1),I.__docgen={data:[],name:`GlassLens.stories.svelte`},G=E(I,R),K=[`Playground`,`OnANavBar`],q={...G.Playground,tags:[`svelte-csf-v5`]},J={...G.OnANavBar,tags:[`svelte-csf-v5`]}})))()}Y();export{J as OnANavBar,q as Playground,K as __namedExportsOrder,R as default};