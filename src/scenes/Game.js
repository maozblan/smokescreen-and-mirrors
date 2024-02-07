class Game extends Phaser.Scene {
    constructor() {
        super('gameScene')

        // some variables
        this.platforms = [] // array of platforms in mirror world
        this.gameEnd = false
    }

    create() {
        this.add.text(0, 0, 'meow meow meow')

        // set up scene
        this.bg_ground = new Platform(this, 0, game.config.height, 'ground').setOrigin(0, 1)

        // create player
        this.playerMain = new Player(this, 100, game.config.height-75, 'playerMain', 0).setOrigin(0.5, 1)

        // collisions
        this.physics.add.collider(this.playerMain, this.bg_ground)

        // keybinds
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
    }

    update() {
        // update instances
        this.playerMain.update()
        
        // update background
        this.platforms.forEach(platform => {
            platform.x -= game.settings.scrollSpeed
        });

        // for testing
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            console.log('try to make bullet')
            new Bullet(this, game.config.width, game.config.height-100, 'bullet', this.playerMain)
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            this.generateMirrorPlatform()
        }
    }

    gameOver() {
        this.gameEnd = true
        console.log('game over!')
    }
}