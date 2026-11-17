import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Ct as t,Kt as n,Nn as r,Pt as i,St as a,Yt as o,Zt as s,cn as c,en as l,hn as ee,l as u,mn as te,nn as d,rt as ne,xt as f}from"./iframe-CjPY-Fqe.js";import{i as p,n as m,r as h,t as g}from"./create-runtime-stories-tZqyKHa4.js";import{n as _,t as v}from"./Badge-Bj9mzJQM.js";import{n as y,t as b}from"./Card-Cxj6EN6x.js";import{n as x,t as S}from"./KpiTile-BlrUSWrt.js";import{n as C,t as re}from"./Legend-Jj8laH4Y.js";import{n as w,t as ie}from"./ChartTooltip-ZOtDiMrG.js";import{n as T,t as E}from"./Grid-B_70npZ2.js";import{n as D,t as O}from"./Row-FH_DsT13.js";import{n as k,t as A}from"./ChoiceCard-COEysk6h.js";import{n as j,t as M}from"./ToggleChip-Du4YVAlT.js";import{n as N,t as P}from"./DetailList-BC1et07M.js";import{n as F,t as I}from"./RatingDisplay-CWQ9SrNs.js";function L(e,t){ee(t,!0);let r=s({open:!0,packed:!0,shipped:!1,returned:!0}),u=d(!1),p=d(`team`);var m=W(),h=n(m);B(h,{name:`KpiTile`,parameters:{docs:{description:{story:`A summary number on glass: label and icon, the big tabular value, a trend pill and a detail
    line. A "+" delta is green, a "−" one red.`}},__svelteCsf:{rawCode:`<KpiTile {...args} />`}}});var g=o(h,2);B(g,{name:`KPI row`,asChild:!0,children:(e,t)=>{E(e,{min:`13rem`,children:(e,t)=>{var r=V(),i=n(r);S(i,{label:`Revenue`,value:`€48.2k`,delta:`+8.4 %`,detail:`this month`,icon:`credit-card`});var a=o(i,2);S(a,{label:`Orders`,value:`1,284`,delta:`+12 %`,detail:`vs. last week`,icon:`cart`});var s=o(a,2);S(s,{label:`Returns`,value:`37`,delta:`−5`,invert:!0,detail:`fewer than last week`,icon:`truck`});var c=o(s,2);S(c,{label:`Avg. reply time`,value:`2h 10m`,delta:`+18 %`,invert:!0,detail:`slower`,icon:`clock`}),f(e,r)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"A row of tiles in a Grid: as many columns as fit at 13rem, one on a phone. `invert` makes a\n    falling figure good (errors, wait times)."}},__svelteCsf:{rawCode:`<Grid min="13rem">
  <KpiTile label="Revenue" value="€48.2k" delta="+8.4 %" detail="this month" icon="credit-card" />
  <KpiTile label="Orders" value="1,284" delta="+12 %" detail="vs. last week" icon="cart" />
  <KpiTile
    label="Returns"
    value="37"
    delta="−5"
    invert
    detail="fewer than last week"
    icon="truck"
  />
  <KpiTile
    label="Avg. reply time"
    value="2h 10m"
    delta="+18 %"
    invert
    detail="slower"
    icon="clock"
  />
</Grid>`}}});var _=o(g,2);B(_,{name:`KpiTile with meter`,asChild:!0,children:(e,t)=>{E(e,{min:`16rem`,columns:2,children:(e,t)=>{var r=H(),i=n(r);S(i,{label:`Positive votes`,value:`78 %`,detail:`412 up · 116 down`,icon:`thumbs-up`,meter:[{value:412,color:`var(--up)`},{value:116,color:`var(--down)`}]});var a=o(i,2);S(a,{label:`Storage`,value:`64 GB`,detail:`of 100 GB`,icon:`database`,meter:[{value:38,color:`var(--color-blue)`},{value:18,color:`var(--color-purple)`},{value:8,color:`var(--color-orange)`},{value:36,color:`var(--fill-muted)`}]}),f(e,r)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A proportional meter under the value, e.g. a share of positive votes.`}},__svelteCsf:{rawCode:`<Grid min="16rem" columns={2}>
  <KpiTile
    label="Positive votes"
    value="78 %"
    detail="412 up · 116 down"
    icon="thumbs-up"
    meter={[
      { value: 412, color: 'var(--up)' },
      { value: 116, color: 'var(--down)' },
    ]}
  />
  <KpiTile
    label="Storage"
    value="64 GB"
    detail="of 100 GB"
    icon="database"
    meter={[
      { value: 38, color: 'var(--color-blue)' },
      { value: 18, color: 'var(--color-purple)' },
      { value: 8, color: 'var(--color-orange)' },
      { value: 36, color: 'var(--fill-muted)' },
    ]}
  />
</Grid>`}}});var y=o(_,2);B(y,{name:`KpiTile empty`,args:{value:null,delta:void 0,detail:`No orders yet`},parameters:{docs:{description:{story:'`value={null}` is the "–" placeholder for "not loaded" or "no data".'}},__svelteCsf:{rawCode:`<KpiTile {...args} />`}}});var x=o(y,2);B(x,{name:`ToggleChip legend`,asChild:!0,children:(e,t)=>{O(e,{gap:`sm`,children:(e,t)=>{var i=V(),a=n(i);M(a,{label:`Open`,color:`var(--color-blue)`,count:12,get pressed(){return r.open},set pressed(e){r.open=e}});var s=o(a,2);M(s,{label:`Packed`,color:`var(--color-orange)`,count:3,get pressed(){return r.packed},set pressed(e){r.packed=e}});var c=o(s,2);M(c,{label:`Shipped`,color:`var(--color-green)`,count:48,get pressed(){return r.shipped},set pressed(e){r.shipped=e}});var l=o(c,2);M(l,{label:`Returned`,color:`var(--color-pink)`,count:2,get pressed(){return r.returned},set pressed(e){r.returned=e}}),f(e,i)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A legend that filters: one chip per category with its count; off chips dim.`}},__svelteCsf:{rawCode:`<Row gap="sm">
  <ToggleChip label="Open" color="var(--color-blue)" count={12} bind:pressed={visible.open} />
  <ToggleChip
    label="Packed"
    color="var(--color-orange)"
    count={3}
    bind:pressed={visible.packed}
  />
  <ToggleChip
    label="Shipped"
    color="var(--color-green)"
    count={48}
    bind:pressed={visible.shipped}
  />
  <ToggleChip
    label="Returned"
    color="var(--color-pink)"
    count={2}
    bind:pressed={visible.returned}
  />
</Row>`}}});var C=o(x,2);B(C,{name:`ToggleChip small`,asChild:!0,children:(e,t)=>{O(e,{gap:`sm`,children:(e,t)=>{var r=H(),a=n(r);M(a,{size:`sm`,icon:`wrap`,label:`Wrap lines`,get pressed(){return i(u)},set pressed(e){l(u,e,!0)}});var s=o(a,2);M(s,{size:`sm`,icon:`filter`,label:`Only mine`,pressed:!0}),f(e,r)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A compact toolbar toggle: accent-tinted while on.`}},__svelteCsf:{rawCode:`<Row gap="sm">
  <ToggleChip size="sm" icon="wrap" label="Wrap lines" bind:pressed={wrap} />
  <ToggleChip size="sm" icon="filter" label="Only mine" pressed />
</Row>`}}});var w=o(C,2);B(w,{name:`Legend`,asChild:!0,children:(e,t)=>{re(e,{items:[{label:`Online`,color:`var(--color-blue)`},{label:`In store`,color:`var(--color-green)`},{label:`Phone`,color:`var(--color-orange)`}]})},$$slots:{default:!0},parameters:{docs:{description:{story:`Colour keys for a chart.`}},__svelteCsf:{rawCode:`<Legend
  items={[
    { label: 'Online', color: 'var(--color-blue)' },
    { label: 'In store', color: 'var(--color-green)' },
    { label: 'Phone', color: 'var(--color-orange)' },
  ]}
/>`}}});var T=o(w,2);B(T,{name:`RatingDisplay`,asChild:!0,children:(e,t)=>{O(e,{gap:`lg`,children:(e,t)=>{var r=U(),i=n(r);I(i,{type:`thumbs`,value:`up`});var a=o(i,2);I(a,{type:`thumbs`,value:`down`});var s=o(a,2);I(s,{type:`stars`,value:4}),f(e,r)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A rating as shown in lists.`}},__svelteCsf:{rawCode:`<Row gap="lg">
  <RatingDisplay type="thumbs" value="up" />
  <RatingDisplay type="thumbs" value="down" />
  <RatingDisplay type="stars" value={4} />
</Row>`}}});var D=o(T,2);B(D,{name:`DetailList stacked`,asChild:!0,children:(e,t)=>{b(e,{surface:`subtle`,padding:`md`,children:(e,t)=>{P(e,{items:[{label:`Note`,value:`Customer asked for gift wrapping and a handwritten card.`},{label:`Delivery`,value:`Express, 1–2 working days`},{label:`Tracking page`,value:`https://shop.example.com/track/48213`,mono:!0},{label:`Order id`,value:`3f1c9a2e-8a1d-4f7b-9d3e-2b6c1e0a9f44`,mono:!0}]})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Caps labels over their values, e.g. a row's detail.`}},__svelteCsf:{rawCode:`<Card surface="subtle" padding="md">
  <DetailList
    items={[
      { label: 'Note', value: 'Customer asked for gift wrapping and a handwritten card.' },
      { label: 'Delivery', value: 'Express, 1–2 working days' },
      { label: 'Tracking page', value: 'https://shop.example.com/track/48213', mono: true },
      { label: 'Order id', value: '3f1c9a2e-8a1d-4f7b-9d3e-2b6c1e0a9f44', mono: true },
    ]}
  />
</Card>`}}});var k=o(D,2);B(k,{name:`DetailList in columns`,asChild:!0,children:(e,t)=>{b(e,{title:`Customer`,children:(e,t)=>{P(e,{columns:3,items:[{label:`Name`,value:`Jane Doe`},{label:`E-mail`,value:`jane.doe@example.com`},{label:`Member since`,value:`March 2024`},{label:`Orders`,value:`23`},{label:`Lifetime value`,value:`€1,940`},{label:`Segment`,value:`Regular`}]})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"`columns` flows the pairs into up to that many columns as room allows."}},__svelteCsf:{rawCode:`<Card title="Customer">
  <DetailList
    columns={3}
    items={[
      { label: 'Name', value: 'Jane Doe' },
      { label: 'E-mail', value: 'jane.doe@example.com' },
      { label: 'Member since', value: 'March 2024' },
      { label: 'Orders', value: '23' },
      { label: 'Lifetime value', value: '€1,940' },
      { label: 'Segment', value: 'Regular' },
    ]}
  />
</Card>`}}});var j=o(k,2);B(j,{name:`DetailList grid`,asChild:!0,children:(e,t)=>{b(e,{padding:`sm`,children:(e,t)=>{P(e,{layout:`grid`,items:[{label:`Lat / Lon`,value:`51.3397, 12.3731`},{label:`Region`,value:`North district`},{label:`Population`,value:`612,400`}]})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Label and value side by side, as in a map popup.`}},__svelteCsf:{rawCode:`<Card padding="sm">
  <DetailList
    layout="grid"
    items={[
      { label: 'Lat / Lon', value: '51.3397, 12.3731' },
      { label: 'Region', value: 'North district' },
      { label: 'Population', value: '612,400' },
    ]}
  />
</Card>`}}});var N=o(j,2);B(N,{name:`ChoiceCard`,asChild:!0,children:(e,t)=>{E(e,{min:`18rem`,children:(e,t)=>{var r=U(),i=n(r);A(i,{icon:`database`,title:`Products`,meta:`catalog.products · 14 columns`,about:`Every product with prices, stock per store and the photos shown in the shop.`,badges:e=>{v(e,{tone:`live`,label:`Editable`})},$$slots:{badges:!0}});var a=o(i,2);A(a,{icon:`calendar`,title:`Campaigns 2026`,meta:`catalog.campaigns · 6 columns`,about:`Planned sales and their dates.`,badges:e=>{v(e,{tone:`draft`,label:`Draft`})},$$slots:{badges:!0}});var s=o(a,2);A(s,{icon:`users`,title:`Customers`,meta:`catalog.customers · 9 columns`,badges:e=>{v(e,{tone:`locked`,label:`Read-only`})},$$slots:{badges:!0}}),f(e,r)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Chooser tiles in a Grid. They lift on hover; the selected one becomes tinted glass.`}},__svelteCsf:{rawCode:`<Grid min="18rem">
  <ChoiceCard
    icon="database"
    title="Products"
    meta="catalog.products · 14 columns"
    about="Every product with prices, stock per store and the photos shown in the shop."
  >
    {#snippet badges()}<Badge tone="live" label="Editable" />{/snippet}
  </ChoiceCard>
  <ChoiceCard
    icon="calendar"
    title="Campaigns 2026"
    meta="catalog.campaigns · 6 columns"
    about="Planned sales and their dates."
  >
    {#snippet badges()}<Badge tone="draft" label="Draft" />{/snippet}
  </ChoiceCard>
  <ChoiceCard icon="users" title="Customers" meta="catalog.customers · 9 columns">
    {#snippet badges()}<Badge tone="locked" label="Read-only" />{/snippet}
  </ChoiceCard>
</Grid>`}}});var F=o(N,2);B(F,{name:`ChoiceCard as plan picker`,asChild:!0,children:(e,t)=>{E(e,{min:`14rem`,columns:3,children:(e,t)=>{var r=a(),o=n(r);ne(o,17,()=>R,e=>e.value,(e,t)=>{{let n=c(()=>i(p)===i(t).value);A(e,{get icon(){return i(t).icon},get title(){return i(t).title},get about(){return i(t).about},get selected(){return i(n)},onclick:()=>l(p,i(t).value,!0)})}}),f(e,r)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"A one-of-n choice built from tiles: `selected` marks the chosen one (`aria-pressed`)."}},__svelteCsf:{rawCode:`<Grid min="14rem" columns={3}>
  {#each plans as option (option.value)}
    <ChoiceCard
      icon={option.icon}
      title={option.title}
      about={option.about}
      selected={plan === option.value}
      onclick={() => (plan = option.value)}
    />
  {/each}
</Grid>`}}});var L=o(F,2);B(L,{name:`ChartTooltip`,parameters:{docs:{story:{height:`9rem`},description:{story:`The card next to the pointer over a chart.`}},__svelteCsf:{rawCode:`<ChartTooltip
  tooltip={{
    x: 20,
    y: 20,
    title: 'Mon, 13 Oct 2026',
    rows: [
      { label: 'Online', value: '214', color: 'var(--color-blue)' },
      { label: 'In store', value: '88', color: 'var(--color-green)' },
      { label: 'Online share', value: '71 %' },
    ],
  }}
/>`}},asChild:!0,children:(e,t)=>{ie(e,{tooltip:{x:20,y:20,title:`Mon, 13 Oct 2026`,rows:[{label:`Online`,value:`214`,color:`var(--color-blue)`},{label:`In store`,value:`88`,color:`var(--color-green)`},{label:`Online share`,value:`71 %`}]}})},$$slots:{default:!0}}),f(e,m),te()}var R,z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q,$,ae,oe,se,ce,le,ue,de;function fe(){return(fe=e((()=>{r(),p(),w(),k(),N(),x(),C(),F(),j(),_(),y(),T(),D(),u(),m(),R=[{value:`solo`,title:`Solo`,icon:`user`,about:`One seat, all the basics.`},{value:`team`,title:`Team`,icon:`users`,about:`Up to 20 seats, shared spaces.`},{value:`company`,title:`Company`,icon:`globe`,about:`Unlimited seats and SSO.`}],z={title:`Molecules/Display`,component:S,tags:[`autodocs`],args:{label:`Orders`,value:`1,284`,delta:`+12 %`,detail:`vs. last week`,icon:`cart`}},{Story:B}=h(z),V=t(`<!> <!> <!> <!>`,1),H=t(`<!> <!>`,1),U=t(`<!> <!> <!>`,1),W=t(`<!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!>`,1),L.__docgen={data:[],name:`Display.stories.svelte`},G=g(L,z),K=[`KpiTile`,`KPIRow`,`KpiTileWithMeter`,`KpiTileEmpty`,`ToggleChipLegend`,`ToggleChipSmall`,`Legend`,`RatingDisplay`,`DetailListStacked`,`DetailListInColumns`,`DetailListGrid`,`ChoiceCard`,`ChoiceCardAsPlanPicker`,`ChartTooltip`],q={...G.KpiTile,tags:[`svelte-csf-v5`]},J={...G.KPIRow,tags:[`svelte-csf-v5`]},Y={...G.KpiTileWithMeter,tags:[`svelte-csf-v5`]},X={...G.KpiTileEmpty,tags:[`svelte-csf-v5`]},Z={...G.ToggleChipLegend,tags:[`svelte-csf-v5`]},Q={...G.ToggleChipSmall,tags:[`svelte-csf-v5`]},$={...G.Legend,tags:[`svelte-csf-v5`]},ae={...G.RatingDisplay,tags:[`svelte-csf-v5`]},oe={...G.DetailListStacked,tags:[`svelte-csf-v5`]},se={...G.DetailListInColumns,tags:[`svelte-csf-v5`]},ce={...G.DetailListGrid,tags:[`svelte-csf-v5`]},le={...G.ChoiceCard,tags:[`svelte-csf-v5`]},ue={...G.ChoiceCardAsPlanPicker,tags:[`svelte-csf-v5`]},de={...G.ChartTooltip,tags:[`svelte-csf-v5`]}})))()}fe();export{de as ChartTooltip,le as ChoiceCard,ue as ChoiceCardAsPlanPicker,ce as DetailListGrid,se as DetailListInColumns,oe as DetailListStacked,J as KPIRow,q as KpiTile,X as KpiTileEmpty,Y as KpiTileWithMeter,$ as Legend,ae as RatingDisplay,Z as ToggleChipLegend,Q as ToggleChipSmall,K as __namedExportsOrder,z as default};