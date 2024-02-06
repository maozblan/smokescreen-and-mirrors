/**
 * Lyssa Li
 * Project Name: Smokescreen & Mirrors
 * Project Hours: approx 1
 * Creative Tilt Justification:
 * Citations:
 */

let config = {
    type: Phaser.AUTO,
    width: 640, 
    height: 480,
    pixelPerfect: true,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: [ Menu, Game ]
}
let game = new Phaser.Game(config)

// keybinds
let keySPACE
