import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{St as t,Wt as n,bt as r,fn as i,jn as a,l as o,m as s,pn as c,qt as l}from"./iframe-CJu7z9ED.js";import{a as u,i as d,n as f,r as p,t as m}from"./create-runtime-stories-CaxQI1vi.js";import{n as h,t as g}from"./Grid-BCXKdwv7.js";import{n as _,t as v}from"./Layer-BEIyap5c.js";import{n as y,t as b}from"./Stat-ZC7AXRLR.js";function x(e,t){c(t,!1),s();var a=T(),o=n(a);C(o,{name:`Playground`,parameters:{__svelteCsf:{rawCode:`<Stat {...args} />`}}});var u=l(o,2);C(u,{name:`KPI row`,asChild:!0,children:(e,t)=>{g(e,{min:`12rem`,gap:`lg`,children:(e,t)=>{var i=w(),a=n(i);b(a,{label:`Cards done`,value:128,delta:12.5,deltaLabel:`vs last week`,icon:`check-circle`,trend:[64,70,68,81,77,92,101,96,110,118,114,128]});var o=l(a,2);b(o,{label:`Overdue`,value:7,delta:-30,goodWhen:`down`,deltaLabel:`vs last week`,icon:`clock`,trend:[12,11,13,10,9,10,8,7]});var s=l(o,2);b(s,{label:`Cycle time`,value:`3.4`,unit:`days`,delta:4,goodWhen:`down`,deltaLabel:`vs last month`,icon:`activity`});var c=l(s,2);b(c,{label:`Active members`,value:42,deltaText:`+3 new`,deltaLabel:`this week`,icon:`users`}),r(e,i)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A KPI row on the ground layer: no cards, just figures in a Grid. Overdue cards going down is
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
</Grid>`}}});var d=l(u,2);C(d,{name:`Hero figure`,asChild:!0,children:(e,t)=>{v(e,{level:`panel`,padding:`lg`,style:`max-width:22rem`,children:(e,t)=>{b(e,{size:`lg`,align:`center`,label:`Boards shared`,value:1284,delta:18,deltaLabel:`this quarter`})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Big and centred inside a panel.`}},__svelteCsf:{rawCode:`<Layer level="panel" padding="lg" style="max-width:22rem">
  <Stat
    size="lg"
    align="center"
    label="Boards shared"
    value={1284}
    delta={18}
    deltaLabel="this quarter"
  />
</Layer>`}}}),r(e,a),i()}var S,C,w,T,E,D,O,k,A;function j(){return(j=e((()=>{a(),u(),d(),y(),h(),_(),o(),f(),S={title:`Molecules/Stat`,component:b,tags:[`autodocs`],args:{label:`Cards done`,value:128,delta:12.5,deltaLabel:`vs last week`,trend:[64,70,68,81,77,92,101,96,110,118,114,128]},argTypes:{size:{control:`inline-radio`,options:[`sm`,`md`,`lg`]},goodWhen:{control:`inline-radio`,options:[`up`,`down`,`none`]}}},{Story:C}=p(S),w=t(`<!> <!> <!> <!>`,1),T=t(`<!> <!> <!>`,1),x.__docgen={data:[],name:`Stat.stories.svelte`},E=m(x,S),D=[`Playground`,`KPIRow`,`HeroFigure`],O={...E.Playground,tags:[`svelte-csf-v5`]},k={...E.KPIRow,tags:[`svelte-csf-v5`]},A={...E.HeroFigure,tags:[`svelte-csf-v5`]}})))()}j();export{A as HeroFigure,k as KPIRow,O as Playground,D as __namedExportsOrder,S as default};