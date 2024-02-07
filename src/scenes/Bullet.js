class Bullet extends Phaser.GameObjects.Sprite {
    constructor (scene, x, y, texture, player, frame=0) {
        super(scene, x, y, texture, frame)

        // save variables for other use
        this.scene = scene
        this.player = player
        
        // make the line first
        this.line = this.scene.add.rectangle(0, y, game.config.width, 10, 0xFF0000, 1).setOrigin(0, 0.5)

        // fade the line
        this.scene.tweens.add({
            targets: this.line,
            duration: game.settings.bulletDelay*1000-50, // bullets shoot right after
            alpha: { from: 1, to: 0 },
            repeat: 0,
        })

        // timer to shoot bullet
        this.scene.time.addEvent({
            delay: game.settings.bulletDelay * 1000,    // 1 second = 1000 milliseconds
            startAt: 0,
            callback: this.shoot,
            callbackScope: this,
        })
    }

    shoot() {
        // add the actual bullet into the scene
        this.scene.physics.add.existing(this)
        this.scene.add.existing(this)

        // set up physics
        this.body.setImmovable(true)
        this.body.setAllowGravity(false)
        this.scene.physics.add.collider(this.player, this, this.scene.gameOver, null, this)

        // shoot the bullet
        this.body.setVelocityX(-game.settings.bulletSpeed)
    }

    offScreen() {
        if (this.x + this.width < 0) {
            return true
        }
        return false
    }
}