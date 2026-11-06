import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{A as t,Mt as n,Qt as r,St as i,Wt as a,bt as o,en as s,fn as c,jn as l,kn as u,l as d,pn as f,qt as p,rt as m,xt as h}from"./iframe-CWg4yaha.js";import{i as g,n as _,r as v,t as y}from"./create-runtime-stories-DQq0d2lF.js";import{n as b,t as x}from"./Button-D4mD58qs.js";import{n as S,t as C}from"./SegmentedControl-BrWtOo4l.js";import{n as w,t as T}from"./Popover-CnlDYfs6.js";import{n as E,t as D}from"./Stack-vorXuMUJ.js";import{n as O,t as k}from"./Row-CYSAvGKl.js";import{n as A,t as j}from"./Switch-CMUcJM1E.js";function M(e,i){f(i,!0);let l=s(`board`),d=s(!1),g=s(!0);var _=F(),v=a(_);P(v,{name:`Filters`,asChild:!0,children:(e,t)=>{T(e,{label:`View options`,icon:`filter`,title:`View options`,width:`18rem`,children:(e,t=u)=>{D(e,{gap:`md`,children:(e,i)=>{var s=F(),c=a(s);C(c,{label:`Layout`,options:[{value:`board`,label:`Board`},{value:`list`,label:`List`}],get value(){return n(l)},set value(e){r(l,e,!0)}});var u=p(c,2);j(u,{label:`Compact cards`,get checked(){return n(d)},set checked(e){r(d,e,!0)}});var f=p(u,2);j(f,{label:`Show done`,get checked(){return n(g)},set checked(e){r(g,e,!0)}});var m=p(f,2);k(m,{justify:`end`,children:(e,n)=>{x(e,{variant:`primary`,size:`sm`,label:`Done`,get onclick(){return t()}})},$$slots:{default:!0}}),o(e,s)},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A filter panel behind a button; it grows out of its trigger (origin at the trigger's centre)
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
</Popover>`}}});var y=p(v,2);P(y,{name:`Placement`,asChild:!0,children:(e,t)=>{k(e,{justify:`end`,padding:`2xl`,children:(e,t)=>{T(e,{label:`Share`,icon:`share`,iconOnly:!0,variant:`glass`,placement:`top-end`,title:`Share`,children:(e,t)=>{var n=I();o(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`An icon-only glass trigger that opens upwards and aligns to its right edge.`}},__svelteCsf:{rawCode:`<Row justify="end" padding="2xl">
  <Popover label="Share" icon="share" iconOnly variant="glass" placement="top-end" title="Share">
    <p style="margin:0;max-width:16rem;color:var(--text-2)">
      Anyone with the link can view this board. Invite people to let them edit.
    </p>
  </Popover>
</Row>`}}});var b=p(y,2);P(b,{name:`Beside the trigger`,asChild:!0,children:(e,t)=>{k(e,{justify:`between`,padding:`2xl`,align:`start`,children:(e,t)=>{var n=H(),r=a(n);D(r,{gap:`sm`,children:(e,t)=>{var n=z(),r=a(n);T(r,{label:`Slide options`,icon:`layout`,iconOnly:!0,placement:`right-start`,title:`Layout`,children:(e,t)=>{var n=L();o(e,n)},$$slots:{default:!0}});var i=p(r,2);T(i,{label:`Centred beside`,icon:`more`,iconOnly:!0,placement:`right`,title:`Beside`,children:(e,t)=>{var n=R();o(e,n)},$$slots:{default:!0}}),o(e,n)},$$slots:{default:!0}});var i=p(r,2);T(i,{label:`Over the trigger`,placement:`center`,title:`Rename`,children:(e,t)=>{var n=B();o(e,n)},$$slots:{default:!0}});var s=p(i,2);T(s,{label:`Details`,icon:`info`,iconOnly:!0,placement:`left-start`,title:`Details`,children:(e,t)=>{var n=V();o(e,n)},$$slots:{default:!0}}),o(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"Beside the trigger: from a vertical rail or a sidebar a popover opens sideways, lined up with\n    the trigger's top (`right-start`) or centred on it (`right`). It grows out of the edge facing\n    the trigger, level with it, and flips to the other side when the room runs out. `center`\n    lays the panel over the trigger."}},__svelteCsf:{rawCode:`<Row justify="between" padding="2xl" align="start">
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
</Row>`}}});var S=p(b,2);P(S,{name:`Custom trigger`,asChild:!0,children:(e,n)=>{T(e,{label:`Status`,padding:`sm`,trigger:(e,n=u)=>{var r=U();t(r,()=>({type:`button`,...n(),style:`font:inherit;font-weight:600;color:var(--text);padding:.35rem .8rem;border:.75px solid var(--pill-border);border-radius:var(--radius-pill);background:var(--pill-tint);box-shadow:var(--shadow-frosted);cursor:pointer`})),o(e,r)},children:(e,t=u)=>{D(e,{gap:`xs`,children:(e,n)=>{var r=h(),i=a(r);m(i,16,()=>[`On track`,`At risk`,`Off track`],e=>e,(e,n)=>{x(e,{variant:`ghost`,size:`sm`,get label(){return n},get onclick(){return t()}})}),o(e,r)},$$slots:{default:!0}})},$$slots:{trigger:!0,default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Your own trigger: spread the props the snippet receives onto it.`}},__svelteCsf:{rawCode:`<Popover label="Status" padding="sm">
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
</Popover>`}}}),o(e,_),c()}var N,P,F,I,L,R,z,B,V,H,U,W,G,K,q,J,Y;function X(){return(X=e((()=>{l(),g(),w(),S(),b(),A(),O(),E(),d(),_(),N={title:`Molecules/Popover`,component:T,tags:[`autodocs`],argTypes:{placement:{control:`select`,options:[`bottom-start`,`bottom`,`bottom-end`,`top-start`,`top`,`top-end`,`right-start`,`right`,`right-end`,`left-start`,`left`,`left-end`,`center`]},variant:{control:`select`,options:[`primary`,`secondary`,`glass`,`ghost`]}}},{Story:P}=v(N),F=i(`<!> <!> <!> <!>`,1),I=i(`<p style="margin:0;max-width:16rem;color:var(--text-2)">Anyone with the link can view this board. Invite people to let them edit.</p>`),L=i(`<p style="margin:0;max-width:14rem;color:var(--text-2)">Opens to the right of a rail, aligned with its trigger.</p>`),R=i(`<p style="margin:0;max-width:14rem;color:var(--text-2)">Centred on the trigger.</p>`),z=i(`<!> <!>`,1),B=i(`<p style="margin:0;max-width:14rem;color:var(--text-2)">Laid over its trigger.</p>`),V=i(`<p style="margin:0;max-width:14rem;color:var(--text-2)">Opens to the left — at the right edge of the screen this is where the room is.</p>`),H=i(`<!> <!> <!>`,1),U=i(`<button><span style="color:var(--ok)">●</span> On track ▾</button>`),M.__docgen={data:[],name:`Popover.stories.svelte`},W=y(M,N),G=[`Filters`,`Placement`,`BesideTheTrigger`,`CustomTrigger`],K={...W.Filters,tags:[`svelte-csf-v5`]},q={...W.Placement,tags:[`svelte-csf-v5`]},J={...W.BesideTheTrigger,tags:[`svelte-csf-v5`]},Y={...W.CustomTrigger,tags:[`svelte-csf-v5`]}})))()}X();export{J as BesideTheTrigger,Y as CustomTrigger,K as Filters,q as Placement,G as __namedExportsOrder,N as default};