class APP {
	constructor() {
		this.cartHideBtn = document.querySelector('.close-cart');
		this.cartShowBtn = document.querySelector('.cart-btn');
		this.productsDOM = document.querySelector('.products-center');
		this.cartAmount = document.querySelector('.cart-items');
		this.cartTotal = document.querySelector('.cart-total');
		this.clearCartBtn = document.querySelector('.clear-cart');
		this.cartDOM = document.querySelector('.cart');
		this.productsCART = [] 
		this.cart = ls.getItem('cart') || [] 
	
		this.init()
	}

	init() {
		ui.displayProducts().then(() => {
			this.productsCART = ls.getItem('products')
			this.productBtn = document.querySelectorAll('.bag-btn')
			this.loadFromCart(this.cart)
		})
		this.eventListeners()
		
	}

	loadFromCart(cart) {
		this.cart.forEach((item) => {
			ui.addToCart(item)

			const productBtn = [...this.productBtn]

			productBtn.forEach(btn => {
				if(parseInt(btn.dataset.id) === parseInt(item.id)) {
				btn.disabled = true
				btn.innerHTML = `<i class="fas fa-shopping-cart"></i> IN CART`	
				}
			})

			this.productsCART = this.productsCART.map(product => {
				if (parseInt(product.id) === parseInt(item.id)) {
					product.inCart = true
				}
				return product 
			})
		})

		this.cartLogic(this.cart)
	}


	eventListeners() {

		//toggle Cart Cart
		this.cartShowBtn.addEventListener('click', ()=> {
			this.toggleCart()
		})

		this.cartHideBtn.addEventListener('click', () => {
			this.toggleCart()
		})

		this.productsDOM.addEventListener('click', (e) => {

			if(e.target.classList.contains('bag-btn')) {
				this.addToCart(e.target)
			}
		})


		//clear cart function
		this.clearCartBtn.addEventListener('click', () => {
			this.cart = []

			const productBtn = [...this.productBtn]
			productBtn.forEach(btn => {
				btn.disabled = false
				btn.innerHTML = `<i class="fas fa-shopping-cart"></i> add to cart`
			})

			this.productsCART = this.productsCART.map(product => {
				return {...product, inCart: false}
			})

			ui.clearCartDOM()

			this.cartLogic(this.cart)
		})


		//carts DOM EVENT LISTNER
		this.cartDOM.addEventListener('click', (e) => {

			if(e.target.classList.contains('fa-chevron-up')) {
				this.increaseItem(e.target)
			}

			if(e.target.classList.contains('fa-chevron-down')) {
				this.decreaseItem(e.target)
			}
			if(e.target.classList.contains('remove-item')) {
				this.removeItem(e.target)
			}

		})
	//end of event listeners
	}

	increaseItem(item) {
		let id = parseInt(item.dataset.id)
		let amountDOM = item.nextElementSibling

		let itemInCart = this.cart.find(c => parseInt(c.id) === id)
		itemInCart.amount += 1
		ls.saveItem(this.cart, 'cart')

		this.cartLogic(this.cart)
		amountDOM.innerHTML = itemInCart.amount
	}

	decreaseItem(item) {
		let id = parseInt(item.dataset.id)
		let amountDOM = item.previousElementSibling

		let itemInCart = this.cart.find(c => parseInt(c.id) === id)
		itemInCart.amount -= 1

		if (itemInCart.amount < 1) {
			this.removeItem(item)
		}
		ls.saveItem(this.cart, 'cart')

		this.cartLogic(this.cart)
		amountDOM.innerHTML = itemInCart.amount
	}


	removeItem(item) {
		let id = parseInt(item.dataset.id)

		let itemInProduct = this.productsCART.find(c => parseInt(c.id) === id)
		itemInProduct.inCart = false

		this.cart = this.cart.filter(c => parseInt(c.id) !== id)
		ls.saveItem(this.cart, 'cart')
		
		const productBtn = [...this.productBtn]
		productBtn.forEach(btn => {
				if(parseInt(btn.dataset.id) === id) {
				btn.disabled = false
				btn.innerHTML = `<i class="fas fa-shopping-cart"></i> add to cart`	
				}
			})

		let parentElement = item.parentElement.parentElement
		parentElement.remove()

		this.cartLogic(this.cart)
	}

	addToCart(item) {
		let id = parseInt(item.dataset.id)
		let cartItem = this.productsCART.find(product => parseInt(product.id) === id)

		if (cartItem.inCart) {
			console.log('incart')
			return false
		}

		//disable button and show incart
		item.disabled = true
		item.innerHTML = `<i class="fas fa-shopping-cart"></i>
			              IN CART`
		cartItem.inCart = true

		//make of copy of the item and add to cart
		let newCartItem = {...cartItem, amount: 1}
		this.cart = [...this.cart, newCartItem]
		ls.saveItem(this.cart, 'cart')

		//show cart on DOM
		ui.addToCart(newCartItem)

		//carry out the cart logic
		this.cartLogic(this.cart)

		//TOGGLE THE CART BUTTON
		this.toggleCart()
	}


	cartLogic(cart) {
		const cartTotal = cart.reduce((acc, curr) => {
			return acc += curr.price * curr.amount
		}, 0)

		const cartAmount = cart.length
		this.cartAmount.innerHTML = cartAmount
		this.cartTotal.innerHTML = cartTotal.toFixed(2)

	}


	//toggle Cart
	toggleCart() {
		let cartOverlay = document.querySelector('.cart-overlay');
		let cart = document.querySelector('.cart');

		cartOverlay.classList.toggle('transparentBcg');
		cart.classList.toggle('showCart')
	}

}


const ui = new UI()

const app = new APP()