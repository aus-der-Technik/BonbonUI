import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Ct as t,Kt as n,Nn as r,Pt as i,Yt as a,en as o,hn as s,l as c,mn as l,nn as u,xt as d}from"./iframe-CRBWUEFv.js";import{i as f,n as p,r as m,t as h}from"./create-runtime-stories-DtoOt73Q.js";import{n as g,t as _}from"./Stack-DW7rWz1x.js";import{n as v,t as y}from"./Radio-Bnc8Leo8.js";function b(e,t){s(t,!0);let r=u(`standard`);var c=w(),f=n(c);S(f,{name:`Playground`,parameters:{docs:{description:{story:`Choosing an option fills the circle with the accent and pops the centre dot in with a small
spring. A circle on purpose: in the shape grammar circles mean state or identity.`}},__svelteCsf:{rawCode:`<Radio {...args} />`}}});var p=a(f,2);S(p,{name:`Group`,asChild:!0,children:(e,t)=>{_(e,{gap:`sm`,children:(e,t)=>{var s=C(),c=n(s);y(c,{name:`shipping`,value:`standard`,label:`Standard`,description:`3–5 working days · free`,get group(){return i(r)},set group(e){o(r,e,!0)}});var l=a(c,2);y(l,{name:`shipping`,value:`express`,label:`Express`,description:`Next working day · 9,90 €`,get group(){return i(r)},set group(e){o(r,e,!0)}});var u=a(l,2);y(u,{name:`shipping`,value:`pickup`,label:`Pick up in store`,description:`Not available for this order`,disabled:!0,get group(){return i(r)},set group(e){o(r,e,!0)}}),d(e,s)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"Bind every radio to the same value with `bind:group` (never `checked`). For a labelled group\nwith keyboard roving, use RadioGroup."}},__svelteCsf:{rawCode:`<Stack gap="sm">
  <Radio
    name="shipping"
    value="standard"
    label="Standard"
    description="3–5 working days · free"
    bind:group={shipping}
  />
  <Radio
    name="shipping"
    value="express"
    label="Express"
    description="Next working day · 9,90 €"
    bind:group={shipping}
  />
  <Radio
    name="shipping"
    value="pickup"
    label="Pick up in store"
    description="Not available for this order"
    disabled
    bind:group={shipping}
  />
</Stack>`}}}),d(e,c),l()}var x,S,C,w,T,E,D,O;function k(){return(k=e((()=>{r(),f(),g(),v(),c(),p(),x={title:`Atoms/Radio`,component:y,tags:[`autodocs`],args:{name:`demo`,value:`a`,label:`Standard delivery`,description:`3–5 working days`}},{Story:S}=m(x),C=t(`<!> <!> <!>`,1),w=t(`<!> <!>`,1),b.__docgen={data:[],name:`Radio.stories.svelte`},T=h(b,x),E=[`Playground`,`Group`],D={...T.Playground,tags:[`svelte-csf-v5`]},O={...T.Group,tags:[`svelte-csf-v5`]}})))()}k();export{O as Group,D as Playground,E as __namedExportsOrder,x as default};