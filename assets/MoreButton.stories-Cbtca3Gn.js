import{n as e}from"./rolldown-runtime-Dxh6kD9_.js";import{$t as t,Ct as n,Dt as r,Ft as i,Gt as a,Ht as o,Mn as s,N as c,On as l,Ot as u,Pt as d,Rt as f,Sn as p,V as m,Wt as h,_t as g,b as _,cn as v,d as y,hn as b,jn as x,kt as ee,l as S,on as C,tt as w,xn as T,xt as E,zt as D}from"./iframe-WlNMZtZ0.js";import{i as O,n as te,r as ne,t as re}from"./create-runtime-stories-CbHiKinS.js";import{n as ie,t as ae}from"./Icon-DWu5QcKY.js";import{n as oe,t as se}from"./Button-DHLILcYm.js";import{n as ce,t as k}from"./Input-DeTI9rlx.js";import{n as A,t as j}from"./Field-DtdH1dfq.js";import{n as M,t as N}from"./Avatar-DNIQ76Cs.js";import{n as P,t as F}from"./Text-DMhRT0Hz.js";import{n as I,t as L}from"./Stack-BjV-rmuj.js";import{n as R,t as z}from"./ContextPanel-BHuyXaQ1.js";function B(e,n){let r=y(n,`show`,3,`touch`),i=y(n,`vertical`,3,!1);var o=V(),l=f(o),u=f(l);{let e=b(()=>i()?`more-vertical`:`more`);ae(u,{get name(){return a(e)},size:16})}s(l),s(o),t(()=>{m(o,1,`more show-${r()??``}`,`svelte-1bcry6i`),c(o,`aria-label`,n.label)}),ee(`click`,o,function(...e){n.onclick?.apply(this,e)}),E(e,o)}var V;function H(){return(H=e((()=>{i(),d(),S(),ie(),V=n(`<button type="button" aria-haspopup="dialog"><span class="dots svelte-1bcry6i"><!></span></button>`),u([`click`]),B.__docgen={data:[{name:`label`,visibility:`public`,description:`The button's accessible name ("Change Mila").`,keywords:[{name:`required`,description:``}],kind:`let`,type:{kind:`type`,type:`string`,text:`string`},static:!1,readonly:!1},{name:`onclick`,visibility:`public`,description:"Opens the panel; `currentTarget` is the button to open it under.",keywords:[{name:`required`,description:``}],kind:`let`,type:{kind:`function`,text:`(event: MouseEvent & { currentTarget: HTMLButtonElement; }) => void`},static:!1,readonly:!1},{name:`show`,visibility:`public`,description:"Where it shows: `touch` screens only, also on `hover` of its row, or `always`.",keywords:[],kind:`let`,type:{kind:`union`,type:[{kind:`const`,type:`string`,value:`touch`,text:`"touch"`},{kind:`const`,type:`string`,value:`always`,text:`"always"`},{kind:`const`,type:`string`,value:`hover`,text:`"hover"`}],text:`"touch" | "always" | "hover"`},static:!1,readonly:!1,defaultValue:`"touch"`},{name:`vertical`,visibility:`public`,description:`Dots stacked upright (⋮) instead of side by side.`,keywords:[],kind:`let`,type:{kind:`type`,type:`boolean`,text:`boolean`},static:!1,readonly:!1,defaultValue:`false`}],name:`MoreButton.svelte`}})))()}function U(e,n){p(n,!0);let i=h([{id:`a`,name:`Ada Example`,role:`Design`},{id:`b`,name:`Ben Example`,role:`Engineering`},{id:`c`,name:`Cleo Example`,role:`Finance`}]),u=v(void 0),d=e=>{let t=e.target.closest(`[data-row]`)?.dataset.row;return i.find(e=>e.id===t)};var m=K(),y=D(m);G(y,{name:`In a list`,asChild:!0,children:(e,n)=>{_(z(e,{onopen:d,label:`Change a person`,width:`20rem`,longpress:!0,sheet:!0,panel:(e,t=l,n=l)=>{L(e,{gap:`md`,children:(e,r)=>{var i=K(),a=D(i);j(a,{label:`Role`,children:(e,n)=>{k(e,{get value(){return t().role},onchange:e=>t().role=e.currentTarget.value})},$$slots:{default:!0}});var s=o(a,2);se(s,{variant:`primary`,label:`Done`,get onclick(){return n()}}),E(e,i)},$$slots:{default:!0}})},children:(e,n)=>{var l=J();w(l,21,()=>i,e=>e.id,(e,n)=>{var i=q(),l=f(i);N(l,{get name(){return a(n).name},size:32});var d=o(l,2),p=f(d);F(p,{children:(e,i)=>{x();var o=r();t(()=>g(o,a(n).name)),E(e,o)},$$slots:{default:!0}});var m=o(p);F(m,{size:`sm`,tone:`muted`,children:(e,i)=>{x();var o=r();t(()=>g(o,a(n).role)),E(e,o)},$$slots:{default:!0}}),s(d),B(o(d,2),{get label(){return`Change ${a(n).name??``}`},show:`hover`,onclick:e=>a(u)?.openFor(e.currentTarget,a(n))}),s(i),t(()=>c(i,`data-row`,a(n).id)),E(e,i)}),s(l),E(e,l)},$$slots:{panel:!0,default:!0}}),e=>C(u,e,!0),()=>a(u))},$$slots:{default:!0},parameters:{docs:{description:{story:`One panel per list, three ways in: right-click (mouse), a long press (finger) and the "⋯"
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
</ContextPanel>`}}});var b=o(y,2);G(b,{name:`Playground`,args:{label:`Change this row`,show:`always`,vertical:!1,onclick:()=>{}},parameters:{docs:{description:{story:"Where it shows: `touch` (default) only on touch screens, `hover` also on a hovered row,\n    `always` everywhere; `vertical` stacks the dots."}},__svelteCsf:{rawCode:`<MoreButton {...args} />`}}}),E(e,m),T()}var W,G,K,q,J,Y,X,Z,Q;function $(){return($=e((()=>{i(),d(),O(),H(),R(),M(),oe(),ce(),P(),A(),I(),S(),te(),W={title:`Molecules/MoreButton`,component:B,tags:[`autodocs`],argTypes:{show:{control:`inline-radio`,options:[`touch`,`hover`,`always`]}}},{Story:G}=ne(W),K=n(`<!> <!>`,1),q=n(`<li class="svelte-tegg3b"><!> <span class="who svelte-tegg3b"><!><!></span> <!></li>`),J=n(`<ul class="people svelte-tegg3b"></ul>`),U.__docgen={data:[],name:`MoreButton.stories.svelte`},Y=re(U,W),X=[`InAList`,`Playground`],Z={...Y.InAList,tags:[`svelte-csf-v5`]},Q={...Y.Playground,tags:[`svelte-csf-v5`]}})))()}$();export{Z as InAList,Q as Playground,X as __namedExportsOrder,W as default};