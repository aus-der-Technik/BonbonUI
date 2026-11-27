import{n as e}from"./rolldown-runtime-Dxh6kD9_.js";import{Ct as t,Ft as n,Gt as r,Ht as i,On as a,Pt as o,Sn as s,Wt as c,cn as l,hn as u,kn as d,l as f,on as p,xn as ee,xt as m,zt as h}from"./iframe-WlNMZtZ0.js";import{i as g,n as _,r as v,t as y}from"./create-runtime-stories-CbHiKinS.js";import{n as b,t as x}from"./Button-DHLILcYm.js";import{n as S,t as C}from"./Select-CYAMxfVl.js";import{n as w,t as te}from"./Card-BqZAAHlF.js";import{n as T,t as ne}from"./Avatar-DNIQ76Cs.js";import{n as re,t as ie}from"./Grid-CbFksUeV.js";import{n as E,t as ae}from"./Stack-BjV-rmuj.js";import{n as oe,t as se}from"./Textarea-C7wLXt7k.js";import{n as ce,t as D}from"./ConfirmButton-DIh3Xs2_.js";import{n as le,t as O}from"./StatusText-f0ritOei.js";import{S as ue,l as de,t as k}from"./mock-CO6eygD8.js";import{n as fe,t as A}from"./Markdown-CkYwfUbE.js";import{n as pe,t as j}from"./ResultPanel-DafhIunu.js";import{i as me,n as he,r as ge,t as M}from"./StatusCard-BN5LI0bl.js";import{n as N,t as P}from"./ResourceList-DkaJ46uJ.js";function F(e,t){s(t,!0);let n=l(`Wir suchen ein Tagungshotel in Leipzig für 300 Personen.`),o=l(`de`),f=l(`en`),g=l(c(ue()));var _=W(),v=h(_);L(v,{name:`ResultPanel states`,asChild:!0,children:(e,t)=>{ie(e,{min:`18rem`,children:(e,t)=>{var n=B(),a=h(n);j(a,{status:`empty`,title:`Answer`,placeholder:`Ask a question to see the answer.`});var o=i(a,2);j(o,{status:`loading`,title:`Answer`,loadingLabel:`Thinking…`,children:(e,t)=>{{let t=u(()=>k.slice(0,160));A(e,{get source(){return r(t)}})}},$$slots:{default:!0}});var s=i(o,2);j(s,{status:`ready`,title:`Answer`,get copyValue(){return k},headerEnd:e=>{O(e,{tone:`ok`,message:`Done`})},children:(e,t)=>{{let t=u(()=>k.slice(0,260));A(e,{get source(){return r(t)},size:`sm`})}},$$slots:{headerEnd:!0,default:!0}});var c=i(s,2);j(c,{status:`error`,title:`Answer`,error:`Connection closed before the answer finished.`}),m(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"The four states of a tool's output: `empty` (a placeholder), `loading` (an overlay over the\n    previous result), `ready` (with a copy button and a status) and `error`."}},__svelteCsf:{rawCode:`<Grid min="18rem">
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
</Grid>`}}});var y=i(v,2);L(y,{name:`SplitPane`,asChild:!0,children:(e,t)=>{ge(e,{label:`Translator`,onswap:()=>(e=>{var t=d(e,2);return p(o,t[0],!0),p(f,t[1],!0),e})([r(f),r(o)]),startHeader:e=>{var t=V(),n=h(t);C(n,{"aria-label":`Source language`,get options(){return R},get value(){return r(o)},set value(e){p(o,e,!0)}});var a=i(n,2);O(a,{message:`detected · German`}),m(e,t)},endHeader:e=>{C(e,{"aria-label":`Target language`,get options(){return R},get value(){return r(f)},set value(e){p(f,e,!0)}})},start:e=>{se(e,{variant:`plain`,counter:!0,limit:500,"aria-label":`Text`,get value(){return r(n)},set value(e){p(n,e,!0)}})},end:e=>{ae(e,{padding:`md`,children:(e,t)=>{var n=H();m(e,n)},$$slots:{default:!0}})},$$slots:{startHeader:!0,endHeader:!0,start:!0,end:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Two panes on one card — a text and its translation. The glass bead between the headers swaps
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
</SplitPane>`}}});var b=i(y,2);L(b,{name:`ResourceList`,asChild:!0,children:(e,t)=>{te(e,{title:`Workspaces`,get count(){return r(g).length},children:(e,t)=>{P(e,{get items(){return r(g)},key:e=>e.id,title:e=>e.name,meta:e=>`${e.volume} · created ${e.created}`,status:e=>z[e.status],label:`Workspaces`,leading:(e,t=a)=>{ne(e,{get name(){return t().name},size:32})},actions:(e,t=a)=>{var n=U(),o=h(n);{let e=u(()=>t().status!==`running`);x(o,{size:`sm`,icon:`external`,label:`Open`,iconOnly:!0,href:`https://example.com`,get disabled(){return r(e)}})}var s=i(o,2);{let e=u(()=>t().status===`running`?`pause`:`play`),n=u(()=>t().status===`running`?`Stop`:`Start`),i=u(()=>t().status===`starting`);x(s,{size:`sm`,get icon(){return r(e)},get label(){return r(n)},iconOnly:!0,get busy(){return r(i)}})}var c=i(s,2);D(c,{size:`sm`,label:`Delete`,confirmLabel:`Delete`,onconfirm:()=>p(g,r(g).filter(e=>e.id!==t().id),!0)}),m(e,n)},$$slots:{leading:!0,actions:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Things you run or own, one row each: a leading slot, title and meta, a status badge (with a
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
</Card>`}}});var S=i(b,2);L(S,{name:`StatusCard working`,asChild:!0,children:(e,t)=>{M(e,{status:`working`,title:`Signing you in`,message:`Checking your session…`})},$$slots:{default:!0},parameters:{docs:{description:{story:`A moment between pages, e.g. back from a sign-in provider.`}},__svelteCsf:{rawCode:`<StatusCard status="working" title="Signing you in" message="Checking your session…" />`}}});var w=i(S,2);L(w,{name:`StatusCard success`,asChild:!0,children:(e,t)=>{M(e,{status:`success`,title:`Device activated`,message:`You can close this window and return to your device.`})},$$slots:{default:!0},parameters:{docs:{description:{story:`Success: the badge pops, the tick draws itself in and a few sprinkles fly, once. Errors
    arrive with a plain fade.`}},__svelteCsf:{rawCode:`<StatusCard
  status="success"
  title="Device activated"
  message="You can close this window and return to your device."
/>`}}});var T=i(w,2);L(T,{name:`StatusCard error with redirect`,asChild:!0,children:(e,t)=>{M(e,{status:`error`,title:`Sign-in failed`,message:`The sign-in link has expired.`,redirectTo:`#login`,redirectIn:5,continueLabel:`Sign in again`,onredirect:()=>{}})},$$slots:{default:!0},parameters:{docs:{description:{story:"An error that sends people on: counts down `redirectIn` seconds, with a link to go at once."}},__svelteCsf:{rawCode:`<StatusCard
  status="error"
  title="Sign-in failed"
  message="The sign-in link has expired."
  redirectTo="#login"
  redirectIn={5}
  continueLabel="Sign in again"
  onredirect={() => {}}
/>`}}}),m(e,_),ee()}var I,L,R,z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q;function $(){return($=e((()=>{n(),o(),g(),N(),pe(),me(),he(),T(),b(),w(),S(),le(),oe(),fe(),ce(),re(),E(),de(),f(),_(),I={title:`Organisms/Panels, lists & status cards`,component:j,tags:[`autodocs`],parameters:{layout:`padded`}},{Story:L}=v(I),R=[{value:`de`,label:`German`},{value:`en`,label:`English`},{value:`fr`,label:`French`}],z={running:{label:`Running`,tone:`live`},stopped:{label:`Stopped`,tone:`locked`},starting:{label:`Starting`,tone:`draft`,busy:!0}},B=t(`<!> <!> <!> <!>`,1),V=t(`<!> <!>`,1),H=t(`<p>We are looking for a conference hotel in Leipzig for 300 people.</p>`),U=t(`<!> <!> <!>`,1),W=t(`<!> <!> <!> <!> <!> <!>`,1),F.__docgen={data:[],name:`Workspaces.stories.svelte`},G=y(F,I),K=[`ResultPanelStates`,`SplitPane`,`ResourceList`,`StatusCardWorking`,`StatusCardSuccess`,`StatusCardErrorWithRedirect`],q={...G.ResultPanelStates,tags:[`svelte-csf-v5`]},J={...G.SplitPane,tags:[`svelte-csf-v5`]},Y={...G.ResourceList,tags:[`svelte-csf-v5`]},X={...G.StatusCardWorking,tags:[`svelte-csf-v5`]},Z={...G.StatusCardSuccess,tags:[`svelte-csf-v5`]},Q={...G.StatusCardErrorWithRedirect,tags:[`svelte-csf-v5`]}})))()}$();export{Y as ResourceList,q as ResultPanelStates,J as SplitPane,Q as StatusCardErrorWithRedirect,Z as StatusCardSuccess,X as StatusCardWorking,K as __namedExportsOrder,I as default};