class Game extends Phaser.Scene {
    constructor() {
        super('gameScene')

        // some variables
        this.platforms = [] // array of platforms in mirror world
        this.spikes = [] // array of spikes in mirror world
        this.bullets = [] // array of bullets in real world
        this.gameEnd = false
    }

    create() {
        this.add.text(0, 0, 'meow meow meow')

        // create player
        this.playerMain = new Player(this, 100, game.config.height-75, 'playerMain', 0).setOrigin(0.5, 1)
        this.playerMirror = new Player(this, 105, game.config.height-75, 'playerMirror', 0).setOrigin(0.5, 1)

        // set up scene
        this.bg_ground = new Platform(this, -10, game.config.height, game.config.width+25, 50, 'ground', this.playerMain).setOrigin(0, 1)
        this.physics.add.collider(this.bg_ground, this.playerMirror)

        // keybinds
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
    }

    update() {
        // player jump
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.playerMain.jump()
            this.playerMirror.jump()
        }

        // scroll background
        this.bg_ground.tilePositionX -= game.settings.scrollSpeed
        
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
            }
        });

        // update bullets
        this.bullets.forEach(bullet => {
            bullet.update()
            if (bullet.offScreen()) { 
                bullet.destroy()
                this.bullets.splice(this.bullets.indexOf(bullet), 1)
            }
        });

        // for testing
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.generateBullet()
            // this.generateSpikes()
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            this.generateMirrorPlatform()
        }
        if (this.bullets.length < 2 && Math.random() < game.settings.bulletThreshold) {
            this.generateBullet()
        }
        if (this.spikes.length < 3 && Math.random() < game.settings.spikeThreshold) {
            this.generateSpikes()
        }
        if ((this.platforms.length === 0  || this.platforms[this.platforms.length-1].completelyOnScreen()) && Math.random() < game.settings.platformThreshold) {
            this.generateMirrorPlatform()
        }
    }

    generateBullet() {
        this.bullets.push(new Bullet(this, game.config.width, game.config.height-(parseInt(Math.random() * (300-50) + 50)), 'bullet', this.playerMain))
    }

    generateMirrorPlatform() {
        this.platforms.push(new Platform(this, game.config.width+55, game.config.height-150, parseInt(Math.random()*(550-350)+350), 30, 'ground', this.playerMirror))
    }

    generateSpikes() {
        this.spikes.push(new Spike(this, game.config.width, game.config.height-50, 'spike', this.playerMirror))
    }

    gameOver() {
        this.gameEnd = true
        console.log('game over!')
    }
}