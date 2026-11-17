import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Ct as t,Kt as n,Nn as r,Pt as i,Yt as a,Zt as o,cn as s,en as c,hn as l,jn as u,l as d,mn as f,nn as p,xt as m}from"./iframe-CRBWUEFv.js";import{i as h,n as g,r as _,t as v}from"./create-runtime-stories-DtoOt73Q.js";import{n as y,t as b}from"./Button-CVctU_KR.js";import{n as x,t as S}from"./Select-DOm0NSxm.js";import{n as C,t as w}from"./SearchField-CJjXS2le.js";import{n as T,t as E}from"./Stack-DW7rWz1x.js";import{n as D,t as O}from"./Joined-BJoQyJon.js";function k(e,t){l(t,!0);let r=p(``),d=p(o(new Date(2026,10,17))),h=e=>c(d,new Date(i(d).getTime()+e*864e5),!0),g=p(`newest`);var _=P(),v=n(_);j(v,{name:`Search and new`,args:{label:`Find or start a conversation`,size:`md`,shape:`pill`},template:(e,t=u)=>{O(e,{get label(){return t().label},get size(){return t().size},get shape(){return t().shape},children:(e,t)=>{var o=M(),s=n(o);w(s,{label:`Search conversations`,get value(){return i(r)},set value(e){c(r,e,!0)}});var l=a(s,2);b(l,{iconOnly:!0,icon:`message-plus`,label:`New message`}),m(e,o)},$$slots:{default:!0}})},$$slots:{template:!0},parameters:{docs:{description:{story:`A field and the action it belongs to: one capsule, one focus halo for the whole. Type in
    the field: the group lights, not just the field.`}},__svelteCsf:{rawCode:`<Joined label={args.label} size={args.size} shape={args.shape}>
  <SearchField label="Search conversations" bind:value={query} />
  <Button iconOnly icon="message-plus" label="New message" />
</Joined>`}}});var y=a(v,2);j(y,{name:`Step through`,asChild:!0,children:(e,t)=>{O(e,{label:`Change the day`,children:(e,t)=>{var r=N(),o=n(r);b(o,{iconOnly:!0,icon:`chevron-left`,label:`Previous day`,onclick:()=>h(-1)});var l=a(o,2);{let e=s(()=>i(d).toLocaleDateString(`en`,{weekday:`short`,day:`numeric`,month:`short`}));b(l,{get label(){return i(e)},onclick:()=>c(d,new Date(2026,10,17),!0)})}var u=a(l,2);b(u,{iconOnly:!0,icon:`chevron-right`,label:`Next day`,onclick:()=>h(1)}),m(e,r)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A few related actions as one control: ‹ Today ›. A press gives the whole group a little.`}},__svelteCsf:{rawCode:`<Joined label="Change the day">
  <Button iconOnly icon="chevron-left" label="Previous day" onclick={() => shift(-1)} />
  <Button
    label={day.toLocaleDateString('en', { weekday: 'short', day: 'numeric', month: 'short' })}
    onclick={() => (day = new Date(2026, 10, 17))}
  />
  <Button iconOnly icon="chevron-right" label="Next day" onclick={() => shift(1)} />
</Joined>`}}});var x=a(y,2);j(x,{name:`With a filled part`,asChild:!0,children:(e,t)=>{E(e,{gap:`md`,align:`start`,children:(e,t)=>{var o=M(),s=n(o);O(s,{label:`New document`,children:(e,t)=>{var r=N(),i=n(r);b(i,{variant:`primary`,icon:`plus`,label:`New`});var o=a(i,2);b(o,{iconOnly:!0,icon:`upload`,label:`Import`});var s=a(o,2);b(s,{iconOnly:!0,icon:`grid`,label:`Cards`}),m(e,r)},$$slots:{default:!0}});var l=a(s,2);O(l,{label:`Find a file`,full:!0,children:(e,t)=>{var o=M(),s=n(o);w(s,{label:`Search files`,get value(){return i(r)},set value(e){c(r,e,!0)}});var l=a(s,2);b(l,{variant:`tinted`,iconOnly:!0,icon:`filter`,label:`Filter`}),m(e,o)},$$slots:{default:!0}}),m(e,o)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`The action the group is about stays filled: a whole pill inset in the capsule, its gloss
    ending in its own round ends — never cut off at a hairline.`}},__svelteCsf:{rawCode:`<Stack gap="md" align="start">
  <Joined label="New document">
    <Button variant="primary" icon="plus" label="New" />
    <Button iconOnly icon="upload" label="Import" />
    <Button iconOnly icon="grid" label="Cards" />
  </Joined>
  <Joined label="Find a file" full>
    <SearchField label="Search files" bind:value={query} />
    <Button variant="tinted" iconOnly icon="filter" label="Filter" />
  </Joined>
</Stack>`}}});var C=a(x,2);j(C,{name:`Sizes and shapes`,asChild:!0,children:(e,t)=>{E(e,{gap:`md`,align:`start`,children:(e,t)=>{var o=M(),s=n(o);O(s,{label:`Sort`,size:`sm`,children:(e,t)=>{var r=M(),o=n(r);S(o,{"aria-label":`Sort by`,size:`sm`,options:[{value:`newest`,label:`Newest first`},{value:`name`,label:`By name`}],get value(){return i(g)},set value(e){c(g,e,!0)}});var s=a(o,2);b(s,{size:`sm`,iconOnly:!0,icon:`arrow-down`,label:`Descending`}),m(e,r)},$$slots:{default:!0}});var l=a(s,2);O(l,{label:`Find a person`,shape:`rounded`,full:!0,children:(e,t)=>{var o=M(),s=n(o);w(s,{label:`Search people`,shape:`rounded`,get value(){return i(r)},set value(e){c(r,e,!0)}});var l=a(s,2);b(l,{iconOnly:!0,icon:`user-plus`,label:`Invite`}),m(e,o)},$$slots:{default:!0}}),m(e,o)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"`sm` (32 px) in a row or a pane's head, `rounded` in forms; `full` takes the width and the\n    field grows. Selects join too."}},__svelteCsf:{rawCode:`<Stack gap="md" align="start">
  <Joined label="Sort" size="sm">
    <Select
      aria-label="Sort by"
      size="sm"
      bind:value={sort}
      options={[
        { value: 'newest', label: 'Newest first' },
        { value: 'name', label: 'By name' },
      ]}
    />
    <Button size="sm" iconOnly icon="arrow-down" label="Descending" />
  </Joined>
  <Joined label="Find a person" shape="rounded" full>
    <SearchField label="Search people" shape="rounded" bind:value={query} />
    <Button iconOnly icon="user-plus" label="Invite" />
  </Joined>
</Stack>`}}}),m(e,_),f()}var A,j,M,N,P,F,I,L,R,z,B;function V(){return(V=e((()=>{r(),h(),D(),C(),y(),x(),T(),d(),g(),A={title:`Molecules/Joined`,component:O,tags:[`autodocs`],argTypes:{size:{control:`inline-radio`,options:[`sm`,`md`]},shape:{control:`inline-radio`,options:[`pill`,`rounded`]}}},{Story:j}=_(A),M=t(`<!> <!>`,1),N=t(`<!> <!> <!>`,1),P=t(`<!> <!> <!> <!>`,1),k.__docgen={data:[],name:`Joined.stories.svelte`},F=v(k,A),I=[`SearchAndNew`,`StepThrough`,`WithAFilledPart`,`SizesAndShapes`],L={...F.SearchAndNew,tags:[`svelte-csf-v5`]},R={...F.StepThrough,tags:[`svelte-csf-v5`]},z={...F.WithAFilledPart,tags:[`svelte-csf-v5`]},B={...F.SizesAndShapes,tags:[`svelte-csf-v5`]}})))()}V();export{L as SearchAndNew,B as SizesAndShapes,R as StepThrough,z as WithAFilledPart,I as __namedExportsOrder,A as default};