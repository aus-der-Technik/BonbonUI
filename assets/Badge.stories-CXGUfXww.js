import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Mt as t,St as n,Wt as r,bt as i,fn as a,jn as o,l as s,m as c,pn as l,qt as u,rt as d,xt as f}from"./iframe-Dd9zCUtD.js";import{a as p,i as m,n as h,r as g,t as _}from"./create-runtime-stories-Bj9BSqmd.js";import{i as v,n as y}from"./palette-DNwFBI2z.js";import{n as b,t as x}from"./Badge-JqdQHU5B.js";import{n as S,t as C}from"./Stack-B3I2k7mw.js";import{n as w,t as T}from"./Row--NLDOgtN.js";function E(e,n){l(n,!1),c();var o=M(),s=r(o);O(s,{name:`Playground`,parameters:{docs:{description:{story:`Calm candy: soft badges are a light tint with readable ink; solid ones get the same lit top
edge as buttons and a short shadow, but no glow — badges inform, they do not ask for clicks.`}},__svelteCsf:{rawCode:`<Badge {...args} />`}}});var p=u(s,2);O(p,{name:`Status tones`,asChild:!0,children:(e,t)=>{T(e,{children:(e,t)=>{var n=k(),a=r(n);x(a,{tone:`live`,label:`Editable`});var o=u(a,2);x(o,{tone:`ok`,icon:`check`,label:`Paid`});var s=u(o,2);x(s,{tone:`locked`,icon:`lock`,label:`Read-only`});var c=u(s,2);x(c,{tone:`draft`,label:`Draft`});var l=u(c,2);x(l,{tone:`danger`,label:`Failed`});var d=u(l,2);x(d,{tone:`info`,label:`Beta`});var f=u(d,2);x(f,{tone:`accent`,label:`New`}),i(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Status tones: fixed hues, independent of the tint, so "Failed" is always red.`}},__svelteCsf:{rawCode:`<Row>
  <Badge tone="live" label="Editable" />
  <Badge tone="ok" icon="check" label="Paid" />
  <Badge tone="locked" icon="lock" label="Read-only" />
  <Badge tone="draft" label="Draft" />
  <Badge tone="danger" label="Failed" />
  <Badge tone="info" label="Beta" />
  <Badge tone="accent" label="New" />
</Row>`}}});var m=u(p,2);O(m,{name:`Palette`,asChild:!0,children:(e,n)=>{C(e,{gap:`sm`,children:(e,n)=>{var a=A(),o=r(a);T(o,{children:(e,n)=>{var a=f(),o=r(a);d(o,1,()=>v,e=>e,(e,n)=>{x(e,{get tone(){return t(n)},get label(){return t(n)}})}),i(e,a)},$$slots:{default:!0}});var s=u(o,2);T(s,{children:(e,n)=>{var a=f(),o=r(a);d(o,1,()=>v,e=>e,(e,n)=>{x(e,{get tone(){return t(n)},variant:`solid`,get label(){return t(n)}})}),i(e,a)},$$slots:{default:!0}}),i(e,a)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"The candy palette for categories. `soft` by default, `solid` for more weight. Yellow and\norange get a darker ink than the other hues, because their usual mix is too pale for small\ntext."}},__svelteCsf:{rawCode:`<Stack gap="sm">
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
</Stack>`}}});var h=u(m,2);O(h,{name:`Sizes`,asChild:!0,children:(e,t)=>{T(e,{children:(e,t)=>{var n=j(),a=r(n);x(a,{size:`sm`,label:`v1.4.2`});var o=u(a,2);x(o,{tone:`accent`,variant:`solid`,label:`Pro`});var s=u(o,2);x(s,{tone:`accent`,variant:`solid`,size:`lg`,icon:`sparkles`,label:`Featured`}),i(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"`sm` is the inline meta tag next to a label; `lg` a headline badge."}},__svelteCsf:{rawCode:`<Row>
  <Badge size="sm" label="v1.4.2" />
  <Badge tone="accent" variant="solid" label="Pro" />
  <Badge tone="accent" variant="solid" size="lg" icon="sparkles" label="Featured" />
</Row>`}}});var g=u(h,2);O(g,{name:`Shape`,asChild:!0,children:(e,t)=>{T(e,{children:(e,t)=>{var n=A(),a=r(n);x(a,{tone:`ok`,label:`Rounded (default)`});var o=u(a,2);x(o,{tone:`ok`,shape:`pill`,label:`Pill`}),i(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:'A badge states something, so it is a rounded tag; pills are for things you press. `shape="pill"`\nopts back in where a pill is wanted anyway.'}},__svelteCsf:{rawCode:`<Row>
  <Badge tone="ok" label="Rounded (default)" />
  <Badge tone="ok" shape="pill" label="Pill" />
</Row>`}}}),i(e,o),a()}var D,O,k,A,j,M,N,P,F,I,L,R,z;function B(){return(B=e((()=>{o(),p(),m(),w(),S(),b(),y(),s(),h(),D={title:`Atoms/Badge`,component:x,tags:[`autodocs`],args:{label:`Online`,tone:`live`,size:`md`,variant:`soft`},argTypes:{tone:{control:`select`,options:[`neutral`,`live`,`ok`,`locked`,`draft`,`warn`,`danger`,`info`,`accent`,...v]},variant:{control:`inline-radio`,options:[`soft`,`solid`]},size:{control:`inline-radio`,options:[`sm`,`md`,`lg`]},shape:{control:`inline-radio`,options:[`rounded`,`pill`]}}},{Story:O}=g(D),k=n(`<!> <!> <!> <!> <!> <!> <!>`,1),A=n(`<!> <!>`,1),j=n(`<!> <!> <!>`,1),M=n(`<!> <!> <!> <!> <!>`,1),E.__docgen={data:[],name:`Badge.stories.svelte`},N=_(E,D),P=[`Playground`,`StatusTones`,`Palette`,`Sizes`,`Shape`],F={...N.Playground,tags:[`svelte-csf-v5`]},I={...N.StatusTones,tags:[`svelte-csf-v5`]},L={...N.Palette,tags:[`svelte-csf-v5`]},R={...N.Sizes,tags:[`svelte-csf-v5`]},z={...N.Shape,tags:[`svelte-csf-v5`]}})))()}B();export{L as Palette,F as Playground,z as Shape,R as Sizes,I as StatusTones,P as __namedExportsOrder,D as default};