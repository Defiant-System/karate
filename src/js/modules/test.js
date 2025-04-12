
let Test = {
	init(APP) {
		// auto stop Arena FPS control
		// setTimeout(() => APP.game.arena.fpsControl.stop(), 2e3);

		// backFlip backKick teaKick highKick midKick lowKick flyKick
		setTimeout(() => APP.game.arena.player.move("backFlip"), 1e3);
	}
};
