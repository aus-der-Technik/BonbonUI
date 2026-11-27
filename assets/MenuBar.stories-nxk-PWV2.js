import{n as e}from"./rolldown-runtime-Dxh6kD9_.js";import{Ct as t,Ft as n,Gt as r,Ht as i,Mn as a,Pt as o,Rt as s,Sn as c,l,m as u,pn as d,xn as f,xt as p,zt as m}from"./iframe-WlNMZtZ0.js";import{a as h,i as g,n as _,r as v,t as y}from"./create-runtime-stories-CbHiKinS.js";import{n as b,t as x}from"./MenuBar-DWDPW1Vf.js";import{f as S,n as C}from"./mock-desktop-DZRORnrh.js";function w(e,t){c(t,!1),u();var n=A(),o=m(n);E(o,{name:`MenuBar`,asChild:!0,children:(e,t)=>{var n=k(),i=s(n);{let e=d(()=>C(`Notes`));x(i,{get logoMenu(){return O},appIcon:`edit`,appColor:`yellow`,get menus(){return r(e)},get status(){return D},name:`Alex`})}a(n),p(e,n)},$$slots:{default:!0},parameters:{docs:{description:{story:`The top shelf: the system menu (a wrapped bonbon), the front app's name in a pill with its
    icon, its menus, status items and the day pill. Point at the day pill for its wink. Click
    a menu, then hover its neighbours; or Tab in and use the arrow keys.

    Why a floating shelf, not a full-width bar? A bar welded to the screen edge reads as
    hardware, and in solid black or white it is the loudest thing on screen. A slim glass shelf
    lets the wallpaper run behind it and keeps the top calm.
    Why a wrapped bonbon for the system menu? It is the system's own mark in the tint's hues —
    a face, but no logo to compete with your app, and nothing borrowed from another desktop.
    Point at it and the wrapper twists.
    Why a greeting next to the time? A clock tells you the time; "Good afternoon" tells you the
    machine is on your side. It costs one word, never blocks anything, and the wink only
    appears when you go looking for it.`}},__svelteCsf:{rawCode:`<div style="min-height:18rem">
  <MenuBar
    logoMenu={system}
    appIcon="edit"
    appColor="yellow"
    menus={appMenus('Notes')}
    {status}
    name="Alex"
  />
</div>`}}});var l=i(o,2);E(l,{name:`Full-width bar`,asChild:!0,children:(e,t)=>{var n=k(),i=s(n);{let e=d(()=>C(`Files`).slice(0,4));x(i,{floating:!1,greet:!1,appIcon:`folder`,appColor:`blue`,get menus(){return r(e)},get status(){return D}})}a(n),p(e,n)},$$slots:{default:!0},parameters:{docs:{description:{story:"`floating={false}` — a full-width bar for apps that sit flush in a frame. `greet={false}`\n    shows the time only; `greeting` takes your own words (another language, another tone)."}},__svelteCsf:{rawCode:`<div style="min-height:18rem">
  <MenuBar
    floating={false}
    greet={false}
    appIcon="folder"
    appColor="blue"
    menus={appMenus('Files').slice(0, 4)}
    {status}
  />
</div>`}}}),p(e,n),f()}var T,E,D,O,k,A,j,M,N,P;function F(){return(F=e((()=>{n(),o(),h(),g(),b(),S(),l(),_(),T={title:`Organisms/Desktop & OS/MenuBar`,component:x,tags:[`autodocs`],parameters:{layout:`fullscreen`}},{Story:E}=v(T),D=[{icon:`search`,label:`Search`,onclick:()=>{}},{icon:`wifi`,label:`Wi-Fi`},{icon:`battery`,label:`Battery`,text:`82%`}],O=[{label:`About this desktop`},{label:`Settings…`}],k=t(`<div style="min-height:18rem"><!></div>`),A=t(`<!> <!>`,1),w.__docgen={data:[],name:`MenuBar.stories.svelte`},j=y(w,T),M=[`MenuBar`,`FullWidthBar`],N={...j.MenuBar,tags:[`svelte-csf-v5`]},P={...j.FullWidthBar,tags:[`svelte-csf-v5`]}})))()}F();export{P as FullWidthBar,N as MenuBar,M as __namedExportsOrder,T as default};