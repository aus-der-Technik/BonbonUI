import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Cn as t,Ct as n,Ft as r,Gt as i,Ht as a,Pn as o,Pt as s,Rt as c,cn as l,l as u,on as d,wn as f,xt as p,zt as m}from"./iframe-D3QpTFc1.js";import{i as h,n as g,r as _,t as v}from"./create-runtime-stories-bgfxAijx.js";import{n as y,t as b}from"./Button-DO5WmEfH.js";import{n as x,t as S}from"./Input-CpEmBp8q.js";import{n as C,t as w}from"./Row-B0vuEKpz.js";import{n as T,t as E}from"./AppIcon-DBPkKnt5.js";import{n as D,t as O}from"./Switch-BtV4cohu.js";import{n as k,t as A}from"./Inspector-BgMm7ExT.js";import{n as j,t as M}from"./InspectorRow-DAcAoSgS.js";import{n as N,t as P}from"./InspectorSection-C1w1Hpkh.js";import{n as F,t as I}from"./Tag-B3zYRs1i.js";function L(e,n){f(n,!0);let r=l(`Quarterly report.pdf`),s=l(!1);z(e,{name:`Inspector`,asChild:!0,children:(e,t)=>{var n=U(),l=c(n);A(l,{get title(){return i(r)},subtitle:`PDF document · 2.4 MB`,surface:!0,preview:e=>{E(e,{label:`PDF`,icon:`file-text`,color:`red`,size:`lg`})},actions:e=>{var t=B(),n=m(t);b(n,{icon:`share`,label:`Share`,size:`sm`});var r=a(n);b(r,{icon:`download`,label:`Download`,size:`sm`}),p(e,t)},children:(e,t)=>{var n=H(),o=m(n);P(o,{title:`General`,children:(e,t)=>{var n=V(),o=m(n);M(o,{label:`Name`,for:`insp-name`,children:(e,t)=>{S(e,{id:`insp-name`,size:`sm`,get value(){return i(r)},set value(e){d(r,e,!0)}})},$$slots:{default:!0}});var s=a(o,2);M(s,{label:`Kind`,value:`PDF document`});var c=a(s,2);M(c,{label:`Created`,value:`12 Oct 2026, 09:41`});var l=a(c,2);M(l,{label:`Tags`,children:(e,t)=>{w(e,{gap:`xs`,children:(e,t)=>{var n=B(),r=m(n);I(r,{label:`Work`,color:`blue`});var i=a(r);I(i,{label:`Urgent`,color:`red`}),p(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}}),p(e,n)},$$slots:{default:!0}});var c=a(o,2);P(c,{title:`Sharing & permissions`,collapsible:!0,children:(e,t)=>{var n=H(),r=m(n);M(r,{label:`Locked`,hint:`Nobody can change it.`,children:(e,t)=>{O(e,{"aria-label":`Locked`,get checked(){return i(s)},set checked(e){d(s,e,!0)}})},$$slots:{default:!0}});var o=a(r,2);M(o,{label:`Owner`,value:`ana@example.com`}),p(e,n)},$$slots:{default:!0}}),p(e,n)},$$slots:{preview:!0,actions:!0,default:!0}}),o(n),p(e,n)},$$slots:{default:!0},parameters:{docs:{description:{story:`Properties of the selected file: a header with a preview, then sections of label + control
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
</div>`}}}),t()}var R,z,B,V,H,U,W,G,K;function q(){return(q=e((()=>{r(),s(),h(),k(),j(),N(),T(),y(),x(),D(),F(),C(),u(),g(),R={title:`Organisms/Desktop & OS/Inspector`,component:A,tags:[`autodocs`]},{Story:z}=_(R),B=n(`<!><!>`,1),V=n(`<!> <!> <!> <!>`,1),H=n(`<!> <!>`,1),U=n(`<div style="max-width:20rem"><!></div>`),L.__docgen={data:[],name:`Inspector.stories.svelte`},W=v(L,R),G=[`Inspector`],K={...W.Inspector,tags:[`svelte-csf-v5`]}})))()}q();export{K as Inspector,G as __namedExportsOrder,R as default};