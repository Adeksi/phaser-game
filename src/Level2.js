class Level2 extends Phaser.Scene {
	constructor() {
		super({
			key: "Level2"
		})
	}
	preload() {
		this.load.image('block', './assets/Isometric/block_NE.png')
	}

	create() {
		gameState.block = this.physics.add.staticGroup();
		gameState.block.create(395,530,'block')
		gameState.block.create(500,600,'block')
	}
	update() {

	}
}