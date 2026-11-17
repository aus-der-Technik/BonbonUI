import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{At as t,Bt as n,Ct as r,En as i,Gt as a,Jt as o,Kt as s,N as c,Nn as l,Pt as u,St as d,V as f,Yt as p,_t as m,cn as h,ct as g,d as _,en as v,hn as y,jn as ee,l as b,mn as x,mt as S,nn as C,rt as w,wt as T,xt as E,z as D}from"./iframe-CRBWUEFv.js";import{i as te,n as O,r as k,t as A}from"./create-runtime-stories-DtoOt73Q.js";import{n as j,t as M}from"./Application-BPRUxoga.js";import{n as N,t as P}from"./Button-CVctU_KR.js";import{n as ne,t as F}from"./Input-LtZsVL1B.js";import{n as re,t as ie}from"./Select-DOm0NSxm.js";import{n as ae,t as I}from"./Field-Cx-WR2vM.js";import{i as oe,n as se}from"./space-Bksjy8Hf.js";import{n as ce,t as le}from"./Card-D32i3kW8.js";import{n as ue,t as de}from"./Section-Byz1upsT.js";import{n as fe,t as pe}from"./Page-C00D5PkX.js";import{n as me,t as L}from"./Stack-DW7rWz1x.js";import{n as he,t as ge}from"./Textarea-OcH4kAQW.js";import{l as _e,t as R}from"./mock-CoQSv9oT.js";import{n as ve,t as ye}from"./Markdown-CMTEvnhB.js";import{n as be,t as xe}from"./ResultPanel-BfoQDAaQ.js";import{n as Se,t as z}from"./AuthLayout-DqMlEpOW.js";import{n as Ce,t as we}from"./SignInCard-CFv3F0G0.js";function B(e,t){y(t,!0);let r=_(t,`imageAlt`,3,``),s=_(t,`backLabel`,3,`Go back`),l=_(t,`homeLabel`,3,`Home`),d={400:`That request did not look right.`,401:`Please sign in to see this page.`,403:`You do not have access to this page.`,404:`This page took a coffee break.`,500:`Something broke on our side.`,503:`We are down for a moment. Try again soon.`},f=h(()=>t.title??t.titles?.[String(t.code)]??d[String(t.code)]??`Something went wrong. Try again.`);function v(){t.onback?t.onback():history.back()}var b=U(),C=a(b),w=a(C),T=o(w,!0),D=p(w,2),te=o(D,!0),O=p(D,2),k=e=>{var r=V(),i=o(r,!0);n(()=>m(i,t.description)),E(e,r)};g(O,e=>{t.description&&e(k)});var A=p(O,2);S(A,()=>t.children??ee);var j=p(A,2),M=a(j);P(M,{variant:`primary`,shape:`pill`,size:`lg`,icon:`arrow-left`,get label(){return s()},onclick:v});var N=p(M,2),ne=e=>{P(e,{variant:`glass`,shape:`pill`,size:`lg`,get href(){return t.homeHref},icon:`home`,get label(){return l()}})};g(N,e=>{t.homeHref&&e(ne)}),i(j),i(C);var F=p(C,2),re=e=>{var n=Te(),r=a(n);S(r,()=>t.illustration),i(n),E(e,n)},ie=e=>{var i=H(),a=o(i);n(()=>{c(a,`src`,t.image),c(a,`alt`,r())}),E(e,i)};g(F,e=>{t.illustration?e(re):t.image&&e(ie,1)}),i(b),n(()=>{m(T,t.code),m(te,u(f))}),E(e,b),x()}var V,Te,H,U;function W(){return(W=e((()=>{l(),b(),N(),V=r(`<p class="description svelte-1na88sm"> </p>`),Te=r(`<div class="art svelte-1na88sm"><!></div>`),H=r(`<div class="art svelte-1na88sm"><img class="svelte-1na88sm"/></div>`),U=r(`<main class="error-page svelte-1na88sm"><div class="text"><p class="code svelte-1na88sm"> </p> <h1 class="svelte-1na88sm"> </h1> <!> <!> <div class="actions svelte-1na88sm"><!> <!></div></div> <!></main>`),B.__docgen={data:[{name:`code`,visibility:`public`,keywords:[{name:`required`,description:``}],kind:`let`,type:{kind:`union`,type:[{kind:`type`,type:`string`,text:`string`},{kind:`type`,type:`number`,text:`number`}],text:`string | number`},static:!1,readonly:!1},{name:`title`,visibility:`public`,description:"Defaults to a short line for the code (see `defaultTitles`).",keywords:[],kind:`let`,type:{kind:`type`,type:`string`,text:`string`},static:!1,readonly:!1},{name:`titles`,visibility:`public`,description:`Overrides the default titles per code.`,keywords:[],kind:`let`,type:{kind:`type`,type:`object`,text:`Record<string, string>`},static:!1,readonly:!1},{name:`description`,visibility:`public`,keywords:[],kind:`let`,type:{kind:`type`,type:`string`,text:`string`},static:!1,readonly:!1},{name:`image`,visibility:`public`,description:"An image URL; or pass the `illustration` snippet.",keywords:[],kind:`let`,type:{kind:`type`,type:`string`,text:`string`},static:!1,readonly:!1},{name:`imageAlt`,visibility:`public`,keywords:[],kind:`let`,type:{kind:`type`,type:`string`,text:`string`},static:!1,readonly:!1,defaultValue:`""`},{name:`backLabel`,visibility:`public`,keywords:[],kind:`let`,type:{kind:`type`,type:`string`,text:`string`},static:!1,readonly:!1,defaultValue:`"Go back"`},{name:`homeHref`,visibility:`public`,keywords:[],kind:`let`,type:{kind:`type`,type:`string`,text:`string`},static:!1,readonly:!1},{name:`homeLabel`,visibility:`public`,keywords:[],kind:`let`,type:{kind:`type`,type:`string`,text:`string`},static:!1,readonly:!1,defaultValue:`"Home"`},{name:`onback`,visibility:`public`,keywords:[],kind:`let`,type:{kind:`function`,text:`() => void`},static:!1,readonly:!1},{name:`illustration`,visibility:`public`,keywords:[],kind:`let`,type:{kind:`function`,text:`Snippet<[]>`},static:!1,readonly:!1},{name:`children`,visibility:`public`,keywords:[],kind:`let`,type:{kind:`function`,text:`Snippet<[]>`},static:!1,readonly:!1}],name:`ErrorPage.svelte`}})))()}function G(e,t){y(t,!0);let r=_(t,`asideWidth`,3,`minmax(20rem, 2fr)`),o=_(t,`sticky`,3,!0),s=_(t,`reverse`,3,!1),c=_(t,`gap`,3,`md`);var l=K();let u,d;var m=a(l);let h;var g=a(m);S(g,()=>t.aside),i(m);var v=p(m,2),ee=a(v);S(ee,()=>t.children),i(v),i(l),n(e=>{u=f(l,1,`split svelte-qn6rvp`,null,u,{reverse:s()}),d=D(l,``,d,{"--aside":r(),"--split-gap":e}),h=f(m,1,`svelte-qn6rvp`,null,h,{sticky:o()})},[()=>oe(c())]),E(e,l),x()}var K;function Ee(){return(Ee=e((()=>{l(),b(),se(),K=r(`<div><aside><!></aside> <div class="main svelte-qn6rvp"><!></div></div>`),G.__docgen={data:[{name:`asideWidth`,visibility:`public`,description:`Width of the aside column, e.g. "24rem" or "38%".`,keywords:[],kind:`let`,type:{kind:`type`,type:`string`,text:`string`},static:!1,readonly:!1,defaultValue:`"minmax(20rem, 2fr)"`},{name:`sticky`,visibility:`public`,description:`The aside stays in view while the results scroll.`,keywords:[],kind:`let`,type:{kind:`type`,type:`boolean`,text:`boolean`},static:!1,readonly:!1,defaultValue:`true`},{name:`reverse`,visibility:`public`,description:`The aside on the right instead of the left.`,keywords:[],kind:`let`,type:{kind:`type`,type:`boolean`,text:`boolean`},static:!1,readonly:!1,defaultValue:`false`},{name:`gap`,visibility:`public`,description:`Gap between the columns and between the children of each.`,keywords:[],kind:`let`,type:{kind:`union`,type:[{kind:`const`,type:`string`,value:`none`,text:`"none"`},{kind:`const`,type:`string`,value:`xs`,text:`"xs"`},{kind:`const`,type:`string`,value:`sm`,text:`"sm"`},{kind:`const`,type:`string`,value:`md`,text:`"md"`},{kind:`const`,type:`string`,value:`lg`,text:`"lg"`},{kind:`const`,type:`string`,value:`xl`,text:`"xl"`},{kind:`const`,type:`string`,value:`2xl`,text:`"2xl"`}],text:`"none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl"`},static:!1,readonly:!1,defaultValue:`"md"`},{name:`aside`,visibility:`public`,keywords:[{name:`required`,description:``}],kind:`let`,type:{kind:`function`,text:`Snippet<[]>`},static:!1,readonly:!1},{name:`children`,visibility:`public`,keywords:[{name:`required`,description:``}],kind:`let`,type:{kind:`function`,text:`Snippet<[]>`},static:!1,readonly:!1}],name:`SplitLayout.svelte`}})))()}function De(e,n){y(n,!0);let r=C(!1),o=C(`Which venues in Leipzig seat 300 people?`);var c=je(),l=s(c);J(l,{name:`AuthLayout`,asChild:!0,children:(e,n)=>{M(e,{children:(e,n)=>{z(e,{title:`Sign in`,greeting:!0,clock:!0,get links(){return Y},get shake(){return u(r)},children:(e,n)=>{var o=Oe(),c=a(o);L(c,{gap:`md`,children:(e,t)=>{var n=X(),r=s(n);de(r,{title:`Welcome back`,description:`Sign in with your work account.`,children:(e,t)=>{var n=X(),r=s(n);I(r,{label:`E-mail`,children:(e,t)=>{let n=()=>t?.().id;F(e,{get id(){return n()},type:`email`,value:`jane.doe@example.com`})},$$slots:{default:!0}});var i=p(r,2);I(i,{label:`Password`,children:(e,t)=>{let n=()=>t?.().id;F(e,{get id(){return n()},type:`password`,value:`wrong`})},$$slots:{default:!0}}),E(e,n)},$$slots:{default:!0}});var i=p(r,2);P(i,{type:`submit`,variant:`primary`,size:`lg`,label:`Sign in`}),E(e,n)},$$slots:{default:!0}}),i(o),t(`submit`,o,e=>{e.preventDefault(),v(r,!1),requestAnimationFrame(()=>v(r,!0))}),E(e,o)},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"A sign-in page: the sticky glass top bar with the brand bar, title, a friendly greeting\n    (`greeting`; hover it for the wink of the moment) and the clock, the form on a liquid-glass\n    card that eases in, legal links at the bottom. A wrong password gives the card a polite\n    head-shake (`shake`) — small, never for system errors."}},__svelteCsf:{rawCode:`<Application>
  <AuthLayout title="Sign in" greeting clock links={legal} shake={wrong}>
    <form
      onsubmit={(event) => {
        event.preventDefault();
        wrong = false;
        requestAnimationFrame(() => (wrong = true));
      }}
    >
      <Stack gap="md">
        <Section title="Welcome back" description="Sign in with your work account.">
          <Field label="E-mail">
            {#snippet children({ id })}<Input
                {id}
                type="email"
                value="jane.doe@example.com"
              />{/snippet}
          </Field>
          <Field label="Password">
            {#snippet children({ id })}<Input {id} type="password" value="wrong" />{/snippet}
          </Field>
        </Section>
        <Button type="submit" variant="primary" size="lg" label="Sign in" />
      </Stack>
    </form>
  </AuthLayout>
</Application>`}}});var f=p(l,2);J(f,{name:`AuthLayout with a background`,asChild:!0,children:(e,t)=>{M(e,{children:(e,t)=>{z(e,{title:`Workspace`,clock:!0,card:!1,get links(){return Y},background:`linear-gradient(160deg, var(--color-indigo), var(--color-purple) 55%, var(--color-orange))`,children:(e,t)=>{we(e,{title:`Sign in to continue`,text:`Use your work account. We never see your password.`,align:`center`,onsignin:()=>{}})},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"`background` takes any CSS background — a photo, an `image-set(…)` or, here, a gradient;\n    the legal links then sit on a frosted pill. `card={false}` lets a SignInCard bring its own."}},__svelteCsf:{rawCode:`<Application>
  <AuthLayout
    title="Workspace"
    clock
    card={false}
    links={legal}
    background="linear-gradient(160deg, var(--color-indigo), var(--color-purple) 55%, var(--color-orange))"
  >
    <SignInCard
      title="Sign in to continue"
      text="Use your work account. We never see your password."
      align="center"
      onsignin={() => {}}
    />
  </AuthLayout>
</Application>`}}});var m=p(f,2);J(m,{name:`ErrorPage`,asChild:!0,children:(e,t)=>{M(e,{children:(e,t)=>{B(e,{code:404,description:`The link may be old, or the page was moved.`,homeHref:`#`,onback:()=>{}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A 404: the code in a candy gradient of the tint, "Go back" and a home link. Without a \`title\`
    the common codes bring a short default; for a 404 "This page took a coffee break." (a wink is
    fine here; the description says plainly what happened).`}},__svelteCsf:{rawCode:`<Application>
  <ErrorPage
    code={404}
    description="The link may be old, or the page was moved."
    homeHref="#"
    onback={() => {}}
  />
</Application>`}}});var h=p(m,2);J(h,{name:`ErrorPage with illustration`,asChild:!0,children:(e,t)=>{M(e,{children:(e,t)=>{B(e,{code:500,title:`Something broke on our side`,description:`We have been notified. Try again in a few minutes.`,onback:()=>{},illustration:e=>{var t=ke();E(e,t)},$$slots:{illustration:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"With an `illustration` snippet: it floats gently beside the text (above it on phones). A 500\n    stays plain: say what happened and what to do, no jokes."}},__svelteCsf:{rawCode:`<Application>
  <ErrorPage
    code={500}
    title="Something broke on our side"
    description="We have been notified. Try again in a few minutes."
    onback={() => {}}
  >
    {#snippet illustration()}
      <svg viewBox="0 0 200 160" width="280" aria-hidden="true">
        <ellipse cx="80" cy="95" rx="42" ry="55" fill="var(--tint-200)" />
        <ellipse cx="128" cy="100" rx="38" ry="50" fill="var(--accent-soft)" />
        <circle cx="70" cy="85" r="5" fill="var(--text)" />
        <circle cx="92" cy="85" r="5" fill="var(--text)" />
        <circle cx="120" cy="92" r="5" fill="var(--text)" />
        <circle cx="140" cy="92" r="5" fill="var(--text)" />
      </svg>
    {/snippet}
  </ErrorPage>
</Application>`}}});var g=p(h,2);J(g,{name:`SplitLayout`,asChild:!0,children:(e,t)=>{M(e,{children:(e,t)=>{pe(e,{title:`Assistant`,subtitle:`ask the venue database`,children:(e,t)=>{G(e,{aside:e=>{le(e,{title:`Question`,children:(e,t)=>{L(e,{gap:`md`,children:(e,t)=>{var n=Ae(),r=s(n);ge(r,{"aria-label":`Question`,counter:!0,limit:500,get value(){return u(o)},set value(e){v(o,e,!0)}});var i=p(r,2);I(i,{label:`Answer in`,children:(e,t)=>{let n=()=>t?.().id;ie(e,{get id(){return n()},value:`en`,options:[{value:`en`,label:`English`},{value:`de`,label:`German`}]})},$$slots:{default:!0}});var a=p(i,2);P(a,{variant:`primary`,icon:`send`,label:`Ask`}),E(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}})},children:(e,t)=>{var n=d(),r=s(n);w(r,16,()=>[1,2,3],e=>e,(e,t)=>{xe(e,{status:`ready`,get title(){return`Answer ${t??``}`},get copyValue(){return R},children:(e,t)=>{ye(e,{get source(){return R},size:`sm`})},$$slots:{default:!0}})}),E(e,n)},$$slots:{aside:!0,default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A tool page: the question stays in view (sticky, below the page header) while the answers
    scroll. Folds to one column below 960px.`}},__svelteCsf:{rawCode:`<Application>
  <Page title="Assistant" subtitle="ask the venue database">
    <SplitLayout>
      {#snippet aside()}
        <Card title="Question">
          <Stack gap="md">
            <Textarea bind:value={question} aria-label="Question" counter limit={500} />
            <Field label="Answer in">
              {#snippet children({ id })}<Select
                  {id}
                  value="en"
                  options={[
                    { value: 'en', label: 'English' },
                    { value: 'de', label: 'German' },
                  ]}
                />{/snippet}
            </Field>
            <Button variant="primary" icon="send" label="Ask" />
          </Stack>
        </Card>
      {/snippet}
      {#each [1, 2, 3] as n (n)}
        <ResultPanel status="ready" title="Answer {n}" copyValue={ANSWER}>
          <Markdown source={ANSWER} size="sm" />
        </ResultPanel>
      {/each}
    </SplitLayout>
  </Page>
</Application>`}}}),E(e,c),x()}var q,J,Y,X,Oe,ke,Ae,je,Z,Q,Me,Ne,Pe,Fe,Ie;function $(){return($=e((()=>{l(),te(),j(),Se(),W(),fe(),Ee(),N(),ce(),ne(),re(),he(),ae(),ve(),Ce(),be(),ue(),me(),_e(),b(),O(),q={title:`Templates/Auth, error & split layouts`,component:z,tags:[`autodocs`],parameters:{layout:`fullscreen`}},{Story:J}=k(q),Y=[{label:`Imprint`,href:`#`},{label:`Privacy`,href:`#`},{label:`Help`,href:`#`}],X=r(`<!> <!>`,1),Oe=r(`<form><!></form>`),ke=T(`<svg viewBox="0 0 200 160" width="280" aria-hidden="true"><ellipse cx="80" cy="95" rx="42" ry="55" fill="var(--tint-200)"></ellipse><ellipse cx="128" cy="100" rx="38" ry="50" fill="var(--accent-soft)"></ellipse><circle cx="70" cy="85" r="5" fill="var(--text)"></circle><circle cx="92" cy="85" r="5" fill="var(--text)"></circle><circle cx="120" cy="92" r="5" fill="var(--text)"></circle><circle cx="140" cy="92" r="5" fill="var(--text)"></circle></svg>`),Ae=r(`<!> <!> <!>`,1),je=r(`<!> <!> <!> <!> <!>`,1),De.__docgen={data:[],name:`Pages.stories.svelte`},Z=A(De,q),Q=[`AuthLayout`,`AuthLayoutWithABackground`,`ErrorPage`,`ErrorPageWithIllustration`,`SplitLayout`],Me={...Z.AuthLayout,tags:[`svelte-csf-v5`]},Ne={...Z.AuthLayoutWithABackground,tags:[`svelte-csf-v5`]},Pe={...Z.ErrorPage,tags:[`svelte-csf-v5`]},Fe={...Z.ErrorPageWithIllustration,tags:[`svelte-csf-v5`]},Ie={...Z.SplitLayout,tags:[`svelte-csf-v5`]}})))()}$();export{Me as AuthLayout,Ne as AuthLayoutWithABackground,Pe as ErrorPage,Fe as ErrorPageWithIllustration,Ie as SplitLayout,Q as __namedExportsOrder,q as default};