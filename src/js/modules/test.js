
let Test = {
	init(APP) {
		// auto stop Arena FPS control
		setTimeout(() => APP.game.arena.fpsControl.stop(), 1e3);

		setTimeout(() => window.open("editor"), 300);
		setTimeout(() => {
			APP.editor.els.tree.find(`> .item:nth(2) > .icon-arrow`).trigger("click");
			APP.editor.els.tree.find(`> .item:nth(2) > .children > .item:nth(1) > span`).trigger("click");
			// console.log( APP.editor.els.tree.find(`> .item:nth(2) > .children > .item:nth(0) > span`) );
			// APP.editor.dispatch({ type: "draw-frame", strip: "stance" });
		}, 800);


		// backFlip backKick teaKick highKick midKick lowKick flyKick
		// setTimeout(() => APP.game.arena.player.move("backKick"), 1e3);
		// setTimeout(() => APP.game.arena.player.keyUp("z"), 1e3);

		// setTimeout(() => APP.dispatch({ type: "set-bg", arg: "bg-01.png" }), 500);
		// setTimeout(() => APP.dispatch({ type: "set-bg", arg: "url('~/gfx/bg-02.webp')" }), 500);
	}
};
