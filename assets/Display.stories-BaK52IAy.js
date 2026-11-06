import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Mt as t,Qt as n,St as r,Wt as i,Yt as a,bt as o,en as s,fn as c,jn as l,l as u,on as ee,pn as te,qt as d,rt as ne,xt as re}from"./iframe-Dd9zCUtD.js";import{i as f,n as p,r as m,t as h}from"./create-runtime-stories-Bj9BSqmd.js";import{n as g,t as _}from"./Badge-JqdQHU5B.js";import{n as v,t as y}from"./Card-o6xHO1cU.js";import{n as b,t as x}from"./KpiTile-CeW4QdJs.js";import{n as S,t as ie}from"./Legend-DgNDfWr6.js";import{n as C,t as ae}from"./ChartTooltip-CV6tvGZ6.js";import{n as w,t as T}from"./Grid-3RFy1wlK.js";import{n as E,t as D}from"./Row--NLDOgtN.js";import{n as O,t as k}from"./ChoiceCard-Gf8QQ7Aw.js";import{n as A,t as j}from"./ToggleChip-BC-E4Lie.js";import{n as M,t as N}from"./DetailList-1Iuc_Z5N.js";import{n as P,t as F}from"./RatingDisplay-CLxyYCZG.js";function I(e,r){te(r,!0);let l=a({open:!0,packed:!0,shipped:!1,returned:!0}),u=s(!1),f=s(`team`);var p=H(),m=i(p);R(m,{name:`KpiTile`,parameters:{docs:{description:{story:`A summary number on glass: label and icon, the big tabular value, a trend pill and a detail
    line. A "+" delta is green, a "−" one red.`}},__svelteCsf:{rawCode:`<KpiTile {...args} />`}}});var h=d(m,2);R(h,{name:`KPI row`,asChild:!0,children:(e,t)=>{T(e,{min:`13rem`,children:(e,t)=>{var n=z(),r=i(n);x(r,{label:`Revenue`,value:`€48.2k`,delta:`+8.4 %`,detail:`this month`,icon:`credit-card`});var a=d(r,2);x(a,{label:`Orders`,value:`1,284`,delta:`+12 %`,detail:`vs. last week`,icon:`cart`});var s=d(a,2);x(s,{label:`Returns`,value:`37`,delta:`−5`,invert:!0,detail:`fewer than last week`,icon:`truck`});var c=d(s,2);x(c,{label:`Avg. reply time`,value:`2h 10m`,delta:`+18 %`,invert:!0,detail:`slower`,icon:`clock`}),o(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"A row of tiles in a Grid: as many columns as fit at 13rem, one on a phone. `invert` makes a\n    falling figure good (errors, wait times)."}},__svelteCsf:{rawCode:`<Grid min="13rem">
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
</Grid>`}}});var g=d(h,2);R(g,{name:`KpiTile with meter`,asChild:!0,children:(e,t)=>{T(e,{min:`16rem`,columns:2,children:(e,t)=>{var n=B(),r=i(n);x(r,{label:`Positive votes`,value:`78 %`,detail:`412 up · 116 down`,icon:`thumbs-up`,meter:[{value:412,color:`var(--up)`},{value:116,color:`var(--down)`}]});var a=d(r,2);x(a,{label:`Storage`,value:`64 GB`,detail:`of 100 GB`,icon:`database`,meter:[{value:38,color:`var(--color-blue)`},{value:18,color:`var(--color-purple)`},{value:8,color:`var(--color-orange)`},{value:36,color:`var(--fill-muted)`}]}),o(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A proportional meter under the value, e.g. a share of positive votes.`}},__svelteCsf:{rawCode:`<Grid min="16rem" columns={2}>
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
</Grid>`}}});var v=d(g,2);R(v,{name:`KpiTile empty`,args:{value:null,delta:void 0,detail:`No orders yet`},parameters:{docs:{description:{story:'`value={null}` is the "–" placeholder for "not loaded" or "no data".'}},__svelteCsf:{rawCode:`<KpiTile {...args} />`}}});var b=d(v,2);R(b,{name:`ToggleChip legend`,asChild:!0,children:(e,t)=>{D(e,{gap:`sm`,children:(e,t)=>{var n=z(),r=i(n);j(r,{label:`Open`,color:`var(--color-blue)`,count:12,get pressed(){return l.open},set pressed(e){l.open=e}});var a=d(r,2);j(a,{label:`Packed`,color:`var(--color-orange)`,count:3,get pressed(){return l.packed},set pressed(e){l.packed=e}});var s=d(a,2);j(s,{label:`Shipped`,color:`var(--color-green)`,count:48,get pressed(){return l.shipped},set pressed(e){l.shipped=e}});var c=d(s,2);j(c,{label:`Returned`,color:`var(--color-pink)`,count:2,get pressed(){return l.returned},set pressed(e){l.returned=e}}),o(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A legend that filters: one chip per category with its count; off chips dim.`}},__svelteCsf:{rawCode:`<Row gap="sm">
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
</Row>`}}});var S=d(b,2);R(S,{name:`ToggleChip small`,asChild:!0,children:(e,r)=>{D(e,{gap:`sm`,children:(e,r)=>{var a=B(),s=i(a);j(s,{size:`sm`,icon:`wrap`,label:`Wrap lines`,get pressed(){return t(u)},set pressed(e){n(u,e,!0)}});var c=d(s,2);j(c,{size:`sm`,icon:`filter`,label:`Only mine`,pressed:!0}),o(e,a)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A compact toolbar toggle: accent-tinted while on.`}},__svelteCsf:{rawCode:`<Row gap="sm">
  <ToggleChip size="sm" icon="wrap" label="Wrap lines" bind:pressed={wrap} />
  <ToggleChip size="sm" icon="filter" label="Only mine" pressed />
</Row>`}}});var C=d(S,2);R(C,{name:`Legend`,asChild:!0,children:(e,t)=>{ie(e,{items:[{label:`Online`,color:`var(--color-blue)`},{label:`In store`,color:`var(--color-green)`},{label:`Phone`,color:`var(--color-orange)`}]})},$$slots:{default:!0},parameters:{docs:{description:{story:`Colour keys for a chart.`}},__svelteCsf:{rawCode:`<Legend
  items={[
    { label: 'Online', color: 'var(--color-blue)' },
    { label: 'In store', color: 'var(--color-green)' },
    { label: 'Phone', color: 'var(--color-orange)' },
  ]}
/>`}}});var w=d(C,2);R(w,{name:`RatingDisplay`,asChild:!0,children:(e,t)=>{D(e,{gap:`lg`,children:(e,t)=>{var n=V(),r=i(n);F(r,{type:`thumbs`,value:`up`});var a=d(r,2);F(a,{type:`thumbs`,value:`down`});var s=d(a,2);F(s,{type:`stars`,value:4}),o(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A rating as shown in lists.`}},__svelteCsf:{rawCode:`<Row gap="lg">
  <RatingDisplay type="thumbs" value="up" />
  <RatingDisplay type="thumbs" value="down" />
  <RatingDisplay type="stars" value={4} />
</Row>`}}});var E=d(w,2);R(E,{name:`DetailList stacked`,asChild:!0,children:(e,t)=>{y(e,{surface:`subtle`,padding:`md`,children:(e,t)=>{N(e,{items:[{label:`Note`,value:`Customer asked for gift wrapping and a handwritten card.`},{label:`Delivery`,value:`Express, 1–2 working days`},{label:`Tracking page`,value:`https://shop.example.com/track/48213`,mono:!0},{label:`Order id`,value:`3f1c9a2e-8a1d-4f7b-9d3e-2b6c1e0a9f44`,mono:!0}]})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Caps labels over their values, e.g. a row's detail.`}},__svelteCsf:{rawCode:`<Card surface="subtle" padding="md">
  <DetailList
    items={[
      { label: 'Note', value: 'Customer asked for gift wrapping and a handwritten card.' },
      { label: 'Delivery', value: 'Express, 1–2 working days' },
      { label: 'Tracking page', value: 'https://shop.example.com/track/48213', mono: true },
      { label: 'Order id', value: '3f1c9a2e-8a1d-4f7b-9d3e-2b6c1e0a9f44', mono: true },
    ]}
  />
</Card>`}}});var O=d(E,2);R(O,{name:`DetailList in columns`,asChild:!0,children:(e,t)=>{y(e,{title:`Customer`,children:(e,t)=>{N(e,{columns:3,items:[{label:`Name`,value:`Jane Doe`},{label:`E-mail`,value:`jane.doe@example.com`},{label:`Member since`,value:`March 2024`},{label:`Orders`,value:`23`},{label:`Lifetime value`,value:`€1,940`},{label:`Segment`,value:`Regular`}]})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"`columns` flows the pairs into up to that many columns as room allows."}},__svelteCsf:{rawCode:`<Card title="Customer">
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
</Card>`}}});var A=d(O,2);R(A,{name:`DetailList grid`,asChild:!0,children:(e,t)=>{y(e,{padding:`sm`,children:(e,t)=>{N(e,{layout:`grid`,items:[{label:`Lat / Lon`,value:`51.3397, 12.3731`},{label:`Region`,value:`North district`},{label:`Population`,value:`612,400`}]})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Label and value side by side, as in a map popup.`}},__svelteCsf:{rawCode:`<Card padding="sm">
  <DetailList
    layout="grid"
    items={[
      { label: 'Lat / Lon', value: '51.3397, 12.3731' },
      { label: 'Region', value: 'North district' },
      { label: 'Population', value: '612,400' },
    ]}
  />
</Card>`}}});var M=d(A,2);R(M,{name:`ChoiceCard`,asChild:!0,children:(e,t)=>{T(e,{min:`18rem`,children:(e,t)=>{var n=V(),r=i(n);k(r,{icon:`database`,title:`Products`,meta:`catalog.products · 14 columns`,about:`Every product with prices, stock per store and the photos shown in the shop.`,badges:e=>{_(e,{tone:`live`,label:`Editable`})},$$slots:{badges:!0}});var a=d(r,2);k(a,{icon:`calendar`,title:`Campaigns 2026`,meta:`catalog.campaigns · 6 columns`,about:`Planned sales and their dates.`,badges:e=>{_(e,{tone:`draft`,label:`Draft`})},$$slots:{badges:!0}});var s=d(a,2);k(s,{icon:`users`,title:`Customers`,meta:`catalog.customers · 9 columns`,badges:e=>{_(e,{tone:`locked`,label:`Read-only`})},$$slots:{badges:!0}}),o(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Chooser tiles in a Grid. They lift on hover; the selected one becomes tinted glass.`}},__svelteCsf:{rawCode:`<Grid min="18rem">
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
</Grid>`}}});var P=d(M,2);R(P,{name:`ChoiceCard as plan picker`,asChild:!0,children:(e,r)=>{T(e,{min:`14rem`,columns:3,children:(e,r)=>{var a=re(),s=i(a);ne(s,17,()=>oe,e=>e.value,(e,r)=>{{let i=ee(()=>t(f)===t(r).value);k(e,{get icon(){return t(r).icon},get title(){return t(r).title},get about(){return t(r).about},get selected(){return t(i)},onclick:()=>n(f,t(r).value,!0)})}}),o(e,a)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"A one-of-n choice built from tiles: `selected` marks the chosen one (`aria-pressed`)."}},__svelteCsf:{rawCode:`<Grid min="14rem" columns={3}>
  {#each plans as option (option.value)}
    <ChoiceCard
      icon={option.icon}
      title={option.title}
      about={option.about}
      selected={plan === option.value}
      onclick={() => (plan = option.value)}
    />
  {/each}
</Grid>`}}});var I=d(P,2);R(I,{name:`ChartTooltip`,parameters:{docs:{story:{height:`9rem`},description:{story:`The card next to the pointer over a chart.`}},__svelteCsf:{rawCode:`<ChartTooltip
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
/>`}},asChild:!0,children:(e,t)=>{ae(e,{tooltip:{x:20,y:20,title:`Mon, 13 Oct 2026`,rows:[{label:`Online`,value:`214`,color:`var(--color-blue)`},{label:`In store`,value:`88`,color:`var(--color-green)`},{label:`Online share`,value:`71 %`}]}})},$$slots:{default:!0}}),o(e,p),c()}var oe,L,R,z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q,se,$,ce,le,ue,de;function fe(){return(fe=e((()=>{l(),f(),C(),O(),M(),b(),S(),P(),A(),g(),v(),w(),E(),u(),p(),oe=[{value:`solo`,title:`Solo`,icon:`user`,about:`One seat, all the basics.`},{value:`team`,title:`Team`,icon:`users`,about:`Up to 20 seats, shared spaces.`},{value:`company`,title:`Company`,icon:`globe`,about:`Unlimited seats and SSO.`}],L={title:`Molecules/Display`,component:x,tags:[`autodocs`],args:{label:`Orders`,value:`1,284`,delta:`+12 %`,detail:`vs. last week`,icon:`cart`}},{Story:R}=m(L),z=r(`<!> <!> <!> <!>`,1),B=r(`<!> <!>`,1),V=r(`<!> <!> <!>`,1),H=r(`<!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!>`,1),I.__docgen={data:[],name:`Display.stories.svelte`},U=h(I,L),W=[`KpiTile`,`KPIRow`,`KpiTileWithMeter`,`KpiTileEmpty`,`ToggleChipLegend`,`ToggleChipSmall`,`Legend`,`RatingDisplay`,`DetailListStacked`,`DetailListInColumns`,`DetailListGrid`,`ChoiceCard`,`ChoiceCardAsPlanPicker`,`ChartTooltip`],G={...U.KpiTile,tags:[`svelte-csf-v5`]},K={...U.KPIRow,tags:[`svelte-csf-v5`]},q={...U.KpiTileWithMeter,tags:[`svelte-csf-v5`]},J={...U.KpiTileEmpty,tags:[`svelte-csf-v5`]},Y={...U.ToggleChipLegend,tags:[`svelte-csf-v5`]},X={...U.ToggleChipSmall,tags:[`svelte-csf-v5`]},Z={...U.Legend,tags:[`svelte-csf-v5`]},Q={...U.RatingDisplay,tags:[`svelte-csf-v5`]},se={...U.DetailListStacked,tags:[`svelte-csf-v5`]},$={...U.DetailListInColumns,tags:[`svelte-csf-v5`]},ce={...U.DetailListGrid,tags:[`svelte-csf-v5`]},le={...U.ChoiceCard,tags:[`svelte-csf-v5`]},ue={...U.ChoiceCardAsPlanPicker,tags:[`svelte-csf-v5`]},de={...U.ChartTooltip,tags:[`svelte-csf-v5`]}})))()}fe();export{de as ChartTooltip,le as ChoiceCard,ue as ChoiceCardAsPlanPicker,ce as DetailListGrid,$ as DetailListInColumns,se as DetailListStacked,K as KPIRow,G as KpiTile,J as KpiTileEmpty,q as KpiTileWithMeter,Z as Legend,Q as RatingDisplay,Y as ToggleChipLegend,X as ToggleChipSmall,W as __namedExportsOrder,L as default};