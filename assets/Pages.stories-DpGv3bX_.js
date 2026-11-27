import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{$t as t,An as n,At as r,Cn as i,Ct as a,Ft as o,Gt as s,Ht as c,N as l,Pn as u,Pt as d,Rt as f,St as p,V as m,Vt as h,_n as g,_t as _,cn as v,ct as y,d as b,l as x,mt as S,on as C,tt as w,wn as T,wt as ee,xt as E,z as D,zt as O}from"./iframe-D3QpTFc1.js";import{i as k,n as te,r as A,t as j}from"./create-runtime-stories-bgfxAijx.js";import{n as M,t as N}from"./Application-BDnq78kk.js";import{n as P,t as F}from"./Button-DO5WmEfH.js";import{n as I,t as L}from"./Input-CpEmBp8q.js";import{n as ne,t as re}from"./Select-DMkHx1Lr.js";import{n as ie,t as R}from"./Field-57DUJksD.js";import{i as ae,n as oe}from"./space-Bksjy8Hf.js";import{n as se,t as ce}from"./Card-VkCagOi8.js";import{n as le,t as ue}from"./Section-DwdRemnZ.js";import{n as de,t as fe}from"./Page-BnG-6qFd.js";import{n as pe,t as z}from"./Stack-DIO0U5nL.js";import{n as me,t as he}from"./Textarea-Dq6zWToQ.js";import{l as ge,t as B}from"./mock-CoQSv9oT.js";import{n as _e,t as ve}from"./Markdown-ZNamIQLn.js";import{n as ye,t as be}from"./ResultPanel-CWKwQHjN.js";import{n as xe,t as V}from"./AuthLayout-41ZNV_AO.js";import{n as Se,t as Ce}from"./SignInCard-Dy0mPwBS.js";function H(e,r){T(r,!0);let a=b(r,`imageAlt`,3,``),o=b(r,`backLabel`,3,`Go back`),d=b(r,`homeLabel`,3,`Home`),p={400:`That request did not look right.`,401:`Please sign in to see this page.`,403:`You do not have access to this page.`,404:`This page took a coffee break.`,500:`Something broke on our side.`,503:`We are down for a moment. Try again soon.`},m=g(()=>r.title??r.titles?.[String(r.code)]??p[String(r.code)]??`Something went wrong. Try again.`);function v(){r.onback?r.onback():history.back()}var x=K(),C=f(x),w=f(C),ee=h(w,!0),D=c(w,2),O=h(D,!0),k=c(D,2),te=e=>{var n=U(),i=h(n,!0);t(()=>_(i,r.description)),E(e,n)};y(k,e=>{r.description&&e(te)});var A=c(k,2);S(A,()=>r.children??n);var j=c(A,2),M=f(j);F(M,{variant:`primary`,shape:`pill`,size:`lg`,icon:`arrow-left`,get label(){return o()},onclick:v});var N=c(M,2),P=e=>{F(e,{variant:`glass`,shape:`pill`,size:`lg`,get href(){return r.homeHref},icon:`home`,get label(){return d()}})};y(N,e=>{r.homeHref&&e(P)}),u(j),u(C);var I=c(C,2),L=e=>{var t=W(),n=f(t);S(n,()=>r.illustration),u(t),E(e,t)},ne=e=>{var n=G(),i=h(n);t(()=>{l(i,`src`,r.image),l(i,`alt`,a())}),E(e,n)};y(I,e=>{r.illustration?e(L):r.image&&e(ne,1)}),u(x),t(()=>{_(ee,r.code),_(O,s(m))}),E(e,x),i()}var U,W,G,K;function we(){return(we=e((()=>{o(),d(),x(),P(),U=a(`<p class="description svelte-1na88sm"> </p>`),W=a(`<div class="art svelte-1na88sm"><!></div>`),G=a(`<div class="art svelte-1na88sm"><img class="svelte-1na88sm"/></div>`),K=a(`<main class="error-page svelte-1na88sm"><div class="text"><p class="code svelte-1na88sm"> </p> <h1 class="svelte-1na88sm"> </h1> <!> <!> <div class="actions svelte-1na88sm"><!> <!></div></div> <!></main>`),H.__docgen={data:[{name:`code`,visibility:`public`,keywords:[{name:`required`,description:``}],kind:`let`,type:{kind:`union`,type:[{kind:`type`,type:`string`,text:`string`},{kind:`type`,type:`number`,text:`number`}],text:`string | number`},static:!1,readonly:!1},{name:`title`,visibility:`public`,description:"Defaults to a short line for the code (see `defaultTitles`).",keywords:[],kind:`let`,type:{kind:`type`,type:`string`,text:`string`},static:!1,readonly:!1},{name:`titles`,visibility:`public`,description:`Overrides the default titles per code.`,keywords:[],kind:`let`,type:{kind:`type`,type:`object`,text:`Record<string, string>`},static:!1,readonly:!1},{name:`description`,visibility:`public`,keywords:[],kind:`let`,type:{kind:`type`,type:`string`,text:`string`},static:!1,readonly:!1},{name:`image`,visibility:`public`,description:"An image URL; or pass the `illustration` snippet.",keywords:[],kind:`let`,type:{kind:`type`,type:`string`,text:`string`},static:!1,readonly:!1},{name:`imageAlt`,visibility:`public`,keywords:[],kind:`let`,type:{kind:`type`,type:`string`,text:`string`},static:!1,readonly:!1,defaultValue:`""`},{name:`backLabel`,visibility:`public`,keywords:[],kind:`let`,type:{kind:`type`,type:`string`,text:`string`},static:!1,readonly:!1,defaultValue:`"Go back"`},{name:`homeHref`,visibility:`public`,keywords:[],kind:`let`,type:{kind:`type`,type:`string`,text:`string`},static:!1,readonly:!1},{name:`homeLabel`,visibility:`public`,keywords:[],kind:`let`,type:{kind:`type`,type:`string`,text:`string`},static:!1,readonly:!1,defaultValue:`"Home"`},{name:`onback`,visibility:`public`,keywords:[],kind:`let`,type:{kind:`function`,text:`() => void`},static:!1,readonly:!1},{name:`illustration`,visibility:`public`,keywords:[],kind:`let`,type:{kind:`function`,text:`Snippet<[]>`},static:!1,readonly:!1},{name:`children`,visibility:`public`,keywords:[],kind:`let`,type:{kind:`function`,text:`Snippet<[]>`},static:!1,readonly:!1}],name:`ErrorPage.svelte`}})))()}function Te(e,n){T(n,!0);let r=b(n,`asideWidth`,3,`minmax(20rem, 2fr)`),a=b(n,`sticky`,3,!0),o=b(n,`reverse`,3,!1),s=b(n,`gap`,3,`md`);var l=Ee();let d,p;var h=f(l);let g;var _=f(h);S(_,()=>n.aside),u(h);var v=c(h,2),y=f(v);S(y,()=>n.children),u(v),u(l),t(e=>{d=m(l,1,`split svelte-qn6rvp`,null,d,{reverse:o()}),p=D(l,``,p,{"--aside":r(),"--split-gap":e}),g=m(h,1,`svelte-qn6rvp`,null,g,{sticky:a()})},[()=>ae(s())]),E(e,l),i()}var Ee;function De(){return(De=e((()=>{o(),d(),x(),oe(),Ee=a(`<div><aside><!></aside> <div class="main svelte-qn6rvp"><!></div></div>`),Te.__docgen={data:[{name:`asideWidth`,visibility:`public`,description:`Width of the aside column, e.g. "24rem" or "38%".`,keywords:[],kind:`let`,type:{kind:`type`,type:`string`,text:`string`},static:!1,readonly:!1,defaultValue:`"minmax(20rem, 2fr)"`},{name:`sticky`,visibility:`public`,description:`The aside stays in view while the results scroll.`,keywords:[],kind:`let`,type:{kind:`type`,type:`boolean`,text:`boolean`},static:!1,readonly:!1,defaultValue:`true`},{name:`reverse`,visibility:`public`,description:`The aside on the right instead of the left.`,keywords:[],kind:`let`,type:{kind:`type`,type:`boolean`,text:`boolean`},static:!1,readonly:!1,defaultValue:`false`},{name:`gap`,visibility:`public`,description:`Gap between the columns and between the children of each.`,keywords:[],kind:`let`,type:{kind:`union`,type:[{kind:`const`,type:`string`,value:`none`,text:`"none"`},{kind:`const`,type:`string`,value:`xs`,text:`"xs"`},{kind:`const`,type:`string`,value:`sm`,text:`"sm"`},{kind:`const`,type:`string`,value:`md`,text:`"md"`},{kind:`const`,type:`string`,value:`lg`,text:`"lg"`},{kind:`const`,type:`string`,value:`xl`,text:`"xl"`},{kind:`const`,type:`string`,value:`2xl`,text:`"2xl"`}],text:`"none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl"`},static:!1,readonly:!1,defaultValue:`"md"`},{name:`aside`,visibility:`public`,keywords:[{name:`required`,description:``}],kind:`let`,type:{kind:`function`,text:`Snippet<[]>`},static:!1,readonly:!1},{name:`children`,visibility:`public`,keywords:[{name:`required`,description:``}],kind:`let`,type:{kind:`function`,text:`Snippet<[]>`},static:!1,readonly:!1}],name:`SplitLayout.svelte`}})))()}function Oe(e,t){T(t,!0);let n=v(!1),a=v(`Which venues in Leipzig seat 300 people?`);var o=Me(),l=O(o);J(l,{name:`AuthLayout`,asChild:!0,children:(e,t)=>{N(e,{children:(e,t)=>{V(e,{title:`Sign in`,greeting:!0,clock:!0,get links(){return Y},get shake(){return s(n)},children:(e,t)=>{var i=ke(),a=f(i);z(a,{gap:`md`,children:(e,t)=>{var n=X(),r=O(n);ue(r,{title:`Welcome back`,description:`Sign in with your work account.`,children:(e,t)=>{var n=X(),r=O(n);R(r,{label:`E-mail`,children:(e,t)=>{let n=()=>t?.().id;L(e,{get id(){return n()},type:`email`,value:`jane.doe@example.com`})},$$slots:{default:!0}});var i=c(r,2);R(i,{label:`Password`,children:(e,t)=>{let n=()=>t?.().id;L(e,{get id(){return n()},type:`password`,value:`wrong`})},$$slots:{default:!0}}),E(e,n)},$$slots:{default:!0}});var i=c(r,2);F(i,{type:`submit`,variant:`primary`,size:`lg`,label:`Sign in`}),E(e,n)},$$slots:{default:!0}}),u(i),r(`submit`,i,e=>{e.preventDefault(),C(n,!1),requestAnimationFrame(()=>C(n,!0))}),E(e,i)},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"A sign-in page: the sticky glass top bar with the brand bar, title, a friendly greeting\n    (`greeting`; hover it for the wink of the moment) and the clock, the form on a liquid-glass\n    card that eases in, legal links at the bottom. A wrong password gives the card a polite\n    head-shake (`shake`) — small, never for system errors."}},__svelteCsf:{rawCode:`<Application>
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
</Application>`}}});var d=c(l,2);J(d,{name:`AuthLayout with a background`,asChild:!0,children:(e,t)=>{N(e,{children:(e,t)=>{V(e,{title:`Workspace`,clock:!0,card:!1,get links(){return Y},background:`linear-gradient(160deg, var(--color-indigo), var(--color-purple) 55%, var(--color-orange))`,children:(e,t)=>{Ce(e,{title:`Sign in to continue`,text:`Use your work account. We never see your password.`,align:`center`,onsignin:()=>{}})},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"`background` takes any CSS background — a photo, an `image-set(…)` or, here, a gradient;\n    the legal links then sit on a frosted pill. `card={false}` lets a SignInCard bring its own."}},__svelteCsf:{rawCode:`<Application>
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
</Application>`}}});var m=c(d,2);J(m,{name:`ErrorPage`,asChild:!0,children:(e,t)=>{N(e,{children:(e,t)=>{H(e,{code:404,description:`The link may be old, or the page was moved.`,homeHref:`#`,onback:()=>{}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A 404: the code in a candy gradient of the tint, "Go back" and a home link. Without a \`title\`
    the common codes bring a short default; for a 404 "This page took a coffee break." (a wink is
    fine here; the description says plainly what happened).`}},__svelteCsf:{rawCode:`<Application>
  <ErrorPage
    code={404}
    description="The link may be old, or the page was moved."
    homeHref="#"
    onback={() => {}}
  />
</Application>`}}});var h=c(m,2);J(h,{name:`ErrorPage with illustration`,asChild:!0,children:(e,t)=>{N(e,{children:(e,t)=>{H(e,{code:500,title:`Something broke on our side`,description:`We have been notified. Try again in a few minutes.`,onback:()=>{},illustration:e=>{var t=Ae();E(e,t)},$$slots:{illustration:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"With an `illustration` snippet: it floats gently beside the text (above it on phones). A 500\n    stays plain: say what happened and what to do, no jokes."}},__svelteCsf:{rawCode:`<Application>
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
</Application>`}}});var g=c(h,2);J(g,{name:`SplitLayout`,asChild:!0,children:(e,t)=>{N(e,{children:(e,t)=>{fe(e,{title:`Assistant`,subtitle:`ask the venue database`,children:(e,t)=>{Te(e,{aside:e=>{ce(e,{title:`Question`,children:(e,t)=>{z(e,{gap:`md`,children:(e,t)=>{var n=je(),r=O(n);he(r,{"aria-label":`Question`,counter:!0,limit:500,get value(){return s(a)},set value(e){C(a,e,!0)}});var i=c(r,2);R(i,{label:`Answer in`,children:(e,t)=>{let n=()=>t?.().id;re(e,{get id(){return n()},value:`en`,options:[{value:`en`,label:`English`},{value:`de`,label:`German`}]})},$$slots:{default:!0}});var o=c(i,2);F(o,{variant:`primary`,icon:`send`,label:`Ask`}),E(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}})},children:(e,t)=>{var n=p(),r=O(n);w(r,16,()=>[1,2,3],e=>e,(e,t)=>{be(e,{status:`ready`,get title(){return`Answer ${t??``}`},get copyValue(){return B},children:(e,t)=>{ve(e,{get source(){return B},size:`sm`})},$$slots:{default:!0}})}),E(e,n)},$$slots:{aside:!0,default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A tool page: the question stays in view (sticky, below the page header) while the answers
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
</Application>`}}}),E(e,o),i()}var q,J,Y,X,ke,Ae,je,Me,Z,Ne,Q,Pe,Fe,Ie,Le;function $(){return($=e((()=>{o(),d(),k(),M(),xe(),we(),de(),De(),P(),se(),I(),ne(),me(),ie(),_e(),Se(),ye(),le(),pe(),ge(),x(),te(),q={title:`Templates/Auth, error & split layouts`,component:V,tags:[`autodocs`],parameters:{layout:`fullscreen`}},{Story:J}=A(q),Y=[{label:`Imprint`,href:`#`},{label:`Privacy`,href:`#`},{label:`Help`,href:`#`}],X=a(`<!> <!>`,1),ke=a(`<form><!></form>`),Ae=ee(`<svg viewBox="0 0 200 160" width="280" aria-hidden="true"><ellipse cx="80" cy="95" rx="42" ry="55" fill="var(--tint-200)"></ellipse><ellipse cx="128" cy="100" rx="38" ry="50" fill="var(--accent-soft)"></ellipse><circle cx="70" cy="85" r="5" fill="var(--text)"></circle><circle cx="92" cy="85" r="5" fill="var(--text)"></circle><circle cx="120" cy="92" r="5" fill="var(--text)"></circle><circle cx="140" cy="92" r="5" fill="var(--text)"></circle></svg>`),je=a(`<!> <!> <!>`,1),Me=a(`<!> <!> <!> <!> <!>`,1),Oe.__docgen={data:[],name:`Pages.stories.svelte`},Z=j(Oe,q),Ne=[`AuthLayout`,`AuthLayoutWithABackground`,`ErrorPage`,`ErrorPageWithIllustration`,`SplitLayout`],Q={...Z.AuthLayout,tags:[`svelte-csf-v5`]},Pe={...Z.AuthLayoutWithABackground,tags:[`svelte-csf-v5`]},Fe={...Z.ErrorPage,tags:[`svelte-csf-v5`]},Ie={...Z.ErrorPageWithIllustration,tags:[`svelte-csf-v5`]},Le={...Z.SplitLayout,tags:[`svelte-csf-v5`]}})))()}$();export{Q as AuthLayout,Pe as AuthLayoutWithABackground,Fe as ErrorPage,Ie as ErrorPageWithIllustration,Le as SplitLayout,Ne as __namedExportsOrder,q as default};