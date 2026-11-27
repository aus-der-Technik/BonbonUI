import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Cn as t,Ct as n,Ft as r,Gt as i,Ht as a,Pt as o,_n as s,cn as c,l,on as u,wn as d,xt as f,zt as p}from"./iframe-D3QpTFc1.js";import{i as m,n as h,r as g,t as _}from"./create-runtime-stories-bgfxAijx.js";import{n as v,t as y}from"./Button-DO5WmEfH.js";import{n as b,t as x}from"./Layer-CRpvsKt9.js";import{n as S,t as C}from"./Row-B0vuEKpz.js";import{n as w,t as T}from"./Stepper-DMQhH830.js";function E(e,n){d(n,!0);let r=c(2);var o=A(),l=p(o);O(l,{name:`Horizontal`,parameters:{docs:{description:{story:`A checkout: done steps carry a check, the current one glows. Narrow it and it folds into a
column.`}},__svelteCsf:{rawCode:`<Stepper {...args} />`}}});var m=a(l,2);O(m,{name:`Vertical and clickable`,asChild:!0,children:(e,t)=>{x(e,{level:`panel`,style:`max-width:24rem`,children:(e,t)=>{var n=k(),o=p(n);T(o,{orientation:`vertical`,get current(){return i(r)},onselect:e=>u(r,e,!0),steps:[{label:`Create the workspace`,description:`Name and address`},{label:`Invite your team`,description:`4 of 6 accepted`},{label:`Create the first board`},{label:`Connect the calendar`}]});var c=a(o,2);C(c,{justify:`end`,children:(e,t)=>{var n=k(),o=p(n);{let e=s(()=>i(r)===0);y(o,{size:`sm`,label:`Back`,get disabled(){return i(e)},onclick:()=>u(r,i(r)-1)})}var c=a(o,2);{let e=s(()=>i(r)===4);y(c,{size:`sm`,variant:`primary`,label:`Next`,get disabled(){return i(e)},onclick:()=>u(r,i(r)+1)})}f(e,n)},$$slots:{default:!0}}),f(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Onboarding on a panel, vertical; finished steps are buttons to jump back.`}},__svelteCsf:{rawCode:`<Layer level="panel" style="max-width:24rem">
  <Stepper
    orientation="vertical"
    {current}
    onselect={(index) => (current = index)}
    steps={[
      { label: 'Create the workspace', description: 'Name and address' },
      { label: 'Invite your team', description: '4 of 6 accepted' },
      { label: 'Create the first board' },
      { label: 'Connect the calendar' },
    ]}
  />
  <Row justify="end">
    <Button size="sm" label="Back" disabled={current === 0} onclick={() => (current -= 1)} />
    <Button
      size="sm"
      variant="primary"
      label="Next"
      disabled={current === 4}
      onclick={() => (current += 1)}
    />
  </Row>
</Layer>`}}});var h=a(m,2);O(h,{name:`With an error`,args:{current:2,steps:[{label:`Upload`},{label:`Map columns`},{label:`Validate`,status:`error`,description:`12 rows need a date`},{label:`Import`}]},parameters:{docs:{description:{story:`A failed import step turns red.`}},__svelteCsf:{rawCode:`<Stepper {...args} />`}}}),f(e,o),t()}var D,O,k,A,j,M,N,P,F;function I(){return(I=e((()=>{r(),o(),m(),w(),v(),b(),S(),l(),h(),D={title:`Molecules/Stepper`,component:T,tags:[`autodocs`],args:{steps:[{label:`Cart`,description:`3 items`},{label:`Address`,description:`Where it goes`},{label:`Payment`,description:`Card or invoice`},{label:`Done`}],current:1,orientation:`horizontal`},argTypes:{orientation:{control:`inline-radio`,options:[`horizontal`,`vertical`]},current:{control:{type:`range`,min:0,max:4}}}},{Story:O}=g(D),k=n(`<!> <!>`,1),A=n(`<!> <!> <!>`,1),E.__docgen={data:[],name:`Stepper.stories.svelte`},j=_(E,D),M=[`Horizontal`,`VerticalAndClickable`,`WithAnError`],N={...j.Horizontal,tags:[`svelte-csf-v5`]},P={...j.VerticalAndClickable,tags:[`svelte-csf-v5`]},F={...j.WithAnError,tags:[`svelte-csf-v5`]}})))()}I();export{N as Horizontal,P as VerticalAndClickable,F as WithAnError,M as __namedExportsOrder,D as default};