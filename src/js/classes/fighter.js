
class Fighter {
	constructor(cfg) {
		let { arena } = cfg;

		this.arena = arena;
		this.asset = arena.assets.fighter;

		this.size = 144;
		this.top = 312;
		this.left = 100;

		// animation frames
		this.frame = {
			sheet: "stand",
			strip: Assets.strips.stand,
			duration: 150,
			speed: 150,
			index: 0,
		};
	}

	move(sheet) {
		if (this.frame.sheet === sheet) return;
		this.frame.sheet = sheet;
		this.frame.strip = Assets.strips[sheet];
		this.frame.duration = this.frame.speed;
		this.frame.index = 0;
	}

	update(delta) {
		let frame = this.frame,
			{ strip, duration } = frame,
			len = strip.length;
		frame.duration -= delta;
		if (frame.duration < 0) {
			frame.duration = (frame.duration + frame.speed) % frame.speed;
			frame.index++;
			if (frame.index > len-1) frame.index = 0;
			if (strip[frame.index].d) frame.duration = strip[frame.index].d;
		}
	}

	render(ctx) {
		let frame = this.frame,
			{ x, y, w, h } = frame.strip[frame.index];
		// console.log(x, y, w, h );
		ctx.drawImage(this.asset.img, x, y, w, h, this.left, this.top, this.size, this.size);
	}
}
