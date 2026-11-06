import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{Mt as t,Qt as n,St as r,Ut as i,Wt as a,Yt as o,bt as s,en as c,fn as l,jn as u,l as d,on as f,pn as p,qt as m,rt as h,wn as g,xt as _}from"./iframe-CWg4yaha.js";import{i as v,n as y,r as b,t as x}from"./create-runtime-stories-DQq0d2lF.js";import{n as S,t as C}from"./Grid-Cus4ZVN3.js";import{i as w,r as T}from"./ProductCard-sYnAnZ_o.js";import{i as E,n as D,r as O,t as k}from"./ProductGrid-DRSiNbh8.js";import{d as A,i as j,l as M,r as N,u as P,y as F}from"./mock-shop-D133ti18.js";import{n as I,t as L}from"./ProductGallery-CqytpyJH.js";function R(e,r){p(r,!0);let u=c(o([`merino-crew`])),d=c(o(j())),v=c(0),y=c(void 0),b=f(()=>t(d).reduce((e,t)=>e+t.price*t.quantity,0));var x=W(),S=a(x);B(S,{name:`ProductGrid`,asChild:!0,children:(e,r)=>{k(e,{get products(){return F},onadd:()=>A(),onopen:()=>{},get wishlist(){return t(u)},set wishlist(e){n(u,e,!0)}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Two columns on phones, as many as fit above. The heart and the cart button are live.`}},__svelteCsf:{rawCode:`<ProductGrid {products} bind:wishlist onadd={() => later()} onopen={() => {}} />`}}});var w=m(S,2);B(w,{name:`ProductGrid empty`,asChild:!0,children:(e,t)=>{k(e,{products:[]})},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<ProductGrid products={[]} />`}}});var E=m(w,2);B(E,{name:`ProductGallery`,asChild:!0,children:(e,n)=>{C(e,{columns:`1fr 1fr`,collapse:`md`,gap:`xl`,children:(e,n)=>{var r=V(),i=a(r);{let e=f(()=>M(`linen`));L(i,{get images(){return t(e)}})}var o=m(i,2);{let e=f(()=>M(`mug`));L(o,{get images(){return t(e)},thumbs:`side`,aspect:`4 / 5`})}s(e,r)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{docs:{description:{story:`Arrow keys page through while focus is inside; thumbnails jump.`}},__svelteCsf:{rawCode:`<Grid columns="1fr 1fr" collapse="md" gap="xl">
  <ProductGallery images={galleryImages('linen')} />
  <ProductGallery images={galleryImages('mug')} thumbs="side" aspect="4 / 5" />
</Grid>`}}});var D=m(E,2);B(D,{name:`CartSummary`,asChild:!0,children:(e,r)=>{var o=H(),c=i(o);{let e=f(()=>t(b)>=150?0:4.9),r=f(()=>t(v)?Math.round(t(b)*t(v)*100)/100:void 0);O(c,{get subtotal(){return t(b)},get shipping(){return t(e)},get discount(){return t(r)},get discountCode(){return t(y)},freeShippingFrom:150,ondiscount:async e=>{n(v,await N(e),!0),n(y,e.toUpperCase(),!0)},onremovediscount:()=>{n(v,0),n(y,void 0)},oncheckout:()=>A(),note:`Secure payment · Free returns within 30 days`,children:(e,r)=>{var i=_(),o=a(i);h(o,17,()=>t(d),e=>e.id,(e,r,i)=>{T(e,{get title(){return t(r).title},get meta(){return t(r).meta},get price(){return t(r).price},get image(){return t(r).image},onquantity:()=>{},onremove:()=>n(d,t(d).filter(e=>e.id!==t(r).id),!0),get quantity(){return t(r).quantity},set quantity(e){t(r).quantity=e}})}),s(e,i)},$$slots:{default:!0}})}g(o),s(e,o)},$$slots:{default:!0},parameters:{docs:{description:{story:`Lines as children, the free-shipping bar, and the code "SPRING10" (anything else fails).`}},__svelteCsf:{rawCode:`<div style="max-width:28rem">
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
</div>`}}});var P=m(D,2);B(P,{name:`CartSummary totals only`,asChild:!0,children:(e,t)=>{var n=U(),r=i(n);O(r,{subtotal:136,tax:25.84,taxIncluded:!1,checkoutHref:`#checkout`}),g(n),s(e,n)},$$slots:{default:!0},parameters:{docs:{description:{story:`Totals only: shipping still unknown, tax listed separately.`}},__svelteCsf:{rawCode:`<div style="max-width:24rem">
  <CartSummary subtotal={136} tax={25.84} taxIncluded={false} checkoutHref="#checkout" />
</div>`}}}),s(e,x),l()}var z,B,V,H,U,W,G,K,q,J,Y,X,Z;function Q(){return(Q=e((()=>{u(),v(),E(),I(),D(),w(),S(),P(),d(),y(),z={title:`Organisms/Shop`,component:k,tags:[`autodocs`],parameters:{layout:`padded`}},{Story:B}=b(z),V=r(`<!> <!>`,1),H=r(`<div style="max-width:28rem"><!></div>`),U=r(`<div style="max-width:24rem"><!></div>`),W=r(`<!> <!> <!> <!> <!>`,1),R.__docgen={data:[],name:`Shop.stories.svelte`},G=x(R,z),K=[`ProductGrid`,`ProductGridEmpty`,`ProductGallery`,`CartSummary`,`CartSummaryTotalsOnly`],q={...G.ProductGrid,tags:[`svelte-csf-v5`]},J={...G.ProductGridEmpty,tags:[`svelte-csf-v5`]},Y={...G.ProductGallery,tags:[`svelte-csf-v5`]},X={...G.CartSummary,tags:[`svelte-csf-v5`]},Z={...G.CartSummaryTotalsOnly,tags:[`svelte-csf-v5`]}})))()}Q();export{X as CartSummary,Z as CartSummaryTotalsOnly,Y as ProductGallery,q as ProductGrid,J as ProductGridEmpty,K as __namedExportsOrder,z as default};