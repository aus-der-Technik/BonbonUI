import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Bt as t,Ct as n,Dt as r,Jt as i,Kt as a,Nn as o,Pt as s,St as c,Yt as l,Zt as u,_t as d,cn as f,ct as p,en as m,hn as h,jn as g,l as _,mn as v,nn as y,xt as b}from"./iframe-CRBWUEFv.js";import{i as x,n as S,r as C,t as w}from"./create-runtime-stories-DtoOt73Q.js";import{n as T,t as E}from"./Badge-DjfGPRKM.js";import{n as D,t as O}from"./Button-CVctU_KR.js";import{n as k,t as A}from"./Card-D32i3kW8.js";import{n as j,t as M}from"./DataTable-DBEB8JLh.js";import{n as N,o as P}from"./format-BmhxglcS.js";import{n as F,t as I}from"./Section-Byz1upsT.js";import{n as L,t as R}from"./Stack-DW7rWz1x.js";import{n as z,t as ee}from"./ConfirmButton-CizcQltK.js";import{l as te,s as ne}from"./mock-CoQSv9oT.js";import{n as re,t as ie}from"./DetailList-nBM6OvX9.js";import{n as ae,t as oe}from"./Pager-DEg8TAzG.js";import{n as se,t as ce}from"./RatingDisplay-CY2oFvoV.js";import{n as le,t as ue}from"./IdentityCell-pY35WFtz.js";function B(e,t){h(t,!0);let n=(e,t=g)=>{A(e,{surface:`subtle`,padding:`sm`,children:(e,n)=>{R(e,{gap:`sm`,align:`start`,children:(e,n)=>{var i=Z(),o=a(i);{let e=f(()=>[...t().comment?[{label:`Comment`,value:t().comment}]:[],...t().query?[{label:`Query`,value:t().query}]:[],...t().pageUrl?[{label:`Page`,value:t().pageUrl,mono:!0}]:[],{label:`Submission`,value:t().id,mono:!0}]);ie(o,{get items(){return s(e)}})}var c=l(o,2);ee(c,{onconfirm:()=>m(r,s(r).filter(e=>e.id!==t().id),!0)}),b(e,i)},$$slots:{default:!0}})},$$slots:{default:!0}})},r=y(u(ne(60))),i=y(`receivedAt`),o=y(`desc`),c=y(0),d=y(`u2`),p=y(u([`u2`,`u3`])),_=y(u([...W])),x=y(void 0),S=0;function C(e){m(_,s(_).map(t=>e.includes(t.id)?{...t,status:`Invited`}:t),!0)}function w(){S+=1;let e=`n${S}`;m(_,[...s(_),{id:e,name:`New Example ${S}`,email:`new${S}@example.com`,role:`Viewer`,status:`Invited`}],!0),m(x,e)}let T=e=>Number(e.ratingValue===`up`?6:e.ratingValue===`down`?0:e.ratingValue),E=f(()=>[...s(r)].sort((e,t)=>{let n=s(i)===`rating`?T(e):e.receivedAt,r=s(i)===`rating`?T(t):t.receivedAt;return(n<r?-1:+(n>r))*(s(o)===`asc`?1:-1)})),D=f(()=>s(E).slice(s(c),s(c)+10));function k(e){m(o,s(i)===e&&s(o)===`desc`?`asc`:`desc`,!0),m(i,e,!0),m(c,0)}var j=de(),N=a(j);q(N,{name:`Feedback list`,asChild:!0,children:(e,t)=>{A(e,{padding:`lg`,children:(e,t)=>{I(e,{title:`All feedback`,get description(){return`${s(r).length??``} matching · all time`},children:(e,t)=>{var u=Z(),d=a(u);M(d,{get columns(){return U},get rows(){return s(D)},rowKey:e=>e.id,get sort(){return s(i)},get order(){return s(o)},onsort:k,get cell(){return V},get detail(){return n}});var f=l(d,2);oe(f,{get offset(){return s(c)},limit:10,get total(){return s(r).length},get count(){return s(D).length},onpage:e=>m(c,e,!0)}),b(e,u)},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A report: sortable headers (the active one wears a tinted chevron), rows that open a detail on
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
</Card>`}}});var P=l(N,2);q(P,{name:`Selected row`,asChild:!0,children:(e,t)=>{A(e,{padding:`lg`,children:(e,t)=>{I(e,{title:`Members`,description:`Click a row to show that member`,children:(e,t)=>{M(e,{get columns(){return G},get rows(){return W},rowKey:e=>e.id,get cell(){return H},get current(){return s(d)},onrowclick:e=>m(d,e.id,!0)})},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"`onrowclick` makes every row a target; `current` lifts one row onto the selected layer (the\n    record on screen): tinted glass with a tint rim, the same look as a selected card or nav item.\n    Hovering paints the faint accent. Click a member."}},__svelteCsf:{rawCode:`<Card padding="lg">
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
</Card>`}}});var F=l(P,2);q(F,{name:`Selection`,asChild:!0,children:(e,t)=>{A(e,{padding:`lg`,children:(e,t)=>{I(e,{title:`Members`,description:`Pick members to act on them together`,actions:e=>{O(e,{size:`sm`,icon:`plus`,label:`Invite`,onclick:w})},children:(e,t)=>{M(e,{get columns(){return G},get rows(){return s(_)},rowKey:e=>e.id,get cell(){return H},selectable:!0,selectRowLabel:e=>`Select ${e.name}`,get highlight(){return s(x)},get selected(){return s(p)},set selected(e){m(p,e,!0)},selectionActions:(e,t)=>{let n=()=>t?.().keys;var r=Z(),i=a(r);O(i,{size:`sm`,variant:`primary`,icon:`send`,label:`Send reminder`,onclick:()=>C(n())});var o=l(i,2);ee(o,{size:`sm`,icon:`trash`,label:`Remove`,get confirmLabel(){return`Remove ${n().length??``}?`},onconfirm:()=>{m(_,s(_).filter(e=>!n().includes(e.id)),!0),m(p,[],!0)}}),b(e,r)},$$slots:{selectionActions:!0}})},$$slots:{actions:!0,default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"`selectable`: a checkbox column; the header box picks or clears the rows on screen (a dash when\n    some are picked), Shift+click picks a range, Space toggles the focused row, and a plain row\n    click toggles too when the row has no action of its own. `bind:selected` holds the keys.\n    `selectionActions` puts the bulk tools in a bar right on top of the table, with the count\n    and Clear. `highlight` glows the row a change landed on: invite someone."}},__svelteCsf:{rawCode:`<Card padding="lg">
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
</Card>`}}});var L=l(F,2);q(L,{name:`Linked rows`,asChild:!0,children:(e,t)=>{A(e,{padding:`lg`,children:(e,t)=>{I(e,{title:`Members`,description:`Each row opens that member`,children:(e,t)=>{M(e,{get columns(){return G},get rows(){return W},rowKey:e=>e.id,get cell(){return H},rowHref:e=>`#member-${e.id}`})},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:'`rowHref` makes each row a real link: the anchor sits in the first cell and stretches over the\n    row, so middle-click, "open in new tab" and client-side routers all work. Add `onrowclick` too\n    to handle plain clicks yourself (a router) while modified clicks still open the link.'}},__svelteCsf:{rawCode:`<Card padding="lg">
  <Section title="Members" description="Each row opens that member">
    <DataTable
      columns={memberColumns}
      rows={members}
      rowKey={(m) => m.id}
      cell={memberCell}
      rowHref={(m) => \`#member-\${m.id}\`}
    />
  </Section>
</Card>`}}});var z=l(L,2);q(z,{name:`Empty`,asChild:!0,children:(e,t)=>{R(e,{gap:`lg`,children:(e,t)=>{var n=Z(),r=a(n);A(r,{padding:`lg`,children:(e,t)=>{M(e,{columns:[{key:`name`,label:`Name`},{key:`value`,label:`Value`,align:`end`}],rows:[],rowKey:()=>``,emptyIcon:`settings`,emptyTitle:`All defaults`,emptyMessage:`No settings have been changed yet.`})},$$slots:{default:!0}});var i=l(r,2);A(i,{padding:`lg`,children:(e,t)=>{M(e,{get columns(){return U},rows:[],rowKey:()=>``,filtered:!0})},$$slots:{default:!0}}),b(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:'No rows: an EmptyState with `emptyTitle`, `emptyMessage` and `emptyIcon`. The default message\n    ("Nothing here yet.") only mentions filters when `filtered` says the rows are narrowed.'}},__svelteCsf:{rawCode:`<Stack gap="lg">
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
</Stack>`}}}),b(e,j),v()}var V,H,U,W,G,K,q,J,Y,X,Z,de,Q,fe,pe,$,me,he,ge;function _e(){return(_e=e((()=>{o(),x(),j(),T(),D(),k(),z(),re(),le(),ae(),se(),F(),L(),te(),P(),_(),S(),V=(e,n=g,o=g)=>{var s=c(),u=a(s),f=e=>{var r=J(),a=i(r,!0);t(e=>d(a,e),[()=>N.format(new Date(n().receivedAt))]),b(e,r)},m=e=>{ce(e,{get type(){return n().ratingType},get value(){return n().ratingValue}})},h=e=>{R(e,{gap:`none`,children:(e,r)=>{var o=Y(),s=a(o),c=i(s,!0),u=l(s,2),f=i(u);t(()=>{d(c,n().sourceSystem),d(f,`${n().sourceVersion??``} · ${n().sourceEnvironment??``}`)}),b(e,o)},$$slots:{default:!0}})},_=e=>{var i=r();t(()=>d(i,n().comment)),b(e,i)},v=e=>{var t=X();b(e,t)};p(u,e=>{o().key===`receivedAt`?e(f):o().key===`rating`?e(m,1):o().key===`source`?e(h,2):n().comment?e(_,3):e(v,-1)}),b(e,s)},H=(e,n=g,i=g)=>{var o=c(),l=a(o),u=e=>{ue(e,{get name(){return n().name},get subtitle(){return n().email},size:32})},m=e=>{{let t=f(()=>n().status===`Active`?`live`:`draft`);E(e,{get tone(){return s(t)},size:`sm`,get label(){return n().status}})}},h=e=>{var i=r();t(()=>d(i,n().role)),b(e,i)};p(l,e=>{i().key===`name`?e(u):i().key===`status`?e(m,1):e(h,-1)}),b(e,o)},U=[{key:`receivedAt`,label:`Received`,sortable:!0,nowrap:!0},{key:`rating`,label:`Rating`,sortable:!0,nowrap:!0},{key:`source`,label:`Source`,hideOnMobile:!0,nowrap:!0},{key:`comment`,label:`Comment`}],W=[{id:`u1`,name:`Ada Example`,email:`ada@example.com`,role:`Owner`,status:`Active`},{id:`u2`,name:`Grace Example`,email:`grace@example.com`,role:`Admin`,status:`Active`},{id:`u3`,name:`Linus Example`,email:`linus@example.com`,role:`Editor`,status:`Active`},{id:`u4`,name:`Alan Example`,email:`alan@example.com`,role:`Viewer`,status:`Invited`}],G=[{key:`name`,label:`Member`},{key:`role`,label:`Role`,hideOnMobile:!0},{key:`status`,label:`Status`,align:`end`}],K={title:`Organisms/DataTable`,component:M,tags:[`autodocs`],parameters:{layout:`padded`}},{Story:q}=C(K),J=n(`<span class="muted svelte-j1xpaq"> </span>`),Y=n(`<span> </span> <small class="muted svelte-j1xpaq"> </small>`,1),X=n(`<span class="muted svelte-j1xpaq">No comment</span>`),Z=n(`<!> <!>`,1),de=n(`<!> <!> <!> <!> <!>`,1),B.__docgen={data:[],name:`DataTable.stories.svelte`},Q=w(B,K),fe=[`FeedbackList`,`SelectedRow`,`Selection`,`LinkedRows`,`Empty`],pe={...Q.FeedbackList,tags:[`svelte-csf-v5`]},$={...Q.SelectedRow,tags:[`svelte-csf-v5`]},me={...Q.Selection,tags:[`svelte-csf-v5`]},he={...Q.LinkedRows,tags:[`svelte-csf-v5`]},ge={...Q.Empty,tags:[`svelte-csf-v5`]}})))()}_e();export{ge as Empty,pe as FeedbackList,he as LinkedRows,$ as SelectedRow,me as Selection,fe as __namedExportsOrder,K as default};