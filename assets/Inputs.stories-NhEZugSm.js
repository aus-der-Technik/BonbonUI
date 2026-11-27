import{n as e}from"./rolldown-runtime-Dxh6kD9_.js";import{Ct as t,Ft as n,Gt as r,Ht as i,Pt as a,Sn as o,Wt as s,cn as c,hn as l,l as u,on as d,xn as f,xt as p,zt as m}from"./iframe-WlNMZtZ0.js";import{i as h,n as g,r as _,t as v}from"./create-runtime-stories-CbHiKinS.js";import{n as y,t as b}from"./Select-CYAMxfVl.js";import{n as x,t as S}from"./Field-DtdH1dfq.js";import{n as C,t as w}from"./SearchField-D___nX7x.js";import{n as T,t as E}from"./SegmentedControl-DBesi20v.js";import{n as D,t as O}from"./Stack-BjV-rmuj.js";import{n as k,t as ee}from"./StatusText-f0ritOei.js";import{n as A,t as j}from"./TagInput-Cpzc-zm8.js";import{i as M,n as N,r as P,t as F}from"./ThumbsInput-O-tbBNRp.js";function I(e,t){o(t,!0);let n=c(30),a=c(`grid`),u=c(`up`),h=c(4),g=c(s([`accessibility`,`returns`,`shipping`]));var _=B(),v=m(_);R(v,{name:`SearchField small`,parameters:{docs:{description:{story:`A toolbar filter. Focus lights the border and a soft accent halo.`}},__svelteCsf:{rawCode:`<SearchField {...args} />`}}});var y=i(v,2);R(y,{name:`SearchField large`,args:{size:`lg`,label:`Search`,placeholder:`Products, orders or customers`},parameters:{docs:{description:{story:`A page's main search (see Autocomplete for suggestions).`}},__svelteCsf:{rawCode:`<SearchField {...args} />`}}});var x=i(y,2);R(x,{name:`SearchField pill`,args:{shape:`pill`,label:`Search`,placeholder:`Search the workspace`},parameters:{docs:{description:{story:`Fully rounded, for headers and glass toolbars.`}},__svelteCsf:{rawCode:`<SearchField {...args} />`}}});var C=i(x,2);R(C,{name:`TagInput`,asChild:!0,children:(e,t)=>{O(e,{gap:`sm`,children:(e,t)=>{var n=z(),a=m(n);j(a,{label:`Topics`,placeholder:`Add a topic`,maxWidth:`20rem`,get value(){return r(g)},set value(e){d(g,e,!0)}});var o=i(a,2);{let e=l(()=>JSON.stringify(r(g)));ee(o,{get message(){return r(e)}})}p(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Keywords of a record: Enter or "," adds, Backspace in the empty field removes the last.`}},__svelteCsf:{rawCode:`<Stack gap="sm">
  <TagInput label="Topics" placeholder="Add a topic" bind:value={topics} maxWidth="20rem" />
  <StatusText message={JSON.stringify(topics)} />
</Stack>`}}});var w=i(C,2);R(w,{name:`SegmentedControl`,asChild:!0,children:(e,t)=>{E(e,{label:`Time range`,options:[{value:7,label:`7 days`},{value:30,label:`30 days`},{value:90,label:`90 days`},{value:365,label:`1 year`}],get value(){return r(n)},set value(e){d(n,e,!0)}})},$$slots:{default:!0},parameters:{docs:{description:{story:`One of n in a recessed pill track; the active segment rides on a liquid glass thumb that
    glides to the next choice instead of blinking — so the eye follows the change. A pill,
    because you act on it (shape says what it does).`}},__svelteCsf:{rawCode:`<SegmentedControl
  label="Time range"
  options={[
    { value: 7, label: '7 days' },
    { value: 30, label: '30 days' },
    { value: 90, label: '90 days' },
    { value: 365, label: '1 year' },
  ]}
  bind:value={range}
/>`}}});var T=i(w,2);R(T,{name:`SegmentedControl with icons`,asChild:!0,children:(e,t)=>{O(e,{gap:`md`,align:`start`,children:(e,t)=>{var n=z(),o=m(n);E(o,{label:`View`,options:[{value:`grid`,label:`Grid`,icon:`grid`},{value:`list`,label:`List`,icon:`list`},{value:`board`,label:`Board`,icon:`kanban`}],get value(){return r(a)},set value(e){d(a,e,!0)}});var s=i(o,2);E(s,{label:`View`,variant:`accent`,options:[{value:`grid`,label:`Grid`,icon:`grid`},{value:`list`,label:`List`,icon:`list`},{value:`board`,label:`Board`,icon:`kanban`}],get value(){return r(a)},set value(e){d(a,e,!0)}}),p(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:'Segments with icons; `variant="accent"` fills the thumb with the accent.'}},__svelteCsf:{rawCode:`<Stack gap="md" align="start">
  <SegmentedControl
    label="View"
    options={[
      { value: 'grid', label: 'Grid', icon: 'grid' },
      { value: 'list', label: 'List', icon: 'list' },
      { value: 'board', label: 'Board', icon: 'kanban' },
    ]}
    bind:value={view}
  />
  <SegmentedControl
    label="View"
    variant="accent"
    options={[
      { value: 'grid', label: 'Grid', icon: 'grid' },
      { value: 'list', label: 'List', icon: 'list' },
      { value: 'board', label: 'Board', icon: 'kanban' },
    ]}
    bind:value={view}
  />
</Stack>`}}});var D=i(T,2);R(D,{name:`SegmentedControl full width`,asChild:!0,children:(e,t)=>{E(e,{full:!0,label:`Delivery`,value:`standard`,options:[{value:`pickup`,label:`Pick-up`},{value:`standard`,label:`Standard`},{value:`express`,label:`Express`}]})},$$slots:{default:!0},parameters:{docs:{description:{story:"`full` stretches across its container with equal segments — handy in sheets and phones."}},__svelteCsf:{rawCode:`<SegmentedControl
  full
  label="Delivery"
  value="standard"
  options={[
    { value: 'pickup', label: 'Pick-up' },
    { value: 'standard', label: 'Standard' },
    { value: 'express', label: 'Express' },
  ]}
/>`}}});var k=i(D,2);R(k,{name:`Field with label`,asChild:!0,children:(e,t)=>{S(e,{label:`Environment`,hint:`Where the change goes live`,children:(e,t)=>{let n=()=>t?.().id;b(e,{get id(){return n()},value:`prod`,options:[{value:`prod`,label:`Production`},{value:`stage`,label:`Staging`}]})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A Field gives any control a label (and hint or error).`}},__svelteCsf:{rawCode:`<Field label="Environment" hint="Where the change goes live">
  {#snippet children({ id })}
    <Select
      {id}
      value="prod"
      options={[
        { value: 'prod', label: 'Production' },
        { value: 'stage', label: 'Staging' },
      ]}
    />
  {/snippet}
</Field>`}}});var A=i(k,2);R(A,{name:`ThumbsInput`,asChild:!0,children:(e,t)=>{F(e,{label:`Was this answer helpful?`,get value(){return r(u)},set value(e){d(u,e,!0)}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Two big buttons; the chosen one becomes the tinted "selected" layer (the same as every other
    selection) and its thumb keeps the vote colour and pops.`}},__svelteCsf:{rawCode:`<ThumbsInput label="Was this answer helpful?" bind:value={thumbs} />`}}});var M=i(A,2);R(M,{name:`StarInput`,asChild:!0,children:(e,t)=>{P(e,{label:`Your rating`,get value(){return r(h)},set value(e){d(h,e,!0)}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Hover previews the rating, a click sets it.`}},__svelteCsf:{rawCode:`<StarInput label="Your rating" bind:value={stars} />`}}}),p(e,_),f()}var L,R,z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q;function $(){return($=e((()=>{n(),a(),h(),x(),C(),T(),M(),A(),N(),y(),k(),D(),u(),g(),L={title:`Molecules/Inputs`,component:w,tags:[`autodocs`],args:{label:`Filter the loaded rows`,placeholder:`Filter loaded rows`,size:`sm`},argTypes:{size:{control:`inline-radio`,options:[`sm`,`lg`]},shape:{control:`inline-radio`,options:[`rounded`,`pill`]}}},{Story:R}=_(L),z=t(`<!> <!>`,1),B=t(`<!> <!> <!> <!> <!> <!> <!> <!> <!> <!>`,1),I.__docgen={data:[],name:`Inputs.stories.svelte`},V=v(I,L),H=[`SearchFieldSmall`,`SearchFieldLarge`,`SearchFieldPill`,`TagInput`,`SegmentedControl`,`SegmentedControlWithIcons`,`SegmentedControlFullWidth`,`FieldWithLabel`,`ThumbsInput`,`StarInput`],U={...V.SearchFieldSmall,tags:[`svelte-csf-v5`]},W={...V.SearchFieldLarge,tags:[`svelte-csf-v5`]},G={...V.SearchFieldPill,tags:[`svelte-csf-v5`]},K={...V.TagInput,tags:[`svelte-csf-v5`]},q={...V.SegmentedControl,tags:[`svelte-csf-v5`]},J={...V.SegmentedControlWithIcons,tags:[`svelte-csf-v5`]},Y={...V.SegmentedControlFullWidth,tags:[`svelte-csf-v5`]},X={...V.FieldWithLabel,tags:[`svelte-csf-v5`]},Z={...V.ThumbsInput,tags:[`svelte-csf-v5`]},Q={...V.StarInput,tags:[`svelte-csf-v5`]}})))()}$();export{X as FieldWithLabel,W as SearchFieldLarge,G as SearchFieldPill,U as SearchFieldSmall,q as SegmentedControl,Y as SegmentedControlFullWidth,J as SegmentedControlWithIcons,Q as StarInput,K as TagInput,Z as ThumbsInput,H as __namedExportsOrder,L as default};