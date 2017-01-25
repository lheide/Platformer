var scoreText;
var map;
var layer;
 var tiles;
var levelstate =  {

        preload : function() {
            
            //Hintergrundfarbe
            game.stage.backgroundColor = '#FFF';

            //Player
            game.load.image('player', 'assets/player.gif');
            game.load.tilemap('map', 'projectdata/level1test.json', null, Phaser.Tilemap.TILED_JSON);
            game.load.image('tiles', 'assets/tilemaplevel1.png');
            
                
        },
        create : function() {
            

            
                map = game.add.tilemap('map');

                map.addTilesetImage('tiles');
            
                map.setCollisionBetween(0, 300);
            
                layer = map.createLayer('layer');
            
                  for(var tile in layer.getTiles(0, 0, layer.layer.widthInPixels, layer.layer.heightInPixels)){
        
                tile.collides = true;
                }


            //Playerspawn
            player = game.add.sprite(30, 387, 'player');
            
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
            
            game.physics.arcade.collide(player, layer);
            
          
    
            

            
        
      
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
    
    
    

