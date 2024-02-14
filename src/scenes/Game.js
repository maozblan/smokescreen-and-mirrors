class Game extends Phaser.Scene {
    constructor() {
        super('gameScene')

        // some variables
        this.platforms = [] // array of platforms in mirror world
        this.spikes = [] // array of spikes in mirror world
        this.bullets = [] // array of bullets in real world
        this.gameEnd = false
        this.runScore = 0
    }

    create() {
        console.log('create')
        // create player
        this.playerMirror = new Player(this, 95, 0, 'playerMirror', 0).setOrigin(0.5, 1)
        this.playerMain = new Player(this, 100, 0, 'player', 0).setOrigin(0.5, 1)

        // set up scene
        this.bg_ground = new Platform(this, -10, game.config.height, game.config.width+25, 50, 'ground', this.playerMain).setOrigin(0, 1)
        this.bg_mirror = this.add.tileSprite(0, 0, 700, 360, 'backgroundMirror').setOrigin(0).setDepth(-5)
        this.bg_mirror.tilePositionY = game.config.height // offset credits page

        // add extra colliders
        this.physics.add.collider(this.bg_ground, this.playerMirror)

        // keybinds
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M)

        // create game over screen
        this.gameOverScreen = this.add.image(game.config.width/2, game.config.height/2, 'gameOver').setOrigin(0.5).setDepth(10)
        this.runScoreT = this.add.text(166+16, 214+16, '0').setOrigin(0.5).setFontSize(20).setAlign('center').setDepth(11)
        this.highScoreT = this.add.text(game.config.width-(166+16), 214+16, '0').setOrigin(0.5).setFontSize(20).setAlign('center').setDepth(11)
        this.newHighScoreT = this.add.text(game.config.width/2, 256+16, 'NEW HIGH SCORE!').setFontSize(20).setOrigin(0.5).setAlign('center').setDepth(11)
        this.restartGuideT = this.add.text(game.config.width/2, game.config.height-60, 'M to return to menu   ENTER to play again').setOrigin(0.5).setAlign('center').setDepth(11)

        // hide on start
        this.hideGameOver()
    }

    init() {
        console.log('init')

        // delay timer
        this.time.addEvent({
            delay: 1000,
            repeat: Math.max(game.settings.bulletDelayTimer, game.settings.spikeDelayTimer, game.settings.platformDelayTimer),
            callback: this.updateTimers,
            callbackScope: this,
        })

        // difficulty increase every 15 seconds
        this.time.addEvent({
            delay: 15 * 1000,
            loop: true,
            callback: this.increaseDifficulty,
            callbackScope: this,
        })
    }

    update() {
        if (!this.gameEnd) {
            // player jump
            if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
                this.playerMain.jump()
                this.playerMirror.jump()
            }
            // player update
            this.playerMain.update()
            this.playerMirror.update()

            this.updateBackground()

            // random generation
            if (!game.settings.bulletDelayTimer &&
                this.bullets.length < game.settings.bulletMaxCount &&
                Math.random() < game.settings.bulletThreshold) {
                this.generateBullet()
            }
            if (!game.settings.spikeDelayTimer &&
                this.spikes.length < game.settings.spikeMaxCount &&
                (this.spikes.length === 0 || this.spikes[this.spikes.length-1].completelyOnScreen()) &&
                Math.random() < game.settings.spikeThreshold) {
                this.generateSpikes()
            }
            if (!game.settings.platformDelayTimer &&
                (this.platforms.length === 0  || this.platforms[this.platforms.length-1].completelyOnScreen()) &&
                Math.random() < game.settings.platformThreshold) {
                this.generateMirrorPlatform()
            }
        } else {
            // handle game over events
            if (Phaser.Input.Keyboard.JustDown(keyM)) {
                this.endScene()
                this.scene.start('menuScene')
            }
            if (Phaser.Input.Keyboard.JustDown(keyENTER)) {
                this.endScene()
                this.scene.restart()
            }
        }
    }

    generateBullet() {
        this.bullets.push(new Bullet(this, game.config.width, game.config.height-(parseInt(Math.random() * (275-50) + 50)), 'bullet', this.playerMain).setScale(1.5).setDepth(5))
    }

    generateMirrorPlatform() {
        this.platforms.push(new Platform(this, game.config.width+55, game.config.height-150, parseInt(Math.random()*(550-350)+350), 30, 'mirrorGround', this.playerMirror))
    }

    generateSpikes() {
        this.spikes.push(new Spike(this, game.config.width, game.config.height-50, 'spike', this.playerMirror).setOrigin(0, 1).setDepth(-5))
    }

    updateTimers() {
        if (game.settings.bulletDelayTimer) {
            game.settings.bulletDelayTimer--
        }
        if (game.settings.spikeDelayTimer) {
            game.settings.spikeDelayTimer--
        }
        if (game.settings.platformDelayTimer) {
            game.settings.platformDelayTimer--
        }
    }

    counter = 1
    increaseDifficulty() { // set timer event to call every 15 seconds
        game.settings.bulletThreshold += 0.001
        game.settings.spikeThreshold += 0.0005
        game.settings.platformThreshold += 0.004
        if (this.counter % 4 == 0) { // every 60 seconds minor increase to difficulty
            game.settings.spikeMaxCount++
        }
        if (this.counter++ % 2 == 0) { // every 30 seconds minor increase to difficulty
            game.settings.bulletMaxCount++
        }
    }

    updateBackground() {
        // scroll background
        this.bg_ground.tilePositionX += game.settings.scrollSpeed
        this.bg_mirror.tilePositionX += game.settings.scrollSpeed
        
        // update platforms
        this.platforms.forEach(platform => {
            platform.update()
            if (platform.offScreen()) { 
                platform.destroy()
                this.platforms.splice(this.platforms.indexOf(platform), 1)
            }
        });
        // update spikes
        this.spikes.forEach(spike => {
            spike.update()
            if (spike.offScreen()) { 
                spike.destroy()
                this.spikes.splice(this.spikes.indexOf(spike), 1)
                this.runScore += game.settings.spikeScore
            }
        });
        // update bullets
        this.bullets.forEach(bullet => {
            bullet.update()
            if (bullet.offScreen()) { 
                bullet.destroy()
                this.bullets.splice(this.bullets.indexOf(bullet), 1)
                this.runScore += game.settings.bulletScore
            }
        });
    }

    gameOver() {
        this.gameEnd = true
        // pause animations
        this.playerMain.anims.pause()
        this.playerMirror.anims.pause()
        // game over screen
        const b = this.updateGameOver()
        this.showGameOver(b)
    }

    hideGameOver() {
        [this.gameOverScreen, this.runScoreT, this.highScoreT, this.newHighScoreT, this.restartGuideT].forEach(item => {
            item.visible = false
        })
    }
    showGameOver(highScore=false) {
        [this.gameOverScreen, this.runScoreT, this.highScoreT, this.restartGuideT].forEach(item => {
            item.visible = true
        })
        if (highScore) {
            this.newHighScoreT.visible = true
        }
    }
    // returns if there is new high score T/F
    updateGameOver() {
        this.runScoreT.text = this.runScore
        if (this.runScore > this.highScore) {
        }
        return false
    }

    // reset scene variables
    endScene() {
        this.hideGameOver()
        this.playerMain.x = 100
        this.playerMain.y = 0
        this.playerMain.body.setVelocity(0)
        this.playerMirror.x = 95
        this.playerMirror.y = 0
        this.playerMirror.body.setVelocity(0)

        // reset data
        this.gameEnd = false
        this.runScore = 0
        game.settings.bulletThreshold = 0.009
        game.settings.spikeThreshold = 0.005
        game.settings.platformThreshold = 0.05
        game.settings.bulletMaxCount = 3
        game.settings.spikeMaxCount = 1
    }
}