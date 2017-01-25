var scoreText;
var map;
var backgroundLayer;
var blockedLayer;
 var tiles;
var levelstate =  {

        preload : function() {
            
            //Hintergrundfarbe
            game.stage.backgroundColor = '#FFF';

            //Player
            game.load.image('player', 'assets/player.gif');
            game.load.tilemap('map', 'projectdata/level1.json', null, Phaser.Tilemap.TILED_JSON);
            game.load.image('GrassTileset', 'assets/tilemaplevel1.png');
            
                
        },
        create : function() {
            

            
            map = game.add.tilemap('map');

            map.addTilesetImage('GrassTileset');
            

            
            backgroundLayer = map.createLayer('Background');
            blockedLayer =  map.createLayer('Objects');
            
            map.setCollisionBetween(1, 1000, true, blockedLayer);


            //Playerspawn
            player = game.add.sprite(20, 387, 'player');
            
            //Physics aktivieren
            game.physics.arcade.enable(player);
          //  game.physics.arcade.collide(player, blockedLayer);
            
             //resizes the game world to match the layer dimensions
            backgroundLayer.resizeWorld();



            
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
            player.body.velocity.y = -400;
        }
        
        //Schnellerer Fall
        if (cursors.down.isDown){
            player.body.velocity.y = 500;
        }
    
    }
}
    
    
    

