import{n as e}from"./rolldown-runtime-Dxh6kD9_.js";import{Ct as t,Ft as n,Gt as r,Ht as i,Pt as a,Sn as o,St as s,l as c,m as l,tt as u,xn as d,xt as f,zt as p}from"./iframe-WlNMZtZ0.js";import{a as m,i as h,n as g,r as _,t as v}from"./create-runtime-stories-CbHiKinS.js";import{i as y,n as b}from"./palette-BHVCGfZQ.js";import{n as x,t as S}from"./Badge-Dh8o68Ot.js";import{n as C,t as w}from"./Stack-BjV-rmuj.js";import{n as T,t as E}from"./Row-IIXhUlbK.js";function D(e,t){o(t,!1),l();var n=N(),a=p(n);k(a,{name:`Playground`,parameters:{docs:{description:{story:`Calm candy: soft badges are a light tint with readable ink; solid ones get the same lit top
edge as buttons and a short shadow, but no glow — badges inform, they do not ask for clicks.`}},__svelteCsf:{rawCode:`<Badge {...args} />`}}});var c=i(a,2);k(c,{name:`Status tones`,asChild:!0,children:(e,t)=>{E(e,{children:(e,t)=>{var n=A(),r=p(n);S(r,{tone:`live`,label:`Editable`});var a=i(r,2);S(a,{tone:`ok`,icon:`check`,label:`Paid`});var o=i(a,2);S(o,{tone:`locked`,icon:`lock`,label:`Read-only`});var s=i(o,2);S(s,{tone:`draft`,label:`Draft`});var c=i(s,2);S(c,{tone:`danger`,label:`Failed`});var l=i(c,2);S(l,{tone:`info`,label:`Beta`});var u=i(l,2);S(u,{tone:`accent`,label:`New`}),f(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Status tones: fixed hues, independent of the tint, so "Failed" is always red.`}},__svelteCsf:{rawCode:`<Row>
  <Badge tone="live" label="Editable" />
  <Badge tone="ok" icon="check" label="Paid" />
  <Badge tone="locked" icon="lock" label="Read-only" />
  <Badge tone="draft" label="Draft" />
  <Badge tone="danger" label="Failed" />
  <Badge tone="info" label="Beta" />
  <Badge tone="accent" label="New" />
</Row>`}}});var m=i(c,2);k(m,{name:`Palette`,asChild:!0,children:(e,t)=>{w(e,{gap:`sm`,children:(e,t)=>{var n=j(),a=p(n);E(a,{children:(e,t)=>{var n=s(),i=p(n);u(i,1,()=>y,e=>e,(e,t)=>{S(e,{get tone(){return r(t)},get label(){return r(t)}})}),f(e,n)},$$slots:{default:!0}});var o=i(a,2);E(o,{children:(e,t)=>{var n=s(),i=p(n);u(i,1,()=>y,e=>e,(e,t)=>{S(e,{get tone(){return r(t)},variant:`solid`,get label(){return r(t)}})}),f(e,n)},$$slots:{default:!0}}),f(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"The candy palette for categories. `soft` by default, `solid` for more weight. Yellow and\norange get a darker ink than the other hues, because their usual mix is too pale for small\ntext."}},__svelteCsf:{rawCode:`<Stack gap="sm">
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
</Stack>`}}});var h=i(m,2);k(h,{name:`Sizes`,asChild:!0,children:(e,t)=>{E(e,{children:(e,t)=>{var n=M(),r=p(n);S(r,{size:`sm`,label:`v1.4.2`});var a=i(r,2);S(a,{tone:`accent`,variant:`solid`,label:`Pro`});var o=i(a,2);S(o,{tone:`accent`,variant:`solid`,size:`lg`,icon:`sparkles`,label:`Featured`}),f(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"`sm` is the inline meta tag next to a label; `lg` a headline badge."}},__svelteCsf:{rawCode:`<Row>
  <Badge size="sm" label="v1.4.2" />
  <Badge tone="accent" variant="solid" label="Pro" />
  <Badge tone="accent" variant="solid" size="lg" icon="sparkles" label="Featured" />
</Row>`}}});var g=i(h,2);k(g,{name:`Shape`,asChild:!0,children:(e,t)=>{E(e,{children:(e,t)=>{var n=j(),r=p(n);S(r,{tone:`ok`,label:`Rounded (default)`});var a=i(r,2);S(a,{tone:`ok`,shape:`pill`,label:`Pill`}),f(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:'A badge states something, so it is a rounded tag; pills are for things you press. `shape="pill"`\nopts back in where a pill is wanted anyway.'}},__svelteCsf:{rawCode:`<Row>
  <Badge tone="ok" label="Rounded (default)" />
  <Badge tone="ok" shape="pill" label="Pill" />
</Row>`}}}),f(e,n),d()}var O,k,A,j,M,N,P,F,I,L,R,z,B;function V(){return(V=e((()=>{n(),a(),m(),h(),T(),C(),x(),b(),c(),g(),O={title:`Atoms/Badge`,component:S,tags:[`autodocs`],args:{label:`Online`,tone:`live`,size:`md`,variant:`soft`},argTypes:{tone:{control:`select`,options:[`neutral`,`live`,`ok`,`locked`,`draft`,`warn`,`danger`,`info`,`accent`,...y]},variant:{control:`inline-radio`,options:[`soft`,`solid`]},size:{control:`inline-radio`,options:[`sm`,`md`,`lg`]},shape:{control:`inline-radio`,options:[`rounded`,`pill`]}}},{Story:k}=_(O),A=t(`<!> <!> <!> <!> <!> <!> <!>`,1),j=t(`<!> <!>`,1),M=t(`<!> <!> <!>`,1),N=t(`<!> <!> <!> <!> <!>`,1),D.__docgen={data:[],name:`Badge.stories.svelte`},P=v(D,O),F=[`Playground`,`StatusTones`,`Palette`,`Sizes`,`Shape`],I={...P.Playground,tags:[`svelte-csf-v5`]},L={...P.StatusTones,tags:[`svelte-csf-v5`]},R={...P.Palette,tags:[`svelte-csf-v5`]},z={...P.Sizes,tags:[`svelte-csf-v5`]},B={...P.Shape,tags:[`svelte-csf-v5`]}})))()}V();export{R as Palette,I as Playground,B as Shape,z as Sizes,L as StatusTones,F as __namedExportsOrder,O as default};