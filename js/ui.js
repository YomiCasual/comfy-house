class UI {

//ADD PRODUCTS TO HTML
addProductsToHTML(products) { 
let productsDOM = document.querySelector('.products-center')
let output = ``
products.forEach(product => {
output += `
			<article class="product">
          	<div class="img-container">
           	<img
              src="${product.img}"
              alt="${product.img}"
              class="product-img"
            />
            <button class="bag-btn" data-id="${product.id}">
              <i class="fas fa-shopping-cart"></i>
              add to cart
            </button>
          	</div>
          	<h3>${product.title}</h3>
          	<h4>${product.price}</h4>
        	</article>
		  `
})


productsDOM.innerHTML = output

}


//add Cart to HTML 
addCart(product) {
let cartDOM = document.querySelector('.cart-content');
let div = document.createElement('div');
div.classList.add('cart-item')

div.innerHTML = `
				<img src="${product.img}" alt="${product.img}" />
            	<div>
            	<h4>${product.title}</h4>
              	<h5>${product.price}</h5>
              	<span class="remove-item" data-id=${product.id}>remove</span>
            	</div>
            	<div>
              	<i class="fas fa-chevron-up" data-id=${product.id}>+</i>
              	<p class="item-amount">
               	${product.amount}
              	</p>
              	<i class="fas fa-chevron-down" data-id=${product.id}> - </i>
            	</div>
				`

cartDOM.appendChild(div)

this.showCart();
}

showCart() {
	let cartOverlay = document.querySelector('.cart-overlay');
	let cart = document.querySelector('.cart');

	cartOverlay.classList.add('transparentBcg');
	cart.classList.add('showCart')

}

hideCart() {
	let cartOverlay = document.querySelector('.cart-overlay');
	let cart = document.querySelector('.cart');

	cartOverlay.classList.remove('transparentBcg');
	cart.classList.remove('showCart')
}


//empty the Cart 


//end of class
}