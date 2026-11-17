import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Ct as t,Kt as n,Mn as r,Nn as i,Pt as a,Yt as o,Zt as s,cn as c,en as l,hn as u,jn as d,l as f,mn as ee,nn as p,xt as m}from"./iframe-CRBWUEFv.js";import{i as h,n as g,r as _,t as v}from"./create-runtime-stories-DtoOt73Q.js";import{n as y,t as b}from"./Button-CVctU_KR.js";import{n as x,t as S}from"./Select-DOm0NSxm.js";import{n as C,t as w}from"./Card-D32i3kW8.js";import{n as T,t as te}from"./Avatar-C7CjPSx1.js";import{n as E,t as ne}from"./Grid-DlBYjD7t.js";import{n as re,t as D}from"./Stack-DW7rWz1x.js";import{n as O,t as ie}from"./Textarea-OcH4kAQW.js";import{n as ae,t as oe}from"./ConfirmButton-CizcQltK.js";import{n as se,t as k}from"./StatusText-B74FOm1b.js";import{S as ce,l as le,t as A}from"./mock-CoQSv9oT.js";import{n as ue,t as j}from"./Markdown-CMTEvnhB.js";import{n as de,t as M}from"./ResultPanel-BfoQDAaQ.js";import{i as fe,n as pe,r as me,t as N}from"./StatusCard-C6hhgb9c.js";import{n as he,t as P}from"./ResourceList-D4r-zvKq.js";function F(e,t){u(t,!0);let i=p(`Wir suchen ein Tagungshotel in Leipzig für 300 Personen.`),f=p(`de`),h=p(`en`),g=p(s(ce()));var _=W(),v=n(_);L(v,{name:`ResultPanel states`,asChild:!0,children:(e,t)=>{ne(e,{min:`18rem`,children:(e,t)=>{var r=B(),i=n(r);M(i,{status:`empty`,title:`Answer`,placeholder:`Ask a question to see the answer.`});var s=o(i,2);M(s,{status:`loading`,title:`Answer`,loadingLabel:`Thinking…`,children:(e,t)=>{{let t=c(()=>A.slice(0,160));j(e,{get source(){return a(t)}})}},$$slots:{default:!0}});var l=o(s,2);M(l,{status:`ready`,title:`Answer`,get copyValue(){return A},headerEnd:e=>{k(e,{tone:`ok`,message:`Done`})},children:(e,t)=>{{let t=c(()=>A.slice(0,260));j(e,{get source(){return a(t)},size:`sm`})}},$$slots:{headerEnd:!0,default:!0}});var u=o(l,2);M(u,{status:`error`,title:`Answer`,error:`Connection closed before the answer finished.`}),m(e,r)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"The four states of a tool's output: `empty` (a placeholder), `loading` (an overlay over the\n    previous result), `ready` (with a copy button and a status) and `error`."}},__svelteCsf:{rawCode:`<Grid min="18rem">
  <ResultPanel status="empty" title="Answer" placeholder="Ask a question to see the answer." />
  <ResultPanel status="loading" title="Answer" loadingLabel="Thinking…">
    <Markdown source={ANSWER.slice(0, 160)} />
  </ResultPanel>
  <ResultPanel status="ready" title="Answer" copyValue={ANSWER}>
    {#snippet headerEnd()}<StatusText tone="ok" message="Done" />{/snippet}
    <Markdown source={ANSWER.slice(0, 260)} size="sm" />
  </ResultPanel>
  <ResultPanel
    status="error"
    title="Answer"
    error="Connection closed before the answer finished."
  />
</Grid>`}}});var y=o(v,2);L(y,{name:`SplitPane`,asChild:!0,children:(e,t)=>{me(e,{label:`Translator`,onswap:()=>(e=>{var t=r(e,2);return l(f,t[0],!0),l(h,t[1],!0),e})([a(h),a(f)]),startHeader:e=>{var t=V(),r=n(t);S(r,{"aria-label":`Source language`,get options(){return R},get value(){return a(f)},set value(e){l(f,e,!0)}});var i=o(r,2);k(i,{message:`detected · German`}),m(e,t)},endHeader:e=>{S(e,{"aria-label":`Target language`,get options(){return R},get value(){return a(h)},set value(e){l(h,e,!0)}})},start:e=>{ie(e,{variant:`plain`,counter:!0,limit:500,"aria-label":`Text`,get value(){return a(i)},set value(e){l(i,e,!0)}})},end:e=>{D(e,{padding:`md`,children:(e,t)=>{var n=H();m(e,n)},$$slots:{default:!0}})},$$slots:{startHeader:!0,endHeader:!0,start:!0,end:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Two panes on one card — a text and its translation. The glass bead between the headers swaps
    them (it turns on hover). Stacks on phones.`}},__svelteCsf:{rawCode:`<SplitPane label="Translator" onswap={() => ([from, to] = [to, from])}>
  {#snippet startHeader()}
    <Select aria-label="Source language" bind:value={from} options={langs} />
    <StatusText message="detected · German" />
  {/snippet}
  {#snippet endHeader()}
    <Select aria-label="Target language" bind:value={to} options={langs} />
  {/snippet}
  {#snippet start()}
    <Textarea variant="plain" bind:value={source} counter limit={500} aria-label="Text" />
  {/snippet}
  {#snippet end()}
    <Stack padding="md">
      <p>We are looking for a conference hotel in Leipzig for 300 people.</p>
    </Stack>
  {/snippet}
</SplitPane>`}}});var x=o(y,2);L(x,{name:`ResourceList`,asChild:!0,children:(e,t)=>{w(e,{title:`Workspaces`,get count(){return a(g).length},children:(e,t)=>{P(e,{get items(){return a(g)},key:e=>e.id,title:e=>e.name,meta:e=>`${e.volume} · created ${e.created}`,status:e=>z[e.status],label:`Workspaces`,leading:(e,t=d)=>{te(e,{get name(){return t().name},size:32})},actions:(e,t=d)=>{var r=U(),i=n(r);{let e=c(()=>t().status!==`running`);b(i,{size:`sm`,icon:`external`,label:`Open`,iconOnly:!0,href:`https://example.com`,get disabled(){return a(e)}})}var s=o(i,2);{let e=c(()=>t().status===`running`?`pause`:`play`),n=c(()=>t().status===`running`?`Stop`:`Start`),r=c(()=>t().status===`starting`);b(s,{size:`sm`,get icon(){return a(e)},get label(){return a(n)},iconOnly:!0,get busy(){return a(r)}})}var u=o(s,2);oe(u,{size:`sm`,label:`Delete`,confirmLabel:`Delete`,onconfirm:()=>l(g,a(g).filter(e=>e.id!==t().id),!0)}),m(e,r)},$$slots:{leading:!0,actions:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Things you run or own, one row each: a leading slot, title and meta, a status badge (with a
    spinner while starting) and per-row actions.`}},__svelteCsf:{rawCode:`<Card title="Workspaces" count={items.length}>
  <ResourceList
    {items}
    key={(w) => w.id}
    title={(w) => w.name}
    meta={(w) => \`\${w.volume} · created \${w.created}\`}
    status={(w) => statusOf[w.status]}
    label="Workspaces"
  >
    {#snippet leading(w)}<Avatar name={w.name} size={32} />{/snippet}
    {#snippet actions(w)}
      <Button
        size="sm"
        icon="external"
        label="Open"
        iconOnly
        href="https://example.com"
        disabled={w.status !== 'running'}
      />
      <Button
        size="sm"
        icon={w.status === 'running' ? 'pause' : 'play'}
        label={w.status === 'running' ? 'Stop' : 'Start'}
        iconOnly
        busy={w.status === 'starting'}
      />
      <ConfirmButton
        size="sm"
        label="Delete"
        confirmLabel="Delete"
        onconfirm={() => (items = items.filter((i) => i.id !== w.id))}
      />
    {/snippet}
  </ResourceList>
</Card>`}}});var C=o(x,2);L(C,{name:`StatusCard working`,asChild:!0,children:(e,t)=>{N(e,{status:`working`,title:`Signing you in`,message:`Checking your session…`})},$$slots:{default:!0},parameters:{docs:{description:{story:`A moment between pages, e.g. back from a sign-in provider.`}},__svelteCsf:{rawCode:`<StatusCard status="working" title="Signing you in" message="Checking your session…" />`}}});var T=o(C,2);L(T,{name:`StatusCard success`,asChild:!0,children:(e,t)=>{N(e,{status:`success`,title:`Device activated`,message:`You can close this window and return to your device.`})},$$slots:{default:!0},parameters:{docs:{description:{story:`Success: the badge pops, the tick draws itself in and a few sprinkles fly, once. Errors
    arrive with a plain fade.`}},__svelteCsf:{rawCode:`<StatusCard
  status="success"
  title="Device activated"
  message="You can close this window and return to your device."
/>`}}});var E=o(T,2);L(E,{name:`StatusCard error with redirect`,asChild:!0,children:(e,t)=>{N(e,{status:`error`,title:`Sign-in failed`,message:`The sign-in link has expired.`,redirectTo:`#login`,redirectIn:5,continueLabel:`Sign in again`,onredirect:()=>{}})},$$slots:{default:!0},parameters:{docs:{description:{story:"An error that sends people on: counts down `redirectIn` seconds, with a link to go at once."}},__svelteCsf:{rawCode:`<StatusCard
  status="error"
  title="Sign-in failed"
  message="The sign-in link has expired."
  redirectTo="#login"
  redirectIn={5}
  continueLabel="Sign in again"
  onredirect={() => {}}
/>`}}}),m(e,_),ee()}var I,L,R,z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q;function $(){return($=e((()=>{i(),h(),he(),de(),fe(),pe(),T(),y(),C(),x(),se(),O(),ue(),ae(),E(),re(),le(),f(),g(),I={title:`Organisms/Panels, lists & status cards`,component:M,tags:[`autodocs`],parameters:{layout:`padded`}},{Story:L}=_(I),R=[{value:`de`,label:`German`},{value:`en`,label:`English`},{value:`fr`,label:`French`}],z={running:{label:`Running`,tone:`live`},stopped:{label:`Stopped`,tone:`locked`},starting:{label:`Starting`,tone:`draft`,busy:!0}},B=t(`<!> <!> <!> <!>`,1),V=t(`<!> <!>`,1),H=t(`<p>We are looking for a conference hotel in Leipzig for 300 people.</p>`),U=t(`<!> <!> <!>`,1),W=t(`<!> <!> <!> <!> <!> <!>`,1),F.__docgen={data:[],name:`Workspaces.stories.svelte`},G=v(F,I),K=[`ResultPanelStates`,`SplitPane`,`ResourceList`,`StatusCardWorking`,`StatusCardSuccess`,`StatusCardErrorWithRedirect`],q={...G.ResultPanelStates,tags:[`svelte-csf-v5`]},J={...G.SplitPane,tags:[`svelte-csf-v5`]},Y={...G.ResourceList,tags:[`svelte-csf-v5`]},X={...G.StatusCardWorking,tags:[`svelte-csf-v5`]},Z={...G.StatusCardSuccess,tags:[`svelte-csf-v5`]},Q={...G.StatusCardErrorWithRedirect,tags:[`svelte-csf-v5`]}})))()}$();export{Y as ResourceList,q as ResultPanelStates,J as SplitPane,Q as StatusCardErrorWithRedirect,Z as StatusCardSuccess,X as StatusCardWorking,K as __namedExportsOrder,I as default};