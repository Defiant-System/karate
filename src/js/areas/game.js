
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
					
					case "z": Player.move("backKick"); break;
					case "x": Player.move("highKick"); break;
					case "c": Player.move("midKick"); break;
					case "v": Player.move("lowKick"); break;
					case "b": Player.move("flyKick"); break;
					case "n": Player.move("sweep"); break;
					case "m": Player.move("teaKick"); break;

					case "q": Player.move("highPunch"); break;
					case "w": Player.move("midPunch"); break;
					case "e": Player.move("highBlock"); break;
					case "r": Player.move("midBlock"); break;
					case "t": Player.move("headButt"); break;
					case "y": Player.move("bow"); break;

					case "a": Player.move("backFlip"); break;
					case "s": Player.move("hiKo"); break;
					case "d": Player.move("lowKo"); break;
					case "f": Player.move("faceUp"); break;
					case "g": Player.move("backUp"); break;
					case "h": Player.move("jump"); break;


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
						Player.move("stand");
						Player.input.left.pressed = false;
						break;
					case "right":
						Player.move("stand");
						Player.input.right.pressed = false;
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
