/**
 * Lyssa Li
 * Project Name: Smokescreen & Mirrors
 * Project Hours: approx 29
 * Creative Tilt Justification:
 *      [ ART ]
 *      I think I did pretty well with the menu page. It wasn't building upon the endless runner itself, but I am proud of the camera panning
 *      to make the whole menu feel like one big scene. I'm also super proud of how going from menu into game is a scene swap that you cannot see. It just flows naturally :D
 *      This is also my first time making sfx and background music on my own. I think they turned out pretty good.
 *      [ CODE ]
 *      I think I'm pretty proud with using the game settings to limit a lot of things for example max bullets on screen or seconds of delay
 *      before the difficulty ramps up. I think it's quite a fun play on the endless runner where it ramps up in difficulty by allowing more obstacles
 *      per screen instead of ramping up the scroll speed. I also really like the "snap down" mechanic of the jump that helps the player try and weave between
 *      the bullets and the spikes instead of easily dying to a badly timed jump. It's more forgiving and allows longer playtime (at least for me).
 * Citations:
 *      platforming example and code referenced from https://gamedevacademy.org/how-to-make-a-mario-style-platformer-with-phaser-3/?a=13
 *      tweening and fading referenced from https://github.com/nathanaltice/PaddleParkourP3/blob/master/src/scenes/Play.js
 *      animation technique to get the running smooth https://phaser.discourse.group/t/start-animation-at-a-specific-frame/9763
 *      animation framing and picking frames https://phaser.discourse.group/t/capture-current-frame-number-of-animation-and/2723
 *      camera panning and timer done with the help of chatGPT https://chat.openai.com/share/6fc570b0-81a1-4f91-beae-39c64d2ae72c
 *      royalty-free cat sounds from pixabay https://pixabay.com/sound-effects/search/cat/ just keeping the link here for future projects maybe
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
