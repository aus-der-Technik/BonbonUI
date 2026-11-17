import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Ct as t,Kt as n,Nn as r,Pt as i,St as a,Yt as o,hn as s,l as c,m as l,mn as u,rt as d,xt as f}from"./iframe-CRBWUEFv.js";import{a as p,i as m,n as h,r as g,t as _}from"./create-runtime-stories-DtoOt73Q.js";import{n as v,t as y}from"./Grid-DlBYjD7t.js";import{n as b,t as x}from"./Stack-DW7rWz1x.js";import{C as S,d as C,p as w,u as T}from"./mock-shop-D133ti18.js";import{n as E,t as D}from"./LogoCloud-CaWKrPQq.js";import{n as O,t as k}from"./NewsletterSignup-CNK4TwK9.js";import{n as A,t as j}from"./Testimonial-A7SpRnsi.js";import{i as M,n as N,r as P,t as F}from"./PricingCard-CHZ0Uzz4.js";function I(e,t){s(t,!1),l();var r=H(),c=n(r);R(c,{name:`FeatureCard`,parameters:{__svelteCsf:{rawCode:`<FeatureCard {...args} />`}}});var p=o(c,2);R(p,{name:`FeatureCard styles`,asChild:!0,children:(e,t)=>{y(e,{min:`15rem`,children:(e,t)=>{var r=z(),i=n(r);P(i,{icon:`lock`,color:`blue`,title:`Private by default`,text:`Encrypted end to end.`});var a=o(i,2);P(a,{icon:`sparkles`,color:`purple`,title:`Smart suggestions`,text:`Drafts for you.`});var s=o(a,2);P(s,{icon:`users`,color:`pink`,iconStyle:`solid`,title:`Made for teams`,text:`Spaces, mentions, roles.`});var c=o(s,2);P(c,{icon:`chart`,color:`accent`,iconStyle:`solid`,title:`Insights`,text:`Know why a number moved.`,href:`#insights`}),f(e,r)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"Tinted squircles (default) next to glossy solid ones; any palette colour or `accent`."}},__svelteCsf:{rawCode:`<Grid min="15rem">
  <FeatureCard icon="lock" color="blue" title="Private by default" text="Encrypted end to end." />
  <FeatureCard icon="sparkles" color="purple" title="Smart suggestions" text="Drafts for you." />
  <FeatureCard
    icon="users"
    color="pink"
    iconStyle="solid"
    title="Made for teams"
    text="Spaces, mentions, roles."
  />
  <FeatureCard
    icon="chart"
    color="accent"
    iconStyle="solid"
    title="Insights"
    text="Know why a number moved."
    href="#insights"
  />
</Grid>`}}});var m=o(p,2);R(m,{name:`FeatureCard on the ground`,asChild:!0,children:(e,t)=>{y(e,{min:`18rem`,gap:`lg`,children:(e,t)=>{var r=B(),i=n(r);P(i,{level:`ground`,layout:`horizontal`,icon:`bolt`,color:`orange`,title:`Fast`,text:`Opens in under a second, even with thousands of items.`});var a=o(i,2);P(a,{level:`ground`,layout:`horizontal`,icon:`globe`,color:`teal`,title:`Everywhere`,text:`Web, desktop and phone — your work follows you.`}),f(e,r)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Straight on the backdrop, icon beside the text: for dense feature lists.`}},__svelteCsf:{rawCode:`<Grid min="18rem" gap="lg">
  <FeatureCard
    level="ground"
    layout="horizontal"
    icon="bolt"
    color="orange"
    title="Fast"
    text="Opens in under a second, even with thousands of items."
  />
  <FeatureCard
    level="ground"
    layout="horizontal"
    icon="globe"
    color="teal"
    title="Everywhere"
    text="Web, desktop and phone — your work follows you."
  />
</Grid>`}}});var h=o(m,2);R(h,{name:`PricingCard`,asChild:!0,children:(e,t)=>{y(e,{min:`16rem`,columns:3,children:(e,t)=>{var r=V(),i=n(r);F(i,{name:`Starter`,price:0,description:`For trying things out.`,features:[`One workspace`,`3 projects`,{label:`Team roles`,included:!1}],ctaLabel:`Start for free`,onselect:()=>C()});var a=o(i,2);F(a,{name:`Team`,price:12,compareAt:15,period:`/ month`,note:`billed yearly`,description:`For small teams shipping together.`,features:[`Unlimited projects`,`Team roles and guests`,`Priority support`],highlighted:!0,badge:`Most popular`,ctaLabel:`Start free trial`,onselect:()=>C()});var s=o(a,2);F(s,{name:`Enterprise`,price:`Custom`,description:`Volume pricing, SSO and a success manager.`,features:[`Everything in Team`,`Single sign-on`,`Audit log`],ctaLabel:`Contact sales`,ctaHref:`#contact`}),f(e,r)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A free, a highlighted (selected layer) and a custom-priced plan.`}},__svelteCsf:{rawCode:`<Grid min="16rem" columns={3}>
  <PricingCard
    name="Starter"
    price={0}
    description="For trying things out."
    features={['One workspace', '3 projects', { label: 'Team roles', included: false }]}
    ctaLabel="Start for free"
    onselect={() => later()}
  />
  <PricingCard
    name="Team"
    price={12}
    compareAt={15}
    period="/ month"
    note="billed yearly"
    description="For small teams shipping together."
    features={['Unlimited projects', 'Team roles and guests', 'Priority support']}
    highlighted
    badge="Most popular"
    ctaLabel="Start free trial"
    onselect={() => later()}
  />
  <PricingCard
    name="Enterprise"
    price="Custom"
    description="Volume pricing, SSO and a success manager."
    features={['Everything in Team', 'Single sign-on', 'Audit log']}
    ctaLabel="Contact sales"
    ctaHref="#contact"
  />
</Grid>`}}});var g=o(h,2);R(g,{name:`Testimonial`,asChild:!0,children:(e,t)=>{x(e,{gap:`xl`,children:(e,t)=>{var r=B(),s=n(r);y(s,{min:`18rem`,children:(e,t)=>{var r=a(),o=n(r);d(o,1,()=>S,e=>e.name,(e,t)=>{j(e,{get quote(){return i(t).quote},get name(){return i(t).name},get role(){return i(t).role},get avatar(){return i(t).avatar},get rating(){return i(t).rating}})}),f(e,r)},$$slots:{default:!0}});var c=o(s,2);j(c,{size:`lg`,level:`ground`,quote:`The calmest tool we have ever rolled out. People just started using it.`,name:`Lena Vogt`,role:`COO, Example Labs`}),f(e,r)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Quotes in a grid, and the single large featured quote.`}},__svelteCsf:{rawCode:`<Stack gap="xl">
  <Grid min="18rem">
    {#each testimonials as t (t.name)}
      <Testimonial
        quote={t.quote}
        name={t.name}
        role={t.role}
        avatar={t.avatar}
        rating={t.rating}
      />
    {/each}
  </Grid>
  <Testimonial
    size="lg"
    level="ground"
    quote="The calmest tool we have ever rolled out. People just started using it."
    name="Lena Vogt"
    role="COO, Example Labs"
  />
</Stack>`}}});var _=o(g,2);R(_,{name:`LogoCloud`,asChild:!0,children:(e,t)=>{D(e,{title:`Trusted by teams at`,get logos(){return w}})},$$slots:{default:!0},parameters:{docs:{description:{story:"Wordmarks from names, muted to one grey; images work the same with `src`."}},__svelteCsf:{rawCode:`<LogoCloud title="Trusted by teams at" {logos} />`}}});var v=o(_,2);R(v,{name:`NewsletterSignup`,asChild:!0,children:(e,t)=>{y(e,{min:`18rem`,gap:`xl`,children:(e,t)=>{var r=B(),i=n(r);k(i,{title:`Product updates`,text:`One short e-mail a month. No spam, unsubscribe any time.`,onsubscribe:async e=>{if(await C(),e.startsWith(`fail`))throw Error(`rejected`)}});var a=o(i,2);k(a,{layout:`stacked`,title:`Join the beta`,buttonLabel:`Request access`,onsubscribe:()=>C()}),f(e,r)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Try any address: success throws a small burst of sprinkles (the end of a task is where delight
    lives). An invalid address shakes its head politely; "fail@example.com" shows the plain error.`}},__svelteCsf:{rawCode:`<Grid min="18rem" gap="xl">
  <NewsletterSignup
    title="Product updates"
    text="One short e-mail a month. No spam, unsubscribe any time."
    onsubscribe={async (email) => {
      await later();
      if (email.startsWith('fail')) throw new Error('rejected');
    }}
  />
  <NewsletterSignup
    layout="stacked"
    title="Join the beta"
    buttonLabel="Request access"
    onsubscribe={() => later()}
  />
</Grid>`}}}),f(e,r),u()}var L,R,z,B,V,H,U,W,G,K,q,J,Y,X,Z;function Q(){return(Q=e((()=>{r(),p(),m(),M(),E(),O(),N(),A(),v(),b(),T(),c(),h(),L={title:`Molecules/Website building blocks`,component:P,tags:[`autodocs`],parameters:{layout:`padded`},args:{icon:`bolt`,color:`orange`,title:`Instant sync`,text:`Every change lands on every device in milliseconds.`,iconStyle:`tinted`,level:`panel`,layout:`vertical`},argTypes:{iconStyle:{control:`inline-radio`,options:[`tinted`,`solid`]},level:{control:`inline-radio`,options:[`panel`,`ground`]},layout:{control:`inline-radio`,options:[`vertical`,`horizontal`]},color:{control:`select`,options:[`accent`,`blue`,`orange`,`green`,`purple`,`pink`,`teal`,`red`]}}},{Story:R}=g(L),z=t(`<!> <!> <!> <!>`,1),B=t(`<!> <!>`,1),V=t(`<!> <!> <!>`,1),H=t(`<!> <!> <!> <!> <!> <!> <!>`,1),I.__docgen={data:[],name:`Marketing.stories.svelte`},U=_(I,L),W=[`FeatureCard`,`FeatureCardStyles`,`FeatureCardOnTheGround`,`PricingCard`,`Testimonial`,`LogoCloud`,`NewsletterSignup`],G={...U.FeatureCard,tags:[`svelte-csf-v5`]},K={...U.FeatureCardStyles,tags:[`svelte-csf-v5`]},q={...U.FeatureCardOnTheGround,tags:[`svelte-csf-v5`]},J={...U.PricingCard,tags:[`svelte-csf-v5`]},Y={...U.Testimonial,tags:[`svelte-csf-v5`]},X={...U.LogoCloud,tags:[`svelte-csf-v5`]},Z={...U.NewsletterSignup,tags:[`svelte-csf-v5`]}})))()}Q();export{G as FeatureCard,q as FeatureCardOnTheGround,K as FeatureCardStyles,X as LogoCloud,Z as NewsletterSignup,J as PricingCard,Y as Testimonial,W as __namedExportsOrder,L as default};