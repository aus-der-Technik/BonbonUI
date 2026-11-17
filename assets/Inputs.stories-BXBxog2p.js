import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Ct as t,Kt as n,Nn as r,Pt as i,Yt as a,Zt as o,cn as s,en as c,hn as l,l as u,mn as d,nn as f,xt as p}from"./iframe-CjPY-Fqe.js";import{i as m,n as h,r as g,t as _}from"./create-runtime-stories-tZqyKHa4.js";import{n as v,t as y}from"./Select-CK1tQNe-.js";import{n as b,t as x}from"./Field-DPTQVZQ6.js";import{n as S,t as C}from"./SearchField-DNLr9WWT.js";import{n as w,t as T}from"./SegmentedControl-CyLRM1LX.js";import{n as E,t as D}from"./Stack-BmjVbqUs.js";import{n as O,t as k}from"./StatusText-Cqg9x33r.js";import{n as A,t as j}from"./TagInput-CjcWPa2B.js";import{i as M,n as N,r as P,t as F}from"./ThumbsInput-Ce6mknFG.js";function I(e,t){l(t,!0);let r=f(30),u=f(`grid`),m=f(`up`),h=f(4),g=f(o([`accessibility`,`returns`,`shipping`]));var _=B(),v=n(_);R(v,{name:`SearchField small`,parameters:{docs:{description:{story:`A toolbar filter. Focus lights the border and a soft accent halo.`}},__svelteCsf:{rawCode:`<SearchField {...args} />`}}});var b=a(v,2);R(b,{name:`SearchField large`,args:{size:`lg`,label:`Search`,placeholder:`Products, orders or customers`},parameters:{docs:{description:{story:`A page's main search (see Autocomplete for suggestions).`}},__svelteCsf:{rawCode:`<SearchField {...args} />`}}});var S=a(b,2);R(S,{name:`SearchField pill`,args:{shape:`pill`,label:`Search`,placeholder:`Search the workspace`},parameters:{docs:{description:{story:`Fully rounded, for headers and glass toolbars.`}},__svelteCsf:{rawCode:`<SearchField {...args} />`}}});var C=a(S,2);R(C,{name:`TagInput`,asChild:!0,children:(e,t)=>{D(e,{gap:`sm`,children:(e,t)=>{var r=z(),o=n(r);j(o,{label:`Topics`,placeholder:`Add a topic`,maxWidth:`20rem`,get value(){return i(g)},set value(e){c(g,e,!0)}});var l=a(o,2);{let e=s(()=>JSON.stringify(i(g)));k(l,{get message(){return i(e)}})}p(e,r)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Keywords of a record: Enter or "," adds, Backspace in the empty field removes the last.`}},__svelteCsf:{rawCode:`<Stack gap="sm">
  <TagInput label="Topics" placeholder="Add a topic" bind:value={topics} maxWidth="20rem" />
  <StatusText message={JSON.stringify(topics)} />
</Stack>`}}});var w=a(C,2);R(w,{name:`SegmentedControl`,asChild:!0,children:(e,t)=>{T(e,{label:`Time range`,options:[{value:7,label:`7 days`},{value:30,label:`30 days`},{value:90,label:`90 days`},{value:365,label:`1 year`}],get value(){return i(r)},set value(e){c(r,e,!0)}})},$$slots:{default:!0},parameters:{docs:{description:{story:`One of n in a recessed pill track; the active segment rides on a liquid glass thumb that
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
/>`}}});var E=a(w,2);R(E,{name:`SegmentedControl with icons`,asChild:!0,children:(e,t)=>{D(e,{gap:`md`,align:`start`,children:(e,t)=>{var r=z(),o=n(r);T(o,{label:`View`,options:[{value:`grid`,label:`Grid`,icon:`grid`},{value:`list`,label:`List`,icon:`list`},{value:`board`,label:`Board`,icon:`kanban`}],get value(){return i(u)},set value(e){c(u,e,!0)}});var s=a(o,2);T(s,{label:`View`,variant:`accent`,options:[{value:`grid`,label:`Grid`,icon:`grid`},{value:`list`,label:`List`,icon:`list`},{value:`board`,label:`Board`,icon:`kanban`}],get value(){return i(u)},set value(e){c(u,e,!0)}}),p(e,r)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:'Segments with icons; `variant="accent"` fills the thumb with the accent.'}},__svelteCsf:{rawCode:`<Stack gap="md" align="start">
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
</Stack>`}}});var O=a(E,2);R(O,{name:`SegmentedControl full width`,asChild:!0,children:(e,t)=>{T(e,{full:!0,label:`Delivery`,value:`standard`,options:[{value:`pickup`,label:`Pick-up`},{value:`standard`,label:`Standard`},{value:`express`,label:`Express`}]})},$$slots:{default:!0},parameters:{docs:{description:{story:"`full` stretches across its container with equal segments — handy in sheets and phones."}},__svelteCsf:{rawCode:`<SegmentedControl
  full
  label="Delivery"
  value="standard"
  options={[
    { value: 'pickup', label: 'Pick-up' },
    { value: 'standard', label: 'Standard' },
    { value: 'express', label: 'Express' },
  ]}
/>`}}});var A=a(O,2);R(A,{name:`Field with label`,asChild:!0,children:(e,t)=>{x(e,{label:`Environment`,hint:`Where the change goes live`,children:(e,t)=>{let n=()=>t?.().id;y(e,{get id(){return n()},value:`prod`,options:[{value:`prod`,label:`Production`},{value:`stage`,label:`Staging`}]})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A Field gives any control a label (and hint or error).`}},__svelteCsf:{rawCode:`<Field label="Environment" hint="Where the change goes live">
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
</Field>`}}});var M=a(A,2);R(M,{name:`ThumbsInput`,asChild:!0,children:(e,t)=>{F(e,{label:`Was this answer helpful?`,get value(){return i(m)},set value(e){c(m,e,!0)}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Two big buttons; the chosen one becomes the tinted "selected" layer (the same as every other
    selection) and its thumb keeps the vote colour and pops.`}},__svelteCsf:{rawCode:`<ThumbsInput label="Was this answer helpful?" bind:value={thumbs} />`}}});var N=a(M,2);R(N,{name:`StarInput`,asChild:!0,children:(e,t)=>{P(e,{label:`Your rating`,get value(){return i(h)},set value(e){c(h,e,!0)}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Hover previews the rating, a click sets it.`}},__svelteCsf:{rawCode:`<StarInput label="Your rating" bind:value={stars} />`}}}),p(e,_),d()}var L,R,z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q;function $(){return($=e((()=>{r(),m(),b(),S(),w(),M(),A(),N(),v(),O(),E(),u(),h(),L={title:`Molecules/Inputs`,component:C,tags:[`autodocs`],args:{label:`Filter the loaded rows`,placeholder:`Filter loaded rows`,size:`sm`},argTypes:{size:{control:`inline-radio`,options:[`sm`,`lg`]},shape:{control:`inline-radio`,options:[`rounded`,`pill`]}}},{Story:R}=g(L),z=t(`<!> <!>`,1),B=t(`<!> <!> <!> <!> <!> <!> <!> <!> <!> <!>`,1),I.__docgen={data:[],name:`Inputs.stories.svelte`},V=_(I,L),H=[`SearchFieldSmall`,`SearchFieldLarge`,`SearchFieldPill`,`TagInput`,`SegmentedControl`,`SegmentedControlWithIcons`,`SegmentedControlFullWidth`,`FieldWithLabel`,`ThumbsInput`,`StarInput`],U={...V.SearchFieldSmall,tags:[`svelte-csf-v5`]},W={...V.SearchFieldLarge,tags:[`svelte-csf-v5`]},G={...V.SearchFieldPill,tags:[`svelte-csf-v5`]},K={...V.TagInput,tags:[`svelte-csf-v5`]},q={...V.SegmentedControl,tags:[`svelte-csf-v5`]},J={...V.SegmentedControlWithIcons,tags:[`svelte-csf-v5`]},Y={...V.SegmentedControlFullWidth,tags:[`svelte-csf-v5`]},X={...V.FieldWithLabel,tags:[`svelte-csf-v5`]},Z={...V.ThumbsInput,tags:[`svelte-csf-v5`]},Q={...V.StarInput,tags:[`svelte-csf-v5`]}})))()}$();export{X as FieldWithLabel,W as SearchFieldLarge,G as SearchFieldPill,U as SearchFieldSmall,q as SegmentedControl,Y as SegmentedControlFullWidth,J as SegmentedControlWithIcons,Q as StarInput,K as TagInput,Z as ThumbsInput,H as __namedExportsOrder,L as default};