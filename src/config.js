const gameState = {
	playerSpeed: 200
};

const config = {
	type: Phaser.AUTO,
	width: 1280,
	height: 720,
	backgroundColor: "b9eaff",
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 },
            enableBody: true,
            debug:true
		}
	},
	scene:[Level2]
};

const game = new Phaser.Game(config);

