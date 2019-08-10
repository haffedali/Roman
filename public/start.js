import MainGame from "./main.js"

class BootScene extends Phaser.Scene {
    constructor(){
        super({
            key: "BootScene",
        })
    }

    preload(){
        console.log('started')
        this.scene.start('main', {game:game})
    }

    create(){
        
    }
}


var config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 700,
    backgroundColor: '#71c5cf',
    parent: 'gameContainer',
    scene: [BootScene,MainGame],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y:1000}
        }
    }
};



var game = new Phaser.Game(config);
