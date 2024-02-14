class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene')

        // some variables
        this.currentYLoc = game.config.height/2; // keep track of screen scroll
        this.currentTutorialIndex = 0;
        this.tutorialArr = [
            "Press SPACE to jump and fall for both cats.\nCats in the air will fall, cats on the ground will jump.",
            "Bullets are denoted by fading red lines\nand will fire on delay",
            "Normal Cat will be killed by the bullets.\nMirror Cat is immune to bullets.\nMirror Cat can land on the platforms\nand can get killed by the spikes.\nNormal Cat cannot land on the platforms.",
        ]
    }

    preload() {
        // them sprites and audio
        this.load.image('ground', './assets/img/ground.png')
        this.load.image('mirrorGround', './assets/img/mirrorGround.png')
        this.load.image('backgroundMirror', './assets/img/background.png')
        this.load.image('bullet', './assets/img/bullet.png')
        this.load.image('spike', './assets/img/spike.png')
        this.load.spritesheet('player', './assets/img/spritesheets/player-Sheet.png', {
            frameWidth: 50,
            frameHeight: 35,
            startFrame: 0,
            endFrame: 7
        })
        this.load.spritesheet('playerMirror', './assets/img/spritesheets/playerMirror-Sheet.png', {
            frameWidth: 50,
            frameHeight: 35,
            startFrame: 0,
            endFrame: 7
        })
        this.load.image('gameOver', './assets/img/gameOver.png')

        // menu setup
        this.load.image('menuBG', './assets/img/menuBackground.png')
        this.load.image('tutorialBG', './assets/img/tutorialBackground.png')
        this.load.image('tutorial', './assets/img/tutorial-Sheet.png')
        this.load.image('dot', './assets/img/tutorialDot.png')
    }

    create() {
        // set up animations
        ['player', 'playerMirror'].forEach((item) => {
            this.anims.create({
                key: `${item}-run`,
                repeat: -1,
                frames: this.anims.generateFrameNumbers(item, {start: 0, end: 5}),
                frameRate: 15,
            })
            this.anims.create({
                key: `${item}-jumpMax`,
                frames: this.anims.generateFrameNumbers(item, {frames: [5, 0, 1]}),
                frameRate: 15,
            })
            this.anims.create({
                key: `${item}-jump`,
                frames: this.anims.generateFrameNumbers(item, {frames: [6]}),
                frameRate: 0,
            })
            this.anims.create({
                key: `${item}-fall`,
                frames: this.anims.generateFrameNumbers(item, {frames: [7]}),
                frameRate: 0,
            })
        })

        // set up scene
        this.add.image(0, 0, 'menuBG').setOrigin(0)
        this.add.image(0, game.config.height, 'tutorialBG').setOrigin(0)
        new Platform(this, -10, game.config.height, game.config.width+25, 50, 'ground').setOrigin(0, 1)
        this.add.tileSprite(0, -game.config.height, 700, 720, 'backgroundMirror').setOrigin(0).setDepth(-5) // includes tutorial bg
        this.add.text(game.config.width/2, game.config.height-90, 'UP ARROW for Credits\nDOWN ARROW for Tutorial\nSPACE to Start').setAlign('center').setOrigin(0.5)

        // set up tutorial
        this.tutorial = this.add.tileSprite(150, game.config.height+50, 450, 200, 'tutorial', 0).setOrigin(0).setDepth(-5)
        this.add.text(60, game.config.height*2-40, 'T U T O R I A L').setFontSize(30).setRotation(-Math.PI/2)
        this.tutorialText = this.add.text(375, game.config.height*2-58, this.tutorialArr[0]).setFontSize(12).setAlign('center').setOrigin(0.5)
        this.tutorialMarker = this.add.image(355, game.config.height*2-100, 'dot')

        // set up credits
        this.add.text(game.config.width/2, -game.config.height+50, 'C R E D I T S').setFontSize(30).setOrigin(0.5)

        // set up camera
        this.cameras.main.setBounds(0, -game.config.height, game.config.width, game.config.height*3, true)

        // keybinds
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
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
            bulletMaxCount: 3,
            spikeMaxCount: 1,
            // delay timers in seconds
            bulletDelayTimer: 4,
            spikeDelayTimer: 2,
            platformDelayTimer: 2,
            // scores for dodging various objects
            bulletScore: 10,
            spikeScore: 5
        }

        // set variables that need to be reset every time Menu plays
        this.currentYLoc = game.config.height/2;
        this.currentTutorialIndex = 0

        // reset camera and state
        this.cameras.main.centerOn(game.config.width/2, game.config.height/2)
        // reset tutorial
        if (this.tutorial) {
            this.updateTutorial()
        }
    }

    update() {
        const scrollSpeed = 450 // in milliseconds
        // scrolling
        if (Phaser.Input.Keyboard.JustDown(keyUP)) {
            if (this.currentYLoc >= game.config.height/2) {
                this.currentYLoc -= game.config.height
                this.cameras.main.pan(game.config.width/2, this.currentYLoc, scrollSpeed)
            }
        }
        if (Phaser.Input.Keyboard.JustDown(keyDOWN)) {
            if (this.currentYLoc <= game.config.height/2) {
                this.currentYLoc += game.config.height
                this.cameras.main.pan(game.config.width/2, this.currentYLoc, scrollSpeed)
            }
        }
        // start on SPACE when on menu
        if (Phaser.Input.Keyboard.JustDown(keySPACE) && this.currentYLoc === game.config.height/2) {
            this.scene.start('gameScene')
        }
        // go through tutorial when on tutorial
        if (Phaser.Input.Keyboard.JustDown(keyLEFT) && this.currentYLoc === game.config.height*3/2) {
            this.tutorialPrev()
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT) && this.currentYLoc === game.config.height*3/2) {
            this.tutorialNext()
        }
    }

    // scrolling tutorial panel
    updateTutorial() {
        this.tutorial.tilePositionX = this.currentTutorialIndex*450
        this.tutorialText.text = this.tutorialArr[this.currentTutorialIndex]
        // update the dot
        this.tutorialMarker.x = 355 + 20*this.currentTutorialIndex
    }
    tutorialPrev() {
        if (this.currentTutorialIndex > 0) {
            this.currentTutorialIndex--
        }
        this.updateTutorial()
    }
    tutorialNext() {
        if (this.currentTutorialIndex < this.tutorialArr.length-1) {
            this.currentTutorialIndex++
        }
        this.updateTutorial()
    }
}
