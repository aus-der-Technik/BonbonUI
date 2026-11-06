import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Cn as t,Ct as n,Et as r,Mt as i,St as a,Ut as o,Wt as s,bt as c,fn as ee,in as l,jn as u,kn as te,l as d,m as ne,p as re,pn as ie,qt as f,wn as ae}from"./iframe-Dd9zCUtD.js";import{a as p,i as m,n as h,r as g,t as _}from"./create-runtime-stories-Bj9BSqmd.js";import{n as v,t as oe}from"./Application-BkgmCkrt.js";import{n as y,t as b}from"./Button-CAKf1gbx.js";import{n as x,t as S}from"./Stack-B3I2k7mw.js";import{n as se,t as C}from"./NavBar-CA7iRV1m.js";import{S as ce,c as le,d as w,f as ue,g as de,h as fe,o as pe,s as T,u as me,x as E}from"./mock-shop-D133ti18.js";import{i as he,n as ge,r as D,t as _e}from"./SiteFooter-BjfVXhII.js";import{n as ve,t as ye}from"./NewsletterSignup-I0KFDKwX.js";import{n as be,t as O}from"./CallToAction-BD4-uLQu.js";import{n as xe,t as Se}from"./Faq-KFLbcwvN.js";import{i as Ce,n as k,r as A,t as we}from"./PricingTable-Cx5iyiXy.js";function j(e,n){ie(n,!1),ne();var a=B(),u=s(a);F(u,{name:`Hero`,template:(e,n=te)=>{{let a=l(()=>fe(`hero-desk`,1200,900));D(e,re(n,{get image(){return i(a)},get actions(){return N},children:(e,n)=>{t();var i=r(`Free for individuals · No card needed`);c(e,i)},$$slots:{default:!0}}))}},$$slots:{template:!0},parameters:{docs:{description:{story:`Text and image side by side; the image moves under the text below 820px. On load the copy
    rises in line by line and the image settles after it; a linked eyebrow catches a sugar-glass
    sheen on hover.`}},__svelteCsf:{rawCode:`<Hero {...args} image={photo('hero-desk', 1200, 900)} actions={heroActions}>
  Free for individuals · No card needed
</Hero>`}}});var d=f(u,2);F(d,{name:`Hero with backdrop`,asChild:!0,children:(e,t)=>{D(e,{backdrop:!0,eyebrow:`Spring launch`,eyebrowHref:`#launch`,title:`Everything your team needs, nothing it doesn’t`,highlight:`nothing it doesn’t`,text:`Projects, docs and chat in one place, with the noise taken out.`,get actions(){return N}})},$$slots:{default:!0},parameters:{docs:{description:{story:"Centred, without media, on its own drifting tint mesh (`backdrop`)."}},__svelteCsf:{rawCode:`<Hero
  backdrop
  eyebrow="Spring launch"
  eyebrowHref="#launch"
  title="Everything your team needs, nothing it doesn’t"
  highlight="nothing it doesn’t"
  text="Projects, docs and chat in one place, with the noise taken out."
  actions={heroActions}
/>`}}});var p=f(d,2);F(p,{name:`NavBar`,asChild:!0,children:(e,t)=>{S(e,{gap:`xl`,children:(e,t)=>{var n=R(),r=s(n);C(r,{brand:`Example Planner`,get logo(){return M},get links(){return E},actions:e=>{var t=L(),n=s(t);b(n,{variant:`ghost`,shape:`pill`,label:`Sign in`,collapse:!0,icon:`sign-in`});var r=f(n,2);b(r,{variant:`primary`,shape:`pill`,label:`Get started`}),c(e,t)},menu:e=>{b(e,{variant:`secondary`,shape:`pill`,size:`lg`,label:`Sign in`})},$$slots:{actions:!0,menu:!0}});var i=f(r,2),a=o(i);C(a,{brand:`Example Planner`,get logo(){return M},get links(){return E},actions:e=>{b(e,{variant:`primary`,shape:`pill`,label:`Get started`})},$$slots:{actions:!0}}),ae(i),c(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Links fold into a menu button + sheet when the bar is narrower than 720px (resize). The bar
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
</Stack>`}}});var m=f(p,2);F(m,{name:`FeatureGrid`,asChild:!0,children:(e,t)=>{A(e,{eyebrow:`Features`,title:`Everything in one place`,description:`Built for the way small teams actually work.`,get features(){return T}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Features cycle through the candy palette unless one names its colour.`}},__svelteCsf:{rawCode:`<FeatureGrid
  eyebrow="Features"
  title="Everything in one place"
  description="Built for the way small teams actually work."
  {features}
/>`}}});var h=f(m,2);F(h,{name:`FeatureGrid solid icons on the ground`,asChild:!0,children:(e,t)=>{{let t=l(()=>T.slice(0,4));A(e,{get features(){return i(t)},level:`ground`,iconStyle:`solid`,columns:4})}},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<FeatureGrid features={features.slice(0, 4)} level="ground" iconStyle="solid" columns={4} />`}}});var g=f(h,2);F(g,{name:`PricingTable`,asChild:!0,children:(e,t)=>{we(e,{eyebrow:`Pricing`,title:`Simple, fair pricing`,description:`Start free. Upgrade when your team grows.`,get plans(){return de},onselect:()=>w()})},$$slots:{default:!0},parameters:{docs:{description:{story:`Monthly / yearly switch; the badge shows the best saving across the plans. It stays muted
    while monthly is chosen and lights up in the tint, with a small pop, once yearly is.`}},__svelteCsf:{rawCode:`<PricingTable
  eyebrow="Pricing"
  title="Simple, fair pricing"
  description="Start free. Upgrade when your team grows."
  {plans}
  onselect={() => later()}
/>`}}});var _=f(g,2);F(_,{name:`Faq`,asChild:!0,children:(e,t)=>{Se(e,{title:`Questions & answers`,get items(){return pe},open:[0]})},$$slots:{default:!0},parameters:{docs:{description:{story:"One answer open at a time; `multiple` lets several stay open. Arrow keys move."}},__svelteCsf:{rawCode:`<Faq title="Questions & answers" items={faqs} open={[0]} />`}}});var v=f(_,2);F(v,{name:`CallToAction`,asChild:!0,children:(e,t)=>{S(e,{gap:`xl`,children:(e,t)=>{var n=z(),r=s(n);O(r,{title:`Ready when you are`,text:`Start free in under a minute. Invite your team when it clicks.`,get actions(){return N}});var i=f(r,2);O(i,{tone:`solid`,align:`start`,eyebrow:`Teams of 10+`,title:`Talk to us about a pilot`,text:`We set it up with you and migrate your data for free.`,actions:e=>{b(e,{variant:`glass`,shape:`pill`,size:`xl`,label:`Book a call`,icon:`calendar`})},$$slots:{actions:!0}});var a=f(i,2);O(a,{tone:`panel`,title:`Stay in the loop`,heading:3,children:(e,t)=>{ye(e,{align:`center`,onsubscribe:()=>w()})},$$slots:{default:!0}}),c(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Tinted (default), solid and panel tones.`}},__svelteCsf:{rawCode:`<Stack gap="xl">
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
</Stack>`}}});var y=f(v,2);F(y,{name:`SiteFooter`,asChild:!0,children:(e,t)=>{_e(e,{brand:`Example Planner`,get logo(){return M},tagline:`Calm software for small teams, made with care in Europe.`,get columns(){return le},get social(){return ce},get legal(){return ue},finePrint:`© 2026 Example Studio`})},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<SiteFooter
  brand="Example Planner"
  {logo}
  tagline="Calm software for small teams, made with care in Europe."
  columns={footerColumns}
  social={socialLinks}
  legal={legalLinks}
  finePrint="© 2026 Example Studio"
/>`}}});var x=f(y,2);F(x,{name:`Themed`,asChild:!0,parameters:{layout:`fullscreen`,docs:{description:{story:`The same sections in a dark, rounder, pink-tinted Application.`}},__svelteCsf:{rawCode:`<Application tint="#ff2d55" theme="dark" radius="round" contained>
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
</Application>`}},children:(e,t)=>{oe(e,{tint:`#ff2d55`,theme:`dark`,radius:`round`,contained:!0,children:(e,t)=>{S(e,{gap:`xl`,padding:`lg`,children:(e,t)=>{var n=z(),r=s(n);D(r,{size:`md`,eyebrow:`Beta`,title:`Ideas worth sharing`,highlight:`sharing`,text:`A tint, a theme and a radius re-style every section.`,get actions(){return N}});var a=f(r,2);{let e=l(()=>T.slice(0,3));A(a,{get features(){return i(e)}})}var o=f(a,2);O(o,{tone:`solid`,title:`Try it today`,actions:e=>{b(e,{variant:`glass`,shape:`pill`,size:`xl`,label:`Start now`})},$$slots:{actions:!0}}),c(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0}}),c(e,a),ee()}var M,N,P,F,I,L,R,z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q;function $(){return($=e((()=>{u(),p(),m(),be(),xe(),Ce(),he(),se(),k(),ge(),y(),ve(),x(),v(),me(),d(),h(),M=e=>{var t=I();c(e,t)},N=e=>{var t=L(),n=s(t);b(n,{variant:`primary`,shape:`pill`,size:`xl`,label:`Start for free`,icon:`arrow-right`});var r=f(n,2);b(r,{variant:`glass`,shape:`pill`,size:`xl`,label:`Watch the tour`,icon:`play`}),c(e,t)},P={title:`Organisms/Website sections`,component:D,tags:[`autodocs`],parameters:{layout:`padded`},args:{eyebrow:`New · Version 2 is here`,title:`Plan, write and ship — together`,highlight:`together`,text:`One calm place for your team’s projects, docs and decisions. Fast on every device.`,mediaPosition:`end`,backdrop:!1,size:`lg`},argTypes:{mediaPosition:{control:`inline-radio`,options:[`end`,`start`,`below`]},align:{control:`inline-radio`,options:[void 0,`start`,`center`]},size:{control:`inline-radio`,options:[`md`,`lg`]}}},{Story:F}=g(P),I=n(`<svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true"><rect width="28" height="28" rx="8" fill="var(--accent)"></rect><path d="M8 19V9l6 7 6-7v10" fill="none" stroke="var(--on-accent)" stroke-width="2.4"></path></svg>`),L=a(`<!> <!>`,1),R=a(`<!> <div style="max-width:24rem"><!></div>`,1),z=a(`<!> <!> <!>`,1),B=a(`<!> <!> <!> <!> <!> <!> <!> <!> <!> <!>`,1),j.__docgen={data:[],name:`Website.stories.svelte`},V=_(j,P),H=[`Hero`,`HeroWithBackdrop`,`NavBar`,`FeatureGrid`,`FeatureGridSolidIconsOnTheGround`,`PricingTable`,`Faq`,`CallToAction`,`SiteFooter`,`Themed`],U={...V.Hero,tags:[`svelte-csf-v5`]},W={...V.HeroWithBackdrop,tags:[`svelte-csf-v5`]},G={...V.NavBar,tags:[`svelte-csf-v5`]},K={...V.FeatureGrid,tags:[`svelte-csf-v5`]},q={...V.FeatureGridSolidIconsOnTheGround,tags:[`svelte-csf-v5`]},J={...V.PricingTable,tags:[`svelte-csf-v5`]},Y={...V.Faq,tags:[`svelte-csf-v5`]},X={...V.CallToAction,tags:[`svelte-csf-v5`]},Z={...V.SiteFooter,tags:[`svelte-csf-v5`]},Q={...V.Themed,tags:[`svelte-csf-v5`]}})))()}$();export{X as CallToAction,Y as Faq,K as FeatureGrid,q as FeatureGridSolidIconsOnTheGround,U as Hero,W as HeroWithBackdrop,G as NavBar,J as PricingTable,Z as SiteFooter,Q as Themed,H as __namedExportsOrder,P as default};