import BootScene from "./scene/Boot.js"
import GameScene from "./scene/Game.js"
import Game2Scene from "./scene/Game2.js"
import Game3Scene from "./scene/Game3.js"
import Game4Scene from "./scene/Game4.js"


        const config = {
            type: Phaser.AUTO,
            width: 1920,
            height: 1080,
            scene: [BootScene,GameScene,Game2Scene,Game3Scene,Game4Scene],
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 1000 },
                    debug: false,
                }
            }
        };

        const game = new Phaser.Game(config);

    
