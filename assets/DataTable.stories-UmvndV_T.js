import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{$t as t,An as n,Cn as r,Ct as i,Dt as a,Ft as o,Gt as s,Ht as c,Pt as l,St as u,Vt as d,Wt as f,_n as p,_t as m,cn as h,ct as g,l as _,on as v,wn as ee,xt as y,zt as b}from"./iframe-D3QpTFc1.js";import{i as x,n as S,r as C,t as w}from"./create-runtime-stories-bgfxAijx.js";import{n as T,t as E}from"./Badge-B63yScOp.js";import{n as D,t as O}from"./Button-DO5WmEfH.js";import{n as k,t as A}from"./Card-VkCagOi8.js";import{n as j,t as M}from"./DataTable-BMJoOiWO.js";import{n as N,o as P}from"./format-BmhxglcS.js";import{n as F,t as I}from"./Section-DwdRemnZ.js";import{n as L,t as R}from"./Stack-DIO0U5nL.js";import{n as te,t as ne}from"./ConfirmButton-5t4XKimU.js";import{l as re,s as ie}from"./mock-CoQSv9oT.js";import{n as ae,t as oe}from"./DetailList-4YdoHxUk.js";import{n as se,t as ce}from"./Pager-CHYFk9RZ.js";import{n as le,t as ue}from"./RatingDisplay-B6N6HRad.js";import{n as de,t as fe}from"./IdentityCell-CX8kSsbz.js";function z(e,t){ee(t,!0);let i=(e,t=n)=>{A(e,{surface:`subtle`,padding:`sm`,children:(e,n)=>{R(e,{gap:`sm`,align:`start`,children:(e,n)=>{var r=X(),i=b(r);{let e=p(()=>[...t().comment?[{label:`Comment`,value:t().comment}]:[],...t().query?[{label:`Query`,value:t().query}]:[],...t().pageUrl?[{label:`Page`,value:t().pageUrl,mono:!0}]:[],{label:`Submission`,value:t().id,mono:!0}]);oe(i,{get items(){return s(e)}})}var o=c(i,2);ne(o,{onconfirm:()=>v(a,s(a).filter(e=>e.id!==t().id),!0)}),y(e,r)},$$slots:{default:!0}})},$$slots:{default:!0}})},a=h(f(ie(60))),o=h(`receivedAt`),l=h(`desc`),u=h(0),d=h(`u2`),m=h(f([`u2`,`u3`])),g=h(f([...U])),_=h(void 0),x=0;function S(e){v(g,s(g).map(t=>e.includes(t.id)?{...t,status:`Invited`}:t),!0)}function C(){x+=1;let e=`n${x}`;v(g,[...s(g),{id:e,name:`New Example ${x}`,email:`new${x}@example.com`,role:`Viewer`,status:`Invited`}],!0),v(_,e)}let w=e=>Number(e.ratingValue===`up`?6:e.ratingValue===`down`?0:e.ratingValue),T=p(()=>[...s(a)].sort((e,t)=>{let n=s(o)===`rating`?w(e):e.receivedAt,r=s(o)===`rating`?w(t):t.receivedAt;return(n<r?-1:+(n>r))*(s(l)===`asc`?1:-1)})),E=p(()=>s(T).slice(s(u),s(u)+10));function D(e){v(l,s(o)===e&&s(l)===`desc`?`asc`:`desc`,!0),v(o,e,!0),v(u,0)}var k=Z(),j=b(k);K(j,{name:`Feedback list`,asChild:!0,children:(e,t)=>{A(e,{padding:`lg`,children:(e,t)=>{I(e,{title:`All feedback`,get description(){return`${s(a).length??``} matching · all time`},children:(e,t)=>{var n=X(),r=b(n);M(r,{get columns(){return H},get rows(){return s(E)},rowKey:e=>e.id,get sort(){return s(o)},get order(){return s(l)},onsort:D,get cell(){return B},get detail(){return i}});var d=c(r,2);ce(d,{get offset(){return s(u)},limit:10,get total(){return s(a).length},get count(){return s(E).length},onpage:e=>v(u,e,!0)}),y(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A report: sortable headers (the active one wears a tinted chevron), rows that open a detail on
    click / Enter / Space, and a Pager under it. Hover a row to see it light up.`}},__svelteCsf:{rawCode:`<Card padding="lg">
  <Section title="All feedback" description="{all.length} matching · all time">
    <DataTable
      {columns}
      rows={page}
      rowKey={(i) => i.id}
      {sort}
      {order}
      {onsort}
      {cell}
      {detail}
    />
    <Pager
      {offset}
      {limit}
      total={all.length}
      count={page.length}
      onpage={(next) => (offset = next)}
    />
  </Section>
</Card>`}}});var N=c(j,2);K(N,{name:`Selected row`,asChild:!0,children:(e,t)=>{A(e,{padding:`lg`,children:(e,t)=>{I(e,{title:`Members`,description:`Click a row to show that member`,children:(e,t)=>{M(e,{get columns(){return W},get rows(){return U},rowKey:e=>e.id,get cell(){return V},get current(){return s(d)},onrowclick:e=>v(d,e.id,!0)})},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"`onrowclick` makes every row a target; `current` lifts one row onto the selected layer (the\n    record on screen): tinted glass with a tint rim, the same look as a selected card or nav item.\n    Hovering paints the faint accent. Click a member."}},__svelteCsf:{rawCode:`<Card padding="lg">
  <Section title="Members" description="Click a row to show that member">
    <DataTable
      columns={memberColumns}
      rows={members}
      rowKey={(m) => m.id}
      cell={memberCell}
      {current}
      onrowclick={(m) => (current = m.id)}
    />
  </Section>
</Card>`}}});var P=c(N,2);K(P,{name:`Selection`,asChild:!0,children:(e,t)=>{A(e,{padding:`lg`,children:(e,t)=>{I(e,{title:`Members`,description:`Pick members to act on them together`,actions:e=>{O(e,{size:`sm`,icon:`plus`,label:`Invite`,onclick:C})},children:(e,t)=>{M(e,{get columns(){return W},get rows(){return s(g)},rowKey:e=>e.id,get cell(){return V},selectable:!0,selectRowLabel:e=>`Select ${e.name}`,get highlight(){return s(_)},get selected(){return s(m)},set selected(e){v(m,e,!0)},selectionActions:(e,t)=>{let n=()=>t?.().keys;var r=X(),i=b(r);O(i,{size:`sm`,variant:`primary`,icon:`send`,label:`Send reminder`,onclick:()=>S(n())});var a=c(i,2);ne(a,{size:`sm`,icon:`trash`,label:`Remove`,get confirmLabel(){return`Remove ${n().length??``}?`},onconfirm:()=>{v(g,s(g).filter(e=>!n().includes(e.id)),!0),v(m,[],!0)}}),y(e,r)},$$slots:{selectionActions:!0}})},$$slots:{actions:!0,default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"`selectable`: a checkbox column; the header box picks or clears the rows on screen (a dash when\n    some are picked), Shift+click picks a range, Space toggles the focused row, and a plain row\n    click toggles too when the row has no action of its own. `bind:selected` holds the keys.\n    `selectionActions` puts the bulk tools in a bar right on top of the table, with the count\n    and Clear. `highlight` glows the row a change landed on: invite someone."}},__svelteCsf:{rawCode:`<Card padding="lg">
  <Section title="Members" description="Pick members to act on them together">
    {#snippet actions()}
      <Button size="sm" icon="plus" label="Invite" onclick={invite} />
    {/snippet}
    <DataTable
      columns={memberColumns}
      rows={roster}
      rowKey={(m) => m.id}
      cell={memberCell}
      selectable
      bind:selected={picked}
      selectRowLabel={(m) => \`Select \${m.name}\`}
      highlight={fresh}
    >
      {#snippet selectionActions({ keys })}
        <Button
          size="sm"
          variant="primary"
          icon="send"
          label="Send reminder"
          onclick={() => remind(keys)}
        />
        <ConfirmButton
          size="sm"
          icon="trash"
          label="Remove"
          confirmLabel="Remove {keys.length}?"
          onconfirm={() => {
            roster = roster.filter((m) => !keys.includes(m.id));
            picked = [];
          }}
        />
      {/snippet}
    </DataTable>
  </Section>
</Card>`}}});var F=c(P,2);K(F,{name:`Linked rows`,asChild:!0,children:(e,t)=>{A(e,{padding:`lg`,children:(e,t)=>{I(e,{title:`Members`,description:`Each row opens that member`,children:(e,t)=>{M(e,{get columns(){return W},get rows(){return U},rowKey:e=>e.id,get cell(){return V},rowHref:e=>`#member-${e.id}`})},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:'`rowHref` makes each row a real link: the anchor sits in the first cell and stretches over the\n    row, so middle-click, "open in new tab" and client-side routers all work. Add `onrowclick` too\n    to handle plain clicks yourself (a router) while modified clicks still open the link.'}},__svelteCsf:{rawCode:`<Card padding="lg">
  <Section title="Members" description="Each row opens that member">
    <DataTable
      columns={memberColumns}
      rows={members}
      rowKey={(m) => m.id}
      cell={memberCell}
      rowHref={(m) => \`#member-\${m.id}\`}
    />
  </Section>
</Card>`}}});var L=c(F,2);K(L,{name:`Empty`,asChild:!0,children:(e,t)=>{R(e,{gap:`lg`,children:(e,t)=>{var n=X(),r=b(n);A(r,{padding:`lg`,children:(e,t)=>{M(e,{columns:[{key:`name`,label:`Name`},{key:`value`,label:`Value`,align:`end`}],rows:[],rowKey:()=>``,emptyIcon:`settings`,emptyTitle:`All defaults`,emptyMessage:`No settings have been changed yet.`})},$$slots:{default:!0}});var i=c(r,2);A(i,{padding:`lg`,children:(e,t)=>{M(e,{get columns(){return H},rows:[],rowKey:()=>``,filtered:!0})},$$slots:{default:!0}}),y(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:'No rows: an EmptyState with `emptyTitle`, `emptyMessage` and `emptyIcon`. The default message\n    ("Nothing here yet.") only mentions filters when `filtered` says the rows are narrowed.'}},__svelteCsf:{rawCode:`<Stack gap="lg">
  <Card padding="lg">
    <DataTable
      columns={[
        { key: 'name', label: 'Name' },
        { key: 'value', label: 'Value', align: 'end' },
      ]}
      rows={[]}
      rowKey={() => ''}
      emptyIcon="settings"
      emptyTitle="All defaults"
      emptyMessage="No settings have been changed yet."
    />
  </Card>
  <Card padding="lg">
    <DataTable {columns} rows={[]} rowKey={() => ''} filtered />
  </Card>
</Stack>`}}}),y(e,k),r()}var B,V,H,U,W,G,K,q,J,Y,X,Z,Q,pe,me,he,ge,$,_e;function ve(){return(ve=e((()=>{o(),l(),x(),j(),T(),D(),k(),te(),ae(),de(),se(),le(),F(),L(),re(),P(),_(),S(),B=(e,r=n,i=n)=>{var o=u(),s=b(o),l=e=>{var n=q(),i=d(n,!0);t(e=>m(i,e),[()=>N.format(new Date(r().receivedAt))]),y(e,n)},f=e=>{ue(e,{get type(){return r().ratingType},get value(){return r().ratingValue}})},p=e=>{R(e,{gap:`none`,children:(e,n)=>{var i=J(),a=b(i),o=d(a,!0),s=c(a,2),l=d(s);t(()=>{m(o,r().sourceSystem),m(l,`${r().sourceVersion??``} · ${r().sourceEnvironment??``}`)}),y(e,i)},$$slots:{default:!0}})},h=e=>{var n=a();t(()=>m(n,r().comment)),y(e,n)},_=e=>{var t=Y();y(e,t)};g(s,e=>{i().key===`receivedAt`?e(l):i().key===`rating`?e(f,1):i().key===`source`?e(p,2):r().comment?e(h,3):e(_,-1)}),y(e,o)},V=(e,r=n,i=n)=>{var o=u(),c=b(o),l=e=>{fe(e,{get name(){return r().name},get subtitle(){return r().email},size:32})},d=e=>{{let t=p(()=>r().status===`Active`?`live`:`draft`);E(e,{get tone(){return s(t)},size:`sm`,get label(){return r().status}})}},f=e=>{var n=a();t(()=>m(n,r().role)),y(e,n)};g(c,e=>{i().key===`name`?e(l):i().key===`status`?e(d,1):e(f,-1)}),y(e,o)},H=[{key:`receivedAt`,label:`Received`,sortable:!0,nowrap:!0},{key:`rating`,label:`Rating`,sortable:!0,nowrap:!0},{key:`source`,label:`Source`,hideOnMobile:!0,nowrap:!0},{key:`comment`,label:`Comment`}],U=[{id:`u1`,name:`Ada Example`,email:`ada@example.com`,role:`Owner`,status:`Active`},{id:`u2`,name:`Grace Example`,email:`grace@example.com`,role:`Admin`,status:`Active`},{id:`u3`,name:`Linus Example`,email:`linus@example.com`,role:`Editor`,status:`Active`},{id:`u4`,name:`Alan Example`,email:`alan@example.com`,role:`Viewer`,status:`Invited`}],W=[{key:`name`,label:`Member`},{key:`role`,label:`Role`,hideOnMobile:!0},{key:`status`,label:`Status`,align:`end`}],G={title:`Organisms/DataTable`,component:M,tags:[`autodocs`],parameters:{layout:`padded`}},{Story:K}=C(G),q=i(`<span class="muted svelte-j1xpaq"> </span>`),J=i(`<span> </span> <small class="muted svelte-j1xpaq"> </small>`,1),Y=i(`<span class="muted svelte-j1xpaq">No comment</span>`),X=i(`<!> <!>`,1),Z=i(`<!> <!> <!> <!> <!>`,1),z.__docgen={data:[],name:`DataTable.stories.svelte`},Q=w(z,G),pe=[`FeedbackList`,`SelectedRow`,`Selection`,`LinkedRows`,`Empty`],me={...Q.FeedbackList,tags:[`svelte-csf-v5`]},he={...Q.SelectedRow,tags:[`svelte-csf-v5`]},ge={...Q.Selection,tags:[`svelte-csf-v5`]},$={...Q.LinkedRows,tags:[`svelte-csf-v5`]},_e={...Q.Empty,tags:[`svelte-csf-v5`]}})))()}ve();export{_e as Empty,me as FeedbackList,$ as LinkedRows,he as SelectedRow,ge as Selection,pe as __namedExportsOrder,G as default};