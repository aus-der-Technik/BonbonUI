import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Bt as t,Ct as n,Dt as r,En as i,Gt as ee,Jt as te,Kt as a,Nn as o,Pt as s,Tn as c,Yt as l,Zt as u,_t as ne,cn as d,en as f,hn as p,l as m,mn as h,nn as g,xt as _}from"./iframe-CjPY-Fqe.js";import{i as v,n as y,r as b,t as x}from"./create-runtime-stories-tZqyKHa4.js";import{n as S,t as re}from"./Badge-Bj9mzJQM.js";import{n as C,t as w}from"./Stack-BmjVbqUs.js";import{n as T,t as E}from"./Kbd-CJxOthge.js";import{n as D,t as O}from"./CodeBlock-BWwSE-lO.js";import{b as k,l as A,x as j}from"./mock-CoQSv9oT.js";import{n as M,t as N}from"./EditableGrid-C7g3DD_p.js";import{n as P,t as F}from"./Sheet-NL3gC8l-.js";function I(e,n){p(n,!0);let o=g(u(j())),m=g(null),v=g(u(j().slice(0,4))),y=g(null);function b(){s(m)&&(f(v,[...s(v),{...s(m)}],!0),f(y,s(v).length-1),f(m,null))}let x=g(u([{name:`Open-air stage`,title:{de:`Freilichtbühne`,en:`Open-air stage`},address:{street:`Am Park 1`,city:`Bonn`,geo:{lat:50.7374,lng:7.0982}},contact:{email:`stage@example.com`,phones:[`+49 228 1234`,`+49 228 5678`],verified:!0}},{name:`Town hall`,title:{de:null,en:null},address:{street:`Markt 2`,city:`Bonn`,geo:null},contact:{email:null,phones:[],verified:!1}},{name:`Library`,title:null,address:null,contact:null}])),S=g(u([{name:`Open-air stage`,topics:[`concerts`,`outdoor`,`summer`,`barrier-free`]},{name:`Town hall`,topics:[`events`]},{name:`Library`,topics:null}]));function C(e,t,n){return new Promise((r,i)=>setTimeout(()=>{t===`capacity`&&typeof n==`number`&&n>1e5?i(Error(`capacity out of range`)):(f(o,s(o).map((r,i)=>i===e?{...r,[t]:n}:r),!0),r())},600))}function T(e){return new Promise(t=>setTimeout(()=>{f(o,s(o).filter((t,n)=>n!==e),!0),t()},500))}var D=U(),A=a(D);R(A,{name:`Venues`,asChild:!0,children:(e,n)=>{w(e,{style:`height:30rem`,children:(e,n)=>{F(e,{title:`Venues`,about:`Capacities, accessibility and notes of every venue.`,tools:e=>{re(e,{tone:`live`,label:`Editable`})},footer:e=>{var n=V(),u=a(n),d=te(u),f=l(u,2),p=ee(f);E(p,{children:(e,t)=>{c();var n=r(`Enter`);_(e,n)},$$slots:{default:!0}});var m=l(p,2);E(m,{children:(e,t)=>{c();var n=r(`Tab`);_(e,n)},$$slots:{default:!0}});var h=l(m,2);E(h,{children:(e,t)=>{c();var n=r(`Esc`);_(e,n)},$$slots:{default:!0}}),c(),i(f),t(()=>ne(d,`${s(o).length??``} rows`)),_(e,n)},children:(e,t)=>{N(e,{get columns(){return k},get rows(){return s(o)},oncommit:C,ondelete:T,label:`Venues`})},$$slots:{tools:!0,footer:!0,default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`The grid inside a Sheet, as in an editor. Click a cell: Enter saves (a green flash), Tab moves
    right, Esc cancels; the open editor wears the tint ring. Enter a capacity of 200000 to see a
    failed save ring red. Hover a row number to delete the row (it asks once).`}},__svelteCsf:{rawCode:`<Stack style="height:30rem">
  <Sheet title="Venues" about="Capacities, accessibility and notes of every venue.">
    {#snippet tools()}<Badge tone="live" label="Editable" />{/snippet}
    <EditableGrid
      columns={venueColumns}
      {rows}
      oncommit={commit}
      ondelete={remove}
      label="Venues"
    />
    {#snippet footer()}
      <span>{rows.length} rows</span>
      <span><Kbd>Enter</Kbd> saves · <Kbd>Tab</Kbd> moves right · <Kbd>Esc</Kbd> cancels</span>
    {/snippet}
  </Sheet>
</Stack>`}}});var M=l(A,2);R(M,{name:`Locked hint and save error`,asChild:!0,children:(e,t)=>{w(e,{style:`height:30rem`,children:(e,t)=>{F(e,{title:`Venues`,about:`Locked columns explain themselves; refused saves say why.`,children:(e,t)=>{N(e,{get columns(){return k},get rows(){return s(o)},oncommit:C,lockedHint:e=>e.type===`TIMESTAMP`?`${e.name} is set by the database when the row changes.`:`${e.name} is the key of the row and cannot be changed.`,errorMessage:e=>e instanceof Error&&e.message===`capacity out of range`?`Not saved: no venue holds more than 100,000 people.`:`Not saved — try again.`,label:`Venues`})},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"Feedback at the cell. Click `id` or `updated_at`: `lockedHint` explains why in a bubble anchored\n    to that cell. Enter a capacity of 200000: the save is refused and `errorMessage` puts the\n    reason right under the cell (red, announced), not in a footer far away."}},__svelteCsf:{rawCode:`<Stack style="height:30rem">
  <Sheet title="Venues" about="Locked columns explain themselves; refused saves say why.">
    <EditableGrid
      columns={venueColumns}
      {rows}
      oncommit={commit}
      lockedHint={(column) =>
        column.type === 'TIMESTAMP'
          ? \`\${column.name} is set by the database when the row changes.\`
          : \`\${column.name} is the key of the row and cannot be changed.\`}
      errorMessage={(error) =>
        error instanceof Error && error.message === 'capacity out of range'
          ? 'Not saved: no venue holds more than 100,000 people.'
          : 'Not saved — try again.'}
      label="Venues"
    />
  </Sheet>
</Stack>`}}});var P=l(M,2);R(P,{name:`Wrapped`,asChild:!0,children:(e,t)=>{w(e,{style:`height:30rem`,children:(e,t)=>{F(e,{title:`Venues`,about:`Wrapped cells`,children:(e,t)=>{N(e,{get columns(){return k},get rows(){return s(o)},wrap:!0,oncommit:C,label:`Venues`})},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"`wrap`: long values break onto several lines instead of being cut off."}},__svelteCsf:{rawCode:`<Stack style="height:30rem">
  <Sheet title="Venues" about="Wrapped cells">
    <EditableGrid columns={venueColumns} {rows} wrap oncommit={commit} label="Venues" />
  </Sheet>
</Stack>`}}});var I=l(P,2);R(I,{name:`Draft row`,asChild:!0,children:(e,t)=>{w(e,{gap:`sm`,style:`height:28rem`,children:(e,t)=>{var n=H(),r=a(n);F(r,{title:`Venues`,about:`Add a venue`,children:(e,t)=>{N(e,{get columns(){return k},get rows(){return s(v)},get highlight(){return s(y)},oncommit:(e,t,n)=>{f(v,s(v).map((r,i)=>i===e?{...r,[t]:n}:r),!0)},ondraftsubmit:b,label:`Venues`,get draft(){return s(m)},set draft(e){f(m,e,!0)}})},$$slots:{default:!0}});var i=l(r,2);{let e=d(()=>JSON.stringify(s(m)));O(i,{label:`draft`,get code(){return s(e)}})}_(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:'New rows are made where they land: with `ondraftsubmit`, "+ New row" after the last row opens\n    `draft` (bindable) in place, with Save and Cancel right under it; Enter submits, Escape\n    cancels. The saved row appears where the draft was and flashes green. The code below shows\n    the draft as it is typed.'}},__svelteCsf:{rawCode:`<Stack gap="sm" style="height:28rem">
  <Sheet title="Venues" about="Add a venue">
    <EditableGrid
      columns={venueColumns}
      rows={draftRows}
      bind:draft
      highlight={added}
      oncommit={(row, column, value) => {
        draftRows = draftRows.map((r, i) => (i === row ? { ...r, [column]: value } : r));
      }}
      ondraftsubmit={saveDraft}
      label="Venues"
    />
  </Sheet>
  <CodeBlock label="draft" code={JSON.stringify(draft)} />
</Stack>`}}});var L=l(I,2);R(L,{name:`Read-only`,asChild:!0,children:(e,t)=>{w(e,{style:`height:24rem`,children:(e,t)=>{F(e,{title:`Venues`,about:`Read-only`,children:(e,t)=>{{let t=d(()=>s(o).slice(0,5));N(e,{get columns(){return k},get rows(){return s(t)},editable:!1,label:`Venues`})}},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"`editable={false}`: a read-only table at full contrast."}},__svelteCsf:{rawCode:`<Stack style="height:24rem">
  <Sheet title="Venues" about="Read-only">
    <EditableGrid
      columns={venueColumns}
      rows={rows.slice(0, 5)}
      editable={false}
      label="Venues"
    />
  </Sheet>
</Stack>`}}});var W=l(L,2);R(W,{name:`List cells`,asChild:!0,children:(e,t)=>{w(e,{style:`height:18rem`,children:(e,t)=>{F(e,{title:`Topics`,children:(e,t)=>{N(e,{get columns(){return z},get rows(){return s(S)},oncommit:(e,t,n)=>{f(S,s(S).map((r,i)=>i===e?{...r,[t]:n}:r),!0)},label:`Topics`})},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A VARCHAR[] column: tags in the cell, a TagInput to edit. Enter adds a tag, Enter again
    saves.`}},__svelteCsf:{rawCode:`<Stack style="height:18rem">
  <Sheet title="Topics">
    <EditableGrid
      columns={topicColumns}
      rows={topicRows}
      oncommit={(row, column, value) => {
        topicRows = topicRows.map((r, i) => (i === row ? { ...r, [column]: value } : r));
      }}
      label="Topics"
    />
  </Sheet>
</Stack>`}}});var G=l(W,2);R(G,{name:`Struct cells`,asChild:!0,children:(e,t)=>{w(e,{gap:`sm`,children:(e,t)=>{var n=H(),r=a(n);w(r,{style:`height:24rem`,children:(e,t)=>{F(e,{title:`Places`,children:(e,t)=>{N(e,{get columns(){return B},get rows(){return s(x)},wrap:!0,oncommit:(e,t,n)=>{f(x,s(x).map((r,i)=>i===e?{...r,[t]:n}:r),!0)},label:`Places`})},$$slots:{default:!0}})},$$slots:{default:!0}});var i=l(r,2);{let e=d(()=>JSON.stringify(s(x),null,1));O(i,{label:`rows`,get code(){return s(e)},wrap:!0})}_(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`STRUCT columns: each value is edited where it stands. Nested records fold; NULL records still
    show the keys their type names. The code below shows what a save commits.`}},__svelteCsf:{rawCode:`<Stack gap="sm">
  <Stack style="height:24rem">
    <Sheet title="Places">
      <EditableGrid
        columns={structColumns}
        rows={structRows}
        wrap
        oncommit={(row, column, value) => {
          structRows = structRows.map((r, i) => (i === row ? { ...r, [column]: value } : r));
        }}
        label="Places"
      />
    </Sheet>
  </Stack>
  <CodeBlock label="rows" code={JSON.stringify(structRows, null, 1)} wrap />
</Stack>`}}}),_(e,D),h()}var L,R,z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q;function $(){return($=e((()=>{o(),v(),M(),P(),S(),T(),D(),C(),A(),m(),y(),L={title:`Organisms/EditableGrid`,component:N,tags:[`autodocs`],parameters:{layout:`padded`}},{Story:R}=b(L),z=[{name:`name`,type:`VARCHAR`},{name:`topics`,type:`VARCHAR[]`}],B=[{name:`name`,type:`VARCHAR`},{name:`title`,type:`STRUCT(de VARCHAR, en VARCHAR)`},{name:`address`,type:`STRUCT(street VARCHAR, city VARCHAR, geo STRUCT(lat DOUBLE, lng DOUBLE))`},{name:`contact`,type:`STRUCT(email VARCHAR, phones VARCHAR[], verified BOOLEAN)`}],V=n(`<span> </span> <span><!> saves · <!> moves right · <!> cancels</span>`,1),H=n(`<!> <!>`,1),U=n(`<!> <!> <!> <!> <!> <!> <!>`,1),I.__docgen={data:[],name:`EditableGrid.stories.svelte`},W=x(I,L),G=[`Venues`,`LockedHintAndSaveError`,`Wrapped`,`DraftRow`,`ReadOnly`,`ListCells`,`StructCells`],K={...W.Venues,tags:[`svelte-csf-v5`]},q={...W.LockedHintAndSaveError,tags:[`svelte-csf-v5`]},J={...W.Wrapped,tags:[`svelte-csf-v5`]},Y={...W.DraftRow,tags:[`svelte-csf-v5`]},X={...W.ReadOnly,tags:[`svelte-csf-v5`]},Z={...W.ListCells,tags:[`svelte-csf-v5`]},Q={...W.StructCells,tags:[`svelte-csf-v5`]}})))()}$();export{Y as DraftRow,Z as ListCells,q as LockedHintAndSaveError,X as ReadOnly,Q as StructCells,K as Venues,J as Wrapped,G as __namedExportsOrder,L as default};