import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Cn as t,Ct as n,Ft as r,Gt as i,Ht as a,Pt as o,St as s,l as c,m as l,tt as u,wn as d,xt as f,zt as p}from"./iframe-D3QpTFc1.js";import{a as m,i as h,n as g,r as _,t as v}from"./create-runtime-stories-bgfxAijx.js";import{n as y,t as b}from"./Grid-CRR54iID.js";import{n as x,t as S}from"./Stack-DIO0U5nL.js";import{C,d as w,p as T,u as E}from"./mock-shop-D133ti18.js";import{n as D,t as O}from"./LogoCloud-DSUY3rZS.js";import{n as k,t as A}from"./NewsletterSignup-UcA2dxSg.js";import{n as j,t as M}from"./Testimonial-BexMxGOg.js";import{i as N,n as P,r as F,t as I}from"./PricingCard-MiyrM2t7.js";function L(e,n){d(n,!1),l();var r=U(),o=p(r);z(o,{name:`FeatureCard`,parameters:{__svelteCsf:{rawCode:`<FeatureCard {...args} />`}}});var c=a(o,2);z(c,{name:`FeatureCard styles`,asChild:!0,children:(e,t)=>{b(e,{min:`15rem`,children:(e,t)=>{var n=B(),r=p(n);F(r,{icon:`lock`,color:`blue`,title:`Private by default`,text:`Encrypted end to end.`});var i=a(r,2);F(i,{icon:`sparkles`,color:`purple`,title:`Smart suggestions`,text:`Drafts for you.`});var o=a(i,2);F(o,{icon:`users`,color:`pink`,iconStyle:`solid`,title:`Made for teams`,text:`Spaces, mentions, roles.`});var s=a(o,2);F(s,{icon:`chart`,color:`accent`,iconStyle:`solid`,title:`Insights`,text:`Know why a number moved.`,href:`#insights`}),f(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"Tinted squircles (default) next to glossy solid ones; any palette colour or `accent`."}},__svelteCsf:{rawCode:`<Grid min="15rem">
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
</Grid>`}}});var m=a(c,2);z(m,{name:`FeatureCard on the ground`,asChild:!0,children:(e,t)=>{b(e,{min:`18rem`,gap:`lg`,children:(e,t)=>{var n=V(),r=p(n);F(r,{level:`ground`,layout:`horizontal`,icon:`bolt`,color:`orange`,title:`Fast`,text:`Opens in under a second, even with thousands of items.`});var i=a(r,2);F(i,{level:`ground`,layout:`horizontal`,icon:`globe`,color:`teal`,title:`Everywhere`,text:`Web, desktop and phone — your work follows you.`}),f(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Straight on the backdrop, icon beside the text: for dense feature lists.`}},__svelteCsf:{rawCode:`<Grid min="18rem" gap="lg">
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
</Grid>`}}});var h=a(m,2);z(h,{name:`PricingCard`,asChild:!0,children:(e,t)=>{b(e,{min:`16rem`,columns:3,children:(e,t)=>{var n=H(),r=p(n);I(r,{name:`Starter`,price:0,description:`For trying things out.`,features:[`One workspace`,`3 projects`,{label:`Team roles`,included:!1}],ctaLabel:`Start for free`,onselect:()=>w()});var i=a(r,2);I(i,{name:`Team`,price:12,compareAt:15,period:`/ month`,note:`billed yearly`,description:`For small teams shipping together.`,features:[`Unlimited projects`,`Team roles and guests`,`Priority support`],highlighted:!0,badge:`Most popular`,ctaLabel:`Start free trial`,onselect:()=>w()});var o=a(i,2);I(o,{name:`Enterprise`,price:`Custom`,description:`Volume pricing, SSO and a success manager.`,features:[`Everything in Team`,`Single sign-on`,`Audit log`],ctaLabel:`Contact sales`,ctaHref:`#contact`}),f(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A free, a highlighted (selected layer) and a custom-priced plan.`}},__svelteCsf:{rawCode:`<Grid min="16rem" columns={3}>
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
</Grid>`}}});var g=a(h,2);z(g,{name:`Testimonial`,asChild:!0,children:(e,t)=>{S(e,{gap:`xl`,children:(e,t)=>{var n=V(),r=p(n);b(r,{min:`18rem`,children:(e,t)=>{var n=s(),r=p(n);u(r,1,()=>C,e=>e.name,(e,t)=>{M(e,{get quote(){return i(t).quote},get name(){return i(t).name},get role(){return i(t).role},get avatar(){return i(t).avatar},get rating(){return i(t).rating}})}),f(e,n)},$$slots:{default:!0}});var o=a(r,2);M(o,{size:`lg`,level:`ground`,quote:`The calmest tool we have ever rolled out. People just started using it.`,name:`Lena Vogt`,role:`COO, Example Labs`}),f(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Quotes in a grid, and the single large featured quote.`}},__svelteCsf:{rawCode:`<Stack gap="xl">
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
</Stack>`}}});var _=a(g,2);z(_,{name:`LogoCloud`,asChild:!0,children:(e,t)=>{O(e,{title:`Trusted by teams at`,get logos(){return T}})},$$slots:{default:!0},parameters:{docs:{description:{story:"Wordmarks from names, muted to one grey; images work the same with `src`."}},__svelteCsf:{rawCode:`<LogoCloud title="Trusted by teams at" {logos} />`}}});var v=a(_,2);z(v,{name:`NewsletterSignup`,asChild:!0,children:(e,t)=>{b(e,{min:`18rem`,gap:`xl`,children:(e,t)=>{var n=V(),r=p(n);A(r,{title:`Product updates`,text:`One short e-mail a month. No spam, unsubscribe any time.`,onsubscribe:async e=>{if(await w(),e.startsWith(`fail`))throw Error(`rejected`)}});var i=a(r,2);A(i,{layout:`stacked`,title:`Join the beta`,buttonLabel:`Request access`,onsubscribe:()=>w()}),f(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Try any address: success throws a small burst of sprinkles (the end of a task is where delight
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
</Grid>`}}}),f(e,r),t()}var R,z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q;function $(){return($=e((()=>{r(),o(),m(),h(),N(),D(),k(),P(),j(),y(),x(),E(),c(),g(),R={title:`Molecules/Website building blocks`,component:F,tags:[`autodocs`],parameters:{layout:`padded`},args:{icon:`bolt`,color:`orange`,title:`Instant sync`,text:`Every change lands on every device in milliseconds.`,iconStyle:`tinted`,level:`panel`,layout:`vertical`},argTypes:{iconStyle:{control:`inline-radio`,options:[`tinted`,`solid`]},level:{control:`inline-radio`,options:[`panel`,`ground`]},layout:{control:`inline-radio`,options:[`vertical`,`horizontal`]},color:{control:`select`,options:[`accent`,`blue`,`orange`,`green`,`purple`,`pink`,`teal`,`red`]}}},{Story:z}=_(R),B=n(`<!> <!> <!> <!>`,1),V=n(`<!> <!>`,1),H=n(`<!> <!> <!>`,1),U=n(`<!> <!> <!> <!> <!> <!> <!>`,1),L.__docgen={data:[],name:`Marketing.stories.svelte`},W=v(L,R),G=[`FeatureCard`,`FeatureCardStyles`,`FeatureCardOnTheGround`,`PricingCard`,`Testimonial`,`LogoCloud`,`NewsletterSignup`],K={...W.FeatureCard,tags:[`svelte-csf-v5`]},q={...W.FeatureCardStyles,tags:[`svelte-csf-v5`]},J={...W.FeatureCardOnTheGround,tags:[`svelte-csf-v5`]},Y={...W.PricingCard,tags:[`svelte-csf-v5`]},X={...W.Testimonial,tags:[`svelte-csf-v5`]},Z={...W.LogoCloud,tags:[`svelte-csf-v5`]},Q={...W.NewsletterSignup,tags:[`svelte-csf-v5`]}})))()}$();export{K as FeatureCard,J as FeatureCardOnTheGround,q as FeatureCardStyles,Z as LogoCloud,Q as NewsletterSignup,Y as PricingCard,X as Testimonial,G as __namedExportsOrder,R as default};