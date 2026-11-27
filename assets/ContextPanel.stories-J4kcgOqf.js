import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{$t as t,An as n,Cn as r,Ct as i,Dt as a,Ft as o,Gt as s,Ht as c,N as l,Nn as u,Pn as d,Pt as f,Rt as p,Vt as m,Wt as h,_t as g,b as _,cn as v,l as y,on as ee,tt as b,wn as x,xt as S,zt as C}from"./iframe-D3QpTFc1.js";import{i as w,n as T,r as E,t as te}from"./create-runtime-stories-bgfxAijx.js";import{n as ne,t as re}from"./Icon-BVq5M3c4.js";import{n as ie,t as D}from"./Button-DO5WmEfH.js";import{n as ae,t as O}from"./Input-CpEmBp8q.js";import{n as k,t as A}from"./Field-57DUJksD.js";import{n as j,t as M}from"./Text-BTTrRnHh.js";import{n as N,t as P}from"./Stack-DIO0U5nL.js";import{n as F,t as I}from"./Row-B0vuEKpz.js";import{n as L,t as R}from"./CommentThread-Deno96iv.js";import{d as z,l as B,p as V,t as H}from"./mock-collab-Dc5VTaAB.js";import{n as U,t as W}from"./ContextPanel-CRCYZHsq.js";function G(e,i){x(i,!0);let o=h([{id:`d1`,name:`Quarterly report`,kind:`Document`,comments:[...V]},{id:`d2`,name:`Launch budget`,kind:`Spreadsheet`,comments:[...z]},{id:`d3`,name:`Team offsite photos`,kind:`Pictures`,comments:[]}]),f=v(void 0);function y(e){let t=e.target.closest(`[data-doc]`)?.dataset.doc;return o.find(e=>e.id===t)}function w(e,t,n){e.preventDefault();let r=String(new FormData(e.currentTarget).get(`name`)??``);r.trim()&&(t.name=r.trim()),n()}async function T(e,t){await new Promise(e=>setTimeout(e,400)),e.comments=[...e.comments,{id:crypto.randomUUID(),author:`alex.morgan@example.com`,time:new Date,text:t}]}q(e,{name:`Rename and comment`,asChild:!0,children:(e,r)=>{_(W(e,{label:`Document`,width:`340px`,onopen:y,panel:(e,t=n,r=n)=>{P(e,{gap:`md`,children:(e,n)=>{var i=J(),a=C(i);P(a,{as:`form`,gap:`sm`,onsubmit:e=>w(e,t(),r()),children:(e,n)=>{var i=J(),a=C(i);A(a,{label:`Name`,children:(e,n)=>{let r=()=>n?.().id;O(e,{get id(){return r()},name:`name`,get value(){return t().name},"data-autofocus":!0})},$$slots:{default:!0}});var o=c(a,2);I(o,{justify:`end`,gap:`sm`,children:(e,t)=>{var n=J(),i=C(n);D(i,{size:`sm`,variant:`ghost`,label:`Cancel`,get onclick(){return r()}});var a=c(i,2);D(a,{size:`sm`,variant:`primary`,type:`submit`,label:`Rename`}),S(e,n)},$$slots:{default:!0}}),S(e,i)},$$slots:{default:!0}});var o=c(a,2);R(o,{get comments(){return t().comments},get now(){return H},startPlaceholder:`Start a thread about this document`,onreply:e=>T(t(),e)}),S(e,i)},$$slots:{default:!0}})},children:(e,n)=>{P(e,{gap:`sm`,children:(e,n)=>{var r=J(),i=C(r);M(i,{tone:`muted`,children:(e,t)=>{u();var n=a(`Your documents — right-click one.`);S(e,n)},$$slots:{default:!0}});var h=c(i,2);b(h,17,()=>o,e=>e.id,(e,n)=>{var r=Y(),i=p(r);re(i,{name:`file-text`});var o=c(i,2),h=m(o,!0),_=c(o,2);M(_,{tone:`muted`,size:`sm`,children:(e,r)=>{u();var i=a();t(()=>g(i,s(n).kind)),S(e,i)},$$slots:{default:!0}});var v=c(_,2);D(v,{size:`sm`,variant:`ghost`,icon:`chat`,iconOnly:!0,get label(){return`Comments on ${s(n).name??``} (${s(n).comments.length??``})`},onclick:e=>s(f)?.openFor(e.currentTarget,s(n))}),d(r),t(()=>{l(r,`data-doc`,s(n).id),g(h,s(n).name)}),S(e,r)}),S(e,r)},$$slots:{default:!0}})},$$slots:{panel:!0,default:!0}}),e=>ee(f,e,!0),()=>s(f))},$$slots:{default:!0},parameters:{docs:{description:{story:`Right-click a row (or focus its comment key and press Shift+F10): the panel opens at the pointer with a
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
</ContextPanel>`}}}),r()}var K,q,J,Y,X,Z,Q;function $(){return($=e((()=>{o(),f(),w(),U(),ie(),ne(),ae(),j(),k(),L(),N(),F(),B(),y(),T(),K={title:`Organisms/Desktop & OS/ContextPanel`,component:W,tags:[`autodocs`]},{Story:q}=E(K),J=i(`<!> <!>`,1),Y=i(`<div class="row svelte-3mtmis"><!> <span class="name svelte-3mtmis"> </span> <!> <!></div>`),G.__docgen={data:[],name:`ContextPanel.stories.svelte`},X=te(G,K),Z=[`RenameAndComment`],Q={...X.RenameAndComment,tags:[`svelte-csf-v5`]}})))()}$();export{Q as RenameAndComment,Z as __namedExportsOrder,K as default};