class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)

        this.scene = scene

        scene.physics.add.existing(this)
        scene.add.existing(this)

        // audio
        this.jumpSFX = scene.sound.add('jumpSFX')
    }

    jump() {
        if (this.body.onFloor()) {
            this.body.setVelocityY(-600)
        } else {
            this.body.setVelocityY(900)
        }
        // sound
        this.jumpSFX.play()
        this.jumpSFX.setSeek(0.2)
        this.jumpSFX.setVolume(0.03)
    }

    update() {  // animations
        // if body not on ground
            // check if there needs to be a change from jump to fall
            // if velocityY > 0, play falling animation
            // if velocityY < 0, play jumping animtiaon
        // play running animation

        // running animation
        if (this.body.onFloor()) {
            this.anims.play({ key: `${this.texture.key}-run`, startFrame: 1 }, true)
        } else {
            let threshold = 75
            // swap to jump and fall
            if (this.body.velocity.y < -threshold) {
                this.anims.play(`${this.texture.key}-jump`, true)
            } else if (this.body.velocity.y > threshold) {
                this.anims.play(`${this.texture.key}-fall`, true)
            } else {
                this.anims.play(`${this.texture.key}-jumpMax`)
            }
        }
    }
}