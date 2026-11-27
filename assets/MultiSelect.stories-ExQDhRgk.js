import{n as e}from"./rolldown-runtime-Dxh6kD9_.js";import{Ct as t,Ft as n,Gt as r,Ht as i,Pt as a,Sn as o,Wt as s,cn as c,l,on as u,xn as d,xt as f,zt as p}from"./iframe-WlNMZtZ0.js";import{i as m,n as h,r as g,t as _}from"./create-runtime-stories-CbHiKinS.js";import{o as v,u as y}from"./format-1b3iHqcE.js";import{n as b,t as x}from"./MultiSelect-nUsMFK1D.js";function S(e,t){o(t,!0);let n=c(s([])),a=c(s([`up`,`5`,`4`]));var l=D(),m=p(l);E(m,{name:`Channels`,asChild:!0,children:(e,t)=>{x(e,{label:`Channel`,allLabel:`All channels`,unit:`channels`,get groups(){return w},get value(){return r(n)},onchange:e=>u(n,e,!0)})},$$slots:{default:!0},parameters:{docs:{description:{story:`A filter dropdown of checkboxes. The trigger summarises the pick ("All channels",
    "Web shop", "2 channels") and glows in the accent while open.`}},__svelteCsf:{rawCode:`<MultiSelect
  label="Channel"
  allLabel="All channels"
  unit="channels"
  groups={channels}
  value={picked}
  onchange={(v) => (picked = v)}
/>`}}});var h=i(m,2);E(h,{name:`Grouped ratings`,asChild:!0,children:(e,t)=>{x(e,{label:`Rating`,allLabel:`All ratings`,unit:`ratings`,get groups(){return C},get value(){return r(a)},onchange:e=>u(a,e,!0)})},$$slots:{default:!0},parameters:{docs:{description:{story:`Groups get a caps heading that toggles the whole group; options can show stars.`}},__svelteCsf:{rawCode:`<MultiSelect
  label="Rating"
  allLabel="All ratings"
  unit="ratings"
  groups={ratings}
  value={rated}
  onchange={(v) => (rated = v)}
/>`}}});var g=i(h,2);E(g,{name:`Empty`,asChild:!0,children:(e,t)=>{x(e,{label:`Channel`,allLabel:`All channels`,groups:[{options:[]}],value:[],onchange:()=>{}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Before the options have loaded.`}},__svelteCsf:{rawCode:`<MultiSelect
  label="Channel"
  allLabel="All channels"
  groups={[{ options: [] }]}
  value={[]}
  onchange={() => {}}
/>`}}}),f(e,l),d()}var C,w,T,E,D,O,k,A,j,M;function N(){return(N=e((()=>{n(),a(),m(),b(),v(),l(),h(),C=[{label:`Thumbs`,options:[{value:`up`,label:`Thumbs up`},{value:`down`,label:`Thumbs down`}]},{label:`Stars`,options:[5,4,3,2,1].map(e=>({value:String(e),label:y(e),stars:e}))}],w=[{options:[`Web shop`,`Mobile app`,`Marketplace`,`Phone orders`].map(e=>({value:e.toLowerCase().replace(/\s+/g,`-`),label:e}))}],T={title:`Molecules/MultiSelect`,component:x,tags:[`autodocs`],parameters:{layout:`padded`,docs:{story:{height:`22rem`}}}},{Story:E}=g(T),D=t(`<!> <!> <!>`,1),S.__docgen={data:[],name:`MultiSelect.stories.svelte`},O=_(S,T),k=[`Channels`,`GroupedRatings`,`Empty`],A={...O.Channels,tags:[`svelte-csf-v5`]},j={...O.GroupedRatings,tags:[`svelte-csf-v5`]},M={...O.Empty,tags:[`svelte-csf-v5`]}})))()}N();export{A as Channels,M as Empty,j as GroupedRatings,k as __namedExportsOrder,T as default};