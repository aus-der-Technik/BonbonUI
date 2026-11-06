import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Cn as t,K as n,Mt as r,Qt as i,St as a,Ut as o,Wt as s,bt as c,en as l,fn as u,jn as d,l as f,on as p,pn as m,qt as h,rt as g,wn as _}from"./iframe-Dd9zCUtD.js";import{i as v,n as y,r as b,t as x}from"./create-runtime-stories-Bj9BSqmd.js";import{n as S,t as C}from"./Button-CAKf1gbx.js";import{n as w,t as T}from"./DotMatrix-CYNrTZJQ.js";import{r as E,t as D}from"./changed-CMH0GL7Q.js";import{n as O,t as k}from"./Stack-B3I2k7mw.js";import{n as A,t as j}from"./Row--NLDOgtN.js";function M(e,a){m(a,!0);let d=l(15);var f=z(),v=s(f);P(v,{name:`Playground`,parameters:{docs:{description:{story:`A figure drawn in round dots, like an instrument's readout. Change the value: every digit has
the same width, so nothing around it moves.`}},__svelteCsf:{rawCode:`<DotMatrix {...args} />`}}});var y=h(v,2);P(y,{name:`Sizes`,asChild:!0,children:(e,n)=>{k(e,{gap:`md`,children:(e,n)=>{var r=I(),i=s(r);g(i,16,()=>[`sm`,`md`,`lg`,`xl`],e=>e,(e,n)=>{j(e,{align:`baseline`,gap:`sm`,children:(e,r)=>{var i=F(),a=s(i);T(a,{value:`78`,get size(){return n}}),t(),c(e,i)},$$slots:{default:!0}})});var a=h(i,2),l=h(o(a));T(l,{value:`22.6°`,size:`inherit`}),t(),_(a),c(e,r)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"Sizes follow the type scale; `inherit` takes the size of the text around it. Units stay\nordinary text beside the dots."}},__svelteCsf:{rawCode:`<Stack gap="md">
  {#each ['sm', 'md', 'lg', 'xl'] as const as size (size)}
    <Row align="baseline" gap="sm">
      <DotMatrix value="78" {size} /><span>%</span>
    </Row>
  {/each}
  <p>Air now <DotMatrix value="22.6°" size="inherit" /> and rising.</p>
</Stack>`}}});var b=h(y,2);P(b,{name:`Unlit dots`,asChild:!0,children:(e,t)=>{j(e,{gap:`xl`,children:(e,t)=>{var n=L(),r=s(n);T(r,{value:`00:15`,size:`xl`,unlit:!0});var i=h(r,2);T(i,{value:`9/11`,size:`xl`,unlit:!0}),c(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"`unlit` also draws the dark dots, faintly — a display that is switched on."}},__svelteCsf:{rawCode:`<Row gap="xl">
  <DotMatrix value="00:15" size="xl" unlit />
  <DotMatrix value="9/11" size="xl" unlit />
</Row>`}}});var x=h(b,2);P(x,{name:`Ticking`,asChild:!0,children:(e,t)=>{j(e,{align:`center`,gap:`md`,children:(e,t)=>{var a=R(),l=s(a),u=o(l);{let e=p(()=>String(r(d)).padStart(2,`0`));T(u,{get value(){return`00:${r(e)??``}`},get label(){return`${r(d)??``} seconds`},size:`lg`})}_(l),n(l,(e,t)=>D?.(e,t),()=>r(d));var f=h(l,2);C(f,{variant:`soft`,icon:`minus`,label:`Less`,iconOnly:!0,onclick:()=>i(d,Math.max(0,r(d)-1),!0)});var m=h(f,2);C(m,{variant:`soft`,icon:`plus`,label:`More`,iconOnly:!0,onclick:()=>i(d,Math.min(59,r(d)+1),!0)}),c(e,a)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A countdown: the dots tick, the glow says it changed (changeCue on the wrapper).`}},__svelteCsf:{rawCode:`<Row align="center" gap="md">
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
</Row>`}}}),c(e,f),u()}var N,P,F,I,L,R,z,B,V,H,U,W,G;function K(){return(K=e((()=>{d(),v(),A(),O(),S(),w(),E(),f(),y(),N={title:`Atoms/DotMatrix`,component:T,tags:[`autodocs`],args:{value:`24.5°`,size:`lg`,unlit:!1},argTypes:{size:{control:`inline-radio`,options:[`sm`,`md`,`lg`,`xl`,`inherit`]}}},{Story:P}=b(N),F=a(`<!><span>%</span>`,1),I=a(`<!> <p>Air now <!> and rising.</p>`,1),L=a(`<!> <!>`,1),R=a(`<span style="border-radius: 8px; padding: 4px 8px"><!></span> <!> <!>`,1),z=a(`<!> <!> <!> <!>`,1),M.__docgen={data:[],name:`DotMatrix.stories.svelte`},B=x(M,N),V=[`Playground`,`Sizes`,`UnlitDots`,`Ticking`],H={...B.Playground,tags:[`svelte-csf-v5`]},U={...B.Sizes,tags:[`svelte-csf-v5`]},W={...B.UnlitDots,tags:[`svelte-csf-v5`]},G={...B.Ticking,tags:[`svelte-csf-v5`]}})))()}K();export{H as Playground,U as Sizes,G as Ticking,W as UnlitDots,V as __namedExportsOrder,N as default};