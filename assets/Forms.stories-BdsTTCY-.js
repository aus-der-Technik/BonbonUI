import{n as e}from"./rolldown-runtime-Dxh6kD9_.js";import{Ct as t,Ft as n,Gt as r,Ht as i,Mn as a,Pt as o,Rt as s,Sn as ee,Wt as te,cn as c,hn as l,l as u,on as d,xn as ne,xt as f,zt as p}from"./iframe-WlNMZtZ0.js";import{i as m,n as h,r as g,t as _}from"./create-runtime-stories-CbHiKinS.js";import{n as v,t as y}from"./Button-DHLILcYm.js";import{n as b,t as x}from"./Input-DeTI9rlx.js";import{n as S,t as C}from"./Field-DtdH1dfq.js";import{n as w,t as re}from"./Card-BqZAAHlF.js";import{n as T,t as E}from"./Grid-CbFksUeV.js";import{n as D,t as O}from"./Stack-BjV-rmuj.js";import{n as k,t as A}from"./Row-IIXhUlbK.js";import{n as j,t as M}from"./CopyButton-Bo1UvYun.js";import{n as N,t as P}from"./CodeBlock-DhFbAkCz.js";import{n as ie,t as ae}from"./CheckboxGroup-CTHU_tca.js";import{n as oe,t as F}from"./RadioGroup-BFbuinUy.js";function I(e,t){ee(t,!0);let n=c(`daily`),o=c(`jane.doe@example`),u=c(`Jane Doe`),m=c(te([`orders`,`stock`])),h=l(()=>!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(r(o)));var g=U(),_=p(g);R(_,{name:`RadioGroup`,asChild:!0,children:(e,t)=>{F(e,{label:`Summary e-mail`,options:[{value:`off`,label:`Off`},{value:`daily`,label:`Daily`,description:`Every morning at 8:00`},{value:`weekly`,label:`Weekly`,description:`Mondays`}],get value(){return r(n)},set value(e){d(n,e,!0)}})},$$slots:{default:!0},parameters:{docs:{description:{story:`One of n, stacked with descriptions.`}},__svelteCsf:{rawCode:`<RadioGroup
  label="Summary e-mail"
  bind:value={digest}
  options={[
    { value: 'off', label: 'Off' },
    { value: 'daily', label: 'Daily', description: 'Every morning at 8:00' },
    { value: 'weekly', label: 'Weekly', description: 'Mondays' },
  ]}
/>`}}});var v=i(_,2);R(v,{name:`RadioGroup horizontal`,asChild:!0,children:(e,t)=>{F(e,{label:`Environment`,orientation:`horizontal`,value:`prod`,options:[{value:`prod`,label:`Production`},{value:`stage`,label:`Staging`},{value:`dev`,label:`Development`}]})},$$slots:{default:!0},parameters:{docs:{description:{story:`The same in a wrapping row.`}},__svelteCsf:{rawCode:`<RadioGroup
  label="Environment"
  orientation="horizontal"
  value="prod"
  options={[
    { value: 'prod', label: 'Production' },
    { value: 'stage', label: 'Staging' },
    { value: 'dev', label: 'Development' },
  ]}
/>`}}});var b=i(v,2);R(b,{name:`Field with validation`,asChild:!0,children:(e,t)=>{{let t=(e,t)=>{let n=()=>t?.().id,i=()=>t?.().errorId,a=()=>t?.().invalid;{let t=l(()=>a()?i():void 0);x(e,{get id(){return n()},get invalid(){return a()},get"aria-describedby"(){return r(t)},get value(){return r(o)},set value(e){d(o,e,!0)}})}},n=l(()=>r(h)?`Enter a valid e-mail address`:void 0);C(e,{label:`E-mail`,required:!0,hint:`Used for sign-in`,get error(){return r(n)},children:t,$$slots:{default:!0}})}},$$slots:{default:!0},parameters:{docs:{description:{story:"A label over a control. The error replaces the hint and is wired to the input through\n    `aria-describedby`."}},__svelteCsf:{rawCode:`<Field
  label="E-mail"
  required
  hint="Used for sign-in"
  error={invalid ? 'Enter a valid e-mail address' : undefined}
>
  {#snippet children({ id, errorId, invalid: bad })}
    <Input {id} bind:value={email} invalid={bad} aria-describedby={bad ? errorId : undefined} />
  {/snippet}
</Field>`}}});var S=i(b,2);R(S,{name:`Settings form`,asChild:!0,children:(e,t)=>{re(e,{title:`Profile`,children:(e,t)=>{O(e,{gap:`lg`,children:(e,t)=>{var n=B(),a=p(n);E(a,{columns:2,min:`14rem`,children:(e,t)=>{var n=z(),a=p(n);C(a,{label:`Name`,required:!0,children:(e,t)=>{let n=()=>t?.().id;x(e,{get id(){return n()},get value(){return r(u)},set value(e){d(u,e,!0)}})},$$slots:{default:!0}});var o=i(a,2);C(o,{label:`E-mail`,hint:`We never share it`,children:(e,t)=>{let n=()=>t?.().id;x(e,{get id(){return n()},type:`email`,value:`jane.doe@example.com`})},$$slots:{default:!0}}),f(e,n)},$$slots:{default:!0}});var o=i(a,2);ae(o,{label:`Notify me about`,options:[{value:`orders`,label:`New orders`},{value:`stock`,label:`Low stock`},{value:`reviews`,label:`New reviews`},{value:`newsletter`,label:`Product news`}],get value(){return r(m)},set value(e){d(m,e,!0)}});var s=i(o,2);A(s,{justify:`end`,children:(e,t)=>{var n=z(),r=p(n);y(r,{variant:`ghost`,label:`Cancel`});var a=i(r,2);y(a,{variant:`primary`,label:`Save changes`}),f(e,n)},$$slots:{default:!0}}),f(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A complete settings form: Fields in a Grid (two columns, one on a phone), a CheckboxGroup
    and the buttons in a Row — no hand-written layout CSS.`}},__svelteCsf:{rawCode:`<Card title="Profile">
  <Stack gap="lg">
    <Grid columns={2} min="14rem">
      <Field label="Name" required>
        {#snippet children({ id })}<Input {id} bind:value={name} />{/snippet}
      </Field>
      <Field label="E-mail" hint="We never share it">
        {#snippet children({ id })}<Input
            {id}
            type="email"
            value="jane.doe@example.com"
          />{/snippet}
      </Field>
    </Grid>
    <CheckboxGroup
      label="Notify me about"
      bind:value={topics}
      options={[
        { value: 'orders', label: 'New orders' },
        { value: 'stock', label: 'Low stock' },
        { value: 'reviews', label: 'New reviews' },
        { value: 'newsletter', label: 'Product news' },
      ]}
    />
    <Row justify="end">
      <Button variant="ghost" label="Cancel" />
      <Button variant="primary" label="Save changes" />
    </Row>
  </Stack>
</Card>`}}});var w=i(S,2);R(w,{name:`CodeBlock`,asChild:!0,children:(e,t)=>{O(e,{gap:`md`,children:(e,t)=>{var n=z(),r=p(n);P(r,{label:`Request`,code:`curl -H "Authorization: Bearer $TOKEN" \\
  https://api.example.com/v1/orders?status=open`});var a=i(r,2);P(a,{label:`API token`,code:`tok_demo_8f3a91c2d4e5b6a7f8091a2b3c4d5e6f`,secret:!0}),f(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"Preformatted text with a caption and a copy button; `secret` masks it until revealed."}},__svelteCsf:{rawCode:`<Stack gap="md">
  <CodeBlock
    label="Request"
    code={\`curl -H "Authorization: Bearer $TOKEN" \\\\
https://api.example.com/v1/orders?status=open\`}
  />
  <CodeBlock label="API token" code="tok_demo_8f3a91c2d4e5b6a7f8091a2b3c4d5e6f" secret />
</Stack>`}}});var T=i(w,2);R(T,{name:`CopyButton`,asChild:!0,children:(e,t)=>{A(e,{gap:`sm`,children:(e,t)=>{var n=V(),r=i(p(n),2);M(r,{value:`3f1c9a2e-8a1d-4f7b`,iconOnly:!0});var a=i(r,2);M(a,{value:`3f1c9a2e-8a1d-4f7b`,label:`Copy order id`}),f(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`An icon-only copy button next to a value, and a labelled one. A fresh copy ticks and throws a
    pinch of sprinkles; copying again within two seconds stays quiet.`}},__svelteCsf:{rawCode:`<Row gap="sm">
  <code>3f1c9a2e-8a1d-4f7b</code>
  <CopyButton value="3f1c9a2e-8a1d-4f7b" iconOnly />
  <CopyButton value="3f1c9a2e-8a1d-4f7b" label="Copy order id" />
</Row>`}}});var D=i(T,2);R(D,{name:`CopyButton as a link key`,asChild:!0,children:(e,t)=>{var n=H(),r=s(n);M(r,{value:()=>window.location.href,variant:`ghost`,icon:`link`,iconOnly:!0,label:`Copy link to this page`,copiedLabel:`Link copied`,tooltipPlacement:`bottom`,sprinkles:!1}),a(n),f(e,n)},$$slots:{default:!0},parameters:{docs:{description:{story:`A floating "copy link" key: ghost glass in a front layer, a link icon, a tooltip that names the
    target and then says "Link copied". The value is read at the click, so it follows the page.`}},__svelteCsf:{rawCode:`<div data-layer="front" style="display: inline-flex; padding: var(--space-3);">
  <CopyButton
    value={() => window.location.href}
    variant="ghost"
    icon="link"
    iconOnly
    label="Copy link to this page"
    copiedLabel="Link copied"
    tooltipPlacement="bottom"
    sprinkles={false}
  />
</div>`}}}),f(e,g),ne()}var L,R,z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q;function $(){return($=e((()=>{n(),o(),m(),ie(),N(),j(),S(),oe(),v(),w(),b(),T(),k(),D(),u(),h(),L={title:`Molecules/Forms & content`,component:F,tags:[`autodocs`],parameters:{layout:`padded`}},{Story:R}=g(L),z=t(`<!> <!>`,1),B=t(`<!> <!> <!>`,1),V=t(`<code>3f1c9a2e-8a1d-4f7b</code> <!> <!>`,1),H=t(`<div data-layer="front" style="display: inline-flex; padding: var(--space-3);"><!></div>`),U=t(`<!> <!> <!> <!> <!> <!> <!>`,1),I.__docgen={data:[],name:`Forms.stories.svelte`},W=_(I,L),G=[`RadioGroup`,`RadioGroupHorizontal`,`FieldWithValidation`,`SettingsForm`,`CodeBlock`,`CopyButton`,`CopyButtonAsALinkKey`],K={...W.RadioGroup,tags:[`svelte-csf-v5`]},q={...W.RadioGroupHorizontal,tags:[`svelte-csf-v5`]},J={...W.FieldWithValidation,tags:[`svelte-csf-v5`]},Y={...W.SettingsForm,tags:[`svelte-csf-v5`]},X={...W.CodeBlock,tags:[`svelte-csf-v5`]},Z={...W.CopyButton,tags:[`svelte-csf-v5`]},Q={...W.CopyButtonAsALinkKey,tags:[`svelte-csf-v5`]}})))()}$();export{X as CodeBlock,Z as CopyButton,Q as CopyButtonAsALinkKey,J as FieldWithValidation,K as RadioGroup,q as RadioGroupHorizontal,Y as SettingsForm,G as __namedExportsOrder,L as default};