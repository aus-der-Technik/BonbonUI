import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Mt as t,Qt as n,St as r,Ut as i,Wt as a,Yt as o,bt as s,en as c,fn as l,jn as u,l as d,on as f,pn as ee,qt as p,wn as te}from"./iframe-D4jyjLko.js";import{i as m,n as h,r as g,t as _}from"./create-runtime-stories-2Z8qmkK0.js";import{n as v,t as y}from"./Button-05yF-FzT.js";import{n as b,t as x}from"./Input-BBxGBRkp.js";import{n as S,t as C}from"./Field-CiFnZBs5.js";import{n as w,t as ne}from"./Card-DqIMjyUt.js";import{n as T,t as re}from"./Grid-DomK7W-r.js";import{n as E,t as D}from"./Stack-CwOhDw0w.js";import{n as O,t as k}from"./Row-Df5rkmPk.js";import{n as A,t as j}from"./CopyButton-f8sH38Qo.js";import{n as M,t as N}from"./CodeBlock-CYZDslA6.js";import{n as P,t as ie}from"./CheckboxGroup-Dpsxeoll.js";import{n as ae,t as F}from"./RadioGroup-pUTkff1u.js";function I(e,r){ee(r,!0);let u=c(`daily`),d=c(`jane.doe@example`),m=c(`Jane Doe`),h=c(o([`orders`,`stock`])),g=f(()=>!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(t(d)));var _=U(),v=a(_);R(v,{name:`RadioGroup`,asChild:!0,children:(e,r)=>{F(e,{label:`Summary e-mail`,options:[{value:`off`,label:`Off`},{value:`daily`,label:`Daily`,description:`Every morning at 8:00`},{value:`weekly`,label:`Weekly`,description:`Mondays`}],get value(){return t(u)},set value(e){n(u,e,!0)}})},$$slots:{default:!0},parameters:{docs:{description:{story:`One of n, stacked with descriptions.`}},__svelteCsf:{rawCode:`<RadioGroup
  label="Summary e-mail"
  bind:value={digest}
  options={[
    { value: 'off', label: 'Off' },
    { value: 'daily', label: 'Daily', description: 'Every morning at 8:00' },
    { value: 'weekly', label: 'Weekly', description: 'Mondays' },
  ]}
/>`}}});var b=p(v,2);R(b,{name:`RadioGroup horizontal`,asChild:!0,children:(e,t)=>{F(e,{label:`Environment`,orientation:`horizontal`,value:`prod`,options:[{value:`prod`,label:`Production`},{value:`stage`,label:`Staging`},{value:`dev`,label:`Development`}]})},$$slots:{default:!0},parameters:{docs:{description:{story:`The same in a wrapping row.`}},__svelteCsf:{rawCode:`<RadioGroup
  label="Environment"
  orientation="horizontal"
  value="prod"
  options={[
    { value: 'prod', label: 'Production' },
    { value: 'stage', label: 'Staging' },
    { value: 'dev', label: 'Development' },
  ]}
/>`}}});var S=p(b,2);R(S,{name:`Field with validation`,asChild:!0,children:(e,r)=>{{let r=(e,r)=>{let i=()=>r?.().id,a=()=>r?.().errorId,o=()=>r?.().invalid;{let r=f(()=>o()?a():void 0);x(e,{get id(){return i()},get invalid(){return o()},get"aria-describedby"(){return t(r)},get value(){return t(d)},set value(e){n(d,e,!0)}})}},i=f(()=>t(g)?`Enter a valid e-mail address`:void 0);C(e,{label:`E-mail`,required:!0,hint:`Used for sign-in`,get error(){return t(i)},children:r,$$slots:{default:!0}})}},$$slots:{default:!0},parameters:{docs:{description:{story:"A label over a control. The error replaces the hint and is wired to the input through\n    `aria-describedby`."}},__svelteCsf:{rawCode:`<Field
  label="E-mail"
  required
  hint="Used for sign-in"
  error={invalid ? 'Enter a valid e-mail address' : undefined}
>
  {#snippet children({ id, errorId, invalid: bad })}
    <Input {id} bind:value={email} invalid={bad} aria-describedby={bad ? errorId : undefined} />
  {/snippet}
</Field>`}}});var w=p(S,2);R(w,{name:`Settings form`,asChild:!0,children:(e,r)=>{ne(e,{title:`Profile`,children:(e,r)=>{D(e,{gap:`lg`,children:(e,r)=>{var i=B(),o=a(i);re(o,{columns:2,min:`14rem`,children:(e,r)=>{var i=z(),o=a(i);C(o,{label:`Name`,required:!0,children:(e,r)=>{let i=()=>r?.().id;x(e,{get id(){return i()},get value(){return t(m)},set value(e){n(m,e,!0)}})},$$slots:{default:!0}});var c=p(o,2);C(c,{label:`E-mail`,hint:`We never share it`,children:(e,t)=>{let n=()=>t?.().id;x(e,{get id(){return n()},type:`email`,value:`jane.doe@example.com`})},$$slots:{default:!0}}),s(e,i)},$$slots:{default:!0}});var c=p(o,2);ie(c,{label:`Notify me about`,options:[{value:`orders`,label:`New orders`},{value:`stock`,label:`Low stock`},{value:`reviews`,label:`New reviews`},{value:`newsletter`,label:`Product news`}],get value(){return t(h)},set value(e){n(h,e,!0)}});var l=p(c,2);k(l,{justify:`end`,children:(e,t)=>{var n=z(),r=a(n);y(r,{variant:`ghost`,label:`Cancel`});var i=p(r,2);y(i,{variant:`primary`,label:`Save changes`}),s(e,n)},$$slots:{default:!0}}),s(e,i)},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A complete settings form: Fields in a Grid (two columns, one on a phone), a CheckboxGroup
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
</Card>`}}});var T=p(w,2);R(T,{name:`CodeBlock`,asChild:!0,children:(e,t)=>{D(e,{gap:`md`,children:(e,t)=>{var n=z(),r=a(n);N(r,{label:`Request`,code:`curl -H "Authorization: Bearer $TOKEN" \\
  https://api.example.com/v1/orders?status=open`});var i=p(r,2);N(i,{label:`API token`,code:`tok_demo_8f3a91c2d4e5b6a7f8091a2b3c4d5e6f`,secret:!0}),s(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"Preformatted text with a caption and a copy button; `secret` masks it until revealed."}},__svelteCsf:{rawCode:`<Stack gap="md">
  <CodeBlock
    label="Request"
    code={\`curl -H "Authorization: Bearer $TOKEN" \\\\
https://api.example.com/v1/orders?status=open\`}
  />
  <CodeBlock label="API token" code="tok_demo_8f3a91c2d4e5b6a7f8091a2b3c4d5e6f" secret />
</Stack>`}}});var E=p(T,2);R(E,{name:`CopyButton`,asChild:!0,children:(e,t)=>{k(e,{gap:`sm`,children:(e,t)=>{var n=V(),r=p(a(n),2);j(r,{value:`3f1c9a2e-8a1d-4f7b`,iconOnly:!0});var i=p(r,2);j(i,{value:`3f1c9a2e-8a1d-4f7b`,label:`Copy order id`}),s(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`An icon-only copy button next to a value, and a labelled one. A fresh copy ticks and throws a
    pinch of sprinkles; copying again within two seconds stays quiet.`}},__svelteCsf:{rawCode:`<Row gap="sm">
  <code>3f1c9a2e-8a1d-4f7b</code>
  <CopyButton value="3f1c9a2e-8a1d-4f7b" iconOnly />
  <CopyButton value="3f1c9a2e-8a1d-4f7b" label="Copy order id" />
</Row>`}}});var O=p(E,2);R(O,{name:`CopyButton as a link key`,asChild:!0,children:(e,t)=>{var n=H(),r=i(n);j(r,{value:()=>window.location.href,variant:`ghost`,icon:`link`,iconOnly:!0,label:`Copy link to this page`,copiedLabel:`Link copied`,tooltipPlacement:`bottom`,sprinkles:!1}),te(n),s(e,n)},$$slots:{default:!0},parameters:{docs:{description:{story:`A floating "copy link" key: ghost glass in a front layer, a link icon, a tooltip that names the
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
</div>`}}}),s(e,_),l()}var L,R,z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q;function $(){return($=e((()=>{u(),m(),P(),M(),A(),S(),ae(),v(),w(),b(),T(),O(),E(),d(),h(),L={title:`Molecules/Forms & content`,component:F,tags:[`autodocs`],parameters:{layout:`padded`}},{Story:R}=g(L),z=r(`<!> <!>`,1),B=r(`<!> <!> <!>`,1),V=r(`<code>3f1c9a2e-8a1d-4f7b</code> <!> <!>`,1),H=r(`<div data-layer="front" style="display: inline-flex; padding: var(--space-3);"><!></div>`),U=r(`<!> <!> <!> <!> <!> <!> <!>`,1),I.__docgen={data:[],name:`Forms.stories.svelte`},W=_(I,L),G=[`RadioGroup`,`RadioGroupHorizontal`,`FieldWithValidation`,`SettingsForm`,`CodeBlock`,`CopyButton`,`CopyButtonAsALinkKey`],K={...W.RadioGroup,tags:[`svelte-csf-v5`]},q={...W.RadioGroupHorizontal,tags:[`svelte-csf-v5`]},J={...W.FieldWithValidation,tags:[`svelte-csf-v5`]},Y={...W.SettingsForm,tags:[`svelte-csf-v5`]},X={...W.CodeBlock,tags:[`svelte-csf-v5`]},Z={...W.CopyButton,tags:[`svelte-csf-v5`]},Q={...W.CopyButtonAsALinkKey,tags:[`svelte-csf-v5`]}})))()}$();export{X as CodeBlock,Z as CopyButton,Q as CopyButtonAsALinkKey,J as FieldWithValidation,K as RadioGroup,q as RadioGroupHorizontal,Y as SettingsForm,G as __namedExportsOrder,L as default};