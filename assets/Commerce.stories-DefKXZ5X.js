import{n as e}from"./rolldown-runtime-Dxh6kD9_.js";import{Ct as t,Ft as n,Gt as r,Ht as i,Mn as a,On as o,Pt as s,Rt as c,Sn as l,St as ee,Wt as te,cn as u,hn as d,l as f,on as p,p as m,tt as ne,xn as re,xt as h,zt as g}from"./iframe-WlNMZtZ0.js";import{i as _,n as v,r as y,t as b}from"./create-runtime-stories-CbHiKinS.js";import{n as x,t as S}from"./Button-DHLILcYm.js";import{n as C,t as w}from"./Card-BqZAAHlF.js";import{n as T,t as E}from"./Grid-CbFksUeV.js";import{n as D,t as O}from"./Stack-BjV-rmuj.js";import{n as k,t as A}from"./Row-IIXhUlbK.js";import{n as j,t as M}from"./QuantityStepper-DZDtmUpQ.js";import{i as ie,n as ae,r as N,t as P}from"./ProductCard-Bx7OUVj8.js";import{n as oe,t as se}from"./CheckoutSteps-Din34Z6z.js";import{_ as ce,d as F,h as I,u as le,v as ue}from"./mock-shop-HOkEgzgf.js";import{n as de,t as L}from"./VariantPicker-CBuCOF5m.js";function R(e,t){l(t,!0);let n=u(2),s=u(`sage`),f=u(`m`),_=u(1),v=u(te([{id:`a`,title:`Relaxed linen shirt`,meta:`Sage · M`,price:59,quantity:1},{id:`b`,title:`Speckled ceramic mug`,meta:`Sky`,price:18,quantity:2}]));var y=W(),b=g(y);B(b,{name:`Playground`,template:(e,t=o)=>{var n=V(),r=c(n);P(r,m(t)),a(n),h(e,n)},$$slots:{template:!0},parameters:{docs:{description:{story:`Every control in the panel works.`}},__svelteCsf:{rawCode:`<div style="max-width:17rem"><ProductCard {...args} /></div>`}}});var x=i(b,2);B(x,{name:`ProductCard states`,asChild:!0,children:(e,t)=>{E(e,{min:`13rem`,children:(e,t)=>{var n=H(),a=g(n);{let e=d(()=>I(`merino-crew`));P(a,{title:`Merino crew knit`,price:89,badge:`Bestseller`,rating:4.8,reviews:342,get image(){return r(e)},href:`#`,onadd:()=>F(),onwishlist:()=>{},wishlisted:!0})}var o=i(a,2);{let e=d(()=>I(`cord-overshirt`));P(o,{title:`Corduroy overshirt`,price:74,compareAt:99,get image(){return r(e)},href:`#`,onadd:()=>F()})}var s=i(o,2);{let e=d(()=>I(`cable-cardigan`));P(s,{title:`Chunky cable cardigan`,price:119,soldOut:!0,get image(){return r(e)},href:`#`,onadd:()=>F()})}var c=i(s,2);P(c,{title:`Gift card`,price:50,badge:`Digital`,onadd:()=>F()}),h(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"Discount badge from `compareAt`, an own badge, sold out, and no picture (placeholder)."}},__svelteCsf:{rawCode:`<Grid min="13rem">
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
</Grid>`}}});var C=i(x,2);B(C,{name:`QuantityStepper`,asChild:!0,children:(e,t)=>{A(e,{gap:`lg`,children:(e,t)=>{var a=H(),o=g(a);M(o,{max:10,get value(){return r(n)},set value(e){p(n,e,!0)}});var s=i(o,2);M(s,{value:1,size:`sm`});var c=i(s,2);M(c,{value:3,size:`lg`,min:0});var l=i(c,2);M(l,{value:1,disabled:!0}),h(e,a)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Arrow keys step, Page Up/Down by ten, Home/End to the limits; type a number and press Enter.
    The figure rolls in the direction of the step and pushing past a limit gets a polite
    head-shake — feedback you can feel. No sprinkles: changing a number is not a finish line.`}},__svelteCsf:{rawCode:`<Row gap="lg">
  <QuantityStepper bind:value={quantity} max={10} />
  <QuantityStepper value={1} size="sm" />
  <QuantityStepper value={3} size="lg" min={0} />
  <QuantityStepper value={1} disabled />
</Row>`}}});var T=i(C,2);B(T,{name:`VariantPicker`,asChild:!0,children:(e,t)=>{O(e,{gap:`lg`,children:(e,t)=>{var n=U(),a=g(n);L(a,{label:`Colour`,get options(){return ce},get value(){return r(s)},set value(e){p(s,e,!0)}});var o=i(a,2);L(o,{label:`Size`,get options(){return ue},get value(){return r(f)},set value(e){p(f,e,!0)}}),h(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Colour swatches and size pills, both radio groups; sold-out options are skipped.`}},__svelteCsf:{rawCode:`<Stack gap="lg">
  <VariantPicker label="Colour" options={productColors} bind:value={color} />
  <VariantPicker label="Size" options={productSizes} bind:value={size} />
</Stack>`}}});var D=i(T,2);B(D,{name:`CartLine`,asChild:!0,children:(e,t)=>{E(e,{columns:`2fr 1fr`,collapse:`lg`,gap:`lg`,children:(e,t)=>{var n=U(),a=g(n);w(a,{children:(e,t)=>{var n=ee(),i=g(n);ne(i,17,()=>r(v),e=>e.id,(e,t,n)=>{{let n=d(()=>I(r(t).id===`a`?`linen-shirt`:`ceramic-mug`,200,200));N(e,{get title(){return r(t).title},get meta(){return r(t).meta},get price(){return r(t).price},get image(){return r(n)},onquantity:()=>{},onremove:()=>p(v,r(v).filter(e=>e.id!==r(t).id),!0),get quantity(){return r(t).quantity},set quantity(e){r(t).quantity=e}})}}),h(e,n)},$$slots:{default:!0}});var o=i(a,2);w(o,{children:(e,t)=>{var n=U(),r=g(n);N(r,{title:`Relaxed linen shirt`,meta:`Sage · M`,price:59,quantity:2});var a=i(r,2);N(a,{title:`Speckled ceramic mug`,meta:`Sky`,price:18,quantity:1}),h(e,n)},$$slots:{default:!0}}),h(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Lines inside a card; they lay themselves out compactly when the card is narrow.`}},__svelteCsf:{rawCode:`<Grid columns="2fr 1fr" collapse="lg" gap="lg">
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
</Grid>`}}});var k=i(D,2);B(k,{name:`CheckoutSteps`,asChild:!0,children:(e,t)=>{O(e,{gap:`lg`,children:(e,t)=>{var n=U(),a=g(n);se(a,{get current(){return r(_)},onstep:e=>p(_,e,!0)});var o=i(a,2);A(o,{children:(e,t)=>{var n=U(),a=g(n);{let e=d(()=>r(_)===0);S(a,{label:`Back`,get disabled(){return r(e)},onclick:()=>p(_,Math.max(0,r(_)-1),!0)})}var o=i(a,2);{let e=d(()=>r(_)===3);S(o,{variant:`primary`,label:`Next`,get disabled(){return r(e)},onclick:()=>p(_,Math.min(3,r(_)+1),!0)})}h(e,n)},$$slots:{default:!0}}),h(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:"The Stepper preset for checkouts; finished steps go back with `onstep`."}},__svelteCsf:{rawCode:`<Stack gap="lg">
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
</Stack>`}}}),h(e,y),re()}var z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q;function $(){return($=e((()=>{n(),s(),_(),ie(),oe(),ae(),j(),de(),x(),C(),T(),k(),D(),le(),f(),v(),z={title:`Molecules/Commerce`,component:P,tags:[`autodocs`],parameters:{layout:`padded`},args:{title:`Relaxed linen shirt`,subtitle:`Example Studio`,price:59,compareAt:79,rating:4.6,reviews:128,colors:[`#9bb59a`,`#e3d5bd`,`#2f3640`,`#8fb3d9`],image:I(`linen-shirt`),imageAlt:`Linen shirt on a hanger`,href:`#product`,soldOut:!1,onadd:()=>F(),onwishlist:()=>{}}},{Story:B}=y(z),V=t(`<div style="max-width:17rem"><!></div>`),H=t(`<!> <!> <!> <!>`,1),U=t(`<!> <!>`,1),W=t(`<!> <!> <!> <!> <!> <!>`,1),R.__docgen={data:[],name:`Commerce.stories.svelte`},G=b(R,z),K=[`Playground`,`ProductCardStates`,`QuantityStepper`,`VariantPicker`,`CartLine`,`CheckoutSteps`],q={...G.Playground,tags:[`svelte-csf-v5`]},J={...G.ProductCardStates,tags:[`svelte-csf-v5`]},Y={...G.QuantityStepper,tags:[`svelte-csf-v5`]},X={...G.VariantPicker,tags:[`svelte-csf-v5`]},Z={...G.CartLine,tags:[`svelte-csf-v5`]},Q={...G.CheckoutSteps,tags:[`svelte-csf-v5`]}})))()}$();export{Z as CartLine,Q as CheckoutSteps,q as Playground,J as ProductCardStates,Y as QuantityStepper,X as VariantPicker,K as __namedExportsOrder,z as default};