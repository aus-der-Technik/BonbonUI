import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Ct as t,Kt as n,Nn as r,Pt as i,St as a,Yt as o,Zt as s,en as c,hn as l,l as u,mn as d,nn as f,rt as p,xt as m}from"./iframe-CjPY-Fqe.js";import{i as h,n as g,r as _,t as v}from"./create-runtime-stories-tZqyKHa4.js";import{i as y,n as b}from"./palette-DNwFBI2z.js";import{n as x,t as S}from"./Stack-BmjVbqUs.js";import{n as C,t as w}from"./Row-FH_DsT13.js";import{n as T,t as E}from"./Tag-7c2BfRfT.js";function D(e,t){l(t,!0);let r=f(s([`Leipzig`,`Capacity ≥ 300`,`Barrier-free`]));var u=j(),h=n(u);k(h,{name:`Playground`,parameters:{docs:{description:{story:`A tag is a pill because it is something you can act on (filter, remove, open). Clickable tags
squish when pressed, like buttons.`}},__svelteCsf:{rawCode:`<Tag {...args} />`}}});var g=o(h,2);k(g,{name:`Removable`,asChild:!0,children:(e,t)=>{w(e,{gap:`xs`,children:(e,t)=>{var o=a(),s=n(o);p(s,16,()=>i(r),e=>e,(e,t)=>{E(e,{get label(){return t},tone:`accent`,onremove:()=>c(r,i(r).filter(e=>e!==t),!0)})}),m(e,o)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Applied filters you can remove one by one.`}},__svelteCsf:{rawCode:`<Row gap="xs">
  {#each filters as filter (filter)}
    <Tag
      label={filter}
      tone="accent"
      onremove={() => (filters = filters.filter((f) => f !== filter))}
    />
  {/each}
</Row>`}}});var _=o(g,2);k(_,{name:`Key and value`,asChild:!0,children:(e,t)=>{w(e,{gap:`xs`,children:(e,t)=>{var r=A(),i=n(r);E(i,{name:`Type`,label:`Venue`});var a=o(i,2);E(a,{name:`City`,label:`Leipzig`});var s=o(a,2);E(s,{name:`Capacity`,label:`300`}),m(e,r)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Key/value tags for attributes.`}},__svelteCsf:{rawCode:`<Row gap="xs">
  <Tag name="Type" label="Venue" />
  <Tag name="City" label="Leipzig" />
  <Tag name="Capacity" label="300" />
</Row>`}}});var v=o(_,2);k(v,{name:`Categories`,asChild:!0,children:(e,t)=>{S(e,{gap:`sm`,children:(e,t)=>{var r=M(),i=n(r);w(i,{gap:`xs`,children:(e,t)=>{var r=j(),i=n(r);E(i,{label:`Design`,tone:`pink`});var a=o(i,2);E(a,{label:`Engineering`,tone:`blue`});var s=o(a,2);E(s,{label:`Marketing`,tone:`orange`});var c=o(s,2);E(c,{label:`Research`,tone:`purple`});var l=o(c,2);E(l,{label:`Support`,tone:`teal`}),m(e,r)},$$slots:{default:!0}});var a=o(i,2);w(a,{gap:`xs`,children:(e,t)=>{var r=A(),i=n(r);E(i,{label:`Design`,color:`pink`});var a=o(i,2);E(a,{label:`Engineering`,color:`blue`});var s=o(a,2);E(s,{label:`Marketing`,color:`orange`}),m(e,r)},$$slots:{default:!0}}),m(e,r)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Categories in candy colours, with or without a colour dot.`}},__svelteCsf:{rawCode:`<Stack gap="sm">
  <Row gap="xs">
    <Tag label="Design" tone="pink" />
    <Tag label="Engineering" tone="blue" />
    <Tag label="Marketing" tone="orange" />
    <Tag label="Research" tone="purple" />
    <Tag label="Support" tone="teal" />
  </Row>
  <Row gap="xs">
    <Tag label="Design" color="pink" />
    <Tag label="Engineering" color="blue" />
    <Tag label="Marketing" color="orange" />
  </Row>
</Stack>`}}});var y=o(v,2);k(y,{name:`Links, ids and status`,asChild:!0,children:(e,t)=>{S(e,{gap:`sm`,children:(e,t)=>{var r=M(),i=n(r);w(i,{gap:`xs`,children:(e,t)=>{var r=A(),i=n(r);E(i,{label:`Venue guide — rooms, capacities and floor plans`,href:`https://example.com/guide`,external:!0});var a=o(i,2);E(a,{label:`search_profiles`,mono:!0,count:3});var s=o(a,2);E(s,{label:`geocode`,mono:!0,count:`2 failed`,tone:`danger`,title:`Timed out twice`}),m(e,r)},$$slots:{default:!0}});var a=o(i,2);w(a,{gap:`xs`,children:(e,t)=>{var r=N(),i=n(r);E(i,{label:`sustainability`,onclick:()=>{}});var a=o(i,2);E(a,{label:`public`,tone:`ok`});var s=o(a,2);E(s,{label:`members`,tone:`warn`});var c=o(s,2);E(c,{label:`internal`,tone:`info`}),m(e,r)},$$slots:{default:!0}}),m(e,r)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"Link chips cut long labels and keep the full text in the tooltip; ids in `mono`; status tones."}},__svelteCsf:{rawCode:`<Stack gap="sm">
  <Row gap="xs">
    <Tag
      label="Venue guide — rooms, capacities and floor plans"
      href="https://example.com/guide"
      external
    />
    <Tag label="search_profiles" mono count={3} />
    <Tag label="geocode" mono count="2 failed" tone="danger" title="Timed out twice" />
  </Row>
  <Row gap="xs">
    <Tag label="sustainability" onclick={() => {}} />
    <Tag label="public" tone="ok" />
    <Tag label="members" tone="warn" />
    <Tag label="internal" tone="info" />
  </Row>
</Stack>`}}}),m(e,u),d()}var O,k,A,j,M,N,P,F,I,L,R,z,B;function V(){return(V=e((()=>{r(),h(),C(),x(),T(),b(),u(),g(),O={title:`Atoms/Tag`,component:E,tags:[`autodocs`],args:{label:`Leipzig`,name:`City`,tone:`neutral`},argTypes:{tone:{control:`select`,options:[`neutral`,`ok`,`warn`,`danger`,`info`,`accent`,...y]}}},{Story:k}=_(O),A=t(`<!> <!> <!>`,1),j=t(`<!> <!> <!> <!> <!>`,1),M=t(`<!> <!>`,1),N=t(`<!> <!> <!> <!>`,1),D.__docgen={data:[],name:`Tag.stories.svelte`},P=v(D,O),F=[`Playground`,`Removable`,`KeyAndValue`,`Categories`,`LinksIdsAndStatus`],I={...P.Playground,tags:[`svelte-csf-v5`]},L={...P.Removable,tags:[`svelte-csf-v5`]},R={...P.KeyAndValue,tags:[`svelte-csf-v5`]},z={...P.Categories,tags:[`svelte-csf-v5`]},B={...P.LinksIdsAndStatus,tags:[`svelte-csf-v5`]}})))()}V();export{z as Categories,R as KeyAndValue,B as LinksIdsAndStatus,I as Playground,L as Removable,F as __namedExportsOrder,O as default};