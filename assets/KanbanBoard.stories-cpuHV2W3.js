import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Bt as t,Ct as n,En as r,Gt as i,Jt as a,Kt as o,Nn as s,Pt as c,Yt as l,Zt as u,_t as d,cn as f,en as p,hn as m,l as h,mn as g,nn as _,xt as v}from"./iframe-CjPY-Fqe.js";import{i as y,n as b,r as x,t as S}from"./create-runtime-stories-tZqyKHa4.js";import{n as C,t as w}from"./Stack-BmjVbqUs.js";import{n as T,t as E}from"./KanbanBoard-BSj0GIPq.js";import{i as D,l as O,r as k,t as A}from"./mock-collab-Dc5VTaAB.js";function j(e,n){m(n,!0);let s=_(u(k())),h=_(`Drag a card, or focus one and press Alt + arrow keys.`),y=_(void 0),b=0;function x(e){b+=1;let t={id:`new-${b}`,column:e,title:`New card ${b}`};p(s,[...c(s),t],!0)}var S=I(),C=o(S);N(C,{name:`Project board`,parameters:{docs:{description:{story:`A project board. Columns show their count against a WIP limit ("In progress" allows 3,
"Review" 2 — move a card there to see it turn red). Cards carry priority, tags, due date
(amber today, red overdue), checklist progress, comments and assignees.`}},__svelteCsf:{rawCode:`<KanbanBoard {...args} />`}}});var T=l(C,2);N(T,{name:`Interactive`,asChild:!0,children:(e,n)=>{w(e,{gap:`sm`,children:(e,n)=>{var u=P(),f=o(u),m=a(f,!0),g=l(f,2),_=i(g);E(_,{get columns(){return D},get selected(){return c(y)},get now(){return A},onmove:(e,t,n)=>p(h,`Moved ${e} to ${t} at index ${n}.`),onopen:e=>p(y,e.id,!0),onadd:x,get cards(){return c(s)},set cards(e){p(s,e,!0)}}),r(g),t(()=>d(m,c(h))),v(e,u)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:'Every way to move a card: drag and drop, Alt + arrow keys on a focused card, or the "⋯"\nmenu (touch). While dragging, the column under the card turns into tinted glass; the card lands\nwith one jelly wobble, and moving it into the last column ("Done") throws a few sprinkles\n(`sprinkle={false}` turns that off). `onmove` reports each move; `onopen` and `onadd` make\ncards openable and addable.'}},__svelteCsf:{rawCode:`<Stack gap="sm">
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
</Stack>`}}});var O=l(T,2);N(O,{name:`Failed save`,asChild:!0,children:(e,t)=>{var n=F(),a=i(n);{let e=f(k);E(a,{get columns(){return D},get cards(){return c(e)},get now(){return A},sprinkle:!1,onmove:(e,t)=>new Promise((e,n)=>setTimeout(()=>t===D.at(-1)?.id?n(Error(`conflict`)):e(),700))})}r(n),v(e,n)},$$slots:{default:!0},parameters:{docs:{description:{story:'`onmove` may return a promise. Here every save into "Done" fails: the card travels back to\nwhere it was and says so on the card itself, not in a far corner. Moves elsewhere save.'}},__svelteCsf:{rawCode:`<div style="height:36rem">
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
</div>`}}});var j=l(O,2);{let e=f(()=>({columnWidth:`14rem`,columns:D.slice(1,4),cards:k().map(({description:e,tasks:t,...n})=>n)}));N(j,{name:`Compact`,get args(){return c(e)},parameters:{docs:{description:{story:`Narrow columns for a small number of short cards.`}},__svelteCsf:{rawCode:`<KanbanBoard {...args} />`}}})}v(e,S),g()}var M,N,P,F,I,L,R,z,B,V,H;function U(){return(U=e((()=>{s(),y(),T(),C(),O(),h(),b(),M={title:`Organisms/KanbanBoard`,component:E,tags:[`autodocs`],args:{columns:D,cards:k(),now:A}},{Story:N}=x(M),P=n(`<p style="margin:0;color:var(--text-2)" aria-live="polite"> </p> <div style="height:36rem"><!></div>`,1),F=n(`<div style="height:36rem"><!></div>`),I=n(`<!> <!> <!> <!>`,1),j.__docgen={data:[],name:`KanbanBoard.stories.svelte`},L=S(j,M),R=[`ProjectBoard`,`Interactive`,`FailedSave`,`Compact`],z={...L.ProjectBoard,tags:[`svelte-csf-v5`]},B={...L.Interactive,tags:[`svelte-csf-v5`]},V={...L.FailedSave,tags:[`svelte-csf-v5`]},H={...L.Compact,tags:[`svelte-csf-v5`]}})))()}U();export{H as Compact,V as FailedSave,B as Interactive,z as ProjectBoard,R as __namedExportsOrder,M as default};