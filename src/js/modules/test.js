
let Test = {
	init(APP) {
		// auto stop Arena FPS control
		// setTimeout(() => APP.game.arena.fpsControl.stop(), 2e3);
		setTimeout(() => APP.game.arena.player.move("backKick"), 1e3);
	}
};
