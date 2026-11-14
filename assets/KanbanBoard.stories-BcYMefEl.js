import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Kt as t,Mt as n,Qt as r,Rt as i,St as a,Ut as o,Wt as s,Yt as c,_t as l,bt as u,en as d,fn as f,jn as p,l as m,on as h,pn as g,qt as _,wn as v}from"./iframe-D4jyjLko.js";import{i as y,n as b,r as x,t as S}from"./create-runtime-stories-2Z8qmkK0.js";import{n as C,t as w}from"./Stack-CwOhDw0w.js";import{n as T,t as E}from"./KanbanBoard-D95hXK-d.js";import{i as D,l as O,r as k,t as A}from"./mock-collab-Dc5VTaAB.js";function j(e,a){g(a,!0);let p=d(c(k())),m=d(`Drag a card, or focus one and press Alt + arrow keys.`),y=d(void 0),b=0;function x(e){b+=1;let t={id:`new-${b}`,column:e,title:`New card ${b}`};r(p,[...n(p),t],!0)}var S=I(),C=s(S);N(C,{name:`Project board`,parameters:{docs:{description:{story:`A project board. Columns show their count against a WIP limit ("In progress" allows 3,
"Review" 2 — move a card there to see it turn red). Cards carry priority, tags, due date
(amber today, red overdue), checklist progress, comments and assignees.`}},__svelteCsf:{rawCode:`<KanbanBoard {...args} />`}}});var T=_(C,2);N(T,{name:`Interactive`,asChild:!0,children:(e,a)=>{w(e,{gap:`sm`,children:(e,a)=>{var c=P(),d=s(c),f=t(d,!0),h=_(d,2),g=o(h);E(g,{get columns(){return D},get selected(){return n(y)},get now(){return A},onmove:(e,t,n)=>r(m,`Moved ${e} to ${t} at index ${n}.`),onopen:e=>r(y,e.id,!0),onadd:x,get cards(){return n(p)},set cards(e){r(p,e,!0)}}),v(h),i(()=>l(f,n(m))),u(e,c)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:'Every way to move a card: drag and drop, Alt + arrow keys on a focused card, or the "⋯"\nmenu (touch). While dragging, the column under the card turns into tinted glass; the card lands\nwith one jelly wobble, and moving it into the last column ("Done") throws a few sprinkles\n(`sprinkle={false}` turns that off). `onmove` reports each move; `onopen` and `onadd` make\ncards openable and addable.'}},__svelteCsf:{rawCode:`<Stack gap="sm">
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
</Stack>`}}});var O=_(T,2);N(O,{name:`Failed save`,asChild:!0,children:(e,t)=>{var r=F(),i=o(r);{let e=h(k);E(i,{get columns(){return D},get cards(){return n(e)},get now(){return A},sprinkle:!1,onmove:(e,t)=>new Promise((e,n)=>setTimeout(()=>t===D.at(-1)?.id?n(Error(`conflict`)):e(),700))})}v(r),u(e,r)},$$slots:{default:!0},parameters:{docs:{description:{story:'`onmove` may return a promise. Here every save into "Done" fails: the card travels back to\nwhere it was and says so on the card itself, not in a far corner. Moves elsewhere save.'}},__svelteCsf:{rawCode:`<div style="height:36rem">
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
</div>`}}});var j=_(O,2);{let e=h(()=>({columnWidth:`14rem`,columns:D.slice(1,4),cards:k().map(({description:e,tasks:t,...n})=>n)}));N(j,{name:`Compact`,get args(){return n(e)},parameters:{docs:{description:{story:`Narrow columns for a small number of short cards.`}},__svelteCsf:{rawCode:`<KanbanBoard {...args} />`}}})}u(e,S),f()}var M,N,P,F,I,L,R,z,B,V,H;function U(){return(U=e((()=>{p(),y(),T(),C(),O(),m(),b(),M={title:`Organisms/KanbanBoard`,component:E,tags:[`autodocs`],args:{columns:D,cards:k(),now:A}},{Story:N}=x(M),P=a(`<p style="margin:0;color:var(--text-2)" aria-live="polite"> </p> <div style="height:36rem"><!></div>`,1),F=a(`<div style="height:36rem"><!></div>`),I=a(`<!> <!> <!> <!>`,1),j.__docgen={data:[],name:`KanbanBoard.stories.svelte`},L=S(j,M),R=[`ProjectBoard`,`Interactive`,`FailedSave`,`Compact`],z={...L.ProjectBoard,tags:[`svelte-csf-v5`]},B={...L.Interactive,tags:[`svelte-csf-v5`]},V={...L.FailedSave,tags:[`svelte-csf-v5`]},H={...L.Compact,tags:[`svelte-csf-v5`]}})))()}U();export{H as Compact,V as FailedSave,B as Interactive,z as ProjectBoard,R as __namedExportsOrder,M as default};