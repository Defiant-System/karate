
class Smack {
	constructor(cfg) {
		let { x, y, arena } = cfg;

		this.arena = arena;
		this.top = y;
		this.left = x;

		this.sheet = {
			strip: arena.assets.smack,
			speed: arena.speed,
			duration: arena.speed,
			index: 0,
		};
	}

	update(delta) {
		this.sheet.duration -= delta;
		if (this.sheet.duration < 0) {
			this.sheet.duration = (this.sheet.duration + this.sheet.speed) % this.sheet.speed;
			this.sheet.index++;
			
			// let frame = this.strip[this.sheet.index];
			// this.sheet.frame = frame;
		}
	}

	render(ctx) {
		ctx.save();
		ctx.translate(this.left, this.top);
		ctx.drawImage(this.sheet.strip.img, 0, 0, 96, 32);
		ctx.restore();
	}
}
