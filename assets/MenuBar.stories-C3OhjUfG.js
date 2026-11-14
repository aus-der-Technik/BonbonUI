import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Mt as t,St as n,Ut as r,Wt as i,bt as a,fn as o,in as s,jn as c,l,m as u,pn as d,qt as f,wn as p}from"./iframe-D4jyjLko.js";import{a as m,i as h,n as g,r as _,t as v}from"./create-runtime-stories-2Z8qmkK0.js";import{n as y,t as b}from"./MenuBar-CbMKYcgf.js";import{f as x,n as S}from"./mock-desktop-Cq7Fn4sQ.js";function C(e,n){d(n,!1),u();var c=k(),l=i(c);T(l,{name:`MenuBar`,asChild:!0,children:(e,n)=>{var i=O(),o=r(i);{let e=s(()=>S(`Notes`));b(o,{get logoMenu(){return D},appIcon:`edit`,appColor:`yellow`,get menus(){return t(e)},get status(){return E},name:`Alex`})}p(i),a(e,i)},$$slots:{default:!0},parameters:{docs:{description:{story:`The top shelf: the system menu (a wrapped bonbon), the front app's name in a pill with its
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
</div>`}}});var m=f(l,2);T(m,{name:`Full-width bar`,asChild:!0,children:(e,n)=>{var i=O(),o=r(i);{let e=s(()=>S(`Files`).slice(0,4));b(o,{floating:!1,greet:!1,appIcon:`folder`,appColor:`blue`,get menus(){return t(e)},get status(){return E}})}p(i),a(e,i)},$$slots:{default:!0},parameters:{docs:{description:{story:"`floating={false}` — a full-width bar for apps that sit flush in a frame. `greet={false}`\n    shows the time only; `greeting` takes your own words (another language, another tone)."}},__svelteCsf:{rawCode:`<div style="min-height:18rem">
  <MenuBar
    floating={false}
    greet={false}
    appIcon="folder"
    appColor="blue"
    menus={appMenus('Files').slice(0, 4)}
    {status}
  />
</div>`}}}),a(e,c),o()}var w,T,E,D,O,k,A,j,M,N;function P(){return(P=e((()=>{c(),m(),h(),y(),x(),l(),g(),w={title:`Organisms/Desktop & OS/MenuBar`,component:b,tags:[`autodocs`],parameters:{layout:`fullscreen`}},{Story:T}=_(w),E=[{icon:`search`,label:`Search`,onclick:()=>{}},{icon:`wifi`,label:`Wi-Fi`},{icon:`battery`,label:`Battery`,text:`82%`}],D=[{label:`About this desktop`},{label:`Settings…`}],O=n(`<div style="min-height:18rem"><!></div>`),k=n(`<!> <!>`,1),C.__docgen={data:[],name:`MenuBar.stories.svelte`},A=v(C,w),j=[`MenuBar`,`FullWidthBar`],M={...A.MenuBar,tags:[`svelte-csf-v5`]},N={...A.FullWidthBar,tags:[`svelte-csf-v5`]}})))()}P();export{N as FullWidthBar,M as MenuBar,j as __namedExportsOrder,w as default};