import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Mt as t,Qt as n,St as r,Ut as i,Wt as a,Yt as o,bt as s,en as c,fn as l,jn as u,kn as d,l as f,on as p,p as ee,pn as m,qt as h,rt as te,wn as ne,xt as re}from"./iframe-CWg4yaha.js";import{i as g,n as _,r as v,t as y}from"./create-runtime-stories-DQq0d2lF.js";import{n as b,t as x}from"./Button-D4mD58qs.js";import{n as S,t as C}from"./Card-5RIl20Vt.js";import{n as w,t as T}from"./Grid-Cus4ZVN3.js";import{n as E,t as D}from"./Stack-vorXuMUJ.js";import{n as O,t as k}from"./Row-CYSAvGKl.js";import{n as A,t as j}from"./QuantityStepper-Bg3RgR7N.js";import{i as M,n as ie,r as N,t as P}from"./ProductCard-sYnAnZ_o.js";import{n as ae,t as oe}from"./CheckoutSteps-Cz013MBe.js";import{_ as se,d as F,h as I,u as ce,v as le}from"./mock-shop-D133ti18.js";import{n as ue,t as L}from"./VariantPicker-NLQyD2yp.js";function R(e,r){m(r,!0);let u=c(2),f=c(`sage`),g=c(`m`),_=c(1),v=c(o([{id:`a`,title:`Relaxed linen shirt`,meta:`Sage · M`,price:59,quantity:1},{id:`b`,title:`Speckled ceramic mug`,meta:`Sky`,price:18,quantity:2}]));var y=W(),b=a(y);B(b,{name:`Playground`,template:(e,t=d)=>{var n=V(),r=i(n);P(r,ee(t)),ne(n),s(e,n)},$$slots:{template:!0},parameters:{docs:{description:{story:`Every control in the panel works.`}},__svelteCsf:{rawCode:`<div style="max-width:17rem"><ProductCard {...args} /></div>`}}});var S=h(b,2);B(S,{name:`ProductCard states`,asChild:!0,children:(e,n)=>{T(e,{min:`13rem`,children:(e,n)=>{var r=H(),i=a(r);{let e=p(()=>I(`merino-crew`));P(i,{title:`Merino crew knit`,price:89,badge:`Bestseller`,rating:4.8,reviews:342,get image(){return t(e)},href:`#`,onadd:()=>F(),onwishlist:()=>{},wishlisted:!0})}var o=h(i,2);{let e=p(()=>I(`cord-overshirt`));P(o,{title:`Corduroy overshirt`,price:74,compareAt:99,get image(){return t(e)},href:`#`,onadd:()=>F()})}var c=h(o,2);{let e=p(()=>I(`cable-cardigan`));P(c,{title:`Chunky cable cardigan`,price:119,soldOut:!0,get image(){return t(e)},href:`#`,onadd:()=>F()})}var l=h(c,2);P(l,{title:`Gift card`,price:50,badge:`Digital`,onadd:()=>F()}),s(e,r)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"Discount badge from `compareAt`, an own badge, sold out, and no picture (placeholder)."}},__svelteCsf:{rawCode:`<Grid min="13rem">
  <ProductCard
    title="Merino crew knit"
    price={89}
    badge="Bestseller"
    rating={4.8}
    reviews={342}
    image={photo('merino-crew')}
    href="#"
    onadd={() => later()}
    onwishlist={() => {}}
    wishlisted
  />
  <ProductCard
    title="Corduroy overshirt"
    price={74}
    compareAt={99}
    image={photo('cord-overshirt')}
    href="#"
    onadd={() => later()}
  />
  <ProductCard
    title="Chunky cable cardigan"
    price={119}
    soldOut
    image={photo('cable-cardigan')}
    href="#"
    onadd={() => later()}
  />
  <ProductCard title="Gift card" price={50} badge="Digital" onadd={() => later()} />
</Grid>`}}});var w=h(S,2);B(w,{name:`QuantityStepper`,asChild:!0,children:(e,r)=>{k(e,{gap:`lg`,children:(e,r)=>{var i=H(),o=a(i);j(o,{max:10,get value(){return t(u)},set value(e){n(u,e,!0)}});var c=h(o,2);j(c,{value:1,size:`sm`});var l=h(c,2);j(l,{value:3,size:`lg`,min:0});var d=h(l,2);j(d,{value:1,disabled:!0}),s(e,i)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Arrow keys step, Page Up/Down by ten, Home/End to the limits; type a number and press Enter.
    The figure rolls in the direction of the step and pushing past a limit gets a polite
    head-shake — feedback you can feel. No sprinkles: changing a number is not a finish line.`}},__svelteCsf:{rawCode:`<Row gap="lg">
  <QuantityStepper bind:value={quantity} max={10} />
  <QuantityStepper value={1} size="sm" />
  <QuantityStepper value={3} size="lg" min={0} />
  <QuantityStepper value={1} disabled />
</Row>`}}});var E=h(w,2);B(E,{name:`VariantPicker`,asChild:!0,children:(e,r)=>{D(e,{gap:`lg`,children:(e,r)=>{var i=U(),o=a(i);L(o,{label:`Colour`,get options(){return se},get value(){return t(f)},set value(e){n(f,e,!0)}});var c=h(o,2);L(c,{label:`Size`,get options(){return le},get value(){return t(g)},set value(e){n(g,e,!0)}}),s(e,i)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Colour swatches and size pills, both radio groups; sold-out options are skipped.`}},__svelteCsf:{rawCode:`<Stack gap="lg">
  <VariantPicker label="Colour" options={productColors} bind:value={color} />
  <VariantPicker label="Size" options={productSizes} bind:value={size} />
</Stack>`}}});var O=h(E,2);B(O,{name:`CartLine`,asChild:!0,children:(e,r)=>{T(e,{columns:`2fr 1fr`,collapse:`lg`,gap:`lg`,children:(e,r)=>{var i=U(),o=a(i);C(o,{children:(e,r)=>{var i=re(),o=a(i);te(o,17,()=>t(v),e=>e.id,(e,r,i)=>{{let i=p(()=>I(t(r).id===`a`?`linen-shirt`:`ceramic-mug`,200,200));N(e,{get title(){return t(r).title},get meta(){return t(r).meta},get price(){return t(r).price},get image(){return t(i)},onquantity:()=>{},onremove:()=>n(v,t(v).filter(e=>e.id!==t(r).id),!0),get quantity(){return t(r).quantity},set quantity(e){t(r).quantity=e}})}}),s(e,i)},$$slots:{default:!0}});var c=h(o,2);C(c,{children:(e,t)=>{var n=U(),r=a(n);N(r,{title:`Relaxed linen shirt`,meta:`Sage · M`,price:59,quantity:2});var i=h(r,2);N(i,{title:`Speckled ceramic mug`,meta:`Sky`,price:18,quantity:1}),s(e,n)},$$slots:{default:!0}}),s(e,i)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Lines inside a card; they lay themselves out compactly when the card is narrow.`}},__svelteCsf:{rawCode:`<Grid columns="2fr 1fr" collapse="lg" gap="lg">
  <Card>
    {#each lines as line (line.id)}
      <CartLine
        title={line.title}
        meta={line.meta}
        price={line.price}
        image={photo(line.id === 'a' ? 'linen-shirt' : 'ceramic-mug', 200, 200)}
        bind:quantity={line.quantity}
        onquantity={() => {}}
        onremove={() => (lines = lines.filter((l) => l.id !== line.id))}
      />
    {/each}
  </Card>
  <Card>
    <CartLine title="Relaxed linen shirt" meta="Sage · M" price={59} quantity={2} />
    <CartLine title="Speckled ceramic mug" meta="Sky" price={18} quantity={1} />
  </Card>
</Grid>`}}});var A=h(O,2);B(A,{name:`CheckoutSteps`,asChild:!0,children:(e,r)=>{D(e,{gap:`lg`,children:(e,r)=>{var i=U(),o=a(i);oe(o,{get current(){return t(_)},onstep:e=>n(_,e,!0)});var c=h(o,2);k(c,{children:(e,r)=>{var i=U(),o=a(i);{let e=p(()=>t(_)===0);x(o,{label:`Back`,get disabled(){return t(e)},onclick:()=>n(_,Math.max(0,t(_)-1),!0)})}var c=h(o,2);{let e=p(()=>t(_)===3);x(c,{variant:`primary`,label:`Next`,get disabled(){return t(e)},onclick:()=>n(_,Math.min(3,t(_)+1),!0)})}s(e,i)},$$slots:{default:!0}}),s(e,i)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"The Stepper preset for checkouts; finished steps go back with `onstep`."}},__svelteCsf:{rawCode:`<Stack gap="lg">
  <CheckoutSteps current={step} onstep={(i) => (step = i)} />
  <Row>
    <Button label="Back" disabled={step === 0} onclick={() => (step = Math.max(0, step - 1))} />
    <Button
      variant="primary"
      label="Next"
      disabled={step === 3}
      onclick={() => (step = Math.min(3, step + 1))}
    />
  </Row>
</Stack>`}}}),s(e,y),l()}var z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q;function $(){return($=e((()=>{u(),g(),M(),ae(),ie(),A(),ue(),b(),S(),w(),O(),E(),ce(),f(),_(),z={title:`Molecules/Commerce`,component:P,tags:[`autodocs`],parameters:{layout:`padded`},args:{title:`Relaxed linen shirt`,subtitle:`Example Studio`,price:59,compareAt:79,rating:4.6,reviews:128,colors:[`#9bb59a`,`#e3d5bd`,`#2f3640`,`#8fb3d9`],image:I(`linen-shirt`),imageAlt:`Linen shirt on a hanger`,href:`#product`,soldOut:!1,onadd:()=>F(),onwishlist:()=>{}}},{Story:B}=v(z),V=r(`<div style="max-width:17rem"><!></div>`),H=r(`<!> <!> <!> <!>`,1),U=r(`<!> <!>`,1),W=r(`<!> <!> <!> <!> <!> <!>`,1),R.__docgen={data:[],name:`Commerce.stories.svelte`},G=y(R,z),K=[`Playground`,`ProductCardStates`,`QuantityStepper`,`VariantPicker`,`CartLine`,`CheckoutSteps`],q={...G.Playground,tags:[`svelte-csf-v5`]},J={...G.ProductCardStates,tags:[`svelte-csf-v5`]},Y={...G.QuantityStepper,tags:[`svelte-csf-v5`]},X={...G.VariantPicker,tags:[`svelte-csf-v5`]},Z={...G.CartLine,tags:[`svelte-csf-v5`]},Q={...G.CheckoutSteps,tags:[`svelte-csf-v5`]}})))()}$();export{Z as CartLine,Q as CheckoutSteps,q as Playground,J as ProductCardStates,Y as QuantityStepper,X as VariantPicker,K as __namedExportsOrder,z as default};