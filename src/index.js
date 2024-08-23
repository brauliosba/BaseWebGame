import { MainScene } from "./scripts/scenes/mainScene.js";
import { MenuScene } from "./scripts/scenes/menuScene.js";
import { UIScene } from "./scripts/scenes/uiScene.js";
import { BootScene } from "./scripts/scenes/bootScene.js";
import * as Phaser from 'phaser';
import WebFontLoaderPlugin from 'phaser3-rex-plugins/plugins/webfontloader-plugin.js';
import UIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';

// -------------------------------------------
// Initializing Phaser Game
// -------------------------------------------
/**
 * Runs the game with the specified options.
 * @param {Object} opts - The options for the game.
 * @param {Function} opts.onGameStart - The callback function to be executed when the game starts.
 * @param {Function} opts.onGameEnd - The callback function to be executed when the game ends.
 */
function run(opts) {
    const metadata = {
        highScore: opts?.highScore || 0,
        sponsor: opts?.sponsor || true,
        onGameStart: opts?.onGameStart || (() => {}),
        onGameEnd: opts?.onGameEnd || (() => {}),
        onDataSend: opts?.onDataSend || (() => {}),
    };

    const isIOS = /iPad|iPhone|iPod|Macintosh/i.test(navigator.userAgent) && !window.MSStream;

    const gameOptions = {
        type: isIOS ? Phaser.CANVAS : Phaser.WEBGL,
        parent: 'phaser-div',
        width: 1080,
        height: 1080,

        dom: {
            createContainer: true
        },
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
        },
        scene: [BootScene, UIScene, MenuScene, MainScene],

        physics: {
            default: 'arcade',
            arcade: {
              gravity: { y: 0 },
              debug: false,
            },
          },

        fps: { target: 60 },

        plugins: {
            global: [{
                key: 'rexWebFontLoader',
                plugin: WebFontLoaderPlugin,
                start: true
            }],
            scene: [{
                key: 'rexUI',
                plugin: UIPlugin,
                mapping: 'rexUI'
            }]
        },

        // Overwrite the default game options with the provided options
        ...opts,
        }

    // gama instance
    const game = new Phaser.Game(gameOptions);
    game.config.metadata = metadata;
}

// Attach the game to the window object
if (typeof window !== 'undefined') {
    if (!window.GameName) {
      window.GameName = {
        run,
      };
    }
}