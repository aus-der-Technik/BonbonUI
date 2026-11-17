import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Ct as t,En as n,Gt as r,Kt as i,Nn as a,Pt as o,Yt as s,Zt as c,b as l,cn as u,en as d,hn as f,l as p,mn as m,nn as h,xt as g}from"./iframe-CRBWUEFv.js";import{i as _,n as v,r as y,t as b}from"./create-runtime-stories-DtoOt73Q.js";import{n as x,t as S}from"./Button-CVctU_KR.js";import{n as C,t as w}from"./QuickSettings-DyoFV5Q7.js";import{f as T,s as E}from"./mock-desktop-Cq7Fn4sQ.js";function D(e,t){f(t,!0);let a=h(c(E.map(e=>({...e})))),p=h(80),_=h(45),v=h(!0),y=h(!1),b=h(void 0);var x=j(),C=i(x);k(C,{name:`QuickSettings`,asChild:!0,children:(e,t)=>{{let t=u(()=>({title:`Sugar Rush`,artist:`The Gummy Bears`,playing:o(v)}));w(e,{get toggles(){return o(a)},ontoggle:(e,t)=>d(a,o(a).map(n=>n.id===e?{...n,on:t}:n),!0),get nowPlaying(){return o(t)},onplaypause:()=>d(v,!o(v)),get brightness(){return o(p)},set brightness(e){d(p,e,!0)},get volume(){return o(_)},set volume(e){d(_,e,!0)}})}},$$slots:{default:!0},parameters:{docs:{description:{story:`Toggle tiles, big sliders and a now-playing card. With \`floating\` it becomes a panel that
    pops out of its \`anchor\` (the status item you pressed), takes focus, and closes on Escape
    (focus goes back to the anchor) or an outside click.

    Why is only the "on" disc coloured? A toggle's colour is its state: candy means on, glass
    means off — you can read the whole panel at a glance without reading a single label.
    Why white slider fills? Brightness and volume are amounts, not choices; a neutral fill
    reads as "how much" in both themes and leaves the colour for what is switched on.`}},__svelteCsf:{rawCode:`<QuickSettings
  {toggles}
  ontoggle={(id, on) => (toggles = toggles.map((t) => (t.id === id ? { ...t, on } : t)))}
  bind:brightness
  bind:volume
  nowPlaying={{ title: 'Sugar Rush', artist: 'The Gummy Bears', playing }}
  onplaypause={() => (playing = !playing)}
/>`}}});var T=s(C,2);k(T,{name:`Floating from its anchor`,asChild:!0,children:(e,t)=>{var i=A(),c=r(i),u=r(c);S(u,{icon:`settings`,label:`Quick settings`,get"aria-expanded"(){return o(y)},onclick:()=>d(y,!o(y))}),n(c),l(c,e=>d(b,e),()=>o(b));var f=s(c,2);w(f,{floating:!0,get anchor(){return o(b)},get toggles(){return o(a)},ontoggle:(e,t)=>d(a,o(a).map(n=>n.id===e?{...n,on:t}:n),!0),get open(){return o(y)},set open(e){d(y,e,!0)},get brightness(){return o(p)},set brightness(e){d(p,e,!0)},get volume(){return o(_)},set volume(e){d(_,e,!0)}}),n(i),g(e,i)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<div style="display:flex;justify-content:flex-end;padding:1rem;min-height:32rem">
  <span bind:this={trigger} style="display:inline-block">
    <Button
      icon="settings"
      label="Quick settings"
      aria-expanded={open}
      onclick={() => (open = !open)}
    />
  </span>
  <QuickSettings
    floating
    bind:open
    anchor={trigger}
    {toggles}
    ontoggle={(id, on) => (toggles = toggles.map((t) => (t.id === id ? { ...t, on } : t)))}
    bind:brightness
    bind:volume
  />
</div>`}}}),g(e,x),m()}var O,k,A,j,M,N,P,F;function I(){return(I=e((()=>{a(),_(),C(),x(),T(),p(),v(),O={title:`Organisms/Desktop & OS/QuickSettings`,component:w,tags:[`autodocs`]},{Story:k}=y(O),A=t(`<div style="display:flex;justify-content:flex-end;padding:1rem;min-height:32rem"><span style="display:inline-block"><!></span> <!></div>`),j=t(`<!> <!>`,1),D.__docgen={data:[],name:`QuickSettings.stories.svelte`},M=b(D,O),N=[`QuickSettings`,`FloatingFromItsAnchor`],P={...M.QuickSettings,tags:[`svelte-csf-v5`]},F={...M.FloatingFromItsAnchor,tags:[`svelte-csf-v5`]}})))()}I();export{F as FloatingFromItsAnchor,P as QuickSettings,N as __namedExportsOrder,O as default};