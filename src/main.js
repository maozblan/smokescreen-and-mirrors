/**
 * Lyssa Li
 * Project Name: Smokescreen & Mirrors
 * Project Hours: approx 5
 * Creative Tilt Justification:
 * Citations:
 *      platforming example and code referenced from https://gamedevacademy.org/how-to-make-a-mario-style-platformer-with-phaser-3/?a=13
 */

let config = {
    type: Phaser.AUTO,
    width: 640, 
    height: 360,
    pixelPerfect: true,
    pixelArt: true,
    zoom: 1.5,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
            debug: true,
        }
    },
    scene: [ Menu, Game ]
}
let game = new Phaser.Game(config)

// keybinds
let keySPACE, keyLEFT
