import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{An as t,Cn as n,Ct as r,Ft as i,Gt as a,Ht as o,Pt as s,Wt as c,_n as l,cn as u,jn as d,l as f,on as p,wn as ee,xt as m,zt as h}from"./iframe-D3QpTFc1.js";import{i as g,n as _,r as v,t as y}from"./create-runtime-stories-bgfxAijx.js";import{n as b,t as x}from"./Button-DO5WmEfH.js";import{n as S,t as C}from"./Select-DMkHx1Lr.js";import{n as w,t as te}from"./Card-VkCagOi8.js";import{n as T,t as ne}from"./Avatar-CouXfpGm.js";import{n as re,t as ie}from"./Grid-CRR54iID.js";import{n as E,t as ae}from"./Stack-DIO0U5nL.js";import{n as oe,t as se}from"./Textarea-Dq6zWToQ.js";import{n as ce,t as D}from"./ConfirmButton-5t4XKimU.js";import{n as le,t as O}from"./StatusText-S7DFz0tc.js";import{S as ue,l as de,t as k}from"./mock-CoQSv9oT.js";import{n as fe,t as A}from"./Markdown-ZNamIQLn.js";import{n as pe,t as j}from"./ResultPanel-CWKwQHjN.js";import{i as me,n as he,r as ge,t as M}from"./StatusCard-Qr5ypwt7.js";import{n as N,t as P}from"./ResourceList-SvTzs691.js";function F(e,r){ee(r,!0);let i=u(`Wir suchen ein Tagungshotel in Leipzig für 300 Personen.`),s=u(`de`),f=u(`en`),g=u(c(ue()));var _=W(),v=h(_);L(v,{name:`ResultPanel states`,asChild:!0,children:(e,t)=>{ie(e,{min:`18rem`,children:(e,t)=>{var n=B(),r=h(n);j(r,{status:`empty`,title:`Answer`,placeholder:`Ask a question to see the answer.`});var i=o(r,2);j(i,{status:`loading`,title:`Answer`,loadingLabel:`Thinking…`,children:(e,t)=>{{let t=l(()=>k.slice(0,160));A(e,{get source(){return a(t)}})}},$$slots:{default:!0}});var s=o(i,2);j(s,{status:`ready`,title:`Answer`,get copyValue(){return k},headerEnd:e=>{O(e,{tone:`ok`,message:`Done`})},children:(e,t)=>{{let t=l(()=>k.slice(0,260));A(e,{get source(){return a(t)},size:`sm`})}},$$slots:{headerEnd:!0,default:!0}});var c=o(s,2);j(c,{status:`error`,title:`Answer`,error:`Connection closed before the answer finished.`}),m(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"The four states of a tool's output: `empty` (a placeholder), `loading` (an overlay over the\n    previous result), `ready` (with a copy button and a status) and `error`."}},__svelteCsf:{rawCode:`<Grid min="18rem">
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
</Grid>`}}});var y=o(v,2);L(y,{name:`SplitPane`,asChild:!0,children:(e,t)=>{ge(e,{label:`Translator`,onswap:()=>(e=>{var t=d(e,2);return p(s,t[0],!0),p(f,t[1],!0),e})([a(f),a(s)]),startHeader:e=>{var t=V(),n=h(t);C(n,{"aria-label":`Source language`,get options(){return R},get value(){return a(s)},set value(e){p(s,e,!0)}});var r=o(n,2);O(r,{message:`detected · German`}),m(e,t)},endHeader:e=>{C(e,{"aria-label":`Target language`,get options(){return R},get value(){return a(f)},set value(e){p(f,e,!0)}})},start:e=>{se(e,{variant:`plain`,counter:!0,limit:500,"aria-label":`Text`,get value(){return a(i)},set value(e){p(i,e,!0)}})},end:e=>{ae(e,{padding:`md`,children:(e,t)=>{var n=H();m(e,n)},$$slots:{default:!0}})},$$slots:{startHeader:!0,endHeader:!0,start:!0,end:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Two panes on one card — a text and its translation. The glass bead between the headers swaps
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
</SplitPane>`}}});var b=o(y,2);L(b,{name:`ResourceList`,asChild:!0,children:(e,n)=>{te(e,{title:`Workspaces`,get count(){return a(g).length},children:(e,n)=>{P(e,{get items(){return a(g)},key:e=>e.id,title:e=>e.name,meta:e=>`${e.volume} · created ${e.created}`,status:e=>z[e.status],label:`Workspaces`,leading:(e,n=t)=>{ne(e,{get name(){return n().name},size:32})},actions:(e,n=t)=>{var r=U(),i=h(r);{let e=l(()=>n().status!==`running`);x(i,{size:`sm`,icon:`external`,label:`Open`,iconOnly:!0,href:`https://example.com`,get disabled(){return a(e)}})}var s=o(i,2);{let e=l(()=>n().status===`running`?`pause`:`play`),t=l(()=>n().status===`running`?`Stop`:`Start`),r=l(()=>n().status===`starting`);x(s,{size:`sm`,get icon(){return a(e)},get label(){return a(t)},iconOnly:!0,get busy(){return a(r)}})}var c=o(s,2);D(c,{size:`sm`,label:`Delete`,confirmLabel:`Delete`,onconfirm:()=>p(g,a(g).filter(e=>e.id!==n().id),!0)}),m(e,r)},$$slots:{leading:!0,actions:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Things you run or own, one row each: a leading slot, title and meta, a status badge (with a
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
</Card>`}}});var S=o(b,2);L(S,{name:`StatusCard working`,asChild:!0,children:(e,t)=>{M(e,{status:`working`,title:`Signing you in`,message:`Checking your session…`})},$$slots:{default:!0},parameters:{docs:{description:{story:`A moment between pages, e.g. back from a sign-in provider.`}},__svelteCsf:{rawCode:`<StatusCard status="working" title="Signing you in" message="Checking your session…" />`}}});var w=o(S,2);L(w,{name:`StatusCard success`,asChild:!0,children:(e,t)=>{M(e,{status:`success`,title:`Device activated`,message:`You can close this window and return to your device.`})},$$slots:{default:!0},parameters:{docs:{description:{story:`Success: the badge pops, the tick draws itself in and a few sprinkles fly, once. Errors
    arrive with a plain fade.`}},__svelteCsf:{rawCode:`<StatusCard
  status="success"
  title="Device activated"
  message="You can close this window and return to your device."
/>`}}});var T=o(w,2);L(T,{name:`StatusCard error with redirect`,asChild:!0,children:(e,t)=>{M(e,{status:`error`,title:`Sign-in failed`,message:`The sign-in link has expired.`,redirectTo:`#login`,redirectIn:5,continueLabel:`Sign in again`,onredirect:()=>{}})},$$slots:{default:!0},parameters:{docs:{description:{story:"An error that sends people on: counts down `redirectIn` seconds, with a link to go at once."}},__svelteCsf:{rawCode:`<StatusCard
  status="error"
  title="Sign-in failed"
  message="The sign-in link has expired."
  redirectTo="#login"
  redirectIn={5}
  continueLabel="Sign in again"
  onredirect={() => {}}
/>`}}}),m(e,_),n()}var I,L,R,z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q;function $(){return($=e((()=>{i(),s(),g(),N(),pe(),me(),he(),T(),b(),w(),S(),le(),oe(),fe(),ce(),re(),E(),de(),f(),_(),I={title:`Organisms/Panels, lists & status cards`,component:j,tags:[`autodocs`],parameters:{layout:`padded`}},{Story:L}=v(I),R=[{value:`de`,label:`German`},{value:`en`,label:`English`},{value:`fr`,label:`French`}],z={running:{label:`Running`,tone:`live`},stopped:{label:`Stopped`,tone:`locked`},starting:{label:`Starting`,tone:`draft`,busy:!0}},B=r(`<!> <!> <!> <!>`,1),V=r(`<!> <!>`,1),H=r(`<p>We are looking for a conference hotel in Leipzig for 300 people.</p>`),U=r(`<!> <!> <!>`,1),W=r(`<!> <!> <!> <!> <!> <!>`,1),F.__docgen={data:[],name:`Workspaces.stories.svelte`},G=y(F,I),K=[`ResultPanelStates`,`SplitPane`,`ResourceList`,`StatusCardWorking`,`StatusCardSuccess`,`StatusCardErrorWithRedirect`],q={...G.ResultPanelStates,tags:[`svelte-csf-v5`]},J={...G.SplitPane,tags:[`svelte-csf-v5`]},Y={...G.ResourceList,tags:[`svelte-csf-v5`]},X={...G.StatusCardWorking,tags:[`svelte-csf-v5`]},Z={...G.StatusCardSuccess,tags:[`svelte-csf-v5`]},Q={...G.StatusCardErrorWithRedirect,tags:[`svelte-csf-v5`]}})))()}$();export{Y as ResourceList,q as ResultPanelStates,J as SplitPane,Q as StatusCardErrorWithRedirect,Z as StatusCardSuccess,X as StatusCardWorking,K as __namedExportsOrder,I as default};