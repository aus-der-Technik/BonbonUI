import{n as e}from"./rolldown-runtime-Dxh6kD9_.js";import{Ct as t,Ft as n,Gt as r,Ht as i,Mn as a,Pt as o,Rt as s,Sn as c,St as l,Wt as u,cn as d,hn as f,l as p,on as m,tt as h,xn as g,xt as _,zt as v}from"./iframe-WlNMZtZ0.js";import{i as y,n as b,r as x,t as S}from"./create-runtime-stories-CbHiKinS.js";import{n as C,t as w}from"./Grid-CbFksUeV.js";import{i as T,r as E}from"./ProductCard-Bx7OUVj8.js";import{i as D,n as O,r as k,t as A}from"./ProductGrid-BrgBQz8Y.js";import{d as j,i as M,l as N,r as P,u as F,y as I}from"./mock-shop-HOkEgzgf.js";import{n as L,t as R}from"./ProductGallery--pGglGF9.js";function z(e,t){c(t,!0);let n=d(u([`merino-crew`])),o=d(u(M())),p=d(0),y=d(void 0),b=f(()=>r(o).reduce((e,t)=>e+t.price*t.quantity,0));var x=G(),S=v(x);V(S,{name:`ProductGrid`,asChild:!0,children:(e,t)=>{A(e,{get products(){return I},onadd:()=>j(),onopen:()=>{},get wishlist(){return r(n)},set wishlist(e){m(n,e,!0)}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Two columns on phones, as many as fit above. The heart and the cart button are live.`}},__svelteCsf:{rawCode:`<ProductGrid {products} bind:wishlist onadd={() => later()} onopen={() => {}} />`}}});var C=i(S,2);V(C,{name:`ProductGrid empty`,asChild:!0,children:(e,t)=>{A(e,{products:[]})},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<ProductGrid products={[]} />`}}});var T=i(C,2);V(T,{name:`ProductGallery`,asChild:!0,children:(e,t)=>{w(e,{columns:`1fr 1fr`,collapse:`md`,gap:`xl`,children:(e,t)=>{var n=H(),a=v(n);{let e=f(()=>N(`linen`));R(a,{get images(){return r(e)}})}var o=i(a,2);{let e=f(()=>N(`mug`));R(o,{get images(){return r(e)},thumbs:`side`,aspect:`4 / 5`})}_(e,n)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Arrow keys page through while focus is inside; thumbnails jump.`}},__svelteCsf:{rawCode:`<Grid columns="1fr 1fr" collapse="md" gap="xl">
  <ProductGallery images={galleryImages('linen')} />
  <ProductGallery images={galleryImages('mug')} thumbs="side" aspect="4 / 5" />
</Grid>`}}});var D=i(T,2);V(D,{name:`CartSummary`,asChild:!0,children:(e,t)=>{var n=U(),i=s(n);{let e=f(()=>r(b)>=150?0:4.9),t=f(()=>r(p)?Math.round(r(b)*r(p)*100)/100:void 0);k(i,{get subtotal(){return r(b)},get shipping(){return r(e)},get discount(){return r(t)},get discountCode(){return r(y)},freeShippingFrom:150,ondiscount:async e=>{m(p,await P(e),!0),m(y,e.toUpperCase(),!0)},onremovediscount:()=>{m(p,0),m(y,void 0)},oncheckout:()=>j(),note:`Secure payment · Free returns within 30 days`,children:(e,t)=>{var n=l(),i=v(n);h(i,17,()=>r(o),e=>e.id,(e,t,n)=>{E(e,{get title(){return r(t).title},get meta(){return r(t).meta},get price(){return r(t).price},get image(){return r(t).image},onquantity:()=>{},onremove:()=>m(o,r(o).filter(e=>e.id!==r(t).id),!0),get quantity(){return r(t).quantity},set quantity(e){r(t).quantity=e}})}),_(e,n)},$$slots:{default:!0}})}a(n),_(e,n)},$$slots:{default:!0},parameters:{docs:{description:{story:`Lines as children, the free-shipping bar, and the code "SPRING10" (anything else fails).`}},__svelteCsf:{rawCode:`<div style="max-width:28rem">
  <CartSummary
    {subtotal}
    shipping={subtotal >= 150 ? 0 : 4.9}
    discount={rate ? Math.round(subtotal * rate * 100) / 100 : undefined}
    discountCode={code}
    freeShippingFrom={150}
    ondiscount={async (value) => {
      rate = await applyCode(value);
      code = value.toUpperCase();
    }}
    onremovediscount={() => {
      rate = 0;
      code = undefined;
    }}
    oncheckout={() => later()}
    note="Secure payment · Free returns within 30 days"
  >
    {#each lines as line (line.id)}
      <CartLine
        title={line.title}
        meta={line.meta}
        price={line.price}
        image={line.image}
        bind:quantity={line.quantity}
        onquantity={() => {}}
        onremove={() => (lines = lines.filter((l) => l.id !== line.id))}
      />
    {/each}
  </CartSummary>
</div>`}}});var O=i(D,2);V(O,{name:`CartSummary totals only`,asChild:!0,children:(e,t)=>{var n=W(),r=s(n);k(r,{subtotal:136,tax:25.84,taxIncluded:!1,checkoutHref:`#checkout`}),a(n),_(e,n)},$$slots:{default:!0},parameters:{docs:{description:{story:`Totals only: shipping still unknown, tax listed separately.`}},__svelteCsf:{rawCode:`<div style="max-width:24rem">
  <CartSummary subtotal={136} tax={25.84} taxIncluded={false} checkoutHref="#checkout" />
</div>`}}}),_(e,x),g()}var B,V,H,U,W,G,K,q,J,Y,X,Z,Q;function $(){return($=e((()=>{n(),o(),y(),D(),L(),O(),T(),C(),F(),p(),b(),B={title:`Organisms/Shop`,component:A,tags:[`autodocs`],parameters:{layout:`padded`}},{Story:V}=x(B),H=t(`<!> <!>`,1),U=t(`<div style="max-width:28rem"><!></div>`),W=t(`<div style="max-width:24rem"><!></div>`),G=t(`<!> <!> <!> <!> <!>`,1),z.__docgen={data:[],name:`Shop.stories.svelte`},K=S(z,B),q=[`ProductGrid`,`ProductGridEmpty`,`ProductGallery`,`CartSummary`,`CartSummaryTotalsOnly`],J={...K.ProductGrid,tags:[`svelte-csf-v5`]},Y={...K.ProductGridEmpty,tags:[`svelte-csf-v5`]},X={...K.ProductGallery,tags:[`svelte-csf-v5`]},Z={...K.CartSummary,tags:[`svelte-csf-v5`]},Q={...K.CartSummaryTotalsOnly,tags:[`svelte-csf-v5`]}})))()}$();export{Z as CartSummary,Q as CartSummaryTotalsOnly,X as ProductGallery,J as ProductGrid,Y as ProductGridEmpty,q as __namedExportsOrder,B as default};