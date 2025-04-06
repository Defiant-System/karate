
class Fighter {
	constructor(cfg) {
		let { arena } = cfg;

		this.arena = arena;
		this.asset = arena.assets.fighter;
	}

	update(delta) {
		
	}

	render(ctx) {
		ctx.drawImage(this.asset.img, 0, 0, 70, 64, 100, 100, 140, 128);
	}
}
