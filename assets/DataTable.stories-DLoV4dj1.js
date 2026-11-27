import{n as e}from"./rolldown-runtime-Dxh6kD9_.js";import{$t as t,Ct as n,Dt as r,Ft as i,Gt as a,Ht as o,On as s,Pt as c,Sn as l,St as u,Vt as d,Wt as f,_t as p,cn as m,ct as h,hn as g,l as _,on as v,xn as ee,xt as y,zt as b}from"./iframe-WlNMZtZ0.js";import{i as x,n as S,r as C,t as w}from"./create-runtime-stories-CbHiKinS.js";import{n as T,t as E}from"./Badge-Dh8o68Ot.js";import{n as D,t as O}from"./Button-DHLILcYm.js";import{n as k,t as A}from"./Card-BqZAAHlF.js";import{n as j,t as M}from"./DataTable-BDmE8LFS.js";import{n as N,o as P}from"./format-1b3iHqcE.js";import{n as F,t as I}from"./Section-D4Qa1FIu.js";import{n as L,t as R}from"./Stack-BjV-rmuj.js";import{n as te,t as ne}from"./ConfirmButton-DIh3Xs2_.js";import{l as re,s as ie}from"./mock-CO6eygD8.js";import{n as ae,t as oe}from"./DetailList-CO4w5skP.js";import{n as se,t as ce}from"./Pager-3QBccH1-.js";import{n as le,t as ue}from"./RatingDisplay-Dqnznobj.js";import{n as de,t as fe}from"./IdentityCell-B8s71_zw.js";function z(e,t){l(t,!0);let n=(e,t=s)=>{A(e,{surface:`subtle`,padding:`sm`,children:(e,n)=>{R(e,{gap:`sm`,align:`start`,children:(e,n)=>{var i=X(),s=b(i);{let e=g(()=>[...t().comment?[{label:`Comment`,value:t().comment}]:[],...t().query?[{label:`Query`,value:t().query}]:[],...t().pageUrl?[{label:`Page`,value:t().pageUrl,mono:!0}]:[],{label:`Submission`,value:t().id,mono:!0}]);oe(s,{get items(){return a(e)}})}var c=o(s,2);ne(c,{onconfirm:()=>v(r,a(r).filter(e=>e.id!==t().id),!0)}),y(e,i)},$$slots:{default:!0}})},$$slots:{default:!0}})},r=m(f(ie(60))),i=m(`receivedAt`),c=m(`desc`),u=m(0),d=m(`u2`),p=m(f([`u2`,`u3`])),h=m(f([...U])),_=m(void 0),x=0;function S(e){v(h,a(h).map(t=>e.includes(t.id)?{...t,status:`Invited`}:t),!0)}function C(){x+=1;let e=`n${x}`;v(h,[...a(h),{id:e,name:`New Example ${x}`,email:`new${x}@example.com`,role:`Viewer`,status:`Invited`}],!0),v(_,e)}let w=e=>Number(e.ratingValue===`up`?6:e.ratingValue===`down`?0:e.ratingValue),T=g(()=>[...a(r)].sort((e,t)=>{let n=a(i)===`rating`?w(e):e.receivedAt,r=a(i)===`rating`?w(t):t.receivedAt;return(n<r?-1:+(n>r))*(a(c)===`asc`?1:-1)})),E=g(()=>a(T).slice(a(u),a(u)+10));function D(e){v(c,a(i)===e&&a(c)===`desc`?`asc`:`desc`,!0),v(i,e,!0),v(u,0)}var k=Z(),j=b(k);K(j,{name:`Feedback list`,asChild:!0,children:(e,t)=>{A(e,{padding:`lg`,children:(e,t)=>{I(e,{title:`All feedback`,get description(){return`${a(r).length??``} matching · all time`},children:(e,t)=>{var s=X(),l=b(s);M(l,{get columns(){return H},get rows(){return a(E)},rowKey:e=>e.id,get sort(){return a(i)},get order(){return a(c)},onsort:D,get cell(){return B},get detail(){return n}});var d=o(l,2);ce(d,{get offset(){return a(u)},limit:10,get total(){return a(r).length},get count(){return a(E).length},onpage:e=>v(u,e,!0)}),y(e,s)},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A report: sortable headers (the active one wears a tinted chevron), rows that open a detail on
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
</Card>`}}});var N=o(j,2);K(N,{name:`Selected row`,asChild:!0,children:(e,t)=>{A(e,{padding:`lg`,children:(e,t)=>{I(e,{title:`Members`,description:`Click a row to show that member`,children:(e,t)=>{M(e,{get columns(){return W},get rows(){return U},rowKey:e=>e.id,get cell(){return V},get current(){return a(d)},onrowclick:e=>v(d,e.id,!0)})},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"`onrowclick` makes every row a target; `current` lifts one row onto the selected layer (the\n    record on screen): tinted glass with a tint rim, the same look as a selected card or nav item.\n    Hovering paints the faint accent. Click a member."}},__svelteCsf:{rawCode:`<Card padding="lg">
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
</Card>`}}});var P=o(N,2);K(P,{name:`Selection`,asChild:!0,children:(e,t)=>{A(e,{padding:`lg`,children:(e,t)=>{I(e,{title:`Members`,description:`Pick members to act on them together`,actions:e=>{O(e,{size:`sm`,icon:`plus`,label:`Invite`,onclick:C})},children:(e,t)=>{M(e,{get columns(){return W},get rows(){return a(h)},rowKey:e=>e.id,get cell(){return V},selectable:!0,selectRowLabel:e=>`Select ${e.name}`,get highlight(){return a(_)},get selected(){return a(p)},set selected(e){v(p,e,!0)},selectionActions:(e,t)=>{let n=()=>t?.().keys;var r=X(),i=b(r);O(i,{size:`sm`,variant:`primary`,icon:`send`,label:`Send reminder`,onclick:()=>S(n())});var s=o(i,2);ne(s,{size:`sm`,icon:`trash`,label:`Remove`,get confirmLabel(){return`Remove ${n().length??``}?`},onconfirm:()=>{v(h,a(h).filter(e=>!n().includes(e.id)),!0),v(p,[],!0)}}),y(e,r)},$$slots:{selectionActions:!0}})},$$slots:{actions:!0,default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"`selectable`: a checkbox column; the header box picks or clears the rows on screen (a dash when\n    some are picked), Shift+click picks a range, Space toggles the focused row, and a plain row\n    click toggles too when the row has no action of its own. `bind:selected` holds the keys.\n    `selectionActions` puts the bulk tools in a bar right on top of the table, with the count\n    and Clear. `highlight` glows the row a change landed on: invite someone."}},__svelteCsf:{rawCode:`<Card padding="lg">
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
</Card>`}}});var F=o(P,2);K(F,{name:`Linked rows`,asChild:!0,children:(e,t)=>{A(e,{padding:`lg`,children:(e,t)=>{I(e,{title:`Members`,description:`Each row opens that member`,children:(e,t)=>{M(e,{get columns(){return W},get rows(){return U},rowKey:e=>e.id,get cell(){return V},rowHref:e=>`#member-${e.id}`})},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:'`rowHref` makes each row a real link: the anchor sits in the first cell and stretches over the\n    row, so middle-click, "open in new tab" and client-side routers all work. Add `onrowclick` too\n    to handle plain clicks yourself (a router) while modified clicks still open the link.'}},__svelteCsf:{rawCode:`<Card padding="lg">
  <Section title="Members" description="Each row opens that member">
    <DataTable
      columns={memberColumns}
      rows={members}
      rowKey={(m) => m.id}
      cell={memberCell}
      rowHref={(m) => \`#member-\${m.id}\`}
    />
  </Section>
</Card>`}}});var L=o(F,2);K(L,{name:`Empty`,asChild:!0,children:(e,t)=>{R(e,{gap:`lg`,children:(e,t)=>{var n=X(),r=b(n);A(r,{padding:`lg`,children:(e,t)=>{M(e,{columns:[{key:`name`,label:`Name`},{key:`value`,label:`Value`,align:`end`}],rows:[],rowKey:()=>``,emptyIcon:`settings`,emptyTitle:`All defaults`,emptyMessage:`No settings have been changed yet.`})},$$slots:{default:!0}});var i=o(r,2);A(i,{padding:`lg`,children:(e,t)=>{M(e,{get columns(){return H},rows:[],rowKey:()=>``,filtered:!0})},$$slots:{default:!0}}),y(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:'No rows: an EmptyState with `emptyTitle`, `emptyMessage` and `emptyIcon`. The default message\n    ("Nothing here yet.") only mentions filters when `filtered` says the rows are narrowed.'}},__svelteCsf:{rawCode:`<Stack gap="lg">
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
</Stack>`}}}),y(e,k),ee()}var B,V,H,U,W,G,K,q,J,Y,X,Z,Q,pe,me,he,ge,$,_e;function ve(){return(ve=e((()=>{i(),c(),x(),j(),T(),D(),k(),te(),ae(),de(),se(),le(),F(),L(),re(),P(),_(),S(),B=(e,n=s,i=s)=>{var a=u(),c=b(a),l=e=>{var r=q(),i=d(r,!0);t(e=>p(i,e),[()=>N.format(new Date(n().receivedAt))]),y(e,r)},f=e=>{ue(e,{get type(){return n().ratingType},get value(){return n().ratingValue}})},m=e=>{R(e,{gap:`none`,children:(e,r)=>{var i=J(),a=b(i),s=d(a,!0),c=o(a,2),l=d(c);t(()=>{p(s,n().sourceSystem),p(l,`${n().sourceVersion??``} · ${n().sourceEnvironment??``}`)}),y(e,i)},$$slots:{default:!0}})},g=e=>{var i=r();t(()=>p(i,n().comment)),y(e,i)},_=e=>{var t=Y();y(e,t)};h(c,e=>{i().key===`receivedAt`?e(l):i().key===`rating`?e(f,1):i().key===`source`?e(m,2):n().comment?e(g,3):e(_,-1)}),y(e,a)},V=(e,n=s,i=s)=>{var o=u(),c=b(o),l=e=>{fe(e,{get name(){return n().name},get subtitle(){return n().email},size:32})},d=e=>{{let t=g(()=>n().status===`Active`?`live`:`draft`);E(e,{get tone(){return a(t)},size:`sm`,get label(){return n().status}})}},f=e=>{var i=r();t(()=>p(i,n().role)),y(e,i)};h(c,e=>{i().key===`name`?e(l):i().key===`status`?e(d,1):e(f,-1)}),y(e,o)},H=[{key:`receivedAt`,label:`Received`,sortable:!0,nowrap:!0},{key:`rating`,label:`Rating`,sortable:!0,nowrap:!0},{key:`source`,label:`Source`,hideOnMobile:!0,nowrap:!0},{key:`comment`,label:`Comment`}],U=[{id:`u1`,name:`Ada Example`,email:`ada@example.com`,role:`Owner`,status:`Active`},{id:`u2`,name:`Grace Example`,email:`grace@example.com`,role:`Admin`,status:`Active`},{id:`u3`,name:`Linus Example`,email:`linus@example.com`,role:`Editor`,status:`Active`},{id:`u4`,name:`Alan Example`,email:`alan@example.com`,role:`Viewer`,status:`Invited`}],W=[{key:`name`,label:`Member`},{key:`role`,label:`Role`,hideOnMobile:!0},{key:`status`,label:`Status`,align:`end`}],G={title:`Organisms/DataTable`,component:M,tags:[`autodocs`],parameters:{layout:`padded`}},{Story:K}=C(G),q=n(`<span class="muted svelte-j1xpaq"> </span>`),J=n(`<span> </span> <small class="muted svelte-j1xpaq"> </small>`,1),Y=n(`<span class="muted svelte-j1xpaq">No comment</span>`),X=n(`<!> <!>`,1),Z=n(`<!> <!> <!> <!> <!>`,1),z.__docgen={data:[],name:`DataTable.stories.svelte`},Q=w(z,G),pe=[`FeedbackList`,`SelectedRow`,`Selection`,`LinkedRows`,`Empty`],me={...Q.FeedbackList,tags:[`svelte-csf-v5`]},he={...Q.SelectedRow,tags:[`svelte-csf-v5`]},ge={...Q.Selection,tags:[`svelte-csf-v5`]},$={...Q.LinkedRows,tags:[`svelte-csf-v5`]},_e={...Q.Empty,tags:[`svelte-csf-v5`]}})))()}ve();export{_e as Empty,me as FeedbackList,$ as LinkedRows,he as SelectedRow,ge as Selection,pe as __namedExportsOrder,G as default};