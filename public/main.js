
// // Create our 'main' state that will contain the this
// var mainState = {
//     preload: function() {   
//         game.load.image('bird', 'assets/bird.png');
//         game.load.image('pipe','assets/pipe.png');
//         game.load.image('roman', 'assets/romanSmall.png')
//     },

//     create: function() { 
//         // Create empty game group
//         this.pipes = game.add.group();

//         // Change the background color of the game to blue
//         game.stage.backgroundColor = '#71c5cf';

//         this.score = 0;
//         this.labelScore = game.add.text(20, 20, "0", 
//             { font: "30px Arial", fill: "#ffffff" }); 
    
//         // Set the physics system
//         game.physics.startSystem(Phaser.Physics.ARCADE);

//         this.timer = game.time.events.loop(3000, this.addRowOfPipes, this); 
    
//         // Display the bird at the position x=100 and y=245
//         this.bird = game.add.sprite(100, 245, 'roman')
    
//         this.bird.flipX = true;
    
//         // Add physics to the bird
//         // Needed for: movements, gravity, collisions, etc.
//         game.physics.arcade.enable(this.bird);
    
//         // Add gravity to the bird to make it fall
//         this.bird.body.gravity.y = 1000;  
    
//         // Call the 'jump' function when the spacekey is hit
//         var spaceKey = game.input.keyboard.addKey(
//                         Phaser.Keyboard.SPACEBAR);
//         spaceKey.onDown.add(this.jump, this);  

//         // game.input.on('pointerdown',()=>{
//         //     console.log('do something')
//         // })
//         console.log(game)
        
        
//         this.bird.scale.x = .75
//         this.bird.scale.y = .75
//     },
    
//     update: function() {
//         // If the bird is out of the screen (too high or too low)
//         // Call the 'restartGame' function
//         if (this.bird.y < 0 || this.bird.y > 700){
//             this.restartGame();
//         }

//         game.physics.arcade.overlap(
//             this.bird, this.pipes, this.restartGame, null, this);
//     },

//     jump: function() {
//         this.bird.body.velocity.y = -350;
//     },

//     testOverlap: function(){
//         // for (let i=0;i<this.pipes.children.length;i++){

//         // }
//         console.log(this.bird.body)
//     },
//     restartGame: function(){
//         game.state.start('main')
//     },

//     addOnePipe: function(x, y) {
//         // Create a pipe at the position x and y
//         var pipe = game.add.sprite(x, y, 'pipe');
    
//         // Add the pipe to our previously created group
//         this.pipes.add(pipe);
    
//         // Enable physics on the pipe 
//         game.physics.arcade.enable(pipe);
    
//         // Add velocity to the pipe to make it move left
//         pipe.body.velocity.x = -200; 
    
//         // Automatically kill the pipe when it's no longer visible 
//         pipe.checkWorldBounds = true;
//         pipe.outOfBoundsKill = true;
//     },

//     addRowOfPipes: function() {
//         // Randomly pick a number between 1 and 5
//         // This will be the hole position
//         var hole = Math.floor(Math.random() * 8) + 1;
    
//         // Add the 6 pipes 
//         // With one big hole at position 'hole' and 'hole + 1'
//         for (var i = 0; i < 11; i++){
//             if (i != hole && i != hole + 1 && i != hole + 2){
//                 this.addOnePipe(550, i * 60 + 10);  
//             }
//         }

//         this.score += 1;
//         this.labelScore.text = this.score; 
//     },

// };

// // Initialize Phaser, and create a 400px by 490px game
// var game = new Phaser.Game(600, 700);

// // Add the 'mainState' and call it 'main'
// game.state.add('main', mainState); 

// // Start the state to actually start the game
// game.state.start('main');




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

        // () =>{
            
        //         setTimeout(()=>{this.addRowOfPipes()},3000)
            
        // }
    
        // Display the bird at the position x=100 and y=245
        this.bird = this.add.sprite(100, 245, 'roman')
            .setSize(80,80)

        this.bird.flipX = false;
    
        // Add physics to the bird
        // Needed for: movements, gravity, collisions, etc.
        this.physics.add.existing(this.bird);
    
        // Add gravity to the bird to make it fall
        this.bird.body.gravity.y = 1000;  
    
        // Call the 'jump' function when the spacekey is hit
        // var spaceKey = this.input.keyboard.addKey(
        //                 Phaser.Keyboard.SPACEBAR);
        // spaceKey.onDown.add(this.jump, this); 

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
            this.restartGame();
        }

        this.physics.world.overlap(
            this.bird, this.pipes, this.restartGame, null, this);
    }


    jump() {
        this.bird.body.velocity.y = -380;
    }

    testOverlap(){
        // for (let i=0;i<this.pipes.children.length;i++){

        // }
        console.log(this.bird.body)
    }
    restartGame(){
        console.log('test')
        this.scene.start('main')
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
                this.addOnePipe(550, i * 60 + 40);  
            }
        }

        this.score += 1;
        this.labelScore.text = this.score; 
    }
}

