
class AI extends Fighter {
	constructor(cfg) {
		super(cfg);

		this.agression = 1;
		this.defensive = 1;
		this.mode = "fight"; // fight kata
	}

	chooseAttack() {
		
	}

	chooseDefense() {
		
	}

	update(delta) {
		super.update(delta);
	}

	render(ctx) {
		super.render(ctx);
	}
}
