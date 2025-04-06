
@import "./classes/arena.js"
@import "./classes/fighter.js"
@import "./classes/player.js"
@import "./classes/ai.js"

@import "./modules/test.js"


const ik = {
	init() {
		// fast references
		this.els = {
			content: window.find("content"),
		};

		// init all sub-objects
		Object.keys(this)
			.filter(i => typeof this[i].init === "function")
			.map(i => this[i].init(this));

		// DEV-ONLY-START
		Test.init(this);
		// DEV-ONLY-END
	},
	dispatch(event) {
		switch (event.type) {
			// system events
			case "window.init":
				break;
			// custom events
			case "open-help":
				karaqu.shell("fs -u '~/help/index.md'");
				break;
		}
	},
	game: @import "./areas/game.js",
};

window.exports = ik;
