
class Player extends Fighter {
	constructor(cfg) {
		super(cfg);

		this.input = {
			up:    { pressed: false, move: { x: 0, y: 0 } },
			down:  { pressed: false, move: { x: 0, y: 0 } },
			left:  { pressed: false, move: { x: -1, y: 0 } },
			right: { pressed: false, move: { x: 1, y: 0 } },
		};
	}

	update(delta) {
		let move = { x: 0, y: 0 };
		for (let key in this.input) {
			if (this.input[key].pressed) {
				let f = this.input[key].move;
				if (!f) return;
				if (f.x != 0) move.x = f.x;
				if (f.y != 0) move.y = f.y;
			}
		}

		this.top += move.y;
		this.left += move.x;

		if (move.x === 0) {
			this.move("stand");
		} else {
			this.move("walk");
		}

		super.update(delta);
	}

	render(ctx) {
		super.render(ctx);
	}
}
