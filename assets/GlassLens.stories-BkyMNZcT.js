import{n as e}from"./rolldown-runtime-Dxh6kD9_.js";import{$t as t,Ct as n,Ft as r,Gt as i,Ht as a,Mn as o,On as s,Pt as c,Rt as l,Sn as u,St as d,V as f,Vt as p,_t as m,cn as h,l as g,on as _,p as v,tt as y,xn as b,xt as x,z as S,zt as C}from"./iframe-WlNMZtZ0.js";import{i as w,n as T,r as E,t as D}from"./create-runtime-stories-CbHiKinS.js";import{n as O,t as k}from"./Button-DHLILcYm.js";import{a as A,i as j,n as M,r as N,t as P}from"./GlassLens-xRmAZTx4.js";import{n as F,t as I}from"./NavBar-BrkVKDwA.js";function L(e,n){u(n,!0);let r=h(!1);var c=G(),d=C(c);B(d,{name:`Playground`,template:(e,n=s)=>{var c=U(),u=l(c),d=l(u);let h,g;var y=l(d);P(y,v(n,{get active(){return i(r)},set active(e){_(r,e,!0)}}));var b=a(y,2),C=p(b,!0);o(d),o(u);var w=a(u,2);R(w),o(c),t(e=>{h=f(d,1,`slab svelte-r5a9jp`,null,h,{lensed:i(r)}),g=S(d,``,g,{"--slab-frost":e}),m(C,i(r)?`Thick glass`:`Frosted glass`)},[()=>j({blur:n().blur,saturate:n().saturate})]),x(e,c)},$$slots:{template:!0},parameters:{docs:{description:{story:"Thick glass over stripes and text — scroll the stage. `magnify` enlarges the middle, `rim`\n    is the width of the zone where contours bend and `rimBend` how far, `chroma` splits the\n    colours at the edge. `blur` is the frosted fallback (`refraction: false`), `saturate`\n    applies to both. Chrome bends the real backdrop; Safari and Firefox bend a live copy of the\n    page, so the glass looks the same everywhere."}},__svelteCsf:{rawCode:`<div class="stage">
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
</div>`}}});var g=a(d,2);B(g,{name:`On a NavBar`,template:(e,t=s)=>{var n=W(),r=l(n);I(r,{brand:`Example Planner`,links:[{label:`Product`,href:`#product`,active:!0},{label:`Pricing`,href:`#pricing`},{label:`Docs`,href:`#docs`}],get lens(){return t()},actions:e=>{k(e,{variant:`primary`,shape:`pill`,label:`Sign up`})},$$slots:{actions:!0}});var i=a(r,2);R(i),o(n),x(e,n)},$$slots:{template:!0},parameters:{docs:{description:{story:"The website NavBar with the same controls (`lens` on NavBar, TitlePill, GlassPill, MenuBar,\n    Toolbar, Dock and front Layers). Scroll: the text magnifies as it passes under the bar."}},__svelteCsf:{rawCode:`<div class="stage stage--page">
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
</div>`}}}),x(e,c),b()}var R,z,B,V,H,U,W,G,K,q,J,Y;function X(){return(X=e((()=>{r(),c(),w(),M(),O(),F(),A(),g(),T(),R=e=>{var n=d(),r=C(n);y(r,16,()=>V,e=>e,(e,n)=>{var r=H();let i;t(()=>i=f(r,1,`svelte-r5a9jp`,null,i,{big:n%3==0})),x(e,r)}),x(e,n)},z={title:`Atoms/GlassLens`,component:P,tags:[`autodocs`],parameters:{layout:`fullscreen`},args:{refraction:`auto`,...N},argTypes:{refraction:{control:`inline-radio`,options:[`auto`,!0,!1]},magnify:{control:{type:`range`,min:1,max:2,step:.02}},rim:{control:{type:`range`,min:2,max:60,step:1}},rimBend:{control:{type:`range`,min:0,max:60,step:1}},chroma:{control:{type:`range`,min:0,max:.2,step:.005}},blur:{control:{type:`range`,min:0,max:40,step:1}},saturate:{control:{type:`range`,min:100,max:300,step:10}},active:{control:!1}}},{Story:B}=E(z),V=Array.from({length:14},(e,t)=>t),H=n(`<p>Contours tip away at the rim, the middle reads larger — glass with a body.</p>`),U=n(`<div class="stage svelte-r5a9jp"><div class="slab-row svelte-r5a9jp"><div><!> <span> </span></div></div> <!></div>`),W=n(`<div class="stage stage--page svelte-r5a9jp"><!> <!></div>`),G=n(`<!> <!>`,1),L.__docgen={data:[],name:`GlassLens.stories.svelte`},K=D(L,z),q=[`Playground`,`OnANavBar`],J={...K.Playground,tags:[`svelte-csf-v5`]},Y={...K.OnANavBar,tags:[`svelte-csf-v5`]}})))()}X();export{Y as OnANavBar,J as Playground,q as __namedExportsOrder,z as default};