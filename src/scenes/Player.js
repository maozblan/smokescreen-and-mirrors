class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)

        scene.physics.add.existing(this)
        scene.add.existing(this)

        // state
        this.state = 'run'
        // TODO state machine
    }

    jump() {
        // jump physics
        this.body.setVelocityY(-400)
    }
}