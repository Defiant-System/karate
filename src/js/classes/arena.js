
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

		// config
		this._speed = 120;
		this._newGfx = false;
		this._showHitHurt = false;
		this._fW = 144;
		this._aW = (this.width - this._fW) * .5;

		// create FPS controller
		let Self = this;
		this.fpsControl = karaqu.FpsControl({
			fps: 60,
			autoplay: true,
			callback(time, delta) {
				Self.update(delta, time);
				Self.render();
			}
		});

		// assets list
		let assets = [...Assets.sprites],
			loadAssets = () => {
				let item = assets.pop(),
					img = new Image();
				img.src = item.src;
				img.onload = () => {
					// save reference to asset
					this.assets[item.id] = { item, img };
					if (Assets[item.id].strip) this.assets[item.id].strip = Assets[item.id].strip;
					// are we done yet?
					assets.length ? loadAssets() : this.ready();
				};
			};
		// asset lib
		this.assets = {};
		
		// load assets
		loadAssets();
	}

	get speed() {
		return this._speed;
	}

	set speed(v) {
		this._speed = v;
	}

	smack(opt) {
		this.entities.push(new Smack({ ...opt, arena: this }));
	}

	ready() {
		// adding player & opponents
		this.player = new Player({ arena: this, colors: [[255,255,255],[145,145,145],[218,0,0]], left: 190 });
		this.entities.push(new AI({ arena: this, colors: [[218,0,0],[109,0,0],[238,102,238]], left: 400, flip: 1 }));
		this.entities.push(new AI({ arena: this, colors: [[0,0,255],[0,0,109],[218,218,0]], left: 550, flip: 1 }));

		// this.player = new Player({ arena: this, colors: [[255,255,255],[145,145,145],[218,0,0]], left: 400, flip: 1 });
		// this.entities.push(new AI({ arena: this, colors: [[218,0,0],[109,0,0],[238,102,238]], left: 315, flip: 1 }));

		// this.player = new Player({ arena: this, colors: [[255,255,255],[145,145,145],[218,0,0]], left: 320 });
		// this.entities.push(new AI({ arena: this, colors: [[218,0,0],[109,0,0],[238,102,238]], left: 400, flip: 1 }));

		// this.player = new Player({ arena: this, colors: [[255,255,255],[145,145,145],[218,0,0]], left: 400, flip: 1 });
		// this.entities.push(new AI({ arena: this, colors: [[218,0,0],[109,0,0],[238,102,238]], left: 320 }));

		// adding player
		this.entities.push(this.player);
		// set fighter opponent
		this.entities.map(fighter => fighter.opponents = this.entities.filter(f => f !== fighter));
	}

	update(delta, time) {
		this.entities.map(entity => entity.update(delta, time));
	}

	render() {
		// clear canvas
		this.cvs.attr({ width: this.width });
		this.ctx.imageSmoothingEnabled = false;
		// draw entries - exclude droids
		this.entities.map(entity => entity.render(this.ctx));

		// for debug info
		this.drawFps(this.ctx);
	}

	drawFps(ctx) {
		let fps = this.fpsControl ? this.fpsControl._log : [];
		ctx.save();
		// ctx.translate(this.width - 119, 45);
		ctx.translate(3, 0);
		// draw box
		ctx.fillStyle = "#99f5";
		ctx.fillRect(5, 5, 100, 40);
		ctx.fillStyle = "#fff8";
		ctx.fillRect(7, 7, 96, 11);
		ctx.fillStyle = "#f997";
		// loop log
		for (let i=0; i<96; i++) {
			let bar = fps[i];
			if (!bar) break;
			let p = bar/90;
			if (p > 1) p = 1;
			ctx.fillRect(102 - i, 43, 1, -24 * p);
		}
		// write fps
		ctx.fillStyle = "#000";
		ctx.font = "9px Arial";
		ctx.textAlign = "left";
		ctx.fillText('FPS: '+ fps[0], 8, 16);
		// restore state
		ctx.restore();
	}
}
