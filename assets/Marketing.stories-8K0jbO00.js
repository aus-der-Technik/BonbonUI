import{n as e}from"./rolldown-runtime-Dxh6kD9_.js";import{Ct as t,Ft as n,Gt as r,Ht as i,Pt as a,Sn as o,St as s,l as c,m as l,tt as u,xn as d,xt as f,zt as p}from"./iframe-WlNMZtZ0.js";import{a as m,i as h,n as g,r as _,t as v}from"./create-runtime-stories-CbHiKinS.js";import{n as y,t as b}from"./Grid-CbFksUeV.js";import{n as x,t as S}from"./Stack-BjV-rmuj.js";import{C,d as w,p as T,u as E}from"./mock-shop-HOkEgzgf.js";import{n as D,t as O}from"./LogoCloud-BfFelh7H.js";import{n as k,t as A}from"./NewsletterSignup-C8AwvPtU.js";import{n as j,t as M}from"./Testimonial-DkXLzSGY.js";import{i as N,n as P,r as F,t as I}from"./PricingCard-33hjhzz2.js";function L(e,t){o(t,!1),l();var n=U(),a=p(n);z(a,{name:`FeatureCard`,parameters:{__svelteCsf:{rawCode:`<FeatureCard {...args} />`}}});var c=i(a,2);z(c,{name:`FeatureCard styles`,asChild:!0,children:(e,t)=>{b(e,{min:`15rem`,children:(e,t)=>{var n=B(),r=p(n);F(r,{icon:`lock`,color:`blue`,title:`Private by default`,text:`Encrypted end to end.`});var a=i(r,2);F(a,{icon:`sparkles`,color:`purple`,title:`Smart suggestions`,text:`Drafts for you.`});var o=i(a,2);F(o,{icon:`users`,color:`pink`,iconStyle:`solid`,title:`Made for teams`,text:`Spaces, mentions, roles.`});var s=i(o,2);F(s,{icon:`chart`,color:`accent`,iconStyle:`solid`,title:`Insights`,text:`Know why a number moved.`,href:`#insights`}),f(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"Tinted squircles (default) next to glossy solid ones; any palette colour or `accent`."}},__svelteCsf:{rawCode:`<Grid min="15rem">
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
</Grid>`}}});var m=i(c,2);z(m,{name:`FeatureCard on the ground`,asChild:!0,children:(e,t)=>{b(e,{min:`18rem`,gap:`lg`,children:(e,t)=>{var n=V(),r=p(n);F(r,{level:`ground`,layout:`horizontal`,icon:`bolt`,color:`orange`,title:`Fast`,text:`Opens in under a second, even with thousands of items.`});var a=i(r,2);F(a,{level:`ground`,layout:`horizontal`,icon:`globe`,color:`teal`,title:`Everywhere`,text:`Web, desktop and phone — your work follows you.`}),f(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Straight on the backdrop, icon beside the text: for dense feature lists.`}},__svelteCsf:{rawCode:`<Grid min="18rem" gap="lg">
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
</Grid>`}}});var h=i(m,2);z(h,{name:`PricingCard`,asChild:!0,children:(e,t)=>{b(e,{min:`16rem`,columns:3,children:(e,t)=>{var n=H(),r=p(n);I(r,{name:`Starter`,price:0,description:`For trying things out.`,features:[`One workspace`,`3 projects`,{label:`Team roles`,included:!1}],ctaLabel:`Start for free`,onselect:()=>w()});var a=i(r,2);I(a,{name:`Team`,price:12,compareAt:15,period:`/ month`,note:`billed yearly`,description:`For small teams shipping together.`,features:[`Unlimited projects`,`Team roles and guests`,`Priority support`],highlighted:!0,badge:`Most popular`,ctaLabel:`Start free trial`,onselect:()=>w()});var o=i(a,2);I(o,{name:`Enterprise`,price:`Custom`,description:`Volume pricing, SSO and a success manager.`,features:[`Everything in Team`,`Single sign-on`,`Audit log`],ctaLabel:`Contact sales`,ctaHref:`#contact`}),f(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A free, a highlighted (selected layer) and a custom-priced plan.`}},__svelteCsf:{rawCode:`<Grid min="16rem" columns={3}>
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
</Grid>`}}});var g=i(h,2);z(g,{name:`Testimonial`,asChild:!0,children:(e,t)=>{S(e,{gap:`xl`,children:(e,t)=>{var n=V(),a=p(n);b(a,{min:`18rem`,children:(e,t)=>{var n=s(),i=p(n);u(i,1,()=>C,e=>e.name,(e,t)=>{M(e,{get quote(){return r(t).quote},get name(){return r(t).name},get role(){return r(t).role},get avatar(){return r(t).avatar},get rating(){return r(t).rating}})}),f(e,n)},$$slots:{default:!0}});var o=i(a,2);M(o,{size:`lg`,level:`ground`,quote:`The calmest tool we have ever rolled out. People just started using it.`,name:`Lena Vogt`,role:`COO, Example Labs`}),f(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Quotes in a grid, and the single large featured quote.`}},__svelteCsf:{rawCode:`<Stack gap="xl">
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
</Stack>`}}});var _=i(g,2);z(_,{name:`LogoCloud`,asChild:!0,children:(e,t)=>{O(e,{title:`Trusted by teams at`,get logos(){return T}})},$$slots:{default:!0},parameters:{docs:{description:{story:"Wordmarks from names, muted to one grey; images work the same with `src`."}},__svelteCsf:{rawCode:`<LogoCloud title="Trusted by teams at" {logos} />`}}});var v=i(_,2);z(v,{name:`NewsletterSignup`,asChild:!0,children:(e,t)=>{b(e,{min:`18rem`,gap:`xl`,children:(e,t)=>{var n=V(),r=p(n);A(r,{title:`Product updates`,text:`One short e-mail a month. No spam, unsubscribe any time.`,onsubscribe:async e=>{if(await w(),e.startsWith(`fail`))throw Error(`rejected`)}});var a=i(r,2);A(a,{layout:`stacked`,title:`Join the beta`,buttonLabel:`Request access`,onsubscribe:()=>w()}),f(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Try any address: success throws a small burst of sprinkles (the end of a task is where delight
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
</Grid>`}}}),f(e,n),d()}var R,z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q;function $(){return($=e((()=>{n(),a(),m(),h(),N(),D(),k(),P(),j(),y(),x(),E(),c(),g(),R={title:`Molecules/Website building blocks`,component:F,tags:[`autodocs`],parameters:{layout:`padded`},args:{icon:`bolt`,color:`orange`,title:`Instant sync`,text:`Every change lands on every device in milliseconds.`,iconStyle:`tinted`,level:`panel`,layout:`vertical`},argTypes:{iconStyle:{control:`inline-radio`,options:[`tinted`,`solid`]},level:{control:`inline-radio`,options:[`panel`,`ground`]},layout:{control:`inline-radio`,options:[`vertical`,`horizontal`]},color:{control:`select`,options:[`accent`,`blue`,`orange`,`green`,`purple`,`pink`,`teal`,`red`]}}},{Story:z}=_(R),B=t(`<!> <!> <!> <!>`,1),V=t(`<!> <!>`,1),H=t(`<!> <!> <!>`,1),U=t(`<!> <!> <!> <!> <!> <!> <!>`,1),L.__docgen={data:[],name:`Marketing.stories.svelte`},W=v(L,R),G=[`FeatureCard`,`FeatureCardStyles`,`FeatureCardOnTheGround`,`PricingCard`,`Testimonial`,`LogoCloud`,`NewsletterSignup`],K={...W.FeatureCard,tags:[`svelte-csf-v5`]},q={...W.FeatureCardStyles,tags:[`svelte-csf-v5`]},J={...W.FeatureCardOnTheGround,tags:[`svelte-csf-v5`]},Y={...W.PricingCard,tags:[`svelte-csf-v5`]},X={...W.Testimonial,tags:[`svelte-csf-v5`]},Z={...W.LogoCloud,tags:[`svelte-csf-v5`]},Q={...W.NewsletterSignup,tags:[`svelte-csf-v5`]}})))()}$();export{K as FeatureCard,J as FeatureCardOnTheGround,q as FeatureCardStyles,Z as LogoCloud,Q as NewsletterSignup,Y as PricingCard,X as Testimonial,G as __namedExportsOrder,R as default};