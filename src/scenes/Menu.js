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
            "Bullets are denoted by fading red lines and will fire on delay",
            "Normal Cat will be killed by the bullets. Mirror Cat is immune to bullets.\n Mirror Cat can land on the platforms and can get killed by the spikes. Normal Cat cannot land on the platforms.",
        ]
    }

    preload() {
        // them sprites and audio
        this.load.image('ground', './assets/img/ground.png')
        this.load.image('backgroundMirror', './assets/img/bgMirror.png')
        this.load.image('bullet', './assets/img/bullet.png')
        this.load.image('spike', './assets/img/spike.png')
        this.load.image('mirrorPlatform', './assets/img/mirrorPlatform.png')
        this.load.spritesheet('player', './assets/img/spritesheets/player-Sheet.png', {
            frameWidth: 50,
            frameHeight: 35,
            startFrame: 0,
            endFrame: 7
        })
        this.load.spritesheet('playerMirror', './assets/img/playerMirror.png', {
            frameWidth: 50,
            frameHeight: 35,
            startFrame: 0,
            endFrame: 7
        })

        // menu setup
        this.load.image('menuBG', './assets/img/menuBackground.png')
        this.load.image('tutorialBG', './assets/img/tutorialBackground.png')
        this.load.image('tutorial', './assets/img/tutorial-Sheet.png');
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
            spikeDelayTimer: 15,
            platformDelayTimer: 2,
        }

        // set variables that need to be reset every time Menu plays
        this.currentScene = SCENES.MENU
        this.currentTutorialIndex = 0

        // reset camera and state
        this.cameras.main.centerOn(game.config.width/2, game.config.height/2)
        this.startMenu()
        // reset tutorial
        this.tutorial.tilePositionX = 0
    }

    create() {
        // set up animations
        this.anims.create({
            key: 'player-run',
            repeat: -1,
            frames: this.anims.generateFrameNumbers('player', {start: 0, end: 5}),
            frameRate: 15,
        })
        this.anims.create({
            key: 'player-jumpMax',
            frames: this.anims.generateFrameNumbers('player', {frames: [5, 0, 1]}),
            frameRate: 15,
        })
        this.anims.create({
            key: 'player-jump',
            frames: this.anims.generateFrameNumbers('player', {frames: [6]}),
            frameRate: 0,
        })
        this.anims.create({
            key: 'player-fall',
            frames: this.anims.generateFrameNumbers('player', {frames: [7]}),
            frameRate: 0,
        })

        // set up scene
        this.add.image(0, 0, 'menuBG').setOrigin(0)
        this.add.image(0, game.config.height, 'tutorialBG').setOrigin(0)
        this.add.image(0, -game.config.height, 'creditsBG').setOrigin(0)
        new Platform(this, -10, game.config.height, game.config.width+25, 50, 'ground').setOrigin(0, 1)

        // set up tutorial
        this.tutorial = this.add.tileSprite(150, game.config.height+50, 450, 200, 'tutorial', 0).setOrigin(0).setDepth(-5)
        this.add.text(60, game.config.height*2-40, 'T U T O R I A L').setFontSize(30).setRotation(-Math.PI/2)
        this.tutorialText = this.add.text(375, game.config.height*2-58, this.tutorial[0]).setOrigin(0.5)

        // set up camera
        this.cameras.main.setBounds(0, -game.config.height, game.config.width, game.config.height*3, true)

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
        this.cameras.main.pan(game.config.width/2, game.config.height/2, 500)
        this.currentScene = SCENES.MENU
    }

    startCredits() {
        console.log('e')
        // scroll camera
        this.cameras.main.pan(game.config.width/2, -game.config.height/2, 500)
        this.currentScene = SCENES.CREDITS
    }

    startTutorial() {
        // scroll camera
        this.cameras.main.pan(game.config.width/2, game.config.height*3/2, 500)
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
