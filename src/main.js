/**
 * Lyssa Li
 * Project Name: Smokescreen & Mirrors
 * Project Hours: approx 19
 * Creative Tilt Justification:
 * Citations:
 *      platforming example and code referenced from https://gamedevacademy.org/how-to-make-a-mario-style-platformer-with-phaser-3/?a=13
 *      tweening and fading referenced from https://github.com/nathanaltice/PaddleParkourP3/blob/master/src/scenes/Play.js
 *      animation technique to get the running smooth https://phaser.discourse.group/t/start-animation-at-a-specific-frame/9763
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
let keySPACE, keyLEFT, keyRIGHT, keyUP, keyDOWN

// implment scores
// save scores to local storage
// tutorial page
