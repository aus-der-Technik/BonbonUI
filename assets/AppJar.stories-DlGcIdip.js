import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Ct as t,En as n,Gt as r,Nn as i,Pt as a,Yt as o,b as s,en as c,hn as l,l as u,mn as d,nn as f,xt as p}from"./iframe-CjPY-Fqe.js";import{i as m,n as h,r as g,t as _}from"./create-runtime-stories-tZqyKHa4.js";import{n as v,t as y}from"./Button-CrEFh_Av.js";import{n as b,t as x}from"./AppJar-DXjq-hkB.js";import{f as S,r as C}from"./mock-desktop-Cq7Fn4sQ.js";function w(e,t){l(t,!0);let i=f(!0),u=f(void 0);E(e,{name:`AppJar`,asChild:!0,children:(e,t)=>{var l=D(),d=r(l),f=r(d);y(f,{variant:`primary`,icon:`grid`,label:`Show all apps`,onclick:()=>c(i,!0)}),n(d),s(d,e=>c(u,e),()=>a(u));var m=o(d,2);x(m,{get anchor(){return a(u)},get apps(){return C},get open(){return a(i)},set open(e){c(i,e,!0)}}),n(l),p(e,l)},$$slots:{default:!0},parameters:{docs:{description:{story:`The candy jar: all apps in one glass jar that rises from the bottom, search first, grouped
    by \`category\`. Icons pour in one after another. Type to filter, Enter opens the first
    match, arrows move (Up / Down find the nearest icon in the next row, across groups),
    Tab stays inside, Escape or a click beside the jar closes. \`anchor\` is the button that
    opened it: the jar rises out of it.

    Why a jar and not a full-screen grid? A full-screen grid wipes out where you were and turns
    a quick launch into a trip to another place. The jar rises from the tray button you
    pressed, keeps the desktop visible (blurred) around it, and goes back where it came from.
    Why categories? Sixteen identical squares are a memory game; a few honest groups ("Work",
    "Make & play") let you find an app by what it is for. Why the pour? Thirty milliseconds
    per icon is too short to wait for, long enough to feel the jar fill.`}},__svelteCsf:{rawCode:`<div style="padding:2rem;min-height:40rem">
  <span bind:this={trigger} style="display:inline-block">
    <Button variant="primary" icon="grid" label="Show all apps" onclick={() => (open = true)} />
  </span>
  <AppJar bind:open anchor={trigger} {apps} />
</div>`}}}),d()}var T,E,D,O,k,A;function j(){return(j=e((()=>{i(),m(),b(),v(),S(),u(),h(),T={title:`Organisms/Desktop & OS/AppJar`,component:x,tags:[`autodocs`],parameters:{layout:`fullscreen`}},{Story:E}=g(T),D=t(`<div style="padding:2rem;min-height:40rem"><span style="display:inline-block"><!></span> <!></div>`),w.__docgen={data:[],name:`AppJar.stories.svelte`},O=_(w,T),k=[`AppJar`],A={...O.AppJar,tags:[`svelte-csf-v5`]}})))()}j();export{A as AppJar,k as __namedExportsOrder,T as default};