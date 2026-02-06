let cart = JSON.parse(localStorage.getItem('cart')||'[]');

function addToCart(name,price){
  cart.push({name,price});
  localStorage.setItem('cart',JSON.stringify(cart));
  alert('Added to cart');
}

function renderCart(){
  let el=document.getElementById('cart');
  let total=0;
  el.innerHTML='';
  cart.forEach(i=>{
    el.innerHTML+=`<p>${i.name} - £${i.price}</p>`;
    total+=i.price;
  });
  el.innerHTML+=`<strong>Total: £${total}</strong>`;
}

function checkout(){
  let msg='Hello Lilaura,%0AI would like to order:%0A';
  let total=0;
  cart.forEach(i=>{msg+=`• ${i.name} (£${i.price})%0A`; total+=i.price;});
  msg+=`Total: £${total}`;
  window.open('https://wa.me/447303179015?text='+msg,'_blank');
}