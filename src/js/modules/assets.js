
let Assets = {
	belts: {
		white: {},
		yellow: {},
		orange: {},
		green: {},
		blue: {},
		brown: {},
		black: {},
	},
	sprites: [
		{ id: "smack", width: 192, height: 64, src: "~/icons/smack.png" },
		{ id: "modern", width: 144, height: 144, src: "~/icons/modern-01.png" },
		{ id: "fighter", width: 1440, height: 1440, src: "~/icons/fighter.png" },
	],
	smack: {
		strip: [
			{ x: 0, y: 0 },
			{ x: 64, y: 0 },
			{ x: 128, y: 0 },
		]
	},
	modern: {
		strip: [
			{ x: 0, y: 0 },
		]
	},
	fighter: {
		headButt: @import "anim/headButt.js",
		backKick: @import "anim/backKick.js",
		flyKick: @import "anim/flyKick.js",
		teaKick: @import "anim/teaKick.js",
		highKick: @import "anim/highKick.js",
		midKick: @import "anim/midKick.js",
		lowKick: @import "anim/lowKick.js",
		backFlip: @import "anim/backFlip.js",
		flip: @import "anim/flip.js",
		sweep: @import "anim/sweep.js",
		highPunch: @import "anim/highPunch.js",
		midPunch: @import "anim/midPunch.js",
		highKo: @import "anim/highKO.js",
		midKo: @import "anim/midKO.js",
		lowKo: @import "anim/lowKO.js",
		jump: @import "anim/jump.js",
		highBlock: @import "anim/highBlock.js",
		midBlock: @import "anim/midBlock.js",
		bow: @import "anim/bow.js",
		walk: @import "anim/walk.js",
		stance: @import "anim/stance.js",
	}
};
