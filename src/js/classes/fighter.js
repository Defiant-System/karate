
class Fighter {
	constructor(cfg) {
		let { arena } = cfg;

		this.arena = arena;
		this.asset = arena.assets.fighter;

		this.strips = {
			walk: [
				{ x: 0, y: 0, w: 72, h: 72 },
				{ x: 72, y: 0, w: 72, h: 72 },
				{ x: 144, y: 0, w: 72, h: 72 },
				{ x: 216, y: 0, w: 72, h: 72 },
				{ x: 144, y: 0, w: 72, h: 72 },
				{ x: 72, y: 0, w: 72, h: 72 },
			],
			highKick: [
				{ x: 0, y: 0, w: 72, h: 72 },
				{ x: 0, y: 72, w: 72, h: 72 },
				{ x: 72, y: 72, w: 72, h: 72 },
				{ x: 360, y: 72, w: 72, h: 72 },
				{ x: 432, y: 72, w: 72, h: 72, d: 200 },
				{ x: 72, y: 72, w: 72, h: 72 },
			],
			midKick: [
				{ x: 0, y: 0, w: 72, h: 72 },
				{ x: 0, y: 72, w: 72, h: 72 },
				{ x: 72, y: 72, w: 72, h: 72 },
				{ x: 216, y: 72, w: 72, h: 72 },
				{ x: 288, y: 72, w: 72, h: 72, d: 180 },
				{ x: 72, y: 72, w: 72, h: 72 },
			],
			lowKick: [
				{ x: 0, y: 0, w: 72, h: 72 },
				{ x: 0, y: 72, w: 72, h: 72 },
				{ x: 72, y: 72, w: 72, h: 72 },
				{ x: 144, y: 72, w: 72, h: 72, d: 180 },
				{ x: 72, y: 72, w: 72, h: 72 },
			],
			sweep: [
				{ x: 0, y: 0, w: 72, h: 72 },
				{ x: 432, y: 216, w: 72, h: 72, d: 250 },
				{ x: 504, y: 216, w: 72, h: 72 },
				{ x: 0, y: 0, w: 72, h: 72 },
			],
			backKick: [
				{ x: 0, y: 0, w: 72, h: 72 },
				{ x: 288, y: 0, w: 72, h: 72 },
				{ x: 360, y: 0, w: 72, h: 72 },
				{ x: 432, y: 0, w: 72, h: 72 },
				{ x: 504, y: 0, w: 72, h: 72 },
				{ x: 576, y: 0, w: 72, h: 72 },
				{ x: 648, y: 0, w: 72, h: 72, d: 200 },
				{ x: 576, y: 0, w: 72, h: 72 },
			],
			teaKick: [
				{ x: 0, y: 0, w: 72, h: 72 },
				{ x: 504, y: 72, w: 72, h: 72 },
				{ x: 576, y: 72, w: 72, h: 72 },
				{ x: 648, y: 144, w: 72, h: 72, d: 200 },
				{ x: 648, y: 72, w: 72, h: 72 },
			],
			flyKick: [
				{ x: 0, y: 0, w: 72, h: 72 },
				{ x: 72, y: 216, w: 72, h: 72 },
				{ x: 144, y: 216, w: 72, h: 72, d: 220 },
				{ x: 0, y: 216, w: 72, h: 72, d: 80 },
			],
			backFlip: [
				{ x: 0, y: 144, w: 72, h: 72 },
				{ x: 72, y: 144, w: 72, h: 72 },
				{ x: 144, y: 144, w: 72, h: 72 },
				{ x: 216, y: 144, w: 72, h: 72 },
				{ x: 288, y: 144, w: 72, h: 72 },
				{ x: 360, y: 144, w: 72, h: 72 },
				{ x: 432, y: 144, w: 72, h: 72 },
				{ x: 504, y: 144, w: 72, h: 72 },
				{ x: 576, y: 144, w: 72, h: 72 },
			],
			pantsDrop: [
				{ x: 0, y: 0, w: 72, h: 72 },
				{ x: 216, y: 216, w: 72, h: 72, d: 220 },
				{ x: 288, y: 216, w: 72, h: 72, d: 220 },
				{ x: 360, y: 216, w: 72, h: 72, d: 220, d: 1e4 },
			],
		};

		// animation frames
		this.frame = {
			strip: this.strips.sweep,
			duration: 150,
			speed: 150,
			index: 0,
		};
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
		ctx.drawImage(this.asset.img, x, y, w, h, 100, 100, 144, 144);
	}
}
