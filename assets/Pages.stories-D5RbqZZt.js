import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Ct as t,Kt as n,Mt as r,N as i,Qt as a,Rt as o,St as s,Ut as c,V as l,Wt as u,_t as d,bt as f,ct as p,d as m,en as h,fn as g,jn as _,kn as v,kt as y,l as b,mt as x,on as ee,pn as S,qt as C,rt as w,wn as T,xt as te,z as E}from"./iframe-CWg4yaha.js";import{i as ne,n as D,r as O,t as k}from"./create-runtime-stories-DQq0d2lF.js";import{n as A,t as j}from"./Application-DVTIfP80.js";import{n as M,t as N}from"./Button-D4mD58qs.js";import{n as re,t as P}from"./Input-Ddly8GKm.js";import{n as ie,t as ae}from"./Select-d4ExxEvy.js";import{n as oe,t as F}from"./Field-CHlHeAR8.js";import{i as se,n as ce}from"./space-Bksjy8Hf.js";import{n as le,t as ue}from"./Card-5RIl20Vt.js";import{n as de,t as fe}from"./Section-Cw7ZSgtY.js";import{n as pe,t as me}from"./Page-BiM3_R6X.js";import{n as he,t as I}from"./Stack-vorXuMUJ.js";import{n as ge,t as _e}from"./Textarea-DJ9QtN5_.js";import{l as ve,t as L}from"./mock-CoQSv9oT.js";import{n as ye,t as be}from"./Markdown-B-BV_6yR.js";import{n as xe,t as Se}from"./ResultPanel-0F0td5Dl.js";import{n as Ce,t as R}from"./AuthLayout-CnLCtizd.js";import{n as we,t as Te}from"./SignInCard-xqB61wvI.js";function z(e,t){S(t,!0);let a=m(t,`imageAlt`,3,``),s=m(t,`backLabel`,3,`Go back`),l=m(t,`homeLabel`,3,`Home`),u={400:`That request did not look right.`,401:`Please sign in to see this page.`,403:`You do not have access to this page.`,404:`This page took a coffee break.`,500:`Something broke on our side.`,503:`We are down for a moment. Try again soon.`},h=ee(()=>t.title??t.titles?.[String(t.code)]??u[String(t.code)]??`Something went wrong. Try again.`);function _(){t.onback?t.onback():history.back()}var y=H(),b=c(y),w=c(b),te=n(w,!0),E=C(w,2),ne=n(E,!0),D=C(E,2),O=e=>{var r=B(),i=n(r,!0);o(()=>d(i,t.description)),f(e,r)};p(D,e=>{t.description&&e(O)});var k=C(D,2);x(k,()=>t.children??v);var A=C(k,2),j=c(A);N(j,{variant:`primary`,shape:`pill`,size:`lg`,icon:`arrow-left`,get label(){return s()},onclick:_});var M=C(j,2),re=e=>{N(e,{variant:`glass`,shape:`pill`,size:`lg`,get href(){return t.homeHref},icon:`home`,get label(){return l()}})};p(M,e=>{t.homeHref&&e(re)}),T(A),T(b);var P=C(b,2),ie=e=>{var n=Ee(),r=c(n);x(r,()=>t.illustration),T(n),f(e,n)},ae=e=>{var r=V(),s=n(r);o(()=>{i(s,`src`,t.image),i(s,`alt`,a())}),f(e,r)};p(P,e=>{t.illustration?e(ie):t.image&&e(ae,1)}),T(y),o(()=>{d(te,t.code),d(ne,r(h))}),f(e,y),g()}var B,Ee,V,H;function U(){return(U=e((()=>{_(),b(),M(),B=s(`<p class="description svelte-1na88sm"> </p>`),Ee=s(`<div class="art svelte-1na88sm"><!></div>`),V=s(`<div class="art svelte-1na88sm"><img class="svelte-1na88sm"/></div>`),H=s(`<main class="error-page svelte-1na88sm"><div class="text"><p class="code svelte-1na88sm"> </p> <h1 class="svelte-1na88sm"> </h1> <!> <!> <div class="actions svelte-1na88sm"><!> <!></div></div> <!></main>`),z.__docgen={data:[{name:`code`,visibility:`public`,keywords:[{name:`required`,description:``}],kind:`let`,type:{kind:`union`,type:[{kind:`type`,type:`string`,text:`string`},{kind:`type`,type:`number`,text:`number`}],text:`string | number`},static:!1,readonly:!1},{name:`title`,visibility:`public`,description:"Defaults to a short line for the code (see `defaultTitles`).",keywords:[],kind:`let`,type:{kind:`type`,type:`string`,text:`string`},static:!1,readonly:!1},{name:`titles`,visibility:`public`,description:`Overrides the default titles per code.`,keywords:[],kind:`let`,type:{kind:`type`,type:`object`,text:`Record<string, string>`},static:!1,readonly:!1},{name:`description`,visibility:`public`,keywords:[],kind:`let`,type:{kind:`type`,type:`string`,text:`string`},static:!1,readonly:!1},{name:`image`,visibility:`public`,description:"An image URL; or pass the `illustration` snippet.",keywords:[],kind:`let`,type:{kind:`type`,type:`string`,text:`string`},static:!1,readonly:!1},{name:`imageAlt`,visibility:`public`,keywords:[],kind:`let`,type:{kind:`type`,type:`string`,text:`string`},static:!1,readonly:!1,defaultValue:`""`},{name:`backLabel`,visibility:`public`,keywords:[],kind:`let`,type:{kind:`type`,type:`string`,text:`string`},static:!1,readonly:!1,defaultValue:`"Go back"`},{name:`homeHref`,visibility:`public`,keywords:[],kind:`let`,type:{kind:`type`,type:`string`,text:`string`},static:!1,readonly:!1},{name:`homeLabel`,visibility:`public`,keywords:[],kind:`let`,type:{kind:`type`,type:`string`,text:`string`},static:!1,readonly:!1,defaultValue:`"Home"`},{name:`onback`,visibility:`public`,keywords:[],kind:`let`,type:{kind:`function`,text:`() => void`},static:!1,readonly:!1},{name:`illustration`,visibility:`public`,keywords:[],kind:`let`,type:{kind:`function`,text:`Snippet<[]>`},static:!1,readonly:!1},{name:`children`,visibility:`public`,keywords:[],kind:`let`,type:{kind:`function`,text:`Snippet<[]>`},static:!1,readonly:!1}],name:`ErrorPage.svelte`}})))()}function W(e,t){S(t,!0);let n=m(t,`asideWidth`,3,`minmax(20rem, 2fr)`),r=m(t,`sticky`,3,!0),i=m(t,`reverse`,3,!1),a=m(t,`gap`,3,`md`);var s=G();let u,d;var p=c(s);let h;var _=c(p);x(_,()=>t.aside),T(p);var v=C(p,2),y=c(v);x(y,()=>t.children),T(v),T(s),o(e=>{u=l(s,1,`split svelte-qn6rvp`,null,u,{reverse:i()}),d=E(s,``,d,{"--aside":n(),"--split-gap":e}),h=l(p,1,`svelte-qn6rvp`,null,h,{sticky:r()})},[()=>se(a())]),f(e,s),g()}var G;function K(){return(K=e((()=>{_(),b(),ce(),G=s(`<div><aside><!></aside> <div class="main svelte-qn6rvp"><!></div></div>`),W.__docgen={data:[{name:`asideWidth`,visibility:`public`,description:`Width of the aside column, e.g. "24rem" or "38%".`,keywords:[],kind:`let`,type:{kind:`type`,type:`string`,text:`string`},static:!1,readonly:!1,defaultValue:`"minmax(20rem, 2fr)"`},{name:`sticky`,visibility:`public`,description:`The aside stays in view while the results scroll.`,keywords:[],kind:`let`,type:{kind:`type`,type:`boolean`,text:`boolean`},static:!1,readonly:!1,defaultValue:`true`},{name:`reverse`,visibility:`public`,description:`The aside on the right instead of the left.`,keywords:[],kind:`let`,type:{kind:`type`,type:`boolean`,text:`boolean`},static:!1,readonly:!1,defaultValue:`false`},{name:`gap`,visibility:`public`,description:`Gap between the columns and between the children of each.`,keywords:[],kind:`let`,type:{kind:`union`,type:[{kind:`const`,type:`string`,value:`none`,text:`"none"`},{kind:`const`,type:`string`,value:`xs`,text:`"xs"`},{kind:`const`,type:`string`,value:`sm`,text:`"sm"`},{kind:`const`,type:`string`,value:`md`,text:`"md"`},{kind:`const`,type:`string`,value:`lg`,text:`"lg"`},{kind:`const`,type:`string`,value:`xl`,text:`"xl"`},{kind:`const`,type:`string`,value:`2xl`,text:`"2xl"`}],text:`"none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl"`},static:!1,readonly:!1,defaultValue:`"md"`},{name:`aside`,visibility:`public`,keywords:[{name:`required`,description:``}],kind:`let`,type:{kind:`function`,text:`Snippet<[]>`},static:!1,readonly:!1},{name:`children`,visibility:`public`,keywords:[{name:`required`,description:``}],kind:`let`,type:{kind:`function`,text:`Snippet<[]>`},static:!1,readonly:!1}],name:`SplitLayout.svelte`}})))()}function De(e,t){S(t,!0);let n=h(!1),i=h(`Which venues in Leipzig seat 300 people?`);var o=je(),s=u(o);J(s,{name:`AuthLayout`,asChild:!0,children:(e,t)=>{j(e,{children:(e,t)=>{R(e,{title:`Sign in`,greeting:!0,clock:!0,get links(){return Y},get shake(){return r(n)},children:(e,t)=>{var r=Oe(),i=c(r);I(i,{gap:`md`,children:(e,t)=>{var n=X(),r=u(n);fe(r,{title:`Welcome back`,description:`Sign in with your work account.`,children:(e,t)=>{var n=X(),r=u(n);F(r,{label:`E-mail`,children:(e,t)=>{let n=()=>t?.().id;P(e,{get id(){return n()},type:`email`,value:`jane.doe@example.com`})},$$slots:{default:!0}});var i=C(r,2);F(i,{label:`Password`,children:(e,t)=>{let n=()=>t?.().id;P(e,{get id(){return n()},type:`password`,value:`wrong`})},$$slots:{default:!0}}),f(e,n)},$$slots:{default:!0}});var i=C(r,2);N(i,{type:`submit`,variant:`primary`,size:`lg`,label:`Sign in`}),f(e,n)},$$slots:{default:!0}}),T(r),y(`submit`,r,e=>{e.preventDefault(),a(n,!1),requestAnimationFrame(()=>a(n,!0))}),f(e,r)},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"A sign-in page: the sticky glass top bar with the brand bar, title, a friendly greeting\n    (`greeting`; hover it for the wink of the moment) and the clock, the form on a liquid-glass\n    card that eases in, legal links at the bottom. A wrong password gives the card a polite\n    head-shake (`shake`) — small, never for system errors."}},__svelteCsf:{rawCode:`<Application>
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
</Application>`}}});var l=C(s,2);J(l,{name:`AuthLayout with a background`,asChild:!0,children:(e,t)=>{j(e,{children:(e,t)=>{R(e,{title:`Workspace`,clock:!0,card:!1,get links(){return Y},background:`linear-gradient(160deg, var(--color-indigo), var(--color-purple) 55%, var(--color-orange))`,children:(e,t)=>{Te(e,{title:`Sign in to continue`,text:`Use your work account. We never see your password.`,align:`center`,onsignin:()=>{}})},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"`background` takes any CSS background — a photo, an `image-set(…)` or, here, a gradient;\n    the legal links then sit on a frosted pill. `card={false}` lets a SignInCard bring its own."}},__svelteCsf:{rawCode:`<Application>
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
</Application>`}}});var d=C(l,2);J(d,{name:`ErrorPage`,asChild:!0,children:(e,t)=>{j(e,{children:(e,t)=>{z(e,{code:404,description:`The link may be old, or the page was moved.`,homeHref:`#`,onback:()=>{}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A 404: the code in a candy gradient of the tint, "Go back" and a home link. Without a \`title\`
    the common codes bring a short default; for a 404 "This page took a coffee break." (a wink is
    fine here; the description says plainly what happened).`}},__svelteCsf:{rawCode:`<Application>
  <ErrorPage
    code={404}
    description="The link may be old, or the page was moved."
    homeHref="#"
    onback={() => {}}
  />
</Application>`}}});var p=C(d,2);J(p,{name:`ErrorPage with illustration`,asChild:!0,children:(e,t)=>{j(e,{children:(e,t)=>{z(e,{code:500,title:`Something broke on our side`,description:`We have been notified. Try again in a few minutes.`,onback:()=>{},illustration:e=>{var t=ke();f(e,t)},$$slots:{illustration:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"With an `illustration` snippet: it floats gently beside the text (above it on phones). A 500\n    stays plain: say what happened and what to do, no jokes."}},__svelteCsf:{rawCode:`<Application>
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
</Application>`}}});var m=C(p,2);J(m,{name:`SplitLayout`,asChild:!0,children:(e,t)=>{j(e,{children:(e,t)=>{me(e,{title:`Assistant`,subtitle:`ask the venue database`,children:(e,t)=>{W(e,{aside:e=>{ue(e,{title:`Question`,children:(e,t)=>{I(e,{gap:`md`,children:(e,t)=>{var n=Ae(),o=u(n);_e(o,{"aria-label":`Question`,counter:!0,limit:500,get value(){return r(i)},set value(e){a(i,e,!0)}});var s=C(o,2);F(s,{label:`Answer in`,children:(e,t)=>{let n=()=>t?.().id;ae(e,{get id(){return n()},value:`en`,options:[{value:`en`,label:`English`},{value:`de`,label:`German`}]})},$$slots:{default:!0}});var c=C(s,2);N(c,{variant:`primary`,icon:`send`,label:`Ask`}),f(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}})},children:(e,t)=>{var n=te(),r=u(n);w(r,16,()=>[1,2,3],e=>e,(e,t)=>{Se(e,{status:`ready`,get title(){return`Answer ${t??``}`},get copyValue(){return L},children:(e,t)=>{be(e,{get source(){return L},size:`sm`})},$$slots:{default:!0}})}),f(e,n)},$$slots:{aside:!0,default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A tool page: the question stays in view (sticky, below the page header) while the answers
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
</Application>`}}}),f(e,o),g()}var q,J,Y,X,Oe,ke,Ae,je,Z,Q,Me,Ne,Pe,Fe,Ie;function $(){return($=e((()=>{_(),ne(),A(),Ce(),U(),pe(),K(),M(),le(),re(),ie(),ge(),oe(),ye(),we(),xe(),de(),he(),ve(),b(),D(),q={title:`Templates/Auth, error & split layouts`,component:R,tags:[`autodocs`],parameters:{layout:`fullscreen`}},{Story:J}=O(q),Y=[{label:`Imprint`,href:`#`},{label:`Privacy`,href:`#`},{label:`Help`,href:`#`}],X=s(`<!> <!>`,1),Oe=s(`<form><!></form>`),ke=t(`<svg viewBox="0 0 200 160" width="280" aria-hidden="true"><ellipse cx="80" cy="95" rx="42" ry="55" fill="var(--tint-200)"></ellipse><ellipse cx="128" cy="100" rx="38" ry="50" fill="var(--accent-soft)"></ellipse><circle cx="70" cy="85" r="5" fill="var(--text)"></circle><circle cx="92" cy="85" r="5" fill="var(--text)"></circle><circle cx="120" cy="92" r="5" fill="var(--text)"></circle><circle cx="140" cy="92" r="5" fill="var(--text)"></circle></svg>`),Ae=s(`<!> <!> <!>`,1),je=s(`<!> <!> <!> <!> <!>`,1),De.__docgen={data:[],name:`Pages.stories.svelte`},Z=k(De,q),Q=[`AuthLayout`,`AuthLayoutWithABackground`,`ErrorPage`,`ErrorPageWithIllustration`,`SplitLayout`],Me={...Z.AuthLayout,tags:[`svelte-csf-v5`]},Ne={...Z.AuthLayoutWithABackground,tags:[`svelte-csf-v5`]},Pe={...Z.ErrorPage,tags:[`svelte-csf-v5`]},Fe={...Z.ErrorPageWithIllustration,tags:[`svelte-csf-v5`]},Ie={...Z.SplitLayout,tags:[`svelte-csf-v5`]}})))()}$();export{Me as AuthLayout,Ne as AuthLayoutWithABackground,Pe as ErrorPage,Fe as ErrorPageWithIllustration,Ie as SplitLayout,Q as __namedExportsOrder,q as default};