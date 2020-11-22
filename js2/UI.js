class UI{
	constructor() {
	this.productsDOM = document.querySelector('.products-center');
	this.cartContent = document.querySelector('.cart-content');
	
	}

	async displayProducts() {
		  await productsAPI.fetchProducts()
			.then(products => {
				//save item to LOCAL STORAGE
				products = products.map(product => {
					return { ...product, inCart: false}
				} )
				ls.saveItem(products, 'products')

				//OUTPUT IT OUT
				let output = ""
				products.map(product => {
					return output += `
						<article class="product">
			          	<div class="img-container">
			           	<img
			              src=${product.image}
			              alt="${product.image}"
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
				this.productsDOM.innerHTML = output
	
			})
	}

	clearCartDOM() {
		this.cartContent.innerHTML = ''
	}

	addToCart(item) {
			let div = document.createElement('div');
			div.classList.add('cart-item')

			div.innerHTML = `
							<img src="${item.image}" alt="${item.image}" />
			            	<div>
			            	<h4>${item.title}</h4>
			              	<h5>${item.price}</h5>
			              	<span class="remove-item" data-id=${item.id}>remove</span>
			            	</div>
			            	<div>
			              	<i class="fas fa-chevron-up" data-id=${item.id}>+</i>
			              	<p class="item-amount">
			               	${item.amount}
			              	</p>
			              	<i class="fas fa-chevron-down" data-id=${item.id}> - </i>
			            	</div>
							`

			this.cartContent.appendChild(div)

	}


//end of class
}

const productsAPI = new ProductAPI
const ls = new LS()