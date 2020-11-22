class ProductsAPI{

	//get products
	async getProducts() {
	let request = await fetch('products.json');
	let items = await request.json();
	let products = items.items;

	let productsMap = products.map(product => {

	const { title, price} = product.fields
	const { id } = product.sys
	const image  = product.fields.image.fields.file.url
	const img = `.${image}`

	return {title, price, id, img}
	})

	return productsMap
	}

}