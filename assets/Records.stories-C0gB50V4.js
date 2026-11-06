import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Mt as t,Qt as n,St as r,Wt as i,Yt as a,bt as o,en as s,fn as c,jn as l,l as u,pn as d,qt as f}from"./iframe-Dd9zCUtD.js";import{i as p,n as m,r as h,t as g}from"./create-runtime-stories-Bj9BSqmd.js";import{n as _,t as v}from"./Badge-JqdQHU5B.js";import{n as y,t as b}from"./Card-o6xHO1cU.js";import{n as x,t as S}from"./Stack-B3I2k7mw.js";import{n as C,t as w}from"./TagList-Crxtds9t.js";import{n as T,t as E}from"./StructTree-C8weokg_.js";import{n as D,t as O}from"./IdentityCell-DmWypDfz.js";function k(e,r){d(r,!0);let l=s(`Bestsellers`),u=s(a({street:`12 Harbour Road`,city:`Riverside`,geo:{lat:51.3397,lon:12.3731},tags:[`warehouse`,`pick-up`],active:!0}));var p=P(),m=i(p);j(m,{name:`IdentityCell`,parameters:{docs:{description:{story:`Who a row is about: picture or initials, name and a muted line.`}},__svelteCsf:{rawCode:`<IdentityCell {...args} />`}}});var h=f(m,2);j(h,{name:`IdentityCell with badge`,asChild:!0,children:(e,t)=>{O(e,{name:`Alex Example`,subtitle:`Head of marketing`,badge:e=>{v(e,{size:`sm`,tone:`live`,label:`Team`})},$$slots:{badge:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A badge after the name.`}},__svelteCsf:{rawCode:`<IdentityCell name="Alex Example" subtitle="Head of marketing">
  {#snippet badge()}<Badge size="sm" tone="live" label="Team" />{/snippet}
</IdentityCell>`}}});var g=f(h,2);j(g,{name:`IdentityCell list`,asChild:!0,children:(e,t)=>{b(e,{children:(e,t)=>{S(e,{gap:`md`,children:(e,t)=>{var n=N(),r=i(n);O(r,{name:`Example Market Hall`,shape:`square`,clamp:!0,subtitle:`A covered market with forty stalls, a roastery and a rooftop terrace.`});var a=f(r,2);O(a,{name:`Corner Bakery`,shape:`square`,subtitle:`Bread, cakes and coffee`});var s=f(a,2);O(s,{name:`Riverside Books`,shape:`square`,subtitle:`Independent bookshop`}),o(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A square logo with the subtitle clamped to one line, in a list.`}},__svelteCsf:{rawCode:`<Card>
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
</Card>`}}});var _=f(g,2);j(_,{name:`TagList`,asChild:!0,children:(e,r)=>{w(e,{get labels(){return M},max:3,active:e=>e===t(l),onclick:e=>n(l,e,!0),title:e=>`Filter by “${e}”`})},$$slots:{default:!0},parameters:{docs:{description:{story:'Keywords as tags: the first `max`, then "+n". Clicking filters; the active one is tinted\n    in the accent.'}},__svelteCsf:{rawCode:`<TagList
  labels={keywords}
  max={3}
  active={(label) => label === activeKeyword}
  onclick={(label) => (activeKeyword = label)}
  title={(label) => \`Filter by “\${label}”\`}
/>`}}});var y=f(_,2);j(y,{name:`StructTree`,asChild:!0,children:(e,r)=>{b(e,{children:(e,r)=>{E(e,{label:`Address`,get value(){return t(u)},editable:!0,expandDepth:2,onchange:e=>n(u,e,!0)})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A nested record edited in place: click a value, type, Enter saves, Escape cancels.`}},__svelteCsf:{rawCode:`<Card>
  <StructTree
    label="Address"
    value={address}
    editable
    expandDepth={2}
    onchange={(next) => (address = next)}
  />
</Card>`}}}),o(e,p),c()}var A,j,M,N,P,F,I,L,R,z,B,V;function H(){return(H=e((()=>{l(),p(),D(),T(),C(),_(),y(),x(),u(),m(),A={title:`Molecules/Records`,component:O,tags:[`autodocs`],args:{name:`Dr. Jane Doe`,initialsOf:`Jane Doe`,subtitle:`Project manager`}},{Story:j}=h(A),M=[`Sustainability`,`Gift ideas`,`Bestsellers`,`Accessibility`,`New in`],N=r(`<!> <!> <!>`,1),P=r(`<!> <!> <!> <!> <!>`,1),k.__docgen={data:[],name:`Records.stories.svelte`},F=g(k,A),I=[`IdentityCell`,`IdentityCellWithBadge`,`IdentityCellList`,`TagList`,`StructTree`],L={...F.IdentityCell,tags:[`svelte-csf-v5`]},R={...F.IdentityCellWithBadge,tags:[`svelte-csf-v5`]},z={...F.IdentityCellList,tags:[`svelte-csf-v5`]},B={...F.TagList,tags:[`svelte-csf-v5`]},V={...F.StructTree,tags:[`svelte-csf-v5`]}})))()}H();export{L as IdentityCell,z as IdentityCellList,R as IdentityCellWithBadge,V as StructTree,B as TagList,I as __namedExportsOrder,A as default};