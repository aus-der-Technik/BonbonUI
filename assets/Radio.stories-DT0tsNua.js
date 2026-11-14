import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Mt as t,Qt as n,St as r,Wt as i,bt as a,en as o,fn as s,jn as c,l,pn as u,qt as d}from"./iframe-D4jyjLko.js";import{i as f,n as p,r as m,t as h}from"./create-runtime-stories-2Z8qmkK0.js";import{n as g,t as _}from"./Stack-CwOhDw0w.js";import{n as v,t as y}from"./Radio-DXJDdluD.js";function b(e,r){u(r,!0);let c=o(`standard`);var l=w(),f=i(l);S(f,{name:`Playground`,parameters:{docs:{description:{story:`Choosing an option fills the circle with the accent and pops the centre dot in with a small
spring. A circle on purpose: in the shape grammar circles mean state or identity.`}},__svelteCsf:{rawCode:`<Radio {...args} />`}}});var p=d(f,2);S(p,{name:`Group`,asChild:!0,children:(e,r)=>{_(e,{gap:`sm`,children:(e,r)=>{var o=C(),s=i(o);y(s,{name:`shipping`,value:`standard`,label:`Standard`,description:`3–5 working days · free`,get group(){return t(c)},set group(e){n(c,e,!0)}});var l=d(s,2);y(l,{name:`shipping`,value:`express`,label:`Express`,description:`Next working day · 9,90 €`,get group(){return t(c)},set group(e){n(c,e,!0)}});var u=d(l,2);y(u,{name:`shipping`,value:`pickup`,label:`Pick up in store`,description:`Not available for this order`,disabled:!0,get group(){return t(c)},set group(e){n(c,e,!0)}}),a(e,o)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"Bind every radio to the same value with `bind:group` (never `checked`). For a labelled group\nwith keyboard roving, use RadioGroup."}},__svelteCsf:{rawCode:`<Stack gap="sm">
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
</Stack>`}}}),a(e,l),s()}var x,S,C,w,T,E,D,O;function k(){return(k=e((()=>{c(),f(),g(),v(),l(),p(),x={title:`Atoms/Radio`,component:y,tags:[`autodocs`],args:{name:`demo`,value:`a`,label:`Standard delivery`,description:`3–5 working days`}},{Story:S}=m(x),C=r(`<!> <!> <!>`,1),w=r(`<!> <!>`,1),b.__docgen={data:[],name:`Radio.stories.svelte`},T=h(b,x),E=[`Playground`,`Group`],D={...T.Playground,tags:[`svelte-csf-v5`]},O={...T.Group,tags:[`svelte-csf-v5`]}})))()}k();export{O as Group,D as Playground,E as __namedExportsOrder,x as default};