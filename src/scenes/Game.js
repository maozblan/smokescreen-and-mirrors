class Game extends Phaser.Scene {
    constructor() {
        super('gameScene')

        // some variables
        this.platforms = [] // array of platforms in mirror world
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

        // for testing
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            console.log('try to make bullet')
            this.generateBullet()
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            this.generateMirrorPlatform()
        }
    }

    generateBullet() {
        new Bullet(this, game.config.width, game.config.height-75, 'bullet', this.playerMain)
    }

    generateMirrorPlatform() {
        this.platforms.push(new Platform(this, game.config.width, game.config.height-150, 150, 30, 'ground', this.playerMirror))
    }

    gameOver() {
        this.gameEnd = true
        console.log('game over!')
    }
}