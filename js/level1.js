var scoreText;
var levelstate =  {

        preload : function() {
            
            //Hintergrundfarbe
            game.stage.backgroundColor = '#FFF';

            //Player
            game.load.image('player', 'assets/player.gif');
            
            
                
        },
        create : function() {
            
            //Späterer Hintergrund
            //background = game.add.image(game.world.X, game.world.Y, 'background');
            //background.x = 0;
            //background.y = 0;
            //background.height = game.height;
            //background.width = game.width; 
            

            //Weltgröße
            game.world.setBounds(0, 0, 1653, 919);
            //Playerspawn
            player = game.add.sprite(0, 387, 'player');
            
            //Physics aktivieren
            game.physics.arcade.enable(player);
            
            //Spieler stößt gegen Weltende
            player.body.collideWorldBounds = true;
            //Schwerkraft
            player.body.gravity.y = 500;
            

            //Pfeiltasten einfügen
            cursors = game.input.keyboard.createCursorKeys();
                      
            //Kamera folgt Spieler
            game.camera.follow(player);
            
            //Score wird eingefügt
            scoreText = game.add.text(16, 16, 'Coins: ' + game.global.score, { fontSize: 25, fill: '#ffd700'});
      
    },
    
    update: function(){
        
        //Spieler bewegt sich nicht automatisch
        player.body.velocity.x = 0;
        
        //Stoppen
        if (cursors.left.isDown){
            player.body.velocity.x = -250;
        }
        
        //Nach rechts bewegen
        if (cursors.right.isDown){
            player.body.velocity.x = 250;
        }
        
        //Sprung
        if (cursors.up.isDown && (player.body.onFloor() || player.body.touching.down)){
            player.body.velocity.y = -300;
        }
        
        //Schnellerer Fall
        if (cursors.down.isDown){
            player.body.velocity.y = 500;
        }
    
    }
}