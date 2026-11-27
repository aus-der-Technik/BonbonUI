import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Cn as t,Ct as n,Ft as r,Gt as i,Ht as a,Pt as o,cn as s,l as c,on as l,wn as u,xt as d,zt as f}from"./iframe-D3QpTFc1.js";import{i as p,n as m,r as h,t as g}from"./create-runtime-stories-bgfxAijx.js";import{n as _,t as v}from"./Stack-DIO0U5nL.js";import{n as y,t as b}from"./Radio-DF8zQX-o.js";function x(e,n){u(n,!0);let r=s(`standard`);var o=T(),c=f(o);C(c,{name:`Playground`,parameters:{docs:{description:{story:`Choosing an option fills the circle with the accent and pops the centre dot in with a small
spring. A circle on purpose: in the shape grammar circles mean state or identity.`}},__svelteCsf:{rawCode:`<Radio {...args} />`}}});var p=a(c,2);C(p,{name:`Group`,asChild:!0,children:(e,t)=>{v(e,{gap:`sm`,children:(e,t)=>{var n=w(),o=f(n);b(o,{name:`shipping`,value:`standard`,label:`Standard`,description:`3–5 working days · free`,get group(){return i(r)},set group(e){l(r,e,!0)}});var s=a(o,2);b(s,{name:`shipping`,value:`express`,label:`Express`,description:`Next working day · 9,90 €`,get group(){return i(r)},set group(e){l(r,e,!0)}});var c=a(s,2);b(c,{name:`shipping`,value:`pickup`,label:`Pick up in store`,description:`Not available for this order`,disabled:!0,get group(){return i(r)},set group(e){l(r,e,!0)}}),d(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"Bind every radio to the same value with `bind:group` (never `checked`). For a labelled group\nwith keyboard roving, use RadioGroup."}},__svelteCsf:{rawCode:`<Stack gap="sm">
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
</Stack>`}}}),d(e,o),t()}var S,C,w,T,E,D,O,k;function A(){return(A=e((()=>{r(),o(),p(),_(),y(),c(),m(),S={title:`Atoms/Radio`,component:b,tags:[`autodocs`],args:{name:`demo`,value:`a`,label:`Standard delivery`,description:`3–5 working days`}},{Story:C}=h(S),w=n(`<!> <!> <!>`,1),T=n(`<!> <!>`,1),x.__docgen={data:[],name:`Radio.stories.svelte`},E=g(x,S),D=[`Playground`,`Group`],O={...E.Playground,tags:[`svelte-csf-v5`]},k={...E.Group,tags:[`svelte-csf-v5`]}})))()}A();export{k as Group,O as Playground,D as __namedExportsOrder,S as default};