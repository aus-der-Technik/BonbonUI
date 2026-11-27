import{n as e}from"./rolldown-runtime-Dxh6kD9_.js";import{Ct as t,Ft as n,Gt as r,Ht as i,Mn as a,Pt as o,Rt as s,Sn as c,Wt as l,b as u,cn as d,hn as f,l as p,on as m,xn as h,xt as g,zt as _}from"./iframe-WlNMZtZ0.js";import{i as v,n as y,r as b,t as x}from"./create-runtime-stories-CbHiKinS.js";import{n as S,t as C}from"./Button-DHLILcYm.js";import{n as w,t as T}from"./QuickSettings-S8CuoZrK.js";import{f as E,s as D}from"./mock-desktop-DZRORnrh.js";function O(e,t){c(t,!0);let n=d(l(D.map(e=>({...e})))),o=d(80),p=d(45),v=d(!0),y=d(!1),b=d(void 0);var x=M(),S=_(x);A(S,{name:`QuickSettings`,asChild:!0,children:(e,t)=>{{let t=f(()=>({title:`Sugar Rush`,artist:`The Gummy Bears`,playing:r(v)}));T(e,{get toggles(){return r(n)},ontoggle:(e,t)=>m(n,r(n).map(n=>n.id===e?{...n,on:t}:n),!0),get nowPlaying(){return r(t)},onplaypause:()=>m(v,!r(v)),get brightness(){return r(o)},set brightness(e){m(o,e,!0)},get volume(){return r(p)},set volume(e){m(p,e,!0)}})}},$$slots:{default:!0},parameters:{docs:{description:{story:`Toggle tiles, big sliders and a now-playing card. With \`floating\` it becomes a panel that
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
/>`}}});var w=i(S,2);A(w,{name:`Floating from its anchor`,asChild:!0,children:(e,t)=>{var c=j(),l=s(c),d=s(l);C(d,{icon:`settings`,label:`Quick settings`,get"aria-expanded"(){return r(y)},onclick:()=>m(y,!r(y))}),a(l),u(l,e=>m(b,e),()=>r(b));var f=i(l,2);T(f,{floating:!0,get anchor(){return r(b)},get toggles(){return r(n)},ontoggle:(e,t)=>m(n,r(n).map(n=>n.id===e?{...n,on:t}:n),!0),get open(){return r(y)},set open(e){m(y,e,!0)},get brightness(){return r(o)},set brightness(e){m(o,e,!0)},get volume(){return r(p)},set volume(e){m(p,e,!0)}}),a(c),g(e,c)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<div style="display:flex;justify-content:flex-end;padding:1rem;min-height:32rem">
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
</div>`}}}),g(e,x),h()}var k,A,j,M,N,P,F,I;function L(){return(L=e((()=>{n(),o(),v(),w(),S(),E(),p(),y(),k={title:`Organisms/Desktop & OS/QuickSettings`,component:T,tags:[`autodocs`]},{Story:A}=b(k),j=t(`<div style="display:flex;justify-content:flex-end;padding:1rem;min-height:32rem"><span style="display:inline-block"><!></span> <!></div>`),M=t(`<!> <!>`,1),O.__docgen={data:[],name:`QuickSettings.stories.svelte`},N=x(O,k),P=[`QuickSettings`,`FloatingFromItsAnchor`],F={...N.QuickSettings,tags:[`svelte-csf-v5`]},I={...N.FloatingFromItsAnchor,tags:[`svelte-csf-v5`]}})))()}L();export{I as FloatingFromItsAnchor,F as QuickSettings,P as __namedExportsOrder,k as default};