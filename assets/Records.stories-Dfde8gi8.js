import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Ct as t,Kt as n,Nn as r,Pt as i,Yt as a,Zt as o,en as s,hn as c,l,mn as u,nn as d,xt as f}from"./iframe-CjPY-Fqe.js";import{i as p,n as m,r as h,t as g}from"./create-runtime-stories-tZqyKHa4.js";import{n as _,t as v}from"./Badge-Bj9mzJQM.js";import{n as y,t as b}from"./Card-Cxj6EN6x.js";import{n as x,t as S}from"./Stack-BmjVbqUs.js";import{n as C,t as w}from"./TagList-HaqX8tNA.js";import{n as T,t as E}from"./StructTree-CTJONRna.js";import{n as D,t as O}from"./IdentityCell-BVe14twO.js";function k(e,t){c(t,!0);let r=d(`Bestsellers`),l=d(o({street:`12 Harbour Road`,city:`Riverside`,geo:{lat:51.3397,lon:12.3731},tags:[`warehouse`,`pick-up`],active:!0}));var p=P(),m=n(p);j(m,{name:`IdentityCell`,parameters:{docs:{description:{story:`Who a row is about: picture or initials, name and a muted line.`}},__svelteCsf:{rawCode:`<IdentityCell {...args} />`}}});var h=a(m,2);j(h,{name:`IdentityCell with badge`,asChild:!0,children:(e,t)=>{O(e,{name:`Alex Example`,subtitle:`Head of marketing`,badge:e=>{v(e,{size:`sm`,tone:`live`,label:`Team`})},$$slots:{badge:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A badge after the name.`}},__svelteCsf:{rawCode:`<IdentityCell name="Alex Example" subtitle="Head of marketing">
  {#snippet badge()}<Badge size="sm" tone="live" label="Team" />{/snippet}
</IdentityCell>`}}});var g=a(h,2);j(g,{name:`IdentityCell list`,asChild:!0,children:(e,t)=>{b(e,{children:(e,t)=>{S(e,{gap:`md`,children:(e,t)=>{var r=N(),i=n(r);O(i,{name:`Example Market Hall`,shape:`square`,clamp:!0,subtitle:`A covered market with forty stalls, a roastery and a rooftop terrace.`});var o=a(i,2);O(o,{name:`Corner Bakery`,shape:`square`,subtitle:`Bread, cakes and coffee`});var s=a(o,2);O(s,{name:`Riverside Books`,shape:`square`,subtitle:`Independent bookshop`}),f(e,r)},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A square logo with the subtitle clamped to one line, in a list.`}},__svelteCsf:{rawCode:`<Card>
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
</Card>`}}});var _=a(g,2);j(_,{name:`TagList`,asChild:!0,children:(e,t)=>{w(e,{get labels(){return M},max:3,active:e=>e===i(r),onclick:e=>s(r,e,!0),title:e=>`Filter by “${e}”`})},$$slots:{default:!0},parameters:{docs:{description:{story:'Keywords as tags: the first `max`, then "+n". Clicking filters; the active one is tinted\n    in the accent.'}},__svelteCsf:{rawCode:`<TagList
  labels={keywords}
  max={3}
  active={(label) => label === activeKeyword}
  onclick={(label) => (activeKeyword = label)}
  title={(label) => \`Filter by “\${label}”\`}
/>`}}});var y=a(_,2);j(y,{name:`StructTree`,asChild:!0,children:(e,t)=>{b(e,{children:(e,t)=>{E(e,{label:`Address`,get value(){return i(l)},editable:!0,expandDepth:2,onchange:e=>s(l,e,!0)})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A nested record edited in place: click a value, type, Enter saves, Escape cancels.`}},__svelteCsf:{rawCode:`<Card>
  <StructTree
    label="Address"
    value={address}
    editable
    expandDepth={2}
    onchange={(next) => (address = next)}
  />
</Card>`}}}),f(e,p),u()}var A,j,M,N,P,F,I,L,R,z,B,V;function H(){return(H=e((()=>{r(),p(),D(),T(),C(),_(),y(),x(),l(),m(),A={title:`Molecules/Records`,component:O,tags:[`autodocs`],args:{name:`Dr. Jane Doe`,initialsOf:`Jane Doe`,subtitle:`Project manager`}},{Story:j}=h(A),M=[`Sustainability`,`Gift ideas`,`Bestsellers`,`Accessibility`,`New in`],N=t(`<!> <!> <!>`,1),P=t(`<!> <!> <!> <!> <!>`,1),k.__docgen={data:[],name:`Records.stories.svelte`},F=g(k,A),I=[`IdentityCell`,`IdentityCellWithBadge`,`IdentityCellList`,`TagList`,`StructTree`],L={...F.IdentityCell,tags:[`svelte-csf-v5`]},R={...F.IdentityCellWithBadge,tags:[`svelte-csf-v5`]},z={...F.IdentityCellList,tags:[`svelte-csf-v5`]},B={...F.TagList,tags:[`svelte-csf-v5`]},V={...F.StructTree,tags:[`svelte-csf-v5`]}})))()}H();export{L as IdentityCell,z as IdentityCellList,R as IdentityCellWithBadge,V as StructTree,B as TagList,I as __namedExportsOrder,A as default};