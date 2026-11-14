import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Mt as t,Qt as n,St as r,Wt as i,Yt as a,bt as o,en as s,fn as c,jn as l,l as u,pn as d,qt as f,rt as p,xt as m}from"./iframe-D4jyjLko.js";import{i as h,n as g,r as _,t as v}from"./create-runtime-stories-2Z8qmkK0.js";import{i as y,n as b}from"./palette-DNwFBI2z.js";import{n as x,t as S}from"./Stack-CwOhDw0w.js";import{n as C,t as w}from"./Row-Df5rkmPk.js";import{n as T,t as E}from"./Tag-CKJGIu6c.js";function D(e,r){d(r,!0);let l=s(a([`Leipzig`,`Capacity ≥ 300`,`Barrier-free`]));var u=j(),h=i(u);k(h,{name:`Playground`,parameters:{docs:{description:{story:`A tag is a pill because it is something you can act on (filter, remove, open). Clickable tags
squish when pressed, like buttons.`}},__svelteCsf:{rawCode:`<Tag {...args} />`}}});var g=f(h,2);k(g,{name:`Removable`,asChild:!0,children:(e,r)=>{w(e,{gap:`xs`,children:(e,r)=>{var a=m(),s=i(a);p(s,16,()=>t(l),e=>e,(e,r)=>{E(e,{get label(){return r},tone:`accent`,onremove:()=>n(l,t(l).filter(e=>e!==r),!0)})}),o(e,a)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Applied filters you can remove one by one.`}},__svelteCsf:{rawCode:`<Row gap="xs">
  {#each filters as filter (filter)}
    <Tag
      label={filter}
      tone="accent"
      onremove={() => (filters = filters.filter((f) => f !== filter))}
    />
  {/each}
</Row>`}}});var _=f(g,2);k(_,{name:`Key and value`,asChild:!0,children:(e,t)=>{w(e,{gap:`xs`,children:(e,t)=>{var n=A(),r=i(n);E(r,{name:`Type`,label:`Venue`});var a=f(r,2);E(a,{name:`City`,label:`Leipzig`});var s=f(a,2);E(s,{name:`Capacity`,label:`300`}),o(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Key/value tags for attributes.`}},__svelteCsf:{rawCode:`<Row gap="xs">
  <Tag name="Type" label="Venue" />
  <Tag name="City" label="Leipzig" />
  <Tag name="Capacity" label="300" />
</Row>`}}});var v=f(_,2);k(v,{name:`Categories`,asChild:!0,children:(e,t)=>{S(e,{gap:`sm`,children:(e,t)=>{var n=M(),r=i(n);w(r,{gap:`xs`,children:(e,t)=>{var n=j(),r=i(n);E(r,{label:`Design`,tone:`pink`});var a=f(r,2);E(a,{label:`Engineering`,tone:`blue`});var s=f(a,2);E(s,{label:`Marketing`,tone:`orange`});var c=f(s,2);E(c,{label:`Research`,tone:`purple`});var l=f(c,2);E(l,{label:`Support`,tone:`teal`}),o(e,n)},$$slots:{default:!0}});var a=f(r,2);w(a,{gap:`xs`,children:(e,t)=>{var n=A(),r=i(n);E(r,{label:`Design`,color:`pink`});var a=f(r,2);E(a,{label:`Engineering`,color:`blue`});var s=f(a,2);E(s,{label:`Marketing`,color:`orange`}),o(e,n)},$$slots:{default:!0}}),o(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Categories in candy colours, with or without a colour dot.`}},__svelteCsf:{rawCode:`<Stack gap="sm">
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
</Stack>`}}});var y=f(v,2);k(y,{name:`Links, ids and status`,asChild:!0,children:(e,t)=>{S(e,{gap:`sm`,children:(e,t)=>{var n=M(),r=i(n);w(r,{gap:`xs`,children:(e,t)=>{var n=A(),r=i(n);E(r,{label:`Venue guide — rooms, capacities and floor plans`,href:`https://example.com/guide`,external:!0});var a=f(r,2);E(a,{label:`search_profiles`,mono:!0,count:3});var s=f(a,2);E(s,{label:`geocode`,mono:!0,count:`2 failed`,tone:`danger`,title:`Timed out twice`}),o(e,n)},$$slots:{default:!0}});var a=f(r,2);w(a,{gap:`xs`,children:(e,t)=>{var n=N(),r=i(n);E(r,{label:`sustainability`,onclick:()=>{}});var a=f(r,2);E(a,{label:`public`,tone:`ok`});var s=f(a,2);E(s,{label:`members`,tone:`warn`});var c=f(s,2);E(c,{label:`internal`,tone:`info`}),o(e,n)},$$slots:{default:!0}}),o(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"Link chips cut long labels and keep the full text in the tooltip; ids in `mono`; status tones."}},__svelteCsf:{rawCode:`<Stack gap="sm">
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
</Stack>`}}}),o(e,u),c()}var O,k,A,j,M,N,P,F,I,L,R,z,B;function V(){return(V=e((()=>{l(),h(),C(),x(),T(),b(),u(),g(),O={title:`Atoms/Tag`,component:E,tags:[`autodocs`],args:{label:`Leipzig`,name:`City`,tone:`neutral`},argTypes:{tone:{control:`select`,options:[`neutral`,`ok`,`warn`,`danger`,`info`,`accent`,...y]}}},{Story:k}=_(O),A=r(`<!> <!> <!>`,1),j=r(`<!> <!> <!> <!> <!>`,1),M=r(`<!> <!>`,1),N=r(`<!> <!> <!> <!>`,1),D.__docgen={data:[],name:`Tag.stories.svelte`},P=v(D,O),F=[`Playground`,`Removable`,`KeyAndValue`,`Categories`,`LinksIdsAndStatus`],I={...P.Playground,tags:[`svelte-csf-v5`]},L={...P.Removable,tags:[`svelte-csf-v5`]},R={...P.KeyAndValue,tags:[`svelte-csf-v5`]},z={...P.Categories,tags:[`svelte-csf-v5`]},B={...P.LinksIdsAndStatus,tags:[`svelte-csf-v5`]}})))()}V();export{z as Categories,R as KeyAndValue,B as LinksIdsAndStatus,I as Playground,L as Removable,F as __namedExportsOrder,O as default};