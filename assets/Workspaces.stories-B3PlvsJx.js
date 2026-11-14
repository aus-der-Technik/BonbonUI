import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{An as t,Mt as n,Qt as r,St as i,Wt as a,Yt as o,bt as s,en as c,fn as l,jn as u,kn as d,l as f,on as p,pn as ee,qt as m}from"./iframe-CJu7z9ED.js";import{i as h,n as g,r as _,t as v}from"./create-runtime-stories-CaxQI1vi.js";import{n as y,t as b}from"./Button-B6mW7nXy.js";import{n as x,t as S}from"./Select-2LFVAZUy.js";import{n as C,t as w}from"./Card-BEiz5QpG.js";import{n as T,t as te}from"./Avatar-Bbk2J9om.js";import{n as E,t as ne}from"./Grid-BCXKdwv7.js";import{n as re,t as D}from"./Stack-B6jNs1FV.js";import{n as O,t as ie}from"./Textarea-Q4k_ScJz.js";import{n as ae,t as oe}from"./ConfirmButton-DRBC2HH8.js";import{n as se,t as k}from"./StatusText-DLSU9s0a.js";import{S as ce,l as le,t as A}from"./mock-CoQSv9oT.js";import{n as ue,t as j}from"./Markdown-CLUIjwoq.js";import{n as de,t as M}from"./ResultPanel-wYXkMxSq.js";import{i as fe,n as pe,r as me,t as N}from"./StatusCard-BGeV9UgY.js";import{n as he,t as P}from"./ResourceList-7zZVYvqp.js";function F(e,i){ee(i,!0);let u=c(`Wir suchen ein Tagungshotel in Leipzig für 300 Personen.`),f=c(`de`),h=c(`en`),g=c(o(ce()));var _=W(),v=a(_);L(v,{name:`ResultPanel states`,asChild:!0,children:(e,t)=>{ne(e,{min:`18rem`,children:(e,t)=>{var r=B(),i=a(r);M(i,{status:`empty`,title:`Answer`,placeholder:`Ask a question to see the answer.`});var o=m(i,2);M(o,{status:`loading`,title:`Answer`,loadingLabel:`Thinking…`,children:(e,t)=>{{let t=p(()=>A.slice(0,160));j(e,{get source(){return n(t)}})}},$$slots:{default:!0}});var c=m(o,2);M(c,{status:`ready`,title:`Answer`,get copyValue(){return A},headerEnd:e=>{k(e,{tone:`ok`,message:`Done`})},children:(e,t)=>{{let t=p(()=>A.slice(0,260));j(e,{get source(){return n(t)},size:`sm`})}},$$slots:{headerEnd:!0,default:!0}});var l=m(c,2);M(l,{status:`error`,title:`Answer`,error:`Connection closed before the answer finished.`}),s(e,r)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"The four states of a tool's output: `empty` (a placeholder), `loading` (an overlay over the\n    previous result), `ready` (with a copy button and a status) and `error`."}},__svelteCsf:{rawCode:`<Grid min="18rem">
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
</Grid>`}}});var y=m(v,2);L(y,{name:`SplitPane`,asChild:!0,children:(e,i)=>{me(e,{label:`Translator`,onswap:()=>(e=>{var n=t(e,2);return r(f,n[0],!0),r(h,n[1],!0),e})([n(h),n(f)]),startHeader:e=>{var t=V(),i=a(t);S(i,{"aria-label":`Source language`,get options(){return R},get value(){return n(f)},set value(e){r(f,e,!0)}});var o=m(i,2);k(o,{message:`detected · German`}),s(e,t)},endHeader:e=>{S(e,{"aria-label":`Target language`,get options(){return R},get value(){return n(h)},set value(e){r(h,e,!0)}})},start:e=>{ie(e,{variant:`plain`,counter:!0,limit:500,"aria-label":`Text`,get value(){return n(u)},set value(e){r(u,e,!0)}})},end:e=>{D(e,{padding:`md`,children:(e,t)=>{var n=H();s(e,n)},$$slots:{default:!0}})},$$slots:{startHeader:!0,endHeader:!0,start:!0,end:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Two panes on one card — a text and its translation. The glass bead between the headers swaps
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
</SplitPane>`}}});var x=m(y,2);L(x,{name:`ResourceList`,asChild:!0,children:(e,t)=>{w(e,{title:`Workspaces`,get count(){return n(g).length},children:(e,t)=>{P(e,{get items(){return n(g)},key:e=>e.id,title:e=>e.name,meta:e=>`${e.volume} · created ${e.created}`,status:e=>z[e.status],label:`Workspaces`,leading:(e,t=d)=>{te(e,{get name(){return t().name},size:32})},actions:(e,t=d)=>{var i=U(),o=a(i);{let e=p(()=>t().status!==`running`);b(o,{size:`sm`,icon:`external`,label:`Open`,iconOnly:!0,href:`https://example.com`,get disabled(){return n(e)}})}var c=m(o,2);{let e=p(()=>t().status===`running`?`pause`:`play`),r=p(()=>t().status===`running`?`Stop`:`Start`),i=p(()=>t().status===`starting`);b(c,{size:`sm`,get icon(){return n(e)},get label(){return n(r)},iconOnly:!0,get busy(){return n(i)}})}var l=m(c,2);oe(l,{size:`sm`,label:`Delete`,confirmLabel:`Delete`,onconfirm:()=>r(g,n(g).filter(e=>e.id!==t().id),!0)}),s(e,i)},$$slots:{leading:!0,actions:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Things you run or own, one row each: a leading slot, title and meta, a status badge (with a
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
</Card>`}}});var C=m(x,2);L(C,{name:`StatusCard working`,asChild:!0,children:(e,t)=>{N(e,{status:`working`,title:`Signing you in`,message:`Checking your session…`})},$$slots:{default:!0},parameters:{docs:{description:{story:`A moment between pages, e.g. back from a sign-in provider.`}},__svelteCsf:{rawCode:`<StatusCard status="working" title="Signing you in" message="Checking your session…" />`}}});var T=m(C,2);L(T,{name:`StatusCard success`,asChild:!0,children:(e,t)=>{N(e,{status:`success`,title:`Device activated`,message:`You can close this window and return to your device.`})},$$slots:{default:!0},parameters:{docs:{description:{story:`Success: the badge pops, the tick draws itself in and a few sprinkles fly, once. Errors
    arrive with a plain fade.`}},__svelteCsf:{rawCode:`<StatusCard
  status="success"
  title="Device activated"
  message="You can close this window and return to your device."
/>`}}});var E=m(T,2);L(E,{name:`StatusCard error with redirect`,asChild:!0,children:(e,t)=>{N(e,{status:`error`,title:`Sign-in failed`,message:`The sign-in link has expired.`,redirectTo:`#login`,redirectIn:5,continueLabel:`Sign in again`,onredirect:()=>{}})},$$slots:{default:!0},parameters:{docs:{description:{story:"An error that sends people on: counts down `redirectIn` seconds, with a link to go at once."}},__svelteCsf:{rawCode:`<StatusCard
  status="error"
  title="Sign-in failed"
  message="The sign-in link has expired."
  redirectTo="#login"
  redirectIn={5}
  continueLabel="Sign in again"
  onredirect={() => {}}
/>`}}}),s(e,_),l()}var I,L,R,z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q;function $(){return($=e((()=>{u(),h(),he(),de(),fe(),pe(),T(),y(),C(),x(),se(),O(),ue(),ae(),E(),re(),le(),f(),g(),I={title:`Organisms/Panels, lists & status cards`,component:M,tags:[`autodocs`],parameters:{layout:`padded`}},{Story:L}=_(I),R=[{value:`de`,label:`German`},{value:`en`,label:`English`},{value:`fr`,label:`French`}],z={running:{label:`Running`,tone:`live`},stopped:{label:`Stopped`,tone:`locked`},starting:{label:`Starting`,tone:`draft`,busy:!0}},B=i(`<!> <!> <!> <!>`,1),V=i(`<!> <!>`,1),H=i(`<p>We are looking for a conference hotel in Leipzig for 300 people.</p>`),U=i(`<!> <!> <!>`,1),W=i(`<!> <!> <!> <!> <!> <!>`,1),F.__docgen={data:[],name:`Workspaces.stories.svelte`},G=v(F,I),K=[`ResultPanelStates`,`SplitPane`,`ResourceList`,`StatusCardWorking`,`StatusCardSuccess`,`StatusCardErrorWithRedirect`],q={...G.ResultPanelStates,tags:[`svelte-csf-v5`]},J={...G.SplitPane,tags:[`svelte-csf-v5`]},Y={...G.ResourceList,tags:[`svelte-csf-v5`]},X={...G.StatusCardWorking,tags:[`svelte-csf-v5`]},Z={...G.StatusCardSuccess,tags:[`svelte-csf-v5`]},Q={...G.StatusCardErrorWithRedirect,tags:[`svelte-csf-v5`]}})))()}$();export{Y as ResourceList,q as ResultPanelStates,J as SplitPane,Q as StatusCardErrorWithRedirect,Z as StatusCardSuccess,X as StatusCardWorking,K as __namedExportsOrder,I as default};