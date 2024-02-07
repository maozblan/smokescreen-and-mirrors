class Spike extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, player) {
        super(scene, x, y, texture)
        
        // add to scene
        scene.physics.add.existing(this)
        this.body.setAllowGravity(false)
        this.body.setImmovable(true)
        scene.add.existing(this)

        scene.physics.add.collider(player, this, scene.gameOver, null, this)
    }

    update() {
        this.x -= game.settings.scrollSpeed
    }
    
    offScreen() {
        if (this.x + this.width < 0) {
            return true
        }
        return false
    }
}
