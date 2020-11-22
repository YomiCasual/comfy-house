class LS {

//save Products
	saveProducts(products) {
		sessionStorage.setItem('products', JSON.stringify(products))
	}

//getProducts 
	getProducts() {
		return JSON.parse(sessionStorage.getItem('products'))
	}
	
	saveCart(cart) {
		localStorage.setItem('cart', JSON.stringify(cart))
	}

	getCart() {
		if (localStorage.getItem('cart')) {
			return JSON.parse(localStorage.getItem('cart'))
		}

		else {
			return [];
		}
}
}