class ProductAPI{
	constructor() {
	}


	async fetchProducts() {

		const request = await fetch('products.json')
		let products = await request.json()
		products = products.items

		products  = products.map(product => {
			const { id } = product.sys
			const { title, price } = product.fields
			const image = product.fields.image.fields.file.url

			return {id, title, price, image}
		})
		return products
	}
}




