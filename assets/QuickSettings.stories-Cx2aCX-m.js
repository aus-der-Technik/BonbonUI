import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Mt as t,Qt as n,St as r,Ut as i,Wt as a,Yt as o,b as s,bt as c,en as l,fn as u,jn as d,l as f,on as p,pn as m,qt as h,wn as g}from"./iframe-CWg4yaha.js";import{i as _,n as v,r as y,t as b}from"./create-runtime-stories-DQq0d2lF.js";import{n as x,t as S}from"./Button-D4mD58qs.js";import{n as C,t as w}from"./QuickSettings-jyKpz-tm.js";import{f as T,s as E}from"./mock-desktop-Cq7Fn4sQ.js";function D(e,r){m(r,!0);let d=l(o(E.map(e=>({...e})))),f=l(80),_=l(45),v=l(!0),y=l(!1),b=l(void 0);var x=j(),C=a(x);k(C,{name:`QuickSettings`,asChild:!0,children:(e,r)=>{{let r=p(()=>({title:`Sugar Rush`,artist:`The Gummy Bears`,playing:t(v)}));w(e,{get toggles(){return t(d)},ontoggle:(e,r)=>n(d,t(d).map(t=>t.id===e?{...t,on:r}:t),!0),get nowPlaying(){return t(r)},onplaypause:()=>n(v,!t(v)),get brightness(){return t(f)},set brightness(e){n(f,e,!0)},get volume(){return t(_)},set volume(e){n(_,e,!0)}})}},$$slots:{default:!0},parameters:{docs:{description:{story:`Toggle tiles, big sliders and a now-playing card. With \`floating\` it becomes a panel that
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
/>`}}});var T=h(C,2);k(T,{name:`Floating from its anchor`,asChild:!0,children:(e,r)=>{var a=A(),o=i(a),l=i(o);S(l,{icon:`settings`,label:`Quick settings`,get"aria-expanded"(){return t(y)},onclick:()=>n(y,!t(y))}),g(o),s(o,e=>n(b,e),()=>t(b));var u=h(o,2);w(u,{floating:!0,get anchor(){return t(b)},get toggles(){return t(d)},ontoggle:(e,r)=>n(d,t(d).map(t=>t.id===e?{...t,on:r}:t),!0),get open(){return t(y)},set open(e){n(y,e,!0)},get brightness(){return t(f)},set brightness(e){n(f,e,!0)},get volume(){return t(_)},set volume(e){n(_,e,!0)}}),g(a),c(e,a)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<div style="display:flex;justify-content:flex-end;padding:1rem;min-height:32rem">
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
</div>`}}}),c(e,x),u()}var O,k,A,j,M,N,P,F;function I(){return(I=e((()=>{d(),_(),C(),x(),T(),f(),v(),O={title:`Organisms/Desktop & OS/QuickSettings`,component:w,tags:[`autodocs`]},{Story:k}=y(O),A=r(`<div style="display:flex;justify-content:flex-end;padding:1rem;min-height:32rem"><span style="display:inline-block"><!></span> <!></div>`),j=r(`<!> <!>`,1),D.__docgen={data:[],name:`QuickSettings.stories.svelte`},M=b(D,O),N=[`QuickSettings`,`FloatingFromItsAnchor`],P={...M.QuickSettings,tags:[`svelte-csf-v5`]},F={...M.FloatingFromItsAnchor,tags:[`svelte-csf-v5`]}})))()}I();export{F as FloatingFromItsAnchor,P as QuickSettings,N as __namedExportsOrder,O as default};