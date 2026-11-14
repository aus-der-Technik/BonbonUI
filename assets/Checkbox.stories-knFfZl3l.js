import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Mt as t,Qt as n,St as r,Wt as i,Yt as a,bt as o,en as s,fn as c,jn as l,l as u,on as d,pn as f,qt as p,rt as m,xt as h}from"./iframe-CJu7z9ED.js";import{i as g,n as _,r as v,t as y}from"./create-runtime-stories-CaxQI1vi.js";import{n as b,t as x}from"./Checkbox-Dd_HA-Wq.js";import{n as S,t as C}from"./Stack-B6jNs1FV.js";import{n as w,t as T}from"./Row-BDnB4Tda.js";function E(e,r){f(r,!0);let l=s(a([{id:`a`,label:`Invoices`,checked:!0},{id:`b`,label:`Receipts`,checked:!1},{id:`c`,label:`Contracts`,checked:!0}])),u=d(()=>t(l).every(e=>e.checked)),g=d(()=>!t(u)&&t(l).some(e=>e.checked));var _=j(),v=i(_);O(v,{name:`Playground`,parameters:{docs:{description:{story:`Click it: the tick is drawn in like a pen stroke and the box settles with a tiny spring, so
the moment of "done" is felt, not just seen. Unchecking only fades — there is nothing to
celebrate. Pressing squishes the box like every other control you can act on.`}},__svelteCsf:{rawCode:`<Checkbox {...args} />`}}});var y=p(v,2);O(y,{name:`With description`,asChild:!0,children:(e,t)=>{C(e,{gap:`sm`,children:(e,t)=>{var n=k(),r=i(n);x(r,{label:`Send a copy to me`,description:`You get the same e-mail as the recipient.`,checked:!0});var a=p(r,2);x(a,{label:`Archive after sending`,description:`Moves the thread out of the inbox.`}),o(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A grey description under the label explains the consequence.`}},__svelteCsf:{rawCode:`<Stack gap="sm">
  <Checkbox
    label="Send a copy to me"
    description="You get the same e-mail as the recipient."
    checked
  />
  <Checkbox label="Archive after sending" description="Moves the thread out of the inbox." />
</Stack>`}}});var b=p(y,2);O(b,{name:`Select all`,asChild:!0,children:(e,r)=>{C(e,{gap:`xs`,children:(e,r)=>{var a=k(),s=i(a);x(s,{label:`All documents`,get checked(){return t(u)},get indeterminate(){return t(g)},onchange:e=>{let r=e.currentTarget.checked;n(l,t(l).map(e=>({...e,checked:r})),!0)}});var c=p(s,2);C(c,{gap:`xs`,padding:`none`,style:`padding-left: 1.6rem`,children:(e,n)=>{var r=h(),a=i(r);m(a,17,()=>t(l),e=>e.id,(e,n,r)=>{x(e,{get label(){return t(n).label},get checked(){return t(n).checked},set checked(e){t(n).checked=e}})}),o(e,r)},$$slots:{default:!0}}),o(e,a)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A "select all" box is indeterminate while only some are checked.`}},__svelteCsf:{rawCode:`<Stack gap="xs">
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
</Stack>`}}});var S=p(b,2);O(S,{name:`Tones and states`,asChild:!0,children:(e,t)=>{T(e,{gap:`lg`,children:(e,t)=>{var n=A(),r=i(n);x(r,{label:`Accent`,checked:!0});var a=p(r,2);x(a,{label:`Ready`,tone:`ok`,checked:!0});var s=p(a,2);x(s,{label:`Delete`,tone:`danger`,checked:!0});var c=p(s,2);x(c,{label:`Disabled`,disabled:!0});var l=p(c,2);x(l,{"aria-label":`Select row`,checked:!0}),o(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"`ok` for rows that are ready, `danger` for rows marked for deletion. Without a label it is a\nbare box — give it an `aria-label`."}},__svelteCsf:{rawCode:`<Row gap="lg">
  <Checkbox label="Accent" checked />
  <Checkbox label="Ready" tone="ok" checked />
  <Checkbox label="Delete" tone="danger" checked />
  <Checkbox label="Disabled" disabled />
  <Checkbox aria-label="Select row" checked />
</Row>`}}}),o(e,_),c()}var D,O,k,A,j,M,N,P,F,I,L;function R(){return(R=e((()=>{l(),g(),w(),S(),b(),u(),_(),D={title:`Atoms/Checkbox`,component:x,tags:[`autodocs`],args:{label:`Only with comments`,checked:!0,tone:`accent`},argTypes:{tone:{control:`inline-radio`,options:[`accent`,`ok`,`danger`]}}},{Story:O}=v(D),k=r(`<!> <!>`,1),A=r(`<!> <!> <!> <!> <!>`,1),j=r(`<!> <!> <!> <!>`,1),E.__docgen={data:[],name:`Checkbox.stories.svelte`},M=y(E,D),N=[`Playground`,`WithDescription`,`SelectAll`,`TonesAndStates`],P={...M.Playground,tags:[`svelte-csf-v5`]},F={...M.WithDescription,tags:[`svelte-csf-v5`]},I={...M.SelectAll,tags:[`svelte-csf-v5`]},L={...M.TonesAndStates,tags:[`svelte-csf-v5`]}})))()}R();export{P as Playground,I as SelectAll,L as TonesAndStates,F as WithDescription,N as __namedExportsOrder,D as default};