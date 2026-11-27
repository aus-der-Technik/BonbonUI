import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{An as t,Cn as n,Ct as r,Ft as i,Gt as a,Ht as o,Pt as s,Wt as c,_n as l,cn as u,l as d,on as f,wn as p,xt as m,zt as h}from"./iframe-D3QpTFc1.js";import{i as g,n as _,r as v,t as y}from"./create-runtime-stories-bgfxAijx.js";import{n as b,t as x}from"./Button-DO5WmEfH.js";import{n as S,t as C}from"./Select-DMkHx1Lr.js";import{n as w,t as T}from"./SearchField-BnBHvL6w.js";import{n as E,t as D}from"./Stack-DIO0U5nL.js";import{n as O,t as k}from"./Joined-BVK6dwqw.js";function A(e,r){p(r,!0);let i=u(``),s=u(c(new Date(2026,10,17))),d=e=>f(s,new Date(a(s).getTime()+e*864e5),!0),g=u(`newest`);var _=F(),v=h(_);M(v,{name:`Search and new`,args:{label:`Find or start a conversation`,size:`md`,shape:`pill`},template:(e,n=t)=>{k(e,{get label(){return n().label},get size(){return n().size},get shape(){return n().shape},children:(e,t)=>{var n=N(),r=h(n);T(r,{label:`Search conversations`,get value(){return a(i)},set value(e){f(i,e,!0)}});var s=o(r,2);x(s,{iconOnly:!0,icon:`message-plus`,label:`New message`}),m(e,n)},$$slots:{default:!0}})},$$slots:{template:!0},parameters:{docs:{description:{story:`A field and the action it belongs to: one capsule, one focus halo for the whole. Type in
    the field: the group lights, not just the field.`}},__svelteCsf:{rawCode:`<Joined label={args.label} size={args.size} shape={args.shape}>
  <SearchField label="Search conversations" bind:value={query} />
  <Button iconOnly icon="message-plus" label="New message" />
</Joined>`}}});var y=o(v,2);M(y,{name:`Step through`,asChild:!0,children:(e,t)=>{k(e,{label:`Change the day`,children:(e,t)=>{var n=P(),r=h(n);x(r,{iconOnly:!0,icon:`chevron-left`,label:`Previous day`,onclick:()=>d(-1)});var i=o(r,2);{let e=l(()=>a(s).toLocaleDateString(`en`,{weekday:`short`,day:`numeric`,month:`short`}));x(i,{get label(){return a(e)},onclick:()=>f(s,new Date(2026,10,17),!0)})}var c=o(i,2);x(c,{iconOnly:!0,icon:`chevron-right`,label:`Next day`,onclick:()=>d(1)}),m(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A few related actions as one control: ‹ Today ›. A press gives the whole group a little.`}},__svelteCsf:{rawCode:`<Joined label="Change the day">
  <Button iconOnly icon="chevron-left" label="Previous day" onclick={() => shift(-1)} />
  <Button
    label={day.toLocaleDateString('en', { weekday: 'short', day: 'numeric', month: 'short' })}
    onclick={() => (day = new Date(2026, 10, 17))}
  />
  <Button iconOnly icon="chevron-right" label="Next day" onclick={() => shift(1)} />
</Joined>`}}});var b=o(y,2);M(b,{name:`With a filled part`,asChild:!0,children:(e,t)=>{D(e,{gap:`md`,align:`start`,children:(e,t)=>{var n=N(),r=h(n);k(r,{label:`New document`,children:(e,t)=>{var n=P(),r=h(n);x(r,{variant:`primary`,icon:`plus`,label:`New`});var i=o(r,2);x(i,{iconOnly:!0,icon:`upload`,label:`Import`});var a=o(i,2);x(a,{iconOnly:!0,icon:`grid`,label:`Cards`}),m(e,n)},$$slots:{default:!0}});var s=o(r,2);k(s,{label:`Find a file`,full:!0,children:(e,t)=>{var n=N(),r=h(n);T(r,{label:`Search files`,get value(){return a(i)},set value(e){f(i,e,!0)}});var s=o(r,2);x(s,{variant:`tinted`,iconOnly:!0,icon:`filter`,label:`Filter`}),m(e,n)},$$slots:{default:!0}}),m(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`The action the group is about stays filled: a whole pill inset in the capsule, its gloss
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
</Stack>`}}});var S=o(b,2);M(S,{name:`Sizes and shapes`,asChild:!0,children:(e,t)=>{D(e,{gap:`md`,align:`start`,children:(e,t)=>{var n=N(),r=h(n);k(r,{label:`Sort`,size:`sm`,children:(e,t)=>{var n=N(),r=h(n);C(r,{"aria-label":`Sort by`,size:`sm`,options:[{value:`newest`,label:`Newest first`},{value:`name`,label:`By name`}],get value(){return a(g)},set value(e){f(g,e,!0)}});var i=o(r,2);x(i,{size:`sm`,iconOnly:!0,icon:`arrow-down`,label:`Descending`}),m(e,n)},$$slots:{default:!0}});var s=o(r,2);k(s,{label:`Find a person`,shape:`rounded`,full:!0,children:(e,t)=>{var n=N(),r=h(n);T(r,{label:`Search people`,shape:`rounded`,get value(){return a(i)},set value(e){f(i,e,!0)}});var s=o(r,2);x(s,{iconOnly:!0,icon:`user-plus`,label:`Invite`}),m(e,n)},$$slots:{default:!0}}),m(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"`sm` (32 px) in a row or a pane's head, `rounded` in forms; `full` takes the width and the\n    field grows. Selects join too."}},__svelteCsf:{rawCode:`<Stack gap="md" align="start">
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
</Stack>`}}}),m(e,_),n()}var j,M,N,P,F,I,L,R,z,B,V;function H(){return(H=e((()=>{i(),s(),g(),O(),w(),b(),S(),E(),d(),_(),j={title:`Molecules/Joined`,component:k,tags:[`autodocs`],argTypes:{size:{control:`inline-radio`,options:[`sm`,`md`]},shape:{control:`inline-radio`,options:[`pill`,`rounded`]}}},{Story:M}=v(j),N=r(`<!> <!>`,1),P=r(`<!> <!> <!>`,1),F=r(`<!> <!> <!> <!>`,1),A.__docgen={data:[],name:`Joined.stories.svelte`},I=y(A,j),L=[`SearchAndNew`,`StepThrough`,`WithAFilledPart`,`SizesAndShapes`],R={...I.SearchAndNew,tags:[`svelte-csf-v5`]},z={...I.StepThrough,tags:[`svelte-csf-v5`]},B={...I.WithAFilledPart,tags:[`svelte-csf-v5`]},V={...I.SizesAndShapes,tags:[`svelte-csf-v5`]}})))()}H();export{R as SearchAndNew,V as SizesAndShapes,z as StepThrough,B as WithAFilledPart,L as __namedExportsOrder,j as default};