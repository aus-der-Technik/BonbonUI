import{n as e}from"./rolldown-runtime-Dxh6kD9_.js";import{Ct as t,Ft as n,Gt as r,Ht as i,On as a,Pt as o,Sn as s,Wt as c,cn as l,hn as u,l as d,on as f,xn as p,xt as m,zt as h}from"./iframe-WlNMZtZ0.js";import{i as g,n as _,r as v,t as y}from"./create-runtime-stories-CbHiKinS.js";import{n as b,t as x}from"./Button-DHLILcYm.js";import{n as S,t as C}from"./Select-CYAMxfVl.js";import{n as w,t as T}from"./SearchField-D___nX7x.js";import{n as E,t as D}from"./Stack-BjV-rmuj.js";import{n as O,t as k}from"./Joined-BoEgu9eq.js";function A(e,t){s(t,!0);let n=l(``),o=l(c(new Date(2026,10,17))),d=e=>f(o,new Date(r(o).getTime()+e*864e5),!0),g=l(`newest`);var _=F(),v=h(_);M(v,{name:`Search and new`,args:{label:`Find or start a conversation`,size:`md`,shape:`pill`},template:(e,t=a)=>{k(e,{get label(){return t().label},get size(){return t().size},get shape(){return t().shape},children:(e,t)=>{var a=N(),o=h(a);T(o,{label:`Search conversations`,get value(){return r(n)},set value(e){f(n,e,!0)}});var s=i(o,2);x(s,{iconOnly:!0,icon:`message-plus`,label:`New message`}),m(e,a)},$$slots:{default:!0}})},$$slots:{template:!0},parameters:{docs:{description:{story:`A field and the action it belongs to: one capsule, one focus halo for the whole. Type in
    the field: the group lights, not just the field.`}},__svelteCsf:{rawCode:`<Joined label={args.label} size={args.size} shape={args.shape}>
  <SearchField label="Search conversations" bind:value={query} />
  <Button iconOnly icon="message-plus" label="New message" />
</Joined>`}}});var y=i(v,2);M(y,{name:`Step through`,asChild:!0,children:(e,t)=>{k(e,{label:`Change the day`,children:(e,t)=>{var n=P(),a=h(n);x(a,{iconOnly:!0,icon:`chevron-left`,label:`Previous day`,onclick:()=>d(-1)});var s=i(a,2);{let e=u(()=>r(o).toLocaleDateString(`en`,{weekday:`short`,day:`numeric`,month:`short`}));x(s,{get label(){return r(e)},onclick:()=>f(o,new Date(2026,10,17),!0)})}var c=i(s,2);x(c,{iconOnly:!0,icon:`chevron-right`,label:`Next day`,onclick:()=>d(1)}),m(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A few related actions as one control: ‹ Today ›. A press gives the whole group a little.`}},__svelteCsf:{rawCode:`<Joined label="Change the day">
  <Button iconOnly icon="chevron-left" label="Previous day" onclick={() => shift(-1)} />
  <Button
    label={day.toLocaleDateString('en', { weekday: 'short', day: 'numeric', month: 'short' })}
    onclick={() => (day = new Date(2026, 10, 17))}
  />
  <Button iconOnly icon="chevron-right" label="Next day" onclick={() => shift(1)} />
</Joined>`}}});var b=i(y,2);M(b,{name:`With a filled part`,asChild:!0,children:(e,t)=>{D(e,{gap:`md`,align:`start`,children:(e,t)=>{var a=N(),o=h(a);k(o,{label:`New document`,children:(e,t)=>{var n=P(),r=h(n);x(r,{variant:`primary`,icon:`plus`,label:`New`});var a=i(r,2);x(a,{iconOnly:!0,icon:`upload`,label:`Import`});var o=i(a,2);x(o,{iconOnly:!0,icon:`grid`,label:`Cards`}),m(e,n)},$$slots:{default:!0}});var s=i(o,2);k(s,{label:`Find a file`,full:!0,children:(e,t)=>{var a=N(),o=h(a);T(o,{label:`Search files`,get value(){return r(n)},set value(e){f(n,e,!0)}});var s=i(o,2);x(s,{variant:`tinted`,iconOnly:!0,icon:`filter`,label:`Filter`}),m(e,a)},$$slots:{default:!0}}),m(e,a)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`The action the group is about stays filled: a whole pill inset in the capsule, its gloss
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
</Stack>`}}});var S=i(b,2);M(S,{name:`Sizes and shapes`,asChild:!0,children:(e,t)=>{D(e,{gap:`md`,align:`start`,children:(e,t)=>{var a=N(),o=h(a);k(o,{label:`Sort`,size:`sm`,children:(e,t)=>{var n=N(),a=h(n);C(a,{"aria-label":`Sort by`,size:`sm`,options:[{value:`newest`,label:`Newest first`},{value:`name`,label:`By name`}],get value(){return r(g)},set value(e){f(g,e,!0)}});var o=i(a,2);x(o,{size:`sm`,iconOnly:!0,icon:`arrow-down`,label:`Descending`}),m(e,n)},$$slots:{default:!0}});var s=i(o,2);k(s,{label:`Find a person`,shape:`rounded`,full:!0,children:(e,t)=>{var a=N(),o=h(a);T(o,{label:`Search people`,shape:`rounded`,get value(){return r(n)},set value(e){f(n,e,!0)}});var s=i(o,2);x(s,{iconOnly:!0,icon:`user-plus`,label:`Invite`}),m(e,a)},$$slots:{default:!0}}),m(e,a)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"`sm` (32 px) in a row or a pane's head, `rounded` in forms; `full` takes the width and the\n    field grows. Selects join too."}},__svelteCsf:{rawCode:`<Stack gap="md" align="start">
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
</Stack>`}}}),m(e,_),p()}var j,M,N,P,F,I,L,R,z,B,V;function H(){return(H=e((()=>{n(),o(),g(),O(),w(),b(),S(),E(),d(),_(),j={title:`Molecules/Joined`,component:k,tags:[`autodocs`],argTypes:{size:{control:`inline-radio`,options:[`sm`,`md`]},shape:{control:`inline-radio`,options:[`pill`,`rounded`]}}},{Story:M}=v(j),N=t(`<!> <!>`,1),P=t(`<!> <!> <!>`,1),F=t(`<!> <!> <!> <!>`,1),A.__docgen={data:[],name:`Joined.stories.svelte`},I=y(A,j),L=[`SearchAndNew`,`StepThrough`,`WithAFilledPart`,`SizesAndShapes`],R={...I.SearchAndNew,tags:[`svelte-csf-v5`]},z={...I.StepThrough,tags:[`svelte-csf-v5`]},B={...I.WithAFilledPart,tags:[`svelte-csf-v5`]},V={...I.SizesAndShapes,tags:[`svelte-csf-v5`]}})))()}H();export{R as SearchAndNew,V as SizesAndShapes,z as StepThrough,B as WithAFilledPart,L as __namedExportsOrder,j as default};