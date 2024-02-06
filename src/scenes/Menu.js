class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene')
    }

    preload() {
        // them sprites and audio
    }

    create() {
        // set up animations
        this.add.text(0, 0, 'meow')
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start('gameScene')
        }
    }
}