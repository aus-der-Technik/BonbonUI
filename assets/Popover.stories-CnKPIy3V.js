import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{A as t,Ct as n,Kt as r,Nn as i,Pt as a,St as o,Yt as s,en as c,hn as l,jn as u,l as d,mn as f,nn as p,rt as m,xt as h}from"./iframe-CjPY-Fqe.js";import{i as g,n as _,r as v,t as y}from"./create-runtime-stories-tZqyKHa4.js";import{n as b,t as x}from"./Button-CrEFh_Av.js";import{n as S,t as C}from"./SegmentedControl-CyLRM1LX.js";import{n as w,t as T}from"./Popover-1pqPhkIC.js";import{n as E,t as D}from"./Stack-BmjVbqUs.js";import{n as O,t as k}from"./Row-FH_DsT13.js";import{n as A,t as j}from"./Switch-aKafePoA.js";function M(e,n){l(n,!0);let i=p(`board`),d=p(!1),g=p(!0);var _=F(),v=r(_);P(v,{name:`Filters`,asChild:!0,children:(e,t)=>{T(e,{label:`View options`,icon:`filter`,title:`View options`,width:`18rem`,children:(e,t=u)=>{D(e,{gap:`md`,children:(e,n)=>{var o=F(),l=r(o);C(l,{label:`Layout`,options:[{value:`board`,label:`Board`},{value:`list`,label:`List`}],get value(){return a(i)},set value(e){c(i,e,!0)}});var u=s(l,2);j(u,{label:`Compact cards`,get checked(){return a(d)},set checked(e){c(d,e,!0)}});var f=s(u,2);j(f,{label:`Show done`,get checked(){return a(g)},set checked(e){c(g,e,!0)}});var p=s(f,2);k(p,{justify:`end`,children:(e,n)=>{x(e,{variant:`primary`,size:`sm`,label:`Done`,get onclick(){return t()}})},$$slots:{default:!0}}),h(e,o)},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A filter panel behind a button; it grows out of its trigger (origin at the trigger's centre)
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
</Popover>`}}});var y=s(v,2);P(y,{name:`Placement`,asChild:!0,children:(e,t)=>{k(e,{justify:`end`,padding:`2xl`,children:(e,t)=>{T(e,{label:`Share`,icon:`share`,iconOnly:!0,variant:`glass`,placement:`top-end`,title:`Share`,children:(e,t)=>{var n=I();h(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`An icon-only glass trigger that opens upwards and aligns to its right edge.`}},__svelteCsf:{rawCode:`<Row justify="end" padding="2xl">
  <Popover label="Share" icon="share" iconOnly variant="glass" placement="top-end" title="Share">
    <p style="margin:0;max-width:16rem;color:var(--text-2)">
      Anyone with the link can view this board. Invite people to let them edit.
    </p>
  </Popover>
</Row>`}}});var b=s(y,2);P(b,{name:`Beside the trigger`,asChild:!0,children:(e,t)=>{k(e,{justify:`between`,padding:`2xl`,align:`start`,children:(e,t)=>{var n=H(),i=r(n);D(i,{gap:`sm`,children:(e,t)=>{var n=z(),i=r(n);T(i,{label:`Slide options`,icon:`layout`,iconOnly:!0,placement:`right-start`,title:`Layout`,children:(e,t)=>{var n=L();h(e,n)},$$slots:{default:!0}});var a=s(i,2);T(a,{label:`Centred beside`,icon:`more`,iconOnly:!0,placement:`right`,title:`Beside`,children:(e,t)=>{var n=R();h(e,n)},$$slots:{default:!0}}),h(e,n)},$$slots:{default:!0}});var a=s(i,2);T(a,{label:`Over the trigger`,placement:`center`,title:`Rename`,children:(e,t)=>{var n=B();h(e,n)},$$slots:{default:!0}});var o=s(a,2);T(o,{label:`Details`,icon:`info`,iconOnly:!0,placement:`left-start`,title:`Details`,children:(e,t)=>{var n=V();h(e,n)},$$slots:{default:!0}}),h(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"Beside the trigger: from a vertical rail or a sidebar a popover opens sideways, lined up with\n    the trigger's top (`right-start`) or centred on it (`right`). It grows out of the edge facing\n    the trigger, level with it, and flips to the other side when the room runs out. `center`\n    lays the panel over the trigger."}},__svelteCsf:{rawCode:`<Row justify="between" padding="2xl" align="start">
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
</Row>`}}});var S=s(b,2);P(S,{name:`Custom trigger`,asChild:!0,children:(e,n)=>{T(e,{label:`Status`,padding:`sm`,trigger:(e,n=u)=>{var r=U();t(r,()=>({type:`button`,...n(),style:`font:inherit;font-weight:600;color:var(--text);padding:.35rem .8rem;border:.75px solid var(--pill-border);border-radius:var(--radius-pill);background:var(--pill-tint);box-shadow:var(--shadow-frosted);cursor:pointer`})),h(e,r)},children:(e,t=u)=>{D(e,{gap:`xs`,children:(e,n)=>{var i=o(),a=r(i);m(a,16,()=>[`On track`,`At risk`,`Off track`],e=>e,(e,n)=>{x(e,{variant:`ghost`,size:`sm`,get label(){return n},get onclick(){return t()}})}),h(e,i)},$$slots:{default:!0}})},$$slots:{trigger:!0,default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Your own trigger: spread the props the snippet receives onto it.`}},__svelteCsf:{rawCode:`<Popover label="Status" padding="sm">
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
</Popover>`}}}),h(e,_),f()}var N,P,F,I,L,R,z,B,V,H,U,W,G,K,q,J,Y;function X(){return(X=e((()=>{i(),g(),w(),S(),b(),A(),O(),E(),d(),_(),N={title:`Molecules/Popover`,component:T,tags:[`autodocs`],argTypes:{placement:{control:`select`,options:[`bottom-start`,`bottom`,`bottom-end`,`top-start`,`top`,`top-end`,`right-start`,`right`,`right-end`,`left-start`,`left`,`left-end`,`center`]},variant:{control:`select`,options:[`primary`,`secondary`,`glass`,`ghost`]}}},{Story:P}=v(N),F=n(`<!> <!> <!> <!>`,1),I=n(`<p style="margin:0;max-width:16rem;color:var(--text-2)">Anyone with the link can view this board. Invite people to let them edit.</p>`),L=n(`<p style="margin:0;max-width:14rem;color:var(--text-2)">Opens to the right of a rail, aligned with its trigger.</p>`),R=n(`<p style="margin:0;max-width:14rem;color:var(--text-2)">Centred on the trigger.</p>`),z=n(`<!> <!>`,1),B=n(`<p style="margin:0;max-width:14rem;color:var(--text-2)">Laid over its trigger.</p>`),V=n(`<p style="margin:0;max-width:14rem;color:var(--text-2)">Opens to the left — at the right edge of the screen this is where the room is.</p>`),H=n(`<!> <!> <!>`,1),U=n(`<button><span style="color:var(--ok)">●</span> On track ▾</button>`),M.__docgen={data:[],name:`Popover.stories.svelte`},W=y(M,N),G=[`Filters`,`Placement`,`BesideTheTrigger`,`CustomTrigger`],K={...W.Filters,tags:[`svelte-csf-v5`]},q={...W.Placement,tags:[`svelte-csf-v5`]},J={...W.BesideTheTrigger,tags:[`svelte-csf-v5`]},Y={...W.CustomTrigger,tags:[`svelte-csf-v5`]}})))()}X();export{J as BesideTheTrigger,Y as CustomTrigger,K as Filters,q as Placement,G as __namedExportsOrder,N as default};