import{n as e}from"./rolldown-runtime-Dxh6kD9_.js";import{Ct as t,Dt as n,Ft as r,Gt as i,Ht as a,Mn as o,On as s,Pt as c,Rt as ee,Sn as te,jn as ne,l,m as re,p as ie,pn as u,wt as d,xn as ae,xt as f,zt as p}from"./iframe-WlNMZtZ0.js";import{a as m,i as h,n as g,r as _,t as v}from"./create-runtime-stories-CbHiKinS.js";import{n as y,t as oe}from"./Application-gndBgxdC.js";import{n as b,t as x}from"./Button-DHLILcYm.js";import{n as se,t as S}from"./Stack-BjV-rmuj.js";import{n as ce,t as C}from"./NavBar-BrkVKDwA.js";import{S as le,c as ue,d as w,f as de,g as fe,h as pe,o as me,s as T,u as he,x as E}from"./mock-shop-HOkEgzgf.js";import{i as ge,n as _e,r as D,t as ve}from"./SiteFooter-DGX-pXWZ.js";import{n as ye,t as be}from"./NewsletterSignup-C8AwvPtU.js";import{n as xe,t as O}from"./CallToAction-BD-rPklQ.js";import{n as Se,t as Ce}from"./Faq-Bua-HMYl.js";import{i as we,n as k,r as A,t as Te}from"./PricingTable-Bm450pA0.js";function j(e,t){te(t,!1),re();var r=B(),c=p(r);F(c,{name:`Hero`,template:(e,t=s)=>{{let r=u(()=>pe(`hero-desk`,1200,900));D(e,ie(t,{get image(){return i(r)},get actions(){return N},children:(e,t)=>{ne();var r=n(`Free for individuals · No card needed`);f(e,r)},$$slots:{default:!0}}))}},$$slots:{template:!0},parameters:{docs:{description:{story:`Text and image side by side; the image moves under the text below 820px. On load the copy
    rises in line by line and the image settles after it; a linked eyebrow catches a sugar-glass
    sheen on hover.`}},__svelteCsf:{rawCode:`<Hero {...args} image={photo('hero-desk', 1200, 900)} actions={heroActions}>
  Free for individuals · No card needed
</Hero>`}}});var l=a(c,2);F(l,{name:`Hero with backdrop`,asChild:!0,children:(e,t)=>{D(e,{backdrop:!0,eyebrow:`Spring launch`,eyebrowHref:`#launch`,title:`Everything your team needs, nothing it doesn’t`,highlight:`nothing it doesn’t`,text:`Projects, docs and chat in one place, with the noise taken out.`,get actions(){return N}})},$$slots:{default:!0},parameters:{docs:{description:{story:"Centred, without media, on its own drifting tint mesh (`backdrop`)."}},__svelteCsf:{rawCode:`<Hero
  backdrop
  eyebrow="Spring launch"
  eyebrowHref="#launch"
  title="Everything your team needs, nothing it doesn’t"
  highlight="nothing it doesn’t"
  text="Projects, docs and chat in one place, with the noise taken out."
  actions={heroActions}
/>`}}});var d=a(l,2);F(d,{name:`NavBar`,asChild:!0,children:(e,t)=>{S(e,{gap:`xl`,children:(e,t)=>{var n=R(),r=p(n);C(r,{brand:`Example Planner`,get logo(){return M},get links(){return E},actions:e=>{var t=L(),n=p(t);x(n,{variant:`ghost`,shape:`pill`,label:`Sign in`,collapse:!0,icon:`sign-in`});var r=a(n,2);x(r,{variant:`primary`,shape:`pill`,label:`Get started`}),f(e,t)},menu:e=>{x(e,{variant:`secondary`,shape:`pill`,size:`lg`,label:`Sign in`})},$$slots:{actions:!0,menu:!0}});var i=a(r,2),s=ee(i);C(s,{brand:`Example Planner`,get logo(){return M},get links(){return E},actions:e=>{x(e,{variant:`primary`,shape:`pill`,label:`Get started`})},$$slots:{actions:!0}}),o(i),f(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Links fold into a menu button + sheet when the bar is narrower than 720px (resize). The bar
    is front-layer liquid glass and catches a one-shot sheen when the pointer arrives.`}},__svelteCsf:{rawCode:`<Stack gap="xl">
  <NavBar brand="Example Planner" {logo} links={siteLinks}>
    {#snippet actions()}
      <Button variant="ghost" shape="pill" label="Sign in" collapse icon="sign-in" />
      <Button variant="primary" shape="pill" label="Get started" />
    {/snippet}
    {#snippet menu()}
      <Button variant="secondary" shape="pill" size="lg" label="Sign in" />
    {/snippet}
  </NavBar>
  <div style="max-width:24rem">
    <NavBar brand="Example Planner" {logo} links={siteLinks}>
      {#snippet actions()}
        <Button variant="primary" shape="pill" label="Get started" />
      {/snippet}
    </NavBar>
  </div>
</Stack>`}}});var m=a(d,2);F(m,{name:`FeatureGrid`,asChild:!0,children:(e,t)=>{A(e,{eyebrow:`Features`,title:`Everything in one place`,description:`Built for the way small teams actually work.`,get features(){return T}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Features cycle through the candy palette unless one names its colour.`}},__svelteCsf:{rawCode:`<FeatureGrid
  eyebrow="Features"
  title="Everything in one place"
  description="Built for the way small teams actually work."
  {features}
/>`}}});var h=a(m,2);F(h,{name:`FeatureGrid solid icons on the ground`,asChild:!0,children:(e,t)=>{{let t=u(()=>T.slice(0,4));A(e,{get features(){return i(t)},level:`ground`,iconStyle:`solid`,columns:4})}},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<FeatureGrid features={features.slice(0, 4)} level="ground" iconStyle="solid" columns={4} />`}}});var g=a(h,2);F(g,{name:`PricingTable`,asChild:!0,children:(e,t)=>{Te(e,{eyebrow:`Pricing`,title:`Simple, fair pricing`,description:`Start free. Upgrade when your team grows.`,get plans(){return fe},onselect:()=>w()})},$$slots:{default:!0},parameters:{docs:{description:{story:`Monthly / yearly switch; the badge shows the best saving across the plans. It stays muted
    while monthly is chosen and lights up in the tint, with a small pop, once yearly is.`}},__svelteCsf:{rawCode:`<PricingTable
  eyebrow="Pricing"
  title="Simple, fair pricing"
  description="Start free. Upgrade when your team grows."
  {plans}
  onselect={() => later()}
/>`}}});var _=a(g,2);F(_,{name:`Faq`,asChild:!0,children:(e,t)=>{Ce(e,{title:`Questions & answers`,get items(){return me},open:[0]})},$$slots:{default:!0},parameters:{docs:{description:{story:"One answer open at a time; `multiple` lets several stay open. Arrow keys move."}},__svelteCsf:{rawCode:`<Faq title="Questions & answers" items={faqs} open={[0]} />`}}});var v=a(_,2);F(v,{name:`CallToAction`,asChild:!0,children:(e,t)=>{S(e,{gap:`xl`,children:(e,t)=>{var n=z(),r=p(n);O(r,{title:`Ready when you are`,text:`Start free in under a minute. Invite your team when it clicks.`,get actions(){return N}});var i=a(r,2);O(i,{tone:`solid`,align:`start`,eyebrow:`Teams of 10+`,title:`Talk to us about a pilot`,text:`We set it up with you and migrate your data for free.`,actions:e=>{x(e,{variant:`glass`,shape:`pill`,size:`xl`,label:`Book a call`,icon:`calendar`})},$$slots:{actions:!0}});var o=a(i,2);O(o,{tone:`panel`,title:`Stay in the loop`,heading:3,children:(e,t)=>{be(e,{align:`center`,onsubscribe:()=>w()})},$$slots:{default:!0}}),f(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Tinted (default), solid and panel tones.`}},__svelteCsf:{rawCode:`<Stack gap="xl">
  <CallToAction
    title="Ready when you are"
    text="Start free in under a minute. Invite your team when it clicks."
    actions={heroActions}
  />
  <CallToAction
    tone="solid"
    align="start"
    eyebrow="Teams of 10+"
    title="Talk to us about a pilot"
    text="We set it up with you and migrate your data for free."
  >
    {#snippet actions()}
      <Button variant="glass" shape="pill" size="xl" label="Book a call" icon="calendar" />
    {/snippet}
  </CallToAction>
  <CallToAction tone="panel" title="Stay in the loop" heading={3}>
    <NewsletterSignup align="center" onsubscribe={() => later()} />
  </CallToAction>
</Stack>`}}});var y=a(v,2);F(y,{name:`SiteFooter`,asChild:!0,children:(e,t)=>{ve(e,{brand:`Example Planner`,get logo(){return M},tagline:`Calm software for small teams, made with care in Europe.`,get columns(){return ue},get social(){return le},get legal(){return de},finePrint:`© 2026 Example Studio`})},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<SiteFooter
  brand="Example Planner"
  {logo}
  tagline="Calm software for small teams, made with care in Europe."
  columns={footerColumns}
  social={socialLinks}
  legal={legalLinks}
  finePrint="© 2026 Example Studio"
/>`}}});var b=a(y,2);F(b,{name:`Themed`,asChild:!0,parameters:{layout:`fullscreen`,docs:{description:{story:`The same sections in a dark, rounder, pink-tinted Application.`}},__svelteCsf:{rawCode:`<Application tint="#ff2d55" theme="dark" radius="round" contained>
  <Stack gap="xl" padding="lg">
    <Hero
      size="md"
      eyebrow="Beta"
      title="Ideas worth sharing"
      highlight="sharing"
      text="A tint, a theme and a radius re-style every section."
      actions={heroActions}
    />
    <FeatureGrid features={features.slice(0, 3)} />
    <CallToAction tone="solid" title="Try it today">
      {#snippet actions()}
        <Button variant="glass" shape="pill" size="xl" label="Start now" />
      {/snippet}
    </CallToAction>
  </Stack>
</Application>`}},children:(e,t)=>{oe(e,{tint:`#ff2d55`,theme:`dark`,radius:`round`,contained:!0,children:(e,t)=>{S(e,{gap:`xl`,padding:`lg`,children:(e,t)=>{var n=z(),r=p(n);D(r,{size:`md`,eyebrow:`Beta`,title:`Ideas worth sharing`,highlight:`sharing`,text:`A tint, a theme and a radius re-style every section.`,get actions(){return N}});var o=a(r,2);{let e=u(()=>T.slice(0,3));A(o,{get features(){return i(e)}})}var s=a(o,2);O(s,{tone:`solid`,title:`Try it today`,actions:e=>{x(e,{variant:`glass`,shape:`pill`,size:`xl`,label:`Start now`})},$$slots:{actions:!0}}),f(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0}}),f(e,r),ae()}var M,N,P,F,I,L,R,z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q;function $(){return($=e((()=>{r(),c(),m(),h(),xe(),Se(),we(),ge(),ce(),k(),_e(),b(),ye(),se(),y(),he(),l(),g(),M=e=>{var t=I();f(e,t)},N=e=>{var t=L(),n=p(t);x(n,{variant:`primary`,shape:`pill`,size:`xl`,label:`Start for free`,icon:`arrow-right`});var r=a(n,2);x(r,{variant:`glass`,shape:`pill`,size:`xl`,label:`Watch the tour`,icon:`play`}),f(e,t)},P={title:`Organisms/Website sections`,component:D,tags:[`autodocs`],parameters:{layout:`padded`},args:{eyebrow:`New · Version 2 is here`,title:`Plan, write and ship — together`,highlight:`together`,text:`One calm place for your team’s projects, docs and decisions. Fast on every device.`,mediaPosition:`end`,backdrop:!1,size:`lg`},argTypes:{mediaPosition:{control:`inline-radio`,options:[`end`,`start`,`below`]},align:{control:`inline-radio`,options:[void 0,`start`,`center`]},size:{control:`inline-radio`,options:[`md`,`lg`]}}},{Story:F}=_(P),I=d(`<svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true"><rect width="28" height="28" rx="8" fill="var(--accent)"></rect><path d="M8 19V9l6 7 6-7v10" fill="none" stroke="var(--on-accent)" stroke-width="2.4"></path></svg>`),L=t(`<!> <!>`,1),R=t(`<!> <div style="max-width:24rem"><!></div>`,1),z=t(`<!> <!> <!>`,1),B=t(`<!> <!> <!> <!> <!> <!> <!> <!> <!> <!>`,1),j.__docgen={data:[],name:`Website.stories.svelte`},V=v(j,P),H=[`Hero`,`HeroWithBackdrop`,`NavBar`,`FeatureGrid`,`FeatureGridSolidIconsOnTheGround`,`PricingTable`,`Faq`,`CallToAction`,`SiteFooter`,`Themed`],U={...V.Hero,tags:[`svelte-csf-v5`]},W={...V.HeroWithBackdrop,tags:[`svelte-csf-v5`]},G={...V.NavBar,tags:[`svelte-csf-v5`]},K={...V.FeatureGrid,tags:[`svelte-csf-v5`]},q={...V.FeatureGridSolidIconsOnTheGround,tags:[`svelte-csf-v5`]},J={...V.PricingTable,tags:[`svelte-csf-v5`]},Y={...V.Faq,tags:[`svelte-csf-v5`]},X={...V.CallToAction,tags:[`svelte-csf-v5`]},Z={...V.SiteFooter,tags:[`svelte-csf-v5`]},Q={...V.Themed,tags:[`svelte-csf-v5`]}})))()}$();export{X as CallToAction,Y as Faq,K as FeatureGrid,q as FeatureGridSolidIconsOnTheGround,U as Hero,W as HeroWithBackdrop,G as NavBar,J as PricingTable,Z as SiteFooter,Q as Themed,H as __namedExportsOrder,P as default};