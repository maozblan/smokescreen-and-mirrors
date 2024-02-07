class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene')
    }

    preload() {
        // them sprites and audio
        this.load.image('ground', './assets/img/ground.png')
        this.load.image('bullet', './assets/img/bullet.png')
        this.load.image('spike', './assets/img/spike.png')
        this.load.image('mirrorPlatform', './assets/img/mirrorPlatform.png')
        this.load.spritesheet('playerMain', './assets/img/playerMain.png', {
            frameWidth: 50,
            frameHeight: 35,
            startFrame: 0,
            endFrame: 2
        })
        this.load.spritesheet('playerMirror', './assets/img/playerMirror.png', {
            frameWidth: 50,
            frameHeight: 35,
            startFrame: 0,
            endFrame: 2
        })
    }

    init() {
        // set game settings
        game.settings = {
            scrollSpeed: 5, // in pixels
            bulletDelay: 1.5, // in seconds
            bulletSpeed: 1300, // velocity
            // random generation thresholds
            bulletThreshold: 0.007,
            spikeThreshold: 0.005,
            platformThreshold: 0.04,
        }
    }

    create() {
        // set up animations
        this.anims.create({
            key: 'playerMain-run',
            frames: this.anims.generateFrameNumbers('playerMain', {start: 0, end: 0}),
            frameRate: 30,
        })

        this.add.text(0, 0, 'meow')
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start('gameScene')
        }
    }
}
