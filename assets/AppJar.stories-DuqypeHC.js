import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Mt as t,Qt as n,St as r,Ut as i,b as a,bt as o,en as s,fn as c,jn as l,l as u,pn as d,qt as f,wn as p}from"./iframe-CJu7z9ED.js";import{i as m,n as h,r as g,t as _}from"./create-runtime-stories-CaxQI1vi.js";import{n as v,t as y}from"./Button-B6mW7nXy.js";import{n as b,t as x}from"./AppJar-CtQcAplH.js";import{f as S,r as C}from"./mock-desktop-Cq7Fn4sQ.js";function w(e,r){d(r,!0);let l=s(!0),u=s(void 0);E(e,{name:`AppJar`,asChild:!0,children:(e,r)=>{var s=D(),c=i(s),d=i(c);y(d,{variant:`primary`,icon:`grid`,label:`Show all apps`,onclick:()=>n(l,!0)}),p(c),a(c,e=>n(u,e),()=>t(u));var m=f(c,2);x(m,{get anchor(){return t(u)},get apps(){return C},get open(){return t(l)},set open(e){n(l,e,!0)}}),p(s),o(e,s)},$$slots:{default:!0},parameters:{docs:{description:{story:`The candy jar: all apps in one glass jar that rises from the bottom, search first, grouped
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
</div>`}}}),c()}var T,E,D,O,k,A;function j(){return(j=e((()=>{l(),m(),b(),v(),S(),u(),h(),T={title:`Organisms/Desktop & OS/AppJar`,component:x,tags:[`autodocs`],parameters:{layout:`fullscreen`}},{Story:E}=g(T),D=r(`<div style="padding:2rem;min-height:40rem"><span style="display:inline-block"><!></span> <!></div>`),w.__docgen={data:[],name:`AppJar.stories.svelte`},O=_(w,T),k=[`AppJar`],A={...O.AppJar,tags:[`svelte-csf-v5`]}})))()}j();export{A as AppJar,k as __namedExportsOrder,T as default};