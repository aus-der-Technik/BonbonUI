import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Cn as t,Ct as n,Ft as r,Gt as i,Ht as a,Nn as o,Pt as s,St as c,cn as l,ct as u,l as d,on as f,wn as p,xt as m,zt as h}from"./iframe-D3QpTFc1.js";import{i as g,n as _,r as v,t as y}from"./create-runtime-stories-bgfxAijx.js";import{n as b,t as x}from"./Button-DO5WmEfH.js";import{n as S,t as C}from"./EmptyState-CqibAbrM.js";import{n as w,t as T}from"./Card-VkCagOi8.js";import{n as E,t as D}from"./Toast-BnZWL-eG.js";import{n as O,t as k}from"./Stack-DIO0U5nL.js";import{n as A,t as j}from"./Alert-DHr1ClKj.js";function M(e,n){p(n,!0);let r=l(!1);var s=L(),d=h(s);P(d,{name:`Alert inline`,parameters:{docs:{description:{story:`The tinted box inside a form or dialog. Errors are announced assertively, the rest
    politely.`}},__svelteCsf:{rawCode:`<Alert {...args} />`}}});var g=a(d,2);P(g,{name:`Alert tones`,asChild:!0,children:(e,t)=>{k(e,{gap:`sm`,children:(e,t)=>{var n=F(),r=h(n);j(r,{tone:`error`,title:`Saving failed`,message:`Someone else changed this row meanwhile.`});var i=a(r,2);j(i,{tone:`warn`,message:`This price list is a draft and not visible in the shop yet.`});var o=a(i,2);j(o,{tone:`ok`,message:`All changes are saved.`});var s=a(o,2);j(s,{tone:`info`,message:`New orders appear automatically.`}),m(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"All four tones. Each brings its own icon; `title` adds a bold first line."}},__svelteCsf:{rawCode:`<Stack gap="sm">
  <Alert tone="error" title="Saving failed" message="Someone else changed this row meanwhile." />
  <Alert tone="warn" message="This price list is a draft and not visible in the shop yet." />
  <Alert tone="ok" message="All changes are saved." />
  <Alert tone="info" message="New orders appear automatically." />
</Stack>`}}});var _=a(g,2);P(_,{name:`Alert card with actions`,asChild:!0,children:(e,t)=>{var n=c(),a=h(n),o=e=>{j(e,{variant:`card`,tone:`warn`,title:`Stock sync is behind`,message:`The last import from the warehouse ran 3 hours ago.`,ondismiss:()=>f(r,!0),actions:e=>{x(e,{size:`sm`,icon:`refresh`,label:`Sync now`})},$$slots:{actions:!0}})},s=e=>{x(e,{label:`Show again`,onclick:()=>f(r,!1)})};u(a,e=>{i(r)?e(s,-1):e(o)}),m(e,n)},$$slots:{default:!0},parameters:{docs:{description:{story:`On its own glass card between sections, with a retry action and a close button.`}},__svelteCsf:{rawCode:`{#if !dismissed}
  <Alert
    variant="card"
    tone="warn"
    title="Stock sync is behind"
    message="The last import from the warehouse ran 3 hours ago."
    ondismiss={() => (dismissed = true)}
  >
    {#snippet actions()}<Button size="sm" icon="refresh" label="Sync now" />{/snippet}
  </Alert>
{:else}
  <Button label="Show again" onclick={() => (dismissed = false)} />
{/if}`}}});var v=a(_,2);P(v,{name:`Alert card, strong`,args:{variant:`card`,strong:!0,title:`The service cannot be reached`,message:`We keep retrying in the background.`},parameters:{docs:{description:{story:"`strong` tints the whole card, for a failure that blocks the page."}},__svelteCsf:{rawCode:`<Alert {...args} />`}}});var y=a(v,2);P(y,{name:`Toasts`,asChild:!0,children:(e,t)=>{k(e,{gap:`sm`,align:`end`,children:(e,t)=>{var n=F(),r=h(n);D(r,{title:`Saved. Nice.`,message:`Your changes are live.`,ondismiss:()=>{}});var i=a(r,2);D(i,{tone:`info`,children:(e,t)=>{var n=I();o(),m(e,n)},$$slots:{default:!0}});var s=a(i,2);D(s,{tone:`warn`,message:`Reloaded: 3 rows changed meanwhile`,ondismiss:()=>{}});var c=a(s,2);D(c,{tone:`error`,title:`Could not save`,message:`409 Conflict`,ondismiss:()=>{},actions:e=>{x(e,{size:`sm`,variant:`ghost`,label:`Retry`})},$$slots:{actions:!0}}),m(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Short-lived notices on liquid glass. Toaster stacks and times them; here they stand alone.`}},__svelteCsf:{rawCode:`<Stack gap="sm" align="end">
  <Toast title="Saved. Nice." message="Your changes are live." ondismiss={() => {}} />
  <Toast tone="info"><b>Jane</b> joined the workspace.</Toast>
  <Toast tone="warn" message="Reloaded: 3 rows changed meanwhile" ondismiss={() => {}} />
  <Toast tone="error" title="Could not save" message="409 Conflict" ondismiss={() => {}}>
    {#snippet actions()}<Button size="sm" variant="ghost" label="Retry" />{/snippet}
  </Toast>
</Stack>`}}});var b=a(y,2);P(b,{name:`EmptyState`,asChild:!0,children:(e,t)=>{C(e,{message:`Nothing here — try fewer filters.`})},$$slots:{default:!0},parameters:{docs:{description:{story:`The quiet line when a list or search finds nothing. Empty states may wink; errors never do.`}},__svelteCsf:{rawCode:`<EmptyState message="Nothing here — try fewer filters." />`}}});var S=a(b,2);P(S,{name:`EmptyState first run`,asChild:!0,children:(e,t)=>{T(e,{children:(e,t)=>{C(e,{icon:`inbox`,title:`No messages yet. Enjoy the quiet.`,message:`When customers write to you, their messages land here.`,actionLabel:`Write the first one`,actionIcon:`plus`,onaction:()=>{}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A friendly first-run panel: the icon breathes slowly in a soft tinted circle (an idle moment,
    so a little life is welcome; it holds still with reduced motion), short copy and one primary
    action — no snippet needed.`}},__svelteCsf:{rawCode:`<Card>
  <EmptyState
    icon="inbox"
    title="No messages yet. Enjoy the quiet."
    message="When customers write to you, their messages land here."
    actionLabel="Write the first one"
    actionIcon="plus"
    onaction={() => {}}
  />
</Card>`}}});var w=a(S,2);P(w,{name:`EmptyState compact`,asChild:!0,children:(e,t)=>{T(e,{title:`Attachments`,children:(e,t)=>{C(e,{compact:!0,icon:`file`,message:`Nothing attached.`})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"`compact` is a single quiet line for inside cards."}},__svelteCsf:{rawCode:`<Card title="Attachments">
  <EmptyState compact icon="file" message="Nothing attached." />
</Card>`}}}),m(e,s),t()}var N,P,F,I,L,R,z,B,V,H,U,W,G,K,q;function J(){return(J=e((()=>{r(),s(),g(),A(),S(),E(),b(),w(),O(),d(),_(),N={title:`Molecules/Alert & Toast`,component:j,tags:[`autodocs`],args:{message:`Orders could not be loaded: 503 Service Unavailable`,tone:`error`},argTypes:{tone:{control:`inline-radio`,options:[`error`,`warn`,`ok`,`info`]},variant:{control:`inline-radio`,options:[`inline`,`card`]}}},{Story:P}=v(N),F=n(`<!> <!> <!> <!>`,1),I=n(`<b>Jane</b> joined the workspace.`,1),L=n(`<!> <!> <!> <!> <!> <!> <!> <!>`,1),M.__docgen={data:[],name:`Feedback.stories.svelte`},R=y(M,N),z=[`AlertInline`,`AlertTones`,`AlertCardWithActions`,`AlertCardStrong`,`Toasts`,`EmptyState`,`EmptyStateFirstRun`,`EmptyStateCompact`],B={...R.AlertInline,tags:[`svelte-csf-v5`]},V={...R.AlertTones,tags:[`svelte-csf-v5`]},H={...R.AlertCardWithActions,tags:[`svelte-csf-v5`]},U={...R.AlertCardStrong,tags:[`svelte-csf-v5`]},W={...R.Toasts,tags:[`svelte-csf-v5`]},G={...R.EmptyState,tags:[`svelte-csf-v5`]},K={...R.EmptyStateFirstRun,tags:[`svelte-csf-v5`]},q={...R.EmptyStateCompact,tags:[`svelte-csf-v5`]}})))()}J();export{U as AlertCardStrong,H as AlertCardWithActions,B as AlertInline,V as AlertTones,G as EmptyState,q as EmptyStateCompact,K as EmptyStateFirstRun,W as Toasts,z as __namedExportsOrder,N as default};