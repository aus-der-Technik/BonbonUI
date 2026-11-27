import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{$t as t,Cn as n,Ct as r,Dt as i,Ft as a,Gt as o,Ht as s,Nn as c,Pt as l,St as u,_t as d,hn as f,l as p,m,tt as h,wn as g,xt as _,zt as v}from"./iframe-D3QpTFc1.js";import{a as y,i as b,n as x,r as S,t as C}from"./create-runtime-stories-bgfxAijx.js";import{i as w,n as T}from"./palette-DNwFBI2z.js";import{n as E,t as D}from"./Card-VkCagOi8.js";import{n as O,t as k}from"./Avatar-CouXfpGm.js";import{n as A,t as j}from"./Text-BTTrRnHh.js";import{n as M,t as N}from"./Stack-DIO0U5nL.js";import{n as P,t as F}from"./Row-B0vuEKpz.js";import{n as I,t as L}from"./StatusDot-WuX4TIrQ.js";function R(e,r){g(r,!1),m();var a=W(),l=v(a);B(l,{name:`Playground`,parameters:{docs:{description:{story:`A lit bead with a quiet halo, not a neon glow: status should be noticed, not shout. A circle,
because in the shape grammar circles mean state or identity.`}},__svelteCsf:{rawCode:`<StatusDot {...args} />`}}});var p=s(l,2);B(p,{name:`Service health`,asChild:!0,children:(e,n)=>{D(e,{gap:`sm`,style:`max-width: 24rem`,children:(e,n)=>{var r=u(),a=v(r);h(a,1,()=>V,e=>e.name,(e,n)=>{F(e,{justify:`between`,children:(e,r)=>{var a=H(),l=v(a);j(l,{weight:`medium`,children:(e,r)=>{c();var a=i();t(()=>d(a,o(n).name)),_(e,a)},$$slots:{default:!0}});var u=s(l,2);{let e=f(()=>o(n).tone===`danger`);L(u,{get tone(){return o(n).tone},get label(){return o(n).label},get pulse(){return o(e)}})}_(e,a)},$$slots:{default:!0}})}),_(e,r)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"A status page row per service; `pulse` only on the states that need attention."}},__svelteCsf:{rawCode:`<Card gap="sm" style="max-width: 24rem">
  {#each services as s (s.name)}
    <Row justify="between">
      <Text weight="medium">{s.name}</Text>
      <StatusDot tone={s.tone} label={s.label} pulse={s.tone === 'danger'} />
    </Row>
  {/each}
</Card>`}}});var y=s(p,2);B(y,{name:`Presence`,asChild:!0,children:(e,t)=>{N(e,{gap:`sm`,children:(e,t)=>{var n=W(),r=v(n);F(r,{gap:`sm`,children:(e,t)=>{var n=U(),r=v(n);k(r,{name:`Jane Doe`,color:`auto`});var a=s(r);j(a,{children:(e,t)=>{c();var n=i(`Jane Doe`);_(e,n)},$$slots:{default:!0}});var o=s(a);L(o,{tone:`ok`,"aria-label":`Online`}),_(e,n)},$$slots:{default:!0}});var a=s(r,2);F(a,{gap:`sm`,children:(e,t)=>{var n=U(),r=v(n);k(r,{name:`Sam Rivera`,color:`auto`});var a=s(r);j(a,{children:(e,t)=>{c();var n=i(`Sam Rivera`);_(e,n)},$$slots:{default:!0}});var o=s(a);L(o,{tone:`warn`,"aria-label":`Away`}),_(e,n)},$$slots:{default:!0}});var o=s(a,2);F(o,{gap:`sm`,children:(e,t)=>{var n=U(),r=v(n);k(r,{name:`Robin Park`,color:`auto`});var a=s(r);j(a,{children:(e,t)=>{c();var n=i(`Robin Park`);_(e,n)},$$slots:{default:!0}});var o=s(a);L(o,{"aria-label":`Offline`}),_(e,n)},$$slots:{default:!0}}),_(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"Presence next to people. Without a label, `aria-label` says what the dot means."}},__svelteCsf:{rawCode:`<Stack gap="sm">
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
</Stack>`}}}),_(e,a),n()}var z,B,V,H,U,W,G,K,q,J,Y;function X(){return(X=e((()=>{a(),l(),y(),b(),P(),M(),O(),E(),I(),A(),T(),p(),x(),z={title:`Atoms/StatusDot`,component:L,tags:[`autodocs`],args:{tone:`ok`,label:`Operational`,pulse:!0,size:`md`},argTypes:{tone:{control:`select`,options:[`ok`,`warn`,`danger`,`info`,`neutral`,`accent`,...w]},size:{control:`inline-radio`,options:[`sm`,`md`,`lg`]}}},{Story:B}=S(z),V=[{name:`API`,tone:`ok`,label:`Operational`},{name:`Search`,tone:`warn`,label:`Degraded`},{name:`Uploads`,tone:`danger`,label:`Outage`},{name:`Billing`,tone:`neutral`,label:`Maintenance`}],H=r(`<!> <!>`,1),U=r(`<!><!><!>`,1),W=r(`<!> <!> <!>`,1),R.__docgen={data:[],name:`StatusDot.stories.svelte`},G=C(R,z),K=[`Playground`,`ServiceHealth`,`Presence`],q={...G.Playground,tags:[`svelte-csf-v5`]},J={...G.ServiceHealth,tags:[`svelte-csf-v5`]},Y={...G.Presence,tags:[`svelte-csf-v5`]}})))()}X();export{q as Playground,Y as Presence,J as ServiceHealth,K as __namedExportsOrder,z as default};