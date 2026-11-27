import{n as e}from"./rolldown-runtime-Dxh6kD9_.js";import{$t as t,Ct as n,Dt as r,Ft as i,Gt as a,Ht as o,Mn as s,N as c,On as l,Pt as u,Rt as d,Sn as f,Vt as p,Wt as m,_t as h,b as g,cn as _,jn as v,l as y,on as b,tt as ee,xn as x,xt as S,zt as C}from"./iframe-WlNMZtZ0.js";import{i as w,n as T,r as E,t as D}from"./create-runtime-stories-CbHiKinS.js";import{n as te,t as ne}from"./Icon-DWu5QcKY.js";import{n as re,t as O}from"./Button-DHLILcYm.js";import{n as ie,t as ae}from"./Input-DeTI9rlx.js";import{n as k,t as A}from"./Field-DtdH1dfq.js";import{n as j,t as M}from"./Text-DMhRT0Hz.js";import{n as N,t as P}from"./Stack-BjV-rmuj.js";import{n as F,t as I}from"./Row-IIXhUlbK.js";import{n as L,t as R}from"./CommentThread-C5yzgjZW.js";import{d as z,l as B,p as V,t as H}from"./mock-collab-WaqOeYm2.js";import{n as U,t as W}from"./ContextPanel-BHuyXaQ1.js";function G(e,n){f(n,!0);let i=m([{id:`d1`,name:`Quarterly report`,kind:`Document`,comments:[...V]},{id:`d2`,name:`Launch budget`,kind:`Spreadsheet`,comments:[...z]},{id:`d3`,name:`Team offsite photos`,kind:`Pictures`,comments:[]}]),u=_(void 0);function y(e){let t=e.target.closest(`[data-doc]`)?.dataset.doc;return i.find(e=>e.id===t)}function w(e,t,n){e.preventDefault();let r=String(new FormData(e.currentTarget).get(`name`)??``);r.trim()&&(t.name=r.trim()),n()}async function T(e,t){await new Promise(e=>setTimeout(e,400)),e.comments=[...e.comments,{id:crypto.randomUUID(),author:`alex.morgan@example.com`,time:new Date,text:t}]}q(e,{name:`Rename and comment`,asChild:!0,children:(e,n)=>{g(W(e,{label:`Document`,width:`340px`,onopen:y,panel:(e,t=l,n=l)=>{P(e,{gap:`md`,children:(e,r)=>{var i=J(),a=C(i);P(a,{as:`form`,gap:`sm`,onsubmit:e=>w(e,t(),n()),children:(e,r)=>{var i=J(),a=C(i);A(a,{label:`Name`,children:(e,n)=>{let r=()=>n?.().id;ae(e,{get id(){return r()},name:`name`,get value(){return t().name},"data-autofocus":!0})},$$slots:{default:!0}});var s=o(a,2);I(s,{justify:`end`,gap:`sm`,children:(e,t)=>{var r=J(),i=C(r);O(i,{size:`sm`,variant:`ghost`,label:`Cancel`,get onclick(){return n()}});var a=o(i,2);O(a,{size:`sm`,variant:`primary`,type:`submit`,label:`Rename`}),S(e,r)},$$slots:{default:!0}}),S(e,i)},$$slots:{default:!0}});var s=o(a,2);R(s,{get comments(){return t().comments},get now(){return H},startPlaceholder:`Start a thread about this document`,onreply:e=>T(t(),e)}),S(e,i)},$$slots:{default:!0}})},children:(e,n)=>{P(e,{gap:`sm`,children:(e,n)=>{var l=J(),f=C(l);M(f,{tone:`muted`,children:(e,t)=>{v();var n=r(`Your documents — right-click one.`);S(e,n)},$$slots:{default:!0}});var m=o(f,2);ee(m,17,()=>i,e=>e.id,(e,n)=>{var i=Y(),l=d(i);ne(l,{name:`file-text`});var f=o(l,2),m=p(f,!0),g=o(f,2);M(g,{tone:`muted`,size:`sm`,children:(e,i)=>{v();var o=r();t(()=>h(o,a(n).kind)),S(e,o)},$$slots:{default:!0}});var _=o(g,2);O(_,{size:`sm`,variant:`ghost`,icon:`chat`,iconOnly:!0,get label(){return`Comments on ${a(n).name??``} (${a(n).comments.length??``})`},onclick:e=>a(u)?.openFor(e.currentTarget,a(n))}),s(i),t(()=>{c(i,`data-doc`,a(n).id),h(m,a(n).name)}),S(e,i)}),S(e,l)},$$slots:{default:!0}})},$$slots:{panel:!0,default:!0}}),e=>b(u,e,!0),()=>a(u))},$$slots:{default:!0},parameters:{docs:{description:{story:`Right-click a row (or focus its comment key and press Shift+F10): the panel opens at the pointer with a
    rename field and the row's comments. The speech-bubble key on a row opens the same panel
    under itself (\`openFor\`). A right-click on the heading returns nothing from \`onopen\`, so the
    browser's own menu shows there.

    Why a panel instead of a menu with "Rename…" and "Comments…"? The edit happens where you
    pointed — no dialog in the middle of the screen, no hunt for the row afterwards. Replies,
    reactions and the reply box's growth keep it inside the window; Escape or a click outside
    puts it away and focus goes back to where it was.`}},__svelteCsf:{rawCode:`<ContextPanel bind:this={contextPanel} label="Document" width="340px" onopen={rowAt}>
  {#snippet panel(doc, close)}
    <Stack gap="md">
      <Stack as="form" gap="sm" onsubmit={(event: SubmitEvent) => rename(event, doc, close)}>
        <Field label="Name">
          {#snippet children({ id })}
            <Input {id} name="name" value={doc.name} data-autofocus />
          {/snippet}
        </Field>
        <Row justify="end" gap="sm">
          <Button size="sm" variant="ghost" label="Cancel" onclick={close} />
          <Button size="sm" variant="primary" type="submit" label="Rename" />
        </Row>
      </Stack>
      <CommentThread
        comments={doc.comments}
        now={NOW}
        startPlaceholder="Start a thread about this document"
        onreply={(text) => reply(doc, text)}
      />
    </Stack>
  {/snippet}

  <Stack gap="sm">
    <Text tone="muted">Your documents — right-click one.</Text>
    {#each docs as doc (doc.id)}
      <div class="row" data-doc={doc.id}>
        <Icon name="file-text" />
        <span class="name">{doc.name}</span>
        <Text tone="muted" size="sm">{doc.kind}</Text>
        <Button
          size="sm"
          variant="ghost"
          icon="chat"
          iconOnly
          label="Comments on {doc.name} ({doc.comments.length})"
          onclick={(event: MouseEvent) =>
            contextPanel?.openFor(event.currentTarget as HTMLElement, doc)}
        />
      </div>
    {/each}
  </Stack>
</ContextPanel>`}}}),x()}var K,q,J,Y,X,Z,Q;function $(){return($=e((()=>{i(),u(),w(),U(),re(),te(),ie(),j(),k(),L(),N(),F(),B(),y(),T(),K={title:`Organisms/Desktop & OS/ContextPanel`,component:W,tags:[`autodocs`]},{Story:q}=E(K),J=n(`<!> <!>`,1),Y=n(`<div class="row svelte-3mtmis"><!> <span class="name svelte-3mtmis"> </span> <!> <!></div>`),G.__docgen={data:[],name:`ContextPanel.stories.svelte`},X=D(G,K),Z=[`RenameAndComment`],Q={...X.RenameAndComment,tags:[`svelte-csf-v5`]}})))()}$();export{Q as RenameAndComment,Z as __namedExportsOrder,K as default};