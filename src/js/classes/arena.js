
class Arena {
	constructor(cvs) {
		// set dimensions of canvas
		let { width, height } = cvs.offset();
		width = width || +cvs.attr("width");
		height = height || +cvs.attr("height");
		this.width = width;
		this.height = height;
		this.cvs = cvs.attr({ width, height });
		this.ctx = cvs[0].getContext("2d", { willReadFrequently: true });

		// items on the map
		this.entities = [];

		// create FPS controller
		let Self = this;
		this.fpsControl = karaqu.FpsControl({
			fps: 10,
			callback(time, delta) {
				Self.update(delta, time);
				Self.render();
			}
		});
	}

	update(delta, time) {
		this.entities.map(entity => entity.update(delta, time));
	}

	render() {
		let ctx = this.ctx;
		// draw entries - exclude droids
		this.entities.map(entity => entity.render(ctx));
	}

	drawFps(ctx) {
		let fps = this.fpsControl ? this.fpsControl._log : [];
		ctx.save();
		ctx.translate(this.width - 109, 0);
		// draw box
		ctx.fillStyle = "#0005";
		ctx.fillRect(5, 5, 100, 40);
		ctx.fillStyle = "#fff4";
		ctx.fillRect(7, 7, 96, 11);
		ctx.fillStyle = "#fff6";
		// loop log
		for (let i=0; i<96; i++) {
			let bar = fps[i];
			if (!bar) break;
			let p = bar/90;
			if (p > 1) p = 1;
			ctx.fillRect(102 - i, 43, 1, -24 * p);
		}
		// write fps
		ctx.fillStyle = "#fff";
		ctx.font = "9px Arial";
		ctx.textAlign = "left";
		ctx.fillText('FPS: '+ fps[0], 8, 16);
		// restore state
		ctx.restore();
	}
}
