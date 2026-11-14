import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Mt as t,Qt as n,St as r,Wt as i,bt as a,en as o,fn as s,jn as c,l,on as u,pn as d,qt as f}from"./iframe-CJu7z9ED.js";import{i as p,n as m,r as h,t as g}from"./create-runtime-stories-CaxQI1vi.js";import{n as _,t as v}from"./Button-B6mW7nXy.js";import{n as y,t as b}from"./Layer-BEIyap5c.js";import{n as x,t as S}from"./Row-BDnB4Tda.js";import{n as C,t as w}from"./Stepper-Cefj7UhU.js";function T(e,r){d(r,!0);let c=o(2);var l=k(),p=i(l);D(p,{name:`Horizontal`,parameters:{docs:{description:{story:`A checkout: done steps carry a check, the current one glows. Narrow it and it folds into a
column.`}},__svelteCsf:{rawCode:`<Stepper {...args} />`}}});var m=f(p,2);D(m,{name:`Vertical and clickable`,asChild:!0,children:(e,r)=>{b(e,{level:`panel`,style:`max-width:24rem`,children:(e,r)=>{var o=O(),s=i(o);w(s,{orientation:`vertical`,get current(){return t(c)},onselect:e=>n(c,e,!0),steps:[{label:`Create the workspace`,description:`Name and address`},{label:`Invite your team`,description:`4 of 6 accepted`},{label:`Create the first board`},{label:`Connect the calendar`}]});var l=f(s,2);S(l,{justify:`end`,children:(e,r)=>{var o=O(),s=i(o);{let e=u(()=>t(c)===0);v(s,{size:`sm`,label:`Back`,get disabled(){return t(e)},onclick:()=>n(c,t(c)-1)})}var l=f(s,2);{let e=u(()=>t(c)===4);v(l,{size:`sm`,variant:`primary`,label:`Next`,get disabled(){return t(e)},onclick:()=>n(c,t(c)+1)})}a(e,o)},$$slots:{default:!0}}),a(e,o)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Onboarding on a panel, vertical; finished steps are buttons to jump back.`}},__svelteCsf:{rawCode:`<Layer level="panel" style="max-width:24rem">
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
</Layer>`}}});var h=f(m,2);D(h,{name:`With an error`,args:{current:2,steps:[{label:`Upload`},{label:`Map columns`},{label:`Validate`,status:`error`,description:`12 rows need a date`},{label:`Import`}]},parameters:{docs:{description:{story:`A failed import step turns red.`}},__svelteCsf:{rawCode:`<Stepper {...args} />`}}}),a(e,l),s()}var E,D,O,k,A,j,M,N,P;function F(){return(F=e((()=>{c(),p(),C(),_(),y(),x(),l(),m(),E={title:`Molecules/Stepper`,component:w,tags:[`autodocs`],args:{steps:[{label:`Cart`,description:`3 items`},{label:`Address`,description:`Where it goes`},{label:`Payment`,description:`Card or invoice`},{label:`Done`}],current:1,orientation:`horizontal`},argTypes:{orientation:{control:`inline-radio`,options:[`horizontal`,`vertical`]},current:{control:{type:`range`,min:0,max:4}}}},{Story:D}=h(E),O=r(`<!> <!>`,1),k=r(`<!> <!> <!>`,1),T.__docgen={data:[],name:`Stepper.stories.svelte`},A=g(T,E),j=[`Horizontal`,`VerticalAndClickable`,`WithAnError`],M={...A.Horizontal,tags:[`svelte-csf-v5`]},N={...A.VerticalAndClickable,tags:[`svelte-csf-v5`]},P={...A.WithAnError,tags:[`svelte-csf-v5`]}})))()}F();export{M as Horizontal,N as VerticalAndClickable,P as WithAnError,j as __namedExportsOrder,E as default};