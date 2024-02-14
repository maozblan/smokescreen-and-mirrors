/**
 * Lyssa Li
 * Project Name: Smokescreen & Mirrors
 * Project Hours: approx 25
 * Creative Tilt Justification:
 * Citations:
 *      platforming example and code referenced from https://gamedevacademy.org/how-to-make-a-mario-style-platformer-with-phaser-3/?a=13
 *      tweening and fading referenced from https://github.com/nathanaltice/PaddleParkourP3/blob/master/src/scenes/Play.js
 *      animation technique to get the running smooth https://phaser.discourse.group/t/start-animation-at-a-specific-frame/9763
 *      animation framing and picking frames https://phaser.discourse.group/t/capture-current-frame-number-of-animation-and/2723
 *      camera panning and timer done with the help of chatGPT https://chat.openai.com/share/6fc570b0-81a1-4f91-beae-39c64d2ae72c
 */

let config = {
    type: Phaser.AUTO,
    width: 640, 
    height: 360,
    // pixelPerfect: true,
    pixelArt: true,
    zoom: 1.5,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1000 },
            // debug: true,
        }
    },
    scene: [ Menu, Game ]
}
let game = new Phaser.Game(config)

// keybinds
let keySPACE, keyLEFT, keyRIGHT, keyUP, keyDOWN, keyM, keyENTER

// implment scores
// save scores to local storage
