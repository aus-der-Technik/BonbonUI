import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Ct as t,Kt as n,Nn as r,Pt as i,St as a,Yt as o,Zt as s,cn as c,en as l,hn as u,l as d,mn as f,nn as p,rt as m,xt as h}from"./iframe-CRBWUEFv.js";import{i as g,n as _,r as v,t as y}from"./create-runtime-stories-DtoOt73Q.js";import{n as b,t as x}from"./Checkbox-wjNBhlok.js";import{n as S,t as C}from"./Stack-DW7rWz1x.js";import{n as w,t as T}from"./Row-VZCdMLbk.js";function E(e,t){u(t,!0);let r=p(s([{id:`a`,label:`Invoices`,checked:!0},{id:`b`,label:`Receipts`,checked:!1},{id:`c`,label:`Contracts`,checked:!0}])),d=c(()=>i(r).every(e=>e.checked)),g=c(()=>!i(d)&&i(r).some(e=>e.checked));var _=j(),v=n(_);O(v,{name:`Playground`,parameters:{docs:{description:{story:`Click it: the tick is drawn in like a pen stroke and the box settles with a tiny spring, so
the moment of "done" is felt, not just seen. Unchecking only fades — there is nothing to
celebrate. Pressing squishes the box like every other control you can act on.`}},__svelteCsf:{rawCode:`<Checkbox {...args} />`}}});var y=o(v,2);O(y,{name:`With description`,asChild:!0,children:(e,t)=>{C(e,{gap:`sm`,children:(e,t)=>{var r=k(),i=n(r);x(i,{label:`Send a copy to me`,description:`You get the same e-mail as the recipient.`,checked:!0});var a=o(i,2);x(a,{label:`Archive after sending`,description:`Moves the thread out of the inbox.`}),h(e,r)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A grey description under the label explains the consequence.`}},__svelteCsf:{rawCode:`<Stack gap="sm">
  <Checkbox
    label="Send a copy to me"
    description="You get the same e-mail as the recipient."
    checked
  />
  <Checkbox label="Archive after sending" description="Moves the thread out of the inbox." />
</Stack>`}}});var b=o(y,2);O(b,{name:`Select all`,asChild:!0,children:(e,t)=>{C(e,{gap:`xs`,children:(e,t)=>{var s=k(),c=n(s);x(c,{label:`All documents`,get checked(){return i(d)},get indeterminate(){return i(g)},onchange:e=>{let t=e.currentTarget.checked;l(r,i(r).map(e=>({...e,checked:t})),!0)}});var u=o(c,2);C(u,{gap:`xs`,padding:`none`,style:`padding-left: 1.6rem`,children:(e,t)=>{var o=a(),s=n(o);m(s,17,()=>i(r),e=>e.id,(e,t,n)=>{x(e,{get label(){return i(t).label},get checked(){return i(t).checked},set checked(e){i(t).checked=e}})}),h(e,o)},$$slots:{default:!0}}),h(e,s)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A "select all" box is indeterminate while only some are checked.`}},__svelteCsf:{rawCode:`<Stack gap="xs">
  <Checkbox
    label="All documents"
    checked={all}
    indeterminate={some}
    onchange={(e) => {
      const on = e.currentTarget.checked;
      items = items.map((i) => ({ ...i, checked: on }));
    }}
  />
  <Stack gap="xs" padding="none" style="padding-left: 1.6rem">
    {#each items as item (item.id)}
      <Checkbox label={item.label} bind:checked={item.checked} />
    {/each}
  </Stack>
</Stack>`}}});var S=o(b,2);O(S,{name:`Tones and states`,asChild:!0,children:(e,t)=>{T(e,{gap:`lg`,children:(e,t)=>{var r=A(),i=n(r);x(i,{label:`Accent`,checked:!0});var a=o(i,2);x(a,{label:`Ready`,tone:`ok`,checked:!0});var s=o(a,2);x(s,{label:`Delete`,tone:`danger`,checked:!0});var c=o(s,2);x(c,{label:`Disabled`,disabled:!0});var l=o(c,2);x(l,{"aria-label":`Select row`,checked:!0}),h(e,r)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"`ok` for rows that are ready, `danger` for rows marked for deletion. Without a label it is a\nbare box — give it an `aria-label`."}},__svelteCsf:{rawCode:`<Row gap="lg">
  <Checkbox label="Accent" checked />
  <Checkbox label="Ready" tone="ok" checked />
  <Checkbox label="Delete" tone="danger" checked />
  <Checkbox label="Disabled" disabled />
  <Checkbox aria-label="Select row" checked />
</Row>`}}}),h(e,_),f()}var D,O,k,A,j,M,N,P,F,I,L;function R(){return(R=e((()=>{r(),g(),w(),S(),b(),d(),_(),D={title:`Atoms/Checkbox`,component:x,tags:[`autodocs`],args:{label:`Only with comments`,checked:!0,tone:`accent`},argTypes:{tone:{control:`inline-radio`,options:[`accent`,`ok`,`danger`]}}},{Story:O}=v(D),k=t(`<!> <!>`,1),A=t(`<!> <!> <!> <!> <!>`,1),j=t(`<!> <!> <!> <!>`,1),E.__docgen={data:[],name:`Checkbox.stories.svelte`},M=y(E,D),N=[`Playground`,`WithDescription`,`SelectAll`,`TonesAndStates`],P={...M.Playground,tags:[`svelte-csf-v5`]},F={...M.WithDescription,tags:[`svelte-csf-v5`]},I={...M.SelectAll,tags:[`svelte-csf-v5`]},L={...M.TonesAndStates,tags:[`svelte-csf-v5`]}})))()}R();export{P as Playground,I as SelectAll,L as TonesAndStates,F as WithDescription,N as __namedExportsOrder,D as default};