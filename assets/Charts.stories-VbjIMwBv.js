import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Mt as t,Qt as n,St as r,Wt as i,bt as a,en as o,fn as s,jn as c,l,on as u,pn as d,qt as f}from"./iframe-D4jyjLko.js";import{i as p,n as m,r as h,t as g}from"./create-runtime-stories-2Z8qmkK0.js";import{n as _,t as v}from"./SegmentedControl-CIY0d99q.js";import{n as y,t as b}from"./ChartCard-B7UzgNGp.js";import{i as x,o as S}from"./format-BmhxglcS.js";import{n as C,t as w}from"./DivergingBarChart-D7Bqu-vZ.js";import{n as T,t as E}from"./HorizontalBarChart-B0Kq1WZI.js";import{n as ee,t as D}from"./Grid-DomK7W-r.js";import{n as O,t as k}from"./LineChart-BsAvRpsX.js";import{_ as A,g as j,l as M,o as N,v as P}from"./mock-CoQSv9oT.js";import{n as F,t as I}from"./DashboardGrid-Cgy9ICeF.js";function L(e,r){d(r,!0);let c=o(`30d`);var l=G(),p=i(l);B(p,{name:`Dashboard row`,asChild:!0,children:(e,n)=>{I(e,{variant:`charts`,label:`Trends`,children:(e,n)=>{var r=U(),o=i(r);b(o,{title:`Votes per day`,sub:`Helpful above the line, not helpful below`,wide:!0,legend:[{label:`Helpful`,color:`var(--up)`},{label:`Not helpful`,color:`var(--down)`}],children:(e,n)=>{{let n=u(()=>P(R));w(e,{get data(){return t(n)},upLabel:`Helpful`,downLabel:`Not helpful`})}},$$slots:{default:!0}});var s=f(o,2);b(s,{title:`Average rating per day`,sub:`Days without ratings are skipped`,children:(e,n)=>{{let n=u(()=>A(R));k(e,{get data(){return t(n)},min:1,max:5,tickFormat:e=>`${e}★`,valueFormat:e=>`${x.format(e)} ★`,valueLabel:`Average`,countLabel:`Ratings`})}},$$slots:{default:!0}});var c=f(s,2);b(c,{title:`Rating distribution`,sub:`Selected time range`,children:(e,n)=>{{let n=u(j);E(e,{get data(){return t(n)},countLabel:`Ratings`})}},$$slots:{default:!0}}),a(e,r)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A dashboard trend row: 2 : 1.4 : 1, folding to two and then one column. The wide card spans
    the row once the grid folds. Axes and gridlines stay quiet; only the data carries colour, and
    it arrives once: bars grow out of their baseline, a line draws itself.`}},__svelteCsf:{rawCode:`<DashboardGrid variant="charts" label="Trends">
  <ChartCard
    title="Votes per day"
    sub="Helpful above the line, not helpful below"
    wide
    legend={[
      { label: 'Helpful', color: 'var(--up)' },
      { label: 'Not helpful', color: 'var(--down)' },
    ]}
  >
    <DivergingBarChart data={toDiverging(daily)} upLabel="Helpful" downLabel="Not helpful" />
  </ChartCard>
  <ChartCard title="Average rating per day" sub="Days without ratings are skipped">
    <LineChart
      data={toAverage(daily)}
      min={1}
      max={5}
      tickFormat={(v) => \`\${v}★\`}
      valueFormat={(v) => \`\${decimalFormat.format(v)} ★\`}
      valueLabel="Average"
      countLabel="Ratings"
    />
  </ChartCard>
  <ChartCard title="Rating distribution" sub="Selected time range">
    <HorizontalBarChart data={starDistribution()} countLabel="Ratings" />
  </ChartCard>
</DashboardGrid>`}}});var m=f(p,2);B(m,{name:`Headline figure and actions`,asChild:!0,children:(e,r)=>{b(e,{title:`Visits`,sub:`Unique visitors per day`,value:`27,940`,actions:e=>{v(e,{size:`sm`,label:`Range`,options:[{value:`7d`,label:`7 days`},{value:`30d`,label:`30 days`},{value:`90d`,label:`90 days`}],get value(){return t(c)},set value(e){n(c,e,!0)}})},children:(e,t)=>{k(e,{get data(){return V},min:0,max:1600,ticks:[0,400,800,1200,1600],color:`var(--accent)`,valueLabel:`Visitors`,height:240})},$$slots:{actions:!0,default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:'A headline `value` and `actions` in the head: here a range switch. The line follows the tint\n    with `color="var(--accent)"` — change the Tint in the toolbar.'}},__svelteCsf:{rawCode:`<ChartCard title="Visits" sub="Unique visitors per day" value="27,940">
  {#snippet actions()}
    <SegmentedControl
      size="sm"
      label="Range"
      options={[
        { value: '7d', label: '7 days' },
        { value: '30d', label: '30 days' },
        { value: '90d', label: '90 days' },
      ]}
      bind:value={range}
    />
  {/snippet}
  <LineChart
    data={visits}
    min={0}
    max={1600}
    ticks={[0, 400, 800, 1200, 1600]}
    color="var(--accent)"
    valueLabel="Visitors"
    height={240}
  />
</ChartCard>`}}});var h=f(m,2);B(h,{name:`Candy palette`,asChild:!0,children:(e,n)=>{D(e,{min:`20rem`,children:(e,n)=>{var r=W(),o=i(r);b(o,{title:`Traffic by channel`,sub:`Last 30 days`,children:(e,t)=>{E(e,{get data(){return H},countLabel:`Visits`})},$$slots:{default:!0}});var s=f(o,2);b(s,{title:`Conversion rate`,sub:`Share of visits with an order`,children:(e,n)=>{{let n=u(()=>V.map((e,t)=>({...e,value:2+Math.cos(t/4)*.8})));k(e,{get data(){return t(n)},min:0,max:4,tickFormat:e=>`${e} %`,valueFormat:e=>`${x.format(e)} %`,valueLabel:`Rate`,color:`var(--color-purple)`})}},$$slots:{default:!0}}),a(e,r)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Candy colours: each row of a bar chart can take a palette colour, and a line any token.`}},__svelteCsf:{rawCode:`<Grid min="20rem">
  <ChartCard title="Traffic by channel" sub="Last 30 days">
    <HorizontalBarChart data={channels} countLabel="Visits" />
  </ChartCard>
  <ChartCard title="Conversion rate" sub="Share of visits with an order">
    <LineChart
      data={visits.map((d, i) => ({ ...d, value: 2 + Math.cos(i / 4) * 0.8 }))}
      min={0}
      max={4}
      tickFormat={(v) => \`\${v} %\`}
      valueFormat={(v) => \`\${decimalFormat.format(v)} %\`}
      valueLabel="Rate"
      color="var(--color-purple)"
    />
  </ChartCard>
</Grid>`}}});var g=f(h,2);B(g,{name:`DivergingBarChart, 90 days`,asChild:!0,children:(e,n)=>{b(e,{title:`Votes per day`,sub:`Last 90 days`,children:(e,n)=>{{let n=u(()=>P(N(90,21)));w(e,{get data(){return t(n)},height:260})}},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`90 slots: bars get thinner, every few days carry a label.`}},__svelteCsf:{rawCode:`<ChartCard title="Votes per day" sub="Last 90 days">
  <DivergingBarChart data={toDiverging(dailyStats(90, 21))} height={260} />
</ChartCard>`}}});var _=f(g,2);B(_,{name:`Empty`,asChild:!0,children:(e,t)=>{I(e,{variant:`charts`,children:(e,t)=>{var n=U(),r=i(n);b(r,{title:`Votes per day`,children:(e,t)=>{w(e,{data:[],emptyText:`No votes in this range`})},$$slots:{default:!0}});var o=f(r,2);b(o,{title:`Average rating`,children:(e,t)=>{k(e,{data:[],emptyText:`No ratings in this range`})},$$slots:{default:!0}});var s=f(o,2);b(s,{title:`Distribution`,children:(e,t)=>{E(e,{data:[],emptyText:`No ratings in this range`})},$$slots:{default:!0}}),a(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"No data in the range: every chart says so in its own words (`emptyText`)."}},__svelteCsf:{rawCode:`<DashboardGrid variant="charts">
  <ChartCard title="Votes per day">
    <DivergingBarChart data={[]} emptyText="No votes in this range" />
  </ChartCard>
  <ChartCard title="Average rating">
    <LineChart data={[]} emptyText="No ratings in this range" />
  </ChartCard>
  <ChartCard title="Distribution">
    <HorizontalBarChart data={[]} emptyText="No ratings in this range" />
  </ChartCard>
</DashboardGrid>`}}}),a(e,l),s()}var R,z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q;function $(){return($=e((()=>{c(),p(),y(),C(),T(),O(),F(),ee(),_(),M(),S(),l(),m(),R=N(30),z={title:`Organisms/Charts`,component:b,tags:[`autodocs`],parameters:{layout:`padded`}},{Story:B}=h(z),V=Array.from({length:30},(e,t)=>({label:`${t+1}.`,title:`Day ${t+1}`,value:Math.round(820+Math.sin(t/3)*180+t*14)})),H=[{label:`Search`,value:412,color:`var(--color-blue)`},{label:`Direct`,value:268,color:`var(--color-purple)`},{label:`Social`,value:191,color:`var(--color-pink)`},{label:`E-mail`,value:104,color:`var(--color-orange)`},{label:`Ads`,value:66,color:`var(--color-teal)`}],U=r(`<!> <!> <!>`,1),W=r(`<!> <!>`,1),G=r(`<!> <!> <!> <!> <!>`,1),L.__docgen={data:[],name:`Charts.stories.svelte`},K=g(L,z),q=[`DashboardRow`,`HeadlineFigureAndActions`,`CandyPalette`,`DivergingBarChart90Days`,`Empty`],J={...K.DashboardRow,tags:[`svelte-csf-v5`]},Y={...K.HeadlineFigureAndActions,tags:[`svelte-csf-v5`]},X={...K.CandyPalette,tags:[`svelte-csf-v5`]},Z={...K.DivergingBarChart90Days,tags:[`svelte-csf-v5`]},Q={...K.Empty,tags:[`svelte-csf-v5`]}})))()}$();export{X as CandyPalette,J as DashboardRow,Z as DivergingBarChart90Days,Q as Empty,Y as HeadlineFigureAndActions,q as __namedExportsOrder,z as default};