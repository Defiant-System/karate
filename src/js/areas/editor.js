
// karate.editor

{
	init() {
		// fast references
		this.els = {};
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
				Self.els.right = Spawn.find(`.right`);
				Self.els.work = Spawn.find(`.right .work`);
				Self.els.canvas = Spawn.find(`.right .canvas`);
				Self.els.minimap = Spawn.find(`.right .minimap`);

				// move hit/hurt discs
				Self.els.canvas.on("mousedown", Self.moveDisc);

				// temp
				Self.dispatch({ ...event, type: "draw-frame", strip: "stance" });
				break;
			case "spawn.close":
				break;
			// custom events
			case "minimap-select":
				Self.els.right.css({
					"--aX": Math.floor(event.offsetX / 28.8),
					"--aY": Math.floor(event.offsetY / 28.8),
				});
				break;
			case "draw-frame":
				str = Assets.fighter[event.strip].hurt
							.map(f => `<span style="--x: ${f.x}; --y: ${f.y}; --r: ${f.r};"></span>`);
				Self.els.canvas.html(str.join(""));
				break;
		}
	},
	moveDisc(event) {
		let APP = karate,
			Self = APP.editor,
			Drag = Self.drag;
		switch (event.type) {
			case "mousedown":
				let doc = $(document),
					el = $(event.target),
					offset = el.offset(),
					click = {
						x: event.clientX,
						y: event.clientY,
					},
					data = {};
				// simplify math during drag move
				offset.radius = offset.width * .5;
				// drag info
				Self.drag = { doc, el, click, offset, data };
console.log( el.is(":before", event) );
				// cover app view
				Self.els.layout.addClass("cover");
				// bind event handlers
				Self.drag.doc.on("mousemove mouseup", Self.moveDisc);
				break;
			case "mousemove":
				let dY = event.clientY - Drag.click.y,
					dX = event.clientX - Drag.click.x;

				Drag.data.top = dY + Drag.offset.top;
				Drag.data.left = dX + Drag.offset.left;

				Drag.el.css(Drag.data);
				break;
			case "mouseup":
				// update disc details
				let css = { top: "", left: "" };
				css["--y"] = ((Drag.data.top + Drag.offset.radius) / 2).toFixed(1);
				css["--x"] = ((Drag.data.left + Drag.offset.radius) / 2).toFixed(1);
				// css["--r"] = Drag.data["--r"];
				Drag.el.css(css);

				// uncover app view
				Self.els.layout.removeClass("cover");
				// bind event handlers
				Self.drag.doc.off("mousemove mouseup", Self.moveDisc);
				break;
		}
	}
}
