import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Bt as t,Ct as n,Dt as r,En as i,Gt as a,Jt as o,Kt as s,N as c,Nn as l,Pt as u,Tn as d,Yt as f,Zt as p,_t as m,b as h,en as g,hn as _,jn as v,l as y,mn as b,nn as x,rt as S,xt as C}from"./iframe-CjPY-Fqe.js";import{i as w,n as T,r as E,t as D}from"./create-runtime-stories-tZqyKHa4.js";import{n as O,t as k}from"./Icon-BsrMuJLX.js";import{n as A,t as j}from"./Button-CrEFh_Av.js";import{n as ee,t as te}from"./Input-RygKzsVc.js";import{n as ne,t as re}from"./Field-DPTQVZQ6.js";import{n as ie,t as M}from"./Text-nenG6wE1.js";import{n as N,t as P}from"./Stack-BmjVbqUs.js";import{n as F,t as I}from"./Row-FH_DsT13.js";import{n as L,t as R}from"./CommentThread-CNIgGtDG.js";import{d as z,l as B,p as V,t as H}from"./mock-collab-Dc5VTaAB.js";import{n as U,t as W}from"./ContextPanel-rx1t3sKS.js";function G(e,n){_(n,!0);let l=p([{id:`d1`,name:`Quarterly report`,kind:`Document`,comments:[...V]},{id:`d2`,name:`Launch budget`,kind:`Spreadsheet`,comments:[...z]},{id:`d3`,name:`Team offsite photos`,kind:`Pictures`,comments:[]}]),y=x(void 0);function w(e){let t=e.target.closest(`[data-doc]`)?.dataset.doc;return l.find(e=>e.id===t)}function T(e,t,n){e.preventDefault();let r=String(new FormData(e.currentTarget).get(`name`)??``);r.trim()&&(t.name=r.trim()),n()}async function E(e,t){await new Promise(e=>setTimeout(e,400)),e.comments=[...e.comments,{id:crypto.randomUUID(),author:`alex.morgan@example.com`,time:new Date,text:t}]}q(e,{name:`Rename and comment`,asChild:!0,children:(e,n)=>{h(W(e,{label:`Document`,width:`340px`,onopen:w,panel:(e,t=v,n=v)=>{P(e,{gap:`md`,children:(e,r)=>{var i=J(),a=s(i);P(a,{as:`form`,gap:`sm`,onsubmit:e=>T(e,t(),n()),children:(e,r)=>{var i=J(),a=s(i);re(a,{label:`Name`,children:(e,n)=>{let r=()=>n?.().id;te(e,{get id(){return r()},name:`name`,get value(){return t().name},"data-autofocus":!0})},$$slots:{default:!0}});var o=f(a,2);I(o,{justify:`end`,gap:`sm`,children:(e,t)=>{var r=J(),i=s(r);j(i,{size:`sm`,variant:`ghost`,label:`Cancel`,get onclick(){return n()}});var a=f(i,2);j(a,{size:`sm`,variant:`primary`,type:`submit`,label:`Rename`}),C(e,r)},$$slots:{default:!0}}),C(e,i)},$$slots:{default:!0}});var o=f(a,2);R(o,{get comments(){return t().comments},get now(){return H},startPlaceholder:`Start a thread about this document`,onreply:e=>E(t(),e)}),C(e,i)},$$slots:{default:!0}})},children:(e,n)=>{P(e,{gap:`sm`,children:(e,n)=>{var p=J(),h=s(p);M(h,{tone:`muted`,children:(e,t)=>{d();var n=r(`Your documents — right-click one.`);C(e,n)},$$slots:{default:!0}});var g=f(h,2);S(g,17,()=>l,e=>e.id,(e,n)=>{var s=Y(),l=a(s);k(l,{name:`file-text`});var p=f(l,2),h=o(p,!0),g=f(p,2);M(g,{tone:`muted`,size:`sm`,children:(e,i)=>{d();var a=r();t(()=>m(a,u(n).kind)),C(e,a)},$$slots:{default:!0}});var _=f(g,2);j(_,{size:`sm`,variant:`ghost`,icon:`chat`,iconOnly:!0,get label(){return`Comments on ${u(n).name??``} (${u(n).comments.length??``})`},onclick:e=>u(y)?.openFor(e.currentTarget,u(n))}),i(s),t(()=>{c(s,`data-doc`,u(n).id),m(h,u(n).name)}),C(e,s)}),C(e,p)},$$slots:{default:!0}})},$$slots:{panel:!0,default:!0}}),e=>g(y,e,!0),()=>u(y))},$$slots:{default:!0},parameters:{docs:{description:{story:`Right-click a row (or focus its comment key and press Shift+F10): the panel opens at the pointer with a
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
</ContextPanel>`}}}),b()}var K,q,J,Y,X,Z,Q;function $(){return($=e((()=>{l(),w(),U(),A(),O(),ee(),ie(),ne(),L(),N(),F(),B(),y(),T(),K={title:`Organisms/Desktop & OS/ContextPanel`,component:W,tags:[`autodocs`]},{Story:q}=E(K),J=n(`<!> <!>`,1),Y=n(`<div class="row svelte-3mtmis"><!> <span class="name svelte-3mtmis"> </span> <!> <!></div>`),G.__docgen={data:[],name:`ContextPanel.stories.svelte`},X=D(G,K),Z=[`RenameAndComment`],Q={...X.RenameAndComment,tags:[`svelte-csf-v5`]}})))()}$();export{Q as RenameAndComment,Z as __namedExportsOrder,K as default};