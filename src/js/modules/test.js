
let Test = {
	init(APP) {
		// return;

		// APP.game.arena._speed = 520;

		// auto stop Arena FPS control
		setTimeout(() => APP.game.arena.fpsControl.stop(), 900);
		return;

		// setTimeout(() => APP.game.arena.smack({ x: 250, y: 250 }), 1e3);
		// return;

		// setTimeout(() => window.open("editor"), 300);
		// setTimeout(() => {
		// 	APP.editor.els.tree.find(`> .item:nth(2) > .icon-arrow`).trigger("click");
		// 	APP.editor.els.tree.find(`> .item:nth(2) > .children > .item:nth(20) > span`).trigger("click");
		// }, 800);


		// backFlip backKick teaKick highKick midKick lowKick flyKick
		// setTimeout(() => APP.game.arena.player.move("backKick"), 1e3);
		// setTimeout(() => APP.game.arena.player.keyUp("z"), 1e3);
		setTimeout(() => APP.game.dispatch({ type: "window.keydown", char: "w" }), 1e3);
		setTimeout(() => APP.game.dispatch({ type: "window.keyup", char: "w" }), 11e2);

		// setTimeout(() => APP.dispatch({ type: "set-bg", arg: "bg-01.png" }), 500);
		// setTimeout(() => APP.dispatch({ type: "set-bg", arg: "url('~/gfx/bg-02.webp')" }), 500);
	}
};
