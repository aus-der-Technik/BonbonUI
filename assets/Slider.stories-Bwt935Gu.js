import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Mt as t,Qt as n,St as r,Wt as i,bt as a,en as o,fn as s,jn as c,l,pn as u,qt as d}from"./iframe-CWg4yaha.js";import{i as f,n as p,r as m,t as h}from"./create-runtime-stories-DQq0d2lF.js";import{n as g,t as _}from"./Grid-Cus4ZVN3.js";import{n as v,t as y}from"./Slider-Bk09fUAS.js";function b(e,r){u(r,!0);let c=o(.7),l=o(40),f=o(2500);var p=C(),m=i(p);S(m,{name:`Playground`,parameters:{docs:{description:{story:`The knob is a white bead lit from above with a small accent core, so it reads as "grab me" on
any backdrop. Hover grows it a touch; while dragging it swells and picks up a soft tint glow.`}},__svelteCsf:{rawCode:`<Slider {...args} />`}}});var h=d(m,2);S(h,{name:`Formatted values`,asChild:!0,children:(e,r)=>{_(e,{columns:3,min:`12rem`,gap:`lg`,children:(e,r)=>{var o=C(),s=i(o);y(s,{label:`Temperature`,min:0,max:2,step:.05,format:e=>e.toFixed(2),hint:`Higher is more creative, lower more focused.`,get value(){return t(c)},set value(e){n(c,e,!0)}});var u=d(s,2);y(u,{label:`Top-k`,min:1,max:100,get value(){return t(l)},set value(e){n(l,e,!0)}});var p=d(u,2);y(p,{label:`Budget`,min:0,max:1e4,step:100,format:e=>`${e.toLocaleString(`de-DE`)} €`,get value(){return t(f)},set value(e){n(f,e,!0)}}),a(e,o)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"`format` shapes the readout; `hint` is a grey help line under the track."}},__svelteCsf:{rawCode:`<Grid columns={3} min="12rem" gap="lg">
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
</Grid>`}}});var g=d(h,2);S(g,{name:`Disabled`,args:{label:`Brightness`,value:30,disabled:!0},parameters:{__svelteCsf:{rawCode:`<Slider {...args} />`}}}),a(e,p),s()}var x,S,C,w,T,E,D,O;function k(){return(k=e((()=>{c(),f(),g(),v(),l(),p(),x={title:`Atoms/Slider`,component:y,tags:[`autodocs`],args:{label:`Volume`,value:60,min:0,max:100,step:1}},{Story:S}=m(x),C=r(`<!> <!> <!>`,1),b.__docgen={data:[],name:`Slider.stories.svelte`},w=h(b,x),T=[`Playground`,`FormattedValues`,`Disabled`],E={...w.Playground,tags:[`svelte-csf-v5`]},D={...w.FormattedValues,tags:[`svelte-csf-v5`]},O={...w.Disabled,tags:[`svelte-csf-v5`]}})))()}k();export{O as Disabled,D as FormattedValues,E as Playground,T as __namedExportsOrder,x as default};