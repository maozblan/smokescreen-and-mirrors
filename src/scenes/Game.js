class Game extends Phaser.Scene {
    constructor() {
        super('gameScene')
    }

    create() {
        this.add.text(0, 0, 'meow meow meow')
    }
}