class APP {

constructor() {
	this.cartHideBtn = document.querySelector('.close-cart');
	this.cartShowBtn = document.querySelector('.cart-btn');
	this.productsDOM = document.querySelector('.products-center');
	this.cartAmount = document.querySelector('.cart-items');
	this.cartTotal = document.querySelector('.cart-total');
	this.clearCartBtn = document.querySelector('.clear-cart');
	this.cartContent = document.querySelector('.cart-content');
	this.cartDOM = document.querySelector('.cart');

	this.cart = ls.getCart() || [];


	//eventListener
	this.eventListener();
	//initiate method once the DOM CONTENT loaded
	this.init();
}


eventListener() {
 this.cartHideBtn.addEventListener('click', ui.hideCart);
 window.addEventListener('keydown', (e) => {
 	if (e.key === 'Escape') {
 		if (this.cartDOM.classList.contains('showCart')) {
 			ui.hideCart();

 		} 
 		else {
 			ui.showCart();
 		}

 		
 	}
 });
 this.cartShowBtn.addEventListener('click', ui.showCart);
 this.clearCartBtn.addEventListener('click', (e) => {
 	this.emptyCart(e.target);
 })

 this.cartContent.addEventListener('click', (e) => {
 	this.manipulateCart(e.target);
 })
}

//start once the DOM content Loaded
init() {
	//fetch products from the API and put in the HTML DOM
	productsAPI.getProducts()
	.then(products => {

	ui.addProductsToHTML(products);

	let mProducts = products.map(product => {
		return {...product, amount: 1}
	})
	ls.saveProducts(mProducts);
	})
	.then(() => {
	this.getBagButtons();

		//Load cart from the Local Storage
	if (this.cart.length > 0) {

		this.cart.forEach(cart => {
		ui.addCart(cart);

		let allButtons = document.querySelectorAll('.bag-btn');

		let id = cart.id 
		this.disableButton(id)
		})


		//update the Cart Logic
		this.updateCart(this.cart);

		//show Id
		

	}

})



}



getBagButtons() {
	this.productsDOM.addEventListener('click', (e) => {

	if (e.target.classList.contains('bag-btn')) {
	let button = e.target
	let id = button.dataset.id;
	let productsLS = ls.getProducts();

	let product = productsLS.find(product => product.id === id)

	
	//add To cart 
	this.cart = [...this.cart, product];

	//save Cart to Local Storage
	ls.saveCart(this.cart)

	// disabled the selected Button
	this.disableButton(id)

	//add cart to the HTML
	ui.addCart(product)

	//update the Cart Total and Number 
	this.updateCart(this.cart);
	}
})

//disable button 
}

disableButton(id, confirm) {
	let allButtons = document.querySelectorAll('.bag-btn');
	
	let btnArray = [...allButtons] ;

	if (confirm) { 
		btnArray.forEach(btn => {
		btn.disabled = false;
		btn.innerHTML = ` <i class="fas fa-shopping-cart"></i>
              add to cart`
		})

	}
	else
	{
	let btn = btnArray.find(buttons => buttons.dataset.id === id);
	
	btn.disabled = true;
	btn.innerHTML = ` <i class="fas fa-shopping-cart"></i>
              IN CART`

          }
}

enableButton(id) {
	let allButtons = document.querySelectorAll('.bag-btn');
	let btnArray = [...allButtons]

	let btn = btnArray.find(buttons => buttons.dataset.id === id);
	
	btn.disabled = false;
	btn.innerHTML = ` <i class="fas fa-shopping-cart"></i>
              add to cart`
}



updateCart(cart) {

	let total = 0;
	cart.map(item => {
	total += item.price * item.amount

	});
let  itemsTotal = cart.reduce((acc,curr) => {
	acc += curr.amount
	return acc
}, 0);


	//Select the parent Element
	this.cartTotal.innerHTML = total.toFixed(2);
	this.cartAmount.innerHTML = itemsTotal;
	

}

//empty cart 
emptyCart(button) {
	
	while (this.cartContent.children.length > 0) {
		this.cartContent.removeChild(this.cartContent.children[0]);
	}

	this.cart = []
	this.updateCart(this.cart);

	this.disableButton(button, true);
	ui.hideCart();

	ls.saveCart(this.cart)
}


manipulateCart(button) {
	
	if (button.classList.contains('fa-chevron-up')) {
		this.increaseItem(button)
	}

	if (button.classList.contains('fa-chevron-down'))  {
		this.decreaseItem(button)
	}

	if (button.classList.contains('remove-item'))  {
		this.removeItem(button);
	}

}


increaseItem(item){
let id = item.dataset.id;
let findItem = this.cart.find(item => item.id === id);
findItem.amount += 1;

let amountHTML = item.nextElementSibling;
amountHTML.innerHTML = findItem.amount;

//update the Cart with current Values
this.updateCart(this.cart);

//save to Storage
ls.saveCart(this.cart)
}

decreaseItem(item) {
let parentElement = item.parentElement.parentElement

let id = item.dataset.id;
let findItem = this.cart.find(item => item.id === id);
findItem.amount -= 1;


if (findItem.amount < 1) {
// parentElement.remove();
this.disableButton(item, true);
this.removeItem(item)
}

let amountHTML = item.previousElementSibling;
amountHTML.innerHTML = findItem.amount;


//update the cart with current Values
this.updateCart(this.cart);

//save to Storage
ls.saveCart(this.cart)
}

removeItem(item) {
let parentElement = item.parentElement.parentElement

let id = item.dataset.id;
let tempCart = this.cart.filter(item => item.id !== id);
this.cart = tempCart;


parentElement.remove();

//update the cart with current Values
this.updateCart(this.cart);

//save to Storage
ls.saveCart(this.cart)

//enable button after removing
this.enableButton(id);

}
//end of class
}





//instatiate the class
const productsAPI = new ProductsAPI()
const ui = new UI();
const ls = new LS();
const app = new APP();





