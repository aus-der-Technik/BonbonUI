import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Mt as t,Qt as n,St as r,Wt as i,Yt as a,bt as o,en as s,fn as c,jn as l,l as u,on as d,pn as f,qt as p}from"./iframe-Dd9zCUtD.js";import{i as m,n as h,r as g,t as _}from"./create-runtime-stories-Bj9BSqmd.js";import{n as v,t as y}from"./Button-CAKf1gbx.js";import{n as b,t as x}from"./Input-Z-JpGlj1.js";import{n as S,t as C}from"./Field-MbNEi3Jk.js";import{n as w,t as ee}from"./Card-o6xHO1cU.js";import{n as T,t as te}from"./Grid-3RFy1wlK.js";import{n as E,t as D}from"./Stack-B3I2k7mw.js";import{n as O,t as k}from"./Row--NLDOgtN.js";import{n as A,t as j}from"./CopyButton-jZCAJnuE.js";import{n as M,t as N}from"./CodeBlock-JzjCEPXH.js";import{n as P,t as F}from"./CheckboxGroup-B4Hsmnu2.js";import{n as I,t as L}from"./RadioGroup-CI6vCRc5.js";function R(e,r){f(r,!0);let l=s(`daily`),u=s(`jane.doe@example`),m=s(`Jane Doe`),h=s(a([`orders`,`stock`])),g=d(()=>!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(t(u)));var _=W(),v=i(_);B(v,{name:`RadioGroup`,asChild:!0,children:(e,r)=>{L(e,{label:`Summary e-mail`,options:[{value:`off`,label:`Off`},{value:`daily`,label:`Daily`,description:`Every morning at 8:00`},{value:`weekly`,label:`Weekly`,description:`Mondays`}],get value(){return t(l)},set value(e){n(l,e,!0)}})},$$slots:{default:!0},parameters:{docs:{description:{story:`One of n, stacked with descriptions.`}},__svelteCsf:{rawCode:`<RadioGroup
  label="Summary e-mail"
  bind:value={digest}
  options={[
    { value: 'off', label: 'Off' },
    { value: 'daily', label: 'Daily', description: 'Every morning at 8:00' },
    { value: 'weekly', label: 'Weekly', description: 'Mondays' },
  ]}
/>`}}});var b=p(v,2);B(b,{name:`RadioGroup horizontal`,asChild:!0,children:(e,t)=>{L(e,{label:`Environment`,orientation:`horizontal`,value:`prod`,options:[{value:`prod`,label:`Production`},{value:`stage`,label:`Staging`},{value:`dev`,label:`Development`}]})},$$slots:{default:!0},parameters:{docs:{description:{story:`The same in a wrapping row.`}},__svelteCsf:{rawCode:`<RadioGroup
  label="Environment"
  orientation="horizontal"
  value="prod"
  options={[
    { value: 'prod', label: 'Production' },
    { value: 'stage', label: 'Staging' },
    { value: 'dev', label: 'Development' },
  ]}
/>`}}});var S=p(b,2);B(S,{name:`Field with validation`,asChild:!0,children:(e,r)=>{{let r=(e,r)=>{let i=()=>r?.().id,a=()=>r?.().errorId,o=()=>r?.().invalid;{let r=d(()=>o()?a():void 0);x(e,{get id(){return i()},get invalid(){return o()},get"aria-describedby"(){return t(r)},get value(){return t(u)},set value(e){n(u,e,!0)}})}},i=d(()=>t(g)?`Enter a valid e-mail address`:void 0);C(e,{label:`E-mail`,required:!0,hint:`Used for sign-in`,get error(){return t(i)},children:r,$$slots:{default:!0}})}},$$slots:{default:!0},parameters:{docs:{description:{story:"A label over a control. The error replaces the hint and is wired to the input through\n    `aria-describedby`."}},__svelteCsf:{rawCode:`<Field
  label="E-mail"
  required
  hint="Used for sign-in"
  error={invalid ? 'Enter a valid e-mail address' : undefined}
>
  {#snippet children({ id, errorId, invalid: bad })}
    <Input {id} bind:value={email} invalid={bad} aria-describedby={bad ? errorId : undefined} />
  {/snippet}
</Field>`}}});var w=p(S,2);B(w,{name:`Settings form`,asChild:!0,children:(e,r)=>{ee(e,{title:`Profile`,children:(e,r)=>{D(e,{gap:`lg`,children:(e,r)=>{var a=H(),s=i(a);te(s,{columns:2,min:`14rem`,children:(e,r)=>{var a=V(),s=i(a);C(s,{label:`Name`,required:!0,children:(e,r)=>{let i=()=>r?.().id;x(e,{get id(){return i()},get value(){return t(m)},set value(e){n(m,e,!0)}})},$$slots:{default:!0}});var c=p(s,2);C(c,{label:`E-mail`,hint:`We never share it`,children:(e,t)=>{let n=()=>t?.().id;x(e,{get id(){return n()},type:`email`,value:`jane.doe@example.com`})},$$slots:{default:!0}}),o(e,a)},$$slots:{default:!0}});var c=p(s,2);F(c,{label:`Notify me about`,options:[{value:`orders`,label:`New orders`},{value:`stock`,label:`Low stock`},{value:`reviews`,label:`New reviews`},{value:`newsletter`,label:`Product news`}],get value(){return t(h)},set value(e){n(h,e,!0)}});var l=p(c,2);k(l,{justify:`end`,children:(e,t)=>{var n=V(),r=i(n);y(r,{variant:`ghost`,label:`Cancel`});var a=p(r,2);y(a,{variant:`primary`,label:`Save changes`}),o(e,n)},$$slots:{default:!0}}),o(e,a)},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`A complete settings form: Fields in a Grid (two columns, one on a phone), a CheckboxGroup
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
</Card>`}}});var T=p(w,2);B(T,{name:`CodeBlock`,asChild:!0,children:(e,t)=>{D(e,{gap:`md`,children:(e,t)=>{var n=V(),r=i(n);N(r,{label:`Request`,code:`curl -H "Authorization: Bearer $TOKEN" \\
  https://api.example.com/v1/orders?status=open`});var a=p(r,2);N(a,{label:`API token`,code:`tok_demo_8f3a91c2d4e5b6a7f8091a2b3c4d5e6f`,secret:!0}),o(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"Preformatted text with a caption and a copy button; `secret` masks it until revealed."}},__svelteCsf:{rawCode:`<Stack gap="md">
  <CodeBlock
    label="Request"
    code={\`curl -H "Authorization: Bearer $TOKEN" \\\\
https://api.example.com/v1/orders?status=open\`}
  />
  <CodeBlock label="API token" code="tok_demo_8f3a91c2d4e5b6a7f8091a2b3c4d5e6f" secret />
</Stack>`}}});var E=p(T,2);B(E,{name:`CopyButton`,asChild:!0,children:(e,t)=>{k(e,{gap:`sm`,children:(e,t)=>{var n=U(),r=p(i(n),2);j(r,{value:`3f1c9a2e-8a1d-4f7b`,iconOnly:!0});var a=p(r,2);j(a,{value:`3f1c9a2e-8a1d-4f7b`,label:`Copy order id`}),o(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`An icon-only copy button next to a value, and a labelled one. A fresh copy ticks and throws a
    pinch of sprinkles; copying again within two seconds stays quiet.`}},__svelteCsf:{rawCode:`<Row gap="sm">
  <code>3f1c9a2e-8a1d-4f7b</code>
  <CopyButton value="3f1c9a2e-8a1d-4f7b" iconOnly />
  <CopyButton value="3f1c9a2e-8a1d-4f7b" label="Copy order id" />
</Row>`}}}),o(e,_),c()}var z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q;function $(){return($=e((()=>{l(),m(),P(),M(),A(),S(),I(),v(),w(),b(),T(),O(),E(),u(),h(),z={title:`Molecules/Forms & content`,component:L,tags:[`autodocs`],parameters:{layout:`padded`}},{Story:B}=g(z),V=r(`<!> <!>`,1),H=r(`<!> <!> <!>`,1),U=r(`<code>3f1c9a2e-8a1d-4f7b</code> <!> <!>`,1),W=r(`<!> <!> <!> <!> <!> <!>`,1),R.__docgen={data:[],name:`Forms.stories.svelte`},G=_(R,z),K=[`RadioGroup`,`RadioGroupHorizontal`,`FieldWithValidation`,`SettingsForm`,`CodeBlock`,`CopyButton`],q={...G.RadioGroup,tags:[`svelte-csf-v5`]},J={...G.RadioGroupHorizontal,tags:[`svelte-csf-v5`]},Y={...G.FieldWithValidation,tags:[`svelte-csf-v5`]},X={...G.SettingsForm,tags:[`svelte-csf-v5`]},Z={...G.CodeBlock,tags:[`svelte-csf-v5`]},Q={...G.CopyButton,tags:[`svelte-csf-v5`]}})))()}$();export{Z as CodeBlock,Q as CopyButton,Y as FieldWithValidation,q as RadioGroup,J as RadioGroupHorizontal,X as SettingsForm,K as __namedExportsOrder,z as default};