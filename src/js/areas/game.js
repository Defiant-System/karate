
// karate.game

{
	init() {
		// fast references
		this.els = {
			content: window.find("content"),
			canvas: window.find(".game-view canvas"),
		};
		// set canvas dim
		let { width, height } = this.els.canvas.offset();
		this.els.canvas.css({ width, height });
		// init arena class
		this.arena = new Arena(this.els.canvas);
	},
	dispatch(event) {
		let APP = karate,
			Self = APP.game,
			value,
			el;
		// console.log(event);
		switch (event.type) {
			// system events
			case "window.keydown":
				switch (event.char) {
					case "p":
						if (this.arena.fpsControl._stopped) this.arena.fpsControl.start();
						else this.arena.fpsControl.stop();
						break;
				}
				break;
			// custom events
			case "toggle-anim":
				event.el.toggleClass("anim", event.el.hasClass("anim"));
				break;
		}
	}
}
