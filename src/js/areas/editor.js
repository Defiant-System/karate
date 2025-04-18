
// karate.editor

{
	init() {
		// fast references
		this.els = {
			// content: window.find("content"),
			viewport: window.find(".viewport"),
		};
	},
	dispatch(event) {
		let APP = karate,
			Self = APP.editor,
			Spawn = event.spawn || Self.spawn,
			str,
			el;
		// console.log(event);
		switch (event.type) {
			case "spawn.open":
				Self.els.canvas = Spawn.find(`.frame .canvas`);

				Self.dispatch({ ...event, type: "draw-frame", strip: "stance" });
				break;
			case "spawn.close":
				break;
			// custom events
			case "draw-frame":
				str = Assets.fighter[event.strip].hurt
							.map(f => `<span style="--x: ${f.x}; --y: ${f.y}; --r: ${f.r};"></span>`);
				Self.els.canvas.html(str.join(""));
				break;
		}
	}
}
