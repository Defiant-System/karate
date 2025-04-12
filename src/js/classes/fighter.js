
class Fighter {
	constructor(cfg) {
		let { arena, left, flip, colors } = cfg,
			// fighter color palette
			palette = [[218,218,218],[145,145,145],[218,0,0]];

		this.arena = arena;
		this.asset = { ...arena.assets.fighter };

		let { width, height } = this.asset.item,
			{ cvs, ctx } = Utils.createCanvas(width, height);
		this.asset.cvs = cvs[0];
		this.asset.ctx = ctx;

		// repaints sprite for fighter
		ctx.drawImage(this.asset.img, 0, 0);
		let pixels = ctx.getImageData(0, 0, width, height);
		let data = pixels.data;
		for (let i=0; i<data.length; i+=4) {
			let r = data[i + 0],
				g = data[i + 1],
				b = data[i + 2],
				len = 3;
			while (len--) {
				if (palette[len][0] === r && palette[len][1] === g && palette[len][2] === b) {
					[r,g,b] = colors[len];
				}
			}
			data[i + 0] = r;
			data[i + 1] = g;
			data[i + 2] = b;
		}
		ctx.putImageData(pixels, 0, 0);


		this.size = 144;
		this.top = 310;
		this.left = left || 100;
		this.flip = flip || -1;

		// animation frames
		this.sheet = {
			name: "stand",
			strip: Assets.anim.stand.strip,
			duration: 720,
			speed: 720,
			index: 0,
		};
	}

	move(name) {
		if (this.sheet.name === name) return;
		this.sheet.name = name;
		this.sheet.strip = Assets.anim[name].strip;
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
			if (frame.dx !== undefined) this.left += (frame.dx * this.flip);
			if (frame.dy !== undefined) this.top += frame.dy;
			if (frame.d) this.sheet.duration = frame.d;
			if (frame.flip) this.flip *= -1;
		}
	}

	render(ctx) {
		let sheet = this.sheet,
			{ x, y, w, h } = sheet.strip[sheet.index],
			sw = this.size,
			sh = this.size;
		// console.log(x, y, w, h );
		ctx.save();
		if (this.flip < 0) {
			ctx.translate(this.left+sw, 0);
			ctx.scale(-1, 1);
			ctx.drawImage(this.asset.cvs, x, y, w, h, 0, this.top, sw, sh);
			ctx.setTransform(1,0,0,1,0,0);
		} else {
			ctx.drawImage(this.asset.cvs, x, y, w, h, this.left, this.top, sw, sh);
		}
		ctx.restore();
	}
}
