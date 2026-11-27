import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Cn as t,Ct as n,Ft as r,Gt as i,Ht as a,Pn as o,Pt as s,Rt as c,Wt as ee,_n as l,cn as u,l as d,on as f,wn as te,xt as p,zt as m}from"./iframe-D3QpTFc1.js";import{i as h,n as g,r as _,t as v}from"./create-runtime-stories-bgfxAijx.js";import{n as y,t as b}from"./Button-DO5WmEfH.js";import{n as x,t as S}from"./Input-CpEmBp8q.js";import{n as C,t as w}from"./Field-57DUJksD.js";import{n as T,t as ne}from"./Card-VkCagOi8.js";import{n as E,t as re}from"./Grid-CRR54iID.js";import{n as D,t as O}from"./Stack-DIO0U5nL.js";import{n as k,t as A}from"./Row-B0vuEKpz.js";import{n as j,t as M}from"./CopyButton-Kxzy_Pg3.js";import{n as N,t as P}from"./CodeBlock-Bd3ie8NB.js";import{n as ie,t as ae}from"./CheckboxGroup-XVHb6SQP.js";import{n as oe,t as F}from"./RadioGroup-BFTPa4u4.js";function I(e,n){te(n,!0);let r=u(`daily`),s=u(`jane.doe@example`),d=u(`Jane Doe`),h=u(ee([`orders`,`stock`])),g=l(()=>!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(i(s)));var _=U(),v=m(_);R(v,{name:`RadioGroup`,asChild:!0,children:(e,t)=>{F(e,{label:`Summary e-mail`,options:[{value:`off`,label:`Off`},{value:`daily`,label:`Daily`,description:`Every morning at 8:00`},{value:`weekly`,label:`Weekly`,description:`Mondays`}],get value(){return i(r)},set value(e){f(r,e,!0)}})},$$slots:{default:!0},parameters:{docs:{description:{story:`One of n, stacked with descriptions.`}},__svelteCsf:{rawCode:`<RadioGroup
  label="Summary e-mail"
  bind:value={digest}
  options={[
    { value: 'off', label: 'Off' },
    { value: 'daily', label: 'Daily', description: 'Every morning at 8:00' },
    { value: 'weekly', label: 'Weekly', description: 'Mondays' },
  ]}
/>`}}});var y=a(v,2);R(y,{name:`RadioGroup horizontal`,asChild:!0,children:(e,t)=>{F(e,{label:`Environment`,orientation:`horizontal`,value:`prod`,options:[{value:`prod`,label:`Production`},{value:`stage`,label:`Staging`},{value:`dev`,label:`Development`}]})},$$slots:{default:!0},parameters:{docs:{description:{story:`The same in a wrapping row.`}},__svelteCsf:{rawCode:`<RadioGroup
  label="Environment"
  orientation="horizontal"
  value="prod"
  options={[
    { value: 'prod', label: 'Production' },
    { value: 'stage', label: 'Staging' },
    { value: 'dev', label: 'Development' },
  ]}
/>`}}});var x=a(y,2);R(x,{name:`Field with validation`,asChild:!0,children:(e,t)=>{{let t=(e,t)=>{let n=()=>t?.().id,r=()=>t?.().errorId,a=()=>t?.().invalid;{let t=l(()=>a()?r():void 0);S(e,{get id(){return n()},get invalid(){return a()},get"aria-describedby"(){return i(t)},get value(){return i(s)},set value(e){f(s,e,!0)}})}},n=l(()=>i(g)?`Enter a valid e-mail address`:void 0);w(e,{label:`E-mail`,required:!0,hint:`Used for sign-in`,get error(){return i(n)},children:t,$$slots:{default:!0}})}},$$slots:{default:!0},parameters:{docs:{description:{story:"A label over a control. The error replaces the hint and is wired to the input through\n    `aria-describedby`."}},__svelteCsf:{rawCode:`<Field
  label="E-mail"
  required
  hint="Used for sign-in"
  error={invalid ? 'Enter a valid e-mail address' : undefined}
>
  {#snippet children({ id, errorId, invalid: bad })}
    <Input {id} bind:value={email} invalid={bad} aria-describedby={bad ? errorId : undefined} />
  {/snippet}
</Field>`}}});var C=a(x,2);R(C,{name:`Settings form`,asChild:!0,children:(e,t)=>{ne(e,{title:`Profile`,children:(e,t)=>{O(e,{gap:`lg`,children:(e,t)=>{var n=B(),r=m(n);re(r,{columns:2,min:`14rem`,children:(e,t)=>{var n=z(),r=m(n);w(r,{label:`Name`,required:!0,children:(e,t)=>{let n=()=>t?.().id;S(e,{get id(){return n()},get value(){return i(d)},set value(e){f(d,e,!0)}})},$$slots:{default:!0}});var o=a(r,2);w(o,{label:`E-mail`,hint:`We never share it`,children:(e,t)=>{let n=()=>t?.().id;S(e,{get id(){return n()},type:`email`,value:`jane.doe@example.com`})},$$slots:{default:!0}}),p(e,n)},$$slots:{default:!0}});var o=a(r,2);ae(o,{label:`Notify me about`,options:[{value:`orders`,label:`New orders`},{value:`stock`,label:`Low stock`},{value:`reviews`,label:`New reviews`},{value:`newsletter`,label:`Product news`}],get value(){return i(h)},set value(e){f(h,e,!0)}});var s=a(o,2);A(s,{justify:`end`,children:(e,t)=>{var n=z(),r=m(n);b(r,{variant:`ghost`,label:`Cancel`});var i=a(r,2);b(i,{variant:`primary`,label:`Save changes`}),p(e,n)},$$slots:{default:!0}}),p(e,n)},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A complete settings form: Fields in a Grid (two columns, one on a phone), a CheckboxGroup
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
</Card>`}}});var T=a(C,2);R(T,{name:`CodeBlock`,asChild:!0,children:(e,t)=>{O(e,{gap:`md`,children:(e,t)=>{var n=z(),r=m(n);P(r,{label:`Request`,code:`curl -H "Authorization: Bearer $TOKEN" \\
  https://api.example.com/v1/orders?status=open`});var i=a(r,2);P(i,{label:`API token`,code:`tok_demo_8f3a91c2d4e5b6a7f8091a2b3c4d5e6f`,secret:!0}),p(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"Preformatted text with a caption and a copy button; `secret` masks it until revealed."}},__svelteCsf:{rawCode:`<Stack gap="md">
  <CodeBlock
    label="Request"
    code={\`curl -H "Authorization: Bearer $TOKEN" \\\\
https://api.example.com/v1/orders?status=open\`}
  />
  <CodeBlock label="API token" code="tok_demo_8f3a91c2d4e5b6a7f8091a2b3c4d5e6f" secret />
</Stack>`}}});var E=a(T,2);R(E,{name:`CopyButton`,asChild:!0,children:(e,t)=>{A(e,{gap:`sm`,children:(e,t)=>{var n=V(),r=a(m(n),2);M(r,{value:`3f1c9a2e-8a1d-4f7b`,iconOnly:!0});var i=a(r,2);M(i,{value:`3f1c9a2e-8a1d-4f7b`,label:`Copy order id`}),p(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`An icon-only copy button next to a value, and a labelled one. A fresh copy ticks and throws a
    pinch of sprinkles; copying again within two seconds stays quiet.`}},__svelteCsf:{rawCode:`<Row gap="sm">
  <code>3f1c9a2e-8a1d-4f7b</code>
  <CopyButton value="3f1c9a2e-8a1d-4f7b" iconOnly />
  <CopyButton value="3f1c9a2e-8a1d-4f7b" label="Copy order id" />
</Row>`}}});var D=a(E,2);R(D,{name:`CopyButton as a link key`,asChild:!0,children:(e,t)=>{var n=H(),r=c(n);M(r,{value:()=>window.location.href,variant:`ghost`,icon:`link`,iconOnly:!0,label:`Copy link to this page`,copiedLabel:`Link copied`,tooltipPlacement:`bottom`,sprinkles:!1}),o(n),p(e,n)},$$slots:{default:!0},parameters:{docs:{description:{story:`A floating "copy link" key: ghost glass in a front layer, a link icon, a tooltip that names the
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
</div>`}}}),p(e,_),t()}var L,R,z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q;function $(){return($=e((()=>{r(),s(),h(),ie(),N(),j(),C(),oe(),y(),T(),x(),E(),k(),D(),d(),g(),L={title:`Molecules/Forms & content`,component:F,tags:[`autodocs`],parameters:{layout:`padded`}},{Story:R}=_(L),z=n(`<!> <!>`,1),B=n(`<!> <!> <!>`,1),V=n(`<code>3f1c9a2e-8a1d-4f7b</code> <!> <!>`,1),H=n(`<div data-layer="front" style="display: inline-flex; padding: var(--space-3);"><!></div>`),U=n(`<!> <!> <!> <!> <!> <!> <!>`,1),I.__docgen={data:[],name:`Forms.stories.svelte`},W=v(I,L),G=[`RadioGroup`,`RadioGroupHorizontal`,`FieldWithValidation`,`SettingsForm`,`CodeBlock`,`CopyButton`,`CopyButtonAsALinkKey`],K={...W.RadioGroup,tags:[`svelte-csf-v5`]},q={...W.RadioGroupHorizontal,tags:[`svelte-csf-v5`]},J={...W.FieldWithValidation,tags:[`svelte-csf-v5`]},Y={...W.SettingsForm,tags:[`svelte-csf-v5`]},X={...W.CodeBlock,tags:[`svelte-csf-v5`]},Z={...W.CopyButton,tags:[`svelte-csf-v5`]},Q={...W.CopyButtonAsALinkKey,tags:[`svelte-csf-v5`]}})))()}$();export{X as CodeBlock,Z as CopyButton,Q as CopyButtonAsALinkKey,J as FieldWithValidation,K as RadioGroup,q as RadioGroupHorizontal,Y as SettingsForm,G as __namedExportsOrder,L as default};