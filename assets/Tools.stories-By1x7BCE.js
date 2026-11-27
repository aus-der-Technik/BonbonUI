import{n as e}from"./rolldown-runtime-Dxh6kD9_.js";import{Ct as t,Dt as n,Ft as r,Gt as i,Ht as a,Mn as o,Pt as s,Rt as c,Sn as l,Wt as ee,cn as u,ct as te,hn as d,jn as f,l as p,on as m,xn as ne,xt as h,zt as g}from"./iframe-WlNMZtZ0.js";import{i as _,n as v,r as y,t as b}from"./create-runtime-stories-CbHiKinS.js";import{n as x,t as S}from"./Button-DHLILcYm.js";import{n as C,t as re}from"./Input-DeTI9rlx.js";import{n as w,t as ie}from"./Field-DtdH1dfq.js";import{n as T,t as E}from"./Card-BqZAAHlF.js";import{n as D,t as ae}from"./SegmentedControl-DBesi20v.js";import{n as O,t as k}from"./Stack-BjV-rmuj.js";import{n as A,t as j}from"./Composer-CNwRM8Ej.js";import{n as M,t as oe}from"./CopyButton-Bo1UvYun.js";import{n as N,t as se}from"./Tabs-bEPiMuLL.js";import{n as P,t as F}from"./StatusText-f0ritOei.js";import{l as I,t as ce}from"./mock-CO6eygD8.js";import{n as L,t as le}from"./CheckboxGroup-CTHU_tca.js";import{n as R,t as ue}from"./Disclosure-BjbD5BLs.js";import{n as z,t as B}from"./Markdown-CkYwfUbE.js";import{n as V,t as H}from"./FileDropzone-CNrzaZgG.js";import{a as U,i as W,n as G,o as K,r as de,t as q}from"./CodeInput-RgGI7oCN.js";function J(e,t){l(t,!0);let r=u(``),s=u(``),p=u(ee([`search_products`,`get_product`])),_=u(``),v=u(null),y=u(`v3`),b=u(`en`),x=u(``),C=u(!1),w=u(!0),T=u(``),D=u(`Looks good to me.
Can we keep the second version of the chart?
And move the totals to the top.`);function O(){m(x,``),m(C,!0);let e=ce.split(/(?<=\s)/),t=0,n=setInterval(()=>{m(x,i(x)+e.slice(t,t+3).join(``)),t+=3,t>=e.length&&(clearInterval(n),m(C,!1))},40)}var A=ve(),M=g(A);X(M,{name:`Composer`,asChild:!0,children:(e,t)=>{k(e,{gap:`sm`,children:(e,t)=>{var n=Z(),o=g(n);j(o,{label:`Question`,placeholder:`Ask about products, stores or orders…`,buttonLabel:`Ask`,icon:`send`,onsubmit:e=>m(s,e,!0),get value(){return i(r)},set value(e){m(r,e,!0)}});var c=a(o,2),l=e=>{F(e,{get message(){return`Sent: ${i(s)??``}`}})};te(c,e=>{i(s)&&e(l)}),h(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A prompt box: the field and its send button share one glass box that glows while focused.
    Enter sends, Shift+Enter breaks the line; it grows with the text.`}},__svelteCsf:{rawCode:`<Stack gap="sm">
  <Composer
    bind:value={question}
    label="Question"
    placeholder="Ask about products, stores or orders…"
    buttonLabel="Ask"
    icon="send"
    onsubmit={(v) => (asked = v)}
  />
  {#if asked}<StatusText message="Sent: {asked}" />{/if}
</Stack>`}}});var N=a(M,2);X(N,{name:`Composer inline, Cmd+Enter`,asChild:!0,children:(e,t)=>{j(e,{label:`Query`,layout:`inline`,submitOn:`mod-enter`,minRows:1,minLength:3,buttonLabel:`Categorise`,onsubmit:()=>{}})},$$slots:{default:!0},parameters:{docs:{description:{story:`One line with the button beside it; Cmd/Ctrl+Enter sends, so Enter can break lines.`}},__svelteCsf:{rawCode:`<Composer
  label="Query"
  layout="inline"
  submitOn="mod-enter"
  minRows={1}
  minLength={3}
  buttonLabel="Categorise"
  onsubmit={() => {}}
/>`}}});var P=a(N,2);X(P,{name:`Composer inline, a reply`,asChild:!0,children:(e,t)=>{k(e,{gap:`sm`,children:(e,t)=>{var n=Z(),r=g(n);j(r,{label:`Reply`,placeholder:`Say something about this…`,layout:`inline`,minRows:1,maxRows:6,hint:!1,icon:`send`,sendVariant:`soft`,onsubmit:()=>m(T,``),get value(){return i(T)},set value(e){m(T,e,!0)}});var o=a(r,2);j(o,{label:`Reply, several lines`,layout:`inline`,minRows:1,maxRows:6,hint:!1,icon:`send`,onsubmit:()=>m(D,``),get value(){return i(D)},set value(e){m(D,e,!0)}}),h(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A reply box: one line is one control — the field as tall as its button, its text centred on
    it; more lines grow the field upwards and the button stays beside the last one.`}},__svelteCsf:{rawCode:`<Stack gap="sm">
  <Composer
    bind:value={reply}
    label="Reply"
    placeholder="Say something about this…"
    layout="inline"
    minRows={1}
    maxRows={6}
    hint={false}
    icon="send"
    sendVariant="soft"
    onsubmit={() => (reply = '')}
  />
  <Composer
    bind:value={longReply}
    label="Reply, several lines"
    layout="inline"
    minRows={1}
    maxRows={6}
    hint={false}
    icon="send"
    onsubmit={() => (longReply = '')}
  />
</Stack>`}}});var I=a(P,2);X(I,{name:`Markdown streaming`,asChild:!0,children:(e,t)=>{E(e,{title:`Answer`,actions:e=>{S(e,{size:`sm`,icon:`play`,label:`Stream answer`,onclick:O})},children:(e,t)=>{B(e,{get source(){return i(x)},get streaming(){return i(C)},placeholder:`The answer appears here.`})},$$slots:{actions:!0,default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"A streamed answer: keep passing the growing `source`; a caret blinks while `streaming`."}},__svelteCsf:{rawCode:`<Card title="Answer">
  {#snippet actions()}<Button
      size="sm"
      icon="play"
      label="Stream answer"
      onclick={stream}
    />{/snippet}
  <Markdown source={streamed} {streaming} placeholder="The answer appears here." />
</Card>`}}});var L=a(I,2);X(L,{name:`Markdown sanitized`,asChild:!0,children:(e,t)=>{E(e,{children:(e,t)=>{B(e,{source:fe})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Markdown is sanitized: the image's handler is gone.`}},__svelteCsf:{rawCode:`<Card>
  <Markdown source={UNSAFE} />
</Card>`}}});var R=a(L,2);X(R,{name:`JobStatus`,asChild:!0,children:(e,t)=>{E(e,{children:(e,t)=>{k(e,{gap:`lg`,children:(e,t)=>{var n=me(),r=g(n);U(r,{status:`queued`});var i=a(r,2);U(i,{status:`running`,step:`importing · 12 files`});var o=a(i,2);U(o,{status:`running`,step:`resizing images`,done:17,total:40});var s=a(o,2);U(s,{status:`done`,done:40,total:40,detail:`38 updated · 2 skipped`});var c=a(s,2);U(c,{status:`failed`,step:`timeout after 30 min`,done:22,total:40});var l=a(c,2);U(l,{status:`cached`}),h(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Where a background job stands: queued, running (with steps and progress), done, failed.`}},__svelteCsf:{rawCode:`<Card>
  <Stack gap="lg">
    <JobStatus status="queued" />
    <JobStatus status="running" step="importing · 12 files" />
    <JobStatus status="running" step="resizing images" done={17} total={40} />
    <JobStatus status="done" done={40} total={40} detail="38 updated · 2 skipped" />
    <JobStatus status="failed" step="timeout after 30 min" done={22} total={40} />
    <JobStatus status="cached" />
  </Stack>
</Card>`}}});var z=a(R,2);X(z,{name:`CheckboxGroup`,asChild:!0,children:(e,t)=>{E(e,{children:(e,t)=>{ue(e,{title:`Tools`,icon:`settings`,get meta(){return`${i(p).length??``} enabled`},get open(){return i(w)},set open(e){m(w,e,!0)},actions:e=>{S(e,{size:`xs`,label:`Reset`,onclick:()=>m(p,[`search_products`],!0)})},children:(e,t)=>{le(e,{label:`Allowed tools`,get options(){return pe},mono:!0,get value(){return i(p)},set value(e){m(p,e,!0)}})},$$slots:{actions:!0,default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A checkbox grid inside a Disclosure, with a reset action in its heading.`}},__svelteCsf:{rawCode:`<Card>
  <Disclosure title="Tools" icon="settings" meta="{tools.length} enabled" bind:open={toolsOpen}>
    {#snippet actions()}<Button
        size="xs"
        label="Reset"
        onclick={() => (tools = ['search_products'])}
      />{/snippet}
    <CheckboxGroup label="Allowed tools" options={toolOptions} bind:value={tools} mono />
  </Disclosure>
</Card>`}}});var V=a(z,2);X(V,{name:`CodeInput`,asChild:!0,children:(e,t)=>{k(e,{gap:`md`,children:(e,t)=>{var n=he(),r=g(n);q(r,{label:`Device code`,length:8,groupAfter:4,get value(){return i(_)},set value(e){m(_,e,!0)}});var o=a(r,2);{let e=d(()=>i(_)||`—`);F(o,{get message(){return`Value: ${i(e)??``}`}})}var s=a(o,2);q(s,{label:`One-time code`,numeric:!0,length:6});var c=a(s,2);q(c,{label:`Wrong code`,numeric:!0,length:6,value:`123456`,invalid:!0}),h(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Type, paste "ABCD1234" into any box, Backspace goes back. Filled boxes tint in the accent.`}},__svelteCsf:{rawCode:`<Stack gap="md">
  <CodeInput label="Device code" length={8} groupAfter={4} bind:value={code} />
  <StatusText message="Value: {code || '—'}" />
  <CodeInput label="One-time code" numeric length={6} />
  <CodeInput label="Wrong code" numeric length={6} value="123456" invalid />
</Stack>`}}});var W=a(V,2);X(W,{name:`FileDropzone`,asChild:!0,children:(e,t)=>{k(e,{gap:`md`,children:(e,t)=>{var n=Z(),r=g(n);H(r,{accept:`.pdf,.md,.txt,.docx,.html`,maxBytes:52428800,hint:`PDF, Markdown, text, Word or HTML · up to 50 MB`,get file(){return i(v)},set file(e){m(v,e,!0)}});var o=a(r,2);H(o,{file:new File([`x`.repeat(2048)],`quarterly-report.pdf`),progress:.64}),h(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Drop a file or click to choose; drag one over to see the accent glow. Below: an upload in
    progress.`}},__svelteCsf:{rawCode:`<Stack gap="md">
  <FileDropzone
    bind:file
    accept=".pdf,.md,.txt,.docx,.html"
    maxBytes={50 * 1024 * 1024}
    hint="PDF, Markdown, text, Word or HTML · up to 50 MB"
  />
  <FileDropzone file={new File(['x'.repeat(2048)], 'quarterly-report.pdf')} progress={0.64} />
</Stack>`}}});var G=a(W,2);X(G,{name:`VersionRail`,asChild:!0,children:(e,t)=>{{let t=d(()=>[`v1`,`v2`,`v3`,`v4`,`v5`,`v6`].map((e,t)=>({value:e,label:e,marked:t===5,title:`Version ${t+1}`})));de(e,{get items(){return i(t)},get value(){return i(y)},set value(e){m(y,e,!0)}})}},$$slots:{default:!0},parameters:{docs:{description:{story:`Jump between versions; the current one is the tinted "selected" layer (a selection, not an
    action, so no solid fill), the latest carries a dot.`}},__svelteCsf:{rawCode:`<VersionRail
  bind:value={version}
  items={['v1', 'v2', 'v3', 'v4', 'v5', 'v6'].map((v, i) => ({
    value: v,
    label: v,
    marked: i === 5,
    title: \`Version \${i + 1}\`,
  }))}
/>`}}});var K=a(G,2);X(K,{name:`Route tabs with action`,asChild:!0,children:(e,t)=>{E(e,{children:(e,t)=>{se(e,{label:`Sections`,value:`active`,tabs:[{value:`active`,label:`Active`,href:`#active`,count:1284},{value:`downloads`,label:`Downloads`,href:`#downloads`},{value:`archive`,label:`Archive`,href:`#archive`}],actions:e=>{S(e,{size:`sm`,variant:`primary`,icon:`plus`,label:`New`})},$$slots:{actions:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Tabs as links (route navigation) with a "+ New" action at the end.`}},__svelteCsf:{rawCode:`<Card>
  <Tabs
    label="Sections"
    value="active"
    tabs={[
      { value: 'active', label: 'Active', href: '#active', count: 1284 },
      { value: 'downloads', label: 'Downloads', href: '#downloads' },
      { value: 'archive', label: 'Archive', href: '#archive' },
    ]}
  >
    {#snippet actions()}<Button size="sm" variant="primary" icon="plus" label="New" />{/snippet}
  </Tabs>
</Card>`}}});var J=a(K,2);X(J,{name:`Small segmented & wrap`,asChild:!0,children:(e,t)=>{k(e,{gap:`md`,align:`start`,children:(e,t)=>{var n=Z(),r=g(n);ae(r,{size:`sm`,label:`Language`,options:[{value:`de`,label:`DE`},{value:`en`,label:`EN`}],get value(){return i(b)},set value(e){m(b,e,!0)}});var o=a(r,2);{let e=d(()=>[`256Mi`,`512Mi`,`1Gi`,`2Gi`,`5Gi`,`10Gi`,`20Gi`,`50Gi`].map(e=>({value:e,label:e})));ae(o,{wrap:!0,label:`Capacity`,value:`1Gi`,get options(){return i(e)}})}h(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A compact pill switch, and many options wrapping onto several lines.`}},__svelteCsf:{rawCode:`<Stack gap="md" align="start">
  <SegmentedControl
    size="sm"
    label="Language"
    options={[
      { value: 'de', label: 'DE' },
      { value: 'en', label: 'EN' },
    ]}
    bind:value={lang}
  />
  <SegmentedControl
    wrap
    label="Capacity"
    value="1Gi"
    options={['256Mi', '512Mi', '1Gi', '2Gi', '5Gi', '10Gi', '20Gi', '50Gi'].map((v) => ({
      value: v,
      label: v,
    }))}
  />
</Stack>`}}});var Y=a(J,2);X(Y,{name:`Field hint with code, inline copy`,asChild:!0,children:(e,t)=>{k(e,{gap:`md`,children:(e,t)=>{var r=_e(),i=g(r);ie(i,{label:`User prompt`,hint:e=>{f();var t=ge(),n=a(g(t));n.textContent=`{{content}}`,f(),h(e,t)},children:(e,t)=>{let n=()=>t?.().id;re(e,{get id(){return n()},value:`Summarise {{content}}`})},$$slots:{hint:!0,default:!0}});var s=a(i,2),l=a(c(s));oe(l,{value:`urn:doc:example-4711`,children:(e,t)=>{f();var r=n(`urn:doc:example-4711`);h(e,r)},$$slots:{default:!0}}),o(s),h(e,r)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A hint with inline code, and a value that copies itself when clicked.`}},__svelteCsf:{rawCode:`<Stack gap="md">
  <Field label="User prompt">
    {#snippet hint()}Use <code>{'{{content}}'}</code> where the page text goes.{/snippet}
    {#snippet children({ id })}<Input {id} value={'Summarise {{content}}'} />{/snippet}
  </Field>
  <span>
    Document id:
    <CopyButton value="urn:doc:example-4711">urn:doc:example-4711</CopyButton>
  </span>
</Stack>`}}}),h(e,A),ne()}var Y,X,fe,pe,Z,me,he,ge,_e,ve,Q,ye,be,xe,Se,Ce,we,Te,$,Ee,De,Oe,ke,Ae,je;function Me(){return(Me=e((()=>{r(),s(),_(),L(),G(),A(),M(),R(),w(),V(),K(),z(),D(),N(),W(),x(),T(),C(),P(),O(),I(),p(),v(),Y={title:`Molecules/Tools, input & output`,component:j,tags:[`autodocs`],parameters:{layout:`padded`}},{Story:X}=y(Y),fe=`**Bold**, a [link](https://example.com) and an unsafe <img src=x onerror="alert(1)"> image — the handler is removed.

> Quotes take the accent.

| City | Stores |
| --- | --- |
| Riverside | 42 |
| Lakeside | 31 |`,pe=[{value:`search_products`,label:`search_products`,description:`Full-text product search`},{value:`get_product`,label:`get_product`,description:`One product by id`},{value:`geocode`,label:`geocode`,description:`Place name to coordinates`},{value:`nearby`,label:`nearby`,description:`Stores within a radius`},{value:`orders`,label:`orders`,description:`Order history lookups`},{value:`admin_only`,label:`admin_only`,description:`Not available here`,disabled:!0}],Z=t(`<!> <!>`,1),me=t(`<!> <!> <!> <!> <!> <!>`,1),he=t(`<!> <!> <!> <!>`,1),ge=t(`Use <code></code> where the page text goes.`,1),_e=t(`<!> <span>Document id: <!></span>`,1),ve=t(`<!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!>`,1),J.__docgen={data:[],name:`Tools.stories.svelte`},Q=b(J,Y),ye=[`Composer`,`ComposerInlineCmdEnter`,`ComposerInlineAReply`,`MarkdownStreaming`,`MarkdownSanitized`,`JobStatus`,`CheckboxGroup`,`CodeInput`,`FileDropzone`,`VersionRail`,`RouteTabsWithAction`,`SmallSegmentedWrap`,`FieldHintWithCodeInlineCopy`],be={...Q.Composer,tags:[`svelte-csf-v5`]},xe={...Q.ComposerInlineCmdEnter,tags:[`svelte-csf-v5`]},Se={...Q.ComposerInlineAReply,tags:[`svelte-csf-v5`]},Ce={...Q.MarkdownStreaming,tags:[`svelte-csf-v5`]},we={...Q.MarkdownSanitized,tags:[`svelte-csf-v5`]},Te={...Q.JobStatus,tags:[`svelte-csf-v5`]},$={...Q.CheckboxGroup,tags:[`svelte-csf-v5`]},Ee={...Q.CodeInput,tags:[`svelte-csf-v5`]},De={...Q.FileDropzone,tags:[`svelte-csf-v5`]},Oe={...Q.VersionRail,tags:[`svelte-csf-v5`]},ke={...Q.RouteTabsWithAction,tags:[`svelte-csf-v5`]},Ae={...Q.SmallSegmentedWrap,tags:[`svelte-csf-v5`]},je={...Q.FieldHintWithCodeInlineCopy,tags:[`svelte-csf-v5`]}})))()}Me();export{$ as CheckboxGroup,Ee as CodeInput,be as Composer,Se as ComposerInlineAReply,xe as ComposerInlineCmdEnter,je as FieldHintWithCodeInlineCopy,De as FileDropzone,Te as JobStatus,we as MarkdownSanitized,Ce as MarkdownStreaming,ke as RouteTabsWithAction,Ae as SmallSegmentedWrap,Oe as VersionRail,ye as __namedExportsOrder,Y as default};