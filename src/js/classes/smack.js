
class Smack {
	constructor(cfg) {
		let { x, y, arena } = cfg;

		this.arena = arena;
		this.top = y;
		this.left = x;

		this.sheet = {
			img: arena.assets.smack.img,
			strip: arena.assets.smack.strip,
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

			if (this.sheet.index >= this.sheet.strip.length-1) {
				let index = this.arena.entities.indexOf(this);
				this.arena.entities.splice(index, 1);
			}
		}
	}

	render(ctx) {
		let sheet = this.sheet,
			{ x, y } = sheet.strip[sheet.index],
			w = 64,
			h = 64;
		ctx.save();
		ctx.translate(this.left - (w/2), this.top - (h/2));
		ctx.drawImage(sheet.img, x, y, w, h, 0, 0, w, h);

		ctx.restore();
	}
}
