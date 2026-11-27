import{n as e}from"./rolldown-runtime-Dxh6kD9_.js";import{$t as t,Ct as n,Dt as r,Ft as i,Gt as a,Ht as o,Pt as s,Sn as c,St as l,_t as u,jn as d,l as f,m as p,pn as m,tt as h,xn as g,xt as _,zt as v}from"./iframe-WlNMZtZ0.js";import{a as y,i as b,n as x,r as S,t as C}from"./create-runtime-stories-CbHiKinS.js";import{i as w,n as T}from"./palette-BHVCGfZQ.js";import{n as E,t as D}from"./Card-BqZAAHlF.js";import{n as O,t as k}from"./Avatar-DNIQ76Cs.js";import{n as A,t as j}from"./Text-DMhRT0Hz.js";import{n as M,t as N}from"./Stack-BjV-rmuj.js";import{n as P,t as F}from"./Row-IIXhUlbK.js";import{n as I,t as L}from"./StatusDot-CHlChGrX.js";function R(e,n){c(n,!1),p();var i=W(),s=v(i);B(s,{name:`Playground`,parameters:{docs:{description:{story:`A lit bead with a quiet halo, not a neon glow: status should be noticed, not shout. A circle,
because in the shape grammar circles mean state or identity.`}},__svelteCsf:{rawCode:`<StatusDot {...args} />`}}});var f=o(s,2);B(f,{name:`Service health`,asChild:!0,children:(e,n)=>{D(e,{gap:`sm`,style:`max-width: 24rem`,children:(e,n)=>{var i=l(),s=v(i);h(s,1,()=>V,e=>e.name,(e,n)=>{F(e,{justify:`between`,children:(e,i)=>{var s=H(),c=v(s);j(c,{weight:`medium`,children:(e,i)=>{d();var o=r();t(()=>u(o,a(n).name)),_(e,o)},$$slots:{default:!0}});var l=o(c,2);{let e=m(()=>a(n).tone===`danger`);L(l,{get tone(){return a(n).tone},get label(){return a(n).label},get pulse(){return a(e)}})}_(e,s)},$$slots:{default:!0}})}),_(e,i)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"A status page row per service; `pulse` only on the states that need attention."}},__svelteCsf:{rawCode:`<Card gap="sm" style="max-width: 24rem">
  {#each services as s (s.name)}
    <Row justify="between">
      <Text weight="medium">{s.name}</Text>
      <StatusDot tone={s.tone} label={s.label} pulse={s.tone === 'danger'} />
    </Row>
  {/each}
</Card>`}}});var y=o(f,2);B(y,{name:`Presence`,asChild:!0,children:(e,t)=>{N(e,{gap:`sm`,children:(e,t)=>{var n=W(),i=v(n);F(i,{gap:`sm`,children:(e,t)=>{var n=U(),i=v(n);k(i,{name:`Jane Doe`,color:`auto`});var a=o(i);j(a,{children:(e,t)=>{d();var n=r(`Jane Doe`);_(e,n)},$$slots:{default:!0}});var s=o(a);L(s,{tone:`ok`,"aria-label":`Online`}),_(e,n)},$$slots:{default:!0}});var a=o(i,2);F(a,{gap:`sm`,children:(e,t)=>{var n=U(),i=v(n);k(i,{name:`Sam Rivera`,color:`auto`});var a=o(i);j(a,{children:(e,t)=>{d();var n=r(`Sam Rivera`);_(e,n)},$$slots:{default:!0}});var s=o(a);L(s,{tone:`warn`,"aria-label":`Away`}),_(e,n)},$$slots:{default:!0}});var s=o(a,2);F(s,{gap:`sm`,children:(e,t)=>{var n=U(),i=v(n);k(i,{name:`Robin Park`,color:`auto`});var a=o(i);j(a,{children:(e,t)=>{d();var n=r(`Robin Park`);_(e,n)},$$slots:{default:!0}});var s=o(a);L(s,{"aria-label":`Offline`}),_(e,n)},$$slots:{default:!0}}),_(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"Presence next to people. Without a label, `aria-label` says what the dot means."}},__svelteCsf:{rawCode:`<Stack gap="sm">
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
</Stack>`}}}),_(e,i),g()}var z,B,V,H,U,W,G,K,q,J,Y;function X(){return(X=e((()=>{i(),s(),y(),b(),P(),M(),O(),E(),I(),A(),T(),f(),x(),z={title:`Atoms/StatusDot`,component:L,tags:[`autodocs`],args:{tone:`ok`,label:`Operational`,pulse:!0,size:`md`},argTypes:{tone:{control:`select`,options:[`ok`,`warn`,`danger`,`info`,`neutral`,`accent`,...w]},size:{control:`inline-radio`,options:[`sm`,`md`,`lg`]}}},{Story:B}=S(z),V=[{name:`API`,tone:`ok`,label:`Operational`},{name:`Search`,tone:`warn`,label:`Degraded`},{name:`Uploads`,tone:`danger`,label:`Outage`},{name:`Billing`,tone:`neutral`,label:`Maintenance`}],H=n(`<!> <!>`,1),U=n(`<!><!><!>`,1),W=n(`<!> <!> <!>`,1),R.__docgen={data:[],name:`StatusDot.stories.svelte`},G=C(R,z),K=[`Playground`,`ServiceHealth`,`Presence`],q={...G.Playground,tags:[`svelte-csf-v5`]},J={...G.ServiceHealth,tags:[`svelte-csf-v5`]},Y={...G.Presence,tags:[`svelte-csf-v5`]}})))()}X();export{q as Playground,Y as Presence,J as ServiceHealth,K as __namedExportsOrder,z as default};