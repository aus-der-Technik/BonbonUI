import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Mt as t,Qt as n,St as r,Ut as i,Wt as a,bt as o,en as s,fn as c,jn as l,l as u,pn as d,qt as f,wn as p}from"./iframe-CWg4yaha.js";import{i as m,n as h,r as g,t as _}from"./create-runtime-stories-DQq0d2lF.js";import{n as v,t as y}from"./Button-D4mD58qs.js";import{n as b,t as x}from"./Input-Ddly8GKm.js";import{n as S,t as C}from"./Row-CYSAvGKl.js";import{n as w,t as T}from"./AppIcon-IIqViYAV.js";import{n as E,t as D}from"./Switch-CMUcJM1E.js";import{n as O,t as k}from"./Inspector-DxVFXUgD.js";import{n as A,t as j}from"./InspectorRow-Bw6SOn7B.js";import{n as M,t as N}from"./InspectorSection-CFELLBmQ.js";import{n as P,t as F}from"./Tag-ghfcmN4k.js";function I(e,r){d(r,!0);let l=s(`Quarterly report.pdf`),u=s(!1);R(e,{name:`Inspector`,asChild:!0,children:(e,r)=>{var s=H(),c=i(s);k(c,{get title(){return t(l)},subtitle:`PDF document · 2.4 MB`,surface:!0,preview:e=>{T(e,{label:`PDF`,icon:`file-text`,color:`red`,size:`lg`})},actions:e=>{var t=z(),n=a(t);y(n,{icon:`share`,label:`Share`,size:`sm`});var r=f(n);y(r,{icon:`download`,label:`Download`,size:`sm`}),o(e,t)},children:(e,r)=>{var i=V(),s=a(i);N(s,{title:`General`,children:(e,r)=>{var i=B(),s=a(i);j(s,{label:`Name`,for:`insp-name`,children:(e,r)=>{x(e,{id:`insp-name`,size:`sm`,get value(){return t(l)},set value(e){n(l,e,!0)}})},$$slots:{default:!0}});var c=f(s,2);j(c,{label:`Kind`,value:`PDF document`});var u=f(c,2);j(u,{label:`Created`,value:`12 Oct 2026, 09:41`});var d=f(u,2);j(d,{label:`Tags`,children:(e,t)=>{C(e,{gap:`xs`,children:(e,t)=>{var n=z(),r=a(n);F(r,{label:`Work`,color:`blue`});var i=f(r);F(i,{label:`Urgent`,color:`red`}),o(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}}),o(e,i)},$$slots:{default:!0}});var c=f(s,2);N(c,{title:`Sharing & permissions`,collapsible:!0,children:(e,r)=>{var i=V(),s=a(i);j(s,{label:`Locked`,hint:`Nobody can change it.`,children:(e,r)=>{D(e,{"aria-label":`Locked`,get checked(){return t(u)},set checked(e){n(u,e,!0)}})},$$slots:{default:!0}});var c=f(s,2);j(c,{label:`Owner`,value:`ana@example.com`}),o(e,i)},$$slots:{default:!0}}),o(e,i)},$$slots:{preview:!0,actions:!0,default:!0}}),p(s),o(e,s)},$$slots:{default:!0},parameters:{docs:{description:{story:`Properties of the selected file: a header with a preview, then sections of label + control
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
</div>`}}}),c()}var L,R,z,B,V,H,U,W,G;function K(){return(K=e((()=>{l(),m(),O(),A(),M(),w(),v(),b(),E(),P(),S(),u(),h(),L={title:`Organisms/Desktop & OS/Inspector`,component:k,tags:[`autodocs`]},{Story:R}=g(L),z=r(`<!><!>`,1),B=r(`<!> <!> <!> <!>`,1),V=r(`<!> <!>`,1),H=r(`<div style="max-width:20rem"><!></div>`),I.__docgen={data:[],name:`Inspector.stories.svelte`},U=_(I,L),W=[`Inspector`],G={...U.Inspector,tags:[`svelte-csf-v5`]}})))()}K();export{G as Inspector,W as __namedExportsOrder,L as default};