class Ingredient {
	constructor(name, uom) {
		this.name = name;
		this.uom = uom;
	}

	setName(name) {
		this.name=name;
	}

	setUOM(uom) {
		this.uom = uom;
	}
}

export default Ingredient;