
class Fighter {
	constructor(cfg) {
		let { arena } = cfg;

		this.arena = arena;
		this.asset = arena.assets.fighter;

		this.size = 144;
		this.top = 310;
		this.left = 540;

		// animation frames
		this.sheet = {
			name: "stand",
			strip: Assets.strips.stand,
			duration: 120,
			speed: 120,
			index: 0,
		};
	}

	move(name) {
		if (this.sheet.name === name) return;
		this.sheet.name = name;
		this.sheet.strip = Assets.strips[name];
		this.sheet.duration = this.sheet.speed;
		this.sheet.index = 0;
	}

	update(delta) {
		let { strip, duration } = this.sheet,
			len = strip.length;
		this.sheet.duration -= delta;
		if (this.sheet.duration < 0) {
			this.sheet.duration = (this.sheet.duration + this.sheet.speed) % this.sheet.speed;
			this.sheet.index++;

			if (this.sheet.index > len-1) {
				if (!["stand", "walk"].includes(this.sheet.name)) {
					this.move("stand");
				}
				this.sheet.index = 0;
			}

			let frame = strip[this.sheet.index];
			if (frame.dx !== undefined) this.left += frame.dx;
			
			if (frame.d) this.sheet.duration = frame.d;
		}
	}

	render(ctx) {
		let sheet = this.sheet,
			{ x, y, w, h } = sheet.strip[sheet.index];
		// console.log(x, y, w, h );
		ctx.drawImage(this.asset.img, x, y, w, h, this.left, this.top, this.size, this.size);
	}
}
