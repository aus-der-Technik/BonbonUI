import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Mt as t,Qt as n,St as r,Wt as i,Yt as a,bt as o,en as s,fn as c,jn as l,l as u,pn as d,qt as f}from"./iframe-CWg4yaha.js";import{i as p,n as m,r as h,t as g}from"./create-runtime-stories-DQq0d2lF.js";import{o as _,u as v}from"./format-BmhxglcS.js";import{n as y,t as b}from"./MultiSelect-COTN_Dip.js";function x(e,r){d(r,!0);let l=s(a([])),u=s(a([`up`,`5`,`4`]));var p=E(),m=i(p);T(m,{name:`Channels`,asChild:!0,children:(e,r)=>{b(e,{label:`Channel`,allLabel:`All channels`,unit:`channels`,get groups(){return C},get value(){return t(l)},onchange:e=>n(l,e,!0)})},$$slots:{default:!0},parameters:{docs:{description:{story:`A filter dropdown of checkboxes. The trigger summarises the pick ("All channels",
    "Web shop", "2 channels") and glows in the accent while open.`}},__svelteCsf:{rawCode:`<MultiSelect
  label="Channel"
  allLabel="All channels"
  unit="channels"
  groups={channels}
  value={picked}
  onchange={(v) => (picked = v)}
/>`}}});var h=f(m,2);T(h,{name:`Grouped ratings`,asChild:!0,children:(e,r)=>{b(e,{label:`Rating`,allLabel:`All ratings`,unit:`ratings`,get groups(){return S},get value(){return t(u)},onchange:e=>n(u,e,!0)})},$$slots:{default:!0},parameters:{docs:{description:{story:`Groups get a caps heading that toggles the whole group; options can show stars.`}},__svelteCsf:{rawCode:`<MultiSelect
  label="Rating"
  allLabel="All ratings"
  unit="ratings"
  groups={ratings}
  value={rated}
  onchange={(v) => (rated = v)}
/>`}}});var g=f(h,2);T(g,{name:`Empty`,asChild:!0,children:(e,t)=>{b(e,{label:`Channel`,allLabel:`All channels`,groups:[{options:[]}],value:[],onchange:()=>{}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Before the options have loaded.`}},__svelteCsf:{rawCode:`<MultiSelect
  label="Channel"
  allLabel="All channels"
  groups={[{ options: [] }]}
  value={[]}
  onchange={() => {}}
/>`}}}),o(e,p),c()}var S,C,w,T,E,D,O,k,A,j;function M(){return(M=e((()=>{l(),p(),y(),_(),u(),m(),S=[{label:`Thumbs`,options:[{value:`up`,label:`Thumbs up`},{value:`down`,label:`Thumbs down`}]},{label:`Stars`,options:[5,4,3,2,1].map(e=>({value:String(e),label:v(e),stars:e}))}],C=[{options:[`Web shop`,`Mobile app`,`Marketplace`,`Phone orders`].map(e=>({value:e.toLowerCase().replace(/\s+/g,`-`),label:e}))}],w={title:`Molecules/MultiSelect`,component:b,tags:[`autodocs`],parameters:{layout:`padded`,docs:{story:{height:`22rem`}}}},{Story:T}=h(w),E=r(`<!> <!> <!>`,1),x.__docgen={data:[],name:`MultiSelect.stories.svelte`},D=g(x,w),O=[`Channels`,`GroupedRatings`,`Empty`],k={...D.Channels,tags:[`svelte-csf-v5`]},A={...D.GroupedRatings,tags:[`svelte-csf-v5`]},j={...D.Empty,tags:[`svelte-csf-v5`]}})))()}M();export{k as Channels,j as Empty,A as GroupedRatings,O as __namedExportsOrder,w as default};