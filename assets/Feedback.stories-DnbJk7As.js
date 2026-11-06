import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Cn as t,Mt as n,Qt as r,St as i,Wt as a,bt as o,ct as s,en as c,fn as l,jn as u,l as d,pn as f,qt as p,xt as m}from"./iframe-Dd9zCUtD.js";import{i as h,n as g,r as _,t as v}from"./create-runtime-stories-Bj9BSqmd.js";import{n as y,t as b}from"./Button-CAKf1gbx.js";import{n as x,t as S}from"./EmptyState-lp8HmGSC.js";import{n as C,t as w}from"./Card-o6xHO1cU.js";import{n as T,t as E}from"./Toast-Bv32inp7.js";import{n as D,t as O}from"./Stack-B3I2k7mw.js";import{n as k,t as A}from"./Alert-CbV9l6KH.js";function j(e,i){f(i,!0);let u=c(!1);var d=I(),h=a(d);N(h,{name:`Alert inline`,parameters:{docs:{description:{story:`The tinted box inside a form or dialog. Errors are announced assertively, the rest
    politely.`}},__svelteCsf:{rawCode:`<Alert {...args} />`}}});var g=p(h,2);N(g,{name:`Alert tones`,asChild:!0,children:(e,t)=>{O(e,{gap:`sm`,children:(e,t)=>{var n=P(),r=a(n);A(r,{tone:`error`,title:`Saving failed`,message:`Someone else changed this row meanwhile.`});var i=p(r,2);A(i,{tone:`warn`,message:`This price list is a draft and not visible in the shop yet.`});var s=p(i,2);A(s,{tone:`ok`,message:`All changes are saved.`});var c=p(s,2);A(c,{tone:`info`,message:`New orders appear automatically.`}),o(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"All four tones. Each brings its own icon; `title` adds a bold first line."}},__svelteCsf:{rawCode:`<Stack gap="sm">
  <Alert tone="error" title="Saving failed" message="Someone else changed this row meanwhile." />
  <Alert tone="warn" message="This price list is a draft and not visible in the shop yet." />
  <Alert tone="ok" message="All changes are saved." />
  <Alert tone="info" message="New orders appear automatically." />
</Stack>`}}});var _=p(g,2);N(_,{name:`Alert card with actions`,asChild:!0,children:(e,t)=>{var i=m(),c=a(i),l=e=>{A(e,{variant:`card`,tone:`warn`,title:`Stock sync is behind`,message:`The last import from the warehouse ran 3 hours ago.`,ondismiss:()=>r(u,!0),actions:e=>{b(e,{size:`sm`,icon:`refresh`,label:`Sync now`})},$$slots:{actions:!0}})},d=e=>{b(e,{label:`Show again`,onclick:()=>r(u,!1)})};s(c,e=>{n(u)?e(d,-1):e(l)}),o(e,i)},$$slots:{default:!0},parameters:{docs:{description:{story:`On its own glass card between sections, with a retry action and a close button.`}},__svelteCsf:{rawCode:`{#if !dismissed}
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
{/if}`}}});var v=p(_,2);N(v,{name:`Alert card, strong`,args:{variant:`card`,strong:!0,title:`The service cannot be reached`,message:`We keep retrying in the background.`},parameters:{docs:{description:{story:"`strong` tints the whole card, for a failure that blocks the page."}},__svelteCsf:{rawCode:`<Alert {...args} />`}}});var y=p(v,2);N(y,{name:`Toasts`,asChild:!0,children:(e,n)=>{O(e,{gap:`sm`,align:`end`,children:(e,n)=>{var r=P(),i=a(r);E(i,{title:`Saved. Nice.`,message:`Your changes are live.`,ondismiss:()=>{}});var s=p(i,2);E(s,{tone:`info`,children:(e,n)=>{var r=F();t(),o(e,r)},$$slots:{default:!0}});var c=p(s,2);E(c,{tone:`warn`,message:`Reloaded: 3 rows changed meanwhile`,ondismiss:()=>{}});var l=p(c,2);E(l,{tone:`error`,title:`Could not save`,message:`409 Conflict`,ondismiss:()=>{},actions:e=>{b(e,{size:`sm`,variant:`ghost`,label:`Retry`})},$$slots:{actions:!0}}),o(e,r)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Short-lived notices on liquid glass. Toaster stacks and times them; here they stand alone.`}},__svelteCsf:{rawCode:`<Stack gap="sm" align="end">
  <Toast title="Saved. Nice." message="Your changes are live." ondismiss={() => {}} />
  <Toast tone="info"><b>Jane</b> joined the workspace.</Toast>
  <Toast tone="warn" message="Reloaded: 3 rows changed meanwhile" ondismiss={() => {}} />
  <Toast tone="error" title="Could not save" message="409 Conflict" ondismiss={() => {}}>
    {#snippet actions()}<Button size="sm" variant="ghost" label="Retry" />{/snippet}
  </Toast>
</Stack>`}}});var x=p(y,2);N(x,{name:`EmptyState`,asChild:!0,children:(e,t)=>{S(e,{message:`Nothing here — try fewer filters.`})},$$slots:{default:!0},parameters:{docs:{description:{story:`The quiet line when a list or search finds nothing. Empty states may wink; errors never do.`}},__svelteCsf:{rawCode:`<EmptyState message="Nothing here — try fewer filters." />`}}});var C=p(x,2);N(C,{name:`EmptyState first run`,asChild:!0,children:(e,t)=>{w(e,{children:(e,t)=>{S(e,{icon:`inbox`,title:`No messages yet. Enjoy the quiet.`,message:`When customers write to you, their messages land here.`,actionLabel:`Write the first one`,actionIcon:`plus`,onaction:()=>{}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A friendly first-run panel: the icon breathes slowly in a soft tinted circle (an idle moment,
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
</Card>`}}});var T=p(C,2);N(T,{name:`EmptyState compact`,asChild:!0,children:(e,t)=>{w(e,{title:`Attachments`,children:(e,t)=>{S(e,{compact:!0,icon:`file`,message:`Nothing attached.`})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"`compact` is a single quiet line for inside cards."}},__svelteCsf:{rawCode:`<Card title="Attachments">
  <EmptyState compact icon="file" message="Nothing attached." />
</Card>`}}}),o(e,d),l()}var M,N,P,F,I,L,R,z,B,V,H,U,W,G,K;function q(){return(q=e((()=>{u(),h(),k(),x(),T(),y(),C(),D(),d(),g(),M={title:`Molecules/Alert & Toast`,component:A,tags:[`autodocs`],args:{message:`Orders could not be loaded: 503 Service Unavailable`,tone:`error`},argTypes:{tone:{control:`inline-radio`,options:[`error`,`warn`,`ok`,`info`]},variant:{control:`inline-radio`,options:[`inline`,`card`]}}},{Story:N}=_(M),P=i(`<!> <!> <!> <!>`,1),F=i(`<b>Jane</b> joined the workspace.`,1),I=i(`<!> <!> <!> <!> <!> <!> <!> <!>`,1),j.__docgen={data:[],name:`Feedback.stories.svelte`},L=v(j,M),R=[`AlertInline`,`AlertTones`,`AlertCardWithActions`,`AlertCardStrong`,`Toasts`,`EmptyState`,`EmptyStateFirstRun`,`EmptyStateCompact`],z={...L.AlertInline,tags:[`svelte-csf-v5`]},B={...L.AlertTones,tags:[`svelte-csf-v5`]},V={...L.AlertCardWithActions,tags:[`svelte-csf-v5`]},H={...L.AlertCardStrong,tags:[`svelte-csf-v5`]},U={...L.Toasts,tags:[`svelte-csf-v5`]},W={...L.EmptyState,tags:[`svelte-csf-v5`]},G={...L.EmptyStateFirstRun,tags:[`svelte-csf-v5`]},K={...L.EmptyStateCompact,tags:[`svelte-csf-v5`]}})))()}q();export{H as AlertCardStrong,V as AlertCardWithActions,z as AlertInline,B as AlertTones,W as EmptyState,K as EmptyStateCompact,G as EmptyStateFirstRun,U as Toasts,R as __namedExportsOrder,M as default};