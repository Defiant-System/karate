
class Fighter {
	constructor(cfg) {
		let { arena } = cfg;

		this.arena = arena;
		this.asset = arena.assets.fighter;

		this.strips = {
			walk: [
				{ x: 0, y: 0, w: 70, h: 64 },
				{ x: 70, y: 0, w: 70, h: 64 },
				{ x: 140, y: 0, w: 70, h: 64 },
				{ x: 210, y: 0, w: 70, h: 64 },
				{ x: 140, y: 0, w: 70, h: 64 },
				{ x: 70, y: 0, w: 70, h: 64 },
			],
		};

		// animation frames
		this.frame = {
			strip: this.strips.walk,
			index: 0,
			last: 150,
			speed: 150,
		};
	}

	update(delta) {
		this.frame.last -= delta;
		if (this.frame.last < 0) {
			this.frame.last = (this.frame.last + this.frame.speed) % this.frame.speed;
			this.frame.index++;
			if (this.frame.index > this.frame.strip.length-1) this.frame.index = 0;
		}
	}

	render(ctx) {
		let frame = this.frame,
			{ x, y, w, h } = frame.strip[frame.index];
		// console.log(x, y, w, h );
		ctx.drawImage(this.asset.img, x, y, w, h, 100, 100, 140, 128);
	}
}
