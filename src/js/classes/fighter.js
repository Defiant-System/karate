
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
		// fighter sprite shadow
		this.asset.shadow = Utils.createCanvas(width, height);
		this.asset.shadow.cvs = this.asset.shadow.cvs[0];

		// repaints sprite for fighter
		ctx.drawImage(this.asset.img, 0, 0);
		// let pixels = ctx.getImageData(0, 0, width, height),
		// 	data = pixels.data;
		// for (let i=0; i<data.length; i+=4) {
		// 	let r = data[i+0],
		// 		g = data[i+1],
		// 		b = data[i+2],
		// 		len = 3;
		// 	while (len--) {
		// 		if (palette[len][0] === r && palette[len][1] === g && palette[len][2] === b) {
		// 			[r,g,b] = colors[len];
		// 		}
		// 	}
		// 	data[i+0] = r;
		// 	data[i+1] = g;
		// 	data[i+2] = b;
		// }
		// ctx.putImageData(pixels, 0, 0);

		// fighter shadow
		this.asset.shadow.ctx.drawImage(this.asset.cvs, 0, 0);
		let pixels = this.asset.shadow.ctx.getImageData(0, 0, width, height);
		let data = pixels.data
		for (let i=0; i<data.length; i+=4) {
			if (data[i+3] > 0) {
				data[i+0] = data[i+1] = data[i+2] = 0; // 255-data[i+3];
			}
		}
		this.asset.shadow.ctx.putImageData(pixels, 0, 0);

		let gradient = this.asset.shadow.ctx.createLinearGradient(0, 94, 0, 144);
		gradient.addColorStop(0, "#0000");
		gradient.addColorStop(1, "#000");
		this.asset.shadow.ctx.globalCompositeOperation = "source-in";
		this.asset.shadow.ctx.fillStyle = gradient;
		this.asset.shadow.ctx.fillRect(0, 0, 720, 144);


		this.size = 144;
		this.top = 302;
		this.left = left || 100;
		this.flip = flip || -1;
		this.opponents = [];
		this._contact = [];

		// animation frames
		this.sheet = {};
		// default stance
		this.move("stance");
	}

	move(name) {
		if (this.sheet.name === name) return;
		this.sheet.name = name;
		this.sheet.strip = [...Assets.fighter[name].strip];
		this.sheet.strip.filter(f => !!f.d).map(f => f.d = (f.d / 120) * this.arena.speed);
		this.sheet.frame = this.sheet.strip[0];
		this.sheet.w8l = false;
		this.sheet.wait = true;
		this.sheet.speed = this.arena.speed;
		this.sheet.duration = this.arena.speed;
		this.sheet.index = 0;

		let dy = this.sheet.strip[0].dy;
		if (dy !== undefined) {
			this.top += dy;
		}
	}

	keyUp(char) {
		this.sheet.wait = false;
	}

	update(delta) {
		let { strip, duration } = this.sheet,
			len = strip.length;
		if (this.sheet.duration < 0) {
			this.sheet.duration = (this.sheet.duration + this.sheet.speed) % this.sheet.speed;
			if (!this.sheet.wait || !strip[this.sheet.index].wait) {
				this.sheet.index++;
			}

			if (this.sheet.index > len-1) {
				if (!["stance", "walk"].includes(this.sheet.name)) {
					delete this._KO;
					this.move("stance");
				}
				this.sheet.index = 0;
			}

			let frame = strip[this.sheet.index];
			this.sheet.frame = frame;
			if (frame.dy !== undefined) this.top += frame.dy;
			if (frame.dx !== undefined && (!this.sheet.wait || !this.sheet.w8l)) {
				this.sheet.w8l = true;
				this.left -= (frame.dx * this.flip);
			}
			if (frame.d) this.sheet.duration = frame.d;
			if (frame.flip) this.flip *= -1;

			if (frame.hit) {
				// console.log("player flip", this.flip);
				// let hS = this.size * .5;
				let hits = frame.hit.map(h => {
						// console.log(h.x , this.left);
						return {
							r: h.r,
							y: this.top + h.y,
							x: this.left + (this.flip > 0 ? -(h.x - this.size) : h.x),
						};
					}),
					contact = [],
					hurts = [];
				// get all hurt circles
				this.opponents.filter(f => !f._KO).map(fighter =>
					fighter.sheet.frame.hurt.map(h => {
						let tgt = "";
						switch (true) {
							case (h.y < 57): tgt = "high"; break; // head
							case (h.y < 93): tgt = "mid"; break; // mid
							case (h.y < 119): tgt = "low"; break; // low
							case (h.y < 134): tgt = "low"; break; // feet
						}
						hurts.push({
							r: h.r,
							y: fighter.top + h.y,
							x: fighter.left + (fighter.flip > 0 ? -(h.x - fighter.size) : h.x),
							fighter,
							tgt,
						})
					}));
				// check if hit circles intersect
				hits.map(hit => {
					hurts.map(hurt => {
						if (Math.hypot(hit.x - hurt.x, hit.y - hurt.y) < hit.r + hurt.r) {
							let max = hit.r < hurt.r ? hit.r : hurt.r,
								maxArea = (max ** 2) * Math.PI,
								overlap = this.areaOfIntersection(hit.x, hit.y, hit.r, hurt.x, hurt.y, hurt.r),
								perc = overlap / maxArea;
							// console.log( hit.r, hurt.r, (perc*100)|0 );
							if (perc > .3) {
								// this._contact.push(hurt);
								// KO anim
								hurt.fighter._KO = true;

								let target = hurt.tgt,
									isBehind = false;
								if (this.flip === hurt.fighter.flip) {
									if ((this.flip > 0 && this.left > hurt.fighter.left)
										|| (this.flip < 0 && this.left < hurt.fighter.left)) {
										isBehind = true;
									}
								}
								// todo: check if attacked from behind and adjust KO anim accordingly
								if (isBehind) target = "low";
								
								hurt.fighter.move(`${target}Ko`);
								// smack animation if target was the head
								if (perc > .7 && hurt.tgt === "high") {
									let x = Math.lerp(hit.x, hurt.x, .5),
										y = Math.lerp(hit.y, hurt.y, .5);
									this.arena.smack({ x, y });
								}
							}
						}
					});
				});
				// console.log(this._contact);
			}
		}
		this.sheet.duration -= delta;
	}

	areaOfIntersection(x0, y0, r0, x1, y1, r1) {
		let rr0 = r0 * r0,
			rr1 = r1 * r1,
			c = Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0)),
			phi = (Math.acos((rr0 + (c * c) - rr1) / (2 * r0 * c))) * 2,
			theta = (Math.acos((rr1 + (c * c) - rr0) / (2 * r1 * c))) * 2,
			area1 = 0.5 * theta * rr1 - 0.5 * rr1 * Math.sin(theta),
			area2 = 0.5 * phi * rr0 - 0.5 * rr0 * Math.sin(phi);
		return area1 + area2;
	}

	render(ctx) {
		let sheet = this.sheet,
			{ x, y, hit, hurt } = sheet.strip[sheet.index],
			w = this.size,
			h = this.size,
			sw = this.size,
			sh = this.size,
			f = this.flip ? -1 : 1,
			toRadians = angle => angle * (Math.PI / 180),
			angle = ((this.left - this.arena._aW) / this.arena._aW) * 30;
		// console.log(x, y, w, h );
		ctx.save();
		if (this.flip > 0) {
			ctx.translate(this.left+sw, this.top);
			ctx.scale(-1, 1);
			
			// render shadow
			ctx.save();
			// shadow region
			let region = new Path2D();
			region.rect(-40, 135, 204, 69);
			ctx.clip(region);
			
			// flip sprite frame
			ctx.translate(f * (((angle/30) * 72)), 271);
			ctx.transform(1, 0, f * toRadians(angle), 1, 0, 0);
			ctx.scale(1, -1);
			
			ctx.globalAlpha = .3;
			ctx.drawImage(this.asset.shadow.cvs, x, y, w, h, 0, 0, sw, sh);
			ctx.restore();

			// draw fighter
			ctx.drawImage(this.asset.cvs, x, y, w, h, 0, 0, sw, sh);

			// render hit/hurt boxes
			if (this.arena._showHitHurt) this.renderHitHurt(ctx, hit, hurt);
			ctx.setTransform(1, 0, 0, 1, 0, 0);
		} else {
			ctx.translate(this.left, this.top);

			// render shadow
			ctx.save();
			// shadow region
			let region = new Path2D();
			region.rect(-40, 135, 204, 69);
			ctx.clip(region);

			// flip sprite frame
			ctx.translate(f * ((angle/30) * -72), 271);
			ctx.transform(1, 0, f * -toRadians(angle), 1, 0, 0);
			ctx.scale(1, -1);

			ctx.globalAlpha = .3;
			ctx.drawImage(this.asset.shadow.cvs, x, y, w, h, 0, 0, sw, sh);
			ctx.restore();

			// draw fighter
			ctx.drawImage(this.asset.cvs, x, y, w, h, 0, 0, sw, sh);

			// render hit/hurt boxes
			if (this.arena._showHitHurt) this.renderHitHurt(ctx, hit, hurt);
		}
		ctx.restore();

		// contact
		ctx.save();
		ctx.fillStyle = "#f007";
		this._contact.map(contact => {
			ctx.beginPath();
			ctx.arc(contact.x, contact.y, contact.r, 0, Math.TAU);
			ctx.fill();
		});
		ctx.restore();
	}

	renderHitHurt(ctx, hit=[], hurt=[]) {
		// hitboxes
		ctx.fillStyle = "#0f06";
		hurt.map(disc => {
			ctx.beginPath();
			ctx.arc(disc.x, disc.y, disc.r, 0, Math.TAU);
			ctx.fill();
		});
		ctx.fillStyle = "#22fa";
		hit.map(disc => {
			ctx.beginPath();
			ctx.arc(disc.x, disc.y, disc.r, 0, Math.TAU);
			ctx.fill();
		});
	}
}
