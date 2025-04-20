
let Assets = {
	sprites: [
		{ id: "smack", width: 720, height: 720, src: "~/gfx/sprite.png" },
		{ id: "stance", width: 144, height: 144, src: "~/icons/stance-01.png" },
		{ id: "fighter", width: 720, height: 720, src: "~/gfx/sprite.png" },
	],
	smack: {},
	stance: {},
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
		highKo: @import "anim/highKo.js",
		midKo: @import "anim/midKo.js",
		lowKo: @import "anim/lowKo.js",
		jump: @import "anim/jump.js",
		highBlock: @import "anim/highBlock.js",
		midBlock: @import "anim/midBlock.js",
		bow: @import "anim/bow.js",
		walk: @import "anim/walk.js",
		stance: @import "anim/stance.js",
	}
};
