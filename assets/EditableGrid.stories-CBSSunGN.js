import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Cn as t,Et as n,Kt as r,Mt as i,Qt as a,Rt as o,St as s,Ut as ee,Wt as c,Yt as l,_t as u,bt as d,en as f,fn as p,jn as m,l as h,on as g,pn as te,qt as _,wn as ne}from"./iframe-CWg4yaha.js";import{i as v,n as y,r as b,t as x}from"./create-runtime-stories-DQq0d2lF.js";import{n as S,t as re}from"./Badge-DjfwO9wo.js";import{n as C,t as w}from"./Stack-vorXuMUJ.js";import{n as T,t as E}from"./Kbd-DCQcpsuA.js";import{n as D,t as O}from"./CodeBlock-BS27Zwhq.js";import{b as k,l as A,x as j}from"./mock-CoQSv9oT.js";import{n as M,t as N}from"./EditableGrid-CN1Hfnig.js";import{n as P,t as F}from"./Sheet-BtzZZNVH.js";function I(e,s){te(s,!0);let m=f(l(j())),h=f(null),v=f(l(j().slice(0,4))),y=f(null);function b(){i(h)&&(a(v,[...i(v),{...i(h)}],!0),a(y,i(v).length-1),a(h,null))}let x=f(l([{name:`Open-air stage`,title:{de:`Freilichtbühne`,en:`Open-air stage`},address:{street:`Am Park 1`,city:`Bonn`,geo:{lat:50.7374,lng:7.0982}},contact:{email:`stage@example.com`,phones:[`+49 228 1234`,`+49 228 5678`],verified:!0}},{name:`Town hall`,title:{de:null,en:null},address:{street:`Markt 2`,city:`Bonn`,geo:null},contact:{email:null,phones:[],verified:!1}},{name:`Library`,title:null,address:null,contact:null}])),S=f(l([{name:`Open-air stage`,topics:[`concerts`,`outdoor`,`summer`,`barrier-free`]},{name:`Town hall`,topics:[`events`]},{name:`Library`,topics:null}]));function C(e,t,n){return new Promise((r,o)=>setTimeout(()=>{t===`capacity`&&typeof n==`number`&&n>1e5?o(Error(`capacity out of range`)):(a(m,i(m).map((r,i)=>i===e?{...r,[t]:n}:r),!0),r())},600))}function T(e){return new Promise(t=>setTimeout(()=>{a(m,i(m).filter((t,n)=>n!==e),!0),t()},500))}var D=U(),A=c(D);R(A,{name:`Venues`,asChild:!0,children:(e,a)=>{w(e,{style:`height:30rem`,children:(e,a)=>{F(e,{title:`Venues`,about:`Capacities, accessibility and notes of every venue.`,tools:e=>{re(e,{tone:`live`,label:`Editable`})},footer:e=>{var a=V(),s=c(a),l=r(s),f=_(s,2),p=ee(f);E(p,{children:(e,r)=>{t();var i=n(`Enter`);d(e,i)},$$slots:{default:!0}});var h=_(p,2);E(h,{children:(e,r)=>{t();var i=n(`Tab`);d(e,i)},$$slots:{default:!0}});var g=_(h,2);E(g,{children:(e,r)=>{t();var i=n(`Esc`);d(e,i)},$$slots:{default:!0}}),t(),ne(f),o(()=>u(l,`${i(m).length??``} rows`)),d(e,a)},children:(e,t)=>{N(e,{get columns(){return k},get rows(){return i(m)},oncommit:C,ondelete:T,label:`Venues`})},$$slots:{tools:!0,footer:!0,default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`The grid inside a Sheet, as in an editor. Click a cell: Enter saves (a green flash), Tab moves
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
</Stack>`}}});var M=_(A,2);R(M,{name:`Locked hint and save error`,asChild:!0,children:(e,t)=>{w(e,{style:`height:30rem`,children:(e,t)=>{F(e,{title:`Venues`,about:`Locked columns explain themselves; refused saves say why.`,children:(e,t)=>{N(e,{get columns(){return k},get rows(){return i(m)},oncommit:C,lockedHint:e=>e.type===`TIMESTAMP`?`${e.name} is set by the database when the row changes.`:`${e.name} is the key of the row and cannot be changed.`,errorMessage:e=>e instanceof Error&&e.message===`capacity out of range`?`Not saved: no venue holds more than 100,000 people.`:`Not saved — try again.`,label:`Venues`})},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"Feedback at the cell. Click `id` or `updated_at`: `lockedHint` explains why in a bubble anchored\n    to that cell. Enter a capacity of 200000: the save is refused and `errorMessage` puts the\n    reason right under the cell (red, announced), not in a footer far away."}},__svelteCsf:{rawCode:`<Stack style="height:30rem">
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
</Stack>`}}});var P=_(M,2);R(P,{name:`Wrapped`,asChild:!0,children:(e,t)=>{w(e,{style:`height:30rem`,children:(e,t)=>{F(e,{title:`Venues`,about:`Wrapped cells`,children:(e,t)=>{N(e,{get columns(){return k},get rows(){return i(m)},wrap:!0,oncommit:C,label:`Venues`})},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"`wrap`: long values break onto several lines instead of being cut off."}},__svelteCsf:{rawCode:`<Stack style="height:30rem">
  <Sheet title="Venues" about="Wrapped cells">
    <EditableGrid columns={venueColumns} {rows} wrap oncommit={commit} label="Venues" />
  </Sheet>
</Stack>`}}});var I=_(P,2);R(I,{name:`Draft row`,asChild:!0,children:(e,t)=>{w(e,{gap:`sm`,style:`height:28rem`,children:(e,t)=>{var n=H(),r=c(n);F(r,{title:`Venues`,about:`Add a venue`,children:(e,t)=>{N(e,{get columns(){return k},get rows(){return i(v)},get highlight(){return i(y)},oncommit:(e,t,n)=>{a(v,i(v).map((r,i)=>i===e?{...r,[t]:n}:r),!0)},ondraftsubmit:b,label:`Venues`,get draft(){return i(h)},set draft(e){a(h,e,!0)}})},$$slots:{default:!0}});var o=_(r,2);{let e=g(()=>JSON.stringify(i(h)));O(o,{label:`draft`,get code(){return i(e)}})}d(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:'New rows are made where they land: with `ondraftsubmit`, "+ New row" after the last row opens\n    `draft` (bindable) in place, with Save and Cancel right under it; Enter submits, Escape\n    cancels. The saved row appears where the draft was and flashes green. The code below shows\n    the draft as it is typed.'}},__svelteCsf:{rawCode:`<Stack gap="sm" style="height:28rem">
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
</Stack>`}}});var L=_(I,2);R(L,{name:`Read-only`,asChild:!0,children:(e,t)=>{w(e,{style:`height:24rem`,children:(e,t)=>{F(e,{title:`Venues`,about:`Read-only`,children:(e,t)=>{{let t=g(()=>i(m).slice(0,5));N(e,{get columns(){return k},get rows(){return i(t)},editable:!1,label:`Venues`})}},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"`editable={false}`: a read-only table at full contrast."}},__svelteCsf:{rawCode:`<Stack style="height:24rem">
  <Sheet title="Venues" about="Read-only">
    <EditableGrid
      columns={venueColumns}
      rows={rows.slice(0, 5)}
      editable={false}
      label="Venues"
    />
  </Sheet>
</Stack>`}}});var W=_(L,2);R(W,{name:`List cells`,asChild:!0,children:(e,t)=>{w(e,{style:`height:18rem`,children:(e,t)=>{F(e,{title:`Topics`,children:(e,t)=>{N(e,{get columns(){return z},get rows(){return i(S)},oncommit:(e,t,n)=>{a(S,i(S).map((r,i)=>i===e?{...r,[t]:n}:r),!0)},label:`Topics`})},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A VARCHAR[] column: tags in the cell, a TagInput to edit. Enter adds a tag, Enter again
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
</Stack>`}}});var G=_(W,2);R(G,{name:`Struct cells`,asChild:!0,children:(e,t)=>{w(e,{gap:`sm`,children:(e,t)=>{var n=H(),r=c(n);w(r,{style:`height:24rem`,children:(e,t)=>{F(e,{title:`Places`,children:(e,t)=>{N(e,{get columns(){return B},get rows(){return i(x)},wrap:!0,oncommit:(e,t,n)=>{a(x,i(x).map((r,i)=>i===e?{...r,[t]:n}:r),!0)},label:`Places`})},$$slots:{default:!0}})},$$slots:{default:!0}});var o=_(r,2);{let e=g(()=>JSON.stringify(i(x),null,1));O(o,{label:`rows`,get code(){return i(e)},wrap:!0})}d(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`STRUCT columns: each value is edited where it stands. Nested records fold; NULL records still
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
</Stack>`}}}),d(e,D),p()}var L,R,z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q;function $(){return($=e((()=>{m(),v(),M(),P(),S(),T(),D(),C(),A(),h(),y(),L={title:`Organisms/EditableGrid`,component:N,tags:[`autodocs`],parameters:{layout:`padded`}},{Story:R}=b(L),z=[{name:`name`,type:`VARCHAR`},{name:`topics`,type:`VARCHAR[]`}],B=[{name:`name`,type:`VARCHAR`},{name:`title`,type:`STRUCT(de VARCHAR, en VARCHAR)`},{name:`address`,type:`STRUCT(street VARCHAR, city VARCHAR, geo STRUCT(lat DOUBLE, lng DOUBLE))`},{name:`contact`,type:`STRUCT(email VARCHAR, phones VARCHAR[], verified BOOLEAN)`}],V=s(`<span> </span> <span><!> saves · <!> moves right · <!> cancels</span>`,1),H=s(`<!> <!>`,1),U=s(`<!> <!> <!> <!> <!> <!> <!>`,1),I.__docgen={data:[],name:`EditableGrid.stories.svelte`},W=x(I,L),G=[`Venues`,`LockedHintAndSaveError`,`Wrapped`,`DraftRow`,`ReadOnly`,`ListCells`,`StructCells`],K={...W.Venues,tags:[`svelte-csf-v5`]},q={...W.LockedHintAndSaveError,tags:[`svelte-csf-v5`]},J={...W.Wrapped,tags:[`svelte-csf-v5`]},Y={...W.DraftRow,tags:[`svelte-csf-v5`]},X={...W.ReadOnly,tags:[`svelte-csf-v5`]},Z={...W.ListCells,tags:[`svelte-csf-v5`]},Q={...W.StructCells,tags:[`svelte-csf-v5`]}})))()}$();export{Y as DraftRow,Z as ListCells,q as LockedHintAndSaveError,X as ReadOnly,Q as StructCells,K as Venues,J as Wrapped,G as __namedExportsOrder,L as default};