import{n as e}from"./rolldown-runtime-Dxh6kD9_.js";import{Ct as t,Ft as n,Gt as r,Ht as i,Mn as a,Pt as o,Rt as s,Sn as c,W as l,cn as u,hn as d,jn as f,l as p,on as m,tt as h,xn as g,xt as _,zt as v}from"./iframe-WlNMZtZ0.js";import{i as y,n as b,r as x,t as S}from"./create-runtime-stories-CbHiKinS.js";import{n as C,t as w}from"./Button-DHLILcYm.js";import{n as T,t as E}from"./DotMatrix-3YxaOmho.js";import{r as D,t as O}from"./changed-FtIvqccv.js";import{n as k,t as A}from"./Stack-BjV-rmuj.js";import{n as j,t as M}from"./Row-IIXhUlbK.js";function N(e,t){c(t,!0);let n=u(15);var o=B(),p=v(o);F(p,{name:`Playground`,parameters:{docs:{description:{story:`A figure drawn in round dots, like an instrument's readout. Change the value: every digit has
the same width, so nothing around it moves.`}},__svelteCsf:{rawCode:`<DotMatrix {...args} />`}}});var y=i(p,2);F(y,{name:`Sizes`,asChild:!0,children:(e,t)=>{A(e,{gap:`md`,children:(e,t)=>{var n=L(),r=v(n);h(r,16,()=>[`sm`,`md`,`lg`,`xl`],e=>e,(e,t)=>{M(e,{align:`baseline`,gap:`sm`,children:(e,n)=>{var r=I(),i=v(r);E(i,{value:`78`,get size(){return t}}),f(),_(e,r)},$$slots:{default:!0}})});var o=i(r,2),c=i(s(o));E(c,{value:`22.6°`,size:`inherit`}),f(),a(o),_(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"Sizes follow the type scale; `inherit` takes the size of the text around it. Units stay\nordinary text beside the dots."}},__svelteCsf:{rawCode:`<Stack gap="md">
  {#each ['sm', 'md', 'lg', 'xl'] as const as size (size)}
    <Row align="baseline" gap="sm">
      <DotMatrix value="78" {size} /><span>%</span>
    </Row>
  {/each}
  <p>Air now <DotMatrix value="22.6°" size="inherit" /> and rising.</p>
</Stack>`}}});var b=i(y,2);F(b,{name:`Unlit dots`,asChild:!0,children:(e,t)=>{M(e,{gap:`xl`,children:(e,t)=>{var n=R(),r=v(n);E(r,{value:`00:15`,size:`xl`,unlit:!0});var a=i(r,2);E(a,{value:`9/11`,size:`xl`,unlit:!0}),_(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"`unlit` also draws the dark dots, faintly — a display that is switched on."}},__svelteCsf:{rawCode:`<Row gap="xl">
  <DotMatrix value="00:15" size="xl" unlit />
  <DotMatrix value="9/11" size="xl" unlit />
</Row>`}}});var x=i(b,2);F(x,{name:`Ticking`,asChild:!0,children:(e,t)=>{M(e,{align:`center`,gap:`md`,children:(e,t)=>{var o=z(),c=v(o),u=s(c);{let e=d(()=>String(r(n)).padStart(2,`0`));E(u,{get value(){return`00:${r(e)??``}`},get label(){return`${r(n)??``} seconds`},size:`lg`})}a(c),l(c,(e,t)=>O?.(e,t),()=>r(n));var f=i(c,2);w(f,{variant:`soft`,icon:`minus`,label:`Less`,iconOnly:!0,onclick:()=>m(n,Math.max(0,r(n)-1),!0)});var p=i(f,2);w(p,{variant:`soft`,icon:`plus`,label:`More`,iconOnly:!0,onclick:()=>m(n,Math.min(59,r(n)+1),!0)}),_(e,o)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A countdown: the dots tick, the glow says it changed (changeCue on the wrapper).`}},__svelteCsf:{rawCode:`<Row align="center" gap="md">
  <span use:changeCue={seconds} style="border-radius: 8px; padding: 4px 8px">
    <DotMatrix
      value="00:{String(seconds).padStart(2, '0')}"
      label="{seconds} seconds"
      size="lg"
    />
  </span>
  <Button
    variant="soft"
    icon="minus"
    label="Less"
    iconOnly
    onclick={() => (seconds = Math.max(0, seconds - 1))}
  />
  <Button
    variant="soft"
    icon="plus"
    label="More"
    iconOnly
    onclick={() => (seconds = Math.min(59, seconds + 1))}
  />
</Row>`}}}),_(e,o),g()}var P,F,I,L,R,z,B,V,H,U,W,G,K;function q(){return(q=e((()=>{n(),o(),y(),j(),k(),C(),T(),D(),p(),b(),P={title:`Atoms/DotMatrix`,component:E,tags:[`autodocs`],args:{value:`24.5°`,size:`lg`,unlit:!1},argTypes:{size:{control:`inline-radio`,options:[`sm`,`md`,`lg`,`xl`,`inherit`]}}},{Story:F}=x(P),I=t(`<!><span>%</span>`,1),L=t(`<!> <p>Air now <!> and rising.</p>`,1),R=t(`<!> <!>`,1),z=t(`<span style="border-radius: 8px; padding: 4px 8px"><!></span> <!> <!>`,1),B=t(`<!> <!> <!> <!>`,1),N.__docgen={data:[],name:`DotMatrix.stories.svelte`},V=S(N,P),H=[`Playground`,`Sizes`,`UnlitDots`,`Ticking`],U={...V.Playground,tags:[`svelte-csf-v5`]},W={...V.Sizes,tags:[`svelte-csf-v5`]},G={...V.UnlitDots,tags:[`svelte-csf-v5`]},K={...V.Ticking,tags:[`svelte-csf-v5`]}})))()}q();export{U as Playground,W as Sizes,K as Ticking,G as UnlitDots,H as __namedExportsOrder,P as default};