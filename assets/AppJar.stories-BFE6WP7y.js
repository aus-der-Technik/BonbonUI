import{n as e}from"./rolldown-runtime-Dxh6kD9_.js";import{Ct as t,Ft as n,Gt as r,Ht as i,Mn as a,Pt as o,Rt as s,Sn as c,b as l,cn as u,l as d,on as f,xn as p,xt as m}from"./iframe-WlNMZtZ0.js";import{i as h,n as g,r as _,t as v}from"./create-runtime-stories-CbHiKinS.js";import{n as y,t as b}from"./Button-DHLILcYm.js";import{n as x,t as S}from"./AppJar-DoYnCDPO.js";import{f as C,r as w}from"./mock-desktop-DZRORnrh.js";function T(e,t){c(t,!0);let n=u(!0),o=u(void 0);D(e,{name:`AppJar`,asChild:!0,children:(e,t)=>{var c=O(),u=s(c),d=s(u);b(d,{variant:`primary`,icon:`grid`,label:`Show all apps`,onclick:()=>f(n,!0)}),a(u),l(u,e=>f(o,e),()=>r(o));var p=i(u,2);S(p,{get anchor(){return r(o)},get apps(){return w},get open(){return r(n)},set open(e){f(n,e,!0)}}),a(c),m(e,c)},$$slots:{default:!0},parameters:{docs:{description:{story:`The candy jar: all apps in one glass jar that rises from the bottom, search first, grouped
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
</div>`}}}),p()}var E,D,O,k,A,j;function M(){return(M=e((()=>{n(),o(),h(),x(),y(),C(),d(),g(),E={title:`Organisms/Desktop & OS/AppJar`,component:S,tags:[`autodocs`],parameters:{layout:`fullscreen`}},{Story:D}=_(E),O=t(`<div style="padding:2rem;min-height:40rem"><span style="display:inline-block"><!></span> <!></div>`),T.__docgen={data:[],name:`AppJar.stories.svelte`},k=v(T,E),A=[`AppJar`],j={...k.AppJar,tags:[`svelte-csf-v5`]}})))()}M();export{j as AppJar,A as __namedExportsOrder,E as default};