import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Mt as t,St as n,Wt as r,bt as i,fn as a,jn as o,l as s,m as c,pn as l,qt as u,rt as d,xt as f}from"./iframe-CWg4yaha.js";import{a as p,i as m,n as h,r as g,t as _}from"./create-runtime-stories-DQq0d2lF.js";import{n as v,t as y}from"./Grid-Cus4ZVN3.js";import{n as b,t as x}from"./Stack-vorXuMUJ.js";import{C as S,d as C,p as w,u as T}from"./mock-shop-D133ti18.js";import{n as E,t as D}from"./LogoCloud-BExuNCzj.js";import{n as O,t as k}from"./NewsletterSignup-CiFrkGEG.js";import{n as A,t as j}from"./Testimonial-D--o7mFv.js";import{i as M,n as N,r as P,t as F}from"./PricingCard-Cpv7DfP6.js";function I(e,n){l(n,!1),c();var o=H(),s=r(o);R(s,{name:`FeatureCard`,parameters:{__svelteCsf:{rawCode:`<FeatureCard {...args} />`}}});var p=u(s,2);R(p,{name:`FeatureCard styles`,asChild:!0,children:(e,t)=>{y(e,{min:`15rem`,children:(e,t)=>{var n=z(),a=r(n);P(a,{icon:`lock`,color:`blue`,title:`Private by default`,text:`Encrypted end to end.`});var o=u(a,2);P(o,{icon:`sparkles`,color:`purple`,title:`Smart suggestions`,text:`Drafts for you.`});var s=u(o,2);P(s,{icon:`users`,color:`pink`,iconStyle:`solid`,title:`Made for teams`,text:`Spaces, mentions, roles.`});var c=u(s,2);P(c,{icon:`chart`,color:`accent`,iconStyle:`solid`,title:`Insights`,text:`Know why a number moved.`,href:`#insights`}),i(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"Tinted squircles (default) next to glossy solid ones; any palette colour or `accent`."}},__svelteCsf:{rawCode:`<Grid min="15rem">
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
</Grid>`}}});var m=u(p,2);R(m,{name:`FeatureCard on the ground`,asChild:!0,children:(e,t)=>{y(e,{min:`18rem`,gap:`lg`,children:(e,t)=>{var n=B(),a=r(n);P(a,{level:`ground`,layout:`horizontal`,icon:`bolt`,color:`orange`,title:`Fast`,text:`Opens in under a second, even with thousands of items.`});var o=u(a,2);P(o,{level:`ground`,layout:`horizontal`,icon:`globe`,color:`teal`,title:`Everywhere`,text:`Web, desktop and phone — your work follows you.`}),i(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Straight on the backdrop, icon beside the text: for dense feature lists.`}},__svelteCsf:{rawCode:`<Grid min="18rem" gap="lg">
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
</Grid>`}}});var h=u(m,2);R(h,{name:`PricingCard`,asChild:!0,children:(e,t)=>{y(e,{min:`16rem`,columns:3,children:(e,t)=>{var n=V(),a=r(n);F(a,{name:`Starter`,price:0,description:`For trying things out.`,features:[`One workspace`,`3 projects`,{label:`Team roles`,included:!1}],ctaLabel:`Start for free`,onselect:()=>C()});var o=u(a,2);F(o,{name:`Team`,price:12,compareAt:15,period:`/ month`,note:`billed yearly`,description:`For small teams shipping together.`,features:[`Unlimited projects`,`Team roles and guests`,`Priority support`],highlighted:!0,badge:`Most popular`,ctaLabel:`Start free trial`,onselect:()=>C()});var s=u(o,2);F(s,{name:`Enterprise`,price:`Custom`,description:`Volume pricing, SSO and a success manager.`,features:[`Everything in Team`,`Single sign-on`,`Audit log`],ctaLabel:`Contact sales`,ctaHref:`#contact`}),i(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A free, a highlighted (selected layer) and a custom-priced plan.`}},__svelteCsf:{rawCode:`<Grid min="16rem" columns={3}>
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
</Grid>`}}});var g=u(h,2);R(g,{name:`Testimonial`,asChild:!0,children:(e,n)=>{x(e,{gap:`xl`,children:(e,n)=>{var a=B(),o=r(a);y(o,{min:`18rem`,children:(e,n)=>{var a=f(),o=r(a);d(o,1,()=>S,e=>e.name,(e,n)=>{j(e,{get quote(){return t(n).quote},get name(){return t(n).name},get role(){return t(n).role},get avatar(){return t(n).avatar},get rating(){return t(n).rating}})}),i(e,a)},$$slots:{default:!0}});var s=u(o,2);j(s,{size:`lg`,level:`ground`,quote:`The calmest tool we have ever rolled out. People just started using it.`,name:`Lena Vogt`,role:`COO, Example Labs`}),i(e,a)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Quotes in a grid, and the single large featured quote.`}},__svelteCsf:{rawCode:`<Stack gap="xl">
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
</Stack>`}}});var _=u(g,2);R(_,{name:`LogoCloud`,asChild:!0,children:(e,t)=>{D(e,{title:`Trusted by teams at`,get logos(){return w}})},$$slots:{default:!0},parameters:{docs:{description:{story:"Wordmarks from names, muted to one grey; images work the same with `src`."}},__svelteCsf:{rawCode:`<LogoCloud title="Trusted by teams at" {logos} />`}}});var v=u(_,2);R(v,{name:`NewsletterSignup`,asChild:!0,children:(e,t)=>{y(e,{min:`18rem`,gap:`xl`,children:(e,t)=>{var n=B(),a=r(n);k(a,{title:`Product updates`,text:`One short e-mail a month. No spam, unsubscribe any time.`,onsubscribe:async e=>{if(await C(),e.startsWith(`fail`))throw Error(`rejected`)}});var o=u(a,2);k(o,{layout:`stacked`,title:`Join the beta`,buttonLabel:`Request access`,onsubscribe:()=>C()}),i(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Try any address: success throws a small burst of sprinkles (the end of a task is where delight
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
</Grid>`}}}),i(e,o),a()}var L,R,z,B,V,H,U,W,G,K,q,J,Y,X,Z;function Q(){return(Q=e((()=>{o(),p(),m(),M(),E(),O(),N(),A(),v(),b(),T(),s(),h(),L={title:`Molecules/Website building blocks`,component:P,tags:[`autodocs`],parameters:{layout:`padded`},args:{icon:`bolt`,color:`orange`,title:`Instant sync`,text:`Every change lands on every device in milliseconds.`,iconStyle:`tinted`,level:`panel`,layout:`vertical`},argTypes:{iconStyle:{control:`inline-radio`,options:[`tinted`,`solid`]},level:{control:`inline-radio`,options:[`panel`,`ground`]},layout:{control:`inline-radio`,options:[`vertical`,`horizontal`]},color:{control:`select`,options:[`accent`,`blue`,`orange`,`green`,`purple`,`pink`,`teal`,`red`]}}},{Story:R}=g(L),z=n(`<!> <!> <!> <!>`,1),B=n(`<!> <!>`,1),V=n(`<!> <!> <!>`,1),H=n(`<!> <!> <!> <!> <!> <!> <!>`,1),I.__docgen={data:[],name:`Marketing.stories.svelte`},U=_(I,L),W=[`FeatureCard`,`FeatureCardStyles`,`FeatureCardOnTheGround`,`PricingCard`,`Testimonial`,`LogoCloud`,`NewsletterSignup`],G={...U.FeatureCard,tags:[`svelte-csf-v5`]},K={...U.FeatureCardStyles,tags:[`svelte-csf-v5`]},q={...U.FeatureCardOnTheGround,tags:[`svelte-csf-v5`]},J={...U.PricingCard,tags:[`svelte-csf-v5`]},Y={...U.Testimonial,tags:[`svelte-csf-v5`]},X={...U.LogoCloud,tags:[`svelte-csf-v5`]},Z={...U.NewsletterSignup,tags:[`svelte-csf-v5`]}})))()}Q();export{G as FeatureCard,q as FeatureCardOnTheGround,K as FeatureCardStyles,X as LogoCloud,Z as NewsletterSignup,J as PricingCard,Y as Testimonial,W as __namedExportsOrder,L as default};