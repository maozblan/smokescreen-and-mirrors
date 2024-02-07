class Platform extends Phaser.GameObjects.TileSprite {
    constructor(scene, posX, posY, sizeX, sizeY, texture, player) {
        super(scene, posX, posY, sizeX, sizeY, texture)

        this.setOrigin(0, 0)

        // save for later
        this.size = sizeX

        // set up physics
        scene.physics.add.existing(this)
        this.body.setImmovable(true)
        this.body.setAllowGravity(false)
        scene.add.existing(this)

        if (player) {
            this.body.checkCollision.down = false
            this.body.checkCollision.left = false
            scene.physics.add.collider(player, this)
        }
    }

    update() {
        this.x -= game.settings.scrollSpeed
    }

    offScreen() {
        if (this.x + this.size < 0) {
            return true
        }
        return false
    }

    completelyOnScreen() {
        if (this.x === game.config.width-this.sizeX) {
            return true
        }
        return false
    }
}

// prefab for generation, not the prefab copy that is in the scene
