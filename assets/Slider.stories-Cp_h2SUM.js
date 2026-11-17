import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Ct as t,Kt as n,Nn as r,Pt as i,Yt as a,en as o,hn as s,l as c,mn as l,nn as u,xt as d}from"./iframe-CjPY-Fqe.js";import{i as f,n as p,r as m,t as h}from"./create-runtime-stories-tZqyKHa4.js";import{n as g,t as _}from"./Grid-B_70npZ2.js";import{n as v,t as y}from"./Slider-DmSCqOXb.js";function b(e,t){s(t,!0);let r=u(.7),c=u(40),f=u(2500);var p=C(),m=n(p);S(m,{name:`Playground`,parameters:{docs:{description:{story:`The knob is a white bead lit from above with a small accent core, so it reads as "grab me" on
any backdrop. Hover grows it a touch; while dragging it swells and picks up a soft tint glow.`}},__svelteCsf:{rawCode:`<Slider {...args} />`}}});var h=a(m,2);S(h,{name:`Formatted values`,asChild:!0,children:(e,t)=>{_(e,{columns:3,min:`12rem`,gap:`lg`,children:(e,t)=>{var s=C(),l=n(s);y(l,{label:`Temperature`,min:0,max:2,step:.05,format:e=>e.toFixed(2),hint:`Higher is more creative, lower more focused.`,get value(){return i(r)},set value(e){o(r,e,!0)}});var u=a(l,2);y(u,{label:`Top-k`,min:1,max:100,get value(){return i(c)},set value(e){o(c,e,!0)}});var p=a(u,2);y(p,{label:`Budget`,min:0,max:1e4,step:100,format:e=>`${e.toLocaleString(`de-DE`)} €`,get value(){return i(f)},set value(e){o(f,e,!0)}}),d(e,s)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"`format` shapes the readout; `hint` is a grey help line under the track."}},__svelteCsf:{rawCode:`<Grid columns={3} min="12rem" gap="lg">
  <Slider
    label="Temperature"
    bind:value={temperature}
    min={0}
    max={2}
    step={0.05}
    format={(v) => v.toFixed(2)}
    hint="Higher is more creative, lower more focused."
  />
  <Slider label="Top-k" bind:value={topK} min={1} max={100} />
  <Slider
    label="Budget"
    bind:value={budget}
    min={0}
    max={10000}
    step={100}
    format={(v) => \`\${v.toLocaleString('de-DE')} €\`}
  />
</Grid>`}}});var g=a(h,2);S(g,{name:`Disabled`,args:{label:`Brightness`,value:30,disabled:!0},parameters:{__svelteCsf:{rawCode:`<Slider {...args} />`}}}),d(e,p),l()}var x,S,C,w,T,E,D,O;function k(){return(k=e((()=>{r(),f(),g(),v(),c(),p(),x={title:`Atoms/Slider`,component:y,tags:[`autodocs`],args:{label:`Volume`,value:60,min:0,max:100,step:1}},{Story:S}=m(x),C=t(`<!> <!> <!>`,1),b.__docgen={data:[],name:`Slider.stories.svelte`},w=h(b,x),T=[`Playground`,`FormattedValues`,`Disabled`],E={...w.Playground,tags:[`svelte-csf-v5`]},D={...w.FormattedValues,tags:[`svelte-csf-v5`]},O={...w.Disabled,tags:[`svelte-csf-v5`]}})))()}k();export{O as Disabled,D as FormattedValues,E as Playground,T as __namedExportsOrder,x as default};