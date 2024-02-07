class Bullet extends Phaser.GameObjects.Sprite {
    constructor (scene, x, y, texture, frame=0) {
        super(scene, x, y, texture, frame)
        console.log('made bullet');

        // save the scene
        this.scene = scene
        
        // make the line first
        this.line = this.scene.add.rectangle(0, y, game.config.width, 10, 0xFF0000, 10).setOrigin(0, 0.5)
        console.log(this.line.alpha);

        // fade the line
        const loopCount = 10
        this.scene.time.addEvent({
            delay: game.settings.bulletDelay * (1000 / loopCount),
            repeat: loopCount,
            callback: () => { console.log('alpha', this.line.alpha); this.line.setAlpha(this.line.alpha-0.1) },
            callbackScope: this,
        })

        // timer
        this.scene.time.addEvent({
            delay: game.settings.bulletDelay * 1000,    // 1 second = 1000 milliseconds
            startAt: 0,
            callback: this.shoot,
            callbackScope: this,
        })
    }

    shoot() {
        console.log('pew')
        // add the actual bullet into the scene
        this.scene.physics.add.existing(this)
        this.scene.add.existing(this)

        // create a collidable bullet
        this.body.setImmovable(true)
        this.body.setAllowGravity(false)

        // shoot the bullet
        this.body.setVelocityX(-game.settings.bulletSpeed)
    }
}