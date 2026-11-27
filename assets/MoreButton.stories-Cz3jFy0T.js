import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{$t as t,An as n,Cn as r,Ct as i,Dt as a,Ft as o,Gt as s,Ht as c,N as l,Nn as u,Ot as d,Pn as f,Pt as p,Rt as m,V as h,Wt as g,_n as _,_t as v,b as ee,cn as y,d as b,kt as te,l as x,on as S,tt as C,wn as w,xt as T,zt as E}from"./iframe-D3QpTFc1.js";import{i as D,n as O,r as ne,t as re}from"./create-runtime-stories-bgfxAijx.js";import{n as ie,t as ae}from"./Icon-BVq5M3c4.js";import{n as oe,t as se}from"./Button-DO5WmEfH.js";import{n as ce,t as k}from"./Input-CpEmBp8q.js";import{n as A,t as j}from"./Field-57DUJksD.js";import{n as M,t as N}from"./Avatar-CouXfpGm.js";import{n as P,t as F}from"./Text-BTTrRnHh.js";import{n as I,t as L}from"./Stack-DIO0U5nL.js";import{n as R,t as z}from"./ContextPanel-CRCYZHsq.js";function B(e,n){let r=b(n,`show`,3,`touch`),i=b(n,`vertical`,3,!1);var a=V(),o=m(a),c=m(o);{let e=_(()=>i()?`more-vertical`:`more`);ae(c,{get name(){return s(e)},size:16})}f(o),f(a),t(()=>{h(a,1,`more show-${r()??``}`,`svelte-1bcry6i`),l(a,`aria-label`,n.label)}),te(`click`,a,function(...e){n.onclick?.apply(this,e)}),T(e,a)}var V;function H(){return(H=e((()=>{o(),p(),x(),ie(),V=i(`<button type="button" aria-haspopup="dialog"><span class="dots svelte-1bcry6i"><!></span></button>`),d([`click`]),B.__docgen={data:[{name:`label`,visibility:`public`,description:`The button's accessible name ("Change Mila").`,keywords:[{name:`required`,description:``}],kind:`let`,type:{kind:`type`,type:`string`,text:`string`},static:!1,readonly:!1},{name:`onclick`,visibility:`public`,description:"Opens the panel; `currentTarget` is the button to open it under.",keywords:[{name:`required`,description:``}],kind:`let`,type:{kind:`function`,text:`(event: MouseEvent & { currentTarget: HTMLButtonElement; }) => void`},static:!1,readonly:!1},{name:`show`,visibility:`public`,description:"Where it shows: `touch` screens only, also on `hover` of its row, or `always`.",keywords:[],kind:`let`,type:{kind:`union`,type:[{kind:`const`,type:`string`,value:`touch`,text:`"touch"`},{kind:`const`,type:`string`,value:`always`,text:`"always"`},{kind:`const`,type:`string`,value:`hover`,text:`"hover"`}],text:`"touch" | "always" | "hover"`},static:!1,readonly:!1,defaultValue:`"touch"`},{name:`vertical`,visibility:`public`,description:`Dots stacked upright (⋮) instead of side by side.`,keywords:[],kind:`let`,type:{kind:`type`,type:`boolean`,text:`boolean`},static:!1,readonly:!1,defaultValue:`false`}],name:`MoreButton.svelte`}})))()}function U(e,i){w(i,!0);let o=g([{id:`a`,name:`Ada Example`,role:`Design`},{id:`b`,name:`Ben Example`,role:`Engineering`},{id:`c`,name:`Cleo Example`,role:`Finance`}]),d=y(void 0),p=e=>{let t=e.target.closest(`[data-row]`)?.dataset.row;return o.find(e=>e.id===t)};var h=K(),_=E(h);G(_,{name:`In a list`,asChild:!0,children:(e,r)=>{ee(z(e,{onopen:p,label:`Change a person`,width:`20rem`,longpress:!0,sheet:!0,panel:(e,t=n,r=n)=>{L(e,{gap:`md`,children:(e,n)=>{var i=K(),a=E(i);j(a,{label:`Role`,children:(e,n)=>{k(e,{get value(){return t().role},onchange:e=>t().role=e.currentTarget.value})},$$slots:{default:!0}});var o=c(a,2);se(o,{variant:`primary`,label:`Done`,get onclick(){return r()}}),T(e,i)},$$slots:{default:!0}})},children:(e,n)=>{var r=J();C(r,21,()=>o,e=>e.id,(e,n)=>{var r=q(),i=m(r);N(i,{get name(){return s(n).name},size:32});var o=c(i,2),p=m(o);F(p,{children:(e,r)=>{u();var i=a();t(()=>v(i,s(n).name)),T(e,i)},$$slots:{default:!0}});var h=c(p);F(h,{size:`sm`,tone:`muted`,children:(e,r)=>{u();var i=a();t(()=>v(i,s(n).role)),T(e,i)},$$slots:{default:!0}}),f(o),B(c(o,2),{get label(){return`Change ${s(n).name??``}`},show:`hover`,onclick:e=>s(d)?.openFor(e.currentTarget,s(n))}),f(r),t(()=>l(r,`data-row`,s(n).id)),T(e,r)}),f(r),T(e,r)},$$slots:{panel:!0,default:!0}}),e=>S(d,e,!0),()=>s(d))},$$slots:{default:!0},parameters:{docs:{description:{story:`One panel per list, three ways in: right-click (mouse), a long press (finger) and the "⋯"
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
</ContextPanel>`}}});var b=c(_,2);G(b,{name:`Playground`,args:{label:`Change this row`,show:`always`,vertical:!1,onclick:()=>{}},parameters:{docs:{description:{story:"Where it shows: `touch` (default) only on touch screens, `hover` also on a hovered row,\n    `always` everywhere; `vertical` stacks the dots."}},__svelteCsf:{rawCode:`<MoreButton {...args} />`}}}),T(e,h),r()}var W,G,K,q,J,Y,X,Z,Q;function $(){return($=e((()=>{o(),p(),D(),H(),R(),M(),oe(),ce(),P(),A(),I(),x(),O(),W={title:`Molecules/MoreButton`,component:B,tags:[`autodocs`],argTypes:{show:{control:`inline-radio`,options:[`touch`,`hover`,`always`]}}},{Story:G}=ne(W),K=i(`<!> <!>`,1),q=i(`<li class="svelte-tegg3b"><!> <span class="who svelte-tegg3b"><!><!></span> <!></li>`),J=i(`<ul class="people svelte-tegg3b"></ul>`),U.__docgen={data:[],name:`MoreButton.stories.svelte`},Y=re(U,W),X=[`InAList`,`Playground`],Z={...Y.InAList,tags:[`svelte-csf-v5`]},Q={...Y.Playground,tags:[`svelte-csf-v5`]}})))()}$();export{Z as InAList,Q as Playground,X as __namedExportsOrder,W as default};