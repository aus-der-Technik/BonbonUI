import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Ct as t,En as n,Gt as r,Kt as i,Nn as a,Pt as o,Yt as s,en as c,hn as l,l as u,mn as d,nn as f,xt as p}from"./iframe-CRBWUEFv.js";import{i as m,n as h,r as g,t as _}from"./create-runtime-stories-DtoOt73Q.js";import{n as v,t as y}from"./Button-CVctU_KR.js";import{n as b,t as x}from"./Input-LtZsVL1B.js";import{n as S,t as C}from"./Row-VZCdMLbk.js";import{n as w,t as T}from"./AppIcon-CHjgV-RC.js";import{n as E,t as D}from"./Switch-Bidiwmra.js";import{n as O,t as k}from"./Inspector-R5F41oVg.js";import{n as A,t as j}from"./InspectorRow-CMmYj95Y.js";import{n as M,t as N}from"./InspectorSection-BB9mHBeG.js";import{n as P,t as F}from"./Tag-D3pcvrIO.js";function I(e,t){l(t,!0);let a=f(`Quarterly report.pdf`),u=f(!1);R(e,{name:`Inspector`,asChild:!0,children:(e,t)=>{var l=H(),d=r(l);k(d,{get title(){return o(a)},subtitle:`PDF document · 2.4 MB`,surface:!0,preview:e=>{T(e,{label:`PDF`,icon:`file-text`,color:`red`,size:`lg`})},actions:e=>{var t=z(),n=i(t);y(n,{icon:`share`,label:`Share`,size:`sm`});var r=s(n);y(r,{icon:`download`,label:`Download`,size:`sm`}),p(e,t)},children:(e,t)=>{var n=V(),r=i(n);N(r,{title:`General`,children:(e,t)=>{var n=B(),r=i(n);j(r,{label:`Name`,for:`insp-name`,children:(e,t)=>{x(e,{id:`insp-name`,size:`sm`,get value(){return o(a)},set value(e){c(a,e,!0)}})},$$slots:{default:!0}});var l=s(r,2);j(l,{label:`Kind`,value:`PDF document`});var u=s(l,2);j(u,{label:`Created`,value:`12 Oct 2026, 09:41`});var d=s(u,2);j(d,{label:`Tags`,children:(e,t)=>{C(e,{gap:`xs`,children:(e,t)=>{var n=z(),r=i(n);F(r,{label:`Work`,color:`blue`});var a=s(r);F(a,{label:`Urgent`,color:`red`}),p(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}}),p(e,n)},$$slots:{default:!0}});var l=s(r,2);N(l,{title:`Sharing & permissions`,collapsible:!0,children:(e,t)=>{var n=V(),r=i(n);j(r,{label:`Locked`,hint:`Nobody can change it.`,children:(e,t)=>{D(e,{"aria-label":`Locked`,get checked(){return o(u)},set checked(e){c(u,e,!0)}})},$$slots:{default:!0}});var a=s(r,2);j(a,{label:`Owner`,value:`ana@example.com`}),p(e,n)},$$slots:{default:!0}}),p(e,n)},$$slots:{preview:!0,actions:!0,default:!0}}),n(l),p(e,l)},$$slots:{default:!0},parameters:{docs:{description:{story:`Properties of the selected file: a header with a preview, then sections of label + control
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
</div>`}}}),d()}var L,R,z,B,V,H,U,W,G;function K(){return(K=e((()=>{a(),m(),O(),A(),M(),w(),v(),b(),E(),P(),S(),u(),h(),L={title:`Organisms/Desktop & OS/Inspector`,component:k,tags:[`autodocs`]},{Story:R}=g(L),z=t(`<!><!>`,1),B=t(`<!> <!> <!> <!>`,1),V=t(`<!> <!>`,1),H=t(`<div style="max-width:20rem"><!></div>`),I.__docgen={data:[],name:`Inspector.stories.svelte`},U=_(I,L),W=[`Inspector`],G={...U.Inspector,tags:[`svelte-csf-v5`]}})))()}K();export{G as Inspector,W as __namedExportsOrder,L as default};