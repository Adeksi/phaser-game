class Level1 extends Phaser.Scene{
    constructor(){
        super({ key: 'Level1'})
    }
    
    preload(){
        this.load.spritesheet('player','./assets/models/Player/player_tilesheet.png',{
            frameWidth: 720/9,
            frameHeight: 330/3
        });
        this.load.image('block', './assets/things/block.png');
        this.load.image('block_end', './assets/things/blockCliff.png');
        this.load.image('arrow', './assets/things/arrow.png');
        this.load.image('bridge', './assets/things/bridge.png');
        this.load.image('ladderLong', './assets/things/ladderLong.png');
        this.load.image('spikes', './assets/things/spikes.png');
        this.load.image('flag', './assets/things/flag.png');
        this.load.image('spikesHidden', './assets/things/spikesHidden.png');
    }

    create(){
        
        this.add.sprite(230,181,'arrow')
        

        gameState.block = this.physics.add.staticGroup();
        
        gameState.block.create(300,300,'block').setSize(206,150).setOffset(10,0)
        
        
        
        gameState.isOnLadder =
        gameState.bridge = this.physics.add.staticGroup();
        gameState.bridge.create(400,255,'bridge');
        gameState.bridge.create(504,255,'bridge');
        gameState.block.create(600,300,'block').setSize(206,150).setOffset(10,0)

        gameState.spikes = this.physics.add.staticGroup();
        gameState.spikes.create(800,511,'spikesHidden').setSize(150,20).setOffset(10,0);
        gameState.ladder = this.physics.add.sprite(650,360,'ladderLong').toggleFlipX().setGravityY(-200).setImmovable();
        // gameState.ladder.create(750,360,'ladderLong').toggleFlipX();
        gameState.block.create(730,580,'block').setSize(206,150).setOffset(10,0)
        // gameState.block.create(938,580,'block_end').setSize(206,150).setOffset(10,0).toggleFlipX()
        gameState.block.create(834,580,'block').setSize(206,150).setOffset(10,0)
        
        gameState.flag = this.physics.add.sprite(600,160,'flag').setImmovable().setGravityY(-200)
        this.createAnimations()
        gameState.player = this.physics.add.sprite(300,100,'player',0).setOrigin(0,0).setSize(45,95).setOffset(20,15);
        gameState.player.setBounce(0.2)

        
        gameState.player.isDuck = false
        this.physics.add.collider(gameState.player, [gameState.block,gameState.bridge])
        
        this.physics.add.collider(gameState.player, gameState.ladder,()=>{
            gameState.player.x = gameState.ladder.x - 40;
        })
        let x = 0
        gameState.cursors = this.input.keyboard.createCursorKeys();
        gameState.flag.move = this.tweens.add({
            targets: gameState.flag,
            onStart:()=>{
                gameState.text = this.add.text(150, 50, 'Start', { fontFamily: 'Arial', fontSize: 36, color: '#ffffff' });
                //gameState.text.destroy()
            },
            onYoyo: ()=>{
                gameState.text2 = this.add.text(150, 50, `${x}`, { fontFamily: 'Arial', fontSize: 36, color: '#ffffff' });
                x++
                gameState.text2.destroy()
            },
            x:700,
            ease: 'Linear',
            duration: 1800,
            repeat:-1,
            yoyo: true,
            flipX: true
        });
        this.physics.add.collider(gameState.player, gameState.spikes,()=>{
            // gameState.spikes.clear(true);
            // gameState.spikes.create(800,511,'spikes').setSize(150,20).setOffset(10,0).setDepth(-1);
            
        });
    }

    update() {
        
        // console.log(`Player X:${gameState.player.x}\n Ladder X:${gameState.ladder.x}`)
        // console.log(`Player Y:${gameState.player.y}\n Ladder Y:${gameState.ladder.y}`)
        if (gameState.cursors.right.isDown) {
            gameState.player.flipX = false;
            gameState.player.setVelocityX(gameState.playerSpeed)
            gameState.player.anims.play('walk', true)
        } 
        else if (gameState.cursors.left.isDown) {
            gameState.player.flipX = true;
            gameState.player.setVelocityX(gameState.playerSpeed * -1)
            gameState.player.anims.play('walk', true)
        } 
        else if (gameState.cursors.down.isDown) {
            if(this.onLadder()){
                console.log("OK");
                gameState.player.anims.play('climb',true); 
                gameState.player.setGravityY(-200)
                gameState.player.y +=2
            }
            else if(!this.onLadder() && gameState.player.body.touching.down) {
                console.log("Not OK");
                gameState.player.isDuck = true
                gameState.player.setSize(45,85).setOffset(20,25)
                gameState.player.setVelocityX(0)
                gameState.player.anims.play('duck',false)
            }
        } 
        else if (gameState.cursors.up.isDown && this.onLadder()) {
                console.log("OK");
                gameState.player.setGravityY(-200)
                gameState.player.anims.play('climb',true); 
                gameState.player.y -=4
        } 
        else if (gameState.cursors.space.isDown && gameState.player.body.touching.down) {
            gameState.player.setVelocityY(-150)
        }
        else if(this.onLadder){
            gameState.player.setVelocityX(0)
            gameState.player.setGravityY(-200)
            gameState.player.anims.play('idle', true)
        }
        else {
            gameState.player.setVelocityX(0)
            gameState.player.setSize(45,95).setOffset(20,15);
            gameState.player.anims.play('idle', true)
        }
        
        // if (gameState.ladder.x - gameState.player.x === 40 ) {
        //     gameState.player.anims.play('climb',true);
        //     if(gameState.cursors.down.isDown && this.onLadder())
        //     {
        //         // gameState.player.anims.play('climb',true); 
        //         gameState.player.setGravityY(-200)
        //         gameState.player.y++
        //     }
        //     else if(gameState.cursors.up.isDown && this.onLadder())
        //     {
        //         // gameState.player.anims.play('climb',true); 
        //         gameState.player.setGravityY(-200)
        //         gameState.player.y--;
        //         console.log("OK") 
        //     }
        //     // else if(!gameState.isOnLadder){
        //     //     console.log(gameState.isOnLadder)
        //     //     gameState.player.setGravityY(0)
        //     // }
        //     else{
        //         // gameState.player.y = gameState.ladder.y - gameState.player.y;
        //         gameState.player.setGravityY(0)
        //     }
            
            
            
        // }
        gameState.player.setGravityY(0)
        // gameState.player.setGravityY(0)
        // else if (gameState.ladder.x - gameState.player.x === 40 && gameState.cursors.up.isDown) {
        //     gameState.player.anims.play('climb',true); 
        //     gameState.player.setGravityY(-200)
        //     gameState.player.y -= 3
        //     if(!gameState.cursors.up.isDown || !gameState.cursors.down.isDown){
        //         gameState.player.setGravityY(0)
        //     }
        // }
        // else{
        //     gameState.player.setGravityY(0)
        //     gameState.player.y = gameState.player.y
        // }

    }
    

    onLadder(){
        if(gameState.ladder.x - gameState.player.x === 40 && (gameState.ladder.y - gameState.player.y < 247 || gameState.ladder.y - gameState.player.y > -33)){
            console.log('On ladder');
            
            return true;
        }
        else{
            console.log('Not On ladder');
            return false;
        }
    }
    createAnimations() {
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('player', {
                start: 9,
                end: 10
            }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('player', {
                start: 0,
                end: 0
            }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('player', {
                start: 4,
                end: 4
            }),
            frameRate: 10,
            repeat: -1
        })
        this.anims.create({
            key: 'duck',
            frames: this.anims.generateFrameNumbers('player', {
                start: 3,
                end: 3
            }),
            frameRate: 10,
            repeat: 0
        })
        this.anims.create({
            key: 'climb',
            frames: this.anims.generateFrameNumbers('player', {
                start: 5,
                end: 6
            }),
            frameRate: 5,
            repeat: -1
        })
    }
}