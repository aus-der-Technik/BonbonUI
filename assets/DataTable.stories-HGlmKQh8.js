import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Et as t,Kt as n,Mt as r,Qt as i,Rt as a,St as o,Wt as s,Yt as c,_t as l,bt as u,ct as d,en as f,fn as p,jn as m,kn as h,l as g,on as _,pn as ee,qt as v,xt as y}from"./iframe-Dd9zCUtD.js";import{i as b,n as x,r as S,t as C}from"./create-runtime-stories-Bj9BSqmd.js";import{n as w,t as T}from"./Badge-JqdQHU5B.js";import{n as E,t as D}from"./Button-CAKf1gbx.js";import{n as O,t as k}from"./Card-o6xHO1cU.js";import{n as A,t as j}from"./DataTable-DILVYv7D.js";import{n as M,o as N}from"./format-BmhxglcS.js";import{n as P,t as F}from"./Section-DvZDxwUW.js";import{n as I,t as L}from"./Stack-B3I2k7mw.js";import{n as R,t as te}from"./ConfirmButton-khtWyYtz.js";import{l as ne,s as re}from"./mock-CoQSv9oT.js";import{n as ie,t as ae}from"./DetailList-1Iuc_Z5N.js";import{n as oe,t as se}from"./Pager-BF4ohv9A.js";import{n as ce,t as le}from"./RatingDisplay-CLxyYCZG.js";import{n as ue,t as de}from"./IdentityCell-DmWypDfz.js";function z(e,t){ee(t,!0);let n=(e,t=h)=>{k(e,{surface:`subtle`,padding:`sm`,children:(e,n)=>{L(e,{gap:`sm`,align:`start`,children:(e,n)=>{var o=X(),c=s(o);{let e=_(()=>[...t().comment?[{label:`Comment`,value:t().comment}]:[],...t().query?[{label:`Query`,value:t().query}]:[],...t().pageUrl?[{label:`Page`,value:t().pageUrl,mono:!0}]:[],{label:`Submission`,value:t().id,mono:!0}]);ae(c,{get items(){return r(e)}})}var l=v(c,2);te(l,{onconfirm:()=>i(a,r(a).filter(e=>e.id!==t().id),!0)}),u(e,o)},$$slots:{default:!0}})},$$slots:{default:!0}})},a=f(c(re(60))),o=f(`receivedAt`),l=f(`desc`),d=f(0),m=f(`u2`),g=f(c([`u2`,`u3`])),y=f(c([...U])),b=f(void 0),x=0;function S(e){i(y,r(y).map(t=>e.includes(t.id)?{...t,status:`Invited`}:t),!0)}function C(){x+=1;let e=`n${x}`;i(y,[...r(y),{id:e,name:`New Example ${x}`,email:`new${x}@example.com`,role:`Viewer`,status:`Invited`}],!0),i(b,e)}let w=e=>Number(e.ratingValue===`up`?6:e.ratingValue===`down`?0:e.ratingValue),T=_(()=>[...r(a)].sort((e,t)=>{let n=r(o)===`rating`?w(e):e.receivedAt,i=r(o)===`rating`?w(t):t.receivedAt;return(n<i?-1:+(n>i))*(r(l)===`asc`?1:-1)})),E=_(()=>r(T).slice(r(d),r(d)+10));function O(e){i(l,r(o)===e&&r(l)===`desc`?`asc`:`desc`,!0),i(o,e,!0),i(d,0)}var A=Z(),M=s(A);K(M,{name:`Feedback list`,asChild:!0,children:(e,t)=>{k(e,{padding:`lg`,children:(e,t)=>{F(e,{title:`All feedback`,get description(){return`${r(a).length??``} matching · all time`},children:(e,t)=>{var c=X(),f=s(c);j(f,{get columns(){return H},get rows(){return r(E)},rowKey:e=>e.id,get sort(){return r(o)},get order(){return r(l)},onsort:O,get cell(){return B},get detail(){return n}});var p=v(f,2);se(p,{get offset(){return r(d)},limit:10,get total(){return r(a).length},get count(){return r(E).length},onpage:e=>i(d,e,!0)}),u(e,c)},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A report: sortable headers (the active one wears a tinted chevron), rows that open a detail on
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
</Card>`}}});var N=v(M,2);K(N,{name:`Selected row`,asChild:!0,children:(e,t)=>{k(e,{padding:`lg`,children:(e,t)=>{F(e,{title:`Members`,description:`Click a row to show that member`,children:(e,t)=>{j(e,{get columns(){return W},get rows(){return U},rowKey:e=>e.id,get cell(){return V},get current(){return r(m)},onrowclick:e=>i(m,e.id,!0)})},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"`onrowclick` makes every row a target; `current` lifts one row onto the selected layer (the\n    record on screen): tinted glass with a tint rim, the same look as a selected card or nav item.\n    Hovering paints the faint accent. Click a member."}},__svelteCsf:{rawCode:`<Card padding="lg">
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
</Card>`}}});var P=v(N,2);K(P,{name:`Selection`,asChild:!0,children:(e,t)=>{k(e,{padding:`lg`,children:(e,t)=>{F(e,{title:`Members`,description:`Pick members to act on them together`,actions:e=>{D(e,{size:`sm`,icon:`plus`,label:`Invite`,onclick:C})},children:(e,t)=>{j(e,{get columns(){return W},get rows(){return r(y)},rowKey:e=>e.id,get cell(){return V},selectable:!0,selectRowLabel:e=>`Select ${e.name}`,get highlight(){return r(b)},get selected(){return r(g)},set selected(e){i(g,e,!0)},selectionActions:(e,t)=>{let n=()=>t?.().keys;var a=X(),o=s(a);D(o,{size:`sm`,variant:`primary`,icon:`send`,label:`Send reminder`,onclick:()=>S(n())});var c=v(o,2);te(c,{size:`sm`,icon:`trash`,label:`Remove`,get confirmLabel(){return`Remove ${n().length??``}?`},onconfirm:()=>{i(y,r(y).filter(e=>!n().includes(e.id)),!0),i(g,[],!0)}}),u(e,a)},$$slots:{selectionActions:!0}})},$$slots:{actions:!0,default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"`selectable`: a checkbox column; the header box picks or clears the rows on screen (a dash when\n    some are picked), Shift+click picks a range, Space toggles the focused row, and a plain row\n    click toggles too when the row has no action of its own. `bind:selected` holds the keys.\n    `selectionActions` puts the bulk tools in a bar right on top of the table, with the count\n    and Clear. `highlight` glows the row a change landed on: invite someone."}},__svelteCsf:{rawCode:`<Card padding="lg">
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
</Card>`}}});var I=v(P,2);K(I,{name:`Linked rows`,asChild:!0,children:(e,t)=>{k(e,{padding:`lg`,children:(e,t)=>{F(e,{title:`Members`,description:`Each row opens that member`,children:(e,t)=>{j(e,{get columns(){return W},get rows(){return U},rowKey:e=>e.id,get cell(){return V},rowHref:e=>`#member-${e.id}`})},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:'`rowHref` makes each row a real link: the anchor sits in the first cell and stretches over the\n    row, so middle-click, "open in new tab" and client-side routers all work. Add `onrowclick` too\n    to handle plain clicks yourself (a router) while modified clicks still open the link.'}},__svelteCsf:{rawCode:`<Card padding="lg">
  <Section title="Members" description="Each row opens that member">
    <DataTable
      columns={memberColumns}
      rows={members}
      rowKey={(m) => m.id}
      cell={memberCell}
      rowHref={(m) => \`#member-\${m.id}\`}
    />
  </Section>
</Card>`}}});var R=v(I,2);K(R,{name:`Empty`,asChild:!0,children:(e,t)=>{L(e,{gap:`lg`,children:(e,t)=>{var n=X(),r=s(n);k(r,{padding:`lg`,children:(e,t)=>{j(e,{columns:[{key:`name`,label:`Name`},{key:`value`,label:`Value`,align:`end`}],rows:[],rowKey:()=>``,emptyIcon:`settings`,emptyTitle:`All defaults`,emptyMessage:`No settings have been changed yet.`})},$$slots:{default:!0}});var i=v(r,2);k(i,{padding:`lg`,children:(e,t)=>{j(e,{get columns(){return H},rows:[],rowKey:()=>``,filtered:!0})},$$slots:{default:!0}}),u(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:'No rows: an EmptyState with `emptyTitle`, `emptyMessage` and `emptyIcon`. The default message\n    ("Nothing here yet.") only mentions filters when `filtered` says the rows are narrowed.'}},__svelteCsf:{rawCode:`<Stack gap="lg">
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
</Stack>`}}}),u(e,A),p()}var B,V,H,U,W,G,K,q,J,Y,X,Z,Q,fe,pe,$,me,he,ge;function _e(){return(_e=e((()=>{m(),b(),A(),w(),E(),O(),R(),ie(),ue(),oe(),ce(),P(),I(),ne(),N(),g(),x(),B=(e,r=h,i=h)=>{var o=y(),c=s(o),f=e=>{var t=q(),i=n(t,!0);a(e=>l(i,e),[()=>M.format(new Date(r().receivedAt))]),u(e,t)},p=e=>{le(e,{get type(){return r().ratingType},get value(){return r().ratingValue}})},m=e=>{L(e,{gap:`none`,children:(e,t)=>{var i=J(),o=s(i),c=n(o,!0),d=v(o,2),f=n(d);a(()=>{l(c,r().sourceSystem),l(f,`${r().sourceVersion??``} · ${r().sourceEnvironment??``}`)}),u(e,i)},$$slots:{default:!0}})},g=e=>{var n=t();a(()=>l(n,r().comment)),u(e,n)},_=e=>{var t=Y();u(e,t)};d(c,e=>{i().key===`receivedAt`?e(f):i().key===`rating`?e(p,1):i().key===`source`?e(m,2):r().comment?e(g,3):e(_,-1)}),u(e,o)},V=(e,n=h,i=h)=>{var o=y(),c=s(o),f=e=>{de(e,{get name(){return n().name},get subtitle(){return n().email},size:32})},p=e=>{{let t=_(()=>n().status===`Active`?`live`:`draft`);T(e,{get tone(){return r(t)},size:`sm`,get label(){return n().status}})}},m=e=>{var r=t();a(()=>l(r,n().role)),u(e,r)};d(c,e=>{i().key===`name`?e(f):i().key===`status`?e(p,1):e(m,-1)}),u(e,o)},H=[{key:`receivedAt`,label:`Received`,sortable:!0,nowrap:!0},{key:`rating`,label:`Rating`,sortable:!0,nowrap:!0},{key:`source`,label:`Source`,hideOnMobile:!0,nowrap:!0},{key:`comment`,label:`Comment`}],U=[{id:`u1`,name:`Ada Example`,email:`ada@example.com`,role:`Owner`,status:`Active`},{id:`u2`,name:`Grace Example`,email:`grace@example.com`,role:`Admin`,status:`Active`},{id:`u3`,name:`Linus Example`,email:`linus@example.com`,role:`Editor`,status:`Active`},{id:`u4`,name:`Alan Example`,email:`alan@example.com`,role:`Viewer`,status:`Invited`}],W=[{key:`name`,label:`Member`},{key:`role`,label:`Role`,hideOnMobile:!0},{key:`status`,label:`Status`,align:`end`}],G={title:`Organisms/DataTable`,component:j,tags:[`autodocs`],parameters:{layout:`padded`}},{Story:K}=S(G),q=o(`<span class="muted svelte-j1xpaq"> </span>`),J=o(`<span> </span> <small class="muted svelte-j1xpaq"> </small>`,1),Y=o(`<span class="muted svelte-j1xpaq">No comment</span>`),X=o(`<!> <!>`,1),Z=o(`<!> <!> <!> <!> <!>`,1),z.__docgen={data:[],name:`DataTable.stories.svelte`},Q=C(z,G),fe=[`FeedbackList`,`SelectedRow`,`Selection`,`LinkedRows`,`Empty`],pe={...Q.FeedbackList,tags:[`svelte-csf-v5`]},$={...Q.SelectedRow,tags:[`svelte-csf-v5`]},me={...Q.Selection,tags:[`svelte-csf-v5`]},he={...Q.LinkedRows,tags:[`svelte-csf-v5`]},ge={...Q.Empty,tags:[`svelte-csf-v5`]}})))()}_e();export{ge as Empty,pe as FeedbackList,he as LinkedRows,$ as SelectedRow,me as Selection,fe as __namedExportsOrder,G as default};