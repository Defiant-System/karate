
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
			Player = Self.arena.player,
			value,
			el;
		// console.log(event);
		switch (event.type) {
			// system events
			case "window.keydown":
				switch (event.char) {
					case "w":
					case "up": Player.input.up.pressed = true; break;
					case "s":
					case "down": Player.input.down.pressed = true; break;
					case "a":
					case "left": Player.input.left.pressed = true; break;
					case "d":
					case "right": Player.input.right.pressed = true; break;
						
					case "p":
						if (this.arena.fpsControl._stopped) this.arena.fpsControl.start();
						else this.arena.fpsControl.stop();
						break;
				}
				break;
			case "window.keyup":
				switch (event.char) {
					case "w":
					case "up": Player.input.up.pressed = false; break;
					case "s":
					case "down": Player.input.down.pressed = false; break;
					case "a":
					case "left": Player.input.left.pressed = false; break;
					case "d":
					case "right": Player.input.right.pressed = false; break;
				}
				break;
			// custom events
			case "toggle-anim":
				event.el.toggleClass("anim", event.el.hasClass("anim"));
				break;
		}
	}
}
