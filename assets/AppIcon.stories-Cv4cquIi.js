import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Ct as t,Kt as n,Nn as r,Pt as i,St as a,Yt as o,cn as s,en as c,hn as l,l as u,mn as d,nn as f,p,rt as m,xt as h}from"./iframe-CRBWUEFv.js";import{i as g,n as _,r as v,t as y}from"./create-runtime-stories-DtoOt73Q.js";import{i as b,r as x}from"./Icon-Btl8cSXM.js";import{i as S,n as C}from"./palette-DNwFBI2z.js";import{n as w,t as T}from"./Grid-DlBYjD7t.js";import{n as E,t as D}from"./Layer-C_PYu-dD.js";import{n as O,t as k}from"./Row-VZCdMLbk.js";import{n as A,t as j}from"./AppIcon-CHjgV-RC.js";function M(e,t){l(t,!0);let r=f(`Mail`);var u=R(),g=n(u);P(g,{name:`Playground`,parameters:{docs:{description:{story:`The bonbon icon is our own shape, not a phone icon: a rounder corner (30% of the size, and it
follows the Application's \`radius\` setting), a soft glow on the top half because the light in
this library always comes from above, and a thin sugar-glass rim that is bright at the top edge.
Hover lifts it; pressing squishes it like a gummy.`}},__svelteCsf:{rawCode:`<AppIcon {...args} />`}}});var _=o(g,2);P(_,{name:`Home screen`,asChild:!0,children:(e,t)=>{T(e,{min:`5.5rem`,gap:`lg`,children:(e,t)=>{var r=a(),o=n(r);m(o,17,()=>F,e=>e.label,(e,t)=>{j(e,p(()=>i(t),{size:`lg`,caption:!0,onclick:()=>{}}))}),h(e,r)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A home screen: icons with captions in a responsive grid.`}},__svelteCsf:{rawCode:`<Grid min="5.5rem" gap="lg">
  {#each apps as app (app.label)}
    <AppIcon {...app} size="lg" caption onclick={() => {}} />
  {/each}
</Grid>`}}});var v=o(_,2);P(v,{name:`Dock`,asChild:!0,children:(e,t)=>{D(e,{level:`front`,edge:`bottom`,direction:`horizontal`,shape:`card`,gap:`sm`,style:`width: max-content; margin-inline: auto`,children:(e,t)=>{var o=a(),l=n(o);m(l,17,()=>F.slice(0,7),e=>e.label,(e,t)=>{{let n=s(()=>i(t).label===i(r)||i(t).label===`Calendar`),a=s(()=>i(t).label===i(r));j(e,p(()=>i(t),{get running(){return i(n)},get active(){return i(a)},onclick:()=>c(r,i(t).label,!0)}))}}),h(e,o)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A dock on the front layer (sticky at the bottom). \`running\` marks open apps with a short tint
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
</Layer>`}}});var y=o(v,2);P(y,{name:`Accent and glass`,asChild:!0,children:(e,t)=>{k(e,{gap:`md`,children:(e,t)=>{var r=I(),i=n(r);j(i,{label:`Dashboard`,icon:`chart`,color:`accent`,size:`lg`});var a=o(i,2);j(a,{label:`Search`,icon:`search`,color:`glass`,size:`lg`});var s=o(a,2);j(s,{label:`Spaces`,color:`purple`,size:`lg`}),h(e,r)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"`accent` follows the tint; `glass` is frosted with an accent glyph."}},__svelteCsf:{rawCode:`<Row gap="md">
  <AppIcon label="Dashboard" icon="chart" color="accent" size="lg" />
  <AppIcon label="Search" icon="search" color="glass" size="lg" />
  <AppIcon label="Spaces" color="purple" size="lg" />
</Row>`}}});var b=o(y,2);P(b,{name:`Sizes`,asChild:!0,children:(e,t)=>{k(e,{gap:`md`,children:(e,t)=>{var r=L(),i=n(r);j(i,{label:`Mail`,icon:`mail`,size:`sm`,badge:2});var a=o(i,2);j(a,{label:`Mail`,icon:`mail`,size:`md`,badge:2});var s=o(a,2);j(s,{label:`Mail`,icon:`mail`,size:`lg`,badge:24});var c=o(s,2);j(c,{label:`Mail`,icon:`mail`,size:`xl`,badge:240}),h(e,r)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<Row gap="md">
  <AppIcon label="Mail" icon="mail" size="sm" badge={2} />
  <AppIcon label="Mail" icon="mail" size="md" badge={2} />
  <AppIcon label="Mail" icon="mail" size="lg" badge={24} />
  <AppIcon label="Mail" icon="mail" size="xl" badge={240} />
</Row>`}}}),h(e,u),d()}var N,P,F,I,L,R,z,B,V,H,U,W,G;function K(){return(K=e((()=>{r(),g(),w(),E(),O(),A(),b(),C(),u(),_(),N={title:`Atoms/AppIcon`,component:j,tags:[`autodocs`],args:{label:`Mail`,icon:`mail`,color:`blue`,size:`lg`,badge:3},argTypes:{color:{control:`select`,options:[...S,`accent`,`glass`]},size:{control:`inline-radio`,options:[`sm`,`md`,`lg`,`xl`]},icon:{control:`select`,options:x}}},{Story:P}=v(N),F=[{label:`Mail`,icon:`mail`,color:`blue`,badge:12},{label:`Calendar`,icon:`calendar`,color:`orange`},{label:`Photos`,icon:`image`,color:`pink`},{label:`Music`,icon:`music`,color:`purple`},{label:`Messages`,icon:`chat`,color:`mint`,badge:3},{label:`Files`,icon:`folder`,color:`cyan`},{label:`Notes`,icon:`file-text`,color:`yellow`},{label:`Store`,icon:`bag`,color:`indigo`},{label:`Settings`,icon:`settings`,color:`gray`},{label:`Weather`,icon:`weather`,color:`teal`},{label:`Books`,icon:`book`,color:`brown`},{label:`Tasks`,icon:`check-square`,color:`green`}],I=t(`<!> <!> <!>`,1),L=t(`<!> <!> <!> <!>`,1),R=t(`<!> <!> <!> <!> <!>`,1),M.__docgen={data:[],name:`AppIcon.stories.svelte`},z=y(M,N),B=[`Playground`,`HomeScreen`,`Dock`,`AccentAndGlass`,`Sizes`],V={...z.Playground,tags:[`svelte-csf-v5`]},H={...z.HomeScreen,tags:[`svelte-csf-v5`]},U={...z.Dock,tags:[`svelte-csf-v5`]},W={...z.AccentAndGlass,tags:[`svelte-csf-v5`]},G={...z.Sizes,tags:[`svelte-csf-v5`]}})))()}K();export{W as AccentAndGlass,U as Dock,H as HomeScreen,V as Playground,G as Sizes,B as __namedExportsOrder,N as default};