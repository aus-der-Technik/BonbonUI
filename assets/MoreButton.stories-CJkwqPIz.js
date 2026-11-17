import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Bt as t,Ct as n,Dt as r,En as i,Gt as a,Kt as o,N as s,Nn as c,Ot as l,Pt as u,Tn as d,V as f,Yt as p,Zt as m,_t as h,b as g,cn as _,d as v,en as y,hn as b,jn as x,kt as S,l as C,mn as w,nn as T,rt as E,xt as D}from"./iframe-CRBWUEFv.js";import{i as O,n as k,r as A,t as j}from"./create-runtime-stories-DtoOt73Q.js";import{n as ee,t as te}from"./Icon-Btl8cSXM.js";import{n as ne,t as re}from"./Button-CVctU_KR.js";import{n as ie,t as ae}from"./Input-LtZsVL1B.js";import{n as oe,t as se}from"./Field-Cx-WR2vM.js";import{n as M,t as N}from"./Avatar-C7CjPSx1.js";import{n as P,t as F}from"./Text-LIE7rjjM.js";import{n as I,t as L}from"./Stack-DW7rWz1x.js";import{n as R,t as z}from"./ContextPanel-DFBSC_sx.js";function B(e,n){let r=v(n,`show`,3,`touch`),o=v(n,`vertical`,3,!1);var c=V(),l=a(c),d=a(l);{let e=_(()=>o()?`more-vertical`:`more`);te(d,{get name(){return u(e)},size:16})}i(l),i(c),t(()=>{f(c,1,`more show-${r()??``}`,`svelte-1bcry6i`),s(c,`aria-label`,n.label)}),S(`click`,c,function(...e){n.onclick?.apply(this,e)}),D(e,c)}var V;function H(){return(H=e((()=>{c(),C(),ee(),V=n(`<button type="button" aria-haspopup="dialog"><span class="dots svelte-1bcry6i"><!></span></button>`),l([`click`]),B.__docgen={data:[{name:`label`,visibility:`public`,description:`The button's accessible name ("Change Mila").`,keywords:[{name:`required`,description:``}],kind:`let`,type:{kind:`type`,type:`string`,text:`string`},static:!1,readonly:!1},{name:`onclick`,visibility:`public`,description:"Opens the panel; `currentTarget` is the button to open it under.",keywords:[{name:`required`,description:``}],kind:`let`,type:{kind:`function`,text:`(event: MouseEvent & { currentTarget: HTMLButtonElement; }) => void`},static:!1,readonly:!1},{name:`show`,visibility:`public`,description:"Where it shows: `touch` screens only, also on `hover` of its row, or `always`.",keywords:[],kind:`let`,type:{kind:`union`,type:[{kind:`const`,type:`string`,value:`touch`,text:`"touch"`},{kind:`const`,type:`string`,value:`always`,text:`"always"`},{kind:`const`,type:`string`,value:`hover`,text:`"hover"`}],text:`"touch" | "always" | "hover"`},static:!1,readonly:!1,defaultValue:`"touch"`},{name:`vertical`,visibility:`public`,description:`Dots stacked upright (⋮) instead of side by side.`,keywords:[],kind:`let`,type:{kind:`type`,type:`boolean`,text:`boolean`},static:!1,readonly:!1,defaultValue:`false`}],name:`MoreButton.svelte`}})))()}function U(e,n){b(n,!0);let c=m([{id:`a`,name:`Ada Example`,role:`Design`},{id:`b`,name:`Ben Example`,role:`Engineering`},{id:`c`,name:`Cleo Example`,role:`Finance`}]),l=T(void 0),f=e=>{let t=e.target.closest(`[data-row]`)?.dataset.row;return c.find(e=>e.id===t)};var _=K(),v=o(_);G(v,{name:`In a list`,asChild:!0,children:(e,n)=>{g(z(e,{onopen:f,label:`Change a person`,width:`20rem`,longpress:!0,sheet:!0,panel:(e,t=x,n=x)=>{L(e,{gap:`md`,children:(e,r)=>{var i=K(),a=o(i);se(a,{label:`Role`,children:(e,n)=>{ae(e,{get value(){return t().role},onchange:e=>t().role=e.currentTarget.value})},$$slots:{default:!0}});var s=p(a,2);re(s,{variant:`primary`,label:`Done`,get onclick(){return n()}}),D(e,i)},$$slots:{default:!0}})},children:(e,n)=>{var o=J();E(o,21,()=>c,e=>e.id,(e,n)=>{var o=q(),c=a(o);N(c,{get name(){return u(n).name},size:32});var f=p(c,2),m=a(f);F(m,{children:(e,i)=>{d();var a=r();t(()=>h(a,u(n).name)),D(e,a)},$$slots:{default:!0}});var g=p(m);F(g,{size:`sm`,tone:`muted`,children:(e,i)=>{d();var a=r();t(()=>h(a,u(n).role)),D(e,a)},$$slots:{default:!0}}),i(f),B(p(f,2),{get label(){return`Change ${u(n).name??``}`},show:`hover`,onclick:e=>u(l)?.openFor(e.currentTarget,u(n))}),i(o),t(()=>s(o,`data-row`,u(n).id)),D(e,o)}),i(o),D(e,o)},$$slots:{panel:!0,default:!0}}),e=>y(l,e,!0),()=>u(l))},$$slots:{default:!0},parameters:{docs:{description:{story:`One panel per list, three ways in: right-click (mouse), a long press (finger) and the "⋯"
    (anyone). \`show="hover"\` here: on a desktop the dots appear on the hovered row; on a touch
    screen they are always there. On a phone the panel is a bottom sheet.`}},__svelteCsf:{rawCode:`<ContextPanel
  bind:this={peoplePanel}
  onopen={rowAt}
  label="Change a person"
  width="20rem"
  longpress
  sheet
>
  {#snippet panel(person, close)}
    <Stack gap="md">
      <Field label="Role">
        <Input
          value={person.role}
          onchange={(e) => (person.role = (e.currentTarget as HTMLInputElement).value)}
        />
      </Field>
      <Button variant="primary" label="Done" onclick={close} />
    </Stack>
  {/snippet}
  <ul class="people">
    {#each people as person (person.id)}
      <li data-row={person.id}>
        <Avatar name={person.name} size={32} />
        <span class="who"
          ><Text>{person.name}</Text><Text size="sm" tone="muted">{person.role}</Text></span
        >
        <MoreButton
          label="Change {person.name}"
          show="hover"
          onclick={(e) => peoplePanel?.openFor(e.currentTarget, person)}
        />
      </li>
    {/each}
  </ul>
</ContextPanel>`}}});var S=p(v,2);G(S,{name:`Playground`,args:{label:`Change this row`,show:`always`,vertical:!1,onclick:()=>{}},parameters:{docs:{description:{story:"Where it shows: `touch` (default) only on touch screens, `hover` also on a hovered row,\n    `always` everywhere; `vertical` stacks the dots."}},__svelteCsf:{rawCode:`<MoreButton {...args} />`}}}),D(e,_),w()}var W,G,K,q,J,Y,X,Z,Q;function $(){return($=e((()=>{c(),O(),H(),R(),M(),ne(),ie(),P(),oe(),I(),C(),k(),W={title:`Molecules/MoreButton`,component:B,tags:[`autodocs`],argTypes:{show:{control:`inline-radio`,options:[`touch`,`hover`,`always`]}}},{Story:G}=A(W),K=n(`<!> <!>`,1),q=n(`<li class="svelte-tegg3b"><!> <span class="who svelte-tegg3b"><!><!></span> <!></li>`),J=n(`<ul class="people svelte-tegg3b"></ul>`),U.__docgen={data:[],name:`MoreButton.stories.svelte`},Y=j(U,W),X=[`InAList`,`Playground`],Z={...Y.InAList,tags:[`svelte-csf-v5`]},Q={...Y.Playground,tags:[`svelte-csf-v5`]}})))()}$();export{Z as InAList,Q as Playground,X as __namedExportsOrder,W as default};