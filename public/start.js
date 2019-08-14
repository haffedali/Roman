import MainGame from "./main.js"

class BootScene extends Phaser.Scene {
    constructor(){
        super({
            key: "BootScene",
        })
    }

    preload(){
        this.scene.start('main', {game:game})
    }

    create(){
        
    }
}


var config = {
    type: Phaser.CANVAS,
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

game.canvas.id = 'game'



// Grabbing canvas and giving it an ID
setTimeout(function(){
    document.querySelectorAll('canvas')[0].style.position = 'relative'
    document.querySelectorAll('canvas')[0].style.float = 'left'
})

// Grabs and stores DOM nodes 
let leaderBoardHtml = document.querySelectorAll('.score')



// Updating leaderboard html with firestore leaderboard data
db.collection('leaderBoard').get()
    .then((snapshot)=>{
        snapshot.docs.forEach((doc)=>{
            let highScores = doc.data().highScores;
            for (let i=0;i<highScores.length;i++){
                console.log(highScores[i].score)
                console.log(leaderBoardHtml[i].innerHTML)
                if (highScores[i].score > parseInt(leaderBoardHtml[i].innerHTML)){
                    console.log(highScores[i].score + ' is greater than ' + leaderBoardHtml[i].innerHTML)
                }
            }

            console.log(highScores)
        })
    })




