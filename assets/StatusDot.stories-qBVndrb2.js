import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Bt as t,Ct as n,Dt as r,Kt as i,Nn as a,Pt as o,St as s,Tn as c,Yt as l,_t as u,hn as d,l as f,m as p,mn as m,on as h,rt as g,xt as _}from"./iframe-CRBWUEFv.js";import{a as v,i as y,n as b,r as x,t as S}from"./create-runtime-stories-DtoOt73Q.js";import{i as C,n as w}from"./palette-DNwFBI2z.js";import{n as T,t as E}from"./Card-D32i3kW8.js";import{n as D,t as O}from"./Avatar-C7CjPSx1.js";import{n as k,t as A}from"./Text-LIE7rjjM.js";import{n as j,t as M}from"./Stack-DW7rWz1x.js";import{n as N,t as P}from"./Row-VZCdMLbk.js";import{n as F,t as I}from"./StatusDot-DT6u1LAB.js";function L(e,n){d(n,!1),p();var a=U(),f=i(a);z(f,{name:`Playground`,parameters:{docs:{description:{story:`A lit bead with a quiet halo, not a neon glow: status should be noticed, not shout. A circle,
because in the shape grammar circles mean state or identity.`}},__svelteCsf:{rawCode:`<StatusDot {...args} />`}}});var v=l(f,2);z(v,{name:`Service health`,asChild:!0,children:(e,n)=>{E(e,{gap:`sm`,style:`max-width: 24rem`,children:(e,n)=>{var a=s(),d=i(a);g(d,1,()=>B,e=>e.name,(e,n)=>{P(e,{justify:`between`,children:(e,a)=>{var s=V(),d=i(s);A(d,{weight:`medium`,children:(e,i)=>{c();var a=r();t(()=>u(a,o(n).name)),_(e,a)},$$slots:{default:!0}});var f=l(d,2);{let e=h(()=>o(n).tone===`danger`);I(f,{get tone(){return o(n).tone},get label(){return o(n).label},get pulse(){return o(e)}})}_(e,s)},$$slots:{default:!0}})}),_(e,a)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"A status page row per service; `pulse` only on the states that need attention."}},__svelteCsf:{rawCode:`<Card gap="sm" style="max-width: 24rem">
  {#each services as s (s.name)}
    <Row justify="between">
      <Text weight="medium">{s.name}</Text>
      <StatusDot tone={s.tone} label={s.label} pulse={s.tone === 'danger'} />
    </Row>
  {/each}
</Card>`}}});var y=l(v,2);z(y,{name:`Presence`,asChild:!0,children:(e,t)=>{M(e,{gap:`sm`,children:(e,t)=>{var n=U(),a=i(n);P(a,{gap:`sm`,children:(e,t)=>{var n=H(),a=i(n);O(a,{name:`Jane Doe`,color:`auto`});var o=l(a);A(o,{children:(e,t)=>{c();var n=r(`Jane Doe`);_(e,n)},$$slots:{default:!0}});var s=l(o);I(s,{tone:`ok`,"aria-label":`Online`}),_(e,n)},$$slots:{default:!0}});var o=l(a,2);P(o,{gap:`sm`,children:(e,t)=>{var n=H(),a=i(n);O(a,{name:`Sam Rivera`,color:`auto`});var o=l(a);A(o,{children:(e,t)=>{c();var n=r(`Sam Rivera`);_(e,n)},$$slots:{default:!0}});var s=l(o);I(s,{tone:`warn`,"aria-label":`Away`}),_(e,n)},$$slots:{default:!0}});var s=l(o,2);P(s,{gap:`sm`,children:(e,t)=>{var n=H(),a=i(n);O(a,{name:`Robin Park`,color:`auto`});var o=l(a);A(o,{children:(e,t)=>{c();var n=r(`Robin Park`);_(e,n)},$$slots:{default:!0}});var s=l(o);I(s,{"aria-label":`Offline`}),_(e,n)},$$slots:{default:!0}}),_(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"Presence next to people. Without a label, `aria-label` says what the dot means."}},__svelteCsf:{rawCode:`<Stack gap="sm">
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
</Stack>`}}}),_(e,a),m()}var R,z,B,V,H,U,W,G,K,q,J;function Y(){return(Y=e((()=>{a(),v(),y(),N(),j(),D(),T(),F(),k(),w(),f(),b(),R={title:`Atoms/StatusDot`,component:I,tags:[`autodocs`],args:{tone:`ok`,label:`Operational`,pulse:!0,size:`md`},argTypes:{tone:{control:`select`,options:[`ok`,`warn`,`danger`,`info`,`neutral`,`accent`,...C]},size:{control:`inline-radio`,options:[`sm`,`md`,`lg`]}}},{Story:z}=x(R),B=[{name:`API`,tone:`ok`,label:`Operational`},{name:`Search`,tone:`warn`,label:`Degraded`},{name:`Uploads`,tone:`danger`,label:`Outage`},{name:`Billing`,tone:`neutral`,label:`Maintenance`}],V=n(`<!> <!>`,1),H=n(`<!><!><!>`,1),U=n(`<!> <!> <!>`,1),L.__docgen={data:[],name:`StatusDot.stories.svelte`},W=S(L,R),G=[`Playground`,`ServiceHealth`,`Presence`],K={...W.Playground,tags:[`svelte-csf-v5`]},q={...W.ServiceHealth,tags:[`svelte-csf-v5`]},J={...W.Presence,tags:[`svelte-csf-v5`]}})))()}Y();export{K as Playground,J as Presence,q as ServiceHealth,G as __namedExportsOrder,R as default};