import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Cn as t,Ct as n,Ft as r,Gt as i,Ht as a,Pn as o,Pt as s,Rt as c,Wt as l,_n as u,b as d,cn as f,l as p,on as m,wn as h,xt as g,zt as _}from"./iframe-D3QpTFc1.js";import{i as v,n as y,r as b,t as x}from"./create-runtime-stories-bgfxAijx.js";import{n as S,t as C}from"./Button-DO5WmEfH.js";import{n as w,t as T}from"./QuickSettings-BwttdeJ9.js";import{f as E,s as D}from"./mock-desktop-Cq7Fn4sQ.js";function O(e,n){h(n,!0);let r=f(l(D.map(e=>({...e})))),s=f(80),p=f(45),v=f(!0),y=f(!1),b=f(void 0);var x=M(),S=_(x);A(S,{name:`QuickSettings`,asChild:!0,children:(e,t)=>{{let t=u(()=>({title:`Sugar Rush`,artist:`The Gummy Bears`,playing:i(v)}));T(e,{get toggles(){return i(r)},ontoggle:(e,t)=>m(r,i(r).map(n=>n.id===e?{...n,on:t}:n),!0),get nowPlaying(){return i(t)},onplaypause:()=>m(v,!i(v)),get brightness(){return i(s)},set brightness(e){m(s,e,!0)},get volume(){return i(p)},set volume(e){m(p,e,!0)}})}},$$slots:{default:!0},parameters:{docs:{description:{story:`Toggle tiles, big sliders and a now-playing card. With \`floating\` it becomes a panel that
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
/>`}}});var w=a(S,2);A(w,{name:`Floating from its anchor`,asChild:!0,children:(e,t)=>{var n=j(),l=c(n),u=c(l);C(u,{icon:`settings`,label:`Quick settings`,get"aria-expanded"(){return i(y)},onclick:()=>m(y,!i(y))}),o(l),d(l,e=>m(b,e),()=>i(b));var f=a(l,2);T(f,{floating:!0,get anchor(){return i(b)},get toggles(){return i(r)},ontoggle:(e,t)=>m(r,i(r).map(n=>n.id===e?{...n,on:t}:n),!0),get open(){return i(y)},set open(e){m(y,e,!0)},get brightness(){return i(s)},set brightness(e){m(s,e,!0)},get volume(){return i(p)},set volume(e){m(p,e,!0)}}),o(n),g(e,n)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<div style="display:flex;justify-content:flex-end;padding:1rem;min-height:32rem">
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
</div>`}}}),g(e,x),t()}var k,A,j,M,N,P,F,I;function L(){return(L=e((()=>{r(),s(),v(),w(),S(),E(),p(),y(),k={title:`Organisms/Desktop & OS/QuickSettings`,component:T,tags:[`autodocs`]},{Story:A}=b(k),j=n(`<div style="display:flex;justify-content:flex-end;padding:1rem;min-height:32rem"><span style="display:inline-block"><!></span> <!></div>`),M=n(`<!> <!>`,1),O.__docgen={data:[],name:`QuickSettings.stories.svelte`},N=x(O,k),P=[`QuickSettings`,`FloatingFromItsAnchor`],F={...N.QuickSettings,tags:[`svelte-csf-v5`]},I={...N.FloatingFromItsAnchor,tags:[`svelte-csf-v5`]}})))()}L();export{I as FloatingFromItsAnchor,F as QuickSettings,P as __namedExportsOrder,k as default};