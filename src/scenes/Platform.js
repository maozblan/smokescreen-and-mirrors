class Platform extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture)

        scene.physics.add.existing(this)
        this.body.setImmovable(true)
        this.body.setAllowGravity(false)
        scene.add.existing(this)

        // some stats?
    }

    update() {
        this.tilePositionX -= game.settings.scrollSpeed;
    }
}

// prefab for generation, not the prefab copy that is in the scene
