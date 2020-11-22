class LS {
	constructor() {

	}

	saveItem(item, saveName) {
		localStorage.setItem(saveName, JSON.stringify(item))
	}

	getItem(item) {
		return JSON.parse(localStorage.getItem(item))
	}

//end of class
}