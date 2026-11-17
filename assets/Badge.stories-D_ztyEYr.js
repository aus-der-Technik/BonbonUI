import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Ct as t,Kt as n,Nn as r,Pt as i,St as a,Yt as o,hn as s,l as c,m as l,mn as u,rt as d,xt as f}from"./iframe-CRBWUEFv.js";import{a as p,i as m,n as h,r as g,t as _}from"./create-runtime-stories-DtoOt73Q.js";import{i as v,n as y}from"./palette-DNwFBI2z.js";import{n as b,t as x}from"./Badge-DjfGPRKM.js";import{n as S,t as C}from"./Stack-DW7rWz1x.js";import{n as w,t as T}from"./Row-VZCdMLbk.js";function E(e,t){s(t,!1),l();var r=M(),c=n(r);O(c,{name:`Playground`,parameters:{docs:{description:{story:`Calm candy: soft badges are a light tint with readable ink; solid ones get the same lit top
edge as buttons and a short shadow, but no glow — badges inform, they do not ask for clicks.`}},__svelteCsf:{rawCode:`<Badge {...args} />`}}});var p=o(c,2);O(p,{name:`Status tones`,asChild:!0,children:(e,t)=>{T(e,{children:(e,t)=>{var r=k(),i=n(r);x(i,{tone:`live`,label:`Editable`});var a=o(i,2);x(a,{tone:`ok`,icon:`check`,label:`Paid`});var s=o(a,2);x(s,{tone:`locked`,icon:`lock`,label:`Read-only`});var c=o(s,2);x(c,{tone:`draft`,label:`Draft`});var l=o(c,2);x(l,{tone:`danger`,label:`Failed`});var u=o(l,2);x(u,{tone:`info`,label:`Beta`});var d=o(u,2);x(d,{tone:`accent`,label:`New`}),f(e,r)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Status tones: fixed hues, independent of the tint, so "Failed" is always red.`}},__svelteCsf:{rawCode:`<Row>
  <Badge tone="live" label="Editable" />
  <Badge tone="ok" icon="check" label="Paid" />
  <Badge tone="locked" icon="lock" label="Read-only" />
  <Badge tone="draft" label="Draft" />
  <Badge tone="danger" label="Failed" />
  <Badge tone="info" label="Beta" />
  <Badge tone="accent" label="New" />
</Row>`}}});var m=o(p,2);O(m,{name:`Palette`,asChild:!0,children:(e,t)=>{C(e,{gap:`sm`,children:(e,t)=>{var r=A(),s=n(r);T(s,{children:(e,t)=>{var r=a(),o=n(r);d(o,1,()=>v,e=>e,(e,t)=>{x(e,{get tone(){return i(t)},get label(){return i(t)}})}),f(e,r)},$$slots:{default:!0}});var c=o(s,2);T(c,{children:(e,t)=>{var r=a(),o=n(r);d(o,1,()=>v,e=>e,(e,t)=>{x(e,{get tone(){return i(t)},variant:`solid`,get label(){return i(t)}})}),f(e,r)},$$slots:{default:!0}}),f(e,r)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"The candy palette for categories. `soft` by default, `solid` for more weight. Yellow and\norange get a darker ink than the other hues, because their usual mix is too pale for small\ntext."}},__svelteCsf:{rawCode:`<Stack gap="sm">
  <Row>
    {#each paletteColors as color (color)}<Badge tone={color} label={color} />{/each}
  </Row>
  <Row>
    {#each paletteColors as color (color)}<Badge
        tone={color}
        variant="solid"
        label={color}
      />{/each}
  </Row>
</Stack>`}}});var h=o(m,2);O(h,{name:`Sizes`,asChild:!0,children:(e,t)=>{T(e,{children:(e,t)=>{var r=j(),i=n(r);x(i,{size:`sm`,label:`v1.4.2`});var a=o(i,2);x(a,{tone:`accent`,variant:`solid`,label:`Pro`});var s=o(a,2);x(s,{tone:`accent`,variant:`solid`,size:`lg`,icon:`sparkles`,label:`Featured`}),f(e,r)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"`sm` is the inline meta tag next to a label; `lg` a headline badge."}},__svelteCsf:{rawCode:`<Row>
  <Badge size="sm" label="v1.4.2" />
  <Badge tone="accent" variant="solid" label="Pro" />
  <Badge tone="accent" variant="solid" size="lg" icon="sparkles" label="Featured" />
</Row>`}}});var g=o(h,2);O(g,{name:`Shape`,asChild:!0,children:(e,t)=>{T(e,{children:(e,t)=>{var r=A(),i=n(r);x(i,{tone:`ok`,label:`Rounded (default)`});var a=o(i,2);x(a,{tone:`ok`,shape:`pill`,label:`Pill`}),f(e,r)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:'A badge states something, so it is a rounded tag; pills are for things you press. `shape="pill"`\nopts back in where a pill is wanted anyway.'}},__svelteCsf:{rawCode:`<Row>
  <Badge tone="ok" label="Rounded (default)" />
  <Badge tone="ok" shape="pill" label="Pill" />
</Row>`}}}),f(e,r),u()}var D,O,k,A,j,M,N,P,F,I,L,R,z;function B(){return(B=e((()=>{r(),p(),m(),w(),S(),b(),y(),c(),h(),D={title:`Atoms/Badge`,component:x,tags:[`autodocs`],args:{label:`Online`,tone:`live`,size:`md`,variant:`soft`},argTypes:{tone:{control:`select`,options:[`neutral`,`live`,`ok`,`locked`,`draft`,`warn`,`danger`,`info`,`accent`,...v]},variant:{control:`inline-radio`,options:[`soft`,`solid`]},size:{control:`inline-radio`,options:[`sm`,`md`,`lg`]},shape:{control:`inline-radio`,options:[`rounded`,`pill`]}}},{Story:O}=g(D),k=t(`<!> <!> <!> <!> <!> <!> <!>`,1),A=t(`<!> <!>`,1),j=t(`<!> <!> <!>`,1),M=t(`<!> <!> <!> <!> <!>`,1),E.__docgen={data:[],name:`Badge.stories.svelte`},N=_(E,D),P=[`Playground`,`StatusTones`,`Palette`,`Sizes`,`Shape`],F={...N.Playground,tags:[`svelte-csf-v5`]},I={...N.StatusTones,tags:[`svelte-csf-v5`]},L={...N.Palette,tags:[`svelte-csf-v5`]},R={...N.Sizes,tags:[`svelte-csf-v5`]},z={...N.Shape,tags:[`svelte-csf-v5`]}})))()}B();export{L as Palette,F as Playground,z as Shape,R as Sizes,I as StatusTones,P as __namedExportsOrder,D as default};