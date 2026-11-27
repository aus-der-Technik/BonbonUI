import{n as e}from"./rolldown-runtime-Dxh6kD9_.js";import{$t as t,At as n,Ct as r,Ft as i,Gt as a,Ht as o,Mn as s,N as c,On as l,Pt as u,Rt as d,Sn as f,St as p,V as m,Vt as h,_t as g,cn as _,ct as v,d as y,hn as ee,l as b,mt as x,on as S,tt as C,wt as te,xn as w,xt as T,z as E,zt as D}from"./iframe-WlNMZtZ0.js";import{i as O,n as k,r as A,t as j}from"./create-runtime-stories-CbHiKinS.js";import{n as M,t as N}from"./Application-gndBgxdC.js";import{n as P,t as F}from"./Button-DHLILcYm.js";import{n as I,t as L}from"./Input-DeTI9rlx.js";import{n as ne,t as re}from"./Select-CYAMxfVl.js";import{n as ie,t as R}from"./Field-DtdH1dfq.js";import{i as ae,n as oe}from"./space-BXmrXuBq.js";import{n as se,t as ce}from"./Card-BqZAAHlF.js";import{n as le,t as ue}from"./Section-D4Qa1FIu.js";import{n as de,t as fe}from"./Page-BsPJj6zC.js";import{n as pe,t as z}from"./Stack-BjV-rmuj.js";import{n as me,t as he}from"./Textarea-C7wLXt7k.js";import{l as ge,t as B}from"./mock-CO6eygD8.js";import{n as _e,t as ve}from"./Markdown-CkYwfUbE.js";import{n as ye,t as be}from"./ResultPanel-DafhIunu.js";import{n as xe,t as V}from"./AuthLayout-C5nxTHLD.js";import{n as Se,t as Ce}from"./SignInCard-rzl6SYcP.js";function H(e,n){f(n,!0);let r=y(n,`imageAlt`,3,``),i=y(n,`backLabel`,3,`Go back`),u=y(n,`homeLabel`,3,`Home`),p={400:`That request did not look right.`,401:`Please sign in to see this page.`,403:`You do not have access to this page.`,404:`This page took a coffee break.`,500:`Something broke on our side.`,503:`We are down for a moment. Try again soon.`},m=ee(()=>n.title??n.titles?.[String(n.code)]??p[String(n.code)]??`Something went wrong. Try again.`);function _(){n.onback?n.onback():history.back()}var b=K(),S=d(b),C=d(S),te=h(C,!0),E=o(C,2),D=h(E,!0),O=o(E,2),k=e=>{var r=U(),i=h(r,!0);t(()=>g(i,n.description)),T(e,r)};v(O,e=>{n.description&&e(k)});var A=o(O,2);x(A,()=>n.children??l);var j=o(A,2),M=d(j);F(M,{variant:`primary`,shape:`pill`,size:`lg`,icon:`arrow-left`,get label(){return i()},onclick:_});var N=o(M,2),P=e=>{F(e,{variant:`glass`,shape:`pill`,size:`lg`,get href(){return n.homeHref},icon:`home`,get label(){return u()}})};v(N,e=>{n.homeHref&&e(P)}),s(j),s(S);var I=o(S,2),L=e=>{var t=W(),r=d(t);x(r,()=>n.illustration),s(t),T(e,t)},ne=e=>{var i=G(),a=h(i);t(()=>{c(a,`src`,n.image),c(a,`alt`,r())}),T(e,i)};v(I,e=>{n.illustration?e(L):n.image&&e(ne,1)}),s(b),t(()=>{g(te,n.code),g(D,a(m))}),T(e,b),w()}var U,W,G,K;function we(){return(we=e((()=>{i(),u(),b(),P(),U=r(`<p class="description svelte-1na88sm"> </p>`),W=r(`<div class="art svelte-1na88sm"><!></div>`),G=r(`<div class="art svelte-1na88sm"><img class="svelte-1na88sm"/></div>`),K=r(`<main class="error-page svelte-1na88sm"><div class="text"><p class="code svelte-1na88sm"> </p> <h1 class="svelte-1na88sm"> </h1> <!> <!> <div class="actions svelte-1na88sm"><!> <!></div></div> <!></main>`),H.__docgen={data:[{name:`code`,visibility:`public`,keywords:[{name:`required`,description:``}],kind:`let`,type:{kind:`union`,type:[{kind:`type`,type:`string`,text:`string`},{kind:`type`,type:`number`,text:`number`}],text:`string | number`},static:!1,readonly:!1},{name:`title`,visibility:`public`,description:"Defaults to a short line for the code (see `defaultTitles`).",keywords:[],kind:`let`,type:{kind:`type`,type:`string`,text:`string`},static:!1,readonly:!1},{name:`titles`,visibility:`public`,description:`Overrides the default titles per code.`,keywords:[],kind:`let`,type:{kind:`type`,type:`object`,text:`Record<string, string>`},static:!1,readonly:!1},{name:`description`,visibility:`public`,keywords:[],kind:`let`,type:{kind:`type`,type:`string`,text:`string`},static:!1,readonly:!1},{name:`image`,visibility:`public`,description:"An image URL; or pass the `illustration` snippet.",keywords:[],kind:`let`,type:{kind:`type`,type:`string`,text:`string`},static:!1,readonly:!1},{name:`imageAlt`,visibility:`public`,keywords:[],kind:`let`,type:{kind:`type`,type:`string`,text:`string`},static:!1,readonly:!1,defaultValue:`""`},{name:`backLabel`,visibility:`public`,keywords:[],kind:`let`,type:{kind:`type`,type:`string`,text:`string`},static:!1,readonly:!1,defaultValue:`"Go back"`},{name:`homeHref`,visibility:`public`,keywords:[],kind:`let`,type:{kind:`type`,type:`string`,text:`string`},static:!1,readonly:!1},{name:`homeLabel`,visibility:`public`,keywords:[],kind:`let`,type:{kind:`type`,type:`string`,text:`string`},static:!1,readonly:!1,defaultValue:`"Home"`},{name:`onback`,visibility:`public`,keywords:[],kind:`let`,type:{kind:`function`,text:`() => void`},static:!1,readonly:!1},{name:`illustration`,visibility:`public`,keywords:[],kind:`let`,type:{kind:`function`,text:`Snippet<[]>`},static:!1,readonly:!1},{name:`children`,visibility:`public`,keywords:[],kind:`let`,type:{kind:`function`,text:`Snippet<[]>`},static:!1,readonly:!1}],name:`ErrorPage.svelte`}})))()}function Te(e,n){f(n,!0);let r=y(n,`asideWidth`,3,`minmax(20rem, 2fr)`),i=y(n,`sticky`,3,!0),a=y(n,`reverse`,3,!1),c=y(n,`gap`,3,`md`);var l=Ee();let u,p;var h=d(l);let g;var _=d(h);x(_,()=>n.aside),s(h);var v=o(h,2),ee=d(v);x(ee,()=>n.children),s(v),s(l),t(e=>{u=m(l,1,`split svelte-qn6rvp`,null,u,{reverse:a()}),p=E(l,``,p,{"--aside":r(),"--split-gap":e}),g=m(h,1,`svelte-qn6rvp`,null,g,{sticky:i()})},[()=>ae(c())]),T(e,l),w()}var Ee;function De(){return(De=e((()=>{i(),u(),b(),oe(),Ee=r(`<div><aside><!></aside> <div class="main svelte-qn6rvp"><!></div></div>`),Te.__docgen={data:[{name:`asideWidth`,visibility:`public`,description:`Width of the aside column, e.g. "24rem" or "38%".`,keywords:[],kind:`let`,type:{kind:`type`,type:`string`,text:`string`},static:!1,readonly:!1,defaultValue:`"minmax(20rem, 2fr)"`},{name:`sticky`,visibility:`public`,description:`The aside stays in view while the results scroll.`,keywords:[],kind:`let`,type:{kind:`type`,type:`boolean`,text:`boolean`},static:!1,readonly:!1,defaultValue:`true`},{name:`reverse`,visibility:`public`,description:`The aside on the right instead of the left.`,keywords:[],kind:`let`,type:{kind:`type`,type:`boolean`,text:`boolean`},static:!1,readonly:!1,defaultValue:`false`},{name:`gap`,visibility:`public`,description:`Gap between the columns and between the children of each.`,keywords:[],kind:`let`,type:{kind:`union`,type:[{kind:`const`,type:`string`,value:`none`,text:`"none"`},{kind:`const`,type:`string`,value:`xs`,text:`"xs"`},{kind:`const`,type:`string`,value:`sm`,text:`"sm"`},{kind:`const`,type:`string`,value:`md`,text:`"md"`},{kind:`const`,type:`string`,value:`lg`,text:`"lg"`},{kind:`const`,type:`string`,value:`xl`,text:`"xl"`},{kind:`const`,type:`string`,value:`2xl`,text:`"2xl"`}],text:`"none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl"`},static:!1,readonly:!1,defaultValue:`"md"`},{name:`aside`,visibility:`public`,keywords:[{name:`required`,description:``}],kind:`let`,type:{kind:`function`,text:`Snippet<[]>`},static:!1,readonly:!1},{name:`children`,visibility:`public`,keywords:[{name:`required`,description:``}],kind:`let`,type:{kind:`function`,text:`Snippet<[]>`},static:!1,readonly:!1}],name:`SplitLayout.svelte`}})))()}function Oe(e,t){f(t,!0);let r=_(!1),i=_(`Which venues in Leipzig seat 300 people?`);var c=Me(),l=D(c);J(l,{name:`AuthLayout`,asChild:!0,children:(e,t)=>{N(e,{children:(e,t)=>{V(e,{title:`Sign in`,greeting:!0,clock:!0,get links(){return Y},get shake(){return a(r)},children:(e,t)=>{var i=ke(),a=d(i);z(a,{gap:`md`,children:(e,t)=>{var n=X(),r=D(n);ue(r,{title:`Welcome back`,description:`Sign in with your work account.`,children:(e,t)=>{var n=X(),r=D(n);R(r,{label:`E-mail`,children:(e,t)=>{let n=()=>t?.().id;L(e,{get id(){return n()},type:`email`,value:`jane.doe@example.com`})},$$slots:{default:!0}});var i=o(r,2);R(i,{label:`Password`,children:(e,t)=>{let n=()=>t?.().id;L(e,{get id(){return n()},type:`password`,value:`wrong`})},$$slots:{default:!0}}),T(e,n)},$$slots:{default:!0}});var i=o(r,2);F(i,{type:`submit`,variant:`primary`,size:`lg`,label:`Sign in`}),T(e,n)},$$slots:{default:!0}}),s(i),n(`submit`,i,e=>{e.preventDefault(),S(r,!1),requestAnimationFrame(()=>S(r,!0))}),T(e,i)},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"A sign-in page: the sticky glass top bar with the brand bar, title, a friendly greeting\n    (`greeting`; hover it for the wink of the moment) and the clock, the form on a liquid-glass\n    card that eases in, legal links at the bottom. A wrong password gives the card a polite\n    head-shake (`shake`) — small, never for system errors."}},__svelteCsf:{rawCode:`<Application>
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
</Application>`}}});var u=o(l,2);J(u,{name:`AuthLayout with a background`,asChild:!0,children:(e,t)=>{N(e,{children:(e,t)=>{V(e,{title:`Workspace`,clock:!0,card:!1,get links(){return Y},background:`linear-gradient(160deg, var(--color-indigo), var(--color-purple) 55%, var(--color-orange))`,children:(e,t)=>{Ce(e,{title:`Sign in to continue`,text:`Use your work account. We never see your password.`,align:`center`,onsignin:()=>{}})},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"`background` takes any CSS background — a photo, an `image-set(…)` or, here, a gradient;\n    the legal links then sit on a frosted pill. `card={false}` lets a SignInCard bring its own."}},__svelteCsf:{rawCode:`<Application>
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
</Application>`}}});var m=o(u,2);J(m,{name:`ErrorPage`,asChild:!0,children:(e,t)=>{N(e,{children:(e,t)=>{H(e,{code:404,description:`The link may be old, or the page was moved.`,homeHref:`#`,onback:()=>{}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A 404: the code in a candy gradient of the tint, "Go back" and a home link. Without a \`title\`
    the common codes bring a short default; for a 404 "This page took a coffee break." (a wink is
    fine here; the description says plainly what happened).`}},__svelteCsf:{rawCode:`<Application>
  <ErrorPage
    code={404}
    description="The link may be old, or the page was moved."
    homeHref="#"
    onback={() => {}}
  />
</Application>`}}});var h=o(m,2);J(h,{name:`ErrorPage with illustration`,asChild:!0,children:(e,t)=>{N(e,{children:(e,t)=>{H(e,{code:500,title:`Something broke on our side`,description:`We have been notified. Try again in a few minutes.`,onback:()=>{},illustration:e=>{var t=Ae();T(e,t)},$$slots:{illustration:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"With an `illustration` snippet: it floats gently beside the text (above it on phones). A 500\n    stays plain: say what happened and what to do, no jokes."}},__svelteCsf:{rawCode:`<Application>
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
</Application>`}}});var g=o(h,2);J(g,{name:`SplitLayout`,asChild:!0,children:(e,t)=>{N(e,{children:(e,t)=>{fe(e,{title:`Assistant`,subtitle:`ask the venue database`,children:(e,t)=>{Te(e,{aside:e=>{ce(e,{title:`Question`,children:(e,t)=>{z(e,{gap:`md`,children:(e,t)=>{var n=je(),r=D(n);he(r,{"aria-label":`Question`,counter:!0,limit:500,get value(){return a(i)},set value(e){S(i,e,!0)}});var s=o(r,2);R(s,{label:`Answer in`,children:(e,t)=>{let n=()=>t?.().id;re(e,{get id(){return n()},value:`en`,options:[{value:`en`,label:`English`},{value:`de`,label:`German`}]})},$$slots:{default:!0}});var c=o(s,2);F(c,{variant:`primary`,icon:`send`,label:`Ask`}),T(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}})},children:(e,t)=>{var n=p(),r=D(n);C(r,16,()=>[1,2,3],e=>e,(e,t)=>{be(e,{status:`ready`,get title(){return`Answer ${t??``}`},get copyValue(){return B},children:(e,t)=>{ve(e,{get source(){return B},size:`sm`})},$$slots:{default:!0}})}),T(e,n)},$$slots:{aside:!0,default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A tool page: the question stays in view (sticky, below the page header) while the answers
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
</Application>`}}}),T(e,c),w()}var q,J,Y,X,ke,Ae,je,Me,Z,Q,Ne,Pe,Fe,Ie,Le;function $(){return($=e((()=>{i(),u(),O(),M(),xe(),we(),de(),De(),P(),se(),I(),ne(),me(),ie(),_e(),Se(),ye(),le(),pe(),ge(),b(),k(),q={title:`Templates/Auth, error & split layouts`,component:V,tags:[`autodocs`],parameters:{layout:`fullscreen`}},{Story:J}=A(q),Y=[{label:`Imprint`,href:`#`},{label:`Privacy`,href:`#`},{label:`Help`,href:`#`}],X=r(`<!> <!>`,1),ke=r(`<form><!></form>`),Ae=te(`<svg viewBox="0 0 200 160" width="280" aria-hidden="true"><ellipse cx="80" cy="95" rx="42" ry="55" fill="var(--tint-200)"></ellipse><ellipse cx="128" cy="100" rx="38" ry="50" fill="var(--accent-soft)"></ellipse><circle cx="70" cy="85" r="5" fill="var(--text)"></circle><circle cx="92" cy="85" r="5" fill="var(--text)"></circle><circle cx="120" cy="92" r="5" fill="var(--text)"></circle><circle cx="140" cy="92" r="5" fill="var(--text)"></circle></svg>`),je=r(`<!> <!> <!>`,1),Me=r(`<!> <!> <!> <!> <!>`,1),Oe.__docgen={data:[],name:`Pages.stories.svelte`},Z=j(Oe,q),Q=[`AuthLayout`,`AuthLayoutWithABackground`,`ErrorPage`,`ErrorPageWithIllustration`,`SplitLayout`],Ne={...Z.AuthLayout,tags:[`svelte-csf-v5`]},Pe={...Z.AuthLayoutWithABackground,tags:[`svelte-csf-v5`]},Fe={...Z.ErrorPage,tags:[`svelte-csf-v5`]},Ie={...Z.ErrorPageWithIllustration,tags:[`svelte-csf-v5`]},Le={...Z.SplitLayout,tags:[`svelte-csf-v5`]}})))()}$();export{Ne as AuthLayout,Pe as AuthLayoutWithABackground,Fe as ErrorPage,Ie as ErrorPageWithIllustration,Le as SplitLayout,Q as __namedExportsOrder,q as default};