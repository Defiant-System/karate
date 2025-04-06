
// ik.game

{
	init() {
		// fast references
		this.els = {
			content: window.find("content"),
			canvas: window.find("canvas"),
		};
		// set canvas dim
		let { width, height } = this.els.canvas.offset();
		this.els.canvas.css({ width, height });
		// init arena class
		this.arena = new Arena(this.els.canvas);
	},
	dispatch(event) {
		let APP = ik,
			Self = APP.game,
			value,
			el;
		// console.log(event);
		switch (event.type) {
			// custom events
			case "init-view":
				break;
		}
	}
}
