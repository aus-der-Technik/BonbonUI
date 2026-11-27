import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Cn as t,Ct as n,Ft as r,Gt as i,Ht as a,Pt as o,St as s,Wt as c,_n as l,cn as u,l as d,on as f,tt as p,wn as m,xt as h,zt as g}from"./iframe-D3QpTFc1.js";import{i as _,n as v,r as y,t as b}from"./create-runtime-stories-bgfxAijx.js";import{n as x,t as S}from"./Checkbox-BgIFRrR7.js";import{n as C,t as w}from"./Stack-DIO0U5nL.js";import{n as T,t as E}from"./Row-B0vuEKpz.js";function D(e,n){m(n,!0);let r=u(c([{id:`a`,label:`Invoices`,checked:!0},{id:`b`,label:`Receipts`,checked:!1},{id:`c`,label:`Contracts`,checked:!0}])),o=l(()=>i(r).every(e=>e.checked)),d=l(()=>!i(o)&&i(r).some(e=>e.checked));var _=M(),v=g(_);k(v,{name:`Playground`,parameters:{docs:{description:{story:`Click it: the tick is drawn in like a pen stroke and the box settles with a tiny spring, so
the moment of "done" is felt, not just seen. Unchecking only fades — there is nothing to
celebrate. Pressing squishes the box like every other control you can act on.`}},__svelteCsf:{rawCode:`<Checkbox {...args} />`}}});var y=a(v,2);k(y,{name:`With description`,asChild:!0,children:(e,t)=>{w(e,{gap:`sm`,children:(e,t)=>{var n=A(),r=g(n);S(r,{label:`Send a copy to me`,description:`You get the same e-mail as the recipient.`,checked:!0});var i=a(r,2);S(i,{label:`Archive after sending`,description:`Moves the thread out of the inbox.`}),h(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A grey description under the label explains the consequence.`}},__svelteCsf:{rawCode:`<Stack gap="sm">
  <Checkbox
    label="Send a copy to me"
    description="You get the same e-mail as the recipient."
    checked
  />
  <Checkbox label="Archive after sending" description="Moves the thread out of the inbox." />
</Stack>`}}});var b=a(y,2);k(b,{name:`Select all`,asChild:!0,children:(e,t)=>{w(e,{gap:`xs`,children:(e,t)=>{var n=A(),c=g(n);S(c,{label:`All documents`,get checked(){return i(o)},get indeterminate(){return i(d)},onchange:e=>{let t=e.currentTarget.checked;f(r,i(r).map(e=>({...e,checked:t})),!0)}});var l=a(c,2);w(l,{gap:`xs`,padding:`none`,style:`padding-left: 1.6rem`,children:(e,t)=>{var n=s(),a=g(n);p(a,17,()=>i(r),e=>e.id,(e,t,n)=>{S(e,{get label(){return i(t).label},get checked(){return i(t).checked},set checked(e){i(t).checked=e}})}),h(e,n)},$$slots:{default:!0}}),h(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A "select all" box is indeterminate while only some are checked.`}},__svelteCsf:{rawCode:`<Stack gap="xs">
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
</Stack>`}}});var x=a(b,2);k(x,{name:`Tones and states`,asChild:!0,children:(e,t)=>{E(e,{gap:`lg`,children:(e,t)=>{var n=j(),r=g(n);S(r,{label:`Accent`,checked:!0});var i=a(r,2);S(i,{label:`Ready`,tone:`ok`,checked:!0});var o=a(i,2);S(o,{label:`Delete`,tone:`danger`,checked:!0});var s=a(o,2);S(s,{label:`Disabled`,disabled:!0});var c=a(s,2);S(c,{"aria-label":`Select row`,checked:!0}),h(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"`ok` for rows that are ready, `danger` for rows marked for deletion. Without a label it is a\nbare box — give it an `aria-label`."}},__svelteCsf:{rawCode:`<Row gap="lg">
  <Checkbox label="Accent" checked />
  <Checkbox label="Ready" tone="ok" checked />
  <Checkbox label="Delete" tone="danger" checked />
  <Checkbox label="Disabled" disabled />
  <Checkbox aria-label="Select row" checked />
</Row>`}}}),h(e,_),t()}var O,k,A,j,M,N,P,F,I,L,R;function z(){return(z=e((()=>{r(),o(),_(),T(),C(),x(),d(),v(),O={title:`Atoms/Checkbox`,component:S,tags:[`autodocs`],args:{label:`Only with comments`,checked:!0,tone:`accent`},argTypes:{tone:{control:`inline-radio`,options:[`accent`,`ok`,`danger`]}}},{Story:k}=y(O),A=n(`<!> <!>`,1),j=n(`<!> <!> <!> <!> <!>`,1),M=n(`<!> <!> <!> <!>`,1),D.__docgen={data:[],name:`Checkbox.stories.svelte`},N=b(D,O),P=[`Playground`,`WithDescription`,`SelectAll`,`TonesAndStates`],F={...N.Playground,tags:[`svelte-csf-v5`]},I={...N.WithDescription,tags:[`svelte-csf-v5`]},L={...N.SelectAll,tags:[`svelte-csf-v5`]},R={...N.TonesAndStates,tags:[`svelte-csf-v5`]}})))()}z();export{F as Playground,L as SelectAll,R as TonesAndStates,I as WithDescription,P as __namedExportsOrder,O as default};