
let Test = {
	init(APP) {
		// auto stop Arena FPS control
		// setTimeout(() => APP.game.arena.fpsControl.stop(), 1e3);

		// backFlip backKick
		setTimeout(() => APP.game.arena.player.move("teaKick"), 1e3);
	}
};
