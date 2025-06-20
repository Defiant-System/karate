
class Viewport {
	constructor(cfg) {
		let { arena } = cfg;
		
		this.arena = arena;

		this.assets = {
			bg: arena.assets.bg,
			mg: arena.assets.mg,
			fg: arena.assets.fg,
		};
	}

	update(delta, time) {
		
	}

	render(ctx) {
		let scale = 3,
			img = this.assets.bg.img,
			x = 0,
			y = -40,
			w = img.width * scale,
			h = img.height * scale;
		ctx.drawImage(img, x, y, w, h);
	}
}
