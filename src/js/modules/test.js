
let Test = {
	init(APP) {
		// auto stop Arena FPS control
		setTimeout(() => APP.game.arena.fpsControl.stop(), 1500);
	}
};
