import{n as e}from"./rolldown-runtime-Dxh6kD9_.js";import{Ct as t,Ft as n,Gt as r,Ht as i,Pt as a,Sn as o,cn as s,l as c,on as l,xn as u,xt as d,zt as f}from"./iframe-WlNMZtZ0.js";import{i as p,n as m,r as h,t as g}from"./create-runtime-stories-CbHiKinS.js";import{n as _,t as v}from"./Grid-CbFksUeV.js";import{n as y,t as b}from"./Slider-C3BZ3Oar.js";function x(e,t){o(t,!0);let n=s(.7),a=s(40),c=s(2500);var p=w(),m=f(p);C(m,{name:`Playground`,parameters:{docs:{description:{story:`The knob is a white bead lit from above with a small accent core, so it reads as "grab me" on
any backdrop. Hover grows it a touch; while dragging it swells and picks up a soft tint glow.`}},__svelteCsf:{rawCode:`<Slider {...args} />`}}});var h=i(m,2);C(h,{name:`Formatted values`,asChild:!0,children:(e,t)=>{v(e,{columns:3,min:`12rem`,gap:`lg`,children:(e,t)=>{var o=w(),s=f(o);b(s,{label:`Temperature`,min:0,max:2,step:.05,format:e=>e.toFixed(2),hint:`Higher is more creative, lower more focused.`,get value(){return r(n)},set value(e){l(n,e,!0)}});var u=i(s,2);b(u,{label:`Top-k`,min:1,max:100,get value(){return r(a)},set value(e){l(a,e,!0)}});var p=i(u,2);b(p,{label:`Budget`,min:0,max:1e4,step:100,format:e=>`${e.toLocaleString(`de-DE`)} €`,get value(){return r(c)},set value(e){l(c,e,!0)}}),d(e,o)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"`format` shapes the readout; `hint` is a grey help line under the track."}},__svelteCsf:{rawCode:`<Grid columns={3} min="12rem" gap="lg">
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
</Grid>`}}});var g=i(h,2);C(g,{name:`Disabled`,args:{label:`Brightness`,value:30,disabled:!0},parameters:{__svelteCsf:{rawCode:`<Slider {...args} />`}}}),d(e,p),u()}var S,C,w,T,E,D,O,k;function A(){return(A=e((()=>{n(),a(),p(),_(),y(),c(),m(),S={title:`Atoms/Slider`,component:b,tags:[`autodocs`],args:{label:`Volume`,value:60,min:0,max:100,step:1}},{Story:C}=h(S),w=t(`<!> <!> <!>`,1),x.__docgen={data:[],name:`Slider.stories.svelte`},T=g(x,S),E=[`Playground`,`FormattedValues`,`Disabled`],D={...T.Playground,tags:[`svelte-csf-v5`]},O={...T.FormattedValues,tags:[`svelte-csf-v5`]},k={...T.Disabled,tags:[`svelte-csf-v5`]}})))()}A();export{k as Disabled,O as FormattedValues,D as Playground,E as __namedExportsOrder,S as default};