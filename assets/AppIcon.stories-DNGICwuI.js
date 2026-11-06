import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Mt as t,Qt as n,St as r,Wt as i,bt as a,en as o,fn as s,jn as c,l,on as u,p as d,pn as f,qt as p,rt as m,xt as h}from"./iframe-Dd9zCUtD.js";import{i as g,n as _,r as v,t as y}from"./create-runtime-stories-Bj9BSqmd.js";import{i as b,r as x}from"./Icon-DkrZsc3M.js";import{i as S,n as C}from"./palette-DNwFBI2z.js";import{n as w,t as T}from"./Grid-3RFy1wlK.js";import{n as E,t as D}from"./Layer-BaM1JUSg.js";import{n as O,t as k}from"./Row--NLDOgtN.js";import{n as A,t as j}from"./AppIcon-C1nrjmOl.js";function M(e,r){f(r,!0);let c=o(`Mail`);var l=R(),g=i(l);P(g,{name:`Playground`,parameters:{docs:{description:{story:`The bonbon icon is our own shape, not a phone icon: a rounder corner (30% of the size, and it
follows the Application's \`radius\` setting), a soft glow on the top half because the light in
this library always comes from above, and a thin sugar-glass rim that is bright at the top edge.
Hover lifts it; pressing squishes it like a gummy.`}},__svelteCsf:{rawCode:`<AppIcon {...args} />`}}});var _=p(g,2);P(_,{name:`Home screen`,asChild:!0,children:(e,n)=>{T(e,{min:`5.5rem`,gap:`lg`,children:(e,n)=>{var r=h(),o=i(r);m(o,17,()=>F,e=>e.label,(e,n)=>{j(e,d(()=>t(n),{size:`lg`,caption:!0,onclick:()=>{}}))}),a(e,r)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A home screen: icons with captions in a responsive grid.`}},__svelteCsf:{rawCode:`<Grid min="5.5rem" gap="lg">
  {#each apps as app (app.label)}
    <AppIcon {...app} size="lg" caption onclick={() => {}} />
  {/each}
</Grid>`}}});var v=p(_,2);P(v,{name:`Dock`,asChild:!0,children:(e,r)=>{D(e,{level:`front`,edge:`bottom`,direction:`horizontal`,shape:`card`,gap:`sm`,style:`width: max-content; margin-inline: auto`,children:(e,r)=>{var o=h(),s=i(o);m(s,17,()=>F.slice(0,7),e=>e.label,(e,r)=>{{let i=u(()=>t(r).label===t(c)||t(r).label===`Calendar`),a=u(()=>t(r).label===t(c));j(e,d(()=>t(r),{get running(){return t(i)},get active(){return t(a)},onclick:()=>n(c,t(r).label,!0)}))}}),a(e,o)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A dock on the front layer (sticky at the bottom). \`running\` marks open apps with a short tint
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
</Layer>`}}});var y=p(v,2);P(y,{name:`Accent and glass`,asChild:!0,children:(e,t)=>{k(e,{gap:`md`,children:(e,t)=>{var n=I(),r=i(n);j(r,{label:`Dashboard`,icon:`chart`,color:`accent`,size:`lg`});var o=p(r,2);j(o,{label:`Search`,icon:`search`,color:`glass`,size:`lg`});var s=p(o,2);j(s,{label:`Spaces`,color:`purple`,size:`lg`}),a(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"`accent` follows the tint; `glass` is frosted with an accent glyph."}},__svelteCsf:{rawCode:`<Row gap="md">
  <AppIcon label="Dashboard" icon="chart" color="accent" size="lg" />
  <AppIcon label="Search" icon="search" color="glass" size="lg" />
  <AppIcon label="Spaces" color="purple" size="lg" />
</Row>`}}});var b=p(y,2);P(b,{name:`Sizes`,asChild:!0,children:(e,t)=>{k(e,{gap:`md`,children:(e,t)=>{var n=L(),r=i(n);j(r,{label:`Mail`,icon:`mail`,size:`sm`,badge:2});var o=p(r,2);j(o,{label:`Mail`,icon:`mail`,size:`md`,badge:2});var s=p(o,2);j(s,{label:`Mail`,icon:`mail`,size:`lg`,badge:24});var c=p(s,2);j(c,{label:`Mail`,icon:`mail`,size:`xl`,badge:240}),a(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<Row gap="md">
  <AppIcon label="Mail" icon="mail" size="sm" badge={2} />
  <AppIcon label="Mail" icon="mail" size="md" badge={2} />
  <AppIcon label="Mail" icon="mail" size="lg" badge={24} />
  <AppIcon label="Mail" icon="mail" size="xl" badge={240} />
</Row>`}}}),a(e,l),s()}var N,P,F,I,L,R,z,B,V,H,U,W,G;function K(){return(K=e((()=>{c(),g(),w(),E(),O(),A(),b(),C(),l(),_(),N={title:`Atoms/AppIcon`,component:j,tags:[`autodocs`],args:{label:`Mail`,icon:`mail`,color:`blue`,size:`lg`,badge:3},argTypes:{color:{control:`select`,options:[...S,`accent`,`glass`]},size:{control:`inline-radio`,options:[`sm`,`md`,`lg`,`xl`]},icon:{control:`select`,options:x}}},{Story:P}=v(N),F=[{label:`Mail`,icon:`mail`,color:`blue`,badge:12},{label:`Calendar`,icon:`calendar`,color:`orange`},{label:`Photos`,icon:`image`,color:`pink`},{label:`Music`,icon:`music`,color:`purple`},{label:`Messages`,icon:`chat`,color:`mint`,badge:3},{label:`Files`,icon:`folder`,color:`cyan`},{label:`Notes`,icon:`file-text`,color:`yellow`},{label:`Store`,icon:`bag`,color:`indigo`},{label:`Settings`,icon:`settings`,color:`gray`},{label:`Weather`,icon:`weather`,color:`teal`},{label:`Books`,icon:`book`,color:`brown`},{label:`Tasks`,icon:`check-square`,color:`green`}],I=r(`<!> <!> <!>`,1),L=r(`<!> <!> <!> <!>`,1),R=r(`<!> <!> <!> <!> <!>`,1),M.__docgen={data:[],name:`AppIcon.stories.svelte`},z=y(M,N),B=[`Playground`,`HomeScreen`,`Dock`,`AccentAndGlass`,`Sizes`],V={...z.Playground,tags:[`svelte-csf-v5`]},H={...z.HomeScreen,tags:[`svelte-csf-v5`]},U={...z.Dock,tags:[`svelte-csf-v5`]},W={...z.AccentAndGlass,tags:[`svelte-csf-v5`]},G={...z.Sizes,tags:[`svelte-csf-v5`]}})))()}K();export{W as AccentAndGlass,U as Dock,H as HomeScreen,V as Playground,G as Sizes,B as __namedExportsOrder,N as default};