import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Cn as t,Ct as n,Ft as r,Ht as i,Pt as a,l as o,m as s,wn as c,xt as l,zt as u}from"./iframe-D3QpTFc1.js";import{a as d,i as f,n as p,r as m,t as h}from"./create-runtime-stories-bgfxAijx.js";import{n as g,t as _}from"./Grid-CRR54iID.js";import{n as v,t as y}from"./Layer-CRpvsKt9.js";import{n as b,t as x}from"./Stat-D3IsY8lB.js";function S(e,n){c(n,!1),s();var r=E(),a=u(r);w(a,{name:`Playground`,parameters:{__svelteCsf:{rawCode:`<Stat {...args} />`}}});var o=i(a,2);w(o,{name:`KPI row`,asChild:!0,children:(e,t)=>{_(e,{min:`12rem`,gap:`lg`,children:(e,t)=>{var n=T(),r=u(n);x(r,{label:`Cards done`,value:128,delta:12.5,deltaLabel:`vs last week`,icon:`check-circle`,trend:[64,70,68,81,77,92,101,96,110,118,114,128]});var a=i(r,2);x(a,{label:`Overdue`,value:7,delta:-30,goodWhen:`down`,deltaLabel:`vs last week`,icon:`clock`,trend:[12,11,13,10,9,10,8,7]});var o=i(a,2);x(o,{label:`Cycle time`,value:`3.4`,unit:`days`,delta:4,goodWhen:`down`,deltaLabel:`vs last month`,icon:`activity`});var s=i(o,2);x(s,{label:`Active members`,value:42,deltaText:`+3 new`,deltaLabel:`this week`,icon:`users`}),l(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A KPI row on the ground layer: no cards, just figures in a Grid. Overdue cards going down is
good news, so it is green.`}},__svelteCsf:{rawCode:`<Grid min="12rem" gap="lg">
  <Stat
    label="Cards done"
    value={128}
    delta={12.5}
    deltaLabel="vs last week"
    icon="check-circle"
    trend={[64, 70, 68, 81, 77, 92, 101, 96, 110, 118, 114, 128]}
  />
  <Stat
    label="Overdue"
    value={7}
    delta={-30}
    goodWhen="down"
    deltaLabel="vs last week"
    icon="clock"
    trend={[12, 11, 13, 10, 9, 10, 8, 7]}
  />
  <Stat
    label="Cycle time"
    value="3.4"
    unit="days"
    delta={4}
    goodWhen="down"
    deltaLabel="vs last month"
    icon="activity"
  />
  <Stat
    label="Active members"
    value={42}
    deltaText="+3 new"
    deltaLabel="this week"
    icon="users"
  />
</Grid>`}}});var d=i(o,2);w(d,{name:`Hero figure`,asChild:!0,children:(e,t)=>{y(e,{level:`panel`,padding:`lg`,style:`max-width:22rem`,children:(e,t)=>{x(e,{size:`lg`,align:`center`,label:`Boards shared`,value:1284,delta:18,deltaLabel:`this quarter`})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Big and centred inside a panel.`}},__svelteCsf:{rawCode:`<Layer level="panel" padding="lg" style="max-width:22rem">
  <Stat
    size="lg"
    align="center"
    label="Boards shared"
    value={1284}
    delta={18}
    deltaLabel="this quarter"
  />
</Layer>`}}}),l(e,r),t()}var C,w,T,E,D,O,k,A,j;function M(){return(M=e((()=>{r(),a(),d(),f(),b(),g(),v(),o(),p(),C={title:`Molecules/Stat`,component:x,tags:[`autodocs`],args:{label:`Cards done`,value:128,delta:12.5,deltaLabel:`vs last week`,trend:[64,70,68,81,77,92,101,96,110,118,114,128]},argTypes:{size:{control:`inline-radio`,options:[`sm`,`md`,`lg`]},goodWhen:{control:`inline-radio`,options:[`up`,`down`,`none`]}}},{Story:w}=m(C),T=n(`<!> <!> <!> <!>`,1),E=n(`<!> <!> <!>`,1),S.__docgen={data:[],name:`Stat.stories.svelte`},D=h(S,C),O=[`Playground`,`KPIRow`,`HeroFigure`],k={...D.Playground,tags:[`svelte-csf-v5`]},A={...D.KPIRow,tags:[`svelte-csf-v5`]},j={...D.HeroFigure,tags:[`svelte-csf-v5`]}})))()}M();export{j as HeroFigure,A as KPIRow,k as Playground,O as __namedExportsOrder,C as default};