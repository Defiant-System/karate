
// karate.editor

{
	init() {
		// fast references
		this.els = {};
		// settings
		this._strip = "stance";
		this._frameIndex = 0;
		this._hit = true;
		this._hurt = false;
	},
	dispatch(event) {
		let APP = karate,
			Self = APP.editor,
			Spawn = event.spawn || Self.spawn,
			str,
			el;
		// console.log(event);
		switch (event.type) {
			// system events
			case "spawn.open":
				// fast references
				Self.els.layout = Spawn.find(`.layout`);
				Self.els.tree = Spawn.find(`.tree`);
				Self.els.right = Spawn.find(`.right`);
				Self.els.work = Spawn.find(`.right .work`);
				Self.els.canvas = Spawn.find(`.right .canvas`);
				Self.els.minimap = Spawn.find(`.right .minimap`);
				Self.els.frames = Spawn.find(`.right .frames`);

				// move hit/hurt discs
				Self.els.canvas.on("mousedown", Self.moveDisc);

				Self.dispatch({ type: "render-tree" });
				break;
			case "spawn.close":
				break;
			// custom events
			case "render-tree":
				str = [];
				Assets.sprites.map(sprite => {
					str.push(`<div class="item collapsed">
								<i class="icon-arrow"></i>
								<i class="icon-folder"></i>
								<span>${sprite.id}</span>
								<div class="children">`);
					Object.keys(Assets[sprite.id]).map(key => {
						str.push(`<div class="item">
									<i class="icon-blank"></i>
									<i class="icon-frame"></i>
									<span>${key}</span>
								</div>`);
					});
					str.push(`</div></div>`);
				});
				Self.els.tree.html(str.join(""));
				break;
			case "tree-click":
				el = $(event.target);
				switch (true) {
					case el.hasClass("icon-arrow"):
						el.toggleClass("down", el.hasClass("down"));
						el.parent().toggleClass("collapsed", el.hasClass("down"));
						break;
					case el.prop("nodeName") === "SPAN":
						Self.els.tree.find(".active").removeClass("active");
						el.parent().addClass("active");
						// render strip
						Self.dispatch({ type: "render-strip", id: el.text() });
						break;
				}
				break;
			case "render-strip":
				// remeber active strip
				Self._strip = event.id;
				// prepare DOM render
				str = [];
				Assets.fighter[Self._strip].strip.map(f => {
					str.push(`<span ${f.flip ? `class="flip"` : ""} style="--fY: ${f.y / 72}; --fX: ${f.x / 72};"><i>${f.d | 120}ms</i><s>${f.dx | 0}px</s><b>${f.dy | 0}px</b></span>`);
				});
				Self.els.frames.html(str.join(""));
				// auto select first frame
				Self.els.frames.find("span:nth(0)").trigger("click");
				break;
			case "frames-select":
				el = $(event.target);
				if (el.hasClass("active") || el[0] === event.el[0]) return;

				event.el.find(".active").removeClass("active");
				el.addClass("active");
				Self.els.right.css({
					"--aY": el.cssProp("--fY"),
					"--aX": el.cssProp("--fX"),
				});
				// flip canvas
				Self.els.canvas.toggleClass("flip", !el.hasClass("flip"));
				// drag hit / hurt boxes
				Self._frameIndex = el.index();
				Self.dispatch({ type: "draw-boxes" });
				break;
			case "minimap-select":
				Self.els.right.css({
					"--aX": Math.floor(event.offsetX / 28.8),
					"--aY": Math.floor(event.offsetY / 28.8),
				});
				break;
			case "draw-boxes":
				str = [];
				if (Self._hit) {
					let arr = Assets.fighter[Self._strip].strip[Self._frameIndex].hit || [];
					arr.map(f => str.push(`<span style="--x: ${f.x}; --y: ${f.y}; --r: ${f.r};"></span>`));
				}
				if (Self._hurt) {
					let arr = Assets.fighter[Self._strip].strip[Self._frameIndex].hurt || [];
					arr.map(f => str.push(`<span style="--x: ${f.x}; --y: ${f.y}; --r: ${f.r};"></span>`));
				}
				Self.els.canvas.html(str.join(""));
				break;
			case "output-data":
				str = [];
				Self.els.canvas.find(`span`).map(elem => {
					let el = $(elem);
					str.push({
						x: el.cssProp("--x"),
						y: el.cssProp("--y"),
						r: el.cssProp("--r"),
					});
				});
				console.log(`${Self._hit ? "hit" : "hurt"}:`, JSON.stringify(str).replace(/"/g, "").replace(/,/g, ", "));
				break;
			case "toggle-boxes":
				Self._hit = event.arg === "hit";
				Self._hurt = event.arg === "hurt";
				Self.dispatch({ type: "draw-boxes" });
				return true;
		}
	},
	moveDisc(event) {
		let APP = karate,
			Self = APP.editor,
			Drag = Self.drag;
		switch (event.type) {
			case "mousedown":
				let el = $(event.target);
				if (!el.parent().hasClass("canvas")) {
					let oX = event.offsetX >> 1,
						oY = event.offsetY >> 1;
					el = Self.els.canvas.append(`<span style="--x: ${oX}; --y: ${oY}; --r: 5;"></span>`);
				}

				let doc = $(document),
					offset = el.offset(),
					click = {
						x: event.clientX,
						y: event.clientY,
					},
					isResize = event.layerX > (offset.width - 10),
					data = {
						"--y": el.cssProp("--y"),
						"--x": el.cssProp("--x"),
						"--r": el.cssProp("--r"),
					};
				// simplify math during drag move
				offset.radius = offset.width * .5;
				// drag info
				Self.drag = { doc, el, click, offset, isResize, data };
				// cover app view
				Self.els.layout.addClass("cover");
				// bind event handlers
				Self.drag.doc.on("mousemove mouseup", Self.moveDisc);
				break;
			case "mousemove":
				let dY = event.clientY - Drag.click.y,
					dX = event.clientX - Drag.click.x;
				if (Drag.isResize) {
					Drag.data.width = dX + Drag.offset.width;
					Drag.data.height = dX + Drag.offset.width;
					Drag.data.top = Drag.offset.top - (dX / 2);
					Drag.data.left = Drag.offset.left - (dX / 2);
				} else {
					Drag.data.top = dY + Drag.offset.top;
					Drag.data.left = dX + Drag.offset.left;
				}
				// UI update
				Drag.el.css(Drag.data);
				break;
			case "mouseup":
				// update disc details
				let css = { top: "", left: "" };
				css["--r"] = (((Drag.data.width / 2) || Drag.offset.radius) * .5).toFixed(1);
				css["--y"] = ((Drag.data.top + Drag.offset.radius) / 2).toFixed(1);
				css["--x"] = ((Drag.data.left + Drag.offset.radius) / 2).toFixed(1);
				Drag.el.css(css);

				// uncover app view
				Self.els.layout.removeClass("cover");
				// bind event handlers
				Self.drag.doc.off("mousemove mouseup", Self.moveDisc);
				break;
		}
	}
}
