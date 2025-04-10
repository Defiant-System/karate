
@import "./classes/arena.js"
@import "./classes/fighter.js"
@import "./classes/player.js"
@import "./classes/ai.js"

@import "./modules/assets.js"
@import "./modules/utils.js"
@import "./modules/test.js"


const karate = {
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
		let Self = karate,
			name,
			el;
		switch (event.type) {
			// system events
			case "window.init":
				break;
			case "window.keydown":
			case "window.keyup":
				name = Self.els.content.data("show");
				Self[name].dispatch(event);
				break;
			// custom events
			case "open-help":
				karaqu.shell("fs -u '~/help/index.md'");
				break;
			// proxy event
			default:
				el = event.el;
				if (!el && event.origin) el = event.origin.el;
				if (el && el.length) {
					let pEl = el.parents(`?div[data-area]`);
					if (pEl.length) {
						name = pEl.data("area");
						return Self[name].dispatch(event);
					}
				}
		}
	},
	game: @import "./areas/game.js",
};

window.exports = karate;
