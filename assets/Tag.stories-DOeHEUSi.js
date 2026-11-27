import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Cn as t,Ct as n,Ft as r,Gt as i,Ht as a,Pt as o,St as s,Wt as c,cn as l,l as u,on as d,tt as f,wn as p,xt as m,zt as h}from"./iframe-D3QpTFc1.js";import{i as g,n as _,r as v,t as y}from"./create-runtime-stories-bgfxAijx.js";import{i as b,n as x}from"./palette-DNwFBI2z.js";import{n as S,t as C}from"./Stack-DIO0U5nL.js";import{n as w,t as T}from"./Row-B0vuEKpz.js";import{n as E,t as D}from"./Tag-B3zYRs1i.js";function O(e,n){p(n,!0);let r=l(c([`Leipzig`,`Capacity ≥ 300`,`Barrier-free`]));var o=M(),u=h(o);A(u,{name:`Playground`,parameters:{docs:{description:{story:`A tag is a pill because it is something you can act on (filter, remove, open). Clickable tags
squish when pressed, like buttons.`}},__svelteCsf:{rawCode:`<Tag {...args} />`}}});var g=a(u,2);A(g,{name:`Removable`,asChild:!0,children:(e,t)=>{T(e,{gap:`xs`,children:(e,t)=>{var n=s(),a=h(n);f(a,16,()=>i(r),e=>e,(e,t)=>{D(e,{get label(){return t},tone:`accent`,onremove:()=>d(r,i(r).filter(e=>e!==t),!0)})}),m(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Applied filters you can remove one by one.`}},__svelteCsf:{rawCode:`<Row gap="xs">
  {#each filters as filter (filter)}
    <Tag
      label={filter}
      tone="accent"
      onremove={() => (filters = filters.filter((f) => f !== filter))}
    />
  {/each}
</Row>`}}});var _=a(g,2);A(_,{name:`Key and value`,asChild:!0,children:(e,t)=>{T(e,{gap:`xs`,children:(e,t)=>{var n=j(),r=h(n);D(r,{name:`Type`,label:`Venue`});var i=a(r,2);D(i,{name:`City`,label:`Leipzig`});var o=a(i,2);D(o,{name:`Capacity`,label:`300`}),m(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Key/value tags for attributes.`}},__svelteCsf:{rawCode:`<Row gap="xs">
  <Tag name="Type" label="Venue" />
  <Tag name="City" label="Leipzig" />
  <Tag name="Capacity" label="300" />
</Row>`}}});var v=a(_,2);A(v,{name:`Categories`,asChild:!0,children:(e,t)=>{C(e,{gap:`sm`,children:(e,t)=>{var n=N(),r=h(n);T(r,{gap:`xs`,children:(e,t)=>{var n=M(),r=h(n);D(r,{label:`Design`,tone:`pink`});var i=a(r,2);D(i,{label:`Engineering`,tone:`blue`});var o=a(i,2);D(o,{label:`Marketing`,tone:`orange`});var s=a(o,2);D(s,{label:`Research`,tone:`purple`});var c=a(s,2);D(c,{label:`Support`,tone:`teal`}),m(e,n)},$$slots:{default:!0}});var i=a(r,2);T(i,{gap:`xs`,children:(e,t)=>{var n=j(),r=h(n);D(r,{label:`Design`,color:`pink`});var i=a(r,2);D(i,{label:`Engineering`,color:`blue`});var o=a(i,2);D(o,{label:`Marketing`,color:`orange`}),m(e,n)},$$slots:{default:!0}}),m(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Categories in candy colours, with or without a colour dot.`}},__svelteCsf:{rawCode:`<Stack gap="sm">
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
</Stack>`}}});var y=a(v,2);A(y,{name:`Links, ids and status`,asChild:!0,children:(e,t)=>{C(e,{gap:`sm`,children:(e,t)=>{var n=N(),r=h(n);T(r,{gap:`xs`,children:(e,t)=>{var n=j(),r=h(n);D(r,{label:`Venue guide — rooms, capacities and floor plans`,href:`https://example.com/guide`,external:!0});var i=a(r,2);D(i,{label:`search_profiles`,mono:!0,count:3});var o=a(i,2);D(o,{label:`geocode`,mono:!0,count:`2 failed`,tone:`danger`,title:`Timed out twice`}),m(e,n)},$$slots:{default:!0}});var i=a(r,2);T(i,{gap:`xs`,children:(e,t)=>{var n=P(),r=h(n);D(r,{label:`sustainability`,onclick:()=>{}});var i=a(r,2);D(i,{label:`public`,tone:`ok`});var o=a(i,2);D(o,{label:`members`,tone:`warn`});var s=a(o,2);D(s,{label:`internal`,tone:`info`}),m(e,n)},$$slots:{default:!0}}),m(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"Link chips cut long labels and keep the full text in the tooltip; ids in `mono`; status tones."}},__svelteCsf:{rawCode:`<Stack gap="sm">
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
</Stack>`}}}),m(e,o),t()}var k,A,j,M,N,P,F,I,L,R,z,B,V;function H(){return(H=e((()=>{r(),o(),g(),w(),S(),E(),x(),u(),_(),k={title:`Atoms/Tag`,component:D,tags:[`autodocs`],args:{label:`Leipzig`,name:`City`,tone:`neutral`},argTypes:{tone:{control:`select`,options:[`neutral`,`ok`,`warn`,`danger`,`info`,`accent`,...b]}}},{Story:A}=v(k),j=n(`<!> <!> <!>`,1),M=n(`<!> <!> <!> <!> <!>`,1),N=n(`<!> <!>`,1),P=n(`<!> <!> <!> <!>`,1),O.__docgen={data:[],name:`Tag.stories.svelte`},F=y(O,k),I=[`Playground`,`Removable`,`KeyAndValue`,`Categories`,`LinksIdsAndStatus`],L={...F.Playground,tags:[`svelte-csf-v5`]},R={...F.Removable,tags:[`svelte-csf-v5`]},z={...F.KeyAndValue,tags:[`svelte-csf-v5`]},B={...F.Categories,tags:[`svelte-csf-v5`]},V={...F.LinksIdsAndStatus,tags:[`svelte-csf-v5`]}})))()}H();export{B as Categories,z as KeyAndValue,V as LinksIdsAndStatus,L as Playground,R as Removable,I as __namedExportsOrder,k as default};