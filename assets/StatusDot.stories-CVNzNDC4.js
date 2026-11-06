import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Cn as t,Et as n,Mt as r,Rt as i,St as a,Wt as o,_t as s,bt as c,fn as l,in as u,jn as d,l as f,m as p,pn as m,qt as h,rt as g,xt as _}from"./iframe-Dd9zCUtD.js";import{a as v,i as y,n as b,r as x,t as S}from"./create-runtime-stories-Bj9BSqmd.js";import{i as C,n as w}from"./palette-DNwFBI2z.js";import{n as T,t as E}from"./Card-o6xHO1cU.js";import{n as D,t as O}from"./Avatar-Gr6feLM9.js";import{n as k,t as A}from"./Text-7M-JJfls.js";import{n as j,t as M}from"./Stack-B3I2k7mw.js";import{n as N,t as P}from"./Row--NLDOgtN.js";import{n as F,t as I}from"./StatusDot-BAbTz6t3.js";function L(e,a){m(a,!1),p();var d=U(),f=o(d);z(f,{name:`Playground`,parameters:{docs:{description:{story:`A lit bead with a quiet halo, not a neon glow: status should be noticed, not shout. A circle,
because in the shape grammar circles mean state or identity.`}},__svelteCsf:{rawCode:`<StatusDot {...args} />`}}});var v=h(f,2);z(v,{name:`Service health`,asChild:!0,children:(e,a)=>{E(e,{gap:`sm`,style:`max-width: 24rem`,children:(e,a)=>{var l=_(),d=o(l);g(d,1,()=>B,e=>e.name,(e,a)=>{P(e,{justify:`between`,children:(e,l)=>{var d=V(),f=o(d);A(f,{weight:`medium`,children:(e,o)=>{t();var l=n();i(()=>s(l,r(a).name)),c(e,l)},$$slots:{default:!0}});var p=h(f,2);{let e=u(()=>r(a).tone===`danger`);I(p,{get tone(){return r(a).tone},get label(){return r(a).label},get pulse(){return r(e)}})}c(e,d)},$$slots:{default:!0}})}),c(e,l)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"A status page row per service; `pulse` only on the states that need attention."}},__svelteCsf:{rawCode:`<Card gap="sm" style="max-width: 24rem">
  {#each services as s (s.name)}
    <Row justify="between">
      <Text weight="medium">{s.name}</Text>
      <StatusDot tone={s.tone} label={s.label} pulse={s.tone === 'danger'} />
    </Row>
  {/each}
</Card>`}}});var y=h(v,2);z(y,{name:`Presence`,asChild:!0,children:(e,r)=>{M(e,{gap:`sm`,children:(e,r)=>{var i=U(),a=o(i);P(a,{gap:`sm`,children:(e,r)=>{var i=H(),a=o(i);O(a,{name:`Jane Doe`,color:`auto`});var s=h(a);A(s,{children:(e,r)=>{t();var i=n(`Jane Doe`);c(e,i)},$$slots:{default:!0}});var l=h(s);I(l,{tone:`ok`,"aria-label":`Online`}),c(e,i)},$$slots:{default:!0}});var s=h(a,2);P(s,{gap:`sm`,children:(e,r)=>{var i=H(),a=o(i);O(a,{name:`Sam Rivera`,color:`auto`});var s=h(a);A(s,{children:(e,r)=>{t();var i=n(`Sam Rivera`);c(e,i)},$$slots:{default:!0}});var l=h(s);I(l,{tone:`warn`,"aria-label":`Away`}),c(e,i)},$$slots:{default:!0}});var l=h(s,2);P(l,{gap:`sm`,children:(e,r)=>{var i=H(),a=o(i);O(a,{name:`Robin Park`,color:`auto`});var s=h(a);A(s,{children:(e,r)=>{t();var i=n(`Robin Park`);c(e,i)},$$slots:{default:!0}});var l=h(s);I(l,{"aria-label":`Offline`}),c(e,i)},$$slots:{default:!0}}),c(e,i)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"Presence next to people. Without a label, `aria-label` says what the dot means."}},__svelteCsf:{rawCode:`<Stack gap="sm">
  <Row gap="sm"
    ><Avatar name="Jane Doe" color="auto" /><Text>Jane Doe</Text><StatusDot
      tone="ok"
      aria-label="Online"
    /></Row
  >
  <Row gap="sm"
    ><Avatar name="Sam Rivera" color="auto" /><Text>Sam Rivera</Text><StatusDot
      tone="warn"
      aria-label="Away"
    /></Row
  >
  <Row gap="sm"
    ><Avatar name="Robin Park" color="auto" /><Text>Robin Park</Text><StatusDot
      aria-label="Offline"
    /></Row
  >
</Stack>`}}}),c(e,d),l()}var R,z,B,V,H,U,W,G,K,q,J;function Y(){return(Y=e((()=>{d(),v(),y(),N(),j(),D(),T(),F(),k(),w(),f(),b(),R={title:`Atoms/StatusDot`,component:I,tags:[`autodocs`],args:{tone:`ok`,label:`Operational`,pulse:!0,size:`md`},argTypes:{tone:{control:`select`,options:[`ok`,`warn`,`danger`,`info`,`neutral`,`accent`,...C]},size:{control:`inline-radio`,options:[`sm`,`md`,`lg`]}}},{Story:z}=x(R),B=[{name:`API`,tone:`ok`,label:`Operational`},{name:`Search`,tone:`warn`,label:`Degraded`},{name:`Uploads`,tone:`danger`,label:`Outage`},{name:`Billing`,tone:`neutral`,label:`Maintenance`}],V=a(`<!> <!>`,1),H=a(`<!><!><!>`,1),U=a(`<!> <!> <!>`,1),L.__docgen={data:[],name:`StatusDot.stories.svelte`},W=S(L,R),G=[`Playground`,`ServiceHealth`,`Presence`],K={...W.Playground,tags:[`svelte-csf-v5`]},q={...W.ServiceHealth,tags:[`svelte-csf-v5`]},J={...W.Presence,tags:[`svelte-csf-v5`]}})))()}Y();export{K as Playground,J as Presence,q as ServiceHealth,G as __namedExportsOrder,R as default};