import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Cn as t,Ct as n,Ft as r,Gt as i,Ht as a,Pt as o,St as s,_n as c,cn as l,l as u,on as d,p as f,tt as p,wn as m,xt as h,zt as g}from"./iframe-D3QpTFc1.js";import{i as _,n as v,r as y,t as b}from"./create-runtime-stories-bgfxAijx.js";import{i as x,r as S}from"./Icon-BVq5M3c4.js";import{i as C,n as w}from"./palette-DNwFBI2z.js";import{n as T,t as E}from"./Grid-CRR54iID.js";import{n as D,t as O}from"./Layer-CRpvsKt9.js";import{n as k,t as A}from"./Row-B0vuEKpz.js";import{n as j,t as M}from"./AppIcon-DBPkKnt5.js";function N(e,n){m(n,!0);let r=l(`Mail`);var o=z(),u=g(o);F(u,{name:`Playground`,parameters:{docs:{description:{story:`The bonbon icon is our own shape, not a phone icon: a rounder corner (30% of the size, and it
follows the Application's \`radius\` setting), a soft glow on the top half because the light in
this library always comes from above, and a thin sugar-glass rim that is bright at the top edge.
Hover lifts it; pressing squishes it like a gummy.`}},__svelteCsf:{rawCode:`<AppIcon {...args} />`}}});var _=a(u,2);F(_,{name:`Home screen`,asChild:!0,children:(e,t)=>{E(e,{min:`5.5rem`,gap:`lg`,children:(e,t)=>{var n=s(),r=g(n);p(r,17,()=>I,e=>e.label,(e,t)=>{M(e,f(()=>i(t),{size:`lg`,caption:!0,onclick:()=>{}}))}),h(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A home screen: icons with captions in a responsive grid.`}},__svelteCsf:{rawCode:`<Grid min="5.5rem" gap="lg">
  {#each apps as app (app.label)}
    <AppIcon {...app} size="lg" caption onclick={() => {}} />
  {/each}
</Grid>`}}});var v=a(_,2);F(v,{name:`Dock`,asChild:!0,children:(e,t)=>{O(e,{level:`front`,edge:`bottom`,direction:`horizontal`,shape:`card`,gap:`sm`,style:`width: max-content; margin-inline: auto`,children:(e,t)=>{var n=s(),a=g(n);p(a,17,()=>I.slice(0,7),e=>e.label,(e,t)=>{{let n=c(()=>i(t).label===i(r)||i(t).label===`Calendar`),a=c(()=>i(t).label===i(r));M(e,f(()=>i(t),{get running(){return i(n)},get active(){return i(a)},onclick:()=>d(r,i(t).label,!0)}))}}),h(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A dock on the front layer (sticky at the bottom). \`running\` marks open apps with a short tint
bar — a bar rather than a dot, so "open" is readable at a glance; the active one gets the tint
rim and glow every selected thing wears. Click an icon.`}},__svelteCsf:{rawCode:`<Layer
  level="front"
  edge="bottom"
  direction="horizontal"
  shape="card"
  gap="sm"
  style="width: max-content; margin-inline: auto"
>
  {#each apps.slice(0, 7) as app (app.label)}
    <AppIcon
      {...app}
      running={app.label === open || app.label === 'Calendar'}
      active={app.label === open}
      onclick={() => (open = app.label)}
    />
  {/each}
</Layer>`}}});var y=a(v,2);F(y,{name:`Accent and glass`,asChild:!0,children:(e,t)=>{A(e,{gap:`md`,children:(e,t)=>{var n=L(),r=g(n);M(r,{label:`Dashboard`,icon:`chart`,color:`accent`,size:`lg`});var i=a(r,2);M(i,{label:`Search`,icon:`search`,color:`glass`,size:`lg`});var o=a(i,2);M(o,{label:`Spaces`,color:`purple`,size:`lg`}),h(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"`accent` follows the tint; `glass` is frosted with an accent glyph."}},__svelteCsf:{rawCode:`<Row gap="md">
  <AppIcon label="Dashboard" icon="chart" color="accent" size="lg" />
  <AppIcon label="Search" icon="search" color="glass" size="lg" />
  <AppIcon label="Spaces" color="purple" size="lg" />
</Row>`}}});var b=a(y,2);F(b,{name:`Sizes`,asChild:!0,children:(e,t)=>{A(e,{gap:`md`,children:(e,t)=>{var n=R(),r=g(n);M(r,{label:`Mail`,icon:`mail`,size:`sm`,badge:2});var i=a(r,2);M(i,{label:`Mail`,icon:`mail`,size:`md`,badge:2});var o=a(i,2);M(o,{label:`Mail`,icon:`mail`,size:`lg`,badge:24});var s=a(o,2);M(s,{label:`Mail`,icon:`mail`,size:`xl`,badge:240}),h(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<Row gap="md">
  <AppIcon label="Mail" icon="mail" size="sm" badge={2} />
  <AppIcon label="Mail" icon="mail" size="md" badge={2} />
  <AppIcon label="Mail" icon="mail" size="lg" badge={24} />
  <AppIcon label="Mail" icon="mail" size="xl" badge={240} />
</Row>`}}}),h(e,o),t()}var P,F,I,L,R,z,B,V,H,U,W,G,K;function q(){return(q=e((()=>{r(),o(),_(),T(),D(),k(),j(),x(),w(),u(),v(),P={title:`Atoms/AppIcon`,component:M,tags:[`autodocs`],args:{label:`Mail`,icon:`mail`,color:`blue`,size:`lg`,badge:3},argTypes:{color:{control:`select`,options:[...C,`accent`,`glass`]},size:{control:`inline-radio`,options:[`sm`,`md`,`lg`,`xl`]},icon:{control:`select`,options:S}}},{Story:F}=y(P),I=[{label:`Mail`,icon:`mail`,color:`blue`,badge:12},{label:`Calendar`,icon:`calendar`,color:`orange`},{label:`Photos`,icon:`image`,color:`pink`},{label:`Music`,icon:`music`,color:`purple`},{label:`Messages`,icon:`chat`,color:`mint`,badge:3},{label:`Files`,icon:`folder`,color:`cyan`},{label:`Notes`,icon:`file-text`,color:`yellow`},{label:`Store`,icon:`bag`,color:`indigo`},{label:`Settings`,icon:`settings`,color:`gray`},{label:`Weather`,icon:`weather`,color:`teal`},{label:`Books`,icon:`book`,color:`brown`},{label:`Tasks`,icon:`check-square`,color:`green`}],L=n(`<!> <!> <!>`,1),R=n(`<!> <!> <!> <!>`,1),z=n(`<!> <!> <!> <!> <!>`,1),N.__docgen={data:[],name:`AppIcon.stories.svelte`},B=b(N,P),V=[`Playground`,`HomeScreen`,`Dock`,`AccentAndGlass`,`Sizes`],H={...B.Playground,tags:[`svelte-csf-v5`]},U={...B.HomeScreen,tags:[`svelte-csf-v5`]},W={...B.Dock,tags:[`svelte-csf-v5`]},G={...B.AccentAndGlass,tags:[`svelte-csf-v5`]},K={...B.Sizes,tags:[`svelte-csf-v5`]}})))()}q();export{G as AccentAndGlass,W as Dock,U as HomeScreen,H as Playground,K as Sizes,V as __namedExportsOrder,P as default};