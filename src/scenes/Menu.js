// enum
const SCENES = Object.freeze({
    CREDITS: 0,
    MENU: 1,
    TUTORIAL: 2,
})

class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene')

        // some variables
        this.currentScene;
        this.currentTutorialIndex;
        this.tutorial = [
            "Press SPACE to jump and fall. Cats in the air will fall, cats on the ground will jump.",
            "Bullets are denoted by fading red lines and will fire on delay, Normal Cat will be killed by the bullets. Mirror Cat is immune to bullets.",
            "Mirror Cat can land on the platforms and can get killed by the spikes. Normal Cat cannot land on the platforms.",
        ]
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

        // tutorial images
        this.load.image('tutorial', './assets/tutorial.png');
    }

    init() {
        // set game settings
        game.settings = {
            scrollSpeed: 5, // in pixels
            bulletDelay: 1.5, // in seconds
            bulletSpeed: 1500, // velocity
            // random generation thresholds
            bulletThreshold: 0.009,
            spikeThreshold: 0.005,
            platformThreshold: 0.05,
            // max count for pooling
            bulletMaxCount: 2,
            spikeMaxCount: 2,
            // delay timers in seconds
            bulletDelayTimer: 2,
            spikeDelayTimer: 25,
            platformDelayTimer: 2,
        }

        // set variables that need to be reset every time Menu plays
        this.currentScene = SCENES.MENU
        this.currentTutorialIndex = 0
    }

    create() {
        // set up animations
        this.anims.create({
            key: 'playerMain-run',
            frames: this.anims.generateFrameNumbers('playerMain', {start: 0, end: 0}),
            frameRate: 30,
        })

        this.add.text(0, 0, 'meow')
        this.startMenu()

        // keybinds
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
    }

    update() {
        switch(this.currentScene) {
            case SCENES.MENU:
                // start game
                if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
                    this.scene.start('gameScene')
                }
                // credits
                if (Phaser.Input.Keyboard.JustDown(keyUP)) {
                    this.startCredits()
                }
                // tutorial
                if (Phaser.Input.Keyboard.JustDown(keyDOWN)) {
                    this.startTutorial()
                }
                break
            case SCENES.CREDITS:
                if (Phaser.Input.Keyboard.JustDown(keyDOWN)) {
                    this.startMenu()
                }
                break
            case SCENES.TUTORIAL:
                if (Phaser.Input.Keyboard.JustDown(keyUP)) {
                    this.startMenu()
                }
                if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
                    this.tutorialPrev()
                }
                if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
                    this.tutorialNext()
                }
                break
        }
    }

    startMenu() {
        // scroll camera
        this.currentScene = SCENES.MENU
    }

    startCredits() {
        // scroll camera
        this.currentScene = SCENES.CREDITS
    }

    startTutorial() {
        // scroll camera
        this.currentScene = SCENES.TUTORIAL
    }

    tutorialPrev() {
        if (this.currentTutorialIndex > 0) {
            this.currentTutorialIndex--
        }
    }
    tutorialNext() {
        if (this.currentTutorialIndex < this.tutorial.length) {
            this.currentTutorialIndex++
        }
    }
}
