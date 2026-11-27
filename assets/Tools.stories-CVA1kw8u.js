import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Cn as t,Ct as n,Dt as r,Ft as i,Gt as a,Ht as o,Nn as s,Pn as c,Pt as l,Rt as ee,Wt as te,_n as u,cn as d,ct as ne,l as f,on as p,wn as re,xt as m,zt as h}from"./iframe-D3QpTFc1.js";import{i as g,n as _,r as v,t as y}from"./create-runtime-stories-bgfxAijx.js";import{n as b,t as x}from"./Button-DO5WmEfH.js";import{n as S,t as ie}from"./Input-CpEmBp8q.js";import{n as C,t as ae}from"./Field-57DUJksD.js";import{n as w,t as T}from"./Card-VkCagOi8.js";import{n as E,t as D}from"./SegmentedControl-CBzcZqe-.js";import{n as oe,t as O}from"./Stack-DIO0U5nL.js";import{n as k,t as A}from"./Composer-BcJRYN4D.js";import{n as j,t as se}from"./CopyButton-Kxzy_Pg3.js";import{n as M,t as ce}from"./Tabs-C1HPzEQd.js";import{n as N,t as P}from"./StatusText-S7DFz0tc.js";import{l as F,t as le}from"./mock-CoQSv9oT.js";import{n as I,t as ue}from"./CheckboxGroup-XVHb6SQP.js";import{n as L,t as de}from"./Disclosure-DctIStWu.js";import{n as R,t as z}from"./Markdown-ZNamIQLn.js";import{n as B,t as V}from"./FileDropzone-CMsVTfAx.js";import{a as H,i as U,n as W,o as G,r as fe,t as K}from"./CodeInput-XfVMqMJN.js";function q(e,n){re(n,!0);let i=d(``),l=d(``),f=d(te([`search_products`,`get_product`])),g=d(``),_=d(null),v=d(`v3`),y=d(`en`),b=d(``),S=d(!1),C=d(!0),w=d(``),E=d(`Looks good to me.
Can we keep the second version of the chart?
And move the totals to the top.`);function oe(){p(b,``),p(S,!0);let e=le.split(/(?<=\s)/),t=0,n=setInterval(()=>{p(b,a(b)+e.slice(t,t+3).join(``)),t+=3,t>=e.length&&(clearInterval(n),p(S,!1))},40)}var k=ve(),j=h(k);Y(j,{name:`Composer`,asChild:!0,children:(e,t)=>{O(e,{gap:`sm`,children:(e,t)=>{var n=Z(),r=h(n);A(r,{label:`Question`,placeholder:`Ask about products, stores or orders…`,buttonLabel:`Ask`,icon:`send`,onsubmit:e=>p(l,e,!0),get value(){return a(i)},set value(e){p(i,e,!0)}});var s=o(r,2),c=e=>{P(e,{get message(){return`Sent: ${a(l)??``}`}})};ne(s,e=>{a(l)&&e(c)}),m(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A prompt box: the field and its send button share one glass box that glows while focused.
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
</Stack>`}}});var M=o(j,2);Y(M,{name:`Composer inline, Cmd+Enter`,asChild:!0,children:(e,t)=>{A(e,{label:`Query`,layout:`inline`,submitOn:`mod-enter`,minRows:1,minLength:3,buttonLabel:`Categorise`,onsubmit:()=>{}})},$$slots:{default:!0},parameters:{docs:{description:{story:`One line with the button beside it; Cmd/Ctrl+Enter sends, so Enter can break lines.`}},__svelteCsf:{rawCode:`<Composer
  label="Query"
  layout="inline"
  submitOn="mod-enter"
  minRows={1}
  minLength={3}
  buttonLabel="Categorise"
  onsubmit={() => {}}
/>`}}});var N=o(M,2);Y(N,{name:`Composer inline, a reply`,asChild:!0,children:(e,t)=>{O(e,{gap:`sm`,children:(e,t)=>{var n=Z(),r=h(n);A(r,{label:`Reply`,placeholder:`Say something about this…`,layout:`inline`,minRows:1,maxRows:6,hint:!1,icon:`send`,sendVariant:`soft`,onsubmit:()=>p(w,``),get value(){return a(w)},set value(e){p(w,e,!0)}});var i=o(r,2);A(i,{label:`Reply, several lines`,layout:`inline`,minRows:1,maxRows:6,hint:!1,icon:`send`,onsubmit:()=>p(E,``),get value(){return a(E)},set value(e){p(E,e,!0)}}),m(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A reply box: one line is one control — the field as tall as its button, its text centred on
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
</Stack>`}}});var F=o(N,2);Y(F,{name:`Markdown streaming`,asChild:!0,children:(e,t)=>{T(e,{title:`Answer`,actions:e=>{x(e,{size:`sm`,icon:`play`,label:`Stream answer`,onclick:oe})},children:(e,t)=>{z(e,{get source(){return a(b)},get streaming(){return a(S)},placeholder:`The answer appears here.`})},$$slots:{actions:!0,default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"A streamed answer: keep passing the growing `source`; a caret blinks while `streaming`."}},__svelteCsf:{rawCode:`<Card title="Answer">
  {#snippet actions()}<Button
      size="sm"
      icon="play"
      label="Stream answer"
      onclick={stream}
    />{/snippet}
  <Markdown source={streamed} {streaming} placeholder="The answer appears here." />
</Card>`}}});var I=o(F,2);Y(I,{name:`Markdown sanitized`,asChild:!0,children:(e,t)=>{T(e,{children:(e,t)=>{z(e,{source:X})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Markdown is sanitized: the image's handler is gone.`}},__svelteCsf:{rawCode:`<Card>
  <Markdown source={UNSAFE} />
</Card>`}}});var L=o(I,2);Y(L,{name:`JobStatus`,asChild:!0,children:(e,t)=>{T(e,{children:(e,t)=>{O(e,{gap:`lg`,children:(e,t)=>{var n=me(),r=h(n);H(r,{status:`queued`});var i=o(r,2);H(i,{status:`running`,step:`importing · 12 files`});var a=o(i,2);H(a,{status:`running`,step:`resizing images`,done:17,total:40});var s=o(a,2);H(s,{status:`done`,done:40,total:40,detail:`38 updated · 2 skipped`});var c=o(s,2);H(c,{status:`failed`,step:`timeout after 30 min`,done:22,total:40});var l=o(c,2);H(l,{status:`cached`}),m(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Where a background job stands: queued, running (with steps and progress), done, failed.`}},__svelteCsf:{rawCode:`<Card>
  <Stack gap="lg">
    <JobStatus status="queued" />
    <JobStatus status="running" step="importing · 12 files" />
    <JobStatus status="running" step="resizing images" done={17} total={40} />
    <JobStatus status="done" done={40} total={40} detail="38 updated · 2 skipped" />
    <JobStatus status="failed" step="timeout after 30 min" done={22} total={40} />
    <JobStatus status="cached" />
  </Stack>
</Card>`}}});var R=o(L,2);Y(R,{name:`CheckboxGroup`,asChild:!0,children:(e,t)=>{T(e,{children:(e,t)=>{de(e,{title:`Tools`,icon:`settings`,get meta(){return`${a(f).length??``} enabled`},get open(){return a(C)},set open(e){p(C,e,!0)},actions:e=>{x(e,{size:`xs`,label:`Reset`,onclick:()=>p(f,[`search_products`],!0)})},children:(e,t)=>{ue(e,{label:`Allowed tools`,get options(){return pe},mono:!0,get value(){return a(f)},set value(e){p(f,e,!0)}})},$$slots:{actions:!0,default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A checkbox grid inside a Disclosure, with a reset action in its heading.`}},__svelteCsf:{rawCode:`<Card>
  <Disclosure title="Tools" icon="settings" meta="{tools.length} enabled" bind:open={toolsOpen}>
    {#snippet actions()}<Button
        size="xs"
        label="Reset"
        onclick={() => (tools = ['search_products'])}
      />{/snippet}
    <CheckboxGroup label="Allowed tools" options={toolOptions} bind:value={tools} mono />
  </Disclosure>
</Card>`}}});var B=o(R,2);Y(B,{name:`CodeInput`,asChild:!0,children:(e,t)=>{O(e,{gap:`md`,children:(e,t)=>{var n=he(),r=h(n);K(r,{label:`Device code`,length:8,groupAfter:4,get value(){return a(g)},set value(e){p(g,e,!0)}});var i=o(r,2);{let e=u(()=>a(g)||`—`);P(i,{get message(){return`Value: ${a(e)??``}`}})}var s=o(i,2);K(s,{label:`One-time code`,numeric:!0,length:6});var c=o(s,2);K(c,{label:`Wrong code`,numeric:!0,length:6,value:`123456`,invalid:!0}),m(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Type, paste "ABCD1234" into any box, Backspace goes back. Filled boxes tint in the accent.`}},__svelteCsf:{rawCode:`<Stack gap="md">
  <CodeInput label="Device code" length={8} groupAfter={4} bind:value={code} />
  <StatusText message="Value: {code || '—'}" />
  <CodeInput label="One-time code" numeric length={6} />
  <CodeInput label="Wrong code" numeric length={6} value="123456" invalid />
</Stack>`}}});var U=o(B,2);Y(U,{name:`FileDropzone`,asChild:!0,children:(e,t)=>{O(e,{gap:`md`,children:(e,t)=>{var n=Z(),r=h(n);V(r,{accept:`.pdf,.md,.txt,.docx,.html`,maxBytes:52428800,hint:`PDF, Markdown, text, Word or HTML · up to 50 MB`,get file(){return a(_)},set file(e){p(_,e,!0)}});var i=o(r,2);V(i,{file:new File([`x`.repeat(2048)],`quarterly-report.pdf`),progress:.64}),m(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Drop a file or click to choose; drag one over to see the accent glow. Below: an upload in
    progress.`}},__svelteCsf:{rawCode:`<Stack gap="md">
  <FileDropzone
    bind:file
    accept=".pdf,.md,.txt,.docx,.html"
    maxBytes={50 * 1024 * 1024}
    hint="PDF, Markdown, text, Word or HTML · up to 50 MB"
  />
  <FileDropzone file={new File(['x'.repeat(2048)], 'quarterly-report.pdf')} progress={0.64} />
</Stack>`}}});var W=o(U,2);Y(W,{name:`VersionRail`,asChild:!0,children:(e,t)=>{{let t=u(()=>[`v1`,`v2`,`v3`,`v4`,`v5`,`v6`].map((e,t)=>({value:e,label:e,marked:t===5,title:`Version ${t+1}`})));fe(e,{get items(){return a(t)},get value(){return a(v)},set value(e){p(v,e,!0)}})}},$$slots:{default:!0},parameters:{docs:{description:{story:`Jump between versions; the current one is the tinted "selected" layer (a selection, not an
    action, so no solid fill), the latest carries a dot.`}},__svelteCsf:{rawCode:`<VersionRail
  bind:value={version}
  items={['v1', 'v2', 'v3', 'v4', 'v5', 'v6'].map((v, i) => ({
    value: v,
    label: v,
    marked: i === 5,
    title: \`Version \${i + 1}\`,
  }))}
/>`}}});var G=o(W,2);Y(G,{name:`Route tabs with action`,asChild:!0,children:(e,t)=>{T(e,{children:(e,t)=>{ce(e,{label:`Sections`,value:`active`,tabs:[{value:`active`,label:`Active`,href:`#active`,count:1284},{value:`downloads`,label:`Downloads`,href:`#downloads`},{value:`archive`,label:`Archive`,href:`#archive`}],actions:e=>{x(e,{size:`sm`,variant:`primary`,icon:`plus`,label:`New`})},$$slots:{actions:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Tabs as links (route navigation) with a "+ New" action at the end.`}},__svelteCsf:{rawCode:`<Card>
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
</Card>`}}});var q=o(G,2);Y(q,{name:`Small segmented & wrap`,asChild:!0,children:(e,t)=>{O(e,{gap:`md`,align:`start`,children:(e,t)=>{var n=Z(),r=h(n);D(r,{size:`sm`,label:`Language`,options:[{value:`de`,label:`DE`},{value:`en`,label:`EN`}],get value(){return a(y)},set value(e){p(y,e,!0)}});var i=o(r,2);{let e=u(()=>[`256Mi`,`512Mi`,`1Gi`,`2Gi`,`5Gi`,`10Gi`,`20Gi`,`50Gi`].map(e=>({value:e,label:e})));D(i,{wrap:!0,label:`Capacity`,value:`1Gi`,get options(){return a(e)}})}m(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A compact pill switch, and many options wrapping onto several lines.`}},__svelteCsf:{rawCode:`<Stack gap="md" align="start">
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
</Stack>`}}});var J=o(q,2);Y(J,{name:`Field hint with code, inline copy`,asChild:!0,children:(e,t)=>{O(e,{gap:`md`,children:(e,t)=>{var n=_e(),i=h(n);ae(i,{label:`User prompt`,hint:e=>{s();var t=ge(),n=o(h(t));n.textContent=`{{content}}`,s(),m(e,t)},children:(e,t)=>{let n=()=>t?.().id;ie(e,{get id(){return n()},value:`Summarise {{content}}`})},$$slots:{hint:!0,default:!0}});var a=o(i,2),l=o(ee(a));se(l,{value:`urn:doc:example-4711`,children:(e,t)=>{s();var n=r(`urn:doc:example-4711`);m(e,n)},$$slots:{default:!0}}),c(a),m(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A hint with inline code, and a value that copies itself when clicked.`}},__svelteCsf:{rawCode:`<Stack gap="md">
  <Field label="User prompt">
    {#snippet hint()}Use <code>{'{{content}}'}</code> where the page text goes.{/snippet}
    {#snippet children({ id })}<Input {id} value={'Summarise {{content}}'} />{/snippet}
  </Field>
  <span>
    Document id:
    <CopyButton value="urn:doc:example-4711">urn:doc:example-4711</CopyButton>
  </span>
</Stack>`}}}),m(e,k),t()}var J,Y,X,pe,Z,me,he,ge,_e,ve,Q,ye,be,xe,Se,$,Ce,we,Te,Ee,De,Oe,ke,Ae,je;function Me(){return(Me=e((()=>{i(),l(),g(),I(),W(),k(),j(),L(),C(),B(),G(),R(),E(),M(),U(),b(),w(),S(),N(),oe(),F(),f(),_(),J={title:`Molecules/Tools, input & output`,component:A,tags:[`autodocs`],parameters:{layout:`padded`}},{Story:Y}=v(J),X=`**Bold**, a [link](https://example.com) and an unsafe <img src=x onerror="alert(1)"> image — the handler is removed.

> Quotes take the accent.

| City | Stores |
| --- | --- |
| Riverside | 42 |
| Lakeside | 31 |`,pe=[{value:`search_products`,label:`search_products`,description:`Full-text product search`},{value:`get_product`,label:`get_product`,description:`One product by id`},{value:`geocode`,label:`geocode`,description:`Place name to coordinates`},{value:`nearby`,label:`nearby`,description:`Stores within a radius`},{value:`orders`,label:`orders`,description:`Order history lookups`},{value:`admin_only`,label:`admin_only`,description:`Not available here`,disabled:!0}],Z=n(`<!> <!>`,1),me=n(`<!> <!> <!> <!> <!> <!>`,1),he=n(`<!> <!> <!> <!>`,1),ge=n(`Use <code></code> where the page text goes.`,1),_e=n(`<!> <span>Document id: <!></span>`,1),ve=n(`<!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!>`,1),q.__docgen={data:[],name:`Tools.stories.svelte`},Q=y(q,J),ye=[`Composer`,`ComposerInlineCmdEnter`,`ComposerInlineAReply`,`MarkdownStreaming`,`MarkdownSanitized`,`JobStatus`,`CheckboxGroup`,`CodeInput`,`FileDropzone`,`VersionRail`,`RouteTabsWithAction`,`SmallSegmentedWrap`,`FieldHintWithCodeInlineCopy`],be={...Q.Composer,tags:[`svelte-csf-v5`]},xe={...Q.ComposerInlineCmdEnter,tags:[`svelte-csf-v5`]},Se={...Q.ComposerInlineAReply,tags:[`svelte-csf-v5`]},$={...Q.MarkdownStreaming,tags:[`svelte-csf-v5`]},Ce={...Q.MarkdownSanitized,tags:[`svelte-csf-v5`]},we={...Q.JobStatus,tags:[`svelte-csf-v5`]},Te={...Q.CheckboxGroup,tags:[`svelte-csf-v5`]},Ee={...Q.CodeInput,tags:[`svelte-csf-v5`]},De={...Q.FileDropzone,tags:[`svelte-csf-v5`]},Oe={...Q.VersionRail,tags:[`svelte-csf-v5`]},ke={...Q.RouteTabsWithAction,tags:[`svelte-csf-v5`]},Ae={...Q.SmallSegmentedWrap,tags:[`svelte-csf-v5`]},je={...Q.FieldHintWithCodeInlineCopy,tags:[`svelte-csf-v5`]}})))()}Me();export{Te as CheckboxGroup,Ee as CodeInput,be as Composer,Se as ComposerInlineAReply,xe as ComposerInlineCmdEnter,je as FieldHintWithCodeInlineCopy,De as FileDropzone,we as JobStatus,Ce as MarkdownSanitized,$ as MarkdownStreaming,ke as RouteTabsWithAction,Ae as SmallSegmentedWrap,Oe as VersionRail,ye as __namedExportsOrder,J as default};