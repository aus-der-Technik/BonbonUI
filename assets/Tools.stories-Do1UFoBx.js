import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Cn as t,Et as n,Mt as r,Qt as i,St as a,Ut as o,Wt as s,Yt as c,bt as l,ct as u,en as d,fn as ee,jn as f,l as p,on as m,pn as te,qt as h,wn as ne}from"./iframe-Dd9zCUtD.js";import{i as g,n as _,r as v,t as y}from"./create-runtime-stories-Bj9BSqmd.js";import{n as b,t as x}from"./Button-CAKf1gbx.js";import{n as S,t as re}from"./Input-Z-JpGlj1.js";import{n as C,t as ie}from"./Field-MbNEi3Jk.js";import{n as w,t as T}from"./Card-o6xHO1cU.js";import{n as E,t as D}from"./SegmentedControl-CoBzM_Xy.js";import{n as O,t as k}from"./Stack-B3I2k7mw.js";import{n as A,t as j}from"./Composer-DYvfkoSB.js";import{n as M,t as ae}from"./CopyButton-jZCAJnuE.js";import{n as N,t as oe}from"./Tabs-BlV5ULzo.js";import{n as P,t as se}from"./StatusText-sjba1pJX.js";import{l as F,t as ce}from"./mock-CoQSv9oT.js";import{n as I,t as le}from"./CheckboxGroup-B4Hsmnu2.js";import{n as L,t as ue}from"./Disclosure-CUvvYfpM.js";import{n as R,t as z}from"./Markdown-D88y_rqe.js";import{n as B,t as V}from"./FileDropzone-BXwogCXi.js";import{a as H,i as U,n as W,o as G,r as de,t as K}from"./CodeInput-CR5u5nR9.js";function q(e,a){te(a,!0);let f=d(``),p=d(``),g=d(c([`search_products`,`get_product`])),_=d(``),v=d(null),y=d(`v3`),b=d(`en`),S=d(``),C=d(!1),w=d(!0);function E(){i(S,``),i(C,!0);let e=ce.split(/(?<=\s)/),t=0,n=setInterval(()=>{i(S,r(S)+e.slice(t,t+3).join(``)),t+=3,t>=e.length&&(clearInterval(n),i(C,!1))},40)}var O=ve(),A=s(O);Y(A,{name:`Composer`,asChild:!0,children:(e,t)=>{k(e,{gap:`sm`,children:(e,t)=>{var n=X(),a=s(n);j(a,{label:`Question`,placeholder:`Ask about products, stores or orders…`,buttonLabel:`Ask`,icon:`send`,onsubmit:e=>i(p,e,!0),get value(){return r(f)},set value(e){i(f,e,!0)}});var o=h(a,2),c=e=>{se(e,{get message(){return`Sent: ${r(p)??``}`}})};u(o,e=>{r(p)&&e(c)}),l(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A prompt box: the field and its send button share one glass box that glows while focused.
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
</Stack>`}}});var M=h(A,2);Y(M,{name:`Composer inline, Cmd+Enter`,asChild:!0,children:(e,t)=>{j(e,{label:`Query`,layout:`inline`,submitOn:`mod-enter`,minRows:1,minLength:3,buttonLabel:`Categorise`,onsubmit:()=>{}})},$$slots:{default:!0},parameters:{docs:{description:{story:`One line with the button beside it; Cmd/Ctrl+Enter sends, so Enter can break lines.`}},__svelteCsf:{rawCode:`<Composer
  label="Query"
  layout="inline"
  submitOn="mod-enter"
  minRows={1}
  minLength={3}
  buttonLabel="Categorise"
  onsubmit={() => {}}
/>`}}});var N=h(M,2);Y(N,{name:`Markdown streaming`,asChild:!0,children:(e,t)=>{T(e,{title:`Answer`,actions:e=>{x(e,{size:`sm`,icon:`play`,label:`Stream answer`,onclick:E})},children:(e,t)=>{z(e,{get source(){return r(S)},get streaming(){return r(C)},placeholder:`The answer appears here.`})},$$slots:{actions:!0,default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"A streamed answer: keep passing the growing `source`; a caret blinks while `streaming`."}},__svelteCsf:{rawCode:`<Card title="Answer">
  {#snippet actions()}<Button
      size="sm"
      icon="play"
      label="Stream answer"
      onclick={stream}
    />{/snippet}
  <Markdown source={streamed} {streaming} placeholder="The answer appears here." />
</Card>`}}});var P=h(N,2);Y(P,{name:`Markdown sanitized`,asChild:!0,children:(e,t)=>{T(e,{children:(e,t)=>{z(e,{source:fe})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Markdown is sanitized: the image's handler is gone.`}},__svelteCsf:{rawCode:`<Card>
  <Markdown source={UNSAFE} />
</Card>`}}});var F=h(P,2);Y(F,{name:`JobStatus`,asChild:!0,children:(e,t)=>{T(e,{children:(e,t)=>{k(e,{gap:`lg`,children:(e,t)=>{var n=me(),r=s(n);H(r,{status:`queued`});var i=h(r,2);H(i,{status:`running`,step:`importing · 12 files`});var a=h(i,2);H(a,{status:`running`,step:`resizing images`,done:17,total:40});var o=h(a,2);H(o,{status:`done`,done:40,total:40,detail:`38 updated · 2 skipped`});var c=h(o,2);H(c,{status:`failed`,step:`timeout after 30 min`,done:22,total:40});var u=h(c,2);H(u,{status:`cached`}),l(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Where a background job stands: queued, running (with steps and progress), done, failed.`}},__svelteCsf:{rawCode:`<Card>
  <Stack gap="lg">
    <JobStatus status="queued" />
    <JobStatus status="running" step="importing · 12 files" />
    <JobStatus status="running" step="resizing images" done={17} total={40} />
    <JobStatus status="done" done={40} total={40} detail="38 updated · 2 skipped" />
    <JobStatus status="failed" step="timeout after 30 min" done={22} total={40} />
    <JobStatus status="cached" />
  </Stack>
</Card>`}}});var I=h(F,2);Y(I,{name:`CheckboxGroup`,asChild:!0,children:(e,t)=>{T(e,{children:(e,t)=>{ue(e,{title:`Tools`,icon:`settings`,get meta(){return`${r(g).length??``} enabled`},get open(){return r(w)},set open(e){i(w,e,!0)},actions:e=>{x(e,{size:`xs`,label:`Reset`,onclick:()=>i(g,[`search_products`],!0)})},children:(e,t)=>{le(e,{label:`Allowed tools`,get options(){return pe},mono:!0,get value(){return r(g)},set value(e){i(g,e,!0)}})},$$slots:{actions:!0,default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A checkbox grid inside a Disclosure, with a reset action in its heading.`}},__svelteCsf:{rawCode:`<Card>
  <Disclosure title="Tools" icon="settings" meta="{tools.length} enabled" bind:open={toolsOpen}>
    {#snippet actions()}<Button
        size="xs"
        label="Reset"
        onclick={() => (tools = ['search_products'])}
      />{/snippet}
    <CheckboxGroup label="Allowed tools" options={toolOptions} bind:value={tools} mono />
  </Disclosure>
</Card>`}}});var L=h(I,2);Y(L,{name:`CodeInput`,asChild:!0,children:(e,t)=>{k(e,{gap:`md`,children:(e,t)=>{var n=he(),a=s(n);K(a,{label:`Device code`,length:8,groupAfter:4,get value(){return r(_)},set value(e){i(_,e,!0)}});var o=h(a,2);{let e=m(()=>r(_)||`—`);se(o,{get message(){return`Value: ${r(e)??``}`}})}var c=h(o,2);K(c,{label:`One-time code`,numeric:!0,length:6});var u=h(c,2);K(u,{label:`Wrong code`,numeric:!0,length:6,value:`123456`,invalid:!0}),l(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Type, paste "ABCD1234" into any box, Backspace goes back. Filled boxes tint in the accent.`}},__svelteCsf:{rawCode:`<Stack gap="md">
  <CodeInput label="Device code" length={8} groupAfter={4} bind:value={code} />
  <StatusText message="Value: {code || '—'}" />
  <CodeInput label="One-time code" numeric length={6} />
  <CodeInput label="Wrong code" numeric length={6} value="123456" invalid />
</Stack>`}}});var R=h(L,2);Y(R,{name:`FileDropzone`,asChild:!0,children:(e,t)=>{k(e,{gap:`md`,children:(e,t)=>{var n=X(),a=s(n);V(a,{accept:`.pdf,.md,.txt,.docx,.html`,maxBytes:52428800,hint:`PDF, Markdown, text, Word or HTML · up to 50 MB`,get file(){return r(v)},set file(e){i(v,e,!0)}});var o=h(a,2);V(o,{file:new File([`x`.repeat(2048)],`quarterly-report.pdf`),progress:.64}),l(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Drop a file or click to choose; drag one over to see the accent glow. Below: an upload in
    progress.`}},__svelteCsf:{rawCode:`<Stack gap="md">
  <FileDropzone
    bind:file
    accept=".pdf,.md,.txt,.docx,.html"
    maxBytes={50 * 1024 * 1024}
    hint="PDF, Markdown, text, Word or HTML · up to 50 MB"
  />
  <FileDropzone file={new File(['x'.repeat(2048)], 'quarterly-report.pdf')} progress={0.64} />
</Stack>`}}});var B=h(R,2);Y(B,{name:`VersionRail`,asChild:!0,children:(e,t)=>{{let t=m(()=>[`v1`,`v2`,`v3`,`v4`,`v5`,`v6`].map((e,t)=>({value:e,label:e,marked:t===5,title:`Version ${t+1}`})));de(e,{get items(){return r(t)},get value(){return r(y)},set value(e){i(y,e,!0)}})}},$$slots:{default:!0},parameters:{docs:{description:{story:`Jump between versions; the current one is the tinted "selected" layer (a selection, not an
    action, so no solid fill), the latest carries a dot.`}},__svelteCsf:{rawCode:`<VersionRail
  bind:value={version}
  items={['v1', 'v2', 'v3', 'v4', 'v5', 'v6'].map((v, i) => ({
    value: v,
    label: v,
    marked: i === 5,
    title: \`Version \${i + 1}\`,
  }))}
/>`}}});var U=h(B,2);Y(U,{name:`Route tabs with action`,asChild:!0,children:(e,t)=>{T(e,{children:(e,t)=>{oe(e,{label:`Sections`,value:`active`,tabs:[{value:`active`,label:`Active`,href:`#active`,count:1284},{value:`downloads`,label:`Downloads`,href:`#downloads`},{value:`archive`,label:`Archive`,href:`#archive`}],actions:e=>{x(e,{size:`sm`,variant:`primary`,icon:`plus`,label:`New`})},$$slots:{actions:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Tabs as links (route navigation) with a "+ New" action at the end.`}},__svelteCsf:{rawCode:`<Card>
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
</Card>`}}});var W=h(U,2);Y(W,{name:`Small segmented & wrap`,asChild:!0,children:(e,t)=>{k(e,{gap:`md`,align:`start`,children:(e,t)=>{var n=X(),a=s(n);D(a,{size:`sm`,label:`Language`,options:[{value:`de`,label:`DE`},{value:`en`,label:`EN`}],get value(){return r(b)},set value(e){i(b,e,!0)}});var o=h(a,2);{let e=m(()=>[`256Mi`,`512Mi`,`1Gi`,`2Gi`,`5Gi`,`10Gi`,`20Gi`,`50Gi`].map(e=>({value:e,label:e})));D(o,{wrap:!0,label:`Capacity`,value:`1Gi`,get options(){return r(e)}})}l(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A compact pill switch, and many options wrapping onto several lines.`}},__svelteCsf:{rawCode:`<Stack gap="md" align="start">
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
</Stack>`}}});var G=h(W,2);Y(G,{name:`Field hint with code, inline copy`,asChild:!0,children:(e,r)=>{k(e,{gap:`md`,children:(e,r)=>{var i=_e(),a=s(i);ie(a,{label:`User prompt`,hint:e=>{t();var n=ge(),r=h(s(n));r.textContent=`{{content}}`,t(),l(e,n)},children:(e,t)=>{let n=()=>t?.().id;re(e,{get id(){return n()},value:`Summarise {{content}}`})},$$slots:{hint:!0,default:!0}});var c=h(a,2),u=h(o(c));ae(u,{value:`urn:doc:example-4711`,children:(e,r)=>{t();var i=n(`urn:doc:example-4711`);l(e,i)},$$slots:{default:!0}}),ne(c),l(e,i)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A hint with inline code, and a value that copies itself when clicked.`}},__svelteCsf:{rawCode:`<Stack gap="md">
  <Field label="User prompt">
    {#snippet hint()}Use <code>{'{{content}}'}</code> where the page text goes.{/snippet}
    {#snippet children({ id })}<Input {id} value={'Summarise {{content}}'} />{/snippet}
  </Field>
  <span>
    Document id:
    <CopyButton value="urn:doc:example-4711">urn:doc:example-4711</CopyButton>
  </span>
</Stack>`}}}),l(e,O),ee()}var J,Y,fe,pe,X,me,he,ge,_e,ve,Z,ye,be,xe,Se,Ce,we,Q,Te,Ee,De,Oe,ke,Ae;function $(){return($=e((()=>{f(),g(),I(),W(),A(),M(),L(),C(),B(),G(),R(),E(),N(),U(),b(),w(),S(),P(),O(),F(),p(),_(),J={title:`Molecules/Tools, input & output`,component:j,tags:[`autodocs`],parameters:{layout:`padded`}},{Story:Y}=v(J),fe=`**Bold**, a [link](https://example.com) and an unsafe <img src=x onerror="alert(1)"> image — the handler is removed.

> Quotes take the accent.

| City | Stores |
| --- | --- |
| Riverside | 42 |
| Lakeside | 31 |`,pe=[{value:`search_products`,label:`search_products`,description:`Full-text product search`},{value:`get_product`,label:`get_product`,description:`One product by id`},{value:`geocode`,label:`geocode`,description:`Place name to coordinates`},{value:`nearby`,label:`nearby`,description:`Stores within a radius`},{value:`orders`,label:`orders`,description:`Order history lookups`},{value:`admin_only`,label:`admin_only`,description:`Not available here`,disabled:!0}],X=a(`<!> <!>`,1),me=a(`<!> <!> <!> <!> <!> <!>`,1),he=a(`<!> <!> <!> <!>`,1),ge=a(`Use <code></code> where the page text goes.`,1),_e=a(`<!> <span>Document id: <!></span>`,1),ve=a(`<!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!>`,1),q.__docgen={data:[],name:`Tools.stories.svelte`},Z=y(q,J),ye=[`Composer`,`ComposerInlineCmdEnter`,`MarkdownStreaming`,`MarkdownSanitized`,`JobStatus`,`CheckboxGroup`,`CodeInput`,`FileDropzone`,`VersionRail`,`RouteTabsWithAction`,`SmallSegmentedWrap`,`FieldHintWithCodeInlineCopy`],be={...Z.Composer,tags:[`svelte-csf-v5`]},xe={...Z.ComposerInlineCmdEnter,tags:[`svelte-csf-v5`]},Se={...Z.MarkdownStreaming,tags:[`svelte-csf-v5`]},Ce={...Z.MarkdownSanitized,tags:[`svelte-csf-v5`]},we={...Z.JobStatus,tags:[`svelte-csf-v5`]},Q={...Z.CheckboxGroup,tags:[`svelte-csf-v5`]},Te={...Z.CodeInput,tags:[`svelte-csf-v5`]},Ee={...Z.FileDropzone,tags:[`svelte-csf-v5`]},De={...Z.VersionRail,tags:[`svelte-csf-v5`]},Oe={...Z.RouteTabsWithAction,tags:[`svelte-csf-v5`]},ke={...Z.SmallSegmentedWrap,tags:[`svelte-csf-v5`]},Ae={...Z.FieldHintWithCodeInlineCopy,tags:[`svelte-csf-v5`]}})))()}$();export{Q as CheckboxGroup,Te as CodeInput,be as Composer,xe as ComposerInlineCmdEnter,Ae as FieldHintWithCodeInlineCopy,Ee as FileDropzone,we as JobStatus,Ce as MarkdownSanitized,Se as MarkdownStreaming,Oe as RouteTabsWithAction,ke as SmallSegmentedWrap,De as VersionRail,ye as __namedExportsOrder,J as default};