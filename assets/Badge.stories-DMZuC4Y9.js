import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Cn as t,Ct as n,Ft as r,Gt as i,Ht as a,Pt as o,St as s,l as c,m as l,tt as u,wn as d,xt as f,zt as p}from"./iframe-D3QpTFc1.js";import{a as m,i as h,n as g,r as _,t as v}from"./create-runtime-stories-bgfxAijx.js";import{i as y,n as b}from"./palette-DNwFBI2z.js";import{n as x,t as S}from"./Badge-B63yScOp.js";import{n as C,t as w}from"./Stack-DIO0U5nL.js";import{n as T,t as E}from"./Row-B0vuEKpz.js";function D(e,n){d(n,!1),l();var r=N(),o=p(r);k(o,{name:`Playground`,parameters:{docs:{description:{story:`Calm candy: soft badges are a light tint with readable ink; solid ones get the same lit top
edge as buttons and a short shadow, but no glow — badges inform, they do not ask for clicks.`}},__svelteCsf:{rawCode:`<Badge {...args} />`}}});var c=a(o,2);k(c,{name:`Status tones`,asChild:!0,children:(e,t)=>{E(e,{children:(e,t)=>{var n=A(),r=p(n);S(r,{tone:`live`,label:`Editable`});var i=a(r,2);S(i,{tone:`ok`,icon:`check`,label:`Paid`});var o=a(i,2);S(o,{tone:`locked`,icon:`lock`,label:`Read-only`});var s=a(o,2);S(s,{tone:`draft`,label:`Draft`});var c=a(s,2);S(c,{tone:`danger`,label:`Failed`});var l=a(c,2);S(l,{tone:`info`,label:`Beta`});var u=a(l,2);S(u,{tone:`accent`,label:`New`}),f(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Status tones: fixed hues, independent of the tint, so "Failed" is always red.`}},__svelteCsf:{rawCode:`<Row>
  <Badge tone="live" label="Editable" />
  <Badge tone="ok" icon="check" label="Paid" />
  <Badge tone="locked" icon="lock" label="Read-only" />
  <Badge tone="draft" label="Draft" />
  <Badge tone="danger" label="Failed" />
  <Badge tone="info" label="Beta" />
  <Badge tone="accent" label="New" />
</Row>`}}});var m=a(c,2);k(m,{name:`Palette`,asChild:!0,children:(e,t)=>{w(e,{gap:`sm`,children:(e,t)=>{var n=j(),r=p(n);E(r,{children:(e,t)=>{var n=s(),r=p(n);u(r,1,()=>y,e=>e,(e,t)=>{S(e,{get tone(){return i(t)},get label(){return i(t)}})}),f(e,n)},$$slots:{default:!0}});var o=a(r,2);E(o,{children:(e,t)=>{var n=s(),r=p(n);u(r,1,()=>y,e=>e,(e,t)=>{S(e,{get tone(){return i(t)},variant:`solid`,get label(){return i(t)}})}),f(e,n)},$$slots:{default:!0}}),f(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"The candy palette for categories. `soft` by default, `solid` for more weight. Yellow and\norange get a darker ink than the other hues, because their usual mix is too pale for small\ntext."}},__svelteCsf:{rawCode:`<Stack gap="sm">
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
</Stack>`}}});var h=a(m,2);k(h,{name:`Sizes`,asChild:!0,children:(e,t)=>{E(e,{children:(e,t)=>{var n=M(),r=p(n);S(r,{size:`sm`,label:`v1.4.2`});var i=a(r,2);S(i,{tone:`accent`,variant:`solid`,label:`Pro`});var o=a(i,2);S(o,{tone:`accent`,variant:`solid`,size:`lg`,icon:`sparkles`,label:`Featured`}),f(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"`sm` is the inline meta tag next to a label; `lg` a headline badge."}},__svelteCsf:{rawCode:`<Row>
  <Badge size="sm" label="v1.4.2" />
  <Badge tone="accent" variant="solid" label="Pro" />
  <Badge tone="accent" variant="solid" size="lg" icon="sparkles" label="Featured" />
</Row>`}}});var g=a(h,2);k(g,{name:`Shape`,asChild:!0,children:(e,t)=>{E(e,{children:(e,t)=>{var n=j(),r=p(n);S(r,{tone:`ok`,label:`Rounded (default)`});var i=a(r,2);S(i,{tone:`ok`,shape:`pill`,label:`Pill`}),f(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:'A badge states something, so it is a rounded tag; pills are for things you press. `shape="pill"`\nopts back in where a pill is wanted anyway.'}},__svelteCsf:{rawCode:`<Row>
  <Badge tone="ok" label="Rounded (default)" />
  <Badge tone="ok" shape="pill" label="Pill" />
</Row>`}}}),f(e,r),t()}var O,k,A,j,M,N,P,F,I,L,R,z,B;function V(){return(V=e((()=>{r(),o(),m(),h(),T(),C(),x(),b(),c(),g(),O={title:`Atoms/Badge`,component:S,tags:[`autodocs`],args:{label:`Online`,tone:`live`,size:`md`,variant:`soft`},argTypes:{tone:{control:`select`,options:[`neutral`,`live`,`ok`,`locked`,`draft`,`warn`,`danger`,`info`,`accent`,...y]},variant:{control:`inline-radio`,options:[`soft`,`solid`]},size:{control:`inline-radio`,options:[`sm`,`md`,`lg`]},shape:{control:`inline-radio`,options:[`rounded`,`pill`]}}},{Story:k}=_(O),A=n(`<!> <!> <!> <!> <!> <!> <!>`,1),j=n(`<!> <!>`,1),M=n(`<!> <!> <!>`,1),N=n(`<!> <!> <!> <!> <!>`,1),D.__docgen={data:[],name:`Badge.stories.svelte`},P=v(D,O),F=[`Playground`,`StatusTones`,`Palette`,`Sizes`,`Shape`],I={...P.Playground,tags:[`svelte-csf-v5`]},L={...P.StatusTones,tags:[`svelte-csf-v5`]},R={...P.Palette,tags:[`svelte-csf-v5`]},z={...P.Sizes,tags:[`svelte-csf-v5`]},B={...P.Shape,tags:[`svelte-csf-v5`]}})))()}V();export{R as Palette,I as Playground,B as Shape,z as Sizes,L as StatusTones,F as __namedExportsOrder,O as default};