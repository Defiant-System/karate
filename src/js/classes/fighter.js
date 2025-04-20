
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
		this.sheet = {};
		// default stance
		this.move("stance");
	}

	move(name) {
		if (this.sheet.name === name) return;
		this.sheet.name = name;
		this.sheet.hit = [...Assets.fighter[name].hit];
		this.sheet.hurt = [...Assets.fighter[name].hurt];
		this.sheet.strip = [...Assets.fighter[name].strip];
		this.sheet.strip.filter(f => !!f.d).map(f => f.d = (f.d / 120) * this.arena.speed);
		this.sheet.w8l = false;
		this.sheet.wait = true;
		this.sheet.speed = this.arena.speed;
		this.sheet.duration = this.arena.speed;
		this.sheet.index = 0;
	}

	keyUp(char) {
		this.sheet.wait = false;
	}

	update(delta) {
		let { strip, duration } = this.sheet,
			len = strip.length;
		this.sheet.duration -= delta;
		if (this.sheet.duration < 0) {
			this.sheet.duration = (this.sheet.duration + this.sheet.speed) % this.sheet.speed;
			if (!this.sheet.wait || !strip[this.sheet.index].wait) this.sheet.index++;

			if (this.sheet.index > len-1) {
				if (!["stance", "walk"].includes(this.sheet.name)) {
					this.move("stance");
				}
				this.sheet.index = 0;
			}

			let frame = strip[this.sheet.index];
			if (frame.dx !== undefined && (!this.sheet.wait || !this.sheet.w8l)) {
				this.sheet.w8l = true;
				this.left += (frame.dx * this.flip);
			}
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
			ctx.translate(this.left+sw, this.top);
			ctx.scale(-1, 1);
			ctx.drawImage(this.asset.cvs, x, y, w, h, 0, 0, sw, sh);
			// ctx.drawImage(this.arena.assets.stance.img, 0, 0, 144, 144);
			// render hit/hurt boxes
			if (this.arena._showHitHurt) this.renderHitHurt(ctx);
			ctx.setTransform(1,0,0,1,0,0);
		} else {
			ctx.translate(this.left, this.top);
			ctx.drawImage(this.asset.cvs, x, y, w, h, 0, 0, sw, sh);
			// ctx.drawImage(this.arena.assets.stance.img, 0, 0, 144, 144);
			// render hit/hurt boxes
			if (this.arena._showHitHurt) this.renderHitHurt(ctx);
		}
		ctx.restore();
	}

	renderHitHurt(ctx) {
		// hitboxes
		ctx.fillStyle = "#0f06";
		this.sheet.hurt.map(disc => {
			ctx.beginPath();
			ctx.arc(disc.x, disc.y, disc.r, 0, Math.TAU);
			ctx.fill();
		});
		// ctx.fillStyle = "#f55a";
		// this.sheet.hit.map(disc => {
		// 	ctx.beginPath();
		// 	ctx.arc(disc.x, disc.y, disc.r, 0, Math.TAU);
		// 	ctx.fill();
		// });
	}
}
