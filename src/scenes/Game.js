class Game extends Phaser.Scene {
    constructor() {
        super('gameScene')
    }

    create() {
        this.add.text(0, 0, 'meow meow meow')

        // set up scene
        // this.s_ground = this.add.tileSprite(0, game.config.height, game.config.width, 50, 'ground').setOrigin(0, 1)
        this.bg_ground = new Platform(this, 0, game.config.height, 'ground').setOrigin(0, 1)


        // create player
        this.playerMain = new Player(this, 100, game.config.height-75, 'playerMain', 0).setOrigin(0.5, 1)

        // collisions
        this.physics.add.collider(this.playerMain, this.bg_ground)

        // keybinds
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE) && this.playerMain.body.onFloor()) {
            this.playerMain.jump()
        }
    }
}