import{n as e}from"./rolldown-runtime-Dxh6kD9_.js";import{Ct as t,Ft as n,Gt as r,Ht as i,Mn as a,Pt as o,Rt as s,Sn as c,cn as l,l as u,on as d,xn as f,xt as p,zt as m}from"./iframe-WlNMZtZ0.js";import{i as h,n as g,r as _,t as v}from"./create-runtime-stories-CbHiKinS.js";import{n as y,t as b}from"./Button-DHLILcYm.js";import{n as x,t as S}from"./Input-DeTI9rlx.js";import{n as C,t as w}from"./Row-IIXhUlbK.js";import{n as T,t as E}from"./AppIcon-B4Xhml6t.js";import{n as D,t as O}from"./Switch-BzNNOsRq.js";import{n as k,t as A}from"./Inspector-BufNtKhG.js";import{n as j,t as M}from"./InspectorRow-Byw5fQPd.js";import{n as N,t as P}from"./InspectorSection-DaUAU-bS.js";import{n as F,t as I}from"./Tag-CMuUFmlG.js";function L(e,t){c(t,!0);let n=l(`Quarterly report.pdf`),o=l(!1);z(e,{name:`Inspector`,asChild:!0,children:(e,t)=>{var c=U(),l=s(c);A(l,{get title(){return r(n)},subtitle:`PDF document · 2.4 MB`,surface:!0,preview:e=>{E(e,{label:`PDF`,icon:`file-text`,color:`red`,size:`lg`})},actions:e=>{var t=B(),n=m(t);b(n,{icon:`share`,label:`Share`,size:`sm`});var r=i(n);b(r,{icon:`download`,label:`Download`,size:`sm`}),p(e,t)},children:(e,t)=>{var a=H(),s=m(a);P(s,{title:`General`,children:(e,t)=>{var a=V(),o=m(a);M(o,{label:`Name`,for:`insp-name`,children:(e,t)=>{S(e,{id:`insp-name`,size:`sm`,get value(){return r(n)},set value(e){d(n,e,!0)}})},$$slots:{default:!0}});var s=i(o,2);M(s,{label:`Kind`,value:`PDF document`});var c=i(s,2);M(c,{label:`Created`,value:`12 Oct 2026, 09:41`});var l=i(c,2);M(l,{label:`Tags`,children:(e,t)=>{w(e,{gap:`xs`,children:(e,t)=>{var n=B(),r=m(n);I(r,{label:`Work`,color:`blue`});var a=i(r);I(a,{label:`Urgent`,color:`red`}),p(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}}),p(e,a)},$$slots:{default:!0}});var c=i(s,2);P(c,{title:`Sharing & permissions`,collapsible:!0,children:(e,t)=>{var n=H(),a=m(n);M(a,{label:`Locked`,hint:`Nobody can change it.`,children:(e,t)=>{O(e,{"aria-label":`Locked`,get checked(){return r(o)},set checked(e){d(o,e,!0)}})},$$slots:{default:!0}});var s=i(a,2);M(s,{label:`Owner`,value:`ana@example.com`}),p(e,n)},$$slots:{default:!0}}),p(e,a)},$$slots:{preview:!0,actions:!0,default:!0}}),a(c),p(e,c)},$$slots:{default:!0},parameters:{docs:{description:{story:`Properties of the selected file: a header with a preview, then sections of label + control
    rows that line up (and stack when the panel is narrow).

    Why right-aligned labels? Label and value meet at one shared edge, so the eye zig-zags
    less and every control starts at the same line — auto layout aligning edges for you. The
    panel itself stays flat inside a window: glass only where something floats.`}},__svelteCsf:{rawCode:`<div style="max-width:20rem">
  <Inspector title={name} subtitle="PDF document · 2.4 MB" surface>
    {#snippet preview()}<AppIcon label="PDF" icon="file-text" color="red" size="lg" />{/snippet}
    {#snippet actions()}<Button icon="share" label="Share" size="sm" /><Button
        icon="download"
        label="Download"
        size="sm"
      />{/snippet}
    <InspectorSection title="General">
      <InspectorRow label="Name" for="insp-name"
        ><Input id="insp-name" bind:value={name} size="sm" /></InspectorRow
      >
      <InspectorRow label="Kind" value="PDF document" />
      <InspectorRow label="Created" value="12 Oct 2026, 09:41" />
      <InspectorRow label="Tags">
        <Row gap="xs"><Tag label="Work" color="blue" /><Tag label="Urgent" color="red" /></Row>
      </InspectorRow>
    </InspectorSection>
    <InspectorSection title="Sharing & permissions" collapsible>
      <InspectorRow label="Locked" hint="Nobody can change it."
        ><Switch bind:checked={locked} aria-label="Locked" /></InspectorRow
      >
      <InspectorRow label="Owner" value="ana@example.com" />
    </InspectorSection>
  </Inspector>
</div>`}}}),f()}var R,z,B,V,H,U,W,G,K;function q(){return(q=e((()=>{n(),o(),h(),k(),j(),N(),T(),y(),x(),D(),F(),C(),u(),g(),R={title:`Organisms/Desktop & OS/Inspector`,component:A,tags:[`autodocs`]},{Story:z}=_(R),B=t(`<!><!>`,1),V=t(`<!> <!> <!> <!>`,1),H=t(`<!> <!>`,1),U=t(`<div style="max-width:20rem"><!></div>`),L.__docgen={data:[],name:`Inspector.stories.svelte`},W=v(L,R),G=[`Inspector`],K={...W.Inspector,tags:[`svelte-csf-v5`]}})))()}q();export{K as Inspector,G as __namedExportsOrder,R as default};