import{n as e}from"./rolldown-runtime-Dxh6kD9_.js";import{Ct as t,Ft as n,Gt as r,Ht as i,Pt as a,Sn as o,Wt as s,cn as c,l,on as u,xn as d,xt as f,zt as p}from"./iframe-WlNMZtZ0.js";import{i as m,n as h,r as g,t as _}from"./create-runtime-stories-CbHiKinS.js";import{n as v,t as y}from"./Badge-Dh8o68Ot.js";import{n as b,t as x}from"./Card-BqZAAHlF.js";import{n as S,t as C}from"./Stack-BjV-rmuj.js";import{n as w,t as T}from"./TagList-BgbGac3e.js";import{n as E,t as D}from"./StructTree-CrLtnOuS.js";import{n as O,t as k}from"./IdentityCell-B8s71_zw.js";function A(e,t){o(t,!0);let n=c(`Bestsellers`),a=c(s({street:`12 Harbour Road`,city:`Riverside`,geo:{lat:51.3397,lon:12.3731},tags:[`warehouse`,`pick-up`],active:!0}));var l=F(),m=p(l);M(m,{name:`IdentityCell`,parameters:{docs:{description:{story:`Who a row is about: picture or initials, name and a muted line.`}},__svelteCsf:{rawCode:`<IdentityCell {...args} />`}}});var h=i(m,2);M(h,{name:`IdentityCell with badge`,asChild:!0,children:(e,t)=>{k(e,{name:`Alex Example`,subtitle:`Head of marketing`,badge:e=>{y(e,{size:`sm`,tone:`live`,label:`Team`})},$$slots:{badge:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A badge after the name.`}},__svelteCsf:{rawCode:`<IdentityCell name="Alex Example" subtitle="Head of marketing">
  {#snippet badge()}<Badge size="sm" tone="live" label="Team" />{/snippet}
</IdentityCell>`}}});var g=i(h,2);M(g,{name:`IdentityCell list`,asChild:!0,children:(e,t)=>{x(e,{children:(e,t)=>{C(e,{gap:`md`,children:(e,t)=>{var n=P(),r=p(n);k(r,{name:`Example Market Hall`,shape:`square`,clamp:!0,subtitle:`A covered market with forty stalls, a roastery and a rooftop terrace.`});var a=i(r,2);k(a,{name:`Corner Bakery`,shape:`square`,subtitle:`Bread, cakes and coffee`});var o=i(a,2);k(o,{name:`Riverside Books`,shape:`square`,subtitle:`Independent bookshop`}),f(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A square logo with the subtitle clamped to one line, in a list.`}},__svelteCsf:{rawCode:`<Card>
  <Stack gap="md">
    <IdentityCell
      name="Example Market Hall"
      shape="square"
      clamp
      subtitle="A covered market with forty stalls, a roastery and a rooftop terrace."
    />
    <IdentityCell name="Corner Bakery" shape="square" subtitle="Bread, cakes and coffee" />
    <IdentityCell name="Riverside Books" shape="square" subtitle="Independent bookshop" />
  </Stack>
</Card>`}}});var _=i(g,2);M(_,{name:`TagList`,asChild:!0,children:(e,t)=>{T(e,{get labels(){return N},max:3,active:e=>e===r(n),onclick:e=>u(n,e,!0),title:e=>`Filter by “${e}”`})},$$slots:{default:!0},parameters:{docs:{description:{story:'Keywords as tags: the first `max`, then "+n". Clicking filters; the active one is tinted\n    in the accent.'}},__svelteCsf:{rawCode:`<TagList
  labels={keywords}
  max={3}
  active={(label) => label === activeKeyword}
  onclick={(label) => (activeKeyword = label)}
  title={(label) => \`Filter by “\${label}”\`}
/>`}}});var v=i(_,2);M(v,{name:`StructTree`,asChild:!0,children:(e,t)=>{x(e,{children:(e,t)=>{D(e,{label:`Address`,get value(){return r(a)},editable:!0,expandDepth:2,onchange:e=>u(a,e,!0)})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A nested record edited in place: click a value, type, Enter saves, Escape cancels.`}},__svelteCsf:{rawCode:`<Card>
  <StructTree
    label="Address"
    value={address}
    editable
    expandDepth={2}
    onchange={(next) => (address = next)}
  />
</Card>`}}}),f(e,l),d()}var j,M,N,P,F,I,L,R,z,B,V,H;function U(){return(U=e((()=>{n(),a(),m(),O(),E(),w(),v(),b(),S(),l(),h(),j={title:`Molecules/Records`,component:k,tags:[`autodocs`],args:{name:`Dr. Jane Doe`,initialsOf:`Jane Doe`,subtitle:`Project manager`}},{Story:M}=g(j),N=[`Sustainability`,`Gift ideas`,`Bestsellers`,`Accessibility`,`New in`],P=t(`<!> <!> <!>`,1),F=t(`<!> <!> <!> <!> <!>`,1),A.__docgen={data:[],name:`Records.stories.svelte`},I=_(A,j),L=[`IdentityCell`,`IdentityCellWithBadge`,`IdentityCellList`,`TagList`,`StructTree`],R={...I.IdentityCell,tags:[`svelte-csf-v5`]},z={...I.IdentityCellWithBadge,tags:[`svelte-csf-v5`]},B={...I.IdentityCellList,tags:[`svelte-csf-v5`]},V={...I.TagList,tags:[`svelte-csf-v5`]},H={...I.StructTree,tags:[`svelte-csf-v5`]}})))()}U();export{R as IdentityCell,B as IdentityCellList,z as IdentityCellWithBadge,H as StructTree,V as TagList,L as __namedExportsOrder,j as default};