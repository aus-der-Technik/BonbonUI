import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{$t as t,Cn as n,Ct as r,Ft as i,Gt as a,Ht as o,Pn as s,Pt as c,Rt as l,Vt as u,Wt as d,_n as f,_t as p,cn as m,l as h,on as g,wn as _,xt as v,zt as y}from"./iframe-D3QpTFc1.js";import{i as b,n as x,r as S,t as C}from"./create-runtime-stories-bgfxAijx.js";import{n as w,t as T}from"./Stack-DIO0U5nL.js";import{n as E,t as D}from"./KanbanBoard-f6oqwa9L.js";import{i as O,l as k,r as A,t as j}from"./mock-collab-Dc5VTaAB.js";function M(e,r){_(r,!0);let i=m(d(A())),c=m(`Drag a card, or focus one and press Alt + arrow keys.`),h=m(void 0),b=0;function x(e){b+=1;let t={id:`new-${b}`,column:e,title:`New card ${b}`};g(i,[...a(i),t],!0)}var S=L(),C=y(S);P(C,{name:`Project board`,parameters:{docs:{description:{story:`A project board. Columns show their count against a WIP limit ("In progress" allows 3,
"Review" 2 — move a card there to see it turn red). Cards carry priority, tags, due date
(amber today, red overdue), checklist progress, comments and assignees.`}},__svelteCsf:{rawCode:`<KanbanBoard {...args} />`}}});var w=o(C,2);P(w,{name:`Interactive`,asChild:!0,children:(e,n)=>{T(e,{gap:`sm`,children:(e,n)=>{var r=F(),d=y(r),f=u(d,!0),m=o(d,2),_=l(m);D(_,{get columns(){return O},get selected(){return a(h)},get now(){return j},onmove:(e,t,n)=>g(c,`Moved ${e} to ${t} at index ${n}.`),onopen:e=>g(h,e.id,!0),onadd:x,get cards(){return a(i)},set cards(e){g(i,e,!0)}}),s(m),t(()=>p(f,a(c))),v(e,r)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:'Every way to move a card: drag and drop, Alt + arrow keys on a focused card, or the "⋯"\nmenu (touch). While dragging, the column under the card turns into tinted glass; the card lands\nwith one jelly wobble, and moving it into the last column ("Done") throws a few sprinkles\n(`sprinkle={false}` turns that off). `onmove` reports each move; `onopen` and `onadd` make\ncards openable and addable.'}},__svelteCsf:{rawCode:`<Stack gap="sm">
  <p style="margin:0;color:var(--text-2)" aria-live="polite">{log}</p>
  <div style="height:36rem">
    <KanbanBoard
      columns={boardColumns}
      bind:cards
      {selected}
      now={NOW}
      onmove={(id, column, index) => (log = \`Moved \${id} to \${column} at index \${index}.\`)}
      onopen={(card) => (selected = card.id)}
      onadd={add}
    />
  </div>
</Stack>`}}});var E=o(w,2);P(E,{name:`Failed save`,asChild:!0,children:(e,t)=>{var n=I(),r=l(n);{let e=f(A);D(r,{get columns(){return O},get cards(){return a(e)},get now(){return j},sprinkle:!1,onmove:(e,t)=>new Promise((e,n)=>setTimeout(()=>t===O.at(-1)?.id?n(Error(`conflict`)):e(),700))})}s(n),v(e,n)},$$slots:{default:!0},parameters:{docs:{description:{story:'`onmove` may return a promise. Here every save into "Done" fails: the card travels back to\nwhere it was and says so on the card itself, not in a far corner. Moves elsewhere save.'}},__svelteCsf:{rawCode:`<div style="height:36rem">
  <KanbanBoard
    columns={boardColumns}
    cards={boardCards()}
    now={NOW}
    sprinkle={false}
    onmove={(_id, column) =>
      new Promise<void>((resolve, reject) =>
        setTimeout(
          () => (column === boardColumns.at(-1)?.id ? reject(new Error('conflict')) : resolve()),
          700,
        ),
      )}
  />
</div>`}}});var k=o(E,2);{let e=f(()=>({columnWidth:`14rem`,columns:O.slice(1,4),cards:A().map(({description:e,tasks:t,...n})=>n)}));P(k,{name:`Compact`,get args(){return a(e)},parameters:{docs:{description:{story:`Narrow columns for a small number of short cards.`}},__svelteCsf:{rawCode:`<KanbanBoard {...args} />`}}})}v(e,S),n()}var N,P,F,I,L,R,z,B,V,H,U;function W(){return(W=e((()=>{i(),c(),b(),E(),w(),k(),h(),x(),N={title:`Organisms/KanbanBoard`,component:D,tags:[`autodocs`],args:{columns:O,cards:A(),now:j}},{Story:P}=S(N),F=r(`<p style="margin:0;color:var(--text-2)" aria-live="polite"> </p> <div style="height:36rem"><!></div>`,1),I=r(`<div style="height:36rem"><!></div>`),L=r(`<!> <!> <!> <!>`,1),M.__docgen={data:[],name:`KanbanBoard.stories.svelte`},R=C(M,N),z=[`ProjectBoard`,`Interactive`,`FailedSave`,`Compact`],B={...R.ProjectBoard,tags:[`svelte-csf-v5`]},V={...R.Interactive,tags:[`svelte-csf-v5`]},H={...R.FailedSave,tags:[`svelte-csf-v5`]},U={...R.Compact,tags:[`svelte-csf-v5`]}})))()}W();export{U as Compact,H as FailedSave,V as Interactive,B as ProjectBoard,z as __namedExportsOrder,N as default};