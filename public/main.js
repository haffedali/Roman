export default class MainGame extends Phaser.Scene {
    constructor(){
        super('main')
        this.roman;
        this.pipes;
    }

    init(data){
        
    }

    preload(){
        this.load.image('pipe','assets/pipe.png');
        this.load.image('roman', 'assets/romanSmall.png')
    }

    create(){
        this.pipes = this.add.group();

        // Change the background color of the this to blue

        this.score = 0;
        this.labelScore = this.add.text(20, 20, "0", 
            { font: "30px Arial", fill: "#ffffff" }); 
    

        // this.timer = this.time.events.loop(3000, this.addRowOfPipes, this); 

        var timer = this.time.addEvent({
            delay: 3000,                // ms
            callback: this.addRowOfPipes,
            //args: [],
            callbackScope: this,
            loop: true
        });


    
        // Display the bird at the position x=100 and y=245
        this.bird = this.add.sprite(100, 245, 'roman')
            .setSize(80,80)

        this.bird.flipX = false;
    
        // Add physics to the bird
        // Needed for: movements, gravity, collisions, etc.
        this.physics.add.existing(this.bird);
    
        // Add gravity to the bird to make it fall
        this.bird.body.gravity.y = 1000;  
    

        var keyObj = this.input.keyboard.addKey('SPACE');

        keyObj.on('down',()=>{
            this.jump();
        })


        this.input.on('pointerdown',()=>{
            this.jump();
        })
    }

    update(){
        if (this.bird.y < 0 || this.bird.y > 700){
            this.endGame();
        }

        this.physics.world.overlap(
            this.bird, this.pipes, this.endGame, null, this);
    }


    jump() {
        this.bird.body.velocity.y = -500;

        // db.collection('leaderboard').get()
        //     .then((snapshot)=>{
        //         snapshot.docs.forEach((doc)=>{
        //             console.log(doc.data());
        //         })
        //     })
    }

    testOverlap(){
        // for (let i=0;i<this.pipes.children.length;i++){

        // }
        console.log(this.bird.body)
    }
    restartGame(){
        this.scene.start('main');

    }

    endGame(){
        console.log(this.scene.scene.score)
        this.scene.stop('main');
        // db.collection('leaderboard').get()
        // .then((snapshot)=>{
        //     snapshot.docs.forEach((doc)=>{
        //         console.log(doc.data());
        //         let dummyScore = 50;
        //         let dummyUser = 'Haffed';
        //         let highScore = {
        //             name:dummyUser,
        //             score:dummyScore
        //         }
        //         if (dummyScore > doc.data().highScore.score){
        //             db.collection('leaderboard').add({highScore})
        //         }
        //     })
        // })

        // db.collection('leaderBoard').get()
        //     .then((snapshot)=>{
        //         snapshot.docs.forEach((doc)=>{
        //             console.log(doc.data().highScores)
        //         })
        //     })
    }

    addOnePipe(x, y) {
        // Create a pipe at the position x and y
        var pipe = this.add.sprite(x, y, 'pipe');
    
        // Add the pipe to our previously created group
        this.pipes.add(pipe);
    
        // Enable physics on the pipe 
        this.physics.add.existing(pipe);

        pipe.body.setAllowGravity(false)
    
        // Add velocity to the pipe to make it move left
        pipe.body.velocity.x = -200; 
    
        // Automatically kill the pipe when it's no longer visible 
        pipe.checkWorldBounds = true;
        pipe.outOfBoundsKill = true;
    }

    addRowOfPipes() {
        // Randomly pick a number between 1 and 5
        // This will be the hole position
        var hole = Math.floor(Math.random() * 8) + 1;
    
        // Add the 6 pipes 
        // With one big hole at position 'hole' and 'hole + 1'
        for (var i = 0; i < 11; i++){
            if (i != hole && i != hole + 1 && i != hole + 2){
                this.addOnePipe(580, i * 60 + 40);  
            }
        }

        this.score += 1;
        this.labelScore.text = this.score; 
    }
}

