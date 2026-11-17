import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Ct as t,En as n,Gt as r,K as i,Kt as a,Nn as o,Pt as s,Tn as c,Yt as l,cn as u,en as d,hn as f,l as p,mn as m,nn as h,rt as g,xt as _}from"./iframe-CjPY-Fqe.js";import{i as v,n as y,r as b,t as x}from"./create-runtime-stories-tZqyKHa4.js";import{n as S,t as C}from"./Button-CrEFh_Av.js";import{n as w,t as T}from"./DotMatrix-Cuf-PYp9.js";import{r as E,t as D}from"./changed-CMH0GL7Q.js";import{n as O,t as k}from"./Stack-BmjVbqUs.js";import{n as A,t as j}from"./Row-FH_DsT13.js";function M(e,t){f(t,!0);let o=h(15);var p=z(),v=a(p);P(v,{name:`Playground`,parameters:{docs:{description:{story:`A figure drawn in round dots, like an instrument's readout. Change the value: every digit has
the same width, so nothing around it moves.`}},__svelteCsf:{rawCode:`<DotMatrix {...args} />`}}});var y=l(v,2);P(y,{name:`Sizes`,asChild:!0,children:(e,t)=>{k(e,{gap:`md`,children:(e,t)=>{var i=I(),o=a(i);g(o,16,()=>[`sm`,`md`,`lg`,`xl`],e=>e,(e,t)=>{j(e,{align:`baseline`,gap:`sm`,children:(e,n)=>{var r=F(),i=a(r);T(i,{value:`78`,get size(){return t}}),c(),_(e,r)},$$slots:{default:!0}})});var s=l(o,2),u=l(r(s));T(u,{value:`22.6°`,size:`inherit`}),c(),n(s),_(e,i)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"Sizes follow the type scale; `inherit` takes the size of the text around it. Units stay\nordinary text beside the dots."}},__svelteCsf:{rawCode:`<Stack gap="md">
  {#each ['sm', 'md', 'lg', 'xl'] as const as size (size)}
    <Row align="baseline" gap="sm">
      <DotMatrix value="78" {size} /><span>%</span>
    </Row>
  {/each}
  <p>Air now <DotMatrix value="22.6°" size="inherit" /> and rising.</p>
</Stack>`}}});var b=l(y,2);P(b,{name:`Unlit dots`,asChild:!0,children:(e,t)=>{j(e,{gap:`xl`,children:(e,t)=>{var n=L(),r=a(n);T(r,{value:`00:15`,size:`xl`,unlit:!0});var i=l(r,2);T(i,{value:`9/11`,size:`xl`,unlit:!0}),_(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"`unlit` also draws the dark dots, faintly — a display that is switched on."}},__svelteCsf:{rawCode:`<Row gap="xl">
  <DotMatrix value="00:15" size="xl" unlit />
  <DotMatrix value="9/11" size="xl" unlit />
</Row>`}}});var x=l(b,2);P(x,{name:`Ticking`,asChild:!0,children:(e,t)=>{j(e,{align:`center`,gap:`md`,children:(e,t)=>{var c=R(),f=a(c),p=r(f);{let e=u(()=>String(s(o)).padStart(2,`0`));T(p,{get value(){return`00:${s(e)??``}`},get label(){return`${s(o)??``} seconds`},size:`lg`})}n(f),i(f,(e,t)=>D?.(e,t),()=>s(o));var m=l(f,2);C(m,{variant:`soft`,icon:`minus`,label:`Less`,iconOnly:!0,onclick:()=>d(o,Math.max(0,s(o)-1),!0)});var h=l(m,2);C(h,{variant:`soft`,icon:`plus`,label:`More`,iconOnly:!0,onclick:()=>d(o,Math.min(59,s(o)+1),!0)}),_(e,c)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A countdown: the dots tick, the glow says it changed (changeCue on the wrapper).`}},__svelteCsf:{rawCode:`<Row align="center" gap="md">
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
</Row>`}}}),_(e,p),m()}var N,P,F,I,L,R,z,B,V,H,U,W,G;function K(){return(K=e((()=>{o(),v(),A(),O(),S(),w(),E(),p(),y(),N={title:`Atoms/DotMatrix`,component:T,tags:[`autodocs`],args:{value:`24.5°`,size:`lg`,unlit:!1},argTypes:{size:{control:`inline-radio`,options:[`sm`,`md`,`lg`,`xl`,`inherit`]}}},{Story:P}=b(N),F=t(`<!><span>%</span>`,1),I=t(`<!> <p>Air now <!> and rising.</p>`,1),L=t(`<!> <!>`,1),R=t(`<span style="border-radius: 8px; padding: 4px 8px"><!></span> <!> <!>`,1),z=t(`<!> <!> <!> <!>`,1),M.__docgen={data:[],name:`DotMatrix.stories.svelte`},B=x(M,N),V=[`Playground`,`Sizes`,`UnlitDots`,`Ticking`],H={...B.Playground,tags:[`svelte-csf-v5`]},U={...B.Sizes,tags:[`svelte-csf-v5`]},W={...B.UnlitDots,tags:[`svelte-csf-v5`]},G={...B.Ticking,tags:[`svelte-csf-v5`]}})))()}K();export{H as Playground,U as Sizes,G as Ticking,W as UnlitDots,V as __namedExportsOrder,N as default};