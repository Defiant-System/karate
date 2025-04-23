
// karateka.game

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
		let APP = karateka,
			Self = APP.game,
			Player = Self.arena.player,
			value,
			el;
		// console.log(event);
		switch (event.type) {
			// system events
			case "window.keydown":
				switch (event.char) {
					case "up":
						Player.input.up.pressed = true;
						break;
					case "down":
						Player.input.down.pressed = true;
						break;
					case "left":
						Player.move("walk");
						Player.input.left.pressed = true;
						break;
					case "right":
						Player.move("walk");
						Player.input.right.pressed = true;
						break;
					
					case "z": Player.move("backKick", event.char); break;
					case "x": Player.move("highKick", event.char); break;
					case "c": Player.move("midKick", event.char); break;
					case "v": Player.move("lowKick", event.char); break;
					case "b": Player.move("flyKick", event.char); break;
					case "n": Player.move("sweep", event.char); break;
					case "m": Player.move("teaKick", event.char); break;

					case "q": Player.move("highPunch", event.char); break;
					case "w": Player.move("midPunch", event.char); break;
					case "e": Player.move("highBlock", event.char); break;
					case "r": Player.move("midBlock", event.char); break;
					case "t": Player.move("headButt", event.char); break;
					case "y": Player.move("bow", event.char); break;

					case "a": Player.move("backFlip", event.char); break;
					case "s": Player.move("highKo", event.char); break;
					case "d": Player.move("lowKo", event.char); break;
					case "f": Player.move("midKo", event.char); break;
					case "g": Player.move("jump", event.char); break;
					case "h": Player.move("flip", event.char); break;

					case "p":
						if (this.arena.fpsControl._stopped) this.arena.fpsControl.start();
						else this.arena.fpsControl.stop();
						break;
				}
				break;
			case "window.keyup":
				switch (event.char) {
					case "up":
						Player.input.up.pressed = false;
						break;
					case "down":
						Player.input.down.pressed = false;
						break;
					case "left":
						Player.move("stance");
						Player.input.left.pressed = false;
						break;
					case "right":
						Player.move("stance");
						Player.input.right.pressed = false;
						break;
					default:
						Player.keyUp(event.char);
				}
				break;
			// custom events
			case "toggle-anim":
				event.el.toggleClass("anim", event.el.hasClass("anim"));
				break;
		}
	}
}
