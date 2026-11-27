import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{$t as t,An as n,Cn as r,Ct as i,Ft as a,Gt as o,Ht as s,Pn as c,Pt as l,Rt as u,St as d,V as f,Vt as p,_t as m,cn as h,l as g,on as _,p as v,tt as y,wn as b,xt as x,z as S,zt as C}from"./iframe-D3QpTFc1.js";import{i as w,n as T,r as E,t as D}from"./create-runtime-stories-bgfxAijx.js";import{n as O,t as k}from"./Button-DO5WmEfH.js";import{a as A,i as j,n as M,r as N,t as P}from"./GlassLens-BFY6wTdZ.js";import{n as F,t as I}from"./NavBar-DMi3Y3zf.js";function L(e,i){b(i,!0);let a=h(!1);var l=G(),d=C(l);B(d,{name:`Playground`,template:(e,r=n)=>{var i=U(),l=u(i),d=u(l);let h,g;var y=u(d);P(y,v(r,{get active(){return o(a)},set active(e){_(a,e,!0)}}));var b=s(y,2),C=p(b,!0);c(d),c(l);var w=s(l,2);R(w),c(i),t(e=>{h=f(d,1,`slab svelte-r5a9jp`,null,h,{lensed:o(a)}),g=S(d,``,g,{"--slab-frost":e}),m(C,o(a)?`Thick glass`:`Frosted glass`)},[()=>j({blur:r().blur,saturate:r().saturate})]),x(e,i)},$$slots:{template:!0},parameters:{docs:{description:{story:"Thick glass over stripes and text — scroll the stage. `magnify` enlarges the middle, `rim`\n    is the width of the zone where contours bend and `rimBend` how far, `chroma` splits the\n    colours at the edge. `blur` is the frosted fallback (`refraction: false`), `saturate`\n    applies to both. Chrome bends the real backdrop; Safari and Firefox bend a live copy of the\n    page, so the glass looks the same everywhere."}},__svelteCsf:{rawCode:`<div class="stage">
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
</div>`}}});var g=s(d,2);B(g,{name:`On a NavBar`,template:(e,t=n)=>{var r=W(),i=u(r);I(i,{brand:`Example Planner`,links:[{label:`Product`,href:`#product`,active:!0},{label:`Pricing`,href:`#pricing`},{label:`Docs`,href:`#docs`}],get lens(){return t()},actions:e=>{k(e,{variant:`primary`,shape:`pill`,label:`Sign up`})},$$slots:{actions:!0}});var a=s(i,2);R(a),c(r),x(e,r)},$$slots:{template:!0},parameters:{docs:{description:{story:"The website NavBar with the same controls (`lens` on NavBar, TitlePill, GlassPill, MenuBar,\n    Toolbar, Dock and front Layers). Scroll: the text magnifies as it passes under the bar."}},__svelteCsf:{rawCode:`<div class="stage stage--page">
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
</div>`}}}),x(e,l),r()}var R,z,B,V,H,U,W,G,K,q,J,Y;function X(){return(X=e((()=>{a(),l(),w(),M(),O(),F(),A(),g(),T(),R=e=>{var n=d(),r=C(n);y(r,16,()=>V,e=>e,(e,n)=>{var r=H();let i;t(()=>i=f(r,1,`svelte-r5a9jp`,null,i,{big:n%3==0})),x(e,r)}),x(e,n)},z={title:`Atoms/GlassLens`,component:P,tags:[`autodocs`],parameters:{layout:`fullscreen`},args:{refraction:`auto`,...N},argTypes:{refraction:{control:`inline-radio`,options:[`auto`,!0,!1]},magnify:{control:{type:`range`,min:1,max:2,step:.02}},rim:{control:{type:`range`,min:2,max:60,step:1}},rimBend:{control:{type:`range`,min:0,max:60,step:1}},chroma:{control:{type:`range`,min:0,max:.2,step:.005}},blur:{control:{type:`range`,min:0,max:40,step:1}},saturate:{control:{type:`range`,min:100,max:300,step:10}},active:{control:!1}}},{Story:B}=E(z),V=Array.from({length:14},(e,t)=>t),H=i(`<p>Contours tip away at the rim, the middle reads larger — glass with a body.</p>`),U=i(`<div class="stage svelte-r5a9jp"><div class="slab-row svelte-r5a9jp"><div><!> <span> </span></div></div> <!></div>`),W=i(`<div class="stage stage--page svelte-r5a9jp"><!> <!></div>`),G=i(`<!> <!>`,1),L.__docgen={data:[],name:`GlassLens.stories.svelte`},K=D(L,z),q=[`Playground`,`OnANavBar`],J={...K.Playground,tags:[`svelte-csf-v5`]},Y={...K.OnANavBar,tags:[`svelte-csf-v5`]}})))()}X();export{Y as OnANavBar,J as Playground,q as __namedExportsOrder,z as default};