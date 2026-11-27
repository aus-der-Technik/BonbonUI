import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{A as t,An as n,Cn as r,Ct as i,Ft as a,Gt as o,Ht as s,Pt as c,St as l,cn as u,l as d,on as f,tt as p,wn as m,xt as h,zt as g}from"./iframe-D3QpTFc1.js";import{i as _,n as v,r as y,t as b}from"./create-runtime-stories-bgfxAijx.js";import{n as x,t as S}from"./Button-DO5WmEfH.js";import{n as C,t as w}from"./SegmentedControl-CBzcZqe-.js";import{n as T,t as E}from"./Popover-B-zbiW7D.js";import{n as D,t as O}from"./Stack-DIO0U5nL.js";import{n as k,t as A}from"./Row-B0vuEKpz.js";import{n as j,t as M}from"./Switch-BtV4cohu.js";function N(e,i){m(i,!0);let a=u(`board`),c=u(!1),d=u(!0);var _=I(),v=g(_);F(v,{name:`Filters`,asChild:!0,children:(e,t)=>{E(e,{label:`View options`,icon:`filter`,title:`View options`,width:`18rem`,children:(e,t=n)=>{O(e,{gap:`md`,children:(e,n)=>{var r=I(),i=g(r);w(i,{label:`Layout`,options:[{value:`board`,label:`Board`},{value:`list`,label:`List`}],get value(){return o(a)},set value(e){f(a,e,!0)}});var l=s(i,2);M(l,{label:`Compact cards`,get checked(){return o(c)},set checked(e){f(c,e,!0)}});var u=s(l,2);M(u,{label:`Show done`,get checked(){return o(d)},set checked(e){f(d,e,!0)}});var p=s(u,2);A(p,{justify:`end`,children:(e,n)=>{S(e,{variant:`primary`,size:`sm`,label:`Done`,get onclick(){return t()}})},$$slots:{default:!0}}),h(e,r)},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A filter panel behind a button; it grows out of its trigger (origin at the trigger's centre)
    so you see where it came from. Escape, a click outside or "Done" closes it.`}},__svelteCsf:{rawCode:`<Popover label="View options" icon="filter" title="View options" width="18rem">
  {#snippet children(close)}
    <Stack gap="md">
      <SegmentedControl
        label="Layout"
        options={[
          { value: 'board', label: 'Board' },
          { value: 'list', label: 'List' },
        ]}
        bind:value={view}
      />
      <Switch label="Compact cards" bind:checked={compact} />
      <Switch label="Show done" bind:checked={showDone} />
      <Row justify="end">
        <Button variant="primary" size="sm" label="Done" onclick={close} />
      </Row>
    </Stack>
  {/snippet}
</Popover>`}}});var y=s(v,2);F(y,{name:`Placement`,asChild:!0,children:(e,t)=>{A(e,{justify:`end`,padding:`2xl`,children:(e,t)=>{E(e,{label:`Share`,icon:`share`,iconOnly:!0,variant:`glass`,placement:`top-end`,title:`Share`,children:(e,t)=>{var n=L();h(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`An icon-only glass trigger that opens upwards and aligns to its right edge.`}},__svelteCsf:{rawCode:`<Row justify="end" padding="2xl">
  <Popover label="Share" icon="share" iconOnly variant="glass" placement="top-end" title="Share">
    <p style="margin:0;max-width:16rem;color:var(--text-2)">
      Anyone with the link can view this board. Invite people to let them edit.
    </p>
  </Popover>
</Row>`}}});var b=s(y,2);F(b,{name:`Beside the trigger`,asChild:!0,children:(e,t)=>{A(e,{justify:`between`,padding:`2xl`,align:`start`,children:(e,t)=>{var n=U(),r=g(n);O(r,{gap:`sm`,children:(e,t)=>{var n=B(),r=g(n);E(r,{label:`Slide options`,icon:`layout`,iconOnly:!0,placement:`right-start`,title:`Layout`,children:(e,t)=>{var n=R();h(e,n)},$$slots:{default:!0}});var i=s(r,2);E(i,{label:`Centred beside`,icon:`more`,iconOnly:!0,placement:`right`,title:`Beside`,children:(e,t)=>{var n=z();h(e,n)},$$slots:{default:!0}}),h(e,n)},$$slots:{default:!0}});var i=s(r,2);E(i,{label:`Over the trigger`,placement:`center`,title:`Rename`,children:(e,t)=>{var n=V();h(e,n)},$$slots:{default:!0}});var a=s(i,2);E(a,{label:`Details`,icon:`info`,iconOnly:!0,placement:`left-start`,title:`Details`,children:(e,t)=>{var n=H();h(e,n)},$$slots:{default:!0}}),h(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"Beside the trigger: from a vertical rail or a sidebar a popover opens sideways, lined up with\n    the trigger's top (`right-start`) or centred on it (`right`). It grows out of the edge facing\n    the trigger, level with it, and flips to the other side when the room runs out. `center`\n    lays the panel over the trigger."}},__svelteCsf:{rawCode:`<Row justify="between" padding="2xl" align="start">
  <Stack gap="sm">
    <Popover label="Slide options" icon="layout" iconOnly placement="right-start" title="Layout">
      <p style="margin:0;max-width:14rem;color:var(--text-2)">
        Opens to the right of a rail, aligned with its trigger.
      </p>
    </Popover>
    <Popover label="Centred beside" icon="more" iconOnly placement="right" title="Beside">
      <p style="margin:0;max-width:14rem;color:var(--text-2)">Centred on the trigger.</p>
    </Popover>
  </Stack>
  <Popover label="Over the trigger" placement="center" title="Rename">
    <p style="margin:0;max-width:14rem;color:var(--text-2)">Laid over its trigger.</p>
  </Popover>
  <Popover label="Details" icon="info" iconOnly placement="left-start" title="Details">
    <p style="margin:0;max-width:14rem;color:var(--text-2)">
      Opens to the left — at the right edge of the screen this is where the room is.
    </p>
  </Popover>
</Row>`}}});var x=s(b,2);F(x,{name:`Custom trigger`,asChild:!0,children:(e,r)=>{E(e,{label:`Status`,padding:`sm`,trigger:(e,r=n)=>{var i=W();t(i,()=>({type:`button`,...r(),style:`font:inherit;font-weight:600;color:var(--text);padding:.35rem .8rem;border:.75px solid var(--pill-border);border-radius:var(--radius-pill);background:var(--pill-tint);box-shadow:var(--shadow-frosted);cursor:pointer`})),h(e,i)},children:(e,t=n)=>{O(e,{gap:`xs`,children:(e,n)=>{var r=l(),i=g(r);p(i,16,()=>[`On track`,`At risk`,`Off track`],e=>e,(e,n)=>{S(e,{variant:`ghost`,size:`sm`,get label(){return n},get onclick(){return t()}})}),h(e,r)},$$slots:{default:!0}})},$$slots:{trigger:!0,default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Your own trigger: spread the props the snippet receives onto it.`}},__svelteCsf:{rawCode:`<Popover label="Status" padding="sm">
  {#snippet trigger(props)}
    <button
      type="button"
      {...props}
      style="font:inherit;font-weight:600;color:var(--text);padding:.35rem .8rem;border:.75px solid var(--pill-border);border-radius:var(--radius-pill);background:var(--pill-tint);box-shadow:var(--shadow-frosted);cursor:pointer"
    >
      <span style="color:var(--ok)">●</span> On track ▾
    </button>
  {/snippet}
  {#snippet children(close)}
    <Stack gap="xs">
      {#each ['On track', 'At risk', 'Off track'] as status (status)}
        <Button variant="ghost" size="sm" label={status} onclick={close} />
      {/each}
    </Stack>
  {/snippet}
</Popover>`}}}),h(e,_),r()}var P,F,I,L,R,z,B,V,H,U,W,G,K,q,J,Y,X;function Z(){return(Z=e((()=>{a(),c(),_(),T(),C(),x(),j(),k(),D(),d(),v(),P={title:`Molecules/Popover`,component:E,tags:[`autodocs`],argTypes:{placement:{control:`select`,options:[`bottom-start`,`bottom`,`bottom-end`,`top-start`,`top`,`top-end`,`right-start`,`right`,`right-end`,`left-start`,`left`,`left-end`,`center`]},variant:{control:`select`,options:[`primary`,`secondary`,`glass`,`ghost`]}}},{Story:F}=y(P),I=i(`<!> <!> <!> <!>`,1),L=i(`<p style="margin:0;max-width:16rem;color:var(--text-2)">Anyone with the link can view this board. Invite people to let them edit.</p>`),R=i(`<p style="margin:0;max-width:14rem;color:var(--text-2)">Opens to the right of a rail, aligned with its trigger.</p>`),z=i(`<p style="margin:0;max-width:14rem;color:var(--text-2)">Centred on the trigger.</p>`),B=i(`<!> <!>`,1),V=i(`<p style="margin:0;max-width:14rem;color:var(--text-2)">Laid over its trigger.</p>`),H=i(`<p style="margin:0;max-width:14rem;color:var(--text-2)">Opens to the left — at the right edge of the screen this is where the room is.</p>`),U=i(`<!> <!> <!>`,1),W=i(`<button><span style="color:var(--ok)">●</span> On track ▾</button>`),N.__docgen={data:[],name:`Popover.stories.svelte`},G=b(N,P),K=[`Filters`,`Placement`,`BesideTheTrigger`,`CustomTrigger`],q={...G.Filters,tags:[`svelte-csf-v5`]},J={...G.Placement,tags:[`svelte-csf-v5`]},Y={...G.BesideTheTrigger,tags:[`svelte-csf-v5`]},X={...G.CustomTrigger,tags:[`svelte-csf-v5`]}})))()}Z();export{Y as BesideTheTrigger,X as CustomTrigger,q as Filters,J as Placement,K as __namedExportsOrder,P as default};